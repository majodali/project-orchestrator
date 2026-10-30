# Project model: the slice of five resources

Reader: RD-4 in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session). It assumes the methodology at this project's
pinned version, 1.6.0 ([Classification](classification.md)), and the
[process specification](process/README.md).

This document is the slice that [node](process/README.md#def-node)
P3-N006 (the thin end-to-end slice) built. It holds five entries, one
per resource. It is not the populated instance. Node P3-N008 (the
instance over this repository) populates it.

## What this document does not claim

- No final grammar for these five entries. The type is declared: the
  [Classification](classification.md) lists this document as the
  instance of the [Project model type](process/project-model.md), its
  fifth custom definition. Node P3-N007 (the type declared, the
  arguments written, the K-003 amendment drafted) wrote both. The five
  entries predate the type's grammar. Node P3-N008 conforms them.
- No progress authority. Under [K-003 (the Backlog is the single source
  of progress
  truth)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth)
  as released at methodology 1.6.0, the [Backlog](backlog.md) is the
  referent for what is done and what is next. This is option (a) of
  decision 13 (whether this repository acts on the amended rule before
  its release) in the [specification of the comprehension
  model](specs/p3-n002-comprehension-model.md).
- No complete edge set. The entries hold only the edges that records of
  earlier nodes state. Edges of nodes now in flight are not here. Each
  `state:` line reads what the edges the entries hold give.

## How an entry reads

An entry is a second-level heading holding the resource's slug. A
[resource](plans/p3-n002-comprehension-model.md#two-entities-one-edge-kind)
is an abstract part of the project that nodes create, modify or use. A
slug is its stable name.

An entry carries five facets as labelled lines. A facet is one of the
five questions the entry answers:

- **is:** what the resource is.
- **state:** what state it is in.
- **spec:** the specification it must meet.
- **risks:** the risks attached to it.
- **created-by:**, **modified-by:** and **used-by:** what it depends on
  and what depends on it.

A line may hold several items, separated by ` · `. Each item ends with a
parenthetical that names its source documents after the word `from`. A
facet with nothing to state reads `none` and links the document where a
verifier confirms the absence. A node is written with its identifier and
a shortened name from the [Plan register](plan-register.md). A `state:`
line may carry a second item, the status the resource has in another
register. An optional **formerly:** line names a predecessor of the
resource.

The entry's reasoning is not here. The [slice
record](project-model-slice-record.md) holds it.

## form-checker

- **is:** The tool that enforces the Plan register grammar and the
  cross-register invariants. The Orchestrator runs it before every
  dispatch and at every acceptance. The entry point is
  `plugin/scripts/form_check.ts`. The checks are in
  `plugin/scripts/lib/form-check-core.ts`. It imports the grammar from
  [plan-register-grammar](#plan-register-grammar) (from
  [form_check.ts](../plugin/scripts/form_check.ts); [Backlog, entry for
  P1-N012](backlog.md); [Risk register](open-risks.md), R13 (the
  tooling's runtime assumption moves from python3 to node))
- **state:** built (derived from the stages of the nodes on the
  created-by and modified-by lines, all done; from [Plan
  register](plan-register.md))
- **spec:** [Plugin tooling on the portfolio stack,
  specification](specs/p1-n009-plugin-tooling-portfolio-stack.md) (node
  specification, closed; from [Backlog, entry for P1-N009](backlog.md))
  · [Auditing](process/auditing.md) (process specification; from
  [form_check.ts](../plugin/scripts/form_check.ts))
- **risks:** [R13](open-risks.md) (the tooling's runtime assumption
  moves from python3 to node; from [Risk register](open-risks.md))
- **created-by:** P1-N005 (Plugin v1 with self-hosted trial; created the
  Python form; from [Backlog, entry for P1-N005](backlog.md)) · P1-N012
  (The form checker on the shared unit; created the TypeScript form;
  from [Backlog, entry for P1-N012](backlog.md))
- **modified-by:** P1-N013 (The cutover; deleted the Python form and
  corrected the provenance comments in both TypeScript files; from
  [Backlog, entry for P1-N013](backlog.md))
- **used-by:** P1-N008 (mtool checker extension-point proposal; its
  criterion E5 (checks clean) requires the checker to pass; from
  [specification of
  P1-N008](specs/p1-n008-mtool-checker-extension-point.md)) · P1-N010
  (Node toolchain and the shared register grammar; ran the checker at
  every commit; from [Backlog, entry for P1-N010](backlog.md)) · P1-N011
  (The travelling package; ran the checker at every commit; from
  [Backlog, entry for P1-N011](backlog.md)) · P1-N014 (Role contracts
  adopt the methodology's conduct rules; its criterion G2 (the checker
  reports no violations) requires the checker to pass; from
  [specification of
  P1-N014](specs/p1-n014-role-contracts-adopt-conduct-rules.md)) ·
  P1-N015 (Methodology amendments for delegated, multi-agent work; its
  criterion G7 (checks clean) requires the checker to pass; from
  [specification of
  P1-N015](specs/p1-n015-methodology-amendments-delegated-work.md)) ·
  P2-N002 (Service skeleton and plan state; its criterion P2 (this
  repository is clean) requires the checker to pass; from [specification
  of P2-N002](specs/p2-n002-service-skeleton.md)) · P2-N009 (Plan-state
  read; compared the service's parser with the Python form on the live
  register; from [Backlog, entry for P2-N009](backlog.md)) · P2-N012
  (Deploy the service from CI on merge; its criterion P3 (this
  repository is clean) requires the checker to pass; from [specification
  of P2-N012](specs/p2-n012-deploy-from-ci-on-merge.md))
- **formerly:** `plugin/scripts/form_check.py`, the Python form, retired
  at P1-N013 (The cutover) (from [Backlog, entry for
  P1-N013](backlog.md))

## plan-register-grammar

- **is:** The one canonical implementation of the Plan register grammar
  and the node lifecycle stage vocabulary, in
  `plugin/scripts/lib/plan-register.ts`. It is one file with no imports
  and no input or output. It reports parse-level facts and carries no
  policy. The service repository holds a vendored copy (from
  [plan-register.ts](../plugin/scripts/lib/plan-register.ts); [Backlog,
  entry for P1-N010](backlog.md))
- **state:** built (derived from the stages of the nodes on the
  created-by and modified-by lines, all done; from [Plan
  register](plan-register.md))
- **spec:** [Plugin tooling on the portfolio stack,
  specification](specs/p1-n009-plugin-tooling-portfolio-stack.md) (node
  specification, closed; from
  [plan-register.ts](../plugin/scripts/lib/plan-register.ts)) · [Plan
  register type](process/plan-register.md) (process specification, the
  grammar; from
  [plan-register.ts](../plugin/scripts/lib/plan-register.ts)) · [Plan
  model](process/plan-model.md) (process specification, the stage
  vocabulary; from
  [plan-register.ts](../plugin/scripts/lib/plan-register.ts))
- **risks:** none (the [Risk register](open-risks.md) has no entry that
  names the grammar as at risk; from [Risk register](open-risks.md))
- **created-by:** P1-N010 (Node toolchain and the shared register
  grammar; from [Backlog, entry for P1-N010](backlog.md))
- **modified-by:** P1-N013 (The cutover; corrected the provenance
  comment that named the Python checker as current; from [Backlog, entry
  for P1-N013](backlog.md))
- **used-by:** P1-N011 (The travelling package; the vendoring generator
  carries the file and the corpus runs on it; from [Backlog, entry for
  P1-N011](backlog.md)) · P1-N012 (The form checker on the shared unit;
  imports `parseRegister` and `STAGES`; from [Backlog, entry for
  P1-N012](backlog.md)) · P2-N010 (Plan-state update; the service
  repository adopted the grammar by vendoring; from [Backlog, entry for
  the service-side adoption](backlog.md)) · the repository
  majodali/project-orchestrator-service (outside the Plan register: a
  consuming repository; it holds a vendored copy in
  `src/planRegister/vendored/`, kept in step by
  `plugin/scripts/sync_shared_unit.ts --check`; from [Backlog, entry for
  the service-side adoption](backlog.md); [RU-012 (how two repositories
  share one unit of code)](rulings.md))
- **formerly:** the service repository's `src/planRegister/parser.ts`
  and `types.ts`, merged and adapted into this file at P1-N010 (from
  [Backlog, entry for P1-N010](backlog.md);
  [plan-register.ts](../plugin/scripts/lib/plan-register.ts))

## run-journal

- **is:** The append-only feed of orchestration operation, one JSON
  event per line, in `orchestration/journal.jsonl`. It is telemetry and
  never authoritative. The Orchestrator writes it inside the acceptance,
  stage-change and gate commits it already makes (from
  [Observability](process/observability.md))
- **state:** built (derived from the stages of the nodes on the
  created-by and modified-by lines, all done; from [Plan
  register](plan-register.md))
- **spec:** [Observability](process/observability.md) (process
  specification) (from [Classification](classification.md), the Run
  journal definition)
- **risks:** none (the [Risk register](open-risks.md) has no entry that
  names the journal as at risk; from [Risk register](open-risks.md))
- **created-by:** P1-N005 (Plugin v1 with self-hosted trial; began the
  journal at enrollment; from [Backlog, entry for P1-N005](backlog.md))
- **modified-by:** none (appending events is the Orchestrator's standing
  act, not a node's work; a verifier confirms it in
  [Observability](process/observability.md), the write and read rules;
  from [Observability](process/observability.md))
- **used-by:** P1-N010 (Node toolchain and the shared register grammar;
  the `journal_tail` port reads the journal; from [Backlog, entry for
  P1-N010](backlog.md)) · P1-N012 (The form checker on the shared unit;
  the checker parses the journal and cross-checks it against the Plan
  register and the Cost log; from [Backlog, entry for
  P1-N012](backlog.md))

## RU-016 (repository reach)


- **is:** The ruling (RU-016, who decides which repositories a node's
  work may write to) that the Planner declares the repository access a
  node needs, in the node's plan. The Orchestrator grants it and records
  the grant. The owner is asked only when a repository is new to the
  project. The approved scope permanently includes
  majodali/project-orchestrator-service (from [Ruling
  register](rulings.md))
- **state:** built (derived from the stage of the node on the created-by
  line, done; from [Plan register](plan-register.md)) · own status
  active (from [Ruling register](rulings.md))
- **spec:** [Ruling register type](process/rulings.md) (process
  specification, the entry shape and the lifecycle of a ruling) (from
  [Classification](classification.md), the Ruling register definition)
- **risks:** none (the [Risk register](open-risks.md) has no entry that
  names the ruling; from [Risk register](open-risks.md))
- **created-by:** P2-N012 (Deploy the service from CI on merge; at its
  gate on 2026-09-01, by the owner's decision and not by a task's work;
  from [Ruling register](rulings.md), the Source field of RU-016)
- **modified-by:** none (a ruling is append-only: it is superseded,
  never edited; a verifier confirms it in [Ruling register
  type](process/rulings.md), the entry shape; from [Ruling register
  type](process/rulings.md))
- **used-by:** P3-N001 (Project comprehension and continuous
  implementation; task T039 (the specify task of P3-N001) applied it;
  from [Ruling register](rulings.md), the Applied field of RU-016; [Cost
  log](cost-log.md), the row of T039) · P3-N002 (The comprehension
  model; task T043 (the specify task of P3-N002) applied it; from
  [Ruling register](rulings.md), the Applied field of RU-016; [Cost
  log](cost-log.md), the row of T043)

## project-orchestrator-repo

- **is:** This repository, majodali/project-orchestrator, the
  coordinating repository of the orchestration project. It holds the
  process specification, the registers, the plugin and the role
  contracts. It is classified C1 / S0 / component/library (from
  [README](../README.md); [Classification](classification.md))
- **state:** built (derived from the stages of the nodes on the
  created-by and modified-by lines, all done; from [Plan
  register](plan-register.md))
- **spec:** [Classification](classification.md) (the binding declaration
  the repository must match; from [Classification](classification.md)) ·
  [Process specification](process/README.md) (process specification;
  from [README](../README.md))
- **risks:** none (the [Risk register](open-risks.md) has no entry that
  names the repository as at risk; from [Risk register](open-risks.md))
- **created-by:** P1-N002 (Bootstrap and founding plan; from [Backlog,
  entry for the bootstrap](backlog.md))
- **modified-by:** P1-N005 (Plugin v1 with self-hosted trial; enrolled
  the repository for orchestration; from [Backlog, entry for
  P1-N005](backlog.md)) · P1-N009 (Plugin tooling on the portfolio
  stack; its plan scopes the node to this repository only; from [plan of
  P1-N009](plans/p1-n009-plugin-tooling-portfolio-stack.md), the section
  Scope: this repository only) · P1-N014 (Role contracts adopt the
  methodology's conduct rules; changed `docs/process/` and the six role
  contracts; from [Backlog, entry for P1-N014](backlog.md)) · no record
  before RU-016 (2026-09-01) names the repository a node wrote, so this
  list is partial (from [Ruling register](rulings.md), RU-016
  (repository reach))
- **used-by:** P2-N009 (Plan-state read; reads this repository's Plan
  register at a pinned commit; from [plan of
  P2-N002](plans/p2-n002-service-skeleton.md), decision 4 (the scope of
  plan state in chunk 1); [Backlog, entry for P2-N009](backlog.md)) ·
  P2-N010 (Plan-state update; its edits are committed here; from [plan
  of P2-N002](plans/p2-n002-service-skeleton.md), decision 4 (the scope
  of plan state in chunk 1); [Backlog, entry for P2-N010](backlog.md))
