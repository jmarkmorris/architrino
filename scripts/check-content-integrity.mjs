#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT_DIR = path.resolve(fileURLToPath(new URL("..", import.meta.url)));

const CHECKS = [
  {
    name: "Validate content indexes and references",
    args: ["scripts/validate-content.mjs", "--check", "--strict"],
  },
  {
    name: "Validate generated scene graph manifest",
    args: ["scripts/build-scene-graph.mjs", "--check", "--strict"],
  },
  {
    name: "Audit title/source filename sync",
    args: ["scripts/audit-title-filename-sync.mjs"],
  },
  {
    name: "Validate generated textbook reading copies",
    args: ["scripts/build-textbook-md-pdf.mjs", "--check"],
  },
  {
    name: "Validate generated iOS textbook package",
    args: ["scripts/export-ios-textbook-package.mjs", "--check", "--strict"],
  },
  {
    name: "Check receiver-normal Master EOM clean slate",
    args: ["scripts/check-receiver-normal-clean-slate.mjs"],
  },
  {
    name: "Check frequency-triplet notation drift",
    args: ["scripts/angular-momentum/check-frequency-triplet-notation-drift.mjs"],
  },
  {
    name: "Smoke test manifest runtime routes/search",
    args: ["scripts/smoke-option3.mjs"],
  },
];

for (const check of CHECKS) {
  console.log(`[content-integrity] ${check.name}`);
  const result = spawnSync(process.execPath, check.args, {
    cwd: ROOT_DIR,
    env: process.env,
    stdio: "inherit",
  });
  if (result.error) {
    console.error(`[content-integrity] failed to start ${check.name}: ${result.error.message}`);
    process.exit(1);
  }
  if (result.status !== 0) {
    const detail = result.signal ? `signal ${result.signal}` : `exit ${result.status ?? 1}`;
    console.error(`[content-integrity] failed: ${check.name} (${detail})`);
    process.exit(result.status ?? 1);
  }
}

console.log("[content-integrity] all checks passed");
