import { describe, expect, it } from "vitest";

import type { State } from "project-orchestrator-service/dist/model/schema.js";

import { sessionBrief } from "../plugin/scripts/lib/session-brief.ts";

/**
 * The brief a starting session is given (owner, 2026-11-12): the tasks
 * on offer, what is in flight, and what waits on the owner.
 */

type Node = State["nodes"][number];

function node(
  partial: Partial<Node> & Pick<Node, "id" | "title" | "stage">,
): Node {
  return {
    kind: "work",
    outcome: `${partial.title} exists.`,
    parent: null,
    after: [],
    hold: null,
    start: "auto",
    docs: { plan: null, spec: null },
    done: null,
    note: null,
    ...partial,
  };
}

function state(): State {
  return {
    schema: 0,
    project: "majodali/project-orchestrator",
    nodes: [
      node({ id: "P1-N001", title: "The line of work", stage: "broken-down" }),
      node({
        id: "P1-N002",
        title: "The part to build",
        stage: "specified",
        parent: "P1-N001",
      }),
      node({
        id: "P1-N003",
        title: "The part to plan",
        stage: "identified",
        parent: "P1-N001",
        outcome: null,
      }),
      node({
        id: "P1-N004",
        title: "The part the owner reviews",
        stage: "planned",
        parent: "P1-N001",
        hold: { kind: "gated", reason: "owner review of the plan" },
      }),
      node({
        id: "P1-N005",
        title: "The part in flight",
        stage: "executing",
        parent: "P1-N001",
      }),
    ],
    tasks: [
      {
        id: "T001",
        node: "P1-N005",
        step: "execute",
        status: "open",
        role: "implementer",
        model: null,
        tokens: { in: null, out: null },
        opened: "2026-11-12T06:00:00Z",
        closed: null,
        base: null,
        ref: null,
        pr: null,
        summary: null,
        notes: null,
      },
    ],
    decisions: [
      {
        id: "D001",
        node: "P1-N003",
        question: "Which store holds the answers?",
        options: [],
        default: "git",
        chosen: null,
        decided: null,
        rationale: null,
        standing: false,
        source: null,
      },
    ],
  };
}

describe("sessionBrief", () => {
  it("lists the tasks on offer with step and role, what is in flight, and what waits on the owner", () => {
    const text = sessionBrief(state(), "origin/main (abc1234)");
    expect(text.split("\n")).toEqual([
      "Plan of majodali/project-orchestrator at origin/main (abc1234).",
      "",
      "Tasks on offer (claim one with task_open before any work):",
      '- P1-N002 "The part to build": execute (implementer), or break down',
      "",
      "In flight (claimed by a session; do not take these):",
      "- T001 on P1-N005, execute, open since 2026-11-12T06:00:00Z",
      "",
      "Waiting on the owner (answered in the view, not by a session):",
      '- P1-N004 "The part the owner reviews": owner review of the plan',
      "- decision D001 on P1-N003: Which store holds the answers?",
      "",
      "Tell the person this list before you start, and which task you will take.",
    ]);
  });

  it("says so when nothing offers a step, and leaves out the sections that are empty", () => {
    const s = state();
    s.nodes = [
      node({
        id: "P1-N001",
        title: "The line of work",
        stage: "done",
        done: "2026-11-01",
      }),
    ];
    s.tasks = [];
    s.decisions = [];
    const text = sessionBrief(s, "origin/main (abc1234)");
    expect(text).toContain("- none: nothing offers a step.");
    expect(text).not.toContain("In flight");
    expect(text).not.toContain("Waiting on the owner");
  });
});
