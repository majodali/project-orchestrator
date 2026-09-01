# Methodology amendments for delegated, multi-agent work — proposal specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document for
     node P1-N015; it goes `active` when the owner approves it at the
     gate, and `closed → Backlog entry` when the node reaches `done`. -->

Node **P1-N015**, specifying the outcome fixed by its
[plan](../plans/p1-n015-methodology-amendments-delegated-work.md). The
plan decided *what* and *why*: four proposals, final normative text
with the upstream text quoted beside it, an impact assessment from the
Portfolio register, a minimal vocabulary set, and a leaf node. Its five
decisions were adopted as defaulted on 2026-09-01 and are not reopened
here.

This document records the **verification criteria** the drafting is
built against — the checklist the Implementer self-verifies against at
C1 and the owner checks at the `verifying` gate
([RU-005](../rulings.md) — proposal-class nodes gate at `verifying`).

The governing question throughout is **adjudicability**. The
methodology's
[release process](https://github.com/majodali/methodology/blob/v1.4.0/docs/release-process.md),
section 1 (proposed), states that a proposal missing any required part
is not adjudicable: reviewers return it rather than judging it. The
criteria below make each required part checkable in this repository,
without upstream access and without upstream disposition.

## Behavior

When this node is `done`, the repository contains — added in **one
commit** (W-003 — documentation moves with the work) — five new
documents under `docs/proposals/` and the Backlog update, and nothing
else:

| File | Content |
|---|---|
| `delegated-work-vocabulary.md` | A3 — a minimal delegation term set for [vocabulary.md](https://github.com/majodali/methodology/blob/v1.4.0/docs/vocabulary.md) |
| `report-rule-scoped-by-audience.md` | A1 — [W-008 (reports map their deliverables)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables) and the style guide's *Reports and summaries* section |
| `contradiction-marking-in-nested-sessions.md` | A2 — [K-011 (found contradictions are marked, not routed around)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-011--found-contradictions-are-marked-not-routed-around) |
| `active-documents-are-corrected-not-marked.md` | A4 — [K-010 (superseded content is never silently readable)](https://github.com/majodali/methodology/blob/v1.4.0/docs/rules/knowledge.md#k-010--superseded-content-is-never-silently-readable) |
| `delegated-work-amendments-cover-note.md` | the note the owner reads before carrying the four |

Each proposal is a **document the owner pastes into a PR**, not a
change to how this project works. No role contract, process document,
or invariant changes in this node.

## Verification criteria

Each criterion is checkable by inspection of the commit unless marked
*(mechanical)*. All MUST hold. "Each proposal" means each of the four
amendment documents.

### A. The artifacts exist and are well-formed

- **A1.** The five files above exist under `docs/proposals/`, and no
  other file is added there. *(mechanical)*
- **A2.** Each carries `Status: draft` with a K-007 transition-contract
  comment, matching this repo's convention. All five stay `draft` at
  node completion: nothing has been carried upstream, and carrying is a
  separate Backlog item. *(mechanical)*
- **A3.** Each proposal's title and opening paragraph state, without
  the rest of the document, which upstream text it amends, what changes,
  and what the reader is asked to decide.
- **A4.** Each proposal holds the plan's five parts as identifiable
  sections: the problem, the change, the evidencing-instance link, the
  Release-register entry, and the ask. *(mechanical: five sections)*

### B. Each proposal is adjudicable on its own

Section 1 of the release process, turned into checks.

- **B1. The change itself.** The proposal gives the replacement or
  insertion as **final normative text**, complete and pasteable. No
  instruction of the form "reword X to mean Y" stands in place of text.
- **B2. Proposed rule text keeps the corpus shape.** Amended or new
  rule text carries the fielded anatomy the rule corpus uses — Applies,
  Keywords, Motivated-by, Cites, **Statement**, Rationale — with every
  field the amended rule already has either preserved verbatim or
  restated in full. A new vocabulary term follows the shape of the
  terms already in *Defined terms*.
- **B3. The evidencing-instance link resolves from the methodology
  repository.** It is an absolute URL into this repository, pinned to a
  commit or a branch that exists, and it points at the artifact named
  in the plan's amendment table, not merely at the repository root.
  *(mechanical: fetch or resolve each URL)*
- **B4. The Release-register entry is present and shaped.** Written as
  it would appear in the register's *Unreleased* section, with the four
  fields the register's header requires: amendment title and PR link ·
  suggested by (evidencing instance) · impact assessment · migration
  note. It reads as a sibling of the v1.4.0 entries, which are the
  worked examples. *(mechanical: four fields present)*
- **B5. The PR link is a marked placeholder, not an omission.** The PR
  does not exist until the owner opens it. The entry carries a visibly
  marked placeholder in the register's link format, with a one-line
  instruction to fill it, so no reader mistakes the gap for an
  incomplete entry. *(mechanical)*
- **B6. The migration note is explicit.** It states a value. Where the
  value is `none`, the word appears; it is never left blank, and never
  omitted as obvious. *(mechanical)*
- **B7. The entry survives the other three.** Each entry is
  self-contained and additive to *Unreleased*, so four separately
  merged PRs leave four coherent entries. The proposal states that its
  entry is independent of the other three and that any conflict between
  them is textual, not substantive.

### C. The impact assessment names every project, honestly

- **C1. Every Portfolio row is accounted for.** Each entry marks every
  project in the
  [Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md)
  as *accommodated*, *deviation expected*, or *not affected* — either
  individually or by an explicit collective statement ("all projects,
  C0 included") that leaves no row unaccounted. A verifier counts the
  register's rows against the entry's coverage and finds none missing.
  *(mechanical)*
- **C2. Estimates are labelled.** Any claim beyond what the register
  itself declares is marked as the proposer's estimate, in the entry
  text. An unlabelled claim about a project this session did not
  inspect is a **defect**, not a stylistic preference (plan decision 3).
- **C3. The register's own staleness is surfaced, not worked around.**
  The cover note states that the register's row for this project
  records a 1.3.0 pin while the project pinned 1.4.0 on 2026-08-30, and
  that the register omits `project-orchestrator-service`. It names both
  as owner actions and links the Backlog entry that carries them. No
  proposal silently assumes corrected rows.
- **C4. The assessment states its basis.** Each entry says it was
  produced from the Portfolio register, and names the register's census
  date, so a reader knows what the enumeration rests on.

### D. The verbatim quotes are exact and dated

This is the criterion most likely to rot, because the methodology may
move before the owner carries the proposals.

- **D1. The quote is byte-exact against the pin.** Each proposal quotes
  the current upstream text it replaces, in a block that is identical
  to the text at methodology commit `c183427` (tag `v1.4.0`). A
  verifier extracts each quoted block and diffs it against the named
  file in the read-only clone; the diff is empty. *(mechanical)*
- **D2. The quote names its source precisely.** Each quoted block is
  labelled with the upstream file path and the heading it sits under,
  so a reader can locate it without searching. *(mechanical)*
- **D3. Each proposal carries its provenance line.** A single stated
  line naming the version (`v1.4.0`), the commit (`c183427`), and the
  date the quote was taken, plus the instruction to re-verify the quote
  against upstream `main` before opening the PR. Without it a stale
  quote is undetectable by the reader. *(mechanical)*
- **D4. A1 quotes both of its targets.** A1 amends two documents. It
  carries a separate quote and a separate replacement for W-008 and for
  the style guide's *Reports and summaries* section.

### E. A1 and A2 survive A3's rejection

Plan decision 1 promises piecemeal acceptance. These criteria make the
promise readable rather than aspirational.

- **E1. The borrowed term is named.** A1 and A2 each identify, in one
  place a verifier can point at, the A3 term its proposed text uses.
- **E2. The fallback phrase is given verbatim.** Each names the exact
  wording to substitute if A3 is rejected, and the sentence it
  substitutes into. A verifier performs the substitution by reading and
  finds text that stands alone, defining nothing and citing no
  rejected term.
- **E3. The dependency is stated in both directions.** A3 names which
  proposals borrow its terms; A1 and A2 each state that acceptance does
  not depend on A3's acceptance. A4 states that it is independent of
  the other three.
- **E4. Sequencing is recorded where the owner reads it.** The cover
  note states that A3 is carried first, and why, so the order does not
  live only in the plan.

### F. Upstream framing and transportability

- **F1. The problem is stated over delegated, multi-agent projects in
  general.** The evidencing instance appears as evidence, never as the
  requirement. No proposal asks the methodology to adopt this project's
  mechanisms — the owner's split principle, and standing constraint 1
  of the [founding plan](../plans/orchestrator-v1.md).
- **F2. Links survive transport.** Every reference out of a proposal is
  an absolute URL, version-pinned where the target is versioned. No
  relative link into this repository appears in any of the five
  documents, because they are pasted upstream. *(mechanical)*
- **F3. No unglossed local vocabulary.** Project-specific terms —
  node, stage, task, dispatch, Plan register, Cost log, Orchestrator,
  context packet — are glossed at first use or removed. A3 is the
  exception in kind, not in duty: the terms it proposes are defined
  where it proposes them. *(mechanical first pass: grep the term list)*
- **F4. Project voice.** Written as this project speaking, not as an
  agent session and not in the first person singular, so the owner
  carries them unchanged ([RU-002](../rulings.md) — the owner
  hand-carries upstream-bound output).
- **F5. The ask is explicit.** Each proposal states what this project
  does under acceptance, under amendment, and under rejection.

### G. Size, prose, and process

- **G1. One session, four short documents.** Working target: each
  proposal's body under roughly 150 lines of Markdown, the cover note
  under roughly 60. A verifier who finds a document longer judges
  whether the excess earns its keep rather than failing it
  mechanically.
- **G2. A3 stays minimal.** The vocabulary proposal defines only the
  terms A1 and A2 borrow. Any further term is a defect against plan
  decision 4, and belongs to the Backlog entry that holds the
  remainder.
- **G3. Prose rules bind both layers.** The proposal prose and the
  proposed normative text both satisfy P-001 to P-006 (documents
  structured for reference; one idea per sentence; bold as structure;
  citations carry names; headers state their contents; registers hold
  uniform rows) and the
  [style guide](https://github.com/majodali/methodology/blob/v1.4.0/docs/style.md).
  Proposed text is held to the standard of the corpus it would join.
- **G4. Nothing is written upstream.** No file in the methodology clone
  is modified, and no PR is opened anywhere. `git status` in the clone
  is clean at completion. *(mechanical)*
- **G5. No local divergence.** No file under `docs/process/`,
  `.claude/agents/`, or `plugin/` changes in this commit. *(mechanical:
  diff review)*
- **G6. Same commit.** The five documents and the Backlog update land
  together (W-003). *(mechanical)*
- **G7. Checks clean.** `node plugin/scripts/form_check.ts` reports no
  violations, and link checking reports no new broken links.
  *(mechanical)*

## How verification runs

C1 profile: self-verification by the Implementer against the list
above, with no Reviewer pass required
([profiles.md](../process/profiles.md)). RU-005 adds the owner gate at
`verifying`, because the owner is the proposals' carrier and their
first reader.

The Implementer reports A, B, D, F2–F3, and G as checked, with the
mechanical results stated (the quote diffs, the Portfolio row count,
the form check). What remains for the owner's read is C2 (whether the
estimates are honest), E2 (whether the fallback text truly stands
alone), and F1 (whether the framing is upstream-general).

## The node stops at the artifacts

[RU-003](../rulings.md) — a node targeting an external party completes
at the artifact. Verification therefore ends at *four adjudicable
proposals exist and are internally correct*. It does not wait on, and
does not test, any upstream response. A verifier who finds every
criterion above satisfied returns `done` without knowing what the
methodology's owner will decide.

## Not verified here

Named so their absence is not read as oversight:

- upstream adjudication, acceptance, amendment, or rejection, and the
  release that would carry accepted text;
- repair of the Portfolio register's stale row and its missing project
  — surfaced by C3, fixed by the owner, tracked in the Backlog;
- P1-N014's resumption, releasing its hold, and adopting accepted text
  into `docs/process/`; all fire after a release exists;
- the deferred delegated-work vocabulary — dispatched task, context
  packet, handoff contract, node-attached gate — which stays under
  Article 7 custom definitions until a second project evidences it;
- whether the methodology has moved past `c183427` after this commit
  lands. D3's provenance line is what makes that detectable; keeping
  the quotes current is not this node's duty.

## Leaf, affirmed

The plan's decision 5 stands after writing the criteria. The work is
four short documents and a note, with the substance settled twice, so
the C1 breakdown threshold (above single-session size) is not reached.
The recorded fallback cut — vocabulary first, then the three rule
amendments with the cover note — is unchanged and needs no new
argument if execution finds the set too large.

## Decisions for the gate

**No new owner decision surfaced at the specify stage.** The plan's
five decisions stand as adopted, and no sixth is staged.

Four questions arose while writing the criteria and were **decided as
specification content**, each being a Planner call over how the
artifacts read rather than an owner call over scope or route. They are
listed so the owner can overturn any of them at the same gate without
a separate exchange:

- the PR link in each Release-register entry is a marked placeholder
  with a fill instruction, rather than an omission (B5);
- each proposal carries a provenance line naming version, commit, and
  date, with an instruction to re-verify before the PR is opened (D3);
- each register entry states that it is independent of the other three,
  so four merges leave four coherent entries (B7);
- the five documents take the outcome-named filenames listed under
  *Behavior*, following P1-N008's precedent rather than node numbering.

## References

- [P1-N015 plan](../plans/p1-n015-methodology-amendments-delegated-work.md)
  — outcome, approach, amendment table, scope boundary, and the five
  adopted decisions.
- [P1-N008 specification](p1-n008-mtool-checker-extension-point.md) and
  [its proposal](../proposals/mtool-custom-type-checker.md) — the
  precedent for a proposal-class node's criteria and for the artifact's
  shape.
- **P1-N001 (Orchestrator v1) has no specification document**, so this
  node inherits no integration properties from its parent. The parent's
  constraints reach it through the
  [founding plan](../plans/orchestrator-v1.md) instead.
- [rulings.md](../rulings.md) — RU-002 (the owner hand-carries
  upstream-bound output), RU-003 (a node targeting an external party
  completes at the artifact), RU-005 (proposal-class nodes gate at
  `verifying`).
- [profiles.md](../process/profiles.md) — the C1 profile: criteria-list
  specifications, self-verification, owner-designated gates.
- [plan-model.md](../process/plan-model.md) — the `specified` exit
  condition: criteria exist before the work they verify.
- [process spec README](../process/README.md) — the *Defined terms*
  section, A3's evidencing instance.
- [methodology release process](https://github.com/majodali/methodology/blob/v1.4.0/docs/release-process.md)
  — section 1 (proposed), which these criteria enforce.
- [methodology Release register](https://github.com/majodali/methodology/blob/v1.4.0/docs/releases.md)
  — the v1.4.0 entries, the worked examples for entry shape.
- [methodology Portfolio register](https://github.com/majodali/methodology/blob/v1.4.0/docs/registers/portfolio.md)
  — the projects an impact assessment must name.
