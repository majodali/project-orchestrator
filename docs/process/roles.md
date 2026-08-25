# Roles

Part of the [orchestration process specification](README.md).
The orchestrator's roles are **refinements of the methodology's role
set** (Human owner · Agent · Reviewer · Auditor,
[vocabulary](https://github.com/majodali/methodology/blob/v1.3.0/docs/vocabulary.md#roles));
the Human owner is unchanged and holds everything the methodology
reserves to humans. No methodology amendment was needed for this
refinement: each role below stays within its parent's definition, and
the sharing mechanics ride the staged family/definition-by-citation
machinery. How roles are prompted and provisioned is plugin material
(plan chunk 4); this document fixes their contracts.

## Model tiers

The single place where tiers bind to models. Roles bind to tiers;
only this table changes as models evolve, and changing it is a spec
change, reviewed as such. The [Cost log](cost-log.md) records exact
model identifiers, so tier drift never corrupts records.

| Tier | Model (as of 2026-08-24) | Character |
|---|---|---|
| frugal | `claude-haiku-4-5` | mechanical, low-judgment, high-volume |
| standard | `claude-sonnet-5` | well-specified execution |
| advanced | `claude-opus-5` | high-judgment design and review |

The owner MAY designate a stronger model than the bound tier for a
specific task or node (e.g. the most capable model available for a
foundational design); the designation is recorded in the node's plan
and the actual model lands in the Cost log as always.

## The roles

Each role's **decides** list is exhaustive in kind: a decision not of
a listed kind is above the role's authority and returns
`needs-judgment` ([dispatch.md](dispatch.md)).

### Orchestrator

Refines *Agent (session)*. Tier: **frugal**.

- **Serves**: the dispatch loop; single writer of the Plan register
  and Cost log; context-packet assembly; form-check runs at dispatch
  and acceptance ([auditing.md](auditing.md)); gate summaries.
- **Decides**: only what [dispatch.md](dispatch.md) makes mechanical
  — actionability, selection order, packet contents per the table,
  acceptance against the handoff contract and form checks.
- **Never**: writes code or specifications, resolves ambiguity,
  reinterprets criteria, loosens scope. If classification of a
  decision as low-judgment is itself unclear, the decision is not
  low-judgment.

### Planner

Refines *Agent (working)*. Tier: **advanced**. Serves stages `plan`,
`specify`, `break down`.

- **Decides**: outcome framing; decomposition (feature-first per
  [plan-model.md](plan-model.md), recording why when it cuts
  differently); atomicity of features; specifications and
  verification criteria; leaf-or-interior; dependency order of
  children.
- **Proposes, never authorizes**: planned non-monotonicity — the
  Planner writes it into the plan with its argument; authorization
  is the owner's, at the gate that approves that plan.
- **Produces**: plan and specification documents, proposed child
  nodes, Backlog additions for everything identified and deferred.

### Implementer

Refines *Agent (working)*. Tier: **standard**. Serves stage
`execute`.

- **Decides**: implementation choices within the node's
  specification.
- **Routes**: specification ambiguity or conflict (`needs-judgment`);
  any change to existing test conditions (W-002 — to the owner,
  always); newly discovered scope (to the Backlog, then onward).
- **Produces**: work commits on a single-use, outcome-named branch
  (W-006), documentation in the same commits (W-003),
  self-verification results where the [profile](profiles.md) assigns
  it.

### Reviewer

Refines *Reviewer* (agent; adjudication stays human, per the
vocabulary). Tier: **advanced**. Serves stage `verify`.

- **Decides**: whether the node's verification criteria are met;
  review findings and their severity; mechanical resolution of
  traceability links at C2+ (Article 9); whether the diff stayed
  within the executing role's authority — in particular, an existing
  test condition changed without a planned-non-monotonicity
  pre-clearance or a recorded W-002 discussion fails verification.
- **Routes**: acceptance disputes and criteria found inadequate — a
  backward-transition proposal with reasons, or `needs-judgment` to
  the owner.
- **Produces**: a verification verdict and review record the
  Orchestrator can act on mechanically.

### Auditor

Refines *Auditor* (docs-auditor). Tier: **frugal** for form-audit
runs, **advanced** for semantic passes ([auditing.md](auditing.md)).

- **Contract**: `mtool` is upstream — the Auditor complies with
  whatever it determines, runs the orchestration form checker
  alongside it (transitional, until the extension point), and
  delivers findings per the methodology's audit process. When
  `mtool` grows new modes or result kinds, incorporating them is a
  spec update here plus a Backlog item — mostly new result kinds,
  occasionally new audit functions.
- **Decides**: nothing about the work; audits report, they do not
  fix.

## Customization per project

A managed project MAY adjust roles within bounds, declared in its
Classification alongside its custom-definition citations — never
configured from memory, chat, or `.claude/` content:

- **Tier overrides** per role or stage. Raising a tier is free to
  declare; lowering the tier of a high-judgment role (Planner,
  Reviewer, semantic Auditor) is a deviation from this spec:
  recorded with rationale and called out in orchestration summaries.
- **Role merges** the profile already anticipates (C1
  self-verification folds Reviewer's stage duty into Implementer).
- **Additional roles** enter as custom definitions citing this
  document's pattern; convergence across projects is a
  standardization signal, as ever.
