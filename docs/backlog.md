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
- [~] **Chunk-1 child: reachability slice** (node P2-N008,
  `verifying`) — delivered in the service
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
  interactive approval. **Still open**: both-surface enlistment proof
  (I6) — a web session and a local session each listing and calling
  `service_identity` through the enlisted server.
- [ ] **Service repo lint hygiene: ignore `.aws-sam/`** — the service
  repo's `eslint.config.js` ignores `dist`, `node_modules` and
  `coverage` but not `.aws-sam/`, so `npm run lint` fails after a
  `sam build` unless the artifact is deleted first. Found and worked
  around during T009; belongs in the service repo, tracked here until
  a task there picks it up.
- [ ] **Chunk-1 child: plan-state read** (node P2-N009) —
  `plan_read` over the real Plan register, SHA-stamped, taking an
  explicit `ref` and citing plan-model.md rather than re-declaring
  the lifecycle.
- [ ] **Chunk-1 child: plan-state update with the advisory lease**
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
  hand-carrying it (P1-N008 plan, decision 2).
- [ ] **Adopt the checker extension point once it lands** — when
  `mtool` ships the capability: adapt `form_check.py` to the accepted
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
