#!/usr/bin/env node
/**
 * Orchestration form checker (P1-N009 child C, node P1-N012) — the
 * TypeScript port of form_check.py onto the shared Plan-register
 * grammar unit (./lib/plan-register.ts). Mechanizes the deterministic
 * invariants of docs/process/auditing.md for a methodology-managed
 * project. The spec is authoritative: where this checker and the spec
 * disagree, the spec is right and this checker has a bug (methodology
 * Article 3).
 *
 * **Nothing is retired by this file's existence.**
 * `plugin/scripts/form_check.py` stays the invoked checker until the
 * cutover (node P1-N013, decision 5); this file is not yet pointed at
 * by any invocation site. It exists so its finding-for-finding
 * agreement with the Python can be measured (spec B2/B3) while nothing
 * depends on it.
 *
 * The actual checks live in ./lib/form-check-core.ts (`runFormCheck`),
 * a pure function ported line-for-line from form_check.py's own
 * functions; this file is the one entry point (spec C6/C7): it
 * preflights the Node floor, runs the conformance-corpus self-check
 * described below, and prints and exits.
 *
 * **The self-check** (P1-N009 decision 13, spec D3): every invocation
 * runs `runFormCheck` in-process against every fixture in
 * ./lib/corpus/ and compares the result to its recorded expectations
 * (the same shape plugin/scripts/run_corpus.ts checks the Python
 * against) — a regression guard against this checker itself drifting
 * from its own conformance corpus, running before every dispatch and
 * every acceptance because it runs before this checker does anything
 * else. A self-check failure prints a message that names itself
 * clearly as a *checker* problem, not a *project* problem, and exits
 * non-zero without ever reading `root`'s own Plan register: a broken
 * checker must never be mistaken for a malformed project.
 *
 * **Where `--emit=json` would attach** (spec C7, RU-004 — not built
 * here): in `main()`, as a flag branching before the two `for (const
 * line of ...)` print loops below, replacing them with one
 * `JSON.stringify` of `{ selfCheck, result }` and leaving every other
 * code path — the preflight, the self-check, `runFormCheck` itself —
 * untouched.
 *
 * Usage: form_check.ts [project-root]     (default: cwd)
 * Exit 0: no violations (a missing Plan register means the project is
 * not enrolled: reported, exit 0), and the self-check passed.
 * Exit 1: violations found, or the self-check itself failed.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { preflightNodeOrExit } from "./lib/node-preflight.ts";
import { runFormCheck, type Finding } from "./lib/form-check-core.ts";
import { relativizePath } from "./lib/parse-output.ts";
import { FIXTURES, DECLARED_RULE_SET } from "./lib/corpus/manifest.ts";

preflightNodeOrExit("form_check");

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CORPUS_DIR = path.join(HERE, "lib", "corpus");
const FIXTURES_DIR = path.join(CORPUS_DIR, "fixtures");
const EXPECTATIONS_DIR = path.join(CORPUS_DIR, "expectations");

interface ExpectationFile {
  fixture: string;
  exitCode: number;
  totalFindings: number;
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

/**
 * Runs `runFormCheck` in-process against every corpus fixture and
 * compares to the recorded expectations (spec D3). Never touches
 * `root` — this is a self-check of the checker, not a check of the
 * project being audited.
 */
function selfCheck(): { ok: boolean; problems: string[] } {
  const problems: string[] = [];
  const seenRules = new Set<string>();

  for (const fx of FIXTURES.filter(
    (f) => f.kind !== "journal-tail-divergence",
  )) {
    const fixtureRoot = path.join(FIXTURES_DIR, fx.id);
    const expPath = path.join(EXPECTATIONS_DIR, `${fx.id}.json`);
    if (!existsSync(expPath)) {
      problems.push(`fixture ${fx.id}: no recorded expectations at ${expPath}`);
      continue;
    }
    const expected = JSON.parse(
      readFileSync(expPath, "utf-8"),
    ) as ExpectationFile;
    const result = runFormCheck(fixtureRoot);
    const relFindings = result.findings.map((f: Finding) => ({
      severity: f.severity,
      rule: f.rule,
      path: relativizePath(fixtureRoot, f.path),
    }));
    for (const f of relFindings) seenRules.add(f.rule);

    const gotFp = relFindings.map(fingerprint);
    const wantFp = expected.findings.map(fingerprint);
    const fpOk = multisetEqual(gotFp, wantFp);
    const countOk = relFindings.length === expected.totalFindings;
    const exitOk = result.exitCode === expected.exitCode;

    if (!fpOk || !countOk || !exitOk) {
      problems.push(
        `fixture ${fx.id}: expected ${expected.totalFindings} finding(s), exit ${expected.exitCode} ` +
          `[${wantFp.sort().join(" | ")}] — got ${relFindings.length} finding(s), exit ${result.exitCode} ` +
          `[${gotFp.sort().join(" | ")}]`,
      );
    }
  }

  const missingRules = DECLARED_RULE_SET.filter((r) => !seenRules.has(r));
  if (missingRules.length > 0) {
    problems.push(`the corpus never provoked: ${missingRules.join(", ")}`);
  }

  return { ok: problems.length === 0, problems };
}

function main(): number {
  // Deliberately not resolved to an absolute path: form_check.py's
  // `Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()` keeps
  // whatever form the caller passed, so every printed finding path is
  // relative when the caller passes a relative root. Resolving here
  // would silently change every finding's displayed path from what
  // the Python prints for the same invocation (spec B2).
  const root = process.argv[2] ?? process.cwd();

  const self = selfCheck();
  if (!self.ok) {
    console.error(
      "form_check: SELF-CHECK FAILED — this checker disagrees with its own " +
        "conformance corpus (plugin/scripts/lib/corpus/). This is a problem with " +
        "the checker, not with your project: do not edit docs/plan-register.md, " +
        "docs/backlog.md, docs/cost-log.md, docs/rulings.md or " +
        "orchestration/journal.jsonl in response to this message.",
    );
    for (const p of self.problems) console.error(`  - ${p}`);
    console.error(
      "form_check: report this to the checker's maintainers " +
        "(see plugin/scripts/lib/corpus/README.md).",
    );
    return 1;
  }

  const result = runFormCheck(root);
  for (const line of result.stdoutLines) console.log(line);
  return result.exitCode;
}

process.exit(main());
