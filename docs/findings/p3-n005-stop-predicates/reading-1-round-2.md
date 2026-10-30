# Stop-predicate reading 1, round 2: verdicts per item

Reader: the task that compares reading 1 with reading 2 (E4), and a verifier who did not do the reading. The reading applies the four stop predicates as they read at commit 027ca03 (draft 3, round 2), to the corpus statement's items T001 to T053. The corpus files at that commit are those at the cut-off d1c3659; the only file changed since the cut-off is the predicate record. "Journal line N" is line N of the run journal. "G1" to "G18" are the stand-in grants of the record's table. Findings and Backlog additions travel in the reading's result, not in this file.

| Item | Predicate | Verdict | Artifact and field read | Failed closed | I5 |
|---|---|---|---|---|---|
| T001 | 1 | stop | no note of the item names the form check with an outcome; journal line 22 accepted 2026-08-26T23:04:23Z is the result event read | yes | n/a |
| T001 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G1; no flag | no | n/a |
| T001 | 3 | stop | no result-received event, so no status (fails closed); journal line 22 accepted 2026-08-26T23:04:23Z read | yes | none |
| T001 | 4 | stop | no result-received event; journal line 22 accepted 2026-08-26T23:04:23Z: no Asks part in any committed artifact | yes | n/a |
| T002 | 1 | stop | journal line 5 packet-widened 2026-08-25T22:12:15Z names form_check.py with no outcome; Cost log row also names it with no outcome | yes | n/a |
| T002 | 2 | continue | recorded ref fa1d878 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G2 | no | n/a |
| T002 | 3 | stop | journal line 4 result-received 2026-08-25T22:12:00Z: status done; plan decisions 1 to 5 of the member plan unadopted: no gate record section in either member document, and the gate-crossed event of journal line 12 (2026-08-25T23:17:37Z) falls after acceptance (test 2) | yes | none |
| T002 | 4 | stop | journal line 4 result-received 2026-08-25T22:12:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T003 | 1 | stop | no note of the item names the form check with an outcome; journal line 8 result-received 2026-08-25T22:18:25Z is the result event read | yes | n/a |
| T003 | 2 | continue | recorded ref de599e7 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G2 | no | n/a |
| T003 | 3 | stop | journal line 8 result-received 2026-08-25T22:18:25Z: status done; plan decisions 1 to 5 unadopted: no gate record section in either member document, and the gate-crossed event of journal line 12 falls after acceptance (test 2) | yes | none |
| T003 | 4 | stop | journal line 8 result-received 2026-08-25T22:18:25Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T004 | 1 | stop | form check passes (journal lines 17 and 19), but line 17 says "self-verification A-E reported" with no outcome per criterion | yes | n/a |
| T004 | 2 | continue | recorded ref cb58f44 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G3 | no | n/a |
| T004 | 3 | continue | journal line 17 result-received 2026-08-26T14:51:00Z: status done; plan decisions 1 to 5 adopted by the gate-crossed event of journal line 12 (2026-08-25T23:17:37Z, before the result); no later gate event within the window (test 2) | no | none |
| T004 | 4 | stop | journal line 17 result-received 2026-08-26T14:51:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T005 | 1 | stop | no note of the item names the form check with an outcome; journal line 27 result-received 2026-08-26T23:19:02Z is the result event read | yes | n/a |
| T005 | 2 | continue | recorded ref 5146a91 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G4 | no | n/a |
| T005 | 3 | continue | journal line 27 result-received 2026-08-26T23:19:02Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T005 | 4 | stop | journal line 27 result-received 2026-08-26T23:19:02Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T006 | 1 | stop | journal line 32 packet-widened 2026-08-26T23:25:30Z names form_check.py with no outcome | yes | n/a |
| T006 | 2 | continue | recorded ref b6bb4d2 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G4 | no | n/a |
| T006 | 3 | continue | journal line 31 result-received 2026-08-26T23:25:30Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T006 | 4 | stop | journal line 31 result-received 2026-08-26T23:25:30Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T007 | 1 | stop | journal line 38 packet-widened 2026-08-27T00:19:37Z names form_check.py with no outcome | yes | n/a |
| T007 | 2 | continue | recorded ref 775842c does not resolve here; journal line 36 dispatched names majodali/project-orchestrator-service in a naming form; repository in grant G4; set 1 is the item node and stage; no flag | no | n/a |
| T007 | 3 | continue | journal line 37 result-received 2026-08-27T00:19:37Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T007 | 4 | stop | journal line 37 result-received 2026-08-27T00:19:37Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T008 | 1 | stop | journal line 43 accepted 2026-08-27T01:00:24Z: "form_check caught the missing accepted event" is a failure outcome of the form check | no | n/a |
| T008 | 2 | stop | recorded ref fa3e979 does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T008 | 3 | stop | journal line 41 result-received 2026-08-27T01:00:03Z: status blocked (test 1) | no | none |
| T008 | 4 | stop | journal line 41 result-received 2026-08-27T01:00:03Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T009 | 1 | stop | no note of the item names the form check with an outcome; journal line 48 result-received 2026-08-28T06:47:03Z is the result event read | yes | n/a |
| T009 | 2 | continue | recorded ref b5f2a04 does not resolve here; journal line 50 precedent-applied names the work repo, with PR number 2 in the same sentence; repository in grant G4; set 1 is the item node and stage; no flag | no | n/a |
| T009 | 3 | continue | journal line 48 result-received 2026-08-28T06:47:03Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T009 | 4 | stop | journal line 48 result-received 2026-08-28T06:47:03Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T010 | 1 | stop | form check named with "0 errors" (journal line 59), but line 57 gives the live criteria "blocked-on-O3" with no outcome | yes | n/a |
| T010 | 2 | continue | recorded ref cd67d75 does not resolve here; journal line 56 dispatched names majodali/project-orchestrator-service; repository in grant G4; set 1 is the item node and stage; no flag | no | n/a |
| T010 | 3 | stop | journal line 57 result-received 2026-08-29T15:57:00Z: status blocked-on-O3 (test 1) | no | none |
| T010 | 4 | stop | journal line 57 result-received 2026-08-29T15:57:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T011 | 1 | continue | journal line 65 accepted 2026-08-29T22:33:31Z: "form check clean on both branches"; plan stage, form check the only named check | no | n/a |
| T011 | 2 | continue | recorded ref a13756e resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G5 | no | n/a |
| T011 | 3 | continue | journal line 63 result-received 2026-08-29T22:33:31Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T011 | 4 | stop | journal line 63 result-received 2026-08-29T22:33:31Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T012 | 1 | stop | journal line 72 accepted 2026-08-30T05:15:29Z names form_check.py in criteria, with no outcome | yes | n/a |
| T012 | 2 | continue | recorded ref 2f576d6 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G6 | no | n/a |
| T012 | 3 | continue | journal line 70 result-received 2026-08-30T05:15:29Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T012 | 4 | stop | journal line 70 result-received 2026-08-30T05:15:29Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T013 | 1 | stop | no note of the item names the form check with an outcome; journal line 77 result-received 2026-08-30T18:30:39Z is the result event read | yes | n/a |
| T013 | 2 | continue | recorded ref 73c88e8 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G7 | no | n/a |
| T013 | 3 | continue | journal line 77 result-received 2026-08-30T18:30:39Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T013 | 4 | stop | journal line 77 result-received 2026-08-30T18:30:39Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T014 | 1 | stop | no note of the item names the form check with an outcome; journal line 80 result-received 2026-08-30T21:17:09Z is the result event read | yes | n/a |
| T014 | 2 | continue | recorded ref 8bf68e7 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G7 | no | n/a |
| T014 | 3 | continue | journal line 80 result-received 2026-08-30T21:17:09Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T014 | 4 | stop | journal line 80 result-received 2026-08-30T21:17:09Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T015 | 1 | stop | journal line 87 check-failed 2026-08-30T21:53:05Z: a check-failed event (npm test red at 34/35) | no | n/a |
| T015 | 2 | stop | journal line 87 check-failed 2026-08-30T21:53:05Z: immediate-class flag, a change to an existing test (W-002); stand-in grant G7 pre-authorizes none | no | n/a |
| T015 | 3 | stop | journal line 84 result-received 2026-08-30T21:53:05Z: "the duplicate-ID question carried forward unresolved" (test 4) | no | open question |
| T015 | 4 | stop | journal line 84 result-received 2026-08-30T21:53:05Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T016 | 1 | stop | no note of the item names the form check with an outcome; journal line 91 result-received 2026-08-30T22:35:23Z is the result event read | yes | n/a |
| T016 | 2 | continue | recorded ref 8876cf2 resolves here; W-002 flag (journal line 93, licensed exception used for the one test) matched by pre-authorization G7a; set 1 inside grant G7a | no | n/a |
| T016 | 3 | continue | journal line 91 result-received 2026-08-30T22:35:23Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T016 | 4 | stop | journal line 91 result-received 2026-08-30T22:35:23Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T017 | 1 | stop | form check passes (journal line 97), but the needs-judgment result states no outcome per criterion | yes | n/a |
| T017 | 2 | stop | journal line 97 needs-judgment 2026-08-30T23:03:58Z: immediate-escalation flag, W-002; stand-in grant G7 pre-authorizes none | no | n/a |
| T017 | 3 | stop | journal line 96 result-received 2026-08-30T23:03:58Z: status needs-judgment (test 1) | no | none |
| T017 | 4 | stop | journal line 96 result-received 2026-08-30T23:03:58Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T018 | 1 | stop | no note of the item names the form check with an outcome; journal line 101 result-received 2026-08-30T23:39:28Z is the result event read | yes | n/a |
| T018 | 2 | continue | recorded ref 73b20b4 resolves here; W-002 flag (journal line 102, RU-014 applied to the one test) matched by pre-authorization G7b; set 1 inside grant G7b | no | n/a |
| T018 | 3 | continue | journal line 101 result-received 2026-08-30T23:39:28Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T018 | 4 | stop | journal line 101 result-received 2026-08-30T23:39:28Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T019 | 1 | stop | no note of the item names the form check with an outcome; journal line 110 result-received 2026-08-31T05:29:34Z is the result event read | yes | n/a |
| T019 | 2 | stop | stand-in grant none: journal line 107 gate-opened 2026-08-31T01:28:10Z records no owner grant; no scope recovered | yes | n/a |
| T019 | 3 | continue | journal line 110 result-received 2026-08-31T05:29:34Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T019 | 4 | stop | journal line 110 result-received 2026-08-31T05:29:34Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T020 | 1 | stop | no note of the item names the form check with an outcome; journal line 118 result-received 2026-09-01T00:03:15Z is the result event read | yes | n/a |
| T020 | 2 | continue | recorded ref b29b0e5 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G8 | no | n/a |
| T020 | 3 | continue | journal line 118 result-received 2026-09-01T00:03:15Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T020 | 4 | stop | journal line 118 result-received 2026-09-01T00:03:15Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T021 | 1 | stop | no note of the item names the form check with an outcome; journal line 127 result-received 2026-09-01T00:19:17Z is the result event read | yes | n/a |
| T021 | 2 | continue | recorded ref ca36ca8 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G9 | no | n/a |
| T021 | 3 | continue | journal line 127 result-received 2026-09-01T00:19:17Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T021 | 4 | stop | journal line 127 result-received 2026-09-01T00:19:17Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T022 | 1 | stop | journal line 131 packet-widened 2026-09-01T00:40:13Z names form_check.ts with no outcome | yes | n/a |
| T022 | 2 | continue | recorded ref 2b618c8 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G9 | no | n/a |
| T022 | 3 | continue | journal line 130 result-received 2026-09-01T00:40:13Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T022 | 4 | stop | journal line 130 result-received 2026-09-01T00:40:13Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T023 | 1 | stop | no note of the item names the form check with an outcome; journal line 136 result-received 2026-09-01T02:04:44Z is the result event read | yes | n/a |
| T023 | 2 | continue | recorded ref 42d235e resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G9 | no | n/a |
| T023 | 3 | continue | journal line 136 result-received 2026-09-01T02:04:44Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T023 | 4 | stop | journal line 136 result-received 2026-09-01T02:04:44Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T024 | 1 | stop | journal line 146 packet-widened 2026-09-01T04:06:07Z names form_check.ts with no outcome | yes | n/a |
| T024 | 2 | continue | recorded ref a3415ce does not resolve here; journal line 145 result-received names the work repo; repository in grant G4; set 1 is the item node and stage; no flag | no | n/a |
| T024 | 3 | continue | journal line 145 result-received 2026-09-01T04:06:07Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T024 | 4 | stop | journal line 145 result-received 2026-09-01T04:06:07Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T025 | 1 | stop | journal line 155 check-failed 2026-09-01T07:28:26Z: a check-failed event | no | n/a |
| T025 | 2 | continue | recorded ref 6f3b117 does not resolve here; journal line 155 check-failed names the service repository; repository in grant G4; set 1 is the item node and stage; no flag | no | n/a |
| T025 | 3 | continue | journal line 152 result-received 2026-09-01T07:28:26Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T025 | 4 | stop | journal line 152 result-received 2026-09-01T07:28:26Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T026 | 1 | stop | journal line 159 check-failed 2026-09-01T16:17:19Z: a check-failed event (production defect on the lease release) | no | n/a |
| T026 | 2 | continue | recorded ref 60578dd and e9ae6e4 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G4 | no | n/a |
| T026 | 3 | stop | no result-received event, so no status (fails closed); journal line 163 accepted 2026-09-01T17:40:32Z read | yes | none |
| T026 | 4 | stop | no result-received event; journal line 163 accepted 2026-09-01T17:40:32Z: no Asks part in any committed artifact | yes | n/a |
| T027 | 1 | stop | no note of the item names the form check with an outcome; journal line 164 result-received 2026-09-01T17:40:32Z is the result event read | yes | n/a |
| T027 | 2 | stop | recorded ref 3ff7fa8 does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T027 | 3 | continue | journal line 164 result-received 2026-09-01T17:40:32Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T027 | 4 | stop | journal line 164 result-received 2026-09-01T17:40:32Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T028 | 1 | stop | no note of the item names the form check with an outcome; journal line 170 result-received 2026-09-01T18:30:16Z is the result event read | yes | n/a |
| T028 | 2 | continue | recorded ref e5c045a resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G10 | no | n/a |
| T028 | 3 | continue | journal line 170 result-received 2026-09-01T18:30:16Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T028 | 4 | stop | journal line 170 result-received 2026-09-01T18:30:16Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T029 | 1 | continue | journal line 176 accepted 2026-09-01T19:20:00Z: "form checks clean"; specify stage, form check the only named check | no | n/a |
| T029 | 2 | continue | recorded ref 9f03d8c resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G11 | no | n/a |
| T029 | 3 | stop | no result-received event, so no status (fails closed); journal line 176 accepted 2026-09-01T19:20:00Z read; test 2 passes (decisions adopted, journal line 174 gate-crossed planned before the result) | yes | none |
| T029 | 4 | stop | no result-received event; journal line 176 accepted 2026-09-01T19:20:00Z: no Asks part in any committed artifact | yes | n/a |
| T030 | 1 | stop | no note of the item names the form check with an outcome; journal line 181 accepted 2026-09-01T20:12:00Z is the result event read | yes | n/a |
| T030 | 2 | continue | recorded ref f95b9e8 does not resolve here; journal line 180 dispatched names the service repository; repository in grant G12; set 1 is the item node and stage; no flag | no | n/a |
| T030 | 3 | stop | no result-received event, so no status (fails closed); journal line 181 accepted 2026-09-01T20:12:00Z read | yes | none |
| T030 | 4 | stop | no result-received event; journal line 181 accepted 2026-09-01T20:12:00Z: no Asks part in any committed artifact | yes | n/a |
| T031 | 1 | stop | no note of the item names the form check with an outcome; journal line 185 accepted 2026-09-01T20:55:00Z is the result event read | yes | n/a |
| T031 | 2 | continue | recorded ref a5f75f3 does not resolve here; journal line 186 packet-widened names the service repo; repository in grant G12; set 1 is the item node and stage; no flag | no | n/a |
| T031 | 3 | stop | no result-received event, so no status (fails closed); journal line 185 accepted 2026-09-01T20:55:00Z read | yes | none |
| T031 | 4 | stop | no result-received event; journal line 185 accepted 2026-09-01T20:55:00Z: no Asks part in any committed artifact | yes | n/a |
| T032 | 1 | stop | no note of the item names the form check with an outcome; journal line 187 accepted 2026-09-01T21:05:00Z is the result event read | yes | n/a |
| T032 | 2 | stop | recorded ref 62e144a does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T032 | 3 | stop | no result-received event, so no status (fails closed); journal line 187 accepted 2026-09-01T21:05:00Z read | yes | none |
| T032 | 4 | stop | no result-received event; journal line 187 accepted 2026-09-01T21:05:00Z: no Asks part in any committed artifact | yes | n/a |
| T033 | 1 | stop | no note of the item names the form check with an outcome; journal line 191 accepted 2026-09-01T22:20:00Z is the result event read | yes | n/a |
| T033 | 2 | stop | recorded ref db8b66a does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T033 | 3 | stop | no result-received event, so no status (fails closed); journal line 191 accepted 2026-09-01T22:20:00Z read | yes | none |
| T033 | 4 | stop | no result-received event; journal line 191 accepted 2026-09-01T22:20:00Z: no Asks part in any committed artifact | yes | n/a |
| T034 | 1 | stop | no note of the item names the form check with an outcome; journal line 193 accepted 2026-09-02T04:40:00Z is the result event read | yes | n/a |
| T034 | 2 | stop | recorded ref 74d67c1 does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T034 | 3 | stop | no result-received event, so no status (fails closed); journal line 193 accepted 2026-09-02T04:40:00Z read | yes | none |
| T034 | 4 | stop | no result-received event; journal line 193 accepted 2026-09-02T04:40:00Z: no Asks part in any committed artifact | yes | n/a |
| T035 | 1 | stop | no note of the item names the form check with an outcome; journal line 198 accepted 2026-09-06T00:30:00Z is the result event read | yes | n/a |
| T035 | 2 | stop | recorded ref 7dab3c5 does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T035 | 3 | stop | no result-received event, so no status (fails closed); journal line 198 accepted 2026-09-06T00:30:00Z read | yes | none |
| T035 | 4 | stop | no result-received event; journal line 198 accepted 2026-09-06T00:30:00Z: no Asks part in any committed artifact | yes | n/a |
| T036 | 1 | stop | no note of the item names the form check with an outcome; journal line 200 accepted 2026-09-06T16:15:00Z is the result event read | yes | n/a |
| T036 | 2 | stop | recorded ref 3d582ea does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T036 | 3 | stop | no result-received event, so no status (fails closed); journal line 200 accepted 2026-09-06T16:15:00Z read | yes | none |
| T036 | 4 | stop | no result-received event; journal line 200 accepted 2026-09-06T16:15:00Z: no Asks part in any committed artifact | yes | n/a |
| T037 | 1 | stop | no note of the item names the form check with an outcome; journal line 203 accepted 2026-09-07T15:10:00Z is the result event read | yes | n/a |
| T037 | 2 | stop | recorded ref c0e8edf does not resolve here; no note of the item names its repository in a naming form (journal and Cost log read); unknown repository | yes | n/a |
| T037 | 3 | stop | no result-received event, so no status (fails closed); journal line 203 accepted 2026-09-07T15:10:00Z read | yes | none |
| T037 | 4 | stop | no result-received event; journal line 203 accepted 2026-09-07T15:10:00Z: no Asks part in any committed artifact | yes | n/a |
| T038 | 1 | stop | no note of the item names the form check with an outcome; journal line 209 accepted 2026-09-07T16:55:00Z is the result event read | yes | n/a |
| T038 | 2 | continue | recorded ref 519f42c resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G4 | no | n/a |
| T038 | 3 | stop | no result-received event, so no status (fails closed); journal line 209 accepted 2026-09-07T16:55:00Z: located finding "Marked in the specification under K-011", recorded input (test 3) | no | none |
| T038 | 4 | stop | no result-received event; journal line 209 accepted 2026-09-07T16:55:00Z: no Asks part in any committed artifact | yes | n/a |
| T039 | 1 | continue | journal line 225 accepted 2026-09-17T13:00:00Z: "form_check clean"; specify stage, form check the only named check | no | n/a |
| T039 | 2 | continue | recorded ref 377abde resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G13 | no | n/a |
| T039 | 3 | continue | journal line 219 result-received 2026-09-17T12:50:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T039 | 4 | stop | journal line 219 result-received 2026-09-17T12:50:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T040 | 1 | stop | no note of the item names the form check with an outcome; journal line 231 result-received 2026-09-17T15:30:00Z is the result event read | yes | n/a |
| T040 | 2 | continue | recorded ref 4e22d3a resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G14 | no | n/a |
| T040 | 3 | continue | journal line 231 result-received 2026-09-17T15:30:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T040 | 4 | stop | journal line 231 result-received 2026-09-17T15:30:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T041 | 1 | stop | no note of the item names the form check with an outcome; journal line 233 result-received 2026-09-17T15:30:00Z is the result event read | yes | n/a |
| T041 | 2 | continue | recorded ref dbd92c3 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G14 | no | n/a |
| T041 | 3 | continue | journal line 233 result-received 2026-09-17T15:30:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T041 | 4 | stop | journal line 233 result-received 2026-09-17T15:30:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T042 | 1 | stop | no note of the item names the form check with an outcome; journal line 234 result-received 2026-09-17T15:30:00Z is the result event read | yes | n/a |
| T042 | 2 | continue | recorded ref 5075026 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G14 | no | n/a |
| T042 | 3 | continue | journal line 234 result-received 2026-09-17T15:30:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T042 | 4 | stop | journal line 234 result-received 2026-09-17T15:30:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T043 | 1 | stop | no note of the item names the form check with an outcome; journal line 251 result-received 2026-10-29T18:40:00Z is the result event read | yes | n/a |
| T043 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G15; no flag | no | n/a |
| T043 | 3 | stop | journal line 251 result-received 2026-10-29T18:40:00Z: status needs-judgment, decision 13 (test 1) | no | none |
| T043 | 4 | stop | journal line 251 result-received 2026-10-29T18:40:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T044 | 1 | continue | journal line 247 accepted 2026-10-29T18:25:00Z: "Form check clean."; specify stage, form check the only named check | no | n/a |
| T044 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G15; no flag | no | n/a |
| T044 | 3 | continue | journal line 245 result-received 2026-10-29T18:20:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T044 | 4 | stop | journal line 245 result-received 2026-10-29T18:20:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T045 | 1 | continue | journal line 250 accepted 2026-10-29T18:35:00Z: "Form check clean."; specify stage, form check the only named check | no | n/a |
| T045 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G15; no flag | no | n/a |
| T045 | 3 | continue | journal line 248 result-received 2026-10-29T18:30:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T045 | 4 | stop | journal line 248 result-received 2026-10-29T18:30:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T046 | 1 | stop | no note of the item names the form check with an outcome; journal line 256 result-received 2026-10-29T18:50:00Z is the result event read | yes | n/a |
| T046 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G16; no flag | no | n/a |
| T046 | 3 | continue | journal line 256 result-received 2026-10-29T18:50:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T046 | 4 | stop | journal line 256 result-received 2026-10-29T18:50:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T047 | 1 | stop | form check passes (journal line 285), but line 283 says "G5 untested", which records no outcome | yes | n/a |
| T047 | 2 | continue | recorded ref 7521066 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G17 | no | n/a |
| T047 | 3 | continue | journal line 283 result-received 2026-10-29T20:20:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T047 | 4 | stop | journal line 283 result-received 2026-10-29T20:20:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T048 | 1 | continue | journal line 281 accepted 2026-10-29T20:05:00Z: "Form check clean."; plan stage, form check the only named check | no | n/a |
| T048 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G18; no flag | no | n/a |
| T048 | 3 | continue | journal line 277 result-received 2026-10-29T19:58:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T048 | 4 | stop | journal line 277 result-received 2026-10-29T19:58:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T049 | 1 | continue | journal line 275 accepted 2026-10-29T19:55:00Z: "Form check clean."; plan stage, form check the only named check | no | n/a |
| T049 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G18; no flag | no | n/a |
| T049 | 3 | continue | journal line 271 result-received 2026-10-29T19:51:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T049 | 4 | stop | journal line 271 result-received 2026-10-29T19:51:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T050 | 1 | continue | journal line 276 accepted 2026-10-29T19:55:00Z: "Form check clean."; plan stage, form check the only named check | no | n/a |
| T050 | 2 | continue | no recorded ref; set 2 is this repository; set 1 is the item node and stage inside grant G18; no flag | no | n/a |
| T050 | 3 | continue | journal line 273 result-received 2026-10-29T19:52:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T050 | 4 | stop | journal line 273 result-received 2026-10-29T19:52:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T051 | 1 | stop | no note of the item names the form check with an outcome; journal line 279 result-received 2026-10-29T19:59:00Z is the result event read | yes | n/a |
| T051 | 2 | stop | no node, so no grant and no member; journal line 279 result-received 2026-10-29T19:59:00Z read; stand-in grant none | yes | n/a |
| T051 | 3 | stop | journal line 279 result-received 2026-10-29T19:59:00Z: status done; no member, so test 2 fails closed | yes | none |
| T051 | 4 | stop | journal line 279 result-received 2026-10-29T19:59:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T052 | 1 | stop | no note of the item names the form check with an outcome; journal line 287 result-received 2026-10-29T20:45:00Z is the result event read | yes | n/a |
| T052 | 2 | continue | recorded ref 7521066 resolves here; set 2 is this repository; set 1 is the item node and stage inside grant G17 | no | n/a |
| T052 | 3 | continue | journal line 287 result-received 2026-10-29T20:45:00Z: status done; member decisions adopted (test 2); no located finding (test 3) and no open question (test 4) | no | none |
| T052 | 4 | stop | journal line 287 result-received 2026-10-29T20:45:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
| T053 | 1 | stop | no note of the item names the form check with an outcome; journal line 291 result-received 2026-10-29T21:25:00Z is the result event read | yes | n/a |
| T053 | 2 | stop | no node, so no grant and no member; journal line 291 result-received 2026-10-29T21:25:00Z read; stand-in grant none | yes | n/a |
| T053 | 3 | stop | journal line 291 result-received 2026-10-29T21:25:00Z: status done; no member, so test 2 fails closed | yes | none |
| T053 | 4 | stop | journal line 291 result-received 2026-10-29T21:25:00Z: no Asks part in any committed artifact (corpus statement); a journal paraphrase is not the Asks part | yes | n/a |
