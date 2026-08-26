# Cost log

Instance of the *Cost log* type, defined by citation in the
[Classification](classification.md)
([type spec](process/cost-log.md)). One row per accepted task,
written by the Orchestrator at acceptance. Work before enrollment
(chunks 1–3 and the spec revisions) predates the log.

| date | task | node | stage | role | model | input tok | output tok | notes |
|---|---|---|---|---|---|---|---|---|
| 2026-08-25 | T002 | P1-N008 | plan | planner | claude-opus-5[1m] | n/a | n/a | harness reported ~44k tokens total, no input/output split; packet widened (dispatch.md; backlog.md whole; form_check.py partial) |
| 2026-08-25 | T001 | P1-N005 | execute | implementer | claude-fable-5 | n/a | n/a | chunk-4 build in the owner-facing design session (attended surface, owner-designated model above tier); harness exposed no usage split, and elapsed time spans the design conversation rather than agent work |
| 2026-08-25 | T003 | P1-N008 | specify | planner | claude-opus-5[1m] | n/a | n/a | harness reported ~36k tokens total, no input/output split; packet widened (auditing.md excerpt; backlog.md; plan-register.md excerpt) |
| 2026-08-26 | T004 | P1-N008 | execute | implementer | claude-sonnet-5 | n/a | n/a | harness reported ~68k tokens total (26 tool calls, ~110 min wall-clock), no input/output split; packet widened (git log/remote/branch metadata commands, not file reads; one grepped line of plan-register.md's existing Article-7 citation) |
| 2026-08-26 | T005 | P2-N002 | plan | planner | claude-opus-5[1m] | n/a | n/a | ~54k context reported, no input/output split; 6m25s dispatch→result (unattended subagent); packet widened (rulings.md — recorded as R6's fifth firing and repaired); brief also invited breakdown content ahead of the specify stage (orchestrator error, see journal) |
| 2026-08-26 | T006 | P2-N002 | specify | planner | claude-opus-5[1m] | n/a | n/a | ~55k context reported, no input/output split; 5m04s dispatch→result (unattended subagent); four minor packet widenings, none a spec defect — the Backlog gap it flagged was an orchestrator brief-assembly error (the packet table already carries the Backlog in the base) |
