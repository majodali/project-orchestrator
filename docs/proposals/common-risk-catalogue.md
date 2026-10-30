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
the same investigation as another encounter of the entry.

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

## What this catalogue does not yet cover

No candidate is deferred in this draft.
