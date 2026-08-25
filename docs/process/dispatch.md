# Dispatch — the orchestration loop

Part of the [orchestration process specification](README.md).
Defines how work moves: what the Orchestrator may decide, how tasks
are handed to roles, what comes back, and what may start any of it.

## The loop

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
   until repaired.
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

## Owner-decision economics

Owner ruling at trial 2 (2026-08-25): the owner's attention is the
scarcest resource in the loop; these rules spend it at gates, in
batches, against stated defaults.

- **Defaults are mandatory.** Every decision routed toward the owner
  MUST carry a recommended default and its one-line rationale. A
  decision without a default is not ready to route.
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

**Task result** (returned by the role):

- Status: `done` · `blocked: <reason>` · `needs-judgment:
  <the decision, the options seen, the role's recommendation>`.
- The work: commits on a single-use branch named for the node's
  outcome (W-006), documentation moved in the same commits (W-003).
  Where the execution surface mandates a session-assigned branch
  name (cloud sessions do), the mandated branch satisfies this
  clause; the task result notes it, and the branch remains
  single-use in substance — one deliverable, deleted after merge.
- Proposed register changes (new children from a breakdown, a stage
  transition, a backward transition with its reason) — proposed, not
  written; the Orchestrator is the register's single writer.
- Backlog additions for everything identified and not executed
  (owner ruling 1: at any time, from any unit of work).
- Session usage for the [cost log](cost-log.md): model, and token
  counts as reported by the harness.

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

| Stage | Packet beyond the base (base = brief items 1–2) |
|---|---|
| plan | Parent's plan and specification documents, whole; sibling one-liners with stages; the process spec's profiles.md |
| specify | The node's plan and the parent's specification, whole documents; the process spec's profiles.md and plan-model.md |
| break down | The node's specification; profile's leaf-size guidance |
| execute | The node's specification; design notes and code paths it names |
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

**A scope grant states**: the approved nodes and stages; where the
gates are; any budget (task count or token total); any standing
pre-authorizations; any additional repositories.

**The gate summary follows this template** (target: under ~20
lines; the Liaison relays it verbatim in substance):

```
GATE <node or gate name> — <scope recap, one line>
Delta:     <node> <from> → <to> [hold]      (one line per node moved)
Open:      <every non-terminal node in scope: actionable | in-flight
            | blocked (reason) | gated>     (the no-silent-drops list)
Decisions  (go adopts all defaults; override by number):
  1. <decision> — default: <choice> (<one-line rationale>)
Costs:     <tasks, total tokens, models>
Blockers:  <only if any>
```
