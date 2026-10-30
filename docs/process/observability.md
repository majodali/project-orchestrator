# Observability — the run journal

Part of the [orchestration process specification](README.md).

Reader: RD-4 (a fresh agent session) in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers):
the Orchestrator, which writes the journal, and any session that
reads it. The reader knows the [process specification's](README.md)
defined terms.

In the mature state, gates, project documents, and registers are the
observability surface. For troubleshooting and optimization they are
not enough: they record outcomes, not operation. The **run journal**
records operation — a feed the owner can follow, drill into, and
extract for analysis.

## Position: telemetry, never truth

The journal is telemetry. The Backlog remains the source of truth for
execution, the Plan register for hierarchy and stages, the Cost log
for accepted-task usage; the journal claims none of those roles. No
step of the loop depends on reading the journal back, with one
exception. Inside a ratified sequence, a member task's
`result-received` event is the audit record the owner reads at the
gate ([dispatch.md](dispatch.md#sequence-mode), the member's result
record). The stop is decided in session, and the record lets the
owner check it afterwards. The journal therefore lives outside
`docs/`: one file per managed project, `orchestration/journal.jsonl`,
a custom **artifact** type adopted the same way as the registers
(definition citing this spec). Losing or truncating a journal loses
drill-down history and a sequence's audit records, never project
state.

(Corrected 2026-10-30 by node P3-N014. The paragraph said that
nothing in the process may depend on reading the journal back. That
contradicted decision 12 of the
[P3-N005 specification](../specs/p3-n005-sequence-mode.md#decisions-for-the-gate),
which makes the `result-received` event the audit record the owner
reads at that node's criterion G2.)

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
omitted. A `note` may be long when it carries a sequence member's
result record ([dispatch.md](dispatch.md#sequence-mode)).

Event kinds (v1, extendable by spec change): `dispatched` ·
`result-received` (with the task's returned status) · `accepted` ·
`check-failed` · `needs-judgment` · `blocked` · `stale` ·
`backward-transition` · `packet-widened` · `precedent-applied` (a
[Ruling register](rulings.md) match deciding a staged question) ·
`gate-opened` · `gate-crossed` · `sequence-ratified` ·
`sequence-stopped` · `edge-recorded` (an
[edge](project-model.md#def-edge) transcribed into the Project model
instance).

The two sequence kinds record a ratified sequence
([dispatch.md](dispatch.md#sequence-mode)). Both names were ratified
at node P3-N014's gate of 2026-10-30.

- `sequence-ratified`: the owner ratified a sequence. Its `node` is
  the node whose document holds the ratification record, and its
  `ref` is the commit of that record. Its `note` lists the members,
  each node with its stages, in dispatch order. It precedes the first
  member's `dispatched` event.
- `sequence-stopped`: a running sequence stopped. Its `task` and
  `node` are the stopping member's. Its `note` opens with the
  condition, "condition 1" to "condition 4" of W-001 (two delivery
  modes, human-gated), or the step-4 stop: "empty actionable set",
  "blocked task" or "scope exhausted". The note then carries the
  stopping member's asks verbatim.

An `edge-recorded` event records one edge. Its fields:

- `node`: the edge's node.
- `task`: the task whose acceptance commit records the edge, or `null`
  when a gate records it.
- `note`: the edge in the [Project model](project-model.md)'s
  notation, then `; from ` and the record that states it, such as
  `P3-N007 uses project-model; from docs/specs/p3-n002-comprehension-model.md, Edges stated at this breakdown`.
- `ref`: `null`, or the commit of the record when it is pinned.

Two further events of the Project model have no kind. The first is a
recorded gap with a home. The second needs no kind.

- An edge invalidated by a superseded ruling belongs to node P3-N004
  (reversibility, and the measurement that says whether it pays).
- A part's state change has no event kind, by decision 12 of the
  [specification of P2-N003 (owner questions and the plan
  view)](../specs/p2-n003-owner-questions-and-plan-view.md#decisions-for-the-gate).
  A part's state is derived from Plan register stages, and this
  journal already records every stage change. The web view derives a
  part's state when it renders a page.

The gaps `unblocked` and risk-opened stay with node P1-N016 (process
spec maintenance).

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
