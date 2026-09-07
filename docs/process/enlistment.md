# Enlistment — bringing a repository onto the orchestration service

Part of the [orchestration process specification](README.md). Covers
the session-facing procedure for a repository that already has a
deployed [orchestration service](../plans/orchestration-service.md)
instance to enlist against: taking it from *not enlisted* to
*enlisted*, confirming that worked, and what a session does when the
service cannot be reached. Today this is
`majodali/project-orchestrator` against one deployed instance
(chunk 1, node [P2-N002](../plans/p2-n002-service-skeleton.md)); the
same steps apply to any other managed project once one enlists.

Deploying and operating the service itself — the AWS account, the
GitHub App, minting the token, running `scripts/deploy.sh` — is
covered in the service repository's own
[deploy runbook](https://github.com/majodali/project-orchestrator-service/blob/main/docs/runbook.md)
and is an owner action (O1–O5 of the p2-n002 plan), not repeated here.
This document starts from a deployed endpoint and a minted token and
covers only what a session does with them.

## What "enlisted" means

Three things have to be true at once:

1. A `.mcp.json` is checked into the repository root, naming the
   deployed endpoint — the same mechanism that already carries this
   project's role-agent mirror (`.claude/agents/`). Claude Code reads
   a repository-root `.mcp.json` automatically, on both the local and
   web surfaces, once the repository is cloned.
2. `.claude/settings.json` sets `enableAllProjectMcpServers: true` (or
   otherwise enables the specific server), so a session picks up the
   checked-in server without an interactive per-session approval step.
3. The `MCP_AUTH_TOKEN` environment variable is present in the
   session's own environment, on whichever surface it runs — a local
   shell export, or the web surface's environment/secret
   configuration. **How a given Claude Code surface exposes an
   environment variable to an enlisted session is a surface
   configuration detail, not something this document or `.mcp.json`
   can prescribe**; each surface's own mechanism is what O4 (the
   plan's owner action for minting and distributing the token) covers.

## Steps: from "not enlisted" to "enlisted"

1. Confirm `.mcp.json` exists at the repository root and declares the
   server: `"type": "http"`, the deployed `url`, an
   `Authorization: Bearer ${MCP_AUTH_TOKEN}` header, and an explicit
   per-server `timeout` (the MCP default of 5000ms is too low for a
   cold-starting endpoint — see the deploy runbook's cold/warm
   measurement).
2. Confirm `.claude/settings.json` carries
   `"enableAllProjectMcpServers": true`. Without it, a session may
   still be offered the server but has to approve it interactively
   first — enlistment then depends on a step this document cannot
   guarantee ran.
3. Confirm `MCP_AUTH_TOKEN` is set in the environment the session
   starts from (`echo $MCP_AUTH_TOKEN` on a local surface prints a
   non-empty value; on the web surface, check that surface's own
   environment/secret configuration screen). Never echo the value into
   a document, a commit, a chat transcript, or a log — see *The token*
   below.
4. Start (or resume) a Claude Code session against a clone of the
   repository, so it reads the root `.mcp.json` at startup.
5. Confirm enlistment worked — see below.

## Confirming enlistment worked

`service_identity` is the cheapest check: it takes no arguments, does
not touch plan state, and answers inside the configured timeout. From
the session:

1. List tools — the enlisted server's tools should appear
   (`mcp__project-orchestrator__service_identity` and the others the
   deployed version exposes).
2. Call `service_identity`. Expect a response naming the service, its
   version, the deployed commit, and the project — within the
   `.mcp.json` timeout, including on a cold start.

A session that lists no tools from this server, or that hangs past the
configured timeout on this call, is not enlisted — recheck the three
conditions above before assuming the service itself is down (see the
fallback rule below for what to do either way).

## The token, and why no value ever appears here

`MCP_AUTH_TOKEN` is a name, not a secret, and this document — like
every document a session or a person writes about enlistment — names
it freely. Its *value* is a credential and never belongs in a document,
a commit, a chat transcript, or a log (methodology S-001/S-002).
`.mcp.json` itself demonstrates the discipline it asks of everything
downstream of it: the header is written as
`"Authorization": "Bearer ${MCP_AUTH_TOKEN}"`, environment-variable
expansion, so the four-character sequence `${MCP_AUTH_TOKEN}` is what
sits in git, never the token. Anyone documenting, debugging, or
reporting on enlistment should follow the same shape — name the
variable, never paste what it expands to.

## The fallback rule

With the service unreachable — the endpoint does not answer, the call
times out, or the session's own `MCP_AUTH_TOKEN` is unset or wrong so
every call is refused — **a session does not retry and does not
wait**. It proceeds on [the v1 process](dispatch.md) exactly as if no
service existed: the session edits the Plan register by hand and
commits it, as the process already specifies. Nothing about the
process changes; the service is an accelerator a session uses when it
answers, never a dependency it waits on. This is the standing
mitigation this project records against
[R12](../open-risks.md) in the Risk register.

## Verifying the fallback (the R12 exercise)

The procedure below is what a genuine Claude Code session start
exercises — not a subagent, since the thing under test is session
*startup* against a broken enlistment, which no already-running
subagent session can produce evidence about. Two cases, run
separately, both free because both withhold something the session
would otherwise already have.

### Case 1 — endpoint unreachable

1. In a scratch clone (never the checked-in file on a real branch),
   copy `.mcp.json` and change only its `url` to an address that will
   not answer — a closed local port (e.g. `http://127.0.0.1:9/mcp`,
   the discard port) for an immediate refusal, or a non-routable
   address (e.g. `http://10.255.255.1/mcp`) for a call that runs to
   the configured timeout instead of failing instantly. Run the
   exercise with the non-routable form at least once — an instant
   refusal alone under-tests "does not wait," since there is nothing
   to wait through.
2. Start a **fresh** Claude Code session in that clone, with
   `MCP_AUTH_TOKEN` set as normal.
3. Time from process start to the session's ordinary ready prompt.
   Note whether it matches an unenlisted session's normal startup time
   or stalls anywhere near the configured per-server timeout.
4. At the prompt, ask for one piece of unrelated tool use (e.g. `git
   status`, reading a file) and confirm it behaves normally.
5. Ask the session to perform the stage transition genuinely due at
   that moment (the process's own next actionable step — never one
   invented for the exercise). Confirm it edits and commits the
   register directly, without a visible retry loop or a wait on the
   dead endpoint.
6. Record: the ready-prompt time, whether any call to the dead
   endpoint was attempted and how it failed, and the wall-clock time
   from the request to the commit landing.
7. Discard the scratch `.mcp.json`; never commit a broken `url`.

### Case 2 — `MCP_AUTH_TOKEN` unset

1. In a clone with the **real**, working `.mcp.json`, start a fresh
   Claude Code session from a shell or surface configuration where
   `MCP_AUTH_TOKEN` is deliberately not set.
2. Time from process start to the ready prompt, same as Case 1.
3. List tools, and attempt one call (`service_identity`). Expect
   either an empty-token authorization failure reported as an ordinary
   tool error, or the tool list itself failing to populate — either is
   an acceptable clean failure; a hang is not.
4. Confirm unrelated tool use is unaffected, and complete the same
   class of stage transition by the v1 process, as in Case 1.
5. Record the ready-prompt time, the exact error text seen (if any),
   and the time to the landed commit.

### Clean versus hung

**Clean**: the session reaches its ordinary ready prompt in the same
time it would with no `.mcp.json` at all; any MCP-related failure
surfaces once, as an ordinary tool error the session reports and moves
past; the register edit lands as a commit on the same kind of timeline
as a service-less session would produce. **Hung**: session startup
itself stalls with no ready prompt for a duration resembling the
configured timeout or longer; the session visibly retries the failing
call; or the session declines or delays the git-only edit while still
"waiting" on the tool. Either case's outcome, once run, is recorded
against [R12](../open-risks.md) with the date.

## References

- [dispatch.md](dispatch.md) — the v1 process this document is the
  fallback statement for; unchanged in substance by the service
- [p2-n002-service-skeleton](../plans/p2-n002-service-skeleton.md) and
  its [specification](../specs/p2-n002-service-skeleton.md) — decision
  5 (client authentication), I4 (fallback equivalence)
- [Risk register](../open-risks.md) — R12
- [project-orchestrator-service](https://github.com/majodali/project-orchestrator-service) —
  the deploy runbook and the `.mcp.json` template enlistment is filled
  in from
