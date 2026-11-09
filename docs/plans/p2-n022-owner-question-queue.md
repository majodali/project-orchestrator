# The owner answers gates and asks in the web view, and git records each answer

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P2-N022. It goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Reader: a fresh agent session (RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)),
and the owner at this node's plan gate. It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), the [process
specification](../process/README.md), the [specification of
P2-N003](../specs/p2-n003-owner-questions-and-plan-view.md) and the
[specification of P2-N005](../specs/p2-n005-task-pull-loop.md).

[Node](../process/README.md#def-node) P2-N022 (the owner question
queue) is child 2 of P2-N003 (owner questions and the plan view). The
[specification of
P2-N003](../specs/p2-n003-owner-questions-and-plan-view.md#child-2-the-owner-question-queue)
carries it at outcome depth and lists seven questions its planning
answers. This plan answers them, fixes the approach and the slices,
and stages eleven decisions for the gate.

## Outcome

The owner answers gates and asks on a phone, in the [web
view](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-web-view).
Git records every question and every answer. Today the open asks live
only in the Orchestrator's conversation and in a scratchpad HTML page.

At `done`:

- The Orchestrator enters each gate and each ask it raises in a
  [Question register](#def-question-register) in this repository. An
  ask here is an item in a report's Asks part, in the sense of W-008
  (reports map their deliverables).
- The view lists every open question, with its context links, its
  options and its default, and every answered one, with its answer.
- The owner answers in the view. The service holds the answer as a
  [held answer](#def-held-answer) until the Orchestrator commits it to
  the register. A held answer decides nothing.
- In a [pull run](../specs/p2-n005-task-pull-loop.md#def-pull-run),
  the Orchestrator picks up held answers at each loop and commits them.
  The task it then offers carries the decisions the answer adopted.
- With the service down, the owner answers in chat, and the
  Orchestrator records the answer in the Question register.

The owner's check at the end: he answers a real gate from the phone,
then sees the answer committed and shown at the new commit.

## What the owner already decided

The items below are inputs, not decisions of this plan.

- The queue's split from the web view, and its outcome (review of
  2026-10-29, ask 3, and [plan of
  P2-N003](p2-n003-owner-questions-and-plan-view.md), decision 1).
- The write model stands. A session is git's only writer. The service
  holds no repository write credential (review ask 8, and [plan of
  P2-N002](p2-n002-service-skeleton.md), decision 3).
- The view token is separate from the MCP bearer token, and the MCP
  endpoint refuses it (plan of P2-N003, decision 4).
- On 2026-11-03 the owner set three things. P2-N022 no longer follows
  P2-N006 (migration and pilot). It depends on P2-N021 (the web view's
  first version), which is `done`, and on P2-N005 (the task-pull loop)
  for its final slice only. Owner questions, gates and reviews should
  work in the view soon. Decision 1 places the texts this
  contradicts.

## The seven planning questions, answered

Each row points at the section that carries the answer.

| Question in the specification of P2-N003 | Answer | Where |
|---|---|---|
| 1. Where an answer lives between the click and the commit | A held answer, one item per question in the lease table of the alias that answered, until the Orchestrator commits it | [Where a held answer lives](#where-a-held-answer-lives); decision 4 |
| 2. How a question reaches the queue | The Orchestrator commits it to the Question register when it raises it | [The Question register](#the-question-register-slice-e1); decision 3 |
| 3. How the owner is authorized to answer | The view cookie, with a same-origin check on the answering route | [Who may answer](#who-may-answer); decision 5 |
| 4. Which question tools reach surfaces without a clone | Read only, through the remote MCP connector node when it exists; no answering over MCP | [The question tools](#the-question-tools); decision 6 |
| 5. How scheduling and delegation decisions ride the queue | As decisions of a gate's entry: the scope grant is one | [Scheduling and delegation](#scheduling-and-delegation-decisions); decision 7 |
| 6. How elicitation is used | Not in this node: immediate-class questions stay in chat and are recorded | [Immediate-class questions](#immediate-class-questions); decision 8 |
| 7. Leaf or interior | A leaf, with three execute tasks | [Leaf or interior](#leaf-or-interior); decision 2 |

## Approach

### The Question register (slice E1)

A new Document type, defined by citation in the
[Classification](../classification.md), as the Plan register and the
Cost log are (decision 3).

- **The type**: `docs/process/question-register.md`. It states the
  grammar, the states, the kinds and the maintenance rules.
- **The instance**: `docs/question-register.md`. The Orchestrator is
  its single writer, as for the Plan register.
- **The parser**: one canonical copy in this repository,
  `plugin/scripts/lib/question-register.ts`. The shared-unit
  generator, `plugin/scripts/sync_shared_unit.ts`, vendors it to the
  service under RU-012 (how two repositories share one unit of code).
  The form checker reports an entry that fails the grammar.

**When a question is entered.** The Orchestrator enters a gate in the
commit that opens it, the one that journals `gate-opened`. It enters
any other ask in the commit that records the event raising it: a
`needs-judgment` result, an owner action due, or an immediate-class
question. The gate summary in chat names the entry's ID.

**What an entry holds.** One line per question, with one child line
per decision, in the style of the [Plan
register](../process/plan-register.md). The specification fixes the
grammar. This sketch shows its shape.

```markdown
- Q1 [open] gate P2-N022 plan gate — doc: plans/p2-n022-owner-question-queue.md#decisions-for-the-gate · node: P2-N022 · raised: 2026-11-03
  - 1. Record the owner's reordering of 2026-11-03 — default: adopt
  - 5. How the owner is authorized to answer — default: (a) — options: (a) the view cookie, with a same-origin check · (b) the view token, entered with each answer · (c) sign-in by GitHub account
- Q2 [answered] action O-queue-1: merge E1's pull requests — doc: https://github.com/majodali/project-orchestrator-service/pulls · node: P2-N022 · raised: 2026-11-05 · answered: 2026-11-05 · via: view
  - answer: done
```

- **ID**: `Q<seq>`, issued in raising order, stable forever.
- **State**: `open`, `answered` or `withdrawn`. Withdrawal is the
  Orchestrator's, for a question that no longer needs an answer, with
  the reason.
- **Kind**: `gate`, `ask`, `action` or `immediate`.
- **Fields**: `doc:` links the document that carries the question in
  full. `node:` names the node. `raised:` gives the date. An answered
  entry adds `answered:` and `via:`, which reads `view` or `chat`.
- **Decision lines**: numbered as the gated document numbers them. Each
  carries the decision's one-line title, its default, and its options
  where the document lists any. On answering, each gains `answer:`:
  `default`, an option's label, or `see note`.
- **The note**: an optional `note:` child line holds the owner's free
  text, verbatim.

The gated document stays the authority for each decision. The entry
carries what the owner needs on a phone: the title, the default, the
options and a link to the full text.

### The questions page (slice E1)

Two read-only pages in the service, behind the [view
cookie](../specs/p2-n003-owner-questions-and-plan-view.md#def-view-cookie).

| Method and path | Answers |
|---|---|
| `GET /view/questions` | open questions first, then answered and withdrawn ones, newest first |
| `GET /view/questions/<question ID>` | one question: its decisions, defaults, options and context links, and its answer once committed |

- Each page reads `docs/question-register.md` at one commit. The page keeps
  the discipline of the tree, node and task pages: one SHA per page,
  the header and the limit line. Its links go to GitHub's file view at
  that SHA, and its page links carry the `ref`.
- Every view page's header gains a link to `/view/questions`, carrying
  the page's `ref`.
- The code lives in `src/questions/`, not in `src/view/`. The view's
  existing pages keep reaching no store but git. The source test of
  criteria V6 and V17 then passes unchanged (see
  [Monotonicity](#monotonicity)).

### Answering in the view (slice E2)

#### Where a held answer lives

A held answer is one item in the lease table of the alias that
answered, keyed `answer#<question ID>`, with a time-to-live of 30 days
(decision 4). The item holds:

- the question ID, and the SHA of the register the form was read at;
- the owner's choice per decision, and the free-text note;
- the time it was held.

A new answer to that question replaces the held one, until the
answer is committed. The table is the one P2-N005's handles and
progress notes use (specification of P2-N005, decision 17). So the
template gains no resource, and preprod answers stay off production
under P2-N015 (alias-aware lease-table selection).

**How R10 still holds.** R10 is the risk that the service becomes a
second source of truth.

- Only the register in git records a decision. A held answer is
  shown only on the questions pages, labelled "held by the service,
  not committed". The tree, node and task pages never read it.
- The Orchestrator commits the answer, then calls `question_confirm`
  with the commit's SHA. The service reads the register at that SHA.
  If the entry carries the held answer, the service deletes it. If
  not, it reports a divergence naming the line, as `plan_confirm` does.
- Losing a held answer in an outage costs the owner one re-answer.
  Nothing decided is lost, because nothing held is decided.

#### Who may answer

The view cookie authorizes the answering route (decision 5). The
route adds two guards to the cookie's `SameSite=Strict` attribute.

- It refuses a request whose `Origin` header is absent or names
  another origin.
- It refuses a question that is not `open` at the head of the default
  branch. It also refuses one whose entry differs from the entry at the
  SHA the form was read at. The refusal says to reload.

So the view token stops being read-only in one respect: it now answers
owner questions. It still reaches no MCP tool and no write to git.
Decision 5 amends the ratified term *view token* and Risk R18 (the view
cookie is a standing read credential) to say so.

| Method and path | Answers |
|---|---|
| `POST /view/questions/<question ID>/answer` | stores the held answer and answers `303` to the question's page; or refuses, naming the reason |

The form needs no script. Each decision offers its default, each
listed option and "see note". One button adopts every default. A text
field takes the note, up to 2000 characters.

#### The question tools

Three MCP tools, on the endpoint enlisted sessions already reach
(decision 6).

| Tool | Reads | Does |
|---|---|---|
| `question_list` | the register at a `ref` | returns the open questions, each with its held answer labelled `held` |
| `question_answers` | the held answers, and the register at the default branch's head | returns each held answer whose question is still open |
| `question_confirm` | the register at a `sha` | deletes the held answer the commit carries, or reports the divergence |

No tool raises a question: raising is a commit. No tool answers one.
Every session holds one shared bearer token. So an answering tool
would let any agent answer the owner's gate.

A surface without a repository clone gets `question_list` through the
remote MCP connector node, after the pilot. Whether such a surface may
answer is that node's decision, once its authentication proves the
owner (review of 2026-10-29, ask 8). A Backlog addition holds it.

#### The commit, by the Orchestrator

In slice E2 the Orchestrator takes held answers at step 1 of [the
loop](../process/dispatch.md#the-loop), before selection. It also takes
them when the owner says he answered.

1. It calls `question_answers`.
2. For each held answer, it edits the entry: the state to `answered`,
   `via: view`, each `answer:` and the note. It commits and pushes.
3. It calls `question_confirm` with that commit's SHA.
4. A gate's answer then crosses the gate by the ceremony of
   [Gates (v1)](../process/dispatch.md#gates-v1). The gate record names
   the entry.

A note or a `see note` answer is recorded verbatim. Acting on it
follows the process as for an answer given in chat. The Orchestrator
resolves no ambiguity.

**Without the service.** The owner answers in chat. The Orchestrator
records the answer with `via: chat`. The fallback rule of
[dispatch.md](../process/dispatch.md#the-orchestration-service-optional-accelerator)
is unchanged.

### The pickup in a pull run (slice E3)

Slice E3 waits for P2-N020 (the task tools) to be `done`, and so for
P2-N018 (the loop in git alone) and P2-N019 (role-aware identity).

- `question_answers` and `question_confirm` require a [session
  handle](../specs/p2-n005-task-pull-loop.md#the-session-handle) whose
  role is `orchestrator`. Any other role is refused, naming it.
  `question_list` takes any role.
- The *Pull runs* section of dispatch.md gains one step. At each loop,
  beside the `stale` rule, the Orchestrator takes held answers and
  commits them. Where an answer crosses a gate, the next task file it
  offers carries the adopted decisions in its brief.
- So the session that pulls its next task meets the answer in git,
  which is the outcome the specification of P2-N003 states.

Nothing in this node wakes the Orchestrator when the owner answers.
The service spawns no agent (service plan, standing constraint 5). The
pickup runs whenever the Orchestrator next loops: a task's result, the
owner's message, or a resume within approved scope. A Backlog addition
holds the wake-up.

### Immediate-class questions

The four immediate classes of
[dispatch.md](../process/dispatch.md#owner-decision-economics) stay in
the asking session's chat, as in v1. The Orchestrator records each as
an `immediate` entry, so the view lists it with its answer (decision
8).

This node sets elicitation aside, for two reasons read in the service
repository at `8b1b0d5`.

- The MCP transport answers each request with one JSON body and keeps
  no stream (`src/httpApp.ts`, `enableJsonResponse: true`). An
  elicitation request goes from the server to the client during a
  call, so it needs a stream that this transport does not keep.
- The function's timeout is 20 seconds (`template.yaml`, `Timeout:
  20`). An elicitation dialog waits on the owner, and R11 (MCP surface
  constraints) records that it blocks.

Neither was tested with an elicitation call. A Backlog addition holds
elicitation until the transport changes.

### Scheduling and delegation decisions

The web view's scheduling and delegation decisions (review of
2026-10-29, ask 5) ride as decisions of a gate's entry (decision 7).

- The scope grant a gate approves is the scheduling decision: the
  nodes and stages, the gates, the budget. The Orchestrator enters it
  as one decision of the gate, with the proposed grant as its default.
- The delegation decision is the grant's pull-run line and its
  pre-authorizations. It rides as a decision of the gate too.
- A direction the owner starts unasked, such as "run P2-N017 next",
  needs a new kind of entry the owner writes. A Backlog addition holds
  it.

### What this node does not cover

- Answering from a surface without a repository clone: the remote MCP
  connector node's.
- Elicitation: a Backlog addition, until the transport changes.
- Waking the Orchestrator on an answer: a Backlog addition.
- Owner-started directions: a Backlog addition.
- Questions of a project other than this one: P2-N006, which builds
  multi-project plan state.
- A Paraphraser render of an entry for the owner: the entry carries
  the gated document's own one-line titles.

## Leaf or interior

A leaf (decision 2). The three slices share one resource, the queue.
None validates as a feature apart from the others. The register
without answering is the read-only page the owner already has in
scratchpad form. P2-N021 was also one leaf with three execute tasks,
a thin slice first.

A specify task follows this gate. It writes the grammar, the forms
and the criteria. Then the slices run in order.

| Task | Delivers | Waits for | Cycles |
|---|---|---|---|
| Specify | the node's specification: the grammar, the route and tool forms, the criteria | this plan's gate | 1 |
| E1, the register and the questions page | the type, the instance, the parser and the read-only pages, deployed | the specification gate | 1 |
| E2, answering | the answering route, the held answer, the three tools, the commit steps in dispatch.md | E1 accepted and deployed | 1 |
| E3, the pickup in a pull run | the role check and the pull-run step | E2 accepted, and P2-N020 `done` | 1 |
| Verify | the owner's check | E3 accepted and deployed | 1 |

A [cycle](#def-cycle) is one task taken through dispatch, result and
acceptance. The node plans five cycles and is bounded at seven. A
task that would take an eighth stops the run as a budget overrun, an
immediate class.

The owner can answer in the view from E2's deploy. E3 changes who
takes the answers, not what the owner sees.

## Dependencies

Edges are in the [type's
notation](../process/project-model.md#how-a-plan-writes-an-edge). New
slugs carry a gloss.

- **P2-N022 creates** `owner-question-queue`,
  `question-register-type` (the type specification,
  `docs/process/question-register.md`), `question-register` (the
  instance, `docs/question-register.md`) and
  `question-register-grammar` (the parser,
  `plugin/scripts/lib/question-register.ts`, vendored to the service).
- **P2-N022 modifies** `web-view`, `project-orchestrator-service-repo`,
  `project-orchestrator-repo`, `vendoring-generator`, `form-checker`,
  `classification`, `dispatch-rules`, `roles-spec`, `role-contracts`,
  `pull-run-protocol`, `risk-register` and `backlog`.
- **P2-N022 uses** `web-view`, `plan-register-grammar`, `RU-012`,
  `RU-016`, `task-tools`, `session-handle` and `pull-run-protocol`.

**What the rule derives.** Under the [node-to-node
dependency](../process/project-model.md#node-to-node-dependency) rule,
P2-N022 depends on P2-N021, which creates `web-view`. It depends on
P2-N018, P2-N019 and P2-N020, which create the last three resources it
uses. No node P2-N005 holds uses a resource P2-N022 creates, so there
is no cycle.

**A limit of the rule.** The rule is per node, and the wait is per
task: only E3 uses the P2-N005 resources. The register note carries
the split, as for P2-N021's task E3. The Backlog entry *Waits per task
under the node-to-node dependency rule* holds the general question.

**The model entry to correct.** The `is:` line of
`owner-question-queue` says the queue is "in the service". The
questions live in git. Decision 3 carries the drafted text.

### Repository reach

Under RU-016 (the Planner declares the repository access a node
needs). Both repositories are in this project's approved scope, so no
owner grant arises.

| Task | Repository | Access |
|---|---|---|
| This plan | majodali/project-orchestrator-service | read |
| Specify | majodali/project-orchestrator | write: the specification, `docs/backlog.md` |
| Specify | majodali/project-orchestrator-service | read |
| E1 | majodali/project-orchestrator | write: `docs/process/question-register.md` (new); `docs/question-register.md` (new, with its preamble and no entry); `docs/classification.md`, the custom definition; `docs/process/README.md`; `plugin/scripts/lib/question-register.ts` and its tests; `plugin/scripts/sync_shared_unit.ts`, the travelling set; `plugin/scripts/lib/form-check-core.ts`, the parse check; `docs/process/dispatch.md`, *Owner-decision economics* and *Gates (v1)*; `docs/process/roles.md`, the Orchestrator's *Serves*; `.claude/agents/orchestrator.md`; `plugin/agents/` by generator only; `docs/backlog.md` |
| E1 | majodali/project-orchestrator-service | write: `src/questions/` (new); `src/httpApp.ts`, to mount it; `src/view/html.ts`, the header link; `src/planRegister/vendored/` by generator only; `template.yaml`, the route keys; `scripts/smoke-test.sh`; `test/`; `README.md`; `docs/runbook.md`; `docs/backlog.md` |
| E2 | majodali/project-orchestrator-service | write: `src/questions/`; `src/mcpServer.ts` and a new tool module; `template.yaml`, the route key; `scripts/smoke-test.sh`, check 2; `test/`; `README.md`; `docs/runbook.md`; `docs/backlog.md` |
| E2 | majodali/project-orchestrator | write: `docs/process/dispatch.md`, *The loop* step 1 and *Gates (v1)*; `docs/process/observability.md`, the `gate-crossed` note; `docs/backlog.md` |
| E3 | majodali/project-orchestrator-service | write: the tool module, `test/`, `README.md`, `docs/runbook.md`, `docs/backlog.md` |
| E3 | majodali/project-orchestrator | write: `docs/process/dispatch.md`, *Pull runs*; `.claude/agents/orchestrator.md`; `plugin/agents/` by generator only; `docs/backlog.md` |

The Orchestrator writes the Plan register, the Cost log, the journal,
the Question register's entries and the Risk register. E1 creates the
instance empty. The Orchestrator enters the asks open at E1's
acceptance, in its acceptance commit.

`plugin/scripts/lib/plan-register.ts` and `plugin/scripts/lib/corpus/`
stay byte-identical. The generator's travelling set gains a file and
loses none.

### Overlaps, not dependencies

- **P2-N018** writes dispatch.md, roles.md and the contracts. E1 and
  E2 edit other sections. Each task reads those files at its dispatch
  and at each commit, and overwrites no other node's edit, as P2-N018's
  criterion B10 asks of it. E3 edits *Pull runs* after P2-N018 is
  `done`.
- **P2-N023** (web view UX refinement) changes `src/view/**` in an
  owner-attended loop. E1 touches only `src/view/html.ts` there. A task
  rebases on the service's `main` before its merge, and the whole suite
  passes after the rebase.
- **P1-N016** (process spec maintenance) plans edits to dispatch.md.
  The guard above applies to it too.

### Owner actions

Named O-queue-1 to O-queue-4, for the Orchestrator to renumber after
whatever P2-N005's children claim from O14.

- **O-queue-1.** Review and merge E1's pull requests: the service's
  under RU-009 (work reaches `main` by pull request), and this
  repository's under RU-010 (work reaches this repository's `main` by
  pull request).
- **O-queue-2.** Review and merge E2's pull requests.
- **O-queue-3.** Review and merge E3's pull requests.
- **O-queue-4.** Perform the node's check from a phone.

No new secret, grant or repository variable is needed under decision
5's default. Option (b) would need none either. Option (c) would
need a GitHub OAuth App.

## Verification criteria

C1 profile depth: a criteria list a verifier can check
([profiles](../process/profiles.md)). The specification numbers them
and makes each exact. Every slice also meets four criteria.

- The service's existing tests pass unchanged.
- `package.json`'s dependencies are unchanged (R14, dependency search
  is an attack surface).
- No commit holds a secret.
- Both Backlogs move with the work (W-003, documentation moves in the
  same commit as the work).

### E1, the register and the questions page

- The type document has a Reader line and a status line under K-007
  (plans are outcome-named, statused, and ruthlessly current). It
  states the grammar, the states, the kinds and the single-writer rule.
- The parser's tests cover each production and an error reported by
  line. `node plugin/scripts/sync_shared_unit.ts --check` reports the
  vendored copy in sync.
- `node plugin/scripts/form_check.ts` reports an entry that fails the
  grammar, and 0 violations on the instance.
- dispatch.md states when the Orchestrator enters a gate and an ask,
  and that the gate summary names the entry.
- The questions pages render a fixture register: every entry once,
  each with its kind, state, decisions, defaults, options, links and
  answer. Links resolve at the page's SHA and carry the `ref`.
- The source test of V6 and V17 passes unchanged. No module under
  `src/questions/` imports a store in E1.
- `sam validate --lint` passes. The smoke test requests
  `/view/questions` and requires `200`.
- The questions page's cold and warm latency is recorded, whichever
  way it falls (RU-019, a measurement may be met by an unfavourable
  result).
- At acceptance, the register holds every ask open at that moment.

### E2, answering

- The answering route stores a held answer for an open question and
  refuses each case of [Who may answer](#who-may-answer). Tests cover
  each refusal: no cookie, another origin, no `Origin`, a question not
  open, an entry that changed.
- A held answer appears only on the questions pages, labelled "held by
  the service, not committed". A test shows the tree, node and task
  pages unchanged by it (criterion I5 of P2-N003).
- `question_confirm` deletes a held answer the commit carries. It
  reports a divergence naming the line when the commit differs. Tests
  cover both, and the case of an answer recorded `via: chat` while one
  is held.
- `test/dynamoExpressionSafety.test.ts` covers each new expression, by
  added cases. No new key can equal `LEASE_KEY`.
- dispatch.md states the four commit steps and the chat fallback.
- One real ask is answered on a phone and committed by the Orchestrator
  through these steps. The journal records it.

### E3, the pickup in a pull run

- `question_answers` and `question_confirm` refuse a handle whose role
  is not `orchestrator`, naming the role and roles.md.
- dispatch.md's *Pull runs* gains the pickup step, and the
  Orchestrator's contract restates it. `node plugin/scripts/sync_agents.ts --check`
  reports the mirror in sync.

### The node: the owner's check

The criteria below are the child-level forms of P2-N003's criteria I1
to I5. The evidence serves both nodes.

- **The answer from a phone.** In a pull run, the owner answers a real
  gate on a phone. The process owes that gate at that moment (I1).
- **The commit.** The Orchestrator's next loop commits the answer. The
  commit is readable with the service off. The service made no commit
  and holds no repository write credential (I2).
- **The view shows it.** Reloaded, the view names the new SHA and shows
  the answer as committed, no longer as held (I3).
- **The fallback.** With the service unreachable, a gate is crossed in
  chat and recorded `via: chat`. R12 (service outage stops work) is
  updated with the date and the result (I4).
- **Nothing held reads as decided.** A test and this run show it (I5).
- **The next task carries the answer.** The task offered after the
  crossing carries the adopted decisions in its brief.

## Risks

From the [Risk register](../open-risks.md).

- **R10** (the service becomes a second source of truth). The held
  answer is the only state outside git. [Where a held answer
  lives](#where-a-held-answer-lives) states how R10 holds. The existing
  pages stay store-free by the unchanged source test.
- **R11** (MCP surface constraints). This node uses no elicitation and
  holds no call open. The three tools each read one file or one item
  set, within the 30-second client timeout. E1 and E2 measure the pages.
- **R12** (service outage stops work). The chat fallback records into
  the Question register. The node's check exercises it.
- **R18** (the view cookie is a standing read credential). The cookie
  now also answers. A stolen cookie could hold a false answer. The
  owner sees every held answer on the page, and nothing held decides.
  Rotating the view token still signs every device out. Decision 5
  carries R18's drafted text.

**New risks, proposed as Backlog additions.**

- **Unprovable answers.** Git cannot prove an answer recorded
  `via: view`. The Orchestrator writes the entry. `question_confirm` checks it against
  the held answer, but the check leaves no trace in git.
- **Copied titles.** An entry copies a gated document's decision
  titles. A copy can drift from its source (common-risk class CR-005 (a
  copy or description disagrees with its source, unseen)). The entry links
  the document, which stays the authority.

## Monotonicity

This node proposes no planned non-monotonicity.

- The source test `test/viewSource.test.ts` walks imports from
  `src/view/` and forbids any store. The questions code lives in
  `src/questions/`, so that test passes unchanged.
- The V17 test in `test/viewSignIn.test.ts` checks three routes. The
  new routes are other paths, so it passes unchanged.
- The header link carries the `ref`, so the V10 link walk passes.
- `test/planWriteTools.test.ts` checks the tool list with
  `arrayContaining`, so new tools leave it passing.

The criteria V6 and V17 of P2-N003 read as covering the whole view.
Their text is then wider than the test. Decision 5 adds a dated note
to each. Should an existing test need rewriting, it goes to the owner
under W-002 (existing tests are signals, not obstacles).

## Precedents applied

Checked against the [Ruling register](../rulings.md). Each decided its
question without a gate entry.

- RU-006 (a new capability gets its own repository when separately
  deployable or holding secrets): the queue is neither apart from the
  service.
- RU-008 (TypeScript/Node for services) and RU-011 (TypeScript/Node
  for tooling): the parser and the service
  code.
- RU-009 and RU-010: work reaches `main` by pull request.
- RU-012: one parser, canonical here, vendored out.
- RU-016: the reach above.
- RU-018 (a child is not queued behind a sibling it does not depend
  on): P2-N022 and P2-N023 run independently.
- RU-019 (a measurement may be met by an unfavourable result): the
  latency criteria.
- RU-021 (the planning/execution model is the source of progress
  truth): the questions pages carry the limit line.

Near matches are cited in the defaults, as the table shows.

| Decision here | Near match |
|---|---|
| 4 | specification of P2-N005, decision 17: handles in the lease table |
| 5 | plan of P2-N003, decision 4, and its specification, decision 13: the view token and cookie |
| 10 | specification of P2-N005, decisions 20 and 21, and of P2-N003, decision 15: who verifies |

## Terms this plan introduces

Each is proposed for ratification (decision 11).

- <a id="def-question-register"></a>**Question register**: the register
  in git where the Orchestrator enters each gate and ask it raises. An
  entry holds the options and the default, and later the answer.
- <a id="def-held-answer"></a>**Held answer**: an answer the owner gave
  in the web view, which the service stores until the Orchestrator
  commits it to the Question register. It decides nothing while held.
- <a id="def-cycle"></a>**Cycle**: one task taken through the loop's
  steps 2 and 3: dispatched, returned and accepted. A pull request the
  owner merges for the task belongs to its cycle.

## Decisions for the gate

The owner's go-ahead adopts every default not overridden by number.
Ruling register checked: no ruling decides any of the eleven. The near
matches are cited in the rationales.

1. **Place the owner's reordering of 2026-11-03.** **Default:** adopt
   the drafted texts below. P2-N022 no longer follows P2-N006. Its task
   E3 waits on P2-N020 `done`; E1 and E2 do not. **Rationale:** the
   owner set the order. K-010 (superseded content is never silently
   readable) requires the active texts that say otherwise to change.
   **Affected locations:**
   - `docs/specs/p2-n003-owner-questions-and-plan-view.md`, active:
     - In the opening list, replace "It gets its own plan and specify
       tasks after P2-N006 (migration and pilot)." with "It gets its
       own plan and specify tasks, which no longer wait on P2-N006
       (owner, 2026-11-03; [plan of
       P2-N022](../plans/p2-n022-owner-question-queue.md))."
     - Under *Child 2*, replace "Its own plan and specify tasks follow
       P2-N006." with "Its own plan and specify tasks follow P2-N021
       (owner, 2026-11-03)."
     - Under *Dependencies*, replace the P2-N006 bullet with: "-
       P2-N006 (migration and pilot): child 2 no longer follows it.
       The owner lifted the ordering of 2026-10-29 on 2026-11-03.
       Child 2 needs P2-N005 for its final execute task only ([plan
       of P2-N022](../plans/p2-n022-owner-question-queue.md))."
     - Under *What the edges leave out*, replace "P2-N022 follows
       P2-N006 by the owner's ordering, and no resource carries that.
       The register note carries it." with "P2-N022 followed P2-N006
       by the owner's ordering of 2026-10-29, which no resource
       carried. The owner lifted it on 2026-11-03."
     - After the code block of *Register action proposed with this
       specification*, add: "(P2-N022's note changed on 2026-11-03: it
       no longer follows P2-N006. [Plan of
       P2-N022](../plans/p2-n022-owner-question-queue.md), decision
       1.)"
   - `docs/plans/p2-n003-owner-questions-and-plan-view.md`, active:
     - At the end of the bullet "The owner question queue comes after
       the pilot", add: "(Lifted by the owner on 2026-11-03: the queue
       no longer follows the pilot. [Plan of
       P2-N022](p2-n022-owner-question-queue.md).)"
     - Rename the heading "Approach: the owner question queue, after
       the pilot" to "Approach: the owner question queue". No link
       targets its anchor.
     - Replace "The queue is deferred until P2-N006 closes (roadmap
       step 5). It is planned and specified then, in its own tasks
       (decision 2)." with "The queue was deferred until P2-N006
       closes (roadmap step 5). On 2026-11-03 the owner lifted that
       order. The queue follows P2-N021, and needs P2-N005 for its
       final execute task only ([plan of
       P2-N022](p2-n022-owner-question-queue.md)). It is planned and
       specified in its own tasks (decision 2)."
     - Replace "- Child 2 follows P2-N006 by the owner's ordering, not
       by a resource it uses." with "- Child 2 no longer follows
       P2-N006. The owner lifted that order on 2026-11-03 ([plan of
       P2-N022](p2-n022-owner-question-queue.md))."
   - `docs/plans/orchestration-service.md`, active:
     - In *Design sketch*, replace "and, after the pilot, the queue of
       questions awaiting the owner." with "and, from node P2-N022,
       the queue of questions awaiting the owner."
     - In *Chunk 2*, replace "The owner question queue follows the
       pilot:" with "The owner question queue follows the web view's
       first version, not the pilot (owner, 2026-11-03):".
   - `docs/plan.md`, the hand rendering: replace "It follows P2-N006 by
     the owner's ordering of 2026-10-29." with "Its task E3 waits on
     P2-N020; it no longer follows P2-N006 (owner, 2026-11-03).". In
     the chains list, replace "P2-N004 (topics and coordination) and
     P2-N022 (the owner question queue) come after P2-N006. P2-N022
     also waits on P2-N005." with "P2-N004 (topics and coordination)
     comes after P2-N006. P2-N022 (the owner question queue) waits on
     P2-N020 for its task E3 only.". In the waits list, replace "waits
     on P2-N005, and follows P2-N006." with "its task E3 waits on
     P2-N020."
   - `docs/backlog.md`: the entries for P2-N003 and P2-N022, which the
     Orchestrator rewrites at this crossing.

2. **Leaf, one specify task, then three execute slices.** **Default:**
   a leaf. A specify task follows this gate. Then E1, E2 and E3 run in
   that order, and the owner's check closes the node. Five cycles are
   planned, and seven bound the node. **Alternative:** an interior
   node with three children, or E3 moved to a later node. **Rationale:**
   the slices share one resource and validate together, and P2-N021
   ran this way. The owner can answer from E2's deploy, so the wait on
   P2-N020 delays only E3. **Affected locations:** none.

3. **A Question register in git.** **Default:** (a) a new Document type,
   defined by citation: the type in `docs/process/question-register.md`,
   the instance in `docs/question-register.md`. The Orchestrator is its
   single writer. One parser, canonical here, vendored under RU-012.
   **Alternatives:** (b) the view parses each gated document's
   *Decisions for the gate* section, which is prose with no fixed
   grammar; (c) the run journal, which is never authoritative.
   **Rationale:** a gate's go-ahead must be recorded in git, and a
   register in the style of the Plan register gives the view one file
   to read and the form checker one grammar to check. **Affected
   locations:** in `docs/project-model.md`, entry `owner-question-queue`,
   replace the `is:` line's text "The queue of owner questions and
   answers in the service, and its answering action in the web view"
   with "The owner question queue: the Question register in git, the
   held answers in the service, and the answering action in the web
   view (plan of P2-N022, decision 3)".

4. **Where a held answer lives.** **Default:** (a) one item per question in
   the lease table of the alias that answered, keyed
   `answer#<question ID>`, with a 30-day time-to-live. A new answer
   replaces it until the commit. `question_confirm` deletes it.
   **Alternatives:** (b) a new table, which adds template resources and
   grants; (c) no service state: the owner commits the answer through
   GitHub's web editor, which breaks the single-writer rule and is hard
   on a phone. **Rationale:** P2-N005's decision 17 put handles there
   for two reasons that hold here too: no template change and no
   owner action.
   **Affected locations:** none.

5. **How the owner is authorized to answer.** **Default:** (a) the view
   cookie, with the same-origin and open-question checks of [Who may
   answer](#who-may-answer). **Alternatives:** (b) the view token,
   entered again with each answer; (c) sign-in by GitHub account, the
   Backlog entry. **Rationale:** a held answer decides nothing until
   the Orchestrator commits it, and the owner sees it on the page. So
   (a) adds little exposure, and (b) costs a pasted token per answer on
   a phone. **Affected locations:**
   - `docs/specs/p2-n003-owner-questions-and-plan-view.md`, active,
     the term *View token*: replace "the read-only credential the owner
     mints for the web view." with "the credential the owner mints for
     the web view. It reads the view and, from node P2-N022, answers
     owner questions there ([plan of
     P2-N022](../plans/p2-n022-owner-question-queue.md#decisions-for-the-gate),
     decision 5)."
   - In that specification, at the end of criteria V6 and V17, add:
     "(Noted at the plan gate of P2-N022. This criterion binds the
     tree, node and task pages and sign-in. The questions pages live in
     `src/questions/`, and their answering route writes a held answer
     to the lease table: [plan of
     P2-N022](../plans/p2-n022-owner-question-queue.md#decisions-for-the-gate),
     decision 5.)"
   - `docs/plans/p2-n003-owner-questions-and-plan-view.md`, active, at
     the end of decision 4, add: "(Amended at the plan gate of
     P2-N022: the token also answers owner questions in the view, a
     write to the service's store and never to git or a write tool.
     [Plan of
     P2-N022](p2-n022-owner-question-queue.md#decisions-for-the-gate),
     decision 5.)"
   - `docs/open-risks.md`, R18, before *Status*, add: "From node
     P2-N022 the cookie also authorizes the answering action. A held
     answer decides nothing until the Orchestrator commits it, and the
     answering route refuses a request from another origin (plan of
     P2-N022, decision 5)."

6. **Which question tools, and for whom.** **Default:**
   `question_list`, `question_answers` and `question_confirm` on the
   existing MCP endpoint. No tool raises or answers a question. Surfaces
   without a clone get `question_list` through the remote MCP connector
   node; whether they may answer is that node's decision.
   **Rationale:** every session holds one shared bearer token, so an
   answering tool would let any agent answer the owner's gate; raising
   is a commit, so it needs no tool. **Affected locations:** none.

7. **How scheduling and delegation decisions ride the queue.**
   **Default:** as decisions of a gate's entry: the scope grant, with
   its pull-run line and pre-authorizations, is one decision whose
   default is the proposed grant. Owner-started directions wait in the
   Backlog. **Rationale:** a scope grant is already what a gate
   approves (dispatch.md, *Gates (v1)*), so it needs no new mechanism.
   **Affected locations:** none.

8. **Immediate-class questions.** **Default:** no elicitation in this
   node. They stay in the asking session's chat, and the Orchestrator
   records each as an `immediate` entry. **Alternative:** keep
   elicitation as the specification of P2-N003 has it, after a probe of
   the transport. **Rationale:** the transport sends one JSON body per
   request, and the function times out after 20 seconds, while the
   dialog waits on the owner. **Affected locations:**
   - `docs/plans/orchestration-service.md`, active, *Design sketch*:
     replace the bullet beginning "**Owner questions have two paths.**"
     with: "- **Owner questions have two paths.** Immediate-class
     questions are asked in the asking session's chat, and recorded in
     the Question register. Gate-batched decisions are entered in that
     register and answered in the web view; the Orchestrator commits
     each answer. Elicitation was set aside: the service sends one JSON
     body per request within a 20-second timeout, and a dialog waits on
     the owner ([plan of
     P2-N022](p2-n022-owner-question-queue.md#decisions-for-the-gate),
     decision 8)."
   - In the service plan's *Chunk 2*, replace "and immediate-class
     questions by elicitation." with "and immediate-class questions in
     chat, recorded in the Question register (plan of P2-N022,
     decision 8)."
   - `docs/plans/p2-n003-owner-questions-and-plan-view.md`, active,
     under *What the queue carries*: replace the bullet beginning
     "Immediate-class questions by MCP elicitation" with: "-
     Immediate-class questions in the asking session's chat, recorded
     in the Question register. The plan of P2-N022 set elicitation
     aside (its decision 8)."
   - `docs/specs/p2-n003-owner-questions-and-plan-view.md`, active,
     *Child 2*, *Outcome*: replace "Immediate-class questions reach the
     asking session by MCP elicitation." with "Immediate-class
     questions stay in the asking session's chat, and the Orchestrator
     records each in the Question register ([plan of
     P2-N022](../plans/p2-n022-owner-question-queue.md#decisions-for-the-gate),
     decision 8)."
   - `docs/open-risks.md`, R11: replace "use elicitation only for
     immediate-class questions and the queue for everything else;" with
     "ask immediate-class questions in chat and use the queue for
     everything else, since the service's transport cannot hold an
     elicitation dialog open (plan of P2-N022, decision 8);".

9. **No new journal event kind.** **Default:** the register is the
   record. The `gate-opened` event's note names the entry. The
   `gate-crossed` event's note names it and its `via:`. **Rationale:**
   the two kinds already exist, and an answer is recorded where the
   gate is. E2 writes the note rule into observability.md. **Affected
   locations:** none.

10. **The node's check, and who verifies.** **Default:** the gate of
    the check is the first gate the process owes after E3's deploy, in
    register order. The owner performs the check. The Orchestrator
    assembles the evidence for every remaining criterion. No Reviewer
    is dispatched unless the owner asks. **Rationale:** a gate
    genuinely due keeps the check honest, and every remaining criterion
    is answerable from commits, tests and logs, as for P2-N005 and
    P2-N003. **Affected locations:** none.

11. **Ratify or strike three terms**: *Question register*, *held
    answer* and *cycle*. **Default:** ratify all three. **Rationale:**
    the plan and its slices refer to each throughout. **Affected
    locations:** none.

## Register action proposed

The Orchestrator writes the register.

- P2-N022 moves `identified` → `planned`, its line reading:
  `P2-N022 [planned] The owner question queue: gate decisions answered in the web view, picked up through the task-pull loop — depends on P2-N021, done 2026-11-03; its task E3 waits on P2-N020 done, its tasks E1 and E2 do not; no longer follows P2-N006 (owner, 2026-11-03) — plan: plans/p2-n022-owner-question-queue.md`
- The edges under *Dependencies* are transcribed into the [Project
  model instance](../project-model.md).
- The Backlog entry for P2-N022 is rewritten to `planned`, pointing at
  this plan. Next: its specify task.

## Backlog additions

In the row shape the Backlog header declares. The links are written
relative to this plan. Placed in `docs/backlog.md`, each reads
`plans/p2-n022-owner-question-queue.md`.

- [ ] **Elicitation for immediate-class questions** — When:
  2026-11-03, planning P2-N022 (T101). Status: open; set aside until
  the service's transport keeps a stream and its timeout outlasts a
  dialog. Pointer: [plan of
  P2-N022](p2-n022-owner-question-queue.md#immediate-class-questions).
- [ ] **Answering from a surface without a repository clone** — When:
  2026-11-03, planning P2-N022 (T101). Status: open, for the remote MCP
  connector node after the pilot, once its authentication proves the
  owner. Pointer: [plan of
  P2-N022](p2-n022-owner-question-queue.md#the-question-tools).
- [ ] **Wake the Orchestrator when the owner answers** — When:
  2026-11-03, planning P2-N022 (T101). Status: open; the pickup runs at
  the Orchestrator's next loop, and nothing starts that loop on an
  answer. Pointer: [plan of
  P2-N022](p2-n022-owner-question-queue.md#the-pickup-in-a-pull-run-slice-e3).
- [ ] **Owner-started directions from the web view** — When:
  2026-11-03, planning P2-N022 (T101). Status: open; a scheduling or
  delegation direction the owner starts unasked needs an entry kind the
  owner writes. Pointer: [plan of
  P2-N022](p2-n022-owner-question-queue.md#scheduling-and-delegation-decisions).
- [ ] **An answer recorded `via: view` is not provable from git** —
  When: 2026-11-03, planning P2-N022 (T101). Status: open; a risk
  proposal, since `question_confirm` leaves no trace in git. Pointer:
  [plan of P2-N022](p2-n022-owner-question-queue.md#risks).
- [ ] **A Question register entry copies a gated document's decision
  titles** — When: 2026-11-03, planning P2-N022 (T101). Status: open; a
  risk proposal, of class CR-005; the specification may add a form
  check comparing the two. Pointer: [plan of
  P2-N022](p2-n022-owner-question-queue.md#risks).

## References

- [Specification of P2-N003](../specs/p2-n003-owner-questions-and-plan-view.md):
  child 2, criteria I1 to I10, R10 and R11, the terms, decisions 4, 12
  and 13, the edges.
- [Plan of P2-N003](p2-n003-owner-questions-and-plan-view.md): the
  form this plan follows, and decisions 1 to 10.
- [Specification of P2-N005](../specs/p2-n005-task-pull-loop.md): the
  write model, the session handle, the task tools, the pull run, and
  decisions 17, 20 and 21.
- [Service plan](orchestration-service.md): the standing constraints,
  the design sketch, chunk 2.
- [Service review of
  2026-10-29](https://github.com/majodali/methodology/blob/main/docs/records/service-review-2026-10-29.md):
  asks 3, 5 and 8.
- [Plan register type](../process/plan-register.md), [Cost log
  type](../process/cost-log.md), [dispatch](../process/dispatch.md),
  [roles](../process/roles.md),
  [observability](../process/observability.md) and the [Project model
  type](../process/project-model.md).
- [Ruling register](../rulings.md) and [Risk register](../open-risks.md).
- The service repository,
  [majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service),
  read at `main`, commit `8b1b0d5`: `README.md` (*HTTP routes*,
  *Configuration and secrets*), `docs/runbook.md` (*The web view*),
  `docs/mcp-enlistment.md`, `src/view/`, `src/httpApp.ts`,
  `src/planWriteTools.ts`, `src/planRegister/leaseBackend.ts`,
  `template.yaml`, `test/viewSource.test.ts` and
  `test/viewSignIn.test.ts`.
