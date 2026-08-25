#!/usr/bin/env python3
"""Render the tail of a project's orchestration run journal.

The owner's feed (docs/process/observability.md): recent events with
their Plan-register context, session IDs as drill-down keys.

Usage: journal_tail.py [N] [project-root]   (defaults: 10, cwd)
"""
import json
import re
import sys
from pathlib import Path

NODE_RE = re.compile(r"^\s*- (P\d+-N\d+) \[[a-z-]+\] (.*)$")


def node_names(root):
    path = root / "docs" / "plan-register.md"
    names = {}
    if path.exists():
        for line in path.read_text().splitlines():
            m = NODE_RE.match(line)
            if m:
                names[m.group(1)] = m.group(2).split(" — ")[0].strip()
    return names


def main():
    args = sys.argv[1:]
    n = int(args[0]) if args and args[0].isdigit() else 10
    root = Path(args[1]) if len(args) > 1 else (
        Path(args[0]) if args and not args[0].isdigit() else Path.cwd())
    path = root / "orchestration" / "journal.jsonl"
    if not path.exists():
        print("journal_tail: no orchestration/journal.jsonl here.")
        return 1
    names = node_names(root)
    lines = [l for l in path.read_text().splitlines() if l.strip()]
    for line in lines[-n:]:
        try:
            e = json.loads(line)
        except json.JSONDecodeError:
            print(f"  !! unparseable line: {line[:80]}")
            continue
        node = e.get("node") or "-"
        label = f"{node} ({names[node]})" if node in names else node
        bits = [
            e.get("ts", "?"),
            f"{e.get('event', '?'):18s}",
            f"task={e.get('task') or '-'}",
            label,
            f"stage={e.get('stage') or '-'}",
            f"role={e.get('role') or '-'}",
        ]
        if e.get("model"):
            bits.append(f"model={e['model']}")
        if e.get("tokens_in") or e.get("tokens_out"):
            bits.append(f"tok={e.get('tokens_in', '?')}/"
                        f"{e.get('tokens_out', '?')}")
        if e.get("session"):
            bits.append(f"session={e['session']}")
        if e.get("note"):
            bits.append(f"— {e['note']}")
        print("  ".join(str(b) for b in bits))
    print(f"journal_tail: showed {min(n, len(lines))} of "
          f"{len(lines)} events.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
