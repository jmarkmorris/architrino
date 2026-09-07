#!/usr/bin/env node

// Runs the Node test files under tests/ split by measured duration
// (OPS-022). Default mode runs every *.test.js / *.test.mjs file that is not
// on the declared slow list; `--slow` runs only the slow list; `--list`
// prints the selected files without running them. The exit status is the
// `node --test` exit status, so the caller decides whether it gates.
//
// Every test runs under a `--test-timeout` so a test that blocks becomes a
// reported failure instead of an open-ended wait: on 2026-09-07 the pilot-
// process tests, waiting on a venv Python that a GitHub runner does not have,
// held both PR #260 jobs for 92 minutes until cancelled. The default bound is
// 120 s outside the slow list, twelve times the 10 s threshold above which a
// file must move to the slow list; the slow list gets 600 s, six times the
// 100 s cap its two unmeasured entries hit. `--test-timeout=<ms>` overrides
// either. The timeout is per test, as `node --test` applies it, not per file.

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const TESTS_DIR = path.join(ROOT_DIR, "tests");
const SLOW_LIST_PATH = path.join(ROOT_DIR, "scripts/config/test-sweep-slow-list.json");
const TEST_FILE_PATTERN = /\.test\.(?:js|mjs)$/u;

const args = new Set(process.argv.slice(2));
const slowMode = args.has("--slow");
const listOnly = args.has("--list");
const DEFAULT_TEST_TIMEOUT_MS = { sweep: 120_000, slow: 600_000 };

export function resolveTestTimeoutMs(argv, { slow = false } = {}) {
  const override = [...argv].find((arg) => arg.startsWith("--test-timeout="));
  if (override === undefined) return slow ? DEFAULT_TEST_TIMEOUT_MS.slow : DEFAULT_TEST_TIMEOUT_MS.sweep;
  const value = Number(override.slice("--test-timeout=".length));
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error(`--test-timeout must be a positive integer number of milliseconds: ${override}`);
  }
  return value;
}

function collectTestFiles(directory, found = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectTestFiles(absolute, found);
    } else if (entry.isFile() && TEST_FILE_PATTERN.test(entry.name)) {
      found.push(path.relative(ROOT_DIR, absolute).split(path.sep).join("/"));
    }
  }
  return found;
}

export function loadSlowList(slowListPath = SLOW_LIST_PATH) {
  const config = JSON.parse(fs.readFileSync(slowListPath, "utf8"));
  if (config.schema !== "architrino.test-sweep-slow-list.v1") {
    throw new Error(`unexpected slow-list schema: ${config.schema}`);
  }
  const threshold = Number(config.thresholdMs);
  if (!Number.isFinite(threshold) || threshold <= 0) {
    throw new Error("slow list thresholdMs must be a positive number");
  }
  const seen = new Set();
  for (const entry of config.entries ?? []) {
    if (typeof entry.path !== "string" || !TEST_FILE_PATTERN.test(entry.path)) {
      throw new Error(`slow list entry is not a test file path: ${JSON.stringify(entry)}`);
    }
    if (seen.has(entry.path)) {
      throw new Error(`slow list entry repeated: ${entry.path}`);
    }
    seen.add(entry.path);
    if (!Number.isFinite(entry.measuredMs) || entry.measuredMs < threshold) {
      throw new Error(`slow list entry ${entry.path} lacks a measured duration above ${threshold} ms`);
    }
    if (typeof entry.measuredOn !== "string" || !/^\d{4}-\d{2}-\d{2}$/u.test(entry.measuredOn)) {
      throw new Error(`slow list entry ${entry.path} lacks a measurement date`);
    }
    if (!fs.existsSync(path.join(ROOT_DIR, entry.path))) {
      throw new Error(`slow list entry no longer exists: ${entry.path}`);
    }
  }
  return { config, slowPaths: seen };
}

export function selectTestFiles({ slow = false } = {}) {
  const { slowPaths } = loadSlowList();
  const all = collectTestFiles(TESTS_DIR).sort();
  return slow ? all.filter((file) => slowPaths.has(file)) : all.filter((file) => !slowPaths.has(file));
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  const selected = selectTestFiles({ slow: slowMode });
  const label = slowMode ? "slow list" : "outside the slow list";
  const testTimeoutMs = resolveTestTimeoutMs(args, { slow: slowMode });
  console.log(`[test-sweep] ${selected.length} test file(s) ${label}; per-test timeout ${testTimeoutMs} ms`);
  if (listOnly) {
    for (const file of selected) console.log(file);
    process.exit(0);
  }
  if (selected.length === 0) {
    process.exit(0);
  }
  const startedAt = Date.now();
  const result = spawnSync(process.execPath, ["--test", `--test-timeout=${testTimeoutMs}`, ...selected], {
    cwd: ROOT_DIR,
    env: process.env,
    stdio: "inherit",
  });
  const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
  if (result.error) {
    console.error(`[test-sweep] failed to start node --test: ${result.error.message}`);
    process.exit(1);
  }
  const status = result.status ?? 1;
  console.log(`[test-sweep] ${label}: exit ${status} after ${seconds}s over ${selected.length} file(s)`);
  process.exit(status);
}
