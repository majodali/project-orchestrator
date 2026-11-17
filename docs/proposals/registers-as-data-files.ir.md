# IR: A register kept as data is rendered, never hand-edited

Reader: RD-4
Purpose: document. The proposal to add one rule and two vocabulary edits, so that a project may keep a Register as a checked data file with the Register's Document as a rendering of the data file.
Status: draft (written on 2026-11-17 under task T149 of node P4-N026; no stranger rounds run; 47 claims; unratified terms 0)
Source: criterion two of node P4-N026 (Upstream proposals batch) in docs/plans/rebuild.md; the review of 2026-11-09, docs/archive/reviews/2026-11-09-review-of-the-approach.md; milestone 1 of the rebuild plan; majodali/methodology at main, commit 4c7b1dd.
Normative: yes
Footprint: docs/proposals/registers-as-data-files.md

Provenance: every quote of majodali/methodology in this IR and in the proposal beside it was taken on 2026-11-17 from `main` at commit `4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57` (committed 2026-11-02), the head of `main` on that day. The released version is v1.6.0, tag commit `3e3482921e7e23bb4ad690b40394bf00b7feb37f`. The owner, who carries the proposal under RU-002 (upstream output is hand-carried), re-verifies each quote against upstream `main` before carrying it. The quotes may have moved.

## Terms

T1. Register: an append-oriented Document of uniformly-shaped entries. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-register [decided: methodology v1.6.0, vocabulary]

T2. Document: a markdown file of a defined type. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-document [decided: methodology v1.6.0, vocabulary]

T3. Non-document artifact: source, tests, workflows, built artifacts or hosted views, each an instance of a defined type. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-non-document-artifacts [decided: methodology v1.6.0, vocabulary]

T4. Rendering: a text produced from a source by a stated procedure. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-rendering [decided: owner, 2026-10-30]

T5. Classification: a project's binding declaration of its tier, pinned version and other fields. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-classification [decided: methodology v1.6.0, vocabulary]

T6. Planning/execution model: the plan model of a project plus the verification evidence of each node. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-planning-execution-model [decided: owner, 2026-10-28]

T7. State file: the file orchestration/state.json, which holds the nodes, tasks and decisions of one project and is written only by the orchestration service. defined-at: https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/vocabulary.md#def-state-file [decided: project-orchestrator vocabulary, 2026-11-14]

T8. Backlog: the one dependency-ordered Register of completed and upcoming work that K-003 requires of every project. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/rules/knowledge.md#k-003--the-backlog-is-the-single-source-of-progress-truth [decided: methodology v1.6.0, K-003]

T9. Portfolio register: the methodology's enumeration of all majodali projects. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-portfolio-register [decided: methodology v1.6.0, vocabulary]

## Claims

### The problem

C1. The vocabulary defines a Register as a Document, and a Document as a markdown file. evidence: E1. [decided: methodology main, commit 4c7b1dd]

C2. No rule of the methodology says how a project keeps a Register as data. evidence: E1. [decided: methodology main, commit 4c7b1dd]

C3. Until 2026-11-09 project-orchestrator kept its plan, its task costs, its rulings and its Backlog as markdown files written by hand and read back by parsers. evidence: E2. [decided: project-orchestrator review of 2026-11-09]

C4. On 2026-11-09 the hand-written Backlog of project-orchestrator held 3,542 lines and 30,654 words, and its longest entry held 5,615 words. evidence: E2. [decided: project-orchestrator review of 2026-11-09]

C5. The import of 2026-11-09 found three tasks in the journal with no row in the Cost log. evidence: E3. [decided: project-orchestrator import record, 2026-11-09]

C6. The import of 2026-11-09 found twelve open nodes whose dependency only the order of sibling rows implied. evidence: E3. [decided: project-orchestrator import record, 2026-11-09]

C7. The rebuild had to invent the duties that keep a rendered Register honest, because the methodology states none. [inferred: R1]

### The change

C8. The proposal adds one rule to the Knowledge section of the rule corpus. [proposed: this IR]

C9. The proposal suggests the identifier K-012 for the rule, and the maintainers assign the identifier. [proposed: this IR]

C10. The rule lets a project keep a Register as a data file, a non-document artifact of a custom type declared in the Custom definitions section of the Classification. [proposed: this IR]

C11. Under the rule, the declaration names the schema that defines the type and the check that validates an instance. [proposed: this IR]

C12. Under the rule, the Document of a Register kept as a data file is a rendering of the data file. [proposed: this IR]

C13. Under the rule, the Document names the data file and the rendering procedure in its header. [proposed: this IR]

C14. Under the rule, nobody edits the Document by hand. [proposed: this IR]

C15. Under the rule, an automated check fails when the Document differs from the rendering. [proposed: this IR]

C16. The rule binds no project that keeps every Register by hand. [proposed: this IR]

C17. The proposal adds one sentence to the vocabulary row for Register, which points at the rule. [proposed: this IR]

C18. The proposal adds the words "or custom artifact types" to the vocabulary row for planning/execution model. [proposed: this IR]

C19. The vocabulary row for planning/execution model is on main and unreleased at v1.6.0. evidence: E4. [decided: methodology main, commit 4c7b1dd]

C20. Without the added words, a project whose planning/execution model is a data file cannot declare the model in the form the row states. [inferred: R2]

C21. The proposal changes no other rule and no other vocabulary row. [proposed: this IR]

C22. P-006 (registers hold uniform rows) keeps binding the rendered Document. evidence: E5. [decided: methodology main, commit 4c7b1dd]

### The evidence from the rebuild

C23. The evidencing instance is the state file of project-orchestrator with its checker `plan-state`, at commit b1c8b9f. evidence: E6. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C24. The state file holds 95 nodes, 139 tasks and 56 decisions at commit b1c8b9f. evidence: E6. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C25. The Classification of project-orchestrator declares the state file as a custom artifact type and cites the schema that defines the type. evidence: E7. [decided: project-orchestrator Classification, 2026-11-09]

C26. `plan-state check` validates the state file against the schema and eleven invariants, on every write by the service and in CI. evidence: E8. [decided: project-orchestrator docs/process/state-model.md]

C27. Three Documents are rendered from the state file: the Plan register, the project plan and the Backlog. evidence: E8. [decided: project-orchestrator docs/process/state-model.md]

C28. Each of the three rendered Documents names the state file and the command `plan-state render` in its header. evidence: E9. [decided: project-orchestrator docs/backlog.md at commit b1c8b9f]

C29. Invariant 9 of `plan-state check` fails when a rendered Document differs from the rendering. evidence: E8. [decided: project-orchestrator docs/process/state-model.md, invariant 9]

C30. A CI step of project-orchestrator fails a pull request that changes a file the service owns. evidence: E10. [decided: project-orchestrator .github/workflows/checks.yml at commit b1c8b9f]

C31. The rendered Backlog holds 95 rows in 95 lines, one row per node, each with the four fields P-006 names. evidence: E9. [decided: project-orchestrator docs/backlog.md at commit b1c8b9f]

C32. The import of 2026-11-09 wrote the first state file from the Plan register, the Cost log, the Ruling register, the journal and the decision sections of five plans. evidence: E3. [decided: project-orchestrator import record, 2026-11-09]

C33. The import produced 59 nodes, 103 tasks and 60 decisions. evidence: E3. [decided: project-orchestrator import record, 2026-11-09]

C45. The Plan register rendered after the import listed each of the 59 nodes of the hand-written Plan register, at the stage the hand-written Plan register gave. evidence: E3. [decided: project-orchestrator rebuild record, milestone 1]

C34. The import record lists what the import could not take from a record. evidence: E3. [decided: project-orchestrator import record, 2026-11-09]

C46. After the import, 38 nodes took a hand correction to a title or an outcome. evidence: E3. [decided: project-orchestrator import record, 2026-11-09]

C35. On 2026-11-11 the old form checker failed on states the service had written, and the owner made `plan-state check` the one validity rule. evidence: E11. [decided: owner, 2026-11-11]

C36. The rebuild changed the data model and the review process at once, so the evidence does not isolate the effect of the data file. [proposed: this IR]

### Release-register entry

C37. The Release-register entry's title is "A register kept as data is rendered, never hand-edited". [proposed: this IR]

C38. The entry names project-orchestrator as the suggesting project, with the state file at commit b1c8b9f as the evidencing instance. [proposed: this IR]

C39. project-orchestrator is accommodated as the evidencing instance, because its three rendered Documents already meet each duty of the rule. evidence: E8, E9. [inferred: R3]

C40. methodology-tools is accommodated, because the rule binds methodology-tools only once it keeps a Register as a data file, which the pilot of project-orchestrator plans. evidence: E12. [proposed: this IR]

C41. Every other project with a Classification is accommodated, because the rule binds a project only once it keeps a Register as a data file. [proposed: this IR]

C42. The thirteen rows the Portfolio register marks implicit C0 are unaffected, because the rule applies from criticality tier C1. evidence: E13. [proposed: this IR]

C43. The impact assessment did not read the registers of any project except methodology, methodology-tools and project-orchestrator. [proposed: this IR]

C44. The migration note says a project that keeps every Register by hand changes nothing. [proposed: this IR]

C47. The migration note says a project that keeps a Register as a data file declares the type, adds the header line and adds the check. [proposed: this IR]

## Relations

R1. C7 depends-on C2 because a duty no rule states has to be written by the project that needs the duty.

R2. C20 depends-on C1 because a data file is not a markdown file, so a data file is not an instance of a document type.

R3. C39 depends-on C29 because the check that compares each Document with the rendering is the last of the rule's duties and the other duties are shown by C25, C28 and C30.

R4. C5 supports C10 because a schema with a task per row cannot hold a journal line that has no task.

R5. C35 supports C15 because two validity rules over one record disagreed, and one check over the data file replaced both.

## Evidence

E1. majodali/methodology docs/vocabulary.md at main, commit 4c7b1dd, section "Artifact types": "Document — a markdown file of a defined type" and "Register — append-oriented Document of uniformly-shaped entries". A search of docs/rules/ at that commit for "data file", "JSON" and "generated" finds no rule.

E2. majodali/project-orchestrator docs/archive/reviews/2026-11-09-review-of-the-approach.md at commit b1c8b9f: the table "What is not working, with numbers", row "The Backlog"; the paragraph "Text as database", "Five registers (Plan register, Cost log, Ruling register, Project model, Backlog) are Markdown with grammars. Agents write them by hand; parsers recover them".

E3. majodali/project-orchestrator orchestration/import-record.md at commit b1c8b9f, written by `plan-state import` on 2026-11-09: "Counts: 59 nodes, 103 tasks, 60 decisions"; the list "Open nodes with no recorded dependency", twelve nodes; the list "Tasks in the journal with no Cost log row", T017, T101 and T102; the list "Decision sections read", five plans; the list "Overrides applied", 38 nodes. docs/archive/plans/rebuild-record.md, milestone 1: the inputs of the import, and "The rendered register carries the same 59 nodes and stages as the frozen one."

E4. majodali/methodology docs/vocabulary.md at main, commit 4c7b1dd, the row with the anchor def-planning-execution-model, quoted in the proposal beside this IR. The row is absent from docs/vocabulary.md at v1.6.0.

E5. majodali/methodology docs/rules/prose.md at main, commit 4c7b1dd, P-006: "A register MUST declare its row shape in its header, and its entries MUST follow that shape with bounded length: what, when, status, pointer."

E6. majodali/project-orchestrator orchestration/state.json at commit b1c8b9f, counted on 2026-11-17: 95 nodes, 139 tasks, 56 decisions.

E7. majodali/project-orchestrator docs/classification.md at commit b1c8b9f, Custom definitions: "State file (artifact) — cites the schema `src/model/schema.ts` of majodali/project-orchestrator-service, schema version 0, which is the type's definition".

E8. majodali/project-orchestrator docs/process/state-model.md at commit b1c8b9f: "`plan-state check` enforces the invariants below on every write and in CI"; invariants 1 to 11; invariant 9, "The rendered Markdown files equal `render`'s output."

E9. majodali/project-orchestrator docs/backlog.md at commit b1c8b9f: the header "Generated from `orchestration/state.json` by `plan-state render`. Do not edit by hand"; "Each row has four fields, in this order: what, when, status, pointer"; 95 lines, 95 rows. docs/plan-register.md and docs/plan.md carry the same generated-file header.

E10. majodali/project-orchestrator .github/workflows/checks.yml at commit b1c8b9f: the steps "Service-owned files untouched" and "State check".

E11. majodali/project-orchestrator docs/archive/plans/rebuild-record.md at commit b1c8b9f, the progress record of milestone 5 and decision 18: "The plugin's form checker is not a CI check; `plan-state check` is the one validity rule. Owner, 2026-11-11."

E12. majodali/project-orchestrator docs/plans/rebuild.md at commit b1c8b9f, child 6 (P4-N027, Pilot enlistment of methodology-tools): "its state file is imported from its Backlog, checked by `plan-state`".

E13. majodali/methodology docs/registers/portfolio.md at main, commit 4c7b1dd: 23 rows, ten with a Classification summary and thirteen marked implicit C0.

## Asks

A1. The project-orchestrator owner, at the hold on node P4-N026 under RU-005 (proposal-class nodes are owner-gated at verifying): approve the proposal for carrying, amend it, or return it. Depends: C10, C18, C36.

A2. The maintainers of majodali/methodology, under Article 8 (amendments, versions, and migration): accept the amendment, accept it with amendments, or reject it. Depends: C10, C18.
