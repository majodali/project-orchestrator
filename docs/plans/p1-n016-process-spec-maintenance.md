# Process spec maintenance: branch lifecycle, PR citation, packet table

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P1-N016; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's gate (RD-2). It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), and the
[process specification](../process/README.md), whose defined terms
[node](../process/README.md#def-node) and
[task](../process/README.md#def-task) are used here without further
links.

Node P1-N016 (process spec maintenance) is a child of P1-N001
(orchestrator v1) ([founding plan](orchestrator-v1.md)). It was opened
on 2026-09-01 with three corrections to `docs/process/`: who deletes a
merged branch, how work reaches `main` by pull request, and the packet
table. Since then the [Backlog](../backlog.md) has routed about two
dozen more rows to it. This plan lists every one of them and gives each
a disposition.

The node's subject is the process specification itself. Under
[K-007 (plans are outcome-named, statused, and ruthlessly current)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md),
this plan is the node's record of what it will change and why.

## Outcome

Every Backlog row routed to this node is either landed in the process
specification, or closed with a stated reason. Each process-scope
ruling flagged for promotion is promoted or declined.

At `done`:

- [dispatch.md](../process/dispatch.md) says who deletes a task branch
  and when, and why role branches are pushed. It says how work reaches
  `main`, citing RU-009 (completed work reaches `main` by pull request)
  and RU-010 (this repository reaches `main` the same way).
- The packet table carries every observation the Backlog recorded
  against it. The Orchestrator's startup working set is stated once, in
  `dispatch.md`, and repeated word for word in its contract and the
  `orchestrate` skill.
- [plan-model.md](../process/plan-model.md) says what a leaf is when its
  work takes several tasks, and when a child carried by its parent's
  specification needs a plan task.
- [observability.md](../process/observability.md) can record a block's
  release and a new risk, and says what its `stage` and `session`
  fields hold.
- The project has a vocabulary file, and the Backlog's header states
  where a checked entry lives.
- Each routed Backlog row is closed or rewritten, naming where it
  landed.

The node adds no form-check rule (decision 11) and edits no text that
node P3-N009 (sibling ordering retired) owns (decision 3).

## Approach

### What this node leaves alone

Three other nodes write the same documents. This node avoids each of
them by passage and by timing.

- **P3-N009's text.** P3-N009's criterion D1 amends four statements
  that give sibling order a dependency meaning
  (specification of P3-N002 (the comprehension model),
  [child D](../specs/p3-n002-comprehension-model.md#child-d-sibling-ordering-retired-and-the-checks-that-replace-it)).
  This node edits none of them. It also leaves alone two restatements
  that D1 does not list. One is the sentence of `dispatch.md`'s
  *Parallel dispatch* paragraph on earlier siblings. The other is step
  2 of `.claude/agents/orchestrator.md`. A Backlog addition below
  points P3-N009 at both.
- **P3-N014's predicate text.** `dispatch.md` holds the stop predicates
  copied byte for byte, from *How a reading applies the predicates* to
  the end of *Predicate 4*. Node P3-N014 (the loop runs sequence mode)
  landed them on 2026-10-30. Any change to them is a revision both
  readings re-score (specification of P3-N005 (sequence mode),
  criterion I7). This node
  does not edit them.
- **P3-N007's first execute task.** Node P3-N007 (the type declared,
  the arguments written, the K-003 amendment drafted) is executing. Its
  first execute task, E1, writes `dispatch.md`'s handoff contract,
  `plan-model.md` at the `planned` stage, `docs/process/rulings.md`,
  `observability.md` and four role contracts
  ([P3-N007 plan](p3-n007-type-declared-amendment-drafted.md#e1-where-each-part-of-the-type-lands)).
  This node's tasks are dispatched after that task is accepted. They
  read those files as they then stand. P3-N007's plan records the same
  order under *Overlap, not dependency*.

### The inventory

Rows 1 to 31 are the Backlog rows routed to this node. Rows 32 to 35
were found while planning. "E1 accepted" in the last column means the
acceptance of P3-N007's first execute task. P3-N014 is `done`, so no
row waits on it any longer.

| # | Row (Backlog source, date) | Owning document | Disposition | Waits on |
|---|---|---|---|---|
| 1 | Who deletes a merged branch, and when (this node's entry, part (i), 2026-09-01) | `dispatch.md`, loop step 3 | Land (decision 4). Step 3 also says why role branches are pushed: a container restart once cost work. | E1 accepted |
| 2 | Who deletes a branch that never merges (*The Orchestrator cannot delete a remote branch*, 2026-09-16) | `dispatch.md`, loop step 3; Planner and Implementer contracts | Land with row 1 (decision 4) | E1 accepted |
| 3 | The specification never mentions pull requests (this node's entry, part (ii)) | `dispatch.md`, a new short section on how work reaches `main` | Land: RU-009 and RU-010 promoted (decision 10). A role branch merging into the design branch takes no pull request. | E1 accepted |
| 4 | The plan row omits `docs/process/README.md` (this node's entry, part (iii); *README is the packet gap, three times running*) | `dispatch.md`, *Context packets* | Land (decision 9) | E1 accepted |
| 5 | The plan row omits `auditing.md` (*The plan-stage packet omits two process documents*) | as row 4 | Land (decision 9) | E1 accepted |
| 6 | The break-down row omits the node's plan (this node's entry, part (iii)) | as row 4 | Land (decision 9) | E1 accepted |
| 7 | The specify row has no clause for a root node, and no registers (*The specify-stage packet row*, 2026-09-17) | as row 4 | Land (decision 9) | E1 accepted |
| 8 | A process-spec node's plan task needs the Risk register, the journal and the contracts; a design that constrains code needs the code (same entry, two more observations) | as row 4 | Land (decision 9) | E1 accepted |
| 9 | The plan row carries no rule corpus (*The plan-stage packet carries no rule corpus*) | as row 4 | Land (decision 9) | E1 accepted |
| 10 | A role working in another repository receives that repository's `CLAUDE.md` (*P1-N014 specified*, 2026-10-29; P1-N014, role contracts adopt the conduct rules) | `dispatch.md`, task brief item 1 | Land (decision 9) | E1 accepted |
| 11 | No route to a pinned methodology text for a role without git (2026-10-29, planning P3-N013, the four stop conditions, decidable) | `dispatch.md`, *Context packets* | Land (decision 9) | E1 accepted |
| 12 | The predicate text enlarges the Orchestrator's startup set (2026-10-30, planning P3-N014) | `dispatch.md`, *The loop*; Orchestrator contract; `plugin/skills/orchestrate/SKILL.md` | Land (decision 9) | E1 accepted |
| 13 | Dispatch checks that the task's worktree exists (2026-10-30) | `dispatch.md`, loop step 2 | Land: before dispatch, the Orchestrator checks that the working directory and branch the brief names exist. | E1 accepted |
| 14 | A blind task's scratch directory is shared (2026-10-30) | `dispatch.md`, task brief item 4 | Land: a task whose evidence must be blind gets a private scratch directory in its brief. It writes nothing outside that directory and its branch. | E1 accepted |
| 15 | Parallel dispatch collides with the single-Backlog write (2026-09-17) | `dispatch.md`, *Parallel dispatch*; Planner and Implementer contracts | Land (decision 5), in a paragraph of its own. P3-N014's serial rule already covers sequences. | E1 accepted |
| 16 | An override toward an option with no drafted affected-location text (2026-10-29) | `dispatch.md`, *Owner-decision economics* | Land (decision 6) | E1 accepted |
| 17 | A leaf may need several execute tasks; a leaf whose evidence needs independent sessions (2026-10-29 and 2026-10-30) | `plan-model.md`, *The hierarchy*; `profiles.md`, the breakdown row | Land (decision 8) | E1 accepted |
| 18 | Whether a child carried at criteria depth by its parent's specification needs its own plan or specify task (2026-10-29) | `plan-model.md`, lifecycle rules | Land (decision 7), beside RU-020 | E1 accepted |
| 19 | A plan has no declared place for RU-016's repository-reach declaration (2026-09-17) | `plan-model.md`, `planned` stage | Lands in P3-N007's E1, criterion B5. E2 checks that it landed and closes the row. | E1 accepted |
| 20 | The Ruling register's taxonomy has no type for dispatch-sequencing decisions (2026-09-17) | `docs/process/rulings.md`, *Classification* | Land: type `sequencing` (decision 16) | E1 accepted |
| 21 | The run journal can record a block but not its release; no kind opens a risk (2026-09-01) | `observability.md`; the `EVENTS` set in `plugin/scripts/lib/form-check-core.ts` | Land: kinds `unblocked` and `risk-opened` (decisions 14 and 16). E2 records the review of the vocabulary that the row asks for. | E1 accepted |
| 22 | The journal's stage values, and gate events that carry a task ID (2026-10-30) | `observability.md`, *Events* | Land (decision 14) | E1 accepted |
| 23 | A journalled dispatch is not evidence that a task was dispatched (2026-09-02) | `dispatch.md`, loop step 2; `observability.md` | The rule lands (decision 14). The checker's warning goes to a new node (decision 11). | E1 accepted; the warning waits on P3-N009 |
| 24 | The form checker does not check a plan's Status against its node's stage (2026-09-16) | `auditing.md`; the checker | Moved to a new node (decision 11) | P3-N009 |
| 25 | A form-check rule for a sequence's journal (2026-10-30, planning P3-N014) | `auditing.md`; the checker | Moved to a new node (decision 11) | P3-N009 |
| 26 | No committed artifact holds a past task result's Asks part; "the general rule is P1-N016's" (*P3-N005 specified*, 2026-10-29) | `dispatch.md`, *The member's result record*; `observability.md` | Land (decision 15) | E1 accepted |
| 27 | A prose-reach class for `plugin/skills/` (2026-10-29) | `docs/process/README.md`, *How far the prose rules reach* | Land: skill files are bound as briefs are, like role contracts. | none |
| 28 | A project vocabulary for ratified terms (2026-10-29) | a new `docs/vocabulary.md`; `docs/process/README.md` | Land (decision 12) | none |
| 29 | Where a checked Backlog entry lives (the cutover of P1-N009, plugin tooling on the portfolio stack; decision 3 of P3-N010, one class carried end to end) | `docs/backlog.md`, header; `plan-model.md`, *Relationship to the Backlog* | Land (decision 13) | E1 accepted |
| 30 | Process-scope rulings flagged for promotion (Ruling register, *Promotion flags*) | `dispatch.md`, `plan-model.md`, `auditing.md` | Decision 10 | E1 accepted |
| 31 | P3-N002 and P1-N016 both reach `dispatch.md`'s selection rule (2026-09-17) | Backlog | Not closed here. P3-N009 closes it under its criterion D3. This node edits no selection-rule text (decision 3). | P3-N009 |
| 32 | The whole Backlog, about 2,850 lines, sits in every packet's base and in the startup working set (found while planning) | `dispatch.md`, *The loop* and *Context packets* | Land with row 12 (decision 9) | E1 accepted |
| 33 | Ruling types `stack` and `knowledge` are in use but outside the taxonomy (found while planning) | `docs/process/rulings.md` | Land with row 20 (decision 16) | E1 accepted |
| 34 | `dispatch.md`'s cross-repository bullets predate RU-016 and are unmarked (found while planning) | `dispatch.md`, *Owner-decision economics* | Land with row 30 (decision 10) | E1 accepted |
| 35 | The selection rule is restated outside P3-N009's four statements (found while planning) | `dispatch.md`; Orchestrator contract | Not this node's. A Backlog addition for P3-N009. | P3-N009 |

### Rulings flagged for promotion

[`docs/process/rulings.md`](../process/rulings.md)'s promote step flags
every process-scope ruling, and every project-scope ruling applied three
times, for the next maintenance pass on the specification. This node is
that pass. A promoted ruling is stated in the specification, which cites
it by identifier and name. The ruling itself stays `active`.

| Ruling | Disposition (decision 10) | Where it lands |
|---|---|---|
| RU-002 (the owner hand-carries upstream output) | Promote | `dispatch.md`, cross-repository bullet |
| RU-003 (a node targeting an external party completes at the artifact) | Promote | `plan-model.md`, lifecycle rules |
| RU-009 (completed work reaches `main` by pull request), applied five times | Promote, with RU-010 | `dispatch.md`, new section on how work reaches `main` |
| RU-010 (this repository reaches `main` the same way) | Promote | as RU-009 |
| RU-013 (a tool with an unmet runtime floor exits loudly) | Promote | `auditing.md`, form checks |
| RU-015 (upstream delivery form) | Promote | `dispatch.md`, cross-repository bullet |
| RU-016 (the Planner declares a node's repository reach) | Promote, correcting the bullets it superseded in part | `dispatch.md`, owner-decision economics |
| RU-020 (no separate break-down task when the specification reaches breakdown depth) | Promote, with decision 7 | `plan-model.md`, lifecycle rules |
| RU-022 (corpus-bound documents are written IR first) | Already carried by `dispatch.md`'s handoff contract | none |
| RU-006, RU-008, RU-011, RU-012 | Decline: portfolio architecture and stack choices, not orchestration process. The specification already cites them where it uses them. | none |
| RU-014 (a port retires the comparison test) | Decline: applied once, by the port that prompted it | none |
| RU-018 (an independent child is not queued behind a sibling) | Leave to P3-N009, which retires sibling ordering | none |

### The packet table, row by row

The table is the context-frugality contract, so it changes once, in one
considered edit (decision 9).

| Row | Change | Rows of the inventory |
|---|---|---|
| Base | Item 1 gives the Binding block and Classification of each repository the task works in. The Backlog part becomes the entries that name the node, its ancestors or its children, and the entries routed to it, found by node ID. A node whose subject is the Backlog takes it whole. Each methodology text is given by its link at the pinned tag. A role that cannot read the tag gets the text quoted in its brief, under RU-015's provenance line. | 10, 11, 32 |
| plan | Adds `docs/process/README.md`, `auditing.md`, the methodology's prose rules, and the methodology rule files the parent's documents cite. A node whose subject is the process specification or the registers also takes `roles.md`, the role contracts, the Risk register and the run journal. A node whose design constrains code takes the code paths its parent's documents or its Backlog entry name. | 4, 5, 8, 9 |
| specify | Adds `docs/process/README.md`. For a root node, the parent's items are empty by construction. The registers clause of the plan row applies. | 7 |
| break down | Adds the node's plan. | 6 |
| execute, verify | No change. | none |

The startup working set becomes the Plan register and `dispatch.md` up
to *Sequence mode*. The *Sequence mode* section and the predicates are
read when a sequence is ratified or running. Backlog entries are read
by node ID when a step needs them. As of 2026-10-30, after P3-N014's
acceptance, this cuts the set from about 3,850 lines to about 480. The
Backlog is about 2,850 of the lines removed, and *Sequence mode* with
its predicates about 515.

If P3-N009's selection rule reads the planning/execution model's edges,
P3-N009 adds what it reads to this set. That is its own rule's input,
not a packet change.

### Two execute tasks

The node is one leaf run as two execute tasks on one branch, in a fixed
order (decision 1). Each is an Implementer task at the standard tier
the profile assigns. Each ends in a commit that passes
`node plugin/scripts/form_check.ts`. Each closes or rewrites the
Backlog rows it lands, in the same commit
([W-003 (documentation moves in the same commit as the work)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)).

| Task | Writes | Inventory rows |
|---|---|---|
| E1 | `dispatch.md`; `roles.md` (the Orchestrator's *Serves* line: branch deletion and the shared registers under parallel dispatch); `.claude/agents/orchestrator.md`, `planner.md` and `implementer.md`, then `plugin/agents/` by `node plugin/scripts/sync_agents.ts`; `plugin/skills/orchestrate/SKILL.md` | 1 to 16, the `dispatch.md` halves of 23 and 26, 32, 34, and the `dispatch.md` promotions of row 30 |
| E2 | `plan-model.md`, `profiles.md`, `observability.md`, `auditing.md`, `docs/process/rulings.md`, `docs/process/README.md`; a new `docs/vocabulary.md`; the Backlog's header; the `EVENTS` set with one Vitest test outside `plugin/scripts/lib/corpus/` | 17 to 22, the rest of 23 and 26, 27 to 29, 33, and the rest of row 30 |

E1 is separate from E2 because `dispatch.md` alone carries sixteen
rows and the context-frugality contract. E2 reads the packet table as
E1 committed it.

Each edited passage cites the methodology at v1.6.0, with each
identifier named
([P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-004--citations-carry-names)).
Links in passages the tasks do not edit keep their old pin. The
Backlog's two editorial-pass rows stay open. `plan-model.md`,
`profiles.md`, `observability.md` and `docs/process/rulings.md` have no
reader statement. Each gains one when E2 edits it
([P-007 (documents state their reader)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/prose.md#p-007--documents-state-their-reader)).

### Concurrent writers

The Backlog is shared with every node that runs alongside this one.
Each commit to it is made against the file as it stands at that commit
and overwrites no other node's edit. A supersession marker placed at
this node's gate (decision 8) is removed by the task that reworks its
passage.

## Dependencies

- **P3-N014** (the loop runs sequence mode): `done` 2026-10-30. Its
  *Sequence mode* section, its two event kinds and its serial rule are
  this node's starting text.
- **P3-N007**: overlap, not dependency. E1 of this node is dispatched
  after P3-N007's E1 is accepted, because both write five of the same
  files. Nothing this node lands needs anything P3-N007 produces,
  except row 19, which E2 only checks.
- **P3-N009**: not a dependency (decision 3). This node edits no text
  P3-N009 owns. P3-N009 closes row 31 when it lands.
- **P3-N008** (the instance, over this repository): none.
- **Owner**: this node's gate only.

Edges, in P3-N002's sketch notation with P3-N007's `after` qualifier
(P3-N007 decision 3). The process documents with no slug yet are named
by path. Their slugs are P3-N008's to issue.

- **P1-N016 modifies** `dispatch-rules`, `plan-model-spec`,
  `observability-vocabulary`, `ruling-register-type`, `role-contracts`,
  `form-checker` (its `EVENTS` set only) and `backlog`; and
  `docs/process/README.md`, `docs/process/roles.md`,
  `docs/process/profiles.md`, `docs/process/auditing.md` and
  `plugin/skills/orchestrate/SKILL.md`.
- **P1-N016 creates** `docs/vocabulary.md`.
- **P1-N016 uses** `RU-002`, `RU-003`, `RU-009`, `RU-010`, `RU-013`,
  `RU-015`, `RU-016`, `RU-020` and `RU-022`. It uses no resource
  P3-N007 or P3-N009 creates, so it carries no `after` qualifier.

Repository reach
([RU-016 (the Planner declares the repository access a node needs)](../rulings.md)):
**this repository only, write.** It writes the files the two tasks
list. It reads the methodology at v1.6.0, commit `3e34829`, for the
texts it cites, and writes nothing there.
`plugin/scripts/lib/form-check-core.ts` is not vendored, and the node
adds no corpus fixture, so nothing travels to the service repository
([RU-012 (one canonical copy, vendored by a generator)](../rulings.md)).

## Leaf or interior

Leaf, run as the two tasks above (decision 1).

The rows are independent corrections, so each would validate on its
own. A child per row would add about thirty register lines, plans and
gates for one-paragraph edits. A cut by document is a technical cut.
It buys nothing over two tasks on one branch, because the
specification is reviewed as one text at one gate. The two tasks exist
for size, as in P3-N011 (the sweep, the rest of the catalogue, and the
omission list) and P3-N007.

## Verification

C1 profile ([profiles](../process/profiles.md)). Each task's
Implementer self-verifies against the criteria it meets. E2 verifies
the node against all of them. No Reviewer is dispatched unless the
owner asks. Under decision 2, these criteria are the node's
specification.

- V1. Each of rows 1 to 30 and 32 to 34 is landed as the inventory
  states, or closed in the Backlog with the reason the inventory gives.
  Each routed Backlog row is closed or rewritten in the declared row
  shape, naming where it landed.
- V2. `dispatch.md`'s step 3 says who deletes the task branch, when,
  and what happens when deletion is refused. It says why role branches
  are pushed. A branch that never merges has a named deleter.
- V3. `dispatch.md` has a section on how work reaches `main`. It cites
  RU-009 and RU-010 by identifier and name. It states that a role
  branch merging into the design branch takes no pull request.
- V4. The packet table carries each change of *The packet table, row by
  row*. Every document a row names exists.
- V5. The startup working set is stated in `dispatch.md`, and the same
  set appears in `.claude/agents/orchestrator.md` and
  `plugin/skills/orchestrate/SKILL.md`.
- V6. `plan-model.md` states the leaf definition of decision 8, the
  carried-child rule of decision 7 with RU-020, and RU-003.
  `profiles.md`'s breakdown row agrees with decision 8.
- V7. `observability.md` states decisions 14 and 15. The `EVENTS` set
  holds `unblocked` and `risk-opened`. A Vitest test outside
  `plugin/scripts/lib/corpus/` shows a journal using both passes.
  `node plugin/scripts/run_corpus.ts` reports every fixture matching
  its recorded expectation.
- V8. `docs/process/rulings.md`'s taxonomy holds `stack`, `knowledge`
  and `sequencing`, each with its meaning.
- V9. `docs/vocabulary.md` holds one row per term a gate record shows
  ratified, each with a `def-` anchor. `docs/process/README.md` links
  it and states the `plugin/skills/` class.
- V10. The Backlog's header states where a checked entry lives
  (decision 13).
- V11. Each promoted ruling is cited by identifier and name where it
  lands. The result proposes the Ruling register's new *Promotion
  flags* line.
- V12. The four statements of P3-N009's criterion D1, the *Parallel
  dispatch* sentence on earlier siblings, and step 2 of the Orchestrator
  contract are unchanged. So is `dispatch.md` from *How a reading
  applies the predicates* to the end of *Predicate 4*. A command the
  result states shows no difference from the branch base.
- V13. Every passage either task edits names each identifier it cites
  (P-004). Each document E2 edits has a reader statement (P-007).
- V14. `node plugin/scripts/sync_agents.ts --check`,
  `node plugin/scripts/form_check.ts`, `npm test`, `npm run typecheck`
  and `npm run lint` are clean at each task's commit.
- V15. No supersession marker placed at this node's gate stands at
  `done`.

Decisions 4 to 16, once adopted, are criteria too.

## Monotonicity

No planned non-monotonicity. The `EVENTS` set gains two entries and one
test is added. No rule, test or corpus expectation is rewritten.

## Decisions for the gate

Numbered per [dispatch.md](../process/dispatch.md)'s owner-decision
economics. The owner's go-ahead adopts every default not overridden by
number. This plan opens its own sequence at 1.

**Precedents checked against the [Ruling register](../rulings.md).**
RU-016 is an exact match for the repository reach and decides it
silently. RU-020 is a near match for decisions 2 and 7. RU-012 raises
no decision: nothing vendored changes. RU-022 raises no decision: the
node drafts nothing for the methodology corpus. RU-018 is P3-N009's to
retire, and decision 3 keeps this node off its text. Decision 10
dispositions every ruling the promote step flags.

1. **Leaf or interior.**
   **Default**: leaf, run as two execute tasks in a fixed order, E1
   (`dispatch.md` and where it is restated) then E2 (the other
   documents).
   **Rationale**: thirty independent one-paragraph corrections reviewed
   as one text; P3-N011 and P3-N007 are the multi-task leaf precedents.
   **Affected locations**: none.
2. **Whether a separate specify task runs.**
   **Default**: no. V1 to V15 and decisions 4 to 16 are the node's
   specification, and the node moves `planned` → `specified` at this
   gate.
   **Rationale**: the criteria are at C1 depth; P3-N011, P3-N013 and
   P3-N014 crossed the same way, with RU-020 as the near match.
   **Affected locations**: none.
3. **Whether the node waits on P3-N009.**
   **Default**: no. The node edits no selection-rule text, so neither
   node waits on the other. Its execute waits only on the acceptance of
   P3-N007's E1, for the shared files. *Alternative*: the packet table
   and the startup working set wait for P3-N009 as a third task.
   **Rationale**: the recorded collision is over the selection rule
   only, and this node leaves it alone. P3-N009 is two nodes away, and
   rows 1 to 3 have been owed since 2026-09-01.
   **Affected locations**: four `active` documents and one Backlog
   entry.
   - [plan.md](../plan.md), node P1-N016. Replace "- Depends on:
     nothing for planning. Its executing stage waits on P3-N009
     (sibling ordering retired)." with: "- Depends on: nothing for
     planning. Its executing stage waits on the acceptance of E1, the
     first execute task of P3-N007 (the type declared), which edits the
     same process documents. It does not wait on P3-N009 (sibling
     ordering retired) ([plan](plans/p1-n016-process-spec-maintenance.md),
     decision 3)."
   - [plan.md](../plan.md), node P3-N009. Replace "  - Needed by:
     P1-N016, whose executing stage builds on the new dispatch rule."
     with: "  - Needed by: nothing. P1-N016 (process spec maintenance)
     leaves the selection rule to this node and does not wait on it."
   - [plan.md](../plan.md), the waits between lines. Replace "- The
     executing stage of P1-N016 (process spec maintenance) waits on
     P3-N009 (sibling ordering retired)." with: "- The executing stage
     of P1-N016 (process spec maintenance) waits on E1, the first
     execute task of P3-N007 (the type declared)."
   - [plan.md](../plan.md), the diagram. Replace "  P3N009 -->
     P1N016" with "  P3N007 --> P1N016".
   - [plan.md](../plan.md), *Planning now*. Replace "- P1-N016 (process
     spec maintenance), task T074. Its executing stage waits on
     P3-N009." with: "- P1-N016 (process spec maintenance), task T074.
     Its executing stage waits on E1, the first execute task of
     P3-N007."
   - [P3-N002 specification](../specs/p3-n002-comprehension-model.md),
     criterion D3. Replace "Node P1-N016 rebases on it. The Backlog
     collision entry is closed." with: "Node P1-N016 (process spec
     maintenance) edits neither the selection rule nor the statements of
     D1, so it does not wait on D
     ([plan of P1-N016](../plans/p1-n016-process-spec-maintenance.md),
     decision 3). D closes the Backlog collision entry."
   - [Backlog](../backlog.md), the entry "P3-N002 and P1-N016 both reach
     `dispatch.md`'s selection rule". Replace "**P3-N002's amendment is
     the one that lands, and P1-N016 rebases its pass on the amended
     text.**" with: "P3-N002's amendment is the one that lands. P1-N016
     edits neither the selection rule nor the four statements, so it
     does not wait on P3-N009 (P1-N016 plan, decision 3, adopted at its
     gate)."
4. **Who deletes a task branch, and when.**
   **Default**: the Orchestrator deletes each task branch, local and
   remote, in the acceptance step, after merging it into the design
   branch. A session that made a branch that will never merge deletes
   it before it returns. A refused deletion becomes a Backlog row naming
   the branch, for the owner to delete. A branch merged by pull request
   is left to the repository's automatic deletion. *Alternative*: the
   owner deletes all task branches at each gate.
   **Rationale**: the Orchestrator performs the merge, so the deletion
   belongs beside it; the 403 refusal of 2026-09-16 is recorded, not
   worked around, and its cause is untested.
   **Affected locations**: none.
5. **Who writes the shared registers under parallel dispatch.**
   **Default**: while tasks run concurrently, no brief names the
   Backlog or the Risk register among the role's writes. Each role
   returns its additions in its result. The Orchestrator writes them in
   the acceptance commit, which is serial. *Alternative*: per-task
   fragment files the Orchestrator merges.
   **Rationale**: P1-N014's decision 13 (a brief's writes bound the
   role) already implies it, and the round of 2026-09-17 and this one
   ran that way. The work enters the design branch at acceptance, so
   the Backlog moves with it there, as step 3 already does for located
   findings.
   **Affected locations**: none.
6. **An override toward an option with no drafted text.**
   **Default**: the Orchestrator captures the ruling and places
   nothing. It dispatches a Planner task that drafts and places the
   text, before any other task on that node. *Alternative*: every
   staged option carries drafted text.
   **Rationale**: the Orchestrator places text verbatim only; drafting
   is judgment, and drafting every option costs a Planner on every
   decision for a rare case.
   **Affected locations**: none.
7. **A child carried at criteria depth by its parent's specification.**
   **Default**: it gets a plan task and no specify task. Its plan gate
   moves it `planned` → `specified`, with the parent's child section and
   the plan's additions as its specification. The plan no longer
   stages the question.
   **Rationale**: six consecutive plans (P3-N006 (the thin end-to-end
   slice), P3-N007, P3-N010,
   P3-N011, P3-N013, P3-N014) staged it, and every gate adopted "no";
   RU-020 is the near match one stage later.
   **Affected locations**: none.
8. **What a leaf is.**
   **Default**: a leaf is a node with one outcome and no part that
   validates on its own. It runs as one task, or as a fixed sequence of
   tasks its plan names. A task that needs an independent session, such
   as a blind reading, is one of those tasks. `profiles.md`'s breakdown
   row reads "required where a node has parts that validate
   separately".
   **Rationale**: P2-N016 (deploy, smoke and promote on merge to main),
   P3-N013, P3-N011 and P3-N007 were adopted to run this way, against
   the single-session wording.
   **Affected locations**: two process documents with no Status line.
   E2 reworks both passages.
   - [plan-model.md](../process/plan-model.md), *The hierarchy*.
     Insert before the paragraph beginning "A managed project's plan is
     a tree": "> Superseded by decision 8 of the
     [plan of node P1-N016](../plans/p1-n016-process-spec-maintenance.md)
     (process spec maintenance), a leaf runs as one task or a fixed
     sequence of tasks, adopted at that plan's gate. Read that decision
     for what a leaf is until the node's execute reworks this
     paragraph."
   - [profiles.md](../process/profiles.md), *Profile table*. Insert
     after the table: "> Superseded by decision 8 of the
     [plan of node P1-N016](../plans/p1-n016-process-spec-maintenance.md)
     (process spec maintenance) for the Breakdown row's
     \"single-session size\", adopted at that plan's gate. Read that
     decision until the node's execute reworks the row."
9. **The packet table and the startup working set.**
   **Default**: the table changes as *The packet table, row by row*
   states. The startup working set becomes the Plan register and
   `dispatch.md` up to *Sequence mode*; *Sequence mode* is read when a
   sequence is ratified or running, and Backlog entries by node ID.
   *Alternative*: keep the whole Backlog in the startup set and the
   base, and exclude only *Sequence mode*.
   **Rationale**: eight packet observations since 2026-08-30, and the
   Backlog is three quarters of the startup set; this task's own brief
   named only the routed Backlog entries.
   **Affected locations**: none.
10. **Rulings promoted and declined.**
    **Default**: as *Rulings flagged for promotion* states: eight
    promoted, RU-022 already carried, five declined, RU-018 left to
    P3-N009. E2's result proposes the new *Promotion flags* line.
    **Rationale**: the promote step names this pass; stack and
    architecture rulings are not orchestration process, and RU-014 has
    one application.
    **Affected locations**: none at the gate. The *Promotion flags*
    line changes at E2's acceptance.
11. **New form-check rules.**
    **Default**: this node adds none. A new node, identified now and
    dependent on P3-N009 and P1-N016, writes three rules into
    `auditing.md` and the checker together: a plan's or specification's
    Status against its node's stage; a `dispatched` event with no
    terminal event and no session identifier; and a sequence's journal.
    *Alternative*: a third execute task here, after P3-N009.
    **Rationale**: P3-N009 rewrites the same checker next; a rule in
    `auditing.md` the checker does not run is a checker defect
    (Constitution Article 3, authority); new rules may move corpus expectations, which travel to
    the service repository.
    **Affected locations**: none.
12. **A project vocabulary.**
    **Default**: a new `docs/vocabulary.md` holds one row per term a
    gate record shows ratified. Each row has a `def-` anchor and the
    ratified meaning in one sentence. The row is the definition site.
    The passage that first defined the term keeps its text and anchor,
    and links the row. Links elsewhere are not rewritten.
    *Alternative*: rows that only index the existing anchors.
    **Rationale**: W-008 (reports map their deliverables) and P-008
    (terms are defined once and linked at first use) give a ratified
    term a vocabulary row that is its definition site; about thirty
    terms ratified since 2026-10-29 have none. The alternative departs
    from P-008.
    **Affected locations**: none.
13. **Where a checked Backlog entry lives.**
    **Default**: an entry is checked where it stands. A reader looking
    for finished work reads every checked entry, wherever it sits. The
    header says so, and no entry moves.
    **Rationale**: 47 checked entries sit under *Upcoming* on 2026-10-30;
    P3-N010's decision 3 adopted this reading; the Backlog becomes a
    rendering once the amendment of K-003 (the Backlog is the single
    source of progress truth) is pinned
    ([RU-021 (the planning/execution model is the source of progress truth)](../rulings.md)),
    so moving entries now is work the rendering redoes.
    **Affected locations**: one `active` document.
    - [plan.md](../plan.md), opening. Replace "Today the
      [Backlog](backlog.md) holds the implementation map (its
      [Completed](backlog.md#completed) section) and the list of what is
      next (its [Upcoming](backlog.md#upcoming) section)." with: "Today
      the [Backlog](backlog.md) holds the implementation map (its
      checked entries, wherever they sit) and the list of what is next
      (its open entries)."
14. **The journal's kinds and fields.**
    **Default**: `observability.md` gains the kinds `unblocked` (a hold
    released; the note names what released it) and `risk-opened` (a
    Risk register entry opened; the note names it). The `stage` field
    holds the task's stage as the packet table names it: plan, specify,
    break down, execute or verify. Gate events carry no task. The
    Orchestrator writes `dispatched` only after the launch returns, with
    `session` holding the launched session's identifier.
    **Rationale**: two gaps of the same shape since 2026-09-01; the
    stage words already in the journal are the packet table's; a
    session identifier is the one field a skipped launch cannot supply.
    **Affected locations**: none.
15. **A committed home for every task's Asks part.**
    **Default**: every task's `result-received` note carries the
    result's Asks part verbatim, part 7 of the member's result record.
    The sentence "Outside a sequence, the `result-received` note keeps
    its present form." becomes "Outside a sequence, the
    `result-received` note carries the result's Asks part, part 7
    above, verbatim."
    **Rationale**: condition 4 of W-001 (two delivery modes,
    human-gated) had almost no corpus because no
    committed artifact held an Asks part; P3-N014 fixed this inside
    sequences only. The sentence sits outside the copied predicate text.
    **Affected locations**: none at the gate. E1 replaces the sentence.
16. **Ratify or strike five names.**
    **Default**: ratify all five. Ruling types: `sequencing` (dispatch
    order and concurrency), `stack` (languages, runtimes and code
    sharing) and `knowledge` (which document holds which truth).
    Journal kinds: `unblocked` and `risk-opened`, as decision 14 defines
    them.
    **Rationale**: RU-018 was typed `scope` for want of the first; the
    register has used the second and third since 2026-08-26 and
    2026-10-29 without a definition; the kinds follow the journal's
    existing naming style.
    **Affected locations**: none.
17. **The other dispositions, as recorded.**
    **Default**: rows 13, 14, 19, 27, 31 and 35 as the inventory
    states.
    **Rationale**: each is a mechanical rule or a closure with no
    alternative worth the owner's time.
    **Affected locations**: none.

## Backlog additions

- **This node's entry**: rewritten at this gate to `planned`, or to
  `specified` if decision 2 is adopted, with this plan's link.
- [ ] **Form-check rules from the process-spec pass** — When:
  2026-10-30, planning P1-N016 (T074). Status: open, a node to identify
  after P3-N009 if decision 11 is adopted: a plan's or specification's
  Status against its node's stage; a `dispatched` event with no terminal
  event and no session identifier; a sequence's journal. Pointer:
  [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md),
  decision 11.
- [ ] **The selection rule is restated outside P3-N009's four
  statements** — When: 2026-10-30, planning P1-N016 (T074). Status:
  open, for P3-N009 (criteria D1 and D4): `dispatch.md`'s *Parallel
  dispatch* paragraph and step 2 of `.claude/agents/orchestrator.md`,
  with its mirror in `plugin/agents/`, restate "earlier siblings
  `done`". Pointer:
  [plan of P1-N016](plans/p1-n016-process-spec-maintenance.md), *What
  this node leaves alone*.

## References

- [orchestrator-v1](orchestrator-v1.md): the founding plan, this node's
  parent
- [Backlog](../backlog.md): this node's entry and the rows routed to it
- [dispatch](../process/dispatch.md), [plan-model](../process/plan-model.md),
  [roles](../process/roles.md), [observability](../process/observability.md),
  [profiles](../process/profiles.md), [auditing](../process/auditing.md),
  [rulings type](../process/rulings.md), [README](../process/README.md):
  the documents the node maintains
- [Ruling register](../rulings.md): the promotion flags and the
  precedents checked
- [P3-N002 specification](../specs/p3-n002-comprehension-model.md),
  child D: P3-N009's criteria
- [P3-N007 plan](p3-n007-type-declared-amendment-drafted.md) and
  [P3-N014 plan](p3-n014-loop-runs-sequence-mode.md): the overlapping
  nodes
- [P3-N011 plan](p3-n011-sweep-and-omission-list.md) and
  [P1-N014 plan](p1-n014-role-contracts-adopt-v140-rules.md): the shape
  precedents
- methodology 1.6.0: W-003, W-006 (names follow outcomes; branches are
  single-use), W-008 (reports map their deliverables), K-010
  (superseded content is never silently readable), K-011 (found
  contradictions are marked, not routed around), P-004, P-007, P-008,
  and the style guide's supersession-marker format
