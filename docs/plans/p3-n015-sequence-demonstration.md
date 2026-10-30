# The demonstration: a ratified sequence lands two chunks and stops on asks

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N015, child C of P3-N005
     ([sequence-mode](p3-n005-sequence-mode.md)); it goes `active` when
     the owner approves it at this node's gate, and
     `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's gate (RD-2). It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), and
[dispatch.md](../process/dispatch.md)'s *Sequence mode* section, which
defines every sequence term used here without a link of its own.

Node P3-N015 (the demonstration) is child C of node P3-N005 (sequence
mode) ([plan](p3-n005-sequence-mode.md),
[specification](../specs/p3-n005-sequence-mode.md)). The parent
specification's section
[*Child C*](../specs/p3-n005-sequence-mode.md#child-c-the-demonstration-a-ratified-sequence-lands-two-chunks-and-stops-on-asks)
gives this node criteria C1 to C9. They answer the parent's G1 to G3
and I9. The parent's gate of 2026-10-29 adopted decisions 13 (what a
ratification records), 15 (what an early stop does) and 16 (the owner
performs G2). This plan reopens none of them. Decisions 2 and 7 below
refine criteria C3 and C8, and each says how.

The run applies the text node P3-N014 (the loop runs sequence mode)
delivered: *Sequence mode* in `dispatch.md`, its two journal event
kinds in [observability.md](../process/observability.md), and the
trigger table in [roles.md](../process/roles.md). This plan labels the
proposed members M1 to M4 until the Orchestrator issues their IDs.

## Outcome

The owner ratifies a sequence of four members once. M1 and M2 land
with no gate between them. M3's result carries an ask of the owner
that its work produced, and the sequence stops there. M4 is ratified
and never dispatched by the sequence.

At `done`:

- This document holds the ratification record. The journal's
  `sequence-ratified` event precedes the first member's `dispatched`
  event.
- Each landed member's [result record](../process/dispatch.md#the-members-result-record)
  is in its `result-received` event before the next member's
  `dispatched` event.
- The journal's `sequence-stopped` event names M3, condition 4 and
  M3's asks. The stop summary carries M3's asks only and names M4
  `gated`.
- Two blind readings have applied the four predicates to the run's
  results, and child A's record states their agreement (criterion C7).
- M4 has run after the stop, outside the sequence, so this interior
  node can verify.

## Approach

### The members, and why each is real work

Each member is an open Backlog finding of this repository, sized for
one execute task (criterion C1). None depends on another, so a stop at
any member leaves the tree clean. Each premise was re-read at commit
`dbe5e2f` (criterion C4).

| Label | Outcome | Backlog finding it discharges | Why it sits where it does |
|---|---|---|---|
| M1 | The process specification cites the methodology at its pin | "Methodology citations in the process spec point at the superseded pin" (2026-08-31) | Mechanical, checked by a command; no reason to raise a term, a decision or an ask (C2) |
| M2 | Risk register entries can be linked one by one | "Risk register and Ruling register entries have no anchors" (2026-10-29), its Risk register half | As M1 |
| M3 | The checker extension-point proposal is ready to carry | "Deliver the extension-point proposal upstream" | Its work makes an artifact ready for a delivery only the owner makes ([RU-002](../rulings.md), the owner hand-carries upstream-bound output), so its result asks the owner to act (C3) |
| M4 | The plugin tools are tested the way they run | "No committed test runs the plugin tools the way they run" (2026-10-30, T055) | Ratified after M3, so the stop on M3's asks withholds a dispatch (decision 2) |

The work is real in each case. M1 fixes eleven stale citations in the
normative process specification. M2 gives the web view of node
P2-N003 (owner questions and the plan view) per-entry links. M3
unblocks a delivery the Backlog has held since 2026-08-26. M4 closes
an omission node P3-N010 (one class, carried end to end) found against
the common risk catalogue's CR-001 (a check that cannot fail in the
environment the code runs in). No member's ask is written to trip a
predicate. M3 asks because carrying is the owner's act.

Open nodes considered and not proposed:

| Node | Why not a member |
|---|---|
| P3-N011 (the sweep), its execute tasks E2 and E3 | E2 was dispatched as T080 while this plan was written, so the node may be `done` before the gate. Its results may introduce catalogue terms or carry asks, against C2. |
| P3-N008 (the instance) and P3-N009 (sibling ordering retired) | Both are `identified` behind P3-N007, whose E2 ends at an owner gate. A plan stage stages decisions, and predicate 3's test 2 stops on each. |
| P1-N007 (cost reporting v1 and close-out) | Unplanned; its plan stage would stage decisions, as above. |
| The children of P2-N003 | Not yet entered; their work lands in majodali/project-orchestrator-service, outside this node's reach. |
| A project vocabulary for ratified terms | Claimed by the plan of node P1-N016 (process spec maintenance), decision 12. |

### M1. The process specification cites the methodology at its pin

At `dbe5e2f`, eleven links target tag `v1.3.0` in eight files:
`docs/process/README.md` (2), `profiles.md` (1), `rulings.md` (2),
`roles.md` (1), `plan-model.md` (2), `auditing.md` (1),
`plan-register.md` (1), and `docs/open-risks.md` (1). The pin is 1.6.0.
M1 retargets each link to tag `v1.6.0`. It writes link targets and
link text in those files, and its Backlog row. Every other sentence is
read-only to it.

- M1.1. `! grep -rn 'methodology/blob/v1\.3\.0' docs/process docs/open-risks.md`
  exits zero.
- M1.2. Each retargeted link's anchor names a heading present at tag
  `v1.6.0`. The result lists each link by file and line with its
  verdict. Where a heading changed, the link targets the `v1.6.0`
  heading of the same rule or article.
- M1.3. Each retargeted link's text names its identifier with its name,
  such as "Article 3 (authority)"
  ([P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-004--citations-carry-names)).
- M1.4. A claim that does not hold at `v1.6.0` is not reworded. The
  result reports it as a located finding, with the file, the line and
  the `v1.6.0` text.

### M2. Risk register entries can be linked one by one

At `dbe5e2f`, the [Risk register](../open-risks.md) holds entries R1 to
R17, none with an anchor. M2 gives each entry an anchor
`<a id="r<N>"></a>` before its bold ID. That is the form
`docs/process/README.md` uses for its `def-` anchors. The Ruling
register half of the finding is not M2's: the Orchestrator is that
register's single writer. M2 writes `docs/open-risks.md` and its
Backlog row.

- M2.1. `! grep -n '^- \*\*R[0-9]' docs/open-risks.md` exits zero.
- M2.2. `grep -c '^- <a id="r[0-9]*"></a>\*\*R[0-9]* — ' docs/open-risks.md`
  reports the number of entries the register holds.
- M2.3. Each anchor's number equals its entry's ID.
- M2.4. No other text of the register changes, and no link elsewhere
  changes.
- M2.5. The Backlog row keeps the Ruling register half open, for the
  Orchestrator.

### M3. The checker extension-point proposal is ready to carry

[mtool-custom-type-checker.md](../proposals/mtool-custom-type-checker.md)
is `Status: draft` and was never carried. Its K-007 contract carries it
with its text unchanged. Since it was drafted on 2026-08-26, the form
checker moved from Python to TypeScript (nodes P1-N009 and P1-N013),
and the pin moved from 1.3.0 to 1.6.0. The proposal links Article 7 at
`v1.3.0`. Its sketch names a Python entry point, with an evidence link
pinned to a commit. The
[P1-N009 plan](p1-n009-plugin-tooling-portfolio-stack.md), decision 8,
says a delivery after the rewrite states that in the covering message,
never in the artifact.

M3 writes `docs/proposals/mtool-custom-type-checker-cover-note.md`, on
the precedent of
[delegated-work-amendments-cover-note.md](../proposals/delegated-work-amendments-cover-note.md),
and its Backlog row. It reads majodali/methodology at tags `v1.3.0` and
`v1.6.0`, read-only. It does not read majodali/methodology-tools, and
the covering message says so.

- M3.1. The cover note has `Status: draft`, a K-007 contract comment and
  a reader statement.
- M3.2. Its covering message names each change since 2026-08-26 that
  touches the proposal's worked example or its citations, each with a
  pointer. The TypeScript port and the pin move are two such changes.
- M3.3. It quotes Article 7 (the C0 baseline, custom definitions and
  the sandbox) at `v1.6.0` verbatim beside the `v1.3.0` text the
  proposal links. A provenance line names the version, the commit and
  the date, and tells the carrier to re-verify before carrying
  ([RU-015](../rulings.md), the upstream delivery form). The note
  states whether the two texts differ.
- M3.4. `git diff --quiet <base> HEAD -- docs/proposals/mtool-custom-type-checker.md`
  exits zero, where `<base>` is the commit M3's branch starts from.
- M3.5. The carrying instructions name majodali/methodology-tools and
  recommend an issue, since the proposal asks the maintainer to settle
  design questions. They say what the owner tells the Orchestrator
  after carrying: the issue's link.
- M3.6. The result asks the owner, in its Asks part, to carry the
  proposal with its cover note, or to say hold (RU-002).

### M4. The plugin tools are tested the way they run

The tests under `test/` import the plugin's library. None runs a tool
as `node plugin/scripts/<tool>.ts`, which is how the roles and the
hooks run them. M4 adds `test/plugin-tools-run.test.ts` and its Backlog
row.

- M4.1. The test runs `plugin/scripts/form_check.ts`,
  `plugin/scripts/run_corpus.ts` and `plugin/scripts/journal_tail.ts`
  as child processes of `process.execPath`. It reads fixtures under
  `plugin/scripts/lib/corpus/fixtures/` only, never the live tree.
- M4.2. For `form_check.ts`, it runs one fixture whose recorded
  expectation holds no finding, such as `live-tree`, and one whose
  expectation holds a finding. It asserts exit zero for the first and
  a non-zero exit for the second.
- M4.3. `npm test`, `npm run typecheck` and `npm run lint` pass.
- M4.4. No existing test changes
  ([W-002 (existing tests are signals, not obstacles)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-002--existing-tests-are-signals-not-obstacles)).

### Criteria every member meets

- S1. `node plugin/scripts/form_check.ts` passes on the member's
  commit.
- S2. The member's Backlog row is rewritten to describe what shipped,
  in the row shape the Backlog header declares, in the same commit
  ([W-003 (documentation moves in the same commit as the work)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)).
- S3. The member writes only the files its section names, in this
  repository only.

The counts in M1 and M2 are as of `dbe5e2f`. A later count that
differs contradicts nothing here.

Each member's brief carries the owner's ratification, its section of
this plan as its criteria, and the note that it runs inside a ratified
sequence. Its contract already says what in its result stops the
sequence.

### The ratification

The owner ratifies at this plan's gate, in words that say so (decision
4). The Orchestrator then places the record decision 4 drafts in this
document, under the heading "Sequence ratified, <date>". The record
holds decision 13's fields: the members, each with its stage; a budget;
the pre-authorizations; the additional repositories; and one line of
accepted risks.

The order at the gate is fixed by what the predicates read:

1. The gate record section adopts this plan's decisions by number or
   range.
2. The Orchestrator journals `gate-crossed` for P3-N015 at stage
   `planned`. Predicate 3's test 2 reads its time.
3. The ratification commit, then `sequence-ratified`.
4. The first member's `dispatched` event, once no other task is in
   flight (decision 5).

### What the Orchestrator reads at each landing

Each member is one task. At its landing the Orchestrator runs the
loop's step 3, writes the result record into the `result-received`
note, and then applies the four predicates to that record
([dispatch.md](../process/dispatch.md#landing), landing). Each member's
register line links this plan only, so this plan is the member's plan
and specification.

| Predicate | What it reads for a member | M1, M2 | M3 |
|---|---|---|---|
| 1. A failed check | *Checks*: `node plugin/scripts/form_check.ts`, each command in code formatting the member's section names, and each criterion ID, with one outcome word each; any `check-failed` event | continue | continue |
| 2. A scope change | The task's node and stage against the record's members; *Refs* against this repository; *Flags* | continue | continue |
| 3. The owner's decision | The status token; this plan's *Decisions for the gate* against its gate record and the `gate-crossed` event; *Findings* against this plan; *What changed* for an open question | continue | continue |
| 4. Asks | *Asks*, verbatim | continue on "No asks", or on asks addressed to the Orchestrator alone | stop: the owner-addressed carrying ask |

The columns state the expected verdicts, not the verdicts. Each
predicate [fails closed](../specs/p3-n005-sequence-mode.md#i-integration-invariants):
a record part written "missing" yields stop. No note of a member's
task states a verdict. On a stop, the Orchestrator journals
`sequence-stopped`, its note opening "condition 4", writes the stop
summary, and waits.

### The stop summary

It follows the gate summary template
([dispatch.md](../process/dispatch.md#gates-v1), Gates). An
illustration of the expected stop:

```
STOP P3-N015 sequence of <date> — stopped at M3 on condition 4: carry the extension-point proposal, or hold it
Asks       (M3's Asks part, verbatim from its result record):
  1. <M3's ask>
Covered:   the four members and their criteria, as ratified on <date>
Changed:   M1 executing → done; M2 executing → done; M3 executing → done
  Detail: the result-received notes of the three tasks
Terms:     No terms introduced
Open:      M4 gated (ratified, not dispatched); P3-N015's readings gated
Costs:     <tasks, tokens, tiers and wall-clock per task, from the journal>
```

It carries no ask of M1 or M2. Asks are never rolled up.

### After the stop

Nothing is dispatched until the owner answers the stop summary. The
default next grant has four tasks, outside any sequence:

- M4's execute, under the per-chunk gate. An interior node verifies
  only once its children are `done`
  ([plan-model.md](../process/plan-model.md), the node lifecycle).
- Reading 1 at the frugal tier and reading 2 at the advanced tier.
  Each applies the four predicates to the result records of the
  members that ran inside the sequence (criteria C7, A5). Each writes
  a verdict file in `docs/findings/p3-n005-stop-predicates/` in the
  record's format. Reading 2's branch is cut before reading 1's
  verdict commit (criterion I6). The pre-pass is re-run at the stop's
  commit.
- One Implementer task compares the readings and adds the agreement to
  [child A's record](../findings/p3-n005-stop-predicates.md). It then
  assembles this node's evidence against C1 to C14. A disagreement
  closes as criterion I6 states, by a recorded predicate revision and
  both readings re-run, within two rounds. One still open after two is
  escalated to the owner (criterion A7).

P3-N015 then moves `verifying` → `done`, self-verified under the C1
profile. The owner's G2 runs at the parent's gate (decision 16).

### What child D receives

Node P3-N016 (the determination on W-001) reads:

- the ratification record and its commit, and `sequence-ratified`;
- each member's result record and `accepted` note;
- `sequence-stopped` and the stop summary;
- the two readings' verdicts on the run and the agreement statement;
- the owner's G2 application, from the parent's gate;
- what the run did not show (below);
- the two Backlog rows this plan adds.

### What the run does not show

Named so their absence is read as a limit, not a result:

- Predicate 1 meets no build, test or lint command inside the sequence
  unless M4 runs there. M4's `npm test` is the first such command.
- Predicate 2 meets no additional repository and no immediate-class
  flag. Every member writes this repository alone.
- Predicate 3's tests 2 to 4 are expected to continue. The members are
  chosen so that they do.
- One run is not a sample. Whether sequences save owner attention is
  not measured (parent specification, *Not verified here*).

### Additions to C1 to C9

- C10. The `gate-crossed` event for P3-N015 at `planned` and the
  ratification commit precede `sequence-ratified`, which precedes the
  first member's `dispatched` event.
- C11. No task outside the members is dispatched between
  `sequence-ratified` and `sequence-stopped` (decision 5).
- C12. `git diff --quiet <ratification commit> <stop commit> -- docs/process/dispatch.md`
  exits zero, so the owner's G2 reads the text the run applied.
- C13. Each member's result record holds the seven parts
  `dispatch.md` names, none written "missing".
- C14. Each member that reached `done` meets S1 to S3 and its own
  criteria, as its result records them.

## Dependencies

- P3-N014 (the loop runs sequence mode): `done` 2026-10-30, its execute
  task T072 accepted. Its *Sequence mode* text is what the run applies.
- No task in flight at the first dispatch. Tasks were in flight while
  this plan was written. Decision 5 makes the first dispatch wait for
  them.
- P1-N016 (process spec maintenance): its plan's E2 edits four of M1's
  files. Neither node depends on the other. Whichever runs second reads
  the files as the first left them. If P1-N016 runs first, M1 finds
  fewer links, and M1.1 still holds.
- The members need nothing but this gate. M1 and M3 need a checkout of
  majodali/methodology holding tags `v1.3.0` and `v1.6.0`.
- Owner actions: the ratification, once; then the answer to the stop
  summary.
- The orchestration service: nothing. The run is git alone (criterion
  I12).

## Leaf or interior

Interior, as the parent specification decided. Its children are M1 to
M4, each a leaf run as one execute task. A sequence lands nodes, so
each payload chunk is a node. The cut is not feature-first. The parent
plan records why: the loop is what is validated, and the payload is
incidental. The children are mutually independent. Their order is the
ratification record's order, and they are never dispatched in
parallel.

## Repository reach ([RU-016](../rulings.md))

This node writes this repository only:

- M1: link targets and link text in seven files under `docs/process/`
  and in `docs/open-risks.md`;
- M2: `docs/open-risks.md`;
- M3: a new `docs/proposals/mtool-custom-type-checker-cover-note.md`;
- M4: a new `test/plugin-tools-run.test.ts`;
- each member: its row in `docs/backlog.md`;
- the readings and the evidence task:
  `docs/findings/p3-n005-stop-predicates.md` and its directory, and
  `docs/process/dispatch.md`'s predicate text only if criterion I6's
  revision route is taken.

M1 and M3 read majodali/methodology at tags, read-only. The repository
is not new to the project. The Orchestrator records the read grant at
dispatch. The ratification record names no additional repository.

## Monotonicity

No planned non-monotonicity. M4 adds a test and rewrites none. Members
1 to 3 change documents only.

## Decisions for the gate

Numbered per [dispatch.md](../process/dispatch.md)'s owner-decision
economics. The owner's go-ahead adopts every default not overridden by
number, except that it ratifies the sequence only as decision 4 states.
This plan opens its own sequence at 1.

Precedents checked against the [Ruling register](../rulings.md).
Exact matches decide silently: RU-002 (M3's delivery is the owner's),
RU-015 (M3's quote form), RU-016 (the repository reach), and RU-009 and
RU-010 (work reaches `main` by a pull request the owner merges; a
member's branch merges into the design branch without one). RU-020 (an
interior node whose specification reaches breakdown depth needs no
separate `break down` task) is a near match for decision 3. RU-019 (a
measurement criterion may be satisfied by an unfavourable result) was
checked and does not apply: G1 is a property of a run, not a
measurement. RU-022 (corpus-bound documents are written IR first) does
not apply to M3: methodology-tools is not the methodology corpus.
RU-018 raises nothing, since nothing is dispatched in parallel.

1. Members 1 to 3, and their order.
   **Default**: M1, then M2, then M3, as *The members* states.
   **Rationale**: each meets C1; M1 and M2 are mechanical edits checked
   by commands, so C2 holds; M3's work exists to be carried, and only
   the owner carries (C3).
   **Affected locations**: none.
2. A fourth member after the one planned to stop the sequence.
   **Default**: yes, M4, so the stop on M3's asks withholds a ratified
   dispatch. *Alternative*: three members, with G1's "no member is
   dispatched after it" holding by the end of the list.
   **Rationale**: a stop at the list's end looks the same as running
   out of members; a withheld member shows the asks stop holding back
   work, which is what W-001's condition is for.
   **Affected locations**: one active document.
   - [Specification of P3-N005](../specs/p3-n005-sequence-mode.md),
     *Child C*, criterion C3. Replace the sentence "C3. The last member
     is chosen because its work genuinely produces an ask the owner can
     act on at once." with: "C3. The member planned to stop the
     sequence is chosen because its work genuinely produces an ask the
     owner can act on at once. One ratified member may follow it, so
     that the stop withholds a dispatch (plan of node P3-N015, decision
     2)."
3. How P3-N015 and its members move through stages.
   **Default**: no separate specify or break-down task. At this gate
   P3-N015 moves `planned` → `specified` → `broken-down`. Its
   specification is the parent's *Child C* section with this plan's
   criteria. M1 to M4 are entered with their Backlog rows and move
   `identified` → `specified` in the same act, each specified by its
   section here. Each member's register line links this plan. Each is
   ratified for `execute` alone, and moves `executing` → `done` at its
   acceptance under the C1 profile.
   **Rationale**: a plan or specify task per member would stage
   decisions inside the sequence, and predicate 3's test 2 would stop
   it; RU-020 is the near match, and P3-N011 (decision 2) and P3-N013
   (decision 2) crossed their plan gates the same way, while P2-N009
   and P2-N013 to P2-N016 executed from criteria their parent carried.
   **Affected locations**: none.
4. The ratification.
   **Default**: at this plan's gate. The owner's go-ahead ratifies the
   sequence only when its words say so, such as "sequence ratified as
   drafted". A go-ahead that adopts defaults without saying so leaves
   the sequence unratified. On ratification the Orchestrator places
   this record here, with the issued IDs, and commits it:

   > ## Sequence ratified, <date>
   >
   > - **Members**, in dispatch order: <M1's ID> `execute`; <M2's ID>
   >   `execute`; <M3's ID> `execute`; <M4's ID> `execute`.
   > - **Budget**: 4 tasks.
   > - **Pre-authorizations**: none.
   > - **Additional repositories**: none.
   > - **Accepted risks**: none.

   **Rationale**: W-001 requires the approval of a sequence to be
   explicit; a default adopted by silence is not; one task per member
   bounds the run if the record were misread; documents-only members
   in this repository carry no risk the four predicates do not catch.
   **Affected locations**: none.
5. Other dispatches while the sequence runs.
   **Default**: the first member is dispatched only when no other task
   is in flight. No task outside the members is dispatched until the
   sequence stops.
   **Rationale**: G1, G3 and I9 are read from the journal between
   ratification and stop, and the owner's G2 needs the predicate text
   unchanged in that window (C12); a concurrent writer would bring back
   the Backlog race the parent's decision 6 removed; the run is four
   tasks at most.
   **Affected locations**: none.
6. Asks that fall where the plan does not expect them.
   **Default**: an owner-addressed ask in M1's or M2's result stops the
   sequence there, and the parent's decision 15 applies unchanged. If
   M3's result carries no owner-addressed ask, the sequence continues
   to M4 as ratified. Nothing is written into a result to make a
   sequence stop (C3). A sequence that then ends on exhausted scope has
   not met G1.
   **Rationale**: a stop is never overridden to meet a criterion, and
   neither is a continue.
   **Affected locations**: none.
7. The bound on fresh sequences.
   **Default**: a sequence fails this node when it does not meet G1:
   fewer than two consecutive members land, or no owner-addressed ask
   stops it. Between the first such sequence and a second, the owner
   may ratify a fresh one. It re-runs no landed member, and its
   members are chosen by C1's rule. After the second, P3-N015 becomes
   `blocked` and escalates to the owner with both journal windows,
   under `dispatch.md`'s bounded-attempts rule.
   **Rationale**: the parent's decision 15 counts only an early stop,
   and a sequence that never stops on asks misses G1 as surely.
   **Affected locations**: one active document.
   - [Specification of P3-N005](../specs/p3-n005-sequence-mode.md),
     *Child C*, criterion C8. Replace "C8. An early stop follows
     decision 15." with: "C8. An early stop follows decision 15. A
     sequence that ends without a stop on an owner-addressed ask counts
     toward decision 15's bound too (plan of node P3-N015, decision
     7)."

## Backlog additions

- [ ] **Whether a task outside a ratified sequence may be dispatched
  while it runs** — When: 2026-10-30, planning P3-N015. Status: open,
  for P1-N016 and as evidence for P3-N016; *Sequence mode* is silent,
  and decision 5 of this plan answers it for one run. Pointer:
  [plan of P3-N015](plans/p3-n015-sequence-demonstration.md), decision 5.
- [ ] **Whether a go-ahead that adopts defaults ratifies a sequence**
  — When: 2026-10-30, planning P3-N015. Status: open, for P1-N016 and as
  evidence for P3-N016; W-001 requires explicit approval, while
  `dispatch.md`'s *Gates* lets one go-ahead adopt every default.
  Pointer: [plan of P3-N015](plans/p3-n015-sequence-demonstration.md),
  decision 4.

## References

- [p3-n005-sequence-mode](p3-n005-sequence-mode.md) and its
  [specification](../specs/p3-n005-sequence-mode.md): the parent, child
  C's criteria C1 to C9, G1 to G3, I6, I9 and I12, decisions 13, 15 and
  16, and the gate record of 2026-10-29
- [dispatch.md](../process/dispatch.md): *Sequence mode*, the four
  predicates, the result record, *Gates* and the bounded-attempts rule
- [observability.md](../process/observability.md): the
  `sequence-ratified` and `sequence-stopped` event kinds
- [roles.md](../process/roles.md): what each role can trigger
- [p3-n014-loop-runs-sequence-mode](p3-n014-loop-runs-sequence-mode.md):
  the delivered mode
- [Record of the stop predicates](../findings/p3-n005-stop-predicates.md):
  the verdict file format, the pre-pass and the agreement result
- [p3-n013-stop-conditions-decidable](p3-n013-stop-conditions-decidable.md):
  the shape precedent and the two-reading method
- [Backlog](../backlog.md), [Plan register](../plan-register.md),
  [Ruling register](../rulings.md)
- [plan-model.md](../process/plan-model.md),
  [profiles.md](../process/profiles.md)
- methodology 1.6.0:
  [W-001 (two delivery modes, human-gated)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-001--two-delivery-modes-human-gated),
  [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables),
  W-002, W-003, and the
  [P- rules](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md)
