# Two roles and a routing rule from the communication pipeline

Status: accepted (owner, 2026-10-26; implemented in roles.md and dispatch.md the same day, with the review step amended to rounds until readable per the methodology specification)

<!-- K-007 contract: Status transitions draft → delivered (hand-carried
     into this repository as a pull request, text unchanged) →
     accepted / amended / rejected, a maintainer disposition the
     originating project tracks in its own backlog. Anything unmarked
     here is a live claim of current intent. This file is a standalone
     proposal artifact, not a plan or a specification. -->

**To:** the maintainers of majodali/project-orchestrator.
**From:** majodali/communication-pipeline, at its chunk 4 (graduation).

**Amends:** [roles.md](../process/roles.md) (two new roles) and
[dispatch.md](../process/dispatch.md) (the task-result shape and a
routing rule). **Change:** the pipeline's paraphraser and reviewer
become role contracts here; the pipeline's branch point becomes a
dispatch routing rule driven by the intermediate representation (IR)
a role returns. **Asked of the reader:** accept the two roles and the
rule, amend them, or decline and leave them in the pilot repository.

Reader: a maintainer of this project (the human owner), assumed to
know its [process documents](../process/README.md) and the
methodology's
[intermediate representation](https://github.com/majodali/methodology/blob/main/docs/intermediate-representation.md)
specification proposed in methodology PR "W-009: the methodology
corpus writes its deliverables IR first".

## Problem statement

Every task result in this project's loop is agent-written prose read
by someone who was not in the session that wrote it: the Orchestrator
at acceptance, the owner at a gate. The communication-pipeline pilot
(2026-10-24 to 2026-10-26) measured what that prose loses: claims
compressed into one sentence, referents left unnamed, terms borrowed
from the session and used as if defined. On its first live run the
stranger reviewer's finding count fell from 82.0 to 25.2 per thousand
words over three rounds once reasoning, rendering and review were
separated into three roles with no shared context. The pilot ran its
roles as Claude Code subagents; its plan's settled decision 3 says the
roles move here when they are stable. Chunk 3's gate found them
stable: the contracts did not change between the second and third
chunks, and custom agent types were unavailable from a cloud session's
working directory, which is the reason the roles belong in an
orchestrator rather than in per-repository agent files.

## The change

### Two roles

**Paraphraser.** Refines *Agent (session)*. Tier: **standard**.
Serves the rendering step of any task whose result is read by the
owner or by another role.

- **Decides**: nothing about the subject. It renders one IR into
  prose for one catalog reader (the methodology style guide's
  Readers table, RD-1 to RD-5), one claim per sentence, adding no
  claim and dropping none, and appends a render map naming where each
  claim landed.
- **Never**: reasons about the subject, reads the session that
  produced the IR, or reads any document the IR does not link.
- **Produces**: the prose and its render map. A claim it cannot
  render without adding content is rendered literally with a marker
  the reviewer sees.
- **Inputs** (the whole context packet): the IR; the reader's catalog
  entry; the style-guide rows for that reader.

**Reviewer (stranger).** Refines *Reviewer* for prose, beside the
existing code-verification Reviewer. Tier: **frugal**. Serves the
review step the routing rule below selects.

- **Decides**: the findings against a fixed list (an undefined or
  borrowed term; an unresolved referent; a sentence carrying two
  separately decidable claims; a bare identifier; rhetoric; emphasis
  bold; report parts missing or out of order; for an IR, a claim
  whose evidence does not show what it says) and the answer to the
  reader's readability test.
- **Never**: contributes content, rewrites the text, or reads beyond
  what the text links. It has no access to the producing session, by
  construction: a fresh context is the role's defining input.
- **Produces**: a findings table with quoted text, rule and severity;
  a readability verdict; counts (words, findings, findings per
  thousand words, undefined terms, unresolved referents). The
  Orchestrator acts on it mechanically: a verdict of not readable
  returns the task to its author with the table.

The pilot measured the reviewer at roughly 85 to 90 thousand tokens
and 150 to 170 seconds per review on the frugal tier, and the
paraphraser at roughly 50 thousand tokens and 20 to 45 seconds on the
standard tier.

### The task result carries an IR

The handoff contract's task result gains one line: when the result
introduces a term, records a decision, or states a register fact, the
role returns an IR (the methodology specification's form) beside its
prose, or instead of it. The IR is the map the Orchestrator reads at
acceptance: its asks are the asks, its proposed terms are the terms
the gate summary lists under *Terms introduced* (W-008, reports map
their deliverables, as amended 2026-10-26), its claims with status
proposed are what changed.

### The routing rule

Judgment routing gains one mechanical rule, decided from the IR
alone, in the order given; the first condition that holds decides.

| Condition | Dispatch |
|---|---|
| the owner flagged the output for review | paraphraser, then reviewer |
| the result is a document for a fresh session or an external reader (RD-4, RD-5) | paraphraser, then reviewer |
| the result is normative text | the author renders; reviewer only |
| the IR has a proposed term | paraphraser; the gate summary carries the ratification ask |
| the result is for the owner returning (RD-2) | paraphraser |
| the result is for the owner in conversation (RD-1) and has more than six claims, a dependent ask, or a claim over thirty words | paraphraser |
| the result is for the Orchestrator (RD-3) and has more than twelve claims or a dependent ask | paraphraser |
| otherwise | neither; the IR is delivered as it stands |

The rule is the pilot's branch point v1.1 with its dispositions
renamed to dispatches. The thresholds are provisional; the pilot's
dispatch log (five routed IRs at chunk 3) is the data to tune them.

### What stays in the pilot

The lints (IR checks and prose checks) move to methodology-tools as
`mtool ir check` and `mtool style` in a separate PR, so this project
runs them as form checks at dispatch and acceptance, where
[auditing.md](../process/auditing.md) already runs `mtool`. The
evaluation corpus stays in the pilot until the pilot archives.

## Provenance

Quoted against communication-pipeline at its chunk 3 merge (PR #4)
and its chunk 4 branch: `.claude/agents/paraphraser.md`,
`.claude/agents/reviewer.md`, `docs/branch-point.md` v1.1,
`docs/readers.md` v1, `eval/cases/003-live-run-portfolio-refresh-2026-10-25.md`.
The methodology's reader catalog and intermediate-representation
specification are the two methodology PRs of 2026-10-26 the pipeline's
chunk 4 report names.

## The ask

This project is asked to accept the two roles and the routing rule,
accept them with amendments, or decline.

- **If accepted, or accepted with amendments**: the pipeline retires
  its agent files once the roles run here, and its exit condition for
  roles is met.
- **If declined**: the pipeline keeps its agent files and the roles
  stay Claude Code subagents; the pipeline does not re-raise the
  proposal without new evidence.
