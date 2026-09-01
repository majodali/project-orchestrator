# Methodology amendments for delegated, multi-agent work

Status: closed → Backlog entry

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P1-N015; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Node P1-N015, child of P1-N001
([orchestrator-v1](orchestrator-v1.md)). A Backlog-discovered node, in
the same position as
[P1-N008](p1-n008-mtool-checker-extension-point.md). It blocks
[P1-N014 (role contracts adopt the v1.4.0 conduct rules)](p1-n014-role-contracts-adopt-v140-rules.md),
which holds at `planned` until this node delivers.

## Outcome

Four adjudicable amendment proposals to majodali/methodology, drafted
in this repository and hand-carried upstream by the owner.

At `done`, each proposal carries everything section 1 (proposed) of the
methodology's
[release process](https://github.com/majodali/methodology/blob/v1.4.0/docs/release-process.md)
requires:

- the change itself, as final normative text ready to paste;
- a link to its evidencing instance, the project and artifact that
  needed it;
- its entry for the
  [Release register](https://github.com/majodali/methodology/blob/v1.4.0/docs/releases.md)'s
  Unreleased section, with an impact assessment naming every Portfolio
  project and an explicit migration note
  ([M-004](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/mirrors.md#m-004--amendment-prs-carry-their-release-register-entry)
  — amendment PRs carry their release-register entry).

The node completes at the artifacts. Upstream disposition is tracked in
the Backlog, not verified here
([RU-003](../rulings.md) — a node targeting an external party completes
at the artifact).

## Why this node exists

The reason was recorded at the
[P1-N014 gate](p1-n014-role-contracts-adopt-v140-rules.md#gate-outcome-2026-08-31)
on 2026-08-31 and is not reopened here. That node's decision 1 has this
project's process specification cite the methodology's rules rather
than restate them. Citing is sound only while the upstream text says
what a delegated, multi-agent loop needs. The owner judges that it does
not yet.

The owner's split principle governs the drafting: the methodology owns
rules any project could need, this project owns the mechanisms that
implement them.

Standing constraint 1 of the [founding plan](orchestrator-v1.md)
already prescribes this route. Where refinement exposes a gap, the fix
is an amendment proposal upstream, never a silent local divergence.

## The four amendments and the instances that evidence them

The owner approved the substance in sketch on 2026-08-31, and the
[Backlog](../backlog.md) entry for this node states it. This plan does
not re-argue it. Each amendment must name the instance it evidences,
because adjudicability depends on that link
([Article 6](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-6--inclusion-every-rule-earns-its-keep)
— every rule earns its keep).

| Amendment | Target text | Evidencing instance |
|---|---|---|
| A1 — scope the report rule by audience, not by artifact | [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables) and the style guide's *Reports and summaries* section | the handoff contract in [dispatch.md](../process/dispatch.md); every task result this project's loop has produced, each addressed to an orchestrating agent rather than to a human reader |
| A2 — name whose duty marking is when sessions nest | [K-011 (found contradictions are marked, not routed around)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-011--found-contradictions-are-marked-not-routed-around) | [P1-N014 decision 2](p1-n014-role-contracts-adopt-v140-rules.md#decisions-for-the-gate), adopted at its gate: the finder owns the duty, and a role forbidden to edit files discharges by located finding |
| A3 — give delegated work a vocabulary | [vocabulary.md](https://github.com/majodali/methodology/blob/v1.4.0/docs/vocabulary.md), *Defined terms* | the *Defined terms* section of [the process spec](../process/README.md), where this project already minted *Managed project*, *Node*, *Task*, and *Approved scope* under Article 7 because upstream had no words for them |
| A4 — state K-010's converse | [K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable) | [orchestrator-v1](orchestrator-v1.md), which claimed a v1.3.0 pin after this project migrated to 1.4.0; found and fixed during task T019 |

## Approach

One drafting session produces four proposal documents under
`docs/proposals/`, following the shape
[P1-N008's proposal](../proposals/mtool-custom-type-checker.md) set,
plus a short cover note the owner reads before carrying them.

Each proposal document holds five parts:

- **The problem**, stated over any delegated, multi-agent project
  rather than over this one. The evidencing instance is evidence, never
  the requirement.
- **The change**, as final normative text. The document quotes the
  current upstream text verbatim, then gives the replacement or
  insertion verbatim, so applying it is a paste and not an edit under
  judgment.
- **The evidencing-instance link**, resolvable from the methodology
  repository.
- **The Release-register entry**, written as it should appear in the
  Unreleased section, with the impact assessment and the migration
  note.
- **The ask**, naming what this project does under acceptance,
  amendment, and rejection.

The drafting session's own prose is bound by the methodology's P- rules
and its [style guide](https://github.com/majodali/methodology/blob/v1.4.0/docs/style.md).
Proposed normative text is held to the same standard, because it will
live in the corpus those rules govern.

### Amendment order

A3 is drafted first. A1 and A2 both need words for the delegation
relation, and drafting them before the terms exist produces two
proposals that mint vocabulary in passing. A4 is independent of the
other three and may be drafted at any point.

## Scope boundary

This node completes at the artifacts. It does not include:

- writing in the methodology repository, or opening any PR there.
  [RU-002](../rulings.md) settles the handoff: the owner hand-carries
  upstream-bound output, and cross-repo scope is granted only
  explicitly;
- upstream adjudication or disposition ([RU-003](../rulings.md));
- releasing P1-N014's hold, or adopting accepted text into
  `docs/process/`. Both fire after a release exists, and both are
  Backlog items;
- fixing the Portfolio register's stale row for this project. The
  Backlog already routes that to the owner with these proposals.

## Dependencies and ordering

- **P1-N014 depends on this node**, not the reverse. Its nine adopted
  decisions stand, and its specify stage resumes against whatever the
  upstream text then says.
- **The pin permits proposing.**
  [Article 8](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-8--amendments-versions-and-migration)
  requires amendments to be proposed against the latest version only.
  This project is pinned at 1.4.0, which is latest, so no migration
  precedes the drafting.
- **The methodology clone is read-only.** Reading it at the pinned tag
  is what the drafting needs; nothing in this node requires write reach
  into it. A finding that the proposals cannot be stated without
  writing there is a `blocked` return and a scope question, not a
  workaround.
- **A1 and A2 depend on A3 within the node**, per the amendment order
  above. Neither depends on A3 being accepted, per decision 1.

## Rulings checked

The [Ruling register](../rulings.md) was read entry by entry.

Three entries are exact matches and decide silently, so they are not
staged below: [RU-002](../rulings.md) (the owner hand-carries
upstream-bound output), [RU-003](../rulings.md) (a node targeting an
external party completes at the artifact), and
[RU-005](../rulings.md) (proposal-class nodes are owner-gated at
`verifying`).

[RU-001](../rulings.md) (a proposal draft may execute before its
evidencing node closes) covers A1 and A2, whose evidencing instance is
a plan node held at `planned`. The evidence those proposals cite is the
recorded decision and the recorded task history, both of which already
exist.

[RU-004](../rulings.md) is a near match that does not carry.
It ruled for a sketch over a full implementation because the contract
was still under discussion. Here the substance is settled by the owner,
so drafting final text is not rework built ahead of a decision. This is
the reasoning behind decision 2.

## Monotonicity

Monotonic. The node adds documents and rewrites no previously defined
functional test. No planned non-monotonicity is proposed.

## Leaf or interior

**Leaf**, given decision 4. Four short documents and one cover note are
one working session when the substance is settled and the packet is
assembled. The largest risk to that judgment is A3, and decision 4's
default is what keeps it small.

The candidate cut was examined. A3 and the three rule amendments do
validate separately, which is what would justify children. They are not
split now because each artifact is a single-sitting document, and
because the C1 profile requires breakdown only above single-session
size ([profiles.md](../process/profiles.md)).

If the specify stage judges the set beyond one session, the recorded
cut is two dependency-ordered children: the delegation vocabulary
first, then the three rule amendments with the cover note. That is a
backward transition to `plan` with size as its recorded reason, and it
needs no new argument.

## Decisions for the gate

Numbered per the owner-decision economics in
[dispatch.md](../process/dispatch.md); a go-ahead adopts every default
not overridden by number.

1. Four proposals or one bundle?
   Options: (a) four documents, four PRs, offered for one interim
   adjudication, with A3 sequenced first; (b) one bundled proposal and
   one PR; (c) two, splitting vocabulary from rules.
   **Default**: (a).
   **Rationale**: a bundle fails whole, and A3 is the amendment most
   likely to be sent back, so bundling puts three settled changes
   behind the one open question. To buy piecemeal acceptance, A1 and A2
   each name the term they borrow from A3 and give a fallback phrase
   usable if A3 is rejected.

2. How finished is the deliverable?
   Options: (a) proposal documents carrying final normative text, the
   current upstream text quoted verbatim beside it, and the
   Release-register entry; (b) applyable patch files against the
   methodology's working tree; (c) both.
   **Default**: (a).
   **Rationale**: this session cannot apply or test a patch, and a
   patch generated blind fails on context it never verified. Quoting
   the exact text being replaced gives the owner the same mechanical
   certainty with no fragile artifact.

3. How is the impact assessment produced for projects this session
   cannot inspect?
   Options: (a) assess from the
   [Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md)
   alone, labelling every claim beyond a declaration as the proposer's
   estimate; (b) request cross-repo read scope and inspect each
   project; (c) name only the projects that can be verified.
   **Default**: (a).
   **Rationale**: the register is the declared basis the release
   process already treats as authoritative for enumeration, and all
   four amendments are conduct rules that mint no coverage duty, so the
   honest assessment is *accommodated* or *not affected* for every
   project on grounds the register alone establishes. Option (c) makes
   the proposal inadjudicable by construction. The cover note carries
   the register's stale row for this project so the owner can fix it on
   the same trip.

4. Does A3 land whole or as a minimal term set?
   Options: (a) a minimal set now, naming only the delegation relation
   and the report-audience distinction that A1 and A2 use, with the
   fuller vocabulary raised when a second project evidences it; (b) the
   full set now, including dispatched task, context packet, handoff
   contract, and node-attached gate; (c) no vocabulary amendment,
   leaving every project to Article 7 custom definitions.
   **Default**: (a).
   **Rationale**: Article 6 admits a term only when a live project
   needed it, and this project is currently the sole instance for every
   term in option (b). A minimal set is what A1 and A2 genuinely
   require, and it is the part that stops divergence at its source. The
   remainder stays available under
   [Article 7](https://github.com/majodali/methodology/blob/v1.4.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)
   custom definitions until a second instance exists, which is the
   condition that makes the case.

5. Is P1-N015 a leaf?
   Options: (a) leaf, with the two-child cut recorded as the fallback;
   (b) interior now, with the vocabulary and the rule amendments as
   dependency-ordered children.
   **Default**: (a).
   **Rationale**: under decision 4 the work is one session, and a
   breakdown would spend two extra orchestration cycles on documents
   that are already settled in substance.

## Owner actions after `done`

Recorded here so the gate summary can state them, not as node scope:

1. Carry the four proposals upstream as PRs against the methodology's
   `main` ([RU-002](../rulings.md)).
2. Convene an interim adjudication, or hold them for the next review
   round.
3. Correct the Portfolio register's row for this project and add
   `project-orchestrator-service`, per the Backlog entry the cover note
   repeats.

## References

- [orchestrator-v1](orchestrator-v1.md) — the parent plan and its
  standing constraints; constraint 1 requires the upstream route, and
  the document is A4's evidencing instance.
- [p1-n014 plan](p1-n014-role-contracts-adopt-v140-rules.md) — the held
  node, its decision 1 (cite, do not restate), its decision 2 (the
  finder marks), and the gate outcome that opened this node.
- [p1-n008 plan](p1-n008-mtool-checker-extension-point.md) and
  [its proposal](../proposals/mtool-custom-type-checker.md) — the
  precedent for a proposal-class node and for the artifact's shape.
- [rulings.md](../rulings.md) — RU-001, RU-002, RU-003, RU-004, RU-005.
- [dispatch.md](../process/dispatch.md) — the handoff contract and the
  owner-decision economics; A1's evidencing instance.
- [profiles.md](../process/profiles.md) — the C1 profile: breakdown
  above single-session size, criteria-list specifications.
- [process spec README](../process/README.md) — the *Defined terms*
  section; A3's evidencing instance.
- [methodology release process](https://github.com/majodali/methodology/blob/v1.4.0/docs/release-process.md)
  — section 1 (proposed), which binds the deliverable's shape.
- [methodology Release register](https://github.com/majodali/methodology/blob/v1.4.0/docs/releases.md)
  — the v1.4.0 entries, the worked examples for the entries this node
  writes.
- [methodology Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md)
  — the projects an impact assessment names.
- [methodology style guide](https://github.com/majodali/methodology/blob/v1.4.0/docs/style.md)
  — the house style binding both this plan and the proposed text.

## Gate outcome, 2026-09-01

All five staged decisions adopted as defaulted; none overridden.

Decision 4 is the one that changed something: it narrows the
vocabulary amendment from the set the owner approved in sketch to
the terms A1 and A2 actually borrow, on Article 6's ground that a
term earns its place when a live project needed it and this project
is currently the sole instance for the remainder. The owner adopted
the narrowing knowingly, the Planner having flagged it for override
rather than presenting it as recorded intent.

Three rulings decided parts of this node silently and are recorded
as applied at T020: [RU-002](../rulings.md) (the owner hand-carries
upstream-bound output), [RU-003](../rulings.md) (a node targeting an
external party completes at the artifact) and
[RU-005](../rulings.md) (proposal-class nodes gate at `verifying`).

