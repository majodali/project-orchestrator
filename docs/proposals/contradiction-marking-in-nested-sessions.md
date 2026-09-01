# Name whose duty marking is when sessions nest

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
[K-011 (found contradictions are marked, not routed around)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-011--found-contradictions-are-marked-not-routed-around).
**Change:** the rule states which session, among a delegation chain,
owns the marking duty. **Asked of the reader:** accept the answer,
amend it, or reject it and leave the rule silent on delegation.

## Problem statement

K-011 binds "a session" to fix or mark content it finds to contradict
a recorded decision. It does not say which session owns that duty
when one session's finding happens inside work a different session
dispatched to it — delegated work in the vocabulary sense.

Two readings are both defensible from the current text. The finding
session could own the duty directly, in its own deliverable. Or the
duty could belong to the session that dispatched the finding session,
on the theory that only the dispatching session has the authority or
the full context to decide whether a finding is real. Left unresolved,
every project running delegated work answers this question for
itself, and a role whose contract forbids it from editing files has no
stated way to discharge the duty at all — silence reads as an
exemption that K-011 does not intend.

This is a problem for any project whose work runs through more than
one Agent session, not only for one that happens to name its
dispatching and dispatched roles Orchestrator and Implementer, as this
project does. The fix names the answer once, so no project re-derives
it and no delegated role is left unable to comply.

## The evidencing instance

The majodali project-orchestrator project faced this question directly
while planning role contracts against K-011
([decision 2, adopted as defaulted at the gate](https://github.com/majodali/project-orchestrator/blob/c8b4f311a1f137f35f30fc9d5ebafda91badc088/docs/plans/p1-n014-role-contracts-adopt-v140-rules.md#L435-L442)):
the finder owns the duty, in its own commits, and a role forbidden to
edit files discharges by reporting a located finding rather than
editing. The rejected alternative — the dispatching session marks in
every case — was set aside because it would put an interpretive
judgment inside a role the project defines to make none. The instance
is offered as evidence that the question is real and answerable, never
as the shape the methodology must adopt; this proposal does not ask
for this project's own role names or report format.

## The change

Quoted upstream text (`docs/rules/knowledge.md`, byte-exact at the
commit named below):

> ### K-011 — Found contradictions are marked, not routed around
> Applies: [C0+]
> Keywords: MUST
> Motivated-by: owner-raised 2026-08-30 — the affected-locations list in a decision entry is what the decision author could see; later sessions keep finding contradictions the author missed, and routing around them silently preserves the pre-decision state
> Cites: [K-010](#k-010--superseded-content-is-never-silently-readable); [style guide](../style.md) (Supersession markers)
>
> **Statement**: A session that finds content contradicting a recorded
> decision MUST, within its own deliverable, fix the content or mark it
> with a supersession marker and add the location to the decision's
> entry. Working around unmarked stale content without marking it is
> non-compliance.
>
> **Rationale**: K-010 (superseded content is never silently readable)
> binds what the decision author knew; this rule binds what later
> readers discover. Together they close the gap that lets a superseded
> state persist in new work.

Replacement, final normative text:

```markdown
### K-011 — Found contradictions are marked, not routed around
Applies: [C0+]
Keywords: MUST
Motivated-by: owner-raised 2026-08-30 — the affected-locations list in a decision entry is what the decision author could see; later sessions keep finding contradictions the author missed, and routing around them silently preserves the pre-decision state; extended by project-orchestrator, 2026-09-01 — a delegating agent's role may forbid it from editing files, leaving the duty undischargeable unless the finding session itself owns it
Cites: [K-010](#k-010--superseded-content-is-never-silently-readable); [style guide](../style.md) (Supersession markers); [Delegation](vocabulary.md#defined-terms) (the nesting this Statement covers)

**Statement**: A session that finds content contradicting a recorded
decision MUST, within its own deliverable, fix the content or mark it
with a supersession marker and add the location to the decision's
entry. When the finding session is a delegated agent, the finding
session owns this duty, not the delegating agent that dispatched it;
nesting the delegation further does not move the duty past whichever
session made the finding. A session whose role forbids it from editing
files discharges the duty by reporting a located finding — the file,
the location, and the decision it contradicts — in its own
deliverable, for a session that can edit to act on. Working around
unmarked stale content without marking it or reporting a located
finding is non-compliance.

**Rationale**: K-010 (superseded content is never silently readable)
binds what the decision author knew; this rule binds what later
readers discover, including a delegated agent working several
dispatches away from the decision's author. Assigning the duty to the
delegating agent instead would put an interpretive judgment — whether
the finding is real — inside a role that may be defined to make none,
and would silently drop findings that a report never carries upward.
Together the three close the gap that lets a superseded state persist
in new work, at any depth of delegation.
```

**Provenance**: quoted against majodali/methodology v1.4.0, commit
`c183427`, on 2026-09-01. Re-verify this quote against upstream `main`
before opening the PR; it may have moved.

## The borrowed term and its fallback

This proposal uses one term from the sibling vocabulary amendment:
**delegated agent** (and its paired role, **delegating agent**). Both
appear in the Statement's second and third sentences above, on first
use.

If the vocabulary amendment is rejected, substitute the fallback
phrase below wherever "a delegated agent" and "the delegating agent"
appear in the replacement Statement:

> one Agent session dispatched to do bounded work by another Agent
> session

Applied, the Statement's second and third sentences stand alone as:

> When the finding session is one Agent session dispatched to do
> bounded work by another Agent session, the finding session owns this
> duty, not the session that dispatched it; nesting the dispatch
> further does not move the duty past whichever session made the
> finding.

This substitution defines nothing and cites no rejected term; it reads
correctly with or without the vocabulary amendment. This proposal's
acceptance does not depend on the vocabulary amendment's acceptance.

## Release-register entry

- **Amendment title**: Name whose duty marking is when sessions nest.
- **PR**: `<PR URL — fill in when this proposal's PR is opened>`
  (placeholder; no PR exists yet).
- **Suggested by**: project-orchestrator, 2026-09-01 — decision 2 of
  its role-contracts plan
  ([commit `c8b4f31`](https://github.com/majodali/project-orchestrator/blob/c8b4f311a1f137f35f30fc9d5ebafda91badc088/docs/plans/p1-n014-role-contracts-adopt-v140-rules.md#L435-L442)),
  adopted as defaulted at that node's gate, 2026-08-31.
- **Impact assessment** (produced from the
  [Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md),
  census 2026-08-18): all projects, C0 included — *accommodated*: the
  rule still binds only a session that makes a finding; a project
  running one session at a time has no delegation to nest and the rule
  reads exactly as it does today. methodology (`methodology-corpus`)
  — *accommodated*: `K-011` gains the nesting sentence and the
  located-finding discharge. project-orchestrator — *accommodated*:
  its process specification can cite K-011 directly for decision 2
  instead of holding P1-N014 (its own role-contracts node, currently
  paused for want of this fix) at `planned` (this proposal's
  evidencing instance).
- **Migration note**: none. A project with no delegation owes no new
  action; a project with delegation already has an answer to point at
  instead of deriving one, which is an option, not an obligation.
- **Independence**: this entry is independent of the other three
  amendments carried alongside it. It depends within its own text on
  a term the vocabulary amendment proposes, and carries a fallback
  (see above) that lets it stand and be adjudicated whether or not
  that amendment is accepted. Any conflict between this entry and a
  sibling's is textual, never substantive: this amendment's normative
  content does not depend on any sibling's specific wording landing
  unchanged.

## The ask

This project asks the maintainers to accept the finder-owns-the-duty
answer, accept it with amendments, or reject it.

- **If accepted, or accepted with amendments**: this project adopts
  the accepted wording, resumes P1-N014, and cites the amended text
  directly instead of restating decision 2 locally.
- **If accepted with a different answer** (for example, the
  dispatching session owns the duty instead): this project re-reads
  its own role contracts against whatever ships and adapts them,
  rather than treating decision 2's specific answer as binding on the
  outcome.
- **If rejected**: this project keeps decision 2 as its own local
  answer, cites K-011 as written today, and keeps holding P1-N014 at
  `planned`. It will not re-raise the same proposal without new
  evidence.
