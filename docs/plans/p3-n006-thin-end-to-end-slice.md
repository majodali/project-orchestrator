# The thin end-to-end slice: five real parts all the way through, and both renderings

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N006; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node P3-N006 is child A of P3-N002
([plan](p3-n002-comprehension-model.md),
[specification](../specs/p3-n002-comprehension-model.md)). It is the
first of four children in a chain, P3-N006 to P3-N009.

The parent specification's section *Child A: the thin end-to-end
slice* already fixes this node's outcome and its criteria A1 to A9.
This plan does not restate them. It records what that section leaves
to the node's preparation: the five resources and their slugs, how the
slice measures and renders, where its record lives, this node's edges
and repository reach, and three decisions for the gate.

## Outcome

Five real parts of this repository carried through the model, the
navigation bound and both renderings, in one commit, so that P3-N007
can define the type against content that has already pushed back.

Concretely, at `done`:

- `docs/project-model.md` exists with five resource entries. Each
  entry carries the five facets as labelled lines, and every item names
  the document it came from.
- A slice record exists beside it, at `docs/project-model-slice-record.md`.
  It holds the measured paths, the renderings and their comparison
  with the Backlog, the notation changes, and the session statement.
- The Backlog and one specification document link the instance in
  their headers.
- `node plugin/scripts/form_check.ts` passes, nothing under `plugin/`
  has changed, and the Backlog moved in the same commit.

## Approach

### The five, unsubstituted

The slice takes the parent plan's five candidates. They satisfy A1 as
they stand, so no substitution is planned. The Implementer may still
substitute one at execute under the specification's rule, with the
reason recorded.

| Slug | The part | The awkward case it carries |
|---|---|---|
| `form-checker` | `plugin/scripts/form_check.ts` and `plugin/scripts/lib/form-check-core.ts` | many modifying nodes, and a predecessor in another language |
| `plan-register-grammar` | `plugin/scripts/lib/plan-register.ts` | consumed across a repository boundary (A1) |
| `run-journal` | `orchestration/journal.jsonl` | a process document as its specification |
| `RU-016` | the ruling in the [Ruling register](../rulings.md) | a ruling as a resource (A1) |
| `project-orchestrator-repo` | this repository | a repository as a resource (A1) |

`form-checker` and `RU-016` are the slugs the parent specification
already uses. The other three are new. They are provisional until the
instance is first committed. From then on the slug-stability rule
P3-N007 writes (B1) binds them.

`plan-register-grammar` is kept apart from `plan-register`, the
instance, and from `plan-register-type`, its type spec, which the
parent specification already names.

### What the instance says about itself

The instance header states three things.

- It is P3-N006's slice: five entries, not the populated instance.
- Its type is not yet declared. P3-N007 writes the type spec and the
  Classification entry.
- It is not the referent for what is done and what is next. Under
  K-003 as released at v1.6.0, the Backlog is. This is P3-N002
  decision 13, option (a), applied to the first committed instance.

So the instance claims no authority K-003 denies (I6, B15), and it
claims no type the Classification does not declare (Article 4).

### What the five put to the sketch

The parent plan's illustrative entry is the sketch A7 measures
against. Writing these five entries meets at least these questions.
The slice record answers each, and A7 requires the answer.

1. `form-checker` was first written in Python under P1-N005 and ported
   under P1-N012. Is it one resource with an alias, or two?
2. Every node changes `project-orchestrator-repo`, and the Orchestrator
   appends to `run-journal` at every acceptance. Derived state would
   never leave `built, changing`. What does `state:` say for them?
3. `RU-016` carries its own status, `[active]`, in the Ruling register.
   How does a derived `state:` relate to it?
4. `RU-016` was created at the P2-N012 gate, not by a node's work.
   What does its creating edge name?
5. `plan-register-grammar` is consumed by a repository, through the
   vendoring generator `plugin/scripts/sync_shared_unit.ts`
   ([RU-012](../rulings.md)). How is a consumer outside the Plan
   register stated?
6. `run-journal`'s specification is `docs/process/observability.md`,
   a process document, where the others link node specifications. Is
   that one kind of `spec:` link or two?
7. Where does each item's source go, so that A3 holds line by line?

These are questions, not planned answers. A slice that answers all
seven with "the sketch was right" must show each sketch line confirmed
against an entry (A7).

### Measuring the bound

The two starting points A4 requires are the [Backlog](../backlog.md)
and the specification
[p1-n009-plugin-tooling-portfolio-stack](../specs/p1-n009-plugin-tooling-portfolio-stack.md).

That specification is chosen for two reasons. It specified two of the
five parts, through P1-N010 and P1-N012, so a reader of those parts
starts there. It is `closed → Backlog entry`, which is the state of
half the specifications P3-N008 will link (C3).

P3-N006 adds one visible line to each header, below the title and not
inside the comment, linking the instance. The line names the instance
and claims nothing more.

The record holds one path per resource, per answer, per starting
point: fifty paths. Each path lists its steps from step zero, and each
ends at the line that states the answer. The record then states
whether three steps held for every path (A8). A path over three is a
measurement, not a fault to repair. P3-N006 returns `needs-judgment`
and leaves the bound as fixed.

Decision 3 settles how a facet with nothing to state meets structural
condition (iii).

### The renderings

The type spec's rendering procedures are P3-N007's (B2), and they do
not exist yet. So the slice writes its own procedure into the record,
step by step, before it renders anything. It uses only the five
entries and the Plan register. P3-N007 may change the procedure. The
record keeps the one the slice used.

For each resource the slice renders its implementation-map entry and
any open what-is-next item (A6). It compares each with the Backlog as
it stands, and classifies each difference as G6 does: the model lacks
a claim, the Backlog lacks a claim, or the two disagree.

Two kinds of difference are expected, and neither fails A6.

- **Edges held back by decision 2.** The edges the parent
  specification states for P3-N007 and P3-N009 modify `form-checker`.
  They are not in the slice. The rendering lacks those claims, and
  the record gives the reason.
- **Actionability that needs edges outside the five.** Whether an
  open item is actionable depends on every resource its node uses.
  Most of those are not among the five. Where the slice cannot
  compute actionability, the rendering says so, and the record
  classifies it as the model lacking a claim.

### The slice record

`docs/project-model-slice-record.md` holds, in this order:

1. The session statement: the session named, and no orchestration
   service tool called (A5, I9).
2. The rendering procedure, as written before rendering.
3. The renderings and their comparison with the Backlog (A6).
4. The fifty paths, and the statement on three steps (A4, A8).
5. The answers to the seven questions above, and every notation change
   from the sketch with its reason (A7).
6. Any substitution among the five, with its reason.
7. Findings for P3-N007's type spec, in particular for the derivation
   rule's cycle (B1) and the rendering procedures (B2).

The record is not in the instance. The instance is register-class:
entries in it, reasoning elsewhere. P3-N007 cites the instance and the
record at the commit that lands them (P3-N002 decision 12).

### One commit

The instance, the record, the two header lines and the Backlog move
together in one commit on one single-use branch (W-003, W-006).
P3-N007 pins that commit.

## What this node does not cover

- **The type spec, the Classification entry and the K-003
  amendment.** P3-N007's.
- **Entries beyond the five, and the instance link in other headers.**
  P3-N008's.
- **Any form-check rule for the model.** P3-N009's. Nothing under
  `plugin/` changes (A9).
- **The Backlog switched to a rendering.** A Backlog item, carried
  under P3-N002 decision 13, option (a).
- **Hierarchical resources.** The owner's note of 2026-10-29. Resources
  stay flat here.
- **A rendering tool.** The slice renders by a written procedure, by
  hand.

## Leaf or interior

**Leaf.** The work is five entries, fifty recorded paths, up to ten
renderings, one record and two header lines. One Implementer session
carries it, at the standard tier P3-N002 decision 14 set.

Its parts validate only together. The paths test the entries. The
renderings test the edges. The record states what both did to the
notation. A child that wrote entries without measuring them would ship
the notation untested, which is the failure the slice exists to stop.

## Dependencies

Edges are in the parent plan's sketch notation. P3-N007 may refine the
notation. Decision 2 says when they reach the instance.

- **Repository reach ([RU-016](../rulings.md)): this repository only,
  write. No other repository is read.** The cross-repository facts
  about `plan-register-grammar` come from this repository: the
  vendoring generator, RU-012 and the P1-N011 Backlog entry. A verifier
  reaches only this repository (parent specification, *How
  verification runs*). If a fact can be stated only by reading the
  service repository, the slice records it as the model lacking a claim
  and does not widen its reach.
- **P3-N006 creates** `project-model`, the instance, and
  `project-model-slice-record`, the record.
- **P3-N006 modifies** `backlog`, for its header line and its own
  entry; `p1-n009-specification`, the header of
  `docs/specs/p1-n009-plugin-tooling-portfolio-stack.md`; and
  `project-orchestrator-repo`, as its reach.
- **P3-N006 uses** `RU-016` and `RU-021`, as the parent specification
  states; `form-checker`, which A9 runs; and the documents it derives
  from: `plan-register`, `backlog`, `risk-register`
  (`docs/open-risks.md`), `ruling-register` (`docs/rulings.md`) and
  the specifications of the five.
- **Additions to the parent's list.** The parent specification lists
  child A's edges as creating `project-model`, modifying `backlog`, and
  using `RU-016` and `RU-021`. The rest are additions found here. The
  edge on `p1-n009-specification` follows from A4 itself.
- **Use before a later modification.** P3-N009 modifies
  `plan-register`, and P3-N011 writes the Risk register. Under the
  parent plan's derivation rule, both would make P3-N006 depend on a
  later node. Neither is a dependency here: P3-N006 reads those
  documents as they stand when it executes. This is the cycle criterion
  B1 makes P3-N007 resolve. The edges are stated anyway, because the
  model records declarations.
- **Nodes.** None among the siblings: P3-N006 is first in the chain.
  P3-N003 and P3-N005 are independent of P3-N002
  ([RU-018](../rulings.md)), and nothing here changes that.
- **Overlap, not dependency: P1-N014.** P1-N014 (done on 2026-10-29, after this plan was written) also edits the Backlog header; it was `executing` at planning time and
  declares the Backlog's row shape in the Backlog header. P3-N006
  adds a line to the same header. The edits do not overlap. P3-N006
  reads the header as it then stands, and writes its Backlog entry in
  the declared shape if one is declared.
- **No owner action** beyond the gate.

## Verification

C1 profile: the Implementer self-verifies against A1 to A9. There is
no owner gate at this node's `verifying`. The specification is the
parent's *Child A* section (decision 1). The adopted decisions of this
plan bind the Implementer beside it and change no criterion.

## Monotonicity

**No planned non-monotonicity is proposed.** P3-N006 adds two
documents and two header lines. It changes no test, no code and no
vendored file.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics. This document opens its own sequence at 1. The owner's
go-ahead adopts every default not overridden by number.

**Precedents checked against the [Ruling register](../rulings.md).**
These decide silently and are not staged.

- RU-016: this plan's *Dependencies* is the repository-reach
  declaration.
- RU-021, with P3-N002 decision 13, option (a): the slice claims no
  progress authority before the amendment is released.
- RU-018: P3-N006 is first in its chain, and its independence from
  P3-N003 and P3-N005 is already recorded.
- RU-010 governs how the work reaches `main`.
- RU-005 does not apply: P3-N006 produces nothing upstream-bound.

Near matches cited in rationales, not applied: RU-020, for decision 1;
RU-019 (a measurement may be satisfied by an unfavourable result), for
A6 and A8, as the parent specification cites it for G6.

1. **P3-N006's specification.** Default: **the parent specification's
   *Child A* section, with no `specify` task.** At this gate the node
   moves `planned` → `specified` in one act. Its register line gains
   `plan: plans/p3-n006-thin-end-to-end-slice.md · spec: specs/p3-n002-comprehension-model.md`.
   Rationale: that section already carries the outcome, the edges and
   checkable criteria at C1 depth; RU-020 skips a `break down` task on
   the same reasoning; and P1-N010 to P1-N013, P2-N007 to P2-N011 and
   P2-N013 to P2-N016 entered `execute` on their parent's
   specification with no task of their own.
2. **Edges authored before the type exists.** Default: **P3-N006
   writes into the instance only the edges it derives from records of
   earlier nodes.** It writes neither the parent specification's
   *Edges stated at this breakdown* nor this plan's edges. The
   Orchestrator transcribes both at P3-N007's acceptance, with one
   journal event per edge of the kind P3-N007 adds. This plan's edges
   are not G4's preparation-moment record, which the parent
   specification assigns to the first plan accepted after P3-N007 is
   `done`. Rationale: the parent specification gives the breakdown
   transcription to the Orchestrator, with an event kind that exists
   only after P3-N007; writing those edges now would leave G4's
   breakdown-moment record without its event.
3. **A facet with nothing to state.** Default: **the line is written,
   states `none`, and links the document where a verifier confirms
   the absence.** For `risks:`, that is the Risk register. Structural
   condition (iii) then holds as written, and the answer is reached at
   the entry, in two steps. Rationale: no Risk register entry names
   `RU-016` or `plan-register-grammar` at planning, so the case is
   real; P3-N002 decision 9 fixed the definitions and no child changes
   them, and this reads condition (iii) literally. The alternative, a
   missing line counted as meeting (iii), drops a facet and fails A2.

## Backlog additions

- **No rule says whether a child carried at criteria depth needs its
  own plan or specify task.** Found planning P3-N006. RU-020 covers
  only the `break down` task. Earlier children entered `execute` on
  their parent's specification, and P3-N006 was dispatched a `plan`
  task. Decision 1 settles this node. The general rule is P1-N016's,
  or a ruling captured from decision 1.
- **Risk register and Ruling register entries carry no anchors.** A
  `risks:` link, or a link to a ruling, lands at the top of the
  document. The bound holds only because scrolling is not a step. The
  web view will want entry-level targets (P2-N003). Found planning
  P3-N006.

## References

- [p3-n002-comprehension-model](../specs/p3-n002-comprehension-model.md):
  the parent specification, *Child A*, *The navigation bound*, G6,
  *Edges stated at this breakdown*, decisions 9 to 15 and the gate
  record of 2026-10-29
- [p3-n002-comprehension-model](p3-n002-comprehension-model.md): the
  parent plan, its sketch entry and its decisions 1 to 8
- [plan-model](../process/plan-model.md): the node lifecycle and the
  thin-slice guidance
- [dispatch](../process/dispatch.md): owner-decision economics
- [profiles](../process/profiles.md): the C1 depth and self-verification
- [p1-n014-role-contracts-adopt-v140-rules](p1-n014-role-contracts-adopt-v140-rules.md):
  the Backlog header overlap
- [Ruling register](../rulings.md): RU-005, RU-010, RU-012, RU-016,
  RU-018, RU-019, RU-020, RU-021
- Methodology at v1.6.0:
  [K-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
  (the Backlog is the single source of progress truth),
  [K-007](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-007--plans-are-outcome-named-statused-and-ruthlessly-current)
  (plans are outcome-named, statused, and ruthlessly current),
  [W-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)
  (documentation moves in the same commit as the work),
  [W-006](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-006--names-follow-outcomes-branches-are-single-use)
  (names follow outcomes; branches are single-use), and Article 4
  (applicability, then precedence)
