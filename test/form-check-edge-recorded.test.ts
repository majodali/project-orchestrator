import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";

import { runFormCheck } from "../plugin/scripts/lib/form-check-core.ts";

/**
 * The `edge-recorded` journal event kind (node P3-N007, the type
 * declared, criterion B8). The Orchestrator writes one such event for
 * each edge it transcribes into the Project model instance
 * (docs/process/project-model.md, recording edges; and
 * docs/process/observability.md, event kinds). The form checker's
 * `journal-form` rule rejects an event kind it does not know, so the
 * kind must be in its event list before the first edge is recorded.
 *
 * The fixture is a minimal enrolled project built in a temporary
 * directory, outside plugin/scripts/lib/corpus/, so the vendored
 * conformance corpus stays byte-identical (P3-N002 criterion I10).
 */
const roots: string[] = [];

function projectWithJournal(eventKind: string): string {
  const root = mkdtempSync(path.join(tmpdir(), "edge-recorded-"));
  roots.push(root);
  mkdirSync(path.join(root, "docs"));
  mkdirSync(path.join(root, "orchestration"));
  writeFileSync(
    path.join(root, "docs", "plan-register.md"),
    "# Plan register\n\n- P1-N001 [done] Root\n",
  );
  const event = {
    ts: "2026-10-30T20:00:00Z",
    event: eventKind,
    task: null,
    node: "P1-N001",
    stage: null,
    role: null,
    model: null,
    session: null,
    ref: null,
    note: "P1-N001 uses form-checker; from docs/plans/root.md, Dependencies",
  };
  writeFileSync(
    path.join(root, "orchestration", "journal.jsonl"),
    JSON.stringify(event) + "\n",
  );
  return root;
}

function journalFormMessages(root: string): string[] {
  return runFormCheck(root)
    .findings.filter((f) => f.rule === "journal-form")
    .map((f) => f.msg);
}

afterEach(() => {
  for (const root of roots.splice(0)) {
    rmSync(root, { recursive: true, force: true });
  }
});

describe("journal event kind edge-recorded (P3-N007 criterion B8)", () => {
  it("is accepted by the journal-form rule", () => {
    expect(journalFormMessages(projectWithJournal("edge-recorded"))).toEqual(
      [],
    );
  });

  it("leaves the rule rejecting a kind it does not know", () => {
    expect(journalFormMessages(projectWithJournal("edge-recordd"))).toEqual([
      "line 1: unknown event kind 'edge-recordd'",
    ]);
  });
});
