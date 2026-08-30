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
 * **Design rule (P1-N009 node P1-N012, owner disposition 2026-08-30):
 * a repository test must never freeze Plan-register facts, because the
 * register moves at every acceptance.** The live-register cross-check
 * below used to hardcode a snapshot of `docs/plan-register.md` as of
 * one commit — `P1-N010 … P1-N013` asserted `identified` — which broke
 * at the very next acceptance that touched the register (an ordinary,
 * sanctioned write, not a defect) and stayed broken (`npm test` 34/35)
 * until node P1-N012, per the owner's explicit W-002 licence naming
 * this one test, in this one direction: assert the *agreement itself*
 * against a second, independent parser (`form_check.py`'s own
 * `parse_register`, run fresh via a `python3` subprocess on every test
 * run) rather than a recorded transcript.
 *
 * **RU-014, applied (node P1-N013, the cutover, owner decision on the
 * T017 escalation, option (c)):** the cross-check above needed a
 * second, independent implementation to compare against, and the
 * cutover retires the only one there was — `form_check.py` is deleted
 * in this same commit, so the comparison's premise is gone, not merely
 * inconvenient. Retired here: the `"yields the same {id, stage, hold,
 * parent, line} facts as form_check.py's parser"` test and its
 * `parseLiveRegisterWithPython()` helper. Kept: `"parses every node in
 * the live register, with no parse errors"` below, with the enclosing
 * `describe` block renamed so it no longer claims a cross-check it no
 * longer performs. The lost coverage — that this unit's parser agrees
 * with what `form_check.py` produced — now lives in two places that
 * both predate this commit: `form_check.ts`'s own built-in corpus
 * self-check (spec D3) and `plugin/scripts/run_corpus.ts` (spec B4),
 * which check this same shared unit's parsing against expectations
 * captured from `form_check.py` and reviewed *before* the Python was
 * deleted — over the 18-fixture conformance corpus rather than the
 * live register alone, but the same unit (`parseRegister`) and the
 * same claim.
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

describe("parseRegister — the live register", () => {
  const result = parseRegister(LIVE_REGISTER);

  it("parses every node in the live register, with no parse errors", () => {
    expect(result.errors).toEqual([]);
    expect(result.order.length).toBeGreaterThan(0);
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
