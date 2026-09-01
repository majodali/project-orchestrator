# State K-010's converse: active documents are corrected, not marked

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
[K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable).
**Change:** the rule states its converse for documents whose
Designation is `active`. **Asked of the reader:** accept the converse,
amend it, or reject it and leave K-010 silent on the active case.

## Problem statement

K-010 exempts a register kept as history "when its header labels them
historical." It does not state the converse case: what an unmarked
passage means in a document whose Designation is `active`.

An `active` Designation is itself a declaration — [Article 4](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-4--applicability-then-precedence)
(applicability, then precedence) treats declarations as binding and
requires them to reflect actual state. Unmarked content in an
`active` document therefore asserts current intent by construction.
When a session finds a passage there that contradicts a recorded
decision, that passage is not stale in the sense K-010's marker
mechanism handles — a lapse the document itself has not declared and
is not exempt from declaring. It is false: the document's own
Designation says it is current, and it is not. A supersession marker
answers "this used to be true, and is now superseded," which is not
what a false claim in an `active` document needs said about it. The
content needs fixing, not marking.

This is a problem for any project that carries K-010's marker
mechanism and also carries documents whose Designation is `active`,
which is most projects above the C0 baseline. Without the converse
stated, a session finding false content in an active document has to
infer, case by case, whether marking is even a legitimate response —
exactly the kind of interpretive judgment a mechanical rule exists to
remove.

## The evidencing instance

The majodali project-orchestrator project's founding plan claimed a
`v1.3.0` compliance pin in its standing constraints and References
after the project's Classification had recorded `v1.4.0` since
2026-08-30 — an `active`-status document making a false current-intent
claim, found and fixed rather than marked in the same commit
([commit `c9da132`](https://github.com/majodali/project-orchestrator/commit/c9da132c0afa6f69e5b14cc8468eaf3c5c9d80c2)).
The commit's own message records the reasoning: the Classification was
authoritative and current, so both false lines were corrected rather
than marked. The instance is offered as evidence that the converse
question is real and that fixing, not marking, is the answer a live
project already reached under K-010 and K-011 read together; this
proposal does not ask the methodology to adopt this project's own
document conventions.

## The change

Quoted upstream text (`docs/rules/knowledge.md`, byte-exact at the
commit named below):

> ### K-010 — Superseded content is never silently readable
> Applies: [C0+]
> Keywords: MUST
> Motivated-by: owner-raised 2026-08-30 — decisions whose pre-decision content survived unmarked, misleading later sessions into contradictory application and persistence of the superseded state in new work
> Cites: [style guide](../style.md) (Supersession markers); [W-003](working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work) (the same-commit principle this rule extends)
>
> **Statement**: A deliverable that records a decision superseding
> existing content MUST either rework all affected content in the same
> deliverable, or record the known affected locations in the decision's
> entry and place a supersession marker (style-guide format) at each. A
> marker still standing at the next review round is an audit finding.
> Registers kept as history are exempt entry-by-entry when their header
> labels them historical.
>
> **Rationale**: A backlog entry warns in the backlog; the reader is in
> the document. The methodology's own version pin shows the working
> shape — lag is legal only when declared at the point of reading.

Replacement, final normative text:

```markdown
### K-010 — Superseded content is never silently readable
Applies: [C0+]
Keywords: MUST
Motivated-by: owner-raised 2026-08-30 — decisions whose pre-decision content survived unmarked, misleading later sessions into contradictory application and persistence of the superseded state in new work; extended by project-orchestrator, 2026-09-01 — an `active` document's own Designation already asserts its unmarked content current, so a contradiction there needs no marker to say what a marker cannot say
Cites: [style guide](../style.md) (Supersession markers); [W-003](working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work) (the same-commit principle this rule extends); [K-011](#k-011--found-contradictions-are-marked-not-routed-around) (the finder's duty this converse narrows for the active case)

**Statement**: A deliverable that records a decision superseding
existing content MUST either rework all affected content in the same
deliverable, or record the known affected locations in the decision's
entry and place a supersession marker (style-guide format) at each. A
marker still standing at the next review round is an audit finding.
In a document whose current Designation is `active`, unmarked content
asserts current intent; a passage a session finds to contradict a
recorded decision there is false, not stale, and MUST be corrected in
the deliverable that finds it, not left standing under a supersession
marker alone. Registers kept as history are exempt entry-by-entry when
their header labels them historical.

**Rationale**: A backlog entry warns in the backlog; the reader is in
the document. The methodology's own version pin shows the working
shape — lag is legal only when declared at the point of reading. An
`active` document that has not declared its own lapse makes the
opposite promise: everything unmarked there is current, by the
document's own Designation. A supersession marker means "this was true
and is now superseded"; that is not what false content in an `active`
document needs said about it, so fixing, not marking, is what keeps
the Designation's promise honest.
```

**Provenance**: quoted against majodali/methodology v1.4.0, commit
`c183427`, on 2026-09-01. Re-verify this quote against upstream `main`
before opening the PR; it may have moved.

## Dependency

This proposal borrows no term from the sibling vocabulary amendment
and depends on none of the other three amendments carried alongside
it. It is adjudicable and adoptable on its own regardless of their
disposition.

## Release-register entry

- **Amendment title**: State K-010's converse: active documents are
  corrected, not marked.
- **PR**: `<PR URL — fill in when this proposal's PR is opened>`
  (placeholder; no PR exists yet).
- **Suggested by**: project-orchestrator, 2026-09-01 — the founding
  plan's corrected `v1.3.0` claim
  ([commit `c9da132`](https://github.com/majodali/project-orchestrator/commit/c9da132c0afa6f69e5b14cc8468eaf3c5c9d80c2)),
  found and fixed during task T019, 2026-08-31.
- **Impact assessment** (produced from the
  [Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md),
  census 2026-08-18): all projects, C0 included — *accommodated*: the
  rule still binds only a deliverable that finds or records a
  supersession; it narrows which response (fix vs. mark) is legal for
  the `active` case rather than adding a new duty. methodology
  (`methodology-corpus`) — *accommodated*: `K-010` gains the converse
  sentence. project-orchestrator — *accommodated*: this project's own
  practice of fixing rather than marking `active`-document errors,
  already followed at T019, is now the upstream rule rather than a
  local inference (this proposal's evidencing instance).
- **Migration note**: none. No existing content is required to change;
  the rule states what "unmarked in an `active` document" already
  meant, and binds future findings the same way K-010 always has.
- **Independence**: this entry is independent of the other three
  amendments carried alongside it, per the *Dependency* section above.
  Rejecting or amending any sibling does not touch this entry, and any
  conflict between this entry and a sibling's is textual, never
  substantive: this amendment's normative content does not depend on
  any sibling's specific wording landing unchanged.

## The ask

This project asks the maintainers to accept the converse statement,
accept it with amendments, or reject it.

- **If accepted, or accepted with amendments**: this project adopts
  the accepted wording and cites the amended `K-010` where it already
  practices fix-not-mark on `active` documents.
- **If accepted with different wording** (for example, a different
  boundary than the `active` Designation): this project re-reads its
  own practice against whatever ships and adapts it, rather than
  treating this proposal's specific wording as binding on the outcome.
- **If rejected**: this project keeps fixing rather than marking
  contradictions it finds in its own `active` documents, as a local
  reading of K-010 and K-011 read together, and does not re-raise the
  same proposal without new evidence.
