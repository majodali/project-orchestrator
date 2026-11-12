#!/usr/bin/env node
/**
 * Prints the plan's brief for a starting session (./lib/session-brief.ts).
 * Run by .claude/hooks/session-start.sh after it has fetched origin/main;
 * what this prints becomes part of the session's context. Reads the
 * state file at a git ref (default origin/main), never the working
 * tree, so a checkout on a work branch still sees the current plan.
 * It changes nothing and needs no token.
 */

import { execFileSync } from "node:child_process";

import { checkState } from "project-orchestrator-service/dist/model/check.js";

import { sessionBrief } from "./lib/session-brief.ts";

const ref = process.argv[2] ?? "origin/main";

function git(...args: string[]): string {
  return execFileSync("git", args, {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

try {
  const sha = git("rev-parse", "--short", ref).trim();
  const text = git("show", `${ref}:orchestration/state.json`);
  const { state, findings } = checkState(JSON.parse(text) as unknown);
  if (state === null) {
    console.log(
      `The plan at ${ref} (${sha}) does not validate: ${findings.length} problem(s). Tell the person; no tool can write until it is fixed.`,
    );
  } else {
    console.log(sessionBrief(state, `${ref} (${sha})`));
  }
} catch (err) {
  console.log(
    `The plan could not be read at ${ref}: ${err instanceof Error ? err.message.split("\n")[0] : String(err)}`,
  );
}
