import { spawnSync } from "node:child_process";
import { mkdtempSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import type { State } from "project-orchestrator-service/dist/model/schema.js";

import {
  type Action,
  type Inputs,
  type JournalLine,
  type ReportAction,
  type SessionEntry,
  type Settings,
  type StartAction,
  bareModel,
  brief,
  decide,
  markTime,
  modelOfAgent,
  parseJournal,
  parseModels,
  parseNow,
  parseSessions,
  parseSettings,
  parseState,
  parseTitle,
} from "../plugin/scripts/lib/orchestrate.ts";

/**
 * The decision script of the orchestrator session (P2-N030): criteria
 * 1 to 5, 8, 19 and 20 of docs/specs/orchestrator-session.md, each
 * named at the tests that show it.
 */

type Node = State["nodes"][number];
type Task = State["tasks"][number];
type Decision = State["decisions"][number];

const ROOT = path.resolve(import.meta.dirname, "..");
const PROJECT = "majodali/project-orchestrator";
const SERVICE = "majodali/project-orchestrator-service";
const NOW = "2026-11-17T12:00:00Z";
const PLAN = "docs/plans/shared.md";

function node(
  partial: Partial<Node> & Pick<Node, "id" | "title" | "stage">,
): Node {
  return {
    kind: "work",
    outcome: `${partial.title} exists.`,
    parent: null,
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
  partial: Partial<Task> & Pick<Task, "id" | "node" | "step">,
): Task {
  return {
    status: "open",
    role: null,
    model: null,
    tokens: { in: null, out: null },
    opened: "2026-11-17T11:50:00Z",
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

const SETTINGS: Settings = {
  limits: { execute: 2, plan: 1 },
  maxReworkRounds: 2,
  checkAfterMinutes: 45,
  weeklyBudget: null,
  repositories: [
    { repository: PROJECT, nodes: [] },
    { repository: SERVICE, nodes: ["P1-N090"] },
  ],
};

const MODELS = {
  planner: "model-planner",
  implementer: "model-implementer",
  reviewer: "model-reviewer",
};

function session(
  partial: Partial<SessionEntry> & Pick<SessionEntry, "id" | "title">,
): SessionEntry {
  return {
    created: "2026-11-17T11:55:00Z",
    status: "working",
    model: MODELS[roleOfTitle(partial.title)],
    ...partial,
  };
}

function roleOfTitle(title: string): keyof typeof MODELS {
  if (/ execute/.test(title)) return "implementer";
  if (/ verify/.test(title)) return "reviewer";
  return "planner";
}

function opened(taskId: string, nodeId: string, by: string): JournalLine {
  return {
    task: taskId,
    session: by,
    note: `task_open ${taskId} on ${nodeId}, execute`,
  };
}

interface Given {
  state: State;
  journal?: JournalLine[];
  settings?: Partial<Settings>;
  sessions?: SessionEntry[];
  models?: Record<string, string>;
  now?: string;
  self?: string | null;
}

function inputs(g: Given): Inputs {
  return {
    state: { ok: true, value: g.state },
    journal: { ok: true, value: g.journal ?? [] },
    settings: { ok: true, value: { ...SETTINGS, ...g.settings } },
    models: { ok: true, value: g.models ?? MODELS },
    sessions: { ok: true, value: g.sessions ?? [] },
    self: g.self === undefined ? "session_orchestrator" : g.self,
    now: { ok: true, value: new Date(g.now ?? NOW) },
  };
}

function run(g: Given): Action[] {
  return decide(inputs(g)).actions;
}
function keys(g: Given): string[] {
  return run(g).map((a) => a.key);
}
function startsOf(actions: Action[]): StartAction[] {
  return actions.filter((a): a is StartAction => a.kind === "start");
}
function reportsOf(actions: Action[]): ReportAction[] {
  return actions.filter((a): a is ReportAction => a.kind === "report");
}

/** A node that executed, with the check node the service adds. */
function verifying(
  id: string,
  checkId: string,
  failed: boolean,
  extra: Partial<Node> = {},
): Node[] {
  return [
    node({ id, title: `Work ${id}`, stage: "verifying", ...extra }),
    node({
      id: checkId,
      kind: "check",
      title: `Verification of Work ${id}`,
      stage: "specified",
      parent: id,
      hold: failed ? { kind: "blocked", reason: "T002: not met" } : null,
    }),
  ];
}

// ---------------------------------------------------------------------
// Criterion 2: a start for each offered step
// ---------------------------------------------------------------------

describe("a start for each offered step (criterion 2)", () => {
  const offered = state([
    node({ id: "P1-N001", title: "To plan", stage: "identified" }),
    node({ id: "P1-N002", title: "To specify", stage: "planned" }),
    node({ id: "P1-N003", title: "To execute", stage: "specified" }),
    node({
      id: "P1-N004",
      title: "To break down",
      stage: "specified",
      note: "Slices are in the plan. Next step: break down (S8).",
    }),
    ...verifying("P1-N005", "P1-N006", false),
  ]);

  it("gives each step its role, its role's model and the title `<node> <step>`", () => {
    const starts = startsOf(
      run({ state: offered, settings: { limits: { execute: 9, plan: 9 } } }),
    );
    expect(
      starts.map((s) => [s.key, s.step, s.role, s.model, s.title, s.pr]),
    ).toEqual([
      [
        "start:P1-N001:plan:new",
        "plan",
        "planner",
        "model-planner",
        "P1-N001 plan",
        null,
      ],
      [
        "start:P1-N002:specify:new",
        "specify",
        "planner",
        "model-planner",
        "P1-N002 specify",
        null,
      ],
      [
        "start:P1-N003:execute:new",
        "execute",
        "implementer",
        "model-implementer",
        "P1-N003 execute",
        null,
      ],
      [
        "start:P1-N004:break down:new",
        "break down",
        "planner",
        "model-planner",
        "P1-N004 break down",
        null,
      ],
      [
        "start:P1-N006:verify:new",
        "verify",
        "reviewer",
        "model-reviewer",
        "P1-N006 verify",
        null,
      ],
    ]);
    for (const s of starts) expect(s.repository).toBe(PROJECT);
  });

  it("reads the model from the agent file's `model` line", () => {
    const agent = (model: string) =>
      `---\nname: x\nmodel: ${model}\ntools: [Read]\n---\n\nmodel: not-this-one\n`;
    expect(modelOfAgent(agent("claude-sonnet-5"))).toBe("claude-sonnet-5");
    expect(modelOfAgent("no frontmatter\nmodel: x\n")).toBeNull();
    const models = parseModels({
      planner: agent("a"),
      implementer: agent("b"),
      reviewer: agent("c"),
    });
    expect(models).toEqual({
      ok: true,
      value: { planner: "a", implementer: "b", reviewer: "c" },
    });
  });

  it("names the last closed task in a later start's key", () => {
    const s = state(
      [node({ id: "P1-N001", title: "To specify", stage: "planned" })],
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "plan",
          status: "closed",
          closed: "2026-11-17T11:00:00Z",
        }),
      ],
    );
    expect(keys({ state: s })).toEqual(["start:P1-N001:specify:T001"]);
  });

  const one = (n: Partial<Node>, tasks: Task[] = [], ds: Decision[] = []) =>
    state(
      [node({ id: "P1-N001", title: "The node", stage: "specified", ...n })],
      tasks,
      ds,
    );

  it("gives none for a node that is held", () => {
    const actions = run({
      state: one({ hold: { kind: "blocked", reason: "waits for a release" } }),
    });
    expect(startsOf(actions)).toEqual([]);
  });

  it("gives none for a node that has an open decision", () => {
    const actions = run({
      state: one({}, [], [decision({ id: "D001", node: "P1-N001" })]),
    });
    expect(startsOf(actions)).toEqual([]);
  });

  it("gives none for a node that has an open task", () => {
    const actions = run({
      state: one({ stage: "executing" }, [
        task({ id: "T001", node: "P1-N001", step: "execute" }),
      ]),
    });
    expect(actions).toEqual([]);
  });

  it("gives none for a node that waits for approval", () => {
    expect(startsOf(run({ state: one({ start: "approve" }) }))).toEqual([]);
  });

  it("gives none for a node that has a pending start", () => {
    const actions = run({
      state: one({}),
      sessions: [session({ id: "session_a", title: "P1-N001 execute" })],
    });
    expect(actions).toEqual([]);
  });

  it("starts again once the pending start's session is archived", () => {
    const actions = run({
      state: one({}),
      sessions: [
        session({
          id: "session_a",
          title: "P1-N001 execute",
          status: "archived",
        }),
      ],
    });
    expect(actions.map((a) => a.key)).toEqual(["start:P1-N001:execute:new"]);
  });

  it("does not take a session whose task has since opened and closed for a pending start", () => {
    const s = state(
      [node({ id: "P1-N001", title: "To specify", stage: "planned" })],
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "plan",
          status: "closed",
          opened: "2026-11-17T11:56:00Z",
          closed: "2026-11-17T11:58:00Z",
        }),
      ],
    );
    const actions = run({
      state: s,
      sessions: [session({ id: "session_a", title: "P1-N001 plan" })],
    });
    expect(actions.map((a) => a.key)).toEqual(["start:P1-N001:specify:T001"]);
  });

  it("ignores a session whose title does not follow the grammar, or names no node of the plan", () => {
    const actions = run({
      state: one({}),
      sessions: [
        session({ id: "session_a", title: "Implementer: P1-N001 by hand" }),
        session({ id: "session_b", title: "P9-N001 execute" }),
      ],
    });
    expect(actions.map((a) => a.key)).toEqual(["start:P1-N001:execute:new"]);
  });
});

// ---------------------------------------------------------------------
// Criterion 3: the limits and the shared document
// ---------------------------------------------------------------------

describe("the limits and the shared document (criterion 3, S4)", () => {
  const three = () => [
    node({ id: "P1-N001", title: "First", stage: "specified" }),
    node({ id: "P1-N002", title: "Second", stage: "specified" }),
    node({ id: "P1-N003", title: "Third", stage: "specified" }),
  ];

  it("gives no third execute start at a limit of 2", () => {
    expect(keys({ state: state(three()) })).toEqual([
      "start:P1-N001:execute:new",
      "start:P1-N002:execute:new",
    ]);
  });

  it("counts an open execute task, whoever opened it", () => {
    const nodes = three();
    nodes[0]!.stage = "executing";
    const s = state(nodes, [
      task({ id: "T001", node: "P1-N001", step: "execute" }),
    ]);
    expect(keys({ state: s })).toEqual(["start:P1-N002:execute:new"]);
  });

  it("counts a pending start", () => {
    const sessions = [
      session({ id: "session_a", title: "P1-N001 execute" }),
      session({ id: "session_b", title: "P1-N003 execute" }),
    ];
    expect(keys({ state: state(three()), sessions })).toEqual([]);
    expect(
      keys({ state: state(three()), sessions: sessions.slice(0, 1) }),
    ).toEqual(["start:P1-N002:execute:new"]);
  });

  it("counts plan, specify and break down against `limits.plan`, and never a verify", () => {
    const s = state([
      node({ id: "P1-N001", title: "To plan", stage: "identified" }),
      node({ id: "P1-N002", title: "To specify", stage: "planned" }),
      ...verifying("P1-N003", "P1-N004", false),
      ...verifying("P1-N005", "P1-N006", false),
      ...verifying("P1-N007", "P1-N008", false),
    ]);
    expect(keys({ state: s })).toEqual([
      "start:P1-N001:plan:new",
      "start:P1-N004:verify:new",
      "start:P1-N006:verify:new",
      "start:P1-N008:verify:new",
    ]);
  });

  const shared = { docs: { plan: PLAN, spec: null } };

  it("gives none for a node sharing a plan document with an open task", () => {
    const s = state(
      [
        node({
          id: "P1-N001",
          title: "First",
          stage: "executing",
          ...shared,
        }),
        node({ id: "P1-N002", title: "Second", stage: "specified", ...shared }),
        node({ id: "P1-N003", title: "Third", stage: "specified" }),
      ],
      [task({ id: "T001", node: "P1-N001", step: "execute" })],
    );
    expect(keys({ state: s })).toEqual(["start:P1-N003:execute:new"]);
  });

  it("gives none for a node sharing it with an open planning task", () => {
    const s = state(
      [
        node({ id: "P1-N001", title: "First", stage: "planned", ...shared }),
        node({ id: "P1-N002", title: "Second", stage: "specified", ...shared }),
      ],
      [task({ id: "T001", node: "P1-N001", step: "specify" })],
    );
    expect(keys({ state: s })).toEqual([]);
  });

  it("gives none for the second of two offered nodes sharing a plan document", () => {
    const s = state([
      node({ id: "P1-N001", title: "First", stage: "specified", ...shared }),
      node({ id: "P1-N002", title: "Second", stage: "specified", ...shared }),
    ]);
    expect(keys({ state: s })).toEqual(["start:P1-N001:execute:new"]);
  });

  it("gives one for a node sharing it only with a verify", () => {
    const s = state(
      [
        ...verifying("P1-N001", "P1-N002", false, shared),
        node({ id: "P1-N003", title: "Third", stage: "specified", ...shared }),
      ],
      [task({ id: "T001", node: "P1-N002", step: "verify" })],
    );
    s.nodes[1]!.docs = { plan: PLAN, spec: null };
    expect(keys({ state: s })).toEqual(["start:P1-N003:execute:new"]);
  });

  it("holds a check node too while another node's task is open on its plan document", () => {
    const s = state(
      [
        node({ id: "P1-N001", title: "First", stage: "executing", ...shared }),
        ...verifying("P1-N002", "P1-N003", false, shared),
      ],
      [task({ id: "T001", node: "P1-N001", step: "execute" })],
    );
    s.nodes[2]!.docs = { plan: PLAN, spec: null };
    expect(keys({ state: s })).toEqual([]);
  });
});

// ---------------------------------------------------------------------
// Criterion 4: one report for each row of S5's table
// ---------------------------------------------------------------------

describe("one report for each row of S5 (criterion 4)", () => {
  const only = (actions: Action[]) => {
    const reports = reportsOf(actions);
    expect(reports).toHaveLength(1);
    const r = reports[0]!;
    return [r.key, r.node, r.condition, r.reason];
  };

  const failedTwice = () =>
    state(
      verifying("P1-N001", "P1-N002", true),
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "execute",
          status: "closed",
          pr: `${PROJECT}#7`,
        }),
        task({
          id: "T002",
          node: "P1-N002",
          step: "verify",
          status: "blocked",
        }),
        task({
          id: "T003",
          node: "P1-N001",
          step: "execute",
          status: "closed",
          pr: `${PROJECT}#7`,
        }),
        task({
          id: "T004",
          node: "P1-N002",
          step: "verify",
          status: "blocked",
        }),
      ].map((t) => ({ ...t, closed: "2026-11-17T11:00:00Z" })),
    );

  it("1 rework-limit: a rework offered after `maxReworkRounds` failed verifications", () => {
    const actions = run({ state: failedTwice() });
    expect(only(actions)).toEqual([
      "report:P1-N001:1:rework-limit",
      "P1-N001",
      1,
      "rework-limit",
    ]);
    expect(actions).toHaveLength(1);
    expect(reportsOf(actions)[0]!.text).toContain("P1-N001");
    expect(reportsOf(actions)[0]!.text).toContain("Work P1-N001");
    expect(reportsOf(actions)[0]!.text).toContain("in the view");
  });

  it("gives no rework-limit report after one failed verification", () => {
    const s = failedTwice();
    s.tasks = s.tasks.slice(0, 2);
    expect(reportsOf(run({ state: s }))).toEqual([]);
    expect(keys({ state: s })).toEqual(["start:P1-N001:execute:T002"]);
  });

  const open = (id: string, at: string) =>
    state(
      [node({ id: "P1-N001", title: "The node", stage: "executing" })],
      [task({ id, node: "P1-N001", step: "execute", opened: at })],
    );

  it("1 no-session: a task open longer than `checkAfterMinutes` that no session holds", () => {
    const actions = run({ state: open("T001", "2026-11-17T11:00:00Z") });
    expect(only(actions)).toEqual([
      "report:P1-N001:1:no-session",
      "P1-N001",
      1,
      "no-session",
    ]);
  });

  it("1 no-close: the task still open `checkAfterMinutes` after its last mark", () => {
    const actions = run({
      state: open("T001", "2026-11-17T09:00:00Z"),
      journal: [opened("T001", "P1-N001", "session_a")],
      sessions: [
        session({
          id: "session_a",
          title:
            "P1-N001 execute; checked T001 2026-11-17T10:00Z; nudged T001 2026-11-17T10:05Z",
          status: "completed",
        }),
      ],
    });
    expect(only(actions)).toEqual([
      "report:P1-N001:1:no-close",
      "P1-N001",
      1,
      "no-close",
    ]);
    expect(actions).toHaveLength(1);
  });

  it("1 no-claim: a pending start older than `checkAfterMinutes`", () => {
    const actions = run({
      state: state([
        node({ id: "P1-N001", title: "The node", stage: "specified" }),
      ]),
      sessions: [
        session({
          id: "session_a",
          title: "P1-N001 execute",
          created: "2026-11-17T11:00:00Z",
        }),
      ],
    });
    expect(only(actions)).toEqual([
      "report:P1-N001:1:no-claim",
      "P1-N001",
      1,
      "no-claim",
    ]);
    expect(actions).toHaveLength(1);
  });

  it("1 model: a session on another model than its role's, bracketed suffix aside", () => {
    const given = (model: string): Given => ({
      state: open("T001", "2026-11-17T11:50:00Z"),
      journal: [opened("T001", "P1-N001", "session_a")],
      sessions: [session({ id: "session_a", title: "P1-N001 execute", model })],
    });
    expect(only(run(given("model-other")))).toEqual([
      "report:P1-N001:1:model",
      "P1-N001",
      1,
      "model",
    ]);
    expect(run(given("model-implementer[1m]"))).toEqual([]);
    expect(bareModel("claude-opus-5-5[1m]")).toBe("claude-opus-5-5");
  });

  it("2 scope: a gated hold the service set for a changed scope", () => {
    const s = state([
      node({
        id: "P1-N001",
        title: "The node",
        stage: "executing",
        hold: {
          kind: "gated",
          reason:
            "T009: Scope changed during T009: the node's title differs from its base commit.",
        },
      }),
    ]);
    expect(only(run({ state: s }))).toEqual([
      "report:P1-N001:2:scope",
      "P1-N001",
      2,
      "scope",
    ]);
    s.nodes[0]!.hold!.reason = "Scope changed during T009: as S5 writes it.";
    expect(only(run({ state: s }))[3]).toBe("scope");
  });

  const spent = (budget: number | null) =>
    run({
      state: state(
        [
          node({ id: "P1-N001", title: "Done", stage: "done" }),
          node({ id: "P1-N002", title: "Next", stage: "specified" }),
        ],
        [
          task({
            id: "T001",
            node: "P1-N001",
            step: "execute",
            status: "closed",
            closed: "2026-11-16T12:00:00Z",
            tokens: { in: 10, out: 20, cacheRead: 300, cacheWrite: 4000 },
          }),
          task({
            id: "T002",
            node: "P1-N001",
            step: "execute",
            status: "closed",
            closed: "2026-11-01T12:00:00Z",
            tokens: { in: 1_000_000, out: 0 },
          }),
        ],
      ),
      settings: { weeklyBudget: budget },
    });

  it("2 budget: the tokens of all four types on tasks closed in seven days exceed `weeklyBudget`", () => {
    const actions = spent(4329);
    expect(only(actions)).toEqual([
      "report:project:2:budget",
      null,
      2,
      "budget",
    ]);
    expect(actions).toHaveLength(1);
    expect(reportsOf(actions)[0]!.text).toContain("4330");
  });

  it("gives no budget report at the budget, or with none set", () => {
    expect(spent(4330).map((a) => a.key)).toEqual([
      "start:P1-N002:execute:new",
    ]);
    expect(spent(null).map((a) => a.key)).toEqual([
      "start:P1-N002:execute:new",
    ]);
  });

  const withDecision = (rationale: string | null) =>
    run({
      state: state(
        [node({ id: "P1-N001", title: "The node", stage: "specified" })],
        [],
        [decision({ id: "D007", node: "P1-N001", rationale })],
      ),
    });

  it("3 decision: an open decision that no task asked", () => {
    const actions = withDecision("The owner raised it.");
    expect(only(actions)).toEqual([
      "report:P1-N001:3:decision",
      "P1-N001",
      3,
      "decision",
    ]);
    expect(reportsOf(actions)[0]!.text).toContain("D007");
    expect(only(withDecision(null))[3]).toBe("decision");
  });

  it("4 asks: an open decision a task asked at its close", () => {
    expect(only(withDecision("Asked by T012 at close."))).toEqual([
      "report:P1-N001:4:asks",
      "P1-N001",
      4,
      "asks",
    ]);
  });

  it("gives no report for a decision that is answered", () => {
    const s = state(
      [node({ id: "P1-N001", title: "The node", stage: "specified" })],
      [],
      [decision({ id: "D007", node: "P1-N001", chosen: "this way" })],
    );
    expect(keys({ state: s })).toEqual(["start:P1-N001:execute:new"]);
  });

  it("3 hold: any other hold", () => {
    const s = state([
      node({
        id: "P1-N001",
        title: "The node",
        stage: "planned",
        hold: { kind: "gated", reason: "owner review of the plan" },
      }),
    ]);
    expect(only(run({ state: s }))).toEqual([
      "report:P1-N001:3:hold",
      "P1-N001",
      3,
      "hold",
    ]);
  });

  it("gives no hold report for a failed check node: it hands the node back for rework", () => {
    const s = state(verifying("P1-N001", "P1-N002", true), [
      task({
        id: "T001",
        node: "P1-N001",
        step: "execute",
        status: "closed",
        closed: "2026-11-17T11:00:00Z",
      }),
      task({
        id: "T002",
        node: "P1-N002",
        step: "verify",
        status: "blocked",
        closed: "2026-11-17T11:30:00Z",
      }),
    ]);
    expect(reportsOf(run({ state: s }))).toEqual([]);
  });

  it("3 approval: a node whose start waits for approval", () => {
    const s = state([
      node({
        id: "P1-N001",
        title: "The node",
        stage: "specified",
        start: "approve",
      }),
    ]);
    expect(only(run({ state: s }))).toEqual([
      "report:P1-N001:3:approval",
      "P1-N001",
      3,
      "approval",
    ]);
  });

  it("gives a node below a held or parked node no report of its own", () => {
    const s = state(
      [
        node({
          id: "P1-N001",
          title: "The held line",
          stage: "broken-down",
          hold: { kind: "blocked", reason: "paused by the owner" },
        }),
        node({
          id: "P1-N002",
          title: "Below it",
          stage: "planned",
          parent: "P1-N001",
          hold: { kind: "gated", reason: "owner review of the plan" },
        }),
        node({ id: "P1-N003", title: "The parked line", stage: "parked" }),
        node({
          id: "P1-N004",
          title: "Below that",
          stage: "specified",
          parent: "P1-N003",
          start: "approve",
        }),
      ],
      [],
      [decision({ id: "D001", node: "P1-N004" })],
    );
    expect(keys({ state: s })).toEqual(["report:P1-N001:3:hold"]);
  });

  it("stops only its node: every other node goes on", () => {
    const s = state([
      node({
        id: "P1-N001",
        title: "Held",
        stage: "specified",
        hold: { kind: "blocked", reason: "waits" },
      }),
      node({ id: "P1-N002", title: "Free", stage: "specified" }),
    ]);
    expect(keys({ state: s })).toEqual([
      "report:P1-N001:3:hold",
      "start:P1-N002:execute:new",
    ]);
  });

  it("prints reports first, then check, then message, then start", () => {
    const s = state(
      [
        node({
          id: "P1-N001",
          title: "Held",
          stage: "planned",
          hold: { kind: "gated", reason: "owner review of the plan" },
        }),
        node({ id: "P1-N002", title: "Unchecked", stage: "executing" }),
        node({ id: "P1-N003", title: "Idle", stage: "executing" }),
        node({ id: "P1-N004", title: "Offered", stage: "identified" }),
      ],
      [
        task({
          id: "T001",
          node: "P1-N002",
          step: "execute",
          opened: "2026-11-17T11:00:00Z",
        }),
        task({
          id: "T002",
          node: "P1-N003",
          step: "execute",
          opened: "2026-11-17T11:00:00Z",
        }),
      ],
    );
    const actions = run({
      state: s,
      journal: [
        opened("T001", "P1-N002", "session_a"),
        opened("T002", "P1-N003", "session_b"),
      ],
      sessions: [
        session({ id: "session_a", title: "P1-N002 execute" }),
        session({
          id: "session_b",
          title: "P1-N003 execute; checked T002 2026-11-17T11:50Z",
          status: "completed",
        }),
      ],
    });
    expect(actions.map((a) => a.key)).toEqual([
      "report:P1-N001:3:hold",
      "check:T001",
      "message:session_b:nudged:T002",
      "start:P1-N004:plan:new",
    ]);
    expect(actions[1]).toMatchObject({
      task: "T001",
      node: "P1-N002",
      session: "session_a",
      mark: "checked T001 2026-11-17T12:00Z",
    });
    expect(actions[2]).toMatchObject({
      session: "session_b",
      node: "P1-N003",
      mark: "nudged T002 2026-11-17T12:00Z",
    });
  });
});

describe("an unreadable input (criterion 4, S2, plan section 8)", () => {
  const good = (): Inputs =>
    inputs({
      state: state([
        node({ id: "P1-N001", title: "Offered", stage: "specified" }),
        node({
          id: "P1-N002",
          title: "Held",
          stage: "planned",
          hold: { kind: "gated", reason: "owner review of the plan" },
        }),
      ]),
    });
  const agent = "---\nmodel: m\n---\n";
  const unreadable: [string, Partial<Inputs>][] = [
    ["the state file, missing", { state: parseState(null) }],
    ["the state file, not JSON", { state: parseState("{") }],
    [
      "the state file, failing its schema",
      { state: parseState('{"schema":0}') },
    ],
    ["the journal, missing", { journal: parseJournal(null) }],
    ["the journal, a line not JSON", { journal: parseJournal('{"a":1}\nx\n') }],
    ["the settings, missing", { settings: parseSettings(null) }],
    [
      "the settings, failing their schema",
      { settings: parseSettings('{"limits":{"execute":2}}') },
    ],
    [
      "the settings, not listing the project",
      {
        settings: {
          ok: true,
          value: {
            ...SETTINGS,
            repositories: [{ repository: SERVICE, nodes: [] }],
          },
        },
      },
    ],
    [
      "an agent file, missing",
      {
        models: parseModels({
          planner: agent,
          implementer: null,
          reviewer: agent,
        }),
      },
    ],
    [
      "an agent file, with no model line",
      {
        models: parseModels({
          planner: agent,
          implementer: agent,
          reviewer: "---\nname: reviewer\n---\n",
        }),
      },
    ],
    ["the session snapshot, not given", { sessions: parseSessions(null) }],
    ["the session snapshot, not JSON", { sessions: parseSessions("[") }],
    [
      "the session snapshot, an entry without a field",
      { sessions: parseSessions('[{"id":"s","title":"P1-N001 execute"}]') },
    ],
    ["the time, unreadable", { now: parseNow("yesterday", new Date(NOW)) }],
  ];

  it("starts from inputs that are all readable", () => {
    expect(decide(good()).actions.map((a) => a.key)).toEqual([
      "report:P1-N002:3:hold",
      "start:P1-N001:execute:new",
    ]);
  });

  it.each(unreadable)(
    "%s: the input report, and no start, message or check",
    (_name, change) => {
      const actions = decide({ ...good(), ...change }).actions;
      expect(actions[0]).toMatchObject({
        kind: "report",
        key: "report:project:1:input",
        node: null,
        condition: 1,
        reason: "input",
      });
      expect(actions.every((a) => a.kind === "report")).toBe(true);
      expect(actions.filter((a) => a.key.endsWith(":input"))).toHaveLength(1);
    },
  );

  it("still reports what the state file shows when another input is unreadable", () => {
    const actions = decide({
      ...good(),
      sessions: parseSessions(null),
    }).actions;
    expect(actions.map((a) => a.key)).toEqual([
      "report:project:1:input",
      "report:P1-N002:3:hold",
    ]);
  });

  it("names every unreadable input in the one report", () => {
    const actions = decide({
      ...good(),
      journal: parseJournal(null),
      sessions: parseSessions(null),
    }).actions;
    const text = reportsOf(actions)[0]!.text;
    expect(text).toContain("the journal could not be read");
    expect(text).toContain("no session snapshot was given");
  });
});

// ---------------------------------------------------------------------
// Criterion 5: the settings file
// ---------------------------------------------------------------------

describe("orchestration/orchestrator.json (criterion 5)", () => {
  const text = readFileSync(
    path.join(ROOT, "orchestration/orchestrator.json"),
    "utf8",
  );

  it("passes its schema, with the plan's fields and defaults", () => {
    expect(parseSettings(text)).toEqual({
      ok: true,
      value: {
        limits: { execute: 2, plan: 1 },
        maxReworkRounds: 2,
        checkAfterMinutes: 45,
        weeklyBudget: null,
        repositories: [
          { repository: PROJECT, nodes: [] },
          { repository: SERVICE, nodes: ["P2-N032"] },
        ],
      },
    });
  });

  it("lists the project of the state file", () => {
    const project = (
      JSON.parse(
        readFileSync(path.join(ROOT, "orchestration/state.json"), "utf8"),
      ) as { project: string }
    ).project;
    const settings = parseSettings(text);
    expect(
      settings.ok && settings.value.repositories.map((r) => r.repository),
    ).toContain(project);
  });

  const valid = JSON.parse(text) as Record<string, unknown>;
  const broken: [string, Record<string, unknown>][] = [
    ["an unknown field", { ...valid, limit: 3 }],
    [
      "a limit that is no whole number",
      { ...valid, limits: { execute: 1.5, plan: 1 } },
    ],
    ["a missing limit", { ...valid, limits: { execute: 2 } }],
    ["no rework rounds", { ...valid, maxReworkRounds: 0 }],
    ["a check time of text", { ...valid, checkAfterMinutes: "45" }],
    ["a negative budget", { ...valid, weeklyBudget: -1 }],
    ["repositories that are no list", { ...valid, repositories: PROJECT }],
    [
      "a repository that is no owner/name",
      { ...valid, repositories: [{ repository: "orchestrator", nodes: [] }] },
    ],
    [
      "a node that is no identifier",
      { ...valid, repositories: [{ repository: PROJECT, nodes: ["N1"] }] },
    ],
    [
      "a node listed under two repositories",
      {
        ...valid,
        repositories: [
          { repository: PROJECT, nodes: ["P1-N001"] },
          { repository: SERVICE, nodes: ["P1-N001"] },
        ],
      },
    ],
    [
      "a repository listed twice",
      {
        ...valid,
        repositories: [
          { repository: PROJECT, nodes: [] },
          { repository: PROJECT, nodes: [] },
        ],
      },
    ],
  ];

  it.each(broken)("the schema refuses %s", (_name, value) => {
    expect(parseSettings(JSON.stringify(value)).ok).toBe(false);
  });

  it("is not among the files CI lets only the service write", () => {
    const workflow = readFileSync(
      path.join(ROOT, ".github/workflows/checks.yml"),
      "utf8",
    );
    const guard = workflow
      .split("\n")
      .filter((l) => l.includes("git diff --name-only"));
    expect(guard).toHaveLength(1);
    expect(guard[0]).toContain("orchestration/state.json");
    expect(guard[0]).not.toContain("orchestrator.json");
  });
});

// ---------------------------------------------------------------------
// Criterion 8: the brief
// ---------------------------------------------------------------------

describe("the brief (criterion 8, plan section 6)", () => {
  it("names the delegating session, the node, the step and the role, and the two standing lines", () => {
    const s = state([
      node({ id: "P1-N001", title: "The part to build", stage: "specified" }),
    ]);
    const start = startsOf(run({ state: s, self: "session_orchestrator" }))[0]!;
    expect(start.brief).toBe(
      [
        "Delegation brief from session session_orchestrator.",
        "",
        "Node: P1-N001 (The part to build). Step: execute. Role: implementer (.claude/agents/implementer.md).",
        "",
        "Claim this task with task_open before any work. The brief authorises this node and this step, and nothing else.",
        "Work on a branch of your own, made for this task.",
        "Attach no second repository to your session.",
      ].join("\n"),
    );
  });

  const reworkState = () =>
    state(verifying("P1-N001", "P1-N002", true), [
      task({
        id: "T001",
        node: "P1-N001",
        step: "execute",
        status: "closed",
        closed: "2026-11-17T11:00:00Z",
        pr: `${PROJECT}#7`,
      }),
      task({
        id: "T002",
        node: "P1-N002",
        step: "verify",
        status: "blocked",
        closed: "2026-11-17T11:30:00Z",
      }),
    ]);

  const CONTINUED = [
    "Delegation brief from session session_orchestrator.",
    "",
    "Node: P1-N001 (Work P1-N001). Step: execute. Role: implementer (.claude/agents/implementer.md).",
    "",
    "Claim this task with task_open before any work. The brief authorises this node and this step, and nothing else.",
    "This is a rework: the verification failed after task T001. task_open answers what failed.",
    `Continue on pull request ${PROJECT}#7: check out its head branch and commit there. Open no second pull request.`,
    "Work on a branch of your own: for this task that is the pull request's head branch.",
    "Attach no second repository to your session.",
  ].join("\n");

  it("for continued work names the pull request and says to continue on its head branch", () => {
    const actions = run({ state: reworkState() });
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({
      kind: "start",
      key: "start:P1-N001:execute:T002",
      pr: `${PROJECT}#7`,
      brief: CONTINUED,
    });
  });

  it("sends the same text when the work goes by message to the session that holds it", () => {
    const actions = run({
      state: reworkState(),
      journal: [opened("T001", "P1-N001", "session_a")],
      sessions: [
        session({
          id: "session_a",
          title: "P1-N001 execute",
          created: "2026-11-17T10:00:00Z",
          status: "completed",
        }),
      ],
    });
    expect(actions).toEqual([
      {
        kind: "message",
        key: "message:session_a:continued:T001",
        session: "session_a",
        node: "P1-N001",
        text: CONTINUED,
        mark: "continued T001 2026-11-17T12:00Z",
      },
    ]);
  });

  it("prints neither again once the mark is on the session", () => {
    const actions = run({
      state: reworkState(),
      journal: [opened("T001", "P1-N001", "session_a")],
      sessions: [
        session({
          id: "session_a",
          title: "P1-N001 execute; continued T001 2026-11-17T11:40Z",
          created: "2026-11-17T10:00:00Z",
          status: "completed",
        }),
      ],
    });
    expect(actions).toEqual([]);
  });

  it("says a step is offered again after a task that did not finish it", () => {
    const s = state(
      [node({ id: "P1-N001", title: "The node", stage: "executing" })],
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "execute",
          status: "needs-judgment",
          closed: "2026-11-17T11:00:00Z",
          pr: `${PROJECT}#9`,
        }),
      ],
    );
    const start = startsOf(run({ state: s }))[0]!;
    expect(start.pr).toBe(`${PROJECT}#9`);
    expect(start.brief).toContain(
      "This step is offered again after task T001, which did not finish it.",
    );
    expect(start.brief).toContain(`Continue on pull request ${PROJECT}#9:`);
  });

  it("starts every verify afresh, also after a verification that failed", () => {
    const s = reworkState();
    s.nodes[1]!.hold = null;
    s.tasks.push(
      task({
        id: "T003",
        node: "P1-N001",
        step: "execute",
        status: "closed",
        closed: "2026-11-17T11:45:00Z",
        pr: `${PROJECT}#7`,
      }),
    );
    const actions = run({
      state: s,
      journal: [
        {
          task: "T002",
          session: "session_r",
          note: "task_open T002 on P1-N002, verify",
        },
      ],
      sessions: [
        session({
          id: "session_r",
          title: "P1-N002 verify",
          created: "2026-11-17T11:20:00Z",
          status: "completed",
        }),
      ],
    });
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({
      kind: "start",
      key: "start:P1-N002:verify:T002",
      pr: null,
    });
    expect((actions[0] as StartAction).brief).not.toContain("pull request");
  });

  it("names the orchestrator by its role when no identifier is given", () => {
    expect(
      brief({
        self: null,
        node: "P1-N001",
        nodeTitle: "The node",
        step: "plan",
        role: "planner",
        continues: null,
      }).split("\n")[0],
    ).toBe("Delegation brief from the orchestrator session.");
  });
});

// ---------------------------------------------------------------------
// Criteria 19 and 20
// ---------------------------------------------------------------------

describe("the step of a specified node (criterion 19)", () => {
  it("is break down when its note contains `Next step: break down`, and execute without it", () => {
    const s = state([
      node({
        id: "P1-N001",
        title: "With the words",
        stage: "specified",
        note: "The owner's input. Next step: break down (the plan's slices).",
      }),
      node({
        id: "P1-N002",
        title: "Without them",
        stage: "specified",
        note: "The next step is to break this down.",
      }),
      node({ id: "P1-N003", title: "Without a note", stage: "specified" }),
    ]);
    const starts = startsOf(run({ state: s }));
    expect(starts.map((x) => [x.key, x.step, x.role, x.title])).toEqual([
      [
        "start:P1-N001:break down:new",
        "break down",
        "planner",
        "P1-N001 break down",
      ],
      [
        "start:P1-N002:execute:new",
        "execute",
        "implementer",
        "P1-N002 execute",
      ],
      [
        "start:P1-N003:execute:new",
        "execute",
        "implementer",
        "P1-N003 execute",
      ],
    ]);
    expect(starts[0]!.brief).toContain("Step: break down. Role: planner");
  });
});

describe("the repository of a start (criterion 20, S4)", () => {
  const s = () =>
    state([
      node({ id: "P1-N090", title: "Work elsewhere", stage: "specified" }),
      node({ id: "P1-N091", title: "Work here", stage: "specified" }),
    ]);

  it("is the one the settings list the node under, else the state file's project", () => {
    expect(
      startsOf(run({ state: s() })).map((x) => [x.node, x.repository]),
    ).toEqual([
      ["P1-N090", SERVICE],
      ["P1-N091", PROJECT],
    ]);
  });

  it("is its parent's for a check node", () => {
    const actions = run({
      state: state(verifying("P1-N090", "P1-N092", false)),
    });
    expect(startsOf(actions).map((x) => [x.node, x.repository])).toEqual([
      ["P1-N092", SERVICE],
    ]);
  });

  it("is never one the settings do not list", () => {
    const actions = run({
      state: s(),
      settings: { repositories: [{ repository: SERVICE, nodes: ["P1-N090"] }] },
    });
    expect(startsOf(actions)).toEqual([]);
    expect(actions.map((a) => a.key)).toEqual(["report:project:1:input"]);
    for (const settings of [SETTINGS, { ...SETTINGS, repositories: [] }]) {
      const listed = settings.repositories.map((r) => r.repository);
      for (const start of startsOf(run({ state: s(), settings }))) {
        expect(listed).toContain(start.repository);
      }
    }
  });
});

// ---------------------------------------------------------------------
// Titles and marks (S2)
// ---------------------------------------------------------------------

describe("titles and marks (S2)", () => {
  it("reads a title and its marks", () => {
    expect(parseTitle("P4-N038 execute")).toEqual({
      node: "P4-N038",
      step: "execute",
      marks: [],
    });
    expect(
      parseTitle(
        "P4-N038 break down; checked T152 2026-11-17T22:10Z; nudged T152 2026-11-17T22:11Z",
      ),
    ).toEqual({
      node: "P4-N038",
      step: "break down",
      marks: [
        { kind: "checked", task: "T152", at: Date.parse("2026-11-17T22:10Z") },
        { kind: "nudged", task: "T152", at: Date.parse("2026-11-17T22:11Z") },
      ],
    });
  });

  it("reads no title that departs from the grammar", () => {
    for (const title of [
      "Implementer: P4-N038 one branch",
      "P4-N038 review",
      "P4-N038 execute; checked T152",
      "P4-N038 execute; checked T152 soon",
      "P4-N038 execute, checked T152 2026-11-17T22:10Z",
    ]) {
      expect(parseTitle(title)).toBeNull();
    }
  });

  it("writes a mark's time to the minute, in a form it reads back", () => {
    const stamp = markTime(new Date("2026-11-17T22:10:41.123Z"));
    expect(stamp).toBe("2026-11-17T22:10Z");
    expect(
      parseTitle(`P1-N001 plan; checked T001 ${stamp}`)?.marks[0]?.at,
    ).toBe(Date.parse("2026-11-17T22:10:00Z"));
  });

  it("reads the status bucket as `get_session` gives it", () => {
    const read = parseSessions(
      JSON.stringify([
        {
          id: "session_a",
          title: "P1-N001 execute",
          created: "2026-11-17T11:55:00Z",
          status: "SESSION_STATUS_BUCKET_WORKING",
          model: "m",
        },
      ]),
    );
    expect(read.ok && read.value[0]!.status).toBe("working");
  });
});

// ---------------------------------------------------------------------
// Criterion 1: the command
// ---------------------------------------------------------------------

describe("orchestrate_next.ts (criterion 1)", () => {
  const script = path.join(ROOT, "plugin/scripts/orchestrate_next.ts");
  const dir = mkdtempSync(path.join(tmpdir(), "orchestrate-"));
  const write = (name: string, text: string) => {
    const file = path.join(dir, name);
    mkdirSync(path.dirname(file), { recursive: true });
    writeFileSync(file, text);
    return file;
  };
  const stateFile = write(
    "state.json",
    JSON.stringify(
      state(
        [
          node({ id: "P1-N001", title: "To plan", stage: "identified" }),
          node({
            id: "P1-N002",
            title: "Held",
            stage: "planned",
            hold: { kind: "gated", reason: "owner review of the plan" },
          }),
          node({ id: "P1-N003", title: "Unchecked", stage: "executing" }),
          node({ id: "P1-N004", title: "Idle", stage: "executing" }),
        ],
        [
          task({
            id: "T001",
            node: "P1-N003",
            step: "execute",
            opened: "2026-11-17T11:00:00Z",
          }),
          task({
            id: "T002",
            node: "P1-N004",
            step: "execute",
            opened: "2026-11-17T11:00:00Z",
          }),
        ],
      ),
    ),
  );
  const journalFile = write(
    "journal.jsonl",
    [
      opened("T001", "P1-N003", "session_a"),
      opened("T002", "P1-N004", "session_b"),
    ]
      .map((l) => JSON.stringify(l))
      .join("\n") + "\n",
  );
  const settingsFile = write("orchestrator.json", JSON.stringify(SETTINGS));
  for (const [role, model] of Object.entries(MODELS)) {
    write(`agents/${role}.md`, `---\nname: ${role}\nmodel: ${model}\n---\n`);
  }
  const sessionsFile = write(
    "sessions.json",
    JSON.stringify([
      session({ id: "session_a", title: "P1-N003 execute" }),
      session({
        id: "session_b",
        title: "P1-N004 execute; checked T002 2026-11-17T11:50Z",
        status: "completed",
      }),
    ]),
  );
  const command = (...args: string[]) =>
    spawnSync(process.execPath, [script, ...args], {
      cwd: dir,
      encoding: "utf8",
    });
  const all = [
    "--state",
    stateFile,
    "--journal",
    journalFile,
    "--settings",
    settingsFile,
    "--agents",
    path.join(dir, "agents"),
    "--sessions",
    sessionsFile,
    "--self",
    "session_orchestrator",
    "--now",
    NOW,
  ];

  it("prints `{ actions }` in the shapes of S1 from inputs given as paths", () => {
    const out = command(...all);
    expect(out.status).toBe(0);
    const printed = JSON.parse(out.stdout) as { actions: Action[] };
    expect(Object.keys(printed)).toEqual(["actions"]);
    expect(printed.actions.map((a) => a.key)).toEqual([
      "report:P1-N002:3:hold",
      "check:T001",
      "message:session_b:nudged:T002",
      "start:P1-N001:plan:new",
    ]);
    const fields = (kind: string) =>
      Object.keys(printed.actions.find((a) => a.kind === kind)!);
    expect(fields("report")).toEqual([
      "kind",
      "key",
      "node",
      "condition",
      "reason",
      "text",
    ]);
    expect(fields("check")).toEqual([
      "kind",
      "key",
      "task",
      "node",
      "session",
      "mark",
    ]);
    expect(fields("message")).toEqual([
      "kind",
      "key",
      "session",
      "node",
      "text",
      "mark",
    ]);
    expect(fields("start")).toEqual([
      "kind",
      "key",
      "node",
      "step",
      "role",
      "model",
      "repository",
      "title",
      "brief",
      "pr",
    ]);
  });

  it("prints the same keys on a second run of the same inputs", () => {
    const again = (now: string) =>
      (
        JSON.parse(command(...all.slice(0, -1), now).stdout) as {
          actions: Action[];
        }
      ).actions.map((a) => a.key);
    expect(again("2026-11-17T12:03:00Z")).toEqual(again(NOW));
  });

  it("takes its defaults from the working directory, and reports a snapshot not given", () => {
    const out = command("--now", NOW);
    expect(out.status).toBe(0);
    const printed = JSON.parse(out.stdout) as { actions: Action[] };
    expect(printed.actions[0]).toMatchObject({
      key: "report:project:1:input",
    });
    expect(printed.actions.every((a) => a.kind === "report")).toBe(true);
  });

  it("refuses an option it does not know", () => {
    const out = command("--stat", stateFile);
    expect(out.status).toBe(2);
    expect(out.stderr).toContain("unknown option --stat");
    expect(out.stdout).toBe("");
  });

  it("imports nothing that reaches the network or git", () => {
    const allowed = [
      "node:fs",
      "node:path",
      "./lib/node-preflight.ts",
      "./lib/orchestrate.ts",
      "project-orchestrator-service/dist/model/check.js",
      "project-orchestrator-service/dist/model/loop.js",
      "project-orchestrator-service/dist/model/schema.js",
    ];
    for (const file of [
      "plugin/scripts/orchestrate_next.ts",
      "plugin/scripts/lib/orchestrate.ts",
    ]) {
      const source = readFileSync(path.join(ROOT, file), "utf8");
      const imported = [
        ...source.matchAll(/\bfrom\s+"([^"]+)"/g),
        ...source.matchAll(/\bimport\(\s*"([^"]+)"\s*\)/g),
      ].map((m) => m[1]!);
      expect(imported.length).toBeGreaterThan(0);
      for (const name of imported) expect(allowed).toContain(name);
      expect(source).not.toMatch(
        /\bfetch\(|child_process|\bgit\s+(fetch|show)/,
      );
    }
  });
});
