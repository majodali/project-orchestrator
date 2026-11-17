# Orchestrator session that keeps work moving (P2-N027)

Status: draft (plan step, task T148, 2026-11-17)

Reader: the owner, and the sessions that specify, build and verify
this node. The reader knows
[how we work](../process/how-we-work.md). Nothing else is assumed.

## Outcome

One restartable session starts a session for each offered task on
its role's model, messages stalled ones, and returns to the owner
only on the four stop conditions, so offered work proceeds without
the owner starting or prompting sessions.

## Why

The owner, 2026-11-16: work should always continue wherever possible,
by an orchestrator session that starts sessions and messages existing
ones. A session has done this by hand since then. This plan turns
what it learned into a role, two scripts and a settings file.

The manual run polled the state file once a minute, ran every session
on its own model, and was limited by shared files, not by the service.

## Design

### 1. A script decides, the session acts

The rules for what to start are code, not judgment. A new script,
`plugin/scripts/orchestrate_next.ts`, reads three inputs and prints
the actions as JSON:

- `orchestration/state.json` at `origin/main`;
- `orchestration/journal.jsonl`, which names the session that opened
  each open task;
- the settings file (section 3).

An action is `start` (a node, a step, a role, a model, a repository
and the brief's text), `message` (a session and the text), `report`
(a node and its stop condition) or `check` (a session whose task has
been open too long). The session carries each out with
`create_session`, `send_message`, `get_session` or a line to the
owner. It adds no action of its own.

### 2. The role

A fourth role agent, `.claude/agents/orchestrator.md`, at most 120
lines, with its generated copy under `plugin/agents/`. The owner
starts a session and names the role; that is the only start the
owner makes. The role:

- runs the script, carries out its actions, starts the watcher
  (section 5) in the background, and ends its turn;
- takes no task itself and writes nothing to the plan. Its only
  service calls are reads;
- attaches no repository after it starts, so it keeps the service's
  tools (the owner's input, 2026-11-17);
- answers no ask and merges nothing. A brief is never the owner's
  words (CLAUDE.md, Delegated tasks);
- tells the owner which session it started for which task, and
  reports each result, as how-we-work.md already requires of a
  delegating session.

The role holds no memory that matters: every fact it acts on is in
the state file, the journal or the settings. A new orchestrator
session started cold takes over with no handover.

### 3. Settings: one file

`orchestration/orchestrator.json`, hand-written, changed by pull
request, checked by a schema test in `npm test`. The service does not
own it. Fields and defaults:

| Field | Default | Meaning |
|---|---|---|
| `limits.execute` | 2 | Execute tasks open at once (the owner, 2026-11-17) |
| `limits.plan` | 1 | Planning tasks open at once |
| `maxReworkRounds` | 2 | Failed verifications of one node before it stops |
| `checkAfterMinutes` | 45 | Age of an open task that triggers a `check` |
| `weeklyBudget` | null | Limit on measured task cost in a week; null is none |
| `repositories` | this one | Repositories it may start sessions in |

A verification is not counted against a limit: each execute task has
its reviewer, as the owner allowed.

### 4. The model for each role

The model stays where it is recorded today: the `model` line of the
role's agent file. The script puts it in the `start` action and the
session passes it to `create_session`. A model that `create_session`
refuses is a `report`, never a fallback to the orchestrator's model.

The agent files name `claude-opus-5` (planner, reviewer) and
`claude-sonnet-5` (implementer). Whether `create_session` accepts
those identifiers is not known; criterion 6 finds out.

### 5. What wakes the orchestrator

A second script, `plugin/scripts/plan_watch.ts`, run as a background
command. It fetches `origin/main` once a minute, runs the decision
function, and exits when the list of actions is not empty. Its exit
re-invokes the session. It is a shell process and costs no tokens.

A background command lives at most two hours. When the watcher ends
there with nothing to do, the session restarts it. That idle wake is
the design's standing cost, and criterion 15 measures it.

Not used: a pull request subscription and a message from the
delegated session at its close. The state file shows a merge and a
close within a minute, and the role agents are at their line bounds.

### 6. Which task gets a session

The script offers a `start` for a node when all of these hold:

- the node offers a step (the task loop's rule, read from the state
  file), and for a `specified` node the step is `execute` unless the
  node's note names `break down`;
- the limit for that kind of step is not reached;
- no node with an open execute task links the same plan document.
  This is the shared-file limit of 2026-11-17 as a rule;
- the node has not stopped (section 8).

A fresh session is started for a `plan`, `specify`, `break down`,
first `execute` and every `verify`. A rework, or a step offered again
after the owner answered its asks, goes by `message` to the session
that held the node's last task, when `get_session` says it still
exists. Otherwise it is a `start` whose brief names the pull request
and its branch. This keeps one branch for each pull request (P4-N038).

The script writes the brief in the form CLAUDE.md defines. It adds
the pull request and branch for continued work, and two standing
lines: work on a branch of your own, attach no second repository.

### 7. Work in another repository

A node's plan says which repository its work writes to (planner
agent, break down). For such a node the `start` action names that
repository, and the session passes it as `source_url`: the new
session starts in the work repository and attaches nothing later.

It reaches the service as any enlisted session does. The work
repository carries `.mcp.json` naming the instance, and
`.claude/settings.json` enabling the server and this repository's
plugin, whose `plugin/hooks/hooks.json` registers the cost hook. The
session inherits the token from its environment.

The first such repository is majodali/project-orchestrator-service,
in scope by RU-016 (who decides which repositories a node's work may
write to). Its two files arrive by one pull request there, which the
owner merges by hand: a merge there deploys.

Calling the endpoint over HTTP with the token, as the manual run
does, is not part of the design: the cost hook does not fire for it.

### 8. When it returns to the owner

The four stop conditions of sequence mode
(`docs/specs/p3-n005-sequence-mode.md`, I1 to I4), each read from the
state file. A stop applies to one node. The script emits one `report`
for it, starts nothing more on it, and goes on with every other node.

| Condition | What the script reads |
|---|---|
| 1. A failed check | The node's verification failed `maxReworkRounds` times; or a session ended with its task open and one `message` did not bring a close |
| 2. A scope change | The node is held `gated` by a close the service turned into `needs-judgment`; or the week's measured cost passed `weeklyBudget` |
| 3. A decision that is the owner's | An open decision on the node or above it; a hold; a node waiting for approval of its start |
| 4. A close that carries asks | The decisions a `task_close` opened |

A first failed verification is not a stop: the task loop sends the
node to rework. Budget is under condition 2 because the sequence-mode
specification classes budget exhaustion as a scope change (I2).

Each predicate fails closed, as in that specification: a missing or
unreadable input yields `report`, never `start`.

A `report` is one line in the orchestrator's conversation: the node,
the condition and what the owner does in the view. The node resumes
when the state file shows the owner acted.

## What is left of P3-N005 and P3-N016

P3-N005 (Sequence mode) had the old dispatch loop run a ratified
sequence. That loop is retired. Its durable result is P3-N013
(Decidable stop conditions), which section 8 reuses.

- P3-N015 (Sequence mode demonstration) and its parked child P3-N020
  (Plugin tools tested as run) would demonstrate a loop that no
  longer exists. The trial in criterion 14 is the demonstration that
  replaces them. This plan recommends removing both.
- P3-N016 (Determination on W-001 sequence mode) is still wanted: it
  tells the methodology whether a run without owner review works. It
  should wait for P2-N027 instead of P3-N015, and take its evidence
  from criterion 14's record.
- P3-N005 stays, held with the P3 line, with P3-N016 its one open
  child. These change another line's scope, so they are ask 2.

## Slices, for the break down step

1. **Decide and start, by hand.** `orchestrate_next.ts`, the settings
   file and the brief text. Runs end to end with no watcher.
2. **The role and the watcher.** `orchestrator.md`, `plan_watch.ts`,
   the `message` and `check` actions, the stop reports.
3. **Another repository.** The two files in the service repository
   (`start: approve`) and criterion 13. Waits for slice 1.
4. **The trial and the measurements.** Criteria 14 to 18. Waits for
   slices 2 and 3, and for P4-N038.

## Criteria

1. `plugin/scripts/orchestrate_next.ts` prints its actions as JSON
   from a state file, a journal and a settings file given as paths,
   and reads nothing else. Its tests run under `npm test`.
2. Tests show a `start` for each offered step with the model from
   the role's agent file, and none for a node that is held, has an
   open decision, has an open task, or waits for approval.
3. Tests show the limits hold: no third execute `start` at
   `limits.execute` 2, and no `start` for a node whose plan document
   an open execute task's node also links.
4. Tests show each of the four stop conditions of section 8 yields
   one `report` naming the node and the condition, and that a missing
   or unreadable input yields `report`, never `start`.
5. `orchestration/orchestrator.json` exists with the fields of
   section 3, a test checks it against its schema, and CI does not
   treat it as a file the service owns.
6. A recorded trial starts one session for each role with the model
   its agent file names. `get_session` gives the model each ran on.
   The record states each result; an identifier `create_session`
   refuses is corrected in the agent file in the same pull request.
7. `.claude/agents/orchestrator.md` exists, is at most 120 lines,
   states the rules of section 2, and
   `node plugin/scripts/sync_agents.ts --check` passes.
8. The brief the script prints names the delegating session, the
   node, the step and the role, and for continued work the pull
   request and its branch. A test pins the text.
9. `plugin/scripts/plan_watch.ts` exits within two minutes of a
   commit to `main` that changes the list of actions, and does not
   exit on a commit that leaves it unchanged. Tests show both against
   a local repository.
10. A rework goes by `message` to the session that held the node's
    last task when that session exists, and by `start` with the pull
    request's branch otherwise. Tests show both.
11. A `check` is emitted for a task open longer than
    `checkAfterMinutes`, and a second one for the same task yields a
    `report` under condition 1. Tests show both.
12. `docs/process/how-we-work.md` says how the orchestrator session is
    started, what wakes it and when it returns to the owner, and no
    longer says that nothing checks the model. It stays within its
    line bound.
13. A recorded trial: a session started by the orchestrator with
    `source_url` majodali/project-orchestrator-service calls
    `service_identity`, opens and closes a task, and the task has a
    measured cost. The record states what loaded and what did not.
14. A recorded trial: the orchestrator session carries at least three
    nodes from an offered step to done, two of them at the same time,
    with no message from the owner to any session in between. The
    record lists each session, its task, its model and each stop.
15. The trial's record gives the orchestrator session's own cost,
    measured from its transcript with `plugin/scripts/lib/task-cost.ts`:
    tokens by type, the number of wakes, the cost of an idle wake and
    of a wake that acts. Met by the recorded numbers, whichever way
    they fall (RU-019, a measurement is met by its record).
16. The record sets the orchestrator's cost in the trial beside the
    sum of its delegated tasks' recorded costs, as a ratio, by the
    same method.
17. A new orchestrator session, started while delegated tasks are
    open, prints the same actions as the one it replaces. The trial
    records one such replacement.
18. The orchestrator session makes no write to the plan: the journal
    of the trial holds no line whose `session` is the orchestrator's.

## Asks

1. **Which model runs the orchestrator session?** Options:
   `claude-sonnet-5`; `claude-opus-5`. Default: `claude-sonnet-5`,
   because the script decides and the session only carries actions
   out, and criterion 15 measures whether that holds.
2. **When P2-N027 is done, remove P3-N015 and P3-N020, and make
   P3-N016 wait for P2-N027 instead of P3-N015?** Options: yes; keep
   all three as they are. Default: yes.
3. **Set a weekly limit on the measured cost of delegated tasks
   now?** Options: no limit until the trial records a week's figure;
   a figure the owner names. Default: no limit until the trial.

## Risks

- **A wake costs more than the work it saves.** The context grows
  with each wake. The script holds the rules and a replacement
  session is always possible (criterion 17). Criterion 15 measures it.
- **The plugin's hooks do not load in a session started in another
  repository.** Then its task has no measured cost. Criterion 13
  records what happens before slice 4 relies on it.

## Terms introduced

- **Orchestrator session**: a session that follows section 2's role.
- **Watcher**: the background command of section 5.
- **Action**: one line of the decision script's output (section 1).
