# Service skeleton and plan state — specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document for
     node P2-N002; it goes `active` when the owner accepts it and the
     breakdown at this node's gate, and `closed → Backlog entry` when the
     node reaches `done`. -->

Node **P2-N002** (chunk 1 of
[orchestration-service](../plans/orchestration-service.md)),
specifying the outcome fixed by its
[plan](../plans/p2-n002-service-skeleton.md). The plan decided *what*
and *why* — a deployed MCP service that a session enlists from a
checked-in `.mcp.json` and uses to read and update this project's plan
state, git still authoritative, the fallback still real — and decided
that the node is **interior**, with five children.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria: integration is verified where it was specified
([plan-model](../process/plan-model.md)). So everything below is a
property that no single child establishes — a composition, an
equivalence, or a whole-chunk invariant. Where a criterion here needs
a child to do something it was not already going to do, that addition
is named in *The breakdown* section rather than left implicit.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)). Nothing here reopens a plan
decision.

## What "done" looks like at this node

The parent plan's gate is **the owner sees a session read and update
real plan state**. Made decidable, that is one continuous
demonstration with a fixed shape, plus the invariants that stop the
demonstration from being a trick:

> A Claude Code session that has cloned this repository and been given
> nothing but its checked-in `.mcp.json` and the owner's credential
> environment variable calls the **deployed** service, reads this
> repository's real plan register, moves a real node through a real
> stage transition, and the change lands as an ordinary git commit the
> owner can read without the service.

The verifier watching it needs no access to the implementation. The
criteria are grouped: **G** is that demonstration, **I** the
integration invariants that make it mean something, **P** the process
and register state the chunk must leave behind.

## Verification criteria

### G. The gate demonstration

- **G1 — One session, one enlistment.** The demonstrating session is
  enlisted solely by the `.mcp.json` checked into this repository plus
  the credential environment variable on that surface. No hand-edited
  client configuration, no locally run instance, no tool invoked by any
  path other than MCP. The session lists the service's tools.
- **G2 — Read.** `plan_read` returns this repository's plan tree at a
  named ref: every node of `docs/plan-register.md`, with its stage and
  any hold marker, and the commit SHA the answer was computed from. The
  owner can open the register at that SHA on GitHub and see the same
  content.
- **G3 — Update.** In the same session and the same sitting, a real
  node takes a real stage transition through the three-step write
  model: the lease is acquired; `plan_update` returns the exact edit
  (file, line as it is, line as it should be); the session applies it,
  commits it with its documentation in the same commit (W-003), and
  pushes; `plan_confirm` at the resulting SHA succeeds and releases the
  lease.
- **G4 — The evidence is the commit.** The register change is an
  ordinary commit on a branch of this repository, readable and
  reviewable with the service switched off. The service produced no
  commit of its own and holds no repository write credential.
- **G5 — Read again.** A `plan_read` issued after the push reports the
  new SHA and the new stage. No stale answer, no cache-clearing step,
  no second attempt.
- **G6 — Nothing staged for the camera.** The transition demonstrated
  is one the process actually owed at that moment (decision 10 names
  the default), against a node that exists in the register for its own
  reasons.
- **G7 — Inside the budget.** Every call in the demonstration returns
  within the enlistment file's configured per-server timeout,
  *including* the first call after an idle period (cold start). The
  configured value and the measured cold and warm latencies are written
  down in the deploy runbook.

### I. Integration invariants

- **I1 — Equivalence with the v1 process.** The same transition
  performed by hand under the v1 process and performed through the
  service produce the same register file. Checked operationally: do it
  both ways on a scratch branch and diff `docs/plan-register.md` — the
  diff is empty. This is what makes "the service is an accelerator" a
  fact rather than a claim.
- **I2 — Legality is not a second truth.** The transition table the
  service enforces is the node lifecycle of
  [plan-model](../process/plan-model.md), cited to that document in the
  service's source and docs. A transition the process spec permits and
  the service refuses — or the reverse — is a **service bug** with a
  Backlog entry, never a new lifecycle rule. The service is authority
  over whether a transition is legal only in the sense that it applies
  this repository's published rule.
- **I3 — Divergence is loud.** A deliberately induced service/git
  mismatch is reported as an error naming the file and the line, and
  the next read reconciles to git's value: `plan_confirm` at a SHA
  whose register does not carry the edit is refused as a divergence,
  and a projection contradicted by git loses. The exercise is
  performed, not reasoned about, and its outcome is recorded against
  **R10** in the [Risk register](../open-risks.md).
- **I4 — Fallback equivalence.** With the endpoint unreachable, a
  session enlisted by the same checked-in `.mcp.json` starts cleanly,
  uses unrelated tools unaffected, and completes the same class of
  stage transition by the v1 process, producing a register change of
  the same form. The session does not retry and does not wait. **R12**
  is updated with the result and the date.
- **I5 — Ref discipline.** Every read, update and confirm names the git
  ref or SHA it acted on, and no tool derives plan state from anything
  but repository content fetched through the GitHub App. There is no
  code path by which the service's own store answers a question about
  what the state *is*.
- **I6 — Both surfaces.** The same checked-in `.mcp.json` yields a
  working enlistment on the local surface **and** on the web surface.
  A web surface blocked by platform egress is owner action O5;
  decision 8 of the plan governs the case where it cannot be
  unblocked.
- **I7 — No secret anywhere.** Neither repository's history — not just
  its tip — contains the bearer token, the GitHub App private key, or
  any deploy credential. The enlistment file carries an
  environment-variable reference and nothing else. Checked over full
  history at the gate.
- **I8 — Reproducible by the owner alone.** A reader with the deploy
  runbook and no session context goes from an empty AWS account to a
  working enlisted endpoint. Every action required of a human is one of
  **O1–O5**; an action discovered outside that list is a runbook
  defect, fixed before the gate rather than narrated at it.
- **I9 — The v1 process is unchanged in substance.** `docs/process/`
  gains no rule this chunk depends on. Enlistment documentation lives
  in the service repository; folding it into the process spec is the
  Backlog item that already tracks it.

### P. Process and register state

- **P1 — The service repository is enrolled.** Classification, Binding
  block, README and Backlog present and mutually consistent; `mtool`
  form audit and link check pass clean on that tree.
- **P2 — This repository is clean.** `python3
  plugin/scripts/form_check.py` passes; register and Backlog stage
  designations agree; each of the five children reached `done` against
  its own criteria.
- **P3 — Documentation moved with the work (W-003).** Both
  repositories' Backlogs and this repository's registers were updated
  in the same commits as the work they describe, and this chunk's
  Backlog entry is rewritten to describe what actually shipped.
- **P4 — The record exists.** A Cost log record for every dispatched
  task of the chunk, and a run-journal entry for the gate
  demonstration. (The Orchestrator writes these; the verifier checks
  they are there.)
- **P5 — Decisions are closed.** Every numbered decision in the plan
  (1–9) and in this document (10–12) was adopted or overridden at the
  gate, and any override is reflected in the affected child's criteria
  **before** that child executes.

**G1–G7 are what the owner watches. I1–I9 and P1–P5 are what a
verifier who did not do the work checks against the repositories.**

## How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria; a Reviewer pass is by owner request. This node's
`verifying` is an evidence assembly — the criteria above, each answered
with a pointer to a commit, a document, a recorded measurement, or a
register entry — followed by the live demonstration at the gate. The
demonstration is performed by a session serving the **Orchestrator**
role, because the register's single-writer rule is unchanged by the
service (decision 12).

## Not verified here

Named so their absence is not read as an oversight: lease behavior
under real contention (chunk 4), the question queue and any UI
(chunk 2), topics and push (chunk 3), plan state for projects other
than this one (chunk 5), Backlog / Cost log / journal as service-served
state (out of decision 4's scope), a custom domain, CI for the service
repository, and OAuth. Each is either a later chunk or a Backlog item.

## The breakdown

**The five proposed children stand**, in the order and with the
dependency structure the [plan](../plans/p2-n002-service-skeleton.md)
gives: A (bootstrap) → B (reachability slice) and C (read) in
parallel → D (update) → E (fallback and enlistment docs), with C and D
independent of B's deployment. Writing the integration criteria did not
expose a missing child, a redundant one, or a wrong cut: the slice
still leads on the riskiest path (R11), the two features are still the
two plan-state behaviors the gate names, and the fallback still cannot
be exercised before there is something to fall back from.

It did expose criteria the children need in order for the criteria
above to be checkable. These are **additions to the children's
criteria**, to be carried into the breakdown:

- **Child A** — the bootstrap includes a secret-hygiene baseline
  (ignore rules, no environment files, no credential fixtures) so **I7**
  is cheap to check rather than an audit at the end.
- **Child B** — measure the identity tool's **cold and warm** latency
  against the *deployed* endpoint, set the enlistment file's per-server
  timeout from that measurement, and record both in the runbook
  (**G7**). A local instance cannot produce this number. Also: the
  runbook is verified against **I8** — a required human action outside
  O1–O5 is a defect in the runbook.
- **Child C** — `plan_read` takes an explicit **ref**, defaulting to
  the repository's default branch (**I5**), and its stage vocabulary is
  cited to [plan-model](../process/plan-model.md) rather than
  re-declared.
- **Child D** — `plan_update` and `plan_confirm` take the same explicit
  ref (**I5**); the legality table is cited to plan-model (**I2**); and
  the "indistinguishable from the v1 process" criterion gets the
  operational form in **I1** (both ways on a scratch branch, empty
  diff) so a verifier can run it.
- **Child E** — exercise the **unset credential** case alongside the
  unreachable-endpoint case: an enlistment whose environment variable
  is absent must leave session startup as clean as a dead endpoint
  does. It is the likelier failure on a fresh surface and it is free to
  test.

None of these changes a child's outcome or moves work between
children. IDs remain the Orchestrator's to issue.

## Decisions for the gate

Numbering continues the plan's sequence, so one go-ahead adopts one
list: the plan carries **1–9**, this document carries **10–12**. The
owner's go-ahead adopts every default not overridden by number.
Checked against the [Ruling register](../rulings.md): RU-006 and RU-007
settle repository shape and promotion timing and are not re-raised;
no existing ruling reaches the three below.

10. **The ref the demonstration acts on, and the push it requires.**
    Default: chunk-1 tools take an explicit `ref` defaulting to the
    default branch, and the gate demonstration runs against a **pushed
    working branch** of this repository — the session performing it
    pushes that branch, never `main`. The default transition to
    demonstrate is P2-N002's own `broken-down` → `verifying`, which is
    exactly the move the process owes when the last child finishes.
    Rationale: the service reads git through GitHub, so the state it
    validates against must be visible there; a branch keeps `main`
    under the owner's merge, and using the transition that is genuinely
    due satisfies **G6** without inventing one.
11. **Which surface the demonstration runs on.** Default: the **web
    surface**, the one the owner works from; the local surface is
    proven separately by **I6**. Rationale: the gate is the owner
    seeing it, on the surface they actually use — and if platform
    egress blocks the web surface, decision 8 already says what
    happens.
12. **Role identity on the write path.** Default: chunk 1 does **not**
    authenticate the caller's role. The advisory lease is the whole
    single-writer mechanism; "the Orchestrator writes the register"
    stays a process rule the session honors. Rationale: one shared
    bearer token cannot distinguish roles, so an assertion would be
    theater; role-aware identity belongs with chunk 4's task-pull loop,
    where the service already has to know who is asking.

## References

- [p2-n002-service-skeleton](../plans/p2-n002-service-skeleton.md) —
  this node's plan, including decisions 1–9 and the children's own
  criteria
- [orchestration-service](../plans/orchestration-service.md) — the
  parent plan and its five standing constraints
- [plan-model](../process/plan-model.md) — the node lifecycle this
  chunk's update path enforces, and the interior-node verification rule
- [profiles](../process/profiles.md) — the C1 specification depth this
  document is written to
- [Risk register](../open-risks.md) — R10 (I1–I3), R11 (G7, I6),
  R12 (I4)
- [Ruling register](../rulings.md) — RU-006, RU-007
