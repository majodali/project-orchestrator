# Orchestrator session: record of trials (P2-N027)

Reader: the sessions that build and verify the children of P2-N027,
and the owner. The reader has read
[the plan](orchestrator-session.md) and
[the specification](../specs/orchestrator-session.md). Each trial a
criterion asks for is recorded here, under its node.

## P2-N030, criterion 6: one session for each role (task T157)

Run on 2026-11-17 by session `session_015Vm2MuxVv4rKfToUpLjGaf`, the
session of task T157.

**Result.** `create_session` accepts `claude-opus-5` and
`claude-sonnet-5`. Each session ran on the model its role's agent
file names. `list_sessions` in another session returned all three
with their titles. No agent file needed a correction.

### Method

The `start` actions came from `plugin/scripts/orchestrate_next.ts` at
commit 83eb9fa, with this repository's agent files and
`orchestration/orchestrator.json`, an empty snapshot, `--self` the
session above, and a made-up state file. The state file held three
offered nodes in a line the plan does not have, P9: P9-N001
`identified`, P9-N002 `specified`, and P9-N003 `verifying` with its
check node P9-N004. A real offered node was not used, because a
session started for it would have claimed its task, and the brief of
T157 authorises P2-N030 only.

The script printed three actions: `start:P9-N001:plan:new`,
`start:P9-N002:execute:new` and `start:P9-N004:verify:new`. Each
session was started with `create_session` from one action: its
`model`, its `title`, and its `repository` as `source_url`. The
prompt was the action's `brief` below a line that said the node is
not in the plan and that the session must open no task, call
`list_sessions` with limit 20, and say which of the three titles it
returned.

### What `get_session` gave

Read by the starting session after each session's turn ended.

| Role | Title at start | Session | Configured | Current | Last served |
|---|---|---|---|---|---|
| planner | `P9-N001 plan` | `session_015Vm2Mro4JnnT5bYze5spy2` | `claude-opus-5` | `claude-opus-5` | `claude-opus-5` |
| implementer | `P9-N002 execute` | `session_015Vm2MsR6Efn5x46vqV525S` | `claude-sonnet-5` | `claude-sonnet-5` | `claude-sonnet-5` |
| reviewer | `P9-N004 verify` | `session_015Vm2Muc9YwgDW4oKeLqmye` | `claude-opus-5` | `claude-opus-5` | `claude-opus-5` |

Configured is `configured_model`, current is `session_context.model`,
last served is `external_metadata.last_served_model`. No model
carried a bracketed suffix.

### What `list_sessions` gave in a second session

Each of the three sessions called `list_sessions` with limit 20. Each
reported all three titles, exactly as given, with the identifiers
above. So a session returns sessions that another session started,
with their titles: the open point of the specification's S8 holds,
and S2 does not have to fail closed for it.

### What else the trial showed

- `list_sessions` gives no model. The snapshot's `model` needs one
  `get_session` for each session.
- `list_sessions` with `children: true` returned exactly the three
  sessions the calling session started. An orchestrator session that
  replaces another is not their parent, so it cannot rely on it.
- The status bucket arrives as `SESSION_STATUS_BUCKET_WORKING` and
  `SESSION_STATUS_BUCKET_COMPLETED`. The script reads both forms,
  `working` and the long one.
- `created_at` carries microseconds. The script reads it.
- A snapshot of the three sessions, given to the script with the same
  state file, printed no action five minutes after the start, and
  three `no-claim` reports an hour after it. No session was started
  twice.

### After the trial

The three sessions opened no task and wrote nothing. Their titles
were changed with `set_session_title` to begin `Trial for P2-N030
criterion 6`, so that no later snapshot reads them as sessions of the
orchestrator. They are not archived: that is the owner's to do.
