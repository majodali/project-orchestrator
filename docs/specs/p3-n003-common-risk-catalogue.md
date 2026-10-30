# The common risk catalogue: specification

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document for
     node P3-N003. It goes `active` when the owner accepts it and the
     breakdown at this node's specification gate. It goes
     `closed → Backlog entry` when the node reaches `done`. -->

Node **P3-N003** is chunk 2 of **P3-N001** (project comprehension and
continuous implementation). This document specifies the outcome its
[plan](../plans/p3-n003-common-risk-catalogue.md) fixed. The owner
accepted that plan on 2026-10-29 and adopted all nine of its defaults.

The plan decided six things:

- The outcome is a populated register of risk classes that every
  managed project must mitigate directly.
- The register is drafted here and proposed upstream through
  Constitution Article 8 (amendments, versions, and migration).
- The catalogue is populated first and proposed second.
- Every entry names the real encounter it came from, with a date and an
  artifact.
- A class-to-instance check applies the catalogue back to this project
  and produces a list of genuine omissions.
- The node is interior, with three children in a chain.

The parent [specification](p3-n001-comprehension-and-continuous-implementation.md)
gives this node two criteria. **G7** (the catalogue is populated, cited,
and its omissions are visible) is the gate criterion. **P4**
(upstream-bound output is in the delivery form, and the node completes
at the artifact) is the process criterion. The parent's breakdown adds
four requirements, numbered (i) to (iv) there, and this document carries
each of them.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria ([plan-model](../process/plan-model.md)). Everything under
*Verification criteria* is therefore a property no single child
establishes. A child's own criteria are under *The breakdown*.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)). This document reopens no plan
decision.

**What this document does not do.** It does not draft a catalogue
entry. It does not decide which Risk register entries instantiate which
class. It does not choose the catalogue's upstream wording. Those are
the children's work, and every criterion below is checkable whatever
the children find.

**Repository reach** ([RU-016](../rulings.md), the Planner declares a
node's repository access). The plan declares this repository only, read
and write. This specification refines that declaration in one respect.
Child C reads **majodali/methodology** read-only, at the commit its
provenance line names, because [RU-015](../rulings.md) (the delivery
form for a change to a repository this project cannot write to)
requires the current upstream text quoted verbatim. That repository is
not new to this project: node P1-N015 read it the same way for its four
proposals. No work is written outside this repository. The
communication-pipeline repository is not needed, because this
project's [roles.md](../process/roles.md) and
[dispatch.md](../process/dispatch.md) already carry the review
procedure child C runs under.

## Where the plan's gate decisions land

| Plan decision, adopted 2026-10-29 | Lands on |
|---|---|
| 1. One copy at `docs/proposals/common-risk-catalogue.md`, IDs `CR-001` onward, RU-015 form from the first commit | **I1**, **I2**, A1 |
| 2. Entries carry an applicability header in the methodology's grammar | *The entry shape*, decision 13, A2 |
| 3. "A part of this project" is an enumeration committed with the check | *The class-to-instance check*, **I4**, A7 |
| 4. The check is a documented procedure run by hand | **I9**, decision 4's Backlog entry |
| 5. Omissions are listed and dispositioned, not all closed | **G4**, B8 |
| 6. Two proposal documents: the catalogue and a cover note | C1, C8 |
| 7. The proposal does not wait for P3-N005's | *Not verified here* |
| 8. No entry for a class this project has not encountered | **I5**, B6 |
| 9. Every Risk register entry that instantiates a class cites it | **I7**, B7 |
| Gate note: methodology W-009 applies to the Article 8 proposal | **G6**, **I8**, C2 to C7, decisions 15 and 16 |

Methodology **W-009** (the methodology corpus writes its deliverables IR
first) is in the pinned version, 1.6.0. Its applicability header is
`[type: methodology-corpus]`. This project's declared type is
component/library, so W-009 does not bind this project by
Article 4 (applicability, then precedence). The owner's gate note
applies W-009's process to one deliverable: the Article 8 proposal,
because that text is written for the methodology corpus. Decision 15
states the consequence for the Classification.

## Definitions this specification fixes

Each definition below is what a verifier checks against. Each child
applies it unchanged, or returns `needs-judgment` with the reason it
cannot.

### The entry test

The plan states the entry test in one sentence: a risk recurs across
projects and must be mitigated by each, rather than being tracked by
one. Stated as a test, a candidate is put to four conditions.

- **ET-1, cross-project precondition.** The failure's precondition names
  no artifact, role, register or mechanism that exists only in this
  project. A candidate whose failure needs this project's orchestration
  loop, registers or tooling to occur fails ET-1.
- **ET-2, mitigation by each.** The mitigation must be applied inside each
  affected project. A candidate that one upstream change could remove
  for every project, without action by any project, fails ET-2. Such a
  candidate is a methodology or tooling amendment, not a catalogue
  entry.
- **ET-3, evidenced here.** This repository records at least one
  encounter of the failure, with a date and an artifact that resolves.
- **ET-4, decidable applicability.** The class's applicability can be
  written as an applicability header in Article 4's tag notation, the
  form methodology rule Q-004 (functional tests run against a deployed
  test environment) demonstrates. `[C0+]` is a valid header.

A candidate takes exactly one of four outcomes.

| Outcome | Condition |
|---|---|
| admit | ET-1 to ET-4 hold, and no admitted entry states the same class |
| merge | ET-1 to ET-4 hold, and an admitted entry states the same class; the candidate becomes an encounter of that entry |
| reject | ET-1, ET-2 or ET-4 fails; the record names the failing condition |
| defer | ET-1, ET-2 and ET-4 hold and ET-3 fails; the class goes to the catalogue's *What this catalogue does not yet cover* section |

A **candidate** is a failure as its source states it. A generalization
of a source's failure is a separate candidate, recorded with its
generalization stated. This rule stops a rejection from turning into an
admission by rewording.

The plan's two worked examples are the expected outcomes. Risk register
entry [R1](../open-risks.md) (dispatch oscillation) fails ET-1, because
its precondition is this project's dispatch loop. Entry R14 (dependency
search is an attack surface when agents shop for packages) passes ET-1
and ET-2.

### The entry shape

Each catalogue entry carries six fields.

| Field | Content |
|---|---|
| ID | `CR-nnn`, stable once issued, never reused |
| Class | the failure, stated as what goes wrong, never as the remedy |
| Applicability | an Article 4 applicability header deciding which projects the class applies to |
| Reaches | the kind of part of a project the failure occurs in |
| Mitigation | what every project in scope applies directly |
| Encounters | per encounter: a date, an artifact, and one sentence of what happened |

The **reaches line** is the field this specification adds to the plan's
shape. Decision 13 argues it. Article 4's tags describe projects, not
parts of projects. The class-to-instance check needs a statement about
parts to argue from, and the reaches line is that statement.

An **independent encounter** is an encounter that is neither the same
defect observed again nor found by the same investigation as another
encounter of the entry.

### The class-to-instance check

The check is a documented procedure, run by hand and recorded (plan
decision 4). It has three inputs.

- The catalogue, at a named commit.
- This repository's Risk register, `docs/open-risks.md`, at a named
  commit.
- The **parts enumeration**: the committed list of parts of this
  project, drawn from every checked entry of this repository's Backlog
  and of the service repository's Backlog, wherever it sits, the Plan
  register's `done` nodes, and a stated list of standing artifact
  classes (plan decision 3, refined at the gates of nodes P3-N010 and
  P3-N011).

A run has three steps.

1. **Project applicability.** For each class, the run evaluates the
   applicability header against the Classification of the repository
   that holds each part (refined at P3-N010's gate, 2026-10-30; see the
   gate record). Before the refinement this step read one Classification:
   the run evaluates the
   applicability header against this project's
   [Classification](../classification.md). A class whose header does
   not admit this project is recorded as not applicable, and step 2
   skips it.
2. **Reach.** For each applicable class and each part, the run records
   `applies` or `does not apply`, with a one-sentence argument from the
   class's reaches line. One argument may cover every part of one
   standing artifact class when the same reason holds for each. Every
   part still appears in the record.
3. **Coverage.** For each pair recorded `applies`, the run looks for a
   **covering entry**: a Risk register entry that cites the class and
   names the part, or names a scope the run argues contains the part.
   A pair with a covering entry records that entry's ID. Refined at the
   gate of node P3-N011 (its plan's decision 3): a covering entry's
   *Class* clause also states the exposure that the pair's step 2
   argument names. A pair whose argument names an exposure the clause
   does not state is an omission, and its item names that exposure.

An **omission** is a pair recorded `applies` that has no covering
entry. The run's output is the **omission list**. Each item names the
part, the class, the applicability argument and a disposition. The
disposition is one of three (plan decision 5): mitigated here, accepted
with a written reason, or routed to the Backlog.

An omission is **genuine** when two conditions hold. Its applicability
argument is written, so a reader can dispute it. The citations were
complete when the run read the Risk register (plan decision 9), so the
omission is not unfinished bookkeeping.

A **run record** names the commits of its three inputs, the date, and
the role that ran it.

### The negative control

The negative control proves the check can fail. It runs in five steps.

1. Choose a pair the latest run records as covered, with its covering
   entry.
2. On a scratch branch, remove that entry's citation of the class.
3. Run steps 2 and 3 of the check for that class.
4. Confirm the omission list now contains the chosen pair.
5. Discard the branch without merging it.

The record names the scratch branch's base commit, the citation
removed, and the pair that returned. A control whose pair does not
return is a failed check, not a passed control. Node P1-N009's drift
guard is the precedent: it was accepted because it was broken
deliberately, not because it was present.

## Verification criteria

**G** is what the owner reads at the gate. **I** is the integration
invariants that make it mean something. **P** is the process and
register state the node must leave behind.

### G. The gate reading

- **G1. The catalogue is populated, and every entry is evidenced.**
  The delivered catalogue holds exactly the entries the sweep record
  admits, no more and no fewer. Every entry carries at least one
  encounter with a date and an artifact that resolves. For three
  entries the owner picks at the gate, the Orchestrator opens each
  encounter's artifact, and the artifact shows what the encounter's
  sentence says. This criterion carries the parent's addition (i).
- **G2. The entry test has teeth.** The catalogue states the entry test
  as conditions ET-1 to ET-4 and the four outcomes. The sweep record gives
  every candidate an outcome, with each condition answered. At least
  one candidate is rejected, with the failing condition named and the
  reasoning shown. The owner picks one admission and one rejection at
  the gate and reads their reasoning. This criterion carries the
  parent's addition (ii).
- **G3. Execution-environment coverage is present.** One entry states
  the class *a check that cannot fail in the environment the code runs
  in*, or a refinement the sweep record argues. The entry records its
  encounters as decision 10 requires. This criterion carries the
  parent's addition (iv).
- **G4. The omission list is non-empty, argued and dispositioned.** The
  final run of the check, over the delivered catalogue and the cited
  Risk register, produces a non-empty omission list. Every item names
  its part, class, applicability argument and disposition. Every item
  routed to the Backlog has a Backlog entry. The owner reads the list
  at the gate. Each item he disputes is recorded with his reason, and
  its disposition is updated before the node reaches `done`. An empty
  list fails this criterion, because G7 calls an empty list evidence
  that the check does not work. This criterion carries G7 and the
  parent's addition (iii).
- **G5. The check is proven by breaking it, at the end.** The
  Orchestrator runs the negative control during the gate's evidence
  assembly. It runs against the delivered catalogue and the Risk
  register as cited at that time, not against child A's or child B's
  state. The chosen pair returns. The record names the commits.
- **G6. The proposal is readable and in the delivery form.** The owner
  reads the catalogue and its cover note at this node's `verifying`
  gate ([RU-005](../rulings.md), proposal-class nodes are owner-gated
  at `verifying`). Both documents meet RU-015's delivery form. Each has
  an intermediate representation (IR) beside it and a review record
  ending in a readable verdict. Decision 16 governs a count that
  reaches the limit instead. This criterion carries P4.

### I. Integration invariants

- **I1. One copy, and the IR is not a second one.** Exactly one file in
  this repository holds the catalogue's normative text. A search for
  each entry's Class sentence returns that file, its IR, its review
  record, and citations, and nothing else. The IR is not a copy in the sense of the
  catalogue's own stale-copy class. The methodology's IR specification
  makes the IR the source of the prose. Its render map makes a claim
  the prose dropped detectable by mechanical check CK-15 (round trip).
  The criterion holds when CK-15 passes on the delivered pair.
- **I2. Citations survive delivery.** Every `CR-nnn` cited from the
  Risk register resolves to an entry of the delivered catalogue, by ID
  and by anchor. No ID issued by child A or child B was renumbered or
  reused. A link check over `docs/open-risks.md` finds no dangling
  catalogue link.
- **I3. The catalogue is project-neutral.** The catalogue's normative
  text names this project only inside encounter records. Every
  encounter artifact in the delivered catalogue is a link that resolves
  from outside this repository: an absolute URL pinned to a commit. The
  parts enumeration, the sweep record and the run records live outside
  the catalogue (decision 11).
- **I4. The final run is reproducible from its record.** The final run
  record names the commits of the catalogue, the Risk register and the
  parts enumeration it read. A verifier who opens those three commits
  can follow every item of the omission list to its argument.
- **I5. Every entry rests on this project's encounters.** No entry's
  encounters cite another project's experience or general knowledge.
  The catalogue carries a *What this catalogue does not yet cover*
  section listing every deferred candidate, or stating that there is
  none (plan decision 8).
- **I6. Independence from P3-N002 held.** No criterion of this node, and
  no child's output, reads anything node P3-N002 (the comprehension
  model) produces ([RU-018](../rulings.md), a child is not queued behind
  a sibling it does not depend on). If P3-N002 lands during this node,
  the Backlog entry on reading the model's parts stays open and this
  node's enumeration stays as committed.
- **I7. The Risk register changed only where the node needs it.** The
  Risk register's preamble states the class-citation field once. Across
  the node, the register's diff adds citation lines and that preamble
  sentence, plus any entry a disposition of "mitigated here" adds or
  extends. Every other line of every existing entry is unchanged.
- **I8. The delivery form survived the review rounds.** Every verbatim
  upstream quotation in the delivered documents is byte-exact at the
  commit the provenance line names. No stranger-round fix touched a
  quotation. CK-15 passes on both documents.
- **I9. Monotonic.** No previously defined functional test is
  rewritten. `node plugin/scripts/form_check.ts` passes its
  pre-existing rules. The node adds no form-check rule (plan decision
  4). **This node proposes no planned non-monotonicity.** A rewrite
  that proves necessary goes to the owner under W-002 (existing tests
  are signals, not obstacles) before any test changes.
- **I10. Repository reach held.** Every commit of the node is in this
  repository. Child C's reads of majodali/methodology are at the
  commit its provenance line names.

### P. Process and register state

- **P1. This repository is clean.** `node plugin/scripts/form_check.ts`
  passes. Plan register and Backlog stage designations agree. Each of
  the three children reached `done` against its own criteria.
- **P2. Documentation moved with the work (W-003).** The Backlog moved
  in the same commits as the work. The node's Backlog entry is rewritten
  to describe what shipped. The three Backlog entries identified while
  planning this node (the omission check reading the model's parts, the
  mechanized half of the check, and the class with nowhere to live) are
  each still open with true text, or closed with the reason.
- **P3. The record exists.** A Cost log row for every dispatched task of
  the node, the stranger-round tasks included, and run-journal entries
  for the gate. The Orchestrator writes both. The verifier checks they
  are there.
- **P4. The node completes at the artifact.** The node is `done` when
  the proposal exists and the owner accepted it at the RU-005 gate.
  Nothing waits on upstream disposition ([RU-003](../rulings.md), a node
  targeting an external party completes at the artifact). Nothing is
  carried upstream by the node ([RU-002](../rulings.md), the owner
  hand-carries upstream-bound output).
- **P5. Decisions are closed.** Every numbered decision in the plan
  (1 to 9) and in this document (10 to 16) was adopted or overridden at
  its gate. Any override is reflected in the affected child's criteria
  before that child executes.
- **P6. Status lines are true.** The plan reads `active` from its gate
  of 2026-10-29 until the node is `done`, then `closed`. This
  specification reads `active` from its gate, then `closed`. The two
  proposal documents read `draft`, since nothing is delivered upstream.
  Each IR's Status follows the IR specification.

**G1 to G6 are what the owner reads. I1 to I10 and P1 to P6 are what a
verifier who did not do the work checks against this repository.**

## How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria, and a Reviewer pass is by owner request. Child C's
stranger rounds are a different review. They are prose review by the
Reviewer (stranger) role, which this project's prose-routing rule in
[dispatch.md](../process/dispatch.md) selects. They are not code
verification.

This node's `verifying` is an evidence assembly. Each criterion is
answered with a pointer to a commit, a document section, a run record,
a review record or a register entry. The assembly performs G5's
negative control itself, as P2-N002's gate assembly performed its own
equivalence check. Decision 14 proposes who performs the gate.

RU-005 applies to this node. The owner's `verifying` gate is where he
sees the proposal before it represents the project.

## Not verified here

Named so their absence is not read as oversight.

- **Upstream acceptance.** The node completes at the artifact (RU-003).
- **Other projects' adoption of the catalogue.** That is an argument the
  cover note makes, not a fact this node can produce.
- **Closing the omissions.** The node lists and dispositions them (plan
  decision 5). An omission routed to the Backlog is complete for this
  node.
- **Exhaustiveness of the sweep.** The sweep runs a stated method over
  five seams and records what it found. A class the method did not
  surface is not a failed criterion.
- **Mechanizing the check.** Filed to the Backlog by plan decision 4.
- **Classes this project has not encountered.** They are deferred,
  never asserted (plan decision 8).
- **The check over the comprehension model's parts.** A Backlog entry
  carries it until P3-N002 lands.
- **Travelling with P3-N005's proposal.** The owner may carry both
  together. Neither node waits for the other (plan decision 7).
- **A meta-review's outcome.** If a review record shows a meta-review
  signal, the delivering report asks the owner to dispatch the
  meta-review. Its result is not a criterion of this node.

## The breakdown

**The plan's three children stand**, in a strict chain: child A, then
child B, then child C. The node is **interior**. Writing the criteria
exposed no missing child and no wrong cut. Child B is still the largest
child. Its plan keeps it a leaf and runs it as three execute tasks in a
fixed order, split by source (plan of node P3-N011, decision 1).

Writing the criteria exposed three things the plan left implicit. Each
is now in a child's criteria.

- The negative control needs a covered pair. Child A may find that no
  Risk register entry covers any pair for its class. A9 says what child
  A does then.
- The catalogue will live upstream, so relative links from it to this
  repository will not resolve there. C9 converts encounter links to
  commit-pinned URLs.
- A stranger-round fix can change an entry's substance after child B's
  final run. C10 makes such a change visible and re-runs the affected
  class.

IDs are the Orchestrator's to issue. The criteria below are at the
depth a `break down` task would produce, so
[RU-020](../rulings.md) (an interior node whose specification reaches
breakdown depth needs no separate `break down` task) applies.

### Child A: one class, carried end to end

**Outcome.** The catalogue exists with one entry, the
execution-environment class, and the class-to-instance check is proven
on it by breaking it. It is the thin slice, and it exists to catch an
entry shape the check cannot read.

**Depends on**: nothing in this node. Independent of P3-N002 (RU-018).

- **A1.** `docs/proposals/common-risk-catalogue.md` exists with Status
  `draft` and a K-007 contract comment. The comment states three
  things: this is the only copy; the Risk register cites it by relative
  link; on upstream acceptance the citations re-point and this file
  closes. The file carries a provenance line in RU-015's form, naming
  the methodology version, commit and date. When no upstream passage is
  quoted yet, the line says so.
- **A2.** The catalogue's preamble states the entry shape once, with
  each of the six fields defined in one sentence.
- **A3.** The catalogue's preamble states the entry test as conditions
  ET-1 to ET-4 and the four outcomes, as defined in this specification.
- **A4.** `CR-001` is the execution-environment class, with every field
  filled.
- **A5.** Each of the four instances the plan names is dispositioned in
  the sweep record. Each is either an encounter record or a written
  reason it is not an independent encounter. `CR-001` records at least
  two independent encounters (decision 10).
- **A6.** The sweep record applies the entry test to `CR-001`, condition
  by condition. It applies the test the same way to at least one
  candidate that it rejects.
- **A7.** The check document holds the procedure as this specification
  defines it, and the parts enumeration. It holds one dated run record
  for `CR-001` alone, with every (`CR-001`, part) pair recorded
  `applies` or `does not apply` and argued.
- **A8.** The run's omission list for `CR-001` is non-empty, or the run
  record argues why an empty list is correct for this class. Every item
  has a disposition.
- **A9.** The negative control is performed for `CR-001` and recorded.
  If no Risk register entry covers any (`CR-001`, part) pair, child A
  first dispositions one omission as mitigated here. It writes the
  covering citation, re-runs the check, and runs the control against
  that citation.
- **A10.** The check document has a *Shape findings* section. It states
  what in the entry shape the check could not read, and what was
  changed. "None" is a valid answer when the reason is given.
- **A11.** `node plugin/scripts/form_check.ts` passes, and the Backlog
  moved in the same commit as the work.

### Child B: the sweep, the rest of the catalogue, and the omission list

**Outcome.** Every candidate in the five seams is dispositioned on the
record, the catalogue holds every admitted class, every Risk register
entry that instantiates a class cites it, and the final omission list
exists for the owner to read.

**Depends on**: child A.

- **B1.** The sweep record holds one pass per seam: the Risk register,
  the Backlog's Completed section, the Backlog's Upcoming section, the
  Cost log's notes column, and the Ruling register with the plan
  documents. Each pass states its method, meaning the documents read
  whole and the search phrases used. Each pass states counts of
  candidates found, admitted, merged, rejected and deferred.
- **B2.** The Risk register pass puts every entry the register holds at
  child B's dispatch to the entry test, with each condition answered.
  The pass names the register commit it read.
- **B3.** Every candidate the plan names appears in the sweep record
  with an outcome. That is the six in the plan's *raw material* table
  and the five in its following paragraph.
- **B4.** Every admitted entry has all six fields. Every encounter has a
  date and an artifact that resolves in this repository. Every
  generalized candidate is recorded separately, with its
  generalization stated.
- **B5.** At least one candidate is rejected in writing, with the
  failing condition named.
- **B6.** The catalogue's *What this catalogue does not yet cover*
  section lists every deferred candidate, or states that there is none.
- **B7.** Every Risk register entry the sweep finds instantiating a
  class carries a citation of that class. The register's preamble
  states the citation field. The diff meets I7.
- **B8.** The check runs at full scope over every class and every part.
  A part added to the enumeration is added with its date and source.
  The omission list is non-empty. Every item names its part, class,
  argument and disposition. Every item routed to the Backlog has its
  Backlog entry in the same commit.
- **B9.** The negative control is re-run against the finished
  catalogue and recorded.
- **B10.** Child B reads `docs/open-risks.md` and `docs/backlog.md` as
  they stand at its dispatch and at each commit. Its commits overwrite
  no edit another node made to either file. Nodes P3-N002 and P3-N005
  may be running alongside it.
- **B11.** `node plugin/scripts/form_check.ts` passes, and the Backlog
  moved in the same commits as the work.

### Child C: the Article 8 proposal, written IR first and reviewed

**Outcome.** The catalogue and a cover note exist as an Article 8
amendment proposal in RU-015's delivery form. Each was written IR first
and reached a readable verdict in stranger rounds under W-009 and this
project's prose-routing rule. Nothing is carried upstream.

**Depends on**: child B.

- **C1.** Two documents sit in `docs/proposals/`: the catalogue, and a
  cover note named `common-risk-catalogue-cover-note.md`. Both read
  Status `draft`.
- **C2.** Each document has its IR beside it, named `<subject>.ir.md`
  by the IR specification's document form. Both IRs carry Reader
  `RD-4` and Purpose `document`. The catalogue's IR carries
  `Normative: yes`. Both carry a Footprint header.
- **C3.** The IR specification's mechanical checks, CK-01 to CK-16, run
  on both IRs. The record says whether `mtool ir check` ran them or a
  role ran them by hand. No session here has `mtool` today. Every
  finding is fixed, or listed with its reason.
- **C4.** The catalogue is rendered by the role that wrote its IR,
  because its IR is normative (the methodology's rendering conditions;
  the communication pipeline's rule BP-02a, disposition D3). The cover
  note is rendered by the Paraphraser (rule BP-03, disposition D2).
  Both carry a render map, and CK-15 passes on both.
- **C5.** Each document's stranger rounds run under the Reviewer
  (stranger) role in [roles.md](../process/roles.md), a fresh instance
  per round, until a round returns readable or the count reaches the
  limit of ten. Each review record sits beside its IR. It names the
  communication-pipeline branch-point version and the roles.md text
  the rounds ran under. It records per round the prose word count, the
  IR claim count, the finding count, the verdict and the confirmation
  line. It ends with a `Meta-review:` line naming the signals checked.
- **C6.** The catalogue is final normative text. Every existing upstream
  passage the proposal changes is quoted verbatim beside the new text.
  A diff against majodali/methodology at the named commit confirms each
  quotation byte-exact, and the record of that diff is kept. A file the
  proposal adds upstream is declared new, and its absence at the named
  commit is confirmed. The provenance line names version, commit and
  date, and instructs the carrier to re-verify before carrying. No
  patch file exists anywhere in the repository.
- **C7.** The proposal is drafted against the latest released
  methodology version, as Article 8 requires. If a version later than
  1.6.0 is released before child C runs, the cover note says so and the
  result reports it to the Orchestrator.
- **C8.** The cover note follows the
  [delegated-work amendments cover note](../proposals/delegated-work-amendments-cover-note.md)'s
  shape. It states what is asked of the reader as accept, amend or
  reject, with this project's response under each. It links the
  evidencing instance, which is the sweep record and the final run
  record at a named commit. It carries an impact assessment across the
  Portfolio register's rows at the quoted commit. It carries a draft
  Release-register entry with its migration note stated, `none` or the
  action. It raises the Backlog's question of how a second project
  evidences a deferred class. It proposes the upstream path decision 12
  names.
- **C9.** Every encounter artifact in the catalogue is an absolute URL
  pinned to a commit of this repository, so it resolves upstream (I3).
- **C10.** Every entry's ID, Applicability, Reaches and Encounters
  fields survive rendering unchanged, or the review record lists the
  change. For each class whose fields changed, the check's steps 2 and
  3 are re-run, and the omission list is updated.
- **C11.** No stranger-round fix alters a verbatim quotation. A finding
  against a quotation is declined with the reason. A dangling link
  inside a quotation is recorded against the existing Backlog entry on
  such links, never fixed by editing the quotation.
- **C12.** If a count reaches the limit, child C returns
  `needs-judgment` (decision 16). The child is not `done` before the
  owner's decision.
- **C13.** `node plugin/scripts/form_check.ts` passes, and the Backlog
  moved in the same commits as the work.

RU-002, RU-003 and RU-005 apply to child C and are not re-raised as
decisions.

### Register action proposed with this specification

On acceptance of this task, P3-N003 moves `planned` → `specified`,
gated on the owner's review of this specification. At that gate, the
three children are entered as `identified` with their Backlog entries,
and P3-N003 moves `specified` → `broken-down` in the same act (RU-020).
Child B's register line records its dependency on child A, and child
C's on child B. Child A's line records its independence of P3-N002.

## Decisions for the gate

Numbering continues the plan's sequence, so one go-ahead adopts one
list: the plan carries **1 to 9**, and this document carries **10 to
16**. The owner's go-ahead adopts every default not overridden by
number.

**Precedents checked against the [Ruling register](../rulings.md).**
Four active rulings are exact matches and decide silently: RU-002,
RU-003, RU-005 and RU-015. RU-016 is the authority for the repository
reach declaration. RU-018 is the authority for independence from
P3-N002. [RU-019](../rulings.md) (a measurement criterion may be
satisfied by an unfavourable result) is a near match for decision 16
and argues its default; it does not decide it. RU-020 decides that no
separate `break down` task is dispatched. [RU-021](../rulings.md)
(the planning and execution model is the source of progress truth once
a project has one) changes nothing here until P3-N002 lands.

10. **How many encounters the execution-environment entry must record.**
    Default: each of the four instances the plan names is dispositioned,
    and the entry records **at least two independent encounters**. The
    plan's criterion 3 asked for "its four instances". Rationale: the
    Backlog records the `node -e` false negative and Vitest's module
    runner as one defect found in one investigation at task T025. A
    search of this repository's Markdown finds "bundle guard" only in
    the two plans that list it. The nearest recorded guard proven by
    breaking it is P1-N009's drift guard, which is a mitigation, not a
    failure. A criterion fixing the count at four
    would push child A to pad the entry, which plan decision 8 forbids.
    The Backlog holds further candidates. The in-memory lease backend
    that never sent a condition expression to DynamoDB is one. Node
    P2-N012's four deploy defects, each invisible to a passing test
    suite, are another.
11. **Where this project's records of the catalogue live.** Default: one
    project-local document, `docs/common-risk-catalogue-check.md`. It
    holds the sweep record, the parts enumeration, the check procedure,
    the dated run records, the negative-control records and the shape
    findings. The catalogue holds the entry shape and the entry test,
    and no record of this project's. Rationale: the catalogue travels
    upstream and must be project-neutral (I3). Article 8 asks for a link
    to the evidencing instance, not for its inclusion.
12. **The upstream path the proposal names for the catalogue.** Default:
    `docs/registers/common-risk-catalogue.md` in majodali/methodology,
    beside the Portfolio register. Rationale: `docs/registers/` is the
    methodology's existing home for a register that spans projects. The
    maintainer may amend the path at adjudication.
13. **Whether entries carry a reaches line beside the applicability
    header.** Default: **yes**. Rationale: Article 4's tags decide
    whether a class applies to a project. They say nothing about which
    part of the project it threatens. Without a reaches line, step 2 of
    the check has nothing to argue from, and the omission list becomes
    every part against every class, which is the noise failure the
    plan names.
14. **Who verifies this node.** Default: **attended**. The owner reads
    G1 to G6 at the RU-005 gate, and the Orchestrator assembles the
    evidence and performs G5's negative control. No Reviewer is
    dispatched for code verification. Rationale: the C1 profile is
    self-verification with a Reviewer at owner request, and the node's
    gate criteria rest on the owner's own reading of the omission list
    and the proposal.
15. **Whether applying W-009 to the proposal changes this project's
    Classification.** Default: **no**. The owner's gate note applies
    W-009's process to the Article 8 proposal only. This is not an
    adoption of W-009 by declaration. Rationale: W-009 binds the
    methodology-corpus type. The proposal's text is written for that
    corpus, which is the reason for the note. Adopting W-009 for every
    document of this project is a separate declaration the owner may
    make at any time. This project's dispatch rule already routes any
    task result that carries an IR, whether or not W-009 is declared.
16. **What happens if a stranger-round count reaches the limit.**
    Default: child C returns `needs-judgment`. The owner decides at the
    RU-005 gate whether the text is delivered, reworked or withdrawn, as
    the IR specification reserves that decision to him. Delivery after
    the limit satisfies G6 when the owner decides it, and the review
    record says so. Rationale: the IR specification already places the
    decision with the owner, and RU-005 already places a gate at that
    point. The methodology's own vision document ended its first count
    at the limit, round 10 not readable, so the case is not
    hypothetical. A criterion
    satisfiable only by a readable verdict could leave the node unable
    to finish (RU-019's reasoning, as a near match).


## Gate record, 2026-10-29

The owner accepted this specification and the breakdown on
2026-10-29, adopting defaults 10 to 16 with no override, and ratified
the ten terms this document introduced: entry test conditions ET-1 to
ET-4; admit, merge, reject and defer; reaches line; independent
encounter; parts enumeration; covering entry; genuine omission; run
record; sweep record; check document. Under RU-020 the three children
were entered `identified` as P3-N010 to P3-N012 and the node moved
`specified` → `broken-down` in the same act. Decisions 10 to 16 were
judged node-scope; no ruling was captured.

Refinement at P3-N010's gate, 2026-10-30 (its decisions 2 and 3,
adopted): step 1 of the class-to-instance check reads the
Classification of the repository that holds each part, so the service
repository's Classification becomes a fourth input to the run record;
the parts enumeration reads every checked Backlog entry wherever it
sits, not only the Completed section. Criterion I4 is read with this
refinement.

Refinement at P3-N011's plan gate, 2026-10-30, placed by task T069.
The owner adopted that plan's decisions there, three of them with
drafted text for this document. Child B stays a leaf, run as three
execute tasks split by source. A covering entry's *Class* clause also
states the exposure the pair's step 2 argument names. The parts
enumeration also reads the checked entries of the service repository's
Backlog.

## References

- [p3-n003-common-risk-catalogue](../plans/p3-n003-common-risk-catalogue.md):
  this node's plan, its decisions 1 to 9, its gate record of 2026-10-29,
  and the children's first criteria
- [p3-n001-comprehension-and-continuous-implementation](p3-n001-comprehension-and-continuous-implementation.md):
  the parent specification, **G7**, **P4**, and the four additions its
  breakdown names
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md): the
  specification shape this document follows, and the precedent for a
  gate assembly that performs its own check
- [plan-model](../process/plan-model.md): the interior-node verification
  rule, the node lifecycle, and the monotonicity definition
- [profiles](../process/profiles.md): the C1 specification depth
- [dispatch](../process/dispatch.md) and [roles](../process/roles.md):
  the prose-routing rule, the Paraphraser and the Reviewer (stranger)
  that child C runs under
- [Risk register](../open-risks.md): the register this catalogue is
  distinguished from, cited from, and swept first
- [Backlog](../backlog.md): the encounter records decision 10 rests on,
  and the three entries filed while planning this node
- [Ruling register](../rulings.md): RU-002, RU-003, RU-005, RU-015,
  RU-016, RU-018, RU-019, RU-020, RU-021
- [delegated-work-amendments-cover-note](../proposals/delegated-work-amendments-cover-note.md):
  the cover-note shape child C follows
- methodology 1.6.0: **W-009** (the methodology corpus writes its
  deliverables IR first), the intermediate representation
  specification (`docs/intermediate-representation.md`), Constitution
  **Article 4** (applicability, then precedence) and **Article 8**
  (amendments, versions, and migration), and rule **Q-004** (functional
  tests run against a deployed test environment), whose header is the
  applicability grammar's example
- the communication pipeline's branch point
  (`docs/branch-point.md` in majodali/communication-pipeline): rules
  BP-02a and BP-03 and the rounds procedure that this project's
  roles.md carries
