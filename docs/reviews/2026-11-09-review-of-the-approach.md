# Review of the approach, 2026-11-09

Reader: the owner, returning (RD-2 in the methodology's reader
catalog), and a fresh session. The reader knows the methodology at
1.6.0 and this repository's README. Nothing else is assumed. Every
identifier below carries its name.

Companion: [the rebuild plan](../plans/rebuild.md), which turns this
review into milestones.

## Summary

- The software works. The service builds, passes 299 tests, deploys
  on merge, reads the plan from git, validates stage transitions and
  serves a web view. The plugin's form checker passes with 0
  violations over 59 nodes.
- The project is not usable for its purpose. Nothing coordinates
  sessions yet (the task-pull loop, chunk 4 of the service, has 0 of 4
  children built). The web view renders the same identifier-coded
  content that is hard to read in the repository.
- The cause is not the methodology's core and not short-lived agent
  sessions. The cause is that the project's state lives in prose
  registers with hand-written grammars, and that most of the work has
  been process about the project's own process.
- The owner's assessment is right in direction. Three points need
  correction: the project is functional, so the aim is to change what
  it manages rather than finish features; a view cannot fix content;
  and the document-review pipeline targets sentences, while the
  problem is structure.
- The fix is a checked data model as the source of truth, Markdown as
  a rendering of it, the service allowed to write that file, and a
  frozen methodology pin with one recorded deviation during the
  rebuild.

## What exists and works

Verified in this session on 2026-11-09.

| Component | State |
|---|---|
| Service (majodali/project-orchestrator-service) | `npm run build`, 299 tests, lint all pass. 7,033 lines of source outside vendored code; 8,151 lines of tests |
| Deploy | Push to `main` deploys, smoke-tests and promotes a Lambda alias. 27 pull requests merged |
| MCP tools | `service_identity`, `plan_read`, and the four-call write path (`plan_lease_acquire`, `plan_update`, `plan_confirm`, `plan_lease_release`) |
| Web view | Tree, node and task pages, read at one commit SHA through a GitHub App, behind a token cookie, usable on a phone |
| Plugin (majodali/project-orchestrator) | Six role agents, form checker, journal tail, 74 tests pass, form check 0 violations and 1 warning |
| Shared code | The register grammar, the cost-log and journal grammar and the Project model parser, vendored from the plugin into the service by a generator |
| Methodology and `mtool` | 1.6.0, a small rule corpus and a 5,000-line CLI with form audit, link check, style lint and IR check |

Good habits are visible throughout: no secrets committed, git
authoritative, every read pinned to a SHA, tests that prove they can
fail, packet discipline that many tasks met with no widening.

## What is not working, with numbers

| Measure | Value |
|---|---|
| Words under `docs/` in project-orchestrator | about 400,000 in 82 files |
| The Backlog | 3,542 lines, 30,654 words. The longest entry is 5,615 words. P-006 (registers hold uniform rows) asks for bounded rows |
| Node identifier mentions | 4,897 mentions of 59 nodes |
| Ruling mentions | 1,102 mentions of 24 rulings |
| "decision N" mentions | 1,035 |
| Distinct criterion labels in the specs (V30, I5, G4 and the like) | 173 |
| Nodes that produced running software | 15 of 59. The other 44 produced process documents, plans and specifications |
| The task-pull loop (chunk 4 of the service) | 4 children, all `identified`; nothing built |
| A planner task | 100,000 to 250,000 tokens; its output 500 to 1,000 lines |
| A cost-log note | up to 1,161 words in one table cell |
| Owner gate latency | Pull requests 24 and 25 of project-orchestrator opened 2026-11-03, merged 2026-11-09 |
| Methodology releases | Six (1.0.0 to 1.6.0) in ten weeks, each a migration pull request in each repository |

Sentence length is not the problem. The process documents average
18.7 words per sentence, inside the style guide's target. The problem
is the number of documents, the depth of cross-reference, and the
volume per decision.

A representative chain: to know why `docs/plan.md` still exists, a
reader follows P3-N008 (the instance over this repository) decision 5,
to P3-N002 (the comprehension model) decision 13 option (a), to RU-021
(the planning/execution model is the source of progress truth), to the
pending K-003 amendment in the methodology's Release register. Four
documents in two repositories for one fact: the hand rendering stays
until the Backlog becomes a rendering.

## Where the owner's assessment holds

- The documentation is hard to comprehend and identifier-heavy.
  Quantified above.
- The loop is not closed. The web view and the review pipeline exist
  and neither delivers clarity for this project.
- Following the project's own planning methodology while it is in
  flux is costing more than it returns. Each new rule adds a prose
  statement, a checker statement, a ruling, a vocabulary row and a
  role-contract edit.
- A data model with automatic checks is the right instrument. The
  groundwork exists: the shared grammar unit, the form checker and the
  transitions table already encode most invariants as code.
- The GitHub interaction patterns need to change. The owner merges
  every pull request by hand, the service may not write, and a
  three-call lease protocol stands in for a write that one conditional
  commit could make.

## Where the assessment needs correction

1. **"Quickly get it functional."** It is functional. The missing
   piece is coordination, and the content it coordinates is the
   problem. Building the task-pull loop as specified (claim branches,
   empty claim commits, task files, result files) onto the current
   registers would add machinery around the same prose. Change the
   model first, then add the loop in its simplest form.
2. **The view cannot fix the content.** The view renders faithfully.
   Its tree shows titles and status icons, which is the right
   direction, but the node page shows the same decisions, criteria
   labels and rulings. Comprehensibility has to be a property of the
   data: every node carries a one-sentence outcome, every decision a
   one-line question and answer, and tooling shows titles beside
   identifiers everywhere.
3. **The review pipeline is aimed at the wrong layer.** The IR,
   paraphraser and stranger rounds improve sentences. The IR
   specification alone is 823 lines plus a 1,502-line review record.
   The orchestrator's problem is structural: too many documents, too
   many hops. Structural comprehensibility needs a bounded document
   set, one entry point and a fresh-session orientation test, not
   another prose pass.
4. **The methodology core is not the cost driver.** W-003 (same-commit
   documentation), W-006 (single-use branches), W-007 (a README), K-001
   (documentation is the sole authority), S-001 (no secrets) and
   W-002 (tests are signals) are cheap and good. The cost drivers are
   this project's own process specification (gates with numbered
   decisions and drafted affected-location text, the Ruling register,
   the Project model grammar, the result-core contract) and the newer
   prose and IR layers of the methodology as this project adopted
   them. Deviate precisely, not wholesale.
5. **The Project model is a cautionary tale, not a foundation.** It
   defines an EBNF grammar for Markdown lines separated by middle
   dots, with sources in closing parentheticals, written by hand by
   agents and recovered by a 700-line parser. It was specified before
   it had a second consumer. The rebuild should not repeat this:
   design the data file from what the view and the checker already
   need, in a format a schema validates directly.
6. **Short-lived sessions are not the problem.** The dispatch records
   show tasks that stayed inside their packets and delivered. What
   failed is unbounded output per task and the volume of owner
   decisions per gate. Bound the output and cut the decisions.
7. **Four repositories are not managed by one session.** By the
   project's own ruling RU-002 (the owner hand-carries upstream
   output), nothing writes majodali/methodology or
   majodali/methodology-tools from here. The cross-repository cost
   came from six methodology releases in ten weeks and from vendoring
   code across two repositories. Freeze the pin and give the shared
   code one home.

## Root causes

- **Reflexive scope.** The P3 line (comprehension model, risk
  catalogue, sequence mode, reversibility) is 20 of 59 nodes and the
  largest body of text. It builds process for a project whose only
  managed project is itself.
- **Text as database.** Five registers (Plan register, Cost log,
  Ruling register, Project model, Backlog) are Markdown with
  grammars. Agents write them by hand; parsers recover them; rules
  about them are stated in prose, restated in code and cited in
  rulings.
- **Decision machinery sized for a committee.** Every plan stages
  numbered decisions with defaults, rationales and drafted text for
  affected locations. Every gate captures rulings, ratifies terms and
  records a gate section. The owner's attention is the loop's
  bottleneck and the records are the longest documents.
- **Rule layering.** Methodology rules, the process specification,
  six role contracts, 24 rulings and per-node decisions all bind a
  session. Trial 3 recorded a 30-minute orientation before a
  10-minute loop. Nothing since reduced the set a fresh session must
  read.

## Deviations from the methodology warranted now

Recorded in each repository's Classification under Article 8 (two
forms of divergence: version lag and recorded deviations). None is a
deviation from a security or test rule.

| Rule | Deviation during the rebuild | Why |
|---|---|---|
| K-003 (the Backlog is the single source of progress truth) | The state file `orchestration/state.json` and the rebuild plan's checklist are the progress truth. The Backlog is frozen with a pointer entry and later becomes a rendering | The owner already approved the amendment making a declared planning/execution model the referent (2026-10-30). This applies it before release, declared, not silently |
| This project's custom definitions: Plan register, Cost log, Ruling register, Project model | Marked `in-progress` (Article 7 sandbox) and frozen. The state file supersedes the first three. The Project model is parked | Content rules lift while the instruments are replaced; existence and age stay audited |
| The process specification's gate template, result core, prose routing, Decisions-for-the-gate sections and RU-022 (corpus-bound documents are written IR first) | Suspended. Reports to the owner keep W-008's four parts and stay short. Decisions are rows in the state file | These are project rules, not methodology rules. They are the volume |
| Role tiers and the frugal-tier Orchestrator agent | Suspended. The rebuild runs in owner-attended sessions on one capable model | The loop being rebuilt is the thing the roles serve |
| Methodology migrations | Pinned at 1.6.0 until the rebuild ends | Six migrations in ten weeks |

Rules kept without deviation: W-001 (the milestones are one
pre-ratified sequence), W-002, W-003, W-006, W-007, W-008 (four
parts, short), K-001, K-002, K-007 (a Status line on every plan),
K-010 and K-011 (discharged by a status line on each frozen document,
not per passage), P-001 to P-008, S-001 and S-002.

## Practices to adopt

Short term, from the first milestone:

- Data first, prose renders. The state file is written by tools and
  validated by a schema. Markdown registers are generated and never
  hand-edited; CI rejects a hand edit.
- Titles beside identifiers everywhere, by tooling. P-004 (citations
  carry names) holds by construction.
- Bounded documents. A hand-written document is at most 300 lines. A
  specification is a criteria list of at most 20 items plus tests.
  Longer text is generated or split.
- Decisions are rows: question, options, default, choice, date, two
  sentences of rationale, a link to the pull request. No drafted text
  for affected locations; the fix lands in the same pull request.
- One pre-ratified milestone sequence. Each milestone ends with
  something the owner can see on the phone.
- Small pull requests, auto-merged on green. The owner reviews state
  in the view, not in merge queues.
- A fresh-session orientation test at each milestone: a new session
  given only the README states what is done, what is next and what
  waits on the owner, in five minutes, and the owner confirms it.

Long term:

- No feature without a second consumer. The pilot on
  methodology-tools starts as soon as the loop runs, so the project
  stops building for itself alone.
- Measure the document set: words under `docs/`, number of documents
  a fresh session reads to act, orientation time. Set a budget and
  report it at each milestone.
- Migrate the methodology pin at most once per quarter. Propose
  amendments in one batch with evidence: K-003's release, registers
  as data files with renderings, bounded specification depth.
- Let the harness record tokens and wall-clock in the journal. Stop
  writing narrative cost notes.

## Located findings

- `project-orchestrator-service/CLAUDE.md` line 5 says the project
  follows methodology v1.5.0. Its `docs/classification.md` pins
  1.6.0. The Binding block drifted at the 1.6.0 migration (pull
  request 16 of that repository).
- `docs/cost-log.md` task IDs are not sequential: T017, T101 and T102
  are missing from the table. The form checker reports this as its one
  warning.
- `docs/backlog.md` violates P-006 (registers hold uniform rows) in
  most entries. This review does not fix it; the rebuild replaces the
  Backlog with a rendering.
