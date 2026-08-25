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

## Upcoming

- [ ] **Migrate to methodology v1.3.0 on release** — staged upstream
  amendments (observed on `main`, 2026-08-24) touch this project:
  bump the Classification pin and Binding block; declare the
  **Family** field (member of family `methodology`, lead
  github.com/majodali/methodology — composition ratified by the owner
  2026-08-24, cached in the upstream Portfolio register's Families
  section); reword the custom-definition mechanics in
  [plan-register](process/plan-register.md) and
  [cost-log](process/cost-log.md) onto the new Article 7
  definition-by-citation mechanism (managed projects then adopt both
  types by pure citation to this spec, per family cohesion). Not
  actionable until the owner tags the release: compliance targets
  reference releases only, and amendments are never retroactive.
- [ ] **Role definitions v1** — role set refined from the
  methodology's roles, model-tier mapping, per-role context packets,
  amendment proposals as surfaced
  ([plan chunk 3](plans/orchestrator-v1.md)).
- [ ] **Plugin v1** — role agent definitions, process skills,
  Orchestrator agent; self-hosted trial
  ([plan chunk 4](plans/orchestrator-v1.md)).
- [ ] **Pilot on a real project** — end-to-end run on one
  owner-chosen portfolio project; costs and lessons recorded
  ([plan chunk 5](plans/orchestrator-v1.md)).
- [ ] **Cost reporting v1 and close-out** — aggregation over cost
  logs, retrospective, v2 themes groomed
  ([plan chunk 6](plans/orchestrator-v1.md)).
