// The mechanical pre-pass of node P3-N013 (the four stop conditions,
// decidable, evidenced, and related to the meta-review signals).
//
// It scores the structured fields of the run journal and the Cost log
// for every corpus item: the status token, the check events, the refs
// and the recorded node. It is not a third reading: it decides only
// what a field decides, and leaves every wording match to the readings.
// Both readings are checked against its output (criterion A6).
//
// Run from the repository root:
//   node docs/findings/p3-n005-stop-predicates/prepass.ts [cut-off-commit]
// It reads the journal and the Cost log as committed at the cut-off
// (default d1c3659) and prints Markdown to stdout. The committed
// output beside this file is prepass-output.md.
//
// It never prints the journal's or the Cost log's model field.

import { execFileSync } from "node:child_process";

const CUT_OFF = process.argv[2] ?? "d1c3659";

function show(path: string): string {
  return execFileSync("git", ["show", `${CUT_OFF}:${path}`], {
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
}

function resolvesHere(ref: string): boolean {
  try {
    execFileSync("git", ["cat-file", "-e", `${ref}^{commit}`], {
      stdio: "ignore",
    });
    return true;
  } catch {
    return false;
  }
}

type Event = {
  ts: string;
  event: string;
  task: string | null;
  node: string | null;
  stage: string | null;
  ref: string | null;
  note: string;
  [key: string]: unknown;
};

const events: Event[] = show("orchestration/journal.jsonl")
  .split("\n")
  .filter((line) => line.trim() !== "")
  .map((line) => JSON.parse(line) as Event);

const costRows = new Set(
  [...show("docs/cost-log.md").matchAll(/^\| [0-9-]+ \| (T\d+) \|/gm)].map(
    (m) => m[1],
  ),
);

const byTask = new Map<string, Event[]>();
for (const e of events) {
  if (e.task === null) continue;
  const list = byTask.get(e.task) ?? [];
  list.push(e);
  byTask.set(e.task, list);
}

// The status token (predicate 3, test 1, draft 2): the run of letters,
// digits and hyphens that opens the result-received note, after an
// optional leading word "status".
function statusToken(note: string): string {
  const rest = note.trim().replace(/^status\s+/i, "");
  const m = rest.match(/^[A-Za-z0-9-]*/);
  return m ? m[0] : "";
}

const rows: string[] = [];
const counts = {
  items: 0,
  excluded: 0,
  p1Stop: 0,
  p1Open: 0,
  p2Stop: 0,
  p2Open: 0,
  p3Stop: 0,
  p3StopFailedClosed: 0,
  p3Open: 0,
  p4Stop: 0,
};

for (const [task, list] of [...byTask.entries()].sort()) {
  const kinds = list.map((e) => e.event);
  const hasResult =
    kinds.includes("result-received") || kinds.includes("accepted");
  if (!hasResult) {
    counts.excluded += 1;
    rows.push(`| ${task} | excluded: no result event | | | | | | | | | |`);
    continue;
  }
  counts.items += 1;

  const first =
    list.find((e) => e.event === "dispatched") ??
    list.find((e) => e.event === "accepted")!;

  // Predicate 1, structured part: any check-failed event stops.
  const checkFailed = list.filter((e) => e.event === "check-failed");
  const p1 = checkFailed.length > 0 ? "stop" : "open";
  if (p1 === "stop") counts.p1Stop += 1;
  else counts.p1Open += 1;

  // Predicate 2, structured part: an item with no recorded node lies
  // outside every grant. Everything else needs the readings.
  const p2 = first.node === null ? "stop" : "open";
  if (p2 === "stop") counts.p2Stop += 1;
  else counts.p2Open += 1;

  // Predicate 3, test 1: the status token.
  const received = list.find((e) => e.event === "result-received");
  const token = received ? statusToken(received.note) : "";
  let p3: string;
  if (!received) {
    p3 = "stop (failed closed: no status)";
    counts.p3Stop += 1;
    counts.p3StopFailedClosed += 1;
  } else if (token !== "done") {
    p3 = "stop";
    counts.p3Stop += 1;
  } else {
    p3 = "open";
    counts.p3Open += 1;
  }

  // Predicate 4: no journal event carries an Asks field, so no corpus
  // item has a committed Asks part.
  const asksField = list.some((e) =>
    Object.keys(e).some((k) => /^asks$/i.test(k)),
  );
  const p4 = asksField ? "open" : "stop (failed closed: no Asks part)";
  if (!asksField) counts.p4Stop += 1;

  const refs = [
    ...new Set(
      list
        .map((e) => e.ref)
        .filter((r): r is string => r !== null && !r.startsWith("RU-")),
    ),
  ];
  const refText =
    refs.length === 0
      ? "none"
      : refs
          .map((r) => `\`${r.slice(0, 7)}\`${resolvesHere(r) ? "" : " (not here)"}`)
          .join(", ");
  const needsJudgment = kinds.filter((k) => k === "needs-judgment").length;

  rows.push(
    `| ${task} | ${first.node ?? "none"} ${first.stage ?? ""} | ${received ? `\`${token}\`` : "none"} | ${checkFailed.length} | ${needsJudgment} | ${refText} | ${costRows.has(task) ? "yes" : "no"} | ${p1} | ${p2} | ${p3} | ${p4} |`,
  );
}

const out: string[] = [];
out.push("# Mechanical pre-pass output");
out.push("");
out.push(
  `Produced by \`node docs/findings/p3-n005-stop-predicates/prepass.ts ${CUT_OFF}\`` +
    " over the run journal and the Cost log at the cut-off. It decides only" +
    " what a structured field decides. `open` means the field does not decide" +
    " the predicate and the readings do.",
);
out.push("");
out.push(
  `Items: ${counts.items}. Excluded for want of a result event: ${counts.excluded}.`,
);
out.push("");
out.push(
  `- Predicate 1 (a failed check): stop on a \`check-failed\` event for ${counts.p1Stop}; open for ${counts.p1Open}.`,
);
out.push(
  `- Predicate 2 (a scope change): stop on a missing node for ${counts.p2Stop}; open for ${counts.p2Open}.`,
);
out.push(
  `- Predicate 3 (the owner's decision), test 1 (status): stop for ${counts.p3Stop}, of which ${counts.p3StopFailedClosed} failed closed for want of a \`result-received\` event; open for ${counts.p3Open}.`,
);
out.push(
  `- Predicate 4 (asks): stop, failed closed, for ${counts.p4Stop}: no event carries an Asks part.`,
);
out.push("");
out.push(
  "| Item | Node and stage | Status token | `check-failed` | `needs-judgment` | Refs | Cost log row | P1 | P2 | P3 test 1 | P4 |",
);
out.push("|---|---|---|---|---|---|---|---|---|---|---|");
out.push(...rows);
out.push("");
process.stdout.write(out.join("\n"));
