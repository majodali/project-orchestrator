# Risk register

Adopted when the pressure appeared
([methodology K-005](https://github.com/majodali/methodology/blob/v1.3.0/docs/rules/knowledge.md#k-005--companion-registers-when-pressure-appears-never-before)):
the owner's 2026-08-24 review asked how orchestration process
failures — unintended behaviors from unexpected interplay between
roles — are detected. Entries carry ID, description, mitigation, and
status; orchestration-failure entries cite the spec mechanism that
detects or contains them. This register's numbering is project-local.

- **R1 — Dispatch oscillation.** A loop between roles that never
  converges: verify↔execute ping-pong (Reviewer rejects, Implementer
  resubmits, repeat), or the same `needs-judgment` question bouncing
  repeatedly. *Mitigation*: bounded attempts
  ([dispatch.md](process/dispatch.md) failure containment) — two
  consecutive failed round-trips on one (node, stage) blocks the pair
  and escalates; loops are visible in the
  [run journal](process/observability.md) as repeated event
  sequences. *Status*: open; mitigation spec'd, checker/journal land
  in plan chunk 4.
- **R2 — Runaway fan-out.** Breakdown inflates the tree, or repeated
  backward transitions cycle a subtree, consuming budget without
  converging. *Mitigation*: approved scope is the hard boundary; the
  owner MAY attach a task or token budget to a scope grant
  (dispatch.md gates), and exhaustion stops the loop; per-node
  backward-transition counts are journal-visible. *Status*: open;
  mitigation spec'd.
- **R3 — Orphaned work.** A node neither progressing nor visibly
  stuck — a `needs-judgment` answered in chat but never recorded, a
  blocked node silently forgotten. *Mitigation*: the liveness
  invariant ([auditing.md](process/auditing.md)) — every non-terminal
  node is actionable, in-flight, blocked-with-reason, or gated;
  gate/stop summaries enumerate all of them (dispatch.md, no silent
  drops). *Status*: open; mitigation spec'd.
- **R4 — Role overreach.** A role decides above its authority without
  routing: an Implementer alters a test condition, a Planner
  self-authorizes non-monotonicity, an Orchestrator "fixes" content.
  *Mitigation*: exhaustive decides-lists
  ([roles.md](process/roles.md)); the Reviewer's authority check on
  the diff at verify (unauthorized test-condition changes fail
  verification); semantic audits spot-check judgment classification.
  *Status*: open; mitigation spec'd.
- **R5 — Register/reality divergence.** A session dies mid-task or a
  register goes stale, and dispatch decisions run on fiction.
  *Mitigation*: form checks before every dispatch and acceptance;
  tasks unresolved at session end are recorded `stale` in the journal
  and redispatched only after a fresh check (dispatch.md). *Status*:
  open; mitigation spec'd.
- **R6 — Packet-insufficiency spiral.** Context packets routinely too
  small; roles wander the repository, costing tokens and risking
  stale reads. *Mitigation*: widenings are recorded (Cost log notes;
  `packet-widened` journal events); recurrence is a spec defect in
  the packet table, reviewed as such (dispatch.md). *Status*: open;
  mitigation spec'd.
- **R7 — Billing misroute.** An execution environment with
  `ANTHROPIC_API_KEY` set silently bills API credits despite the
  subscription. *Mitigation*: the environment MUST-check (founding
  plan, standing constraint 2), implemented as a session-start check
  in the plugin (chunk 4). *Status*: open; check pending plugin.
- **R8 — Compounding bad plan.** A flawed breakdown propagates
  through a subtree before ascent-side verification catches it.
  *Mitigation*: iterative descent verifies parents against their own
  criteria on ascent; broad breakdowns SHOULD lead with a thin
  end-to-end slice ([plan-model.md](process/plan-model.md)) so
  structural errors surface before fan-out compounds them. *Status*:
  open; mitigation spec'd.

- **R9 — Surface-dependent plugin loading.** Whether checked-in
  marketplace/plugin settings take effect is documented for local
  terminal sessions but not for Claude Code on the Web, and the
  first web demo attempt found the plugin absent (`/plugin` is
  terminal-only; auto-install from `.claude/settings.json` did not
  observably run). *Mitigation*: `github`-source marketplace in the
  settings (the most conventional shape); role agents mirrored into
  `.claude/agents/`, which cloud sessions are documented to load
  unconditionally (`plugin/scripts/sync_fallback.py`, `--check` for
  drift); scripts and dispatch remain usable in plain language per
  `CLAUDE.md`. *Status*: open — resolves when a web session
  demonstrates the plugin loading (or the fallback is confirmed as
  the standing web path and the docs gap reported upstream to
  Anthropic).

Unexpected interplay is by nature not enumerable in advance: the
pilot (plan chunk 5) treats every failure it hits as a candidate
entry here, and the semantic-audit questions in
[auditing.md](process/auditing.md) are the standing detector for the
kinds no invariant anticipates.
