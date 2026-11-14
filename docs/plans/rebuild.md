# Rebuild: the orchestrator runs on a checked data model

Status: active (the owner accepted the decisions and ratified the
milestones on 2026-11-09)

<!-- K-007 contract: Status transitions draft → active → closed →
     Backlog entry. While active, the checklists below are this
     project's progress record (deviation from K-003, recorded in
     docs/classification.md at milestone 0). -->

Reader: the owner, and any session doing the rebuild. The reader
knows this repository's README and the
[review of 2026-11-09](../archive/reviews/2026-11-09-review-of-the-approach.md).
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

## Milestones

Milestones 0 to 5 are done. Their checklists, and the working rules
of the rebuild, are in the
[record of the finished parts](../archive/plans/rebuild-record.md).

### M6. Re-plan, prune and hand back

Goal: the repository reads as a project again, its remaining work is
planned for the task loop, and the methodology follow-ups are
proposed once.

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

**1. Re-plan of the remaining nodes** (P4-N022) and **2. Role agents
on the task loop** (P4-N023) are done, 2026-11-13. Their criteria and
what each write did are in the
[record of the finished parts](../archive/plans/rebuild-record.md).

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
- [ ] `docs/cost-log.md`, `docs/rulings.md`, the frozen text of
      `docs/backlog.md`, the P3 findings and the superseded plans and
      specs move to `docs/archive/`; frozen files are not rewritten.
      Done for all but the 34 plans and specs the state file links:
      see "Blocked" below. Moved files gained a status line and had
      their relative links re-pointed; nothing else in them changed.
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
- [ ] The `mtool` link check passes over the tree. Not run: `mtool`
      is not installed in the session's environment. A link check
      written for this task found no link broken by the moves. It
      reports 41 relative links that were already unresolved before
      the task, 10 of them outside `docs/archive/`.
- [ ] The word count under `docs/`, excluding `docs/archive/`, is
      below 100,000 (409,060 on 2026-11-12); the number and the method
      are recorded whichever way it falls (RU-019). The method is
      `find docs -name '*.md' -not -path 'docs/archive/*' | xargs cat | wc -w`.
      Recorded 2026-11-14: 157990, down from 410,513 at the task's
      start. Not below 100,000: the 34 linked plans and specs hold
      about 143,000 of them.
- [ ] No hand-written document outside `docs/archive/` exceeds 300
      lines. This plan, the Risk register and the vocabulary now fit.
      28 linked plans and specs do not: see "Blocked" below.
- [x] The `journal-tail` skill is archived in `docs/archive/skills/`
      with a status line and is out of `plugin/README.md`;
      `plugin/scripts/journal_tail.ts` stays (the owner, 2026-11-14).

Executed in part 2026-11-14 (task T137 on P4-N024). Blocked: the
state file links 34 plans and specs under `docs/plans/` and
`docs/specs/`, and no tool changes a node's `docs` paths
(`node_update` has no such field). They cannot move until the service
can re-point them. A pull request also cannot move a linked file while
`main` still names its old path, so the re-pointing and the move need
an order the service supports.

**4. README and generated Backlog** (P4-N025)
Outcome: the README tells a new reader what this is, where the view
is, how a session enlists and how to run the checks, and the Backlog
is a rendering of the state file. Depends on: 3.

- [ ] The README is at most 150 lines: what this is, the view link,
      enlistment, the checks, the pointers.
- [ ] The README no longer calls the process specification
      authoritative over the code.
- [ ] `CLAUDE.md` Build / run / test and Architecture sections match
      the README and the new layout.
- [ ] The Backlog is generated by a `plan-state render` target in the
      service repository, and `npm run check` fails when it is stale.
- [ ] The service repository change is its own pull request
      (majodali/project-orchestrator-service, standing under RU-016).
- [ ] The generated Backlog is a fifth file the service owns: it is on
      the allowlist in the service's `src/model/store.ts` and written
      with every state commit.
- [ ] This repository's check "Service-owned files untouched" covers
      the Backlog.
- [ ] The service change is deployed before this repository pins it,
      so `main` is never checked by a renderer older than the one that
      wrote it.
- [ ] The K-003 deviation stays recorded in `docs/classification.md`;
      its end is recorded only when the methodology releases the
      amendment.
- [ ] The orientation test passes: a fresh session given only the
      README states what is done, what is next and what waits on the
      owner within five minutes, and the owner confirms it from the
      view within one minute.

**5. Upstream proposals batch** (P4-N026)
Outcome: three proposals, each with evidence from this rebuild, are
ready for the owner to carry to majodali/methodology in one batch.
Depends on: nothing.

- [ ] Proposal one: release of the K-003 amendment, from
      `docs/archive/proposals/planning-execution-model-is-progress-truth.md`,
      re-verified against the current upstream text (RU-015).
- [ ] Proposal two: registers as data files with renderings, with the
      state file, `plan-state` and the M1 import as evidence.
- [ ] Proposal three: bounded specification depth, with the criteria
      list of at most 20 items and the 300-line bound as evidence.
- [ ] Each proposal carries the final normative text, the upstream
      text quoted verbatim and a provenance line naming version,
      commit and date (RU-015), and its IR first (RU-022).
- [ ] One cover note lists the three and the order to carry them.
- [ ] No proposal asks for anything this rebuild did not need.
- [ ] The loop has no gate at `verifying`. Before closing its task,
      the implementer sets a gated hold on the node with
      `node_update`, reason "the owner reviews the proposals
      (RU-005)"; the owner accepts in the view.
- [ ] Nothing is edited in majodali/methodology.

**6. Pilot enlistment of methodology-tools** (P4-N027)
Outcome: methodology-tools is enlisted in the service and its state
file is imported from its Backlog, checked by `plan-state`.
Depends on: 1, 3.

The pilot runs on a second instance of the service (D067). One
instance must later serve several projects and repositories (the
owner, 2026-11-12; P2-N026), so the pilot adds no code path of its
own. Criteria written on 2026-11-12, after D067 was answered.

The second instance:

- [ ] It is a second stack from the same `template.yaml` at the same
      commit. It differs only in parameters: the stack name and
      `ProjectName` (majodali/methodology-tools). No code branches on
      the project.
- [ ] It shares the first instance's two secrets, the MCP bearer
      token and the view token (the owner, 2026-11-13). No secret is
      created. The token therefore opens both instances; the endpoint
      in `.mcp.json` is what ties a session to one repository.
- [ ] The same GitHub App serves it: the owner adds methodology-tools
      to the App's installation. The App's permissions and the path
      allowlist in the service's `src/model/store.ts` are unchanged.
- [ ] The service's deploy workflow deploys, smoke-tests and promotes
      both instances from every merge, and fails when either fails,
      so the two never run different commits.
- [ ] The deploy role reaches the second stack: the owner widens its
      policy, and the service's `docs/deploy-role-permissions.md`
      records the change. Nothing else in the role changes.
- [ ] The service's `docs/runbook.md` lists the steps and the owner's
      actions for adding an instance. The implementer names those
      actions to the owner before the first deploy.

The enlistment and the import:

- [ ] The enlistment steps in child 3's page are followed as written;
      steps that needed correction are corrected in that page.
- [ ] The state file first arrives in methodology-tools by one pull
      request, written by `plan-state import`. From then on the
      service is its only writer.
- [ ] `orchestration/state.json` in methodology-tools passes
      `plan-state check`.
- [ ] Every Backlog row of methodology-tools is a node, or is listed
      in an import record as not mapped, with the reason.
- [ ] The owner reviews the import record; hand corrections go in an
      overrides file, as at M1.
- [ ] `.mcp.json` in methodology-tools names the second instance's
      endpoint and the same environment variable for the token as
      this repository's. No token is committed.
- [ ] `task_next` through the second instance answers a node of
      methodology-tools, and one write through it commits to
      methodology-tools as the App, with its journal line.
- [ ] Repository access: majodali/methodology-tools is new to this
      project, so the owner grants it before the node starts (D065).
      Also majodali/project-orchestrator-service (standing, RU-016),
      for the deploy workflow and the runbook.
- [ ] Adoption of the loop by that project's own sessions, with the
      session start hook and the task-cost hook, is a separate node
      (RU-017), not part of this one.

Acceptance of the milestone: the orientation test passes for both
repositories; the word count under `docs/` is below 100,000 excluding
`docs/archive/`; no node outside the P3 line holds on this milestone.

Estimate: five to seven sessions, not the two first guessed, because
the document set and the role agents are the bulk.

## Where the rest of this plan went

Moved on 2026-11-14 (P4-N024, Pruned document set), unchanged:

- **The loop and the close-out**: [the task loop](../process/task-loop.md).
- **The data model** and **the invariants**:
  [the state model](../process/state-model.md).
- **Decisions** 1 to 13, **GitHub interaction changes**, **What
  happens to existing documents**, **Risks** and the **Progress
  record**: the
  [record of the finished parts](../archive/plans/rebuild-record.md).
  The decisions are also D005 to D014 and their successors in the
  state file, which every task receives at `task_open`.
