# Rework cost against the reviews it replaced: record (P2-N029)

Reader: the owner, and a session that reconsiders whether a longer
run without review pays. Assumes [the plan](p2-n029-rework-cost.md)
and [the task loop](../process/task-loop.md), Cost capture.

Read at commit `cdfc03b644b5432857e736aa6473b3ea0544bcb1`, 2026-11-23,
by `node plugin/scripts/rework_cost.ts` with no argument, over
`orchestration/state.json` and `orchestration/journal.jsonl` as they
stood there: 132 execute tasks, 31 resolved verifications and 125
decisions (one of them, D142, still open).

## Conclusion

Across the five rework rounds this state file carries, a round's
rework (its rework tasks plus the re-verification that closed it)
cost about 1.4 times the failed verification that found it, in output
tokens (151,189 against 105,244), and about half of the first pass it
corrected (151,189 against 305,688); project-wide, rework came to 11
to 17% of all execute cost, by token type. The owner side cannot be
read in the same units (D126): a merge request waited about an hour
on average (10 of 10 measured, 11h45m total) and a judgement question
waited about four hours on average where it could be timed at all (68
of 114 answered measured, 11d7h47m total). Read side by side, never
combined into one figure: the price of a failed verification and the
rework it causes is a small, bounded share of the execute cost it
corrects, while a judgement question, when one is raised, holds the
node for hours to days. On this reading, letting a run continue
further and occasionally paying for rework costs less of the owner's
time than a question that stops it would. Five rounds and 68 timed
decisions are a thin basis for that, and chunk 3's economics argument
should be re-read as the sample grows (criterion 17, Risks).

## The script's output, as it ran

```
Rework cost against the reviews it replaced (majodali/project-orchestrator)

Rework rounds
=============
Round 1 — P4-N024
  Failed verification: T138 (claude-fable-5-2)
  Rework tasks: none
  Re-verification: T139 (claude-fable-5-2)
  Rework cost (rework tasks + re-verification): in=5 out=1905 cacheRead=493947 cacheWrite=9581 [measured 1 of 1 tasks]
  Failed verification's cost: in=22 out=11424 cacheRead=1420153 cacheWrite=65111 [measured 1 of 1 tasks]
  First pass's cost (P4-N024's execute tasks before its first round): in=78 out=46764 cacheRead=11235710 cacheWrite=362578 [measured 1 of 1 tasks]

Round 2 — P4-N026
  Failed verification: T151 (claude-fable-5-2)
  Rework tasks: T152 (claude-fable-5-2)
  Re-verification: T156 (claude-fable-5-2)
  Rework cost (rework tasks + re-verification): in=37 out=21530 cacheRead=5716080 cacheWrite=57464 [measured 2 of 2 tasks]
  Failed verification's cost: in=43 out=21616 cacheRead=3321503 cacheWrite=123676 [measured 1 of 1 tasks]
  First pass's cost (P4-N026's execute tasks before its first round): in=91 out=88068 cacheRead=10713911 cacheWrite=243752 [measured 1 of 1 tasks]

Round 3 — P2-N032
  Failed verification: T180 (claude-opus-5)
  Rework tasks: T182 (claude-sonnet-5)
  Re-verification: T185 (claude-opus-5)
  Rework cost (rework tasks + re-verification): in=112 out=43315 cacheRead=19165146 cacheWrite=460443 [measured 2 of 2 tasks]
  Failed verification's cost: in=62 out=27461 cacheRead=4015602 cacheWrite=98073 [measured 1 of 1 tasks]
  First pass's cost (P2-N032's execute tasks before its first round): in=152 out=90327 cacheRead=15503701 cacheWrite=429937 [measured 3 of 3 tasks]

Round 4 — P4-N044
  Failed verification: T174 (claude-opus-5)
  Rework tasks: T175 (claude-sonnet-5), T176 (claude-sonnet-5)
  Re-verification: T177 (claude-opus-5)
  Rework cost (rework tasks + re-verification): in=210 out=65086 cacheRead=28103831 cacheWrite=141216 [measured 3 of 3 tasks]
  Failed verification's cost: in=80 out=30497 cacheRead=5069076 cacheWrite=98340 [measured 1 of 1 tasks]
  First pass's cost (P4-N044's execute tasks before its first round): in=68 out=12591 cacheRead=4186763 cacheWrite=74628 [measured 1 of 2 tasks] (unmeasured: T171)

Round 5 — P2-N047
  Failed verification: T227 (claude-opus-5)
  Rework tasks: T229 (claude-sonnet-5)
  Re-verification: T231 (claude-opus-5)
  Rework cost (rework tasks + re-verification): in=66 out=19353 cacheRead=2972864 cacheWrite=149683 [measured 2 of 2 tasks]
  Failed verification's cost: in=34 out=14246 cacheRead=1426028 cacheWrite=77554 [measured 1 of 1 tasks]
  First pass's cost (P2-N047's execute tasks before its first round): in=88 out=67938 cacheRead=4995689 cacheWrite=232398 [measured 2 of 2 tasks]

Per project
===========
Verifications (resolved: closed or blocked): 31
Failed: 5 (16.1%)
Execute cost (all execute tasks): in=3322 out=1312111 cacheRead=333686711 cacheWrite=6173476 [measured 42 of 132 tasks] (unmeasured: T001, T004, T007, T008, T009, T010, T014, T015, T016, T017, T018, T022, T023, T024, T025, T027, T030, T031, T032, T033, T034, T035, T036, T037, T038, T047, T054, T055, T056, T059, T060, T061, T062, T063, T064, T065, T066, T067, T070, T071, T072, T078, T080, T081, T082, T083, T084, T085, T086, T087, T088, T089, T090, T091, T094, T095, T096, T097, T098, T099, T100, T103, T104, T105, T106, T107, T108, T109, T110, T111, T112, T113, T114, T115, T116, T117, T118, T119, T120, T121, T122, T124, T125, T126, T127, T128, T144, T154, T171, T236)
Rework cost (all rounds' rework tasks + re-verifications): in=430 out=151189 cacheRead=56451868 cacheWrite=818387 [measured 10 of 10 tasks]
Rework cost as a share of execute cost, by token type (no combined figure across types, no exchange rate to the owner side):
  in: 12.9%
  out: 11.5%
  cacheRead: 16.9%
  cacheWrite: 13.3%

The owner side (D126: counted and timed in its own units, never combined with the token figures above)
======================================================================================================
All decisions: 125
Merge requests: 10
  Identifiers: D091, D092, D093, D097, D102, D107, D110, D111, D125, D128
  Answered with the default: 10 of 10 that carry one (100.0%); 0 carry no default, counted apart
  Wait (the time the node stood blocked, never the owner's effort): measured for 10 of 10 answered, unmeasured for 0; total 11h 45m over the measured ones
Judgement questions: 115 (1 still open, not yet answered; counted apart below)
  Identifiers: RU-001, RU-002, RU-003, RU-004, RU-005, RU-006, RU-007, RU-008, RU-009, RU-010, RU-011, RU-012, RU-013, RU-014, RU-015, RU-016, RU-017, RU-018, RU-019, RU-020, RU-021, RU-022, RU-023, RU-024, D001, D002, D003, D004, D005, D006, D007, D008, D009, D010, D011, D012, D013, D014, D031, D032, D033, D034, D035, D036, D061, D063, D064, D065, D066, D067, D068, D069, D070, D071, D072, D073, D074, D075, D076, D077, D078, D079, D080, D081, D082, D083, D084, D085, D086, D087, D088, D089, D090, D094, D095, D096, D098, D099, D100, D101, D103, D104, D105, D106, D108, D109, D112, D113, D114, D115, D116, D117, D118, D119, D120, D121, D122, D123, D124, D126, D127, D129, D130, D131, D132, D133, D134, D135, D136, D137, D138, D139, D140, D141, D142
  Answered with the default: 76 of 88 that carry one (86.4%); 26 carry no default, counted apart
  Wait (the time the node stood blocked, never the owner's effort): measured for 68 of 114 answered, unmeasured for 46; total 11d 7h 47m over the measured ones
```

Run twice in a row: identical output both times, and `git status` over
`orchestration/` and `docs/` unchanged before and after. The script
reads; it writes nothing.

## The merge/judgement rule, checked by hand (criterion 12)

The rule: a merge request's first word is "Merge" and it names a pull
request as `#<number>`; every other question is a judgement question.
Checked against the text of all 125 decisions:

- The 10 classed **merge** all begin "Merge" and name a pull request
  as `#<number>`. Three (D097, D125, D128) carry a second sentence
  past the merge question itself; the rule classes the whole decision
  by its first sentence, as written, and that is what each of them
  is — a merge request, with a second question riding on the same
  decision. Not a misclassification, a decision with two questions
  under one id.
- Eleven decisions mention "merge" or carry a `#<number>` without
  beginning "Merge": D009, D082, D083, D106, D113, D115, D117 and
  D142 (a `#<number>` that is a commit hash, a past merge, a branch
  question, or a review question that names a pull request only in
  passing), D072 (a pull request named `58`, not `#58`). All eight are
  genuine judgement questions; the rule places every one correctly.

Over 125 decisions, the rule places none wrongly.

## A decision not yet answered (an addition to criterion 11)

D142 (P2-N038) is open: raised by T235 at close, not yet decided. The
plan's own reading, 2026-11-20, found "109 decisions, all closed," and
criteria 10 and 11 read naturally against that: "answered with their
default" presupposes an answer. This script excludes a still-open
decision from the default share and from the wait totals — counting
it apart (`stillOpen`), rather than as "didn't match" or as an
unmeasured wait — and still lists and classes it (criterion 12). A
later still-open decision is handled the same way without a script
change. This is a reading of criteria 10 and 11 the plan did not spell
out because none of its sample was open; flagged here rather than
decided silently, with this behaviour as the default.

## Sample size and limits (criterion 17)

Five rework rounds, and 68 timed judgement-side waits out of 125
decisions, are a small sample; a sixth round or a run of timed answers
could move the shares and the averages in the Conclusion by a visible
margin. Re-reading costs one command, by design (the plan, "Why this
shape").

The instrument's limits (task-loop.md, Cost capture), named here
rather than assumed away:

- A task closed before 2026-11-11 (D013) carries no measured cost at
  all and is counted unmeasured, never as zero; 89 of 132 execute
  tasks fall unmeasured (90 of 132), most of them from before that
  date.
- A task opened in one session and closed in another is not measured
  by the transcript hook, and is likewise counted unmeasured.
- The transcript's format is internal to Claude Code and undocumented,
  so the hook that measures a task reads it tolerantly and may miss or
  misread a message on a future release; nothing here re-derives a
  token count independently of what the hook already recorded.
- The owner side adds its own gap: 46 of 114 answered judgement
  decisions (most of them `RU-*` rulings and early `D0xx` imports)
  predate the journal or carry no `decision_close` line, so their wait
  is unmeasured, not nil, and the merge/judgement split is read from
  prose, checked above by hand rather than proved.

Criteria 6, 7, 10 and 11 are met by the numbers above, whichever way
they fell (RU-019): a 16.1% verification failure rate, an 86.4%
default-match share on the judgement side, a 46-of-114 unmeasured
wait, and no combined token/time/decision-count figure anywhere in the
script or this reading.

## Asks

1. This reading excludes a still-open decision (here, D142) from the
   default share and the wait totals rather than counting it as
   unmeasured or as "didn't match" (see above). Keep that reading, or
   change it? Default: keep it — an unanswered decision is not yet a
   review that changed anything or didn't, so it belongs in neither
   bucket.

## Terms introduced

None beyond the plan's own (Rework round, First pass, Owner side,
Waiting, Merge request, Judgement question, Answer line). "Still
open" above is the plain fact of `chosen === null`, not a new term.

## References

- [The plan](p2-n029-rework-cost.md) — criteria, derivations, D126 and
  the owner's widening
- [The task loop](../process/task-loop.md) — Cost capture, the limits
  named above
- `plugin/scripts/rework_cost.ts`, `plugin/scripts/lib/rework-cost.ts`
  — the script and its derivations
