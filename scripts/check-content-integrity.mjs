#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const CHECKS = [
  {
    name: "Prepare ignored runtime assets from canonical sources",
    args: ["scripts/prepare-runtime-assets.mjs", "--write"],
  },
  {
    name: "Validate content indexes and references",
    args: ["scripts/validate-content.mjs", "--check", "--strict"],
  },
  {
    name: "Check reader-facing publication boundary",
    args: ["scripts/check-reader-facing-publication-boundary.mjs"],
  },
  {
    name: "Validate generated scene graph manifest",
    args: ["scripts/build-scene-graph.mjs", "--check", "--strict"],
  },
  {
    name: "Validate corpus equation links, source context, and symbol registry",
    args: ["scripts/build-equation-mapping-corpus.mjs", "--check"],
  },
  {
    name: "Audit title/source filename sync",
    args: ["scripts/audit-title-filename-sync.mjs"],
  },
  {
    name: "Validate generated agent startup orientation",
    args: ["scripts/build-agent-startup-orientation.mjs", "--check"],
  },
  {
    name: "Validate generated textbook reading copies",
    args: ["scripts/build-textbook-md-pdf.mjs", "--check"],
  },
  {
    name: "Validate large machine-artifact retention",
    args: ["scripts/validate-machine-artifact-retention.mjs"],
  },
  {
    name: "Test generated runtime storage and deployment contracts",
    args: ["--test", "tests/machine-artifact-retention.test.js", "tests/runtime-asset-build.test.js"],
  },
  {
    name: "Check current Master Equation terminology",
    args: ["scripts/check-master-equation-terminology-migration.mjs"],
  },
  {
    name: "Check transmitter-factor Master EOM clean slate",
    args: ["scripts/check-transmitter-factor-clean-slate.mjs"],
  },
  {
    name: "Check frequency-triplet notation drift",
    args: ["scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs"],
  },
  {
    name: "Check polarity notation drift",
    args: ["scripts/check-polarity-notation-drift.mjs"],
  },
  {
    name: "Check migrated braid taxonomy terminology",
    args: ["scripts/check-braid-taxonomy-terminology.mjs"],
  },
  {
    name: "Check validation-document script paths",
    args: ["scripts/check-validation-script-paths.mjs"],
  },
  {
    name: "Smoke test manifest runtime routes/search",
    args: ["scripts/smoke-option3.mjs"],
  },
  {
    name: "Test pre-push policy requiring verification for advancement",
    args: ["--test", "tests/pre-push-gate-policy.test.js"],
  },
  {
    name: "Test PR procedure and gate conformance",
    args: ["--test", "tests/pr-branch-process-conformance.test.js"],
  },
  {
    name: "Test exact-state PR validation receipts",
    args: ["--test", "tests/pr-validation-receipt.test.js"],
  },
  {
    name: "Test reader-facing publication boundary",
    args: ["--test", "tests/reader-facing-publication-boundary.test.js"],
  },
];

function formatDuration(ms) {
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(seconds < 10 ? 2 : 1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds - minutes * 60;
  return `${minutes}m ${remainingSeconds.toFixed(1)}s`;
}

const suiteStartedAt = performance.now();

for (const check of CHECKS) {
  console.log(`[content-integrity] ${check.name}`);
  const checkStartedAt = performance.now();
  const result = spawnSync(process.execPath, check.args, {
    cwd: ROOT_DIR,
    env: process.env,
    stdio: "inherit",
  });
  const duration = formatDuration(performance.now() - checkStartedAt);
  if (result.error) {
    console.error(`[content-integrity] failed to start ${check.name} after ${duration}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    const detail = result.signal ? `signal ${result.signal}` : `exit ${result.status ?? 1}`;
    console.error(`[content-integrity] failed: ${check.name} (${detail}, ${duration})`);
    process.exit(result.status ?? 1);
  }
  console.log(`[content-integrity] passed: ${check.name} (${duration})`);
}

console.log(`[content-integrity] all checks passed (${formatDuration(performance.now() - suiteStartedAt)})`);
