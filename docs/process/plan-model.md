# The plan model — hierarchy and node lifecycle

Part of the [orchestration process specification](README.md).

## The hierarchy

A managed project's plan is a tree of **nodes**. The root node is the
project's current major outcome (typically one per active plan
document) — typically a comprehensive collection of definitions,
features, technical requirements, and other facets, not a single
statement. Interior nodes are decompositions; leaf nodes are units of
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
  dependency-ordered, and execution proceeds so that earlier siblings
  reach `done` before later ones enter `execute`. **Monotonicity is
  defined over functional tests**: a unit of work is monotonic iff it
  requires no previously defined functional test to be rewritten in
  order to pass. Adding tests is always monotonic; the preference for
  monotonicity bounds how often earlier features' tests are reopened,
  it does not forbid it.

Departures from the monotonic ideal come in two independent kinds,
treated differently:

- **Planned** — the plan itself schedules the rewrite (e.g. a roadmap
  that ships feature v1 knowing v2 supersedes it) as a practical
  measure for overall efficiency. It is authorized at the gate that
  approves the plan containing it, which pre-clears the specific test
  rewrites it entails — the
  [W-002](https://github.com/majodali/methodology/blob/v1.2.0/docs/rules/working-agreement.md#w-002--existing-tests-are-signals-not-obstacles)
  discussion happens there, once, not mid-execution. Preference for
  monotonicity means planned instances are rare and argued for in the
  plan.
- **Unplanned** — execution or verification discovers that previously
  completed work needs rework. Just as likely as not, the functional
  tests stand and it is previously completed artifacts — code, docs,
  design — that need the rework, with the standing tests as the
  criteria the rework must re-pass; only sometimes must previously
  defined functional tests themselves be rewritten (a true
  non-monotonicity). Either way it is a learning: the affected node
  takes a backward transition with the reason recorded, and where
  tests must change, no test is touched before the W-002 discussion
  with the human owner. Rework of a `done` node reopens it with the
  driving reason recorded, or becomes a new node.

## Features

A **feature** is a cohesive behavior of the project that must be
validated for a solution to be accepted. That is the informal
reading, and it guides planning. Formally, **a feature is its
validation**: the set of functional tests that constitute it. The
formal reading is what the process computes with — acceptance means
every feature's tests pass, a feature node's verification criteria
name (or generate) its test set, and monotonicity above is defined
over the accumulated functional-test corpus.

Decomposition SHOULD follow features: the first tier below the root
is typically feature-by-feature, plus iteration-zero setup nodes;
deeper tiers continue by feature functionality until a feature is
**atomic** — no meaningful sub-behavior validates separately, a
Planner judgment — and only below that by technical structure
(component, implementation step). This is guidance for the Planner,
not law: where a project's nature argues for a different cut, the
plan records why. A broad breakdown SHOULD lead with a thin
end-to-end slice as its first child where feasible, so a structural
error in the decomposition surfaces before fan-out compounds it
([Risk R8](../open-risks.md)). No separate feature inventory is kept — the plan
register's feature-shaped upper tiers carry the structure; if
verification pressure ever demands an explicit feature→test mapping,
that is a spec change to argue for then, not ceremony to keep now.

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
  records a stage change. The SHOULD also carries an audit dividend:
  a declared Workflow makes Backlog stage designations
  methodology-audited state (Article 4 declaration accuracy), so
  upstream tooling already checks their currency — the orchestration
  checker then owns only the register-side invariants
  ([auditing.md](auditing.md)).
