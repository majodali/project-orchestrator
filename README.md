# project-orchestrator

The software engineering project orchestrator for the majodali
portfolio. It coordinates role-based agent sessions that work on
portfolio projects under
[majodali/methodology](https://github.com/majodali/methodology).

Its two goals, in order:

1. **Streamline and standardize development.** Every managed project
   moves through the same node lifecycle, with the same roles and the
   same task loop.
2. **Spend less.** Each role names the least expensive model tier
   that does the job, and a hook measures what each task cost. Nothing
   yet makes a session run on its role's model: it runs on the model
   it was started on.

## What is here

- **The plan of this project**, one checked file:
  `orchestration/state.json`, the state file. It holds the nodes, the
  tasks and the decisions, and it is the progress truth.
- **The role agents** in `.claude/agents/`: planner, implementer,
  reviewer and orchestrator. [plugin/](plugin/README.md) packages
  them with the hooks and scripts as a Claude Code plugin.
- **The process**, on one page:
  [docs/process/how-we-work.md](docs/process/how-we-work.md).

The orchestration service is a separate repository,
[majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service).
It is the only writer of the state file and it serves the view. The
code enforces the process: the service refuses a write that breaks
the state file's invariants, and the checks below fail a pull request
that goes around it. The documents under `docs/process/` describe
what the code enforces.

## Where the project stands

Three places answer what is done, what is next and what waits on the
owner. All three show the same state file.

- **The view**, a web page the service serves:
  <https://025si0pve6.execute-api.us-west-2.amazonaws.com/view>. It
  asks for the view token at sign-in. The owner answers decisions,
  lifts holds, approves starts and accepts reviews there.
- **[docs/plan.md](docs/plan.md)**, the plan as a person reads it:
  what waits on the owner, what is ready, what is in flight, and every
  node with its outcome.
- **[docs/backlog.md](docs/backlog.md)**, the Backlog: finished and
  remaining work as one register.

The service renders `docs/plan.md`, `docs/plan-register.md` and
`docs/backlog.md` from the state file with every change. Nobody edits
them by hand.

## How a session works here

A session started in this repository receives the plan's brief from a
session start hook: the tasks on offer, what is in flight and what
waits on the owner. It names the task it would take and asks before
claiming it, unless another session started it with a delegation
brief. Work on a node then goes through the service's task
loop: `task_next`, `task_open`, a branch with a pull request, and
`task_close`. The service merges the pull request when the result is
accepted. [How we work](docs/process/how-we-work.md) gives the loop,
the roles and the owner's decisions.

## Enlisting a repository

A repository is enlisted when a session started in it can call the
service. Four things make that true:

1. An instance of the service serves the repository, and the GitHub
   App is installed on it. Both are the owner's actions.
2. `.mcp.json` at the repository root names the instance.
3. `.claude/settings.json` enables the project's MCP servers,
   registers `plugin/scripts/task_cost_hook.ts` after `task_close`
   in every enlisted repository, and registers
   `plugin/scripts/session_start.ts` at session start only where
   the repository carries its own `orchestration/state.json`.
4. `MCP_AUTH_TOKEN` is set in the environment the session starts
   from. Its value is never committed.

A session confirms with `service_identity`. The detail is in
[How we work, Enlisting a repository](docs/process/how-we-work.md#enlisting-a-repository).

## The checks

Run `npm ci` once, then:

- `npm run check` runs `plan-state check` over the state file: the
  schema, the invariants, and that the three renderings are current.
  It is the one validity rule.
- `npm test`, `npm run lint` and `npm run format` cover the scripts.

CI runs these four on every pull request and on `main`. It also fails
a pull request that changes a file the service owns:
`orchestration/state.json`, `orchestration/journal.jsonl`,
`docs/plan.md`, `docs/plan-register.md` or `docs/backlog.md`.

`node plugin/scripts/sync_agents.ts --check` says whether the plugin's
copy of the agents is current. CI does not run it.

The scripts need Node 22.18.0 or later (23.6.0 on the 23.x line). The
tools run by hand check this themselves and exit non-zero, naming
what they needed and what they found. The two hooks do not, and never
fail a session.

## Pointers

- [docs/classification.md](docs/classification.md): the binding
  declaration (C1 / S0, methodology pinned at 1.6.0) and the recorded
  deviation from K-003.
- [docs/process/how-we-work.md](docs/process/how-we-work.md): how we
  work, on one page.
- [docs/process/task-loop.md](docs/process/task-loop.md) and
  [docs/process/state-model.md](docs/process/state-model.md): what the
  service enforces.
- [docs/plans/rebuild.md](docs/plans/rebuild.md): the plan now running.
- [docs/plans/orchestrator-v1.md](docs/plans/orchestrator-v1.md): the
  founding plan.
- [docs/open-risks.md](docs/open-risks.md): the risk register.
- [docs/archive/](docs/archive/): records of the old process, each
  opening with a status line. Nothing loads them. The Backlog frozen
  on 2026-11-09 is [there](docs/archive/backlog.md).
- [plugin/](plugin/README.md): the Claude Code plugin
  (`/plugin marketplace add majodali/project-orchestrator`).
