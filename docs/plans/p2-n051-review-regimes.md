# Scratch project that compares review regimes (P2-N051)

Status: planned (T223, 2026-11-21). Child of
[the orchestration service](orchestration-service.md), P2-N001. Asked
for by the owner, 2026-11-20, answering D126 on P2-N029 (the node's
note). Next step: specify.

<!-- K-007 contract: Status transitions planned → active → (superseded
     by X, because Y | closed → the record it delivers). Anything
     unmarked here is a live claim of current intent. -->

Reader: the owner, and the sessions that specify, break down, build
and verify this node. It assumes [how we work](../process/how-we-work.md),
[the task loop](../process/task-loop.md) (Cost capture) and
[P2-N029's plan](p2-n029-rework-cost.md), whose derivations it reuses
rather than restates.

## Outcome

A scratch project runs one fixed node set under three review regimes
from the same starting state, and a record sets each regime's cost,
rework and waiting against the quality of the work it produced.

## Why

The owner, answering D126: "What we really want to work out is the
cost of rework vs the cost of waiting. The key to all this is getting
the right criteria/validations up front for higher level nodes and
enabling looping on lower level nodes. ... we'll need a scratch
project where we test different approaches directly against each
other."

P2-N029 reads what already happened here: four rework rounds under
one regime, on nodes of all different sizes, so it cannot separate
the regime from the node. A comparison needs the same work run twice,
with one thing changed.

## What a regime is

A regime is three things, and nothing else:

1. **What the parent's specify step fixes** before any child starts:
   nothing, or every child's criteria and validation cases.
2. **What the reviewer is told to check**: every criterion itself,
   the named criteria and cases only, or the cases alone.
3. **What reaches the answerer**: every ask a session raises, or only
   an ask about criteria that contradict each other.

All three are carried by each role's saved prompt and the criteria in
the scratch project's plan, plus the settings values
`maxReworkRounds` and `limits`. **The service's rules do not change
between regimes**: each uses the loop exactly as
[the task loop](../process/task-loop.md) specifies, so this node
builds nothing in the service and deviates from nothing.

## The three regimes

- **A — gate at every node.** Today's practice, the baseline. The
  parent is planned, specified and broken down; each leaf is planned
  and specified as its own task, then executed and verified by the
  reviewer page as it stands; every ask reaches the answerer.
  `maxReworkRounds` 2.
- **B — criteria up front, loop below.** The parent's specify step
  writes every leaf's criteria and validation cases, and the leaves
  enter `specified` at that gate (RU-020), so no leaf has a plan or a
  specify task. Each leaf is executed and verified; the reviewer
  checks the named criteria and cases and nothing else. An ask is
  raised only where criteria contradict each other or the suite.
  `maxReworkRounds` 4, so the loop runs below rather than returning
  to the answerer.
- **C — validation below, one review above.** As B, except that a
  leaf's reviewer runs the leaf's validation cases and nothing else,
  on the cheapest model the role allows; one full verification runs
  at the parent against its criteria, and its failure returns the
  named leaf to `execute`. `maxReworkRounds` 4. C's thin reviewer is
  a prompt and a model, not a service change: a check node still
  stands under every leaf and a reviewer still closes it.

## The node set

One parent and four leaves: a small command-line tool in
TypeScript/Node (RU-008, RU-011), each leaf a few minutes of work
with an observable result and room for real error, the set leading
with a thin slice that runs end to end.

- **L1** the command reads a file, prints each line, sets exit codes.
- **L2** parsing of the line format into records; **L3** a filter
  over the records, by an argument. Both after L1.
- **L4** the output format and the round trip L2 → L4. After L2, L3.

The target is identical in every regime, because the **acceptance
suite** is committed before any run and names each leaf's cases. What
changes is where a leaf's criteria are written and who checks them,
never what the finished tool must do. A cheaper regime that produces
worse work must not read as a win, so quality is scored by a
**withheld check**: cases the sessions never see, held in this
repository, which a scratch session cannot read because its scheduled
task clones the scratch repository only.

## How a run is scored

A **regime run** is one regime over the whole node set from the reset
point. Per run the record carries: tokens by type per task and
summed, from the state file's measured costs; the rework rounds,
rework cost, failed-verification cost and first-pass cost by
P2-N029's rework-round rule; the decisions raised, merge requests
apart from judgement questions, with their waits and default share by
P2-N029's derivations; the wall-clock from the first `task_open` to
the last node `done`, and the sessions started; and the acceptance
suite's result and the withheld check's failures, per leaf. No figure
combines tokens with a count of decisions or with time: D126 settled
that there is no exchange rate and no net figure, and the owner reads
the trade.

**Runs are kept comparable** by the same node set, acceptance suite
and reset point, one run at a time, and the same model per role in
every regime — except C's leaf reviewer, whose model is part of C's
definition and is recorded as such. Each run records the service's
commit, the plugin's commit and every task's model. The **reset
point** is a tag in the scratch repository; a reset returns the state
file, the journal, the renderings and the worktree to it, and runs
before every regime run.

## Where it lives, and who answers a run's decisions

The scratch project needs its own repository and state file: runs
reset the state file, which no real project survives. One instance of
the service serves one project today, so it needs an instance too.
The repository is new to the project and the instance route is the
owner's: asks 1 and 2. **Repository access (RU-016):** this
repository, for the withheld check, the report script and the record;
and the scratch repository, whose own sessions write nowhere else.

A regime's price is partly the waiting it causes, and a run at night
has no owner to answer. The default is a **stand-in answerer**: a
scheduled task the owner stores which answers every open decision on
the scratch project with its default, on a fixed cadence identical
across runs (ask 3). Waiting then belongs to the mechanism and the
regime, not to the owner's day. What that cannot measure, and the
record must say so: every decision takes its default, so the default
share is degenerate and regime A's benefit is unmeasured. The
comparison prices owner review; it does not value it.

## What the node delivers

1. The scratch repository: its enlistment files, its state file, the
   node set as one plan document, the acceptance suite, the regimes
   document, the reset tag.
2. The withheld check here, at `scratch/withheld/`, with a runner
   taking the path of a scratch checkout.
3. P2-N029's script `plugin/scripts/rework_cost.ts`, **extended** with
   an option naming another project's state and journal (RU-012, one
   canonical copy, never a second script).
4. The record, `docs/plans/p2-n051-review-regimes-record.md`, here:
   each run's figures, the comparison, the limits and a conclusion.

## Slices, for the break down step

1. The scratch repository enlisted, with the node set, the acceptance
   suite, the regimes document and the reset tag.
2. The withheld check and the report extension here, independent of
   slice 1 (RU-018).
3. Regime A run and scored — the thin slice that proves the harness,
   including a reset and the report over another project.
4. Regimes B and C run and scored, then the record's comparison.

## Criteria

1. The scratch repository is enlisted as the owner granted (ask 1):
   it holds its own `orchestration/state.json`, `.mcp.json` and
   `.claude/settings.json` with the cost hook; `service_identity`
   answers from a session in it and `plan-state check` passes there.
2. The node set is committed there before any run as one plan
   document: one parent and at least three leaves, each with an
   outcome and the acceptance cases it must pass.
3. The acceptance suite runs with one command, writes nothing, names
   each leaf's cases, and fails at the reset point.
4. The withheld check lives only in this repository, names at least
   two cases per leaf the acceptance suite does not cover, and is run
   only when a run is scored.
5. The reset point is a tag; a documented reset returns the state
   file, the journal, the renderings and the worktree to it, and
   `plan-state check` passes after one.
6. Each regime is recorded before its run as the triple of "What a
   regime is", with each role's saved prompt text and the settings
   values it uses, and the record states that nothing else differed.
7. Each run covers the whole node set under one regime from the reset
   point with no other run open, and the record names its start, end,
   regime, the service's and the plugin's commits and every task's
   model.
8. A run that stops short of the parent being `done` is recorded with
   where it stopped and what it had spent, and counts as a run
   (RU-019).
9. Per run: tokens by type per task and summed, unmeasured tasks
   counted as unmeasured and never zero, with their number, and the
   wall-clock from the first `task_open` to the last node `done`.
10. Per run: the rework rounds, the rework cost, the failed
    verification's cost and the first pass's cost, by P2-N029's rule.
11. Per run: the decisions raised, merge requests apart from
    judgement questions, each class with its waits and default share
    (P2-N029's derivations).
12. Per run: the acceptance suite's result and the withheld check's
    failures, per leaf.
13. No figure in the script or the record combines tokens with a
    count of decisions or with time: no exchange rate, no net figure
    (D126).
14. The figures of criteria 9 to 11 come from `rework_cost.ts`,
    extended to read another project's two files; the record names
    the command and its output as it ran, and no second script
    duplicates it (RU-012).
15. The record states which regime cost least, which waited least and
    which left the fewest withheld-check failures, each whichever way
    it falls (RU-019), and concludes in one paragraph: what rework
    cost against what waiting cost.
16. The record states its limits: the runs per regime, that variance
    between runs is unmeasured unless one was repeated, that a
    stand-in answerer measures waiting and never the judgement a real
    review adds, and that the node set is toy work.
17. No token appears in the record, in a commit, in a log or in a
    session's transcript.
18. The pull requests change none of the five files the service owns,
    in either repository, CI passes in both, and this document and
    the record are each at most 300 lines.

## Asks

1. **The repository**, new to the project. Options: (a) a new
   `majodali/orchestrator-scratch`, granted for this node; (b) reuse
   an enlisted repository, rejected because a reset would rewrite a
   real plan; (c) a second state file here, rejected because a
   project is one state file. Default: (a).
2. **The instance.** Options: (a) a third instance from the template
   P4-N046 puts on the deploy path, so this node waits on P4-N046;
   (b) wait for P2-N026, several projects in one instance, not yet
   planned and itself waiting on P4-N008; (c) a service run locally,
   rejected because a fired cloud session needs a public endpoint.
   Default: (a).
3. **Who answers a run's decisions.** Options: (a) a stand-in
   answerer on a fixed cadence; (b) the owner for real, which makes a
   run as slow as the owner's day and spends the attention the node
   measures; (c) regimes where only A raises decisions, answered by
   hand. Default: (a), with criterion 16 recording what (a) cannot
   measure.
4. **What the comparison may spend, and whether A is repeated.**
   Observed task costs here run about $1 to $7, so a run of twelve to
   fifteen tasks is roughly $50 of subscription usage and four runs
   roughly $200. Options: (a) four runs — A, B, C and a repeat of A
   for variance; (b) three, one each; (c) two, A and B. Default: (a).
5. **The dependencies.** Options: (a) waits on P2-N029 (the script
   criterion 14 extends) and P2-N047 (the fired route proved),
   besides what ask 2 adds; (b) P2-N029 only; (c) neither. Default: (a).

## Risks

- **One run per regime measures the run, not the regime.** Two runs
  of one regime can differ by more than two regimes do. Answered by
  ask 4's default repeat and by criterion 16.
- **Toy work may not carry over.** Four small functions reward
  up-front criteria differently from a service change; the set is
  deliberately the work the loop runs most often.
- **A run can stall or loop.** A fired session that stops leaves a
  node claimed, and `maxReworkRounds` 4 is four rounds of spending;
  the scratch settings file bounds both, criterion 7 records the
  commits each run ran against, and criterion 8 makes a stalled run a
  result rather than a failure.

## Terms introduced

- **Regime**: one setting of the three things under "What a regime
  is", carried by saved prompts, criteria and two settings values.
- **Regime run**: one regime over the whole node set from the reset
  point. Not P3-N003's "run record", which the vocabulary defines for
  the class-to-instance check.
- **Node set**: the fixed parent and leaves every run builds.
- **Acceptance suite**: the cases committed before any run, naming
  what each leaf must do; the sessions read them.
- **Withheld check**: cases held in this repository that no scratch
  session can read, run only when a run is scored, to tell a cheaper
  regime from a worse one.
- **Stand-in answerer**: the scheduled task answering a scratch run's
  open decisions with their defaults.
- **Reset point**: the tag a run starts from.

## References

- [Rework cost against the reviews it replaces](p2-n029-rework-cost.md)
  — P2-N029, whose rework-round rule, owner-side derivations and
  script this node reuses, and **D126**, ruling out an exchange rate
- [Tasks started by the service through scheduled tasks](p2-n046-service-fired-sessions.md)
  — P2-N046, the firing route, and P2-N047, the trial that proves it
- [Orchestration service](orchestration-service.md) — P2-N001, the parent
- [Pilot enlistment, methodology-tools](pilot-enlistment-methodology-tools.md)
  — section 3, the template ask 2 reuses, and
  [how we work](../process/how-we-work.md), Enlisting a repository
- methodology **W-001** (two delivery modes, human-gated) — the mode
  whose economics the comparison tests
- RU-008, RU-011 (TypeScript/Node), RU-012 (one canonical copy),
  RU-016 (repository access declared in the plan), RU-018 (no queue
  behind an independent sibling), RU-019 (a measurement is met by its
  record), RU-020 (children at the specification gate)
