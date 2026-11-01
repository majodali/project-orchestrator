import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  COST_LOG_CELL_COUNT,
  JOURNAL_EVENT_KINDS,
  TASK_ID,
  costLogTableRows,
  journalLines,
  splitCostLogRow,
} from "../plugin/scripts/lib/cost-log-and-journal.ts";

/**
 * The Cost log row and run-journal line grammar, the shared unit the
 * form checker and the service's web view both read (node P2-N021, the
 * web view's first version, task E2; the specification of P2-N003,
 * criterion V23, no copied parsing). The form checker's findings over
 * the conformance corpus are checked by run_corpus.ts; these tests
 * check the unit's own answers and that the core no longer carries a
 * copy of the logic.
 */

const LIB = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "plugin",
  "scripts",
  "lib",
);

describe("the Cost log row grammar", () => {
  it("splits a table line into its trimmed cells, without the outer pipes", () => {
    expect(
      splitCostLogRow(
        "| 2026-08-25 | T002 | P1-N008 | plan | planner | m | n/a | n/a | a note |",
      ),
    ).toEqual([
      "2026-08-25",
      "T002",
      "P1-N008",
      "plan",
      "planner",
      "m",
      "n/a",
      "n/a",
      "a note",
    ]);
    expect(splitCostLogRow("  || a | b ||  ")).toEqual(["a", "b"]);
  });

  it("classes the first table line as the header, dash rows as separators, and every other table line as data, with its position and line", () => {
    const text = [
      "# Cost log",
      "",
      "| date | task | node | stage | role | model | input tok | output tok | notes |",
      "|---|---|---|---|---|---|---|---|---|",
      "| 2026-08-25 | T002 | P1-N008 | plan | planner | m | n/a | n/a | ok |",
      "prose between rows",
      "| 2026-08-26 | T3 | P1-N008 | plan |",
      "|  |  |",
    ].join("\r\n");
    const rows = costLogTableRows(text);
    expect(rows.map((r) => [r.position, r.line, r.kind])).toEqual([
      [1, 3, "header"],
      [2, 4, "separator"],
      [3, 5, "data"],
      [4, 7, "data"],
      [5, 8, "separator"],
    ]);
    expect(rows[0]!.cells).toHaveLength(COST_LOG_CELL_COUNT);
    expect(rows[2]!.cells[1]).toBe("T002");
    expect(rows[3]!.cells).toHaveLength(4);
  });

  it("matches task IDs of three or more digits only", () => {
    expect(TASK_ID.test("T001")).toBe(true);
    expect(TASK_ID.test("T1234")).toBe(true);
    expect(TASK_ID.test("T01")).toBe(false);
    expect(TASK_ID.test("t001")).toBe(false);
    expect(TASK_ID.test("T001x")).toBe(false);
  });
});

describe("the run journal's line grammar", () => {
  it("reports each non-blank line with its line number and what it is", () => {
    const text = [
      '{"ts":"2026-10-30T00:00:00Z","event":"accepted","task":"T001","node":"P1-N001"}',
      "",
      "not json",
      '{"ts":"2026-10-30T00:00:00Z"}',
      '{"ts":"2026-10-30T00:00:00Z","event":"invented"}',
      "null",
      "5",
      '"a string"',
      "[]",
      '{"ts":"2026-10-30T00:00:01Z","event":"edge-recorded","extra":[1]}',
    ].join("\n");
    const lines = journalLines(text);
    expect(lines.map((l) => [l.line, l.status])).toEqual([
      [1, "event"],
      [3, "invalid-json"],
      [4, "missing-field"],
      [5, "unknown-kind"],
      [6, "missing-field"],
      [7, "missing-field"],
      [8, "missing-field"],
      [9, "missing-field"],
      [10, "event"],
    ]);
    const first = lines[0]!;
    expect(first.status === "event" && first.event["task"]).toBe("T001");
    const last = lines.at(-1)!;
    expect(last.status === "event" && last.event["extra"]).toEqual([1]);
    const unknown = lines[3]!;
    expect(unknown.status === "unknown-kind" && unknown.event["event"]).toBe(
      "invented",
    );
  });

  it("knows the fifteen event kinds of the observability specification", () => {
    expect([...JOURNAL_EVENT_KINDS].sort()).toEqual(
      [
        "accepted",
        "backward-transition",
        "blocked",
        "check-failed",
        "dispatched",
        "edge-recorded",
        "gate-crossed",
        "gate-opened",
        "needs-judgment",
        "packet-widened",
        "precedent-applied",
        "result-received",
        "sequence-ratified",
        "sequence-stopped",
        "stale",
      ].sort(),
    );
  });
});

describe("V23 — one copy of the logic", () => {
  const unit = readFileSync(path.join(LIB, "cost-log-and-journal.ts"), "utf-8");
  const core = readFileSync(path.join(LIB, "form-check-core.ts"), "utf-8");

  it("the unit has no import and no I/O, so both repositories can consume it unedited", () => {
    expect(unit).not.toMatch(/^\s*import\s/m);
    expect(unit).not.toMatch(/\brequire\(/);
    expect(unit).not.toMatch(/node:/);
  });

  it("the form checker's core imports the unit and carries no copy of the row split, the task ID or the event kinds", () => {
    expect(core).toContain('from "./cost-log-and-journal.ts"');
    expect(core).not.toMatch(/\.split\("\|"\)/);
    expect(core).not.toMatch(/\/\^T\\d\{3,\}\$\//);
    expect(core).not.toContain('"result-received"');
    expect(core).not.toContain("JSON.parse");
  });

  it("the generator vendors the unit", () => {
    const generator = readFileSync(
      path.join(LIB, "..", "sync_shared_unit.ts"),
      "utf-8",
    );
    expect(generator).toContain('rel: "cost-log-and-journal.ts"');
  });
});
