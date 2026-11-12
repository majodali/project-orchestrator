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
renderings current). `npm run render` rewrites `docs/plan-register.md`
and `docs/plan.md` from it; never edit those two by hand.
`node plugin/scripts/form_check.ts` — the old process's form checks,
runnable by hand over the frozen documents; no longer a CI check since
2026-11-11, because it rejects states the service legitimately writes
(`plan-state check` is the one validity rule). Requires Node >=22.18.0 (>=23.6.0 on the 23.x line,
RU-013): the tool preflights this itself and exits non-zero, naming
what was required and what was found, rather than degrading quietly.
`mtool` (methodology-tools) runs form audits and link checks over
this tree.

## Architecture at a glance

`docs/` holds the authoritative process specification; the plugin
under `plugin/` is the built artifact implementing it (installable
via this repo's marketplace file). **`.claude/agents/` holds the
primary role agents** — the path that loads on every surface; the
plugin's copies are generated from them with
`node plugin/scripts/sync_agents.ts`. During the rebuild
(docs/plans/rebuild.md) the progress truth is `orchestration/state.json`;
docs/plan-register.md and docs/plan.md are rendered from it, and the
Backlog, Cost log, Ruling register and Project model are frozen. The
old dispatch loop is suspended. **Work on a plan node goes through the
orchestration service's task loop** (`task_next`, `task_open`,
`task_close`; the service's own instructions give the protocol when a
session connects, and docs/plans/rebuild.md, "The loop and the
close-out", specifies it). The service is the only writer of
`orchestration/state.json`, `orchestration/journal.jsonl`,
docs/plan-register.md and docs/plan.md: never edit those four (a pull
request that does fails the checks), and the service refuses a change
to a node or a decision that is not under an open task. Never merge a
pull request by hand that a task carries, because the
service merges it when the result is accepted. A session start hook
(`.claude/hooks/session-start.sh`) fetches `origin/main`, fast-forwards
a clean checkout on `main`, and prints the tasks on offer: tell the
person that list before starting, and anything it says could not be
brought up to date. The founding plan is
docs/plans/orchestrator-v1.md.

## Conventions

- All agent execution surfaces must bill to the owner's Claude
  subscription, never API credits (standing constraint; see the
  founding plan).
- methodology-tools (`mtool`) is upstream: the Auditor role complies
  with whatever it determines.

## Pointers

- docs/classification.md — the binding declaration
- docs/process/README.md — the orchestration process spec (v1)
- docs/open-risks.md — risk register (orchestration failure modes)
- docs/backlog.md — what is done and what is next
- docs/plans/orchestrator-v1.md — the founding plan
