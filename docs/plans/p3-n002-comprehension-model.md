# The comprehension model

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N002; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node P3-N002, chunk 1 of P3-N001
([comprehension-and-continuous-implementation](comprehension-and-continuous-implementation.md),
[specification](../specs/p3-n001-comprehension-and-continuous-implementation.md)).
The parent's specification assigns this node criteria **I1**, **I2**,
**I2a**, **I3**, **I9** and **I10**, and the gate criteria **G1–G5**;
its *Chunk 1* paragraph carries five additions this plan must and does
carry.

This plan answers the parent's one open question. It is the node's
first design decision by the parent's own words, and leaving it open
would leave every child below it unplannable.

## Outcome

One comprehension model, defined as an extension of the planning and
execution model this project already has, plus one instance of it over
this repository, populated from documents that already exist here.

For any part of this project a reader names, the instance answers five
questions — what it is, what state it is in, what specification it must
meet, what risks attach to it, and what it depends on and what depends
on it — within a written navigation bound, from git and a text editor,
with no orchestration service running.

## The open question, answered

**Which register does the model extend, or is it a new one?**

**Answer: a new document type, keyed to the hierarchy that already
exists.** The Plan register's lines, grammar, nesting and single writer
are unchanged. The model is a new register-class document,
`docs/project-model.md`, defined by a new type spec
`docs/process/project-model.md` and declared by citation in the
[Classification](../classification.md) alongside the four types already
declared there.

Three facts force it, and each is checkable rather than aesthetic.

1. **The Plan register prunes.** Its type spec: "Completed trees are
   pruned when their plan document closes out: the subtree collapses to
   the root node line marked `done`." A comprehension model that
   evaporates when the work completes reproduces exactly the defect
   **I10** exists to fix. The register's lifecycle is deliberately
   short; the model's must be long. Two lifecycles, two documents.
2. **The Plan register is one line per node.** Its type spec: "Nodes
   never hold prose: anything beyond one line belongs in the node's
   plan or specification document." Five facets do not fit on that
   line, and widening the line changes the grammar that
   `plugin/scripts/lib/plan-register.ts` parses — a travelling package
   vendored to the service repository ([RU-012](../rulings.md)).
3. **The register's writer rule is narrow on purpose.** The
   Orchestrator is its single writer, to keep concurrent role sessions
   from racing on the file. Recording a dependency during a node's own
   preparation is done by a role that is not the Orchestrator.
   Separating the documents lets the rule stay exactly as it is
   (**I3** below).

**This is an extension, not a parallel structure**, and the test is
specific: does the model define a second tree of things with second
identifiers that shadows the node tree? It does not. Node IDs are the
model's identifiers for work, the hierarchy is the Plan register's
nesting, unchanged, and the model adds exactly **one** entity beside
it — the abstract resource, which is the thing the parent plan's own
dependency definition already names and which nothing currently holds.

**Consequences, stated so the gate can see their size.**

- **I5** (the type declaration) lands on its **first** disjunction: one
  new type, one Classification entry, one type spec. That is also the
  mechanism by which any other managed project adopts the model —
  "defined here, instantiated there" needs a declarable type.
- **I4** (K-003) lands on its **second** disjunction: no amendment, and
  a recorded argument for why none is needed. See *K-003* below.
- The Plan register's grammar, the shared unit and the conformance
  corpus do not move, which is what keeps this node inside one
  repository (*Dependencies*).

## Approach

### Two entities, one edge kind

- A **node** is a unit of work. It already exists. The model adds
  nothing to its register line.
- A **resource** is an abstract thing of the project that nodes create,
  modify or use: a component, a feature, a document, a ruling, a
  repository. This is the parent plan's own vocabulary — "a dependency
  names an **abstract resource** that one node creates or modifies and
  another uses" — promoted from a definition to an entry.
- The only edge kind is **node → resource**, labelled `creates`,
  `modifies` or `uses`. Node-to-node dependency is derived: node X
  depends on node Y iff X uses a resource Y creates or modifies.

Resources are **flat**. They get no hierarchy, no layers and no tracks.
Granularity is decided by whoever records the edge, never by the model
— the plan settles that, and a resource hierarchy would be the second
structure the owner ruled out. Resource names are stable slugs
(Article 10's stable-naming principle, as node IDs already follow it);
a rename leaves an alias line rather than breaking every edge.

### Where the entries live, and what one looks like

One file, `docs/project-model.md`, resource-keyed, one entry per
resource. Illustrative shape — the thin slice exists to break it:

```
- form-checker — the orchestration form checks
  is: the tool that enforces the register grammar and the
      cross-register invariants (plugin/scripts/form_check.ts)
  state: built
  spec: specs/p1-n009-plugin-tooling-portfolio-stack.md
  risks: R13
  created-by: P1-N012
  modified-by: P1-N010 · P1-N013
  used-by: P2-N009 · P2-N014
```

Resource-keyed rather than node-keyed because **G2's subject is a
part, not a node**: the owner names "the form checker", and the form
checker was created by one node and modified by three. A node-keyed
model answers a question nobody asked.

The node-side view — what does *this* node depend on — has a home
already: **the Dependencies section of the node's plan**, which
[RU-016](../rulings.md) already requires for repositories. That section
becomes the single *authoring* point for a node's dependencies; the
model is the single *authoritative store*. The Planner writes the
section, the Orchestrator transcribes it into the model at acceptance.
One place to write, one place to read.

### State is derived, never asserted

`state` is computed from the register stages of the nodes that create
or modify the resource: `planned` while none is `done`, `building`
while one is in flight, `built` when all are `done`, and `built,
changing` when a further modifying node is in flight. Nothing is typed
in by hand.

**The known limit, stated rather than hidden:** `built` says the work
finished, not that the part works. A part that is built and broken
reads as `built`. The Backlog carries whether it works, and the Risk
register carries what threatens it — the model points at both. That
limit is the price of K-003 staying unamended, and it is the right
price.

### The writer rule (I3)

**The Orchestrator is the model's single writer**, on exactly the terms
it is the Plan register's. Roles propose model entries and edges in
their task results, as they already propose register changes; the
Orchestrator records them in the acceptance commit it already makes.

This resolves I3 without narrowing anything: the Plan register's
existing fields are untouched by any other role, and the model's
entries have a named writer who is the same writer. One rule, not two.
The cost is latency — an edge identified at preparation is recorded at
acceptance — and that is the same currency guarantee the Plan register
already gives, which `dispatch.md` already requires before dispatch.

The alternative, letting the identifying role write the model directly,
has a measured cost in this repository this week: the Backlog's
lost-update race under parallel dispatch, recorded in the Backlog as a
deviation. Two roles appending to one file silently lose one write.
The model would inherit that defect exactly.

### Navigation is a criterion, and it is written here

Decision 5 of the parent specification, adopted with latitude: three
steps. **The figure is kept. The latitude is spent defining the unit**,
because "three steps" is unmeasurable without one and a criterion that
cannot be measured fails open.

- A **step** is opening a document, or following one link — an
  in-document anchor counts. The starting document is step zero.
- A **starting point** is any document a reader plausibly begins from,
  enumerated: `README.md`, the Classification, the Plan register, the
  Backlog, the Risk register, the Ruling register, the Cost log, and
  any plan or specification document. Each of them links the model
  instance in its header, which is what makes the first step available
  from anywhere.
- The **bound**: from any starting point, each of G2's five answers is
  reached in **at most three steps**. Worst case by construction is the
  specification answer: start (0) → model instance (1) → resource entry
  (2) → the specification document (3).

That worst case is tight on purpose. It forces the resource entry to
carry the four other answers itself rather than forward them.

### The thin end-to-end slice leads (decision 4, adopted)

The first child takes about five real resources of this project all the
way through state, specification, risks and edges, writing down only as
much notation as those five needed. The failure mode this guards is
named in the parent's decision 4: a notation that looks right until it
meets real content. The slice is explicitly allowed to change the
shape above; that is what it is for.

Candidate five, spanning the awkward cases rather than the easy ones:
the form checker (many modifying nodes), the shared register grammar
(a resource consumed across a repository boundary), the run journal (a
resource whose spec is a process document), `RU-016` (a ruling as a
resource, which is what **G5** reads), and this repository itself (a
repository as a resource, which is what RU-016's declaration records).

### Both recording moments, in one notation (G4)

- **During a breakdown.** The Planner plans several nodes and states
  their edges in the breakdown; the Orchestrator records them when it
  enters the children.
- **During a single node's preparation.** The Planner states the
  node's edges in its plan's Dependencies section — which is what this
  plan's own *Dependencies* section below is, and it is the node's
  first preparation-time record.

Same notation, same store, different moment. Neither is detected by a
tool; both are declarations, which is the whole of what the model
records.

Each recorded edge needs a journal event (**G4**). Chunk 1 adds the one
event kind that requires, by spec change to
[observability.md](../process/observability.md), which already declares
its vocabulary extendable that way. The pre-existing vocabulary gaps —
`unblocked`, risk-opened — stay with node P1-N016 and are not widened.

## What this does to the registers that already exist

### The four hand-written encodings (I1)

Each of the four the parent's review found is **read from the model's
notation** or **retained with a stated reason**. None is left with
neither.

1. **The Plan register's sibling ordering — read from the model.**
   Retired as a dependency signal by owner direction,
   [RU-018](../rulings.md). Four prose statements carry the retired
   meaning and all four are amended: `plan-register.md`'s "sibling
   order is dependency order", `plan-model.md`'s "Siblings are
   dependency-ordered", `dispatch.md`'s selection rule "entering
   `execute` requires earlier siblings `done`", and the Plan register
   instance's own header line. The replacement rule: entering `execute`
   requires that every node which creates or modifies a resource this
   node uses is `done`. List position keeps its presentation meaning
   and loses its dependency meaning. **No code and no grammar change**
   — verified: neither `plugin/scripts/lib/plan-register.ts` nor
   `plugin/scripts/lib/form-check-core.ts` mentions siblings or
   dependencies.
2. **The Ruling register's `Applied:` lists — retained, with a stated
   reason.** The reason: `Applied:` records precedent application *by a
   task*, and `form-check-core.ts` cross-checks it against journal
   `precedent-applied` events; the model records a *node* consuming a
   ruling as a resource, which is the node-level fact **G5** reads.
   They overlap and are not the same fact. Retiring the field would
   rewrite that check and its conformance-corpus expectation, and the
   corpus travels to the service repository (RU-012) — turning a
   single-repository node into a cross-repository one for a gain this
   node does not need. Decision 5 stages this so the owner may take the
   other option; [RU-014](../rulings.md) is the near match arguing for
   it, and is cited there rather than applied here.
3. **The Cost log's prose about what a rework row was rework of — read
   from the model, by P3-N004.** The parent specification assigns the
   Cost log field to chunk 3 explicitly ("the Cost log field of I7 is
   its change to make"). Chunk 1's contribution is the vocabulary that
   column will cite: the resource slug. Recorded here so the prose
   surviving chunk 1 reads as an assignment rather than an omission.
4. **Plan-to-plan cross references — read from the model.** A plan's
   Dependencies section becomes the single authoring point for the
   node's dependencies, and the Orchestrator transcribes it. Links
   between plan documents keep their navigation meaning and lose their
   dependency meaning: a dependency stated only in another plan's prose
   is no longer a record. This also answers the Backlog's open item
   that a plan has no declared place for RU-016's repository-reach
   declaration — the Dependencies section is that place, and a
   repository is a resource like any other.

### K-003 — no amendment, and the argument (I4)

The model carries **no progress field of its own**. A resource's state
is derived from the register stages of the nodes that create or modify
it; those stages are the Plan register's, whose relationship to the
Backlog `plan-model.md` already governs; progress truth stays in the
Backlog, undisturbed.

The owner's framing was "two views of the same information". A view
that owns no data cannot be a second source of truth. So K-003 as
released stands, the argument is recorded, and **I4's second clause is
met by construction plus a check**: a form-check rule reports any
divergence between a resource's derived state and the register and
Backlog it derives from, and the node demonstrates it firing.

If the thin slice shows a derived-only state cell is unusable, the
amendment is still available and comes back to the owner. It is not
being closed off; it is being not-spent.

### The specification lifecycle (I10)

Today a specification goes `closed → Backlog entry` when its node
closes, and the system's description goes with it.

**The answer: the resource entry is the persisting, component-scoped
description.** It carries `is:` — what the thing is, in a reader's
terms — and `spec:` links to every node specification that defined it.
A node's specification keeps its current lifecycle and K-007 is
unchanged; what changes is that before it closes, the durable part of
its content is carried onto the resources it specified, in the
acceptance commit (W-003). A node's specification is then a delta
against a description that outlives it, which is the parent plan's own
proposed shape, reached without a second document type or a second
lifecycle.

The register prunes completed trees. The model does not. That asymmetry
is the answer.

### The hierarchy survives (I2a)

Nothing above touches the Plan register's nesting, and the evidence
I2a asks for is available by inspection: the register after this node
reads as the nested document it reads as today. Parent-child edges are
formally dependency edges and the instance may be analysed as a flat
graph where that helps — but the hierarchy is authored, and any graph
view is derived from it. The model is a hierarchy readable as a graph,
never a graph rendering a tree.

## Dependencies

- **Repository reach ([RU-016](../rulings.md)): this repository only.**
  No repository new to the project, and no owner grant needed. The
  reasoning, because this is the claim most likely to be wrong: the
  shared register grammar does not change; `form-check-core.ts` does
  **not** travel (the vendoring manifest carries
  `lib/plan-register.ts` and `lib/corpus/` only); and the new checks
  are specified to be **inert where a project declares no model
  instance**, so no recorded corpus expectation moves and the vendored
  package stays byte-identical. **The trigger that would change this:**
  if a check must alter a corpus expectation, the node stops and the
  Orchestrator grants reach to
  [majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service),
  which RU-016 already places permanently in approved scope. Named in
  advance rather than discovered.
- **P3-N001 `broken-down`** (2026-09-17). Its specification binds this
  node; its gate record settles I2 and adds I2a.
- **Not** a dependency: P3-N003 and P3-N005, both marked independent
  of this node (RU-018).
- **Depending on this node:** P3-N004, whose economics are computable
  only once what depended on a reversed thing is recorded.
- **Overlap to keep out of collision: node P1-N016.** This node amends
  `dispatch.md`, `plan-model.md` and `plan-register.md` because the
  owner's retirement of sibling ordering forces it — not
  discretionarily. P1-N016 keeps the accumulated editorial backlog
  against those same documents. The two must not both rewrite the
  selection rule; this node's amendment is the one that lands, and the
  Backlog addition below records it.
- **No owner action** beyond the gate. Nothing here needs credentials,
  a deployment or an external party.

## Leaf or interior

**Interior.** The chunk spans a notation designed against real content,
a type declaration and two written arguments, a populated instance, and
an enforcement layer in the checker. No one of these validates another,
and the slice must be free to revise a notation it cannot revise if it
ships with it.

The cut is **not feature-first**, and the reason is recorded per
`plan-model.md`'s allowance. The model is a single atomic feature — its
five facets have no sub-behavior that validates separately, since an
instance answering four of five questions answers none of G2. So the
cut is by iteration: a slice, then the generalization, then the full
population, then the checks. That is the thin-slice-first shape the
parent's decision 4 requires, carried through rather than bolted on.

### Proposed children, in dependency order

IDs are the Orchestrator's to issue.

**Child A — The thin end-to-end slice: five real parts, all the way
through.** `docs/project-model.md` with about five resource entries,
each carried through `is`, `state`, `spec`, `risks` and edges, with the
notation written down only as far as those five needed. Criteria: every
item traces to the document it came from (**G1**); at least one entry
is a ruling and one is a repository; the navigation bound holds for all
five as defined above; each of G2's five questions is answered for each
of the five; the exercise is performed with no orchestration service
running (**I9**); what the slice changed about the notation above is
recorded with the reason. Deliberately allowed to invalidate this
plan's sketch — a slice that cannot is not a slice.

**Child B — The type, declared; the two arguments, written.**
`docs/process/project-model.md` as the type spec, the Classification's
fifth custom definition by citation (**I5**), the writer rule stated
(**I3**), the K-003 argument written (**I4**), and the specification
lifecycle answer recorded and applied (**I10**). Criteria: what the
repository contains matches what it declares (Article 4); the writer
rule names the Orchestrator and the Plan register's fields are
untouched by any other role; the K-003 argument is a written argument,
not a restated likelihood; the type spec defines the state derivation,
the edge labels and the slug-stability rule. Depends on A.

**Child C — The instance, over this repository.** The model populated
across this project's current parts, derived from the Plan register,
the Backlog, the specifications, the Risk register and the Ruling
register. Criteria: **G1** over a sample the owner picks; the
navigation bound holds across the populated file, not just the slice;
**G4**'s two recording moments are both exercised, in one notation,
each producing a journal event; **G5** — a real subject this project
has reversed or superseded is named and its blast radius is read off
the edges, then checked by hand; every starting point listed in the
bound links the instance in its header. Parts that cannot yet be
described become Backlog items, not failures (the plan's settled bar).
Depends on B.

**Child D — Sibling ordering retired, and the checks that replace it.**
The four prose amendments of encoding 1 above, `dispatch.md`'s
selection rule rewritten to read recorded edges, the journal event kind
added, and the form-check rules: every node ID in the model resolves,
every edge names a defined resource, and a resource's derived state
agreeing with the register and the Backlog. Criteria: a search for
rules, documents or tools reading sibling position as a dependency
comes back empty or names each survivor with its reason (**I2**); the
divergence check is demonstrated firing on a contradiction induced on a
scratch branch (**I2**); the new checks are **inert** on a tree with no
model instance, and the conformance corpus's recorded expectations are
byte-identical afterwards (**I11**, and the single-repository claim);
`node plugin/scripts/form_check.ts` passes its pre-existing rules.
Depends on C.

**Parallelism.** None recorded: A → B → C → D is a genuine chain. Each
child needs what the one before it produced, and saying so is the
honest answer rather than manufacturing independence on the node whose
whole subject is recorded dependency.

## Verification criteria for this node

The plan-stage statement; the specification will refine it into
checkable form and is authoritative for verification. The chunk is
complete when:

1. One committed instance, `docs/project-model.md`, derived from
   documents that already exist here, traceable item by item for a
   sample the owner picks (**G1**).
2. For a part the owner names on the spot, the instance answers all
   five of G2's questions, and no answer needs a document the model
   does not point at (**G2**).
3. Each of those five answers is reached in **at most three steps**,
   with *step* and *starting point* as defined in *Navigation is a
   criterion* above (**G3**).
4. One edge recorded during a breakdown and one during a single node's
   preparation, in the same notation, both visible afterwards, both
   with a journal event, neither detected by a tool (**G4**).
5. A real reversed or superseded subject's blast radius is read off the
   edges and agrees with a hand check, or the difference is explained
   (**G5**).
6. Each of the four hand-written encodings is read from the model or
   retained with its reason recorded (**I1**).
7. No rule, document or tool reads sibling position as a dependency,
   or each survivor is named with its reason; `dispatch.md` selects on
   recorded edges; a register state contradicting an edge is reported,
   demonstrated on a scratch branch (**I2**).
8. The Plan register still reads as the nested document it reads as
   today, and any graph view is derived from it (**I2a**).
9. The model's writer rule is stated, names the Orchestrator, and no
   other role writes register-owned state (**I3**).
10. The Classification declares the model instance's type by citation
    and matches what the repository contains (**I5**); the K-003
    argument is written and the divergence check demonstrated (**I4**).
11. The specification lifecycle answer is recorded **and applied** to
    this repository (**I10**).
12. Everything in 1–5 is done at least once with no orchestration
    service running, including the navigation bound (**I9**).
13. `node plugin/scripts/form_check.ts` passes its pre-existing rules;
    the conformance corpus's recorded expectations are unchanged
    (**I11**).
14. The Backlog moved in the same commits as the work (W-003).

Criteria 2 and 3 are the owner-facing gate. The rest are what make them
mean something.

## Monotonicity

**No planned non-monotonicity is proposed.** The design keeps it that
way deliberately: the model is a new document, so no existing check's
subject changes; the new checks are inert where no model instance is
declared, so no recorded corpus expectation moves; and the shared
grammar unit is untouched.

One candidate exists and is declined by default — retiring the Ruling
register's `Applied:` field would rewrite `form-check-core.ts`'s
cross-check and its corpus expectation. Decision 5 stages it so the
owner sees the choice at the gate, which is where `plan-model.md` puts
a planned rewrite if one is to be authorized at all. If it is declined,
the retirement is a Backlog item and a W-002 discussion for later. If a
rewrite proves necessary mid-execution, it returns to the owner under
W-002 before any test changes, never absorbed.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics; the owner's go-ahead adopts every default not overridden by
number. This document opens its own sequence at 1.

**Precedents checked against the [Ruling register](../rulings.md).**
[RU-016](../rulings.md) is the authority for the repository-reach
declaration above and decides silently. [RU-018](../rulings.md) already
settles this node's independence from P3-N003 and P3-N005 and is not
re-raised. [RU-020](../rulings.md) will decide at this node's
specification gate whether a separate `break down` task is dispatched,
and is not staged here. [RU-010](../rulings.md) governs how the work
reaches `main`. [RU-005](../rulings.md) does not apply: this node
produces no upstream-bound artifact under its defaults.
[RU-014](../rulings.md) is a *near* match cited in decision 5's
rationale, not applied.

1. **Which register the model extends — the parent's open question.**
   Default: **a new document type**, `docs/project-model.md` with type
   spec `docs/process/project-model.md`, declared by citation in the
   Classification; the Plan register unchanged in line, grammar,
   nesting and writer. Rationale: the register prunes completed trees
   and holds one line per node, so it can carry neither the model's
   lifetime nor its content; widening the line would change a grammar
   vendored to another repository. This lands **I5** on a new type and
   keeps the node inside one repository.
2. **What the model adds beside the node.** Default: **exactly one
   entity — the abstract resource — flat, with one edge kind, node →
   resource, labelled `creates` / `modifies` / `uses`.** Rationale: the
   resource is already the thing the plan's dependency definition
   names; giving it a hierarchy would be the parallel structure the
   owner ruled out, and deciding its granularity is explicitly not the
   model's job.
3. **Whether K-003 is amended (I4).** Default: **no amendment.** The
   model carries no progress field; resource state is derived from
   register stages, progress truth stays in the Backlog, and a
   form-check rule reports divergence and is demonstrated firing.
   Rationale: two views of the same information, and a view that owns
   no data cannot be a second source of truth — this is also much the
   cheaper path, and the amendment stays available if the slice shows
   the derived cell unusable.
4. **The model's writer (I3).** Default: **the Orchestrator, single
   writer**, with roles proposing entries in their task results exactly
   as they propose register changes. Rationale: one rule instead of
   two, the Plan register's fields untouched by any other role, and
   this repository's own Backlog lost-update race under parallel
   dispatch is the measured cost of the alternative.
5. **The Ruling register's `Applied:` lists (I1).** Default:
   **retained, with its reason recorded** — `Applied:` is task-keyed
   evidence of precedent application cross-checked against journal
   events, the model's edge is the node-keyed dependency G5 reads, and
   retiring the field would rewrite a functional test and a corpus
   expectation in a package vendored to the service repository.
   Rationale: the gain is tidiness and the cost is making a
   single-repository node cross-repository and non-monotonic. The other
   option is live and argued by RU-014 — retire the field, keep the
   surviving assertion with the model's edges as its subject, and
   authorize the rewrite here under W-002; taking it expands this
   node's reach to the service repository, which RU-016 already permits
   the Orchestrator to grant.
6. **The navigation bound (parent decision 5's latitude).** Default:
   **three steps, kept**, with *step* defined as opening a document or
   following one link, and *starting point* enumerated as the eight
   documents listed above, each linking the instance in its header.
   Rationale: the latitude is better spent making the number
   measurable than moving it; undefined, "three steps" fails open,
   which is the one thing a bound must not do.
7. **The specification lifecycle (I10).** Default: **the resource entry
   is the persisting component-scoped description** — `is:` plus
   `spec:` links — and a node's specification keeps its present
   lifecycle, with the durable part of its content carried onto the
   resources it specified before it closes. Rationale: it answers I10
   without a second document type or a second lifecycle, and the
   register-prunes/model-persists asymmetry is what makes it work.
8. **Leaf or interior, and the children.** Default: **interior**, four
   children — slice, type and arguments, instance, retirement and
   checks — in a genuine chain with no parallelism recorded. Rationale:
   four different kinds of work, none validating the others, and the
   slice must be free to revise a notation it cannot revise if it ships
   with it; manufacturing independence on the node whose subject is
   recorded dependency would be an argument against the node.

## References

- [comprehension-and-continuous-implementation](comprehension-and-continuous-implementation.md)
  — the parent plan: the settled direction, the register review that is
  this node's central input, and the open question answered above
- [p3-n001-comprehension-and-continuous-implementation](../specs/p3-n001-comprehension-and-continuous-implementation.md)
  — the parent specification: criteria G1–G5, I1, I2, I2a, I3, I9, I10,
  the *Chunk 1* additions, and the gate record of 2026-09-17
- [plan-model](../process/plan-model.md) — the hierarchy, the node
  lifecycle, the thin-slice guidance, and the monotonicity definition
- [plan-register](../process/plan-register.md),
  [cost-log](../process/cost-log.md),
  [rulings](../process/rulings.md),
  [observability](../process/observability.md) — the four type specs
  the model meets, and the shape a fifth follows
- [profiles](../process/profiles.md) — the C1 depth this plan and its
  specification are written to
- [dispatch](../process/dispatch.md) — the selection rule this node
  amends, and the owner-decision economics the gate list follows
- [Classification](../classification.md) — where the fifth custom
  definition lands (decision 1)
- [Risk register](../open-risks.md) — R8 (thin slice first), R10
  (second source of truth), R13 (the checker's runtime floor)
- [Ruling register](../rulings.md) — RU-005, RU-010, RU-012, RU-014,
  RU-016, RU-018, RU-020
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md) — the chunk
  plan shape this document follows
- methodology **K-003** (decision 3), **K-007** (the status contract),
  **W-002** (decision 5's other option), **W-003** (same-commit
  documentation)
