# Service change verified before it is deployed — specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded
     by X, because Y | closed → Backlog entry). Anything unmarked here
     is a live claim of current intent. This is node P2-N063's
     specification: `active` at the owner's acceptance,
     `closed → Backlog entry` when the node is `done`. -->

Node **P2-N063**, child of
[the orchestration service](../plans/orchestration-service.md),
specifying the outcome its
[plan](../plans/p2-n063-verify-before-deploy.md) fixed (T243). The
plan decided *what* and *why* — route coverage proved without a
deployment, a preview stack for an unmerged pull request, the service
dispatching it, four children — and that is cited here, not retold.
This is a separate file because the plan stands at exactly 300 lines,
its bound ([how we work](../process/how-we-work.md)). Depth is the C1
profile's: a list a verifier can check. Written against the service
repository at `main` and the production endpoint, read 2026-11-24.
## What the owner's four answers changed

D149, D150 and D152 were answered with their defaults, which the plan
is written to. **D151 was answered with an amendment**, and it moves
the design: preview-only secrets, a second GitHub App installed on the
fixture repository alone, its own bearer token, and *"no preview holds
the production App key or the production token."* So the preview
resolves **three** secrets of its own — `template.yaml` resolves
`AuthTokenSecretName`, `GithubAppPrivateKeySecretName` and
`ViewTokenSecretName`, none has a default, and `scripts/deploy.sh` and
`sam deploy` each refuse without them — and its `GITHUB_APP_ID` is the
second App's. One consequence contradicts the plan, whose *The service
starts it, and tells the reviewer* says the reviewer uses "the bearer
token already in its session environment — the same secret, so none is
minted". Under D151 as answered that is wrong. This task corrects that
paragraph and specifies **O-prev-7**: the preview's own token reaches a
session as `PREVIEW_MCP_AUTH_TOKEN`, the way `MCP_AUTH_TOKEN` already
does (`.mcp.json`). The service never carries a token value in an
answer; that would be a secret pasted into a transcript.

## Three findings

**F1 — the preview job can assume the production deploy role.**
D149's option A words the preview role as "trusted for the same OIDC
subject (this repository's `main` ref)", and the production deploy
role is trusted for that same subject (`deploy.yml`'s
`EXPECTED_OIDC_SUBJECT`,
`repo:majodali@576567/project-orchestrator-service@1347863895:ref:refs/heads/main`).
A preview run is dispatched on `main`, holds `id-token: write` and
runs the pull request's own `scripts/deploy.sh` — so that code can mint
a second OIDC token, assume the **production** role and deploy itself
to production, defeating all four bounds D151 accepted. The remedy is
a subject the production role does not accept: a job naming a GitHub
Environment carries `repo:<owner>/<repo>:environment:<name>` instead
of the `ref:` form (GitHub's OIDC claims reference; **read, not tested
here**). So the preview job runs in an Environment named `preview`,
the preview role trusts that subject, the production role keeps
trusting only the `ref:refs/heads/main` one, and child B proves it
from the claim the run's own preflight prints. This departs from
D149's wording, so it is **decision 5**.

**F2 — four paths API Gateway does not route today.** Observed
2026-11-24 against the production endpoint: `GET /view/version` and
`GET /view/app.js` answer 404 with API Gateway's own body,
`{"message":"Not Found"}`, while `GET /health` answers 200 from the
application and `GET /view` answers 303. Read from the service
repository at `main` and **not probed, because a probe would be a
write**: `POST /view/decision/{id}/close` and
`POST /view/node/{id}/action` are registered in `src/view/routes.ts`
with no `AWS::ApiGatewayV2::Route` route key in `template.yaml`. Those
two are how the owner closes a decision and accepts a node in the
view. The template declares eight route keys and no `$default`;
`src/view/routes.ts` registers ten paths. This is P2-N054's fault
class, live, recorded in neither `docs/plan.md`, `docs/backlog.md` nor
`docs/open-risks.md`, and what child A's check exists to catch — so
that check **fails over the tree as it stands**. Where the fix lands
is **decision 6**.

**F3 — a daily teardown moves the endpoint the service holds.** The
plan asks both for "one reusable stack keeps one API id, so the
preview URL is fixed" and for "a scheduled daily run [to] tear the
stack down". Deleting the stack deletes its HTTP API, and a recreated
API has a new id, so the configuration child C reads would name the
endpoint wrongly. The hygiene the daily run buys — no unreviewed code
left running — is kept without that cost: the daily run **redeploys
the preview from `main`**. Teardown stays dispatchable, and the
runbook says a teardown changes the endpoint, so `PREVIEW_DEPLOYS`
must be set again. Nothing is saved by deleting it: the three secrets
outlive a teardown, and an idle HTTP API and Lambda cost nothing.

## The preview's names

The stack is `project-orchestrator-service-preview`; the deploy role
`project-orchestrator-service-preview-deploy`; the GitHub Environment
`preview`; the workflow `.github/workflows/preview.yml`; the fixture
project `majodali/orchestrator-preview` (D150); and the three secrets
`project-orchestrator-service-preview/mcp-auth-token`,
`…/github-app-private-key` and `…/view-token`, each under that same
first segment.

Two carry weight. That secret segment is one the production deploy
role's Secrets Manager statement
(`project-orchestrator-service/<name>-*`,
`docs/deploy-role-permissions.md`) does not match, so that role cannot
read them. And the stack name makes every generated Lambda and IAM
name begin `project-orchestrator-service-preview-`, so the preview
role is scoped to that prefix, not to
`project-orchestrator-service-*`, which would include the production
function and its `live` alias — that document's naming caveat, read
the other way round.

## P2-N063's own criteria

Properties no single child establishes; P2-N063's `verifying` runs
after A to D are `done`.

1. **One demonstration, end to end**, recorded in
   `docs/plans/p2-n063-verify-before-deploy-record.md` (at most 300
   lines): a service node whose criteria need a running deployment is
   verified against a preview and reaches `done` with no merge by the
   owner's hand, naming the node, the pull request, the endpoint, the
   commit tested and the verification's close.
2. **Production untouched across that demonstration**: `live`'s
   `FunctionVersion` and the commit `service_identity` answers at the
   production endpoint, recorded before and after, differ only by the
   demonstrated node's own merge and deploy.
3. **Nothing the preview holds reaches production.** The preview
   role's policy names no production resource: CloudFormation only
   `stack/project-orchestrator-service-preview/*` and the SAM managed
   stack; Lambda and IAM only names beginning
   `project-orchestrator-service-preview-`; Secrets Manager only the
   three preview secrets. And the run's OIDC token carries a `sub` the
   production role's trust policy does not accept, shown by the claim
   its preflight printed and by that policy's text. Both recorded.
4. **No secret value appears** in either repository's pull requests, a
   run's log, the runbook's preview section, this document or the
   record. Checked by reading them.
5. **Nothing recurs for the owner**: the record lists O-prev-1 to
   O-prev-7 done and names no per-pull-request action.
6. `npm run check`, `npm test`, `npm run lint` and `npm run format`
   pass here; `npm test`, `npm run lint`, `npm run format` and
   `sam validate --lint` pass in the service repository; documentation
   moves with its work; no pull request changes one of the five files
   the service owns.

## The four children, and where their criteria go

Each child's criteria list is written into that child's `note` at
break down, following **D123** on P2-N046, because this document
stands under the 300-line bound and five lists do not fit in it. The
plan's items 1 to 3 are child A's, 4 to 12 child B's, 13 to 16 child
C's, 17 and 18 child D's; 19 and 20 are P2-N063's own criteria 1 and
6; item 9 is both child B's (per run) and criterion 2 (per node); item
11 is amended by F3. Seven list items are new here: the
method-and-path comparison and F2's four route keys (A), the
Environment subject and the role's scope (B), `task_next` dispatching
nothing (C), and the preview's own token (O-prev-7, D).

**A — route coverage in the pull-request checks.** Service
repository; independent of B, C and D, and on its own it would have
caught P2-N054. A test in `test/`, run by the existing Test job under
`npm test`, compares every `RouteKey` of an
`AWS::ApiGatewayV2::Route` in `template.yaml` with every path the
application registers — `src/httpApp.ts` and the `src/view/routes.ts`
registrations it mounts — and fails when either side has a path the
other lacks. It reads the files; nothing is deployed and no credential
is used, so `checks.yml` keeps `contents: read` and no
`id-token: write`, gains no job, and no dependency is added (R14).
`test/viewDeployWiring.test.ts` already parses those resources and
their route keys; the test reuses that reading. Comparison is by
method and path, with Hono's `:name` read
as `{name}`, `app.get`/`app.post` as `GET`/`POST` and `app.all` as
`ANY`, and a path variable's *name* normalised away on both sides
because API Gateway matches positionally. One exemption, in one place
with the reason it stays: the application's `GET /view/*` fallback,
for which API Gateway has no equivalent that keeps the template an
explicit allow-list.

**B — the preview deployment.** Service repository; needs O-prev-1 to
O-prev-5. `.github/workflows/preview.yml`, on `workflow_dispatch` with
the pull request number, deploys that pull request's merge ref
(`refs/pull/<n>/merge`) to the preview stack by invoking
`scripts/deploy.sh` with `STACK_NAME` and the preview's own secret
names, App ID and project list in the environment, and nothing else —
no second `sam deploy` call in the repository, and the definition that
runs is `main`'s. A head repository other than
`majodali/project-orchestrator-service` is refused, named, **before
any credential is configured**. The job runs in the `preview`
Environment (decision 5), with `persist-credentials: false` on
checkout so the code inherits no GitHub token, the role assumed after
`npm ci` so an install script runs without it, and one `concurrency`
group because there is one preview stack.
The role's policy lives in the service repository beside
`docs/deploy-role-permissions.md`, scoped as criterion 3 states and
carrying that document's naming caveat. The run repeats production's
sequence on the preview's own aliases, and the daily run redeploys
from `main` (F3).

**C — the service dispatches the preview.** Service repository; needs
B and O-prev-6. At `task_open` of a `verify` step, where the verified
node's repository has a preview configured and that node carries a
pull request, the service dispatches the run and the answer gains the
endpoint, the pull request, the workflow and where its runs appear;
`workflow_dispatch` answers no run identifier, so the answer names the
workflow's run list and says the run takes a moment to appear. The
service does not poll. `task_next` dispatches nothing, so reading the
offered work cannot start a deployment. The preview is configuration,
not a name in the code (D067): one environment variable,
`PREVIEW_DEPLOYS`, read by a module in the shape of `src/projects.ts`
— items `<owner>/<repo>|<workflow file>|<endpoint>`, comma separated,
a malformed or duplicate item refused by naming what was required and
found (RU-013).

**D — verification before merge, in the process.** This repository;
needs B and C. `.claude/agents/reviewer.md` gains what a reviewer does
with a criterion that needs a running deployment: that `task_open`
answers a preview endpoint, how it confirms the preview serves the
pull request's own commit (`service_identity`), which token it uses
(`PREVIEW_MCP_AUTH_TOKEN`, never `MCP_AUTH_TOKEN`, and never
printed), that it calls the preview and never production, and that its
record names the endpoint and the commit.
`docs/process/task-loop.md` (*Pull requests and done*) and
`docs/process/how-we-work.md` gain the rule itself; `task-loop.md` is
at exactly 300 lines, its bound, so the sentence is carried by the
existing bullets.

## The owner's actions, exactly

This supersedes the plan's O-prev-1 to O-prev-5, written before D151's
amendment. Nothing is created until a child's task asks for it;
O-prev-1 to O-prev-5 come before child B's first run, and O-prev-6 and
O-prev-7 after it, because O-prev-6 needs the endpoint that run
prints.

- **O-prev-1 — the second GitHub App** (D151). A new App owned by
  `majodali`, repository permissions **Contents: Read and write** and
  **Pull requests: Read and write** (what the write tools need),
  installed on **`majodali/orchestrator-preview` and nothing else**.
  Record its numeric App ID, which is not secret, and generate a
  private key. It never holds `Actions`.
- **O-prev-2 — the fixture repository** (D150):
  `majodali/orchestrator-preview`, with its own
  `orchestration/state.json`, and O-prev-1's App installed on it. A
  repository new to the project, which is the owner's (RU-016).
- **O-prev-3 — the three preview secrets**, in the production stack's
  region, under exactly the names above: a freshly minted bearer
  token, O-prev-1's PEM private key, and a freshly minted view token.
  No production value is reused, and none is pasted elsewhere.
- **O-prev-4 — the preview deploy role**,
  `project-orchestrator-service-preview-deploy`, with the policy child
  B delivers and the trust subject decision 5 settles. Record its ARN.
- **O-prev-5 — the `preview` GitHub Environment** on
  `majodali/project-orchestrator-service`, with these environment
  variables, none a secret value and none permitted to begin `GITHUB_`
  (GitHub's rule for configuration variables):
  `AWS_PREVIEW_DEPLOY_ROLE_ARN`, `PREVIEW_STACK_NAME`,
  `PREVIEW_AUTH_TOKEN_SECRET_NAME`, `PREVIEW_SERVICE_GITHUB_APP_ID`,
  `PREVIEW_SERVICE_GITHUB_APP_PRIVATE_KEY_SECRET_NAME`,
  `PREVIEW_VIEW_TOKEN_SECRET_NAME` and `PREVIEW_MCP_PROJECTS`.
- **O-prev-6 — the dispatch** (D152): grant the **production** App
  `Actions: Read and write` on `majodali/project-orchestrator-service`
  and set the repository variable `PREVIEW_DEPLOYS` to the one item
  child C defines, with the endpoint child B's first run printed.
- **O-prev-7 — the preview token in a session**: make O-prev-3's
  bearer token available to a session as `PREVIEW_MCP_AUTH_TOKEN`,
  beside the `MCP_AUTH_TOKEN` that `.mcp.json` already expands. It is
  never pasted into a repository, a tool call or a transcript.
- **O-prev-8 — nothing per pull request**, recorded so the answer to
  "what the owner's hand is still needed for" is here.

## Decisions for the gate

Two, each in the view with its options and default; this document is
written to the defaults.

5. **The preview run's OIDC subject** — F1. Default: the job runs in
   the `preview` Environment and the preview role trusts
   `…:environment:preview`, so the production deploy role, trusting
   only `…:ref:refs/heads/main`, cannot be assumed from a preview run.
6. **Where F2's four unrouted view paths are fixed.** Default: child
   A's pull request, with the check that finds them.

## Terms introduced

- **Preview deployment** — the plan's term, unchanged here.
- **Fixture project** — the repository a preview serves in place of a
  real project; D150's `majodali/orchestrator-preview`.
- **Environment subject** — the `sub` claim GitHub puts in the OIDC
  token of a job that names a GitHub Environment,
  `repo:<owner>/<repo>:environment:<name>`, as against the `ref:` form
  a job without one carries.

## References

The [plan](../plans/p2-n063-verify-before-deploy.md) — what and why —
and through it [orchestration-service](../plans/orchestration-service.md)
and [p2-n012-deploy-from-ci-on-merge](../archive/plans/p2-n012-deploy-from-ci-on-merge.md).
Cited: D149 to D152 (this node's), D067, D123, D148, RU-013, RU-016,
RU-019, R14.
