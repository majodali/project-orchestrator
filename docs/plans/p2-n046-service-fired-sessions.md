# Tasks started by the service through scheduled tasks (P2-N046)

Status: planned (T208, 2026-11-19). Child of
[the orchestrator session](orchestrator-session.md), P2-N027, whose
design it replaces in part. Next step: break down.

Reader: the owner, and the sessions that break down, build and verify
this node. It assumes [how we work](../process/how-we-work.md) and
P2-N027's plan.

## Outcome

When a node offers a step, the service fires the owner's scheduled
task for that role and repository, and the fired session pulls its
task from the plan and completes it with no message from the owner or
from another session.

## Why

A controlled test on 2026-11-19 (P2-N046's note) ran 12 sessions on
scratch nodes. Of the 11 started by another session, none opened a
task: 8 had `task_open` refused by Claude Code's auto-mode check and 3
stopped by the session's own choice. A session fired by a scheduled
task the owner had written, with the same wording and model, had
`task_open` and `task_close` accepted. A brief from a session is not a
request from a person; a stored prompt the owner wrote is the account's
own instruction. Hence the owner's decision: the service fires one.

## What the documentation says

Read 2026-11-19 at code.claude.com/docs/en/routines ("Automate work
with scheduled tasks") and, for the endpoint,
platform.claude.com/docs/en/api/claude-code/routines-fire. Re-read both
before building: the feature is a research preview and both pages say
the shapes may change.

- `POST https://api.anthropic.com/v1/claude_code/routines/{trig_id}/fire`
  with `Authorization: Bearer <token>` (a per-task token, prefixed
  `sk-ant-oat01-`, shown once and not retrievable), `anthropic-version`
  (missing or unsupported is a 400) and `Content-Type`. The beta header
  `experimental-cc-routine-2026-04-01` is accepted either way. The
  answer is `{ type, claude_code_session_id,
  claude_code_session_url }`, returned when the session is created, not
  when it finishes.
- The only body field is `text`, at most 65,536 characters, reaching
  the session wrapped in a `routine-fire-payload` block "that labels it
  as untrusted data"; the saved prompt must opt in before the session
  acts on it. That prompt "can't act as approval or consent for actions
  during the run", so the check still judges every write.
- "There is no idempotency key. If a webhook caller retries, the
  endpoint creates multiple sessions", and no deduplication is
  documented. 30 fires an hour for one task, shared with **Run now**,
  and 100 an hour for the account; beyond either, 429 with
  `Retry-After`, and no overage.
- The repositories, the model and the environment are set on the task,
  not per fire, and nothing is overridden at fire time. A run clones
  each repository and starts from its default branch unless the prompt
  says otherwise.
- A run "begins in auto mode unless auto mode is unavailable", and
  still stops and waits for a person on an ask rule or repeated blocks;
  the prompt is answered by opening that run's session.
- A run pushes "to a branch prefixed with `claude/` unless your prompt
  directs it to push to another branch"; branch protection is the
  control over what it may push.
- Runs draw on the Claude Code subscription, not on platform credits,
  which is what this project requires of every surface. No public API
  lists tasks, tokens or past runs; the task's page carries its
  History.

## Design

### 1. When the service fires

The service fires after a write of its own commits, and at no other
time. Every transition that makes a step offered is a write it makes —
a close, an answered decision, an approved start, a merge — so no
timer or poll is needed, and nothing fires while nothing changes.

Firing is not part of the write. The commit is made and answered
first, so a fire that fails leaves the plan correct and the work merely
unstarted, for the next write or the owner to pick up.

### 2. How it picks the scheduled task

`orchestration/orchestrator.json` gains a `fire` section: for each
repository, for each role, the task's `trig_` identifier and the name
of the AWS Secrets Manager secret holding its token. Identifiers and
secret names, never tokens, are in git. The service reads the file
from the coordinating repository at the commit it has just written, as
it reads every other repository file.

A node's role comes from its step, as the task loop defines, and its
repository from the `repositories` list the settings file carries. An
offered step with no task for its role and repository is reported to
the owner, not fired.

### 3. Firing at most once

A fire has no idempotency key, so the service keeps the ledger:
`orchestration/journal.jsonl`, which only the service writes, gains a
`fired` line naming the node, the step, the task and the session
answered. The line is written **before** the HTTP call, so a crash
between the two loses a fire rather than making a second one. A lost
fire costs a delay; a duplicate costs a session and a slice of the
hourly limit.

The service does not fire for a node and step while the node has an
open task, within `checkAfterMinutes` of a `fired` line for that pair,
or when two such lines already stand since the node's last close. The
last rule stops a session that opens nothing from being fired forever:
after two attempts the node is reported to the owner.

### 4. The limits

The step limits in `orchestration/orchestrator.json` already bound how
many tasks run at once, counted from the state file's open tasks. The
settings file gains fire limits under the documented caps, counted from
the journal's `fired` lines in the last hour: per task, per account,
and a daily cap, so a fault cannot spend the subscription. On 429 the
service records `Retry-After` and fires nothing for that task until it
passes. At most two fires leave one write; the next takes the rest.

### 5. How a fired session finds its node

The fired session pulls: it calls `task_next` with its role, claims
what it is given, and on a refused claim calls `task_next` again, a
bounded number of times, then ends. Correctness never depends on the
fire's text, which the documentation labels untrusted. The service
sends the node, the step and the commit as `text` all the same, so the
run's History says what it was fired for.

### 6. The token and the deploy role

The three secrets the service holds today reach it as environment
variables CloudFormation resolves at deploy time. Regenerating a fire
token in the web UI revokes the previous one at once, so a token
resolved at deploy time would leave firing broken until the next
deploy. The service therefore reads a fire token at runtime from
Secrets Manager and caches it briefly. That needs
`secretsmanager:GetSecretValue` on the fire secrets on the function's
execution role, which holds no Secrets Manager permission today, and
the deploy role must be allowed to attach it. If the owner would
rather not widen it, the fallback is the deploy-time form the other
three secrets use, and a rotation then needs a deploy.

## What the owner sets up

- **O1. One scheduled task per role and repository**, created in the
  app: its repositories, the role's model as the settings file records
  it, and a saved prompt that names the role, says to call `task_next`
  and claim what it answers, and directs the push to the branch named
  for the task rather than a `claude/` branch.
- **O2. A token for each**, generated once in the task's API trigger
  row and put straight into AWS Secrets Manager, never committed,
  pasted into a session or logged. Its secret's name goes into the
  settings file.
- **O3. The IAM change** of design 6, on the deploy role, with the
  resources written into the service's
  `docs/deploy-role-permissions.md` first, as P4-N046 did; and branch
  protection, if slice 1 shows a fired run pushing where it must not.

## The first slice: the evidence

One scratch run is all there is. Before anything is built in the
service, the owner's scheduled tasks are fired by hand for real offered
nodes, and the record answers:

- whether `task_open` is accepted every time, in both repositories;
- what a fired session pushes and opens unattended, and under which
  branch name;
- what a run that stops on a permission prompt costs: whether the fire
  is spent and whether the node stays claimed;
- a fired session's measured cost against one the owner starts by hand
  for the same step.

Met by its numbers whichever way they fall (RU-019). If the check
refuses a fired session's writes, the rest of this node does not
proceed and the plan changes.

## What becomes of the rest of P2-N027

P2-N030, P2-N031, P2-N032 and P2-N036 are done; nothing here undoes
them, and they stand until slice 4 passes:

- the decision script `orchestrate_next.ts` and the settings file hold
  rules this design reuses. The offered-step rules are already in the
  service's model code, which the plugin consumes as a package (RU-012,
  one canonical copy), so the script stays as the owner's read-only
  view of what would be started;
- the orchestrator role and its watcher stay as the owner's fallback,
  and as the only time-based nudge: nothing here replaces
  `checkAfterMinutes`;
- the delegation rule in both repositories' `CLAUDE.md` and the role
  pages stays until slice 4 passes, then says what the test showed: a
  session does not start another session's task, and a fired session
  claims by `task_next`;
- the helper-session pattern for a second repository is replaced by a
  scheduled task per repository, struck once slice 4 covers it.

P2-N033, the trial, is held on D117 ("Wait"). Its criteria 15, 16 and
18 measure an orchestrator session's own cost and its writes; fired by
the service there is no such session, so they measure nothing. Ask 2
settles what replaces them.

## Children

Five slices in order; the first is evidence and the rest wait on it.

1. **The fired-session trial by hand.** The slice above; no code.
2. **The fire in the service**: designs 1 to 5, its ledger, its limits
   and its tests, behind a setting that is off until the trial passes.
3. **The owner's setup recorded**: the settings file's `fire` section,
   the runbook's steps for adding a task, and the deploy role's
   resources written before the owner applies them.
4. **The end-to-end run**: three nodes from an offered step to done,
   two at once, with no message from the owner, and the cost recorded.
   This is P2-N033 re-pointed, or its successor, by ask 2.
5. **The disposition**: the delegation rule, the role page, the watcher
   and the helper pattern, settled by ask 3 once slice 4 has passed.

## Criteria

1. The service fires only after a write of its own commits, never on a
   timer or a poll, and records each fire in the journal before the
   call, naming the node, the step, the task and the session answered.
2. No node and step is fired while it has an open task, within
   `checkAfterMinutes` of its last fire, or more than twice since its
   last close; the third case is reported to the owner.
3. The fire limits are read from the settings file, counted from the
   journal, and stay under the documented caps; a 429 stops firing for
   that task until `Retry-After` has passed.
4. The service reads no token from git and logs none: the settings file
   names secrets, and a log line names a task and a node, never a
   token.
5. A fired session needs nothing from the fire's text: it claims what
   `task_next` answers, and a refused claim is retried a bounded number
   of times.
6. No model inference runs in the service, and every fired run bills to
   the subscription, which the documentation states of scheduled tasks.
7. Slice 1's record stands before slice 2 is built, with each of its
   four questions answered by what was observed.
8. Slice 4's run carries three nodes from an offered step to done, two
   at once, with no message from the owner to any session, recording
   each session, its node, its model and each stop. Firing costs no
   tokens, and the record sets the fired sessions' costs beside the
   same work started by hand.
9. Once ask 3 is carried out, no page in either repository still tells
   a session to start another session's task, and
   `docs/plans/orchestrator-session.md` points at this document and
   stays under 300 lines.

## Asks

1. **Where does this plan live?** Options: this document, named for
   the node as the `p3-n*` plans are, with a pointer from P2-N027's
   plan; a section inside `docs/plans/orchestrator-session.md`.
   Default: this document, because P2-N027's plan stands at 274 lines
   of its 300-line bound and this plan is longer than the room left.
2. **What replaces P2-N033's criteria 15, 16 and 18?** Options:
   re-point P2-N033 at the fired mechanism, restating 15 and 16 as the
   fired sessions' costs against work started by hand and striking 18;
   keep it as written and make slice 4 a new node. Default: re-point
   it. Changing a node's approved criteria is the owner's.
3. **When is the delegation rule amended, and the role, the watcher
   and the script retired?** Options: after slice 4 passes, in slice 5;
   now, in slice 2. Default: after slice 4. Removing work already done
   on evidence not yet gathered is the risk the test itself showed.
4. **Does any saved prompt act on the fire's text?** Options: no, the
   session pulls with `task_next` and the text is for the record; yes,
   the prompt names the node from the text. Default: no. The
   documentation labels the text untrusted, and anyone holding the
   token can send it.
5. **How many scheduled tasks are set up first?** Options: planner and
   implementer in majodali/project-orchestrator only, the rest once
   slice 1 passes; all roles in both repositories at once. Default: the
   first, because each task is a token and a secret by hand.

## Risks

- **A research preview.** The endpoint, its limits and its token
  semantics may change. The design keeps the call in one place and the
  identifiers in the settings file; the pages are re-read before slice
  2 is built.
- **A leaked token starts sessions with text.** Scoped to firing one
  task and nothing else, per the documentation, and the text arrives
  labelled untrusted. The token lives only in Secrets Manager.
- **A firing loop spends the subscription.** Bounded three ways: the
  per-node attempt cap, the hourly and daily caps from the journal, and
  the step limits that already bound open tasks.
- **A run stalls on a permission prompt** and nobody answers: the node
  stays claimed and the fire is spent. Slice 1 measures it; the attempt
  cap and the open-task check stop it repeating.

## Terms introduced

- **Fire**: one call to the documented endpoint, creating one session
  from a scheduled task the owner stored.
- **Fired session**: the session a fire creates, which pulls its task
  with `task_next`.
