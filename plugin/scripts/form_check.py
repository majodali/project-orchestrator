#!/usr/bin/env python3
"""Orchestration form checker (v1).

Mechanizes the deterministic invariants of docs/process/auditing.md
for a methodology-managed project. The spec is authoritative: where
this checker and the spec disagree, the spec is right and this
checker has a bug (methodology Article 3).

v1 approximations, documented per auditing.md:
- The Backlog-reference check covers nodes in stages identified /
  planned / specified / executing / verifying. `broken-down` nodes
  are represented by their children and `done` nodes by their
  rewritten Backlog entries, and "executed immediately" is not
  mechanically decidable.
- The stage-change/journal cross-check is approximated by the
  accepted-event <-> cost-row correspondence plus the in-flight
  check on executing/verifying nodes.

Usage: form_check.py [project-root]     (default: cwd)
Exit 0: no violations (a missing Plan register means the project is
not enrolled: reported, exit 0). Exit 1: violations found.
"""
import json
import re
import sys
from pathlib import Path

STAGES = {"identified", "planned", "specified", "broken-down",
          "executing", "verifying", "done"}
INTERIOR_OK = {"broken-down", "verifying", "done"}
NEED_BACKLOG_REF = {"identified", "planned", "specified",
                    "executing", "verifying"}
EVENTS = {"dispatched", "result-received", "accepted", "check-failed",
          "needs-judgment", "blocked", "stale", "backward-transition",
          "packet-widened", "gate-opened", "gate-crossed"}
TASK_TERMINAL = {"accepted", "blocked", "stale"}

NODE_RE = re.compile(
    r"^(\s*)- (P\d+-N\d+) \[([a-z-]+)\]"
    r"(?: \[(gated|blocked): ([^\]]+)\])? (.*)$")
NODEISH_RE = re.compile(r"^\s*- (?:P\d+-N\d+\b|[^\s].*\[[a-z-]+\])")
TASK_RE = re.compile(r"^T\d{3,}$")

findings = []


def find(severity, rule, path, msg):
    findings.append((severity, rule, str(path), msg))


def parse_register(path):
    """Return {id: node} with fields stage, name, indent, children,
    parent; or None on unrecoverable parse failure."""
    nodes = {}
    order = []
    stack = []  # (indent, id)
    for lineno, line in enumerate(path.read_text().splitlines(), 1):
        if not NODEISH_RE.match(line):
            continue
        m = NODE_RE.match(line)
        if not m:
            find("violation", "register-parse", path,
                 f"line {lineno}: node-like line does not parse: "
                 f"{line.strip()!r}")
            continue
        indent, nid, stage, hold, hold_why, rest = m.groups()
        depth = len(indent)
        if nid in nodes:
            find("violation", "register-id", path,
                 f"line {lineno}: duplicate node ID {nid}")
            continue
        while stack and stack[-1][0] >= depth:
            stack.pop()
        parent = stack[-1][1] if stack else None
        nodes[nid] = {"id": nid, "stage": stage, "line": lineno,
                      "hold": hold, "hold_why": hold_why,
                      "name": rest.split(" — ")[0].strip(),
                      "parent": parent, "children": []}
        if parent:
            nodes[parent]["children"].append(nid)
        stack.append((depth, nid))
        order.append(nid)
    return nodes, order


def check_register(nodes, path):
    for nid, n in nodes.items():
        if n["stage"] not in STAGES:
            find("violation", "register-stage", path,
                 f"{nid}: unknown stage [{n['stage']}]")
            continue
        if n["children"]:
            if n["stage"] not in INTERIOR_OK:
                find("violation", "register-structure", path,
                     f"{nid}: has children but stage is "
                     f"[{n['stage']}] (interior nodes are "
                     f"broken-down/verifying/done)")
        else:
            if n["stage"] == "broken-down":
                find("violation", "register-structure", path,
                     f"{nid}: [broken-down] but has no children")


def check_backlog_refs(nodes, register_path, backlog_path):
    if not backlog_path.exists():
        find("violation", "backlog-ref", backlog_path,
             "Plan register exists but docs/backlog.md does not")
        return
    text = backlog_path.read_text()
    for nid, n in nodes.items():
        if n["stage"] in NEED_BACKLOG_REF and nid not in text:
            find("violation", "backlog-ref", register_path,
                 f"{nid} [{n['stage']}] has no Backlog entry "
                 f"referencing it")


def parse_cost_log(path):
    """Return list of task IDs from the cost-log table, checking row
    shape. Header row and separator are skipped."""
    tasks = []
    if not path.exists():
        return tasks
    rows = [l for l in path.read_text().splitlines()
            if l.startswith("|")]
    for i, row in enumerate(rows):
        cells = [c.strip() for c in row.strip().strip("|").split("|")]
        if i == 0:
            continue
        if set("".join(cells)) <= {"-", " ", ":"}:
            continue
        if len(cells) != 9:
            find("violation", "costlog-form", path,
                 f"row {i + 1}: {len(cells)} cells, expected 9")
            continue
        task = cells[1]
        if not TASK_RE.match(task):
            find("violation", "costlog-form", path,
                 f"row {i + 1}: malformed task ID {task!r}")
            continue
        tasks.append(task)
    dupes = {t for t in tasks if tasks.count(t) > 1}
    for t in sorted(dupes):
        find("violation", "costlog-form", path,
             f"duplicate task ID {t}")
    nums = sorted(int(t[1:]) for t in set(tasks))
    if nums and nums != list(range(nums[0], nums[0] + len(nums))):
        find("warning", "costlog-form", path,
             f"task IDs not sequential: {sorted(set(tasks))}")
    return tasks


def parse_journal(path):
    events = []
    if not path.exists():
        return events
    for lineno, line in enumerate(path.read_text().splitlines(), 1):
        if not line.strip():
            continue
        try:
            e = json.loads(line)
        except json.JSONDecodeError as exc:
            find("violation", "journal-form", path,
                 f"line {lineno}: invalid JSON ({exc.msg})")
            continue
        if "ts" not in e or "event" not in e:
            find("violation", "journal-form", path,
                 f"line {lineno}: missing required field ts/event")
            continue
        if e["event"] not in EVENTS:
            find("violation", "journal-form", path,
                 f"line {lineno}: unknown event kind "
                 f"{e['event']!r}")
            continue
        events.append(e)
    return events


def cross_checks(nodes, cost_tasks, events, root):
    journal_path = root / "orchestration" / "journal.jsonl"
    cost_path = root / "docs" / "cost-log.md"
    accepted = {e.get("task") for e in events
                if e["event"] == "accepted" and e.get("task")}
    for t in sorted(accepted - set(cost_tasks)):
        find("violation", "journal-crosscheck", cost_path,
             f"journal has accepted event for {t} but the Cost log "
             f"has no row")
    for t in sorted(set(cost_tasks) - accepted):
        find("violation", "journal-crosscheck", journal_path,
             f"Cost log row {t} has no accepted journal event")
    # Liveness: an executing/verifying node must be in-flight (an
    # open dispatched task) or hold-marked gated/blocked — the four
    # arms of auditing.md, with actionable not applying to these
    # stages. A hold marker on a done node is stale by definition.
    by_task = {}
    for e in events:
        if e.get("task"):
            by_task.setdefault(e["task"], []).append(e["event"])
    for nid, n in nodes.items():
        if n["stage"] == "done" and n.get("hold"):
            find("violation", "liveness",
                 root / "docs" / "plan-register.md",
                 f"{nid} is [done] but carries a "
                 f"[{n['hold']}: ...] hold marker")
        if n["stage"] not in {"executing", "verifying"}:
            continue
        if n.get("hold"):
            continue  # gated/blocked: declared hold, liveness met
        open_tasks = [
            t for t, kinds in by_task.items()
            if any(e.get("task") == t and e.get("node") == nid
                   and e["event"] == "dispatched" for e in events)
            and not (set(kinds) & TASK_TERMINAL)
        ]
        if not open_tasks:
            find("violation", "liveness", journal_path,
                 f"{nid} is [{n['stage']}] with no hold marker and "
                 f"no open dispatched task in the journal")


def check_definitions(root, has_register, has_costlog, has_journal):
    cls = root / "docs" / "classification.md"
    if not cls.exists():
        find("violation", "definitions", cls,
             "enrolled project has no docs/classification.md")
        return
    text = cls.read_text()
    lower = text.lower()
    idx = lower.find("## custom definitions")
    section = text[idx:] if idx >= 0 else ""
    for present, marker, label in (
            (has_register, "plan-register", "Plan register"),
            (has_costlog, "cost-log", "Cost log"),
            (has_journal, "observability", "Run journal")):
        if present and marker not in section:
            find("violation", "definitions", cls,
                 f"{label} instance exists but the Classification's "
                 f"Custom definitions section has no citation "
                 f"(marker {marker!r})")


def main():
    root = Path(sys.argv[1]) if len(sys.argv) > 1 else Path.cwd()
    register_path = root / "docs" / "plan-register.md"
    if not register_path.exists():
        print("form_check: no docs/plan-register.md — project is not "
              "enrolled for orchestration; nothing to check.")
        return 0
    nodes, _ = parse_register(register_path)
    check_register(nodes, register_path)
    check_backlog_refs(nodes, register_path, root / "docs" / "backlog.md")
    cost_tasks = parse_cost_log(root / "docs" / "cost-log.md")
    events = parse_journal(root / "orchestration" / "journal.jsonl")
    cross_checks(nodes, cost_tasks, events, root)
    check_definitions(root, True,
                      (root / "docs" / "cost-log.md").exists(),
                      (root / "orchestration" / "journal.jsonl").exists())

    violations = [f for f in findings if f[0] == "violation"]
    for sev, rule, path, msg in findings:
        print(f"{sev.upper():9s} {rule:18s} {path}: {msg}")
    print(f"form_check: {len(nodes)} nodes, "
          f"{len(violations)} violation(s), "
          f"{len(findings) - len(violations)} warning(s).")
    return 1 if violations else 0


if __name__ == "__main__":
    sys.exit(main())
