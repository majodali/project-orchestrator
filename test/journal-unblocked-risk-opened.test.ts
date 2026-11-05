import { describe, expect, it } from "vitest";
import { journalLines } from "../plugin/scripts/lib/cost-log-and-journal.ts";

describe("the kinds unblocked and risk-opened (node P1-N016, decisions 14 and 16)", () => {
  it("reads a journal that uses both kinds as events", () => {
    const text = [
      '{"ts":"2026-11-03T00:00:00Z","event":"blocked","task":"T900","node":"P9-N001","note":"waits on the owner"}',
      '{"ts":"2026-11-03T01:00:00Z","event":"unblocked","task":"T900","node":"P9-N001","note":"released by the owner\'s ruling"}',
      '{"ts":"2026-11-03T02:00:00Z","event":"risk-opened","task":"T900","node":"P9-N001","note":"R99"}',
    ].join("\n");
    expect(journalLines(text).map((l) => l.status)).toEqual([
      "event",
      "event",
      "event",
    ]);
  });
});
