# One class, carried end to end

Status: closed → Backlog entry (node P3-N010 done 2026-10-30, task T055; see the Backlog entry "One risk class carried end to end")

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N010; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node **P3-N010** is child A of **P3-N003**
([plan](p3-n003-common-risk-catalogue.md),
[specification](../specs/p3-n003-common-risk-catalogue.md)). The
parent's specification gives this node criteria **A1 to A11** under
*Child A: one class, carried end to end*. It also fixes the definitions
this node applies unchanged: the entry test ET-1 to ET-4, the entry
shape, the class-to-instance check, and the negative control. This plan
reopens none of them. Decisions 2 to 4 below refine three of them, and
each says which.

## Outcome

The catalogue exists with one entry. `CR-001` states the
execution-environment class: *a check that cannot fail in the
environment the code runs in*. The class-to-instance check has run for
`CR-001` alone, and the negative control has broken it on purpose.

At `done`:

- `docs/proposals/common-risk-catalogue.md` holds the preamble (entry
  shape and entry test) and `CR-001`, with every field filled.
- `docs/common-risk-catalogue-check.md` holds the sweep record for
  `CR-001` and one rejected candidate, the parts enumeration, the
  procedure, one dated run record, the omission list, the
  negative-control record and the *Shape findings* section.
- The Risk register cites `CR-001` from every entry that instantiates
  it.

The node exists to find an entry shape the check cannot read, on one
class, before child B (P3-N011) writes the rest.

## Approach

### The catalogue file

The Implementer creates the file to A1 to A3. The provenance line
follows [RU-015](../rulings.md) (the delivery form for a change to a
repository this project cannot write to). It names methodology 1.6.0,
the commit that version's tag resolves to, and the date. It states that
no upstream passage is quoted yet. Encounter artifacts are relative
links for now; criterion C9 of child C (P3-N012) converts them to
commit-pinned URLs.

### `CR-001` and its encounters

The plan names four instances. The Backlog already shows how they
resolve, and decision 10 of the parent specification sets the count at
two independent encounters.

| Instance the plan names | Record | Expected disposition |
|---|---|---|
| `node -e` ran the bundle check as CommonJS | Backlog, *The bundle's import check was a false negative*, fixed at T025, 2026-09-01 | encounter |
| Vitest's module runner hid the same defect | the same Backlog entry, the same investigation | not independent of the row above |
| the in-memory lease backend never sent a condition expression to DynamoDB | Backlog, *`plan_lease_release` fails against real DynamoDB*, surfaced at T026, 2026-09-01 | encounter |
| a bundle guard proven only by breaking it | no record; the nearest, P1-N009's drift guard, is a mitigation | not an encounter, reason written |

Three more candidates bear on `CR-001` directly. The sweep record
dispositions each of them too (A12).

- **P2-N012's four deploy defects.** The Backlog's P2-N012 entry
  (`done` 2026-09-07) records four defects, each invisible to a passing
  test suite and visible in one real run.
- **The ripgrep NUL-byte omission.** It was confirmed at T017's
  acceptance (P1-N013). The repository-wide search that criterion 4 of
  the cutover relied on could not see `run_corpus.ts`. This encounter
  is in this repository's own tooling, not in the service.
- **The R12 exercise's fast 502.** In the 2026-09-07 exercise (P2-N011)
  the agent proxy turned an unroutable address into an instant 502. The
  rule "does not wait" was therefore never under test.

The last two may be generalizations of the class rather than
encounters of it. A generalization is recorded as a separate candidate
with its generalization stated, as the parent specification requires.
Child B gives it an outcome.

### The entry test, applied twice

The sweep record applies ET-1 to ET-4 to `CR-001`, condition by
condition (A6). For the rejection, the default candidate is
[R1](../open-risks.md) (dispatch oscillation). It fails ET-1, as the
parent specification's worked example predicts. The Implementer may
reject more candidates than R1. It may not reject fewer.

### The check, run for one class

The Implementer copies the procedure into the check document as the
parent specification defines it, amended only by decisions 2 and 3. It
then builds the parts enumeration and runs steps 1 to 3 for `CR-001`.
The run record names the commits of its inputs, the date and the role.

The trap the parent plan names is a check that returns nothing. This
node has a specific version of it. This repository's Classification
declares `component/library` with no Workflow. Every encounter in the
table above happened in the service repository, which declares a
Workflow and is a `backend-service`. If `CR-001`'s header names
deployed or service types, step 1 against this repository's
Classification records the class as not applicable. The omission list
is then empty, A9 has no covered pair, and the check never reads the
reaches line. Decision 2 closes this. The ripgrep candidate is the
second answer: if it is admitted as an encounter, the class reaches
this repository's own tooling under any header.

### Citations, then the control

Before the run, the Implementer writes the Risk register's preamble
sentence for the class-citation field, as criterion I7 of the parent
specification allows. It then cites `CR-001` from every register entry
that instantiates it (decision 4). [R12](../open-risks.md) and
[R13](../open-risks.md) are the entries to argue first. After the run,
the Implementer performs the negative control on a scratch branch
against one covered pair, and records the branch's base commit, the
citation removed and the pair that returned. If no pair is covered, the
contingency in A9 applies.

A control whose pair does not return is a failed check. If the fix
changes the procedure the parent specification defines, the Implementer
returns `needs-judgment`. A fix to the entry shape goes in *Shape
findings* (A10).

## Dependencies

- **Repository reach ([RU-016](../rulings.md), the Planner declares a
  node's repository access).** This node reads and writes **this
  repository**. It writes two new files and edits
  `docs/open-risks.md` and `docs/backlog.md`. It also reads two
  repositories read-only and writes nothing there:
  - **majodali/methodology**, to resolve the 1.6.0 tag to the commit
    the provenance line names, and to read Article 4's tag notation for
    ET-4. Node P1-N015 read it the same way.
  - **majodali/project-orchestrator-service**, for its
    `docs/classification.md` at a named commit (decision 2 only). The
    repository is in this project's permanent scope under RU-016.

  Neither repository is new to the project, so the Orchestrator grants
  both and records the grants.
- **Nothing in this node.** P3-N010 is P3-N003's first child.
- **Not** a dependency: **P3-N002**
  ([RU-018](../rulings.md), a child is not queued behind a sibling it
  does not depend on). The enumeration is drawn by hand. The Backlog
  entry on reading the model's parts stays open.
- **Concurrent writers.** Other nodes, P3-N006 and P3-N013 among them,
  may be running alongside this node. They share `docs/backlog.md`, and may share
  `docs/open-risks.md`. Criterion B10 of the parent specification
  governs child B's writes to both files. This node takes the same
  discipline as A13.
- **Owner actions:** none.

## Leaf or interior

**Leaf.** The behaviors under test are *an entry is evidenced*, *the
check reads the entry*, and *the check can fail*. They validate only
together: a check run on an entry with no evidence proves nothing, and
the control needs a run. Splitting them would remove the integration
this slice exists to test. The work fits one Implementer session: two
new documents, one class, a few dozen parts after deduplication, and a
handful of Risk register edits.

## Verification

C1 profile ([profiles](../process/profiles.md)). The Implementer
self-verifies against A1 to A11 and A12 to A13 below. No Reviewer is
dispatched unless the owner asks. The owner reads `CR-001` and its run
at P3-N003's gate, under decision 14 of the parent specification. That
gate's negative control (criterion G5) re-runs against the delivered
catalogue, not against this node's state.

Criteria this plan adds, at the parent specification's depth:

- **A12.** The sweep record dispositions the three further candidates
  named under *`CR-001` and its encounters*. Each is an encounter of
  `CR-001`, a separate candidate with its generalization stated, or not
  independent with the reason written.
- **A13.** Each commit of this node to `docs/open-risks.md` or
  `docs/backlog.md` is made against the file as it stands at that
  commit, and overwrites no edit another node made.

Decisions 2 to 4, once adopted, are criteria too, each stated in its
own entry.

## Monotonicity

**No planned non-monotonicity.** The node adds documents and citation
lines. It changes no functional test and adds no form-check rule.
`node plugin/scripts/form_check.ts` passes (A11).

## Decisions for the gate

Numbered per [dispatch](../process/dispatch.md)'s owner-decision
economics. The owner's go-ahead adopts every default not overridden by
number. This plan opens its own sequence at 1.

**Precedents checked against the [Ruling register](../rulings.md).**
RU-015 is an exact match and decides the provenance line's form
silently. RU-016 is the authority for the repository reach, and RU-018
for independence from P3-N002. [RU-020](../rulings.md) (an interior node
whose specification reaches breakdown depth needs no separate
`break down` task) is a near match for decision 1. [RU-019](../rulings.md)
(a measurement criterion may be satisfied by an unfavourable result)
already shapes A8, which accepts an argued empty list. It raises no
decision here. [RU-022](../rulings.md) (a document drafted for the
methodology corpus is written IR first) is the subject of decision 5.
RU-002, RU-003 and RU-005 bind child C, not this node.

1. **Whether this node gets a separate `specify` task.** Default:
   **no**. The parent specification's A1 to A11, this plan's A12 and
   A13, and decisions 2 to 4 are the node's criteria. The node moves
   `planned` → `specified` at this gate. Rationale: the criteria are
   already at C1 depth, and P2-N013 to P2-N016 executed against their
   parent's criteria the same way. RU-020's reasoning applies as a near
   match: a task that restates approved criteria produces nothing.
2. **Which Classification step 1 reads for a part in another
   repository.** Default: **the Classification of the repository that
   holds the part**. This repository's Classification is used for its
   own parts. The service repository's `docs/classification.md`, read
   at a named commit, is used for service parts. The run record names
   the Classification for each part, and names that commit as a fourth
   input. This refines step 1 and criterion I4 of the parent
   specification, which name three inputs. Rationale: Article 4 decides
   applicability per project, from that project's own declaration. Read
   against `component/library`, a service-typed class would skip
   exactly the parts where `CR-001` was encountered. The alternatives
   are to keep step 1 as written and record the gap as a shape finding,
   or to require a `[C0+]` header for `CR-001`. The first leaves child B
   with the same defect, and the second tunes the entry to suit the
   procedure.
3. **Which Backlog entries the parts enumeration reads.** Default:
   **every checked entry, wherever it sits**, plus the Plan register's
   `done` nodes, deduplicated by node ID, plus the standing artifact
   classes. Each part names its source. The parent specification reads
   "the Backlog's Completed section". That section holds 20 of the
   Backlog's 47 checked entries. Rationale: by this Backlog's own
   convention, a finished child stays under Upcoming until its parent is
   `done`. Two Backlog entries from P1-N009's cutover, *Two further
   C2 permitted-set candidates* and *Additions to spec C2's permitted
   set*, record the same convention. A literal reading would drop P2-N012 and its four children, which is
   where `CR-001`'s encounters live.
4. **How many Risk register entries this node cites `CR-001` from.**
   Default: **every entry that instantiates it**, together with the
   preamble sentence stating the citation field, before the run.
   Child B then cites the remaining classes under criterion B7 of the
   parent specification. Rationale: decision 9 of the parent plan makes
   an omission genuine only when the citations are complete, and the
   parent plan's description of child A names this edit. Criterion I7
   of the parent specification already permits both changes.
5. **Whether this node writes the catalogue's IR.** Default: **no**.
   This node writes the catalogue as a prose draft. RU-022 is
   discharged at child C, whose criteria C2 to C4 write the IR and
   render the delivered text from it. Rationale: the adopted breakdown
   assigns the IR to child C, and the Backlog entry for P3-N012 names
   RU-022. An IR started here would be rewritten for every entry child
   B adds. The strict reading of RU-022 is the alternative: "the
   drafting role writes the IR first" applies from this node on, and
   child B extends the IR. That reading reopens the breakdown the owner
   accepted on 2026-10-29.


## Gate record, 2026-10-30

The owner accepted this plan with defaults 1 to 5. Under decision 1
the node moved `planned` → `specified` at this gate, with the parent
specification's child A section as its specification. Decisions 2 and
3 refine the parent specification's class-to-instance check (step 1
reads the Classification of the repository holding each part; the
parts enumeration reads every checked Backlog entry); the refinement
is recorded in the parent specification's gate record. Decision 5:
this node writes no IR. The Orchestrator grants read-only reach to
majodali/methodology and majodali/project-orchestrator-service at
dispatch (RU-016). Next: execute.

## References

- [p3-n003-common-risk-catalogue](p3-n003-common-risk-catalogue.md)
  and its
  [specification](../specs/p3-n003-common-risk-catalogue.md): the
  parent; criteria A1 to A11, decision 10, and the definitions this
  node applies
- [Backlog](../backlog.md): the encounter records in the table above,
  and the P3-N010 entry
- [Risk register](../open-risks.md): R1 (the expected rejection), R12
  and R13 (the first candidates for a `CR-001` citation)
- [Ruling register](../rulings.md): RU-015, RU-016, RU-018, RU-019,
  RU-020, RU-022
- [plan-model](../process/plan-model.md), [profiles](../process/profiles.md),
  [dispatch](../process/dispatch.md)
- methodology 1.6.0: Constitution **Article 4** (applicability, then
  precedence), for the header notation and decision 2; **Article 8**
  (amendments, versions, and migration), the process the catalogue is
  proposed through at child C
