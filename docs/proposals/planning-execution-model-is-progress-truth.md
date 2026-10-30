# A declared planning/execution model is the source of progress truth

Status: under review (round 7, 2026-10-30)

<!-- K-007 contract: Status transitions draft → delivered (hand-carried
     into an upstream issue or pull request, text unchanged) →
     accepted / amended / rejected, a maintainer disposition this
     document does not itself record (the originating project tracks
     that disposition in its own backlog, not here). Anything unmarked
     here is a live claim of current intent. This file is a standalone
     proposal artifact, written to be pasted upstream as-is. It was
     written IR first. Its IR,
     planning-execution-model-is-progress-truth.ir.md, sits beside it,
     and the review record of its stranger rounds joins them. Before
     it is carried, the project-orchestrator owner gates it at node
     P3-N007's verifying stage, under RU-005 (proposal-class nodes are
     owner-gated at verifying). -->

Reader: RD-4 (a fresh agent session) in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers),
and the maintainers who adjudicate the amendment. The proposal was
rendered from its intermediate representation (IR), the claim list
[planning-execution-model-is-progress-truth.ir.md](planning-execution-model-is-progress-truth.ir.md)
beside this file. It assumes the
methodology at version 1.6.0, in particular [Article 7 (the C0 baseline,
custom definitions, and the
sandbox)](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)
and [Article 8 (amendments, versions, and
migration)](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-8--amendments-versions-and-migration).

**To:** the maintainers of majodali/methodology.

**Amends:** K-003 (the Backlog is the single source of progress truth),
[as released at
v1.6.0](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth).

**Change:** one conditional sentence appended to K-003's statement, and one citation added to its Motivated-by line.

**Asked of the reader:** accept the amendment, accept it with
amendments, or reject it.

## The problem

The referent is the record a reader consults for what is done and
what is next. K-003 makes the
[Backlog](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
that referent. K-003 forbids any other document to claim the role of
that referent.

This proposal defines two terms.

- <a id="def-list-of-what-is-next"></a>**List of what is next**: the
  Backlog's answer to what is next.
  Under K-003 as released it is the Backlog's entries of upcoming work.
  Under the amendment it is rendered from the declared
  [planning/execution model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
  and holds
  [nodes](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/README.md#def-node)
  only.
- <a id="def-rendering"></a>**Rendering**: a text produced from a source
  by a stated procedure. The rendering adds no claim the source lacks.
  It drops no claim the procedure says it carries.

The
[owner](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-human-owner)
is one person, who owns the methodology and project-orchestrator alike.
On 2026-10-28 the owner decided that each project's [planning/execution
model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
is the primary source of truth about progress. The owner also
decided on 2026-10-28 that the [implementation
map](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
and the list of what is next become renderings of the planning/execution
model. The owner decided as well that the Backlog becomes a
rendering project by project, as each project adopts the
project-orchestrator. The three decisions are recorded in the [vision
IR](https://github.com/majodali/methodology/blob/195eba92efa2dc86631af839fd5de22f30240d30/docs/vision.ir.md)
on the methodology's `main`.

A project that keeps a planning/execution model beside a Backlog under
K-003 as released records what is done and what is next twice. K-003
as released lets no project make its planning/execution model the
referent for what is done and what is next.

## The change

The amendment changes
[K-003](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
in place by appending one conditional sentence to the rule's
statement and one citation to its Motivated-by line. The appended sentence reads: "Where the project's
Classification declares a planning/execution model, that model is the
referent instead, and the Backlog's implementation map and list of what
is next are renderings of it."

The appended sentence is an exception to the two referent clauses
before it. Where it applies, K-003's clauses "The Backlog is the
referent for what is done and what is next" and "no other document may
claim that role" both yield to it. How a
Classification declares a model is stated under [*How a Classification
declares a model*](#how-a-classification-declares-a-model) below. A
project whose
[Classification](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-classification)
declares no [planning/execution
model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
reads K-003 unchanged. The amendment leaves K-003's sentence on
[Workflow](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-workflow)
stage designations unchanged. The amendment says nothing about the
verification evidence of each
[node](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/README.md#def-node),
the record of whether what the node built works.
A planning/execution model has two components: the plan model, the
project's nodes with their stages and edges, and that verification
evidence. The amendment reaches the plan model only.

The amendment keeps K-003's title, so links to the rule's anchor keep
resolving. The title stays true for every project whose
Classification declares no planning/execution model. For a project
that declares one, the rule's statement governs, because the title is
the rule's name and not its text. K-003's
Motivated-by line gains a citation of the evidencing instance, the
slice of the project-orchestrator [Project
model](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md)
that evidences the amendment, at [commit
`86a1330`](https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model-slice-record.md).
The section [*The evidencing instance*](#the-evidencing-instance)
describes it.
The amendment changes no other part of K-003.

A condition on a Classification declaration lets the rule apply
mechanically, project by project. The project-orchestrator ruling
[RU-021 (the planning/execution model is the source of progress
truth)](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/rulings.md)
directs that.

Current text, quoted verbatim from
[`docs/rules/knowledge.md`](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md)
at the commit the provenance line names:

> ### K-003 — The Backlog is the single source of progress truth
> Applies: [C1+]
> Keywords: MUST
> Motivated-by: [proposal A2](../practices.md); convergent independent practice in [allegro BACKLOG.md](https://github.com/majodali/allegro) and [in-real-life docs/backlog.md](https://github.com/majodali/in-real-life)
> Cites: —
>
> Every project MUST keep a Backlog: one dependency-ordered Register of
> completed and upcoming work. Checked entries MUST be rewritten to
> describe what actually shipped, so the completed section doubles as the
> implementation map. Where the project declares a Workflow, entries MUST
> carry current stage designations (Article 4 declaration accuracy). The
> Backlog is the referent for "what is done and what is next"; no other
> document may claim that role.
>
> **Rationale**: the stage-designation clause deliberately mirrors
> Article 4's declaration-accuracy duty — a mirror, not a duplication
> (review round 1 adjudication, 2026-08-30).

Replacement, final [normative
text](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-normative-text):

```markdown
### K-003 — The Backlog is the single source of progress truth
Applies: [C1+]
Keywords: MUST
Motivated-by: [proposal A2](../practices.md); convergent independent practice in [allegro BACKLOG.md](https://github.com/majodali/allegro) and [in-real-life docs/backlog.md](https://github.com/majodali/in-real-life); extended by project-orchestrator, 2026-10-30 — its Project model rendered the Backlog's implementation map and list of what is next and compared both with its Backlog ([instance](https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model.md) and [slice record](https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model-slice-record.md), commit `86a1330`)
Cites: —

Every project MUST keep a Backlog: one dependency-ordered Register of
completed and upcoming work. Checked entries MUST be rewritten to
describe what actually shipped, so the completed section doubles as the
implementation map. Where the project declares a Workflow, entries MUST
carry current stage designations (Article 4 declaration accuracy). The
Backlog is the referent for "what is done and what is next"; no other
document may claim that role. Where the project's Classification
declares a [planning/execution model](../vocabulary.md#def-planning-execution-model),
that model is the referent instead, and the Backlog's implementation
map and list of what is next are renderings of it.

**Rationale**: the stage-designation clause deliberately mirrors
Article 4's declaration-accuracy duty — a mirror, not a duplication
(review round 1 adjudication, 2026-08-30).
```

**Provenance**: quoted against majodali/methodology v1.6.0, commit
`3e34829`, on 2026-10-30, and checked unchanged against `main` at commit
`195eba9` on 2026-10-30. This line also covers the IR beside this file.
The [owner](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-human-owner),
who carries the proposal upstream under [RU-002 (upstream output is
hand-carried)](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/rulings.md),
re-verifies the quote against upstream `main` before
carrying it. The quote may have moved.

## What the model is authoritative for

Under the amendment, a project's declared [planning/execution
model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
is authoritative for the
[stage](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/plan-model.md#the-node-lifecycle)
of each node.
The model is authoritative for each
[part](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md#def-resource)'s
state, as derived from the stages of the nodes that create and modify
the part. The model is authoritative for the recorded
[edges](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md#def-edge)
from nodes to the parts the nodes create, modify and use.

The model renders the [implementation
map](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
as one row per part, with the part's derived state and the nodes that
created and modified the part. The model renders the [list of what
is next](#def-list-of-what-is-next) over every node of the model, one
item per node not yet done.
Each item carries the node's stage and the nodes that node waits for.

The model is not authoritative for whether a part works. The model
is not authoritative for which node starts next among the nodes free to
start. That choice also depends on the scope and budget the
[owner](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-human-owner)
approves. The amendment claims no authority for three further items
the model carries for each part. These are the part's description, its
links to specifications and its links to entries of the project's [Risk
register](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/open-risks.md).

A term-by-term cross-check ties each authority in this section to a
named section of the [Project model type
specification](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md).
The cross-check is evidence
[E7](planning-execution-model-is-progress-truth.ir.md#evidence) of the
IR beside this file.

## Open Backlog entries that name no node

Under the amendment, an open
[Backlog](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
entry that names no
[node](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/README.md#def-node)
stays in the Backlog's upcoming section, outside the rendered [list of
what is next](#def-list-of-what-is-next). The entry is the Backlog's own
content. An open
Backlog entry joins the list of what is next when it becomes a node,
or when a node's plan takes it in. Entering each small
finding as a node would add planning ceremony that the finding does not
need.

At drafting, 31 of the 139 open entries in the [project-orchestrator
Backlog](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/backlog.md)
named no node. The count takes one entry to be a checkbox line plus the
lines that follow it up to the next entry or heading. The count takes
an entry as open when the entry's checkbox is unchecked. The count
takes an entry as naming a node when its text holds a node identifier
such as P3-N007, the node that drafted this proposal. An entry a node holds names that node, and an entry that merely
mentions a node is counted as naming it too. So 31 is a lower bound on the
open entries no node holds.

## Whether "built but broken" stands

Under the amendment, a
[part](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md#def-resource)'s
derived state `built` says the work on the part is done, not that the
part works. The [known
limit](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/backlog.md#L750)
that the model cannot say "built but broken" stands under the
amendment, because whether a part works is verification evidence. The
amendment leaves that evidence outside K-003.
The limit's earlier premise, that K-003 stays unamended, no longer
holds. Recording where each node's verification evidence lands is
later work on the [planning/execution
model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model),
outside the amendment.

## The evidencing instance

The evidencing instance is one of four kinds of evidence for the
amendment, beside the owner's decisions of 2026-10-28, the term-by-term
cross-check and the count of open Backlog entries. The
slice is the first five entries of the project-orchestrator
[Project
model](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md),
built by node P3-N006 (the thin end-to-end slice). The slice holds
one entry per
[part](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md#def-resource),
derived from documents the repository already held. Its record is the
[slice
record](https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model-slice-record.md).
The evidencing instance is that slice, pinned at commit `86a1330`. The
full instance is the Project model with an entry for every part of the
project-orchestrator repository. Node
[P3-N008](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/plan-register.md)
is planned to build the full instance over that repository.

From the five entries and the [Plan
register](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/plan-register.md)
alone, the slice rendered five implementation-map rows. Every stage
the rows read from the Plan register agreed with the state the entries
recorded. The slice record rendered the list of what is next in a narrower form,
per part: the open nodes with an edge to the part. Each of the five
lists held no open item, because the slice's plan had held back the
edges from open nodes to the five parts. The full instance renders the list of what is next over the whole
model, in the form stated under [*What the model is authoritative
for*](#what-the-model-is-authoritative-for).

The comparison of the renderings with the Backlog listed eleven
differences. It left none unexplained. Of the eleven differences,
seven were claims the model lacked, two were claims the Backlog lacked,
and two were disagreements ([slice
record](https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model-slice-record.md),
section 3). In both disagreements, the Backlog showed finished work
as unfinished. The model showed the work as done.

Under the project-orchestrator criterion
[G6](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/specs/p3-n002-comprehension-model.md),
node P3-N008 renders the implementation map and the list of what is
next over the full instance when it executes. Node P3-N008 then
compares the renderings with the Backlog. If criterion G6
contradicts the slice's evidence, project-orchestrator reopens this
proposal with the reason recorded.

## The vocabulary entry the amendment depends on

The vocabulary entry for [planning/execution
model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
is on the methodology's `main` branch at commit `350f75f`. The
vocabulary entry is unreleased at v1.6.0. The amendment needs the
vocabulary entry released with the amendment or before the
amendment.

## How a Classification declares a model

A
[Classification](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-classification)
declares a [planning/execution
model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
by an entry in its Custom definitions section. The declaring entry
takes Article 7's definition-by-citation form. It names the types that
make up the model. The declaration needs no new Classification
field.

## Release-register entry

The entry below is written for the [Release
register](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-release-register).

- **Amendment title**: A declared planning/execution model is the source
  of progress truth.
- **PR**: `<PR URL>`. The owner fills this placeholder with the pull
  request's URL when the pull request is opened.
- **Suggested by**: project-orchestrator, 2026-10-30, with RU-021 (the
  planning/execution model is the source of progress truth) and the
  slice at commit `86a1330`.
- **Impact assessment**: the assessment covers every row of the
  [Portfolio
  register](https://github.com/majodali/methodology/blob/v1.6.0/docs/registers/portfolio.md)
  at v1.6.0.
  - methodology (`methodology-corpus`): *accommodated*, because K-003
    gains one sentence and the methodology's Classification declares no
    planning/execution model.
  - methodology-tools: *accommodated*, because the sentence binds
    methodology-tools only once its Classification declares a
    planning/execution model, which the methodology's
    [roadmap](https://github.com/majodali/methodology/blob/195eba92efa2dc86631af839fd5de22f30240d30/docs/roadmap.ir.md)
    expects at the
    [pilot](https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/plans/orchestration-service.md).
  - project-orchestrator: *accommodated* as the evidencing instance, and
    declares its planning/execution model only after the amendment is
    released and pinned there.
  - allegro, in-real-life, in-real-life-ops, in-real-life-org,
    project-orchestrator-service, serverless-web-app-template and
    communication-pipeline: *accommodated*, because the sentence binds
    each only once its Classification declares a planning/execution
    model.
  - The thirteen rows the Portfolio register marks implicit C0 are
    unaffected, because K-003 applies from [criticality
    tier](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-c-tier)
    C1. Those rows are projects with no Classification of their own,
    which [Article
    7](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)
    places at the C0 baseline. The thirteen rows are mc-tools,
    graph-analysis, open-context, open-context-v1, workbench, chat,
    antimatter, modcraft, tautology, simple-modeling, parser-generator,
    software-project-api and chloe-portfolio.
- **Migration note**: a project whose
  [Classification](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-classification)
  declares no [planning/execution
  model](https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model)
  changes nothing. A project that declares a planning/execution
  model renders its Backlog's implementation map and list of what is
  next from the model from the declaration on. Such a project
  then rewrites its checked entries by that rendering of the
  implementation map. K-003's duty to rewrite checked entries stands. That rendering
  meets it.

## The ask

project-orchestrator asks the maintainers to accept the amendment,
accept it with amendments, or reject it.

- **If accepted**: project-orchestrator declares its planning/execution
  model once the release is pinned. After the declaration,
  project-orchestrator switches its Backlog's implementation map and
  list of what is next to renderings of the model.
- **If accepted with different wording**: project-orchestrator re-reads
  its practice against the released text. It then adapts the practice.
- **If rejected**: the project-orchestrator Backlog stays the referent.
  The Project model stays a description of the project's parts.
  After a rejection, project-orchestrator raises the amendment again
  only with new evidence, such as criterion G6 over the full
  instance.

The proposal also asks the
[owner](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-human-owner)
to ratify or strike the two terms it defines: [list of what is next](#def-list-of-what-is-next) and
[rendering](#def-rendering).

<!-- render map: C1→¶7 C2→¶7 C3→¶11 C4→¶11 C5→¶11 C6→¶12 C7→¶12 C8→¶13 C9→¶13 C10→¶14 C11→¶14 C12→¶14 C13→¶15 C14→¶15 C15→¶15 C16→¶15 C17→¶16 C18→¶20 C19→¶20 C20→¶20 C21→¶21 C22→¶21 C23→¶22 C24→¶22 C25→¶22 C26→¶23 C27→¶24 C28→¶7 C29→¶24 C30→¶24 C31→¶25 C32→¶25 C33→¶25 C34→¶25 C35→¶25 C36→¶26 C37→¶26 C38→¶26 C39→¶26 C40→¶26 C41→¶27 C42→¶27 C43→¶28 C44→¶28 C45→¶28 C46→¶29 C47→¶29 C48→¶29 C49→¶30 C50→¶30 C51→¶31 C52→¶31 C53→¶31 C54→¶32 C55→¶32 C56→¶32 C57→¶34 C58→¶35 C59→¶36 C60→¶37 C61→¶38 C62→¶39 C63→¶40 C64→¶41 C65→¶42 C66→¶42 C67→¶43 C68→¶43 C69→¶43 C70→¶45 C71→¶46 C72→¶47 C73→¶47 C74→¶22 C75→¶28 C76→¶43 C77→¶12 C78→¶27 C79→¶37 C80→¶45 C81→¶46 C82→¶47 C83→¶12 C84→¶12 C85→¶12 C86→¶26 C87→¶14 C88→¶29 -->
