# Five platform facts, verified in real sessions before the pull loop is built

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the plan document for node
     P2-N017; it goes `active` when the owner approves it at the gate,
     and `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session): the Implementer that executes this node. The
owner reads [Decisions for the gate](#decisions-for-the-gate) and
[Owner action O11](#owner-action-o11) at the gate (RD-2). It assumes
the methodology at this project's pinned version, 1.6.0
([Classification](../classification.md)), the
[process specification](../process/README.md), and the parent's
[plan](p2-n005-task-pull-loop.md) and
[specification](../specs/p2-n005-task-pull-loop.md).

Node P2-N017 (the platform facts, verified) is child A of P2-N005, the
task-pull loop. P2-N017 is first in the chain P2-N017 to P2-N020. The owner
dispatched this plan on 2026-11-03, beside the plan of P2-N022 (the
owner question queue), because P2-N022's last slice needs this chain
to move.

The parent specification's section
[*Child A*](../specs/p2-n005-task-pull-loop.md#child-a-the-platform-facts-verified)
already fixes this node's outcome, its writes and its criteria A1 to
A10. This plan does not restate them. It records how each fact is
verified, whose hands each needs, the order and the bounds, this
node's edges and reach, and five decisions for the gate.

## Outcome

A committed finding, `docs/findings/p2-n005-platform-facts.md`, answers
five facts yes or no. Each answer carries its method, its date and its
evidence. Each names the later criterion that exercises it live. Nodes
P2-N018 to P2-N020 then build on the answers, or P2-N005 returns to
`planned` with the reason.

## What is known before execute

Read on 2026-11-03 from this repository, the service repository and
the planning session itself. None of it is the finding. The Implementer
re-observes each item.

- **Fact 3, in part.** The service already makes two kinds of read in
  the specification's read table, live, with `contents: read`:
  `commits/{ref}` and a file at `contents/{path}?ref=`. `plan_read` and
  the web view use them (`src/planRegister/registerFetcher.ts`, at the
  service's `3055abc`). The App is installed on
  majodali/project-orchestrator only (service `docs/runbook.md`,
  Step 2). Four reads are not made today: a `contents` listing of a
  directory, `git/matching-refs`, `git/commits/{sha}` and `compare`.
- **Fact 4, cloud.** R12's record of 2026-09-07 says a cloud session
  could not be messaged from the orchestrating session, and no
  transcript tool was available. On 2026-11-03 the planning session's
  own tool list held tools named `create_session`, `get_session`,
  `interrupt_session`, `send_later` and `list_triggers`. One tool's
  description names a `send_message` tool that the list did not hold.
  None was called. The record of 2026-09-07 may be out of date.
- **Fact 5.** The Backlog row "The Orchestrator cannot delete a remote
  branch" records an HTTP 403 on 2026-09-16, cause untested. It names
  three stranded branches. On 2026-11-03 `git ls-remote --heads` lists
  only `main`, `p2-n021-deploy-evidence` and `p2-n023-terms-ratified`.
  So the three are gone, by a deletion nobody recorded.
- **Fact 1, indirectly.** The remote holds two branches whose names
  are not of the `claude/` form. Git does not record who pushed them.
  This proves nothing about a cloud session's reach.

## Approach

### Each fact, its method, and whose hands it needs

| Fact | What is asked | Method | Hands | Who relies on it |
|---|---|---|---|---|
| 1 | A session pushes a branch beside its assigned one | A probe push from the cloud surface (A2) and the local surface (A4) | Cloud: the Implementer. Local: the owner, O11 | P2-N018: the offering push, the claim push, the acceptance merge |
| 2 | GitHub refuses a non-forced push that does not descend from the tip | Probe pushes (A3), plus simultaneous pushes (decision 5) | Cloud: the Implementer. Local: O11 | P2-N018 and P2-N020: first push wins |
| 3 | The App lists claim branches and reads their commits with `contents: read` | GitHub's published permission list, quoted (A5); one live `plan_read` at a claim probe | The Implementer | P2-N020: every task tool |
| 4 | A session starts or resumes another, and learns it finished | Observed on the cloud surface; documented for the local surface (A6) | The Implementer | P2-N018: B5, the start of a pulling session |
| 5 | A session deletes a claim branch it pushed | A probe deletion (A7) | Cloud: the Implementer. Local: O11 | P2-N018: acceptance step 5 |

### Fact 1 covers the Orchestrator's pushes too

A pull run pushes beside an assigned branch twice. The pulling session
pushes its claim branch. The Orchestrator pushes the offering branch,
and later merges into it. Both are cloud sessions under decision 20 of
the parent specification. So the cloud probe pushes a scratch offering
branch first, then builds the claim probe on it (decision 3).

### Where the cloud probes run

The Implementer serves the execute task as a subagent of the
Orchestrator's cloud session. Its pushes answer fact 1 for the
Orchestrator's environment. It also starts one minimal cloud session
by the mechanism fact 4 finds. That session's only job is to push one
claim probe and end. Git shows whether the push landed, and the
claim message names the session's assigned branch. No transcript is
needed (decision 2).

### Fact 2: the client's refusal and GitHub's

A3's second push is refused by git on the client, before GitHub
decides. The client sees the branch's tip and refuses a commit that
does not descend from it. A real race is different. Both claimants
see no branch, and both send a create. Only GitHub's check of the old
value can refuse the second. So the cloud probe also runs three trials
of two simultaneous pushes to a new claim probe (decision 5). The
expected answer is one push landing per trial. Live, I2 tests the race
again later.

```sh
# Three trials; $p is the scratch offering branch's head.
for n in 2 3 4; do
  a=$(git commit-tree "$p^{tree}" -p "$p" -m "Claim probe-$n, A")
  b=$(git commit-tree "$p^{tree}" -p "$p" -m "Claim probe-$n, B")
  git push origin "$a:refs/heads/claim/probe-$n" > "a-$n.log" 2>&1 &
  git push origin "$b:refs/heads/claim/probe-$n" > "b-$n.log" 2>&1 &
  wait
  git ls-remote origin "refs/heads/claim/probe-$n"
done
```

### Fact 3: documented, plus one live read

A5 asks for documentation, and the finding quotes it. The source is
GitHub's page
[Permissions required for GitHub Apps](https://docs.github.com/en/rest/authentication/permissions-required-for-github-apps),
with the date read. Beyond A5, the Implementer calls `plan_read` once
with `ref` set to `claim/probe-1`, before deleting it. The answer shows
the App resolving a claim branch by name, with its current permission.
The call needs `MCP_AUTH_TOKEN` in the session. Without it the finding
says the call was not made. D10 makes the four calls not made today.

### Fact 4: a push mechanism or a check

For each mechanism that tells one session another finished, the
finding states which kind it is. Either it wakes the waiting session,
or the waiting session must check. dispatch.md's
[loop](../process/dispatch.md#the-loop) forbids polling. A mechanism
of the second kind serves only at the Orchestrator's next loop. B5's
text depends on which kind exists.

### A refused push or deletion

The finding says who refused: GitHub, or the surface's proxy. Two
reads decide it. The proxy's status page, where the surface has one,
shows relay failures. GitHub's `GET /repos/{owner}/{repo}/rules/branches/{branch}`
lists the rules active on a branch. A refusal is a finding, not a
failure: an unfavourable answer meets the criterion
([RU-019](../rulings.md)). A probe is repeated once, only when the
failure is the network's.

### Order and bounds

1. At the gate, the owner runs [O11](#owner-action-o11) and returns its
   output (decision 4).
2. The Orchestrator dispatches the execute task with that output in
   the brief. One task, one Implementer, standard tier.
3. The Implementer reads the documented sources: facts 3 and 4.
4. It pushes the scratch offering branch, then `claim/probe-1`: a
   claim, a sibling, a renewal (facts 1 and 2).
5. It calls `plan_read` at `claim/probe-1` (fact 3).
6. It runs the three trials, `claim/probe-2` to `claim/probe-4`
   (fact 2).
7. It starts the minimal session, which pushes `claim/probe-5`
   (facts 1 and 4).
8. It deletes every probe branch it pushed (fact 5). It lists any
   that remain.
9. It commits the finding and the Backlog in one commit (A10).

The bound is one loop pass for execute and one for acceptance. A task
that returns `blocked` on a surface failure is re-dispatched once.
After that, the Orchestrator stages the failure to the owner. The
probes create at most seven branches: one offering branch and six
claim branches, counting O11's.

### Owner action O11

Run this from a Claude Code session on the owner's own machine, in a
clone of majodali/project-orchestrator. Return the whole output. Git
prints nothing secret here.

```sh
( set -x
  date -u +%Y-%m-%dT%H:%M:%SZ
  git --version
  git fetch origin main
  p=$(git rev-parse FETCH_HEAD)
  c1=$(git commit-tree "$p^{tree}" -p "$p" -m "Claim probe-11")
  git push origin "$c1:refs/heads/claim/probe-11"   # A4: expect it lands
  c2=$(git commit-tree "$p^{tree}" -p "$p" -m "Claim probe-11, sibling")
  git push origin "$c2:refs/heads/claim/probe-11"   # A3: expect a refusal
  c3=$(git commit-tree "$c1^{tree}" -p "$c1" -m "Renew probe-11")
  git push origin "$c3:refs/heads/claim/probe-11"   # A3: expect it lands
  git push origin --delete claim/probe-11           # A7: lands, or a refusal
  git ls-remote origin 'refs/heads/claim/probe-*'
) 2>&1
```

The local probe builds on `main`'s head, not on the scratch offering
branch. The push is the same command, so A4's "the same push" holds.
The number 11 keeps the local probe apart from the cloud probes,
whatever order they run in.

## What this node does not cover

- **The protocol's forms and text.** P2-N018 writes them.
- **The four endpoints not called today, live.** D10 calls them.
- **A real race between two pulling sessions.** I2 runs one.
- **Surfaces other than cloud and local.** The parent specification
  names those two.
- **Deleting branches stranded before this node.** P1-N016's branch
  rule disposes of them.

## Leaf or interior

**Leaf.** One Implementer session runs every probe, and O11 is one
owner session. The five facts share their probe branches, so a cut
would repeat the setup.

## Dependencies

- **Repository reach ([RU-016](../rulings.md)).** Exact match; it
  decides silently. Both repositories are in approved scope.
  - majodali/project-orchestrator, write: the finding,
    `docs/backlog.md`, the scratch offering branch and the claim
    probes.
  - majodali/project-orchestrator-service, read: `README.md`,
    `docs/runbook.md` and `src/planRegister/`.
  - Read over the web: GitHub's REST documentation, and the Claude Code
    documentation for the local surface. If the surface's egress refuses
    a page, the finding says so.
- **P2-N017 creates** `p2-n005-platform-facts` (the finding,
  `docs/findings/p2-n005-platform-facts.md`).
- **P2-N017 modifies** `project-orchestrator-repo` and `backlog`.
- **P2-N017 uses** `project-orchestrator-service-repo` and
  `dispatch-rules`.
- **Additions to the parent's list.** The parent specification states
  the first two items. The `uses` items are found here. The first is
  the read reach of the specification's reach table. The second is
  fact 4's test against dispatch.md's loop. Neither adds a
  dependency: no open node creates either resource.
- **Nodes.** None. P2-N017 is first in its chain. P2-N018 to P2-N020
  wait on it (plan decision 2).
- **Owner action.** O11, at the gate. Any further one is numbered from
  O14 (A6).

## Verification

C1 profile ([profiles](../process/profiles.md)). The Implementer
self-verifies against A1 to A10 of the parent specification. This
plan's adopted decisions bind it beside them and change no criterion.
The Orchestrator checks at acceptance that each fact names its method,
its date, its surface and its later criterion.

## Risks

What a false or missing fact changes downstream. A false fact 1, 2 or
3 returns P2-N005 to `planned` (A8). P2-N018 to P2-N020 then wait, and
so does P2-N022's last slice.

| Fact false | What changes |
|---|---|
| 1, cloud | Neither claim nor offering branch can be pushed from a cloud session. The redesign might move the names under a pattern the surface permits, which changes the ratified term *claim branch*. It might also move the pull run to the local surface, overriding decision 20. |
| 1, local only | The pull run stays on the cloud surface. The fallback from the local surface needs another path. |
| 2 | First push wins is unsound. The claim needs another arbiter that can refuse a second create. |
| 3 | The App needs a wider permission: an owner action, and I9 restated. Or the tools read through fewer endpoints. |
| 4, none | The Orchestrator cannot start a pulling session. A session the owner starts by hand breaks the parent's gate. The gap is staged as O14. |
| 4, a check only | The Orchestrator learns that a session finished only at its next loop. B5 says so. |
| 5 | Claim and work branches accumulate after acceptance. Acceptance step 5 names who deletes them, under P1-N016's branch rule. |

Two further risks, each proposed for the Backlog below:

- **A fact goes stale.** The platform changes between the finding and
  I1. I14 re-exercises every fact live, which bounds the exposure to
  one node.
- **Probe branches strand.** If deletion is refused, up to seven
  branches remain. The finding lists them for the owner.

## Monotonicity

**No planned non-monotonicity.** P2-N017 adds one document and a
Backlog row. It changes no test and no code.

## Decisions for the gate

Numbered per dispatch.md's
[owner-decision economics](../process/dispatch.md#owner-decision-economics).
This document opens its own sequence at 1. The owner's go-ahead adopts
every default not overridden by number.

**Precedents checked against the [Ruling register](../rulings.md).**
RU-016 (the Planner declares the repository access a node needs)
decides the reach silently. RU-010 (work reaches `main` by pull
request) governs how the finding reaches `main`. Near matches, cited
in rationales: RU-020 (no separate break down task after a
specification at breakdown depth) for decision 1; RU-019 (a
measurement may be met by an unfavourable result) for a refusal; and
RU-018 (a child is not queued behind a sibling it does not depend on)
for decision 4's alternative.

1. **P2-N017's specification.** Default: the parent specification's
   *Child A* section, with no specify task. At this gate the node moves
   `identified` → `planned` → `specified` in one act. Rationale: that
   section carries checkable criteria at C1 depth; P3-N006 crossed the
   same way (its decision 1); RU-020 spares a task on the same
   reasoning. Affected locations: `docs/plan.md`, the line before
   P2-N005's children. Drafted text, replacing "Each goes to execute
   with no plan or specify task of its own:": "P2-N017 had a plan task,
   T102, and took its specification from the parent. The other three go
   to execute with no plan or specify task of their own:".
2. **Where the cloud probes run.** Default: the Implementer runs as a
   subagent of the Orchestrator's cloud session. It also starts one
   minimal cloud session that pushes one claim probe. Rationale: the
   subagent answers for the Orchestrator's own pushes. The started
   session answers for a pulling session's push, and observes fact 4
   live. Git is the evidence, so no transcript is needed. Alternative:
   all probes in the subagent, with fact 1 scoped to the Orchestrator's
   environment and fact 4 documented only. Affected locations: none.
3. **The scratch offering branch.** Default: named `pull-probe-<date>`
   in `YYYY-MM-DD` form, pushed by the Implementer, and counted among
   the probe branches. Rationale: A2 requires the branch, and the
   Writes line names only `claim/probe-<n>`; the push also tests the
   Orchestrator's offering push. Affected locations: the parent
   specification, which is `active`, *Child A*, its Writes line.
   Drafted text, replacing "and probe branches named
   `claim/probe-<n>`.": "probe branches named `claim/probe-<n>`, and
   one scratch offering branch named `pull-probe-<date>` (corrected at
   P2-N017's plan gate, decision 3; the line named the claim probes
   only)."
4. **O11's order.** Default: the owner runs O11 at the gate. The
   execute brief carries its output, and the finding commits once.
   Rationale: A10 asks for one commit, and plan decision 2 holds every
   sibling until then; O11 is a dozen commands. Alternative: commit the
   cloud facts first, and release P2-N019 then; it uses no git fact,
   and RU-018 argues for releasing it. That needs a second commit and
   overrides plan decision 2. Affected locations: none.
5. **Simultaneous pushes.** Default: three trials of two simultaneous
   claim pushes from the cloud session, beyond A3. Rationale: A3's
   refusal is the client's, and only a race tests GitHub's own. A
   false answer found first at I2 would return the node after P2-N018
   to P2-N020 are built. Affected locations: none.

## Backlog additions

- **P2-N017's row.** Rewritten at this gate. Drafted text, with its
  links relative to `docs/`:

  ```markdown
  - [ ] **P2-N017 specified, 2026-11-03: the platform facts, verified**
    — When: identified 2026-10-30; planned 2026-11-03 (T102); specified
    at the plan gate from the parent's child A section. Status:
    specified; execute against A1 to A10, after owner action O11.
    Pointer: [plan](plans/p2-n017-platform-facts.md) · [specification
    of P2-N005, child
    A](specs/p2-n005-task-pull-loop.md#child-a-the-platform-facts-verified).
  ```

- **Stale row.** Located finding, on the row "The Orchestrator cannot
  delete a remote branch". The row says three branches are stranded
  now. On 2026-11-03 `git ls-remote --heads` lists none of the three.
  Nobody recorded their deletion. Fact 5 answers the row's question.
- **Stale facts.** A platform fact can change after its finding. For
  P1-N016: should the process date-limit a finding, as it time-limits
  the lease? I14 covers this node.
- **Stranded probes.** If fact 5 is false, the finding's list of probe
  branches goes to the owner. P1-N016's branch rule owns the general
  case.

## Register action proposed

At this gate, under decision 1, the Orchestrator records P2-N017
`identified` → `planned` → `specified`, and transcribes the four edges
above. The register line becomes:

```markdown
    - P2-N017 [specified] The platform facts, verified — plan: plans/p2-n017-platform-facts.md · spec: specs/p2-n005-task-pull-loop.md
```

Next: O11 by the owner, then the execute task.

## References

- [p2-n005-task-pull-loop](../specs/p2-n005-task-pull-loop.md): the
  parent specification, *Child A*, *The tools*, I2, I14, decisions 15
  and 20, owner actions O11 to O13
- [p2-n005-task-pull-loop](p2-n005-task-pull-loop.md): the parent plan,
  decision 2
- [p3-n006-thin-end-to-end-slice](p3-n006-thin-end-to-end-slice.md):
  decision 1, the same crossing
- [dispatch](../process/dispatch.md): the loop, owner-decision
  economics, trigger surfaces
- [project-model](../process/project-model.md): how a plan writes an
  edge
- [Ruling register](../rulings.md): RU-010, RU-016, RU-018, RU-019,
  RU-020
- [Risk register](../open-risks.md): R11 (MCP surface constraints),
  R12 (service outage stops work)
- The service repository,
  [majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service),
  at `3055abc`: `docs/runbook.md` Step 2,
  `src/planRegister/registerFetcher.ts`
