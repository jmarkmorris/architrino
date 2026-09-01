#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  readFileSync,
} from "node:fs";
import path from "node:path";

import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  buildCompactMonteCarloCampaign,
  calibrateCompactCoverageAgainstFullResolution,
  createCompactCoverageProtocol,
  sampleFullConstraintPreservingConfiguration,
  sampleLocalReferenceNeighborhood,
} from "../../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";
import {
  acquireExclusiveCampaignOutputLease,
  publishExclusiveCampaignOutput,
} from "../../src/prescribed-path-analysis/ExclusiveCampaignOutput.mjs";

function fail(message) {
  throw new Error(message);
}

function parseArguments(argv) {
  const values = new Map();
  const flags = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    if (key === "--help" || key === "--calibrate") {
      flags.add(key);
      continue;
    }
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      fail(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const casesPerConfiguration = Number(values.get("--cases-per-configuration") ?? "1");
  if (!Number.isSafeInteger(casesPerConfiguration) || casesPerConfiguration < 1) {
    fail("--cases-per-configuration must be a positive integer.");
  }
  const resolution = values.get("--resolution") ?? "coverage";
  if (resolution !== "coverage" && resolution !== "full") {
    fail("--resolution must be coverage or full.");
  }
  const sampler = values.get("--sampler") ?? "full-exact-configuration";
  if (sampler !== "full-exact-configuration" && sampler !== "local-reference") {
    fail("--sampler must be full-exact-configuration or local-reference.");
  }
  const output = values.get("--output");
  if (!flags.has("--help") && !output) {
    fail("--output is required; parallel campaigns may not use a shared default path.");
  }
  return {
    help: flags.has("--help"),
    calibrate: flags.has("--calibrate"),
    registryPath: path.resolve(
      values.get("--registry") ??
        DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
    ),
    seed: values.get("--seed") ?? "compact-monte-carlo-default-seed-v1",
    casesPerConfiguration,
    resolution,
    sampler,
    assemblyIds: (values.get("--assembly-ids") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    sourceSlugs: (values.get("--source-slugs") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    outputPath: output ? path.resolve(output) : null,
  };
}

function help() {
  console.log([
    "Usage:",
    "  node scripts/eom/run-compact-monte-carlo.mjs",
    "    [--registry path]",
    "    [--seed token]",
    "    [--cases-per-configuration N]",
    "    [--resolution coverage|full]",
    "    [--sampler full-exact-configuration|local-reference]",
    "    [--calibrate]",
    "    [--assembly-ids asm-...,...]",
    "    [--source-slugs three-axis-circular-coincident-midpoints,...]",
    "    --output unique-create-exclusive-path",
    "",
    "The command is prescribed-path analytical coverage only. It does not invoke",
    "the EOM solver, retain raw event packets, perform independent acceptance, or",
    "publish a database generation.",
    "The output path is required, reserved before computation, and never overwritten.",
  ].join("\n"));
}

function selectedCandidates(loaded, options) {
  const assemblyIds = new Set(options.assemblyIds);
  const sourceSlugs = new Set(options.sourceSlugs);
  const candidates = loaded.candidates.filter((candidate) =>
    (assemblyIds.size === 0 ||
      assemblyIds.has(candidate.declaration.assemblyId)) &&
    (sourceSlugs.size === 0 ||
      sourceSlugs.has(candidate.declaration.sourceSlug)));
  if (candidates.length === 0) {
    fail("the requested exact-configuration filters selected no candidates.");
  }
  return candidates;
}

function implementationIdentity() {
  const files = [
    "scripts/eom/run-compact-monte-carlo.mjs",
    "src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs",
    "src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs",
    "src/prescribed-path-analysis/CoincidentAxisThreeBinaryStreamingReductions.mjs",
    "src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs",
    "src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs",
    "scripts/eom/generate-prescribed-braid-record.mjs",
  ].map((relativePath) => {
    const bytes = readFileSync(path.resolve(relativePath));
    return {
      path: relativePath,
      sha256: createHash("sha256").update(bytes).digest("hex"),
    };
  });
  return {
    runtime: process.version,
    platform: `${process.platform}/${process.arch}`,
    files,
    implementationHash: createHash("sha256")
      .update(JSON.stringify(files))
      .digest("hex"),
  };
}

const options = parseArguments(process.argv.slice(2));
if (options.help) {
  help();
  process.exit(0);
}

const outputLeasePath = acquireExclusiveCampaignOutputLease(options.outputPath, {
  schema: "prescribed-path-analysis/compact-monte-carlo-output-lease.v1",
});
const loaded = loadAllCandidateCampaignRegistry(options.registryPath);
if (loaded.protocol.eventEvaluator.fieldSpeed !== 1) {
  fail("the canonical complete-cycle protocol must declare fieldSpeed 1.");
}
const protocol = options.resolution === "coverage"
  ? createCompactCoverageProtocol(loaded.protocol)
  : loaded.protocol;
const started = Date.now();
const candidates = selectedCandidates(loaded, options);
const sample = options.sampler === "full-exact-configuration"
  ? sampleFullConstraintPreservingConfiguration
  : sampleLocalReferenceNeighborhood;
let lastHeartbeatAt = 0;
const progress = (row) => {
    const now = Date.now();
    const boundaryStage = [
      "case-start",
      "case-complete",
      "case-not-evaluated",
      "candidate-complete",
    ].includes(row.stage);
    if (!boundaryStage && now - lastHeartbeatAt < 10_000) return;
    lastHeartbeatAt = now;
    const candidate = row.candidateId ?? "unknown";
    const sourceSlug = row.sourceSlug ?? "unknown";
    const ordinal = row.sampleOrdinal ?? "unknown";
    process.stderr.write(
      `[heartbeat] tier=${row.calibrationTier ?? "campaign"} ` +
      `stage=${row.stage} sourceSlug=${sourceSlug} ` +
      `candidate=${candidate} sample=${ordinal} ` +
      `elapsed=${((now - started) / 1_000).toFixed(1)}s\n`,
    );
};
const identity = implementationIdentity();
const result = options.calibrate
  ? calibrateCompactCoverageAgainstFullResolution({
    candidates,
    protocol: loaded.protocol,
    seed: options.seed,
    casesPerConfiguration: options.casesPerConfiguration,
    sample,
    implementationIdentity: identity,
    onProgress: progress,
  })
  : buildCompactMonteCarloCampaign({
    candidates,
    protocol,
    seed: options.seed,
    casesPerConfiguration: options.casesPerConfiguration,
    sample,
    implementationIdentity: identity,
    onProgress: progress,
  });
publishExclusiveCampaignOutput(
  options.outputPath,
  `${JSON.stringify(result, null, 2)}\n`,
  outputLeasePath,
);
const report = options.calibrate
  ? {
    outputPath: options.outputPath,
    calibrationHash: result.calibrationHash,
    summary: result.summary,
    coverageWallSeconds: result.coverageCampaign.wallSeconds,
    fullResolutionWallSeconds: result.fullResolutionCampaign.wallSeconds,
  }
  : {
    outputPath: options.outputPath,
    campaignHash: result.campaignHash,
    caseCount: result.caseCount,
    evaluationSummary: result.evaluationSummary,
    wallSeconds: result.wallSeconds,
    protocolHash: result.protocolHash,
    sourceSlugs: result.caseRows.map((row) => row.sourceSlug),
    caseWallSeconds: result.caseRows.map((row) => ({
      sourceSlug: row.sourceSlug,
      wallSeconds: row.measuredCost.wallSeconds,
      scoreHash: row.scoreHash,
      evaluationStatus: row.evaluationStatus.code,
      reasonCode: row.evaluationStatus.reasonCode,
    })),
  };
console.log(JSON.stringify(report, null, 2));
