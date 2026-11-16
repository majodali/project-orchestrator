> **Status: archived 2026-11-14** (P4-N024, Pruned document set).
> Archived because these Risk register entries are closed (R9, R12) or
> have the retired dispatch loop as their subject (R1 to R6, R8). The
> task loop's stop conditions and `plan-state check` replaced the
> mechanisms they cite. The open entries stay in `docs/open-risks.md`.

# Risk register: retired entries

- <a id="r1"></a>**R1 — Dispatch oscillation.** A loop between roles that never
  converges: verify↔execute ping-pong (Reviewer rejects, Implementer
  resubmits, repeat), or the same `needs-judgment` question bouncing
  repeatedly. *Mitigation*: bounded attempts
  ([dispatch.md](process/dispatch.md) failure containment) — two
  consecutive failed round-trips on one (node, stage) blocks the pair
  and escalates; loops are visible in the
  [run journal](process/observability.md) as repeated event
  sequences. *Status*: open; mitigation spec'd, checker/journal land
  in plan chunk 4.
- <a id="r2"></a>**R2 — Runaway fan-out.** Breakdown inflates the tree, or repeated
  backward transitions cycle a subtree, consuming budget without
  converging. *Mitigation*: approved scope is the hard boundary; the
  owner MAY attach a task or token budget to a scope grant
  (dispatch.md gates), and exhaustion stops the loop; per-node
  backward-transition counts are journal-visible. *Status*: open;
  mitigation spec'd.
- <a id="r3"></a>**R3 — Orphaned work.** A node neither progressing nor visibly
  stuck — a `needs-judgment` answered in chat but never recorded, a
  blocked node silently forgotten. *Mitigation*: the liveness
  invariant ([auditing.md](process/auditing.md)) — every non-terminal
  node is actionable, in-flight, blocked-with-reason, or gated;
  gate/stop summaries enumerate all of them (dispatch.md, no silent
  drops). *Status*: open; mitigation spec'd.
- <a id="r4"></a>**R4 — Role overreach.** A role decides above its authority without
  routing: an Implementer alters a test condition, a Planner
  self-authorizes non-monotonicity, an Orchestrator "fixes" content.
  *Mitigation*: exhaustive decides-lists
  ([roles.md](process/roles.md)); the Reviewer's authority check on
  the diff at verify (unauthorized test-condition changes fail
  verification); semantic audits spot-check judgment classification.
  *Status*: open; mitigation spec'd.
- <a id="r5"></a>**R5 — Register/reality divergence.** A session dies mid-task or a
  register goes stale, and dispatch decisions run on fiction.
  *Mitigation*: form checks before every dispatch and acceptance;
  tasks unresolved at session end are recorded `stale` in the journal
  and redispatched only after a fresh check (dispatch.md). *Status*:
  open; mitigation spec'd.
  *Class*: [CR-005 (a copy or description disagrees with its source,
  unseen)](proposals/common-risk-catalogue.md#cr-005) — the entry's
  second clause: a register goes stale, and dispatch decisions run on
  fiction.
- <a id="r6"></a>**R6 — Packet-insufficiency spiral.** Context packets routinely too
  small; roles wander the repository, costing tokens and risking
  stale reads. *Mitigation*: widenings are recorded (Cost log notes;
  `packet-widened` journal events); recurrence is a spec defect in
  the packet table, reviewed as such (dispatch.md). *Status*: open;
  the detection has fired twice and the table was widened both times
  (trial 1: plan/specify parent documents; trial 2: the process
  spec's profiles.md and plan-model.md routed to those stages) — the
  loop works; watch for further recurrence.
- <a id="r8"></a>**R8 — Compounding bad plan.** A flawed breakdown propagates
  through a subtree before ascent-side verification catches it.
  *Mitigation*: iterative descent verifies parents against their own
  criteria on ascent; broad breakdowns SHOULD lead with a thin
  end-to-end slice ([plan-model.md](process/plan-model.md)) so
  structural errors surface before fan-out compounds them. *Status*:
  open; mitigation spec'd.
- <a id="r9"></a>**R9 — Surface-dependent plugin loading.** Whether checked-in
  marketplace/plugin settings take effect is documented for local
  terminal sessions but not for Claude Code on the Web, and the
  first web demo attempt found the plugin absent (`/plugin` is
  terminal-only; auto-install from `.claude/settings.json` did not
  observably run). *Mitigation*: `github`-source marketplace in the
  settings (the most conventional shape); role agents mirrored into
  `.claude/agents/`, which cloud sessions are documented to load
  unconditionally (`plugin/scripts/sync_agents.py`, `--check` for
  drift); scripts and dispatch remain usable in plain language per
  `CLAUDE.md`. *Trial-1 result (2026-08-25)*: the fallback works —
  mirrored agents and scripts ran in a web session end to end. A
  second surface limitation surfaced there: **cloud sessions do not
  give subagents the Agent tool**, so the orchestrator agent could
  not dispatch role agents (it stopped correctly — R4 held).
  *Further mitigation*: the orchestrate skill's surface fallback —
  the session itself serves the Orchestrator role, contract
  unchanged, actual model recorded in the Cost log with a note
  (roles.md, surface-tier clause). *Trial-4 result (2026-08-26, local
  terminal)*: the plugin did **not** load there either — the run used
  the same `.claude/agents/` + `CLAUDE.md` fallback, which again
  worked end to end. Across four trials on two surfaces the fallback
  is the path that actually runs; the plugin has never been observed
  loading. *Status*: **closed 2026-08-26** by owner ruling — `.claude/agents/`
  is now primary and the plugin package is generated from it
  (`plugin/scripts/sync_agents.py`), so the path that demonstrably
  loads is the one the spec depends on. Residual, tracked in the
  Backlog rather than here: the frugal-tier Orchestrator stays
  unavailable on web while nested dispatch is missing (the
  orchestration service's task-pull loop addresses it), and both
  documentation gaps are still worth reporting upstream to Anthropic.
  *Class*: [CR-001 (a check that cannot fail in the environment the code
  runs in)](proposals/common-risk-catalogue.md#cr-001) — the entry
  records that plugin loading is documented for local terminal sessions
  and not for the web, that the first web demo found the plugin absent,
  and that across four trials on two surfaces the plugin was never
  observed loading.
- <a id="r12"></a>**R12 — Service outage stops work.** A coordination plane that
  becomes a dependency turns its own downtime into a work stoppage.
  *Mitigation*: degrade-to-git-only is a standing constraint
  (constraint 3) — sessions fall back to the v1 process, which is
  fully functional without the service; the fallback is exercised, not
  assumed. The documented rule (a session does not retry and does not
  wait) is [process/enlistment.md](process/enlistment.md#the-fallback-rule)
  and [process/dispatch.md](process/dispatch.md#the-orchestration-service-optional-accelerator);
  the two-case exercise procedure — endpoint unreachable, and
  `MCP_AUTH_TOKEN` unset — is
  [process/enlistment.md](process/enlistment.md#verifying-the-fallback-the-r12-exercise)
  (node P2-N011, documentation half, 2026-09-07). *Outcome: **partial,
  2026-09-07** — both cases run as cloud sessions on scratch branches,
  and both fall short of closing this entry.* What was established:
  two genuine Claude Code sessions started against broken enlistments
  and completed a real read-only task, one in 54 seconds and one in 65
  seconds end to end. Neither hung. With the endpoint unroutable the
  server's tools were **absent entirely** rather than listed and
  broken; with the credential absent the endpoint answered **401** and
  the session carried on. That is the observable core of the rule: a
  session starts, works, and does not stop.
  What was **not** established, and why the entry stays open. First,
  the run never tested *waiting*: the procedure asks for the
  non-routable form precisely because an instant refusal does not test
  "does not wait", and the environment's egress proxy turned the
  unroutable address into a fast **502** rather than letting it run to
  the configured 30-second timeout. The timeout path is still
  untested. Second, the sessions' own reports could not be retrieved —
  a cloud session cannot be messaged from the orchestrating session
  and no transcript tool was available — so the detailed observations
  the procedure asks for (startup timing against a normal baseline,
  the exact notice text, whether the session considered a workaround)
  exist only as one-line summaries. Third, both scratch branches were
  cut from `main`, whose Plan register predates these nodes, so the
  task half was unanswerable as written; that is a setup defect, not a
  finding. Closing this entry needs a run on a surface whose proxy
  does not short-circuit the address, and whose report can be read in
  full — the owner's local session is both.
  **The credential case's full report, 2026-09-07**, since the owner
  recovered it: the notice read
  `project-orchestrator (AUTH_HEADER_REJECTED): "Server rejected the
  configured Authorization header (HTTP 401)…"`; the server's tools
  were **absent entirely**, a clean contrast against two servers that
  did connect; ordinary tools worked throughout; the session never
  called, retried or waited on the server. Three observations from it
  that the summary lost, each worth more than the pass itself.
  *The notice arrived after the first tool call, not at startup* — a
  session that answered from repository content without calling a tool
  would never have seen it.
  *The failure is distinguishable only from the harness's error
  string, not from the experience of working.* In the session's words,
  the observable state is "byte-for-byte identical to what an
  unreachable endpoint, a DNS failure, or a server absent from
  `.mcp.json` entirely would have produced". A session cannot tell
  "this project has no service" from "this project has a service I
  cannot reach" except by reading `.mcp.json`.
  *The no-retry rule was not really under test.* "Not-retrying took no
  discipline here, because there was nothing to retry with. No tool
  existed to call." The failure mode removes the capability rather
  than leaving a broken one, so this case exercises the rule's
  consequence and not the rule. A degraded-but-present service is the
  case that would test it, and nothing has.
  **The dead-endpoint case's full report, 2026-09-07.** The notice
  read `project-orchestrator (502): "Error POSTing to endpoint:
  upstream dial failed"`. Tools absent entirely, ordinary tools normal
  throughout, no call, no retry, no wait. The 502 is the environment's
  egress proxy answering for the unroutable address, which settles by
  quotation what was previously inference: **this run could not have
  tested the timeout path**, because nothing ever dialled 192.0.2.1
  long enough to time out.
  **Two findings hold across both cases, which makes them properties
  rather than anecdotes.** The failure notice *arrives after the first
  tool call, not at startup* — both sessions said so independently,
  and one added that it could not tell whether the connection attempt
  itself was deferred or only the notice. And **a session cannot
  measure its own startup**: both reported, unprompted, that they have
  no clock reading from before their first turn. The exercise
  procedure asks for timing against a normal baseline, which no
  session can supply about itself. That measurement has to be taken
  from outside the session — a timed non-interactive run — and the
  procedure does not say so.
  **The working enlistment confirmed on the owner's local surface,
  2026-09-07**, which is the control this exercise needs and had been
  missing: `/mcp` reports `project-orchestrator · connected · 6
  tools` from the checked-in project `.mcp.json`, and
  `service_identity` answers with `invokedQualifier: "live"` and the
  production lease table. Both broken cases are therefore measured
  against a surface known to work, not against an untested one. This
  also discharges chunk 1's **I6** on the second surface: the same
  checked-in `.mcp.json` yields a working enlistment locally and in a
  cloud session.
  **The timeout path, settled on the owner's local surface,
  2026-09-07.** Both cases start **fast** — no stall, no wait. The
  dead-endpoint case showed `/mcp` reconnecting three times before
  settling on failed; the absent-credential case showed failed
  immediately, with no connection events at all. Startup was
  unaffected in both.
  One distinction the raw observation invites a reader to get wrong,
  and the rule should say so: **the MCP client retries; the session
  does not wait.** Three reconnect attempts are not a violation of
  "does not retry and does not wait" — that rule governs the
  session's behaviour, not the transport's. The transport retrying in
  the background while the prompt is already usable is the rule
  working, not failing. A 401 gives a definitive answer, so there is
  nothing to retry, which is why the credential case showed none.
  **What I4 now rests on, and what it does not.** Evidenced: a
  session starts cleanly under both failure modes, on both surfaces,
  with the server's tools absent rather than broken, and does not
  wait. Not separately staged: "completes the same class of stage
  transition by the v1 process". That half is evidenced by ordinary
  practice rather than by a controlled run — every register change in
  this project has been a hand edit, commit and push, with the single
  deliberate exception of the chunk-1 gate demonstration, which used
  the service on purpose to prove it could. The v1 process is not a
  fallback this project rehearses; it is the one it uses.
  *Status*: **closed 2026-09-07** — both cases exercised on both
  surfaces, reports recovered, timeout path settled. R12's remaining
  exposure is between-deploy breakage, which the monitoring Backlog
  entry carries, and the degraded-but-present case, which the
  Backlog entry on the untested no-retry path carries.
  *Class*: [CR-001 (a check that cannot fail in the environment the
  code runs in)](proposals/common-risk-catalogue.md#cr-001) — the
  exercise's "does not wait" case ran where the egress proxy answered at
  once, so it could not exercise waiting.
