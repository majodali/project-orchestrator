#!/usr/bin/env node
/**
 * Session start (owner, 2026-11-12): bring the checkout up to date,
 * then tell the session what the plan offers. Claude Code runs this as
 * a SessionStart hook (.claude/settings.json). It answers in the
 * hook's JSON form: `additionalContext`, which the agent sees, carries
 * the checkout lines, the plan's brief and what to do with them;
 * `systemMessage`, which the person sees on screen, carries a short
 * form. The agent cannot speak first in an interactive session, so the
 * short form is how the person learns the state before typing (owner,
 * 2026-11-12). Run by hand at a terminal, it prints plain text.
 *
 * Why: a session that started on a stale checkout ran without the
 * repository's own hooks and settings, which Claude Code reads from
 * the main checkout, and nobody saw it. So this fetches origin/main,
 * fast-forwards a checkout that is on main with nothing uncommitted,
 * and says plainly when it could not. It never touches a work branch,
 * never discards anything, and never fails the session.
 *
 * Node, not a shell script, on purpose: the owner works on Windows,
 * where a hook's shell is Git Bash or PowerShell depending on what is
 * installed, and a checked-out `.sh` can carry CRLF line endings. This
 * needs only `node` and `git` on the path. It starts `git` directly,
 * never through a shell.
 */

import { execFileSync } from "node:child_process";
import path from "node:path";

function git(dir: string, ...args: string[]): string {
  return execFileSync("git", ["-C", dir, ...args], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
    maxBuffer: 64 * 1024 * 1024,
  }).trim();
}

function tryGit(dir: string, ...args: string[]): string | null {
  try {
    return git(dir, ...args);
  } catch {
    return null;
  }
}

function same(a: string, b: string): boolean {
  const norm = (p: string): string => {
    const r = path.resolve(p);
    return process.platform === "win32" ? r.toLowerCase() : r;
  };
  return norm(a) === norm(b);
}

/** Brings one checkout up to date, or says why it did not. */
function update(dir: string, label: string): string {
  const branch =
    tryGit(dir, "symbolic-ref", "--quiet", "--short", "HEAD") ?? "detached";
  const behind = tryGit(dir, "rev-list", "--count", "HEAD..origin/main");
  if (behind === null) {
    return `- ${label} (${branch}): could not compare with origin/main. Tell the person.`;
  }
  if (behind === "0") {
    return `- ${label} (${branch}) has everything on origin/main.`;
  }
  if (branch !== "main") {
    return `- ${label} is on ${branch}, ${behind} commit(s) behind origin/main. Not changed: merge origin/main into it if the work needs what is new.`;
  }
  const dirty = tryGit(dir, "status", "--porcelain", "--untracked-files=no");
  if (dirty === null || dirty !== "") {
    return `- ${label} is on main, ${behind} commit(s) behind origin/main, with uncommitted changes. Not updated. Tell the person before any work.`;
  }
  if (tryGit(dir, "merge", "--ff-only", "--quiet", "origin/main") === null) {
    return `- ${label} is on main, ${behind} commit(s) behind origin/main, and could not be fast-forwarded. Tell the person before any work.`;
  }
  return `- ${label} was ${behind} commit(s) behind origin/main and is now up to date.`;
}

/** How the session started, from the hook's input; a run by hand at a
 * terminal has none and counts as a fresh start. */
async function hookInput(): Promise<{ source: string } | null> {
  if (process.stdin.isTTY) return null;
  let text = "";
  try {
    for await (const chunk of process.stdin) text += String(chunk);
    const parsed = JSON.parse(text) as { source?: unknown };
    return {
      source: typeof parsed.source === "string" ? parsed.source : "startup",
    };
  } catch {
    return { source: "startup" };
  }
}

async function main(): Promise<void> {
  const input = await hookInput();
  // A resume or a compaction refreshes the agent's knowledge; only a
  // new or cleared session is told to summarize and ask.
  const fresh = input === null || !["resume", "compact"].includes(input.source);

  const start = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();
  const here = tryGit(start, "rev-parse", "--show-toplevel");
  if (here === null) return; // Not a git checkout: nothing to say.

  // The main checkout: where a worktree's shared .git directory lives.
  // Claude Code reads the repository's hooks and settings from there.
  let mainCheckout = here;
  const common = tryGit(
    here,
    "rev-parse",
    "--path-format=absolute",
    "--git-common-dir",
  );
  if (common !== null && path.basename(common) === ".git") {
    mainCheckout = path.dirname(common);
  }

  const checkout: string[] = [];
  if (tryGit(here, "fetch", "--quiet", "origin", "main") === null) {
    checkout.push(
      "- could not fetch origin/main; what follows may be out of date. Tell the person.",
    );
  }
  checkout.push(update(mainCheckout, "the main checkout"));
  if (!same(here, mainCheckout)) checkout.push(update(here, "this worktree"));
  const trouble = checkout.filter((l) => l.includes("Tell the person"));

  // The plan's brief, read from origin/main with the service's own
  // model code. Imported here, after the checkout is current, and
  // inside the try: a checkout with no `npm ci` still gets the lines
  // above.
  let brief: string;
  let instructions = "";
  let screen: string;
  try {
    const { checkState } =
      await import("project-orchestrator-service/dist/model/check.js");
    const { sessionBrief, briefInstructions, screenSummary } =
      await import("./lib/session-brief.ts");
    const sha = git(here, "rev-parse", "--short", "origin/main");
    const text = git(here, "show", "origin/main:orchestration/state.json");
    const { state, findings } = checkState(JSON.parse(text) as unknown);
    if (state === null) {
      brief = `The plan at origin/main (${sha}) does not validate: ${findings.length} problem(s). Tell the person; no tool can write until it is fixed.`;
      screen = `The plan at origin/main (${sha}) does not validate: ${findings.length} problem(s).`;
    } else {
      brief = sessionBrief(state, `origin/main (${sha})`);
      instructions = briefInstructions(state, fresh);
      screen = screenSummary(state, `origin/main (${sha})`);
    }
  } catch {
    brief =
      "The plan's brief could not be produced (it needs `npm ci` in this checkout). Call task_next to see what is on offer.";
    screen = "The plan could not be read here: run `npm ci` in this checkout.";
  }

  const context = [
    "Checkout:",
    ...checkout,
    "",
    brief,
    ...(instructions === "" ? [] : ["", instructions]),
  ].join("\n");

  if (input === null) {
    // A person at a terminal: what the agent would be told, as text.
    console.log(context);
    return;
  }
  const output: Record<string, unknown> = {
    hookSpecificOutput: {
      hookEventName: "SessionStart",
      additionalContext: context,
    },
  };
  // The screen message only where the person is arriving, and always
  // when something could not be brought up to date.
  if (fresh || trouble.length > 0) {
    output.systemMessage = [
      ...trouble.map((l) =>
        l.replace(/^- /, "").replace(/ Tell the person.*$/, ""),
      ),
      ...(fresh ? [screen] : []),
    ].join("\n");
  }
  // Nothing but the JSON object on stdout, or Claude Code reads it as
  // plain text.
  process.stdout.write(JSON.stringify(output));
}

main()
  .catch((err: unknown) => {
    const message = `Session start check failed: ${err instanceof Error ? err.message.split("\n")[0] : String(err)}.`;
    process.stdout.write(
      process.stdin.isTTY
        ? `${message}\n`
        : JSON.stringify({
            hookSpecificOutput: {
              hookEventName: "SessionStart",
              additionalContext: `${message} Tell the person.`,
            },
            systemMessage: message,
          }),
    );
  })
  .finally(() => {
    process.exitCode = 0;
  });
