# Project vocabulary

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner checking what a term means
(RD-2). It assumes the methodology at this project's pinned version,
1.6.0 ([Classification](classification.md)), and the
[process specification](process/README.md).

This file holds one row per term that a gate record of this project
shows ratified. Each row is the term's definition site, under
[P-008 (terms are defined once and linked at first use)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-008--terms-are-defined-once-and-linked-at-first-use)
and decision 12 of the
[plan of node P1-N016 (process spec maintenance)](plans/p1-n016-process-spec-maintenance.md).
The passage that first defined a term keeps its text and its anchor.
A term the methodology vocabulary defines has no row here.

Row shape, under
[P-006 (registers hold uniform rows)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-006--registers-hold-uniform-rows):
the term with its `def-` anchor, its meaning in one sentence, and the
document whose gate record ratified it, with the date. Rows are
grouped by that document, in order of ratification.

## Ratified 2026-10-29

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-structural-conditions"></a>structural conditions (i) to (iii) of the navigation bound | The three conditions under which the navigation bound holds by construction: every starting point links the instance in its header, every resource entry has an anchor or a slug findable in one find, and every entry carries all five facets as labelled lines with its `spec:` and `risks:` lines as links. | [specification of P3-N002](specs/p3-n002-comprehension-model.md#the-navigation-bound), gate of 2026-10-29 |
| <a id="def-conduct-duty"></a>conduct duty | An obligation on how a session works or reports, as distinct from what it builds, supplied by a methodology rule at the pin or by a Risk register mitigation. | [specification of P1-N014](specs/p1-n014-role-contracts-adopt-conduct-rules.md#def-conduct-duty), gate of 2026-10-29 |
| <a id="def-entry-test-conditions"></a>entry test conditions ET-1 to ET-4 | The four conditions a candidate for the common risk catalogue is put to: a cross-project precondition, mitigation by each project, an encounter evidenced here, and an applicability that can be written as an Article 4 header. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-test), gate of 2026-10-29 |
| <a id="def-admit-merge-reject-defer"></a>admit, merge, reject and defer | The four outcomes a candidate takes under the entry test: a new entry, an encounter of an admitted entry, a rejection naming the failing condition, or a class held back because only ET-3 fails. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-test), gate of 2026-10-29 |
| <a id="def-reaches-line"></a>reaches line | The field of a catalogue entry that names the kind of part of a project the failure occurs in. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-shape), gate of 2026-10-29 |
| <a id="def-independent-encounter"></a>independent encounter | An encounter that is neither the same defect observed again nor found by the same investigation as another encounter of the entry. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-entry-shape), gate of 2026-10-29 |
| <a id="def-parts-enumeration"></a>parts enumeration | The committed list of this project's parts that the class-to-instance check reads, drawn from the checked Backlog entries of both repositories, the Plan register's `done` nodes, and a stated list of standing artifact classes. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-covering-entry"></a>covering entry | A Risk register entry that cites a class and names a part, or names a scope the run argues contains the part. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-genuine-omission"></a>genuine omission | An omission whose applicability argument is written, and whose run read a Risk register with complete citations. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-run-record"></a>run record | The record of one run of the class-to-instance check, naming the commits of its three inputs, the date, and the role that ran it. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check), gate of 2026-10-29 |
| <a id="def-sweep-record"></a>sweep record | The record that gives every candidate for the catalogue its outcome, with each entry test condition answered. | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#g-the-gate-reading), gate of 2026-10-29 |
| <a id="def-check-document"></a>check document | The document that holds the class-to-instance check's procedure, the parts enumeration and the run records: [common-risk-catalogue-check.md](common-risk-catalogue-check.md). | [specification of P3-N003](specs/p3-n003-common-risk-catalogue.md#child-a-one-class-carried-end-to-end), gate of 2026-10-29 |
| <a id="def-stop-predicate"></a>stop predicate | A W-001 stop condition written so that it names the artifact and the field it reads and yields stop or continue without a fresh judgment. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#gate-record-2026-10-29), gate of 2026-10-29 |
| <a id="def-fails-closed"></a>fails closed | Said of a stop predicate: a missing input yields stop, never continue. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#i-integration-invariants), gate of 2026-10-29 |
| <a id="def-addressee-of-an-ask"></a>addressee of an ask | The reader an ask in a task result names, the owner or the Orchestrator; an ask that names neither counts as the owner's. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#decisions-for-the-gate), decision 11, gate of 2026-10-29 |
| <a id="def-member-of-a-sequence"></a>member of a sequence | A chunk the owner ratified into a sequence: one node, with the stages ratified for it. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#gate-record-2026-10-29), gate of 2026-10-29 |
| <a id="def-relation-table"></a>relation table | Child A's table relating each methodology meta-review signal, and the review limit of ten rounds, to a W-001 condition, a `dispatch.md` containment rule, or "no counterpart". | [specification of P3-N005](specs/p3-n005-sequence-mode.md#i-integration-invariants), gate of 2026-10-29 |
| <a id="def-residue-table"></a>residue table | Child D's table checking the owner's asks clarification of 2026-09-17, part by part, against W-008 and the methodology's IR specification. | [specification of P3-N005](specs/p3-n005-sequence-mode.md#child-d-the-determination-on-w-001-and-the-artifact-or-the-argument), gate of 2026-10-29 |

## Ratified 2026-10-30

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-facet"></a>facet | One of the five questions a Project model entry answers, written as one or more labelled lines. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-facet) |
| <a id="def-held-edge"></a>held edge | An edge that a plan or specification states and that the instance does not yet hold. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-held-edge) |
| <a id="def-own-status"></a>own status | A status a resource carries in another register, such as a ruling's `active`. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-own-status) |
| <a id="def-formerly-line"></a>formerly line | The line of an entry that names a predecessor implementation the resource replaced. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-formerly-line) |
| <a id="def-standing-append"></a>standing append | An act the Orchestrator repeats at every acceptance, such as adding events to the run journal, which is neither a node's work nor an edge. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-standing-append) |
| <a id="def-node-specification"></a>node specification | The specification document of one node, whose lifecycle is K-007's, ending `closed → Backlog entry`. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-node-specification) |
| <a id="def-process-specification"></a>process specification | A persisting document that states what a resource must meet and has no node lifecycle. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-process-specification) |
| <a id="def-standing-resource"></a>standing resource | A resource that nodes change as a matter of course, such as a repository, so that its modifying edges carry no information about its state. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-standing-resource) |
| <a id="def-alias-line"></a>alias line | The line of an entry that keeps the slugs a resource had before a rename, so that edges written with an old slug still resolve. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-alias-line) |
| <a id="def-closing-parenthetical"></a>closing parenthetical | The parenthesized group that ends an item and names its notes and sources. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-closing-parenthetical) |
| <a id="def-node-item"></a>node item | An item on an edge line whose body is a node identifier, followed on `used-by:` by any after qualifier. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-node-item) |
| <a id="def-after-qualifier"></a>after qualifier | The words ` after ` and one or more node identifiers on a `used-by:` node item, naming the modifying nodes the using node waits for. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-after-qualifier) |
| <a id="def-gate-item"></a>gate item | A `created-by:` item saying that the owner's decision at a node's gate created the resource. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-gate-item) |
| <a id="def-outside-item"></a>outside item | An item on an edge line naming a party outside the Plan register. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-outside-item) |
| <a id="def-partial-item"></a>partial item | The last item of an edge line, saying why the line is incomplete. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-partial-item) |
| <a id="def-date-note"></a>date note | A note on a node item or a gate item that dates the node's arrival at `done`. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-date-note) |
| <a id="def-list-of-what-is-next"></a>list of what is next | The answer a project's records give to what is next, which under K-003 as released at 1.6.0 is the Backlog's upcoming section. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-list-of-what-is-next) |
| <a id="def-rendering"></a>rendering | A text produced from a source by a stated procedure, which adds no claim the source lacks and drops none the procedure says it carries. | [plan of P3-N007](plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying), verifying gate of 2026-10-30; defined in [project-model.md](process/project-model.md#def-rendering) |
| <a id="def-sequence-ratified"></a>`sequence-ratified` | A run journal event kind recording that the owner ratified a sequence. | [plan of P3-N014](plans/p3-n014-loop-runs-sequence-mode.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [observability.md](process/observability.md#events) |
| <a id="def-sequence-stopped"></a>`sequence-stopped` | A run journal event kind recording that a running sequence stopped, with the stopping condition and the stopping member's asks in its note. | [plan of P3-N014](plans/p3-n014-loop-runs-sequence-mode.md#gate-record-2026-10-30), gate of 2026-10-30; defined in [observability.md](process/observability.md#events) |
| <a id="def-view-token"></a>view token | The read-only credential the owner mints for the web view, held apart from the MCP bearer token and refused by the MCP endpoint. | [specification of P2-N003](specs/p2-n003-owner-questions-and-plan-view.md#def-view-token), gate of 2026-10-30 |
| <a id="def-view-cookie"></a>view cookie | The signed cookie the sign-in route issues in exchange for the view token, which every other `/view` route requires. | [specification of P2-N003](specs/p2-n003-owner-questions-and-plan-view.md#def-view-cookie), gate of 2026-10-30 |
| <a id="def-not-computable"></a>not computable | The web view's marking for a rendering, or an item of one, that the type's procedure cannot finish from the files at the page's commit, naming the file, the line and the missing input. | [specification of P2-N003](specs/p2-n003-owner-questions-and-plan-view.md#def-not-computable), gate of 2026-10-30 |
| <a id="def-task-file"></a>task file | A task's brief, committed by the Orchestrator at `orchestration/tasks/<task ID>.md` and pushed, so that any session can find the offered task in git. | [plan of P2-N005](plans/p2-n005-task-pull-loop.md#def-task-file), gate of 2026-10-30 |
| <a id="def-claim-branch"></a>claim branch | The branch `claim/<task ID>`, whose creation by a session's non-forced push claims that task. | [plan of P2-N005](plans/p2-n005-task-pull-loop.md#def-claim-branch), gate of 2026-10-30 |
| <a id="def-result-file"></a>result file | A task's result in the result core's shape, committed at `orchestration/results/<task ID>.md` on the claimant's work branch. | [plan of P2-N005](plans/p2-n005-task-pull-loop.md#def-result-file), gate of 2026-10-30 |
| <a id="def-session-handle"></a>session handle | A value the service issues to a session that declares its role, which the session passes on later calls so the service knows its role. | [plan of P2-N005](plans/p2-n005-task-pull-loop.md#def-session-handle), gate of 2026-10-30 |
| <a id="def-pull-run"></a>pull run | A run of the loop, chosen in the scope grant, in which the Orchestrator offers each task as a task file and a session in the task's role claims and serves it. | [specification of P2-N005](specs/p2-n005-task-pull-loop.md#def-pull-run), gate of 2026-10-30 |
| <a id="def-offering-branch"></a>offering branch | The branch of the coordinating repository that a pull run's scope grant names, which holds the run's task files and into which work merges at acceptance. | [specification of P2-N005](specs/p2-n005-task-pull-loop.md#def-offering-branch), gate of 2026-10-30 |
| <a id="def-claim-commit"></a>claim commit | An empty commit on a claim branch whose message opens with `Claim`, `Renew` or `Release` and the task ID; the branch's tip commit decides the claim's state. | [specification of P2-N005](specs/p2-n005-task-pull-loop.md#def-claim-commit), gate of 2026-10-30 |

## Ratified 2026-11-03

| Term | Meaning | Ratified in |
|---|---|---|
| <a id="def-citation-test"></a>citation test | The rule that decides whether a Risk register entry carries a *Class* line for a class: the sweep recorded the entry as the source of a row that admits the class or merges into it, or the entry's text states the class's failure as its own subject. | [plan of P3-N011](plans/p3-n011-sweep-and-omission-list.md#def-citation-test), gate of 2026-11-03 |
| <a id="def-delta-row"></a>delta row | A candidate row, labelled `DL-nn`, for a failure that a source recorded after the pass that read the source. | [plan of P3-N011](plans/p3-n011-sweep-and-omission-list.md#def-delta-row), gate of 2026-11-03 |
| <a id="def-owner-attended-session"></a>owner-attended session | A Claude Code session the owner drives directly, outside the Orchestrator's dispatch, whose results the Orchestrator records from merged pull requests. | [plan of P2-N023](plans/p2-n023-web-view-ux-refinement.md#def-owner-attended-session), 2026-11-03 |
| <a id="def-preview-mode"></a>preview mode | A mode of the service's local server that serves the view's pages from fixtures, so screenshots need no live data. | [plan of P2-N023](plans/p2-n023-web-view-ux-refinement.md#def-preview-mode), 2026-11-03 |
| <a id="def-sequencing"></a>`sequencing` | A type in the Ruling register's taxonomy, for rulings on dispatch order and concurrency. | [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md#def-sequencing), gate of 2026-11-03 |
| <a id="def-stack"></a>`stack` | A type in the Ruling register's taxonomy, for rulings on languages, runtimes and code sharing. | [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md#def-stack), gate of 2026-11-03 |
| <a id="def-knowledge"></a>`knowledge` | A type in the Ruling register's taxonomy, for rulings on which document holds which truth. | [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md#def-knowledge), gate of 2026-11-03 |
| <a id="def-unblocked"></a>`unblocked` | A run journal event kind recording that a hold was released, whose note names what released it. | [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md#def-unblocked), gate of 2026-11-03 |
| <a id="def-risk-opened"></a>`risk-opened` | A run journal event kind recording that a Risk register entry was opened, whose note names the entry. | [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md#def-risk-opened), gate of 2026-11-03 |

## Not listed

These terms have definition sites. The search that built this file,
on 2026-11-03, found no gate record that shows them ratified. Each
gains a row when one does.

- *result core*, defined in [dispatch.md](process/dispatch.md#def-result-core).
- *aggregate node*, defined in the
  [check document](common-risk-catalogue-check.md); the Backlog row
  "Ratify or strike the term aggregate node" holds it.
- *predicate commit* and *stand-in grant*, in the
  [plan of P3-N013](plans/p3-n013-stop-conditions-decidable.md), which
  records them as awaiting ratification.
- *seen again* and *merge with exposure*, defined in the
  [check document](common-risk-catalogue-check.md#def-seen-again).
- *resource*, *slug* and *edge*, defined in
  [project-model.md](process/project-model.md#defined-terms).
