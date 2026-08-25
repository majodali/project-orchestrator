# CLAUDE.md

## Methodology — binding

This project follows majodali/methodology v1.3.0 as declared in
docs/classification.md. That file strictly defines this project's
document lifecycles and workflows. Read it before any work; nothing
in this file or under .claude/ overrides it.

Classification: C1 / S0 / component-library / none-local
Deviations: none

## What this project is

The majodali project orchestrator: a process specification and Claude
Code plugin that coordinate role-based agent sessions working on
portfolio projects under the methodology, standardizing development
and minimizing model and context cost.

## Build / run / test

Documentation only so far; no build. `mtool` (methodology-tools) runs
form audits and link checks over this tree.

## Architecture at a glance

`docs/` holds the authoritative process specification; the plugin
under `.claude/` (future) is a built artifact implementing it. The
founding plan is docs/plans/orchestrator-v1.md.

## Conventions

- All agent execution surfaces must bill to the owner's Claude
  subscription, never API credits (standing constraint; see the
  founding plan).
- methodology-tools (`mtool`) is upstream: the Auditor role complies
  with whatever it determines.

## Pointers

- docs/classification.md — the binding declaration
- docs/process/README.md — the orchestration process spec (v1)
- docs/backlog.md — what is done and what is next
- docs/plans/orchestrator-v1.md — the founding plan
