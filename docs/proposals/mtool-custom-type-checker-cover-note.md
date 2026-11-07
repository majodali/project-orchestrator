# Cover note: the checker extension-point proposal

Status: draft

<!-- K-007 contract: Status transitions draft → read (the owner has
     read this note before carrying) → closed → Backlog entry (once the
     proposal is carried and the issue's link is recorded in the
     Backlog row "Deliver the extension-point proposal upstream", or
     the owner records a hold there). Anything unmarked here is a live
     claim of current intent. This file is the carrier's reading aid
     and the source of the covering message; only the covering message
     section below and the proposal itself are carried upstream. -->

Reader: the owner as carrier, returning after a gap (RD-2 in the
methodology's
[reader catalog](https://github.com/majodali/methodology/blob/v1.6.0/docs/style.md#readers)),
and, for the section *The covering message* only, the maintainer of
majodali/methodology-tools, who knows the methodology and `mtool` and
none of this project's documents. It assumes the methodology at this
project's pinned version, 1.6.0 ([Classification](../classification.md)).

One proposal to majodali/methodology-tools,
[mtool-custom-type-checker.md](mtool-custom-type-checker.md), drafted by
node P1-N008 (mtool checker extension-point proposal) on 2026-08-26 and
never carried. It is ready to hand-carry, with its text unchanged
([RU-002](../rulings.md), the owner hand-carries upstream-bound output).
This note was written by node P3-N019 (the checker extension-point
proposal is ready to carry), specified in the
[plan of node P3-N015 (the demonstration)](../plans/p3-n015-sequence-demonstration.md#m3-the-checker-extension-point-proposal-is-ready-to-carry).

The proposal is not edited. Changes since its drafting go in the
covering message, never in the artifact
([plan of node P1-N009 (plugin tooling on the portfolio stack)](../plans/p1-n009-plugin-tooling-portfolio-stack.md),
decision 8).

## How to carry it

1. Re-verify the quotes in *Article 7 at both tags* before carrying, as
   their provenance line says. Re-check that the links in *The covering
   message* resolve.
2. Open an issue, not a pull request, on majodali/methodology-tools.
   The proposal asks the maintainer to settle five design questions and
   carries no code to merge, so an issue is the right channel.
   Suggested title: "A checker extension point for custom types defined
   by citation".
3. Paste *The covering message* first, then the proposal's full text,
   unchanged.
4. Tell the Orchestrator the issue's link. The Orchestrator records it
   in the Backlog row "Deliver the extension-point proposal upstream".

To hold instead, tell the Orchestrator to hold. Nothing else changes.

## The covering message

> This issue carries a proposal drafted on 2026-08-26 by
> majodali/project-orchestrator. Its text is unchanged since then. The
> changes below happened after it was drafted and touch its worked
> example or its citations. Each has a pointer.
>
> 1. The checker is now TypeScript. It was ported on 2026-08-30
>    ([e491429](https://github.com/majodali/project-orchestrator/commit/e49142993e5239280b0955ae98edddbe2a8ca15c)),
>    and the Python was retired in the cutover the same day
>    ([73b20b4](https://github.com/majodali/project-orchestrator/commit/73b20b44fca398727188513f71bd79c70c92720c)).
>    The sketch's entry point `python3 plugin/scripts/form_check.py --emit=json`
>    now reads `node plugin/scripts/form_check.ts [project-root]`
>    ([the file](https://github.com/majodali/project-orchestrator/blob/73b20b44fca398727188513f71bd79c70c92720c/plugin/scripts/form_check.ts)).
>    No `--emit=json` mode is built. The file's header says where one
>    would attach. The proposal's evidence link is pinned to commit
>    `e89905a` and still shows the Python checker as it was.
> 2. The checker preflights its runtime. It needs Node 22.18.0 or
>    later (23.6.0 or later on the 23.x line), and exits non-zero,
>    naming what it required and found, when that is missing
>    ([760c635](https://github.com/majodali/project-orchestrator/commit/760c6357ed1c0737395dc137bb12bc0dfcfc7ba2),
>    [the preflight](https://github.com/majodali/project-orchestrator/blob/760c6357ed1c0737395dc137bb12bc0dfcfc7ba2/plugin/scripts/lib/node-preflight.ts)).
>    This bears on the proposal's *Unavailability*
>    question: the checker reports its own unavailability loudly.
> 3. The checker checks itself first. Since 2026-08-30 it runs
>    against a committed conformance corpus
>    ([f3f0ef6](https://github.com/majodali/project-orchestrator/commit/f3f0ef649cfdda5168a3d62fba238868de32a30a))
>    before it reads a project. A self-check failure is reported as a
>    checker problem, not a project problem
>    ([the file's header](https://github.com/majodali/project-orchestrator/blob/73b20b44fca398727188513f71bd79c70c92720c/plugin/scripts/form_check.ts)).
> 4. The checker gained rules. A Ruling register cross-check was
>    added on 2026-08-26, after the proposal was drafted
>    ([a10040d](https://github.com/majodali/project-orchestrator/commit/a10040d72b0a4ccd9e00ca0ae6fcdd8f32cef112)).
>    The set of journal event kinds the checker admits widened on
>    2026-10-30
>    ([38138c9](https://github.com/majodali/project-orchestrator/commit/38138c9b952ad995fc2e16725768564ae79a6571);
>    [6401311](https://github.com/majodali/project-orchestrator/commit/6401311358c550cdadd854e2e23a603bc0dc40e6))
>    and on 2026-11-05 (`ba2ef2c`, not yet on `main`). The checker now
>    emits eleven rule names. The proposal's list of invariants omits
>    the Ruling register cross-check.
> 5. The project declares five custom definitions. The proposal's
>    evidence names two custom types. At drafting the project's
>    Classification declared four (Plan register, Cost log, Run journal,
>    Ruling register), and the checker covered those four after
>    `a10040d`. A fifth, the Project model, was added on 2026-10-30
>    ([38138c9](https://github.com/majodali/project-orchestrator/commit/38138c9b952ad995fc2e16725768564ae79a6571)).
>    Its checker rules are written as text and not yet run.
> 6. The review step the evidence calls open is closed. The
>    evidence says the work that shipped the checker was still open
>    pending one review step. That step closed on 2026-08-26, when the
>    owner approved the proposal at the gate of node P1-N008 (mtool
>    checker extension-point proposal).
> 7. The project's methodology pin moved from 1.3.0 to 1.6.0. It
>    moved to 1.4.0 on 2026-08-30
>    ([4cf0830](https://github.com/majodali/project-orchestrator/commit/4cf083005b84a977e1b8cba6753da90ad596e3bf)),
>    to 1.5.0 on 2026-09-07
>    ([c8ffe57](https://github.com/majodali/project-orchestrator/commit/c8ffe5724d22606aaf5a5157fa1614ddcb1492e1)) and
>    to 1.6.0 on 2026-10-28
>    ([45e30bd](https://github.com/majodali/project-orchestrator/commit/45e30bdc296d6ba4fecebdcd9e3b6f4ce4341f0c)). The
>    proposal links Article 7 of the constitution at `v1.3.0`. Article 7
>    reads the same at `v1.6.0`, word for word
>    ([v1.6.0](https://github.com/majodali/methodology/blob/v1.6.0/docs/constitution.md#article-7--the-c0-baseline-custom-definitions-and-the-sandbox)).
>
> None of these changes alters the capability proposed or the five
> design questions. This project did not read majodali/methodology-tools
> in preparing this message. The proposal's claims about `mtool`'s
> current behavior are as stated in its own *Evidence* section.

## Article 7 at both tags

Provenance: quoted from majodali/methodology `docs/constitution.md`,
section *Article 7 — The C0 baseline, custom definitions, and the
sandbox*, at tag `v1.3.0` (commit
`d5d32915b987419c93f07ffcebe0f9df904c868f`, 2026-08-25) and at tag
`v1.6.0` (commit `3e3482921e7e23bb4ad690b40394bf00b7feb37f`,
2026-10-28), both taken on 2026-11-07. Re-verify both against the tags
before carrying ([RU-015](../rulings.md), the upstream delivery form).

The two texts do not differ. A `diff` of the two sections is empty.

### At `v1.3.0`, the text the proposal links

```markdown
## Article 7 — The C0 baseline, custom definitions, and the sandbox

**C0 baseline.** A project without a Classification is C0 with the default
fields of Article 4 stage 1; a project MAY declare a minimal
Classification (see the Classification definition's mandatory/optional
fields) to override any default. Rules tagged `[C0+]` form the
exploration baseline, currently: a README stating the question being
explored ([W-007](rules/working-agreement.md#w-007--every-project-has-a-readme-that-says-what-it-is));
the test-modification rules where tests exist
([W-002](rules/working-agreement.md#w-002--existing-tests-are-signals-not-obstacles)); and the
secret-hygiene rules
([S-001/S-002](rules/security.md) — public
exploration repos need them most). All other rules default to
`[C1+]` (Article 5) and are therefore not in play at C0.

**Custom definitions.** The vocabulary is extensible per project:

- A project MAY define custom document, content, or artifact types. Each
  custom definition MUST live in the **Custom definitions section of the
  project's Classification** (the current standard home; relocating it
  would be an amendment), and every instance of the custom type MUST link
  its definition. A custom definition MAY be made **by citation**: the
  Custom definitions section records a reference to another project's
  published definition — typically a family lead's or a process
  project's specification — which remains authoritative for the type's
  content; convergent citations across projects remain standardization
  candidates like any other convergent definitions.
- Custom definitions are audited like standard ones. Audits SHOULD flag
  convergent custom definitions across projects as standardization
  candidates (promotion by amendment).

**Sandbox.** A project MAY hold material under a sandbox location or an
`in-progress` / `not-compliant` designation for temporary use. Sandbox
material is exempt from **content rules** but not **existence rules**
(vocabulary-defined): it MUST carry the designation visibly, and audits
treat sandbox **age** as a finding. Temporary is a state, not a home.
Sandbox designation is the Constitution's only per-material divergence
mechanism; it is bounded, visible, and aged, and it is out of scope for
Article 8's two project-level forms.
```

### At `v1.6.0`, the project's pin

```markdown
## Article 7 — The C0 baseline, custom definitions, and the sandbox

**C0 baseline.** A project without a Classification is C0 with the default
fields of Article 4 stage 1; a project MAY declare a minimal
Classification (see the Classification definition's mandatory/optional
fields) to override any default. Rules tagged `[C0+]` form the
exploration baseline, currently: a README stating the question being
explored ([W-007](rules/working-agreement.md#w-007--every-project-has-a-readme-that-says-what-it-is));
the test-modification rules where tests exist
([W-002](rules/working-agreement.md#w-002--existing-tests-are-signals-not-obstacles)); and the
secret-hygiene rules
([S-001/S-002](rules/security.md) — public
exploration repos need them most). All other rules default to
`[C1+]` (Article 5) and are therefore not in play at C0.

**Custom definitions.** The vocabulary is extensible per project:

- A project MAY define custom document, content, or artifact types. Each
  custom definition MUST live in the **Custom definitions section of the
  project's Classification** (the current standard home; relocating it
  would be an amendment), and every instance of the custom type MUST link
  its definition. A custom definition MAY be made **by citation**: the
  Custom definitions section records a reference to another project's
  published definition — typically a family lead's or a process
  project's specification — which remains authoritative for the type's
  content; convergent citations across projects remain standardization
  candidates like any other convergent definitions.
- Custom definitions are audited like standard ones. Audits SHOULD flag
  convergent custom definitions across projects as standardization
  candidates (promotion by amendment).

**Sandbox.** A project MAY hold material under a sandbox location or an
`in-progress` / `not-compliant` designation for temporary use. Sandbox
material is exempt from **content rules** but not **existence rules**
(vocabulary-defined): it MUST carry the designation visibly, and audits
treat sandbox **age** as a finding. Temporary is a state, not a home.
Sandbox designation is the Constitution's only per-material divergence
mechanism; it is bounded, visible, and aged, and it is out of scope for
Article 8's two project-level forms.
```

## What this note does not decide

The node completes at the artifact ([RU-003](../rulings.md), a node
targeting an external party completes at the artifact). Whether the
maintainer accepts, amends or rejects the proposal is not this node's
to know. Its disposition is recorded in the Backlog once reported back.
