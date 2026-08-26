# Observability — the run journal

Part of the [orchestration process specification](README.md).
In the mature state, gates, project documents, and registers are the
observability surface. For troubleshooting and optimization they are
not enough: they record outcomes, not operation. The **run journal**
records operation — a feed the owner can follow, drill into, and
extract for analysis.

## Position: telemetry, never truth

The journal is telemetry. The Backlog remains the source of truth for
execution, the Plan register for hierarchy and stages, the Cost log
for accepted-task usage; the journal claims none of those roles, and
nothing in the process may depend on reading it back. It therefore
lives outside `docs/`: one file per managed project,
`orchestration/journal.jsonl`, a custom **artifact** type adopted the
same way as the registers (definition citing this spec). Losing or
truncating a journal loses drill-down history, never project state.

## Events

Append-only JSONL, one event per line:

```json
{"ts":"2026-08-24T14:07:12Z","event":"dispatched","task":"T041",
 "node":"P1-N012","stage":"execute","role":"implementer",
 "model":"claude-sonnet-5","session":"<session-id>","ref":null,
 "note":null}
```

Fields: `ts` · `event` · `task` · `node` · `stage` · `role` ·
`model` · `session` (the executing session's identifier — the
drill-down key into its transcript) · `ref` (commit SHA or PR when
one exists) · `tokens_in`/`tokens_out` (where the event carries
usage) · `note` (short free text). Absent fields are `null` or
omitted.

Event kinds (v1, extendable by spec change): `dispatched` ·
`result-received` (with the task's returned status) · `accepted` ·
`check-failed` · `needs-judgment` · `blocked` · `stale` ·
`backward-transition` · `packet-widened` · `precedent-applied` (a
[Ruling register](rulings.md) match deciding a staged question) ·
`gate-opened` · `gate-crossed`.

## Write and read rules

- **The Orchestrator writes the journal** (the single-writer rule
  extends to it), buffering events and flushing them **in the
  commits it already makes** — acceptance, stage-change, and gate
  commits — so the journal adds no commit noise. Events still
  in-flight when an orchestration session ends are flushed then,
  which is also where `stale` records land.
- **Cross-check invariant** ([auditing.md](auditing.md)): every Plan
  register stage change has its journal event; every Cost log row
  has its `accepted` event. The journal may contain more than the
  registers show (rejections, check failures, loops) — never less.
- **Session end.** A task still open when an orchestration session
  ends MUST be journaled `stale` unless the same session continues
  it; reopening emits a fresh `dispatched`. A task left open across
  sessions is unreadable to everyone but the session that dispatched
  it (trial-1 finding: an open task was read as alive by one session
  and dead by another).
- **Wall-clock is attended time.** Timestamps measure elapsed time,
  which on an attended surface includes waiting for the owner to
  answer permission prompts. Events SHOULD note the surface and
  permission mode when a task runs attended, so latency analysis can
  separate agent time from human time (trial-4 finding: an execute
  task showed 1h51m elapsed for ~68k tokens — approval waiting, not
  model latency). Dispatched role sessions SHOULD run in a
  permission mode that does not gate ordinary in-scope tool calls.
- **Following**: the feed is the journal tail; the plugin ships a
  view that renders recent events with their register context (plan
  chunk 4). **Drilling in**: `session` identifiers resolve to
  session transcripts. **Extracting**: JSONL is the analysis
  interface — chunk 6's reporting reads the journal and the Cost
  log together (the journal carries what the log deliberately omits:
  the failed and repeated work between acceptances).
- A hosted view over journal-derived summaries (the K-008 practice)
  is a v2 theme, deliberately not built before the pilot proves what
  is worth watching.
