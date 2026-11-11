import { describe, expect, it } from "vitest";

import {
  findClaim,
  measureTask,
  parseTranscript,
} from "../plugin/scripts/lib/task-cost.ts";

/**
 * The cost hook's measurement (the rebuild plan, "Cost capture"): the
 * tokens between a task's claim and the end of the transcript, each
 * model message counted once.
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

describe("measureTask", () => {
  it("sums the usage from the task's claim on, counting a message once however many lines carry it", () => {
    const lines = [
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
      tokensIn: 160,
      tokensOut: 65,
      cacheRead: 11000,
      cacheWrite: 200,
      model: "recorded-model",
      messages: 3,
    });
  });

  it("adds subagent transcripts from the claim's time on", () => {
    const main = claim("tu1", "T200", "2026-11-11T11:00:00.000Z");
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
    expect(measureTask(twice, "T200")).toMatchObject({
      tokensIn: 11,
      tokensOut: 6,
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
