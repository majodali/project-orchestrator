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
  (from milestone 1) and the plan's checklists. The Backlog frozen on
  2026-11-09 is archived, and since milestone 6 (P4-N025)
  [docs/backlog.md](backlog.md) is a rendering of the state file,
  written by the service. Rationale:
  the owner approved the K-003 amendment that makes a declared
  planning/execution model the referent on 2026-10-30; this applies it
  before its release, declared here rather than silently. Ends when
  the amendment is released and pinned here.

## Custom definitions

Adopted by citation (methodology Article 7, definition-by-citation
form, v1.3.0). Revised 2026-11-14 by node P4-N024 (Pruned document
set): the types the dispatch loop needed are retired with the
documents that carried them.

- **State file** (artifact) — cites the schema
  [`src/model/schema.ts`](https://github.com/majodali/project-orchestrator-service/blob/main/src/model/schema.ts)
  of majodali/project-orchestrator-service, schema version 0, which is
  the type's definition; instance: `orchestration/state.json`. Holds
  the nodes, tasks and decisions of this project, and is the progress
  truth under the K-003 deviation above. The orchestration service is
  its only writer. Described in
  [the state model](process/state-model.md). Added 2026-11-09 at the
  rebuild's milestone 1 ([plan](plans/rebuild.md)).
- **Plan register** (rendering) — instance:
  [docs/plan-register.md](plan-register.md), with
  [docs/plan.md](plan.md). Both are renderings of the state file,
  written by the service and never by hand. The hand-written type's
  definition is archived:
  [plan-register.md](archive/process/plan-register.md).
- **Run journal** (artifact) — instance: `orchestration/journal.jsonl`
  (telemetry, never authoritative), written by the service, one line
  per write. The dispatch loop's definition is archived:
  [observability.md](archive/process/observability.md).

Retired 2026-11-14, each with its definition and its instance in
`docs/archive/`:

- **Cost log** — definition
  [cost-log.md](archive/process/cost-log.md), instance
  [cost-log.md](archive/cost-log.md). Replaced by the cost the service
  records on each task in the state file.
- **Ruling register** — definition
  [rulings.md](archive/process/rulings.md), instance
  [rulings.md](archive/rulings.md). Replaced by the standing decisions
  RU-001 to RU-024 in the state file.
- **Project model** — definition
  [project-model.md](archive/process/project-model.md), instance
  [project-model.md](archive/project-model.md). Not replaced: it
  belongs to the P3 line, which the owner holds at P3-N001 (D005,
  D063), and returns with it. Added on 2026-10-30 by node P3-N007.

The sandbox designation of 2026-11-09, which froze the Plan register,
Cost log, Ruling register and Project model instances for the
rebuild, ended with this revision.
