# Classification

<!-- The binding declaration (methodology vocabulary: Classification).
     Omitted optional fields declare their omission defaults, subject to
     the declaration-accuracy MUST (Constitution Article 4). -->

Reader: RD-4 (a fresh agent session) in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers).
The reader knows the methodology's
[Classification](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md)
vocabulary entry, at the pinned version below.

- **C-tier**: C1
- **Pinned methodology version**: 1.6.0 (compliance target; migrated
  from 1.5.0 on 2026-10-28 — v1.6.0 carries one migration note, the
  amended W-008 bootstrap block, which this repo's `CLAUDE.md` now
  carries verbatim)
- **S-level**: S0
- **Type**: component/library
- **Target**: none/local
- **Workflow**: none declared (⇒ deployed is false)
- **Family**: methodology (member) — lead:
  [majodali/methodology](https://github.com/majodali/methodology)
  (composition ratified by the owner 2026-08-24; reciprocated in the
  lead's Portfolio Families section)

The owner intends Promotion to C2+ before this project orchestrates
C2+ projects (recorded 2026-08-24; see the
[founding plan](plans/orchestrator-v1.md)).

## Deviation register

- **K-003 (the Backlog is the single source of progress truth)** —
  recorded 2026-11-09, when the owner accepted
  [the rebuild plan](plans/rebuild.md) and ratified its milestones.
  During the rebuild the progress truth is `orchestration/state.json`
  (from milestone 1) and the plan's checklists. The Backlog is frozen
  and becomes a rendering of the state file at milestone 6. Rationale:
  the owner approved the K-003 amendment that makes a declared
  planning/execution model the referent on 2026-10-30; this applies it
  before its release, declared here rather than silently. Ends when
  the amendment is released and pinned here.

## Custom definitions

Adopted by citation (methodology Article 7, definition-by-citation
form, v1.3.0) at self-hosted enrollment, 2026-08-25:

- **Plan register** (Document) — cites
  [docs/process/plan-register.md](process/plan-register.md);
  instance: [docs/plan-register.md](plan-register.md).
- **Cost log** (Document) — cites
  [docs/process/cost-log.md](process/cost-log.md);
  instance: [docs/cost-log.md](cost-log.md).
- **Run journal** (artifact) — cites
  [docs/process/observability.md](process/observability.md);
  instance: `orchestration/journal.jsonl` (telemetry, never
  authoritative).
- **Ruling register** (Document) — cites
  [docs/process/rulings.md](process/rulings.md);
  instance: [docs/rulings.md](rulings.md).
- **Project model** (Document) — cites
  [docs/process/project-model.md](process/project-model.md);
  instance: [docs/project-model.md](project-model.md). This entry
  declares the type only, and no planning/execution model. Under K-003
  (the Backlog is the single source of progress truth) as released at
  1.6.0, the Backlog stays the referent for what is done and what is
  next. Added on 2026-10-30 by node P3-N007 (the type declared, the
  arguments written, the K-003 amendment drafted).
- **State file** (artifact) — cites the schema
  [`src/model/schema.ts`](https://github.com/majodali/project-orchestrator-service/blob/main/src/model/schema.ts)
  of majodali/project-orchestrator-service, schema version 0, which is
  the type's definition; instance: `orchestration/state.json`. Holds
  the nodes, tasks and decisions of this project. The progress truth
  during the rebuild, under the K-003 deviation above. The Plan
  register and `docs/plan.md` are renderings of it. Added 2026-11-09
  at the rebuild's milestone 1 ([plan](plans/rebuild.md)).

Sandbox designation, 2026-11-09 (methodology Article 7): the Plan
register, Cost log, Ruling register and Project model instances above
are `in-progress` for the rebuild ([plan](plans/rebuild.md),
milestone 0). Each is frozen at its 2026-11-09 content. The state file
`orchestration/state.json` supersedes the first three from
milestone 1; the Project model is parked. The Run journal is
unchanged. The designation ends at milestone 6.
