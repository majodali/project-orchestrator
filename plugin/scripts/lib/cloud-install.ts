/**
 * Dependencies for a cloud session (owner, 2026-11-13). A cloud
 * session starts on a fresh clone with nothing installed, so the
 * session start hook could not read the plan there and showed no
 * summary. In a cloud session, and only there, the hook installs this
 * repository's dependencies first when they are missing.
 *
 * Only in a cloud session, on purpose. On the person's own machine an
 * install is theirs to run: it is slow, it changes their checkout, and
 * on Windows `npm` is `npm.cmd`, which a process cannot start without
 * a shell. A cloud container is Linux, is thrown away after the
 * session, and has no person to run the install before the hook.
 *
 * Kept apart from the hook so that the decision is tested without
 * running an install.
 */

import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";

/** The file the hook imports the service's model code from. */
const SERVICE_ENTRY = path.join(
  "node_modules",
  "project-orchestrator-service",
  "dist",
  "model",
  "check.js",
);

/** What the hook needs from the world, replaceable in a test. */
export interface InstallDeps {
  exists: (file: string) => boolean;
  /** Runs `npm ci` in `dir`; throws when it fails. */
  install: (dir: string) => void;
}

export type InstallResult =
  /** Nothing to do: not a cloud session, already installed, or not a
   * checkout that can be installed. */
  | { kind: "not-needed" }
  | { kind: "installed" }
  | { kind: "failed"; why: string };

/** Claude Code sets this in a cloud session, and nowhere else. */
export function isCloudSession(env: NodeJS.ProcessEnv): boolean {
  return env.CLAUDE_CODE_REMOTE === "true";
}

/** Whether `root` is a checkout whose dependencies are missing. */
export function needsInstall(
  root: string,
  exists: InstallDeps["exists"],
): boolean {
  return (
    exists(path.join(root, "package.json")) &&
    exists(path.join(root, "package-lock.json")) &&
    !exists(path.join(root, SERVICE_ENTRY))
  );
}

const realDeps: InstallDeps = {
  exists: existsSync,
  install: (dir) => {
    // Output discarded: the hook's stdout carries one JSON object and
    // nothing else. The limit sits under the hook's own timeout in
    // .claude/settings.json, so a slow install ends here, with a
    // message, and not in a cancelled hook.
    execFileSync("npm", ["ci", "--no-audit", "--no-fund"], {
      cwd: dir,
      stdio: ["ignore", "ignore", "pipe"],
      encoding: "utf8",
      timeout: 240_000,
    });
  },
};

/** Installs the dependencies of the checkout at `root` when this is a
 * cloud session and they are missing. Never throws. */
export function installForCloud(
  env: NodeJS.ProcessEnv,
  root: string,
  deps: InstallDeps = realDeps,
): InstallResult {
  if (!isCloudSession(env) || !needsInstall(root, deps.exists))
    return { kind: "not-needed" };
  try {
    deps.install(root);
  } catch (err: unknown) {
    const text = err instanceof Error ? err.message : String(err);
    return { kind: "failed", why: text.split("\n")[0] ?? text };
  }
  return needsInstall(root, deps.exists)
    ? {
        kind: "failed",
        why: "`npm ci` finished, but the service package is still missing",
      }
    : { kind: "installed" };
}
