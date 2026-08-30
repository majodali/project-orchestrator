# Plugin tooling on the portfolio stack — specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document for
     node P1-N009; it goes `active` when the owner accepts it and the
     breakdown at this node's gate, and `closed → Backlog entry` when the
     node reaches `done`. -->

Node **P1-N009**, child of P1-N001
([orchestrator-v1](../plans/orchestrator-v1.md)), specifying the
outcome fixed by its
[plan](../plans/p1-n009-plugin-tooling-portfolio-stack.md). The plan
decided *what* and *why* — the repo-local tooling moves to
TypeScript/Node per [RU-011](../rulings.md), and the one grammar two
repositories parse gets one implementation with a mechanical guard
against drift — and decided that the node is **interior**, with five
sketched children. All ten of its decisions were adopted as defaulted
at the gate of 2026-08-29, and decision 1's answer is now
[RU-012](../rulings.md). Nothing here reopens any of them.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria: integration is verified where it was specified
([plan-model](../process/plan-model.md)). So everything below is a
property no single child establishes — an equivalence, a composition,
or a whole-node invariant. Where a criterion needs a child to do
something it was not already going to do, that addition is named in
*The breakdown* rather than left implicit.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)).

**On inherited properties.** P1-N001 has **no specification
document** — it is the founding plan and predates the specify
convention, so there are no parent integration properties to inherit
the way a P2-N002 child inherits from that node's spec. What binds
from above instead is the founding plan's standing-constraint list, as
the plan's *Standing constraints this work respects* section already
carries it, plus the process spec itself. A reader looking upward for
a parent specification will not find one, and that is a fact about
P1-N001, not a gap here.

## What "done" looks like at this node

Made decidable, the plan's outcome is one sentence with three parts
that can each be checked by someone who did not do the work:

> The repository's own tooling runs on Node with **no build step and
> no installed dependency**; the register grammar and the lifecycle
> stage vocabulary exist exactly once here, in a form a second
> consumer can take unchanged; the rewritten checker's agreement with
> the checker it replaced is a **recorded, re-runnable result over a
> corpus that includes registers which fail**; and at no commit in the
> node's history did the command this repository tells the
> Orchestrator to run fail to exist or fail to run.

The criteria are grouped: **B** is behavioural equality with the
retired checker; **D** is the drift guard that replaces the accidental
cross-check; **T** is the shared unit's fitness to travel; **C** is
cutover completeness and loop continuity; **P** is the process and
register state the node must leave behind.

Throughout, "the checker" means the ported form checker and "the
Python" means `plugin/scripts/form_check.py` as it stands at this
node's first commit.

## Verification criteria

### B. Behavioural equality with the retired checker

- **B1 — The comparison corpus contains registers that fail.**
  Agreement on the live register proves almost nothing, because the
  live register passes. A conformance corpus is committed in this
  repository in which each fixture is a **minimal project root** — a
  directory carrying whatever of `docs/plan-register.md`,
  `docs/backlog.md`, `docs/cost-log.md`, `docs/classification.md`,
  `docs/rulings.md` and `orchestration/journal.jsonl` the case needs —
  so that both implementations can be run against it by passing the
  directory as their project-root argument, which both already accept.
  The corpus contains, at minimum: the live register tree as of the
  cutover commit; **at least one fixture that provokes every finding
  rule the Python can emit** — `register-parse`, `register-id`,
  `register-stage`, `register-structure`, `backlog-ref`,
  `costlog-form` (malformed row, malformed task ID, duplicate task ID,
  and the non-sequential *warning*), `journal-form` (bad JSON, missing
  field, unknown event kind), `journal-crosscheck` (both directions),
  `liveness` (stale hold marker on `done`; `executing` with neither
  hold marker nor open dispatched task), `rulings` (undefined ruling,
  inactive ruling, missing Applied entry), `definitions` — and the
  not-enrolled case (no register: the informational message and exit
  0). *Verifier check*: run the corpus and collect the distinct rule
  IDs produced; the set equals the checker's declared rule set, and
  the corpus's own manifest names which fixture covers which rule.
- **B2 — Equality is finding-for-finding, and mechanically decided.**
  For every fixture, the two implementations produce the same
  **multiset of `(severity, rule, path relative to the fixture root)`
  fingerprints** — the shape [auditing.md](../process/auditing.md)
  already names as the audit delivery shape — the same total finding
  count, and the same exit code. Message prose is compared too, but
  exact wording equality is not required; **any difference that
  changes which line, node, task or ruling a finding names is a
  violation, not a wording difference**, and every surviving wording
  difference is enumerated with a one-line justification in the
  child's task result.
- **B3 — The comparison is a committed harness, not an inspection.**
  A single command runs both implementations over the whole corpus and
  the live register and exits non-zero on any disagreement. It is
  committed, it is re-runnable by a verifier for as long as the Python
  exists, and its output at the commit **immediately before** the
  cutover is the recorded evidence.
- **B4 — The evidence survives the oracle's deletion.** The corpus
  carries **expected findings generated from the Python and reviewed**
  before the retirement commit. After retirement the corpus is checked
  against those recorded expectations, so "the port matches the
  Python" remains a re-runnable fact rather than a claim about a file
  that no longer exists. *Verifier check*: the expectations are
  committed before the cutover commit (git history shows the order),
  and the checker's own corpus run at `done` passes against them.
- **B5 — Preserved deviations are visible, both ways (decision 6).**
  Where the port discovers the Python deviating from
  [auditing.md](../process/auditing.md) and preserves the deviation,
  the preserving code site says so, citing the document, and a Backlog
  entry records it. *Verifier check*: the set of annotated sites and
  the set of Backlog entries are the same set. The Python's already
  documented v1 approximations (the `broken-down`/`done` exclusion
  from the Backlog-reference check; the journal cross-check
  approximated by the accepted-event/cost-row correspondence) carry
  over unchanged and unannotated — they are documented spec-conformant
  simplifications, not deviations.

### D. The guard that replaces the accidental cross-check

Two independent implementations of one grammar are a real guard today:
it is how the P2-N009 stage-vocabulary gap surfaced. Sharing gives
that up deliberately, so at `done` the replacement must exist, not be
planned.

- **D1 — One vocabulary, as data.** The lifecycle stage set and the
  node-line grammar exist exactly once in executable form in this
  repository, in the shared unit, cited to
  [plan-model](../process/plan-model.md) and
  [plan-register](../process/plan-register.md). *Verifier check*: a
  search of the repository's TypeScript sources for stage-name string
  literals and for node-line regular expressions returns hits only
  inside the shared unit and inside the corpus fixtures. The Python's
  `STAGES` set and `NODE_RE`/`NODEISH_RE` have no surviving twin —
  including inside `journal_tail`, which has its own transcription
  today.
- **D2 — The corpus contains the disagreement that motivated it, and
  the guard is proven by breaking it.** A fixture carries a register
  with a stage outside the vocabulary — the real case, a misspelled
  `[verifiying]` — with a comment naming the P2-N009 finding it
  encodes, and an expectation that records both readings: the parse
  succeeds and reports the stage string as written, *and* the checker
  raises a `register-stage` violation. *Verifier check, executable*:
  temporarily remove the checker's stage-vocabulary check (or add the
  misspelling to the shared stage set), run the corpus, and observe it
  **fail, naming that fixture**; revert. The observed failure output is
  recorded in the task result. A guard is confirmed by watching it
  fire, not by finding it present.
- **D3 — The guard runs without anyone remembering.** Per decision 13
  below, the corpus check runs on **every form-checker invocation** —
  therefore before every dispatch selection and at every acceptance,
  which is the highest-frequency path this project actually has. A
  corpus failure exits non-zero with a message that plainly
  distinguishes *the checker disagrees with its own corpus* from *the
  register is malformed*. *Verifier check*: corrupt one expectation,
  run the checker against the clean live register, observe the
  distinct message and the non-zero exit; revert. Also: the checker's
  total wall-clock runtime on this repository is measured and recorded
  and stays under one second, so the guard is never worth switching
  off.
- **D4 — The drift mechanism is proven, not merely present.** No
  consumer has vendored the unit yet (decision 3), so the vendoring
  generator is proven against a scratch destination: vendor, `--check`
  passes; change one byte of the copy, `--check` exits non-zero naming
  the file; re-vendor, `--check` passes. Recorded output in the task
  result. The generated copy carries a "generated — do not edit here"
  banner, as `sync_agents` output does.
- **D5 — Nothing is guarded that is not shared.** The unit exposes the
  grammar and the vocabulary; it does not decide whether an unknown
  stage is an error. That judgment is the checker's, and the service's
  equivalent judgment is P2-N010's to make openly. *Verifier check*:
  no function exported by the unit returns a policy verdict
  ("violation", "invalid"); parse-level errors (a node-like line that
  does not parse, a duplicate ID) are facts and are the unit's, and
  are the only error-shaped thing it returns.

### T. The shared unit is fit to travel

Reuse is *enabled* here and *realised* at P2-N010 (decision 3). These
criteria are what make that later adoption a vendoring step rather
than a negotiation, and every one of them is checkable **without
touching the service repository**.

- **T1 — Self-contained by necessity, not by taste.** The canonical
  unit is a single file with **zero imports** — no relative import, no
  package import, no Node built-in — and performs no I/O: register
  text in, structure out. *Why it must be:* direct-run Node requires
  a `./x.ts` import specifier, while the service's `NodeNext` build
  requires `./x.js`, and the two are mutually exclusive at runtime —
  verified in this environment on Node v22.22.2, where a `.js`
  specifier resolving to a `.ts` file throws `ERR_MODULE_NOT_FOUND`
  under type stripping. A file with no relative imports is the only
  shape both consumers can take unedited. *Verifier check*: a search
  of the file for `import` and `require` returns nothing outside
  comments.
- **T2 — It compiles and lints under the consumer's settings.**
  `tsc --noEmit` over the canonical file under a configuration
  matching the service repository's (`strict`, `target ES2022`,
  `module`/`moduleResolution` `NodeNext`, `noUncheckedIndexedAccess`)
  passes, and ESLint under the service's flat-config shape
  (`typescript-eslint` recommended plus `eslint-config-prettier`)
  passes. Both are committed as named scripts so a verifier runs them
  by name. This is the whole of consumer-readiness that can be proven
  from this side, and it is proven.
- **T3 — The corpus travels with the grammar.** The set the vendoring
  generator copies includes the corpus and its expectations, so a
  consumer that takes the grammar also takes the tests that hold it
  honest, and `--check` covers them. *Verifier check*: the generator's
  manifest lists the corpus; the scratch-destination exercise in D4
  produces the corpus files at the destination.
- **T4 — Erasable syntax only.** The unit and every tool entry point
  use only syntax Node's type stripping erases — no `enum`, no
  parameter properties, no namespaces. *Verifier check*: every tool
  runs under `node <path>` with no flag, from a clean checkout with no
  `node_modules` directory present. This is the same check as C6 and
  is listed here because it is a property of the *unit*, which a
  consumer compiles rather than strips.

### C. Cutover completeness and loop continuity

- **C1 — Every invocation site moves, in one commit.** The complete
  inventory, verified by repository-wide search at this specification's
  writing:

  | Site | What names a script |
  |---|---|
  | `.claude/agents/auditor.md` | the Auditor contract's step 2 |
  | `plugin/agents/*.md` (six files) | the generated banner naming the generator — **regenerated, never hand-edited** |
  | `plugin/skills/enroll/SKILL.md` | the verify-and-commit step |
  | `plugin/skills/orchestrate/SKILL.md` | the preconditions command **and** the checker path handed to the orchestrator agent |
  | `plugin/skills/journal-tail/SKILL.md` | the render command |
  | `plugin/README.md` | the fallback paragraph and the Components list (all three scripts by name) |
  | `CLAUDE.md` | Build/run/test and Architecture at a glance |

  No document under `docs/process/` names any of the three scripts —
  verified — so the process specification's *content* is untouched by
  the cutover, as the plan's standing-constraint 2 claims.
- **C2 — No orphan reference, by a stated rule.** The rule that
  decides whether a mention moves: **a mention a reader will act on in
  the future moves; a mention recording what was done in the past
  stays.** After the cutover commit, a repository-wide search for
  `form_check.py`, `journal_tail.py`, `sync_agents.py` and `python3`
  returns matches only within this permitted set:
  `orchestration/journal.jsonl` and `docs/cost-log.md` (append-only
  history, and not ours to rewrite); `docs/rulings.md` and
  `docs/open-risks.md` (Orchestrator-owned; R13 already narrates this
  very move); the **Completed** section of `docs/backlog.md`;
  `docs/plans/p1-n008-*.md` and `docs/specs/p1-n008-*.md`
  (`closed → Backlog entry`); `docs/plans/p1-n009-*.md` and this
  document (this node's own argument and criteria);
  `docs/proposals/mtool-custom-type-checker.md` (decision 8 leaves it,
  and its evidence link is SHA-pinned); and
  `docs/plans/p2-n002-service-skeleton.md` /
  `docs/specs/p2-n002-service-skeleton.md` **subject to decision 14**.
  A match outside that set is a defect. Rewriting the historical
  mentions to pretend the Python never existed would be a defect too.
- **C3 — The generated copies are generated.** The ported
  `sync_agents --check` passes at the cutover commit and at `done`,
  and regenerating `plugin/agents/` produces an empty diff — no file
  under `plugin/agents/` was hand-edited during the cutover, including
  the banner line that the generator itself writes.
- **C4 — Retirement is deletion, in the moving commit (decision 5,
  W-003).** One commit contains the deletion of `plugin/scripts/*.py`
  **and** every site edit in C1 **and** the documentation that
  describes them. *Verifier check*: `git show --stat` of that single
  commit shows both halves; no commit anywhere in the node's history
  has a documented command pointing at a file absent from that same
  commit.
- **C5 — The loop never broke, checked after the fact.** The
  invariant: *at every commit in this node's history, the command this
  repository's own `CLAUDE.md` tells the Orchestrator to run exists at
  that commit and exits 0 on that commit's live register.* Checked by
  walking the node's commits (`git rev-list` over its branches),
  checking out each into a scratch worktree, reading the checker
  command out of that commit's `CLAUDE.md` Build/run/test line, and
  running it. Every commit exits 0; the walk's output is attached at
  `verifying`. Corpus fixtures are deliberately malformed registers
  and live under the corpus directory, so they never enter this check
  — if any commit is an exception for another reason, it is named and
  justified rather than passed over.
- **C6 — Both entry paths, from anywhere.** The plugin-relative path
  (`${CLAUDE_PLUGIN_ROOT}/scripts/…`) and the repository-relative path
  (`plugin/scripts/…`) name the same file. Each tool runs correctly
  when invoked by absolute path from an unrelated working directory
  and with an explicit project-root argument, exactly as the Python
  does today, from a checkout with **no `node_modules` directory
  present**.
- **C7 — One stable entry-point path (decision 8).** Each tool has a
  single entry-point file that parses arguments and delegates, so the
  `mtool` extension point can later name it in a declaration and an
  `--emit=json` mode can attach at one place. *Verifier check*: a
  reviewer can state in one sentence where an output-format flag would
  attach, and the entry-point paths are the ones named in C1. No such
  mode is built now.

### P. Process and register state

- **P1 — Everything checks clean at `done`.** The **new** checker
  passes clean on this repository; `mtool audit form` and `mtool links
  check` pass clean over this tree (this node adds documents and
  links, so the link check is not a formality).
- **P2 — The Backlog is the truth (K-003, W-003).** The P1-N009 entry
  is rewritten to describe what actually shipped; the entries this
  node closes are closed and the ones it does not are honest about
  why; every finding this node produced — preserved deviations (B5),
  wording differences (B2), anything the port surfaced — has an entry.
  Register and Backlog stage designations agree.
- **P3 — Each child reached `done` against its own criteria**, in the
  dependency order the breakdown fixes, with the `sync_agents`
  ordering constraint below respected.
- **P4 — The record exists.** A Cost log row for every dispatched task
  of this node and a run-journal entry for every stage change and for
  the gate. The Orchestrator writes these; the verifier checks they
  are there.
- **P5 — Decisions are closed.** The plan's decisions 1–10 were
  adopted at the gate of 2026-08-29; this document's 11–14 are adopted
  or overridden, and any override is reflected in the affected child's
  criteria **before that child executes**.
- **P6 — Nothing about the project's declaration changed.**
  Classification is still C1 / S0 / component/library / none-local
  with no deviation recorded; the Node toolchain arrives as
  development dependencies only; `node_modules` is ignored and the
  lockfile is committed; no credential, token, or environment file
  enters the tree.
- **P7 — The gate is represented.** Decision 10 puts an owner gate at
  this node's `verifying`; while it holds there the register carries a
  `[gated: …]` hold marker, so the node satisfies the checker's own
  liveness invariant rather than reading as falsely in-flight.

**B, D and T are what a verifier runs. C is what a verifier reads out
of git after the fact. P is the state the repositories are left in.**

## How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria; a Reviewer pass is by owner request. This node's
`verifying` is an evidence assembly — each criterion above answered
with a pointer to a commit, a recorded command output, a document, or
a register entry — plus three things a verifier executes rather than
reads: the corpus run (B1, B4), the two mutation exercises (D2, D3),
and the commit walk (C5). Then the owner gate (decision 10).

## Not verified here

Named so their absence is not read as oversight:

- **Service-side adoption (P2-N010).** At this node's `done` the
  service repository is untouched: no vendored copy exists there, its
  `src/planRegister/parser.ts` still stands, and the cross-consumer
  half of the drift guard — the service running the same corpus — is
  P2-N010's to establish. Reuse is enabled and mechanically checkable,
  not realised. This is decision 3's accepted cost, restated as a
  boundary.
- **`--emit=json`** and any `mtool` declaration of the checker
  (decision 8, RU-004). Only the stable entry-point path is preserved.
- **`billing_check.sh`**, which stays shell (decision 7) and keeps
  guarding constraint 2 unchanged.
- **A shared-library repository** (RU-006, revisit at a third
  consumer).
- **CI in this repository.** There is none, and this node does not add
  one; that is precisely why D3 puts the corpus check on the
  checker's own invocation path rather than on a test run somebody has
  to remember.
- **What a `/plugin` install physically ships**, and what
  `${CLAUDE_PLUGIN_ROOT}` resolves to in practice (open Backlog item).
  The design is correct under either answer, and per
  [R9](../open-risks.md) the plugin has never been observed loading —
  so no criterion above is conditioned on it loading. C6 checks both
  path shapes textually and the repository-relative path
  operationally.
- **The checker's behaviour beyond this repository's scale**, and the
  behaviour of the tools on registers of other enrolled projects
  (there are none yet).

## The breakdown

**The plan's five sketched children are the right cut** — the thin
end-to-end slice still leads ([R8](../open-risks.md)), the shared unit
still precedes the checker that depends on it, and the cutover still
follows the equality evidence. Writing the criteria exposed one
ordering defect, one boundary that must now be settled a particular
way, and a list of additions. Children, their IDs and their own
criteria issue at the break-down stage; what follows is input to it.

**Finding — the fifth child cannot follow the fourth.** The sketch
ends with "`sync_agents` ported" *after* the cutover child. That is
not consistent with decisions adopted at the gate: `CLAUDE.md` names
`sync_agents.py` and is an invocation site the cutover commit
rewrites, and decision 5 retires the Python in that same commit. If
`sync_agents` is not already ported when the cutover lands, the commit
either rewrites `CLAUDE.md` to name a file that does not exist
(breaking C5) or leaves one Python script and one stale line behind
(breaking C2 and C4). **The constraint is binding: `sync_agents` is
ported no later than the cutover child.** Its *placement* remains the
break-down stage's to choose — folded into the cutover child, or moved
forward into the toolchain child — which is one of the two boundaries
the plan already flagged. Either choice leaves four children, not
five.

**The plan's other flagged boundary, settled by D1.** Whether
`journal_tail`'s register read adopts the shared unit in the first
child or the second is no longer free at the *node* level: D1 requires
that at `done` no transcription of the grammar survives outside the
shared unit, and `journal_tail` carries one today. A transient second
copy inside the node is acceptable; surviving the node is not. So if
the thin slice ports `journal_tail` before the unit exists, the
shared-unit child must re-point it, and D1 is that child's criterion
as well as the node's.

Additions the children need in order for the criteria above to be
checkable, in the sketch's order:

- **Iteration zero / thin slice (toolchain + `journal_tail`)** — the
  Node floor and its preflight (decision 12) land here, with the
  version comparison unit-tested rather than asserted; `.gitignore`
  for `node_modules`; `package.json`, `tsconfig`, ESLint and the test
  runner in the service repository's shape (decision 9), with every
  place that configuration must diverge from the service's *enumerated
  in a comment* — at minimum, this repository type-checks source it
  never emits, so it needs `noEmit` and `allowImportingTsExtensions`
  where the service needs `outDir` and `.js` specifiers. And the
  standing property that the rest of the node must not erode: **the
  tools run from a checkout with no `node_modules` present**, proven
  by running them that way, not by intending it.
- **The shared grammar unit** — T1 (single file, zero imports, no
  I/O), T2 (compiles and lints under the consumer's settings), T3
  (the corpus travels), D5 (no policy in the unit); the corpus with
  per-rule coverage (B1) and the `[verifiying]` fixture with its
  provenance comment (D2); the vendoring generator with `--check`
  proven against a scratch destination (D4); and re-pointing
  `journal_tail` at the unit if the slice did not.
- **The form checker on the shared unit** — the differential harness
  as a committed one-command tool (B3); expectations generated from
  the Python and reviewed *before* any retirement commit (B4); the
  fingerprint-equality rule and the line/node-identity exception (B2);
  annotated deviation sites paired with Backlog entries (B5); the
  in-checker corpus self-check with its distinct failure message and
  its recorded runtime (D3); invocation from an arbitrary working
  directory with an explicit project root (C6).
- **The cutover** (including `sync_agents`, unless it moved forward) —
  the C1 inventory as its own criteria; the C2 permitted-survivors
  rule; single-commit move-plus-deletion-plus-documentation (C4);
  regenerate-and-diff-empty for `plugin/agents/` (C3); and decision
  14's edits if its default stands.

The commit walk (C5) and the evidence assembly are the **node's** own
work at `verifying`, not a child's.

## Decisions for the gate

Numbering continues the plan's sequence, so one go-ahead adopts one
list: the plan carries **1–10** (all adopted 2026-08-29), this
document carries **11–14**. Every default not overridden by number is
adopted. Checked against the [Ruling register](../rulings.md) for near
matches: RU-011 and RU-012 settle the language and the sharing
mechanism and are not re-raised; RU-004 is the near match behind
leaving `--emit=json` alone and is already applied by plan decision 8;
RU-005 is the near match behind gating at `verifying` and is already
applied by plan decision 10. No active ruling reaches the four below.

11. **The commands the owner and the roles type.** Options: (a) same
    directory, same base names, new extension —
    `node plugin/scripts/form_check.ts`; (b) a new top-level
    `tools/` or `scripts/` directory; (c) `npm run` scripts as the
    documented commands. Default: **(a)**. Rationale: it makes every
    invocation site a one-word edit, keeps the single stable
    entry-point path decision 8 asks for, and keeps the documented
    command runnable from a bare checkout — (c) would require an
    install that the no-build design exists to avoid.
12. **The Node floor, and what happens below it.** Options: (a)
    declare **Node ≥22.18** (and ≥23.6 on the 23.x line) and have each
    tool preflight the running version, exiting **non-zero** with a
    message naming the required version, the version found, and what
    to do; (b) additionally support Node ≥20 by documenting the
    `--experimental-strip-types` flag; (c) declare no floor and let
    the failure be whatever Node prints. Default: **(a)**. Rationale:
    it matches the service's `engines: node >=22` (decision 9), and
    [R13](../open-risks.md)'s named failure mode is *losing the
    checker silently* — a loud non-zero exit is what turns that into a
    blocked dispatch, which
    [auditing.md](../process/auditing.md) already says is the correct
    response to a check that cannot pass.
13. **What triggers the conformance corpus in this repository.**
    Options: (a) the form checker runs the corpus as a self-check on
    **every invocation** and fails the run on mismatch; (b) a test
    suite run by `npm test`, plus the Auditor's changed-day duty; (c)
    both, with (a) as the guarantee. Default: **(c)**. Rationale: this
    repository has no CI and the tools deliberately need no install,
    so a test-suite-only guard is exactly the "when a human remembers"
    trigger the accidental cross-check already was; the checker's own
    invocation is the one path that provably runs before every
    dispatch and at every acceptance. The cost is a few milliseconds
    on that path and a corpus that must stay fast (D3 bounds it).
14. **Two live criteria in P2-N002's documents name the command this
    node deletes.** `docs/plans/p2-n002-service-skeleton.md`
    (`Status: active`, criterion 9) and
    `docs/specs/p2-n002-service-skeleton.md` (`Status: draft`,
    criterion P2) both say `python3 plugin/scripts/form_check.py`
    passes clean — undischarged criteria that a verifier will execute
    at P2-N002's `verifying`, which falls after this node. Options:
    (a) the cutover commit updates the command in both, with a
    one-line note that it changed at P1-N009 and nothing about the
    criterion's substance changed; (b) leave both and let P2-N002's
    verifier translate; (c) treat editing another node's approved
    criteria as out of scope and carry it as a Backlog item for
    P2-N002 to absorb. Default: **(a)**. Rationale: they are live
    instructions, not history — K-007 makes an `active`/`draft`
    document a claim of current intent, and W-003 puts the
    documentation fix in the commit that invalidates it; the edit is a
    command rename with no change of substance, which is why it is
    surfaced by number rather than performed quietly. If the owner
    prefers (c), C2's permitted-survivors set keeps both files and the
    Backlog entry carries it.

## References

- [p1-n009-plugin-tooling-portfolio-stack](../plans/p1-n009-plugin-tooling-portfolio-stack.md)
  — this node's plan, its decisions 1–10, and the gate outcome of
  2026-08-29
- [orchestrator-v1](../plans/orchestrator-v1.md) — the parent plan and
  its standing constraints. **P1-N001 has no specification document**
  (it predates the convention), so there are no inherited integration
  properties; the constraint list is what binds from above.
- [auditing.md](../process/auditing.md) — the invariants the checker
  mechanizes, the finding-fingerprint shape B2 uses, the run
  frequencies C5 protects, and the spec-is-right rule
- [plan-register.md](../process/plan-register.md) and
  [plan-model.md](../process/plan-model.md) — the grammar and the
  stage vocabulary the shared unit carries; plan-model also carries
  the interior-node verification rule this document is written under
- [profiles.md](../process/profiles.md) — the C1 specification depth
- [rulings.md](../rulings.md) — RU-011, RU-012, RU-006, RU-005, RU-004
- [open-risks.md](../open-risks.md) — R13 (decision 12, C5), R9 (the
  no-build design and the plugin-loading caveat), R8 (thin slice
  first)
- [p2-n002-service-skeleton spec](p2-n002-service-skeleton.md) — the
  shape this document follows, and the subject of decision 14
