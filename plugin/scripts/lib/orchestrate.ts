/**
 * What the orchestrator session does next (P2-N030; the plan is
 * docs/plans/orchestrator-session.md, the specification
 * docs/specs/orchestrator-session.md, cited below as S1 to S6).
 *
 * `decide` is pure: the state file, the journal, the settings, the
 * role agents' models, the session snapshot and the time go in, and a
 * list of actions comes out. It makes no network call and no git
 * call, and it keeps nothing between runs: what was started, checked
 * and sent is read back from the snapshot (S2). Which nodes offer a
 * step is the service's own `candidates(state)`, never a second copy
 * of the rule (S1).
 *
 * Every predicate fails closed (plan section 8): an input that is
 * missing or unreadable yields the `input` report and no `start`,
 * `message` or `check`.
 *
 * Three readings this file makes where the specification leaves room,
 * each pinned by a test:
 *  - A `verify` step always gets a fresh session (plan section 6),
 *    also when the check node's last verification closed `blocked` or
 *    `needs-judgment`: S3's continued work is read as work on a work
 *    node.
 *  - The shared-document rule of S4 never holds a `verify` start: a
 *    reviewer edits nothing (D087, a verify start is exempt from the
 *    shared-document rule).
 *  - A scope hold is recognised with the task prefix the service
 *    writes: `T123: Scope changed during ...` (S5 gives the text
 *    without the prefix).
 */

import {
  childrenOf,
  nodesById,
  pausedBy,
} from "project-orchestrator-service/dist/model/check.js";
import {
  STEP_ROLES,
  candidates,
  failedCheckNode,
  offerOn,
} from "project-orchestrator-service/dist/model/loop.js";
import {
  stateSchema,
  type State,
} from "project-orchestrator-service/dist/model/schema.js";

type Node = State["nodes"][number];
type Task = State["tasks"][number];
type Step = Task["step"];

// ---------------------------------------------------------------------
// The inputs (S1)
// ---------------------------------------------------------------------

/** An input as read: its value, or why it could not be read. */
export type Read<T> = { ok: true; value: T } | { ok: false; why: string };

export interface Settings {
  limits: { execute: number; plan: number };
  maxReworkRounds: number;
  checkAfterMinutes: number;
  weeklyBudget: number | null;
  /** Every repository a session may be started in. An entry's `nodes`
   * are started there; every other node is started in the state
   * file's project, which must be listed too (S4). */
  repositories: { repository: string; nodes: string[] }[];
}

/** One line of the journal, as far as the script reads it. */
export interface JournalLine {
  task: string | null;
  session: string | null;
  note: string;
}

/** One session of the snapshot (S2). `status` is the status bucket,
 * as `working`, or `archived` for a session that is archived: the
 * bucket never says archived, so the orchestrator writes the session
 * status then, and `SESSION_STATUS_ARCHIVED` reads as `archived`. */
export interface SessionEntry {
  id: string;
  title: string;
  created: string;
  status: string;
  model: string;
}

export interface Inputs {
  state: Read<State>;
  journal: Read<JournalLine[]>;
  settings: Read<Settings>;
  /** The `model` line of each role's agent file, by role. */
  models: Read<Record<string, string>>;
  sessions: Read<SessionEntry[]>;
  /** The orchestrator session's identifier, for the brief. */
  self: string | null;
  now: Read<Date>;
}

// ---------------------------------------------------------------------
// The output (S1)
// ---------------------------------------------------------------------

export type Condition = 1 | 2 | 3 | 4;
export type Reason =
  | "rework-limit"
  | "no-session"
  | "no-close"
  | "no-claim"
  | "model"
  | "input"
  | "scope"
  | "budget"
  | "decision"
  | "hold"
  | "approval"
  | "asks";

export interface StartAction {
  kind: "start";
  key: string;
  node: string;
  step: Step;
  role: string;
  model: string;
  repository: string;
  title: string;
  brief: string;
  pr: string | null;
}
export interface MessageAction {
  kind: "message";
  key: string;
  session: string;
  node: string;
  text: string;
  mark: string;
}
export interface CheckAction {
  kind: "check";
  key: string;
  task: string;
  node: string;
  session: string;
  mark: string;
}
export interface ReportAction {
  kind: "report";
  key: string;
  node: string | null;
  condition: Condition;
  reason: Reason;
  text: string;
}
export type Action = StartAction | MessageAction | CheckAction | ReportAction;

const CONDITIONS: Record<Condition, string> = {
  1: "a failed check",
  2: "a scope change",
  3: "a decision that is the owner's",
  4: "a close that carries asks",
};

// ---------------------------------------------------------------------
// Parsing the inputs: text in, a Read out
// ---------------------------------------------------------------------

function fail<T>(why: string): Read<T> {
  return { ok: false, why };
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function parseJson(text: string | null, what: string): Read<unknown> {
  if (text === null) return fail(`${what} could not be read`);
  try {
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch (e) {
    return fail(`${what} is not JSON: ${(e as Error).message}`);
  }
}

export function parseState(text: string | null): Read<State> {
  const json = parseJson(text, "the state file");
  if (!json.ok) return json;
  const parsed = stateSchema.safeParse(json.value);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return fail(
      `the state file fails its schema: ${first ? `${first.path.join(".")}: ${first.message}` : "unknown"}`,
    );
  }
  return { ok: true, value: parsed.data };
}

export function parseJournal(text: string | null): Read<JournalLine[]> {
  if (text === null) return fail("the journal could not be read");
  const out: JournalLine[] = [];
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]!.trim();
    if (line === "") continue;
    let v: unknown;
    try {
      v = JSON.parse(line);
    } catch {
      return fail(`the journal's line ${i + 1} is not JSON`);
    }
    if (!isRecord(v)) return fail(`the journal's line ${i + 1} is no object`);
    out.push({
      task: typeof v.task === "string" ? v.task : null,
      session: typeof v.session === "string" ? v.session : null,
      note: typeof v.note === "string" ? v.note : "",
    });
  }
  return { ok: true, value: out };
}

const REPOSITORY = /^[\w.-]+\/[\w.-]+$/;
const NODE_ID = /^P\d+-N\d+$/;

function wholeAtLeast(v: unknown, min: number): v is number {
  return typeof v === "number" && Number.isInteger(v) && v >= min;
}

function unknownKeys(o: Record<string, unknown>, known: string[]): string[] {
  return Object.keys(o).filter((k) => !known.includes(k));
}

/** The settings file's schema (plan section 3, S4). Strict: a field
 * the schema does not know is an error, so a misspelt limit is not
 * silently its default. */
export function parseSettings(text: string | null): Read<Settings> {
  const json = parseJson(text, "the settings file");
  if (!json.ok) return json;
  const v = json.value;
  const bad = (why: string) => fail<Settings>(`the settings file: ${why}`);
  if (!isRecord(v)) return bad("is no object");
  const extra = unknownKeys(v, [
    "limits",
    "maxReworkRounds",
    "checkAfterMinutes",
    "weeklyBudget",
    "repositories",
  ]);
  if (extra.length > 0) return bad(`unknown field ${extra.join(", ")}`);
  const limits = v.limits;
  if (!isRecord(limits)) return bad("`limits` is no object");
  if (unknownKeys(limits, ["execute", "plan"]).length > 0)
    return bad("`limits` has a field other than `execute` and `plan`");
  if (!wholeAtLeast(limits.execute, 0))
    return bad("`limits.execute` is not a whole number, 0 or more");
  if (!wholeAtLeast(limits.plan, 0))
    return bad("`limits.plan` is not a whole number, 0 or more");
  if (!wholeAtLeast(v.maxReworkRounds, 1))
    return bad("`maxReworkRounds` is not a whole number, 1 or more");
  if (!wholeAtLeast(v.checkAfterMinutes, 1))
    return bad("`checkAfterMinutes` is not a whole number, 1 or more");
  const budget = v.weeklyBudget;
  if (budget !== null && !(typeof budget === "number" && budget >= 0))
    return bad("`weeklyBudget` is neither null nor a number, 0 or more");
  if (!Array.isArray(v.repositories)) return bad("`repositories` is no list");
  const repositories: Settings["repositories"] = [];
  const seenRepos = new Set<string>();
  const seenNodes = new Set<string>();
  for (const r of v.repositories as unknown[]) {
    if (!isRecord(r)) return bad("an entry of `repositories` is no object");
    if (unknownKeys(r, ["repository", "nodes"]).length > 0)
      return bad(
        "an entry of `repositories` has a field other than `repository` and `nodes`",
      );
    if (typeof r.repository !== "string" || !REPOSITORY.test(r.repository))
      return bad("a `repository` is not of the form owner/name");
    if (seenRepos.has(r.repository))
      return bad(`${r.repository} is listed twice`);
    seenRepos.add(r.repository);
    if (!Array.isArray(r.nodes))
      return bad(`\`nodes\` of ${r.repository} is no list`);
    const nodes: string[] = [];
    for (const n of r.nodes as unknown[]) {
      if (typeof n !== "string" || !NODE_ID.test(n))
        return bad(`a node of ${r.repository} is no node identifier`);
      if (seenNodes.has(n)) return bad(`${n} is listed twice`);
      seenNodes.add(n);
      nodes.push(n);
    }
    repositories.push({ repository: r.repository, nodes });
  }
  return {
    ok: true,
    value: {
      limits: { execute: limits.execute, plan: limits.plan },
      maxReworkRounds: v.maxReworkRounds,
      checkAfterMinutes: v.checkAfterMinutes,
      weeklyBudget: budget,
      repositories,
    },
  };
}

/** The roles the task loop has, each with an agent file. */
export const ROLES: readonly string[] = [...new Set(Object.values(STEP_ROLES))];

/** The `model` line of an agent file's frontmatter, or null. */
export function modelOfAgent(text: string): string | null {
  if (!text.startsWith("---\n")) return null;
  const end = text.indexOf("\n---", 4);
  if (end === -1) return null;
  const m = /^model:[ \t]*(\S+)[ \t]*$/m.exec(text.slice(4, end));
  return m ? m[1]! : null;
}

/** The model of each role, from the agent files' text by role; null
 * for a file that could not be read. */
export function parseModels(
  files: Record<string, string | null>,
): Read<Record<string, string>> {
  const out: Record<string, string> = {};
  for (const role of ROLES) {
    const text = files[role] ?? null;
    if (text === null)
      return fail(`the agent file of the ${role} could not be read`);
    const model = modelOfAgent(text);
    if (model === null)
      return fail(`the agent file of the ${role} has no \`model\` line`);
    out[role] = model;
  }
  return { ok: true, value: out };
}

export function parseSessions(text: string | null): Read<SessionEntry[]> {
  if (text === null)
    return fail("no session snapshot was given, or it could not be read");
  const json = parseJson(text, "the session snapshot");
  if (!json.ok) return json;
  if (!Array.isArray(json.value))
    return fail("the session snapshot is no list");
  const out: SessionEntry[] = [];
  for (const e of json.value as unknown[]) {
    if (!isRecord(e)) return fail("a session of the snapshot is no object");
    for (const k of ["id", "title", "created", "status", "model"] as const) {
      if (typeof e[k] !== "string" || e[k] === "")
        return fail(`a session of the snapshot has no \`${k}\``);
    }
    if (Number.isNaN(Date.parse(e.created as string)))
      return fail(`session ${e.id as string} has an unreadable \`created\``);
    out.push({
      id: e.id as string,
      title: e.title as string,
      created: e.created as string,
      status: normalStatus(e.status as string),
      model: e.model as string,
    });
  }
  return { ok: true, value: out };
}

export function parseNow(text: string | null, clock: Date): Read<Date> {
  if (text === null) return { ok: true, value: clock };
  const t = Date.parse(text);
  if (Number.isNaN(t)) return fail(`\`--now\` is no time: ${text}`);
  return { ok: true, value: new Date(t) };
}

/** `SESSION_STATUS_BUCKET_WORKING` and `working` are the same. */
function normalStatus(status: string): string {
  return status.toLowerCase().replace(/^session_status_(bucket_)?/, "");
}

// ---------------------------------------------------------------------
// Titles and marks (S2)
// ---------------------------------------------------------------------

export type MarkKind = "checked" | "nudged" | "continued";
export interface Mark {
  kind: MarkKind;
  task: string;
  at: number;
}
export interface Titled {
  node: string;
  step: Step;
  marks: Mark[];
}

const TITLE =
  /^(P\d+-N\d+) (plan|specify|break down|execute|verify)((?:; (?:checked|nudged|continued) T\d{3,} [^\s;]+)*)$/;
const MARK = /; (checked|nudged|continued) (T\d{3,}) ([^\s;]+)/g;
const MARK_TIME = /^\d{4}-\d\d-\d\dT\d\d:\d\d(:\d\d)?Z$/;

/** A session's title read by the grammar of S2, or null for a title
 * that does not follow it: such a session is not the orchestrator's. */
export function parseTitle(title: string): Titled | null {
  const m = TITLE.exec(title);
  if (!m) return null;
  const marks: Mark[] = [];
  for (const k of m[3]!.matchAll(MARK)) {
    if (!MARK_TIME.test(k[3]!)) return null;
    const at = Date.parse(k[3]!);
    if (Number.isNaN(at)) return null;
    marks.push({ kind: k[1] as MarkKind, task: k[2]!, at });
  }
  return { node: m[1]!, step: m[2] as Step, marks };
}

/** The time a mark carries: to the minute, in UTC. */
export function markTime(now: Date): string {
  return `${now.toISOString().slice(0, 16)}Z`;
}

/** A model identifier without a bracketed suffix: `x[1m]` is `x`. */
export function bareModel(model: string): string {
  return model.replace(/\[[^\]]*\]$/, "");
}

// ---------------------------------------------------------------------
// The brief and the other texts (plan section 6, criterion 8)
// ---------------------------------------------------------------------

export interface BriefInput {
  self: string | null;
  node: string;
  nodeTitle: string;
  step: Step;
  role: string;
  /** Continued work: the task it follows, and its pull request. */
  continues: { task: string; pr: string | null; rework: boolean } | null;
}

function from(self: string | null): string {
  return self === null ? "the orchestrator session" : `session ${self}`;
}

/** The delegation brief, in the form CLAUDE.md defines (Delegated
 * tasks): the session that delegates, the node, the step and the
 * role, then the two standing lines. */
export function brief(b: BriefInput): string {
  const lines = [
    `Delegation brief from ${from(b.self)}.`,
    "",
    `Node: ${b.node} (${b.nodeTitle}). Step: ${b.step}. Role: ${b.role} (.claude/agents/${b.role}.md).`,
    "",
    "Claim this task with task_open before any work. The brief authorises this node and this step, and nothing else.",
  ];
  if (b.continues !== null) {
    lines.push(
      b.continues.rework
        ? `This is a rework: the verification failed after task ${b.continues.task}. task_open answers what failed.`
        : `This step is offered again after task ${b.continues.task}, which did not finish it.`,
    );
    lines.push(
      b.continues.pr === null
        ? `Task ${b.continues.task} recorded no pull request: find the node's open pull request, and continue on its head branch if there is one.`
        : `Continue on pull request ${b.continues.pr}: check out its head branch and commit there. Open no second pull request.`,
    );
    lines.push(
      "Work on a branch of your own: for this task that is the pull request's head branch.",
    );
  } else {
    lines.push("Work on a branch of your own, made for this task.");
  }
  lines.push("Attach no second repository to your session.");
  return lines.join("\n");
}

function nudgeText(self: string | null, task: Task): string {
  return [
    `From ${from(self)}: task ${task.id} on ${task.node}, ${task.step}, has been open since ${task.opened ?? "an unknown time"} and this session is not working.`,
    "If its work is finished, close it with task_close. If it cannot finish, close it needs-judgment or blocked and say why.",
  ].join("\n");
}

// ---------------------------------------------------------------------
// The decision
// ---------------------------------------------------------------------

function report(
  node: Node | null,
  condition: Condition,
  reason: Reason,
  what: string,
  decisions: string[] = [],
): ReportAction {
  const subject =
    node === null ? "The project" : `${node.id} "${node.title.trim()}"`;
  // A report of open decisions names them in its key (S1), so a
  // further decision on the node is a new action (D088).
  const named = decisions.length === 0 ? "" : `:${decisions.join(",")}`;
  return {
    kind: "report",
    key: `report:${node?.id ?? "project"}:${condition}:${reason}${named}`,
    node: node?.id ?? null,
    condition,
    reason,
    text: `${subject}: condition ${condition}, ${CONDITIONS[condition]}. ${what}`,
  };
}

const PLANNING: ReadonlySet<Step> = new Set(["plan", "specify", "break down"]);
const SCOPE_HOLD = /^(T\d+: )?Scope changed during/;
const TOKEN_TYPES = ["in", "out", "cacheRead", "cacheWrite"] as const;

/** The reports the state file alone gives (S5, conditions 2 to 4). */
function stateReports(state: State): ReportAction[] {
  const out: ReportAction[] = [];
  const byId = nodesById(state);
  for (const node of state.nodes) {
    // A node below a held or parked node gets no report of its own.
    if (pausedBy(node, byId) !== undefined) continue;
    const live = node.stage !== "done" && node.stage !== "parked";
    if (live && node.hold !== null) {
      if (node.hold.kind === "gated" && SCOPE_HOLD.test(node.hold.reason)) {
        out.push(
          report(
            node,
            2,
            "scope",
            `Its scope changed while a task was open (${node.hold.reason.trim()}). Confirm the result and lift the hold in the view.`,
          ),
        );
      } else if (!(node.kind === "check" && node.hold.kind === "blocked")) {
        out.push(
          report(
            node,
            3,
            "hold",
            `It is held ${node.hold.kind} (${node.hold.reason.trim()}). Lift the hold in the view when it no longer applies.`,
          ),
        );
      }
    }
    const open = state.decisions.filter(
      (d) => d.node === node.id && d.chosen === null,
    );
    const asked = open.filter((d) => d.rationale?.startsWith("Asked by"));
    const owners = open.filter((d) => !d.rationale?.startsWith("Asked by"));
    if (owners.length > 0) {
      out.push(
        report(
          node,
          3,
          "decision",
          `${owners.map((d) => d.id).join(", ")} is open on it. Answer in the view.`,
          owners.map((d) => d.id),
        ),
      );
    }
    if (asked.length > 0) {
      out.push(
        report(
          node,
          4,
          "asks",
          `${asked.map((d) => d.id).join(", ")} was asked at a task's close. Answer in the view.`,
          asked.map((d) => d.id),
        ),
      );
    }
    if (live) {
      const offer = offerOn(node, state, byId);
      if (!offer.offered && offer.why.reason === "approval") {
        out.push(
          report(
            node,
            3,
            "approval",
            "Its start waits for your approval. Approve it in the view.",
          ),
        );
      }
    }
  }
  return out;
}

/** What the script prints (S1): `{ "actions": [...] }`. */
export function decide(inputs: Inputs): { actions: Action[] } {
  const reports: ReportAction[] = [];
  const checks: CheckAction[] = [];
  const messages: MessageAction[] = [];
  const starts: StartAction[] = [];

  // Unreadable inputs: one report, and nothing is started (S5).
  const unreadable: string[] = [];
  for (const k of [
    "state",
    "journal",
    "settings",
    "models",
    "sessions",
    "now",
  ] as const) {
    const r = inputs[k];
    if (!r.ok) unreadable.push(r.why);
  }
  if (inputs.state.ok && inputs.settings.ok) {
    const project = inputs.state.value.project;
    if (
      !inputs.settings.value.repositories.some((r) => r.repository === project)
    )
      unreadable.push(
        `the settings file does not list ${project}, the state file's project, under \`repositories\``,
      );
  }
  if (unreadable.length > 0) {
    reports.push(
      report(
        null,
        1,
        "input",
        `The decision script cannot read its inputs, so it starts nothing: ${unreadable.join("; ")}.`,
      ),
    );
    if (inputs.state.ok) reports.push(...stateReports(inputs.state.value));
    return { actions: reports };
  }
  // All six are readable from here on.
  if (
    !inputs.state.ok ||
    !inputs.journal.ok ||
    !inputs.settings.ok ||
    !inputs.models.ok ||
    !inputs.sessions.ok ||
    !inputs.now.ok
  ) {
    return { actions: reports };
  }
  const state = inputs.state.value;
  const journal = inputs.journal.value;
  const settings = inputs.settings.value;
  const models = inputs.models.value;
  const now = inputs.now.value;
  const self = inputs.self;
  const stamp = markTime(now);
  const limitMs = settings.checkAfterMinutes * 60_000;

  const byId = nodesById(state);
  const children = childrenOf(state);
  const tasksOf = (node: string) => state.tasks.filter((t) => t.node === node);
  const openTaskOn = (node: string) =>
    state.tasks.some((t) => t.node === node && t.status === "open");

  // The snapshot's sessions that follow the title grammar and are not
  // archived: an archived session can neither claim nor be messaged.
  const entries = inputs.sessions.value
    .map((e) => ({ entry: e, titled: parseTitle(e.title) }))
    .filter(
      (x): x is { entry: SessionEntry; titled: Titled } =>
        x.titled !== null && x.entry.status !== "archived",
    );
  const newestTitled = (node: string, step: Step) =>
    entries
      .filter((x) => x.titled.node === node && x.titled.step === step)
      .sort(
        (a, b) => Date.parse(b.entry.created) - Date.parse(a.entry.created),
      )[0];
  /** The session of a task (S2): the one that opened it by the
   * journal, failing that the newest titled with its node and step. */
  const sessionOf = (task: Task) => {
    const opened = journal.find(
      (l) => l.task === task.id && l.note.startsWith(`task_open ${task.id} `),
    );
    const named =
      opened?.session == null
        ? undefined
        : entries.find((x) => x.entry.id === opened.session);
    return named ?? newestTitled(task.node, task.step);
  };
  const wrongModel = (x: { entry: SessionEntry; titled: Titled }) => {
    const want = models[STEP_ROLES[x.titled.step]];
    return want !== undefined && bareModel(x.entry.model) !== bareModel(want)
      ? want
      : null;
  };

  reports.push(...stateReports(state));

  // Budget (S5): the tokens of all four types on tasks closed in the
  // last seven days.
  let stopAll = false;
  if (settings.weeklyBudget !== null) {
    const since = now.getTime() - 7 * 24 * 3600 * 1000;
    let spent = 0;
    for (const t of state.tasks) {
      if (t.closed === null || Date.parse(t.closed) < since) continue;
      for (const k of TOKEN_TYPES) spent += t.tokens[k] ?? 0;
    }
    if (spent > settings.weeklyBudget) {
      stopAll = true;
      reports.push(
        report(
          null,
          2,
          "budget",
          `Tasks closed in the last seven days cost ${spent} tokens, over the weekly budget of ${settings.weeklyBudget}. Nothing is started until the budget is raised in orchestration/orchestrator.json or the week passes.`,
        ),
      );
    }
  }

  // Open tasks: checks, nudges and the reports of S3.
  for (const task of state.tasks) {
    if (task.status !== "open") continue;
    const node = byId.get(task.node);
    if (!node) continue;
    const s = sessionOf(task);
    if (s !== undefined) {
      const want = wrongModel(s);
      if (want !== null) {
        reports.push(
          report(
            node,
            1,
            "model",
            `Session ${s.entry.id} holds task ${task.id} on ${s.entry.model}, not on ${want}, the model of its role.`,
          ),
        );
      }
    }
    if (task.opened === null) continue;
    if (now.getTime() - Date.parse(task.opened) <= limitMs) continue;
    if (s === undefined) {
      reports.push(
        report(
          node,
          1,
          "no-session",
          `Task ${task.id} has been open since ${task.opened} and no session in the snapshot holds it.`,
        ),
      );
      continue;
    }
    const marks = s.titled.marks.filter((m) => m.task === task.id);
    const has = (kind: MarkKind) => marks.some((m) => m.kind === kind);
    if (!has("checked")) {
      checks.push({
        kind: "check",
        key: `check:${task.id}`,
        task: task.id,
        node: node.id,
        session: s.entry.id,
        mark: `checked ${task.id} ${stamp}`,
      });
    } else if (s.entry.status !== "working" && !has("nudged")) {
      if (!stopAll) {
        messages.push({
          kind: "message",
          key: `message:${s.entry.id}:nudged:${task.id}`,
          session: s.entry.id,
          node: node.id,
          text: nudgeText(self, task),
          mark: `nudged ${task.id} ${stamp}`,
        });
      }
    } else if (now.getTime() - Math.max(...marks.map((m) => m.at)) > limitMs) {
      reports.push(
        report(
          node,
          1,
          "no-close",
          `Task ${task.id} is still open in session ${s.entry.id}, ${settings.checkAfterMinutes} minutes after the last check of it.`,
        ),
      );
    }
  }

  // Pending starts (S2): a session given work, its task not yet open.
  const pending = new Map<string, Step>();
  for (const x of entries) {
    const node = byId.get(x.titled.node);
    if (!node || node.stage === "done" || node.stage === "parked") continue;
    if (openTaskOn(node.id)) continue;
    const mine = tasksOf(node.id);
    const continued = x.titled.marks.filter((m) => m.kind === "continued");
    const last = continued[continued.length - 1];
    let since: number;
    if (last === undefined) {
      since = Date.parse(x.entry.created);
      if (mine.some((t) => t.opened !== null && Date.parse(t.opened) > since))
        continue;
    } else {
      // Sent the work that follows `last.task`: pending until a later
      // task is on the node. A mark's time is cut to the minute, so
      // the task's place in the file decides, not the time.
      since = last.at;
      const at = state.tasks.findIndex((t) => t.id === last.task);
      if (at === -1) continue;
      if (state.tasks.slice(at + 1).some((t) => t.node === node.id)) continue;
    }
    pending.set(node.id, x.titled.step);
    if (now.getTime() - since > limitMs) {
      reports.push(
        report(
          node,
          1,
          "no-claim",
          `Session ${x.entry.id} was given ${x.titled.step} on it more than ${settings.checkAfterMinutes} minutes ago and has opened no task. Archive the session to have another started.`,
        ),
      );
    }
    const want = wrongModel(x);
    if (want !== null) {
      reports.push(
        report(
          node,
          1,
          "model",
          `Session ${x.entry.id}, given ${x.titled.step} on it, runs on ${x.entry.model}, not on ${want}, the model of its role.`,
        ),
      );
    }
  }

  // What is under way, for the limits and the shared document (S4).
  let executing = 0;
  let planning = 0;
  const busyDocs = new Map<string, string>();
  const occupy = (node: Node, step: Step) => {
    if (step === "verify") return;
    if (step === "execute") executing++;
    else planning++;
    if (node.docs.plan !== null) busyDocs.set(node.docs.plan, node.id);
  };
  for (const t of state.tasks) {
    const node = byId.get(t.node);
    if (t.status === "open" && node) occupy(node, t.step);
  }
  for (const [id, step] of pending) occupy(byId.get(id)!, step);

  const repositoryOf = (node: Node): string | null => {
    const listed = (id: string) =>
      settings.repositories.find((r) => r.nodes.includes(id))?.repository;
    const named =
      listed(node.id) ??
      (node.kind === "check" && node.parent !== null
        ? listed(node.parent)
        : undefined);
    const repository = named ?? state.project;
    return settings.repositories.some((r) => r.repository === repository)
      ? repository
      : null;
  };

  // The walk (S4): the service's candidates, in the service's order.
  for (const c of candidates(state)) {
    const node = c.node;
    const step: Step =
      node.kind === "work" &&
      node.stage === "specified" &&
      (node.note ?? "").includes("Next step: break down")
        ? "break down"
        : c.step;
    const role = STEP_ROLES[step];

    // Rework, and the limit on its rounds (S5).
    const rework =
      node.stage === "verifying" &&
      step === "execute" &&
      failedCheckNode(node, children) !== undefined;
    if (rework) {
      const checkIds = new Set(
        (children.get(node.id) ?? [])
          .filter((n) => n.kind === "check")
          .map((n) => n.id),
      );
      const failed = state.tasks.filter(
        (t) =>
          checkIds.has(t.node) && t.step === "verify" && t.status === "blocked",
      );
      if (failed.length >= settings.maxReworkRounds) {
        reports.push(
          report(
            node,
            1,
            "rework-limit",
            `Its verification failed ${failed.length} times (${failed.map((t) => t.id).join(", ")}), the limit of rework rounds. Decide in the view how it goes on.`,
          ),
        );
        continue;
      }
    }

    if (stopAll) continue;
    if (pending.has(node.id)) continue;
    if (step === "execute" && executing >= settings.limits.execute) continue;
    if (PLANNING.has(step) && planning >= settings.limits.plan) continue;
    // A verify start is exempt: a reviewer edits nothing (S4, D087).
    if (
      step !== "verify" &&
      node.docs.plan !== null &&
      busyDocs.has(node.docs.plan)
    )
      continue;

    // Continued work (S3): a rework, or a step offered again after its
    // last task closed needs-judgment or blocked. Never a `verify`.
    const sameStep = tasksOf(node.id).filter((t) => t.step === step);
    const lastOfStep = sameStep[sameStep.length - 1];
    const continues =
      step !== "verify" &&
      lastOfStep !== undefined &&
      (rework ||
        lastOfStep.status === "needs-judgment" ||
        lastOfStep.status === "blocked")
        ? lastOfStep
        : undefined;
    const pr =
      continues === undefined
        ? null
        : (continues.pr ??
          tasksOf(node.id)
            .map((t) => t.pr)
            .filter((p): p is string => p !== null)
            .pop() ??
          null);
    const briefInput: BriefInput = {
      self,
      node: node.id,
      nodeTitle: node.title.trim(),
      step,
      role,
      continues:
        continues === undefined ? null : { task: continues.id, pr, rework },
    };

    const holder = continues === undefined ? undefined : sessionOf(continues);
    if (continues !== undefined && holder !== undefined) {
      messages.push({
        kind: "message",
        key: `message:${holder.entry.id}:continued:${continues.id}`,
        session: holder.entry.id,
        node: node.id,
        text: brief(briefInput),
        mark: `continued ${continues.id} ${stamp}`,
      });
      occupy(node, step);
      continue;
    }

    const repository = repositoryOf(node);
    const model = models[role];
    if (repository === null || model === undefined) continue;
    const family = new Set([
      node.id,
      ...(children.get(node.id) ?? [])
        .filter((n) => n.kind === "check")
        .map((n) => n.id),
    ]);
    const closed = state.tasks.filter(
      (t) => family.has(t.node) && t.status !== "open",
    );
    const after = closed[closed.length - 1]?.id ?? "new";
    starts.push({
      kind: "start",
      key: `start:${node.id}:${step}:${after}`,
      node: node.id,
      step,
      role,
      model,
      repository,
      title: `${node.id} ${step}`,
      brief: brief(briefInput),
      pr,
    });
    occupy(node, step);
  }

  return { actions: [...reports, ...checks, ...messages, ...starts] };
}
