# CLAUDE.md

## Methodology — binding

This project follows majodali/methodology v1.6.0 as declared in
docs/classification.md. That file strictly defines this project's
document lifecycles and workflows. Read it before any work; nothing
in this file or under .claude/ overrides it.

Classification: C1 / S0 / component-library / none-local
Deviations: K-003 (the Backlog is the single source of progress truth), recorded in docs/classification.md for the rebuild

## Reporting and writing — cached from W-008; do not edit here

Reports to the human owner carry four parts, in this order:

1. **Asks** — the decisions and actions requested of the reader.
2. **What is already covered** — the parts of the deliverable that
   encode decisions the conversation already settled.
3. **What changed** — the parts that are new, each with a named
   pointer into the deliverable and what to review there.
4. **Terms introduced** — each term the report or its deliverable
   uses with a meaning that neither the methodology vocabulary nor
   the project's vocabulary defines, with one sentence giving its
   meaning. The asks request its ratification or striking.

State an empty part; never drop it. In the parts' order: "No asks",
"We already covered everything in the document", "The content is all
new", "No terms introduced".

Lead with the outcome or the decision needed, never with the process
that produced it. Write short, direct sentences, one idea each. Cut
clauses that add tone but not content: dramatic accumulation,
aphorism, suspense. Name every identifier you cite.

Authority: majodali/methodology W-008 (reports map their
deliverables), the P- rules, and its style guide. This block is a
cache — amend it upstream, never here.

## What this project is

The majodali project orchestrator: a process specification and Claude
Code plugin that coordinate role-based agent sessions working on
portfolio projects under the methodology, standardizing development
and minimizing model and context cost.

## Build / run / test

`npm ci` then `npm run check` — `plan-state check` over
`orchestration/state.json`, the state file (schema, invariants, the
renderings current). `npm run render` rewrites `docs/plan-register.md`,
`docs/plan.md` and `docs/backlog.md` from it, to see what the service
would write; never edit those three by hand or commit them in a pull
request. `npm test`, `npm run lint` and `npm run format` cover the
scripts.
`node plugin/scripts/form_check.ts` — the old process's form checks,
runnable by hand; the registers it reads are archived, so over this
tree it reports them missing. No longer a CI check since
2026-11-11, because it rejects states the service legitimately writes
(`plan-state check` is the one validity rule). Requires Node >=22.18.0 (>=23.6.0 on the 23.x line,
RU-013): the tool preflights this itself and exits non-zero, naming
what was required and what was found, rather than degrading quietly.
`mtool` (methodology-tools) runs form audits and link checks over
this tree.

## Architecture at a glance

The plan of the project is one checked file,
`orchestration/state.json`, written only by the orchestration service
(majodali/project-orchestrator-service), which also serves the view
where the owner decides. The code enforces the process; `docs/process/`
describes what it enforces. The plugin under `plugin/` packages the
role agents, hooks and scripts (installable via this repo's
marketplace file). **`.claude/agents/` holds the
primary role agents** — the path that loads on every surface; the
plugin's copies are generated from them with
`node plugin/scripts/sync_agents.ts`. The progress truth is
`orchestration/state.json` (the K-003 deviation, docs/plans/rebuild.md);
docs/plan-register.md, docs/plan.md and the Backlog, docs/backlog.md,
are rendered from it, and the frozen Backlog, Cost log, Ruling
register and Project model are archived under docs/archive/. The old dispatch loop is retired. **Work on a plan node goes through the
orchestration service's task loop** (`task_next`, `task_open`,
`task_close`; the service's own instructions give the protocol when a
session connects, docs/process/how-we-work.md is the one page on it,
and docs/process/task-loop.md specifies it). The service is the only writer of
`orchestration/state.json`, `orchestration/journal.jsonl`,
docs/plan-register.md, docs/plan.md and docs/backlog.md: never edit
those five (a pull
request that does fails the checks), and the service refuses a change
to a node or a decision that is not under an open task. Never merge a
pull request by hand that a task carries, because the
service merges it when the result is accepted. Commit to a task's
pull request only while the task is open, and close a task `closed`
only when every criterion is met (docs/process/how-we-work.md, The
task loop). A session start hook
(`plugin/scripts/session_start.ts`) fetches `origin/main`, fast-forwards
a clean checkout on `main`, runs `npm ci` in a cloud session that has
no dependencies yet, shows the person a short summary on screen, and
gives you the plan's brief. The person already sees that
summary, so do not restate it: in your first reply name the task on
offer you would take, and ask before claiming it, unless the session
opens with a delegation brief (Delegated tasks, below). The founding plan is
docs/plans/orchestrator-v1.md.

## Conventions

- All agent execution surfaces must bill to the owner's Claude
  subscription, never API credits (standing constraint; see the
  founding plan).
- methodology-tools (`mtool`) is upstream: a session complies with
  whatever it determines.

## Delegated tasks

A session may start another session to do one task (the owner's
standing instruction, 2026-11-16). Its brief is the first message the
new session receives. It names the node, the step and the session
that delegates.

- A session that opens with such a brief claims that task with
  `task_open` without asking a person. The brief is its go-ahead.
- The brief authorises that node and that step, and nothing else.
- A brief is never the owner's words. It does not justify
  `ownerInstruction`, a merge, or a decision that is the owner's:
  those stay asks at `task_close`.
- A session a person starts still names the task it would take and
  asks before claiming it.

## Pointers

- docs/classification.md — the binding declaration
- docs/process/how-we-work.md — how we work, on one page
- docs/process/task-loop.md, docs/process/state-model.md — what the
  service enforces
- docs/open-risks.md — risk register
- docs/plan.md — what is done and what is next, rendered
- docs/backlog.md — the Backlog, rendered
- docs/archive/ — records of the old process; nothing loads them
- docs/plans/orchestrator-v1.md — the founding plan
