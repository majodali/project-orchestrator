# Rebuild: the orchestrator runs on a checked data model

Status: active (the owner accepted the decisions and ratified the
milestones on 2026-11-09)

<!-- K-007 contract: Status transitions draft → active → closed →
     Backlog entry. While active, the checklists below are this
     project's progress record (deviation from K-003, recorded in
     docs/classification.md at milestone 0). -->

Reader: the owner, and any session doing the rebuild. The reader
knows this repository's README and the
[review of 2026-11-09](../reviews/2026-11-09-review-of-the-approach.md).
Nothing else is assumed. This plan does not follow the orchestrator's
own plan format on purpose.

## Outcome

At the end of this plan:

- One file per managed project, `orchestration/state.json`, holds the
  plan: nodes, tasks and decisions. A schema and a set of invariants
  check it in CI and in the service. Markdown views of it are
  generated, never hand-edited.
- The service reads and writes that file through the GitHub App. Git
  stays the only source of truth. The lease table and the three-call
  confirm protocol are gone.
- The web view shows, in a desktop browser, what is done, what is
  next, what waits on the owner and which decisions are open, with
  titles first and identifiers second. Every title says what the thing
  delivers.
- A session claims the next task and closes it through two tool calls.
- This repository runs its remaining work through that loop. The
  pilot on methodology-tools can start.

The acceptance test for the whole plan: a fresh session given only the
README states what is done, what is next and what waits on the owner
within five minutes, and the owner confirms the statement from the
view within one minute.

Two things this plan does not optimize for, by the owner's decision
of 2026-11-09: a phone layout (the view targets a desktop browser; a
phone version is a later decision) and a git-only fallback for a
service outage (an outage is a signal about the service, not a case
to design around).

## How we work during the rebuild

1. Owner-attended sessions on one capable model. No role dispatch.
2. One milestone at a time, in the order below. The owner ratifies the
   sequence once (W-001's pre-ratified mode). A milestone stops the
   sequence only when a decision below changes or a check fails.
3. Small pull requests. CI runs tests, lint and the state checker.
   Pull requests auto-merge on green. The owner reviews state in the
   view and in this plan's checklists, not in merge queues. The
   session that opens a pull request subscribes to it at once, so that
   check failures, comments and the merge reach it as events (owner,
   2026-11-10); a deploy that a merge triggers is checked the same
   way, by its run, before the milestone is reported done.
4. Documentation moves in the same pull request as the work (W-003).
   A hand-written document is at most 300 lines.
4a. Titles beside identifiers everywhere, by tooling. A title is read
   in the context of its parent and siblings, so the view and the
   renderings always show a node in its tree, and a title is a succinct
   noun phrase in standard terms: "Task pull loop", "Platform
   capability checks". Detail belongs in the outcome. The rule is one
   question: does the title name the thing the node does or delivers?
   "Child C" and "The platform facts, verified" fail it; the checker
   warns on the second shape as one heuristic, and the review judges
   the rest (owner, 2026-11-09 and 2026-11-10).
5. Reports to the owner use W-008's four parts and lead with the asks.
   No gate summaries, no numbered decision batches, no term
   ratification ceremonies. A new term gets a row in
   `docs/vocabulary.md` in the same pull request.
6. The methodology pin stays at 1.6.0. Nothing is proposed upstream
   until milestone 6.
7. Each milestone ends with the fresh-session orientation test and a
   line in this plan recording the result.

## Milestones

### M0. Freeze and declare

Goal: stop the old loop cleanly and make the state honest.

- [x] Record the deviations in `docs/classification.md` of both
      repositories: K-003 (progress truth is `orchestration/state.json`
      and this plan), and the custom definitions Plan register, Cost
      log, Ruling register and Project model marked `in-progress`.
- [x] Add a status line at the top of `docs/plan.md`,
      `docs/plan-register.md`, `docs/cost-log.md`, `docs/rulings.md`,
      `docs/project-model.md` and `docs/backlog.md`: frozen on the date,
      superseded by this plan for the rebuild, to become renderings.
- [x] Fix the Binding block in the service repository's `CLAUDE.md`
      (it names 1.5.0; the Classification pins 1.6.0).
- [x] Disable the plugin's `orchestrate` skill entry point with a
      one-line notice pointing here. Keep the form checker runnable.
- [x] Merge or close every open branch in both repositories.
- [x] The owner approves this plan and ratifies milestones 1 to 6 as
      one sequence. Status here goes `active`.

Acceptance: both repositories are green, no branch but `main` is
open, and the frozen documents say so at their top.

Owner actions: approve the plan; answer the decisions below.

Estimate: one session.

### M1. The state file and its checker

Goal: the plan lives in one checked file, imported from the current
registers without loss.

Where: the service repository, package `src/model/`, published for the
plugin to consume.

- [x] Define the schema (version 0) with `zod`, as sketched under
      *The data model*. Nodes, tasks, decisions.
- [x] Write `import-registers`: reads `docs/plan-register.md`,
      `docs/cost-log.md`, `docs/rulings.md`, `orchestration/journal.jsonl`
      and the gate records in `docs/plans/*.md`, and writes
      `orchestration/state.json`. Every node gets a title from the
      register and an outcome sentence from its plan's Outcome section.
      A node with no outcome sentence is listed for the owner to write
      one. A node whose title does not say what it delivers is listed
      for rewriting, with a proposed title.
- [x] Write `check`: schema validation and the invariants listed under
      *The invariants*. Exit non-zero on a violation. Preflights the
      Node version, as the form checker does.
- [x] Write `render`: `state.json` to `docs/plan-register.md` and to
      `docs/plan.md` (title, outcome, stage, dependencies, open
      decisions per node). The rendered files carry a generated-file
      header. `check` fails when a rendering differs from `render`'s
      output.
- [x] Commit `orchestration/state.json` and the renderings to this
      repository. Retire the vendoring generator; the plugin depends on
      the service repository's package by commit (`package.json`).
- [x] CI in both repositories runs `check`.

Acceptance: `check` passes on this repository; the rendered register
lists the same 59 nodes with the same stages as before; the import
record lists every node that lacked an outcome sentence or a
descriptive title, and the owner has rewritten or accepted each.

Estimate: two to three sessions.

### M2. The view reads the state file

Goal: the view, in a desktop browser, answers the owner's four
questions without the Backlog.

- [x] The tree page reads `state.json`. Each row: title, status badge,
      one-line outcome; identifier small and secondary. Fold as today.
- [x] A "Waiting on you" section at the top: open decisions with their
      default, and gated nodes. Replaced under decision 11 by attention
      in context: highlighted rows, ancestor flags, decisions under
      their node, the paths to them unfolded, and `?open=` for other
      unfoldings.
- [x] A "Next" section: actionable nodes in order. Dropped under
      decision 11: a ready node starts automatically, or waits on the
      owner when its `start` is `approve`.
- [x] The node page: outcome, stage, what it waits on, what waits on
      it, its tasks with pull request links, its decisions, links to
      plan and spec. No criteria labels, no rulings.
- [x] Remove the Markdown parsers from the view path. Keep the
      problems section for anything `check` would flag.
- [x] Screenshots before and after at desktop width in the pull
      request, with the existing screenshot tooling. The phone-width
      shots and the no-horizontal-scroll check are dropped.

Acceptance: the owner answers "what is done, what is next, what waits
on me, which decisions are open" in the view in one minute. A fresh
session passes the orientation test from the README.

Estimate: two sessions.

### M3. The service writes the state file

Goal: one conditional commit replaces the lease, update and confirm
protocol.

- [x] Owner action: grant the GitHub App `contents: write` on the
      managed repositories. Done 2026-11-10: the App is
      `majodali-project-orchestrator`, with contents read and write.
- [x] The service writes only under a path allowlist:
      `orchestration/state.json`, `orchestration/journal.jsonl` and the
      rendered files. Enforced in code and tested
      (`src/model/store.ts`).
- [x] Writes are one commit through the Git Data API, with the head
      the state was read at as the parent and a fast-forward ref
      update as the check (`src/planRegister/gitWriter.ts`). A
      conflict re-reads and retries once, then reports. This is the
      concurrency control; the DynamoDB lease tables and their code
      are removed. (Written as the contents API with a blob SHA when
      planned; the Git Data API writes the four files in one commit,
      which the contents API cannot.)
- [x] Tools: `plan_read` (now the state file), `node_update` (stage,
      hold, outcome, dependencies), `task_open`, `task_close`,
      `decision_open`, `decision_close`. Each runs `check` on the
      result before committing and refuses a violation
      (`src/stateTools.ts`).
- [x] Each service write appends a journal event, `state-written`,
      whose `ref` is the commit the write was based on; the commit
      that carries the line is the write itself.
- [x] An unreachable service is reported to the owner as a service
      defect, not worked around. No fallback path is built (owner,
      2026-11-09). `check` and `render` stay runnable locally because
      CI needs them, which is the only offline path.

Acceptance: a session moves a real node through a stage with one tool
call, the commit appears on `main`, the view shows it at the new SHA,
and `check` passes in CI.

Estimate: two to three sessions.

### M4. Decisions in the view

Goal: the owner answers open decisions in the view and git records
each answer.

- [x] The decisions under a node in the tree let the signed-in owner
      choose an option or accept the default, with a one-line note.
      This is how owner questions are handled in the view (owner,
      2026-11-10): each is a decision on its node, answered where it
      is shown. Built: the form sits under the open decision on its
      node page (the tree links to it), or on the tree page for a
      project decision (`src/view/actions.ts`).
- [x] The node lifecycle is visible and actable in the view: a node
      waiting on the owner shows what the owner can do (approve its
      start, accept its review, lift its hold), and the action is one
      click that the service commits (owner, 2026-11-10). Built as
      three node updates: approving a start sets `start` to `auto`,
      lifting a hold clears it, accepting a review moves the node to
      `done` with the date.
- [x] The service commits the answer through `decision_close`. No held
      state outside git. Built: the view's forms and the tools apply
      the same mutation (`src/model/mutations.ts`) through the same
      store; the journal names the session "the owner, in the view".
- [x] A session that opens a task reads the decisions closed since its
      node was planned. Built as: `task_open` answers the closed
      decisions on the node and its ancestors, and the standing
      project decisions. (Nodes carry no planning date, so "since it
      was planned" is read as "on it and above it".)

Acceptance: the owner closes a real decision in the view and sees the
commit.

Estimate: one to two sessions.

### M5. The task loop, minimal

Goal: sessions pull work without an orchestrator session.

- [x] `task_next(role?)`: the first node in order whose dependencies
      are done, whose stage admits the next step and which has no open
      task. Returns the node, its outcome, its documents and the
      closed decisions. Built as specified below (`src/model/loop.ts`).
- [x] `task_open` is the claim. The service's conditional commit makes
      it atomic. A task open longer than its time limit is closed as
      stale by the next `task_next` call. Built; the limit is 24 hours.
- [x] `task_close(status, pull request, summary)`: records the result,
      moves the node when the status allows, and lists the asks the
      summary carries as open decisions. Built; the asks are an
      explicit `asks` argument, not parsed from the summary.
- [x] Stop conditions as code: a failed check, a changed scope (a node
      edited outside the task), an open decision on the node, an ask in
      the summary. Each returns the session to the owner. Built.
- [x] The standard close-out actions specified and implemented as
      orchestrator features, never plan nodes (decision 13): on
      `task_close`, the task's cost, pull request and summary are
      recorded; when a node's work is done, the node moves on and
      carries its done date; verification runs as a hidden check node,
      shown only when it fails or is selected. The specification is a
      section of this plan, written before the code. Written as "The
      loop and the close-out" below, then built.
- [ ] This repository's remaining real work runs through the loop in
      owner-attended sessions for one week.

Acceptance: two sessions on different days move one node from
`specified` to `done` through the tools, with the owner touching only
the decisions.

Estimate: two sessions.

### M6. Re-plan, prune and hand back

Goal: the repository reads as a project again and the methodology
follow-ups are proposed once.

- [ ] Re-plan the remaining nodes into the state file. Park the P3
      line's open nodes under one node, "process research", with their
      documents linked. Keep the service nodes that remain useful.
- [ ] Shrink `docs/process/` to what the code enforces, plus one
      "how we work" page of at most 200 lines. Move the rest to
      `docs/archive/` with a status line each.
- [ ] Rewrite the README: what this is, the view link, how a session
      enlists, how to run the checks. At most 150 lines.
- [ ] Generate the Backlog from the state file. Record the end of the
      K-003 deviation when the methodology releases the amendment.
- [ ] Propose upstream, in one batch with evidence: release of the
      K-003 amendment; registers as data files with renderings;
      bounded specification depth.
- [ ] Start the pilot on methodology-tools: enlist it, import an
      initial state file from its Backlog.

Acceptance: the orientation test passes for both repositories; the
word count under `docs/` is below 100,000 excluding `docs/archive/`.

Estimate: two sessions.

## The loop and the close-out

The specification milestone 5 builds to, written before its code
(decision 13). The loop is three tools, `task_next`, `task_open` and
`task_close`, over the state file; every move is one commit by the
service, and the close-out actions are the service's own behaviour,
never nodes of the plan.

### Steps and stages

A node's stage says which step the loop offers next, and the step's
role says who takes it. `task_close` with status `closed` moves the
node as the last column says.

| Stage | Step offered | Role | On `closed` |
|---|---|---|---|
| `identified` | `plan` | planner | `planned` |
| `planned` | `specify` | planner | `specified` |
| `specified` | `execute`, or `break down` when the task says so | implementer, planner | `verifying` with a check node; `break down`: `broken-down` |
| `executing` | `execute` (continued or reworked) | implementer | `verifying` with a check node |
| `verifying` | none on the node; its check node carries `verify`. When the check node failed: `execute`, the rework | implementer | the check node returns to `specified` for a new round |
| `broken-down` | none; the children carry the work | | when the last work child is done: `verifying` with a check node |
| check node, `specified` | `verify` | reviewer | the check node and its parent are `done`, with the date |

`task_open` with step `execute` moves the node to `executing`: the
stage records that work started. The other steps leave the stage.

### The check node

Verification runs as a hidden check node (decision 13). When a node
enters `verifying` the service adds one child with `kind: "check"`,
titled "Verification of <title>", outcome "<id> is verified against
its outcome", stage `specified`, no dependencies, the parent's
documents, and the next identifier in the parent's plan line. The
`verify` step runs on it. Closing that task `closed` makes the check
node and its parent `done` with the date, then climbs: a `broken-down`
grandparent whose work children are all done enters `verifying` with
a check node of its own. Closing it `blocked` or `needs-judgment` puts
a hold on the check node with the summary as its reason; the parent
stays `verifying` and offers `execute` again, and the rework's close
lifts the hold and returns the check node to `specified`.

The view and the renderings hide a check node unless it carries a
hold (it failed), has an open task (it is in flight, so the flags
above it add up) or is selected: its own page, and its parent's page,
always show it. Check nodes count in no total. The owner's
accept-review action marks the node's open check nodes done with it.
Invariant 11: a node at `verifying` has exactly one check node not
done, and a check node has a parent.

### `task_next(role?)`

1. Closes every open task older than the time limit, 24 hours, as
   `stale`, with a summary saying so, in one commit, before answering.
2. Walks the nodes in tree order and answers the first that offers a
   step, for the role when one is given. A node offers no step when it
   is `done` or `parked`, carries a hold, waits for approval, has an
   open task, has an open decision, has a dependency not done, its
   own or an ancestor's, or stands below a node that is parked or
   held: a hold or a park pauses everything below it (owner,
   2026-11-11), and such a node's class is `paused`.
3. Answers the node in full with its step and role, its outcome, its
   documents at the commit, the chain of its ancestors' titles, the
   summaries of the tasks that ran on it, the closed decisions on it
   and above it, and every standing decision, compact, wherever it
   arose: a precedent binds every task. Also the next candidates, so
   a session can see what follows.

A stale close keeps the task's summary; the journal says why it
closed.

### `task_open` is the claim

One conditional commit: it fails when another session's claim landed
first, and invariant 6 refuses a second open task on a node. It
refuses a node that does not offer the step, naming the stop
condition. It records the commit it was based on in the task's `base`
field and answers what `task_next` answers.

### `task_close(status, summary, pull request, …)`

Records the result on the task: status, closing time, summary, pull
request, commit, token counts. A planning step delivers its result
here too, applied with status `closed`: a title, an outcome and the
plan document from `plan`, the specification from `specify`. Then:

- Scope changed: the node's title, outcome, parent, dependencies or
  documents differ from what they were at the task's `base`. The task
  closes as `needs-judgment` whatever status was given, the node is
  gated with the reason, and the answer says so.
- `closed`: the move of the table above, and each ask the call
  carries (`asks`: question, options, default) becomes an open
  decision on the node, which keeps the next step from being offered
  until the owner answers.
- `blocked`: the node is held `blocked` with the summary as reason.
- `needs-judgment`: the node is held `gated` with the summary as
  reason.
- `stale`: the record only.

### Stop conditions as code

Each returns the session to the owner by making the next step
unavailable and saying why in the tool's answer:

- A failed check: the write is refused with the violations and
  nothing is committed (milestone 3).
- A changed scope: the close above.
- An open decision on the node: `task_next` passes the node by and
  `task_open` refuses it, naming the decision.
- An ask in the summary: the decisions opened at close.

### Pull requests and done

A node is done only when its pull requests are merged, and the service
merges them itself when the done decision is taken, so no merge waits
on a person (owner, 2026-11-11). A session opens a pull request and
never merges it.

- A planning step (`plan`, `specify`, `break down`) has no
  verification: its pull request merges at its `closed` close.
- An `execute` step's pull request stays open at its close and merges
  when the verification closes `closed`, with every other unmerged
  pull request of the node's closed tasks.
- The owner's acceptance in the view, and `node_update` to `done`,
  merge the same way before they commit.
- The merge goes through GitHub's merge endpoint, so branch protection
  decides. The service also refuses a pull request whose checks are
  failing or still running, that conflicts with its base, or that is
  a draft. A refusal commits nothing and names the reason; the close
  is called again when the pull request can merge.
- `task_close` with `branch` in place of a pull request opens one.

The GitHub App needs `Pull requests: Read and write` and to be
installed on each repository whose pull requests the tasks carry.

### `node_remove`

An obsolete node is removed, never parked or held, and git keeps its
history (decision 12; owner, 2026-11-11). `node_remove(node, reason)`
removes the node with everything below it, their tasks and their
decisions; a node that waited for a removed one no longer does; a
`broken-down` parent whose remaining work is all done enters
`verifying`. It is refused while a task is open under the node. The
state file's `highWater` records the highest number removed under
each identifier prefix, so no identifier is minted twice (invariant
1). A hold or a park is for work that will resume.

### What a session is told

The service's MCP instructions carry the protocol to every session
that connects: go through a task, never edit the four files the
service writes, never merge a task's pull request, remove what is
obsolete, name yourself in `session`. The first real use, on
2026-11-11, was a session asked to work on a node that made seven
commits and opened no task, because nothing told it.

### `node_add`

Planning and breaking down need new nodes: `node_add(parent, title,
outcome, after, docs, stage, start)` adds one child with the next
identifier in the parent's plan line, or a root in a named line. A
parent not yet broken down becomes `broken-down` with its first
child: a node with children is broken down (invariant 3).

## The data model

Version 0. One file, `orchestration/state.json`, in the managed
repository. The schema is code in the service repository and is the
type's definition for Classification purposes.

```jsonc
{
  "schema": 0,
  "project": "majodali/project-orchestrator",
  "nodes": [
    {
      "id": "P2-N021",
      "title": "The web view's first version",
      "outcome": "A signed-in owner sees the plan tree and drills to node and task, read at one commit.",
      "stage": "done",
      "parent": "P2-N003",
      "after": [],
      "hold": null,
      "docs": { "plan": null, "spec": "docs/specs/p2-n003-owner-questions-and-plan-view.md" },
      "done": "2026-11-03"
    }
  ],
  "tasks": [
    {
      "id": "T094",
      "node": "P2-N021",
      "step": "execute",
      "status": "closed",
      "opened": "2026-10-30T22:00:00Z",
      "closed": "2026-11-01T00:12:46Z",
      "pr": "majodali/project-orchestrator-service#18",
      "model": "claude-sonnet-5",
      "tokens": { "in": null, "out": null },
      "summary": "The tree page behind sign-in, read at one SHA."
    }
  ],
  "decisions": [
    {
      "id": "D001",
      "node": "P3-N008",
      "question": "Does docs/plan.md stay the hand rendering until the Backlog becomes a rendering?",
      "options": ["yes", "retire it now"],
      "default": "yes",
      "chosen": null,
      "decided": null,
      "rationale": "The renderings omit outcomes, which are most of the document.",
      "standing": false
    }
  ]
}
```

Field rules:

- `stage` is one of `identified`, `planned`, `specified`,
  `broken-down`, `executing`, `verifying`, `done`, `parked`. `parked`
  is new: the node is kept and not planned.
- `hold` is null or `{ "kind": "gated" | "blocked", "reason": "..." }`.
- `after` lists node identifiers this node waits for. Sibling order
  no longer implies dependency.
- `start` is `auto` (the default: the loop takes the node when its
  dependencies are done) or `approve` (a ready node waits for the
  owner's go-ahead and counts as waiting on the owner). Decision 11.
- `outcome` is one sentence, at most 40 words. Required from `planned`
  on.
- `step` is `plan`, `specify`, `break down`, `execute` or `verify`.
- `kind` is `work` (the default) or `check`: a check node is the
  verification of its parent, hidden unless it fails or is selected
  (milestone 5).
- A task's `base` is the commit it was opened on; `task_close` reads
  the node there to tell a changed scope (milestone 5).
- `highWater` maps an identifier prefix (`P2`, `T`, `D`) to the
  highest number removed under it. Absent until something is removed.
- A decision with `standing: true` is a precedent (today's ruling). A
  closed decision is never edited; a new decision supersedes it and
  names it in `rationale`.
- Resources, verification evidence and multi-project state are later
  schema versions, added when the view or the loop needs them.

## The invariants

Checked by `check`, in the service and in CI. Each names the rule it
serves when one exists.

1. The file validates against the schema. Identifiers are unique and
   never reused.
2. Every `parent` and every `after` entry names an existing node.
   Dependencies form no cycle.
3. A node with children is `broken-down`, `verifying`, `done` or
   `parked`. A child is never past its parent's reach: no `executing`
   child under an `identified` parent.
4. A node from `planned` on has a title and an outcome within the
   length bound. A title is at least two words and is not an
   identifier, a child letter or a chunk number; a title in the
   "<noun phrase>, <verb>" idiom is a warning. Whether it names the
   thing is judged at review and at the orientation test.
5. A node not `done` and not `parked` is exactly one of: actionable
   (dependencies done, no hold, no open task), in flight (an open
   task), waiting (some dependency not done), gated, blocked.
6. A task names an existing node. A node has at most one open task. A
   closed task has a closing time and a pull request or a stated
   reason for none.
7. An open decision has a default. A closed decision has a choice and
   a date. A decision names an existing node or `null` for a project
   decision.
8. Every path under `docs` in the file exists in the repository.
9. The rendered Markdown files equal `render`'s output.
10. Siblings stand after the siblings they depend on, a dependency
    counting at the sibling level when any node in one subtree waits
    for any node in another's. `render --write` puts the file in this
    order; the order itself carries no meaning (decision 12).
11. A check node has a parent, and a node at `verifying` has exactly
    one check node not done (milestone 5).

## GitHub interaction changes

| Today | After |
|---|---|
| The owner merges every pull request by hand | Branch protection requires the checks; auto-merge on green; the owner reviews state in the view |
| The service never writes git; a session applies an edit and calls `plan_confirm`; a DynamoDB lease serializes writers | The service commits `state.json` through the contents API with the blob SHA as the concurrency check; the lease table is removed |
| Shared parsing code vendored by a generator from the plugin into the service | One package in the service repository; the plugin depends on it by git tag |
| Five Markdown registers written by hand and parsed back | One JSON file written by tools; Markdown rendered from it |
| Task claims by branches and empty commits (as specified for the pull loop) | A task claim is one conditional commit by the service |
| Owner answers held in the service until an Orchestrator commits them (as planned) | Each answer is a commit by the service at the time of answering |
| Methodology changes hand-carried, six migrations in ten weeks | Pin frozen at 1.6.0; one batch of proposals at milestone 6 |

View refinements kept for the end of the plan, a refinement round
after milestone 6 (owner, 2026-11-10 and 2026-11-11):

- making salient points stand out in the tree;
- showing a node's dependencies and dependents with highlights when
  it is selected, which needs the page to run script and so a
  decision on the view's no-script rule;
- the node page as a detail panel beside the tree on the main page,
  instead of a page of its own;
- the node page's own design;
- feedback when a form is submitted: at least the button disabled on
  click, which also needs script; later the views become
  single-page, with interactions and updates driven by front-end and
  back-end events.

Later, not in this plan: a push webhook so the view updates without a
reload; a remote MCP connector for surfaces without a clone; and
formally verifiable outcomes, which wait for an outcome model that
allows formal verification (owner, 2026-11-09).

## What happens to existing documents

- `docs/plan-register.md`, `docs/plan.md`, `docs/backlog.md`: frozen
  at M0, generated from M1 (register and plan) and M6 (Backlog).
- `docs/cost-log.md`, `docs/rulings.md`: frozen at M0, imported into
  tasks and decisions at M1, moved to `docs/archive/` at M6.
- `docs/project-model.md` and its type specification: parked at M0.
  Resources enter the schema only when a consumer needs them.
- `docs/process/`: untouched until M6, then shrunk to what the code
  enforces plus one page.
- `docs/plans/` and `docs/specs/`: kept as the record of each node.
  Linked from the state file. New nodes get a criteria list of at most
  20 items, not a specification document.
- `orchestration/journal.jsonl`: kept. The service appends to it.

## Decisions

The owner accepted every default on 2026-11-09 and added decisions 9
and 10. A later change to any of these is a new row in the state
file's decisions, not an edit here.

1. Pause the P3 line (comprehension model, risk catalogue, sequence
   mode, reversibility) and park its open nodes. Default: yes.
2. The service may write git under the path allowlist above. This
   changes the service plan's standing constraint "the service never
   writes git" and keeps "git is authoritative". Default: yes.
3. The state file is JSON validated by a `zod` schema, at
   `orchestration/state.json`. Default: yes. Alternative: YAML.
4. The shared model code lives in the service repository and is
   consumed by the plugin as a package. Vendoring is retired.
   Default: yes.
5. During the rebuild, pull requests auto-merge on green in both
   repositories. Default: yes.
6. The methodology pin stays at 1.6.0 with the deviations the review
   lists, recorded at M0. Default: yes.
7. Node identifiers stay as they are (`P2-N021`). Titles are shown
   beside them everywhere. Default: keep.
8. Milestones 1 to 6 run as one pre-ratified sequence. Default: yes.
   Ratified 2026-11-09.
9. The view targets a desktop browser. A phone layout is a later
   decision, not a requirement of this plan. Owner, 2026-11-09.
10. No git-only fallback for a service outage is built in this plan.
    Owner, 2026-11-09.
11. The plan hierarchy is the view's primary view. What waits on the
    owner shows in context: the node highlighted with its reason, every
    ancestor flagged with the count below it, open decisions under their
    node, and the paths to those nodes unfolded on load with everything
    else folded. "Ready" is not a category: a node starts automatically
    when its dependencies are done unless its `start` is `approve`, and
    then it waits on the owner. Owner, 2026-11-10.
12. The plan shows only its latest version: an obsolete node is
    removed from the state file, which git history keeps, rather than
    kept as noise (P1-N006 and P1-N007 removed). Siblings are listed
    in dependency order. Owner, 2026-11-10.
13. Standard planning and execution actions, such as recording a
    task's cost or closing out a node, are the orchestrator's own
    functionality, recorded on the node's tasks and events, never
    nodes of the plan. A review with a specific outcome gets a node
    named for the outcome. Automated validation that must be visible
    on failure becomes a hidden check node at milestone 5, shown only
    when it fails or is selected. Owner, 2026-11-10; the default
    confirmed the same day. The close-out behaviours are specified as
    orchestrator features at milestone 5.
14. A node is done only when its pull request is merged. When a done
    decision is taken, by a reviewer's close or by the owner in the
    view, the service opens the pull request if there is none and
    merges it. No merge waits on a person. Owner, 2026-11-11. This
    replaces decision 5's auto-merge on green for pull requests a
    task carries.
15. An obsolete node is removed by the service, and git keeps the
    history; it is not parked or held. Owner, 2026-11-11, sharpening
    decision 12.
16. A hold or a park on a node pauses everything below it. Owner,
    2026-11-11, approving the review's finding 5.

## Risks

- The import loses facts that only prose carried. Mitigation: the
  import record lists every node and ruling it could not map; the
  frozen files stay readable in git history.
- The GitHub App's write permission widens the service's blast
  radius. Mitigation: the path allowlist, tested; the deploy role
  unchanged; S1 classification unchanged.
- The rebuild itself grows prose. Mitigation: the 300-line bound and
  the word-count acceptance at M6.
- The owner's time is still the limit. Mitigation: each milestone asks
  one approval and the decisions above are the only decisions.

## Progress record

One line per milestone when it ends: date, pull requests, the
orientation test result.

- M0: done 2026-11-09. Deviations recorded, documents frozen, the
  Binding blocks fixed, the skill suspended (pull requests 30 of this
  repository and 28 of the service). The owner deleted the six merged
  branches, turned on branch protection and auto-merge, accepted the
  decisions and ratified the sequence.
- M1: done 2026-11-09, pending the owner's review of
  `orchestration/import-record.md` and the proposals in
  `orchestration/import-overrides.json` (pull requests 31 of this
  repository and 29 of the service). The rendered register carries the
  same 59 nodes and stages as the frozen one. Orientation test: passed.
  A fresh session read the README, `docs/plan.md` and this plan, three
  files, and stated what is done, what is next and what waits on the
  owner correctly. It noted two misleading rows for milestone 6: P1-N006
  shows as ready while its note says superseded, and P3-N020 shows as
  ready while the sequence stop withholds it. The owner accepted the
  import on 2026-11-09: titles and outcomes correct, the 22 open
  decisions of P2-N017, P2-N022 and P3-N008 closed as superseded by
  the rebuild. From here the state file is edited directly, or by the
  service's tools from milestone 3; `orchestration/import-overrides.json`
  is the record of the import's hand corrections and is not reapplied.
- M2: built 2026-11-09, pending the owner's one-minute test in the
  deployed view (service pull request 30). Every page reads
  `orchestration/state.json` at one commit; the Markdown parsers left
  the view; desktop layout; screenshots at 1440 wide in the pull
  request. Acceptance recorded when the owner has answered the four
  questions in the view. The deploys of milestones 1 and 2 failed in
  `sam build`, because the `prepare` script of milestone 1 ran `tsc`
  in SAM's production-only install; the service's pull request 31
  fixed it, and `live` stayed on the pre-rebuild version meanwhile.
  Deploy run 21 of 2026-11-10 built, smoke-tested and promoted the
  milestone 2 service to `live`. The owner's first look gave
  decision 11; the service's pull request 32 carries it, and this
  repository's state file gains the `start` field. The item-by-item
  review of stale rows follows the acceptance. Accepted 2026-11-10:
  the owner sees what waits on them and the status of each line in the
  view. The first review pass gave decisions 12 and 13, 53 titles
  rewritten as succinct noun phrases, P1-N006 and P1-N007 removed,
  P2-N023 closed as done, and siblings ordered by dependency. The
  rebuild itself is in the state file since 2026-11-10: P4-N001 with
  its milestones P4-N002 to P4-N008 as nodes, the pull requests so far
  as their tasks, and decisions 1 to 10 on the root. Milestone 3's
  node starts on approval, so it shows as waiting on the owner.
- M3: built 2026-11-10, service pull request 34, pending the owner's
  merge, the deploy run, and the acceptance call: the owner moves
  P4-N005 to executing with one `node_update` call from an enlisted
  session, which is also that node's approval. The deploy deletes the
  two DynamoDB tables; the deploy role keeps its table permissions
  for that one run. Task T118 records the pull request.
- M4: built 2026-11-10, service pull request 35, pending the owner's
  merge, the deploy run, and the acceptance: closing decision D061 in
  the view, which this repository's pull request opens on P4-N006 for
  that purpose. Task T119 records the pull request. The test session's
  `node_update` of 2026-11-10 accepted milestone 3: P4-N005 is done.
- M5: built 2026-11-11, service pull request 36, pending the owner's
  merge and the deploy run; task T120 records the pull request. The
  owner closed D061 in the view on 2026-11-11, accepting milestone 4:
  P4-N006 is done. What remains of milestone 5 is the week of real
  work through the loop and its acceptance. Driven over this
  repository's state file locally, the loop's first candidate is
  P3-N020, `specified` with its dependency done; decision 1 (D005 in
  the state file; earlier reports called it decision 5 in error)
  pauses the P3 line but the node does not say so, which the owner
  settles before the week starts. The owner parked it on 2026-11-11.
  First real use, 2026-11-11: a session asked to work on P2-N017
  used `node_update` and the decision tools and opened no task. The
  review that followed found seven defects, and the owner approved
  their fixes and decided 14 to 16 the same day; service pull request
  37 carries them (see "Pull requests and done", "`node_remove`" and
  "What a session is told" above). This repository's checks failed
  on `main` from 04:05 UTC that day, because the workflow still ran
  the plugin's form checker, which does not know `parked` and wants a
  `dispatched` journal event for every executing node; the owner had
  the step removed the same day, and `plan-state check` is the one
  validity rule. T120 was closed through the service, and P4-N007 and
  P4-N008 start on approval, so the loop does not offer the rebuild's
  own milestones. From here this session changes the state through
  the service's tools, never by editing the file in a pull request.
- M6: not started.
