import { type ChildProcess, spawn, spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import type { State } from "project-orchestrator-service/dist/model/schema.js";

import type { Action } from "../plugin/scripts/lib/orchestrate.ts";
import {
  DEFAULT_INTERVAL_SECONDS,
  DEFAULT_MAX_MINUTES,
  newKeys,
  parseActed,
} from "../plugin/scripts/lib/plan-watch.ts";

/**
 * The watcher of the orchestrator session (P2-N031): criterion 9 of
 * docs/specs/orchestrator-session.md, against a local repository. The
 * tests poll once a second; the command's own interval is checked
 * apart, because the two minutes of the criterion rest on it.
 */

type Node = State["nodes"][number];
type Task = State["tasks"][number];
type Decision = State["decisions"][number];

const ROOT = path.resolve(import.meta.dirname, "..");
const SCRIPT = path.join(ROOT, "plugin/scripts/plan_watch.ts");
const PROJECT = "majodali/project-orchestrator";

function node(
  partial: Partial<Node> & Pick<Node, "id" | "title" | "stage">,
): Node {
  return {
    kind: "work",
    outcome: `${partial.title} exists.`,
    parent: null,
    repository: null,
    after: [],
    hold: null,
    start: "auto",
    docs: { plan: null, spec: null },
    done: null,
    note: null,
    ...partial,
  };
}

function task(
  partial: Partial<Task> & Pick<Task, "id" | "node" | "step" | "opened">,
): Task {
  return {
    status: "open",
    role: null,
    model: null,
    tokens: { in: null, out: null },
    closed: null,
    base: null,
    ref: null,
    pr: null,
    summary: null,
    notes: null,
    ...partial,
  };
}

function decision(
  partial: Partial<Decision> & Pick<Decision, "id" | "node">,
): Decision {
  return {
    question: "Which way?",
    options: [],
    default: null,
    chosen: null,
    decided: null,
    rationale: null,
    standing: false,
    source: null,
    ...partial,
  };
}

function state(
  nodes: Node[],
  tasks: Task[] = [],
  decisions: Decision[] = [],
): State {
  return { schema: 0, project: PROJECT, nodes, tasks, decisions };
}

const HELD = node({
  id: "P1-N001",
  title: "Held",
  stage: "planned",
  hold: { kind: "gated", reason: "owner review of the plan" },
});
const HELD_KEY = "report:P1-N001:3:hold";

const GIT = [
  "-c",
  "user.name=test",
  "-c",
  "user.email=test@example.invalid",
  "-c",
  "commit.gpgsign=false",
];

function git(cwd: string, ...args: string[]): void {
  const out = spawnSync("git", [...GIT, ...args], { cwd, encoding: "utf8" });
  if (out.status !== 0)
    throw new Error(`git ${args.join(" ")}: ${out.stderr || out.stdout}`);
}

interface Repo {
  /** Where the watcher runs: a clone of the remote. */
  watch: string;
  /** Local files of the watching session. */
  sessions: string;
  acted: string;
  /** Commits the files given to the remote's `main`. */
  push(files: Record<string, string>, message: string): void;
}

/** A remote with `main`, a clone that pushes to it, and a clone the
 * watcher runs in. */
function repo(first: State, checkAfterMinutes = 45): Repo {
  const dir = mkdtempSync(path.join(tmpdir(), "plan-watch-"));
  const remote = path.join(dir, "remote.git");
  const seed = path.join(dir, "seed");
  const watch = path.join(dir, "watch");
  git(dir, "init", "--quiet", "--bare", "--initial-branch=main", remote);
  git(dir, "init", "--quiet", "--initial-branch=main", seed);
  git(seed, "remote", "add", "origin", remote);
  const push = (files: Record<string, string>, message: string) => {
    for (const [name, text] of Object.entries(files)) {
      const file = path.join(seed, name);
      mkdirSync(path.dirname(file), { recursive: true });
      writeFileSync(file, text);
    }
    git(seed, "add", "--all");
    git(seed, "commit", "--quiet", "--message", message);
    git(seed, "push", "--quiet", "origin", "main");
  };
  push(
    {
      "orchestration/state.json": JSON.stringify(first),
      "orchestration/journal.jsonl": "",
      "orchestration/orchestrator.json": JSON.stringify({
        limits: { execute: 2, plan: 1 },
        maxReworkRounds: 2,
        checkAfterMinutes,
        weeklyBudget: null,
      }),
      ".claude/agents/planner.md": "---\nmodel: model-planner\n---\n",
      ".claude/agents/implementer.md": "---\nmodel: model-implementer\n---\n",
      ".claude/agents/reviewer.md": "---\nmodel: model-reviewer\n---\n",
    },
    "first",
  );
  git(dir, "clone", "--quiet", remote, watch);
  const sessions = path.join(dir, "sessions.json");
  const acted = path.join(dir, "acted.json");
  writeFileSync(sessions, "[]");
  return { watch, sessions, acted, push };
}

interface Run {
  child: ChildProcess;
  /** Resolves with the exit code and what was printed. */
  done: Promise<{ code: number | null; stdout: string; stderr: string }>;
  exited(): boolean;
}

const running: ChildProcess[] = [];
afterEach(() => {
  for (const child of running.splice(0)) child.kill();
});

function watcher(r: Repo, ...extra: string[]): Run {
  const child = spawn(
    process.execPath,
    [
      SCRIPT,
      "--sessions",
      r.sessions,
      "--acted",
      r.acted,
      "--interval",
      "1",
      ...extra,
    ],
    { cwd: r.watch },
  );
  running.push(child);
  let stdout = "";
  let stderr = "";
  let exited = false;
  child.stdout.on("data", (d: Buffer) => (stdout += d.toString()));
  child.stderr.on("data", (d: Buffer) => (stderr += d.toString()));
  const done = new Promise<{
    code: number | null;
    stdout: string;
    stderr: string;
  }>((resolve) => {
    child.on("close", (code) => {
      exited = true;
      resolve({ code, stdout, stderr });
    });
  });
  return { child, done, exited: () => exited };
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

interface Printed {
  actions: Action[];
  keys: string[];
  new: string[];
}
function printed(stdout: string): Printed {
  return JSON.parse(stdout) as Printed;
}

/** Long enough for several polls at one a second. */
const SEVERAL_POLLS = 4000;

describe("the watcher wakes on a new action key (criterion 9, S6)", () => {
  it("polls once a minute by default, and ends inside two hours", () => {
    expect(DEFAULT_INTERVAL_SECONDS).toBe(60);
    expect(DEFAULT_MAX_MINUTES).toBeLessThan(120);
  });

  it("exits 0 and prints the actions after a commit that adds an action key", async () => {
    const r = repo(state([HELD]));
    writeFileSync(r.acted, JSON.stringify([HELD_KEY]));
    const run = watcher(r);
    await sleep(SEVERAL_POLLS);
    // The hold was reported before: its key is in the acted file.
    expect(run.exited()).toBe(false);

    const pushed = Date.now();
    r.push(
      {
        "orchestration/state.json": JSON.stringify(
          state([
            HELD,
            node({ id: "P1-N002", title: "Offered", stage: "identified" }),
          ]),
        ),
      },
      "a node is offered",
    );
    const out = await run.done;
    expect(out.code).toBe(0);
    expect(Date.now() - pushed).toBeLessThan(120_000);
    const result = printed(out.stdout);
    expect(result.new).toEqual(["start:P1-N002:plan:new"]);
    expect(result.keys).toEqual([HELD_KEY, "start:P1-N002:plan:new"]);
    expect(result.actions.map((a) => a.key)).toEqual(result.keys);
    expect(result.actions[1]).toMatchObject({
      kind: "start",
      node: "P1-N002",
      model: "model-planner",
    });
  }, 60_000);

  it("does not exit on a commit that adds no key, or only removes one", async () => {
    const asked = decision({
      id: "D001",
      node: "P1-N002",
      rationale: "Asked by T001 at close.",
    });
    const done = node({
      id: "P1-N002",
      title: "Done",
      stage: "done",
      done: "2026-11-17",
    });
    const r = repo(state([HELD, done], [], [asked]));
    const ASKS_KEY = "report:P1-N002:4:asks:D001";
    writeFileSync(r.acted, JSON.stringify([HELD_KEY, ASKS_KEY]));
    const run = watcher(r);
    await sleep(SEVERAL_POLLS);
    expect(run.exited()).toBe(false);

    // A commit that changes the plan and adds no key.
    r.push(
      {
        "orchestration/state.json": JSON.stringify(
          state([HELD, { ...done, note: "A note." }], [], [asked]),
        ),
        "orchestration/journal.jsonl": `${JSON.stringify({ note: "a note" })}\n`,
      },
      "a note",
    );
    await sleep(SEVERAL_POLLS);
    expect(run.exited()).toBe(false);

    // A commit that only removes one: the owner answered the decision.
    r.push(
      {
        "orchestration/state.json": JSON.stringify(
          state(
            [HELD, done],
            [],
            [{ ...asked, chosen: "this way", decided: "2026-11-17" }],
          ),
        ),
      },
      "the decision is answered",
    );
    await sleep(SEVERAL_POLLS);
    expect(run.exited()).toBe(false);

    // It read those commits: the next one, which adds a key, wakes it,
    // and the answered decision's key is gone from what it prints.
    r.push(
      {
        "orchestration/state.json": JSON.stringify(
          state(
            [
              HELD,
              done,
              node({ id: "P1-N003", title: "Offered", stage: "identified" }),
            ],
            [],
            [{ ...asked, chosen: "this way", decided: "2026-11-17" }],
          ),
        ),
      },
      "a node is offered",
    );
    const out = await run.done;
    expect(out.code).toBe(0);
    const result = printed(out.stdout);
    expect(result.keys).toEqual([HELD_KEY, "start:P1-N003:plan:new"]);
    expect(result.new).toEqual(["start:P1-N003:plan:new"]);
  }, 90_000);

  it("exits when a second decision opens on a node already reported (D088)", async () => {
    const done = node({
      id: "P1-N002",
      title: "Done",
      stage: "done",
      done: "2026-11-17",
    });
    const first = decision({
      id: "D001",
      node: "P1-N002",
      rationale: "Asked by T001 at close.",
    });
    const r = repo(state([HELD, done], [], [first]));
    const FIRST_KEY = "report:P1-N002:4:asks:D001";
    writeFileSync(r.acted, JSON.stringify([HELD_KEY, FIRST_KEY]));
    const run = watcher(r);
    await sleep(SEVERAL_POLLS);
    // The first decision was reported before.
    expect(run.exited()).toBe(false);

    const second = decision({
      id: "D002",
      node: "P1-N002",
      rationale: "Asked by T002 at close.",
    });
    r.push(
      {
        "orchestration/state.json": JSON.stringify(
          state([HELD, done], [], [first, second]),
        ),
      },
      "a second decision is asked",
    );
    const out = await run.done;
    expect(out.code).toBe(0);
    const result = printed(out.stdout);
    expect(result.new).toEqual(["report:P1-N002:4:asks:D001,D002"]);
  }, 60_000);

  it("exits with no commit when a check falls due", async () => {
    // The task was opened 50 seconds ago and a check is due after one
    // minute: nothing is due now, and a check is in about ten seconds.
    const began = Date.now();
    const opened = `${new Date(began - 50_000).toISOString().slice(0, 19)}Z`;
    const r = repo(
      state(
        [node({ id: "P1-N001", title: "At work", stage: "executing" })],
        [task({ id: "T001", node: "P1-N001", step: "execute", opened })],
      ),
      1,
    );
    writeFileSync(
      r.sessions,
      JSON.stringify([
        {
          id: "session_a",
          title: "P1-N001 execute",
          created: opened,
          status: "SESSION_STATUS_BUCKET_WORKING",
          model: "model-implementer",
        },
      ]),
    );
    const before = watcher(r, "--once");
    expect(printed((await before.done).stdout).keys).toEqual([]);

    const run = watcher(r);
    const out = await run.done;
    expect(out.code).toBe(0);
    expect(Date.now() - began).toBeGreaterThan(8000);
    const result = printed(out.stdout);
    expect(result.new).toEqual(["check:T001"]);
    expect(result.actions[0]).toMatchObject({
      kind: "check",
      task: "T001",
      session: "session_a",
    });
  }, 60_000);
});

describe("plan_watch.ts", () => {
  it("with --once prints and exits, new keys or none", async () => {
    const r = repo(state([HELD]));
    // No acted file: a replacement session gives every report once more.
    const first = await watcher(r, "--once").done;
    expect(first.code).toBe(0);
    expect(printed(first.stdout)).toMatchObject({
      keys: [HELD_KEY],
      new: [HELD_KEY],
    });

    writeFileSync(r.acted, JSON.stringify([HELD_KEY]));
    const second = await watcher(r, "--once").done;
    expect(second.code).toBe(0);
    expect(printed(second.stdout)).toMatchObject({ keys: [HELD_KEY], new: [] });
  }, 30_000);

  it("reads the plan at origin/main, not in its own checkout", async () => {
    const r = repo(state([HELD]));
    writeFileSync(
      path.join(r.watch, "orchestration/state.json"),
      "not the state file",
    );
    const out = await watcher(r, "--once").done;
    expect(printed(out.stdout).keys).toEqual([HELD_KEY]);
  }, 30_000);

  it("reports a snapshot not given, and starts nothing", async () => {
    const r = repo(
      state([node({ id: "P1-N001", title: "Offered", stage: "identified" })]),
    );
    const child = spawnSync(process.execPath, [SCRIPT, "--once"], {
      cwd: r.watch,
      encoding: "utf8",
    });
    expect(child.status).toBe(0);
    expect(printed(child.stdout).keys).toEqual(["report:project:1:input"]);
  }, 30_000);

  it("ends at its time limit with nothing new, to be started again", async () => {
    const r = repo(state([HELD]));
    writeFileSync(r.acted, JSON.stringify([HELD_KEY]));
    const out = await watcher(r, "--max-minutes", "0.05").done;
    expect(out.code).toBe(0);
    expect(printed(out.stdout)).toMatchObject({ keys: [HELD_KEY], new: [] });
  }, 30_000);

  it("exits 1 when origin/main cannot be fetched", async () => {
    const dir = mkdtempSync(path.join(tmpdir(), "plan-watch-none-"));
    git(dir, "init", "--quiet", "--initial-branch=main", dir);
    const child = spawnSync(process.execPath, [SCRIPT, "--once"], {
      cwd: dir,
      encoding: "utf8",
    });
    expect(child.status).toBe(1);
    expect(child.stdout).toBe("");
    expect(child.stderr).toContain("git fetch of origin main failed");
  }, 30_000);

  it("refuses an option it does not know, and an interval that is no number", () => {
    for (const [args, problem] of [
      [["--acts", "x"], "unknown option --acts"],
      [["--interval", "soon"], "--interval is no number above 0: soon"],
      [["--acted"], "--acted needs a value"],
    ] as const) {
      const child = spawnSync(process.execPath, [SCRIPT, ...args], {
        encoding: "utf8",
      });
      expect(child.status).toBe(2);
      expect(child.stderr).toContain(problem);
      expect(child.stdout).toBe("");
    }
  });
});

describe("the acted file (S6)", () => {
  const actions = (...keys: string[]) =>
    keys.map((key) => ({ kind: "check", key }) as Action);

  it("is a JSON list of keys; a missing or unreadable one holds none", () => {
    expect(parseActed('["a", "b"]')).toEqual(["a", "b"]);
    expect(parseActed(null)).toEqual([]);
    expect(parseActed("not JSON")).toEqual([]);
    expect(parseActed('{"a": 1}')).toEqual([]);
    expect(parseActed('["a", 1]')).toEqual([]);
  });

  it("makes a key new when it lacks it, and ignores a key no action has", () => {
    expect(newKeys(actions("a", "b", "c"), ["b", "gone"])).toEqual(["a", "c"]);
    expect(newKeys(actions("a"), ["a", "gone"])).toEqual([]);
    expect(newKeys([], ["gone"])).toEqual([]);
  });
});
