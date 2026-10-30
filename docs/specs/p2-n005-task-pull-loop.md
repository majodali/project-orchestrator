# The task-pull loop: specification

Status: draft

<!-- K-007 contract: Status transitions draft → active → (superseded by
     X, because Y | closed → Backlog entry). Anything unmarked here is a
     live claim of current intent. This is the specification document
     for node P2-N005. It goes `active` when the owner accepts it and
     the breakdown at this node's specify gate. It goes
     `closed → Backlog entry` when the node reaches `done`. -->

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session): the Implementers that execute children A to D,
and the verifier that checks the node. It assumes the methodology at
this project's pinned version, 1.6.0
([Classification](../classification.md)), the
[process specification](../process/README.md), and the node's
[plan](../plans/p2-n005-task-pull-loop.md). The owner reads
[Decisions for the gate](#decisions-for-the-gate) at the specify gate
(RD-2).

Node **P2-N005** (the task-pull loop) is chunk 4 of **P2-N001**
(orchestration service, [plan](../plans/orchestration-service.md)).
This document specifies the outcome its
[plan](../plans/p2-n005-task-pull-loop.md) fixed. The owner accepted
that plan on 2026-10-30. He adopted defaults 1 to 13 and ratified four
terms: [task file](../plans/p2-n005-task-pull-loop.md#def-task-file),
[claim branch](../plans/p2-n005-task-pull-loop.md#def-claim-branch),
[result file](../plans/p2-n005-task-pull-loop.md#def-result-file) and
[session handle](../plans/p2-n005-task-pull-loop.md#def-session-handle).

The gate, from the parent plan: a node moves through its lifecycle
across two sessions with no owner intervention beyond the gate.

This document records the criteria the **node itself** is verified
against. It is not the union of its children's criteria. An interior
node's `verifying` runs after its children are `done`, against its own
criteria ([plan-model](../process/plan-model.md)). A child's own
criteria are under [The breakdown](#the-breakdown). Under decision 1
the node is interior, and this document carries its four children at
the depth a `break down` task would produce. So
[RU-020](../rulings.md) (an interior node whose specification reaches
breakdown depth needs no separate `break down` task) applies.

Depth is the C1 profile's: a criteria list a verifier can check
([profiles](../process/profiles.md)). Nothing here reopens the
substance of a plan decision. Decision 15 below changes how decision
5's voluntary release is made, for a reason recorded there.

## What the plan decided, and what this specification makes exact

The plan's decisions 3 to 10 define the protocol. Decisions 11 and 12
place it beside subagent dispatch and against node P3-N014 (the loop
runs sequence mode). Each lands here as follows.

| Plan decision | Consequence as adopted | Made exact in |
|---|---|---|
| 3, where an offered task lives | A task file on the branch the scope grant names | [The task file](#the-task-file) |
| 4, how a session claims | A non-forced push to the claim branch; first push wins, with or without the service | [The claim branch and its commits](#the-claim-branch-and-its-commits) |
| 5, how a claim ends | At acceptance, at voluntary release, or at expiry (two hours by default, renewable); an ended claim makes the task `stale`, re-offered under a new task ID | [The expiry and `stale` rule](#the-expiry-and-stale-rule); decision 15 |
| 6, how a result returns | A result file on the claimant's work branch, merged at acceptance; `main` still by pull request | [The result file](#the-result-file) |
| 7, role-aware identity | A declared role, a session handle, a lease that refuses a non-Orchestrator handle | [The session handle](#the-session-handle) |
| 8, who writes the register | The Orchestrator, at acceptance | [Acceptance in a pull run](#acceptance-in-a-pull-run) |
| 9, reconciliation | Nothing to reconcile: the service keeps no offer, claim or result | Criterion I5 |
| 10, a session with no task | It ends its turn; the Orchestrator starts or resumes a session after offering | [Dispatch in a pull run](#dispatch-in-a-pull-run) |
| 11, beside subagent dispatch | A pull run is a scope-grant option; subagent dispatch is unchanged | [Dispatch in a pull run](#dispatch-in-a-pull-run) |
| 12, order against P3-N014 | Child B's execute waits for P3-N014's execute, which is met: P3-N014 is `done` | [Child B](#child-b-the-loop-in-git-alone) |

Writing the forms exposed four things the plan left implicit. Each is
now stated.

- **The session-end rule.** [observability.md](../process/observability.md)
  requires the Orchestrator to journal a task `stale` when its session
  ends. In a pull run the Orchestrator ends its turn after offering,
  so that rule would make every pulled task stale at once. In a pull
  run, the trigger is the claim's end instead. The consequence,
  `stale` then a fresh form check then a new task ID, is dispatch.md's
  rule unchanged. Child B writes it (B4, B7).
- **Branch deletion.** The Backlog row "The Orchestrator cannot delete a
  remote branch" records an HTTP 403 refusal of 2026-09-16, cause
  untested. Decision 5 made voluntary release a branch deletion. This
  specification makes release a commit instead (decision 15), and child
  A records whether deletion works (fact 5).
- **Which branch a session reads.** The service cannot read a scope
  grant. So each task tool takes the branch as an argument, and the
  message that starts a session names it.
- **The open set.** A task file leaves the offering branch when its
  task closes (decision 16). The set of open tasks is then one
  directory listing, in git and in the service alike.

## Terms this specification introduces

Each term below is proposed for ratification (decision 22). The four
ratified terms keep their definitions in the plan until child B
restates them in [dispatch.md](../process/dispatch.md).

- <a id="def-pull-run"></a>**Pull run**: a run of the loop, chosen in
  the scope grant, in which the Orchestrator offers each task as a
  task file and a session in the task's role claims and serves it.
- <a id="def-offering-branch"></a>**Offering branch**: the branch of
  the coordinating repository that a pull run's scope grant names. It
  holds the run's task files, and work merges into it at acceptance.
- <a id="def-claim-commit"></a>**Claim commit**: an empty commit on a
  [claim branch](../plans/p2-n005-task-pull-loop.md#def-claim-branch)
  whose message opens with `Claim`, `Renew` or `Release` and the task
  ID. The claim branch's tip commit decides the claim's state.

## The forms

Every form below is exact. Child B writes each one into dispatch.md.
Child D's tools parse them and cite dispatch.md as the authority. A
form that dispatch.md permits and the service refuses, or the reverse,
is a service bug with a Backlog entry, never a second rule.

Timestamps in every form are UTC, written `YYYY-MM-DDThh:mm:ssZ`.

### The task file

**Path**: `orchestration/tasks/<task ID>.md` in
majodali/project-orchestrator, on the
[offering branch](#def-offering-branch).

**Who writes it, and when**: the Orchestrator, at step 2 of
[the loop](../process/dispatch.md#the-loop) in a
[pull run](#def-pull-run). It commits the task file in the dispatch
commit, with the buffered `dispatched` event, and pushes the offering
branch. Nobody edits a task file after that push.

```markdown
# Task T101

Task: T101
Node: P2-N018
Stage: execute
Role: implementer
Branch: pull-2026-11-02
Offered: 2026-11-02T10:00:00Z
Claim expiry: 2h
Supersedes: none
Reading: none

## Brief

1. Project identity: the Binding block and Classification.
2. The node: its register line, its ancestors' path, its documents.
3. Inputs: the packet the packet table gives the stage.
4. The charge: the expected outputs, the writes, the W-003 note, and
   the `needs-judgment` note.
```

**The header** is the nine lines after the title and a blank line, in
this order, each `Name: value`.

| Field | Value |
|---|---|
| `Task` | The task ID, equal to the file name's |
| `Node` | The node's Plan register ID |
| `Stage` | One of `plan`, `specify`, `break down`, `execute`, `verify` |
| `Role` | A role slug from [the role vocabulary](#the-role-vocabulary) |
| `Branch` | The offering branch |
| `Offered` | The time of the dispatch commit |
| `Claim expiry` | A duration, `<n>m` or `<n>h`, from `10m` to `24h`; `2h` by default |
| `Supersedes` | The task ID this task re-offers, or `none` |
| `Reading` | The superseded task's work branch, or `none` |

**The body** is one section, `## Brief`, holding the four items of the
[task brief](../process/dispatch.md#the-handoff-contract) as a subagent
prompt would carry them. The service reads the header only.

**How a task file leaves the offering branch.** The Orchestrator
removes it in one of three commits (decision 16):

- the acceptance commit, which also merges the work branch;
- the re-offer commit, which adds the successor task file with
  `Supersedes` naming this task;
- a withdrawal commit, for an offer with no claim branch, journaled
  `stale` with the note "withdrawn".

A task is **open** while its task file is on the offering branch's
head.

### The claim branch and its commits

**Name**: `claim/<task ID>`, in majodali/project-orchestrator.

**What carries it**: [claim commits](#def-claim-commit), each pushed
without force. Each is empty: its tree is its parent's tree.

- The first commit is a `Claim`. Its parent is the offering branch's
  head as the claimant read it, which holds the task file.
- A `Renew` or a `Release` has the claimant's latest claim commit as
  its parent.

```text
Claim T101

Task: T101
Session: session_01AbCdEfGh
Role: implementer
Work branch: claude/p2-n018-loop-in-git-x1y2
Expires: 2026-11-02T12:05:00Z
```

```text
Renew T101

Task: T101
Session: session_01AbCdEfGh
Role: implementer
Work branch: claude/p2-n018-loop-in-git-x1y2
Expires: 2026-11-02T14:05:00Z
```

```text
Release T101

Task: T101
Session: session_01AbCdEfGh
Role: implementer
Work branch: claude/p2-n018-loop-in-git-x1y2
Reason: the brief names a file this surface cannot reach
```

**The message** is a title line, a blank line, then the fields in the
order shown. `Session` is the session's identifier, as the
[run journal](../process/observability.md)'s `session` field takes it,
or `unknown`. `Work branch` is the branch the claimant commits its
work and result file on. On a cloud surface it is the branch the
surface assigned. `Expires` is the time the claimant asks the claim to
last until. `Reason` is one line.

**The commands.** A session claims, renews and releases with the same
three git operations, with or without the service.

```sh
# Claim: the parent is the offering branch's head.
git fetch origin pull-2026-11-02
parent=$(git rev-parse FETCH_HEAD)
git cat-file -e "$parent:orchestration/tasks/T101.md"
sha=$(git commit-tree "$parent^{tree}" -p "$parent" -F claim-message.txt)
git push origin "$sha:refs/heads/claim/T101"

# Renew or release: the parent is the claim branch's tip.
git fetch origin claim/T101
parent=$(git rev-parse FETCH_HEAD)
sha=$(git commit-tree "$parent^{tree}" -p "$parent" -F renew-message.txt)
git push origin "$sha:refs/heads/claim/T101"
```

`git commit-tree` builds the commit without touching the session's
checkout, so the work branch is undisturbed. A refused push means the
claim was lost, or the claim moved: the session reads the claim
branch again and does not retry the push.

**Why the first push wins.** Two claimants each build a `Claim` on the
same parent. Neither commit descends from the other. GitHub refuses a
non-forced push whose commit does not descend from the branch's
current tip, so the second push is refused (child A, fact 2).

### The expiry and `stale` rule

A claim's state is read from its claim branch's tip commit, at the
moment of reading. The rule, with the two-hour default coming from the
task file's `Claim expiry`:

```text
effective expiry of a Claim or Renew commit C =
    the earlier of: the Expires field of C,
                    the committer time of C + the task file's Claim expiry

state of claim/<task ID>, read from its tip commit;
the first line that holds decides:
    no claim branch                         -> unclaimed
    tip does not parse, its Role differs
      from the task file's, or a Renew or
      Release names another Session         -> invalid
    tip is Release                          -> released
    tip is Claim or Renew, and the claim's
      work branch holds the result file in
      a commit made before the tip's
      effective expiry                      -> delivered
    tip is Claim or Renew, now < its
      effective expiry                      -> live
    otherwise                               -> expired

a Renew counts only if its committer time is earlier than the
effective expiry of its parent; otherwise the claim stays expired.
```

**The `stale` rule in a pull run.** At each loop, before selection,
the Orchestrator reads every open task's claim branch. For each one
whose state is expired, released or invalid, it:

1. journals `stale`, naming the claim branch and the state;
2. runs the form check;
3. offers a fresh task under a new task ID. The new task file's
   `Supersedes` names the old task, and its `Reading` names the old
   work branch. The same commit removes the old task file.

```json
{"ts":"2026-11-02T12:20:00Z","event":"stale","task":"T101","node":"P2-N018",
 "stage":"execute","role":"implementer","session":"session_01AbCdEfGh",
 "ref":"<claim tip SHA>","note":"claim/T101 expired 2026-11-02T12:05:00Z; re-offered as T102"}
```

A result for a task that is no longer open is never accepted. Its work
branch stays readable to the successor through `Reading`.

In a pull run, the end of an orchestration session does not make an
open task stale. The task file and the claim branch keep it readable
to every session, which is what the session-end rule exists to secure
([observability.md](../process/observability.md), write and read
rules).

### The result file

**Path**: `orchestration/results/<task ID>.md` in
majodali/project-orchestrator, on the claimant's work branch. The
claimant commits it with its work, or in a commit of its own after the
work, and pushes the work branch. At acceptance it reaches the
offering branch with the merge, where it stays as the committed record
of the result.

**Shape**: the [result core](../process/dispatch.md#def-result-core)
in its fixed order, with the
[member's result record](../process/dispatch.md#the-members-result-record)'s
parts as headings, so the Orchestrator copies each part verbatim.

```markdown
# Result of T101

Task: T101
Node: P2-N018
Stage: execute
Role: implementer
Claim: claim/T101
Work branch: claude/p2-n018-loop-in-git-x1y2

## Status

done

## Deliverable map

The work branch carries two commits. Their content is below.

### Checks

- `node plugin/scripts/form_check.ts`: 0 violations
- B11: met

### Refs

- `3f2a9c1` in majodali/project-orchestrator: the pull-run section

### Flags

none

## Asks

No asks

## What changed

none

## Terms introduced

No terms introduced

## Located findings

none

## Packet widenings

none

## Session usage

Model: <the model ID the harness reports>. Tokens: <as reported>.
```

**What is required**, and what child D's `task_complete` checks:

- the title `# Result of <task ID>`, and the six header lines in the
  order shown, whose `Task` equals the file name's ID;
- these second-level headings, in this order: `Status`,
  `Deliverable map`, `Asks`, `What changed`, `Terms introduced`,
  `Located findings`, `Packet widenings`, `Session usage`;
- under `Deliverable map`, the third-level headings `Checks`, `Refs`
  and `Flags`, in that order;
- a `Status` section whose first non-blank line opens with `done`,
  `blocked:` or `needs-judgment:`;
- each section stated when empty, in the stated-empty form shown.

A role's own fields ([the handoff contract](../process/dispatch.md#the-handoff-contract))
go between `Terms introduced` and `Located findings`, each under its
own second-level heading, named as the contract names it.

The service checks the form only. It never parses more than the status
token and the presence of the parts. The Orchestrator's handoff check
judges the content.

### The session handle

**What the service issues**: `session_register` takes a role and
returns a [session handle](../plans/p2-n005-task-pull-loop.md#def-session-handle).

```json
{
  "sessionHandle": "7d1f0c3e-5b2a-4e8f-9a61-0c2d9e4b7a10",
  "role": "implementer",
  "issuedAt": "2026-11-02T10:01:12Z",
  "expiresAt": "2026-11-02T22:01:12Z"
}
```

- The handle is a random UUID, made as the lease token is made today.
  It is not a credential: every session holds the same bearer token.
- It expires twelve hours after issue and is not renewable
  (decision 17). A session whose handle expired registers again.
- The service stores the pair as one item in the lease table of the
  alias that answered, with the key `session#<handle>` and a DynamoDB
  time-to-live. Expiry is enforced in application logic, as the lease's
  is; the time-to-live only clears the table.

**How a call carries it**: as the argument `sessionHandle`. Every
task tool requires it. `plan_lease_acquire` takes it optionally.

```json
{"name": "plan_lease_acquire",
 "arguments": {"holder": "T101-acceptance", "sessionHandle": "7d1f0c3e-5b2a-4e8f-9a61-0c2d9e4b7a10"}}
```

**What it decides**:

- A handle that is unknown or past its expiry is refused by every tool
  that takes it. The refusal names which, and says that
  `session_register` issues a new one.
- `plan_lease_acquire` with a handle whose role is not `orchestrator`
  is refused. The refusal names the role and cites
  [roles.md](../process/roles.md)'s Orchestrator contract. With an
  `orchestrator` handle, or with no handle, it behaves as it does
  today.
- The other three write tools are unchanged. They already require the
  lease token.

### The role vocabulary

The roles a session may declare are the roles of
[roles.md](../process/roles.md), *The roles*, written as lowercase
slugs. The service cites roles.md in its source and never re-declares
a role. A role roles.md defines and the service refuses is a service
bug.

```text
orchestrator  planner  implementer  reviewer  paraphraser
reviewer-stranger  liaison  auditor
```

A task file's `Role` is the role the [profile](../process/profiles.md)
assigns to the task's stage.

### The progress note

`task_progress` stores the latest note per task as one item, key
`progress#<task ID>`, with the time, the handle's role and a
time-to-live of seven days. A new note replaces the old one. Notes are
telemetry. No tool answers what was offered, claimed or delivered from
them.

## Dispatch in a pull run

The Orchestrator keeps the loop's steps 1 and 2: it selects the next
actionable pair and assembles the brief. A pull run changes how the
brief travels and how the task returns. These are the changes child B
writes. Each lands in a new section of dispatch.md, *Pull runs*, and
each existing paragraph it touches gains one sentence pointing there
(decision 19).

**The scope grant.** It states a pull run with one more line. The
grant's other fields are unchanged. Without the line, the run is not a
pull run, and subagent dispatch runs exactly as today (plan
decision 11).

```text
Pull run: pull-2026-11-02 (the offering branch, in majodali/project-orchestrator)
```

**Offering (step 2).** The Orchestrator writes the brief as a task
file, commits it in the dispatch commit with the buffered journal
events, and pushes the offering branch. The `dispatched` event's `ref`
is the dispatch commit, and its `session` is `null`.

```text
Offer T101: P2-N018 execute, implementer

Task file orchestration/tasks/T101.md; journal: dispatched T101.
```

**Starting a session.** After the push, the Orchestrator starts or
resumes a session in the task's role, by the mechanism child A
recorded for its surface. The start message names the role, the
repository, the offering branch and the git-only path, so a session
meets the fallback rule without looking
([R17 (the harness's guidance pushes against the fallback rule)](../open-risks.md)).

```text
Serve the implementer role in a pull run of majodali/project-orchestrator.
Offering branch: pull-2026-11-02. Follow docs/process/dispatch.md, section
Pull runs. If the orchestration service does not answer, do not retry or
wait: run that section's git steps.
```

**Serving (the pulling session).** With the service:
`session_register`, `task_next`, `task_claim`, the claim push,
`task_progress` as work proceeds, a renewal push when the response
warns, the result file pushed, then `task_complete`. Without the
service: the same steps in git alone. The session lists
`orchestration/tasks/` on the offering branch, reads each claim branch
by the expiry rule, picks the oldest unclaimed task in its role by
`Offered`, and runs the same commands. A session whose role has no
unclaimed task ends its turn and says so. It never sleeps, polls or
holds a call open.

**Sequence mode.** Inside a ratified sequence, the Orchestrator offers
one member task at a time, after the previous task's `accepted` event,
as [Sequence mode](../process/dispatch.md#sequence-mode) requires. The
result file carries every part the member's result record reads.
Nothing in a pull run needs the service, and this node adds no stop
condition.

### Acceptance in a pull run

The Orchestrator keeps step 3. In a pull run it:

1. reads the claim branch's tip and the task's open task file;
2. checks one item more than the handoff check holds today: the claim's
   `Role` equals the task file's `Role`, and the claim's state is
   delivered;
3. reads the result file at the head of the work branch the claim
   names, and runs the handoff check over it as over any returned
   result;
4. merges the work branch into the offering branch, and in the same
   acceptance commit removes the task file, records the stage change
   (through the lease, or by hand without the service), writes the
   Cost log row from the result file's `Session usage`, and flushes the
   `result-received` and `accepted` events. The `result-received`
   event's `session` is the claimant's `Session`;
5. pushes, then deletes the claim branch and the work branch under
   whatever rule dispatch.md then holds for deleting a task branch.

Work still reaches `main` by pull request, under RU-009 (work reaches
`main` by pull request) and RU-010 (the coordinating repository does
the same) ([Ruling register](../rulings.md)).

### Process document changes, by location

| Document | Location | Change (child B) |
|---|---|---|
| `docs/process/dispatch.md` | a new section *Pull runs*, after *The orchestration service* | The seven terms with anchors; the forms above; offering, serving, acceptance and the `stale` rule |
| `docs/process/dispatch.md` | *The loop*, steps 2 and 3 | One sentence each, pointing at *Pull runs* |
| `docs/process/dispatch.md` | *Failure containment*, stale tasks | One sentence: in a pull run the trigger is the claim's end, and the consequence is unchanged |
| `docs/process/dispatch.md` | *Trigger surfaces (v1)* | One sentence: after offering, the Orchestrator starts or resumes a session in the role, within approved scope |
| `docs/process/dispatch.md` | *Gates (v1)*, "A scope grant states" | The pull-run line |
| `docs/process/enlistment.md` | *The fallback rule* | A pulling session that finds the service unreachable runs the git steps of *Pull runs*, and does not retry or wait |
| `docs/process/observability.md` | *Write and read rules* | The dispatch commit joins the commits the journal is flushed in; the session-end rule exempts a pull run's open tasks |
| `docs/process/observability.md` | *Events* | The `dispatched` and `result-received` fields in a pull run; no new event kind (decision 14) |
| `docs/process/roles.md` | *Duties every role carries* | The pull duty: serve *Pull runs* when started for one; end the turn when no task is offered |
| `.claude/agents/` (six) | each contract | The pull duty in the role's terms; the Orchestrator's contract carries offering and acceptance |
| `plugin/agents/` | generated | Regenerated by `node plugin/scripts/sync_agents.ts` |

## The tools

The service gains six tools. Child C delivers `session_register`.
Child D delivers the five task tools. Each task tool reads git afresh
through the GitHub App, with its current `contents: read` permission,
and names every commit SHA it read. None writes git.

**What every task tool reads from git.** The calls below are GitHub
REST endpoints. Child A confirms each one's required permission
(fact 3).

| Read | Endpoint |
|---|---|
| The offering branch's head | `GET /repos/{owner}/{repo}/commits/{ref}` |
| The task files at that head | `GET /repos/{owner}/{repo}/contents/orchestration/tasks?ref={sha}`, then each file |
| The claim branches | `GET /repos/{owner}/{repo}/git/matching-refs/heads/claim/` |
| A claim commit's message, parent and committer time | `GET /repos/{owner}/{repo}/git/commits/{sha}` |
| A result file | `GET /repos/{owner}/{repo}/contents/orchestration/results/{id}.md?ref={sha}` |
| Whether a commit is on a work branch | `GET /repos/{owner}/{repo}/compare/{sha}...{branch}` |

**What every tool can fail on, beyond its own refusals**: the GitHub
App is not configured; GitHub refuses or does not answer (the error
names the HTTP status, as `plan_read`'s does); the lease table does not
answer; the handle is unknown or expired. Every failure is a tool
error with text. None is retried by the service. A session that meets
one proceeds by the git steps, which are complete without the service.

### `session_register` (child C)

- **Inputs**: `role`, a slug from the role vocabulary.
- **Reads from git**: nothing.
- **Returns**: `sessionHandle`, `role`, `issuedAt`, `expiresAt`.
- **Fails on**: a role outside the vocabulary (refused, listing the
  vocabulary and citing roles.md); the lease table not answering.

### `task_next` (child D)

- **Inputs**: `sessionHandle`; `ref`, the offering branch.
- **Reads from git**: the head of `ref`, the task files at it, the
  claim branches of those tasks and their tip commits.
- **Returns**: `ref`, `sha` (the head read), `readAt`, and `task`: the
  open task in the handle's role with no claim branch, oldest by
  `Offered` and then by task ID, with its header fields, path and
  body. Or `task: null` when there is none.
- **Never returns**: a task of another role, a task with any claim
  branch (live, delivered, expired, released or invalid), or a task
  that is not open.
- **Fails on**: `ref` not found; a task file whose header does not
  parse (reported by path, and skipped, never guessed).

### `task_claim` (child D)

- **Inputs**: `sessionHandle`; `ref`; `taskId`; `workBranch`;
  `session`, the session's identifier or `unknown`.
- **Reads from git**: the head of `ref`, the task file, and
  `claim/<taskId>` if it exists.
- **Returns**: `ref`, `sha` (the parent to use, the head read),
  `claimBranch`, `expiresAt` (the time of the call plus the task
  file's `Claim expiry`, for the message's `Expires`), the exact
  `message`, and the exact `commands`, as in
  [The claim branch and its commits](#the-claim-branch-and-its-commits).
- **Refuses**: a task not open at `ref`; a task whose `Role` is not
  the handle's; a task with a claim branch. A refusal for a claim
  branch names its state, its tip SHA, its `Session` and its expiry.
  So the loser of a race learns the winner from git and from this
  tool.

### `task_progress` (child D)

- **Inputs**: `sessionHandle`; `ref`; `taskId`; `note`, 1 to 500
  characters.
- **Reads from git**: the task file at the head of `ref`, and the
  claim branch's tip.
- **Writes to its own store**: the latest note for the task.
- **Returns**: `recordedAt`, `claimTip`, `effectiveExpiry`,
  `remaining`, and `warning` when less than a quarter of the task's
  `Claim expiry` remains. The warning carries the exact renewal
  message and commands.
- **Refuses**: a claim that is not live; a claim whose `Role` is not
  the handle's.

### `task_complete` (child D)

- **Inputs**: `sessionHandle`; `ref`; `taskId`; `sha`, the work-branch
  commit holding the result file.
- **Reads from git**: the task file at the head of `ref`, the claim
  branch's tip, the result file at `sha`, and whether `sha` is on the
  claim's `Work branch`.
- **Returns**: `sha`, `status` (the status token), `parts` (each
  required part present), and `ok: true`.
- **Refuses**: a task that is not open, naming its successor when a
  task file supersedes it ("this result will not be accepted"); a
  `sha` not on the claim's work branch; a missing or misordered part,
  each named; a status line that opens with none of the three tokens.

### `task_status` (child D)

- **Inputs**: `sessionHandle`, of any role; `ref`; `taskId`, optional.
- **Reads from git**: the head of `ref`, every task file at it, every
  `claim/` branch and its tip, and the result file on each claim's
  work branch and on `ref`.
- **Returns**: `ref`, `sha`, `readAt`; for each open task, its header,
  its claim (branch, tip SHA, `Session`, `Role`, `Work branch`,
  effective expiry, state) and its result (the work-branch SHA holding
  it, or none); for each claim branch whose task is not open, the task
  ID, the tip SHA and whether the result file is on `ref`. The latest
  progress note is labelled `telemetry`.
- **Fails on**: `ref` not found. It refuses nothing on the merits.

### The smoke test's longer list

`scripts/smoke-test.sh` check 2 requires these twelve tool names.
Child C adds the first new name and child D the other five.

```text
service_identity  plan_read  plan_lease_acquire  plan_update
plan_confirm  plan_lease_release  session_register  task_next
task_claim  task_progress  task_complete  task_status
```

Child C also adds a fourth check (decision 18). The check registers an
`implementer` handle against the preprod endpoint and calls
`plan_lease_acquire` with it. It passes when the call is refused for
the role. The task tools read a live branch whose state the smoke test
cannot fix, so no check calls them.

## Verification criteria

The node is complete when each criterion below holds. A verifier who
did not do the work checks them against both repositories, the
deployed endpoint, the run journal and the sessions' records.

### Where the plan's eleven criteria went

| Plan criterion | Disposition |
|---|---|
| 1, a real node across two sessions | Node **I1** |
| 2, a race with one winner | Node **I2**; child **D2** unit-tests the refusal |
| 3, the lease under several sessions | Node **I3**; child **C4**, **C5** |
| 4, the outage run in git alone | Node **I4**; child **B11** |
| 5, agreement after the outage | Node **I5** |
| 6, expiry, `stale`, a new task ID | Node **I6**; child **B1**, **D4** |
| 7, what `task_next` never returns | Child **D1**; node **I7** observes it live |
| 8, SHAs named, no store answers | Node **I8**; child **D6** |
| 9, no repository write credential | Node **I9** |
| 10, the documents and contracts | Child **B1** to **B9**; node **I10** |
| 11, Backlogs and secrets | Node **I11**; each child's last criterion |

### The node's criteria

- **I1. The gate run.** A real node, owed at that moment (decision
  20), moves from its current stage through every stage the scope
  grant approves. An Orchestrator session offers each task as a task
  file. A second session, started by the Orchestrator, finds each task
  with `task_next`, claims it with `task_claim` and the push, reports
  progress with `task_progress`, delivers the result file and calls
  `task_complete`. The Orchestrator accepts each task. The owner's only
  action is the gate. The journal holds each task's `dispatched`,
  `result-received` and `accepted` events.
- **I2. The race.** Two sessions in one role claim one task at once.
  Exactly one claim push succeeds. The other is refused by GitHub, and
  `task_claim` then names the winner's `Session`. The run may use a
  scratch offering branch. It is recorded as a property test, not as
  owed work.
- **I3. The lease under several live sessions.** While the
  Orchestrator holds the lease through an `orchestrator` handle, a
  session holding an `implementer` handle is refused for its role, not
  for contention. A call with no handle behaves as before, through the
  smoke test's check 3.
- **I4. The outage run.** With the service unreachable to both
  sessions, one real owed task is offered, claimed, delivered and
  accepted through git alone. No session retries or waits on the
  service. The run is recorded against
  [R12 (service outage stops work)](../open-risks.md), with the date
  and how the service was made unreachable.
- **I5. Agreement after the outage.** The service's first
  `task_status` after I4 reports the claim and the result I4 made,
  with the SHAs git holds. The outcome is recorded against
  [R10 (the service becomes a second source of truth)](../open-risks.md).
- **I6. Expiry and `stale`.** A claim on a task offered with
  `Claim expiry: 10m` is left to expire. At the Orchestrator's next
  loop the task is journaled `stale`, a successor is offered under a
  new task ID with `Supersedes` and `Reading` set, and the old task
  file is gone. `task_complete` on the old task refuses, naming the
  successor. The Orchestrator does not accept a result for it.
- **I7. `task_next` excludes what it must.** Across I1 to I6, no
  `task_next` response named a task of another role, a claimed task or
  a task that was not open. The verifier checks each response against
  `task_status` at the same SHA.
- **I8. Ref discipline.** Every task tool's response in I1 to I6 names
  the SHAs it read. The service's store holds only handles, progress
  notes and the lease. No code path answers what was offered, claimed
  or delivered from it.
- **I9. No write credential.** The service holds no repository write
  credential. The GitHub App's permission is still `contents: read`,
  on majodali/project-orchestrator only. No service code path pushes.
- **I10. The process describes the pull run.** The documents and
  contracts carry the changes in
  [Process document changes, by location](#process-document-changes-by-location).
  `node plugin/scripts/form_check.ts` passes, and
  `node plugin/scripts/sync_agents.ts --check` reports the contracts in
  sync.
- **I11. Records and secrets.** Both repositories' Backlogs moved in
  the same commits as the work (W-003, documentation moves in the same
  commit as the work). Neither repository's history holds the bearer
  token, a GitHub App key or a deploy credential, checked over full
  history at the gate.
- **I12. One protocol in both modes.** The claim commit I1 made through
  `task_claim` and the one I4 made by hand have the same message
  fields in the same order. The two result files have the same heading
  list. A verifier checks both by a diff of the field and heading
  lines.
- **I13. Monotonic.** The service's existing test corpus passes
  unchanged after children C and D. The `test/` diff across the node
  adds lines and deletes none. No test in this repository was
  rewritten.
- **I14. Every platform fact is exercised.** Each fact in child A's
  finding names the later criterion that exercises it live, and that
  criterion is met. A fact confirmed only in documentation and never
  exercised is an unclosed item.
- **I15. The result file serves sequence mode.** For each task of I1,
  the Orchestrator's `result-received` note copies the status, checks,
  refs, flags, findings, what changed and asks from the result file,
  and writes no part "missing".
- **I16. Inside the timeout.** `task_next` and `task_status` answer
  within the `.mcp.json` per-server timeout of 30000 ms on a cold
  call, against the real offering branch of I1. The measurement is in
  the service's `docs/runbook.md`, and is recorded against
  [R11 (MCP surface constraints)](../open-risks.md).

### How verification runs

C1 profile: each child is self-verified by its Implementer against its
own criteria. A Reviewer pass is by owner request. The node's
`verifying` is attended (decision 21). The owner watches I1 at the
gate. The Orchestrator assembles every other criterion as a pointer to
a commit, a journal event, a tool response or a recorded measurement.

At the gate the owner reads one table, I1 to I16 with a verdict and a
pointer each, and watches the I1 run.

### Not verified here

The plan's exclusions stand: surfaces without a clone, several
projects, the question queue and topics, a service that answers badly,
and monitoring between deploys. Beyond them, a session's clock is
trusted for `Expires` and the committer time, and a wrong-role claim is
caught only at the Orchestrator's next loop. Both are in
[Risks](#risks).

## The breakdown

**The plan's four children stand**, in its order: child A first; then
child B and child C, independent of each other; then child D. Writing
the criteria exposed no missing child and no wrong cut. It exposed
three additions, each now in a child's criteria:

- child A gains fact 5, whether a session can delete a claim branch
  (A7), because decision 15 moves release off deletion and the
  Orchestrator's cleanup still deletes;
- child B amends the session-end rule (B4, B7);
- child C adds the smoke test's fourth check (C10), so the role
  refusal is exercised on real infrastructure at every deploy.

IDs are the Orchestrator's to issue. The next free are proposed here:
child A as P2-N017, B as P2-N018, C as P2-N019, D as P2-N020.

### Child A: the platform facts, verified

**Outcome.** A committed finding records five facts from real sessions,
each answered yes or no with its evidence, and names the later
criterion that exercises each.

**Writes**: majodali/project-orchestrator only:
`docs/findings/p2-n005-platform-facts.md` (new), `docs/backlog.md`,
and probe branches named `claim/probe-<n>`.

**Depends on**: nothing in this node. No other child starts until its
finding is committed (plan decision 2).

**Profile and tier**: execute by the Implementer, standard tier.
Self-verified. Facts on the local surface come from owner action O11.

- **A1.** The finding exists, with a Reader statement and a K-007
  status line under K-007 (plans are outcome-named, statused, and
  ruthlessly current). It records, per fact and per surface, the date, the
  surface, the commands run and their output verbatim.
- **A2.** Fact 1, cloud. A cloud session pushes `claim/probe-1` without
  force, from an empty commit built with `git commit-tree` on a commit
  of a scratch offering branch, while its surface's assigned branch is
  another. The finding names the assigned branch and quotes the push
  output.
- **A3.** Fact 2. A second non-forced push of a sibling commit to the
  same branch is refused, and the refusal is quoted. A push of a
  descendant commit, the renewal's shape, succeeds. Run from the cloud
  surface, and from the local surface by O11.
- **A4.** Fact 1, local, by O11: the same push as A2 from the owner's
  machine, with the output returned to the finding.
- **A5.** Fact 3. For each endpoint in [The tools](#the-tools)' read
  table, the finding quotes GitHub's REST documentation on the
  permission it needs, with the URL and the date read. It states
  whether `contents: read` suffices, and names the installation scope
  `docs/runbook.md` Step 2 records in the service repository.
- **A6.** Fact 4. For each surface, the finding names the mechanism by
  which one session starts or resumes another with a given message,
  and the mechanism by which it learns the other finished. Each comes
  with its source, observed or documented, or is stated "none". A
  missing mechanism is staged as an owner action numbered from O14.
- **A7.** Fact 5. Whether a session can delete a claim branch it
  pushed, on the cloud surface and, by O11, the local one. A refusal
  is quoted. Probe branches that remain are listed for deletion.
- **A8.** A false fact 1, 2 or 3 returns `needs-judgment`, naming the
  fact and proposing that P2-N005 return to `planned` with that reason.
  A false fact 4 or 5 does not return the node: its consequence is
  stated, and any owner action is staged.
- **A9.** Each fact names the later criterion that exercises it live:
  fact 1 and 2, I1 and I2; fact 3, D10 and I1; fact 4, I1; fact 5, the
  acceptance deletions of I1.
- **A10.** Nothing is written on any branch but the probe branches and
  the finding's branch. `node plugin/scripts/form_check.ts` passes,
  and the Backlog moved in the same commit as the finding.

### Child B: the loop in git alone

**Outcome.** The process documents and the six contracts describe the
pull run and its fallback, and two real sessions run one real task
through it with the service unreachable.

**Writes**: majodali/project-orchestrator only: `docs/process/dispatch.md`,
`docs/process/enlistment.md`, `docs/process/observability.md`,
`docs/process/roles.md`, the six contracts in `.claude/agents/`,
`plugin/agents/` by the generator only, and `docs/backlog.md`. The
demonstration's task file, claim branch and result file are written by
the Orchestrator and the pulling session, not by child B's task.

**Depends on**: child A. P3-N014's execute, which is accepted
(plan decision 12). Not on child C, and not on P3-N007 or P1-N016
(decision 19).

**Profile and tier**: execute by the Implementer, standard tier.
Self-verified, with B11 performed in two real sessions.

- **B1.** dispatch.md gains the section *Pull runs*. It holds the
  four ratified terms and the three of decision 22, each with an anchor
  (`def-task-file`, `def-claim-branch`, `def-result-file`,
  `def-session-handle`, `def-pull-run`, `def-offering-branch`,
  `def-claim-commit`). It holds every form of [The forms](#the-forms)
  as this specification states it, and the steps of
  [Dispatch in a pull run](#dispatch-in-a-pull-run) and
  [Acceptance in a pull run](#acceptance-in-a-pull-run).
- **B2.** *Gates (v1)*'s "A scope grant states" sentence gains the
  pull-run line.
- **B3.** Loop steps 2 and 3 each gain one sentence pointing at *Pull
  runs*. The handoff check gains the role-equality item for a pull run.
  Outside the new section, dispatch.md's diff adds those sentences and
  B4's, and changes nothing else.
- **B4.** *Failure containment*, stale tasks: in a pull run the
  trigger is the claim's end, and the consequence is unchanged.
- **B5.** *Trigger surfaces (v1)*: after offering, the Orchestrator
  starts or resumes a session in the task's role, within approved
  scope, by a mechanism child A recorded. The start message has the
  form [Dispatch in a pull run](#dispatch-in-a-pull-run) gives.
- **B6.** enlistment.md's fallback rule covers a pulling session: with
  the service unreachable it runs *Pull runs*' git steps, and does not
  retry or wait.
- **B7.** observability.md: the journal is flushed in the dispatch
  commit too; the session-end rule exempts a pull run's open tasks; the
  `dispatched` and `result-received` fields in a pull run are stated;
  no event kind is added.
- **B8.** roles.md, *Duties every role carries*, gains the pull duty.
  Its Orchestrator text names offering, starting a session, and
  acceptance in a pull run.
- **B9.** Each of the six contracts in `.claude/agents/` restates the
  pull duty in its role's terms. `node plugin/scripts/sync_agents.ts`
  regenerated `plugin/agents/`, and
  `node plugin/scripts/sync_agents.ts --check` reports them in sync.
- **B10.** Child B reads dispatch.md, roles.md and the contracts as they
  stand at its dispatch and at each commit. Its commits overwrite no
  edit another node made. P3-N007 (the type declared, the arguments
  written, the K-003 amendment drafted) is executing on the same files,
  and P1-N016 (process spec maintenance) plans to edit them.
- **B11.** Two real sessions, an Orchestrator and a session in the
  task's role, run one real owed task through *Pull runs* with the
  service unreachable to both. The task is offered as a task file,
  claimed by a claim commit, delivered as a result file, and accepted.
  The journal holds its `dispatched`, `result-received` and `accepted`
  events. Neither session retries or waits. The outcome is recorded
  against R12.
- **B12.** `node plugin/scripts/form_check.ts` passes. Each edited
  document under `docs/process/` passes the methodology style check
  with 0 violations. The Backlog moved in the same commits as the work.

### Child C: role-aware identity

**Outcome.** A session declares its role and receives a session
handle. The lease refuses a handle whose role is not `orchestrator`.
Every call without a handle behaves as before.

**Writes**: majodali/project-orchestrator-service only: `src/`,
`test/`, `scripts/smoke-test.sh`, `README.md`, `docs/runbook.md`,
`docs/backlog.md`. No `template.yaml` change (decision 17).

**Depends on**: child A. Independent of child B.

**Profile and tier**: execute by the Implementer, standard tier.
Self-verified. Deploys through node P2-N012's pipeline on merge.

- **C1.** `session_register` takes `role` from the role vocabulary,
  cited to roles.md in its source. Any other role is refused, naming the
  vocabulary and roles.md.
- **C2.** It returns the handle form of
  [The session handle](#the-session-handle), and stores the item at
  `session#<handle>` in the lease table the invoked alias selects, with
  a time-to-live. Expiry is twelve hours.
- **C3.** An unknown or expired handle is refused by every tool taking
  it, naming which. Expiry is checked in application logic, never left
  to the time-to-live.
- **C4.** `plan_lease_acquire` gains the optional `sessionHandle`. A
  non-`orchestrator` handle is refused, naming the role and roles.md.
  An `orchestrator` handle, and no handle, behave as today.
- **C5.** A test runs two live sessions against one backend. The
  Orchestrator holds the lease, and an `implementer` handle's acquire
  is refused for its role. The refusal text differs from the
  contention refusal.
- **C6.** The new item keys cannot equal `LEASE_KEY`.
  `test/dynamoExpressionSafety.test.ts` covers every new expression,
  by added cases.
- **C7.** Every existing test passes unchanged, and the `test/` diff
  adds only. `npm run build`, `npm run lint`, `npm test` and
  `sam validate --lint` pass.
- **C8.** `package.json`'s dependencies are unchanged
  ([R14 (dependency search is an attack surface)](../open-risks.md)).
- **C9.** `README.md` and `docs/runbook.md` document `session_register`,
  the handle, the lease refusal, and a by-hand call of each.
- **C10.** `scripts/smoke-test.sh` requires `session_register` in
  check 2 and gains check 4, as
  [The smoke test's longer list](#the-smoke-tests-longer-list) states.
  The merge's pipeline run is green, and `service_identity` on the
  production endpoint reports the merged commit.
- **C11.** The service Backlog moved in the same commits as the work.

### Child D: the task tools

**Outcome.** The five task tools serve the pull run from git, and the
deployed service lists twelve tools.

**Writes**: majodali/project-orchestrator-service only: `src/`,
`test/`, `scripts/smoke-test.sh`, `README.md`, `docs/runbook.md`,
`docs/backlog.md`.

**Depends on**: child B for the forms in dispatch.md; child C for the
handle; child A for fact 3.

**Profile and tier**: execute by the Implementer, standard tier.
Self-verified. Deploys through the pipeline on merge.

- **D1.** `task_next` behaves as [The tools](#the-tools) state. Tests
  over fixture git states cover each exclusion: another role; a live,
  delivered, expired, released and invalid claim; a removed task file; a superseded
  task.
- **D2.** `task_claim` returns the exact message and commands. Tests
  cover each refusal. One test simulates a race: after a claim exists,
  a second `task_claim` names the first claimant's `Session`.
- **D3.** `task_progress` stores the latest note and returns the
  effective expiry. It warns below a quarter of `Claim expiry`, with
  the renewal message and commands. It refuses a claim that is not live
  or whose role differs.
- **D4.** `task_complete` checks the result file's form at `sha` and
  that `sha` is on the claim's work branch. Tests cover each missing
  part, a misordered part, a bad status line, and a superseded task.
- **D5.** `task_status` returns open tasks and the claim branches of
  closed ones, with the latest progress note labelled `telemetry`.
- **D6.** Every task tool's response names `ref` and each SHA read. The
  store module offers only handle, progress-note and lease operations.
- **D7.** The form parsing cites dispatch.md's *Pull runs* section as
  its authority, in source and in `README.md`.
- **D8.** `scripts/smoke-test.sh` check 2 requires the twelve names.
  Its other checks are unchanged.
- **D9.** `task_next` and `task_status` are timed cold and warm against
  the deployed endpoint and the real offering branch. Both figures are
  in `docs/runbook.md`, beside the existing latency table.
- **D10.** GitHub is read only through the App, with no new permission.
  Each endpoint of the read table is exercised by a live call, recorded
  in the runbook.
- **D11.** Every existing test passes unchanged, and the `test/` diff
  adds only. `package.json`'s dependencies are unchanged. Build, lint,
  test and `sam validate --lint` pass.
- **D12.** `README.md`'s tool list and `docs/runbook.md` cover the five
  tools, with a by-hand call of each. The merge's pipeline run is
  green. The service Backlog moved in the same commits as the work.

### Edges stated at this breakdown

Written in the [Project model](../process/project-model.md#how-a-plan-writes-an-edge)'s
notation, with the proposed IDs.

- **P2-N017 creates** `p2-n005-platform-facts` (the finding,
  `docs/findings/p2-n005-platform-facts.md`).
- **P2-N017 modifies** `project-orchestrator-repo` and `backlog`.
- **P2-N018 creates** `pull-run-protocol` (the *Pull runs* section of
  `docs/process/dispatch.md`: the forms and the steps).
- **P2-N018 modifies** `dispatch-rules`, `enlistment-spec` (the
  enlistment process document, `docs/process/enlistment.md`),
  `observability-vocabulary`, `roles-spec` (the roles process
  document, `docs/process/roles.md`), `role-contracts`, `backlog` and
  `project-orchestrator-repo`.
- **P2-N018 uses** `p2-n005-platform-facts`, `dispatch-rules` after
  P3-N014, and `role-contracts` after P3-N014.
- **P2-N019 creates** `session-handle` (`session_register`, the handle
  store and the lease's role check, in the service's `src/`).
- **P2-N019 modifies** `project-orchestrator-service-repo` (the
  repository majodali/project-orchestrator-service).
- **P2-N019 uses** `p2-n005-platform-facts` and `roles-spec`.
- **P2-N020 creates** `task-tools` (the five task tools, in the
  service's `src/`).
- **P2-N020 modifies** `project-orchestrator-service-repo`.
- **P2-N020 uses** `pull-run-protocol`, `session-handle` and
  `p2-n005-platform-facts`.

Every dependency these edges derive points to an earlier child: B, C
and D on A; D on B and C. No cycle.

### Owner actions

Numbered from O11, after node P2-N012's O7 to O10.

- **O11** (child A): run the probe commands A3, A4 and A7 name, from a
  session on the owner's local surface, and return the output. A
  dispatched session cannot run on that surface.
- **O12** (child C): review and merge child C's pull request on the
  service repository, which deploys it through the pipeline. RU-009
  (work reaches `main` by pull request) makes this the owner's; it is
  numbered so the gate's checklist is complete.
- **O13** (child D): the same for child D's pull request.

Child A numbers any further owner action it finds from O14. None is
expected for the gate run: the gate is the owner's only action there.

### What returns the node to `plan`

A false fact 1, 2 or 3 in child A's finding (A8). Each changes the
claim protocol: a claim branch a session cannot push, a race GitHub
does not refuse, or claim state the service cannot read. Nothing else
in this breakdown returns the node.

## Repository reach

Under [RU-016](../rulings.md) (the Planner declares the repository
access a node needs), both repositories are in this project's approved
scope. The plan's *Dependencies* and *Repository reach* sections are
the declaration. Per child:

| Child | Repository | Access |
|---|---|---|
| A | majodali/project-orchestrator | write: the finding, `docs/backlog.md`, probe branches |
| A | majodali/project-orchestrator-service | read: `docs/runbook.md` |
| B | majodali/project-orchestrator | write: the four process documents, the six contracts, `plugin/agents/` by generator, `docs/backlog.md` |
| C | majodali/project-orchestrator-service | write: `src/`, `test/`, `scripts/smoke-test.sh`, `README.md`, `docs/runbook.md`, `docs/backlog.md` |
| C | majodali/project-orchestrator | read: `docs/process/roles.md` |
| D | majodali/project-orchestrator-service | write: as child C |
| D | majodali/project-orchestrator | read: `docs/process/dispatch.md`; read through the App at run time |

The Orchestrator writes the Plan register, the Cost log, the journal,
the task files and the acceptance merges.

## Risks

**R10 (the service becomes a second source of truth).** The service
holds handles, progress notes and the lease, all telemetry. Offers,
claims and results live in git, so there is nothing to diverge. I5
exercises it after a real outage, and I8 checks that no code path
answers from the store.

**R11 (MCP surface constraints).** `task_status` reads one file per
open task and one commit per claim branch, so its cost grows with
the open set. Decision 16 bounds that set to open tasks. D9 and I16
measure it against the 30000 ms timeout. No tool uses elicitation or
holds a call open.

**R12 (service outage stops work).** The pull run's git steps are the
mitigation, and they are the same protocol. B11 and I4 run a real task
through them. The start message names the git path, so a session does
not depend on finding enlistment.md.

**R17 (the harness's guidance pushes against the fallback rule).** A
pulling session meets a failed connection mid-protocol, after it has
started relying on the tools. The start message, the contracts (B9)
and the fallback rule (B6) state the git path where it applies.

**New risks this specification finds.** Each is proposed for the
Backlog, not written.

- **Branch deletion may be refused.** The 403 of 2026-09-16 is
  recorded and untested. Decision 15 keeps release off deletion.
  Claim branches and work branches may still accumulate after
  acceptance. Child A's fact 5 measures it, and P1-N016's branch rule
  disposes of what remains.
- **Several nodes edit dispatch.md and the contracts.** P3-N007 is
  executing on them, and P1-N016 plans to. B10 guards child B's
  commits. The general case is the Backlog row on parallel dispatch and
  the single Backlog.
- **Claim time rests on session clocks.** `Expires` and the committer
  time are both written by the claimant. A wrong clock lengthens or
  shortens a claim, bounded by `Claim expiry`. The protocol guards
  against mistakes, not adversaries, as the declared role does.
- **A wrong-role claim blocks its task until the next loop.** Git
  accepts any claim push. The Orchestrator finds the claim invalid and
  re-offers.

## Monotonicity

No planned non-monotonicity. `plan_lease_acquire` gains an optional
argument. `scripts/smoke-test.sh` gains names and one check; it is a
deploy script, not a functional test. The existing test
`test/planWriteTools.test.ts` checks the tool list with
`arrayContaining`, so new tools leave it passing unchanged. No existing
test is rewritten (C7, D11, I13). Should one need rewriting, it returns
to the owner under W-002 (existing tests are signals, not obstacles).

In this repository the pull run is additive. The subagent path keeps
its text, and B3 bounds the changes outside the new section.

## Register lines proposed with this specification

On acceptance of this task, P2-N005 moves `planned` → `specified`,
gated on the owner's review of this specification. At that gate the
four children are entered `identified` with their Backlog entries, and
P2-N005 moves `specified` → `broken-down` in the same act (RU-020). The
IDs below are proposed, the next free; the Orchestrator issues them.

```markdown
  - P2-N005 [broken-down] The task-pull loop (chunk 4) — independent of P2-N003 and P2-N004 (RU-018; owner, 2026-10-29) — plan: plans/p2-n005-task-pull-loop.md · spec: specs/p2-n005-task-pull-loop.md
    - P2-N017 [identified] The platform facts, verified — spec: specs/p2-n005-task-pull-loop.md
    - P2-N018 [identified] The loop in git alone — depends on P2-N017 — spec: specs/p2-n005-task-pull-loop.md
    - P2-N019 [identified] Role-aware identity — depends on P2-N017; independent of P2-N018 (RU-018) — spec: specs/p2-n005-task-pull-loop.md
    - P2-N020 [identified] The task tools — depends on P2-N018 and P2-N019 — spec: specs/p2-n005-task-pull-loop.md
```

## Decisions for the gate

Numbering continues the plan's sequence, so one go-ahead adopts one
list. The plan carries **1 to 13**, adopted 2026-10-30. This document
carries **14 to 22**. The owner's go-ahead adopts every default not
overridden by number.

**Precedents checked against the [Ruling register](../rulings.md).**
Exact matches decide silently: RU-016 (the Planner declares the
repository access a node needs) for the reach; RU-008
(TypeScript/Node for services) and RU-011 (TypeScript/Node for
tooling) for the stack; RU-009 and
RU-010 (work reaches `main` by pull request) for O12, O13 and the
offering branch's path to `main`; RU-020 (no separate `break down`
task after a specification at breakdown depth) for the absent task. Near matches argue defaults: RU-018 (a child is not queued
behind a sibling it does not depend on) for decision 19. The P2-N002
specification's decisions 10 and 11, and the P2-N012 specification's
decision 8, are node-scope precedents for decisions 20 and 21. No
ruling reaches decisions 14 to 18 or 22.

14. **The exact forms.** Default: as recorded in
    [The forms](#the-forms): the task file's nine header fields, the
    claim commit's message and its three kinds, the result file's
    headings, UTC timestamps, `Claim expiry` from `10m` to `24h`, the
    role slugs, and no new journal event kind. A claim reaches the
    journal through the `result-received` event's `session` field.
    Rationale: each form is the least a tool and a session in git
    alone can both parse, and a `claimed` event can wait for the web
    view that would read it. Affected locations: none.
15. **Voluntary release is a release commit.** Default: a claimant that
    gives up pushes a `Release` commit to its claim branch. At its next
    loop the Orchestrator journals the task `stale` and re-offers it
    under a new task ID, as for an expired claim. Branch deletion is
    cleanup only. Alternative: release by deleting the claim branch, as
    decision 5's text read. Rationale: a deletion was refused with
    HTTP 403 on 2026-09-16, cause untested; a commit is the push fact 1
    already verifies; and a new task ID keeps decision 5's reason that
    no session takes over another's claim branch, so the ratified
    definition of claim branch holds. Affected locations: the plan of
    P2-N005, which is `active`.
    - *Approach*, *Progress, completion, and how a claim ends*.
      Drafted text, replacing "A claimant that gives up deletes its
      claim branch, and the task is claimable again.": "A claimant
      that gives up pushes a release commit to its claim branch. At its
      next loop the Orchestrator re-offers the task under a new task
      ID, as for an expired claim
      ([specification](../specs/p2-n005-task-pull-loop.md),
      decision 15)."
    - *Decisions for the gate*, decision 5. Drafted text, replacing "at
      voluntary release by deleting the claim branch,": "at voluntary
      release by a release commit on the claim branch (corrected at
      the specification gate by the
      [specification](../specs/p2-n005-task-pull-loop.md)'s decision
      15; the text read "by deleting the claim branch"),".
16. **A task file leaves the offering branch when its task closes.**
    Default: the Orchestrator removes it in the acceptance commit, the
    re-offer commit or a withdrawal commit. The open tasks are the
    files in `orchestration/tasks/`. Alternative: task files stay, and
    closure is read from result files and `Supersedes` lines.
    Rationale: one directory listing answers "what is open" in git and
    in the service alike, and the reads stay bounded (R11); git history
    and the `dispatched` event keep the record. Affected locations:
    none.
17. **Where handles and progress notes live, and the handle's
    expiry.** Default: items in the existing lease table of the invoked
    alias, keyed `session#` and `progress#`, with a time-to-live;
    handles expire after twelve hours and are not renewed. Alternative:
    a new table, which adds template resources and grants. Rationale:
    no template change and no owner action; the alias-aware selection
    of node P2-N015 already keeps preprod handles off production; twelve
    hours outlasts a working session and several two-hour claims.
    Affected locations: none.
18. **The smoke test's scope.** Default: check 2 requires the twelve
    names, and a fourth check proves an `implementer` handle is refused
    the lease on preprod. No check calls a task tool. Rationale: the
    role refusal is the one new behaviour a deploy can break without a
    test noticing, and the task tools read a live branch the smoke test
    cannot fix. Affected locations: none.
19. **Where child B's text lives, and its order against P3-N007 and
    P1-N016.** Default: in a new *Pull runs* section of dispatch.md,
    with one pointer sentence in each paragraph it touches. Child B
    does not wait on P3-N007 or P1-N016, and B10 bars it from
    overwriting their edits. Rationale: a section of its own keeps the
    three nodes' edits apart; RU-018 releases what has no real
    dependency, and none of the three uses another's output. Affected
    locations: none.
20. **The gate run's node and surfaces.** Default: the node of I1 is
    the first actionable pair in register order under the pull run's
    scope grant at that time, with at least one `execute` task. Both
    sessions run on the cloud surface. The local surface is covered by
    child A's facts. Rationale: a transition genuinely due keeps the run
    honest (P2-N002 specification, decision 10), and the cloud surface
    is the one the owner works from (decision 11 there). Affected
    locations: none.
21. **Who verifies the node.** Default: attended. The owner watches I1
    at the gate, and the Orchestrator assembles I2 to I16. No Reviewer
    is dispatched. Rationale: I1 is a live run on the owner's surfaces,
    and the C1 profile reviews by exception (P2-N012 specification,
    decision 8). Affected locations: none.
22. **Ratify or strike three terms**: pull run, offering branch and
    claim commit. Default: ratify all three. Rationale: the protocol
    and the tools refer to each throughout, and the plan already used
    "pull run" undefined. Affected locations: none.

## References

- [p2-n005-task-pull-loop](../plans/p2-n005-task-pull-loop.md): this
  node's plan, decisions 1 to 13, its gate record and its four
  ratified terms
- [orchestration-service](../plans/orchestration-service.md): the
  parent plan, chunk 4 and the five standing constraints
- [p2-n002-service-skeleton](p2-n002-service-skeleton.md): the write
  model, the lease, and role identity deferred to this node
- [p2-n012-deploy-from-ci-on-merge](p2-n012-deploy-from-ci-on-merge.md):
  the pipeline, the smoke test and owner actions O7 to O10
- [dispatch.md](../process/dispatch.md),
  [enlistment.md](../process/enlistment.md),
  [observability.md](../process/observability.md),
  [roles.md](../process/roles.md),
  [plan-model.md](../process/plan-model.md),
  [profiles.md](../process/profiles.md),
  [project-model.md](../process/project-model.md)
- [Ruling register](../rulings.md): RU-008 to RU-011, RU-016, RU-018,
  RU-020
- [Risk register](../open-risks.md): R10, R11, R12, R14, R17
- The service repository,
  [majodali/project-orchestrator-service](https://github.com/majodali/project-orchestrator-service),
  at `58e6819`: `src/planWriteTools.ts`, `src/httpApp.ts`,
  `src/planRegister/`, `template.yaml`, `scripts/smoke-test.sh`,
  `docs/runbook.md`
