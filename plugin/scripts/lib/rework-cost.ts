/**
 * The derivations behind the rework-cost report (P2-N029): a rework
 * round and its cost, and the owner side of a decision, both read
 * from fields the schema already carries (docs/plans/p2-n029-rework-cost.md,
 * "How a rework is identified" and "How the owner side is read").
 * Pure: no I/O, no tool call. ../rework_cost.ts reads the two files
 * and prints what these functions compute.
 *
 * The rework-round rule, for a work node W: order W's execute tasks
 * and the verify tasks of W's check-node children by `opened`. A
 * verify task that closed `blocked` opens a round (its finder);
 * every execute task on W opened after that, up to the next verify
 * task on a check node of W, is a rework task of that round; that
 * next verify task is the round's re-verification, whichever way it
 * closes — if it too closed `blocked`, it is at once the previous
 * round's re-verification and the next round's finder. W's execute
 * tasks before its first round are its first pass. A round still
 * waiting for its re-verification is not reported: it is in flight,
 * not a finished price to compare.
 *
 * The owner side carries no token count, so it is read in its own
 * units (D126): a decision's wait, from the close of the task that
 * raised it (the task on the decision's node with the latest `closed`
 * before the answer line) to the journal's `decision_close <id>:`
 * line: never the owner's effort, since answering can take a minute
 * of a day's wait. A merge request is a question whose first word is
 * "Merge" and which names a pull request as `#<number>`; every other
 * question is a judgement question (the owner's widening of D126,
 * 2026-11-20). The two currencies are never combined into one figure.
 */

import type {
  Decision,
  Node,
  Task,
} from "project-orchestrator-service/dist/model/schema.js";

import type { JournalEvent } from "./cost-log-and-journal.ts";

// ---- Token totals -----------------------------------------------------

export interface TokenTotals {
  in: number;
  out: number;
  cacheRead: number;
  cacheWrite: number;
}

/** A sum of tokens over a set of tasks, with which tasks fed it and
 * which could not be counted (criterion 7: unmeasured, never zero). */
export interface Measured {
  tokens: TokenTotals;
  measuredTasks: string[];
  unmeasuredTasks: string[];
}

function zero(): TokenTotals {
  return { in: 0, out: 0, cacheRead: 0, cacheWrite: 0 };
}

/** A task carries a measured cost only when both `tokens.in` and
 * `tokens.out` are recorded (schema.d.ts); a task closed before
 * 2026-11-11, or never measured, carries `null` in both. */
export function isMeasured(task: Task): boolean {
  return task.tokens.in !== null && task.tokens.out !== null;
}

export function sumTokens(tasks: readonly Task[]): Measured {
  const tokens = zero();
  const measuredTasks: string[] = [];
  const unmeasuredTasks: string[] = [];
  for (const task of tasks) {
    if (isMeasured(task)) {
      tokens.in += task.tokens.in!;
      tokens.out += task.tokens.out!;
      tokens.cacheRead += task.tokens.cacheRead ?? 0;
      tokens.cacheWrite += task.tokens.cacheWrite ?? 0;
      measuredTasks.push(task.id);
    } else {
      unmeasuredTasks.push(task.id);
    }
  }
  return { tokens, measuredTasks, unmeasuredTasks };
}

// ---- Rework rounds ------------------------------------------------------

export interface ReworkRound {
  workNode: string;
  /** The failed verification that opened the round. */
  finder: Task;
  /** The execute tasks the round sent back; may be empty (criterion 5). */
  reworkTasks: Task[];
  /** The verify task that closed the round, pass or fail. */
  reVerification: Task;
  /** The work node's execute tasks before its first round. */
  firstPass: Task[];
}

function openedKey(task: Task): string {
  return task.opened ?? "";
}

/**
 * Every finished rework round across every work node, in the order
 * its node's tasks were opened. A round awaiting its re-verification
 * is not yet finished and is left out.
 */
export function findReworkRounds(
  nodes: readonly Node[],
  tasks: readonly Task[],
): ReworkRound[] {
  const checkParent = new Map<string, string>();
  for (const node of nodes) {
    if (node.kind === "check" && node.parent !== null) {
      checkParent.set(node.id, node.parent);
    }
  }

  const byWorkNode = new Map<string, Task[]>();
  for (const task of tasks) {
    let workNode: string | null = null;
    if (task.step === "execute") workNode = task.node;
    else if (task.step === "verify")
      workNode = checkParent.get(task.node) ?? null;
    if (workNode === null) continue;
    const list = byWorkNode.get(workNode);
    if (list) list.push(task);
    else byWorkNode.set(workNode, [task]);
  }

  const rounds: ReworkRound[] = [];
  for (const [workNode, nodeTasks] of byWorkNode) {
    const ordered = [...nodeTasks].sort((a, b) =>
      openedKey(a).localeCompare(openedKey(b)),
    );
    const firstPass: Task[] = [];
    let sawRound = false;
    let open: { finder: Task; rework: Task[] } | null = null;
    for (const task of ordered) {
      if (task.step === "execute") {
        if (open) open.rework.push(task);
        else if (!sawRound) firstPass.push(task);
        continue;
      }
      // task.step === "verify"
      if (open) {
        rounds.push({
          workNode,
          finder: open.finder,
          reworkTasks: open.rework,
          reVerification: task,
          firstPass,
        });
        open = null;
      }
      if (task.status === "blocked") {
        open = { finder: task, rework: [] };
        sawRound = true;
      }
    }
    // An `open` round left here has no re-verification yet: in
    // flight, not reported.
  }
  return rounds;
}

export interface RoundCosts {
  reworkCost: Measured;
  failedVerificationCost: Measured;
  firstPassCost: Measured;
}

/** Criterion 4: the three figures a round is compared by, each as
 * tokens by type, never money. The re-verification counts toward the
 * rework cost (header comment, "What is compared"): a reviewer's
 * second look is part of the price of not reviewing earlier. */
export function roundCosts(round: ReworkRound): RoundCosts {
  return {
    reworkCost: sumTokens([...round.reworkTasks, round.reVerification]),
    failedVerificationCost: sumTokens([round.finder]),
    firstPassCost: sumTokens(round.firstPass),
  };
}

export type TokenType = keyof TokenTotals;
export const TOKEN_TYPES: readonly TokenType[] = [
  "in",
  "out",
  "cacheRead",
  "cacheWrite",
];

export interface ProjectTotals {
  /** Verify tasks that reached a pass/fail determination (`closed`
   * or `blocked`); a verification closed `needs-judgment` is a
   * question, not a result, and is left out of this count. */
  verifications: number;
  failedVerifications: number;
  executeCost: Measured;
  reworkCost: Measured;
  /** Rework cost as a share of execute cost, by token type; `null`
   * when the execute side of that type is zero. No combined figure
   * across types is given — RU-019, record whichever way it falls. */
  shareByType: Record<TokenType, number | null>;
}

export function projectTotals(
  tasks: readonly Task[],
  rounds: readonly ReworkRound[],
): ProjectTotals {
  const verifyTasks = tasks.filter(
    (t) =>
      t.step === "verify" && (t.status === "closed" || t.status === "blocked"),
  );
  const failedVerifications = verifyTasks.filter(
    (t) => t.status === "blocked",
  ).length;
  const executeCost = sumTokens(tasks.filter((t) => t.step === "execute"));
  const reworkCost = sumTokens(
    rounds.flatMap((r) => [...r.reworkTasks, r.reVerification]),
  );
  const shareByType = Object.fromEntries(
    TOKEN_TYPES.map((type) => [
      type,
      executeCost.tokens[type] === 0
        ? null
        : reworkCost.tokens[type] / executeCost.tokens[type],
    ]),
  ) as Record<TokenType, number | null>;
  return {
    verifications: verifyTasks.length,
    failedVerifications,
    executeCost,
    reworkCost,
    shareByType,
  };
}

// ---- The owner side -------------------------------------------------------

/** The journal line that records a decision's answer
 * (docs/plans/p2-n029-rework-cost.md, "The line that records an
 * answer"): a `state-written` event whose `note` begins
 * `decision_close <id>:`. */
export interface AnswerLine {
  ts: string;
  session: string | null;
}

export function answerLines(
  events: readonly JournalEvent[],
): Map<string, AnswerLine> {
  const map = new Map<string, AnswerLine>();
  for (const event of events) {
    const note = event["note"];
    if (typeof note !== "string") continue;
    const match = /^decision_close (\S+):/.exec(note);
    if (!match) continue;
    const id = match[1]!;
    const ts = event["ts"];
    if (typeof ts !== "string" || map.has(id)) continue;
    const session = event["session"];
    map.set(id, { ts, session: typeof session === "string" ? session : null });
  }
  return map;
}

/** The task on `decision`'s node with the latest `closed` strictly
 * before `before` (the answer line's `ts`); `null` when the decision
 * has no node, or that node has no such task. */
export function raisingTask(
  decision: Decision,
  tasks: readonly Task[],
  before: string,
): Task | null {
  if (decision.node === null) return null;
  let latest: Task | null = null;
  for (const task of tasks) {
    if (task.node !== decision.node || task.closed === null) continue;
    if (task.closed >= before) continue;
    if (latest === null || task.closed > latest.closed!) latest = task;
  }
  return latest;
}

/** A merge request's first word is "Merge" and it names a pull
 * request as `#<number>` (D126's widening, "Merge request or
 * judgement question"); every other question is a judgement
 * question. */
export function isMergeRequest(question: string): boolean {
  return /^merge\b/i.test(question.trim()) && /#\d+/.test(question);
}

export interface DecisionRead {
  id: string;
  node: string | null;
  class: "merge" | "judgement";
  /** `chosen !== null`: the owner has answered it. A decision still
   * open (asked but not yet answered, such as one raised this task)
   * is listed and classed, but excluded from the default share and
   * the wait totals below — it is not yet a review that changed
   * anything, or didn't; it is still pending one. */
  answered: boolean;
  hasDefault: boolean;
  /** `null` when there is no default, or the decision is not yet
   * answered: "matched" and "didn't match" both presuppose an
   * answer. */
  matchedDefault: boolean | null;
  answer: AnswerLine | null;
  raisingTask: Task | null;
  /** Milliseconds the node stood blocked on this decision, from the
   * raising task's close to the answer line; `null` when either is
   * missing (criterion 10: unmeasured, counted, never timed as zero)
   * or the decision is still open. */
  waitMs: number | null;
}

export function readDecisions(
  decisions: readonly Decision[],
  tasks: readonly Task[],
  events: readonly JournalEvent[],
): DecisionRead[] {
  const answers = answerLines(events);
  return decisions.map((decision) => {
    const answered = decision.chosen !== null;
    const answer = answers.get(decision.id) ?? null;
    const raising = answer ? raisingTask(decision, tasks, answer.ts) : null;
    const waitMs =
      answer && raising && raising.closed !== null
        ? Date.parse(answer.ts) - Date.parse(raising.closed)
        : null;
    return {
      id: decision.id,
      node: decision.node,
      class: isMergeRequest(decision.question) ? "merge" : "judgement",
      answered,
      hasDefault: decision.default !== null,
      matchedDefault:
        answered && decision.default !== null
          ? decision.chosen === decision.default
          : null,
      answer,
      raisingTask: raising,
      waitMs,
    };
  });
}

export interface OwnerClassSummary {
  count: number;
  ids: string[];
  /** Asked but not yet answered; excluded from `defaultShare` and
   * from the wait counts, which both presuppose an answer. */
  stillOpen: number;
  measuredWaits: number;
  unmeasuredWaits: number;
  totalWaitMs: number;
  defaultShare: { matched: number; withDefault: number; noDefault: number };
}

function summarizeClass(reads: readonly DecisionRead[]): OwnerClassSummary {
  const answered = reads.filter((r) => r.answered);
  const withDefault = answered.filter((r) => r.hasDefault);
  const matched = withDefault.filter((r) => r.matchedDefault === true);
  const measured = answered.filter((r) => r.waitMs !== null);
  return {
    count: reads.length,
    ids: reads.map((r) => r.id),
    stillOpen: reads.length - answered.length,
    measuredWaits: measured.length,
    unmeasuredWaits: answered.length - measured.length,
    totalWaitMs: measured.reduce((sum, r) => sum + r.waitMs!, 0),
    defaultShare: {
      matched: matched.length,
      withDefault: withDefault.length,
      noDefault: answered.length - withDefault.length,
    },
  };
}

/** Criterion 12: merge requests apart from judgement questions, each
 * with its own count, waits and default share. */
export function ownerSummary(reads: readonly DecisionRead[]): {
  merge: OwnerClassSummary;
  judgement: OwnerClassSummary;
  all: OwnerClassSummary;
} {
  return {
    merge: summarizeClass(reads.filter((r) => r.class === "merge")),
    judgement: summarizeClass(reads.filter((r) => r.class === "judgement")),
    all: summarizeClass(reads),
  };
}
