/**
 * The orchestration form checker's core logic (P1-N009 child C, node
 * P1-N012) — a line-for-line TypeScript port of
 * plugin/scripts/form_check.py's checks onto the shared Plan-register
 * grammar unit (./plan-register.ts). Behaviour is the contract (P1-N009
 * decision 6): this file reproduces the Python's 25 `find(...)` call
 * sites' findings, not a redesign of them. Pure function, no process
 * exit, no stdout — `form_check.ts` (the entry point) prints and exits;
 * `check_equality.ts` and `form_check.ts`'s own corpus self-check both
 * call `runFormCheck` in-process.
 *
 * The spec is authoritative: where this checker and
 * docs/process/auditing.md disagree, the spec is right and this
 * checker has a bug (methodology Article 3) — carried over from
 * form_check.py's own docstring, unchanged.
 *
 * v1 approximations, documented per auditing.md, carried over unchanged
 * and unannotated (P1-N009 spec B5 — these are documented
 * spec-conformant simplifications, not deviations):
 * - The Backlog-reference check covers nodes in stages identified /
 *   planned / specified / executing / verifying. `broken-down` nodes
 *   are represented by their children and `done` nodes by their
 *   rewritten Backlog entries, and "executed immediately" is not
 *   mechanically decidable.
 * - The stage-change/journal cross-check is approximated by the
 *   accepted-event <-> cost-row correspondence plus the in-flight
 *   check on executing/verifying nodes.
 *
 * D1 note on this file's own stage-name literals: `INTERIOR_OK` and
 * `NEED_BACKLOG_REF` below are this checker's *policy* (which of the
 * seven stages permit children; which stages need a Backlog entry) —
 * not a second copy of the *vocabulary* (D1's target, `STAGES`, is
 * imported from the shared unit and never redeclared here). Policy
 * that decides what a parsed stage *means* is exactly what D5 keeps
 * out of the shared unit and leaves with the checker; form_check.py
 * itself kept `INTERIOR_OK`/`NEED_BACKLOG_REF` beside its own `STAGES`
 * set the same way. `TASK_RE` and `EVENTS` are a different vocabulary
 * again (Cost-log task IDs, docs/process/cost-log.md; run-journal event
 * kinds, docs/process/observability.md) — outside the Plan-register
 * grammar D1 governs entirely.
 */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import {
  parseRegister,
  STAGES,
  type PlanNode,
  type RegisterParseResult,
} from "./plan-register.ts";

// ---- Policy sets (not vocabulary — see the module doc comment) ------

const INTERIOR_OK = new Set(["broken-down", "verifying", "done"]);
const NEED_BACKLOG_REF = new Set([
  "identified",
  "planned",
  "specified",
  "executing",
  "verifying",
]);
const EVENTS = new Set([
  "dispatched",
  "result-received",
  "accepted",
  "check-failed",
  "needs-judgment",
  "blocked",
  "stale",
  "backward-transition",
  "packet-widened",
  "precedent-applied",
  "gate-opened",
  "gate-crossed",
]);
const TASK_TERMINAL = new Set(["accepted", "blocked", "stale"]);
const TASK_RE = /^T\d{3,}$/;

// ---- Python-compatible formatting helpers ----------------------------
//
// form_check.py's messages use Python's `!r` (repr) formatting in
// several places; matching it byte-for-byte keeps message prose
// identical rather than merely equivalent, which is what spec B2 asks
// for wherever it costs nothing to provide.

function pyRepr(s: string): string {
  const hasSingle = s.includes("'");
  const hasDouble = s.includes('"');
  const quote = hasSingle && !hasDouble ? '"' : "'";
  let out = "";
  for (const ch of s) {
    if (ch === "\\") out += "\\\\";
    else if (ch === quote) out += "\\" + quote;
    else if (ch === "\n") out += "\\n";
    else if (ch === "\r") out += "\\r";
    else if (ch === "\t") out += "\\t";
    else out += ch;
  }
  return quote + out + quote;
}

/** Python's `repr()` on a value that may be `None` — used where the
 * Python source applies `!r` to a `dict.get(...)` result that can be
 * absent. */
function pyReprMaybe(v: unknown): string {
  if (v === null || v === undefined) return "None";
  return pyRepr(String(v));
}

/** Python's `str()` on a value that may be `None` (printed as `None`,
 * not JavaScript's `"null"`) — used where the Python source
 * interpolates a `dict.get(...)` result without `!r`. */
function pyStr(v: unknown): string {
  if (v === null || v === undefined) return "None";
  return String(v);
}

// ---- Findings ----------------------------------------------------------

export type Severity = "violation" | "warning";

export interface Finding {
  severity: Severity;
  rule: string;
  path: string;
  msg: string;
}

export interface FormCheckResult {
  /** Absent (project not enrolled) or present with the parsed node
   * count, mirroring form_check.py's `len(nodes)` in the summary line. */
  nodeCount: number | null;
  findings: Finding[];
  /** Every line form_check.py would print to stdout, in order —
   * finding lines, then the summary line (or the not-enrolled line
   * alone). */
  stdoutLines: string[];
  exitCode: number;
}

type FindFn = (
  severity: Severity,
  rule: string,
  filePath: string,
  msg: string,
) => void;

// ---- Register checks ---------------------------------------------------

function emitParseErrors(
  parsed: RegisterParseResult,
  registerPath: string,
  find: FindFn,
): void {
  // form_check.py's parse_register() calls find() inline, in the same
  // single forward pass that discovers each problem — so the order of
  // parsed.errors here (also appended in a single forward pass, by the
  // shared unit) already matches the Python's finding emission order.
  const DUPLICATE_RE = /^duplicate node ID (\S+);/;
  for (const err of parsed.errors) {
    const dup = DUPLICATE_RE.exec(err.reason);
    if (dup) {
      find(
        "violation",
        "register-id",
        registerPath,
        `line ${err.line}: duplicate node ID ${dup[1]}`,
      );
    } else {
      find(
        "violation",
        "register-parse",
        registerPath,
        `line ${err.line}: node-like line does not parse: ${pyRepr(err.raw.trim())}`,
      );
    }
  }
}

function checkRegister(
  parsed: RegisterParseResult,
  registerPath: string,
  find: FindFn,
): void {
  for (const nid of parsed.order) {
    const n = parsed.nodes.get(nid)!;
    if (!(STAGES as readonly string[]).includes(n.stage)) {
      find(
        "violation",
        "register-stage",
        registerPath,
        `${nid}: unknown stage [${n.stage}]`,
      );
      continue;
    }
    if (n.childIds.length > 0) {
      if (!INTERIOR_OK.has(n.stage)) {
        find(
          "violation",
          "register-structure",
          registerPath,
          `${nid}: has children but stage is [${n.stage}] (interior nodes are broken-down/verifying/done)`,
        );
      }
    } else if (n.stage === "broken-down") {
      find(
        "violation",
        "register-structure",
        registerPath,
        `${nid}: [broken-down] but has no children`,
      );
    }
  }
}

/**
 * Register <-> Backlog cross-check (docs/process/auditing.md,
 * "Register <-> Backlog": "every node past `identified` and not
 * executed immediately has a Backlog entry referencing it; where a
 * Workflow is declared, Backlog stage designations match register
 * stages.").
 *
 * PRESERVED DEVIATION (P1-N009 decision 6, spec B5): this function
 * implements only the first clause — a Backlog entry exists somewhere
 * that mentions the node ID. It does not implement the second clause
 * at all, in any form, gated or unconditional: checking that a
 * Backlog entry's own stage designation agrees with the register's
 * stage for that node, "where a Workflow is declared". form_check.py
 * (the predecessor this file ports) never implemented that clause
 * either — there is no code path for it to preserve behaviourally,
 * only its absence to preserve. This project's own Classification
 * declares "Workflow: none declared", so the gap has never been
 * exercised here and preserving it changes nothing observable today.
 * Preserved rather than implemented now, per decision 6 — a rewrite
 * that also adds behaviour cannot be verified by comparison against
 * the Python oracle, and fixing it is a separate, deliberate change.
 * Recorded as a Backlog finding (docs/backlog.md, the P1-N012 entry).
 */
function checkBacklogRefs(
  parsed: RegisterParseResult,
  registerPath: string,
  backlogPath: string,
  find: FindFn,
): void {
  if (!existsSync(backlogPath)) {
    find(
      "violation",
      "backlog-ref",
      backlogPath,
      "Plan register exists but docs/backlog.md does not",
    );
    return;
  }
  const text = readFileSync(backlogPath, "utf-8");
  for (const nid of parsed.order) {
    const n = parsed.nodes.get(nid)!;
    if (NEED_BACKLOG_REF.has(n.stage) && !text.includes(nid)) {
      find(
        "violation",
        "backlog-ref",
        registerPath,
        `${nid} [${n.stage}] has no Backlog entry referencing it`,
      );
    }
  }
}

// ---- Cost log ------------------------------------------------------------

function parseCostLog(costLogPath: string, find: FindFn): string[] {
  const tasks: string[] = [];
  if (!existsSync(costLogPath)) return tasks;
  const rows = readFileSync(costLogPath, "utf-8")
    .split(/\r\n|\n/)
    .filter((l) => l.startsWith("|"));
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]!;
    const cells = row
      .trim()
      .replace(/^\|+/, "")
      .replace(/\|+$/, "")
      .split("|")
      .map((c) => c.trim());
    if (i === 0) continue; // header row
    const joined = cells.join("");
    if ([...joined].every((ch) => ch === "-" || ch === " " || ch === ":")) {
      continue; // separator row (also matches an all-empty row)
    }
    if (cells.length !== 9) {
      find(
        "violation",
        "costlog-form",
        costLogPath,
        `row ${i + 1}: ${cells.length} cells, expected 9`,
      );
      continue;
    }
    const task = cells[1]!;
    if (!TASK_RE.test(task)) {
      find(
        "violation",
        "costlog-form",
        costLogPath,
        `row ${i + 1}: malformed task ID ${pyRepr(task)}`,
      );
      continue;
    }
    tasks.push(task);
  }
  const counts = new Map<string, number>();
  for (const t of tasks) counts.set(t, (counts.get(t) ?? 0) + 1);
  const dupes = [...counts.entries()].filter(([, c]) => c > 1).map(([t]) => t);
  for (const t of dupes.sort()) {
    find("violation", "costlog-form", costLogPath, `duplicate task ID ${t}`);
  }
  const uniqueTasks = [...new Set(tasks)];
  const nums = uniqueTasks.map((t) => Number(t.slice(1))).sort((a, b) => a - b);
  if (nums.length > 0) {
    const first = nums[0]!;
    const expected = nums.map((_, i) => first + i);
    const sequential = nums.every((n, i) => n === expected[i]);
    if (!sequential) {
      const sortedTasks = [...uniqueTasks].sort();
      find(
        "warning",
        "costlog-form",
        costLogPath,
        `task IDs not sequential: [${sortedTasks.map((t) => pyRepr(t)).join(", ")}]`,
      );
    }
  }
  return tasks;
}

// ---- Journal ---------------------------------------------------------------

export interface JournalEvent {
  [key: string]: unknown;
}

function parseJournal(journalPath: string, find: FindFn): JournalEvent[] {
  const events: JournalEvent[] = [];
  if (!existsSync(journalPath)) return events;
  const lines = readFileSync(journalPath, "utf-8").split(/\r\n|\n/);
  for (let i = 0; i < lines.length; i++) {
    const lineno = i + 1;
    const line = lines[i]!;
    if (line.trim() === "") continue;
    let e: JournalEvent;
    try {
      e = JSON.parse(line) as JournalEvent;
    } catch (exc) {
      const msg = exc instanceof Error ? exc.message : String(exc);
      find(
        "violation",
        "journal-form",
        journalPath,
        `line ${lineno}: invalid JSON (${msg})`,
      );
      continue;
    }
    if (!("ts" in e) || !("event" in e)) {
      find(
        "violation",
        "journal-form",
        journalPath,
        `line ${lineno}: missing required field ts/event`,
      );
      continue;
    }
    if (!EVENTS.has(String(e["event"]))) {
      find(
        "violation",
        "journal-form",
        journalPath,
        `line ${lineno}: unknown event kind ${pyRepr(String(e["event"]))}`,
      );
      continue;
    }
    events.push(e);
  }
  return events;
}

// ---- Cross-checks ------------------------------------------------------

function crossChecks(
  parsed: RegisterParseResult,
  costTasks: string[],
  events: JournalEvent[],
  root: string,
  find: FindFn,
): void {
  const journalPath = path.join(root, "orchestration", "journal.jsonl");
  const costPath = path.join(root, "docs", "cost-log.md");
  const registerPath = path.join(root, "docs", "plan-register.md");

  const accepted = new Set<string>();
  for (const e of events) {
    if (e["event"] === "accepted" && e["task"]) {
      accepted.add(String(e["task"]));
    }
  }
  const costTaskSet = new Set(costTasks);

  for (const t of [...accepted].filter((t) => !costTaskSet.has(t)).sort()) {
    find(
      "violation",
      "journal-crosscheck",
      costPath,
      `journal has accepted event for ${t} but the Cost log has no row`,
    );
  }
  for (const t of [...costTaskSet].filter((t) => !accepted.has(t)).sort()) {
    find(
      "violation",
      "journal-crosscheck",
      journalPath,
      `Cost log row ${t} has no accepted journal event`,
    );
  }

  // Liveness: an executing/verifying node must be in-flight (an open
  // dispatched task) or hold-marked gated/blocked — the four arms of
  // auditing.md, with "actionable" not needing a positive check for
  // these two stages. A hold marker on a done node is stale by
  // definition.
  const byTask = new Map<string, string[]>();
  for (const e of events) {
    const task = e["task"];
    if (task) {
      const key = String(task);
      const arr = byTask.get(key) ?? [];
      arr.push(String(e["event"]));
      byTask.set(key, arr);
    }
  }

  for (const nid of parsed.order) {
    const n: PlanNode = parsed.nodes.get(nid)!;
    if (n.stage === "done" && n.hold) {
      find(
        "violation",
        "liveness",
        registerPath,
        `${nid} is [done] but carries a [${n.hold.kind}: ...] hold marker`,
      );
    }
    if (n.stage !== "executing" && n.stage !== "verifying") continue;
    if (n.hold) continue; // gated/blocked: declared hold, liveness met

    let hasOpenTask = false;
    for (const [t, kinds] of byTask) {
      const dispatchedHere = events.some(
        (e) =>
          e["task"] === t && e["node"] === nid && e["event"] === "dispatched",
      );
      if (dispatchedHere && !kinds.some((k) => TASK_TERMINAL.has(k))) {
        hasOpenTask = true;
        break;
      }
    }
    if (!hasOpenTask) {
      find(
        "violation",
        "liveness",
        journalPath,
        `${nid} is [${n.stage}] with no hold marker and no open dispatched task in the journal`,
      );
    }
  }
}

/**
 * Every precedent-applied event names an active ruling, and that
 * ruling's Applied list records the task (docs/process/rulings.md's
 * lifecycle).
 */
function checkRulings(
  events: JournalEvent[],
  root: string,
  find: FindFn,
): void {
  const rulingsPath = path.join(root, "docs", "rulings.md");
  const applied = events.filter((e) => e["event"] === "precedent-applied");
  if (applied.length === 0) return;
  if (!existsSync(rulingsPath)) {
    find(
      "violation",
      "rulings",
      rulingsPath,
      "journal has precedent-applied events but there is no Ruling register",
    );
    return;
  }

  // Entries wrap across lines: accumulate each into one block.
  const rulings = new Map<string, { status: string; line: string }>();
  let cur: string | null = null;
  for (const line of readFileSync(rulingsPath, "utf-8").split(/\r\n|\n/)) {
    const trimmed = line.trim();
    const m = /^- (RU-\d+) \[([^\]]+)\]/.exec(trimmed);
    if (m) {
      cur = m[1]!;
      rulings.set(cur, { status: m[2]!, line });
    } else if (cur && line.startsWith("  ")) {
      const entry = rulings.get(cur)!;
      entry.line += " " + trimmed;
    } else if (trimmed === "") {
      cur = null;
    }
  }

  for (const e of applied) {
    const rid = e["ref"];
    const key = rid === null || rid === undefined ? undefined : String(rid);
    if (key === undefined || !rulings.has(key)) {
      find(
        "violation",
        "rulings",
        rulingsPath,
        `precedent-applied names ${pyReprMaybe(rid)}, which the Ruling register does not define`,
      );
      continue;
    }
    const entry = rulings.get(key)!;
    if (entry.status !== "active") {
      find(
        "violation",
        "rulings",
        rulingsPath,
        `${key} was applied (task ${pyStr(e["task"])}) but its status is ${pyRepr(entry.status)}`,
      );
    }
    const task = e["task"];
    if (task && !entry.line.includes(String(task))) {
      find(
        "violation",
        "rulings",
        rulingsPath,
        `${key} was applied to ${pyStr(task)} but its Applied list does not record it`,
      );
    }
  }
}

function checkDefinitions(
  root: string,
  hasRegister: boolean,
  hasCostlog: boolean,
  hasJournal: boolean,
  find: FindFn,
): void {
  const clsPath = path.join(root, "docs", "classification.md");
  if (!existsSync(clsPath)) {
    find(
      "violation",
      "definitions",
      clsPath,
      "enrolled project has no docs/classification.md",
    );
    return;
  }
  const text = readFileSync(clsPath, "utf-8");
  const lower = text.toLowerCase();
  const idx = lower.indexOf("## custom definitions");
  const section = idx >= 0 ? text.slice(idx) : "";
  const hasRulings = existsSync(path.join(root, "docs", "rulings.md"));

  const checks: Array<[boolean, string, string]> = [
    [hasRegister, "plan-register", "Plan register"],
    [hasCostlog, "cost-log", "Cost log"],
    [hasJournal, "observability", "Run journal"],
    [hasRulings, "rulings", "Ruling register"],
  ];
  for (const [present, marker, label] of checks) {
    if (present && !section.includes(marker)) {
      find(
        "violation",
        "definitions",
        clsPath,
        `${label} instance exists but the Classification's Custom definitions section has no citation (marker ${pyRepr(marker)})`,
      );
    }
  }
}

// ---- Entry --------------------------------------------------------------

/**
 * Runs every check against `root` and returns the result, without any
 * I/O beyond reading the project's own files (no printing, no process
 * exit — form_check.ts's job). Mirrors form_check.py's `main()`
 * exactly, one function call per Python function call, in the same
 * order.
 */
export function runFormCheck(root: string): FormCheckResult {
  const findings: Finding[] = [];
  const find: FindFn = (severity, rule, filePath, msg) => {
    findings.push({ severity, rule, path: filePath, msg });
  };

  const registerPath = path.join(root, "docs", "plan-register.md");
  if (!existsSync(registerPath)) {
    return {
      nodeCount: null,
      findings: [],
      stdoutLines: [
        "form_check: no docs/plan-register.md — project is not enrolled for orchestration; nothing to check.",
      ],
      exitCode: 0,
    };
  }

  const registerText = readFileSync(registerPath, "utf-8");
  const parsed = parseRegister(registerText);
  emitParseErrors(parsed, registerPath, find);
  checkRegister(parsed, registerPath, find);
  checkBacklogRefs(
    parsed,
    registerPath,
    path.join(root, "docs", "backlog.md"),
    find,
  );
  const costTasks = parseCostLog(path.join(root, "docs", "cost-log.md"), find);
  const events = parseJournal(
    path.join(root, "orchestration", "journal.jsonl"),
    find,
  );
  crossChecks(parsed, costTasks, events, root, find);
  checkRulings(events, root, find);
  checkDefinitions(
    root,
    true,
    existsSync(path.join(root, "docs", "cost-log.md")),
    existsSync(path.join(root, "orchestration", "journal.jsonl")),
    find,
  );

  const violations = findings.filter((f) => f.severity === "violation");
  const stdoutLines = findings.map(
    (f) =>
      `${f.severity.toUpperCase().padEnd(9)} ${f.rule.padEnd(18)} ${f.path}: ${f.msg}`,
  );
  stdoutLines.push(
    `form_check: ${parsed.nodes.size} nodes, ${violations.length} violation(s), ${findings.length - violations.length} warning(s).`,
  );

  return {
    nodeCount: parsed.nodes.size,
    findings,
    stdoutLines,
    exitCode: violations.length > 0 ? 1 : 0,
  };
}
