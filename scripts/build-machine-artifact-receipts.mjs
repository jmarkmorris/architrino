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
  "reference/priorities/app-photon/helical-self-hit-phase-lock-sweep.receipt.v1.json";

function parseArguments(argv) {
  const modes = argv.filter((argument) => argument === "--write" || argument === "--check");
  if (modes.length !== 1) {
    throw new TypeError("choose exactly one of --write or --check");
  }
  const targetArgument = argv.find((argument) => argument.startsWith("--target="));
  const target = targetArgument?.slice("--target=".length) ?? "all";
  if (!new Set(["all", "ring", "photon"]).has(target)) {
    throw new TypeError("--target must be all, ring, or photon");
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
