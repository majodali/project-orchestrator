# A register kept as data is rendered, never hand-edited

Status: draft (written on 2026-11-17 under task T149 of node P4-N026, Upstream proposals batch; reworked the same day under task T152; not yet approved for carrying; no stranger rounds run)

<!-- K-007 contract: Status transitions draft → approved for carrying
     (the project-orchestrator owner, at the hold on node P4-N026) →
     delivered (hand-carried into an upstream pull request, text
     unchanged) → accepted / amended / rejected, a disposition the
     methodology records, not this file. Written IR first; its IR,
     registers-as-data-files.ir.md, sits beside it. Proposal two of
     three: see the cover note. -->

Reader: RD-4 (a fresh agent session) in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers),
and the maintainers who adjudicate the amendment. The reader knows the
methodology at version 1.6.0, in particular [Article 7 (the C0
baseline, custom definitions, and the
sandbox)](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox).
The proposal was rendered from its intermediate representation (IR),
[registers-as-data-files.ir.md](registers-as-data-files.ir.md).

**To:** the maintainers of majodali/methodology.

**Adds:** one rule to the Knowledge section, suggested identifier
K-012.

**Amends:** two vocabulary rows, Register and planning/execution
model.

**Asked of the reader:** accept the amendment, accept it with
amendments, or reject it.

**Provenance**: every quote of majodali/methodology below was taken on
2026-11-17 from `main` at commit
`4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57` (committed 2026-11-02), the
head of `main` on that day. The released version is v1.6.0, tag commit
`3e3482921e7e23bb4ad690b40394bf00b7feb37f`. This line also covers the
IR beside this file. The owner, who carries the proposal under RU-002
(upstream output is hand-carried), re-verifies each quote against
upstream `main` before carrying it. The quotes may have moved.

## The problem

The vocabulary defines a
[Register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-register)
as a
[Document](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-document),
and a Document as a markdown file. No rule of the methodology says how
a project keeps a Register as data.

Until 2026-11-09 project-orchestrator kept its plan, its task costs,
its rulings and its Backlog as markdown files. Agents wrote them by
hand and parsers read them back. On that day the hand-written Backlog
held 3,542 lines and 30,654 words. Its longest entry held 5,615
words.

The import of 2026-11-09 moved those records into one data file. It
found three tasks in the journal with no row in the Cost log. It found
twelve open nodes whose dependency only the order of sibling rows
implied. The rebuild then had to invent the duties that keep a
rendered Register honest, because the methodology states none.


## The change

The proposal adds one rule to the Knowledge section of the rule
corpus. It suggests the identifier K-012. The maintainers assign the
identifier.

The rule lets a project keep a Register as a data file: a
[non-document
artifact](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-non-document-artifacts)
of a custom type declared in the Custom definitions section of the
[Classification](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-classification).
The rule then states five duties:

1. The declaration names the schema that defines the type.
2. The Register's Document is a
   [rendering](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-rendering)
   of the data file.
3. The Document names the data file and the rendering procedure in its
   header.
4. Nobody edits the Document by hand.
5. An automated check fails when the Document differs from the
   rendering.

The rule binds no project that keeps every Register by hand.


New text, final [normative
text](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-normative-text),
appended to `docs/rules/knowledge.md` after the section of K-011
(found contradictions are marked, not routed around), the last rule of
the file:

```markdown
### K-012 — A register kept as data is rendered, never hand-edited
Applies: [C1+]
Keywords: MAY, MUST, MUST NOT
Motivated-by: project-orchestrator, 2026-11-17 — its plan, task costs and rulings moved on 2026-11-09 from hand-written markdown registers to one checked data file, the [state file](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/orchestration/state.json), from which its [Backlog](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/backlog.md) and Plan register are rendered and checked ([state model](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/process/state-model.md))
Cites: [Constitution Article 7](../constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox) (custom artifact types); [P-006](prose.md#p-006--registers-hold-uniform-rows) (registers hold uniform rows, which binds the rendered Document)
Protects: [provenance](../vocabulary.md#def-provenance) — each row of the register traces to one record in the data file

**Statement**: A project MAY keep a
[Register](../vocabulary.md#def-register) as a data file: a
[non-document artifact](../vocabulary.md#def-non-document-artifacts)
of a custom type declared in the Custom definitions section of its
[Classification](../vocabulary.md#def-classification). The
declaration MUST name the schema that defines the type. Where a
project keeps a Register as a data file, the Register's Document MUST
be a
[rendering](../vocabulary.md#def-rendering) of the data file. The
Document MUST name the data file and the rendering procedure in its
header. The Document MUST NOT be edited by hand. An automated check
MUST fail when the Document differs from the rendering.

**Rationale**: A register written by hand and read back by a parser
has two descriptions of its shape, the prose and the parser. A data
file has one, the schema, and a check can enforce it on every write.
The reader still gets a Document, so no rule that reads registers
changes.
```

The proposal adds one sentence to the vocabulary row for Register,
which points at the rule.

Current text, quoted verbatim from `docs/vocabulary.md`:

```markdown
  - <a id="def-register"></a>**Register** — append-oriented Document of uniformly-shaped entries:
    *Backlog*, *Decision register*, *Risk register*, *Radar*, *Hypothesis
    register*, *Event register* (house style: "register"; ES/CQRS sources
    often say "registry" — [AsyncAPI](https://www.asyncapi.com/) et al.),
    the *Audit log* (`docs/audits.md` — one Entry per audit execution,
    in the format the [audit process](audit-process.md) defines; the
    machine-readable
    source for *time of last semantic audit*, which the Article 9
    delta-ratio auto-trigger reads; entries arrive by *Audit delivery*
    on state transitions; motivated by
    [methodology-tools chunk 1](https://github.com/majodali/methodology-tools/pull/1)),
    and — in the methodology repo only — the *Portfolio register*.
    Register-shaped sections *within* a Document are **Embedded
    registers**, a Content type — the Deviation register and Custom
    definitions section within the Classification are the current
    instances.
```

Replacement, final text: the row as quoted, with this sentence added
after its last sentence, "are the current instances."

```markdown
    A Register MAY be kept as a data file, with its
    Document a [rendering](#def-rendering) of the data file
    ([K-012](rules/knowledge.md#k-012--a-register-kept-as-data-is-rendered-never-hand-edited)).
```

The proposal adds the words "or custom artifact types" to the
vocabulary row for [planning/execution
model](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-planning-execution-model).
The row is on `main` and unreleased at v1.6.0. Without the added
words, a project whose planning/execution model is a data file cannot
declare the model in the form the row states.

Current text, quoted verbatim from `docs/vocabulary.md`:

```markdown
- <a id="def-planning-execution-model"></a>**Planning/execution model** — the plan model of a project plus
  the verification evidence of each node: what the web view renders
  and the source of progress truth (owner, 2026-10-28,
  [vision](vision.ir.md)). A [Classification](#def-classification)
  declares the model by an [entry](#def-entry) in its Custom
  definitions section. The entry is a definition by citation under
  [Article 7](constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)
  and names the [custom document types](#def-custom-document-type) that
  make up the model. The declaration needs no new Classification field
  (owner, 2026-10-30,
  [record](records/k-003-planning-execution-model.ir.md)).
```

Replacement, final text: the row as quoted, with its eighth line, "and
names the … that", replaced by these two lines.

```markdown
  and names the [custom document types](#def-custom-document-type) or
  custom artifact types that
```

The proposal changes no other rule and no other vocabulary row. P-006
(registers hold uniform rows) keeps binding the rendered Document.


## The evidence from the rebuild

The evidencing instance is the [state
file](../vocabulary.md#def-state-file) of project-orchestrator,
`orchestration/state.json`, with its checker `plan-state`, at commit
`b1c8b9f`. The file holds 95 nodes, 139 tasks and 56 decisions. The
project's [Classification](../classification.md) declares the state
file as a custom artifact type and cites the schema that defines the
type.

`plan-state check` validates the state file against the schema and
eleven invariants, on every write by the service and in CI. The
invariants are listed in [the state
model](../process/state-model.md).

Three Documents are rendered from the state file: the [Plan
register](../plan-register.md), the [project plan](../plan.md) and
the [Backlog](../backlog.md). Each names the state file and the
command `plan-state render` in its header. Invariant 9 of `plan-state
check` fails when a rendered Document differs from the rendering. A
CI step fails a pull request that changes a file the service owns.
The rendered Backlog holds 79 rows in 95 lines, one row per node that
is not a check node, each with the four fields P-006 names.

The import of 2026-11-09 wrote the first state file. It read the Plan
register, the Cost log, the Ruling register, the journal and the
decision sections of five plans. It produced 59 nodes, 103 tasks and
60 decisions. The Plan register rendered after the import listed each
of the 59 nodes of the hand-written Plan register, at the stage the
hand-written one gave. The [import
record](../../orchestration/import-record.md) lists what the import
could not take from a record. After the import, 38 nodes took a hand
correction to a title or an outcome.

On 2026-11-11 the old form checker failed on states the service had
written. The owner made `plan-state check` the one validity rule.


One limit of this evidence: the rebuild changed the data model and
the review process at once. The evidence does not isolate the effect
of the data file.

## Release-register entry

The entry below is written for the [Release
register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-release-register).
Its title is the rule's title. It names project-orchestrator as the
suggesting project, with the state file at commit `b1c8b9f` as the
evidencing instance.

The impact assessment covers every row of the [Portfolio
register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/registers/portfolio.md)
at commit `4c7b1dd`. It did not read the registers of any project
except methodology, methodology-tools and project-orchestrator.


```markdown
### A register kept as data is rendered, never hand-edited

- **PR**: `<PR URL>`. The owner fills this placeholder when the pull
  request is opened.
- **Suggested by**: project-orchestrator, 2026-11-17. The evidencing
  instance is its state file at commit `b1c8b9f`
  ([state file](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/orchestration/state.json),
  [state model](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/process/state-model.md)).
  On 2026-11-09 the project moved its plan, task costs and rulings
  from hand-written markdown registers into that file. Its Backlog
  and Plan register are renderings of the file, and a check fails
  when either differs from the rendering.
- **Impact assessment**: every row of the
  [Portfolio register](registers/portfolio.md).
  - project-orchestrator: *accommodated* as the evidencing instance.
    Its three rendered Documents already meet each duty of the rule.
  - methodology-tools: *accommodated*, because the rule binds it only
    once it keeps a Register as a data file. The project-orchestrator
    pilot plans that for its Backlog.
  - methodology, allegro, in-real-life, in-real-life-ops,
    in-real-life-org, project-orchestrator-service,
    serverless-web-app-template and communication-pipeline:
    *accommodated*, because the rule binds each only once it keeps a
    Register as a data file. The registers of the last seven were not
    read for this assessment.
  - The thirteen rows marked implicit C0: *not affected*, because the
    rule applies from C1.
  - The vocabulary row *Register* gains one sentence. The row
    *planning/execution model*, unreleased at v1.6.0, gains the words
    "or custom artifact types".
- **Migration note**: a project that keeps every Register by hand
  changes nothing. A project that keeps a Register as a data file
  declares the type in its Classification with its schema, adds the
  header line to the rendered Document, and adds the check that fails
  when the Document differs from the rendering.
```

## The ask

project-orchestrator asks the maintainers of majodali/methodology to
accept the amendment, accept it with amendments, or reject it, under
Article 8 (amendments, versions, and migration).

Before the proposal is carried, the project-orchestrator owner reviews
it at the hold on node P4-N026 under RU-005 (proposal-class nodes are
owner-gated at verifying). At that hold the owner approves the
proposal for carrying, amends it or returns it.

<!-- render map: C1→¶8 C2→¶8 C3→¶9 C4→¶9 C5→¶10 C6→¶10 C7→¶10 C8→¶11 C9→¶11 C10→¶14 C11→¶14 C12→¶14 C13→¶14 C14→¶14 C15→¶14 C16→¶14 C17→¶16 C18→¶19 C19→¶19 C20→¶19 C21→¶22 C22→¶22 C23→¶23 C24→¶23 C25→¶23 C26→¶24 C27→¶25 C28→¶25 C29→¶25 C30→¶25 C31→¶25 C32→¶26 C33→¶26 C34→¶26 C35→¶27 C36→¶28 C37→¶29 C38→¶29 C39→¶30 C40→¶30 C41→¶30 C42→¶30 C43→¶30 C44→¶30 C45→¶26 C46→¶26 C47→¶30 -->
