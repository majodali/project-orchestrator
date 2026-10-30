# The owner sees the plan in a browser, and answers gate decisions there: specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document
     for node P2-N003. It goes `active` when the owner accepts it and
     the breakdown at this node's specification gate. It goes
     `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's specification
gate. It assumes the methodology at this project's pinned version,
1.6.0 ([Classification](../classification.md)), the [process
specification](../process/README.md), the [service
plan](../plans/orchestration-service.md) and this node's
[plan](../plans/p2-n003-owner-questions-and-plan-view.md).

[Node](../process/README.md#def-node) **P2-N003** (owner questions and
the plan view) is chunk 2 of P2-N001, the [orchestration
service](../plans/orchestration-service.md#chunk-2--owner-questions-and-the-plan-view).
This document specifies the outcome its
[plan](../plans/p2-n003-owner-questions-and-plan-view.md) fixed. The
owner crossed the plan gate on 2026-10-30 with defaults 1 to 10.

The plan made the node interior, with two children. Under its
decision 2, this document carries them at two depths.

- Child 1, the [web
  view](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-web-view)'s
  first version, is specified at full criteria depth. It goes to
  `execute` with no plan or specify task of its own. Its criteria are
  V1 to V30 below.
- Child 2, the owner question queue, is specified at outcome depth. It
  gets its own plan and specify tasks after P2-N006 (migration and
  pilot).

Both children are entered at this node's specification gate, under
RU-020 (an interior node whose specification carries its children
needs no separate break-down task).

The node's own criteria are I1 to I10 under *Verification of the
node*. An interior node's `verifying` runs after its children are
`done`, against its own criteria ([plan
model](../process/plan-model.md)). Depth is the C1 profile's: a
criteria list a verifier can check ([profiles](../process/profiles.md)).
Nothing here reopens a plan decision. Decisions 11 to 15 below refine
points the plan left open, and each names what it refines.

**Repository reach** (RU-016, the Planner declares the repository
access a node needs). The plan's *Dependencies* section is the
declaration. This document makes child 1's reach exact under *Child
1's repository reach*. Both repositories are already in approved
scope, so no owner grant is needed.

## Terms this specification introduces

Each term is proposed for the owner's ratification at this gate.

- <a id="def-view-token"></a>**View token**: the read-only credential
  the owner mints for the web view. It is held in AWS Secrets Manager,
  apart from the MCP bearer token, and the MCP endpoint refuses it.
- <a id="def-view-cookie"></a>**View cookie**: the signed cookie the
  sign-in route issues in exchange for the [view
  token](#def-view-token). Every other `/view` route requires it.
- <a id="def-not-computable"></a>**Not computable**: the view's
  marking for a rendering, or an item of one, that the type's
  procedure cannot finish from the files at the page's commit. The
  marking names the file, the line and the missing input. Decision 11
  lists the cases.

## The plan's ten decisions, as adopted

The owner adopted every default. Each row says where this document
carries the consequence.

| Decision | Adopted default | Carried here |
|---|---|---|
| 1 | Two children: the web view's first version, then the owner question queue | *Register action proposed*; *Edges stated at this breakdown* |
| 2 | Child 1 at full criteria depth, child 2 at outcome depth | the two child sections |
| 3 | The existing function and Hono app, server-rendered routes under `/view`, bound to the `live` alias | *Routes on the existing function*; V18 |
| 4 | A separate read-only token, exchanged for a signed `HttpOnly` cookie, refused by the MCP endpoint | *Sign-in*; V14 to V17 |
| 5 | The head of the default branch, a `ref` query parameter, the SHA on every page | *What it reads*; V1 to V4 |
| 6 | Document links go to GitHub's file view at the same SHA | *What every page carries*; V10 |
| 7 | Whichever of child 1 and P3-N009 executes first writes the model parser, vendored | *The model parser and shared parsing*; V23, V24 |
| 8 | Tasks E1 and E2 start after this gate; task E3 waits on P3-N007 `done`, not on P3-N008 | *The execute run*; *Register action proposed* |
| 9 | "What is next" is the type's procedure, with no rule of the view's own | *What "what is next" means*; decision 11; V26 |
| 10 | Child 1 ends at an owner demonstration | V30 |

P3-N009 is the node that retires sibling ordering and adds the checks
that replace it. P3-N007 declared the Project model type and drafted
the amendment to K-003 (the Backlog is the single source of progress
truth). P3-N008 populates the instance over this
repository.

## Child 1: the web view's first version

### Outcome

In a browser on any device, the owner sees the plan tree of this
repository at a named commit. Each node shows its stage, outcome and
dependencies, beside what is next. The owner drills from a node to its
tasks. Every fact shown comes from that commit. The view changes
nothing, except the caller's own [view cookie](#def-view-cookie).

### What it reads: four files at one commit

Every page reads this repository, majodali/project-orchestrator,
through the service's installed GitHub App. The repository is the one
the service's `MCP_PROJECT` setting names, as for `plan_read`.

| File at the commit | What the view takes from it | First read by |
|---|---|---|
| `docs/plan-register.md` | every node: its ID, stage, hold marker, title, notes and document links, nested | task E1 |
| `docs/cost-log.md` | one row per accepted task, all nine fields | task E2 |
| `orchestration/journal.jsonl` | each event: `ts`, `event`, `task`, `node`, `stage`, `role`, `model`, `session`, `ref`, `note` | task E2 |
| `docs/project-model.md` | each resource entry: its slug, facets and edge lines | task E3 |

A node page also reads the plan document its register line links, for
the *Outcome* section. No other file is read.

**How a page resolves its commit** (decision 5).

1. A request names a ref in the `ref` query parameter, or names none.
2. With none, the page takes the repository's default branch.
3. The page resolves the ref to a commit SHA once, per request.
4. Every file the page reads is fetched at that SHA. No file is
   fetched by branch name.
5. The page names the ref as requested, the full 40-character SHA and
   the fetch time.

The existing fetcher, `GithubAppRegisterFetcher` in
`src/planRegister/registerFetcher.ts`, resolves a ref and then reads
one path at the resolved SHA. Called once per file with a branch name,
it would resolve the branch once per file. A push between two reads
would then mix two commits on one page. So the view resolves first and
passes the SHA as the ref of every read (V1).

**The cache.** Content at a SHA never changes. The service may cache
file content in memory, keyed by SHA and path. No cache entry is keyed
by a ref. The ref is resolved on every request. So no cache answers
what the current state is. This keeps P2-N002 criterion I5 (ref
discipline) and the R10 property (the service never answers from its
own store).

**Large files.** The fetcher reads a file through GitHub's contents
endpoint and requires base64 content. GitHub's REST documentation for
that endpoint limits base64 content to files of 1 MB or less. The
journal was 269 KB on 2026-10-30, after two months. Task E2 re-reads
that documentation, cites it with the date read, and makes a larger
file either read in full or refused by name (V5).

### The three pages

The pages follow `docs/plan.md`, the [hand
rendering](../plan.md) the owner called a good first attempt. They
carry its five node fields in its order: stage, outcome, depends on,
needed by, documents.

#### The tree page

Path: `/view`.

- Every node of the register, once, nested as the register nests it.
- Per node: its ID, linked to its node page; its stage; its hold
  marker, if any; its title; and its register notes, verbatim.
- From task E3, beside the tree: the implementation map and the list
  of what is next, rendered by the type's procedures (*What "what is
  next" means*).

#### The node page

Path: `/view/node/<node ID>`.

1. **Stage.** The stage from the register, with the hold marker. Where
   the journal holds a `gate-crossed` or `accepted` event for the node,
   the date of the latest one follows, labelled "last journal event,
   telemetry". The run journal is never authoritative
   ([observability](../process/observability.md)).
2. **Outcome.** The first paragraph of the *Outcome* section of the
   plan the node's register line links. Where the plan has no
   *Outcome* section, the field says so and links the plan. Where the
   line links no plan, the field reads "no plan linked" (decision 14).
3. **Depends on.** The node's register note, verbatim, with every node
   ID in it linked, labelled "from the register's note". From task E3,
   also the nodes it depends on by recorded edges, under the rule of
   P3-N007 decision 3, labelled "by recorded edges".
4. **Needed by.** The nodes whose register notes name this node's ID,
   labelled "named in the register notes of". From task E3, also the
   nodes that depend on it by recorded edges.
5. **Documents.** The links of the node's register line. Where the line
   links none, the nearest ancestor's links, labelled with that
   ancestor's ID (decision 14).
6. **Resources**, from task E3. The model's entries whose `created-by:`,
   `modified-by:` or `used-by:` lines name the node, grouped by label,
   each linked to its entry.
7. **Tasks.** Every task ID that a Cost log row or a journal event
   names with this node, in task-number order, each linked to its task
   page. A task with a journal event and no Cost log row is labelled
   "no Cost log row".

The view parses no prose for dependencies. The register's note is
shown as written. Only the edges give a computed dependency, which is
the type's rule and not the view's.

#### The task page

Path: `/view/task/<task ID>`.

- The task's Cost log row, all nine fields. Where there is none, the
  page says "no Cost log row at this commit".
- The task's journal events, in file order: `ts`, `event`, `node`,
  `stage`, `role`, `model`, `ref` and `note`, each verbatim. Where
  there are none, the page says so.
- A link to the task's node page.

#### What every page carries

- **The header.** The ref as requested, the full SHA linked to
  GitHub's commit view, and the fetch time. Also a link to the same
  page at the requested ref, which a reload follows to a new SHA.
- **The limit.** One line saying the page carries no progress
  authority. Under K-003 (the Backlog is the single source of progress
  truth) as released at 1.6.0, the Backlog is the referent. The line
  links the Backlog at the page's SHA. This holds until the amendment
  P3-N007 drafted is released and pinned (P3-N002 decision 13, option
  (a)).
- **Document links** (decision 6). Every link to a repository document
  goes to `https://github.com/<owner>/<repo>/blob/<SHA>/<path>`. A
  register link `plans/x.md` resolves against `docs/`. No link names a
  branch.
- **Links between pages** carry the `ref` the page received, unchanged.
  So a reload re-resolves a branch, and a SHA stays pinned. Each page
  names its own SHA.
- **Phone width.** Each page works at 360 CSS pixels wide with no
  horizontal scroll. Until the remote MCP connector exists, the view
  is how the owner sees the plan away from a cloned session.
- **No script.** The pages are HTML and inline CSS. They run no
  JavaScript.

A page whose ref does not resolve, or whose read fails, names the ref,
the failing file and GitHub's status. It shows no plan content.

### Routes on the existing function

The view is part of the service (decision 3). The one Lambda function
runs one Hono app, `createApp()` in `src/httpApp.ts`. The app gains
these routes:

| Method and path | Answers |
|---|---|
| `GET /view/sign-in` | the sign-in form |
| `POST /view/sign-in` | the exchange of the view token for the view cookie |
| `GET /view` | the tree page |
| `GET /view/node/<node ID>` | a node page |
| `GET /view/task/<task ID>` | a task page |

The HTTP API in `template.yaml` binds routes explicitly. The view adds
route keys that target the existing integration, `McpIntegration`,
which is bound to the `live` alias. It adds no integration, no alias
and no Function URL. So P2-N012 criterion I3 (nothing outside the two
aliases is reachable) still holds. The `preprod` Function URL already
serves every path.

No client framework, no browser bundle and no runtime dependency are
added. A dependency the task finds it needs is staged to the owner
under R14 (dependency search is an attack surface), never added.

### Sign-in: the view token and the view cookie

A browser cannot send the MCP endpoint's bearer header on a page load.
So the view has its own credential (decision 4).

- The owner mints the [view token](#def-view-token) and stores it in
  Secrets Manager (owner action O-view-1). `template.yaml` gains a
  parameter naming the secret. A dynamic reference resolves it into
  the function's environment, as `MCP_AUTH_TOKEN` is resolved today.
- `GET /view/sign-in` shows a form with one password field.
- `POST /view/sign-in` compares the submitted token with the view
  token in constant time, as `src/auth.ts` compares the bearer token.
  On a match it answers `303` to `/view` and sets the [view
  cookie](#def-view-cookie). On a mismatch it answers `401` and sets
  nothing.
- The cookie is `HttpOnly`, `Secure`, `SameSite=Strict` and
  `Path=/view`, with a `Max-Age`. Its value carries an expiry and an
  HMAC-SHA256 signature. The service checks the signature without a
  session store. Decision 13 fixes the key and the lifetime.
- Every other `/view` route refuses a request without a valid cookie
  by a `303` to the sign-in page.
- The MCP endpoint refuses the view token and the view cookie. A
  leaked cookie reaches no write tool.
- If the view token is unset, or equal to the MCP bearer token, every
  `/view` route answers `500` naming the misconfiguration. The MCP
  endpoint is unaffected.
- Sign-in is the only request that changes anything, and it changes
  only the caller's cookie. So a forged cross-site request has nothing
  to change.

Every `/view` response carries `Cache-Control: no-store`,
`Referrer-Policy: no-referrer`, and a `Content-Security-Policy` that
allows no script and no framing. Every value read from a file is
HTML-escaped.

### The model parser and shared parsing, under RU-012

RU-012 (how two repositories share one unit of code) puts one
canonical copy in the repository that owns the thing's specification.
A generator with a `--check` drift mode vendors it outward. The
consumer never edits its copy.

- **The Plan register.** The service already parses it with the
  vendored grammar, `src/planRegister/vendored/plan-register.ts`. The
  view uses that grammar and changes neither copy.
- **The Project model** (decision 7). One parser of the instance, in
  this repository under `plugin/scripts/lib/`, vendored to the service
  by `plugin/scripts/sync_shared_unit.ts`. If P3-N009 has written it
  when task E3 starts, task E3 imports it. Otherwise task E3 writes it,
  and P3-N009 imports it later. The parser follows the entry grammar
  of the [type](../process/project-model.md#the-entry-grammar) and
  reports parse errors with their line.
- **The Cost log and the journal.** The form checker's core,
  `plugin/scripts/lib/form-check-core.ts`, already splits Cost log
  rows into nine cells and checks journal lines against the event
  vocabulary. If the view's parsing would copy that logic, task E2
  moves the logic into one file under `plugin/scripts/lib/`. The core
  then imports it, and the generator vendors it.
- **Not changed.** `plugin/scripts/lib/plan-register.ts` and
  `plugin/scripts/lib/corpus/` stay byte-identical. P3-N002 criterion
  I10 holds them so. The generator's travelling set gains files and
  loses none.

### What "what is next" means

The view implements the two renderings the [Project model
type](../process/project-model.md#the-two-renderings) defines: the
implementation map and the list of what is next. It applies each
procedure as written, reading the instance and the register at the
page's SHA and nothing else (decision 9).

- Each rendering carries what its procedure carries and omits what its
  procedure names as omitted. It adds no claim the instance lacks
  (P3-N002 criterion G6, applied per view).
- The list of what is next classifies each node that is not `done` as
  `in flight`, `held`, `waiting on` or `actionable`, by the procedure's
  first rule that holds. It adds "no recorded uses edge" where the
  procedure says to.
- Where a line the procedure reads holds `not yet derived`, the view
  carries the type's note that it is not yet derived. The procedure
  still finishes.
- Where the procedure cannot finish, the view shows [not
  computable](#def-not-computable) and names the input. Decision 11
  lists the three cases.
- The view says that the list holds recorded dependency only. Which
  pair is dispatched also depends on approved scope, which the model
  does not hold.

The phrase "not computable" in plan decision 9 comes from the slice
record's procedure. The type's procedure, which replaced it, names no
such case. Decision 11 states the cases, so that the phrase does not
become a rule of the view's own.

### The execute run: a thin slice first

Child 1 is a leaf. It runs as three execute tasks in this order, each
dispatched to the Implementer. Each ends at something the owner can
open on the production endpoint. Then the owner demonstration closes
the child at `verifying`.

| Task | What it delivers | Criteria | Waits for |
|---|---|---|---|
| E1, the thin end-to-end slice | the tree page from the register alone, behind sign-in, deployed through CI and passing the smoke test | V1 to V4, V6, V7, V10 to V22, V28, V29 | this node's specification gate; its merge waits on O-view-1 to O-view-3 |
| E2, the node page and the task page | the two pages, from the register, the plan documents, the Cost log and the journal | V5, V8, V9, V23, and V10 to V13, V22, V28, V29 for its pages | E1 accepted |
| E3, the model | the parser, the two renderings on the tree page, the resource lines and edge dependencies on the node page | V24 to V27, and V22, V28, V29 again | E2 accepted, and P3-N007 `done` (decision 8) |
| Verify | the owner demonstration | V30 | E3 accepted and deployed |

- E1 may return `blocked` naming O-view-1 to O-view-3 when the owner
  has not done them. P2-N008, the service's reachability slice, took
  the same path.
- Each task's pull requests reach the service's `main` by pull request,
  under RU-009 (work reaches `main` by pull request). The owner merges
  them (O-view-4).
- P2-N005 (the task-pull loop) also changes the service's source,
  `template.yaml` and the smoke test. The two may conflict at merge. A
  task rebases on the service's `main` before its merge, and the whole
  suite passes after the rebase.
- E3 waits on P3-N007 and not on P3-N008. P3-N008 adds content to the
  instance, not grammar.

### Child 1's verification criteria

Each criterion names its artifact or its command. Commands run in the
service repository unless they name this one.

#### Reading at one commit

- **V1. One commit per page.** A test stubs the fetcher so that the
  branch head moves between two file reads. The page shows one SHA,
  and every fact on it comes from that SHA. No production code path
  fetches a file by branch name.
- **V2. The header.** Every page that reads the repository, error
  pages included, names the requested ref, the full SHA and the fetch
  time. A test asserts each in the rendered HTML.
- **V3. The ref parameter.** Tests cover four cases. No `ref` gives
  the default branch's head. A branch name gives its head. A SHA, short
  or full, gives that commit. A ref that does not resolve gives a page
  that names the ref and GitHub's status and shows no plan content.
- **V4. The cache answers no state.** Two requests with the branch head
  moved between them show two SHAs. A search of the view's source for
  the cache shows a key of SHA and path only.
- **V5. Large files.** A test serves a file above the base64 limit of
  GitHub's contents endpoint. The file is read in full, or the page
  refuses it naming the file and its size. It is never read as empty.
  The task cites the documentation it relied on, with the date read.
- **V6. No store but git.** No module of the view imports the lease
  backend or any AWS SDK client. A `grep` over the view's source
  directory, recorded in the task result, shows it.

#### The pages

- **V7. The tree.** Rendered from a copy of this repository's register
  at a named commit, kept as a test fixture, the tree page lists every
  node the vendored parser returns, once each, with the nesting, stage,
  hold marker, title and note the register gives.
- **V8. The node page.** A fixture test checks the seven fields of
  *The node page*, in order. It covers a node whose plan has an
  *Outcome* section, a node whose plan has none, and a node whose line
  links no plan.
- **V9. The task page.** A fixture test checks a task with a Cost log
  row and events, a task with events and no row, and an unknown task
  ID, which answers `404` naming the ID and the SHA.
- **V10. Links.** Every document link in every page matches
  `https://github.com/<owner>/<repo>/blob/<40-hex SHA>/`. No link names
  a branch. Every link between pages carries the received `ref`
  unchanged. A test walks the links of each page type.
- **V11. Escaping.** A fixture whose register title holds a `<script>`
  tag renders it as text. A test asserts the `Content-Security-Policy`,
  `Cache-Control` and `Referrer-Policy` headers on every `/view`
  response.
- **V12. Phone width.** Each page carries a viewport meta tag, and no
  style sets a width above 360 CSS pixels. The owner confirms the
  reading at V30.
- **V13. The limit.** Every page carries the no-progress-authority
  line, linking the Backlog at the page's SHA. A test asserts it.

#### Sign-in and separation

- **V14. Sign-in.** Tests cover the right token, which gives `303` and
  a cookie with every attribute *Sign-in* lists, and a wrong token,
  which gives `401` and no cookie.
- **V15. The cookie is checked.** A missing cookie, a tampered cookie,
  an expired cookie and a cookie signed under a former view token are
  each refused on every route but sign-in. Tests cover each.
- **V16. The two credentials are separate.** `/mcp` with the view
  token as its bearer gives `401`. `/mcp` with only the view cookie
  gives `401`. `/view` with the MCP bearer header and no cookie is
  refused. An unset view token, or one equal to the MCP token, gives
  `500` on `/view` and leaves `/mcp` answering. Tests cover each.
- **V17. Nothing changes.** No `/view` route but `POST /view/sign-in`
  accepts a method other than `GET`. No view module calls a write tool
  or the lease backend. A test and the V6 `grep` show it.

#### Serving and deploying

- **V18. The template.** The new route keys target `McpIntegration`.
  The template declares no new integration, alias or Function URL. The
  view token reaches the function only by a dynamic reference.
  `sam validate --lint` passes in the pull-request checks.
- **V19. The smoke test gains a check.** `scripts/smoke-test.sh` gains
  a fourth check. It reads the view token from Secrets Manager at run
  time, signs in, requests `/view`, and requires `200` and a
  40-character SHA in the header. A failure prints `SMOKE FAILURE`
  naming the check and exits non-zero. The first deploy's run log
  shows the check passing against the preprod Function URL.
- **V20. One deploy path.** `scripts/deploy.sh` passes the new
  parameter from an environment variable. The deploy workflow maps it
  from a repository variable. No secret value is added to the
  repository or its Actions secrets. P2-N012 criteria I1 (one deploy
  path) and I6 (no secret value gained a new home) still hold.
- **V21. The runbook and the README.** `docs/runbook.md` covers
  minting and rotating the view token, the deploy role's added grant,
  the repository variable, and signing in on a phone. `README.md`
  lists the routes. Every human action the view needs is one of
  O-view-1 to O-view-5. An action found outside that list is a runbook
  defect, fixed before V30.
- **V22. Latency, measured.** The cold and warm latency of each page a
  task adds is measured against the production endpoint and recorded
  in `docs/runbook.md`, with the method. The criterion is met by the
  record, whichever way the numbers fall (RU-019, a measurement may be
  met by an unfavourable result).

#### Shared code

- **V23. No copied parsing.** The view's Cost log and journal parsing
  shares no copied logic with `plugin/scripts/lib/form-check-core.ts`.
  Logic they share lives in one file under `plugin/scripts/lib/`, which
  the core imports and the generator vendors. In this repository,
  `node plugin/scripts/run_corpus.ts` passes and
  `node plugin/scripts/form_check.ts` reports 0 violations.
  `node plugin/scripts/sync_shared_unit.ts --check <the service's vendored directory>`
  reports in sync.

#### The model

- **V24. The parser.** Tests in this repository cover each production
  of the type's entry grammar and a parse error reported with its line.
  Parsed at the SHA where task E3 starts, the instance yields every
  entry, and each error is reported by line. The vendored copy is in
  sync, by V23's command.
- **V25. The implementation map.** For a fixture instance and register,
  the rendered rows equal rows written by hand from the type's
  procedure, steps 1 to 7. The map carries exactly the facets the
  procedure carries. A step-6 disagreement renders as not computable.
- **V26. The list of what is next.** For fixtures, the rendered items
  equal items written by hand from the type's procedure, steps 1 to 6.
  One fixture is the edges of P3-N002's breakdown, which give the
  chain A, B, C, D in the type's table. Each of decision 11's three
  cases renders as not computable, naming its input.

#### Bounds, hygiene and monotonicity

- **V27. The navigation bound, per view.** From the tree page, each of
  the five answers for a resource is reached within the [navigation
  bound](../process/project-model.md#the-navigation-bound) of three
  steps, a link click counting as one. Measured for every fifth entry
  in file order, after E3. Before E3, the criterion is recorded as not
  yet applicable.
- **V28. No secret anywhere.** Neither repository holds the view token,
  the cookie key or any other credential, in any commit of the
  child's branches. Test fixtures use the literal word `fake`. Checked
  as P2-N002 criterion I7 (no secret anywhere) was, over the commits
  the child adds.
- **V29. Monotonic.** The service's existing tests pass unchanged.
  `git diff <the service's main before E1>..<after the last task> -- test/`
  deletes no line of a test file that existed before E1. `npm test`,
  the lint and the build pass. A rewrite that proves necessary goes to
  the owner under W-002 (existing tests are signals, not obstacles).

#### The owner demonstration

- **V30. The owner sees it work** (decision 10). On a phone, on the
  production endpoint, the owner signs in, opens the tree, picks a
  node, and drills to one of its tasks. He checks three facts he
  chooses against git at the SHA the page names. The record names the
  device, the SHA, the three facts and the verdict on each. At the same
  sitting, the owner decides the Backlog entry *Whether the web view
  replaces `docs/plan.md`*, either way, and the decision is recorded.

### Child 1's repository reach

Under RU-016 (the Planner declares the repository access a node
needs), child 1's tasks write the following. Nothing else.

- **majodali/project-orchestrator-service**: `src/` and `test/`;
  `template.yaml`; `scripts/deploy.sh`; `scripts/smoke-test.sh`; the
  deploy workflow's `env:` mapping in `.github/workflows/deploy.yml`;
  `README.md`; `docs/runbook.md`; `docs/deploy-role-permissions.md`;
  `docs/backlog.md`; and `src/planRegister/vendored/` only through the
  generator.
- **majodali/project-orchestrator**: new files under
  `plugin/scripts/lib/` and their tests; `form-check-core.ts` only as
  V23 requires; `plugin/scripts/sync_shared_unit.ts`, for the
  travelling set; and `docs/backlog.md`. Not `plan-register.ts` or
  `lib/corpus/`.

The Orchestrator writes the Plan register, the Cost log and the
journal.

### Child 1's owner actions

The owner actions continue the service's numbering after P2-N012's O7
to O10. P2-N005's specification may claim numbers from O11, and it is
not written yet. So these are named O-view-1 to O-view-5, for the
Orchestrator to renumber after whatever P2-N005's specification claims.

- **O-view-1.** Mint the view token and store it in Secrets Manager
  under the name the runbook gives. Before E1's merge.
- **O-view-2.** Grant the deploy role `secretsmanager:GetSecretValue`
  on that secret. CloudFormation resolves the dynamic reference with
  the deploy role, and the smoke test reads the secret with it. Before
  E1's merge, or the deploy goes red and `live` stays where it was.
- **O-view-3.** Add the repository variable that names the secret, as
  O8 added the others. Before E1's merge.
- **O-view-4.** Review and merge each task's pull request (RU-009).
- **O-view-5.** Perform the demonstration of V30.

## Child 2: the owner question queue

Specified at outcome depth (decision 2). Its own plan and specify
tasks follow P2-N006.

**Outcome.** A gate decision the Orchestrator raises waits in the
queue. The owner answers it in the web view. The session that pulls
its next task picks up the answer and commits it to git. Immediate-class
questions reach the asking session by MCP elicitation.

**Dependencies.**

- Child 1: child 2 adds the answering action to the view child 1
  builds.
- P2-N005 (the task-pull loop): under the write model, the service
  never writes the repository. An answer reaches git only through the
  session that pulls its next task, by P2-N005's pull and claim tools.
- P2-N006 (migration and pilot): child 2 follows it by the owner's
  ordering of 2026-10-29, not by a resource it uses. The register note
  carries that order.

**What its planning decides.** Its plan answers each of these, and its
specification turns them into criteria.

1. Where an answer lives between the owner's click and a session's
   commit, and how R10 (the service becomes a second source of truth)
   still holds while it does.
2. How a question the Orchestrator raises reaches the queue. Today a
   gate's decisions are a numbered section of a committed document.
3. How the owner is authorized to answer. The view token is read-only
   by decision 4, and answering is the view's first write.
4. Which question tools reach surfaces without a repository clone,
   given the remote MCP connector node that follows the pilot.
5. How the web view's scheduling and delegation decisions ride the
   queue (review ask 5).
6. How elicitation is used, given that R11 (MCP surface constraints)
   records that its dialogs block.
7. Whether child 2 is a leaf or interior.

Node criteria I1 to I5 bind whatever its planning chooses.

## What the node does not cover

From the plan, each with the record that holds it.

| Not covered | Held by |
|---|---|
| Drilling to code and test results | Backlog: *Drill from the web view to code and test results*, after the plan-model amendment on where verification evidence lands |
| Live session status | P2-N004 (topics and coordination), if the pilot shows the need |
| The plan of a project other than this one | P2-N006, which builds multi-project plan state |
| A `model_read` MCP tool | Backlog: *Service support for the comprehension model* |
| Sign-in by GitHub account | Backlog: *Sign-in to the web view by GitHub account* |
| The renderings as shared code | Backlog: *The model's two renderings as shared code* |
| The Backlog's switch to a rendering of the model | Backlog: *Switch this repository's Backlog to a rendering of the planning/execution model*, after the amendment's release |
| Whether the view replaces `docs/plan.md` | Backlog: *Whether the web view replaces `docs/plan.md`*, decided at V30 |

Also not verified here: lease behaviour, which is P2-N005's; any
browser beyond the one the owner uses at V30; and GitHub API rate
limits under load, since one owner reads the view.

## Risks

From the [Risk register](../open-risks.md).

- **R10 (the service becomes a second source of truth).** Child 1
  holds it by construction: one SHA per page (V1), a cache keyed by
  SHA (V4), no store but git (V6). Child 2 is where it bites. An answer
  held between the click and the commit is state outside git. Child
  2's planning answers how R10 holds (its question 1), and I5 below
  binds the answer.
- **R11 (MCP surface constraints).** Child 1 avoids it, because the
  view is HTTP in a browser and not MCP. Child 2 meets it twice: an
  elicitation dialog blocks, and the remote MCP connector is not yet
  there for surfaces without a clone. Child 2's planning answers both
  (its questions 4 and 6).

One new risk is proposed as a Backlog addition in this task's result,
for the Orchestrator to place: the view cookie is a standing read
credential for the whole plan on the owner's devices. Its mitigations
here are the cookie's attributes, its lifetime, and revocation by
rotating the token (decision 13).

## Verification of the node

C1 profile: a criteria list a verifier can check. These run at
P2-N003's own `verifying`, after both children are `done`. No single
child establishes them. The service plan's chunk gate stands for the
node: the owner answers a real gate decision from the web view.

- **I1. The gate demonstration.** The owner answers a real gate
  decision in the web view, on a decision the process owed at that
  moment.
- **I2. The answer reaches git as a commit.** The session that picked
  the answer up commits it, and the commit is readable with the service
  off. The service makes no commit and holds no repository write
  credential.
- **I3. The view shows the effect.** The view, reloaded, names the new
  SHA and shows the decision's effect at it.
- **I4. The fallback.** With the service unreachable, a gate of the
  same class is crossed in chat by the v1 process (service plan,
  standing constraint 3). R12 (service outage stops work) is updated
  with the date and the result.
- **I5. No pending answer reads as decided.** Until its commit exists
  at the SHA a page reads, an answer the service holds is never shown
  as a decision. Where the view shows it, it is labelled as held by the
  service. A test and the I1 run show both.
- **I6. Monotonic across the node.** The service's tests that existed
  before child 1 pass unchanged at the node's end, by V29's command
  over the whole node. A rewrite went to the owner under W-002.
- **I7. No secret anywhere.** Neither repository's history holds the
  view token, the cookie key, the bearer token or any deploy
  credential. Checked over full history, as P2-N002 criterion I7 was.
- **I8. This repository is clean.** `node plugin/scripts/form_check.ts`
  reports 0 violations. The register and the Backlog agree. Both
  children reached `done` against their own criteria.
- **I9. The record exists, and the documents moved with the work.**
  Every dispatched task of the node has a Cost log row. Both
  demonstrations, V30 and I1, have a journal entry. Both repositories'
  Backlogs moved in the same commits as the work, under W-003
  (documentation moves in the same commit as the work).
- **I10. Decisions are closed.** The plan's decisions 1 to 10, this
  document's 11 to 15, and child 2's own were each adopted or
  overridden. Any override reached the affected criteria before the
  child that it affects executed.

### How verification runs

C1: each execute task is self-verified by its Implementer against the
criteria the table under *The execute run* assigns it. A Reviewer pass
runs at the owner's request. Child 1's `verifying` and the node's are
attended (decision 15). The owner performs V30 and I1. The
Orchestrator assembles every other criterion as a pointer to a commit,
a test, a run log or a recorded measurement. No dispatched session
holds AWS credentials. So every criterion is answered from repository
content, run logs, HTTPS calls to the endpoints, or the owner's
attestation, as for P2-N012.

## Monotonicity

This node proposes no planned non-monotonicity. Child 1 adds tests and
a smoke check. It rewrites no previously defined functional test (V29).
The service plan's struck live-update line was a design sketch, not a
test. P2-N005's specification will lengthen the smoke test's tool
list, as P2-N005's own change.

## Edges stated at this breakdown

The children's edges, in the [type's
notation](../process/project-model.md#how-a-plan-writes-an-edge). The
IDs are those proposed under *Register action proposed*; the
Orchestrator writes the issued IDs. New slugs carry a gloss.

- **P2-N021 creates** `web-view` (the service's `/view` routes, their
  pages and sign-in, in majodali/project-orchestrator-service) and
  `project-model-parser` (the parser of the Project model instance,
  under `plugin/scripts/lib/`, vendored to the service). Under decision
  7, if P3-N009 has written the parser when task E3 starts, the
  Orchestrator records this node's edge on the parser as a uses edge
  instead.
- **P2-N021 modifies** `project-orchestrator-service-repo` (the
  repository majodali/project-orchestrator-service, a standing
  resource), `project-orchestrator-repo`, `vendoring-generator` (the
  shared-unit generator, `plugin/scripts/sync_shared_unit.ts`) and
  `backlog`. If task E2 moves logic out of the form checker's core,
  its result proposes that edge on the form checker.
- **P2-N021 uses** `plan-register`, `plan-register-grammar`,
  `project-model`, `project-model-type`, `run-journal`, `cost-log`
  (the Cost log, `docs/cost-log.md`), `RU-012` (how two repositories
  share one unit of code), `RU-016` and `RU-021`.
- **P2-N022 creates** `owner-question-queue` (the queue of owner
  questions and answers in the service, and its answering action in
  the web view).
- **P2-N022 modifies** `web-view`.
- **P2-N022 uses** `web-view` and `task-pull-loop` (the task tools
  P2-N005 creates; where P2-N005's specification names that resource
  otherwise, the Orchestrator uses its slug).

**What the rule derives.** Under P3-N007 decision 3, P2-N021 depends
on P3-N007, which creates `project-model-type`. P2-N022 depends on
P2-N021, which creates `web-view`, and on P2-N005. No dependency points
from P2-N021 to P2-N022, so there is no cycle.

**A limit of the rule.** The rule is per node. Decision 8 is per task:
E1 and E2 do not wait on P3-N007, and E3 does. The edge on
`project-model-type` is true of the node, so it is stated. The register
note carries decision 8's split. Until P3-N009 writes the rule into
dispatch's selection, dispatch reads the note. A Backlog addition
proposed in this task's result holds the general question.

**What the edges leave out.** P2-N022 follows P2-N006 by the owner's
ordering, and no resource carries that. The register note carries it.
P2-N006 depends on P2-N021. P2-N006's own plan writes that edge, on
`web-view`.

## Register action proposed with this specification

RU-020 applies. The children above carry outcome, edges and criteria
at the depth a break-down task would produce. The IDs assume that
P2-N005's specification, not yet written, proposes four children,
children A to D of its plan, and that the Orchestrator issues them
P2-N017 to P2-N020. These two would then be P2-N021 and P2-N022.

- P2-N003 moves `planned` → `specified` → `broken-down` at this gate,
  in one act. Its line gains
  `· spec: specs/p2-n003-owner-questions-and-plan-view.md`.
- Two children are entered `identified` under P2-N003, in this order:

  ```
    - P2-N021 [identified] The web view's first version: the plan tree from commits, drilling to node and task — independent of P2-N005 and P2-N004 (RU-018; owner, 2026-10-29); its task E3 waits on P3-N007 done, its tasks E1 and E2 do not (plan decision 8) — spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N022 [identified] The owner question queue: gate decisions answered in the web view, picked up through the task-pull loop — depends on P2-N021 and P2-N005, and follows P2-N006 (owner, 2026-10-29) — spec: specs/p2-n003-owner-questions-and-plan-view.md
  ```

- P2-N006's note names the child by ID: `— depends on P2-N005 and on
  P2-N021, the web view's first version, not on P2-N003 as a whole
  (owner, 2026-10-29)`.
- Each child gets a Backlog entry at identification (K-003; founding
  ruling 1).

## Decisions for the gate

Numbering continues the plan's, so one go-ahead adopts one list. The
plan carries 1 to 10, adopted on 2026-10-30. This document carries 11
to 15. The owner's go-ahead adopts every default not overridden by
number. Ratifying the three terms under *Terms this specification
introduces* is asked beside these.

Checked against the [Ruling register](../rulings.md). RU-009 (work
reaches `main` by pull request), RU-012 (how two repositories share
one unit of code), RU-016 (the Planner declares the repository access
a node needs), RU-018 (a child is not queued behind a sibling it does
not depend on), RU-019 (a measurement may be met by an unfavourable
result) and RU-020 (an interior node whose specification carries its
children needs no separate break-down task) apply. Each decides its
question silently. No ruling reaches the five below.

11. **What "not computable" covers.** **Default:** the view marks a
    rendering or an item not computable, naming the file, the line and
    the missing input, in three cases only. (a) The instance,
    `docs/project-model.md`, is absent at the page's SHA. (b) An entry
    fails the type's entry grammar, so the parser reports it. (c) Step
    6 of the implementation map finds that the stages give a value
    other than the `state:` line's. A line reading `not yet derived`
    is not a case: the type's procedure finishes, and the view carries
    the type's note. **Rationale:** the type's procedure names no "not
    computable" case, since that wording is the slice record's. These
    are the three points where the procedure cannot finish, and any
    other case would be a rule of the view's own, which decision 9
    rules out. **Affected locations:** in
    `docs/plans/p2-n003-owner-questions-and-plan-view.md`, active, at
    the end of decision 9, add: "(Refined at the specification gate by
    decision 11 of the
    [specification](../specs/p2-n003-owner-questions-and-plan-view.md#decisions-for-the-gate).
    The type's procedure names no "not computable" case. That
    decision lists the three cases where the procedure cannot finish.)"

12. **Whether a part's state change gets a journal event.** **Default:**
    no. The view derives each part's state when it renders a page.
    **Rationale:** a part's state is derived from Plan register stages,
    and the journal already records every stage change. An event would
    record a derivation, not an act. The [observability
    spec](../process/observability.md) homed this gap in P2-N003 for
    the view to decide. **Affected locations:** in
    `docs/process/observability.md`, under *Events*, two corrections.
    - Replace "Two further events of the Project model have no kind
      yet. Each is a recorded gap with a home." with "Two further
      events of the Project model have no kind. The first is a
      recorded gap with a home. The second needs no kind."
    - Replace the bullet beginning "A part's state change belongs to
      node P2-N003" with: "- A part's state change has no event kind,
      by decision 12 of the [specification of P2-N003 (owner questions
      and the plan
      view)](../specs/p2-n003-owner-questions-and-plan-view.md#decisions-for-the-gate).
      A part's state is derived from Plan register stages, and this
      journal already records every stage change. The web view derives
      a part's state when it renders a page."

13. **The view cookie's key and lifetime.** **Default:** the
    signature key is derived from the view token by HMAC-SHA256 over a
    fixed label. The cookie lives 30 days. Rotating the view token
    signs every device out. **Rationale:** the owner mints and stores
    one secret, not two. Rotation is then the one revocation act, and
    30 days spares the owner re-entering a token on a phone each week.
    **Affected locations:** none.

14. **The outcome and documents of a node whose line links no plan.**
    **Default:** the node page's Outcome field reads "no plan linked",
    and its Documents field shows the nearest ancestor's links,
    labelled with that ancestor's ID. A linked plan with no *Outcome*
    section gives "the plan has no Outcome section", with the link.
    **Rationale:** the plan's "no plan yet" misreads a `done` child
    whose criteria live in its parent's specification, such as P2-N013
    to P2-N016. Dispatch's member-documents rule already takes the
    nearest ancestor's documents. **Affected locations:** in
    `docs/plans/p2-n003-owner-questions-and-plan-view.md`, active,
    under *What it shows: three pages*, replace the bullet "Outcome is
    the first paragraph of the plan's *Outcome* section, or "no plan
    yet"." with: "Outcome is the first paragraph of the *Outcome*
    section of the plan the node's register line links. Where the line
    links no plan, the field reads "no plan linked", and the documents
    field shows the nearest ancestor's links (decision 14 of the
    [specification](../specs/p2-n003-owner-questions-and-plan-view.md#decisions-for-the-gate))."

15. **Who verifies child 1 and the node.** **Default:** attended
    verification. The owner performs V30 and I1, and the Orchestrator
    assembles the evidence for every other criterion. No Reviewer is
    dispatched unless the owner asks. **Rationale:** V30 and I1 are
    the owner's own judgment of the view, and the other criteria are
    answerable from repository content, run logs and HTTPS calls.
    P2-N002 and P2-N012 were verified the same way. **Affected
    locations:** none.

## References

- [Plan of P2-N003](../plans/p2-n003-owner-questions-and-plan-view.md):
  the approach, decisions 1 to 10 and the gate record of 2026-10-30.
- [Service plan](../plans/orchestration-service.md): the standing
  constraints and chunk 2.
- [Specification of P2-N002](p2-n002-service-skeleton.md) (service
  skeleton and plan state): criteria I5 and I7, the write model and
  the bearer token.
- [Specification of P2-N012](p2-n012-deploy-from-ci-on-merge.md)
  (deploy the service from CI on merge): the smoke test, the aliases,
  criteria I1, I3 and I6, owner actions O7 to O10.
- [Project model type](../process/project-model.md): the entry grammar,
  the two renderings, the dependency rule and the navigation bound.
- [Project model instance](../project-model.md) and the [slice
  record](../project-model-slice-record.md).
- [Hand rendering of the plan](../plan.md).
- [Plan model](../process/plan-model.md),
  [profiles](../process/profiles.md),
  [dispatch](../process/dispatch.md) and
  [observability](../process/observability.md).
- [Ruling register](../rulings.md): the rulings named above, and
  RU-021 (the planning/execution model is the source of progress
  truth).
- [Risk register](../open-risks.md): R10, R11, R12 and R14.
- Service repository, read at its `main`, commit `58e6819`:
  `src/httpApp.ts`, `src/auth.ts`,
  `src/planRegister/registerFetcher.ts`, `template.yaml`,
  `scripts/smoke-test.sh`, `scripts/deploy.sh`, `README.md`,
  `docs/runbook.md` and `docs/deploy-role-permissions.md`.
