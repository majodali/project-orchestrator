import { describe, expect, it } from "vitest";

import { parseFormCheckOutput, relativizePath } from "../plugin/scripts/lib/parse-output.ts";

/**
 * The form-checker output parser the corpus runner uses to both
 * capture expectations and compare against them (P1-N009 child B,
 * node P1-N011, spec B2's fingerprint shape).
 */
describe("parseFormCheckOutput", () => {
  it("parses a violation line, a warning line, and the summary line", () => {
    const stdout = [
      "VIOLATION register-parse     docs/plan-register.md: line 2: node-like line does not parse: 'bad'",
      "WARNING   costlog-form       docs/cost-log.md: task IDs not sequential: ['T001', 'T003']",
      "form_check: 3 nodes, 1 violation(s), 1 warning(s).",
    ].join("\n");

    const result = parseFormCheckOutput(stdout);

    expect(result.findings).toEqual([
      {
        severity: "violation",
        rule: "register-parse",
        rawPath: "docs/plan-register.md",
        message: "line 2: node-like line does not parse: 'bad'",
      },
      {
        severity: "warning",
        rule: "costlog-form",
        rawPath: "docs/cost-log.md",
        message: "task IDs not sequential: ['T001', 'T003']",
      },
    ]);
    expect(result.summary).toEqual({ nodes: 3, violations: 1, warnings: 1 });
  });

  it("produces no findings and no summary for the not-enrolled informational message", () => {
    const stdout =
      "form_check: no docs/plan-register.md — project is not enrolled for orchestration; nothing to check.\n";
    const result = parseFormCheckOutput(stdout);
    expect(result.findings).toEqual([]);
    expect(result.summary).toBeNull();
  });

  it("keeps a message's own internal colons intact", () => {
    const stdout =
      "VIOLATION register-parse     docs/plan-register.md: line 2: node-like line does not parse: 'a: b'\n" +
      "form_check: 1 nodes, 1 violation(s), 0 warning(s).";
    const result = parseFormCheckOutput(stdout);
    expect(result.findings[0]!.message).toBe(
      "line 2: node-like line does not parse: 'a: b'",
    );
  });
});

describe("relativizePath", () => {
  it("strips the fixture root prefix", () => {
    expect(
      relativizePath(
        "plugin/scripts/lib/corpus/fixtures/register-parse",
        "plugin/scripts/lib/corpus/fixtures/register-parse/docs/plan-register.md",
      ),
    ).toBe("docs/plan-register.md");
  });

  it("leaves an already-relative path alone when it does not share the root prefix", () => {
    expect(relativizePath("/a/b", "/c/d/e.md")).toBe("/c/d/e.md");
  });
});
