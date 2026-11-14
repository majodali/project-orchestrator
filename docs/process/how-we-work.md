# How we work

Reader: a fresh session in a repository the orchestrator manages, and
the owner. It assumes nothing but this repository's README. It is the
one page on the process; the code enforces the rest.

## The plan and its one writer

A project's plan is one file, `orchestration/state.json`: nodes, tasks
and decisions. The orchestration service is its only writer, one
commit per change on `main`. It also writes
`orchestration/journal.jsonl`, `docs/plan.md` and
`docs/plan-register.md`; the last two are renderings of the state
file. Nobody edits these four by hand, and a pull request that changes
one fails the checks. Git is the only source of truth: the service
holds no state of its own.

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
3. **Work.** On a branch, with a pull request. Never merge it.
4. **Close.** `task_close` records the status, a summary of at most
   sixty words, the pull request, and questions for the owner as
   `asks`. A hook measures the cost; a session gives no token counts.
5. **Stop.** When the answer carries `stop`, or `task_next` answers
   nothing, return to the person.

A node's stage decides the step on offer:

| Stage | Step | Role | A `closed` close moves it to |
|---|---|---|---|
| `identified` | `plan` | planner | `planned` |
| `planned` | `specify` | planner | `specified` |
| `specified` | `execute`, or `break down` | implementer, planner | `verifying`, or `broken-down` |
| `verifying` | `verify`, on its check node | reviewer | `done` |

Verification runs on a check node: a child the service adds, titled
"Verification of ...". When the reviewer closes it `closed`, the
service merges the node's pull requests and marks the node done. A
planning step's pull request merges at its own close. A close of
`blocked` or `needs-judgment` puts a hold on the node with the summary
as the reason.

A node offers no step while it is held or parked, waits for a
dependency or for approval, has an open task or an open decision, or
stands below a held node. A task open for more than 24 hours is closed
as `stale`.

Every other write to the plan (`node_update`, `node_add`,
`node_remove`, `decision_open`, `decision_close`) names the open task
it is part of. The one exception is a change the owner dictated in the
conversation, passed in their words as `ownerInstruction`. An obsolete
node is removed, never parked: git keeps its history.

The full specification is [the task loop](task-loop.md).

## The roles

Three role agents live in `.claude/agents/`, each a page a session can
follow from start to finish:

- **Planner**: the `plan`, `specify` and `break down` steps. Delivers
  a title, an outcome, a revised plan document with a criteria list of
  at most 20 items, and asks with defaults.
- **Implementer**: the `execute` step. Does the work against the
  node's criteria and opens the pull request.
- **Reviewer**: the `verify` step. Checks every criterion itself and
  reports; it never fixes.

A session may take any role. `plugin/agents/` is a generated copy: after editing a
role, run `node plugin/scripts/sync_agents.ts`.

## Enlisting a repository

A repository is enlisted when a session started in it can call the
service. Four things make that true:

1. **An instance of the service serves the repository.** Deploying
   one, and installing the GitHub App on the repository, are the
   owner's actions. The service repository's
   [runbook](https://github.com/majodali/project-orchestrator-service/blob/main/docs/runbook.md)
   lists them.
2. **`.mcp.json` at the repository root** names the instance: type
   `http`, the endpoint's `url`, the header
   `"Authorization": "Bearer ${MCP_AUTH_TOKEN}"` and a `timeout` of
   30000. The token's value is never committed, pasted or logged; only
   the variable's name is written down.
3. **`.claude/settings.json`** sets `enableAllProjectMcpServers` to
   true, so a session needs no approval step, and registers two
   hooks: `plugin/scripts/session_start.ts` at session start, and
   `plugin/scripts/task_cost_hook.ts` after `task_close`.
4. **`MCP_AUTH_TOKEN` is set** in the environment the session starts
   from: a shell export locally, the environment's secrets in a cloud
   session.

The state file first arrives by one pull request, written by
`plan-state import` from the project's Backlog. From then on the
service is its only writer.

To confirm, call `service_identity`: it names the service, its
version, its commit and the project. If the service cannot be reached,
stop and tell the person. There is no git-only fallback, by the
owner's decision (D014): do not retry, and do not edit the state file
by hand.

## What a session sees when it starts

The session start hook fetches `origin/main`, fast-forwards a clean
checkout on `main`, installs dependencies in a cloud session that has
none, shows the person a short summary, and gives the session the
plan's brief: the tasks on offer, what is in flight, what waits on the
owner. In its first reply the session names the task it would take
and asks before claiming it.

## The checks

- `npm run check` runs `plan-state check` over the state file: the
  schema, the invariants, and that the renderings are current. It is
  the one validity rule. The service runs the same check before every
  write and commits nothing that fails it.
- `npm test`, `npm run lint` and `npm run format` cover the scripts.
- CI runs all of these on every pull request and on `main`, and
  fails a pull request that changes a file the service owns.
- `node plugin/scripts/sync_agents.ts --check` says whether the
  plugin's copy of the agents is current.
- The TypeScript scripts need Node 22.18.0 or later (23.6.0 on the
  23.x line). Each checks this itself and exits non-zero, naming what
  it needed and what it found.

## The owner's decisions

The owner decides in the view, a web page the service serves, and each
answer is a commit by the service.

- **Decisions.** A question for the owner is an open decision on a
  node, with options and a default. A session raises one as an ask at
  `task_close`, never only in chat. The node offers no step until the
  owner answers.
- **Holds.** The owner lifts a hold, or accepts a review, in the view.
- **Approval.** A node with `start: approve` waits for the owner's
  go-ahead when it is ready. A node that writes to another repository
  starts this way.
- **Standing decisions.** A decision marked standing is a precedent:
  every task receives all of them at `task_open`.

A report to the owner has four parts, in order: the asks, what was
already settled, what changed with a pointer to each place, and the
terms introduced. An empty part is stated, never dropped.

## Documents

- A node's criteria are a list of at most 20 items in its plan
  document. No node needs a document for its own sake.
- A hand-written document is at most 300 lines.
- Documentation moves in the same pull request as the work.
- A document that no longer describes what we do moves to
  `docs/archive/`, opening with a status line that says why and what
  replaced it. Archived files are records: nothing loads them.
- All sessions bill to the owner's Claude subscription, never to API
  credits.
