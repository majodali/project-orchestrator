# Plan register (fixture)

Provokes register-structure only: P1-N001 has children but its stage
is not one of broken-down/verifying/done. A hold marker keeps the
liveness check quiet so this fixture isolates one rule.

- P1-N001 [executing] [gated: fixture isolation] Has children but the wrong stage
  - P1-N002 [done] Child
