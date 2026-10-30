# Review record: a declared planning/execution model is the source of progress truth

Status: open (count 1, round 4 running)

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

Stranger: a fresh instance at the frugal tier (task T082). Prose about
2,200 words by the stranger's hand count (2,170 by tool before the
round's fixes); 76 claims; 19 findings.

Restatement: matched the IR on the problem, the clause, the authorities,
the open entries, the limit, the evidence and the asks. The stranger
checked each sentence against the claims it names and found no
disagreement.

Mismatches: none.

Findings by rule: SP-01 1 (18); SP-02 7 (11 to 17); SP-03 2 (7, 8);
SP-04 2 (3, 4); SP-05 2 (5, 6); SP-08 1 (9); SP-18 1 (10); SP-25 2 (1,
2); SP-26 1 (19). Undefined terms 6: full instance, implicit-C0, tier,
IR (in the body), pilot, status truth. Contradictions 2: the list's
definition (every upcoming entry) against "nodes only" (1); the rule of
one item per open node against the slice's empty list (2).

Verdict: not readable. Blocking: 1, 2, 3, 4, 5.

Accepted and fixed, in the IR then the prose: 1 to 18 (18 of 19). The
two contradictions: T5, C27 and C28 now say the list is the Backlog's
answer to what is next, rendered from the model and holding nodes only
under the amendment, with open entries that name no node outside the
rendered list; C45 now says the slice record rendered per-part lists,
the open nodes with an edge to the part, and the whole-model list is
the form the full instance renders. Terms added: full instance (T17);
the IR named and linked in the Reader paragraph; implicit C0 and
criticality tier linked to Article 7 and the vocabulary; the pilot and
the roadmap linked at pinned commits. Seven sentences over 25 words
split or cut. The heading "Dependency" renamed. C69 gains its actor,
the project.

Declined: 19 (SP-26, the front-matter line "Asked of the reader" and
the section "The ask"), because the four bold front-matter lines are the
fixed opening of a proposal artifact carried upstream, and the section
states the ask with its three outcomes. The stranger did not accept the
decline at confirmation; the decline stands and goes into round 3's
brief.

Confirmation: 17 of 18 fixes hold. Not held: 17. Declines accepted: 0
of 1. New defects: 6 (A two lists without a stated relation; B "projects
with no Classification" beyond what E10 shows; C the roadmap link
unpinned and the pilot's gloss unsupported; D a repeated parenthetical;
E the full instance defined inside the slice's term and P3-N008 named
only in a parenthetical; F the list's first sentence unqualified).

Re-fixes before round 3, in the IR then the prose: 17 and D (the
parenthetical cut; 24 words); A (the slice record's per-part form named
as narrower, and the whole-model list named as the full instance's
form; C45, C49); B (the thirteen rows the Portfolio register marks
implicit C0; C65); C (the roadmap pinned at 195eba9; the pilot linked
to the service plan at 198768a, its gloss cut; C62); E (T17 full
instance as its own term, P3-N008 linked, "is planned to build it"); F
(T5 opens "the Backlog's answer to what is next"). Checks after the
re-fixes: `mtool ir check` 0 violations, 0 warnings; `mtool style` 0
violations; roundtrip 76 of 76. Prose 2,410 words by tool.

## Before round 3

Claims check (the round 2 prose as base): 9 changed claims, each
carried by a changed sentence; 0 missing, 0 stale after C22's sentence
was reworded to carry the whole-model qualifier.

Brief changes for round 3: the declined findings of rounds 1 and 2
(round 1's 4, 15 and 18; round 2's 19) with their reasons.

## Round 3, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T084). Prose about
2,650 words by the stranger's hand count (2,410 by tool at the round's
start); 76 claims; 16 findings.

Restatement: matched the IR on the problem, the clause, the
authorities, the open entries, the terms, the dependency and the asks.
One mismatch, attributed by the stranger to its own restatement: it
read the evidence as "one slice", where the IR also rests on the
owner's decisions, the cross-check and the Backlog count. Sentence
relied on: "The evidencing instance is that slice, pinned at commit
`86a1330`."

Mismatches: C41 (own).

Findings by rule: SP-01 2 (13, 16); SP-02 2 (10, 11); SP-03 1 (12);
SP-04 3 (4, 6, 7); SP-05 1 (9); SP-25 1 (2); SP-26 5 (3, 5, 8, 14, 15);
restatement mismatch 1 (1). Undefined terms 3: node, Project model,
stage (each first used before its link). Contradiction 1: the Change
line named one sentence while the body also changed the Motivated-by
line (2).

Verdict: not readable. Blocking: 1, 2, 4, 6, 7.

Accepted and fixed, in the IR then the prose: 2 to 13, 15, 16 (15 of
16). The contradiction: C8 and the Change line now name the sentence
and the citation. The three terms are linked at first use; the slice's
definition is stated once; three repeated claims cut; two sentences
over 25 words shortened; two SP-01 splits; the "it" of P3-N008's
sentence named.

Declined: 14 (SP-26, the project-orchestrator impact bullet against
The ask), because the Release-register entry is a self-contained form
whose impact assessment states each project's situation on its own, the
reason that declined round 1's finding 4.

Confirmation: 14 of 15 fixes hold. Not held: 7 (held in part; the
appositive "its place in the node lifecycle" was new and undefined).
Declines accepted: 1 of 1. New defects: 4 (1 "It" with an ambiguous
referent; 2 and 3 the appositive, undefined and absent from C18; 4 the
one-citation change stated in the Change line, C8's sentence and C15's
paragraph, low confidence).

Re-fixes before round 4, in the prose: 7, 2 and 3 (the appositive cut;
"stage" linked to the plan model's node lifecycle section, the anchor
verified); 1 ("The entry is the Backlog's own content"). New defect 4
declined: the Change line is the front-matter form, and C8 and C15 are
distinct claims, the change in sum and the Motivated-by detail.

## Before round 4

Claims check (the round 3 prose as base): 6 changed claims, each
carried by a sentence; 0 missing, 0 stale. Prose 2,395 words by tool.
Brief changes for round 4: round 3's declined finding 14 added to the
declined list.

## Round 4, 2026-10-30

