# The four stop conditions: decidable, evidenced, and related to the meta-review signals

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P3-N013, child A of P3-N005
     ([sequence-mode](p3-n005-sequence-mode.md)); it goes `active` when
     the owner approves it at this node's gate, and
     `closed → Backlog entry` when the node reaches `done`. -->

Node **P3-N013**, child A of **P3-N005**
([plan](p3-n005-sequence-mode.md) ·
[specification](../specs/p3-n005-sequence-mode.md)). The parent
specification's section *Child A: the four stop conditions, decidable,
evidenced, and related to the meta-review signals* carries this node's
criteria **A1 to A10**, and it binds criteria **I1 to I6**, **I10** and
**I11**. That section was written at breakdown depth (RU-020).
Decision 2 below proposes that it serves as this node's specification.

## Outcome

W-001's four stop conditions exist as committed predicates that two
blind readings apply identically to this project's past task results.
The relation of the four conditions to the methodology's four
meta-review signals is stated, row by row.

Concretely, at `done`:

- `docs/findings/p3-n005-stop-predicates.md` holds the predicate
  text, the revision log, the corpus statement, the agreement result
  and the relation table.
- `docs/findings/p3-n005-stop-predicates/` holds each reading's
  verdict file per round, the hard-case sample's verdicts, and the
  mechanical pre-pass with its output.
- Every "no counterpart" row of the relation table has a Backlog
  entry (parent decision 14).

The node does not write `dispatch.md` or any role contract. That is
P3-N014's work. Condition 4's agreement on the demonstration's results
is added to the record later by P3-N015 (parent criterion C7). This
node's `done` does not wait for it.

## Approach

The execute stage is a fixed sequence of tasks, because the evidence
needs sessions that cannot see each other. One session cannot be its
own blind second reading.

### E1. Write, sample and fix the predicates

One Implementer task, advanced tier (decision 7). It writes:

1. **Predicate text, draft 0**, from criteria I1 to I4, parent
   decisions 10 and 11, and decisions 4 to 6 here. Predicate 4 cites
   W-008 at v1.6.0, commit `3e34829`, so child D's residue table can
   cite the same text (I11).
2. **The corpus statement** (A2, A3). The cut-off commit is the
   commit E1 starts from. The statement lists each task in the corpus,
   the committed artifacts read for it, the tasks excluded under
   decision 5 with their count, and which items carry a committed Asks
   part, with the gap as a count.
3. **The mechanical pre-pass** (A6). A re-runnable script beside the
   record that reads the journal and the Cost log and scores the
   structured fields: status, check events, refs. Its output is
   committed beside it. It is not part of `plugin/` and `form_check.ts`
   does not run it.
4. **The hard-case sample** (A4): T017, T008, T010, T032, T038, and
   one task with a `packet-widened` event. E1 scores it against draft 0
   and revises the text. The journal already shows that T008 and T010
   returned `blocked`, which no predicate in I1 to I4 reads; decision 6
   settles it in advance.
5. **The relation table** (A10). It has one row per signal and a row
   for the limit of ten rounds. It quotes the v1.6.0 text obtained by
   decision 3. Each row has a note on whether the later rewording
   changes it (parent decision 9). It also states when each signal or
   condition is evaluated, what it reads and what it causes. The
   parent specification's table is the hypothesis being tested here,
   not the output.

**Blindness is a property of the commit graph.** E1 commits in two
steps:

- **(a) the predicate commit**: the predicate text and the corpus
  statement only. No verdict of any kind is in its tree.
- **(b) a later commit**: the sample verdicts, the revision log from
  draft 0, the pre-pass and its output, and the relation table.

Both readings branch from (a). Neither contains (b). So neither reading
sees the author's sample verdicts or the pre-pass output. This makes
A6's "both readings are checked against it" meaningful. Commit (b)
lands before reading 1 is dispatched, which satisfies A4's
"revisions are recorded before the full scoring starts". It also
satisfies A8, since the text is fixed at (a).

### E2 and E3. The two readings

- **E2, reading 1**: an Implementer task on the frugal tier (A5,
  adopted at the parent gate). Its branch is cut from (a).
- **E3, reading 2**: an Implementer task on the advanced tier. Its
  branch is cut from (a), so reading 1's verdict commit is absent from
  it (I6's `git merge-base` check).

Both packets enumerate the same items: the predicate text and the
corpus statement at (a), the journal, the Cost log, and the repository
at each recorded ref. Each reading writes one verdict file and nothing
else. A verdict file has one row per item and condition, holding the
verdict, the artifact and field read, and whether the verdict came
from failing closed. Backlog additions travel in the result, and E4
writes them. So the readings never write the Backlog, and the
lost-update race cannot occur between them.

The readings are dispatched one after the other, never in parallel.

### E4. Compare, check and close

One Implementer task, advanced tier (decision 7), on a branch holding
(b) and both verdict files. It does four things:

1. Diffs the two verdict files.
2. Checks both readings against the pre-pass.
3. Writes the agreement result twice: over all items, and over the
   items whose input existed. Two readings agree trivially on a missing
   input, so the second figure is the evidence of decidability.
4. Self-verifies against A1 to A10 under the C1 profile.

On a disagreement, E4 revises the text in a new predicate commit cut
from the previous predicate commit, never from a commit carrying
verdicts. Both readings then re-run from it (A7, I6). At most two
revision rounds are run. A condition still disagreeing after the
second round returns `needs-judgment` to the owner and is recorded as
evidence for P3-N016. This matches `dispatch.md`'s bounded-attempts
rule.

**Task count.** Four tasks if the first readings agree. Ten at most,
with two revision rounds. Each task gets its own Cost log row (parent
criterion P3).

**Acceptance.** The Orchestrator re-runs the pre-pass and the
`git merge-base --is-ancestor` checks itself rather than accepting the
report. It runs them for reading 1's commit against reading 2's tip,
and for commit (b) against both reading tips. A Reviewer is dispatched
only at the owner's request (C1 profile).

### Additions to A1 to A10

These add to the parent's criteria without changing them. They exist
so a verifier can check the approach above.

- **A6+.** `git merge-base --is-ancestor <(b)> <tip>` exits non-zero
  for both reading tips. Each predicate commit's diff touches only the
  predicate text and the corpus statement.
- **A2+.** The corpus statement names the cut-off commit, the
  exclusions under decision 5 with their count, and the stand-in grant
  used for each item (decision 4).
- **A3+.** A count of zero for condition 4's historical subset is a
  recorded result, not a failure. RU-019 is the near match.

## Dependencies

- **P3-N005**: specified and broken down at the gate of 2026-10-29.
  Parent defaults 9 to 16 bind this node.
- **Not** P1-N014. Only P3-N014 waits on P1-N014's execute.
- **Not** P3-N002. The parent is independent of it (RU-018).
- **Owner**: this node's gate only, unless a condition fails to
  converge in two revision rounds (A7).
- **The pinned meta-review text**: obtained by decision 3. E1 runs no
  git against the methodology repository.

## Leaf or interior

**Leaf**, executed as the task sequence E1 to E4 (decision 1). The node
has one deliverable, the record. No part of it validates separately:
a reading means nothing without the predicate text, and the predicate
text is not evidenced without both readings. The node needs several
sessions because independence requires them, not because the work is
too large for one. Splitting it into child nodes would add register
lines, plans and gates and no outcome that validates on its own. This
departs from `plan-model.md`'s wording that a leaf is executable in a
single role session. It follows P2-N016, a leaf with five execute
tasks.

## Repository reach (RU-016)

**This repository only.** The node writes these paths:

- `docs/findings/p3-n005-stop-predicates.md`, new;
- `docs/findings/p3-n005-stop-predicates/`, new;
- `docs/backlog.md`, under W-003.

The Orchestrator writes the Plan register, the Cost log and the
journal. The methodology repository is read, never written, and the
read goes through the packet (decision 3). No service-repository grant
is exercised.

## Monotonicity

No planned non-monotonicity. No existing test, form-check rule or
corpus expectation is touched. The pre-pass is new code outside
`plugin/`. `node plugin/scripts/form_check.ts` passes after every
task.

## Decisions for the gate

Numbered per `dispatch.md`'s owner-decision economics. The owner's
go-ahead adopts every default not overridden by number. This document
opens its own sequence at 1.

**Precedents checked against the [Ruling register](../rulings.md).**
RU-016 is an exact match for the repository-reach declaration and
decides silently. RU-018 is the authority for the parent's
independence from P3-N002. RU-020 is a near match for decision 2: it
covers the `break down` task, not `specify`. RU-019 is a near match
for addition A3+. RU-015 is a near match for decision 3's provenance
line. A near match argues a default; it does not decide one.

1. **Leaf or interior.** Default: **leaf**, executed as the fixed task
   sequence E1 to E4, with at most two revision rounds. Rationale: one
   deliverable and no separately validating part; the extra sessions
   exist for blindness, not size; P2-N016 is the multi-task-leaf
   precedent.
2. **Whether a separate specify task runs.** Default: **no**. The
   parent specification's child A section, with this plan's additions,
   is the node's specification. The node moves `planned` →
   `specified` at this gate, and E1 is the next dispatch. Rationale:
   A1 to A10 are at the depth a specify task would produce; P1-N010
   and P2-N013 to P2-N016 entered execution specified by their
   parent's breakdown; RU-020 is the near match.
3. **How the pinned signal text reaches E1.** Default: **the
   Orchestrator quotes the specification's *Meta-review* section at tag
   v1.6.0 (commit `3e34829`) verbatim in E1's packet**, with a
   provenance line naming the version, the commit and the date the
   quote was taken. It also quotes the same section at the later
   commit beside it. The record carries both quotes and the provenance
   line. Rationale: the methodology checkout holds only the reworded
   text; the v1.6.0 entry in `docs/releases.md` names the signal
   amendment but quotes no signal text; the *Unreleased* entry names
   the four changes but does not quote the pinned wording; so a role
   without git has no other committed source. *Alternative:* E1 reads
   the section at the tag's GitHub URL and records the same
   provenance line.
4. **What a historical task is scored against in place of a
   ratification record.** Default: **the stand-in grant**: the scope
   grant in force when the task was dispatched, read from the gate
   record and the `gate-crossed` events, plus the node plan's
   repository reach at the recorded ref. A task whose grant cannot be
   recovered yields stop by failing closed and is counted apart.
   Rationale: no past task ran in a sequence, so predicate 2 has no
   ratification record to read; parent decision 13 builds the
   ratification record from the scope grant's fields, so the grant is
   the nearest committed equivalent.
5. **Tasks with no result at the cut-off.** Default: **listed and
   excluded, with their count stated.** These are tasks dispatched but
   not received, stale, or in flight, such as this wave's T047 to
   T051 if they have not landed by then. Rationale: this narrows
   parent decision 10's "every task with a journal record". A task
   with no result would yield stop on all four predicates by failing
   closed, which scores the cut-off's timing and not the text.
6. **A `blocked` status.** Default: **predicate 3 yields stop on any
   status other than `done`**, so `blocked` stops as `needs-judgment`
   does. Rationale: I1 to I4 read no `blocked` status, and T008 and
   T010 are in the sample; `dispatch.md` escalates a blocked pair to
   the owner, so a blocked chunk needs the owner's decision. Without
   this, I4 stops such a result only by failing closed on a missing
   Asks part, which is the right verdict for the wrong reason. The
   field read is unchanged, so the predicate stays a lookup.
7. **Tiers of the execute tasks.** Default: **E1 and E4 on the
   advanced tier** (a tier raise over the Implementer's standard
   tier). E2 runs on the frugal tier and E3 on the advanced tier, as
   A5 fixes. Rationale: E1 and E4 write the predicate text and the
   relation table that three sibling nodes stand on, and they decide
   revisions after a disagreement. The limitation is recorded: the
   author and reading 2 share a tier, but the author's verdicts are
   not in either reading's tree.

## Backlog additions

- **P3-N013's entry**: rewritten at this gate to `planned`, or to
  `specified` if decision 2 is adopted, with this plan's link.
- **`plan-model.md`'s leaf definition does not fit a leaf whose
  evidence needs independent sessions.** Found 2026-10-29 planning
  P3-N013 (decision 1). For P1-N016, the process spec maintenance pass.
- **No committed source of a pinned methodology text exists for a role
  without git.** Found 2026-10-29 planning P3-N013 (decision 3). The
  plan-stage and execute-stage packet rows name no route to the pinned
  version's text, and the release register quotes no amended text. For
  P1-N016's packet-table work.
- **W-001's stop conditions do not name a `blocked` chunk.** Found
  2026-10-29 planning P3-N013 (decision 6). This is evidence for
  P3-N016's determination, whichever way decision 6 goes.

## References

- [p3-n005-sequence-mode (specification)](../specs/p3-n005-sequence-mode.md):
  criteria I1 to I6, I10, I11 and A1 to A10; decisions 9 to 16 and the
  gate record of 2026-10-29
- [p3-n005-sequence-mode (plan)](p3-n005-sequence-mode.md): the
  evidence section and decisions 2 and 3
- [p2-n012-deploy-from-ci-on-merge](p2-n012-deploy-from-ci-on-merge.md):
  the plan shape this document follows
- [dispatch.md](../process/dispatch.md): owner-decision economics,
  the handoff contract, bounded attempts, context packets
- [plan-model.md](../process/plan-model.md): the node lifecycle and
  the leaf definition
- [roles.md](../process/roles.md): the model-tier table and the
  Implementer role
- [profiles.md](../process/profiles.md): C1 verification
- [Ruling register](../rulings.md): RU-015, RU-016, RU-018, RU-019,
  RU-020
- Methodology at v1.6.0:
  [W-001](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-001--two-delivery-modes-human-gated)
  (two delivery modes, human-gated),
  [W-008](https://github.com/majodali/methodology/blob/v1.6.0/docs/rules/working-agreement.md#w-008--reports-map-their-deliverables)
  (reports map their deliverables), and
  [the IR specification](https://github.com/majodali/methodology/blob/v1.6.0/docs/intermediate-representation.md)'s
  *Meta-review* section
