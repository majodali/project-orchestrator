# Project comprehension and continuous implementation — specification

Status: active

<!-- K-007 contract: Status transitions active → (superseded by X,
     because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. Went `active` 2026-09-17 at the gate
     that accepted it, together with the breakdown — the transition
     P2-N002's specification missed for three weeks. Goes
     `closed → Backlog entry` when node P3-N001 reaches `done`. -->

Node **P3-N001**, the third top-level node, specifying the outcome
fixed by its
[plan](../plans/comprehension-and-continuous-implementation.md). The
plan decided *what* and *why* — one abstract comprehension model
defined here and instantiated in each managed project, extending the
planning and execution model this project already has; dependencies
recorded and never inferred; a common risk catalogue maintained
upstream; reversibility made measurable; and a determination on
W-001's sequence mode — and proposed four chunks in dependency order.

The node has **no parent specification**: it is top-level, alongside
P1-N001 and P2-N001. Nothing above it constrains it except two
standing constraints it inherits by citation — the founding plan's
subscription-billing constraint, and the orchestration service plan's
constraint 3, degrade to git-only, which **I9** below carries into
this node.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria — integration is verified where it was specified
([plan-model](../process/plan-model.md)). So everything in
*Verification criteria* is a property no single child establishes.
Where a criterion needs a child to do something it was not already
going to do, the addition is named in *The breakdown* rather than left
implicit.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)).

**What this document does not do.** It does not decide chunk 1's
design. The plan's one open question — which register the model
extends, or whether it is a new one — is chunk 1's first design
decision and stays there, together with the two conflicts the plan's
register review names. Every criterion below is written to be
checkable **whichever way that question is answered**; where a
criterion would otherwise presuppose an answer, it states the
disjunction instead. Nothing here drafts the K-003 amendment, chooses
between replacing and constraining sibling ordering, or fixes a
notation.

**Repository reach (RU-016).** This node's work lands in **this
repository only**. Allegro is the driver and is not in approved scope;
everything the node needs from it is the observation already recorded
in the plan's *What Allegro already does — read 2026-09-16*. Every
criterion below is answerable from this repository's content, a
command run here, or an owner attestation. The plan carries no
Dependencies section, so this paragraph is the node's declaration; a
child that needs another repository declares it in its own plan, and
the owner is asked, because that repository would be new to the
project.

## Where the plan's register review went

The plan's *How the model meets the registers that already exist* is
analysis, not decisions, and it ends in two conclusions that are
**likely** rather than settled. A node that finishes with "an
amendment looked likely" and neither an amendment nor a reasoned
refusal has not finished. Each finding therefore lands on a criterion
that can be checked.

| Review finding | Disposition |
|---|---|
| Plan register — explicit edges against sibling ordering | **I2**: chunk 1 decides which; I2 holds whichever it decides |
| Plan register — the single-writer constraint reaches anything living in it | **I3** |
| Backlog — the overlap K-003 makes total | **I4**: a proposal, or a written argument that none is needed |
| Ruling register — rulings as dependency subjects, and the basis of rework | **G5**, **I7** |
| Risk register — catalogue class, project instance | **G7** |
| Cost log — one field short | **I7** |
| Run journal — events the model generates | **I6** |
| Specifications — a description that closes into completed work | **I10** |
| Classification — where a new type is declared | **I5** |
| Conclusion: two likely Article 8 amendments | **I4** and **I5**, each satisfied by a proposal **or** by a recorded argument that none is needed — never by a restated likelihood |
| Finding running through the review: four hand-written encodings of the same fact | **I1** |

## Verification criteria

**G** is the demonstration the owner watches. **I** is the integration
invariants that make it mean something. **P** is the process and
register state the node must leave behind.

The demonstration subject is **this repository**, self-hosted, as
enrollment already is. Decision 1 governs that choice and its
consequence for Allegro.

### G. The gate demonstration

- **G1 — One instance, populated from what already exists.** This
  repository carries one committed instance of the model, and its
  content was **derived from documents that already exist here** — the
  Plan register, the Backlog, the specifications, the Risk register,
  the Ruling register — not written fresh beside them. For a sample
  the owner picks at the gate, each item is traced back to the
  document it came from.
- **G2 — It answers the five questions.** For a part of this project
  the owner names **on the spot**, not chosen in advance, the instance
  answers: what it is, what state it is in, what specification it must
  meet, what risks attach to it, and what it depends on and what
  depends on it. No answer requires reading a document the model does
  not point at.
- **G3 — Navigation is quick, against a bound written down first.**
  Each of G2's five answers is reached within the navigation bound
  recorded in chunk 1's criteria **before** chunk 1 executes (decision
  5 proposes the default). A model that is correct and unreadable has
  failed — the plan's own words, made a number rather than a wish.
- **G4 — A dependency recorded at both moments, in one notation.** One
  edge recorded **during a breakdown** and one recorded **during a
  single node's preparation**, both in the same notation, both visible
  in the instance afterwards, and both producing a journal event.
  Each names an abstract resource one node creates or modifies and
  another uses, and neither was detected by a tool.
- **G5 — A blast radius is read off, not guessed.** A real subject
  this project has actually reversed or superseded is named — a Ruling
  register entry, a decision, or an artifact — and the set of nodes
  that consumed it is produced **from the recorded edges**. The owner
  checks the answer by hand against the register and the Backlog, and
  the two agree, or the difference is explained.
- **G6 — A sequence lands more than one chunk, and stops when it must.**
  Under W-001's pre-ratified mode, an owner-ratified chunk sequence in
  this repository lands **at least two consecutive chunks with no
  per-chunk gate between them**. Then a stop condition is induced
  deliberately — a result whose W-008 *Asks* section is non-empty —
  and the sequence stops on it, with the stop and its reason in the
  run journal. Performed, not reasoned about. Only the owner
  pre-ratifies; no agent does, at any point in the demonstration.
- **G7 — The catalogue is populated, cited, and its omissions are
  visible.** The common risk catalogue exists **with its entries in
  place**. At least one entry in this repository's Risk register is
  rewritten to cite the catalogue class it instantiates. And the
  class-to-instance check produces a **list of genuine omissions** —
  parts of this project with no entry citing a catalogue class that
  applies to them — which the owner reads at the gate. A check that
  returns an empty list on this project's own history is evidence the
  check does not work, not evidence the project is safe.

### I. Integration invariants

- **I1 — One notation, and the four hand-written encodings disposed
  of.** The plan's review finds this project already records
  dependencies in four places, each by hand, each in a different
  notation: the Plan register's sibling ordering, the Ruling
  register's `Applied:` lists, the Cost log's prose about what a
  rework row was rework of, and plan-to-plan cross references. Each of
  the four is either **read from the model's notation** or **retained
  with a stated reason**. An encoding left in place with neither is a
  defect of this criterion.
- **I2 — Sibling order is retired as a dependency signal, and nothing
  silently disagrees.** *Amended at the gate, 2026-09-17.* The owner
  settled the choice this criterion used to leave open: sibling
  ordering was a temporary stand-in for dependency information the
  register could not hold, and once edges are recorded it is
  **retired** — not reconciled with them, not checked against them.
  So: no rule, document or tool reads sibling position as a dependency
  once the model carries edges, and a search for the ones that do
  today comes back empty or names each survivor with its reason.
  `dispatch.md`'s "earlier siblings `done`" selection rule reads
  recorded edges instead ([RU-018](../rulings.md)), so a node is never
  held behind an unrelated sibling by an inference no document makes —
  the owner's P2-N012 finding, which the Backlog already carries. A
  register state that contradicts a recorded edge is still
  **reported**, not absorbed: the contradiction is induced on a
  scratch branch and the report observed.
- **I2a — The hierarchy survives as the primary form.** *Added at the
  gate, 2026-09-17.* Parent-child relationships are formally
  dependency relationships too, and the instance can be viewed or
  analysed as a flat graph where that is useful. But explicit
  parent-child structure, and everything it implies, is **kept**: the
  model is a hierarchy that can be read as a graph, not a graph that
  renders a tree for display. Evidence: the Plan register after the
  node still reads as the nested document it is today, and any graph
  view is derived from it rather than the other way round. The owner's
  reason is the criterion — the hierarchy is far easier to
  comprehend, which is this model's whole point.
- **I3 — The register's single writer survives.** The model's writer
  rule is stated and consistent with the Plan register's: either
  records made during a node's own preparation route through the
  Orchestrator, or the model's non-register parts have their own named
  writer and the register's existing fields are untouched by any other
  role. A role writing register-owned state is a defect of this
  criterion, not a new convention.
- **I4 — K-003 is honoured, and the amendment is proposed or
  refused.** Either an Article 8 amendment to K-003 exists as a
  drafted proposal in RU-015's delivery form, **or** a written
  argument shows the model introduces no second source of progress
  truth under K-003 as it stands. In both cases the Backlog and the
  model cannot disagree about a node's progress by construction: one
  is derived from the other, or a check reports the divergence and is
  demonstrated doing so. "An amendment looks likely" satisfies
  nothing.
- **I5 — The type declaration is closed and the Classification is
  accurate.** Either this repository's
  [Classification](../classification.md) declares the model instance's
  type by citation, the way it already declares four types, **or** the
  model demonstrably needs no new type because it is fields on
  existing ones and the argument for that is recorded. Either way,
  what the repository contains matches what it declares (Article 4
  declaration accuracy).
- **I6 — The journal can say what the model does.** Every model event
  the plan names — a dependency recorded during node preparation, an
  edge invalidated by a superseded ruling, a part's state changing —
  either has a kind in
  [observability.md](../process/observability.md)'s vocabulary or is
  recorded as a vocabulary gap with a named home. The existing gaps
  (`unblocked`, risk-opened) are either closed here or explicitly left
  to node P1-N016 with a pointer, not silently widened. The
  cross-check invariant still holds: every register stage change has
  its event, every Cost log row its `accepted` event.
- **I7 — The Cost log answers the rework question, including
  unfavourably.** The Cost log carries what a rework row is rework
  *of*, and **one real comparison is computed from this project's own
  history**: rework cost against the reviews it displaced. The
  measurement is recorded with its method. **A negative result
  satisfies this criterion**: if the number says continuous
  implementation is not paying here, the node records the number and
  the conclusion. A criterion satisfiable only by a favourable figure
  would not be a measurement.
- **I8 — W-001's stop conditions are applied the same way twice, and
  the upstream half may be a determination.** Two parts, and the
  second is deliberately weaker than the first.
  - *Local, and required.* The four stop conditions are written where
    a dispatched role meets them without looking, in terms an agent
    applies mechanically. Evidence: the conditions are scored against
    a set of **this project's own past task results** — the Cost log
    and journal hold thirty-eight — and two independent readings
    produce the same stop-or-continue verdict on each. "A chunk
    needing a maintainer decision" must be decidable, not judged
    afresh.
  - *Upstream, and optional.* Chunk 4 ends with **either** an Article
    8 amendment proposal in RU-015's form **or** a recorded argument
    that W-001 as released needs no change, each with its reasoning
    and its evidence. A well-argued "no mechanism, and here is the
    clarification that would have been one" satisfies this criterion
    in full. The plan expects a clarification rather than a new mode,
    and this criterion must not force one into existence.
- **I9 — Git-authoritative, human-readable, service-independent.** The
  instance lives in git and is readable and editable with a text
  editor. Everything G1–G5 demonstrates is done **at least once with
  no orchestration service running**, including G3's navigation bound.
  The service is an accelerator, never a dependency (orchestration
  service plan, constraint 3; [R10](../open-risks.md)).
- **I10 — The specification lifecycle question is answered.** Today a
  specification closes when its node closes, so the system's
  description disappears into completed work. The node ends with a
  recorded answer — component-scoped specifications with a node's spec
  as a delta against one, or "no change, because —". The answer is
  applied to this repository or explicitly scheduled; an open question
  restated is not an answer.
- **I11 — Monotonic, or authorized under W-002.** No previously
  defined functional test of the form checker, the shared register
  grammar, or the service is rewritten to make the model pass;
  `node plugin/scripts/form_check.ts` still passes its pre-existing
  rules, and the corpus's recorded expectations still hold except
  where new rules add to them. **This node proposes no planned
  non-monotonicity.** A rewrite proving necessary goes to the owner
  under W-002 before any test changes, never absorbed mid-execution.

### P. Process and register state

- **P1 — This repository is clean.**
  `node plugin/scripts/form_check.ts` passes; Plan register and
  Backlog stage designations agree; each of the four children reached
  `done` against its own criteria.
- **P2 — Documentation moved with the work (W-003).** The Backlog
  moved in the same commits as the work throughout. P3-N001's Backlog
  entry is rewritten to describe what shipped, and the **stale
  duplicate entry** — the pre-node sketch entry describing three
  chunks and a `draft` plan — is reconciled against it rather than
  left to contradict it.
- **P3 — The record exists.** A Cost log row for every dispatched task
  of the node, and run-journal entries for the gate demonstration.
  The Orchestrator writes both; the verifier checks they are there.
- **P4 — Upstream-bound output is in the delivery form, and the node
  completes at the artifact.** Any amendment proposal is final
  normative text with the current upstream text quoted verbatim beside
  it and a provenance line naming version, commit and date
  ([RU-015](../rulings.md)); it is hand-carried by the owner
  ([RU-002](../rulings.md)); and the node completes at the artifact,
  not at upstream disposition ([RU-003](../rulings.md)).
- **P5 — The risk this node introduces is registered.** The plan's
  *The risk this introduces* — a loop that continues while its own
  checks pass will continue through anything its checks do not cover —
  exists as a Risk register entry with its four mitigations each
  pointing at where it actually landed, and with the status of each.
  An entry whose mitigations point only at plan prose is not met.
- **P6 — Decisions are closed.** Every numbered decision in this
  document was adopted or overridden at the gate, and any override is
  reflected in the affected child's criteria **before** that child
  executes.

**G1–G7 are what the owner watches. I1–I11 and P1–P6 are what a
verifier who did not do the work checks against this repository.**

## How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria; a Reviewer pass is by owner request. This node's
`verifying` is an evidence assembly — each criterion answered with a
pointer to a commit, a document, a recorded measurement, a journal
event or a register entry — around the live demonstration at the gate.
Decision 7 proposes who performs it.

One asymmetry shapes the evidence, and it is the same one T029 worked
under. Allegro is not in approved scope, so **no criterion above may
be answered by reading it**. The four places a verifier reaches are
this repository's content, a command run here, this project's own
recorded history (Cost log, run journal, registers), and the owner's
attestation. Whether Allegro adopts the model is not evidence this
node can produce, which is why decision 1 exists.

Chunks 2 and 4 are proposal-class in part, so
[RU-005](../rulings.md) applies: their gate is at `verifying`, before
the artifact represents the project.

## Not verified here

Named so their absence is not read as oversight.

- **Allegro's adoption.** Out of scope by decision 1; a separate node
  with its own repository grant.
- **Lanes.** Neither a capability nor an outcome. Nothing in this node
  builds, models or counts them; how many parallel workstreams fall
  out of the recorded dependencies is a consequence a maintainer reads
  off.
- **Formal completeness of the model.** The plan settles the bar as
  speed, not completeness. A part of a project the model cannot yet
  describe is a Backlog item, not a failed criterion.
- **Dependency detection.** The model records declarations. Inferring
  edges, policing them, or deciding resource granularity are all
  ruled out by the plan and none of them is tested here.
- **Any hosted view or user interface.** Navigability (G3) is tested
  against what git and a text editor give. A rendered view is node
  P2-N003's territory and is likely to need re-specifying against
  chunk 1 — which this node does not do either.
- **Service support for the model.** Reading or writing the model
  through the orchestration service is a later service chunk. I9
  requires the model to work without it, not with it.
- **P1-N006's re-specification.** The plan confirms P1-N006 and
  P2-N003 are subject to change. Changing them is not this node's
  work.
- **Cross-project convergence.** That a second project's instance
  would take the same shape is an argument, not a verified fact, until
  a second project has one.

## The breakdown

**The four chunks stand as this node's children**, in the plan's
order, with the dependency structure made explicit rather than left to
list position. The node is **interior**.

Writing the criteria exposed no missing chunk and no wrong cut. The
cut is not feature-first in the plan-model's usual sense, and that is
deliberate and recorded here: chunk 1 is the only feature-shaped
child, and chunks 2, 3 and 4 are the three mitigations that make the
first one safe to use. Cutting them by feature would produce one
enormous child and three footnotes, which is exactly the shape the
plan argues against — the mitigations are chunks precisely because a
footnote does not get verified.

**Dependency structure.** Chunk 3 depends on chunk 1: its economics
are computable only once what depended on a reversed thing is
recorded. Chunks 2 and 4 depend on nothing in this node. Decision 2
proposes marking them independent so they are dispatchable alongside
chunk 1 rather than queued behind it. Holding an unrelated sibling
behind another is the defect chunk 1 exists to fix, and this node
should not commit it on its own children.

The additions below are **additions to the children's criteria**,
carried into the breakdown. None moves work between children or
changes a child's outcome. IDs are the Orchestrator's to issue.

**Chunk 1 — The comprehension model.** Interior. Deliverable: the
model, defined here as an extension of the planning and execution
model, plus one instance over this repository, plus whatever amendment
or declaration its own design decisions force. Its first design
decisions are the plan's open question and the review's two conflicts,
and this document does not touch them. **Additions**: (i) it leads
with a **thin end-to-end slice** — a handful of real parts of this
project carried all the way through state, specification, risks and
edges, before the notation is generalized (decision 4; R8 and
plan-model's thin-slice guidance, and a comprehension model is exactly
the artifact whose structural error is invisible until something is
populated); (ii) the **navigation bound** of G3 is written into its
criteria before it executes (decision 5); (iii) the two recording
moments of G4 are both in its criteria, since a model that accepts
only breakdown-time edges fails the node without failing the child;
(iv) its output states the disposition of each of the four existing
encodings named in I1; (v) it states the writer rule I3 checks.

**Chunk 2 — The common risk catalogue.** Deliverable: a populated
catalogue drafted in this repository, then proposed upstream —
populate first, propose second, per the plan's settled open question
3. **Additions**: (i) every entry carries the **real encounter** it
came from, with a date and an artifact, because that evidence is this
project's whole argument for the entries; (ii) the entry test is
stated and applied — a risk recurs *across* projects and must be
mitigated by each, rather than being tracked by one — and at least one
candidate is **rejected** by it in writing, so the test is shown to
have teeth; (iii) the class-to-instance citation and the omission
check of G7 are its criteria, not the model's; (iv) execution-environment
coverage is present, the class the plan previously admitted nothing
covered.

**Chunk 3 — Reversibility.** Deliverable: work inside an active
workstream made cheap to reverse and redo, and the measurement that
says whether it pays. **Additions**: (i) the Cost log field of I7 is
its change to make, in the Cost log type spec and the instance
together; (ii) it computes **one real comparison over this project's
own history** and records the method, including an unfavourable
result; (iii) it states what "reverse" means operationally for this
project's artifact classes — a commit, a document, a register entry, a
ruling — since a general claim of reversibility that no class
satisfies is worth nothing.

**Chunk 4 — Sequence mode.** Deliverable, in two halves that decision
3 proposes keeping together: the change that lets this project's own
dispatch loop run W-001's pre-ratified sequence mode, and the
determination on whether W-001 needs specialising upstream.
**Additions**: (i) the stop conditions are written where a dispatched
role meets them without looking, and scored against past results as
I8 requires; (ii) the asks-driven stop reads W-008's named section
rather than judging prose, and the owner's 2026-09-17 clarification of
what an *Asks* section may contain — only what the reader can act on
now — is applied, since it changes which results stop a sequence;
(iii) the determination is recorded either way, and **a reasoned "no
amendment" is a complete deliverable**.

**Register action proposed with this specification.** The four
children are entered as `identified` at this gate, without a separate
`break down` task, and P3-N001 moves `specified` → `broken-down` when
they are. Both earlier interior nodes took that path — P2-N002 and
P2-N012, the latter recording it explicitly — and the plan's chunk
descriptions plus the additions above are already at the depth a
break-down task would produce. Decision 8 states it so the owner can
override it. Each child gets a Backlog entry at identification
(K-003, founding ruling 1).

## Decisions for the gate

The plan carries no numbered decision list: its open questions 2 and 3
were settled before it went `active`, and question 1 is chunk 1's own
design decision, not a gate decision. So this document opens the
sequence at **1**. The owner's go-ahead adopts every default not
explicitly overridden by number.

**Precedents checked against the [Ruling register](../rulings.md).**
Four active rulings are exact matches and decide silently rather than
being re-raised: **RU-002** (upstream-bound output is hand-carried by
the owner; cross-repo scope is granted only explicitly), **RU-003**
(a node targeting an external party completes at the artifact, not at
upstream disposition — applied to chunks 2 and 4's upstream halves),
**RU-005** (proposal-class nodes are owner-gated at `verifying`), and
**RU-015** (the delivery form for a change to a repository this
project cannot write to). **RU-010** governs how this work reaches
`main`, and **RU-016** is the authority for the repository-reach
declaration above. RU-003 is cited again below as a *near*-match
rationale for decision 1, where the external party is a portfolio
project rather than an upstream repository; a near match argues a
default, it does not decide one.

1. **What this node is verified against, and whether Allegro is in
   scope.** Default: **this repository's own instance is the
   verification subject**, and Allegro's adoption is a separate node
   with its own repository grant, requested when it is wanted.
   Rationale: approved scope is single-repo, every criterion must be
   answerable by a verifier inside this project, and a node that
   completes only on another project's adoption cannot be verified by
   anyone who works on it (RU-003's reasoning, one step out).
2. **Whether chunks 2 and 4 wait for chunk 1.** Default: **no** — they
   are marked independent in the register and may be dispatched
   alongside chunk 1; only chunk 3 waits on it. Rationale: neither
   needs anything the model produces, and holding a node behind an
   unrelated sibling is precisely the defect chunk 1 exists to fix —
   committing it on this node's own children would be an argument
   against the node.
3. **Where the dispatch-loop change lives.** Default: **chunk 4
   carries both halves** — making this project's loop able to run
   W-001's pre-ratified mode, and the determination about specialising
   W-001 upstream. Rationale: the plan states plainly that this
   project implements only W-001's other mode and gives that work no
   other home; and a determination about a mode nobody has run here
   would be decided on paper, while G6 requires it run.
4. **Whether chunk 1 leads with a thin end-to-end slice.** Default:
   **yes** — a handful of real parts of this project carried through
   state, specification, risks and edges before the notation is
   generalized. Rationale: R8 and plan-model's thin-slice guidance,
   and the specific failure mode here is a notation that looks right
   until it meets real content.
5. **The navigability bound, and when it is fixed.** Default: **three
   steps** from any starting point to any of G2's five answers,
   written into chunk 1's criteria **before** chunk 1 executes.
   Rationale: "easy to navigate" is unverifiable without a number, and
   a number chosen after the demonstration is not a criterion. The
   figure is the owner's to set; fixing it early is the part that
   matters. *Adopted at the gate with latitude: the owner called three
   a reasonable position and reserved the right to modify it slightly.
   Chunk 1 may propose a different figure with its reasoning; it may
   not leave the figure unset, and it may not set it after the
   demonstration.*
6. **Whether an unfavourable reversibility measurement blocks the
   node.** Default: **no** — if the comparison says rework does not
   pay here, the node records the number, the method and the
   conclusion and still reaches `done`; the response is a plan change,
   not a failed node. Rationale: I7 exists to make the trade
   measurable, and a criterion satisfiable only by a favourable figure
   measures nothing.
7. **Who verifies this node.** Default: **attended** — the owner
   watches G1–G7 and the Orchestrator assembles the evidence; no
   dispatched Reviewer. Rationale: the C1 profile is self-verification
   with a Reviewer at owner request, G2 and G3 rest on the owner's own
   judgment of what he can find and how fast, and both earlier chunk
   gates took this shape.
8. **Whether the breakdown crosses at this gate.** Default: **yes** —
   the four children are entered as `identified` with their Backlog
   entries at this gate and no separate `break down` task is
   dispatched. Rationale: the plan's chunk descriptions plus this
   document's additions are already at the depth such a task would
   produce, and both earlier interior nodes crossed the same way.

## Gate record, 2026-09-17

The owner accepted this specification and the breakdown, adopting all
eight defaults with no override. Four rulings were captured from it:
[RU-017](../rulings.md) (a sibling project's adoption is a separate
node), [RU-018](../rulings.md) (a child is not queued behind a sibling
it does not depend on), [RU-019](../rulings.md) (a measurement
criterion may be satisfied by an unfavourable result) and
[RU-020](../rulings.md) (an interior node whose specification reaches
breakdown depth needs no separate `break down` task). Decisions 3, 4,
5 and 7 were judged node-scope and not recorded as rulings.

Two owner directions came with the go-ahead, and both changed this
document:

1. **The navigability bound is adopted with latitude** — three steps
   is a reasonable position and may be modified slightly. Decision 5
   carries the latitude and its limits.
2. **Sibling order as a dependency signal is retired, and the
   hierarchy is kept.** This settles half of what the plan's register
   review called a conflict and this specification's **I2** left to
   chunk 1: chunk 1 no longer chooses between replacing, constraining
   and checking against sibling ordering — it replaces. The other half
   of the direction is new and became **I2a**: parent-child
   relationships are formally dependencies too and the instance may be
   analysed as a flat graph, but the explicit hierarchy stays, because
   it is far easier to comprehend. The full direction is recorded in
   the plan's register review, under *Plan register*.

The plan's one open question — which register the model extends, or
whether it is a new one — is **still open** and still chunk 1's. The
gate narrowed it; it did not close it.

## References

- [comprehension-and-continuous-implementation](../plans/comprehension-and-continuous-implementation.md)
  — this node's plan: the outcome, the settled direction, the register
  review, the four chunks, and the one open question this document
  leaves where the plan put it
- [plan-model](../process/plan-model.md) — the node lifecycle, the
  interior-node verification rule, monotonicity, and the thin-slice
  guidance
- [profiles](../process/profiles.md) — the C1 specification depth this
  document is written to
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md) and
  [p2-n012-deploy-from-ci-on-merge](p2-n012-deploy-from-ci-on-merge.md)
  — the G/I/P shape and the interior-node breakdown confirmation this
  document follows
- [plan-register](../process/plan-register.md),
  [cost-log](../process/cost-log.md),
  [rulings](../process/rulings.md),
  [observability](../process/observability.md) — the four register
  type specs the model's criteria reach into
- [Classification](../classification.md) — where a model instance's
  type is declared, if it needs one (**I5**)
- [Risk register](../open-risks.md) — R8 (decision 4), R10 (**I9**),
  and the entry **P5** requires
- [Ruling register](../rulings.md) — RU-002, RU-003, RU-005, RU-010,
  RU-015, RU-016
- methodology **K-003** (**I4**), **W-001** (**G6**, **I8**),
  **W-002** (**I11**), **W-003** (**P2**), **W-008** (**G6**), and
  Article 8 (the two amendments the review calls likely)
