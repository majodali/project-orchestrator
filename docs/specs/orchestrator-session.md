# Orchestrator session: specification (P2-N027)

Status: specify step, task T150, 2026-11-17.

Reader: the sessions that break down, build and verify P2-N027, and
the owner. The reader has read
[the plan](../plans/orchestrator-session.md) and
[how we work](../process/how-we-work.md). Section numbers below
(S1 to S9) are this document's; "plan section" names the plan's.

## Why a separate document

The plan's criteria are checkable, but they leave six things
undecided, and the plan is at its line bound.

1. The script needs inputs criterion 1 does not allow: the agent
   files (criterion 2) and the time (criterion 11).
2. The script cannot see a session. Between a `start` and the new
   session's `task_open` the node is still offered, so the next run
   would start a second session.
3. Criterion 11 needs a record that a task was checked. Criteria 17
   and 18 forbid keeping it in the orchestrator or in the plan.
4. A standing `report` keeps the list of actions non-empty, so the
   watcher of plan section 5 would exit at once, every time.
5. `plugin/hooks/hooks.json` does not register the cost hook, as
   plan section 7 said. This repository's `.claude/settings.json`
   does, by a path that exists only here.
6. P2-N027 would itself be offered `execute` after this step.

The plan's design stands. Where the two differ, this document
governs; the plan's status line says so.

## S1. Inputs and output

The decision is a pure function, `decide`, in
`plugin/scripts/lib/orchestrate.ts`. The command
`plugin/scripts/orchestrate_next.ts` reads its inputs and prints the
result. It makes no network call and no git call, and it preflights
Node as RU-013 (what a tool does when its runtime is too old) says.

| Option | Default | Input |
|---|---|---|
| `--state` | `orchestration/state.json` | The state file |
| `--journal` | `orchestration/journal.jsonl` | The journal |
| `--settings` | `orchestration/orchestrator.json` | The settings |
| `--agents` | `.claude/agents` | The role agents; each `model` line |
| `--sessions` | none | The session snapshot (S2) |
| `--self` | none | The orchestrator session's identifier, for the brief |
| `--now` | the clock | The time, ISO 8601, so tests are fixed |

The output is `{ "actions": [...] }`, in the order S4 gives. Every
action carries `kind` and `key`. The key is the action's identity:
two runs that mean the same action print the same key.

| Kind | Key | Other fields |
|---|---|---|
| `start` | `start:<node>:<step>:<after>` | `node`, `step`, `role`, `model`, `repository`, `title`, `brief`, `pr` or null |
| `message` | `message:<session>:<kind of mark>:<task>` | `session`, `node`, `text`, `mark` |
| `check` | `check:<task>` | `task`, `node`, `session`, `mark` |
| `report` | `report:<node or project>:<condition>:<reason>` | `node` or null, `condition` 1 to 4, `reason`, `text` |

`<after>` is the last closed task on the node or its check node, or
`new`: a later start on the same node is a different action. Which
nodes offer a step comes from the service's `candidates(state)`, as
in `plugin/scripts/lib/session-brief.ts`, never from a second rule.

## S2. The session snapshot: where memory lives

The orchestrator session writes a snapshot before each run of the
script: a JSON list, one entry for each session whose title follows
the grammar below, from `list_sessions` and `get_session`. Fields:
`id`, `title`, `created`, `status` (the status bucket) and `model`
(the model the session is set to run).

The title of a session the orchestrator starts is the `title` of the
`start` action: `<node> <step>`, as in `P4-N038 execute`. After it
carries out a `message` or a `check`, the orchestrator appends that
action's `mark` to the session's title with `set_session_title`, as
in `P4-N038 execute; checked T152 2026-11-17T22:10Z`. A mark ends
with the time it was made, which the action gives. The marks are:

- `checked <task> <time>`: a `check` of that task was carried out;
- `nudged <task> <time>`: the session was told its task is still
  open;
- `continued <task> <time>`: the session was sent the rework, or the
  step offered again, that follows that closed task.

What was started, checked and sent is thus recorded on the sessions,
and a new orchestrator session reads it back. The script reads it so:

- **The session of an open task** is the snapshot entry whose `id`
  is the `session` of the task's `task_open` line in the journal.
  Failing that, it is the newest entry titled with the task's node
  and step.
- **A pending start** is an entry titled `<node> <step>`, or marked
  `continued <task>`, when the node has no open task and no task on
  the node was opened after the entry was created or marked. A node
  with a pending start gets no `start` and no `message`.
- A pending start counts as an open task for the limits and for the
  shared-document rule (S4).

With no snapshot, or one that does not parse, the script prints one
`report` (S5, `input`) and no `start`, `message` or `check`.

## S3. Checks, nudges and continued work

`T` is `checkAfterMinutes`. For an open task older than `T`, with its
session read as S2 says:

| What the script sees | Action |
|---|---|
| No session for the task | `report`, condition 1, `no-session` |
| No `checked` mark for the task | `check` |
| Marked `checked`, status not `working`, no `nudged` mark | `message`, mark `nudged <task>` |
| `T` has passed since the task's last mark, and the task is still open | `report`, condition 1, `no-close` |

The orchestrator carries out a `check` by refreshing that session in
the snapshot, appending the mark, and running the script again. A
pending start created or marked `continued` more than `T` ago is a
`report`, condition 1, `no-claim`. A session whose `model`, with any
bracketed suffix removed, differs from its role's `model` line is a
`report`, condition 1, `model`, while its task is open or pending.

Continued work is a rework after a failed verification, or a step
offered again on a node whose last task of that step closed
`needs-judgment` or `blocked`. The script prints a `message`, mark
`continued <task>`, to the session of that last task when the
snapshot holds it, not archived. Otherwise it prints a `start` whose
`pr` is that task's pull request, and the brief says to continue on
that pull request's head branch. The script has no network, so it
does not look the branch's name up.

## S4. Order, limits and the shared document

The script walks `candidates(state)` in the service's order and
takes each node in turn. Reports come first in the output, then
`check`, then `message`, then `start`.

- A `specified` node gets `execute`, unless its note contains the
  words `Next step: break down`. Then it gets `break down`.
- `limits.execute` counts open and pending `execute` tasks, reworks
  included, whoever opened them. `limits.plan` counts `plan`,
  `specify` and `break down` the same way. `verify` is never counted.
- No `start` or `message` is printed for a node that links a plan
  document also linked by a node with an open or pending task of any
  step but `verify`: a reviewer edits nothing. The plan named only
  execute tasks; a planner in the same file collides the same way.
- A node skipped for either reason gets no action until a later run.

The `repository` of a `start` is the state file's `project`, unless
the settings name another: `repositories` is a list of
`{ "repository", "nodes" }`. The pull request that plans such a node
adds its line. No `start` names a repository the list lacks.

## S5. Reports

One `report` for each node, condition and reason that holds. The
`text` is the line the orchestrator gives the owner: the node, its
title, the condition and what the owner does in the view.

| Condition | Reason | What the script reads |
|---|---|---|
| 1 | `rework-limit` | The node offers a rework and `maxReworkRounds` `verify` tasks on its check nodes closed `blocked` |
| 1 | `no-session`, `no-close`, `no-claim`, `model` | S3 |
| 1 | `input` | A missing or unreadable input; `node` is null |
| 2 | `scope` | A `gated` hold whose reason begins `Scope changed during` |
| 2 | `budget` | `weeklyBudget` is a number, and the tokens of all four types on tasks closed in the last seven days exceed it; `node` is null |
| 3 | `decision` | An open decision on the node whose rationale does not begin `Asked by` |
| 3 | `hold` | Any other hold on the node, except a failed check node's |
| 3 | `approval` | The service's `offerOn` answers `approval` for the node |
| 4 | `asks` | An open decision on the node whose rationale begins `Asked by` |

A node below a held or parked node gets no report of its own. A
`budget` or `input` report stops every `start` and `message`; any
other stops only its node. `weeklyBudget` stays null (D076, no
weekly limit until the trial records a week's figure).

## S6. The watcher

`plugin/scripts/plan_watch.ts` takes the script's options and
`--acted <file>`, a list of action keys. Once a minute it runs
`git fetch origin main`, reads the state file and the journal from
`origin/main`, and calls `decide` with the current time. It exits 0
and prints the actions as soon as one key is not in the acted list.
A key that disappears does not wake it. A `check` falls due by time,
so the watcher wakes without a commit.

After the orchestrator carries out the actions, it writes all their
keys to the acted file. An action whose tool call is refused is told
to the owner with its key, and is neither retried nor replaced. The
file is local: a replacement session has none, so it gives every
standing report once more, and starts nothing twice (S2).

## S7. Another repository

Plan section 7 stands, with its hook corrected. The pull request to
majodali/project-orchestrator-service carries:

- `.mcp.json`, as how-we-work.md, Enlisting a repository, gives it;
- `.claude/settings.json` with `enableAllProjectMcpServers` and a
  `PostToolUse` hook on `mcp__project-orchestrator__task_close`;
- the hook itself, vendored: `task_cost_hook.ts` and
  `lib/task-cost.ts`, copied by a generator in this repository with
  a `--check` mode, as RU-012 (how two repositories share one unit
  of code) requires. The copy is never edited there.

No planning task read the service repository. P2-N032's task
states what it already holds.

## S8. This node's next step, and what is not verified

P2-N027's note now ends `Next step: break down`, set under T150, so
S4's rule applies to the node that defines it. The plan's four
slices are the children. The task that finishes P2-N033
carries out D075 (remove P3-N015 and P3-N020; P3-N016 waits for
P2-N027) as its last act.

Not verified here: that `list_sessions` returns sessions another
session started, with their titles; and that `create_session`
accepts `claude-opus-5` and `claude-sonnet-5` (tasks T147 to T149
ran on `claude-fable-5-2`). Criterion 6 records both. If the first
fails, S2 fails closed and P2-N030 returns to the owner.

## Criteria

Criteria 14, 15, 16 and 18 are in the plan, with the children that
carry each criterion: P2-N030 has 1 to 6, 8, 19 and 20; P2-N031 has
7 and 9 to 12; P2-N032 has 13; P2-N033 has 14 to 18.

1. `orchestrate_next.ts` prints `{ "actions": [...] }` in the shapes
   of S1 from the inputs of S1 given as paths, and makes no network
   or git call. Its tests run under `npm test`.
2. Tests show a `start` for each offered step, with the `model` of
   the role's agent file and the title `<node> <step>`, and none for
   a node that is held, has an open decision, has an open task, waits
   for approval, or has a pending start.
3. Tests show the limits and the shared-document rule of S4: no third
   execute `start` at `limits.execute` 2 with pending starts counted,
   none for a node sharing a plan document with an open task, and one
   for a node sharing it only with a `verify`.
4. Tests show one `report` for each row of S5's table, naming the
   node, the condition and the reason, and that each unreadable input
   of S1 yields the `input` report and no `start`.
5. `orchestration/orchestrator.json` exists with the plan's fields
   and S4's `repositories`. A test checks it against its schema. CI
   does not treat it as a file the service owns.
6. A recorded trial starts one session for each role with the model
   its agent file names. The record gives, for each, `get_session`'s
   configured, current and last served model, and whether
   `list_sessions` in a second session returned it with its title. An
   identifier `create_session` refuses is corrected in the agent file
   in the same pull request.
7. `.claude/agents/orchestrator.md` exists, names `claude-sonnet-5`
   (D074, which model runs the orchestrator session), is at most 120
   lines, states the rules of plan section 2 and the snapshot, marks
   and acted file of S2 and S6, and
   `node plugin/scripts/sync_agents.ts --check` passes.
8. The brief names the delegating session, the node, the step and
   the role, and the two standing lines of plan section 6. For
   continued work it names the pull request and says to continue on
   its head branch. A test pins the text.
9. Tests against a local repository show the watcher exits within
   two minutes of a commit that adds an action key, does not exit on
   a commit that adds none or only removes one, and exits with no
   commit when a `check` falls due.
10. Tests show continued work goes by `message`, marked
    `continued <task>`, to the last task's session when the snapshot
    holds it, by `start` with `pr` otherwise, and that neither is
    printed again once the mark or the new session is in the snapshot.
11. Tests show each row of S3's table: a `check`, then a `message`
    for a session not working, then the `no-close` report, and the
    `no-claim` and `model` reports.
12. `docs/process/how-we-work.md` says how the orchestrator session
    is started, what wakes it, when it returns to the owner, and that
    the script reports a session on another model than its role's.
    It stays within its line bound.
13. A recorded trial: a session the orchestrator started with
    `source_url` majodali/project-orchestrator-service calls
    `service_identity`, opens and closes a task, and the task has a
    measured cost. The record states what loaded and what did not.
    The generator's `--check` passes against that repository's copy.
17. A replacement orchestrator session, started while delegated tasks
    are open, prints the same action keys from the same commit and a
    fresh snapshot as the one it replaces, and starts no session
    twice. The trial records one replacement.
19. A test shows a `specified` node whose note contains
    `Next step: break down` gets a `start` for `break down`, and one
    without it gets `execute`.
20. A test shows a node listed under another repository in the
    settings gets a `start` naming that repository, and that no
    `start` names a repository the settings do not list.

## Terms introduced

- **Snapshot**: the list of sessions the script reads (S2).
- **Mark**: text added to a session's title to record an action (S2).
- **Pending start**: a session given work, its task not yet open (S2).
- **Acted file**: the watcher's list of action keys carried out (S6).
