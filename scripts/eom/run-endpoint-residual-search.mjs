#!/usr/bin/env node

import path from "node:path";

import {
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  runStratifiedEndpointResidualSearch,
} from "../../src/prescribed-path-analysis/EndpointResidualSearchCampaign.mjs";
import {
  acquireExclusiveCampaignOutputLease,
  publishExclusiveCampaignOutput,
} from "../../src/prescribed-path-analysis/ExclusiveCampaignOutput.mjs";

function parseArguments(argv) {
  const values = new Map();
  const flags = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--help") {
      flags.add(key);
      continue;
    }
    if (!key.startsWith("--")) {
      throw new Error(`unexpected argument ${key}.`);
    }
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const output = values.get("--output");
  if (!flags.has("--help") && !output) {
    throw new Error(
      "--output is required; parallel campaigns may not use a shared default path.",
    );
  }
  return {
    help: flags.has("--help"),
    seed:
      values.get("--seed") ??
      "stratified-endpoint-residual-search-2026-07-24-v1",
    output: output ? path.resolve(output) : null,
  };
}

function printHelp() {
  console.log([
    "Usage:",
    "  node scripts/eom/run-endpoint-residual-search.mjs",
    "    [--seed token]",
    "    --output unique-create-exclusive-path",
    "",
    "Runs six deterministic endpoint-only prescribed-path draws per active",
    "member: one catalog reference, two local-neighborhood, and three full",
    "bounded-taxonomy draws. It then refines the eight lowest complete-inventory",
    "residuals plus up to eight summed-cancellation cases at 48/96 cycle samples.",
    "",
    "The output is diagnostic-only. The command does not evolve paths, invoke",
    "the EOM solver, or establish a branch, stability, retention, or taxonomy",
    "existence claim.",
    "The output path is required, reserved before computation, and never overwritten.",
  ].join("\n"));
}

const options = parseArguments(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}

const outputLeasePath = acquireExclusiveCampaignOutputLease(options.output, {
  schema: "prescribed-path-analysis/endpoint-residual-output-lease.v1",
});
const loaded = loadAllCandidateCampaignRegistry();
const result = runStratifiedEndpointResidualSearch({
  candidates: loaded.candidates,
  baseProtocol: loaded.protocol,
  seed: options.seed,
  onProgress(progress) {
    if (progress.stage === "case-complete" &&
        ((progress.taskIndex + 1) % 10 === 0 ||
          progress.taskIndex + 1 === progress.taskCount)) {
      process.stderr.write(
        `endpoint screen ${progress.taskIndex + 1}/${progress.taskCount} ` +
        `${progress.status}\n`,
      );
    }
  },
});
publishExclusiveCampaignOutput(
  options.output,
  `${JSON.stringify(result, null, 2)}\n`,
  outputLeasePath,
);
console.log(JSON.stringify({
  output: options.output,
  resultHash: result.resultHash,
  screeningSummary: result.screening.summary,
  refinementSummary: result.refinementSummary,
}, null, 2));
