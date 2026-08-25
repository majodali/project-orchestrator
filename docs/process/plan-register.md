# The Plan register — document type

Part of the [orchestration process specification](README.md).
Defines the register that records a managed project's plan hierarchy
and node stages ([plan-model.md](plan-model.md)).

**Custom-definition mechanics.** Per methodology
[Article 7](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)'s
definition-by-citation form (v1.3.0), each managed project defines
*Plan register* **by citation**: the Custom definitions section of its
own Classification records a reference to this document, which remains
authoritative for the type's content, and the register instance links
that definition. The per-project definition is one line plus the
citation. Convergent citations across projects remain standardization
candidates by amendment, like any other convergent definitions.

## Location and shape

One file, `docs/plan-register.md`, holding one tree per active plan
document. It is a Register in the methodology's sense: uniformly
shaped entries, append-oriented, reasoning elsewhere. One line per
node:

```
- P1-N007 [specified] Parser error recovery — spec: docs/specs/parser-error-recovery.md
  - P1-N012 [executing] Recovery for unclosed blocks
  - P1-N013 [identified] Recovery for bad operators
```

Entry anatomy, in order:

- **Node ID** — `<plan>-N<seq>`: a plan-scoped prefix (e.g. `P1`,
  matching the plan document it descends from) and a sequence number
  issued in creation order, zero-padded only if the project prefers
  it. IDs are stable forever: never renumbered, never reused, moves
  and reordering change list position only (methodology Article 10's
  stable-naming principle applied to entries).
- **Stage designation** — exactly one, in brackets, from the
  [node lifecycle](plan-model.md).
- **Hold marker** (optional) — a second bracket after the stage,
  `[gated: <which gate>]` or `[blocked: <reason>]`, making a
  non-terminal node's hold state explicit in the register itself so
  the liveness invariant ([auditing.md](auditing.md)) reads from
  declared state, not inference. The Orchestrator sets and clears
  hold markers at the events that cause them (trial-1 finding: a
  node holding at a human gate had no representation, so the checker
  could only see it as falsely in-flight).
- **Name** — outcome-named, boring, greppable (W-006).
- **Links** — after an em dash, as `label: target` pairs: the node's
  specification or plan document once one exists; other links only
  where they earn their keep. Backlog entries point at node IDs, not
  the reverse — the register stays one line per node.

Hierarchy is expressed by list nesting; sibling order is dependency
order (the incremental left-to-right order). Nodes never hold prose:
anything beyond one line belongs in the node's plan or specification
document, or in the Backlog.

## Maintenance rules

- The **Orchestrator role is the register's single writer**. Other
  roles propose register changes in their task results
  ([dispatch.md](dispatch.md)); the Orchestrator records them. This
  keeps concurrent role sessions from racing on the file.
- A stage change is recorded in its own commit (with the synced
  Backlog stage designation, where a Workflow is declared) at task
  acceptance — distinct from the role's work commit, which carries
  the work and its same-commit documentation (W-003).
- The register MUST be current before any dispatch decision is made
  from it: dispatching from a stale register is the orchestration
  equivalent of misdeclaration.
- Completed trees are pruned when their plan document closes out: the
  subtree collapses to the root node line marked `done`, pointing at
  the closed plan and the Backlog's completed entries, which are the
  durable record.
