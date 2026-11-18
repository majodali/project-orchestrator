#!/usr/bin/env node
/**
 * Vendors the cost hook outward to a second repository (RU-012: how
 * two repositories share one unit of code, absent a package
 * registry — one canonical copy, vendored outward by a generator
 * with a `--check` drift mode; the consumer never edits its copy).
 *
 * This repository owns the hook's specification and its two files:
 * `plugin/scripts/task_cost_hook.ts` and
 * `plugin/scripts/lib/task-cost.ts`. A work repository enlisted for
 * delegated sessions (docs/process/how-we-work.md, Enlisting a
 * repository) carries a copy of both at the same relative paths
 * (docs/specs/orchestrator-session.md, S7).
 *
 * Unlike `sync_agents.ts`, which only ever mirrors within one
 * repository's own convention (`.claude/agents/` -> `plugin/agents/`)
 * and so may safely default its destination to the current working
 * directory, this generator never guesses a destination for a second
 * repository: the target root is a required argument.
 *
 * Usage: vendor_cost_hook.ts [--check] <target-root>
 *   --check: exit 1 if the target's copy is out of sync (for an
 *            audit against a read-only checkout of the other
 *            repository), changing nothing.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import { preflightNodeOrExit } from "./lib/node-preflight.ts";

preflightNodeOrExit("vendor_cost_hook");

const FILES = [
  "plugin/scripts/task_cost_hook.ts",
  "plugin/scripts/lib/task-cost.ts",
] as const;

function header(sourcePath: string): string {
  return (
    `// Generated from ${sourcePath} in majodali/project-orchestrator` +
    " by vendor_cost_hook.ts (RU-012) - do not edit here; edit the" +
    " source and re-run.\n"
  );
}

/** Inserts the header after a shebang line, when there is one, so the
 * vendored file still runs as a script; otherwise prepends it. */
function withHeader(text: string, sourcePath: string): string {
  const h = header(sourcePath);
  if (text.startsWith("#!")) {
    const nl = text.indexOf("\n");
    if (nl !== -1) return text.slice(0, nl + 1) + h + text.slice(nl + 1);
  }
  return h + text;
}

function expectedFiles(sourceRoot: string): Map<string, string> {
  const expected = new Map<string, string>();
  for (const rel of FILES) {
    const text = readFileSync(path.join(sourceRoot, rel), "utf-8");
    expected.set(rel, withHeader(text, rel));
  }
  return expected;
}

function currentFiles(targetRoot: string): Map<string, string> {
  const current = new Map<string, string>();
  for (const rel of FILES) {
    const file = path.join(targetRoot, rel);
    if (existsSync(file)) current.set(rel, readFileSync(file, "utf-8"));
  }
  return current;
}

function driftNames(
  expected: Map<string, string>,
  current: Map<string, string>,
): string[] {
  const drift = new Set<string>();
  for (const [rel, text] of expected) {
    if (current.get(rel) !== text) drift.add(rel);
  }
  return [...drift].sort();
}

function main(): number {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const positionals = args.filter((a) => a !== "--check");
  const targetArg = positionals[0];

  if (!targetArg) {
    console.log(
      "vendor_cost_hook: usage: vendor_cost_hook.ts [--check] <target-root>",
    );
    return 1;
  }

  const sourceRoot = path.resolve(import.meta.dirname, "..", "..");
  const targetRoot = path.resolve(targetArg);

  const expected = expectedFiles(sourceRoot);
  const current = currentFiles(targetRoot);
  const drift = driftNames(expected, current);

  if (drift.length === 0) {
    console.log(`vendor_cost_hook: in sync (${expected.size} files).`);
    return 0;
  }

  if (check) {
    console.log(`vendor_cost_hook: OUT OF SYNC: ${drift.join(", ")}`);
    return 1;
  }

  for (const rel of drift) {
    const dest = path.join(targetRoot, rel);
    mkdirSync(path.dirname(dest), { recursive: true });
    writeFileSync(dest, expected.get(rel) ?? "");
  }
  console.log(
    `vendor_cost_hook: vendored ${drift.length} file(s) to ${targetRoot}.`,
  );
  return 0;
}

process.exit(main());
