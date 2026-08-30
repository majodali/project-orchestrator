#!/usr/bin/env node
/**
 * Render the tail of a project's orchestration run journal.
 *
 * Port of journal_tail.py (P1-N009 child A, node P1-N010) — same
 * directory, same base name, new extension (decision 11). Nothing is
 * retired: plugin/scripts/journal_tail.py remains the invoked tool
 * until the cutover (P1-N013, decision 5); this file is not yet
 * pointed at by any invocation site.
 *
 * The owner's feed (docs/process/observability.md): recent events
 * with their Plan-register context, session IDs as drill-down keys.
 * Its node-name lookup goes through the shared grammar unit
 * (./lib/plan-register.ts); it carries no grammar of its own (D1).
 *
 * Usage: journal_tail.ts [N] [project-root]   (defaults: 10, cwd)
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { preflightNodeOrExit } from "./lib/node-preflight.ts";
import { parseRegister } from "./lib/plan-register.ts";

preflightNodeOrExit("journal_tail");

/**
 * `key in e ? e[key] : dflt` — mirrors Python's `dict.get(key, dflt)`
 * exactly, including returning an explicit `null` value rather than
 * `dflt` when the key is present but its value is JSON `null` (unlike
 * JS's `??`, which cannot distinguish "absent" from "present and
 * null").
 */
function get(
  e: Record<string, unknown>,
  key: string,
  dflt: unknown = undefined,
): unknown {
  return key in e ? e[key] : dflt;
}

function nodeNames(root: string): Map<string, string> {
  const registerPath = path.join(root, "docs", "plan-register.md");
  const names = new Map<string, string>();
  if (existsSync(registerPath)) {
    const text = readFileSync(registerPath, "utf-8");
    const { nodes, order } = parseRegister(text);
    for (const id of order) {
      names.set(id, nodes.get(id)!.title);
    }
  }
  return names;
}

function main(): number {
  const args = process.argv.slice(2);
  const isDigit = (s: string): boolean => /^\d+$/.test(s);

  const n = args.length > 0 && isDigit(args[0]!) ? parseInt(args[0]!, 10) : 10;
  const root =
    args.length > 1
      ? args[1]!
      : args.length > 0 && !isDigit(args[0]!)
        ? args[0]!
        : process.cwd();

  const journalPath = path.join(root, "orchestration", "journal.jsonl");
  if (!existsSync(journalPath)) {
    console.log("journal_tail: no orchestration/journal.jsonl here.");
    return 1;
  }

  const names = nodeNames(root);
  const lines = readFileSync(journalPath, "utf-8")
    .split("\n")
    .filter((l) => l.trim() !== "");

  for (const line of lines.slice(-n)) {
    let e: Record<string, unknown>;
    try {
      e = JSON.parse(line) as Record<string, unknown>;
    } catch {
      console.log(`  !! unparseable line: ${line.slice(0, 80)}`);
      continue;
    }
    const node = (get(e, "node") as string | undefined) || "-";
    const label = names.has(node) ? `${node} (${names.get(node)})` : node;
    const bits: string[] = [
      String(get(e, "ts", "?")),
      String(get(e, "event", "?")).padEnd(18),
      `task=${(get(e, "task") as string | undefined) || "-"}`,
      label,
      `stage=${(get(e, "stage") as string | undefined) || "-"}`,
      `role=${(get(e, "role") as string | undefined) || "-"}`,
    ];
    if (get(e, "model")) bits.push(`model=${String(get(e, "model"))}`);
    if (get(e, "tokens_in") || get(e, "tokens_out")) {
      bits.push(
        `tok=${String(get(e, "tokens_in", "?"))}/${String(get(e, "tokens_out", "?"))}`,
      );
    }
    if (get(e, "session")) bits.push(`session=${String(get(e, "session"))}`);
    if (get(e, "note")) bits.push(`— ${String(get(e, "note"))}`);
    console.log(bits.join("  "));
  }
  console.log(
    `journal_tail: showed ${Math.min(n, lines.length)} of ${lines.length} events.`,
  );
  return 0;
}

process.exit(main());
