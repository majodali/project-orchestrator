---
name: orchestrate
description: Run an orchestration session on this methodology-managed project - gather owner-approved scope, spawn the frugal-tier orchestrator agent to run the dispatch loop, and relay its gate summary. Use when the owner asks to orchestrate, dispatch, or continue orchestrated work.
---

Run one orchestration session per the process spec
(majodali/project-orchestrator `docs/process/`).

1. **Preconditions — lean startup.** Verify `docs/plan-register.md`
   exists — if not, this project is not enrolled: offer
   `/orchestrator:enroll` and stop. Warn if `ANTHROPIC_API_KEY` is
   set in the environment (billing Risk R7). Run the form checker:

   `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/form_check.py"`

   Never proceed past a failing check. Startup reads are exactly the
   Plan register, the Backlog, and `docs/process/dispatch.md` —
   trial 3 spent ~30 minutes on an 18-file orientation before a
   10-minute loop; do not repeat that. Never wait on timers,
   scheduled wakeups, or sleep — dispatched agents notify on
   completion.

2. **Approved scope.** Get from the owner, explicitly: which nodes
   and stages are approved; where the gates are; any task/token
   budget; any standing pre-authorizations (tier raises the Planner
   argues, parallel dispatch of plan-marked-independent nodes,
   additional repositories); anything not granted stays ungranted.
   If the owner has already stated scope in this conversation,
   restate it for confirmation rather than re-asking. No scope, no
   dispatch.

3. **Run the loop on whichever surface allows it.** Preferred: spawn
   the orchestrator agent (frugal tier) with a brief containing the
   project root; the approved scope, budget, and gates, verbatim;
   the form-checker path
   (`${CLAUDE_PLUGIN_ROOT}/scripts/form_check.py`); and the role
   agents available to it (planner, implementer, reviewer, auditor,
   semantic-auditor). **Surface fallback** (cloud sessions do not
   currently let a subagent dispatch further subagents): if the
   orchestrator agent reports it cannot dispatch, or the surface is
   known not to support nested agents, serve the Orchestrator role
   in THIS session instead — its full contract binds (low-judgment
   only, single writer, containment rules), you dispatch the role
   agents directly, and every Cost log row for orchestration work
   records this session's actual model with a note (the tier stays
   the target; the deviation stays visible in the data). Either
   way, the acting Orchestrator is the single writer of the Plan
   register, Cost log, and run journal.

4. **Serve the Liaison role for all owner communication** (roles.md
   contract). **Quiet loop**: between the scope confirmation and the
   gate summary, say nothing to the owner except immediate-class
   escalations (scope expansion, W-002 test changes, deviations,
   budget overrun) and blockers — no progress narration, no
   explanations of internal mechanics; operational progress is the
   run journal's job. At the gate, **relay the summary in
   dispatch.md's template, unedited in substance**: delta lines, the
   full non-terminal enumeration, the numbered decisions with
   defaults (the owner's go-ahead adopts defaults; overrides come by
   number), costs, blockers. When the owner wants a working
   conversation (planning, review), connect them with that role's
   session rather than relaying. Record the owner's gate decision by
   having the orchestrator (or, if it has exited, this session
   acting in its stead for this one write) append the `gate-crossed`
   event, the adopted decisions, and any scope grant to the journal
   in the next commit.
