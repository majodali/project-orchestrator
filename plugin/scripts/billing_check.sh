#!/bin/sh
# Session-start billing check (project-orchestrator Risk R7).
# An execution environment with ANTHROPIC_API_KEY set silently bills
# API credits even when a subscription is active. Warn loudly; never
# block (exit 0) - the owner decides.
if [ -n "${ANTHROPIC_API_KEY:-}" ]; then
  echo "WARNING [orchestrator R7]: ANTHROPIC_API_KEY is set in this" \
       "environment. It takes precedence over subscription (OAuth)" \
       "auth, so agent usage will bill API credits, violating the" \
       "orchestrator's subscription-only constraint. Unset it (or" \
       "confirm this is intended) before dispatching orchestrated work."
fi
exit 0
