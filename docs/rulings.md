# Ruling register

Instance of the *Ruling register* type, defined by citation in the
[Classification](classification.md)
([type spec](process/rulings.md)). Single writer: the Orchestrator.
Gate decisions captured as precedents; exact matches decide staged
questions silently; recurring patterns promote into the process
spec. First entries land at the pending P1-N008 gate.

- RU-001 [active] completion/node — Execute a proposal draft before
  its evidencing node closes? Ruling: yes. Rationale: the evidence
  already exists; holding just delays ratified wording. Source:
  P1-N008 gate (decision 1, default adopted), 2026-08-26. Applied: —
- RU-002 [active] handoff/process — How does upstream-bound output
  reach a repo outside granted scope? Ruling: the owner hand-carries
  it; cross-repo scope is granted only explicitly. Rationale: no
  scope expansion for a delivery a human can make. Source: P1-N008
  gate (decision 2, default adopted), 2026-08-26. Applied: —
- RU-003 [active] completion/process — Does a node targeting an
  external party complete at the artifact or at upstream
  disposition? Ruling: at the artifact. Rationale: external
  acceptance is not ours to verify. Source: P1-N008 gate
  (decision 3, default adopted), 2026-08-26. Applied: —
- RU-004 [active] completion/node — Full reference implementation or
  conformance sketch for the extension-point proposal? Ruling:
  sketch only. Rationale: the contract is still under discussion.
  Source: P1-N008 gate (decision 4, default adopted), 2026-08-26.
  Applied: —
- RU-005 [active] verification/project — Are proposal-class nodes
  owner-gated, and where? Ruling: yes, gate at `verifying`.
  Rationale: the owner sees the artifact before it represents the
  project. Source: P1-N008 gate (decision 5, default adopted),
  2026-08-26. Applied: —

Promotion flags: RU-002 and RU-003 are process-scope — flagged for
the next design pass on this spec (rulings.md promotion rule).
