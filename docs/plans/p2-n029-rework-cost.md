# Rework cost against the reviews it replaces (P2-N029)

Status: planned (T214, 2026-11-20). Child of
[the orchestration service](orchestration-service.md), P2-N001. The
measurement half of chunk 3 of
[comprehension and continuous implementation](comprehension-and-continuous-implementation.md),
pulled onto the task loop by the owner, 2026-11-17 (the node's note).
Next step: execute.

<!-- K-007 contract: Status transitions planned → active → (superseded
     by X, because Y | closed → the reading it delivers). Anything
     unmarked here is a live claim of current intent. -->

Reader: the owner, and the session that builds and verifies this node.
It assumes [how we work](../process/how-we-work.md) and the Cost
capture section of [the task loop](../process/task-loop.md).

## Outcome

The cost of each rework is set against the verifications and owner
reviews it replaced, from the tasks' measured costs, so the owner sees
whether longer runs of work without review pay.

## Why

Chunk 3 of the parent plan argues the economics of a longer run:
"longer sequences pay because rework by an assistant beats continual
human review — but only if rework is genuinely cheap. And the trade is
**measurable**: this project logs cost per task, so rework can be
compared against the reviews it displaced." Nothing has read the
figure. The claim decides whether sequence mode (methodology W-001) is
run widely, so it should rest on a number rather than on the
expectation that produced it.

## What the data is, read 2026-11-20

Observation over `orchestration/state.json` and
`orchestration/journal.jsonl` at commit 4be070b, not proposal.

- 202 tasks; 79 carry a measured cost, every one with
  `costSource: transcript`. Nothing is `headless` or `reported`.
  Measurement starts at decision 13, 2026-11-11; the tasks before it
  carry null token fields.
- 25 verify tasks, of which 4 closed `blocked`: T138 (check node
  P4-N033, work node P4-N024), T151 (P4-N041, P4-N026), T174
  (P4-N048, P4-N044), T180 (P2-N045, P2-N032).
- Three of the four were followed by execute tasks on the work node:
  T152; T175 and T176; T182. T138 was followed by a second
  verification, T139, with no execute task between, so a failed
  verification does not always produce a rework task.
- A rework can span more than one task: T175 closed `needs-judgment`
  and T176 finished that round.
- Every task in that set — the four failed verifications, the four
  execute tasks that followed, and each round's second verification —
  carries a measured cost. The sample that matters falls inside the
  measured window.
- 108 decisions, all closed. A decision's `decided` is a date with no
  time, but the journal carries a `decision_close` line whose `ts` is
  to the second.

This settles a doubt the parent plan recorded. Its register review
called the Cost log "one field short": rows said in prose that a task
was rework and nothing said what it was rework *of*. On the task loop
no field is needed, because the rework is derivable.

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

The rule reads only fields the schema already carries, so the node
needs no schema change and no change to the service.

## What is compared

Three figures per round, from the tasks' measured costs:

- **Rework cost**: the round's rework tasks plus its re-verification.
  A reviewer's second look at work it has already judged is part of
  the price of not reviewing earlier.
- **The review that found it**: the failed verification.
- **The first pass**: so a round's rework reads as a share of the work
  it corrects.

Two figures per project: how often a verification fails (failed
verifications over verifications), and rework cost as a share of
execute cost.

**Owner reviews are a second currency, and that is this plan's one
ask.** A verification costs tokens; an owner review costs the owner's
attention and wall-clock, and no token count exists for it. This plan
invents no exchange rate. Its default is to report the owner side in
its own units — how many decisions a run raised, and how long each
waited, from the close of the task that raised it to its
`decision_close` line in the journal — beside the token figures, and
to let the owner read the trade. Ask 1 carries the alternatives.

## What the node delivers

1. A script in this repository, `plugin/scripts/rework_cost.ts`
   (RU-011, TypeScript/Node), which reads `orchestration/state.json`
   and `orchestration/journal.jsonl`, writes nothing, and prints the
   figures above per round and per project.
2. A committed reading, `docs/plans/p2-n029-rework-cost-record.md`,
   naming the commit it was read at, the command, the output and a
   conclusion in one paragraph.

**Why a script and not a reading alone.** The sample is four rounds,
so any conclusion today is provisional, and the owner's question
returns every time the project considers a longer run. Re-reading must
cost one command.

**Why not the view.** The plan view is P2-N028's line and shows the
plan, not the cost. A panel there is worth a node of its own once the
figure has been read more than once; this node builds none.

**Why a file and not the node's note.** D105, D108 and D114 put a
small node's criteria in its note, each because
`docs/plans/rebuild.md` stood at its 300-line bound. This node carries
a derivation rule, a two-currency framing and P3-N004's disposition,
which a note does not hold. The per-node plan file follows P2-N046's.

**Repository access (RU-016):** this repository only.

## What remains of P3-N004

P3-N004 "Reversibility and its measurement" keeps its mechanism half
and stays under the hold on P3-N001 until that line is re-planned.
This node takes the measurement and nothing else. On the other half:

- **Undoing a node that is not yet done is already cheap, and needs
  no work of its own.** A node's work sits in pull requests that merge
  only when its verification closes `closed`; a failed verification
  returns the node to `execute` with no owner action; an obsolete node
  is removed and git keeps its history (task-loop.md).
- **Undoing a node that is done has no path.** Its pull requests are
  merged. Nothing in the loop reverts a merged node, and nothing
  records what consumed its result, so the blast radius is read by
  hand. That is the half worth work, and it needs the recorded
  dependency edges of P3-N002 first — which is why P3-N004 already
  stands `after` P3-N002.

So making work cheap to undo needs work of its own only for the done
case, and that work waits on chunk 1. Nothing here changes P3-N004;
its disposition belongs to the P3 re-planning.

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
5. A round with no rework task is reported as one, and T138 on
   P4-N033 appears as such.
6. A round whose rework spans several tasks is summed, and P4-N044's
   round shows T175 and T176.
7. The report gives, per project, the number of verifications, the
   number that failed, and rework cost as a share of execute cost,
   each recorded whichever way it falls (RU-019).
8. A task with no measured cost counts as unmeasured, never as zero,
   and every figure says how many of its tasks were unmeasured.
9. The owner side is reported in the form the answer to ask 1 records,
   and the report names that decision.
10. Where the owner side is measured in time, a decision's wait runs
    from the close of the task that raised it to its `decision_close`
    line in the journal, and a decision with no such line is reported
    as unmeasured.
11. A test under `test/` covers the derivation over a fixture holding
    a round with a rework, a round with none, a round whose rework
    spans two tasks, and a node with two rounds.
12. The script preflights its Node version and exits non-zero naming
    what was required and what was found (RU-013).
13. `npm run lint`, `npm run format`, `npm test` and `npm run check`
    pass, and `npm run check` reports no violation.
14. The reading at `docs/plans/p2-n029-rework-cost-record.md` names
    the state file's commit, the date, the command, and the script's
    output as it ran.
15. The reading states a conclusion in one paragraph: on these
    figures, whether a rework costs less than the review it replaced,
    and what that says about a longer run without review.
16. The reading states its sample size and that a conclusion drawn
    from four rounds is provisional.
17. The reading states the instrument's limits, citing task-loop.md,
    Cost capture, and naming at least: tasks closed before
    2026-11-11, a task opened in one session and closed in another,
    and the transcript's undocumented format.
18. The pull request changes none of the five files the service owns,
    and CI passes.
19. This document and the reading are each at most 300 lines.

## Asks

1. **How do owner reviews enter the comparison, given that no token
   count exists for them?**
   - Count and time them, with no exchange rate: the report gives the
     number of owner decisions a run raised and how long each waited,
     beside the token figures. *(default)*
   - Name an exchange rate: the owner gives a token-equivalent for one
     owner review, and the report prints one net figure.
   - Leave the owner side out: compare a rework against the agent
     verification it replaced, and nothing else.

## Risks

- **Four rounds is a thin sample**, and a conclusion from it can flip.
  Answered by the script, so a re-read costs one command, and by
  criterion 16.
- **The cost figure has its own limits**, listed in task-loop.md, Cost
  capture. Answered by criteria 8 and 17.
- **A round's boundary is a derivation, not a record.** Corrective
  work that no failed verification sent back — a task continued after
  `needs-judgment`, for one — is not counted as rework, and should not
  be. Stated so the figure is not read as all corrective work.

## Terms introduced

- **Rework round**: one failed verification, the execute tasks it sent
  back, and the verification that closed it.
- **First pass**: a node's execute tasks before its first failed
  verification.
- **Owner side**: the part of the comparison measured in the owner's
  attention and wall-clock rather than in tokens.

## References

- [Comprehension and continuous implementation](comprehension-and-continuous-implementation.md)
  — chunk 3, the argument this node measures, and the register review
  that called the Cost log one field short
- [Orchestration service](orchestration-service.md) — P2-N001, the
  parent
- [The task loop](../process/task-loop.md) — Cost capture, and the
  merge rules that make an unaccepted node cheap to undo
- [The state model](../process/state-model.md) — the task fields the
  derivation reads
- methodology **W-001** (two delivery modes, human-gated) — the mode
  whose economics this figure tests
- RU-013 (a tool preflights its runtime), RU-016 (the planner declares
  repository access), RU-019 (a measurement is met by its record)
