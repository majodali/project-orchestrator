# The task loop and the close-out

Reader: a session about to take a task, and the owner checking what
the service does. This specifies the orchestration service's loop
(`src/model/loop.ts` in majodali/project-orchestrator-service). The
code enforces it; where the two differ, the code is what runs and this
page has a defect. For the short version, read
[how we work](how-we-work.md). A decision or a milestone cited by
number is the rebuild plan's, recorded in
[the rebuild record](../archive/plans/rebuild-record.md).

The loop is three tools, `task_next`, `task_open` and `task_close`,
over the state file. Every move is one commit by the service, and the
close-out actions are the service's own behaviour, never plan nodes.

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
| `verifying` | none on the node; its check node carries `verify`. When the verification failed: `execute`, the rework | implementer | the check node returns to `specified` for a new round |
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
a check node of its own.

A failed verification is closed `blocked`, with each unmet criterion
in the summary (corrected 2026-11-16). The check node is held
`blocked` with that summary as the reason, and that hold is the
loop's, not a question for the owner:

- The parent stays `verifying` and offers `execute` again, the
  rework. `task_next` and `task_open` answer `rework` for it: the
  check node, what failed, and the pull requests to continue on.
- The rework's close lifts the hold and returns the check node to
  `specified`, so `verify` is offered again.
- The close carries no `stop`. The view offers no "lift the hold" on
  a failed check node and refuses one that is posted: lifting it
  withdrew the rework (P4-N033). The owner who overrules a
  verification accepts the review on the verified node.

A verification closed `needs-judgment` is a question, not a failure:
its asks gate the check node, or with no ask it is held `gated` for
the owner, and the parent offers no rework.

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

- Every ask the call carries (`asks`: question, options, default)
  becomes an open decision, whatever the status (corrected
  2026-11-16: asks were dropped unless the task closed `closed`). An
  open decision on a node keeps every step from being offered until
  the owner answers.
- Scope changed: the node's title, outcome, parent, dependencies or
  documents differ from what they were at the task's `base`. The task
  closes as `needs-judgment` whatever status was given, the node is
  held `gated` with the reason, and the answer says so.
- `closed`: the move of the table above. Its asks gate the next step.
  A verification's asks go on the node it verified. `closed` means
  every criterion is met; a session never closes `closed` otherwise.
- `needs-judgment` or `blocked`, with asks: no hold. The decisions
  gate the node at its stage, and it offers the same step again once
  they are answered; a new task continues on the same pull request.
  This is how a task that cannot finish without the owner hands over.
- `needs-judgment`, no ask: the node is held `gated` with the summary
  as reason, and the owner lifts the hold.
- `blocked`, no ask: the node is held `blocked` the same way.
- A verification closed `blocked` has failed, with or without asks:
  the check node is held, as above.
- `stale`: the record only.

### Stop conditions as code

Each returns the session to the owner by making the next step
unavailable and saying why in the tool's answer:

- A failed check of the state file: the write is refused with the
  violations and nothing is committed.
- A changed scope: the close above.
- An open decision on the node: `task_next` passes the node by and
  `task_open` refuses it, naming the decision.
- An ask at close: the decisions opened at close.
- A hold with no ask: the owner lifts it in the view.

A failed verification is not a stop: the loop goes on to the rework.

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
- Work on a pull request needs an open task (owner, 2026-11-16, after
  three commits landed on one with none). When an `execute` task
  closes `closed`, the service records the pull request's head as the
  task's commit. Every merge refuses a pull request whose head has
  moved since its last such close. The reviewer then closes the
  verification `blocked`, and the rework's task covers the commits.
  Pull requests whose tasks closed before 2026-11-17 are not checked.
- `task_close` with `branch` in place of a pull request opens one.

The GitHub App needs `Pull requests: Read and write` and to be
installed on each repository whose pull requests the tasks carry.

### `node_remove`

An obsolete node is removed, never parked or held, and git keeps its
history (decision 12; owner, 2026-11-11). `node_remove(nodeId, reason)`
removes the node with everything below it, their tasks and their
decisions; its journal line carries what the removed tasks cost, since
they leave the state file; a node that waited for a removed one no longer does; a
`broken-down` parent whose remaining work is all done enters
`verifying`. It is refused while a task is open under the node. The
state file's `highWater` records the highest number removed under
each identifier prefix, so no identifier is minted twice (invariant
1). A hold or a park is for work that will resume.

### Cost capture

A task's cost is measured, never estimated by the session (decision
13; owner, 2026-11-11). The measure is tokens by type (input, output,
cache read, cache write) and the model, not money: sessions bill to
the subscription.

- The service's `task_cost(taskId, tokens…, model, source)` records it
  on an open or a closed task; a later record replaces an earlier one.
- In an interactive session, a hook in this repository
  (`.claude/settings.json`, `plugin/scripts/task_cost_hook.ts`) runs
  when `task_close` returns. It sums the usage in the session
  transcript from the close of the session's previous task, or from
  the session's start, subagents included, each model message once,
  and calls `task_cost` with source `transcript`. It never fails the
  session: when it cannot measure, the task has no measured cost.
- Until 2026-11-16 it counted from the task's `task_open`, which
  left what a session read before its claim in no task's cost. Now
  every token of a session is in exactly one task; a task opened
  inside another takes what came before its own close.
- A headless run, one task per run, calls `task_cost` with its
  result's usage and source `headless`. That is the documented source
  and the one to prefer once a script drives the loop.
- Tokens a session gives at `task_close` are kept and marked
  `reported`.

Limits, stated so nobody trusts the figure further than it goes: the
transcript's format is internal to Claude Code and undocumented, so
the hook reads it tolerantly and may break on a release; the
transcript is written a moment behind the conversation, so the last
message can be missed; a task opened in one session and closed in
another is not measured; a task closed before 2026-11-11, or in a
session without the hook, has no measured cost; and repository hooks
do not run in multi-repository cloud sessions or in cloud project
threads.

### What a session sees when it starts

A session start hook in this repository (`.claude/settings.json`,
`plugin/scripts/session_start.ts`) runs before the first prompt (owner,
2026-11-12).

- It fetches `origin/main` and fast-forwards the main checkout when
  that is on `main` with nothing uncommitted: Claude Code reads the
  repository's hooks and settings from there, and a stale one ran a
  session without them. It never changes a work branch, never
  discards anything, and says what it could not bring up to date. A
  checkout that predates the hook needs its first pull by hand.
- In a cloud session, and only there, it installs this repository's
  dependencies with `npm ci` when they are missing
  (`plugin/scripts/lib/cloud-install.ts`): the clone is fresh, and
  without them the plan could not be read.
- It gives the agent the plan's brief
  (`plugin/scripts/lib/session-brief.ts`), read from `origin/main`
  with the service's own model code, as `additionalContext`: the
  tasks on offer, what is in flight, what waits on the owner, and what
  to do with it. The agent does not restate it; in its first reply it
  names the task it would take and asks before it claims anything.
- A session that another session started with a brief naming a node,
  a step and the session that delegates is the exception (owner,
  2026-11-16): it claims that task without asking
  ([how we work](how-we-work.md#delegating-a-task)).
- It shows the person a few lines as `systemMessage`: the commit,
  what is on offer, what is in flight, how much waits on them. Nothing
  lets the agent speak first, so this is how the person learns the
  state before typing. After a resume or a compaction it shows
  something only if the checkout could not be brought up to date.

The repository's two hooks are Node scripts, started as `node
"${CLAUDE_PROJECT_DIR}/…"`, because the owner works on Windows, where
a hook's shell varies and a checked-out shell script can carry CRLF
line endings. They need only `node` and `git` on the path. The
plugin, where it is enabled, adds a third hook,
`plugin/scripts/billing_check.sh`, a shell script.

### A session's write needs a task

The service refuses a session's write to a node or a decision
(`node_update`, `node_add`, `node_remove`, `decision_open`,
`decision_close`) unless the call names the open task it is part of
(owner, 2026-11-12). The one exception is a change the owner dictated
to the session, which carries the owner's words as `ownerInstruction`;
being asked to work on a node is not that. The commit message and the
journal event say which it was. The loop's own tools and the view's
actions, which are the owner's, are unchanged.

A pull request that changes one of the five files the service owns
fails this repository's checks. Document paths change, and a linked
file moves, as [the state model](state-model.md#changing-and-moving-a-nodes-documents) says.

What this does not do: every caller holds the same token, so
`ownerInstruction` rests on the session's honesty, not on a
credential. A separate owner credential would close that and is not
built.

### What a session is told

The service's MCP instructions carry the protocol to every session
that connects: go through a task, what each close status does, never
edit the five files the service writes, never merge a task's pull
request, remove what is obsolete, name yourself in `session`.

### `node_add`

Planning and breaking down need new nodes: `node_add(parentId, title,
outcome, after, docs, stage, start)` adds one child with the next
identifier in the parent's plan line, or a root in a named line. A
parent not yet broken down becomes `broken-down` with its first
child: a node with children is broken down (invariant 3).
