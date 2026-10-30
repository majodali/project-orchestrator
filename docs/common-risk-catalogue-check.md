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
of the specification are the authority.

| Section | Content |
|---|---|
| The check procedure | The inputs, the three steps, the omission list and the negative control. |
| Sweep record for CR-001 | The entry test applied, the header argued, every candidate dispositioned, the Risk register pass. |
| Parts enumeration | The committed list of parts the check reads. |
| Run record, 2026-10-30 | The four inputs by commit, steps 1 to 3 for CR-001 and the omission list. |
| Negative-control record | The deliberately broken input and the pair that returned. |
| Shape findings | What in the entry shape the check could not read, and what changed. |

## The check procedure

The procedure is the one the specification defines under
[the class-to-instance check](specs/p3-n003-common-risk-catalogue.md#the-class-to-instance-check)
and [the negative control](specs/p3-n003-common-risk-catalogue.md#the-negative-control).
Two refinements apply, both adopted at the gate of 2026-10-30. They are
decision 2 (which Classification step 1 reads) and decision 3 (which
Backlog entries the parts enumeration reads) of the plan of node
P3-N010. Each is marked below.

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
   with a covering entry records that entry's ID.

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
