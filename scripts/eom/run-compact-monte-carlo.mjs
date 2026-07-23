#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
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
  sampleFullConstraintPreservingTaxonomy,
  sampleLocalReferenceNeighborhood,
} from "../../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";

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
  const casesPerMember = Number(values.get("--cases-per-member") ?? "1");
  if (!Number.isSafeInteger(casesPerMember) || casesPerMember < 1) {
    fail("--cases-per-member must be a positive integer.");
  }
  const resolution = values.get("--resolution") ?? "coverage";
  if (resolution !== "coverage" && resolution !== "full") {
    fail("--resolution must be coverage or full.");
  }
  const sampler = values.get("--sampler") ?? "full-taxonomy";
  if (sampler !== "full-taxonomy" && sampler !== "local-reference") {
    fail("--sampler must be full-taxonomy or local-reference.");
  }
  return {
    help: flags.has("--help"),
    calibrate: flags.has("--calibrate"),
    registryPath: path.resolve(
      values.get("--registry") ??
        DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
    ),
    seed: values.get("--seed") ?? "compact-monte-carlo-default-seed-v1",
    casesPerMember,
    resolution,
    sampler,
    familyIds: (values.get("--families") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    memberIds: (values.get("--members") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
    outputPath: path.resolve(
      values.get("--output") ??
        ".local-data/braid-analysis/compact-monte-carlo/latest.json",
    ),
  };
}

function help() {
  console.log([
    "Usage:",
    "  node scripts/eom/run-compact-monte-carlo.mjs",
    "    [--registry path]",
    "    [--seed token]",
    "    [--cases-per-member N]",
    "    [--resolution coverage|full]",
    "    [--sampler full-taxonomy|local-reference]",
    "    [--calibrate]",
    "    [--families A,B,C]",
    "    [--members A1.2,B1.3,C5]",
    "    [--output path]",
    "",
    "The command is prescribed-path analytical coverage only. It does not invoke",
    "the EOM solver, retain raw event packets, perform independent acceptance, or",
    "publish a database generation.",
  ].join("\n"));
}

function selectedCandidates(loaded, options) {
  const familyIds = new Set(options.familyIds);
  const memberIds = new Set(options.memberIds);
  const candidates = loaded.candidates.filter((candidate) =>
    (familyIds.size === 0 ||
      familyIds.has(candidate.declaration.familyId)) &&
    (memberIds.size === 0 ||
      memberIds.has(candidate.declaration.memberId)));
  if (candidates.length === 0) {
    fail("the requested family/member filters selected no candidates.");
  }
  return candidates;
}

function implementationIdentity() {
  const files = [
    "scripts/eom/run-compact-monte-carlo.mjs",
    "src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs",
    "src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs",
    "src/prescribed-path-analysis/B1StreamingReductions.mjs",
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

const loaded = loadAllCandidateCampaignRegistry(options.registryPath);
if (loaded.protocol.eventEvaluator.fieldSpeed !== 1) {
  fail("the canonical complete-cycle protocol must declare fieldSpeed 1.");
}
const protocol = options.resolution === "coverage"
  ? createCompactCoverageProtocol(loaded.protocol)
  : loaded.protocol;
const started = Date.now();
const candidates = selectedCandidates(loaded, options);
const sample = options.sampler === "full-taxonomy"
  ? sampleFullConstraintPreservingTaxonomy
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
    const member = row.memberId ?? "unknown";
    const ordinal = row.sampleOrdinal ?? "unknown";
    process.stderr.write(
      `[heartbeat] tier=${row.calibrationTier ?? "campaign"} ` +
      `stage=${row.stage} member=${member} ` +
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
    casesPerMember: options.casesPerMember,
    sample,
    implementationIdentity: identity,
    onProgress: progress,
  })
  : buildCompactMonteCarloCampaign({
    candidates,
    protocol,
    seed: options.seed,
    casesPerMember: options.casesPerMember,
    sample,
    implementationIdentity: identity,
    onProgress: progress,
  });
mkdirSync(path.dirname(options.outputPath), { recursive: true });
writeFileSync(options.outputPath, `${JSON.stringify(result, null, 2)}\n`);
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
    members: result.caseRows.map((row) => row.memberId),
    caseWallSeconds: result.caseRows.map((row) => ({
      memberId: row.memberId,
      wallSeconds: row.measuredCost.wallSeconds,
      scoreHash: row.scoreHash,
      evaluationStatus: row.evaluationStatus.code,
      reasonCode: row.evaluationStatus.reasonCode,
    })),
  };
console.log(JSON.stringify(report, null, 2));
