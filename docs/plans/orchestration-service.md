# Orchestration service

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Chunk boundaries below are
     proposed for the owner's review (W-001). -->

Outcome under development: a project-orchestration service that Claude
Code sessions in any environment call over MCP — holding live project
state, carrying coordination between sessions, queueing owner
questions, and publishing a plan view that updates as work happens —
so that orchestrated development is coordinated and observable without
leaving the surfaces the owner already uses.

## Why this, and why now

Four trials of the [orchestrator v1](orchestrator-v1.md) process on
Claude Code web and local surfaces established that the process works
(a full node lifecycle, precedents deciding questions silently, every
containment mechanism firing on real cases) and that two things do
not, structurally:

- **Communication.** Agent-to-owner reporting carries too much noise,
  bounded below by the surface's interactive style. Spec changes (the
  quiet loop, the gate template, decision batching) improved it
  materially and did not solve it. The highest-value channel today is
  committed documents, which does not fit the flow.
- **Coordination.** Sessions cannot see each other. There is no
  overall view of progress against plan, and no way for an
  orchestrating session to know that a sibling is blocked awaiting the
  owner — that state lives inside another session's UI.

Two alternatives were considered and rejected at the owner's review,
2026-08-26:

1. **Stay on Claude Code surfaces and keep tuning the spec.** Rejected:
   the ceiling is the surface's design as a human-facing interactive
   tool, and three rounds of spec tuning demonstrated it.
2. **A standalone orchestration engine driving the Agent SDK.**
   Rejected: it re-hosts everything (compute, GitHub plumbing,
   permission UX, transcripts, scheduling), defers the pilot behind an
   infrastructure build, and — decisively — the SDK documents API-key
   authentication while Anthropic's February 2026 policy restricts
   subscription OAuth to Claude Code and Claude.ai, so the engine's
   inference would bill API credits against
   [standing constraint 2](orchestrator-v1.md).

The service inverts the control flow instead: sessions call the
service. All inference stays inside Claude Code sessions, so
subscription billing is unaffected, the harness is unchanged, and the
owner keeps the web surface for most projects — enlisting a session
into a project becomes cloning a repo whose `.mcp.json` names the
service.

## Standing constraints

Inherited from the [founding plan](orchestrator-v1.md) unless noted.

1. **Git remains authoritative.** The service is a projection and a
   coordination plane, never a second source of truth (Constitution
   Article 3; methodology K-001). Registers live in git; the service
   mirrors them for the UI and for coordination; answers to owner
   questions land back in git as commits. Where service state and git
   disagree, git is right and the service has a bug.
2. **The service holds the write lease.** With several sessions
   enlisted in one project, the process spec's single-writer rule
   needs an enforcer; a per-project lease is what the service is for.
   This strengthens an invariant the v1 process could only assert.
3. **Degrade to git-only.** A session MUST be able to work when the
   service is unavailable, falling back to the v1 process (registers
   in git, gates in chat). The service is an accelerator, never a
   dependency for progress.
4. **Subscription billing, unchanged.** The service performs no model
   inference. Every model call happens inside a Claude Code session on
   a subscription-billed surface. Any future feature that would make
   the service call a model is a constraint change requiring the
   owner's decision.
5. **No server-side agent spawning** (owner ruling, 2026-08-26).
   Multiple live sessions playing different roles cover the need, and
   more concurrent agents cost the owner more attention than they
   save. The substitute is the **task-pull loop**: an enlisted session
   asks the service for the next task in its role and confirms
   progress as it goes. Spawning stays out of scope unless the pull
   loop proves insufficient.

## Design sketch

To be elaborated per chunk; recorded here as current intent.

- **Transport: MCP over HTTP.** A checked-in `.mcp.json` enlists a
  repository, so cloud sessions pick the service up from the clone —
  the same mechanism that carries the role-agent mirror today. Auth by
  bearer token or OAuth, per project.
- **Operations**, in the shape the owner named: read and update
  project plan and execution state; publish to project topics (status
  and coordination); raise owner questions and report which questions
  are waiting; hand out the next task in the pull loop.
- **Owner questions have two paths.** Immediate-class questions use
  MCP **elicitation**, which surfaces natively as a dialog in the
  asking session. Gate-batched decisions go to the service queue and
  the UI, where the owner answers asynchronously — the answering
  session picks them up on its next pull.
- **The UI** is a separate consumer of the service: the plan
  hierarchy, drillable to node, task, and journal event; the queue of
  questions awaiting the owner; live agent status per enlisted
  session. Updated as sessions publish, not by polling git.
- **The process spec is unchanged in substance.** Roles, the node
  lifecycle, packets, gates, rulings, and the cost log all carry over;
  the service changes where coordination state lives and how the owner
  sees it. Spec updates are expected to be additive (an enlistment
  section, service-aware trigger surfaces), not a rewrite.

## Chunks

### Chunk 1 — Service skeleton and plan state

Repository, Classification (S1, serverless-aws, family member with
`project-orchestrator` as coordinating repo), and a deployed service
exposing plan-state read/update over MCP, with `.mcp.json` enlistment
proven from both a web and a local session against this repository.
Gate: the owner sees a session read and update real plan state.

### Chunk 2 — Owner questions and the plan view

The question queue (elicitation for immediate class, queue plus UI for
gate batches) and the first UI: plan hierarchy with drill-down, the
waiting-questions list, live updates.
Gate: the owner answers a real gate decision from the UI.

### Chunk 3 — Topics and coordination

Project topics for status and coordination between enlisted sessions,
including which session is blocked on what. Channels-based push
evaluated here (its availability on the web surface is unverified —
see the Risk register); topics degrade to pull if push is unavailable.
Gate: two enlisted sessions coordinate through the service, visibly.

### Chunk 4 — The task-pull loop

A session asks the service for the next task in its role, confirms
progress, and reports completion — the standing substitute for
server-side spawning. Includes the write lease in anger.
Gate: a node moves through its lifecycle across two sessions with no
owner intervention beyond the gate.

### Chunk 5 — Migration and pilot

Move this repository's own orchestration onto the service, then run
the deferred [pilot](orchestrator-v1.md) on an owner-chosen portfolio
project through it. Costs and lessons recorded; v1 process spec
updated where practice demands.
Gate: owner reviews pilot results.

## Decisions for the gate

1. **Repository shape** — default: a new repository for the service,
   S1 / serverless-aws, with `project-orchestrator` as the designated
   coordinating repo (the multi-repo model staged upstream). Rationale:
   this repo is C1/S0 documentation and tooling; a deployable service
   holding tokens is neither.
2. **Chunk boundaries** — default: as proposed above. Rationale: each
   chunk ends at something the owner can see working.
3. **Promotion timing** — default: promote `project-orchestrator` to
   C2 when chunk 5 begins, not before. Rationale: the owner's standing
   intent ties promotion to orchestrating C2+ projects, which is what
   the pilot does.
4. **v1 plan disposition** — default: keep
   [orchestrator-v1](orchestrator-v1.md) active through its chunk 4
   close-out, with its chunk 6 runtime assumptions marked superseded
   by this plan. Rationale: the process spec and plugin remain in
   service; only the runtime direction changed.

## References

- [orchestrator-v1](orchestrator-v1.md) — the founding plan, whose
  process spec this inherits unchanged
- [docs/process/](../process/README.md) — the orchestration process
  specification
- [Risk register](../open-risks.md) — R10–R12 record this plan's
  service-specific risks
