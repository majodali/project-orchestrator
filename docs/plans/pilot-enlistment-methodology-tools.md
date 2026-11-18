# Pilot enlistment of methodology-tools

Status: active (broken down on 2026-11-17, task T168 on P4-N027; the
owner approved the node's start on 2026-11-16 and said on 2026-11-17
to start it when ready)

Reader: the owner, and any session doing one of the five children
below. It assumes this repository's README and
[how we work](../process/how-we-work.md). The node this plans is
child 6 of milestone 6 of the [rebuild](rebuild.md), P4-N027, whose
outcome and settled decisions stay there.

The pilot runs on a second deployment of the service for
majodali/methodology-tools (D067). One instance must later serve
several projects (P2-N026), which retires that second deployment, so
nothing here makes it permanent and no code branches on the project.

## The order, and the two things that force it

The four children run in a chain. Each dependency is real (RU-018);
the chain comes from two facts the node's criteria in
[the rebuild plan](rebuild.md) do not state.

1. **`plan-state import` cannot read methodology-tools today.** The
   importer requires `docs/plan-register.md` and exits 1 without it
   (`src/model/cli.js`, the `import` command). methodology-tools has
   no Plan register: its plan is its K-004 Backlog,
   `docs/backlog.md`, 21 rows, 4 of them open. So the importer gains
   a Backlog reader (child 1, P4-N044) before the import (child 2,
   P4-N045). The alternative — hand-writing a Plan register for
   methodology-tools and importing that — was rejected: it
   hand-authors the plan in the format this rebuild retired, and the
   node's criterion asks for an import record over Backlog rows.
2. **The second instance cannot be deployed before methodology-tools
   has a state file.** Check 3 of `scripts/smoke-test.sh` calls
   `plan_read`, which reads the project's `orchestration/state.json`
   through the GitHub App. For the second instance that file is
   methodology-tools'. Deploying the second instance before the
   import would fail its smoke test, and the deploy workflow fails
   the whole run when either instance fails, so the first instance
   would not be promoted either. So the import precedes the deploy
   path (child 3, P4-N046).

`.mcp.json` names an endpoint that does not exist until child 3
deploys, so the enlistment and the trial are child 4, P4-N047.

Children 1 to 4 were added on 2026-11-17 by task T168, each entered
`specified` with its criteria section below named in its note. Child
5, P4-N049, was added on 2026-11-18 by task T175 after the review of
child 1 (D097). It waits for nothing and is not in the chain; what
it changes for child 2 is section 5's ask.

No child waits for P2-N032. Each child's task is held by a session
started in this repository, which is the only session that has this
project's tools; commits in another repository go to a helper session
started there, which claims nothing (the P2-N032 pattern). Once
P2-N032 is done, children 1 and 3 may instead be held by a session
started in the service repository, which then commits directly.

## What the owner does, and when

All four actions can be done in one sitting, before any child runs.
Children 2, 3 and 4 carry `start: approve`; each session confirms
the actions it needs are done before it works.

- **O1. methodology-tools in the GitHub App's installation.** The
  App's permissions do not change, and the installation ID does not
  change: one account-level installation serves both repositories.
  Needed before the service merges or reads anything in
  methodology-tools — child 2 onward.
- **O2. The deploy role's policy widened to the second stack.**
  Child 3 writes the exact resources into the service's
  `docs/deploy-role-permissions.md` first, so the text to apply is in
  hand. Needed before child 3's merge, because that merge deploys.
- **O3. `MCP_AUTH_TOKEN` in methodology-tools' cloud environment.**
  No secret is created: the token is the one the first instance
  already uses, and it opens both. Needed for child 4's trial.
- **O4. The merges.** The owner merges in
  majodali/project-orchestrator-service, where a merge deploys the
  live service (children 1, 3 and 5), and in
  majodali/methodology-tools after reviewing the import record
  (children 2 and 4). Each child's
  task closes with this repository's pull request — the ticked
  criteria below — and names the other repository's pull request in
  its summary, the pattern tasks T143 and T144 followed.

## 1. Backlog reader in the state importer (P4-N044)

Outcome: `plan-state import` builds a state file from a project's
K-004 Backlog when that project has no Plan register, and its import
record names every row it did not map and why. Depends on: nothing.
Repository: majodali/project-orchestrator-service (standing, RU-016),
and this repository for the pin.

- [ ] `plan-state import` reads `docs/backlog.md` in the K-004 shape
      (`- [x]` / `- [ ]`, a bolded lead, an em-dash body) when
      `docs/plan-register.md` is absent, and still reads the register
      when it is present. Which files exist decides the source; the
      import record names the source it read.
- [ ] Each row becomes one node: the bolded lead is the title, the
      body's first sentence the outcome, `- [x]` the stage `done` and
      `- [ ]` the stage `identified`.
- [ ] Identifiers are minted in one plan line in Backlog order, and
      the record maps every row to the identifier it received.
- [ ] The heading a row stands under is kept in the node's note, so
      "Completed" and "Upcoming" are not lost.
- [ ] A row that yields no title or no outcome is not mapped, and the
      record lists it with the reason and the counts.
- [ ] A node carries a plan or specification path only when the row
      links a file that exists in the repository (invariant 8).
- [ ] The state file the reader produces passes `plan-state check`
      with no violations.
- [ ] Tests over methodology-tools' Backlog as a fixture: the row count, the
      four open rows, and a malformed row that appears in the record as not
      mapped, on the fixture or on a synthetic row where the fixture has none.
- [ ] The register import is unchanged: the milestone 1 fixtures
      produce the same state file as before.
- [ ] No service code branches on the project name (D067).
- [ ] One pull request in majodali/project-orchestrator-service; the
      owner merges it, and that merge deploys.
- [ ] After that deploy, this repository's
      `project-orchestrator-service` pin moves to the merged commit
      and `npm run check` stays green, so one version of
      `plan-state` serves both projects.

## 2. methodology-tools' plan as a state file (P4-N045)

Outcome: methodology-tools carries `orchestration/state.json`,
imported from its Backlog by `plan-state import` and passing
`plan-state check`, with its hand-written Backlog archived and the
K-003 deviation recorded. Depends on: 1. Repository:
majodali/methodology-tools (new to this project; D065 grants it for
this node only).

- [ ] One pull request brings `orchestration/state.json`, the import
      record, the overrides file if one is needed, and the
      renderings. It is the first and only arrival of the state file
      by hand of a session; from then on the service is its only
      writer.
- [ ] The state file is `plan-state import`'s output, never written
      or edited by hand.
- [ ] Every Backlog row of methodology-tools is a node, or is in the
      import record as not mapped, with the reason.
- [ ] Hand corrections are only in the overrides file, applied last,
      each listed in the record, as at milestone 1.
- [ ] The owner reviews the import record before the merge. The
      implementer's ask names what the record reports as unmapped or
      proposed.
- [ ] `plan-state check` over methodology-tools reports no
      violations, run from the pinned devDependency.
- [ ] methodology-tools' `package.json` gains the `project-orchestrator-service`
      devDependency pinned at a merged commit of the service carrying child 1's
      work and every later child the import needs, with `check` and `render`
      scripts matching this repository's.
- [ ] `docs/backlog.md`, `docs/plan.md` and `docs/plan-register.md`
      in methodology-tools are `plan-state render`'s output.
- [ ] The hand-written Backlog is archived there under
      `docs/archive/`, opening with a status line that says the
      service now renders `docs/backlog.md` and gives the date it was
      frozen.
- [ ] methodology-tools' `docs/classification.md` records the K-003
      deviation and its `CLAUDE.md` Deviations line matches it
      (RU-021: project by project as each adopts the orchestrator).
- [ ] `mtool audit form` and `mtool links check` run over
      methodology-tools after the import. The findings are recorded
      whichever way they fall (RU-019), and each is fixed or
      dispositioned with a stated reason.
- [ ] Nothing else in methodology-tools changes. No `.mcp.json`: the
      endpoint does not exist until child 3.

## 3. Second instance on the deploy path (P4-N046)

Outcome: every merge in the service repository deploys, smoke-tests
and promotes both instances from one template at one commit, and the
runbook and the deploy role's record carry the second instance.
Depends on: 2. Repository:
majodali/project-orchestrator-service (standing, RU-016).

- [ ] The deploy workflow deploys both stacks from the same
      `template.yaml` at the same commit, smoke-tests each against
      its own preprod Function URL, promotes each only on its own
      smoke test, and turns the run red when either fails, so the two
      never run different commits.
- [ ] The two deploys differ only in the stack name and
      `ProjectName` (majodali/methodology-tools). No secret is
      created, and no Actions variable is added other than those two
      values.
- [ ] The second instance shares the first's MCP bearer token and
      view token (the owner, 2026-11-13). The token opens both; the
      endpoint in `.mcp.json` is what ties a session to one
      repository.
- [ ] `scripts/deploy.sh` and `scripts/smoke-test.sh` take each
      instance's values from the environment, as they already do, and
      neither gains a project-specific branch. No code in `src/`
      branches on the project (D067).
- [ ] The path allowlist in `src/model/store.ts` and the GitHub App's
      permissions are unchanged.
- [ ] `docs/runbook.md` gains "Adding an instance": the owner's
      actions, the deploy steps, both endpoints, both view URLs, and
      the order child 2 imposes — check 3 of the smoke test reads the
      project's state file, so the state file comes first.
- [ ] `docs/deploy-role-permissions.md` records the widened policy
      with the exact resources the second stack needs, written before
      the owner applies it.
- [ ] The implementer names O1 and O2 to the owner before the first
      deploy and stops for them.
- [ ] The deploy run that first serves both instances is recorded by
      its number and its result, whichever way it falls (RU-019).
- [ ] Both instances answer `service_identity` with the same service
      commit and their own project name.
- [ ] The owner merges the pull request; that merge is the deploy.

## 4. The pilot's first task through its own instance (P4-N047)

Outcome: a session started in methodology-tools reaches the pilot
instance, `task_next` answers a node of methodology-tools, and one
write commits there as the GitHub App with its journal line. Depends
on: 3. Repositories: majodali/methodology-tools (D065) and this one.

- [ ] `.mcp.json` at methodology-tools' root names the second
      instance's endpoint, with the header
      `"Authorization": "Bearer ${MCP_AUTH_TOKEN}"` and a `timeout`
      of 30000. No token is committed, pasted or logged.
- [ ] `.claude/settings.json` there sets
      `enableAllProjectMcpServers` to true and registers no hook. The
      session start hook and the task-cost hook are P2-N006 (RU-017).
- [ ] O3 is done before the trial: `MCP_AUTH_TOKEN` is set in
      methodology-tools' cloud environment.
- [ ] `service_identity` through that endpoint answers
      majodali/methodology-tools and the deployed service commit.
- [ ] `task_next` through the second instance answers a node of
      methodology-tools.
- [ ] One write through it commits to methodology-tools as the App,
      and `orchestration/journal.jsonl` there carries its line.
- [ ] The trial advances no node's stage and leaves methodology-tools'
      plan in a state the owner clears in one action. Default: open a
      task for a `plan` step and close it `blocked`, saying the trial
      is the pilot's and the adoption is P2-N006; the owner lifts the
      hold in the pilot's view.
- [ ] The trial is recorded here: the session, the node answered, the
      commit, the journal line, and what the owner had to clear.
- [ ] Each of the four things "Enlisting a repository" lists is true
      for methodology-tools, or that page says which this node leaves
      to P2-N006.
- [ ] Every step of "Enlisting a repository" in
      `docs/process/how-we-work.md` that children 2, 3 and 4 found
      wrong or incomplete is corrected in that page, stated as what
      was wrong and what now stands. The page stays at or below 200
      lines (P4-N024's bound).
- [ ] No hook and no adoption of the loop by methodology-tools'
      own sessions lands in that repository (RU-017, P2-N006).

## 5. State directory created by the importer (P4-N049)

Outcome: `plan-state import --write` creates the `orchestration/`
directory when the target repository has none, instead of failing
with ENOENT. Depends on: nothing. Repository:
majodali/project-orchestrator-service (standing, RU-016), and this
repository for the pin.

The reviewer of child 1 found it (T174, raised as D097):
`writeFileSync` creates no directory, so the `--write` branch of the
`import` command in `src/model/cli.ts` throws where the target has
no `orchestration/`. Such a target is legitimate — the import needs
only `docs/plan-register.md` or `docs/backlog.md` — and
methodology-tools is one. `render --write` has four writes of the
same shape, reached only when the state file is already there. Those
six are the service's only filesystem writes; the running service
writes through git as the App.

- [ ] `plan-state import --repo <path> --write` over a repository
      with `docs/backlog.md` and no `orchestration/` creates the
      directory, writes both files, and exits on the import's own
      result.
- [ ] Each write in `src/model/cli.ts` creates its target's parent
      directory first, through one shared helper: the two of
      `import` and the four of `render`.
- [ ] Without `--write` nothing is created, and over a repository
      that has `orchestration/` the import writes what it writes now.
- [ ] A test drives the command over a temporary repository with no
      `orchestration/`, in the `mkdtempSync` and `spawnSync` pattern
      of `test/prepareScript.test.ts`, and fails against the code as
      it stands.
- [ ] No service code branches on the project name (D067), and the
      path allowlist in `src/model/store.ts` is unchanged.
- [ ] One pull request in majodali/project-orchestrator-service; the
      owner merges it, and that merge deploys.
- [ ] After that deploy, this repository's
      `project-orchestrator-service` pin moves to the merged commit
      and `npm run check` stays green.

## What this plan does not cover

- **Adoption of the loop by methodology-tools' sessions**, with the
  session start hook and the task-cost hook: P2-N006, which waits for
  P4-N027 and needs its own repository grant (D065 covers this node
  only).
- **One instance serving several projects**: P2-N026, which retires
  the pilot's separate instance.
