#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

// Failure handling (OPS-020 question 1, accepted 2026-09-06): every check runs
// and failures are summarized at the end with a non-zero exit, so one stale
// receipt cannot hide the result of every later check. A check marked
// `halts: true` is a precondition whose output later checks consume; its
// failure still stops the run, because everything after it would report
// cascade noise rather than findings. A check marked `reporting: true` prints
// its result but does not affect the exit status (OPS-022, until promoted).
const CHECKS = [
  {
    name: "Prepare ignored runtime assets from canonical sources",
    args: ["scripts/prepare-runtime-assets.mjs", "--write"],
    halts: true,
  },
  {
    name: "Verify Borg registry and record byte identities",
    args: ["scripts/borg/verify-assembly-record-byte-identity.mjs", "--check"],
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
    name: "Validate accepted webapp release profiles",
    args: ["scripts/check-webapp-release-gate.mjs"],
  },
  {
    name: "Validate accepted browser performance budgets",
    args: ["scripts/check-browser-performance-budget.mjs"],
  },
  {
    name: "Validate accepted deployment budget",
    args: ["scripts/check-deployment-budget.mjs"],
  },
  {
    name: "Validate owned-compute launch policy",
    args: ["scripts/check-owned-compute-launch-policy.mjs"],
  },
  {
    name: "Validate private MCP secure-tunnel deployment contract",
    args: ["scripts/archie-service/manage-secure-mcp-tunnel.mjs", "--check"],
  },
  {
    name: "Test owned-compute task-closeout hook",
    args: ["--test", "tests/owned-compute-stop-hook.test.js"],
  },
  {
    name: "Validate Potential consumer and publication contract",
    args: ["scripts/check-potential-consumer-publication-contract.mjs"],
  },
  {
    name: "Validate Potential live timespace pipeline contract",
    args: ["scripts/check-potential-live-timespace-pipeline-contract.mjs"],
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
    name: "Validate generated Claude pre-read floor",
    args: ["scripts/build-claude-bootstrap-floor.mjs", "--check"],
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
    name: "Test private MCP secure-tunnel deployment safety",
    args: ["--test", "tests/archie-service-mcp-secure-tunnel-deployment.test.js"],
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
  {
    name: "Sweep test files outside the declared slow list (reporting until promoted)",
    args: ["scripts/run-test-sweep.mjs"],
    reporting: true,
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
const failures = [];
const reportingFailures = [];

for (const [index, check] of CHECKS.entries()) {
  const label = `${index + 1}/${CHECKS.length} ${check.name}`;
  console.log(`[content-integrity] ${label}`);
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
    const record = { label, detail, duration };
    if (check.reporting) {
      console.error(`[content-integrity] reported (does not affect exit status): ${check.name} (${detail}, ${duration})`);
      reportingFailures.push(record);
      continue;
    }
    console.error(`[content-integrity] failed: ${check.name} (${detail}, ${duration})`);
    failures.push(record);
    if (check.halts) {
      console.error(`[content-integrity] halting: later checks consume this step's output`);
      process.exit(result.status ?? 1);
    }
    continue;
  }
  console.log(`[content-integrity] passed: ${check.name} (${duration})`);
}

const total = formatDuration(performance.now() - suiteStartedAt);

if (reportingFailures.length > 0) {
  console.error(`[content-integrity] ${reportingFailures.length} reporting-only check(s) failed (not gating):`);
  for (const failure of reportingFailures) {
    console.error(`[content-integrity]   - ${failure.label} (${failure.detail}, ${failure.duration})`);
  }
}

if (failures.length > 0) {
  console.error(`[content-integrity] ${failures.length} of ${CHECKS.length} checks failed (${total}), in run order; the first is the likeliest root:`);
  for (const failure of failures) {
    console.error(`[content-integrity]   - ${failure.label} (${failure.detail}, ${failure.duration})`);
  }
  process.exit(1);
}

console.log(`[content-integrity] all checks passed (${total})`);
