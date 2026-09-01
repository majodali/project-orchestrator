# Deploy the service from CI on merge

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P2-N012; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node P2-N012, child of P2-N001
([orchestration-service](orchestration-service.md)). Not a chunk: a
delivery-mechanics node in the position
[P1-N008](p1-n008-mtool-checker-extension-point.md) held under the
founding plan. The work lands in
[majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service);
this plan lives here with the rest of the plan hierarchy.

## Outcome

A merge to `main` in the service repository deploys the service,
proves the deployed code works against a real endpoint, and only then
puts it in front of users — with a red workflow, not a silent outage,
when it does not.

Concretely, at `done`:

- every pull request runs build, lint, test and `sam validate --lint`,
  with no path to the deploy credentials;
- a merge to `main` publishes a Lambda version, points the `preprod`
  alias at it, and smoke-tests it over HTTPS;
- the smoke test exercises `/health`, `tools/list`, and a full lease
  acquire-and-release cycle against a preprod table;
- a passing smoke test promotes the version by repointing the `live`
  alias; a failing one leaves `live` untouched and the run red;
- the service repository's Classification declares a Workflow, so
  `deployed` is derivable rather than falsely absent.

## Why this node exists

A deploy took the whole service down and nothing noticed until a
session curled the endpoint. Two defects in two days were invisible to
a passing test suite and visible in one HTTP call. An ESM bundle could
not initialise in Lambda, and a DynamoDB reserved word appeared in a
condition expression no test had ever sent. Both are the same class:
a check that cannot fail in the environment where the code actually
runs. One HTTP call against a real endpoint catches both.

## How much machinery this deserves

Constraint 3 of the [parent plan](orchestration-service.md), degrade
to git-only, bounds this node. A session whose service is down falls
back to the v1 process and keeps working, so an outage here is
expensive attention, not stopped work
([R12](../open-risks.md), service outage stops work). That buys the
small machinery — one alias, one smoke test, one alias repoint — and
argues against the large machinery. Traffic shifting, deployment
preferences and a second stack are excluded below for this reason,
not overlooked.

## Approach

The design below was settled with the owner on 2026-09-01. It is
recorded here, not reopened.

### Credentials and the two workflows

Deployment credentials come from GitHub OIDC to the role the owner has
already provisioned,
`arn:aws:iam::656557768279:role/project-orchestrator-service-deploy`.
No long-lived AWS secret exists in an S1 repository to leak.

Two workflow files, because they need different permissions:

- **Checks**, on `pull_request`: build, lint, test,
  `sam validate --lint`. Permissions are `contents: read` only, with
  no `id-token: write`, so no job in it can assume any AWS role.
- **Deploy**, on `push` to `main`: OIDC, deploy, smoke, promote.

Third-party actions are pinned to commit SHAs, and the smoke test uses
`curl` and Node built-ins rather than a new dependency
([R14](../open-risks.md), dependency search is an attack surface).

### One deploy path

The deploy job invokes `scripts/deploy.sh`, the same script a human
runs today. CI and the hand-deploy cannot then drift, and the outage
class this node exists to stop does not reappear as "the pipeline
deploys something the runbook does not describe". The script's inputs
are secret *names* and GitHub App IDs, none of them secret values, so
they become repository variables rather than Actions secrets.

### The preprod alias and the version that serves it

A new version is deployed and exercised without becoming production.
The `preprod` alias points at the newly published version and is
exposed by a **Lambda Function URL**, not a second API Gateway. One
resource, and it avoids the stage-prefix defect class that caused the
first outage. The URL carries the same bearer auth the production
endpoint does.

Production traffic must be bound to the `live` alias for
"deploy, then promote" to mean anything; an integration left on
`$LATEST` would serve untested code the moment the stack updated.
Two template constraints follow, and child A below verifies both
before anything is built on them:

1. The production HTTP API integration resolves to the `live` alias.
2. A stack update does not reset `live` to the version just deployed.

### Choosing the lease table from the invoked alias

Lambda environment variables belong to the function version, not to
the alias, so one published version serves both aliases and cannot be
told apart by configuration. The handler therefore reads its own
qualifier from the invoked ARN and picks the lease table from it:
`live` selects the production table, `preprod` the preprod table.

It fails closed. An unrecognised qualifier, `$LATEST` included,
refuses rather than defaulting to the production table. The
fail-closed rule is scoped to running under Lambda, so the local dev
server and the existing test suite, which have no qualifier at all,
keep working from `LEASE_TABLE_NAME` as they do today.

The preprod table is permanent, not created per run, and TTL cleans it.

### The smoke test, and where its token comes from

Three checks against the preprod Function URL:

1. `/health` returns 200.
2. `tools/list` carries all six tools (`service_identity`,
   `plan_read`, `plan_lease_acquire`, `plan_update`, `plan_confirm`,
   `plan_lease_release`).
3. A full lease acquire-and-release cycle against the preprod table.

Check 3 is the one that would have caught the reserved-word defect,
because it is the only one that sends a condition expression to real
DynamoDB.

The job already holds the deploy role, so it reads the bearer token
from Secrets Manager at smoke time rather than keeping a copy as an
Actions secret. That honours "no new secrets" literally: no secret
value gains a new home. It costs one IAM permission
(`secretsmanager:GetSecretValue` on that one secret) on the deploy
role.

### Promotion and rollback

Promotion is repointing `live` at the tested version. It is atomic,
and rollback is repointing back. On smoke-test failure `live` is
simply left where it was, so production never sees the bad version and
no rollback is needed for the common case.

## What this node does not cover

Named so their absence is not read as oversight. Each has a Backlog
entry.

- **Gradual traffic shifting and CodeDeploy deployment preferences.**
  The promotion is an alias repoint, all at once. Canaries buy less
  than they cost at this traffic volume and under constraint 3.
- **A second stack or a second AWS account for preprod.** One stack,
  two aliases, two tables. A second stack doubles the deploy surface
  to isolate a service whose outage is survivable.
- **Continuous monitoring and alerting.** The smoke test catches
  breakage a deploy causes. It does not catch breakage that arrives
  between deploys, such as an expired credential. A scheduled
  synthetic check is a different fix, and is Backlog.
- **CI for the coordinating repository.** `form_check.ts` and `mtool`
  on pull requests here is worth doing and is not this node.

## Leaf or interior

**Interior.** The node spans an unverified platform assumption, a
credential-free check workflow, a runtime behaviour change in the
service, and a deploy-and-promote workflow that cannot be fully
verified until the owner has acted. Children B, C and D each validate
separately, and child A must be able to invalidate the design before
the other three exist.

The decomposition leads with the assumption spike rather than a thin
end-to-end slice. The usual reason for the slice, surfacing a
structural error before fan-out compounds it
([R8](../open-risks.md), premature fan-out), is served better here by
the spike: what is in doubt is a platform fact, not the integration.

### Proposed children, in dependency order

IDs are the Orchestrator's to issue.

**Child A — The alias assumptions, verified against AWS
documentation.** Confirm, in writing, that environment variables are
per-version rather than per-alias; that the handler can read its
invoked qualifier through `hono/aws-lambda`; that a Function URL can
be bound to an alias; that the production integration can be bound to
`live`; and that a stack update does not reset the `live` alias. The
finding is committed. A false assumption returns this node to `plan`
and costs one task rather than the node.

**Child B — Pull-request checks that cannot deploy.** The
`pull_request` workflow: build, lint, test, `sam validate --lint`,
`contents: read`, no `id-token: write`, actions pinned by SHA.
Independent of A, C and D, and shippable on its own.

**Child C — Alias-aware lease-table selection, failing closed.** The
qualifier read, the table mapping, the refusal on an unrecognised
qualifier, the preprod table, the second IAM grant, the preprod alias
and its Function URL, and the binding of production traffic to `live`.
Verified by unit tests locally, re-verified against the deployment by
child D.

**Child D — Deploy, smoke, promote, on merge to `main`.** The `push`
workflow end to end, the three-check smoke test, promotion by alias
repoint, the runbook's rollback and smoke-failure procedures, and the
Workflow declaration in the service repository's Classification. This
child is what the owner sees working.

## Dependencies

- **Cross-repo scope.** The execute stage writes
  `majodali/project-orchestrator-service`. The grant covering chunk 1
  reached node P2-N002 and its children; P2-N012 is not among them, so
  the scope grant must name the service repository again before any
  role touches it (dispatch's cross-repo-reach rule).
- **Both outage fixes on `main`.** The ESM bundle fix and the
  reserved-word fix must be merged before the first CI deploy, or the
  first run goes red on a known defect and teaches nothing.
- **Owner actions O7–O10** below. Only child D blocks on them.
- **Not** a dependency: node P2-N011 (degrade to git-only). See
  decision 6 for the sibling-ordering consequence.

## Verification criteria

Refined by the specification stage; this is the plan-stage statement
it grows from. The node is complete when:

1. A pull request runs build, lint, test and `sam validate --lint`,
   and its workflow holds no `id-token: write` permission.
2. A pull request from a fork, and a pull request that edits either
   workflow file, cannot assume the deploy role. The deploy role's
   trust policy restricts the OIDC subject to this repository's `main`
   ref, so the boundary holds at AWS and not only in YAML.
3. A merge to `main` publishes a version and points `preprod` at it,
   without changing what production serves.
4. The smoke test runs all three checks against the preprod Function
   URL, and its lease cycle writes to the preprod table.
5. A deliberately failed smoke test leaves `live` at its previous
   version and the workflow run red.
6. A passing smoke test repoints `live`, and the production endpoint
   answers from the new version.
7. A request whose qualifier is neither `live` nor `preprod` is
   refused, and the refusal names the qualifier.
8. The local dev server and the test suite still run without a
   qualifier.
9. The service repository's Classification declares the Workflow in
   the canonical form, and its Backlog entries carry stages
   consistent with it.
10. `docs/runbook.md` in the service repository covers rollback,
    smoke-test failure, and what the pipeline does that
    `scripts/deploy.sh` alone does not.
11. Both repositories' Backlogs are current in the same commits as
    the work (W-003).
12. `node plugin/scripts/form_check.ts` passes clean here.

## Owner actions

Numbering continues chunk 1's O1–O6 so no action is referred to twice
under two names.

- **O7** — confirm the deploy role's trust policy restricts assumption
  to this repository's `main` ref, and that its permissions cover
  version publish, alias update, Function URL configuration, the
  preprod table, and `secretsmanager:GetSecretValue` on the bearer
  token secret.
- **O8** — set the repository variables the deploy workflow passes to
  `scripts/deploy.sh`: region, secret names, GitHub App ID and
  installation ID. None is a secret value.
- **O9** — merge the first pipeline pull request, watch the first CI
  deploy, and record the preprod Function URL in the runbook. This is
  the demonstration.
- **O10** — make the pull-request checks required for merge in branch
  protection. Without it the checks are advisory.

## Monotonicity

No planned non-monotonicity. Child C changes how the lease table is
chosen at runtime, and every existing test that supplies
`LEASE_TABLE_NAME` without a qualifier keeps passing by the
fail-closed rule's Lambda-only scope. Should that prove wrong in
execution, it returns to the owner under W-002 rather than being
absorbed.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics. The owner's go-ahead adopts every default not overridden by
number. The [Ruling register](../rulings.md) was checked for
near-matches: RU-009 (work reaches `main` by pull request) is the only
one that touches this node, and it is consistent with everything
below.

1. **The Workflow declaration.** Default: replace the service
   repository's `Workflow: none declared` line with this text.

   ```
   - **Workflow**: `stages: development → preprod → live; live = live;
     backlog default: checked ⇒ live, unchecked ⇒ development` — work
     is in `development` until it merges to `main`. Merging publishes
     a Lambda version behind the `preprod` alias and smoke-tests it;
     passing promotes it by repointing the `live` alias, which is
     production. An entry whose version failed the smoke test and was
     not promoted carries an explicit `stage: preprod` marker.
   ```

   Rationale: it is the methodology's canonical three-part form, its
   stage names are the alias names so declaration and infrastructure
   share one vocabulary, and it makes `deployed` derivable for a
   service that has been deployed since 2026-08-27. Declaring it costs
   no new duties: no rule in v1.4.0 currently carries a `[deployed]`
   tag, the Operations section being reserved and empty, and Q-004
   (functional tests against a deployed test environment) applies at
   C2+.

   Not proposed, and worth one line because
   [plan-model](../process/plan-model.md) has a SHOULD about it: the
   node lifecycle's stages are deliberately **not** folded into this
   declaration. The service repository has no Plan register of its
   own, so its Backlog would be a second carrier of stages the
   coordinating repository's register owns, which is the drift that
   SHOULD exists to prevent.

2. **Verification before construction.** Default: child A, the
   assumption spike, is the first task of the execute stage, and no
   other child starts until its finding is committed. Rationale: the
   alias and environment-variable behaviour is the assumption the
   whole design rests on and it could not be confirmed from the
   planning session; sequencing it first makes a wrong assumption cost
   one task instead of the node.

3. **What the pull-request checks may not do.** Default: the
   `pull_request` workflow declares `contents: read` and no
   `id-token: write`, the deploy workflow triggers only on `push` to
   `main`, `pull_request_target` is not used, and the deploy role's
   trust policy restricts the OIDC subject to this repository's `main`
   ref. Rationale: a fork PR and a PR that edits a workflow file both
   run only the credential-free workflow, and the AWS-side subject
   restriction means a YAML mistake alone cannot grant deploy rights.

4. **Leaf or interior.** Default: interior, with children A–D above.
   Rationale: an unverified platform assumption, a check workflow, a
   runtime change and a deploy workflow validate separately, and A
   must be able to invalidate the design before the others exist.

5. **What this node does not cover.** Default: traffic shifting,
   CodeDeploy deployment preferences, a second stack or account,
   continuous monitoring and alerting, and CI for this coordinating
   repository are all out, each with a Backlog entry. Rationale:
   constraint 3 makes an outage here survivable, so the node buys the
   check that catches deploy-time breakage and stops.

6. **Execution order against node P2-N011.** Default: execute this
   node before P2-N011 (degrade to git-only). Rationale: this node has
   no dependency on P2-N011 and the owner has asked for the pipeline
   now; the departure is surfaced rather than taken quietly, because
   [dispatch](../process/dispatch.md) makes "earlier siblings `done`"
   the default entry condition for `execute` and P2-N011 is a child of
   the earlier sibling P2-N002.

## References

- [orchestration-service](orchestration-service.md) — the parent plan
  and its five standing constraints, constraint 3 above all
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md) — chunk 1,
  its owner actions O1–O6, and decision 7 on the lease
- [Risk register](../open-risks.md) — R12 (service outage stops work),
  R14 (dependency search is an attack surface)
- [Ruling register](../rulings.md) — RU-009 (work reaches `main` by
  pull request)
- methodology
  [vocabulary](https://github.com/majodali/methodology/blob/v1.4.0/docs/vocabulary.md) —
  the Workflow declaration format decision 1 conforms to
