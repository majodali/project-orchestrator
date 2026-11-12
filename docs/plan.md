# The project plan

Generated from `orchestration/state.json` by `plan-state render`. Do not edit by hand: edit the state file, or use the service's tools, and run `plan-state render --write`. `plan-state check` fails when this file differs from the rendering.

Reader: the owner, and any session working on the project. The reader
knows the README. Each node is shown as its title, its identifier,
its stage and its outcome. The state file holds the rest.

## Waiting on the owner

Open decisions:

- D065 on Re-plan, prune and hand back (P4-N008): Grant write access to majodali/methodology-tools for the pilot child (new to this project, RU-016)? Default: grant it, for the pilot node only
- D066 on Re-plan, prune and hand back (P4-N008): Generate the Backlog from the state file (child 4), or drop docs/backlog.md after archiving? Default: generate it

Gated nodes:

- Project model instance for this repository (P3-N008): owner review of the plan

## Ready, starting automatically when the loop runs

- Re-plan, prune and hand back (P4-N008) [planned]

## In flight

None.

## In progress, children carry the work

- Orchestrator v1: process specification and plugin (P1-N001) [broken-down]
- Orchestration service (P2-N001) [broken-down]
- Rebuild: the orchestrator runs on a checked data model (P4-N001) [broken-down]

## Waiting on a dependency

- Coordination between enlisted sessions (P2-N004) [identified] — after Migration onto the service and pilot on methodology-tools (P2-N006)

## Blocked

- Migration onto the service and pilot on methodology-tools (P2-N006) [identified] — Held until the rebuild's milestone 6 (P4-N008) re-plans it; milestone 6 starts the pilot on methodology-tools (owner, 2026-11-11)
- Project comprehension and continuous implementation (P3-N001) [broken-down] — Paused under the rebuild plan's decision 1 (D005) until milestone 6 re-plans the line

## Paused by a hold or a park above

- Comprehension model (P3-N002) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Replacement of sibling ordering by recorded dependencies (P3-N009) [identified] — under Project comprehension and continuous implementation (P3-N001)
- Common risk catalogue (P3-N003) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Article 8 amendment proposal (P3-N012) [identified] — under Project comprehension and continuous implementation (P3-N001)
- Reversibility and its measurement (P3-N004) [identified] — under Project comprehension and continuous implementation (P3-N001)
- Sequence mode (P3-N005) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Sequence mode demonstration (P3-N015) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Determination on W-001 sequence mode (P3-N016) [identified] — under Project comprehension and continuous implementation (P3-N001)

## The plan

### Orchestrator v1: process specification and plugin (P1-N001)

Stage: broken-down, in progress, its children carry the work.

A process specification and a Claude Code plugin run role-based agent sessions through the methodology on managed projects, at the least cost that does the job.

Documents: [plan](plans/orchestrator-v1.md).

- **Repository bootstrap and founding plan** (P1-N002, done)
  The repository exists, is enrolled under the methodology, and holds the founding plan with its six chunks.
  Note: Chunk 1 of the parent plan
- **Process specification v1** (P1-N003, done)
  The process specification under docs/process/ states the plan model, the Plan register, the dispatch loop, the roles, the profiles, the Cost log, auditing and observability.
  Note: Chunk 2 of the parent plan
- **Role contracts v1** (P1-N004, done)
  Six role contracts under .claude/agents/, each bound to a model tier, with the Orchestrator as single writer of the registers.
  Note: Chunk 3 of the parent plan
- **Plugin v1 and self-hosted trial** (P1-N005, done 2026-08-26)
  The Claude Code plugin with the orchestrate and enroll skills, the form checker and the billing hook, tried in four trials on this repository.
  Note: Chunk 4 of the parent plan
- **Proposal: mtool checker extension point** (P1-N008, done 2026-08-26)
  A decision-ready proposal to methodology-tools for one generic capability: a checker that a project declares beside its custom type and that mtool audit form runs.
  [plan](plans/p1-n008-mtool-checker-extension-point.md), [spec](specs/p1-n008-mtool-checker-extension-point.md)
- **Plugin tooling on the portfolio stack** (P1-N009, done 2026-08-30)
  The plugin's tooling runs on the portfolio's declared stack, Node and TypeScript, and the Plan register grammar has one implementation that both repositories share.
  [plan](plans/p1-n009-plugin-tooling-portfolio-stack.md), [spec](specs/p1-n009-plugin-tooling-portfolio-stack.md)
  - **Node toolchain and shared register grammar** (P1-N010, done 2026-08-30)
    The plugin's tooling runs on Node, and the Plan register grammar has one TypeScript implementation, proven by the journal_tail port.
  - **Conformance corpus and vendoring generator** (P1-N011, done 2026-08-30)
    A conformance corpus of fixtures with recorded expectations, and a generator that vendors the shared grammar unit into the service repository.
  - **Form checker ported to TypeScript** (P1-N012, done 2026-08-30)
    The form checker ported to TypeScript on the shared grammar unit, reproducing the Python checker's findings one for one.
  - **Cutover to the TypeScript tools** (P1-N013, done 2026-08-30)
    The Python scripts retired, sync_agents ported, and every invocation site moved to the TypeScript tools.
- **Role contracts adopt the methodology's conduct rules** (P1-N014, done 2026-10-29)
  Every conduct duty that methodology v1.4.0 named is stated once, in the document that owns it, and reaches the roles through the artifacts they actually load.
  [plan](plans/p1-n014-role-contracts-adopt-v140-rules.md), [spec](specs/p1-n014-role-contracts-adopt-conduct-rules.md)
- **Methodology amendments for delegated multi-agent work** (P1-N015, done 2026-09-01)
  Four adjudicable amendment proposals to majodali/methodology, drafted in this repository and hand-carried upstream by the owner.
  [plan](plans/p1-n015-methodology-amendments-delegated-work.md), [spec](specs/p1-n015-methodology-amendments-delegated-work.md)
- **Process specification maintenance** (P1-N016, done 2026-11-05)
  Every Backlog row routed to this node is either landed in the process specification, or closed with a stated reason.
  [plan](plans/p1-n016-process-spec-maintenance.md)
  Note: plan gate crossed 2026-11-03, the plan's criteria are its specification (decision 2); does not wait on P3-N009 (decision 3); E1 (T103) accepted 2026-11-03, E2 (T104) accepted 2026-11-05 under the owner's rulings A26 to A28; verifying gate crossed 2026-11-08

### Orchestration service (P2-N001)

Stage: broken-down, in progress, its children carry the work.

A service that Claude Code sessions call over MCP for plan state, coordination and owner questions, with a web view of the plan, and git as the only source of truth.

Documents: [plan](plans/orchestration-service.md).

- **Service skeleton and plan state** (P2-N002, done 2026-08-26)
  A deployed MCP service reads and validates the Plan register through a GitHub App, and a session updates plan state under an advisory lease.
  [plan](plans/p2-n002-service-skeleton.md), [spec](specs/p2-n002-service-skeleton.md)
  Note: Chunk 1 of the parent plan
  - **Service repository bootstrap** (P2-N007, done 2026-08-27)
    The service repository exists with its Classification, its Node toolchain, its README and its Backlog.
  - **Deployed MCP server (reachability slice)** (P2-N008, done 2026-08-28)
    A deployed MCP server on Lambda answers service_identity over HTTP with bearer-token auth, enlisted from a checked-in .mcp.json.
  - **Plan state read** (P2-N009, done 2026-08-29)
    plan_read returns the coordinating repository's Plan register at a named ref through an installed GitHub App, with the commit SHA on every answer.
  - **Plan state update with advisory lease** (P2-N010, done 2026-09-01)
    A session moves a node through a legal stage transition: it takes the lease, receives the exact edit, commits it, and the service confirms the commit carries it.
  - **Git-only fallback and enlistment documentation** (P2-N011, done 2026-09-07)
    A session works with the service unreachable, and the enlistment documentation says how a repository enlists.
- **Deploy from CI on merge** (P2-N012, done 2026-09-01)
  A merge to main in the service repository deploys the service, proves it against a real endpoint, and only then promotes it, with a red workflow on failure.
  [plan](plans/p2-n012-deploy-from-ci-on-merge.md), [spec](specs/p2-n012-deploy-from-ci-on-merge.md)
  - **Lambda alias assumptions check** (P2-N013, done 2026-09-01)
    The Lambda alias assumptions the deploy relies on are verified against AWS documentation and recorded.
  - **Pull request checks** (P2-N014, done 2026-09-01)
    Pull-request checks build, lint and test without any deploy credential.
  - **Alias-aware lease table selection** (P2-N015, done 2026-09-01)
    The lease table is selected by the invoked alias, and an unknown alias fails closed.
  - **Deploy, smoke test and promote pipeline** (P2-N016, done 2026-09-07)
    A merge to main deploys a version to the preprod alias, smoke-tests it, and promotes live only on a pass.
- **Owner questions and the plan view** (P2-N003, done 2026-11-11)
  The owner sees this project's plan in a browser on any device, and later answers gate decisions there.
  [plan](plans/p2-n003-owner-questions-and-plan-view.md), [spec](specs/p2-n003-owner-questions-and-plan-view.md)
  Note: Chunk 2 of the parent plan; split into the web view's first version and the owner question queue (owner, 2026-10-29)
  - **Web view v1** (P2-N021, done 2026-11-02)
    A signed-in owner sees the plan tree at one commit and drills to node and task pages, with the Project model's renderings beside them.
    [spec](specs/p2-n003-owner-questions-and-plan-view.md)
    Note: independent of P2-N005 and P2-N004 (RU-018; owner, 2026-10-29); its task E3 waits on P3-N007 done, its tasks E1 and E2 do not (plan decision 8)
  - **Web view UX refinement** (P2-N023, done 2026-11-07)
    At V30 the owner decided that the web view does not replace docs/plan.md yet.
    after P2-N021 · [plan](plans/p2-n023-web-view-ux-refinement.md)
    Note: Iterations 1 to 3 accepted 2026-11-03; the owner ended the loop on 2026-11-07, and the rebuild's milestone 2 superseded the view (owner, 2026-11-10)
- **Migration onto the service and pilot on methodology-tools** (P2-N006, identified, blocked: Held until the rebuild's milestone 6 (P4-N008) re-plans it; milestone 6 starts the pilot on methodology-tools (owner, 2026-11-11))
  after P2-N021, P2-N003
  Note: Chunk 5 of the parent plan; depends on P2-N005 and on P2-N021, the web view's first version, done 2026-11-03, not on P2-N003 as a whole (owner, 2026-10-29)
- **Coordination between enlisted sessions** (P2-N004, identified)
  after P2-N006
  Note: Chunk 3 of the parent plan; after P2-N006, built only on a shown need (owner, 2026-10-29)

### Project comprehension and continuous implementation (P3-N001)

Stage: broken-down, blocked.

A model of each part of a project and what depends on it, plus the safeguards for longer runs of work without owner review.

Documents: [plan](plans/comprehension-and-continuous-implementation.md), [spec](specs/p3-n001-comprehension-and-continuous-implementation.md).

- **Comprehension model** (P3-N002, broken-down)
  One comprehension model, defined as an extension of the planning and execution model this project already has, plus one instance of it over this repository, populated from documents that already exist here.
  [plan](plans/p3-n002-comprehension-model.md), [spec](specs/p3-n002-comprehension-model.md)
  Note: Chunk 1 of the parent plan
  - **Thin end-to-end slice of the model** (P3-N006, done 2026-10-30)
    Five real parts of this repository carried through the model, the navigation bound and both renderings, in one commit, so that P3-N007 can define the type against content that has already pushed back.
    [plan](plans/p3-n006-thin-end-to-end-slice.md), [spec](specs/p3-n002-comprehension-model.md)
  - **Project model type and K-003 amendment draft** (P3-N007, done 2026-10-31)
    The Project model becomes a declared type of this repository, and the K-003 (the Backlog is the single source of progress truth) amendment exists as a reviewed proposal ready for the owner to carry.
    after P3-N006 · [plan](plans/p3-n007-type-declared-amendment-drafted.md), [spec](specs/p3-n002-comprehension-model.md)
    Note: depends on P3-N006
  - **Project model instance for this repository** (P3-N008, planned, gated: owner review of the plan)
    The instance describes every current part of the project.
    after P3-N007 · [plan](plans/p3-n008-instance-over-this-repository.md), [spec](specs/p3-n002-comprehension-model.md)
    Note: depends on P3-N007 for its executing stage (P3-N007 decision 9), done 2026-10-30
  - **Replacement of sibling ordering by recorded dependencies** (P3-N009, identified)
    after P3-N008
    Note: depends on P3-N008
- **Common risk catalogue** (P3-N003, broken-down)
  A catalogue of recurring risk classes, each carried from one instance to a check that reads the Risk register's class lines.
  [plan](plans/p3-n003-common-risk-catalogue.md), [spec](specs/p3-n003-common-risk-catalogue.md)
  Note: Chunk 2 of the parent plan; independent of P3-N002 (RU-018)
  - **First risk class end to end** (P3-N010, done 2026-10-30)
    The catalogue exists with one entry.
    [plan](plans/p3-n010-one-class-end-to-end.md), [spec](specs/p3-n003-common-risk-catalogue.md)
  - **Catalogue sweep and omission list** (P3-N011, done 2026-10-31)
    Every candidate in the five sources that criterion B1 (one recorded pass per source) names is dispositioned on the record.
    after P3-N010 · [plan](plans/p3-n011-sweep-and-omission-list.md), [spec](specs/p3-n003-common-risk-catalogue.md)
    Note: depends on P3-N010
  - **Article 8 amendment proposal** (P3-N012, identified)
    after P3-N011
    Note: depends on P3-N011, done 2026-11-03
- **Reversibility and its measurement** (P3-N004, identified)
  after P3-N002
  Note: Chunk 3 of the parent plan; depends on P3-N002
- **Sequence mode** (P3-N005, broken-down)
  This project's own dispatch loop runs methodology W-001's pre-ratified sequence mode, and the four conditions that stop a sequence are applied mechanically by the roles that meet them.
  [plan](plans/p3-n005-sequence-mode.md), [spec](specs/p3-n005-sequence-mode.md)
  Note: Chunk 4 of the parent plan; independent of P3-N002 (RU-018)
  - **Decidable stop conditions** (P3-N013, done 2026-10-30)
    W-001's four stop conditions exist as committed predicates that two blind readings apply identically to this project's past task results.
    [plan](plans/p3-n013-stop-conditions-decidable.md), [spec](specs/p3-n005-sequence-mode.md)
  - **Sequence mode in the dispatch loop** (P3-N014, done 2026-10-30)
    This project's dispatch loop can run methodology W-001 (two delivery modes, human-gated)'s pre-ratified sequence.
    after P3-N013, P1-N014 · [plan](plans/p3-n014-loop-runs-sequence-mode.md), [spec](specs/p3-n005-sequence-mode.md)
    Note: depends on P3-N013 and on P1-N014's execute
  - **Sequence mode demonstration** (P3-N015, broken-down)
    The owner ratifies a sequence of four members once.
    after P3-N014 · [plan](plans/p3-n015-sequence-demonstration.md), [spec](specs/p3-n005-sequence-mode.md)
    Note: depends on P3-N014; plan gate crossed 2026-11-04, decisions 1 to 7 at their defaults; specified by the parent's Child C with the plan's criteria (decision 3); its children run as a ratified sequence, in this order; the first is dispatched only when no other task is in flight (decision 5)
    - **Methodology citations pinned in the process specification** (P3-N017, done 2026-11-07)
      The owner ratifies a sequence of four members once.
      [plan](plans/p3-n015-sequence-demonstration.md)
      Note: T105 accepted 2026-11-07, member 1 of the ratified sequence
    - **Anchors on Risk register entries** (P3-N018, done 2026-11-07)
      The owner ratifies a sequence of four members once.
      [plan](plans/p3-n015-sequence-demonstration.md)
      Note: T106 accepted 2026-11-07, member 2 of the ratified sequence
    - **Checker extension-point proposal ready to carry** (P3-N019, done 2026-11-08)
      The owner ratifies a sequence of four members once.
      [plan](plans/p3-n015-sequence-demonstration.md)
      Note: T107 accepted 2026-11-08, member 3 of the ratified sequence
    - **Plugin tools tested as run** (P3-N020, parked)
      The owner ratifies a sequence of four members once.
      after P3-N019 · [plan](plans/p3-n015-sequence-demonstration.md)
      Note: ratified, withheld by the stop
  - **Determination on W-001 sequence mode** (P3-N016, identified)
    after P3-N015
    Note: depends on P3-N015

### Rebuild: the orchestrator runs on a checked data model (P4-N001)

Stage: broken-down, in progress, its children carry the work.

One checked state file per managed project is the progress truth, the service reads and writes it, the view shows it, and a minimal task loop runs on it.

Documents: [plan](plans/rebuild.md).

Note: Six milestones ratified as one sequence by the owner on 2026-11-09

- **Freeze and declare** (P4-N002, done 2026-11-09)
  The old loop is stopped cleanly: deviations recorded, registers frozen, the orchestrate skill suspended, the plan approved and its milestones ratified.
  [plan](plans/rebuild.md)
- **State file and checker** (P4-N003, done 2026-11-09)
  The plan lives in orchestration/state.json, imported from the frozen registers, checked by plan-state in CI, and rendered to the Markdown register and plan.
  after P4-N002 · [plan](plans/rebuild.md)
- **View on the state file** (P4-N004, done 2026-11-10)
  The web view renders the state file for a desktop browser: the hierarchy as the primary view, with what waits on the owner shown in context.
  after P4-N003 · [plan](plans/rebuild.md)
- **Service writes the state file** (P4-N005, done 2026-11-10)
  One conditional commit through the GitHub App replaces the lease, update and confirm protocol; the lease table is removed.
  after P4-N004 · [plan](plans/rebuild.md)
  Note: Accepted 2026-11-10: the owner moved this node to executing with one node_update call from an enlisted session
- **Decisions answered in the view** (P4-N006, done 2026-11-11)
  The owner answers open decisions and acts on a node's lifecycle in the view, and the service commits each answer.
  after P4-N005 · [plan](plans/rebuild.md)
  Note: Accepted 2026-11-11: the owner closed D061 in the view
- **Minimal task loop** (P4-N007, done 2026-11-11, gated: The owner accepts milestone 5 after the week of real work through the loop: two sessions on different days move one node from specified to done)
  A session takes the next ready task and closes it through two tool calls, with the stop conditions and the standard close-out actions as orchestrator features.
  after P4-N006 · [plan](plans/rebuild.md)
  Note: Built in service pull request 36; fixes from the first real use in service pull request 37; the week of real work through the loop is the acceptance
- **Re-plan, prune and hand back** (P4-N008, planned)
  The remaining nodes are re-planned in the state file, the document set is pruned, the upstream proposals go in one batch, and the pilot on methodology-tools starts.
  after P4-N007 · [plan](plans/rebuild.md) · 2 open decisions
- **Task cost capture** (P4-N010, done 2026-11-11)
  A task's tokens by type and its model are measured and recorded when the task closes, without the session estimating them.
  [plan](plans/rebuild.md)
  Note: Owner approved the mechanism on 2026-11-11: a task_cost tool in the service, fed by a hook in this repository and by headless runs
- **Task required for session writes** (P4-N012, done 2026-11-12)
  The service refuses a session's write to a node or a decision unless it names an open task or carries the owner's dictated words, and pull requests cannot change the files the service owns.
  [plan](plans/rebuild.md)
  Note: The owner asked for the enforcement on 2026-11-12, after the first real use changed a node with no claim

## Decisions taken

- RU-001 on P1-N008 (2026-08-26, standing): Execute a proposal draft before its evidencing node closes? Chosen: yes.
- RU-002 on P1-N008 (2026-08-26, standing): How does upstream-bound output reach a repo outside granted scope? Chosen: the owner hand-carries it; cross-repo scope is granted only explicitly.
- RU-003 on P1-N008 (2026-08-26, standing): Does a node targeting an external party complete at the artifact or at upstream disposition? Chosen: at the artifact.
- RU-004 on P1-N008 (2026-08-26, standing): Full reference implementation or conformance sketch for the extension-point proposal? Chosen: sketch only.
- RU-005 on P1-N008 (2026-08-26, standing): Are proposal-class nodes owner-gated, and where? Chosen: yes, gate at verifying.
- RU-006 on P2-N001 (2026-08-26, standing): When does a new capability get its own repository rather than joining an existing one? Chosen: when it is separately deployable, holds secrets, or would raise the host repo's S-level; the originating repo is then the coordinating repo.
- RU-007 on P2-N001 (2026-08-26, standing): When is this repo promoted to C2? Chosen: when it begins orchestrating C2+ work — chunk 5 of the service plan, not before.
- RU-008 on P2-N002 (2026-08-26, standing): What language and runtime do new majodali services use? Chosen: TypeScript/Node.
- RU-009 on P2-N008 (2026-08-27, standing): How does completed work reach main in a managed project's work repo? Chosen: by pull request, opened by the orchestrating session; the owner reviews and merges.
- RU-010 (2026-08-28, standing): How does work reach main in this coordinating repo, given the owner created main from the design branch and made it default? Chosen: the same way as a work repo — by pull request from the design branch, opened by the orchestrating session, owner reviews and merges.
- RU-011 (2026-08-29, standing): What language do majodali repo-local tooling and scripts use, as distinct from deployed services? Chosen: TypeScript/Node, the same answer RU-008 gives services.
- RU-012 on P1-N009 (2026-08-29, standing): How do two majodali repositories share one unit of code, absent a package registry? Chosen: one canonical copy in the repository that owns the thing's specification, vendored outward by a generator with a --check drift mode; the consumer never edits its copy.
- RU-013 on P1-N009 (2026-08-30, standing): What does a majodali tool do when the runtime it needs is missing or too old? Chosen: preflight and exit non-zero, naming what was required and what was found; never degrade quietly and never skip the check it exists to perform.
- RU-014 on P1-N013 (2026-08-30, standing): When a port retires the only other implementation a test compares against, what happens to that test? Chosen: retire the comparison, keep whatever assertion still stands without the retired side, and record in the same commit where the lost coverage now lives.
- RU-015 on P1-N015 (2026-09-01, standing): How does this project deliver a change to a repository it cannot write to? Chosen: final normative text, the current upstream text quoted verbatim beside it, and a provenance line naming the version, the commit and the date the quote was taken, with an instruction to re-verify before the change is carried. Never a patch file.
- RU-016 on P2-N012 (2026-09-01, standing): Who decides which repositories a node's work may write to? Chosen: the Planner declares the repository access a node needs, in the node's plan; the Orchestrator grants it and records the grant; the owner is asked only when a repository is new to the project. This project's approved scope permanently includes majodali/project-orchestrator-service.
- RU-017 on P3-N001 (2026-09-17, standing): When a node's whole driver is another portfolio project, is that project's adoption part of the node? Chosen: no. The node is verified against this repository's own instance; adoption by the other project is a separate node with its own repository grant, requested when it is wanted.
- RU-018 on P3-N001 (2026-09-17, standing): Is a child queued behind an earlier sibling it does not depend on? Chosen: no. A child that needs nothing an earlier sibling produces is marked independent in the register and may be dispatched alongside it; only a real dependency holds a node. This narrows dispatch.md's earlier-siblings-done default, which stands wherever independence is not recorded.
- RU-019 on P3-N001 (2026-09-17, standing): May a criterion that measures something be satisfied by an unfavourable result? Chosen: yes, and it must be. A measurement criterion is met by the number, the method and the conclusion being recorded, whichever way the number falls; the response to an unfavourable one is a plan change, not a failed node.
- RU-020 on P3-N001 (2026-09-17, standing): Does an interior node need a separate break down task after its specification? Chosen: no, when the specification already carries the children at the depth such a task would produce: the children are entered identified with their Backlog entries at the specification gate and the parent moves specified → broken-down in the same act.
- RU-021 on P3-N002 (2026-10-29, standing): Which document is the source of progress truth in an orchestrated project? Chosen: the planning/execution model, once the project has one; the Backlog's remaining jobs, the implementation map and the list of what is next, are renderings of it. K-003 is amended to say so, project by project as each adopts the orchestrator, and this repository is the evidencing instance.
- RU-022 on P1-N014 (2026-10-29, standing): How does a document this project drafts for the methodology corpus carry W-009 (the methodology corpus writes its deliverables IR first)? Chosen: the drafting role writes the IR first; the prose is rendered and reviewed under dispatch.md's prose routing; and RU-015's delivery form also carries the IR, under the same provenance line.
- RU-023 on P1-N016 (2026-11-03, standing): May a task outside a ratified sequence be dispatched while the sequence runs? Chosen: option A, as an interim rule. It holds until the stop predicates read the journal by member task; the Backlog row "Lift RU-023 from interim" holds the lifting. Placed at the end of dispatch.md, Sequence mode, The run.
- RU-024 on P1-N016 (2026-11-03, standing): Does a go-ahead that adopts defaults ratify a sequence? Chosen: option A. Placed in dispatch.md, Sequence mode, Ratification, and after the bullet "Decisions batch at the gate" of Owner-decision economics.
- D001 on P2-N001 (2026-08-26): Repository shape Chosen: a new repository for the service, S1 / serverless-aws, with project-orchestrator as the designated coordinating repo (the multi-repo model staged upstream).
- D002 on P2-N001 (2026-08-26): Chunk boundaries Chosen: as proposed above.
- D003 on P2-N001 (2026-08-26): Promotion timing Chosen: promote project-orchestrator to C2 when chunk 5 begins, not before.
- D004 on P2-N001 (2026-08-26): v1 plan disposition Chosen: keep orchestrator-v1 active through its chunk 4 close-out, with its chunk 6 runtime assumptions marked superseded by this plan.
- D005 on P4-N001 (2026-11-09): Pause the P3 line (comprehension model, risk catalogue, sequence mode, reversibility) and park its open nodes Chosen: yes
- D006 on P4-N001 (2026-11-09): The service may write git under the path allowlist above. This changes the service plan's standing constraint "the service never writes git" and keeps "git is authoritative" Chosen: yes
- D007 on P4-N001 (2026-11-09): The state file is JSON validated by a zod schema, at orchestration/state.json Chosen: yes
- D008 on P4-N001 (2026-11-09): The shared model code lives in the service repository and is consumed by the plugin as a package. Vendoring is retired Chosen: yes
- D009 on P4-N001 (2026-11-09): During the rebuild, pull requests auto-merge on green in both repositories Chosen: yes
- D010 on P4-N001 (2026-11-09): The methodology pin stays at 1.6.0 with the deviations the review lists, recorded at M0 Chosen: yes
- D011 on P4-N001 (2026-11-09): Node identifiers stay as they are (P2-N021). Titles are shown beside them everywhere Chosen: keep
- D012 on P4-N001 (2026-11-09): Milestones 1 to 6 run as one pre-ratified sequence Chosen: yes
- D013 on P4-N001 (2026-11-09): The view targets a desktop browser Chosen: as stated
- D014 on P4-N001 (2026-11-09): No git-only fallback for a service outage is built in this plan Chosen: as stated
- D031 on P3-N008 (2026-11-09): P3-N008's specification Chosen: superseded by the rebuild: not answered
- D032 on P3-N008 (2026-11-09): Leaf, run as three execute tasks in a fixed order Chosen: superseded by the rebuild: not answered
- D033 on P3-N008 (2026-11-09): The service repository's parts are in the instance Chosen: superseded by the rebuild: not answered
- D034 on P3-N008 (2026-11-09): Plan and specification documents enter the model as two resources Chosen: superseded by the rebuild: not answered
- D035 on P3-N008 (2026-11-09): docs/plan.md stays the hand rendering until the switch Chosen: superseded by the rebuild: not answered
- D036 on P3-N008 (2026-11-09): Every entry heading carries a name Chosen: superseded by the rebuild: not answered
- D061 on P4-N006 (2026-11-11): Does the view's write path stay as built: forms on the node page, one commit per answer, the three lifecycle actions? Chosen: yes, as built
- D063 on P4-N008 (2026-11-12): Keep the P3 line held at P3-N001 with no new 'process research' node (the hold is the park)? Chosen: yes, keep the hold; no new node
- D064 on P4-N008 (2026-11-12): Remove P2-N004 (coordination between sessions), since the task_open claim already delivers it? Chosen: remove it with node_remove in child 1
