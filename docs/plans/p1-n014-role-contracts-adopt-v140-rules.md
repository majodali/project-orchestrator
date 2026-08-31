# Role contracts adopt the v1.4.0 conduct rules

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P1-N014; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node P1-N014, child of P1-N001
([orchestrator-v1](orchestrator-v1.md)). A Backlog-discovered node, in
the same position as [P1-N008](p1-n008-mtool-checker-extension-point.md)
and [P1-N009](p1-n009-plugin-tooling-portfolio-stack.md). It is placed
before chunks 5 and 6 because both of those write a great deal of prose
and a great many reports, under whatever contracts are in force when
they run.

## Outcome

Every conduct duty that methodology v1.4.0 named is stated once, in the
document that owns it, and reaches the roles through the artifacts they
actually load.

Concretely, at `done`:

- The handoff contract in [dispatch.md](../process/dispatch.md) cites
  the methodology's rule
  [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
  for what a task result owes its reader. It restates none of that
  rule's normative text, and it keeps the fields the rule does not
  cover.
- [roles.md](../process/roles.md) says, per role, who marks a found
  contradiction, who enumerates a supersession's affected locations,
  and who places the markers.
- The six role contracts in `.claude/agents/` carry those duties in
  each role's own terms, with `plugin/agents/` regenerated from them.
- The reach of the methodology's P- prose rules across this project's
  artifact classes is written down: which classes are fully bound,
  which are bound only by
  [P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/prose.md#p-004--citations-carry-names),
  and which are exempt.
- At least one real supersession marker stands in the tree, in the
  style guide's format, produced by a genuine case rather than by an
  example.

## Why this node exists

Methodology v1.4.0 required nothing of this project. All four
amendments carry a migration note of *none* or *none mandatory*, and
the pin bump on 2026-08-30 was the whole migration. The node exists
because three of the release's new rules describe conduct this project
has been performing by judgment, and one set governs everything it
writes from here.

### The duties are already being performed, unevenly

Task T017 found plan decision 6 colliding with specification criterion
D1 and returned `needs-judgment`. That was the right call, and it was
judgment. The methodology's rule
[K-011 (found contradictions are marked, not routed around)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-011--found-contradictions-are-marked-not-routed-around)
now makes it a duty. Task T018 spent real effort clearing stale
present-tense claims out of the ported tools, which is what the rule
[K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable)
exists to prevent accumulating. A dispatched role works from an
enumerated packet and cannot rely on instinct it was never given. A
named duty in the contract is what a packet can carry.

### One contract is currently stated in two places

The methodology's report rule and this project's handoff contract
govern the same message: a role's final report on a written artifact.
The methodology now states the reader-facing half normatively upstream.
Two statements of one contract is the drift hazard this project keeps
legislating against. Article 3 of the methodology's constitution
(documentation is authoritative, tooling derivative) puts the
methodology upstream of this specification, so the resolution is not
in doubt.

### The six result shapes have already drifted from each other

The five dispatched role contracts state their result shape
independently, and they no longer agree. The Auditor and the semantic
Auditor contracts omit the status field that the handoff contract
requires of every completed task. Neither mentions packet widening,
which they incur like any other dispatched role. No contract mentions
restatement or novelty. One contract already complies with the report
rule by accident: the semantic Auditor is told to state "no finding"
per question rather than to stay silent.

### The prose rules bind what this project writes next

The methodology's P- rules bind new and edited prose from adoption.
Existing documents migrate by editorial passes on their own schedule.
The pilot (P1-N006) and the cost reporting and close-out (P1-N007) are
prose-heavy nodes that have not run yet. Adopting the rules after them
means an editorial pass over work that could have been born compliant.

### Named citations are a context-frugality measure here

[P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/prose.md#p-004--citations-carry-names)
reads as a style rule elsewhere. In this project it is load-bearing. The
dispatch loop's whole design is the enumerated packet: a role is given
what it needs and reads no further. A bare identifier in a brief, a
plan, or a specification forces a read outside the packet. That is
[Risk R6 (packet-insufficiency spiral)](../open-risks.md) by another
name, one citation at a time.

## Approach

### The specification cites; derivative artifacts compile

The proposed boundary has one line: a specification document cites an
upstream rule and never paraphrases its normative text, while a
derivative artifact may restate it.

The distinction is Article 3 of the methodology's constitution
(documentation is authoritative, tooling derivative). A role prompt, a
skill, and a checker are built artifacts whose specification is a
document. A restatement inside one of them is a compilation of the
document, and drift there is a bug in the artifact. A restatement
inside a peer specification document is a second authority, and drift
there is a genuine conflict with no resolution rule.

The near-match precedent is [RU-012](../rulings.md). It settles that
two repositories share a unit of code by keeping one canonical copy
where the specification lives and vendoring it outward. The consumer
never edits its copy. The same shape applies to a duty: one canonical
statement in the document that owns it, compiled into the prompts that
need it.

To keep the compiled copies honest, each restatement in a prompt
carries the rule's identifier and name. Drift then costs one grep to
find.

### What the specification legitimately adds

The report rule covers three duties: restatement, novelty, and the
asks. This project's handoff contract covers fields that rule does not
mention, and those stay:

- the `needs-judgment` return and its three parts;
- proposed register changes, which exist because the Orchestrator is
  the single writer of the registers;
- Backlog additions for everything identified and not executed;
- packet widenings, which feed the packet-sufficiency risk;
- session model and token usage for the Cost log.

Those five fields are, in substance, this project's version of the
asks. What is missing today is the other half: the separation of
restatement from novelty, and the explicit statement that there are no
asks when there are none. That half arrives by citation, plus one
sentence locating it: every task result on this project delivers a
written artifact, so the rule binds every task result.

Nothing in the current specification needs deleting for duplication.
The drift hazard here is prospective, and the boundary rule is what
prevents the next edit from realizing it.

### Marking a found contradiction is the finder's duty

The methodology's found-contradictions rule binds "a session", and its
companion supersession rule binds "a deliverable". In this loop a
session is a dispatched role, and its deliverable is its commits plus
its task result. Reading the duty onto the Orchestrator instead would
put an interpretive judgment inside a role that is defined to make
none.

So the finder marks, in its own commits, and reports the location. Two
consequences follow, and both need writing down:

- Two roles cannot mark. The Reviewer and the Auditor contracts forbid
  editing project files, and that prohibition is deliberate. For them
  the duty discharges as a located finding in the verdict or the audit
  report, and the marking is scheduled by the Orchestrator with the
  work that acts on the finding.
- Some decision entries live in registers that only the Orchestrator
  writes. A role reports the location; the Orchestrator records it in
  the [Ruling register](../rulings.md) entry in its acceptance commit.

### Marking is never scope creep; fixing may be

The dispatch loop already routes newly discovered scope to the Backlog
rather than letting a role do it silently. The found-contradictions
rule offers a choice between fixing and marking, and that choice is
where the two rules meet.

The proposed reconciliation: mark always, because a marker is not
substantive work and cannot expand a node's scope. Fix only where the
fix falls inside the node's own scope. Where it does not, the marker
stands and the fix becomes a Backlog entry, which is exactly the
existing routing.

### The Planner enumerates, the Orchestrator places

The supersession rule requires a decision's entry to record the known
affected locations, and a marker at each. Enumerating those locations
is judgment. Placing a marker with drafted text at a named location is
mechanical.

The split follows the loop's existing division of labour. A staged
decision already carries a recommended default and a one-line
rationale in a Decisions-for-the-gate section. It gains a third field:
the affected locations, with the marker text drafted. At gate crossing
the Orchestrator writes the ruling and places the drafted markers
verbatim, in the same commit.

### The standing-marker bound is the next gate

The supersession rule makes a marker still standing at the next review
round an audit finding. The style guide requires such bounds to be
expressed in a project's own cycles, never in calendar time. This
project holds no review rounds. Its cycle is the gate.

So a marker is answerable at the next gate on the node it sits under,
and the semantic Auditor's gate pass is where the question is asked.
A marker that names its own scheduled resolution answers the question
in advance rather than raising it again at every gate.

### How far the prose rules reach

The proposal binds by artifact class rather than by blanket:

- Documents under `docs/` are fully bound for new and edited prose.
  That includes plans, specifications, the process specification, the
  Backlog, proposals, and the README.
- Task briefs, task results, and gate summaries are bound by
  [P-004 (citations carry names)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/prose.md#p-004--citations-carry-names)
  absolutely. The other prose rules apply as they fit, which is what
  the report rule and the style guide already say about reports.
- Commit messages are bound by the same citation rule and nothing
  further. Git history cannot be migrated by an editorial pass, so a
  duty beyond naming what is cited would be unenforceable.
- The run journal is exempt. It is declared telemetry, never
  authoritative, and its JSONL rows already satisfy the register rule's
  shape by construction.
- Code and code comments are exempt.

The gate summary template does not change. It already ends in numbered
decisions with defaults, which are the asks, and its Detail line
already points into the documents, which is the novelty pointer. Its
compactness is an owner ruling, and the report rule's "no empty
ceremony" clause protects it.

### The Backlog declares its row shape and its lag

[P-006 (registers hold uniform rows)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/prose.md#p-006--registers-hold-uniform-rows)
requires a register to declare its row shape in its header and to keep
reasoning in linked documents. This project's Backlog is the rule's
motivating example: entries of one hundred to two hundred and fifty
words, with the reasoning inside the register.

Rewriting the whole Backlog is not this node's work, and the style
guide says such passes are scheduled work rather than migration duties.
Writing new entries in a declared shape is. The proposal is therefore
to declare the row shape in the Backlog's header and to declare the
lag in the same place: entries from the adoption date follow the shape,
earlier entries await a scheduled editorial pass.

Declaring the lag at the point of reading is the supersession rule's
own principle, applied to a register instead of a document. The
alternative is a header that describes a shape most of its rows do not
have.

The refined P1-N014 entry landing with this plan is written in the
proposed shape, as a worked sample of decision 8. The header
declaration is not made yet, because making it is the adoption the
gate decides.

### What this node does not build

No style checker and no marker checker are written here. The
methodology's v1.4.0 release notes queue both in methodology-tools:
style lint as warnings, and marker greppability alongside it. Standing
constraint 4 of the founding plan makes that tooling upstream, and
building a local copy would be the duplication this node exists to
prevent.

The orchestration-specific half of the question is not a form check
anyway. Whether a marker should still be standing at this gate is a
judgment about the work, which is what the semantic Auditor's pass is
for.

## Leaf or interior

Leaf. No children are proposed, so none are sketched. Child
identifiers are the Orchestrator's to issue in any case, and
verification criteria belong to this node's `specify` stage.

The C1 profile requires breakdown above single-session size. The work
is prose edits to four specification documents, six role contracts, one
generated mirror, and one Backlog header, all following from one set of
gate decisions. There is no build, no cutover, and no new tooling. An
Implementer session can carry it once the specification enumerates the
edits.

The edits also have to land together. A contract that tells a role to
mark, beside one that does not tell its counterpart to record the
location, is worse than either change alone. Splitting a coherent
motion into children would manufacture exactly the inconsistency the
node removes.

The one candidate for a second child, a checker for standing markers,
is declined above and staged as decision 9. With it out, the node is
leaf-sized by a comfortable margin.

## What proves the adoption happened

Compliance is hard to demonstrate when nothing was required. Documents
that merely mention rule identifiers are not evidence. Criteria belong
to the `specify` stage; the evidence they should be built from is:

1. One canonical statement per duty, in the document that owns it, and
   six prompts that carry it in role-specific terms. The mirror
   generator already proves `plugin/agents/` matches `.claude/agents/`
   mechanically.
2. No paraphrase of upstream normative text in `docs/process/`. This is
   checkable by grep: every occurrence of an upstream rule identifier
   in the specification is a citation with a name and a link.
3. A real supersession marker in the tree, in the style guide's format,
   from a genuine case. The founding plan carries two supersession
   notes today, on chunks 5 and 6, in almost the right shape and
   without the fixed prefix that makes markers greppable. Converting
   those two exercises the format on real content.
4. The six result shapes reconciled to one core, with the differences
   between them attributable to role and not to drift.
5. Acceptance can reject a non-compliant report. The Orchestrator
   already verifies the handoff contract at acceptance, which is what
   makes that contract enforced rather than aspirational. Extending
   the same check to the report shape is what turns this adoption from
   description into practice.
6. The Backlog header declares a row shape and its lag, and the entry
   for this node is a row.

## Dependencies and ordering

- No dependency is unmet. Every earlier sibling of P1-N014 is `done`,
  so the earlier-siblings default in [dispatch.md](../process/dispatch.md)
  is satisfied without an owner override.
- P1-N006 (pilot) and P1-N007 (cost reporting and close-out) should
  follow this node. Both write prose and reports at volume, and both
  are better served by contracts that already carry the duties.
- The service repository's nodes are unaffected in scope. They inherit
  the same role contracts when dispatched, which is a reason to land
  this before the next long service run, not a blocker on either side.
- The context-packet table does not change, so the packet-frugality
  contract is untouched and no packet grows.

## Standing constraints this work respects

From the founding plan's six, the ones that bite here:

1. Methodology compliance. This is compliance work at the current pin.
   No amendment is proposed upstream, no Classification field changes,
   and no deviation is created.
2. Documentation is the spec (constraint 3). The specification
   documents change first and the prompts are regenerated from them,
   in that order. The same article decides the cite-or-restate
   boundary above.
3. `mtool` is upstream (constraint 4). No style or marker checking is
   built here.
4. Judgment routing (constraint 5) and human gates (constraint 6).
   Every question the node raises is staged below with a default,
   rather than settled in flight.
5. Subscription billing (constraint 2) is untouched.

Also binding: W-006 (branches are single-use and outcome-named), W-003
(documentation moves in the same commit as the work), K-003 (the
Backlog is the single source of progress truth), K-007 (plans are
outcome-named, statused, and ruthlessly current), and the
single-writer rule for the Plan register, the Cost log, the Ruling
register, and the run journal.

## Monotonicity

Monotonic. No previously defined functional test is rewritten. The
test corpus checks Plan-register, Cost-log, and journal form, and none
of it reads prose. The agent-mirror drift check stays green because the
mirror is regenerated in the same commit. No planned non-monotonicity
is proposed.

## Contradictions found while planning, and their disposition

Recorded here as this session's discharge of the methodology's
found-contradictions rule, which the node adopts.

- Fixed in this commit. The founding plan's standing constraint 1 and
  its References section both said this repository was pinned at
  methodology v1.3.0. The Classification has recorded v1.4.0 since the
  migration of 2026-08-30. A plan document's unmarked content is a
  live claim of current intent, so the claim was false rather than
  stale, and correcting two version numbers is cheaper than marking
  them.
- Not a contradiction, and left alone. Nine citations under
  `docs/process/` and in the Risk register link the methodology at the
  `v1.3.0` tag. A version-tagged permalink cites a version; it does
  not claim to be the current pin. Every claim those citations support
  is still supported by the text at the current pin, including the two
  that cite Article 8, whose amendment machinery did not change. They
  are stale references rather than false ones, and they are now a
  Backlog entry for an editorial pass.
- Historical, and exempt. The P1-N009 plan says "this repo at v1.3.0"
  in its standing-constraints section. Its status is `closed →
  Backlog entry`, which labels the whole document as a record of what
  was true when it ran.

## Owner actions

None beyond the gate under the recommended defaults. If decision 9 is
overridden toward building a marker check here, the owner is choosing
work that the methodology's tooling repository has already queued.

## Decisions for the gate

Numbered per the owner-decision economics in
[dispatch.md](../process/dispatch.md); a go-ahead adopts every default
not overridden by number. The [Ruling register](../rulings.md) was
checked entry by entry. No active ruling decides any question below.
[RU-012](../rulings.md), which keeps one canonical copy of a shared
unit and vendors it outward, is the near match behind decision 1.
[RU-013](../rulings.md), which requires a tool to fail loudly rather
than degrade quietly, is the near match behind decision 6.

1. Does the process specification cite the methodology's report rule,
   or restate it?
   Options: (a) cite, and let derivative artifacts restate; (b) restate
   in the specification for self-sufficiency; (c) cite everywhere,
   including in the prompts, which then carry only a pointer.
   **Default**: (a).
   **Rationale**: a prompt is compiled from a document and drift in it
   is a bug, while a second specification is a second authority with no
   resolution rule, which is the shape [RU-012](../rulings.md) already
   settled for code.

2. Who marks content found to contradict a recorded decision?
   Options: (a) the finder, in its own commits, with report-only roles
   discharging by located finding; (b) the finder reports and the
   Orchestrator marks in every case; (c) marking waits for the gate.
   **Default**: (a).
   **Rationale**: the rule binds the session that found it, and reading
   it onto the Orchestrator puts an interpretive judgment inside the
   role defined to make none.

3. What happens when the contradicting content lies outside the node's
   scope?
   Options: (a) mark always, fix only inside scope, Backlog the rest;
   (b) fix wherever found; (c) mark nothing outside scope and report
   only.
   **Default**: (a).
   **Rationale**: a marker is not substantive work and cannot expand
   scope, while a fix can, and the Backlog routing for discovered scope
   already exists.

4. Does the task result gain a field for contradictions found?
   Options: (a) yes, one field, stating "none" when there are none;
   (b) no, fold them into Backlog additions; (c) no, report them only
   when the role also marked something.
   **Default**: (a).
   **Rationale**: an unreported finding is indistinguishable from no
   finding, and the explicit-none discipline is the report rule's own.

5. Who enumerates a supersession's affected locations, and who places
   the markers?
   Options: (a) the Planner enumerates and drafts the marker text in
   the decision entry, the Orchestrator places them verbatim at gate
   crossing; (b) the Orchestrator does both; (c) each role marks what
   its own work supersedes, with no central list.
   **Default**: (a).
   **Rationale**: enumeration is judgment and placement is mechanical,
   which is the loop's existing division of labour.

6. What bounds a standing supersession marker on this project?
   Options: (a) the next gate on the node the marker sits under, asked
   by the semantic Auditor's gate pass; (b) the next gate anywhere;
   (c) no bound until the marker check ships upstream.
   **Default**: (a).
   **Rationale**: the style guide requires the bound to be a project
   cycle, and gates are the only cycle this project has.

7. How far do the prose rules reach across this project's artifacts?
   Options: (a) `docs/` fully bound, briefs and results and gate
   summaries bound by the named-citations rule with the rest as fits,
   commit messages by named citations only, journal and code exempt;
   (b) `docs/` only; (c) every artifact fully bound.
   **Default**: (a).
   **Rationale**: a bare identifier in a packet forces a read outside
   the packet, so the citation rule earns its keep everywhere, while
   binding a JSONL note to document structure is the empty ceremony the
   methodology warns against.

8. Does the Backlog adopt the uniform-row shape now?
   Options: (a) declare the row shape and the lag in the header, bind
   new and edited entries, schedule the pass over existing entries;
   (b) defer the whole question to a scheduled editorial pass; (c)
   rewrite the Backlog now.
   **Default**: (a).
   **Rationale**: declaring the lag at the point of reading is the
   supersession rule's own principle, and option (c) is a large
   editorial project wearing a compliance costume.

9. Does this node build a check for standing markers?
   Options: (a) no, and record a Backlog entry to adopt the upstream
   checks when they ship; (b) yes, extend the form checker now; (c)
   yes, and propose it upstream afterwards.
   **Default**: (a).
   **Rationale**: the methodology's release notes already queue marker
   greppability in methodology-tools, and there is nothing to check
   until markers exist.

## References

- [orchestrator-v1](orchestrator-v1.md) — the parent plan and its six
  standing constraints. P1-N001 has no specification document: it
  predates the convention, so this node inherits no integration
  properties from it.
- [dispatch.md](../process/dispatch.md) — the handoff contract, the
  owner-decision economics, the packet table, and the gate summary
  template.
- [roles.md](../process/roles.md) — the six role contracts this node
  edits.
- [profiles.md](../process/profiles.md) — the C1 profile: breakdown
  above single-session size, criteria-list specifications.
- [auditing.md](../process/auditing.md) — the semantic Auditor's gate
  pass, and the rule that the specification is right when checker and
  specification disagree.
- [rulings.md](../rulings.md) — RU-012 (one canonical copy, vendored
  outward) and RU-013 (fail loudly, never degrade quietly).
- [open-risks.md](../open-risks.md) — R6 (packet-insufficiency spiral).
- [p1-n009 plan](p1-n009-plugin-tooling-portfolio-stack.md) — the model
  for a node plan on this project.
- [methodology v1.4.0 style guide](https://github.com/majodali/methodology/blob/v1.4.0/docs/style.md)
  — the supersession-marker format, the reports-and-summaries section,
  and the migration clause for existing documents.
- [methodology v1.4.0 release entry](https://github.com/majodali/methodology/blob/v1.4.0/docs/releases.md)
  — the amendments' migration notes, and the queued tooling.
