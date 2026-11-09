# Plan register

Generated from `orchestration/state.json` by `plan-state render`. Do not edit by hand: edit the state file, or use the service's tools, and run `plan-state render --write`. `plan-state check` fails when this file differs from the rendering.

Instance of the *Plan register* type, defined by citation in the
[Classification](classification.md) ([type spec](process/plan-register.md)).
One line per node: identifier, stage, hold, title, documents.
Dependencies are in the state file, not in sibling order.

- P1-N001 [broken-down] Orchestrator v1: the process specification and the Claude Code plugin — plan: plans/orchestrator-v1.md
  - P1-N002 [done] The repository bootstrapped and the founding plan written
  - P1-N003 [done] The orchestration process specification, version 1
  - P1-N004 [done] The role contracts written, version 1
  - P1-N005 [done] The plugin built and tried on this repository
  - P1-N008 [done] mtool checker extension-point proposal — plan: plans/p1-n008-mtool-checker-extension-point.md · spec: specs/p1-n008-mtool-checker-extension-point.md
  - P1-N009 [done] Plugin tooling on the portfolio stack — plan: plans/p1-n009-plugin-tooling-portfolio-stack.md · spec: specs/p1-n009-plugin-tooling-portfolio-stack.md
    - P1-N010 [done] Node toolchain and the shared register grammar, proven by journal_tail
    - P1-N011 [done] The travelling package: conformance corpus, recorded expectations, vendoring generator
    - P1-N012 [done] The form checker on the shared unit, proven finding-for-finding
    - P1-N013 [done] The cutover: sync_agents ported, every invocation site moved, the Python retired
  - P1-N014 [done] Role contracts adopt the methodology's conduct rules — plan: plans/p1-n014-role-contracts-adopt-v140-rules.md · spec: specs/p1-n014-role-contracts-adopt-conduct-rules.md
  - P1-N015 [done] Methodology amendments for delegated, multi-agent work — plan: plans/p1-n015-methodology-amendments-delegated-work.md · spec: specs/p1-n015-methodology-amendments-delegated-work.md
  - P1-N016 [done] Process spec maintenance: branch lifecycle, PR citation, packet table — plan: plans/p1-n016-process-spec-maintenance.md
  - P1-N006 [identified] The pilot on a real project, superseded by the service's migration and pilot
  - P1-N007 [identified] Cost reporting and the founding plan's close-out
- P2-N001 [broken-down] Orchestration service: the MCP service and the web view — plan: plans/orchestration-service.md
  - P2-N002 [done] The service skeleton, and plan state read and updated through it — plan: plans/p2-n002-service-skeleton.md · spec: specs/p2-n002-service-skeleton.md
    - P2-N007 [done] The service repository bootstrapped and classified
    - P2-N008 [done] Reachability slice: a deployed MCP server a session can call
    - P2-N009 [done] Plan-state read through the GitHub App
    - P2-N010 [done] Plan-state update, git-authoritative, with the advisory lease
    - P2-N011 [done] Degrade to git-only, and enlistment documentation
  - P2-N012 [done] Deploy the service from CI on merge — plan: plans/p2-n012-deploy-from-ci-on-merge.md · spec: specs/p2-n012-deploy-from-ci-on-merge.md
    - P2-N013 [done] Alias assumptions verified against AWS documentation
    - P2-N014 [done] Pull-request checks that cannot deploy
    - P2-N015 [done] Alias-aware lease-table selection, failing closed
    - P2-N016 [done] Deploy, smoke and promote on merge to main
  - P2-N003 [broken-down] Owner questions and the plan view — plan: plans/p2-n003-owner-questions-and-plan-view.md · spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N021 [done] The web view's first version: the plan tree from commits, drilling to node and task — spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N022 [identified] The owner question queue: gate decisions answered in the web view, picked up through the task-pull loop — plan: plans/p2-n022-owner-question-queue.md · spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N023 [verifying] [gated: owner review at verifying, U1 on the owner's decision to end the loop at three iterations] Web view UX refinement: an owner-attended loop on the service repository until the view can replace docs/plan.md, at most ten iterations — plan: plans/p2-n023-web-view-ux-refinement.md
  - P2-N004 [identified] Topics for coordination between enlisted sessions
  - P2-N005 [broken-down] The task-pull loop: sessions claim tasks from the service — plan: plans/p2-n005-task-pull-loop.md · spec: specs/p2-n005-task-pull-loop.md
    - P2-N017 [identified] The platform facts, verified — plan: plans/p2-n017-platform-facts.md · spec: specs/p2-n005-task-pull-loop.md
    - P2-N018 [identified] The loop in git alone — spec: specs/p2-n005-task-pull-loop.md
    - P2-N019 [identified] Role-aware session identity for the service — spec: specs/p2-n005-task-pull-loop.md
    - P2-N020 [identified] The task tools of the service — spec: specs/p2-n005-task-pull-loop.md
  - P2-N006 [identified] This repository migrates onto the service, then the pilot runs on methodology-tools
- P3-N001 [broken-down] Project comprehension and continuous implementation — plan: plans/comprehension-and-continuous-implementation.md · spec: specs/p3-n001-comprehension-and-continuous-implementation.md
  - P3-N002 [broken-down] The comprehension model: resources, edges and renderings — plan: plans/p3-n002-comprehension-model.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N006 [done] The thin end-to-end slice: five real parts all the way through, and both renderings — plan: plans/p3-n006-thin-end-to-end-slice.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N007 [done] The type declared, the arguments written, the K-003 amendment drafted — plan: plans/p3-n007-type-declared-amendment-drafted.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N008 [planned] [gated: owner review of the plan] The instance, over this repository — plan: plans/p3-n008-instance-over-this-repository.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N009 [identified] Sibling ordering retired, and the checks that replace it
  - P3-N003 [broken-down] The common risk catalogue — plan: plans/p3-n003-common-risk-catalogue.md · spec: specs/p3-n003-common-risk-catalogue.md
    - P3-N010 [done] One class, carried end to end — plan: plans/p3-n010-one-class-end-to-end.md · spec: specs/p3-n003-common-risk-catalogue.md
    - P3-N011 [done] The sweep, the rest of the catalogue, and the omission list — plan: plans/p3-n011-sweep-and-omission-list.md · spec: specs/p3-n003-common-risk-catalogue.md
    - P3-N012 [identified] The Article 8 proposal, written IR first and reviewed
  - P3-N004 [identified] Reversibility, and the measurement that says whether it pays
  - P3-N005 [broken-down] Sequence mode: the loop runs W-001's pre-ratified mode — plan: plans/p3-n005-sequence-mode.md · spec: specs/p3-n005-sequence-mode.md
    - P3-N013 [done] The four stop conditions, decidable, evidenced, and related to the meta-review signals — plan: plans/p3-n013-stop-conditions-decidable.md · spec: specs/p3-n005-sequence-mode.md
    - P3-N014 [done] The loop runs sequence mode, and the roles meet the conditions without looking — plan: plans/p3-n014-loop-runs-sequence-mode.md · spec: specs/p3-n005-sequence-mode.md
    - P3-N015 [broken-down] The demonstration: a ratified sequence lands two chunks and stops on asks — plan: plans/p3-n015-sequence-demonstration.md · spec: specs/p3-n005-sequence-mode.md
      - P3-N017 [done] The process specification cites the methodology at its pin — plan: plans/p3-n015-sequence-demonstration.md
      - P3-N018 [done] Risk register entries can be linked one by one — plan: plans/p3-n015-sequence-demonstration.md
      - P3-N019 [done] The checker extension-point proposal is ready to carry — plan: plans/p3-n015-sequence-demonstration.md
      - P3-N020 [specified] The plugin tools are tested the way they run — plan: plans/p3-n015-sequence-demonstration.md
    - P3-N016 [identified] The determination on W-001, and the artifact or the argument
