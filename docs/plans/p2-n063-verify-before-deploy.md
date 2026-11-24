# Service change verified before it is deployed (P2-N063)

Status: planned (T243, 2026-11-23). Child of
[the orchestration service](orchestration-service.md), P2-N001.
Reader: the owner, and the sessions that specify, break down, build
and verify it. It assumes [how we work](../process/how-we-work.md)
and the task loop.

## Outcome

A reviewer verifies a service pull request against a preview
deployment of that pull request, API Gateway included, before it is
merged, so a node whose criteria need a running deployment completes
with no merge by the owner's hand.

## The gap

The service merges a node's pull requests when its verification
closes `closed`. A criterion that can only be checked on a running
deployment cannot be met before that merge, because in
`majodali/project-orchestrator-service` the merge is what deploys. On
P2-N054 that cost two merges by the owner's hand
(majodali/project-orchestrator-service#55 and #56). The first put
live a change whose per-project paths API Gateway did not route: the
implementer and the reviewer had each tested a local run, which has
no gateway in front, so T240 found the 404 only after the deploy and
T241's `McpProjectRoute` was the fix. The reviewer had said criteria
1, 2 and 9 awaited the deploy and could do nothing about it.

## What exists today

Read in the service repository at `main`, not assumed.

- **`checks.yml`** runs build, lint, test and `sam validate --lint`
  on `pull_request`, with `contents: read` and no `id-token: write`:
  it cannot deploy, by design. **`deploy.yml`** runs on `push` to
  `main` — OIDC preflight, `scripts/deploy.sh`, `publish-version`,
  `preprod` repointed, `scripts/smoke-test.sh` against the **preprod
  Function URL**, then `live` repointed if that passed.
- **`template.yaml`** declares one HTTP API at stage `$default`, one
  integration bound to `LiveAlias`, and eight routes on it
  (`ANY /mcp`, `ANY /mcp/{owner}/{repo}`, `GET /health`, five
  `/view`). `PreprodFunctionUrl` exposes `PreprodAlias`. No table:
  the rebuild's milestone 3 removed the lease.
- **The preprod Function URL has no gateway in front**, the layer
  P2-N054's fault was in, so the smoke test's four checks cannot see
  a missing route.
- **`scripts/deploy.sh`** takes `STACK_NAME` from the environment
  (default `project-orchestrator-service`), reads `live`'s real
  `FunctionVersion` back before every `sam deploy` and passes it
  through as `LiveVersion`, and refuses an existing stack whose
  `live` is at `$LATEST`.
- **The deploy role** is reachable only from this repository's `main`
  ref (`deploy.yml`'s `EXPECTED_OIDC_SUBJECT`), and its
  CloudFormation permission is scoped to
  `stack/project-orchestrator-service/*` and the SAM managed stack
  (`docs/deploy-role-permissions.md`); Lambda, IAM and Secrets
  Manager are scoped by name prefix, and ApiGatewayV2 has no
  resource-level permissions and is `Resource: "*"`.
- **Every write tool commits to a project's default branch**, which
  is why the runbook's verification curls include no write (Step 6).

## How much machinery this deserves

P2-N012's gate excluded a second stack for preprod on cost grounds;
this node adds one for a different reason — deploying code that is
not on `main` at all, which one stack cannot do without touching what
production serves. D148 (2026-11-23, standing) sends hard-to-automate
work into the service, so the service starts the preview rather than
the owner. And the cheapest guard against the fault that prompted
this node needs no deployment at all: a check that the gateway's
routes and the application's paths agree.

## The design

### 1. Route coverage, proved without a deployment

A check in the pull-request workflow reads `template.yaml`'s
`AWS::ApiGatewayV2::Route` route keys and the paths `src/httpApp.ts`
registers, translating Hono's `:name` to API Gateway's `{name}`, and
fails when either side has a path the other lacks. Deliberate
exemptions live in one place in the check, each with the reason it
stays. No new dependency (R14). This is the P2-N054 defect caught
before any deploy, in the workflow that holds no credentials.

### 2. The preview deployment of an unmerged pull request

A **preview deployment** is a second CloudFormation stack,
`project-orchestrator-service-preview`, deployed from a pull
request's merge ref, with its own HTTP API, two aliases and Function
URL. The reviewer calls the same shape of endpoint production has,
gateway included, and production is untouched.

`.github/workflows/preview.yml` starts it on `workflow_dispatch`,
taking the pull request number. Dispatching on `main` keeps the OIDC
subject at `refs/heads/main`, so no trust policy changes, and the
definition used is always `main`'s: a pull request cannot rewrite the
workflow that deploys it. A head repository other than
`majodali/project-orchestrator-service` is refused by name and
nothing is deployed — the repository is public, and a fork's code must
not reach these credentials.

The run invokes `scripts/deploy.sh` with `STACK_NAME` overridden and
nothing else, then repeats production's sequence: publish, point
`preprod`, smoke-test the preview Function URL, promote the preview's
own `live`. That last step is load-bearing — it leaves the preview's
`live` at a numbered version, so the next run's read-back does not hit
`deploy.sh`'s `$LATEST` refusal. One reusable stack keeps one API id,
so the preview URL is fixed and only the commit it serves changes,
which `service_identity` says. A dispatchable job tears the stack
down; a daily run redeploys it from `main` (corrected by T252, F3).

### 3. The service starts it, and tells the reviewer

At `task_open` of a `verify` step whose node carries a pull request in
a repository with a preview configured, the service dispatches the
preview run for that pull request and answers the preview endpoint,
the pull request and the run it started (D148). The endpoint and the
workflow are configuration, not code that branches on a repository
name (D067); a deployment with none configured answers the step as it
does today. A failed dispatch is reported in the answer and never
fails the claim: the reviewer falls back to the manual dispatch.

The reviewer waits for `service_identity` on the preview to answer
its own commit, then checks its criteria against that endpoint with
the preview's own bearer token, `PREVIEW_MCP_AUTH_TOKEN` in its
session environment (D151 as answered; corrected by T252, O-prev-7).

### 4. What the owner's hand is still needed for

One-time: the preview credential, the project the preview serves, the
repository variables and the App permission (O-prev-1 to O-prev-5).
Per pull request: nothing.

## What this node does not cover

- **A gateway check after promotion.** Production's smoke test still
  runs against the preprod Function URL; a synthetic check of the
  live endpoint between deploys stays excluded by P2-N012's gate
  (decision 5), as do traffic shifting, a second AWS account and
  CodeDeploy preferences.
- **A service rule that forces a preview**, refusing to merge a
  service pull request whose verification recorded none. The
  reviewer's page carries the duty first; a rule is a later node if
  the duty slips.
- **Previews for any repository but the service.** Other projects'
  nodes do not deploy on merge.
- **The service's Workflow declaration** is unchanged: an unmerged
  pull request is `development`, which the declared
  `development → preprod → live` covers.

## Repository access

Writes `majodali/project-orchestrator-service` (standing scope,
RU-016) and this repository. The project the preview serves may add a
repository new to the project, which is the owner's — decision 2.

## Leaf or interior

**Interior.** Four children, cut by feature; A is independent and
ships alone, D needs B and C. Identifiers are issued at break down,
and each child that writes the service repository carries
`start: approve`.

- **A — Route coverage in the pull-request checks.** Criteria 1 to 3.
  No credentials, no deployment, and on its own it would have caught
  P2-N054.
- **B — The preview deployment.** Criteria 4 to 12; needs O-prev-1 to
  O-prev-3.
- **C — The service dispatches the preview.** Criteria 13 to 16;
  needs O-prev-4 and child B.
- **D — Verification before merge, in the process, and the
  demonstration.** Criteria 17 to 20, in this repository.

## Verification criteria

Refined by [the specification](../specs/p2-n063-verify-before-deploy.md);
this is the plan-stage statement it grew from.

1. The pull-request checks fail when a path `src/httpApp.ts`
   registers has no route key in `template.yaml`, and when a route
   key has no registered path; every exemption is in one place in the
   check with the reason it stays.
2. Break-and-restore, both runs recorded in the pull request: with
   `McpProjectRoute` removed the check fails naming
   `/mcp/{owner}/{repo}`; restored, it passes.
3. `checks.yml` still declares `contents: read` and no
   `id-token: write` with the check added.
4. A preview run deploys a named pull request's merge ref to the
   preview stack by invoking `scripts/deploy.sh` with `STACK_NAME`
   overridden; no second `sam deploy` call exists in the repository,
   and the workflow definition used is `main`'s.
5. A pull request whose head repository is not
   `majodali/project-orchestrator-service` is refused, naming that
   head repository, and nothing is deployed.
6. The preview answers through its own API Gateway endpoint:
   `/health` returns 200, and `/mcp/<owner>/<repo>` answers
   `service_identity` at the pull request's head commit.
7. The run publishes a version, points the preview's `preprod` at it,
   smoke-tests the preview Function URL, and promotes the preview's
   own `live` only when that passed.
8. A second preview run onto the existing preview stack succeeds:
   `deploy.sh`'s `$LATEST` refusal does not trigger, because the
   previous run left the preview's `live` at a numbered version.
9. Production is untouched across a preview run: its `live`
   `FunctionVersion` and the commit `service_identity` answers at the
   production endpoint are the same before and after, both recorded.
10. The preview serves only the project list decision 2 settles, and
    `majodali/project-orchestrator`'s `orchestration/state.json` gains
    no commit over a preview run that exercises a write tool, shown
    by that file's commits across the run.
11. A dispatchable teardown job deletes the preview stack and a daily
    run redeploys it from `main` (T252, F3); after a teardown
    production still answers (recorded), and the next run recreates it.
12. The service's `docs/runbook.md` has a preview section: the stable
    endpoint, how a preview is started, what it serves, how it is torn
    down, and O-prev-1 to O-prev-5. No token value appears in the
    workflow, its log, a comment or the runbook.
13. At `task_open` of a `verify` step whose node carries a pull
    request in a repository with a preview configured, the service
    dispatches the preview run and answers the preview endpoint, the
    pull request and the run.
14. No code in `src/` branches on a repository or project name for
    this (D067): the endpoint and the workflow are configuration, and
    a deployment with none configured answers a `verify` step exactly
    as today, shown by a test.
15. A failed dispatch is named in the `task_open` answer, with the
    manual dispatch as the fallback, and the claim still commits.
16. The App permission the dispatch needs is named in the service's
    runbook, and no log line or refusal message carries a token (the
    standing constraint).
17. `.claude/agents/reviewer.md` says what a reviewer does with a
    criterion needing a running deployment: that `task_open` answers
    a preview endpoint, how it confirms the preview serves its own
    commit, which token it uses, that it calls the preview and never
    production, and that its record names the endpoint and commit.
18. `docs/process/task-loop.md` (Pull requests and done) and
    `docs/process/how-we-work.md` say that a criterion needing a
    running deployment is verified against a preview before the
    merge, so no merge waits on the owner.
19. One demonstration end to end, recorded in
    `docs/plans/p2-n063-verify-before-deploy-record.md`: a service
    node whose criteria need a running deployment is verified against
    a preview and reaches `done` with no merge by the owner's hand,
    naming the node, the pull request, the endpoint, the commit tested
    and the verification's close.
20. `npm run check`, `npm test`, `npm run lint` and `npm run format`
    pass in both repositories and `sam validate --lint` passes in the
    service repository; documentation moves in the same pull request
    as its work; and no pull request changes one of the five files
    the service owns.

## Owner actions

- **O-prev-1** — create the preview credential decision 1 settles,
  and record its ARN.
- **O-prev-2** — provide the project the preview serves (decision 2):
  the repository, its `orchestration/state.json`, the App installed.
- **O-prev-3** — set the repository variables the preview workflow
  reads: the preview role ARN, the preview stack name, the preview
  project list. None is a secret value.
- **O-prev-4** — grant the App the dispatch's permission (decision 4).
- **O-prev-5** — nothing per pull request. Recorded so the answer to
  "what the owner's hand is still needed for" is in this document.

## Decisions for the gate

Four questions go to the owner at this close, each with its options
and default in the view; the defaults are what this plan is written
to. In short:

1. **The preview's credential** — the deploy role cannot create a
   second stack (its CloudFormation permission is scoped to
   `stack/project-orchestrator-service/*`). Default: a second role
   scoped to the preview stack, trusted for the same OIDC subject,
   rather than widening the production one.
2. **What the preview serves** — a write tool on the preview commits
   to a real project's default branch with the real App key. Default:
   a fixture repository, `majodali/orchestrator-preview`, with its own
   state file and the App installed, as the preview's only project.
3. **Running an unmerged pull request's code with the deployment's
   secrets** — the boundary P2-N012's gate decision 3 drew. Default:
   accept it, bounded by explicit dispatch and never a pull-request
   event, the workflow definition from `main`, same-repository pull
   requests only, and decision 1's preview-scoped credential.
4. **The App permission for the dispatch** — `Actions: Read and
   write` on the service repository, which the App does not hold
   today. Default: grant it, since D148 sends this into the service.

## References

- [orchestration-service](orchestration-service.md) — the parent plan
  and its standing constraints, constraint 3 above all
- [p2-n012-deploy-from-ci-on-merge](../archive/plans/p2-n012-deploy-from-ci-on-merge.md)
  — archived: what the deploy path is and why, including the
  exclusions this plan departs from by name
- [the task loop](../process/task-loop.md), Pull requests and done
- RU-016 (repository access), RU-019 (a measurement is met by its
  record), D067 (no code branches on a project name), D148 (work into
  the service), R14 (dependency search is an attack surface)
