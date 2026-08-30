import { describe, expect, it } from "vitest";

import { checkNodeVersion } from "../plugin/scripts/lib/node-preflight.ts";

/**
 * The Node-floor preflight's version comparison (P1-N009 spec
 * criterion 5, RU-013) — driven directly against a table of version
 * strings, never against the running interpreter, since there is no
 * way to make the running interpreter actually be an unsupported
 * version in order to test the failure path.
 */
describe("checkNodeVersion", () => {
  const table: Array<[version: string, ok: boolean]> = [
    // Below the 22.x floor (22.18.0).
    ["v22.17.9", false],
    ["v22.0.0", false],
    // On the 22.x floor and above it.
    ["v22.18.0", true],
    ["v22.22.2", true],
    // Below the 23.x floor (23.6.0) — 23.x is a separate line with
    // its own, later, floor.
    ["v23.5.9", false],
    ["v23.0.0", false],
    // On the 23.x floor and above it.
    ["v23.6.0", true],
    ["v23.9.1", true],
    // A whole major below 22 entirely.
    ["v20.11.0", false],
    ["v18.19.0", false],
    // 24.x and later: no declared ceiling.
    ["v24.0.0", true],
    // A prerelease string — parses its numeric prefix and compares
    // against the floor as usual.
    ["v22.18.0-nightly20260101abcdef", true],
    ["v22.17.0-nightly20260101abcdef", false],
  ];

  it.each(table)("%s -> ok=%s", (version, ok) => {
    expect(checkNodeVersion(version).ok).toBe(ok);
  });

  it("names what was required and what was found when it fails", () => {
    const result = checkNodeVersion("v20.11.0");
    expect(result.ok).toBe(false);
    expect(result.reason).toBeTruthy();
  });

  it("reports a parse failure for an unparseable string", () => {
    const result = checkNodeVersion("not-a-version");
    expect(result.ok).toBe(false);
    expect(result.reason).toContain("could not parse");
  });
});
