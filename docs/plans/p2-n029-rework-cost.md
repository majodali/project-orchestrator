# Rework cost against the reviews it replaces (P2-N029)

Status: specified (T215, 2026-11-20); planned by T214. Child of
[the orchestration service](orchestration-service.md), P2-N001. The
measurement half of chunk 3 of
[comprehension and continuous implementation](comprehension-and-continuous-implementation.md),
pulled onto the task loop by the owner, 2026-11-17 (the node's note).
Next step: execute. T215 folded T214's one ask, answered as D126 with
the owner's widening of 2026-11-20, into the criteria.

<!-- K-007 contract: Status transitions planned → active → (superseded
     by X, because Y | closed → the reading it delivers). Anything
     unmarked here is a live claim of current intent. -->

Reader: the owner, and the session that builds and verifies this
node. It assumes [how we work](../process/how-we-work.md) and
[the task loop](../process/task-loop.md), Cost capture.

## Outcome

The cost of each rework is set against the verifications and owner
reviews it replaced, from the tasks' measured costs, so the owner sees
whether longer runs of work without review pay.

## Why

Chunk 3 of the parent plan argues the economics of a longer run:
"longer sequences pay because rework by an assistant beats continual
human review — but only if rework is genuinely cheap. And the trade
is **measurable**: this project logs cost per task." Nothing has read
the figure, and the claim decides whether sequence mode (methodology
W-001) is run widely, so it should rest on a number.

## What the data is, read 2026-11-20

Observation over `orchestration/state.json` and
`orchestration/journal.jsonl` at commit 4be070b, not proposal.

- 202 tasks; 79 carry a measured cost, every one `costSource:
  transcript`. Measurement starts at D013, 2026-11-11; earlier tasks
  carry null token fields.
- 25 verify tasks, of which 4 closed `blocked`: T138 (check node
  P4-N033, work node P4-N024), T151 (P4-N041, P4-N026), T174
  (P4-N048, P4-N044), T180 (P2-N045, P2-N032).
- Three were followed by execute tasks on the work node: T152; T175
  and T176; T182. T138 was followed by a second verification, T139,
  with none between, so a failed verification does not always produce
  a rework task, and a rework can span two tasks (T175 closed
  `needs-judgment`, T176 finished the round).
- Every task in that set carries a measured cost, so the sample that
  matters falls inside the measured window.

This settles a doubt the parent plan recorded. Its register review
called the Cost log "one field short": a row said in prose that a
task was rework and nothing said what it was rework *of*. On the task
loop no field is needed: the rework is derivable.

## How a rework is identified, with no new field

For a work node W:

1. Order W's tasks and the tasks of W's check nodes by `opened`.
2. A verify task on a check node of W that closed `blocked` opens a
   **rework round**. That failed verification is the round's finder.
3. The execute tasks on W opened after that close, up to the close of
   the next verify task on a check node of W, are the round's rework
   tasks. There may be none.
4. The verify task that closes the round is its re-verification.
5. W's execute tasks before its first failed verification are its
   **first pass**.

The rule reads only fields the schema carries.

## What is compared

Three figures per round, from the tasks' measured costs:

- **Rework cost**: the round's rework tasks plus its re-verification,
  because a reviewer's second look at work it has already judged is
  part of the price of not reviewing earlier.
- **The review that found it**: the failed verification.
- **The first pass**: so the rework reads as a share of the work it
  corrects.

Two per project: how often a verification fails (failed
verifications over verifications), and rework cost as a share of
execute cost.

**Owner reviews are the second currency, and D126 says how they
enter.** No token count exists for one. D126 takes the plan's
default: count and time the owner side in its own units, beside the
token figures, with **no exchange rate**. The owner widened it the
same day — "what we really want to work out is the cost of rework vs
the cost of waiting" — in three requirements:

1. **Waiting, not effort.** A decision's wait is the time its node
   stood blocked, from the close of the task that raised the question
   to the line recording the answer. It is never reported as the
   owner's effort: the owner may answer in a minute of a day's wait.
2. **The share answered with the default.** The nearest figure the
   data offers for what a review changed: a decision answered with
   its default changed nothing a session had not already proposed.
3. **Merge requests apart from judgement questions.** Asking the
   owner to merge is a different act from asking a judgement, and one
   count over both hides both.

No figure combines the two currencies. The owner reads the trade.

## How the owner side is read, with no new field

Observation at commit b2c617e over the same two files, not proposal:
204 tasks, 109 decisions, all closed.

- **The line that records an answer.** The journal carries no
  `decision_close` event. A decision's close is a `state-written`
  line whose `note` begins `decision_close <id>:`, with `ts` to the
  second and `session` "the owner, in the view". 66 of the 109 carry
  one; the rest are the `RU-*` rulings and early `D0xx` imports,
  which predate the journal, 19 of them named nowhere in it.
- **The task that raised it.** No field ties a decision to the task
  whose `asks` opened it, and `decision_open` lines exist for two
  decisions only, so it derives: the raising task is the task on the
  decision's node with the latest `closed` before the answer line.
  The loop makes that sound, because an open decision stops its node
  offering a step, so no second task on it closes while the question
  waits. A decision whose node has no such task is unmeasured.
- **Merge request or judgement question.** No field says which, so it
  derives from the question: a merge request begins "Merge" and names
  a pull request as `#<number>`. At b2c617e that is 9 decisions, and
  of the other 100 two mention a merge without being one, which the
  rule leaves where they belong. It reads prose, so the reading
  checks it by hand (criterion 12).
- **The default.** `chosen` equals `default`, over the 83 decisions
  that carry a default; the 26 without one are counted apart.

So the owner side reads lines and fields that already exist; the node
needs no schema change.

## What the node delivers

1. A script, `plugin/scripts/rework_cost.ts` (RU-011,
   TypeScript/Node), which reads the two files, writes nothing, and
   prints the figures above per round and per project.
2. A committed reading, `docs/plans/p2-n029-rework-cost-record.md`,
   naming the commit it was read at, the command, the output and a
   conclusion in one paragraph.

**Why this shape.** Four rounds make any conclusion provisional and
the question returns whenever a longer run is considered, so
re-reading must cost one command: a script, not a reading alone. The
plan view (P2-N028's line) shows the plan, not the cost, and a panel
there is worth its own node once the figure has been read twice. The
criteria go in a file rather than the node's note, as D105, D108 and
D114 chose for small nodes, because two derivation rules, a
two-currency framing and P3-N004's disposition do not fit a note; the
file follows P2-N046's.

**Repository access (RU-016):** this repository only.

## What remains of P3-N004

P3-N004 "Reversibility and its measurement" keeps its mechanism half
and stays under the hold on P3-N001 until that line is re-planned;
this node takes the measurement and nothing else. On the other half:
a node not yet done is already cheap to undo and needs no work of its
own, because its pull requests merge only when its verification
closes `closed`, a failed verification returns it to `execute` with
no owner action, and an obsolete node is removed with git keeping its
history (task-loop.md). A node that is done has no path back — its
pull requests are merged, nothing reverts them, and nothing records
what consumed its result, so the blast radius is read by hand. That
is the half worth work, and it needs P3-N002's dependency edges
first, which is why P3-N004 already stands `after` it. Nothing here
changes P3-N004.

## Criteria

1. `plugin/scripts/rework_cost.ts` runs over this repository with no
   argument and prints the report; run twice, `git status` is clean,
   and the script calls no tool that writes.
2. The script's header states the rework-round rule above, and the
   code implements it reading only fields the schema already carries.
3. The report names each rework round: the work node, the failed
   verification, the rework tasks, the re-verification, and the model
   of each task.
4. The report gives, per round, the rework cost, the failed
   verification's cost and the first pass's cost, each as tokens by
   type (input, output, cache read, cache write), never money.
5. A round with no rework task is reported as one, T138 on P4-N033
   appears as such, and a round whose rework spans several tasks is
   summed, P4-N044's round showing T175 and T176.
6. The report gives, per project, the number of verifications, the
   number that failed, and rework cost as a share of execute cost,
   each recorded whichever way it falls (RU-019).
7. A task with no measured cost counts as unmeasured, never as zero,
   and every figure says how many of its tasks were unmeasured.
8. The owner side is reported in its own units, as D126 records, and
   the report names D126. No figure anywhere in the script or the
   reading combines tokens with a count of decisions or with time:
   there is no exchange rate and no net figure.
9. A decision's wait runs from the close of the task that raised it
   to the line that records its answer, and the report labels that
   figure the time the node stood blocked, never the owner's effort.
10. The report reads an answer line as a journal line whose `note`
    begins `decision_close <id>:`, derives the raising task as the
    task on the decision's node with the latest `closed` before that
    line, and reports as unmeasured, with a count, any decision with
    no such line or no such task.
11. The report gives the share of decisions answered with their
    default, over the decisions that carry one, and counts those with
    no default apart from that share.
12. Merge requests are reported apart from judgement questions, each
    class with its own count, waits and default share; the script's
    header states the rule that separates them, the report lists the
    identifiers in each class, and the reading names every decision
    the rule places wrongly, from a check by hand over all 109.
13. A test under `test/` covers the derivations over a fixture
    holding a round with a rework, a round with none, a round whose
    rework spans two tasks, a node with two rounds, a decision with
    an answer line and a raising task, one with no answer line, a
    merge request, and a decision answered against its default.
14. The script preflights its Node version and exits non-zero naming
    what was required and what was found (RU-013), and `npm run
    lint`, `npm run format`, `npm test` and `npm run check` pass with
    no violation reported.
15. The reading at `docs/plans/p2-n029-rework-cost-record.md` names
    the state file's commit, the date, the command, and the script's
    output as it ran.
16. The reading states a conclusion in one paragraph, in the owner's
    terms: what a rework cost against the review it replaced, what
    the waiting cost beside it, and what the two say about a longer
    run without review.
17. The reading states its sample size, that a conclusion drawn from
    four rounds is provisional, and the instrument's limits, citing
    task-loop.md, Cost capture, and naming at least: tasks closed
    before 2026-11-11, a task opened in one session and closed in
    another, and the transcript's undocumented format. Criteria 6, 7,
    10 and 11 are met by the numbers they record (RU-019).
18. The pull request changes none of the five files the service owns,
    and CI passes.
19. This document and the reading are each at most 300 lines.

## Asks

None open. T214's one ask — how owner reviews enter the comparison,
given that no token count exists for them — is answered as **D126**,
2026-11-20: count and time them, with no exchange rate, beside the
token figures. The owner widened it in the node's note the same day
with the three requirements under "What is compared", which criteria
8 to 12 carry. The owner also said a scratch project is wanted later,
where approaches are tested against each other; that is not this
node.

## Risks

- **Four rounds is a thin sample**: a conclusion can flip, so the
  script makes a re-read cost one command, and criterion 17 says so.
- **The cost figure has its own limits**, listed in task-loop.md,
  Cost capture. Answered by criteria 7 and 17.
- **The owner side is derived from prose and from lines missing for
  some decisions**: the merge-request class is read from wording, and
  43 of 109 decisions have no answer line to time. Answered by
  criteria 10 and 12 — the classes are listed, the rule is checked by
  hand, and an untimeable decision is unmeasured, not nil.
- **A round's boundary is a derivation, not a record.** Corrective
  work no failed verification sent back — a task continued after
  `needs-judgment`, for one — is not rework here, and should not be.
  Stated so the figure is not read as all corrective work.

## Terms introduced

- **Rework round**: one failed verification, the execute tasks it
  sent back, and the verification that closed it.
- **First pass**: a node's execute tasks before its first failed
  verification.
- **Owner side**: the part of the comparison measured in the owner's
  attention and wall-clock, not in tokens.
- **Waiting**: for one decision, the time its node stood blocked on
  it, from the close of the task that raised it to its answer line.
- **Merge request**: a decision whose first sentence asks the owner to
  merge a named pull request. **Judgement question**: any other.
- **Answer line**: the journal line whose `note` begins
  `decision_close <id>:`, the only record, to the second, of an answer.

## References

- [Comprehension and continuous implementation](comprehension-and-continuous-implementation.md)
  — chunk 3, the argument this node measures, and the register review
  that called the Cost log one field short
- [Orchestration service](orchestration-service.md) — P2-N001, the parent
- [The task loop](../process/task-loop.md) — Cost capture, and the
  merge rules that make an unaccepted node cheap to undo
- [The state model](../process/state-model.md) — the task and
  decision fields the derivations read
- methodology **W-001** (two delivery modes, human-gated) — the mode
  whose economics this figure tests
- **D126** (count and time the owner side, no exchange rate), with the
  owner's widening of 2026-11-20 in the node's note — criteria 8 to 12
- RU-013 (a tool preflights its runtime), RU-016 (the planner declares
  repository access), RU-019 (a measurement is met by its record)
