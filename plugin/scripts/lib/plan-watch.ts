/**
 * The watcher's parts (P2-N031; docs/specs/orchestrator-session.md,
 * S6): what it reads at `origin/main`, and which action keys are new.
 *
 * The decision stays `decide` in ./orchestrate.ts, which makes no git
 * call. The git calls are here: a fetch of `origin/main`, and
 * `git show` for each file read at that commit. The state file, the
 * journal, the settings and the role agents are all read at the same
 * commit, so a replacement orchestrator session prints the same keys
 * from the same commit (criterion 17) whatever its own checkout holds.
 * The session snapshot and the acted file are local files.
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

import {
  type Action,
  ROLES,
  decide,
  parseJournal,
  parseModels,
  parseNow,
  parseSessions,
  parseSettings,
  parseState,
} from "./orchestrate.ts";

/** The commit the watcher reads. */
export const WATCHED_REF = "origin/main";
/** Seconds between two polls: a new commit wakes the orchestrator
 * within two minutes (criterion 9). */
export const DEFAULT_INTERVAL_SECONDS = 60;
/** Minutes after which the watcher ends by itself with nothing new: a
 * background command lives at most two hours (plan section 5). */
export const DEFAULT_MAX_MINUTES = 115;
/** Failed fetches in a row after which the watcher gives up. */
export const MAX_FAILED_FETCHES = 5;

export interface WatchPaths {
  /** Paths in the repository, read at `origin/main`. */
  state: string;
  journal: string;
  settings: string;
  agents: string;
  /** Local files; null when not given. */
  sessions: string | null;
  acted: string | null;
}

export interface WatchResult {
  actions: Action[];
  /** Every action's key: what the orchestrator writes to the acted
   * file once it has carried the new ones out. */
  keys: string[];
  /** The keys the acted file lacks: the actions to carry out. */
  new: string[];
}

function git(cwd: string, args: string[]): string | null {
  const out = spawnSync("git", args, {
    cwd,
    encoding: "utf8",
    maxBuffer: 256 * 1024 * 1024,
  });
  return out.status === 0 ? out.stdout : null;
}

/** Fetches `main` into `origin/main`. False when the fetch failed. */
export function fetchMain(cwd: string): boolean {
  return (
    git(cwd, [
      "fetch",
      "--quiet",
      "origin",
      "+refs/heads/main:refs/remotes/origin/main",
    ]) !== null
  );
}

/** A file's text at `origin/main`, or null when it is not there. */
export function showAtMain(cwd: string, file: string): string | null {
  return git(cwd, ["show", `${WATCHED_REF}:${file.replace(/^\.\//, "")}`]);
}

function readLocal(file: string | null): string | null {
  if (file === null) return null;
  try {
    return readFileSync(file, "utf8");
  } catch {
    return null;
  }
}

/** The acted file: a JSON list of action keys. A file that is
 * missing, or is no list of strings, reads as an empty list, so every
 * action is new: the watcher wakes rather than stay silent. */
export function parseActed(text: string | null): string[] {
  if (text === null) return [];
  try {
    const v: unknown = JSON.parse(text);
    if (!Array.isArray(v) || !v.every((k) => typeof k === "string")) return [];
    return v;
  } catch {
    return [];
  }
}

/** The keys of `actions` that `acted` lacks, in the actions' order. A
 * key that `acted` holds and the actions no longer print is nothing
 * new (S6: a key that disappears does not wake the watcher). */
export function newKeys(actions: Action[], acted: string[]): string[] {
  const done = new Set(acted);
  return actions.map((a) => a.key).filter((k) => !done.has(k));
}

/** One poll, after the fetch: reads the inputs and decides. */
export function poll(
  cwd: string,
  paths: WatchPaths,
  self: string | null,
  now: string | null,
  clock: Date,
): WatchResult {
  const { actions } = decide({
    state: parseState(showAtMain(cwd, paths.state)),
    journal: parseJournal(showAtMain(cwd, paths.journal)),
    settings: parseSettings(showAtMain(cwd, paths.settings)),
    models: parseModels(
      Object.fromEntries(
        ROLES.map((role) => [
          role,
          showAtMain(cwd, `${paths.agents.replace(/\/$/, "")}/${role}.md`),
        ]),
      ),
    ),
    sessions: parseSessions(readLocal(paths.sessions)),
    self,
    now: parseNow(now, clock),
  });
  return {
    actions,
    keys: actions.map((a) => a.key),
    new: newKeys(actions, parseActed(readLocal(paths.acted))),
  };
}
