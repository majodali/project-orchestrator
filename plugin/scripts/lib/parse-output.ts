/**
 * Parses `form_check.py`'s stdout into structured findings (P1-N009
 * child B, node P1-N011, spec B2's fingerprint shape). Pure text
 * parsing, no I/O: used both by `run_corpus.ts`'s `--capture` mode
 * (writing expectations/*.json from a live run) and its default
 * comparison mode (reading expectations/*.json and checking a fresh
 * run against them) — the same parser both times, so a transcription
 * bug cannot silently diverge from what was actually captured.
 *
 * `form_check.py`'s print format (its own source, `main()`):
 *   f"{sev.upper():9s} {rule:18s} {path}: {msg}"
 * followed by one summary line:
 *   f"form_check: {N} nodes, {V} violation(s), {W} warning(s)."
 * or, in the not-enrolled case, one informational line and no
 * findings at all.
 */

export interface ParsedFinding {
  severity: "violation" | "warning";
  rule: string;
  /** The path exactly as form_check.py printed it (verbatim). */
  rawPath: string;
  message: string;
}

export interface ParsedRun {
  findings: ParsedFinding[];
  /** Present when the summary line matched; absent for the
   * not-enrolled informational line, which carries no counts. */
  summary: { nodes: number; violations: number; warnings: number } | null;
  /** The full stdout, verbatim, for anything a comparison needs that
   * the structured fields do not carry. */
  stdout: string;
}

const FINDING_LINE = /^(\S+)\s+(\S+)\s+(.*)$/;
const SUMMARY_LINE =
  /^form_check: (\d+) nodes, (\d+) violation\(s\), (\d+) warning\(s\)\.$/;

/**
 * Parses one run's stdout. Lines that are neither a finding line nor
 * the summary line (e.g. the not-enrolled informational message) are
 * kept in `stdout` but produce no structured entry — never silently
 * mis-parsed as a finding.
 */
export function parseFormCheckOutput(stdout: string): ParsedRun {
  const findings: ParsedFinding[] = [];
  let summary: ParsedRun["summary"] = null;

  for (const line of stdout.split("\n")) {
    if (line.trim() === "") continue;

    const summaryMatch = SUMMARY_LINE.exec(line);
    if (summaryMatch) {
      summary = {
        nodes: Number(summaryMatch[1]),
        violations: Number(summaryMatch[2]),
        warnings: Number(summaryMatch[3]),
      };
      continue;
    }

    const findingMatch = FINDING_LINE.exec(line);
    if (findingMatch) {
      const [, sevRaw, rule, rest] = findingMatch as unknown as [
        string,
        string,
        string,
        string,
      ];
      const sev = sevRaw.toLowerCase();
      if (sev !== "violation" && sev !== "warning") {
        // Not a finding line after all (e.g. the not-enrolled
        // message happens to start with a non-whitespace token) —
        // leave it unparsed rather than guess.
        continue;
      }
      const sepIdx = rest.indexOf(": ");
      const rawPath = sepIdx === -1 ? rest : rest.slice(0, sepIdx);
      const message = sepIdx === -1 ? "" : rest.slice(sepIdx + 2);
      findings.push({ severity: sev, rule, rawPath, message });
    }
  }

  return { findings, summary, stdout };
}

/**
 * A finding's fingerprint (spec B2): severity, rule, and path relative
 * to the fixture root. `fixtureRoot` and `rawPath` are both POSIX-ish
 * strings as passed to / printed by form_check.py; this does simple
 * prefix stripping rather than filesystem resolution, since both are
 * always relative paths built the same way (root joined with a
 * fixed docs/ or orchestration/ suffix) in this corpus.
 */
export function relativizePath(fixtureRoot: string, rawPath: string): string {
  const normalizedRoot = fixtureRoot.endsWith("/")
    ? fixtureRoot
    : `${fixtureRoot}/`;
  return rawPath.startsWith(normalizedRoot)
    ? rawPath.slice(normalizedRoot.length)
    : rawPath;
}
