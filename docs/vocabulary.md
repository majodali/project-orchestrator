# Project vocabulary

Reader: a fresh agent session, and the owner checking what a term
means. It assumes this project's [Classification](classification.md)
and [how we work](process/how-we-work.md).

This file holds one row per term of this project's own that is still
in use. A new term gets a row in the same pull request that introduces
it. A term the methodology vocabulary defines has no row here.

Pruned on 2026-11-14 (P4-N024, Pruned document set). The rule: a row
left when the document that defines it was retired with the dispatch
loop, or belonged to a node removed from the plan. Those rows, and the
terms that were never ratified, are in the
[retired terms](archive/vocabulary-retired.md), unchanged. The terms
of the P3 line stay, because the line is held, not retired; their
specifications are still in `docs/specs/`.

Row shape: the term with its `def-` anchor, its meaning in one
sentence, and the document that ratified it, with the date.

## Terms of the task loop

Defined in [the task loop](process/task-loop.md) and
[the state model](process/state-model.md); added 2026-11-14.

| Term | Meaning | Defined in |
|---|---|---|
| <a id="def-state-file"></a>state file | `orchestration/state.json`: the nodes, tasks and decisions of one project, written only by the orchestration service. | [the state model](process/state-model.md) |
| <a id="def-task"></a>task | One step on one node by one session, opened with `task_open` and closed with `task_close`. | [the task loop](process/task-loop.md) |
| <a id="def-check-node"></a>check node | The child the service adds when a node's work is done, on which the reviewer's `verify` step runs. | [the task loop](process/task-loop.md#the-check-node) |
| <a id="def-hold"></a>hold | A mark on a node, `gated` or `blocked`, with a reason, that keeps it and everything below it from offering a step until it is lifted: by the owner in the view, or, on the check node of a failed verification, by the rework's close. | [the state model](process/state-model.md) |
| <a id="def-standing-decision"></a>standing decision | A closed decision marked as a precedent, which every task receives at `task_open`. | [the state model](process/state-model.md) |
| <a id="def-view"></a>view | The web page the service serves, where the owner reads the plan, answers decisions, approves starts, lifts holds and accepts reviews. | [how we work](process/how-we-work.md#the-owners-decisions) |

## Ratified 2026-10-29

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-structural-conditions"></a>structural conditions (i) to (iii) of the navigation bound | The three conditions under which the navigation bound holds by construction: every starting point links the instance in its header, every resource entry has an anchor or a slug findable in one find, and every entry carries all five facets as labelled lines with its `spec:` and `risks:` lines as links. | [specification of P3-N002](specs/p3-n002-comprehension-model.md#the-navigation-bound), gate of 2026-10-29 |
| <a id="def-entry-test-conditions"></a>entry test conditions ET-1 to ET-4 | The four conditions a candidate for the common risk catalogue is put to: a cross-project precondition, mitigation by each project, an encounter evidenced here, and an applicability that can be written as an Article 4 header. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-test), gate of 2026-10-29 |
| <a id="def-admit-merge-reject-defer"></a>admit, merge, reject and defer | The four outcomes a candidate takes under the entry test: a new entry, an encounter of an admitted entry, a rejection naming the failing condition, or a class held back because only ET-3 fails. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-test), gate of 2026-10-29 |
| <a id="def-reaches-line"></a>reaches line | The field of a catalogue entry that names the kind of part of a project the failure occurs in. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-shape), gate of 2026-10-29 |
| <a id="def-independent-encounter"></a>independent encounter | An encounter that is neither the same defect observed again nor found by the same investigation as another encounter of the entry. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-shape), gate of 2026-10-29 |
| <a id="def-parts-enumeration"></a>parts enumeration | The committed list of this project's parts that the class-to-instance check reads, drawn from the checked Backlog entries of both repositories, the Plan register's `done` nodes, and a stated list of standing artifact classes. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-covering-entry"></a>covering entry | A Risk register entry that cites a class and names a part, or names a scope the run argues contains the part. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-genuine-omission"></a>genuine omission | An omission whose applicability argument is written, and whose run read a Risk register with complete citations. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-run-record"></a>run record | The record of one run of the class-to-instance check, naming the commits of its three inputs, the date, and the role that ran it. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-sweep-record"></a>sweep record | The record that gives every candidate for the catalogue its outcome, with each entry test condition answered. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#g-the-gate-reading), gate of 2026-10-29 |
| <a id="def-stop-predicate"></a>stop predicate | A W-001 stop condition written so that it names the artifact and the field it reads and yields stop or continue without a fresh judgment. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#gate-record-2026-10-29), gate of 2026-10-29 |
| <a id="def-fails-closed"></a>fails closed | Said of a stop predicate: a missing input yields stop, never continue. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#i-integration-invariants), gate of 2026-10-29 |
| <a id="def-addressee-of-an-ask"></a>addressee of an ask | The reader an ask in a task result names, the owner or the Orchestrator; an ask that names neither counts as the owner's. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#decisions-for-the-gate), decision 11, gate of 2026-10-29 |
| <a id="def-member-of-a-sequence"></a>member of a sequence | A chunk the owner ratified into a sequence: one node, with the stages ratified for it. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#gate-record-2026-10-29), gate of 2026-10-29 |
| <a id="def-relation-table"></a>relation table | Child A's table relating each methodology meta-review signal, and the review limit of ten rounds, to a W-001 condition, a `dispatch.md` containment rule, or "no counterpart". | [specification of P3-N005](specs/p3-n005-sequence-mode.md#i-integration-invariants), gate of 2026-10-29 |
| <a id="def-residue-table"></a>residue table | Child D's table checking the owner's asks clarification of 2026-09-17, part by part, against W-008 and the methodology's IR specification. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#child-d-the-determination-on-w-001-and-the-artifact-or-the-argument), gate of 2026-10-29 |

## Ratified 2026-10-30

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-rendering"></a>rendering | A text produced from a source by a stated procedure, which adds no claim the source lacks and drops none the procedure says it carries. | [plan of P3-N007](archive/plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](archive/process/project-model.md#def-rendering) |
| <a id="def-view-token"></a>view token | The credential the owner mints for the web view, held apart from the MCP bearer token and refused by the MCP endpoint. It was read-only as ratified; since 2026-11-10 the view also writes the owner's own actions (answer a decision, approve a start, lift a hold, accept a review), so it is a write credential for those. | [specification of P2-N003](archive/specs/p2-n003-owner-questions-and-plan-view.md#def-view-token), gate of 2026-10-30; the meaning as amended here, by the owner in conversation, 2026-11-17 |
| <a id="def-view-cookie"></a>view cookie | The signed cookie the sign-in route issues in exchange for the view token, which every other `/view` route requires. | [specification of P2-N003](archive/specs/p2-n003-owner-questions-and-plan-view.md#def-view-cookie), gate of 2026-10-30 |
| <a id="def-not-computable"></a>not computable | The web view's marking for a rendering, or an item of one, that the type's procedure cannot finish from the files at the page's commit, naming the file, the line and the missing input. | [specification of P2-N003](archive/specs/p2-n003-owner-questions-and-plan-view.md#def-not-computable), gate of 2026-10-30 |

## Ratified 2026-11-03

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-citation-test"></a>citation test | The rule that decides whether a Risk register entry carries a *Class* line for a class: the sweep recorded the entry as the source of a row that admits the class or merges into it, or the entry's text states the class's failure as its own subject. | [plan of P3-N011](archive/plans/p3-n011-sweep-and-omission-list.md#def-citation-test), gate of 2026-11-03 |
| <a id="def-delta-row"></a>delta row | A candidate row, labelled `DL-nn`, for a failure that a source recorded after the pass that read the source. | [plan of P3-N011](archive/plans/p3-n011-sweep-and-omission-list.md#def-delta-row), gate of 2026-11-03 |
| <a id="def-preview-mode"></a>preview mode | A mode of the service's local server that serves the view's pages from fixtures, so screenshots need no live data. | [plan of P2-N023](archive/plans/p2-n023-web-view-ux-refinement.md#def-preview-mode), 2026-11-03 |

## Ratified 2026-11-17

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-orchestrator-session"></a>orchestrator session | One long-lived session that starts and messages other sessions so that offered tasks keep moving, and does no node work itself. | The owner, in conversation, 2026-11-17, after the review of 2026-11-16; node P2-N027 plans it. Not the Orchestrator role of the retired dispatch loop, which is in the [retired terms](archive/vocabulary-retired.md). |
| <a id="def-delegation-brief"></a>delegation brief | The first message a session receives from the session that started it, naming the node, the step and the delegating session; the session claims that task without asking. | The owner, in conversation, 2026-11-17; defined in [how we work](process/how-we-work.md#delegating-a-task) |
| <a id="def-snapshot"></a>snapshot | The list of sessions the orchestrator's decision script reads: each session's identifier, title, creation time, status and model. | [specification of P2-N027](specs/orchestrator-session.md), S2; D080, 2026-11-17 |
| <a id="def-mark"></a>mark | Text the orchestrator session adds to a delegated session's title to record an action it carried out on that session. | [specification of P2-N027](specs/orchestrator-session.md), S2; D080, 2026-11-17 |
| <a id="def-pending-start"></a>pending start | A session that was started or sent work for a node and has not yet opened its task. | [specification of P2-N027](specs/orchestrator-session.md), S2; D080, 2026-11-17 |
| <a id="def-acted-file"></a>acted file | The watcher's local list of the action keys the orchestrator session has already carried out. | [specification of P2-N027](specs/orchestrator-session.md), S6; D080, 2026-11-17 |
