#!/usr/bin/env node
/**
 * The rework-cost report (P2-N029, docs/plans/p2-n029-rework-cost.md):
 * sets the cost of each rework round against the verification it
 * replaced and the first pass it corrected, and the owner's decisions
 * against their own units, so the owner can read whether a longer run
 * without review pays. Reads `orchestration/state.json` and
 * `orchestration/journal.jsonl` of the current repository, writes
 * nothing, and calls no tool that writes: run it as many times as
 * wanted.
 *
 * The rework-round rule and the merge/judgement rule it implements are
 * stated in full in ./lib/rework-cost.ts's header; in short: a failed
 * verification opens a round, the execute tasks sent back are its
 * rework (there may be none), and the next verification closes it,
 * whichever way it falls; a merge request is a question beginning
 * "Merge" that names a pull request as `#<number>`, every other
 * question is a judgement question.
 *
 * Usage: rework_cost.ts   (no argument; reads the current repository)
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import type { State } from "project-orchestrator-service/dist/model/schema.js";

import { journalLines, type JournalEvent } from "./lib/cost-log-and-journal.ts";
import { preflightNodeOrExit } from "./lib/node-preflight.ts";
import {
  findReworkRounds,
  ownerSummary,
  projectTotals,
  readDecisions,
  roundCosts,
  TOKEN_TYPES,
  type Measured,
  type OwnerClassSummary,
  type ReworkRound,
  type TokenTotals,
} from "./lib/rework-cost.ts";

preflightNodeOrExit("rework_cost");

function formatTokens(tokens: TokenTotals): string {
  return `in=${tokens.in} out=${tokens.out} cacheRead=${tokens.cacheRead} cacheWrite=${tokens.cacheWrite}`;
}

function formatMeasured(m: Measured): string {
  const total = m.measuredTasks.length + m.unmeasuredTasks.length;
  const unmeasured =
    m.unmeasuredTasks.length === 0
      ? ""
      : ` (unmeasured: ${m.unmeasuredTasks.join(", ")})`;
  return `${formatTokens(m.tokens)} [measured ${m.measuredTasks.length} of ${total} tasks]${unmeasured}`;
}

function formatTaskRef(task: { id: string; model: string | null }): string {
  return `${task.id}${task.model ? ` (${task.model})` : ""}`;
}

function formatDurationMs(ms: number): string {
  const totalMinutes = Math.round(ms / 60_000);
  const days = Math.floor(totalMinutes / (24 * 60));
  const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
  const minutes = totalMinutes % 60;
  const parts: string[] = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  return parts.join(" ");
}

function formatRound(round: ReworkRound, index: number): string {
  const costs = roundCosts(round);
  const lines: string[] = [];
  lines.push(`Round ${index + 1} — ${round.workNode}`);
  lines.push(`  Failed verification: ${formatTaskRef(round.finder)}`);
  lines.push(
    `  Rework tasks: ${
      round.reworkTasks.length === 0
        ? "none"
        : round.reworkTasks.map(formatTaskRef).join(", ")
    }`,
  );
  lines.push(`  Re-verification: ${formatTaskRef(round.reVerification)}`);
  lines.push(
    `  Rework cost (rework tasks + re-verification): ${formatMeasured(costs.reworkCost)}`,
  );
  lines.push(
    `  Failed verification's cost: ${formatMeasured(costs.failedVerificationCost)}`,
  );
  lines.push(
    `  First pass's cost (${round.workNode}'s execute tasks before its first round): ${formatMeasured(costs.firstPassCost)}`,
  );
  return lines.join("\n");
}

function formatOwnerClass(label: string, summary: OwnerClassSummary): string {
  const lines: string[] = [];
  const answered = summary.count - summary.stillOpen;
  lines.push(
    `${label}: ${summary.count}${summary.stillOpen === 0 ? "" : ` (${summary.stillOpen} still open, not yet answered; counted apart below)`}`,
  );
  lines.push(
    `  Identifiers: ${summary.ids.length === 0 ? "none" : summary.ids.join(", ")}`,
  );
  const { withDefault, matched, noDefault } = summary.defaultShare;
  lines.push(
    withDefault === 0
      ? "  Answered with the default: no answered decision in this class carries a default"
      : `  Answered with the default: ${matched} of ${withDefault} that carry one (${((matched / withDefault) * 100).toFixed(1)}%); ${noDefault} carry no default, counted apart`,
  );
  lines.push(
    `  Wait (the time the node stood blocked, never the owner's effort): measured for ${summary.measuredWaits} of ${answered} answered, unmeasured for ${summary.unmeasuredWaits}; total ${formatDurationMs(summary.totalWaitMs)} over the measured ones`,
  );
  return lines.join("\n");
}

function main(): void {
  const root = process.cwd();
  const state = JSON.parse(
    readFileSync(path.join(root, "orchestration", "state.json"), "utf8"),
  ) as State;
  const journalText = readFileSync(
    path.join(root, "orchestration", "journal.jsonl"),
    "utf8",
  );
  const events: JournalEvent[] = journalLines(journalText)
    .filter((l) => l.status === "event")
    .map((l) => l.event);

  const rounds = findReworkRounds(state.nodes, state.tasks);
  const totals = projectTotals(state.tasks, rounds);
  const decisionReads = readDecisions(state.decisions, state.tasks, events);
  const owner = ownerSummary(decisionReads);

  const out: string[] = [];
  out.push(`Rework cost against the reviews it replaced (${state.project})`);
  out.push("");
  out.push("Rework rounds");
  out.push("=============");
  if (rounds.length === 0) {
    out.push("No finished rework round in this state file.");
  } else {
    out.push(
      rounds.map((round, index) => formatRound(round, index)).join("\n\n"),
    );
  }
  out.push("");
  out.push("Per project");
  out.push("===========");
  out.push(
    `Verifications (resolved: closed or blocked): ${totals.verifications}`,
  );
  out.push(
    `Failed: ${totals.failedVerifications}${
      totals.verifications === 0
        ? ""
        : ` (${((totals.failedVerifications / totals.verifications) * 100).toFixed(1)}%)`
    }`,
  );
  out.push(
    `Execute cost (all execute tasks): ${formatMeasured(totals.executeCost)}`,
  );
  out.push(
    `Rework cost (all rounds' rework tasks + re-verifications): ${formatMeasured(totals.reworkCost)}`,
  );
  out.push(
    "Rework cost as a share of execute cost, by token type (no combined figure across types, no exchange rate to the owner side):",
  );
  for (const type of TOKEN_TYPES) {
    const share = totals.shareByType[type];
    out.push(
      `  ${type}: ${share === null ? "execute side is 0, no ratio" : `${(share * 100).toFixed(1)}%`}`,
    );
  }
  out.push("");
  out.push(
    "The owner side (D126: counted and timed in its own units, never combined with the token figures above)",
  );
  out.push(
    "=".repeat(
      "The owner side (D126: counted and timed in its own units, never combined with the token figures above)"
        .length,
    ),
  );
  out.push(`All decisions: ${owner.all.count}`);
  out.push(formatOwnerClass("Merge requests", owner.merge));
  out.push(formatOwnerClass("Judgement questions", owner.judgement));

  console.log(out.join("\n"));
}

main();
