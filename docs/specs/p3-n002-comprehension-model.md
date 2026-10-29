# The comprehension model: specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document
     for node P3-N002. It goes `active` when the owner accepts it and
     the breakdown at this node's specification gate. It goes
     `closed → Backlog entry` when the node reaches `done`. -->

Node **P3-N002** is chunk 1 of node P3-N001
([plan](../plans/comprehension-and-continuous-implementation.md),
[specification](p3-n001-comprehension-and-continuous-implementation.md)).
This document specifies the outcome fixed by the node's
[plan](../plans/p3-n002-comprehension-model.md).

The plan decided four things the owner adopted on 2026-10-29. The
model is a new document type, the *Project model*, with type spec
`docs/process/project-model.md` and instance `docs/project-model.md`
(plan decision 1). The model adds one entity beside the node, the
abstract resource, flat, with one edge kind from node to resource
labelled `creates`, `modifies` or `uses` (decision 2). The Orchestrator
is the model's single writer (decision 4). The node is interior, with
four children in a chain (decision 8).

The owner overrode plan decision 3 at the same gate. K-003, the
methodology rule that the Backlog is the single source of progress
truth, is amended. RU-021, the ruling of 2026-10-29, records the
override: the planning/execution model is the source of progress truth
once a project has one. This repository is the evidencing instance for
the amendment. Child B drafts the amendment in the delivery form RU-015
requires. The model may carry what the amendment makes it
authoritative for.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria ([plan-model](../process/plan-model.md)). So every criterion
under *Verification criteria* is a property no single child
establishes. Where a node criterion needs a child to do something
extra, *The breakdown* names the addition.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)).

**Repository reach (RU-016, the ruling that the Planner declares a
node's repository access).** This node's work lands in this repository
only. The plan's *Dependencies* section is the declaration, and this
document does not change it. The K-003 amendment reaches the
methodology repository only as an artifact the owner hand-carries
(RU-002). The plan's trigger stands: if a new form-check rule must
change a recorded corpus expectation, the node stops, and the
Orchestrator grants reach to
[majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service)
under RU-016.

## What the gate of 2026-10-29 changed

The override changes six things this document carries.

1. **P3-N001 criterion I4 lands on its first disjunction.** I4 is the
   parent's criterion that K-003 is honoured and the amendment is
   proposed or refused. It is now met by a drafted Article 8 amendment
   in RU-015's form. Article 8 is the methodology's amendment article.
2. **W-009 binds the proposal.** W-009 is the methodology rule that the
   methodology corpus writes its deliverables IR first. IR means the
   intermediate representation the methodology specifies: a checked
   list of claims from which prose is rendered. W-009 applies to
   projects of type `methodology-corpus`. This project is a
   component/library. The proposal is written for the methodology
   corpus, so it is written IR first and reviewed by a stranger before
   the owner carries it. The K-003 amendment is normative text. W-009
   requires normative text to be rendered by the reasoning role that
   wrote the IR.
3. **RU-005 now applies to child B.** RU-005 is the ruling that
   proposal-class nodes are owner-gated at `verifying`. The plan's
   precedent check said RU-005 did not apply under its defaults. The
   override makes child B proposal-class.
4. **The plan's K-003 section no longer states current intent.** The
   plan's *K-003: no amendment, and the argument*, its *Consequences*
   bullet on I4, and decision 3's default all describe the overridden
   default. The plan's *Gate record, 2026-10-29* records the override.
   The body sections are not yet marked. See *Findings for the
   Orchestrator* at the end of the breakdown.
5. **The "built but broken" limit loses its stated premise.** The plan
   called that limit "the price of K-003 staying unamended". Child B
   states whether the limit stands under the amendment, and why
   (criterion B10).
6. **A new node-level criterion exists: the two renderings (G6
   below).** RU-021 makes the Backlog's two remaining jobs renderings
   of the planning/execution model. Those jobs are the implementation
   map and the list of what is next. An evidencing instance must show
   the model can produce both. No single child shows it.

The owner's note that resources stay flat now, and that hierarchical
resources may become necessary later, is recorded in the Backlog. This
document does not act on it.

## How this model relates to the planning/execution model

The methodology vocabulary defines the **planning/execution model** as
"the plan model of a project plus the verification evidence of each
node: what the web view renders and the source of progress truth". The
owner ratified the term on 2026-10-28. The definition is on the
methodology's `main` branch as of commit `350f75f`. It is not in the
pinned release, v1.6.0. The **web view** is the
project-orchestrator-service's interface for that model. Service chunk
2, node P2-N003, calls it the plan view.

In this repository the plan model is instantiated by three things. The
[Plan register](../plan-register.md) holds the hierarchy and each
node's stage. Each node's plan and specification documents hold its
outcome and criteria. After this node, the Project model instance
holds the resources, the edges, and the persisting description of each
part.

So the Project model is one component of this repository's
planning/execution model. It extends the plan model. It replaces no
part of it. The Plan register's line, grammar, nesting and writer stay
as they are (P3-N001 criterion I2a).

The definition's second component, the verification evidence of each
node, is not this node's work. The methodology's vision schedules it:
before the web view drills to code and test results, the plan model is
amended to record where each node's verification evidence lands. This
node adds no evidence-location field. The Backlog addition *Where each
node's verification evidence lands* holds that work.

Two consequences bind this node.

- **The progress-truth claim RU-021 makes is a claim about the whole
  planning/execution model.** Resource state stays derived from Plan
  register stages. The register is part of the planning/execution
  model, so a derived cell is no weaker an authority than a typed one.
- **The web view will render this model from commits.** The vision
  says the web view reads from commits only. So the instance's entry
  grammar must be stated precisely enough to parse (criterion B1).
  This node builds no service reader. Rendering the model in the web
  view is P2-N003's, which is likely to need re-specifying against
  this node.

## Where the parent's criteria went

P3-N001's specification assigns this node seven criteria and the gate
criteria G1 to G5. It also assigns I5 and I11 by consequence of the
plan's answer. This table names where each lands. Parent criteria are
written with the parent's node ID to keep them apart from this
document's own.

| Parent criterion | This node's criterion | Child carrying the work |
|---|---|---|
| P3-N001 G1 (populated from what exists) | G1 | A (slice), C (instance) |
| P3-N001 G2 (the five questions) | G2 | A, C |
| P3-N001 G3 (navigation bound) | G3, and *The navigation bound* below | A, C |
| P3-N001 G4 (both recording moments) | G4 | B (event kind), C, the Orchestrator |
| P3-N001 G5 (blast radius) | G5 | C |
| P3-N001 I1 (four encodings) | I1 | B, C, D |
| P3-N001 I2 (sibling order retired) | I2 | D |
| P3-N001 I2a (hierarchy kept) | I3 | D |
| P3-N001 I3 (single writer) | I4 | B |
| P3-N001 I4 (K-003) | I5, G6 | A (evidence), B (proposal), D (divergence check) |
| P3-N001 I5 (type declared) | I6 | B |
| P3-N001 I6 (journal vocabulary) | I7 | B |
| P3-N001 I9 (git only) | I9 | A, C |
| P3-N001 I10 (specification lifecycle) | I8 | B (rule), C (applied) |
| P3-N001 I11 (monotonic) | I10 | D |
| P3-N001 P4 (delivery form) | P4 | B |

## The navigation bound

This section fixes the bound P3-N001 criterion G3 requires before any
child executes. It adopts plan decision 6 and states it in checkable
form. Decision 9 below stages the exact wording.

**The number is three.** From any starting point, each of the five
answers for any resource in the instance is reached in at most three
steps.

**A step** is one of three acts.

- Opening a document, by following a link or by path.
- Following one link inside an open document, including a link to an
  anchor in the same document.
- Using the editor's find, once, for a resource's slug inside an open
  document. This counts the same as following the slug's anchor.

Scrolling within an open document is not a step. The starting document
is step zero.

**A starting point** is any document in this list.

1. `README.md`
2. The [Classification](../classification.md)
3. The [Plan register](../plan-register.md)
4. The [Backlog](../backlog.md)
5. The [Risk register](../open-risks.md)
6. The [Ruling register](../rulings.md)
7. The [Cost log](../cost-log.md)
8. Any plan document under `docs/plans/` or specification document
   under `docs/specs/`

The run journal is not a starting point. It is telemetry and never
authoritative.

**An answer is reached** when the document that states it is open at
the line that states it.

| Answer | Where it is stated | Worst case from a starting point |
|---|---|---|
| What it is | the entry's `is:` line | 2 |
| What state it is in | the entry's `state:` line | 2 |
| What specification it must meet | the specification document the `spec:` line links | 3 |
| What risks attach to it | the Risk register entry the `risks:` line links | 3 |
| What it depends on, and what depends on it | the entry's edge lines | 2 |

The worst case is step 0 (the starting point), step 1 (the instance,
by the header link), step 2 (the entry), step 3 (the linked document).

**The bound holds by construction when three structural conditions
hold.** A verifier checks each by inspection.

- (i) Every starting point links the instance in its header.
- (ii) Every resource entry has an anchor or a slug findable in one
  find.
- (iii) Every resource entry carries all five facets as labelled
  lines, and its `spec:` and `risks:` lines are links.

The structure is necessary and not sufficient. The bound is also
measured on real paths, at the gate, from a starting point the owner
picks (G3).

**When the bound may change.** A child that finds three unattainable
returns `needs-judgment`. The owner decides before child C executes. No
child changes the number or the definitions itself. No one changes
them after the demonstration (P3-N001 decision 5).

## Verification criteria

**G** is the demonstration the owner watches. **I** is the integration
invariants that make it mean something. **P** is the process and
register state the node leaves behind.

The demonstration subject is this repository, self-hosted. RU-017, the
ruling that a sibling project's adoption is a separate node, keeps
every other project out of scope.

### G. The gate demonstration

- **G1: one instance, populated from what already exists.** This
  repository carries one committed instance, `docs/project-model.md`.
  Its items were derived from documents that already exist here: the
  Plan register, the Backlog, the specifications, the Risk register
  and the Ruling register. For a sample the owner picks at the gate,
  each item is traced to the document it came from.
- **G2: it answers the five questions.** The owner names a part of
  this project on the spot. The instance answers what it is, what state
  it is in, what specification it must meet, what risks attach to it,
  and what it depends on and what depends on it. No answer needs a
  document the instance does not link.
- **G3: navigation is within the bound.** Each of G2's five answers is
  reached within the bound fixed in *The navigation bound*. The owner
  picks the starting point. The path is recorded step by step. The
  three structural conditions hold across the whole instance.
- **G4: a dependency recorded at both moments, in one notation.** One
  edge was stated during a breakdown. One edge was stated during a
  single node's preparation, in that node's plan's *Dependencies*
  section. Both are in the instance afterwards, in the notation the
  type spec defines. Each has a journal event of the kind child B
  adds. No tool detected either. Neither was staged for the
  demonstration. *The breakdown* names the two sources.
- **G5: a blast radius is read off, not guessed.** The owner names a
  subject this project has reversed or superseded: a ruling, a
  decision, or an artifact. The set of nodes that consumed it is
  produced from the recorded edges. The owner checks the set by hand
  against the Plan register and the Backlog. The two agree, or each
  difference is explained.
- **G6: the model renders the Backlog's two remaining jobs.** This is
  the evidence RU-021 makes this repository supply. From the
  planning/execution model alone, two renderings are produced by the
  procedure the type spec states: the implementation map, and the list
  of what is next. A rendering here means what the IR specification's
  rendering rule means for prose: it adds no claim its source lacks
  and drops no claim its source holds. Each rendering is compared with
  the Backlog as it stands. Each difference is listed and classified:
  the model lacks a claim, the Backlog lacks a claim, or the two
  disagree. Each difference is either fixed or carried as a Backlog
  item. A listed difference does not fail the criterion. An
  unexplained difference does. RU-019, the ruling that a measurement
  may be satisfied by an unfavourable result, is the near match.

### I. Integration invariants

- **I1: the four hand-written encodings are disposed of.** P3-N001's
  review found four places this project records dependency by hand.
  Each is read from the model or retained with its reason recorded.
  - The Plan register's sibling ordering: read from the model, by
    child D (I2).
  - The Ruling register's `Applied:` lists: retained, with the reason
    recorded where a reader of the Ruling register type spec meets it
    (plan decision 5).
  - The Cost log's prose about what a rework row was rework of:
    assigned to node P3-N004, with the resource slug as the vocabulary
    that column will cite. The assignment is recorded in the type
    spec.
  - Plan-to-plan cross references: a plan's *Dependencies* section is
    the single authoring point for a node's edges, and links between
    plans keep only their navigation meaning.
- **I2: sibling order is retired as a dependency signal.** A search of
  `docs/`, `plugin/` and `.claude/agents/` for rules, documents and
  tools reading sibling position as a dependency comes back empty, or
  names each survivor with its reason. The search terms and results
  are recorded. The selection rule in
  [dispatch](../process/dispatch.md) reads recorded edges. A register
  state that contradicts a recorded edge is reported by the form
  checker. The contradiction is induced on a local scratch branch and
  the report observed.
- **I3: the hierarchy survives as the primary form.** The Plan
  register after the node reads as the nested document it is today.
  `plugin/scripts/lib/plan-register.ts`, the shared register grammar,
  is byte-identical across the node's commits. Any graph view of the
  instance is derived from the hierarchy and the edges.
- **I4: the single writer survives.** The type spec names the
  Orchestrator as the model's single writer. Other roles propose
  entries and edges in their task results. No role other than the
  Orchestrator writes Plan register fields in any commit of the node.
  Children A and C write the instance as their dispatched work. The
  type spec states how that bulk work fits the writer rule, so it is a
  stated case and not a silent exception.
- **I5: K-003 is amended by a drafted proposal, and the model and the
  Backlog cannot silently disagree.** A K-003 amendment proposal
  exists under `docs/proposals/`, in RU-015's form, with its IR beside
  it. Its *Motivated-by* cites this repository's instance at a pinned
  commit. What the amendment says the model is authoritative for is
  exactly what the type spec lets the model carry. A form-check rule
  reports divergence between a resource's written state, its
  derivation from register stages, and the Backlog. The rule is
  demonstrated firing.
- **I6: the type declaration is accurate.** The Classification
  declares the *Project model* type by citation, as its fifth custom
  definition. What the repository contains matches what it declares
  (Article 4, declaration accuracy). Nothing in this repository claims
  for the model an authority that K-003 as released at the pinned
  version denies, unless the owner takes option (b) of decision 13.
- **I7: the journal can say what the model does.** The edge-recorded
  event kind exists in [observability](../process/observability.md)'s
  vocabulary and in the form checker's event list. The parent plan
  names two further model events: an edge invalidated by a superseded
  ruling, and a part's state changing. Each has a kind, or is recorded
  as a vocabulary gap with a named home. The existing gaps,
  `unblocked` and risk-opened, stay with node P1-N016 and are not
  widened. The journal cross-check still holds.
- **I8: the specification lifecycle is answered and applied.** The
  type spec records the answer: the resource entry is the persisting,
  component-scoped description, through its `is:` line and its
  `spec:` links. A node's specification keeps its K-007 lifecycle.
  Before it closes, its durable content is carried onto the resources
  it specified, in the acceptance commit. The answer is applied: every
  specification in `docs/specs/` whose Status is `closed → Backlog
  entry` has its durable content on the resources it specified.
- **I9: git-authoritative and service-independent.** The instance
  lives in git and is read and edited with a text editor.
  Everything G1 to G6 demonstrates is done at least once with no
  orchestration service running, including the navigation bound. The
  evidence names the session and states that it called no
  orchestration service tool.
- **I10: monotonic.** No previously defined functional test is
  rewritten. `node plugin/scripts/form_check.ts` passes its
  pre-existing rules at every commit of the node. Every file the
  vendoring manifest carries is byte-identical across the node's
  commits: `plugin/scripts/lib/plan-register.ts` and
  `plugin/scripts/lib/corpus/`. The new rules emit nothing on a tree
  that declares no instance. **This node proposes no planned
  non-monotonicity.** A rewrite proving necessary goes to the owner
  under W-002, the rule that existing tests are signals, not
  obstacles, before any test changes.

### P. Process and register state

- **P1: this repository is clean.** `node plugin/scripts/form_check.ts`
  passes with the new rules active. The Plan register and the Backlog
  agree. Each of the four children reached `done` against its own
  criteria.
- **P2: documentation moved with the work (W-003).** The Backlog moved
  in the same commits as the work. P3-N002's Backlog entry is
  rewritten to describe what shipped. Four existing Backlog entries
  are closed into this node or rewritten, each with its disposition
  stated:
  - *Plan nodes have no way to state a dependency* (owner finding at
    the P2-N012 gate);
  - *A plan document has no declared place for RU-016's
    repository-reach declaration*;
  - *P3-N002 and P1-N016 both reach `dispatch.md`'s selection rule*;
  - *The comprehension model cannot say "built but broken"*.
- **P3: the record exists.** Each dispatched task of the node has a
  Cost log row. The gate demonstration and the G4 recordings have
  run-journal entries. The Orchestrator writes both; the verifier
  checks they are there.
- **P4: upstream-bound output is in the delivery form, and the node
  completes at the artifact.** The K-003 proposal carries final
  normative text, the current K-003 text quoted verbatim, and a
  provenance line naming the version, the commit and the date the
  quote was taken (RU-015). The owner hand-carries it (RU-002). The
  node completes at the artifact, not at upstream disposition
  (RU-003).
- **P5: the risk record is current.** The Risk register entry R10
  records the divergence check of I5 as a mitigation, with its
  demonstration.
- **P6: decisions are closed.** Every numbered decision of the plan
  (1 to 8) and of this document (9 to 15) was adopted or overridden at
  its gate. Any override is reflected in the affected child's criteria
  before that child executes.

**G1 to G6 are what the owner watches. I1 to I10 and P1 to P6 are what
a verifier who did not do the work checks against this repository.**

## How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria. A Reviewer pass is by owner request.

Child B differs in two ways. Its proposal goes through stranger rounds
under W-009 before its `verifying`. Its `verifying` is an owner gate
under RU-005.

This node's `verifying` is attended (decision 15). The Orchestrator
assembles the evidence: each criterion answered with a pointer to a
commit, a document, a recorded path, a journal event or a register
entry. The owner performs G2, G3 and G5 live and reads G6's
comparison. The demonstration runs from git and a text editor, with no
orchestration service running (I9).

A verifier reaches four sources: this repository's content, a command
run here, this project's recorded history, and the owner's
attestation. No criterion is answered by reading another repository.
The K-003 quote's provenance is checked against the methodology
repository by the owner when he carries it, as RU-015's re-verify
instruction says.

## Not verified here

- **The Backlog switched to a rendering in this repository.** Under
  decision 13's default, the Backlog stays the referent until the
  amendment is released and pinned. G6 proves the model can render
  it. The switch is a Backlog item.
- **Upstream disposition of the K-003 amendment.** Not this project's
  to verify (RU-003).
- **The web view.** Rendering the model in the service is node
  P2-N003's, or a later service chunk's.
- **Service support for the model.** P3-N001 criterion I9 requires the
  model to work without the service.
- **Where each node's verification evidence lands.** The second
  component of the planning/execution model; a Backlog item.
- **A rendering tool.** The renderings of G6 follow a stated procedure.
  Mechanizing it belongs with the switch above.
- **Hierarchical resources.** The owner's note of 2026-10-29; a future
  discussion.
- **The Cost log's rework field.** Node P3-N004's (P3-N001 I7).
- **Retiring `Applied:`.** Declined by plan decision 5; a Backlog item.
- **Adoption by another project.** methodology-tools is the first
  adopter the owner named on 2026-10-29. Its adoption, and Allegro's,
  are separate nodes (RU-017).
- **Merging with Allegro's planning model.** The vision leaves the how
  and when to the owner after the pilot.
- **Formal completeness.** A part the instance cannot yet describe is
  a Backlog item, not a failed criterion.
- **Dependency detection.** The model records declarations. Nothing
  infers edges.

## The breakdown

**The four children of plan decision 8 stand,** with the override
folded into child B. The cut is by iteration, not by feature, for the
reason the plan records: the model is one atomic feature, since an
instance that answers four of the five questions answers none of G2.

Writing the node criteria exposed two defects in the plan's breakdown
and three additions.

- **Defect: the derivation rule yields cycles.** *Edges stated at this
  breakdown* shows how. Child B resolves it (criterion B1).
- **Defect: the journal event kind was in the wrong child.** The plan
  gave child C the G4 recordings "each producing a journal event", and
  gave child D the event kind. C runs before D. A journal event of an
  undeclared kind is a `journal-form` violation of the form checker.
  So the event kind moves to child B, which already changes
  `docs/process/`. Nothing else moves.
- **Addition to A: the slice also runs through both renderings.**
  Child B's proposal needs evidence when it is drafted. The slice is
  that evidence. G6 later re-runs the renderings over the full
  instance.
- **Addition to B: the K-003 amendment, IR first.** By RU-021 and
  W-009.
- **Addition to C: the full renderings and the G4 breakdown record.**

None of these changes a child's outcome. IDs are the Orchestrator's to
issue.

### Edges stated at this breakdown

This list is the breakdown-moment record G4 needs. It uses the plan's
sketch notation. Child B may refine the notation. The Orchestrator
transcribes these edges into the instance at child B's acceptance,
without changing their meaning, with one journal event per edge naming
this document as the authoring point.

The resource slugs used:

- `project-model`: the instance, `docs/project-model.md`
- `project-model-type`: the type spec, `docs/process/project-model.md`
- `k-003-amendment`: the proposal under `docs/proposals/`
- `classification`: `docs/classification.md`
- `observability-vocabulary`: `docs/process/observability.md`
- `form-checker`: `plugin/scripts/form_check.ts` and
  `plugin/scripts/lib/form-check-core.ts`
- `dispatch-rules`: `docs/process/dispatch.md`
- `plan-model-spec`: `docs/process/plan-model.md`
- `plan-register-type`: `docs/process/plan-register.md`
- `plan-register`: `docs/plan-register.md`
- `backlog`: `docs/backlog.md`
- `RU-015`, `RU-016`, `RU-018`, `RU-021`: rulings

The edges:

- **Child A** creates `project-model`; modifies `backlog`; uses
  `RU-016`, `RU-021`.
- **Child B** creates `project-model-type`, `k-003-amendment`;
  modifies `classification`, `observability-vocabulary`,
  `form-checker`, `backlog`; uses `project-model`, `RU-015`, `RU-021`.
- **Child C** modifies `project-model`, `backlog`, and the header of
  every starting point; uses `project-model-type`, `plan-register`,
  `backlog`.
- **Child D** modifies `dispatch-rules`, `plan-model-spec`,
  `plan-register-type`, `plan-register`, `form-checker`, `backlog`;
  uses `project-model`, `project-model-type`, `RU-018`.

**The intended chain follows from the `creates` edges.** B uses
`project-model`, which A creates. C uses `project-model-type`, which B
creates. D uses `project-model` and `project-model-type`, which A, B
and C create or modify. So A, B, C, D is a chain, and no pair is
independent.

**Applied as the plan states it, the derivation rule also yields
cycles from these edges.** The plan's rule: node X depends on node Y
if X uses a resource Y creates or modifies. C uses `plan-register`,
and D modifies its header line, so C would depend on D. C uses
`backlog`, and every child modifies it, so C would depend on D again.
The rule has no notion of order between a use and a later
modification. Writing the edges of a real breakdown exposed this
before any child executed, which is what the thin slice exists to do.
Criterion B1 requires the type spec to resolve it.

### Child A: the thin end-to-end slice, five real parts all the way through

**Outcome.** `docs/project-model.md` with five resource entries, each
carried through `is`, `state`, `spec`, `risks` and edges, and through
both renderings. The notation is written down only as far as those
five need. The slice may invalidate the plan's sketch; a slice that
cannot is not a slice.

**The five.** The plan's candidates: the form checker (many modifying
nodes), the shared register grammar (consumed across a repository
boundary), the run journal (a process document as its specification),
RU-016 (a ruling as a resource), and this repository (a repository as
a resource). A may substitute one, with the reason recorded, if it
keeps a ruling, a repository and a cross-repository resource among the
five.

**Criteria.**

- A1. Five entries exist. At least one is a ruling, one is a
  repository, and one is consumed across a repository boundary.
- A2. Each entry answers all five questions, each on a line labelled
  with its facet.
- A3. Every item in each entry names the document it was derived from.
  No item lacks a source.
- A4. For each of the five entries and each of the five answers, a
  path is recorded step by step from at least two starting points. One
  is the Backlog and one is a specification document. Every path is
  within the bound. A adds the instance link to the header of each
  starting point it measures from.
- A5. The derivation and the measurement are done from git and a text
  editor, with no orchestration service tool called. The record says
  so.
- A6. For each of the five resources, the implementation-map entry and
  any open what-is-next item are rendered from the entry and the Plan
  register. Each rendering is compared with the Backlog. Agreements
  and differences are recorded, classified as G6 classifies them.
- A7. A slice record states what the slice changed in the plan's
  sketch notation, and why. "Nothing changed" is admissible only with
  each sketch line confirmed against an entry.
- A8. The record states whether three steps held for every path. If it
  did not, A returns `needs-judgment` and does not change the bound.
- A9. Nothing under `plugin/` changes. `node plugin/scripts/form_check.ts`
  passes. The Backlog moves in the same commit.

### Child B: the type declared, the arguments written, the K-003 amendment drafted

**Outcome.** The type spec `docs/process/project-model.md`. The
Classification's fifth custom definition. The writer rule, the
authoring point, the specification-lifecycle answer and the `Applied:`
retention reason, each stated where a reader meets it. The edge-recorded
journal kind. The K-003 amendment proposal under `docs/proposals/`,
with its IR beside it, stranger-reviewed.

**Executing role.** Advanced tier (decision 14). W-009 requires the
role that writes the IR of normative text to render it.

**Criteria: the type.**

- B1. The type spec defines the entry grammar precisely enough that a
  parser could be written from it alone. It defines the five facets,
  the edge labels `creates`, `modifies` and `uses`, the slug-stability
  rule with alias lines, and the state derivation from register stages
  (`planned`, `building`, `built`, `built, changing`). It states the
  derivation as a table a verifier can apply by hand. It states how
  node-to-node dependency is derived when a later node modifies a
  resource an earlier node uses. Applied to *Edges stated at this
  breakdown*, the derivation yields the chain A, B, C, D with no cycle.
- B2. The type spec states both rendering procedures of G6, step by
  step, in terms of the instance and the Plan register only. The
  what-is-next procedure uses the same derivation child D writes into
  `dispatch.md`'s selection rule: a node is actionable when every node
  that creates or modifies a resource it uses is `done`.
- B3. The Classification declares the type by citation, with the
  instance named. The repository contains what it declares
  (Article 4).
- B4. The writer rule names the Orchestrator as the single writer, and
  says roles propose entries and edges in their task results. The rule
  is stated in the type spec and wherever this project defines what a
  task result carries. If that includes the role contracts in
  `.claude/agents/`, B reads them as they then stand and regenerates
  `plugin/agents/` with `node plugin/scripts/sync_agents.ts`. The rule
  states how a dispatched task that creates or populates the instance,
  as children A and C do, fits it.
- B5. A plan's *Dependencies* section is named as the single
  authoring point for a node's edges and its repository reach, in
  `plan-model.md` or `dispatch.md`. This closes the Backlog entry on a
  missing declared place for RU-016's declaration.
- B6. The specification-lifecycle answer of I8 is recorded in the type
  spec.
- B7. The `Applied:` retention reason is recorded in
  [rulings](../process/rulings.md), the Ruling register type spec, or
  in the type spec with a link from it.
- B8. The edge-recorded event kind is added to
  [observability](../process/observability.md) and to the event list
  in `plugin/scripts/lib/form-check-core.ts`. A Vitest test outside
  `plugin/scripts/lib/corpus/` covers it. The other two model events
  of I7 each get a kind or a recorded gap with a named home.

**Criteria: the K-003 amendment.**

- B9. The proposal carries final normative text for K-003 within the
  scope decision 10 fixes. Beside it is K-003's current text, quoted
  verbatim. A provenance line names the version, the commit and the
  date the quote was taken, with an instruction to re-verify before
  carrying (RU-015). The quote is taken from the v1.6.0 tag and
  checked unchanged against the methodology's `main` at drafting.
- B10. The proposal states three answers. What the planning/execution
  model is authoritative for. Where an open Backlog entry that names no
  node lives under the amendment, with the count of such entries in
  this Backlog at drafting. Whether the "built but broken" limit stands
  under the amendment, with its reason.
- B11. What the amendment says the model is authoritative for is
  exactly what the type spec lets the model carry. A term-by-term
  cross-check is recorded.
- B12. *Motivated-by* cites this repository's instance at a pinned
  commit: child A's slice and its renderings. The proposal also cites
  the methodology vocabulary entry for the planning/execution model at
  the `main` commit that holds it, and states that the entry is
  unreleased at v1.6.0.
- B13. The proposal carries a Release-register entry in node
  P1-N015's precedent shape: a title, a placeholder pull-request link
  with a fill instruction, an impact assessment against every
  Portfolio row, and an explicit migration note. It ends with an ask
  covering acceptance, amendment and rejection.
- B14. The IR is written first and kept beside the proposal. The role
  that wrote the IR renders the normative text and appends the render
  map. Stranger rounds run under the IR specification at v1.6.0 until
  a round returns readable or the count reaches the limit of ten. The
  Orchestrator dispatches each round's stranger with a fresh context.
  A review record holds each round's findings, their dispositions, the
  verdict, the prose word count and the IR claim count. At the limit,
  the text is not delivered before the owner's decision.
- B15. Until the amendment is released and pinned, nothing in this
  repository claims for the model the authority K-003 as released
  denies (I6), unless the owner takes decision 13's option (b).

**Criteria: completion.**

- B16. B's `verifying` is an owner gate on the proposal (RU-005). B
  completes at the artifact (RU-003). Nothing is carried upstream by B
  (RU-002).
- B17. `node plugin/scripts/form_check.ts` passes. The Backlog moves in
  the same commit.

### Child C: the instance, over this repository

**Outcome.** The instance populated across this project's current
parts, derived from the Plan register, the Backlog, the
specifications, the Risk register and the Ruling register, in the
notation the type spec defines.

**Criteria.**

- C1. Every node in the Plan register past `identified` has at least
  one edge, or the instance states why it has none.
- C2. Every item names the document it was derived from. A sample the
  owner picks at the gate can be traced (G1).
- C3. Every starting point in the enumerated list links the instance in
  its header, including every plan and specification document. A grep
  showing it is recorded.
- C4. The three structural conditions of the bound hold across the
  whole instance. Paths are measured for a sample chosen by a rule
  stated before measuring: every fifth entry in file order, from three
  starting points each. Every path is within the bound.
- C5. The breakdown-moment edges of this document are in the instance,
  each with its journal event. C checks them against *Edges stated at
  this breakdown*.
- C6. Every ruling a node consumed is a resource with its `uses` edges.
  C reads one blast radius off the edges for a real reversal of its
  choosing and records the hand check. The owner names a different
  subject at the gate if he wishes (G5).
- C7. I8 is applied: every closed specification's durable content is
  on the resources it specified, and every resource's `spec:` line
  links every node specification that defined it.
- C8. Both renderings are produced over the full instance and compared
  with the Backlog, with each difference classified as G6 classifies
  it.
- C9. A part that cannot yet be described becomes a Backlog item. The
  count of such parts is recorded.
- C10. The work is done from git and a text editor, with no
  orchestration service tool called.
- C11. `node plugin/scripts/form_check.ts` passes. The Backlog moves in
  the same commit.

### Child D: sibling ordering retired, and the checks that replace it

**Outcome.** The four prose statements that give sibling order a
dependency meaning are amended. `dispatch.md`'s selection rule reads
recorded edges. The form checker gains the model's rules.

**Criteria.**

- D1. Four statements are amended: `plan-register.md`'s "sibling order
  is dependency order", `plan-model.md`'s "Siblings are
  dependency-ordered", `dispatch.md`'s "entering `execute` requires
  earlier siblings `done`", and the Plan register instance's header
  line. The replacement rule: entering `execute` requires that every
  node which creates or modifies a resource this node uses is `done`.
  List position keeps its presentation meaning only.
- D2. D states the disposition of the register's "independent of
  P3-N002 (RU-018)" annotations, now that absence of an edge says the
  same thing.
- D3. D's amendment of the selection rule is the one that lands.
  Node P1-N016 rebases on it. The Backlog collision entry is closed.
- D4. The search of I2 is run and recorded, with its terms.
- D5. New form-check rules: every node ID in the instance resolves in
  the Plan register; every edge names a defined resource or an alias;
  every entry carries all five facet lines; each written state equals
  its derivation; no creating or modifying node of a `built` resource
  has an unchecked Backlog entry; and no node at `executing` or later
  uses a resource whose creating or modifying node is not `done`.
- D6. Each rule is demonstrated firing on a contradiction induced on a
  local scratch branch that is never pushed. The transcripts are
  recorded. The branch is deleted.
- D7. The new rules emit nothing on a tree that declares no instance.
  `node plugin/scripts/run_corpus.ts` reports every fixture matching
  its recorded expectations.
- D8. Every file the vendoring manifest carries is byte-identical
  across D's commits, shown by an empty `git diff` for those paths.
- D9. The new rules are tested by Vitest tests whose fixtures live
  outside `plugin/scripts/lib/corpus/`. `npm test`, `npm run typecheck`,
  `npm run typecheck:consumer` and `npm run lint` are clean. No
  pre-existing test is deleted or rewritten (W-002).
- D10. If any rule needs a corpus expectation to change, D stops and
  returns `needs-judgment` (the plan's reach trigger).
- D11. `node plugin/scripts/form_check.ts` passes on this repository
  with the instance declared. The Backlog moves in the same commit.

### The preparation-moment record of G4

The preparation-moment edge comes from the first node plan accepted
after child B is `done`. That plan states its edges in its
*Dependencies* section in the type spec's notation. The Orchestrator
transcribes them at the plan's acceptance, with a journal event. If no
plan has been accepted when the node's evidence is assembled, the
node's `verifying` waits for one. The Orchestrator may dispatch a plan
task the process already owes, such as node P1-N016's. It may not
dispatch one for the demonstration.

### Register action proposed with this specification

RU-020, the ruling that an interior node whose specification reaches
breakdown depth needs no separate `break down` task, applies. The
children above carry outcome, edges and checkable criteria.

- P3-N002 moves `planned` → `specified` → `broken-down` at this gate,
  in one act. Its line gains `· spec: specs/p3-n002-comprehension-model.md`.
- Four children are entered `identified` under P3-N002, in the order
  A, B, C, D, each marked with the sibling it depends on.
- Each child gets a Backlog entry at identification (K-003; founding
  ruling 1).

### Findings for the Orchestrator

- **The plan's Status line still reads `draft`.** The plan's K-007
  contract makes it `active` when the owner approves it at the gate.
  He did, on 2026-10-29. This is the failure the Backlog entry *The
  form checker does not check a plan or specification's Status against
  its node's stage* already records once.
- **The plan's K-003 passages contradict RU-021.** Once the plan is
  `active`, K-010's converse makes its unmarked content a claim of
  current intent. K-010 is the methodology rule that superseded
  content is never silently readable. The passages are false, not
  stale, and are fixed in place, with the gate record cited.
- **The P3-N002 Backlog entry says "No K-003 amendment".** It is
  rewritten when this node is specified.

This task may edit the plan only to add the link to this document. So
it routes these three rather than fixing them.

## Decisions for the gate

Numbering continues the plan's sequence, so one go-ahead adopts one
list. The plan carries 1 to 8, all decided on 2026-10-29: 1, 2 and 4 to
8 adopted, 3 overridden. This document carries 9 to 15. The owner's
go-ahead adopts every default not overridden by number.

**Precedents checked against the [Ruling register](../rulings.md).**
These decide silently and are not staged.

- RU-016 (repository reach) and RU-021 (the planning/execution model
  is the source of progress truth) bind this document.
- RU-020 crosses the breakdown at this gate.
- RU-005 gates child B at `verifying`.
- RU-015 (delivery form), RU-002 (the owner hand-carries upstream
  output) and RU-003 (a node completes at the artifact) govern the
  proposal's delivery.
- RU-018 (a child is not queued behind a sibling it does not depend
  on) is satisfied: the edges above derive a genuine chain.
- RU-010 governs how the work reaches `main`.

Near matches cited in rationales, not applied: RU-001 (a proposal
draft may execute before its evidencing node closes), for decision 12;
RU-019 (a measurement may be satisfied by an unfavourable result), for
G6; RU-014 (retiring a comparison keeps the surviving assertion), as
in plan decision 5.

9. **The navigation bound's exact definition.** Default: **as fixed in
   *The navigation bound*:** three steps; a step is opening a
   document, following one link, or one find for a slug; eight
   classes of starting point; an answer reached when its stating line
   is open; three structural conditions checked by inspection.
   Rationale: plan decision 6 adopted the figure and the unit; this
   states both so a verifier can apply them without judgment, before
   any child executes.
10. **The K-003 amendment's scope.** Default: **K-003 amended in place
    by one conditional clause.** Where a project's Classification
    declares a planning/execution model, that model is the referent
    for what is done and what is next, and the Backlog's
    implementation map and list of what is next are renderings of it.
    Projects that declare none are unchanged. The clause uses the
    methodology's vocabulary term. It does not touch the Workflow
    clause or the plan model's evidence component. Rationale: RU-021
    says project by project as each adopts the orchestrator, and a
    condition on a declaration is how a rule applies mechanically
    (Article 4). The alternatives are a rewrite of K-003 for every
    project, which outruns the evidence of one project, or a second
    rule beside K-003, which leaves two rules claiming one referent.
11. **The K-003 amendment's delivery.** Default: **RU-015's form, IR
    first under W-009, owner-gated at child B's `verifying`, and
    hand-carried by the owner as one proposal with no cover note.**
    The IR and the review record live beside the proposal in
    `docs/proposals/`. The stranger rounds run as in criterion B14.
    The quote is taken at v1.6.0 and checked against `main`.
    Rationale: each part is an existing ruling or the pinned rule; a
    single amendment needs no cover note, unlike P1-N015's four.
12. **When the amendment's evidence exists.** Default: **child B
    drafts on child A's slice, pinned to its commit; G6 re-runs the
    renderings over the full instance; if G6 contradicts the slice's
    evidence, child B reopens with the reason recorded.** Rationale:
    the owner directed that child B draft the amendment, and B precedes
    C; RU-001's reasoning is that the evidence exists, and A makes it
    exist. The alternative is a fifth child after D for the amendment,
    which overrides plan decision 8.
13. **`needs-judgment`: whether this repository acts on the amended
    rule before it is released.** This touches a deviation, which the
    methodology reserves to the owner. The options:
    - (a) **No deviation.** The Backlog stays the referent under K-003
      as released. The model carries the content and G6 proves the
      renderings. This repository switches its Backlog to a rendering
      when the amendment is released and pinned, as a Backlog item.
    - (b) **Deviation.** This repository switches now. A deviation from
      K-003 is recorded in the Classification's Deviation register,
      with its rationale and its end at the release. Child C or a new
      child makes the switch.
    - (c) **Switch now with no deviation.** Not available: K-003 is a
      MUST at C1, and the Classification would then misdeclare
      (Article 4).
    Recommendation: **(a).** The vision says the owner and the
    reasoning role construct nothing ahead of need, and that the owner
    amends a rule where a project needs the change. Evidence is what
    this node owes. A switch is the adoption that follows.
14. **Child B's executing tier.** Default: **advanced tier for child
    B; standard tier for A, C and D.** Rationale: W-009 makes the role
    that writes the IR of normative text render it, and the amendment
    is the one deliverable here that represents the project upstream.
    A tier raise needs no deviation ([roles](../process/roles.md)).
15. **Who verifies this node.** Default: **attended.** The owner
    performs G2, G3 and G5 and reads G6; the Orchestrator assembles the
    evidence; no dispatched Reviewer. Rationale: the C1 profile, G2 and
    G3 rest on the owner's own finding, and P3-N001 decision 7 took the
    same shape.

## References

- [p3-n002-comprehension-model](../plans/p3-n002-comprehension-model.md):
  this node's plan, decisions 1 to 8, and its gate record of 2026-10-29
- [p3-n001-comprehension-and-continuous-implementation](p3-n001-comprehension-and-continuous-implementation.md):
  the parent specification, its criteria, its *Chunk 1* additions, and
  its decisions 4 and 5
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md): the
  interior-node specification shape this document follows, with the
  parent
- [plan-model](../process/plan-model.md): the node lifecycle, the
  interior-node verification rule, and monotonicity
- [profiles](../process/profiles.md): the C1 depth
- [plan-register](../process/plan-register.md),
  [rulings](../process/rulings.md),
  [observability](../process/observability.md),
  [dispatch](../process/dispatch.md): the type specs and process
  documents the children amend
- [Classification](../classification.md): the pin, v1.6.0, and where
  the fifth custom definition lands
- [Ruling register](../rulings.md): RU-001, RU-002, RU-003, RU-005,
  RU-010, RU-014, RU-015, RU-016, RU-017, RU-018, RU-019, RU-020,
  RU-021
- [Risk register](../open-risks.md): R10 (P5)
- [Backlog](../backlog.md): the entries P2 names
- Methodology at v1.6.0 (tag commit `3e34829`, 2026-10-28):
  [K-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
  (the Backlog is the single source of progress truth),
  [K-007](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-007--plans-are-outcome-named-statused-and-ruthlessly-current)
  (plans are outcome-named, statused, and ruthlessly current),
  [K-010](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable)
  (superseded content is never silently readable),
  [W-002](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-002--existing-tests-are-signals-not-obstacles)
  (existing tests are signals, not obstacles),
  [W-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)
  (documentation moves in the same commit as the work),
  [W-009](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-009--the-methodology-corpus-writes-its-deliverables-ir-first)
  (the methodology corpus writes its deliverables IR first),
  [the IR specification](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md),
  Article 4 (applicability, then precedence) and Article 8
  (amendments, versions, and migration)
- Methodology `main` at commit `350f75f` (2026-10-29), unreleased:
  [vision](https://github.com/majodali/methodology/blob/main/docs/vision.md)
  (decisions of 2026-10-28 and 2026-10-29) and the
  [vocabulary entries](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-planning-execution-model)
  for the planning/execution model and the web view
