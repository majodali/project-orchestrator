# The type declared, the arguments written, the K-003 amendment drafted

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N007; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's plan gate. It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), the [process
specification](../process/README.md), and the section *Child B: the
type declared, the arguments written, the K-003 amendment drafted* of
the [specification of the comprehension
model](../specs/p3-n002-comprehension-model.md).

[Node](../process/README.md#def-node) P3-N007 is child B of P3-N002
(the comprehension model): [plan](p3-n002-comprehension-model.md),
[specification](../specs/p3-n002-comprehension-model.md). It is second
in the chain P3-N006 to P3-N009. It builds on P3-N006 (the thin
end-to-end slice), whose [instance](../project-model.md) and [slice
record](../project-model-slice-record.md) landed at commit `86a1330`.

The parent specification fixes this node's outcome and its criteria
B1 to B17. This plan does not restate them. It records what that
section leaves open: how the fourteen findings of the slice record are
disposed of, where each argument lands, how the amendment's IR,
rendering and review are sequenced, this node's edges and repository
reach, and twelve decisions for the gate.

## Outcome

The Project model becomes a declared type of this repository, and the
K-003 (the Backlog is the single source of progress truth) amendment
exists as a reviewed proposal ready for the owner to carry.

Concretely, at `done`:

- The type spec `docs/process/project-model.md` exists. It defines the
  entry grammar, the derivation rules, the two rendering procedures
  and the writer rule, against the slice's real entries.
- The [Classification](../classification.md) declares the type as its
  fifth custom definition.
- The writer rule, the authoring point for a node's edges, the
  specification-lifecycle answer and the `Applied:` retention reason
  are each stated where a reader meets them (B4 to B7).
- The run journal's vocabulary has the `edge-recorded` event kind, and
  the form checker accepts it (B8).
- The proposal `docs/proposals/planning-execution-model-is-progress-truth.md`
  exists, with its IR (`.ir.md`) and its review record (`.review.md`)
  beside it. Its stranger rounds ended readable, or at the limit with
  the owner's decision (B14).
- The owner has gated the proposal at this node's `verifying`
  (RU-005, proposal-class nodes are owner-gated at `verifying`).

## Approach

### A leaf run as a fixed task sequence

The node runs as four steps (decision 2). Each step is a
[task](../process/README.md#def-task) the Orchestrator dispatches and
accepts.

1. **E1, the type and the arguments.** An Implementer task at the
   advanced tier (P3-N002 decision 14). One commit. It self-verifies
   B1 to B8 and B17.
2. **E2, the amendment.** An Implementer task at the advanced tier.
   It commits the IR alone first, then the rendered proposal in a
   second commit. The commit order is the evidence that the IR came
   first (B14).
3. **Stranger rounds.** The Orchestrator dispatches each round's
   Reviewer (stranger) with a fresh context. After a round that is not
   readable, the drafting session fixes the IR, then the prose. Where
   the surface cannot continue that session, a fresh advanced
   Implementer session does the fix, given the IR, the prose, the
   review record and the findings table. The review record names which
   session fixed each round.
4. **Verifying.** The Implementer's self-verification of B9 to B15 is
   recorded first. Then the owner gates the proposal (B16).

The IR is the [intermediate
representation](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md)
the methodology specifies: a checked list of claims from which prose is
rendered. A stranger is a reviewer with a fresh context who restates
the text before reading the IR
([roles](../process/roles.md#reviewer-stranger)).

### E1: where each part of the type lands

| Criterion | What E1 writes | Where |
|---|---|---|
| B1 | entry grammar, five facets, three edge labels, slug stability with alias lines, state derivation as a table, the dependency rule of decision 3, and a worked example applying it to *Edges stated at this breakdown* | `docs/process/project-model.md` |
| B2 | the implementation-map procedure and the what-is-next procedure, each naming the facets it carries and omits (decision 6) | the type spec |
| B3 | the fifth custom definition, by citation, naming the instance; it declares the type and no progress authority | `docs/classification.md` |
| B4 | the writer rule; roles propose model entries and edges in their task results; a task whose brief names the instance among its writes is the stated case for children A and C | the type spec; `docs/process/dispatch.md`, handoff contract; `.claude/agents/` orchestrator, planner, implementer and reviewer, regenerated into `plugin/agents/` |
| B5 | a plan's *Dependencies* section is the single authoring point for a node's edges and its repository reach | `docs/process/plan-model.md`, at the `planned` stage |
| B6 | the specification-lifecycle answer of I8 | the type spec |
| B7 | the `Applied:` retention reason (P3-N002 plan decision 5) | `docs/process/rulings.md`, at the *Apply* step |
| B8 | `edge-recorded` added; the other two model events of I7 recorded as gaps with homes: an edge invalidated by a superseded ruling with P3-N004 (reversibility), a part's state change with P2-N003 (the web view), since state is derived from stage changes the journal already records | `docs/process/observability.md`; the `EVENTS` set in `plugin/scripts/lib/form-check-core.ts`; one Vitest test outside `plugin/scripts/lib/corpus/` |

E1 also corrects the instance's header bullet "No declared type" in the
same commit, because B3 makes it false. That is the stated case of B4:
the brief names the instance among E1's writes. E1 leaves the
instance's "No progress authority" bullet as it stands (B15). E1 does
not conform the five slice entries to the final grammar. That is
P3-N008's (the instance over this repository), which populates the
instance in the type spec's notation.

The type spec opens with what it does not claim. Until the amendment
is released and pinned, the Backlog stays the referent for what is
done and what is next (P3-N002 decision 13, option (a)).

The type spec is written directly, to the prose rules P-001 to P-008.
It is the definition site for the model's terms (decision 11). It gets
no stranger rounds unless the owner asks (decision 10).

### The dependency rule (B1)

The parent plan's rule is: node X depends on node Y if X uses a
resource Y creates or modifies. Applied to the breakdown's edges, it
yields cycles. P3-N008 uses the Plan register, and P3-N009 modifies
its header. P3-N007 uses `project-model`, and P3-N008 modifies it.

The slice record's finding 1 recommends a fourth edge kind that reads
a resource as it stands and creates no dependency. That fails on this
node's own edge. P3-N007 needs P3-N006, which creates `project-model`.
It does not need P3-N008, which modifies it later. A `uses` edge that
depends on every modifier yields the cycle. An edge that depends on
none loses P3-N006.

So decision 3 proposes this rule. A `uses` edge depends on the nodes
that create the resource. It depends on a modifying node only when the
edge names that node, written `uses project-model after P3-N008`. The
three labels of P3-N002 plan decision 2 stay as they are.

Applied to the breakdown's edges, the rule gives:

| Node | Uses | Depends on |
|---|---|---|
| P3-N006 (child A) | `RU-016`, `RU-021` | none among the siblings |
| P3-N007 (child B) | `project-model`, `RU-015`, `RU-021` | P3-N006, creator of `project-model` |
| P3-N008 (child C) | `project-model-type`, `plan-register`, `backlog` | P3-N007, creator of `project-model-type`; the other two were created by done nodes |
| P3-N009 (child D) | `project-model` after P3-N008, `project-model-type`, `RU-018` | P3-N006, P3-N007 and P3-N008 |

The chain is P3-N006, P3-N007, P3-N008, P3-N009, with no cycle. The
`after P3-N008` qualifier on child D's edge is the meaning the parent
specification states: "D uses `project-model` and
`project-model-type`, which A, B and C create or modify." The
Orchestrator transcribes it that way (decision 8).

The cost is a silent miss. A `uses` edge that should name a modifier
and does not lets a node start early. A cycle check in the form
checker catches the opposite fault only. The Planner who writes the
edge owns the qualifier, as the model records declarations and infers
nothing.

### The fourteen findings

Each finding of the slice record, section 7, has a disposition. Three
need the owner and are staged separately. The rest are batched as
decision 12.

| Finding | Disposition | Lands in |
|---|---|---|
| 1. The derivation rule's cycle | The rule of decision 3. The recommended fourth edge kind is declined: it loses this node's dependency on P3-N006. | type spec (E1) |
| 2. State for resources every node touches | Adopted. The type spec marks such a resource standing. Its modifying edges do not count in the state derivation. Its `state:` line carries `standing` as a second item, as an own status does. The four derived values stay as P3-N002 fixed them. | type spec (E1) |
| 3. Views and the rendering rule | Adopted, as decision 6. Each procedure names the facets it carries and omits. G6's no-drop rule applies per view. The When field of a row comes from a dated item on the node's edges, with its source; E1 names a source that survives the switch to a rendering. | type spec (E1) |
| 4. Open findings that are not nodes | Decision 4. The proposal states the answer and the count (B10). | proposal (E2) |
| 5. Authorship of a specification | Adopted. The type spec says authorship is left unstated unless a record names a node. | type spec (E1) |
| 6. Anchors in the Risk and Ruling registers | No change here. The navigation bound stays as P3-N002 decision 9 fixed it. The existing Backlog entry on anchors stands, for P2-N003. | none |
| 7. A gate decision is not a node's work | Adopted. `created-by:` may name a node's gate, or read `none` with the ruling's Source text. | type spec (E1) |
| 8. Closed node specifications as `spec:` targets | Adopted. `spec:` items are typed as node or process specifications. The I8 answer carries a closed specification's durable content onto the entry. | type spec (E1) |
| 9. Resource-to-resource dependence | Adopted. The type spec derives it from the `uses` edges of each creating node and does not store it. | type spec (E1) |
| 10. Risk relation | The slice's rule is kept: a `risks:` item lists a Risk register entry that names the part as at risk. Adopting P3-N003's reaches line would make this node depend on P3-N003, which RU-018 (a child is not queued behind a sibling it does not depend on) records as independent. A Backlog addition revisits it. | type spec (E1); Backlog |
| 11. Containment | No decision here. It joins the Backlog entry on hierarchical resources. Finding 2's rule covers the repository meanwhile. | Backlog |
| 12. `Applied:` lists against the plans | G5 reads the model's `used-by:` lines. The existing Backlog entry on reconciling RU-016's Applied list stands. B7's retention reason names the difference: `Applied:` is task-keyed precedent application, and a plan's citation is a node's use. | `docs/process/rulings.md` (E1) |
| 13. Edges come from records | Adopted. The type spec states that an edge comes from a plan's *Dependencies* section, a breakdown, or a record of a done node, and is never inferred. | type spec (E1) |
| 14. `README.md` pin | Already resolved: `README.md` line 24 reads "pinned methodology 1.6.0" at planning. | none |

### E2: the amendment, IR first

Scope is P3-N002 decision 10: K-003 amended in place by one
conditional clause. Where a project's Classification declares a
[planning/execution
model](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-planning-execution-model),
that model is the referent for what is done and what is next. The
Backlog's implementation map and list of what is next are then
renderings of it. A project that declares none is unchanged.

A Classification has no field for this declaration today. Decision 5
proposes the custom-definitions section as the place. The clause then
needs no change to the Classification's structure. This repository's
fifth custom definition, written by E1, declares the type only. The
declaration of a planning/execution model is part of the switch the
Backlog entry carries for after the release.

The proposal states the three answers B10 requires.

- **What the model is authoritative for.** E2 states it in the type
  spec's terms: node stages, resource state as derived, edges, and
  the two renderings. B11's term-by-term cross-check is recorded in the
  IR's Evidence section, citing the type spec at E1's commit.
- **Where an open entry that names no node lives.** Decision 4. A
  pattern search at planning found 33 of 129 open Backlog entries with
  no node identifier. E2 states its counting rule and recounts at
  drafting.
- **Whether "built but broken" stands.** The plan's default answer is
  that the limit stands. The amendment makes the model authoritative
  for finished work, not for working parts. Whether a part works is
  verification evidence: the second component of the
  planning/execution model, outside this node. E2 rewrites the Backlog
  entry "The comprehension model cannot say built but broken" with
  this premise.

The rest of the proposal follows P1-N015's precedent shape
([proposal on K-010's
converse](../proposals/active-documents-are-corrected-not-marked.md)).

- K-003's text quoted verbatim from tag v1.6.0, checked unchanged
  against the methodology's `main` at drafting. The provenance line
  names the version, the commit and the date, with the re-verify
  instruction (RU-015, upstream delivery form). It covers the IR too
  (RU-022, corpus-bound documents are written IR first).
- *Motivated-by* cites the instance and the slice record at commit
  `86a1330`. It cites the vocabulary entry for the planning/execution
  model at methodology `main` commit `350f75f`, unreleased at v1.6.0
  (B12).
- A *Dependency* section says the amendment needs that vocabulary
  entry released with it or before it.
- A Release-register entry: title, placeholder pull-request link with
  a fill instruction, impact assessment against every Portfolio row,
  migration note. An ask covering acceptance, amendment and rejection
  closes it (B13).

The IR's header carries `Normative: yes`, reader RD-4 and purpose
`document`. Its Footprint names the proposal. E2 renders the normative
text and appends the render map (W-009, the methodology corpus writes
its deliverables IR first).

E2's packet carries, verbatim from the methodology: K-003 at tag
v1.6.0 and at `main`, with each commit; the Portfolio register at
v1.6.0; the vocabulary entry at `350f75f`; Article 8 (amendments,
versions, and migration) and the Release-register entry shape at
v1.6.0. The Orchestrator supplies them.

### Stranger rounds

The rounds run until a round returns readable, or the count reaches
ten (B14). The verdict and confirmation rules are those of the
Reviewer (stranger) contract in [roles](../process/roles.md)
(decision 7). That contract adds the methodology's evaluation-case-009
changes, which the methodology's Release register lists as unreleased
after v1.6.0. The review record states which rules it applied.

The review record holds, per round: the findings, each disposition,
the verdict, the prose word count and the IR claim count. At the
limit, the text is not delivered before the owner decides. A count
that ends at the limit, or with a meta-review signal, is reported to
the communication-pipeline project, as the contract says.

## What this node does not cover

- **Conforming the five slice entries, and the rest of the
  instance.** P3-N008's.
- **The form-check rules for the model, and the selection rule.**
  P3-N009's (sibling ordering retired, and the checks that replace
  it). It gains a cycle check by Backlog addition.
- **The switch of this Backlog to a rendering, and the Classification's
  planning/execution-model declaration.** The existing Backlog entry,
  after the release (P3-N002 decision 13, option (a)).
- **Carrying the proposal upstream.** The owner's (RU-002, the owner
  hand-carries upstream output). The node completes at the artifact
  (RU-003, a node targeting an external party completes at the
  artifact).
- **Hierarchical resources.** The owner's note of 2026-10-29.

## Leaf or interior

Leaf, run as the task sequence above (decision 2).

The two halves validate only together. B11 holds the amendment's
authority to exactly what the type spec lets the model carry. If
stranger rounds change the amendment's terms, the type spec moves with
it. A split into two children would add a planning and a gate cycle
for criteria the parent already wrote. It would also split RU-005's
owner gate from the type the gate's proposal depends on.

## Dependencies

Edges are in the parent plan's sketch notation, with the `after`
qualifier of decision 3. Decision 8 says when they reach the instance.

- **Repository reach (RU-016, the Planner declares the repository
  access a node needs): this repository only, write.** The methodology
  repository is read for quoted texts only, which the Orchestrator
  supplies to E2 (above). Nothing is written upstream. The owner
  carries the proposal (RU-002). The parent plan's trigger stands: if
  a new form-check rule must change a recorded corpus expectation,
  the node stops. E1 adds an event kind, not a rule, and
  `plugin/scripts/lib/form-check-core.ts` is not vendored.
- **P3-N007 creates** `project-model-type` (the type spec) and
  `k-003-amendment` (the proposal, its IR and its review record).
- **P3-N007 modifies** `classification`, `observability-vocabulary`,
  `form-checker` and `backlog`, as the parent specification states.
  Additions found here: `plan-model-spec` (B5); `dispatch-rules`, its
  handoff contract only (B4); `ruling-register-type`,
  `docs/process/rulings.md` (B7); `role-contracts`, `.claude/agents/`
  and `plugin/agents/` (B4); `project-model`, its header bullet on the
  type; and `project-orchestrator-repo`, as its reach.
- **P3-N007 uses** `project-model` and `project-model-slice-record`,
  at commit `86a1330`; `RU-015` and `RU-021`, as the parent states.
  Additions: `RU-002`, `RU-003`, `RU-005`, `RU-016`, `RU-022`;
  `form-checker`, which B17 runs; `plan-register` and `backlog`, read
  for B10's count.
- **Nodes.** P3-N007 depends on P3-N006 only, which is `done`.
  P3-N008 depends on P3-N007. Its plan may be dispatched once E1 is
  accepted (decision 9).
- **Overlap, not dependency.**
  - P3-N014 (the loop runs sequence mode) edits the same role
    contracts later. It reads them as they then stand.
  - P1-N016 (process spec maintenance) holds editorial work against
    `dispatch.md` and `plan-model.md`. This node's edits land first,
    in other passages.
  - P3-N009 later modifies `dispatch.md`, `plan-model.md` and the
    form checker. It follows in the chain.
- **No owner action** beyond this gate and the gate at `verifying`.

## Verification

C1 profile ([profiles](../process/profiles.md)). The Implementer
self-verifies B1 to B15 and B17 against the parent specification's
*Child B* section. The adopted decisions of this plan bind the
Implementer beside it. B16 is the owner gate at `verifying` (RU-005).

## Monotonicity

No planned non-monotonicity is proposed. E1 adds one event kind
and one test. No test is rewritten. Every file the vendoring manifest
carries stays byte-identical: `plugin/scripts/lib/plan-register.ts`
and `plugin/scripts/lib/corpus/`. `node plugin/scripts/run_corpus.ts`
is run at E1 to show it.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics. This document opens its own sequence at 1. The owner's
go-ahead adopts every default not overridden by number.

Precedents checked against the [Ruling register](../rulings.md). These
decide silently and are not staged.

- RU-016: this plan's *Dependencies* is the repository-reach
  declaration.
- RU-021 (the planning/execution model is the source of progress
  truth) binds the amendment's direction.
- RU-005 gates this node at `verifying`.
- RU-015, RU-022, RU-002 and RU-003 govern the proposal's form and
  delivery.
- RU-010 (how work reaches `main` in this repository) governs the
  merge.
- RU-018: P3-N003 and P3-N005 stay independent of P3-N002.
- RU-020 does not apply: this node is a leaf.

Near matches cited in rationales, not applied: P3-N006 decision 1
(the parent's section as the node's specification) and P3-N013
decision 1 (a leaf run as a fixed task sequence), neither captured as
a ruling; RU-019 (a measurement may be satisfied by an unfavourable
result), for decision 6.

1. **P3-N007's specification.**
   **Default**: the parent specification's *Child B* section, with no
   `specify` task. The node moves `planned` → `specified` at this gate.
   Its register line gains
   `plan: plans/p3-n007-type-declared-amendment-drafted.md · spec: specs/p3-n002-comprehension-model.md`.
   **Rationale**: the section carries outcome, edges and checkable
   criteria at C1 depth, as for P3-N006 under its decision 1.
   **Affected locations**: none.
2. **Leaf, run as a fixed task sequence.**
   **Default**: E1, then E2, then stranger rounds, then the owner gate,
   as in *A leaf run as a fixed task sequence*. Fixes between rounds
   run in the drafting session where the surface allows, else in a
   fresh advanced Implementer session given the IR, prose, review
   record and findings.
   **Rationale**: B11 couples the type and the amendment; P3-N013
   decision 1 is the shape precedent; W-009 needs the IR's author to
   render, and the IR carries the reasoning when a session cannot
   continue.
   **Affected locations**: none.
3. **How node-to-node dependency is derived (B1).**
   **Default**: a `uses` edge depends on the resource's creating
   nodes, and on a modifying node only when the edge names it
   (`uses <slug> after <node>`). The three edge labels stay.
   **Rationale**: the slice's recommended fourth edge kind loses this
   node's dependency on P3-N006; this rule yields the chain with no
   cycle, as the table in *The dependency rule* shows.
   **Affected locations**:
   - [specification of P3-N002](../specs/p3-n002-comprehension-model.md),
     B2 (active), correction: "a node is actionable when every node
     that creates a resource it uses, and every modifying node its
     `uses` edge names, is `done` (P3-N007 decision 3)."
   - The same specification, D1, correction: "The replacement rule:
     entering `execute` requires that every node which creates a
     resource this node uses, and every modifying node its `uses` edge
     names, is `done` (P3-N007 decision 3)."
   - The same specification, D5, correction of its last item: "and no
     node at `executing` or later uses a resource whose creating node,
     or a modifying node its `uses` edge names, is not `done`."
   - [plan of P3-N002](p3-n002-comprehension-model.md), *Two entities,
     one edge kind* (active), correction: "Node-to-node dependency is
     derived: node X depends on node Y iff X uses a resource Y creates,
     or X's `uses` edge names Y as a modifying node it needs (P3-N007
     decision 3)."
   - The same plan, encoding 1 of *The four hand-written encodings*,
     correction: "The replacement rule: entering `execute` requires
     that every node which creates a resource this node uses, and every
     modifying node its `uses` edge names, is `done`."
   - [plan.md](../plan.md), P3-N009's Outcome line (active),
     correction: "Afterwards [dispatch.md](process/dispatch.md) starts
     a node only when the nodes that create the parts it uses, and the
     modifying nodes its edges name, are done."
4. **Where an open Backlog entry that names no node lives under the
   amendment (B10, slice finding 4).**
   **Default**: it stays a Backlog entry. The Backlog keeps it as its
   own content, not as progress truth. The model's list of what is
   next holds nodes. An entry joins that list when it becomes a node or
   a node's plan takes it in.
   **Rationale**: decision 10 of P3-N002 keeps the Backlog under K-003
   and changes only its two jobs; entering about 33 small findings as
   nodes is the ceremony `plan-model.md` rules out.
   **Affected locations**: [specification of
   P3-N002](../specs/p3-n002-comprehension-model.md), G6 (active),
   after "or the two disagree.", add: "An open Backlog entry that no
   node holds is the Backlog's own content, not a difference (P3-N007
   decision 4)."
5. **How a Classification declares a planning/execution model.**
   **Default**: by an entry in its Custom definitions section, under
   Article 7's definition-by-citation form, naming the types that make
   up the model. This repository's E1 entry declares the Project model
   type only; the declaration of the model waits for the switch.
   **Rationale**: it keeps decision 10's one clause, with no new
   Classification field; it matches the methodology roadmap's step for
   methodology-tools, which declares its model in its Classification.
   **Affected locations**: none.
6. **G6's no-drop rule applies per view (slice finding 3).**
   **Default**: a rendering's source is the facets its procedure
   carries. The procedure names the facets it omits.
   **Rationale**: a row in the Backlog's four-field shape cannot carry
   the `risks:`, edge or `formerly:` lines, so the rule as written
   fails every row; RU-019's reasoning applies: a criterion must be
   satisfiable by an honest result.
   **Affected locations**: [specification of
   P3-N002](../specs/p3-n002-comprehension-model.md), G6 (active),
   after "drops no claim its source holds.", add: "A rendering's source
   is the facets its procedure in the type spec says it carries, and
   the procedure names the facets it omits (P3-N007 decision 6)."
7. **Which rules decide the stranger rounds' verdicts.**
   **Default**: the Reviewer (stranger) contract in `roles.md`. It
   adds the methodology's unreleased evaluation-case-009 changes to the
   IR specification at v1.6.0. The review record names the rules
   applied.
   **Rationale**: the Orchestrator dispatches strangers against that
   contract; the IR specification binds this project only through
   RU-022; the methodology's `main`, where the proposal lands, already
   carries the same changes.
   **Affected locations**: [specification of
   P3-N002](../specs/p3-n002-comprehension-model.md), B14 (active),
   correction: "Stranger rounds run under the IR specification at
   v1.6.0, with the verdict and confirmation rules of the Reviewer
   (stranger) contract in [roles](../process/roles.md), until a round
   returns readable or the count reaches the limit of ten (P3-N007
   decision 7)."
8. **When held edges reach the instance.**
   **Default**: at the acceptance of E1, the Orchestrator transcribes
   the parent's *Edges stated at this breakdown*, P3-N006's plan
   edges and this plan's edges, in the type spec's notation, one
   `edge-recorded` event per edge. Child D's `project-model` edge is
   written `after P3-N008`, the meaning the parent states.
   **Rationale**: E1 lands the notation and the event kind; waiting
   for the owner gate leaves P3-N008's plan without them.
   **Affected locations**: [specification of
   P3-N002](../specs/p3-n002-comprehension-model.md), *Edges stated at
   this breakdown* (active), correction: "The Orchestrator transcribes
   these edges into the instance at the acceptance of child B's first
   execute task, E1, which lands the type spec and the event kind
   (P3-N007 decision 8), without changing their meaning, with one
   journal event per edge naming this document as the authoring
   point."
9. **P3-N008's plan may start before P3-N007 is `done`.**
   **Default**: the Orchestrator may dispatch P3-N008's `plan` task
   once E1 is accepted, alongside the stranger rounds. P3-N008's
   `execute` waits for P3-N007 `done`.
   **Rationale**: P3-N008 uses the type, not the amendment;
   `dispatch.md` lets `plan` start on recorded dependencies; up to ten
   rounds would otherwise idle the chain. A type change forced by B11
   returns P3-N008's plan for revision.
   **Affected locations**:
   - [plan.md](../plan.md), P3-N008's Depends on line (active),
     correction: "  - Depends on: P3-N007, for its executing stage.
     Its plan may be dispatched once P3-N007's first execute task, E1,
     is accepted (P3-N007 decision 9)."
   - The same document, the Waiting list, correction: "- P3-N008 (the
     instance): its plan may be dispatched once P3-N007's E1 is
     accepted; its execution waits on P3-N007."
10. **No stranger rounds on the type spec.**
    **Default**: the type spec is self-verified at C1 with no stranger
    rounds. The owner may ask for them at this gate.
    **Rationale**: only the proposal is corpus-bound and normative
    upstream (RU-022); the profile puts a Reviewer at owner request;
    the proposal's rounds already test the shared terms.
    **Affected locations**: none.
11. **Terms: ratify the slice's seven and one more.**
    **Default**: ratify facet, held edge, own status, formerly line,
    standing append, node specification and process specification,
    with the type spec as their definition site. Ratify standing
    resource, which this plan introduces.
    **Rationale**: E1 writes the definition sites; settling them now
    lets E1 anchor them once; the Backlog entry "Ratify or strike the
    slice's seven terms" closes at the crossing.
    **Affected locations**: none.
12. **The other findings' dispositions.**
    **Default**: as recorded in *The fourteen findings*, for findings
    2, 5, 6, 7, 8, 9, 10, 11, 12, 13 and 14.
    **Rationale**: each adopts the slice's recommendation or keeps an
    existing Backlog entry, except finding 10, which avoids a
    dependency RU-018 rules out.
    **Affected locations**: none.

## Backlog additions

- **P3-N009's rules gain a cycle check over derived dependencies.**
  When: 2026-10-30, planning P3-N007. Status: open, for P3-N009; the
  `after` qualifier of decision 3 lets a planner write a cycle.
  Pointer: this plan, *The dependency rule*.
- **Revisit the `risks:` relation when P3-N003's reaches line lands.**
  When: 2026-10-30, planning P3-N007 (slice finding 10). Status: open;
  the slice's rule is kept until then. Pointer: this plan, *The
  fourteen findings*.
- **Rewrite "Two nodes edit the same six role contracts" to name
  P3-N007.** When: 2026-10-30, planning P3-N007. Status: open, for the
  Orchestrator; E1 edits four of the six before P3-N014. Pointer: this
  plan, *Dependencies*.
- **Containment joins the hierarchical-resources entry.** When:
  2026-10-30, planning P3-N007 (slice finding 11). Status: open; add
  the finding's pointer to the existing entry. Pointer: [slice
  record](../project-model-slice-record.md), section 7.

## References

- [specification of P3-N002](../specs/p3-n002-comprehension-model.md):
  *Child B*, *The navigation bound*, G1 to G6, I1 to I10, P1 to P6,
  *Edges stated at this breakdown*, decisions 9 to 15 and the gate
  record of 2026-10-29
- [plan of P3-N002](p3-n002-comprehension-model.md): decisions 1 to 8,
  decision 3 overridden by RU-021, the sketch notation
- [project-model.md](../project-model.md) and the [slice
  record](../project-model-slice-record.md) at commit `86a1330`:
  sections 2, 5 and 7
- [plan of P3-N006](p3-n006-thin-end-to-end-slice.md): decision 2 on
  held edges, and the shape this plan follows
- [plan of P3-N013](p3-n013-stop-conditions-decidable.md): decision 1,
  a leaf run as a fixed task sequence
- [plan-model](../process/plan-model.md),
  [dispatch](../process/dispatch.md), [roles](../process/roles.md),
  [profiles](../process/profiles.md),
  [observability](../process/observability.md),
  [rulings](../process/rulings.md): the process documents E1 reads or
  amends
- [Ruling register](../rulings.md): RU-002, RU-003, RU-005, RU-010,
  RU-015, RU-016, RU-018, RU-019, RU-021, RU-022
- Methodology at v1.6.0:
  [K-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
  (the Backlog is the single source of progress truth),
  [W-009](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-009--the-methodology-corpus-writes-its-deliverables-ir-first)
  (the methodology corpus writes its deliverables IR first),
  [the IR
  specification](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md),
  [the prose rules](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md),
  Article 7 (custom definitions) and Article 8 (amendments, versions,
  and migration)
- Methodology `main`, unreleased: the [vocabulary
  entry](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-planning-execution-model)
  for the planning/execution model, the
  [vision](https://github.com/majodali/methodology/blob/main/docs/vision.md),
  the roadmap IR (`docs/roadmap.ir.md`, claims C12, C13 and C28), and
  the Release register's *Unreleased* entry on evaluation case 009
