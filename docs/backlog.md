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

## Upcoming

- [ ] **Propose the `mtool` custom-type checker extension point
  upstream** (node P1-N008) — one generic methodology-tools
  capability: a custom type defined by citation declares a checker
  with its defining project, discovered and run by `mtool audit
  form`, findings merged into the standard delivery pipeline.
  Proposed once the form checker has proven itself in the plugin
  trial ([auditing](process/auditing.md)); until it lands, the
  Auditor's side-by-side checker run is the transitional discharge.
- [ ] **Pilot on a real project** (node P1-N006) — end-to-end run on
  one owner-chosen portfolio project; costs and lessons recorded
  ([plan chunk 5](plans/orchestrator-v1.md)).
- [ ] **Cost reporting v1 and close-out** (node P1-N007) —
  aggregation over cost logs and run journals, retrospective, v2
  themes groomed ([plan chunk 6](plans/orchestrator-v1.md)).
