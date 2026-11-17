import { describe, expect, it } from "vitest";

import {
  findClaim,
  findWindowStart,
  measureTask,
  parseTranscript,
} from "../plugin/scripts/lib/task-cost.ts";

/**
 * The cost hook's measurement (the rebuild plan, "Cost capture"): the
 * tokens from the close of the session's previous task, or from the
 * session's start, to the end of the transcript, each model message
 * counted once.
 */

function assistant(
  id: string,
  usage: Record<string, number>,
  extra: Record<string, unknown> = {},
  content: unknown[] = [{ type: "text", text: "…" }],
) {
  return {
    type: "assistant",
    timestamp: "2026-11-11T10:00:00.000Z",
    message: { id, model: "recorded-model", usage, content },
    ...extra,
  };
}

const usage = (i: number, o: number, r = 0, w = 0) => ({
  input_tokens: i,
  output_tokens: o,
  cache_read_input_tokens: r,
  cache_creation_input_tokens: w,
});

function claim(toolUseId: string, taskId: string, at: string) {
  return [
    assistant("m-open-" + toolUseId, usage(10, 5), { timestamp: at }, [
      {
        type: "tool_use",
        id: toolUseId,
        name: "mcp__project-orchestrator__task_open",
        input: {},
      },
    ]),
    {
      type: "user",
      timestamp: at,
      message: {
        content: [
          {
            type: "tool_result",
            tool_use_id: toolUseId,
            content: `{\n  "committed": true,\n  "taskId": "${taskId}"\n}`,
          },
        ],
      },
    },
  ];
}

/** A `task_close` call for `taskId`, as the model makes it. */
function close(taskId: string, at: string) {
  return assistant("m-close-" + taskId + at, usage(2, 1), { timestamp: at }, [
    {
      type: "tool_use",
      id: "tu-close-" + taskId + at,
      name: "mcp__project-orchestrator__task_close",
      input: { taskId, status: "closed", summary: "Done." },
    },
  ]);
}

describe("measureTask", () => {
  it("sums the usage from the session's start when no task closed before, counting a message once however many lines carry it", () => {
    const lines = [
      // What the session read before it claimed is the task's cost too.
      assistant("m-before", usage(1000, 1000, 1000, 1000)),
      ...claim("tu1", "T200", "2026-11-11T11:00:00.000Z"),
      // One message over three lines: its last line has the final count.
      assistant("m-work", usage(100, 1, 5000, 200)),
      assistant("m-work", usage(100, 40, 5000, 200)),
      assistant("m-work", usage(100, 40, 5000, 200)),
      assistant("m-close", usage(50, 20, 6000, 0), {
        message: {
          id: "m-close",
          model: "another-model",
          usage: usage(50, 20, 6000, 0),
          content: [],
        },
      }),
    ];
    expect(measureTask(lines, "T200")).toEqual({
      tokensIn: 1160,
      tokensOut: 1065,
      cacheRead: 12000,
      cacheWrite: 1200,
      model: "recorded-model",
      messages: 4,
    });
  });

  it("starts at the close of the session's previous task, and ignores a close of the task itself", () => {
    const lines = [
      ...claim("tu0", "T199", "2026-11-11T09:00:00.000Z"),
      assistant("m-earlier", usage(900, 900, 900, 900)),
      close("T199", "2026-11-11T09:30:00.000Z"),
      // Reading before the claim: this task's.
      assistant("m-reading", usage(20, 10, 300, 0)),
      ...claim("tu1", "T200", "2026-11-11T11:00:00.000Z"),
      assistant("m-work", usage(100, 40, 5000, 200)),
      // A close the service refused, then the one that held.
      close("T200", "2026-11-11T11:10:00.000Z"),
      assistant("m-wait", usage(5, 5)),
      close("T200", "2026-11-11T11:12:00.000Z"),
    ];
    expect(findWindowStart(lines, "T200")).toEqual({
      index: 4,
      timestamp: "2026-11-11T09:30:00.000Z",
    });
    expect(measureTask(lines, "T200")).toMatchObject({
      tokensIn: 20 + 10 + 100 + 2 + 5 + 2,
      tokensOut: 10 + 5 + 40 + 1 + 5 + 1,
      cacheRead: 5300,
      messages: 6,
    });
  });

  it("counts a session's tokens once when one task is opened inside another", () => {
    const lines = [
      ...claim("tu1", "T200", "2026-11-11T11:00:00.000Z"),
      assistant("m-outer-1", usage(100, 100)),
      ...claim("tu2", "T201", "2026-11-11T11:05:00.000Z"),
      assistant("m-inner", usage(7, 7)),
      close("T201", "2026-11-11T11:06:00.000Z"),
      assistant("m-outer-2", usage(30, 30)),
      close("T200", "2026-11-11T11:10:00.000Z"),
    ];
    // The inner task takes what came before its close.
    const inner = measureTask(lines.slice(0, 7), "T201")!;
    const outer = measureTask(lines, "T200")!;
    expect(inner.tokensIn).toBe(10 + 100 + 10 + 7 + 2);
    expect(outer.tokensIn).toBe(30 + 2);
    const all = [10, 100, 10, 7, 2, 30, 2].reduce((a, b) => a + b, 0);
    expect(inner.tokensIn + outer.tokensIn).toBe(all);
  });

  it("adds subagent transcripts from the previous close's time on", () => {
    const main = [
      close("T199", "2026-11-11T10:59:30.000Z"),
      ...claim("tu1", "T200", "2026-11-11T11:00:00.000Z"),
    ];
    const subagent = [
      assistant("s-early", usage(999, 999), {
        timestamp: "2026-11-11T10:59:00.000Z",
      }),
      assistant("s-late", usage(7, 3, 100, 10), {
        timestamp: "2026-11-11T11:05:00.000Z",
      }),
    ];
    expect(measureTask(main, "T200", [subagent])).toMatchObject({
      tokensIn: 17,
      tokensOut: 8,
      cacheRead: 100,
      cacheWrite: 10,
      messages: 2,
    });
  });

  it("measures nothing when the task was not claimed in this transcript, and takes the last claim of a task claimed twice", () => {
    const other = claim("tu1", "T201", "2026-11-11T11:00:00.000Z");
    expect(measureTask(other, "T200")).toBeNull();
    const twice = [
      ...claim("tu1", "T200", "2026-11-11T11:00:00.000Z"),
      assistant("m-first", usage(500, 500)),
      ...claim("tu2", "T200", "2026-11-11T12:00:00.000Z"),
      assistant("m-second", usage(1, 1)),
    ];
    expect(findClaim(twice, "T200")).toEqual({
      index: 3,
      timestamp: "2026-11-11T12:00:00.000Z",
    });
    // No task closed before, so both claims' tokens are the task's.
    expect(measureTask(twice, "T200")).toMatchObject({
      tokensIn: 521,
      tokensOut: 511,
    });
  });

  it("finds a claim whose result is a list of text blocks, and one that is JSON inside a string", () => {
    const listed = claim("tu1", "T200", "2026-11-11T11:00:00.000Z");
    (
      listed[1]!.message as { content: Array<{ content: unknown }> }
    ).content[0]!.content = [{ type: "text", text: '{"taskId": "T200"}' }];
    expect(findClaim(listed, "T200")).not.toBeNull();
  });
});

describe("parseTranscript", () => {
  it("skips blank lines and lines that are not JSON objects", () => {
    const text = [
      JSON.stringify({ type: "user" }),
      "",
      '{"type":"assistant","mess',
      "42",
      JSON.stringify({ type: "system" }),
    ].join("\n");
    expect(parseTranscript(text).map((e) => e.type)).toEqual([
      "user",
      "system",
    ]);
  });
});
