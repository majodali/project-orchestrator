---
name: orchestrate
description: Run an orchestration session on this methodology-managed project - gather owner-approved scope, spawn the frugal-tier orchestrator agent to run the dispatch loop, and relay its gate summary. Use when the owner asks to orchestrate, dispatch, or continue orchestrated work.
---

Run one orchestration session per the process spec
(majodali/project-orchestrator `docs/process/`).

1. **Preconditions.** Verify `docs/plan-register.md` exists — if not,
   this project is not enrolled: offer `/orchestrator:enroll` and
   stop. Warn if `ANTHROPIC_API_KEY` is set in the environment
   (billing Risk R7). Run the form checker and show the result:

   `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/form_check.py"`

   Never proceed past a failing check.

2. **Approved scope.** Get from the owner, explicitly: which nodes
   and stages are approved; any task/token budget; where the gates
   are. If the owner has already stated scope in this conversation,
   restate it for confirmation rather than re-asking. No scope, no
   dispatch.

3. **Spawn the orchestrator agent** (frugal tier) with a brief
   containing: the project root; the approved scope, budget, and
   gates, verbatim; the form-checker path
   (`${CLAUDE_PLUGIN_ROOT}/scripts/form_check.py`); and the role
   agents available to it (planner, implementer, reviewer, auditor,
   semantic-auditor). The orchestrator runs the dispatch loop and is
   the single writer of the Plan register, Cost log, and run
   journal; do not maintain those yourself in this session.

4. **Relay the gate summary** to the owner unedited in substance:
   work accepted, the full enumeration of non-terminal nodes in
   scope (actionable · in-flight · blocked · gated — no silent
   drops), costs recorded, and everything awaiting the owner
   (`needs-judgment` questions with the role's recommendation).
   Record the owner's gate decision by having the orchestrator (or,
   if it has exited, this session acting in its stead for this one
   write) append the `gate-crossed` event and any scope grant to the
   journal in the next commit.
