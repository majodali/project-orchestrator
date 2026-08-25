# The Cost log — document type

Part of the [orchestration process specification](README.md).
The record that makes the cost goal measurable: every dispatched task
leaves one entry, from the very first orchestrated task.

**Custom-definition mechanics.** As with the
[Plan register](plan-register.md): each managed project defines *Cost
log* by citation — its Classification's Custom definitions section
records a reference to this document, which remains authoritative for
the type's content; the instance links the definition (methodology
Article 7's definition-by-citation form, v1.3.0).

## Location and shape

One file, `docs/cost-log.md`, in the managed project. A Register:
append-oriented, uniform entries, newest last, one row per task.

```
| date | task | node | stage | role | model | input tok | output tok | notes |
|---|---|---|---|---|---|---|---|---|
| 2026-08-24 | T041 | P1-N012 | execute | implementer | claude-sonnet-5 | 38k | 6k | — |
```

Field rules:

- **task** — `T<seq>`, issued per project in dispatch order; the join
  key between register history, summaries, and this log.
- **model** — the exact model identifier the session ran on, as
  reported by the harness, not the tier name: tiers change their
  meaning over time, records must not.
- **input tok / output tok** — session token usage as the harness
  reports it, rounded to the nearest thousand (`k`). When the surface
  exposes no usage, record `n/a` — never estimate into the log.
- **notes** — deviations only: a retry, a `needs-judgment` bounce, a
  packet that had to be widened. Empty is the healthy state.

## Rules

- The Orchestrator writes the entry at task acceptance, in the same
  commit as the register stage change it accompanies.
- Coarseness is accepted for v1 (founding plan, constraint 2): the
  log records tokens and models, not currency. Dollar-equivalent
  analysis at API rates is a reporting concern (plan chunk 6) and is
  computed from the log, never written into it — the log stays
  factual, the exchange rate stays revisable.
- Entries are never edited after the fact except to correct a
  transcription error; corrections note what changed.
- The log exists to be analyzed: per-node, per-role, per-model
  aggregation drives the continual-improvement loop the project's
  second goal promises. Chunk 6 defines the reporting; this document
  only guarantees the data.
