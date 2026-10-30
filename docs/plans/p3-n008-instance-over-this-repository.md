# The instance, over this repository

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N008; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Project model: [project-model.md](../project-model.md).

Reader: RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's plan gate. It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), the [type
specification](../process/project-model.md) of the Project model, and
the section *Child C: the instance, over this repository* of the
[specification of the comprehension
model](../specs/p3-n002-comprehension-model.md).

[Node](../process/README.md#def-node) P3-N008 is child C of P3-N002
(the comprehension model): [plan](p3-n002-comprehension-model.md),
[specification](../specs/p3-n002-comprehension-model.md). It is third
in the chain P3-N006 to P3-N009. It builds on P3-N006 (the thin
end-to-end slice), which wrote five entries, and on P3-N007 (the type
declared, the arguments written, the K-003 amendment drafted), whose
first execute task landed the type specification. K-003 is the
methodology rule that the Backlog is the single source of progress
truth.

The parent specification fixes this node's outcome and its criteria C1
to C11. This plan does not restate them. It records what that section
leaves open: how the parts are enumerated, how entries are written at
scale under the writer rule, how the measurement and the renderings
extend from the slice, what counts as a failure in the comparison, what
`docs/plan.md` becomes, this node's edges and reach, and six decisions
for the gate.

## Outcome

The instance describes every current part of the project. Both
renderings come from the model alone. Each matches its list in the
Backlog, or explains each difference.

Concretely, at `done`:

- `docs/project-model.md` holds one entry per part, in the type's
  grammar. The five slice entries are conformed to it. Every item names
  its source.
- Every node of the [Plan register](../plan-register.md) past
  `identified` has an edge, or the instance's preamble says why not.
- Every starting point links the instance in its header.
- A population record, `docs/project-model-population-record.md`,
  holds the enumeration, the edge list, the measured paths, both
  renderings and their comparison with the Backlog.
- The Backlog stays the referent for what is done and what is next.
  This is option (a) of decision 13 of the parent specification.

## Approach

### Three execute tasks in a fixed order

The node is a leaf run as three tasks (decision 2). Each is one
Implementer session at the standard tier (P3-N002 decision 14), lands
one commit, and moves the Backlog in that commit.

1. **E1, the parts and their entries.** E1 writes the enumeration. It
   opens one entry per part and fills `is:`, `state:`, `spec:` and
   `risks:` from records. It writes the
   [edges](../process/project-model.md#def-edge) that records of
   `done` nodes and the Ruling register state. It conforms the five
   slice entries, adds [date
   notes](../process/project-model.md#def-date-note), and rewrites the
   instance's title and preamble, which still describe the slice.
   Criteria: C2, C9's count so far, C10, C11.
2. **E2, the edges of open nodes and the carried specifications.** E2
   writes the edges that accepted plans and breakdowns state for nodes
   not yet `done`. It carries the durable content of every closed
   specification onto the resources it specified. It completes C1,
   checks C5, and reads C6's blast radius. Criteria: C1, C5, C6, C7,
   C10, C11.
3. **E3, the headers, the measurement and the renderings.** E3 adds
   the instance link to every starting point it may write. It measures
   the sample of C4, produces both renderings over the full instance,
   and compares them with the Backlog. Criteria: C3, C4, C8, C9, C10,
   C11.

The order is fixed by what each task reads. E2's edges need E1's
entries. The renderings need every edge. The measurement needs every
header and every entry.

### How the parts are enumerated

E1 builds the list of [resources](../process/project-model.md#def-resource)
from five sources. Each closes a gap the others leave.

1. **Slugs.** Every [slug](../process/project-model.md#def-slug)
   already in the instance or in a transcribed record. This covers the
   five slice entries and the [held
   edges](../process/project-model.md#def-held-edge) the Orchestrator
   transcribes at the acceptance of P3-N007's first execute task
   (P3-N007 decision 8).
2. **Parts.** The 30 parts of the parts enumeration of P3-N010 (one
   class, carried end to end), in the [check
   document](../common-risk-catalogue-check.md#parts-enumeration).
   Each part maps to one or more entries, or the record says why it
   maps to none. The enumeration is risk-shaped and coarse, so a part
   such as PT-02 (the process specification) maps to one entry per
   process document.
3. **Paths.** Every tracked path of this repository, listed by
   `git ls-files` at E1's base commit. Each path is named in some
   entry's `is:` line, or listed in the record with the reason it is
   no part, such as `package-lock.json` inside the Node toolchain.
4. **Rulings.** Every ruling in the [Ruling register](../rulings.md),
   RU-001 to RU-022 at planning. A ruling is a resource under the type
   specification, and C6 needs every consumed ruling.
5. **Nodes.** Every node past `identified` in the Plan register, 38
   of 48 at planning. A node whose records name no part is listed for
   C1.

Granularity follows the records. One resource is one thing a record
says a node created, modified or used. Existing slugs keep their
grain: `dispatch-rules` is one document, `form-checker` is two files.
Proposals are one resource each, because each is an upstream-bound
output. The plan and specification documents are two resources, one
for each folder (decision 4).

The service repository's parts are in scope (decision 3). E1
describes them from this repository's records only, as P3-N006 did for
`plan-register-grammar`. A fact only the service repository can state
is recorded as the model lacking a claim, as the slice's ML6 is.

A part E1 cannot describe from records becomes a Backlog item. C9's
count is the number of such parts.

### Entries at scale, under the writer rule

The [writer rule](../process/project-model.md#the-writer-rule) names
this node's case. The brief of each execute task names
`docs/project-model.md` among its writes, so the task writes entries
and edges as its dispatched work. No task writes a Plan register
field.

- **Order.** New entries go at the end of the file, in enumeration
  order. File order is what C4's sample reads, so no task reorders
  entries.
- **Headings.** Every heading carries a name (decision 6). The slice
  found each entry by a find for `## ` and the slug. That find is
  ambiguous once `plan-register`, `plan-register-type` and
  `plan-register-grammar` all exist.
- **Edge list.** Each task lists the edges it wrote, one line per edge
  in the note format of the `edge-recorded` event
  ([observability](../process/observability.md)). The Orchestrator
  writes one event per line at acceptance. An edge the instance
  already holds gains a source from a second record and no event, as
  *Recording an edge* in the type specification says.
- **Records.** Edges come from accepted records only. E2 reads the
  *Dependencies* sections of plans whose Status is `active` or closed,
  and the breakdowns in active specifications. Most were written before
  the type existed, and state their edges in prose. E2 writes an edge
  only where the prose names the part. A plan still `draft` at E2 is
  left to the Orchestrator, who transcribes it when the plan is
  accepted.
- **State.** Each task derives state last, by the table in the type
  specification, so every `state:` line matches the stages at the
  task's commit.

Three registers have the Orchestrator as single writer: the Plan
register, the Ruling register and the Cost log. E3 proposes their
header lines in its result, and the Orchestrator writes them at
acceptance.

While a task runs, the Orchestrator may transcribe a newly accepted
plan into the instance on `main`. The task starts from `main` after
the last transcription. A conflict at merge is resolved by keeping both
items, because edge items only add, and by deriving state again.

### The navigation measure, extended from fifty paths to the instance

The slice measured fifty paths: five entries, five answers, two
starting points ([slice record](../project-model-slice-record.md),
section 4). Those paths stand as the slice's record and are not
measured again.

C4 fixes the sample: every fifth entry in file order. This plan fixes
the three starting points for each sampled entry, before any
measurement.

1. The Backlog, the start the slice used, so the two records compare.
2. The plan document of the entry's first creating node. Where the
   entry has none, the specification of P3-N002.
3. One of the six remaining classes, in turn by sample position:
   `README.md`, the Classification, the Plan register, the Risk
   register, the Ruling register, the Cost log.

So every class of [starting
point](../process/project-model.md#the-navigation-bound) is measured.
With about 120 entries, the sample is about 24 entries and 360 paths.

Each path is recorded from step zero, as the slice did. Rows come from
one template per answer. A script opens each start, confirms the
header link and confirms the heading's find matches once. It then
confirms the facet line and resolves each link. The script is not
committed. The record states whether three steps held for every path.
A path over three is a measurement, not a fault to repair (RU-019, a measurement
may be satisfied by an unfavourable result). The task returns
`needs-judgment` and does not change the bound (P3-N002 decision 9).

The three structural conditions are checked across the whole instance,
not the sample: (i) by C3's grep, (ii) by counting the matches of each
heading's find, and (iii) by checking every entry's facet lines.

### The renderings, and how the comparison is recorded

E3 produces both renderings by the procedures in the type
specification: [the implementation
map](../process/project-model.md#the-implementation-map) over every
entry, and [the list of what is
next](../process/project-model.md#the-list-of-what-is-next) over every
node not `done`. Each reads the instance and the Plan register, and
nothing else. The record states that neither rendering is the
referent.

E3 then compares each rendering with the Backlog at a pinned commit,
in both directions.

- **From the rendering.** Each claim in each row is searched for in the
  Backlog. A claim the Backlog states is an agreement.
- **From the Backlog.** Each checked entry, and each open entry that a
  node holds, is checked against the renderings. A node holds an entry
  under the counting rule the K-003 proposal states for criterion B10,
  so the two counts agree. An open entry no node holds is the Backlog's
  own content, not a difference (P3-N007 decision 4). E3 records their
  count and their lines.

Each difference is classified as G6 classifies it: the model lacks a
claim, the Backlog lacks a claim, or the two disagree. One row of the
difference table may cover one cause across many parts, if it names
every part and every Backlog line it covers. Each row says whether the
difference was fixed in E3's commit or carried to a Backlog entry,
existing or proposed.

The slice's eleven differences are checked again, each marked
resolved, persisting or changed. Three are expected to resolve. ML1
(no dates) resolves by date notes. ML4 (held edges) resolves by the
transcription. ML5 (missing entries) resolves by E1. The rest keep
their dispositions unless E3 finds otherwise.

Four results fail C8. Any other difference, listed with its
disposition, does not.

- A difference with no stated cause.
- A difference neither fixed nor carried.
- A rendered row that adds a claim its source lacks, or drops a claim
  of a [facet](../process/project-model.md#def-facet) its procedure
  carries.
- A `state:` line that disagrees with the stages at step 6 of the
  implementation map's procedure, and is left in the instance.

E3 also compares the list of what is next with the *What is next*
section of [docs/plan.md](../plan.md). That comparison is not G6. Its
differences go to the Orchestrator as proposed corrections, because
`docs/plan.md` is the Orchestrator's to maintain.

### What `docs/plan.md` becomes

`docs/plan.md` stays the hand rendering the owner reads, until the
Backlog switches to a rendering of the planning/execution model
(decision 5).

The renderings cannot replace it now, for three reasons. The list of
what is next omits outcomes, which are most of `docs/plan.md`. A
rendering made once by hand is not kept current, and no rendering tool
exists before the switch. The dependency text of `docs/plan.md` follows
the selection rule in [dispatch](../process/dispatch.md), which P3-N009
(sibling ordering retired, and the checks that replace it) changes, not
this node.

## What this node does not cover

- **Form-check rules for the model, and the selection rule.**
  P3-N009's.
- **The Backlog switched to a rendering, and a rendering tool.** The
  existing Backlog entry, after the K-003 amendment is released and
  pinned.
- **The preparation-moment record of G4.** The parent assigns it to
  the first plan accepted after P3-N007 is `done`. This plan is
  accepted before then, under P3-N007 decision 9.
- **Reading the service repository.** Outside this node's reach.
- **Hierarchical resources and containment.** The Backlog entry
  *Hierarchical resources, for complex resource validations*.
- **The `risks:` relation.** The slice's rule stands until the Backlog
  entry on P3-N003's reaches line is acted on.

## Leaf or interior

Leaf, run as three tasks in a fixed order (decision 2).

The node has one outcome, and its parts validate only together. The
renderings test the edges only when every edge is written. The
measurement tests the entries only when every header links the
instance. Child nodes would add plans and gates for parts that do not
validate alone. The tasks exist because about 120 entries, several
hundred edges, 360 paths and two full renderings do not fit one
session.

## Dependencies

Edges are in the type's
[notation](../process/project-model.md#how-a-plan-writes-an-edge).
They extend the parent's *Edges stated at this breakdown* and name the
parent's "header of every starting point" with slugs.

- **Repository reach.** This repository only, write, under RU-016
  (the Planner declares the repository access a node needs). No other
  repository is read. The service repository's parts are described
  from this repository's records (decision 3). Nothing goes upstream.
- **P3-N008 creates** `project-model-population-record` (the population
  record, `docs/project-model-population-record.md`).
- **P3-N008 modifies** `project-model`, which it populates; `backlog`,
  for its own row and the header line that names the slice;
  `project-orchestrator-repo`, as its reach.
- **P3-N008 modifies** the header of every starting point: `readme`
  (`README.md`), `classification`, `plan-register`, `risk-register`,
  `ruling-register`, `cost-log` (`docs/cost-log.md`, the Cost log),
  `plan-documents` (every plan document under `docs/plans/`, as one
  resource), `specification-documents` (every specification document
  under `docs/specs/`, as one resource) and `p1-n009-specification`,
  whose header names the slice.
- **P3-N008 uses** `project-model-type`, for the notation, the
  derivations and the rendering procedures; `k-003-amendment`, for its
  counting rule; `project-model-slice-record`, for the eleven
  differences and the fifty paths.
- **P3-N008 uses** the records it derives from: `plan-register`,
  `backlog`, `risk-register`, `ruling-register`, `cost-log`,
  `classification` and `common-risk-catalogue-check`
  (`docs/common-risk-catalogue-check.md`, P3-N010's check document with
  the parts enumeration).
- **P3-N008 uses** `plan-model-spec`, for the next stage the list of
  what is next names; `observability-vocabulary`, for the note format
  of its edge list; `form-checker`, which C11 runs; `RU-016`, `RU-017`,
  `RU-018` and `RU-021`.
- **No after qualifier.** No edge here carries an [after
  qualifier](../process/project-model.md#def-after-qualifier). P3-N011
  (the sweep, the rest of the catalogue, and the omission list)
  modifies `risk-register` and `common-risk-catalogue-check`. P3-N008
  reads both as they stand. Waiting on P3-N011 would queue this node
  behind P3-N003 (the common risk catalogue). RU-018 (a child is not
  queued behind a sibling it does not depend on) records P3-N003 as
  independent of P3-N002. P3-N009 later modifies `plan-register` and
  `form-checker`, and follows in the chain.
- **Nodes.** Derived by the type's rule, P3-N008 depends on P3-N007,
  creator of `project-model-type` and `k-003-amendment`. Every other
  creating node of what it uses is `done`, including P3-N006 and
  P3-N010. E1 is dispatched once P3-N007 is `done`, which includes its
  owner gate (P3-N007 decision 9).
- **The held edges are transcribed first.** E1 starts after the
  Orchestrator has transcribed the parent's breakdown edges and the
  plans of P3-N006 and P3-N007 (P3-N007 decision 8). C5 checks that
  transcription and does not redo it.
- **A type change returns this plan.** If P3-N007's stranger rounds
  force a change to the type (criterion B11), this plan returns for
  revision before E1 (P3-N007 decision 9).
- **Overlap, not dependency.** P3-N011 writes `docs/open-risks.md` and
  the Backlog while it executes. E3 adds one header line to the first.
  P1-N016 (process spec maintenance) edits process documents that are
  entries here. Their `is:` lines are read at E1 and need no change
  for an editorial edit.
- **No owner action** beyond this gate.

## Verification

C1 profile ([profiles](../process/profiles.md)). Each task's
Implementer self-verifies its criteria against the parent
specification's *Child C* section, and E3 confirms C1 to C11 for the
whole node. The adopted decisions of this plan bind the Implementer
beside it. There is no owner gate at this node's `verifying`. The
owner sees the work at P3-N002's attended verification (P3-N002
decision 15).

## Monotonicity

No planned non-monotonicity is proposed. P3-N008 writes documents
only. No test, no code and no file under `plugin/` changes, so the
vendored files stay byte-identical.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics. This document opens its own sequence at 1. The owner's
go-ahead adopts every default not overridden by number.

Precedents checked against the [Ruling register](../rulings.md). These
decide silently and are not staged.

- RU-016: this plan's *Dependencies* is the repository-reach
  declaration.
- RU-021 (the planning/execution model is the source of progress
  truth), with P3-N002 decision 13, option (a): nothing here claims
  progress authority before the amendment is released.
- RU-018: no edge of this node waits on P3-N003 or on P3-N005
  (sequence mode).
- RU-010 (how work reaches `main` in this repository) governs the
  merges.
- RU-005 (proposal-class nodes are owner-gated at `verifying`) does
  not apply: P3-N008 produces nothing upstream-bound.
- RU-020 (an interior node whose specification reaches breakdown depth
  needs no break-down task) does not apply: this node is a leaf.

Near matches cited in rationales, not applied: decision 1 of the
plans of P3-N006 and P3-N007, and decision 1 of the plans of P3-N011
and P3-N013 (the four stop conditions, decidable), none captured as a
ruling; RU-017 (a sibling project's adoption is a separate node), for
decision 3; RU-019, for what fails C8.

1. **P3-N008's specification.**
   **Default**: the parent specification's *Child C* section, with no
   `specify` task. The node moves `planned` → `specified` at this gate.
   Its register line gains
   `plan: plans/p3-n008-instance-over-this-repository.md · spec: specs/p3-n002-comprehension-model.md`.
   **Rationale**: the section carries outcome, edges and checkable
   criteria at C1 depth, as for P3-N006 and P3-N007 under their
   decision 1.
   **Affected locations**: none.
2. **Leaf, run as three execute tasks in a fixed order.**
   **Default**: E1, E2 and E3 as in *Three execute tasks in a fixed
   order*, each at the standard tier, each one commit.
   **Rationale**: the parts validate only together, and the work does
   not fit one session; P3-N007, P3-N011 and P3-N013 run the same
   shape under their decisions 2, 1 and 1.
   **Affected locations**: none.
3. **The service repository's parts are in the instance.**
   **Default**: the instance holds the parts the P2 line's nodes placed
   in majodali/project-orchestrator-service. Each is described from
   this repository's records only. A fact only that repository states
   is recorded as the model lacking a claim.
   **Rationale**: those parts are this project's work, so RU-017 does
   not exclude them; without them eight `done` nodes would have no part
   they created; and P3-N010's enumeration already lists them on the
   same basis.
   **Affected locations**:
   - [docs/plan.md](../plan.md), P3-N008's Outcome line (active),
     correction of its first sentence: "The instance covers every
     current part of the project, including the parts that the P2
     line's nodes placed in majodali/project-orchestrator-service,
     each described from this repository's records (P3-N008 decision
     3)."
4. **Plan and specification documents enter the model as two
   resources.**
   **Default**: `plan-documents` covers every document under
   `docs/plans/`, and `specification-documents` every document under
   `docs/specs/`. With `readme`, `classification`, `plan-register`,
   `backlog`, `risk-register`, `ruling-register` and `cost-log`, they
   name the parent's edge "the header of every starting point". The
   existing `p1-n009-specification` stays its own entry.
   **Rationale**: a node's plan and specification are records about
   the node, which `spec:` lines already link; one entry per document
   would add about 30 entries whose only edges are their author and
   one header line; P3-N010's standing artifact class SA-2 also treats
   them as one class.
   **Affected locations**:
   - [Specification of P3-N002](../specs/p3-n002-comprehension-model.md),
     *Edges stated at this breakdown* (active), the Child C bullet,
     correction: after "and the header of every starting point" add
     " (the slugs are named in the plan of P3-N008, *Dependencies*,
     decision 4)".
5. **`docs/plan.md` stays the hand rendering until the switch.**
   **Default**: `docs/plan.md` stays `active` and maintained by the
   Orchestrator. It is superseded when the Backlog switches to a
   rendering of the planning/execution model. E3's comparison of the
   list of what is next with its *What is next* section goes to the
   Orchestrator as proposed corrections.
   **Rationale**: the renderings omit outcomes, which are most of the
   document; a hand rendering made once would go stale with no tool to
   redo it; and the owner reads this document because the plans are
   hard to follow.
   **Affected locations**:
   - [docs/plan.md](../plan.md), the K-007 contract comment (active),
     correction of its last sentence: "It goes `superseded` when the
     Backlog switches to a rendering of the planning/execution model
     (plan of P3-N008, decision 5)."
   - The same document, the paragraph on the Orchestrator's duty,
     correction: "The duty ends when this repository's Backlog switches
     to a rendering of the planning/execution model, after the K-003
     amendment is released and pinned (P3-N008 decision 5)."
   - The same document, P3-N008's Outcome line, correction of its last
     sentence: "This document stays the hand rendering until the
     Backlog switches to a rendering of the planning/execution model
     (P3-N008 decision 5)."
6. **Every entry heading carries a name.**
   **Default**: the type's grammar makes a heading's name required. The
   find in the navigation bound is for `## `, the slug and ` (`, which
   then occurs once.
   **Rationale**: one slug can begin another, such as `plan-register`
   and `plan-register-grammar`, so a find for `## ` and the slug can
   land on the wrong entry; this keeps P3-N002 decision 9's one find
   and changes no definition of the bound.
   **Affected locations**:
   - [Type specification](../process/project-model.md), *The entry
     grammar* (active), correction of the heading rule:
     `heading       = "## " , slug , " (" , name , ")" , newline ;`
   - The same section, correction of the paragraph after the grammar:
     "A heading's `name` is the [resource's](#def-resource) name in
     words. Every heading carries one. A ruling needs it under P-004
     (citations carry names). A word slug needs it because one slug can
     begin another, such as `plan-register` and
     `plan-register-grammar`. The find for `## `, the slug and ` (`
     then occurs once (plan of P3-N008, decision 6)."
   - The same document, *The navigation bound*, condition (ii),
     correction: "(ii) Every entry has an anchor, or a slug findable in
     one find. The find is for `## `, the slug and ` (`, which occurs
     once because every heading carries a name (plan of P3-N008,
     decision 6)."

## Backlog additions

Rows in the Backlog's declared shape. Each pointer is to this plan.

- **P3-N009's rules check that no heading's find matches two
  entries** — When: 2026-10-30, planning P3-N008 (T079). Status: open,
  for P3-N009; decision 6 makes a heading's name required, and a
  checker rule keeps condition (ii) true. Pointer: this plan,
  decision 6.
- **A new plan or specification links the instance in its header** —
  When: 2026-10-30, planning P3-N008 (T079). Status: open, for P3-N009
  (a checker rule) or P1-N016 (the Planner contract); condition (i)
  holds after E3 only while every new starting point carries the line.
  Pointer: this plan, *The navigation measure, extended from fifty
  paths to the instance*.
- **No trigger keeps an entry's `is:`, `spec:` and `risks:` lines
  current** — When: 2026-10-30, planning P3-N008 (T079). Status: open,
  for P1-N016; edges reach the instance at plan acceptance, but a new
  Risk register entry or a changed process document reaches no entry
  unless a task result proposes it. Pointer: this plan, *Entries at
  scale, under the writer rule*.
- **`docs/plan.md`'s dependency fields follow P3-N009's rule** — When:
  2026-10-30, planning P3-N008 (T079). Status: open, for the
  Orchestrator at P3-N009's acceptance; the *Depends on* fields and the
  *What is next* section read register notes and sibling order today.
  Pointer: this plan, *What `docs/plan.md` becomes*.

Two existing rows are rewritten, for the Orchestrator at this gate.

- *A leaf may need several execute tasks, and plan-model.md says one
  session*: its Status counts five leaves run as fixed task sequences:
  P2-N016 (deploy, smoke and promote on merge to main), P3-N013,
  P3-N011, P3-N007 and P3-N008.
- *Switch this repository's Backlog to a rendering of the
  planning/execution model*: it adds that `docs/plan.md` is superseded
  at the switch (decision 5).

## References

- [Specification of P3-N002](../specs/p3-n002-comprehension-model.md):
  *Child C*, *The navigation bound*, G1 to G6, I1 to I10, P1 to P6,
  *Edges stated at this breakdown*, decision 13 and the gate records
- [Plan of P3-N002](p3-n002-comprehension-model.md): decisions 1 to 8
- [Plan of P3-N007](p3-n007-type-declared-amendment-drafted.md):
  decisions 4, 8 and 9
- [Plan of P3-N006](p3-n006-thin-end-to-end-slice.md): the shape this
  plan follows
- [Type specification](../process/project-model.md): the grammar, the
  derivations, the writer rule, *Recording an edge*, the renderings,
  the navigation bound and the checker rules
- [Instance](../project-model.md) and [slice
  record](../project-model-slice-record.md): the five entries, the
  differences ML1 to ML7, BL1, BL2, DG1 and DG2, and the fifty paths
- [Check document](../common-risk-catalogue-check.md): the parts
  enumeration of P3-N010
- [Plan register](../plan-register.md), [Backlog](../backlog.md),
  [plan.md](../plan.md), [Ruling register](../rulings.md)
- [plan-model](../process/plan-model.md),
  [dispatch](../process/dispatch.md),
  [observability](../process/observability.md),
  [profiles](../process/profiles.md)
- Methodology at v1.6.0:
  [K-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
  (the Backlog is the single source of progress truth),
  [K-007](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-007--plans-are-outcome-named-statused-and-ruthlessly-current)
  (plans are outcome-named, statused, and ruthlessly current),
  [W-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)
  (documentation moves in the same commit as the work), and the [prose
  rules](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md)
