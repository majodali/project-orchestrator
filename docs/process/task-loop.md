# The task loop and the close-out

Reader: a session about to take a task, and the owner checking what
the service does. This is the specification the orchestration
service's loop was built to (`src/model/loop.ts` in
majodali/project-orchestrator-service). The code enforces it; where
the two differ, the code is what runs and this page has a defect.
For the short version, read [how we work](how-we-work.md). Moved here
from the rebuild plan on 2026-11-14 (P4-N024, Pruned document set).


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

### Cost capture

A task's cost is measured, never estimated by the session (decision
13; owner, 2026-11-11). The measure is tokens by type (input, output,
cache read, cache write) and the model, not money: sessions bill to
the subscription.

- The service's `task_cost(task, tokens…, model, source)` records it
  on an open or a closed task; a later record replaces an earlier one.
- In an interactive session, a hook in this repository
  (`.claude/settings.json`, `plugin/scripts/task_cost_hook.ts`) runs
  when `task_close` returns. It sums the usage in the session
  transcript from the task's `task_open` on, subagents included, each
  model message once, and calls `task_cost` with source `transcript`.
  It never fails the session: when it cannot measure, the task has no
  measured cost.
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
another is not measured; and repository hooks do not run in
multi-repository cloud sessions or in cloud project threads.

### What a session sees when it starts

A session start hook in this repository (`.claude/settings.json`,
`plugin/scripts/session_start.ts`) runs before the first prompt (owner,
2026-11-12). It fetches `origin/main`. It fast-forwards the main
checkout when that is on `main` with nothing uncommitted, because
Claude Code reads the repository's hooks and settings from there, and
a stale one ran a session without them. It never changes a work
branch, never discards anything, and says plainly what it could not
bring up to date. In a cloud session, and only there, it then
installs this repository's dependencies with `npm ci` when they are
missing (owner, 2026-11-13; `plugin/scripts/lib/cloud-install.ts`): the
clone is fresh, and without them the plan could not be read. Then it
prints the plan's brief
(`plugin/scripts/lib/session-brief.ts`), read from `origin/main` with the
service's own model code: the tasks on offer with step and role, what
is in flight, and what waits on the owner.

The hook answers Claude Code in its JSON form. `additionalContext`,
which the agent sees, carries the checkout lines, the brief, and what
to do with them: the agent does not restate the summary, since the
person already sees it; in its first reply it names the task on offer
it would take and asks before it claims anything.
`systemMessage`, which the person sees on screen, carries a few lines:
the commit, what is on offer, what is in flight, how much waits on
them. In an interactive session nothing lets the agent speak first, so
that screen message is how the person learns the state before typing
(owner, 2026-11-12). After a resume or a compaction the hook only
refreshes what the agent knows, and puts something on screen only if
the checkout could not be brought up to date.

The hook cannot help a checkout that predates it: the first pull is
by hand.

Both hooks are Node scripts, started as `node
"${CLAUDE_PROJECT_DIR}/…"`, because the owner works on Windows: there
a hook's shell is Git Bash or PowerShell depending on what is
installed, and a checked-out shell script can carry CRLF line endings.
They need only `node` and `git` on the path. For the same reason the
service package's install step starts the TypeScript compiler with
Node directly and never through `npm` (2026-11-12, after `npm ci`
failed on Windows).

### A session's write needs a task

The service refuses a session's write to a node or a decision
(`node_update`, `node_add`, `node_remove`, `decision_open`,
`decision_close`) unless the call names the open task it is part of
(owner, 2026-11-12). The one exception is a change the owner dictated
to the session, which carries the owner's words as `ownerInstruction`;
being asked to work on a node is not that. The commit message and the
journal event say which it was. The loop's own tools and the view's
actions, which are the owner's, are unchanged.

A pull request that changes one of the four files the service owns
fails this repository's checks.

What this does not do: every caller holds the same token, so
`ownerInstruction` rests on the session's honesty, not on a
credential. A separate owner credential would close that and is not
built.

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
