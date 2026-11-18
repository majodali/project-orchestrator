# The project plan

Generated from `orchestration/state.json` by `plan-state render`. Do not edit by hand: edit the state file, or use the service's tools, and run `plan-state render --write`. `plan-state check` fails when this file differs from the rendering.

Reader: the owner, and any session working on the project. The reader
knows the README. Each node is shown as its title, its identifier,
its stage and its outcome. The state file holds the rest.

## Waiting on the owner

Nothing.

## Ready, starting automatically when the loop runs

- Rework cost measured against the reviews it replaces (P2-N029) [identified]

## In flight

- State directory created by the importer (P4-N049) [executing] — T183
- Plan rendering that survives a decision on a hidden check node (P4-N050) [identified] — T184
- Verification of Service repository enlisted for delegated sessions (P2-N045) [specified] — T185

## In progress, children carry the work

- Rebuild: the orchestrator runs on a checked data model (P4-N001) [broken-down]
- Re-plan, prune and hand back (P4-N008) [broken-down]
- Pilot enlistment of methodology-tools (P4-N027) [broken-down]
- Orchestration service (P2-N001) [broken-down]
- Orchestrator session that keeps work moving (P2-N027) [broken-down]
- Service repository enlisted for delegated sessions (P2-N032) [verifying]
- View that updates itself and leads with what matters (P2-N028) [broken-down]

## Waiting on a dependency

- methodology-tools' plan as a state file (P4-N045) [specified] — after State directory created by the importer (P4-N049)
- Second instance on the deploy path (P4-N046) [specified] — after methodology-tools' plan as a state file (P4-N045)
- The pilot's first task through its own instance (P4-N047) [specified] — after Second instance on the deploy path (P4-N046)
- Pilot on methodology-tools: sessions on the task loop (P2-N006) [identified] — after Pilot enlistment of methodology-tools (P4-N027)
- Faster writes, a bounded journal and a deploy write test (P2-N025) [identified] — after Re-plan, prune and hand back (P4-N008)
- Several projects and repositories in one instance (P2-N026) [identified] — after Re-plan, prune and hand back (P4-N008)
- Orchestrator trial with its measured cost (P2-N033) [specified] — after Service repository enlisted for delegated sessions (P2-N032)
- Tree page that updates itself (P2-N037) [specified] — after Service repository enlisted for delegated sessions (P2-N032)
- Four lists ahead of the tree (P2-N038) [specified] — after Service repository enlisted for delegated sessions (P2-N032)
- Session, duration and criteria on pages (P2-N039) [specified] — after Four lists ahead of the tree (P2-N038)
- Feedback in place and the node panel (P2-N040) [specified] — after Tree page that updates itself (P2-N037), Four lists ahead of the tree (P2-N038)
- View trial with its measured delay (P2-N041) [specified] — after Session, duration and criteria on pages (P2-N039), Feedback in place and the node panel (P2-N040)
- Session field adopted in this repository (P2-N042) [specified] — after Session, duration and criteria on pages (P2-N039)

## Blocked

- Project comprehension and continuous implementation (P3-N001) [broken-down] — Paused by the owner (D005) and kept held by D063. The line resumes when the owner decides to resume it and lifts this hold in the view.
- Pin migrated to the release with the K-003 amendment (P4-N042) [identified] — Waits for majodali/methodology to tag the release that carries the K-003 amendment (D079). The owner lifts this hold when it is tagged.

## Paused by a hold or a park above

- Comprehension model (P3-N002) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Project model instance for this repository (P3-N008) [planned] — under Project comprehension and continuous implementation (P3-N001)
- Replacement of sibling ordering by recorded dependencies (P3-N009) [identified] — under Project comprehension and continuous implementation (P3-N001)
- Common risk catalogue (P3-N003) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Article 8 amendment proposal (P3-N012) [identified] — under Project comprehension and continuous implementation (P3-N001)
- Reversibility and its measurement (P3-N004) [identified] — under Project comprehension and continuous implementation (P3-N001)
- Sequence mode (P3-N005) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Sequence mode demonstration (P3-N015) [broken-down] — under Project comprehension and continuous implementation (P3-N001)
- Determination on W-001 sequence mode (P3-N016) [identified] — under Project comprehension and continuous implementation (P3-N001)

## The plan

### Orchestrator v1: process specification and plugin (P1-N001)

Stage: done, done.

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
  [plan](archive/plans/p1-n008-mtool-checker-extension-point.md), [spec](archive/specs/p1-n008-mtool-checker-extension-point.md)
- **Plugin tooling on the portfolio stack** (P1-N009, done 2026-08-30)
  The plugin's tooling runs on the portfolio's declared stack, Node and TypeScript, and the Plan register grammar has one implementation that both repositories share.
  [plan](archive/plans/p1-n009-plugin-tooling-portfolio-stack.md), [spec](archive/specs/p1-n009-plugin-tooling-portfolio-stack.md)
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
  [plan](archive/plans/p1-n014-role-contracts-adopt-v140-rules.md), [spec](archive/specs/p1-n014-role-contracts-adopt-conduct-rules.md)
- **Methodology amendments for delegated multi-agent work** (P1-N015, done 2026-09-01)
  Four adjudicable amendment proposals to majodali/methodology, drafted in this repository and hand-carried upstream by the owner.
  [plan](archive/plans/p1-n015-methodology-amendments-delegated-work.md), [spec](archive/specs/p1-n015-methodology-amendments-delegated-work.md)
- **Process specification maintenance** (P1-N016, done 2026-11-05)
  Every Backlog row routed to this node is either landed in the process specification, or closed with a stated reason.
  [plan](archive/plans/p1-n016-process-spec-maintenance.md)
  Note: plan gate crossed 2026-11-03, the plan's criteria are its specification (decision 2); does not wait on P3-N009 (decision 3); E1 (T103) accepted 2026-11-03, E2 (T104) accepted 2026-11-05 under the owner's rulings A26 to A28; verifying gate crossed 2026-11-08

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
    [plan](archive/plans/p3-n006-thin-end-to-end-slice.md), [spec](specs/p3-n002-comprehension-model.md)
  - **Project model type and K-003 amendment draft** (P3-N007, done 2026-10-31)
    The Project model becomes a declared type of this repository, and the K-003 (the Backlog is the single source of progress truth) amendment exists as a reviewed proposal ready for the owner to carry.
    after P3-N006 · [plan](archive/plans/p3-n007-type-declared-amendment-drafted.md), [spec](specs/p3-n002-comprehension-model.md)
    Note: depends on P3-N006
  - **Project model instance for this repository** (P3-N008, planned, gated: owner review of the plan)
    The instance describes every current part of the project.
    after P3-N007 · [plan](plans/p3-n008-instance-over-this-repository.md), [spec](specs/p3-n002-comprehension-model.md)
    Note: The hold on P3-N001 covers this node: its own gate is not asked of the owner until the P3 line resumes (D005, D063).
  - **Replacement of sibling ordering by recorded dependencies** (P3-N009, identified)
    after P3-N008
    Note: depends on P3-N008
- **Common risk catalogue** (P3-N003, broken-down)
  A catalogue of recurring risk classes, each carried from one instance to a check that reads the Risk register's class lines.
  [plan](plans/p3-n003-common-risk-catalogue.md), [spec](specs/p3-n003-common-risk-catalogue.md)
  Note: Chunk 2 of the parent plan; independent of P3-N002 (RU-018)
  - **First risk class end to end** (P3-N010, done 2026-10-30)
    The catalogue exists with one entry.
    [plan](archive/plans/p3-n010-one-class-end-to-end.md), [spec](specs/p3-n003-common-risk-catalogue.md)
  - **Catalogue sweep and omission list** (P3-N011, done 2026-10-31)
    Every candidate in the five sources that criterion B1 (one recorded pass per source) names is dispositioned on the record.
    after P3-N010 · [plan](archive/plans/p3-n011-sweep-and-omission-list.md), [spec](specs/p3-n003-common-risk-catalogue.md)
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
    [plan](archive/plans/p3-n013-stop-conditions-decidable.md), [spec](specs/p3-n005-sequence-mode.md)
  - **Sequence mode in the dispatch loop** (P3-N014, done 2026-10-30)
    This project's dispatch loop can run methodology W-001 (two delivery modes, human-gated)'s pre-ratified sequence.
    after P3-N013, P1-N014 · [plan](archive/plans/p3-n014-loop-runs-sequence-mode.md), [spec](specs/p3-n005-sequence-mode.md)
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
      Note: The hold on P3-N001 covers this node: it resumes with the P3 line, by the owner's decision (D005, D063).
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
- **Minimal task loop** (P4-N007, done 2026-11-11)
  A session takes the next ready task and closes it through two tool calls, with the stop conditions and the standard close-out actions as orchestrator features.
  after P4-N006 · [plan](plans/rebuild.md)
  Note: Built in service pull request 36; fixes from the first real use in service pull request 37; the week of real work through the loop is the acceptance
- **Re-plan, prune and hand back** (P4-N008, broken-down)
  The remaining nodes are re-planned in the state file, the document set is pruned, the upstream proposals go in one batch, and the pilot on methodology-tools starts.
  after P4-N007 · [plan](plans/rebuild.md)
  - **Re-plan of the remaining nodes** (P4-N022, done 2026-11-13)
    Every node still open outside the rebuild is either planned for the task loop or removed, and none carries a hold that names this milestone.
    [plan](plans/rebuild.md)
  - **Role agents on the task loop** (P4-N023, done 2026-11-13)
    The planner, implementer and reviewer agents describe the work as the task loop runs it, and the orchestrator, auditor and semantic-auditor roles and the orchestrate skill are archived.
    [plan](plans/rebuild.md)
  - **Pruned document set** (P4-N024, done 2026-11-16)
    docs/ holds what the service and plan-state enforce, one "how we work" page, and the records still linked from the state file; everything else is in docs/archive/ with a status line each.
    after P4-N022, P4-N023 · [plan](plans/rebuild.md)
    Note: Added by the owner, 2026-11-14: this node also archives the journal-tail skill. Move plugin/skills/journal-tail/SKILL.md to docs/archive/skills/ with a status line, and take it out of plugin/README.md. Keep plugin/scripts/journal_tail.ts, runnable by hand like form_check.ts. Add this as a criterion to the node's list in docs/plans/rebuild.md in the same pull request.
  - **README and generated Backlog** (P4-N025, done 2026-11-16)
    The README tells a new reader what this is, where the view is, how a session enlists and how to run the checks, and the Backlog is a rendering of the state file.
    after P4-N024 · [plan](plans/rebuild.md)
    Note: The service part is majodali/project-orchestrator-service#41, merged at cb9d727 and deployed on 2026-11-16. From that deploy the service writes docs/backlog.md with every state commit.
  - **Upstream proposals batch** (P4-N026, done 2026-11-17)
    Three proposals, each with evidence from this rebuild, are ready for the owner to carry to majodali/methodology in one batch.
    [plan](plans/rebuild.md)
    Note: Added by the owner's answer to D073 (on P4-N032), 2026-11-17: the batch also carries a request to methodology-tools for a way to exempt methodology text that a document quotes verbatim (RU-015) from mtool links check, so the tool can exit zero over this tree. Evidence: the 8 findings P4-N032 dispositioned. Add it as a criterion to the node's list in docs/plans/rebuild.md in the same pull request.
  - **Pilot enlistment of methodology-tools** (P4-N027, broken-down)
    methodology-tools is enlisted in the service and its state file is imported from its Backlog, checked by plan-state.
    after P4-N022, P4-N024 · [plan](plans/pilot-enlistment-methodology-tools.md)
    Note: The pilot's instance is the same code and template with different parameters, with no fork, because one instance must later serve several projects (P2-N026).
    - **Backlog reader in the state importer** (P4-N044, done 2026-11-18)
      `plan-state import` builds a state file from a project's K-004 Backlog when that project has no Plan register, and its import record names every row it did not map and why.
      Note: Child 1 of P4-N027. Criteria: docs/plans/pilot-enlistment-methodology-tools.md, section 1 (the parent's plan document; this node links none of its own). Writes to majodali/project-orchestrator-service (standing, RU-016), where the owner merges and a merge deploys, and to this repository for the pin. The importer requires docs/plan-register.md today and methodology-tools has none, which is why this child precedes the import.
    - **State directory created by the importer** (P4-N049, executing)
      `plan-state import --write` creates the `orchestration/` directory when the target repository has none, instead of failing with ENOENT.
      Note: Child 5 of P4-N027. Criteria: docs/plans/pilot-enlistment-methodology-tools.md, section 5 (the parent's plan document; this node links none of its own, as children 1 to 4 do not). Specified on that list by T181, which added no document: the seven criteria are at the depth the work needs. Found by the reviewer of P4-N044 (T174) and raised by T175 as D097; D099 made P4-N045 wait for this node and D100 kept start: auto. Writes to majodali/project-orchestrator-service, where the owner merges and a merge deploys, and to this repository for the pin. Observed by T181 at service commit b93c139, over a temporary repository holding only docs/backlog.md: the import throws ENOENT on orchestration/state.json at src/model/cli.ts:149 and exits 1 with a stack trace, so criterion 1's "exits on the import's own result" means the import reports instead of throwing. src/model/cli.ts self-executes (process.exit(main(...)) at module scope), so a test drives it as a subprocess; `npx tsx src/model/cli.ts import --repo <tmp> --project <owner/name> --write` works, and --project is needed because a temporary repository has no git remote.
    - **methodology-tools' plan as a state file** (P4-N045, specified)
      methodology-tools carries orchestration/state.json, imported from its Backlog by `plan-state import` and passing `plan-state check`, with its hand-written Backlog archived and the K-003 deviation recorded.
      after P4-N049
      Note: Child 2 of P4-N027. Criteria: docs/plans/pilot-enlistment-methodology-tools.md, section 2. Writes to majodali/methodology-tools, new to this project and granted by D065 for P4-N027 only, so it starts on approval; the owner adds that repository to the GitHub App's installation (O1) and merges there after reviewing the import record. Waits for P4-N044: the importer cannot read a Backlog until then.
    - **Second instance on the deploy path** (P4-N046, specified)
      Every merge in the service repository deploys, smoke-tests and promotes both instances from one template at one commit, and the runbook and the deploy role's record carry the second instance.
      after P4-N045
      Note: Child 3 of P4-N027. Criteria: docs/plans/pilot-enlistment-methodology-tools.md, section 3. Writes to majodali/project-orchestrator-service (standing, RU-016), where the owner merges and that merge is the deploy, so it starts on approval; the owner widens the deploy role's policy first (O2). Waits for P4-N045 because check 3 of scripts/smoke-test.sh calls plan_read: the second instance's smoke test fails until methodology-tools carries a state file, and a failing instance reddens the whole run.
    - **The pilot's first task through its own instance** (P4-N047, specified)
      A session started in methodology-tools reaches the pilot instance, `task_next` answers a node of methodology-tools, and one write commits there as the GitHub App with its journal line.
      after P4-N046
      Note: Child 4 of P4-N027. Criteria: docs/plans/pilot-enlistment-methodology-tools.md, section 4. Writes .mcp.json and .claude/settings.json to majodali/methodology-tools (D065) and the enlistment corrections to this repository's docs/process/how-we-work.md, so it starts on approval; the owner sets MCP_AUTH_TOKEN in that repository's cloud environment first (O3). Waits for P4-N046: .mcp.json names an endpoint the second instance's first deploy creates. The two hooks stay with P2-N006 (RU-017).
  - **Document paths changed through the service** (P4-N031, done 2026-11-17)
    A task can re-point a node's plan and specification paths through the service, in an order that lets a pull request move a linked document without main failing plan-state check.
    [plan](plans/rebuild.md)
    Note: Split from P4-N024 by the owner, 2026-11-15. Writes to majodali/project-orchestrator-service (standing, RU-016). Criteria: docs/plans/rebuild.md, child 7.
  - **Linked plans and specs archived** (P4-N032, done 2026-11-17)
    The superseded plans and specs the state file links are in docs/archive/ with a status line each, the state file names their new paths, and the word count and the 300-line bound are measured.
    after P4-N031, P4-N024 · [plan](plans/rebuild.md)
    Note: Split from P4-N024 by the owner, 2026-11-15: it carries the three criteria P4-N024 could not meet. Criteria: docs/plans/rebuild.md, child 8.
- **Task cost capture** (P4-N010, done 2026-11-11)
  A task's tokens by type and its model are measured and recorded when the task closes, without the session estimating them.
  [plan](plans/rebuild.md)
  Note: Owner approved the mechanism on 2026-11-11: a task_cost tool in the service, fed by a hook in this repository and by headless runs
- **Task required for session writes** (P4-N012, done 2026-11-12)
  The service refuses a session's write to a node or a decision unless it names an open task or carries the owner's dictated words, and pull requests cannot change the files the service owns.
  [plan](plans/rebuild.md)
  Note: The owner asked for the enforcement on 2026-11-12, after the first real use changed a node with no claim
- **Session start: current checkout and tasks on offer** (P4-N014, done 2026-11-12)
  A starting session has the latest main, or is told plainly that it has not, and is shown the tasks on offer before it does anything.
  [plan](plans/rebuild.md)
- **Service package installs on Windows** (P4-N016, done 2026-11-12)
  npm ci of a repository that depends on the service package succeeds on Windows: the package's install step starts the compiler with Node directly, never through npm or a shell.
  [plan](plans/rebuild.md)
- **Session hooks run on Windows** (P4-N017, done 2026-11-12)
  The session start hook and the cost hook are Node scripts that need only node and git on the path, registered in a form that works under Git Bash and PowerShell.
  [plan](plans/rebuild.md)
- **Session start summary and the offer to act** (P4-N020, done 2026-11-12)
  When a session starts, the person sees a short summary of the plan on screen, and the agent's first reply gives the summary and asks before it takes a task on offer.
  [plan](plans/rebuild.md)
- **Delegated tasks claimed without asking** (P4-N034, done 2026-11-16)
  A session that an orchestrating session starts with a brief naming a node and a step claims that task without asking a person first, and a session a person starts still asks before it claims.
  after P4-N024 · [plan](plans/rebuild.md)
  Note: Asked for by the owner, 2026-11-16, after a reviewer session launched for P4-N033 stopped to ask before claiming. Criteria: (1) the session start hook's text, CLAUDE.md, docs/process/how-we-work.md and the three role agents state one rule; (2) the rule says how a session recognises a delegation brief, and that the brief authorises the named node and step and nothing else; (3) owner decisions stay asks at task_close; (4) a trial is recorded: a session launched with a brief claims its task without asking, and a session started without one still asks.
- **One branch for each pull request** (P4-N038, done 2026-11-17)
  Every pull request comes from a branch of its own, made for that task and deleted after the merge, so two sessions never push to the same branch.
  [plan](plans/rebuild.md)
  Note: Asked for by the owner, 2026-11-17, after a second session worked on another session's branch (claude/zealous-einstein-1rw9kw) and both opened pull requests from it. Criteria: (1) docs/process/how-we-work.md and the three role agents say a task's pull request comes from a new branch named for the task, never from a branch another pull request used; (2) a delegating session starts the new session on main, never on its own work branch, unless the brief says the work is on that branch; (3) head branches are deleted after merge in this repository and the service repository, by the repository setting or by the service at merge, and the record says which; (4) the rule is tried once: two tasks in a row from one session produce two branches, and the first is gone after its merge.
- **Pin migrated to the release with the K-003 amendment** (P4-N042, identified, blocked: Waits for majodali/methodology to tag the release that carries the K-003 amendment (D079). The owner lifts this hold when it is tagged.)
  This repository pins the methodology release that carries the K-003 amendment, declares the state file as its planning/execution model, ends the K-003 deviation, and adopts or deviates from each other amendment in that release.
  Note: Added by the owner's answer to D079 (on P4-N026), 2026-11-17. It starts when majodali/methodology tags the release; until then nothing can be done. The owner carries the batch in the order D078 gives: proposals two and three first, then the release.
- **Plan rendering that survives a decision on a hidden check node** (P4-N050, identified)
  A write that leaves an open decision on a hidden check node succeeds: the plan rendering names the decision's node whether or not that node is shown.
  Note: Found on P2-N032, task T182: task_close failed with "Cannot read properties of undefined (reading 'title')" and committed nothing. Cause, reproduced read-only at service commit b93c139: renderPlan in src/model/render.ts builds its node map from shownNodes, and decisionLine looks up each open decision's node there; a check node with no hold and no open task is hidden, so an open decision on it (D101 on P2-N045) has no node. A rework close clears the check node's hold and so meets it. Writes to majodali/project-orchestrator-service, where the owner merges and a merge deploys; a pin move in this repository follows.

### Orchestration service (P2-N001)

Stage: broken-down, in progress, its children carry the work.

A service that Claude Code sessions call over MCP for plan state, coordination and owner questions, with a web view of the plan, and git as the only source of truth.

Documents: [plan](plans/orchestration-service.md).

- **Service skeleton and plan state** (P2-N002, done 2026-08-26)
  A deployed MCP service reads and validates the Plan register through a GitHub App, and a session updates plan state under an advisory lease.
  [plan](archive/plans/p2-n002-service-skeleton.md), [spec](archive/specs/p2-n002-service-skeleton.md)
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
  [plan](archive/plans/p2-n012-deploy-from-ci-on-merge.md), [spec](archive/specs/p2-n012-deploy-from-ci-on-merge.md)
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
  [plan](archive/plans/p2-n003-owner-questions-and-plan-view.md), [spec](archive/specs/p2-n003-owner-questions-and-plan-view.md)
  Note: Chunk 2 of the parent plan; split into the web view's first version and the owner question queue (owner, 2026-10-29)
  - **Web view v1** (P2-N021, done 2026-11-02)
    A signed-in owner sees the plan tree at one commit and drills to node and task pages, with the Project model's renderings beside them.
    [spec](archive/specs/p2-n003-owner-questions-and-plan-view.md)
    Note: independent of P2-N005 and P2-N004 (RU-018; owner, 2026-10-29); its task E3 waits on P3-N007 done, its tasks E1 and E2 do not (plan decision 8)
  - **Web view UX refinement** (P2-N023, done 2026-11-07)
    At V30 the owner decided that the web view does not replace docs/plan.md yet.
    after P2-N021 · [plan](archive/plans/p2-n023-web-view-ux-refinement.md)
    Note: Iterations 1 to 3 accepted 2026-11-03; the owner ended the loop on 2026-11-07, and the rebuild's milestone 2 superseded the view (owner, 2026-11-10)
- **Pilot on methodology-tools: sessions on the task loop** (P2-N006, identified)
  Sessions on methodology-tools take and close their work through the task loop, with the session start hook and the task-cost hook installed there.
  after P4-N027
  Note: Re-planned by T131 (P4-N022). The migration onto the service is delivered by the rebuild, and the enlistment and import by P4-N027. What remains is the adoption that P4-N027 leaves to a separate node (RU-017). It writes to majodali/methodology-tools, which needs a new grant (D065 covers P4-N027 only), so it starts on approval.
- **Faster writes, a bounded journal and a deploy write test** (P2-N025, identified)
  A state write returns faster, the journal stops growing without bound, and the deploy check proves a write end to end: the review's service findings (D068).
  after P4-N008
- **Several projects and repositories in one instance** (P2-N026, identified)
  One instance of the orchestrator and the service serves several projects and their repositories; the pilot's separate instance is retired into it.
  after P4-N008
- **Orchestrator session that keeps work moving** (P2-N027, broken-down)
  One restartable session starts a session for each offered task on its role's model, messages stalled ones, and returns to the owner only on the four stop conditions, so offered work proceeds without the owner starting or prompting sessions.
  [plan](plans/orchestrator-session.md), [spec](specs/orchestrator-session.md)
  Note: The owner, 2026-11-16: work should always continue wherever possible. Of three ways (the service starts sessions, enlisted sessions take their next task, an orchestrator session that starts sessions and messages existing ones) the owner prefers the last, and it could be made configurable. Open for the plan step: where the model per role is recorded, how many sessions run at once, and what wakes the orchestrator session. From the P3 line, which stays held (the owner, 2026-11-17): reuse the four stop conditions of sequence mode, which P3-N013 made decidable (docs/specs/p3-n005-sequence-mode.md): a failed check, a scope change, a decision that is the owner's, and a close that carries asks. They are when the orchestrator session returns to the owner. The plan step also says what is left of P3-N005 and P3-N016 once this node exists. Input from the owner, 2026-11-17: a session that attaches a second repository after it starts loses the service tools that .mcp.json gives it, and they do not return (seen in the session that executed P4-N031). So the orchestrator session attaches no repository mid-session, and work in another repository goes to a session started for it; the plan step says how that session reaches the service. Next step: break down (the plan's four slices; docs/specs/orchestrator-session.md, S8).
  - **Decision script and settings of the orchestrator** (P2-N030, done 2026-11-17)
    A script prints the sessions to start and the reports to give as JSON, from the state file, the journal, the settings, the agent files and a session snapshot, and one session per role was started from its output.
    [plan](plans/orchestrator-session.md), [spec](specs/orchestrator-session.md)
    Note: Slice 1 of the plan (Children). Criteria 1 to 6, 8, 19 and 20 of the specification.
  - **Orchestrator role and its watcher** (P2-N031, done 2026-11-17)
    A session that follows the orchestrator role carries out the script's actions, is woken by a background watcher when a new action appears, checks and nudges stalled sessions, continues reworks by message, and reports each stop to the owner.
    after P2-N030 · [plan](plans/orchestrator-session.md), [spec](specs/orchestrator-session.md)
    Note: Slice 2 of the plan (Children). Criteria 7 and 9 to 12 of the specification. Waits for P2-N030: it extends the decision function that node creates.
  - **Service repository enlisted for delegated sessions** (P2-N032, verifying)
    A session started in majodali/project-orchestrator-service reaches the orchestration service, opens and closes a task, and that task has a measured cost from a vendored copy of the cost hook.
    after P2-N030 · [spec](specs/orchestrator-session.md)
    Note: Slice 3 of the plan docs/plans/orchestrator-session.md (Children). Criterion 13 and section S7 of the specification. Writes to majodali/project-orchestrator-service (in scope by RU-016), where a merge deploys and the owner merges by hand. Links no plan document, so it may run beside P2-N031 under the specification's shared-document rule (S4): the two edit different files. Waits for P2-N030: its trial starts a session from that node's script.
    - check: **Verification of Service repository enlisted for delegated sessions** (P2-N045, specified)
      P2-N032 is verified against its outcome.
      [spec](specs/orchestrator-session.md)
  - **Orchestrator fixes before its trial** (P2-N036, done 2026-11-18)
    A new decision on a node already reported wakes the watcher, a verification starts beside work on the same plan document, and the orchestrator role leaves a cold session nothing to guess in the four places its verification found.
    after P2-N031 · [plan](plans/orchestrator-session.md), [spec](specs/orchestrator-session.md)
    Note: Added on the owner's answers of 2026-11-17 to D087 (on P2-N030), D088 and D089 (on P2-N031), which each name this node. Criteria: (1) D088: the keys of `decision` and `asks` reports carry the decisions' identifiers, so a second decision on a node changes a key; specification S1 and the two expected keys in test/orchestrate.test.ts follow, which the owner's answer to D088 allows. (2) D087: a verify start is exempt from the shared-document rule of S4, in lib/orchestrate.ts and its test, and S4 says so. (3) D089, in .claude/agents/orchestrator.md, still at most 120 lines: it tells the session to give the background watcher the two-hour limit and what to do if the watcher is stopped with no output; how the session learns its own identifier for --self; one rule for what it tells the owner at a wake, the time-limit wake included; and archive_session is used or dropped. (4) T159's other finding is settled: the status bucket that never says archived. (5) plugin/agents/ is regenerated and the checks pass.
  - **Orchestrator trial with its measured cost** (P2-N033, specified)
    A recorded trial shows the orchestrator session carrying three nodes to done without the owner, being replaced once, and writing nothing to the plan, with its own cost set beside the cost of the tasks it delegated.
    after P2-N032 · [plan](plans/orchestrator-session.md), [spec](specs/orchestrator-session.md)
    Note: Slice 4 of the plan (Children). Criteria 14 to 18. Its last act carries out D075: remove P3-N015 and P3-N020, and make P3-N016 wait for P2-N027.
- **View that updates itself and leads with what matters** (P2-N028, broken-down)
  The view shows a plan change within a minute without a reload, and opens with what needs the owner, what is ready, what is running and what just finished; node and task pages show criteria, duration and the session.
  [plan](plans/view-that-leads-and-updates.md)
  Note: The owner, 2026-11-16: the view is the best way to know that something waits on the owner, so it must update dynamically and show more useful information. The owner's earlier notes belong here too: the node page as a detail panel beside the tree, feedback after a click, and single-page behaviour. The view allows no script today; updating by itself needs one. From the P3 line, which stays held (the owner, 2026-11-17): the comprehension model (docs/specs/p3-n002-comprehension-model.md) describes each part of a project and what depends on it. The plan step decides what of it the view shows, such as what a node's work touches and what depends on that.
  - **Tree page that updates itself** (P2-N037, specified)
    An open view page shows a plan change within 30 seconds without a reload, through one first-party script and a version route, and never replaces a form that holds typed text.
    after P2-N032
    Note: Slice A of docs/plans/view-that-leads-and-updates.md: section 3, criteria 1 to 4 and 6. Writes to majodali/project-orchestrator-service (RU-016); the owner merges there by hand and a merge deploys. Links no plan document because it edits none here.
  - **Four lists ahead of the tree** (P2-N038, specified)
    The view opens with what needs the owner, what is ready, what is running and what just finished, each decision answerable in its row, and every action button says what its click changes.
    after P2-N032
    Note: Slice B of docs/plans/view-that-leads-and-updates.md: sections 1 and 2, criteria 7 to 11. Writes to majodali/project-orchestrator-service (RU-016); the owner merges there by hand and a merge deploys. May run beside P2-N037; both edit src/view/html.ts and test/viewPages.test.ts, in different places. Links no plan document because it edits none here.
  - **Session, duration and criteria on pages** (P2-N039, specified)
    A task records the session that opened it, and the view shows each task's session and duration, each node's criteria from its documents, and the other nodes that link the same documents.
    after P2-N038
    Note: Slice C of docs/plans/view-that-leads-and-updates.md: sections 6 and 7, criteria 12 to 15 and 18. Waits for P2-N038, whose "Running" row shows the session. Writes to majodali/project-orchestrator-service (RU-016); the owner merges there by hand and a merge deploys. May run beside the panel slice: it edits the schema, nodePage.ts and taskPage.ts. Links no plan document because it edits none here.
  - **Feedback in place and the node panel** (P2-N040, specified)
    A submitted form shows its result on the page without a reload, the tab's title counts what needs the owner, and on a wide window a node opens in a panel beside the tree.
    after P2-N037, P2-N038
    Note: Slice D of docs/plans/view-that-leads-and-updates.md: sections 4 and 5, criteria 5, 16 and 17. Waits for P2-N037, whose script it extends, and P2-N038, whose rows it counts and opens. Writes to majodali/project-orchestrator-service (RU-016); the owner merges there by hand and a merge deploys. May run beside the session slice: it edits the script and src/view/html.ts. Links no plan document because it edits none here.
  - **View trial with its measured delay** (P2-N041, specified)
    A record in the service's runbook gives, for five plan changes on the deployed view, the time from commit to shown, and the number of GitHub reads one open tab causes in an hour.
    after P2-N039, P2-N040
    Note: Slice E of docs/plans/view-that-leads-and-updates.md: criteria 19 and 20, each met by its record (RU-019). Needs the four slices before it merged and deployed. Writes docs/runbook.md in majodali/project-orchestrator-service (RU-016); the owner merges there by hand. D086 is decided again from this record. Links no plan document because it edits none here.
  - **Session field adopted in this repository** (P2-N042, specified)
    This repository's pinned service version knows the task's session field, and docs/process/state-model.md describes it, so plan-state check accepts a state file that carries it.
    after P2-N039
    Note: Child F of docs/plans/view-that-leads-and-updates.md, Where the work happens. Writes here only: package.json and its lock file for the pin, and one line in docs/process/state-model.md. Criteria: npm run check and npm test pass on the new pin; state-model.md names the field and says who writes it. Needs P2-N039 merged in the service repository.
- **Rework cost measured against the reviews it replaces** (P2-N029, identified)
  The cost of each rework is set against the verifications and owner reviews it replaced, from the tasks' measured costs, so the owner sees whether longer runs of work without review pay.
  Note: The owner, 2026-11-17: pull reversibility forward from the P3 line. P3-N004 "Reversibility and its measurement" stays under the hold on P3-N001 until that line is re-planned; this node takes its measurement half onto the task loop. The data it needs now exists: a rework is its own task (an execute task on a node whose verification failed), and each task has a measured cost. Source for the argument: docs/plans/comprehension-and-continuous-implementation.md, Chunk 3. The plan step says what remains of P3-N004 once this node exists, and whether making work cheap to undo needs work of its own.

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
- D065 on P4-N008 (2026-11-12): Grant write access to majodali/methodology-tools for the pilot child (new to this project, RU-016)? Chosen: grant it, for the pilot node only
- D066 on P4-N008 (2026-11-12): Generate the Backlog from the state file (child 4), or drop docs/backlog.md after archiving? Chosen: generate it
- D067 on P4-N027 (2026-11-12): How does the service serve methodology-tools? Chosen: a second deployment of the service for that repository
- D068 on P4-N008 (2026-11-12): Add a node for the review's service findings (write speed, the journal's size, a write test in the deploy check)? Chosen: yes, one node under P2-N001, after milestone 6
- D069 on P4-N024 (2026-11-15): The mtool link check criterion of P4-N024 was not run, because mtool is not installed in the session's environment. How should it be met? Chosen: give the session a way to install mtool
- D070 on P4-N025 (2026-11-16): Orientation test, the owner's half: do you confirm from the view within one minute that 53 nodes are done, P4-N026, P4-N027 and P4-N031 are next, and only P3-N008 waits on you? Chosen: confirmed
- D071 on P4-N025 (2026-11-16): The service repository's docs/classification.md says its own Backlog becomes a rendering at milestone 6, but that repository has no state file. Reword that sentence to say its Backlog stays frozen and its nodes are in the coordinating repository's generated Backlog? Chosen: yes, reword it in a later node
- D072 on P4-N031 (2026-11-17): Pull request 58 adds a 'delegation brief' row to docs/vocabulary.md, citing the owner's ratification in conversation on 2026-11-17. The row is outside P4-N031's criteria and the reviewer could not confirm the ratification. Keep the row? Chosen: keep it
- D073 on P4-N032 (2026-11-17): `mtool links check` still exits non-zero on 8 links inside methodology text that archived proposals carry verbatim (RU-015). The verification read P4-N032's criterion as met by the stated disposition rule. Should the upstream proposals batch (P4-N026) ask methodology-tools for a way to exempt quoted upstream text, so the tool can exit zero over this tree? Chosen: yes, add it to P4-N026
- D074 on P2-N027 (2026-11-17): Which model runs the orchestrator session? Chosen: claude-sonnet-5
- D075 on P2-N027 (2026-11-17): When P2-N027 is done, remove P3-N015 and P3-N020, and make P3-N016 wait for P2-N027 instead of P3-N015? Chosen: yes
- D076 on P2-N027 (2026-11-17): Set a weekly limit on the measured cost of delegated tasks now? Chosen: no limit until the trial records a week's figure
- D077 on P4-N026 (2026-11-17): Ratify or strike the term 'criteria list', which proposal three introduces (a Specification given as a list of criteria, each one statement of an observable result that a reviewer judges met or unmet)? Chosen: ratify
- D078 on P4-N026 (2026-11-17): In which order do you carry the batch to majodali/methodology? Chosen: two and three first, then the release (one migration here, no deviation left)
- D079 on P4-N026 (2026-11-17): Add a node for migrating this repository's pin to the release that carries the K-003 amendment (declare the state file as the planning/execution model, end the K-003 deviation, adopt or deviate from the four other unreleased amendments)? P4-N026 does not cover it. Chosen: add a node, to start when the release is tagged
- D080 on P2-N027 (2026-11-17): Ratify the four terms the specification of P2-N027 introduces (snapshot, mark, pending start, acted file; docs/specs/orchestrator-session.md, Terms introduced)? Chosen: ratify all four
- D081 on P4-N038 (2026-11-17): Criterion 3: is the repository setting "Automatically delete head branches" on in majodali/project-orchestrator and in majodali/project-orchestrator-service? Head branches of pull requests 57 to 60 and 62 are already gone from this repository, and the service has no code that deletes a branch. Pull request 63 records the setting as the mechanism. Chosen: The owner turns the setting on in both repositories (or confirms it is on); the service is not changed
- D082 on P4-N038 (2026-11-17): The branch claude/relaxed-meitner-6i6cbh is left on this repository's remote. Its last pull request, 56, merged on 2026-11-17 and its tip is that merge commit. Delete it, with any merged branches left in the service repository? Chosen: Yes, the owner deletes them
- D083 on P4-N038 (2026-11-17): Criterion 4 asks for a trial: two tasks in a row from one session produce two branches, and the first is gone after its merge. A session delegated one task cannot run it, and it must leave no scratch node. Who runs it? Chosen: The delegating session records it from its next two real tasks that each carry a pull request, and the next execute task on P4-N038 writes it into the record
- D084 on P4-N038 (2026-11-17): Criterion 4: D083 chose the delegating session's next two tasks as the trial. It reported two earlier ones instead: T140 (pull request 52, from claude/zealous-einstein-1rw9kw, the branch that was reused for pull requests 49 to 57) and T144 (pull request 58, from a branch made for it). Both branches are gone now. Only the second shows the rule followed. Does this stand as the trial? Chosen: Yes: accept the record with its limits and tick criterion 4
- D085 on P2-N028 (2026-11-17): May the view run one script of its own, served from the view's origin, and may the test that asserts no script (test/viewPages.test.ts in the service repository) be rewritten to assert no inline and no third-party script? The rule "No script" is in the archived specification of P2-N003. Chosen: yes, one first-party script, with the test rewritten
- D086 on P2-N028 (2026-11-17): Should the view notify the owner outside its browser tab when something new waits on the owner? Chosen: no, the tab's title count only, and the orchestrator's report is the notice; decide again after the trial of criterion 19
- D087 on P2-N030 (2026-11-17): The decision script holds a verification back while another node has an open execute or planning task on the same plan document (specification S4, as written). S4's own reason, that a reviewer edits nothing, would let the verification start. Every P4 node links docs/plans/rebuild.md, so a verification there waits for any execute task on the line. Should a verify start be exempt from the shared-document rule? Chosen: exempt a verify start; P2-N031's task changes lib/orchestrate.ts and its test
- D088 on P2-N031 (2026-11-17): A report of open decisions has the key `report:<node>:<condition>:<reason>` (specification S1), so a new decision on a node already reported changes no key and does not wake the watcher (T159's finding). Adding the decisions' identifiers to the keys of `decision` and `asks` reports changes S1 and two expected keys in test/orchestrate.test.ts, which the plan does not name. Pull request 67 leaves the keys as they are; its acted file covers the case where the first decision is answered before the next is asked. Change the keys? Chosen: yes, in a new node after P2-N031, which also carries D087's change to lib/orchestrate.ts if the owner chooses it
- D089 on P2-N031 (2026-11-17): T161 found four places where .claude/agents/orchestrator.md leaves a cold session to guess: (1) it never says to give the background watcher the two-hour limit, and the default is 30 minutes, after which the command is stopped with no output, a case the role does not cover; (2) it does not say how the session learns its own identifier for --self; (3) it says both to tell results at each wake and to say nothing more at the time-limit wake; (4) it lists archive_session and never uses it. Fix these before P2-N033's trial? Chosen: yes, in a new node that P2-N033 waits for (the same node as D088's change, if the owner chooses that)
- D090 on P2-N036 (2026-11-18): Criterion 1 of P2-N036 (D088) makes the asks key `report:P1-N002:4:asks:D001`. One existing test in test/plan-watch.test.ts, "does not exit on a commit that adds no key, or only removes one", writes the old key `report:P1-N002:4:asks` to its acted file as setup and now fails. D088 clears only two expected keys in test/orchestrate.test.ts. May that test's constant ASKS_KEY follow the new key, with nothing else in it changed? Chosen: yes, change the constant ASKS_KEY to the new key in pull request 69
- D091 on P2-N032 (2026-11-18): Merge majodali/project-orchestrator-service#45 (vendors plugin/scripts/task_cost_hook.ts and plugin/scripts/lib/task-cost.ts there; a merge deploys the live service)? Chosen: merge it
- D092 on P2-N032 (2026-11-18): Merge majodali/project-orchestrator#71 (adds the vendoring generator in this repository)? Chosen: merge it
- D093 on P4-N044 (2026-11-18): Merge pull request #46 (the Backlog reader for plan-state import) in majodali/project-orchestrator-service? The merge deploys. The last section-1 criterion (moving this repository's pin in majodali/project-orchestrator) is a separate later task in a session started there. Chosen: merge it
- D094 on P2-N032 (2026-11-18): Criterion 13 needs a task_open/task_close round trip from a session started in majodali/project-orchestrator-service, but Claude Code's own auto-mode classifier blocks that write from an unsupervised session, including when the delegating session tries to pre-approve the tool for it. How should the trial proceed? Chosen: the owner runs the trial personally in such a session, approving the permission prompt in place
- D095 on P2-N032 (2026-11-18): After the scratch trial node (P2-N044) was added and removed under this task, P2-N032 is stage "broken-down" with no children, not "executing" as before. How should this be corrected? Chosen: the owner or the service corrects the stage directly
- D096 on P4-N048 (2026-11-18): Criterion 7 of section 1 ("the state file the reader produces passes plan-state check with no violations"): over methodology-tools' real Backlog the reader's output has 8 invariant-4 violations (P1-N001 title "Bootstrap" is 1 word; 7 done nodes have outcomes of 42 to 131 words), all taken verbatim from the rows, and the import record flags every one under "Titles to review" and "Outcomes over the forty-word bound". Does criterion 7 ask only that the reader's output over a well-formed Backlog be structurally valid, with methodology-tools' content violations left to child 2's overrides file (section 2: "Hand corrections are only in the overrides file, applied last"), or does it ask that methodology-tools' own Backlog import clean, which the reader cannot do without inventing shorter titles and outcomes? Chosen: the narrower reading: criterion 7 is met, and the 8 content violations are child 2's overrides file (P4-N045)
- D097 on P4-N044 (2026-11-18): Merge pull request #47 (rework of the Backlog reader) in majodali/project-orchestrator-service? The merge deploys. Separately, plan-state import --write throws ENOENT when the target repository has no orchestration/ directory yet (confirmed against a fresh checkout) — this will block P4-N045's real import of methodology-tools, which has no orchestration/ directory today. Not part of this node's criteria, so raised here rather than fixed silently. Chosen: merge PR #47; add a node for the ENOENT fix
- D098 on P4-N044 (2026-11-18): Criterion 8 of section 1 asks for tests over methodology-tools' Backlog as a fixture covering "the row count, the four open rows, and one malformed row that appears in the record as not mapped". The third clause presupposed that the two annotated rows ("Custom-type checker extension point", "W-008 bootstrap-cache drift check") were malformed; T174 found that presupposition wrong, and under the corrected shape methodology-tools' Backlog has no malformed row at all, so the fixture cannot carry one. T175 asserts the row count (21) and the four open rows on the fixture, and tests the exclusion path and its recorded reason on a synthetic two-row Backlog instead. I treated criterion 8 as met on that basis. Amend the plan's wording to match? Chosen: amend section 1's criterion 8 to read "the row count, the four open rows, and a malformed row that appears in the record as not mapped, on the fixture or on a synthetic row where the fixture has none"
- D099 on P4-N049 (2026-11-18): Does P4-N045 (methodology-tools' plan as a state file) wait for P4-N049, or does its session create methodology-tools' orchestration/ directory by hand? Chosen: P4-N045 waits for P4-N049: add P4-N049 to its after list, because P4-N045's criteria say the state file is the importer's output and the first arrival of orchestration/ there, and the fix is small
- D100 on P4-N049 (2026-11-18): Does P4-N049 start only on the owner's approval, since it writes to majodali/project-orchestrator-service? Chosen: keep start: auto: the node needs no owner action before the work, only the merge at the end, which every service pull request needs
- D101 on P2-N045 (2026-11-18): Section S7 of docs/specs/orchestrator-session.md asks the service repository's .claude/settings.json for one hook (PostToolUse on task_close), and that is what it carries; docs/process/how-we-work.md, Enlisting a repository, item 3 requires two, including plugin/scripts/session_start.ts, which is neither vendored nor registered there and which the generator does not vendor. session_start.ts reads origin/main:orchestration/state.json of the repository it runs in, which project-orchestrator-service does not carry, so a copy there would tell the session its brief could not be produced. Which document is amended? Chosen: amend how-we-work.md item 3 to require plugin/scripts/session_start.ts only in a repository that carries its own orchestration/state.json, and the cost hook in every enlisted repository
