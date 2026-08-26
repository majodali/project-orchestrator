#!/usr/bin/env python3
"""Mirror the primary role agents into the plugin package.

`.claude/agents/` is the SOURCE OF TRUTH: across four trials on two
surfaces it is the path that actually loads, while the plugin has
never been observed loading (owner ruling, 2026-08-26, closing
Risk R9). `plugin/agents/` is generated from it, so the plugin stays
a faithful package of the same role contracts.

Usage: sync_agents.py [--check] [project-root]
  --check: exit 1 if the package copy is out of sync (for audits/CI),
           changing nothing.
"""
import shutil
import sys
from pathlib import Path

HEADER = ("<!-- Generated from .claude/agents/ by sync_agents.py -"
          " do not edit here; edit the primary copy and re-run. -->\n")


def main():
    args = [a for a in sys.argv[1:]]
    check = "--check" in args
    if check:
        args.remove("--check")
    root = Path(args[0]) if args else Path.cwd()
    src = root / ".claude" / "agents"
    dst = root / "plugin" / "agents"
    if not src.is_dir():
        print("sync_agents: no .claude/agents/ here.")
        return 1
    expected = {}
    for f in sorted(src.glob("*.md")):
        text = f.read_text()
        # Insert the mirror header after the frontmatter block.
        parts = text.split("---\n", 2)
        if len(parts) == 3:
            text = f"---\n{parts[1]}---\n{HEADER}{parts[2]}"
        else:
            text = HEADER + text
        expected[f.name] = text
    current = {f.name: f.read_text()
               for f in dst.glob("*.md")} if dst.is_dir() else {}
    if expected == current:
        print(f"sync_agents: in sync ({len(expected)} agents).")
        return 0
    if check:
        drift = sorted(set(expected) ^ set(current)
                       | {n for n in expected
                          if current.get(n) not in (None, expected[n])})
        print(f"sync_agents: OUT OF SYNC: {', '.join(drift)}")
        return 1
    dst.mkdir(parents=True, exist_ok=True)
    for f in dst.glob("*.md"):
        if f.name not in expected:
            f.unlink()
    for name, text in expected.items():
        (dst / name).write_text(text)
    print(f"sync_agents: mirrored {len(expected)} agents to "
          f"{dst}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
