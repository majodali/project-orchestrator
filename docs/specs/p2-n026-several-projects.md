# Several projects and repositories in one instance: specification (P2-N026)

Status: specified (T232, 2026-11-22). Specifies
[the plan](../plans/p2-n026-several-projects.md), which stands as
written except where "Corrections to the plan" says otherwise. Reader:
the sessions that build and verify this node's children, and the
owner. It assumes the plan, [how we work](../process/how-we-work.md)
and the [state model](../process/state-model.md).

## Asks

No asks. The plan's two are answered: D140 A, the pilot joins this
deployment; D141 A, P2-N048 waits on the child that puts the
repository on a node, which is child 2 here.

What it adds: the code seam each design touches, named file by file;
the plan's 20 criteria allocated to six children; and nine findings.

## Where the code stands

Read in majodali/project-orchestrator-service at
`6df90e96cde1274d0353f64a1f7015494770bf4a`, the default branch on
2026-11-22; this repository pins the service at
`cc2bc1485d04b351f342d88bf3716396f2edd8bc`, the commit the plan step
read, so the pin already trails `main`. The plan's "What the code does
today" holds. Nine findings refine it.

- **F1. The project literals in `src/` are four, not three.** Design 1
  removes two, `DEFAULT_PROJECT = "majodali/project-orchestrator"`
  (`src/githubAppConfig.ts:26`, `src/serviceInfo.ts:53`). The third is
  the importer's `/project-orchestrator-service/` match
  (`src/model/importState.ts:303`), which the plan found. The fourth
  is `PREVIEW_REPO = "project-orchestrator"`
  (`src/view/fixtureReader.ts:34`), the name the view's preview
  fixtures answer under: preview wiring, not the request path. Every
  other such string in `src/` is the service's own name — user agent,
  MCP server name, `WWW-Authenticate` realm, view cookie key label —
  not a managed project's, so D067 does not reach them.
- **F2. The clients are reached through five getters.**
  `getDefaultCommitReader`, `getDefaultGitWriter`,
  `getDefaultPullRequests`, `getDefaultCommitChecks` and
  `getDefaultRegisterFetcher` (`src/planRegister/defaultFetcher.ts`)
  each take an environment and cache one instance at module level.
  Two call sites build a `StateStore` from them per request,
  `src/stateTools.ts:278` and `src/view/routes.ts:307`. Design 2 is
  therefore one signature change — the getters take the resolved
  `owner`/`repo` and key their cache by it — and those two sites.
- **F3. `loadGithubAppConfig` carries three things design 2 removes.**
  It requires `GITHUB_APP_INSTALLATION_ID` and returns `owner` and
  `repo` from `MCP_PROJECT`. After design 2 it loads App credentials
  only, its `missing` list loses the installation variable, and the
  repository arrives as an argument. `GithubAppNotConfiguredError`'s
  message, which names owner action O3, stays.
- **F4. `task_close` defaults a branch's repository to the project**
  (`src/stateTools.ts:828`, `repo: input.repo ?? state.project`). Once
  a node carries `repository` that default is wrong for a node whose
  work is elsewhere: the service would look for the pull request in
  the coordinating repository.
- **F5. The view needs no cookie change.** The cookie is issued with
  `Path=/view` (`src/view/viewAuth.ts:105`) and `isViewPath` matches
  every path under `/view/` (`src/view/routes.ts:141`), so one cookie
  covers the project pages unchanged. What pins the paths at a fixed
  depth is `acceptsPost`'s two regexes (`src/view/routes.ts:130-131`),
  `^/view/decision/[^/]+/close$` and `^/view/node/[^/]+/action$`.
- **F6. P2-N037 is done**, so the plan's dependency of the view child
  on it, and the risk naming it, are both spent.
- **F7. The `repositories` list in `orchestration/orchestrator.json`
  has a reader.** `plugin/scripts/lib/orchestrate.ts` validates it
  (265-290), refuses to run when it omits the state file's project
  (602), and routes by it in `repositoryOf` (832-845). Criterion 12 is
  therefore work in this repository, not only a deletion from a
  settings file. P2-N049 retires that script but waits on P2-N048, so
  child 3 re-points `repositoryOf` rather than waiting.
- **F8. `docs/process/how-we-work.md` stands at exactly 200 lines**,
  criterion 19's ceiling, so the sentence about a project's own
  endpoint path replaces a line there rather than being added to one.
- **F9. The smoke test calls the bare path.**
  `scripts/smoke-test.sh:78` posts to `${BASE_URL}/mcp` and its check
  3 calls `plan_read`. It keeps working under criterion 5 and moves to
  a project path in child 6.

## Settled at specification depth

**S1. The project list.** `MCP_PROJECTS` is a comma-separated list of
`owner/repo`, each item trimmed and matching `^[\w.-]+/[\w.-]+$`.
Order is significant: the first item is what the bare `/mcp` path
serves until child 6. A duplicate item, a malformed item, an empty
list and an absent list are each a refusal naming what was required
and what was found (RU-013), and no call is served. `MCP_PROJECT` is
accepted as the spelling of a list of one; set together with
`MCP_PROJECTS` and disagreeing, every call is refused naming both. The
template parameter and the deploy-script variable are renamed to
match, with no default value.

**S2. Resolving the path.** `/mcp/:owner/:repo` resolves before the
transport is built. It passes into `createMcpServer`, through
`registerStateTools`, to the `store()` closure of F2, so no tool reads
the project from the environment. A path outside the list is refused
before any client is built, so no token is minted and nothing is read;
the refusal names the path and that it is not served, never a token
and never the other projects. `service_identity` answers the project
the path resolved to.

**S3. The field and the schema version.** `nodeSchema` gains
`repository`: a string matching `^[\w.-]+/[\w.-]+$`, or null for the
project's coordinating repository, defaulting to null, so every node
that exists today is valid unchanged. `SCHEMA_VERSION` stays 0: the
field is additive and `z.object` strips what it does not declare, so a
`plan-state` pinned before the change reads a file carrying the field
and renders without it. Hence the order of criterion 20: merge and
deploy, then move each project's pin, then the first write that sets
the field.

**S4. The repository filter.** `candidates(state, role?)`
(`src/model/loop.ts`) gains a second optional filter. With a
repository given it keeps only candidates whose node resolves to it —
the node's `repository`, or `state.project` when null — and with none
given it answers every candidate, as today. `task_next` and
`task_open` each take an optional `repository`.
`SERVER_INSTRUCTIONS` (`src/stateTools.ts`) gains one sentence: a
session passes the repository it is working in, and `task_next`
answers only that repository's steps. Nothing else there changes.

## The constraints every child carries

The plan's criteria 16, 17 and 18. Each child is verified against
these as well as its own list. **C-a.** No code in `src/` branches on
a project name (D067); a project literal left there is named, in the
pull request, with the reason it stays (F1). **C-b.** The write
allowlist in `src/model/store.ts` is unchanged at five paths, and a
write for one project touches only those five paths of that project's
repository. **C-c.** No model inference runs in the service, and no
token appears in git, in a log or in a refusal message.

## The children

Six, in place of the plan's four, by its own rule: "Where the second
commit must wait on the first — a pin move after a deploy — the plan
makes it its own node." Each child writing to another repository
starts on the owner's approval (RU-016).

### 1. The project on the endpoint path

Designs 1 and 2, S1 and S2. In majodali/project-orchestrator-service.
Waits for nothing. Starts on approval.

1. One deployment answers `service_identity` for two projects:
   `/mcp/majodali/project-orchestrator` and
   `/mcp/majodali/methodology-tools` each answer their own project, at
   the same service commit (plan 1).
2. `plan_read` through each path answers that project's own
   `orchestration/state.json` at a commit of that repository (plan 2).
3. A path naming a repository outside the list is refused, nothing is
   read, no token is minted, and the refusal names neither a token nor
   the other projects (plan 3, S2).
4. A deployment with no list, with a malformed or duplicated item, or
   with `MCP_PROJECT` and `MCP_PROJECTS` disagreeing, refuses every
   call naming what was required and what was found (RU-013); both
   `DEFAULT_PROJECT` constants are gone (plan 4, S1, F1).
5. `/mcp` with no project segment serves the list's first project
   (plan 5).
6. The five getters of F2 are keyed by repository, the installation is
   resolved per repository through the App, and
   `GITHUB_APP_INSTALLATION_ID` is gone from the code, the template
   and the deploy script (plan 6, F2, F3).
7. A call for a repository the App is not installed on fails naming
   that repository and the missing installation, and no other
   repository's call is affected (plan 7).
8. The service's `docs/runbook.md` says how a project is added: the
   list parameter, the App installation, and the state file first,
   because check 3 of `scripts/smoke-test.sh` calls `plan_read`
   (plan 20, F9).
9. The owner merges the pull request, that merge deploys, and criteria
   1 to 3 are recorded against the deployed commit.

### 2. The repository on a node

Design 3, S3 and S4, in the service. In
majodali/project-orchestrator-service. After child 1. Starts on
approval.

1. `nodeSchema` carries `repository`, `owner/name` or null for the
   coordinating repository, defaulting to null, and `SCHEMA_VERSION`
   stays 0 (plan 8, S3).
2. A state file validates and renders both with the field absent and
   with it set, and `plan-state check` passes over both (plan 8).
3. `task_next` with a repository answers only candidates resolving to
   it, and every candidate without one, with tests over the trial's
   two cases: a first-in-line step in the asking repository, and one
   in another repository passed over (plan 9, D129, S4).
4. `task_open` refuses a node whose resolved repository is not the one
   the claim names, saying which repository it belongs to (plan 10).
5. `task_close` defaults a branch's repository to the node's
   `repository`, and to `state.project` only when it is null (F4).
6. The renderings of `docs/plan.md` and `docs/backlog.md`, and the
   view's node page, print a node's repository when it is not the
   coordinating one and nothing when it is (plan 11).
7. `SERVER_INSTRUCTIONS` says a session passes its repository and
   `task_next` answers only that repository's steps (S4).
8. The owner merges the pull request and that merge deploys.

### 3. The node's repository in this project

Design 3 in this repository: the pin, the settings file and the one
reader of its node lists. In majodali/project-orchestrator. After
child 2. Starts automatically.

1. `package.json`'s `project-orchestrator-service` pin names child 2's
   merged commit, and `npm run check`, `npm test`, `npm run lint` and
   `npm run format` are green (plan 20).
2. This project's `orchestration/state.json` passes `plan-state check`
   with the field set on at least one node, and the renderings are
   current (plan 8, plan 11).
3. `orchestration/orchestrator.json` no longer lists node identifiers
   per repository (plan 12).
4. `repositoryOf` in `plugin/scripts/lib/orchestrate.ts` reads the
   node's `repository`, falling back to `state.project`; the
   settings-file validator and the project check no longer read a
   `repositories` key; `test/orchestrate.test.ts` covers both
   (plan 12, F7).
5. `docs/process/state-model.md` carries the field in its data model
   and says what null means (plan 19).
6. The nodes the retired list named — P2-N032, P2-N037, P2-N038,
   P2-N039, P2-N040 and P2-N041 — carry
   `majodali/project-orchestrator-service` in the field, written under
   this child's own task (plan 12).

### 4. The view over several projects

Design 4. In majodali/project-orchestrator-service. After child 1, and
not after P2-N037, which is done (F6). Starts on approval.

1. `/view` indexes the deployment's projects, one row each with its
   offered, in-flight and waiting-on-the-owner counts and a link to
   its tree (plan 13).
2. `/view/<owner>/<repo>` and its node, task and form paths serve each
   project, and `acceptsPost`'s two regexes match at the new depth
   (plan 14, F5).
3. The old `/view`, `/view/node/:id` and `/view/task/:id` redirect to
   the first project's paths (plan 14).
4. One view cookie covers every project, with no change to how it is
   issued (plan 14, F5).
5. A decision answered or a hold lifted in one project's view commits
   to that project's repository alone, with its journal line there
   (plan 15).
6. The owner merges the pull request and that merge deploys.

### 5. The pilot on this deployment

The owner's D140, answer A. In majodali/methodology-tools. After
child 1. Starts on approval.

1. `.mcp.json` there names `/mcp/majodali/methodology-tools`, with the
   bearer header and the 30000 timeout unchanged and no token in the
   file.
2. A session started in that repository calls `service_identity` and
   it answers `majodali/methodology-tools`.
3. `plan_read` there answers that repository's own
   `orchestration/state.json` (P4-N045).
4. `docs/process/how-we-work.md`, "Enlisting a repository", says a
   project's `.mcp.json` names its own project path, and the file
   stays at or below 200 lines (plan 19, F8).

### 6. The bare endpoint path retired

In majodali/project-orchestrator-service, with an accompanying pull
request in majodali/project-orchestrator. After child 5. Starts on
approval.

1. This repository's `.mcp.json` names
   `/mcp/majodali/project-orchestrator`, merged before the service
   change.
2. The `/mcp` route with no project segment is gone, and a call to it
   is refused naming that a project path is required.
3. `scripts/smoke-test.sh` calls a project path and its four checks
   pass against the deployed commit (F9).
4. No enlisted `.mcp.json` names the bare path, and
   `docs/mcp-enlistment.template.json` carries a project path.
5. The owner merges the pull request and that merge deploys.

## Corrections to the plan

- Its child 2 becomes children 2 and 3, and its child 4 becomes
  children 5 and 6, on its own rule about a second commit.
- The view child waits only on child 1; the dependency on P2-N037 and
  the risk naming it are spent (F6).
- Criterion 1 names majodali/methodology-tools, so the plan's owner
  actions O1, the App installed there, and O2, the project list, come
  before child 1 is verified, not before the pilot child. The merge of
  each service pull request stays the owner's and is the deploy:
  children 1, 2, 4 and 6.
- Criterion 12 is work in this repository, not a deletion only (F7);
  criterion 16 reaches a fourth literal (F1); and criterion 19 splits
  between children 3 and 5 (F8).

## Terms introduced

No terms introduced. "Project path" is the plan's term and keeps its
meaning: the `/<owner>/<repo>` segment of an endpoint that names which
project a call is for.
