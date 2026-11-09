# project-orchestrator

The software engineering project orchestrator for the majodali
portfolio: a process specification and Claude Code plugin that
coordinate role-based agent sessions working on portfolio projects
under [majodali/methodology](https://github.com/majodali/methodology).

Its two goals, in order:

1. **Streamline and standardize development** — every managed project
   moves through the same node lifecycle, with the same roles and
   handoff contracts, all fully methodology-compliant.
2. **Spend less** — each role runs on the least expensive model tier
   and the smallest context that does the job, with per-task cost
   recording to drive continual improvement.

The process specification under `docs/` is authoritative; the plugin
and any tooling are built artifacts implementing it (methodology
Constitution, Article 3).

## Where the documentation lives

- [docs/classification.md](docs/classification.md) — the binding
  declaration (C1 / S0, pinned methodology 1.6.0)
- [docs/process/](docs/process/README.md) — the orchestration
  process specification (v1)
- [plugin/](plugin/README.md) — the Claude Code plugin implementing
  it (`/plugin marketplace add majodali/project-orchestrator`)
- [docs/plan.md](docs/plan.md) — the plan as a person reads it:
  what waits on the owner, what is ready, every node with its
  outcome. Rendered from `orchestration/state.json`, the state file
  that is the progress truth during the rebuild
  ([docs/plans/rebuild.md](docs/plans/rebuild.md))
- [docs/backlog.md](docs/backlog.md) — frozen 2026-11-09; becomes a
  rendering of the state file at the rebuild's milestone 6
- [docs/plans/orchestrator-v1.md](docs/plans/orchestrator-v1.md) — the
  founding plan
