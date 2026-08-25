# Auditing the orchestration artifacts

Part of the [orchestration process specification](README.md).
How the Plan register, the Cost log, and their consistency with the
Backlog are kept honest — following the methodology's form/semantic
split
([Article 9](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-9--audits))
and delivering findings through its audit process. Owner-approved
direction, 2026-08-24.

## Form checks — a tool, never an agent

Deterministic invariants are checked by machine: agents are the
expensive, fallible option for checks a script performs perfectly,
and these run on every changed day. The v1 invariant list:

- **Plan register**: every node line carries exactly one stage, drawn
  from the [lifecycle](plan-model.md) (or the project's declared
  Workflow extension); node IDs are unique, well-formed, and never
  reused; nesting and sibling order are well-formed; no stage
  precedes its entry conditions structurally (e.g. `executing` under
  a parent never `specified`).
- **Register ↔ Backlog**: every node past `identified` and not
  executed immediately has a Backlog entry referencing it; where a
  Workflow is declared, Backlog stage designations match register
  stages.
- **Cost log**: one well-formed row per accepted task; task IDs
  unique and sequential; every accepted stage change has its row.
- **Definitions**: register and log instances link their custom
  definitions (Article 7).
- **Liveness**: every non-terminal node is exactly one of actionable,
  in-flight (an open dispatched task in the journal), blocked (a
  `[blocked: reason]` hold marker), or gated (a `[gated: ...]` hold
  marker) — orphan states are findings ([Risk R3](../open-risks.md)),
  and all four arms are checkable from declared state
  ([plan-register.md](plan-register.md) hold markers; trial-1
  finding 1 closed the gated arm's representation gap).
- **Journal cross-check**: every register stage change has its
  [run-journal](observability.md) event, every Cost log row its
  `accepted` event; a journal telling less than the registers is a
  finding.

**The checker ships with this project** as a built artifact of plan
chunk 4: the spec lives here, so the machinery mechanizing it lives
here, derivative of these documents (Article 3 — where checker and
spec disagree, the spec is right and the checker has a bug).

It runs at two frequencies:

- **The Orchestrator runs it at every dispatch and every
  acceptance** — this is what makes the
  [Plan register's currency MUST](plan-register.md) enforced rather
  than aspirational: a check failure blocks dispatch until repaired.
- **The Auditor runs it on every changed day**, alongside
  `mtool audit form`, and its findings are delivered per the
  methodology's audit process, like any other findings.

## The `mtool` extension point — intended end-state

`mtool` is upstream and updates rarely; it must not carry
orchestrator-specific format knowledge. The intended end-state is one
generic upstream capability: a custom type defined by citation may
declare a checker with the defining project, and `mtool audit form`
discovers the checker via the citation, runs it, and merges its
findings into the standard audit and delivery pipeline. That single
feature serves every future family-defined type, not only ours. It
will be proposed to methodology-tools once the checker has proven
itself here (Backlog item, after plugin v1). Until it lands, the
Auditor's side-by-side run above is the transitional discharge of the
duty, and the Backlog item is its record.

## Semantic checks — agent tasks

Judgment stays with agents. Whether a node's specification actually
supports its verification criteria; whether stage designations are
honest about the state of the work; whether a non-monotonic change
was truly [planned](plan-model.md) or is an unplanned learning being
waved through — these are Auditor role tasks, run sparse by design:
at gates, and on the owner's request. They are the orchestration
analogue of the methodology's semantic audits and follow the same
discipline: human adjudication where the methodology requires it,
findings recorded, never silently absorbed.
