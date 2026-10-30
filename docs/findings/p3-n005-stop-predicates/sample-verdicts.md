# The hard-case sample: verdicts

Reader: RD-4 in the methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)
(a fresh agent session): the task that compares the two readings of
node P3-N013 (the four stop conditions, decidable, evidenced, and
related to the meta-review signals), and a verifier. Neither reading
contains this file.

The sample is criterion A4's (a hard-case sample is scored first):
T017 (`needs-judgment` returned), T008 and T010 (`blocked` on owner
actions), T032 (a role that flagged its reading rather than
substituting judgment), T038 (a role that did two things its brief did
not ask for), and T025 for a `packet-widened` event. T025 was chosen
because its widening read a tool found in the session scratchpad and a
library's source, and because it also carries a `check-failed` event
whose note records a brief defect.

The verdicts below apply the predicate text at commit `d843457`
(draft 2), in the verdict-file format the
[record](../p3-n005-stop-predicates.md#the-verdict-file) fixes. The
[revision log](../p3-n005-stop-predicates.md#revision-log) gives the
draft-0 and draft-1 outcomes that led to each revision.

## Verdicts at draft 2

| Item | Predicate | Verdict | Artifact and field read | Failed closed | I5 |
|---|---|---|---|---|---|
| T008 | 1 | stop | journal `accepted` 2026-08-27T01:00Z, note: "form_check caught the missing accepted event" (form check: failure) | no | — |
| T008 | 2 | stop | journal refs: `fa3e979` does not resolve here; no note of T008 and not its Cost log row names its repository (unknown repository) | yes | — |
| T008 | 3 | stop | journal `result-received` 2026-08-27T01:00Z, status token `blocked` | no | none |
| T008 | 4 | stop | no committed Asks part (corpus statement, Asks inventory) | yes | — |
| T010 | 1 | stop | journal `accepted` 2026-08-29T15:57Z: tests "60/60", build and lint "clean"; no form-check outcome; `result-received` 2026-08-29T15:57Z: only "locally reachable criteria claimed met", so the O3 criteria have no outcome | yes | — |
| T010 | 2 | continue | set 1 (P2-N009, `execute`) in G4; set 2: ref `cd67d75` not here, repository named "majodali/project-orchestrator-service" in the `dispatched` note 2026-08-29T15:27Z, in G4; set 3 empty | no | — |
| T010 | 3 | stop | journal `result-received` 2026-08-29T15:57Z, status token `blocked-on-O3` | no | none |
| T010 | 4 | stop | no committed Asks part | yes | — |
| T017 | 1 | stop | journal `needs-judgment` 2026-08-30T23:03Z: form check "0 violations" (pass), `npm test` "35/35" (pass); the self-verification verdicts and the other commands of P1-N013's criteria have no outcome | yes | — |
| T017 | 2 | stop | journal `needs-judgment` 2026-08-30T23:03Z names "a change to an existing test's conditions (W-002)"; G7 names no pre-authorization | no | — |
| T017 | 3 | stop | journal `result-received` 2026-08-30T23:03Z, status token `needs-judgment` | no | none |
| T017 | 4 | stop | no committed Asks part | yes | — |
| T025 | 1 | stop | journal `check-failed` 2026-09-01T07:28Z | no | — |
| T025 | 2 | continue | set 1 (P2-N010, `execute`) in G4; set 2: ref `6f3b117` not here, "the service repository" named in the `check-failed` note and "the service repo" in the Cost log row, in G4; the `packet-widened` event is in no set; set 3 empty | no | — |
| T025 | 3 | continue | status token `done` (`result-received` 2026-09-01T07:28Z); P2-N002 plan *Gate outcome, 2026-08-26* adopts all twelve decisions, and `gate-crossed` P2-N002 2026-08-27T00:10Z precedes the result; no located finding against a member document; no open question | no | none |
| T025 | 4 | stop | no committed Asks part | yes | — |
| T032 | 1 | stop | journal `accepted` 2026-09-01T21:05Z: the suite "167 pass" (pass); "self-verified per the C1 profile" records no outcome; no form-check outcome | yes | — |
| T032 | 2 | stop | ref `62e144a` does not resolve here; the notes say "this repo" and name no repository from the list (unknown repository) | yes | — |
| T032 | 3 | stop | no `result-received` event, so no status; P2-N012 decisions 1 to 11 adopted before the result (`gate-crossed` P2-N012 2026-09-01T19:35Z); no located finding; no open question | yes | none |
| T032 | 4 | stop | no committed Asks part | yes | — |
| T038 | 1 | stop | journal `accepted` 2026-09-07T16:55Z: I4 "did not claim" (no outcome); no form-check outcome | yes | — |
| T038 | 2 | continue | set 1 (P2-N011, `execute`) in G4; set 2: ref `519f42c` resolves here, this repository, in G4; set 3 empty | no | — |
| T038 | 3 | stop | journal `accepted` 2026-09-07T16:55Z: "T038's placement contradicts both sentences. Marked in the specification under K-011" (P2-N002 specification, criterion I9, a member document) | no | none |
| T038 | 4 | stop | no committed Asks part | yes | — |

## Counts at draft 2

| Predicate | Stop | of which failed closed | Continue |
|---|---|---|---|
| 1. A failed check | 6 | 4 | 0 |
| 2. A scope change | 3 | 2 | 3 |
| 3. The owner's decision | 5 | 1 | 1 |
| 4. Asks | 6 | 6 | 0 |

## What the sample shows

- **Predicate 3 stops every result whose status is not `done`.** T008
  and T010 stop on their `blocked` tokens (plan decision 6), and T017
  on `needs-judgment`. None of the three stops by failing closed.
- **T038 stops on predicate 3 for the right reason.** Its work
  contradicted criterion I9 of its own specification, and only the
  owner amends an adopted criterion. Draft 0 stopped it only for want
  of a status.
- **Predicate 2 does not see a divergence inside the member's own
  node.** T038 wrote `docs/process/dispatch.md`, which criterion I9 of
  its node said gains no rule. Its node, stage and repository all lie
  inside its grant, so predicate 2 yields continue. Predicate 3 catches
  the case through the located finding. This is evidence for node
  P3-N016 (the determination on W-001): W-001's "the work diverges from
  the agreed chunk list" reads at the level of the list, not inside a
  chunk.
- **The journal does not say which repository a ref belongs to.** T008
  and T032 wrote the service repository, but no committed note names
  it, so predicate 2 fails closed on them.
- **A `check-failed` event can record a brief defect.** T025's does.
  Predicate 1 reads the event kind, so it stops, and the item's own
  checks passed.
- **Predicates 1 and 4 mostly fail closed on history.** The past notes
  rarely record a form-check outcome, and no Asks part is committed.
  The agreement figure over the items whose input existed is the
  evidence of decidability, as the plan's E4 states.
- **The packet widening changed no verdict.** T025's widening is in no
  set of predicate 2.
