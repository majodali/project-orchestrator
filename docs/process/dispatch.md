# Dispatch — the orchestration loop

Part of the [orchestration process specification](README.md).
Defines how work moves: what the Orchestrator may decide, how tasks
are handed to roles, what comes back, and what may start any of it.

## The loop

Given a current [Plan register](plan-register.md), Backlog, and the
project's [profile](profiles.md), the Orchestrator repeatedly:

1. **Selects** the next actionable (node, stage) pair. A pair is
   actionable iff all of: the stage's entry conditions hold
   ([plan-model.md](plan-model.md)); every dependency (earlier
   sibling, or parent-stage prerequisite) is satisfied; and the pair
   lies inside the current **approved scope**. Among actionable
   pairs, selection is register order (depth-first, document order)
   — deterministic, no judgment.
2. **Dispatches** a task: the (node, stage) pair, the role the
   profile assigns to that stage, and the assembled context packet.
3. **Accepts** the result: verifies the handoff contract below was
   met, records the stage change in the register (and synced Backlog
   designation) and the [cost-log entry](cost-log.md), then loops.
4. **Stops** at a gate, on an empty actionable set, on a blocked
   task, or on exhausting approved scope — and summarizes to the
   owner (W-001: deliver, summarize, stop).

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
- Proposed register changes (new children from a breakdown, a stage
  transition, a backward transition with its reason) — proposed, not
  written; the Orchestrator is the register's single writer.
- Backlog additions for everything identified and not executed
  (owner ruling 1: at any time, from any unit of work).
- Session usage for the [cost log](cost-log.md): model, and token
  counts as reported by the harness.

## Context packets

Dispatch prompts MUST enumerate the packet — never "read the docs".
The packet is what is pushed; the repository stays readable, and a
role MAY pull more when its task genuinely needs it, but a packet
that routinely proves insufficient is a spec defect to fix here.

| Stage | Packet beyond the base (base = brief items 1–2) |
|---|---|
| plan | Parent's specification; sibling one-liners with stages |
| specify | The node's plan; parent's verification criteria |
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
