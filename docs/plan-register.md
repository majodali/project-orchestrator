# Plan register

Instance of the *Plan register* type, defined by citation in the
[Classification](classification.md)
([type spec](process/plan-register.md)). Single writer: the
Orchestrator role. Sibling order is dependency order; node IDs are
stable forever. Stages predating enrollment reflect current state
honestly; chunks 1–3 completed before this register existed.

- P1-N001 [broken-down] Orchestrator v1 — plan: plans/orchestrator-v1.md
  - P1-N002 [done] Bootstrap and founding plan (chunk 1)
  - P1-N003 [done] Process specification v1 (chunk 2)
  - P1-N004 [done] Role definitions v1 (chunk 3)
  - P1-N005 [done] Plugin v1 with self-hosted trial (chunk 4)
  - P1-N008 [done] mtool checker extension-point proposal — plan: plans/p1-n008-mtool-checker-extension-point.md · spec: specs/p1-n008-mtool-checker-extension-point.md
  - P1-N009 [done] Plugin tooling on the portfolio stack — plan: plans/p1-n009-plugin-tooling-portfolio-stack.md · spec: specs/p1-n009-plugin-tooling-portfolio-stack.md
    - P1-N010 [done] Node toolchain and the shared register grammar, proven by journal_tail
    - P1-N011 [done] The travelling package: conformance corpus, recorded expectations, vendoring generator
    - P1-N012 [done] The form checker on the shared unit, proven finding-for-finding
    - P1-N013 [done] The cutover: sync_agents ported, every invocation site moved, the Python retired
  - P1-N014 [planned] [gated: held pending the methodology-amendment work the owner opened 2026-08-31] Role contracts adopt the v1.4.0 conduct rules — plan: plans/p1-n014-role-contracts-adopt-v140-rules.md
  - P1-N015 [verifying] [gated: owner gate at verifying, RU-005 — the owner reads the proposals before they represent the project] Methodology amendments for delegated, multi-agent work — plan: plans/p1-n015-methodology-amendments-delegated-work.md · spec: specs/p1-n015-methodology-amendments-delegated-work.md
  - P1-N006 [identified] Pilot on a real project (chunk 5) — superseded in place by P2-N001 chunk 5; kept until the founding plan closes out
  - P1-N007 [identified] Cost reporting v1 and close-out (chunk 6)
- P2-N001 [broken-down] Orchestration service — plan: plans/orchestration-service.md
  - P2-N002 [broken-down] Service skeleton and plan state (chunk 1) — plan: plans/p2-n002-service-skeleton.md · spec: specs/p2-n002-service-skeleton.md
    - P2-N007 [done] Service repository bootstrap
    - P2-N008 [done] Reachability slice: a deployed MCP server a session can call
    - P2-N009 [done] Plan-state read
    - P2-N010 [identified] Plan-state update, git-authoritative, with the advisory lease
    - P2-N011 [identified] Degrade to git-only, and enlistment documentation
  - P2-N003 [identified] Owner questions and the plan view (chunk 2)
  - P2-N004 [identified] Topics and coordination (chunk 3)
  - P2-N005 [identified] The task-pull loop (chunk 4)
  - P2-N006 [identified] Migration and pilot (chunk 5)
