# Cover note: the upstream batch of 2026-11-17

Status: draft (written on 2026-11-17 under task T149 of node P4-N026, Upstream proposals batch; the batch is not yet approved for carrying)

Reader: the owner, who carries the batch (RD-2 in the methodology's
[reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)),
and a fresh agent session. The reader knows this repository's README
and [the rebuild plan](../plans/rebuild.md), milestone 6, child 5.

This directory holds the one batch of proposals the rebuild sends to
majodali/methodology, with one request to majodali/methodology-tools.
Nothing here is written upstream by this project. The owner carries
each item by hand (RU-002, upstream output is hand-carried). Earlier
proposals are in [the archive](../archive/proposals/).

## What the owner is asked

1. Approve, amend or return each item at the hold on node P4-N026
   (RU-005, proposal-class nodes are owner-gated at verifying).
2. Ratify or strike one term, *criteria list*, which proposal three
   introduces.
3. Choose the order of carrying. The recommended order is below.
4. Re-verify each quote against upstream `main` before carrying it
   (RU-015). Every quote was taken on 2026-11-17, from
   majodali/methodology at commit `4c7b1dd` and from
   majodali/methodology-tools at commit `296ba46`.

## The three proposals

| | Proposal | What it asks of the methodology | Files |
|---|---|---|---|
| One | Release of the K-003 amendment | Cut release v1.7.0 from `main` as it stands. No rule changes | [prose](k-003-amendment-release.md), [IR](k-003-amendment-release.ir.md) |
| Two | A register kept as data is rendered, never hand-edited | One new rule, suggested identifier K-012, and two vocabulary edits | [prose](registers-as-data-files.md), [IR](registers-as-data-files.ir.md) |
| Three | Documents and specifications are bounded | One new rule, suggested identifier K-013, and one vocabulary row | [prose](bounded-specification-depth.md), [IR](bounded-specification-depth.ir.md) |

Each proposal carries the final normative text, the upstream text
quoted verbatim, a provenance line naming version, commit and date
(RU-015), and its intermediate representation (IR), written first
(RU-022, corpus-bound documents are written IR first).

What changed since the plan named them:

- Proposal one is no longer a proposal to amend K-003 (the Backlog is
  the single source of progress truth). That amendment was merged
  upstream on 2026-10-31 and the Release register records it accepted
  on 2026-11-02. It stands on `main`, unreleased.
  Proposal one now asks for the release, and records how the accepted
  text differs from the proposal of 2026-10-30.
- Proposal two also carries a short fix to the vocabulary row for
  planning/execution model. Without it, this project's state file, a
  data file, does not fit the form in which that row says a model is
  declared.

## The order to carry them

Recommended: two, then three, then one.

1. Carry proposal two and proposal three as two pull requests to
   majodali/methodology. Each is adjudicated on its own. Neither
   depends on the other. If both are accepted, the rule accepted
   second takes the next free identifier.
2. Then act on proposal one: cut the release. It carries the K-003
   amendment and whichever of two and three were accepted.

Why this order: this project then migrates its pin once. The rebuild's
practice is one batch and at most one migration per quarter. With
proposal two in the release, the migration declares the state file as
the planning/execution model with no deviation left.

The other order, one first: the release can be cut today, with no
adjudication. This project then migrates at once and ends the K-003
deviation. It records one new deviation, against the wording "custom
document types", until proposal two is released, and it migrates a
second time. Choose this order if adjudicating two and three will take
long.

Proposal three stands alone. Rejecting it changes nothing for one or
two.

## The request to methodology-tools

[`mtool links check` exempts text quoted from another
repository](mtool-links-quoted-text.md). It asks for a way to mark
methodology text that a document quotes verbatim, so that the link
check can exit zero over this tree. The owner added it to the batch by
the answer to decision D073 on 2026-11-17. It is independent of the
three proposals and can be carried at any time, as an issue of
majodali/methodology-tools.

## What was not done

- No stranger rounds ran on the three proposals. W-009 (the
  methodology corpus writes its deliverables IR first) asks for them
  on normative text, in the corpus. Each IR has Status `draft` and
  passes `mtool ir check` with no violation. The methodology ran its
  own rounds on the K-003 amendment after it was carried.
- The impact assessments of proposals two and three read only
  methodology, methodology-tools and project-orchestrator. The seven
  other projects with a Classification were not read.
- Nothing was written to majodali/methodology or
  majodali/methodology-tools. Both were read from read-only clones.
