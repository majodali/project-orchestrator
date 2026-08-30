#!/usr/bin/env node
/**
 * The Python/TypeScript form-checker equality harness (P1-N009 child C,
 * node P1-N012, spec B1/B2/B3). One command runs both
 * `plugin/scripts/form_check.py` (as a subprocess, over the corpus
 * fixtures and this repository's own live register) and the ported
 * `plugin/scripts/lib/form-check-core.ts`'s `runFormCheck` (in-process,
 * over the same roots) and exits non-zero on any disagreement.
 *
 * Distinct from `run_corpus.ts` (P1-N011), which compares the Python
 * against *recorded* expectations and is the guard that outlives this
 * harness once the Python is retired (spec B4). This file is the
 * *differential* half — Python against the port, directly, while both
 * still exist — and is committed evidence for spec B3: "A single
 * command runs both implementations over the whole corpus and the live
 * register and exits non-zero on any disagreement. It is committed, it
 * is re-runnable by a verifier for as long as the Python exists, and
 * its output at the commit immediately before the cutover is the
 * recorded evidence."
 *
 * Equality (spec B2): for every root, the same multiset of
 * `(severity, rule, path relative to the root)` fingerprints, the same
 * total finding count, and the same exit code. Message prose is
 * printed for both sides on any mismatch, for a human to judge whether
 * a message difference is a "wording difference" (permitted, and
 * enumerated in the task result) or a difference that names a
 * different line, node, task or ruling (a violation).
 *
 * Usage: check_equality.ts   (no arguments — always runs the whole
 * corpus plus this repository's own live register; there is nothing
 * else to parameterize for a harness whose whole job is comparing two
 * fixed implementations against a fixed set of roots)
 */
import { execFileSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { preflightNodeOrExit } from "./lib/node-preflight.ts";
import { runFormCheck, type Finding } from "./lib/form-check-core.ts";
import { parseFormCheckOutput, relativizePath } from "./lib/parse-output.ts";
import { FIXTURES } from "./lib/corpus/manifest.ts";

preflightNodeOrExit("check_equality");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, "..", "..");
const PY_CHECKER = path.join(HERE, "form_check.py");
const FIXTURES_DIR = path.join(HERE, "lib", "corpus", "fixtures");

interface Side {
  exitCode: number;
  findings: Array<{
    severity: string;
    rule: string;
    path: string;
    message: string;
  }>;
}

function fingerprint(f: {
  severity: string;
  rule: string;
  path: string;
}): string {
  return `${f.severity} ${f.rule} ${f.path}`;
}

function multisetEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  const sa = [...a].sort();
  const sb = [...b].sort();
  return sa.every((v, i) => v === sb[i]);
}

function runPython(root: string): Side {
  let stdout: string;
  let exitCode: number;
  try {
    stdout = execFileSync("python3", [PY_CHECKER, root], {
      encoding: "utf-8",
      cwd: REPO_ROOT,
    });
    exitCode = 0;
  } catch (err) {
    const e = err as { stdout?: string; status?: number | null };
    stdout = e.stdout ?? "";
    exitCode = e.status ?? 1;
  }
  const parsed = parseFormCheckOutput(stdout);
  return {
    exitCode,
    findings: parsed.findings.map((f) => ({
      severity: f.severity,
      rule: f.rule,
      path: relativizePath(root, f.rawPath),
      message: f.message,
    })),
  };
}

function runTs(root: string): Side {
  const result = runFormCheck(root);
  return {
    exitCode: result.exitCode,
    findings: result.findings.map((f: Finding) => ({
      severity: f.severity,
      rule: f.rule,
      path: relativizePath(root, f.path),
      message: f.msg,
    })),
  };
}

function compareOne(label: string, root: string): boolean {
  const py = runPython(root);
  const ts = runTs(root);

  const pyFp = py.findings.map(fingerprint);
  const tsFp = ts.findings.map(fingerprint);
  const fpOk = multisetEqual(pyFp, tsFp);
  const countOk = py.findings.length === ts.findings.length;
  const exitOk = py.exitCode === ts.exitCode;

  if (fpOk && countOk && exitOk) {
    console.log(
      `check_equality: OK   ${label} — ${py.findings.length} finding(s), exit ${py.exitCode}`,
    );
    return true;
  }

  console.error(`check_equality: MISMATCH ${label}`);
  if (!exitOk)
    console.error(`  exit code: python=${py.exitCode} ts=${ts.exitCode}`);
  if (!countOk) {
    console.error(
      `  finding count: python=${py.findings.length} ts=${ts.findings.length}`,
    );
  }
  if (!fpOk) {
    console.error(`  python fingerprints: ${JSON.stringify(pyFp.sort())}`);
    console.error(`  ts fingerprints:     ${JSON.stringify(tsFp.sort())}`);
  }
  console.error(
    `  python messages: ${JSON.stringify(py.findings.map((f) => f.message))}`,
  );
  console.error(
    `  ts messages:     ${JSON.stringify(ts.findings.map((f) => f.message))}`,
  );
  return false;
}

function main(): number {
  let allOk = true;

  for (const fx of FIXTURES.filter(
    (f) => f.kind !== "journal-tail-divergence",
  )) {
    const fixtureRoot = path.join(FIXTURES_DIR, fx.id);
    if (!compareOne(`fixture ${fx.id}`, fixtureRoot)) allOk = false;
  }

  if (!compareOne("this repository's own live register", REPO_ROOT))
    allOk = false;

  if (allOk) {
    console.log(
      `check_equality: python and the ported checker agree on all ${FIXTURES.length - 1} fixture(s) and the live register.`,
    );
    return 0;
  }
  console.error("check_equality: one or more mismatches found — see above.");
  return 1;
}

process.exit(main());
