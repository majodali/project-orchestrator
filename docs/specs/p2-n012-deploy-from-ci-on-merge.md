# Deploy the service from CI on merge — specification

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document for
     node P2-N012; it goes `active` when the owner accepts it and the
     breakdown at this node's gate, and `closed → Backlog entry` when the
     node reaches `done`. -->

Node **P2-N012**, child of
[orchestration-service](../plans/orchestration-service.md), specifying
the outcome fixed by its
[plan](../plans/p2-n012-deploy-from-ci-on-merge.md). The plan decided
*what* and *why* — pull-request checks that cannot deploy, a merge that
publishes a version behind a `preprod` alias, a smoke test against a
real endpoint, promotion by repointing `live` — and decided that the
node is **interior**, with children A–D. The Approach is settled and
is cited here, not retold.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria ([plan-model](../process/plan-model.md)), so everything in
*Verification criteria* is a property no single child establishes: a
composition, an equivalence, or a whole-node invariant. Criteria that
belong to one child are named as such and placed in *The breakdown*.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)).

The work lands in
[majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service),
permanently in this project's approved scope under
[RU-016](../rulings.md); this node's declaration of that reach is the
plan's *Dependencies* section and this sentence.

## Where the plan's twelve criteria went

The plan's *Verification criteria* is the plan-stage statement this
document refines. Six of its twelve items are a single child's
criterion and move there; the rest survive as node-level properties,
usually widened.

| Plan item | Disposition |
|---|---|
| 1 — PR runs the four checks, no `id-token: write` | Child **B** |
| 2 — fork PR and workflow-editing PR cannot assume the role | Node **I2** (spans B, D and O7) |
| 3 — merge publishes and points `preprod`, production unchanged | Node **G2** |
| 4 — three smoke checks, lease cycle on the preprod table | Child **D** (the three checks); node **G3** (the table is genuinely the preprod one) |
| 5 — failed smoke leaves `live`, run red | Node **G5** |
| 6 — passing smoke repoints `live`, production answers anew | Node **G4** |
| 7 — unrecognised qualifier refused, refusal names it | Child **C**; node **I3** covers why no external path reaches it |
| 8 — dev server and test suite run without a qualifier | Child **C**; node **I7** widens it to the whole corpus |
| 9 — Workflow declared, Backlog stages consistent | Child **D** (the text); node **P1** (declaration matches the aliases deployed) |
| 10 — runbook covers rollback and smoke failure | Child **D**; node **I8** (no human action outside O7–O10) |
| 11 — both Backlogs current (W-003) | Node **P2** |
| 12 — `form_check.ts` passes clean here | Node **P3** |

## Verification criteria

**G** is the demonstration the owner watches at O9. **I** is the
integration invariants that make it mean something. **P** is the
process and register state the node must leave behind.

### G. The gate demonstration — the first CI deploy

- **G1 — The pull request cannot deploy.** The node's own pull request
  runs the check workflow and nothing else. Its run holds no
  `id-token: write` permission and assumed no AWS role, readable in
  the run's job permissions rather than inferred from the YAML.
- **G2 — Merge stops at preprod.** The `push` run publishes a version
  and points `preprod` at it. Throughout that run and after it, the
  production endpoint's `service_identity` reports the *previous*
  commit; the preprod URL reports the new one. Production changed
  nothing.
- **G3 — The smoke test ran against real infrastructure, on the
  preprod table.** The run's log shows all three checks against the
  preprod Function URL. That the lease cycle used the preprod table
  and not the production one is shown by acquiring the same lease key
  through both URLs at once and both succeeding — two tables, one
  observation, no AWS credential.
- **G4 — Promotion is an alias repoint, and it is visible.** After the
  run goes green, the production endpoint reports the new commit. The
  run's log names the version `live` pointed at before and after, and
  the promote step is that repoint and nothing else.
- **G5 — Red means red, and production is untouched.** One
  deliberately failed smoke test (decision 7) leaves the run red,
  `live` at its previous version, and the production endpoint still
  answering from the previous commit. Performed, not reasoned about.
- **G6 — The numbers are written down.** The preprod Function URL and
  the observed end-to-end pipeline duration are recorded in
  `docs/runbook.md`, which is what O9 asks for.

### I. Integration invariants

- **I1 — One deploy path.** The deploy job invokes
  `scripts/deploy.sh`, the same script a human runs, and passes it
  only repository variables. The service repository contains no second
  deploy implementation. A change to the deploy sequence made in the
  workflow alone, or in the script alone, is a defect of this
  criterion.
- **I2 — The credential boundary holds at AWS, not only in YAML.** The
  check workflow declares `contents: read`, the deploy workflow
  triggers only on `push` to `main`, `pull_request_target` appears
  nowhere, and the deploy role's trust policy restricts the OIDC
  subject to this repository's `main` ref. The last clause is
  owner-attested (O7) — no dispatched session can read the policy —
  and the attestation is recorded with the gate rather than assumed.
- **I3 — Nothing outside the two aliases is reachable.** The
  production HTTP API integration resolves to `live`, the Function URL
  resolves to `preprod`, and the template exposes no third path and no
  unqualified one. The fail-closed refusal is therefore a unit-tested
  property of child C rather than a live one: there is no external
  route by which a caller reaches `$LATEST`, which is the stronger
  statement.
- **I4 — A stack update does not move `live`.** Deploying a second
  time, with a template change, leaves `live` at the version the last
  passing smoke test promoted. This is child A's riskiest assumption
  made live; a design that cannot satisfy it returns the node to
  `plan` rather than shipping with production on `$LATEST`.
- **I5 — Every assumption is exercised.** Each finding in child A's
  document names the later criterion that exercises it against real
  AWS. An assumption confirmed in documentation and never exercised is
  an unclosed item, not a closed one.
- **I6 — No secret value gained a new home.** The service repository's
  Actions secrets are unchanged, the repository variables hold secret
  *names* and App identifiers only, the smoke test reads the bearer
  token from Secrets Manager at run time, and neither repository's
  history carries a credential. Third-party actions are pinned to
  commit SHAs, and the smoke test adds no dependency
  ([R14](../open-risks.md)).
- **I7 — Monotonic.** The service's existing test corpus passes
  unchanged after children C and D land. No previously defined
  functional test was rewritten; the local dev server and the suite
  still run with no qualifier, from `LEASE_TABLE_NAME`. A rewrite
  proving necessary goes to the owner under W-002 rather than being
  absorbed.
- **I8 — Reproducible by the owner alone.** A reader with
  `docs/runbook.md` and no session context can roll back a bad
  promotion, diagnose a red run, and re-run the smoke test by hand
  against either URL. Every human action the pipeline requires is one
  of **O7–O10**; an action discovered outside that list is a runbook
  defect, fixed before the gate rather than narrated at it.

### P. Process and register state

- **P1 — The Workflow declaration is live and consistent.** The
  service repository's Classification carries decision 1's text; its
  stage names are the alias names actually deployed; `deployed` is
  derivable from it; and the Backlog entries' stages follow its
  default rule, with `stage: preprod` on any entry whose version
  failed the smoke test.
- **P2 — Documentation moved with the work (W-003).** Both
  repositories' Backlogs were updated in the same commits as the work
  they describe, and this node's entry here is rewritten to describe
  what shipped.
- **P3 — This repository is clean.** `node plugin/scripts/form_check.ts`
  passes; register and Backlog stage designations agree; each of the
  four children reached `done` against its own criteria.
- **P4 — The record exists.** A Cost log record for every dispatched
  task of the node, and a run-journal entry for the first CI deploy.
  The Orchestrator writes both; the verifier checks they are there.
- **P5 — The risk entries reflect what changed.** [R12](../open-risks.md)
  records that deploy-caused outages are now caught by the pipeline
  and that between-deploy breakage still is not, pointing at the
  Backlog entry that carries it.
- **P6 — Decisions are closed.** Every numbered decision in the plan
  (1–6, adopted 2026-09-01) and in this document (7–10) was adopted or
  overridden, and any override is reflected in the affected child's
  criteria **before** that child executes.

**G1–G6 are what the owner watches. I1–I8 and P1–P6 are what a
verifier who did not do the work checks against the two repositories,
the two endpoints, and the workflow run logs.**

## How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria; a Reviewer pass is by owner request. This node's
`verifying` is an evidence assembly — each criterion answered with a
pointer to a commit, a workflow run, a recorded measurement, or a
register entry — around the live first deploy at O9.

One asymmetry shapes the evidence. No dispatched session holds AWS
credentials, so every criterion above is answered from one of four
places a session can reach: repository content, GitHub workflow run
logs and job permissions, HTTPS calls to the two endpoints, or the
owner's attestation. I2's trust-policy clause is the only criterion
in the fourth category, which is why it is marked. Decision 8 proposes
who performs the assembly.

> **Marked and resolved, 2026-09-01 (K-011).** The asymmetry was
> briefly in doubt and is not. This session's environment carries
> `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`, which contradicted
> the premise on its face, so it was raised rather than assumed away.
> With the owner's explicit permission the session called
> `sts get-caller-identity`: AWS answered `InvalidClientTokenId` —
> the token is not a credential for any account. Both values are 14
> characters long and begin `prox`, there is no session token, and
> `AWS_CA_BUNDLE` points at the agent proxy's CA bundle. They are
> placeholders set by the environment's proxy tooling, which stops an
> AWS SDK hanging on instance-metadata discovery. No session, this one
> or a dispatched one, holds AWS access. The asymmetry stands and
> every criterion above rests on solid ground.

## Not verified here

Named so their absence is not read as oversight. Gradual traffic
shifting and CodeDeploy deployment preferences, a second stack or AWS
account, continuous monitoring between deploys, and CI for this
coordinating repository are the plan's four exclusions, each with a
Backlog entry. Beyond them: the deploy role's IAM permissions are
attested, not read; lease behaviour under real contention is chunk 4;
the preprod table's growth beyond its TTL is unmeasured; and the
pipeline's own cost and duration are recorded (G6) but no threshold is
set on them.

## The breakdown

**The four proposed children stand**, in the plan's dependency order:
A (assumption spike) → B (checks, independent of everything) and C
(alias-aware runtime) → D (deploy, smoke, promote). Writing the
integration criteria exposed no missing child and no wrong cut. It did
expose work the children must do for the criteria above to be
checkable; those additions are named under each child rather than left
implicit. IDs are the Orchestrator's to issue.

**Child A — The alias assumptions, verified against AWS
documentation.** Deliverable: one committed finding in the service
repository. Criteria: each of the plan's five assumptions answered yes
or no, with the documentation URL and the date it was read, and the
consequence stated where the answer is no. **Additions**: (i) a sixth
assumption — that a Function URL delivers an event shape the existing
`hono/aws-lambda` adapter handles, since an unhandled shape is exactly
the defect class that caused the first outage; (ii) each finding names
the later criterion that exercises it live (**I5**); (iii) the
`live`-after-stack-update finding states the mechanism child C must
use, because a template that publishes and repoints on every update
defeats "deploy, then promote" (**I4**).

**Child B — Pull-request checks that cannot deploy.** Deliverable: the
`pull_request` workflow. Criteria: build, lint, test and
`sam validate --lint` all run and all can fail the check;
`permissions: contents: read` with no `id-token: write`; no
`pull_request_target`; third-party actions pinned to commit SHAs. It
is independent of A, C and D and shippable alone. **Additions**:
(i) the pull-request body or the runbook names the exact check names,
so O10's branch protection is a selection rather than a guess;
(ii) the job either runs lint before `sam build` or the repository's
`eslint.config.js` ignores `.aws-sam/` — the existing Backlog entry on
that lint hygiene is this child's to close, since it fails a build the
workflow will run every time.

**Child C — Alias-aware lease-table selection, failing closed.**
Deliverable: the runtime change and the template resources it needs.
Criteria: the qualifier is read from the invoked ARN; `live` selects
the production table and `preprod` the preprod one; an unrecognised
qualifier, `$LATEST` included, is refused with the qualifier named;
the rule is scoped to Lambda, so the dev server and the suite are
unaffected; the template adds the preprod table with TTL, the
`preprod` alias and its Function URL, the two IAM grants, and binds
the production integration to `live`. **Additions**: (i)
`service_identity` reports the invoked qualifier and the lease table
it resolved, which is what turns "the right table was chosen" from an
inference into one authenticated call (**G3**, **G4**); (ii) the
template is checked for the absence of any unqualified externally
reachable path (**I3**); (iii) the mechanism child A's finding
prescribes for pinning `live` across stack updates is implemented here
and exercised by a second deploy in child D (**I4**).

*Clarified at T032's acceptance, 2026-09-01*: "the two IAM grants"
means one in-stack grant and one owner action, not two template
resources. The function's access to the preprod table is child C's and
is in `template.yaml`; `secretsmanager:GetSecretValue` sits on the
deploy role, which the owner provisioned and this stack does not
define, so it is **O7**'s and was already in the owner-action list.
The role declined to write an `AWS::IAM::Policy` against an
account-specific role and flagged its reading instead of acting on it,
which was right.

**Child D — Deploy, smoke, promote, on merge to `main`.**
Deliverable: the `push` workflow, the smoke script, the runbook
sections, and the Workflow declaration. Criteria: OIDC assumption of
the deploy role; the deploy step invokes `scripts/deploy.sh` with
repository variables (**I1**); the three smoke checks run against the
preprod Function URL with a token read from Secrets Manager; a failure
exits non-zero without touching `live`; a pass repoints `live`;
`docs/runbook.md` covers rollback, smoke-test failure, and what the
pipeline does that `scripts/deploy.sh` alone does not; the
Classification carries decision 1's text. **Additions**: (i) the
workflow declares a `concurrency` group on `main` that does not cancel
in progress, so two quick merges cannot interleave a publish with a
promotion; (ii) the run logs the published version and the version
`live` held before and after the promote step, which is the only
promotion evidence a verifier without AWS credentials can read
(**G4**); (iii) the smoke script is runnable by hand from a
workstation against either URL, with the runbook giving the command
(**I8**); (iv) the failure path is exercised once, deliberately
(**G5**).

None of these additions moves work between children or changes a
child's outcome.

## Owner actions

Unchanged from the plan, and not renumbered: **O7** (deploy-role trust
policy and permissions) is the evidence for **I2**; **O8** (repository
variables) is what **I1** requires the workflow to pass; **O9** (merge
the first pipeline pull request and watch the deploy) is the whole
**G** group; **O10** (make the checks required in branch protection)
is what makes **G1** a gate rather than an opinion — see decision 9.
Only child D blocks on them.

## Decisions for the gate

Numbering continues the plan's, so one go-ahead adopts one list: the
plan carries **1–6**, adopted 2026-09-01; this document carries
**7–10**. The owner's go-ahead adopts every default not overridden by
number. Checked against the [Ruling register](../rulings.md): RU-009
(work reaches `main` by pull request) and RU-016 (repository access)
both apply and neither is re-raised; no existing ruling reaches the
four below.

7. **How the failed-smoke-test path is exercised (G5).** Default: a
   temporary commit makes one smoke assertion false, is merged, goes
   red, and is reverted — rather than deploying a knowingly broken
   version. Rationale: it exercises the workflow's failure path and
   the "`live` stays put" property without leaving a broken published
   version in the account, and the property under test is the
   pipeline's behaviour, not the service's.
8. **Who verifies this node.** Default: attended verification — the
   owner performs O9 and the Orchestrator assembles the evidence —
   rather than a dispatched Reviewer. Rationale: the G criteria are
   live runs on the owner's account and I2 rests on an attestation
   only the owner can give, so a subagent could not judge them; this
   is the same shape chunk 1's gate took.
9. **Whether O10 blocks `done`.** Default: yes — the node reaches
   `done` only once branch protection makes the checks required.
   Rationale: the outcome is "a red workflow, not a silent outage",
   and an advisory check that a merge may ignore does not deliver it.
10. **Where the two prerequisite outage fixes execute.** Default: the
    ESM bundle fix and the `plan_lease_release` reserved-word fix, if
    still open on the service repository's `main` when child C starts,
    are executed within child C rather than as a separate node.
    Rationale: the plan makes both a dependency of the first CI deploy
    without giving either a home — no deploy initialises without the
    first, and smoke check 3 cannot pass without the second — and C is
    already the child changing lease runtime behaviour.

## Gate outcome, 2026-09-01

The owner adopted every default, so decisions 7–11 are settled and
this document is `active`. Nothing below reopens the criteria or the
breakdown.

- **7, the failed-smoke-test path** — a temporary false assertion,
  merged, red, reverted. No knowingly broken version is published.
- **8, who verifies** — attended: the owner performs O9 and the
  Orchestrator assembles the evidence. No Reviewer is dispatched for
  this node.
- **9, O10** — blocks `done`. The node is not complete while the
  checks are advisory.
- **10, the two prerequisite outage fixes** — adopted and already
  discharged. The Orchestrator checked the service repository at
  acceptance: `main` is `1d48503`, merging PR #6 (the ESM bundle fix,
  `fcf5165`) and PR #7 (the reserved word, `3ff7fa8`). The condition
  child C would have tested is false, so the clause costs nothing and
  no work moves into C.
- **11, the Orchestrator's** — the breakdown crosses at this gate.
  Children A–D entered the register as **P2-N013**, **P2-N014**,
  **P2-N015** and **P2-N016**, and no separate `break down` task was
  dispatched. Chunk 1 took the same path; the breakdown above is
  already at the depth such a task would produce.

The children carry no plan or specification documents of their own.
Their criteria are the sections above, which is how chunk 1's five
children were run — the parent's specification is the contract each
execute task is dispatched against.

## References

- [p2-n012-deploy-from-ci-on-merge](../plans/p2-n012-deploy-from-ci-on-merge.md) —
  this node's plan: the settled Approach, decisions 1–6 with their
  gate outcome, and owner actions O7–O10
- [orchestration-service](../plans/orchestration-service.md) — the
  parent plan and constraint 3, which bounds how much machinery this
  node buys
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md) —
  chunk 1's specification, whose G/I/P shape this document follows
- [plan-model](../process/plan-model.md) — the interior-node
  verification rule these criteria are written against
- [profiles](../process/profiles.md) — the C1 specification depth
- [Risk register](../open-risks.md) — R12 (P5), R14 (I6)
- [Ruling register](../rulings.md) — RU-009, RU-016
