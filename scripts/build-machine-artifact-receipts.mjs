#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const RING_RAW_DIRECTORY = ".local-data/braid-analysis/retained-evidence/planar-co-rotating-rings";
const RING_BASENAME = "2026-08-29-planar-co-rotating-n-n-circular-balance";
const RING_RECEIPT =
  "reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-n-n-circular-balance.receipt.v1.json";
const PHOTON_RAW =
  ".local-data/braid-analysis/retained-evidence/photon/helical-self-hit-phase-lock-sweep.v1.json";
const PHOTON_RECEIPT =
  "reference/priorities/app-photon/evidence/helical-self-hit-phase-lock-sweep.receipt.v1.json";
const ORTHOGONAL_RAW =
  ".local-data/braid-analysis/retained-evidence/orthogonal-plane-weave/2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json";
const ORTHOGONAL_RECEIPT =
  "reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-complete-cycle.receipt.v1.json";
const RING_TWELVE_RAW =
  ".local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/2026-08-29-planar-co-rotating-12-12-alternating.v1.json";
const RING_TWELVE_RECEIPT =
  "reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-12-12-alternating.receipt.v1.json";

function parseArguments(argv) {
  const modes = argv.filter((argument) => argument === "--write" || argument === "--check");
  if (modes.length !== 1) {
    throw new TypeError("choose exactly one of --write or --check");
  }
  const targetArgument = argv.find((argument) => argument.startsWith("--target="));
  const target = targetArgument?.slice("--target=".length) ?? "all";
  if (!new Set(["all", "ring", "photon", "orthogonal", "ring12"]).has(target)) {
    throw new TypeError("--target must be all, ring, photon, orthogonal, or ring12");
  }
  return { mode: modes[0], target };
}

function readArtifact(relativePath) {
  const absolutePath = path.join(ROOT, relativePath);
  const bytes = readFileSync(absolutePath);
  const text = bytes.toString("utf8");
  return {
    relativePath,
    bytes,
    text,
    json: JSON.parse(text),
    sha256: createHash("sha256").update(bytes).digest("hex"),
    byteCount: bytes.length,
    lineCount: text.endsWith("\n") ? text.split("\n").length - 1 : text.split("\n").length,
  };
}

function compactCandidate(candidate) {
  const { best } = candidate;
  return {
    n: candidate.n,
    phaseConfiguration: candidate.phaseConfiguration,
    polarityClass: candidate.polarityClass,
    beta: best.beta,
    rootTopologySignature: best.rootTopologySignature,
    rootCount: best.rootCount,
    compatibleScale: best.compatibleScale,
    residuals: {
      maximumRadial: best.residuals.maximumRadial,
      maximumTangential: best.residuals.maximumTangential,
      maximumAxial: best.residuals.maximumAxial,
      maximumFullVector: best.residuals.maximumFullVector,
    },
    rootCompleteness: best.rootCompleteness,
  };
}

function buildRingReceipt() {
  const versions = [1, 2, 3, 4].map((version) => readArtifact(
    `${RING_RAW_DIRECTORY}/${RING_BASENAME}.v${version}.json`,
  ));
  const current = versions.at(-1);
  const record = current.json;
  return {
    schema: "braid-program/planar-n-n-circular-balance-receipt.v1",
    receiptId: "planar-co-rotating-n-n-circular-balance-2026-08-29-v4",
    compatibilityIdentifier: record.compatibilityIdentifier,
    sourceRecord: {
      schema: record.schema,
      campaignId: record.campaignId,
      generatingCommit: "18d06e3d0b34b7749e603e1b9a44c8906bfe7388",
      model: record.model,
      declaredDomain: record.declaredDomain,
      symmetryReduction: record.symmetryReduction,
    },
    rawArtifact: {
      retention: "ignored-local-analytical-storage",
      path: current.relativePath,
      sha256: current.sha256,
      byteCount: current.byteCount,
      lineCount: current.lineCount,
      requiredForTests: false,
    },
    correctionHistory: versions.map((version, index) => ({
      version: index + 1,
      path: version.relativePath,
      sha256: version.sha256,
      byteCount: version.byteCount,
      lineCount: version.lineCount,
      correctionOfVersion: index === 0 ? null : index,
      correctionReason: version.json.correctionReason ?? null,
      elapsedSeconds: version.json.execution?.elapsedSeconds ?? null,
    })),
    decision: {
      balancedCandidateCount: record.summary.balancedCandidateCount,
      unresolvedSearchRowCount: record.summary.unresolvedSearchRowCount,
      verdict: record.summary.verdict,
      claimGrade: record.summary.claimGrade,
      excludedClaims: record.summary.excludedClaims,
      falsifier: record.summary.falsifier,
    },
    balancedCandidateScopes: record.summary.balancedCandidateScopes.map(compactCandidate),
    reproduction: {
      fullCampaignCommand:
        "node scripts/equation-mapping/analyze-planar-co-rotating-rings.mjs --out=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/reproduction.json",
      acceleratedPhaseSearchCommand:
        "node scripts/equation-mapping/analyze-planar-co-rotating-rings.mjs --reuse-regular=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/2026-08-29-planar-co-rotating-n-n-circular-balance.v3.json --out=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/reproduction.json",
      receiptCommand: "node scripts/build-machine-artifact-receipts.mjs --target=ring --write",
      exactByteReproduction: false,
      exactByteLimitation: "The producer records elapsed wall time; compare the declared domain, result rows, and hashes rather than the complete output bytes.",
    },
    claimBoundary: "Prescribed acceleration-balance evidence only; no retention, binding, stability, release survival, physical identity, score increase, or scientific acceptance follows.",
  };
}

function buildPhotonReceipt() {
  const raw = readArtifact(PHOTON_RAW);
  return {
    schema: "app-photon/helical-self-hit-phase-lock-sweep-receipt.v1",
    receiptId: "helical-self-hit-phase-lock-sweep-v1",
    sourceRecord: {
      schema: raw.json.schema,
      generatingCommit: "4047368648927fbb108406f8e08ba0c46da01481",
      deterministic: raw.json.deterministic,
    },
    rawArtifact: {
      retention: "ignored-local-analytical-storage",
      path: raw.relativePath,
      sha256: raw.sha256,
      byteCount: raw.byteCount,
      lineCount: raw.lineCount,
      requiredForRuntime: false,
      requiredForTests: false,
    },
    audit: {
      literalRepositoryConsumersAtMigration: [],
      producer: "src/apps/photon/PhotonSelfHitSweepRuntime.js",
      focusedTest: "tests/photon-runtime.test.js",
      disposition: "full case rows removed from Git; compact summary retained",
    },
    summary: raw.json.summary,
    reproduction: {
      rawCommand:
        "node scripts/photon/run-helical-self-hit-phase-lock-sweep.mjs --write=.local-data/braid-analysis/retained-evidence/photon/helical-self-hit-phase-lock-sweep.v1.json",
      receiptCommand: "node scripts/build-machine-artifact-receipts.mjs --target=photon --write",
      exactByteReproduction: false,
      exactByteLimitation: "A fresh migration rerun reproduced the recorded headline counts but not the historical raw SHA-256 because the case-row schema has since evolved.",
    },
    claimBoundary: "Bounded application diagnostic only; the sweep establishes no retained photon branch, stability, binding, or physical identity.",
  };
}

function compactOrthogonalCycle(cycle) {
  const { residualRows: _residualRows, ...summary } = cycle.summary;
  return {
    beta: cycle.beta,
    phaseSampleCount: cycle.phaseSampleCount,
    fullPeriodInReceptionTime: cycle.fullPeriodInReceptionTime,
    directedPairPhaseRowCount: cycle.directedPairPhaseRootCounts.length,
    rootLedgerPhaseCount: cycle.rootLedgers.length,
    summary,
  };
}

function buildOrthogonalReceipt() {
  const raw = readArtifact(ORTHOGONAL_RAW);
  const record = raw.json;
  const seedControl = record.completeRootLedgers.seed.summary.residualRows.find(
    (row) => row.phase === 0 && row.receiverId === "a1+",
  );
  if (!seedControl) throw new Error("orthogonal-plane weave seed control is missing");
  return {
    schema: "braid-program/orthogonal-plane-weave-complete-cycle-receipt.v1",
    receiptId: "orthogonal-plane-weave-complete-cycle-2026-08-29-v1",
    sourceRecord: {
      schema: record.schema,
      date: record.date,
      generatingCommit: "581724a4f70b417d6a336c941cbab8b010b040d8",
    },
    rawArtifact: {
      retention: "ignored-local-analytical-storage",
      path: raw.relativePath,
      historicalRepositoryPath:
        "reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json",
      sha256: raw.sha256,
      byteCount: raw.byteCount,
      lineCount: raw.lineCount,
      requiredForRuntime: false,
      requiredForTests: false,
      frozenByIndependentCertificate: true,
    },
    modelScope: record.modelScope,
    geometry: record.geometry,
    search: {
      coarse: {
        betaDomain: record.search.coarse.betaDomain,
        betaStep: record.search.coarse.betaStep,
        addedBetas: record.search.coarse.addedBetas,
        phaseSampleCount: record.search.coarse.phaseSampleCount,
        rowCount: record.search.coarse.rows.length,
      },
      refinement: {
        betaDomain: record.search.refinement.betaDomain,
        betaStep: record.search.refinement.betaStep,
        phaseSampleCount: record.search.refinement.phaseSampleCount,
        rowCount: record.search.refinement.rows.length,
      },
      bestSampledRow: record.search.bestSampledRow,
      binaryCircularTangentialZeroControls: record.search.binaryCircularTangentialZeroControls,
      phaseRefinement: record.search.phaseRefinement,
    },
    detailedCycleControls: Object.fromEntries(
      Object.entries(record.completeRootLedgers).map(([key, cycle]) => [
        key,
        compactOrthogonalCycle(cycle),
      ]),
    ),
    frozenControls: {
      seedPhaseZeroReceiverA1Plus: seedControl,
    },
    numericalCertification: record.numericalCertification,
    claimGrades: record.claimGrades,
    disposition: record.disposition,
    independentChecks: record.independentChecks,
    falsifiers: record.falsifiers,
    exclusions: record.exclusions,
    provenance: record.provenance,
    reproduction: {
      rawCommand:
        "node scripts/prescribed-path-analysis/run-orthogonal-plane-weave-balance.mjs --write .local-data/braid-analysis/retained-evidence/orthogonal-plane-weave/2026-08-29-orthogonal-plane-weave-complete-cycle.v1.json",
      receiptCommand: "node scripts/build-machine-artifact-receipts.mjs --target=orthogonal --write",
      exactByteReproduction: false,
      exactByteLimitation: "The raw record binds its source state by hashes; regenerate from that state to reproduce the frozen subject exactly.",
    },
    claimBoundary: "Bounded prescribed-history acceleration-balance evidence only; no continuous-beta conclusion, retention, binding, stability, release survival, physical identity, score increase, or scientific acceptance follows.",
  };
}

function buildRingTwelveReceipt() {
  const raw = readArtifact(RING_TWELVE_RAW);
  const record = raw.json;
  const best = record.regularResult.best;
  return {
    schema: "braid-program/planar-n-n-focused-extension-receipt.v1",
    receiptId: "planar-co-rotating-12-12-alternating-2026-08-29-v1",
    compatibilityIdentifier: record.compatibilityIdentifier,
    sourceRecord: {
      schema: record.schema,
      campaignId: record.campaignId,
      generatingCommit: "21cd81b36d23d02ac4f9a9eddf4ae44b2713f8a4",
      model: record.model,
    },
    rawArtifact: {
      retention: "ignored-local-analytical-storage",
      path: raw.relativePath,
      historicalRepositoryPath:
        "reference/priorities/braid-program/evidence/2026-08-29-planar-co-rotating-12-12-alternating.v1.json",
      sha256: raw.sha256,
      byteCount: raw.byteCount,
      lineCount: raw.lineCount,
      requiredForRuntime: false,
      requiredForTests: false,
    },
    declaredScope: record.declaredScope,
    taxonomyDecision: record.taxonomyDecision,
    regularResult: {
      n: record.regularResult.n,
      phaseConfiguration: record.regularResult.phaseConfiguration,
      polarityClass: record.regularResult.polarityClass,
      scanInterval: record.regularResult.scanInterval,
      betaStep: record.regularResult.betaStep,
      sampledBetaCount: record.regularResult.sampledBetaCount,
      best: {
        beta: best.beta,
        rootTopologySignature: best.rootTopologySignature,
        rootCount: best.rootCount,
        compatibleScale: best.compatibleScale,
        residuals: {
          maximumRadial: best.residuals.maximumRadial,
          maximumTangential: best.residuals.maximumTangential,
          maximumAxial: best.residuals.maximumAxial,
          maximumFullVector: best.residuals.maximumFullVector,
        },
        rootCompleteness: best.rootCompleteness,
      },
      verdict: record.regularResult.verdict,
      refinement: record.regularResult.refinement,
    },
    symmetryChecks: record.symmetryChecks,
    independentReference: record.independentReference,
    claimGrade: record.claimGrade,
    excludedClaims: record.excludedClaims,
    falsifier: record.falsifier,
    execution: record.execution,
    reproduction: {
      rawCommand:
        "node scripts/equation-mapping/analyze-planar-co-rotating-12-12-alternating.mjs --out=.local-data/braid-analysis/retained-evidence/planar-co-rotating-rings/2026-08-29-planar-co-rotating-12-12-alternating.v1.json",
      receiptCommand: "node scripts/build-machine-artifact-receipts.mjs --target=ring12 --write",
      exactByteReproduction: false,
      exactByteLimitation: "The producer records elapsed wall time; compare the declared search, promoted candidate, and raw hash rather than the complete output bytes.",
    },
    claimBoundary: "One regular alternating 12:12 prescribed acceleration-balance candidate only; no complete polarity census, retention, binding, stability, release survival, physical identity, score increase, or scientific acceptance follows.",
  };
}

function writeOrCheck(relativePath, value, mode) {
  const serialized = `${JSON.stringify(value, null, 2)}\n`;
  const absolutePath = path.join(ROOT, relativePath);
  if (mode === "--write") {
    writeFileSync(absolutePath, serialized);
    process.stdout.write(`wrote ${relativePath}\n`);
    return;
  }
  const current = readFileSync(absolutePath, "utf8");
  if (current !== serialized) {
    throw new Error(`${relativePath} is stale; run node scripts/build-machine-artifact-receipts.mjs --write`);
  }
  process.stdout.write(`checked ${relativePath}\n`);
}

const options = parseArguments(process.argv.slice(2));
if (options.target === "all" || options.target === "ring") {
  writeOrCheck(RING_RECEIPT, buildRingReceipt(), options.mode);
}
if (options.target === "all" || options.target === "photon") {
  writeOrCheck(PHOTON_RECEIPT, buildPhotonReceipt(), options.mode);
}
if (options.target === "all" || options.target === "orthogonal") {
  writeOrCheck(ORTHOGONAL_RECEIPT, buildOrthogonalReceipt(), options.mode);
}
if (options.target === "all" || options.target === "ring12") {
  writeOrCheck(RING_TWELVE_RECEIPT, buildRingTwelveReceipt(), options.mode);
}
