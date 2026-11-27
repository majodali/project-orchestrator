# Orchestrator trial with its measured cost: record (P2-N033)

Reader: the owner, and the sessions that read this node later.
Assumes [the plan](orchestrator-session.md),
[the specification](../specs/orchestrator-session.md),
[P2-N046's plan](p2-n046-service-fired-sessions.md) and
[how we work](../process/how-we-work.md).

## Result

`fire.enabled` went true at T270's close (2026-11-27T09:05:35Z,
merging majodali/project-orchestrator#101 and
majodali/project-orchestrator-service#61). From then to this task's
own fire, the journal records four real fires (a `fired` line paired
with a `fired-session` line) and three bare ones (a `fired` line with
no session that ever opened a task, each reported under the "too many
bare attempts" check and acknowledged by the owner: D173, D174, and a
third that is this task's own claim).

Of the four real fires, exactly one node is carried end to end, from
an offered step to done, by sessions the fire mechanism created:
P2-N083. A second, P2-N082, reaches done with its `verify` step done
by a fired session, but its `execute` step by a session this record
cannot tie to any fire. No two fired sessions ever held an open task
at the same time: every task below runs after the one before it
closes. Criterion 14's bar — three nodes, two of them at once — is
not met by what the journal shows. Measured by output tokens, the
fired `execute` task costs less than two of three hand/delegated
`execute` baselines and more than one; both fired `verify` tasks cost
less than both hand/delegated `verify` baselines measured. Firing
itself costs no tokens: no model runs in the service (P2-N048,
criterion 6, verified at T270).

## Method

Sources: `orchestration/journal.jsonl` and `orchestration/state.json`,
read directly by this task. A `fired` line names the write that
triggered the check; a `fired-session` line, written only on a
successful call, names the session the fire created
(`sessionId`/`sessionUrl`). This task has no tool that reads a
session's own transcript or start reason (`get_session`,
`list_sessions` are not in the implementer role's tool list, as
P2-N047's record already found): where a task's session does not
match a `fired-session` line, this record says so rather than
guessing which way it started.

## Criterion 14 — three nodes carried to done, two at once, no owner message

**The four real fires**, in order:

| Time (UTC) | Fired for | `fired-session` | What it actually claimed |
|---|---|---|---|
| 11:45:49 | P2-N082 execute | `cse_015Vm2MsDUzKccJ96sPiu7Xs` | T272, P2-N083 execute (P2-N082 was not yet claimed by it) |
| 11:46:14 | P2-N083 execute | `cse_015Vm2Mt1UT3ia817i5EPr6s` | no task this record can find; P2-N083 was already T272's by then |
| 11:56:21 | P2-N084 verify | `cse_015Vm2MqQvWz4QMkVyekxAJV` | T273, verify P2-N084 (P2-N083's check node) |
| 12:51:23 | P2-N085 verify | `cse_015Vm2MtSDEdBQi7taAvyCef` | T275, verify P2-N085 (P2-N082's check node) |

**The tasks, in order, none overlapping another:**

| Task | Node | Step | Session | Opened | Closed | Status |
|---|---|---|---|---|---|---|
| T272 | P2-N083 | execute | `session_015Vm2MsDUzKccJ96sPiu7Xs` (fired) | 11:46:28 | 11:56:16 | closed |
| T273 | P2-N084 | verify | `session_015Vm2MqQvWz4QMkVyekxAJV` (fired) | 11:56:51 | 12:01:26 | closed; P2-N083 done |
| T274 | P2-N082 | execute | `session_015Vm2Mt2WTqn8nP9vDv44Fn` (no matching fire) | 12:35:06 | 12:51:17 | closed |
| T275 | P2-N085 | verify | `session_015Vm2MtSDEdBQi7taAvyCef` (fired) | 12:51:56 | 12:56:41 | closed; P2-N082 done |

T272 closes before T273 opens; T273 closes before T274 opens; T274
closes four seconds before T275 opens. No pair of these windows
overlaps. The fire for P2-N083 execute (11:46:14) exists alongside
the one for P2-N082 execute (11:45:49) for about fourteen seconds
before T272 claims P2-N083 — two fired sessions alive at once, but
only one ever holds a task, so this is not two nodes "carried...at
the same time" in the sense the criterion asks for.

**P2-N082's execute step** (T274) is not tied to any fire line: no
`fired` entry names P2-N082 execute between the one at 11:45:49 (which
produced a different session, the one that did T272 instead) and
T274's own open at 12:35:06, a 49-minute gap. The session that did
T274 is therefore not confirmed as fired by anything this task can
read; it may have been started by hand or by delegation. Only
P2-N082's `verify` step (T275) is confirmed fired.

**No message from the owner to any session in between.** Between
T272's open (11:46:28) and T275's close (12:56:41), the journal has no
`decision_close`, `node_update`, `node_add` or other write attributed
to "the owner, in the view": every line in that window is a task's own
`state-written` or `task_cost` entry. The owner's writes to P2-N082 and
P2-N083 (adding them, setting their repository) all precede 11:46:14,
before any of these four tasks opened.

**Conclusion as of the first four fires.** One node (P2-N083) is
carried from an offered step to done entirely by fired sessions. One
more (P2-N082) is carried to done with only its last step confirmed
fired. No two nodes were ever carried at the same time in this
window.

**What happened while this task was open.** This task's own claim
(T277, opened 19:14:14Z by the fired session `cse_015Vm2Mrs6t9RWr7xfkdXUqe`)
overlapped with two further fires that arrived while it was being
written, from the owner's own node_add writes on P2-N086 and its
check node P2-N088:

| Task | Node | Step | Fired session | Opened | Closed |
|---|---|---|---|---|---|
| T276 | P2-N086 | execute | `cse_015Vm2MrovebH7cTciK4EQ7Q` | 19:11:35 | 19:17:23 |
| T277 (this task) | P2-N033 | execute | `cse_015Vm2Mrs6t9RWr7xfkdXUqe` | 19:14:14 | open |
| T278 | P2-N088 | verify | `cse_015Vm2MtYFP9xHkioD9UcUUH` | 19:17:58 | open at this writing |

T276 and T277 both held an open task from 19:14:14 to 19:17:23: two
fired sessions carrying two different nodes at the same time, each
confirmed by a `fired-session` line. T278 then overlapped T277 the
same way from 19:17:58. Both overlaps involve this node, P2-N033
itself, as one of the two — the trial recording itself while it runs,
not two nodes independent of it. P2-N086's own carry is not yet
complete at this writing: its `execute` step closed (T276); its check
node, P2-N088, is open on `verify` (T278) but has not yet closed.

**Conclusion.** Two of this task's three findings now stand: a second
node, P2-N086, is carried by fired sessions through `execute` and (if
T278 closes `closed`) through `verify` to done; and overlapping fired
task windows are now directly observed, not merely untested. What is
still missing is overlap between two nodes *other* than P2-N033:
every overlap seen so far has this trial's own task as one side of
the pair. Criterion 14, read to require three nodes other than the
one doing the recording, two of them overlapping with each other, is
not yet met. Read to allow the recording node itself as one of the
three, it already is, pending T278's close.

## Criterion 15 — each fired session's own cost, and the cost of firing

Measured by `plugin/scripts/lib/task-cost.ts`, via the task-cost hook,
already recorded on each task in `orchestration/state.json`:

| Task | Node | Step | Model | In | Out | Cache read | Cache write |
|---|---|---|---|---|---|---|---|
| T272 | P2-N083 | execute | claude-sonnet-5 | 114 | 29,667 | 6,881,590 | 115,562 |
| T273 | P2-N084 | verify | claude-opus-5 | 56 | 12,008 | 2,295,259 | 69,580 |
| T275 | P2-N085 | verify | claude-opus-5 | 48 | 13,424 | 2,221,235 | 88,729 |

T274 (P2-N082 execute) is left out of the fired column above because
its session is not confirmed fired (Criterion 14); its tokens are 172
in, 72,955 out, 15,547,033 cache read, 201,723 cache write,
claude-sonnet-5, for comparison only.

**The cost of the firing itself is zero tokens.** The fire is one HTTP
call the service makes to the documented endpoint; no model runs
inside the service to make it (P2-N048, criterion 6: "no model
inference runs in the service," verified at T270's close). Met by
that number, whichever way it falls (RU-019): there is no per-fire
token or dollar cost to add beside the sessions' own.

## Criterion 16 — the same work started by hand, as a ratio

Hand/delegated baselines are tasks whose session is not named in any
`fired-session` line and that opened before `fire.enabled` went true
(09:05:35Z) or on a different, unfired node, closed the same day:

**Execute, claude-sonnet-5:**

| Task | Node | Origin | Out |
|---|---|---|---|
| T266 | P2-N073 | hand/delegated | 60,692 |
| T267 | P2-N077 | hand/delegated | 47,341 |
| T269 | P2-N049 | hand/delegated | 25,187 |
| T272 | P2-N083 | **fired** | 29,667 |

Ratio (fired ÷ hand), by output tokens: 0.49, 0.63, 1.18. The fired
execute task costs less than two of the three baselines and more than
the third; one task per step is a single baseline point, not a range,
so "cheaper" or "dearer" is not a settled direction here.

**Verify, claude-opus-5:**

| Task | Node | Origin | Out |
|---|---|---|---|
| T268 | P2-N076 | hand/delegated | 19,348 |
| T270 | P2-N079 | hand/delegated | 22,410 |
| T273 | P2-N084 | **fired** | 12,008 |
| T275 | P2-N085 | **fired** | 13,424 |

Ratio (fired ÷ hand), by output tokens: T273 is 0.62 and 0.54 of the
two baselines; T275 is 0.69 and 0.60. Both fired verify tasks cost
less than both hand/delegated verify tasks measured.

Read plainly: the one fired execute task measured falls inside the
spread of hand-started execute costs; the two fired verify tasks
measured both cost less than the hand-started verify tasks beside
them. Met by these numbers as they fall (RU-019), not by a rule that
a fired task must cost less or more.

## Criterion 17 — struck

Struck in [the specification](../specs/orchestrator-session.md) by
this task, per D124: it measured an orchestrator session being
replaced mid-trial, and the fired mechanism has no orchestrator
session for anything to replace.

## What this leaves for P2-N033

Three findings for the owner, not a gate this task picks a reading of
on its own:

1. One node (P2-N083) is fully carried by fired sessions; a second
   (P2-N086) is carried through `execute` and, pending T278's close,
   may be carried through `verify` to done the same way.
2. Overlapping fired task windows are now directly observed (T276
   with T277; T277 with T278), but every overlap seen has this
   node's own task, T277, as one side. No two nodes *other* than
   P2-N033 have yet overlapped with each other.
3. P2-N082's `execute` step (T274) cannot be confirmed fired or
   hand-started from what this task can read, the same gap P2-N047's
   record hit with T217–T223.

Whether criterion 14 counts P2-N033's own carrying task as one of the
"three nodes... two of them at once" it asks for, or requires the
overlap among nodes other than the one doing the recording, is the
plan's call, not this task's. So is whether to proceed on this record
under RU-019 (as D138 did for P2-N047's short count) or wait for the
service to pair two other nodes' fired tasks before calling criterion
14 met outright.

## Terms introduced

None beyond **Fire** and **Fired session**
([P2-N046's plan](p2-n046-service-fired-sessions.md), Terms
introduced).
