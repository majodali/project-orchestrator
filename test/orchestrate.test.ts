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
  fire: null,
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
      // The service sets a check node's repository from its parent's
      // at creation (node_add); the fixture mirrors that directly.
      repository: extra.repository ?? null,
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

  it("starts a verify while another node's task is open on its plan document (D087)", () => {
    const s = state(
      [
        node({ id: "P1-N001", title: "First", stage: "executing", ...shared }),
        ...verifying("P1-N002", "P1-N003", false, shared),
      ],
      [task({ id: "T001", node: "P1-N001", step: "execute" })],
    );
    s.nodes[2]!.docs = { plan: PLAN, spec: null };
    expect(keys({ state: s })).toEqual(["start:P1-N003:verify:new"]);
  });

  it("starts a verify beside a pending start on its plan document (D087)", () => {
    const s = state([
      node({ id: "P1-N001", title: "First", stage: "specified", ...shared }),
      ...verifying("P1-N002", "P1-N003", false, shared),
    ]);
    s.nodes[2]!.docs = { plan: PLAN, spec: null };
    const sessions = [session({ id: "session_a", title: "P1-N001 execute" })];
    expect(keys({ state: s, sessions })).toEqual(["start:P1-N003:verify:new"]);
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
      "report:P1-N001:3:decision:D007",
      "P1-N001",
      3,
      "decision",
    ]);
    expect(reportsOf(actions)[0]!.text).toContain("D007");
    expect(only(withDecision(null))[3]).toBe("decision");
  });

  it("4 asks: an open decision a task asked at its close", () => {
    expect(only(withDecision("Asked by T012 at close."))).toEqual([
      "report:P1-N001:4:asks:D007",
      "P1-N001",
      4,
      "asks",
    ]);
  });

  it("changes the key when a second decision opens on the node (D088)", () => {
    const two = (rationale: string | null) =>
      run({
        state: state(
          [node({ id: "P1-N001", title: "The node", stage: "specified" })],
          [],
          [
            decision({ id: "D007", node: "P1-N001", rationale }),
            decision({ id: "D009", node: "P1-N001", rationale }),
          ],
        ),
      }).map((a) => a.key);
    expect(two("Asked by T012 at close.")).toEqual([
      "report:P1-N001:4:asks:D007,D009",
    ]);
    expect(two(null)).toEqual(["report:P1-N001:3:decision:D007,D009"]);
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
        fire: {
          enabled: true,
          perTaskHourlyCap: 30,
          perAccountHourlyCap: 100,
          perAccountDailyCap: 200,
          repositories: {
            "majodali/project-orchestrator": {
              planner: {
                trig: "trig_01EL3D7C5ZaAcmCnvGVUAoxd",
                secret: "agent/project-orchestrator/planner",
              },
              implementer: {
                trig: "trig_01C5J6Q2eQGVpW3bkL4ffDdx",
                secret: "agent/project-orchestrator/implementer",
              },
              reviewer: {
                trig: "trig_01NAdmvA9ib1UZAeLBe8p7mj",
                secret: "agent/project-orchestrator/reviewer",
              },
            },
            "majodali/project-orchestrator-service": {
              implementer: {
                trig: "trig_01BU5iiU2c7K1XTyquEbJLMG",
                secret: "agent/project-orchestrator-service/implementer",
              },
            },
          },
        },
      },
    });
  });

  const valid = JSON.parse(text) as Record<string, unknown>;

  it("no longer carries a `repositories` key (P2-N056 criterion 3, 4)", () => {
    expect(valid).not.toHaveProperty("repositories");
  });

  it("carries no token anywhere in `fire` (criterion 1)", () => {
    expect(text).not.toContain("token");
  });

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
    [
      "a `repositories` key, retired (P2-N056 criterion 4)",
      { ...valid, repositories: [{ repository: PROJECT, nodes: [] }] },
    ],
    ["`fire` as no object", { ...valid, fire: "on" }],
    [
      "`fire` with an unknown field",
      {
        ...valid,
        fire: { ...(valid.fire as object), token: "sk-ant-oat01-x" },
      },
    ],
    [
      "`fire.enabled` as no boolean",
      { ...valid, fire: { ...(valid.fire as object), enabled: "false" } },
    ],
    [
      "`fire.perTaskHourlyCap` of zero",
      { ...valid, fire: { ...(valid.fire as object), perTaskHourlyCap: 0 } },
    ],
    [
      "`fire.repositories` as no object",
      { ...valid, fire: { ...(valid.fire as object), repositories: [] } },
    ],
    [
      "a `fire.repositories` entry with an unknown role",
      {
        ...valid,
        fire: {
          ...(valid.fire as object),
          repositories: {
            [PROJECT]: { owner: { trig: "trig_x", secret: "fire/x" } },
          },
        },
      },
    ],
    [
      "a `fire.repositories` role entry carrying a token field",
      {
        ...valid,
        fire: {
          ...(valid.fire as object),
          repositories: {
            [PROJECT]: {
              implementer: {
                trig: "trig_x",
                secret: "fire/x",
                token: "sk-ant-oat01-x",
              },
            },
          },
        },
      },
    ],
    [
      "a `fire.repositories` role entry with an empty trig",
      {
        ...valid,
        fire: {
          ...(valid.fire as object),
          repositories: {
            [PROJECT]: { implementer: { trig: "", secret: "fire/x" } },
          },
        },
      },
    ],
  ];

  it.each(broken)("the schema refuses %s", (_name, value) => {
    expect(parseSettings(JSON.stringify(value)).ok).toBe(false);
  });

  it("accepts a real repository/role fire configuration", () => {
    const withFire = {
      ...valid,
      fire: {
        ...(valid.fire as object),
        enabled: true,
        repositories: {
          [PROJECT]: {
            planner: { trig: "trig_planner", secret: "fire/planner" },
            implementer: { trig: "trig_impl", secret: "fire/impl" },
          },
        },
      },
    };
    const result = parseSettings(JSON.stringify(withFire));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.value.fire).toEqual({
        enabled: true,
        perTaskHourlyCap: 30,
        perAccountHourlyCap: 100,
        perAccountDailyCap: 200,
        repositories: {
          [PROJECT]: {
            planner: { trig: "trig_planner", secret: "fire/planner" },
            implementer: { trig: "trig_impl", secret: "fire/impl" },
          },
        },
      });
    }
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

describe("the repository of a start (P2-N056 criterion 4, F7)", () => {
  const s = () =>
    state([
      node({
        id: "P1-N090",
        title: "Work elsewhere",
        stage: "specified",
        repository: SERVICE,
      }),
      node({ id: "P1-N091", title: "Work here", stage: "specified" }),
    ]);

  it("is the node's own repository, else the state file's project when it is null", () => {
    expect(
      startsOf(run({ state: s() })).map((x) => [x.node, x.repository]),
    ).toEqual([
      ["P1-N090", SERVICE],
      ["P1-N091", PROJECT],
    ]);
  });

  it("is a check node's own repository", () => {
    const actions = run({
      state: state(
        verifying("P1-N090", "P1-N092", false, { repository: SERVICE }),
      ),
    });
    expect(startsOf(actions).map((x) => [x.node, x.repository])).toEqual([
      ["P1-N092", SERVICE],
    ]);
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

// ---------------------------------------------------------------------
// P2-N031: criteria 10 and 11
// ---------------------------------------------------------------------

describe("checks, nudges and their reports (criterion 11, S3)", () => {
  const TASK_OPENED = "2026-11-17T11:00:00Z";
  const atWork = (openedAt = TASK_OPENED) =>
    state(
      [node({ id: "P1-N001", title: "The node", stage: "executing" })],
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "execute",
          opened: openedAt,
        }),
      ],
    );
  const journal = [opened("T001", "P1-N001", "session_a")];
  const holder = (marks: string, status = "working") => [
    session({
      id: "session_a",
      title: `P1-N001 execute${marks}`,
      created: "2026-11-17T10:55:00Z",
      status,
    }),
  ];
  const NUDGE = [
    "From session session_orchestrator: task T001 on P1-N001, execute, has been open since 2026-11-17T11:00:00Z and this session is not working.",
    "If its work is finished, close it with task_close. If it cannot finish, close it needs-judgment or blocked and say why.",
  ].join("\n");

  it("gives nothing for an open task no older than `checkAfterMinutes`", () => {
    const given = (now: string): Given => ({
      state: atWork(),
      journal,
      sessions: holder("", "completed"),
      now,
    });
    expect(run(given("2026-11-17T11:40:00Z"))).toEqual([]);
    expect(run(given("2026-11-17T11:45:00Z"))).toEqual([]);
    expect(keys(given("2026-11-17T11:46:00Z"))).toEqual(["check:T001"]);
  });

  it("a check, then a message for a session not working, then the no-close report", () => {
    // 50 minutes after the task opened: a check, whatever the status.
    const first = run({
      state: atWork(),
      journal,
      sessions: holder("", "completed"),
      now: "2026-11-17T11:50:00Z",
    });
    expect(first).toEqual([
      {
        kind: "check",
        key: "check:T001",
        task: "T001",
        node: "P1-N001",
        session: "session_a",
        mark: "checked T001 2026-11-17T11:50Z",
      },
    ]);

    // The check is carried out: its mark is on the title, the status
    // is fresh. The session is not working, so it is told.
    const checked = "; checked T001 2026-11-17T11:50Z";
    const second = run({
      state: atWork(),
      journal,
      sessions: holder(checked, "completed"),
      now: "2026-11-17T11:50:00Z",
    });
    expect(second).toEqual([
      {
        kind: "message",
        key: "message:session_a:nudged:T001",
        session: "session_a",
        node: "P1-N001",
        text: NUDGE,
        mark: "nudged T001 2026-11-17T11:50Z",
      },
    ]);

    // Told once: nothing more until `checkAfterMinutes` have passed
    // since the last mark.
    const nudged = `${checked}; nudged T001 2026-11-17T11:50Z`;
    const told = (now: string): Given => ({
      state: atWork(),
      journal,
      sessions: holder(nudged, "completed"),
      now,
    });
    expect(run(told("2026-11-17T11:51:00Z"))).toEqual([]);
    expect(run(told("2026-11-17T12:35:00Z"))).toEqual([]);

    const third = run(told("2026-11-17T12:36:00Z"));
    expect(third).toHaveLength(1);
    expect(third[0]).toMatchObject({
      kind: "report",
      key: "report:P1-N001:1:no-close",
      node: "P1-N001",
      condition: 1,
      reason: "no-close",
    });
    expect((third[0] as ReportAction).text).toContain("T001");
    expect((third[0] as ReportAction).text).toContain("session_a");
  });

  it("sends no message to a session that is working, and reports it when the task stays open", () => {
    const checked = "; checked T001 2026-11-17T11:50Z";
    const given = (now: string): Given => ({
      state: atWork(),
      journal,
      sessions: holder(checked, "working"),
      now,
    });
    expect(run(given("2026-11-17T11:51:00Z"))).toEqual([]);
    expect(keys(given("2026-11-17T12:36:00Z"))).toEqual([
      "report:P1-N001:1:no-close",
    ]);
  });

  it("takes every status but `working` for not working", () => {
    for (const status of [
      "SESSION_STATUS_BUCKET_COMPLETED",
      "SESSION_STATUS_BUCKET_BLOCKED",
      "SESSION_STATUS_BUCKET_FAILED",
      "SESSION_STATUS_BUCKET_REVIEW_READY",
    ]) {
      const read = parseSessions(
        JSON.stringify(holder("; checked T001 2026-11-17T11:50Z", status)),
      );
      expect(read.ok).toBe(true);
      expect(
        keys({
          state: atWork(),
          journal,
          sessions: read.ok ? read.value : [],
          now: "2026-11-17T11:51:00Z",
        }),
      ).toEqual(["message:session_a:nudged:T001"]);
    }
  });

  it("reports a task open past the limit that no session holds", () => {
    expect(keys({ state: atWork(), now: "2026-11-17T11:50:00Z" })).toEqual([
      "report:P1-N001:1:no-session",
    ]);
  });

  // A rework sent by message to the session of the task before it.
  const reworkState = () =>
    state(verifying("P1-N001", "P1-N002", true), [
      task({
        id: "T001",
        node: "P1-N001",
        step: "execute",
        status: "closed",
        opened: "2026-11-17T10:00:00Z",
        closed: "2026-11-17T10:30:00Z",
        pr: `${PROJECT}#7`,
      }),
      task({
        id: "T002",
        node: "P1-N002",
        step: "verify",
        status: "blocked",
        opened: "2026-11-17T10:35:00Z",
        closed: "2026-11-17T10:50:00Z",
      }),
    ]);
  const continued = (at: string, extra: Partial<SessionEntry> = {}) => [
    session({
      id: "session_a",
      title: `P1-N001 execute; continued T001 ${at}`,
      created: "2026-11-17T09:55:00Z",
      status: "completed",
      ...extra,
    }),
  ];

  it("no-claim: a session sent continued work that opened no task within `checkAfterMinutes`", () => {
    const given = (at: string): Given => ({
      state: reworkState(),
      journal,
      sessions: continued(at),
    });
    // Sent 40 minutes ago and not yet claimed: the session is neither
    // reported nor told again, although its status is not `working`.
    expect(run(given("2026-11-17T11:20Z"))).toEqual([]);
    const late = run(given("2026-11-17T11:10Z"));
    expect(late.map((a) => a.key)).toEqual(["report:P1-N001:1:no-claim"]);
    expect((late[0] as ReportAction).text).toContain("session_a");
  });

  it("no-claim: a started session that opened no task within `checkAfterMinutes`", () => {
    const given = (created: string): Given => ({
      state: state([
        node({ id: "P1-N001", title: "The node", stage: "specified" }),
      ]),
      sessions: [
        session({
          id: "session_a",
          title: "P1-N001 execute",
          created,
          status: "completed",
        }),
      ],
    });
    expect(run(given("2026-11-17T11:20:00Z"))).toEqual([]);
    expect(keys(given("2026-11-17T11:10:00Z"))).toEqual([
      "report:P1-N001:1:no-claim",
    ]);
  });

  it("model: a pending start on another model than its role's", () => {
    const actions = run({
      state: reworkState(),
      journal,
      sessions: continued("2026-11-17T11:40Z", { model: "model-other" }),
    });
    expect(actions.map((a) => a.key)).toEqual(["report:P1-N001:1:model"]);
    expect((actions[0] as ReportAction).text).toContain("model-other");
    expect((actions[0] as ReportAction).text).toContain("model-implementer");
  });

  it("model: the session of an open task on another model, before any check is due", () => {
    const actions = run({
      state: atWork("2026-11-17T11:50:00Z"),
      journal,
      sessions: [
        session({
          id: "session_a",
          title: "P1-N001 execute",
          model: "model-other",
        }),
      ],
    });
    expect(actions.map((a) => a.key)).toEqual(["report:P1-N001:1:model"]);
  });

  it("does not take a task that closed before a session was started for that session's", () => {
    // T001 closed needs-judgment at 11:00. A session started at 11:30
    // for the step offered again has not claimed yet: it is a pending
    // start, and the node gets no second start and no message.
    const s = state(
      [node({ id: "P1-N001", title: "The node", stage: "executing" })],
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "execute",
          status: "needs-judgment",
          opened: "2026-11-17T10:00:00Z",
          closed: "2026-11-17T11:00:00Z",
          pr: `${PROJECT}#9`,
        }),
      ],
    );
    expect(keys({ state: s })).toEqual(["start:P1-N001:execute:T001"]);
    expect(
      run({
        state: s,
        sessions: [
          session({
            id: "session_b",
            title: "P1-N001 execute",
            created: "2026-11-17T11:30:00Z",
            status: "completed",
          }),
        ],
      }),
    ).toEqual([]);
  });
});

describe("continued work (criterion 10, S3)", () => {
  // `execute` is offered again: its last task closed needs-judgment
  // and the owner has answered.
  const again = () =>
    state(
      [node({ id: "P1-N001", title: "The node", stage: "executing" })],
      [
        task({
          id: "T001",
          node: "P1-N001",
          step: "execute",
          status: "needs-judgment",
          opened: "2026-11-17T10:00:00Z",
          closed: "2026-11-17T11:00:00Z",
          pr: `${PROJECT}#9`,
        }),
      ],
    );
  const journal = [opened("T001", "P1-N001", "session_a")];
  const holder = (extra: Partial<SessionEntry> = {}) =>
    session({
      id: "session_a",
      title: "P1-N001 execute",
      created: "2026-11-17T09:55:00Z",
      status: "completed",
      ...extra,
    });

  it("goes by message, marked `continued <task>`, to the last task's session when the snapshot holds it", () => {
    const actions = run({ state: again(), journal, sessions: [holder()] });
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({
      kind: "message",
      key: "message:session_a:continued:T001",
      session: "session_a",
      node: "P1-N001",
      mark: "continued T001 2026-11-17T12:00Z",
    });
    const text = (actions[0] as { text: string }).text;
    expect(text).toContain(
      "This step is offered again after task T001, which did not finish it.",
    );
    expect(text).toContain(`Continue on pull request ${PROJECT}#9:`);
  });

  it("goes by start with `pr` when the snapshot does not hold that session", () => {
    const actions = run({ state: again(), journal, sessions: [] });
    expect(actions).toHaveLength(1);
    expect(actions[0]).toMatchObject({
      kind: "start",
      key: "start:P1-N001:execute:T001",
      title: "P1-N001 execute",
      pr: `${PROJECT}#9`,
    });
    expect((actions[0] as StartAction).brief).toContain(
      `Continue on pull request ${PROJECT}#9:`,
    );
  });

  it("goes by start with `pr` when that session is archived", () => {
    // `get_session` gives no status bucket `archived`: the snapshot
    // says it with the session status, read the same way.
    const read = parseSessions(
      JSON.stringify([holder({ status: "SESSION_STATUS_ARCHIVED" })]),
    );
    expect(read.ok && read.value[0]!.status).toBe("archived");
    for (const status of ["archived", "SESSION_STATUS_ARCHIVED"]) {
      const sessions = parseSessions(JSON.stringify([holder({ status })]));
      expect(
        keys({
          state: again(),
          journal,
          sessions: sessions.ok ? sessions.value : [],
        }),
      ).toEqual(["start:P1-N001:execute:T001"]);
    }
  });

  it("prints the message no more once its mark is in the snapshot", () => {
    expect(
      run({
        state: again(),
        journal,
        sessions: [
          holder({
            title: "P1-N001 execute; continued T001 2026-11-17T11:59Z",
          }),
        ],
      }),
    ).toEqual([]);
  });

  it("prints the start no more once the new session is in the snapshot", () => {
    expect(
      run({
        state: again(),
        journal,
        sessions: [
          session({
            id: "session_b",
            title: "P1-N001 execute",
            created: "2026-11-17T11:59:00Z",
          }),
        ],
      }),
    ).toEqual([]);
  });

  it("prints neither once the continued session has opened its task", () => {
    const s = again();
    s.tasks.push(
      task({
        id: "T002",
        node: "P1-N001",
        step: "execute",
        opened: "2026-11-17T11:58:00Z",
      }),
    );
    expect(
      run({
        state: s,
        journal: [...journal, opened("T002", "P1-N001", "session_a")],
        sessions: [
          holder({
            title: "P1-N001 execute; continued T001 2026-11-17T11:57Z",
          }),
        ],
      }),
    ).toEqual([]);
  });

  it("sends a rework the same way: by message to the session that holds the pull request", () => {
    const s = state(verifying("P1-N001", "P1-N002", true), [
      task({
        id: "T001",
        node: "P1-N001",
        step: "execute",
        status: "closed",
        opened: "2026-11-17T10:00:00Z",
        closed: "2026-11-17T10:30:00Z",
        pr: `${PROJECT}#7`,
      }),
      task({
        id: "T002",
        node: "P1-N002",
        step: "verify",
        status: "blocked",
        opened: "2026-11-17T10:35:00Z",
        closed: "2026-11-17T10:50:00Z",
      }),
    ]);
    expect(keys({ state: s, journal, sessions: [holder()] })).toEqual([
      "message:session_a:continued:T001",
    ]);
    expect(keys({ state: s, journal, sessions: [] })).toEqual([
      "start:P1-N001:execute:T002",
    ]);
  });
});
