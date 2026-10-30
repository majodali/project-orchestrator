# Common risk catalogue: check document

Status: active

<!-- K-007 contract: Status transitions active → (superseded by X,
     because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the check document that
     decision 11 of the node P3-N003 specification names. It holds this
     project's records of the common risk catalogue. The catalogue
     itself holds none of them. Node P3-N011 extends this document to
     every class, and it closes with node P3-N003. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session), and the owner reading the omission list
(RD-2). It assumes the methodology at this project's pinned version,
1.6.0 ([Classification](classification.md)), and the
[specification of node P3-N003](specs/p3-n003-common-risk-catalogue.md),
which defines every term used here without a link of its own.

## What this document holds

This document is the record that decision 11 (where this project's
records of the catalogue live) of the specification fixes. Node P3-N010
(one class, carried end to end) wrote it for the class
[CR-001](proposals/common-risk-catalogue.md#cr-001) alone. The
[plan](plans/p3-n010-one-class-end-to-end.md) of that node and child A
of the specification are the authority. Node P3-N011 (the sweep, the
rest of the catalogue and the omission list) extends it to every class,
under its [plan](plans/p3-n011-sweep-and-omission-list.md).

| Section | Content |
|---|---|
| The check procedure | The inputs, the three steps, the omission list and the negative control. |
| Sweep record for CR-001 | The entry test applied, the header argued, every candidate dispositioned, the Risk register pass. |
| Sweep record: the five passes | Status of the passes, the method they share, passes 1 to 5 with every candidate, the classes admitted with their headers, the deferred candidates, the named candidates and the findings. Task E2 of node P3-N011 added passes 3 to 5. |
| Parts enumeration | The committed list of parts the check reads. |
| Run record, 2026-10-30 | The four inputs by commit, steps 1 to 3 for CR-001 and the omission list. |
| Negative-control record | The deliberately broken input and the pair that returned. |
| Shape findings | What in the entry shape the check could not read, and what changed. |

## The check procedure

The procedure is the one the specification defines under
[the class-to-instance check](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check)
and [the negative control](specs/p3-n003-common-risk-catalogue.md#the-negative-control).
Four refinements apply, all adopted at the plan gates of 2026-10-30.
Two are decision 2 (which Classification step 1 reads) and decision 3
(which Backlog entries the parts enumeration reads) of the plan of node
P3-N010. Their markers name the decision alone. Two are decision 3
(what a covering entry's *Class* clause states) and decision 5 (whether
the service repository's Backlog is read) of the plan of node P3-N011.
Their markers name the node. Each is marked below.

### Inputs

A run reads four inputs and names the commit of each.

- The catalogue, `docs/proposals/common-risk-catalogue.md`.
- This repository's Risk register, `docs/open-risks.md`.
- The parts enumeration, the section of this document below.
- The Classification of the repository that holds each part. For parts
  held here, this repository's `docs/classification.md`. For parts held
  in the service repository, that repository's `docs/classification.md`
  at a named commit, which is the fourth input.
  *Refinement, decision 2.* The specification names three inputs and
  reads one Classification.

The parts enumeration is drawn from every checked Backlog entry
wherever it sits, the Plan register's `done` nodes deduplicated by node
ID, and a stated list of standing artifact classes.
*Refinement, decision 3.* The specification reads the Backlog's
Completed section only.

The checked entries of the service repository's Backlog are read too,
at the commit the run names. A service entry becomes a part only when
it delivers an artifact no existing part holds. *Refinement, decision
5 of the plan of node P3-N011.*

### Steps

1. *Project applicability.* For each class and each repository that
   holds parts, the run evaluates the class's applicability header
   against that repository's Classification. A class whose header does
   not admit the repository is recorded as not applicable for the parts
   held there, and step 2 skips those parts. *Refinement, decision 2.*
2. *Reach.* For each applicable class and each part, the run records
   `applies` or `does not apply`, with a one-sentence argument from the
   class's reaches line. One argument may cover every part of one
   standing artifact class when the same reason holds for each. Every
   part still appears in the record.
3. *Coverage.* For each pair recorded `applies`, the run looks for a
   covering entry: a Risk register entry that cites the class and names
   the part, or names a scope the run argues contains the part. A pair
   with a covering entry records that entry's ID. A covering entry's
   *Class* clause also states the exposure that the pair's step 2
   argument names. A pair whose argument names an exposure the clause
   does not state is an omission, and its item names that exposure.
   *Refinement, decision 3 of the plan of node P3-N011.*

How a run reads the Risk register for step 3: the command
`grep -n 'CR-' docs/open-risks.md` lists every line that cites a
catalogue class. The run attributes each hit to the entry whose bullet
holds it. The preamble sentence of the register names the field
without citing a class by ID, so it never appears as a hit.

An omission is a pair recorded `applies` that has no covering entry.
The run's output is the omission list. Each item names the part, the
class, the applicability argument and a disposition. The disposition is
one of three: mitigated here, accepted with a written reason, or
routed to the Backlog.

An omission is genuine when two conditions hold. Its applicability
argument is written, so a reader can dispute it. The citations were
complete when the run read the Risk register, so the omission is not
unfinished bookkeeping.

A run record names the commits of its inputs, the date and the role
that ran it.

### The negative control

The control proves the check can fail. It runs in five steps.

1. Choose a pair the latest run records as covered, with its covering
   entry.
2. On a scratch branch, remove that entry's citation of the class.
3. Run steps 2 and 3 of the check for that class.
4. Confirm the omission list now contains the chosen pair.
5. Discard the branch without merging it.

The record names the scratch branch's base commit, the citation
removed and the pair that returned. A control whose pair does not
return is a failed check, not a passed control.

## Sweep record for CR-001

### Method

The sweep for this class read these documents whole: the Backlog
entries the plan of node P3-N010 names, the Risk register, the Cost log
and the plans and specifications of nodes P3-N003 and P3-N010. It read
the service repository's Backlog and `docs/classification.md`, and the
files it cites below, read-only at commit `58e6819`. These searches
ran over this repository's `docs/`: `cannot fail in the environment`,
`false negative`, `could never have caught`, `invisible to a passing`,
`tests missed`, `bundle guard`, `drift guard`, `$default`, `oscillat`
and `ping-pong`. The full five-seam sweep is the work of node P3-N011
(the sweep, the rest of the catalogue and the omission list). This pass
covers CR-001 and one rejected candidate only.

### The entry test applied to CR-001

The entry test is stated in the
[catalogue](proposals/common-risk-catalogue.md#def-entry-test). Each
condition is answered for the candidate that created CR-001, the
`node -e` false negative.

| Condition | Answer |
|---|---|
| ET-1, cross-project precondition | Holds. The precondition is a check and an execution environment that differ. It names no artifact, role, register or mechanism that exists only in this project. Esbuild, Vitest and DynamoDB appear in encounters, not in the precondition. |
| ET-2, mitigation by each | Holds. Each affected project must run a check where its code runs, or prove a stand-in able to fail. No upstream change removes the need. Rule Q-004 (functional tests run against a deployed test environment) appears in the methodology's rules README only as a header example. It is not a live rule, so it leaves this class to each project. |
| ET-3, evidenced here | Holds. Five independent encounters, each with a date and an artifact in this repository. They are in the catalogue and in the table of independence below. |
| ET-4, decidable applicability | Holds, with the header `[C1+]`. The next subsection argues it. |

Outcome: admit. No entry existed, so the candidate creates CR-001.

### The applicability header

The header is `[C1+]`. Two facts decide it.

- The encounters occurred in two projects. The service repository
  declares C1, S1, `backend-service` and `serverless-aws`. This
  repository declares C1, S0, `component/library` and `none/local`. The
  R12 exercise, encounter 2026-09-07, took place here.
- The derived condition `deployable` is `target ≠ none/local`
  ([vocabulary](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-derived-conditions)).
  The header `[C1+] [deployable]` would not admit this repository, so
  the entry would be inapplicable to the project that recorded one of
  its own encounters.

The tier floor is C1 because every encounter is at C1 and the
methodology's default for an unstated header is `[C1+]`. The reaches
line, not the header, narrows the class to the parts it threatens. The
header was not chosen to make the check return a result.

### Disposition of every candidate

A row is one candidate as its source states it. The outcomes are those
of the entry test, or a written reason.

| Candidate | Source | Disposition and reason |
|---|---|---|
| `node -e` ran the import check as CommonJS | Backlog, "The bundle's import check was a false negative, and needs to run under ESM". Fixed at task T025 (the outage rework), 2026-09-01. | Admit. It creates CR-001. Encounter dated 2026-09-01. |
| Vitest's module runner hid the same defect | The same entry. The same investigation. | Not independent. The entry records Vitest as a second context found while building the fix for the first. It is a second instance inside the encounter above. |
| The in-memory lease backend never sent a condition expression to DynamoDB | Backlog, "`plan_lease_release` fails against real DynamoDB: `token` is a reserved keyword". Surfaced at task T026 (the chunk 1 gate demonstration), 2026-09-01. | Merge. Independent encounter dated 2026-09-01. A different defect, found by the gate demonstration against the production table. |
| A bundle guard proven only by breaking it | No record. A search for `bundle guard` finds it only in the planning documents of the common risk catalogue, three plans and one specification. | Not an encounter. No failure occurred. The nearest records are mitigations: the T025 acceptance commit `0318206` ("verified by breaking its own guard") and the drift guard of node P1-N009, proven by changing one byte of a vendored copy. They support CR-001's mitigation sentence. |
| Four deploy defects of node P2-N012 | Backlog, "Deploy the service from CI on merge", done 2026-09-07. Tasks T035 and T036 (documentation repair, then rework, after the first CI deploy failed), 2026-09-06. | Merge. One encounter, dated 2026-09-06, the day the pipeline first ran green. The four defects share one investigation, the pipeline's first real runs, so they count once. The earliest, the audience typo, was found on 2026-09-04 (Risk register R16). |
| The ripgrep NUL-byte omission | Backlog, "`run_corpus.ts` contained NUL bytes, and ripgrep silently dropped it from searches". Confirmed at the acceptance of task T017 (the cutover's first dispatch). The cutover was committed 2026-08-30. | Separate candidate. The source states a tool that silently drops part of its input. Its generalization is: a verification tool that silently excludes part of its input cannot fail for that part. It is not an encounter of CR-001, because no environment differs between the check and the code. It is the tool's own input filter. Child B (node P3-N011) gives it an outcome. |
| The R12 exercise's fast 502 | Risk register R12, 2026-09-07. | Merge. Independent encounter dated 2026-09-07. The exercise of "does not wait" ran where the egress proxy answered an unroutable address at once. The check could not fail in the surface where the exercise ran. |
| The first deploy's 404 on every path | Backlog, "Chunk-1 child: reachability slice", deployed 2026-08-27. Found while reading the Backlog for the enumeration, and not named by the plan. | Merge. Independent encounter dated 2026-08-27. The tests served routes without the stage segment that API Gateway adds. The service repository's own Backlog calls the lease defect the same "check that cannot fail in the environment the code runs in" shape as "the ESM-bundle and `$default`-stage defects". |

That sentence is in the service repository's `docs/backlog.md` at
commit `58e6819`, in the entry "Rework: fix the lease-release
reserved-word defect".

For the merged rows, ET-1, ET-2 and ET-4 are those of CR-001. ET-3
holds with the artifact shown.

### Independence of the encounters

CR-001 records five encounters. Decision 10 of the specification asks
for at least two independent ones. Each pair differs in defect and in
the investigation that found it.

| Date | Defect | Found by |
|---|---|---|
| 2026-08-27 | Stage segment in request paths | The owner's first deploy of the reachability slice, repaired in task T009 (rework of the deployed 404). |
| 2026-09-01 | ESM bundle loaded as CommonJS | The outage after the write-path deploy, reworked in task T025 (the outage rework). |
| 2026-09-01 | Reserved word in a condition expression | The chunk 1 gate demonstration, task T026, on the first call to the production table. |
| 2026-09-06 | Four deploy defects | The pipeline's first real runs, tasks T035 and T036. |
| 2026-09-07 | Fast 502 in the "does not wait" exercise | The R12 exercise on the cloud surface, node P2-N011 (degrade to git-only). |

The four deploy defects could be counted as four, because each came
from a different run. The record counts them once, which is the lower
count. Five encounters remain, above the minimum of two. Counting each
defect would give eight.

### The rejected candidate: R1

Candidate: Risk register entry R1 (dispatch oscillation), a loop
between roles that never converges.

| Condition | Answer |
|---|---|
| ET-1 | Fails. The precondition is this project's dispatch loop between its Reviewer and Implementer roles. A project without that loop cannot have the failure. |
| ET-2 | Holds in form. The mitigation, bounded attempts, is applied inside each project that runs the loop. |
| ET-3 | Fails. The entry records no encounter. A search of `docs/` for `oscillat` and `ping-pong` finds only the entry and the planning documents of this catalogue. |
| ET-4 | Fails. No Article 4 tag expresses "runs this orchestration loop". The tags are C-tier, S-level, type, target and the derived conditions `deployable` and `deployed`. |

Outcome: reject. The failing conditions are ET-1 and ET-4. ET-3 also
fails, and ET-1 decides first.

### Risk register pass for CR-001

The pass read all seventeen entries of `docs/open-risks.md`. It asks
whether an entry describes a check that cannot fail in the environment
the code runs in. Two entries do, and carry the *Class* line.

| Entry | Cites CR-001 | Reason |
|---|---|---|
| R1 dispatch oscillation | No | A loop between roles. No check is described. |
| R2 runaway fan-out | No | Budget and scope growth. No check is described. |
| R3 orphaned work | No | Work neither progressing nor visibly stuck. The liveness invariant is a check that can fail on its subject. |
| R4 role overreach | No | Authority exceeded. No environment mismatch. |
| R5 register and reality divergence | No | A stale register. A different class. |
| R6 packet-insufficiency spiral | No | Context packets too small. No check is described. |
| R7 billing misroute | No | The risk is the billing account. The entry's own text describes no check that passes where the defect cannot occur. |
| R8 compounding bad plan | No | A flawed breakdown. No check is described. |
| R9 surface-dependent plugin loading | No | The trials ran on the surfaces where the plugin loads and found it absent. The check could fail, and did. |
| R10 the service as a second source of truth | No | The divergence exercise was performed against the deployed service. That is the class's mitigation, not an instance. |
| R11 MCP surface constraints | No | Transport limits and an unverified push channel. No check is described. |
| R12 service outage stops work | Yes | The exercise's "does not wait" case could not fail on a surface whose proxy answers at once. |
| R13 runtime assumption moves to `node` | Yes | On a surface with an older or absent Node the checker cannot run, and the entry records the loss as silent unless something looks. This is the weaker of the two fits. R13 records an exposure, not an encounter. The owner may dispute it. |
| R14 dependency search | No | A supply-chain risk. No check is described. |
| R15 reference documentation as an instruction channel | No | An instruction channel. No check is described. |
| R16 a provider's error names the wrong layer | No | The failure is a diagnostic asserting an untested cause. The incident contains the audience typo counted in the fourth encounter. The entry's own failure is a different class. |
| R17 the harness's guidance against the fallback rule | No | Guidance contradicting a rule. No check is described. |

The two citations are complete for CR-001 at this pass, which is the
second condition for a genuine omission.

## Sweep record: the five passes

Node P3-N011 (the sweep, the rest of the catalogue and the omission list)
runs the sweep in three execute tasks. Task E1 ran passes 1 and 2 below.
Task E2 ran passes 3 to 5. This section holds all five, so a reader
finds the whole sweep in one place. The earlier section for CR-001 stays
as P3-N010 wrote it.

### Status of the passes

| Pass | Source | Task | Commit read | Found | Admitted | Merged | Rejected | Deferred | Seen again |
|---|---|---|---|---|---|---|---|---|---|
| 1 | Risk register | E1 | `bd4fc8d` | 25 | 5 | 3 | 16 | 1 | 2 |
| 2 | Ruling register and plans | E1 | `bd4fc8d` | 18 | 2 | 8 | 6 | 2 | 7 |
| 3 | Backlog, Completed section | E2 | `089b79c` | 6 | 1 | 1 | 4 | 0 | 5 |
| 4 | Backlog, Upcoming section | E2 | `089b79c` | 58 | 3 | 27 | 25 | 3 | 21 |
| 5 | Cost log, notes column | E2 | `089b79c` | 21 | 0 | 12 | 9 | 0 | 17 |

Found counts new candidates only. It equals admitted, merged, rejected
and deferred added together. *Seen again* counts rows that cite a failure
already recorded, which are not new candidates. One row of pass 2 is a
named candidate that records no failure. It is in no count. Passes 3 to 5
add 85 candidates found, 4 classes admitted, 40 merged, 38 rejected and 3
deferred. With passes 1 and 2 the sweep holds 128 candidates found, 11
classes admitted (CR-002 to CR-012), 51 merged, 60 rejected and 6 deferred.
Each merged row counts once, whether it adds an encounter or an instance.

### Method common to the passes

Passes 1 and 2 read this repository at commit `bd4fc8d`, the head of
branch `catalogue-sweep` when task E1 was dispatched. Passes 3 to 5 read it
at commit `089b79c`, the head when task E2 was dispatched. All passes read
the service repository at commit `58e6819` and the methodology at tag
v1.6.0, commit `3e34829`, both read-only. Task E2 re-read the service's
`docs/classification.md` and its `docs/findings/` path at `58e6819`, the
service's `main` at that date. Specifications are not a source. Criterion B1
names the plans only, and no pass read a specification for a candidate.

**Candidates.** A passage yields a candidate when it records something
that went wrong or states a risk as a failure. A work item, a wish, a
principle or a cost yields none. A candidate is the failure as its source
states it. A generalization is its own row, with the generalization
stated.

**Labels.** Rows of pass 1 are `RR-nn`. Rows of pass 2 are `RP-nn`.
Labels `N1` to `N14` mark the fourteen named candidates in the order of
the plan's table: eleven from the parent plan and three from the record
of P3-N010. Rows `RR-nn` and `RP-nn` do not change once issued. Pass 3
uses `BC-nn`, pass 4 `BU-nn` and pass 5 `CL-nn`. A row of passes 3 to 5
names its source by Backlog line number at commit `089b79c` and by the
entry's title, or by Cost log task ID.

**Answers.** Every row answers ET-1 to ET-4. A cell reads *Holds* or
*Fails*, with a key where a shared argument applies. Rows that fail for
the same reason share the key's argument and keep their own row. A row
that needs more than a key is argued under its table.

| Key | Shared argument |
|---|---|
| A1 | The precondition names a mechanism that exists only in this project's orchestration: the dispatch loop, the Plan register's node tree and stages, the roles' decides-lists, the context packet, the breakdown and its ascent-side verification, the liveness invariant, the orchestration service with its queue, or the enlistment procedure. A project without that mechanism cannot have the failure. |
| A2 | The entry records no event of the failure. It states a risk and a mitigation. |
| A3 | No Article 4 tag expresses "runs this orchestration mechanism". The tags are the C-tier, the S-level, the type, the target and the derived conditions `deployable` and `deployed`. P3-N010 argued the same for R1. |
| A4 | ET-2, part (a). The methodology at v1.6.0 already holds a rule that requires the fix or the marking, or an upstream amendment or tool change would remove the failure. What remains is non-compliance, or a gap that waits for an amendment. Rows RP-11 and RP-12 of pass 2 use the same argument. |
| A5 | ET-2, part (b). The failure is a gap in what the harness reports or does. Its owner can repair it once for every project, as RR-09, RR-20 and RR-22 of pass 1 argue. |

**Reading of ET-2.** ET-2 as the specification states it fails a
candidate that "one upstream change could remove for every project,
without action by any project". The specification does not say whether
the upstream is the methodology alone. The plan's table reads R17 (the
harness's guidance pushes against the fallback rule) as failing ET-2
because one harness change removes the notice. The passes apply that
reading in two parts.

- **Part (a).** A change to the methodology's rules or tooling would
  remove the failure. Each pass searched the rule files of the corpus at
  v1.6.0 (the K, M, P, Q, S and W files) for the candidate's key words
  and read the rules the hits named. The words included `supply`,
  `untrusted`, `fetched`, `injection`, `dependen`, `billing`,
  `concurren`, `parallel`, `stale`, `drift`, `silent`, `diagnos`,
  `snapshot`, `frozen`, `fixture`, `ignore`, `binary`, `skip`, `contrary`,
  `pressure`, `preflight` and `runtime`.
- **Part (b).** The failure is a defect or gap of one component whose
  owner can repair it once for every project, so that no hazard is left
  for a project to mitigate. A hazard that stays whatever the owner does
  passes. Hostile content in a registry or a page, and a provider's
  misleading error text in general, are such hazards. The specification's
  worked example agrees, because it passes R14 although a registry
  operator could change.

This reading is the sweep's, not the specification's. Rows RR-09, RR-17,
RR-20 and RR-22 turn on part (b). The report of task E1 asks the owner to
ratify or strike it.

**Reading of ET-4.** A header is argued from the Classification of each
repository where an encounter happened (shape finding 4 of P3-N010). The
table under *The classes the passes admitted* gives the argument per
class.

**Outcome conventions.** Three conventions apply beyond the four outcomes
of the specification.

- <a id="def-seen-again"></a>*Seen again* is a row that cites a failure
  recorded in an earlier row or in the sweep record for CR-001. It
  adds no candidate and no encounter.
- <a id="def-merge-with-exposure"></a>*Merge with exposure* is a merge
  where the candidate states an admitted class and records no event of
  its own. A candidate cannot become an encounter without an event. The
  row is cited as an instance of the class, as a Risk register *Class*
  line cites R13, and adds no encounter. ET-3 holds for the class by its
  own encounters. Finding S1 below records the gap in the specification.
- *No candidate* is a row for a named candidate that records a gap, not
  something that went wrong. The plan's rule gives it no outcome.

**Ordering.** A failure met in two sources is recorded once, at its first
pass. Pass 1 holds the generalization that admits CR-005. Its encounters
come from pass 2. The later rows cite it, as the plan requires. Pass 2
also dispositions three named candidates whose encounter is in the
Backlog: stale copy (N6), lost update (N10) and ripgrep (N12, N13). The
brief of task E1 asked for them, and the plans pass meets each in a plan
before pass 3 or 4 reads the Backlog. Passes 3 and 4 cite those rows and
count them as seen again.

### Pass 1: the Risk register

**Method.** The pass read the Risk register whole at commit `bd4fc8d`.
That is the preamble and all seventeen entries, R1 to R17. It ran no
search. It put every entry to the entry test (criterion B2). An entry
that states more than one failure yields one row per failure.

| Label | Candidate as its source states it | ET-1 | ET-2 | ET-3 | ET-4 | Outcome |
|---|---|---|---|---|---|---|
| RR-01 | R1 (dispatch oscillation): a loop between roles never converges. Fully tested in the sweep record for CR-001 | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-02 | R2 (runaway fan-out): breakdown inflates the tree, or backward transitions cycle a subtree | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-03 | R3 (orphaned work): a node is neither progressing nor visibly stuck | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-04 | R4 (role overreach): a role decides above its authority without routing | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-05 | R5 (register and reality divergence): a session dies mid-task or a register goes stale | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-06 | R6 (packet-insufficiency spiral): context packets are routinely too small | Fails (A1) | Holds | Holds, see below | Fails (A3) | Reject, ET-1 |
| RR-07 | R7 (billing misroute): an environment with an API key set bills API credits despite the subscription | Holds | Holds | Fails | Holds | Defer |
| RR-08 | R8 (compounding bad plan): a flawed breakdown propagates before ascent-side verification | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-09 | R9 (surface-dependent plugin loading): checked-in plugin settings did not take effect on the web surface | Holds | Fails, see below | Holds | Holds | Reject, ET-2 |
| RR-10 | R10 (the service as a second source of truth): live state in the service drifts from the registers in git | Fails (A1) | Holds | Fails, see below | Fails (A3) | Reject, ET-1 |
| RR-11 | R11 (MCP surface constraints): the transport imposes limits a naive design trips | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RR-12 | R12 (service outage stops work): a coordination plane turns its downtime into a stoppage | Fails (A1) | Holds | Fails, see below | Fails (A3) | Reject, ET-1 |
| RR-13 | R13 (the tooling's runtime assumption moves to `node`): a surface with an older or absent Node loses the checker silently | Holds | Holds | Holds for CR-001 | Holds | Merge with exposure, CR-001 |
| RR-14 | R14 (dependency search is an attack surface): an agent adopts a package found by searching | Holds | Holds | Holds | Holds | Admit, [CR-002 (an agent adopts a package it found by searching)](proposals/common-risk-catalogue.md#cr-002) |
| RR-15 | R15 (reference documentation is an instruction channel): fetched prose carries an instruction | Holds | Holds | Holds | Holds | Admit, [CR-003 (fetched content carries an instruction for the agent)](proposals/common-risk-catalogue.md#cr-003) |
| RR-16 | R16 (a provider's error names the wrong layer): a diagnostic asserts a cause it did not test | Holds | Holds | Holds | Holds | Admit, [CR-004 (a diagnostic names a cause it did not test)](proposals/common-risk-catalogue.md#cr-004) |
| RR-17 | R17 (the harness's guidance pushes against the fallback rule): the harness notice presses against the project's no-retry rule | Holds | Fails, see below | Holds | Holds | Reject, ET-2 |
| RR-18 | Generalization of R5's second clause and R10's failure: a copy or description of another document's content falls out of step with it | Holds | Holds | Holds | Holds | Admit, [CR-005 (a copy or description disagrees with its source, unseen)](proposals/common-risk-catalogue.md#cr-005) |
| RR-19 | Generalization of R9: a capability documented for one surface is relied on across several | Holds | Holds | Holds for CR-001 | Holds | Merge with exposure, CR-001 |
| RR-20 | R9, trial 1: cloud sessions do not give subagents the Agent tool | Holds | Fails, see below | Holds | Holds | Reject, ET-2 |
| RR-21 | R12: the exercise could not test waiting, and its credential case tested the rule's consequence, not the rule | | | | | Seen again: CR-001, encounter 2026-09-07 |
| RR-22 | R12: the failure notice arrives after the first tool call, not at startup | Holds | Fails, see below | Holds | Holds | Reject, ET-2 |
| RR-23 | R12: a session cannot measure its own startup, so the exercise procedure asks for what no session can supply | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| RR-24 | R12: an unreachable service, a missing credential and an absent server look the same from inside the session | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| RR-25 | R16: a provider's error names a layer other than the one at fault | Holds | Holds | Holds, same investigation as RR-16 | Holds | Merge, CR-004 |
| RR-26 | R16: the audience typo and the trust-policy subject defects | | | | | Seen again: CR-001, encounter 2026-09-06 |
| RR-27 | Generalization of R17: a rule meets contrary guidance where it applies | Holds | Holds | Holds | Holds | Admit, [CR-006 (a rule meets contrary guidance where it applies)](proposals/common-risk-catalogue.md#cr-006) |

**Counts.** Found 25. Admitted 5: RR-14, RR-15, RR-16, RR-18, RR-27.
Merged 3: RR-13, RR-19, RR-25. Rejected 16: RR-01 to RR-06, RR-08 to
RR-12, RR-17, RR-20, RR-22 to RR-24. Deferred 1: RR-07. Seen again 2:
RR-21 and RR-26.

**Rows argued singly.**

- RR-01: P3-N010 tested R1 condition by condition in the sweep record for
  CR-001. The row cites that table and adds nothing.
- RR-06: the entry reports two firings of the detection, in trial 1 and
  trial 2, and gives no date. ET-1 decides, because the context packet is
  this project's dispatch mechanism.
- RR-07: the plan's table names ET-1 and ET-3. ET-1 holds. The
  precondition is an environment variable and a subscription, and the
  loop is not needed for the failure to occur. ET-2 holds. Only a project
  controls what its execution environment sets, and no change to the
  methodology removes the hazard. ET-3 fails. The entry and the founding
  plan record a watch item from a policy review of 2026-08-24 and a check
  that was pending. A search of the Backlog and the Cost log for
  `ANTHROPIC_API_KEY` and `billing` found the watch item, the plugin's
  hook and omission item O1 of P3-N010's run, which asks whether the hook
  fires. No session is recorded billing the wrong account. ET-4 holds with
  `[C1+]`. Outcome: defer. Passes 3 to 5 read the Backlog and the Cost log
  whole and can overturn this. An encounter there turns the row into an
  admission.
- RR-09: the entry places the repair upstream: "both documentation gaps
  are still worth reporting upstream to Anthropic". Whether a checked-in
  plugin loads on a surface is the harness's behavior. One harness change
  removes the failure for every project and leaves nothing to mitigate.
  Part (b) of the reading applies.
- RR-10: ET-3 fails. The entry records an exercise on 2026-09-07 in which
  two refusals left git winning. No divergence occurred. The exercise is
  a mitigation proven by use, as the plan's table says.
- RR-12: ET-3 fails. The entry records an exercise that passed. No outage
  stopped work. The exercise's own weakness is RR-21.
- RR-13: the plan's table gives two paths, a merge with CR-001 or its own
  class with ET-3 failing. The owner kept R13's citation of CR-001 at the
  gate of 2026-10-30, so the register treats the failure as CR-001's: the
  check cannot run where the code runs. R13 records an exposure and no
  event. A search of the Backlog for `22.18`, `preflight` and `runtime
  floor` found the floor's declaration and the preflight's tests, and no
  surface that lacked the floor. Outcome: merge with exposure.
  [RU-013](rulings.md) (what a tool does when its runtime is missing or
  too old) states the same failure and is row RP-02.
- RR-17: the stated failure is the notice that the harness raised. It told
  the session to treat the condition as a connection failure and not to
  conclude that access does not exist. One harness change removes the
  notice. Part (b) applies, as the plan's table reads it. The
  generalization is a separate row, RR-27.
- RR-18, RR-27 and the three admissions RR-14 to RR-16: the entry test is
  argued under *The classes the passes admitted*.
- RR-19: CR-001's reaches line already names "procedures exercised on one
  surface and relied on across several". The four trials of R9 ran on the
  surfaces and found the plugin absent. The checks could fail and did, as
  P3-N010 found. They are CR-001's mitigation working, so the row adds an
  instance and no encounter.
- RR-20: the harness gives subagents no Agent tool on the cloud surface.
  The entry records the orchestrator agent stopping correctly. One harness
  change removes it. Part (b) applies.
- RR-22: when the harness raises the notice is the harness's behavior.
  One change moves it to startup. Part (b) applies.
- RR-23 and RR-24: the exercise procedure in `enlistment.md` and the
  `.mcp.json` of the orchestration service are this project's artifacts.
- RR-25: the incident of R16 holds two failures, the provider's text and
  the preflight's verdict. The class sentence of CR-004 covers both. Both
  were found by the same three runs on 2026-09-04, so they count as one
  encounter.

### Pass 2: the Ruling register and the plans

**Method.** The pass read the Ruling register whole at commit `bd4fc8d`:
all twenty-two rulings, from RU-001 (execute a proposal draft before its evidencing node closes) to RU-022 (how a document drafted for the methodology corpus carries the rule that the corpus writes its deliverables IR first). It read each plan's gate records
and ran six searches over the eighteen files of `docs/plans/`. The
searches were `backward`, `rework`, `correction`, `stale`, `found` and
`defect`. Each ran as a case-insensitive substring over lines.

| Phrase | Matching lines | Plans with a match |
|---|---|---|
| `backward` | 6 | 5 |
| `rework` | 16 | 5 |
| `correction` | 15 | 5 |
| `stale` | 19 | 9 |
| `found` | 60 | 16 |
| `defect` | 25 | 10 |

The pass read the section around every matching line whole. Of the 60
lines for `found`, 14 are the word "founding", which matches the substring
and names the founding plan. They yield nothing.

*Rulings.* Six rulings state a failure in their rationale. They are
[RU-011](rulings.md) (the language of repo-local tooling),
[RU-013](rulings.md) (what a tool does when its runtime is missing),
[RU-014](rulings.md) (a port retires the only other implementation a test
compares against), [RU-015](rulings.md) (how this project delivers a change
to a repository it cannot write to), [RU-018](rulings.md) (whether a child
is queued behind a sibling it does not depend on) and
[RU-021](rulings.md) (which document is the source of progress truth). The remaining sixteen rulings state a
principle, a preference or a cost, and yield no candidate. RU-014 and RU-015 yield two
rows each.

*Plans.* The plans that yield candidates are the plans of P1-N009 (plugin
tooling on the portfolio stack), P1-N014 (role contracts adopt the v1.4.0
rules), P1-N015 (methodology amendments for delegated work), P2-N012
(deploy the service from CI on merge), P3-N002 (the comprehension model),
P3-N003 (the common risk catalogue), P3-N005 (sequence mode), P3-N010
(one class, carried end to end) and the comprehension plan. The matches in
the other plans yield nothing. The plan of this node names the phrases and
the candidates and records no failure. The other matches are backward-transition contingencies
(P1-N008, P1-N015), staleness made visible by design (P2-N002), Backlog
additions that are gaps and work items (P3-N006, P3-N013), corrections
that apply an adopted decision (P3-N007, P3-N002, P3-N003) and design
statements about a form (P3-N014).

| Label | Candidate as its source states it | ET-1 | ET-2 | ET-3 | ET-4 | Outcome |
|---|---|---|---|---|---|---|
| RP-01 | RU-011 (language of repo-local tooling), with the plan of P1-N009: two implementations of one register grammar disagree about what a legal stage is | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-08-29 |
| RP-02 | RU-013 (what a tool does when its runtime is missing): a tool with an unmet floor degrades quietly | | | | | Seen again: RR-13 (N8) |
| RP-03 | RU-014 (a port retires the only other implementation a test compares against): the test keeps a frozen transcript of the retired side | Fails, see below | Holds | Holds | Holds | Reject, ET-1 |
| RP-04 | Generalization of RU-014: a test freezes a snapshot of a document that changes by routine operation | Holds | Holds | Holds | Holds | Admit, [CR-007 (a test freezes a snapshot of a document that changes by routine operation)](proposals/common-risk-catalogue.md#cr-007) |
| RP-05 | RU-015 (how this project delivers a change to a repository it cannot write to): a patch drafted without means to apply it fails on unverified context | Holds | Holds | Fails | Holds | Defer |
| RP-06 | RU-015: a quotation that went stale between drafting and delivery cannot be detected by the reader | Holds | Holds | Holds for CR-005 | Holds | Merge with exposure, CR-005 |
| RP-07 | RU-018 (is a child queued behind a sibling it does not depend on): holding unrelated work behind a sibling | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| RP-08 | RU-021 (which document is the source of progress truth): two documents claiming progress truth diverge | | | | | Seen again: RR-18 |
| RP-09 | Plan of P1-N014: the founding plan stated a pin of v1.3.0 while the Classification recorded v1.4.0 | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-08-31 |
| RP-10 | Plan of P1-N014: one contract is stated in two places, which is a drift hazard | Holds | Holds | Holds for CR-005 | Holds | Merge with exposure, CR-005 |
| RP-11 | Plan of P1-N014: task T017 found plan decision 6 colliding with specification criterion D1 | Holds | Fails, see below | Holds | Holds | Reject, ET-2 |
| RP-12 | Plan of P1-N014: task T018 cleared stale present-tense claims out of the ported tools | Holds | Fails, see below | Holds | Holds | Reject, ET-2 |
| RP-13 | Plan of P1-N015: the Portfolio register's row for this project is stale | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-08-31 |
| RP-14 | N6, a register entry describing another repository goes stale silently (parent plan, plan of P3-N003; evidence in the Backlog) | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-01 |
| RP-15 | N6, generalization: a copy of another document goes stale silently | | | | | Seen again: RR-18 |
| RP-16 | Plan of P3-N005: a Backlog item describing another document's state going stale is a failure the project "has already recorded twice" | | | | | Seen again: RR-18 |
| RP-17 | Plan of P3-N005: a stop condition stated only in `dispatch.md` has R17's defect | | | | | Seen again: RR-27 |
| RP-18 | N9, a guard believed because it is present, not because it was broken (plan of P3-N003, drift guard of P1-N009) | Holds | Holds | Holds for CR-001 | Holds | Merge with exposure, CR-001 |
| RP-19 | N10, a lost update on a single-writer file under parallel work (Backlog 2026-09-17; plan of P3-N003) | Fails, see below | Holds | Fails | Holds | Reject, ET-1 |
| RP-20 | N10, generalization: concurrent writers to one shared file lose an update | Holds | Holds | Fails | Holds | Defer |
| RP-21 | Plans of P3-N002 and P3-N005: the race on the Backlog "would be inherited", and two roles appending to one file lose a write | | | | | Seen again: RP-19 |
| RP-22 | N12, ripgrep silently dropped a file with NUL bytes from searches (plan of P3-N010; evidence in the Backlog) | Holds | Holds | Holds | Holds | Merge, CR-008, encounter 2026-08-30 |
| RP-23 | N13, generalization of RP-22: a verification tool silently excludes part of its input | Holds | Holds | Holds | Holds | Admit, [CR-008 (a verification tool silently excludes part of its input)](proposals/common-risk-catalogue.md#cr-008) |
| RP-24 | N14, no committed test runs the plugin tools as `node plugin/scripts/<tool>.ts` (step 2 arguments for PT-08 to PT-11) | | | | | No candidate |
| RP-25 | Comprehension plan: its previous draft argued that the model carries observed dependencies, which was wrong | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| RP-26 | Plan of P2-N012: two outage defects in two days, and the stage-prefix defect class | | | | | Seen again: CR-001, encounters 2026-08-27, 2026-09-01 and 2026-09-06 |

**Counts.** Found 18. Admitted 2: RP-04, RP-23. Merged 8: RP-01, RP-06,
RP-09, RP-10, RP-13, RP-14, RP-18, RP-22. Rejected 6: RP-03, RP-07,
RP-11, RP-12, RP-19, RP-25. Deferred 2: RP-05, RP-20. Seen again 7:
RP-02, RP-08, RP-15, RP-16, RP-17, RP-21, RP-26. No candidate 1: RP-24.

**Rows argued singly.**

- RP-01: RU-011 says the form checker and the service's `plan_read` "parse
  the same register grammar and should not be two implementations in two
  languages". The plan of P1-N009 says the cross-check "found" two places
  disagreeing about what a legal stage is. The event is in the Backlog,
  entry "`plan_read` passes through a stage outside the lifecycle
  vocabulary", recorded at the acceptance of task T010 on 2026-08-29. The
  service's parser accepted a stage outside the vocabulary that the
  checker rejects. CR-005's
  class sentence covers a second implementation.
- RP-03: the stated failure needs the port of P1-N009 and the form checker,
  which was the only other implementation. Both are this project's
  artifacts. ET-1 decides.
- RP-04: the evidence is the Backlog entries "`test/plan-register.test.ts`'s
  live-register cross-check went stale the moment it was accepted" and
  "`test/plan-register.test.ts` freezes a snapshot of the live register, so
  it breaks at every acceptance", 2026-08-30. The generalization is not a
  reworded rejection. RP-03 needs a port. The generalization needs a living
  document, and holds without one.
- RP-05: the rationale of RU-015 says a session that cannot apply or test a
  patch "produces one that fails on context it never verified". No failed
  patch is recorded. ET-1 holds, because any project that delivers into a
  repository it cannot write meets the precondition.
- RP-06: RU-015 says that without the provenance line "a quote that went
  stale between drafting and delivery is undetectable by the reader". No
  such quotation is recorded. The failure is CR-005's, so the row is cited
  as an instance and adds no encounter.
- RP-11: [K-011 (found contradictions are marked, not routed around)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-011--found-contradictions-are-marked-not-routed-around)
  already requires the session that finds a contradiction of a recorded
  decision to fix or mark it. The methodology has made the amendment, so
  the failure is not a catalogue entry. Part (a) of the reading applies.
- RP-12: [K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable)
  already covers content that a recorded decision supersedes. Part (a)
  applies. CR-005 is different, and ET-2 for CR-005 says why.
- RP-14: the Backlog entry "A Backlog entry describing another repository
  goes stale silently" records that task T031 found a gap still called open
  that an unrelated task had closed six hours earlier.
- RP-19: the Backlog entry "Parallel dispatch collides with the single-Backlog
  write, and nothing says so" names `docs/backlog.md`, the duty of
  [W-003 (documentation moves in the same commit as the work)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)
  and this project's parallel dispatch. The plan's table names the same
  turning point. ET-3 fails as well, because the entry records the hazard
  and a workaround and no lost write.
- RP-20: the generalization needs only concurrent writers and a shared
  file. ET-2 holds. The rule corpus has no rule on concurrent writers.
  ET-3 fails, for the reason in RP-19. Outcome: defer.
- RP-22 and RP-23: P3-N010 ruled the omission no encounter of CR-001,
  because no environment differs between the check and the code. The two
  rows were decided together. The generalization is the class sentence of
  CR-008. The stated failure becomes its encounter. ET-2 holds for both
  rows. Ripgrep skips binary files by design, the cause in this encounter
  was a file the project wrote, and the hazard recurs in every tool with
  ignore rules.
- RP-24: the row records a gap, not a failure. Decision 3 of the plan of
  P3-N011 makes it an omission item at E3's run if R13's existing text
  does not state the exposure. R13 names the loss of the checker on a
  surface that lacks the Node floor. It does not name a missing test that
  runs the tools as `node`. E3 writes each *Class* clause from the
  entry's existing text and never widens it (criterion B16), so the pairs
  of PT-08 to PT-11 are expected omissions.
- RP-25: a plan's previous draft argued the wrong thing, and the plan
  marks the correction. The precondition is this project's planning of its
  model.

### Pass 3: the Backlog, Completed section

**Method.** The pass read the Completed section of `docs/backlog.md` whole
at commit `089b79c`: lines 31 to 353, 323 lines, 20 entries, all checked.
It ran no search. It read each entry for a passage that records something
that went wrong or states a risk as a failure. Seven entries yield rows.
The other thirteen report shipped work or decisions and yield none. A row
names its entry by line number and title.

| Label | Candidate as its source states it | ET-1 | ET-2 | ET-3 | ET-4 | Outcome |
|---|---|---|---|---|---|---|
| BC-01 | Line 116, "Plugin v1 built and repo enrolled self-hosted": the first run of `form_check.py` caught four real gaps between the Plan register and the Backlog | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BC-02 | Line 116, trial 1: the checker's liveness rule lacked the hold-marker arms (finding 1), and the dispatch dependency default was undefined (finding 3) | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BC-03 | Lines 116 and 252: the settings-declared plugin did not observably load in a web session, and did not load locally either (R9) |  |  |  |  | Seen again: RR-09 and RR-19 |
| BC-04 | Line 116, trial 1 finding 2: cloud sessions give no nested dispatch |  |  |  |  | Seen again: RR-20 |
| BC-05 | Lines 116, 175, 191 and 252: packet rows too narrow, four firings of R6 repaired in turn |  |  |  |  | Seen again: RR-06 |
| BC-06 | Line 191, "Trial-3 review": the Orchestrator gave itself an 18-file packet and a timer detour, and about 30 minutes passed before dispatch | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BC-07 | Line 252, "Trial 4 (local session) and its analysis": task T004 showed 1h51m elapsed for about 68k tokens and 26 tool calls, against 3 to 3.5 minutes for web Planner tasks. The record attributes the gap to waiting on permission prompts on an attended surface, not to the model | Holds | Holds | Holds | Holds | Admit, [CR-009 (a figure presented under one name includes something else)](proposals/common-risk-catalogue.md#cr-009) |
| BC-08 | Line 252: the Ruling register's `Applied:` lists were not maintained, and the cross-check added after trial 4 caught all three gaps on its first run | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-08-26 |
| BC-09 | Lines 40 and 274: the `ANTHROPIC_API_KEY`-precedence trap recorded as a must-check, and an agent-SDK engine whose inference "would bill API credits" |  |  |  |  | Seen again: RR-07 |
| BC-10 | Line 318, "Upstream disposition of the P1-N015 proposals": four gaps in the methodology's rules that v1.5.0 closed. The report rule misfires on agent-to-agent reports. K-011 does not say whose duty marking is when sessions nest. There is no delegation vocabulary. K-010 lacks its converse for active documents | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a) |
| BC-11 | Line 318: the founding plan's v1.3.0 claim, corrected at task T019, is named as the evidencing instance of amendment A4 |  |  |  |  | Seen again: RP-09 |

**Counts.** Found 6. Admitted 1: BC-07. Merged 1: BC-08. Rejected 4: BC-01, BC-02, BC-06, BC-10. Deferred 0. Seen again 5: BC-03, BC-04, BC-05, BC-09, BC-11.

**Rows argued singly.**

- BC-06: the entry states a failure of this project's
  Orchestrator, whose packet and timer are the mechanism. ET-1 decides.
- BC-07: the failure is a figure that the record names as one
  thing and that includes another. ET-1 holds, because the precondition is
  an elapsed time over a surface that waits on a person. No artifact of this
  project is needed. ET-2 holds. Part (a): a search of the rule files for
  `latency`, `wall-clock`, `elapsed` and `measure` found no rule on what a
  figure includes. Part (b): a harness that reports active time still leaves
  every figure a project computes to its own naming. ET-3 holds with the
  encounter of 2026-08-26 in the entry, and pass 5 adds a second at
  CL-01. The Backlog states the cause as a diagnosis, and an open
  entry (line 2868, "Latency comparison: local session trial") would isolate
  surface latency from process overhead. The class sentence of CR-009
  asserts no cause. Outcome: admit.
- BC-08: the lists record which tasks applied a ruling and
  restate what the journal's `precedent-applied` events hold. Nothing
  signalled the difference until the cross-check existed. The row is the
  class of CR-005, a description that disagrees with its source, in its
  second-record form. Date 2026-08-26 is that of task T004's row, the trial
  that ran the check.
- BC-10: the methodology has closed all four gaps. PRs #34 to
  #37 shipped them in v1.5.0, with three amended in adjudication. Part (a)
  of the reading of ET-2 applies, as it did to RP-11 and RP-12.
- BC-03, BC-04, BC-05, BC-09 and
  BC-11 cite rows of passes 1 and 2. They add no encounter.
  BC-09 adds no event for R7, so RR-07 stays deferred.

### Pass 4: the Backlog, Upcoming section

**Method.** The pass read the Upcoming section of `docs/backlog.md` whole at
commit `089b79c`: lines 354 to 2907, 2,554 lines, 187 entries, of which 47
are checked and 140 open. It ran the searches below over the section as
line matches, case-insensitive, and read the whole entry for every hit.
Every hit lies in an entry the whole reading had already covered.

| Phrase | Matching lines | Entries with a match |
|---|---|---|
| `missed it` | 0 | 0 |
| `tests missed` | 0 | 0 |
| `false negative` | 1 | 1 |
| `goes stale silently` | 2 | 2 |
| `found by T0` | 1 | 1 |
| `cannot fail in the environment` | 0 | 0 |
| `could never have caught` | 0 | 0 |
| `invisible to a passing` | 1 | 1 |
| `bundle guard` | 0 | 0 |
| `drift guard` | 0 | 0 |
| `$default` | 1 | 1 |
| `oscillat` | 0 | 0 |
| `ping-pong` | 0 | 0 |
| `backward` | 1 | 1 |
| `rework` | 3 | 3 |
| `correction` | 1 | 1 |
| `stale` | 15 | 12 |
| `found` | 48 | 42 |
| `defect` | 15 | 11 |

The first five phrases are the plan's. The next eight are the phrases that
the record for CR-001 lists. The last six are the phrases that pass 2 ran
over the plans. Of the 48 lines for `found`, 3 are the word "founding" and
yield nothing. The one hit for `found by T0` is the entry on
`.prettierignore` (line 2427). It records a redundant gap that no failure
has exposed, so it yields no row. The hit for `false negative` and the hit
for `invisible to a passing` are in entries that CR-001 already holds as
encounters. The hits for `goes stale silently` are in the entry on the common risk
catalogue (line 901) and the entry on service lint hygiene (line 1219). The
title of the entry for N6 (line 2414) wraps across two lines, so the line
match missed it. The whole reading covered it. The entries that yield rows
are 79 of the 187. The rest report shipped work,
state a work item or a wish, or record a gap in this project's process text
without a failure, and yield none.

| Label | Candidate as its source states it | ET-1 | ET-2 | ET-3 | ET-4 | Outcome |
|---|---|---|---|---|---|---|
| BU-01 | Line 356, "P1-N014 specified, 2026-10-29 (T046)": `orchestrator-v1.md` claimed a v1.4.0 pin, and the Classification pins 1.6.0. Corrected in the node's execute | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-29 |
| BU-02 | Line 356: the register's P1-N014 line reads `specified`, where the older Backlog entry said `identified` | Holds | Holds | Holds | Holds | Merge, CR-005, same investigation as BU-01 (task T046). Adds an instance, no encounter |
| BU-03 | Line 379, "Migrated to methodology 1.6.0": the migration had no Backlog entry until task T046 found it and recorded it late | Holds | Holds | Holds | Holds | Merge, CR-005, same investigation as BU-01 (task T046). Adds an instance, no encounter |
| BU-04 | Line 384, "P3-N002 specified, 2026-10-29 (T043)": two plan defects, a derivation rule that yields cycles on real edges and a journal event kind placed in the wrong child | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-05 | Line 422, "P3-N003 specified, 2026-10-29 (T044)": the parent plan's "four instances" of the execution-environment class are two independent encounters | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-29 |
| BU-06 | Line 422: the Risk register shares the Backlog's lost-update hazard under parallel dispatch |  |  |  |  | Seen again: RP-20 |
| BU-07 | Line 614, "A blind task's scratch directory is shared": reading 1's verdicts sat in the session's shared scratch directory when reading 2 ran, and task T065 left `/gates.py` outside every repository | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-08 | Generalization of BU-07: independent sessions isolated by checkout can see each other's output through other shared state | Holds | Holds | Fails, see below | Holds | Defer |
| BU-09 | Line 620, "Dispatch checks that the task's worktree exists": task T066 was dispatched before its worktree existed | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-10 | Line 637, "Re-vendor the conformance corpus into the service repository": the fixture P3-N014 adds leaves the service's vendored copy behind its source | Holds | Holds | Holds for CR-005 | Holds | Merge with exposure, CR-005 |
| BU-11 | Line 656, "Editorial pass over the plan documents to the prose rules": the plan and specification documents break P-001 to P-008 often enough that the owner could not follow them | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a) |
| BU-12 | Line 667, "Reconcile RU-016's Applied list with the plans that cite it": the list names T039, T043 and T055, while the plans of five nodes cite the ruling at planning | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-30 |
| BU-13 | Line 676, "The service repository cites a findings file its main does not hold": the service's Backlog and runbook cite `docs/findings/alias-assumptions.md`, and this Backlog says P2-N013 delivered it on a branch | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-30 |
| BU-14 | Line 687, "No committed test runs the plugin tools the way they run" |  |  |  |  | Seen again: RP-24 (N14) |
| BU-15 | Lines 710 and 726: two nodes reach the selection rule in `dispatch.md`, and two nodes edit the same six role contracts. The Orchestrator merged both sets of edits by hand |  |  |  |  | Seen again: RP-20 (N10). A merge conflict is not a lost update, so ET-3 stays unmet |
| BU-16 | Line 735, "Retiring the Ruling register's `Applied:` field": the journal cross-check failed on 2026-09-17 until five rulings' lists were updated by hand | Holds | Holds | Holds for CR-005 | Holds | Merge with exposure, CR-005. The check signalled at once, so the row is the mitigation working and adds no encounter |
| BU-17 | Line 753, "The comprehension model cannot say built but broken": a part whose nodes are all `done` reads `built` even when it does not work | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-18 | Line 783, "The omission check should read the comprehension model's parts": otherwise the catalogue acquires a fifth hand-written encoding of what a register knows | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-19 | Line 796, "Mechanizing the deterministic half of the class-to-instance check": mechanizing a judgment produces a tool that asserts a cause it did not test, which is R16 | Holds | Holds | Holds for CR-004 | Holds | Merge with exposure, CR-004 |
| BU-20 | Line 821, "Criterion I8's corpus figure is ambiguous": the Cost log's 38 rows and the journal's 39 task results give two readings of one count | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-21 | Line 832, "Parallel dispatch collides with the single-Backlog write": two roles running at once both append, and the second write silently drops the first |  |  |  |  | Seen again: RP-19 and RP-20 (N10) |
| BU-22 | Line 855, "The comprehension model": the plan's earlier default of no K-003 amendment was superseded by the owner's override and "corrected here 2026-10-29 on P3-N006's finding" | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a) |
| BU-23 | Line 901, "The common risk catalogue": a local duplicate of the catalogue "would instantiate the catalogue's own 'a copy goes stale silently' class" |  |  |  |  | Seen again: RR-18 (N6) |
| BU-24 | Line 941, "Sequence mode: run it": W-001's "landing summary" has no local referent, and the owner's Asks clarification removes a stop unless another condition catches it | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-25 | Line 1030, "The Backlog carries two open entries for P3-N001, one of them stale": the sketch entry still describes the plan as `draft` with three chunks | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-17 |
| BU-26 | Lines 1062, 1287, 2220, 2450 (iii), 2479 and 2487: the `specify`, `break down` and `plan` packet rows omit documents that tasks keep needing |  |  |  |  | Seen again: RR-06 |
| BU-27 | Line 1087, "'Asks' in a report means only what the reader can act on now": a report listed an open question as an ask while saying no answer was wanted | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a). The owner's clarification awaits an upstream amendment of W-008 |
| BU-28 | Line 1115, "Six dangling links inside verbatim upstream quotations": byte-exact quotations carry the methodology's repo-relative links, which cannot resolve here | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a). A change to the link checker in methodology-tools removes it |
| BU-29 | Line 1154, "Chunk-1 child: service repository bootstrap": the `mtool` form audit and link check could not run, because dispatch environments hold no `mtool`. The new Classification's cross-repo links point at `blob/main` of this repository, which has no `main`, and dangle | Holds | Holds | Holds | Holds | Admit, [CR-010 (a task depends on a fact about its environment that nobody checked)](proposals/common-risk-catalogue.md#cr-010). Encounter 2026-08-27, dated by Cost log row T007 |
| BU-30 | Line 1173, "Chunk-1 child: reachability slice": the first deploy answered 404 on every path |  |  |  |  | Seen again: CR-001, encounter 2026-08-27 |
| BU-31 | Line 1173: `esbuild` must sit in `dependencies`, or SAM's isolated build sandbox cannot see it | Holds | Holds | Holds for CR-001 | Holds | Merge with exposure, CR-001 |
| BU-32 | Line 1219, "Service repo lint hygiene: ignore `.aws-sam/`": the assignment was made against a stale reading of the service repository |  |  |  |  | Seen again: RP-14 (N6) |
| BU-33 | Line 1274, "`plan_read` passes through a stage outside the lifecycle vocabulary": the service parser accepts a stage the form checker rejects |  |  |  |  | Seen again: RP-01 |
| BU-34 | Line 1274: the Implementer chose the pass-through silently, where the question should have returned as `needs-judgment` | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1. R4 states the same failure (RR-04) |
| BU-35 | Line 1308, "`sam validate --lint` and `sam build` for the P2-N009 template changes": the dispatch environment holds no SAM CLI, so the template was checked as YAML and through an equivalent `esbuild` bundle | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-08-29, dated by Cost log row T010 |
| BU-36 | Line 1313, "Keep the service repo's register fixture in sync": the fixture is a byte copy of this repository's register and "will drift silently" | Holds | Holds | Holds for CR-005 | Holds | Merge with exposure, CR-005 |
| BU-37 | Lines 1321, 2680 and 2852: three entries stayed open after their work shipped, and the service review of task T051 found them: P1-N009 at `specified`, the service-side adoption of the shared grammar, and CI for the service | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-29. One investigation, so one encounter |
| BU-38 | Line 1321, "Plugin tooling on the portfolio stack": specifying found that `sync_agents` cannot be ported after the cutover, because `CLAUDE.md` names it | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-39 | Line 1450, "`journal_tail`'s duplicate-ID behaviour changed in the port": the Python keeps the last occurrence of a repeated node ID, and the TypeScript port through the shared unit keeps the first | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-08-30, dated by Cost log row T014 |
| BU-40 | Line 1475, "A JSON configuration file cannot carry a required comment": a criterion asked for a comment in a file that has no comment syntax | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-41 | Lines 1483, 1547 and 1558: `test/plan-register.test.ts` froze a snapshot of the live register and broke at every acceptance |  |  |  |  | Seen again: RP-04 (CR-007, encounter 2026-08-30) |
| BU-42 | Line 1595, "The form checker on the shared unit": a port bug, an early `path.resolve()` that would have changed every finding's printed path, caught by the differential harness before it shipped | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-43 | Line 1679, "Preserved deviation": `form_check` never checks that a Backlog entry's stage designation matches the register's where a Workflow is declared. The invariant has two clauses, and the checker implements one | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-44 | Line 1731, "The Cost log's sequentiality check cannot tell a gap in flight from a gap forever": a warning that fires routinely gets ignored, and a permanent gap hides in the transient noise | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| BU-45 | Generalization of BU-44: a check whose warning fires routinely hides the one real finding among the routine ones | Holds | Holds | Fails, see below | Holds | Defer |
| BU-46 | Line 1773, "Methodology amendments for delegated, multi-agent work drafted": the four gaps of amendments A1 to A4 |  |  |  |  | Seen again: BC-10 |
| BU-47 | Line 1825, "The portfolio register's row for this project is stale" |  |  |  |  | Seen again: RP-13 |
| BU-48 | Line 1870, "Bare methodology identifiers in the six contracts": W-002, W-003, W-006, R1, R4 and R5 appear without their names | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a). P-004 already binds it |
| BU-49 | Line 1894, "Methodology citations in the process spec point at the superseded pin": nine links target the `v1.3.0` tag after the pin moved to 1.4.0 | Holds | Holds | Holds | Holds | Merge, CR-005, same investigation as RP-09 (the planning of P1-N014). Adds an instance, no encounter |
| BU-50 | Lines 1926, 1943 and 2200: the bundle could not load under ESM and the import check was a false negative. `plan_lease_release` failed against real DynamoDB |  |  |  |  | Seen again: CR-001, encounter 2026-09-01 (two encounters) |
| BU-51 | Line 1960, "Deploy the service from CI on merge": a deploy took the service down, and nothing noticed until a session called the endpoint | Holds | Holds | Holds | Holds | Admit, [CR-011 (a deployed service fails and nothing notices)](proposals/common-risk-catalogue.md#cr-011) |
| BU-52 | Line 1960: four distinct deploy defects on the way to the first green run |  |  |  |  | Seen again: CR-001, encounter 2026-09-06 |
| BU-53 | Line 2033, "Alias assumptions verified against AWS documentation": the environment's egress policy denied `docs.aws.amazon.com`, so no role could read the documentation the criteria require it to cite. Blocked 2026-09-01 before dispatch | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-09-01 |
| BU-54 | Line 2126, "Deploy, smoke and promote on merge to main", task T033: the plan's text of owner action O7 was too narrow, because the template resolves two Secrets Manager references and not one | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-01 |
| BU-55 | Line 2126, task T034: the trust-policy section of the deploy role's document reasoned that the repository predated the immutable-claims cutoff. It was created 2026-08-26, so the reasoning was wrong and is corrected and dated | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-02 |
| BU-56 | Line 2176, "Continuous monitoring for the service, between deploys": nothing catches breakage that arrives between deploys, such as an expired credential or a revoked App installation | Holds | Holds | Holds for CR-011 | Holds | Merge with exposure, CR-011 |
| BU-57 | Line 2185, "Continuous integration for this coordinating repository": `form_check` and the `mtool` audit run only when a role session remembers to run them | Holds | Holds | Fails, see below | Holds | Defer |
| BU-58 | Line 2240, "Plan nodes have no way to state a dependency": the default "earlier siblings `done`" would have held P2-N012 behind an unrelated node | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-59 | Line 2277, "The session's AWS environment variables are placeholders, not credentials": variables that look like credentials contradicted the premise that no dispatched session holds AWS access. One authorized call showed the premise held | Holds | Holds | Holds for CR-010 | Holds | Merge with exposure, CR-010. The premise was checked, so the row is the mitigation working |
| BU-60 | Line 2295, "A journalled dispatch is not evidence that a task was dispatched": the Orchestrator wrote task T034's `dispatched` event and told the owner it was running before the launch, which had been skipped | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-61 | Generalization of BU-60: a record of an action is written before the action, and is read as evidence that the action happened | Holds | Holds | Holds | Holds | Admit, [CR-012 (a record is written before the action it records)](proposals/common-risk-catalogue.md#cr-012). Encounter 2026-09-02 |
| BU-62 | Line 2311, "A session cannot tell a missing service from an unreachable one" |  |  |  |  | Seen again: RR-24 |
| BU-63 | Line 2325, "The no-retry rule has never been tested against a service that answers badly": both R12 cases remove the capability outright, so not retrying took no discipline |  |  |  |  | Seen again: RR-21 (CR-001, encounter 2026-09-07) |
| BU-64 | Line 2335, "`enlistment.md` tells a session what to do and leaves a person guessing": steps a person performs name no command | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-65 | Line 2335: the R12 exercise asks a session for a startup timing that no session can produce |  |  |  |  | Seen again: RR-23 |
| BU-66 | Line 2335, "Third failure, 2026-09-07": the Orchestrator gave an owner on Windows a Unix-shaped timing command without checking the platform. It hung on the working branch and cost five minutes | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-09-07 |
| BU-67 | Line 2365, "The form checker does not check a plan or specification's Status against its node's stage": a specification sat at `Status: draft` for three weeks after its gate | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a). K-007 requires the Status transitions |
| BU-68 | Line 2383, "Project comprehension and continuous implementation sketched and planned": the first draft was written without reading Allegro, because no `add_repo` tool was available. Reading it later changed the plan | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-09-16 |
| BU-69 | Line 2400, "The Orchestrator cannot delete a remote branch": `git push --delete` returned HTTP 403, and three scratch branches are stranded | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-09-16 |
| BU-70 | Line 2414, "A Backlog entry describing another repository goes stale silently" |  |  |  |  | Seen again: RP-14 (N6) |
| BU-71 | Line 2433, "No workflow linter is available to sessions authoring workflows": task T031 validated the project's first workflow as YAML plus a manual read, because no `actionlint` exists on the machine | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-09-01, dated by Cost log row T031 |
| BU-72 | Line 2442, "The selection rule is restated outside P3-N009's four statements": `dispatch.md` and an agent contract restate "earlier siblings `done`" | Holds | Holds | Holds for CR-005 | Holds | Merge with exposure, CR-005 |
| BU-73 | Line 2450 (i), "Process spec maintenance": W-006 requires a merged branch to be deleted, and ten merged branches survived until the owner cleared them | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-74 | Lines 2499 and 2513: a file with NUL bytes read as binary and ripgrep dropped it from searches, and the proposal that a checker assert every source file reads as text |  |  |  |  | Seen again: RP-22 and RP-23 (N12, N13) |
| BU-75 | Line 2534, "Additions to spec C2's permitted set": present-tense claims in the ported tools "were false the moment the cutover landed" |  |  |  |  | Seen again: RP-12 |
| BU-76 | Line 2576, "A `needs-judgment` return leaves its cost unrecorded": task T017 consumed about 253k tokens and produced no Cost log row | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| BU-77 | Line 2592, "Orchestrator brief defect": the T017 packet said "all five test files" when there are four | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-08-30, dated by Cost log row T018 |
| BU-78 | Line 2701, "`node` became a runtime assumption where `python3` was" |  |  |  |  | Seen again: RR-13 and RP-02 (N8) |
| BU-79 | Line 2745, "Chunk-1 child: degrade to git-only": three client reconnects read as a violation of "does not retry" until the rule was stated as governing the session and not the transport | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |

**Counts.** Found 58. Admitted 3: BU-29, BU-51, BU-61. Merged 27: BU-01, BU-02, BU-03, BU-05, BU-10, BU-12, BU-13, BU-16, BU-19, BU-25, BU-31, BU-35, BU-36, BU-37, BU-39, BU-49, BU-53, BU-54, BU-55, BU-56, BU-59, BU-66, BU-68, BU-69, BU-71, BU-72, BU-77. Rejected 25: BU-04, BU-07, BU-09, BU-11, BU-17, BU-18, BU-20, BU-22, BU-24, BU-27, BU-28, BU-34, BU-38, BU-40, BU-42, BU-43, BU-44, BU-48, BU-58, BU-60, BU-64, BU-67, BU-73, BU-76, BU-79. Deferred 3: BU-08, BU-45, BU-57. Seen again 21: BU-06, BU-14, BU-15, BU-21, BU-23, BU-26, BU-30, BU-32, BU-33, BU-41, BU-46, BU-47, BU-50, BU-52, BU-62, BU-63, BU-65, BU-70, BU-74, BU-75, BU-78.

**Rows argued singly.**

- BU-01, BU-02, BU-03: the Classification pins 1.6.0
  and records the migration of 2026-10-28. `orchestrator-v1.md` claimed v1.4.0.
  The claim is a statement about a source its document does not own, as RP-09
  is. Task T046 found all three. The definition of an independent encounter
  counts one investigation once, so BU-02 and BU-03 add
  instances and no encounter.
- BU-05: the plan counted four instances of the
  execution-environment class. The specification counted two by the
  independence rule. The Backlog entries are the source, and the plan's count
  is the description that disagreed. Task T044 found it, with the stale
  binding version of CL-22.
- BU-07 and BU-08: the stated failure is the shared
  scratch directory of this project's blind readings. ET-1 decides. The
  generalization holds ET-1, ET-2 and ET-4 and fails ET-3, because no
  reading is recorded to have used another's output. One recorded case admits
  it.
- BU-10: the vendored copy lags its source by decision. The
  drift check `sync_shared_unit.ts --check` exists, and the service does not
  run it automatically, so nothing at the service signals the lag. The row
  records no event of its own. Convention *merge with exposure*.
- BU-12 and BU-13: both are open entries dated
  2026-10-30 by tasks T054 and T055. For BU-13 the pass re-read
  the service repository at `58e6819`. `docs/findings/` does not exist there.
- BU-15: git raised the conflict and the Orchestrator kept both
  sets of edits. No update was lost, so ET-3 stays unmet for RP-20. The row
  strengthens the exposure and does not evidence the class.
- BU-16: the check signalled loudly until five lists were
  updated. CR-005's class requires that nothing signals the difference. The
  row is the mitigation working, as RR-19 is for CR-001. Convention *merge
  with exposure*.
- BU-11, BU-22, BU-27, BU-28,
  BU-48 and BU-67 reject on ET-2 by part (a) of E1's
  reading. BU-11: P-001 to P-008 already bind the prose.
  BU-22: K-010 and K-011 already bind content that a recorded
  decision supersedes. BU-27: W-008 at v1.6.0 lists asks as
  "decisions and actions requested of the reader" and carries no limit to what
  the reader can act on now. An amendment of W-008 removes the failure for
  every project, and P3-N016 holds the upstream half. BU-28: a
  change to the link checker in methodology-tools removes it, and the entry
  says it was raised there. BU-48: P-004 already requires names.
  BU-67: K-007 already requires the Status transitions. All six rows
  turn on part (a). If the owner strikes part (a) at the P3-N003 gate, these
  rows and the rows of pass 5 that cite A4 need a second look, and finding S4
  says why.
- BU-34: R4 (role overreach) states the same failure, and
  RR-04 rejected it on ET-1.
- BU-29, BU-35, BU-53, BU-71,
  BU-66, BU-68 and BU-69: each is a task
  that needed something its environment lacked, found by a different task on
  a different day. The entry test for the class is argued under *The classes
  the passes admitted*. The Backlog entries of BU-29,
  BU-35 and BU-71 carry no date, so the encounters
  take the date of the Cost log row of the task named in the row.
- BU-59: the premise that no dispatched session holds AWS
  access held. One authorized call checked it. The row is CR-010's mitigation
  working. Convention *merge with exposure*.
- BU-51 and BU-56: the outage of 2026-09-01 is also
  CR-001's encounter of that date, through its ESM defect. The failure here
  is a different one: the deploy broke the service and no check noticed. The
  two failures of one incident are stated apart, as RR-25 stated two failures
  of R16's incident. BU-56 states the class for the time between
  deploys and records no event of its own.
- BU-60 and BU-61: the stated failure needs
  this project's Orchestrator and journal. The generalization needs only a
  record written ahead of the act it records.
- BU-44, BU-45: the stated failure needs the
  Cost log and its task IDs. The generalization holds ET-1, ET-2 and ET-4.
  ET-3 fails: the standing warning about task T017 is a true finding, and the
  entry on line 2576 says it is not noise. No finding is recorded to have
  been hidden by routine warnings.
- BU-57: ET-3 fails, because no defect is recorded to have
  shipped for want of a run of the checks. The dangling links of
  BU-29 shipped because the tool was absent, which is CR-010's
  cause.
- BU-39: the Python and the TypeScript port of a shared grammar
  differ for a repeated node ID. This is CR-005's second-implementation form.
  The differential diff of task T014 found it, which differs from RP-01,
  found at the acceptance of task T010. Date 2026-08-30 is that of row T014.
- BU-37: one service review found three entries open after their
  work shipped. One investigation counts once.
- BU-77, BU-54, BU-55: a brief or a plan states
  something that its source does not hold. These claims were wrong when
  written. CR-005's class sentence and reaches line cover "briefs that repeat
  a claim", and RP-01 is a second implementation that was never in step.
- BU-49: the same investigation as RP-09, the planning of P1-N014.
  The row adds an instance and no encounter.
- Seen-again rows cite their first row and add nothing. BU-63
  extends RR-21, which the sweep for CR-001 counts under the R12 exercise.

### Pass 5: the Cost log, notes column

**Method.** The pass read the notes column of every row of `docs/cost-log.md`
whole at commit `089b79c`: 74 rows, T001 to T075 with no row for T017, which
returned `needs-judgment`. It ran no search. It read each note for a passage
that records something that went wrong. The rows below cite the notes of 52 rows by task ID.
The other notes report tokens, tool calls, wall-clock, commits and packet
widenings, and yield none.

| Label | Candidate as its source states it | ET-1 | ET-2 | ET-3 | ET-4 | Outcome |
|---|---|---|---|---|---|---|
| CL-01 | Row T001: the elapsed time "spans the design conversation rather than agent work" | Holds | Holds | Holds | Holds | Merge, CR-009, encounter 2026-08-25 |
| CL-02 | Row T004: about 110 minutes of wall-clock for about 68k tokens |  |  |  |  | Seen again: BC-07 |
| CL-03 | Rows T005, T006, T011, T012, T020 and T028: briefs and packets that omitted a document the task needed, or invited work ahead of its stage. T012 counts the seventh firing of R6 |  |  |  |  | Seen again: RR-06 |
| CL-04 | Row T009: rework after the first backward transition, the 404 on every path |  |  |  |  | Seen again: CR-001, encounter 2026-08-27 |
| CL-05 | Rows T010, T024, T030 and T039: a subagent's self-reported model was contradictory, inconsistent with the tier dispatched, or different from the pin, and a role's count of its tool calls differed from the harness's | Holds | Fails (A5) | Holds | Holds | Reject, ET-2. Turns on part (b) |
| CL-06 | Rows T002 to T075: the harness reported no input and output split, only a running total, a remaining-budget counter or nothing. The `input tok` and `output tok` columns read `n/a` | Holds | Fails (A5) | Holds | Holds | Reject, ET-2. Turns on part (b) |
| CL-07 | Rows T015 and T016: T015 found `test/plan-register.test.ts` broken by the Orchestrator's own acceptance commit. T016 found the duplicate-ID divergence and the `path.resolve()` port bug |  |  |  |  | Seen again: RP-04, BU-39 and BU-42 |
| CL-08 | Row T018: the redispatch of task T017, which returned `needs-judgment` and cost about 253k tokens with no row of its own |  |  |  |  | Seen again: BU-76 |
| CL-09 | Row T019: the founding plan claimed a v1.3.0 pin in two places, and the Classification has said 1.4.0 since 2026-08-30 |  |  |  |  | Seen again: RP-09 |
| CL-10 | Row T022: the Write tool refused a file whose name contains "report", "apparently a path heuristic"; the role routed around it with a heredoc | Holds | Fails (A5) | Holds | Holds | Reject, ET-2. Turns on part (b) |
| CL-11 | Row T025: the Orchestrator's brief said two Backlog entries existed in the service repository, and the Orchestrator had written them in this one | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-01 |
| CL-12 | Rows T026 and T027: the reserved-word defect on the first call to the production lease table, and the suspicious package met while hunting a reserved-word list (R14) |  |  |  |  | Seen again: CR-001, encounter 2026-09-01, and RR-14 |
| CL-13 | Row T031: the lint-gap claim in the brief was stale, and `api.github.com` was unreachable, so action SHAs came from `git ls-remote` |  |  |  |  | Seen again: RP-14, and BU-71 for the unreachable host (same task, so an instance of that encounter) |
| CL-14 | Row T035: neither the Service Authorization Reference nor the SAM permissions page documents a `transform` resource type, so the missing grant is evidenced only by the runtime denial |  |  |  |  | Seen again: CR-001, encounter 2026-09-06 |
| CL-15 | Row T036: the brief said `AWS::Lambda::Permission` has no CloudFormation property for `lambda:InvokedViaFunctionUrl`, and the resource reference documents it | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-06 |
| CL-16 | Row T037: the revert branch would not have reverted anything, because a branch cut before a change makes no change to that line. The Orchestrator found it by simulating the merge | Holds | Holds | Holds for CR-001 | Holds | Merge with exposure, CR-001. The simulation caught it before use, so the row is the mitigation working |
| CL-17 | Row T037: the deliberate-failure message would have read "returned 200, expected 200", which reads as a smoke-test bug | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| CL-18 | Row T038: the brief's cited precedent did not resolve, because the placeholder it pointed at had been filled in | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-09-07 |
| CL-19 | Row T042: the owner's Asks clarification removes a sequence stop |  |  |  |  | Seen again: BU-24 |
| CL-20 | Row T043: two plan defects, a derivation rule that yields cycles and a journal event kind in the wrong child |  |  |  |  | Seen again: BU-04 |
| CL-21 | Row T044: the plan's Status line stayed stale after its gate | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a). K-007 requires the Status transitions |
| CL-22 | Row T044: the binding version in `CLAUDE.md` was stale | Holds | Holds | Holds | Holds | Merge, CR-005, same investigation as BU-05 (task T044). Adds an instance, no encounter |
| CL-23 | Row T046: `orchestrator-v1.md` claims a v1.4.0 pin, the Backlog's P1-N014 entry lags the register, and `dispatch.md`'s handoff contract lacks the Terms introduced line |  |  |  |  | Seen again: BU-01 and BU-02. The third finding is P1-N014's work and records no failure |
| CL-24 | Row T047: criterion G5 was untested because `vitest` was absent, and G3 ran by script because `mtool` was absent | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-10-29 |
| CL-25 | Row T048: the stale comprehension-model Backlog entry was corrected at acceptance. The breakdown's child A edge list missed the spec-header modification |  |  |  |  | Seen again: BU-25 for the entry. The edge list is this project's plan defect and rejects on ET-1 (A1) as BU-04 does |
| CL-26 | Row T049: two located findings, on the parent specification's step 1 and on the Backlog's Completed convention | Fails (A1) | Holds | Fails (A2) | Fails (A3) | Reject, ET-1 |
| CL-27 | Row T051: the service review's housekeeping fixed seven of eight findings and closed four further Upcoming entries |  |  |  |  | Seen again: BU-37 |
| CL-28 | Row T053: the central plan document found three roadmap decisions missing from the register and five stale texts | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-29 |
| CL-29 | Row T054: the README's pin was stale, found and corrected at acceptance | Holds | Holds | Holds | Holds | Merge, CR-005, same investigation as BU-12 (task T054). Adds an instance, no encounter |
| CL-30 | Row T055: one contradiction located in the service repository |  |  |  |  | Seen again: BU-13 |
| CL-31 | Rows T056, T061 and T064: defects in this project's own predicate drafts, a status-token defect and self-contradictions of draft 3, found by the pre-pass and the readings | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |
| CL-32 | Rows T057, T058, T073, T074 and T075: plan and process text that contradicts a recorded decision, found and marked or corrected at acceptance. T057 found unmarked pre-override K-003 passages, T058 a check text from before the refinement, T073 and T075 text struck by the owner, T074 four contradictions of RU-016 and other rulings | Holds | Fails (A4) | Holds | Holds | Reject, ET-2. Turns on part (a). K-010 and K-011 already bind them |
| CL-33 | Rows T065, T066 and T067: a stray `/gates.py`, a dispatch before the worktree existed, and blindness that holds on the commit graph only |  |  |  |  | Seen again: BU-07 and BU-09 |
| CL-34 | Row T069: `plan.md`'s No-plan-yet list was stale, corrected at acceptance | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-30 |
| CL-35 | Row T070: the E1 branch merged with conflicts against P3-N014, resolved by keeping both |  |  |  |  | Seen again: BU-15 |
| CL-36 | Row T072: `npm test` was unrun in the worktree and passed on the Orchestrator's run after the merge | Holds | Holds | Holds | Holds | Merge, CR-010, encounter 2026-10-30 |
| CL-37 | Row T073: the plan found a stale lease-release Backlog row, open after the fix of 2026-09-01 | Holds | Holds | Holds | Holds | Merge, CR-005, encounter 2026-10-30 |
| CL-38 | Row T075: a register deadlock between P2-N003 and P2-N006, broken by a note on P2-N006 | Fails (A1) | Holds | Holds | Fails (A3) | Reject, ET-1 |

**Counts.** Found 21. Admitted 0. Merged 12: CL-01, CL-11, CL-15, CL-16, CL-18, CL-22, CL-24, CL-28, CL-29, CL-34, CL-36, CL-37. Rejected 9: CL-05, CL-06, CL-10, CL-17, CL-21, CL-26, CL-31, CL-32, CL-38. Deferred 0. Seen again 17: CL-02, CL-03, CL-04, CL-07, CL-08, CL-09, CL-12, CL-13, CL-14, CL-19, CL-20, CL-23, CL-25, CL-27, CL-30, CL-33, CL-35.

**Rows argued singly.**

- CL-01: the note says the elapsed time spans the design
  conversation. The figure is CR-009's class, found in a record rather than a
  reader's mistake. It is the second encounter, dated 2026-08-25.
- CL-05: a model's report of its own model, or of its own tool
  calls, is wrong or absent. The Cost log's own notes record that the project
  took the tier from the dispatch, not from the self-report. A harness that
  reports the model it served removes the need to ask the role. Part (b) of the reading applies, as it did to RR-22. The row
  turns on part (b).
- CL-06: the `input tok` and `output tok` columns read `n/a` in all 74 rows.
  The notes give the reason. The harness reported a running total, a
  remaining-budget counter or nothing. The figure is the harness's to report,
  so part (b) applies. The row turns on part (b).
- CL-10: the role named the cause as "apparently a path heuristic",
  which no test confirmed. The refusal is the harness's behavior. Part (b)
  applies.
- CL-11, CL-15, CL-18: briefs written by the
  Orchestrator that state something the source does not hold. Each task found
  its own. They are separate investigations, and each is an encounter of
  CR-005.
- CL-16: the simulation of the merge caught a revert branch that
  would have reverted nothing, before anyone relied on it. CR-001's
  mitigation is to prove a check able to fail. The row is that mitigation
  working. Convention *merge with exposure*.
- CL-21 and CL-32: K-007, K-010 and K-011 already bind
  them. Both rows turn on part (a).
- CL-22, CL-29: the same investigation as a row of pass 4,
  so each adds an instance and no encounter.
- CL-24 and CL-36: the missing `vitest` and `mtool`, and
  the unrun `npm test` in a worktree, are CR-010's class. Two tasks on two
  days.
- CL-13 cites two rows. The unreachable host belongs to task T031,
  whose encounter BU-71 already records.

### The classes the passes admitted

Each table answers the four conditions in full. The relation to the
named candidate is stated where the plan asks for it.

**CR-002, an agent adopts a package it found by searching** (RR-14, N2).

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is an agent that searches a public registry for a package. No artifact of this project is needed. |
| ET-2 | Holds. Part (a): a search of the rule files for `supply`, `dependen` and `untrusted` found no rule on dependencies that an agent chooses. [S-001 (no secrets in repositories, ever)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/security.md#s-001--no-secrets-in-repositories-ever) and S-002 (exposure means rotate and purge, immediately) cover secrets. Part (b): a hostile package stays a hazard whatever a registry or the methodology changes. |
| ET-3 | Holds. One encounter, 2026-09-01, in R14. Task T027 of node P2-N010 met the package. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-003, fetched content carries an instruction for the agent** (RR-15, N3).
The plan asks whether R14's class states it too. It does not. CR-002 states
that an agent adopts code it found. CR-003 states that an agent follows prose
it read. R15 calls itself R14's sibling, and the two differ in the object
(a package against an instruction), in the reach (dependency steps against
every fetch) and in what the encounter evidences. One encounter does not
evidence the other. The catalogue keeps two entries, so that the check can
argue each class from its own reaches line.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is an agent that reads content its project does not author. |
| ET-2 | Holds. Part (a): the rule files hold no rule on instructions in fetched content. Part (b): hostile prose in a page stays a hazard whatever any page's author does. |
| ET-3 | Holds. One encounter, 2026-09-01, in R15. Task T030 of node P2-N013 fetched the AWS page. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-004, a diagnostic names a cause it did not test** (RR-16, N4, with RR-25).

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is diagnostic output that names a cause. The preflight workflow and AWS appear in the encounter, not in the precondition. |
| ET-2 | Holds. Part (a): the rule files hold no rule on diagnostics. Part (b): a provider repairing one error text leaves every other provider and every project's own check output. |
| ET-3 | Holds. One encounter, 2026-09-04, in R16. It covers both failures of the entry, because one set of three runs found both. |
| ET-4 | Holds with `[C1+]`. The plan requires the header to admit the service repository, where the preflight ran. See the header table below. |

**CR-005, a copy or description disagrees with its source, unseen**
(RR-18, with RP-01, RP-06, RP-09, RP-10, RP-13, RP-14 and the seen-again
rows). The stated forms of R5 and R10 are rejected on ET-1. The
generalization is a different failure. It is not that the orchestration
service diverges from git. It is that a copy diverges from its source with
nothing to say so.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a document that states or copies content another document or repository holds. Registers appear in the encounters only. |
| ET-2 | Holds. Part (a): [K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable) and K-011 (found contradictions are marked, not routed around) bind content that contradicts a recorded decision. The block of [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables) in the bootstrap is a copy audited for drift, so the rule applies the mitigation to one text. Rule M-002 (the review-round audit and census run) has the methodology's audit refresh stale summaries in its own register. No rule asks a project to anchor a statement about another repository or to check any other copy. Part (b): the hazard stays whatever any owner does. |
| ET-3 | Holds. Four independent encounters from passes 1 and 2, in the first table below. Passes 3 to 5 add 17, in the second table. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

| Date | Defect | Found by |
|---|---|---|
| 2026-08-29 | A service parser accepts a stage that the form checker rejects | The acceptance of task T010, plan-state read (node P2-N009) |
| 2026-08-31 | The founding plan states a pin of v1.3.0 while the Classification says v1.4.0 | The planning of node P1-N014 |
| 2026-08-31 | The Portfolio register records the pin as 1.3.0 and omits the service repository | The planning of node P1-N015 |
| 2026-09-01 | The Backlog calls a gap open that another task closed six hours earlier | Task T031, pull-request checks (node P2-N014) |

Each pair differs in defect and in the investigation that found it. The
Backlog entry "Keep the service repo's register fixture in sync" warns
that a fixture copy "will drift silently". It records no drift, so it is
not an encounter. Row BU-36 cites it again as an exposure.

Passes 3 to 5 add 17 encounters. Each pair differs in defect and in the
task or review that found it. Rows that a task found together with another
row of the same task add an instance and no encounter: BU-02, BU-03, CL-22, CL-29 and BU-49.

| Date | Defect | Found by |
|---|---|---|
| 2026-08-26 | The Ruling register's `Applied:` lists were not kept in step with the journal's `precedent-applied` events | The cross-check added after trial 4 (BC-08) |
| 2026-08-30 | The Python `journal_tail` keeps the last of two nodes with one ID, and its TypeScript port keeps the first | The byte-for-byte diff of task T014 (BU-39) |
| 2026-08-30 | The brief of task T017 counted five test files where four exist | Task T017, reconciling its packet (BU-77) |
| 2026-09-01 | The plan's text of owner action O7 named one Secrets Manager reference where the template resolves two | Task T033 (BU-54) |
| 2026-09-01 | The brief of task T025 placed two Backlog entries in the service repository, where they were written in this one | Task T025 (CL-11) |
| 2026-09-02 | The deploy role's document reasoned that the repository predated an immutable-claims cutoff, and it was created 2026-08-26 | Task T034 (BU-55) |
| 2026-09-06 | The brief of task T036 said a CloudFormation property does not exist, and the resource reference documents it | Task T036 (CL-15) |
| 2026-09-07 | The brief of task T038 cited a precedent whose placeholder had since been filled in | Task T038 (CL-18) |
| 2026-09-17 | A sketch entry in the Backlog still described the P3-N001 plan as `draft` with three chunks | The specify stage of P3-N001 (BU-25) |
| 2026-10-29 | `orchestrator-v1.md` claimed a v1.4.0 pin, and the Backlog's P1-N014 entry lagged the register | Task T046 (BU-01) |
| 2026-10-29 | The parent plan counted four instances of one class where the Backlog holds two independent encounters | Task T044 (BU-05) |
| 2026-10-29 | Three Backlog entries stayed open after their work shipped | The service review of task T051 (BU-37) |
| 2026-10-29 | Three roadmap decisions were missing from the register, and five texts were stale | Task T053 (CL-28) |
| 2026-10-30 | The `Applied:` list of RU-016 omitted the plans that cite the ruling | Task T054 (BU-12) |
| 2026-10-30 | The Backlog and the service's runbook cite a findings file that the service's `main` does not hold | Task T055 (BU-13) |
| 2026-10-30 | `plan.md`'s No-plan-yet list was stale | Task T069 (CL-34) |
| 2026-10-30 | A Backlog row for the lease-release defect stayed open after the fix | Task T073 (CL-37) |

The class now holds 21 independent encounters. All 17 that passes 3 to 5
add are statements in this project's documents or briefs, found by its own
tasks. Finding S5 records what that means for the entry's table.

**CR-006, a rule meets contrary guidance where it applies** (RR-27, N5).
The stated failure, RR-17, is rejected on ET-2. The generalization is the
hazard that stays whatever the harness says. Its one encounter is the
event of RR-17. An event can evidence a broader class than the one its
source states, and it cannot make a rejected failure admissible. For that
reason the class sentence of CR-006 names no harness notice.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a rule given to agents and a surface that gives contrary guidance. No mechanism of this project is needed. |
| ET-2 | Holds. Part (a): the rule files hold no general duty to state a rule where the agent meets it. They apply the mitigation to one rule. The Rationale of W-008 (reports map their deliverables) caches its block in the bootstrap "where it is re-read". Part (b): contrary guidance can come from any surface or page. |
| ET-3 | Holds. One encounter, 2026-09-07, in R17. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-007, a test freezes a snapshot of a document that changes by routine
operation** (RP-04). The relation to CR-005: the frozen snapshot is a copy,
and it failed loudly, not silently. The class sentence of CR-005 requires
that nothing at the place of use signals the difference, so the encounter
does not belong to it. The mitigations also differ.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a test with recorded facts of a document that changes by routine operation. The Plan register appears in the encounter only. |
| ET-2 | Holds. Part (a): [W-002 (existing tests are signals, not obstacles)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-002--existing-tests-are-signals-not-obstacles) governs when a test may change. No rule governs how a test is built. Part (b): the hazard stays in any project with a living document. |
| ET-3 | Holds. One encounter, 2026-08-30. The acceptance commits of tasks T014 and T015 broke the test in turn. They are one defect observed again, so they count once. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-008, a verification tool silently excludes part of its input**
(RP-23, N13, with RP-22, N12). P3-N010's finding stands: the encounter is
not CR-001's, because no environment differs between the check and the code.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a check that relies on a tool which leaves part of its input unread. Ripgrep appears in the encounter only. |
| ET-2 | Holds. Part (a): the rule files hold no rule on a tool's input filter. Part (b): ripgrep skips binary files by design, the cause here was a file the project wrote, and the hazard recurs in every tool with ignore rules. |
| ET-3 | Holds. One encounter, 2026-08-30. Task T017 confirmed it at the cutover of node P1-N013. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-009, a figure presented under one name includes something else**
(BC-07, CL-01).

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a figure that a record names as one measure and that also includes another, such as an elapsed time that spans a wait for a person. The Cost log, the journal and the attended surface appear in the encounters only. |
| ET-2 | Holds. Part (a): a search of the rule files for `latency`, `wall-clock`, `elapsed`, `measure` and `metric` found no rule on what a recorded figure includes. The one hit for `metric` is the motivation of a prose rule. Part (b): a harness that reports active time still leaves every figure a project computes to its own naming. |
| ET-3 | Holds. Two encounters, 2026-08-25 and 2026-08-26, one in the Cost log and one in the Backlog. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-010, a task depends on a fact about its environment that nobody
checked** (BU-29, BU-35, BU-53,
BU-71, BU-66, BU-68, BU-69,
CL-24, CL-36). The relation to CR-001: CR-001 is a check
that passes where the part fails. CR-010 is a task that cannot complete as
specified, or completes through a stand-in, because its environment lacks
something. No encounter here passed a check silently. Each task was blocked,
deferred in writing, or found out at a person's cost. A stand-in that is not
shown able to fail is a CR-001 case, so CR-010's mitigation cites it.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a task and a runner whose environment lacks a tool, a host, a permission or a platform the task assumes. `mtool`, SAM, `add_repo`, a Windows shell and a branch ruleset appear in the encounters only. |
| ET-2 | Holds. Part (a): searches of the rule files for `permission`, `egress`, `network`, `platform`, `shell`, `available` and `unreachable` found no rule on what a task's environment provides. Part (b): environments differ by project and by surface. No single change supplies every tool, host and permission that every project's tasks assume. |
| ET-3 | Holds. Nine encounters between 2026-08-27 and 2026-10-30, each by a different task. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**CR-011, a deployed service fails and nothing notices**
(BU-51, with BU-56). Two failures of one incident:
the deploy of 2026-09-01 is CR-001's encounter through its ESM defect. This
class is the second failure, that no check noticed.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a deployed service and no check that runs against it live. Lambda, API Gateway and the session that called the endpoint appear in the encounter only. |
| ET-2 | Holds. Part (a): searches of the rule files for `smoke`, `monitor`, `outage`, `health` and `deploy` found no rule on checking a live service. The hits for `deploy` are the section table of the rules README, the motivation of a secrets rule, and Q-004, which the record for CR-001 found illustrative and not live. The rules README reserves the families `D-` (delivery) and `O-` (operations) and holds no rule file for either at v1.6.0. A rule there would bind each project to act, and so would not remove the failure without action. Part (b): a service fails unnoticed whatever the methodology says, until its project runs a check against its own endpoint. |
| ET-3 | Holds. One encounter, 2026-09-01, in BU-51. |
| ET-4 | Holds with `[C1+] [deployable]`. See the header table below. |

**CR-012, a record is written before the action it records**
(BU-61, from the stated failure BU-60). The
relation to CR-005: CR-005's source is a document or a repository. This
class has an action that did not happen, and the record copies nothing.

| Condition | Answer |
|---|---|
| ET-1 | Holds. The precondition is a record written ahead of the act it records, and a reader who takes the record as evidence. The Orchestrator, the journal and the dispatch of task T034 appear in the encounter only. |
| ET-2 | Holds. Part (a): searches of the rule files for `journal`, `dispatched` and `ahead of` found no rule on when a record is written. Part (b): no harness can know when a project's own ledger is written. |
| ET-3 | Holds. One encounter, 2026-09-02, in BU-61. |
| ET-4 | Holds with `[C1+]`. See the header table below. |

**The headers.** Criterion B13 requires each header to admit every
repository where an encounter happened. The three repositories are all at
C1.

| Repository | Classification read |
|---|---|
| This repository, project-orchestrator | C1, S0, `component/library`, target `none/local` (`docs/classification.md`) |
| Service repository, project-orchestrator-service | C1, S1, `backend-service`, target `serverless-aws`, Workflow declared on 2026-09-02, at commit `58e6819` |
| Methodology repository, majodali/methodology | C1, S0, `methodology-corpus`, target `none/local`, at tag v1.6.0 |

| Class | Repositories where encounters happened | Header | Admits each |
|---|---|---|---|
| CR-002 | The service (task T027). Recorded here. | `[C1+]` | Yes |
| CR-003 | The service (task T030). Recorded here. | `[C1+]` | Yes |
| CR-004 | The service (`oidc-preflight.yml`). Recorded here. | `[C1+]` | Yes |
| CR-005 | This repository, the service and the methodology repository | `[C1+]` | Yes |
| CR-006 | This repository (cloud sessions on scratch branches of it) | `[C1+]` | Yes |
| CR-007 | This repository | `[C1+]` | Yes |
| CR-008 | This repository | `[C1+]` | Yes |
| CR-009 | This repository | `[C1+]` | Yes |
| CR-010 | This repository, and the service repository (the tasks that built it, run from sessions of this one) | `[C1+]` | Yes |
| CR-011 | The service repository (the outage of 2026-09-01). Recorded here. | `[C1+] [deployable]` | Yes for the service, whose target is `serverless-aws`. No for this repository, whose target is `none/local`, and no encounter happened here |
| CR-012 | This repository | `[C1+]` | Yes |

The tier floor is C1 for the reason that CR-001 gives. Every encounter
is at C1, and the methodology's default for an unstated header is
`[C1+]`. One class depends on a target. CR-011 carries `[deployable]`,
which is `target ≠ none/local`. Its one encounter happened in the service
repository, whose target is `serverless-aws`. The tag `[deployed]` is the
narrower choice and is rejected: the service declared `Workflow: none
declared` on 2026-09-01, so `deployed` was false when the outage happened,
and a header that excludes the project at the time of its own encounter
leaves the class inapplicable where it was evidenced. No other class
depends on a type or a target, so no narrower tag is argued. A tag such as
`[deployable]` would have excluded this repository from CR-004 and CR-005,
where it recorded encounters. The reaches line, not the header, narrows
each class to its parts.

### Deferred candidates

Six rows are deferred: RR-07, RP-05 and RP-20 from passes 1 and 2, and
BU-08, BU-45 and BU-57 from pass 4.
The catalogue's section *What this catalogue does not yet cover* lists each
with its source and the evidence that would admit it. Passes 3 to 5 read the
Backlog and the Cost log whole, and they added no encounter to the first
three. A search of the Backlog and the Cost log for `ANTHROPIC_API_KEY`,
`billing` and `API credits` found the watch item and the SDK constraint
(BC-09) and no session that billed the wrong account, so RR-07 stays
deferred. A search for `did not apply` and `failed to apply` found no failed
patch, so RP-05 stays deferred. BU-15 and CL-35
record merge conflicts that the Orchestrator resolved by keeping both sets of
edits, and no lost update, so RP-20 stays deferred.

### Named candidates: the full table

Criterion B15 asks task E2 for the full table. It lists the fourteen
candidates in the order of the plan's table, each with every row across the
five passes that bears on it and its final outcome. The rows of passes 1 and
2 are E1's. The rows of passes 3 to 5 are E2's.

| Named | Candidate | Rows | Outcome |
|---|---|---|---|
| N1 | A check that cannot fail in the environment the code runs in | Sweep record for CR-001; BU-30, BU-31, BU-50, BU-52, BU-63, CL-04, CL-12, CL-14, CL-16 | Admit, CR-001 (P3-N010). Passes 3 to 5 cite its encounters as seen again and add two instances of the mitigation working (BU-31, CL-16) |
| N2 | Dependency search as an attack surface (R14) | RR-14; CL-12 | Admit, CR-002. No new encounter |
| N3 | Fetched documentation as an instruction channel (R15) | RR-15 | Admit, CR-003. No row of passes 3 to 5 bears on it |
| N4 | A diagnostic that asserts a cause it did not test (R16) | RR-16, RR-25; BU-19 | Admit, CR-004. BU-19 adds an exposure |
| N5 | The surface's own guidance contradicting the project's rule (R17) | RR-17, RR-27; BU-62 | Stated failure rejected, ET-2. Generalization admitted, CR-006 |
| N6 | A register entry describing another repository goes stale silently | RP-14, RP-15, RR-18; BU-32, BU-70, CL-13, BU-23 | Merge, CR-005. Generalization admitted at RR-18, CR-005 |
| N7 | A projection becomes a second source of truth (R10) | RR-10, RR-18; BU-16, BU-18 | Stated failure rejected, ET-1. Generalization admitted, CR-005 |
| N8 | A tool whose runtime floor is unmet degrades silently (R13, RU-013) | RR-13, RP-02; BU-78 | Merge with exposure, CR-001 |
| N9 | A guard believed because it is present, not because it was broken | RP-18; CL-16 | Merge with exposure, CR-001 |
| N10 | A lost update on a single-writer file under parallel work | RP-19, RP-20, RP-21; BU-06, BU-15, BU-21, CL-35 | Stated failure rejected, ET-1. Generalization deferred. No lost update is recorded in passes 3 to 5 |
| N11 | An execution environment bills the wrong account (R7) | RR-07; BC-09 | Defer |
| N12 | ripgrep silently dropped a file with NUL bytes from searches | RP-22; BU-74 | Merge, CR-008 |
| N13 | A verification tool that silently excludes part of its input | RP-23; BU-74 | Admit, CR-008 |
| N14 | No committed test runs the plugin tools as `node` | RP-24; BU-14 | No candidate. An omission item at E3 under decision 3 |

### P3-N010's carry-overs

Criterion B12 asks for the disposition of each carry-over.

| Carry-over | Disposition |
|---|---|
| The two ripgrep rows | RP-22 and RP-23, as N12 and N13 above |
| The plugin-tools row | RP-24, no candidate, with the omission expected at E3. Pass 4 cites it at BU-14 |
| Shape finding 2, coverage cannot read adequacy | Decision 3 is placed in step 3 of the procedure above. E3 applies it when it runs the check |
| Shape finding 4, the header decided the run | Applied. The header table above argues each header from the repositories of its encounters |
| Shape finding 5, entries have no anchors | No change. Each encounter artifact stays a file link plus the quoted entry title, and child C pins the file |
| Shape finding 6, no counting rule for a run sequence | Decision 4 is added to the catalogue's definition of an independent encounter. CR-001's counting of the four deploy defects as one encounter now follows from the rule |
| Shape finding 7, an entry can instantiate a class without an encounter | No change. The convention *merge with exposure* above applies it |
| Shape finding 8, the service repository's Backlog | Decision 5 is placed in the inputs above. E3 reads the service Backlog at the commit the run names |

### Findings from the sweep

Task E3 carries these into the *Shape findings* section with the findings
of the full run (criterion B18).

- **S1.** The four outcomes have none for a candidate that states an
  admitted class and records no event. A merge makes the candidate an
  encounter, which needs an event. Five rows of passes 1 and 2 (RR-13, RR-19, RP-06, RP-10 and
  RP-18) and 9 rows of passes 3 to 5 (BU-10, BU-16, BU-19, BU-31, BU-36, BU-56, BU-59, BU-72, CL-16) use the convention *merge with
  exposure*. The specification could name it, or could say that such a
  candidate is not a candidate.
- **S2.** ET-2 does not say whether "upstream" includes the owner of a
  component the project runs on. The plan's table reads it as including the
  harness. The sweep states the two parts of that reading and asks for
  ratification.
- **S3.** ET-3 asks for an encounter in "this repository". Several
  encounters happened in the service repository and are recorded here only
  as Risk register entries or Backlog entries. The sweep reads the artifact
  that resolves in this repository as the encounter's record. The header
  rule of finding 4 depends on this reading.
- **S4.** Part (a) of the reading of ET-2 rejects a candidate when a rule
  of the methodology already requires the fix or the marking. ET-2 as the
  specification words it fails a candidate that one upstream change removes
  "without action by any project". A rule that binds each project to act is
  not such a change. The rows that cite A4 are BC-10, BU-11, BU-22, BU-27, BU-28, BU-48, BU-67, CL-21, CL-32. Three of
  them rest on an amendment or a tool change that removes the failure with
  no action by a project (BC-10, BU-27, BU-28).
  Six rest on a rule that exists and that projects do not follow
  (BU-11, BU-22, BU-48, BU-67, CL-21, CL-32). Under the strict wording those six pass ET-2, and
  with RP-11 and RP-12 of pass 2 they would need a class of their own,
  content that a recorded decision supersedes stays unmarked. Part (a) as
  E1 stated it decides all of them, so the owner's ruling on part (a)
  decides these eight rows. Part (b) decides CL-05, CL-06, CL-10.
- **S5.** CR-005 now holds 21 independent encounters, 17 of them from
  passes 3 to 5. The definition of an independent encounter lets every stale
  statement that a different task found count. The specification sets a
  floor of two encounters per entry and no ceiling or sampling rule. The
  catalogue's table for the class is long, and each added row is cheap to
  find in this project's Backlog and Cost log. A rule such as "list the
  first N independent encounters and count the rest" would bound the
  entry. The sweep lists all of them, because the outcome *merge* makes each
  candidate an encounter.
- **S6.** Backlog entries written before the row shape of 2026-10-29 carry
  no date in the entry. Six encounters of passes 3 to 5 take their date
  from the Cost log row of the task the entry names (BC-08, BU-29, BU-35,
  BU-39, BU-71 and BU-77). ET-3 asks for a date and an artifact
  that resolves. The artifact here does not carry its date. Finding 5 of
  P3-N010 covers the missing anchors, and this finding adds the missing
  dates. Child C's conversion could pin both.

**The methodology's own pin.** The methodology's `docs/classification.md` at
tag v1.6.0 declares its pin as 1.5.0. On the methodology's `main` it reads
1.6.0, "migrated from 1.5.0 on 2026-10-28". Task E2 read both with
`git show`. The tag was cut before the methodology bumped its own pin, so
the lag at the tag follows the release order. It is an intended lag and not
an encounter of CR-005. The methodology's Classification is also outside the
five sources.


## Parts enumeration

The enumeration is committed with the check so a reader can dispute a
part's presence or absence. It was drawn on 2026-10-30 from this
repository at commit `d1c3659`. Each part names its source. A part
added later is added with its date and source.

### Rules

- Every checked Backlog entry is read wherever it sits. At commit
  `d1c3659` there are 51: 20 under *Completed* and 31 under *Upcoming*.
  The plan counted 47 when it was written. Four entries were closed
  after that.
- By this Backlog's convention a finished child stays under *Upcoming*
  until its parent is `done`, so a read of the Completed section alone
  drops most of the service's work.
- The Plan register has 23 `done` nodes. A node and a Backlog entry
  that describe the same work are one part.
- An <a id="def-aggregate-node"></a>aggregate node is an interior
  `done` node whose children are all enumerated. It adds no part of its
  own. Three nodes are aggregates: P1-N009 (plugin tooling on the
  portfolio stack, parts PT-08 to PT-11), P2-N002 (service skeleton and
  plan state, parts PT-18 to PT-22) and P2-N012 (deploy the service from
  CI on merge, parts PT-23 to PT-26).
- A checked entry that names no node becomes a part when it delivers an
  artifact no node part holds. Otherwise it joins the nearest part.
- The standing artifact classes are the four rows SA-1 to SA-4. They
  cover what no single node delivered.
- The column *Repository* names the repository that holds the part's
  artifact: C is this repository, project-orchestrator, and S is
  project-orchestrator-service. Step 1 of the check reads the
  Classification of that repository.

### Parts

There are 30 parts: 20 from nodes, 6 from checked entries that name no
node, and 4 standing artifact classes.

| Part | Name | Source | Checked entries | Repository |
|---|---|---|---|---|
| PT-01 | Founding plan and bootstrap | P1-N002 (bootstrap and founding plan) | BE-01, BE-02 | C |
| PT-02 | Process specification, `docs/process/` | P1-N003 (process specification v1) | BE-03, BE-04, BE-10, BE-11 | C |
| PT-03 | Role definitions, `docs/process/roles.md` | P1-N004 (role definitions v1) | BE-05, BE-09 | C |
| PT-04 | Orchestrator plugin and its self-hosted enrolment, including the SessionStart billing hook | P1-N005 (plugin v1 with self-hosted trial) | BE-08 | C |
| PT-05 | Risk register, observability specification and run journal | no node | BE-07 | C |
| PT-06 | Ruling register | no node | BE-12 | C |
| PT-07 | mtool checker extension-point proposal | P1-N008 (mtool checker extension-point proposal) | BE-13, BE-14 | C |
| PT-08 | Node toolchain, shared register grammar unit and `journal_tail` | P1-N010 (Node toolchain and the shared register grammar) | BE-28, BE-30 | C |
| PT-09 | Conformance corpus, `run_corpus` and the vendoring generator | P1-N011 (the travelling package) | BE-29 | C |
| PT-10 | Form checker on the shared unit | P1-N012 (the form checker on the shared unit) | BE-31, BE-32 | C |
| PT-11 | Cutover: `sync_agents` port, moved invocation sites, retirement of the Python scripts | P1-N013 (the cutover) | BE-33, BE-43, BE-44, BE-46, BE-47 | C |
| PT-12 | Role contracts in `.claude/agents/` and their generated copy | P1-N014 (role contracts adopt the methodology's conduct rules) | BE-35 | C |
| PT-13 | Methodology amendment proposals for delegated work | P1-N015 (methodology amendments for delegated work) | BE-18, BE-34 | C |
| PT-14 | Classification, version pin and `CLAUDE.md` binding block | no node | BE-06, BE-17, BE-19, BE-21 | C |
| PT-15 | Communication-pipeline roles in `roles.md` and `dispatch.md` | no node | BE-20 | C |
| PT-16 | Orchestration-service plan and breakdown | no node (P2-N001 is `broken-down`) | BE-15, BE-16 | C |
| PT-17 | Comprehension-and-implementation plan sketch | no node (P3-N001 is not `done`) | BE-42 | C |
| PT-18 | Service repository bootstrap | P2-N007 (service repository bootstrap) | BE-23, BE-25 | S |
| PT-19 | Reachability slice: MCP server, Lambda handler, API Gateway binding, SAM template, deploy script | P2-N008 (reachability slice) | BE-24 | S |
| PT-20 | Plan-state read: register parser, `plan_read` tool, GitHub register fetcher | P2-N009 (plan-state read) | BE-26 | S |
| PT-21 | Plan-state update with the advisory lease: lease backends, write tools, vendored grammar unit | P2-N010 (plan-state update with the advisory lease) | BE-45, BE-48 | S |
| PT-22 | Degrade-to-git-only rule, enlistment documentation and the R12 exercise | P2-N011 (degrade to git-only, and enlistment documentation) | BE-49, BE-50 | C |
| PT-23 | Alias assumptions finding | P2-N013 (alias assumptions verified against AWS documentation) | BE-37 | S, see note 1 |
| PT-24 | Pull-request checks workflow | P2-N014 (pull-request checks that cannot deploy) | BE-38, BE-51 | S |
| PT-25 | Alias-aware lease-table selection and the template resources it needs | P2-N015 (alias-aware lease-table selection) | BE-39 | S |
| PT-26 | Deploy, smoke and promote workflow, OIDC preflight and deploy-role policy | P2-N016 (deploy, smoke and promote on merge to main) | BE-40, BE-51 | S |
| SA-1 | Plan register, Backlog and Cost log as documents | standing artifact class | none | C |
| SA-2 | Plans, specifications and proposals | standing artifact class | none | C |
| SA-3 | The deployed service's live surface: production endpoint, production lease table, aliases | standing artifact class | none | S |
| SA-4 | The sessions' execution surfaces: cloud web session and local terminal, with their network policy and environment variables | standing artifact class | BE-41 | C |

Note 1. The Backlog places the alias assumptions finding at
`docs/findings/alias-assumptions.md` on a service branch. The file is
absent from the service repository's `main` at commit `58e6819`. That
checkout is shallow, so this document cannot say whether the file was
ever merged.

### Checked Backlog entries and their parts

Each checked entry is labelled BE-nn in file order. The column *Line*
is the entry's first line at commit `d1c3659`.

| Label | Entry | Line | Section | Part |
|---|---|---|---|---|
| BE-01 | Bootstrap and founding plan drafted | 31 | Completed | PT-01 |
| BE-02 | Founding plan revised at owner review | 38 | Completed | PT-01 |
| BE-03 | Process specification v1 | 48 | Completed | PT-02 |
| BE-04 | Chunk-2 review revisions | 60 | Completed | PT-02 |
| BE-05 | Role definitions v1 | 75 | Completed | PT-03 |
| BE-06 | Migrated to methodology v1.3.0 | 89 | Completed | PT-14 |
| BE-07 | Failure detection and observability | 101 | Completed | PT-05 |
| BE-08 | Plugin v1 built and repo enrolled self-hosted | 114 | Completed | PT-04 |
| BE-09 | Liaison role and parallel dispatch | 157 | Completed | PT-03 |
| BE-10 | Owner-decision economics and the quiet loop | 173 | Completed | PT-02 |
| BE-11 | Trial-3 review: latency diagnosis and gate polish | 189 | Completed | PT-02 |
| BE-12 | Ruling register — precedents from gate decisions | 203 | Completed | PT-06 |
| BE-13 | `mtool` custom-type checker extension-point proposal drafted and approved | 219 | Completed | PT-07 |
| BE-14 | Trial 4 (local session) and its analysis | 250 | Completed | PT-07 |
| BE-15 | Orchestration-service plan drafted | 272 | Completed | PT-16 |
| BE-16 | Service plan approved and broken down | 299 | Completed | PT-16 |
| BE-17 | Migrated to methodology v1.4.0 | 311 | Completed | PT-14 |
| BE-18 | Upstream disposition of the P1-N015 proposals: all four accepted | 316 | Completed | PT-13 |
| BE-19 | Migrated to methodology 1.5.0; P1-N014's hold is released | 331 | Completed | PT-14 |
| BE-20 | Communication-pipeline roles proposal accepted | 342 | Completed | PT-15 |
| BE-21 | Migrated to methodology 1.6.0 | 377 | Upcoming | PT-14 |
| BE-22 | Service chunk 1 — skeleton and plan state | 953 | Upcoming | aggregate (P2-N002) |
| BE-23 | Chunk-1 child: service repository bootstrap | 974 | Upcoming | PT-18 |
| BE-24 | Chunk-1 child: reachability slice | 993 | Upcoming | PT-19 |
| BE-25 | Service repo lint hygiene: ignore `.aws-sam/` | 1039 | Upcoming | PT-18 |
| BE-26 | Chunk-1 child: plan-state read | 1054 | Upcoming | PT-20 |
| BE-27 | Plugin tooling on the portfolio stack | 1141 | Upcoming | aggregate (P1-N009) |
| BE-28 | (node P1-N010, P1-N009 child A) The Node toolchain and the shared register grammar, proven end to end by `journal_tail` | 1214 | Upcoming | PT-08 |
| BE-29 | (node P1-N011, P1-N009 child B) The travelling package: conformance corpus, recorded expectations, and the vendoring generator | 1303 | Upcoming | PT-09 |
| BE-30 | `test/plan-register.test.ts`'s live-register cross-check went stale the moment it was accepted | 1367 | Upcoming | PT-08 |
| BE-31 | [W-002 — resolved at P1-N012] `test/plan-register.test.ts` freezes a snapshot of the live register, so it breaks at every acceptance | 1378 | Upcoming | PT-10 |
| BE-32 | (node P1-N012, P1-N009 child C) The form checker on the shared unit, proven finding-for-finding against the Python | 1415 | Upcoming | PT-10 |
| BE-33 | Two further C2 permitted-set candidates, and one declined | 1573 | Upcoming | PT-11 |
| BE-34 | Methodology amendments for delegated, multi-agent work drafted | 1593 | Upcoming | PT-13 |
| BE-35 | Role contracts adopt the methodology's conduct rules | 1679 | Upcoming | PT-12 |
| BE-36 | Deploy the service from CI on merge | 1778 | Upcoming | aggregate (P2-N012) |
| BE-37 | Alias assumptions verified against AWS documentation | 1851 | Upcoming | PT-23 |
| BE-38 | Pull-request checks that cannot deploy | 1890 | Upcoming | PT-24 |
| BE-39 | Alias-aware lease-table selection, failing closed | 1912 | Upcoming | PT-25 |
| BE-40 | Deploy, smoke and promote on merge to main | 1944 | Upcoming | PT-26 |
| BE-41 | The session's AWS environment variables are placeholders, not credentials | 2107 | Upcoming | SA-4 |
| BE-42 | Project comprehension and continuous implementation sketched and planned | 2213 | Upcoming | PT-17 |
| BE-43 | `run_corpus.ts` contained NUL bytes, and ripgrep silently dropped it from searches — fixed at the P1-N013 cutover | 2330 | Upcoming | PT-11 |
| BE-44 | (node P1-N013, P1-N009 child D) The cutover: `sync_agents` ported, every invocation site moved, the Python retired, in one commit | 2414 | Upcoming | PT-11 |
| BE-45 | Service-side adoption of the shared register grammar | 2497 | Upcoming | PT-21 |
| BE-46 | P2-N002's live criteria renamed at the P1-N009 cutover (decision 14, option (a), the default) | 2509 | Upcoming | PT-11 |
| BE-47 | `node` became a runtime assumption where `python3` was — live as of the P1-N013 cutover, not just candidate | 2518 | Upcoming | PT-11 |
| BE-48 | Chunk-1 child: plan-state update with the advisory lease | 2557 | Upcoming | PT-21 |
| BE-49 | Chunk-1 child: degrade to git-only, and enlistment documentation | 2562 | Upcoming | PT-22 |
| BE-50 | Service enlistment section in the process spec | 2620 | Upcoming | PT-22 |
| BE-51 | CI for project-orchestrator-service | 2662 | Upcoming | PT-24, PT-26 |

Node mapping. The 20 non-aggregate `done` nodes map to parts as the
*Source* column shows. The three aggregates map to their children. Every
`done` node of the Plan register at commit `d1c3659` appears once.

## Run record, 2026-10-30

Role: Implementer, task T055 of node P3-N010. Class: CR-001 only.

### Run inputs

| Input | Where | Commit |
|---|---|---|
| Catalogue | `docs/proposals/common-risk-catalogue.md` | `6f5033e` |
| Risk register | `docs/open-risks.md` | `6f5033e` |
| Parts enumeration | the *Parts enumeration* section of this document | `6f5033e` |
| Classification of the service repository | `docs/classification.md` in project-orchestrator-service | `58e6819` |
| Classification of this repository (read for parts held here) | `docs/classification.md` | `6f5033e`, last changed in `45e30bd` |

The commit `6f5033e` is the first commit of node P3-N010 on its branch.
It holds the first three inputs. Nothing in the run record changes them.

### Step 1: project applicability

The header of CR-001 is `[C1+]`. The run evaluates it against each
repository that holds parts.

| Repository | Classification read | Parts held | Header admits |
|---|---|---|---|
| This repository, project-orchestrator (C) | C1, S0, `component/library`, target `none/local`, no Workflow | 21 parts: PT-01 to PT-17, PT-22, SA-1, SA-2, SA-4 | Yes. C1 meets the floor. |
| Service repository, project-orchestrator-service (S) | C1, S1, `backend-service`, target `serverless-aws`, Workflow declared | 9 parts: PT-18 to PT-21, PT-23 to PT-26, SA-3 | Yes. C1 meets the floor. |

CR-001 is applicable to the parts of both repositories. The refinement
of decision 2 changed no outcome for this class, because the header
admits both. A header of `[C1+] [deployable]` would have made it
decisive. The *Shape findings* record that.

### Step 2: reach

Every part appears below. The test is the question in CR-001's reaches
line: does the part run, or is it relied on, in an environment its
checks do not reproduce? The run found 14 parts that apply and 16 that
do not.

| Part | Result | Argument |
|---|---|---|
| PT-01 | does not apply | Founding plan and bootstrap scaffolding are text, read and never executed. |
| PT-02 | does not apply | The process specification is text read by role sessions and never executed. |
| PT-03 | does not apply | Role definitions are text read by role sessions and never executed. |
| PT-04 | applies | The SessionStart hook that carries the billing check of R7 is declared only in `plugin/hooks/hooks.json`. R9 records, at the trial of 2026-08-26, that "the plugin has never been observed loading". `.claude/settings.json` declares no hook. No committed record shows the hook running. Whether it runs on a given surface is untested here. |
| PT-05 | does not apply | The Risk register, the observability specification and the run journal are text and JSON lines. The form checker reads them in the checkout where they are written. |
| PT-06 | does not apply | The Ruling register is text. |
| PT-07 | does not apply | The extension-point proposal is text, drafted for a human to carry. |
| PT-08 | applies | The tools run as `node plugin/scripts/<tool>.ts` on every surface. The four test files in `test/` run under Vitest, and none imports `node:child_process` to run a tool. A surface with a Node older than the floor, or none, cannot run them. |
| PT-09 | applies | `run_corpus.ts` and `sync_shared_unit.ts` run as `node` scripts, and no test runs them. The drift check compares bytes inside one checkout. |
| PT-10 | applies | `form_check.ts` runs the corpus self-check in the invoking context on every run. The checker still cannot report on a surface that lacks its Node floor. |
| PT-11 | applies | `sync_agents.ts` and every moved invocation site run as `node` commands on each surface. No committed test runs them. |
| PT-12 | does not apply | Role contracts are text loaded into a role session, read in the medium where they are used. |
| PT-13 | does not apply | The amendment proposals are text. |
| PT-14 | does not apply | The Classification and the binding block are declarations read where they are written. |
| PT-15 | does not apply | The roles and dispatch text is read and never executed. |
| PT-16 | does not apply | The orchestration-service plan is text. |
| PT-17 | does not apply | The comprehension plan sketch is text. |
| PT-18 | does not apply | The scaffold is checked by running the build, lint and test commands that CI later runs. It has no artifact and no test double. |
| PT-19 | applies | The Lambda bundle and the API Gateway binding are checked by tests that import source or send synthetic events (`test/lambda.test.ts`), and by one test that imports the built bundle in a `node` subprocess (`test/lambdaBundle.test.ts`). The deploy workflow's smoke test targets the preprod Function URL, not the API Gateway endpoint that serves production. |
| PT-20 | applies | `plan_read` reads registers from GitHub through the App. Its tests inject a fake `fetchImpl` and token provider and state that they use no network or credential (`test/registerFetcher.test.ts`). The smoke test lists the tools and never calls `plan_read`. |
| PT-21 | applies | The write-tool tests use the in-memory lease backend, and the DynamoDB backend's contract test uses a fake client. The smoke test runs a lease cycle on the preprod table. It never calls `plan_update` or `plan_confirm`, which read GitHub. |
| PT-22 | applies | The R12 exercise ran in cloud sessions whose egress proxy answered an unroutable address at once. The "does not wait" case could not run to its timeout there. |
| PT-23 | does not apply | The finding is text. It states claims read from AWS documentation, and the runs of PT-25 and PT-26 exercise those claims. See note 1 of the parts table. |
| PT-24 | applies | The pull-request workflow cannot deploy by design. Build, lint, test and `sam validate --lint` run without the deploy role, so no check there can fail on an IAM, alias or function-URL defect. |
| PT-25 | applies | The lease-table selection reads the qualifier from the invoked ARN, and its tests use synthetic ARNs. The smoke test exercises the `preprod` qualifier. No step of the deploy workflow exercises the `live` qualifier's production-table path. |
| PT-26 | applies | The deploy role's policy was derived from AWS documentation, and nothing runs it except the pipeline itself. Four defects appeared only in the pipeline's first real runs. |
| SA-1 | does not apply | The Plan register, Backlog and Cost log are text. The form checker reads them where they are written. |
| SA-2 | does not apply | Plans, specifications and proposals are text. |
| SA-3 | applies | The deploy workflow runs the smoke test once, against the preprod Function URL, before the promote step. Production is reached through API Gateway bound to `live`. The workflow ends at the promote step and sends no request to the production endpoint (`deploy.yml` at `58e6819`). |
| SA-4 | applies | Checks and exercises run on a cloud web session or a local terminal, and the rules they test are relied on across both. The cloud session's egress policy and environment differ from the local one, as R12's 502 and the Backlog entry on placeholder AWS variables record. |

### Step 3: coverage

The run read the register with `grep -n 'CR-' docs/open-risks.md`. It
returned two hits, attributed to R12 and R13.

| Part | Covering entry | Argument or finding |
|---|---|---|
| PT-04 | none | No entry cites CR-001 and names the plugin or its hook. |
| PT-08 | R13 | R13 names the tooling's move to `node` and its preflight criterion for the three tools. `journal_tail` and the preflight are in those tools. |
| PT-09 | R13 | R13 names the P1-N009 rewrite (plugin tooling on the portfolio stack). PT-09 is a child of it, and its scripts run under the same Node floor. This argument is wider than R13's named tools. |
| PT-10 | R13 | R13 names the form checker. |
| PT-11 | R13 | R13 names every invocation site that the cutover moves, and `sync_agents` is one of the three tools. |
| PT-19 | none | R12 treats the service as a black box whose outage is tolerated. Its scope is the stoppage and the fallback rule, so the run does not argue it contains the service's parts. |
| PT-20 | none | Same finding as PT-19. |
| PT-21 | none | Same finding as PT-19. R10 names the lease table but does not cite CR-001. |
| PT-22 | R12 | R12 names node P2-N011 and the exercise. |
| PT-24 | none | No entry cites CR-001 and names the pull-request checks. |
| PT-25 | none | No entry cites CR-001 and names the alias-aware selection. |
| PT-26 | none | No entry cites CR-001 and names the pipeline or the deploy role. |
| SA-3 | none | No entry cites CR-001 and names the production surface. |
| SA-4 | R12 | R12 names both surfaces and the proxy that short-circuited the exercise. |

A covering entry shows that the register tracks the class for the
part. It does not show that the entry's mitigation answers the part's
argument in step 2. The *Shape findings* record this.

### Omission list

Eight pairs applied and had no covering entry. The citations were
complete at the pass of the Risk register above, so each omission is
genuine. The dispositions use the three the specification allows.

| Item | Part | Class | Applicability argument | Disposition |
|---|---|---|---|---|
| O1 | PT-04, the plugin and its SessionStart hook | CR-001 | The hook that carries R7's billing check lives in a plugin that R9 records as never observed loading. | Routed to the Backlog: "Whether R7's SessionStart billing check fires on each surface". |
| O2 | PT-19, the reachability slice | CR-001 | The bundle and the API Gateway binding are checked by source imports and synthetic events. The smoke test targets the preprod Function URL. | Routed to the Backlog: "Track the service's deployed parts under CR-001, or check them where they run". |
| O3 | PT-20, plan-state read | CR-001 | The GitHub path is tested with injected fakes, and the smoke test never calls `plan_read`. | Routed to the same Backlog entry as O2. |
| O4 | PT-21, plan-state update with the lease | CR-001 | The lease cycle runs on the preprod table. `plan_update` and `plan_confirm`, which read GitHub, run in no check against the real service. | Routed to the same Backlog entry as O2. |
| O5 | PT-24, pull-request checks | CR-001 | The checks cannot deploy by design, so none can fail on a deploy-time defect. | Accepted. That split is the design of node P2-N014 (pull-request checks that cannot deploy). The check that runs where the code runs is the smoke test of PT-26, and the exposure after promotion is O8. |
| O6 | PT-25, alias-aware lease-table selection | CR-001 | The `live` qualifier's production-table path has no step in the deploy workflow. | Routed to the same Backlog entry as O2. |
| O7 | PT-26, deploy pipeline and deploy-role policy | CR-001 | The policy is derived from documentation and is verified only by running the pipeline. | Accepted. The pipeline run is the check that runs where the code runs, and it failed four times before it passed. The exposure after promotion is O8. |
| O8 | SA-3, the deployed service's live surface | CR-001 | The workflow sends no request to the production endpoint after promotion. | Routed to the same Backlog entry as O2. |

The two Backlog entries are in the Backlog's *Upcoming* section, next to
the P3-N010 entry.

## Negative-control record, 2026-10-30

The control follows the five steps of *The negative control* above. It
ran on the run record of 2026-10-30, so its base is the commit that
holds that record.

| Item | Record |
|---|---|
| Scratch branch | `scratch-negative-control-cr-001` |
| Base commit | `3fd85dc`, the commit that holds the run record |
| Pair chosen | CR-001 against PT-22 (degrade-to-git-only rule, enlistment documentation and the R12 exercise), covered by R12 |
| Citation removed | R12's *Class* line, four lines ending "so it could not exercise waiting." |
| Steps 2 and 3 re-run | `grep -n 'CR-' docs/open-risks.md` returned one hit, line 286 in R13, where the base returned lines 269 (R12) and 290 (R13). |
| Pair that returned | PT-22 returned to the omission list: R12 was its only covering entry. SA-4 returned too, for the same reason. |
| Pairs that stayed covered | PT-08, PT-09, PT-10 and PT-11, covered by R13. |
| Omission list on the scratch branch | 10 items: O1 to O8 and the two pairs above. The base list has 8. |
| Outcome | The chosen pair returned. The control passed. |
| Discarded | The scratch branch held one commit, which was never merged. The branch was deleted. |

## Shape findings

The section states what in the entry shape the check could not read and
what changed. Findings 1 to 3 changed the delivered text. Findings 4 to
8 changed nothing and are recorded for node P3-N011 (the sweep, the rest
of the catalogue and the omission list).

1. The Reaches field, as the specification defines it ("the kind of part
   of a project the failure occurs in"), gives step 2 a kind and no
   decision. Most parts of this project fit some kind, so a run would
   decide by taste. Changed: the field now ends with the question the
   run asks of each part, and the catalogue's entry shape says so. Step 2
   applied that question to 30 parts and found 14.
2. Coverage by citation cannot read adequacy. R13 covers PT-08 to PT-11
   because it cites CR-001 and names their tooling. Its *Class* clause
   answers the arguments about a surface that lacks the Node floor. It
   does not answer the arguments that no test runs the tool as `node`.
   Changed: the Risk register's class-citation field now carries a
   clause saying how the entry instantiates the class, so a reader can
   compare the clause with the step 2 argument. The definition of a
   covering entry is unchanged. A stricter definition would change the
   procedure the specification fixes, and the decision is for the owner.
3. The entry test as the specification states it names "this project"
   in ET-1 and "this repository" in ET-3. The catalogue must be
   project-neutral. Changed: the catalogue states both with "the
   proposing project". The four conditions are unchanged.
4. Decision 2 changed no outcome for CR-001, because the header
   `[C1+]` admits both repositories. It would have decided the run for
   `[C1+] [deployable]`. Step 1 against this repository's Classification
   would have recorded CR-001 as not applicable for 21 parts, among them
   the R12 exercise whose evidence admitted the class. The header was
   argued from the encounters' Classifications for that reason.
5. Backlog and Risk register entries carry no anchors. An encounter's
   artifact that resolves is therefore a link to a file plus the quoted
   entry title. The Encounters field needs both. Child C's conversion
   to commit-pinned URLs pins the file, and a reader finds the entry by
   its title. The existing Backlog entry on anchors in the Risk register
   and the Ruling register covers part of this.
6. The definition of an independent encounter gives no rule for several
   defects found in one sequence of runs. The record counted the four
   deploy defects once. A rule such as "defects found by one run
   sequence count once" would remove the choice.
7. A Risk register entry can instantiate a class without being an
   encounter. R13 records an exposure and no event. The shape keeps
   encounters in the catalogue and instantiations in the register, and
   needed no change.
8. The enumeration reads this repository's Backlog only. The service
   repository keeps its own Backlog, with 23 checked entries at
   `58e6819`. Each names a node from P2-N007 to P2-N016 or a service
   migration. The nodes are enumerated. The service's own Classification
   and migrations are text and are not listed as a part. They would
   record `does not apply` for CR-001. Whether the enumeration reads the
   second Backlog is a question for child B.

## References

- [Specification of node P3-N003](specs/p3-n003-common-risk-catalogue.md):
  the definitions, criteria A1 to A11 (child A) and the gate record
- [Plan of node P3-N010](plans/p3-n010-one-class-end-to-end.md):
  decisions 1 to 5 and criteria A12 and A13 (the three further
  candidates, and concurrent writes to shared registers)
- [Catalogue](proposals/common-risk-catalogue.md) and
  [Risk register](open-risks.md): the check's first two inputs
- [Backlog](backlog.md), [Plan register](plan-register.md) and
  [Cost log](cost-log.md): the enumeration's sources
