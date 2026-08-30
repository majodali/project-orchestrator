# orchestrator — the plugin

The built artifact implementing the orchestration process
specification in [`docs/process/`](../docs/process/README.md). The
spec is authoritative; where this plugin and the spec disagree, the
spec is right and the plugin has a bug (methodology Constitution,
Article 3).

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
2026-08-26).** Across four trials on two surfaces the checked-in
agents are the path that actually loads; the plugin has never been
observed loading. So `.claude/agents/` holds the source of truth and
this package's `agents/` is generated from it — after editing a role,
run `node plugin/scripts/sync_agents.ts` (`--check` verifies
without writing). The plugin remains a faithful package of the same
role contracts, for surfaces where it does load. When the plugin's
skills are unavailable in a session,
everything remains reachable in plain language: the scripts run
directly (`node plugin/scripts/form_check.ts`,
`journal_tail.ts` — Node >=22.18.0, or >=23.6.0 on the 23.x line),
and an orchestration session is started by asking
the session to run the dispatch loop per `docs/process/dispatch.md`
with your approved scope — the mirrored agents give it the roles to
dispatch.

## Components

- **Agents** (`agents/`) — the role contracts of
  [`roles.md`](../docs/process/roles.md) as subagents, each pinned to
  its tier's exact model: `orchestrator` (claude-haiku-4-5, runs the
  dispatch loop and spawns the other roles), `planner`
  (claude-opus-5), `implementer` (claude-sonnet-5), `reviewer`
  (claude-opus-5), `auditor` (claude-haiku-4-5, form runs),
  `semantic-auditor` (claude-opus-5, sparse). Changing a model
  binding here follows a change to the spec's tier table, never
  precedes it.
- **Skills** (`skills/`) — `/orchestrator:orchestrate` (run a
  session: scope → dispatch loop → gate summary),
  `/orchestrator:enroll` (onboard a project),
  `/orchestrator:journal-tail` (the owner's feed).
- **Scripts** (`scripts/`) — `form_check.ts` (the deterministic
  invariants of [`auditing.md`](../docs/process/auditing.md); run
  directly anytime: `node plugin/scripts/form_check.ts`),
  `journal_tail.ts`, `sync_agents.ts` (mirrors `.claude/agents/` into
  this package — see above), `billing_check.sh`.
- **Hooks** (`hooks/hooks.json`) — SessionStart warning when
  `ANTHROPIC_API_KEY` is set (Risk R7: it would silently bill API
  credits instead of the subscription).

## Shape notes

- The dispatch loop runs in the frugal-tier `orchestrator` subagent,
  spawned by the `orchestrate` skill; role sessions are subagents it
  spawns in turn. The Orchestrator is the single writer of the Plan
  register, Cost log, and run journal.
- Role prompts restate their contracts from the spec so each role
  session is self-contained; that duplication is build output, not a
  second authority.
