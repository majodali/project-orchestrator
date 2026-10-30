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

**Parallel dispatch.** The Orchestrator MAY dispatch several
actionable pairs concurrently when their mutual independence is
recorded in the plan the gate approved — parallelism is a planning
product the owner has seen, never an Orchestrator improvisation.
Acceptance stays serial regardless (the single-writer rule), and the
dependency default above still gates `execute` on earlier siblings
`done` unless the plan records otherwise.

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
3. The asks part that
   [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
   requires, stated when empty. It lists what the role requests of the
   Orchestrator. Where the deliverable adds a Decisions-for-the-gate
   section, the asks part points at that section rather than copying
   its entries.
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
drift. This contract fixes four of them for any role that produces
them:

- Proposed register changes (new children from a breakdown, a stage
  transition, a backward transition with its reason) — proposed, not
  written; the Orchestrator is the register's single writer.
- Proposed [Project model](project-model.md) entries and edges, in
  that type's notation. They are proposed, not written. The
  Orchestrator is the model's single writer and records them in the
  acceptance commit, with one `edge-recorded` journal event per edge.
  A task whose brief names the model's instance among its writes is
  the stated case of the type's [writer
  rule](project-model.md#the-writer-rule).
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
