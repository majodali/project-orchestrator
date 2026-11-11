# Plan register

Generated from `orchestration/state.json` by `plan-state render`. Do not edit by hand: edit the state file, or use the service's tools, and run `plan-state render --write`. `plan-state check` fails when this file differs from the rendering.

Instance of the *Plan register* type, defined by citation in the
[Classification](classification.md) ([type spec](process/plan-register.md)).
One line per node: identifier, stage, hold, title, documents.
Dependencies are in the state file, not in sibling order.

- P1-N001 [broken-down] Orchestrator v1: process specification and plugin — plan: plans/orchestrator-v1.md
  - P1-N002 [done] Repository bootstrap and founding plan
  - P1-N003 [done] Process specification v1
  - P1-N004 [done] Role contracts v1
  - P1-N005 [done] Plugin v1 and self-hosted trial
  - P1-N008 [done] Proposal: mtool checker extension point — plan: plans/p1-n008-mtool-checker-extension-point.md · spec: specs/p1-n008-mtool-checker-extension-point.md
  - P1-N009 [done] Plugin tooling on the portfolio stack — plan: plans/p1-n009-plugin-tooling-portfolio-stack.md · spec: specs/p1-n009-plugin-tooling-portfolio-stack.md
    - P1-N010 [done] Node toolchain and shared register grammar
    - P1-N011 [done] Conformance corpus and vendoring generator
    - P1-N012 [done] Form checker ported to TypeScript
    - P1-N013 [done] Cutover to the TypeScript tools
  - P1-N014 [done] Role contracts adopt the methodology's conduct rules — plan: plans/p1-n014-role-contracts-adopt-v140-rules.md · spec: specs/p1-n014-role-contracts-adopt-conduct-rules.md
  - P1-N015 [done] Methodology amendments for delegated multi-agent work — plan: plans/p1-n015-methodology-amendments-delegated-work.md · spec: specs/p1-n015-methodology-amendments-delegated-work.md
  - P1-N016 [done] Process specification maintenance — plan: plans/p1-n016-process-spec-maintenance.md
- P2-N001 [broken-down] Orchestration service — plan: plans/orchestration-service.md
  - P2-N002 [done] Service skeleton and plan state — plan: plans/p2-n002-service-skeleton.md · spec: specs/p2-n002-service-skeleton.md
    - P2-N007 [done] Service repository bootstrap
    - P2-N008 [done] Deployed MCP server (reachability slice)
    - P2-N009 [done] Plan state read
    - P2-N010 [done] Plan state update with advisory lease
    - P2-N011 [done] Git-only fallback and enlistment documentation
  - P2-N012 [done] Deploy from CI on merge — plan: plans/p2-n012-deploy-from-ci-on-merge.md · spec: specs/p2-n012-deploy-from-ci-on-merge.md
    - P2-N013 [done] Lambda alias assumptions check
    - P2-N014 [done] Pull request checks
    - P2-N015 [done] Alias-aware lease table selection
    - P2-N016 [done] Deploy, smoke test and promote pipeline
  - P2-N003 [broken-down] Owner questions and the plan view — plan: plans/p2-n003-owner-questions-and-plan-view.md · spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N021 [done] Web view v1 — spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N022 [identified] Owner question queue — plan: plans/p2-n022-owner-question-queue.md · spec: specs/p2-n003-owner-questions-and-plan-view.md
    - P2-N023 [done] Web view UX refinement — plan: plans/p2-n023-web-view-ux-refinement.md
  - P2-N006 [identified] Migration onto the service and pilot on methodology-tools
  - P2-N004 [identified] Coordination between enlisted sessions
- P3-N001 [broken-down] [blocked: Paused under the rebuild plan's decision 1 (D005) until milestone 6 re-plans the line] Project comprehension and continuous implementation — plan: plans/comprehension-and-continuous-implementation.md · spec: specs/p3-n001-comprehension-and-continuous-implementation.md
  - P3-N002 [broken-down] Comprehension model — plan: plans/p3-n002-comprehension-model.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N006 [done] Thin end-to-end slice of the model — plan: plans/p3-n006-thin-end-to-end-slice.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N007 [done] Project model type and K-003 amendment draft — plan: plans/p3-n007-type-declared-amendment-drafted.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N008 [planned] [gated: owner review of the plan] Project model instance for this repository — plan: plans/p3-n008-instance-over-this-repository.md · spec: specs/p3-n002-comprehension-model.md
    - P3-N009 [identified] Replacement of sibling ordering by recorded dependencies
  - P3-N003 [broken-down] Common risk catalogue — plan: plans/p3-n003-common-risk-catalogue.md · spec: specs/p3-n003-common-risk-catalogue.md
    - P3-N010 [done] First risk class end to end — plan: plans/p3-n010-one-class-end-to-end.md · spec: specs/p3-n003-common-risk-catalogue.md
    - P3-N011 [done] Catalogue sweep and omission list — plan: plans/p3-n011-sweep-and-omission-list.md · spec: specs/p3-n003-common-risk-catalogue.md
    - P3-N012 [identified] Article 8 amendment proposal
  - P3-N004 [identified] Reversibility and its measurement
  - P3-N005 [broken-down] Sequence mode — plan: plans/p3-n005-sequence-mode.md · spec: specs/p3-n005-sequence-mode.md
    - P3-N013 [done] Decidable stop conditions — plan: plans/p3-n013-stop-conditions-decidable.md · spec: specs/p3-n005-sequence-mode.md
    - P3-N014 [done] Sequence mode in the dispatch loop — plan: plans/p3-n014-loop-runs-sequence-mode.md · spec: specs/p3-n005-sequence-mode.md
    - P3-N015 [broken-down] Sequence mode demonstration — plan: plans/p3-n015-sequence-demonstration.md · spec: specs/p3-n005-sequence-mode.md
      - P3-N017 [done] Methodology citations pinned in the process specification — plan: plans/p3-n015-sequence-demonstration.md
      - P3-N018 [done] Anchors on Risk register entries — plan: plans/p3-n015-sequence-demonstration.md
      - P3-N019 [done] Checker extension-point proposal ready to carry — plan: plans/p3-n015-sequence-demonstration.md
      - P3-N020 [parked] Plugin tools tested as run — plan: plans/p3-n015-sequence-demonstration.md
    - P3-N016 [identified] Determination on W-001 sequence mode
- P4-N001 [broken-down] Rebuild: the orchestrator runs on a checked data model — plan: plans/rebuild.md
  - P4-N002 [done] Freeze and declare — plan: plans/rebuild.md
  - P4-N003 [done] State file and checker — plan: plans/rebuild.md
  - P4-N004 [done] View on the state file — plan: plans/rebuild.md
  - P4-N005 [done] Service writes the state file — plan: plans/rebuild.md
  - P4-N006 [done] Decisions answered in the view — plan: plans/rebuild.md
  - P4-N007 [verifying] [gated: The owner accepts milestone 5 after the week of real work through the loop: two sessions on different days move one node from specified to done] Minimal task loop — plan: plans/rebuild.md
  - P4-N008 [identified] Re-plan, prune and hand back — plan: plans/rebuild.md
  - P4-N010 [done] Task cost capture — plan: plans/rebuild.md
