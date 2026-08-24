# Orchestrator v1 — process spec, roles, and plugin

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. Chunk boundaries are set by the human
     owner (W-001); the boundaries below are proposed for that review. -->

Outcome under development: a runtime-agnostic orchestration process
specification and the Claude Code plugin implementing it, exercised on
one real portfolio project, so that role-based agent sessions carry out
methodology-compliant development at minimum model and context cost.

## Standing constraints

These bind every chunk; the spec and plugin are designed inside them.

1. **Methodology compliance.** This project and every project it
   orchestrates comply with majodali/methodology at their pinned
   versions (this repo: v1.2.0). The orchestrator's roles are
   refinements of the methodology's roles (Human owner · Agent ·
   Reviewer · Auditor); where refinement exposes a gap, the fix is an
   amendment proposal upstream, never a silent local divergence.
2. **Subscription billing only.** All agent execution runs on surfaces
   billed to the owner's Claude Max subscription — Claude Code
   interactive sessions, Claude Code cloud sessions, and their
   scheduled Routines. Surfaces billed on API credits (direct API
   calls, Managed Agents) are out of scope for v1. Consequence: cost
   tracking is coarse (per-session/per-task token and model records),
   accepted for v1.
3. **Documentation is the spec.** The process specification under
   `docs/` is authoritative; the plugin is a built artifact
   (Constitution Article 3). The spec is written runtime-agnostic so
   the execution surface can change without changing the process.
4. **`mtool` is upstream.** methodology-tools defines audit mechanics;
   the Auditor role complies with whatever `mtool` determines and is
   extended as `mtool` grows new modes and result kinds.
5. **Judgment routing.** The orchestrating agent makes low-judgment
   decisions only — reading the project's plan register and the
   process spec and dispatching accordingly. Every high-judgment
   decision (design, scoping, conflict resolution, anything the spec
   does not mechanically decide) is delegated to a role on a more
   advanced model, or to the human owner where the methodology gates
   it (W-001). Agents managing agents is fine; strict state-machine
   behavior is not required.
6. **Human gates.** In v1 every chunk-level gate is a human gate.
   Risk-triggered gating (review only when a risk or condition fires,
   work continuing while results are reviewed in parallel) is a later
   evolution that will require methodology amendment; v1 lays the
   recording groundwork but does not implement it.

## Design sketch

To be elaborated by chunks 2–4; recorded here as current intent.

- **Hierarchical project plans.** Managed projects keep a
  hierarchical plan — V-model in spirit: each node at each level has
  its own lifecycle (plan → specify → break down → execute → verify),
  with iterative (top-down) and incremental (left-to-right, ideally
  monotonic) progression. The orchestrator maintains a project-local
  **plan register** recording the hierarchy and each node's current
  stage, and makes its dispatch decisions from that register plus the
  process spec.
- **Process profiles by classification.** Which roles, gates, and
  artifacts a project uses depends on its declared Classification
  (C-tier above all), with bounded per-project customization —
  mirroring how the methodology's own rule applicability works.
- **Roles.** Starting set, to be settled in chunk 3 — all refinements
  of the methodology's Agent/Reviewer/Auditor, with the Human owner
  unchanged: **Orchestrator** (cheap model; dispatch, register upkeep,
  context-packet assembly), **Planner** (advanced model; plans, design
  notes, breakdowns), **Implementer** (mid-tier; node execution),
  **Reviewer** (advanced model; agent review pass incl. traceability
  links), **Auditor** (delegates to `mtool`). Roles map to model
  *tiers* in one place in the spec, never to hardcoded model IDs
  scattered through it.
- **Handoffs and context packets.** Each role invocation receives a
  defined context packet — Binding block, Classification, the plan
  node in question, and the specific documents its role and node stage
  require — rather than a whole repository. The methodology's document
  shape (K-001/K-003/K-007) is what makes these packets mechanically
  assemblable, and small.
- **Cost recording (coarse).** Every dispatched task records model,
  role, and session token usage against its plan node, in a
  project-local cost log. Reporting aggregates per node, per role, and
  per model tier. Continual-improvement analysis comes later; v1 only
  ensures the data exists from the first orchestrated task.

## Chunks

### Chunk 1 — Bootstrap and founding plan

This repository's methodology scaffolding (README, Classification
pinned 1.2.0, Binding block, Backlog) and this plan.
Gate: owner reviews the plan, adjusts and confirms chunk boundaries;
plan goes `active`.

### Chunk 2 — Process specification v1

`docs/process/`: the node lifecycle; the plan-register document type
(defined as an Article 7 custom definition in the Classification, as
the standardization candidate it is); process profiles by C-tier;
handoff contracts and context-packet definitions; the cost-log
convention. Resolves open questions 1–2 below.
Gate: owner reviews the spec documents.

### Chunk 3 — Role definitions v1

The role set as spec documents: responsibilities, judgment level,
model-tier mapping, per-role context packets, per-project
customization bounds, and the Auditor's `mtool` compliance contract.
Any methodology amendment proposals this surfaces are drafted here.
Gate: owner reviews roles and any amendment proposals.

### Chunk 4 — Plugin v1

The Claude Code plugin implementing the spec: role agent definitions,
process skills, and the Orchestrator agent maintaining the plan
register. Trialed self-hosted — orchestrating this repository's own
remaining work.
Gate: owner observes a self-hosted orchestration demo.

### Chunk 5 — Pilot on a real project

Run the orchestrator end to end on one portfolio project chosen by the
owner (an implicit-C0 or C1 project first). Record costs and lessons;
propose upstream amendments arising from practice.
Gate: owner reviews pilot results and the lessons record.

### Chunk 6 — Cost reporting v1 and close-out

Aggregate reporting over the cost logs (per node, role, tier);
retrospective against the two goals; Backlog groomed for v2 themes
(risk-triggered gating, parallel reviews, C2+ promotion of this repo,
portfolio-level orchestration). Plan closed out.
Gate: owner review; plan → closed.

## Open design questions

1. **Plan register vs. Backlog (K-003).** The methodology defines the
   Backlog as the single linear source of progress truth; the
   hierarchical plan register must not silently claim that role.
   Candidate resolution, to be settled in chunk 2: the plan register
   is a per-project custom document type holding structure and node
   stages; the Backlog stays authoritative for what-is-done/what-is-
   next, its entries referencing plan nodes (stage designations via a
   declared Workflow where applicable). If the custom type proves
   convergent across projects, propose standardization by amendment.
2. **Home of cross-project orchestration state.** Project-local
   registers cover single-project work; what (if anything) the
   orchestrator keeps at portfolio level — and its relationship to the
   methodology's Portfolio register and open multi-repo-projects
   Backlog item — is deliberately deferred; v1 orchestrates one
   project at a time.
3. **Trigger surfaces.** Which events may start orchestrator work
   without a human in the loop (Routines on a schedule, PR-activity
   events), and what the orchestrator may do unbidden in v1 — current
   intent: dispatch within an owner-approved chunk only.

## References

- [majodali/methodology](https://github.com/majodali/methodology)
  v1.2.0 — Constitution, vocabulary, rule corpus
- [methodology-tools](https://github.com/majodali/methodology-tools)
  — `mtool` (upstream audit tooling)
- [docs/classification.md](../classification.md) — this repo's
  binding declaration
