# A minimal vocabulary for delegated agent work

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

**Amends:** [docs/vocabulary.md](https://github.com/majodali/methodology/blob/v1.4.0/docs/vocabulary.md),
*Defined terms*. **Change:** two new terms — a delegation relation
between two Agent sessions, and the report-audience distinction it
enables. **Asked of the reader:** accept the terms as scoped here,
amend their wording or scope, or reject the amendment and let each
project keep minting its own words for the same relation.

## Problem statement

The methodology already names the **Agent** role — a working session,
human or machine, that carries out a unit of work. It has no term for
the relationship formed when one Agent session dispatches bounded work
to another and later reads that session's report. Any project whose
work runs through more than one Agent session at a time needs that
relationship named: to say who a report is addressed to, who owns a
duty when a later session discovers something the first one missed,
or who is accountable for what.

Without a shared term, every such project mints its own. Divergent
local vocabulary for the same relation is exactly what
[Article 6](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-6--inclusion-every-rule-earns-its-keep)
(every rule earns its keep) exists to prevent once more than one
project needs the same word. This proposal is scoped to the two
concepts two sibling amendments actually need — the delegation
relation, and the distinction between who a report is addressed to —
not to the fuller vocabulary a delegated, multi-agent loop could
eventually want (dispatched task, context packet, handoff contract,
node-attached gate). Those stay project-specific under
[Article 7](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)
custom definitions until a second project's need makes the case for
them, the same ground this narrowing itself stands on.

## The evidencing instance

The majodali project-orchestrator project already mints four custom
terms under Article 7 for want of upstream words — *Managed project*,
*Node*, *Task*, *Approved scope* — recorded in its process
specification's *Defined terms* section
([commit `c8b4f31`](https://github.com/majodali/project-orchestrator/blob/c8b4f311a1f137f35f30fc9d5ebafda91badc088/docs/process/README.md#L19-L31)).
Two sibling amendments carried alongside this one, scoping the report
rule by audience and naming who owns contradiction-marking when
sessions nest, both need the delegation relation this proposal names.
The evidencing instance is offered as evidence that the need is real,
never as the shape the methodology must adopt: this project's own
mechanism names (dispatch, packet, handoff) are not proposed here.

## The change

Insert the following two entries into *Defined terms*, immediately
before the line quoted below, as the section's final entries.

Quoted upstream anchor (`docs/vocabulary.md`, end of *Defined terms*,
byte-exact at the commit named below):

> ## Artifact types

Insertion, final normative text:

```markdown
- **Delegation** — the relationship formed when an Agent session (the
  **delegating agent**) dispatches bounded work to another Agent
  session (the **delegated agent**) and awaits its report. The
  delegated agent reports to the delegating agent, not directly to
  the human owner, unless the delegating agent is itself the human
  owner's own direct session. Delegation nests: a delegated agent MAY
  itself act as a delegating agent to sessions it dispatches in turn.
- **Report audience** — the reader a report is addressed to under
  [W-008](rules/working-agreement.md#w-008--reports-map-their-deliverables)
  (reports map their deliverables): the human owner directly (the
  **principal audience**), or a delegating agent awaiting a delegated
  agent's report before relaying its own report further (the **agent
  audience**). The audience determines which of W-008's duties a
  report carries.

## Artifact types
```

Both terms follow the shape already used in *Defined terms* — a bold
term, an em-dash, a definition, and parenthetical citations to the
rules that use it — matching the *Project family* entry's pattern of
naming paired roles within one relation.

**Provenance**: quoted against majodali/methodology v1.4.0, commit
`c183427`, on 2026-09-01. Re-verify this quote against upstream `main`
before opening the PR; the anchor line may have moved.

## Release-register entry

- **Amendment title**: A minimal vocabulary for delegated agent work.
- **PR**: `<PR URL — fill in when this proposal's PR is opened>`
  (placeholder; no PR exists yet).
- **Suggested by**: project-orchestrator, 2026-09-01 — its process
  specification's *Defined terms* section, four custom terms minted
  under Article 7 for want of upstream words
  ([commit `c8b4f31`](https://github.com/majodali/project-orchestrator/blob/c8b4f311a1f137f35f30fc9d5ebafda91badc088/docs/process/README.md#L19-L31)).
- **Impact assessment** (produced from the
  [Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md),
  census 2026-08-18): all projects, C0 included — *accommodated*: two
  vocabulary terms add no coverage duty; a project with one Agent
  session at a time never instantiates a Delegation and cites neither
  term. methodology (`methodology-corpus`) — *accommodated*:
  `vocabulary.md` gains two entries. project-orchestrator —
  *accommodated*: its own custom-definition entries for the same
  relation become citable by name instead of held locally (this
  proposal's evidencing instance).
- **Migration note**: none. No project is required to adopt or cite
  either term; adoption is voluntary, as for any vocabulary entry that
  mints no coverage duty.
- **Independence**: this entry is independent of the other three
  amendments carried alongside it. Rejecting it does not touch the
  siblings' entries; the sibling amendment scoping the report rule by
  audience and the one naming who marks contradictions when sessions
  nest each carry a fallback phrase that lets their own text stand
  without these terms. Any conflict between this entry and a sibling's
  is textual — overlapping wording to reconcile at merge time — never
  substantive: none of the four amendments' normative content depends
  on another's specific wording landing unchanged.

## The ask

This project asks the maintainers to accept, amend, or reject these
two terms.

- **If accepted, or accepted with amendments**: the sibling
  amendments' text is read against whatever wording ships; this
  project adopts the accepted terms in its own process specification's
  citations where they now name what it already mints locally.
- **If accepted with different terms** (for example, different names
  for the two roles within Delegation): this project re-reads the
  sibling amendments against the accepted wording rather than treating
  the names proposed here as binding on the outcome.
- **If rejected**: this project keeps its own Article-7 custom terms
  for the same relation, and the two sibling amendments fall back to
  the self-contained wording each carries for exactly this case. This
  project will not re-raise the same proposal without a second
  project's evidence of need, per this proposal's own scoping
  argument.
