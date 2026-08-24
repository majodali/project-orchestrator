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
  declaration (C1 / S0, pinned methodology v1.2.0)
- [docs/backlog.md](docs/backlog.md) — what is done and what is next
- [docs/plans/orchestrator-v1.md](docs/plans/orchestrator-v1.md) — the
  founding plan
