import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import { parseRegister } from "../plugin/scripts/lib/plan-register.ts";

/**
 * D2's executable half, the reading the shared unit is responsible
 * for (P1-N009 spec D2, node P1-N011 criterion 2): the corpus fixture
 * `register-stage-verifiying` carries the misspelled `[verifiying]`
 * stage that encodes the P2-N009 disagreement. Its recorded
 * expectation (lib/corpus/expectations/register-stage-verifiying.json)
 * carries the checker's reading — a register-stage violation. This
 * test carries the other reading directly against the fixture's real
 * file, rather than a similar-looking string elsewhere: the grammar
 * unit parses it without error and reports the stage exactly as
 * written, because it validates nothing (D5) — that judgment belongs
 * to a checker, not the unit.
 */
const FIXTURE_PATH = fileURLToPath(
  new URL(
    "../plugin/scripts/lib/corpus/fixtures/register-stage-verifiying/docs/plan-register.md",
    import.meta.url,
  ),
);

describe("corpus fixture register-stage-verifiying — the unit's reading (D2)", () => {
  it("parses with no error and reports the stage exactly as written", () => {
    const text = readFileSync(FIXTURE_PATH, "utf-8");
    const result = parseRegister(text);

    expect(result.errors).toEqual([]);
    expect(result.nodes.get("P1-N001")?.stage).toBe("verifiying");
  });
});
