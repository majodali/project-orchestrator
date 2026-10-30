# The owner sees the plan in a browser, and answers gate decisions there

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P2-N003; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's plan gate. It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), the [process
specification](../process/README.md), and the [service
plan](orchestration-service.md).

[Node](../process/README.md#def-node) P2-N003 (owner questions and the
plan view) is chunk 2 of P2-N001, the [orchestration
service](orchestration-service.md#chunk-2--owner-questions-and-the-plan-view).
The owner's review of the service on 2026-10-29 settled its shape
([record](https://github.com/majodali/methodology/blob/main/docs/records/service-review-2026-10-29.md),
asks 3, 4 and 5, all adopted). This plan records the outcome, the
approach, the dependencies and the split into two children. It stages
ten decisions for the gate.

## Outcome

The owner sees this project's plan in a browser on any device, and
later answers gate decisions there. Git still holds every fact the
view shows and every answer the owner gives.

At `done`, both children are `done`:

- The [web view](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-web-view)'s
  first version is deployed with the service. It shows the plan tree at
  a named commit, with stages, outcomes, dependencies and what is next.
  It drills from the tree to a node and from a node to a
  [task](../process/README.md#def-task). It reads from commits only
  and changes nothing.
- The [owner question
  queue](orchestration-service.md#design-sketch) holds gate decisions
  the Orchestrator raises. The owner answers them in the web view. A
  session picks each answer up through the [task-pull
  loop](orchestration-service.md#standing-constraints) and commits it
  to git.

The service plan's chunk gate stands for the node: the owner answers a
real gate decision from the web view.

## What the owner already decided

These are inputs, not decisions of this plan.

- P2-N003 splits into the web view's first version and the owner
  question queue (review ask 3).
- The web view is specified against the [comprehension
  model](p3-n002-comprehension-model.md) after its five-resource
  slice, P3-N006 (the thin end-to-end slice). P3-N006 reached `done`
  on 2026-10-30.
- The web view's first version may run in parallel with P2-N005 (the
  task-pull loop).
- The first version is read-only, reads from commits only, and drills
  to node and task (review ask 4; vision claims C54 and C78).
- The service plan's design-sketch line "updated as sessions publish,
  not by polling git" is struck. Live session status moves to topics,
  P2-N004 (topics and coordination).
- The owner question queue comes after the
  [pilot](orchestration-service.md#chunk-5--migration-and-pilot),
  P2-N006 (migration and pilot). It carries the web view's scheduling
  and delegation decisions (review ask 5; roadmap claim C31).
- The pilot waits on P2-N005 and the web view's first version (review
  ask 6; roadmap claim C24).
- Drilling to code and test results waits for the plan-model
  amendment on where each node's verification evidence lands. That
  amendment follows the pilot (review ask 10; roadmap claims C35 and
  C36).

## Approach: the web view's first version

### What it reads: four files at one commit

Every page reads repository content at one commit, through the
service's installed GitHub App. The service already does this for
`plan_read` (P2-N009, plan-state read). Its fetcher resolves a ref to
a SHA, then reads files pinned to that SHA. The view reuses that
fetcher with other paths.

| File at the SHA | What the view takes from it |
|---|---|
| `docs/plan-register.md` | the node tree, each node's stage and hold, its title, its notes and its document links |
| `docs/project-model.md` | the resource entries, their facets and their node edges |
| `docs/cost-log.md` | one row per accepted task: node, stage, role, date |
| `orchestration/journal.jsonl` | each task's events: dispatched, result received, accepted, and the rest |

A node page also reads the node's plan document, for its *Outcome*
section. Links to every other document point at GitHub's file view at
the same SHA (decision 6).

The [Plan register](../plan-register.md) is parsed by the vendored
grammar the service already carries. The [Project
model](../project-model.md) is parsed by one parser, written in this
repository and vendored to the service (decision 7). The Cost log and
the journal are a table and JSON lines. If their parsing in the
service would copy logic from `plugin/scripts/lib/form-check-core.ts`,
the execute task moves that logic into the shared unit instead, under
RU-012 (how two repositories share one unit of code).

Content at a SHA never changes. So the service may cache file content
in memory, keyed by SHA. It resolves the ref to a SHA on every
request. No cache answers what the current state is. This keeps
P2-N002 criterion I5 (ref discipline) and the R10 property (the
service never answers from its own store).

### What it shows: three pages

The pages follow `docs/plan.md`, which the owner called a good first
attempt at this view. They carry its five node fields in its order.

- The tree page. Every node of the register, nested, with its stage,
  its hold marker and its dependency notes. Beside the tree, the two
  renderings the type spec defines: the implementation map and the
  list of what is next (decision 9). The page header names the ref,
  the SHA and the fetch time.
- The node page. The five fields of `docs/plan.md`: stage, outcome,
  depends on, needed by, documents. Then the resources the node
  creates, modifies or uses, from the model's edge lines. Then the
  node's tasks.
  - Stage carries a date where the run journal records one, labelled
    as from the journal, which is telemetry.
  - Outcome is the first paragraph of the plan's *Outcome* section, or
    "no plan yet".
  - Depends on and needed by come from the register's notes. Once the
    instance records a node's edges, they also come from the edges, by
    the dependency rule of P3-N007 decision 3.
- The task page. The task's Cost log row and its journal events in
  order.

Every page states that it has no progress authority. Under K-003 (the
Backlog is the single source of progress truth) at 1.6.0, the Backlog
stays the referent. That holds until the amendment P3-N007 drafts is
released and pinned (P3-N002 decision 13, whether this repository acts on
the amended rule before its release, option (a)). The instance
already states the same limit.

The pages must work on a phone. Until the remote MCP connector exists,
the view in a browser is how the owner sees the plan away from a
cloned session (review, proposed roadmap changes).

### How it is served: the same function, new read-only routes

The view is part of the service, not a separate site (decision 3). The
service's one Lambda function already runs one Hono app. The app gains
`GET` routes under `/view` that return server-rendered HTML. No client
framework and no build step for a browser bundle are added.

The HTTP API binds routes explicitly to the `live` alias in
`template.yaml`. The view adds its routes the same way. The `preprod`
Function URL already serves every path. The smoke test that gates
promotion gains one authenticated view request (P2-N012, deploy the
service from CI on merge).

### How it is authenticated: a separate read-only token

A browser cannot send the bearer header the MCP endpoint requires on
a page load. So the view has its own credential (decision 4).

- The owner mints a second token. It is stored in Secrets Manager, as
  the MCP token is.
- A sign-in page takes the token once. The service answers with a
  signed cookie: `HttpOnly`, `Secure`, `SameSite=Strict`, with an
  expiry. The signature lets the service check the cookie without a
  session store.
- Every `/view` route refuses a request without a valid cookie.
- The MCP endpoint refuses the view's token. A leaked view cookie reaches
  no write tool.
- Sign-in is the only request that changes anything, and it changes
  only the caller's cookie. So a forged cross-site request has nothing
  to change.

### What "commits only" rules out

The view never reads these:

- The lease table, or any other state the service holds. The view does
  not say who holds the write lease.
- Anything a session publishes to the service. Live session status is
  topics' work, P2-N004.
- Work that is not pushed to the ref the page reads.
- GitHub data that is not repository content: pull requests, workflow
  runs, issues, checks.

And the view never does these:

- Change a stage, answer a question, schedule or delegate. Those
  arrive with the owner question queue.
- Refresh itself on a push from the service. A reload reads the ref
  again and shows the new SHA.

### The execute run: a thin slice first

The view child is a leaf, run as three execute tasks in this order.
Each ends at something the owner can open.

1. The thin end-to-end slice: the tree page from the register alone,
   behind sign-in, deployed through CI and passing the smoke test.
2. The node page and the task page, from the register, the plan
   documents, the Cost log and the journal.
3. The model: the parser, the two renderings on the tree page, and the
   resource lines on the node page. This task waits on P3-N007
   (decision 8).

## Approach: the owner question queue, after the pilot

The queue is deferred until P2-N006 closes (roadmap step 5). It is
planned and specified then, in its own tasks (decision 2). This plan
records its outcome, its dependencies and the questions its plan must
answer.

It depends on the task-pull loop for a structural reason. Under the
write model, a session is git's only writer and the service never
writes the repository (P2-N002 plan, decision 3). So an answer the
owner gives in the view reaches git only through a session. The
session that delivers it is the one that pulls its next task. Without
P2-N005's pull and claim tools, nothing carries the answer.

What the queue carries:

- Gate-batched questions, answered in the web view. Answering is the
  view's first write action.
- The web view's scheduling and delegation decisions (review ask 5).
- Immediate-class questions by MCP elicitation, as the service plan's
  design sketch has them. Risk R11 (MCP surface constraints) records
  that elicitation dialogs block.

What its plan must answer:

- Where an answer lives between the owner's click and a session's
  commit. Held in the service, it is state outside git. The queue's
  plan says how R10 (the service becomes a second source of truth)
  still holds.
- How a question the Orchestrator raises reaches the queue. Today a
  gate's decisions are a section of a committed plan.
- Which question tools reach surfaces without a repository clone. The
  remote MCP connector node, after the pilot, gives those surfaces
  read, question and delegation tools (review ask 8).

## What this node does not cover

- Drilling to code and test results. It waits for the plan-model
  amendment, which follows the pilot. A Backlog addition holds it.
- Live session status. Topics, P2-N004, if the pilot shows the need.
- The plan of a project other than this one. Multi-project plan state
  is built inside P2-N006.
- A `model_read` MCP tool. The view reads the model inside the
  service. The Backlog entry "Service support for the comprehension
  model" stays open for a session-facing tool.
- Sign-in by GitHub account. A Backlog addition holds it.
- The switch of this project's Backlog to a rendering of the model.
  The existing Backlog entry holds it, after the amendment's release.

## Leaf or interior

Interior, with two children.

The cut is feature-first. Seeing the plan and answering questions are
two features. Each validates on its own: the owner can use the view
for months before the queue exists. The owner made this cut at the
review.

### Proposed children, in dependency order

IDs are the Orchestrator's to issue.

#### Child 1: the web view's first version

Register title: The web view's first version: the plan tree from
commits, drilling to node and task.

Outcome: in a browser on any device, the owner sees the plan tree of
this repository at a named commit. Each node shows its stage, outcome
and dependencies, beside what is next. The owner drills from a node to
its tasks. Every fact shown comes from that commit.

A leaf, run as the three tasks above. It ends at an owner demonstration
(decision 10).

#### Child 2: the owner question queue

Register title: The owner question queue: gate decisions answered in
the web view, picked up through the task-pull loop.

Outcome: a gate decision the Orchestrator raises waits in the queue.
The owner answers it in the web view. The session that pulls its next
task picks up the answer and commits it to git.

Leaf or interior is decided at its own planning.

### Order and independence under RU-018

RU-018 (a child is not queued behind a sibling it does not depend on)
applies as follows.

- Child 1 needs nothing child 2 produces. It is independent of P2-N005
  and P2-N004 (owner, 2026-10-29).
- Child 2 is not independent of child 1. It adds the answering action
  to the view child 1 builds.
- Child 2 depends on P2-N005 for the pull and claim tools.
- Child 2 follows P2-N006 by the owner's ordering, not by a resource
  it uses.

The register needs one note to make this order hold. P2-N006 follows
P2-N003 in the register. Under the earlier-siblings-`done` default,
P2-N006 would wait for P2-N003 to be `done`. P2-N003 is `done` only
after child 2, and child 2 follows P2-N006. That is a cycle. A note on
P2-N006 naming its real dependencies, P2-N005 and child 1, breaks it.
*Proposed register changes*, below, has the text.

## Dependencies

Edges are in the parent plan's sketch notation, with the `after`
qualifier of P3-N007 decision 3. New resource slugs are proposed here.
The Orchestrator transcribes them when the type spec allows.

- Repository reach, under RU-016 (the Planner declares the repository
  access a node needs):
  - This planning: read-only to
    [majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service).
  - Child 1 execute: write to majodali/project-orchestrator-service,
    which RU-016 places permanently in approved scope. Write to this
    repository, for the model parser under `plugin/scripts/lib/`, the
    vendoring generator's manifest, and the Backlog. No repository new
    to the project, so no owner grant.
  - Child 2: declared at its own planning.
- Child 1 creates `web-view` and `project-model-parser`, unless P3-N009
  (sibling ordering retired, and the checks that replace it) writes
  the parser first (decision 7).
- Child 1 modifies the service's HTTP surface (`src/httpApp.ts`),
  `template.yaml`, the deploy smoke test, the service README and
  runbook, and the vendoring manifest.
- Child 1 uses `plan-register`, `plan-register-grammar`,
  `project-model`, `project-model-type`, `run-journal`, the Cost log,
  RU-012, RU-016 and RU-021 (the planning/execution model is the
  source of progress truth).
- Child 2 creates `owner-question-queue`. It uses `web-view` and the
  task-pull loop's tools.
- Nodes:
  - P3-N006: `done` 2026-10-30. It created `project-model`.
  - P3-N007 (the type declared, the arguments written, the K-003
    amendment drafted): `executing`. It creates `project-model-type`.
    Child 1's third task waits on it (decision 8).
  - P3-N008 (the instance over this repository): not a dependency.
    It fills the instance the view renders.
  - P2-N005: child 2 depends on it. Child 1 does not.
  - P2-N006: child 2 follows it. P2-N006 depends on child 1.
- Overlap, not dependency:
  - P2-N005 also changes the service's source and `template.yaml`.
    The two may conflict at merge, not in design. P2-N005 decides
    role-aware identity on the MCP path. The view's token is separate
    and read-only, so neither waits on the other.
  - P3-N009 needs a model parser for its form-check rules. Decision 7
    makes it one parser.
  - P3-N002 criterion I10 holds the vendored files
    `plugin/scripts/lib/plan-register.ts` and `lib/corpus/`
    byte-identical across P3-N002's commits. Child 1 adds a file to
    the manifest and changes neither.
- Owner actions:
  - Mint the view's token and store it in Secrets Manager, under the
    name the runbook gives.
  - Merge child 1's pull requests (RU-009, work reaches `main` by pull
    request).
  - Watch the demonstration (decision 10).

## What the specification will verify

C1 profile depth: a criteria list a verifier can check
([profiles](../process/profiles.md)).

For the node, at its own `verifying`, after both children:

- The owner answers a real gate decision in the web view.
- The answer reaches git as a commit by the session that picked it up.
- The view, reloaded, shows the decision's effect at the new SHA.
- With the service down, the same gate is crossed in chat, by the v1
  process (standing constraint 3).

For child 1, the inputs the specification turns into criteria:

- Every page names its ref and SHA. A sample of shown facts matches
  the files at that SHA.
- No code path renders a page from the lease table or any store but
  git content.
- No `/view` route changes state, except the caller's own cookie. The
  MCP endpoint refuses the view's token.
- The two renderings follow the type spec's procedures. Each adds no
  claim the instance lacks and drops only the facets its procedure
  names (P3-N002 criterion G6, the model renders the Backlog's two
  remaining jobs, applied per view).
- From the tree page, each of the five answers for a resource is
  reached within [the navigation bound](../specs/p3-n002-comprehension-model.md#the-navigation-bound)
  of three steps, a link click counting as one step.
- No secret appears in either repository's history (P2-N002 criterion
  I7, no secret anywhere).
- Cold and warm page latency is measured and recorded, whichever way
  it falls (RU-019, a measurement may be met by an unfavourable
  result).

## Monotonicity

This node proposes no planned non-monotonicity. The struck live-update
line was a design sketch, not a functional test. No previously defined
test is rewritten.

## Precedents applied

Checked against the [Ruling register](../rulings.md). Each decided its
question without a gate entry.

- RU-006 (a new capability gets its own repository when separately
  deployable or holding secrets): the view is neither apart from the
  service. It joins the service repository.
- RU-008 and RU-011 (TypeScript on Node): the view's code.
- RU-009: child 1's work reaches `main` by pull request.
- RU-012: one model parser, canonical here, vendored out.
- RU-016: the reach above.
- RU-017 (another project's adoption is a separate node): the view
  serves this repository. The pilot project comes with P2-N006.
- RU-018: the order above.
- RU-019: the latency criterion.
- RU-020 (an interior node whose specification carries its children
  needs no separate break-down task): the children are entered at this
  node's specification gate.
- RU-021, with P3-N002 decision 13 option (a): the view claims no
  progress authority before the amendment's release.

## Decisions for the gate

1. The two children and their order. **Default:** child 1, the web
   view's first version, then child 2, the owner question queue. Child
   2 depends on child 1 and P2-N005, and follows P2-N006.
   **Rationale:** the owner's split of 2026-10-29, with the one real
   dependency between the children stated. **Affected locations:** in
   `docs/plans/orchestration-service.md`, active, three corrections
   placing the owner's strike of 2026-10-29:
   - In the opening outcome paragraph, replace "and publishing a plan
     view that updates as work happens" with "and publishing a web
     view of the plan, read from commits".
   - In *Design sketch*, replace the bullet beginning "**The UI** is a
     separate consumer" with: "- **The UI** is a separate consumer of
     the service: the plan hierarchy, drillable to node and task,
     read from commits only; and, after the pilot, the queue of
     questions awaiting the owner. Live status per enlisted session
     belongs to topics (owner, 2026-10-29)."
   - Replace the body of *Chunk 2 — Owner questions and the plan
     view* with: "Node P2-N003, split at its planning into two
     children (owner, 2026-10-29; [plan](p2-n003-owner-questions-and-plan-view.md)).
     The web view's first version comes first: read-only, read from
     commits only, drilling to node and task, in parallel with the
     task-pull loop and before the pilot. The owner question queue
     follows the pilot: gate decisions answered in the web view and
     picked up through the task-pull loop, and immediate-class
     questions by elicitation.
     Gate: the owner answers a real gate decision from the web view.
     The web view's first version ends at its own owner
     demonstration."

2. How deep the node's specification goes. **Default:** it carries
   child 1 at full criteria depth, so child 1 goes to execute with no
   plan or specify task of its own. It carries child 2 at outcome
   depth only. Child 2 gets its own plan and specify tasks after
   P2-N006. **Rationale:** this plan already fixes the view's design,
   and the queue's design depends on P2-N005 tools that do not exist
   yet. **Affected locations:** none.

3. Where the view is served. **Default:** the existing function and
   Hono app, with server-rendered `GET` routes under `/view` bound to
   the `live` alias. **Rationale:** it reuses the deploy, smoke and
   promote path P2-N012 built, and adds no infrastructure.
   **Affected locations:** none.

4. How a browser signs in. **Default:** a separate read-only token,
   entered once, exchanged for a signed `HttpOnly` cookie. The MCP
   endpoint refuses it. **Rationale:** a browser cannot send the
   bearer header, and a leaked view cookie must not reach the write
   tools. GitHub sign-in waits in the Backlog. **Affected locations:**
   none.

5. Which commit a page reads. **Default:** the head of the default
   branch. A `ref` query parameter selects another branch or a SHA.
   Every page names the SHA. **Rationale:** `main` is what the owner
   merged, and a branch view serves review before a merge.
   **Affected locations:** none.

6. Where a document link goes. **Default:** to GitHub's file view at
   the same SHA. The view renders only its three pages. **Rationale:**
   it keeps every link commit-pinned with no Markdown renderer to
   maintain. The owner is already signed in to GitHub. **Affected
   locations:** none.

7. Who writes the model parser. **Default:** whichever of child 1 and
   P3-N009 executes first writes it in this repository, under
   `plugin/scripts/lib/`, vendored to the service. The other imports
   it. **Rationale:** RU-012 allows one canonical copy, and the order
   of the two nodes is not fixed. **Affected locations:** none.

8. What child 1 waits for. **Default:** its first two tasks start
   after this node's specification gate. Its third task, the model,
   waits on P3-N007 `done`. It does not wait on P3-N008.
   **Rationale:** the pilot waits on the view, and the type spec may
   still move until P3-N007 closes. P3-N008 adds content, not grammar.
   **Affected locations:** none.

9. What "what is next" means in the view. **Default:** the type
   spec's what-is-next procedure, and no rule of the view's own.
   Where the procedure says "not computable", the view says so.
   **Rationale:** the owner chose to specify the view against the
   model, and a second rule would be a second definition of what is
   next. **Affected locations:** none.

10. Whether child 1 ends at an owner demonstration. **Default:** yes.
    The owner opens the view on a phone, picks a node, drills to one
    of its tasks, and checks three facts against git at the SHA shown.
    **Rationale:** the web view is the owner's primary way to see
    status (vision claim C10), and only the owner can judge that it
    serves. **Affected locations:** none beyond decision 1's chunk 2
    text.

## Proposed register changes

- P2-N003 `identified` → `planned`, with this plan linked:
  `P2-N003 [planned] Owner questions and the plan view (chunk 2) — split into the web view's first version and the owner question queue (owner, 2026-10-29) — plan: plans/p2-n003-owner-questions-and-plan-view.md`.
- P2-N006 gains the note: `— depends on P2-N005 and the web view's
  first version of P2-N003 (owner, 2026-10-29)`.
- The two children are entered `identified` at this node's
  specification gate (RU-020), not now.

## Backlog additions

In the row shape the Backlog header declares.

- [ ] **Drill from the web view to code and test results** — When:
  2026-10-30, planning P2-N003 (T075). Status: open; waits for the
  plan-model amendment on where each node's verification evidence
  lands, after the pilot. Pointer: [plan of
  P2-N003](p2-n003-owner-questions-and-plan-view.md#what-this-node-does-not-cover).
- [ ] **Sign-in to the web view by GitHub account** — When:
  2026-10-30, planning P2-N003 (T075). Status: open; replaces the
  view's token when a second person needs the view, beside the OAuth
  entry. Pointer: [plan of
  P2-N003](p2-n003-owner-questions-and-plan-view.md#how-it-is-authenticated-a-separate-read-only-token).
- [ ] **The model's two renderings as shared code** — When:
  2026-10-30, planning P2-N003 (T075). Status: open; the view renders
  them in the service, and RU-012 asks for one copy once this
  repository renders its Backlog by script. Pointer: [plan of
  P2-N003](p2-n003-owner-questions-and-plan-view.md#what-it-shows-three-pages).
- [ ] **Whether the web view replaces `docs/plan.md`** — When:
  2026-10-30, planning P2-N003 (T075). Status: open; decided at child
  1's demonstration, against `docs/plan.md`'s own retirement
  condition. Pointer: [plan.md](../plan.md).

## References

- [Service plan](orchestration-service.md): standing constraints, the
  design sketch, chunk 2.
- [Service review of
  2026-10-29](https://github.com/majodali/methodology/blob/main/docs/records/service-review-2026-10-29.md)
  and the methodology's [roadmap
  IR](https://github.com/majodali/methodology/blob/main/docs/roadmap.ir.md),
  steps 3 and 5.
- [Comprehension model plan](p3-n002-comprehension-model.md) and
  [specification](../specs/p3-n002-comprehension-model.md); the
  [instance](../project-model.md) and the [slice
  record](../project-model-slice-record.md).
- [P3-N007 plan](p3-n007-type-declared-amendment-drafted.md), the type
  spec's author.
- [Service skeleton plan](p2-n002-service-skeleton.md) and
  [specification](../specs/p2-n002-service-skeleton.md): the write
  model, the bearer token, the GitHub App.
- [Deploy from CI plan](p2-n012-deploy-from-ci-on-merge.md): the smoke
  test and promotion.
- [docs/plan.md](../plan.md): the hand-made precursor of the view.
