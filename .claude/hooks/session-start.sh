#!/bin/bash
# Session start (owner, 2026-11-12): bring the checkout up to date, then
# tell the session what the plan offers. What this prints becomes part
# of the session's context.
#
# Why: a session that started on a stale checkout ran without the
# repository's own hooks and settings, which are read from the main
# checkout, and nobody saw it. So this fetches origin/main, fast-
# forwards a checkout that is on main with nothing uncommitted, and
# says plainly when it could not. It never touches a work branch, never
# discards anything, and never fails the session.

set -u

cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
git rev-parse --git-dir >/dev/null 2>&1 || exit 0

here="$(git rev-parse --show-toplevel)"
# The main checkout: where a worktree's shared .git directory lives.
# Claude Code reads the repository's hooks and settings from there.
common="$(git rev-parse --path-format=absolute --git-common-dir 2>/dev/null || true)"
main_checkout="$here"
if [ -n "$common" ] && [ "$(basename "$common")" = ".git" ]; then
  main_checkout="$(dirname "$common")"
fi

echo "Checkout:"
if ! git fetch --quiet origin main 2>/dev/null; then
  echo "- could not fetch origin/main; what follows may be out of date. Tell the person."
fi

# Brings one checkout up to date, or says why it did not.
update() {
  local dir="$1" label="$2" branch behind dirty
  branch="$(git -C "$dir" symbolic-ref --quiet --short HEAD 2>/dev/null || echo "detached")"
  behind="$(git -C "$dir" rev-list --count HEAD..origin/main 2>/dev/null || echo "?")"
  if [ "$behind" = "0" ]; then
    echo "- $label ($branch) has everything on origin/main."
    return
  fi
  if [ "$branch" != "main" ]; then
    echo "- $label is on $branch, $behind commit(s) behind origin/main. Not changed: merge origin/main into it if the work needs what is new."
    return
  fi
  dirty="$(git -C "$dir" status --porcelain --untracked-files=no 2>/dev/null)"
  if [ -n "$dirty" ]; then
    echo "- $label is on main, $behind commit(s) behind origin/main, with uncommitted changes. Not updated. Tell the person before any work."
    return
  fi
  if git -C "$dir" merge --ff-only --quiet origin/main 2>/dev/null; then
    echo "- $label was $behind commit(s) behind origin/main and is now up to date."
  else
    echo "- $label is on main, $behind commit(s) behind origin/main, and could not be fast-forwarded. Tell the person before any work."
  fi
}

update "$main_checkout" "the main checkout"
if [ "$here" != "$main_checkout" ]; then
  update "$here" "this worktree"
fi

echo
script="$main_checkout/plugin/scripts/session_brief.ts"
[ -f "$script" ] || script="$here/plugin/scripts/session_brief.ts"
if ! node "$script" origin/main 2>/dev/null; then
  echo "The plan's brief could not be produced (it needs Node 22.18 or later and \`npm ci\` in this checkout). Call task_next to see what is on offer."
fi
exit 0
