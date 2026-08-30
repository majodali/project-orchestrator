---
name: journal-tail
description: Show the owner the recent orchestration run-journal events for this project, with Plan-register context and session IDs for drill-down. Use when the owner asks what the orchestrator has been doing, or to follow or inspect orchestration activity.
---

Render the project's orchestration feed
(spec: `docs/process/observability.md`).

1. Run:

   `node "${CLAUDE_PLUGIN_ROOT}/scripts/journal_tail.ts" 15`

   (More events if the owner asked for a longer window.)

2. Present the output as-is, then add one short paragraph of context
   only if the events need it (an open `needs-judgment`, a `blocked`
   or `stale` task, a check failure — things awaiting the owner).

3. Offer drill-down: each event's `session` field identifies the
   role session; the owner can open that session's transcript to see
   the work in full. For analysis questions ("how many attempts did
   N012 take?"), answer by reading `orchestration/journal.jsonl`
   directly — it is JSONL precisely so it can be queried.

Never write to the journal from this skill: it is the Orchestrator's
to write, yours to read.
