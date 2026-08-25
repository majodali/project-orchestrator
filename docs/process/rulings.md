# The Ruling register — learning from gate decisions

Part of the [orchestration process specification](README.md).
Owner direction, 2026-08-25: many gate questions are healthy early in
a project; the waste is re-asking them. Rather than pre-classifying
every decision path correctly, decisions are classified as they
occur, staged questions are reviewed against project history, and
recurring patterns are promoted — the methodology's own
earn-your-keep amendment mechanism
([Article 6](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-6--inclusion-every-rule-earns-its-keep),
[Article 8](https://github.com/majodali/methodology/blob/v1.3.0/docs/constitution.md#article-8--amendments-versions-and-migration)),
applied one level down.

**Custom-definition mechanics.** As with the other orchestration
types: defined by citation to this document; instance
`docs/rulings.md` in the managed project; the Orchestrator is the
single writer.

## Classification

Every ruling carries a **type** and a **scope**:

- **Type** (initial taxonomy; extending it is a spec change):
  `handoff` (delivery channels, branches, PRs) · `tier` (model and
  tier designations) · `completion` (what done means for a node
  class) · `scope` (boundaries, cross-repo reach) · `verification`
  (depth and form of criteria) · `comms` (reporting and formats).
- **Scope**: `node` (this node only — rarely worth recording) ·
  `project` · `process` (would apply to any managed project — spec
  territory by definition).

## Entry shape

Append-only; supersede, never edit:

```
- RU-003 [active] tier/project — May the Planner's argued tier raise
  be adopted without a gate question? Ruling: yes, within advanced.
  Rationale: bounded downside, logged anyway. Source: N008 gate,
  2026-08-25. Applied: T007, T012.
```

Status: `active` · `superseded by RU-<n>, because <reason>`.

## The lifecycle

- **Capture.** At every gate crossing, the Orchestrator records each
  adopted or overridden decision as a ruling — overrides especially,
  since they carry the owner's actual preference. Node-scope
  one-offs MAY be skipped; anything plausibly recurring is recorded.
- **Apply.** Before a decision is staged to a gate, the Orchestrator
  checks the register for an **exact-match** active ruling: same
  type, covering scope, materially identical circumstances. If
  judging "materially identical" requires judgment, it is not an
  exact match — then the Planner instead cites the precedent as its
  default's rationale, and the decision still goes to the gate.
  An exact match decides silently: `precedent-applied` journal
  event, the ruling's Applied list extended, and one line in the
  gate summary (`Precedents: RU-003 applied to T012`) — visibility
  at zero decision cost.
- **Guardrails.** Precedents decide gate-class matters only — never
  the immediate class (scope expansion, W-002, deviations, budget).
  The owner may reopen any ruling at any time ("revisit RU-003");
  reopening supersedes, never deletes.
- **Promote.** A project-scope ruling applied three times, and every
  process-scope ruling on capture, is flagged for the next
  design/maintenance pass on the spec repo: candidate for promotion
  into this spec as a default or rule (owner-reviewed, like any spec
  change). Convergent rulings across managed projects are
  standardization candidates exactly as Article 7 treats convergent
  custom definitions; a pattern that crosses the methodology
  boundary becomes an amendment proposal (Article 8). Rulings never
  applied within the project's review horizon are flagged for
  supersession — anti-languish, miniaturized.
