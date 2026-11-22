# Several projects and repositories in one instance (P2-N026)

Status: specified (T232, 2026-11-22) by
[the specification](../specs/p2-n026-several-projects.md), which cuts
these criteria across six children and corrects this file where it
says so. Child of
[the orchestration service](orchestration-service.md), P2-N001.

Reader: the owner, and the sessions that break down, build and verify
this node. It assumes [how we work](../process/how-we-work.md), the
[state model](../process/state-model.md) and the
[fired-session design](p2-n046-service-fired-sessions.md).

## Outcome

One deployment of the service serves several projects, each named by
its own endpoint path and state file, and knows which repository every
offered step belongs to, so a session reaches only its own project and
repository.

## Why

Three things wait on this. **P2-N051**, the scratch project, needs its
own repository and state file (D133). **methodology-tools** carries
its state file already (P4-N045, done) and needs an instance; its
plan is a second deployment, P4-N046 then P4-N047, both holding the
owner's approval and neither started. **P2-N048**, the fire in the
service, cannot route a session without knowing which repository an
offered step belongs to: its note records the trial's two misclaims,
T216 passing over work in its own repository and T219 claiming work in
a repository it was not fired for (D129).

The owner moved this node ahead of the scratch project on 2026-11-21
("I'd also like to move forward with making the service multi-project
before the scratch project test"), so it waits for nothing.

## What the code does today

Read in majodali/project-orchestrator-service at cc2bc148.

1. **One project is built in by one environment variable.**
   `MCP_PROJECT` is split into owner and repository by
   `loadGithubAppConfig` (`src/githubAppConfig.ts`), which every read
   and write is configured from, and is reported by
   `getServiceIdentity` (`src/serviceInfo.ts`). Both hold
   `DEFAULT_PROJECT = "majodali/project-orchestrator"`, so a
   deployment with it unset serves this project silently, and
   `template.yaml`'s `ProjectName` and `scripts/deploy.sh`'s
   `PROJECT_NAME` default to the same string.
2. **The clients are one per deployment, not one per repository.**
   `src/planRegister/defaultFetcher.ts` caches at module level one
   reader, git writer, pull request client, commit-check reader and
   installation-token provider, all from that one configuration. The
   reader and writer take `(owner, repo, tokenProvider)` at
   construction, so the repository is fixed there, and
   `createInstallationTokenProvider` mints a token for the one
   `GITHUB_APP_INSTALLATION_ID`.
3. **A call names its project only by which deployment it reaches.**
   `src/httpApp.ts` registers one route, `app.all("/mcp", …)`, behind
   one `MCP_AUTH_TOKEN` (`src/auth.ts`). P4-N046's criteria already
   settle that one token opens every instance and that "the endpoint
   in `.mcp.json` is what ties a session to one repository".
4. **The view serves one project.** `/view`, `/view/node/:id`,
   `/view/task/:id` and the two form routes read the state file at a
   commit through that same single reader, behind one view cookie.
5. **The state file already names its project.** `stateSchema.project`
   is "the managed repository, `owner/name`" (`src/model/schema.ts`),
   and `task_close` defaults a branch's repository to it
   (`src/stateTools.ts`, `repo: input.repo ?? state.project`).
6. **A node does not name its repository.** `nodeSchema` has no such
   field, and `candidates(state, role)` (`src/model/loop.ts`) filters
   by role alone. `orchestration/orchestrator.json` here carries a
   `repositories` list of node identifiers per repository, six today,
   kept by hand. `WRITABLE_PATHS` (`src/model/store.ts`) is five
   paths, checked on every write, and names no project.

**A finding.** `src/model/importState.ts` matches an import record's
text against `/project-orchestrator-service/` to pick a pull request's
repository — a project-name literal in service code, which D067
forbids. It is in the importer, run by hand, not in the request path,
so nothing here depends on it; child 2 either parameterises it or
records why it stays.

## Design

### 1. The project on the endpoint path

`/mcp/<owner>/<repo>` names the project, resolved before any tool
runs. A deployment parameter, `MCP_PROJECTS`, lists the projects it
serves; `MCP_PROJECT` stays accepted as the spelling for a list of
one. The list, not the request, decides which repositories the App's
token may be used on: a path outside it is refused and nothing is
read. Both `DEFAULT_PROJECT` constants go, so a deployment with no
list refuses every call, naming what was required and what was found
(RU-013). The list is deployment configuration, not state: a file in a
repository would need a project to bootstrap from.

`service_identity` answers the project the path resolved to, so an
enlistment is confirmed by the call the process already prescribes.

`/mcp` with no segment keeps meaning the list's first project, so
every repository enlisted today keeps working while its `.mcp.json`
is changed one pull request at a time. Child 4 removes the bare path
once no enlisted file still uses it.

Rejected: a `project` argument on each tool, because a model would
choose it and P2-N048's note records sessions misjudging exactly that;
a token per project, because the owner would mint and rotate one more
secret per project and P4-N046's criteria already share the token.

### 2. Credentials per repository

The reader, writer, pull request client and commit checks are keyed by
`owner/repo` in one bounded map, built on first use. The installation
is resolved per repository through the App
(`GET /repos/{owner}/{repo}/installation`) and its token cached per
installation, so a repository new to a project needs no deploy and
`GITHUB_APP_INSTALLATION_ID` goes. A repository the App is not
installed on fails its own call, naming the repository and the
missing installation; no other repository's call is affected.

### 3. The repository on a node

`nodeSchema` gains `repository`: `owner/name`, or null for the
project's coordinating repository, so every node that exists today is
correct unchanged. It names the repository a node's work is claimed
from and its own pull request opened in — not necessarily a project:
majodali/project-orchestrator-service is a repository this project's
nodes work in and has no state file of its own. The planner sets it at
`plan` or `specify`.

`task_next` and `task_open` take a repository. `task_next` answers
only the candidates whose repository is the one asked for, and every
candidate when none is given, as today; `candidates` gains the second
filter. `task_open` refuses a node whose repository is not the one the
claim names. A fired session passes the repository its scheduled task
is for, so neither misclaim of the trial by hand can repeat.

A node whose criteria need a commit in a second repository keeps one
repository: the session holding the task opens the second pull request
too, as tasks T143 and T144 did. Where the second commit must wait on
the first — a pin move after a deploy — the plan makes it its own
node. That is a guideline, not an invariant, so no specified node is
re-cut here. The settings file's `repositories` node lists retire: the
field is the one place a node's repository is written.

The schema version stays 0. The field is additive and zod strips what
it does not declare, so a `plan-state` pinned before the change reads
a file that carries it but renders without it. The order is therefore:
deploy, move each project's pin, then the first write that sets the
field. A version bump would make the service read two versions for no
gain.

### 4. The view over several projects

`/view` becomes the index: one row per project the deployment serves,
with its offered, in-flight and waiting-on-the-owner counts, each
linking its tree. The pages move under the project —
`/view/<owner>/<repo>`, and its node, task and form paths — and the
old paths redirect to the first project's, so a bookmark keeps
working. One view token and one cookie serve every project, as
P4-N046's criteria already settled for a second instance.

### 5. What does not change

No code in `src/` branches on a project name (D067): the project
arrives as data on the path and travels as an argument. No model
inference runs in the service, the write allowlist is unchanged, and
each project's state file, journal, settings file and renderings stay
in its own coordinating repository.

## What the owner sets up

- **O1. The GitHub App installed on every project's repository.** One
  account-level installation serves them all and design 2 resolves it,
  so no identifier is configured. To be confirmed for
  majodali/methodology-tools before the first child is verified, which
  criterion 1 needs; the specification corrects this file on that.
- **O2. The project list on the deployment**, as a parameter override,
  and the merge of each service pull request, which is the deploy.

## What this does not cover

Firing per project and repository (P2-N048, P2-N049); granting a
repository new to the project (the owner's, RU-016); the scratch
project (P2-N051, which this unblocks); adoption of the loop by
methodology-tools' own sessions (P2-N006, RU-017).

## Children

Six slices, each with its criteria in its own note. The first runs end
to end and the rest follow it. The four this plan proposed became six:
the rule below, that a second commit waiting on the first is its own
node, splits the node's repository from the pin that follows it, and
the pilot's enlistment from the bare path's retirement. The
specification names them, their criteria, their order and the
repository each writes to.

## Criteria

1. One deployment answers `service_identity` for two projects:
   `/mcp/majodali/project-orchestrator` and
   `/mcp/majodali/methodology-tools` each answer their own project,
   with the same service commit.
2. `plan_read` through each path answers that project's own
   `orchestration/state.json` at a commit of that repository.
3. A path naming a repository outside the deployment's project list is
   refused, nothing is read, and the refusal names no token.
4. A deployment with no project list refuses every call, naming what
   was required and what was found (RU-013); both `DEFAULT_PROJECT`
   constants are gone.
5. `/mcp` with no project segment serves the list's first project
   until P2-N059 removes it.
6. The reader, writer, pull request client and commit checks are keyed
   by repository, the installation is resolved per repository through
   the App, and `GITHUB_APP_INSTALLATION_ID` is gone from the code,
   the template and the deploy script.
7. A call for a repository the App is not installed on fails naming
   the repository and the missing installation, and no other
   repository's call is affected.
8. A node carries `repository`, `owner/name` or null for the project's
   coordinating repository, and both projects' state files pass
   `plan-state check` with the field absent and with it set.
9. `task_next` with a repository answers only candidates in it, and
   every candidate without one, with tests over the trial's two cases:
   a first-in-line step in the asking repository, and one in another
   repository passed over.
10. `task_open` refuses a node whose repository is not the one the
    claim names, saying which repository it belongs to.
11. The view, `docs/plan.md` and `docs/backlog.md` print a node's
    repository when it is not the coordinating one, nothing when it is.
12. `orchestration/orchestrator.json` no longer lists node identifiers
    per repository, and nothing reads such a list.
13. `/view` indexes the deployment's projects, each row with its
    offered, in-flight and waiting-on-the-owner counts and a link to
    its tree.
14. `/view/<owner>/<repo>` and its node, task and form paths serve
    each project, one view cookie covers all, and the old `/view`,
    `/view/node/:id` and `/view/task/:id` redirect to the first
    project's.
15. A decision answered or a hold lifted in one project's view commits
    to that project's repository alone, with its journal line there.
16. No code in `src/` branches on a project name (D067); any project
    literal left there is named with the reason it stays.
17. The write allowlist in `src/model/store.ts` is unchanged, and a
    write for one project touches only those five paths of its
    repository.
18. No model inference runs in the service, and no token is in git, in
    a log or in a refusal message.
19. `docs/process/how-we-work.md`'s "Enlisting a repository" says a
    project's `.mcp.json` names its own project path,
    `docs/process/state-model.md` carries the node's repository field,
    and how-we-work.md stays at or below 200 lines.
20. The service's `docs/runbook.md` says how a project is added: the
    parameter, the installation, and the state file first, because
    check 3 of `scripts/smoke-test.sh` calls `plan_read`. The owner
    merges each service pull request, that merge deploys, and each
    project's `project-orchestrator-service` pin then moves to the
    merged commit with `npm run check` green.

## Risks

- **A session reaching the wrong project.** A repository whose
  `.mcp.json` still names the bare `/mcp` reads and writes the first
  project's plan. Bounded by `service_identity` answering the resolved
  project, the enlistment step checking it, and P2-N059.
- **One App token for several repositories.** The installation is
  account-level, so a minted token can write any repository in the
  account. Bounded by the five-path allowlist, the project list
  deciding which repositories a request may name, and one commit per
  change.
- **The pin and the field out of order.** A project whose pinned
  `plan-state` predates the field renders without it and
  `npm run check` fails until the pin moves. Bounded by criterion 20.

## Asks

Both answered by the owner on 2026-11-22, each at its default.

1. **Does the pilot join this deployment instead of taking its own
   instance?** D140, answer A: methodology-tools joins as this
   deployment's second project, P4-N046 is removed and P4-N047 is
   re-pointed at a project path here.
2. **Does P2-N048 wait on the child that puts the repository on a
   node?** D141, answer A: yes. That child is P2-N055.

## Terms introduced

- **Project path**: the `/<owner>/<repo>` segment of an endpoint that
  names which project a call is for. A node's repository is a field,
  not a term: P2-N056 defines it in the state model.
