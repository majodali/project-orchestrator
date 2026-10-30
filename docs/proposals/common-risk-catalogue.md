# Common risk catalogue

Status: draft

<!-- K-007 contract: Status transitions draft → delivered (hand-carried
     upstream, text unchanged) → closed (accepted upstream, with the
     Risk register's citations re-pointed). This file is the only copy
     of the catalogue. The project's Risk register cites it by relative
     link. On upstream acceptance the citations re-point to the
     accepted text and this file closes. Anything unmarked here is a
     live claim of current intent. Entries are drafted from the
     proposing project's own encounters, one entry per class. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session). It assumes the methodology at version 1.6.0,
and in particular
[Article 4 (applicability, then precedence)](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-4--applicability-then-precedence).

**Provenance**: drafted against majodali/methodology v1.6.0, commit
`3e34829`, on 2026-10-30. No upstream passage is quoted yet. Re-verify
against upstream `main` before this text is carried.

## What the catalogue is

The catalogue lists classes of risk that recur across projects and that
each affected project must mitigate directly. Every entry rests on an
encounter the proposing project recorded. A class known from elsewhere
and not encountered here is listed under *What this catalogue does not
yet cover*, never as an entry.

## Entry shape

<a id="def-entry-shape"></a>An entry carries six fields.

| Field | Content |
|---|---|
| ID | `CR-nnn`, stable once issued and never reused. |
| Class | The failure, stated as what goes wrong and never as the remedy. |
| Applicability | An applicability header in Article 4's tag notation. It decides which projects the class applies to. |
| Reaches | The kind of part of a project the failure occurs in, and the question that decides whether a given part is of that kind. |
| Mitigation | What every project in scope applies directly. |
| Encounters | Per encounter, a date, an artifact and one sentence on what happened. |

<a id="def-independent-encounter"></a>An independent encounter is an
encounter that is neither the same defect observed again nor found by
the same investigation as another encounter of the entry. Defects found
by one sequence of runs of the same check or pipeline, up to its first
passing run, count as one encounter.

## Entry test

<a id="def-entry-test"></a>A candidate is a failure as its source
states it. The entry test puts a candidate to four conditions.

- ET-1, cross-project precondition. The failure's precondition names
  no artifact, role, register or mechanism that exists only in the
  proposing project.
- ET-2, mitigation by each. The mitigation is applied inside each
  affected project. A candidate that one upstream change could remove
  for every project, without action by any project, fails ET-2. It is
  a methodology or tooling amendment, not an entry.
- ET-3, evidenced. The proposing project records at least one
  encounter of the failure, with a date and an artifact that resolves.
- ET-4, decidable applicability. The class's applicability can be
  written as an applicability header in Article 4's tag notation, the
  form that rule
  [Q-004 (functional tests run against a deployed test environment)](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/README.md#rule-id-and-header-format)
  demonstrates. `[C0+]` is a valid header.

A candidate takes exactly one of four outcomes.

| Outcome | Condition |
|---|---|
| admit | ET-1 to ET-4 hold, and no admitted entry states the same class. |
| merge | ET-1 to ET-4 hold, and an admitted entry states the same class. The candidate becomes an encounter of that entry. |
| reject | ET-1, ET-2 or ET-4 fails. The record names the failing condition. |
| defer | ET-1, ET-2 and ET-4 hold and ET-3 fails. The class goes to *What this catalogue does not yet cover*. |

A generalization of a source's failure is a separate candidate. It is
recorded with its generalization stated.

## Entries

<a id="cr-001"></a>

### CR-001: A check that cannot fail in the environment the code runs in

- **ID**: CR-001
- **Class**: A check that cannot fail in the environment the code runs in.
  The check passes, or stays silent, and the defect appears only where
  the code runs.
- **Applicability**: `[C1+]`
- **Reaches**: Parts that behave differently in the environment they run in
  than in the environment their checks run in. These are built and
  packaged artifacts, deployment and permission configuration, code
  whose collaborators are test doubles in its tests, tooling a project
  trusts as a guard, and procedures exercised on one surface and relied
  on across several. The question for a part is whether it runs, or is
  relied on, in an environment its checks do not reproduce. Text that
  is read and never executed is not reached.
- **Mitigation**: Run at least one check of each reached part in the
  environment the part runs in, or in a stand-in shown to reproduce the
  known defect. Prove each such check able to fail by breaking the part
  once on a scratch copy and recording the failure. Treat a check that
  exercises only a source import or a test double as evidence about the
  source or the double.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-08-27 | [Backlog entry "Chunk-1 child: reachability slice"](../backlog.md) | The first deploy answered 404 on every path. The tests served the routes without the stage segment that API Gateway's named stage adds to every request path. |
| 2026-09-01 | [Backlog entry "The bundle's import check was a false negative, and needs to run under ESM"](../backlog.md) | An import check run with `node -e`, and one run inside Vitest, both load in CommonJS mode. Both passed a bundle that cannot load as an ES module in production. |
| 2026-09-01 | [Backlog entry "`plan_lease_release` fails against real DynamoDB: `token` is a reserved keyword"](../backlog.md) | All 124 tests used an in-memory lease backend, so none sent a condition expression to DynamoDB. The first call to the real table failed. |
| 2026-09-06 | [Backlog entry "Deploy the service from CI on merge"](../backlog.md) | Four deploy defects passed the test suite and appeared only in real pipeline runs. Two of them were a misspelled identity-provider audience and a missing function-URL permission. |
| 2026-09-07 | [Risk register entry R12 (service outage stops work)](../open-risks.md) | An exercise of the rule that a session does not wait ran where the egress proxy answered an unroutable address at once. The exercise could not test waiting. |

<a id="cr-002"></a>

### CR-002: An agent adopts a package it found by searching

- **ID**: CR-002
- **Class**: An agent's search for a package to solve a narrow problem
  surfaces a new or low-provenance package that matches the need
  exactly, and the agent can adopt it without a human decision.
- **Applicability**: `[C1+]`
- **Reaches**: Parts where an agent can add, update or fetch a
  dependency. These are package manifests and lockfiles, install steps
  in scripts and workflows, vendored third-party code, and any task
  that lets an agent search a public registry. The question for a part
  is whether an agent session can bring in code from outside the
  project on its own judgment. A part that only reads project text is
  not reached.
- **Mitigation**: Make adding a new or low-provenance dependency a
  decision above the agent's authority. The agent stops and asks
  instead of installing. A hand-built substitute with an honest caveat
  is preferred to a dependency that cannot be verified.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-09-01 | [Risk register entry R14 (dependency search is an attack surface when agents shop for packages)](../open-risks.md) | A role looking for a DynamoDB reserved-word list found a package that claimed to be complete. A brand-new single-package maintainer had published it days earlier. The role declined it as a supply-chain risk and shipped a hand-built list. |

<a id="cr-003"></a>

### CR-003: Fetched content carries an instruction for the agent

- **ID**: CR-003
- **Class**: Content an agent fetches to read carries an instruction
  addressed at the agent, and the agent can follow it as if the task
  had asked for it.
- **Applicability**: `[C1+]`
- **Reaches**: Parts where an agent reads content its project does not
  author. These are documentation lookups, web fetches, search results,
  tool and command output, and the README of a dependency. The
  question for a part is whether an agent session reads text from a
  source outside the project that could be worded as an instruction.
  Content the project wrote and reviewed is not reached.
- **Mitigation**: State in each agent's contract that an instruction
  found in fetched content is data and never direction. An agent that
  finds one reports it and stops for judgment instead of acting on it.
  Findings quote what the source says and do not do what it asks.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-09-01 | [Risk register entry R15 (reference documentation is an instruction channel into a dispatched role)](../open-risks.md) | A page of the AWS documentation on Lambda aliases told the reader to run a command of an agent toolkit, worded as an optional suggestion for the user. The role declined it, named it in its finding and treated the prose as evidence. |

<a id="cr-004"></a>

### CR-004: A diagnostic names a cause it did not test

- **ID**: CR-004
- **Class**: A diagnostic names the cause of a failure that it did not
  test. It does so with the same confidence for every case it cannot
  tell apart, and the reader acts on the named cause. The diagnostic
  is a provider's error text or a project's own check output.
- **Applicability**: `[C1+]`
- **Reaches**: Parts that tell a reader why something failed. These are
  preflight and smoke-test output, handlers that translate a
  provider's error, verdict lines of checkers and gates, and any
  message that names a cause. The question for a part is whether it
  asserts a cause for a failure that it cannot tell from other
  failures. A message that only reports what was observed is not
  reached.
- **Mitigation**: A diagnostic reports what it observed and classifies
  the provider's error text. It never asserts a cause it did not
  test. Where it cannot tell causes apart, it says so and names the
  checks that would.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-09-04 | [Risk register entry R16 (a cloud provider's error names the wrong layer)](../open-risks.md) | Proving the identity-provider login took three runs against two independent defects. AWS returned `InvalidIdentityToken` for a typo in the identity provider's audience list, so no trust condition was reached. The preflight's verdict line asserted that the mismatch was in the trust policy, which was false for that defect. |

<a id="cr-005"></a>

### CR-005: A copy or description disagrees with its source, unseen

- **ID**: CR-005
- **Class**: A copy, a description or a second implementation of what
  another document or repository holds falls out of step with its
  source, and nothing at the place of use signals it.
- **Applicability**: `[C1+]`
- **Reaches**: Parts that restate what another document or repository
  holds. These are register and backlog entries about another
  repository, version pins, cached or generated copies, vendored code,
  a second parser or implementation of a shared grammar, and briefs
  that repeat a claim. The question for a part is whether it says
  something about a source it does not own, and whether a reader would
  act on it without re-reading the source. A part that is the source
  is not reached.
- **Mitigation**: Name the source and the commit or date at which each
  statement was true, so that a reader can check it cheaply. Keep one
  canonical source for each copy kept on purpose, with a mechanical
  check for drift. Re-read the source when the statement is relied on.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-08-29 | [Backlog entry "`plan_read` passes through a stage outside the lifecycle vocabulary"](../backlog.md) | A service's register parser accepted a stage that the form checker rejects. Two places stated what a legal stage is, and a human running both found the difference. |
| 2026-08-31 | [Plan of node P1-N014 (role contracts adopt the methodology's conduct rules), section "Contradictions found while planning, and their disposition"](../plans/p1-n014-role-contracts-adopt-v140-rules.md) | The founding plan stated that the repository was pinned at methodology v1.3.0. The Classification had recorded v1.4.0 since 2026-08-30. |
| 2026-08-31 | [Backlog entry "The portfolio register's row for this project is stale"](../backlog.md) | The methodology's Portfolio register recorded the project as pinned at 1.3.0 and omitted its service repository. Both statements had stopped being true, on 2026-08-30 and 2026-08-27. |
| 2026-09-01 | [Backlog entry "A Backlog entry describing another repository goes stale silently"](../backlog.md) | A task checked `eslint.config.js` and found that a gap the Backlog still called open had been closed six hours earlier by an unrelated task in the service repository. |

<a id="cr-006"></a>

### CR-006: A rule meets contrary guidance where it applies

- **ID**: CR-006
- **Class**: At the moment a rule that a project gave its agents
  applies, the surface the agent runs on gives contrary guidance, and
  the rule is stated only in a document the agent may not have read.
- **Applicability**: `[C1+]`
- **Reaches**: Parts that state a rule agents must hold under pressure.
  These are agent role contracts, bootstrap files, process
  specifications and procedures that agents execute. The question for
  a part is whether an agent could meet contrary guidance from its
  surface, or from content it reads, at the point where it applies the
  rule, and whether the rule's text sits where the agent meets it
  without looking. A rule read only by people is not reached.
- **Mitigation**: State each rule that must hold under contrary
  pressure where the agent meets it without looking, in the agent's own
  contract. Word it so that it survives the contrary guidance, for
  example by naming the guidance and saying which prevails.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-09-07 | [Risk register entry R17 (the harness's own guidance pushes against the fallback rule)](../open-risks.md) | A session's server failed to connect. The harness notice told the session to treat this as a connection failure and not to conclude that access did not exist, against the project's rule that a session does not retry or wait. The session held to the rule, and the document stating the rule was absent from the branch under test. |

<a id="cr-007"></a>

### CR-007: A test freezes a snapshot of a document that changes by routine operation

- **ID**: CR-007
- **Class**: A test hard-codes a snapshot of a document that changes by
  routine operation, so the test fails on a correct change and the
  suite stays red until someone rewrites the test.
- **Applicability**: `[C1+]`
- **Reaches**: Tests and fixtures that assert facts of a living
  document. These are registers, backlogs, journals, generated files
  and live trees. The question for a part is whether a test compares
  against recorded facts of a document that changes when the project
  does ordinary work. A fixture frozen on purpose and labelled
  historical is not reached.
- **Mitigation**: Compute both sides of the comparison at test-run time
  against the live document, and assert that they agree. Assert no
  recorded facts of a living document. Keep a frozen copy only as a
  labelled historical fixture.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-08-30 | [Backlog entry "`test/plan-register.test.ts` freezes a snapshot of the live register, so it breaks at every acceptance"](../backlog.md) | A test asserted that four nodes of the live Plan register were `identified`. The next acceptance commit moved one to `done` and broke the test. The suite stood at 34 of 35 passing as a known state until the test was rewritten at node P1-N012. |


<a id="cr-008"></a>

### CR-008: A verification tool silently excludes part of its input

- **ID**: CR-008
- **Class**: A tool that a check relies on silently leaves part of its
  input unread, so the check passes and cannot fail for the part left
  out.
- **Applicability**: `[C1+]`
- **Reaches**: Parts whose absence or property is proven by a search,
  scan or lint over a set of files. These are orphan-reference
  searches, ignore lists and exclude patterns, glob patterns in test
  and lint configuration, and checks that skip files they classify as
  binary, generated or out of scope. The question for a part is
  whether a check over it could pass because the tool never read some
  of the part. A check that reports what it skipped is not reached.
- **Mitigation**: Compare the set of files a check read against an
  independent listing of the input, made with a second tool or a mode
  that reports skips, and fix every difference. Record the same set
  from both tools as the proof.
- **Encounters**:

| Date | Artifact | What happened |
|---|---|---|
| 2026-08-30 | [Backlog entry "`run_corpus.ts` contained NUL bytes, and ripgrep silently dropped it from searches"](../backlog.md) | Ripgrep classified a source file with NUL bytes as binary and left it out of search results without a warning. GNU grep found six files and ripgrep five. The cutover's search for orphan references would have missed the file. |

## What this catalogue does not yet cover

Each class below passed ET-1, ET-2 and ET-4 and failed ET-3. The
proposing project's sources state it as a risk and record no event of
it. A deferred class becomes an entry when one encounter is recorded.

| Class | Source | What would evidence it |
|---|---|---|
| An execution environment bills the wrong account. A session runs where an API key in the environment takes precedence over the subscription, and the work bills API credits without notice. | [Risk register entry R7 (billing misroute)](../open-risks.md). It records a watch item from a policy review, not an event. | A recorded session that billed the wrong account, or a recorded check that found the key set. |
| Concurrent writers lose an update. Two agents running at once both read a shared register and both append, and the second write silently drops the first. | [Backlog entry "Parallel dispatch collides with the single-Backlog write, and nothing says so"](../backlog.md), found 2026-09-17. It records the hazard and a workaround, and no lost write. | One recorded write lost to a concurrent writer. |
| A patch drafted without the means to apply or test it fails on context the drafter never verified. | [Ruling RU-015 (how this project delivers a change to a repository it cannot write to)](../rulings.md). Its rationale states the risk, and no failed patch is recorded. | One recorded patch that failed to apply. |
