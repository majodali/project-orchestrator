# The state file: data model and invariants

Reader: a session or a person who needs to know what
`orchestration/state.json` may hold. The schema is code,
`src/model/schema.ts` in majodali/project-orchestrator-service, and
`plan-state check` enforces the invariants below on every write and
in CI. Moved here from the rebuild plan on 2026-11-14 (P4-N024,
Pruned document set). A decision or a milestone cited by number is the
rebuild plan's, recorded in
[the rebuild record](../archive/plans/rebuild-record.md).

## The data model

Version 0. One file, `orchestration/state.json`, in the managed
repository. The schema is code in the service repository and is the
type's definition for Classification purposes.

```jsonc
{
  "schema": 0,
  "project": "majodali/project-orchestrator",
  "nodes": [
    {
      "id": "P2-N021",
      "title": "The web view's first version",
      "outcome": "A signed-in owner sees the plan tree and drills to node and task, read at one commit.",
      "stage": "done",
      "parent": "P2-N003",
      "after": [],
      "hold": null,
      "docs": { "plan": null, "spec": "docs/archive/specs/p2-n003-owner-questions-and-plan-view.md" },
      "done": "2026-11-03",
      "note": null
    }
  ],
  "tasks": [
    {
      "id": "T094",
      "node": "P2-N021",
      "step": "execute",
      "status": "closed",
      "role": "implementer",
      "model": "claude-sonnet-5",
      "tokens": { "in": null, "out": null },
      "opened": "2026-10-30T22:00:00Z",
      "closed": "2026-11-01T00:12:46Z",
      "ref": null,
      "pr": "majodali/project-orchestrator-service#18",
      "summary": "The tree page behind sign-in, read at one SHA.",
      "notes": null
    }
  ],
  "decisions": [
    {
      "id": "D001",
      "node": "P3-N008",
      "question": "Does docs/plan.md stay the hand rendering until the Backlog becomes a rendering?",
      "options": ["yes", "retire it now"],
      "default": "yes",
      "chosen": null,
      "decided": null,
      "rationale": "The renderings omit outcomes, which are most of the document.",
      "standing": false,
      "source": null
    }
  ]
}
```

Field rules:

- `stage` is one of `identified`, `planned`, `specified`,
  `broken-down`, `executing`, `verifying`, `done`, `parked`. `parked`
  is new: the node is kept and not planned.
- `hold` is null or `{ "kind": "gated" | "blocked", "reason": "..." }`.
- `after` lists node identifiers this node waits for. Sibling order
  no longer implies dependency.
- `start` is `auto` (the default: the loop takes the node when its
  dependencies are done) or `approve` (a ready node waits for the
  owner's go-ahead and counts as waiting on the owner). Decision 11.
- `outcome` is one sentence, at most 40 words. Required from `planned`
  on.
- `step` is `plan`, `specify`, `break down`, `execute` or `verify`.
- `kind` is `work` (the default) or `check`: a check node is the
  verification of its parent, hidden unless it fails or is selected.
- A task's `base` is the commit it was opened on; `task_close` reads
  the node there to tell a changed scope.
- A task's `ref` is the commit its result landed at. For an `execute`
  task closed since 2026-11-17 the service sets it to the pull
  request's head at the close, and a merge refuses a head that has
  moved since.
- A task's `tokens` may carry `cacheRead` and `cacheWrite`, and the
  task a `costSource`: `transcript`, `headless` or `reported`.
- `highWater` maps an identifier prefix (`P2`, `T`, `D`) to the
  highest number removed under it. Absent until something is removed.
- A decision with `standing: true` is a precedent (today's ruling). A
  closed decision is never edited; a new decision supersedes it and
  names it in `rationale`.
- Resources, verification evidence and multi-project state are later
  schema versions, added when the view or the loop needs them.

## Changing and moving a node's documents

A node's `docs.plan` and `docs.spec` are changed with `node_update`
(P4-N031, 2026-11-17), under an open task or the owner's words.

- `docs` sets a path now, or null. The service refuses a path that
  is not a file on the default branch.
- `docsOnMerge` is for moving a linked document, and needs an open
  execute task. The order:
  1. The session calls `node_update` on the node that links the
     document, with `docsOnMerge` naming the new path. The service
     clears the node's path at once and records the new one on the
     task, as the task's `docsOnMerge`.
  2. The task's pull request moves the file. Its check passes,
     because the state file names neither path.
  3. When the task's node is done, the service checks that a pull
     request of the node brings a file to the new path, merges, and
     sets the path in the commit that follows.
- A done decision whose pull requests bring no file to a recorded
  path is refused: nothing is merged and nothing is committed.
- Invariant 8 holds on the default branch and on the pull request at
  every commit of that order. Moving a linked file any other way
  breaks it.
- `docsOnMerge` is not for the task's own node: a change to its
  documents is a changed scope.

## The invariants

Checked by `check`, in the service and in CI. Each names the rule it
serves when one exists.

1. The file validates against the schema. Identifiers are unique and
   never reused.
2. Every `parent` and every `after` entry names an existing node.
   Dependencies form no cycle.
3. A node with children is `broken-down`, `verifying`, `done` or
   `parked`. A child is never past its parent's reach: no `executing`
   child under an `identified` parent.
4. A node from `planned` on has a title and an outcome within the
   length bound. A title is at least two words and is not an
   identifier, a child letter or a chunk number; a title in the
   "<noun phrase>, <verb>" idiom is a warning. Whether it names the
   thing is judged at review and at the orientation test.
5. A node not `done` and not `parked` is exactly one of: paused (a
   node above it is held or parked), gated, blocked, in flight (an
   open task), in progress (its children or its check node carry the
   work), waiting (some dependency not done), actionable
   (dependencies done, no hold, no open task).
6. A task names an existing node. A node has at most one open task. A
   closed task has a closing time and a pull request or a stated
   reason for none.
7. An open decision has a default. A closed decision has a choice and
   a date. A decision names an existing node or `null` for a project
   decision.
8. Every path under `docs` in the file exists in the repository.
9. The rendered Markdown files equal `render`'s output.
10. Siblings stand after the siblings they depend on, a dependency
    counting at the sibling level when any node in one subtree waits
    for any node in another's. `render --write` puts the file in this
    order; the order itself carries no meaning (decision 12).
11. A check node has a parent, and a node at `verifying` has exactly
    one check node not done.
