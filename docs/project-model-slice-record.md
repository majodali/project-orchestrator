# Project model slice record: what five resources put to the notation

Reader: RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and node P3-N007 (the type declared, the
arguments written, the K-003 (the Backlog is the single source of
progress truth) amendment drafted), which writes the type specification
against this record. It assumes the methodology at this project's pinned
version, 1.6.0 ([Classification](classification.md)), and the section
*Child A: the thin end-to-end slice, five real parts all the way
through* of the [specification of the comprehension
model](specs/p3-n002-comprehension-model.md). The criteria A1 to A9 (the
nine criteria of child A) named below are that section's criteria.

This record belongs to the instance
[project-model.md](project-model.md), which holds the five entries. The
instance holds entries only. This record holds the reasoning. Both land
in one commit, which node P3-N007 pins. The record's seven sections
follow the order the [plan of
P3-N006](plans/p3-n006-thin-end-to-end-slice.md) fixes.

Terms this record uses are defined in the
[specification](specs/p3-n002-comprehension-model.md), section *The
navigation bound*: step, starting point, answer reached, structural
conditions (i) to (iii). Four terms are new here:

- A held edge is an edge that exists in a plan or specification and that
  the slice does not write into the instance.
- An own status is a status a resource carries in another register, such
  as a ruling's `[active]`.
- A formerly line is the line of an entry that names a predecessor
  implementation the resource replaced.
- A standing append is an act the Orchestrator repeats at every
  acceptance, such as adding events to the run journal. It is not a
  node's work.

## 1. Session statement: no orchestration service tool was called

- Task T054 (the execute stage of node P3-N006), the Implementer role at
  the standard tier, in session `session_0136LNfSGP1c76WgbPWuLoad`, on
  branch `thin-end-to-end-slice`.
- Every item in the instance was derived from files in the git working
  tree of this repository, read with a shell and a text editor. Two
  small scripts read the same files to check that links resolve and
  headings are unique. The scripts are not committed and call no
  service.
- The session called no orchestration service tool and no tool of any
  MCP server (A5, no orchestration service tool; and I9,
  git-authoritative and service-independent).
- No other repository was read. The facts about the service repository
  come from this repository's Backlog, the Ruling register and the
  vendoring generator. The methodology clone was read at tag v1.6.0 for
  the rule texts the packet lists.

## 2. Rendering procedure, written before rendering

The type specification's rendering procedures are node P3-N007's (B2,
the type specification's rendering procedures). They do not exist yet.
This is the procedure the slice used. It was written down, as the plan
requires, before any rendering. P3-N007 may change it. The record keeps
the one used.

### Edge derivation, used to write the entries

1. A node is a source of edges when its stage in the [Plan
   register](plan-register.md) is `done`. The Ruling register's Source
   and Applied fields are also sources. The Cost log maps a task in an
   Applied field to its node.
2. An edge is written when a record of the node states that it created,
   modified or used the resource. The records are the node's Backlog
   entry, its specification and its plan. For the form checker, a `uses`
   edge needs a record that makes the checker's passing a criterion of
   the node, or a record that the node ran it.
3. Every edge item cites its record in a `from` parenthetical.
4. Four kinds of edge are not written, and each is a held edge: the
   parent specification's list *Edges stated at this breakdown*, this
   node's own plan edges, the edges of any node not yet `done` that come
   from its plan alone, and any edge only git history would show. Plan
   decision 2 holds the first two back until node P3-N007 is accepted.

### State derivation, used to write the `state:` lines

1. List the nodes on the entry's `created-by:` and `modified-by:` lines.
2. Read each node's stage in the Plan register. A node is in flight when
   its stage is `executing` or `verifying`.
3. The value is `planned` when none is `done`, `building` when a
   creating node is in flight, `built` when all are `done`, and
   `built, changing` when all creating nodes are `done` and a modifying
   node is in flight.
4. Held edges and standing appends do not count.
5. An own status is copied with its source as a second item on the
   `state:` line. It is never merged into the derived value.

### Implementation-map entry, rendered per resource

1. Open the entry in `project-model.md`. Do not open the Backlog.
2. What: the first sentence of the `is:` line.
3. Mark: `[x]` when the derived `state:` value is `built`, else `[ ]`.
4. When: the model holds no dates. Write that.
5. Status: the derived value, then each node on the `created-by:` and
   `modified-by:` lines with its stage read from the Plan register. Stop
   if a stage disagrees with the `state:` line. Append the own status
   when the `state:` line has one.
6. Pointer: the first link on the `spec:` line.
7. Emit the row in the Backlog's declared shape: what, when, status,
   pointer.

### Open what-is-next item, rendered per resource

1. From the `created-by:` and `modified-by:` lines, list the nodes whose
   Plan register stage is not `done`.
2. Each is an item: its identifier, its register title, its stage.
3. The item is actionable when the next stage can be dispatched and
   every resource on the node's `uses` edges has `state: built` in the
   instance. Where a used resource has no entry, write "not computable"
   and name it.
4. When no node qualifies, write "no open item".

### Comparison with the Backlog

1. Search the Backlog for the resource's slug, its file path, and the
   node identifiers on its lines.
2. A claim in the rendering that the Backlog states is an agreement.
3. A difference is a claim that only one side holds, or that the two
   state differently. Classify it as G6 (the model renders the Backlog's
   two remaining jobs) does: the model lacks a claim, the Backlog lacks
   a claim, or the two disagree.
4. A difference is carried to a node that already holds the work, or
   proposed as a Backlog addition in the task result. The slice does not
   change the Backlog beyond its header line and its own row.

## 3. Renderings and their comparison with the Backlog

### The five implementation-map entries

- [x] **The tool that enforces the Plan register grammar and the
  cross-register invariants (form-checker)** — When: the model holds no
  date. Status: built; created by P1-N005 (Plugin v1 with self-hosted
  trial, done) and P1-N012 (The form checker on the shared unit, done);
  modified by P1-N013 (The cutover, done). Pointer: [Plugin tooling on
  the portfolio stack,
  specification](specs/p1-n009-plugin-tooling-portfolio-stack.md).
- [x] **The one canonical implementation of the Plan register grammar
  and the node lifecycle stage vocabulary (plan-register-grammar)** —
  When: the model holds no date. Status: built; created by P1-N010 (Node
  toolchain and the shared register grammar, done); modified by P1-N013
  (The cutover, done). Pointer: [Plugin tooling on the portfolio stack,
  specification](specs/p1-n009-plugin-tooling-portfolio-stack.md).
- [x] **The append-only feed of orchestration operation (run-journal)**
  — When: the model holds no date. Status: built; created by P1-N005
  (Plugin v1 with self-hosted trial, done); no modifying node. Pointer:
  [Observability](process/observability.md).
- [x] **The ruling that the Planner declares the repository access a
  node needs (RU-016)** — When: the model holds no date. Status: built;
  created by P2-N012 (Deploy the service from CI on merge, done); own
  status active. Pointer: [Ruling register type](process/rulings.md).
- [x] **This repository, majodali/project-orchestrator, the coordinating
  repository of the orchestration project (project-orchestrator-repo)**
  — When: the model holds no date. Status: built; created by P1-N002
  (Bootstrap and founding plan, done); modified by P1-N005 (Plugin v1
  with self-hosted trial, done), P1-N009 (Plugin tooling on the
  portfolio stack, done) and P1-N014 (Role contracts adopt the
  methodology's conduct rules, done). Pointer:
  [Classification](classification.md).

Procedure step 5 held for all five: every stage read from the Plan
register agrees with the `state:` line.

### The five open what-is-next items

- form-checker: no open item. Every node on its `created-by:` and
  `modified-by:` lines is done.
- plan-register-grammar: no open item. Every node on its lines is done.
- run-journal: no open item. Its only node is done.
- RU-016: no open item. Its only node is done.
- project-orchestrator-repo: no open item. Every node on its lines is
  done.

Step 3 of the procedure, actionability, had nothing to compute. The
model holds no edge from an open node to any of the five. Plan decision
2 holds those edges back, so this is the result the plan expected.

### Comparison: agreements

| Resource | The Backlog states the same |
|---|---|
| form-checker | Built by P1-N005, P1-N012 and P1-N013, each marked `[x]`; the Python form retired at P1-N013; the pointer to the P1-N009 plan and specification; the pointer to R13 (the tooling's runtime assumption moves from python3 to node) in the entry on the runtime assumption |
| plan-register-grammar | Created by P1-N010; the correction at P1-N013; the service repository's adoption by vendoring through `sync_shared_unit.ts` at P2-N010 (Plan-state update); the pointer to RU-012 (how two repositories share one unit of code) |
| run-journal | Journal begun at P1-N005; the specification is `observability.md`; `journal_tail` reads it (P1-N010) |
| RU-016 | The ruling was made at the P2-N012 gate; the specification of P3-N001 (project comprehension and continuous implementation) applied it; the repository reach of P3-N002 (the comprehension model) cites it |
| project-orchestrator-repo | Created by the bootstrap; enrolled by P1-N005; P1-N009 scoped to this repository only |

### Comparison: differences

Each difference has an identifier, a class, the resources it touches and
a disposition. "Carried" names the node that already holds the work.

| Id | Class | Resources | Difference | Disposition |
|---|---|---|---|---|
| ML1 | The model lacks a claim | all five | The Backlog gives a date for each row (When). The model holds no date for any node or resource. | Carried to P3-N007, which decides where dates come from (the journal and the Cost log hold them). |
| ML2 | The model lacks a claim | all five | The Backlog narrates what each node shipped. The `is:` line states what the part is now, not its history. | Expected. Carried to P3-N007 under I8 (the specification lifecycle). |
| ML3 | The model lacks a claim | form-checker (3), plan-register-grammar (1), run-journal (2), RU-016 (1) | Seven open Backlog entries attach to these resources and none is a node. They are: the Status-against-stage check, the machine-readable finding mode and the deterministic half of the class-to-instance check (form-checker); the `journal_tail` duplicate-ID behaviour (plan-register-grammar); the block-release event and the journalled dispatch as evidence (run-journal); the missing place for RU-016's declaration (RU-016). The model has no entity for an open finding. | Carried to P3-N007 (finding 4 below). Backlog addition proposed. |
| ML4 | The model lacks a claim | form-checker, RU-016, project-orchestrator-repo | Held edges: P3-N007 and P3-N009 (sibling ordering retired, and the checks that replace it) modify the form checker, P3-N006 modifies the repository (its plan's reach), P3-N006 uses the form checker and RU-016, and the plans of P3-N003 (the common risk catalogue), P3-N005 (sequence mode), P3-N010 (one class, carried end to end) and P3-N013 (the four stop conditions) cite RU-016. The rendering has no open item as a result. | Carried to the Orchestrator's transcription at P3-N007's acceptance (plan decision 2). |
| ML5 | The model lacks a claim | all five | Actionability of an open node needs the entry of every resource it uses. P3-N007 would use `project-model`, RU-015 (how a change reaches a repository this project cannot write to) and RU-021 (which document is the source of progress truth), none of which has an entry. | Carried to P3-N008 (the instance over this repository), which populates the instance. |
| ML6 | The model lacks a claim | plan-register-grammar | Whether the service repository's vendored copy is in step, and the open entry in that repository's Backlog about running the drift check automatically, need a read of the service repository. | Not fixable under the plan's repository reach. Recorded here only. |
| ML7 | The model lacks a claim | run-journal | No record names the node that wrote `observability.md`. The Backlog row for it cites the owner's chunk-3 review. The `created-by:` line names the node that began the file. | Recorded in finding 5 below. |
| BL1 | The Backlog lacks a claim | form-checker, plan-register-grammar, run-journal, project-orchestrator-repo | No Backlog row says what the part is now. Rows are per node outcome. The `is:` line is the only statement. | Carried to P3-N008 and the switch to a rendering (a Backlog entry). |
| BL2 | The Backlog lacks a claim | form-checker, run-journal, RU-016, project-orchestrator-repo | The Backlog states no consumer as an edge. The model lists eight nodes for the form checker, two for the journal, two for RU-016 and two for the repository. | Carried to P3-N008. |
| DG1 | The two disagree | form-checker, plan-register-grammar | The `[x]` rows for P1-N010 to P1-N013 and for the service-side adoption stand under the Backlog's `## Upcoming` heading. K-003 makes the completed section the implementation map, so the rendering places them in the map. | Carried to the Backlog entry "Editorial pass over the Backlog to the declared row shape". |
| DG2 | The two disagree | form-checker, run-journal, project-orchestrator-repo | The opening of the P1-N005 row says `executing` until the demo gate. The Plan register and the model say `done`. The body of the same row records acceptance on 2026-08-26. | Carried to the same editorial pass. The slice does not rewrite an earlier row. |

Counts: seven differences where the model lacks a claim, two where the
Backlog lacks one, two where the two disagree. No difference is
unexplained. None fails A6 (the renderings compared with the Backlog).
The plan expected ML4 and ML5.

One further finding concerns the rendering rule rather than a resource.
G6 says a rendering drops no claim its source holds. A row in the
Backlog's shape holds four fields, so it cannot carry the `risks:` line,
the edge lines or the `formerly:` line. The slice renders a view and
names what the view omits. Finding 3 below asks the type specification
to do the same.

## 4. The fifty paths and the statement on three steps

A path is the ordered steps from a starting point to the line that
states an answer. The slice measured two starting points: the
[Backlog](backlog.md) and the [specification of
P1-N009](specs/p1-n009-plugin-tooling-portfolio-stack.md). Each carries
a header line linking `project-model.md`, added in this commit (A4,
paths from two starting points). Five resources, five answers and two
starting points give fifty paths.

The edge answer is one answer: the `created-by:`, `modified-by:` and
`used-by:` lines state both what the resource depends on and what
depends on it. All paths are relative to `docs/`.

A step is one of the three acts the specification defines. Step 0 is the
starting document. Step 1 follows the header link. Step 2 is the one
find, for the string `## ` followed by the slug. It is unique in the
instance. Step 3 follows a link on the entry. The rows were generated
from one template per answer type. A script then opened each start,
confirmed the header link, confirmed the heading string occurs once,
confirmed the facet line, resolved each link target and confirmed the
R13 entry exists.

| # | Resource | Answer | Start | Steps from step zero | Ends at | Steps |
|---|---|---|---|---|---|---|
| 1 | `form-checker` | is | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` | `is:` line | 2 |
| 2 | `form-checker` | is | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` | `is:` line | 2 |
| 3 | `form-checker` | state | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` | `state:` line | 2 |
| 4 | `form-checker` | state | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` | `state:` line | 2 |
| 5 | `form-checker` | spec | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` → 3 `specs/p1-n009-plugin-tooling-portfolio-stack.md` (spec link) | `specs/p1-n009-plugin-tooling-portfolio-stack.md` open | 3 |
| 6 | `form-checker` | spec | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` → 3 `specs/p1-n009-plugin-tooling-portfolio-stack.md` (spec link) | `specs/p1-n009-plugin-tooling-portfolio-stack.md` open | 3 |
| 7 | `form-checker` | risks | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` → 3 `open-risks.md` (R13 link), R13 by scrolling | `open-risks.md` at R13 | 3 |
| 8 | `form-checker` | risks | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` → 3 `open-risks.md` (R13 link), R13 by scrolling | `open-risks.md` at R13 | 3 |
| 9 | `form-checker` | edges | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` | the three edge lines | 2 |
| 10 | `form-checker` | edges | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## form-checker` | the three edge lines | 2 |
| 11 | `plan-register-grammar` | is | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` | `is:` line | 2 |
| 12 | `plan-register-grammar` | is | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` | `is:` line | 2 |
| 13 | `plan-register-grammar` | state | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` | `state:` line | 2 |
| 14 | `plan-register-grammar` | state | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` | `state:` line | 2 |
| 15 | `plan-register-grammar` | spec | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` → 3 `specs/p1-n009-plugin-tooling-portfolio-stack.md` (spec link) | `specs/p1-n009-plugin-tooling-portfolio-stack.md` open | 3 |
| 16 | `plan-register-grammar` | spec | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` → 3 `specs/p1-n009-plugin-tooling-portfolio-stack.md` (spec link) | `specs/p1-n009-plugin-tooling-portfolio-stack.md` open | 3 |
| 17 | `plan-register-grammar` | risks | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 18 | `plan-register-grammar` | risks | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 19 | `plan-register-grammar` | edges | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` | the three edge lines | 2 |
| 20 | `plan-register-grammar` | edges | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## plan-register-grammar` | the three edge lines | 2 |
| 21 | `run-journal` | is | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` | `is:` line | 2 |
| 22 | `run-journal` | is | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` | `is:` line | 2 |
| 23 | `run-journal` | state | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` | `state:` line | 2 |
| 24 | `run-journal` | state | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` | `state:` line | 2 |
| 25 | `run-journal` | spec | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` → 3 `process/observability.md` (spec link) | `process/observability.md` open | 3 |
| 26 | `run-journal` | spec | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` → 3 `process/observability.md` (spec link) | `process/observability.md` open | 3 |
| 27 | `run-journal` | risks | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 28 | `run-journal` | risks | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 29 | `run-journal` | edges | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` | the three edge lines | 2 |
| 30 | `run-journal` | edges | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## run-journal` | the three edge lines | 2 |
| 31 | `RU-016` | is | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` | `is:` line | 2 |
| 32 | `RU-016` | is | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` | `is:` line | 2 |
| 33 | `RU-016` | state | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` | `state:` line | 2 |
| 34 | `RU-016` | state | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` | `state:` line | 2 |
| 35 | `RU-016` | spec | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` → 3 `process/rulings.md` (spec link) | `process/rulings.md` open | 3 |
| 36 | `RU-016` | spec | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` → 3 `process/rulings.md` (spec link) | `process/rulings.md` open | 3 |
| 37 | `RU-016` | risks | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 38 | `RU-016` | risks | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 39 | `RU-016` | edges | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` | the three edge lines | 2 |
| 40 | `RU-016` | edges | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## RU-016` | the three edge lines | 2 |
| 41 | `project-orchestrator-repo` | is | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` | `is:` line | 2 |
| 42 | `project-orchestrator-repo` | is | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` | `is:` line | 2 |
| 43 | `project-orchestrator-repo` | state | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` | `state:` line | 2 |
| 44 | `project-orchestrator-repo` | state | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` | `state:` line | 2 |
| 45 | `project-orchestrator-repo` | spec | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` → 3 `classification.md` (spec link) | `classification.md` open | 3 |
| 46 | `project-orchestrator-repo` | spec | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` → 3 `classification.md` (spec link) | `classification.md` open | 3 |
| 47 | `project-orchestrator-repo` | risks | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 48 | `project-orchestrator-repo` | risks | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` → [confirm: 3 `open-risks.md` (risks link)] | `risks:` line, `none` | 2 |
| 49 | `project-orchestrator-repo` | edges | Backlog | 0 `backlog.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` | the three edge lines | 2 |
| 50 | `project-orchestrator-repo` | edges | P1-N009 specification | 0 `specs/p1-n009-plugin-tooling-portfolio-stack.md` → 1 `project-model.md` (header link) → 2 find `## project-orchestrator-repo` | the three edge lines | 2 |

Notes on the table:

- Rows 6 and 16 start at the P1-N009 specification and ask for a spec
  answer that is that specification. They end at the start document
  itself. The path is recorded as followed from the entry, because a
  reader learns the document is the answer only from the entry. A reader
  already holding the document would need one step fewer. That shorter
  path is not counted.
- The eight `none` risk paths end at the `risks:` line at step 2, as
  plan decision 3 states. The bracketed step 3 is the verifier's
  confirmation in the Risk register. With it, each of the eight is still
  three steps.
- The two R13 paths end at step 3 with `open-risks.md` open. The R13
  entry sits at line 263 of a page of 378 lines. It has no anchor, so it
  is reached by scrolling, which the definition does not count as a
  step.

Statement on three steps (A8, the record states whether three steps
held): three steps held for every one of the fifty paths. The counts are
38 paths at two steps (ten each for is, state and edges, and eight risk
paths) and twelve paths at three steps (ten spec paths and two R13
paths). The maximum is three. The bound is not changed and no
`needs-judgment` return follows from the measurement.

The result rests on two conditions the definitions state and the slice
did not choose. Scrolling is not a step. A find counts only for a
resource's slug. If locating R13 in the Risk register counted as a find,
the two R13 paths would have four steps. The definitions as written do
not count it. The Backlog already carries the entry "Risk register and
Ruling register entries have no anchors". Finding 6 below returns to it.

The structural conditions, for the five entries. Condition (i), that
every starting point links the instance, holds for the two measured
starting points only. Linking the other six is node P3-N008's work.
Condition (ii), a slug findable in one find, holds: each `## slug`
occurs once. Condition (iii), five facets as labelled lines with `spec:`
and `risks:` links, holds. Four `risks:` lines read `none` and link the
Risk register, under plan decision 3.

## 5. Answers to the seven questions, and the changes to the sketch

The sketch is the illustrative entry in the [plan of the comprehension
model](plans/p3-n002-comprehension-model.md), section *Where the entries
live, and what one looks like*.

The plan puts seven questions to the sketch. Each answer below follows
the question as the plan states it.

### Question 1: one resource or two for the form checker

The question: Is `form-checker` one resource with an alias, or two?

One resource with a `formerly:` line. The reasons are in the records.
P1-N012 proved the TypeScript form equal to the Python form finding for
finding. P1-N013 retired the Python form. The two live criteria that
named the Python command were renamed at the cutover with the substance
unchanged, so the criteria treat it as one checker. Two resources would
split a blast radius that is one part. The cost is that `created-by:`
carries two nodes, with a note saying which form each created.

### Question 2: state for the repository and the journal

The question: What does `state:` say for the repository and the journal?

The state derivation in section 2 counts creating and modifying edges
only, and never held edges or standing appends. The repository reads
`built`. The journal reads `built`, and its `modified-by:` line reads
`none` because the Orchestrator's appends are a standing append. If the
repository carried an edge for every node that changes it, the derived
value would never leave `built, changing`. The slice avoids that by
keeping the line partial and saying so. The rule P3-N007 should write is
finding 2.

### Question 3: a derived state beside a ruling's own status

The question: How does a derived `state:` relate to RU-016's own
`[active]`?

The `state:` line holds two items. The first is the derived value,
`built`. The second is the own status, `active`, copied from the Ruling
register with its source. They answer different questions: has the work
that created it finished, and does it bind now. They cannot conflict.
When a ruling is superseded, only the second item changes, and G5's (a
blast radius is read off, not guessed) read of a reversed ruling keys on
it.

### Question 4: the creating edge of a ruling made at a gate

The question: What does RU-016's creating edge name?

It names P2-N012 and says the creation was at the node's gate, by the
owner's decision, not by a task's work. The Ruling register's Source
field supports this. It does not always name a node: RU-011 (the
language of repository-local tooling) has "owner decision on noticing
the inconsistency" as its source and no node. For such a ruling
`created-by:` would read `none`. The `creates` kind is stretched by a
gate decision; finding 7 records it.

### Question 5: a consumer outside the Plan register

The question: How is a consumer outside the Plan register stated?

As an item on the `used-by:` line, marked "outside the Plan register",
naming the repository, the vendored path, the generator and RU-012. The
adopting node, P2-N010, is also an item. The two are different facts: a
node's work ends, and the repository's consumption continues. The
consumption's current state, whether the copy is in step, is a claim
only the service repository can verify (ML6).

### Question 6: one kind of spec link or two

The question: Is the run journal's process-document `spec:` one kind of
link or two?

Two kinds, and the entry types them. A node specification is a document
with a K-007 (plans are outcome-named, statused, and ruthlessly current)
lifecycle that ends `closed → Backlog entry`, such as the specification
of P1-N009 (Plugin tooling on the portfolio stack). A process
specification is a persisting document, such as `observability.md`. The
form checker's `spec:` line holds one of each. The distinction matters
because the closed document still declares itself historical. Finding 8
states what it costs.

### Question 7: where each item's source goes

The question: Where does each item's source go?

At the end of the item, in a parenthetical after the word `from`. Per
item, because a line may hold several items with different sources, and
A3 (every item names its source) holds item by item. Two other places
were weighed. A source per line fails on lines with several items. A
sources block per entry breaks the line-by-line check. The cost is
longer lines, especially the edge lines.

### The sketch lines against the entries

| Sketch line | Result | Reason |
|---|---|---|
| `- form-checker — the orchestration form checks` | Changed | The entry is a `## slug` heading. A heading gives one unique string for the find and an anchor. The description moved into `is:`. |
| `is:` | Changed | Same meaning. The item gains a source parenthetical and names the files. |
| `state: built` | Confirmed, then extended | The value `built` was right for the form checker. The line gains the derivation statement and a second item for an own status (question 3). |
| `spec: specs/p1-n009-…` | Changed | The sketch's single link is a closed node specification. The entry adds `process/auditing.md` and types each item (question 6). |
| `risks: R13` | Confirmed | R13 is the only entry that names the checker as at risk. R5 (register/reality divergence) and R10 (the service becomes a second source of truth) name it as a mitigation and are not listed. The line also gains the `none` form (plan decision 3). |
| `created-by: P1-N012` | Changed | P1-N005 created the Python form. The line holds two nodes (question 1). |
| `modified-by: P1-N010 · P1-N013` | Changed | P1-N013 is confirmed. No record shows P1-N010 modifying the checker. It ran the checker, so it moved to `used-by:`. |
| `used-by: P2-N009 · P2-N014` | Changed | P2-N009 (Plan-state read) is confirmed: it compared its parser with the Python form. P2-N014 (Pull-request checks that cannot deploy) is not supported: its checks run in the service repository's workflow, and the plan of P2-N012 says form checking on pull requests here is not that node. Seven nodes are added from criteria and Backlog entries. |

Notation changes from the sketch, each with its reason:

1. Heading `## slug` replaces the list item: unique find, anchor.
2. A `from` parenthetical on every item: A3, question 7.
3. A node is written with its identifier and a shortened register title:
   P-004 (citations carry names).
4. A `formerly:` line: question 1, and the grammar's predecessor in the
   service repository.
5. A second item on `state:` for an own status: question 3.
6. Typed `spec:` items: question 6.
7. The `none` form with a link, on `risks:` and on edge lines: plan
   decision 3, and question 2 for the journal.
8. A `used-by:` item for a consumer outside the Plan register: question
   5.
9. A `created-by:` item may name a gate, with the reason: question 4.
10. A closing item on a partial edge line, stating the limit and its
    source, on `modified-by:` for the repository.

The sketch's three edge lines stay. They answer "what depends on it"
directly through `used-by:`. They answer "what it depends on" through
nodes, and not through other resources. A reader who asks what the form
checker depends on finds the grammar named in its `is:` line, and the
grammar's `used-by:` line names the node that built the checker. Finding
9 asks whether a resource-to-resource line is wanted.

## 6. Substitutions among the five

None. The five resources are the plan's: form-checker,
plan-register-grammar, run-journal, RU-016 and
project-orchestrator-repo. They satisfy A1 as they stand: RU-016 is a
ruling, project-orchestrator-repo is a repository, and
plan-register-grammar is consumed across a repository boundary.

## 7. Findings for the type specification

Each finding is addressed to node P3-N007 unless it says otherwise. Each
carries a recommendation.

### Finding 1: the derivation rule's cycle (criterion B1)

The instance holds no cycle, because plan decision 2 keeps the edges
that cause it out. The cycle is in the declared edges. P3-N006 uses
`plan-register`, `backlog`, the Risk register and the Ruling register as
they stand when it executes. P3-N009 modifies `plan-register`, P3-N011
(the sweep, the rest of the catalogue, and the omission list) writes the
Risk register and every child modifies `backlog`. Under the derivation
rule P3-N006 would depend on later nodes. Recommendation: add a
read-as-it-stands edge kind that creates no dependency, and let the
Planner choose between it and `uses`. The plan of P3-N006 already says
it reads those documents "as they stand when it executes", which is that
kind.

### Finding 2: state for standing resources

A repository, and any resource every node touches, would read
`built, changing` for as long as the project runs. The journal would
too, if appends were edges. The value carries no information.
Recommendation: the type specification marks such a resource as standing
and exempts it from the `changing` rule. The state line then reads
`built (standing)`.

### Finding 3: views and the rendering rule

A Backlog-shaped row drops claims the model holds (the `risks:` line,
the edge lines, the `formerly:` line). G6's rule that a rendering drops
no claim cannot hold for a row. Recommendation: the type specification
states which facets each view carries and which it omits, and applies
the rule per view. The same finding covers dates (ML1): a row needs When
and the model holds none.

### Finding 4: open findings that are not nodes

Seven open Backlog entries attach to the five resources and none is a
node (ML3). The Backlog holds many more. Recommendation: choose between
entering each as an `identified` node and giving the entry an `open:`
line that links the finding. Without one of them, the list of what is
next cannot be rendered from the model.

### Finding 5: authorship of a specification

The model records who created a resource's file and has no line for who
wrote its specification (ML7). Recommendation: leave it unstated unless
a records shows a node, and say so in the type specification.

### Finding 6: anchors in the Risk register and the Ruling register

The bound holds for R13 only because scrolling is not a step.
Recommendation: keep the existing Backlog entry "Risk register and
Ruling register entries have no anchors" and make it a condition of the
web view (P2-N003, owner questions and the plan view). This is also the
place to decide whether a find for a risk identifier counts as a step.

### Finding 7: a gate decision is not a node's work

`creates` is stretched when a ruling is made at a gate, and fails when a
ruling has no node (question 4). Recommendation: allow `created-by:` to
name a gate of a node, and to read `none` with the Source text.

### Finding 8: closed node specifications as `spec:` targets

The P1-N009 specification declares itself `closed → Backlog entry`. A
`spec:` link to it sends a reader to a document that calls itself
historical. Recommendation: the type specification requires the durable
content of a closed node specification to be carried onto the entry
(I8), and types the link so a reader sees the document is closed.

### Finding 9: resource-to-resource dependence

The entries state it only through `is:` text. Recommendation: derive a
`depends-on:` view from the `uses` edges of each creating node, and do
not store it. The form checker's creating node P1-N012 uses the grammar,
so the dependence is derivable.

### Finding 10: risk relation

An entry can threaten a part or name it as a mitigation. R13 threatens
the form checker. R5 and R10 name it as a mitigation. Four of the five
`risks:` lines read `none` because the Risk register is keyed by failure
mode and not by part. Recommendation: adopt the catalogue's reaches line
(P3-N003) as the key, or state the rule used here: list an entry only
when it names the part as at risk.

### Finding 11: containment

The form checker, the grammar and the journal lie inside the repository,
so a node that modifies one modifies the repository too. The flat model
double-counts this or, as here, leaves the repository's `modified-by:`
partial. Recommendation: this is the case for the owner's note on
hierarchical resources. It needs no decision at this node.

### Finding 12: the Ruling register's Applied lists against the plans

RU-016's Applied field names two tasks, T039 and T043 (the specify tasks
of P3-N001 and P3-N002). The plans of P3-N003, P3-N005, P3-N006, P3-N010
and P3-N013 cite RU-016 as their authority for repository reach and the
Applied field omits them. The Applied field is the hand-written encoding
of I1 (the four hand-written encodings are disposed of), and G5 would
read an incomplete set from it. Recommendation: G5 reads the model's
`used-by:` and the Orchestrator transcribes the plan citations (ML4).
Backlog addition proposed: reconcile the Applied lists with the plans.

### Finding 13: the sketch's illustrative edges against the records

The sketch's `created-by:`, `modified-by:` and `used-by:` lines each
held a missing or an unsupported node (question 1 and the table above).
Edges must come from records, which is what plan decision 2 requires.

### Finding 14: a located finding outside the writes

`README.md` says the Classification is "pinned methodology v1.2.0". The
Classification declares 1.6.0. The instance omits the pin so it repeats
neither. Addressed to the Orchestrator.

