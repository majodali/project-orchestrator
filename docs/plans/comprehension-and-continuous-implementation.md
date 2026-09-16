# Project comprehension and continuous implementation

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is a **sketch**: it is the
     plan document for a proposed third top-level node, written before
     its driving project could be read. It goes `active` only after the
     open questions in the last section are answered. -->

A proposed third top-level node, alongside
[Orchestrator v1](orchestrator-v1.md) (P1-N001) and the
[Orchestration service](orchestration-service.md) (P2-N001).

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

Components exist. Features exist. Status exists. Dependencies exist in
two incompatible forms — declared (the layer spine) and observed (lane
co-change). Nothing joins them. That is the gap, and it is a more
useful starting point than a blank page: **the model's job is to make
one queryable thing out of five documents that already work.**

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

## Proposed shape

Four chunks. The order is a dependency order, not a priority order.

### Chunk 1 — The comprehension model

A product model cross-linked to the work hierarchy: components and
features, each carrying state, specification, attached risks, and
dependencies. Git-authoritative and human-readable, like the register.

Allegro's five documents are the worked example to design against, and
its lane experience sets the hardest requirement: **the model must
carry both declared and observed dependencies, and must not pretend
they are the same.** Allegro's layer spine says what may depend on
what; its co-change measurement says what actually moves together. The
second is what decides whether two items can run concurrently, and it
is derived from git history rather than declared by anyone.

Open design questions: one document or many; how product elements and
work nodes reference each other without either becoming the other's
master; and what happens to a specification when its node closes.

### Chunk 2 — Run W-001's sequence mode

Make the dispatch loop able to run a pre-ratified sequence, and stop
on W-001's four conditions. Concretely, the loop needs: a sequence the
owner ratifies once; the ability to continue across chunk boundaries
without returning; and detection of the four stops — a failed check, a
scope change, a chunk needing a decision, and **a chunk whose summary
carries asks**.

That fourth condition is the one this project is best placed to
enforce mechanically, because it already writes every task result in
W-008's three-part shape, where **asks is a named section**. A
sequence that must stop when a chunk produces asks can read that
section rather than judging prose. The rule and the report format fit
together, and neither was designed for the other.

Per-workstream gate policy comes with it: the owner's first mitigation
is that cautious work is interrupted more often, not that it stops
forever, and each project controls the rate. Allegro already runs
exactly this — three lanes pre-ratified, lane D per-chunk.

### Chunk 3 — Reversibility

The owner's second mitigation, and the one nothing currently provides:
all work within an active workstream must be **easy to reverse and
redo**. If a problem surfaces several steps later, correcting it must
not be painful.

This is what makes the economics work. The argument for longer
sequences is that rework by an assistant is cheaper than continual
human review — but only if rework is actually cheap. Neither this
project nor Allegro has anything systematic here beyond git and small
commits.

And the argument is **measurable**, which is unusual and worth using.
This project logs cost per task. A sequence that produces rework can be
compared against the reviews it displaced. If the trade is not paying,
the Cost log says so rather than an opinion doing it. If patterns of
rework recur, those are learnings that improve planning — the owner's
own framing, and it needs the data to work.

### Chunk 4 — Dependencies, and work that continues elsewhere

The owner's third mitigation: when one node is blocked, work continues
on nodes that do not depend on it. This needs the dependency mechanism
already in the Backlog, plus the lane-assignment question Allegro
answers empirically. Whether lanes are declared, derived from
co-change, or both is an open question this project should answer
*from Allegro's data*, since Allegro has forty commits of it and this
project has one contributor and no such history.

## The risk this introduces, and what answers it

Continuous implementation removes review points, and this project's
serious defects — the ESM bundle, the reserved word, the `$LATEST`
alias, the IAM audience typo — each surfaced because something ran and
a human looked. A loop that continues while its own checks pass will
continue through anything its checks do not cover.

Three mitigations, owner-stated 2026-09-16, and each has a home above:

1. **Interrupted less often, not never**, at a rate each project
   controls — chunk 2's per-workstream gate policy.
2. **Easy to reverse and redo**, so that rework after several
   intervening steps is cheap — chunk 3, which is why it is a chunk
   and not a footnote.
3. **Dependencies let blocked work stop without stopping everything**
   — chunk 4.

Two further observations, since the risk is real and the mitigations
should be held to it. Allegro's W-001 sequences stop on **asks**, which
means a chunk cannot silently accumulate questions — that is a
stronger guard than it looks, and chunk 2 should implement it
faithfully rather than approximately. And nothing above protects
against a check that cannot fail in the environment the code runs in,
which is the shape of every defect listed above; that is a
verification-design problem this plan does not solve and should not
claim to.

## What this does to the existing plan

- **P1-N006 (pilot on a real project)** — Allegro is the pilot, and
  this work is how it happens. The node is subject to change.
- **P2-N003 (owner questions and the plan view)** — the natural
  surface for a comprehension model; likely needs re-specifying
  against chunk 1 rather than proceeding as planned.

Both confirmed by the owner as subject to change, 2026-09-16.

## Open questions

The four that needed Allegro read are answered above. What remains:

1. **Where does the comprehension model live?** In this project, in
   Allegro, or as a shared unit? Allegro's five documents are its own
   and work; a model that requires Allegro to restructure them is a
   worse trade than one that reads them.
2. **Does this need a methodology amendment?** W-001 exists, so the
   sequence mode does not. A comprehension model as a register class
   might.
3. **Is chunk 4 separable from chunk 1?** Dependencies are part of the
   model, so the chunks may be one.

## References

- [Orchestrator v1](orchestrator-v1.md) — the founding plan and its
  standing constraints
- [Orchestration service](orchestration-service.md) — constraint 3,
  degrade to git-only, which any new model must honour
- [Backlog](../backlog.md) — the dependency mechanism, the risk
  attachment gap, P1-N006's pilot
- methodology **W-001** (two delivery modes, human-gated), released in
  v1.5.0 with Allegro as its evidencing instance
- Allegro: `docs/backlog.md` §"Parallel lanes", `docs/design/layers.md`,
  `docs/design/implementation-map.md`, `V1-INVENTORY.md`,
  `docs/plans/parallel-lanes-process-delta.md`
