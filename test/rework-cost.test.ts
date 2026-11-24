import { describe, expect, it } from "vitest";

import type {
  Decision,
  Node,
  Task,
} from "project-orchestrator-service/dist/model/schema.js";

import type { JournalEvent } from "../plugin/scripts/lib/cost-log-and-journal.ts";
import {
  findReworkRounds,
  isMergeRequest,
  ownerSummary,
  projectTotals,
  readDecisions,
  roundCosts,
  sumTokens,
} from "../plugin/scripts/lib/rework-cost.ts";

/**
 * The rework-cost report's derivations (P2-N029, criterion 13): a
 * fixture covering a round with a rework, a round with none, a round
 * whose rework spans two tasks, a node with two rounds, a decision
 * with an answer line and a raising task, one with no answer line, a
 * merge request, and a decision answered against its default.
 */

function node(id: string, kind: "work" | "check", parent: string | null): Node {
  return {
    id,
    kind,
    title: `Node ${id}`,
    outcome: "an outcome",
    stage: "executing",
    parent,
    repository: null,
    after: [],
    hold: null,
    start: "auto",
    docs: { plan: null, spec: null },
    done: null,
    note: null,
  };
}

function task(opts: {
  id: string;
  node: string;
  step: Task["step"];
  status: Task["status"];
  opened: string;
  closed: string | null;
  tokens?: Partial<Task["tokens"]>;
}): Task {
  return {
    id: opts.id,
    node: opts.node,
    step: opts.step,
    status: opts.status,
    role: null,
    model: null,
    tokens: { in: null, out: null, ...opts.tokens },
    opened: opts.opened,
    closed: opts.closed,
    base: null,
    ref: null,
    pr: null,
    summary: null,
    notes: null,
  };
}

function decision(opts: {
  id: string;
  node: string | null;
  question: string;
  default: string | null;
  chosen: string | null;
}): Decision {
  return {
    id: opts.id,
    node: opts.node,
    question: opts.question,
    options: [],
    default: opts.default,
    chosen: opts.chosen,
    decided: null,
    rationale: null,
    standing: false,
    source: null,
  };
}

function event(ts: string, node: string | null, note: string): JournalEvent {
  return {
    ts,
    event: "state-written",
    node,
    note,
    session: "the owner, in the view",
  };
}

// ---- Fixture: rework rounds ------------------------------------------------

const W1 = "P9-N001"; // two rounds: one with rework, one with none
const C1 = "P9-N002";
const W2 = "P9-N010"; // one round, rework spans two tasks
const C2 = "P9-N011";
const W3 = "P9-N030"; // a successful verification, no round at all
const C3 = "P9-N031";
const W4 = "P9-N040"; // a verification still open as a question, not resolved
const C4 = "P9-N041";
const DECISION_NODE = "P9-N020";

const nodes: Node[] = [
  node(W1, "work", null),
  node(C1, "check", W1),
  node(W2, "work", null),
  node(C2, "check", W2),
  node(W3, "work", null),
  node(C3, "check", W3),
  node(W4, "work", null),
  node(C4, "check", W4),
  node(DECISION_NODE, "work", null),
];

const T1 = task({
  id: "T1",
  node: W1,
  step: "execute",
  status: "closed",
  opened: "2026-01-01T00:00:00Z",
  closed: "2026-01-01T01:00:00Z",
  // unmeasured: tokens.in/out left null
});
const T2 = task({
  id: "T2",
  node: C1,
  step: "verify",
  status: "blocked",
  opened: "2026-01-01T02:00:00Z",
  closed: "2026-01-01T03:00:00Z",
  tokens: { in: 10, out: 20, cacheRead: 1, cacheWrite: 2 },
});
const T3 = task({
  id: "T3",
  node: W1,
  step: "execute",
  status: "closed",
  opened: "2026-01-01T04:00:00Z",
  closed: "2026-01-01T05:00:00Z",
  tokens: { in: 5, out: 5 },
});
const T4 = task({
  id: "T4",
  node: C1,
  step: "verify",
  status: "blocked",
  opened: "2026-01-01T06:00:00Z",
  closed: "2026-01-01T07:00:00Z",
  tokens: { in: 7, out: 7, cacheRead: 0, cacheWrite: 0 },
});
const T5 = task({
  id: "T5",
  node: C1,
  step: "verify",
  status: "closed",
  opened: "2026-01-01T08:00:00Z",
  closed: "2026-01-01T09:00:00Z",
  tokens: { in: 3, out: 3 },
});

const T10 = task({
  id: "T10",
  node: W2,
  step: "execute",
  status: "closed",
  opened: "2026-01-02T00:00:00Z",
  closed: "2026-01-02T01:00:00Z",
  tokens: { in: 1, out: 1 },
});
const T11 = task({
  id: "T11",
  node: C2,
  step: "verify",
  status: "blocked",
  opened: "2026-01-02T02:00:00Z",
  closed: "2026-01-02T03:00:00Z",
  tokens: { in: 2, out: 2 },
});
const T12 = task({
  id: "T12",
  node: W2,
  step: "execute",
  status: "needs-judgment",
  opened: "2026-01-02T04:00:00Z",
  closed: "2026-01-02T05:00:00Z",
  tokens: { in: 3, out: 3 },
});
const T13 = task({
  id: "T13",
  node: W2,
  step: "execute",
  status: "closed",
  opened: "2026-01-02T06:00:00Z",
  closed: "2026-01-02T07:00:00Z",
  tokens: { in: 4, out: 4 },
});
const T14 = task({
  id: "T14",
  node: C2,
  step: "verify",
  status: "closed",
  opened: "2026-01-02T08:00:00Z",
  closed: "2026-01-02T09:00:00Z",
  tokens: { in: 5, out: 5 },
});

const T30 = task({
  id: "T30",
  node: W3,
  step: "execute",
  status: "closed",
  opened: "2026-01-03T00:00:00Z",
  closed: "2026-01-03T01:00:00Z",
  tokens: { in: 1, out: 1 },
});
const T31 = task({
  id: "T31",
  node: C3,
  step: "verify",
  status: "closed",
  opened: "2026-01-03T02:00:00Z",
  closed: "2026-01-03T03:00:00Z",
  tokens: { in: 1, out: 1 },
});

const T40 = task({
  id: "T40",
  node: C4,
  step: "verify",
  status: "needs-judgment",
  opened: "2026-01-04T00:00:00Z",
  closed: "2026-01-04T01:00:00Z",
  tokens: { in: 1, out: 1 },
});

const T20 = task({
  id: "T20",
  node: DECISION_NODE,
  step: "execute",
  status: "closed",
  opened: "2026-01-31T00:00:00Z",
  closed: "2026-02-01T00:00:00Z",
  tokens: { in: 100, out: 100 },
});

const tasks: Task[] = [
  T1,
  T2,
  T3,
  T4,
  T5,
  T10,
  T11,
  T12,
  T13,
  T14,
  T30,
  T31,
  T40,
  T20,
];

describe("findReworkRounds", () => {
  const rounds = findReworkRounds(nodes, tasks);

  it("finds one round per failure, including a node with two rounds", () => {
    const onW1 = rounds.filter((r) => r.workNode === W1);
    expect(onW1).toHaveLength(2);
  });

  it("reports a round with no rework task as one, with an empty list", () => {
    const roundB = findReworkRounds(nodes, tasks).find(
      (r) => r.workNode === W1 && r.finder.id === "T4",
    );
    expect(roundB).toBeDefined();
    expect(roundB!.reworkTasks).toEqual([]);
    expect(roundB!.reVerification.id).toBe("T5");
  });

  it("sums a round whose rework spans two tasks", () => {
    const roundA = rounds.find(
      (r) => r.workNode === W1 && r.finder.id === "T2",
    );
    expect(roundA!.reworkTasks.map((t) => t.id)).toEqual(["T3"]);
    expect(roundA!.reVerification.id).toBe("T4");

    const w2Round = rounds.find((r) => r.workNode === W2);
    expect(w2Round!.reworkTasks.map((t) => t.id)).toEqual(["T12", "T13"]);
    expect(w2Round!.reVerification.id).toBe("T14");
  });

  it("gives both rounds of a node the same first pass", () => {
    const onW1 = rounds.filter((r) => r.workNode === W1);
    for (const r of onW1) expect(r.firstPass.map((t) => t.id)).toEqual(["T1"]);
  });

  it("reports no round for a node whose verification never failed", () => {
    expect(rounds.some((r) => r.workNode === W3)).toBe(false);
  });

  it("leaves out a round still waiting for its re-verification", () => {
    const onlyFinder = findReworkRounds(nodes, [
      task({
        id: "TX",
        node: C3,
        step: "verify",
        status: "blocked",
        opened: "2026-01-05T00:00:00Z",
        closed: "2026-01-05T01:00:00Z",
      }),
    ]);
    expect(onlyFinder).toHaveLength(0);
  });
});

describe("roundCosts", () => {
  const rounds = findReworkRounds(nodes, tasks);

  it("gives the rework cost, the failed verification's cost and the first pass's cost, by token type", () => {
    const roundA = rounds.find(
      (r) => r.workNode === W1 && r.finder.id === "T2",
    )!;
    const costsA = roundCosts(roundA);
    expect(costsA.reworkCost.tokens).toEqual({
      in: 12,
      out: 12,
      cacheRead: 0,
      cacheWrite: 0,
    });
    expect(costsA.failedVerificationCost.tokens).toEqual({
      in: 10,
      out: 20,
      cacheRead: 1,
      cacheWrite: 2,
    });
    // T1 is unmeasured: the first pass's cost is zero, and T1 is named
    // as unmeasured rather than counted as a zero-cost task.
    expect(costsA.firstPassCost.tokens).toEqual({
      in: 0,
      out: 0,
      cacheRead: 0,
      cacheWrite: 0,
    });
    expect(costsA.firstPassCost.unmeasuredTasks).toEqual(["T1"]);
  });

  it("counts a round with no rework task's rework cost as its re-verification alone", () => {
    const roundB = rounds.find(
      (r) => r.workNode === W1 && r.finder.id === "T4",
    )!;
    const costsB = roundCosts(roundB);
    expect(costsB.reworkCost.tokens).toEqual({
      in: 3,
      out: 3,
      cacheRead: 0,
      cacheWrite: 0,
    });
  });
});

describe("projectTotals", () => {
  const rounds = findReworkRounds(nodes, tasks);
  const totals = projectTotals(tasks, rounds);

  it("counts only resolved verifications, and how many failed", () => {
    // Resolved (closed or blocked): T2, T4, T5, T11, T14, T31. T40 is
    // needs-judgment, a question rather than a result, and is left out.
    expect(totals.verifications).toBe(6);
    expect(totals.failedVerifications).toBe(3);
  });

  it("sums execute cost project-wide, naming the unmeasured task", () => {
    expect(totals.executeCost.tokens.in).toBe(114);
    expect(totals.executeCost.tokens.out).toBe(114);
    expect(totals.executeCost.unmeasuredTasks).toEqual(["T1"]);
  });

  it("sums rework cost across every round", () => {
    expect(totals.reworkCost.tokens.in).toBe(27);
    expect(totals.reworkCost.tokens.out).toBe(27);
  });

  it("gives rework cost as a share of execute cost, by token type, with no combined figure", () => {
    expect(totals.shareByType.in).toBeCloseTo(27 / 114, 10);
    expect(totals.shareByType.out).toBeCloseTo(27 / 114, 10);
    // Execute cost carries no cache tokens at all here: no ratio.
    expect(totals.shareByType.cacheRead).toBeNull();
    expect(totals.shareByType.cacheWrite).toBeNull();
  });
});

describe("isMeasured / sumTokens", () => {
  it("counts a task with no measured cost as unmeasured, never as zero", () => {
    const sum = sumTokens([T1, T3]);
    expect(sum.tokens).toEqual({ in: 5, out: 5, cacheRead: 0, cacheWrite: 0 });
    expect(sum.measuredTasks).toEqual(["T3"]);
    expect(sum.unmeasuredTasks).toEqual(["T1"]);
  });
});

describe("isMergeRequest", () => {
  it("is a question beginning 'Merge' that names a pull request as #<number>", () => {
    expect(isMergeRequest("Merge majodali/example#99 (a test)?")).toBe(true);
    expect(isMergeRequest("merge majodali/example#1?")).toBe(true);
  });

  it("is not a merge request without the leading word, even if it names a pull request", () => {
    expect(isMergeRequest("Pull request 58 adds a row; is it in scope?")).toBe(
      false,
    );
    expect(
      isMergeRequest("Continue the branch that opened pull request #58?"),
    ).toBe(false);
  });

  it("is not a merge request beginning 'Merge' with no pull request named", () => {
    expect(isMergeRequest("Merge the two approaches into one report?")).toBe(
      false,
    );
  });
});

// ---- Fixture: the owner side -----------------------------------------------

const decisions: Decision[] = [
  decision({
    id: "D900",
    node: DECISION_NODE,
    question: "Keep the current wording?",
    default: "kept",
    chosen: "kept",
  }),
  decision({
    id: "D901",
    node: DECISION_NODE,
    question: "Which of the two options?",
    default: "A",
    chosen: "B",
  }),
  decision({
    id: "D902",
    node: DECISION_NODE,
    question: "Is this still needed?",
    default: "x",
    chosen: "x",
  }),
  decision({
    id: "D903",
    node: null,
    question: "Merge majodali/example#99 (a test change)?",
    default: "yes",
    chosen: "yes",
  }),
  decision({
    id: "D904",
    node: DECISION_NODE,
    question: "Asked but not yet answered?",
    default: "a default",
    chosen: null,
  }),
];

const events: JournalEvent[] = [
  event("2026-02-01T01:00:00Z", DECISION_NODE, "decision_close D900: kept"),
  event("2026-02-01T02:00:00Z", DECISION_NODE, "decision_close D901: B"),
  // D902 and D903 carry no answer line.
];

describe("readDecisions", () => {
  const reads = readDecisions(decisions, tasks, events);
  const byId = new Map(reads.map((r) => [r.id, r]));

  it("times the wait from the raising task's close to the answer line", () => {
    const d900 = byId.get("D900")!;
    expect(d900.answer).not.toBeNull();
    expect(d900.raisingTask?.id).toBe("T20");
    expect(d900.waitMs).toBe(60 * 60 * 1000);
    expect(d900.matchedDefault).toBe(true);
  });

  it("reports a decision answered against its default", () => {
    const d901 = byId.get("D901")!;
    expect(d901.matchedDefault).toBe(false);
    expect(d901.waitMs).toBe(2 * 60 * 60 * 1000);
  });

  it("leaves a decision with no answer line unmeasured, not timed as zero", () => {
    const d902 = byId.get("D902")!;
    expect(d902.answer).toBeNull();
    expect(d902.raisingTask).toBeNull();
    expect(d902.waitMs).toBeNull();
  });

  it("classes a merge request apart from a judgement question", () => {
    expect(byId.get("D903")!.class).toBe("merge");
    expect(byId.get("D900")!.class).toBe("judgement");
  });

  it("leaves a still-open decision with no matched-default verdict and no wait", () => {
    const d904 = byId.get("D904")!;
    expect(d904.answered).toBe(false);
    expect(d904.matchedDefault).toBeNull();
    expect(d904.waitMs).toBeNull();
  });
});

describe("ownerSummary", () => {
  const reads = readDecisions(decisions, tasks, events);
  const summary = ownerSummary(reads);

  it("separates merge requests from judgement questions", () => {
    expect(summary.merge.count).toBe(1);
    expect(summary.merge.ids).toEqual(["D903"]);
    expect(summary.judgement.count).toBe(4);
    expect(summary.judgement.ids).toEqual(["D900", "D901", "D902", "D904"]);
  });

  it("counts a still-open decision apart, out of the default share and the waits", () => {
    expect(summary.judgement.stillOpen).toBe(1);
    // D904 is still open: the default share and the wait counts below
    // stay exactly as they were without it.
    expect(summary.judgement.defaultShare).toEqual({
      matched: 2,
      withDefault: 3,
      noDefault: 0,
    });
  });

  it("gives the share of decisions answered with their default, apart from those with none", () => {
    // D900 matches, D901 does not, D902 matches: 2 of 3, all three
    // carry a default.
    expect(summary.judgement.defaultShare).toEqual({
      matched: 2,
      withDefault: 3,
      noDefault: 0,
    });
  });

  it("counts measured and unmeasured waits apart, and sums only the measured", () => {
    expect(summary.judgement.measuredWaits).toBe(2);
    expect(summary.judgement.unmeasuredWaits).toBe(1);
    expect(summary.judgement.totalWaitMs).toBe(3 * 60 * 60 * 1000);
  });
});
