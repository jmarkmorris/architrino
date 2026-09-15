#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

// OPS-034: direct reader-facing checks only. Specialized research, saved
// acceptance reports and process conformance are explicit-use work.
const CONTENT_CHECKS = [
  { name: "Prepare ignored runtime assets", args: ["scripts/prepare-runtime-assets.mjs", "--write"], halts: true },
  { name: "Validate content indexes and references", args: ["scripts/validate-content.mjs", "--check", "--strict"] },
  { name: "Check reader-facing publication boundary", args: ["scripts/check-reader-facing-publication-boundary.mjs"] },
  { name: "Validate scene graph", args: ["scripts/build-scene-graph.mjs", "--check", "--strict"] },
  { name: "Validate equation links and symbol registry", args: ["scripts/build-equation-mapping-corpus.mjs", "--check"] },
  { name: "Check manifest routes and search", args: ["scripts/smoke-option3.mjs"] },
];

export function selectedChecks(_env = process.env, profile = "local") {
  if (!["local", "github"].includes(profile)) throw new Error("Unknown validation profile");
  // GitHub's separate Pages job builds and checks its upload once. Locally,
  // the publication gate includes that same check without keeping an artifact.
  return profile === "github" ? [...CONTENT_CHECKS] : [...CONTENT_CHECKS,
    { name: "Build and check Pages payload", args: ["scripts/check-pages-build.mjs"] }];
}

function formatDuration(ms) {
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(seconds < 10 ? 2 : 1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;
  return `${minutes}m ${remainingSeconds.toFixed(1)}s`;
}

// Environment for child checks. Git exports GIT_DIR, GIT_WORK_TREE, and
// GIT_INDEX_FILE to hooks; a child that runs `git init` or `git config` in a
// temporary directory would otherwise act on this repository.
const REPO_SCOPED_GIT_VARIABLES = ["GIT_DIR", "GIT_WORK_TREE", "GIT_INDEX_FILE", "GIT_PREFIX", "GIT_COMMON_DIR", "GIT_OBJECT_DIRECTORY", "GIT_ALTERNATE_OBJECT_DIRECTORIES", "GIT_NAMESPACE"];
function childEnvironment(env = process.env) {
  const child = { ...env };
  for (const name of REPO_SCOPED_GIT_VARIABLES) delete child[name];
  return child;
}

export function runChecks({ checks = selectedChecks(), execute = spawnSync, log = console.log, error = console.error } = {}) {
  const suiteStartedAt = performance.now();
  const failures = [];
  const passed = [];
  const unexecuted = [];
  let exitCode = 0;
  for (const [index, check] of checks.entries()) {
    const label = `${index + 1}/${checks.length} ${check.name}`;
    log(`[content-integrity] ${label}`);
    const checkStartedAt = performance.now();
    const result = execute(process.execPath, check.args, {
      cwd: ROOT_DIR,
      env: childEnvironment(),
      stdio: "inherit",
    });
    const duration = formatDuration(performance.now() - checkStartedAt);
    if (result.error) {
      error(`[content-integrity] failed to start ${check.name} after ${duration}: ${result.error.message}`);
      failures.push({ label, detail: result.error.message, duration });
      unexecuted.push(...checks.slice(index + 1).map(({ name }) => name));
      exitCode = 1;
      break;
    }
    if (result.status !== 0) {
      const detail = result.signal ? `signal ${result.signal}` : `exit ${result.status ?? 1}`;
      const record = { label, detail, duration };
      error(`[content-integrity] failed: ${check.name} (${detail}, ${duration})`);
      failures.push(record);
      exitCode = 1;
      if (check.halts) {
        error(`[content-integrity] halting: later checks consume this step's output`);
        unexecuted.push(...checks.slice(index + 1).map(({ name }) => name));
        exitCode = result.status ?? 1;
        break;
      }
      continue;
    }
    passed.push({ label, duration });
    log(`[content-integrity] passed: ${check.name} (${duration})`);
  }

  const total = formatDuration(performance.now() - suiteStartedAt);

  if (failures.length > 0) {
    error(`[content-integrity] ${failures.length} required check(s) failed (${total}), listed in run order without causal attribution:`);
    for (const failure of failures) {
      error(`[content-integrity]   - ${failure.label} (${failure.detail}, ${failure.duration})`);
    }
  }
  if (unexecuted.length) error(`[content-integrity] not executed after prerequisite/startup failure: ${unexecuted.join('; ')}`);
  const status = exitCode ? "required checks failed" : "required checks passed";
  log(`[content-integrity] ${status}; ${passed.length} required passed, ${failures.length} required failed, ${unexecuted.length} not reached (${total})`);
  return { exitCode, passed, failures, unexecuted };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.length > 1 || (args.length && !["--profile=local", "--profile=github"].includes(args[0]))) throw new Error("Usage: check-content-integrity.mjs [--profile=local|--profile=github]");
  const profile = args[0]?.split("=")[1] ?? "local";
  console.log(`[content-integrity] profile: ${profile}`);
  process.exitCode = runChecks({ checks: selectedChecks(process.env, profile) }).exitCode;
}
