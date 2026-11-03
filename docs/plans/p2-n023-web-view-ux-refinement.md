# The web view reads well enough to replace the plan document

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P2-N023; the owner adopted it on 2026-11-03, and it goes
     `closed → Backlog entry` when the node reaches `done`. -->

Reader: a fresh agent session (RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)),
and the owner. It assumes the methodology at
this project's pinned version, 1.6.0
([Classification](../classification.md)), and the [process
specification](../process/README.md).

[Node](../process/README.md#def-node) P2-N023 (web view UX refinement)
is the third child of P2-N003, owner questions and the plan view
([plan](p2-n003-owner-questions-and-plan-view.md)). The parent's plan
and specification name two children. The owner added this one on
2026-11-03, after the demonstration of P2-N021 (V30).

## Outcome

At V30 the owner decided that the web view does not replace
[`docs/plan.md`](../plan.md) yet. The owner's words: "we need to do some
UX refinement first." This node does that refinement. It changes how the view's pages
read and feel on a phone. It adds no data source and no route without a
decision recorded in this node.

At `done`, either the owner has decided that the view replaces
`docs/plan.md`, or ten iterations have ended.

## Approach: an owner-attended loop

The owner drives a separate Claude Code session on
majodali/project-orchestrator-service. The session's brief is the
service's
[`docs/web-view-ux-brief.md`](https://github.com/majodali/project-orchestrator-service/blob/main/docs/web-view-ux-brief.md).
The Orchestrator dispatches no role session for this node.

Each iteration runs in four steps:

1. The session makes one branch and one small pull request to the
   service's `main`.
2. The owner merges it. The push to `main` deploys the service.
3. The owner checks the pages on the phone.
4. The Orchestrator records the merged iteration (see *Recording*).

**Iteration 1 is tooling.** It adds a preview mode to the local server,
backed by fixtures, and a Playwright script that takes screenshots.
Every later pull request carries before and after screenshots at phone
width.

**Stop rule.** The loop stops at the first of two events: the owner
decides that the view replaces `docs/plan.md`, or iteration 10 merges.

## Dependencies

- **Repository reach.** Under RU-016 (the Planner declares the
  repository access a node needs), the node writes to
  majodali/project-orchestrator-service, limited to: `src/view/**`; `src/localServer.ts`; `test/view*.test.ts`
  and their fixtures; `scripts/`, for the tooling; the `package.json`
  scripts and dev dependencies; the README's "HTTP routes" and "Trying
  it locally" sections; the runbook's web-view section; the service's
  `docs/backlog.md`. Nothing in this repository. The repository is in
  this project's permanent scope, so no owner question arises.
- **P2-N023 modifies** `web-view` and
  `project-orchestrator-service-repo`.
- **P2-N023 uses** `web-view`.
- Depends on P2-N021 (the web view's first version), done 2026-11-03.
- Independent of P2-N022 (the owner question queue), its earlier
  sibling, under RU-018 (a child is not queued behind a sibling it does
  not depend on). P2-N023 does not block P2-N022 either: P2-N023 creates
  no resource, so no node waits on it.
- **Owner actions:** the merges and the phone checks, each iteration.

## Leaf or interior

**Leaf.** Each iteration is one small pull request, too small to be a
node.

## Verification

C1 profile ([profiles](../process/profiles.md)). One criterion:

- **U1.** The owner decides that the web view replaces `docs/plan.md`.
  Or ten iterations end, and the Backlog row "UX refinement of the web
  view" lists what shipped and what stays open.

## Recording

Each iteration has its own task number. T097 is iteration 1's task.
For each merged iteration the Orchestrator records, in one pass:

- a `result-received` event and an `accepted` event for that
  iteration's task, naming its pull request;
- one Cost log row for that task, from the usage the session reports;
- the iteration's line on the Backlog row "UX refinement of the web
  view";
- a `dispatched` event for the next iteration's task, unless the stop
  rule has fired.

So the node always has an open dispatched task while it executes.

## Monotonicity

**No planned non-monotonicity.** A change to an existing view test
waits on a discussion with the owner. W-002 (existing tests are signals,
not obstacles) requires it.

## Decisions

Decisions 1 to 4 were adopted by the owner on 2026-11-03, after V30.
The Orchestrator set decisions 5 and 6 on 2026-11-03.

1. The node runs as an owner-attended loop in a separate session on the
   service repository. The Orchestrator records results from merged
   pull requests.
2. Scope: how the view's pages read and feel. No new data source or
   route without a decision recorded in this node.
3. Iteration 1 is the preview mode and the screenshot script.
4. The stop rule above.
5. No separate specify task. U1 is the node's criteria list at C1
   depth, so the node moves `identified` → `planned` → `specified` →
   `executing` at this adoption.
6. The recording rule above: one task number per iteration, and the
   next iteration's task dispatched in the pass that accepts the
   previous one. The Orchestrator set this on 2026-11-03.

Decision 5 was ratified by the Orchestrator under the P3-N010
precedent. The owner sees it with the node.

## Terms for the owner

Proposed here, for the owner to ratify or strike at the next gate:

- **owner-attended session**: a Claude Code session the owner drives
  directly, outside the Orchestrator's dispatch; the Orchestrator
  records its results from merged pull requests.
- **preview mode**: a mode of the service's local server that serves
  the view's pages from fixtures, so screenshots need no live data.

## Gate record, 2026-11-03

The owner adopted decisions 1 to 4 on 2026-11-03. The Orchestrator
set decisions 5 and 6 on 2026-11-03. The node entered the
register and moved to `executing`. Task T097, iteration 1, was dispatched
for the owner-attended session. The Orchestrator
records reach to majodali/project-orchestrator-service under RU-016.

## References

- [Plan of P2-N003](p2-n003-owner-questions-and-plan-view.md) and its
  [specification](../specs/p2-n003-owner-questions-and-plan-view.md):
  the parent
- [Backlog](../backlog.md): the rows "Whether the web view replaces
  `docs/plan.md`" and "UX refinement of the web view"
- [Ruling register](../rulings.md): RU-016 (repository reach) and
  RU-018 (independence from an earlier sibling)
- [plan-model](../process/plan-model.md),
  [observability](../process/observability.md),
  [cost-log](../process/cost-log.md)
