/**
 * What a session is told about the plan when it starts (owner,
 * 2026-11-12): the tasks on offer, what is in flight and what waits on
 * the owner, computed from the state file with the service's own
 * model code, so the list is what `task_next` would answer. Pure: the
 * entry point (../session_brief.ts) reads the file.
 */

import {
  attentionReason,
  classifyAll,
} from "project-orchestrator-service/dist/model/check.js";
import { candidates } from "project-orchestrator-service/dist/model/loop.js";
import type { State } from "project-orchestrator-service/dist/model/schema.js";

function one(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function clip(text: string, max: number): string {
  const t = one(text);
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

/** The plan's brief, as lines of plain text. */
export function sessionBrief(state: State, at: string): string {
  const lines: string[] = [`Plan of ${state.project} at ${at}.`];

  const offers = candidates(state);
  lines.push("", "Tasks on offer (claim one with task_open before any work):");
  if (offers.length === 0) {
    lines.push(
      "- none: nothing offers a step. What remains is in flight, waits on the owner or on a dependency, or is held.",
    );
  }
  for (const c of offers) {
    const others = c.steps.filter((s) => s !== c.step);
    lines.push(
      `- ${c.node.id} "${one(c.node.title)}": ${c.step} (${c.role})${others.length > 0 ? `, or ${others.join(", ")}` : ""}`,
    );
  }

  const open = state.tasks.filter((t) => t.status === "open");
  if (open.length > 0) {
    lines.push("", "In flight (claimed by a session; do not take these):");
    for (const t of open) {
      lines.push(
        `- ${t.id} on ${t.node}, ${t.step}, open since ${t.opened ?? "an unknown time"}`,
      );
    }
  }

  const classes = classifyAll(state);
  const gated = state.nodes.filter((n) => classes.get(n.id) === "gated");
  const decisions = state.decisions.filter((d) => d.chosen === null);
  if (gated.length > 0 || decisions.length > 0) {
    lines.push(
      "",
      "Waiting on the owner (answered in the view, not by a session):",
    );
    for (const n of gated) {
      lines.push(
        `- ${n.id} "${one(n.title)}": ${clip(attentionReason(n), 140)}`,
      );
    }
    for (const d of decisions) {
      lines.push(
        `- decision ${d.id}${d.node ? ` on ${d.node}` : ""}: ${clip(d.question, 140)}`,
      );
    }
  }

  lines.push(
    "",
    "Tell the person this list before you start, and which task you will take.",
  );
  return lines.join("\n");
}
