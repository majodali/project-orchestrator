#!/usr/bin/env node
/**
 * Prints what the orchestrator session does next, as
 * `{ "actions": [...] }` (P2-N030; docs/specs/orchestrator-session.md,
 * S1). The decision is `decide` in ./lib/orchestrate.ts; this command
 * only reads the inputs, each given as a path. It makes no network
 * call and no git call: the caller fetches, and passes the state file
 * and the journal it wants read.
 *
 * Usage: orchestrate_next.ts [--state <file>] [--journal <file>]
 *          [--settings <file>] [--agents <dir>] [--sessions <file>]
 *          [--self <session>] [--now <ISO 8601 time>]
 *
 * It exits 0 whenever it printed actions, the `input` report of an
 * unreadable input included: that report is the answer. It exits 2
 * for an option it does not know.
 */
import { readFileSync } from "node:fs";
import path from "node:path";

import { preflightNodeOrExit } from "./lib/node-preflight.ts";

preflightNodeOrExit("orchestrate_next");

const OPTIONS = [
  "state",
  "journal",
  "settings",
  "agents",
  "sessions",
  "self",
  "now",
] as const;
type Option = (typeof OPTIONS)[number];

function usage(problem: string): never {
  console.error(`orchestrate_next: ${problem}`);
  console.error(
    `Options, each with a value: ${OPTIONS.map((o) => `--${o}`).join(", ")}.`,
  );
  process.exit(2);
}

const given: Partial<Record<Option, string>> = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i += 2) {
  const name = argv[i]!;
  const option = OPTIONS.find((o) => `--${o}` === name);
  if (option === undefined) usage(`unknown option ${name}`);
  const value = argv[i + 1];
  if (value === undefined) usage(`${name} needs a value`);
  given[option] = value;
}

function read(file: string): string | null {
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

const {
  ROLES,
  decide,
  parseJournal,
  parseModels,
  parseNow,
  parseSessions,
  parseSettings,
  parseState,
} = await import("./lib/orchestrate.ts");

const agents = given.agents ?? ".claude/agents";
const result = decide({
  state: parseState(read(given.state ?? "orchestration/state.json")),
  journal: parseJournal(read(given.journal ?? "orchestration/journal.jsonl")),
  settings: parseSettings(
    read(given.settings ?? "orchestration/orchestrator.json"),
  ),
  models: parseModels(
    Object.fromEntries(
      ROLES.map((role) => [role, read(path.join(agents, `${role}.md`))]),
    ),
  ),
  sessions: parseSessions(
    given.sessions === undefined ? null : read(given.sessions),
  ),
  self: given.self ?? null,
  now: parseNow(given.now ?? null, new Date()),
});

console.log(JSON.stringify(result, null, 2));
