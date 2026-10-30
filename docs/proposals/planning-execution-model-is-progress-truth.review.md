# Review record: a declared planning/execution model is the source of progress truth

Status: open (count 1, round 2 running)

<!-- K-007 contract: Status transitions open → closed (the count's
     verdict recorded and the fixes confirmed). This file is the
     review record of the proposal beside it, under the methodology's
     IR specification (Stranger rounds) and the communication-pipeline's
     branch point v1.8, the version on that project's main when the
     count opened. -->

The text under review is [the proposal](planning-execution-model-is-progress-truth.md),
rendered by the reasoning role from
[its IR](planning-execution-model-is-progress-truth.ir.md) (node
P3-N007, task T078, commits `aadcfb9` and `94d148d`). Disposition D3:
the IR carries `Normative: yes`, so the reasoning role rendered it and
a stranger reviews it. The reasoning role for the rounds is the
Orchestrator session that accepted T078.

## Before round 1

SP-02 lint on the prose: 2 warnings, both inside the verbatim quote of
K-003 at v1.6.0 (the rule's title line at 44 words and its first
sentence at 41 words). The quote cannot change, so both stand. No
sentence of the proposal's own text is over 25 words.

Changed claims since the last round: none; this is the first round.

## Round 1, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T081). It read the
prose, wrote its restatement, then read the IR. Prose about 1,600 words
by the stranger's hand count (the HTML comment, the quoted K-003 text
and the provenance line excluded); 73 claims; 23 findings.

Restatement: matched the IR on the problem, the two terms, the clause,
the authorities, the open entries and the known limit. One mismatch:
the actor of the term ratification, which the prose gave to "the
reader" and ask A3 gives to the owner. The stranger attributed it to the
prose. It noted its restatement omitted the owner's three decisions of
2026-10-28 (C3 to C5), an omission it did not count as a mismatch.

Mismatches: A3 (prose).

Findings by rule: SP-02 8 (3, 8, 9, 11, 12, 13, 17, 22); SP-04 5 (2, 5,
10, 16, 20); SP-05 2 (6, 14); SP-09 1 (19); SP-18 3 (7, 15, 18); SP-25 1
(23); SP-26 2 (4, 21); restatement mismatch 1 (1). Undefined terms 5:
referent, slice, carrier, specification links, risk links. Contradiction
1: the migration note said the duty to rewrite checked entries is met in
the model, while the kept MUST still requires the rewrite (23).

Verdict: not readable. Blocking: 1, 2, 5, 10, 16, 20, 23.

Accepted and fixed, in the IR then the prose: 1, 2, 3, 5, 6, 7, 8, 9, 10,
11, 12, 13, 14, 16, 17, 19, 20, 21, 22, 23 (20 of 23). The fixes added
terms T15 (referent) and T16 (slice) to the IR, split C24 (C74 added)
and C45 (C75 added), reworded C69 and added C76 (inferred), and replaced
"the carrier" with the owner in the provenance line and C58. Finding 23
is fixed by stating that the re-rendering of the implementation map
rewrites the checked entries, so K-003's MUST and the migration note
can both be followed. Every fix rephrased or cut before it added; the
additions are two definitions (2, 16), two referents (5, 6), two actors
(7, 20) and one forward pointer (19).

Declined, with reasons sent to the stranger:

- 4 (SP-26): the Release-register entry is a self-contained form the
  maintainers copy, and its migration note is a required field; the
  restatement of the scope there is the form's requirement.
- 15 (SP-18): the brief's calibration, a sentence that names future
  work and assigns it to no one is not a duty.
- 18 (SP-18): the sentence states a dependency of the amendment, not a
  duty; the release is the maintainers' act under Article 8.

After the fixes: `mtool ir check` 0 violations, 0 warnings, 2
unratified terms; `mtool style` on the prose 0 violations, the same two
SP-02 warnings inside the quote; roundtrip 76 of 76 claims mapped.
Claims 76 after the fixes.

Confirmation: 15 of 20 fixes hold. Not held: 1, 2, 10, 14, 16.
Declines accepted: 2 of 3 (finding 4's decline not accepted by the
stranger; the decline stands, with its reason carried into round 2's
brief). New defects: 6 (N1 a 27-word sentence and a gate condition A3
does not state; N2 "Risk register" and "lines" undefined; N3 the count
sentence at 29 words; N4 the causal link of C45 to C75 lost; N5 "the
owner" read as two roles; N6 RU-002 unlinked).

Re-fixes before round 2, in the IR then the prose: 1 (the gate
condition cut; 17 words), 2 (the definition of referent moved ahead of
its first use), 10 and N2 ("items" for "lines"; the project's Risk
register linked), 14 and N3 (the count sentence at 24 words; C34
reworded), 16 (the slice defined at its first use in *The change* and
at the head of *The evidencing instance*), N4 (C75 and C45 joined by
"so", the form the brief exempts), N5 (the owner stated once as the one
person who owns the methodology and project-orchestrator alike; T14
reworded), N6 (RU-002 linked at first use). Checks after the re-fixes:
`mtool ir check` 0 violations, 0 warnings; `mtool style` 0 violations;
roundtrip 76 of 76.

## Before round 2

Claims check (`scripts/claims-check.mjs`, the round 1 prose as base):
13 changed claims (C15, C22, C24, C25, C29, C32, C34, C45, C58, C69
changed; C74, C75, C76 new), each carried by a sentence; 0 missing, 0
stale. The signals script does not apply before round 2 of a count
with one round recorded; it runs from round 2's `Mismatches:` line on.

Brief changes for round 2: the declined findings 4, 15 and 18 with
their reasons; the forms added for round 1 unchanged.

## Round 2, 2026-10-30

