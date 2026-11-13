# orchestrator — the plugin

The Claude Code package of this repository's role agents, hooks and
scripts. Sessions work through the orchestration service's task loop;
this package carries the roles that take its steps.

## Install

Local terminal sessions:

```
/plugin marketplace add majodali/project-orchestrator
/plugin install orchestrator@project-orchestrator
```

Claude Code on the Web / cloud sessions do not support the `/plugin`
command; there the plugin is enabled by checked-in settings instead —
`.claude/settings.json` in the project declares the marketplace and
enables the plugin, and cloud sessions install it at session start:

```json
{
  "extraKnownMarketplaces": {
    "project-orchestrator": {
      "source": {"source": "github", "repo": "majodali/project-orchestrator"}
    }
  },
  "enabledPlugins": {
    "orchestrator@project-orchestrator": true
  }
}
```

This repo carries that file itself; managed projects use the same
`github` source. The file serves local sessions too — no `/plugin`
commands needed anywhere once it is committed.

**`.claude/agents/` is primary (Risk R9, closed by owner ruling
2026-08-26).** The checked-in agents are the path that actually
loads; the plugin has never been observed loading. So
`.claude/agents/` holds the source of truth and this package's
`agents/` is generated from it. After editing a role, run
`node plugin/scripts/sync_agents.ts` (`--check` verifies without
writing).

## Components

- **Agents** (`agents/`): the three roles of the orchestration
  service's task loop, each opening with `task_open` and closing with
  `task_close`: `planner` (claude-opus-5; the `plan`, `specify` and
  `break down` steps), `implementer` (claude-sonnet-5; `execute`) and
  `reviewer` (claude-opus-5; `verify` on a check node). The loop is
  specified in [`docs/plans/rebuild.md`](../docs/plans/rebuild.md),
  "The loop and the close-out".
- **Skills** (`skills/`): `/orchestrator:journal-tail` (the owner's
  feed).
- **Scripts** (`scripts/`): `session_start.ts` (the session start
  hook: brings the checkout up to date and gives the plan's brief),
  `task_cost_hook.ts` (measures a task's cost when `task_close`
  returns), `sync_agents.ts` (mirrors `.claude/agents/` into this
  package), `form_check.ts` (the old process's form checks, runnable
  by hand over the frozen documents), `journal_tail.ts`,
  `billing_check.sh`. The TypeScript scripts need Node >=22.18.0, or
  >=23.6.0 on the 23.x line.
- **Hooks** (`hooks/hooks.json`): a SessionStart warning when
  `ANTHROPIC_API_KEY` is set (Risk R7: it would silently bill API
  credits instead of the subscription). The session start hook and
  the task-cost hook are registered in this repository's
  `.claude/settings.json`, not here.

## Archived

Archived on 2026-11-13 (P4-N023, Role agents on the task loop), each
with a status line saying what replaced it:

- The `orchestrator`, `auditor` and `semantic-auditor` roles, in
  [`docs/archive/roles/`](../docs/archive/roles/). No session runs a
  dispatch loop: sessions take work from the service.
- The `orchestrate` and `enroll` skills, in
  [`docs/archive/skills/`](../docs/archive/skills/). Enlistment steps
  go in the "how we work" page (P4-N024, Pruned document set).
