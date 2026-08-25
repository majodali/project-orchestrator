# Backlog

<!-- The single source of progress truth (methodology K-003): one
     dependency-ordered register of completed and upcoming work. Rewrite
     checked entries to describe what actually shipped — the completed
     section doubles as the implementation map. Update in the same commit
     as the work (W-003). -->

## Completed

- [x] **Bootstrap and founding plan drafted** — methodology
  scaffolding (README, [Classification](classification.md) C1 / S0 /
  component/library / none-local, pinned v1.2.0; Binding block in
  `CLAUDE.md`) and the founding plan
  [orchestrator-v1](plans/orchestrator-v1.md), status `draft`,
  awaiting the owner's chunk-boundary review (W-001 gate; chunk 1 of
  the plan).
- [x] **Founding plan revised at owner review** — subscription-billing
  constraint verified against current Anthropic policy (Agent SDK /
  headless use under subscription auth included; June 2026 credit-pool
  change paused; `ANTHROPIC_API_KEY`-precedence trap recorded as a
  MUST-check) and the owner's rulings recorded: Backlog stays the
  execution source of truth with the plan register making hierarchy
  explicit, and multi-repo projects follow a designated
  coordinating-repo model headed for the methodology's next update
  ([plan](plans/orchestrator-v1.md), design rulings 1–2).

- [x] **Process specification v1** — [docs/process/](process/README.md)
  written and the plan flipped `active` at the owner's go-ahead:
  [plan-model](process/plan-model.md) (hierarchy, node lifecycle,
  Backlog relationship per owner ruling 1),
  [plan-register](process/plan-register.md) (register format,
  single-writer rule, Article 7 custom-definition mechanics),
  [dispatch](process/dispatch.md) (loop, judgment routing, handoff
  contract, context packets, v1 trigger surfaces and gates),
  [profiles](process/profiles.md) (C-tier profile table, C2/C3 rows
  provisional), [cost-log](process/cost-log.md) (per-task record).
  **Gate pending: owner review of the spec documents** (plan
  chunk 2).
- [x] **Chunk-2 review revisions** — owner-approved 2026-08-24:
  features formalized in [plan-model](process/plan-model.md) (a
  feature defined informally as cohesive validated behavior and
  formally as its validating functional-test set; monotonicity
  redefined over functional tests; planned vs. unplanned
  non-monotonicity made independent, with W-002 routed to the
  approving gate or to the owner respectively; feature-first
  decomposition guidance, no feature inventory kept);
  [auditing](process/auditing.md) added (deterministic form checks as
  a project-shipped checker run at dispatch/acceptance and on changed
  days — transitional until the `mtool` custom-type checker extension
  point — semantic checks as sparse Auditor agent tasks); the
  Workflow-as-lifecycle SHOULD retained with its audit-dividend
  rationale.

- [x] **Role definitions v1** — [roles.md](process/roles.md): the
  five roles as contracts (serves / decides / routes / produces),
  each a refinement of the methodology's role set with the Human
  owner unchanged; the model-tier mapping in one place (frugal
  `claude-haiku-4-5` · standard `claude-sonnet-5` · advanced
  `claude-opus-5`, owner may designate stronger per node); exhaustive
  decides-lists backing dispatch's `needs-judgment` rule; the
  Auditor's `mtool` compliance contract; per-project customization
  bounds (tier raises free, high-judgment tier lowering is a recorded
  deviation). No methodology amendment proved necessary — refinements
  stay within the vocabulary's role definitions, and sharing rides
  the staged v1.3.0 machinery. **Gate pending: owner review** (plan
  chunk 3).

- [x] **Migrated to methodology v1.3.0** — released and tagged by the
  owner 2026-08-25; pin and Binding block bumped (migration notes:
  none for all four amendments, so the bump is the whole migration).
  The Classification declares **Family**: methodology (member), lead
  github.com/majodali/methodology — composition ratified 2026-08-24,
  reciprocated by the lead's Portfolio Families section. The
  custom-definition mechanics in
  [plan-register](process/plan-register.md) and
  [cost-log](process/cost-log.md) reworded onto Article 7's
  definition-by-citation mechanism: managed projects adopt both types
  by pure citation to this spec, which remains authoritative (family
  cohesion).
- [x] **Failure detection and observability** — from the owner's
  chunk-3 review questions: the [Risk register](open-risks.md)
  adopted (K-005 pressure) and seeded with eight orchestration
  failure modes (R1–R8), each citing its spec-level containment;
  [observability.md](process/observability.md) added — the run
  journal (`orchestration/journal.jsonl`, telemetry never truth,
  flushed inside existing Orchestrator commits, session IDs as
  drill-down keys, JSONL as the extraction interface); dispatch
  gained failure containment (bounded attempts, no silent drops,
  stale tasks, scope budgets), the Reviewer an authority check on
  diffs, auditing the liveness and journal cross-check invariants,
  plan-model the thin-slice-first breakdown guidance.

- [x] **Plugin v1 built and repo enrolled self-hosted** (node
  P1-N005, `executing` until the demo gate) — the `orchestrator`
  plugin under [plugin/](../plugin/README.md), installable via the
  repo's marketplace file: six role agents pinned to the spec's tier
  models (orchestrator/haiku dispatch loop spawning
  planner/opus, implementer/sonnet, reviewer/opus, auditor/haiku,
  semantic-auditor/opus), skills `orchestrate` · `enroll` ·
  `journal-tail`, `form_check.py` mechanizing the
  [auditing](process/auditing.md) invariants (first run caught four
  real backlog-ref gaps — fixed in this commit), `journal_tail.py`,
  and the SessionStart billing check (R7). Self-hosted enrollment:
  Classification citations, [Plan register](plan-register.md) seeded
  P1-N001–N008, [Cost log](cost-log.md), journal begun. Demo-gate
  finding: `/plugin` is terminal-only, so web/cloud enablement is by
  checked-in `.claude/settings.json` (marketplace + enabledPlugins;
  added here, and to the enroll skill for managed projects). Second
  demo-gate finding: the settings-declared plugin did not observably
  load in a web session (docs silent — [Risk R9](open-risks.md)):
  marketplace source switched to `github`, and the role agents
  mirrored to `.claude/agents/` (documented to load unconditionally
  in cloud) via `sync_fallback.py` with a `--check` drift mode.
  Trial 1 (web session, 2026-08-25) exercised the fallback end to
  end and its findings were applied: hold markers
  (`[gated: ...]`/`[blocked: ...]`) added to the Plan register type
  and the checker's liveness grew all four arms (finding 1);
  orchestrate gained the surface fallback for cloud's missing nested
  dispatch, with the tier deviation visible in the Cost log
  (finding 2, R9 extended); the dispatch dependency default defined
  (finding 3); the plan/specify packet rows widened to whole
  documents (finding 4, an R6 detection working); surface-mandated
  session branches recognized under W-006; the model-IDs-are-data
  ruling recorded in the Cost log spec. Trial work on the unpushed
  session branch was not merged; T001 remains live in the design
  session. **Gate pending: owner rules on the trial findings and
  accepts the demo** (plan chunk 4).

- [x] **Liaison role and parallel dispatch** (owner review of
  trial 1, round 2) — the **Liaison** role added to
  [roles.md](process/roles.md): the owner-facing session role with a
  tight communication contract (lead with outcome, no narration,
  hand the owner over to role sessions for working conversations)
  and the local/web surface mapping (local: Liaison dispatches the
  frugal Orchestrator agent; web: one session serves Orchestrator +
  Liaison, Sonnet recommended, delegating mechanical batches per the
  new delegation-within-the-role clause — an admin-assist role split
  deliberately deferred until pilot data shows the boundary).
  Parallel dispatch permitted when independence is a
  gate-approved planning product
  ([dispatch.md](process/dispatch.md)). Trial-1 work products
  abandoned per owner ruling (nothing was pushed; P1-N008 stays
  `identified` for a clean pass).

- [x] **Owner-decision economics and the quiet loop** (owner review
  of trial 2) — [dispatch.md](process/dispatch.md) gains the
  owner-decision economics section (mandatory defaults on every
  routed decision; batching at gates with adopt-by-default
  go-ahead; exactly four immediate-escalation classes; findings to
  registers, never chat; standing pre-authorizations in scope
  grants; cross-repo reach as named scope) and the fixed
  gate-summary template; the Liaison gains the quiet-loop rule; the
  Planner's plans collect a "Decisions for the gate" section with
  defaults; agents and skill updated to match. Trial-2's confirmed
  R6 recurrence repaired (process-spec profiles/plan-model routed
  into the plan/specify packets). Trial-2 work products abandoned
  per owner rerun ruling — branch `claude/p1-n008-orchestration-tpo5hb`
  left unmerged for deletion; P1-N008 stays `identified` on this
  branch for the clean rerun.

- [x] **Trial-3 review: latency diagnosis and gate polish** — the
  run journal's timestamps split trial 3's ~40 minutes into a
  healthy 10-minute loop (two ~3-minute Planner runs, ~1-minute
  acceptances) and a ~30-minute pre-dispatch orientation phase: the
  Orchestrator gave itself an unbounded packet (18 files) and a
  timer detour. Fixes: the Orchestrator's own minimal working set
  spec'd (register + Backlog + dispatch.md, further reads journaled
  as its own packet-widening; no timers or polling, ever); gate
  template gains the Detail line and the every-decision-numbered
  rule (minor calls batched as one entry), and Costs gains per-task
  wall-clock from journal timestamps; third R6 firing repaired
  (base packet gains the whole Backlog; plan packet gains
  dispatch.md's owner-decision-economics section).

- [x] **Ruling register — precedents from gate decisions** (owner
  direction, 2026-08-25) — [rulings.md](process/rulings.md): gate
  decisions classified by type (handoff/tier/completion/scope/
  verification/comms) and scope (node/project/process), captured at
  every gate crossing (overrides especially), applied silently on
  exact match (journaled `precedent-applied`, one summary line),
  cited by the Planner on near match, and promoted on recurrence —
  project-scope at three applications, process-scope on capture —
  into the spec, with cross-project convergence and
  methodology-boundary patterns following the Article 7/8 paths.
  Precedents never decide the immediate class. Wired through
  dispatch, roles, observability (`precedent-applied` event),
  checker, enroll skill, and agents; this repo's instance
  [docs/rulings.md](rulings.md) created, first entries due at the
  pending P1-N008 gate.

## Upcoming

- [ ] **Latency comparison: local session trial** — run the same
  N008 scope in a local terminal session and compare journal
  wall-clock against trial 3's web run, isolating surface latency
  from process overhead (owner-raised, 2026-08-25).
- [ ] **External-harness orchestration experiment** — one node run
  through a harness outside Claude Code (Claude Agent SDK under
  subscription auth, per standing constraint 2) to compare latency
  and cost against Claude Code surfaces; informs the phase-2
  runtime decision (owner-raised, 2026-08-25).
- [ ] **Delegation cost-effectiveness measurement** — when and how
  delegating Orchestrator admin batches (or any role handoff) pays
  for itself: judgment today, measured from Cost log + journal data
  once the pilot generates enough of it (v2 theme; plan chunk 6
  grooms it).
- [ ] **Propose the `mtool` custom-type checker extension point
  upstream** (node P1-N008, `specified`) — planned and specified by
  trial 3's orchestrated run
  ([plan](plans/p1-n008-mtool-checker-extension-point.md) ·
  [spec](specs/p1-n008-mtool-checker-extension-point.md), 22
  criteria); gate crossed 2026-08-26 with all defaults adopted and
  captured as [rulings](rulings.md) RU-001–RU-005: execute approved
  (conformance sketch only, node completes at the artifact, owner
  hand-carries the proposal to methodology-tools, owner gate at
  `verifying`). Execute awaits its dispatch — candidate vehicle for
  the local-session latency trial below. The methodology-tools 403
  noted at planning gates its reconnaissance step; the spec requires
  assumptions marked as such if unresolved.
  Plan drafted:
  [p1-n008-mtool-checker-extension-point](plans/p1-n008-mtool-checker-extension-point.md)
  — leaf; completes at a transportable proposal artifact in this
  repo, upstream delivery and disposition excluded (five decisions
  batched for the gate). Specified:
  [spec](specs/p1-n008-mtool-checker-extension-point.md) — criteria
  for the artifact (problem framing, capability contract, five design
  questions with recommendations, dated evidence, bounded conformance
  sketch, explicit ask), its transportability (no unglossed local
  vocabulary, absolute links, project voice), the same-commit
  [auditing](process/auditing.md) pointer, and the scope guards (no
  cross-repo reach, no local divergence, checks clean). No new owner
  decision surfaced.
- [ ] **Deliver the extension-point proposal upstream** — carry the
  finished P1-N008 artifact to methodology-tools as an issue or PR
  and record its disposition. Separate from P1-N008 because
  methodology-tools is outside this project's approved scope
  (dispatch's cross-repo-reach rule) and because upstream acceptance
  is not this project's to verify; the default route is the owner
  hand-carrying it (P1-N008 plan, decision 2).
- [ ] **Adopt the checker extension point once it lands** — when
  `mtool` ships the capability: adapt `form_check.py` to the accepted
  contract, retire the side-by-side transitional arrangement in
  [auditing](process/auditing.md), and update the Auditor's contract
  in [roles.md](process/roles.md) to run the checker through `mtool`
  rather than beside it.
- [ ] **Pilot on a real project** (node P1-N006) — end-to-end run on
  one owner-chosen portfolio project; costs and lessons recorded
  ([plan chunk 5](plans/orchestrator-v1.md)).
- [ ] **Cost reporting v1 and close-out** (node P1-N007) —
  aggregation over cost logs and run journals, retrospective, v2
  themes groomed ([plan chunk 6](plans/orchestrator-v1.md)).
