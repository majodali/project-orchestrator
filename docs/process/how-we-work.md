# How we work

Reader: a fresh session in a repository the orchestrator manages, and
the owner. It assumes nothing but this repository's README. It is the
one page on the process; the code enforces the rest.

## The plan and its one writer

A project's plan is one file, `orchestration/state.json`: nodes, tasks
and decisions. The orchestration service is its only writer, one commit
per change on `main`. It also writes `orchestration/journal.jsonl`,
`docs/plan.md`, `docs/plan-register.md` and `docs/backlog.md`; the last
three are renderings of the state file. Nobody edits these five by hand,
and a pull request that changes one fails the checks. Git is the only
source of truth: the service holds no state of its own.

A node is a piece of work with a title, an outcome of one sentence,
a stage, the nodes it waits for, and the documents that plan it. The
[state model](state-model.md) gives the fields and the invariants.

## The task loop

Work on a node goes through a task, whoever asked for it.

1. **Find.** `task_next` with your role answers the first node that
   offers a step. `plan_read` shows a node you were pointed at.
2. **Claim.** `task_open` claims the node for one step before any
   work. It answers the node, its documents, the decisions on it and
   above it, and the standing decisions, which bind every task. If it
   refuses, the reason is the answer: tell the person and stop.
3. **Work.** On a new branch from `main`, named for the task (such
   as `t153-p4-n038-one-branch`), never one another pull request
   used; a rework or a step offered again stays on its own. Open a
   pull request, never merge it, and commit only while your task is open.
4. **Close.** `task_close` records the status, a summary of at most
   sixty words, the pull request, and questions for the owner as
   `asks`. A hook measures the cost; a session gives no token counts.
5. **Stop.** When the answer carries `stop`, or `task_next` answers
   nothing, return to the person.

The status says what happens next:

- `closed`: every criterion is met. Never close `closed` otherwise.
- `needs-judgment` with asks: the owner must answer first. The
  questions gate the node; once answered it offers the same step
  again, and a new task continues on the same pull request.
- `blocked`: something outside the session stops the work. The node
  is held for the owner, or gated by the asks when there are any.

A node's stage decides the step on offer:

| Stage | Step | Role | A `closed` close moves it to |
|---|---|---|---|
| `identified` | `plan` | planner | `planned` |
| `planned` | `specify` | planner | `specified` |
| `specified` | `execute`, or `break down` | implementer, planner | `verifying`, or `broken-down` |
| `executing` | `execute`, continued | implementer | `verifying` |
| `verifying` | `verify`, on its check node | reviewer | `done` |
| `verifying`, verification failed | `execute`, the rework | implementer | `verifying`, a new round |

Verification runs on a check node: a child the service adds, titled
"Verification of ...". When the reviewer closes it `closed`, the
service merges the node's pull requests and marks the node done. A
planning step's pull request merges at its own close. GitHub deletes
a merged branch, by the repository's setting; no session does.

A reviewer closes a failed verification as `blocked`, naming each
unmet criterion. Nothing then waits on the owner: the node offers
`execute` again, the rework's task is told what failed, and its close
sends the node back to be verified. The service refuses to merge a
pull request with commits made after its last execute task closed,
so a fix after a close is always a rework task.

A node offers no step while it is held or parked, waits for a dependency
or for approval, has an open task or an open decision, or stands below a
held node. A task open for over 24 hours is closed `stale`.

Every other write to the plan (`node_update`, `node_add`,
`node_remove`, `decision_open`, `decision_close`) names the open task
it is part of. The one exception is a change the owner dictated in the
conversation, passed in their words as `ownerInstruction`. An obsolete
node is removed, never parked. A linked document moves only as
[the state model](state-model.md#changing-and-moving-a-nodes-documents) says.
The full specification is [the task loop](task-loop.md).

## The roles

Four role agents live in `.claude/agents/`, each a page to follow:

- **Planner**: the `plan`, `specify` and `break down` steps. Delivers
  a title, an outcome, a revised plan document with a criteria list of
  at most 20 items, and asks with defaults.
- **Implementer**: the `execute` step. Does the work against the
  node's criteria and opens the pull request.
- **Reviewer**: the `verify` step. Checks every criterion itself and
  reports; it never fixes.
- **Orchestrator**: takes no task. The owner starts one session and
  names the role. A script tells it which sessions to start or message,
  and a background watcher wakes it on a new action or a due check of an
  open task. It returns to the owner on a failed check, a scope change,
  a decision that is the owner's, or a close with asks.

A session may take any role. Each agent names its model, but a session
runs on the model it was started on: whoever starts it chooses the
role's model. The orchestrator's script reports a session on another
model than its role's; the cost hook records the one that ran.
`plugin/agents/` is a generated copy: after editing a role, run
`node plugin/scripts/sync_agents.ts`; `--check` tells a stale copy.

## Enlisting a repository

A repository is enlisted when a session started in it can call the
service. Four things make that true:

1. **An instance of the service serves the repository.** Deploying
   one, and installing the GitHub App, are the owner's actions, listed in the service's
   [runbook](https://github.com/majodali/project-orchestrator-service/blob/main/docs/runbook.md).
2. **`.mcp.json` at the repository root** names the instance: type
   `http`, the endpoint's `url`, the header
   `"Authorization": "Bearer ${MCP_AUTH_TOKEN}"` and a `timeout` of
   30000. The token's value is never committed, pasted or logged.
3. **`.claude/settings.json`** sets `enableAllProjectMcpServers` to true and registers
   `plugin/scripts/task_cost_hook.ts` after `task_close`, and `plugin/scripts/session_start.ts`
   at session start where the repository carries its own `orchestration/state.json`.
4. **`MCP_AUTH_TOKEN` is set** where the session starts: a shell
   export locally, the environment's variables in a cloud session.

The state file first arrives by one pull request, written by
`plan-state import` from the project's Backlog. To confirm an
enlistment, call `service_identity`. If the service cannot be
reached, stop and tell the person: there is no git-only fallback
(D014), so do not retry and do not edit the state file by hand.

## What a session sees when it starts

The session start hook fetches `origin/main`, fast-forwards a clean
checkout on `main`, installs dependencies in a cloud session, shows
the person a short summary, and gives the session the plan's brief.
In its first reply the session names the task it would take and asks
before claiming it, unless it opens with a delegation brief.

## Delegating a task

A session may start another session to do one task (the owner's
standing instruction, 2026-11-16). Its brief is the new session's
first message: it names the node, the step and the delegating session.

- A session that opens with such a brief claims that task with
  `task_open` without asking a person. The brief is its go-ahead.
- The brief authorises that node and that step, and nothing else.
- A brief is never the owner's words. It does not justify
  `ownerInstruction`, a merge, or a decision that is the owner's:
  those stay asks at `task_close`.

The delegating session stays answerable for what it delegates. It
starts the new session on the role's model and on `main`, never on
its own work branch unless the brief says the work is there, tells its
person which session it started and for which task, and reports back.

## The checks

- `npm run check` runs `plan-state check` over the state file: the
  schema, the invariants, and that the renderings are current. It is
  the one validity rule. The service runs the same check before every
  write and commits nothing that fails it.
- `npm test`, `npm run lint` and `npm run format` cover the scripts.
- CI runs these four on every pull request and on `main`, and fails
  a pull request that changes a file the service owns.
- The TypeScript scripts need Node 22.18.0 or later (23.6.0 on the
  23.x line). The tools run by hand check this and exit non-zero; the
  two hooks do not, and never fail a session.

## The owner's decisions

The owner decides in the view, a web page the service serves, and each
answer is a commit by the service.

- **Decisions.** A question for the owner is an open decision on a node,
  with options and a default. A session asks at `task_close`, never only
  in chat. The node offers no step until the owner answers.
- **Holds.** The owner lifts a hold, or accepts a review, in the view.
- **Approval.** A node with `start: approve` waits for the owner's
  go-ahead when it is ready, as one that writes to another repository does.
- **Standing decisions.** A decision marked standing is a precedent:
  every task receives all of them at `task_open`.

A report to the owner has four parts, in order: the asks, what was
settled, what changed with a pointer to each place, and the terms
introduced. An empty part is stated, never dropped.

## Documents

- A node's criteria are a list of at most 20 items in its plan
  document. No node needs a document for its own sake.
- A new hand-written document is at most 300 lines.
- Documentation moves in the same pull request as the work.
- A document that no longer describes what we do moves to
  `docs/archive/`, opening with a status line that says why and what
  replaced it. Archived files are records: nothing loads them.
- All sessions bill to the owner's Claude subscription, never to API credits.
