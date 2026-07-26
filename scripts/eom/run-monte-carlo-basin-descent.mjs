#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";

import {
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  DEFAULT_DIRECTED_OPTIMIZER_BOUNDS,
  runDirectedEndpointOptimizer,
} from "../../src/prescribed-path-analysis/DirectedEndpointOptimizer.mjs";
import {
  createEndpointResidualSearchProtocol,
} from "../../src/prescribed-path-analysis/EndpointResidualSearchCampaign.mjs";
import {
  createExternalRawEvidenceStore,
  verifyExternalRawEvidenceReceipts,
} from "../../src/prescribed-path-analysis/ExternalRawEvidenceStore.mjs";
import {
  admitMonteCarloBasinHandoffs,
  buildCompactSearchCampaign,
  directedOptimizerPoints,
  selectMonteCarloBasinHandoffs,
} from "../../src/prescribed-path-analysis/MonteCarloBasinSearchCampaign.mjs";
import {
  importCompactMonteCarloCampaign,
  verifyCompactAnalyticalCampaignDatabase,
} from "../../src/prescribed-path-analysis/database/CompactAnalyticalCampaignDatabase.mjs";

function fail(message) {
  throw new Error(message);
}

function parseArguments(argv) {
  const values = new Map();
  let help = false;
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (key === "--help") {
      help = true;
      continue;
    }
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      fail(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const number = (key, fallback) => {
    const parsed = Number(values.get(key) ?? fallback);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      fail(`${key} must be a positive finite number.`);
    }
    return parsed;
  };
  const integer = (key, fallback) => {
    const parsed = number(key, fallback);
    if (!Number.isSafeInteger(parsed)) {
      fail(`${key} must be a positive integer.`);
    }
    return parsed;
  };
  return {
    help,
    coveragePaths: (values.get("--coverage") ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => path.resolve(value)),
    outputRoot: path.resolve(
      values.get("--output-root") ??
        ".local-data/braid-analysis/monte-carlo-basin/bc-initial-v1",
    ),
    databasePath: path.resolve(
      values.get("--database") ??
        ".local-data/braid-analysis/compact-campaigns.sqlite3",
    ),
    seed:
      values.get("--seed") ??
      "braid-bc-monte-carlo-basin-descent-20260725-v1",
    maximumPeak: number("--maximum-peak", 6),
    maximumResolutionChange:
      number("--maximum-resolution-change", 0.05),
    iterations: integer("--iterations", 24),
    heldOutPerStratum: integer("--held-out-per-stratum", 3),
    minimumStepScale: number("--minimum-step-scale", 1 / 32),
  };
}

function printHelp() {
  console.log([
    "Usage:",
    "  node scripts/eom/run-monte-carlo-basin-descent.mjs",
    "    --coverage campaign-a.json,campaign-b.json",
    "    [--output-root directory]",
    "    [--database compact-campaigns.sqlite3]",
    "    [--seed token]",
    "    [--maximum-peak 6]",
    "    [--maximum-resolution-change 0.05]",
    "    [--iterations 24]",
    "    [--minimum-step-scale 0.03125]",
    "    [--held-out-per-stratum 3]",
    "",
    "Every threshold crossing is raw-packet replayed through complete-inventory",
    "and independently recomputed causal-root checks. Eligible points enter a",
    "bounded prescribed-coordinate descent. Basin means only that local",
    "optimization neighborhood; the command makes no dynamical or physical claim.",
  ].join("\n"));
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function implementationIdentity() {
  const files = [
    "scripts/eom/run-monte-carlo-basin-descent.mjs",
    "src/prescribed-path-analysis/MonteCarloBasinSearchCampaign.mjs",
    "src/prescribed-path-analysis/DirectedEndpointOptimizer.mjs",
    "src/prescribed-path-analysis/EndpointResidualSearchCampaign.mjs",
    "src/prescribed-path-analysis/ExternalRawEvidenceStore.mjs",
    "src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs",
    "src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs",
    "src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs",
    "scripts/eom/generate-prescribed-braid-record.mjs",
  ].map((relativePath) => {
    const bytes = readFileSync(path.resolve(relativePath));
    return {
      path: relativePath,
      sha256: sha256Bytes(bytes),
    };
  });
  return {
    runtime: process.version,
    platform: `${process.platform}/${process.arch}`,
    files,
    implementationHash: sha256Bytes(Buffer.from(JSON.stringify(files))),
  };
}

function writeJsonExclusive(filePath, value) {
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`, {
    flag: "wx",
  });
  return filePath;
}

function rawReceiptsFromCampaign(campaign) {
  return campaign.caseRows.flatMap((row) =>
    row.verificationReceipts?.rawEvidence ?? []);
}

const options = parseArguments(process.argv.slice(2));
if (options.help) {
  printHelp();
  process.exit(0);
}
if (options.coveragePaths.length === 0) {
  fail("--coverage must name at least one compact campaign JSON file.");
}

const coverageCampaigns = options.coveragePaths.map((filePath) =>
  JSON.parse(readFileSync(filePath, "utf8")));
const loaded = loadAllCandidateCampaignRegistry();
if (loaded.protocol.eventEvaluator.fieldSpeed !== 1) {
  fail("the live complete-cycle protocol must declare fieldSpeed 1.");
}
const identity = implementationIdentity();
const handoff = selectMonteCarloBasinHandoffs(coverageCampaigns, {
  maximumRefinedFullCyclePeak: options.maximumPeak,
  maximumResolutionChange: options.maximumResolutionChange,
});
const handoffProtocol = createEndpointResidualSearchProtocol(
  loaded.protocol,
  {
    primaryTimeSamples: 12,
    refinedTimeSamples: 24,
    suffix: "monte-carlo-basin-handoff-admission-v1",
  },
);
const rawRoot = path.join(options.outputRoot, "raw-evidence");
const rawStore = createExternalRawEvidenceStore(rawRoot);
const started = Date.now();
const admissions = admitMonteCarloBasinHandoffs({
  selected: handoff.selected,
  candidates: loaded.candidates,
  protocol: handoffProtocol,
  seed: `${options.seed}/admission`,
  onRawPacket: (packet, context) => rawStore.write(packet, context),
  onProgress(progress) {
    process.stderr.write(
      `[heartbeat] stage=${progress.stage} ` +
      `member=${progress.memberId} index=${progress.index + 1}/` +
      `${progress.count} elapsed=${((Date.now() - started) / 1000).toFixed(1)}s\n`,
    );
  },
});
const admissionPoints = admissions.map((row, index) => ({
  caseId: `handoff-admission/${row.memberId}/${index}`,
  row,
  lineage: {
    pointKind: "monte-carlo-handoff-admission",
    handoffLineage: row.handoffLineage,
  },
}));
const admissionCampaign = buildCompactSearchCampaign({
  campaignId: `monte-carlo-basin-handoff-${sha256Bytes(
    Buffer.from(options.seed),
  ).slice(0, 12)}`,
  protocol: handoffProtocol,
  implementationIdentity: identity,
  seed: `${options.seed}/admission`,
  points: admissionPoints,
  stage: "handoff-admission",
});

mkdirSync(options.outputRoot, { recursive: true });
const admissionPath = writeJsonExclusive(
  path.join(options.outputRoot, "handoff-admission.compact.json"),
  admissionCampaign,
);
const admitted = admissions.filter(
  (row) => row.status === "eligible-complete-inventory",
);
let optimizerResult = null;
let optimizationCampaign = null;
let denseCampaign = null;
let optimizerPath = null;
let optimizationPath = null;
let densePath = null;

if (admitted.length > 0) {
  optimizerResult = runDirectedEndpointOptimizer({
    candidates: loaded.candidates,
    baseProtocol: loaded.protocol,
    sourceSearch: {
      schema: "prescribed-path-analysis/monte-carlo-handoff-admission.v1",
      seed: `${options.seed}/admission`,
      campaignHash: admissionCampaign.campaignHash,
      cases: admitted,
    },
    seed: `${options.seed}/optimizer`,
    basinCount: admitted.length,
    maximumIterations: options.iterations,
    minimumStepScale: options.minimumStepScale,
    heldOutPerStratum: options.heldOutPerStratum,
    bounds: {
      ...DEFAULT_DIRECTED_OPTIMIZER_BOUNDS,
      minimumRadiusRatioToSeed: 0.85,
      maximumRadiusRatioToSeed: 1.15,
      maximumMidpointDisplacementFromSeed: 0.12,
      maximumPhaseDisplacementFromSeed: Math.PI / 3,
      maximumTranslationChangeFromSeed: 0.04,
      maximumFlatteningChangeFromSeed: 0.2,
      maximumAbsoluteTranslationSpeed: 0.05,
    },
    onRawPacket: (packet, context) => rawStore.write(packet, context),
    onProgress(progress) {
      if (progress.stage === "basin-start" ||
          progress.stage === "basin-iteration-complete" ||
          progress.stage === "held-out-case-complete") {
        process.stderr.write(
          `[heartbeat] stage=${progress.stage} ` +
          `basin=${progress.basinId ?? progress.basinIndex + 1} ` +
          `iteration=${progress.iteration ?? "-"} ` +
          `peak=${progress.objective?.refinedFullCyclePeak ?? "-"} ` +
          `elapsed=${((Date.now() - started) / 1000).toFixed(1)}s\n`,
        );
      }
    },
  });
  const points = directedOptimizerPoints(optimizerResult);
  optimizationCampaign = buildCompactSearchCampaign({
    campaignId: `monte-carlo-basin-optimization-${sha256Bytes(
      Buffer.from(options.seed),
    ).slice(0, 12)}`,
    protocol: optimizerResult.optimizationProtocol,
    implementationIdentity: identity,
    seed: `${options.seed}/optimizer`,
    points: points.optimization,
    stage: "directed-optimization",
  });
  denseCampaign = buildCompactSearchCampaign({
    campaignId: `monte-carlo-basin-dense-audit-${sha256Bytes(
      Buffer.from(options.seed),
    ).slice(0, 12)}`,
    protocol: optimizerResult.denseProtocol,
    implementationIdentity: identity,
    seed: `${options.seed}/optimizer/held-out`,
    points: points.dense,
    stage: "dense-and-held-out-audit",
  });
  optimizerPath = writeJsonExclusive(
    path.join(options.outputRoot, "directed-optimizer-result.json"),
    optimizerResult,
  );
  optimizationPath = writeJsonExclusive(
    path.join(options.outputRoot, "directed-optimization.compact.json"),
    optimizationCampaign,
  );
  densePath = writeJsonExclusive(
    path.join(options.outputRoot, "dense-held-out.compact.json"),
    denseCampaign,
  );
}

const compactCampaigns = [
  admissionCampaign,
  optimizationCampaign,
  denseCampaign,
].filter(Boolean);
const receipts = compactCampaigns.flatMap(rawReceiptsFromCampaign);
const rawVerification = verifyExternalRawEvidenceReceipts(
  rawRoot,
  receipts,
);
const imports = compactCampaigns.map((campaign) =>
  importCompactMonteCarloCampaign(options.databasePath, campaign));
const databaseVerification = verifyCompactAnalyticalCampaignDatabase(
  options.databasePath,
);
const report = {
  schema: "prescribed-path-analysis/monte-carlo-basin-execution-receipt.v1",
  seed: options.seed,
  coveragePaths: options.coveragePaths,
  coverageCampaignHashes: coverageCampaigns.map(
    (campaign) => campaign.campaignHash,
  ),
  handoffPolicy: handoff.policy,
  handoffDispositionCounts: handoff.dispositionCounts,
  selectedHandoffCount: handoff.selectedCount,
  admittedCount: admitted.length,
  admissionUnknownCount: admissions.length - admitted.length,
  optimizerSummary: optimizerResult?.summary ?? null,
  paths: {
    admissionPath,
    optimizerPath,
    optimizationPath,
    densePath,
    rawRoot,
    databasePath: options.databasePath,
  },
  compactCampaignHashes: compactCampaigns.map(
    (campaign) => campaign.campaignHash,
  ),
  rawVerification,
  imports,
  databaseVerification,
  wallSeconds: (Date.now() - started) / 1000,
  claimBoundary:
    "diagnostic prescribed-path search only; no exhaustive coverage, global " +
    "optimum, dynamical basin, stability, retention, binding, energy closure, " +
    "particle identity, independent acceptance, or physical realization",
};
const receiptPath = writeJsonExclusive(
  path.join(options.outputRoot, "execution-receipt.json"),
  report,
);
console.log(JSON.stringify({
  receiptPath,
  selectedHandoffCount: report.selectedHandoffCount,
  admittedCount: report.admittedCount,
  optimizerSummary: report.optimizerSummary,
  rawEvidenceReceiptCount: rawVerification.receiptCount,
  databasePath: options.databasePath,
  databaseCampaignCount: databaseVerification.campaignCount,
  databaseCaseCount: databaseVerification.caseCount,
  wallSeconds: report.wallSeconds,
}, null, 2));
