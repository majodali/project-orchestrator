# The task-pull loop

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P2-N005, chunk 4 of
     [orchestration-service](orchestration-service.md); it goes `active`
     when the owner approves it at this node's gate, and
     `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's gate (RD-2). It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), the
[orchestration process specification](../process/README.md), and the
[service plan](orchestration-service.md) with its five standing
constraints.

Node P2-N005 (the task-pull loop) is chunk 4 of P2-N001 (orchestration
service) ([plan](orchestration-service.md)). The owner made it the next
service chunk on 2026-10-29. It carries per-task claims, role-aware
identity, the branch-name fallback claim and claim release
([service review](https://github.com/majodali/methodology/blob/main/docs/records/service-review-2026-10-29.md),
asks 2 and 8). The work lands in
[majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service)
and in this repository's process specification. This plan lives here
with the rest of the plan hierarchy.

Gate, from the parent plan: a node moves through its lifecycle across
two sessions with no owner intervention beyond the gate.

## Outcome

A session asks the service for the next [task](../process/README.md#def-task)
in its role, claims it, reports progress, and reports completion. When
the service is unreachable, the same session claims and delivers the
task through git alone.

Concretely, at `done`:

- The Orchestrator offers each task as a [task file](#def-task-file)
  committed to git. A session in the task's role finds it through the
  service, or in git when the service is down.
- A session claims a task by pushing its [claim branch](#def-claim-branch).
  The first push wins, with or without the service.
- A claim ends at acceptance, at voluntary release, or at its expiry.
  A dead session's claim expires, and the Orchestrator re-offers the
  task under a new task ID.
- The session delivers its result as a [result file](#def-result-file)
  on its work branch. The Orchestrator reads it at acceptance.
- A session declares its role to the service and receives a
  [session handle](#def-session-handle). The service hands out tasks
  by that role. It refuses the Plan register's write lease to a
  session registered in any role but Orchestrator.
- After an outage, the service's first answer agrees with git. Nothing
  needs reconciling, because the service keeps no offer, claim or
  result of its own.
- [dispatch.md](../process/dispatch.md),
  [enlistment.md](../process/enlistment.md),
  [observability.md](../process/observability.md),
  [roles.md](../process/roles.md) and the six role contracts describe
  the pull loop and its fallback.

## Terms this plan introduces

Each term below was ratified by the owner at this node's gate of
2026-10-30 (decision 13).

- <a id="def-task-file"></a>**Task file**: a task's brief, committed
  by the Orchestrator at `orchestration/tasks/<task ID>.md` and pushed,
  so that any session can find the offered task in git.
- <a id="def-claim-branch"></a>**Claim branch**: the branch
  `claim/<task ID>`, whose creation by a session's non-forced push
  claims that task.
- <a id="def-result-file"></a>**Result file**: a task's result in the
  [result core](../process/dispatch.md#def-result-core)'s shape,
  committed at `orchestration/results/<task ID>.md` on the claimant's
  work branch.
- <a id="def-session-handle"></a>**Session handle**: a value the
  service issues to a session that declares its role, which the session
  passes on later calls so the service knows its role.

## Approach

### The service validates and git holds everything

The parent plan's standing constraint 1 says git remains authoritative.
The write model of node P2-N002 (service skeleton and plan state) keeps
every repository write with the session
([P2-N002 plan](p2-n002-service-skeleton.md), decision 3). The owner
kept that model on 2026-10-29 (service review, ask 8).

This node applies the same model to tasks. An offer, a claim and a
result each live in git. The service reads them afresh on every call,
as `plan_read` reads the register. It computes the next task for a
role and says what to push. It never pushes anything itself.

Two consequences follow. A session without the service runs the same
protocol by hand (standing constraint 3). And the service has nothing
to reconcile after an outage, in the way risk R10 (the service becomes
a second source of truth) was closed by construction
([Risk register](../open-risks.md)).

The service does hold two short-lived things: session handles and
progress notes. Both are telemetry, like the lease. Losing them in an
outage costs a session one new registration.

### Offering a task

The Orchestrator keeps steps 1 and 2 of
[the loop](../process/dispatch.md#the-loop): it selects the next
actionable pair and assembles the brief. In a pull run, it writes the
brief as a task file instead of a subagent prompt. The task file
carries the task ID, the node, the stage, the role, the packet, the
charge and the claim expiry. The Orchestrator commits it with the
buffered `dispatched` event and pushes it to the branch the
[scope grant](../process/dispatch.md#gates-v1) names.

A pull run is chosen in the scope grant. Subagent dispatch stays valid
and unchanged (decision 11).

### Claiming a task

The session creates one empty commit on top of the task file's commit.
Its message names the task ID, the session's own identifier, its role,
its work branch and the claim's expiry. The session pushes that commit
to `claim/<task ID>` without force.

GitHub refuses a non-forced push that does not descend from the
branch's current tip. So when two sessions race, the second push is
refused and the second session has lost. This is the owner's proposal
of 2026-08-26, git as the lease of last resort (Backlog row "Fallback
task-claim protocol"). It runs the same way with the service up.

With the service up, `task_claim` checks the task is offered,
unclaimed and in the caller's role. It returns the exact commit message
and push command, as `plan_update` returns the exact register edit.

### Progress, completion, and how a claim ends

`task_progress` records a short note for the Orchestrator and, later,
the web view. Notes are telemetry and never truth. The response warns
when the claim nears its expiry.

A claim carries an expiry, two hours by default, set in the task file.
The claimant renews it by pushing a later commit to its claim branch.
A claimant that gives up deletes its claim branch, and the task is
claimable again.

An expired claim ends the task. At its next loop, the Orchestrator
journals the task `stale`, runs a form check, and offers a fresh task
under a new task ID. This is dispatch.md's existing rule for stale
tasks
([failure containment](../process/dispatch.md#failure-containment)).
A result that arrives later for the stale task is not accepted. The
new task file names the old work branch as reading.

On completion, the session commits its result file on its work branch
and pushes. It then calls `task_complete`, which checks the result
file's form at that commit. The service never parses more than the
status token and the presence of the result core's parts.

### Accepting a task

The Orchestrator keeps step 3 of the loop. In a pull run it reads the
result file from the work branch the claim names. Its handoff check
gains one mechanical item: the claim's role equals the task file's
role. It merges the work branch into the branch the scope grant names.
It records the stage change through the lease, or by hand when the
service is down. It then deletes the claim branch and the work branch,
as W-006 (names follow outcomes; branches are single-use) requires.

Work still reaches `main` by pull request, under RU-009 and RU-010
(work reaches `main` by pull request) ([Ruling register](../rulings.md)).

### Role-aware identity without a credential per role

A session calls `session_register` with its role, from the role
vocabulary of [roles.md](../process/roles.md). The service returns a
session handle and keeps the pair until the handle expires. The task
tools take the handle. `task_next` returns only tasks offered for the
handle's role.

The role is declared, not authenticated. Every session holds the
owner's one bearer token, so the service cannot prove a role. The
check exists to catch a mistake, such as an Implementer session taking
the register lease. Decision 12 of the
[P2-N002 specification](../specs/p2-n002-service-skeleton.md) deferred
role identity to this node for that reason.

`plan_lease_acquire` gains an optional handle. With a handle whose role
is not Orchestrator, it refuses. Without a handle, it behaves as it
does today, so the fallback, the CI smoke test and every existing test
are unchanged.

### The advisory lease under several live sessions

Role sessions never take the lease. They write their own branches, and
their claims race on git, not on the lease. The lease stays the
Orchestrator's single-writer guard for the Plan register. Several live
sessions exercise it in one way: a registered non-Orchestrator session
is refused while the Orchestrator writes. Decision 7 of the
[P2-N002 plan](p2-n002-service-skeleton.md) deferred that test to this
node.

### A session with no task

A session whose role has no offered task ends its turn and says so. It
never sleeps, polls or holds a tool call open
([the loop](../process/dispatch.md#the-loop): the Orchestrator never
waits on timers or polls). After offering a task, the Orchestrator
starts or resumes a session in that role. dispatch.md's
[trigger surfaces](../process/dispatch.md#trigger-surfaces-v1) already
permit it within approved scope. Child A records which mechanism each
surface offers for starting a session and for learning that one
finished.

### Sequence mode

Node P3-N014 (the loop runs sequence mode) adds a *Sequence mode*
section to dispatch.md ([plan](p3-n014-loop-runs-sequence-mode.md)).
In a pull run, the Orchestrator offers one ratified member at a time,
as that section requires. The result file carries the result in the
form P3-N014's record of a member's result reads. Nothing in sequence
mode needs the service, and this node adds no stop condition.

### The tools

The service gains six tools. Each reads git afresh and names the
commit SHA it read.

| Tool | What it does |
|---|---|
| `session_register` | Takes a role, returns a session handle |
| `task_next` | Returns the oldest offered, unclaimed task in the handle's role, or none |
| `task_claim` | Checks a task is claimable by the caller; returns the claim commit message and push command |
| `task_progress` | Records a progress note; warns when the claim nears expiry |
| `task_complete` | Checks the result file's form at a named commit |
| `task_status` | Lists tasks with their task file, claim, expiry and result, read from git |

The CI smoke test's list of required tools gains these six names.

## What this node does not cover

Each item has an owner decision or a Backlog row already.

- Surfaces without a repository clone. A later node adds a remote MCP
  connector with read, question and delegation tools only (service
  review, ask 8). A delegation from such a surface fits this design: the
  service would hold the request until the Orchestrator commits it as
  a task file. A Backlog row below records that.
- Plan state for several projects. Node P2-N006 (migration and pilot)
  builds it (service review, ask 6).
- The owner question queue, topics and the web view.
- A service that connects and then answers badly. The Backlog row "The
  no-retry rule has never been tested against a service that answers
  badly" stays open.
- Monitoring between deploys, which stays in the Backlog through the
  pilot (service review, ask 11).

## Leaf or interior

Interior. The node holds one unverified platform fact, a git protocol
that works without the service, a change to the existing write path,
and a new tool set. Each validates separately.

The decomposition leads with a spike, as P2-N012 (deploy the service
from CI on merge) did ([plan](p2-n012-deploy-from-ci-on-merge.md),
decision 2). What is in doubt is whether a cloud session may push a
branch beside the one its surface assigns. If it may not, the claim
protocol changes and the node returns to `plan`. The git-only loop
comes next, because it is the thin end-to-end slice with the least
machinery, and the service only accelerates it.

### Proposed children, in dependency order

IDs are the Orchestrator's to issue.

A. The platform facts, verified. From real sessions on the cloud and
local surfaces, record in writing that:

1. a session can push `claim/<task ID>` beside its assigned branch;
2. GitHub refuses a non-forced push to an existing branch from a
   commit that does not descend from its tip;
3. the service's GitHub App installation lists branches by prefix and
   reads their commits with its current permission;
4. each surface offers some mechanism for one session to start or
   resume another, and for a session to learn another finished.

The finding is committed in this repository. A false fact 1 to 3
returns the node to `plan`. A missing mechanism under fact 4 is staged
to the owner, because the gate needs no owner intervention.

B. The loop in git alone. The forms of the task file, the claim
commit, the renewal and the result file. The Orchestrator's dispatch,
acceptance and stale changes in dispatch.md. The fallback rule in
enlistment.md, extended to a pulling session. The dispatch commit in
observability.md's write rule. The pull duties in roles.md and the six
contracts, with `plugin/agents/` regenerated by
`node plugin/scripts/sync_agents.ts`. Two real sessions run one real
task through it with the service unreachable.

C. Role-aware identity. `session_register`, the session handle and its
expiry, the role vocabulary cited to roles.md, and the lease's refusal
of a non-Orchestrator handle. Every existing test passes unchanged.
Independent of B.

D. The task tools. The five task tools above, each reading git afresh,
the smoke test's longer tool list, and the README and runbook. Depends
on B for the forms and on C for the handle.

## Dependencies

- P2-N002 (service skeleton and plan state) and P2-N012 (deploy the
  service from CI on merge): both `done`. Children C and D deploy
  through P2-N012's pipeline.
- P3-N014 (the loop runs sequence mode): child B's execute waits until
  P3-N014's execute is accepted. Both write dispatch.md's handoff
  contract and the six role contracts (decision 12). Children A, C and
  D do not wait.
- Not P2-N003 (owner questions and the plan view) or P2-N004 (topics
  and coordination). The register marks P2-N005 independent of both
  under RU-018 (a child is not queued behind a sibling it does not
  depend on).
- Owner: this node's gate. No owner action is expected. Child A names
  any it finds, numbered from O11 after P2-N012's O7 to O10.

## Repository reach (RU-016)

RU-016 (the Planner declares the repository access a node needs) is an
exact match and decides silently. Both repositories are already in
this project's approved scope.

- majodali/project-orchestrator-service, written by children C and D:
  `src/`, `test/`, `template.yaml` where storage for handles needs it,
  `scripts/smoke-test.sh`, `README.md`, `docs/runbook.md` and
  `docs/backlog.md`.
- majodali/project-orchestrator, this repository: child A writes its
  finding under `docs/findings/`. Child B writes
  `docs/process/dispatch.md`, `enlistment.md`, `observability.md` and
  `roles.md`, the six contracts in `.claude/agents/`, `plugin/agents/`
  by the generator only, and `docs/backlog.md`. The Orchestrator writes
  the Plan register, the Cost log and the journal.

## Verification criteria

The specification refines these. The node is complete when:

1. A real node, owed at that moment, moves through its lifecycle
   across an Orchestrator session and a second session, with no owner
   action beyond the gate. The second session finds each task with
   `task_next`, claims it, reports progress and completes it.
2. Two sessions racing for one task: exactly one claim push succeeds,
   and the loser is told so by git and by `task_claim`.
3. A session registered in a non-Orchestrator role is refused the
   lease while the Orchestrator writes through it. Calls without a
   handle behave as before.
4. With the service unreachable, the same flow completes through git
   alone. No session retries or waits on the service.
5. After that outage, the service's first `task_status` agrees with
   git, including claims and results made during the outage.
6. A claim left to expire makes its task `stale` at the Orchestrator's
   next loop. The re-offer has a new task ID, and a late result for the
   stale task is not accepted.
7. `task_next` never returns a task of another role, a claimed task, or
   a task whose result is in.
8. Every task tool names the commit SHA it read. No tool answers what
   was offered, claimed or delivered from the service's own store.
9. The service still holds no repository write credential.
10. The process documents and contracts describe the pull loop and its
    fallback. `node plugin/scripts/form_check.ts` passes clean.
11. Both repositories' Backlogs move in the same commits as the work,
    as W-003 (documentation moves in the same commit as the work)
    requires. No secret appears in either repository's history.

## Monotonicity

No planned non-monotonicity. `plan_lease_acquire` gains an optional
parameter, and the smoke test's required-tool list gains names. No
existing test is rewritten. Should one need rewriting, it returns to
the owner under W-002 (existing tests are signals, not obstacles).

## Decisions for the gate

Numbered per dispatch.md's
[owner-decision economics](../process/dispatch.md#owner-decision-economics).
The owner's go-ahead adopts every default not overridden by number.
This document opens its own sequence at 1.

Precedents checked against the [Ruling register](../rulings.md).
RU-016 decides the repository reach silently. RU-008 and RU-011
(TypeScript/Node for services and tooling) decide the stack silently.
Near matches, cited where they argue a default: RU-009 and RU-010 for
decision 6, RU-018 for decision 12, RU-020 (an interior node whose
specification reaches breakdown depth needs no separate break down
task) for decision 1, and RU-021 (the planning/execution model is the
source of progress truth) for decision 3.

1. Leaf or interior. Default: interior, children A to D, with a
   specification task whose document carries the children at breakdown
   depth. Rationale: four separately validating parts, and the forms
   need exact definitions before child B; RU-020 then spares a break
   down task. Affected locations: none.
2. Verification before construction. Default: child A runs first, and
   no other child starts until its finding is committed. Rationale:
   whether a cloud session can push a claim branch could not be
   confirmed from a planning session, and a false answer changes the
   protocol. Affected locations: none.
3. Where an offered task lives. Default: in a task file, committed and
   pushed by the Orchestrator at dispatch to the branch the scope grant
   names. Rationale: a session can find work when the service is down,
   and the service holds no offer git cannot correct. A task file is a
   dispatch record, not progress truth, so RU-021 is untouched.
   Alternative: offers held only by the service, which is lighter but
   leaves nothing to pull during an outage. Affected locations: none.
4. How a session claims a task. Default: by pushing the claim branch
   without force, first push wins, the same with or without the
   service. The service validates and returns the push but never
   writes. Rationale: the owner's proposal of 2026-08-26 and the write
   model; one protocol in both modes needs no reconciliation.
   Alternative: claims held in the service with branches only in an
   outage, which needs two claim stores reconciled. Affected locations:
   none.
5. How a claim ends. Default: at acceptance, at voluntary release by
   deleting the claim branch, or at its expiry, two hours by default
   and renewable. An expired claim makes the task `stale`, and the
   Orchestrator re-offers it under a new task ID. A late result for a
   stale task is not accepted. Rationale: it applies dispatch.md's stale
   rule unchanged, and a new task ID means no session ever takes over
   another's claim branch. Affected locations: none.
6. How a result returns. Default: as a result file on the claimant's
   work branch, which the Orchestrator merges into the scope grant's
   branch at acceptance. `main` is still reached by pull request.
   Rationale: across sessions there is no reply message, and a file
   survives an outage; RU-009 and RU-010 are kept. Alternative: the
   result text carried by the service. Affected locations: none.
7. Role-aware identity. Default: a session declares its role and
   receives a session handle; the task tools require it; the lease
   refuses a handle whose role is not Orchestrator; calls without a
   handle behave as today. Rationale: one shared token cannot prove a
   role, the check catches mistakes, and a credential per role
   multiplies owner action O4 (mint and distribute the token) by six.
   Affected locations: the Backlog row "Role-aware identity on the
   service's write path", whose last sentence promises real role
   identity. Drafted text, replacing the row: "- [ ] **Role-aware
   identity on the service's write path** — When: 2026-08-26, P2-N002
   specification decision 12. Status: planned in node P2-N005; the role
   is declared at registration and checked, not authenticated.
   Pointer: [plan of P2-N005](plans/p2-n005-task-pull-loop.md),
   decision 7."
8. Who writes the Plan register when a pulled task closes. Default:
   the Orchestrator, at acceptance, as today. The closing session
   updates the documents its brief names. Rationale: acceptance is a
   check by a session other than the worker. The vision's "the agent
   updates the plan when closing the task" holds, because a task
   closes at acceptance. Affected locations: none.
9. Reconciliation after an outage. Default: in scope, by construction.
   The service keeps no offer, claim or result. Handles and progress
   notes are lost and re-made. Rationale: the same design that closed
   R10 for plan state. Affected locations: none.
10. A session with no task. Default: it ends its turn; it never sleeps
    or polls. The Orchestrator starts or resumes a session in a role
    after offering it a task, under the existing trigger surfaces.
    Rationale: dispatch.md forbids waiting on timers, and no new
    trigger surface is needed. Affected locations: none.
11. The pull loop beside subagent dispatch. Default: a pull run is an
    option the scope grant names; subagent dispatch stays valid and
    unchanged. Rationale: the parent plan expects additive spec
    changes, and the fallback rule needs the subagent path. Affected
    locations: none.
12. Order against P3-N014. Default: child B's execute waits for
    P3-N014's execute to be accepted; children A, C and D do not.
    Rationale: both write dispatch.md's handoff contract and the six
    contracts, while A, C and D touch neither; RU-018 releases what has
    no real dependency. Affected locations: none.
13. Ratify or strike four terms: task file, claim branch, result file
    and session handle. Default: ratify all four. Rationale: each names
    one thing the protocol and the tools refer to throughout. Affected
    locations: none.

The service plan's chunk 4 text says the chunk "includes the write
lease in anger". Decisions 4 and 7 keep role sessions off the lease, so
contention reaches it only as a refused non-Orchestrator session.
Affected location of decisions 4 and 7: the service plan,
[chunk 4](orchestration-service.md#chunk-4--the-task-pull-loop), which
is `active`. Drafted text, replacing the sentence "Includes the write
lease in anger.": "Includes the advisory lease under several live
sessions: role sessions claim tasks through git, and only the
Orchestrator takes the lease
([P2-N005 plan](p2-n005-task-pull-loop.md), decisions 4 and 7)."

## Backlog additions

- P2-N005's entry: rewritten at this gate to `planned`, with this
  plan's link.
- The rows "Fallback task-claim protocol", "Claim release when a
  session dies" and "Service reconciliation after an outage": each
  rewritten to "planned in node P2-N005", pointing at decisions 4, 5
  and 9.
- A form check for task files, claim branches and result files: today
  a verifier checks their forms by hand. For P1-N016 (process spec
  maintenance).
- A delegation request from a surface without a repository clone: the
  service holds it until the Orchestrator commits it as a task file.
  For the remote MCP connector node after the pilot.

## Gate record, 2026-10-30

The owner accepted this plan with defaults 1 to 13 ("go with defaults
on all decisions") and ratified the four terms: task file, claim
branch, result file and session handle. The drafted texts of decisions
4 and 7 were placed by the Orchestrator at this crossing: the Backlog
row on role-aware identity and the service plan's chunk 4 sentence. The
three Backlog rows this plan names were rewritten to "planned in node
P2-N005", and the two Backlog additions were entered. Under decision 1
the node stays `planned` and a specification task follows, whose
document carries children A to D at breakdown depth (RU-020); the
children are entered at the specification gate. Next: the
specification, task T092.

## References

- [orchestration-service](orchestration-service.md): the parent plan,
  its standing constraints and chunk 4
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md) and its
  [specification](../specs/p2-n002-service-skeleton.md): the write
  model (decision 3), the lease (decision 7) and role identity
  (decision 12)
- [p2-n012-deploy-from-ci-on-merge](p2-n012-deploy-from-ci-on-merge.md):
  the pipeline, the smoke test and the spike-first shape
- [p3-n014-loop-runs-sequence-mode](p3-n014-loop-runs-sequence-mode.md):
  sequence mode and the record of a member's result
- [dispatch.md](../process/dispatch.md),
  [enlistment.md](../process/enlistment.md),
  [observability.md](../process/observability.md),
  [roles.md](../process/roles.md),
  [plan-model.md](../process/plan-model.md)
- [Ruling register](../rulings.md): RU-008 to RU-011, RU-016, RU-018,
  RU-020, RU-021
- [Risk register](../open-risks.md): R10 (the service becomes a second
  source of truth), R11 (MCP surface constraints), R12 (service outage
  stops work), R17 (the harness's guidance pushes against the fallback
  rule)
- Methodology:
  [service review of 2026-10-29](https://github.com/majodali/methodology/blob/main/docs/records/service-review-2026-10-29.md),
  asks 2, 6, 8 and 11;
  [vision](https://github.com/majodali/methodology/blob/main/docs/vision.md);
  [roadmap IR](https://github.com/majodali/methodology/blob/main/docs/roadmap.ir.md),
  step 2
