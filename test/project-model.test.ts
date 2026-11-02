import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

import {
  EDGE_LABELS,
  FACET_LABELS,
  REQUIRED_LABELS,
  entryBySlug,
  facetLine,
  isSlug,
  parseProjectModel,
} from "../plugin/scripts/lib/project-model.ts";
import type {
  ModelEntry,
  ModelParseResult,
} from "../plugin/scripts/lib/project-model.ts";

/**
 * The parser of the Project model instance, the shared unit the web
 * view reads (node P2-N021, the web view's first version, task E3; the
 * specification of P2-N003, criterion V24, the parser). Each test names
 * the production of the type's entry grammar it covers
 * (docs/process/project-model.md, "The entry grammar", "Lines, items
 * and sources" and "What each line's items hold"). Expected values were
 * written by hand from the type specification, not computed by the
 * code under test.
 */

const HERE = path.dirname(fileURLToPath(import.meta.url));
const LIB = path.join(HERE, "..", "plugin", "scripts", "lib");

/** The instance at commit 2da1843, the head of `main` when task E3
 * started, byte for byte (`git show 2da1843:docs/project-model.md`). */
const INSTANCE_2DA1843 = readFileSync(
  path.join(HERE, "fixtures", "project-model.2da1843.txt"),
  "utf-8",
);

const SRC = "(from [Plan register](plan-register.md))";

/** One well-formed entry, every required line, with `extra` lines
 * appended. */
function entry(heading: string, extra: string[] = []): string {
  return [
    `## ${heading}`,
    "",
    `- **is:** A part ${SRC}`,
    `- **state:** built ${SRC}`,
    `- **spec:** none (no specification; from [Classification](classification.md))`,
    `- **risks:** none (no entry; from [Risk register](open-risks.md))`,
    `- **created-by:** P1-N001 (A node; from [Backlog](backlog.md))`,
    `- **modified-by:** none (nothing; from [Backlog](backlog.md))`,
    `- **used-by:** none (nothing; from [Backlog](backlog.md))`,
    ...extra,
    "",
  ].join("\n");
}

function only(text: string): { result: ModelParseResult; entry: ModelEntry } {
  const result = parseProjectModel(text);
  expect(result.entries).toHaveLength(1);
  return { result, entry: result.entries[0]! };
}

function line(e: ModelEntry, label: (typeof FACET_LABELS)[number]) {
  const found = facetLine(e, label);
  expect(found, label).toBeDefined();
  return found!;
}

describe("the instance: a preamble, then entries", () => {
  it("takes a level-two heading as an entry only once its first non-blank line opens `- **is:**`; after that, every level-two heading starts one", () => {
    const text = [
      "# Project model",
      "",
      "## What this document does not claim",
      "",
      "- No final grammar.",
      "",
      entry("first-part"),
      "## second-part",
      "",
      "prose where the facet list should be",
    ].join("\n");
    const result = parseProjectModel(text);
    expect(result.entries.map((e) => e.slug)).toEqual([
      "first-part",
      "second-part",
    ]);
    expect(result.entries.map((e) => e.line)).toEqual([7, 17]);
    // The second entry has no facet list; each departure is reported by
    // line.
    expect(
      result.errors.map((e) => [e.line, e.slug, e.label, e.reason]),
    ).toEqual([
      ...REQUIRED_LABELS.map((label) => [
        17,
        "second-part",
        label,
        `the entry has no ${label} line`,
      ]),
      [
        19,
        "second-part",
        null,
        "a line in the facet list that is neither a labelled line nor a continuation line",
      ],
    ]);
  });

  it("returns an empty result for a file with no entry", () => {
    expect(parseProjectModel("# Project model\n\nNo entries.\n")).toEqual({
      entries: [],
      errors: [],
    });
  });
});

describe("heading = '## ', slug, [' (', name, ')']", () => {
  it("word-slug, with no name", () => {
    const { result, entry: e } = only(entry("form-checker"));
    expect(e.slug).toBe("form-checker");
    expect(e.name).toBeNull();
    expect(e.heading).toBe("form-checker");
    expect(result.errors).toEqual([]);
  });

  it("ruling-slug, with a name", () => {
    const { result, entry: e } = only(entry("RU-016 (repository reach)"));
    expect(e.slug).toBe("RU-016");
    expect(e.name).toBe("repository reach");
    expect(result.errors).toEqual([]);
  });

  it("the slug productions: lowercase words and digits joined by hyphens, or RU- and three or more digits", () => {
    for (const ok of [
      "a",
      "plan-register",
      "p1-n009-specification",
      "k-003-amendment",
      "RU-021",
      "RU-1234",
    ]) {
      expect(isSlug(ok), ok).toBe(true);
    }
    for (const bad of [
      "Plan-register",
      "-a",
      "a-",
      "a--b",
      "1a",
      "RU-01",
      "Ru-016",
      "a_b",
    ]) {
      expect(isSlug(bad), bad).toBe(false);
    }
  });

  it("reports a heading whose slug fails the grammar, by line, and still returns the entry", () => {
    const { result, entry: e } = only(entry("Form_Checker"));
    expect(e.slug).toBe("Form_Checker");
    expect(result.errors).toEqual([
      {
        line: 1,
        slug: "Form_Checker",
        label: null,
        reason:
          'the heading "## Form_Checker" is not "## " and a slug, then optionally " (" and a name and ")"',
        raw: "## Form_Checker",
      },
    ]);
  });

  it("reports a second entry with the same slug", () => {
    const result = parseProjectModel(entry("a-part") + entry("a-part"));
    expect(result.entries).toHaveLength(2);
    expect(result.errors.map((e) => [e.line, e.reason])).toEqual([
      [10, "duplicate slug a-part; first seen at line 1"],
    ]);
  });
});

describe("facet-list: the seven required lines in order, then formerly and alias", () => {
  it("reads every line, in order, after any blank lines that follow the heading", () => {
    const { result, entry: e } = only(
      entry("a-part", [
        "- **formerly:** `old.py`, the earlier form (from [Backlog](backlog.md))",
        "- **alias:** `old-part` (2026-10-30; from [Backlog](backlog.md))",
      ]).replace("## a-part\n", "## a-part\n\n\n"),
    );
    expect(result.errors).toEqual([]);
    expect(e.lines.map((l) => l.label)).toEqual([...FACET_LABELS]);
    expect(e.lines.map((l) => l.line)).toEqual([5, 6, 7, 8, 9, 10, 11, 12, 13]);
  });

  it("reports a missing required line at the heading, naming the line", () => {
    const text = entry("a-part").replace(/- \*\*risks:\*\*.*\n/, "");
    const { result } = only(text);
    expect(result.errors).toEqual([
      {
        line: 1,
        slug: "a-part",
        label: "risks",
        reason: "the entry has no risks line",
        raw: "## a-part",
      },
    ]);
  });

  it("reports a line out of order, and a second line with one label", () => {
    const swapped = entry("a-part").replace(
      /(- \*\*spec:\*\*.*\n)(- \*\*risks:\*\*.*\n)/,
      "$2$1",
    );
    expect(
      only(swapped).result.errors.map((e) => [e.line, e.label, e.reason]),
    ).toEqual([
      [
        6,
        "spec",
        "the spec line is out of order; the lines run is, state, spec, risks, created-by, modified-by, used-by, formerly, alias",
      ],
    ]);
    const twice = entry("a-part", [
      `- **used-by:** none (nothing; from [Backlog](backlog.md))`,
    ]);
    expect(
      only(twice).result.errors.map((e) => [e.line, e.label, e.reason]),
    ).toEqual([[10, "used-by", "a second used-by line"]]);
  });

  it("reports an unknown label, a labelled line with no value, and text after the list's end", () => {
    const text = entry("a-part", [
      "- **owner:** someone (from [Backlog](backlog.md))",
      "- **alias:**",
    ]).replace(/\n$/, "\n\nstray prose\n");
    const { result } = only(text);
    expect(result.errors.map((e) => [e.line, e.label, e.reason])).toEqual([
      [
        10,
        null,
        'unknown line label "owner:"; an entry\'s lines are is, state, spec, risks, created-by, modified-by, used-by, formerly, alias',
      ],
      [11, "alias", "the alias line holds no value"],
      [
        13,
        null,
        "text after the facet list's end; an entry is a heading and one unbroken list of labelled lines",
      ],
    ]);
  });
});

describe("value = text, newline, { '  ', text, newline }", () => {
  it("joins each continuation line to the first by one space", () => {
    const text = entry("a-part").replace(
      `- **is:** A part ${SRC}`,
      "- **is:** A part that spans\n  three physical lines (from [Plan\n  register](plan-register.md))",
    );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    const is = line(e, "is");
    expect(is.value).toBe(
      "A part that spans three physical lines (from [Plan register](plan-register.md))",
    );
    expect([is.line, is.endLine]).toEqual([3, 5]);
    expect(is.items[0]!.body).toBe("A part that spans three physical lines");
  });
});

describe("lines, items and sources", () => {
  it("splits a value into items at each ` · ` outside every parenthesis, and gives each item the line it starts on", () => {
    const text = entry("a-part").replace(
      /- \*\*created-by:\*\*.*\n/,
      "- **created-by:** P1-N001 (A node; the · inside stays; from\n  [Backlog](backlog.md)) · P1-N002 (Another; from [Backlog](backlog.md)) ·\n  P1-N003 (A third; from [Backlog](backlog.md))\n",
    );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    const items = line(e, "created-by").items;
    expect(items.map((i) => [i.body, i.line])).toEqual([
      ["P1-N001", 7],
      ["P1-N002", 8],
      ["P1-N003", 9],
    ]);
    expect(items[0]!.notes).toEqual(["A node", "the · inside stays"]);
  });

  it("takes the last parenthesized group, preceded by a space, as the closing parenthetical; a link target after `]` is not one", () => {
    const text = entry("a-part").replace(
      /- \*\*spec:\*\*.*\n/,
      "- **spec:** [Plan register type](process/plan-register.md) (process specification, the grammar (and its notes); from [Classification](classification.md), the Plan register definition; [Plan model](process/plan-model.md))\n",
    );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    const [item] = line(e, "spec").items;
    expect(item!.body).toBe("[Plan register type](process/plan-register.md)");
    expect(item!.form).toEqual({
      kind: "link",
      text: "Plan register type",
      target: "process/plan-register.md",
    });
    // Notes before the first part opening `from `; that part, less
    // `from `, and every later part are sources.
    expect(item!.notes).toEqual([
      "process specification, the grammar (and its notes)",
    ]);
    expect(item!.sources).toEqual([
      {
        text: "[Classification](classification.md), the Plan register definition",
        link: { text: "Classification", target: "classification.md" },
        part: "the Plan register definition",
      },
      {
        text: "[Plan model](process/plan-model.md)",
        link: { text: "Plan model", target: "process/plan-model.md" },
        part: null,
      },
    ]);
  });

  it("reports an item with no closing parenthetical, one that names no source, and a source that is not a Markdown link, by line", () => {
    const text = entry("a-part")
      .replace(
        `- **is:** A part ${SRC}`,
        "- **is:** A part with no parenthetical",
      )
      .replace(`- **state:** built ${SRC}`, "- **state:** built (a note only)")
      .replace(
        /- \*\*created-by:\*\*.*\n/,
        "- **created-by:** P1-N001 (A node; from the Backlog)\n",
      );
    const { result } = only(text);
    expect(result.errors.map((e) => [e.line, e.label, e.reason])).toEqual([
      [
        3,
        "is",
        'the is line\'s item "A part with no parenthetical" does not end with a closing parenthetical',
      ],
      [4, "state", 'the state line\'s item "built" names no source'],
      [
        7,
        "created-by",
        'the created-by line\'s item "P1-N001" has a source that is not a Markdown link: "the Backlog"',
      ],
    ]);
  });
});

describe("what each line's items hold", () => {
  it("is: exactly one item of free text", () => {
    const { result, entry: e } = only(entry("a-part"));
    expect(result.errors).toEqual([]);
    expect(line(e, "is").items.map((i) => i.form)).toEqual([{ kind: "text" }]);
    const two = entry("a-part").replace(
      `- **is:** A part ${SRC}`,
      `- **is:** A part ${SRC} · Another ${SRC}`,
    );
    expect(only(two).result.errors.map((e) => [e.line, e.reason])).toEqual([
      [3, "the is line holds 2 items; it holds exactly one"],
    ]);
  });

  it("state: the derived value, then optionally standing, then optionally own status", () => {
    for (const value of ["planned", "building", "built", "built, changing"]) {
      const { result, entry: e } = only(
        entry("a-part").replace(
          `- **state:** built ${SRC}`,
          `- **state:** ${value} ${SRC}`,
        ),
      );
      expect(result.errors, value).toEqual([]);
      expect(line(e, "state").items[0]!.form).toEqual({
        kind: "derived-value",
        value,
      });
    }
    const full = only(
      entry("RU-016 (repository reach)").replace(
        `- **state:** built ${SRC}`,
        `- **state:** built ${SRC} · standing (a repository; from [Project model type](process/project-model.md), Standing resources) · own status active (from [Ruling register](rulings.md))`,
      ),
    );
    expect(full.result.errors).toEqual([]);
    expect(line(full.entry, "state").items.map((i) => i.form)).toEqual([
      { kind: "derived-value", value: "built" },
      { kind: "standing" },
      { kind: "own-status", status: "active" },
    ]);
    const reversed = entry("a-part").replace(
      `- **state:** built ${SRC}`,
      `- **state:** standing ${SRC} · built ${SRC}`,
    );
    expect(only(reversed).result.errors.map((e) => e.reason)).toEqual([
      "the state line's items are not, in order, the derived value, optionally `standing`, and optionally `own status <status>`",
    ]);
    const empty = entry("a-part").replace(
      `- **state:** built ${SRC}`,
      "- **state:** none (no value; from [Backlog](backlog.md))",
    );
    expect(only(empty).result.errors.map((e) => [e.line, e.reason])).toEqual([
      [
        4,
        "the state line may not read `none`; its first item is the derived value",
      ],
    ]);
    const unknown = entry("a-part").replace(
      `- **state:** built ${SRC}`,
      `- **state:** finished ${SRC}`,
    );
    expect(only(unknown).result.errors.map((e) => [e.line, e.reason])).toEqual([
      [
        4,
        'the state line\'s item body "finished" is not one this line holds (the derived value, then optionally `standing`, then optionally `own status <status>`)',
      ],
    ]);
  });

  it("spec: a link to a specification document, or none; risks: a link with the risk's identifier as its text, or none", () => {
    const text = entry("a-part")
      .replace(
        /- \*\*spec:\*\*.*\n/,
        "- **spec:** [Observability](process/observability.md) (process specification; from [Classification](classification.md)) · [Auditing](process/auditing.md) (process specification; from [README](../README.md))\n",
      )
      .replace(
        /- \*\*risks:\*\*.*\n/,
        "- **risks:** [R18](open-risks.md) (the view cookie; from [Risk register](open-risks.md))\n",
      );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    expect(line(e, "spec").items.map((i) => i.form)).toEqual([
      {
        kind: "link",
        text: "Observability",
        target: "process/observability.md",
      },
      { kind: "link", text: "Auditing", target: "process/auditing.md" },
    ]);
    expect(line(e, "risks").items[0]!.form).toEqual({
      kind: "risk",
      id: "R18",
      target: "open-risks.md",
    });
    const proseRisk = entry("a-part").replace(
      /- \*\*risks:\*\*.*\n/,
      "- **risks:** [the view cookie](open-risks.md) (from [Risk register](open-risks.md))\n",
    );
    expect(only(proseRisk).result.errors.map((e) => e.label)).toEqual([
      "risks",
    ]);
  });

  it("created-by: node items, gate items and outside items, or none; with date notes on node and gate items", () => {
    const text = entry("a-part").replace(
      /- \*\*created-by:\*\*.*\n/,
      "- **created-by:** P2-N012 gate (Deploy the service from CI on merge; done 2026-09-01; from [Ruling register](rulings.md), the Source field of RU-016) · P1-N010 (Node toolchain; done 2026-08-30; from [Cost log](cost-log.md), the row of T020) · outside: the repository majodali/methodology (a source; from [Backlog](backlog.md))\n",
    );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    const items = line(e, "created-by").items;
    expect(items.map((i) => [i.form, i.dateNote])).toEqual([
      [{ kind: "gate", node: "P2-N012" }, "2026-09-01"],
      [{ kind: "node", node: "P1-N010", after: [] }, "2026-08-30"],
      [{ kind: "outside", party: "the repository majodali/methodology" }, null],
    ]);
    // A partial item and an after qualifier are not created-by forms.
    const wrong = entry("a-part").replace(
      /- \*\*created-by:\*\*.*\n/,
      "- **created-by:** P1-N001 after P1-N002 (A node; from [Backlog](backlog.md)) · partial: unknown (from [Backlog](backlog.md))\n",
    );
    expect(only(wrong).result.errors.map((e) => e.label)).toEqual([
      "created-by",
      "created-by",
    ]);
  });

  it("modified-by: node items and outside items, then optionally a partial item, its last; or none", () => {
    const text = entry("a-part").replace(
      /- \*\*modified-by:\*\*.*\n/,
      "- **modified-by:** P1-N013 (The cutover; from [Backlog](backlog.md)) · outside: the service repository (a consumer; from [Backlog](backlog.md)) · partial: no record before RU-016 names the writer (from [Ruling register](rulings.md))\n",
    );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    expect(line(e, "modified-by").items.map((i) => i.form)).toEqual([
      { kind: "node", node: "P1-N013", after: [] },
      { kind: "outside", party: "the service repository" },
      { kind: "partial", reason: "no record before RU-016 names the writer" },
    ]);
    const early = entry("a-part").replace(
      /- \*\*modified-by:\*\*.*\n/,
      "- **modified-by:** partial: first (from [Backlog](backlog.md)) · P1-N013 (The cutover; from [Backlog](backlog.md))\n",
    );
    expect(only(early).result.errors.map((e) => [e.line, e.reason])).toEqual([
      [8, "the modified-by line's partial item is not its last item"],
    ]);
    const gate = entry("a-part").replace(
      /- \*\*modified-by:\*\*.*\n/,
      "- **modified-by:** P1-N013 gate (The cutover; from [Backlog](backlog.md))\n",
    );
    expect(only(gate).result.errors.map((e) => e.label)).toEqual([
      "modified-by",
    ]);
  });

  it("used-by: node items, with or without an after qualifier naming one or more nodes, outside items, then optionally a partial item", () => {
    const text = entry("a-part").replace(
      /- \*\*used-by:\*\*.*\n/,
      "- **used-by:** P3-N009 after P3-N008 (Sibling ordering retired; from [Backlog](backlog.md)) · P2-N018 after P3-N014, P3-N008 (The loop; from [Backlog](backlog.md)) · P2-N021 (The web view; from [Backlog](backlog.md)) · outside: majodali/project-orchestrator-service (a vendored copy; from [Backlog](backlog.md)) · partial: older uses unrecorded (from [Backlog](backlog.md))\n",
    );
    const { result, entry: e } = only(text);
    expect(result.errors).toEqual([]);
    expect(line(e, "used-by").items.map((i) => i.form)).toEqual([
      { kind: "node", node: "P3-N009", after: ["P3-N008"] },
      { kind: "node", node: "P2-N018", after: ["P3-N014", "P3-N008"] },
      { kind: "node", node: "P2-N021", after: [] },
      { kind: "outside", party: "majodali/project-orchestrator-service" },
      { kind: "partial", reason: "older uses unrecorded" },
    ]);
  });

  it("formerly: free text; alias: an earlier slug in backticks", () => {
    const { result, entry: e } = only(
      entry("task-tools", [
        "- **formerly:** the Python form (from [Backlog](backlog.md)) · `parser.ts` (from [Backlog](backlog.md))",
        "- **alias:** `task-pull-loop` (2026-10-30; from [specification of P2-N003](specs/p2-n003-owner-questions-and-plan-view.md), Edges stated at this breakdown)",
      ]),
    );
    expect(result.errors).toEqual([]);
    expect(line(e, "formerly").items.map((i) => i.form)).toEqual([
      { kind: "text" },
      { kind: "text" },
    ]);
    expect(line(e, "alias").items[0]!.form).toEqual({
      kind: "alias",
      slug: "task-pull-loop",
    });
    expect(line(e, "alias").items[0]!.notes).toEqual(["2026-10-30"]);
    const bad = entry("task-tools", [
      "- **alias:** `Task_Pull` (from [Backlog](backlog.md))",
    ]);
    expect(only(bad).result.errors.map((e) => e.label)).toEqual(["alias"]);
  });

  it("none and not yet derived: each the line's only item, and not yet derived never on state", () => {
    const text = entry("a-part")
      .replace(
        /- \*\*spec:\*\*.*\n/,
        "- **spec:** not yet derived (from [plan of P3-N006](plans/p3-n006-thin-end-to-end-slice.md), Dependencies)\n",
      )
      .replace(
        /- \*\*used-by:\*\*.*\n/,
        "- **used-by:** none (nothing; from [Backlog](backlog.md)) · P1-N001 (A node; from [Backlog](backlog.md))\n",
      )
      .replace(
        `- **state:** built ${SRC}`,
        "- **state:** not yet derived (from [Backlog](backlog.md))",
      );
    const { result, entry: e } = only(text);
    expect(line(e, "spec").items[0]!.form).toEqual({ kind: "not-yet-derived" });
    expect(result.errors.map((e) => [e.line, e.label, e.reason])).toEqual([
      [4, "state", "the state line may not read `not yet derived`"],
      [
        9,
        "used-by",
        "the used-by line holds `none` beside other items; it must be the line's only item",
      ],
    ]);
  });

  it("the three edge lines and the required lines, as data", () => {
    expect([...EDGE_LABELS]).toEqual(["created-by", "modified-by", "used-by"]);
    expect([...REQUIRED_LABELS]).toEqual([
      "is",
      "state",
      "spec",
      "risks",
      "created-by",
      "modified-by",
      "used-by",
    ]);
  });
});

describe("slugs are stable: a slug or an alias resolves to its entry", () => {
  it("finds an entry by its heading's slug or by an alias", () => {
    const result = parseProjectModel(
      entry("plan-register") +
        entry("task-tools", [
          "- **alias:** `task-pull-loop` (2026-10-30; from [Backlog](backlog.md))",
        ]),
    );
    expect(entryBySlug(result, "plan-register")?.slug).toBe("plan-register");
    expect(entryBySlug(result, "task-pull-loop")?.slug).toBe("task-tools");
    expect(entryBySlug(result, "nothing-here")).toBeUndefined();
  });
});

describe("V24 — the instance at the SHA where task E3 started, 2da1843", () => {
  const result = parseProjectModel(INSTANCE_2DA1843);

  it("yields every entry: one per level-two heading after the preamble's two", () => {
    const headings = INSTANCE_2DA1843.split("\n").filter((l) =>
      l.startsWith("## "),
    );
    expect(headings).toHaveLength(44);
    expect(headings.slice(0, 2)).toEqual([
      "## What this document does not claim",
      "## How an entry reads",
    ]);
    expect(result.entries.map((e) => `## ${e.heading}`)).toEqual(
      headings.slice(2),
    );
    expect(result.entries).toHaveLength(42);
    expect(result.entries[0]!.slug).toBe("form-checker");
    expect(result.entries.at(-1)!.slug).toBe("cost-log-and-journal-grammar");
    for (const e of result.entries) {
      expect(
        e.lines.slice(0, 7).map((l) => l.label),
        e.slug,
      ).toEqual([...REQUIRED_LABELS]);
    }
  });

  it("reports each departure by line: the four the slice entries carry, which P3-N008 conforms", () => {
    // Read off the file by hand. The outside item and the partial item
    // are two of the differences the type lists under "Where the slice's
    // entries differ from this grammar". The two spec items carry their
    // kind in the body, not as the first note, so their body is not a
    // link alone.
    expect(result.errors.map((e) => [e.line, e.slug, e.label, e.raw])).toEqual([
      [
        203,
        "plan-register-grammar",
        "used-by",
        "  the service-side adoption](backlog.md)) · the repository",
      ],
      [
        228,
        "run-journal",
        "spec",
        "- **spec:** [Observability](process/observability.md) (process",
      ],
      [
        262,
        "RU-016",
        "spec",
        "- **spec:** [Ruling register type](process/rulings.md) (process",
      ],
      [
        334,
        "project-orchestrator-repo",
        "modified-by",
        "  breakdown) · no record before RU-016 (2026-09-01) names the",
      ],
    ]);
  });

  it("reads the edges of a conforming entry as the grammar gives them", () => {
    const model = entryBySlug(result, "project-model")!;
    expect(facetLine(model, "used-by")!.items.map((i) => i.form)).toEqual([
      { kind: "node", node: "P3-N007", after: [] },
      { kind: "node", node: "P3-N009", after: ["P3-N008"] },
      { kind: "node", node: "P2-N021", after: [] },
    ]);
    const tools = entryBySlug(result, "task-pull-loop")!;
    expect(tools.slug).toBe("task-tools");
  });
});

describe("a shared unit: no imports, no I/O", () => {
  it("imports nothing, so the service's NodeNext build consumes the vendored copy unedited", () => {
    const source = readFileSync(path.join(LIB, "project-model.ts"), "utf-8");
    expect(source).not.toMatch(/^\s*import\s/m);
    expect(source).not.toMatch(/\brequire\(/);
  });
});
