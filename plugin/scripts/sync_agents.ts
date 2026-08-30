#!/usr/bin/env node
/**
 * Mirror the primary role agents into the plugin package. Port of
 * `sync_agents.py` (P1-N009 child D, node P1-N013, decision 11: same
 * directory, same base name, new extension), retired in the same
 * commit this file lands in (P1-N009 decision 5).
 *
 * `.claude/agents/` is the SOURCE OF TRUTH: across four trials on two
 * surfaces it is the path that actually loads, while the plugin has
 * never been observed loading (owner ruling, 2026-08-26, closing
 * Risk R9). `plugin/agents/` is generated from it, so the plugin stays
 * a faithful package of the same role contracts.
 *
 * Same behaviour and argument shape as the Python (spec C3):
 * Usage: sync_agents.ts [--check] [project-root]
 *   --check: exit 1 if the package copy is out of sync (for audits),
 *            changing nothing.
 * `project-root` defaults to the current working directory — unlike
 * `sync_shared_unit.ts` (this file's P1-N011 sibling, one directory
 * up), which never guesses a destination for a second repository,
 * this tool only ever mirrors within one repository's own convention
 * (`.claude/agents/` -> `plugin/agents/`), so a project-root guess is
 * safe and matches the Python it replaces.
 */
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import { preflightNodeOrExit } from "./lib/node-preflight.ts";

preflightNodeOrExit("sync_agents");

const HEADER =
  "<!-- Generated from .claude/agents/ by sync_agents.ts - do not" +
  " edit here; edit the primary copy and re-run. -->\n";

/**
 * Inserts HEADER after the frontmatter block, mirroring
 * `sync_agents.py`'s `text.split("---\n", 2)`: if the file opens with
 * a `---\n ... ---\n` frontmatter block, HEADER lands right after its
 * closing `---\n`; otherwise HEADER is simply prepended.
 */
function withHeader(text: string): string {
  const first = text.indexOf("---\n");
  if (first === 0) {
    const second = text.indexOf("---\n", first + 4);
    if (second !== -1) {
      const frontmatter = text.slice(0, second + 4);
      const rest = text.slice(second + 4);
      return `${frontmatter}${HEADER}${rest}`;
    }
  }
  return HEADER + text;
}

function expectedFiles(srcDir: string): Map<string, string> {
  const expected = new Map<string, string>();
  for (const name of readdirSync(srcDir)
    .filter((n) => n.endsWith(".md"))
    .sort()) {
    const text = readFileSync(path.join(srcDir, name), "utf-8");
    expected.set(name, withHeader(text));
  }
  return expected;
}

function currentFiles(dstDir: string): Map<string, string> {
  const current = new Map<string, string>();
  if (!existsSync(dstDir)) return current;
  for (const name of readdirSync(dstDir).filter((n) => n.endsWith(".md"))) {
    current.set(name, readFileSync(path.join(dstDir, name), "utf-8"));
  }
  return current;
}

function mapsEqual(a: Map<string, string>, b: Map<string, string>): boolean {
  if (a.size !== b.size) return false;
  for (const [k, v] of a) {
    if (b.get(k) !== v) return false;
  }
  return true;
}

function driftNames(
  expected: Map<string, string>,
  current: Map<string, string>,
): string[] {
  const drift = new Set<string>();
  for (const k of expected.keys()) {
    if (!current.has(k)) drift.add(k);
  }
  for (const k of current.keys()) {
    if (!expected.has(k)) drift.add(k);
  }
  for (const [k, v] of expected) {
    if (current.has(k) && current.get(k) !== v) drift.add(k);
  }
  return [...drift].sort();
}

function main(): number {
  const args = process.argv.slice(2);
  const check = args.includes("--check");
  const positionals = args.filter((a) => a !== "--check");
  const root = positionals[0] ? path.resolve(positionals[0]) : process.cwd();

  const src = path.join(root, ".claude", "agents");
  const dst = path.join(root, "plugin", "agents");

  if (!existsSync(src)) {
    console.log("sync_agents: no .claude/agents/ here.");
    return 1;
  }

  const expected = expectedFiles(src);
  const current = currentFiles(dst);

  if (mapsEqual(expected, current)) {
    console.log(`sync_agents: in sync (${expected.size} agents).`);
    return 0;
  }

  if (check) {
    const drift = driftNames(expected, current);
    console.log(`sync_agents: OUT OF SYNC: ${drift.join(", ")}`);
    return 1;
  }

  mkdirSync(dst, { recursive: true });
  for (const name of readdirSync(dst).filter((n) => n.endsWith(".md"))) {
    if (!expected.has(name)) unlinkSync(path.join(dst, name));
  }
  for (const [name, text] of expected) {
    writeFileSync(path.join(dst, name), text);
  }
  console.log(`sync_agents: mirrored ${expected.size} agents to ${dst}.`);
  return 0;
}

process.exit(main());
