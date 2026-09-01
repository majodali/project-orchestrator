# Plugin tooling on the portfolio stack

Status: closed → Backlog entry

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

The plan stage sketched five candidate children and flagged two
boundaries for the break-down stage to settle rather than inherit:
whether `journal_tail`'s own register read adopts the shared unit in
the first child or the second, and whether `sync_agents` rides with
the toolchain child or the cutover. **That sketch is superseded by
*[The breakdown](#the-breakdown)* below**, written at the break-down
stage on 2026-08-30, which settles both boundaries and gives four
children with their own criteria. The sketch's substance is
preserved there — including what changed from it and why — so it is
not restated here.

## The breakdown

Written at the break-down stage, 2026-08-30, after the
[specification](../specs/p1-n009-plugin-tooling-portfolio-stack.md)
went `active` and its decisions 11–14 were adopted at the gate.
**Node IDs are the Orchestrator's to issue**; the children are named
by letter here. Each child's criteria below are that child's own —
this node's criteria are the specification's, and they are not the
union of these ([plan-model](../process/plan-model.md), the
interior-node verification rule).

The cut is four children. Decomposition here is **technical rather
than feature-first**, and [plan-model](../process/plan-model.md)
allows that below an atomic feature, with the reason recorded: this
node is one behaviour — *the tooling runs on Node and the grammar
exists once* — and no sub-behaviour of it validates separately. What
does separate is the order in which the pieces can be made to exist
at all, which is a technical constraint (a checker cannot be proven
against a corpus that does not exist; a corpus cannot be vendored by
a generator with no manifest). The first child is still a thin
end-to-end slice, per [R8](../open-risks.md).

**The breakdown raises no new owner decision.** The two choices it
makes were the ones the plan and the specification delegated to it
by name — where `sync_agents` lands, and where `journal_tail`'s
register read adopts the shared unit — and both are argued below
rather than staged. Decisions 1–14 stand as adopted; nothing here
reopens one.

### How the sketch changed, and why

**`sync_agents` is folded into the cutover child (boundary 2).** The
specification found the binding constraint — `CLAUDE.md:33` names
`sync_agents.py`, so the cutover commit rewrites it, and decision 5
retires the Python in that same commit, so `sync_agents` cannot be
ported afterwards. Two placements remained. The cutover is the right
one, for a reason the specification did not have: `sync_agents`
writes its own name into the files it generates
(`<!-- Generated from .claude/agents/ by sync_agents.py … -->`), so
porting it necessarily rewrites all six files under `plugin/agents/`.
Port it early and the repository spends three children in a state
where the generated banner names a generator the documentation does
not, and the surviving Python `--check` fails against its own output;
port it at the cutover and the banner change lands in the one commit
that is already rewriting every name. The port itself is 66 lines and
touches no register grammar, so it costs the cutover child little.

**The shared grammar unit moves forward into the first child
(boundary 1).** The sketch had the slice port `journal_tail` and a
second child build the unit; the specification observed that D1 then
forces the second child to re-point `journal_tail`, because a
transcription of the grammar may live inside the node but must not
survive it. The cheaper answer is for `journal_tail` to be born on
the unit: no transient second copy is ever written, no re-point is
ever needed, and D1 holds from the first child onward. Two further
arguments carry it. First, the unit is not new design — it is a
merge-and-adapt of `src/planRegister/parser.ts` and `types.ts` (257
lines of TypeScript that already exist and already mirror the
Python's `NODE_RE`/`NODEISH_RE`), plus the stage set as data, so it
is small work. Second, the riskiest structural fact in this whole
node is the one the specification had to verify by hand for T1 — that
a single file with zero imports is the only shape both a direct-run
Node tool and the service's `NodeNext` build can consume unedited.
R8's argument is that a structural error should surface in the slice,
and that is the structural error available to be made here. A slice
that proves the toolchain but not the shape it exists to carry would
be thin in the wrong dimension.

**The vendoring generator moves back to the second child.** Its job
is to carry *the travelling set*, and T3 makes that set the unit
**and** the corpus with its expectations. Building it before the
corpus exists means building it twice, or shipping a manifest that is
knowingly incomplete. It belongs where the last thing it carries is
finished.

**Two cuts were tested and rejected.** (a) *Five children, splitting
the unit out of the toolchain slice*: rejected above — it buys a
thinner slice at the price of a transient duplicate grammar and a
re-point step, and the unit is a port, not a design. (b) *Folding the
corpus into the shared-unit child*, as the sketch had it: rejected on
size. The corpus is roughly twenty minimal project roots, each hand-
tuned until `form_check.py` emits exactly the finding it is meant to
provoke and nothing else, plus a manifest, plus expectations captured
and reviewed. That is a session; a toolchain, a grammar unit and a
script port is a session. Together they are two, and a child that is
obviously two sessions is not leaf-sized.

### Proposed children, in dependency order

**Child A — The Node toolchain and the shared register grammar,
proven end to end by `journal_tail`.** Iteration zero plus the thin
slice. The repository gains a TypeScript/Node toolchain in the
service repository's shape (decision 9) that no tool needs in order
to *run*; the Plan-register grammar and the lifecycle stage
vocabulary become one zero-import file; and `journal_tail` is ported
onto that file, exercising the entire path — Node floor preflight,
direct-run `.ts`, the shared unit, a real project root — with the
script whose failure cannot stop the dispatch loop. Nothing is
retired and no invocation site moves: the Python remains the invoked
tooling throughout this child. Criteria:

1. **The toolchain is the service's, with divergence enumerated.**
   `package.json` (`"type": "module"`, `engines.node >= 22`,
   development dependencies only), TypeScript, ESLint flat config
   with typescript-eslint plus `eslint-config-prettier`, Prettier,
   Vitest, lockfile committed, `node_modules` git-ignored, and named
   scripts a verifier runs by name. Every place this repository's
   configuration must differ from
   `project-orchestrator-service`'s is enumerated in a comment in
   the file that differs — at minimum `noEmit` and
   `allowImportingTsExtensions` here against `outDir` and `.js`
   specifiers there.
2. **Two type-check configurations, both green.** The repository's
   own, and a **consumer-shape** one that compiles the canonical
   unit alone under `strict`, `target ES2022`, `module` and
   `moduleResolution` `NodeNext`, `noUncheckedIndexedAccess`, with
   no `allowImportingTsExtensions` (spec T2). ESLint passes over
   the tree. Both are named scripts.
3. **The unit is a single file with zero imports and no I/O**
   (spec T1): no relative import, no package import, no built-in;
   register text in, structure out. *Verifier check*: a search of
   the file for `import` and `require` returns nothing outside
   comments.
4. **One vocabulary, as data, and no policy in it** (spec D1, D5).
   The stage set and the node-line grammar exist exactly once in
   executable form, cited to
   [plan-model](../process/plan-model.md) and
   [plan-register](../process/plan-register.md). No exported
   function returns a policy verdict; parse-level facts (a
   node-like line that does not parse, a duplicate ID) are the only
   error-shaped things it returns. The unit's own tests cover each
   such fact, and parsing this repository's live register yields
   the same node set the Python's parser yields — ID, stage, hold
   marker, parent, line number.
5. **The Node floor preflights and exits loudly** (decision 12,
   [RU-013](../rulings.md)). One preflight, used by every tool this
   node ships, that on a runtime below 22.18 (below 23.6 on the
   23.x line) prints the version required, the version found, and
   what to do, and exits non-zero without performing the tool's
   work. The version comparison is **unit-tested against a table**
   — at least 22.17.x, 22.18.0, 23.5.x, 23.6.0, 24.x and a
   prerelease string — driving the comparison function directly
   rather than the running interpreter.
6. **It runs from a bare checkout** (spec T4, C6). Every tool this
   child ships runs as `node <path>` with no flag, with **no
   `node_modules` directory present**, by absolute path from an
   unrelated working directory, with an explicit project-root
   argument. Proven by doing it, not by intending it.
7. **`journal_tail` is equal to its predecessor.**
   `node plugin/scripts/journal_tail.ts [N] [project-root]` —
   same directory, same base name, same argument shape (decision
   11) — reproduces `journal_tail.py`'s output on this
   repository's journal for N = 1, N = 10 and N greater than the
   journal's length, and on the no-journal case (same message,
   exit 1). The compared outputs are recorded in the task result.
   Its node-name lookup goes through the shared unit; it carries no
   grammar of its own.
8. **Nothing is retired and nothing is re-pointed.** All three
   Python scripts remain; no invocation site changes; and
   `python3 plugin/scripts/form_check.py` passes clean at every
   commit of this child (decision 5, spec C4/C5).

*Depends on*: nothing — this is the node's first child.

**Child B — The travelling package: conformance corpus, recorded
expectations, and the vendoring generator.** What replaces the
accidental cross-check, built before the thing it will check. A
committed corpus of minimal project roots that provokes every finding
rule `form_check.py` can emit; expectations captured **from the
Python** and reviewed while the Python is still the authority; and
the generator that carries the unit and the corpus to a consumer with
a `--check` drift mode, proven against a scratch destination. No
consumer has vendored anything yet (decision 3), so the generator is
proven in the only way available from this side, which the
specification already accepted as sufficient. This child also settles
the shape of the evidence that must outlive the oracle: after the
cutover, "the port matches the Python" is a claim about a file that no
longer exists unless the expectations were written down first.
Criteria:

1. **Every rule is covered, and the manifest says which fixture
   covers it** (spec B1). Fixtures are minimal project roots
   carrying whatever of `docs/plan-register.md`, `docs/backlog.md`,
   `docs/cost-log.md`, `docs/classification.md`, `docs/rulings.md`
   and `orchestration/journal.jsonl` the case needs. The corpus
   contains the live tree as of this child's last commit and at
   least one fixture for each of: `register-parse`, `register-id`,
   `register-stage`, `register-structure` (both arms),
   `backlog-ref`, `costlog-form` (malformed row, malformed task ID,
   duplicate task ID, and the non-sequential *warning*),
   `journal-form` (bad JSON, missing field, unknown event kind),
   `journal-crosscheck` (both directions), `liveness` (stale hold
   marker on `done`; `executing` with neither hold marker nor open
   dispatched task), `rulings` (undefined ruling, inactive ruling,
   missing Applied entry), `definitions`, and the not-enrolled case
   (informational message, exit 0). *Verifier check*: the distinct
   rule IDs the corpus produces equal the declared rule set, and
   the manifest's fixture→rule mapping is complete.
2. **The motivating disagreement is in the corpus** (spec D2). A
   fixture carries the misspelled `[verifiying]` stage with a
   comment naming the P2-N009 finding it encodes, and an
   expectation recording both readings: the parse succeeds and
   reports the stage string as written, *and* the checker raises
   `register-stage`. (The executable half of D2 — breaking the
   guard and watching it fire — belongs to child C, which is where
   the checker exists.)
3. **Expectations are generated from the Python, reviewed, and
   committed here** (spec B4) — that is, before any retirement
   commit, with git history showing the order. The recorded shape
   is spec B2's: the multiset of
   `(severity, rule, path relative to the fixture root)`
   fingerprints, the total finding count, the exit code, and the
   message prose for later comparison. The reviewing session states
   in its result that it read every generated expectation.
4. **A one-command corpus runner exists and passes.** It runs
   `form_check.py` over the whole corpus and exits non-zero on any
   divergence from the recorded expectations. It is the oracle half
   of child C's differential harness and the durable check spec B4
   asks for.
5. **The corpus is inert to this repository's own checks.**
   Fixtures are deliberately malformed registers; they live under
   one corpus directory, and `python3 plugin/scripts/form_check.py`
   at the repository root still passes clean at every commit of
   this child. This is the precondition of the node's own commit
   walk (spec C5) and is checked here rather than discovered there.
6. **The corpus introduces no future orphan.** No fixture,
   manifest or expectation file adds a textual match for
   `form_check.py`, `journal_tail.py`, `sync_agents.py` or
   `python3` outside spec C2's permitted set — or, if one is
   unavoidable, this child names it so the cutover's search rule
   stays true rather than being amended after the fact.
7. **The generator carries the whole travelling set** (spec T3).
   Its declared manifest lists the canonical unit **and** the
   corpus with its expectations; it copies them into a destination
   directory and writes a "generated — do not edit here" banner
   into what it generates, as `sync_agents` output does. It is a
   Node tool under decision 11's shape, it preflights the Node
   floor, and it runs with no `node_modules` present.
8. **`--check` is proven by breaking it** (spec D4). Against a
   scratch destination: vendor, `--check` passes; change one byte
   of the copy, `--check` exits non-zero naming the file;
   re-vendor, `--check` passes. The observed output is recorded in
   the task result. The vendored copy of the unit — banner and all
   — still passes the consumer-shape type-check from child A,
   which is the whole claim that it is fit to travel.

*Depends on*: child A (the toolchain it is written in, and the unit
its manifest carries).

**Child C — The form checker on the shared unit, proven
finding-for-finding against the Python.** The port itself, and the
evidence that it is a port rather than a rewrite. `form_check`
becomes TypeScript on the shared grammar unit; a committed harness
runs both implementations over the corpus and the live register and
fails on any disagreement; and the corpus self-check that replaces
the accidental cross-check goes onto the checker's own invocation
path (decision 13), which is the only path in this repository that
provably runs before every dispatch and at every acceptance. The
Python is still the invoked checker at the end of this child: nothing
is deleted and no documentation moves, so the loop is untouched while
the evidence is produced. Criteria:

1. **One command decides equality** (spec B3). A committed harness
   runs both implementations over the whole corpus and the live
   register and exits non-zero on any disagreement. Its output at
   this child's last commit is the recorded evidence, attached to
   the task result.
2. **Equality is finding-for-finding** (spec B2). For every
   fixture: the same multiset of
   `(severity, rule, fixture-relative path)` fingerprints, the same
   total count, the same exit code. **Any difference that changes
   which line, node, task or ruling a finding names is a
   violation**, not a wording difference; every surviving wording
   difference is enumerated with a one-line justification in the
   task result.
3. **Preserved deviations are visible both ways** (spec B5,
   decision 6). Where the port finds `form_check.py` deviating from
   [auditing.md](../process/auditing.md) and preserves the
   deviation, the preserving site says so and cites the document,
   and a Backlog entry records it; the set of annotated sites and
   the set of entries are the same set. The two documented v1
   approximations carry over unchanged and unannotated.
4. **No second grammar** (spec D1). A search of the repository's
   TypeScript sources for stage-name string literals and node-line
   regular expressions returns hits only inside the shared unit and
   inside corpus fixtures.
5. **The guard runs unbidden, and is proven by breaking it**
   (spec D3, decision 13). The corpus self-check runs on **every**
   form-checker invocation; a corpus mismatch exits non-zero with a
   message that plainly distinguishes *the checker disagrees with
   its own corpus* from *the register is malformed*. Proven by
   corrupting one expectation, running against the clean live
   register, observing the message and the exit code, and
   reverting — output recorded. The checker's total wall-clock
   runtime on this repository is measured, recorded, and under one
   second.
6. **The stage guard is proven by breaking it too** (spec D2's
   executable half). Temporarily remove the stage-vocabulary check
   (or add `verifiying` to the shared stage set), run the corpus,
   observe it fail naming that fixture, revert. The observed
   failure output is recorded.
7. **One entry point, reachable from anywhere** (spec C6, C7,
   decision 8). A single entry-point file parses arguments and
   delegates; it runs by absolute path from an unrelated working
   directory with an explicit project-root argument, from a
   checkout with no `node_modules` present. A reviewer can state in
   one sentence where an `--emit=json` flag would attach; no such
   mode is built.
8. **The loop is untouched.** No invocation site changes, no Python
   is deleted, and `python3 plugin/scripts/form_check.py` passes
   clean at every commit of this child.

*Depends on*: child B (the corpus and expectations it is measured
against, and which its self-check runs), and through it child A.

**Child D — The cutover: `sync_agents` ported, every invocation site
moved, the Python retired, in one commit.** The last child and the
only one that changes what anybody runs. `sync_agents` is ported —
here, because its generated banner names it, and rewriting that
banner rewrites `plugin/agents/` — every documented command moves,
the three Python scripts are deleted, and the documentation that
describes them changes in the same commit (decision 5, W-003). After
this commit the equality harness's oracle no longer exists, which is
why the corpus expectations from child B are the evidence that
survives. Criteria:

1. **`sync_agents` is ported and still generates.**
   `node plugin/scripts/sync_agents.ts [--check] [project-root]`
   with the same behaviour and the same argument shape; the
   generated banner names the new generator; `--check` passes at
   the cutover commit and at `done`; regenerating `plugin/agents/`
   produces an empty diff, and no file under it was hand-edited,
   the banner line included (spec C3).
2. **Every invocation site moves, and only in this commit**
   (spec C1). The specification's seven-row inventory —
   `.claude/agents/auditor.md`, the six regenerated
   `plugin/agents/*.md`, `plugin/skills/enroll/SKILL.md`,
   `plugin/skills/orchestrate/SKILL.md` (both mentions),
   `plugin/skills/journal-tail/SKILL.md`, `plugin/README.md` (the
   fallback paragraph and the Components list), and `CLAUDE.md`
   (Build/run/test and Architecture at a glance) — is discharged
   row by row, and the discharge is re-verified by repository-wide
   search rather than by reading the table.
3. **One commit carries both halves** (spec C4). A single commit
   contains the deletion of `plugin/scripts/*.py`, every site edit
   above, and the documentation describing them. *Verifier check*:
   `git show --stat` of that commit shows both halves, and no
   commit in the node's history has a documented command pointing
   at a file absent from the same commit.
4. **No orphan reference, by the stated rule** (spec C2). *A
   mention a reader will act on in the future moves; a mention
   recording what was done in the past stays.* After the commit, a
   repository-wide search for `form_check.py`, `journal_tail.py`,
   `sync_agents.py` and `python3` returns matches only within the
   specification's permitted set. Rewriting the historical mentions
   to pretend the Python never existed is a defect, and is checked
   for as such.
5. **P2-N002's two live criteria are renamed** (decision 14,
   adopted). `docs/plans/p2-n002-service-skeleton.md` criterion 9
   and `docs/specs/p2-n002-service-skeleton.md` criterion P2 name
   the new command, each with a one-line note that it changed at
   P1-N009 and that nothing about the criterion's substance
   changed.
6. **The harness is retired with its evidence preserved.** The
   differential harness names `form_check.py` and cannot run once
   it is deleted; in this commit it is either removed or reduced to
   the expectations-only corpus runner. Whichever is chosen is
   stated with its reason, and running the corpus against the
   recorded expectations still passes afterwards (spec B4).
7. **The new checker is clean, from here on.** The ported checker
   passes clean on this repository at the cutover commit and at
   every later commit; its corpus self-check passes; and the
   documented command in `CLAUDE.md` states the Node floor where it
   states the command ([RU-013](../rulings.md)).
8. **The Backlog is the truth** (K-003, W-003, spec P2). In the
   same commit: the P1-N009 entry rewritten to what actually
   shipped, the entries this node closes closed and the ones it
   does not honest about why, and an entry for every finding the
   node produced — preserved deviations, wording differences,
   anything the port surfaced. The Plan register, Cost log and
   journal remain the Orchestrator's.

*Depends on*: child C (the equality evidence must exist before the
oracle is deleted), and through it B and A. It is the last child.

### Dependency order and parallelism

The order is **A → B → C → D**, and it is a strict chain: **no two
of these children are mutually independent**, so no parallel
dispatch is licensed at this node
([dispatch](../process/dispatch.md) — parallelism is a planning
product the owner has seen, never an Orchestrator improvisation).
Stated positively so the Orchestrator does not have to infer it: B
is written in the toolchain A creates and its manifest carries A's
unit; C is measured against B's corpus and runs B's expectations on
every invocation; D must not delete the oracle before C has produced
the evidence. The default dependency rule
([dispatch](../process/dispatch.md): entering `execute` requires
earlier siblings `done`) is therefore exactly right here and needs
no override.

### What stays with the node

Two things are the node's own work at `verifying`, not any child's,
and are listed here so they are not looked for in a child's result:
the **commit walk** (spec C5 — checking out every commit of the node
into a scratch worktree, reading the checker command out of that
commit's `CLAUDE.md`, and running it), and the **evidence assembly**
that answers each of the specification's criteria with a commit, a
recorded output, a document or a register entry. Then the owner gate
(decision 10).

## Dependencies and ordering

- **No sibling override needed.** P1-N009's earlier siblings
  (P1-N002–N005, P1-N008) are all `done`, so
  [dispatch.md](../process/dispatch.md)'s earlier-siblings-`done`
  default is satisfied for `execute` without an owner override.
- **P2-N010 should follow this node's shared-unit child** — which
  the breakdown places in **child A**, and whose travelling package
  (the corpus, the expectations and the `--check` generator) is
  finished in **child B**. The earliest useful moment for P2-N010 is
  therefore after B, not after A: vendoring a unit whose drift check
  does not exist yet is the same later separate commit by another
  name. If P2-N010
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

