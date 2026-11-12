import { execFileSync, spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync, appendFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

/**
 * The session start hook (plugin/scripts/session_start.ts): it brings
 * a clean checkout on main up to date, leaves everything else alone
 * and says so, and never fails. Run here against small throwaway
 * repositories; the plan's brief has its own test.
 */

const SCRIPT = path.resolve(
  fileURLToPath(import.meta.url),
  "..",
  "..",
  "plugin",
  "scripts",
  "session_start.ts",
);
const dirs: string[] = [];
const ENV = {
  ...process.env,
  GIT_AUTHOR_NAME: "t",
  GIT_AUTHOR_EMAIL: "t@example.invalid",
  GIT_COMMITTER_NAME: "t",
  GIT_COMMITTER_EMAIL: "t@example.invalid",
};

function git(dir: string, ...args: string[]): string {
  return execFileSync(
    "git",
    ["-C", dir, "-c", "commit.gpgsign=false", ...args],
    { encoding: "utf8", env: ENV, stdio: ["ignore", "pipe", "ignore"] },
  ).trim();
}

/** An origin with four commits on main, and a clone three behind. */
function staleClone(): { clone: string; root: string } {
  const root = mkdtempSync(path.join(tmpdir(), "session-start-"));
  dirs.push(root);
  const seed = path.join(root, "seed");
  execFileSync("git", ["init", "-q", "-b", "main", seed], { env: ENV });
  for (let i = 0; i < 4; i += 1) {
    writeFileSync(path.join(seed, "file.txt"), `${i}\n`);
    git(seed, "add", "-A");
    git(seed, "commit", "-q", "-m", `commit ${i}`);
  }
  const origin = path.join(root, "origin.git");
  execFileSync("git", ["clone", "-q", "--bare", seed, origin], { env: ENV });
  const clone = path.join(root, "clone");
  execFileSync("git", ["clone", "-q", origin, clone], { env: ENV });
  git(clone, "reset", "-q", "--hard", "HEAD~3");
  return { clone, root };
}

function run(projectDir: string): { status: number | null; out: string } {
  const result = spawnSync(process.execPath, [SCRIPT], {
    cwd: projectDir,
    encoding: "utf8",
    env: { ...ENV, CLAUDE_PROJECT_DIR: projectDir },
  });
  return { status: result.status, out: result.stdout };
}

const behind = (dir: string): string =>
  git(dir, "rev-list", "--count", "HEAD..origin/main");

afterEach(() => {
  for (const dir of dirs.splice(0))
    rmSync(dir, { recursive: true, force: true });
});

describe("plugin/scripts/session_start.ts", () => {
  it("fast-forwards a clean checkout on main that is behind, and says so", () => {
    const { clone } = staleClone();
    const { status, out } = run(clone);
    expect(status).toBe(0);
    expect(out).toContain(
      "- the main checkout was 3 commit(s) behind origin/main and is now up to date.",
    );
    expect(behind(clone)).toBe("0");
    // No plan in this repository: the brief falls back, the hook still succeeds.
    expect(out).toContain("Call task_next to see what is on offer.");
  });

  it("leaves a checkout with an uncommitted change alone, and tells the session to tell the person", () => {
    const { clone } = staleClone();
    appendFileSync(path.join(clone, "file.txt"), "mine\n");
    const { status, out } = run(clone);
    expect(status).toBe(0);
    expect(out).toContain(
      "with uncommitted changes. Not updated. Tell the person before any work.",
    );
    expect(behind(clone)).toBe("3");
    expect(git(clone, "status", "--porcelain")).toContain("file.txt");
  });

  it("updates a stale main checkout from a worktree, and only reports the work branch", () => {
    const { clone, root } = staleClone();
    const worktree = path.join(root, "worktree");
    git(clone, "worktree", "add", "-q", worktree, "-b", "work", "HEAD");
    const { status, out } = run(worktree);
    expect(status).toBe(0);
    expect(out).toContain(
      "- the main checkout was 3 commit(s) behind origin/main and is now up to date.",
    );
    expect(out).toContain(
      "- this worktree is on work, 3 commit(s) behind origin/main. Not changed:",
    );
    expect(behind(clone)).toBe("0");
    expect(behind(worktree)).toBe("3");
  });

  it("says nothing and succeeds outside a git checkout", () => {
    const dir = mkdtempSync(path.join(tmpdir(), "session-start-none-"));
    dirs.push(dir);
    const { status, out } = run(dir);
    expect(status).toBe(0);
    expect(out).toBe("");
  });

  it("is registered, with the cost hook, in a form that works under bash and PowerShell", async () => {
    const { readFileSync } = await import("node:fs");
    const settings = JSON.parse(
      readFileSync(
        path.resolve(SCRIPT, "..", "..", "..", ".claude", "settings.json"),
        "utf8",
      ),
    ) as {
      hooks: Record<string, Array<{ hooks: Array<{ command: string }> }>>;
    };
    const commands = Object.values(settings.hooks).flatMap((groups) =>
      groups.flatMap((g) => g.hooks.map((h) => h.command)),
    );
    expect(commands).toEqual([
      'node "${CLAUDE_PROJECT_DIR}/plugin/scripts/session_start.ts"',
      'node "${CLAUDE_PROJECT_DIR}/plugin/scripts/task_cost_hook.ts"',
    ]);
    // No shell script: a `.sh` checked out on Windows can carry CRLF.
    for (const c of commands) expect(c).not.toMatch(/\.sh\b/);
  });
});
