# Request: `mtool links check` exempts text quoted from another repository

Status: draft (written on 2026-11-17 under task T149 of node P4-N026, Upstream proposals batch; not yet approved for carrying)

<!-- K-007 contract: Status transitions draft → approved for carrying
     (the project-orchestrator owner, at the hold on node P4-N026) →
     delivered (hand-carried into an issue of majodali/methodology-tools,
     text unchanged) → accepted / declined, a disposition that
     repository records, not this file. -->

Reader: RD-4 (a fresh agent session) in the methodology's [reader
catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers),
and the maintainers of majodali/methodology-tools. The reader knows
`mtool links check`, the link check of
[methodology-tools](https://github.com/majodali/methodology-tools).

This request rides with the batch of three proposals for
majodali/methodology (see the [cover note](README.md)). The owner
added it to node P4-N026 by the answer to decision D073 on
2026-11-17. It is a request for a behaviour of a tool, not a change
to the methodology corpus, so it carries no intermediate
representation (RU-022, corpus-bound documents are written IR first,
covers the corpus only).

**To:** the maintainers of majodali/methodology-tools.

**Asks for:** a way to exempt, from `mtool links check`, text that a
document quotes verbatim from another repository.

**Provenance**: the quotes of majodali/methodology-tools below were
taken on 2026-11-17 from `main` at commit
`296ba46665ccf7b36e78556e8c5281ce90a45b64` (committed 2026-11-02), the
head of `main` on that day. The owner, who carries the request under
RU-002 (upstream output is hand-carried), re-verifies each quote
before carrying it. The quotes may have moved.

## The problem

RU-015 (how this project delivers a change to a repository it cannot
write to) makes a proposal quote the upstream text verbatim. A quoted
methodology rule holds relative links, such as `../practices.md`.
Those links resolve in majodali/methodology. They do not resolve in
the repository that quotes them.

`mtool links check` reports each such link as a finding and exits
non-zero. The quoting project cannot fix the finding: changing the
link would make the quote no longer verbatim.

Over project-orchestrator at commit `b1c8b9f`, the check reports 8
findings and exits with status 1. All 8 are relative links inside
methodology text that five archived proposal files quote:

| File under `docs/archive/proposals/` | Line | Target |
|---|---|---|
| `active-documents-are-corrected-not-marked.md` | 80 | `../style.md` |
| `active-documents-are-corrected-not-marked.md` | 80 | `working-agreement.md#w-003--…` |
| `contradiction-marking-in-nested-sessions.md` | 74 | `#k-010--…` |
| `contradiction-marking-in-nested-sessions.md` | 74 | `../style.md` |
| `planning-execution-model-is-progress-truth.ir.md` | 316 | `../practices.md` |
| `planning-execution-model-is-progress-truth.md` | 154 | `../practices.md` |
| `report-rule-scoped-by-audience.md` | 80 | `../style.md` |
| `report-rule-scoped-by-audience.md` | 80 | `prose.md#p-004--…` |

Node P4-N032 (Linked plans and specs archived) recorded the 8 on
2026-11-17 with one rule: a link inside normative text that a
proposal writes for majodali/methodology resolves in that repository,
and the text is delivered verbatim, so it is not changed here. The
list is in the [rebuild
record](../archive/plans/rebuild-record.md), under "The link check".

So the check never exits zero over this tree. A new dangling link is
then one more finding in a list that is never empty.

## What the tool does today

The check reads every relative link outside a fenced code block. The
file header of `src/links.ts`:

```ts
// `mtool links check`: deterministic link integrity across a repo
// (Constitution Article 10: dangling links are audit findings; Article 9
// form audits include link integrity). Replaces the bootstrap's ad-hoc
// script — methodology Risk R2's awaited tooling.
```

The parser in `src/markdown.ts` skips fenced lines:

```ts
    if (raw.trimStart().startsWith('```')) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
```

A link inside a blockquote, a line that starts with `>`, is checked
like any other. The tool has no option and no marker that exempts a
link, a block or a file.

## What is asked

The behaviour, in four criteria. How to build it is the maintainers'
choice (RU-004, sketch only).

1. A document can mark one block as text quoted verbatim from another
   repository.
2. `mtool links check` reports no finding for a relative link inside
   a marked block.
3. The summary line counts the links it exempted, so that an
   exemption stays visible.
4. A block without the mark is checked as it is today.

One possible mark, as a sketch: a comment line before the block that
names the source, such as
`<!-- mtool: quoted from majodali/methodology@4c7b1dd -->`.

## An alternative the maintainers may prefer

A quote placed in a fenced code block is already skipped. The three
new proposals of this batch quote methodology text in fenced blocks,
so they add no finding: over the branch that carries this request the
check still reports the same 8.

Under that alternative the tool does not change. The 8 findings then
go away only if the five archived files change their blockquotes to
fenced blocks. Those files are records of proposals already carried,
and this request does not edit them. A fenced block also shows the
quoted markdown as source, where a blockquote renders it.

## The ask

project-orchestrator asks the maintainers of majodali/methodology-tools
to accept the four criteria, to choose the alternative instead, or to
decline.

Before the request is carried, the project-orchestrator owner reviews
it at the hold on node P4-N026 under RU-005 (proposal-class nodes are
owner-gated at verifying).
