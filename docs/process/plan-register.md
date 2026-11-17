# Plan register

Reader: someone who followed the "type spec" link from
[docs/plan-register.md](../plan-register.md).

The Plan register is a rendering of the state file,
`orchestration/state.json`: one line per node, with its stage. The
orchestration service writes it with every state commit, together
with [docs/plan.md](../plan.md) and the Backlog,
[docs/backlog.md](../backlog.md), and `plan-state check` fails when
any of the three differs from what the renderer produces. Nobody
edits them by hand.

What a node may hold, and the rules the check enforces, are in
[the state model](state-model.md). The definition of the hand-written
register that the dispatch loop used is archived:
[plan-register.md](../archive/process/plan-register.md).

This page exists because the rendered Plan register links it.
