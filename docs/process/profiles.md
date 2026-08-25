# Process profiles by C-tier

Part of the [orchestration process specification](README.md).
Which parts of the process apply to a managed project is decided by
its declared Classification — above all its C-tier — mirroring how
methodology rule applicability works
([Article 4](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-4--applicability-then-precedence)):
mechanically, from the declaration, with bounded per-project
customization recorded in the project's Classification.

A profile never subtracts from the methodology: whatever the
project's compliance target requires holds regardless of what the
profile says. Profiles only decide how much orchestration process
runs on top.

## Profile table

| Aspect | C0 | C1 | C2 | C3 |
|---|---|---|---|---|
| Plan register | optional; single-level tree if used | required | required | required |
| Specification depth | none required | criteria list per node (one-liners suffice) | specification document per non-trivial node, criteria before execution | as C2 |
| Breakdown | not required | required above single-session size | required above single-session size | as C2 |
| Verification | tests where they exist | self-verification against criteria; Reviewer at owner request | Reviewer pass required at `verifying`, incl. mechanical traceability-link resolution (Article 9) | as C2, plus profile extensions for live stages |
| Registers maintained by roles | Backlog | Backlog | + Decision register, design notes (K-004, K-006) | + hosted views currency (K-009) |
| Human gates | kickoff only | chunk gates (owner-designated nodes) | chunk gates + `verifying` of root-level nodes | as C2 |
| Cost log | optional | required | required | required |

Notes:

- **C0** is deliberately thin: the methodology puts only the
  exploration baseline in play there, and orchestrating exploration
  adds ceremony exploration doesn't need. Enrolling a C0 project is
  possible but expected to be rare; the profile exists so a pilot can
  start small.
- **C1** is the v1 center of gravity: full loop, light
  specifications, human review by exception.
- **C2/C3 rows are provisional** until this repo's own promotion
  (Classification note): v1 does not orchestrate C2+ projects, per
  the owner's ruling recorded at bootstrap. The rows state current
  intent so the design is checked against them early.

## Customization

A managed project MAY tighten any cell (more specification, more
gates) by recording the customization alongside its Plan-register
custom definition in the Classification. Loosening a cell is a
deviation from this spec: recorded the same way, with rationale, and
flagged in orchestration summaries the way audits call out
deviations. Either way the declaration is in the Classification —
orchestration behavior is never configured from memory, chat, or
`.claude/` content.

## Role assignment by stage

The profile decides which role serves each stage; the default map —
plan/specify → Planner · break down → Planner · execute →
Implementer · verify → Reviewer (self-verification by Implementer at
C1) · register upkeep and dispatch → Orchestrator · audits → Auditor
— is stated here and elaborated in [roles.md](roles.md), including
the model-tier mapping, which lives there in one place.
