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
  the detection has fired twice and the table was widened both times
  (trial 1: plan/specify parent documents; trial 2: the process
  spec's profiles.md and plan-model.md routed to those stages) — the
  loop works; watch for further recurrence.
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
  `CLAUDE.md`. *Trial-1 result (2026-08-25)*: the fallback works —
  mirrored agents and scripts ran in a web session end to end. A
  second surface limitation surfaced there: **cloud sessions do not
  give subagents the Agent tool**, so the orchestrator agent could
  not dispatch role agents (it stopped correctly — R4 held).
  *Further mitigation*: the orchestrate skill's surface fallback —
  the session itself serves the Orchestrator role, contract
  unchanged, actual model recorded in the Cost log with a note
  (roles.md, surface-tier clause). *Trial-4 result (2026-08-26, local
  terminal)*: the plugin did **not** load there either — the run used
  the same `.claude/agents/` + `CLAUDE.md` fallback, which again
  worked end to end. Across four trials on two surfaces the fallback
  is the path that actually runs; the plugin has never been observed
  loading. *Status*: open — the mirror is de facto primary (decision
  for the owner: make it so in the spec, or diagnose plugin loading
  first); the frugal-tier Orchestrator stays unavailable while
  nested dispatch is missing; report both docs gaps upstream to
  Anthropic.

- **R10 — The service becomes a second source of truth.** Live state
  in the service drifts from the registers in git, and decisions get
  made against the projection. *Mitigation*: git is authoritative by
  constraint ([orchestration-service](plans/orchestration-service.md),
  constraint 1); the service reconciles from git on read and commits
  answers back; `form_check.py` keeps checking git and nothing else,
  so a divergence is a finding rather than a silent truth. *Status*:
  open; binds the service's design from chunk 1.
- **R11 — MCP surface constraints.** The transport imposes limits that
  a naive design would trip: a 5-second default tool-call timeout
  (configurable per server), auto-backgrounding of calls past two
  minutes, elicitation dialogs that block rather than background, no
  sampling, cloud egress that needs the service's domain allowlisted
  or connector routing, and channels-based push whose availability on
  the web surface is **unverified**. *Mitigation*: configure timeouts
  explicitly; use elicitation only for immediate-class questions and
  the queue for everything else; verify channels before any design
  depends on push, with topics degrading to pull otherwise. *Status*:
  open; verification due in chunk 3.
- **R12 — Service outage stops work.** A coordination plane that
  becomes a dependency turns its own downtime into a work stoppage.
  *Mitigation*: degrade-to-git-only is a standing constraint
  (constraint 3) — sessions fall back to the v1 process, which is
  fully functional without the service; the fallback is exercised, not
  assumed. *Status*: open; fallback exercise due in chunk 1.

Unexpected interplay is by nature not enumerable in advance: the
pilot (plan chunk 5) treats every failure it hits as a candidate
entry here, and the semantic-audit questions in
[auditing.md](process/auditing.md) are the standing detector for the
kinds no invariant anticipates.
