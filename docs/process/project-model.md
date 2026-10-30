# The Project model document type

Part of the [orchestration process specification](README.md). The
Project model describes each part of a managed project. For each part
it states what the part is, its state, its specification and its
risks. It also states which nodes create, modify and use the part.

Reader: RD-4 (a fresh agent session) in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers):
any role that reads the model, proposes entries and edges for it, or
records them. It assumes the methodology at this project's pinned
version, 1.6.0 ([Classification](../classification.md)), the [process
specification's](README.md) defined terms, and the [Plan register
type](plan-register.md).

## What this type does not claim

The model describes the project's parts. The model is not the record
of progress.

- The model is not the referent for what is done and what is next.
  K-003 (the Backlog is the single source of progress truth) gives that
  role to the Backlog, as [released at methodology
  1.6.0](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth).
  The Backlog keeps the role in this repository until an amendment to
  K-003 is released and pinned here. The owner chose this on
  2026-10-29, as option (a) of decision 13 in the [specification of
  P3-N002 (the comprehension
  model)](../specs/p3-n002-comprehension-model.md).
- A `state:` value says what the Plan register's stages give for the
  nodes that create and modify a part. The value is derived, never
  typed in.
- The value `built` says the work on a part is done. The value does
  not say the part works. Verification evidence is the second
  component of the [planning/execution
  model](https://github.com/majodali/methodology/blob/main/docs/vocabulary.md#def-planning-execution-model),
  outside this type.
- The model records declarations and infers nothing. No tool and no
  reading of git history adds an [edge](#def-edge).
- [Resources](#def-resource) are flat. A part inside another part,
  such as a file inside a repository, is not modelled. The Backlog
  entry *Hierarchical resources, for complex resource validations*
  holds that question.

## How a project adopts the type

A managed project defines *Project model* by citation, under the
definition-by-citation form of methodology [Article 7 (the C0
baseline, custom definitions, and the
sandbox)](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox).
Its Classification's Custom definitions section records a reference to
this document, which stays authoritative for the type's content. The
entry names the instance, and the instance links the definition.

Declaring the type declares no planning/execution model and moves no
progress authority. A Classification declares a planning/execution
model by a separate entry in its Custom definitions section. That entry
names the types that make up the model ([plan of P3-N007 (the type
declared, the arguments written, the K-003 amendment
drafted)](../plans/p3-n007-type-declared-amendment-drafted.md),
decision 5). This repository has not made that declaration. The
declaration waits for the release of the K-003 amendment.

The rules in this document bind only a project whose Classification
declares the type.

The model is one component of this project's planning/execution
model. The [Plan register](plan-register.md) holds the hierarchy and
each node's stage. Plans and specifications hold outcomes and
criteria. The model adds the [resources](#def-resource), the
[edges](#def-edge) and the persisting description of each part. The
model replaces no part of the register or of the plan documents.

## Defined terms

- <a id="def-resource"></a>**Resource**: an abstract part of the
  project that nodes create, modify or use, such as a component, a
  document, a ruling or a repository. The [plan of
  P3-N002](../plans/p3-n002-comprehension-model.md#two-entities-one-edge-kind)
  introduced it.
- <a id="def-slug"></a>**Slug**: a resource's stable name, written as
  the heading of its entry.
- <a id="def-facet"></a>**Facet**: one of the five questions an entry
  answers, written as one or more labelled lines. The facets are what
  it is (`is:`) and what state it is in (`state:`). They are what
  specification it must meet (`spec:`) and what risks attach to it
  (`risks:`). The fifth is what it depends on and what depends on it
  (`created-by:`, `modified-by:`, `used-by:`).
- <a id="def-edge"></a>**Edge**: a recorded relation from one node to
  one resource, labelled `creates`, `modifies` or `uses`.
- <a id="def-held-edge"></a>**Held edge**: an edge that a plan or
  specification states and that the instance does not yet hold.
- <a id="def-alias-line"></a>**Alias line**: the line of an entry that
  keeps the slugs a resource had before a rename, so that edges written
  with an old slug still resolve.
- <a id="def-formerly-line"></a>**Formerly line**: the line of an
  entry that names a predecessor implementation the resource replaced.
- <a id="def-own-status"></a>**Own status**: a status a resource
  carries in another register, such as a ruling's `active`.
- <a id="def-standing-resource"></a>**Standing resource**: a resource
  that nodes change as a matter of course, such as a repository, so
  that its modifying edges carry no information about its state.
- <a id="def-standing-append"></a>**Standing append**: an act the
  Orchestrator repeats at every acceptance, such as adding events to
  the run journal. A standing append is not a node's work and is not an
  edge.
- <a id="def-node-specification"></a>**Node specification**: the
  specification document of one node. Its lifecycle is the one K-007
  (plans are outcome-named, statused, and ruthlessly current) gives,
  ending `closed → Backlog entry`.
- <a id="def-process-specification"></a>**Process specification**: a
  persisting document that states what a resource must meet and has no
  node lifecycle. Examples are a document under `docs/process/`, a type
  specification, and the Classification.
- <a id="def-closing-parenthetical"></a>**Closing parenthetical**: the
  parenthesized group that ends an item and names its notes and
  sources.
- <a id="def-node-item"></a>**Node item**: an item on an edge line
  whose body is a node identifier, followed on `used-by:` by any after
  qualifier.
- <a id="def-after-qualifier"></a>**After qualifier**: the words
  ` after ` and one or more node identifiers on a `used-by:` node item,
  naming the modifying nodes the using node waits for.
- <a id="def-gate-item"></a>**Gate item**: a `created-by:` item saying
  that the owner's decision at a node's gate created the resource.
- <a id="def-outside-item"></a>**Outside item**: an item on an edge
  line naming a party outside the Plan register.
- <a id="def-partial-item"></a>**Partial item**: the last item of an
  edge line, saying why the line is incomplete.
- <a id="def-date-note"></a>**Date note**: a note on a node item or a
  gate item that dates the node's arrival at `done`.

## The instance: one file, a preamble, then entries

The instance is one Markdown file, `docs/project-model.md`. The file
holds a preamble and then one entry per [resource](#def-resource).

- The preamble is everything before the first entry. The preamble
  holds the title, the reader statement, and prose sections such as
  what the instance does not claim. The preamble holds no
  [facet](#def-facet) line.
- An entry starts at a level-two heading whose first non-blank
  following line opens with `- **is:**`.
- After the first entry, every level-two heading starts an entry. An
  entry ends at the next level-two heading or at the end of the file.
- The Orchestrator appends a new entry at the end of the file. An
  entry is never removed. The model does not prune, unlike the Plan
  register.

## The entry grammar

An entry is a heading and a list of labelled lines. The grammar below
is in ISO 14977 EBNF. `text` is any characters up to the end of the
line.

```ebnf
entry         = heading , { blank-line } , facet-list ;
heading       = "## " , slug , [ " (" , name , ")" ] , newline ;
slug          = word-slug | ruling-slug ;
word-slug     = lower , { lower | digit } ,
                { "-" , ( lower | digit ) , { lower | digit } } ;
ruling-slug   = "RU-" , digit , digit , digit , { digit } ;
facet-list    = is-line , state-line , spec-line , risks-line ,
                created-line , modified-line , used-line ,
                [ formerly-line ] , [ alias-line ] ;
is-line       = "- **is:** " , value ;
state-line    = "- **state:** " , value ;
spec-line     = "- **spec:** " , value ;
risks-line    = "- **risks:** " , value ;
created-line  = "- **created-by:** " , value ;
modified-line = "- **modified-by:** " , value ;
used-line     = "- **used-by:** " , value ;
formerly-line = "- **formerly:** " , value ;
alias-line    = "- **alias:** " , value ;
value         = text , newline , { "  " , text , newline } ;
```

A heading's `name` is the [resource's](#def-resource) name in words. A
ruling's heading carries one, as P-004 (citations carry names) requires
for an identifier.

### Lines, items and sources

A line's value is its first physical line after the label, joined to
each continuation line by one space. A continuation line starts with
two spaces.

- A value splits into items at each ` · ` (space, middle dot, space)
  that stands outside every parenthesis.
- Every item ends with a [closing
  parenthetical](#def-closing-parenthetical). That group is the last
  parenthesized group of the item, preceded by a space and ending the
  item. A link target, such as `(path.md)` after `]`, is not one.
- The closing parenthetical splits at each `; ` that stands inside it
  and outside any deeper parenthesis. The first part that begins with
  `from ` opens the sources. That part, with `from ` removed, and every
  later part are sources. Earlier parts are notes. A note never begins
  with `from `.
- A source is a Markdown link to a document, optionally followed by
  `, ` and words naming the part of it. Every item names at least one
  source.
- The item's body is its text before the closing parenthetical.

### What each line's items hold

The seven required lines carry the five [facets](#def-facet). The
three [edge](#def-edge) lines together carry the fifth.

| Line | Item bodies | Items |
|---|---|---|
| `is:` | free text stating what the [resource](#def-resource) is now | exactly one |
| `state:` | first, the derived value: `planned`, `building`, `built` or `built, changing`; then optionally `standing` ([standing resource](#def-standing-resource)); then optionally `own status <status>` ([own status](#def-own-status)) | one to three, in that order |
| `spec:` | a link to a specification document, or `none` | one or more |
| `risks:` | a link to a Risk register entry, with the risk's identifier as link text, or `none` | one or more |
| `created-by:` | node items, gate items and outside items, or `none` | one or more |
| `modified-by:` | node items and outside items, then optionally a partial item; or `none` | one or more |
| `used-by:` | node items, with or without an after qualifier, and outside items, then optionally a partial item; or `none` | one or more |
| `formerly:` | free text naming a predecessor implementation | one or more |
| `alias:` | an earlier [slug](#def-slug), in backticks | one or more |

The bodies of edge-line items take these forms.

- A [node item](#def-node-item)'s body is a node identifier,
  `P<plan>-N<seq>`, as the Plan register writes it. Its first note is
  the node's name from the Plan register, which may be shortened.
- A `used-by:` node item may end its body with an [after
  qualifier](#def-after-qualifier): ` after `, then node identifiers
  separated by `, `. The [node-to-node
  dependency](#node-to-node-dependency) rule reads it.
- A [gate item](#def-gate-item)'s body is a node identifier followed by
  ` gate`, such as `P2-N012 gate`. The owner's decision at that node's
  gate created the resource, not a task's work. Only `created-by:`
  takes a gate item. Its first note is the node's name.
- An [outside item](#def-outside-item)'s body is `outside: ` and words
  naming a party outside the Plan register, such as a repository that
  consumes the resource. An outside item counts in no derivation.
- A [partial item](#def-partial-item)'s body is `partial: ` and words
  saying why the line is incomplete. A partial item is the last item of
  its line.
- `none` is the line's only item. Its notes say why the line is empty.
  Its source is the document where a verifier confirms the absence. On
  `created-by:`, `none` means no node created the resource. The note
  then quotes the record of how the resource arose.
- `not yet derived` is the line's only item, on any line but `state:`.
  The facet has not been derived from records yet. Its source is the
  record that opened the entry. The task that populates the entry
  replaces it.

A node item or a gate item may carry a [date note](#def-date-note),
`done <YYYY-MM-DD>`. The item's sources then include the record of the
date, which [the implementation map](#the-implementation-map) names.

The first note of a `spec:` item is its kind. The kind reads `node
specification` or `process specification`. A node specification whose
Status is `closed → Backlog entry` reads `node specification, closed`
([node specification](#def-node-specification), [process
specification](#def-process-specification)).

### An entry in this grammar

The slice's entry for RU-016 (who decides which repositories a node's
work may write to) is shown below, shortened and written in this
grammar. The links resolve from `docs/project-model.md`.

```markdown
## RU-016 (repository reach)

- **is:** The ruling that the Planner declares the repository access a
  node needs, in the node's plan (from [Ruling register](rulings.md))
- **state:** built (derived from the gate item on the created-by line;
  from [Plan register](plan-register.md)) · own status active (from
  [Ruling register](rulings.md))
- **spec:** [Ruling register type](process/rulings.md) (process
  specification; from [Classification](classification.md), the Ruling
  register definition)
- **risks:** none (no Risk register entry names the ruling as at risk;
  from [Risk register](open-risks.md))
- **created-by:** P2-N012 gate (Deploy the service from CI on merge;
  done 2026-09-01; from [Ruling register](rulings.md), the Source field
  of RU-016)
- **modified-by:** none (a ruling is superseded, never edited; from
  [Ruling register type](process/rulings.md), the entry shape)
- **used-by:** P3-N002 (The comprehension model; task T043 applied it;
  from [Ruling register](rulings.md), the Applied field of RU-016)
```

## Slugs are stable

A [slug](#def-slug) never changes meaning and is never reused.

- A slug is chosen when its entry is opened. A slug is lowercase words
  joined by hyphens. A ruling's slug is its Ruling register identifier.
- A rename writes the new slug in the heading. The entry keeps every
  earlier slug on its [alias line](#def-alias-line), with the date of
  the rename as the item's first note.
- An [edge](#def-edge) written with an earlier slug resolves to the
  entry that lists that slug as an alias.
- No two entries share a slug, and no slug appears both as a heading
  and as an alias.
- A predecessor implementation absorbed into the
  [resource](#def-resource) goes on the [formerly
  line](#def-formerly-line), not the alias line. The formerly line
  names a thing that was replaced. The alias line names a name that
  was replaced.

## Edges and the records they come from

An [edge](#def-edge) joins one node to one
[resource](#def-resource). The instance writes it on the resource's
entry: a `creates` edge on `created-by:`, a `modifies` edge on
`modified-by:`, and a `uses` edge on `used-by:`.

An edge comes from a record, and from nothing else. There are three
kinds of record.

1. A plan's *Dependencies* section, which states one node's edges when
   the node is prepared.
2. A breakdown's list of its children's edges, in the parent's
   specification or plan.
3. A record of a node that is `done`: its Backlog entry, its plan or
   its specification. The Ruling register's Source and Applied fields
   are records too, and the Cost log maps a task they name to its
   node.

No tool detects an edge, and git history alone is not a record. An
edge a record states and the instance does not hold is a [held
edge](#def-held-edge) until the Orchestrator transcribes it. Whoever
records an edge decides how coarse its resource is. The model does
not decide it.

A dependency stated only in another plan's prose is not a record.
Links between plans keep their navigation meaning and lose any
dependency meaning ([plan model](plan-model.md), the node lifecycle).

### How a plan writes an edge

A plan or a breakdown writes [edges](#def-edge) in one list item per
node and label. The item opens with a bold label of the node's
identifier and the edge's label.

```markdown
- **P3-N007 creates** `project-model-type` (the type specification,
  `docs/process/project-model.md`) and `k-003-amendment`.
- **P3-N007 modifies** `classification` and `backlog`.
- **P3-N007 uses** `project-model` and `RU-015`.
- **P3-N009 uses** `project-model` after P3-N008, and
  `project-model-type`.
```

- Each token in backticks that matches the [slug](#def-slug) grammar
  is one edge. Text outside such tokens is commentary.
- A token in backticks that is not a slug, such as a path, is
  commentary. A commit hash that matches the slug grammar stays out of
  backticks.
- On a `uses` item, an [after qualifier](#def-after-qualifier) directly
  after a slug's closing backtick qualifies that one edge.
- A slug new to the instance carries a gloss in parentheses after it,
  naming its path or what it is. The Orchestrator copies the gloss to
  the new entry's `is:` line.
- A node's repository reach, under RU-016 (the Planner declares the
  repository access a node needs), is an edge on the repository's
  [resource](#def-resource). Write access is `modifies`, and read
  access is `uses`.

## Node-to-node dependency

A node depends on another node only through a `uses`
[edge](#def-edge). Node X depends on node Y when X has a `uses` edge on
a [resource](#def-resource) R and either of these holds:

- Y has a `creates` edge on R;
- X's edge on R names Y in its [after
  qualifier](#def-after-qualifier).

The rule adds three details.

- A node an after qualifier names has a `modifies` edge on R.
- A [gate item](#def-gate-item), `created-by: none` and an [outside
  item](#def-outside-item) add no dependency. A gate item counts as
  `done` once it is written, because the gate has been crossed.
- A node never depends on itself through its own edges.

The dependency is satisfied when Y is `done`. A node is actionable for
`execute` when every dependency it has is satisfied. Until P3-N009
(sibling ordering retired, and the checks that replace it) amends
[dispatch](dispatch.md), dispatch's own selection rule decides what is
dispatched. P3-N009 writes this rule into it.

### Why a modifying node counts only when named

A `uses` [edge](#def-edge) reads a [resource](#def-resource) that later
nodes may change. If every modifying node counted, a node would depend
on later work, and real breakdowns would yield cycles. If no modifying
node counted, a node that needs a later change could start before it.
The rule counts the creating nodes always, and a modifying node only
when the [after qualifier](#def-after-qualifier) names it. The rule is
decision 3 of the [plan of
P3-N007](../plans/p3-n007-type-declared-amendment-drafted.md).

The slice record's finding 1 proposed a fourth edge label that reads a
resource as it stands and creates no dependency. That label loses
P3-N007's dependency on P3-N006 (the thin end-to-end slice), which
creates `project-model`. The three labels stay.

The cost is a silent miss. A `uses` edge that should name a modifying
node and does not lets a node start early. The Planner who writes the
edge owns the qualifier. The after qualifier can also write a cycle. A
cycle check over derived dependencies is P3-N009's, as a Backlog entry
records.

### The rule applied to the edges of P3-N002's breakdown

The [specification of P3-N002](../specs/p3-n002-comprehension-model.md),
section *Edges stated at this breakdown*, states four children's
[edges](#def-edge). Child D's `uses project-model` carries
`after P3-N008`, the meaning that section states. The children are A
(P3-N006), B (P3-N007), C (P3-N008, the instance over this repository)
and D (P3-N009).

| Child | Uses | Creating nodes of what it uses | Nodes its after qualifiers name | Depends on |
|---|---|---|---|---|
| A | `RU-016`, `RU-021` | gate items only | none | no sibling |
| B | `project-model`, `RU-015`, `RU-021` | A creates `project-model`; the rulings have gate items | none | A |
| C | `project-model-type`, `plan-register`, `backlog` | B creates `project-model-type`; nodes already `done` created the other two | none | B |
| D | `project-model` after P3-N008, `project-model-type`, `RU-018` | A creates `project-model`; B creates `project-model-type` | C, on `project-model` | A, B, C |

Every dependency points to an earlier child, so the chain is A, B, C,
D with no cycle. Under the rule this replaces, C would depend on D,
because C uses `plan-register` and `backlog`, which D modifies. D
would depend on C as well, which closes the cycle.

### Dependence between resources

[Resource](#def-resource) R depends on resource S when a node that
creates R has a `uses` [edge](#def-edge) on S. The model derives this
dependence and does not store it. For example, P1-N012 (the form
checker on the shared unit) creates `form-checker` and uses
`plan-register-grammar`, so the checker depends on the grammar.

## State derivation

The first item of a `state:` line is derived by a table a verifier
applies by hand. The inputs are the entry's `created-by:` and
`modified-by:` lines and the [Plan register](../plan-register.md).

1. List the creating nodes: the nodes of the `created-by:` line's
   [node items](#def-node-item) and [gate items](#def-gate-item).
2. List the modifying nodes: the nodes of the `modified-by:` line's
   node items. For a [standing resource](#def-standing-resource), list
   none.
3. Read each node's stage in the Plan register. A gate item counts as
   `done`. A node the register no longer lists counts as `done`,
   because the register prunes only completed trees. Hold markers do
   not change a stage.
4. A node is in flight when its stage is `broken-down`, `executing` or
   `verifying`. An interior node's work runs in its children, so
   `broken-down` counts.
5. Apply the first row whose condition holds.

| Row | Condition | Value |
|---|---|---|
| 1 | a creating node is in flight | `building` |
| 2 | there is a creating node, and no creating node is `done` | `planned` |
| 3 | a modifying node is in flight | `built, changing` |
| 4 | none of the above | `built` |

The item's notes say which lines the value was derived from. Where a
counted line reads `not yet derived`, a note says so.

Three cases follow from the order of the rows.

- A [resource](#def-resource) no node created, such as a ruling made
  outside any gate, has no creating node. Row 2 needs one, so the value
  is `built` or `built, changing`.
- A resource with one creating node `done` and another not started
  reads `built`. The pending creating node appears on [the list of
  what is next](#the-list-of-what-is-next).
- A modifying node not yet started does not change the value.

[Held edges](#def-held-edge) are not on the lines, so they do not
count. [Standing appends](#def-standing-append) are not edges, so they
do not count either.

The table is total: every combination of stages gets exactly one
value. The four values are those P3-N002's plan fixed.

### Own status beside the derived value

An [own status](#def-own-status) is copied onto the `state:` line as a
later item, `own status <status>`, with its source. The own status is
never merged into the derived value. The two answer different
questions. The derived value says whether the work that made the
[resource](#def-resource) is done. The own status says whether the
resource binds now. A superseded ruling changes its own status only.

### Standing resources

A [resource](#def-resource) is a [standing
resource](#def-standing-resource) when its `state:` line carries the
item `standing`. Its modifying [edges](#def-edge) stay recorded,
because a blast radius reads them. They do not count in the state
derivation, so the value does not read `built, changing` for as long
as the project runs.

This type declares two kinds of resource standing:

- a repository;
- a register that a methodology rule makes every node change, such as
  the Backlog under K-003 and W-003 (documentation moves in the same
  commit as the work).

Any other resource is standing when a plan or specification declares
it so. The `standing` item's source names that record, or this
document for the two kinds above.

A [standing append](#def-standing-append) is not an edge at all. The
run journal's `modified-by:` line reads `none`, because the
Orchestrator's appends are its standing act.

## Specifications and the specification lifecycle

A [resource's](#def-resource) entry is the persisting description of
that part. The entry says what the part is through its `is:` line, and
what the part must meet through its `spec:` links. This answers the
specification-lifecycle question of P3-N002's criterion I8.

- A [node specification](#def-node-specification) keeps the lifecycle
  K-007 gives it. Nothing about its lifecycle changes.
- Before a node specification closes, its durable content is carried
  onto the entries of the resources it specified. Durable content is
  what the specification says each part is, or must meet, that stays
  true after the node is `done`.
- The carrying happens in the acceptance commit that closes the
  specification. The role that verifies the node proposes the carried
  text in its task result. The Orchestrator records the text.
- The `spec:` link to the closed document stays, typed `node
  specification, closed`. A reader sees from the line that the
  document now calls itself historical.
- A [process specification](#def-process-specification) persists, so
  its link needs no carrying.

A node's specification thus becomes a change against a description
that outlives it. The Plan register prunes completed trees, and the
model does not. That difference keeps the description.

The model does not record who wrote a specification. A `spec:` item
names the node that wrote the document only where a record names that
node, and a note then says so.

## Risks

A `risks:` item lists a Risk register entry that names the part as at
risk. An entry that names the part only as a mitigation is not listed.
With no such entry, the line reads `none`, with the Risk register as
its source.

The Risk register is keyed by failure mode, not by part. The common
risk catalogue of P3-N003 adds a line naming the parts each risk class
reaches. Adopting that line here would make P3-N003 a dependency.
RU-018 (a child is not queued behind a sibling it does not depend on)
records P3-N003 as independent of P3-N002. A Backlog entry revisits the
rule when that line lands.

## Rulings, gates and parties outside the Plan register

A ruling is a [resource](#def-resource). Its slug is its identifier,
and its heading carries its name.

- Its `state:` line carries its Ruling register status as an [own
  status](#def-own-status).
- Its `created-by:` line names the node's gate that made it, as a
  [gate item](#def-gate-item). A ruling made at no node's gate reads
  `none`, and the note quotes the ruling's Source field.
- Its `modified-by:` line reads `none`, because a ruling is
  superseded, never edited ([Ruling register type](rulings.md)).

A party outside the Plan register, such as a repository that holds a
vendored copy of a resource, is an [outside item](#def-outside-item)
on the edge line it fits. The adopting node, if any, is a separate
[node item](#def-node-item). A node's work ends, and the outside
party's use continues.

## The writer rule

The Orchestrator is the model's single writer, on the terms it is the
Plan register's ([Plan register type](plan-register.md), maintenance
rules).

- Other roles propose entries and [edges](#def-edge) in their task
  results, in the field the handoff contract names
  ([dispatch](dispatch.md), the handoff contract).
- The Orchestrator records them in the acceptance commit it already
  makes, with one journal event per edge.
- A task whose brief names the instance among its writes writes the
  instance as its dispatched work. That case is stated, not an
  exception. The brief is the Orchestrator's act, and the Orchestrator
  checks the result at acceptance. The task writes no Plan register
  field. At acceptance the Orchestrator writes one journal event for
  each edge the task wrote.
- The stated case covers a task that creates or populates the
  instance, as P3-N006 and P3-N008 do. The case also covers P3-N007's
  first execute task, which corrected one header line of the instance.

The rule keeps concurrent role sessions from racing on one file. Two
roles appending to one file can silently lose one write, as this
project's Backlog showed under parallel dispatch. The cost is latency.
An edge stated when a plan is written reaches the instance when the
plan is accepted.

## Recording an edge

[Edges](#def-edge) are stated at two moments, in one notation.

- At a breakdown, the Planner states the children's edges in the
  breakdown. The Orchestrator transcribes them when it enters the
  children.
- At a node's preparation, the Planner states the node's edges in its
  plan's *Dependencies* section. That section is the one place a
  node's edges and repository reach are first written ([plan
  model](plan-model.md), the node lifecycle). The Orchestrator
  transcribes them when it accepts the plan.

The Orchestrator transcribes each edge in four steps.

1. Find the [resource's](#def-resource) entry by [slug](#def-slug) or
   [alias](#def-alias-line). If there is none, open an entry as
   described below.
2. Append a [node item](#def-node-item) for the edge's node to the
   line the edge's label names. Give the item the node's name as first
   note, any [after qualifier](#def-after-qualifier), and the edge's
   record as source: the document and its section.
3. Derive the `state:` line again.
4. Add one `edge-recorded` event to the run journal
   ([observability](observability.md), event kinds).

An edge that two records state is one item, with both records as
sources. The second record adds a source to the item and adds no
journal event.

An entry opened by an edge carries these lines:

- a heading with the edge's slug;
- an `is:` line copied from the gloss the edge's record gives, or
  `not yet derived`;
- a derived `state:` line;
- `not yet derived` on `spec:`, `risks:` and each edge line the edge
  does not fill, each with the edge's record as source.

A populating task replaces each `not yet derived` item from records.

## The two renderings

The model renders the Backlog's two remaining jobs: the implementation
map and the list of what is next, as K-003 names them. Each procedure
below reads the instance and the Plan register, and nothing else.

A rendering adds no claim its source lacks and drops no claim its
source holds. The methodology's [IR
specification](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md)
says this of prose rendered from an IR. A rendering's source is the
[facets](#def-facet) its procedure carries. Each procedure names the
facets it omits (P3-N007 decision 6). A row in the Backlog's
four-field shape cannot carry the omitted lines.

Neither rendering is the referent for what is done and what is next
while K-003 as released stands. P3-N002's criterion G6 compares each
rendering with the Backlog, and the K-003 amendment cites the
comparison.

### The implementation map

The implementation map gives one row per [resource](#def-resource), in
the Backlog's row shape.

The map carries the first sentence of `is:`, the `state:` line, and
the [node items](#def-node-item) and [gate items](#def-gate-item) of
`created-by:` and `modified-by:` with their [date
notes](#def-date-note). The map omits the rest of `is:`, and `spec:`,
`risks:`, `used-by:`, `formerly:` and `alias:`. The map also omits
notes other than names and dates, and sources other than those of the
date notes. The row's pointer reaches each omitted
[facet](#def-facet) in one step.

1. Open the instance. Do not open the Backlog.
2. For each entry, in file order, write one row:
   `- [<mark>] **<what>** — When: <date, source>. Status: <state>. Pointer: <link>.`
3. Mark: `x` when the derived value is `built` or `built, changing`,
   else a space. The mark says the part exists. The status says
   whether the part is changing.
4. What: the first sentence of the `is:` item, then the
   [slug](#def-slug) in parentheses.
5. When: the latest date note among the counted creating and modifying
   items, with that note's source. Without a date note, write "the
   model holds no date".
6. Status: the derived value; then each counted node with its Plan
   register stage; then `standing` and the [own
   status](#def-own-status), where the `state:` line carries them. If
   the stages give a value other than the `state:` line's, stop and
   report the difference.
7. Pointer: a link to the entry in the instance.

A date note's source is the record that dates the node's `done`. That
record is the Cost log row of the task whose acceptance moved the node
to `done`. Where the node reached `done` at a gate, the record is the
gate record in the node's plan or specification. Both records survive
the Backlog's switch to a rendering. The run journal is not a source
for a date, because the journal is never authoritative.

### The list of what is next

The list of what is next gives one item per node that is not `done`.

The list carries each node's Plan register stage and hold marker. It
carries the `used-by:` items that name the node, with their [after
qualifiers](#def-after-qualifier), and the creating nodes of each
[resource](#def-resource) the node uses, with their stages. The list
omits `is:`, `state:`, `spec:`, `risks:`, `formerly:` and `alias:`. It
also omits the `modified-by:` items no after qualifier names, and all
sources.

1. List every node whose Plan register stage is not `done`, in
   register order.
2. For each, write its identifier, its name, its stage and its hold
   marker, if any.
3. Collect the nodes it waits for. For each `used-by:` item that names
   the node, take the creating nodes of that resource and the nodes its
   after qualifier names. [Gate items](#def-gate-item), `none` and
   [outside items](#def-outside-item) add nothing. Leave out the node
   itself.
4. Classify the node by the first rule that holds.
   - `in flight`: its stage is `executing` or `verifying`.
   - `held`: it carries a hold marker.
   - `waiting on`: a node it waits for is not `done`. Name each such
     node with the resource that causes the wait.
   - `actionable`: every node it waits for is `done`.
5. For an actionable node that no `used-by:` item names, add "no
   recorded uses edge". A reader then tells an empty set from a
   satisfied one.
6. Name its next stage from the [node lifecycle](plan-model.md). For
   a `broken-down` node, the next work is its children's.

The list holds nodes only. An open Backlog entry that no node holds
stays the Backlog's own content, not a difference (P3-N007 decision
4). The list says what is next by recorded dependency. Which pair is
dispatched also depends on the approved scope, which the model does
not hold.

## The navigation bound

From any starting point, each of the five answers for any
[resource](#def-resource) in the instance is reached in at most three
steps. P3-N002's specification fixed this bound, as its decision 9,
before any child executed. The bound is stated here because that
specification will close. Only the owner changes the number or the
definitions.

A step is one of three acts:

- opening a document, by following a link or by path;
- following one link inside an open document, including a link to an
  anchor within that document;
- using the editor's find, once, for a [slug](#def-slug) inside an
  open document.

Scrolling within an open document is not a step. The starting document
is step zero. An answer is reached when the document that states it is
open at the line that states it.

A starting point is any of these documents:

- `README.md`;
- the Classification;
- the Plan register, the Backlog, the Risk register, the Ruling
  register and the Cost log;
- any plan document under `docs/plans/`, and any specification
  document under `docs/specs/`.

The run journal is not a starting point.

| Answer | Where it is stated | Worst case |
|---|---|---|
| What it is | the entry's `is:` line | 2 |
| What state it is in | the entry's `state:` line | 2 |
| What specification it must meet | the document the `spec:` line links | 3 |
| What risks attach to it | the Risk register entry the `risks:` line links | 3 |
| What it depends on, and what depends on it | the entry's edge lines | 2 |

The bound holds by construction when three structural conditions
hold. A verifier checks each by inspection.

- (i) Every starting point links the instance in its header.
- (ii) Every entry has an anchor, or a slug findable in one find.
- (iii) Every entry carries all five [facets](#def-facet) as labelled
  lines, and its `spec:` and `risks:` lines are links.

## The rules a checker applies to the instance

A checker of the instance applies the rules below. They are stated
here as text. P3-N009 adds them to the form checker and may add
others.

1. Every entry follows the entry grammar, with its lines in order.
2. Every [slug](#def-slug) and [alias](#def-alias-line) is unique
   across the instance.
3. Every item names at least one source.
4. Every node identifier resolves in the Plan register, or in a
   Backlog entry of a node whose tree was pruned.
5. Every [edge](#def-edge) in a transcribed record names a defined
   slug or an alias.
6. Every node an [after qualifier](#def-after-qualifier) names has a
   `modifies` edge on the [resource](#def-resource) the qualified edge
   uses.
7. Each written `state:` value equals its derivation.
8. No creating or modifying node of a `built` resource has an
   unchecked Backlog entry.
9. No node at `executing` or later uses a resource whose creating
   node, or a modifying node its `uses` edge names, is not `done`.
10. The rules report nothing on a tree whose Classification does not
    declare the type.

Rules 7 to 9 are P3-N002's criterion D5. Rule 8 reports a resource
whose written state and Backlog disagree. That report is the
divergence check of criterion I5.

## Slugs as a vocabulary for other registers

A [resource's](#def-resource) [slug](#def-slug) is the word other
registers cite for that part. The Cost log's field for what a rework
row reworked will cite slugs. That field belongs to P3-N004
(reversibility, and the measurement that says whether it pays), under
P3-N001's criterion I7. The assignment is recorded here so the Cost
log's prose about rework reads as an assignment, not an omission.

## Where the slice's entries differ from this grammar

The five entries P3-N006 wrote predate this grammar. P3-N008 conforms
them when it populates the instance. The differences:

- RU-016's creating item becomes a [gate item](#def-gate-item),
  `P2-N012 gate`.
- The service repository on the `used-by:` line of
  `plan-register-grammar` becomes an [outside
  item](#def-outside-item).
- The closing item of the `modified-by:` line of
  `project-orchestrator-repo` becomes a [partial
  item](#def-partial-item).
- The `project-orchestrator-repo` entry carries the `standing` item,
  as a [standing resource](#def-standing-resource).
- Node items and gate items gain [date notes](#def-date-note) where a
  record dates them.
- Each `none` item states its reason in a note.

## References

- [Plan of P3-N007](../plans/p3-n007-type-declared-amendment-drafted.md):
  its decisions, and its table of the fourteen slice findings
- [Specification of P3-N002](../specs/p3-n002-comprehension-model.md):
  child B's criteria, *The navigation bound*, I1 to I10, and *Edges
  stated at this breakdown*
- [Plan of P3-N002](../plans/p3-n002-comprehension-model.md): the two
  entities, the writer rule, the specification lifecycle
- [Instance](../project-model.md) and [slice
  record](../project-model-slice-record.md), at commit `86a1330`
- [Plan register type](plan-register.md), [plan model](plan-model.md),
  [dispatch](dispatch.md), [observability](observability.md),
  [Ruling register type](rulings.md)
- [Ruling register](../rulings.md): RU-012 (how two repositories share
  one unit of code), RU-016, RU-018, RU-021 (the planning/execution
  model is the source of progress truth)
- Methodology at v1.6.0: K-003, K-007, W-003, Article 4 (applicability,
  then precedence), Article 7, the [IR
  specification](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md)
