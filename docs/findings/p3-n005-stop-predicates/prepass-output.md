# Mechanical pre-pass output

Produced by `node docs/findings/p3-n005-stop-predicates/prepass.ts d1c3659` over the run journal and the Cost log at the cut-off. It decides only what a structured field decides. `open` means the field does not decide the predicate and the readings do.

Items: 53. Excluded for want of a result event: 0.

- Predicate 1 (a failed check): stop on a `check-failed` event for 3; open for 50.
- Predicate 2 (a scope change): stop on a missing node for 2; open for 51.
- Predicate 3 (the owner's decision), test 1 (status): stop for 16, of which 12 failed closed for want of a `result-received` event; open for 37.
- Predicate 4 (asks): stop, failed closed, for 53: no event carries an Asks part.

| Item | Node and stage | Status token | `check-failed` | `needs-judgment` | Refs | Cost log row | P1 | P2 | P3 test 1 | P4 |
|---|---|---|---|---|---|---|---|---|---|---|
| T001 | P1-N005 execute | none | 0 | 0 | none | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T002 | P1-N008 plan | `done` | 0 | 0 | `fa1d878` | yes | open | open | open | stop (failed closed: no Asks part) |
| T003 | P1-N008 specify | `done` | 0 | 0 | `de599e7` | yes | open | open | open | stop (failed closed: no Asks part) |
| T004 | P1-N008 execute | `done` | 0 | 0 | `cb58f44` | yes | open | open | open | stop (failed closed: no Asks part) |
| T005 | P2-N002 plan | `done` | 0 | 0 | `5146a91` | yes | open | open | open | stop (failed closed: no Asks part) |
| T006 | P2-N002 specify | `done` | 0 | 0 | `b6bb4d2` | yes | open | open | open | stop (failed closed: no Asks part) |
| T007 | P2-N007 execute | `done` | 0 | 0 | `775842c` (not here) | yes | open | open | open | stop (failed closed: no Asks part) |
| T008 | P2-N008 execute | `blocked` | 0 | 0 | `fa3e979` (not here) | yes | open | open | stop | stop (failed closed: no Asks part) |
| T009 | P2-N008 execute | `done` | 0 | 0 | `b5f2a04` (not here) | yes | open | open | open | stop (failed closed: no Asks part) |
| T010 | P2-N009 execute | `blocked-on-O3` | 0 | 0 | `cd67d75` (not here) | yes | open | open | stop | stop (failed closed: no Asks part) |
| T011 | P1-N009 plan | `done` | 0 | 0 | `a13756e` | yes | open | open | open | stop (failed closed: no Asks part) |
| T012 | P1-N009 specify | `done` | 0 | 0 | `2f576d6` | yes | open | open | open | stop (failed closed: no Asks part) |
| T013 | P1-N009 break down | `done` | 0 | 0 | `73c88e8` | yes | open | open | open | stop (failed closed: no Asks part) |
| T014 | P1-N010 execute | `done` | 0 | 0 | `8bf68e7` | yes | open | open | open | stop (failed closed: no Asks part) |
| T015 | P1-N011 execute | `done` | 1 | 0 | `cc9e8ee`, `099b2c6` | yes | stop | open | open | stop (failed closed: no Asks part) |
| T016 | P1-N012 execute | `done` | 0 | 0 | `8876cf2` | yes | open | open | open | stop (failed closed: no Asks part) |
| T017 | P1-N013 execute | `needs-judgment` | 0 | 1 | none | no | open | open | stop | stop (failed closed: no Asks part) |
| T018 | P1-N013 execute | `done` | 0 | 0 | `73b20b4` | yes | open | open | open | stop (failed closed: no Asks part) |
| T019 | P1-N014 plan | `done` | 0 | 0 | `c9da132` | yes | open | open | open | stop (failed closed: no Asks part) |
| T020 | P1-N015 plan | `done` | 0 | 0 | `b29b0e5` | yes | open | open | open | stop (failed closed: no Asks part) |
| T021 | P1-N015 specify | `done` | 0 | 0 | `ca36ca8` | yes | open | open | open | stop (failed closed: no Asks part) |
| T022 | P1-N015 execute | `done` | 0 | 0 | `2b618c8` | yes | open | open | open | stop (failed closed: no Asks part) |
| T023 | P1-N015 execute | `done` | 0 | 0 | `42d235e` | yes | open | open | open | stop (failed closed: no Asks part) |
| T024 | P2-N010 execute | `done` | 0 | 0 | `a3415ce` (not here) | yes | open | open | open | stop (failed closed: no Asks part) |
| T025 | P2-N010 execute | `done` | 1 | 0 | `6f3b117` (not here) | yes | stop | open | open | stop (failed closed: no Asks part) |
| T026 | P2-N010 verify | none | 1 | 0 | `60578dd`, `e9ae6e4` | yes | stop | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T027 | P2-N010 execute | `done` | 0 | 0 | `3ff7fa8` (not here) | yes | open | open | open | stop (failed closed: no Asks part) |
| T028 | P2-N012 plan | `done` | 0 | 0 | `e5c045a` | yes | open | open | open | stop (failed closed: no Asks part) |
| T029 | P2-N012 specify | none | 0 | 0 | `9f03d8c` | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T030 | P2-N013 execute | none | 0 | 0 | `f95b9e8` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T031 | P2-N014 execute | none | 0 | 0 | `a5f75f3` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T032 | P2-N015 execute | none | 0 | 0 | `62e144a` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T033 | P2-N016 execute | none | 0 | 0 | `db8b66a` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T034 | P2-N016 execute | none | 0 | 0 | `74d67c1` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T035 | P2-N016 execute | none | 0 | 0 | `7dab3c5` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T036 | P2-N016 execute | none | 0 | 0 | `3d582ea` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T037 | P2-N016 execute | none | 0 | 0 | `c0e8edf` (not here) | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T038 | P2-N011 execute | none | 0 | 0 | `519f42c` | yes | open | open | stop (failed closed: no status) | stop (failed closed: no Asks part) |
| T039 | P3-N001 specify | `done` | 0 | 0 | `377abde` | yes | open | open | open | stop (failed closed: no Asks part) |
| T040 | P3-N002 plan | `done` | 0 | 0 | `4e22d3a` | yes | open | open | open | stop (failed closed: no Asks part) |
| T041 | P3-N003 plan | `done` | 0 | 0 | `dbd92c3` | yes | open | open | open | stop (failed closed: no Asks part) |
| T042 | P3-N005 plan | `done` | 0 | 0 | `5075026` | yes | open | open | open | stop (failed closed: no Asks part) |
| T043 | P3-N002 specify | `needs-judgment` | 0 | 0 | none | yes | open | open | stop | stop (failed closed: no Asks part) |
| T044 | P3-N003 specify | `done` | 0 | 0 | none | yes | open | open | open | stop (failed closed: no Asks part) |
| T045 | P3-N005 specify | `done` | 0 | 0 | none | yes | open | open | open | stop (failed closed: no Asks part) |
| T046 | P1-N014 specify | `done` | 0 | 0 | none | yes | open | open | open | stop (failed closed: no Asks part) |
| T047 | P1-N014 execute | `done` | 0 | 0 | `7521066` | yes | open | open | open | stop (failed closed: no Asks part) |
| T048 | P3-N006 plan | `done` | 0 | 0 | none | yes | open | open | open | stop (failed closed: no Asks part) |
| T049 | P3-N010 plan | `done` | 0 | 0 | none | yes | open | open | open | stop (failed closed: no Asks part) |
| T050 | P3-N013 plan | `done` | 0 | 0 | none | yes | open | open | open | stop (failed closed: no Asks part) |
| T051 | none execute | `done` | 0 | 0 | `d9f00ba` | yes | open | stop | open | stop (failed closed: no Asks part) |
| T052 | P1-N014 verify | `done` | 0 | 0 | `7521066` | yes | open | open | open | stop (failed closed: no Asks part) |
| T053 | none execute | `done` | 0 | 0 | none | yes | open | stop | open | stop (failed closed: no Asks part) |
