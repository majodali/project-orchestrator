# Release of the K-003 amendment

Status: draft (written on 2026-11-17 under task T149 of node P4-N026, Upstream proposals batch; not yet approved for carrying; no stranger rounds run)

<!-- K-007 contract: Status transitions draft → approved for carrying
     (the project-orchestrator owner, at the hold on node P4-N026) →
     delivered (hand-carried upstream, text unchanged) → released /
     declined, a disposition the methodology records, not this file.
     Written IR first; its IR, k-003-amendment-release.ir.md, sits
     beside it. Proposal one of three: see the cover note. -->

Reader: RD-4 (a fresh agent session) in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers),
and the owner of majodali/methodology, who cuts releases. The reader
knows the methodology at version 1.6.0 and its [release
process](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/release-process.md).
The proposal was rendered from its intermediate representation (IR),
[k-003-amendment-release.ir.md](k-003-amendment-release.ir.md).

**To:** the owner of majodali/methodology.

**Asks for:** release v1.7.0, cut from `main` as it stands.

**Changes:** one heading of the Release register. No rule and no
vocabulary row.

**Provenance**: every quote of majodali/methodology below was taken on
2026-11-17 from `main` at commit
`4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57` (committed 2026-11-02), the
head of `main` on that day. The released version is v1.6.0, tag commit
`3e3482921e7e23bb4ad690b40394bf00b7feb37f`. This line also covers the
IR beside this file. The owner, who carries the proposal under RU-002
(upstream output is hand-carried), re-verifies each quote against
upstream `main` before carrying it. The quotes may have moved.

## The amendment is accepted and not released

The
[owner](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-human-owner)
accepted the amendment of K-003 (the Backlog is the single source of
progress truth) on 2026-11-02 by merging methodology pull request 73.
The amended K-003 stands on `main` at commit `4c7b1dd`. The amendment's
entry stands in the Unreleased section of the [Release
register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/releases.md).


The latest release is v1.6.0, tagged at commit `3e34829`. The
Unreleased section holds five amendment entries at commit `4c7b1dd`.
The release process forbids a project to pin or adopt unreleased
`main`: "Nothing MAY pin or adopt unreleased `main`: compliance
targets reference releases only."

K-003 as it stands on `main`, quoted verbatim from
`docs/rules/knowledge.md`. A render-map comment follows the section
upstream and is not quoted.

```markdown
### K-003 — The Backlog is the single source of progress truth
Applies: [C1+] (criticality tier C1 and above)
Keywords: MUST
Motivated-by: [proposal A2](../practices.md); convergent independent practice in [allegro BACKLOG.md](https://github.com/majodali/allegro) and [in-real-life docs/backlog.md](https://github.com/majodali/in-real-life); extended by project-orchestrator in a [proposal](https://github.com/majodali/project-orchestrator/blob/25e92e8ef541e0929e7e447f582edc15d3ec7629/docs/proposals/planning-execution-model-is-progress-truth.md) approved by the [owner](../vocabulary.md#def-human-owner) for carrying at that project's node [P3-N007](https://github.com/majodali/project-orchestrator/blob/25e92e8ef541e0929e7e447f582edc15d3ec7629/docs/plans/p3-n007-type-declared-amendment-drafted.md#gate-record-2026-10-30-at-verifying) on 2026-10-30, with the [record](https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model-slice-record.md) of the project-orchestrator's [Project model](https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md) at commit `86a1330` as the evidencing instance, which rendered the [implementation map](#k-003--the-backlog-is-the-single-source-of-progress-truth) and the [list of what is next](../vocabulary.md#def-list-of-what-is-next) and compared both with the project-orchestrator Backlog
Cites: [C-tier](../vocabulary.md#def-c-tier) (the criticality scale of the Applies line); [Constitution Article 7](../constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox) and the [planning/execution model](../vocabulary.md#def-planning-execution-model) row (how a [Classification](../vocabulary.md#def-classification) declares the model)
Protects: [provenance](../vocabulary.md#def-provenance) — each claim of what is done and what is next traces to one record

Every project MUST keep a Backlog: one dependency-ordered [Register](../vocabulary.md#def-register) of
completed and upcoming work. Checked entries MUST be rewritten to
describe what actually shipped, so the completed section doubles as the
implementation map. Where the project declares a [Workflow](../vocabulary.md#def-workflow), entries MUST
carry current [stage designations](../vocabulary.md#def-workflow) (Article 4 declaration accuracy). The
Backlog is the [referent](../vocabulary.md#def-referent) for "what is done and what is next"; no other
document may claim that role, except as the next sentence provides.
Where the project's Classification
declares a planning/execution model, that model is the referent
instead, and the Backlog's implementation map and list of what is next
are [renderings](../vocabulary.md#def-rendering) of it.

**Rationale**: the stage-designation clause deliberately mirrors
Article 4's declaration-accuracy duty — a mirror, not a duplication
(review round 1 adjudication, 2026-08-30).
```

## The proposal of 2026-10-30, re-verified

project-orchestrator proposed the amendment on 2026-10-30 in
[planning-execution-model-is-progress-truth.md](../archive/proposals/planning-execution-model-is-progress-truth.md),
now archived with its IR and its review record. The sentence appended
to K-003 on `main` matches, word for word, the sentence that proposal
proposed.

K-003 on `main` differs from that proposal's replacement text in six
places:

1. The Applies line gains the gloss "(criticality tier C1 and above)".
2. The Motivated-by line cites the proposal, its gate and the slice
   record in other words.
3. The Cites line names the C-tier, Article 7 and the
   planning/execution model row.
4. A Protects line is added.
5. Five terms in the statement are linked to the vocabulary.
6. The referent clause gains the marker "except as the next sentence
   provides".

The owner adopted the sixth, the marker, on 2026-11-01. None of the
six changes what project-orchestrator asked for on 2026-10-30. The
vocabulary on `main` holds the rows planning/execution model, list of
what is next and rendering, and the K-003 sense of referent.


## What project-orchestrator did since the proposal

project-orchestrator has applied the amendment before its release
since 2026-11-09, as a deviation recorded in its
[Classification](../classification.md). The deviation ends when the
amendment is released and pinned in project-orchestrator.

The [state file](../vocabulary.md#def-state-file),
`orchestration/state.json`, holds the project's plan: 95 nodes, 139
tasks and 56 decisions at commit `b1c8b9f`. Since 2026-11-16 the
project's [Backlog](../backlog.md) is a
[rendering](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-rendering)
of the state file, one row per node. The check `plan-state check`
fails when a rendered file differs from the rendering.


Two facts differ from the proposal of 2026-10-30. The Project model,
whose slice that proposal cited as the evidencing instance, was
retired from the project's custom definitions on 2026-11-14. The
state file records each verification as a task on a [check
node](../vocabulary.md#def-check-node), with a summary and a pull
request. Its schema has no separate field for verification evidence.


## The change asked

The proposal asks the owner to cut the next release from `main`,
carrying the Unreleased section as it stands. The release is a minor
release, because the Unreleased section holds normative change. The
next minor version after v1.6.0 is v1.7.0.

The release pull request retitles the Unreleased section with the
version and the date of the release. It leaves a fresh empty
Unreleased section above the retitled section. The retitled section
is the release's migration notes, so the release pull request writes
nothing else. After the merge the owner creates the annotated tag
`v1.7.0`. An agent never creates a version tag.


Current text, quoted verbatim from `docs/releases.md`: the heading of
the Unreleased section and the heading of its first entry.

```markdown
## Unreleased

### A declared planning/execution model is the source of progress truth
```

Replacement, final text. The owner writes the date of the release in
place of `<release date>`. "Nothing yet." is the wording the register
used for an empty Unreleased section at v1.6.0.

```markdown
## Unreleased

Nothing yet.

## v1.7.0 — <release date>

### A declared planning/execution model is the source of progress truth
```

The proposal asks for no change to K-003, to the vocabulary or to any
other rule. project-orchestrator needs one of the five Unreleased
entries, the K-003 amendment. The four other entries ride with the
release, because `main` between tags is one release candidate:

- The stranger rounds take evaluation case 012's changes.
- The stranger rounds take evaluation cases 010 and 011's changes.
- IR-only documents.
- The stranger rounds take evaluation case 009's four changes.



## What project-orchestrator does after the release

After the release, project-orchestrator raises one migration pull
request. It moves the pin from 1.6.0 to the release. It declares the
state file as the project's [planning/execution
model](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-planning-execution-model),
by an entry in the Custom definitions section of the Classification.
It removes the K-003 entry from the Deviation register. It adopts each
of the four other amendments or records a deviation with its
rationale.

One mismatch stands in the way of a clean declaration. The vocabulary
row for planning/execution model says the declaring entry "names the
custom document types that make up the model". project-orchestrator
declares the state file as a custom artifact type, not as a custom
document type. Proposal two of the batch, [registers as data files
with renderings](registers-as-data-files.md), asks for the words "or
custom artifact types" in that row. If the release ships without
proposal two, the migration pull request still declares the state
file. In that case it records the mismatch with the vocabulary row as
a deviation.

## The ask

project-orchestrator asks the owner of majodali/methodology to cut
release v1.7.0 from `main`, under section 4 of the release process.

Before the proposal is carried, the project-orchestrator owner reviews
it at the hold on node P4-N026 under RU-005 (proposal-class nodes are
owner-gated at verifying). At that hold the owner approves the
proposal for carrying, amends it or returns it.

<!-- render map: C1→¶7 C2→¶7 C3→¶7 C4→¶8 C5→¶8 C6→¶8 C7→¶10 C8→¶10 C9→¶13 C10→¶13 C11→¶13 C12→¶13 C13→¶14 C14→¶14 C15→¶15 C16→¶15 C17→¶15 C18→¶16 C19→¶16 C20→¶16 C21→¶17 C22→¶17 C23→¶17 C24→¶18 C25→¶18 C26→¶18 C27→¶18 C28→¶18 C29→¶23 C30→¶23 C31→¶23 C32→¶24 C33→¶24 C34→¶24 C35→¶24 C36→¶25 C37→¶25 C38→¶25 C39→¶25 C40→¶25 -->
