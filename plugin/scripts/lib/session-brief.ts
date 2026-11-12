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

  return lines.join("\n");
}

/**
 * What the agent is to do with the brief (owner, 2026-11-12). At the
 * start of a session it gives the summary and asks before it takes
 * anything; it never claims a task on its own. After a resume or a
 * compaction the brief only refreshes what it knows.
 */
export function briefInstructions(state: State, fresh: boolean): string {
  if (!fresh) {
    return "This refreshes what you know of the checkout and the plan; carry on with what you were doing.";
  }
  const offers = candidates(state);
  const ask =
    offers.length > 0
      ? "Name the task on offer you would take, with its step, and ask whether to take it. Do not call task_open until the person says yes."
      : "Nothing is on offer: say so, and ask what the person wants.";
  return [
    "The person has been shown a short form of this on screen. In your first reply, before anything else:",
    "1. Give this summary in your own words: the checkout's state, the tasks on offer, what is in flight, and what waits on the owner. Lead with anything that could not be brought up to date.",
    `2. ${ask}`,
    "If their first message asks for something else, give the summary briefly, then do what they asked.",
  ].join("\n");
}

/** The few lines the person sees on screen when the session starts. */
export function screenSummary(state: State, at: string): string {
  const offers = candidates(state);
  const open = state.tasks.filter((t) => t.status === "open");
  const classes = classifyAll(state);
  const waiting =
    state.nodes.filter((n) => classes.get(n.id) === "gated").length +
    state.decisions.filter((d) => d.chosen === null).length;
  const lines = [`Plan at ${at}.`];
  if (offers.length === 0) {
    lines.push("On offer: nothing.");
  } else {
    lines.push(
      `On offer: ${offers
        .slice(0, 5)
        .map(
          (c) =>
            `${c.node.id} "${clip(c.node.title, 50)}" (${c.step}, ${c.role})`,
        )
        .join(
          "; ",
        )}${offers.length > 5 ? `; and ${offers.length - 5} more` : ""}.`,
    );
  }
  if (open.length > 0) {
    lines.push(
      `In flight: ${open.map((t) => `${t.id} on ${t.node}`).join(", ")}.`,
    );
  }
  if (waiting > 0) lines.push(`Waiting on you: ${waiting}, in the view.`);
  lines.push(
    offers.length > 0
      ? "Say what you want, or ask the agent which task it would take."
      : "Say what you want.",
  );
  return lines.join("\n");
}
