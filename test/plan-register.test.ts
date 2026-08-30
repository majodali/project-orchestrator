import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  parseRegister,
  STAGES,
  subtreeIds,
} from "../plugin/scripts/lib/plan-register.ts";

/**
 * Tests for the shared Plan-register grammar unit (P1-N009 child A,
 * node P1-N010, spec criterion 4/D1). Adapted from
 * project-orchestrator-service's test/planRegisterParser.test.ts (the
 * unit this file merges and adapts).
 *
 * The live-register cross-check reads this repository's real
 * docs/plan-register.md directly (the shared unit performs no I/O
 * itself; this test does the reading) and asserts the same node set
 * — ID, stage, hold marker, parent, line number — that
 * plugin/scripts/form_check.py's `parse_register` produces on the
 * identical file, cross-checked by running
 * `python3 -c "...form_check.parse_register..."` at authoring time
 * (24 nodes, 0 parse errors; recorded in this task's result).
 */

const REGISTER_PATH = fileURLToPath(
  new URL("../docs/plan-register.md", import.meta.url),
);
const LIVE_REGISTER = readFileSync(REGISTER_PATH, "utf-8");

describe("STAGES — the lifecycle vocabulary, as data", () => {
  it("carries exactly the seven stages, in plan-model.md's order", () => {
    expect(STAGES).toEqual([
      "identified",
      "planned",
      "specified",
      "broken-down",
      "executing",
      "verifying",
      "done",
    ]);
  });
});

describe("parseRegister — the live register (cross-checked against form_check.py)", () => {
  const result = parseRegister(LIVE_REGISTER);

  it("parses every node in the live register, with no parse errors", () => {
    expect(result.order).toHaveLength(24);
    expect(result.errors).toEqual([]);
  });

  it("yields the same {id, stage, hold, parent, line} facts form_check.py's parser yields", () => {
    const expected: Array<{
      id: string;
      stage: string;
      hold: null;
      parent: string | null;
      line: number;
    }> = [
      {
        id: "P1-N001",
        stage: "broken-down",
        hold: null,
        parent: null,
        line: 10,
      },
      { id: "P1-N002", stage: "done", hold: null, parent: "P1-N001", line: 11 },
      { id: "P1-N003", stage: "done", hold: null, parent: "P1-N001", line: 12 },
      { id: "P1-N004", stage: "done", hold: null, parent: "P1-N001", line: 13 },
      { id: "P1-N005", stage: "done", hold: null, parent: "P1-N001", line: 14 },
      { id: "P1-N008", stage: "done", hold: null, parent: "P1-N001", line: 15 },
      {
        id: "P1-N009",
        stage: "broken-down",
        hold: null,
        parent: "P1-N001",
        line: 16,
      },
      {
        id: "P1-N010",
        stage: "identified",
        hold: null,
        parent: "P1-N009",
        line: 17,
      },
      {
        id: "P1-N011",
        stage: "identified",
        hold: null,
        parent: "P1-N009",
        line: 18,
      },
      {
        id: "P1-N012",
        stage: "identified",
        hold: null,
        parent: "P1-N009",
        line: 19,
      },
      {
        id: "P1-N013",
        stage: "identified",
        hold: null,
        parent: "P1-N009",
        line: 20,
      },
      {
        id: "P1-N006",
        stage: "identified",
        hold: null,
        parent: "P1-N001",
        line: 21,
      },
      {
        id: "P1-N007",
        stage: "identified",
        hold: null,
        parent: "P1-N001",
        line: 22,
      },
      {
        id: "P2-N001",
        stage: "broken-down",
        hold: null,
        parent: null,
        line: 23,
      },
      {
        id: "P2-N002",
        stage: "broken-down",
        hold: null,
        parent: "P2-N001",
        line: 24,
      },
      { id: "P2-N007", stage: "done", hold: null, parent: "P2-N002", line: 25 },
      { id: "P2-N008", stage: "done", hold: null, parent: "P2-N002", line: 26 },
      { id: "P2-N009", stage: "done", hold: null, parent: "P2-N002", line: 27 },
      {
        id: "P2-N010",
        stage: "identified",
        hold: null,
        parent: "P2-N002",
        line: 28,
      },
      {
        id: "P2-N011",
        stage: "identified",
        hold: null,
        parent: "P2-N002",
        line: 29,
      },
      {
        id: "P2-N003",
        stage: "identified",
        hold: null,
        parent: "P2-N001",
        line: 30,
      },
      {
        id: "P2-N004",
        stage: "identified",
        hold: null,
        parent: "P2-N001",
        line: 31,
      },
      {
        id: "P2-N005",
        stage: "identified",
        hold: null,
        parent: "P2-N001",
        line: 32,
      },
      {
        id: "P2-N006",
        stage: "identified",
        hold: null,
        parent: "P2-N001",
        line: 33,
      },
    ];

    expect(result.order).toEqual(expected.map((e) => e.id));
    for (const e of expected) {
      const n = result.nodes.get(e.id);
      expect(n, `node ${e.id} missing`).toBeDefined();
      expect(n!.stage).toBe(e.stage);
      expect(n!.hold).toBe(e.hold);
      expect(n!.parentId).toBe(e.parent);
      expect(n!.line).toBe(e.line);
    }
  });
});

describe("parseRegister — malformed input is reported, never dropped silently", () => {
  it("reports a node-like line that fails to parse, naming the line number and text", () => {
    const text = [
      "- P1-N001 [broken-down] Fine node",
      "  - P1-N002 [executing missing-close-bracket bad line",
      "  - P1-N003 [done] Also fine",
    ].join("\n");

    const result = parseRegister(text);

    expect(result.order).toEqual(["P1-N001", "P1-N003"]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toMatchObject({
      line: 2,
      raw: "  - P1-N002 [executing missing-close-bracket bad line",
    });
    expect(result.errors[0]!.reason).toContain("does not match");
  });

  it("reports a bracketed-but-not-a-node-ID line as malformed rather than ignoring it", () => {
    const text = "- Something odd [identified] that is not a real node ID";
    const result = parseRegister(text);

    expect(result.order).toEqual([]);
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]!.line).toBe(1);
  });

  it("does not report ordinary prose bullets that never claimed to be a node", () => {
    const text = [
      "# Plan register",
      "",
      "Some prose about the register.",
      "- a plain bullet with no brackets at all",
      "- P1-N001 [identified] A real node",
    ].join("\n");

    const result = parseRegister(text);

    expect(result.order).toEqual(["P1-N001"]);
    expect(result.errors).toEqual([]);
  });

  it("reports a duplicate node ID and keeps the first occurrence", () => {
    const text = [
      "- P1-N001 [identified] First",
      "- P1-N001 [done] Second, same ID",
    ].join("\n");

    const result = parseRegister(text);

    expect(result.order).toEqual(["P1-N001"]);
    expect(result.nodes.get("P1-N001")!.stage).toBe("identified");
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]!.reason).toContain("duplicate node ID P1-N001");
    expect(result.errors[0]!.line).toBe(2);
  });

  it("accepts an unknown stage string as a parse-level fact, and validates nothing (D5)", () => {
    // The unit carries no policy: a stage outside STAGES still parses.
    // Whether that is a *violation* is a checker's judgment, not the
    // unit's (D5 — "nothing is guarded that is not shared").
    const result = parseRegister(
      "- P1-N001 [verifiying] Misspelled stage, still parses",
    );
    expect(result.errors).toEqual([]);
    expect(result.nodes.get("P1-N001")!.stage).toBe("verifiying");
    expect(STAGES as readonly string[]).not.toContain("verifiying");
  });

  it("parses a gated hold marker", () => {
    const result = parseRegister(
      "- P1-N001 [executing] [gated: owner review] Held node",
    );
    expect(result.nodes.get("P1-N001")!.hold).toEqual({
      kind: "gated",
      reason: "owner review",
    });
  });

  it("parses a blocked hold marker", () => {
    const result = parseRegister(
      "- P1-N001 [executing] [blocked: waiting on O3] Held node",
    );
    expect(result.nodes.get("P1-N001")!.hold).toEqual({
      kind: "blocked",
      reason: "waiting on O3",
    });
  });
});

describe("subtreeIds", () => {
  const result = parseRegister(LIVE_REGISTER);

  it("returns exactly that node and its descendants for an interior node", () => {
    expect(subtreeIds(result, "P1-N009")).toEqual([
      "P1-N009",
      "P1-N010",
      "P1-N011",
      "P1-N012",
      "P1-N013",
    ]);
  });

  it("returns just the node itself for a leaf", () => {
    expect(subtreeIds(result, "P1-N010")).toEqual(["P1-N010"]);
  });

  it("returns null, not an empty array, for an unknown ID", () => {
    expect(subtreeIds(result, "P9-N999")).toBeNull();
  });

  it("never includes ancestors or siblings", () => {
    const ids = subtreeIds(result, "P1-N009")!;
    expect(ids).not.toContain("P1-N001"); // ancestor
    expect(ids).not.toContain("P1-N006"); // sibling
  });
});
