# Review record: a declared planning/execution model is the source of progress truth

Status: closed (count 1 closed at the limit on 2026-10-30; the verdict at round 10 not readable; the final round's fixes confirmed; the proposal approved for carrying by the owner at node P3-N007's verifying gate on 2026-10-30, with the reworded claims and the two terms ratified; Meta-review: delivered 2026-10-30, communication-pipeline evaluation case 013)

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

Stranger: a fresh instance at the frugal tier (task T085). Prose about
2,250 words by the stranger's hand count (2,395 by tool at the round's
start); 76 claims; 14 findings.

Restatement: matched the IR on the problem, the terms, the change, the
authorities, the open entries and the asks. Two mismatches: C41's
wording ("in the slice" against the prose's "that slice"), attributed
by the stranger to the IR; and the evidence base read as "one
five-entry slice" (C31, C3 to C5), attributed to its own restatement,
sentence relied on: "The evidencing instance is that slice, pinned at
commit `86a1330`."

Mismatches: C41 (IR), C31 (own; relied on C41).

Step 6: the slice passage drew a restatement mismatch in rounds 3 and 4
(both on the sentence above). It is a prose finding whatever the
strangers attributed it to. Structural fix: the section now opens by
placing the evidencing instance among the four kinds of evidence, so a
reader meets the evidence base before the slice (C78 added, R17). Marked
`awaiting restatement`; round 5's entry states whether its restatement
matched on the passage.

Findings by rule: SP-01 4 (11 to 14); SP-03 1 (9); SP-04 3 (3, 5, 8);
SP-05 2 (6, 10); SP-25 1 (7); SP-26 1 (4); restatement mismatch 2 (1,
2). Undefined terms: whole-model list; node, the model, evidencing
instance and slice used before their links or definitions.
Contradiction 1: the unchanged referent sentence of K-003 against the
appended "instead" (7).

Verdict: not readable. Blocking: 1, 2, 7, 8.

Accepted and fixed, in the IR then the prose: 1, 3, 5 to 14 (12 of 14,
with 2 the step-6 fix). C41 reworded to the prose's reading. The
contradiction (7): a sentence in *The change* states that the appended
sentence is an exception that overrides the referent sentence where it
applies (C77, R16). "whole-model list" replaced by plain words (C22).
Four SP-01 splits, in the IR as C79 to C82. Links for node, the model,
knowledge.md and G6.

Declined: 4 (SP-26, the Workflow sentence against "no other part"),
because C11 is the owner's decision of 2026-10-29 naming that sentence
as untouched and a rendering drops no claim; C16 is the general closing
statement.

Confirmation: 12 of 13 fixes hold. Not held: 7. Declines accepted: 0 of
1. New defects: 4 (1 the override sentence read as reversing the
effect, and "the sentence before it" unnamed; 2 the forward pointer
displaced; 3 "open node" against "node not yet done"; 4 the section
opening with the evidence list before its subject).

Re-fixes before round 5, in the IR then the prose: 7 and 1 (C77 and its
sentence now quote the referent sentence and say it yields where the
exception applies); 2 (the pointer moved after the exception); 3 ("one
item per node not yet done" in both places); 4 (the step-6 fix reworded
to name the evidencing instance first, C78). The stranger's second point
under 7, that the replacement text itself keeps the unconditional
referent sentence and the override lives only in the commentary, is
not fixed here: the owner's decision 10 of the P3-N002 specification
limits the amendment to one appended clause, and the word "instead" is
the override inside the rule. The point goes to the owner at the gate.
The decline of 4 stands: a rendering drops no claim, and C11 is
decided.

## Before round 5

Claims check (the round 4 prose as base): 13 changed claims; one
reported missing (C80) until its sentence named project-orchestrator in
place of "It"; then 0 missing, 0 stale. Prose 2,494 words by tool.
Brief changes for round 5: round 4's declined finding 4 added to the declined list.

## Round 5, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T086). Prose about
2,500 words by the stranger's hand count (2,494 by tool at the round's
start); 82 claims; 10 findings.

Restatement: matched the IR on the problem, the terms, the change, the
authorities, the open entries and the asks. One mismatch, attributed by
the stranger to its own restatement: the condition "under K-003 as
released" dropped from the double-record claim (C6); sentence relied
on: "A project that keeps a planning/execution model beside a Backlog
under K-003 as released records what is done and what is next twice."

Mismatches: C6 (own).

Step-6 passage (the evidencing instance among the four kinds of
evidence, the slice): the stranger's restatement did not cover it, so
no match is recorded; the fix stays `awaiting restatement`.

Findings by rule: SP-01 1 (F2); SP-04 2 (F3, F4); SP-09 1 (F7); SP-18
2 (F8, F9); SP-25 1 (F10); SP-26 2 (F5, F6); restatement mismatch 1
(F1). Undefined terms: verification evidence and the model's two
components; Project model at first use; and, noted without a finding,
definition-by-citation form and types. Contradiction 1: "switches its
Backlog to a rendering" against open entries staying the Backlog's own
content (F10).

Verdict: not readable. Blocking: F1, F3, F4, F10.

Accepted and fixed, in the IR then the prose: F2 to F10 (9 of 10; F1
is the stranger's own). The contradiction: C80 and The ask now name
the two renderings, the implementation map and the list of what is
next, in place of "its Backlog". The model's two components defined
(C84); Project model linked at first use; C77 split (C83); C35 joined
to C34 by "So" with a relation; the limit sentence merged with its
reason; the slice's sentences reordered; node P3-N008 named as G6's
actor with its trigger (C49); the migration note's trigger stated
(C69).

Declined: none.

Confirmation: 9 of 9 fixes hold. Not held: none. Declines accepted: 0
of 0. New defects: 7 (N1 and N2 two sentences over 25 words; N3 the
plan model undefined; N4 the five-entry count twice; N5 the trigger
twice in the migration note; N6 the lower bound's premise lost with
the cut mention sentence; N7 C84 decided with no evidence).

Re-fixes before round 6, in the IR then the prose: N1 and N2 (both
sentences split); N3 (the plan model defined in place as the project's
nodes with their stages and edges); N4 ("one entry per part"); N5
("then" carries the trigger); N6 (C86 added, stating the premise, with
R19 to it); N7 (C84 cites E2, the vocabulary entry; the amendment's
reach split out as C85, proposed).

## Before round 6

Claims check (the round 5 prose as base): 3 changed claims, each
carried by a sentence; 0 missing, 0 stale. Prose 2,543 words by tool.
Brief changes for round 6: none beyond the declined list already carried.

## Round 6, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T087). Prose about
2,750 words by the stranger's hand count (2,543 by tool at the round's
start); 86 claims; 6 findings.

Restatement: matched the IR on the problem, the terms, the change, the
authorities, the open entries, the evidence and the asks. No mismatch.

Mismatches: none.

Step-6 passage (the evidencing instance among the four kinds of
evidence, the slice): matched on restatement. The structural fix of
round 4 is confirmed by restatement.

Findings by rule: SP-01 1 (6); SP-04 1 (5); SP-25 2 (1, 2); SP-26 2
(3, 4). Undefined term 1: verification evidence at first use.
Contradictions 2: the yielding sentence named only the first referent
clause while "no other document may claim that role" stood (1); the
kept title against the amended statement for a declaring project (2).

Verdict: not readable. Blocking: 1, 2, 5.

Accepted and fixed, in the IR then the prose: 1 to 6 (6 of 6). The two
contradictions are met in the commentary, not in the rule text, because
the owner's decision 10 limits the amendment to one appended clause
and keeps the title: C83 now says both referent sentences yield to the
exception where it applies, and C87 says the statement governs a
declaring project because the title is the rule's name. Whether the
amendment should instead condition the referent sentences or the title
goes to the owner at the gate, with round 4's like point. Verification
evidence glossed at first use (C12); the repeated form of the list cut;
C77 reworded to name the exception only; the eleven-differences
sentence split.

Declined: none.

After the fixes `mtool ir check` reported one violation (C86's "the
same" without a referent) and three warnings (semicolons in C78 and
C87; C49 with two clauses); all four were corrected before the
confirmation request: C86 and C87 reworded, C78 joined by "beside",
C49 split (C88 added).

Confirmation: 5 of 6 fixes hold. Not held: 3 ("that form" now pointed
at the per-part form). Declines accepted: 0 of 0. New defects: 3 (1 the
referent of "that form"; 2 the gloss of verification evidence naming a
node's work while the later use names a part; 3 "sentences" for what
K-003 joins as clauses). The stranger also records an open residual
that is the owner's: the quoted rule text keeps "no other document may
claim that role" unconditioned while the commentary says it yields.

Re-fixes before round 7, in the IR then the prose: 3 and 1 (the full
instance renders the list over the whole model in the form stated
under *What the model is authoritative for*); 2 (verification evidence
glossed as the record of whether what the node built works, C12); 3
("clauses", C77 and C83).

## Before round 7

Claims check (the round 6 prose as base): 8 changed claims, 0 missing;
C49 reported stale because its claim was shortened to the sentence the
prose already carried, an artefact as before. Prose 2587 words by tool.

## Round 7, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T088). Prose about
2,120 words of the proposal's own prose by the stranger's hand count
(2,556 by tool at the round's start); 88 claims; 15 findings as the
stranger numbered them.

Restatement: matched the IR on the problem, the clause, the terms, the
authorities, the open entries and the asks. The stranger reported six
"restatement mismatches": five are omissions of its own restatement
(the Motivated-by citation, the unaffected projects, the three items
with no authority, the owner's three decisions, the four kinds of
evidence), which are not disagreements and so not mismatches; the
sixth is a gap in the prose, the owner's gate of ask A1 present only
in the HTML comment, counted as a prose finding (6).

Mismatches: none.

Step-6 passage: not covered by this restatement (an omission), so no
match is recorded; the round 6 match stands as the confirming one.

Findings by rule: SP-01 1 (10); SP-02 2 (7, 9); SP-04 3 (11, 12, 13);
SP-18 1 (14); SP-25 1, possible (15); SP-26 1 (8); the prose gap (6).
Undefined terms 4: definition-by-citation form, Custom definitions
section, "holds" for a node's relation to an entry, and "upcoming
section" under the amendment (noted, no finding). Contradictions: none
certain; one possible (15).

Verdict: not readable. Blocking as the stranger named them: 1 to 6,
11, 12, 15; under the rule, 6, 11, 12 and 15.

Accepted and fixed, in the IR then the prose: 6 (C90 added, rendering
A1's gate in The ask), 8, 9, 10 (C86 split, C89), 11 ("holds" replaced
by "a node's plan has taken in", C35, C86), 12 (Article 7 linked at
both uses), 13 (Classification linked at first use), 14 (triggers for
both asks), 15 (C85 reworded: the appended sentence draws on the plan
model only). 13 of 15 as numbered; the five omissions are not fixes.

Declined: 7 (SP-02 on the appended sentence), because the sentence is
the proposed rule text whose shape the owner's decision 10 fixes as one
conditional sentence, and its length is the maintainers' to judge.

Confirmation: 11 of 12 fixes hold. Not held: 15 (the appended sentence
still names the whole model as referent while the fix spoke of the plan
model only). Declines accepted: 0 of 1: the stranger showed that K-003's
longest sentence runs about 21 words, so the decline's second reason was
wrong; the decline stands on decision 10 alone and the question goes to
the owner (below). New defects: 3 (1 the gate sentence at 32 words with
its parenthesis; 2 The ask opening with the gate before the ask; 3 A3
naming no timing while the prose placed the ratification at the gate),
plus a residual "also".

Re-fixes before round 8, in the IR then the prose: 15 (C85 now says the
declared model as a whole is the referent and what is done and what is
next are read from its plan model); N1 (the gate sentence split, C90 and
C91); N2 (The ask opens with the maintainers' ask, the gate follows);
N3 (A3 names the gate); the residual "also" cut.

For the owner: whether the appended sentence (29 words) is split into
two sentences, "Where the project's Classification declares a
planning/execution model, that model is the referent instead." and
"The Backlog's implementation map and list of what is next are
renderings of it.", or kept as the one conditional sentence decision
10 names. The second sentence alone loses the condition, which is why
the reasoning role did not split it; the maintainers may prefer either.

## Before round 8

Claims check (the round 7 prose as base): 0 missing, 0 stale; prose 2657 words by tool. Brief changes for
round 8: round 7's declined finding 7 added to the declined list.

## Round 8, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T089). Prose about
2,700 words by the stranger's hand count (2,567 by tool at the round's
start); 91 claims; 6 findings.

Restatement: matched the IR on the problem, the clause, the terms, the
authorities, the open entries, the asks and the evidence. Two
mismatches, both attributed by the stranger to its own restatement: the
owner's "decision" in the singular (C78) and "a count of 31 open
entries" for 31 of 139 (C31). Sentences relied on: "The other three are
the owner's decisions of 2026-10-28, the term-by-term cross-check and
the count of open Backlog entries." and "At drafting, 31 of the 139
open entries in the project-orchestrator Backlog named no node." Both
quoted sentences carry the IR's claim; under branch point v1.8, which
this count runs under, an own mismatch still counts.

Mismatches: C78 (own), C31 (own).

Step-6 passage: matched on restatement.

Findings by rule: SP-04 1 (4); SP-26 3 (3, 5, 6); restatement mismatch
2 (1, 2). Undefined term 1: upcoming section. Contradictions: none.
Three tensions noted without a finding: the whole model as referent
against the amendment saying nothing about verification evidence; an
open entry as upcoming work outside the list of what is next; the
two-components sentence reading as three items.

Verdict: not readable. Blocking: 4, and the two own mismatches under
the literal rule.

Accepted and fixed, in the IR then the prose: 3, 4, 5 (3 of 4 prose
findings), and the three tensions (C85 reworded: the model is the
referent for what is done and what is next, which its plan model holds;
C84's components parenthesized; the upcoming section defined at T5).

Declined: 6 (SP-26, "The entry is the Backlog's own content"), because
the phrase is the owner's decision wording (P3-N007 decision 4, C27);
instead the two sentences are merged into one of 25 words that keeps
the phrase.

Confirmation: 5 of 5 fixes hold, 4 in part (the amendment-case use of
"upcoming section" still without a stated meaning). Declines accepted:
1 of 1. Tensions: (c) resolved; (a) partly, (b) still a tension of low
severity. New defects: 3 (1 the merged sentence at 30 words; 2 the
referent's extent and "which"; 3 "says nothing about the verification
evidence" against "not read for that role").

Re-fixes before round 9, in the IR then the prose: 4 (the upcoming
section defined as a thing in T5, not tied to the released rule); N1
(the merged sentence split, the pronoun named); N2, N3 and (a) (C12
reads "does not reach the verification evidence"; C85 reduced to "What
is done and what is next are read from the model's plan model"; the
sentence on evidence not read for the role cut); (b) (C92 added,
inferred: such an entry is upcoming work the Backlog records and not
part of what is next until a node's plan takes it in).

## Before round 9

Claims check (the round 8 prose as base): 0 missing, 1 stale (C38, shortened to the sentence the prose kept, an artefact); prose 2674 words by tool. Brief changes for
round 9: round 8's declined finding 6 added to the declined list.

## Round 9, 2026-10-30

Stranger: a fresh instance at the frugal tier (task T090). Prose about
2,500 words by the stranger's hand count (2,578 by tool at the round's
start); 92 claims; 6 findings. The restatement ran 205 words, which the
stranger left untrimmed rather than edit after reading the IR.

Restatement: matched the IR on the problem, the clause, the terms, the
authorities, the open entries, the evidence and the asks. One mismatch,
attributed by the stranger to its own restatement: it turned "the
amendment claims no authority for three further items" into "the model
is not authoritative for" them (C25). Sentence relied on: "The
amendment claims no authority for three further items the model
carries for each part."

Mismatches: C25 (own).

Step-6 passage: matched on restatement.

Findings by rule: SP-01 1 (F4); SP-03 1 (F2); SP-04 1 (F5); SP-10 1
(F6); SP-26 1 (F3); restatement mismatch 1 (F1). Undefined term 1:
"taken in". Contradictions: none.

Verdict: not readable. Blocking: F1, F5.

Accepted and fixed, in the IR then the prose: F2 ("describes that
slice"), F3 (the duplicate exclusion cut), F4 (C92 split into two
sentences), F5 (C93 added, inferred: a node's plan takes an entry in
when the plan names the entry as work the node does).

Declined: F6 (SP-10, the owner's gate after the maintainers' ask),
because round 7's instance asked for the ask first and confirmed that
order; the section is ordered by addressee, the maintainers then the
owner, and the gate sentence states its timing ("Before the proposal is
carried").

Confirmation: 4 of 4 fixes hold (F5 with a placement defect). Declines
accepted: 1 of 1. New defects: 2 (N1 "names" in two directions; N2 the
definition of "takes in" after its first use).

Re-fixes before round 10, in the IR then the prose: N1 ("lists the
entry", C93); N2 (the definition moved before the first use).

## Before round 10

Round 10 is the limit. Under step 7 at the limit, the reasoning role
fixes the final round's findings in the IR and then in the prose, the
final round's instance confirms each fix other than a step-6 fix, and
each finding is marked confirmed or unfixed. Whatever the verdict, the
count ends at round 10 and the text is a meta-review subject.

Claims check (the round 9 prose as base): 0 missing, 0 stale; prose 2686 words by tool.

## Round 10, 2026-10-30, the limit

Stranger: a fresh instance at the frugal tier (task T091). Prose about
2,900 words by the stranger's hand count (2,585 by tool at the round's
start); 93 claims; 4 findings and one own mismatch.

Restatement: matched the IR on the problem, the clause, the terms, the
authorities, the open entries, the gate, the asks and the evidence. One
mismatch, attributed by the stranger to its own restatement: the
Motivated-by citation dropped from the change (C8, C15). Sentence relied
on: "**Change:** one conditional sentence appended to K-003's statement,
and one citation added to its Motivated-by line."

Mismatches: C8 (own).

Step-6 passage: matched on restatement.

Findings by rule: SP-04 2 (1, 2); SP-25 2 (3, 4). Undefined terms 3:
project-orchestrator (never defined for an upstream reader), stages and
edges (linked only after first use). Contradictions 2: an entry that
becomes a node without a plan taking it in would both join the list and
not be part of what is next (C92 against C29); the full instance's
rendering stated in the present while the instance is not yet built.

Verdict: not readable. Blocking: 1, 2, 3, 4.

Step 7 at the limit. Fixed in the IR then the prose: 1 (project-
orchestrator linked and named at first use), 2 (stages and edges linked
at first use), 3 (C92 and its sentence: "until it becomes a node or a
node's plan takes it in"), 4 ("When built, the full instance renders").
Declined: none. The final round's instance confirms each fix below; each
finding is then marked confirmed or unfixed.

Confirmation: 4 of 4 fixes hold. Not held: none. Declines accepted: 0
of 0. New defects: 2 (N1 a 27-word sentence; N2 the condition stated
twice). Both re-fixed and confirmed by the same instance: N1 ("in the
form stated under", 23 words), N2 (the negative form cut from the prose
and C92, the condition standing once in C29; R22 re-based on C27).
Each finding of the final round is marked confirmed; none is unfixed.

## Verdict, count 1

Round 10 was the limit. The verdict at round 10 was not readable, on
two undefined terms and two contradictions, all fixed and confirmed
after it. No round of the count returned readable. The count closes at
the limit under step 7.

Curve: findings per round 23, 19, 16, 14, 10, 6, 15 (five of them the
stranger's omissions), 6, 6, 4. Prose by tool 2,170 at round 1, 2,585
at round 10 (19 percent). Claims 73 at round 1, 93 at round 10.
Restatement mismatches by round: 1 (prose), 0, 1 own, 2 (one IR, one
own), 1 own, 0, 0 (five omissions), 2 own, 1 own, 1 own. Contradictions
by round: 1, 2, 1, 1, 1, 2, 0, 0, 0, 2. Undefined terms by round: 5, 6,
3, 1, 4, 1, 4, 1, 1, 3.

Signals, read by hand under branch point v1.8 (the signals script reads
the pipeline's record form, not this one): signal 1 fired (fixes not
held at confirmation in rounds 1, 2, 3, 4, 6 and 7); signal 2 fired (the
slice passage in rounds 3 and 4, step 6 applied in round 4 and matched
from round 6); signal 3 not computed by the script, the prose grew 19
percent against 27 percent more claims; signal 4 fired (contradictions
in rounds 6 and 10 on passages earlier fixes wrote). The count reached
the limit.

Meta-review: delivered 2026-10-30, [communication-pipeline evaluation
case 013](https://github.com/majodali/communication-pipeline/blob/main/eval/cases/013-meta-review-k003-proposal-count-1-2026-10-30.md),
from the pipeline's branch `meta-review-case-013`, pull request #26 in
majodali/communication-pipeline, its merge to `main` pending. The owner
dispatched it at the P3-N007 gate, as this record asked.

Decided claims changed by structural fixes, for the owner: none; the
step-6 fix added C78 (proposed). Decided claims reworded in the rounds,
for the owner's ratification of the new wording: C3, C8, C12, C22, C24,
C27, C28, C29, C41, C45, C49, C55, C65, C70, C72 (each listed in the
round that changed it).

Open points carried to the owner's gate: the appended sentence's
length (29 words) and whether to split it; whether the amendment should
also condition K-003's referent clauses and title, which the proposal
now says yield to the exception; the two terms list of what is next
and rendering.
