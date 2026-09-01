# Backlog

<!-- The single source of progress truth (methodology K-003): one
     dependency-ordered register of completed and upcoming work. Rewrite
     checked entries to describe what actually shipped — the completed
     section doubles as the implementation map. Update in the same commit
     as the work (W-003). -->

## Completed

- [x] **Bootstrap and founding plan drafted** — methodology
  scaffolding (README, [Classification](classification.md) C1 / S0 /
  component/library / none-local, pinned v1.2.0; Binding block in
  `CLAUDE.md`) and the founding plan
  [orchestrator-v1](plans/orchestrator-v1.md), status `draft`,
  awaiting the owner's chunk-boundary review (W-001 gate; chunk 1 of
  the plan).
- [x] **Founding plan revised at owner review** — subscription-billing
  constraint verified against current Anthropic policy (Agent SDK /
  headless use under subscription auth included; June 2026 credit-pool
  change paused; `ANTHROPIC_API_KEY`-precedence trap recorded as a
  MUST-check) and the owner's rulings recorded: Backlog stays the
  execution source of truth with the plan register making hierarchy
  explicit, and multi-repo projects follow a designated
  coordinating-repo model headed for the methodology's next update
  ([plan](plans/orchestrator-v1.md), design rulings 1–2).

- [x] **Process specification v1** — [docs/process/](process/README.md)
  written and the plan flipped `active` at the owner's go-ahead:
  [plan-model](process/plan-model.md) (hierarchy, node lifecycle,
  Backlog relationship per owner ruling 1),
  [plan-register](process/plan-register.md) (register format,
  single-writer rule, Article 7 custom-definition mechanics),
  [dispatch](process/dispatch.md) (loop, judgment routing, handoff
  contract, context packets, v1 trigger surfaces and gates),
  [profiles](process/profiles.md) (C-tier profile table, C2/C3 rows
  provisional), [cost-log](process/cost-log.md) (per-task record).
  **Gate pending: owner review of the spec documents** (plan
  chunk 2).
- [x] **Chunk-2 review revisions** — owner-approved 2026-08-24:
  features formalized in [plan-model](process/plan-model.md) (a
  feature defined informally as cohesive validated behavior and
  formally as its validating functional-test set; monotonicity
  redefined over functional tests; planned vs. unplanned
  non-monotonicity made independent, with W-002 routed to the
  approving gate or to the owner respectively; feature-first
  decomposition guidance, no feature inventory kept);
  [auditing](process/auditing.md) added (deterministic form checks as
  a project-shipped checker run at dispatch/acceptance and on changed
  days — transitional until the `mtool` custom-type checker extension
  point — semantic checks as sparse Auditor agent tasks); the
  Workflow-as-lifecycle SHOULD retained with its audit-dividend
  rationale.

- [x] **Role definitions v1** — [roles.md](process/roles.md): the
  five roles as contracts (serves / decides / routes / produces),
  each a refinement of the methodology's role set with the Human
  owner unchanged; the model-tier mapping in one place (frugal
  `claude-haiku-4-5` · standard `claude-sonnet-5` · advanced
  `claude-opus-5`, owner may designate stronger per node); exhaustive
  decides-lists backing dispatch's `needs-judgment` rule; the
  Auditor's `mtool` compliance contract; per-project customization
  bounds (tier raises free, high-judgment tier lowering is a recorded
  deviation). No methodology amendment proved necessary — refinements
  stay within the vocabulary's role definitions, and sharing rides
  the staged v1.3.0 machinery. **Gate pending: owner review** (plan
  chunk 3).

- [x] **Migrated to methodology v1.3.0** — released and tagged by the
  owner 2026-08-25; pin and Binding block bumped (migration notes:
  none for all four amendments, so the bump is the whole migration).
  The Classification declares **Family**: methodology (member), lead
  github.com/majodali/methodology — composition ratified 2026-08-24,
  reciprocated by the lead's Portfolio Families section. The
  custom-definition mechanics in
  [plan-register](process/plan-register.md) and
  [cost-log](process/cost-log.md) reworded onto Article 7's
  definition-by-citation mechanism: managed projects adopt both types
  by pure citation to this spec, which remains authoritative (family
  cohesion).
- [x] **Failure detection and observability** — from the owner's
  chunk-3 review questions: the [Risk register](open-risks.md)
  adopted (K-005 pressure) and seeded with eight orchestration
  failure modes (R1–R8), each citing its spec-level containment;
  [observability.md](process/observability.md) added — the run
  journal (`orchestration/journal.jsonl`, telemetry never truth,
  flushed inside existing Orchestrator commits, session IDs as
  drill-down keys, JSONL as the extraction interface); dispatch
  gained failure containment (bounded attempts, no silent drops,
  stale tasks, scope budgets), the Reviewer an authority check on
  diffs, auditing the liveness and journal cross-check invariants,
  plan-model the thin-slice-first breakdown guidance.

- [x] **Plugin v1 built and repo enrolled self-hosted** (node
  P1-N005, `executing` until the demo gate) — the `orchestrator`
  plugin under [plugin/](../plugin/README.md), installable via the
  repo's marketplace file: six role agents pinned to the spec's tier
  models (orchestrator/haiku dispatch loop spawning
  planner/opus, implementer/sonnet, reviewer/opus, auditor/haiku,
  semantic-auditor/opus), skills `orchestrate` · `enroll` ·
  `journal-tail`, `form_check.py` mechanizing the
  [auditing](process/auditing.md) invariants (first run caught four
  real backlog-ref gaps — fixed in this commit), `journal_tail.py`,
  and the SessionStart billing check (R7). Self-hosted enrollment:
  Classification citations, [Plan register](plan-register.md) seeded
  P1-N001–N008, [Cost log](cost-log.md), journal begun. Demo-gate
  finding: `/plugin` is terminal-only, so web/cloud enablement is by
  checked-in `.claude/settings.json` (marketplace + enabledPlugins;
  added here, and to the enroll skill for managed projects). Second
  demo-gate finding: the settings-declared plugin did not observably
  load in a web session (docs silent — [Risk R9](open-risks.md)):
  marketplace source switched to `github`, and the role agents
  mirrored to `.claude/agents/` (documented to load unconditionally
  in cloud) via `sync_fallback.py` with a `--check` drift mode.
  Trial 1 (web session, 2026-08-25) exercised the fallback end to
  end and its findings were applied: hold markers
  (`[gated: ...]`/`[blocked: ...]`) added to the Plan register type
  and the checker's liveness grew all four arms (finding 1);
  orchestrate gained the surface fallback for cloud's missing nested
  dispatch, with the tier deviation visible in the Cost log
  (finding 2, R9 extended); the dispatch dependency default defined
  (finding 3); the plan/specify packet rows widened to whole
  documents (finding 4, an R6 detection working); surface-mandated
  session branches recognized under W-006; the model-IDs-are-data
  ruling recorded in the Cost log spec. Trial work on the unpushed
  session branch was not merged; T001 remains live in the design
  session. **Demo gate accepted by the owner 2026-08-26** (node
  P1-N005 `done`): four trials across web and local surfaces
  exercised the plugin, checker, journal, Ruling register and every
  containment mechanism end to end, completing P1-N008's full node
  lifecycle. At the same gate [R9](open-risks.md) was closed by
  ruling — **`.claude/agents/` is primary** (the path that actually
  loads on every surface) and the plugin package is now generated
  from it by `plugin/scripts/sync_agents.py`, renamed and reversed
  from the former fallback mirror.

- [x] **Liaison role and parallel dispatch** (owner review of
  trial 1, round 2) — the **Liaison** role added to
  [roles.md](process/roles.md): the owner-facing session role with a
  tight communication contract (lead with outcome, no narration,
  hand the owner over to role sessions for working conversations)
  and the local/web surface mapping (local: Liaison dispatches the
  frugal Orchestrator agent; web: one session serves Orchestrator +
  Liaison, Sonnet recommended, delegating mechanical batches per the
  new delegation-within-the-role clause — an admin-assist role split
  deliberately deferred until pilot data shows the boundary).
  Parallel dispatch permitted when independence is a
  gate-approved planning product
  ([dispatch.md](process/dispatch.md)). Trial-1 work products
  abandoned per owner ruling (nothing was pushed; P1-N008 stays
  `identified` for a clean pass).

- [x] **Owner-decision economics and the quiet loop** (owner review
  of trial 2) — [dispatch.md](process/dispatch.md) gains the
  owner-decision economics section (mandatory defaults on every
  routed decision; batching at gates with adopt-by-default
  go-ahead; exactly four immediate-escalation classes; findings to
  registers, never chat; standing pre-authorizations in scope
  grants; cross-repo reach as named scope) and the fixed
  gate-summary template; the Liaison gains the quiet-loop rule; the
  Planner's plans collect a "Decisions for the gate" section with
  defaults; agents and skill updated to match. Trial-2's confirmed
  R6 recurrence repaired (process-spec profiles/plan-model routed
  into the plan/specify packets). Trial-2 work products abandoned
  per owner rerun ruling — branch `claude/p1-n008-orchestration-tpo5hb`
  left unmerged for deletion; P1-N008 stays `identified` on this
  branch for the clean rerun.

- [x] **Trial-3 review: latency diagnosis and gate polish** — the
  run journal's timestamps split trial 3's ~40 minutes into a
  healthy 10-minute loop (two ~3-minute Planner runs, ~1-minute
  acceptances) and a ~30-minute pre-dispatch orientation phase: the
  Orchestrator gave itself an unbounded packet (18 files) and a
  timer detour. Fixes: the Orchestrator's own minimal working set
  spec'd (register + Backlog + dispatch.md, further reads journaled
  as its own packet-widening; no timers or polling, ever); gate
  template gains the Detail line and the every-decision-numbered
  rule (minor calls batched as one entry), and Costs gains per-task
  wall-clock from journal timestamps; third R6 firing repaired
  (base packet gains the whole Backlog; plan packet gains
  dispatch.md's owner-decision-economics section).

- [x] **Ruling register — precedents from gate decisions** (owner
  direction, 2026-08-25) — [rulings.md](process/rulings.md): gate
  decisions classified by type (handoff/tier/completion/scope/
  verification/comms) and scope (node/project/process), captured at
  every gate crossing (overrides especially), applied silently on
  exact match (journaled `precedent-applied`, one summary line),
  cited by the Planner on near match, and promoted on recurrence —
  project-scope at three applications, process-scope on capture —
  into the spec, with cross-project convergence and
  methodology-boundary patterns following the Article 7/8 paths.
  Precedents never decide the immediate class. Wired through
  dispatch, roles, observability (`precedent-applied` event),
  checker, enroll skill, and agents; this repo's instance
  [docs/rulings.md](rulings.md) created, first entries due at the
  pending P1-N008 gate.

- [x] **`mtool` custom-type checker extension-point proposal drafted
  and approved** (node P1-N008, `done`) — planned and specified by
  trial 3's orchestrated run
  ([plan](plans/p1-n008-mtool-checker-extension-point.md) ·
  [spec](specs/p1-n008-mtool-checker-extension-point.md), 22
  criteria); specify-stage gate crossed 2026-08-26 with all five
  decisions adopted and captured as [rulings](rulings.md)
  RU-001–RU-005 (conformance sketch only, node completes at the
  artifact, owner hand-carries the proposal to methodology-tools,
  owner gate at `verifying`). Executed:
  [docs/proposals/mtool-custom-type-checker.md](proposals/mtool-custom-type-checker.md)
  — a transportable, standalone proposal to methodology-tools arguing
  one generic capability (a defining project declares a checker
  alongside an Article-7 custom type; `mtool audit form` resolves the
  citation to it, runs it, and folds its findings into the standard
  audit); five design questions (discovery, execution and trust,
  finding schema, versioning, unavailability) each with a
  recommendation and trade-off; this project's own form checker
  offered as dated, honestly-statused evidence (self-hosted only,
  chunk-4 demo gate still pending as of writing); an illustrative,
  non-runnable conformance sketch; and an explicit ask covering
  acceptance, amendment, and rejection. `docs/process/auditing.md`'s
  "intended end-state" section repointed to the drafted proposal in
  the same commit, its stale forward-looking sentence removed. Stays
  `draft`: nothing delivered, no code in `plugin/` touched, no local
  checker/invariant/role-contract changed, no cross-repo reach taken.
  The `verifying` gate crossed 2026-08-26 on the owner's review of the
  artifact against the judgment-shaped criteria (problem framing,
  capability contract, design-question quality, evidence honesty,
  transportability).

- [x] **Trial 4 (local session) and its analysis** — P1-N008 run
  through `execute` → `verifying` → `done` in a local terminal
  session: the first complete node lifecycle, and the
  [proposal](proposals/mtool-custom-type-checker.md) drafted (299
  lines). Journal analysis: the **Ruling register's first live
  exercise** — RU-001/003/004 decided the execute dispatch silently
  (three `precedent-applied` events, a near-empty gate); their
  Applied lists were not maintained, so `form_check.py` now
  cross-checks `precedent-applied` events against the register
  (undefined ruling, superseded ruling, unrecorded application),
  which caught all three gaps on its first run. **Latency finding**:
  T004 showed 1h51m elapsed for ~68k tokens and 26 tool calls
  against 3–3.5 min for the web Planner tasks — attended-surface
  permission-prompt waiting, not model latency; observability and
  cost-log specs now say wall-clock is attended time and dispatched
  role sessions SHOULD run in a mode that does not gate in-scope
  tool calls. Also applied: session-end `stale` rule for open tasks;
  execute packet row widened to repository metadata (fourth R6
  firing); R9 updated — the plugin did not load locally either, so
  the `.claude/agents/` mirror is the path that has actually run in
  all four trials.

- [x] **Orchestration-service plan drafted** (node P2-N001) — four
  trials established that the v1 process works and that two things do
  not, structurally: agent-to-owner communication (noise bounded by
  the surface's interactive style) and coordination (sessions cannot
  see each other, so no live plan view and no way to know a sibling is
  blocked on the owner). Two alternatives were weighed and rejected at
  the owner's review 2026-08-26 — keep tuning the spec (the ceiling is
  the surface), and a standalone Agent-SDK engine (re-hosts
  everything, and the SDK documents API-key auth while subscription
  OAuth is restricted to Claude Code and Claude.ai, so its inference
  would bill API credits against standing constraint 2). The chosen
  shape inverts control: an **orchestration service** that Claude Code
  sessions in any environment call over MCP, enlisted by a checked-in
  `.mcp.json`, holding live plan state, project topics, and the
  owner-question queue, and publishing a plan view — with all
  inference staying inside subscription-billed sessions
  ([plan](plans/orchestration-service.md), status `draft`; five
  proposed chunks; four decisions with defaults awaiting the owner).
  Standing constraints: git remains authoritative and the service is a
  projection; the service holds the write lease; work degrades to
  git-only when the service is down; no server-side spawning (owner
  ruling — multiple live role sessions plus a **task-pull loop**
  instead, since more concurrent agents cost more attention than they
  save). Risks [R10–R12](open-risks.md) opened; the founding plan's
  chunk-5 pilot and chunk-6 runtime assumptions marked superseded
  (K-007).

- [x] **Service plan approved and broken down** (node P2-N001) — the
  owner created
  [majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service)
  and adopted all four defaults 2026-08-26: new repo at S1 /
  serverless-aws with this repo coordinating; the five proposed chunk
  boundaries; C2 promotion of this repo when chunk 5 begins; the
  founding plan kept active through its chunk-4 close-out. The
  [plan](plans/orchestration-service.md) is `active` and broken down
  into P2-N002–N006; rulings [RU-006 and RU-007](rulings.md) captured
  from the recurring decisions (the one-off boundary and disposition
  calls were not recorded, per the register's own rule).

- [x] **Migrated to methodology v1.4.0** — 2026-08-30; migration
  notes none mandatory, so the pin bump is the whole migration. The
  P- prose rules and W-008 report contract now bind this project's
  sessions; role contracts may inherit W-008 verbatim (queued).

## Upcoming

- [ ] **Service chunk 1 — skeleton and plan state** (node P2-N002) —
  repository bootstrap and Classification for
  project-orchestrator-service, a deployed MCP service exposing
  plan-state read/update, `.mcp.json` enlistment proven from a web
  and a local session against this repo, and the degrade-to-git-only
  fallback exercised (R12). Planned as an interior node
  ([plan](plans/p2-n002-service-skeleton.md), five proposed children
  led by a reachability slice) and specified
  ([spec](specs/p2-n002-service-skeleton.md): the breakdown stands,
  with integration criteria built around one gate demonstration — a
  session enlisted only by the checked-in `.mcp.json` reads the real
  register and moves a real node, and the change lands as an ordinary
  commit readable with the service switched off; twelve decisions with
  defaults now awaiting the owner): git stays the only writer of
  state — the service
  validates a transition and returns the exact register edit, the
  session commits it, the service verifies at the SHA and updates its
  projection. Deployment is an owner action (no AWS credentials in
  agent sessions); the rest is buildable and verifiable against a
  locally run instance
  ([parent plan](plans/orchestration-service.md)).
- [x] **Chunk-1 child: service repository bootstrap** (node P2-N007,
  `done`) — project-orchestrator-service enrolled as a methodology
  project (C1 / S1 / backend-service / serverless-aws, v1.3.0, family
  `methodology`; coordinating repo named in prose per the multi-repo
  caveat; Plan register, Cost log and Ruling register cited to this
  repo's instances per decision 2) with its own Backlog. TypeScript/
  Node skeleton (ESLint flat config, Prettier, Vitest) builds, tests
  and lints clean — independently re-verified at acceptance, and the
  pushed `main` SHA confirmed against the remote. Secret-hygiene
  baseline in place; a pattern scan over full history found nothing.
  Initial commit `775842c` on `main` (empty-repo exception to W-006,
  recorded). **Two open items carried into child B**: the `mtool`
  form audit and link check could not run (no `mtool` in dispatch
  environments), so that criterion is deferred to the Auditor's
  standing changed-day duty rather than silently closed; and the new
  Classification's cross-repo links point at `blob/main/` in this
  repo, which has no `main` — they dangle until repaired
  ([plan](plans/p2-n002-service-skeleton.md) ·
  [spec](specs/p2-n002-service-skeleton.md)).
- [x] **Chunk-1 child: reachability slice** (node P2-N008, `done`)
  — delivered in the service
  repo on branch `p2-n008-reachability-slice` (`fa3e979`): an MCP
  server over streamable HTTP (`@modelcontextprotocol/sdk` + Hono)
  exposing one `service_identity` tool, bearer-token auth that fails
  **closed** when unconfigured, one Hono app wrapped by both a local
  server and a Lambda handler so the two cannot drift, a SAM template
  (Lambda + HTTP API, auth token by Secrets Manager dynamic reference,
  never a literal), `scripts/deploy.sh`, `docs/runbook.md` written
  before any owner action is requested, and a documented `.mcp.json`
  template with an explicit 30s timeout (the MCP default of 5s is too
  low) — the template this repo's committed `.mcp.json` was filled in
  from. 15 tests pass; build and lint clean; `sam validate
  --lint` and `sam build` succeed. Independently re-verified at
  acceptance over real HTTP: 401 unauthenticated, 401 on a wrong
  token, and a real MCP `initialize` handshake with a valid one.
  Operational discovery kept in the repo README: `esbuild` must sit
  in `dependencies`, not `devDependencies`, or SAM's isolated build
  sandbox cannot see it.
  **Deployed 2026-08-27** to `us-west-2`. The first deployment
  answered 404 on every path: a named API Gateway stage sends
  `rawPath=/prod/health` while Hono registers `/health`. Repaired in
  T009 by pinning `StageName: "$default"` (the project's first
  recorded backward transition, `verifying` → `executing`), with
  three regression tests over real API Gateway v2 event shapes.
  Re-verified live from a cloud session after redeploy: `/health`
  200 (cold 1.81s, warm 0.58s — G7's numbers, now real), `/mcp` 401
  unauthenticated and 401 on a wrong token, `/prod/health` 404
  (the stage prefix is gone). The enlistment file `.mcp.json` is now
  committed here, pointing at the live endpoint, carrying the token
  as `${MCP_AUTH_TOKEN}` expansion rather than a literal and an
  explicit 30s timeout; `.claude/settings.json` sets
  `enableAllProjectMcpServers` so sessions load it without an
  interactive approval. **Web-surface enlistment proven** the same
  day: this cloud session picked the server up from `.mcp.json`,
  Claude Code surfaced `mcp__project-orchestrator__service_identity`,
  and calling it returned `{service: project-orchestrator-service,
  version: 0.1.0, commit: bad6abd, project: majodali/project-orchestrator}`
  — no curl, no hand-set header, the harness's own MCP client against
  the deployed endpoint. The owner then reached the service the same
  way from a local session, closing the second half of I6 and the
  node. Verification here was attended (owner plus
  Orchestrator) rather than dispatched to the Reviewer role: the
  criteria are live demonstrations on two surfaces, one of which only
  the owner's machine can perform, so a subagent could not have
  judged them.
- [x] **Service repo lint hygiene: ignore `.aws-sam/`** (`done`) — the
  service repo's `eslint.config.js` ignored `dist`, `node_modules` and
  `coverage` but not `.aws-sam/`, so `npm run lint` failed after a
  `sam build` unless the artifact was deleted first. Found and worked
  around during T009; assigned 2026-09-01 to P2-N012's child B. **The
  assignment was made against a stale reading of the service
  repository, and this entry with it** (K-011, marked rather than
  quietly rewritten): the P2-N010 outage rework had already added
  `.aws-sam/**` and `dist-lambda/**` to `eslint.config.js` and to
  `.gitignore` at T025, before this node existed. T031 checked the
  file rather than trusting the brief that repeated this entry's
  claim, and said so. What it actually closed was the remaining half:
  `.prettierignore`, which listed neither. The lesson is the entry's,
  not the role's — a Backlog item describing another repository's
  state goes stale silently, and nothing here re-reads it.
- [x] **Chunk-1 child: plan-state read** (node P2-N009, `done`)
  — delivered in the service
  repo on branch `p2-n009-plan-state-read` (`cd67d75`, five commits):
  a register parser implementing the grammar of
  [plan-register.md](process/plan-register.md) into structured nodes
  (ID, title, stage, hold marker kind and reason, plan/spec links,
  parent/child edges from list nesting); a `plan_read` MCP tool whose
  every response carries the ref, the resolved commit SHA and the
  fetch time as non-optional fields (I5); whole-tree and subtree
  queries; a GitHub App fetch boundary (App JWT → installation token
  → ref resolved to a SHA → content pinned to that SHA) behind an
  injectable interface so the parser and the tool contract test
  without the credential. `src/` contains no filesystem read and one
  production fetcher, so no code path in the Lambda bundle can answer
  a plan-state question from local disk or an unauthenticated URL —
  the I5 second-source hazard is structurally absent, not merely
  avoided. Orchestrator re-verified independently: 60/60 tests (the
  18 pre-existing unaltered), build and lint clean; the parser run
  against the live register returns 19 nodes and 0 errors, agreeing
  exactly with `form_check.py`; hold markers, links and hierarchy
  round-trip; malformed node-like lines are reported with line number
  and raw text rather than dropped; subtree queries return exactly
  the subtree and `null` for an unknown ID; no key material anywhere
  in the tree. **Blocked**: the criterion "a session reads P2 nodes
  and their stages through it" against the *deployed* service, and
  the cold/warm latency row, both need owner action O3 (create and
  install the GitHub App, store its private key) followed by a
  redeploy. The runbook gained O3 as Step 2 and introduces no owner
  action outside O1–O6 (I8). **Closed 2026-08-30**: the owner
  completed O3, merged the work to the service repo's `main`
  (`4094d34`) and redeployed. Proven live from this cloud session
  through the harness's own MCP client, not curl: `plan_read` at
  `ref: claude/project-orchestrator-design-9pylac`, `nodeId: P2-N002`
  returned that subtree exactly — six nodes, correct stages,
  P2-N009's own `[blocked: …]` hold marker with kind and reason
  intact, parent/child edges, document links, line numbers, zero
  parse errors — stamped with the register's true SHA at that ref and
  the fetch time. Warm latency 0.82–0.94s over three calls (three
  GitHub round-trips), against a 20s function timeout and a 30s
  enlistment budget.
- [ ] **`plan_read` passes through a stage outside the lifecycle
  vocabulary** — the parser matches `form_check.py`'s node regex
  line for line, but `form_check.py` additionally rejects a stage
  outside its `STAGES` set and the service does not: a register
  reading `[verifiying]` parses as a node whose stage is
  `verifiying`, reported to the caller as fact. The Implementer chose
  pass-through silently; it is a defensible reading of "cite the
  vocabulary rather than re-declare it" (a copy of the stage list in
  the service is a second truth that can drift, which is what I2
  warns against), but it was a design question that should have come
  back as `needs-judgment` rather than being settled in place.
  Decide it at P2-N010, where the transition-legality table has to
  exist anyway and the vocabulary question cannot be deferred again.
- [ ] **The break-down packet row may be one document short** —
  `dispatch.md`'s packet table gives the break down stage "the node's
  specification; profile's leaf-size guidance", but the child sketch
  a breakdown tests lives in the node's *plan*, and `profiles.md` has
  no section by that name: the substance is its Breakdown row
  (C1: required above single-session size) plus `plan-model.md`'s
  definition of a leaf as a unit executable in a single role session.
  The T013 brief supplied both, recorded as the Orchestrator's own
  packet widening. If the next breakdown needs the same additions,
  the row is a spec defect rather than two one-offs — fix it then,
  with evidence, rather than now on one instance.
- [ ] **Write `plan_read`'s latency row into the service runbook**
  (G7) — both numbers now measured from this session, 2026-08-30:
  **warm 0.82–1.07s** over four calls, **2.52s on the first call
  after an idle period**, whose ~1.4s excess over the adjacent warm
  call matches the identity tool's cold-start delta and is recorded
  as a cold start on that evidence rather than on proof the
  container was recycled. Both sit far inside the 20s function
  timeout and the 30s enlistment budget. The runbook's table still
  says "not yet measured" in both rows and is a service-repo edit,
  so it wants a task there rather than a note here.
- [ ] **`sam validate --lint` and `sam build` for the P2-N009
  template changes** — no SAM CLI in the dispatch environment, so the
  new parameters and environment wiring were checked only as YAML and
  by the equivalent esbuild bundle. P2-N008 had both; this change
  does not yet.
- [ ] **Keep the service repo's register fixture in sync** — 
  `test/fixtures/plan-register.sample.md` is a byte-for-byte copy of
  this repo's `docs/plan-register.md`, verified identical at
  acceptance. It will drift silently the next time the register
  moves; replace it with a fetched copy once the service repo has CI.
  P1-N009's conformance corpus may absorb this: a shared fixture set
  that travels with the grammar is the same fixture, kept honest by
  the same drift check.
- [ ] **Plugin tooling on the portfolio stack** (node P1-N009,
  `specified`) — rewrite `plugin/scripts/form_check.py`,
  `journal_tail.py` and `sync_agents.py` in TypeScript/Node per
  [RU-011](rulings.md), and give the Plan-register grammar one
  implementation instead of two. The Python predates RU-008 by a day
  and violated no ruling; the owner's call is portfolio consistency
  and reuse (2026-08-29). Planned as an **interior** node
  ([plan](plans/p1-n009-plugin-tooling-portfolio-stack.md)): the
  grammar and the lifecycle stage set become one dependency-free
  canonical file here, copied into the service repo by a generator
  with a `--check` drift mode (the `sync_agents` pattern) rather
  than a registry, submodule, or shared-library repo; the scripts
  run as direct `.ts` under Node's type stripping, so nothing needs
  a build step or `node_modules` at plugin-install time (verified on
  Node v22.22.2 — what a `/plugin` install physically ships remains
  an assumption for the specify stage, and the design is correct
  either way). Behaviour is the contract: the port is proven
  finding-for-finding against `form_check.py` as a differential
  oracle, which stays the invoked checker until one commit moves
  every invocation site and retires it, so the dispatch loop never
  lacks a working checker. The accidental cross-check that caught
  the P2-N009 stage-vocabulary gap is deliberately given up, and
  replaced by a conformance corpus both consumers run plus the stage
  vocabulary shared as data. Scoped to this repository — the
  service-side adoption is the next entry. **Gate crossed
  2026-08-29**: all ten decisions adopted as defaulted, the owner
  weighed and rejected combining the two repositories (so
  [RU-006](rulings.md) stands), and decision 1 became
  [RU-012](rulings.md). **Specified 2026-08-30**
  ([spec](specs/p1-n009-plugin-tooling-portfolio-stack.md)): criteria
  in five groups — behavioural equality with the retired checker over
  a corpus that includes registers which *fail* (one fixture per
  finding rule, expectations generated from the Python before it is
  deleted so the evidence outlives the oracle); the replacement drift
  guard, proven by breaking it rather than by being present, and
  carried on the checker's own invocation path because this repo has
  no CI; the shared unit's fitness to travel, provable without
  touching the service repo; cutover completeness under the rule
  *a mention a reader will act on moves, a mention recording the past
  stays*; and a commit-by-commit walk proving the documented checker
  command existed and passed at every commit of the node. Specifying
  found one defect in the sketch: `sync_agents` cannot be ported
  *after* the cutover, because `CLAUDE.md` names it and the cutover
  commit retires the Python — so five candidate children become
  four. **Gate crossed 2026-08-30**: decisions 11–14 adopted as
  defaulted (the command shape `node plugin/scripts/form_check.ts`;
  a declared Node floor with a loud non-zero preflight, now
  [RU-013](rulings.md); the conformance corpus triggered by both a
  test suite and the checker's own invocation; and the two live
  P2-N002 criteria renamed in the cutover commit).
  **Broken down 2026-08-30** into the four children below, in a
  strict dependency chain with no independent pair, so no parallel
  dispatch is licensed. The break-down stage settled both boundaries
  the plan left open: the shared grammar unit moves *forward* into
  the thin slice, so `journal_tail` is born on it and no transient
  second transcription is ever written; and `sync_agents` rides with
  the cutover, because it writes its own name into the six files it
  generates, so porting it necessarily rewrites `plugin/agents/` and
  that belongs in the one commit already rewriting every name. The
  vendoring generator moved the other way, into the corpus child,
  because the set it carries is the unit *and* the corpus.
  **Executed 2026-08-30**: children A–D (below) all shipped in
  dependency order, A→B→C→D, no parallel dispatch, exactly as broken
  down. The cutover (child D) landed the only commit that changes what
  anybody runs: `sync_agents` ported, all seven invocation sites
  moved, `form_check.py`/`journal_tail.py`/`sync_agents.py` deleted,
  the differential harness (`check_equality.ts`) retired with its
  evidence preserved in the corpus self-check and `run_corpus.ts`, and
  RU-014 applied to the one test the Python's deletion would otherwise
  have broken outright. This node's own `verifying`/`done` transition
  and final evidence assembly remain the Orchestrator's, not narrated
  here.
- [x] **(node P1-N010, P1-N009 child A) The Node toolchain and
  the shared register grammar, proven end to end by `journal_tail`**
  — shipped: `package.json` (`"type": "module"`, `engines.node >=22`,
  dev-only dependencies matching project-orchestrator-service's
  versions), TypeScript, ESLint flat config (typescript-eslint +
  `eslint-config-prettier`), Prettier, Vitest, `package-lock.json`
  committed, `node_modules` git-ignored, all as named `npm` scripts
  (`typecheck`, `typecheck:consumer`, `lint`, `format`,
  `format:write`, `test`); every divergence from the service
  repository's configuration enumerated in a comment in the file
  that differs (`tsconfig.json`'s `noEmit` +
  `allowImportingTsExtensions` against `tsconfig.consumer.json`'s
  absence of the latter, matching the service's build config).
  `plugin/scripts/lib/plan-register.ts` is the shared grammar and
  lifecycle-stage-vocabulary unit: one file, zero imports, no I/O — a
  merge-and-adapt of the service repository's (pre-P1-N009)
  `src/planRegister/parser.ts` + `types.ts`, plus `STAGES` as data
  cited to [plan-model](process/plan-model.md); it carries no policy
  (D5) — parse-level facts only (a node-like line that does not
  parse, a duplicate ID). It passes both `tsc -p tsconfig.json` and
  `tsc -p tsconfig.consumer.json` (the consumer-shape check: `strict`,
  `NodeNext`, `noUncheckedIndexedAccess`, no
  `allowImportingTsExtensions`) and `eslint .` clean. Its own Vitest
  suite (`test/plan-register.test.ts`) covers malformed-line and
  duplicate-ID parse errors and cross-checks the live register
  against `form_check.py`'s independently-run `parse_register` (24
  nodes, 0 errors, matching id/stage/hold/parent/line for every
  node). `plugin/scripts/lib/node-preflight.ts` is the Node-floor
  preflight (decision 12, RU-013): a pure `checkNodeVersion`
  comparison, unit-tested against a version-string table
  (`test/node-preflight.test.ts`, 22.17.x/22.18.0/23.5.x/23.6.0/24.x/
  a prerelease string, 13 cases), plus `preflightNodeOrExit`, which
  every tool this node ships calls first. `plugin/scripts/journal_tail.ts`
  ports `journal_tail.py` onto the shared unit (it carries no grammar
  of its own): output-identical to the Python for N=1, N=10, N
  greater than the journal's length, and the no-journal case (same
  message, exit 1) — diffed byte-for-byte, transcripts in this task's
  result. Demonstrated running with no `node_modules` present, by
  absolute path, from an unrelated working directory, with an
  explicit project-root argument. Nothing is retired and no
  invocation site moves: `plugin/scripts/journal_tail.py` (and
  `form_check.py`, `sync_agents.py`) are untouched, and
  `python3 plugin/scripts/form_check.py` passes clean at every
  commit of this child. Criteria in the
  [plan](plans/p1-n009-plugin-tooling-portfolio-stack.md).
  **Re-verified at acceptance** rather than accepted on report: the
  four equality cases diffed again byte-for-byte (identical, exit
  codes matching including 1 on the no-journal case); the
  bare-checkout run repeated from an unrelated directory under a
  stronger condition than the criterion asks, since `node_modules`
  was absent entirely rather than moved aside; the unit re-grepped
  for `import`/`require` (hits in the doc comment only); `npm ci`
  from the committed lockfile followed by `typecheck`,
  `typecheck:consumer`, `lint` and `test` (29/29) all clean; and
  `form_check.py` re-run at each of the three commits from a
  worktree — 24 nodes, 0 violations, every time.
- [ ] **`journal_tail`'s duplicate-ID behaviour changed in the
  port** — `journal_tail.py`'s ad hoc `node_names()` builds a dict
  in a loop, so a duplicate node ID silently takes the last
  occurrence; the TypeScript port routes through the shared unit,
  which reports a duplicate ID as a parse error and keeps the first.
  Never observable on the live register, which has no duplicates,
  and none of criterion 7's four required cases exercises it. It is
  a genuine tension between decision 6 (preserve the Python's
  behaviour, record the deviation, fix separately) and criterion D1
  (`journal_tail` carries no grammar of its own) — the two cannot
  both hold here, and the Implementer chose D1 and surfaced it. That
  reading is right, but the conflict was arguably a
  `needs-judgment`. **Made visible, not decided, at P1-N011**: fixture
  `journal-tail-duplicate-id` (two node lines sharing one ID, different
  titles) run through both `journal_tail` implementations records the
  divergence verbatim — the Python's ad hoc lookup shows the *last*
  occurrence's title, the TypeScript port (through the shared unit)
  shows the *first*'s — without picking a side. Still open:
  **`needs-judgment`** — which behaviour the shared unit's contract
  should actually have (keep-first-and-report, matching D1's "no
  grammar of its own"; or keep-last silently, matching the Python's
  pre-port behaviour; or something else) is the owner's or the
  Orchestrator's to decide before node P1-N012 ports `form_check`
  itself, since the same shared-unit duplicate-ID semantics will
  apply there too.
- [ ] **A JSON configuration file cannot carry a required
  comment** — criterion 1 asks that every divergence from the
  service repository's configuration be enumerated in a comment in
  the file that differs, but `package.json` is strict JSON with no
  comment syntax. Documented in the commit message and the Backlog
  entry instead of inventing a non-standard extension. Worth
  pre-empting the next time a specify stage writes a
  comment-in-the-file criterion.
- [x] **(node P1-N011, P1-N009 child B) The travelling package:
  conformance corpus, recorded expectations, and the vendoring
  generator** — shipped: `plugin/scripts/lib/corpus/` holds 19 minimal
  project-root fixtures (`fixtures/`), a fixture → rule manifest
  (`manifest.ts`), and 18 committed expectation files (`expectations/`)
  covering all 11 rule IDs the current form checker's `find()` call
  sites can emit (`register-parse`, `register-id`, `register-stage`,
  `register-structure` — both arms — `backlog-ref`, `costlog-form` —
  malformed row, malformed task ID, duplicate task ID, non-sequential
  warning — `journal-form` — bad JSON, missing field, unknown event
  kind — `journal-crosscheck` — both directions — `liveness` — both
  arms — `rulings` — no register, undefined ruling, inactive ruling,
  missing Applied entry — `definitions` — no classification, all four
  markers missing), plus the not-enrolled case and a snapshot of this
  repository's own live tree, all passing clean. `manifest.ts`'s
  `DECLARED_RULE_SET` is checked against the corpus's actual output at
  every run, not just asserted. The misspelled `[verifiying]` fixture
  (`register-stage-verifiying`) carries the D2 comment naming the
  P2-N009 finding and records both readings: its expectation file
  carries the checker's reading (a `register-stage` violation), and
  `test/corpus-register-stage-verifiying.test.ts` carries the shared
  unit's reading directly against the same fixture file (parses with
  no error, stage reported exactly as written). A dedicated fixture,
  `journal-tail-duplicate-id`, makes the `journal_tail` duplicate-ID
  divergence from P1-N010's Backlog finding visible without deciding
  it (see that entry above, now marked still-open `needs-judgment`).
  `plugin/scripts/run_corpus.ts` is the one-command corpus runner
  (spec B3/B4): default mode compares a fresh run against the
  committed expectations and exits non-zero on any divergence
  (finding-count, exit-code, or fingerprint mismatch, and missing rule
  coverage); `--capture` mode (re)writes expectations from a live run,
  which is how these were generated — every one read and reviewed
  before this commit (criterion 3: 18 files, read in full, cross-
  checked against the fixture design each was meant to provoke).
  `plugin/scripts/sync_shared_unit.ts [--check] <destination>` is the
  vendoring generator: explicit manifest (`plan-register.ts` plus the
  whole `corpus/` directory — not `node-preflight.ts`, not the harness
  tools, which stay local), a "generated — do not edit here" banner
  inserted into `.ts`/`.md` copies and a root `GENERATED.md` marker for
  `.json`/`.jsonl` files that have no comment syntax to carry one in,
  `--check` comparing every file byte-for-byte regardless of banner.
  D4 proven against a scratch destination and recorded in this task's
  result: vendor (94 files) → `--check` passes → one byte changed in
  the copy → `--check` exits 1 naming exactly `plan-register.ts` →
  re-vendor → `--check` passes again; the vendored copy (banner
  included) still passes the consumer-shape type-check. Criterion 6
  (no future orphan): audited by grep at every commit — no fixture,
  the manifest, or an expectation file names `form_check.py`,
  `journal_tail.py`, `sync_agents.py` or `python3` (all describe the
  checker and the journal_tail implementations generically instead);
  the corpus's own `README.md` is the one deliberate exception, since
  it has to quote those four strings to document the search rule
  itself — flagged there and here for node P1-N013's permitted-
  survivors set. Root `python3 plugin/scripts/form_check.py` stayed
  clean at every commit (fixtures live under `plugin/scripts/lib/`,
  never under `docs/` or `orchestration/`, so the root checker's fixed
  read paths never see them). `npm run typecheck`, `typecheck:consumer`
  and `lint` clean; `npm test` is 34/35 — the one failure
  (`test/plan-register.test.ts`, "yields the same {id, stage, hold,
  parent, line} facts...") pre-dates this child (reproduced on the
  base branch before any of this child's commits) and is untouched
  here per W-002; see the new Backlog entry below. Also absorbs the
  "keep the service repo's register fixture in sync" entry above, on
  the service side, at P2-N010.
- [x] **`test/plan-register.test.ts`'s live-register cross-check went
  stale the moment it was accepted** — node P1-N010's
  "yields the same {id, stage, hold, parent, line} facts
  form_check.py's parser yields" test hardcoded a snapshot of
  `docs/plan-register.md` as of T014's commit, including
  `P1-N010: identified`. T014's own acceptance commit
  (`099b2c6`) flipped that line to `[done]` moments later — an
  ordinary, sanctioned register write, not a defect — and the test
  failed on every commit since. **Resolved at node P1-N012**: see the
  entry below (test rewritten to assert agreement at test-run time
  rather than freeze a snapshot).
- [x] **[W-002 — resolved at P1-N012] `test/plan-register.test.ts`
  freezes a snapshot of the live register, so it breaks at every
  acceptance** — the test asserts `P1-N010 … P1-N013` are
  `identified`. The Orchestrator's own T014 acceptance commit
  (`099b2c6`) moved P1-N010 to `done` and broke it; the T015
  acceptance moved P1-N011 and broke it further. Confirmed failing
  on the base branch before T015's branch existed, so it was not that
  task's doing, and the Implementer correctly left it alone under
  W-002. `npm test` was therefore red (34/35) while every other check
  — `typecheck`, `typecheck:consumer`, `lint`, the corpus runner and
  `form_check.py` — stayed clean. The test was not wrong in spirit:
  its purpose (criterion 4, the unit's parse agreeing with the
  Python's on the live register) was right, and it caught nothing
  false. It was wrong in construction: any test that freezes register
  facts is invalidated by the project's most routine operation.
  **Owner disposition, 2026-08-30**: do not modify the test until
  P1-N012, which is where the live-register cross-check naturally
  lands and where the fix costs nothing extra; carry `npm test` at
  34/35 as a known state, not a regression, until then.
  **Resolved at node P1-N012**: `test/plan-register.test.ts` now
  computes both sides fresh at test-run time — `parseRegister` against
  the live `docs/plan-register.md`, and `form_check.py`'s own
  `parse_register` via a `python3` subprocess run in the test itself,
  no recorded transcript — and asserts the two agree, whatever the
  register currently says. `npm test` is 35/35 as of this node's last
  commit. The design rule this exposed travels forward: **a repository
  test must never freeze Plan-register facts, because the register
  moves at every acceptance.**
- [ ] **The corpus README must survive the cutover's orphan search**
  — spec C2's rule is that no textual match for `form_check.py`,
  `journal_tail.py`, `sync_agents.py` or `python3` may survive
  outside a permitted set. `plugin/scripts/lib/corpus/README.md`
  necessarily quotes all four to describe that very rule. The
  Implementer flagged it rather than letting P1-N013 discover it:
  add this file to C2's permitted-survivors set when the cutover is
  specified, so the search rule stays true rather than being amended
  after it fails.
- [x] **(node P1-N012, P1-N009 child C) The form checker on the
  shared unit, proven finding-for-finding against the Python** —
  shipped: `plugin/scripts/lib/form-check-core.ts` is `runFormCheck`,
  a pure, line-for-line port of `form_check.py`'s eight functions and
  25 `find()` call sites onto the shared grammar unit (it imports
  `parseRegister` and `STAGES`; it declares no node-line regex and no
  second stage-vocabulary array — the register-parse/register-id
  findings come from the shared unit's own `RegisterParseResult.errors`,
  translated into the Python's exact message shape). Cost-log,
  journal, rulings and definitions parsing are ported with matching
  Python-`repr()`-style message formatting (a small `pyRepr`/`pyStr`
  helper) so message prose matches, not merely finding identity.
  `plugin/scripts/form_check.ts` is the one entry point (spec C6/C7):
  it preflights the Node floor, runs the corpus self-check (below),
  then runs `runFormCheck` against the target root and prints/exits
  exactly as the Python does — including *not* resolving the
  project-root argument to an absolute path, matching
  `Path(sys.argv[1])`'s behaviour exactly (a real port bug caught and
  fixed during this child, not a preserved deviation: an early
  `path.resolve()` would have silently changed every finding's printed
  path from what the Python prints for the same invocation). One
  sentence for spec C7: an `--emit=json` flag would attach in `main()`
  as a branch before the print loop, replacing it with one
  `JSON.stringify` and touching nothing else; not built (RU-004).
  **Criterion 1 (B3, the committed harness)**:
  `plugin/scripts/check_equality.ts` runs `form_check.py` (subprocess)
  and `runFormCheck` (in-process) over all 18 checker-rule/not-enrolled/
  live-tree corpus fixtures **and** this repository's own live
  register, comparing `(severity, rule, fixture-relative path)`
  fingerprint multisets, finding counts and exit codes; its recorded
  output (this task's result) shows all 19 roots agreeing, exit 0.
  **Criterion 2 (B2, finding-for-finding)**: exact agreement on every
  root — same fingerprints, same counts, same exit codes, no
  line/node/task/ruling ever named differently. One surviving message
  wording difference, justified in this task's result and recorded
  below: `journal-form`'s "invalid JSON" diagnostic text differs
  between Python's `json` module and V8's `JSON.parse` (different
  runtimes' parsers describe the same malformed input differently);
  the violation's rule, path and line number are identical either way.
  **Criterion 3 (B5, preserved deviations)**: one deviation found and
  preserved — `checkBacklogRefs` never implements
  [auditing.md](process/auditing.md)'s Register↔Backlog clause "where
  a Workflow is declared, Backlog stage designations match register
  stages" (`form_check.py` never implemented it either, in any form;
  this project declares no Workflow, so it has never been exercised).
  One annotated site (`lib/form-check-core.ts`, the `checkBacklogRefs`
  doc comment, citing decision 6 and B5), one matching Backlog entry
  (below) — the same set. The two already-documented v1 approximations
  (Backlog-ref stage coverage; the journal cross-check's
  accepted-event/cost-row approximation) carry over unchanged and
  unannotated, per spec B5's own carve-out. **Criterion 4 (D1, no
  second grammar)**: a repository-wide search for `P\d+-N\d+`-shaped
  patterns and for a second `STAGES`-like array returns no hit outside
  `lib/plan-register.ts` and the corpus fixtures — `INTERIOR_OK` and
  `NEED_BACKLOG_REF` in `form-check-core.ts` are checker *policy*
  (which stages permit children; which need a Backlog entry), not a
  second copy of the *vocabulary*, exactly as `form_check.py` itself
  kept them beside its own `STAGES` set; the doc comment makes the
  distinction explicit for a future reader. **Criterion 5 (D3, the
  self-check)**: `form_check.ts` runs the whole corpus against itself,
  in-process, before doing anything else, on every invocation; a
  corrupted expectation run against the clean live register produced a
  message opening "SELF-CHECK FAILED — this checker disagrees with its
  own conformance corpus... This is a problem with the checker, not
  with your project", naming the corrupted fixture, exit 1 — reverted,
  transcript in this task's result. Measured wall-clock, `time node
  plugin/scripts/form_check.ts .`: consistently ~0.09–0.11s, well under
  the one-second budget. **Criterion 6 (D2's executable half)**:
  temporarily disabling the stage-vocabulary check in
  `form-check-core.ts` and re-running produced a self-check failure
  naming exactly `register-stage-verifiying` ("expected 1 finding(s)…
  got 0 finding(s)") and "the corpus never provoked: register-stage" —
  reverted, transcript in this task's result. **Criterion 7**:
  demonstrated running `node plugin/scripts/form_check.ts` by absolute
  path from `/tmp` (an unrelated working directory) against a scratch
  checkout with `node_modules` removed entirely, with an explicit
  project-root argument — exit 0 on the clean register. **Criterion
  8**: the loop is untouched — `form_check.ts` is not pointed at by any
  invocation site, `form_check.py` is byte-identical to the base
  branch, and `python3 plugin/scripts/form_check.py` passed clean at
  every commit of this child. `npm run typecheck`, `typecheck:consumer`
  and `lint` clean; `npm test` is 35/35 (see the two entries above —
  this child also carried the licensed W-002 fix to
  `test/plan-register.test.ts`).
- [ ] **[Preserved deviation, P1-N009 decision 6 — fix separately]
  `form_check` never checks that a Backlog entry's stage designation
  matches the register's, "where a Workflow is declared"** —
  [auditing.md](process/auditing.md)'s Register↔Backlog invariant has
  two clauses: a Backlog entry exists referencing the node (which the
  checker implements), and, where a Workflow is declared, that entry's
  own stage designation agrees with the register's (which it does
  not, in either the Python or the TypeScript port — there is no code
  path for it in `form_check.py` to preserve behaviourally, only its
  absence). This project's Classification declares "Workflow: none
  declared", so the gap has never been exercised here and porting its
  absence changes nothing observable today. Found and annotated at
  node P1-N012 (`plugin/scripts/lib/form-check-core.ts`,
  `checkBacklogRefs`'s doc comment) per decision 6: preserve, record,
  fix separately — a rewrite that also changes behaviour cannot be
  verified by comparison against the Python oracle. Worth its own node
  if this project (or a project it orchestrates) ever declares a
  Workflow — the transition-legality table that P2-N010 already has to
  build for the stage-vocabulary question is a natural place to design
  the check.
- [ ] **One justified message-wording difference between the Python
  and TypeScript form checkers: the "invalid JSON" diagnostic text**
  — `journal-form`'s malformed-JSON finding names the same line, the
  same file and the same rule in both implementations, but the
  parenthesized diagnostic differs because it is generated by each
  runtime's own JSON parser: Python's `json` module says `Expecting
  value` for `not json at all`; V8's `JSON.parse` (node
  plugin/scripts/form_check.ts) says `Unexpected token 'o', "not json
  at all" is not valid JSON` for the identical input. Neither
  implementation's own text is under this project's control — both
  are the standard library's own error message — so there is nothing
  to port or align; recorded here per spec B2's requirement that every
  surviving wording difference be enumerated and justified, not
  silently accepted. No other wording difference was found: every
  other message is reproduced verbatim, including Python-`repr()`
  string quoting for task IDs, ruling statuses, and unknown event
  kinds.
- [ ] **Criterion 4's literal wording cannot distinguish policy from
  vocabulary** — Child C's criterion 4 says a search for stage-name
  literals returns hits "only inside the shared unit and inside
  corpus fixtures", but a correct port necessarily keeps
  `INTERIOR_OK` and `NEED_BACKLOG_REF` — *which* stages permit
  children, *which* need a Backlog entry — beside the vocabulary,
  exactly as `form_check.py` does. Those are checker policy, not a
  second grammar. The Implementer disclosed the hits and justified
  them rather than reporting a clean grep, and the Orchestrator
  confirmed at acceptance that `STAGES` is defined exactly once, in
  `plugin/scripts/lib/plan-register.ts`. D1 is satisfied in
  substance; the criterion's text is over-broad. Worth fixing the
  wording when P1-N009's own `verifying` assembles its evidence, so
  the verifier is not asked to reconcile a grep that cannot come
  back clean.
- [ ] **The Cost log's sequentiality check cannot tell a gap in
  flight from a gap forever** — `auditing.md` line 28 requires task
  IDs "unique and sequential", and the checker mechanizes that
  faithfully, so the two do not disagree: the *specification* is
  under-specified. Task IDs are issued at dispatch and rows are
  written at acceptance, so a gap appears whenever a dispatched task
  does not reach acceptance. Two very different cases produce it.
  **Transient**: parallel dispatch accepted out of order, which
  resolves itself — and which the process spec explicitly permits
  when a plan records mutual independence, so it will become routine
  the first time that is exercised. **Permanent**: a task that never
  lands — `needs-judgment` (T017 today), `blocked`, or `stale`. A
  warning that fires routinely gets ignored, and the permanent case
  then hides inside the transient noise, which is the failure mode
  this whole register exists to prevent. **Proposed fix**, cheap
  because the checker already reads the journal and already
  cross-references rows to `accepted` events: classify the gap. A
  missing ID whose journal shows a terminal non-accepted event, or a
  `dispatched` with no terminal event yet, is expected and silent; a
  missing ID with **no journal record at all** is the real finding —
  an ID issued and lost. That is an `auditing.md` change first and a
  checker change second, in that order (Article 3).
- [x] **Two further C2 permitted-set candidates, and one declined**
  — T018 discharged the orphan search and surfaced three questions
  for P1-N009's `verifying` rather than settling them: (i)
  `plugin/scripts/lib/corpus/manifest.ts` quotes the four search
  strings for the same reason the README beside it does; (ii)
  `test/plan-register.test.ts` names `form_check.py` in the
  disposition comment [RU-014](rulings.md) itself mandates; and
  (iii) this file's narrative of the node's completed children sits
  structurally under `## Upcoming` rather than the literal
  `## Completed` section C2 names, because an interior node stays
  under Upcoming until it reaches `done` itself. The Implementer
  declined to widen the set for (iii) — relocating it would either
  falsify history or falsely claim node-level completion — and left
  it for the owner. All three want a one-line amendment to spec C2
  at `verifying`, not a change to what shipped. **Resolved at
  P1-N009's `verifying`, 2026-08-31**: (i) and (ii) amended into
  spec C2's permitted set with the reason stated — history and
  self-description, not instructions a reader acts on; (iii)
  resolved rather than amended, the rule's intent being satisfied
  where that narrative stands.
- [x] **Methodology amendments for delegated, multi-agent work
  drafted** (node P1-N015) — four amendments the owner approved in
  sketch on 2026-08-31, drafted as adjudicable proposals for the owner
  to hand-carry upstream under [RU-002](rulings.md), following
  P1-N008's precedent. **A1**: scope the report rule by audience
  rather than by artifact — W-008's "a chat report that delivers a
  written artifact" misfires twice here, because "chat" assumes a
  human reader when most reports go agent to agent, and "delivers a
  written artifact" excludes the reports that most need the
  discipline, namely a decision, a finding or a refusal. **A2**:
  name whose duty marking is when sessions nest — K-011 binds "a
  session" and does not say which one owns the duty; P1-N014's
  decision 2 answers it, and upstreaming the answer saves every
  other project re-deriving it. **A3**: a minimal delegation
  vocabulary — two terms only (Delegation, with its delegating/
  delegated-agent roles, and Report audience), narrowed by decision 4
  to what A1 and A2 actually borrow; the fuller vocabulary (dispatched
  task, context packet, handoff contract, node-attached gate) stays
  Article-7-local pending a second project's need. **A4**: state
  K-010's converse — an `active` document's unmarked content asserts
  current intent, so a contradiction there is false rather than
  stale and must be fixed, not marked. The founding plan's corrected
  v1.3.0 claim (task T019,
  [commit `c9da132`](https://github.com/majodali/project-orchestrator/commit/c9da132c0afa6f69e5b14cc8468eaf3c5c9d80c2))
  is the evidencing instance. Split principle the owner confirmed: the
  methodology owns rules any project could need, this project owns
  the mechanisms that implement them.

  Executed: five documents under
  [docs/proposals/](proposals/) — one per amendment plus
  [the cover note](proposals/delegated-work-amendments-cover-note.md)
  — each carrying final normative text beside a byte-verified upstream
  quote (diffed against methodology clone commit `c183427` at
  drafting time), a resolvable evidencing-instance link, a
  Release-register entry (title, placeholder PR link with a fill
  instruction, impact assessment against every Portfolio row via the
  register's own collective-statement pattern, explicit `none`
  migration note, and an independence statement covering the other
  three entries), and an explicit ask under acceptance, amendment, and
  rejection. A1 and A2 each name the A3 term they borrow and carry a
  verbatim fallback phrase, tested by substitution, so either stands
  alone if A3 is rejected; A4 is independent of all three. All five
  stay `Status: draft`; nothing is carried upstream by this node.
  Node moves `specified` → `verifying`
  ([RU-005](rulings.md) — proposal-class nodes gate at `verifying`);
  self-verification (C1) checked criteria groups A, B, D, F2–F3, and G
  against the artifacts, with C2 (estimate honesty), E2 (fallback
  self-sufficiency), and F1 (upstream-general framing) left for the
  owner's read per the spec's *How verification runs* section.
  **Gate pending: owner review at `verifying`.**
  Plan: [p1-n015-methodology-amendments-delegated-work](plans/p1-n015-methodology-amendments-delegated-work.md).
  Spec: [p1-n015-methodology-amendments-delegated-work](specs/p1-n015-methodology-amendments-delegated-work.md).
- [ ] **The portfolio register's row for this project is stale** —
  `docs/registers/portfolio.md` upstream records this project pinned
  at 1.3.0, and does not list `project-orchestrator-service` at all.
  Both statements stopped being true on 2026-08-30 and 2026-08-27
  respectively. Not ours to edit; carry it to the owner with the
  P1-N015 proposals rather than as a separate errand.
- [ ] **The rest of the delegated-work vocabulary, when a second
  project evidences it** — identified 2026-09-01 while planning
  P1-N015, not executed. Decision 4 of that plan proposes upstream
  only the terms A1 and A2 use, because
  [Article 6](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-6--inclusion-every-rule-earns-its-keep)
  (every rule earns its keep) admits a term only when a live project
  needed it, and this project is currently the sole instance.
  Dispatched task, context packet, handoff contract, and the
  node-attached gate stay Article 7 custom definitions here until a
  second project needs them. Reasoning:
  [p1-n015 plan](plans/p1-n015-methodology-amendments-delegated-work.md),
  decision 4.
- [ ] **Two deferred prose guidelines, held for recorded instances** —
  identified 2026-09-01 during the P1-N015 revision (task T023), not
  executed. The same owner review that folded the ordering requirement
  into A1's principal-audience duties
  ([report-rule-scoped-by-audience.md](proposals/report-rule-scoped-by-audience.md))
  named two further reporting guidelines: no pronoun crossing a
  paragraph without its noun, and asserting with verbs rather than "X
  is real." Both are sentence-level prose rules, not report-shape
  rules, so they belong in the methodology's
  [P- series](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/prose.md),
  never in W-008, which governs a report's parts and their order, not
  its sentence construction. Deferred rather than drafted: every P-
  rule's own Motivated-by field cites a recorded review-round and
  multiple instances, and the case for these two today rests on one
  conversation. Condition for proposing them: recorded instances from
  real project reports, not a single exchange.
- [ ] **Track upstream disposition of the P1-N015 proposals** —
  identified 2026-09-01 while planning P1-N015, not executed. The
  node completes at the artifacts under [RU-003](rulings.md), so
  acceptance, amendment, or rejection of each of the four proposals
  is recorded here, as P1-N008's disposition is. Fires when the owner
  reports an adjudication outcome.
- [ ] **Migrate to the release carrying the accepted amendments, and
  release P1-N014's hold** — identified 2026-09-01 while planning
  P1-N015, not executed. When a methodology release ships whatever is
  accepted, this project bumps its Classification pin, adopts the
  changed rules into `docs/process/`, and P1-N014's specify stage
  resumes against the new text
  ([p1-n014 plan](plans/p1-n014-role-contracts-adopt-v140-rules.md),
  gate outcome). Nothing may pin unreleased `main`, so this waits on
  a tag, not on a merge.
- [ ] **Role contracts adopt the v1.4.0 conduct rules** — node
  P1-N014, stage `identified`, opened 2026-08-30, planned 2026-08-31.
  States the report duty, the supersession duties, and the reach of
  the prose rules once each, in `docs/process/` and the six role
  contracts in `.claude/agents/`, with `plugin/agents/` regenerated.
  Planned as a leaf, nine decisions staged with defaults.
  Plan: [p1-n014-role-contracts-adopt-v140-rules](plans/p1-n014-role-contracts-adopt-v140-rules.md).
- [ ] **Methodology citations in the process spec point at the
  superseded pin** — identified 2026-08-31 while planning P1-N014,
  not executed. Nine links under `docs/process/` and in
  [open-risks.md](open-risks.md) target the `v1.3.0` tag; the pin has
  been 1.4.0 since 2026-08-30. Stale rather than false: each claim
  they support still stands at the current pin. Editorial pass,
  retargeting the links and giving each identifier its name (P-004 —
  citations carry names). Reasoning:
  [p1-n014 plan](plans/p1-n014-role-contracts-adopt-v140-rules.md),
  contradictions section.
- [ ] **Editorial pass over the Backlog to the declared row shape** —
  identified 2026-08-31 while planning P1-N014, not executed. Depends
  on decision 8 of that plan being adopted, which declares the shape
  and the lag in this file's header. Existing entries run 100–250
  words with their reasoning inline, which is what P-006 (registers
  hold uniform rows) exists to prevent. Scheduled work, not a
  migration duty (methodology v1.4.0 style guide, Migration).
- [ ] **Editorial pass over `docs/process/` to the house style** —
  identified 2026-08-31 while planning P1-N014, not executed.
  Highest-traffic reference documents first, per the style guide's
  own ordering: [dispatch.md](process/dispatch.md), then
  [roles.md](process/roles.md), then
  [plan-model.md](process/plan-model.md). Separate from P1-N014,
  which binds only the prose it writes.
- [ ] **Adopt `mtool`'s style and supersession-marker checks when
  they ship** — identified 2026-08-31 while planning P1-N014, not
  executed. The methodology's v1.4.0 release notes queue style lint
  (warnings, not violations) and marker greppability in
  methodology-tools. Standing constraint 4 of the
  [founding plan](plans/orchestrator-v1.md) makes that tooling
  upstream, so nothing equivalent is built here; the Auditor picks
  them up like any other `mtool` result kind.
- [ ] **The Lambda bundle cannot load under ESM once the AWS SDK is
  in it** — the deploy of node P2-N010's write path took the whole
  service down: `/health`, which needs no auth and no GitHub,
  returned API Gateway's own `{"message":"Internal Server Error"}`,
  which is the signature of a function that never initialises rather
  than an application error. Reproduced locally and root-caused:
  `bundle:lambda` emits `--format=esm`, and `@aws-sdk/client-dynamodb`
  reaches `@smithy/node-http-handler`, which is CommonJS and
  `require()`s Node builtins. esbuild rewrites those to a shim that
  reads `typeof require !== "undefined" ? require : throw`, so the
  bundle throws `Dynamic require of "node:https" is not supported` the
  moment it is imported from an ESM context — which is exactly how
  Lambda loads an `.mjs` handler. The service survived until now only
  because nothing had pulled the AWS SDK in. Recommended fix: an
  esbuild banner defining `require` from `node:module`'s
  `createRequire`, which keeps the ESM output and is the standard
  remedy; bundling as CommonJS is the alternative.
- [ ] **The bundle's import check was a false negative, and needs to
  run under ESM** — every task that has validated this bundle ran
  `node -e "import(...)"`, which executes in **CommonJS** mode, where
  esbuild's shim finds a real `require` and the bundle loads happily.
  The same import from an `.mjs` file fails. So the check that was
  supposed to catch exactly this class of defect could never have
  caught it, and reported success on a bundle that cannot run in
  production. The replacement is a test that imports the built bundle
  from an ESM context and asserts a callable handler — cheap, and it
  would have failed before the deploy rather than after. **Fixed at
  T025**, and the trap is wider than the one command: a plain
  `await import(builtArtifact)` **inside Vitest** also fails to
  reproduce the defect, because Vite's module runner is a third
  CommonJS-flavoured context. The committed test therefore spawns a
  real `node --input-type=module` subprocess. Nothing stops a future
  test writing the natural-looking, silently-wrong form, so the
  service repo carries a Backlog entry proposing a shared helper.
- [ ] **Deploy the service from CI on merge** (node P2-N012) —
  owner direction, 2026-09-01, after a deploy took the service down
  and nothing noticed until a session curled the endpoint. Checks on
  every pull request (build, lint, test, `sam validate --lint`),
  deploy on merge to `main`, and a **post-deploy smoke test that
  fails the run** — `/health` returns 200 and `tools/list` carries
  the expected tools, or the workflow goes red. That last part is
  what turns today's outage into a two-minute event. Credentials are
  settled and provisioned: GitHub OIDC to
  `arn:aws:iam::656557768279:role/project-orchestrator-service-deploy`,
  so no long-lived secret exists to leak from an S1 repository. One
  real decision remains and it is the owner's, because it changes a
  Classification: the service currently declares
  `Workflow: none declared (⇒ deployed is false)`, and v1.4.0's
  Workflow declaration format requires three parts — ordered stages,
  a designated live stage, and a Backlog default rule. Declaring one
  is what makes `deployed` derivable, and the service repository's
  own migration entry predicted this moment. **Shape settled with the
  owner, 2026-09-01**: rather than a second stack, a **preprod Lambda
  alias** exposed by a Function URL — one resource, and it avoids the
  stage-prefix defect class that caused the first outage. Because
  Lambda environment variables belong to the function version rather
  than the alias, the handler reads its own qualifier from the
  invoked ARN and picks the lease table, failing closed on an
  unrecognised one; the preprod table is permanent, cleaned by TTL.
  The smoke test runs against the preprod URL — `/health` 200,
  `tools/list` carrying all six tools, and a full lease
  acquire-and-release cycle, which is the check that would have
  caught the reserved-word defect. Promotion is repointing the `live`
  alias at the tested version, so rollback is repointing back and a
  failed smoke test simply leaves production untouched. No new
  secrets: preprod shares the bearer token and the GitHub App, and
  the additions are one table, one IAM permission and one public URL
  carrying the same auth. The alias/environment constraint is the
  assumption the design rests on and could not be confirmed against
  AWS documentation from this environment, so verifying it is the
  first thing the work does. Planned 2026-09-01
  ([plan](plans/p2-n012-deploy-from-ci-on-merge.md)): interior, four
  children led by that assumption spike, with six decisions staged —
  among them the exact Workflow declaration text and the boundary
  that keeps a fork or workflow-editing pull request away from the
  deploy role. All six adopted at the gate the same day, and
  cross-repo scope made permanent by [RU-016](rulings.md). Specified
  2026-09-01 ([spec](specs/p2-n012-deploy-from-ci-on-merge.md)): the
  four children stand, and the plan's twelve criteria split into six
  that belong to one child and eight node-level compositions built so
  that a verifier holding no AWS credential can still check them —
  from repository content, workflow run logs, HTTPS calls to the two
  endpoints, and one owner attestation on the deploy role's trust
  policy. Four further decisions staged (7–10): how the failed smoke
  test is induced, attended verification rather than a dispatched
  Reviewer, whether branch protection blocks `done`, and where the two
  prerequisite outage fixes execute. **All four adopted at the
  specification gate, 2026-09-01**, together with the Orchestrator's
  fifth — that the written breakdown crosses at the same gate, so the
  four children entered the register as P2-N013 to P2-N016 without a
  separate `break down` task, as chunk 1's children did. Decision 10
  is already discharged: the service's `main` is `1d48503` and carries
  both outage fixes.
- [x] **Alias assumptions verified against AWS documentation** (node
  P2-N013, child A of P2-N012, `done`) — the six platform assumptions the
  design rests on, answered yes or no in a committed finding with the
  documentation URL and the date read: environment variables are
  per-version rather than per-alias; the handler can read its invoked
  qualifier through `hono/aws-lambda`; a Function URL can be bound to
  an alias, and delivers an event shape that adapter handles; the
  production integration can be bound to `live`; and a stack update
  does not reset `live`. First of the four by
  [decision 2](plans/p2-n012-deploy-from-ci-on-merge.md), because a
  false assumption here costs one task rather than the node. Criteria
  in the [specification](specs/p2-n012-deploy-from-ci-on-merge.md).
  **Blocked 2026-09-01, before dispatch**: this environment's network
  egress policy denies `docs.aws.amazon.com`, `aws.amazon.com` and
  `repost.aws` — a 403 at the CONNECT, for both `curl` and the fetch
  tool — so no role running here can read the documentation the
  criteria require it to cite. Web *search* still returns AWS-authored
  summaries, which is evidence of a different grade than "the
  documentation URL and the date it was read". Unblocking is the
  owner's: allow the domain in the environment's network policy, or
  answer the six assumptions himself as an attestation, or accept a
  lower evidence grade — the last being a deviation from the criteria
  he has just adopted. **Unblocked the same day**: the owner allowed
  the domain in the environment's network policy, and
  `docs.aws.amazon.com` now answers 200 with the guide's prose in the
  HTML rather than behind a script. The criteria stand as adopted.
  **Delivered 2026-09-01** (T030): all six answered yes, on branch
  `p2-n013-alias-assumptions` (`f95b9e8`) in the service repository at
  `docs/findings/alias-assumptions.md`, each with its
  `docs.aws.amazon.com` URL, the date read, a verbatim quote, and the
  criterion that later exercises it live. The one conditional answer
  is assumption 5: a stack update leaves `live` alone **unless** the
  template manages that alias through SAM's `AutoPublishAlias`, which
  republishes and repoints it on every code-changing deploy and would
  defeat "deploy, then promote" the first time CI ran. The finding
  gives child C the alternative rather than leaving it to
  rediscover — a plain `AWS::Lambda::Alias` whose `FunctionVersion`
  comes from a template parameter, with promotion done outside
  CloudFormation as an `aws lambda update-alias` call.
- [x] **Pull-request checks that cannot deploy** (node P2-N014, child
  B of P2-N012, `done`) — the `pull_request` workflow: build, lint, test and
  `sam validate --lint`, each able to fail the check;
  `permissions: contents: read` and no `id-token: write`; no
  `pull_request_target`; third-party actions pinned to commit SHAs.
  Independent of the other three and shippable alone. Closes the
  `.aws-sam/` lint-hygiene entry above, since the workflow runs a
  `sam build` every time. Criteria in the
  [specification](specs/p2-n012-deploy-from-ci-on-merge.md).
  **Delivered 2026-09-01** (T031): branch `p2-n014-pr-checks`
  (`a5f75f3`), four separately named jobs — `Build`, `Lint`, `Test`,
  `SAM validate --lint` — on `pull_request` only, `contents: read` at
  the workflow level with no job override and no `id-token` anywhere,
  every action pinned to a full commit SHA with its version in a
  trailing comment, and the check names written into `docs/runbook.md`
  so O10 is a selection rather than a guess. Locally: build, lint,
  test (131 passing), `format`, `sam validate --lint` and `sam build`
  all clean, and lint re-run *after* `sam build` to prove the
  artifact-ignore holds. What the first run must still confirm: that
  the workflow executes at all, and that the four check names appear
  as predicted — a branch with no pull request runs nothing, so
  neither is knowable yet.
- [x] **Alias-aware lease-table selection, failing closed** (node
  P2-N015, child C of P2-N012, `done`) — the runtime change and the template
  resources it needs: the qualifier read from the invoked ARN, `live`
  and `preprod` mapping to their own tables, an unrecognised
  qualifier refused with the qualifier named, the rule scoped to
  Lambda so the dev server and the suite are untouched, and the
  preprod table, alias, Function URL, IAM grants and `live` binding in
  the template. `service_identity` gains the qualifier and the
  resolved table, which is what makes the choice checkable in one
  authenticated call. Criteria in the
  [specification](specs/p2-n012-deploy-from-ci-on-merge.md).
  **Delivered 2026-09-01** (T032): branch
  `p2-n015-alias-aware-lease-table` (`62e144a`). A call arriving
  through `live` resolves the production table, through `preprod` the
  preprod one, and any other qualifier — `$LATEST` and an unqualified
  invocation included — is refused by name before a DynamoDB client is
  constructed. The rule fires only under a real Lambda invocation, so
  the dev server and the whole existing corpus still resolve
  `LEASE_TABLE_NAME` unchanged. `template.yaml` gains the preprod
  table, both aliases as plain `AWS::Lambda::Alias` resources driven by
  parameters, preprod's Function URL, and explicit
  `AWS::ApiGatewayV2::*` resources binding production to `live` —
  SAM's `Events:` sugar cannot target an alias, which is why the sugar
  is gone. `scripts/deploy.sh` reads `live`'s current
  `FunctionVersion` back before every deploy and passes it through, so
  an ordinary deploy declares no change to it. 167 tests pass, 131 of
  them pre-existing with **zero deletions across every test file**
  (W-002), verified from a clean clone by the Orchestrator rather than
  from the role's report. Unproven until child D deploys: the alias
  binding holding in a real account, the Function URL's real event
  shape, and I4 itself — that a second, template-changing deploy
  leaves `live` where it was.
- [ ] **Deploy, smoke and promote on merge to main** (node P2-N016,
  child D of P2-N012) — the `push` workflow end to end: OIDC, the
  deploy through `scripts/deploy.sh`, the three-check smoke test
  against the preprod Function URL with its token read from Secrets
  Manager, promotion by repointing `live`, the runbook's rollback and
  smoke-failure procedures, and the Workflow declaration in the
  service repository's Classification. The child the owner sees
  working, and the only one blocking on owner actions O7 to O10.
  Criteria in the
  [specification](specs/p2-n012-deploy-from-ci-on-merge.md).
- [ ] **Continuous monitoring for the service, between deploys**
  (identified at P2-N012's plan stage, 2026-09-01) — the CI smoke
  test catches breakage a deploy causes, and nothing catches
  breakage that arrives between deploys, such as an expired
  credential or a revoked App installation. The motivating failure
  was that nothing noticed, which a deploy-time check only half
  fixes. Candidate shape: a scheduled synthetic call to `/health`
  and `tools/list`, alerting the owner where he will see it. Sized
  as its own node when wanted.
- [ ] **Continuous integration for this coordinating repository**
  (identified at P2-N012's plan stage, 2026-09-01) — `node
  plugin/scripts/form_check.ts` and `mtool`'s form audit and link
  check on every pull request here. Today both run only when a role
  session remembers to run them, and the register is what gates
  dispatch. Deliberately out of P2-N012's scope, which is the
  service's deploy path.
- [ ] **Deployment machinery P2-N012 deliberately left out**
  (recorded 2026-09-01) — gradual traffic shifting, CodeDeploy
  deployment preferences, and a second stack or AWS account for
  preprod. All three were weighed against the parent plan's
  constraint 3 (degrade to git-only), which makes a service outage
  expensive attention rather than stopped work, and none earns its
  cost at this traffic volume. Revisit if the service ever becomes
  something work stops without.
- [ ] **`plan_lease_release` fails against real DynamoDB: `token` is
  a reserved keyword** — surfaced by the chunk 1 gate demonstration
  itself, on the first call ever made against the production table.
  `plan_confirm` succeeded — it fetched the pushed commit, checked the
  register carried the edit, and reported the transition confirmed —
  and then failed to release the lease:
  `Invalid ConditionExpression: Attribute name is a reserved keyword;
  reserved keyword: token`. The cause is one line:
  `dynamoLeaseBackend.ts` writes `ConditionExpression: "token = :token"`,
  and DynamoDB reserves `token`, so it needs an
  `ExpressionAttributeNames` alias. `acquireLease`'s expression uses
  only `pk` and `expiresAt`, which is why acquire worked and release
  did not. **Why 124 tests missed it**: every test runs the in-memory
  lease backend, so no test has ever sent a condition expression to
  DynamoDB. The class of gap is the same one the ESM bundle defect
  had — a check that cannot fail in the environment where the code
  actually runs. The TTL contained it exactly as designed: the lease
  self-released at expiry and the register was never at risk, because
  the service holds no write credential.
- [ ] **Q-004 makes the test-environment decision reversible at C2**
  — today's choice of a preprod alias over a second stack was taken
  on this service's economics: one consumer, no authoritative state,
  designed degradation to git-only. The methodology's rules README
  carries `Q-004 — Functional tests run against a deployed test
  environment`, tagged `[C2+] [type: web-app, backend-service]`,
  as the worked example of an applicability header. It does not bind
  a C1 project and it is illustrative rather than live corpus today
  — but the service is a `backend-service`, and
  [RU-007](rulings.md) ties this project's C2 promotion to chunk 5.
  So the decision has a scheduled review point rather than being
  permanent, and whoever revisits it should start from Q-004's text
  rather than re-deriving the argument.
- [ ] **The `plan`-stage packet carries no rule corpus** — T028
  needed the methodology's rules to establish what declaring a
  Workflow actually costs, which is the load-bearing claim of a
  decision that changes a Classification. The packet gave it the
  vocabulary and the release register but not the rules. This is the
  fourth packet-table observation and the second naming a structural
  gap rather than a one-off; it belongs with the others in node
  P1-N016's single considered change to `dispatch.md`'s table.
- [ ] **A criterion only the owner can evidence has no recorded form**
  (identified at P2-N012's specify stage, 2026-09-01) — the node's
  criterion that the deploy role's trust policy restricts the OIDC
  subject to `main` is real, load-bearing, and unreadable by any
  dispatched session, because no session holds AWS credentials. The
  specification marks it owner-attested and says the attestation is
  recorded with the gate, which is prose invented for one node. The
  process spec has owner *actions* (O-numbers) but no owner
  *attestation*: a criterion whose evidence is the owner's word, with
  the date it was given. Every deploy-path and account-boundary node
  will meet this. Sized as a `docs/process/` change when a second node
  needs it; until then the prose above stands.
- [ ] **Plan nodes have no way to state a dependency** — owner
  finding at the P2-N012 gate, 2026-09-01. `dispatch.md` makes
  "earlier siblings `done`" the entry condition for `execute`, and
  sibling order in the Plan register *is* dependency order by
  convention. The owner's judgment: conservative, and not correct.
  P2-N012 has no dependency on P2-N011 whatever, yet the default
  would have held it behind an unrelated node, and the only way past
  was an owner decision — which is precisely the attention the
  decision economics exist to protect. What is missing is a way for
  the **Planner to state a node's actual dependencies**, so the
  Orchestrator can compute what is actionable instead of inferring it
  from list position. That touches the register grammar (a dependency
  field or edge), `plan-model.md` (what a dependency means for stage
  entry), `dispatch.md`'s selection rule, and the form checker (a
  dependency on an unknown node, or a cycle, is a finding). Sized as
  its own node when the owner wants it; it is a change to the plan
  model, not a tweak. Until then, sibling order remains the
  convention and a departure is an owner decision, as this one was.
- [ ] **The run journal can record a block but not its release** —
  found 2026-09-01 while unblocking node P2-N013. `EVENTS` in
  `plugin/scripts/lib/form-check-core.ts` admits `blocked` and twelve
  siblings, and nothing for the transition back: a node's block is a
  first-class event, its release is not, so the only record of the
  release is prose inside whatever event happens to come next. That
  makes "how long was this blocked, and what freed it" unanswerable
  from the journal, which is the one question a block log exists to
  answer. Fix is an `unblocked` kind in `EVENTS` and in
  [observability.md](process/observability.md)'s vocabulary, with the
  note carrying what changed. Small, and it belongs with P1-N016's
  process-spec pass rather than opened as its own node. **A second
  gap, same day**: opening a Risk-register entry has no kind either.
  R15 came out of T030 and had to be recorded inside that task's
  `accepted` note, because `precedent-applied` is for rulings and
  names one — using it for a risk fails the register cross-check,
  correctly. Two omissions of the same shape suggest the vocabulary
  was drawn from the dispatch loop's happy path; the pass should ask
  what else a node does that the journal cannot say.
- [ ] **This session's environment carries AWS credentials, and the
  P2-N012 specification says it does not** — marked 2026-09-01
  (K-011) at T031's acceptance, in the
  [specification](specs/p2-n012-deploy-from-ci-on-merge.md) itself as
  well as here. `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` are
  set in the orchestration session's environment and an `~/.aws/config`
  exists. What they reach is unknown: reading the files is blocked,
  and calling AWS to find out — `sts get-caller-identity` included —
  is an unauthorized action against the owner's account and was not
  performed. Two questions, both the owner's. Is the node buying
  evidence indirectly (G3's two-URL trick, I2's owner attestation)
  that a session could read directly? And is a dispatched role holding
  deploy-capable credentials a surface this S1 design should close —
  every role so far has been briefed as though no such credential
  exists, so none has used them, but that is a property of the briefs
  and not of the environment. Until answered, roles continue to be
  dispatched on the no-credentials premise and the criteria stand as
  written.
- [ ] **A Backlog entry describing another repository goes stale
  silently** — found 2026-09-01 when T031 checked `eslint.config.js`
  and found the gap this Backlog still claimed was open, closed six
  hours earlier by an unrelated task in that repository. Nothing
  re-reads a cross-repository claim, and a dispatch brief that repeats
  one carries the staleness into a role's packet, where it costs the
  role time to disbelieve. Candidate fix: entries that assert another
  repository's state name the file and the commit they were true at,
  so a reader can check cheaply, and the form checker flags a
  cross-repo assertion with no such anchor. Related to the Planner's
  repo-access declaration under [RU-016](rulings.md) — both are about
  the coordinating repository knowing what it does and does not know
  about a repository it does not hold.
- [ ] **`.prettierignore` still lacks `dist-lambda/`** — found by T031
  while closing the `.aws-sam/` half of the same gap; out of that
  child's named scope, so flagged rather than fixed. Redundant today,
  since Prettier follows `.gitignore` by default and that file lists
  it, which is exactly why it will be missed if `.gitignore` ever
  stops covering it.
- [ ] **No workflow linter is available to sessions authoring
  workflows** — T031 wrote this project's first GitHub Actions
  workflow and could validate it only as YAML plus a manual read
  against documented Actions syntax; no `actionlint` exists on the
  machine. Child D writes a second, more dangerous workflow — the one
  holding the deploy credentials — so the gap is about to matter more.
  Candidate fix: install `actionlint` into the session scratchpad the
  way the SAM CLI already is, and name it in the execute-stage packet
  for workflow-authoring tasks.
- [ ] **Process spec maintenance: branch lifecycle, PR citation,
  packet table** (node P1-N016) — three queued corrections to
  `docs/process/`, opened as one node on 2026-09-01 because the
  specification is this project's product and three edits in passing
  is how a specification rots. **(i) The branch lifecycle has no
  mechanism.** W-006 requires a single-use branch to be deleted after
  merge; `dispatch.md` and `roles.md` say work lands on such a branch
  and neither says who deletes it or when. Ten merged branches
  survived until the owner cleared them. The Orchestrator performs
  the merge, so deletion belongs in `dispatch.md`'s acceptance step,
  alongside recording the register and the Cost log — and the reason
  role branches are pushed at all (a container restart mid-session
  already cost work once) belongs there too, so the push does not
  read as waste. **(ii) The specification never mentions pull
  requests.** [RU-009](rulings.md) and [RU-010](rulings.md) carry the
  whole practice of reaching `main` by PR; per P1-N014's decision 1
  the spec cites them rather than leaving the rule in the register
  alone. Note the boundary the rulings do not cover and the spec
  should: a role branch merging into the design branch is internal
  integration and takes no PR, because the gate is where the owner
  reviews. **(iii) The `plan`-stage packet row is wrong.** It omits
  `docs/process/README.md`, which three consecutive tasks had to
  widen for, and the break-down row omits the node's plan, where the
  child sketch a breakdown tests actually lives.
- [ ] **`docs/process/README.md` is the packet gap, three times
  running** — T019 widened to it for the subordination clause, T020
  widened to it for the *Defined terms* section, and the earlier
  observation named it alongside `auditing.md`. Three instances is
  no longer a pattern to watch; it is a packet-table row that is
  wrong. Fix it with the break-down row's missing plan document in
  one considered change to `dispatch.md`'s table, since both are
  specification changes reviewed as such.
- [ ] **The `plan`-stage packet omits two process documents it keeps
  needing** — T019 widened its packet to `docs/process/README.md`
  (the subordination clause) and `docs/process/auditing.md` (the
  semantic Auditor's gate pass and the spec-is-right rule), and
  judged both structural rather than one-off: a plan-stage packet
  that omits them will produce the same widening whenever a node
  touches the process specification itself. That is now the second
  packet-table observation on this project, after the break-down
  row's missing plan document. Neither is urgent, and the table is
  the context-frugality contract, so changing it is a specification
  change reviewed as such — worth doing once, with both instances as
  evidence, rather than twice in a hurry.
- [ ] **Upstream proposal for `mtool`: no source file may read as
  binary to grep** — owner direction, 2026-08-30, prompted by the
  NUL-byte finding below and by the owner having hit the same
  failure before: a checker should assert that every source file in
  a managed tree is treated as text by grep, because a file that
  reads as binary drops out of searches silently and any check built
  on a search quietly loses coverage. This is upstream work, so
  [RU-002](rulings.md) applies — the artifact is written here and the
  owner hand-carries it; cross-repo scope is not assumed. The natural
  vehicle is the checker extension point already proposed at P1-N008
  ([plan](plans/p1-n008-mtool-checker-extension-point.md) ·
  [spec](specs/p1-n008-mtool-checker-extension-point.md)), whose
  contract this would be an early consumer of. Sized as its own node
  when the owner wants it; not folded into P1-N009.
- [x] **`run_corpus.ts` contained NUL bytes, and ripgrep silently
  dropped it from searches — fixed at the P1-N013 cutover** — its
  `fingerprint()` built keys with literal `\x00` separators, so
  ripgrep classified the file as binary and omitted it from
  `files_with_matches` output **without warning**. Confirmed at
  acceptance of T017: GNU `grep -rl` found 6 TypeScript files
  containing `form_check`; ripgrep found 5, missing exactly
  `run_corpus.ts`. Not cosmetic — criterion 4 of the cutover proves
  "no orphan reference survives" by a repository-wide search, and a
  file the search cannot see is exactly the orphan it would miss.
  Fixed by owner direction, folded into the same conversion that made
  `run_corpus.ts` call the checker in-process rather than shelling out
  to `python3`: the separator is now `␟` (U+241F, SYMBOL FOR UNIT
  SEPARATOR) — printable, not a control byte, and not a character any
  severity/rule/path string can contain. Proved, not just fixed: after
  the change, `rg -l form_check --type ts` and `grep -rlE form_check
  --include='*.ts'` return the identical 8-file set (both commands'
  output recorded in this task's result), and a repository-wide,
  all-file rerun of the same comparison for `form_check.py`,
  `journal_tail.py`, `sync_agents.py` and `python3` also returns
  identical file sets from both tools.
- [ ] **Additions to spec C2's permitted set, beyond the three known
  at gate time** — `plugin/scripts/lib/corpus/README.md` (ruled in at
  P1-N011: quotes all four search strings to describe C2's own rule)
  plus two T017 found and this node's cutover confirms are needed:
  the `fixtures/live-tree/` snapshot, a frozen historical copy of this
  repository's own documents whose sanitisation would be the very
  defect C2 names; and provenance doc comments in the ported tools
  recording what they were ported *from* (`form_check.ts`,
  `journal_tail.ts`, `sync_agents.ts`, `sync_shared_unit.ts`,
  `run_corpus.ts`, `lib/form-check-core.ts`, `lib/parse-output.ts`,
  `lib/plan-register.ts`). **Two more, found discharging C2 at the
  cutover itself:** `plugin/scripts/lib/corpus/manifest.ts` quotes the
  same four strings for the same reason as the README it sits beside
  (C2's own rule needs stating in both places that state it, not just
  the one the plan happened to name); and `test/plan-register.test.ts`
  names `form_check.py` in the doc comment RU-014 itself requires —
  recording where the coverage lost by retiring the Python-cross-check
  test now lives. **A fifth match the Implementer does *not* propose
  widening for:** `docs/backlog.md`'s completed-child narrative for
  this node's children A–C sits under the `## Upcoming` heading (this
  file has exactly two `##` sections; an interior node's own top-level
  entry stays under Upcoming until the whole node reaches `done`, even
  once several children are marked `[x]` beneath it) rather than under
  the literal `## Completed` heading C2 names — a structural fact about
  this repository's own Backlog convention, not a defect in the text.
  Left as found: rewriting or relocating shipped-child history to fit
  the literal wording would either falsify history or falsely claim
  P1-N009 itself complete, either one worse than the wording gap.
  Flagged for the owner's judgment at `verifying` rather than resolved
  here. All of the above: history, not instructions, and none of it
  read by anyone as a live command to act on — to be amended into the
  specification at P1-N009's `verifying` rather than left disagreeing
  with what shipped. **Distinct from all of this, and separately
  corrected in the cutover commit itself, not left for `verifying`:**
  the handful of genuinely stale present-tense claims T017 found in
  these same files (`form_check.ts` and `journal_tail.ts`'s "nothing
  is retired yet" paragraphs; `plan-register.ts`'s "checker
  (`form_check.py` today)"; `sync_shared_unit.ts`'s "mirroring
  `sync_agents.py`" mentions; `corpus/README.md` and `manifest.ts`'s
  claim that `run_corpus.ts` and `sync_shared_unit.ts` "genuinely
  invoke the Python") — these were false the moment the cutover
  landed, so they moved with it rather than waiting for a later gate.
- [ ] **A `needs-judgment` return leaves its cost unrecorded** — the
  Cost log takes one row per *accepted* task, and `form_check`
  enforces that every row has an `accepted` event. T017 consumed
  ~253k tokens and 19m11s and produced no row, because it correctly
  returned `needs-judgment` instead of a result. The work was real
  and mostly reusable, but the project's own cost accounting cannot
  see it. Either the Cost log's definition widens to one row per
  dispatched task with an outcome column, or the journal becomes the
  authority for unaccepted work and the Cost log says so. A spec
  decision for the next design pass, recorded here with a real
  instance rather than argued in the abstract. **Now a live signal**:
  the ported checker raises `costlog-form — task IDs not sequential`
  on the T017 gap at every run, and will keep doing so until the
  definition is settled. It is a true finding, not noise, and it is
  the first thing the port caught on the live tree that the project
  had not already written down.
- [ ] **Orchestrator brief defect: the T017 packet said "all five
  test files" when there are four** — a small enumeration error, but
  the packet table is the context-frugality contract and an
  enumeration that miscounts is one a role must reconcile. Recorded
  in the same series as the earlier brief-assembly gaps.
- [x] **(node P1-N013, P1-N009 child D) The cutover: `sync_agents`
  ported, every invocation site moved, the Python retired, in one
  commit** — shipped: `plugin/scripts/sync_agents.ts` (same argument
  shape as the Python — `[--check] [project-root]` — same in-sync /
  out-of-sync / no-`.claude/agents/`-here messages, `--check` never
  writes); `plugin/scripts/run_corpus.ts` converted from a `python3
  form_check.py` subprocess to an in-process call to `runFormCheck`,
  fixing along the way the NUL-byte fingerprint separator that made
  ripgrep silently drop this file from searches (owner direction — see
  the dedicated Backlog entry above); `check_equality.ts` deleted, not
  reduced, per this child's own criterion 6 reasoning below;
  `plugin/scripts/form_check.py`, `journal_tail.py` and `sync_agents.py`
  deleted. **Criterion 1 (C3, `sync_agents` still generates)**:
  regenerating `plugin/agents/` from the now-edited
  `.claude/agents/auditor.md` (the only role file this cutover
  touches) produced the same six files with a banner naming
  `sync_agents.ts`, byte-identical otherwise to what the Python last
  produced (diffed in a scratch directory before the cutover — see
  this task's result); `--check` passes at the cutover commit and at
  `done`; no file under `plugin/agents/` was hand-edited. **Criterion
  2 (C1, every site moves, verified by repository-wide search rather
  than by re-reading the table)**: all seven rows discharged —
  `.claude/agents/auditor.md`; the six regenerated `plugin/agents/*.md`;
  `plugin/skills/enroll/SKILL.md`; `plugin/skills/orchestrate/SKILL.md`
  (both mentions); `plugin/skills/journal-tail/SKILL.md`;
  `plugin/README.md` (the fallback paragraph, and the Components list,
  which was missing `sync_agents` entirely before this commit —
  T017's finding, now fixed); `CLAUDE.md` (Build/run/test, which now
  also states the Node floor per criterion 7/RU-013, and Architecture
  at a glance). **Criterion 3 (C4, one commit, both halves)**: this
  commit's `git show --stat` carries the three `.py` deletions,
  `check_equality.ts`'s deletion, every site edit above, decision 14's
  two renames, the RU-014 test change, and this Backlog rewrite
  together; every earlier commit in this node's branch (the
  `sync_agents` port, the `run_corpus` conversion) left the Python in
  place and no documented command pointing at an absent file.
  **Criterion 4 (C2, no orphan reference)**: a repository-wide search
  for `form_check.py`, `journal_tail.py`, `sync_agents.py` and
  `python3`, with both `rg` and GNU `grep` (confirmed to return
  identical file sets — the NUL-byte fix means this is no longer two
  different answers), returns matches only inside the specified
  permitted set, five further additions the Implementer found and
  did not resolve unilaterally (Backlog entry above, for the owner's
  judgment at `verifying`), and one genuinely stale block deleted
  outright: `.gitignore`'s Python-bytecode-cache comment, which
  claimed `test/plan-register.test.ts` still loads `form_check.py` via
  `importlib` — false after RU-014, and with no `.py` file anywhere in
  the tree the `__pycache__`/`*.pyc` ignore rules themselves are dead,
  so the whole block was removed rather than reworded. The genuinely
  stale present-tense claims T017 named were corrected in this same
  commit (see the Backlog entry above). **Criterion 5 (decision 14)**:
  `docs/plans/p2-n002-service-skeleton.md` criterion 9 and
  `docs/specs/p2-n002-service-skeleton.md` criterion P2 renamed, each
  with the required one-line note (Backlog entry above). **Criterion
  6 (the harness retired, evidence preserved)**: `check_equality.ts`
  deleted outright, not reduced — it is spec B3's differential harness
  by name, its job (proving the port equal to the Python) is complete
  once the Python is gone, and spec B4's durable check already has two
  homes that do not depend on it: `form_check.ts`'s built-in corpus
  self-check (spec D3, runs on every invocation) and
  `plugin/scripts/run_corpus.ts` (spec B4, now in-process), both
  checking this same shared unit's parsing against expectations
  captured from `form_check.py` and reviewed before it was deleted.
  `run_corpus.ts` after retirement: `18 fixture(s) match their
  recorded expectations; all 11 declared rules provoked` — unchanged
  from before the conversion and the deletion, recorded in this task's
  result. RU-014's disposition of `test/plan-register.test.ts` is the
  same shape at the unit-test layer: the cross-check test and its
  `parseLiveRegisterWithPython()` helper retired, the surviving
  assertion kept and its `describe` block renamed, and the doc comment
  records where the lost coverage now lives (spec D3 and B4, as
  above) — `npm test` 35/35 → 34/34, the disclosed and ruled-on
  outcome. **Criterion 7 (the new checker clean from here on, RU-013
  in `CLAUDE.md`)**: `node plugin/scripts/form_check.ts .` clean (24
  nodes, 0 violations, 0 warnings) at the cutover commit and at `done`;
  its corpus self-check passes as part of every invocation;
  `CLAUDE.md`'s Build/run/test line states the Node floor
  (`>=22.18.0 (>=23.6.0 on the 23.x line)`) next to the command, per
  RU-013. **Criterion 8 (the Backlog is the truth)**: this entry
  itself, the three Backlog entries above it closed or corrected in
  this same commit, and no new finding from this child left
  unrecorded. `npm run typecheck`, `typecheck:consumer` and `lint`
  clean; `npm test` 34/34.
- [ ] **Service-side adoption of the shared register grammar** — the
  other half of P1-N009's reuse: `src/planRegister/parser.ts` gives
  way to the vendored canonical file, and the service repo gains the
  drift check. Belongs to node P2-N010, which has to open the parser
  anyway to settle the stage-vocabulary question, and which should
  therefore execute after P1-N009's shared-unit child. Kept out of
  P1-N009 to avoid an immediate-class scope expansion
  ([P1-N009 plan](plans/p1-n009-plugin-tooling-portfolio-stack.md),
  decision 3); if the owner overrides that decision the two halves
  land together and this entry closes with it.
- [x] **P2-N002's live criteria renamed at the P1-N009 cutover
  (decision 14, option (a), the default)** — `docs/plans/p2-n002-service-skeleton.md`
  criterion 9 and `docs/specs/p2-n002-service-skeleton.md` criterion
  P2 named `python3 plugin/scripts/form_check.py`; both now name `node
  plugin/scripts/form_check.ts`, each with a one-line note that the
  command changed at P1-N009 (node P1-N013) and nothing about the
  criterion's substance did. Still checked at P2-N002's own
  `verifying`, which falls after this node — only the command they
  name moved, in this commit, under W-003.
- [x] **`node` became a runtime assumption where `python3` was —
  live as of the P1-N013 cutover, not just candidate** — every surface
  that runs the form checker now needs `node` on `PATH` at a version
  that strips types (≥22.18 / ≥23.6); `python3` is no longer a
  fallback, because `plugin/scripts/*.py` no longer exists. Claude
  Code runs on Node, so the runtime is present wherever a session is.
  This was recorded here as a candidate Risk-register entry while
  P1-N009 was still being specified; the Orchestrator has since opened
  [R13](open-risks.md) and closed [RU-013](rulings.md) (both already
  in place before this node's execute stage), so the mitigations this
  entry asked for — a clear, loud failure message and a declared
  floor — already exist: every tool this node ships calls
  `preflightNodeOrExit` before doing anything else (`lib/node-preflight.ts`),
  and `CLAUDE.md`'s Build/run/test line states the floor next to the
  command, per RU-013.
- [ ] **Verify what a `/plugin` install physically ships** — whether
  a plugin directory can carry build artifacts or `node_modules`,
  and what `${CLAUDE_PLUGIN_ROOT}` points at in practice. Could not
  be established while planning P1-N009 (no plugin cache in the
  dispatch environment; per [R9](open-risks.md) the plugin has never
  been observed loading), so that node's design deliberately does
  not depend on the answer. Worth settling before any tooling does.
- [ ] **A machine-readable finding mode for the form checker** — the
  `--emit=json` entry point the
  [extension-point proposal](proposals/mtool-custom-type-checker.md)
  sketches. Not built at P1-N009 (RU-004: sketch, not implementation,
  while the contract is under discussion); the port only preserves
  one stable entry-point path so adopting the settled contract is a
  declaration rather than a restructuring.
- [ ] **Revisit `billing_check.sh`'s language** — the SessionStart
  billing hook stays shell at P1-N009 (decision 7: no runtime
  dependency and no startup cost on a ten-line environment-variable
  test). Reopen if it grows logic, or if the owner prefers uniformity
  over the exception.
- [ ] **A shared-library repository for the portfolio** — when a
  third consumer of the register grammar (or any other shared unit)
  appears, the vendor-plus-drift-check mechanism P1-N009 chooses
  stops paying and a proper home earns its Classification and
  enrollment. RU-006 is the test to apply then.
- [x] **Chunk-1 child: plan-state update with the advisory lease**
  (node P2-N010) — the three-step git-authoritative write model
  (lease → update returning the exact edit → confirm with the SHA);
  the gate demonstrator, with the by-hand-vs-by-service equivalence
  check.
- [ ] **Chunk-1 child: degrade to git-only, and enlistment
  documentation** (node P2-N011) — the R12 exercise (dead endpoint
  *and* unset credential) plus the enlistment runbook.
- [ ] **Fallback task-claim protocol** — when the service is
  unreachable after retries, a session picks its next task from the
  repo directly; how does it claim one so two sessions do not collide?
  Owner's proposal (2026-08-26): put the task ID in the branch name
  and let first-to-create win — git as the lease of last resort.
  Shapes chunk-1 child P2-N011 and chunk 4.
- [ ] **Claim release when a session dies** — a branch-name claim
  outlives the session that made it; define how an abandoned claim is
  detected and released (the journal's `stale` rule is the in-service
  analogue). Owner-raised 2026-08-26.
- [ ] **Service reconciliation after an outage** — when the service
  returns, git has moved without it; define how it rebuilds its
  projection from the repo and reconciles claims made while it was
  down. Owner-raised 2026-08-26; bears on R10 and R12.
- [ ] **Service chunk 2 — owner questions and the plan view** (node
  P2-N003) — question queue (elicitation for immediate class, queue
  plus UI for gate batches) and the first UI: plan hierarchy with
  drill-down, waiting-questions list, live updates.
- [ ] **Service chunk 3 — topics and coordination** (node P2-N004) —
  project topics for status and cross-session coordination, including
  who is blocked on what; channels-push availability on the web
  surface verified here (R11), with pull as the fallback.
- [ ] **Service chunk 4 — the task-pull loop** (node P2-N005) — a
  session asks the service for the next task in its role and confirms
  progress; the write lease in anger. The standing substitute for
  server-side spawning.
- [ ] **Service chunk 5 — migration and pilot** (node P2-N006) — move
  this repo's orchestration onto the service, then run the deferred
  portfolio pilot through it; C2 promotion of this repo begins here.
- [ ] **Service enlistment section in the process spec** — the
  additive v1-spec update the service implies: how a managed
  repository enlists (`.mcp.json`, per-server timeout, the token
  environment variable), and the standing rule that a session whose
  service is unreachable proceeds on the v1 process without retrying
  or waiting. Chunk 1 documents enlistment in the service repository;
  folding it into [docs/process/](process/README.md) rides the chunk-5
  migration unless an earlier chunk needs it
  ([P2-N002 plan](plans/p2-n002-service-skeleton.md)).
- [ ] **OAuth authentication for the service** — replace the chunk-1
  bearer token supplied by environment expansion if that proves
  awkward on any surface, or when the service is enlisted by
  repositories beyond the owner's own (P2-N002 plan, decision 5).
- [ ] **Custom domain for the service endpoint** — the default
  API endpoint URL is what chunk 1 enlists against; a domain and
  certificate buy nothing until the endpoint is shared or moved
  (P2-N002 plan, decision 9).
- [ ] **Multi-project plan state in the service** — chunk 1 serves
  this repository's register only; serving several enlisted projects
  arrives with the chunk-5 migration and pilot (P2-N002 plan,
  decision 4).
- [ ] **Role-aware identity on the service's write path** — chunk 1
  authenticates a client, not a role: one shared bearer token cannot
  tell an Orchestrator from an Implementer, so the single-writer rule
  stays a process rule the session honors (P2-N002 spec, decision 12).
  Real role identity arrives with chunk 4's task-pull loop, which has
  to know who is asking anyway.
- [ ] **Secret scanning over both repositories' histories** — chunk 1
  checks "no secret in history" by hand at its gate (P2-N002 spec,
  I7); the durable form is a push-time scan (GitHub secret scanning or
  an equivalent hook) on this repo and the service repo.
- [ ] **Revisit the service's tool latency budget as plan state grows**
  — chunk 1 sets the enlistment timeout from cold and warm
  measurements against today's single register (P2-N002 spec, G7); a
  larger register or multi-project state can push a tool past it.
  Re-measure at the chunk-5 migration.
- [ ] **CI for project-orchestrator-service** — run the service
  repository's tests and form checks on push; chunk 1 verifies by
  local command, which is enough for one contributor and not enough
  for long.
- [ ] **Declare the multi-repo relationship** — record the
  coordinating-repo relationship between this repo and
  project-orchestrator-service in both Classifications once the
  methodology's multi-repo update lands (the owner's staged model);
  until then the service repo declares family membership under
  v1.3.0's Family field alone.
- [ ] **Latency comparison: local session trial** — run the same
  N008 scope in a local terminal session and compare journal
  wall-clock against trial 3's web run, isolating surface latency
  from process overhead (owner-raised, 2026-08-25).
- [ ] **External-harness orchestration experiment** — one node run
  through a harness outside Claude Code (Claude Agent SDK under
  subscription auth, per standing constraint 2) to compare latency
  and cost against Claude Code surfaces; informs the phase-2
  runtime decision (owner-raised, 2026-08-25).
- [ ] **Delegation cost-effectiveness measurement** — when and how
  delegating Orchestrator admin batches (or any role handoff) pays
  for itself: judgment today, measured from Cost log + journal data
  once the pilot generates enough of it (v2 theme; plan chunk 6
  grooms it).
- [ ] **Deliver the extension-point proposal upstream** — carry the
  finished P1-N008 artifact to methodology-tools as an issue or PR
  and record its disposition. Separate from P1-N008 because
  methodology-tools is outside this project's approved scope
  (dispatch's cross-repo-reach rule) and because upstream acceptance
  is not this project's to verify; the default route is the owner
  hand-carrying it (P1-N008 plan, decision 2). The proposal is not
  reopened by P1-N009 (its evidence link is SHA-pinned and its
  entry-point sketch is labelled illustrative), but if delivery
  follows the rewrite, say so in the covering message rather than
  editing the artifact ([P1-N009
  plan](plans/p1-n009-plugin-tooling-portfolio-stack.md),
  decision 8).
- [ ] **Adopt the checker extension point once it lands** — when
  `mtool` ships the capability: adapt the form checker (Python
  today, TypeScript after P1-N009) to the accepted
  contract, retire the side-by-side transitional arrangement in
  [auditing](process/auditing.md), and update the Auditor's contract
  in [roles.md](process/roles.md) to run the checker through `mtool`
  rather than beside it.
- [ ] **Pilot on a real project** (node P1-N006) — end-to-end run on
  one owner-chosen portfolio project; costs and lessons recorded
  ([plan chunk 5](plans/orchestrator-v1.md)).
- [ ] **Cost reporting v1 and close-out** (node P1-N007) —
  aggregation over cost logs and run journals, retrospective, v2
  themes groomed ([plan chunk 6](plans/orchestrator-v1.md)).
