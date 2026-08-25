# Cost log

Instance of the *Cost log* type, defined by citation in the
[Classification](classification.md)
([type spec](process/cost-log.md)). One row per accepted task,
written by the Orchestrator at acceptance. Work before enrollment
(chunks 1–3 and the spec revisions) predates the log.

| date | task | node | stage | role | model | input tok | output tok | notes |
|---|---|---|---|---|---|---|---|---|
| 2026-08-25 | T002 | P1-N008 | plan | planner | claude-opus-5[1m] | n/a | n/a | harness reported ~44k tokens total, no input/output split; packet widened (dispatch.md; backlog.md whole; form_check.py partial) |
