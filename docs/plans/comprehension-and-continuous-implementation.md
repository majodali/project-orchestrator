# Project comprehension and continuous implementation

Status: active

<!-- K-007 contract: Status transitions active → (superseded by X,
     because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. Went `active` 2026-09-17 at the
     owner's go-ahead, when P3-N001 was entered in the Plan register.
     The one remaining open question is chunk 1's first design
     decision, not a plan-level blocker. -->

The plan for **P3-N001**, the third top-level node, alongside
[Orchestrator v1](orchestrator-v1.md) (P1-N001) and the
[Orchestration service](orchestration-service.md) (P2-N001). The node
stands at `broken-down` since the specification gate of 2026-09-17,
where the four chunks this document proposes were entered as its
children. Its specification is
[p3-n001-comprehension-and-continuous-implementation](../specs/p3-n001-comprehension-and-continuous-implementation.md).

## Why now, and what is driving it

The portfolio's projects enable each other, and the strongest case is
the two-way relationship between this project and **Allegro**. This
project will eventually be re-implemented in Allegro, to use its
formally typed domain-specific modelling. Before that, Allegro's
development benefits from this project's breakdown and orchestration.

**Direction, settled by the owner 2026-09-16:** this project helps
Allegro first. Allegro's typed modelling is not ready for use by other
projects, so the eventual re-implementation cannot be shaped by it yet.
Some rewrite is expected and accepted — learnings will force it,
whatever their source.

**Neither capability is blocking Allegro.** What is slow is
single-threaded, one-chunk-at-a-time work. Allegro is roughly a third
implemented by effort, its roadmap reasonably well planned, its
planning done ad hoc. It has already run a parallel-development and
larger-chunk experiment with encouraging results, and wants the
systematic version. That is the brief: **make an existing practice
repeatable, not invent a new one.**

## What Allegro already does — read 2026-09-16

This section exists because the first draft of this plan was written
without reading the repository, and reading it changed the plan. What
follows is observation, not proposal.

**Allegro already runs both capabilities, informally.**

*Parallel lanes.* `docs/backlog.md` declares four lanes that run in
separate sessions concurrently. The decisive detail: **lane membership
is decided by the files an item edits, from co-change measurement over
the last 40 source commits — not by the architectural layer tag.** Lane
D is marked "internally serial, permanently" because its items converge
on the same three files, and the document says plainly that no tooling
change removes that coupling. So Allegro's working dependency model is
*observed*, and its declared architecture (the L0–L3 layer spine with
strict one-way dependencies) is a different thing that does not predict
it.

**Lanes are not a target.** Owner, 2026-09-17: a lane is neither a
capability nor an outcome — it may *emerge* from patterns in the
recorded dependencies. So nothing in this plan builds lanes, models
lanes, or treats "Allegro runs four lanes" as a requirement. Lane D is
evidence of a dependency cluster, not a structure to reproduce. What
the model owes Allegro is the recorded dependencies; how many parallel
workstreams fall out of them is a consequence a maintainer reads off,
and may change every time the dependencies do.

*Continuous implementation.* Lanes A, B and C run **pre-ratified chunk
sequences**: the maintainer approves the chunk list once at the start of
an arc and the lane lands them in order without stopping between each.
Lane D keeps the per-chunk gate. And this is not a local invention —
it is **methodology v1.5.0's W-001, two delivery modes, human-gated,
with Allegro as the amendment's evidencing instance.** It ran as
deviation D-1 from 2026-09-01 until the released rule absorbed it on
2026-09-05.

W-001 names **four stop conditions**, and a sequence stops on all four:
a failed check, a scope change, a chunk needing a maintainer decision,
and a chunk whose landing summary carries **asks**. Asks are never
rolled up across chunks. Only the maintainer pre-ratifies; an agent
never does.

**This reframes chunk 2 entirely.** Continuous implementation is not
this project's to design. It is a ratified rule with a working
instance, and **this project does not implement it at all** — the
dispatch loop knows only the per-chunk gate, which is W-001's other
mode. The work is to make the orchestrator able to run the mode the
methodology already permits and Allegro already uses.

**Allegro also already has most of a comprehension model — scattered.**
Five documents each hold part of it, in different vocabularies, with no
cross-linking anything can compute over:

| Document | What it holds |
|---|---|
| `docs/design/layers.md` | The architectural spine: four layers with one-way dependencies, capability tracks, the milestone register |
| `docs/design/implementation-map.md` | One row per source file — path, layer/track tag, role. "Missing here = missing from review" |
| `V1-INVENTORY.md` | Feature inventory with migration verdicts: keep, revalidate, rework, drop, TBD |
| `docs/backlog.md` | 2,564 lines; items tagged by layer/track, banded into milestones M1–M10, with a sequenced head and a banded tail |
| `docs/decisions.md`, `docs/plans/*` | Ratified rulings, and per-arc plans carrying chunk sequences |

Components exist. Features exist. Status exists. Dependencies exist
too — both declared, in the layer spine, and worked out by measurement
for the lanes. Nothing joins any of it. That is the gap, and it is a
better starting point than a blank page: **the model's job is to give
one standard shape to information five working documents already
hold.** Allegro is not unusual in having it, only in having written it
down well.

## What this project already has, and what it does not

It has a **work** hierarchy — the Plan register's nodes and their
lifecycle stages — plus a Backlog (progress truth, K-003), a Risk
register, a Ruling register, a Cost log and a run journal, a service
that reads and writes the register with git authoritative, and a form
checker that enforces the grammar.

It does **not** have a **product** model. The register describes work,
not the features and components the work produces. A specification
lives in a per-node document that closes when the node closes, so the
system's description disappears into completed work. Allegro solved
that by keeping design documents separate from plans; this project
has not.

Three tracked gaps become load-bearing rather than nice-to-have:
dependency edges between nodes, risks attached to what they threaten,
and verification criteria a loop can evaluate without a person.

## What the model is, and what it deliberately is not

Settled by the owner, 2026-09-16. Both halves matter, and the second
corrects an error in this plan's previous draft.

**An abstract model, defined here, instantiated there.** This project
defines one comprehension model that applies to *any* managed project,
as an **extension of the planning and execution model it already has**
— not a parallel structure beside it. Each project's instance lives in
that project, populated from what it already documents. Allegro is not
special in having the content; every well-documented project has it, in
one form or another. What is missing everywhere is a standard shape, so
that dependencies, implementation order and implementation state can be
tracked, and shown in a way a person can navigate quickly.

**Dependencies are recorded, never inferred.** A dependency names an
**abstract resource** that one node creates or modifies and another
uses. Nothing beyond that. The model does **not** detect dependencies,
does **not** police them, and does **not** decide resource
granularity. It provides a mechanism to record what planning or
execution already identified.

They are identified at two moments, and the model must accept both:

- **During breakdown** — planning several nodes and the relationships
  between them.
- **During preparation for a single node** — the same moment a plan
  already declares which repositories it needs, which is where
  [RU-016](../rulings.md) came from. Which artifacts a node will read
  or modify is the same kind of declaration.

*Correction to this plan's previous draft.* It argued that the model
should carry both declared and observed dependencies, treating
Allegro's co-change measurement as a second kind the model must hold.
That was wrong. Co-change measurement is a **practice that produces a
declaration** — a maintainer measured, then wrote lanes down. The model
records the declaration. Building detection into it would make it an
inference engine with opinions about granularity, which is exactly
what the owner ruled out.

## How the model meets the registers that already exist

Owner-directed 2026-09-17: review all potential relationships with all
existing registers, because the model extends what is there rather
than sitting beside it. This section is that review. It is analysis
for chunk 1 to decide from, not decisions already taken.

The finding that runs through it: **this project already records
dependencies in four places, each by hand, each in a different
notation, none of them queryable.** The model is not new machinery.
It is one notation for something already being written down badly.

### Plan register — the thing being extended

Sibling order in the [Plan register](../plan-register.md) *is* dependency order. That is an
existing dependency mechanism: implicit, scoped to one parent, able to
express only a total order and never an edge to a node elsewhere in
the tree. The model generalises it to named edges.

That creates the first real design decision, and it is a conflict, not
a gap. Once edges are explicit, sibling order is either redundant or
contradictory — two encodings of the same fact, one of which can be
edited without the other. **The owner settled it at the gate: sibling
order as a dependency signal is retired, not reconciled** — see
directly below.

The register's single-writer constraint (the Orchestrator) carries to
anything living in it. If dependencies are recorded during a node's
own preparation, a role that is not the Orchestrator has identified
something only the Orchestrator may write. Either the record goes
through the Orchestrator, or the writer rule is narrowed to the
register's existing fields.

**Settled by the owner at the P3-N001 gate, 2026-09-17.** Two parts,
and they pull in opposite directions on purpose.

*Sibling order as dependency goes away.* It was a temporary stand-in
for dependency information the register could not hold, never a
design. Once edges are recorded, it is not reconciled with them, not
checked against them — it is retired. That closes the first half of
what this section called a conflict: chunk 1 does not choose between
replace, constrain and check-against. It replaces.

*Parent-child relationships stay explicit, and may stay forever.*
They are formally dependency relationships too, and the hierarchy can
be viewed or analysed as a flat graph where that is useful. But the
explicit parent-child structure, and everything it implies, is kept —
because it is **far easier to comprehend**, which is this model's
whole point. So the model is not a flat graph that renders a tree for
display. It is a hierarchy that can be read as a graph for analysis,
and the hierarchy is the primary form.

The general shape: a relationship whose meaning a person can see at a
glance is worth keeping even when a more uniform representation could
subsume it.

### Backlog — the amendment this most likely forces

[Backlog](../backlog.md). Owner, 2026-09-17: **the project model and the Backlog are two views
of the same information**, the model adding hierarchical relationships
and explicit dependencies.

K-003 makes the Backlog the single source of progress truth. This
project already tolerates a partial overlap — the register carries
lifecycle stages, the Backlog carries progress — because stages
describe a node's position in a workflow and not whether the product
works. A comprehension model that carries implementation state makes
that overlap total. Then either the model is a second source of
progress truth, which K-003 forbids, or K-003 is extended to describe
a Backlog-and-model pair and the defined relation between them.

So the amendment is not optional and not incidental; it is the
load-bearing one. Its shape is chunk 1's output: K-003 extended to
admit a structured view over the same truth, with the Backlog
remaining authoritative for progress and the model authoritative for
structure — or a single register that subsumes both.

### Ruling register — dependency subjects, and the basis of rework

[Ruling register](../rulings.md). Owner, 2026-09-17: **decision register entries will be referenced as
subjects of dependencies, and this will likely form the basis for
estimating and performing rework.**

A ruling is an abstract resource in exactly the sense already settled:
one node creates it, others use it. RU entries already carry a
half-built version of the edge — an `Applied:` field naming the tasks
that consumed the ruling, written by hand, backwards, and only
sometimes.

This is what makes chunk 3 computable rather than aspirational. Reversal
cost is estimable only if what depended on the reversed thing is
recorded. When a ruling is superseded, the edges name which nodes
consumed it; the blast radius is read off rather than guessed, and
"easy to reverse and redo" acquires a number. Chunk 3's economics
depend on chunk 1 having recorded this, which is why chunk 1 comes
first.

### Risk register — instances of catalogue classes

Risks in the [risk register](../open-risks.md) attach to the project today, not to what they threaten. With a
model, a risk attaches to a component, a feature, or a dependency edge
— the tracked gap this plan names in "what this project does not
have".

The relationship to chunk 2 is class and instance. A catalogue entry
is a class of risk every project must mitigate; a project's register
entry is an instance, citing the class it came from. That citation is
what turns "we did not think of that" into a checkable condition:
a component with no entry citing a catalogue class that applies to it
is a visible omission rather than an invisible one.

### Cost log — the measuring instrument, one field short

The [Cost log](../cost-log.md) keeps one row per accepted task, keyed by node and stage. It is already the
instrument chunk 3 needs: rework cost against the reviews it displaced.

It is one field short. Rows say a task *was* rework in prose — "outage
rework", "rework after the backward transition" — and nothing says
what it was rework *of*. If dependency edges name the decision or
artifact that changed, a rework row can cite that edge, and the
comparison computes instead of being read. Small change, and the whole
of chunk 3's evidence rests on it.

### Run journal — events the model generates

The run journal (`orchestration/journal.jsonl`,
[type spec](../process/observability.md)) is an append-only event stream, already known to be short of vocabulary: no
`unblocked` kind, no risk-opened, no contradiction-closed, all
standing Backlog entries. The model adds more — a dependency recorded
during node preparation, an edge invalidated by a superseded ruling, a
component's state changing. These must be visible without diffing
documents, which is the journal's whole purpose. The vocabulary gap is
already open; the model widens it rather than creating it.

### Specifications — not a register, but the same problem

A specification closes when its node closes, so the system's
description disappears into completed work. If components carry
specifications, the specify stage produces a component-scoped document
that persists and the node's spec becomes a delta against it. Stated
elsewhere in this plan as a document-lifecycle question; the register
review makes it a relationship question, which is the more tractable
form.

### Classification — where a new type is declared

Each project declares its types in its
[Classification](../classification.md). This project declares its document types by citation. A comprehension
model instance is a type and must be declarable there. If the model
turns out to be a new register rather than an extension, this is the
smallest amendment it needs — and possibly the only one besides
K-003's.

### What this review concludes

Two amendments look likely, both Article 8: **K-003 extended** so a
structured view is not a second source of progress truth, and the
**type declaration** for a model instance. Everything else is
extension within existing rules — new fields, new journal event kinds,
one new Cost log column.

## Proposed shape

Four chunks. Dependency order, not priority order.

### Chunk 1 — The comprehension model

Extend the plan model with the elements a project needs to be
comprehended: what the system consists of, what state each part is in,
what specifications it must meet, what risks attach to it, and what
depends on what. Git-authoritative and human-readable, like the
register. The dependency recording mechanism is part of this chunk,
not separate from it — the owner's point is that dependencies are only
useful when visible *as part of* comprehension.

Design questions. The register review above is chunk 1's input, and
its two conflicts are chunk 1's first decisions: **explicit edges
against the Plan register's sibling ordering**, and **the K-003
extension that keeps a structured view from becoming a second source
of progress truth**. Beyond those:

- What happens to a specification when its node closes? Today it
  disappears into completed work. If specifications migrate to
  components, a node's specify stage produces something different.
- **Navigability is a first-class requirement, not presentation.** The
  owner's words: shown in a way that is easy to comprehend and
  navigate quickly. A model that is correct and unreadable has failed.

### Chunk 2 — The common risk catalogue

**New, owner-directed 2026-09-16, and this is what makes "no risk has
emerged" a checkable condition rather than a hopeful one.**

A register of common risks that projects must mitigate directly,
maintained **at the methodology level** so that every project inherits
it, with projects proposing additions and amendments through the
Article 8 process. Explicitly to include **execution-environment
coverage** — the class this plan previously admitted nothing covered.

This project is unusually well placed to draft it, because it has been
accumulating the content by getting hurt. Every entry below is a real
encounter with a date and an artifact:

- **A check that cannot fail in the environment the code runs in.**
  Four instances: `node -e` running CommonJS so an ESM defect passed;
  Vitest's module runner doing the same; an in-memory DynamoDB backend
  that never validated a condition expression; a bundle guard proven
  only by breaking it deliberately.
- **Dependency search as an attack surface** — [R14](../open-risks.md).
- **Fetched documentation as an instruction channel** —
  [R15](../open-risks.md).
- **A diagnostic that asserts a cause it did not test** —
  [R16](../open-risks.md).
- **The surface's own guidance contradicting the project's rule** —
  [R17](../open-risks.md).
- **A register entry describing another repository, going stale
  silently** — this project's Backlog.

The catalogue is not this project's risk register renamed. The test
for entry is whether a risk recurs *across* projects and must be
mitigated by each, rather than tracked by one.

**Populate before proposing.** Owner, 2026-09-17, settling open
question 3: the catalogue is drafted with its entries in place and
then taken upstream. An empty register would get the shape agreed
cheaply, but this project's evidence is unusually good and a populated
catalogue argues from it. So chunk 2's deliverable is a filled
catalogue, and the Article 8 proposal follows it rather than
preceding it.

### Chunk 3 — Reversibility

The owner's second mitigation, and the one nothing currently provides:
work within an active workstream must be easy to reverse and redo, so
that a problem found several steps later is cheap to correct.

This is what makes the economics work. Longer sequences pay because
rework by an assistant beats continual human review — but only if
rework is genuinely cheap. And the trade is **measurable**: this
project logs cost per task, so rework can be compared against the
reviews it displaced. If it is not paying, the Cost log says so. If
patterns of rework recur, they are learnings that improve planning,
which is the owner's own framing and needs the data to work.

### Chunk 4 — Sequence mode: specialise it, or leave it alone

W-001 exists and Allegro runs it. This chunk's content is a
determination: does the sequence mode need to be made more specific
for orchestrated, multi-agent projects, and if so, is that an
amendment?

The candidate specialisation is the one this project is placed to
make. W-001 stops a sequence when a chunk's summary carries **asks**,
and this project writes every result in W-008's three-part shape where
asks is a named section. A sequence that must stop on asks can read
that section rather than judge prose. Whether that is worth stating
upstream, or is simply how a compliant implementation behaves, is the
question this chunk answers.

**The analysis decides whether an amendment follows, and one is
likely.** Owner, 2026-09-17: likely even if only to clarify the
interruption criteria. That is the weaker and more probable outcome —
not a new mode, but W-001's four stop conditions made precise enough
that an agent applies them the same way twice. "A chunk needing a
maintainer decision" is a judgment when a human reads it and an
ambiguity when an agent does. So this chunk is not expected to produce
no work; it is expected to produce a clarification rather than a
mechanism.

## The risk this introduces, and what answers it

Continuous implementation removes review points, and this project's
serious defects — the ESM bundle, the reserved word, the `$LATEST`
alias, the IAM audience typo — each surfaced because something ran and
a human looked. A loop that continues while its own checks pass will
continue through anything its checks do not cover.

Four mitigations, each with a home above:

1. **Interrupted less often, not never**, at a rate each project
   controls — W-001's per-workstream gate policy, which Allegro
   already runs.
2. **Easy to reverse and redo** — chunk 3, which is why it is a chunk
   and not a footnote.
3. **Dependencies let blocked work stop without stopping everything**
   — part of chunk 1, since a dependency is only useful when visible
   as part of comprehension.
4. **A common risk catalogue naming what every project must mitigate**
   — chunk 2, owner-directed 2026-09-16. This closes the gap the
   previous draft admitted and could not fill.

The fourth deserves a sentence on why it works where the others do
not. The first three make failure **cheaper** — less exposure, easier
recovery, less blocked work. None makes failure less **likely**. A
catalogue of known risks does, because it turns "we did not think of
that" into "we did not apply a mitigation the catalogue names". The
recurring failure in this project's own history was never
carelessness; it was a check that could not fail, written by someone
who did not know the class existed. Naming the class is the fix.

## What this does to the existing plan

- **P1-N006 (pilot on a real project)** — Allegro is the pilot, and
  this work is how it happens. The node is subject to change.
- **P2-N003 (owner questions and the plan view)** — the natural
  surface for a comprehension model; likely needs re-specifying
  against chunk 1 rather than proceeding as planned.

Both confirmed by the owner as subject to change, 2026-09-16.

## Open questions

One remains. Everything else is settled.

1. **Which register does the model extend, or is it a new one?** The
   steer is that it extends the planning and execution model. Whether
   that means new fields on existing entries, a new register class, or
   both, is chunk 1's first design decision — and it determines
   whether the amendment is small or large. The register review above
   narrows it without closing it: the Backlog relationship forces a
   K-003 amendment either way, and the Plan register's sibling
   ordering must be reconciled with explicit edges either way.

Settled by the owner, 2026-09-17:

2. **What is the minimum that makes it useful to Allegro?** Speed, not
   a formally complete model. Allegro needs enough recorded dependency
   to run more work concurrently and safely; formal completeness is
   not the bar and lanes are not the target (see "Lanes are not a
   target" above).
3. **Does the risk catalogue go upstream before or after it is
   populated?** After. Populate, then propose — chunk 2.

## References

- [Orchestrator v1](orchestrator-v1.md) — the founding plan and its
  standing constraints
- [Orchestration service](orchestration-service.md) — constraint 3,
  degrade to git-only, which any new model must honour
- [Backlog](../backlog.md) — the dependency mechanism, the risk
  attachment gap, P1-N006's pilot
- The registers reviewed above: [Plan register](../plan-register.md),
  [Backlog](../backlog.md), [Ruling register](../rulings.md),
  [risk register](../open-risks.md), [Cost log](../cost-log.md),
  run journal ([type spec](../process/observability.md)),
  [Classification](../classification.md)
- methodology **K-003** (the Backlog is the single source of progress
  truth) — the rule the model's relationship to the Backlog most
  likely amends
- methodology **W-001** (two delivery modes, human-gated), released in
  v1.5.0 with Allegro as its evidencing instance
- Allegro: `docs/backlog.md` §"Parallel lanes", `docs/design/layers.md`,
  `docs/design/implementation-map.md`, `V1-INVENTORY.md`,
  `docs/plans/parallel-lanes-process-delta.md`
