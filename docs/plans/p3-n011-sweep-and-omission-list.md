# The sweep, the rest of the catalogue, and the omission list

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N011; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner at this node's gate (RD-2). It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), and the
[specification of node P3-N003](../specs/p3-n003-common-risk-catalogue.md),
which defines every catalogue term used here without a link of its own.

Node P3-N011 (the sweep, the rest of the catalogue, and the omission
list) is child B of node P3-N003 (the common risk catalogue)
([plan](p3-n003-common-risk-catalogue.md),
[specification](../specs/p3-n003-common-risk-catalogue.md)). The
parent specification gives this node criteria B1 to B11 under
[*Child B*](../specs/p3-n003-common-risk-catalogue.md#child-b-the-sweep-the-rest-of-the-catalogue-and-the-omission-list).
It also fixes the definitions this node applies: the
[entry test](../specs/p3-n003-common-risk-catalogue.md#the-entry-test)
ET-1 to ET-4, the
[entry shape](../specs/p3-n003-common-risk-catalogue.md#the-entry-shape),
the [class-to-instance check](../specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check)
with the refinement of its gate record, and the
[negative control](../specs/p3-n003-common-risk-catalogue.md#the-negative-control).
This plan reopens none of them. Decisions 3 to 5 below refine three,
and each says which.

The node builds on node P3-N010 (one class, carried end to end), done
2026-10-30 at task T055 (P3-N010's execute task). That node left the
[catalogue](../proposals/common-risk-catalogue.md) with one entry,
[CR-001](../proposals/common-risk-catalogue.md#cr-001) (a check that
cannot fail in the environment the code runs in), and the
[check document](../common-risk-catalogue-check.md) with a parts
enumeration of thirty parts, one run, eight omissions and eight shape
findings.

## Outcome

Every candidate in the five sources that criterion B1 (one recorded
pass per source) names is
dispositioned on the record. The catalogue holds every admitted class.
Every Risk register entry that instantiates a class cites it. The final
omission list exists for the owner to read at P3-N003's gate.

At `done`:

- The check document's sweep record holds one pass per source. Each
  pass names its method, the commit it read and its counts.
- The catalogue holds CR-001 and every class the sweep admits, each with
  all six fields. Its *What this catalogue does not yet cover* section
  lists every deferred candidate, or says there is none.
- [`docs/open-risks.md`](../open-risks.md) carries a *Class* line on
  every entry that instantiates a class, and no other change beyond
  what criterion I7 (the Risk register changed only where the node
  needs it) allows.
- The check document holds a dated run record over every class and
  every part, a non-empty omission list with a disposition per item,
  and a second negative-control record.

This node writes no intermediate representation (IR), converts no
encounter link, and proposes nothing upstream. Those are the work of
node P3-N012 (the Article 8 proposal), under its criteria C2 to C4 and
C9.

## Approach

### Three execute tasks in a fixed order

The node is one leaf run as three execute tasks on one branch (decision
1). Each task ends in a commit that passes
`node plugin/scripts/form_check.ts`. Each task reads the catalogue and
the check document as the previous task committed them.

| Task | Sources and work | Ends with |
|---|---|---|
| E1 | The Risk register pass, then the Ruling register and plans pass. Admitted classes are written into the catalogue. | Both passes recorded; the catalogue holds every class those passes admit. |
| E2 | The Backlog Completed pass, the Backlog Upcoming pass and the Cost log pass. | All five passes recorded; the catalogue complete; the check of named candidates below. |
| E3 | Citations, the parts enumeration brought current, the full run, the omission list, the negative control. | Criteria B7 to B9 met; shape findings for the full run recorded. |

The cut follows the parent plan's own suggestion, by source: Risk
register and rulings first, then Backlog and Cost log. The Risk
register runs first because it yields most of the rejections. E3 is
separate because a genuine omission needs complete citations, and the
citations need a complete catalogue.

### How the sweep is bounded and recorded

Each pass names the commit of the source it read. It states which
documents it read whole and which search phrases it ran (criterion B1).

| Pass | Read whole | Searched |
|---|---|---|
| Risk register | Every entry at E1's dispatch (criterion B2) | none needed |
| Ruling register and plans | The Ruling register; each plan's gate records | Every plan in `docs/plans/` for recorded corrections and backward transitions: `backward`, `rework`, `correction`, `stale`, `found`, `defect`. Each hit's section is read whole. |
| Backlog Completed | The Completed section | none needed |
| Backlog Upcoming | The Upcoming section | The parent plan's phrases: `missed it`, `tests missed`, `false negative`, `goes stale silently`, `found by T0`, plus those P3-N010's record lists |
| Cost log | The notes column of every row | none needed |

Specifications are not a source. B1 names plans only, and the record
says so.

A passage yields a candidate when it records something that went
wrong, or states a risk as a failure. Work items and wishes yield none.
Each candidate is the failure as its source states it. A generalization
is its own candidate row, with the generalization stated (B4).

Each candidate row carries a stable label, its source and its outcome.
Every condition ET-1 to ET-4 is answered. Rows that fail ET-1 for the
same reason may share one argument, as step 2 of the check lets one
argument cover a standing artifact class. Each such row still appears.

A failure met in a second source is recorded once, at its first pass.
A later pass cites the row and counts it as seen again, not as found.
Each pass states five counts: found, admitted, merged, rejected and
deferred.

ET-2 asks whether one upstream change could remove the failure. The
pass answers it against the methodology's rule corpus at v1.6.0. ET-4's
header is argued from the Classification of each repository where an
encounter happened. Shape finding 4 is the reason: a header that
excludes the repository holding an encounter leaves the class
inapplicable where it was evidenced.

### Candidates already named, and what each turns on

Criterion B3 requires an outcome for the eleven candidates the parent
plan names. P3-N010's record adds three. The column on the right is a
guide to where the judgment lies, not an outcome.

| Candidate as its source states it | Source | What the entry test turns on |
|---|---|---|
| A check that cannot fail in the environment the code runs in | P3-N010 | Admitted as CR-001. Listed here for B3 only. |
| Dependency search as an attack surface | [R14](../open-risks.md) (dependency search is an attack surface), 2026-09-01 | ET-2: whether an upstream rule could remove it. |
| Fetched documentation as an instruction channel | R15 (reference documentation is an instruction channel), 2026-09-01 | Whether R14's class states it too. R15 calls itself R14's sibling. |
| A diagnostic that asserts a cause it did not test | R16 (a provider's error names the wrong layer), 2026-09-04 | The header must admit the service repository, where the preflight ran. |
| The surface's own guidance contradicting the project's rule | R17 (the harness's guidance pushes against the fallback rule), 2026-09-07 | ET-2 for the stated failure, since one harness change removes it. The generalization is a separate row. |
| A register entry describing another repository goes stale silently | Backlog, 2026-09-01 | Its generalization, a copy of another document goes stale silently, is a separate row. |
| A projection becomes a second source of truth | R10 (the service becomes a second source of truth) | ET-3: the exercise was a mitigation, not a failure. Also whether it merges with the stale-copy row. |
| A tool whose runtime floor is unmet degrades silently | R13 (runtime assumption moves to `node`), [RU-013](../rulings.md) (preflight and exit loudly) | Merge with CR-001, which R13 already cites, or its own class with ET-3 failing. |
| A guard believed because it is present, not because it was broken | The drift guard of P1-N009 (plugin tooling on the portfolio stack) | P3-N010 found no failure. Merge into CR-001's mitigation, or defer. |
| A lost update on a single-writer file under parallel work | Backlog, 2026-09-17 | ET-1: concurrent agents sharing one file, or this project's dispatch loop. |
| An execution environment bills the wrong account | R7 (billing misroute) | ET-1 and ET-3: no encounter is recorded. |
| ripgrep silently dropped a file with NUL bytes from searches | Backlog, the cutover of P1-N013 (the cutover), 2026-08-30 | P3-N010 ruled it no encounter of CR-001. |
| A verification tool that silently excludes part of its input cannot fail for that part | Generalization of the row above | Admit as its own class, or merge. |
| No committed test runs the plugin tools as `node plugin/scripts/<tool>.ts` | P3-N010's step 2 arguments for parts PT-08 to PT-11, the plugin tooling | A gap, not a recorded failure. The row records it as no candidate and points to decision 3, which makes it an omission item if R13's clause does not answer it. |

E2 ends with a table that maps each row above to its sweep record row
and outcome.

### What happens to P3-N010's shape findings

The [shape findings](../common-risk-catalogue-check.md#shape-findings)
of P3-N010 are answered here, one by one.

- Finding 2, coverage cannot read adequacy: decision 3.
- Finding 4, the header decided the run: the header rule above.
- Finding 5, entries have no anchors: each encounter artifact stays a
  file link plus the quoted entry title. Child C pins the file.
- Finding 6, no counting rule for one run sequence: decision 4.
- Finding 7, an entry can instantiate a class without an encounter: no
  change. A Risk register entry may carry a *Class* line and add no
  encounter.
- Finding 8, the service repository's Backlog: decision 5.

Findings 1 and 3 changed the delivered text already.

### Citations, the run and the control (E3)

E3 writes every *Class* line before it runs the check. A *Class* clause
is written from the entry's existing text. It is never widened to cover
a pair. Where an entry instantiates two classes, it carries one line per
class. If the register's preamble reads as one line per entry, E3
amends that sentence, which I7 allows.

E3 reads `docs/open-risks.md` again at its dispatch. An entry added
since E1 is put to the entry test in E3, so the citations stay
complete.

E3 brings the parts enumeration current. Each node `done` since commit
`d1c3659` becomes a part, with its date and source. P3-N006 (the thin
end-to-end slice) and P3-N010 are two such nodes. So is each checked
Backlog entry added since that commit that delivers an artifact no part
holds. Decision 5 adds any
part from the service repository's Backlog.

The run is at full scope: every class, every part (B8). It re-runs
CR-001 rather than copying P3-N010's record, because decision 3 may
change CR-001's coverage. An omission item that matches an open Backlog
entry routes to that entry. Every other item routed to the Backlog gets
its entry in the same commit.

The negative control runs on a pair of a class other than CR-001,
where one is covered. That shows a second class's citation path can
fail.

### Concurrent writers

Other nodes may run alongside this one. P3-N007 (the type declared, the
arguments written) and P3-N013 (the four stop conditions, decidable)
are two. They share `docs/backlog.md` and may share
`docs/open-risks.md`. Each commit of this node to either file is made
against the file as it stands at that commit, and overwrites no other
node's edit (criterion B10, concurrent writes to shared registers).

## Dependencies

- P3-N010, done 2026-10-30. Its catalogue, check document and *Class*
  lines on R12 (service outage stops work) and R13 are this node's
  starting state.
- Not a dependency: P3-N002 (the comprehension model)
  ([RU-018](../rulings.md), a child is not queued behind a sibling it
  does not depend on). The enumeration stays hand-drawn. The Backlog
  entry on reading the model's parts stays open.
- T055's two asks to the owner, on CR-001's header and R13's citation.
  This node does not wait on them. E3's run reads whatever the
  catalogue and register then hold.
- Owner actions: none.

Repository reach ([RU-016](../rulings.md), the Planner declares a
node's repository access). This node reads and writes this repository.
It writes four files: the catalogue, the check document,
`docs/open-risks.md` and `docs/backlog.md`. It reads two repositories
read-only and writes nothing there.

- majodali/project-orchestrator-service, at a commit each run names.
  E3 reads its `docs/classification.md` for step 1 and its
  `docs/backlog.md` under decision 5. Any task reads a file an
  encounter cites there.
- majodali/methodology, at v1.6.0, commit `3e34829`. The passes read
  its rule corpus to answer ET-2 and Article 4's tag notation for
  ET-4.

Neither repository is new to the project, so the Orchestrator grants
both and records the grants.

## Leaf or interior

Leaf, run as the three tasks above (decision 1). The node has one
outcome, and no part of it validates alone. A sweep pass that admits a
class is not checked until the run reads the class. The run's omissions
are genuine only once every pass is done. Child nodes per source would
add register lines, plans and gates for no outcome that validates on
its own. The tasks exist because the reading does not fit one session.
P2-N016 (deploy, smoke and promote on merge to main) and
[P3-N013](p3-n013-stop-conditions-decidable.md) are the multi-task leaf
precedents. This departs from the parent specification, which says
child B is broken down by source if the sweep exceeds one session.
Decision 1 carries the departure to the owner.

## Verification

C1 profile ([profiles](../process/profiles.md)). The Implementer of
each task self-verifies against the criteria that task meets. E3
verifies the node against B1 to B11 and the additions below. No
Reviewer is dispatched unless the owner asks. The owner reads the
omission list at P3-N003's gate, under decision 14 (who verifies this
node) of the parent specification. That gate's negative control,
criterion G5 (the check is proven by breaking it, at the end), runs
against the delivered catalogue, not this node's state.

Criteria this plan adds, at the parent specification's depth:

- B12. The record dispositions each P3-N010 carry-over: the two ripgrep
  rows, the plugin-tools row, and shape findings 2, 4 to 6 and 8, each
  as this plan states.
- B13. Every admitted class's header admits each repository where one
  of its encounters happened, or the sweep record argues why not.
- B14. Each pass names the commit it read. A failure met in two sources
  has one row, and the later pass cites it.
- B15. E2 records the table that maps each named candidate to its row
  and outcome.
- B16. Each *Class* clause is written from its entry's existing text.
- B17. The negative control's pair belongs to a class other than
  CR-001, where any such pair is covered.
- B18. The check document's *Shape findings* section gains the full
  run's findings, or states "none" with the reason.

Decisions 3 to 5, once adopted, are criteria too.

## Monotonicity

No planned non-monotonicity. The node adds catalogue entries, record
sections and *Class* lines. It changes no functional test and adds no
form-check rule.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics. The owner's go-ahead adopts every default not overridden by
number. This plan opens its own sequence at 1.

Precedents checked against the [Ruling register](../rulings.md).
RU-016 is an exact match for the repository reach and decides it
silently. RU-018 is the authority for independence from P3-N002.
[RU-020](../rulings.md) (an interior node whose specification reaches
breakdown depth needs no separate `break down` task) is a near match
for decision 2. [RU-022](../rulings.md) (corpus-bound documents are
written IR first) raises no decision: the breakdown adopted on
2026-10-29 places the IR at child C, and P3-N010's decision 5 applied
the same reading. [RU-019](../rulings.md) (a measurement criterion may
be satisfied by an unfavourable result) does not apply. A control whose
pair does not return is a failed check by definition.

1. Leaf or interior.
   **Default**: leaf, run as the fixed task sequence E1 to E3, split by
   source.
   **Rationale**: one outcome with no separately validating part. The
   tasks exist for size, and P2-N016 and P3-N013 are the multi-task leaf
   precedents.
   **Affected locations**: two active documents.
   - [Specification of P3-N003](../specs/p3-n003-common-risk-catalogue.md),
     *The breakdown*, first paragraph. Replace the sentences "Child B is
     still the largest child. If its own preparation finds the sweep
     exceeds one session, it is broken down by seam, and that cut is
     recorded as a technical-structure cut (plan, *Leaf or interior*)."
     with: "Child B is still the largest child. Its plan keeps it a leaf
     and runs it as three execute tasks in a fixed order, split by
     source (plan of node P3-N011, decision 1)."
   - [Plan of P3-N003](p3-n003-common-risk-catalogue.md), *Leaf or
     interior*. Replace the sentence "Child B is nonetheless the largest
     child; if its own specification finds the sweep exceeds one
     session, it is broken down by seam (Risk register and rulings ·
     Backlog and Cost log), which is a technical-structure cut and is
     recorded as one when it happens." with: "Child B is nonetheless the
     largest child. Its own plan keeps it a leaf and splits the work by
     source across three execute tasks: Risk register and rulings, then
     Backlog and Cost log, then the run (plan of node P3-N011,
     decision 1)."
2. Whether a separate specify task runs.
   **Default**: no. The parent specification's B1 to B11, this plan's
   B12 to B18 and decisions 3 to 5 are the node's criteria. The node
   moves `planned` → `specified` at this gate, and E1 is the next
   dispatch.
   **Rationale**: the criteria are at C1 depth already. P3-N010's
   decision 1 and P3-N013's decision 2 crossed the same way, with
   RU-020 as the near match.
   **Affected locations**: none.
3. Whether a covering entry must answer the pair's step 2 argument.
   **Default**: yes. A covering entry's *Class* clause also states the
   exposure the pair's step 2 argument names. A pair whose argument
   names an exposure the clause does not state is an omission, and its
   item names that exposure. Alternative: keep the definition, and
   record the comparison in a column that changes no outcome.
   **Rationale**: shape finding 2 showed R13 covering parts PT-08 to
   PT-11 for an exposure its clause never states. Coverage by any
   citation is a check that cannot fail for the gap it should find,
   which is CR-001's own class.
   **Affected locations**: two active documents.
   - [Specification of P3-N003](../specs/p3-n003-common-risk-catalogue.md),
     *The class-to-instance check*, step 3. Append to step 3: "Refined
     at the gate of node P3-N011 (its plan's decision 3): a covering
     entry's *Class* clause also states the exposure that the pair's
     step 2 argument names. A pair whose argument names an exposure the
     clause does not state is an omission, and its item names that
     exposure."
   - [Check document](../common-risk-catalogue-check.md), *Steps*,
     step 3. Append to step 3: "A covering entry's *Class* clause also
     states the exposure that the pair's step 2 argument names. A pair
     whose argument names an exposure the clause does not state is an
     omission, and its item names that exposure. *Refinement, decision
     3 of the plan of node P3-N011.*"
4. How defects found in one run sequence are counted.
   **Default**: defects found by one sequence of runs of the same check
   or pipeline, up to its first passing run, count as one encounter.
   E1 adds this sentence to the catalogue's definition of an
   [independent encounter](../proposals/common-risk-catalogue.md#def-independent-encounter).
   **Rationale**: shape finding 6 found the choice open. P3-N010 counted
   the four deploy defects of P2-N012 (deploy the service from CI on
   merge) once, the lower count, and the rule
   makes that count mechanical.
   **Affected locations**: none. The rule applies the ratified
   definition and contradicts no text.
5. Whether the parts enumeration reads the service repository's
   Backlog.
   **Default**: yes, read-only at the commit the run names. A checked
   service entry becomes a part only when it delivers an artifact no
   existing part holds, and it is added with its date and source.
   **Rationale**: step 1 already reads that repository's Classification.
   The classes this node adds, such as a stale copy, may reach service
   text that no node part names. The read costs one file.
   **Affected locations**: two active documents.
   - [Specification of P3-N003](../specs/p3-n003-common-risk-catalogue.md),
     *The class-to-instance check*, the third input. Replace the bullet
     beginning "The **parts enumeration**" with: "- The **parts
     enumeration**: the committed list of parts of this project, drawn
     from every checked entry of this repository's Backlog and of the
     service repository's Backlog, wherever it sits, the Plan register's
     `done` nodes, and a stated list of standing artifact classes (plan
     decision 3, refined at the gates of nodes P3-N010 and P3-N011)."
   - [Check document](../common-risk-catalogue-check.md), *Inputs*.
     Insert after the paragraph ending "The specification reads the
     Backlog's Completed section only.": "The checked entries of the
     service repository's Backlog are read too, at the commit the run
     names. A service entry becomes a part only when it delivers an
     artifact no existing part holds. *Refinement, decision 5 of the
     plan of node P3-N011.*"

## Backlog additions

- [ ] **A leaf may need several execute tasks, and `plan-model.md`
  says one session** — When: 2026-10-30, planning P3-N011. Status:
  open, for node P1-N016 (process spec maintenance); three leaves now
  run as fixed task sequences (P2-N016, P3-N013, P3-N011). Pointer:
  [this plan](p3-n011-sweep-and-omission-list.md), *Leaf or interior*.

## References

- [p3-n003-common-risk-catalogue](p3-n003-common-risk-catalogue.md)
  and its [specification](../specs/p3-n003-common-risk-catalogue.md):
  the parent, criteria B1 to B11, the definitions and the gate record
- [p3-n010-one-class-end-to-end](p3-n010-one-class-end-to-end.md): the
  shape precedent, and decisions 1 to 5 adopted 2026-10-30
- [Check document](../common-risk-catalogue-check.md) and
  [catalogue](../proposals/common-risk-catalogue.md): this node's
  starting state
- [Risk register](../open-risks.md), [Backlog](../backlog.md),
  [Cost log](../cost-log.md), [Ruling register](../rulings.md): four of
  the five sources
- [p3-n013-stop-conditions-decidable](p3-n013-stop-conditions-decidable.md):
  the multi-task leaf precedent
- [plan-model](../process/plan-model.md),
  [profiles](../process/profiles.md), [dispatch](../process/dispatch.md)
- methodology 1.6.0: Constitution Article 4 (applicability, then
  precedence) for ET-4, and Article 8 (amendments, versions, and
  migration), the process child C proposes through
