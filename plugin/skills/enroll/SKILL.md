---
name: enroll
description: Enroll this methodology-managed project for orchestration - add the custom-definition citations to its Classification, seed the Plan register from its active plan, create the Cost log and run journal. Use when the owner asks to enroll or onboard a project.
---

Enroll the current project per the process spec
(majodali/project-orchestrator `docs/process/`). Enrollment is an
owner decision — confirm it before writing anything.

1. **Classification.** The project needs `docs/classification.md`
   (methodology skeleton if absent — that is a bigger conversation
   with the owner, not a silent scaffold). Add to its Custom
   definitions section, by citation (methodology Article 7,
   definition-by-citation):
   - **Plan register** — cites the spec's `docs/process/plan-register.md`
   - **Cost log** — cites the spec's `docs/process/cost-log.md`
   - **Run journal** (artifact) — cites the spec's `docs/process/observability.md`
   - **Ruling register** — cites the spec's `docs/process/rulings.md`
     (create `docs/rulings.md` empty with its header; first entries
     land at the project's first gate)

   Cite by URL (https://github.com/majodali/project-orchestrator/
   blob/main/docs/process/...) except in the spec repo itself, where
   relative links serve. Recommend (SHOULD, not silently do):
   declaring the node lifecycle's stage set as the project's
   methodology Workflow — it makes Backlog stage designations
   methodology-audited state.

2. **Seed the Plan register** (`docs/plan-register.md`). Seeding the
   hierarchy from the project's existing plans is Planner judgment:
   spawn the **planner** agent with the active plan documents and
   Backlog as its packet, have it propose the initial tree (feature-
   first; stages honestly reflecting current state), and put the
   proposal to the owner before writing. Node IDs: `P<n>-N<seq>`,
   issued in creation order, stable forever. Ensure every non-done
   node not being executed immediately has a Backlog entry
   referencing its ID.

3. **Create the Cost log** (`docs/cost-log.md`): the 9-column table
   from the spec, empty, with a note that work before enrollment
   predates the log.

4. **Create the run journal** (`orchestration/journal.jsonl`) with a
   first `gate-crossed` event recording the enrollment decision.

5. **Enable the plugin for every session surface**: add to the
   project's `.claude/settings.json` (create it if absent, merging
   with any existing content):

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

   The `/plugin` command is terminal-only; this checked-in file is
   what makes the plugin load in Claude Code on the Web and cloud
   sessions (installed at session start), and it serves local
   sessions equally.

6. **Verify and commit**: run
   `node "${CLAUDE_PLUGIN_ROOT}/scripts/form_check.ts"` (Node
   >=22.18.0, or >=23.6.0 on the 23.x line) — it must pass clean; fix
   what it flags before committing. One commit, documentation
   together with the change (methodology W-003), Backlog entry
   included.
