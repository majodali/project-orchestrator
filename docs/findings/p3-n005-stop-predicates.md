# The four stop conditions as predicates: the record

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the record of node P3-N013
     (the four stop conditions, decidable, evidenced, and related to the
     meta-review signals). It goes `closed → Backlog entry` when the
     node reaches `done`. After node P3-N014 (the loop runs sequence
     mode) lands, the normative predicate text is the *Sequence mode*
     section of docs/process/dispatch.md, and this record states so. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session). The record serves the two readings of node
**P3-N013** (the four stop conditions, decidable, evidenced, and related
to the meta-review signals), the task that compares them, and a
verifier who did not do the work. It assumes the
[node's plan](../plans/p3-n013-stop-conditions-decidable.md) and the
[parent specification](../specs/p3-n005-sequence-mode.md)'s section
*Child A*.

Methodology **W-001** (two delivery modes, human-gated) stops a running
sequence on four conditions: a failed check, a scope change, a chunk
needing the human's decision, and a landing summary carrying asks. This
record writes each condition as a
[stop predicate](../specs/p3-n005-sequence-mode.md#i-integration-invariants).
A stop predicate names the artifact and the field it reads, and it
yields stop or continue without a fresh judgment. The record also
states the corpus the two readings apply the predicates to.

The predicate text and the corpus statement were committed alone, in
the [predicate commit](../plans/p3-n013-stop-conditions-decidable.md#e1-write-sample-and-fix-the-predicates)
`d843457` that both readings start from. The revision log, the
hard-case sample's verdicts, the mechanical pre-pass and the relation
table were added by a later commit that neither reading contains.

## How a reading applies the predicates

An **item** is one task of the corpus statement below. A reading
applies each of the four predicates to each item, and records one row
per item and predicate in its verdict file.

Each predicate takes one of two shapes. It is a lookup or a comparison
where a field or a count exists. It is a wording match against a stated
list where the input is a note written in prose. No predicate judges
prose for tone or intent. A note that a stated list does not match
counts as not matching. Where a reading doubts a match, it applies the
list as written and records the case in its result as a finding.

Each predicate [fails closed](../specs/p3-n005-sequence-mode.md#i-integration-invariants):
a missing input yields stop, never continue. A verdict is marked
*failed closed* when it is stop and rests only on missing input. A stop
that also rests on a recorded failure is not marked failed closed.

**The result record.** The predicates read a task's result through the
committed artifacts that record it. Inside a ratified sequence these
are: the `result-received` event of the
[run journal](../process/observability.md), which carries the result's
status and its Asks part verbatim (parent decision 12); the
`accepted` event and any other event carrying the task's ID; the
[Cost log](../cost-log.md) row; and the commits at the recorded ref.
For the corpus, the corpus statement below names what stands in for
each of these.

**The item's node and stage.** They are the `node` and `stage` fields
of the item's `dispatched` event, or of its `accepted` event when it has
no `dispatched` event.

**The member.** Inside a sequence, the predicates read a
[member of a sequence](../specs/p3-n005-sequence-mode.md#gate-record-2026-10-29):
a chunk the owner ratified. For the corpus, the member is the item's
node.

**The member's documents.** A member's plan and specification are the
documents its [Plan register](../plan-register.md) line links. A node
whose line links none takes the documents of its nearest ancestor that
links any. A document's *node* is the node it states it is written for
in its opening lines.

## Predicate 1. A failed check

**Reads.** The item's `check-failed` events (journal, field `event`).
The recorded outcome of each named check, in the item's result record.

**The named checks.**

1. The project's form check, named for every item. It is
   `node plugin/scripts/form_check.ts`, or its predecessor
   `python3 plugin/scripts/form_check.py`, which node P1-N013 (the
   cutover: sync_agents ported, every invocation site moved, the Python
   retired) retired. A note naming either names the form check.
2. For an item at stage `execute` or `verify`: each command, in code
   formatting, that the member's criteria require to pass, to exit
   zero, or to report a stated result. The member's criteria are the
   criteria list the member was dispatched against: its own
   specification's, or its section in its parent's specification.
3. For an item at stage `execute`: the self-verification verdict on
   each criterion the member is verified against. For an item at
   stage `verify`: the verifier's verdict on each criterion.

An item at stage `plan`, `specify` or `break down` has the form check
as its only named check. Its deliverable is the document that states
the criteria, and the commands in it bind the node's later `execute`.

**Recorded outcomes.** A check's outcome is recorded when a note of the
item names the check and states one of these outcomes.

- Pass: "clean", "pass", "passes", "passed", "green", "met", "holds",
  "0 violations", "exit 0", or a count *N/N* whose two numbers are
  equal.
- Failure: "fail", "failed", "red", "caught", "not met", a violation
  count above zero, a non-zero exit, or a count *N/M* with *N* below
  *M*.

When a note states more than one outcome for one check, the last one
stated is its outcome. When two notes state different outcomes for one
check, the failure stands. A failure made on purpose to prove that a test
can fail, and then restored, is not a failure outcome.

A verdict stated for all criteria at once, such as "all eight criteria
met" or "every criterion holds", records the outcome of each. A
statement that verification happened without its outcome, such as
"self-verified", "re-verified" or "checked", records no outcome. So do
"untested", "unrun", "not confirmable", "not claimed" and a
placeholder. A test, build or lint command is named in a note by its
command or by the word "tests", "suite", "build", "lint" or
"typecheck".

**Yields stop** when any of these holds:

- the item has a `check-failed` event, whatever its note says;
- a named check's recorded outcome is a failure;
- a named check has no recorded outcome (fails closed).

**Yields continue** otherwise. The predicate reads recorded outcomes.
It never re-runs a check.

## Predicate 2. A scope change

**Reads.** Three sets, taken from the item's result record and its
commits, and the scope the member ran under. Inside a sequence that
scope is the owner's ratification record (parent decision 13). For the
corpus it is the
[stand-in grant](../plans/p3-n013-stop-conditions-decidable.md#decisions-for-the-gate)
the corpus statement names for the item (plan decision 4).

**The three sets.**

1. *Nodes and stages.* The item's node and stage. Add each node outside
   the item's own node and the nodes under it that the item's
   `result-received` or `accepted` note names with a stage transition
   written `<stage> -> <stage>`.
2. *Repositories written.* This repository, when a recorded ref of the
   item resolves in it or when the item records no ref. For each
   recorded ref that does not resolve in this repository: the
   repository a note of the item or its Cost log row names, by its
   name, as "the service repository", "the service" or "the work repo",
   or by a pull request of that repository. Add each repository a note
   names together with a commit, a branch or a pull request of the
   item's work. A ref that does not resolve here, and whose repository
   no note names, is an unknown repository.
3. *Immediate-class flags.* `dispatch.md` names four immediate classes:
   approved-scope expansion, a change to an existing test's conditions
   under methodology W-002 (existing tests are signals, not obstacles),
   a deviation from the process specification or the methodology, and
   budget overrun. A flag is raised by a `needs-judgment` event of the
   item whose note names one of the four classes. It is also raised by
   a note of the item that states an existing test was modified,
   retired or deleted, or that a licence or ruling for a test change
   was applied.

**Compares** by membership.

- Each element of set 1 is a node and stage the scope grants. A grant
  of a node "and every node under it" grants every stage of each.
- Each element of set 2 is this repository or a repository the scope
  names. A member's *Repository reach* section, where its plan or
  specification has one, adds the repositories it names. Without one,
  `dispatch.md`'s default holds: approved scope is this repository
  alone.
- Each flag of set 3 is named by one of the scope's
  pre-authorizations.

**Yields stop** when any element lies outside the scope, when a
repository is unknown (fails closed), or when no scope can be recovered
for the item (fails closed). The corpus counts the last case apart
(plan decision 4). **Yields continue** otherwise.

**A packet widening is not a scope change.** Reading is not work. A
`packet-widened` event, and every read or search a note reports, is an
element of no set. That holds for reads of another repository, of a
tool's source, and of a web page.

## Predicate 3. A chunk needing the owner's decision

**Reads.** The status of the item's result. The *Decisions for the
gate* sections of the member's documents and their gate record
sections. The located findings and open questions the result reports.

**Yields stop** when any of these holds.

1. *Status.* The status token is anything other than exactly `done`
   (plan decision 6). `needs-judgment` and `blocked` both stop, and so
   does a compound token such as `blocked-on-O3`. The status token is
   the run of letters, digits and hyphens that opens the
   `result-received` note, after an optional leading word "status". Any
   other character ends it, so "done;" and "done." both give `done`.
   An item with no `result-received` event has no status (fails
   closed).
2. *An unadopted gate decision.* A numbered entry in a *Decisions for
   the gate* section of a member's document is unadopted unless both
   hold:
   - a gate record section of the same document, or of the other
     member document of the same node, adopts or overrides it. A gate
     record section is a section headed "Gate record", "Gate outcome"
     or "Hold released", with a date. It adopts an entry by its number,
     by a range holding the number, or by adopting "all" or "every"
     default;
   - the journal holds a `gate-crossed` event for the document's node
     earlier than the item's first result event, at the document's
     stage or a later one. A plan's stage is `planned` and a
     specification's is `specified`; `broken-down` and `done` are
     later.

   When a member's document has a *Decisions for the gate* section and
   neither member document of its node has a gate record section, the
   stop fails closed.
3. *A located finding against the member's own documents.* The result
   reports a located finding (`dispatch.md`, the handoff contract)
   whose contradicted decision or criterion is in a member document.
   Only the owner amends an adopted criterion. In the corpus, a note of
   the item that records a contradiction marked under methodology
   K-011 (found contradictions are marked, not routed around) in a
   member document stands for it.
4. *An open question.* The result's *What changed* part, or its
   intermediate representation (IR), carries an open question that
   waits on other activity. The owner's clarification of 2026-09-17
   moves such a question out of Asks, so this test keeps it a stop
   (criterion I5, conditions 3 and 4 lose no stop together). In the
   corpus, a note of the item stating that the result carried a
   question forward unresolved, or left an open question, stands for
   it.

**Yields continue** otherwise. Each test is a lookup or a wording
match.

**The check of criterion I5, per item.** Each verdict row of
predicate 3 records whether test 4 found an open question. Where it
found one, the verdict is stop. Where it found none, the row's artifact
pointer is the evidence that no committed artifact of the item records
such a question.

## Predicate 4. A landing summary carrying asks

**Reads.** The result's Asks part, under methodology W-008 (reports map
their deliverables) at
[v1.6.0, commit `3e34829`](https://github.com/majodali/methodology/blob/3e3482921e7e23bb4ad690b40394bf00b7feb37f/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables).
W-008 there defines the asks as "the decisions and actions requested
of the reader". The predicate reads the Asks section of the result's
IR when the result carries one, and the prose Asks part otherwise.
`dispatch.md` makes the IR's asks the asks.

**The artifact.** The Asks part as a committed artifact carries it
verbatim: inside a sequence, the `result-received` event (parent
decision 12). A summary or paraphrase of asks in a journal note, a
Cost log row or a commit message is not the Asks part.

**Yields continue** only when the Asks part is exactly a stated empty
form, "No asks" or "A0. No asks.", or when every ask in it names the
Orchestrator as its
[addressee](../specs/p3-n005-sequence-mode.md#decisions-for-the-gate)
(parent decision 11).

**Yields stop** otherwise. In particular:

- an ask that names no addressee counts as owner-addressed (parent
  decision 11);
- an ask to ratify or strike a term introduced stops, whatever
  addressee it names, because ratification is the owner's under
  W-008;
- a missing Asks part stops (fails closed).

## The verdict file

Each reading writes one file, `reading-<n>-round-<r>.md`, in
`docs/findings/p3-n005-stop-predicates/`. It holds one table with one
row per item and predicate, ordered by item and then by predicate:

| Item | Predicate | Verdict | Artifact and field read | Failed closed | I5 |
|---|---|---|---|---|---|
| T0nn | 1 to 4 | `stop` or `continue` | the artifact and field | `yes` or `no` | predicate 3 only |

*Verdict* is `stop` or `continue`. *Artifact and field read* names the
artifact and the field or note the verdict rests on, with the event's
timestamp where it is a journal event. *Failed closed* is `yes` or
`no`. *I5* is filled for predicate 3 only: `open question` or `none`.
Findings and Backlog additions travel in the reading's result, not in
the file.

## The corpus statement

**The cut-off.** The corpus is frozen at commit `d1c3659` ("Plan gates
of 2026-10-30: P3-N006, P3-N010 and P3-N013 specified; plan.md kept in
step"), the commit this node's first execute task starts from. Every
artifact below is read as it stands at that commit, except the
repository at a recorded ref, which is read at that ref.

**The corpus is what is committed** (parent decision 10). A reading
uses only the artifacts this section names. No reading uses a session
transcript. The `session` field of a journal event names a transcript;
a reading does not follow it.

**The artifact that decides whether a task has a result: the run
journal**, `orchestration/journal.jsonl`. A task has a result when the
journal holds a `result-received` event or an `accepted` event with its
task ID.

- At the cut-off the journal names 53 tasks, T001 to T053, with no gap.
  It holds 51 `dispatched` events, 41 `result-received` events and 52
  `accepted` events that carry a task ID.
- 41 tasks have a `result-received` event. 12 have an `accepted` event
  and no `result-received` event: T001, T026 and T029 to T038. Two of
  these, T026 and T035, also have no `dispatched` event.
- T017 has a `result-received` event and no `accepted` event. It
  returned `needs-judgment` and was redispatched as T018.
- The Cost log is not the deciding artifact. It holds one row per
  accepted task: 52 rows, with none for T017.

**The corpus holds 53 items.** Every task with a journal record at the
cut-off has a result event.

**Exclusions under plan decision 5: none, a count of 0.** No task at
the cut-off was dispatched and left without a result. Tasks issued
after the cut-off have no journal record at it and are outside the
corpus.

**The artifacts read for each item.**

1. The journal events whose `task` field is the item's ID. Their notes
   are the Orchestrator's records of the result. They stand in for the
   result record where the predicates read a status, a check outcome, a
   located finding, an open question or a stage transition.
2. The item's Cost log row, where one exists. Its notes column is read
   like a journal note.
3. The repository at each recorded ref, where the ref resolves in this
   repository. 15 items carry only refs of another repository; those
   refs do not resolve here and are not read. 10 items record no ref.
4. The member's documents at the cut-off: the plan and specification
   the Plan register line links, as defined above, with their *Decisions
   for the gate*, gate record and *Repository reach* sections.
5. The journal's gate events (`gate-crossed`, `gate-opened`) and the
   gate record sections named as the item's stand-in grant source
   below.

**The stand-in grant** (plan decision 4). No past task ran in a
ratified sequence, so predicate 2 reads, for each item, the scope grant
in force when the item was dispatched. Its source is the latest owner
act recorded before the item's first event on the item's node or an
ancestor: a `gate-crossed` event; a `gate-opened` event whose note
records the owner's grant or states the approved scope; or a dated gate
record section of a member document. A go-ahead at a node's gate
grants the node's next stage. A go-ahead that crosses a breakdown
grants the children it enters their next stage, or every stage up to
the gate the adopted plan names. A task whose grant no such source
records has no recoverable grant. It yields stop on predicate 2 by
failing closed and is counted apart.

| Grant | Nodes and stages | Repositories | Pre-authorizations | Source |
|---|---|---|---|---|
| G1 | P1-N005 `execute` | this repository | none | `gate-crossed` 2026-08-25T18:50Z, P1-N005: chunk-4 go-ahead by the owner |
| G2 | P1-N008 `plan`, `specify` | this repository | none | `gate-opened` 2026-08-25T22:19Z, P1-N008: "approved scope exhausted (plan+specify only)", the scope these two tasks ran under |
| G3 | P1-N008 `execute` | this repository | none | `gate-crossed` 2026-08-25T23:17Z, P1-N008: "execute approved (RU-001)" |
| G4 | P2-N002 and every node under it, every stage | this repository; majodali/project-orchestrator-service | none | `gate-crossed` 2026-08-26T23:19Z, P2-N002: chunk-1 scope with cross-repository reach; `gate-crossed` 2026-08-27T00:10Z, P2-N002: execute approved from P2-N007 |
| G5 | P1-N009 `plan` | this repository | none | `gate-opened` 2026-08-29T22:22Z, P1-N009: "owner granted scope for a new node" |
| G6 | P1-N009 `specify` | this repository | none | `gate-crossed` 2026-08-30T05:03Z, P1-N009 |
| G7 | P1-N009 `break down`; P1-N010 to P1-N013, every stage up to P1-N009's gate at `verifying` | this repository | none | `gate-crossed` 2026-08-30T18:21Z, P1-N009; the gate at `verifying` is plan decision 10, adopted in the plan's *Gate outcome, 2026-08-29* |
| G7a | as G7 | this repository | the owner's W-002 disposition on `test/plan-register.test.ts`, carried "until P1-N012" | G7's sources; `gate-crossed` 2026-08-30T22:14Z, P1-N011 |
| G7b | as G7 | this repository | RU-014 (a port retires its cross-check assertion), option (c), on `test/plan-register.test.ts` | G7's sources; `gate-crossed` 2026-08-30T23:17Z, P1-N013 |
| G8 | P1-N015 `plan` | this repository | none | `gate-opened` 2026-08-31T23:56Z, P1-N015: "owner granted scope for the amendment work" |
| G9 | P1-N015 `specify`, `execute`, up to its gate at `verifying` | this repository | none | `gate-crossed` 2026-09-01T00:13Z, P1-N015; plan *Gate outcome, 2026-09-01*; RU-005 (proposal-class nodes gate at `verifying`) |
| G10 | P2-N012 `plan` | this repository | none | `gate-opened` 2026-09-01T17:27Z, P2-N012: "owner granted scope for CI deployment" |
| G11 | P2-N012 `specify` | this repository; majodali/project-orchestrator-service | none | `gate-crossed` 2026-09-01T19:05Z, P2-N012; plan *Gate outcome, 2026-09-01*: cross-repository scope granted and made permanent by RU-016 |
| G12 | P2-N012 up to its `verifying`; P2-N013 to P2-N016, every stage | this repository; majodali/project-orchestrator-service | none | `gate-crossed` 2026-09-01T19:35Z, P2-N012; specification *Gate outcome, 2026-09-01*, decision 11 |
| G13 | P3-N001 `specify` | this repository | none | `gate-crossed` 2026-09-17T12:00Z, P3-N001 |
| G14 | P3-N002, P3-N003 and P3-N005 `plan` | this repository | none | `gate-crossed` 2026-09-17T14:00Z, P3-N001; specification *Gate record, 2026-09-17* |
| G15 | P3-N002, P3-N003 and P3-N005 `specify` | this repository | none | the three `gate-crossed` events of 2026-10-29T18:00Z |
| G16 | P1-N014 `specify` | this repository | none | the plan's section *Hold released, 2026-09-02* |
| G17 | P1-N014 `execute`, `verify` | this repository | none | `gate-crossed` 2026-10-29T19:30Z, P1-N014; specification *Gate record, 2026-10-29* (decision 15, the Reviewer) |
| G18 | P3-N006, P3-N010 and P3-N013 `plan` | this repository | none | the `gate-crossed` events of 2026-10-29T19:30Z for P3-N002, P3-N003 and P3-N005, which entered these children |
| none | — | — | — | T019: the `gate-opened` event of 2026-08-31T01:28Z opens P1-N014 and records no owner grant. T051 and T053: no node, and no gate event; each `dispatched` note cites an owner request made in conversation |

**3 items have no recoverable grant: T019, T051 and T053.** Predicate 2
counts them apart.

**The items.** *Member documents of* names the node whose register line
supplies the member's documents. A ref marked "(not here)" does not
resolve in this repository.

| Item | Node | Stage | Result event | Journal events | Recorded refs | Cost log row | Member documents of | Stand-in grant |
|---|---|---|---|---|---|---|---|---|
| T001 | P1-N005 | execute | `accepted` only | 2 | none | yes | P1-N001 | G1 |
| T002 | P1-N008 | plan | `result-received` | 4 | `fa1d878` | yes | P1-N008 | G2 |
| T003 | P1-N008 | specify | `result-received` | 4 | `de599e7` | yes | P1-N008 | G2 |
| T004 | P1-N008 | execute | `result-received` | 7 | `cb58f44` | yes | P1-N008 | G3 |
| T005 | P2-N002 | plan | `result-received` | 4 | `5146a91` | yes | P2-N002 | G4 |
| T006 | P2-N002 | specify | `result-received` | 4 | `b6bb4d2` | yes | P2-N002 | G4 |
| T007 | P2-N007 | execute | `result-received` | 4 | `775842c` (not here) | yes | P2-N002 | G4 |
| T008 | P2-N008 | execute | `result-received` | 5 | `fa3e979` (not here) | yes | P2-N002 | G4 |
| T009 | P2-N008 | execute | `result-received` | 5 | `b5f2a04` (not here) | yes | P2-N002 | G4 |
| T010 | P2-N009 | execute | `result-received` | 5 | `cd67d75` (not here) | yes | P2-N002 | G4 |
| T011 | P1-N009 | plan | `result-received` | 4 | `a13756e` | yes | P1-N009 | G5 |
| T012 | P1-N009 | specify | `result-received` | 4 | `2f576d6` | yes | P1-N009 | G6 |
| T013 | P1-N009 | break down | `result-received` | 4 | `73c88e8` | yes | P1-N009 | G7 |
| T014 | P1-N010 | execute | `result-received` | 3 | `8bf68e7` | yes | P1-N009 | G7 |
| T015 | P1-N011 | execute | `result-received` | 5 | `cc9e8ee`, `099b2c6` | yes | P1-N009 | G7 |
| T016 | P1-N012 | execute | `result-received` | 4 | `8876cf2` | yes | P1-N009 | G7a |
| T017 | P1-N013 | execute | `result-received` | 4 | none | no | P1-N009 | G7 |
| T018 | P1-N013 | execute | `result-received` | 3 | `73b20b4` | yes | P1-N009 | G7b |
| T019 | P1-N014 | plan | `result-received` | 4 | `c9da132` | yes | P1-N014 | none |
| T020 | P1-N015 | plan | `result-received` | 7 | `b29b0e5` | yes | P1-N015 | G8 |
| T021 | P1-N015 | specify | `result-received` | 3 | `ca36ca8` | yes | P1-N015 | G9 |
| T022 | P1-N015 | execute | `result-received` | 4 | `2b618c8` | yes | P1-N015 | G9 |
| T023 | P1-N015 | execute | `result-received` | 3 | `42d235e` | yes | P1-N015 | G9 |
| T024 | P2-N010 | execute | `result-received` | 6 | `a3415ce` (not here) | yes | P2-N002 | G4 |
| T025 | P2-N010 | execute | `result-received` | 6 | `6f3b117` (not here) | yes | P2-N002 | G4 |
| T026 | P2-N010 | verify | `accepted` only | 4 | `60578dd`, `e9ae6e4` | yes | P2-N002 | G4 |
| T027 | P2-N010 | execute | `result-received` | 4 | `3ff7fa8` (not here) | yes | P2-N002 | G4 |
| T028 | P2-N012 | plan | `result-received` | 4 | `e5c045a` | yes | P2-N012 | G10 |
| T029 | P2-N012 | specify | `accepted` only | 2 | `9f03d8c` | yes | P2-N012 | G11 |
| T030 | P2-N013 | execute | `accepted` only | 3 | `f95b9e8` (not here) | yes | P2-N012 | G12 |
| T031 | P2-N014 | execute | `accepted` only | 3 | `a5f75f3` (not here) | yes | P2-N012 | G12 |
| T032 | P2-N015 | execute | `accepted` only | 3 | `62e144a` (not here) | yes | P2-N012 | G12 |
| T033 | P2-N016 | execute | `accepted` only | 2 | `db8b66a` (not here) | yes | P2-N012 | G12 |
| T034 | P2-N016 | execute | `accepted` only | 3 | `74d67c1` (not here) | yes | P2-N012 | G12 |
| T035 | P2-N016 | execute | `accepted` only | 1 | `7dab3c5` (not here) | yes | P2-N012 | G12 |
| T036 | P2-N016 | execute | `accepted` only | 2 | `3d582ea` (not here) | yes | P2-N012 | G12 |
| T037 | P2-N016 | execute | `accepted` only | 2 | `c0e8edf` (not here) | yes | P2-N012 | G12 |
| T038 | P2-N011 | execute | `accepted` only | 2 | `519f42c` | yes | P2-N002 | G4 |
| T039 | P3-N001 | specify | `result-received` | 9 | `377abde` | yes | P3-N001 | G13 |
| T040 | P3-N002 | plan | `result-received` | 4 | `4e22d3a` | yes | P3-N002 | G14 |
| T041 | P3-N003 | plan | `result-received` | 3 | `dbd92c3` | yes | P3-N003 | G14 |
| T042 | P3-N005 | plan | `result-received` | 3 | `5075026` | yes | P3-N005 | G14 |
| T043 | P3-N002 | specify | `result-received` | 6 | none | yes | P3-N002 | G15 |
| T044 | P3-N003 | specify | `result-received` | 4 | none | yes | P3-N003 | G15 |
| T045 | P3-N005 | specify | `result-received` | 4 | none | yes | P3-N005 | G15 |
| T046 | P1-N014 | specify | `result-received` | 4 | none | yes | P1-N014 | G16 |
| T047 | P1-N014 | execute | `result-received` | 4 | `7521066` | yes | P1-N014 | G17 |
| T048 | P3-N006 | plan | `result-received` | 4 | none | yes | P3-N006 | G18 |
| T049 | P3-N010 | plan | `result-received` | 4 | none | yes | P3-N010 | G18 |
| T050 | P3-N013 | plan | `result-received` | 4 | none | yes | P3-N013 | G18 |
| T051 | none | execute | `result-received` | 4 | `d9f00ba` | yes | none | none |
| T052 | P1-N014 | verify | `result-received` | 4 | `7521066` | yes | P1-N014 | G17 |
| T053 | none | execute | `result-received` | 4 | none | yes | none | none |

**Which items carry a committed Asks part: none.** No committed
artifact at the cut-off holds the Asks part of any item's result. The
journal notes and the Cost log rows are the Orchestrator's summaries.
The repository at the recorded refs holds the deliverables, not the
results. A search of the history for "No asks" and for an Asks heading
finds the phrase only in rule text: role contracts and proposals.

- **The coverage gap for condition 4 is 53 of 53 items.** Condition 4's
  historical subset has a count of zero. That is a recorded result, not
  a failure (plan addition A3+; RU-019, a measurement criterion may be
  satisfied by an unfavourable result, is the near match). Condition
  4's agreement rests on the demonstration's results, which node
  P3-N015 (the demonstration) adds to this record.
- Seven items have a journal note that paraphrases asks: T047 to T053.
  A paraphrase is not the Asks part (predicate 4, *The artifact*).

## Revision log

Draft 0 was written from criteria I1 to I4, parent decisions 10 and 11
and plan decisions 4 to 6. It was not committed. Its clauses are quoted
below as they read when the hard-case sample was scored. Draft 1 is
commit `309ed24`. Draft 2 is commit `d843457`, the predicate commit
both readings start from. Every revision below was recorded before
either reading was dispatched (criterion A4).

The sample's verdicts at draft 2 are in
[sample-verdicts.md](p3-n005-stop-predicates/sample-verdicts.md).

| Revision | Draft 0 read | Sample item and outcome at draft 0 | Draft 1 reads |
|---|---|---|---|
| R1 | Predicate 1 read "the check outcomes recorded in the item's `result-received` note, its `accepted` note and its Cost log row". | T017: its form-check outcome is in its `needs-judgment` event, which draft 0 did not read. Stop, failed closed, with the form check counted as unrecorded. | Any note of the item: every journal event with its task ID, and its Cost log row. |
| R2 | Predicate 1 stopped on "a `check-failed` event recording a failed check". | T025: its `check-failed` note records a brief defect, not a check. Whether it records a failed check is a judgment. Not decidable. | Stop on any `check-failed` event, "whatever its note says". |
| R3 | Predicate 1 read "the outcome the result records for each named check", with no wording list. | T032 and T008: "self-verified per the C1 profile" and "locally verified" could each be read as a pass or as no outcome. Not decidable. | The pass list, the failure list and the no-outcome list. "self-verified" alone records no outcome. |
| R4 | No rule for a note stating two outcomes, or for a failure made on purpose. | T025: "the regression test was broken deliberately ... and failed with the exact production error, then passed once restored". Not decidable. | The last outcome a note states stands. A deliberate failure that is restored is not a failure. Between two notes, the failure stands. |
| R5 | Predicate 2's second set was "the repository each recorded ref belongs to". | T025 and T032: their refs do not resolve here, and nothing committed says which repository holds them. Not decidable without a judgment. | A ref that does not resolve here takes the repository a note names from a stated list. With none named, the repository is unknown, and predicate 2 fails closed. T025 then yields continue and T032 stop. |
| R6 | "A `packet-widened` event is an element of no set." | T025: its notes also report a search ("The role searched, found none"), which is not a `packet-widened` event. | A `packet-widened` event, "and every read or search a note reports", is in no set. |
| R7 | Predicate 3 stopped "on any status other than `done`, read from the `result-received` note". | T010: the note reads "status blocked-on-O3 with all locally reachable criteria claimed met". Where the status ends was not stated. The verdict was stop on every reading, but the field was not defined. | A status token, with a stated start and end. |
| R8 | Predicate 3 had two tests: the status, and an unadopted gate decision. | T038: its placement contradicted criterion I9 of its own specification, marked under K-011 and routed to the owner. Draft 0 stopped it only because it has no `result-received` event: the right verdict for the wrong reason. | A third test: a located finding against a member document stops. The test for an open question (criterion I5) is numbered fourth. |

**Draft 1 to draft 2.** One revision, found by running the mechanical
pre-pass after commit `309ed24` and before either reading was
dispatched.

| Revision | Draft 1 read | What exposed it | Draft 2 reads |
|---|---|---|---|
| R9 | The status token ends "at the first space, comma, period or colon". | The pre-pass gave the token `done;` for the 20 notes that open "status done; ...", T025 among them. Under draft 1, predicate 3 stopped all 20. | The token is the opening run of letters, digits and hyphens. |

## The mechanical pre-pass

[prepass.ts](p3-n005-stop-predicates/prepass.ts) scores the structured
fields of the journal and the Cost log at the cut-off: the status
token, the `check-failed` and `needs-judgment` events, the refs and the
recorded node. It decides only what a field decides and leaves every
wording match to the readings, so it is not a third reading
(criterion A6). Its output is
[prepass-output.md](p3-n005-stop-predicates/prepass-output.md). Re-run
it from the repository root with
`node docs/findings/p3-n005-stop-predicates/prepass.ts d1c3659`. It
is not part of `plugin/`, and the form check does not run it.

At the cut-off it reports 53 items and 0 exclusions. Predicate 1 stops
on a `check-failed` event for 3 items. Predicate 2 stops on a missing
node for 2 items. Predicate 3's status test stops 16 items, 12 of them
by failing closed for want of a `result-received` event. Predicate 4
stops all 53 by failing closed.

## The relation table

The parent specification's criterion I10 (the relation to the
meta-review signals is closed) and child A's criterion A10 ask how
W-001's four conditions relate to the four meta-review signals of the
methodology's IR specification, and to its limit of ten rounds. The
parent specification's table was a hypothesis. This table is the
result of testing it.

### The text related

**Provenance.** The pinned text: methodology tag v1.6.0, commit
`3e34829`, 2026-10-28, `docs/intermediate-representation.md`, section
*Meta-review*. The Orchestrator quoted it in this task's packet on
2026-10-30 (plan decision 3). This task re-verified it against the tag
on 2026-10-30; it matches, apart from the link markup and line breaks
removed below. The later text: methodology `main` at commit `195eba9`,
unreleased, as the Orchestrator quoted it on 2026-10-30. Only its three
reworded sentences are quoted; the packet states that the rest is
unchanged in substance. The parent specification's decision 9 names
the rewording as commit `350f75f`, 2026-10-29. This record relates the
text quoted at `195eba9`, and does not establish whether `350f75f`
reads the same.

The pinned v1.6.0 text, quoted verbatim:

> A meta-review signal is one of four conditions in a review record. A
> text is a meta-review subject when its count reaches the limit or its
> review record shows a meta-review signal. The first signal: in two or
> more rounds of the count, a fix did not reach the prose or was not
> confirmed. The second signal: a finding declined in an earlier round
> was raised again, or a restatement mismatch recurred on one passage.
> The third signal: the prose grew across the count by more than one
> tenth of its round-1 word count. The fourth signal: after round 3, a
> stranger found a contradiction in a passage an earlier round's fix
> touched. At the end of a count, the reasoning role checks the four
> signals against the review record. The reasoning role writes
> `Meta-review: pending` when the text is a subject and
> `Meta-review: not indicated` otherwise, naming the signals checked.
> The owner may dispatch a meta-review of any text. The reasoning role
> asks the owner, in the report that delivers a meta-review subject, to
> dispatch its meta-review.

The limit, from the same file's section *Stranger rounds* at v1.6.0:
"The limit is ten rounds." and "At the limit the reasoning role does
not deliver the text before the owner's decision."

The three sentences reworded at `195eba9`, quoted verbatim:

> The second signal: a finding declined in an earlier round was raised
> again. The second signal also fires when a restatement mismatch
> recurred on one passage.

> The third signal: at the count's end, words per IR claim exceed round
> 1's words per claim by more than one tenth.

> The fourth signal: in round 3 or later, a stranger found a
> contradiction in a passage an earlier round's fix touched.

### How the two sides are evaluated

| Side | When it is evaluated | What it reads | What it causes |
|---|---|---|---|
| W-001's four conditions (predicates 1 to 4 above) | Per chunk, when the chunk lands | The task result and the records of its landing | Stops the loop: the agent stops, summarizes and waits |
| The four meta-review signals | At the end of a count of stranger rounds | The review record of one text | Flags the text: `Meta-review: pending`, and the delivering report asks the owner to dispatch a meta-review |
| The limit of ten rounds | After each round, when the count reaches ten | The round count in the review record | Holds the text: it is not delivered before the owner decides delivery, rework or withdrawal; the text is also a meta-review subject |
| `dispatch.md`'s bounded-attempts rule | Per round-trip on one node and stage, at acceptance | The Orchestrator's count of consecutive unsuccessful round-trips | Blocks the pair after the second consecutive failure and escalates to the owner with the history |
| `dispatch.md`'s scope budget | Per task, against the grant | The task count or token total spent | Stops the loop on exhaustion, like any other stop condition |

### The rows

| Row | Signal or limit (v1.6.0) | Counterpart | The difference | The rewording at `195eba9` |
|---|---|---|---|---|
| 1 | "in two or more rounds of the count, a fix did not reach the prose or was not confirmed" | `dispatch.md`'s bounded-attempts rule, and W-001 condition 1 (a failed check) where a check covers the claimed change | Condition 1 stops at the first failure a check sees, inside one chunk. Bounded attempts blocks after two consecutive failed round-trips on one pair; the signal counts any two rounds of a count. No rule sees a result that claims a change its commits lack unless a check covers that change. | Unchanged. The row stands. |
| 2 | "a finding declined in an earlier round was raised again, or a restatement mismatch recurred on one passage" | Partial. The declined-finding half: `dispatch.md`'s bounded-attempts rule, through "the same `needs-judgment` question returning". The restatement half: **no counterpart** | Bounded attempts counts a role's question to the owner coming back. The signal counts a reviewer re-raising a finding the author declined. No W-001 condition and no `dispatch.md` rule reads a restatement. | The two triggers become two sentences ("also fires when"). Same triggers; the row stands. |
| 3 | "the prose grew across the count by more than one tenth of its round-1 word count" | **No counterpart** | A scope budget is the nearest rule. It bounds what a grant may spend, fixed before the work. It does not measure how one deliverable grows across attempts. W-001 has no size condition. | The signal now reads words per IR claim, not the total word count, so growth from added claims no longer fires it. A budget is further still from a density measure. No counterpart; the row stands. |
| 4 | "after round 3, a stranger found a contradiction in a passage an earlier round's fix touched" | W-001 condition 1 (a failed check), where a check covers the regression; otherwise none | Condition 1 fires on the first occurrence in any chunk, and does not know which earlier change caused it. The signal fires only past a round threshold, and only on a passage an earlier fix touched. Task T015's `check-failed` event is a case: the suite went red because of an earlier task's acceptance commit, and a later chunk's check caught it. | "In round 3 or later" moves the threshold one round earlier. Condition 1 has no round threshold, so the row stands. |
| 5 | The limit of ten rounds: "a text is a meta-review subject when its count reaches the limit" | `dispatch.md`'s bounded-attempts rule; and W-001 condition 3 (a chunk needing the owner's decision) when the limit is reached inside a chunk | Both bound attempts on one deliverable and end in the owner's decision with the history. Bounded attempts stops at two consecutive failures, the limit at ten rounds. At the limit the owner decides delivery, rework or withdrawal, so a chunk whose review reached the limit needs the owner's decision: predicate 3 stops it when the result returns `needs-judgment`. | Not reworded. The row stands. |

**How the hypothesis fared.**

- Row 1 is confirmed, and gains the bounded-attempts rule as the
  nearer counterpart for the recurrence the signal counts.
- Row 2 is confirmed for its declined-finding half. Its restatement
  half has no counterpart, which the hypothesis did not say.
- Row 3 changes from "partial: a scope budget" to **no counterpart**. A
  budget bounds spend, not the growth of one text.
- Row 4 is confirmed.
- Row 5 changes. The hypothesis named the end of the ratified chunk
  list and a scope budget. Both bound a sequence: the number of
  distinct chunks, and the total spend. Neither bounds repeated
  attempts on one deliverable, which is what the limit bounds. The
  bounded-attempts rule does, and W-001 condition 3 carries the
  owner's decision at the limit.

**The structural reading, tested.** The hypothesis read W-001's four
conditions as asking whether a chunk needs the human now, and the
signals as asking whether a loop converges. The table confirms it. The
conditions are evaluated per chunk, read a task result, and stop the
loop. The signals are evaluated at the end of a count, read a review
record, and flag a text. W-001 has no condition for non-convergence
across chunks.

One correction. A fired signal does reach a running sequence by one
path. The pinned text requires the report that delivers a meta-review
subject to ask the owner to dispatch the meta-review. When a chunk's
own stranger rounds produce a subject, the chunk's result carries that
ask, and predicate 4 stops the sequence. That path covers
non-convergence inside one chunk's review only. Nothing covers
non-convergence across chunks, such as successive chunks reworking the
same passage, or a sequence whose results grow while its checks pass.
In this project, the Orchestrator also reports a meta-review subject to
the communication-pipeline project ([roles.md](../process/roles.md),
*Reviewer (stranger)*). That is the signal applied as written, not a
counterpart.

**The "no counterpart" rows.** Row 3 and the restatement half of row 2
have no counterpart. Each needs a Backlog entry (parent decision 14)
and an answer in node P3-N016's determination (criterion D2). This
task proposes the two entries in its result; the comparison task
writes them with the readings' additions.

## The agreement result

Still to come. The comparison task writes it after both readings: the
agreement over all items, and over the items whose input existed.

## References

- [p3-n013-stop-conditions-decidable](../plans/p3-n013-stop-conditions-decidable.md):
  this node's plan, its decisions 4 to 6, the task sequence E1 to E4
  and the additions A2+, A3+ and A6+
- [p3-n005-sequence-mode (specification)](../specs/p3-n005-sequence-mode.md):
  criteria I1 to I5 and I11, child A's criteria A1 to A10, decisions 10
  to 13 and the gate record of 2026-10-29
- [dispatch.md](../process/dispatch.md): the immediate class, the
  handoff contract, the scope-grant fields and the bounded-attempts
  rule
- [observability.md](../process/observability.md): the run journal's
  fields and event kinds
- [Plan register](../plan-register.md), [Cost log](../cost-log.md) and
  [Ruling register](../rulings.md)
- Methodology at the pinned v1.6.0, commit `3e34829`:
  [W-001](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-001--two-delivery-modes-human-gated)
  (two delivery modes, human-gated) and
  [W-008](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
  (reports map their deliverables)
