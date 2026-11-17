# IR: Release of the K-003 amendment

Reader: RD-4
Purpose: document. The request that the methodology's owner cut the release that carries the accepted K-003 amendment, so that project-orchestrator can pin the release and end its recorded deviation.
Status: draft (written on 2026-11-17 under task T149 of node P4-N026; reworked on 2026-11-17 under task T152; no stranger rounds run; 41 claims; unratified terms 0)
Source: criterion one of node P4-N026 (Upstream proposals batch) in docs/plans/rebuild.md; the proposal of 2026-10-30, docs/archive/proposals/planning-execution-model-is-progress-truth.md; majodali/methodology at main, commit 4c7b1dd.
Footprint: docs/proposals/k-003-amendment-release.md

Provenance: every quote of majodali/methodology in this IR and in the proposal beside it was taken on 2026-11-17 from `main` at commit `4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57` (committed 2026-11-02), the head of `main` on that day. The released version is v1.6.0, tag commit `3e3482921e7e23bb4ad690b40394bf00b7feb37f`. The owner, who carries the proposal under RU-002 (upstream output is hand-carried), re-verifies each quote against upstream `main` before carrying it. The quotes may have moved.

## Terms

T1. Release register: the methodology's register of amendments and releases, in docs/releases.md. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-release-register [decided: methodology v1.6.0, vocabulary]

T2. Planning/execution model: the plan model of a project plus the verification evidence of each node. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-planning-execution-model [decided: owner, 2026-10-28]

T3. Rendering: a text produced from a source by a stated procedure. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-rendering [decided: owner, 2026-10-30]

T4. Classification: a project's binding declaration of its tier, pinned version and other fields. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-classification [decided: methodology v1.6.0, vocabulary]

T5. State file: the file orchestration/state.json, which holds the nodes, tasks and decisions of one project and is written only by the orchestration service. defined-at: https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/vocabulary.md#def-state-file [decided: project-orchestrator vocabulary, 2026-11-14]

T6. Check node: the child the orchestration service adds when a node's work is done, on which the reviewer's verify step runs. defined-at: https://github.com/majodali/project-orchestrator/blob/b1c8b9f9c4f987ea5f13ed7bd90058b0417ba757/docs/vocabulary.md#def-check-node [decided: project-orchestrator vocabulary, 2026-11-14]

T7. Owner: the one human who owns the methodology and its portfolio projects and who adjudicates amendments. defined-at: https://github.com/majodali/methodology/blob/4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57/docs/vocabulary.md#def-human-owner [decided: methodology v1.6.0, vocabulary]

## Claims

### The state upstream

C1. Methodology pull request 73, which carries the K-003 amendment, was merged into main on 2026-10-31. evidence: E11. [decided: methodology main, commit be5f993]

C41. The Release register records that the owner accepted the amendment as it stands on 2026-11-02. evidence: E1. [decided: methodology Release register, main at 4c7b1dd]

C2. The amended K-003 (the Backlog is the single source of progress truth) stands on the methodology's main branch at commit 4c7b1dd. evidence: E2. [decided: methodology main, commit 4c7b1dd]

C3. The amendment's entry stands in the Unreleased section of the Release register. evidence: E1. [decided: methodology Release register, main at 4c7b1dd]

C4. The latest methodology release is v1.6.0, tagged at commit 3e34829. evidence: E3. [decided: methodology tags, 2026-11-17]

C5. The Unreleased section holds five amendment entries at commit 4c7b1dd. evidence: E1. [decided: methodology Release register, main at 4c7b1dd]

C6. The release process forbids a project to pin or adopt unreleased main. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

### Re-verification of the proposal of 2026-10-30

C7. project-orchestrator proposed the amendment on 2026-10-30 in the document planning-execution-model-is-progress-truth.md, now archived. evidence: E5. [decided: project-orchestrator node P3-N007, 2026-10-30]

C8. The sentence appended to K-003 on main matches, word for word, the sentence the proposal of 2026-10-30 proposed. evidence: E2, E5. [decided: methodology main, commit 4c7b1dd]

C9. K-003 on main differs from the replacement text of the proposal of 2026-10-30 in six places, each listed in E6. evidence: E6. [decided: methodology main, commit 4c7b1dd]

C10. The owner adopted one of the six differences, the marker "except as the next sentence provides", on 2026-11-01. evidence: E1. [decided: owner, 2026-11-01]

C11. None of the six differences changes what project-orchestrator asked for on 2026-10-30. [inferred: R1]

C12. The vocabulary on main holds the rows planning/execution model, list of what is next and rendering, and the K-003 sense of referent. evidence: E7. [decided: methodology main, commit 4c7b1dd]

### What project-orchestrator did since the proposal

C13. project-orchestrator has applied the amendment before its release since 2026-11-09, as a deviation recorded in its Classification. evidence: E8. [decided: owner, 2026-11-09]

C14. The recorded deviation ends when the amendment is released and pinned in project-orchestrator. evidence: E8. [decided: owner, 2026-11-09]

C15. The state file holds the plan of project-orchestrator: 95 nodes, 139 tasks and 56 decisions at commit b1c8b9f. evidence: E9. [decided: project-orchestrator orchestration/state.json at commit b1c8b9f]

C16. Since 2026-11-16 the Backlog of project-orchestrator is a rendering of the state file, one row per node that is not a check node. evidence: E10. [decided: project-orchestrator node P4-N025, 2026-11-16]

C17. The check `plan-state check` fails when a rendered file differs from the rendering. evidence: E10. [decided: project-orchestrator docs/process/state-model.md, invariant 9]

C18. The Project model, whose slice the proposal of 2026-10-30 cited as the evidencing instance, was retired from the custom definitions of project-orchestrator on 2026-11-14. evidence: E8. [decided: project-orchestrator node P4-N024, 2026-11-14]

C19. The state file records each verification as a task on a check node, with a summary. evidence: E9. [decided: project-orchestrator docs/process/state-model.md]

C20. The schema of the state file has no separate field for verification evidence. evidence: E9. [decided: project-orchestrator docs/process/state-model.md]

### The change asked

C21. The proposal asks the owner to cut the next release from main, carrying the Unreleased section as it stands. [proposed: this IR]

C22. The release is a minor release, because the Unreleased section holds normative change. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

C23. The next minor version after v1.6.0 is v1.7.0. [inferred: R2]

C24. The release pull request retitles the Unreleased section with the version and the date of the release. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

C25. The release pull request leaves a fresh empty Unreleased section above the retitled section. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

C26. The retitled section is the release's migration notes, so the release pull request writes nothing else. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

C27. After the merge the owner creates the annotated tag v1.7.0. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

C28. An agent never creates a version tag. evidence: E4. [decided: methodology release process, main at 4c7b1dd]

C29. The proposal asks for no change to K-003, to the vocabulary or to any other rule. [proposed: this IR]

C30. project-orchestrator needs one of the five Unreleased entries, the K-003 amendment. [proposed: this IR]

C31. The four other Unreleased entries ride with the release, because main between tags is one release candidate. evidence: E4. [inferred: R3]

### What project-orchestrator does after the release

C32. After the release, project-orchestrator raises one migration pull request that moves its pin from 1.6.0 to the release. evidence: E4. [proposed: this IR]

C33. The migration pull request declares the state file as the planning/execution model of project-orchestrator, by an entry in the Custom definitions section of its Classification. [proposed: this IR]

C34. The migration pull request removes the K-003 entry from the Deviation register of project-orchestrator. evidence: E8. [proposed: this IR]

C35. The migration pull request adopts each of the four other amendments or records a deviation with its rationale. evidence: E4. [proposed: this IR]

C36. The vocabulary row for planning/execution model says the declaring entry names the custom document types that make up the model. evidence: E7. [decided: methodology main, commit 4c7b1dd]

C37. project-orchestrator declares the state file as a custom artifact type, not as a custom document type. evidence: E8. [decided: project-orchestrator Classification, 2026-11-09]

C38. Proposal two of the batch, registers as data files with renderings, asks for the words "or custom artifact types" in the vocabulary row for planning/execution model. [proposed: this IR]

C39. If the release ships without proposal two, the migration pull request still declares the state file. [proposed: this IR]

C40. In that case the migration pull request records the mismatch with the vocabulary row as a deviation. [proposed: this IR]

## Relations

R1. C11 depends-on C8 because the appended sentence is the whole of what the proposal of 2026-10-30 asked to add to the rule's statement.

R2. C23 depends-on C22 because a minor release raises the middle number of the version by one.

R3. C31 depends-on C5 because the release process retitles the whole Unreleased section and has no release of a part of it.

R4. C17 supports C16 because a rendering that a check compares with its source cannot drift from the source unseen.

R5. C38 depends-on C37 because a row that names only document types does not cover a model held in an artifact.

## Evidence

E1. majodali/methodology docs/releases.md at main, commit 4c7b1dd, read on 2026-11-17: the section "Unreleased" holds five entries. The first is "A declared planning/execution model is the source of progress truth". Its Adjudication field reads "accepted as it stands by the owner on 2026-11-02, under Article 8 (methodology PR #73 merged; count 1's later rounds on PR #74). The owner adopted the referent-clause marker on 2026-11-01." The four others are "The stranger rounds take evaluation case 012's changes", "The stranger rounds take evaluation cases 010 and 011's changes", "IR-only documents" and "The stranger rounds take evaluation case 009's four changes".

E2. majodali/methodology docs/rules/knowledge.md at main, commit 4c7b1dd, section K-003, quoted verbatim on 2026-11-17 in the proposal beside this IR. Its statement ends: "Where the project's Classification declares a planning/execution model, that model is the referent instead, and the Backlog's implementation map and list of what is next are renderings of it."

E3. `git ls-remote --tags` on majodali/methodology on 2026-11-17: the highest tag is v1.6.0. Its commit is 3e3482921e7e23bb4ad690b40394bf00b7feb37f. The head of main is 4c7b1dd35ff984ad75e2f5b381190d48ed1d2c57.

E4. majodali/methodology docs/release-process.md at main, commit 4c7b1dd: section "3 — Accepted: the release candidate", "Nothing MAY pin or adopt unreleased `main`"; section "4 — Released", steps 1 and 2; section "5 — Adopted"; section "Version semantics", "Minor (`x.Y.0`) — any release containing normative change: one amendment or a batch."

E5. majodali/project-orchestrator docs/archive/proposals/planning-execution-model-is-progress-truth.md at commit b1c8b9f, with the IR and the review record beside it: the replacement text of K-003 and its claim C9, the appended sentence.

E6. The comparison of E2 with the replacement text of E5, made on 2026-11-17. The six differences: the Applies line gains the gloss "(criticality tier C1 and above)"; the Motivated-by line cites the proposal, its gate and the slice record in other words; the Cites line names the C-tier, Article 7 and the planning/execution model row; a Protects line is added; the statement links five terms to the vocabulary (Register, Workflow, stage designations, referent and renderings) and no longer links planning/execution model, which the Cites line links; the referent clause gains the marker "except as the next sentence provides".

E7. majodali/methodology docs/vocabulary.md at main, commit 4c7b1dd: the rows with the anchors def-planning-execution-model, def-list-of-what-is-next, def-rendering and def-referent. The first reads in part, with its link markup left out: "The entry is a definition by citation under Article 7 and names the custom document types that make up the model."

E8. majodali/project-orchestrator docs/classification.md at commit b1c8b9f: the Deviation register's one entry, K-003, "Ends when the amendment is released and pinned here"; the Custom definitions entry "State file (artifact)"; the entry "Project model" under "Retired 2026-11-14".

E9. majodali/project-orchestrator orchestration/state.json at commit b1c8b9f, counted on 2026-11-17: 95 nodes, 139 tasks, 56 decisions. docs/process/state-model.md at that commit: the data model, and the field rule "Resources, verification evidence and multi-project state are later schema versions".

E10. majodali/project-orchestrator docs/backlog.md at commit b1c8b9f: "Generated from `orchestration/state.json` by `plan-state render`", 79 rows in 95 lines. The state file at that commit holds 95 nodes, 16 of them check nodes. docs/process/state-model.md, invariant 9: "The rendered Markdown files equal `render`'s output." docs/plans/rebuild.md, child 4 (P4-N025), done 2026-11-16.

E11. `git log --merges` on majodali/methodology main, read on 2026-11-17: commit be5f993, "Merge pull request #73 from majodali/k-003-planning-execution-model", committed 2026-10-31T17:16:03-07:00.

## Asks

A1. The project-orchestrator owner, at the hold on node P4-N026 under RU-005 (proposal-class nodes are owner-gated at verifying): approve the proposal for carrying, amend it, or return it. Depends: C21, C29.

A2. The owner of majodali/methodology, under section 4 of the release process: cut release v1.7.0 from main. Depends: C21, C23.
