# The plan model — hierarchy and node lifecycle

Part of the [orchestration process specification](README.md).

## The hierarchy

A managed project's plan is a tree of **nodes**. The root node is the
project's current major outcome (typically one per active plan
document); interior nodes are decompositions; leaf nodes are units of
work executable in a single role session. Depth is not fixed — nodes
are broken down until their children are leaf-sized, and no further
(no empty ceremony).

The model is V-shaped in spirit: a node's **specification** is
written on the way down, its **verification** runs on the way up
against that same specification, and children integrate into their
parent's verification. Two progressions govern movement:

- **Iterative (top-down).** Parents are planned and specified before
  their children exist. Learning flows back up: when execution
  invalidates a plan or specification, the node returns to the
  earlier stage and the revision propagates downward. Reasons for
  re-descent MUST be recorded (in the node's plan or specification
  document, per K-007's currency discipline).
- **Incremental (left-to-right, ideally monotonic).** Siblings are
  dependency-ordered. Execution proceeds so that earlier siblings
  reach `done` before later ones enter `execute`, and rework of a
  `done` node is the exception: when needed, the node is reopened
  with the driving reason recorded, or the rework is a new node.

## The node lifecycle

Every node carries exactly one current **stage**:

| Stage | Meaning | Exit condition |
|---|---|---|
| `identified` | Exists in the Plan register (created by its parent's breakdown or by enrollment) | Planning is dispatched |
| `planned` | Outcome, approach, dependencies, and leaf-or-interior decision recorded | Specification is dispatched |
| `specified` | Behavior and **verification criteria** recorded, to be implemented and verified against | Breakdown (interior) or execution (leaf) is dispatched |
| `broken-down` | Interior only: children defined, dependency-ordered, and entered as `identified` | All children `done` |
| `executing` | Leaf only: the work is being done | Work committed with same-commit documentation (W-003) |
| `verifying` | Verification against the node's own criteria is running | Criteria met and, where the [profile](profiles.md) requires it, review passed |
| `done` | Verified and accepted; Backlog entry checked and rewritten | — |

Rules:

- A node MUST NOT enter `executing` or `broken-down` before it is
  `specified`: verification criteria exist before the work they will
  verify. The depth of a specification scales with C-tier and node
  level ([profiles.md](profiles.md)); at minimum it is a list of
  criteria a verifier can check.
- An interior node's `verifying` runs after its children are `done`,
  against its own criteria — integration is verified where it was
  specified, not assumed from child success.
- Backward transitions (any stage → an earlier stage) are permitted
  and MUST record their reason. They are learning, not failure; the
  monotonic ideal bounds them, it does not forbid them.
- Stage names deliberately do not collide with the methodology's
  derived conditions (`deployed`, `deployable`). A managed project
  MAY extend the stage set (e.g. deployment stages after `done`) via
  its declared Workflow; the lifecycle above is the orchestrated
  core.

## Relationship to the Backlog (K-003)

The Backlog remains the single source of truth for project execution
([K-003](https://github.com/majodali/methodology/blob/v1.2.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth));
the Plan register exists to make the hierarchy explicit, and claims
no more. Owner ruling, 2026-08-24
([founding plan](../plans/orchestrator-v1.md), ruling 1):

- Every node identified and not executed immediately MUST get a
  Backlog entry at identification — including planning for future
  units of work and chunk verification whose criteria are not yet
  specified. Backlog items MAY be added at any time, from the
  planning, execution, or validation of any unit of work.
- Backlog entries reference their node by ID; when a node reaches
  `done`, its entry is checked and rewritten to describe what
  actually shipped, in the same commit as the completing work
  (W-003).
- A managed project SHOULD declare the node lifecycle's stage set as
  (part of) its methodology Workflow, so Backlog entries carry node
  stages as their stage designations and the two documents cannot
  disagree by construction. The Orchestrator keeps register and
  Backlog designations in sync in the same commit whenever it
  records a stage change.
