# IR: A declared planning/execution model is the source of progress truth

Reader: RD-4 (a fresh agent session) reading K-003 and the proposal beside this IR; the maintainers of majodali/methodology adjudicate the amendment, and the project-orchestrator owner gates the proposal before it is carried.
Purpose: document. The proposal to amend K-003 (the Backlog is the single source of progress truth) in place by one conditional sentence, so that a project whose Classification declares a planning/execution model takes that model as its referent for what is done and what is next.
Status: draft (rendered by the reasoning role on 2026-10-30; round 7; round 6 not readable, 6 of 6 findings fixed, the step-6 passage matched on restatement; round 5 not readable, 9 of 10 findings fixed, all held at confirmation, 7 new defects fixed; round 4 not readable, 13 of 14 findings fixed and 1 re-fixed after confirmation, 1 declined, one step-6 structural fix awaiting restatement; round 3 not readable, 15 of 16 findings fixed and 1 re-fixed after confirmation, 1 declined; round 2 not readable, 18 of 19 findings fixed and 1 re-fixed after confirmation, 1 declined; round 1 not readable, 20 of 23 findings fixed and 5 re-fixed after confirmation, 3 declined; 88 claims; 2 unratified terms)
Source: RU-021 (the planning/execution model is the source of progress truth), owner, 2026-10-29; decisions 10 to 13 of the P3-N002 specification's gate record of 2026-10-29; decisions 4 to 6 of the P3-N007 plan, adopted on 2026-10-30; the Project model slice at commit 86a1330.
Normative: yes
Footprint: docs/proposals/planning-execution-model-is-progress-truth.md; docs/backlog.md

Provenance: K-003 is quoted in E1 against majodali/methodology v1.6.0, commit `3e34829`, on 2026-10-30, and checked unchanged against the methodology's `main` at commit `195eba9` on 2026-10-30. This line covers the IR and the proposal beside it. The owner, who carries the proposal upstream under RU-002 (upstream output is hand-carried), re-verifies the quote against upstream `main` before carrying it; the quote may have moved.

## Terms

T1. Planning/execution model: the plan model of a project plus the verification evidence of each node. defined-at: https://github.com/majodali/methodology/blob/350f75f0a11b326eb1f536f172359b1cc8a9cb1e/docs/vocabulary.md#def-planning-execution-model [decided: owner, 2026-10-28]

T2. Backlog: the one dependency-ordered register of completed and upcoming work that K-003 requires of every project. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth [decided: methodology v1.6.0, K-003]

T3. Classification: a project's binding declaration of its tier, pinned version and other fields. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-classification [decided: methodology v1.6.0, vocabulary]

T4. Implementation map: the Backlog's completed section, whose checked entries describe what actually shipped. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth [decided: methodology v1.6.0, K-003]

T5. List of what is next: the Backlog's answer to what is next. Under K-003 as released it is the Backlog's entries of upcoming work; under the amendment it is rendered from the model and holds nodes only. [proposed: this IR]

T6. Rendering: a text produced from a source by a stated procedure. The rendering adds no claim the source lacks. It drops no claim the procedure says it carries. [proposed: this IR]

T7. Node: one unit of work at any level of a project's plan hierarchy. defined-at: https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/README.md#def-node [decided: project-orchestrator process specification]

T8. Plan register: the project-orchestrator register that holds the plan hierarchy and each node's stage. defined-at: https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/process/plan-register.md [decided: project-orchestrator Classification, custom definitions]

T9. Project model: the project-orchestrator document type that describes each part of a project and records which nodes create, modify and use the part. defined-at: https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md [decided: owner, 2026-10-29]

T10. Edge: a recorded relation from one node to one part of the project, labelled creates, modifies or uses. defined-at: https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md#def-edge [decided: owner, 2026-10-29]

T11. Portfolio register: the methodology's enumeration of all majodali projects. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-portfolio-register [decided: methodology v1.6.0, vocabulary]

T12. Release register: the methodology's register of amendments and releases, in docs/releases.md. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-release-register [decided: methodology v1.6.0, vocabulary]

T13. Part: a component, document, ruling or repository of a project that nodes create, modify or use, which the Project model type specification calls a resource. defined-at: https://github.com/majodali/project-orchestrator/blob/38138c9b952ad995fc2e16725768564ae79a6571/docs/process/project-model.md#def-resource [decided: owner, 2026-10-29]

T14. Owner: the one human who owns the methodology and its portfolio projects, project-orchestrator among them, and who adjudicates amendments. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/vocabulary.md#def-human-owner [decided: methodology v1.6.0, vocabulary]

T15. Referent: the record a reader consults for what is done and what is next, the role K-003 gives the Backlog. defined-at: https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth [decided: methodology v1.6.0, K-003]

T17. Full instance: the Project model with an entry for every part of the repository; node P3-N008 (the instance, over this repository) is planned to build it. defined-at: https://github.com/majodali/project-orchestrator/blob/198768a21da88d3b702563ae0a26a6dacfcace26/docs/plan-register.md [decided: project-orchestrator Plan register, P3-N008]

T16. Slice: the first five entries of the project-orchestrator Project model, built by node P3-N006 (the thin end-to-end slice) and pinned at commit 86a1330. defined-at: https://github.com/majodali/project-orchestrator/blob/86a13308f70574abc0223ddb4f044b7e43ca1eb6/docs/project-model-slice-record.md [decided: project-orchestrator P3-N006 plan, 2026-10-29]

## Claims

### The problem

C1. K-003 (the Backlog is the single source of progress truth) makes the Backlog the referent for what is done and what is next. evidence: E1. [decided: methodology v1.6.0, K-003]

C2. K-003 forbids any other document to claim the role of that referent. evidence: E1. [decided: methodology v1.6.0, K-003]

C3. On 2026-10-28 the owner decided that each project's planning/execution model is the primary source of truth about progress. evidence: E4. [decided: owner, 2026-10-28]

C4. On 2026-10-28 the owner decided that the implementation map and the list of what is next become renderings of the planning/execution model. evidence: E4. [decided: owner, 2026-10-28]

C5. On 2026-10-28 the owner decided that the Backlog becomes a rendering project by project, as each project adopts the project-orchestrator. evidence: E4. [decided: owner, 2026-10-28]

C6. A project that keeps a planning/execution model beside a Backlog under K-003 as released records what is done and what is next twice. [inferred: R1]

C7. K-003 as released lets no project make its planning/execution model the referent for what is done and what is next. [inferred: R3]

### The change

C8. The amendment changes K-003 in place by appending one conditional sentence to the rule's statement and one citation to its Motivated-by line. evidence: E12. [decided: owner, 2026-10-29]

C9. The appended sentence reads: "Where the project's Classification declares a planning/execution model, that model is the referent instead, and the Backlog's implementation map and list of what is next are renderings of it." [proposed: this IR]

C10. A project whose Classification declares no planning/execution model reads K-003 unchanged. [decided: owner, 2026-10-29]

C11. The amendment leaves K-003's sentence on Workflow stage designations unchanged. [decided: owner, 2026-10-29]

C12. The amendment says nothing about the verification evidence of each node, the record of whether the node's work holds. [decided: owner, 2026-10-29]

C84. A planning/execution model has two components: the plan model, the project's nodes with their stages and edges, and the verification evidence of each node. evidence: E2. [decided: owner, 2026-10-28]

C85. The amendment reaches the plan model only. [proposed: this IR]

C13. The amendment keeps K-003's title, so links to the rule's anchor keep resolving. [proposed: this IR]

C14. K-003's title stays true for every project whose Classification declares no planning/execution model. [proposed: this IR]

C87. For a project that declares a planning/execution model, the rule's statement governs, because the title is the rule's name and not its text. [proposed: this IR]

C15. K-003's Motivated-by line gains a citation of the evidencing instance, the slice at commit 86a1330, described under The evidencing instance. evidence: E3. [proposed: this IR]

C16. The amendment changes no other part of K-003. [proposed: this IR]

C77. The appended sentence is an exception to the two referent sentences before it. [proposed: this IR]

C83. Where the exception applies, K-003's sentences "The Backlog is the referent for what is done and what is next" and "no other document may claim that role" both yield to it. [proposed: this IR]

C17. A condition on a Classification declaration lets the rule apply mechanically, project by project, as RU-021 (the planning/execution model is the source of progress truth) directs. evidence: E12. [decided: owner, 2026-10-29]

### What the model is authoritative for

C18. Under the amendment, a project's declared planning/execution model is authoritative for the stage of each node. evidence: E6. [proposed: this IR]

C19. The model is authoritative for each part's state, as derived from the stages of the nodes that create and modify the part. evidence: E6. [proposed: this IR]

C20. The model is authoritative for the recorded edges from nodes to the parts the nodes create, modify and use. evidence: E6. [proposed: this IR]

C21. The model renders the implementation map as one row per part, with the part's derived state and the nodes that created and modified the part. evidence: E6. [proposed: this IR]

C22. The model renders the list of what is next over every node of the model, one item per node not yet done, each with the node's stage and the nodes that node waits for. evidence: E6. [proposed: this IR]

C23. The model is not authoritative for whether a part works. evidence: E6. [proposed: this IR]

C24. The model is not authoritative for which node starts next among the nodes free to start. evidence: E6. [proposed: this IR]

C74. The choice of which node starts next also depends on the scope and budget the owner approves. evidence: E6. [proposed: this IR]

C25. The amendment claims no authority for three further items the model carries for each part: the part's description, its links to specifications and its links to entries of the project's Risk register. evidence: E7. [proposed: this IR]

C26. A term-by-term cross-check found each authority in this section stated by a named section of the Project model type specification. evidence: E7. [proposed: this IR]

### Open Backlog entries that name no node

C27. Under the amendment, an open Backlog entry that names no node stays in the Backlog's upcoming section, outside the rendered list, as the Backlog's own content. evidence: E12. [decided: owner, 2026-10-30]

C28. Under the amendment, the rendered list of what is next holds nodes only. [decided: owner, 2026-10-30]

C29. An open Backlog entry joins the list of what is next when it becomes a node, or when a node's plan takes it in. [decided: owner, 2026-10-30]

C30. Entering each small finding as a node would add planning ceremony that the finding does not need. [decided: owner, 2026-10-30]

C31. At drafting, 31 of the 139 open entries in the project-orchestrator Backlog named no node. evidence: E8. [decided: project-orchestrator docs/backlog.md at commit 198768a]

C32. The count takes one entry to be a checkbox line plus the lines that follow it up to the next entry or heading. [proposed: this IR]

C33. The count takes an entry as open when the entry's checkbox is unchecked. [proposed: this IR]

C34. The count takes an entry as naming a node when its text holds a node identifier such as P3-N007, the node that drafted this proposal. [proposed: this IR]

C86. An entry a node holds names that node, and an entry that merely mentions a node is counted as naming it too. [proposed: this IR]

C35. So 31 is a lower bound on the open entries no node holds. [proposed: this IR]

### Whether "built but broken" stands

C36. Under the amendment, a part's derived state `built` says the work on the part is done, not that the part works. evidence: E6. [proposed: this IR]

C37. The known limit that the model cannot say "built but broken" stands under the amendment. [proposed: this IR]

C38. The limit stands because whether a part works is verification evidence, which the amendment leaves outside K-003. [inferred: R4]

C39. The limit's earlier premise, that K-003 stays unamended, no longer holds. [decided: owner, 2026-10-29]

C40. Recording where each node's verification evidence lands is later work on the planning/execution model, outside the amendment. [decided: owner, 2026-10-29]

### The evidencing instance

C41. The evidencing instance is the slice of the project-orchestrator Project model pinned at commit 86a1330. evidence: E3. [decided: owner, 2026-10-29]

C78. The evidencing instance is one of four kinds of evidence for the amendment, beside the owner's decisions, the term-by-term cross-check and the count of open Backlog entries. evidence: E3, E4, E7, E8. [proposed: this IR]

C42. The slice holds five entries, one per part, derived from documents the repository already held. evidence: E3. [decided: project-orchestrator slice record at commit 86a1330]

C43. From the five entries and the Plan register alone, the slice rendered five implementation-map rows. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C44. Every stage the rows read from the Plan register agreed with the state the entries recorded. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C45. The slice record rendered the list of what is next in a narrower form, per part: the open nodes with an edge to the part. Each of the five lists held no open item. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C75. The slice's plan held back the edges from open nodes to the five parts. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C46. The comparison of the renderings with the Backlog listed eleven differences and left none unexplained. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C47. Of the eleven differences, seven were claims the model lacked, two were claims the Backlog lacked, and two were disagreements. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C48. In both disagreements, the Backlog showed finished work as unfinished while the model showed the work as done. evidence: E5. [decided: project-orchestrator slice record at commit 86a1330]

C49. Under the project-orchestrator criterion G6, node P3-N008 renders the implementation map and the list of what is next over the full instance when it executes. evidence: E12. [decided: owner, 2026-10-29]

C88. Node P3-N008 then compares the renderings with the Backlog. evidence: E12. [decided: owner, 2026-10-29]

C50. If criterion G6 contradicts the slice's evidence, project-orchestrator reopens this proposal with the reason recorded. evidence: E12. [decided: owner, 2026-10-29]

### Dependency

C51. The vocabulary entry for planning/execution model is on the methodology's main branch at commit 350f75f. evidence: E2. [decided: methodology main, commit 350f75f]

C52. The vocabulary entry is unreleased at v1.6.0. evidence: E2. [decided: methodology tags, 2026-10-30]

C53. The amendment needs the vocabulary entry released with the amendment or before the amendment. [decided: owner, 2026-10-30]

### How a Classification declares a model

C54. A Classification declares a planning/execution model by an entry in its Custom definitions section. evidence: E12. [decided: owner, 2026-10-30]

C55. The declaring entry takes Article 7's definition-by-citation form. evidence: E12. [decided: owner, 2026-10-30]

C79. The declaring entry names the types that make up the model. evidence: E12. [decided: owner, 2026-10-30]

C56. The declaration needs no new Classification field. evidence: E12. [decided: owner, 2026-10-30]

### Release-register entry

C57. The Release-register entry's title is "A declared planning/execution model is the source of progress truth". [proposed: this IR]

C58. The entry's PR field is a placeholder that the owner fills with the pull request's URL when the pull request is opened. [proposed: this IR]

C59. The entry names project-orchestrator as the suggesting project, with RU-021 and the slice at commit 86a1330. [proposed: this IR]

C60. The impact assessment covers every row of the Portfolio register at v1.6.0. evidence: E10. [proposed: this IR]

C61. The methodology repository is accommodated, because K-003 gains one sentence and the methodology's Classification declares no planning/execution model. evidence: E11. [proposed: this IR]

C62. methodology-tools is accommodated, because the sentence binds methodology-tools only once its Classification declares a planning/execution model, which the methodology's roadmap expects at the pilot. evidence: E9. [proposed: this IR]

C63. project-orchestrator is accommodated as the evidencing instance, and declares its planning/execution model only after the amendment is released and pinned there. evidence: E12. [decided: owner, 2026-10-29]

C64. allegro, in-real-life, in-real-life-ops, in-real-life-org, project-orchestrator-service, serverless-web-app-template and communication-pipeline are accommodated, because the sentence binds each only once its Classification declares a planning/execution model. evidence: E10. [proposed: this IR]

C65. The thirteen rows the Portfolio register marks implicit C0, projects with no Classification of their own that Article 7 places at the C0 baseline, are unaffected, because K-003 applies from criticality tier C1. evidence: E10. [decided: methodology v1.6.0, K-003]

C66. The implicit-C0 rows are mc-tools, graph-analysis, open-context, open-context-v1, workbench, chat, antimatter, modcraft, tautology, simple-modeling, parser-generator, software-project-api and chloe-portfolio. evidence: E10. [decided: methodology v1.6.0, Portfolio register]

C67. The migration note says a project that declares no planning/execution model changes nothing. [proposed: this IR]

C68. The migration note says a project that declares a planning/execution model renders its Backlog's implementation map and list of what is next from the model from the declaration on. [proposed: this IR]

C69. From the declaration on, such a project rewrites its checked entries by that rendering of the implementation map. [proposed: this IR]

C76. K-003's duty to rewrite checked entries stands under the amendment, met by that rendering. [inferred: R15]

### The ask

C70. If the amendment is accepted, project-orchestrator declares its planning/execution model once the release is pinned. evidence: E12. [decided: owner, 2026-10-29]

C80. After the declaration, project-orchestrator switches its Backlog's implementation map and list of what is next to renderings of the model. evidence: E12. [decided: owner, 2026-10-29]

C71. If the amendment is accepted with different wording, project-orchestrator re-reads its practice against the released text. [proposed: this IR]

C81. After that re-reading, project-orchestrator adapts the practice. [proposed: this IR]

C72. If the amendment is rejected, the project-orchestrator Backlog stays the referent. [proposed: this IR]

C82. If the amendment is rejected, the Project model stays a description of the project's parts. [proposed: this IR]

C73. After a rejection, project-orchestrator raises the amendment again only with new evidence, such as criterion G6 over the full instance. [proposed: this IR]

## Relations

R1. C6 depends-on C3 because a model that is the source of progress truth records what is done and what is next.

R2. C6 depends-on C1 because the Backlog under K-003 also records what is done and what is next.

R3. C7 depends-on C2 because a planning/execution model claiming the referent's role is another document claiming the role.

R4. C38 depends-on C12 because the verification evidence is the component of the model that would say whether a part works.

R5. C9 depends-on C51 because the appended sentence uses the vocabulary term.

R6. C10 depends-on C9 because the appended sentence binds only on the declaration.

R7. C46 supports C9 because the renderings the sentence requires were produced from the model and compared with the Backlog.

R8. C48 supports C6 because the two records of progress already disagree in the evidencing instance.

R9. C26 supports C18 because the cross-check ties each stated authority to a section of the type specification.

R10. C53 depends-on C51 because a released rule cannot link an unreleased vocabulary entry.

R11. C68 refines C9 because the migration note states when the renderings start.

R12. C37 depends-on C36 because the limit is the gap between work done and a part that works.

R13. C74 refines C24 because the dispatch choice has an input the model does not hold.

R14. C45 depends-on C75 because a list of what is next is rendered from edges to the parts, and the held-back edges were those.

R15. C76 depends-on C69 because a rendering that restates the completed section rewrites its checked entries.

R16. C77 refines C9 because the word "instead" in the appended sentence marks it as the exception.

R17. C78 supports C9 because the four kinds of evidence are what the proposal rests on.

R18. C83 refines C77 because the yielding sentence is the one the exception overrides.

R19. C35 depends-on C86 because counting a mere mention as naming a node can only overcount the entries nodes hold.

R20. C85 depends-on C12 because the amendment says nothing about the verification evidence.

R21. C87 refines C14 because a title that names the common case does not bind the declaring project.

## Evidence

E1. majodali/methodology docs/rules/knowledge.md at tag v1.6.0, commit 3e34829, section K-003, quoted verbatim on 2026-10-30; the same section at main, commit 195eba9, is byte-identical (checked on 2026-10-30 with a diff of the two sections, heading to the next rule's heading). The quoted text:
> ### K-003 — The Backlog is the single source of progress truth
> Applies: [C1+]
> Keywords: MUST
> Motivated-by: [proposal A2](../practices.md); convergent independent practice in [allegro BACKLOG.md](https://github.com/majodali/allegro) and [in-real-life docs/backlog.md](https://github.com/majodali/in-real-life)
> Cites: —
>
> Every project MUST keep a Backlog: one dependency-ordered Register of
> completed and upcoming work. Checked entries MUST be rewritten to
> describe what actually shipped, so the completed section doubles as the
> implementation map. Where the project declares a Workflow, entries MUST
> carry current stage designations (Article 4 declaration accuracy). The
> Backlog is the referent for "what is done and what is next"; no other
> document may claim that role.
>
> **Rationale**: the stage-designation clause deliberately mirrors
> Article 4's declaration-accuracy duty — a mirror, not a duplication
> (review round 1 adjudication, 2026-08-30).

E2. majodali/methodology docs/vocabulary.md at commit 350f75f (2026-10-29), the entry planning/execution model: "the plan model of a project plus the verification evidence of each node: what the web view renders and the source of progress truth (owner, 2026-10-28)". On 2026-10-30, `git tag --contains 350f75f` lists no tag, and the entry is absent from docs/vocabulary.md at v1.6.0.

E3. majodali/project-orchestrator docs/project-model.md and docs/project-model-slice-record.md at commit 86a13308f70574abc0223ddb4f044b7e43ca1eb6 (2026-10-30): five entries (form-checker, plan-register-grammar, run-journal, RU-016, project-orchestrator-repo), each derived from the Plan register, the Backlog, the specifications, the Risk register and the Ruling register.

E4. majodali/methodology docs/vision.ir.md at main, commit 195eba9: claims C8, C19 and C20, each decided by the owner on 2026-10-28.

E5. The slice record at commit 86a1330, section 3: five implementation-map rows; "Procedure step 5 held for all five"; five what-is-next results, each "no open item"; the differences table ML1 to ML7, BL1, BL2, DG1 and DG2; "No difference is unexplained." DG1: checked rows stand under the Backlog's Upcoming heading. DG2: the P1-N005 row's opening says executing while the Plan register and the model say done.

E6. majodali/project-orchestrator docs/process/project-model.md at commit 38138c9b952ad995fc2e16725768564ae79a6571, the type specification: sections "What this type does not claim", "How a project adopts the type", "State derivation", "Edges and the records they come from", "The implementation map" and "The list of what is next".

E7. The term-by-term cross-check, each authority against the section of E6 that states it. Stage of each node (C18): "How a project adopts the type", the Plan register holds each node's stage. Derived state (C19): "State derivation", the table of four rows. Edges (C20): "Defined terms", Edge, and "Edges and the records they come from". Implementation map (C21): "The implementation map", the map carries the state line and the creating and modifying node items. List of what is next (C22): "The list of what is next", steps 1 to 6. Not whether a part works (C23, C36): "What this type does not claim", third item. Not the dispatch choice (C24): "The list of what is next", last paragraph, approved scope. Open entries no node holds (C27, C28): "The list of what is next", last paragraph. Carried with no authority claimed (C25): the is, spec, risks, formerly and alias lines, named under "What each line's items hold". Result: every authority C18 to C24 states has a section, and every line the type lets the model carry is either under one of those authorities or under C25.

E8. majodali/project-orchestrator docs/backlog.md at commit 198768a21da88d3b702563ae0a26a6dacfcace26 (2026-10-30), counted on 2026-10-30 by the rule of C32 to C34: 206 entries, 139 open, 31 of the open entries with no node identifier. The planning count of 2026-10-30, by an unstated pattern, was 33 of 129.

E9. majodali/methodology docs/roadmap.ir.md at main, commit 195eba9, Status draft: claim C28, "At the pilot, methodology-tools declares its planning/execution model in its Classification, and K-003's amended clause then applies to it."

E10. majodali/methodology docs/registers/portfolio.md at v1.6.0: 23 rows, census 2026-08-18, pins refreshed 2026-10-25; ten rows at C1 or C2 and thirteen rows marked implicit C0.

E11. majodali/methodology docs/classification.md at main, commit 195eba9, section Custom definitions: "No custom definitions."

E12. majodali/project-orchestrator at commit 198768a: docs/rulings.md, RU-021; docs/specs/p3-n002-comprehension-model.md, decisions 10 to 13 and the gate record of 2026-10-29; docs/plans/p3-n007-type-declared-amendment-drafted.md, decisions 4 to 6 and the gate record of 2026-10-30.

## Asks

A1. The project-orchestrator owner, at node P3-N007's verifying gate under RU-005 (proposal-class nodes are owner-gated at verifying): approve the proposal for carrying, amend it, or return it. Depends: C9, C26, C31, C37.

A2. The maintainers of majodali/methodology, under Article 8 (amendments, versions, and migration): accept the amendment, accept it with amendments, or reject it. Depends: C9, C53.

A3. The owner: ratify or strike the two terms this IR introduces, list of what is next and rendering. Depends: C9.
