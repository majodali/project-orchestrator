# View that updates itself and leads with what matters (P2-N028)

Status: planned (T158, 2026-11-17). Not yet specified or broken down.

Reader: the owner, and the sessions that work this node. The reader
knows [how we work](../process/how-we-work.md), and nothing else.

## Outcome

The view shows a plan change within a minute without a reload, and
opens with what needs the owner, what is ready, what is running and
what just finished; node and task pages show criteria, duration and
the session.

## Why

The owner, 2026-11-16: the view is the best way to know that
something waits on the owner, so it must update by itself and show
more useful information. In the three days before this plan the owner needed to learn that
decisions were open, to lift a review hold, to approve a start, and
to see which sessions ran. Each time a session said so in
conversation, because the view does not announce a change.

## What the view is today

Read on 2026-11-17 from majodali/project-orchestrator-service at
commit 6f2b9f7, directory `src/view/`.

- Three pages, rendered on the server from `orchestration/state.json`
  at one commit: the tree (`/view`), a node, a task.
- No script. The response policy says `script-src 'none'`, and
  `test/viewPages.test.ts` asserts that no page holds a script
  element. The rule comes from the archived specification of P2-N003
  (Owner questions and plan view), "No script".
- The tree page opens with a header of five lines about the commit,
  then a line of counts, then the tree. An open decision shows under
  its node with a link to the node page, where its form is.
- A write answers with a redirect and the line "reload until it shows
  the new commit".
- A task record holds no session: it is only in the journal, which
  is 475 KB and grows. No page shows a duration or a criterion.
- A failed check node already offers no "Lift the hold"
  (`nodeActions`, after the mistaken lift of 2026-11-16).

## Design

### 1. The first screen: four lists, then the tree

`/view` opens with four sections in this order. The tree stays below
them, unchanged in what it shows. The commit header shrinks to one
line that still carries the full SHA, which the smoke test reads.

1. **Needs you.** One row for each thing only the owner can do:
   - an open decision, with its question, its default and its form
     in the row, so several are answered from the one page;
   - a node under a review hold, with its pull request linked, the
     state of that pull request's checks, and the actions;
   - a ready node whose start needs approval;
   - any other hold the owner can lift.

   Rows come in that order. Each names its node by title and
   identifier.
2. **Ready.** Nodes that offer a step and wait on nothing, with the
   step. These start without the owner.
3. **Running.** One row for each open task: node, step, role, the
   session, the time since it opened, and its pull request. A rework
   after a failed verification is marked as a rework that needs
   nothing from the owner.
4. **Just finished.** Tasks closed in the last 24 hours, newest
   first, at most ten: node, step, status, duration, summary.

An empty section says so in one line. A node held only by a failed
verification is never in "Needs you": its rework is in "Ready" or
"Running".

### 2. Every action says what it does

Each action button has one sentence beside it that says what the
click changes: which node moves, to which stage, and what starts or
stops as a result. For "Lift the hold" the sentence names the step
the node will offer next. For "Accept the review" it says the node
becomes done and its pull request is merged.

### 3. The view updates itself

One first-party script, served by the service from `/view/app.js`.
The policy allows scripts from the view's own origin only, and
requests to its own origin only. No inline script, no third-party
code, no browser storage beyond the view cookie.

- A new route, `GET /view/version`, answers the commit SHA of the
  default branch. It needs the view cookie. The service remembers the
  answer for 10 seconds, so several tabs cost one read of GitHub.
- The script asks for the version every 20 seconds while the tab is
  visible, and once when the tab becomes visible again.
- When the SHA differs from the page's, the script fetches the page
  again and replaces its content in place. Scroll position and the
  folded state of the tree are kept.
- When a form on the page holds text the owner typed, the script does
  not replace it. It shows one line, "The plan changed", with an
  "Update" button.
- The page title starts with the count of rows in "Needs you", as
  "(3) Plan", so the browser tab shows it. A row that arrived since
  the page was opened is marked "new" until the owner clicks it.
- A page read at a named `ref` does not update: it shows that commit.
- Without the script every page works as it does today.

### 4. Feedback after a click

With the script, a form is sent in the background. The button is
disabled and reads "Committing…" until the answer arrives. Then the
page content is replaced with the state at the new commit, and one
line names that commit. A refusal shows its reason beside the form,
and the typed text is kept. The line "reload until it shows the new
commit" goes away.

### 5. The node page as a panel beside the tree

At a window width of 1000 pixels or more, clicking a node in the tree
or in one of the four lists opens its node page in a panel beside the
tree. The address becomes the node's own address, so Back closes the
panel and a reload opens the node page. Task pages open in the same
panel. Below that width, and without the script, a click loads the
page as it does today.

### 6. Criteria, duration and the session

- **Session.** The task record gains an optional field, `session`:
  the `session` value of the `task_open` call. The view shows it on
  the "Running" row, the node page's task table and the task page. An
  identifier that begins `session_` is linked to
  `https://claude.ai/code/<identifier>`. A task opened before the
  field exists shows "not recorded".
- **Duration.** A closed task shows the time from opened to closed.
  An open task shows the time since it opened.
- **Criteria.** The node page shows the section headed "Criteria" of
  the node's specification, or of its plan when it has no
  specification, read at the page's commit. When the document has no
  such section the page says so and links the document. The view
  does not judge a criterion met or unmet.

### 7. What the comprehension model adds: nothing yet

The node's note asks what the view shows of the comprehension model
(docs/specs/p3-n002-comprehension-model.md). This plan's answer is
nothing, for now. The model's only instance, the Project model, is
archived and has not been written to since 2026-11-09, and its line
is held (D005, D063). A page that showed it would show stale parts.

The view shows what the state file already holds toward the same
question: what a node waits on, what needs it, and the other nodes
that link the same plan or specification. The last is new, and it is
the shared-document rule the orchestrator session applies
(docs/specs/orchestrator-session.md, S4).

When the P3 line resumes, showing a node's parts is a new node.

### 8. The view and the orchestrator session

P2-N027 (Orchestrator session that keeps work moving) reports to the
owner on four stop conditions (docs/plans/orchestrator-session.md,
section 8). The split, so the owner is not told the same thing twice:

| Stop condition | The view shows | The orchestrator's report carries |
|---|---|---|
| 1. A failed check | Each failed verification on the node page; the rework under "Running" or "Ready" | That the rework limit was reached, or that a session ended with its task open |
| 2. A scope change | The gated node under "Needs you", with the reason | That the weekly budget was passed |
| 3. A decision that is the owner's | The decision, hold or approval under "Needs you", with its form | One line: the node, the condition, a link to the view |
| 4. A close that carries asks | Each ask as a decision under "Needs you" | One line, as for 3 |

The rule: the view holds every question and every action. The
report is the notice and never repeats a question's text or options.
It alone carries a session that ended, a refused model, the budget.

The view does not notify outside its tab: the report arrives in a
conversation, which already notifies the owner (ask 2). The view
shows how long a task has been open and does not judge it stalled.

## Where the work happens

The work writes to majodali/project-orchestrator-service, in scope
by RU-016 (who decides which repositories a node's work may write
to). Each child that writes there is entered `start: approve`.

- Sessions are started in that repository. P2-N032 (Service
  repository enlisted for delegated sessions) makes that possible, so
  every child here waits for P2-N032.
- A merge there deploys, and the owner merges there by hand. A
  child's pull request is therefore reviewed by the owner after its
  verification, and the node's result is live when it is merged.
- Each pull request carries before and after screenshots from the
  service's preview (`npm run view:shots`).
- One child writes here: it raises this repository's pinned service
  version and adds the `session` line to docs/process/state-model.md.
  It waits for slice C.

## Slices

For the break down step. A is the thin slice that runs end to end.

- **A. The tree page updates itself.** Section 3. Criteria 1 to 6.
- **B. The four lists and the action sentences.** Sections 1 and 2.
  Criteria 7 to 11. Needs nothing from A.
- **C. Session, duration and criteria.** Sections 6 and 7. Criteria
  12 to 15. Needs nothing from A or B.
- **D. Feedback in place and the panel.** Sections 4 and 5. Criteria
  16 to 18. Waits for A, whose script it extends, and B, whose rows
  it opens.
- **E. The trial.** Criteria 19 and 20. Waits for A to D.

All link this plan, so the shared-document rule runs them one at a
time.

## Criteria

A test is in the service repository's `npm test`.

1. `GET /view/version` answers the default branch's SHA with the view
   cookie and is refused without it. A test shows two calls within
   10 seconds make one read of the repository.
2. Every `/view` response carries a policy that allows script only
   from the view's own origin and connections only to it. A test
   shows no page holds an inline script or names another origin.
3. A browser test against the preview shows: the state changes, and
   within 30 seconds the open tree page shows the change with no
   reload, the scroll position and the unfolded nodes kept.
4. A browser test shows a page with typed, unsent text in a form is
   not replaced, and shows the "The plan changed" line instead.
5. A browser test shows the title's count equals the number of rows
   in "Needs you", and a row added since load is marked new.
6. A browser test with scripts disabled shows every page renders and
   every form still commits.
7. A test shows `/view` renders the four sections in order, each
   with its empty line when it has no row.
8. A test shows "Needs you" holds exactly: the open decisions, the
   gated nodes, and the ready nodes that need approval, in the order
   of section 1; and a node held only by a failed verification is
   not there.
9. A test shows a decision's form is in its "Needs you" row and
   closes the decision from `/view`.
10. A test shows a review row links the pull request and names the
    state of its checks, or "unavailable" when they cannot be read.
11. A test shows every action button on every page has a sentence
    beside it that names the node's next stage or step.
12. A test shows `task_open` records `session` on the task, and the
    state check accepts a task with and without the field.
13. A test shows the "Running" row, the task table and the task page
    show the session, linked when it begins `session_`, and "not
    recorded" when absent.
14. A test shows the duration of a closed task and the elapsed time
    of an open one, from a fixed clock.
15. A test shows the node page carries the "Criteria" section of the
    node's specification, else of its plan, at the page's commit,
    and the fallback line when there is none.
16. A browser test shows a submitted form disables its button, then
    shows the new state and the commit; and a refused one shows the
    reason and keeps the text.
17. A browser test at 1200 pixels shows a click on a node opens the
    panel, changes the address, and Back closes it. At 800 pixels
    the click loads the node page.
18. The node page lists the other nodes that link the same plan or
    specification. A test shows it.
19. A recorded trial on the deployed view, kept in the service's
    docs/runbook.md: five plan changes, each with the commit time
    and the time the open page showed it. Met by the recorded
    times, whichever way they fall (RU-019, a measurement is met by
    its record).
20. The same record gives the number of GitHub reads one open tab
    causes in an hour, counted from the service's log. Met by the
    recorded number (RU-019).

## Asks

1. **May the view run one script of its own, and may the test that
   asserts no script be rewritten?** The rule "No script" is in the
   archived specification of P2-N003, and `test/viewPages.test.ts`
   asserts it. Options: yes, one first-party script, with the test
   rewritten to assert no inline and no third-party script; no, the
   view updates by a timed page reload instead. Default: yes.
2. **Should the view notify the owner outside its tab?** Options:
   no, the tab's title count only, and the orchestrator's report is
   the notice; yes, a browser notification the owner switches on.
   Default: no, and decide again after the trial of criterion 19.

## Risks

- **Ask 1 is answered "no".** Then sections 4 and 5 are dropped and
  a reload discards typed text. Sections 1, 2 and 6 stand.
- **Polling reaches GitHub's request limit.** The 10-second memory
  bounds it at six reads a minute for any number of tabs. Criterion
  20 records the real number.
- **A document's criteria have another heading.** The page then
  links the document. No document is rewritten for the view.

## Terms introduced

- **Needs you, Ready, Running, Just finished**: section 1's lists.
- **Version route**: `GET /view/version` (section 3).
- **Panel**: the node page shown beside the tree (section 5).
