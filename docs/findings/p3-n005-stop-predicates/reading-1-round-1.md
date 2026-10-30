# Stop predicates: reading 1, round 1 (verdict file)

Reader: the comparison task, and a verifier who did not do the reading. Both are fresh agent sessions.

Basis: the four predicates and the corpus statement in the [predicate record](../p3-n005-stop-predicates.md) at commit `d843457` (the predicate commit). The corpus is frozen at cut-off commit `d1c3659`, and the run journal is `orchestration/journal.jsonl` as it stands at that commit. Item IDs T001 to T053 are the run journal's task IDs. Node IDs such as P1-N005 are the Plan register's IDs. Grants G1 to G18 are the stand-in grants in the corpus statement. Other identifiers cited: K-011 (found contradictions are marked, not routed around), W-002 (existing tests are signals, not obstacles), RU-014 (a ruling on a test's cross-check assertion), and criterion I9 of the P2-N002 specification.

Conventions: `J` names the run journal. A `—` or `n/a` in the I5 column means the row is not predicate 3, and I5 is filled for predicate 3 only. Failed closed is `yes` only where the stop rests on a missing input, as the predicate record defines it.

| Item | Predicate | Verdict | Artifact and field read | Failed closed | I5 |
|---|---|---|---|---|---|
| T001 | 1 | `stop` | J accepted 2026-08-26T23:04:23Z: no form-check outcome in any note of the item | yes | n/a |
| T001 | 2 | `continue` | J dispatched 2026-08-25T18:52:00Z: grant G1 covers P1-N005 execute; no ref, so this repository; no flag | no | n/a |
| T001 | 3 | `stop` | J no result-received event (accepted 2026-08-26T23:04:23Z only), so no status (test 1 fails closed); member P1-N001 plan has no Decisions section | yes | none |
| T001 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T002 | 1 | `stop` | J result-received 2026-08-25T22:12:00Z and accepted 22:13:00Z: no form-check outcome | yes | n/a |
| T002 | 2 | `continue` | J accepted 2026-08-25T22:13:00Z: grant G2 covers P1-N008 plan; ref fa1d878 resolves here | no | n/a |
| T002 | 3 | `stop` | J result-received 2026-08-25T22:12:00Z: status done; test 2: P1-N008 plan entries 1 to 5 are unadopted, as neither P1-N008 document has a gate record section (fails closed) | yes | none |
| T002 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T003 | 1 | `stop` | J result-received 2026-08-25T22:18:25Z and accepted 22:19:00Z: no form-check outcome | yes | n/a |
| T003 | 2 | `continue` | J accepted 2026-08-25T22:19:00Z: grant G2 covers P1-N008 specify; ref de599e7 resolves here | no | n/a |
| T003 | 3 | `stop` | J result-received 2026-08-25T22:18:25Z: status done; test 2: P1-N008 plan entries 1 to 5 have no gate record section in either member document (fails closed) | yes | none |
| T003 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T004 | 1 | `stop` | J result-received 2026-08-26T14:51:00Z: form check clean (pass); 'self-verification A-E reported' gives no criterion outcome | yes | n/a |
| T004 | 2 | `continue` | J result-received 2026-08-26T14:51:00Z: grant G3 covers P1-N008 execute; ref cb58f44 resolves here | no | n/a |
| T004 | 3 | `stop` | J result-received 2026-08-26T14:51:00Z: status done; test 2: P1-N008 plan entries 1 to 5 have no gate record section in either member document (fails closed) | yes | none |
| T004 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T005 | 1 | `stop` | J result-received 2026-08-26T23:19:02Z: no form-check outcome | yes | n/a |
| T005 | 2 | `continue` | J result-received 2026-08-26T23:19:02Z: grant G4 covers P2-N002 and its nodes, every stage; ref 5146a91 resolves here | no | n/a |
| T005 | 3 | `stop` | J result-received 2026-08-26T23:19:02Z: status done; test 2: P2-N002 plan entries 1 to 9 are adopted by its gate outcome, but the first qualifying gate-crossed (broken-down) 2026-08-27T00:10:03Z is after the result | no | none |
| T005 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T006 | 1 | `stop` | J result-received 2026-08-26T23:25:30Z: no form-check outcome | yes | n/a |
| T006 | 2 | `continue` | J result-received 2026-08-26T23:25:30Z: grant G4 covers P2-N002 specify; ref b6bb4d2 resolves here | no | n/a |
| T006 | 3 | `stop` | J result-received 2026-08-26T23:25:30Z: status done; test 2: P2-N002 entries 10 to 12 adopted via the plan's gate outcome, but the first qualifying gate-crossed 2026-08-27T00:10:03Z is after the result | no | none |
| T006 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T007 | 1 | `stop` | J result-received 2026-08-27T00:19:37Z: 'self-verified' with no outcome; mtool criterion 'unrun'; no form-check outcome | yes | n/a |
| T007 | 2 | `continue` | J dispatched 2026-08-27T00:19:37Z names the work repo majodali/project-orchestrator-service (in G4); ref 775842c not here; P2-N007 execute under G4 | no | n/a |
| T007 | 3 | `continue` | J result-received 2026-08-27T00:19:37Z: status done; test 2 passes (P2-N002 gate-crossed 2026-08-27T00:10:03Z precedes); tests 3 and 4 do not match | no | none |
| T007 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T008 | 1 | `stop` | J accepted 2026-08-27T01:00:24Z: 'form_check caught the missing accepted event' (failure outcome) | no | n/a |
| T008 | 2 | `stop` | J ref fa3e979 does not resolve here; no note of the item or CL row names its repository: unknown repository | yes | n/a |
| T008 | 3 | `stop` | J result-received 2026-08-27T01:00:03Z: status 'blocked' (test 1) | no | none |
| T008 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T009 | 1 | `stop` | J accepted 2026-08-28T06:47:03Z: no form-check outcome | yes | n/a |
| T009 | 2 | `continue` | J precedent-applied 2026-08-28T06:47:03Z names majodali/project-orchestrator-service#2 (in G4); ref b5f2a04 not here | no | n/a |
| T009 | 3 | `continue` | J result-received 2026-08-28T06:47:03Z: status done; test 2 passes (gate-crossed 2026-08-27T00:10:03Z precedes) | no | none |
| T009 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T010 | 1 | `stop` | J accepted 2026-08-29T15:57:00Z: 'matching form_check.py' states no outcome; live criteria 'blocked' | yes | n/a |
| T010 | 2 | `continue` | J dispatched 2026-08-29T15:27:34Z names majodali/project-orchestrator-service; precedent-applied 2026-08-29T15:57:54Z names PR #3 (in G4); ref cd67d75 not here | no | n/a |
| T010 | 3 | `stop` | J result-received 2026-08-29T15:57:00Z: status 'blocked-on-O3' (test 1) | no | none |
| T010 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T011 | 1 | `continue` | J accepted 2026-08-29T22:33:31Z: 'form check clean on both branches' (pass) | no | n/a |
| T011 | 2 | `continue` | J accepted 2026-08-29T22:33:31Z: grant G5 covers P1-N009 plan; ref a13756e resolves here | no | n/a |
| T011 | 3 | `stop` | J result-received 2026-08-29T22:33:31Z: status done; test 2: P1-N009 plan entries 1 to 10 adopted by gate outcome of 2026-08-29, but the first qualifying gate-crossed (planned) 2026-08-30T05:03:49Z is after the result | no | none |
| T011 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T012 | 1 | `stop` | J accepted 2026-08-30T05:15:29Z: no form-check outcome; the criteria it names are not outcomes | yes | n/a |
| T012 | 2 | `continue` | J accepted 2026-08-30T05:15:29Z: grant G6 covers P1-N009 specify; ref 2f576d6 resolves here; P2-N002 is named without a transition on it, not added | no | n/a |
| T012 | 3 | `stop` | J result-received 2026-08-30T05:15:29Z: status done; test 2: P1-N009 spec entries 11 to 14 adopted, but the first specified-stage gate-crossed 2026-08-30T18:21:00Z is after the result | no | none |
| T012 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T013 | 1 | `stop` | J accepted 2026-08-30T18:30:39Z: no form-check outcome | yes | n/a |
| T013 | 2 | `continue` | J accepted 2026-08-30T18:30:39Z: grant G7 covers P1-N009 break down; ref 73c88e8 resolves here; P1-N010 is under P1-N009 (in G7) | no | n/a |
| T013 | 3 | `continue` | J result-received 2026-08-30T18:30:39Z: status done; test 2 passes (gate-crossed 2026-08-30T05:03:49Z and 2026-08-30T18:21:00Z precede) | no | none |
| T013 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T014 | 1 | `stop` | J result-received 2026-08-30T21:17:09Z and accepted: no form-check outcome in the item's events | yes | n/a |
| T014 | 2 | `continue` | J result-received 2026-08-30T21:17:09Z: grant G7 covers P1-N010 execute; ref 8bf68e7 resolves here | no | n/a |
| T014 | 3 | `continue` | J result-received 2026-08-30T21:17:09Z: status done; test 2 passes; tests 3 and 4 do not match | no | none |
| T014 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T015 | 1 | `stop` | J check-failed 2026-08-30T21:53:05Z: 'npm test is red at 34/35' (failure outcome) | no | n/a |
| T015 | 2 | `continue` | J result-received 2026-08-30T21:53:05Z: grant G7 covers P1-N011 execute; refs cc9e8ee and 099b2c6 resolve here; no flag | no | n/a |
| T015 | 3 | `stop` | J result-received 2026-08-30T21:53:05Z: status done; test 2 passes; test 4: 'the duplicate-ID question carried forward unresolved' | no | open question |
| T015 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T016 | 1 | `stop` | J result-received 2026-08-30T22:35:23Z and accepted 22:35:23Z: no form-check outcome | yes | n/a |
| T016 | 2 | `continue` | J accepted 2026-08-30T22:35:23Z: grant G7a covers P1-N012 execute; ref 8876cf2 resolves here; W-002 licence (existing test) applied to one test named by G7a, so the flag is in scope | no | n/a |
| T016 | 3 | `continue` | J result-received 2026-08-30T22:35:23Z: status done; test 2 passes; tests 3 and 4 do not match | no | none |
| T016 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T017 | 1 | `stop` | J needs-judgment 2026-08-30T23:03:58Z: form check 0 violations (pass) and npm test 35/35; no criterion verdict in result (named check 3) | yes | n/a |
| T017 | 2 | `stop` | J needs-judgment 2026-08-30T23:03:58Z: flag, existing test's conditions changed (W-002); grant G7 names no pre-authorization, so the flag lies outside scope | no | n/a |
| T017 | 3 | `stop` | J result-received 2026-08-30T23:03:58Z: status 'needs-judgment' (test 1) | no | none |
| T017 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T018 | 1 | `stop` | J result-received 2026-08-30T23:39:28Z: no form-check outcome | yes | n/a |
| T018 | 2 | `continue` | J accepted 2026-08-30T23:39:28Z: grant G7b covers P1-N013 execute; ref 73b20b4 resolves here; RU-014 applied to one test named by G7b, so the flag is in scope | no | n/a |
| T018 | 3 | `continue` | J result-received 2026-08-30T23:39:28Z: status done; test 2 passes; tests 3 and 4 do not match | no | none |
| T018 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T019 | 1 | `stop` | J result-received 2026-08-31T05:29:34Z: no form-check outcome | yes | n/a |
| T019 | 2 | `stop` | J gate-opened 2026-08-31T01:28:10Z records no owner grant; no grant recoverable for P1-N014 plan | yes | n/a |
| T019 | 3 | `stop` | J result-received 2026-08-31T05:29:34Z: status done; test 2: P1-N014 plan entries 1 to 9 adopted by gate outcome of 2026-08-31, but gate-crossed (planned) 2026-08-31T19:02:49Z is after the result | no | none |
| T019 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T020 | 1 | `stop` | J result-received 2026-09-01T00:03:15Z: no form-check outcome | yes | n/a |
| T020 | 2 | `continue` | J result-received 2026-09-01T00:03:15Z: grant G8 covers P1-N015 plan; ref b29b0e5 resolves here | no | n/a |
| T020 | 3 | `stop` | J result-received 2026-09-01T00:03:15Z: status done; test 2: P1-N015 plan entries 1 to 5 adopted, but gate-crossed (planned) 2026-09-01T00:13:46Z is after the result | no | none |
| T020 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T021 | 1 | `stop` | J result-received 2026-09-01T00:19:17Z: no form-check outcome | yes | n/a |
| T021 | 2 | `continue` | J result-received 2026-09-01T00:19:17Z: grant G9 covers P1-N015 specify; ref ca36ca8 resolves here | no | n/a |
| T021 | 3 | `continue` | J result-received 2026-09-01T00:19:17Z: status done; test 2 passes (gate-crossed 2026-09-01T00:13:46Z precedes; P1-N015 spec has no numbered entries) | no | none |
| T021 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T022 | 1 | `stop` | J result-received 2026-09-01T00:40:13Z: no form-check outcome | yes | n/a |
| T022 | 2 | `continue` | J result-received 2026-09-01T00:40:13Z: grant G9 covers P1-N015 execute; ref 2b618c8 resolves here | no | n/a |
| T022 | 3 | `continue` | J result-received 2026-09-01T00:40:13Z: status done; test 2 passes | no | none |
| T022 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T023 | 1 | `stop` | J result-received 2026-09-01T02:04:44Z: no form-check outcome | yes | n/a |
| T023 | 2 | `continue` | J result-received 2026-09-01T02:04:44Z: grant G9 covers P1-N015 execute; ref 42d235e resolves here | no | n/a |
| T023 | 3 | `continue` | J result-received 2026-09-01T02:04:44Z: status done; test 2 passes | no | none |
| T023 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T024 | 1 | `stop` | J result-received 2026-09-01T04:06:07Z: no form-check outcome (test and build outcomes are recorded) | yes | n/a |
| T024 | 2 | `continue` | J result-received 2026-09-01T04:06:07Z names the work repo; precedent-applied 2026-09-01T04:06:44Z names PR #5 (in G4); ref a3415ce not here | no | n/a |
| T024 | 3 | `continue` | J result-received 2026-09-01T04:06:07Z: status done; test 2 passes (P2-N002 gate-crossed 2026-08-27T00:10:03Z precedes) | no | none |
| T024 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T025 | 1 | `stop` | J check-failed 2026-09-01T07:28:26Z (the event kind stops the item whatever its note says) | no | n/a |
| T025 | 2 | `continue` | J precedent-applied 2026-09-01T07:28:40Z names PR #6 and the CL row names the service repository (in G4); ref 6f3b117 not here | no | n/a |
| T025 | 3 | `continue` | J result-received 2026-09-01T07:28:26Z: status done; test 2 passes (P2-N002 gate-crossed 2026-08-27T00:10:03Z precedes) | no | none |
| T025 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T026 | 1 | `stop` | J check-failed 2026-09-01T16:17:19Z: lease release failed on a reserved word (failure) | no | n/a |
| T026 | 2 | `continue` | J accepted 2026-09-01T17:40:32Z: grant G4 covers P2-N010 verify; refs 60578dd and e9ae6e4 resolve here | no | n/a |
| T026 | 3 | `stop` | J no result-received event (accepted 2026-09-01T17:40:32Z only), so no status (test 1 fails closed); test 2 passes | yes | none |
| T026 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T027 | 1 | `stop` | J result-received 2026-09-01T17:40:32Z: no form-check outcome | yes | n/a |
| T027 | 2 | `stop` | J ref 3ff7fa8 does not resolve here; no note of the item or CL row names its repository: unknown repository | yes | n/a |
| T027 | 3 | `continue` | J result-received 2026-09-01T17:40:32Z: status done; test 2 passes | no | none |
| T027 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T028 | 1 | `stop` | J result-received 2026-09-01T18:30:16Z: no form-check outcome | yes | n/a |
| T028 | 2 | `continue` | J result-received 2026-09-01T18:30:16Z: grant G10 covers P2-N012 plan; ref e5c045a resolves here | no | n/a |
| T028 | 3 | `stop` | J result-received 2026-09-01T18:30:16Z: status done; test 2: P2-N012 plan entries 1 to 6 adopted 2026-09-01, but the first qualifying gate-crossed (planned) 2026-09-01T19:05:00Z is after the result | no | none |
| T028 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T029 | 1 | `continue` | J accepted 2026-09-01T19:20:00Z: 'form checks clean' (pass) | no | n/a |
| T029 | 2 | `continue` | J accepted 2026-09-01T19:20:00Z: grant G11 covers P2-N012 specify; ref 9f03d8c resolves here | no | n/a |
| T029 | 3 | `stop` | J accepted 2026-09-01T19:20:00Z only (no status: test 1 fails closed); test 2: P2-N012 spec entries 7 to 10 adopted, but the first specified-stage gate-crossed 2026-09-01T19:35:00Z is after the event; the recorded timing stop is not failed closed | no | none |
| T029 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T030 | 1 | `stop` | J accepted 2026-09-01T20:12:00Z: no form-check outcome | yes | n/a |
| T030 | 2 | `continue` | J dispatched 2026-09-01T19:56:00Z names The service repository (in G12); ref f95b9e8 not here; accepted 20:12:00Z gives the branch | no | n/a |
| T030 | 3 | `stop` | J accepted 2026-09-01T20:12:00Z only: no status (test 1 fails closed); test 2 passes (gate-crossed 2026-09-01T19:35:00Z precedes) | yes | none |
| T030 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T031 | 1 | `stop` | J accepted 2026-09-01T20:55:00Z: no form-check outcome | yes | n/a |
| T031 | 2 | `continue` | J CL row names the service repo; ref a5f75f3 not here; grant G12 covers P2-N014 execute (in G12) | no | n/a |
| T031 | 3 | `stop` | J accepted 2026-09-01T20:55:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T031 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T032 | 1 | `stop` | J accepted 2026-09-01T21:05:00Z: no form-check outcome | yes | n/a |
| T032 | 2 | `stop` | J ref 62e144a does not resolve here; no note of the item or CL row names its repository ('this repo' is not a named form): unknown repository | yes | n/a |
| T032 | 3 | `stop` | J accepted 2026-09-01T21:05:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T032 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T033 | 1 | `stop` | J accepted 2026-09-01T22:20:00Z: no form-check outcome | yes | n/a |
| T033 | 2 | `stop` | J ref db8b66a does not resolve here; no note of the item or CL row names its repository: unknown repository | yes | n/a |
| T033 | 3 | `stop` | J accepted 2026-09-01T22:20:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T033 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T034 | 1 | `stop` | J accepted 2026-09-02T04:40:00Z: no form-check outcome | yes | n/a |
| T034 | 2 | `stop` | J ref 74d67c1 does not resolve here; no note of the item or CL row names its repository: unknown repository | yes | n/a |
| T034 | 3 | `stop` | J accepted 2026-09-02T04:40:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T034 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T035 | 1 | `stop` | J accepted 2026-09-06T00:30:00Z: no form-check outcome | yes | n/a |
| T035 | 2 | `stop` | J ref 7dab3c5 does not resolve here; no note of the item or CL row names its repository (the 'Service' named is AWS's): unknown repository | yes | n/a |
| T035 | 3 | `stop` | J accepted 2026-09-06T00:30:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T035 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T036 | 1 | `stop` | J accepted 2026-09-06T16:15:00Z: no form-check outcome | yes | n/a |
| T036 | 2 | `stop` | J ref 3d582ea does not resolve here; no note of the item or CL row names its repository: unknown repository | yes | n/a |
| T036 | 3 | `stop` | J accepted 2026-09-06T16:15:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T036 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T037 | 1 | `stop` | J accepted 2026-09-07T15:10:00Z: no form-check outcome (the deliberate red run is restored, not counted) | yes | n/a |
| T037 | 2 | `stop` | J ref c0e8edf does not resolve here; no note of the item or CL row names its repository: unknown repository | yes | n/a |
| T037 | 3 | `stop` | J accepted 2026-09-07T15:10:00Z only: no status (test 1 fails closed); test 2 passes | yes | none |
| T037 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T038 | 1 | `stop` | J accepted 2026-09-07T16:55:00Z: no form-check outcome | yes | n/a |
| T038 | 2 | `continue` | J accepted 2026-09-07T16:55:00Z: grant G4 covers P2-N011 execute; ref 519f42c resolves here | no | n/a |
| T038 | 3 | `stop` | J accepted 2026-09-07T16:55:00Z only (no status: test 1 fails closed); test 3: 'Marked in the specification under K-011' (criterion I9 of the P2-N002 specification), a recorded contradiction | no | none |
| T038 | 4 | `stop` | J no result-received event, so no Asks part; accepted note is not the Asks part | yes | n/a |
| T039 | 1 | `continue` | J accepted 2026-09-17T13:00:00Z: 'form_check clean' (pass) | no | n/a |
| T039 | 2 | `continue` | J result-received 2026-09-17T12:50:00Z: grant G13 covers P3-N001 specify; ref 377abde resolves here | no | n/a |
| T039 | 3 | `stop` | J result-received 2026-09-17T12:50:00Z: status done; test 2: P3-N001 spec entries 1 to 8 adopted by gate record of 2026-09-17, but gate-crossed (specified) 2026-09-17T14:00:00Z is after the result | no | none |
| T039 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T040 | 1 | `stop` | J result-received 2026-09-17T15:30:00Z: no form-check outcome | yes | n/a |
| T040 | 2 | `continue` | J result-received 2026-09-17T15:30:00Z: grant G14 covers P3-N002 plan; ref 4e22d3a resolves here | no | n/a |
| T040 | 3 | `stop` | J result-received 2026-09-17T15:30:00Z: status done; test 2: P3-N002 plan entries 1 to 8: first qualifying gate-crossed (planned) 2026-10-29T18:00:00Z is after the result | no | none |
| T040 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T041 | 1 | `stop` | J result-received 2026-09-17T15:30:00Z: no form-check outcome | yes | n/a |
| T041 | 2 | `continue` | J result-received 2026-09-17T15:30:00Z: grant G14 covers P3-N003 plan; ref dbd92c3 resolves here; P3-N002 named without a transition, not added | no | n/a |
| T041 | 3 | `stop` | J result-received 2026-09-17T15:30:00Z: status done; test 2: P3-N003 plan entries 1 to 9: first qualifying gate-crossed 2026-10-29T18:00:00Z is after the result | no | none |
| T041 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T042 | 1 | `stop` | J result-received 2026-09-17T15:30:00Z: no form-check outcome | yes | n/a |
| T042 | 2 | `continue` | J result-received 2026-09-17T15:30:00Z: grant G14 covers P3-N005 plan; ref 5075026 resolves here; P1-N016 named without a transition, not added | no | n/a |
| T042 | 3 | `stop` | J result-received 2026-09-17T15:30:00Z: status done; test 2: P3-N005 plan entries 1 to 8: first qualifying gate-crossed 2026-10-29T18:00:00Z is after the result | no | none |
| T042 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T043 | 1 | `stop` | J result-received 2026-10-29T18:40:00Z: no form-check outcome | yes | n/a |
| T043 | 2 | `continue` | J result-received 2026-10-29T18:40:00Z: grant G15 covers P3-N002 specify; no ref, so this repository | no | n/a |
| T043 | 3 | `stop` | J result-received 2026-10-29T18:40:00Z: status 'needs-judgment' (test 1) | no | none |
| T043 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T044 | 1 | `continue` | J accepted 2026-10-29T18:25:00Z: 'Form check clean' (pass) | no | n/a |
| T044 | 2 | `continue` | J result-received 2026-10-29T18:20:00Z: grant G15 covers P3-N003 specify; no ref | no | n/a |
| T044 | 3 | `stop` | J result-received 2026-10-29T18:20:00Z: status done; test 2: P3-N003 spec entries 10 to 16 adopted by gate record of 2026-10-29, but the first specified-stage gate-crossed 2026-10-29T19:30:00Z is after the result | no | none |
| T044 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T045 | 1 | `continue` | J accepted 2026-10-29T18:35:00Z: 'Form check clean' (pass) | no | n/a |
| T045 | 2 | `continue` | J result-received 2026-10-29T18:30:00Z: grant G15 covers P3-N005 specify; no ref | no | n/a |
| T045 | 3 | `stop` | J result-received 2026-10-29T18:30:00Z: status done; test 2: P3-N005 spec entries 9 to 16 adopted, but gate-crossed (specified) 2026-10-29T19:30:00Z is after the result | no | none |
| T045 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T046 | 1 | `stop` | J result-received 2026-10-29T18:50:00Z: no form-check outcome | yes | n/a |
| T046 | 2 | `continue` | J result-received 2026-10-29T18:50:00Z: grant G16 covers P1-N014 specify; no ref | no | n/a |
| T046 | 3 | `stop` | J result-received 2026-10-29T18:50:00Z: status done; test 2: P1-N014 spec entries 10 to 16 adopted 2026-10-29, but gate-crossed (specified) 2026-10-29T19:30:00Z is after the result | no | none |
| T046 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T047 | 1 | `stop` | J accepted 2026-10-29T20:22:00Z: 'form check 48 nodes 0 violations' (pass); criterion G5 'untested' (named check 3) | yes | n/a |
| T047 | 2 | `continue` | J result-received 2026-10-29T20:20:00Z: grant G17 covers P1-N014 execute; ref 7521066 resolves here | no | n/a |
| T047 | 3 | `continue` | J result-received 2026-10-29T20:20:00Z: status done; test 2 passes (gate-crossed 2026-10-29T19:30:00Z precedes) | no | none |
| T047 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T048 | 1 | `continue` | J accepted 2026-10-29T20:05:00Z: 'Form check clean' (pass) | no | n/a |
| T048 | 2 | `continue` | J result-received 2026-10-29T19:58:00Z: grant G18 covers P3-N006 plan; no ref | no | n/a |
| T048 | 3 | `stop` | J result-received 2026-10-29T19:58:00Z: status done; test 2: P3-N006 plan entries 1 to 3 adopted 2026-10-30, but gate-crossed (planned) 2026-10-30T09:00:00Z is after the result | no | none |
| T048 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T049 | 1 | `continue` | J accepted 2026-10-29T19:55:00Z: 'Form check clean' (pass) | no | n/a |
| T049 | 2 | `continue` | J result-received 2026-10-29T19:51:00Z: grant G18 covers P3-N010 plan; no ref | no | n/a |
| T049 | 3 | `stop` | J result-received 2026-10-29T19:51:00Z: status done; test 2: P3-N010 plan entries 1 to 5: gate-crossed (planned) 2026-10-30T09:00:00Z is after the result | no | none |
| T049 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T050 | 1 | `continue` | J accepted 2026-10-29T19:55:00Z: 'Form check clean' (pass) | no | n/a |
| T050 | 2 | `continue` | J result-received 2026-10-29T19:52:00Z: grant G18 covers P3-N013 plan; no ref | no | n/a |
| T050 | 3 | `stop` | J result-received 2026-10-29T19:52:00Z: status done; test 2: P3-N013 plan entries 1 to 7: gate-crossed (planned) 2026-10-30T09:00:00Z is after the result | no | none |
| T050 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T051 | 1 | `stop` | J result-received 2026-10-29T19:59:00Z: no form-check outcome | yes | n/a |
| T051 | 2 | `stop` | J no node and no gate event for the item: no recoverable grant | yes | n/a |
| T051 | 3 | `continue` | J result-received 2026-10-29T19:59:00Z: status done; no member documents, so no entries; tests 3 and 4 do not match | no | none |
| T051 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T052 | 1 | `stop` | J result-received 2026-10-29T20:45:00Z: no form-check outcome; criterion G4 'not confirmable' (named check 3) | yes | n/a |
| T052 | 2 | `continue` | J result-received 2026-10-29T20:45:00Z: grant G17 covers P1-N014 verify; ref 7521066 resolves here; P3-N014 named without a transition, not added | no | n/a |
| T052 | 3 | `continue` | J result-received 2026-10-29T20:45:00Z: status done; test 2 passes (P1-N014 gate-crossed 2026-10-29T19:30:00Z precedes); tests 3 and 4 do not match | no | none |
| T052 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
| T053 | 1 | `stop` | J result-received 2026-10-29T21:25:00Z: no form-check outcome | yes | n/a |
| T053 | 2 | `stop` | J no node and no gate event for the item: no recoverable grant | yes | n/a |
| T053 | 3 | `continue` | J result-received 2026-10-29T21:25:00Z: status done; no member documents; tests 3 and 4 do not match | no | none |
| T053 | 4 | `stop` | J result-received note: no committed Asks part (the note summarises the result) | yes | n/a |
