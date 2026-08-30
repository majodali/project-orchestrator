# Plugin tooling on the portfolio stack

Status: active

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P1-N009; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node **P1-N009**, child of P1-N001
([orchestrator-v1](orchestrator-v1.md)). Not one of that plan's
enumerated chunks 1–6: a Backlog-discovered node, in the same
position as [P1-N008](p1-n008-mtool-checker-extension-point.md) and
placed before chunks 5 and 6 because close-out should follow the
tooling work rather than precede it.

## Outcome

The orchestrator's repo-local tooling runs on the portfolio's
declared stack, and the one grammar two repositories both parse —
the Plan register's — has **one implementation** they share, with a
mechanical guard against drift in place of the accidental
cross-check that sharing gives up.

Concretely, at `done`:

- `form_check`, `journal_tail` and `sync_agents` are TypeScript,
  authored and run on Node, with the same behaviour the Python has
  today and the same one-command invocation the owner and the roles
  already use.
- The Plan-register grammar and the node-lifecycle stage vocabulary
  exist once, in this repository, in a form the orchestration service
  can consume without a registry, a release cadence, or a build.
- The dispatch loop never lost a working form checker at any point in
  the transition, and the checker's agreement with its predecessor is
  a recorded, reproducible result rather than a claim.

## Why this node exists

**The ruling.** [RU-011](../rulings.md) settles that majodali
repo-local tooling and scripts are TypeScript/Node, the same answer
[RU-008](../rulings.md) gives services. The plugin's three Python
scripts were written a day before RU-008 and violated no ruling at
the time; RU-011 closes the gap the wording left open. The owner's
own framing (2026-08-29) is the reason to act on it now: *"I'd prefer
consistency and reuse across the portfolio — and these two projects
are very close."*

**The duplication is the real cost.** `form_check.py` parses the Plan
register in Python. Node P2-N009 added `src/planRegister/parser.ts`
in the service repository — the same grammar, in TypeScript, whose
own source comment records that it mirrors `form_check.py`'s
`NODE_RE`/`NODEISH_RE` "line for line", verified at acceptance to
agree with it on all 19 nodes of the real register. Two hand-kept
transcriptions of one specification
([plan-register.md](../process/plan-register.md)) in two languages in
two repositories is exactly the second-truth shape this project keeps
legislating against. Translating the Python into TypeScript and
leaving two copies would satisfy the letter of RU-011 and miss the
word the owner actually used, which was *reuse*.

**And the duplication is currently doing a job.** Running both
implementations against the real register is how the stage-vocabulary
gap surfaced: `form_check.py` rejects a stage outside its `STAGES`
set, the service's parser passes any stage string through as fact
(open Backlog item, routed to P2-N010). That accidental cross-check
dies with the duplication. A shared parser with one bug is worse than
two parsers that disagree loudly, so replacing that check is part of
this node's outcome, not an afterthought — see *Approach*, "What
replaces the cross-check".

## Approach

### One shared grammar unit, canonical here, vendored outward

The sharing mechanism is the central decision of this plan
(decision 1). The recommendation: **one canonical source file in this
repository, copied into the service repository by a generator with a
`--check` drift mode** — the same pattern this repo already runs for
`.claude/agents/` → `plugin/agents/`, and the same shape as the
`plan-register.sample.md` fixture the service already carries.

Canonical here, because this repository owns the grammar's
specification and Constitution Article 3 puts the machinery
mechanizing a spec with the spec (the standing rule in
[auditing.md](../process/auditing.md): where checker and spec
disagree, the spec is right). It is also the coordinating repo.

The shared unit is deliberately small and deliberately shaped to
travel: the node-line grammar, the hierarchy rules, the parse-error
reporting, and the lifecycle stage set **as data**. It carries no
runtime dependency and — the design intent worth stating here — no
relative imports, so it is a single file that Node can run as-is and
any consumer's TypeScript toolchain can compile as-is. What is *not*
shared is policy: the service reads a register and reports what it
finds; the checker reads a register and judges it. That separation
is what P2-N009's finding was groping for, and sharing the vocabulary
as data while leaving validation to each consumer resolves it
structurally.

Alternatives considered and rejected:

- **A published package** (npmjs or GitHub Packages). Buys real
  versioning; costs a registry, credentials in agent sessions, a
  release cadence, and a version-bump round trip for every grammar
  change. And it does not even solve the plugin's half: nothing runs
  `npm install` for a Claude Code plugin, so the plugin would have to
  vendor the package anyway. Rejected as maximum ceremony for a file.
- **A git submodule.** A plugin is consumed by cloning the
  marketplace repository; a submodule that is not fetched is an empty
  directory and a broken checker. Rejected as a correctness risk on
  the load-bearing path.
- **A git subtree.** Survives cloning, but the sync discipline is a
  process this specification does not describe and would have to
  grow, for one file.
- **A third repository for shared portfolio libraries.** Right answer
  at some future volume; today it is a repository, a Classification,
  an enrollment and a Backlog to serve about 150 lines. Revisit when
  there is a third consumer (Backlog item).
- **No sharing — translate and keep two copies.** Cheapest, and
  explicitly contrary to the owner's stated reason for the node.

### Running TypeScript with no build step

The scripts must work for someone who installed the plugin and never
ran a build, and equally from a plain checkout of this repository —
which is, per [R9](../open-risks.md), the path that has actually run
in every trial to date.

**Verified in this environment**: Node v22.22.2 executes multi-file
`.ts` directly — no flag, no build, no `node_modules`, imports
resolved through explicit `.ts` specifiers, from any working
directory. Node's type stripping is unflagged from v22.18 and v23.6;
below that it needs a flag, and Node 20 cannot do it at all. The
exact floor to declare, and the failure message when it is not met,
are for the specify stage.

So the recommendation (decision 4) is to **run the TypeScript source
directly**: zero runtime dependencies, erasable syntax only, with
`tsc --noEmit`, ESLint and a test runner as development dependencies
that never participate in running the tool. If the Node floor proves
unacceptable, the named fallback is a committed single-file bundle
with a `--check` drift guard — more machinery, and the same pattern
`sync_agents` already establishes, so it is a fallback and not a
cliff.

**One fact I could not establish and am not guessing about**: what a
`/plugin` install physically ships, and whether a build artifact or
`node_modules` could ride along. There is no plugin cache in this
environment to inspect, and R9 records that the plugin has never been
observed loading in four trials on two surfaces. What makes this
tolerable is that the recommended design is correct under *either*
answer — committed, dependency-free, directly runnable source needs
no install-time step to exist. Confirming the shipping behaviour is
an assumption for the specify stage to verify or record as unverified.

### What replaces the cross-check

Three things, in descending order of how much work they do:

1. **A conformance corpus shipped with the shared unit** — the real
   register plus adversarial fixtures (malformed node lines,
   duplicate IDs, hold markers, bad nesting, unknown stages) with
   their expected parses, run by every consumer. The accidental
   cross-check fired once, because a human happened to run both
   implementations; a corpus fires on every test run. This is
   strictly stronger than what is being given up.
2. **The stage vocabulary shared as data.** The specific gap the
   cross-check found was two places disagreeing about what a legal
   stage is. Shared as one exported constant derived from
   [plan-model.md](../process/plan-model.md), that particular
   disagreement becomes impossible; what remains is each consumer's
   choice of whether to validate, which is a policy question P2-N010
   settles openly instead of by accident.
3. **The Python as a differential oracle during the rewrite only.**
   The port's evidence of correctness is finding-for-finding
   agreement with `form_check.py` over the live register and the
   corpus, produced by a harness, not by inspection.

### Behaviour is the contract

The rewritten checker must produce the same findings as the current
one. Where the port discovers that the Python itself deviates from
[auditing.md](../process/auditing.md), the deviation is **preserved
in the port and recorded as a Backlog finding**, then fixed as a
separate deliberate change (decision 6) — a rewrite that also changes
behaviour cannot be verified by comparison.

### A transition that never breaks the loop

The Orchestrator runs the form checker before every dispatch
selection and at every acceptance, including during the tasks that
rewrite it. The transition is therefore staged so a working checker
exists continuously:

- The TypeScript checker lands **alongside** the Python, which stays
  the invoked one; equality against the oracle is established while
  nothing depends on the new code.
- The invocation sites move in **one commit** — the two skills,
  `plugin/README.md`, `CLAUDE.md`, and the Auditor role contract in
  `.claude/agents/` (mirrored into `plugin/agents/`) — with the
  Python retired in that same commit (W-003, decision 5). The
  acceptance following that commit runs the new checker; the
  acceptance preceding it ran the old one. There is no window in
  which the documented command does not exist.
- Retirement means deletion, not a permanent second opinion. An
  implementation nobody runs is not a check; git history keeps it
  retrievable; the corpus is the durable guard. Keeping it forever
  was considered honestly and loses on RU-011's own terms.

### Scope: this repository only

Under the default (decision 3), P1-N009 changes nothing in
`project-orchestrator-service`. It publishes the shared unit and the
drift check here; the service's adoption of it is a Backlog item for
a service-repo node — naturally **P2-N010**, which must open the
parser anyway to settle the stage-vocabulary question. This keeps the
node inside single-repo scope, avoids an immediate-class scope
expansion ([dispatch.md](../process/dispatch.md), "cross-repo reach
is scope"), and puts the adopting commit in the repository whose plan
accounts for it.

The consequence, stated plainly: at this node's `done`, reuse is
*enabled and mechanically checkable* but not yet *realised*. The
owner may prefer to finish it in one motion; that is decision 3.

### The `mtool` extension point

It does not change what to build now, and it adds one small
constraint. The
[extension-point proposal](../proposals/mtool-custom-type-checker.md)
sketches a declared checker whose entry point emits JSON findings.
That contract is still under discussion upstream and RU-004's
precedent is sketch-only, so **no `--emit=json` mode is built here**
(Backlog item). What this node should do is keep **one stable
entry-point path** for the checker, so adopting whatever contract
upstream settles on is a declaration rather than a restructuring.
The proposal document itself is closed and its evidence link is
pinned to a commit SHA, so the rewrite cannot invalidate it
(decision 8).

## Leaf or interior

**Interior.** This is past single-session size, which is the C1
profile's threshold for requiring breakdown: three scripts, a
toolchain this repository does not yet have at all (no
`package.json`, no tests, no `.gitignore` today), a cross-repo
sharing unit with its corpus, and a staged cutover of the tool the
dispatch loop depends on.

Sketch of candidate children, one line each — leading with a thin
end-to-end slice per [R8](../open-risks.md). **Their IDs and their
verification criteria are not mine to issue**: the Orchestrator
issues IDs, and the break-down stage defines the children and their
criteria.

- Iteration zero plus the thin slice: the TypeScript toolchain in
  this repository, proven end to end by porting `journal_tail` — the
  smallest script, one invocation site, and the one whose failure
  cannot stop the dispatch loop.
- The shared Plan-register grammar unit: the grammar, the stage
  vocabulary as data, the conformance corpus, and the drift-check
  tool.
- The form checker on the shared unit, proven finding-for-finding
  against the Python oracle while the Python stays the invoked one.
- The cutover: invocation sites, documentation, role contracts, and
  retirement of the Python, in one commit.
- `sync_agents` ported.

Two boundaries the break-down stage should settle rather than
inherit: whether `journal_tail`'s own register read adopts the shared
unit in the first child or the second, and whether `sync_agents`
rides with the toolchain child or the cutover.

## Dependencies and ordering

- **No sibling override needed.** P1-N009's earlier siblings
  (P1-N002–N005, P1-N008) are all `done`, so
  [dispatch.md](../process/dispatch.md)'s earlier-siblings-`done`
  default is satisfied for `execute` without an owner override.
- **P2-N010 should follow this node's shared-unit child.** If P2-N010
  executes first it has nothing to adopt and the service-side
  vendoring becomes a later, separate commit — workable, but it
  wastes the natural moment. This is a register-ordering
  recommendation for the Orchestrator, not a hard blocker.
- **P2-N009 does not block anything here.** It is `verifying` and
  blocked on owner action O3; its parser is already written and
  readable.
- **P1-N006 and P1-N007 follow.** The pilot exercises this tooling
  and close-out reports on it; both are better served after it.

## Standing constraints this work respects

From the founding plan's six, the ones that bite here:

1. **Methodology compliance** — this repo at v1.3.0. The Node
   toolchain arrives as ordinary development dependencies; it changes
   no Classification field (still C1 / S0 / component-library /
   none-local) and introduces no deviation.
2. **Documentation is the spec** (constraint 3). The checker is a
   built artifact of [auditing.md](../process/auditing.md). No
   document under `docs/process/` changes its *content* because of
   this node; where the port and the spec disagree, the spec is right
   and the port has a bug. The `python3` commands quoted in
   `CLAUDE.md`, `plugin/README.md` and the skills are references to
   the artifact, not spec content, and they move with it (W-003).
3. **`mtool` is upstream** (constraint 4). Nothing orchestrator-
   specific is pushed upstream; the extension-point proposal is
   untouched.
4. **Judgment routing** (constraint 5) and **human gates**
   (constraint 6). Everything below is staged to the gate, with
   defaults, rather than settled in flight.
5. **Subscription billing** (constraint 2) is unaffected —
   `billing_check.sh` keeps guarding it, in whatever language
   decision 7 lands on.

Also binding: W-006 (outcome-named single-use branches), W-003
(documentation in the same commit as the work), K-003 (the Backlog
is the progress truth), and the single-writer rule — no role but the
Orchestrator writes the register, Cost log, or journal, including the
tooling that reads them.

## Monotonicity

Monotonic. This repository has no functional tests today, so no
previously defined functional test can be rewritten by definition;
the node in fact *creates* the first test corpus this repo has ever
had. The observable change is to documented commands (`python3 …` →
the Node invocation), which is an interface move, not a test rewrite.
No planned non-monotonicity is proposed.

## Owner actions

None beyond the gate under the recommended defaults. If decision 3 is
overridden, the owner grants write scope on
`project-orchestrator-service` for this node; if decision 1 is
overridden toward a published package, the owner provisions the
registry and its credentials.

## Decisions for the gate

Numbered per [dispatch.md](../process/dispatch.md)'s owner-decision
economics; a go-ahead adopts every default not overridden by number.
The Ruling register was checked for exact matches: RU-008 and RU-011
settle the language question (so it is not asked below); RU-006
(when a capability earns its own repository) is the near-match behind
decision 1's rejection of a shared-library repo; RU-004 (sketch, not
implementation, while a contract is under discussion) is the
near-match behind decision 8. No active ruling decides any of the
following.

1. **How do the two repositories share the register grammar?**
   Options: (a) one canonical copy here, vendored into the service by
   a generator with a `--check` drift mode; (b) a published package
   on a registry; (c) a git submodule; (d) a git subtree; (e) a third
   shared-library repository; (f) no sharing — two implementations.
   Default: **(a)** — the least machinery that makes drift
   mechanically detectable, with an in-repo precedent
   (`sync_agents --check`), no registry, no release cadence, and no
   clone-time dependency on the path the dispatch loop runs.
2. **Which repository holds the canonical copy?** Default: **this
   one** — it owns the grammar's specification, and Article 3 puts
   the machinery mechanizing a spec with the spec; it is also the
   coordinating repo.
3. **Does P1-N009 also land the service-side adoption?** Options:
   (a) no — publish here, adopt at P2-N010 under the service repo's
   own scope; (b) yes — grant write scope on the service repo now and
   finish reuse in one motion. Default: **(a)** — it keeps the node
   single-repo, avoids an immediate-class scope expansion, and puts
   the adopting commit in the repository whose plan accounts for it.
   The honest cost: at `done`, reuse is enabled but not yet realised.
4. **How does the TypeScript run without a build step?** Options:
   (a) direct-run `.ts` source under Node's type stripping, zero
   runtime dependencies; (b) a committed bundle built by `esbuild`,
   with a `--check` drift guard. Default: **(a)** — verified working
   on Node v22.22.2 here, and it is the only option that is correct
   whether or not a plugin install can carry build artifacts, which
   is a fact this plan could not establish. (b) stays the named
   fallback if the Node ≥22.18 floor proves unacceptable.
5. **What happens to the Python at cutover?** Options: (a) deleted in
   the same commit that moves the invocation sites; (b) kept as a
   permanent independent second opinion; (c) kept temporarily,
   deleted later. Default: **(a)** — an implementation nobody runs is
   not a check, git history keeps it retrievable, and (b) is in real
   tension with the consistency RU-011 was minted for. It remains the
   differential oracle right up to that commit, which is where its
   value actually is.
6. **If the port finds the Python deviating from the spec, fix it or
   preserve it?** Default: **preserve in the port, record the
   deviation as a Backlog finding, fix separately** — one variable at
   a time, or the equality evidence proves nothing.
7. **Does `billing_check.sh` get rewritten too?** Default: **no,
   leave it shell** — it is a ten-line SessionStart hook that tests
   one environment variable, where zero startup cost and zero runtime
   dependency matter more than language uniformity, and RU-011's
   target is tooling whose logic is worth reusing. Stated as a
   recommendation rather than assumed: a shell script does sit oddly
   in a TypeScript portfolio, and the owner may prefer uniformity
   over the ~10ms and the one less runtime assumption at session
   start.
8. **Does the undelivered `mtool` proposal get refreshed?** Default:
   **no — leave it unchanged, note the rewrite at delivery** — it is
   closed, its sketch is labelled illustrative, and its evidence link
   is pinned to a commit SHA that the rewrite cannot invalidate. No
   `--emit=json` mode is built now (RU-004's precedent); the port
   only keeps one stable entry-point path so adopting the contract
   later is cheap.
9. **What toolchain conventions does this repo adopt?** Default:
   **the service repo's** — ESLint flat config with typescript-eslint,
   Prettier, Vitest, `"type": "module"`, Node ≥22, lockfile committed,
   `node_modules` ignored. Consistency across the two repos is the
   whole point of RU-011; divergence here would be self-defeating.
10. **Is P1-N009 owner-gated, and where?** Default: **yes — gate at
    the node's `verifying`** — the cutover changes the commands the
    owner types and the instructions the Orchestrator reads, so one
    review before it is accepted is cheap insurance on the loop's own
    tooling. (C1's profile leaves gate designation to the owner,
    which is why it is asked; RU-005 is the near-match precedent for
    gating at `verifying`.)

## References

- [orchestrator-v1](orchestrator-v1.md) — parent plan; standing
  constraints
- [rulings.md](../rulings.md) — RU-011 (repo-local tooling is
  TypeScript/Node), RU-008, RU-006, RU-005, RU-004
- [auditing.md](../process/auditing.md) — the invariants the checker
  mechanizes, and the spec-is-right rule
- [plan-register.md](../process/plan-register.md) — the grammar being
  shared
- [plan-model.md](../process/plan-model.md) — the stage vocabulary,
  and the feature-first decomposition guidance
- [profiles.md](../process/profiles.md) — C1 profile: breakdown above
  single-session size, criteria-list specifications
- [dispatch.md](../process/dispatch.md) — owner-decision economics,
  dependency default, cross-repo reach as scope
- [open-risks.md](../open-risks.md) — R8 (thin slice first), R9 (the
  plugin has never been observed loading)
- [p1-n008 plan](p1-n008-mtool-checker-extension-point.md) — the
  sibling Backlog-discovered node this one is shaped after

## Gate outcome, 2026-08-29

All ten staged decisions adopted as defaulted; none overridden. The
owner had separately raised whether the two repositories should be
combined into one, which would have dissolved decision 1 entirely,
and judged against it after weighing the costs — a single repository
must declare one S-level and one Type, so the documentation tree
would inherit the service's S1 obligations and one of the two Type
declarations would be false (Article 4); and this pair is the only
live exercise of the multi-repo coordination the process spec
describes. [RU-006](../rulings.md) therefore stands unamended, and
decision 1's vendoring answer is captured as
[RU-012](../rulings.md).

