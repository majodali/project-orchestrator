# IR: Documents and specifications are bounded

Reader: RD-4
Purpose: document. The proposal to add one rule and one vocabulary row, so that a Document is at most 300 lines and a Specification is a criteria list of at most 20 criteria, with each excess listed.
Status: draft (written on 2026-11-17 under task T149 of node P4-N026; no stranger rounds run; 43 claims; unratified terms 1)
Source: criterion three of node P4-N026 (Upstream proposals batch) in docs/plans/rebuild.md; the review of 2026-11-09, docs/archive/reviews/2026-11-09-review-of-the-approach.md; milestone 6 of the rebuild plan; majodali/methodology at main, commit 4c7b1dd.
Normative: yes
Footprint: docs/proposals/bounded-specification-depth.md

Provenance: every quote of majodali/methodology in this IR and in the proposal beside it was taken on 2026-11-17 from `main` at commit `4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57` (committed 2026-11-02), the head of `main` on that day. The released version is v1.6.0, tag commit `3e3482921e7e23bb4ad690b40394bf00b7feb37f`. The owner, who carries the proposal under RU-002 (upstream output is hand-carried), re-verifies each quote against upstream `main` before carrying it. The quotes may have moved.

## Terms

T1. Document: a markdown file of a defined type. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-document [decided: methodology v1.6.0, vocabulary]

T2. Specification: behavior stated to be implemented against. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-specification [decided: methodology v1.6.0, vocabulary]

T3. Register: an append-oriented Document of uniformly-shaped entries. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-register [decided: methodology v1.6.0, vocabulary]

T4. Rendering: a text produced from a source by a stated procedure. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-rendering [decided: owner, 2026-10-30]

T5. Criteria list: a Specification given as a list of criteria, where a criterion is one statement of an observable result that a reviewer judges met or unmet. [proposed: this IR]

T6. Check node: the child the orchestration service adds when a node's work is done, on which the reviewer's verify step runs. defined-at: https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/vocabulary.md#def-check-node [decided: project-orchestrator vocabulary, 2026-11-14]

T7. Portfolio register: the methodology's enumeration of all majodali projects. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-portfolio-register [decided: methodology v1.6.0, vocabulary]

## Claims

### The problem

C1. The methodology bounds one Document by length: K-002 (the Agent bootstrap is a pointer, not a record) says the Agent bootstrap should stay under about 200 lines. evidence: E1. [decided: methodology main, commit 4c7b1dd]

C2. No rule of the methodology bounds the length of any other Document or the depth of a Specification. evidence: E1. [decided: methodology main, commit 4c7b1dd]

C3. On 2026-11-09 project-orchestrator held about 400,000 words under docs/ in 82 files. evidence: E2. [decided: project-orchestrator review of 2026-11-09]

C4. The specifications of project-orchestrator on 2026-11-09 held 173 distinct criterion labels. evidence: E2. [decided: project-orchestrator review of 2026-11-09]

C5. Twelve specification documents written before the rebuild hold between 247 and 1,376 lines, and eleven of the twelve exceed 300 lines. evidence: E3. [decided: project-orchestrator tree at commit b1c8b9f]

C6. The review of 2026-11-09 found that the number of documents and the volume per decision, not sentence length, made the documentation hard to comprehend. evidence: E2. [decided: project-orchestrator review of 2026-11-09]

### The change

C7. The proposal adds one rule to the Knowledge section of the rule corpus. [proposed: this IR]

C8. The proposal suggests the identifier K-013 for the rule, and the maintainers assign the identifier. [proposed: this IR]

C9. Under the rule, a Document under docs/ should hold at most 300 lines. [proposed: this IR]

C10. Under the rule, a Specification should be a criteria list of at most 20 criteria. [proposed: this IR]

C11. Under the rule, a project lists each Document that exceeds a bound, with the reason, in its documentation. [proposed: this IR]

C12. The rule exempts three kinds of Document: a rendering, a Register, and a Document whose opening status line marks it as a record no longer maintained. [proposed: this IR]

C13. The rule exempts a Register because the evidence of the rebuild about registers supports proposal two of the batch, not a line bound. [proposed: this IR]

C14. The two bounds carry the keyword SHOULD, and the listing duty carries the keyword MUST. [proposed: this IR]

C15. The rule applies from criticality tier C1, the default of the Knowledge section. evidence: E4. [proposed: this IR]

C16. The proposal adds one vocabulary row, criteria list. [proposed: this IR]

C17. The proposal changes no other rule and no other vocabulary row. [proposed: this IR]

### The evidence from the rebuild

C18. The owner set both bounds for the rebuild of project-orchestrator on 2026-11-09. evidence: E5. [decided: owner, 2026-11-09]

C19. Nine nodes of the rebuild carry a criteria list in a plan and no specification document. evidence: E6. [decided: project-orchestrator docs/plans/rebuild.md at commit b1c8b9f]

C20. The nine criteria lists hold 7, 9, 12, 10, 8, 15, 5, 6 and 4 criteria. evidence: E6. [decided: project-orchestrator docs/plans/rebuild.md at commit b1c8b9f]

C21. Seven of the nine nodes are done at commit b1c8b9f. evidence: E7. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C22. A reviewer verified six of the seven done nodes on a check node, against the criteria list and the outcome of the node. evidence: E7. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C23. The owner accepted the seventh done node, P4-N025 (README and generated Backlog), after its orientation test. evidence: E6. [decided: owner, 2026-11-16]

C24. One of the six verifications failed once: task T138 named the unmet criterion and the file that failed the criterion. evidence: E7. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C25. The failed node passed verification in task T139 after the rework. evidence: E7. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C26. A fresh session given only the README stated what is done, what is next and what waits on the owner in three tool calls on 2026-11-16. evidence: E6. [decided: owner, 2026-11-16]

C27. The words under docs/, outside docs/archive/, numbered 76,401 on 2026-11-17. evidence: E8. [decided: project-orchestrator rebuild record, child 8]

C28. Most of the fall in words came from archiving superseded documents, not from the line bound. evidence: E8. [proposed: this IR]

C29. Ten hand-written Documents of project-orchestrator exceed 300 lines at commit b1c8b9f, and the rebuild record lists each with the reason. evidence: E8. [decided: project-orchestrator rebuild record, child 8]

C30. Two Documents stand at exactly 300 lines: the rebuild plan and the task loop. evidence: E8. [decided: project-orchestrator tree at commit b1c8b9f]

C31. The rebuild plan stays at 300 lines because its finished parts moved to a record of 784 lines in the archive. evidence: E8. [decided: project-orchestrator tree at commit b1c8b9f]

C32. The line bound therefore moved some text out of a maintained Document and did not remove the text. [inferred: R1]

C33. The rebuild changed the data model, the process and the bounds at once, so the evidence does not isolate the effect of the bounds. [proposed: this IR]

### Release-register entry

C34. The Release-register entry's title is "Documents and specifications are bounded". [proposed: this IR]

C35. The entry names project-orchestrator as the suggesting project, with the criteria lists of the rebuild plan at commit b1c8b9f as the evidencing instance. [proposed: this IR]

C36. The methodology repository is accommodated by listing seven Documents that exceed 300 lines at commit 4c7b1dd. evidence: E9. [proposed: this IR]

C37. methodology-tools is accommodated by listing one Document that exceeds 300 lines at commit 296ba46. evidence: E10. [proposed: this IR]

C38. project-orchestrator is accommodated as the evidencing instance, because project-orchestrator already lists its ten Documents over the bound. evidence: E8. [inferred: R2]

C39. The impact assessment did not measure the seven other projects that hold a Classification. [proposed: this IR]

C40. Each of the seven unmeasured projects is accommodated by listing its Documents over a bound, because both bounds are SHOULD. [inferred: R3]

C41. The thirteen rows the Portfolio register marks implicit C0 are unaffected, because the rule applies from criticality tier C1. evidence: E11. [proposed: this IR]

C42. The migration note says a project measures its Documents under docs/ and lists each that exceeds a bound, with the reason. [proposed: this IR]

C43. The migration note says a project rewrites no existing Document on migration. [proposed: this IR]

## Relations

R1. C32 depends-on C31 because the record in the archive holds the text that left the plan.

R2. C38 depends-on C29 because the list in the rebuild record is the listing the rule requires.

R3. C40 depends-on C14 because a SHOULD bound that a Document exceeds is met by the listing duty.

R4. C24 supports C10 because a reviewer could name one unmet criterion out of a list and the implementer could fix that criterion alone.

R5. C5 supports C10 because the specification documents written without a bound grew past the length a reviewer checks item by item.

## Evidence

E1. majodali/methodology docs/rules/knowledge.md at main, commit 4c7b1dd, K-002: "It SHOULD stay under ~200 lines". A search of docs/rules/ and docs/style.md at that commit for "lines" and "length" finds no other bound on a Document's length. P-006 (registers hold uniform rows) bounds the length of a register entry, not of a Document.

E2. majodali/project-orchestrator docs/archive/reviews/2026-11-09-review-of-the-approach.md at commit b1c8b9f: the table "What is not working, with numbers", rows "Words under `docs/`", "Distinct criterion labels in the specs" and "A planner task"; the paragraph after the table, "Sentence length is not the problem."

E3. `git ls-files docs/specs docs/archive/specs | xargs wc -l` on majodali/project-orchestrator at commit b1c8b9f, run on 2026-11-17: twelve files of 1,376, 998, 985, 764, 679, 642, 594, 591, 462, 386, 332 and 247 lines.

E4. majodali/methodology docs/rules/README.md at main, commit 4c7b1dd, the table "Sections": "Knowledge & memory | `K-` | `[C1+]`".

E5. majodali/project-orchestrator docs/archive/reviews/2026-11-09-review-of-the-approach.md at commit b1c8b9f, "Practices to adopt": "A hand-written document is at most 300 lines. A specification is a criteria list of at most 20 items plus tests." docs/plans/rebuild.md, Status line: the owner accepted the decisions on 2026-11-09.

E6. majodali/project-orchestrator docs/plans/rebuild.md at commit b1c8b9f, children 4 to 8 of milestone 6 and the section on P4-N034, and docs/archive/plans/rebuild-record.md, children 1 to 3, counted on 2026-11-17 by the checkbox lines under each: P4-N022 7, P4-N023 9, P4-N024 12, P4-N025 10, P4-N026 8, P4-N027 15, P4-N031 5, P4-N032 6, P4-N034 4. Child 4, last criterion: "Met 2026-11-16: the session answered in three tool calls and the owner confirmed (D070)."

E7. majodali/project-orchestrator orchestration/state.json at commit b1c8b9f: P4-N022, P4-N023, P4-N024, P4-N025, P4-N031, P4-N032 and P4-N034 at stage done; verify tasks T132, T136, T139, T142, T145 and T147 closed; verify task T138 blocked with the summary "Criterion 3 not met: "Every archived file opens with a status line"", naming one file.

E8. majodali/project-orchestrator docs/archive/plans/rebuild-record.md at commit b1c8b9f, child 8: the word count "gave 76401 on 2026-11-17, down from 161,840 at the task's start", the method, and the table of ten Documents of 534 to 998 lines. `wc -l` on 2026-11-17: docs/plans/rebuild.md 300, docs/process/task-loop.md 300, docs/archive/plans/rebuild-record.md 784.

E9. `git ls-files '*.md' | xargs wc -l` on majodali/methodology at main, commit 4c7b1dd, run on 2026-11-17. Nine files exceed 300 lines. Two are Registers: docs/releases.md (778) and docs/backlog.md (542). Seven are not: docs/intermediate-representation.review.md (1,502), docs/intermediate-representation.ir.md (823), docs/records/service-review-2026-10-29.ir.md (609), docs/practices.md (509), docs/vocabulary.md (503), docs/constitution.md (417) and docs/vision.ir.md (359).

E10. The same command on majodali/methodology-tools at main, commit 296ba46, run on 2026-11-17: one file exceeds 300 lines, docs/proposals/custom-type-checker-extension.md (316).

E11. majodali/methodology docs/registers/portfolio.md at main, commit 4c7b1dd: 23 rows, ten with a Classification summary and thirteen marked implicit C0.

## Asks

A1. The project-orchestrator owner, at the hold on node P4-N026 under RU-005 (proposal-class nodes are owner-gated at verifying): approve the proposal for carrying, amend it, or return it. Depends: C9, C10, C33.

A2. The project-orchestrator owner, at that hold: ratify or strike the term this IR introduces, criteria list. Depends: C16.

A3. The maintainers of majodali/methodology, under Article 8 (amendments, versions, and migration): accept the amendment, accept it with amendments, or reject it. Depends: C9, C10, C11.
