/**
 * The Node-floor preflight (P1-N009 plan decision 12, RU-013): every
 * tool this node ships checks the running Node version before doing
 * any work, and exits loudly — naming what was required and what was
 * found — rather than degrading quietly or letting an unrelated
 * failure stand in for the real cause (R13).
 *
 * The comparison is a pure function, `checkNodeVersion`, so it can be
 * driven directly by a table of version strings in this unit's own
 * tests without needing to actually run under each version being
 * tested (P1-N009 spec criterion 5).
 *
 * Not part of the shared grammar unit (plan-register.ts) and not
 * subject to T1's zero-import constraint — that constraint is about
 * the thing that travels to a second repository (P1-N009 decision 1 /
 * RU-012); this preflight is local tooling policy, not shared
 * grammar.
 */

export interface VersionCheckResult {
  ok: boolean;
  /** Present when ok is false: why the running version fails. */
  reason?: string;
}

interface ParsedVersion {
  major: number;
  minor: number;
  patch: number;
}

const VERSION_RE = /^v?(\d+)\.(\d+)\.(\d+)/;

function parseVersion(v: string): ParsedVersion | null {
  const m = VERSION_RE.exec(v.trim());
  if (!m) return null;
  return {
    major: Number(m[1]),
    minor: Number(m[2]),
    patch: Number(m[3]),
  };
}

function isAtLeast(v: ParsedVersion, floor: ParsedVersion): boolean {
  if (v.major !== floor.major) return v.major > floor.major;
  if (v.minor !== floor.minor) return v.minor > floor.minor;
  return v.patch >= floor.patch;
}

// The declared floor (P1-N009 plan decision 12, RU-013): Node's type
// stripping is unflagged from v22.18 and from v23.6; below that on
// the 22.x/23.x lines it needs a flag or is unavailable (Node 20
// cannot do it at all), verified in this environment on Node
// v22.22.2. Node 24 and later are treated as meeting the floor: no
// later regression has been reported, and this is the one assumption
// this preflight makes beyond what was verified directly.
const FLOOR_22 = { major: 22, minor: 18, patch: 0 };
const FLOOR_23 = { major: 23, minor: 6, patch: 0 };

export const REQUIRED_VERSION_MESSAGE = ">=22.18.0 (>=23.6.0 on the 23.x line)";

/**
 * Pure comparison: does `versionString` (as `process.version` reports
 * it, e.g. "v22.22.2") meet the declared floor? No side effects, no
 * reference to `process.version` itself — driven directly by a table
 * of version strings in this unit's tests.
 */
export function checkNodeVersion(versionString: string): VersionCheckResult {
  const v = parseVersion(versionString);
  if (!v) {
    return {
      ok: false,
      reason: `could not parse a version number out of ${JSON.stringify(versionString)}`,
    };
  }
  if (v.major < 22) {
    return {
      ok: false,
      reason: `Node ${v.major}.x cannot run type-stripped TypeScript`,
    };
  }
  if (v.major === 22 && !isAtLeast(v, FLOOR_22)) {
    return {
      ok: false,
      reason: "Node 22.x needs >=22.18.0 for unflagged type stripping",
    };
  }
  if (v.major === 23 && !isAtLeast(v, FLOOR_23)) {
    return {
      ok: false,
      reason: "Node 23.x needs >=23.6.0 for unflagged type stripping",
    };
  }
  return { ok: true };
}

/**
 * Runs the preflight against the actual running interpreter and exits
 * non-zero — printing the version required and the version found —
 * if it fails. Every tool this node ships calls this before doing any
 * work.
 */
export function preflightNodeOrExit(
  toolName: string,
  versionString: string = process.version,
): void {
  const result = checkNodeVersion(versionString);
  if (result.ok) return;
  console.error(
    `${toolName}: requires Node ${REQUIRED_VERSION_MESSAGE}; found ` +
      `${versionString}. ${result.reason ?? ""}`.trim(),
  );
  console.error("Install or switch to a supported Node version, then re-run.");
  process.exit(1);
}
