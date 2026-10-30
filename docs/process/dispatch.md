# Dispatch — the orchestration loop

Part of the [orchestration process specification](README.md).
Defines how work moves: what the Orchestrator may decide, how tasks
are handed to roles, what comes back, and what may start any of it.

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers) (a fresh agent
session): any role that dispatches, serves or verifies a task. It
assumes the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), and the
[process specification's](README.md) defined terms.

## The loop

**The Orchestrator's own working set is minimal** (trial-3 finding:
a ~30-minute orientation phase dwarfed a 10-minute loop): the Plan
register, the Backlog, and this document — nothing else at startup;
other spec documents on demand, and any read beyond the set is the
Orchestrator's own packet-widening, journaled like a role's. The
Orchestrator never waits on timers or polls: dispatched work
notifies on completion.

Given a current [Plan register](plan-register.md), Backlog, and the
project's [profile](profiles.md), the Orchestrator repeatedly:

1. **Selects** the next actionable (node, stage) pair. A pair is
   actionable iff all of: the stage's entry conditions hold
   ([plan-model.md](plan-model.md)); every dependency is satisfied —
   the default (trial-1 finding 3): entering `execute` requires
   earlier siblings `done`; entering `plan`, `specify`, or
   `break down` requires only that dependencies recorded in the plan
   documents are met; and the pair lies inside the current
   **approved scope**. Among actionable pairs, selection is register
   order (depth-first, document order) — deterministic, no judgment.
2. **Dispatches** a task: the (node, stage) pair, the role the
   profile assigns to that stage, and the assembled context packet.
3. **Accepts** the result: verifies the handoff contract below was
   met and the [form checks](auditing.md) pass, records the stage
   change in the register (and synced Backlog designation) and the
   [cost-log entry](cost-log.md), then loops. The form checks also
   run before step 1's selection — a failing register blocks dispatch
   until repaired. The handoff check covers every field of the
   [result core](#def-result-core). A result missing a core field is
   not accepted. Each located finding the result reports becomes a
   Backlog addition in the acceptance commit, unless the next task in
   scope acts on that file. That task's brief then carries the finding
   instead.
4. **Stops** at a gate, on an empty actionable set, on a blocked
   task, or on exhausting approved scope — and summarizes to the
   owner (W-001: deliver, summarize, stop).

**A ratified sequence.** Where the owner has ratified a sequence, the
loop runs it as [Sequence mode](#sequence-mode) states. The four steps
above hold unchanged for each member.

**Parallel dispatch.** The Orchestrator MAY dispatch several
actionable pairs concurrently when their mutual independence is
recorded in the plan the gate approved — parallelism is a planning
product the owner has seen, never an Orchestrator improvisation.
Acceptance stays serial regardless (the single-writer rule), and the
dependency default above still gates `execute` on earlier siblings
`done` unless the plan records otherwise. Inside a ratified sequence,
dispatch is serial ([Sequence mode](#sequence-mode), the run).

## The orchestration service (optional accelerator)

A managed project MAY be enlisted against a deployed
[orchestration service](../plans/orchestration-service.md) instance,
which lets a session read and update its Plan register through MCP
tools instead of editing the register by hand — git remains the sole
source of truth regardless
([orchestration-service](../plans/orchestration-service.md),
constraint 1). [enlistment.md](enlistment.md) covers taking a
repository from not enlisted to enlisted, and confirming it worked.

**The fallback rule.** With the service unreachable — the endpoint
does not answer, or the session's own credential is not configured —
a session does not retry and does not wait. It proceeds on this loop
exactly as written above, editing the register and committing
directly: the service is never a dependency, only an accelerator when
it answers. This is the standing mitigation this project records for
[R12](../open-risks.md) in the Risk register. A failure to connect
is a settled fact for the rest of the session. The session does not
re-examine it, whatever its surface's notices suggest
([R17 (the harness's guidance pushes against the fallback rule)](../open-risks.md)).

## Judgment routing

The Orchestrator makes **low-judgment decisions only**: those the
register, Backlog, and this spec decide mechanically. Everything else
is routed, never resolved in place:

- **High-judgment → an advanced-model role.** Design choices,
  scoping, specification content, conflict between artifacts,
  interpretation of ambiguous criteria — dispatched to Planner or
  Reviewer per the profile.
- **Owner-gated → the human owner.** Whatever the methodology or the
  profile reserves to humans: chunk go-aheads, test-condition changes
  (W-002), deviation decisions, anything touching approved-scope
  boundaries.

If the Orchestrator cannot classify a decision as low-judgment, it is
not one. A dispatched role that meets a decision above its own
authority returns `needs-judgment` rather than deciding.

**Prose routing.** When a task result carries an intermediate
representation (IR), the Orchestrator routes its rendering and review
mechanically from the IR alone, in the order given; the first
condition that holds decides (accepted from the
[communication-pipeline proposal](../proposals/communication-pipeline-roles.md),
2026-10-26; the thresholds are the methodology specification's
rendering conditions and are tuned there).

| Condition | Dispatch |
|---|---|
| the IR's header carries `Normative: yes` | the author renders; Reviewer (stranger) rounds until readable |
| the owner flagged the output for review | Paraphraser, then Reviewer (stranger) rounds until readable |
| the result is a document for a fresh session or an external reader (RD-4, RD-5) | Paraphraser, then Reviewer (stranger) rounds until readable |
| the IR has a proposed term | Paraphraser; the gate summary carries the ratification ask |
| the result is for the owner returning (RD-2) | Paraphraser |
| the result is for the owner in conversation (RD-1) and has more than six claims, a dependent ask, or a claim over thirty words | Paraphraser |
| the result is for the Orchestrator (RD-3) and has more than twelve claims or a dependent ask | Paraphraser |
| otherwise | neither; the IR is delivered as it stands |

## Owner-decision economics

Owner ruling at trial 2 (2026-08-25): the owner's attention is the
scarcest resource in the loop; these rules spend it at gates, in
batches, against stated defaults.

- **Precedent first.** Before a decision is staged to a gate, the
  Orchestrator checks the [Ruling register](rulings.md) for an
  exact-match active ruling; a match decides silently (journaled,
  listed one-line in the gate summary). A near-match is the
  Planner's to cite as its default's rationale. Gate crossings
  capture new rulings from every adopted or overridden decision.
- **Defaults are mandatory.** Every decision routed toward the owner
  MUST carry a recommended default and its one-line rationale. A
  decision without a default is not ready to route.
- **Affected locations travel with the decision.** Every staged
  decision carries a third field after its default and rationale: the
  locations its adoption would leave contradicted, each with drafted
  text
  ([K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable)).
  The drafted text is a correction where the document is `active`, and
  a supersession marker otherwise. A decision with no such location
  states "Affected locations: none". The Planner enumerates the
  locations and drafts the text. At gate crossing the Orchestrator
  places the adopted option's drafted text verbatim, in the commit
  that captures the ruling.
- **Decisions batch at the gate.** The gate summary lists them
  numbered, defaults stated; the owner's go-ahead adopts every
  default not explicitly overridden by number. One decision per
  gate, not N.
- **Only four classes interrupt the loop** (the *immediate class*):
  approved-scope expansion — additional repositories included;
  changes to existing test conditions (W-002); deviations from this
  spec or the methodology; budget overrun. Everything else waits for
  the gate.
- **Findings route to registers, never to chat.** Spec defects go to
  this repo's Backlog (the R6 path), risks to the Risk register,
  discovered scope to the managed project's Backlog. Chat carries
  only what needs a human answer.
- **Standing pre-authorizations.** A scope grant MAY pre-clear
  bounded decision classes — tier raises where the Planner argues
  them; parallel dispatch of plan-marked-independent nodes; named
  additional repositories, read or write. Each exercise of a
  pre-authorization is recorded in the journal. A pre-cleared
  decision stops being a decision.
- **Cross-repo reach is scope.** Approved scope is single-repo by
  default; a repository beyond the project's own MUST be named in
  the grant before any role touches it. A needed-but-unreachable
  repo is recorded (Backlog, or `blocked` where it stops the node)
  — never worked around.

## The handoff contract

Every task hands the role a fully enumerated brief; every completed
task returns a fixed shape.

**Task brief** (assembled by the Orchestrator):

1. Project identity: the Binding block and Classification.
2. The node: its register line, its ancestors' one-line path, and its
   plan/specification documents.
3. Stage-specific inputs per the packet table below.
4. The role's charge for this stage and the expected outputs,
   including which documents the role updates in its work commit
   (W-003) and the explicit note that decisions above the role's
   authority return `needs-judgment`.

**Task result** (returned by the role). Every task result is a report
to a [delegating agent](https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-delegation),
the Orchestrator, under
[W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables).
That rule sets what the report owes. This contract fixes the order of
its parts and adds the fields the rule does not cover.

<a id="def-result-core"></a>The **result core** comes first, in this
order:

1. Status: `done` · `blocked: <reason>` · `needs-judgment:
   <the decision, the options seen, the role's recommendation>`.
2. The deliverable map that
   [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
   requires: what the task delivered, and where. For work, that is
   commits on a single-use branch named for the node's outcome
   ([W-006 (names follow outcomes; branches are single-use)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-006--names-follow-outcomes-branches-are-single-use)),
   with documentation moved in the same commits
   ([W-003 (documentation moves in the same commit as the work)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-003--documentation-moves-in-the-same-commit-as-the-work)).
   Where the execution surface mandates a session-assigned branch
   name (cloud sessions do), the mandated branch satisfies this
   clause. The task result notes it, and the branch stays single-use
   in substance: one deliverable, deleted after merge.
   The map names each commit with the full name of its repository,
   such as `majodali/project-orchestrator`. It names each check the
   task ran, by its command or its criterion, with one outcome word
   from [predicate 1](#predicate-1-a-failed-check)'s pass or failure
   list. It raises a matter of the immediate class
   ([owner-decision economics](#owner-decision-economics)) in the
   words "immediate class", with the class named.
3. The asks part that
   [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
   requires, stated when empty. Each ask names its
   [addressee](../specs/p3-n005-sequence-mode.md#decisions-for-the-gate),
   the owner or the Orchestrator. An ask that names neither counts as
   owner-addressed. An ask addressed to the Orchestrator requests only
   what the Orchestrator discharges at acceptance under the loop's
   step 3: a register change, a Backlog addition, a record, or the
   merge of the task's own branch. Any other ask addressed to the
   Orchestrator fails the handoff check, and the Orchestrator journals
   `check-failed` for the task. Where the deliverable adds a
   Decisions-for-the-gate section, the asks part points at that
   section rather than copying its entries. (Corrected 2026-10-30 by
   node P3-N014 under its criterion B5. The item said the asks part
   lists what the role requests of the Orchestrator. Decision 11 of
   the
   [P3-N005 specification](../specs/p3-n005-sequence-mode.md#decisions-for-the-gate)
   replaced that with the addressee rule. What the Orchestrator may be
   asked is decision 6 of the
   [P3-N014 plan](../plans/p3-n014-loop-runs-sequence-mode.md#decisions-for-the-gate).)

   The asks part holds only what its reader can act on now. The asks
   part may hold an open question the reader can answer on the spot.
   An open question that waits on other activity, and an item the
   report says needs no answer yet, go in a *What changed* part
   instead. A result that holds such a question carries that part,
   after the asks part. W-008 (reports map their deliverables) lets a
   report to an agent include it. This restates the
   owner's clarification of 2026-09-17
   ([P3-N005 plan](../plans/p3-n005-sequence-mode.md#the-four-stop-conditions-and-what-makes-each-decidable)).
4. Terms introduced, as
   [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
   requires, when the result has any.
5. Located findings: each contradiction with a recorded decision that
   the role found and did not correct. Each is given as
   [K-011 (found contradictions are marked, not routed around)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-011--found-contradictions-are-marked-not-routed-around)
   defines a located finding: the file, the location, and the decision
   contradicted. The field states "none" when there are none.
6. Packet widenings: every read beyond the enumerated packet, with its
   reason ([Context packets](#context-packets)). The field states
   "none" when there are none.
7. Session usage for the [cost log](cost-log.md): model, and token
   counts as reported by the harness.

A role's own fields sit between items 4 and 5, named in its contract
([roles.md](roles.md)). They are attributable to the role, never to
drift. This contract fixes three of them for any role that produces
them:

- Proposed register changes (new children from a breakdown, a stage
  transition, a backward transition with its reason) — proposed, not
  written; the Orchestrator is the register's single writer.
- Backlog additions for everything identified and not executed
  (owner ruling 1: at any time, from any unit of work).
- An intermediate representation (IR) beside the prose, or instead
  of it, when the result introduces a term, records a decision, or
  states a register fact. The IR is the map the Orchestrator reads at
  acceptance: its asks are the asks; its proposed terms are the terms
  the gate summary lists on its *Terms* line ([Gates](#gates-v1)); its
  claims with status proposed are what changed. A document this
  project drafts for the methodology corpus is written IR first,
  whatever else the result carries. Its IR travels with it under the
  provenance line of RU-015 (upstream delivery form), per
  [RU-022 (corpus-bound documents are written IR first)](../rulings.md),
  which carries
  [W-009 (the methodology corpus writes its deliverables IR first)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-009--the-methodology-corpus-writes-its-deliverables-ir-first)
  to this project. A role whose text comes back with a Reviewer
  (stranger) findings table acts on each finding. It fixes the
  finding, or declines it with a reason that the next round's brief
  carries ([roles.md](roles.md), Reviewer (stranger)).

## Failure containment

The loop's failure modes are registered in the
[Risk register](../open-risks.md); these are the containment rules
they cite:

- **Bounded attempts.** The Orchestrator counts consecutive
  unsuccessful round-trips per (node, stage) — a verification
  rejection, a redispatch after a check failure, the same
  `needs-judgment` question returning. After the **second**
  consecutive failure the pair becomes `blocked` and escalates to
  the owner with the history; the loop never retries its way through
  a disagreement.
- **No silent drops.** Every gate or stop summary MUST enumerate all
  non-terminal nodes in scope, each as exactly one of: actionable ·
  in-flight · blocked (with reason) · gated. A node fitting none of
  these is an orphan — a check failure, not a footnote.
- **Stale tasks.** A dispatched task with no result when the
  orchestration session ends is recorded `stale` in the
  [run journal](observability.md); redispatch requires a fresh form
  check first. Nothing is presumed still running across sessions.
- **Scope budgets.** When granting scope at a gate, the owner MAY
  attach a budget — a task count or token total; exhaustion is a
  stop condition like any other, reported in the summary.

## Context packets

Dispatch prompts MUST enumerate the packet — never "read the docs".
The packet is what is pushed; the repository stays readable, and a
role MAY pull more when its task genuinely needs it, but a packet
that routinely proves insufficient is a spec defect to fix here.

| Stage | Packet beyond the base (base = brief items 1–2, plus the project's Backlog, whole) |
|---|---|
| plan | Parent's plan and specification documents, whole; sibling one-liners with stages; the process spec's profiles.md and dispatch.md's owner-decision-economics section; the Ruling register |
| specify | The node's plan and the parent's specification, whole documents; the process spec's profiles.md and plan-model.md; the Ruling register |
| break down | The node's specification; profile's leaf-size guidance |
| execute | The node's specification; design notes and code paths it names; repository metadata (git log/branch/remote) where the work cites real history |
| verify | The node's specification and criteria; the work's diff; test output |

Packets are deliberately small because the methodology's document
shape makes them assemblable: Classification, register lines, statused
plans, and specs are all bounded documents. The packet table is the
context-frugality contract — changes to it are spec changes, reviewed
as such.

## Trigger surfaces (v1)

Owner-confirmed current intent
([founding plan](../plans/orchestrator-v1.md), open question 3):

- The **human owner** starts and resumes orchestration; a session
  acting for the owner holds the approved scope granted at the last
  gate.
- Within approved scope, the Orchestrator MAY dispatch role sessions
  (subagents or sibling cloud sessions) without further human input.
- Scheduled Routines MAY only resume or check on in-flight approved
  work — they MUST NOT start new scope.
- PR-activity events MAY wake sessions to drive PRs created by
  orchestrated work to green, within approved scope.
- Nothing else starts orchestrator work unbidden. Audit delivery
  remains the Auditor/`mtool` channel defined by the methodology's
  audit process.

## Gates (v1)

All gates are human gates. A gate is attached to a node at any level,
designated by the owner when approving scope; crossing one requires
the W-001 ceremony: summarize, review, explicit go-ahead — recorded
where the summary was given and reflected in the plan document.
Risk-triggered gating and parallel review are explicitly out of v1
(founding plan, standing constraint 6).

At a crossing, the Orchestrator places each adopted decision's drafted
text at its affected locations, verbatim, in the commit that captures
the ruling (owner-decision economics, above).

**A scope grant states**: the approved nodes and stages; where the
gates are; any budget (task count or token total); any standing
pre-authorizations; any additional repositories.

**The gate summary follows this template.** A gate summary is a
report to the owner, the principal audience of
[W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables).
It opens with an outcome line. The rule's four parts follow in the
rule's order, each stated when empty in the rule's own words. The
numbered decisions are the asks, term ratifications included. The
open, precedents, costs and blockers lines close it
([specification of P1-N014 (role contracts adopt the methodology's conduct rules)](../specs/p1-n014-role-contracts-adopt-conduct-rules.md),
decision 12: the gate summary template). The target is under about 24
lines. The Liaison relays it verbatim in substance.

```
GATE <node or gate name> — <the outcome or the decision needed, one line>
Asks       (go adopts all defaults; override by number):
  1. <decision> — default: <choice> (<one-line rationale>)
  2. Ratify or strike <term> — default: <ratify | strike> (<rationale>)
Covered:   <what the gated documents encode that the owner already
            settled, or the stated-empty part>
Changed:   <node> <from> → <to> [hold]      (one line per node moved)
  Detail: <path(s) to the plan/spec Decisions-for-the-gate sections>
Terms:     <each term introduced, with its meaning in one sentence, or
            the stated-empty part>
Open:      <every non-terminal node in scope: actionable | in-flight
            | blocked (reason) | gated>     (the no-silent-drops list)
Precedents: <rulings applied this run, e.g. RU-003 → T012; omit if none>
Costs:     <tasks, total tokens, models, wall-clock per task from
            the journal>
Blockers:  <only if any>
```

Every decision the gate carries appears in the numbered list — minor
ones MAY be batched as one numbered entry whose default is "as
recorded", with the Detail line pointing at the document section
(trial-3 finding: unnumbered decisions referenced in prose gave the
owner nothing to review or override).

**The Asks of a gate summary** follow the handoff contract's item 3.
They hold only what the owner can act on now. An open question that
waits on other activity, and an item needing no answer yet, go on the
*Changed* line
([P3-N014 plan](../plans/p3-n014-loop-runs-sequence-mode.md#decisions-for-the-gate),
decision 5).

**The gate record.** The owner's go-ahead is recorded in the gated
document, in a section headed "Gate record, <date>". The section names
each staged decision by its number, or by a range of numbers such as
"defaults 1 to 11", with the word "adopted" or "overridden". An
override also names the option taken.
[Predicate 3](#predicate-3-a-chunk-needing-the-owners-decision)'s test
2 reads this form.

## Sequence mode

Methodology
[W-001 (two delivery modes, human-gated)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-001--two-delivery-modes-human-gated)
offers a second mode beside the per-chunk gate. The owner approves a
chunk sequence once, and the agent lands its chunks with no gate
between them. This section is how this project's loop runs that mode.
It adds to the loop above and changes none of it. The loop runs a
sequence only when the owner has ratified one. Otherwise the per-chunk
gate holds. The section's sources are the
[P3-N005 specification](../specs/p3-n005-sequence-mode.md), child B,
and the [P3-N014 plan](../plans/p3-n014-loop-runs-sequence-mode.md).

A [member of a sequence](../specs/p3-n005-sequence-mode.md#gate-record-2026-10-29)
is a chunk the owner ratified: one node, with the stages ratified for
it. Each member runs as one or more tasks of the loop.

### Ratification

Only the owner ratifies a sequence, at a gate. The Orchestrator never
ratifies, extends or infers a sequence, from register order or from
anything else. A delegating agent carries the owner's ratification to
the roles it dispatches. It never creates one.

The ratification record is a section headed "Sequence ratified,
<date>" in the document of the node whose gate ratified it. It holds
the scope-grant fields of [Gates](#gates-v1) and one line more
(P3-N005 specification, decision 13):

- **Members**: each member's node and each of its stages, one by one,
  in dispatch order. A grant "up to" a gate is not a member list.
- **Budget**: a task count or a token total, or "none".
- **Pre-authorizations**: each named by its immediate class, or
  "none".
- **Additional repositories**: each by its full name, `owner/name`, or
  "none".
- **Accepted risks**: one line, stated "none" when there are none.

The gate that closes the sequence is the end of the member list. The
record never waives the stop on asks, and never says it does. The
Orchestrator journals `sequence-ratified` before the first member's
`dispatched` event ([observability.md](observability.md), event
kinds).

### The run

The Orchestrator dispatches the members in the record's order, one
task at a time. A task is dispatched only after the previous task's
`accepted` event (P3-N005 plan, decision 6). Parallel dispatch does
not apply inside a sequence. No gate opens between members: while the
sequence runs, the Orchestrator journals no `gate-opened` or
`gate-crossed` event for a member. Each task is dispatched, served and
accepted as the loop's four steps state.

### Landing

For each member's result, the Orchestrator first runs the loop's
step 3. Whether the result is accepted follows step 3 alone, applied
unchanged: a result whose status is not `done`, whose checks do not
pass, or whose work lies outside the ratified scope is not accepted.
The Orchestrator writes the member's result record (below) in the
`result-received` event. After the acceptance decision, it applies
the four predicates below to that record. A member stopped by
predicate 4 has landed: it is accepted, and then the sequence stops.
So has a member stopped by any test of predicate 3 other than the
status test.

### Stops

The sequence stops when any of the four predicates yields stop for a
member. It also stops on the loop's step-4 stops: an empty actionable
set, a blocked task, and exhausted scope. The end of the member list
is exhausted scope, and so is an exhausted budget
([Failure containment](#failure-containment), scope budgets). No
other condition stops a sequence (P3-N005 specification, decision 14).

### Stop, summarize, wait

On a stop, the Orchestrator journals `sequence-stopped`, writes a stop
summary, and waits for the owner. Nothing is dispatched after a stop
until the owner ratifies a sequence or grants scope at a gate.

The stop summary follows the gate summary's template
([Gates](#gates-v1)). Its asks are the stopping member's asks only,
verbatim. Asks are never rolled up across members. The summary names
every ratified member not yet dispatched as `gated`, under the
no-silent-drops rule ([Failure containment](#failure-containment)).

Each member is summarized as it lands: its result record is in the
journal before the next task's `dispatched` event.

### The member's result record

Inside a ratified sequence, the `note` of a member task's
`result-received` event is the audit record the owner reads at the
gate (P3-N005 specification, criteria B4 and G2, decision 12). It
holds every input the four predicates read, in this order:

1. **The status token**, first, as predicate 3's test 1 reads it:
   `done`, `blocked` or `needs-judgment`, followed by the reason where
   one is given.
2. **Checks**: each named check, by its command in code formatting or
   by its criterion's ID, with one outcome word from predicate 1's
   pass or failure list. A check the role did not run is stated
   "unrun", which records no outcome.
3. **Refs**: each commit hash, with the full name of its repository
   in the sentence that holds the hash.
4. **Flags**: "none", or each immediate-class matter in the words
   "immediate class", with its class.
5. **Findings**: the result's located findings field, verbatim.
6. **What changed**: the result's *What changed* part, verbatim, or
   "none".
7. **Asks**: the result's Asks part, verbatim, or its stated empty
   form. Where the result carries an intermediate representation (IR),
   the IR's asks.

The Orchestrator copies each part from the result. It never completes
a missing part from its own reading of the work: a part the result
lacks is written "missing", and the predicate that reads it fails
closed. The note may be as long as the record needs
([observability.md](observability.md), events).

The member task's `accepted` note opens with the outcome of the
Orchestrator's own form-check run. No note of a member's task states a
predicate verdict. Such a note would put a predicate's own words
beside the check names the predicate matches. The one exception is
the `sequence-stopped` event, whose note opens with the condition that
stopped the sequence.

Outside a sequence, the `result-received` note keeps its present form.
The record form was tried once outside a sequence, on node P3-N014's
execute task (P3-N005 specification, criterion B4).

### The service

Nothing in sequence mode needs the
[orchestration service](#the-orchestration-service-optional-accelerator).
With the service unreachable, the fallback rule holds, and the mode
runs on git alone (P3-N005 specification, criterion I12).

### The obligation table

Each MUST and MUST NOT of W-001's text on the pre-ratified sequence,
and each of its statements that binds the mode, maps to the sentence of
this section that carries it (P3-N005 specification, criterion I8).
The quotes are from methodology W-001 at v1.6.0, commit `3e34829`
(2026-10-28), read from the tag on 2026-10-30. The methodology's
release register names no change to W-001 after v1.6.0 in its
*Unreleased* section on that date.

| Row | W-001 at v1.6.0 | Carried by |
|---|---|---|
| 1 | MUST: "gate every chunk on summary and human review or, where the human has approved a chunk sequence in advance, on the sequence's stop conditions below" | *Stops*: "The sequence stops when any of the four predicates yields stop for a member." The per-chunk gate is the loop's step 4. |
| 2 | "The approval is still explicit and still precedes the first chunk" | *Ratification*: "The Orchestrator journals `sequence-ratified` before the first member's `dispatched` event." |
| 3 | "Only the human owner pre-ratifies" | *Ratification*: "Only the owner ratifies a sequence, at a gate." |
| 4 | MUST NOT: "a delegating agent MUST NOT pre-ratify a sequence it dispatches unless the human has already ratified that sequence" | *Ratification*: "The Orchestrator never ratifies, extends or infers a sequence, from register order or from anything else." |
| 5 | "The agent then lands the chunks in order without stopping between them" | *The run*: "The Orchestrator dispatches the members in the record's order, one task at a time." and "No gate opens between members." |
| 6 | MUST stop, summarize, and wait when "a check fails — the project's gate, whatever it is" | Predicate 1; *Stop, summarize, wait* |
| 7 | MUST stop, summarize, and wait when "the scope changes — the work diverges from the agreed chunk list" | Predicate 2; *Stop, summarize, wait* |
| 8 | MUST stop, summarize, and wait when "a chunk turns out to need a decision that is the human's to make" | Predicate 3; *Stop, summarize, wait* |
| 9 | MUST stop, summarize, and wait when "a chunk's landing summary carries asks — anything requested of the human, whether a decision or an action" | Predicate 4, with the addressee rule of [the handoff contract](#the-handoff-contract)'s item 3; *Stop, summarize, wait* |
| 10 | "each chunk is still summarized as it lands" | *Stop, summarize, wait*: "Each member is summarized as it lands: its result record is in the journal before the next task's `dispatched` event." |
| 11 | "Asks are never rolled up across chunks" | *Stop, summarize, wait*: "Its asks are the stopping member's asks only, verbatim." |
| 12 | MUST NOT: "a pre-ratification MUST NOT purport to waive the asks stop" | *Ratification*: "The record never waives the stop on asks, and never says it does." |

Rows 6 to 9 share the stop, the summary and the wait: *Stop, summarize,
wait* carries all three for each.

### The predicates

The four predicates follow, from *How a reading applies the
predicates* to the end of *Predicate 4*. They are copied byte for byte
from the [record of node P3-N013](../findings/p3-n005-stop-predicates.md)
at commit `fcf4894`, its draft 4, the text both readings last scored
(P3-N005 specification, criterion I7). Any change to them is a
revision both readings re-score. Read them with this mapping:

- An **item** is a member's task.
- A **reading** is whoever applies the text: the Orchestrator at
  landing, or the owner at audit (criterion G2).
- *The result record* is the member's result record above.
- *The corpus statement*, and every clause that names the corpus, are
  the record's. They bind the record's readings of past tasks, never a
  member. The *verdict file* is the record's too.
- Inside a sequence, predicate 2's *naming forms* are the full names
  the ratification record holds.

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

**The item's notes.** A note of the item is the `note` field of a
journal event whose `task` field is the item's ID, of any event kind,
or the notes column of the item's Cost log row. An event with no task
ID is a note of no item, even when it names the item's node or reports
the item's checks. Gate events are read only where predicate 2's
stand-in grant and predicate 3's test 2 name them, and as those texts
state. The *result's notes* are those of its `result-received` and
`accepted` events and its Cost log row. A `dispatched` note is the
brief, not the result.

**The item's node and stage.** They are the `node` and `stage` fields
of the item's `dispatched` event, or of its `accepted` event when it has
no `dispatched` event.

**The member.** Inside a sequence, the predicates read a
[member of a sequence](../specs/p3-n005-sequence-mode.md#gate-record-2026-10-29):
a chunk the owner ratified. For the corpus, the member is the item's
node. An item with no node has no member and no member documents.

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
   retired) retired. A note names the form check when it holds either
   command, the script name `form_check` with or without an extension,
   or the words "form check" or "form checks", in any case.
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

- Pass: "clean", "pass", "passes", "passed", "green", "met",
  "satisfied", "holds", "0 violations", "0 errors", "in sync", "exit 0",
  or a count *N/N* whose two numbers are equal.
- Failure: "fail", "failed", "red", "caught", "not met", a violation
  count above zero, a non-zero exit, or a count *N/M* with *N* below
  *M*.

When a note states more than one outcome for one check, the last one
stated is its outcome. When two notes state different outcomes for one
check, the failure stands. A failure made on purpose to prove that a
check, a test or a pipeline can fail, and then reverted or restored, is
not a failure outcome. A failure a note states without naming a check,
such as a failed deploy or a denied permission, is the outcome of no
named check.

A verdict stated for all criteria at once, such as "all eight criteria
met" or "every criterion holds", records the outcome of each. When the
same sentence states an exception, such as "every criterion holds (G4
not confirmable)" or "passes except G5 untested", each excepted
criterion takes the outcome the exception states, and the others take
the verdict. A statement that verification happened without its
outcome, such as "self-verified", "re-verified" or "checked", records
no outcome. So do
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
   the item's own node and the nodes under it that the result's notes
   name with a stage transition of its own, written
   `<stage> -> <stage>` or `<stage> → <stage>`. A *stage word* is one of
   the seven node stages of `plan-model.md`: `identified`, `planned`,
   `specified`, `broken-down`, `executing`, `verifying` and `done`. A
   punctuation mark after the second stage word ends it. An arrow with a
   word other than a stage word on either side is not a transition. A
   transition belongs to the node whose ID
   stands immediately before it, with nothing between them but a colon
   or spaces. A transition with no node ID immediately before it belongs
   to the item's own node. A node named without a transition of its own
   is not added.
2. *Repositories written.* A *recorded ref* is a commit hash in the
   `ref` field of a journal event whose `task` field is the item's ID.
   A ruling ID in a `ref` field, such as `RU-001` in a
   `precedent-applied` event, is not a recorded ref. The corpus
   statement's table lists each item's recorded refs.

   Set 2 holds this repository when a recorded ref of the item resolves
   in it, or when the item records no ref. For each recorded ref that
   does not resolve in this repository, set 2 holds each repository
   that a note of the item names in a naming form. Every note of the
   item counts for this, of any event kind: a `dispatched` note, a
   `packet-widened` note and a sentence reporting a read count too.
   Naming a repository identifies where a ref was written; it is not a
   read added to a set.

   The *naming forms* are a closed list, matched in any case: the full
   names the scope names, and the phrases the corpus statement lists
   for the corpus. No other wording names a repository. Not "the
   service" alone; not "this repo", "this repository" or "the
   repository"; not a pull request number without a full name; and not
   another string of the shape `owner/name`, such as
   `actions/checkout` or "input/output".

   Set 2 also holds each repository that one of the *result's notes*
   names in a naming form in the same sentence as a commit hash, a
   branch name or a pull request number. A *commit hash* is a run of 7
   to 40 characters from `0` to `9` and `a` to `f` that holds at least
   one digit. A *branch name* is the word after "branch" or "branches"
   when that word holds a hyphen or a slash, so "a branch diff" holds
   none. A *pull request number* is `#` followed by digits.

   A ref that does not resolve here, and whose repository no note of
   the item names in a naming form, is an unknown repository.
3. *Immediate-class flags.* `dispatch.md` names four immediate classes:
   approved-scope expansion, a change to an existing test's conditions
   under methodology W-002 (existing tests are signals, not obstacles),
   a deviation from the process specification or the methodology, and
   budget overrun. A flag is raised by a note of the item, in an event
   of any kind, that holds the words "immediate class",
   "immediate-class" or "immediate-escalation". Its class is the class
   the same note names: an additional repository or a scope expansion;
   W-002 or a change to an existing test's conditions; a deviation; or
   a budget overrun. A W-002 flag is also raised by a note of the item
   that states an existing test or assertion was modified, retired or
   deleted, or that a licence or ruling for a test change was applied.
   The verbs are those three, in any tense; another verb, such as
   "made false" or "broke", does not raise the flag. The note must call
   the thing changed a test or an assertion; a harness, a fixture or a
   script is not a test.

**Compares** by membership.

- Each element of set 1 is a node and stage the scope grants. A grant
  of a node "and every node under it" grants every stage of each.
- Each element of set 2 is this repository or a repository the scope
  names. A member's *Repository reach* section, where its plan or
  specification has one, adds the repositories it names. Without one,
  `dispatch.md`'s default holds: approved scope is this repository
  alone.
- Each flag of set 3 is named by one of the scope's
  pre-authorizations. A pre-authorization names a flag when it names
  the flag's class. A W-002 disposition or a ruling that licenses a
  test change names the W-002 class, whichever test it names.

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
   of these hold.
   - *The record.* A gate record section adopts or overrides the
     entry. The section is in the same document, or in the other
     member document whose stated node is the same. A gate record
     section is a section headed "Gate record", "Gate outcome" or "Hold
     released", with a date. It adopts an entry by its number, by a
     range holding the number, or by stating that "all" or "every"
     staged decision or default is adopted, accepted or settled. The
     section is read as it stands at the cut-off, whatever its date.
     Its date names the gate; it does not time the adoption.
   - *The time.* The journal holds a `gate-crossed` event for the
     document's node, at the document's stage or a later one, whose
     `ts` is earlier than the item's first result event. The item's
     *first result event* is the earliest `result-received` or
     `accepted` event with its task ID. The stages are ordered
     `identified`, `planned`, `specified`, `broken-down`, `executing`,
     `verifying`, `done`. A plan's stage is `planned` and a
     specification's is `specified`. A `gate-crossed` event whose
     `stage` field holds none of the seven, or is empty, times nothing.

   Only the event times the adoption. A `gate-crossed` event at or
   after the item's first result event is not read for this item,
   however long after; the test has no window. A `gate-crossed` event
   alone adopts nothing.

   An entry is a numbered entry only. A bullet or a paragraph of the
   section is not an entry. A `plan` or `specify` item whose result
   stages decisions therefore stops on them: they wait on the owner's
   gate.

   Test 2's stop is marked failed closed in two cases only. The item
   has no member. Or every unadopted entry fails *the record* alone,
   and neither member document of its node has a gate record section.
   A stop on an entry that fails *the time* rests on the journal's
   recorded gate events and is not marked failed closed.
3. *A located finding against the member's own documents.* The result
   reports a located finding (`dispatch.md`, the handoff contract)
   whose contradicted decision or criterion is in a member document.
   Only the owner amends an adopted criterion. In the corpus, a note of
   the item stands for it when one sentence holds "K-011" (found
   contradictions are marked, not routed around), the word "marked",
   and the member's plan or specification, named as "the plan" or
   "the specification" with no other node's ID. Each of these words
   matches in any case, so "Marked" matches. A contradiction a note
   reports without that marking does not match.
4. *An open question.* The result's *What changed* part, or its
   intermediate representation (IR), carries an open question that
   waits on other activity. The owner's clarification of 2026-09-17
   moves such a question out of Asks, so this test keeps it a stop
   (criterion I5, conditions 3 and 4 lose no stop together). In the
   corpus, one of the result's notes stands for it when one sentence
   holds the word "question" and one of "unresolved", "left open",
   "remains open" or "still open". A `dispatched` note is not read for
   this test.

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
