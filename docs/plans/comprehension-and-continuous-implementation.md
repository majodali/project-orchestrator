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
formally typed domain-specific modelling. Before that, Allegro's own
development benefits from this project's breakdown and orchestration.
So the near-term priority is the capabilities that make this project
useful to Allegro development *now*.

Two capabilities are named, and they are one idea seen from two ends.

**Project comprehension** — a hierarchical model of a project's
features and components, carrying development status, dependencies,
risks and specifications.

**Continuous implementation, interrupted** — implementation runs on
rather than stopping after each small pre-planned chunk, and is
interrupted when a risk, a change, or a learning demands it.

The link: implementation may continue *while the expected
specifications are met and no risk emerges*. That condition is only
computable if something holds the specifications and the risks in a
form a loop can check. The comprehension model is that something.
**Comprehension is not a reporting feature; it is the precondition for
continuous implementation.**

## What this project already has, and what it does not

Worth stating plainly, because the gap defines the work.

It has a **work** hierarchy — the Plan register's nodes and their
lifecycle stages — plus a Backlog (progress truth, K-003), a Risk
register, a Ruling register, a Cost log and a run journal. It has a
service that reads and writes the register with git authoritative, and
a form checker that enforces the grammar.

It does **not** have a **product** model. The register describes work
to be done, not the features and components the work produces. Nothing
in the repository answers "what does this system consist of, and what
state is each part in". Today a specification lives in a per-node
document that closes when the node closes, so the system's description
disappears into completed work.

Three smaller gaps already tracked in the Backlog become load-bearing
here rather than nice-to-have:

- **Dependencies between nodes cannot be stated.** Sibling order is
  dependency order by convention only. A loop that decides what may
  continue needs real edges.
- **Risks are a flat register.** R1–R17 are not attached to the nodes
  or components they threaten, so "has a risk emerged *here*" is not a
  question the record can answer.
- **Verification criteria are prose.** A gate assembly reads them and
  a human judges. "Expected specifications are met" needs criteria a
  loop can evaluate without a person.

## Proposed shape

Three chunks, in dependency order. Chunk 1 is the precondition for
chunk 2; chunk 3 is what makes either useful to a second project.

### Chunk 1 — The comprehension model

A second hierarchy, cross-linked to the work hierarchy rather than
replacing it: **components and features**, each carrying its state,
its specification, the risks attached to it, and its dependencies on
other elements. Git-authoritative and human-readable, like the
register — the service projects it, never owns it.

Open design questions, all real:

- One document or many? The register is a single file and that is why
  it can be parsed cheaply and diffed meaningfully. A product model
  may not fit that shape.
- How do product elements and work nodes reference each other without
  either becoming the other's master?
- What happens to a specification when its node closes? The likely
  answer is that specifications migrate from node documents to
  component documents, which changes what a node's specify stage
  produces.

### Chunk 2 — Continuous implementation

Invert the default. Today the loop stops at gates and the owner's
attention is spent there. The new default: implementation continues
while its conditions hold, and **interrupts** when they do not.

The interrupt conditions are the existing *immediate class* —
approved-scope expansion, changes to existing test conditions,
deviations from the spec or methodology, budget overrun — plus the two
this capability adds: **a specification the work no longer meets**, and
**a risk that has emerged**. The dispatch spec already has the
vocabulary; what it lacks is a machine-checkable form of the first two
conditions.

This chunk is where the honest risk sits. Continuous implementation
removes the review points that have caught most of this project's
defects so far. Every serious defect this project found — the ESM
bundle, the reserved word, the `$LATEST` alias, the IAM audience typo —
surfaced because something ran and a human looked. A loop that
continues while its own checks pass will continue through anything its
checks do not cover. **The chunk's real content is the checks, not the
continuation.**

### Chunk 3 — Serving a second project

Everything above is exercised on this repository, which is a
component library with one contributor. Allegro is a different shape.
This chunk makes the capability usable from outside: the model is
produced for a project that is not this one, and the loop runs against
it.

Whether this is a chunk or the pilot that P1-N006 already names is an
open question — see below.

## What this does to the existing plan

Not a rewrite. The founding plan's chunks 5 and 6 (pilot, cost
reporting and close-out) are unstarted and may be partly subsumed:
P1-N006 is "pilot on a real project", and Allegro is now a real
project with a reason to be the pilot. The likeliest outcome is that
P1-N006 becomes this work's chunk 3 rather than a separate exercise.

Chunk 2 of the service (P2-N003, owner questions and the plan view) is
the natural surface for a comprehension model, and may need
re-specifying against it rather than proceeding as planned.

## Open questions — the ones that need Allegro read first

This sketch was written **without access to the Allegro repository**.
The session could not read it: no `add_repo` tool was available, so
`majodali/allegro` could not be brought into scope. Everything above
follows from the two capabilities as described and from this project's
own state. The following cannot be settled without reading Allegro,
and each could change the shape above:

1. **What does Allegro's development actually need first?** The two
   capabilities were named as beneficial; which is blocking is not
   established.
2. **Does Allegro already have a product model?** If its typed
   domain-specific modelling already expresses components and
   features, chunk 1 may be a translation rather than an invention —
   and this project may be the wrong place to define the schema.
3. **What is Allegro's current state and cadence?** Continuous
   implementation is worth more on a project with a long runway of
   well-understood work than on one still finding its shape.
4. **Which direction is more urgent?** This project helping Allegro,
   or Allegro's modelling informing chunk 1's schema so the eventual
   re-implementation is not a rewrite.

## References

- [Orchestrator v1](orchestrator-v1.md) — the founding plan and its
  standing constraints, which bind this work too
- [Orchestration service](orchestration-service.md) — constraint 3,
  degrade to git-only, which any new model must also honour
- [Backlog](../backlog.md) — the dependency mechanism, the risk
  attachment gap, and P1-N006's pilot
- [Risk register](../open-risks.md)
