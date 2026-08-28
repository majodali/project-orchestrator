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
  P1-N008 gate (decision 1, default adopted), 2026-08-26. Applied: T004.
- RU-002 [active] handoff/process — How does upstream-bound output
  reach a repo outside granted scope? Ruling: the owner hand-carries
  it; cross-repo scope is granted only explicitly. Rationale: no
  scope expansion for a delivery a human can make. Source: P1-N008
  gate (decision 2, default adopted), 2026-08-26. Applied: —
- RU-003 [active] completion/process — Does a node targeting an
  external party complete at the artifact or at upstream
  disposition? Ruling: at the artifact. Rationale: external
  acceptance is not ours to verify. Source: P1-N008 gate
  (decision 3, default adopted), 2026-08-26. Applied: T004.
- RU-004 [active] completion/node — Full reference implementation or
  conformance sketch for the extension-point proposal? Ruling:
  sketch only. Rationale: the contract is still under discussion.
  Source: P1-N008 gate (decision 4, default adopted), 2026-08-26.
  Applied: T004.
- RU-005 [active] verification/project — Are proposal-class nodes
  owner-gated, and where? Ruling: yes, gate at `verifying`.
  Rationale: the owner sees the artifact before it represents the
  project. Source: P1-N008 gate (decision 5, default adopted),
  2026-08-26. Applied: —

- RU-006 [active] scope/process — When does a new capability get its
  own repository rather than joining an existing one? Ruling: when it
  is separately deployable, holds secrets, or would raise the host
  repo's S-level; the originating repo is then the coordinating repo.
  Rationale: the orchestration service is deployable and holds
  tokens; this repo is C1/S0 documentation and tooling. Source:
  P2-N001 gate (decision 1, default adopted), 2026-08-26. Applied: —
- RU-007 [active] scope/project — When is this repo promoted to C2?
  Ruling: when it begins orchestrating C2+ work — chunk 5 of the
  service plan, not before. Rationale: the owner's standing intent
  ties promotion to what the project actually governs. Source:
  P2-N001 gate (decision 3, default adopted), 2026-08-26. Applied: —
- RU-008 [active] stack/process — What language and runtime do new
  majodali services use? Ruling: TypeScript/Node. Rationale: common
  across current portfolio projects; the MCP SDK and Lambda support
  it first-class, and cross-repo consistency beats matching one
  repo's helper scripts. Source: P2-N002 gate (decision 4,
  **owner override** of the Python default), 2026-08-26. Applied: —
- RU-009 [active] handoff/project — How does completed work reach
  `main` in a managed project's work repo? Ruling: by pull request,
  opened by the orchestrating session; the owner reviews and merges.
  Rationale: the owner asked for one at the first such merge, and a
  PR is where the "what was and was not verified" record belongs.
  Source: owner request at the P2-N008 slice merge, 2026-08-27.
  Applied: T009.

Trial-4 note: RU-001/003/004 decided the execute dispatch silently —
the register's first live exercise, and the reason `form_check.py`
now cross-checks Applied lists against `precedent-applied` events
(the lists were not maintained on the first run).

Promotion flags: RU-002 and RU-003 are process-scope — flagged for
the next design pass on this spec (rulings.md promotion rule).
