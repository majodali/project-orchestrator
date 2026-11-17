# Documents and specifications are bounded

Status: draft (written on 2026-11-17 under task T149 of node P4-N026, Upstream proposals batch; not yet approved for carrying; no stranger rounds run; one term awaits ratification)

<!-- K-007 contract: Status transitions draft → approved for carrying
     (the project-orchestrator owner, at the hold on node P4-N026) →
     delivered (hand-carried into an upstream pull request, text
     unchanged) → accepted / amended / rejected, a disposition the
     methodology records, not this file. Written IR first; its IR,
     bounded-specification-depth.ir.md, sits beside it. Proposal three
     of three: see the cover note. -->

Reader: RD-4 (a fresh agent session) in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers),
and the maintainers who adjudicate the amendment. The reader knows the
methodology at version 1.6.0, in particular its [rule
corpus](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/README.md).
The proposal was rendered from its intermediate representation (IR),
[bounded-specification-depth.ir.md](bounded-specification-depth.ir.md).

**To:** the maintainers of majodali/methodology.

**Adds:** one rule to the Knowledge section, suggested identifier
K-013, and one vocabulary row, criteria list.

**Asked of the reader:** accept the amendment, accept it with
amendments, or reject it.

**Provenance**: every quote of majodali/methodology below was taken on
2026-11-17 from `main` at commit
`4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57` (committed 2026-11-02), the
head of `main` on that day. The released version is v1.6.0, tag commit
`3e3482921e7e23bb4ad690b40394bf00b7feb37f`. This line also covers the
IR beside this file. The owner, who carries the proposal under RU-002
(upstream output is hand-carried), re-verifies each quote against
upstream `main` before carrying it. The quotes may have moved.

## The problem

The methodology bounds one
[Document](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-document)
by length. K-002 (the Agent bootstrap is a pointer, not a record) says
the Agent bootstrap should stay under about 200 lines. No rule bounds
the length of any other Document or the depth of a
[Specification](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-specification).


On 2026-11-09 project-orchestrator held about 400,000 words under
`docs/` in 82 files. Its specifications held 173 distinct criterion
labels. Twelve specification documents written before the rebuild
hold between 247 and 1,376 lines. Eleven of the twelve exceed 300
lines.

The review of 2026-11-09 found what made the documentation hard to
comprehend: the number of documents and the volume per decision, not
sentence length.

## The change

This proposal introduces one term.

- <a id="def-criteria-list"></a>**Criteria list**: a Specification
  given as a list of criteria. A criterion is one statement of an
  observable result that a reviewer judges met or unmet.

The proposal adds one rule to the Knowledge section of the rule
corpus. It suggests the identifier K-013. The maintainers assign the
identifier.

Under the rule, a Document under `docs/` should hold at most 300
lines. A Specification should be a [criteria
list](#def-criteria-list) of at most 20 criteria. A project lists
each Document that exceeds a bound, with the reason, in its
documentation.

The rule exempts three kinds of Document: a
[rendering](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-rendering),
a
[Register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-register),
and a Document whose opening status line marks it as a record no
longer maintained. A Register is exempt because the rebuild's
evidence about registers supports proposal two of the batch,
[registers as data files with renderings](registers-as-data-files.md),
not a line bound.

The two bounds carry the keyword SHOULD. The listing duty carries the
keyword MUST. The rule applies from criticality tier C1, the default
of the Knowledge section.

New text, final [normative
text](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-normative-text),
appended to `docs/rules/knowledge.md` after the last rule of the
file. At commit `4c7b1dd` the last rule is K-011 (found contradictions
are marked, not routed around). If proposal two is accepted first, the
new rule follows K-012.

```markdown
### K-013 — Documents and specifications are bounded
Applies: [C1+]
Keywords: SHOULD, MUST
Motivated-by: project-orchestrator, 2026-11-17 — twelve specification documents of 247 to 1,376 lines before its rebuild; nine nodes of the [rebuild plan](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/plans/rebuild.md) planned and verified against criteria lists of 4 to 15 criteria, under a 300-line bound on hand-written documents
Cites: [K-002](#k-002--the-agent-bootstrap-is-a-pointer-not-a-record) (the Agent bootstrap's line bound, the existing model); [criteria list](../vocabulary.md#def-criteria-list)
Protects: [proportional verification](../vocabulary.md#def-proportional-verification) — a reviewer judges each criterion of a bounded list met or unmet

**Statement**: A [Document](../vocabulary.md#def-document) under
`docs/` SHOULD hold at most 300 lines. A
[Specification](../vocabulary.md#def-specification) SHOULD be a
[criteria list](../vocabulary.md#def-criteria-list) of at most 20
criteria. A project MUST list each Document that exceeds either
bound, with the reason, in its documentation.

**Exceptions**: Three kinds of Document are outside both bounds: a
[rendering](../vocabulary.md#def-rendering); a
[Register](../vocabulary.md#def-register); and a Document whose
opening status line marks it as a record that is no longer
maintained.

**Rationale**: A reader reaches a fact by opening documents, and a
reviewer checks a specification item by item. Both costs grow with
length. A bound that a document may exceed with a stated reason keeps
the excess visible without forcing a rewrite.
```

The proposal adds one vocabulary row, criteria list. It changes no
other rule and no other vocabulary row.

Current text, quoted verbatim from `docs/vocabulary.md`: the row the
new row follows.

```markdown
- <a id="def-rendering"></a>**Rendering** — a text produced from a source by a stated
  procedure. The rendering adds no claim the source lacks. It drops no
  claim the procedure says it carries (owner, 2026-10-30, ratified at
  project-orchestrator node P3-N007's gate,
  [record](records/k-003-planning-execution-model.ir.md)).
```

New text, final, inserted after that row:

```markdown
- <a id="def-criteria-list"></a>**Criteria list** — a
  [Specification](#def-specification) given as a list of criteria. A
  criterion is one statement of an observable result that a reviewer
  judges met or unmet (project-orchestrator, 2026-11-17,
  [K-013](rules/knowledge.md#k-013--documents-and-specifications-are-bounded)).
```

## The evidence from the rebuild

The owner set both bounds for the rebuild of project-orchestrator on
2026-11-09. Nine nodes of the rebuild carry a criteria list in a plan
and no specification document. The lists are in [the rebuild
plan](../plans/rebuild.md) and its
[record](../archive/plans/rebuild-record.md).

| Node | Criteria | State at commit `b1c8b9f` |
|---|---|---|
| P4-N022 (Re-plan of the remaining nodes) | 7 | done, verified |
| P4-N023 (Role agents on the task loop) | 9 | done, verified |
| P4-N024 (Pruned document set) | 12 | done, verified at the second try |
| P4-N025 (README and generated Backlog) | 10 | done, accepted by the owner |
| P4-N026 (Upstream proposals batch) | 8 | executing |
| P4-N027 (Pilot enlistment of methodology-tools) | 15 | not started |
| P4-N031 (Document paths changed through the service) | 5 | done, verified |
| P4-N032 (Linked plans and specs archived) | 6 | done, verified |
| P4-N034 (Delegated tasks claimed without asking) | 4 | done, verified |



A reviewer verified six of the seven done nodes on a [check
node](../vocabulary.md#def-check-node), against the node's criteria
list and its outcome. The owner accepted the seventh, P4-N025, after
its orientation test.

One of the six verifications failed once. Task T138 named the unmet
criterion and the file that failed it. The node passed verification
in task T139 after the rework.

On 2026-11-16 a fresh session given only the README stated what is
done, what is next and what waits on the owner. It took three tool
calls.

The words under `docs/`, outside `docs/archive/`, numbered 76,401 on
2026-11-17. Most of the fall came from archiving superseded
documents, not from the line bound.

Ten hand-written Documents of project-orchestrator exceed 300 lines
at commit `b1c8b9f`. The rebuild record lists each with the reason.
Two Documents stand at exactly 300 lines: the rebuild plan and [the
task loop](../process/task-loop.md). The rebuild plan stays at 300
lines because its finished parts moved to a record of 784 lines in
the archive. The line bound therefore moved some text out of a
maintained Document and did not remove the text.


One limit of this evidence: the rebuild changed the data model, the
process and the bounds at once. The evidence does not isolate the
effect of the bounds.

## Release-register entry

The entry below is written for the [Release
register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-release-register).
Its title is the rule's title. It names project-orchestrator as the
suggesting project, with the criteria lists of the rebuild plan at
commit `b1c8b9f` as the evidencing instance.

The impact assessment covers every row of the [Portfolio
register](https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/registers/portfolio.md)
at commit `4c7b1dd`. It measured methodology, methodology-tools and
project-orchestrator. It did not measure the seven other projects
that hold a Classification.


```markdown
### Documents and specifications are bounded

- **PR**: `<PR URL>`. The owner fills this placeholder when the pull
  request is opened.
- **Suggested by**: project-orchestrator, 2026-11-17. The evidencing
  instance is the
  [rebuild plan](https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/plans/rebuild.md)
  at commit `b1c8b9f`. Nine of its nodes carry a criteria list of 4
  to 15 criteria and no specification document. Seven are done, six
  of them verified by a reviewer against the list. Before the
  rebuild, twelve specification documents held 247 to 1,376 lines.
- **Impact assessment**: every row of the
  [Portfolio register](registers/portfolio.md).
  - methodology: *accommodated* by listing seven Documents over 300
    lines at commit `4c7b1dd`: the IR specification's review record
    and IR, the service review's IR, the practices, the vocabulary,
    the constitution and the vision's IR. The Release register and
    the Backlog are Registers and outside the bound.
  - methodology-tools: *accommodated* by listing one Document over
    300 lines at commit `296ba46`,
    `docs/proposals/custom-type-checker-extension.md`.
  - project-orchestrator: *accommodated* as the evidencing instance.
    It already lists its ten Documents over the bound.
  - allegro, in-real-life, in-real-life-ops, in-real-life-org,
    project-orchestrator-service, serverless-web-app-template and
    communication-pipeline: *accommodated* by the same listing,
    because both bounds are SHOULD. Their Documents were not measured
    for this assessment.
  - The thirteen rows marked implicit C0: *not affected*, because the
    rule applies from C1.
  - The vocabulary gains *criteria list*.
- **Migration note**: a project measures its Documents under `docs/`
  and lists each that exceeds a bound, with the reason. It rewrites
  no existing Document on migration.
```

## The ask

project-orchestrator asks the maintainers of majodali/methodology to
accept the amendment, accept it with amendments, or reject it, under
Article 8 (amendments, versions, and migration).

Before the proposal is carried, the project-orchestrator owner reviews
it at the hold on node P4-N026 under RU-005 (proposal-class nodes are
owner-gated at verifying). At that hold the owner approves the
proposal for carrying, amends it or returns it. At that hold the
proposal also asks the owner to ratify or strike the term it
introduces, [criteria list](#def-criteria-list).

<!-- render map: C1→¶7 C2→¶7 C3→¶8 C4→¶8 C5→¶8 C6→¶9 C7→¶12 C8→¶12 C9→¶13 C10→¶13 C11→¶13 C12→¶14 C13→¶14 C14→¶15 C15→¶15 C16→¶17 C17→¶17 C18→¶20 C19→¶20 C20→¶22 C21→¶22 C22→¶23 C23→¶23 C24→¶24 C25→¶24 C26→¶25 C27→¶26 C28→¶26 C29→¶27 C30→¶27 C31→¶27 C32→¶27 C33→¶28 C34→¶29 C35→¶29 C36→¶30 C37→¶30 C38→¶30 C39→¶30 C40→¶30 C41→¶30 C42→¶30 C43→¶30 -->
