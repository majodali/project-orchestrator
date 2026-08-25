# `mtool` custom-type checker extension point — proposal specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document for
     node P1-N008; it goes `active` when the owner approves it at the
     gate, and `closed → Backlog entry` when the node reaches `done`. -->

Node **P1-N008**, specifying the outcome fixed by its
[plan](../plans/p1-n008-mtool-checker-extension-point.md). The plan
decided *what* and *why* (a transportable, decision-ready upstream
proposal; leaf; completes at the artifact). This document records the
**behavior** that satisfies it and the **verification criteria** the
work is built against — the checklist the Implementer self-verifies
against at C1 and the owner checks at the `verifying` gate (plan
decision 5).

Nothing here reopens a plan decision. Where the plan's Approach
enumerates a content element, the criteria below restate it in
checkable form and add only what a verifier needs to say yes or no.

## Behavior

When this node is `done`, the repository contains — added in **one
commit** (W-003) — two documentation changes and nothing else:

1. **`docs/proposals/mtool-custom-type-checker.md`** (new file, new
   directory): a proposal addressed to the maintainer of
   [methodology-tools](https://github.com/majodali/methodology-tools),
   arguing for one generic capability — an Article 7 custom type
   defined by citation may declare a checker with its defining
   project; `mtool audit form` resolves the citation to that
   declaration, runs the checker, and merges its findings into the
   standard audit and delivery pipeline. It is written to be read and
   acted on by someone with no knowledge of this project, in one
   sitting, and to be carried upstream unchanged.
2. **A pointer in
   [`docs/process/auditing.md`](../process/auditing.md)**, in its
   section *"The `mtool` extension point — intended end-state"*,
   naming the drafted proposal and leaving the transitional
   side-by-side arrangement in force.

The proposal is a **document, not a change to how this project
works**: no invariant, checker behavior, role contract, or
transitional arrangement changes as part of this node. `form_check.py`
is cited as evidence and sketched against the proposed contract; it is
not modified.

## Verification criteria

Each criterion is checkable by inspection of the commit unless marked
*(mechanical)*. All MUST hold.

### A. The artifact exists and is well-formed

- **A1.** `docs/proposals/mtool-custom-type-checker.md` exists and is
  the only file added under `docs/proposals/`. *(mechanical)*
- **A2.** It carries `Status: draft` with a K-007 transition-contract
  comment, matching the convention used by this repo's plan documents.
  It remains `draft` at node completion: nothing has been delivered,
  and delivery is a separate Backlog item (plan decisions 1–3).
  *(mechanical)*
- **A3.** Its title and opening paragraph state, without needing the
  rest of the document, who it is addressed to, what is being
  proposed, and what the reader is being asked to do.

### B. Content elements

- **B1. Problem statement, upstream-framed.** States the problem over
  Article 7 custom types in general — family-defined types have no
  mechanical form checking anywhere in the audit pipeline — and names
  the cost of the status quo (per-project checkers run beside the
  audit; findings outside the delivery pipeline; invariants outside
  the audit record). No orchestrator vocabulary is load-bearing in
  this section.
- **B2. The proposed capability.** Specifies, concretely enough to be
  accepted, amended, or rejected on its merits: how a defining project
  **declares** a checker alongside its type definition; how `mtool`
  **resolves** a citation to that declaration; how it **invokes** the
  checker; how the checker's findings **re-enter** the standard result
  set. Each of those four steps is identifiable as its own statement,
  not implied.
- **B3. Design questions with recommended answers.** Contains a
  section presenting **at least these five** questions, each with (i)
  the question, (ii) a recommended answer, and (iii) the trade-off
  behind it: *discovery* (declared in the defining repo vs. registered
  in the consuming project's Classification); *execution and trust*
  (running a checker fetched from another repository as a security
  surface — vendored, already-cloned-only, opt-in per project);
  *finding schema* (mapping a foreign checker's output onto `mtool`'s
  result kinds and severities); *versioning* (citations are
  version-pinned — behavior when checker and type version drift);
  *unavailability* (audit degrades with a notice vs. fails).
  *(mechanical: five subsections; by inspection: each has a
  recommendation and a trade-off)*
- **B4. Evidence.** Offers this repository's `form_check.py` as the
  worked example — which invariants it checks, what it caught in
  practice, and the trial record — with **dates and outcomes** stated,
  not asserted qualitatively.
- **B5. Evidence is honestly statused.** The evidence section states
  the standing of the record it cites (self-hosted trials to date;
  P1-N005's demo gate pending at the time of writing, if still
  pending) so the proposal never over-claims ratification it does not
  have. Wording is expected to be revised, not rebuilt, if the gate
  closes first (plan decision 1).
- **B6. Conformance sketch, not an implementation.** Shows what
  `form_check.py` would look like as a declared checker under the
  proposed contract — a declaration snippet, an entry-point signature,
  and a sample finding record suffice — explicitly labelled
  illustrative and non-runnable, and short (a screenful, not a
  module). No file under `plugin/` is modified by this node
  *(mechanical)*, and no code is added that anything in this repo
  imports or executes.
- **B7. The explicit ask.** States what the maintainer is being asked
  to decide and what this project will do under each answer —
  including under rejection and under "amended differently".

### C. Transportability and standalone readability

- **C1. No unglossed local vocabulary.** Every project-specific term
  the document uses (node, stage, Plan register, Cost log,
  Orchestrator, dispatch, orchestration form check) is either glossed
  at first use or removed. A reader who knows the methodology but not
  this project never needs to look anything up here. *(mechanical
  first pass: grep the term list; by inspection: the gloss is
  adequate)*
- **C2. References survive transport.** Every reference into this
  repository is either quoted inline or linked by absolute URL
  (version-pinned where the target is versioned, as the repo's
  methodology links are). No relative link into this repo appears in
  the artifact, because the document is meant to be pasted into an
  upstream issue or PR. *(mechanical)*
- **C3. No unverifiable upstream claims.** Every statement about
  current `mtool` behavior is sourced from this repository's own
  recorded understanding or `mtool`'s public documentation, and is
  marked as the author's understanding where it has not been verified
  against upstream source — with an invitation to correct it. (The
  node is deliberately shaped so no role reads methodology-tools; see
  E3.)
- **C4. One sitting.** The document is sized to be read and acted on
  in one sitting — as a working target, body under roughly 400 lines
  of Markdown excluding the sketch; a verifier who finds it longer
  judges whether the excess earns its keep rather than failing it
  mechanically.
- **C5. Project voice.** Written in the project's voice ("this
  project", "the orchestrator project"), not first-person-singular
  and not attributed to an agent session, so the owner can hand-carry
  it unchanged under the default delivery route (plan decision 2).

### D. The `auditing.md` pointer

- **D1.** The section *"The `mtool` extension point — intended
  end-state"* links to `docs/proposals/mtool-custom-type-checker.md`
  and says the proposal is drafted and awaiting delivery. *(partly
  mechanical: the link exists and resolves)*
- **D2.** Any sentence in that section rendered stale by the draft's
  existence (the standing "It will be proposed to methodology-tools
  once the checker has proven itself here" forward-looking claim) is
  updated so the section makes one current claim, not two competing
  ones (K-007 currency).
- **D3.** The transitional arrangement is **unchanged in substance**:
  the Auditor's side-by-side run remains the discharge of the duty
  until the upstream capability lands, and the section still says so.
  *(diff review: no other paragraph of `auditing.md` changes)*

### E. Scope and process

- **E1. Same commit.** Artifact, pointer, and Backlog update land in
  one commit (W-003). *(mechanical)*
- **E2. Backlog current.** The P1-N008 Backlog entry is checked and
  rewritten to describe what shipped, and the pre-existing follow-on
  entries (deliver upstream; adopt the capability once it lands) are
  left in place. *(mechanical)*
- **E3. No cross-repo reach.** No file outside this repository is
  read or written during execution; if the contract genuinely cannot
  be stated without reading upstream source, execution returns
  `blocked` with a scope question rather than reaching (plan,
  Dependencies).
- **E4. No local divergence.** Nothing in the commit changes this
  project's own checker, invariants, or role contracts, and the
  proposal asks upstream for a **generic** capability — it nowhere
  asks `mtool` to learn this project's formats (founding-plan
  constraint 4). *(diff review)*
- **E5. Checks clean.** `python3 plugin/scripts/form_check.py` passes
  clean, and the repo's link checking (`mtool`) reports no new broken
  links. *(mechanical)*

## How verification runs

C1 profile: self-verification by the Implementer against the list
above, with no Reviewer pass required. The plan's decision 5 adds an
**owner gate at `verifying`** — the owner is the artifact's recipient
and its hand-carrier, so his read *is* the acceptance test for
criteria B and C, which are judgment-shaped by nature. The Implementer
therefore reports A/D/E and the mechanical parts of B/C as checked,
and hands the owner a short list of what remains for his read.

## Not verified here

Upstream acceptance, amendment, or rejection; the upstream feature
itself; retirement of the transitional arrangement; adaptation of
`form_check.py` to whatever contract upstream settles on. All are out
of this node's scope by the plan's Scope boundary and decision 3, and
all are already carried as Backlog items.

## Decisions for the gate

**No new owner decision surfaced at the specify stage.** The plan's
five decisions stand as batched there, and a go-ahead adopts every
default not overridden by number.

Four questions arose while writing the criteria and were **decided as
specification content**, since each is a Planner call over how the
artifact reads rather than an owner call over scope or route. They are
listed so the owner can overturn any of them at the same gate without
a separate exchange:

- evidence is stated with its ratification status rather than
  asserted flatly (B5);
- links out of the artifact are absolute and quotable so the document
  survives being pasted upstream (C2);
- the conformance sketch is bounded to a declaration snippet, a
  signature, and a sample finding, labelled non-runnable (B6);
- the artifact speaks in the project's voice, unattributed to a
  session, so it can be hand-carried unchanged (C5).

## References

- [P1-N008 plan](../plans/p1-n008-mtool-checker-extension-point.md) —
  outcome, approach, scope boundary, and the five gate decisions
- [auditing.md](../process/auditing.md) — the transitional
  arrangement and the intended end-state section this node points into
- [profiles.md](../process/profiles.md) — C1 profile:
  criteria-list specifications, self-verification, owner-designated
  chunk gates
- [plan-model.md](../process/plan-model.md) — `specified` exit
  condition; criteria exist before the work they verify
- [orchestrator-v1](../plans/orchestrator-v1.md) — parent plan;
  standing constraints 1 and 4
