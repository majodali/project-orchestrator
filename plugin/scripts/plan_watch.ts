#!/usr/bin/env node
/**
 * The watcher of the orchestrator session (P2-N031;
 * docs/specs/orchestrator-session.md, S6). Run as a background
 * command, it wakes the session by exiting: it costs no tokens while
 * it waits.
 *
 * Once a minute it fetches `origin/main`, reads the state file, the
 * journal, the settings and the role agents at that commit, and calls
 * `decide` (./lib/orchestrate.ts) with the session snapshot and the
 * current time. It exits 0 and prints
 * `{ "actions": [...], "keys": [...], "new": [...] }` as soon as one
 * action's key is not in the acted file. A key that disappears does
 * not wake it. A `check` falls due by time, so it wakes without a
 * commit.
 *
 * Usage: plan_watch.ts [--state <path>] [--journal <path>]
 *          [--settings <path>] [--agents <dir>] [--sessions <file>]
 *          [--self <session>] [--now <ISO 8601 time>]
 *          [--acted <file>] [--interval <seconds>]
 *          [--max-minutes <minutes>] [--once]
 *
 * `--state`, `--journal`, `--settings` and `--agents` are paths in the
 * repository, read at `origin/main`; `--sessions` and `--acted` are
 * local files. `--once` makes one poll, prints and exits, new keys or
 * none: the orchestrator's run within a turn.
 *
 * Exit 0: it printed. With `"new": []` the watcher ended at its time
 * limit and is to be started again. Exit 1: `origin/main` could not
 * be fetched. Exit 2: an option it does not know.
 */
import { preflightNodeOrExit } from "./lib/node-preflight.ts";

preflightNodeOrExit("plan_watch");

const VALUED = [
  "state",
  "journal",
  "settings",
  "agents",
  "sessions",
  "self",
  "now",
  "acted",
  "interval",
  "max-minutes",
] as const;
type Valued = (typeof VALUED)[number];

function usage(problem: string): never {
  console.error(`plan_watch: ${problem}`);
  console.error(
    `Options, each with a value: ${VALUED.map((o) => `--${o}`).join(", ")}. Without one: --once.`,
  );
  process.exit(2);
}

const given: Partial<Record<Valued, string>> = {};
let once = false;
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) {
  const name = argv[i]!;
  if (name === "--once") {
    once = true;
    continue;
  }
  const option = VALUED.find((o) => `--${o}` === name);
  if (option === undefined) usage(`unknown option ${name}`);
  const value = argv[++i];
  if (value === undefined) usage(`${name} needs a value`);
  given[option] = value;
}

function positive(option: Valued, fallback: number): number {
  const text = given[option];
  if (text === undefined) return fallback;
  const n = Number(text);
  if (!Number.isFinite(n) || n <= 0)
    usage(`--${option} is no number above 0: ${text}`);
  return n;
}

const {
  DEFAULT_INTERVAL_SECONDS,
  DEFAULT_MAX_MINUTES,
  MAX_FAILED_FETCHES,
  fetchMain,
  poll,
} = await import("./lib/plan-watch.ts");

const intervalMs = positive("interval", DEFAULT_INTERVAL_SECONDS) * 1000;
const maxMs = positive("max-minutes", DEFAULT_MAX_MINUTES) * 60_000;
const cwd = process.cwd();
const paths = {
  state: given.state ?? "orchestration/state.json",
  journal: given.journal ?? "orchestration/journal.jsonl",
  settings: given.settings ?? "orchestration/orchestrator.json",
  agents: given.agents ?? ".claude/agents",
  sessions: given.sessions ?? null,
  acted: given.acted ?? null,
};

const started = Date.now();
let failed = 0;
for (;;) {
  if (fetchMain(cwd)) {
    failed = 0;
  } else {
    failed++;
    if (once || failed >= MAX_FAILED_FETCHES) {
      console.error(
        `plan_watch: git fetch of origin main failed${once ? "" : ` ${failed} times in a row`}; nothing was decided.`,
      );
      process.exit(1);
    }
  }
  if (failed === 0) {
    const result = poll(
      cwd,
      paths,
      given.self ?? null,
      given.now ?? null,
      new Date(),
    );
    const ended = Date.now() - started >= maxMs;
    if (once || result.new.length > 0 || ended) {
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    }
  }
  await new Promise((resolve) => setTimeout(resolve, intervalMs));
}
