# Scope the report rule by audience, not by artifact

Status: draft

<!-- K-007 contract: Status transitions draft → delivered (hand-carried
     into an upstream issue or pull request, text unchanged) →
     accepted / amended / rejected, a maintainer disposition this
     document does not itself record (the originating project tracks
     that disposition in its own backlog, not here). Anything unmarked
     here is a live claim of current intent. This file is a standalone
     proposal artifact, not a plan or a specification; it is written
     to be pasted upstream as-is. -->

**To:** the maintainers of majodali/methodology.

**Amends:**
[W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
and the [style guide](https://github.com/majodali/methodology/blob/v1.4.0/docs/style.md)'s
*Reports and summaries* section. **Change:** the rule's scoping
phrases move from *what the report attaches* to *who reads it*.
**Asked of the reader:** accept the audience split, amend its wording
or its two-tier shape, or reject it and leave the rule scoped as it
stands.

## Problem statement

W-008 binds "a chat report that delivers a written artifact." Both
halves of that phrase misfire once a project runs its work through
more than one Agent session, delegated work in the vocabulary sense.

"Chat" assumes a human reader. In a delegated loop, most reports are
read by another Agent session — the one that dispatched the work —
not by the human owner. "Delivers a written artifact" excludes the
reports that most need the discipline: a decision reached without a
new document, a finding with nothing to attach, a refusal. A
delegating agent reading a delegated agent's report needs the same
index-not-narrative discipline W-008 already argues for, over a
different set of duties than a human principal needs.

This is a problem for any project whose work runs through more than
one Agent session, not only for one that happens to name its
dispatching and dispatched roles Orchestrator and Implementer, as this
project does. The fix is to scope the rule by audience — who reads
the report and what they do with it — rather than by whether the
session happens to be a chat and happens to attach a file.

## The evidencing instance

The majodali project-orchestrator project's dispatch loop
([commit `c8b4f31`](https://github.com/majodali/project-orchestrator/blob/c8b4f311a1f137f35f30fc9d5ebafda91badc088/docs/process/dispatch.md#L108-L141))
defines a fixed task-result shape every dispatched role returns to the
Orchestrator: status, the work, proposed register changes, Backlog
additions, session usage. None of those results is a chat to a human,
and several close with no written artifact at all — a `blocked`
status, a `needs-judgment` question. Every task this project's loop
has produced since 2026-08-24 has been addressed to an orchestrating
agent, not to a human reader, and none is well described by W-008's
current scoping. The instance is offered as evidence that the problem
is general, not as the shape the methodology should adopt; this
proposal does not ask the methodology to adopt the task-result fields
above.

## The change

### Target 1 — W-008

Quoted upstream text (`docs/rules/working-agreement.md`, byte-exact at
the commit named below):

> ### W-008 — Reports map their deliverables
> Applies: [C0+]
> Keywords: MUST, SHOULD
> Motivated-by: owner-raised 2026-08-30 — delivery summaries citing the delivered document by naked section number, and asks buried in prose so the owner parses both summary and document to learn what is requested
> Cites: [style guide](../style.md) (Reports and summaries); [P-004](prose.md#p-004--citations-carry-names)
>
> **Statement**: A chat report that delivers a written artifact MUST
> separate restatement from novelty and close with the asks: name the
> parts encoding decisions already made in the conversation, name the
> new parts with a pointer into the artifact and what to review there,
> and end with an explicit list of decisions and actions requested of
> the reader — or state that there are none. Any substantive report
> SHOULD follow the same structure where it fits, with no empty
> ceremony. The P- rules bind reports as their purpose admits.
>
> **Rationale**: A summary that requires reading its document defeats
> its purpose. The report is the reader's index into the artifact; the
> asks are why the report exists.

Replacement, final normative text:

```markdown
### W-008 — Reports map their deliverables
Applies: [C0+]
Keywords: MUST, SHOULD
Motivated-by: owner-raised 2026-08-30 — delivery summaries citing the delivered document by naked section number, and asks buried in prose so the owner parses both summary and document to learn what is requested; extended by project-orchestrator, 2026-09-01 — a delegated loop's reports are mostly agent-addressed and mostly attach no artifact, both outside the rule's original scoping
Cites: [style guide](../style.md) (Reports and summaries); [P-004](prose.md#p-004--citations-carry-names); [Delegation](vocabulary.md#defined-terms) and [Report audience](vocabulary.md#defined-terms) (the audience the Statement below scopes by)

**Statement**: A report's duties scope by its report audience. A
report addressed to the human owner (the principal audience) MUST
separate restatement from novelty and close with the asks: name the
parts encoding decisions already made in the conversation, name the
new parts with a pointer into the deliverable and what to review
there, and end with an explicit list of decisions and actions
requested of the reader — or state that there are none. It MUST also
lead with the outcome or the decision needed, not with the process
that produced it, and order its sections by what the reader must
decide, not by the order the writer discovered them. A report
addressed to a delegating agent (the agent audience) MUST state its
status, map its deliverable, and close with the asks or state there
are none, and MAY omit the restatement-versus-novelty split. Any
substantive report SHOULD follow the audience-appropriate structure
where it fits, with no empty ceremony. The P- rules bind reports as
their purpose admits.

**Rationale**: A summary that requires reading its document defeats
its purpose. The report is the reader's index into the deliverable;
the asks are why the report exists. Structure and order are separate
duties: a report can hold every required part and still open with its
verification process and bury the finding in its last paragraph,
which is the failure the ordering sentence above closes. Scoping by
artifact excluded the reports that most need the discipline — a
decision, a finding, a refusal, none of which necessarily attaches a
document. Scoping by "chat" assumed a human reader when most reports
in a delegated loop are agent-addressed. The restatement-versus-novelty
split exists to save a human reader's time against a document they
have not read; an agent-addressed report's reader is the one who
dispatched the work and already holds its context, so the split costs
that reader nothing it needed and this rule no longer asks for it
there.
```

### Target 2 — style guide, *Reports and summaries*

Quoted upstream text (`docs/style.md`, byte-exact at the commit named
below):

> ### Reports and summaries
>
> A chat report is governed prose. The P- rules apply to it as its
> purpose admits — named citations above all: a report about a document
> never cites that document by bare section number.
>
> A report that delivers a written artifact has three duties
> (W-008 — reports map their deliverables):
>
> 1. **Restatement**: name the parts of the artifact that encode
>    decisions already made in the conversation, and which decisions.
> 2. **Novelty**: name the parts that are new, each with a named pointer
>    into the artifact and one sentence on what to review there.
> 3. **Asks**: end with an explicit list of the decisions and actions
>    requested of the reader, or state that there are none.
>
> Any substantive report follows the same structure where it fits. Do
> not add empty sections to satisfy the shape (K-005's no-empty-ceremony
> principle applies to reports too).

Replacement, final normative text:

```markdown
### Reports and summaries

A report is governed prose regardless of who reads it. The P- rules
apply to it as its purpose admits — named citations above all: a
report about a document never cites that document by bare section
number.

A report's duties scope by its report audience
(W-008 — reports map their deliverables):

A report addressed to the human owner (the principal audience) leads
with the outcome or the decision needed, not the process that produced
it, and orders its sections by what the reader must decide, not by the
order the writer discovered them. It has three duties:

1. **Restatement**: name the parts of the deliverable that encode
   decisions already made in the conversation, and which decisions.
2. **Novelty**: name the parts that are new, each with a named pointer
   into the deliverable and one sentence on what to review there.
3. **Asks**: end with an explicit list of the decisions and actions
   requested of the reader, or state that there are none.

A report addressed to a delegating agent (the agent audience) has two
duties:

1. **Status and deliverable map**: state the report's status and map
   what it delivers, without the restatement-versus-novelty split —
   the reader dispatched the work and already holds its context.
2. **Asks**: end with an explicit list of the decisions and actions
   requested of the reader, or state that there are none.

Any substantive report follows the audience-appropriate structure
where it fits. Do not add empty sections to satisfy the shape (K-005's
no-empty-ceremony principle applies to reports too).
```

**Provenance**: quoted against majodali/methodology v1.4.0, commit
`c183427`, on 2026-09-01. Re-verify both quotes against upstream
`main` before opening the PR; either may have moved.

## The borrowed term and its fallback

This proposal uses two terms from the sibling vocabulary amendment:
**delegating agent** and **agent audience**. Every use is in the two
replacement blocks above, each on first use within its own block.

If the vocabulary amendment is rejected, substitute the fallback
phrase below wherever "a delegating agent" or "the agent audience"
appears in the replacement text, in both targets:

> another Agent session that dispatched the work and awaits this
> report before relaying its own report further

For example, W-008's second Statement sentence above stands alone as:

> A report addressed to another Agent session that dispatched the
> work and awaits this report before relaying its own report further
> MUST state its status, map its deliverable, and close with the asks
> or state there are none, and MAY omit the restatement-versus-novelty
> split.

This substitution defines nothing and cites no rejected term; it reads
correctly with or without the vocabulary amendment. This proposal's
acceptance does not depend on the vocabulary amendment's acceptance.

## Release-register entry

- **Amendment title**: Scope the report rule by audience, not by
  artifact.
- **PR**: `<PR URL — fill in when this proposal's PR is opened>`
  (placeholder; no PR exists yet).
- **Suggested by**: project-orchestrator, 2026-09-01 — its dispatch
  loop's handoff contract
  ([commit `c8b4f31`](https://github.com/majodali/project-orchestrator/blob/c8b4f311a1f137f35f30fc9d5ebafda91badc088/docs/process/dispatch.md#L108-L141))
  and every task result its loop has produced since 2026-08-24; and the
  owner's review of this proposal set the same day, which found that
  two of this project's own reporting guidelines — lead with the
  outcome or decision needed, order sections by what the reader must
  decide — belong inside this amendment's principal-audience duties
  rather than in a local contract, since W-008 fixed which parts a
  report has but was silent on their order.
- **Impact assessment** (produced from the
  [Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md),
  census 2026-08-18): all projects, C0 included — *accommodated*: the
  rule still binds only reports that exist and mints no new coverage
  duty; a project running one session at a time has no agent audience
  and every report stays principal-addressed, unchanged from today.
  methodology (`methodology-corpus`) — *accommodated*: `W-008` and
  the style guide's *Reports and summaries* section both gain the
  audience split. project-orchestrator — *accommodated*: its process
  specification can cite W-008 directly for its agent-addressed task
  results instead of holding P1-N014 (its own role-contracts node,
  currently paused for want of this fix) at `planned` (this proposal's
  evidencing instance).
- **Migration note**: none. Existing principal-addressed reports need
  no rework; the rule narrows what an agent-addressed report owes, it
  does not add an obligation to any report that already complied.
- **Independence**: this entry is independent of the other three
  amendments carried alongside it. It depends within its own text on
  terms the vocabulary amendment proposes, and carries a fallback (see
  above) that lets it stand and be adjudicated whether or not that
  amendment is accepted. Any conflict between this entry and a
  sibling's is textual, never substantive: this amendment's normative
  content does not depend on any sibling's specific wording landing
  unchanged.

## The ask

This project asks the maintainers to accept the audience split,
accept it with amendments, or reject it.

- **If accepted, or accepted with amendments**: this project adopts
  the accepted wording, resumes P1-N014 (the held node that cites this
  rule instead of restating it), and cites the amended text directly.
- **If accepted with a materially different scoping** (for example, a
  different two-tier shape than proposed here): this project re-reads
  its own conventions against whatever ships and adapts them, rather
  than treating this proposal's specific wording as binding.
- **If rejected**: this project keeps citing W-008 as scoped today and
  keeps holding P1-N014 at `planned`, adapting its own reports to the
  current rule's letter rather than diverging from it silently. It
  will not re-raise the same proposal without new evidence.
