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

**This record is now final** (T289, adding the two fired tasks, T283
and T285, that closed after T284 and carried P2-N087 to done). Since
`fire.enabled` went true, three nodes other than P2-N033 are carried
from an offered step to done by fired sessions: P2-N083, P2-N086 and
P2-N087. Only P2-N083's carry is clear of any owner message in
between; P2-N086's and P2-N087's each have owner writes inside their
carrying window. No two of these three nodes have ever held an open
task at the same time — every overlap the journal shows has
P2-N033's own recording task as one side. Criterion 14 now clears its
"three nodes" bar but not its "two at once" bar: this record proceeds
on that finding under RU-019 rather than holding for a cleaner case,
as D138 did for P2-N047's short count. Measured by output tokens, the
fired `execute` tasks span a wider range than the hand/delegated
baselines and show no consistent direction; three of five fired
`verify` tasks cost less than both hand/delegated `verify` baselines,
the other two fall inside their range. Firing itself costs no tokens:
no model runs in the service (P2-N048, criterion 6, verified at
T270).

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

**What happened while T277 was open.** T277 (opened 19:14:14Z by the
fired session `cse_015Vm2Mrs6t9RWr7xfkdXUqe`) overlapped with two
further fires that arrived while it was being written, from the
owner's own node_add writes on P2-N086 and its check node P2-N088:

| Task | Node | Step | Fired session | Opened | Closed | Status |
|---|---|---|---|---|---|---|
| T276 | P2-N086 | execute | `cse_015Vm2MrovebH7cTciK4EQ7Q` | 19:11:35 | 19:17:23 | closed |
| T277 | P2-N033 | execute | `cse_015Vm2Mrs6t9RWr7xfkdXUqe` | 19:14:14 | 19:21:18 | needs-judgment (D178, D179) |
| T278 | P2-N088 | verify | `cse_015Vm2MtYFP9xHkioD9UcUUH` | 19:17:58 | 19:22:27 | closed; P2-N086 done |

T276 and T277 both held an open task from 19:14:14 to 19:17:23: two
fired sessions carrying two different nodes at the same time, each
confirmed by a `fired-session` line. T278 then overlapped T277 the
same way from 19:17:58 to 19:21:18. Both overlaps involve this node,
P2-N033 itself, as one of the two — the trial recording itself while
it runs, not two nodes independent of it. P2-N086 is now carried to
done entirely by fired sessions: `execute` (T276) and `verify` (T278,
P2-N088) both match a `fired-session` line.

**P2-N086's carry is not clear of an owner message.** Checking the
same way T277 checked P2-N083's window: between T276's open
(19:11:35) and T278's close (19:22:27), the journal has two writes
attributed to the owner — `decision_close` D176 at 19:12:18 ("the
owner, in the view"), and the `node_add`/`node_update` pair adding
P2-N087 at 19:16:15–19:16:23, written by a session acting on the
owner's own instruction ("add the node for A"). Unlike P2-N083's
window, P2-N086's carry has owner messages in between, even though
every step of it was itself fired.

**Further fires since T278.** The journal records five more real
fires through this task's own claim, none overlapping another node's
task window:

| Task | Node | Step | Fired session | Opened | Closed | Status |
|---|---|---|---|---|---|---|
| T279 | P2-N087 | execute | `cse_015Vm2MsiVzHySxmdMWJGsGo` | 20:02:21 | 20:20:50 | closed |
| T280 | P2-N089 | verify | `cse_015Vm2MtyoXFky4xg3n276iY` | 20:21:24 | 20:26:49 | blocked (P2-N087 offered `execute` again, rework) |
| T282 | P2-N073 | execute (resume) | `cse_015Vm2MujusejBf3ysNcP5qP` | 23:27:09 | 23:29:03 | blocked (D182) |
| T283 | P2-N087 | execute (rework) | `cse_015Vm2Mt8HUbhmL7oZsM9WY8` | 23:33:26 | 23:38:59 | closed |
| T285 | P2-N089 | verify (rework) | `cse_015Vm2Ms9uvrJpj6wN8HwTwP` | 23:39:36 | 23:45:14 | closed; P2-N089 done, P2-N087 done |

T280's verification failed (criterion 5 of P2-N087), sending it back
for the rework T283 fixed; T285 then verified that rework and closed
P2-N089, which carried P2-N087 to done, 2026-11-27. Both of P2-N087's
steps now match a `fired-session` line. T281 (22:34:14–22:41:18, also
on P2-N073) stays excluded: its session,
`cloud-session-db52c044-implementer`, matches no `fired-session`
line. P2-N087's carry is not clear of an owner message: between
T279's open (20:02:21) and T285's close (23:45:14) the journal has
several writes attributed to "the owner, in the view" — `decision_close`
D175, D168, D181, D180, D178, D179 and D177 all fall in that window.

**Conclusion.** Since `fire.enabled` went true, three nodes other than
P2-N033 are carried to done entirely by fired sessions: P2-N083,
P2-N086 and P2-N087. Only P2-N083's carry is clear of any owner
message in between; P2-N086's and P2-N087's are not. No two of these
three nodes have ever held an open task at the same time — every
overlap observed (T276/T277, T277/T278) has this recording node's own
task as one side, which D178 settled does not count toward the "two
at once" criterion 14 asks for.

**Criterion 14 is not met.** The "three nodes carried to done" part
is now cleared, but no two of those three nodes have ever overlapped
each other, so the "two of them at once" part is not, and only one of
the three is clear of an owner message in between. By D179, this
record proceeds on that finding under RU-019 (as D138 did for
P2-N047's short count) rather than holding P2-N033 open for a cleaner
case.

## Criterion 15 — each fired session's own cost, and the cost of firing

Measured by `plugin/scripts/lib/task-cost.ts`, via the task-cost hook,
already recorded on each task in `orchestration/state.json`:

| Task | Node | Step | Model | In | Out | Cache read | Cache write |
|---|---|---|---|---|---|---|---|
| T272 | P2-N083 | execute | claude-sonnet-5 | 114 | 29,667 | 6,881,590 | 115,562 |
| T273 | P2-N084 | verify | claude-opus-5 | 56 | 12,008 | 2,295,259 | 69,580 |
| T275 | P2-N085 | verify | claude-opus-5 | 48 | 13,424 | 2,221,235 | 88,729 |
| T276 | P2-N086 | execute | claude-sonnet-5 | 138 | 20,636 | 7,756,373 | 103,449 |
| T278 | P2-N088 | verify | claude-opus-5 | 40 | 13,268 | 1,678,993 | 72,872 |
| T279 | P2-N087 | execute | claude-sonnet-5 | 282 | 74,878 | 26,806,761 | 233,529 |
| T280 | P2-N089 | verify | claude-opus-5 | 52 | 21,944 | 2,425,594 | 97,663 |
| T282 | P2-N073 | execute (resume) | claude-sonnet-5 | 26 | 9,520 | 1,091,838 | 78,678 |
| T283 | P2-N087 | execute (rework) | claude-sonnet-5 | 100 | 19,958 | 5,585,643 | 103,801 |
| T285 | P2-N089 | verify (rework) | claude-opus-5 | 46 | 19,523 | 2,310,548 | 101,982 |

T274 (P2-N082 execute) and T281 (P2-N073 execute) are left out of the
fired rows above because neither session is confirmed fired
(Criterion 14): T274's tokens are 172 in, 72,955 out, 15,547,033 cache
read, 201,723 cache write, claude-sonnet-5; T281's are 94 in, 23,689
out, 5,519,185 cache read, 112,714 cache write, claude-sonnet-5; both
for comparison only.

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
| T276 | P2-N086 | **fired** | 20,636 |
| T279 | P2-N087 | **fired** | 74,878 |
| T282 | P2-N073 | **fired** (resume) | 9,520 |
| T283 | P2-N087 | **fired** (rework) | 19,958 |

Hand/delegated execute costs range 25,187–60,692 output tokens across
three tasks; fired execute costs now range 9,520–74,878 across five.
The fired range contains the whole hand range rather than sitting
above or below it: three fired tasks (T276, T282, T283) cost less
than every hand baseline, one (T272) falls inside the hand range, and
one (T279) costs more than every hand baseline. No consistent
direction holds.

**Verify, claude-opus-5:**

| Task | Node | Origin | Out |
|---|---|---|---|
| T268 | P2-N076 | hand/delegated | 19,348 |
| T270 | P2-N079 | hand/delegated | 22,410 |
| T273 | P2-N084 | **fired** | 12,008 |
| T275 | P2-N085 | **fired** | 13,424 |
| T278 | P2-N088 | **fired** | 13,268 |
| T280 | P2-N089 | **fired** | 21,944 |
| T285 | P2-N089 | **fired** (rework) | 19,523 |

Three of five fired verify tasks (T273, T275, T278) cost less than
both hand/delegated verify tasks measured; the other two (T280, T285)
fall inside their range (19,348–22,410). No fired verify task
measured costs more than both hand baselines.

Read plainly: fired verify tasks consistently cost at or below the
hand-started verify tasks measured; fired execute tasks span a wider
range than the hand-started execute tasks measured, with examples on
both sides. Met by these numbers as they fall (RU-019), not by a rule
that a fired task must cost less or more.

## Criterion 17 — struck

Struck in [the specification](../specs/orchestrator-session.md) by
this task, per D124: it measured an orchestrator session being
replaced mid-trial, and the fired mechanism has no orchestrator
session for anything to replace.

## What this record settles for P2-N033

D178 and D179 (T277) and D183 and D184 (T284) are already answered
and carried out, confirmed at T287. This task (T289) adds T283 and
T285, the two fired tasks that closed after T284 and carried P2-N087
to done, 2026-11-27.

What the finished record shows:

1. Three nodes other than P2-N033 are carried from an offered step to
   done entirely by fired sessions: P2-N083, P2-N086 and P2-N087.
   Only P2-N083's carry is clear of any owner message in between.
2. No two of those three nodes have ever held an open task at the
   same time. Every overlap the journal shows (T276/T277, T277/T278)
   has P2-N033's own task as one side.
3. P2-N082's `execute` step (T274) and P2-N073's first resumed
   attempt (T281) stay unconfirmed as fired or hand-started from what
   this task can read, the same gap P2-N047's record hit with
   T217–T223.

Criterion 14 is not met: the "three nodes" part is now cleared, but
the "two of them at once" part is not, since no two of those three
nodes have ever overlapped. Criteria 15 and 16 are met by the numbers
recorded above, whichever way they fall (RU-019). The outcome
sentence (D184) and the last act (D183, D075: P3-N015 and P3-N020
removed, P3-N016 waits for P2-N027) were both already carried out by
the owner, 2026-11-28, and confirmed at T287; nothing further is open
on either.

## Terms introduced

None beyond **Fire** and **Fired session**
([P2-N046's plan](p2-n046-service-fired-sessions.md), Terms
introduced).
