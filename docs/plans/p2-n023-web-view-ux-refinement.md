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
   service's `main`. The pull request's title carries `ux-NN`, the
   iteration's number. The branch name is free (decision 9).
2. The owner merges it. The push to `main` deploys the service.
3. The owner checks the pages on the phone.
4. The Orchestrator records the merged iteration (see *Recording*).

**Iteration 1 is tooling.** It adds a preview mode to the local server,
backed by fixtures, and a Playwright script that takes screenshots.
Each iteration commits its six "after" screenshots, at phone and
desktop width, under `src/view/preview/shots/` in the service
repository. The previous iteration's "after" screenshots are the next
one's "before" (decision 8, amended).

**Stop rule.** The loop stops at the first of two events: the owner
decides that the view replaces `docs/plan.md`, or iteration 10 merges.

## Dependencies

- **Repository reach.** Under RU-016 (the Planner declares the
  repository access a node needs), the node writes to
  majodali/project-orchestrator-service. Nothing in this repository.
  The repository is in this project's permanent scope, so no owner
  question arises. The reach is limited to these paths:
  - `src/view/**`, which holds the tooling's TypeScript in
    `src/view/preview/` (decision 7);
  - `src/localServer.ts`;
  - `test/view*.test.ts` and their fixtures;
  - the committed screenshots, in `src/view/preview/shots/`, inside
    `src/view/**` (decision 8, amended);
  - the `package.json` scripts and dev dependencies;
  - the README's "HTTP routes" and "Trying it locally" sections;
  - the runbook's web-view section;
  - the service's `docs/backlog.md`.
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

## Iterations

Three of ten iterations are done, as of 2026-11-03. The owner ended the loop after three, on 2026-11-07.

| Iteration | Task | The service's pull requests |
|---|---|---|
| 1 | T097 | #23, #24 |
| 2 | T098 | #25 |
| 3 | T099 | #26 |
| 4, closed | T100 | none: the owner ended the loop on 2026-11-07 |

The Backlog row "UX refinement of the web view" lists what each
shipped.

## Loop ended, 2026-11-07

The owner ended the loop after three iterations. The owner's words, on
2026-11-07: "All UX work has been completed and merged, so I'm not sure
if there's a need for another iteration. There are some issues with the
data the view is built on - we'll need to address those here."

Iteration 4 (T100) opened no pull request, so it shipped nothing. The
node moved `executing` → `verifying`. Neither leg of U1 is met as
written: the owner has not decided that the view replaces
`docs/plan.md`, and ten iterations have not ended.

At the verifying gate the owner decides whether P2-N023 closes on those
words (ask A30). The default: the loop ends at three iterations on the
owner's decision, and U1 is read as met by that decision. The data
issues the owner named become the Backlog row "The web view's data has
issues the owner saw after the UX loop", routed to P2-N022 (the owner
question queue), whose plan is at its gate as A21.

## Monotonicity

**No planned non-monotonicity.** A change to an existing view test
waits on a discussion with the owner. W-002 (existing tests are signals,
not obstacles) requires it.

## Decisions

Decisions 1 to 4 were adopted by the owner on 2026-11-03, after V30.
The Orchestrator set decisions 5 and 6 on 2026-11-03. The three
decisions after them answer the asks in the service's pull request #23
(T097). The Orchestrator set decisions 7 and 9. Decision 8 is the
Orchestrator's proposal to the owner, adopted by the owner's default
unless the owner says otherwise. The Orchestrator amended it,
answering pull request #24 (T097). The last two decisions answer the
asks in pull request #25 (T098). The Orchestrator set them on 2026-11-03.

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
7. Tooling placement. The tooling's TypeScript lives in
   `src/view/preview/`, inside the reach `src/view/**`. The tooling does
   not live in `scripts/`: the service's `tsconfig.eslint.json` excludes
   `scripts/`, and that file is outside the reach. `scripts/` leaves
   the reach. Set by the Orchestrator on 2026-11-03.
8. Screenshots, as amended. Adopted by the owner's default unless the
   owner says otherwise. Each iteration commits its six "after"
   screenshots, at phone and desktop width, as PNG files, under
   `src/view/preview/shots/` in the service repository. The previous
   iteration's "after" screenshots are the next one's "before", so no
   "before" set is committed. The reason: the session cannot attach
   images to a pull request body. Proposed by the Orchestrator on
   2026-11-03. The Orchestrator amended it later that day, answering
   ask 1 of pull request #24. The decision said three at phone width
   under `docs/ux-shots/ux-NN/`. The session already produces both
   widths in `src/view/preview/shots/`. That path is inside the reach
   `src/view/**`, so `docs/ux-shots/**` leaves the reach.
9. Branch names. The pull request's title carries `ux-NN`. The branch
   name is free. The owner's session pushes to the branch its harness
   binds (`claude/...`). The result core in
   [dispatch.md](../process/dispatch.md#def-result-core) already
   accepts a branch that the execution surface mandates. Set by the
   Orchestrator on 2026-11-03.
10. The tree page answers P2-N021's criteria V25 and V26 differently,
    from iteration 2. The implementation map's rows sit inside the tree.
    The list of what is next is gone, and its procedures feed the
    tree's status. The criteria stand as written: they were met at
    P2-N021's `done`. A dated note after V26 in the [specification of
    P2-N003](../specs/p2-n003-owner-questions-and-plan-view.md#the-model)
    and the Backlog row of P2-N021 record the change. Set by the
    Orchestrator on 2026-11-03, answering ask 1 of pull request #25.
11. V27's navigation bound counts link clicks. Opening a fold is not a
    step. Set by the Orchestrator on 2026-11-03, answering ask 2 of
    pull request #25.

Decision 5 was ratified by the Orchestrator under the P3-N010
precedent. The owner saw it on 2026-11-03 and let it stand.

## Terms for the owner

The owner ratified both terms on 2026-11-03. Each definition below is
the term's definition site.

- <a id="def-owner-attended-session"></a>**owner-attended session**: a Claude Code session the owner drives
  directly, outside the Orchestrator's dispatch; the Orchestrator
  records its results from merged pull requests.
- <a id="def-preview-mode"></a>**preview mode**: a mode of the service's local server that serves
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
