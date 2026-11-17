> **Status: archived 2026-11-14** (P4-N024, Pruned document set).
> Archived because these are the finished parts of the rebuild plan:
> its working rules, milestones 0 to 5, the first two children of
> milestone 6, its decisions, its risks and its progress record. The
> live plan, `docs/plans/rebuild.md`, keeps what is still open.
> `docs/process/how-we-work.md` replaced the working rules.

# Rebuild plan: the finished parts

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

### M6. Re-plan, prune and hand back: planning notes

Planned 2026-11-12 (task T123 on P4-N008). The six original bullets
are reconciled below. The P3 line is held at P3-N001, so "park its
open nodes under one node" has no work left: the hold is the park,
and the line resumes by an owner decision, not by this milestone.
P2-N017 and the P2-N005 subtree are already gone from the state file.
P2-N006 is held for this milestone and becomes the pilot's node. The
form checker left CI on 2026-11-11, so no child keeps it green;
`plan-state check` is the one validity rule. Sessions work through
the task loop, so no child names an orchestrator session or a
dispatch. `.claude/agents/` and `docs/process/` still describe the
old loop and are the largest remaining work.

Specified 2026-11-12 (task T129 on P4-N008). The criteria lists
below are the specification: each is at the bound the plan sets, so
no child needs a further document, and the break down task enters
the children with these lists as their criteria (RU-020).

- **Order.** Children 1, 2 and 5 depend on nothing and are
  independent of one another (RU-018). Child 3 waits for 1 and 2,
  child 4 for 3, child 6 for 1 and 3.
- **Verification.** Each child is verified by its check node against
  its criteria list and outcome. A criterion that measures (the word
  count, the orientation test, the throwaway plan step) is met by the
  number, the method and the conclusion being recorded, whichever way
  it falls (RU-019).
- **Repository access (RU-016).** Children 1 to 3 write only to this
  repository. Child 4 also writes to
  majodali/project-orchestrator-service (standing). Child 6 writes to
  majodali/methodology-tools, granted for that child only (D065).
  Child 5 writes nothing outside this repository (RU-002).
- **Gates.** Child 5 gates at `verifying` (RU-005). Child 6 starts on
  approval, because it changes another repository.
- **Decided already.** D063 (the P3 hold stays), D064 (P2-N004 is
  removed), D065 (the grant), D066 (the Backlog is generated).

Broken down 2026-11-12 (task T130 on P4-N008). The six children are
entered `specified`, not `identified`, in the order listed, with
these lists as their criteria (RU-020). Each carries a criteria list
of at most 20 items, not a specification document (see "What happens
to existing documents"). Every child's pull request keeps
`npm run check` green.

### M6. Re-plan, prune and hand back: children 1 and 2

**1. Re-plan of the remaining nodes** (P4-N022)
Outcome: every node still open outside the rebuild is either planned
for the task loop or removed, and none carries a hold that names this
milestone. Depends on: nothing.

- [x] P2-N006 is re-planned as the pilot's parent or removed in favour
      of child 6; its hold text no longer names M6. Re-planned as
      "Pilot on methodology-tools: sessions on the task loop": the
      adoption that child 6 leaves to a separate node (RU-017). It
      waits for P4-N027 and starts on approval, because it needs a
      new grant for majodali/methodology-tools. Its hold is lifted.
      It is not P4-N027's parent: `node_update` does not move a node.
- [x] P2-N004 is removed with `node_remove`, or re-planned with an
      outcome the claim by `task_open` does not already deliver.
      Removed (D064).
- [x] P3-N001 stays held; its hold reason names the owner decision
      that resumes it, not M6. Its children are not touched. The
      reason names D005 and D063 and says the owner lifts the hold in
      the view.
- [x] P3-N020 (parked) and P3-N008 (gated) carry a note saying the
      hold on P3-N001 covers them.
- [x] P1-N001 and P2-N001 show only work that is still wanted; a root
      with nothing open is closed through the loop. Every child of
      P1-N001 is done, so it entered `verifying` with the check node
      P1-N017; a reviewer's `verify` step closes it. P2-N001 keeps
      P2-N006, P2-N025 and P2-N026, all still wanted.
- [x] No node outside P4-N001 has `outcome: null` while it offers a
      step. The four that have none (P3-N004, P3-N009, P3-N012,
      P3-N016) stand under the hold on P3-N001 and offer no step.
- [x] `plan-state check` passes.

Executed 2026-11-13 (task T131 on P4-N022), by six writes through the
service.

**2. Role agents on the task loop** (P4-N023)
Outcome: the planner, implementer and reviewer agents describe the
work as the task loop runs it, and the orchestrator, auditor and
semantic-auditor roles and the `orchestrate` skill are archived.
Depends on: nothing.

- [x] Each remaining role agent opens with `task_open`, closes with
      `task_close`, and passes `session` on every call.
- [x] No role agent cites `docs/process/dispatch.md`, the Plan
      register, sequence mode, enumerated context packets, Backlog
      entries or the Cost log as a duty. The agents name
      `docs/plan-register.md` only as a file the service owns.
- [x] Each role agent is at most 120 lines: planner 110, implementer
      94, reviewer 90.
- [x] The planner agent states the plan step's deliverable: a revised
      plan document, a criteria list of at most 20 items, and `asks`
      with defaults.
- [x] The reviewer agent verifies against the node's criteria and
      outcome, as the check node's `verify` step runs.
- [x] `plugin/agents/` is regenerated with
      `node plugin/scripts/sync_agents.ts`; its `--check` passes.
- [x] The `orchestrate` skill is removed from `plugin/skills/` and
      `plugin/README.md` and archived with a status line; `enroll`
      is rewritten against child 3's page or removed. Both are in
      `docs/archive/skills/`. `enroll` is removed, because child 3's
      page does not exist yet; that page carries the enlistment steps.
      The three retired roles are in `docs/archive/roles/`.
- [x] The task-cost hook and the session start hook
      (`plugin/scripts/session_start.ts`) are unchanged and still run.
- [x] A fresh session using only the new agents completes one
      throwaway plan step on a scratch node without an instruction
      the agents do not carry; the result is recorded. Recorded
      below.

Executed 2026-11-13 (task T134 on P4-N023). The agents now list the
service's tools in `tools`, because an agent with a tool list reaches
no other tool. The `journal-tail` skill is not in the criteria and
stays as it was.

The trial, 2026-11-13. Method: a scratch node, P4-N029, was added
under P4-N008 at `identified`, with a note giving a subject to plan
and saying that the plan needs no file. A fresh agent with no other
context was given two sentences: read `.claude/agents/planner.md` as
its whole instruction, and take the plan step on P4-N029. Result: it
claimed the node with `task_open` (task T135), delivered a title, an
outcome and six criteria, closed with `task_close` without a pull
request, passed `session` on each write, and reported in four parts.
The node moved to `planned`. P4-N029 was then removed. Conclusion:
the step completed without an added instruction. Limits: the agent
was a subagent of the implementer's session, not a separate session,
so it also saw this repository's `CLAUDE.md` and the service's own
instructions, as any session here does. The trial did not exercise
the plan document or a pull request: the note excluded them, to keep
scratch text off `main`. The agent named seven points it had to
settle itself. Three were closed in the agents afterwards: a note
that says no file wins over the document deliverable, a fitting title
is kept, and an agent started by another agent uses that session's
identifier. Four stand: which optional fields `task_open` takes,
whether a plan step fixes file paths, how far the planner frames the
subject, and who "the person" is for a subagent.

### M6. Re-plan, prune and hand back: child 3

**3. Pruned document set** (P4-N024)
Outcome: `docs/` holds what the service and `plan-state` enforce, one
"how we work" page, and the records still linked from the state file;
everything else is in `docs/archive/` with a status line each.
Depends on: 1, 2.

- [x] `docs/process/` keeps only what code enforces plus one "how we
      work" page of at most 200 lines. It holds `how-we-work.md` (171
      lines), `task-loop.md` and `state-model.md` (moved from this
      plan), and a short `plan-register.md` that the renderer links.
- [x] The page covers the task loop, the roles, a session's
      enlistment, the checks and the owner's decisions.
- [x] Every archived file opens with a status line naming why it is
      archived and what replaced it.
- [x] `docs/cost-log.md`, `docs/rulings.md`, the frozen text of
      `docs/backlog.md`, the P3 findings and the plans and specs the
      state file does not link move to `docs/archive/`; frozen files
      are not rewritten. Moved files gained a status line and had
      their relative links re-pointed; nothing else in them changed.
      The linked plans and specs are child 8's (the owner,
      2026-11-15).
- [x] Every `docs` path in `orchestration/state.json` resolves after
      the move, updated through `node_update`, never by hand. No
      linked document moved, so no path changed.
- [x] `docs/classification.md` custom definitions point at the new
      locations or are retired with the document that carried them.
- [x] `docs/vocabulary.md` loses the terms of retired documents and
      keeps the project's own. 34 rows moved to
      `docs/archive/vocabulary-retired.md`; six task-loop terms added.
- [x] `docs/open-risks.md` is kept or archived by a stated rule. Kept;
      the rule is in its header. Nine closed or dispatch-loop entries
      moved to `docs/archive/open-risks-retired.md`.
- [x] The moves add no `mtool` link finding. Run 2026-11-15,
      `mtool links check` at methodology-tools 296ba46: 21 findings,
      the same 21 as on the task's base commit, b9e2999. Clearing
      them is child 8's (the owner, 2026-11-15).
- [x] The word count under `docs/`, excluding `docs/archive/`, is
      recorded with its method (RU-019):
      `find docs -name '*.md' -not -path 'docs/archive/*' | xargs cat | wc -w`
      gave 158,359 on 2026-11-16, down from 410,513 at the task's
      start. The 100,000 target is child 8's.
- [x] This plan, the Risk register and the vocabulary are at most 300
      lines each. The bound for every document is child 8's.
- [x] The `journal-tail` skill is archived in `docs/archive/skills/`
      with a status line and is out of `plugin/README.md`;
      `plugin/scripts/journal_tail.ts` stays (the owner, 2026-11-14).

Executed 2026-11-14 (task T137 on P4-N024). The state file links 34
plans and specs, and no tool changes a node's `docs` paths, so they
could not move. On 2026-11-15 the owner split the node: the three
criteria that depend on moving them went to child 8, behind child 7.

### M6. Re-plan, prune and hand back: child 8

**8. Linked plans and specs archived** (P4-N032). Its criteria are in
[the plan](../../plans/rebuild.md), child 8. Executed 2026-11-17 (task
T146). This is what the execution found and measured.

**The rule.** A plan or specification the state file links is
superseded when every node that links it is `done`. It stays when at
least one node that links it is not `done`: open, held or parked. Two
documents are outside the rule. `docs/plans/rebuild.md` is this task's
own node's plan. `docs/plans/orchestrator-v1.md` stays although
P1-N001 and P1-N017 are done, because `CLAUDE.md`, `README.md` and
`docs/classification.md` cite it as the founding plan and for the
standing billing constraint.

**Superseded, moved** (22 files, 15 plans and 7 specs). Each moved
from `docs/plans/` to `docs/archive/plans/`, or from `docs/specs/` to
`docs/archive/specs/`, under the same file name.

- Plans: `p1-n008-mtool-checker-extension-point`,
  `p1-n009-plugin-tooling-portfolio-stack`,
  `p1-n014-role-contracts-adopt-v140-rules`,
  `p1-n015-methodology-amendments-delegated-work`,
  `p1-n016-process-spec-maintenance`, `p2-n002-service-skeleton`,
  `p2-n003-owner-questions-and-plan-view`,
  `p2-n012-deploy-from-ci-on-merge`, `p2-n023-web-view-ux-refinement`,
  `p3-n006-thin-end-to-end-slice`,
  `p3-n007-type-declared-amendment-drafted`,
  `p3-n010-one-class-end-to-end`, `p3-n011-sweep-and-omission-list`,
  `p3-n013-stop-conditions-decidable`,
  `p3-n014-loop-runs-sequence-mode`.
- Specs: `p1-n008-mtool-checker-extension-point`,
  `p1-n009-plugin-tooling-portfolio-stack`,
  `p1-n014-role-contracts-adopt-conduct-rules`,
  `p1-n015-methodology-amendments-delegated-work`,
  `p2-n002-service-skeleton`, `p2-n003-owner-questions-and-plan-view`,
  `p2-n012-deploy-from-ci-on-merge`.

**Staying** (13 files), each with the node that keeps it.

- `docs/plans/orchestration-service.md`: P2-N001, broken down, open.
- `docs/plans/comprehension-and-continuous-implementation.md` and
  `docs/specs/p3-n001-comprehension-and-continuous-implementation.md`:
  P3-N001, held (D005, D063).
- `docs/plans/p3-n002-comprehension-model.md` and
  `docs/specs/p3-n002-comprehension-model.md`: P3-N002, broken down
  under the hold. P3-N008 also links the spec.
- `docs/plans/p3-n008-instance-over-this-repository.md`: P3-N008,
  planned and gated.
- `docs/plans/p3-n003-common-risk-catalogue.md` and
  `docs/specs/p3-n003-common-risk-catalogue.md`: P3-N003, broken down
  under the hold.
- `docs/plans/p3-n005-sequence-mode.md` and
  `docs/specs/p3-n005-sequence-mode.md`: P3-N005, broken down under
  the hold.
- `docs/plans/p3-n015-sequence-demonstration.md`: P3-N015, broken
  down under the hold, and P3-N020, parked.
- `docs/plans/orchestrator-v1.md` and `docs/plans/rebuild.md`: outside
  the rule, as above.

The done children of the P3 line (P3-N006, P3-N007, P3-N010, P3-N011,
P3-N013, P3-N014) lost their plans to the archive and keep their
parents' specifications, which stay.

**The state file.** Seventeen `node_update` calls with `docsOnMerge`
under T146, one for each node that links a moved file, cleared 25
paths (commits 9f1b919 to 26fb267 on `main`). This was the first real
use of `docsOnMerge` (P4-N031). Every call committed without a
warning. The service sets the new paths when P4-N032 is done.

**The moved files.** Each gained a status line as its first lines.
887 relative links were re-pointed by a script, in the moved files and
in every file that links them, `docs/vocabulary.md` rows and anchors
included. Nothing else changed in a moved file. Left as they are, by
rule: paths inside code fences, test data under `test/` and
`fixtures/`, and `orchestration/import-record.md`, which records the
paths the M1 import read on its day. The node example in
`docs/process/state-model.md` names the new path.

**The link check.** `mtool links check` at methodology-tools 296ba46
reported 21 findings before the move, the same 21 as on 2026-11-15.
After it, 13 are fixed and 8 are dispositioned. The tool still exits
non-zero on the 8: it has no way to exempt a link.

- Fixed, 13. Rule: a link inside text quoted from another document is
  re-pointed so that it resolves from the quoting file to the
  document the quote means. Seven in the plan of P1-N016, two in the
  plan of P3-N015, and one each in the plans of P2-N005, P3-N007 and
  P3-N008. The thirteenth, in `docs/archive/backlog.md`, named a file
  that never existed; it now points at the plan of P3-N005.
- Dispositioned, 8. Rule: a link inside normative text that a
  proposal writes for majodali/methodology resolves in that
  repository, not in this one, and the text is delivered verbatim
  (RU-015), so it is not changed here. They are in
  `docs/archive/proposals/`:
  `active-documents-are-corrected-not-marked.md` (2),
  `contradiction-marking-in-nested-sessions.md` (2),
  `report-rule-scoped-by-audience.md` (2) and
  `planning-execution-model-is-progress-truth.md` with its `.ir.md`
  (1 each).

**The word count.** Child 3's method,
`find docs -name '*.md' -not -path 'docs/archive/*' | xargs cat | wc -w`,
gave 76401 on 2026-11-17, down from 161,840 at the task's start. It
is below 100,000.

**The 300-line bound.** Method:
`git ls-files '*.md' | grep -v '^docs/archive/' | xargs wc -l`.
Twelve files exceed 300 lines. Ten are hand-written, and all ten are
documents of the held P3 line that stay by the rule above. They
predate the bound and are not rewritten while the line is held;
bringing them under it is work for the line when the owner resumes it.

| Lines | Document |
|---|---|
| 998 | `docs/specs/p3-n002-comprehension-model.md` |
| 764 | `docs/specs/p3-n003-common-risk-catalogue.md` |
| 679 | `docs/specs/p3-n005-sequence-mode.md` |
| 674 | `docs/plans/p3-n015-sequence-demonstration.md` |
| 654 | `docs/plans/p3-n002-comprehension-model.md` |
| 652 | `docs/plans/p3-n005-sequence-mode.md` |
| 591 | `docs/specs/p3-n001-comprehension-and-continuous-implementation.md` |
| 585 | `docs/plans/p3-n008-instance-over-this-repository.md` |
| 535 | `docs/plans/comprehension-and-continuous-implementation.md` |
| 534 | `docs/plans/p3-n003-common-risk-catalogue.md` |

Two are not hand-written: `docs/plan.md` (rendered by the service) and
`plugin/scripts/lib/corpus/fixtures/live-tree/docs/backlog.md` (test
data). `docs/process/task-loop.md` is at 300 and
`docs/plans/rebuild.md` is within the bound.

### M6. Re-plan, prune and hand back: child 5

**5. Upstream proposals batch** (P4-N026). Its criteria are in
`docs/plans/rebuild.md`. Executed 2026-11-17 (task T149). The batch is
in `docs/proposals/`, with a cover note, `README.md`. What each tick
rests on:

- **Proposal one.** `k-003-amendment-release.md` with its IR. The
  re-verification found that the K-003 amendment was merged upstream on
  2026-10-31 (methodology pull request 73) and that the Release
  register records it accepted on 2026-11-02. It stands on
  `main`, unreleased. So the proposal asks for the release, v1.7.0,
  and records the six places where the accepted text differs from the
  proposal of 2026-10-30. It asks for no change to a rule.
- **Proposal two.** `registers-as-data-files.md` with its IR: one new
  rule, suggested identifier K-012, one sentence in the vocabulary row
  Register, and the words "or custom artifact types" in the row
  planning/execution model. Evidence: the state file, `plan-state
  check` with its invariants, the import of 2026-11-09 and its record.
- **Proposal three.** `bounded-specification-depth.md` with its IR:
  one new rule, suggested identifier K-013, and one vocabulary row,
  criteria list. Evidence: the nine criteria lists of milestone 6 (4
  to 15 criteria), their verifications, and the 300-line bound with
  the ten documents that exceed it.
- **Form.** Each proposal quotes the upstream text in fenced blocks,
  filled by a script from a read-only clone, never typed. One
  provenance line covers the prose and the IR: majodali/methodology
  `main` at 4c7b1dd (committed 2026-11-02), read 2026-11-17; v1.6.0 is
  3e34829. Each IR was written first and has Status `draft`.
- **Nothing beyond the rebuild's needs.** Proposal one asks for the
  release only. Proposal two's rule states the duties the rebuild
  already meets. Proposal three exempts registers, because the
  rebuild's evidence about registers is proposal two's. Each of two
  and three says that the rebuild changed several things at once and
  does not isolate one effect.
- **The request to methodology-tools** (D073).
  `mtool-links-quoted-text.md`: four criteria for a mark that exempts
  quoted text, and the alternative that a fenced block is already
  skipped. It carries no IR: RU-022 covers the methodology corpus.
- **The hold.** Set with `node_update` under T149 before the close.
- **Nothing edited upstream.** Both clones were read-only and had no
  local change at the end.

**The checks**, at methodology-tools 296ba46 and the corpus at
4c7b1dd:

- `mtool links check`: 8 findings, the same 8 as on `main`. The new
  files add none, because their quotes are in fenced blocks, which the
  check skips.
- `mtool ir check` over the three IRs: 0 violations, 0 warnings, 1
  unratified term (criteria list).
- `mtool style` over the five prose files: 0 violations. Warnings:
  49, 36 and 34 on the three proposals, 22 on the cover note and 12
  on the request, after the rework. Most are P-008 link hints on common words; the
  proposal of 2026-10-30 has 26.
- No stranger rounds ran. The impact assessments of two and three
  read methodology, methodology-tools and this repository only.
- The word count under `docs/`, outside `docs/archive/`, by child 3's
  method: 89,361 after the rework, up from 76,660 at the branch's base.
  The batch adds about 12,700 words. Each new file is within 300 lines; the longest
  is 297. `docs/plans/rebuild.md` stays at 300.

**The rework** (task T152, 2026-11-17), after the verification of
task T151 failed. Each fix was made in the IR first, then in the
prose:

- The rendered Backlog at b1c8b9f holds 79 rows in 95 lines, not 95
  rows: one row per node that is not a check node (95 nodes, 16 check
  nodes). Corrected in proposal two and its IR, and in proposal one
  and its IR.
- Proposal one's IR now names the words proposal two asks for as its
  prose does: "or custom artifact types".
- The rule of proposal two no longer makes the declaration name the
  check. This project's Classification names the schema and not the
  check, so that duty was more than the rebuild needed. The duty that
  a check fails on a stale rendering stays.
- Methodology pull request 73 was merged on 2026-10-31 (commit
  be5f993). The Release register records the acceptance on
  2026-11-02. Proposal one now states both.
- Two more errors the re-check found. A verify task does not always
  carry a pull request, so proposal one says "with a summary". The
  fifth difference of K-003 from the proposal of 2026-10-30 now names
  the five linked terms and the link that left the statement.
- Every other figure and quote was checked again against the commit
  it names. Inline quotes that leave out link markup now say so.

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
17. A task's cost is tokens by type and the model, measured by a hook
    or a headless run and recorded with `task_cost`; a session does
    not estimate it. Owner, 2026-11-11.
18. The plugin's form checker is not a CI check; `plan-state check`
    is the one validity rule. Owner, 2026-11-11.
19. A session's write to a node or a decision needs an open task, or
    the owner's dictated words; a pull request may not change the
    files the service owns. Owner, 2026-11-12.

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
- M6: planned 2026-11-12 (task T123 on P4-N008): six children. Specified the same day (task T129): order, verification, repository access and gates; break down next.
