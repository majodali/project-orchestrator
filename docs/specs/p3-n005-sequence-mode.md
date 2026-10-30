# Sequence mode: run it, and determine whether it needs specialising (specification)

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document
     for node P3-N005. It goes `active` when the owner accepts it and
     the breakdown at this node's specify gate. It goes
     `closed → Backlog entry` when the node reaches `done`. -->

Node **P3-N005**, chunk 4 of **P3-N001**, specifying the outcome fixed
by its [plan](../plans/p3-n005-sequence-mode.md). The parent's
criteria for this node are **G6**, **I8** and **P4** of the
[parent specification](p3-n001-comprehension-and-continuous-implementation.md).

Methodology **W-001** (two delivery modes, human-gated) lets the human
owner approve a chunk sequence once. The agent then lands the chunks
without a gate between them. It stops on four conditions: a failed
check, a scope change, a chunk needing the human's decision, and a
landing summary carrying asks. This project runs only W-001's other
mode, the per-chunk gate.

The plan decided four things. This project's dispatch loop runs the
pre-ratified mode. The four stop conditions become **predicates**: each
names the artifact and the field it reads, and each yields stop or
continue without a fresh judgment. The predicates are evidenced by two
independent readings of this project's own past task results. A
determination on whether W-001 needs specialising upstream is recorded
either way. The plan made the node interior, with four children in a
strict chain.

The owner accepted the plan on 2026-10-29. He adopted defaults 1 to 7
and took decision 8's alternative. So the execute stage of node
**P1-N014** (role contracts adopt the v1.5.0 conduct rules) runs before
this node's child B. He added two notes. Child D checks what remains
of the W-008 asks clarification after the methodology's October 2026
amendments. Child A states how W-001's four stop conditions relate to
the methodology's four **meta-review signals**. The reason is the
owner's [vision](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vision.md)
of 2026-10-28. It makes a **stream** the delivery shape for
autonomous work. A stream is a unit of approved autonomous work bounded
by scope, budget and accepted risks rather than by chunk gates
(methodology vocabulary, ratified 2026-10-28, not yet in a release).

This document records the criteria **the node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria ([plan-model](../process/plan-model.md)). So every criterion
below is a property no single child establishes. Where a criterion
needs a child to do something more, *The breakdown* names the
addition.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)). Nothing here reopens a plan
decision. Decision 10 below refines the premise of adopted default 3.
Child A's criterion A5 narrows adopted default 2 by naming the two
tiers. Each states what it refines and why.

**Repository reach** (RU-016, the Planner declares the repository
access a node needs). This node writes **this repository only**, as the
plan's *Repository reach* section declares. Every criterion below is
answerable from this repository's content, a command run here, the
run journal, or the owner's attestation.

## Three findings that shape the criteria

Writing the criteria exposed three facts the plan did not state. Each
lands on a criterion.

**1. No past task result's Asks part is committed anywhere.** A
task result reaches the Orchestrator in its session. The repository
holds the run journal's `result-received` and `accepted` notes, the
Cost log row, and the commits at the recorded ref. The notes are the
Orchestrator's summaries, not the results. A search of
`orchestration/journal.jsonl` and `docs/` on 2026-10-29 found no
committed Asks part of any task result. So conditions 1 to 3 are
scorable from committed artifacts, and condition 4 has almost no
historical corpus. W-001's own rationale says summaries exist to make
the stop conditions auditable afterwards. A stop on asks that no
committed artifact records cannot be audited. This lands on **I4**,
**I6** and **G2**, and on decisions 10 and 12.

**2. W-008 now makes a term ratification an ask.** Methodology
**W-008** (reports map their deliverables), at the pinned v1.6.0,
requires a fourth part, *Terms introduced*. Its asks part MUST request
the ratification or striking of each term introduced. W-001 stops on
any ask, and a pre-ratification MUST NOT purport to waive the asks
stop. So any chunk whose result introduces a term stops a running
sequence. This is genuine, not a defect. It changes child C's
selection rule and it is evidence for child D. This lands on **I4**
and on child C's additions.

**3. A task result's asks are addressed to the Orchestrator.** W-008
scopes a report by its audience. A task result goes to the delegating
agent, so its asks part holds requests of the Orchestrator. W-001's
condition reads "anything requested of the human". Without an
addressee rule, the predicate either stops on every request to the
Orchestrator or judges which requests reach the owner. Both defeat
decidability. This lands on **I4** and on decision 11.

## Verification criteria

**G** is the demonstration the owner watches. **I** is the
integration invariants that make it mean something. **P** is the
process and register state the node leaves behind. The parent's
**G6** is answered by G1 to G3. The parent's **I8** is answered by I1
to I11. The parent's **P4** is answered by P4.

### G. The gate demonstration

- **G1. A ratified sequence lands two chunks and stops on asks.** The
  owner's ratification record is committed and journalled before the
  first member's `dispatched` event. Its fields are decision 13's. At
  least two consecutive members reach `done` with no `gate-opened` or
  `gate-crossed` event for a member between them. A later member's
  task result carries an owner-addressed ask that its work produced.
  No member is dispatched after it. The journal carries a stop event
  naming that member, condition 4 and the ask. Only the owner
  ratified, at any point.
- **G2. The stop was decided by the written text.** At the gate the
  owner applies the four predicates in
  [dispatch.md](../process/dispatch.md)'s *Sequence mode* section, as
  committed at the ratification commit, to each member's recorded
  result. Decision 12 names the record. Each landed member yields
  continue on all four predicates. The stopping member yields stop on
  the condition the journal names. A member where the owner's
  application disagrees with the journal fails this criterion.
- **G3. Each chunk was summarized as it landed, and nothing was
  rolled up.** Each landed member's record exists before the next
  member's `dispatched` event. The stop summary carries the stopping
  member's asks. It names every ratified member not yet dispatched as
  `gated`, per `dispatch.md`'s no-silent-drops rule. It carries no ask
  of an earlier member.

### I. Integration invariants

The first four criteria state each predicate's decidability. A
predicate is decidable when it names its input artifact and field,
reads it by comparison or lookup, and yields stop or continue. Each
predicate **fails closed**: a missing input yields stop, never
continue. Each predicate takes the shape the vision gives an in-stream
stop signal: mechanical where a count or field exists, or a wording
match for a hand check otherwise. None judges prose for tone or intent.

- **I1. Condition 1, a failed check, is decidable.** The predicate
  names each check by its command or by its criterion. It reads the
  exit status or the verdict the result records for each. It yields
  stop on any non-zero exit, on any criterion recorded as not met, and
  on any named check with no recorded outcome. The checks include
  `node plugin/scripts/form_check.ts`, each build, test or lint command
  the member's specification declares, and the member's
  self-verification verdicts.
- **I2. Condition 2, a scope change, is decidable.** The predicate
  reads three sets from the result and its commits: the nodes and
  stages touched, the repositories written, and any immediate-class
  flag. `dispatch.md` names four immediate classes: scope expansion, a
  change to an existing test's conditions under W-002, a deviation,
  and budget exhaustion. The predicate compares the sets by membership
  against the ratification record and the member's plan *Repository
  reach* section. Any element outside them yields stop. The predicate
  states that a packet widening is not a scope change, because reading
  is not work.
- **I3. Condition 3, a chunk needing the owner's decision, is
  decidable.** The predicate yields stop when the result's status is
  `needs-judgment`. It also yields stop when the member's plan or
  specification has a *Decisions for the gate* entry that the
  document's gate record neither adopts nor overrides. The predicate
  names the gate record section as the place it reads adoption from.
  Both tests are lookups.
- **I4. Condition 4, a landing summary carrying asks, is
  decidable.** The predicate reads the result's Asks section in its
  intermediate representation (IR) when the result carries one. It
  reads the prose Asks part otherwise. This follows `dispatch.md`: the
  IR's asks are the asks. It yields continue only on the stated empty
  forms, "No asks" or "A0. No asks.", or when every ask names the
  Orchestrator as its addressee (decision 11). Any other content yields
  stop. A ratification ask for a term introduced yields stop. A
  missing Asks part yields stop.
- **I5. Conditions 3 and 4 lose no stop together.** The owner's
  2026-09-17 clarification moves an open question waiting on other
  activity out of Asks and into *What changed*. For each such item in
  the corpus and in the demonstration's results, predicate 3 yields
  stop. Otherwise child A's record shows, with an artifact pointer,
  that the item is not a decision reserved to the owner.
- **I6. Two readings agreed, blind, on stated tiers.** For each
  condition's corpus, two readings returned the same verdict on every
  item. A disagreement counts as closed only by a recorded predicate
  revision followed by both readings re-run, within two rounds. Both
  reading branches contain the commit that fixed the predicate text.
  Reading 2's branch does not contain reading 1's verdict commit:
  `git merge-base --is-ancestor <reading-1 commit> <reading-2 tip>`
  exits non-zero. Condition 4's agreement includes the demonstration's
  results (decision 10).
- **I7. One predicate text in three places.** The predicates in
  `dispatch.md`'s *Sequence mode* section equal the text child A last
  scored. Any difference is a recorded revision that both readings
  re-scored. [roles.md](../process/roles.md) and each of the six
  contracts in `.claude/agents/` name the conditions that role can
  trigger and state the consequence. Each cites the *Sequence mode*
  section by name. `node plugin/scripts/sync_agents.ts --check`
  passes.
- **I8. W-001's obligations map to sentences, and the run obeyed
  them.** A table maps each MUST and MUST NOT of W-001's
  pre-ratified-sequence text at v1.6.0 to the `dispatch.md` sentence
  that carries it. No obligation is unmapped. The demonstration's
  journal shows no agent-authored ratification and no dispatch beyond
  the ratified list. The ratification text does not purport to waive
  the asks stop.
- **I9. Dispatch inside the sequence was serial.** In the journal,
  each member's `dispatched` event follows the previous member's
  `accepted` event. This is adopted decision 6 made checkable.
- **I10. The relation to the meta-review signals is closed.** Child
  A's relation table has one row per meta-review signal and one row
  for the review limit of ten rounds. Each row names a W-001 condition,
  a `dispatch.md` containment rule, or "no counterpart". The table
  states the structural differences: when each is evaluated, what it
  reads, and what it causes. Child D's determination answers every "no
  counterpart" row. Each such row also has a Backlog entry
  (decision 14).
- **I11. One reading of W-008.** Child A's predicate 4 and child D's
  residue table cite the same W-008 text, at the same version and
  commit.
- **I12. Service-independent.** Nothing in the mode or the run needed
  the orchestration service. Each member's result states whether the
  service answered, and no step waited on it. This carries the
  orchestration service plan's constraint 3 (degrade to git-only).
- **I13. Monotonic, or authorized under W-002.** Methodology W-002
  (existing tests are signals, not obstacles) applies. No previously
  defined functional test of the form checker or of the shared
  register grammar is rewritten. `node plugin/scripts/form_check.ts`
  passes its pre-existing rules. The conformance corpus's recorded
  expectations hold, except where new rules add to them.
  `dispatch.md`'s per-chunk-gate loop is changed only by addition,
  since W-001 keeps both modes.

### P. Process and register state

- **P1. This repository is clean.** `node plugin/scripts/form_check.ts`
  passes. Plan register and Backlog stage designations agree. The four
  children reached `done` against their own criteria. Each payload
  node under child C is `done` or carries a recorded stage, a hold
  marker where one applies, and a Backlog entry. None is orphaned.
- **P2. Documentation moved with the work.** Methodology W-003
  (documentation moves in the same commit as the work) holds
  throughout. P3-N005's Backlog entry is rewritten to describe what
  shipped. Four existing Backlog entries are closed or rewritten: the
  two-nodes-edit-the-same-contracts entry, the I8 corpus-figure entry,
  the "Asks means only what the reader can act on now" entry, and the
  parallel-dispatch race entry, which gains a pointer to the serial
  rule.
- **P3. The record exists.** The Cost log has a row for every
  dispatched task of the node, each reading included. The journal has
  the ratification, each member's landing, and the stop. The
  Orchestrator writes both, and the verifier checks they are there.
- **P4. Upstream-bound output is in the delivery form.** RU-015 sets
  the form: final normative text, the current upstream text quoted
  verbatim beside it, and a provenance line naming version, commit and
  date. RU-002 has the owner hand-carry it. RU-003 completes the node
  at the artifact, not at upstream disposition. RU-005 gates child D at
  `verifying`, before the artifact represents the project.
- **P5. Decisions are closed.** Every numbered decision in the plan
  (1 to 8) and in this document (9 to 16) was adopted or overridden at
  a gate. An override is reflected in the affected child's criteria
  before that child executes.
- **P6. The ordering against P1-N014 held.** The journal shows
  P1-N014's execute `accepted` event before child B's execute
  `dispatched` event. Child B's result names the commit of the six
  contracts it read.
- **P7. The parent's criteria are answered here.** The node's
  evidence assembly answers the parent's G6, I8 and P4, each with
  pointers. The parent's `verifying` reads them without re-deriving.

**G1 to G3 are what the owner watches. I1 to I13 and P1 to P7 are what
a verifier who did not do the work checks against this repository.**

## How verification runs

C1 profile: each child is self-verified by its Implementer or Planner
against its own criteria. A Reviewer pass is by owner request. This
node's `verifying` is an evidence assembly around the live run. Each
criterion is answered with a pointer to a commit, a document, a
journal event or a register entry. Decision 16 proposes who performs
it.

The live run happens inside child C, not at the gate. G1 and G3 are
answered from the run's journal. G2 is performed at the gate: the owner
applies the committed predicates to the recorded results.

Child D is proposal-class in part, so RU-005 puts its gate at
`verifying`.

## Not verified here

Named so their absence is not read as oversight.

- **Stop signals inside a stream beyond W-001's four.** The vision
  places them on the roadmap. Child A's relation table identifies
  candidates. Building one is not this node's work (decision 14).
- **The vision's running record of findings and confidence.** It is a
  stream duty the vision names. Nothing here builds it.
- **A stranger review of plans and specifications.** The vision
  extends the stranger to plans. That is a separate roadmap item.
- **Recording asks for tasks outside a sequence.** Decision 12 records
  them inside a sequence only. The general rule goes to node P1-N016
  (process spec maintenance).
- **The parallel-dispatch Backlog rule.** It stays with P1-N016, per
  adopted decision 6.
- **Acceleration by the service.** The service's task-pull loop, node
  P2-N005, may later serve a ratified sequence. This node states the
  relationship and builds nothing for it.
- **Upstream disposition.** RU-003 completes the node at the artifact.
- **Whether sequences save owner attention.** No measurement is
  specified. One run is not a sample.

## The breakdown

**The four proposed children stand**, in the plan's order, with the
dependency structure explicit. The node is **interior**. Writing the
criteria exposed no missing child and no wrong cut. The cut is not
feature-first, and the plan records why: the node has one atomic
feature, and the children are separated by evidence. Child A leads as
the thin slice, because the structural risk is that the conditions
cannot be made decidable.

**Dependency structure.** Child A, then child B, then child C, then
child D, strictly. Child B also depends on P1-N014's execute, by the
owner's choice of decision 8's alternative. No pair is independent, so
nothing is marked independent under RU-018 (a child is not queued
behind a sibling it does not depend on).

IDs are the Orchestrator's to issue. Each child's criteria below are at
the depth a `break down` task would produce, so RU-020 applies (an
interior node whose specification reaches breakdown depth needs no
separate `break down` task).

### Child A: the four stop conditions, decidable, evidenced, and related to the meta-review signals

**Outcome.** The four predicates exist as committed text. Two blind
readings agree on every corpus item. The relation of W-001's four
conditions to the four meta-review signals is stated.

**Deliverable.** `docs/findings/p3-n005-stop-predicates.md`, a record
holding the predicate text, the revision log, the corpus statement and
the relation table. The two readings' verdict files sit beside it in
`docs/findings/p3-n005-stop-predicates/`. The location follows node
P2-N013's `docs/findings/` precedent in the service repository. After
child B lands, the record states that `dispatch.md` holds the
normative text, so one normative copy exists.

**Criteria.**

- A1. Each predicate meets I1 to I4 as written, including fail-closed
  and the shape statement.
- A2. The corpus follows decision 10. It is frozen at a named cut-off
  commit. The record states the task count at that commit and the
  committed artifacts read for each task. No reading uses a session
  transcript.
- A3. The record inventories which corpus items carry an Asks part in
  a committed artifact. The coverage gap for condition 4 is stated as a
  count.
- A4. A hard-case sample is scored first, and its revisions are
  recorded before the full scoring starts. The sample holds T017
  (`needs-judgment` returned), T008 and T010 (`blocked` on owner
  actions), T032 (a role that flagged its reading rather than
  substituting judgment), and T038 (a role that did two things its
  brief did not ask for). It also holds one task with a
  `packet-widened` event, for I2's widening clause.
- A5. Reading 1 runs on the frugal tier, the Orchestrator's tier in
  `roles.md`'s model-tier table, because that tier applies the
  predicates live. Reading 2 runs on the advanced tier. Both packets
  enumerate the same predicate text and the same corpus.
- A6. Blindness is checkable as I6 states. A mechanical pre-pass
  scores the structured fields, the journal status and check events.
  Both readings are checked against it. The pre-pass is not a third
  reading.
- A7. Disagreements close as I6 states. A condition still disagreeing
  after two rounds is escalated to the owner and recorded as evidence
  for child D.
- A8. The predicate text is fixed before either reading. A revision
  after a reading invalidates both readings.
- A9. Conditions 3 and 4 are specified and scored together, and I5's
  check is recorded per item.
- A10. The relation table meets I10. It quotes the four signals from
  the methodology specification's *Meta-review* section at the version
  decision 9 names. It states, per row, whether the signal or condition
  is evaluated per chunk or at the end of a count, whether it reads a
  task result or a review record, and whether it stops the loop or
  flags a text for meta-review.

The table below is a **starting hypothesis** for A10, not its output.
Child A tests it.

| Meta-review signal (v1.6.0) | Candidate counterpart in this project |
|---|---|
| 1. In two or more rounds, a fix did not reach the prose or was not confirmed | Partial: condition 1 where a check covers the claimed change; none for a result that claims a change its commits lack |
| 2. A declined finding was raised again, or a restatement mismatch recurred | `dispatch.md`'s bounded-attempts rule: the same `needs-judgment` question returning blocks the pair after the second failure |
| 3. The prose grew across the count by more than one tenth | Partial: a scope budget bounds total cost; nothing bounds growth per unit of content |
| 4. After round 3, a contradiction in a passage an earlier fix touched | Condition 1 where a test catches the regression; otherwise none |
| The limit of ten rounds | The end of the ratified chunk list, and a scope budget |

The hypothesis has one structural reading. W-001's four conditions ask
whether a chunk needs the human now. The meta-review signals ask
whether a loop is converging. W-001 has no non-convergence condition.
If child A confirms this, it is child D's strongest evidence.

### Child B: the loop runs sequence mode, and the roles meet the conditions without looking

**Outcome.** `dispatch.md` carries a normative *Sequence mode* section.
Each role contract carries the conditions that role can trigger. The
journal can record a ratification and a stop.

**Deliverable.** The *Sequence mode* section in `dispatch.md`. The
per-role duties in `roles.md`. The six contracts in `.claude/agents/`.
`plugin/agents/` regenerated by `node plugin/scripts/sync_agents.ts`,
never hand-edited (RU-012, one canonical copy vendored by a
generator). New event kinds in
[observability.md](../process/observability.md) and in the form
checker's event list.

**Criteria.**

- B1. The section states: ratification by the owner only; no gate
  between members; serial dispatch inside a sequence; the four
  predicates in child A's last-scored text; stop, summarize and wait;
  asks never rolled up; a sequence that runs out of ratified members
  stops.
- B2. The section carries I8's obligation table.
- B3. The ratification record's fields are decision 13's.
- B4. The audit record of each member's result is decision 12's,
  holding every input the four predicates read ([P3-N014
  plan](../plans/p3-n014-loop-runs-sequence-mode.md), decision 4).
  Outside a sequence, the record form is written once, for node
  P3-N014's execute task ([P3-N014
  plan](../plans/p3-n014-loop-runs-sequence-mode.md), decision 9).
- B5. The addressee rule is decision 11's, stated in the handoff
  contract's task-result shape.
- B6. The Orchestrator contract states that it never ratifies, extends
  or infers a sequence, including from register order.
- B7. The Implementer, Planner and Reviewer contracts each state that a
  `needs-judgment` return or an owner-addressed ask stops a running
  sequence. Each states the consequence, so a role knows that padding
  Asks stops the loop.
- B8. The Auditor and Semantic Auditor contracts state that a finding
  goes to the audit channel and is not a sequence stop.
- B9. The journal vocabulary gains a ratification kind and a stop
  kind. The stop kind carries the member, the condition and the asks.
  `form_check.ts`'s event list and its corpus gain them additively.
- B10. Child B's execute is dispatched only after P1-N014's execute is
  accepted. Child B's result names the commit of the contracts it read.
  It describes the contracts as they then stand, not as the plan
  describes them.
- B11. `node plugin/scripts/form_check.ts` passes clean, and
  `sync_agents.ts --check` passes.
- B12. The existing loop, gate and per-chunk text of `dispatch.md` is
  changed only by addition.

### Child C: the demonstration, a ratified sequence lands two chunks and stops on asks

**Outcome.** G1 to G3 hold on a live run.

**Interior.** Its children are the payload chunks. They are selected
against the rule below and entered as register nodes at the
ratification gate, with their Backlog entries. The cut inside child C
is deliberately not feature-first, as the plan records: the loop is
what is validated, and the payload is incidental.

**Criteria.**

- C1. The selection rule holds for every member. Each is an owned
  Backlog finding in this repository. Each is leaf-sized. Each lands
  inside this node's repository reach. The members are mutually
  independent, so a stop leaves the tree clean.
- C2. The first two members are chosen so that their results
  introduce no term and stage no decision. Finding 2 is the reason: a
  term introduced forces a ratification ask, which stops the sequence.
- C3. The last member is chosen because its work genuinely produces an
  ask the owner can act on at once. A hand-carry ask under RU-002 is
  the natural candidate. An ask written into a result to trip the
  predicate fails this criterion.
- C4. Each candidate's Backlog premise is re-read before selection.
  One plan candidate is already discharged: the stale P3-N001 sketch
  entry is now checked and marked superseded.
- C5. The selected sequence appears in a gate summary before it runs.
  The owner ratifies it once, in a committed gate record.
- C6. The run meets G1, G3 and I9, and each member's record meets
  decision 12.
- C7. The run's results are scored for all four conditions by child
  A's two-reading method. The verdicts join child A's record.
- C8. An early stop follows decision 15.
- C9. The register and Backlog are current in the same commits
  throughout.

### Child D: the determination on W-001, and the artifact or the argument

**Outcome.** The determination is recorded either way. A well-argued
"no amendment" is a complete deliverable (parent criterion I8).

**Deliverable.** Either an Article 8 amendment proposal in RU-015's
form, or a recorded argument that W-001 as released needs no change.
Adopted decision 5 adds the W-008 asks clarification, as checked
below. Two proposals travel with a cover note, on node P1-N015's
precedent.

**Criteria.**

- D1. The determination cites its evidence: child A's revisions and
  disagreements, child A's relation table, and child C's run.
- D2. Every "no counterpart" row of the relation table is answered.
  The answer is a proposed clarification or a reason none is needed.
- D3. A residue table checks the owner's 2026-09-17 asks clarification
  part by part against W-008 and the methodology's IR specification
  at the version child A used. The parts are: only asks the reader can
  act on now; an open question answerable on the spot may be an ask;
  an open question waiting on other activity is not; an item the report
  says needs no answer yet is not; open questions go to *What
  changed*. Each row quotes the text that now carries the part, or
  states that none does. Only the residue is proposed.
- D4. If no residue remains, the "Asks" Backlog entry closes with the
  residue table as its evidence, and no W-008 proposal is drafted.
- D5. The determination states how finding 2 bears on W-001. A
  ratification ask stops every sequence whose chunk introduces a term.
- D6. Any proposal meets P4. Its quotes are re-verified against the
  methodology at drafting, and its provenance line names the commit.
- D7. RU-005 gates this child at `verifying`.

A preliminary reading for D3, which child D confirms or corrects. The
pinned W-008 defines the asks as "the decisions and actions requested
of the reader". No sentence there restricts asks to what the reader
can act on now. The IR specification's Ask element carries a
`Depends:` field. It also renders a proposed claim without a `part:`
field under *What changed*. Those two may be the part the owner
believes the October amendments carried.

### Register action proposed with this specification

The four children are entered `identified`, with their Backlog
entries, at this specify gate. P3-N005 moves `planned` to `specified`
to `broken-down` in the same act, per RU-020. Child B's register line
records its dependency on child A and on P1-N014's execute. Child C's
line records its dependency on child B. Child D's line records its
dependency on child C. The plan document's Status moves `draft` to
`active`: its K-007 contract required that at the plan gate of
2026-10-29, and the line was not moved.

## Decisions for the gate

Numbering continues the plan's sequence, so one go-ahead adopts one
list. The plan carries 1 to 8, and this document carries 9 to 16. The
owner's go-ahead adopts every default not overridden by number.

**Precedents checked against the [Ruling register](../rulings.md).**
These active rulings are exact matches and decide silently: RU-002,
RU-003, RU-005, RU-012, RU-015, RU-016 and RU-020. RU-018 is the
authority for this node's independence from P3-N002. RU-019 (a
measurement criterion may be satisfied by an unfavourable result) is a
near match for decision 15. A near match argues a default; it does not
decide one.

9. **Which text of the meta-review signals child A relates to.**
   Default: **the pinned v1.6.0 text** (methodology commit `3e34829`,
   2026-10-28), with a row-by-row note on whether the rewording at
   commit `350f75f` (2026-10-29, awaiting adjudication) changes any
   row. Rationale: the Classification pins 1.6.0; the later rewording
   of signals 3 and 4 is unreleased, and a relation built on it could
   move under the node.
10. **The corpus is what is committed** (refines the premise of
    adopted default 3). Default: every task with a journal record at
    child A's cut-off commit, read only from committed artifacts: the
    journal events, the Cost log row, and the repository at the
    recorded ref. Condition 4's historical subset is whatever committed
    artifact carries an Asks part, with the gap stated as a count.
    Condition 4's agreement rests mainly on the demonstration's
    results. Rationale: finding 1; a verifier cannot re-read a session
    transcript, so a reading built on one is not evidence.
11. **Whose asks stop a sequence.** Default: **each ask in a task
    result names its addressee**. An owner-addressed ask stops.
    Requests to the Orchestrator travel in the result's existing
    fields, such as proposed register changes. An ask naming no
    addressee counts as owner-addressed. Rationale: finding 3; W-001's
    condition reads "requested of the human", and only a named
    addressee makes that a lookup.
12. **The audit record of a sequence member's result.** Default:
    **inside a ratified sequence, the Orchestrator's `result-received`
    event carries the result's status and its Asks part verbatim**, or
    the stated empty form. Outside sequences nothing changes, and the
    general rule is filed for P1-N016. Rationale: finding 1; W-001
    says summaries exist so the stop conditions stay auditable
    afterwards.
13. **What a ratification records.** Default: **`dispatch.md`'s
    scope-grant fields plus one line for accepted risks**, stated
    "none" when there are none. The fields are the ratified members as
    nodes and stages, any budget, any pre-authorizations, and any
    additional repositories. Rationale: the vision bounds a stream by
    scope, budget and accepted risks; the scope grant already carries
    two of the three.
14. **A meta-review signal with no W-001 counterpart.** Default:
    **recorded in child A's table, answered in child D's determination,
    and filed in the Backlog**. No fifth local stop condition is added
    by this node. Rationale: the plan's outcome is W-001's four
    conditions; the vision places in-stream stop signals on the
    roadmap; adding one here changes the node's scope.
15. **What an early stop in the demonstration does.** Default: **a
    genuine stop before two members land stands as a stop** and
    becomes evidence for child D. The owner may ratify a fresh
    sequence. After a second sequence fails to land two members, child
    C becomes `blocked` under `dispatch.md`'s bounded-attempts rule
    and escalates. Rationale: a stop is never overridden to meet a
    criterion, and the loop never retries its way through a failure.
16. **Who verifies this node.** Default: **attended**. The owner
    performs G2 at the gate, and the Orchestrator assembles the
    evidence. No Reviewer is dispatched. Rationale: the C1 profile is
    self-verification with a Reviewer at owner request; G2 rests on
    the owner applying the text himself; the parent gate took the same
    shape.


## Gate record, 2026-10-29

The owner accepted this specification and the breakdown on
2026-10-29, adopting defaults 9 to 16 with no override, decision 10's
restatement of adopted default 3's premise included, and ratified the
six terms this document introduced: stop predicate; fails closed;
addressee of an ask; member of a sequence; relation table; residue
table. Under RU-020 the four children were entered `identified` as
P3-N013 to P3-N016 and the node moved `specified` → `broken-down` in
the same act; P3-N014 also depends on P1-N014's execute. Decisions 9
to 16 were judged node-scope; no ruling was captured.

Corrections at P3-N014's plan gate, 2026-10-30, placed by task T069.
The owner adopted decisions 4 and 9 of the [plan of
P3-N014](../plans/p3-n014-loop-runs-sequence-mode.md) there. Criterion
B4 states what the audit record holds. It also states that the record
form is tried once, on P3-N014's execute task.

## References

- [p3-n005-sequence-mode](../plans/p3-n005-sequence-mode.md): this
  node's plan, its decisions 1 to 8, and its gate record of 2026-10-29
- [p3-n001-comprehension-and-continuous-implementation](p3-n001-comprehension-and-continuous-implementation.md):
  the parent specification, criteria G6, I8 and P4, and the *Chunk 4*
  additions
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md): the
  interior-node specification shape this document follows
- [dispatch.md](../process/dispatch.md): the loop this node changes,
  the owner-decision economics, the immediate class, the handoff
  contract and the bounded-attempts rule
- [roles.md](../process/roles.md): the role contracts and the
  model-tier table
- [plan-model.md](../process/plan-model.md): the node lifecycle and the
  interior-node verification rule
- [profiles.md](../process/profiles.md): the C1 depth this document is
  written to
- [observability.md](../process/observability.md): the run journal and
  its event vocabulary
- [Ruling register](../rulings.md): RU-002, RU-003, RU-005, RU-012,
  RU-015, RU-016, RU-018, RU-019, RU-020
- [Backlog](../backlog.md): the entries P2 names
- Methodology at the pinned v1.6.0:
  [W-001](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-001--two-delivery-modes-human-gated)
  (two delivery modes, human-gated),
  [W-008](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
  (reports map their deliverables), W-002 and W-003, and
  [the IR specification](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md)'s
  *Stranger rounds* and *Meta-review* sections
- Methodology after the pin, at commit `350f75f`:
  [vision.md](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vision.md)
  (*Gaps the roadmap closes*: stop signals inside a stream) and the
  vocabulary's *Stream* and *Meta-review signal* entries
