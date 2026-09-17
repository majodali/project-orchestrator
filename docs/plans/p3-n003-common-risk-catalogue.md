# The common risk catalogue

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N003; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node **P3-N003**, chunk 2 of **P3-N001**
([comprehension-and-continuous-implementation](comprehension-and-continuous-implementation.md)),
whose [specification](../specs/p3-n001-comprehension-and-continuous-implementation.md)
gives this node criteria **G7** and **P4** and four additions its
breakdown names. **Independent of P3-N002**
([RU-018](../rulings.md)): nothing below needs the comprehension model
to exist, and the *Independence* section states what was checked.

Outcome under development: a **populated register of risk classes that
every managed project must mitigate directly**, drafted in this
repository, maintained at the methodology level so projects inherit it,
with additions proposed through the Article 8 process. Every entry names
the real encounter it came from, with a date and an artifact. The
catalogue is applied back to this project by a check that produces a
list of genuine omissions the owner reads at the gate.

## Why this node exists, and what it is not

It is the only one of P3-N001's four mitigations that makes failure
**less likely** rather than merely cheaper. The other three — a gate
rate each project controls, reversibility, dependencies that let blocked
work stop without stopping everything — reduce exposure and speed
recovery. None of them reduces the chance of the defect. A catalogue
does, because it turns "we did not think of that" into "we did not apply
a mitigation the catalogue names".

**It is not this project's Risk register renamed.** The entry test:
a risk **recurs across projects and must be mitigated by each**, rather
than being tracked by one. [R1](../open-risks.md) (dispatch
oscillation) is tracked by this project and mitigated by this project's
own spec; a project that does not run the orchestration loop cannot
mitigate it and should not be asked to. [R14](../open-risks.md)
(dependency search as an attack surface) is the opposite: every project
that lets an agent choose a package meets it, and each must mitigate it
itself.

**Populate first, propose second** — the owner's settlement of the
parent plan's open question 3, 2026-09-17. The deliverable is a filled
catalogue; the Article 8 proposal follows it. An empty register would
get the shape agreed cheaply, and this project's evidence is unusually
good, so the catalogue argues from it.

## What this chunk must prove

Four things, in order of how much they are in doubt.

1. **That the entry test has teeth.** A test that admits everything is
   not a test. The node states it, applies it to every candidate, and
   records at least one candidate **rejected in writing** with the
   reason. Rejections are the evidence; admissions are the output.
2. **That the class-to-instance check can find something.** G7 requires
   a list of **genuine omissions** — parts of this project with no entry
   citing a catalogue class that applies to them. *A check that returns
   an empty list on this project's own history is evidence the check
   does not work, not evidence the project is safe.* This is the hardest
   part of the node and the *Approach* below designs against it
   specifically.
3. **That every entry is evidenced.** A date, an artifact, and a
   recorded encounter, per entry. The catalogue's whole argument
   upstream is that it was assembled from injuries rather than from
   imagination, and one unevidenced entry weakens every evidenced one
   beside it.
4. **That execution-environment coverage is present** — the class the
   parent plan admitted nothing covered, and the one with four
   independent instances here. This is the thin slice, for that reason.

Everything else in the chunk — drafting prose, the RU-015 delivery form,
the Risk register edits — is ordinary work whose risk is cost, not
feasibility.

## The raw material, and how it gets swept

The parent plan lists candidates, each a real encounter:

| Candidate class | Encounter |
|---|---|
| A check that cannot fail in the environment the code runs in | Four: `node -e` running CommonJS so an ESM defect passed; Vitest's module runner doing the same; an in-memory DynamoDB backend that never validated a condition expression; a bundle guard proven only by breaking it deliberately |
| Dependency search as an attack surface | [R14](../open-risks.md), T027, 2026-09-01 |
| Fetched documentation as an instruction channel | [R15](../open-risks.md), T030, 2026-09-01 |
| A diagnostic that asserts a cause it did not test | [R16](../open-risks.md), 2026-09-04 |
| The surface's own guidance contradicting the project's rule | [R17](../open-risks.md), 2026-09-07 |
| A register entry describing another repository, going stale silently | [Backlog](../backlog.md), T031, 2026-09-01 |

**That list is a starting point found by one person reading one plan,
not a survey.** The node's populate stage runs a stated sweep over five
seams, and records for each seam what it found, what it admitted, and
what it rejected:

- **The Risk register**, [R1–R17](../open-risks.md) — every entry put to
  the entry test, admitted or rejected on the record. This seam also
  produces most of the rejections, which is why it runs first.
- **The Backlog's Completed section** — the project's own post-mortems.
  The document calls itself the implementation map; it is also the
  defect map. The recurring phrasings are searchable seams in their own
  right: *why N tests missed it*, *false negative*, *goes stale
  silently*, *found by T0nn while*.
- **The Backlog's Upcoming section** — open defects and the classes
  behind them, including the one this task itself ran under: parallel
  dispatch colliding with a single-writer file, found 2026-09-17.
- **The Cost log's notes column** — the under-read seam. One row per
  accepted task, and the notes say what actually went wrong task by
  task. Nothing has ever read it for classes.
- **The Ruling register and the plan documents** — rulings whose
  rationale names a failure mode ([RU-013](../rulings.md),
  [RU-014](../rulings.md), [RU-015](../rulings.md)), and the plans' own
  recorded corrections and backward transitions.

Candidates already visible in those seams and not in the parent plan's
list: a projection becoming a second source of truth
([R10](../open-risks.md)); a tool whose runtime floor is unmet degrading
silently ([R13](../open-risks.md), [RU-013](../rulings.md)); a guard
believed because it is present rather than because it was broken
(P1-N009's drift guard); a lost update on a single-writer file under
parallel work (2026-09-17); an execution environment that bills the
wrong account ([R7](../open-risks.md)). Each is a candidate for the
test, not an entry — the sweep decides, in writing.

## Approach

### The entry shape

Each entry carries: a stable ID (`CR-001…`), the class stated as the
failure rather than as the remedy, an **applicability header**, the
mitigation every project in scope must apply directly, and the
**encounters** — date, artifact, and one sentence of what happened.

The applicability header reuses the methodology's existing grammar,
the one `Q-004` demonstrates upstream (`[C2+] [type: web-app,
backend-service]`). It earns its keep twice. It makes "every project
must mitigate directly" precise instead of aspirational, and it is what
lets the omission check below be **falsifiable**: a class with no
applicability rule cannot be shown to be missing from anywhere, because
it applies everywhere and nowhere equally.

Entries are drafted **only from encounters this project actually had**
(decision 8). A class known from elsewhere but unencountered here is
recorded in a closing *What this catalogue does not yet cover* section
as a candidate for another project to evidence, never asserted as an
entry.

### Where the catalogue lives, and in what form

One copy, at **`docs/proposals/common-risk-catalogue.md`**, in
[RU-015](../rulings.md)'s delivery form from the start: final normative
text, the current upstream text quoted verbatim beside it, and a
provenance line naming the version, commit and date the quote was taken.
`docs/proposals/` is this project's existing home for upstream-bound
work, and populate-first means the populated catalogue **is** the
proposal's payload.

There is no second, local copy. A local copy would duplicate the
catalogue's own class *a copy of another document's content goes stale
silently* on the day the catalogue was written, which is not an argument
this node can afford to lose. This repository's Risk register cites the
draft by relative link; when the amendment is accepted upstream, the
citations re-point and this file closes — stated in the file's own K-007
contract comment (decision 1).

### The class-to-instance check, designed so it can fail

G7's check is the node's real engineering, and its trap is a check
that returns nothing. Four design commitments answer it.

**What "a part of this project" means, without the comprehension
model.** The check needs an enumeration of parts, and P3-N002 is not
available to supply one. It is drawn instead from documents that exist
today: the **Backlog's Completed section** (which calls itself the
implementation map), the **Plan register's `done` nodes**, and a short
stated list of standing artifact classes — the process specification,
the plugin tooling, the registers themselves, the deployed service's
surface as recorded here. The enumeration is written down and committed
with the check, so a reader can dispute a part's presence or absence.
This is the same material a comprehension-model instance would later be
populated from (the parent specification's **G1** requires derivation
from existing documents), so the check does not have to be rebuilt when
P3-N002 lands.

**Applicability is argued per class, not assumed.** For each class, the
check states which parts it applies to and why. An omission is a part
the class applies to, with no Risk register entry citing that class. A
list produced this way is disputable entry by entry, which is what makes
it worth the owner's reading time.

**The citations are complete before the check runs.** G7 asks for at
least one Risk register entry rewritten to cite its class. One is not
enough to measure against: with a single citation the check reports
near-total omission and says nothing. So **every** Risk register entry
that instantiates a catalogue class gets its citation (decision 9) —
at most seventeen small edits — and the omissions the check then finds
are real gaps rather than unfinished bookkeeping.

**The check is proven by breaking it.** A negative control: a known
citation is removed on a scratch branch, the check is run, and it names
the part it was supposed to name. This project has the precedent —
P1-N009's drift guard was accepted only because it was proven by
breaking it rather than by being present — and a check for
checks-that-cannot-fail that was never observed failing would be the
funniest possible instance of its own first entry.

The check is a **documented procedure run by hand and recorded**, not a
form-checker rule (decision 4). Applicability is a judgment; mechanizing
a judgment produces a tool that asserts a cause it did not test, which
is catalogue class R16 and not a thing to ship inside this node.

### What happens to the omissions

They are listed, and each is dispositioned: mitigated here where the
mitigation is already in hand, accepted with a written reason, or routed
to the Backlog as discovered scope (decision 5). The node does not
undertake to close every omission it finds. Naming them is the
deliverable; closing them is the work the naming makes possible.

## Independence from P3-N002

[RU-018](../rulings.md)'s first exercise, so the check is stated rather
than assumed. **No dependency was found.** Three places one could hide:

- **G7's class-to-instance citation.** Works against today's Risk
  register, unchanged — an entry gains a citation line. No model needed.
- **The enumeration of "parts".** Supplied from the Backlog, the Plan
  register and a stated artifact list, as above. This is the one place a
  dependency could have been absorbed quietly, and it is the reason the
  enumeration is written down and committed rather than assembled in a
  role's head.
- **Risks attaching to what they threaten.** The parent plan's register
  review says a risk attaches to a component once a model exists. That
  is chunk 1's improvement, not this node's requirement: the catalogue
  is a register of classes, and a class attaches to a project, not to a
  component.

Forward compatibility, recorded as a Backlog item rather than as a
dependency: when P3-N002 lands, the omission check can run over the
model's parts instead of the hand enumeration, and should.

## Dependencies

- **Repository reach ([RU-016](../rulings.md)).** **This repository
  only**, read and write. Every entry's encounter is already recorded
  here, in the Risk register, the Backlog, the Cost log or a plan
  document, including the encounters that happened in the service
  repository. Contingency, named so it is not discovered late: if a
  candidate class turns out to be evidenced only in
  `majodali/project-orchestrator-service`, that repository is in this
  project's permanent approved scope under RU-016 and may be read
  read-only, with the widening recorded in the Cost log and the journal.
  No work is written there. (This bullet is the plan-level declaration
  RU-016 requires; it sits in *Dependencies* following
  [p2-n012](p2-n012-deploy-from-ci-on-merge.md)'s precedent, because no
  process document yet names the section a plan carries for this — a
  gap the Backlog already owns, bound for P1-N016.)
- **P3-N001 specified and broken down** (done, 2026-09-17). G7, P4 and
  the four additions bind this node.
- **Owner action, one only: O1 — hand-carry the proposal upstream**
  ([RU-002](../rulings.md)). It falls **after** the node is complete:
  the node completes at the artifact, not at upstream disposition
  ([RU-003](../rulings.md)). Nothing in the node waits on it.
- **Not** a dependency: **P3-N002**. See *Independence* above.
- **Not** a dependency: P3-N005's upstream half. Both nodes may produce
  an Article 8 proposal, and the owner may carry them together; neither
  waits for the other (decision 7).

## Leaf or interior

**Interior.** Weighed honestly, because a populated catalogue and a
proposal could plausibly be one chunk. Three things push it over:

- The sweep is large — the Backlog alone is 2,263 lines, the Cost log
  has never been read for this, and the Risk register's seventeen
  entries each need the entry test applied on the record.
- The entry shape is the node's structural risk. A shape that survives
  one class and fails on the fifth wastes the four in between, which is
  exactly [R8](../open-risks.md)'s failure mode and exactly what the
  plan-model's thin-slice-first guidance exists for.
- The upstream proposal is a different artifact class with a different
  audience, a different form ([RU-015](../rulings.md)) and a different
  gate ([RU-005](../rulings.md), at `verifying`). It must not start
  before the catalogue is settled, and the catalogue's gate should not
  be held hostage to its drafting.

The cut is feature-first in the sense the
[plan-model](../process/plan-model.md) means: the behaviors that must
validate are *a class is named with evidence*, *an omission is found*,
and *an amendment is proposed*. The first two are carried together by
child A on one class and by child B on all of them.

**One cut weighed and rejected**, recorded because it was close: a
fourth child holding the check at full scope. After child A proves the
procedure and the negative control, running it over more classes is the
same mechanism with more content, and no sub-behavior validates
separately — so it folds into child B. Child B is nonetheless the
largest child; if its own specification finds the sweep exceeds one
session, it is broken down by seam (Risk register and rulings · Backlog
and Cost log), which is a technical-structure cut and is recorded as one
when it happens.

### Proposed children, in dependency order

IDs are the Orchestrator's to issue. The specification gate fixes them
([RU-020](../rulings.md) applies if this document's depth carries).

**Child A — One class, carried end to end.** The thin slice, and
deliberately the class with the most evidence: *a check that cannot fail
in the environment the code runs in* — the execution-environment
coverage the parent specification requires. Deliverable: the catalogue
document at its chosen path with **one** entry in it; the entry shape,
including the applicability header and the encounter records for all
four instances; the entry test written and applied to this class and to
at least one rejected candidate; the corresponding Risk register entries
rewritten to cite it; and the omission check defined, run for this one
class, and proven by the negative control. Criteria: the entry names
four encounters, each with a date and an artifact resolvable in this
repository; the entry test's application is written out for the admitted
class and for the rejected candidate; the check produces a non-empty,
per-item-argued omission list for this class alone, or states in writing
why an empty one is correct here; the negative control names the part it
was meant to name. What this child exists to catch: an entry shape that
looks right until the check tries to read it.

**Child B — The sweep, the rest of the catalogue, and the omission
list.** Deliverable: the five seams swept by the stated method, every
candidate dispositioned on the record, the catalogue populated, every
Risk register entry that instantiates a class carrying its citation, and
the class-to-instance check re-run at full scope to produce the omission
list the owner reads at the gate, each item with its disposition.
Criteria: every seam has a recorded pass with counts of found, admitted
and rejected; every entry carries at least one encounter with a date and
an artifact; at least one candidate is rejected in writing, with the
entry test's reasoning (the Risk register seam is expected to produce
several); the omission list is non-empty and each item names the part,
the class, and why the class applies; the negative control is re-run
against the finished catalogue. Depends on child A.

**Child C — The Article 8 proposal.** Deliverable: the catalogue
delivered as an amendment proposal in [RU-015](../rulings.md)'s form —
final normative text, the current upstream text quoted verbatim, a
provenance line naming version, commit and date, and an instruction to
re-verify before carrying — plus a cover note in the shape the
[delegated-work amendments](../proposals/delegated-work-amendments-cover-note.md)
used: what is asked of the reader, the evidencing instance, and what
this project does under accept, amend and reject. Criteria: the
provenance line resolves; the quoted upstream text is byte-exact at the
named commit; the ask is stated as accept / amend / reject with this
project's response to each; no patch file anywhere.
[RU-002](../rulings.md) (the owner hand-carries it),
[RU-003](../rulings.md) (the node completes at the artifact) and
[RU-005](../rulings.md) (owner-gated at `verifying`) all apply and are
not re-raised as decisions. Depends on child B.

## Verification criteria for this node

Plan-stage statement; the specification refines it into the checkable
form that governs verification. The chunk is complete when:

1. The catalogue exists in this repository, **populated**, every entry
   naming the real encounter it came from with a date and an artifact
   that resolves (parent addition i).
2. The entry test is **stated and applied**, and at least one candidate
   is **rejected by it in writing** with the reasoning shown (parent
   addition ii).
3. **Execution-environment coverage is present** as an entry with its
   four instances (parent addition iv).
4. At least one Risk register entry cites the catalogue class it
   instantiates, and in fact every entry that instantiates a catalogued
   class does (**G7**, decision 9).
5. The class-to-instance check is documented, run, and produces a list
   of **genuine omissions** with each item's part, class and
   applicability argument — and the check is **proven by breaking it**
   (**G7**, parent addition iii).
6. Each omission carries a disposition: mitigated, accepted with a
   reason, or routed to the Backlog.
7. The upstream proposal exists in **RU-015's delivery form** with a
   resolving provenance line, and the node is complete at that artifact
   (**P4**, RU-002, RU-003).
8. No catalogue entry rests on anything but a recorded encounter of this
   project's; classes known from elsewhere are listed as not-yet-covered
   rather than asserted.
9. `node plugin/scripts/form_check.ts` passes clean, the Backlog moved
   in the same commits as the work (W-003), and the Plan register and
   Backlog stage designations agree.

Criterion 5 is the owner-facing one. The rest are the conditions that
make it mean something.

## Monotonicity

**No planned non-monotonicity is proposed.** Nothing here rewrites a
previously defined functional test. The Risk register edits are
documentation; the check is a documented procedure, not a change to
`form_check.ts`'s rules; if the mechanization filed under decision 4 is
ever taken up, it adds rules rather than rewriting recorded
expectations. Should a rewrite prove necessary, it returns to the owner
under W-002 before any test changes, never absorbed mid-execution.

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics; the owner's go-ahead adopts every default not overridden by
number. This document opens its own sequence at 1, as a child plan's
gate is not the parent's.

**Precedents checked against the [Ruling register](../rulings.md).**
Four active rulings are exact matches and decide silently rather than
being re-raised: **RU-002** (the owner hand-carries upstream-bound
output), **RU-003** (the node completes at the artifact, not at upstream
disposition), **RU-005** (proposal-class nodes are owner-gated at
`verifying`) and **RU-015** (the delivery form). **RU-016** is the
authority for the repository-reach declaration, **RU-018** for the
independence from P3-N002, and **RU-010** governs how this work reaches
`main`.

1. **Where the catalogue lives, and its entry IDs.** Default:
   **`docs/proposals/common-risk-catalogue.md`**, entries `CR-001…`, in
   RU-015's delivery form from the first commit, with **no second local
   copy**; the Risk register cites it by relative link. Rationale:
   populate-first makes the populated catalogue the proposal's payload,
   `docs/proposals/` is the existing home for upstream-bound work, and a
   duplicate copy would instantiate one of the catalogue's own classes
   on the day it was written.
2. **Whether entries carry an applicability header.** Default: **yes**,
   reusing the methodology's existing header grammar (`Q-004`'s
   `[C2+] [type: …]`). Rationale: it makes "every project must mitigate
   directly" precise, it lets a project show a class does not apply
   rather than silently ignoring it, and it is what makes the omission
   check falsifiable.
3. **What "a part of this project" means for the omission check.**
   Default: an enumeration **committed with the check**, drawn from the
   Backlog's Completed section, the Plan register's `done` nodes, and a
   stated list of standing artifact classes. Rationale: it needs nothing
   from P3-N002, it is disputable by a reader, and it is the same
   material a comprehension-model instance would later be derived from.
4. **Whether the check is mechanized.** Default: **no** — a documented
   procedure, run by hand, its output recorded, with mechanization filed
   to the Backlog. Rationale: applicability is a judgment, and a tool
   that mechanizes a judgment asserts a cause it did not test, which is
   this catalogue's own R16 class.
5. **What the node owes the omissions it finds.** Default: **list and
   disposition, do not undertake to close**. Each omission is mitigated
   here if the mitigation is in hand, accepted with a written reason, or
   routed to the Backlog. Rationale: naming is the deliverable; closing
   fourteen omissions is discovered scope and would swallow the node.
6. **One proposal document or two.** Default: **two** — the catalogue as
   the normative payload, and a cover note carrying the ask, the
   evidencing instance and the accept/amend/reject responses, following
   the delegated-work amendments' shape. Rationale: it is the form the
   owner has already hand-carried once, and it keeps normative text free
   of argument the maintainer did not ask for.
7. **Whether this node's proposal waits to travel with P3-N005's.**
   Default: **no** — drafted independently, carried at the owner's
   convenience. Rationale: the node completes at the artifact (RU-003),
   so batching the delivery costs it nothing and coupling the drafting
   would make each node's completion depend on the other's.
8. **Whether the catalogue may carry classes this project has not
   encountered.** Default: **no** — every entry rests on a real
   encounter here; a class known from elsewhere goes in a closing
   *not yet covered* section. Rationale: evidence is the catalogue's
   entire argument upstream, and one unevidenced entry devalues every
   evidenced one beside it.
9. **How many Risk register entries are rewritten to cite a class.**
   Default: **every entry that instantiates a catalogued class**, not
   the one G7 requires as a minimum. Rationale: with a single citation
   the check reports near-total omission and measures nothing; complete
   citations are what make the remaining omissions genuine.

## What could go wrong in this node

Two failure modes, both specific, both answered above rather than noted
and left.

- **The catalogue drifts into a generic security and testing
  checklist.** Everyone's list of good practices, evidenced by nothing,
  mitigable by no one in particular. Answered by decision 8 and by
  criterion 1: no entry without an encounter of this project's own.
- **The omission check comes back empty, or comes back as noise.** Empty
  means the check does not work (G7 says so in terms). Noise means every
  part is listed against every class because applicability was never
  argued. Answered by the applicability header (decision 2), the argued
  per-item list (decision 3), complete citations (decision 9), and the
  negative control.

## References

- [comprehension-and-continuous-implementation](comprehension-and-continuous-implementation.md)
  — the parent plan: chunk 2's charge, the candidate entries, the
  four-mitigation argument this node's first section restates
- [p3-n001-comprehension-and-continuous-implementation](../specs/p3-n001-comprehension-and-continuous-implementation.md)
  — the parent specification: **G7**, **P4**, and the four additions
  *The breakdown* requires of this node
- [Risk register](../open-risks.md) — R1–R17, the register this
  catalogue is distinguished from, and the seam the sweep runs first
- [Backlog](../backlog.md) and [Cost log](../cost-log.md) — the
  post-mortem seams; the Cost log's notes column is the under-read one
- [Ruling register](../rulings.md) — RU-002, RU-003, RU-005, RU-010,
  RU-015, RU-016, RU-018, RU-020
- [plan-model](../process/plan-model.md) — leaf-or-interior,
  feature-first decomposition, thin-slice-first, monotonicity
- [profiles](../process/profiles.md) — the C1 depth this plan and its
  children's criteria are written to
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md) — the chunk
  plan shape this document follows
- [delegated-work-amendments-cover-note](../proposals/delegated-work-amendments-cover-note.md)
  and [delegated-work-vocabulary](../proposals/delegated-work-vocabulary.md)
  — the existing instances of RU-015's delivery form, which child C
  follows
- methodology **Article 8** (the amendment process the catalogue is
  proposed through), **W-003** (documentation moves with the work),
  **K-003** (the Backlog is the single source of progress truth)
