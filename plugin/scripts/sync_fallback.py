#!/usr/bin/env python3
"""Mirror the plugin's role agents into .claude/agents/.

Cloud sessions are documented to auto-load a repo's .claude/agents/;
plugin loading there is not (yet) documented. This mirror is the
guaranteed fallback (Risk R9). plugin/agents/ is the source of truth;
the mirror is build output.

Usage: sync_fallback.py [--check] [project-root]
  --check: exit 1 if the mirror is out of sync (for audits/CI),
           changing nothing.
"""
import shutil
import sys
from pathlib import Path

HEADER = ("<!-- Mirrored from plugin/agents/ by sync_fallback.py -"
          " do not edit here; edit the plugin copy and re-run. -->\n")


def main():
    args = [a for a in sys.argv[1:]]
    check = "--check" in args
    if check:
        args.remove("--check")
    root = Path(args[0]) if args else Path.cwd()
    src = root / "plugin" / "agents"
    dst = root / ".claude" / "agents"
    if not src.is_dir():
        print("sync_fallback: no plugin/agents/ here.")
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
        print(f"sync_fallback: in sync ({len(expected)} agents).")
        return 0
    if check:
        drift = sorted(set(expected) ^ set(current)
                       | {n for n in expected
                          if current.get(n) not in (None, expected[n])})
        print(f"sync_fallback: OUT OF SYNC: {', '.join(drift)}")
        return 1
    dst.mkdir(parents=True, exist_ok=True)
    for f in dst.glob("*.md"):
        if f.name not in expected:
            f.unlink()
    for name, text in expected.items():
        (dst / name).write_text(text)
    print(f"sync_fallback: mirrored {len(expected)} agents to "
          f"{dst}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
