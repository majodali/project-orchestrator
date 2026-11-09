# The project plan

Generated from `orchestration/state.json` by `plan-state render`. Do not edit by hand: edit the state file, or use the service's tools, and run `plan-state render --write`. `plan-state check` fails when this file differs from the rendering.

Reader: the owner, and any session working on the project. The reader
knows the README. Each node is shown as its title, its identifier,
its stage and its outcome. The state file holds the rest.

## Waiting on the owner

Gated nodes:

- Web view UX refinement: an owner-attended loop on the service repository until the view can replace docs/plan.md, at most ten iterations (P2-N023): owner review at verifying, U1 on the owner's decision to end the loop at three iterations
- The instance, over this repository (P3-N008): owner review of the plan

## Ready to start

- The pilot on a real project, superseded by the service's migration and pilot (P1-N006) [identified]
- Cost reporting and the founding plan's close-out (P1-N007) [identified]
- The platform facts, verified (P2-N017) [identified]
- The Article 8 proposal, written IR first and reviewed (P3-N012) [identified]
- The plugin tools are tested the way they run (P3-N020) [specified]

## In flight

None.

## In progress, children carry the work

- Orchestrator v1: the process specification and the Claude Code plugin (P1-N001) [broken-down]
- Orchestration service: the MCP service and the web view (P2-N001) [broken-down]
- Owner questions and the plan view (P2-N003) [broken-down]
- The task-pull loop: sessions claim tasks from the service (P2-N005) [broken-down]
- Project comprehension and continuous implementation (P3-N001) [broken-down]
- The comprehension model: resources, edges and renderings (P3-N002) [broken-down]
- The common risk catalogue (P3-N003) [broken-down]
- Sequence mode: the loop runs W-001's pre-ratified mode (P3-N005) [broken-down]
- The demonstration: a ratified sequence lands two chunks and stops on asks (P3-N015) [broken-down]

## Waiting on a dependency

- The owner question queue: gate decisions answered in the web view, picked up through the task-pull loop (P2-N022) [identified] — after The task-pull loop: sessions claim tasks from the service (P2-N005)
- Topics for coordination between enlisted sessions (P2-N004) [identified] — after This repository migrates onto the service, then the pilot runs on methodology-tools (P2-N006)
- The loop in git alone (P2-N018) [identified] — after The platform facts, verified (P2-N017)
- Role-aware session identity for the service (P2-N019) [identified] — after The platform facts, verified (P2-N017)
- The task tools of the service (P2-N020) [identified] — after The loop in git alone (P2-N018), Role-aware session identity for the service (P2-N019)
- This repository migrates onto the service, then the pilot runs on methodology-tools (P2-N006) [identified] — after The task-pull loop: sessions claim tasks from the service (P2-N005), Owner questions and the plan view (P2-N003)
- Sibling ordering retired, and the checks that replace it (P3-N009) [identified] — after The instance, over this repository (P3-N008)
- Reversibility, and the measurement that says whether it pays (P3-N004) [identified] — after The comprehension model: resources, edges and renderings (P3-N002)
- The determination on W-001, and the artifact or the argument (P3-N016) [identified] — after The demonstration: a ratified sequence lands two chunks and stops on asks (P3-N015)

## Blocked

None.

## The plan

### Orchestrator v1: the process specification and the Claude Code plugin (P1-N001)

Stage: broken-down, in progress, its children carry the work.

A process specification and a Claude Code plugin run role-based agent sessions through the methodology on managed projects, at the least cost that does the job.

Documents: [plan](plans/orchestrator-v1.md).

- **The repository bootstrapped and the founding plan written** (P1-N002, done)
  The repository exists, is enrolled under the methodology, and holds the founding plan with its six chunks.
  Note: Chunk 1 of the parent plan
- **The orchestration process specification, version 1** (P1-N003, done)
  The process specification under docs/process/ states the plan model, the Plan register, the dispatch loop, the roles, the profiles, the Cost log, auditing and observability.
  Note: Chunk 2 of the parent plan
- **The role contracts written, version 1** (P1-N004, done)
  Six role contracts under .claude/agents/, each bound to a model tier, with the Orchestrator as single writer of the registers.
  Note: Chunk 3 of the parent plan
- **The plugin built and tried on this repository** (P1-N005, done 2026-08-26)
  The Claude Code plugin with the orchestrate and enroll skills, the form checker and the billing hook, tried in four trials on this repository.
  Note: Chunk 4 of the parent plan
- **mtool checker extension-point proposal** (P1-N008, done 2026-08-26)
  A decision-ready proposal to methodology-tools for one generic capability: a checker that a project declares beside its custom type and that mtool audit form runs.
  [plan](plans/p1-n008-mtool-checker-extension-point.md), [spec](specs/p1-n008-mtool-checker-extension-point.md)
- **Plugin tooling on the portfolio stack** (P1-N009, done 2026-08-30)
  The plugin's tooling runs on the portfolio's declared stack, Node and TypeScript, and the Plan register grammar has one implementation that both repositories share.
  [plan](plans/p1-n009-plugin-tooling-portfolio-stack.md), [spec](specs/p1-n009-plugin-tooling-portfolio-stack.md)
  - **Node toolchain and the shared register grammar, proven by journal_tail** (P1-N010, done 2026-08-30)
    The plugin's tooling runs on Node, and the Plan register grammar has one TypeScript implementation, proven by the journal_tail port.
  - **The travelling package: conformance corpus, recorded expectations, vendoring generator** (P1-N011, done 2026-08-30)
    A conformance corpus of fixtures with recorded expectations, and a generator that vendors the shared grammar unit into the service repository.
  - **The form checker on the shared unit, proven finding-for-finding** (P1-N012, done 2026-08-30)
    The form checker ported to TypeScript on the shared grammar unit, reproducing the Python checker's findings one for one.
  - **The cutover: sync_agents ported, every invocation site moved, the Python retired** (P1-N013, done 2026-08-30)
    The Python scripts retired, sync_agents ported, and every invocation site moved to the TypeScript tools.
- **Role contracts adopt the methodology's conduct rules** (P1-N014, done 2026-10-29)
  Every conduct duty that methodology v1.4.0 named is stated once, in the document that owns it, and reaches the roles through the artifacts they actually load.
  [plan](plans/p1-n014-role-contracts-adopt-v140-rules.md), [spec](specs/p1-n014-role-contracts-adopt-conduct-rules.md)
- **Methodology amendments for delegated, multi-agent work** (P1-N015, done 2026-09-01)
  Four adjudicable amendment proposals to majodali/methodology, drafted in this repository and hand-carried upstream by the owner.
  [plan](plans/p1-n015-methodology-amendments-delegated-work.md), [spec](specs/p1-n015-methodology-amendments-delegated-work.md)
- **Process spec maintenance: branch lifecycle, PR citation, packet table** (P1-N016, done 2026-11-05)
  Every Backlog row routed to this node is either landed in the process specification, or closed with a stated reason.
  [plan](plans/p1-n016-process-spec-maintenance.md)
  Note: plan gate crossed 2026-11-03, the plan's criteria are its specification (decision 2); does not wait on P3-N009 (decision 3); E1 (T103) accepted 2026-11-03, E2 (T104) accepted 2026-11-05 under the owner's rulings A26 to A28; verifying gate crossed 2026-11-08
- **The pilot on a real project, superseded by the service's migration and pilot** (P1-N006, identified)
  Note: Chunk 5 of the parent plan; superseded in place by P2-N006; kept until the founding plan closes out
- **Cost reporting and the founding plan's close-out** (P1-N007, identified)
  Note: Chunk 6 of the parent plan

### Orchestration service: the MCP service and the web view (P2-N001)

Stage: broken-down, in progress, its children carry the work.

A service that Claude Code sessions call over MCP for plan state, coordination and owner questions, with a web view of the plan, and git as the only source of truth.

Documents: [plan](plans/orchestration-service.md).

- **The service skeleton, and plan state read and updated through it** (P2-N002, done 2026-08-26)
  A deployed MCP service reads and validates the Plan register through a GitHub App, and a session updates plan state under an advisory lease.
  [plan](plans/p2-n002-service-skeleton.md), [spec](specs/p2-n002-service-skeleton.md)
  Note: Chunk 1 of the parent plan
  - **The service repository bootstrapped and classified** (P2-N007, done 2026-08-27)
    The service repository exists with its Classification, its Node toolchain, its README and its Backlog.
  - **Reachability slice: a deployed MCP server a session can call** (P2-N008, done 2026-08-28)
    A deployed MCP server on Lambda answers service_identity over HTTP with bearer-token auth, enlisted from a checked-in .mcp.json.
  - **Plan-state read through the GitHub App** (P2-N009, done 2026-08-29)
    plan_read returns the coordinating repository's Plan register at a named ref through an installed GitHub App, with the commit SHA on every answer.
  - **Plan-state update, git-authoritative, with the advisory lease** (P2-N010, done 2026-09-01)
    A session moves a node through a legal stage transition: it takes the lease, receives the exact edit, commits it, and the service confirms the commit carries it.
  - **Degrade to git-only, and enlistment documentation** (P2-N011, done 2026-09-07)
    A session works with the service unreachable, and the enlistment documentation says how a repository enlists.
- **Deploy the service from CI on merge** (P2-N012, done 2026-09-01)
  A merge to main in the service repository deploys the service, proves it against a real endpoint, and only then promotes it, with a red workflow on failure.
  [plan](plans/p2-n012-deploy-from-ci-on-merge.md), [spec](specs/p2-n012-deploy-from-ci-on-merge.md)
  - **Alias assumptions verified against AWS documentation** (P2-N013, done 2026-09-01)
    The Lambda alias assumptions the deploy relies on are verified against AWS documentation and recorded.
  - **Pull-request checks that cannot deploy** (P2-N014, done 2026-09-01)
    Pull-request checks build, lint and test without any deploy credential.
  - **Alias-aware lease-table selection, failing closed** (P2-N015, done 2026-09-01)
    The lease table is selected by the invoked alias, and an unknown alias fails closed.
  - **Deploy, smoke and promote on merge to main** (P2-N016, done 2026-09-07)
    A merge to main deploys a version to the preprod alias, smoke-tests it, and promotes live only on a pass.
- **Owner questions and the plan view** (P2-N003, broken-down)
  The owner sees this project's plan in a browser on any device, and later answers gate decisions there.
  [plan](plans/p2-n003-owner-questions-and-plan-view.md), [spec](specs/p2-n003-owner-questions-and-plan-view.md)
  Note: Chunk 2 of the parent plan; split into the web view's first version and the owner question queue (owner, 2026-10-29)
  - **The web view's first version: the plan tree from commits, drilling to node and task** (P2-N021, done 2026-11-02)
    A signed-in owner sees the plan tree at one commit and drills to node and task pages, with the Project model's renderings beside them.
    [spec](specs/p2-n003-owner-questions-and-plan-view.md)
    Note: independent of P2-N005 and P2-N004 (RU-018; owner, 2026-10-29); its task E3 waits on P3-N007 done, its tasks E1 and E2 do not (plan decision 8)
  - **The owner question queue: gate decisions answered in the web view, picked up through the task-pull loop** (P2-N022, identified)
    The owner answers gates and asks on a phone, in the web view.
    after P2-N005 · [plan](plans/p2-n022-owner-question-queue.md), [spec](specs/p2-n003-owner-questions-and-plan-view.md)
    Note: depends on P2-N021, done 2026-11-03, and on P2-N005 for its final slice only; no longer follows P2-N006 (owner, 2026-11-03)
  - **Web view UX refinement: an owner-attended loop on the service repository until the view can replace docs/plan.md, at most ten iterations** (P2-N023, verifying, gated: owner review at verifying, U1 on the owner's decision to end the loop at three iterations)
    At V30 the owner decided that the web view does not replace docs/plan.md yet.
    after P2-N021 · [plan](plans/p2-n023-web-view-ux-refinement.md)
    Note: depends on P2-N021, done 2026-11-03; independent of P2-N022 and does not block it (RU-018; owner, 2026-11-03); iterations 1 to 3 (T097 to T099) accepted 2026-11-03; the owner ended the loop on 2026-11-07, and T100 shipped nothing
- **Topics for coordination between enlisted sessions** (P2-N004, identified)
  after P2-N006
  Note: Chunk 3 of the parent plan; after P2-N006, built only on a shown need (owner, 2026-10-29)
- **The task-pull loop: sessions claim tasks from the service** (P2-N005, broken-down)
  A session asks the service for the next task in its role, claims it, reports progress, and reports completion.
  [plan](plans/p2-n005-task-pull-loop.md), [spec](specs/p2-n005-task-pull-loop.md)
  Note: Chunk 4 of the parent plan; independent of P2-N003 and P2-N004 (RU-018; owner, 2026-10-29)
  - **The platform facts, verified** (P2-N017, identified)
    A committed finding, docs/findings/p2-n005-platform-facts.md, answers five facts yes or no.
    [plan](plans/p2-n017-platform-facts.md), [spec](specs/p2-n005-task-pull-loop.md)
    Note: planned before execute (owner, 2026-11-03)
  - **The loop in git alone** (P2-N018, identified)
    after P2-N017 · [spec](specs/p2-n005-task-pull-loop.md)
    Note: depends on P2-N017
  - **Role-aware session identity for the service** (P2-N019, identified)
    after P2-N017 · [spec](specs/p2-n005-task-pull-loop.md)
    Note: depends on P2-N017; independent of P2-N018 (RU-018)
  - **The task tools of the service** (P2-N020, identified)
    after P2-N018, P2-N019 · [spec](specs/p2-n005-task-pull-loop.md)
    Note: depends on P2-N018 and P2-N019
- **This repository migrates onto the service, then the pilot runs on methodology-tools** (P2-N006, identified)
  after P2-N005, P2-N003
  Note: Chunk 5 of the parent plan; depends on P2-N005 and on P2-N021, the web view's first version, done 2026-11-03, not on P2-N003 as a whole (owner, 2026-10-29)

### Project comprehension and continuous implementation (P3-N001)

Stage: broken-down, in progress, its children carry the work.

A model of each part of a project and what depends on it, plus the safeguards for longer runs of work without owner review.

Documents: [plan](plans/comprehension-and-continuous-implementation.md), [spec](specs/p3-n001-comprehension-and-continuous-implementation.md).

- **The comprehension model: resources, edges and renderings** (P3-N002, broken-down)
  One comprehension model, defined as an extension of the planning and execution model this project already has, plus one instance of it over this repository, populated from documents that already exist here.
  [plan](plans/p3-n002-comprehension-model.md), [spec](specs/p3-n002-comprehension-model.md)
  Note: Chunk 1 of the parent plan
  - **The thin end-to-end slice: five real parts all the way through, and both renderings** (P3-N006, done 2026-10-30)
    Five real parts of this repository carried through the model, the navigation bound and both renderings, in one commit, so that P3-N007 can define the type against content that has already pushed back.
    [plan](plans/p3-n006-thin-end-to-end-slice.md), [spec](specs/p3-n002-comprehension-model.md)
  - **The type declared, the arguments written, the K-003 amendment drafted** (P3-N007, done 2026-10-31)
    The Project model becomes a declared type of this repository, and the K-003 (the Backlog is the single source of progress truth) amendment exists as a reviewed proposal ready for the owner to carry.
    after P3-N006 · [plan](plans/p3-n007-type-declared-amendment-drafted.md), [spec](specs/p3-n002-comprehension-model.md)
    Note: depends on P3-N006
  - **The instance, over this repository** (P3-N008, planned, gated: owner review of the plan)
    The instance describes every current part of the project.
    after P3-N007 · [plan](plans/p3-n008-instance-over-this-repository.md), [spec](specs/p3-n002-comprehension-model.md)
    Note: depends on P3-N007 for its executing stage (P3-N007 decision 9), done 2026-10-30
  - **Sibling ordering retired, and the checks that replace it** (P3-N009, identified)
    after P3-N008
    Note: depends on P3-N008
- **The common risk catalogue** (P3-N003, broken-down)
  A catalogue of recurring risk classes, each carried from one instance to a check that reads the Risk register's class lines.
  [plan](plans/p3-n003-common-risk-catalogue.md), [spec](specs/p3-n003-common-risk-catalogue.md)
  Note: Chunk 2 of the parent plan; independent of P3-N002 (RU-018)
  - **One class, carried end to end** (P3-N010, done 2026-10-30)
    The catalogue exists with one entry.
    [plan](plans/p3-n010-one-class-end-to-end.md), [spec](specs/p3-n003-common-risk-catalogue.md)
  - **The sweep, the rest of the catalogue, and the omission list** (P3-N011, done 2026-10-31)
    Every candidate in the five sources that criterion B1 (one recorded pass per source) names is dispositioned on the record.
    after P3-N010 · [plan](plans/p3-n011-sweep-and-omission-list.md), [spec](specs/p3-n003-common-risk-catalogue.md)
    Note: depends on P3-N010
  - **The Article 8 proposal, written IR first and reviewed** (P3-N012, identified)
    after P3-N011
    Note: depends on P3-N011, done 2026-11-03
- **Reversibility, and the measurement that says whether it pays** (P3-N004, identified)
  after P3-N002
  Note: Chunk 3 of the parent plan; depends on P3-N002
- **Sequence mode: the loop runs W-001's pre-ratified mode** (P3-N005, broken-down)
  This project's own dispatch loop runs methodology W-001's pre-ratified sequence mode, and the four conditions that stop a sequence are applied mechanically by the roles that meet them.
  [plan](plans/p3-n005-sequence-mode.md), [spec](specs/p3-n005-sequence-mode.md)
  Note: Chunk 4 of the parent plan; independent of P3-N002 (RU-018)
  - **The four stop conditions, decidable, evidenced, and related to the meta-review signals** (P3-N013, done 2026-10-30)
    W-001's four stop conditions exist as committed predicates that two blind readings apply identically to this project's past task results.
    [plan](plans/p3-n013-stop-conditions-decidable.md), [spec](specs/p3-n005-sequence-mode.md)
  - **The loop runs sequence mode, and the roles meet the conditions without looking** (P3-N014, done 2026-10-30)
    This project's dispatch loop can run methodology W-001 (two delivery modes, human-gated)'s pre-ratified sequence.
    after P3-N013, P1-N014 · [plan](plans/p3-n014-loop-runs-sequence-mode.md), [spec](specs/p3-n005-sequence-mode.md)
    Note: depends on P3-N013 and on P1-N014's execute
  - **The demonstration: a ratified sequence lands two chunks and stops on asks** (P3-N015, broken-down)
    The owner ratifies a sequence of four members once.
    after P3-N014 · [plan](plans/p3-n015-sequence-demonstration.md), [spec](specs/p3-n005-sequence-mode.md)
    Note: depends on P3-N014; plan gate crossed 2026-11-04, decisions 1 to 7 at their defaults; specified by the parent's Child C with the plan's criteria (decision 3); its children run as a ratified sequence, in this order; the first is dispatched only when no other task is in flight (decision 5)
    - **The process specification cites the methodology at its pin** (P3-N017, done 2026-11-07)
      The owner ratifies a sequence of four members once.
      [plan](plans/p3-n015-sequence-demonstration.md)
      Note: T105 accepted 2026-11-07, member 1 of the ratified sequence
    - **Risk register entries can be linked one by one** (P3-N018, done 2026-11-07)
      The owner ratifies a sequence of four members once.
      [plan](plans/p3-n015-sequence-demonstration.md)
      Note: T106 accepted 2026-11-07, member 2 of the ratified sequence
    - **The checker extension-point proposal is ready to carry** (P3-N019, done 2026-11-08)
      The owner ratifies a sequence of four members once.
      [plan](plans/p3-n015-sequence-demonstration.md)
      Note: T107 accepted 2026-11-08, member 3 of the ratified sequence
    - **The plugin tools are tested the way they run** (P3-N020, specified)
      The owner ratifies a sequence of four members once.
      after P3-N019 · [plan](plans/p3-n015-sequence-demonstration.md)
      Note: ratified, withheld by the stop
  - **The determination on W-001, and the artifact or the argument** (P3-N016, identified)
    after P3-N015
    Note: depends on P3-N015

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
- D005 (2026-11-09): Pause the P3 line (comprehension model, risk catalogue, sequence mode, reversibility) and park its open nodes Chosen: yes
- D006 (2026-11-09): The service may write git under the path allowlist above. This changes the service plan's standing constraint "the service never writes git" and keeps "git is authoritative" Chosen: yes
- D007 (2026-11-09): The state file is JSON validated by a zod schema, at orchestration/state.json Chosen: yes
- D008 (2026-11-09): The shared model code lives in the service repository and is consumed by the plugin as a package. Vendoring is retired Chosen: yes
- D009 (2026-11-09): During the rebuild, pull requests auto-merge on green in both repositories Chosen: yes
- D010 (2026-11-09): The methodology pin stays at 1.6.0 with the deviations the review lists, recorded at M0 Chosen: yes
- D011 (2026-11-09): Node identifiers stay as they are (P2-N021). Titles are shown beside them everywhere Chosen: keep
- D012 (2026-11-09): Milestones 1 to 6 run as one pre-ratified sequence Chosen: yes
- D013 (2026-11-09): The view targets a desktop browser Chosen: as stated
- D014 (2026-11-09): No git-only fallback for a service outage is built in this plan Chosen: as stated
- D015 on P2-N017 (2026-11-09): P2-N017's specification Chosen: superseded by the rebuild: not answered
- D016 on P2-N017 (2026-11-09): Where the cloud probes run Chosen: superseded by the rebuild: not answered
- D017 on P2-N017 (2026-11-09): The scratch offering branch Chosen: superseded by the rebuild: not answered
- D018 on P2-N017 (2026-11-09): O11's order Chosen: superseded by the rebuild: not answered
- D019 on P2-N017 (2026-11-09): Simultaneous pushes Chosen: superseded by the rebuild: not answered
- D020 on P2-N022 (2026-11-09): Place the owner's reordering of 2026-11-03 Chosen: superseded by the rebuild: not answered
- D021 on P2-N022 (2026-11-09): Leaf, one specify task, then three execute slices Chosen: superseded by the rebuild: not answered
- D022 on P2-N022 (2026-11-09): A Question register in git Chosen: superseded by the rebuild: not answered
- D023 on P2-N022 (2026-11-09): Where a held answer lives Chosen: superseded by the rebuild: not answered
- D024 on P2-N022 (2026-11-09): How the owner is authorized to answer Chosen: superseded by the rebuild: not answered
- D025 on P2-N022 (2026-11-09): Which question tools, and for whom Chosen: superseded by the rebuild: not answered
- D026 on P2-N022 (2026-11-09): How scheduling and delegation decisions ride the queue Chosen: superseded by the rebuild: not answered
- D027 on P2-N022 (2026-11-09): Immediate-class questions Chosen: superseded by the rebuild: not answered
- D028 on P2-N022 (2026-11-09): No new journal event kind Chosen: superseded by the rebuild: not answered
- D029 on P2-N022 (2026-11-09): The node's check, and who verifies Chosen: superseded by the rebuild: not answered
- D030 on P2-N022 (2026-11-09): Ratify or strike three terms Chosen: superseded by the rebuild: not answered
- D031 on P3-N008 (2026-11-09): P3-N008's specification Chosen: superseded by the rebuild: not answered
- D032 on P3-N008 (2026-11-09): Leaf, run as three execute tasks in a fixed order Chosen: superseded by the rebuild: not answered
- D033 on P3-N008 (2026-11-09): The service repository's parts are in the instance Chosen: superseded by the rebuild: not answered
- D034 on P3-N008 (2026-11-09): Plan and specification documents enter the model as two resources Chosen: superseded by the rebuild: not answered
- D035 on P3-N008 (2026-11-09): docs/plan.md stays the hand rendering until the switch Chosen: superseded by the rebuild: not answered
- D036 on P3-N008 (2026-11-09): Every entry heading carries a name Chosen: superseded by the rebuild: not answered
