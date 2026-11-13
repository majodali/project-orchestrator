import path from "node:path";
import { describe, expect, it } from "vitest";

import {
  installForCloud,
  isCloudSession,
  needsInstall,
  type InstallDeps,
} from "../plugin/scripts/lib/cloud-install.ts";

/**
 * The install step of the session start hook
 * (plugin/scripts/lib/cloud-install.ts): it runs in a cloud session
 * whose checkout has no dependencies, and nowhere else. Tested with a
 * pretend file system and a pretend install; the real one is `npm ci`.
 */

const ROOT = path.resolve("/checkout");
const SERVICE = path.join(
  ROOT,
  "node_modules",
  "project-orchestrator-service",
  "dist",
  "model",
  "check.js",
);
const CLOUD = { CLAUDE_CODE_REMOTE: "true" };

/** A checkout holding `files`; `install` adds what it is given. */
function world(
  files: string[],
  onInstall: (present: Set<string>) => void = () => {},
): { deps: InstallDeps; installs: string[] } {
  const present = new Set(files.map((f) => path.join(ROOT, f)));
  const installs: string[] = [];
  return {
    installs,
    deps: {
      exists: (file) => present.has(file),
      install: (dir) => {
        installs.push(dir);
        onInstall(present);
      },
    },
  };
}

const MANIFESTS = ["package.json", "package-lock.json"];

describe("plugin/scripts/lib/cloud-install.ts", () => {
  it("knows a cloud session by CLAUDE_CODE_REMOTE=true and nothing else", () => {
    expect(isCloudSession(CLOUD)).toBe(true);
    expect(isCloudSession({})).toBe(false);
    expect(isCloudSession({ CLAUDE_CODE_REMOTE: "1" })).toBe(false);
  });

  it("installs in a cloud session whose checkout has no dependencies", () => {
    const { deps, installs } = world(MANIFESTS, (present) =>
      present.add(SERVICE),
    );
    expect(installForCloud(CLOUD, ROOT, deps)).toEqual({ kind: "installed" });
    expect(installs).toEqual([ROOT]);
  });

  it("never installs outside a cloud session", () => {
    const { deps, installs } = world(MANIFESTS);
    expect(installForCloud({}, ROOT, deps)).toEqual({ kind: "not-needed" });
    expect(installs).toEqual([]);
  });

  it("does not install again when the dependencies are there", () => {
    const { deps, installs } = world([
      ...MANIFESTS,
      path.relative(ROOT, SERVICE),
    ]);
    expect(needsInstall(ROOT, deps.exists)).toBe(false);
    expect(installForCloud(CLOUD, ROOT, deps)).toEqual({ kind: "not-needed" });
    expect(installs).toEqual([]);
  });

  it("leaves a directory with no lockfile alone", () => {
    const { deps, installs } = world(["package.json"]);
    expect(installForCloud(CLOUD, ROOT, deps)).toEqual({ kind: "not-needed" });
    expect(installs).toEqual([]);
  });

  it("reports a failed install with its first line, and does not throw", () => {
    const { deps } = world(MANIFESTS, () => {
      throw new Error("Command failed: npm ci\nnpm error network");
    });
    expect(installForCloud(CLOUD, ROOT, deps)).toEqual({
      kind: "failed",
      why: "Command failed: npm ci",
    });
  });

  it("reports an install that ran but left the service package missing", () => {
    const { deps } = world(MANIFESTS);
    const result = installForCloud(CLOUD, ROOT, deps);
    expect(result.kind).toBe("failed");
  });
});
