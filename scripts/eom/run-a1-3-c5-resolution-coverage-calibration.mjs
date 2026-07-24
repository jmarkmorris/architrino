#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  appendFileSync,
  existsSync,
  lstatSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  renameSync,
  statSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  isMainThread,
  parentPort,
  Worker,
  workerData,
} from "node:worker_threads";

import {
  analyzeCompactFamilySweep,
} from "./analyze-compact-family-sweep.mjs";
import {
  DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH,
  loadAllCandidateCampaignRegistry,
} from "../../src/prescribed-path-analysis/AllCandidateAnalyticalCampaign.mjs";
import {
  createCompactCoverageProtocol,
  evaluateCompactMonteCarloCase,
  FULL_TAXONOMY_SAMPLER_ID,
} from "../../src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs";
import {
  createPrescribedRecordAnalysisSession,
  evaluatePrescribedRecordAnalysis,
} from "../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";
import {
  buildB1SurfaceEventAnalysisProtocol,
} from "../../src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs";
import {
  evaluateB1StreamingSurfaceReductions,
} from "../../src/prescribed-path-analysis/B1StreamingReductions.mjs";
import {
  validateExactPrescribedSourceRecord,
} from "../../src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs";
import {
  createPrescribedBraidExactSourceRecord,
} from "./generate-prescribed-braid-record.mjs";

export const CALIBRATION_SCHEMA =
  "prescribed-path-analysis/a1-3-c5-resolution-coverage-calibration.v1";
export const RECEIPT_SHA256 =
  "7ab3eda7a567b72ac073aa23d45e07072d25840d4e9643a25ead65ce791e71f6";
export const COVERAGE_PROTOCOL_HASH =
  "6fd0490db0cce13732a4483082a836480a6e91f18679c69f37faca2491f3e2db";
export const FULL_PROTOCOL_HASH =
  "28de1f3583d6e8af5a95ded454643f56ce4dbc4d4fa0fa0a0b99a7ea9fcb93b8";
export const FROZEN_IMPLEMENTATION_HASH =
  "d6d9b8e99ebde7321df69522ae014a8366919c644c34424a03478e42b4e021f9";
export const FROZEN_SAMPLER_ID =
  "constraint-preserving-full-taxonomy/sha256-counter-v1";
export const TARGET_MEMBERS = Object.freeze(["A1.3", "C5"]);
export const EXPECTED = Object.freeze({
  draws: 693,
  evaluated: 674,
  notEvaluated: 19,
  campaignFiles: 45,
  shardFiles: 24,
  memberFiles: 21,
  perMember: 33,
});

const DEFAULT_PACKET =
  "reference/priorities/braid-program/a1-3-c5-resolution-and-coverage-calibration-protocol.md";
const DEFAULT_SWEEP_INPUT =
  ".local-data/braid-analysis/compact-monte-carlo/family-sweep-v1";
const DEFAULT_RECEIPT =
  `${DEFAULT_SWEEP_INPUT}/final-sweep-analyzer-receipt.v1.json`;
const DEFAULT_OUTPUT =
  ".local-data/braid-analysis/resolution-calibration/a1-3-c5-and-full-taxonomy-v1.json";
const CAMPAIGN_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-campaign.v1";
const CASE_SCHEMA =
  "prescribed-path-analysis/compact-monte-carlo-case.v1";
const SHA256_PATTERN = /^[0-9a-f]{64}$/;
const IMPLEMENTATION_FILES = Object.freeze([
  "scripts/eom/run-compact-monte-carlo.mjs",
  "src/prescribed-path-analysis/CompactMonteCarloCampaign.mjs",
  "src/prescribed-path-analysis/CompleteCycleAnalyticalCampaign.mjs",
  "src/prescribed-path-analysis/B1StreamingReductions.mjs",
  "src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs",
  "src/prescribed-path-analysis/ExactPrescribedSourceWake.mjs",
  "scripts/eom/generate-prescribed-braid-record.mjs",
]);
const ROOT_TIERS = Object.freeze({
  R0: Object.freeze({ tolerance: 1e-12, maxIterations: 128 }),
  R1: Object.freeze({ tolerance: 1e-14, maxIterations: 192 }),
  R2: Object.freeze({ tolerance: 1e-15, maxIterations: 256 }),
});
const SURFACE_LEVELS = Object.freeze({
  S0: Object.freeze({
    primary: Object.freeze({
      timeSamples: 12,
      polarOrder: 8,
      azimuthCount: 16,
    }),
    refined: Object.freeze({
      timeSamples: 24,
      polarOrder: 12,
      azimuthCount: 24,
    }),
  }),
  S1: Object.freeze({
    primary: Object.freeze({
      timeSamples: 24,
      polarOrder: 12,
      azimuthCount: 24,
    }),
    refined: Object.freeze({
      timeSamples: 48,
      polarOrder: 16,
      azimuthCount: 32,
    }),
  }),
  S2: Object.freeze({
    primary: Object.freeze({
      timeSamples: 48,
      polarOrder: 16,
      azimuthCount: 32,
    }),
    refined: Object.freeze({
      timeSamples: 96,
      polarOrder: 20,
      azimuthCount: 40,
    }),
  }),
});
const CLASSIFICATIONS = Object.freeze([
  "both-pass",
  "both-reject",
  "coverage-false-negative",
  "coverage-false-positive",
  "inconclusive-compact-not-evaluated",
  "inconclusive-full-not-evaluated",
  "inconclusive-neither-evaluated",
]);
const CLAIM_BOUNDARY = Object.freeze({
  claimGrade: "measured",
  diagnosticOnly: true,
  independentAcceptancePerformed: false,
  pathEvolutionInvoked: false,
  eomSolverInvoked: false,
  sourcePathsPrescribed: true,
  excludedClaims: Object.freeze([
    "stability",
    "retention",
    "energy closure",
    "binding",
    "quantization",
    "particle identity",
    "catalog acceptance",
    "physical realization",
  ]),
});

function fail(message) {
  throw new Error(message);
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

export function canonicalJson(value) {
  return JSON.stringify(canonicalize(value));
}

export function sha256Canonical(value) {
  return createHash("sha256").update(canonicalJson(value)).digest("hex");
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function compareText(left, right) {
  return String(left).localeCompare(String(right), undefined, { numeric: true });
}

function requiredSha256(value, label) {
  if (typeof value !== "string" || !SHA256_PATTERN.test(value)) {
    fail(`${label} must be a lowercase hexadecimal SHA-256.`);
  }
  return value;
}

function readStableBytes(file, label = file) {
  const link = lstatSync(file);
  if (!link.isFile() || link.isSymbolicLink()) {
    fail(`${label} must be a regular non-symlink file.`);
  }
  const before = statSync(file);
  const bytes = readFileSync(file);
  const after = statSync(file);
  if (before.size !== after.size ||
      before.mtimeMs !== after.mtimeMs ||
      bytes.length !== after.size) {
    fail(`${label} changed during its stable read.`);
  }
  return bytes;
}

function readStableJson(file, label = file) {
  const bytes = readStableBytes(file, label);
  let value;
  try {
    value = JSON.parse(bytes.toString("utf8"));
  } catch {
    fail(`${label} is not complete JSON.`);
  }
  return { bytes, value };
}

function assertEqual(actual, expected, label) {
  if (canonicalJson(actual) !== canonicalJson(expected)) {
    fail(`${label} differs from its frozen declaration.`);
  }
}

function countBy(values) {
  const counts = new Map();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return Object.fromEntries(
    [...counts.entries()].sort(([left], [right]) => compareText(left, right)),
  );
}

function zeroClassificationCounts() {
  return Object.fromEntries(CLASSIFICATIONS.map((key) => [key, 0]));
}

export function assertProtocolPacketContract(packetText) {
  if (typeof packetText !== "string" || packetText.length === 0) {
    fail("calibration packet must be nonempty text.");
  }
  const requiredFragments = [
    `\`${RECEIPT_SHA256}\``,
    `\`${FROZEN_IMPLEMENTATION_HASH}\``,
    `\`${FULL_PROTOCOL_HASH}\``,
    `\`${COVERAGE_PROTOCOL_HASH}\``,
    "| R0 | $10^{-12}$ | 128 |",
    "| R1 | $10^{-14}$ | 192 |",
    "| R2 | $10^{-15}$ | 256 |",
    "| S0 | $12\\times8\\times16$ | $24\\times12\\times24$ | $1,1.25,1.5,2$ |",
    "| S1 | $24\\times12\\times24$ | $48\\times16\\times32$ | $1,1.25,1.5,2$ |",
    "| S2 | $48\\times16\\times32$ | $96\\times20\\times40$ | $1,1.25,1.5,2$ |",
    "At least 59 jointly evaluated full-resolution passes",
    "`calibration-insufficient`",
    "canonical merged campaign",
    "It does not evolve a path",
    "the EOM solver, independently validate the acceleration law",
  ];
  const missing = requiredFragments.filter(
    (fragment) => !packetText.includes(fragment),
  );
  if (missing.length > 0) {
    fail(
      "calibration packet contract drifted; missing frozen declaration(s): " +
      missing.join(", "),
    );
  }
  return {
    receiptSha256: RECEIPT_SHA256,
    implementationHash: FROZEN_IMPLEMENTATION_HASH,
    coverageProtocolHash: COVERAGE_PROTOCOL_HASH,
    fullProtocolHash: FULL_PROTOCOL_HASH,
    rootTiers: clone(ROOT_TIERS),
    surfaceLevels: clone(SURFACE_LEVELS),
    minimumJointFullPasses: 59,
  };
}

export function implementationIdentity() {
  const files = IMPLEMENTATION_FILES.map((relativePath) => {
    const bytes = readStableBytes(path.resolve(relativePath), relativePath);
    return {
      path: relativePath,
      sha256: sha256Bytes(bytes),
    };
  });
  return {
    runtime: process.version,
    platform: `${process.platform}/${process.arch}`,
    files,
    implementationHash: sha256Bytes(
      Buffer.from(JSON.stringify(files)),
    ),
  };
}

function campaignIdentity(campaign) {
  const {
    campaignHash: _campaignHash,
    wallSeconds: _wallSeconds,
    caseRows: _caseRows,
    ...identity
  } = campaign;
  return identity;
}

function caseIdentity(row) {
  const {
    caseHash: _caseHash,
    measuredCost: _measuredCost,
    executionIndex: _executionIndex,
    ...identity
  } = row;
  return identity;
}

function verifyCampaignAgainstManifest({
  sweepInput,
  manifestRow,
}) {
  const absolutePath = path.resolve(sweepInput, manifestRow.file);
  const { bytes, value: campaign } = readStableJson(
    absolutePath,
    manifestRow.file,
  );
  if (sha256Bytes(bytes) !== manifestRow.fileSha256) {
    fail(`${manifestRow.file} byte hash differs from the sealed receipt.`);
  }
  if (campaign.schema !== CAMPAIGN_SCHEMA) {
    fail(`${manifestRow.file} has an unsupported campaign schema.`);
  }
  if (campaign.campaignHash !== manifestRow.campaignHash ||
      campaign.campaignId !== manifestRow.campaignId ||
      campaign.protocolHash !== manifestRow.protocolHash ||
      campaign.implementationIdentity?.implementationHash !==
        manifestRow.implementationHash) {
    fail(`${manifestRow.file} identity differs from the sealed manifest.`);
  }
  if (sha256Canonical(campaign.protocol) !== campaign.protocolHash ||
      sha256Canonical(campaignIdentity(campaign)) !== campaign.campaignHash) {
    fail(`${manifestRow.file} protocol or campaign hash does not reproduce.`);
  }
  if (!Array.isArray(campaign.caseRows) ||
      !Array.isArray(campaign.cases) ||
      campaign.caseRows.length !== campaign.caseCount ||
      campaign.cases.length !== campaign.caseCount) {
    fail(`${manifestRow.file} case inventory is incomplete.`);
  }
  campaign.caseRows.forEach((row, index) => {
    if (row.schema !== CASE_SCHEMA ||
        sha256Canonical(caseIdentity(row)) !== row.caseHash ||
        (row.score === null
          ? row.scoreHash !== null
          : sha256Canonical(row.score) !== row.scoreHash)) {
      fail(`${manifestRow.file}.caseRows[${index}] fails its retained hash.`);
    }
    const compact = campaign.cases[index];
    if (compact?.caseId !== row.caseId ||
        compact?.caseHash !== row.caseHash ||
        compact?.scoreHash !== row.scoreHash ||
        compact?.executionIndex !== row.executionIndex) {
      fail(`${manifestRow.file}.cases[${index}] differs from its retained row.`);
    }
  });
  return {
    manifest: clone(manifestRow),
    campaign,
  };
}

function frozenMemberIdentity(rows) {
  return rows.map(({ familyId, memberId, candidateId }) => ({
    familyId,
    memberId,
    candidateId,
  })).sort((left, right) =>
    compareText(left.familyId, right.familyId) ||
    compareText(left.memberId, right.memberId) ||
    compareText(left.candidateId, right.candidateId));
}

export function verifyReceiptAndPacket({
  packetPath = DEFAULT_PACKET,
  sweepInput = DEFAULT_SWEEP_INPUT,
  receiptPath = DEFAULT_RECEIPT,
  loadCampaignRows = true,
} = {}) {
  const packetBytes = readStableBytes(path.resolve(packetPath), "packet");
  const packetText = packetBytes.toString("utf8");
  assertProtocolPacketContract(packetText);
  const packetSha256 = sha256Bytes(packetBytes);
  const { bytes: receiptBytes, value: receipt } = readStableJson(
    path.resolve(receiptPath),
    "sweep receipt",
  );
  const receiptSha256 = sha256Bytes(receiptBytes);
  if (receiptSha256 !== RECEIPT_SHA256) {
    fail(
      `receipt drift: expected ${RECEIPT_SHA256}, observed ${receiptSha256}.`,
    );
  }
  if (receipt.status !== "terminal-for-declared-boundary" ||
      receipt.coordinatorReceipt?.status !== "terminal-for-declared-boundary") {
    fail("receipt is not terminal for its declared boundary.");
  }
  const terminal = receipt.terminalBoundary;
  if (terminal?.declared !== true ||
      terminal?.terminal !== true ||
      terminal?.expectedTotalCampaignFileCount !== EXPECTED.campaignFiles ||
      terminal?.discoveredInBoundaryCampaignFileCount !==
        EXPECTED.campaignFiles ||
      terminal?.validInBoundaryCampaignFileCount !== EXPECTED.campaignFiles ||
      terminal?.laterThanBoundaryFiles?.length !== 0 ||
      terminal?.unexpectedInBoundaryFiles?.length !== 0 ||
      terminal?.defects?.length !== 0) {
    fail("receipt terminal boundary is inadmissible.");
  }
  const coordinator = receipt.coordinatorReceipt;
  if (coordinator?.completedCampaignFileCount !== EXPECTED.campaignFiles ||
      coordinator?.skippedCampaignFileCount !== 0 ||
      coordinator?.terminalBoundaryDeclared !== true ||
      coordinator?.terminalBoundarySatisfied !== true ||
      coordinator?.terminalBoundaryDefectCount !== 0 ||
      coordinator?.expectedDrawCount !== EXPECTED.draws ||
      coordinator?.actualDrawCount !== EXPECTED.draws) {
    fail("receipt coordinator counts or terminal flags differ.");
  }
  if (receipt.skippedFiles?.length !== 0 ||
      receipt.drawCounts?.expected !== EXPECTED.draws ||
      receipt.drawCounts?.actual !== EXPECTED.draws ||
      receipt.drawCounts?.evaluated !== EXPECTED.evaluated ||
      receipt.drawCounts?.notEvaluated !== EXPECTED.notEvaluated ||
      receipt.drawCounts?.nullScoreRows !== EXPECTED.notEvaluated) {
    fail("receipt draw census differs from the sealed population.");
  }
  const manifest = receipt.campaignAndFileManifest;
  if (manifest?.canonicalMergedCampaignCreated !== false ||
      manifest?.campaignFiles?.length !== EXPECTED.campaignFiles ||
      receipt.coordinatorReceipt?.canonicalMergedCampaignCreated !== false ||
      receipt.coordinatorReceipt?.distinctCampaignIdentitiesPreserved !==
        true) {
    fail("receipt merged or lost distinct campaign identities.");
  }
  const fileKinds = countBy(manifest.campaignFiles.map((row) => row.fileKind));
  if (fileKinds.shard !== EXPECTED.shardFiles ||
      fileKinds.member !== EXPECTED.memberFiles) {
    fail("receipt shard/member file census differs.");
  }
  manifest.campaignFiles.forEach((row, index) => {
    for (const key of [
      "file",
      "fileSha256",
      "campaignId",
      "campaignHash",
      "protocolHash",
      "implementationHash",
    ]) {
      if (typeof row[key] !== "string" || row[key].length === 0) {
        fail(`receipt manifest row ${index} lacks ${key}.`);
      }
    }
    if (row.campaignHashVerified !== true) {
      fail(`receipt manifest row ${index} is not campaign-hash verified.`);
    }
  });
  assertEqual(
    receipt.frozenIdentitySet?.samplerIds,
    [FROZEN_SAMPLER_ID],
    "receipt sampler identity",
  );
  assertEqual(
    receipt.frozenIdentitySet?.protocolHashes,
    [COVERAGE_PROTOCOL_HASH],
    "receipt compact protocol identity",
  );
  assertEqual(
    receipt.frozenIdentitySet?.implementationHashes,
    [FROZEN_IMPLEMENTATION_HASH],
    "receipt implementation identity",
  );
  assertEqual(
    receipt.frozenIdentitySet?.fieldSpeeds,
    [1],
    "receipt fieldSpeed identity",
  );
  if (receipt.frozenIdentitySet?.members?.length !== EXPECTED.memberFiles) {
    fail("receipt does not contain all 21 member identities.");
  }
  for (const member of receipt.perMemberCounts ?? []) {
    if (member.expectedDrawCount !== EXPECTED.perMember ||
        member.actualDrawCount !== EXPECTED.perMember) {
      fail(`receipt member ${member.memberId} does not contain 33 draws.`);
    }
  }
  for (const memberId of TARGET_MEMBERS) {
    const member = receipt.perMemberCounts.find(
      (row) => row.memberId === memberId,
    );
    if (member?.actualDrawCount !== EXPECTED.perMember) {
      fail(`receipt target ${memberId} does not contain 33 draws.`);
    }
  }
  const freshReceipt = analyzeCompactFamilySweep({
    inputDirectory: path.resolve(sweepInput),
    throughWave: 4,
    expectedPilotShardCount: 6,
    expectedWaveShardCount: 6,
    expectedWave3MemberCount: 21,
  });
  if (canonicalJson(freshReceipt) !== canonicalJson(receipt)) {
    fail(
      "receipt analysisHash, manifestHash, or analyzer result does not reproduce.",
    );
  }
  if (freshReceipt.coordinatorReceipt.analysisHash !==
        receipt.coordinatorReceipt.analysisHash ||
      freshReceipt.coordinatorReceipt.manifestHash !==
        receipt.coordinatorReceipt.manifestHash) {
    fail("receipt internal analysis or manifest hash differs.");
  }
  const loaded = loadAllCandidateCampaignRegistry(
    path.resolve(DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH),
  );
  const fullProtocolHash = sha256Canonical(loaded.protocol);
  const coverageProtocolHash = sha256Canonical(
    createCompactCoverageProtocol(loaded.protocol),
  );
  if (fullProtocolHash !== FULL_PROTOCOL_HASH ||
      coverageProtocolHash !== COVERAGE_PROTOCOL_HASH ||
      loaded.protocol.eventEvaluator?.fieldSpeed !== 1) {
    fail("current full/coverage protocol or fieldSpeed differs from the lock.");
  }
  const registryMembers = frozenMemberIdentity(
    loaded.candidates.map((candidate) => candidate.declaration),
  );
  assertEqual(
    registryMembers,
    frozenMemberIdentity(receipt.frozenIdentitySet.members),
    "registry member identities",
  );
  const currentImplementation = implementationIdentity();
  if (currentImplementation.implementationHash !==
      FROZEN_IMPLEMENTATION_HASH) {
    fail(
      "frozen compact implementation cannot be reproduced; calibration stopped.",
    );
  }
  const campaigns = loadCampaignRows
    ? manifest.campaignFiles.map((manifestRow) =>
      verifyCampaignAgainstManifest({ sweepInput, manifestRow }))
    : [];
  const census = campaigns.flatMap(({ manifest: manifestRow, campaign }) =>
    campaign.caseRows.map((row) => ({
      source: {
        file: manifestRow.file,
        fileKind: manifestRow.fileKind,
        fileSha256: manifestRow.fileSha256,
        campaignId: campaign.campaignId,
        campaignHash: campaign.campaignHash,
        protocolHash: campaign.protocolHash,
        implementationHash:
          campaign.implementationIdentity.implementationHash,
      },
      compactRow: row,
    })));
  if (loadCampaignRows) {
    if (census.length !== EXPECTED.draws ||
        census.filter(({ compactRow }) =>
          compactRow.evaluationStatus?.evaluated === true &&
          compactRow.score !== null).length !== EXPECTED.evaluated ||
        census.filter(({ compactRow }) =>
          compactRow.evaluationStatus?.evaluated !== true ||
          compactRow.score === null).length !== EXPECTED.notEvaluated) {
      fail("loaded campaign census differs from the receipt.");
    }
    const targetCounts = countBy(census
      .filter(({ compactRow }) => TARGET_MEMBERS.includes(compactRow.memberId))
      .map(({ compactRow }) => compactRow.memberId));
    for (const memberId of TARGET_MEMBERS) {
      if (targetCounts[memberId] !== EXPECTED.perMember) {
        fail(`loaded target ${memberId} count differs from the receipt.`);
      }
    }
  }
  return {
    packetPath: path.resolve(packetPath),
    packetSha256,
    receiptPath: path.resolve(receiptPath),
    receiptSha256,
    receipt,
    sweepInput: path.resolve(sweepInput),
    currentImplementation,
    loaded,
    campaigns,
    census,
  };
}

function exactSampleFromRetainedRow(row) {
  return {
    spec: clone(row.exactRerunInstruction.sampledSpec),
    coordinates: clone(row.sampling.coordinates),
    samplerId: row.sampling.samplerId,
    samplingDisposition: row.sampling.disposition,
  };
}

function evaluateExactRetainedCase({
  candidate,
  retainedRow,
  protocol,
  implementation,
  onProgress = null,
}) {
  const result = evaluateCompactMonteCarloCase({
    candidate,
    protocol,
    seed: retainedRow.sampling.seed,
    sampleOrdinal: retainedRow.sampleOrdinal,
    sample: () => exactSampleFromRetainedRow(retainedRow),
    samplerId: FULL_TAXONOMY_SAMPLER_ID,
    implementationIdentity: implementation,
    onProgress,
  });
  if (result.exactRerunInstruction.sampledSpecHash !==
        retainedRow.exactRerunInstruction.sampledSpecHash ||
      result.exactRerunInstruction.exactSourceHash !==
        retainedRow.exactRerunInstruction.exactSourceHash) {
    fail(`exact source drift for ${retainedRow.caseHash}.`);
  }
  return result;
}

function exactSourceForRow(candidate, row) {
  const sampledSpec = row.exactRerunInstruction.sampledSpec;
  const sampledSpecHash = sha256Canonical(sampledSpec);
  if (sampledSpecHash !== row.exactRerunInstruction.sampledSpecHash) {
    fail(`sampled specification hash drift for ${row.caseHash}.`);
  }
  const exactSource = validateExactPrescribedSourceRecord(
    createPrescribedBraidExactSourceRecord(sampledSpec, {
      sourceHash: sampledSpecHash,
      generatingSpec: candidate.declaration.specPath,
    }),
  );
  if (sha256Canonical(exactSource) !==
      row.exactRerunInstruction.exactSourceHash) {
    fail(`exact source preimage drift for ${row.caseHash}.`);
  }
  return exactSource;
}

function withRootPair(protocol, primary, refined) {
  const next = clone(protocol);
  next.eventEvaluator.rootPolicy.tolerance = primary.tolerance;
  next.eventEvaluator.rootPolicy.maxIterations = primary.maxIterations;
  next.eventEvaluator.convergence.rootTolerance = refined.tolerance;
  next.eventEvaluator.convergence.maxIterations = refined.maxIterations;
  return next;
}

export function buildSurfaceLadderProtocol(fullProtocol, level) {
  const grids = SURFACE_LEVELS[level];
  if (!grids) fail(`unknown surface level ${level}.`);
  const protocol = withRootPair(
    fullProtocol,
    ROOT_TIERS.R1,
    ROOT_TIERS.R2,
  );
  protocol.completeCycle.primary = clone(grids.primary);
  protocol.completeCycle.refined = clone(grids.refined);
  assertEqual(
    protocol.enclosingSurfaces.radii,
    [1, 1.25, 1.5, 2],
    `${level} retained radii`,
  );
  return protocol;
}

function batchProtocol(fullEventProtocol, timeIndex) {
  return {
    ...fullEventProtocol,
    protocolId:
      `${fullEventProtocol.protocolId}-calibration-time-` +
      `${String(timeIndex).padStart(3, "0")}`,
    probes: fullEventProtocol.probes.map((probe) => ({
      ...probe,
      observationTimes: [probe.observationTimes[timeIndex]],
    })),
  };
}

function eventRootIdentities(event) {
  return event.roots.map((root) => ({
    transmitterId: root.transmitterId,
    rootOrdinal: root.rootOrdinal,
  }));
}

function eventIdentityRows(packet) {
  return packet.rawLedgers.causalRoots.map((event) => ({
    eventId: event.eventId,
    roots: eventRootIdentities(event),
    noRoots: event.noRootTransmitters.map((row) => row.transmitterId).sort(),
  }));
}

function maximumConvergenceEntry(packet) {
  const entries = packet.rawLedgers.numericalConvergence;
  let best = null;
  for (const entry of entries) {
    const components = {
      maximumEmissionTimeChange: entry.maximumEmissionTimeChange,
      signedWakeChange: entry.signedWakeChange,
      unsignedWakeChange: entry.unsignedWakeChange,
      signedCancellationRatioChange:
        entry.signedCancellationRatioChange,
      maximumProbeAccelerationComponentChange:
        entry.maximumProbeAccelerationComponentChange,
    };
    for (const [component, value] of Object.entries(components)) {
      if (typeof value === "number" && Number.isFinite(value) &&
          (!best || value > best.value)) {
        best = {
          eventId: entry.eventId,
          component,
          value,
          rootIdentityMatch: entry.rootIdentityMatch,
        };
      }
    }
  }
  return best;
}

function summarizeRootBatch(packet) {
  const identities = eventIdentityRows(packet);
  return {
    eventCount: identities.length,
    rootCount: packet.rawLedgers.causalRoots.reduce(
      (sum, event) => sum + event.roots.length,
      0,
    ),
    eventIdentityHash: sha256Canonical(identities),
    rootIdentitiesMatch:
      packet.reducedMeasures.numericalConvergence.eventConvergence
        .rootIdentitiesMatch,
    rootTopologyComplete:
      packet.reducedMeasures.validity.rootTopologyComplete,
    rootTransversalityMargin:
      packet.reducedMeasures.rootTransversalityMargin,
    rootTransversalityPassed:
      packet.reducedMeasures.validity.rootTransversalityPassed,
    minimumSeparationPassed:
      packet.reducedMeasures.validity.minimumSeparationPassed,
    maximumReportedChange:
      packet.reducedMeasures.numericalConvergence.maximumReportedChange,
    convergencePassed:
      packet.reducedMeasures.numericalConvergence.passed,
    worstEntry: maximumConvergenceEntry(packet),
  };
}

function rootIdentityMatchAcrossPrimaryLedgers(left, right) {
  return canonicalJson(eventIdentityRows(left)) ===
    canonicalJson(eventIdentityRows(right));
}

function updateWorst(current, candidate, context) {
  if (!candidate || !Number.isFinite(candidate.value)) return current;
  if (!current || candidate.value > current.value) {
    return { ...context, ...candidate };
  }
  return current;
}

function rootFailure(error, stage) {
  return {
    code: "root-ladder-evaluation-error",
    stage,
    errorName: error?.name ?? "Error",
    message: error?.message ?? String(error),
    details: error?.details == null ? null : clone(error.details),
  };
}

function evaluateRootResolutionLadder({
  fullProtocol,
  exactSource,
  row,
  progress,
}) {
  const r0r1Protocol = clone(createCompactCoverageProtocol(fullProtocol));
  const r1r2Protocol = buildSurfaceLadderProtocol(fullProtocol, "S0");
  const r0Session = createPrescribedRecordAnalysisSession(exactSource);
  const r1Session = createPrescribedRecordAnalysisSession(exactSource);
  const batches = [];
  let r0r1Worst = null;
  let r1r2Worst = null;
  let eventCount = 0;
  let allComplete = true;
  let allIdentitiesMatch = true;
  let allTransverse = true;
  let allSeparated = true;
  try {
    for (const resolution of ["primary", "refined"]) {
      for (const radius of r0r1Protocol.enclosingSurfaces.radii) {
        const r0Full = buildB1SurfaceEventAnalysisProtocol(
          r0r1Protocol,
          { radius, resolution },
        );
        const r1Full = buildB1SurfaceEventAnalysisProtocol(
          r1r2Protocol,
          { radius, resolution },
        );
        const timeCount =
          r0r1Protocol.completeCycle[resolution].timeSamples;
        for (let timeIndex = 0; timeIndex < timeCount; timeIndex += 1) {
          progress?.({
            stage: "target-root-batch",
            caseHash: row.caseHash,
            resolution,
            radius,
            timeIndex,
            timeCount,
          });
          const r0Packet = evaluatePrescribedRecordAnalysis({
            sourceRecord: exactSource,
            protocol: batchProtocol(r0Full, timeIndex),
            session: r0Session,
            resultMode: "compact-event-batch",
          });
          const r1Packet = evaluatePrescribedRecordAnalysis({
            sourceRecord: exactSource,
            protocol: batchProtocol(r1Full, timeIndex),
            session: r1Session,
            resultMode: "compact-event-batch",
          });
          const r0 = summarizeRootBatch(r0Packet);
          const r1 = summarizeRootBatch(r1Packet);
          const primaryIdentityMatch =
            rootIdentityMatchAcrossPrimaryLedgers(r0Packet, r1Packet);
          const descriptor = {
            resolution,
            radius,
            timeIndex,
            observationTime:
              r0Full.probes[0].observationTimes[timeIndex],
            eventCount: r0.eventCount,
            r0r1: r0,
            r1r2: r1,
            r0r1PrimaryIdentityMatchesR1Primary: primaryIdentityMatch,
          };
          batches.push(descriptor);
          eventCount += r0.eventCount;
          allComplete = allComplete &&
            r0.rootTopologyComplete && r1.rootTopologyComplete;
          allIdentitiesMatch = allIdentitiesMatch &&
            r0.rootIdentitiesMatch && r1.rootIdentitiesMatch &&
            primaryIdentityMatch;
          allTransverse = allTransverse &&
            r0.rootTransversalityPassed && r1.rootTransversalityPassed;
          allSeparated = allSeparated &&
            r0.minimumSeparationPassed && r1.minimumSeparationPassed;
          r0r1Worst = updateWorst(
            r0r1Worst,
            r0.worstEntry,
            { resolution, radius, timeIndex },
          );
          r1r2Worst = updateWorst(
            r1r2Worst,
            r1.worstEntry,
            { resolution, radius, timeIndex },
          );
        }
      }
    }
  } catch (error) {
    return {
      status: "root-resolution-unresolved",
      settled: false,
      failure: rootFailure(error, "root-resolution-sequence"),
      completedBatchCount: batches.length,
      eventCount,
      batches,
    };
  }
  const r0r1Maximum = r0r1Worst?.value ?? 0;
  const r1r2Maximum = r1r2Worst?.value ?? 0;
  const settlingRatioPassed =
    r0r1Maximum <= 1e-9 ||
    r1r2Maximum <= r0r1Maximum / 2;
  const failures = [];
  if (!allComplete) failures.push("incomplete-root-ledger");
  if (!allIdentitiesMatch) failures.push("root-identity-mismatch");
  if (!allTransverse) failures.push("root-transversality-floor-failed");
  if (!allSeparated) failures.push("minimum-separation-floor-failed");
  if (r1r2Maximum > 1e-9) {
    failures.push("r1-r2-event-convergence-failed");
  }
  if (!settlingRatioPassed) {
    failures.push("r1-r2-improvement-ratio-failed");
  }
  const settled = failures.length === 0;
  return {
    status: settled
      ? "root-resolution-settled"
      : "root-resolution-unresolved",
    settled,
    protocol: {
      R0: clone(ROOT_TIERS.R0),
      R1: clone(ROOT_TIERS.R1),
      R2: clone(ROOT_TIERS.R2),
      convergenceAbsolute: 1e-9,
      transversalityFloor: 1e-8,
      retainedEventInventory: "S0 primary and refined four-radius surface inventory",
    },
    completedBatchCount: batches.length,
    eventCount,
    allComplete,
    allIdentitiesMatch,
    allTransverse,
    allSeparated,
    r0r1MaximumReportedChange: r0r1Maximum,
    r0r1Worst,
    r1r2MaximumReportedChange: r1r2Maximum,
    r1r2Worst,
    settlingRatioPassed,
    failures,
    identityLedgerHash: sha256Canonical(batches.map((batch) => ({
      resolution: batch.resolution,
      radius: batch.radius,
      timeIndex: batch.timeIndex,
      r0r1: batch.r0r1.eventIdentityHash,
      r1r2: batch.r1r2.eventIdentityHash,
    }))),
    batches,
  };
}

function collectMatchingWorstEntries(value, target, results, trail = []) {
  if (results.length >= 8) return;
  if (typeof value === "number" && value === target) {
    results.push({ path: trail.join(".") });
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      collectMatchingWorstEntries(item, target, results, [...trail, index]));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      collectMatchingWorstEntries(item, target, results, [...trail, key]);
    }
  }
}

function summarizeSurfaceGates(quadrature) {
  return Object.fromEntries(
    Object.entries(quadrature.gates).map(([gateId, gate]) => {
      const matches = [];
      collectMatchingWorstEntries(
        gate.entries,
        gate.maximumChange,
        matches,
      );
      return [gateId, {
        passed: gate.passed,
        threshold: gate.threshold,
        maximumChange: gate.maximumChange,
        identityMatch: gate.identityMatch ?? null,
        worstEntryPaths: matches,
        entryCount: Array.isArray(gate.entries) ? gate.entries.length : 0,
        entriesHash: sha256Canonical(gate.entries),
      }];
    }),
  );
}

function summarizeSurfaceBatch(packet) {
  const identities = eventIdentityRows(packet);
  return {
    eventCount: identities.length,
    rootCount: packet.rawLedgers.causalRoots.reduce(
      (sum, event) => sum + event.roots.length,
      0,
    ),
    eventIdentityHash: sha256Canonical(identities),
    numericalConvergenceLedgerHash:
      sha256Canonical(packet.rawLedgers.numericalConvergence),
    maximumReportedChange:
      packet.reducedMeasures.numericalConvergence.maximumReportedChange,
    rootIdentitiesMatch:
      packet.reducedMeasures.numericalConvergence.eventConvergence
        .rootIdentitiesMatch,
    rootTransversalityMargin:
      packet.reducedMeasures.rootTransversalityMargin,
    validity: clone(packet.reducedMeasures.validity),
    worstEntry: maximumConvergenceEntry(packet),
  };
}

function evaluateSurfaceLevel({
  fullProtocol,
  exactSource,
  level,
  row,
  progress,
}) {
  const protocol = buildSurfaceLadderProtocol(fullProtocol, level);
  const batches = [];
  const started = performance.now();
  try {
    const result = evaluateB1StreamingSurfaceReductions({
      sourceRecord: exactSource,
      completeCycleProtocol: protocol,
      evidenceMode: "compact",
      onProgress(update) {
        progress?.({
          stage: "target-surface-level",
          level,
          caseHash: row.caseHash,
          ...update,
        });
      },
      onSurfacePacket(packet, context) {
        const summary = {
          radius: context.radius,
          resolution: context.resolution,
          timeIndex: context.timeIndex,
          observationTime: context.observationTime,
          ...summarizeSurfaceBatch(packet),
        };
        batches.push(summary);
        return {
          retention: "hash-and-worst-entry-diagnostic-summary",
          eventIdentityHash: summary.eventIdentityHash,
          numericalConvergenceLedgerHash:
            summary.numericalConvergenceLedgerHash,
        };
      },
    });
    const quadrature = result.convergenceComparisons.quadrature;
    return {
      level,
      status: quadrature.passed ? "passed" : "failed",
      passed: quadrature.passed,
      protocolHash: sha256Canonical(protocol),
      primary: clone(protocol.completeCycle.primary),
      refined: clone(protocol.completeCycle.refined),
      radii: clone(protocol.enclosingSurfaces.radii),
      rootPair: { primary: "R1", refined: "R2" },
      gates: summarizeSurfaceGates(quadrature),
      completedBatchCount: batches.length,
      eventCount: batches.reduce((sum, batch) => sum + batch.eventCount, 0),
      rootCount: batches.reduce((sum, batch) => sum + batch.rootCount, 0),
      identityLedgerHash: sha256Canonical(batches.map((batch) => ({
        radius: batch.radius,
        resolution: batch.resolution,
        timeIndex: batch.timeIndex,
        eventIdentityHash: batch.eventIdentityHash,
      }))),
      batches,
      wallSeconds: (performance.now() - started) / 1_000,
    };
  } catch (error) {
    return {
      level,
      status: "not-completed",
      passed: false,
      protocolHash: sha256Canonical(protocol),
      primary: clone(protocol.completeCycle.primary),
      refined: clone(protocol.completeCycle.refined),
      radii: clone(protocol.enclosingSurfaces.radii),
      rootPair: { primary: "R1", refined: "R2" },
      completedBatchCount: batches.length,
      eventCount: batches.reduce((sum, batch) => sum + batch.eventCount, 0),
      identityLedgerHash: sha256Canonical(batches.map((batch) => ({
        radius: batch.radius,
        resolution: batch.resolution,
        timeIndex: batch.timeIndex,
        eventIdentityHash: batch.eventIdentityHash,
      }))),
      batches,
      failure: rootFailure(error, `surface-${level}`),
      wallSeconds: (performance.now() - started) / 1_000,
    };
  }
}

function candidateMap(loaded) {
  return new Map(loaded.candidates.map(
    (candidate) => [candidate.declaration.candidateId, candidate],
  ));
}

function replayIdentity(row) {
  return {
    caseHash: row.caseHash,
    scoreHash: row.scoreHash,
    evaluationStatus: row.evaluationStatus,
  };
}

function evaluateTargetTask(task, context, progress) {
  const { source, compactRow: row } = task.item;
  const candidate = context.candidates.get(row.candidateId);
  if (!candidate) fail(`target row candidate ${row.candidateId} is absent.`);
  const replay = evaluateExactRetainedCase({
    candidate,
    retainedRow: row,
    protocol: context.coverageProtocol,
    implementation: context.implementation,
    onProgress(update) {
      progress?.({ stage: "target-original-replay", ...update });
    },
  });
  const originalDispositionReproduced =
    canonicalJson(replayIdentity(replay)) ===
      canonicalJson(replayIdentity(row));
  if (!originalDispositionReproduced) {
    return {
      jobId: task.jobId,
      fatal: true,
      fatalCode: "target-original-disposition-replay-mismatch",
      source,
      compactCaseHash: row.caseHash,
      expected: replayIdentity(row),
      observed: replayIdentity(replay),
    };
  }
  const exactSource = exactSourceForRow(candidate, row);
  const root = evaluateRootResolutionLadder({
    fullProtocol: context.fullProtocol,
    exactSource,
    row,
    progress,
  });
  const surface = [];
  if (root.settled) {
    for (const level of Object.keys(SURFACE_LEVELS)) {
      const levelResult = evaluateSurfaceLevel({
        fullProtocol: context.fullProtocol,
        exactSource,
        level,
        row,
        progress,
      });
      surface.push(levelResult);
      if (levelResult.status === "not-completed") break;
    }
  }
  const byLevel = new Map(surface.map((level) => [level.level, level]));
  let disposition = "root-resolution-unresolved";
  if (root.settled) {
    if (surface.some((level) => level.status === "not-completed")) {
      disposition = "invalidated";
    } else if (byLevel.get("S1")?.passed &&
        byLevel.get("S2")?.passed) {
      disposition = "resolution-settled";
    } else {
      disposition = "surface-resolution-unresolved";
    }
  }
  return {
    jobId: task.jobId,
    fatal: false,
    source,
    caseId: row.caseId,
    caseHash: row.caseHash,
    sampledSpecHash: row.exactRerunInstruction.sampledSpecHash,
    exactSourceHash: row.exactRerunInstruction.exactSourceHash,
    familyId: row.familyId,
    memberId: row.memberId,
    candidateId: row.candidateId,
    sampleOrdinal: row.sampleOrdinal,
    originalDispositionReproduced,
    root,
    surface,
    disposition,
    claimBoundary: clone(CLAIM_BOUNDARY),
  };
}

function evaluateFullTask(task, context, progress) {
  const { source, compactRow: row } = task.item;
  const candidate = context.candidates.get(row.candidateId);
  if (!candidate) fail(`full row candidate ${row.candidateId} is absent.`);
  const result = evaluateExactRetainedCase({
    candidate,
    retainedRow: row,
    protocol: context.fullProtocol,
    implementation: context.implementation,
    onProgress(update) {
      progress?.({ stage: "full-resolution-row", ...update });
    },
  });
  return {
    jobId: task.jobId,
    fatal: false,
    source,
    compactCaseHash: row.caseHash,
    fullRow: result,
  };
}

function workerRuntime(registryPath) {
  const loaded = loadAllCandidateCampaignRegistry(registryPath);
  const implementation = implementationIdentity();
  if (implementation.implementationHash !== FROZEN_IMPLEMENTATION_HASH) {
    fail("worker implementation differs from the frozen hash.");
  }
  const coverageProtocol = createCompactCoverageProtocol(loaded.protocol);
  if (sha256Canonical(loaded.protocol) !== FULL_PROTOCOL_HASH ||
      sha256Canonical(coverageProtocol) !== COVERAGE_PROTOCOL_HASH ||
      loaded.protocol.eventEvaluator.fieldSpeed !== 1) {
    fail("worker protocol identity differs from the frozen lock.");
  }
  return {
    loaded,
    candidates: candidateMap(loaded),
    fullProtocol: loaded.protocol,
    coverageProtocol,
    implementation,
  };
}

function startWorkerThread() {
  const context = workerRuntime(workerData.registryPath);
  let lastProgress = 0;
  parentPort.on("message", (task) => {
    try {
      const progress = (update) => {
        const now = Date.now();
        if (now - lastProgress < 10_000) return;
        lastProgress = now;
        parentPort.postMessage({
          type: "progress",
          jobId: task.jobId,
          update,
        });
      };
      const result = task.kind === "full"
        ? evaluateFullTask(task, context, progress)
        : evaluateTargetTask(task, context, progress);
      parentPort.postMessage({ type: "result", result });
    } catch (error) {
      parentPort.postMessage({
        type: "result",
        result: {
          jobId: task.jobId,
          fatal: true,
          fatalCode: "worker-evaluation-error",
          errorName: error?.name ?? "Error",
          message: error?.message ?? String(error),
          details: error?.details == null ? null : clone(error.details),
        },
      });
    }
  });
  parentPort.postMessage({ type: "ready" });
}

export function classifyPair(compactRow, fullRow) {
  const compactEvaluated =
    compactRow?.evaluationStatus?.evaluated === true &&
    compactRow?.score !== null;
  const fullEvaluated =
    fullRow?.evaluationStatus?.evaluated === true &&
    fullRow?.score !== null;
  if (!compactEvaluated && !fullEvaluated) {
    return "inconclusive-neither-evaluated";
  }
  if (!compactEvaluated) {
    return "inconclusive-compact-not-evaluated";
  }
  if (!fullEvaluated) {
    return "inconclusive-full-not-evaluated";
  }
  const compactPassed = compactRow.score.status.passed === true;
  const fullPassed = fullRow.score.status.passed === true;
  if (compactPassed && fullPassed) return "both-pass";
  if (!compactPassed && !fullPassed) return "both-reject";
  if (!compactPassed && fullPassed) return "coverage-false-negative";
  return "coverage-false-positive";
}

function gateComparisons(compactRow, fullRow) {
  const compactEvaluated =
    compactRow.evaluationStatus?.evaluated === true &&
    compactRow.score !== null;
  const fullEvaluated =
    fullRow.evaluationStatus?.evaluated === true &&
    fullRow.score !== null;
  if (!compactEvaluated || !fullEvaluated) return [];
  const compact = compactRow.score.gates?.evaluated ?? {};
  const full = fullRow.score.gates?.evaluated ?? {};
  const gateIds = [...new Set([
    ...Object.keys(compact),
    ...Object.keys(full),
  ])].sort(compareText);
  return gateIds.map((gateId) => {
    const compactPassed = compact[gateId] ?? null;
    const fullPassed = full[gateId] ?? null;
    return {
      gateId,
      compactPassed,
      fullPassed,
      comparable:
        typeof compactPassed === "boolean" &&
        typeof fullPassed === "boolean",
      disagreed:
        typeof compactPassed === "boolean" &&
        typeof fullPassed === "boolean" &&
        compactPassed !== fullPassed,
    };
  });
}

function logGamma(value) {
  const coefficients = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (value < 0.5) {
    return Math.log(Math.PI) -
      Math.log(Math.sin(Math.PI * value)) -
      logGamma(1 - value);
  }
  let x = 0.99999999999980993;
  const z = value - 1;
  coefficients.forEach((coefficient, index) => {
    x += coefficient / (z + index + 1);
  });
  const t = z + coefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) +
    (z + 0.5) * Math.log(t) - t + Math.log(x);
}

function logBinomialProbability(k, n, probability) {
  if (probability === 0) return k === 0 ? 0 : Number.NEGATIVE_INFINITY;
  if (probability === 1) return k === n ? 0 : Number.NEGATIVE_INFINITY;
  return logGamma(n + 1) - logGamma(k + 1) - logGamma(n - k + 1) +
    k * Math.log(probability) +
    (n - k) * Math.log1p(-probability);
}

function logSumExp(values) {
  const maximum = Math.max(...values);
  if (!Number.isFinite(maximum)) return maximum;
  return maximum + Math.log(values.reduce(
    (sum, value) => sum + Math.exp(value - maximum),
    0,
  ));
}

function binomialCdf(k, n, probability) {
  if (k < 0) return 0;
  if (k >= n) return 1;
  const logs = Array.from(
    { length: k + 1 },
    (_, index) => logBinomialProbability(index, n, probability),
  );
  return Math.exp(logSumExp(logs));
}

function binomialSurvival(k, n, probability) {
  if (k <= 0) return 1;
  if (k > n) return 0;
  const logs = Array.from(
    { length: n - k + 1 },
    (_, index) => logBinomialProbability(k + index, n, probability),
  );
  return Math.exp(logSumExp(logs));
}

function bisectIncreasing(target, functionValue) {
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 90; iteration += 1) {
    const middle = (low + high) / 2;
    if (functionValue(middle) < target) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

function bisectDecreasing(target, functionValue) {
  let low = 0;
  let high = 1;
  for (let iteration = 0; iteration < 90; iteration += 1) {
    const middle = (low + high) / 2;
    if (functionValue(middle) > target) low = middle;
    else high = middle;
  }
  return (low + high) / 2;
}

export function clopperPearsonOneSidedUpper(
  successes,
  trials,
  confidence = 0.95,
) {
  if (!Number.isSafeInteger(successes) ||
      !Number.isSafeInteger(trials) ||
      successes < 0 ||
      trials < 0 ||
      successes > trials) {
    fail("binomial counts are invalid.");
  }
  if (trials === 0) return null;
  if (successes === trials) return 1;
  const alpha = 1 - confidence;
  return bisectDecreasing(
    alpha,
    (probability) => binomialCdf(successes, trials, probability),
  );
}

export function clopperPearsonTwoSided(
  successes,
  trials,
  confidence = 0.95,
) {
  if (!Number.isSafeInteger(successes) ||
      !Number.isSafeInteger(trials) ||
      successes < 0 ||
      trials < 0 ||
      successes > trials) {
    fail("binomial counts are invalid.");
  }
  if (trials === 0) return null;
  const alpha = 1 - confidence;
  const lower = successes === 0
    ? 0
    : bisectIncreasing(
      alpha / 2,
      (probability) => binomialSurvival(
        successes,
        trials,
        probability,
      ),
    );
  const upper = successes === trials
    ? 1
    : bisectDecreasing(
      alpha / 2,
      (probability) => binomialCdf(
        successes,
        trials,
        probability,
      ),
    );
  return { lower, upper };
}

function drawState(row) {
  if (row?.evaluationStatus?.evaluated !== true || row?.score === null) {
    return "not-evaluated";
  }
  return row.score.status?.passed === true ? "pass" : "reject";
}

function confusionInventory(rows) {
  const classifications = zeroClassificationCounts();
  for (const row of rows) classifications[row.classification] += 1;
  const compactEvaluated = rows.filter(
    (row) => drawState(row.compactRow) !== "not-evaluated",
  ).length;
  const fullEvaluated = rows.filter(
    (row) => drawState(row.fullRow) !== "not-evaluated",
  ).length;
  const jointlyEvaluated = rows.filter(
    (row) =>
      drawState(row.compactRow) !== "not-evaluated" &&
      drawState(row.fullRow) !== "not-evaluated",
  ).length;
  const fullPassDenominator =
    classifications["both-pass"] +
    classifications["coverage-false-negative"];
  const compactPassDenominator =
    classifications["both-pass"] +
    classifications["coverage-false-positive"];
  return {
    drawn: rows.length,
    compact: {
      evaluated: compactEvaluated,
      notEvaluated: rows.length - compactEvaluated,
      notEvaluatedRate:
        rows.length === 0 ? null : (rows.length - compactEvaluated) / rows.length,
      notEvaluatedInterval95: clopperPearsonTwoSided(
        rows.length - compactEvaluated,
        rows.length,
      ),
    },
    full: {
      evaluated: fullEvaluated,
      notEvaluated: rows.length - fullEvaluated,
      notEvaluatedRate:
        rows.length === 0 ? null : (rows.length - fullEvaluated) / rows.length,
      notEvaluatedInterval95: clopperPearsonTwoSided(
        rows.length - fullEvaluated,
        rows.length,
      ),
    },
    jointlyEvaluated,
    classifications,
    falseNegative: {
      numerator: classifications["coverage-false-negative"],
      denominator: fullPassDenominator,
      observedRate: fullPassDenominator === 0
        ? null
        : classifications["coverage-false-negative"] / fullPassDenominator,
      oneSidedUpper95: clopperPearsonOneSidedUpper(
        classifications["coverage-false-negative"],
        fullPassDenominator,
      ),
    },
    falsePositive: {
      numerator: classifications["coverage-false-positive"],
      denominator: compactPassDenominator,
      observedRate: compactPassDenominator === 0
        ? null
        : classifications["coverage-false-positive"] /
          compactPassDenominator,
      oneSidedUpper95: clopperPearsonOneSidedUpper(
        classifications["coverage-false-positive"],
        compactPassDenominator,
      ),
    },
  };
}

function gateInventory(rows) {
  const gates = new Map();
  for (const row of rows) {
    for (const comparison of row.gateComparisons) {
      if (!gates.has(comparison.gateId)) {
        gates.set(comparison.gateId, {
          gateId: comparison.gateId,
          jointlyEvaluated: 0,
          disagreements: 0,
          families: new Set(),
        });
      }
      const gate = gates.get(comparison.gateId);
      if (comparison.comparable) gate.jointlyEvaluated += 1;
      if (comparison.disagreed) {
        gate.disagreements += 1;
        gate.families.add(row.compactRow.familyId);
      }
    }
  }
  return [...gates.values()].map((gate) => ({
    gateId: gate.gateId,
    jointlyEvaluated: gate.jointlyEvaluated,
    disagreements: gate.disagreements,
    disagreementRate: gate.jointlyEvaluated === 0
      ? null
      : gate.disagreements / gate.jointlyEvaluated,
    disagreementFamilies: [...gate.families].sort(compareText),
  })).sort((left, right) => compareText(left.gateId, right.gateId));
}

function boundaryMargin(row) {
  if (drawState(row) === "not-evaluated") return null;
  const gates = Object.values(row.score?.quadrature?.gates ?? {});
  const margins = gates.flatMap((gate) => {
    if (gate.identityMatch === false) return [0];
    const value = gate.maximumChange;
    const threshold = gate.threshold;
    if (!Number.isFinite(value) || !Number.isFinite(threshold)) return [];
    return [Math.abs(value - threshold) /
      Math.max(Math.abs(threshold), 1e-30)];
  });
  return margins.length === 0 ? null : Math.min(...margins);
}

function buildBoundaryStress(rows) {
  const selected = [];
  const missing = [];
  const members = [...new Set(
    rows.map((row) => row.compactRow.memberId),
  )].sort(compareText);
  for (const memberId of members) {
    const memberRows = rows.filter(
      (row) => row.compactRow.memberId === memberId &&
        drawState(row.compactRow) !== "not-evaluated",
    ).map((row) => ({
      row,
      state: drawState(row.compactRow),
      margin: boundaryMargin(row.compactRow),
    })).filter((entry) => entry.margin !== null);
    for (const state of ["pass", "reject"]) {
      const chosen = memberRows.filter((entry) => entry.state === state)
        .sort((left, right) =>
          left.margin - right.margin ||
          compareText(
            left.row.compactRow.caseHash,
            right.row.compactRow.caseHash,
          ))
        .slice(0, 2);
      selected.push(...chosen.map((entry) => ({
        campaignHash: entry.row.source.campaignHash,
        caseHash: entry.row.compactRow.caseHash,
        memberId,
        compactState: state,
        normalizedBoundaryMargin: entry.margin,
      })));
      if (chosen.length < 2) {
        missing.push({
          memberId,
          category: state,
          requested: 2,
          available: chosen.length,
          backfilled: false,
        });
      }
    }
  }
  const keys = new Set(selected.map(
    (row) => `${row.campaignHash}\0${row.caseHash}`,
  ));
  const stressRows = rows.filter((row) =>
    keys.has(`${row.source.campaignHash}\0${row.compactRow.caseHash}`));
  return {
    evidenceScope:
      "descriptive boundary-stress evidence; not a sampler-measure estimate",
    selectionRule:
      "per member, two passing and two rejecting evaluated compact rows with smallest normalized gate margin; ascending case hash tie-break",
    selected,
    missing,
    inventory: confusionInventory(stressRows),
    gateDisagreements: gateInventory(stressRows),
  };
}

function memberInventories(rows) {
  const members = [...new Set(rows.map(
    (row) => row.compactRow.memberId,
  ))].sort(compareText);
  return members.map((memberId) => {
    const memberRows = rows.filter(
      (row) => row.compactRow.memberId === memberId,
    );
    const inventory = confusionInventory(memberRows);
    return {
      familyId: memberRows[0].compactRow.familyId,
      memberId,
      ...inventory,
    };
  });
}

function macroDrawState(memberRows) {
  const average = (selector) =>
    memberRows.reduce((sum, row) => sum + selector(row), 0) /
    memberRows.length;
  return {
    memberCount: memberRows.length,
    equalMemberWeight: true,
    compactEvaluatedRate: average(
      (row) => row.compact.evaluated / row.drawn,
    ),
    compactNotEvaluatedRate: average(
      (row) => row.compact.notEvaluated / row.drawn,
    ),
    fullEvaluatedRate: average(
      (row) => row.full.evaluated / row.drawn,
    ),
    fullNotEvaluatedRate: average(
      (row) => row.full.notEvaluated / row.drawn,
    ),
  };
}

function groupFailures(rows, side) {
  const groups = new Map();
  for (const row of rows) {
    const retained = side === "compact" ? row.compactRow : row.fullRow;
    if (drawState(retained) !== "not-evaluated") continue;
    const status = retained.evaluationStatus;
    const identity = {
      statusCode: status?.code ?? "missing",
      stage: status?.stage ?? null,
      reasonCode: status?.reasonCode ?? "unspecified",
      errorName: status?.errorName ?? null,
      message: status?.message ?? null,
      detailsHash: status?.details == null
        ? null
        : sha256Canonical(status.details),
    };
    const key = canonicalJson(identity);
    if (!groups.has(key)) groups.set(key, { ...identity, rows: [] });
    groups.get(key).rows.push({
      file: row.source.file,
      campaignHash: row.source.campaignHash,
      caseId: row.compactRow.caseId,
      caseHash: row.compactRow.caseHash,
      memberId: row.compactRow.memberId,
      sampleOrdinal: row.compactRow.sampleOrdinal,
      details: status?.details ?? null,
    });
  }
  return [...groups.values()].map((group) => ({
    ...group,
    count: group.rows.length,
    rows: group.rows.sort((left, right) =>
      compareText(left.caseHash, right.caseHash)),
  })).sort((left, right) =>
    compareText(left.reasonCode, right.reasonCode) ||
    compareText(left.message, right.message));
}

function addQueueReason(queue, row, reason) {
  const key = `${row.source.campaignHash}\0${row.compactRow.caseHash}`;
  if (!queue.has(key)) {
    queue.set(key, {
      file: row.source.file,
      fileSha256: row.source.fileSha256,
      campaignId: row.source.campaignId,
      campaignHash: row.source.campaignHash,
      caseId: row.compactRow.caseId,
      caseHash: row.compactRow.caseHash,
      sampledSpecHash:
        row.compactRow.exactRerunInstruction.sampledSpecHash,
      exactSourceHash:
        row.compactRow.exactRerunInstruction.exactSourceHash,
      familyId: row.compactRow.familyId,
      memberId: row.compactRow.memberId,
      sampleOrdinal: row.compactRow.sampleOrdinal,
      reasons: [],
    });
  }
  const reasons = queue.get(key).reasons;
  if (!reasons.includes(reason)) reasons.push(reason);
}

function belowFivePercentCaseHash(caseHash) {
  const value = BigInt(`0x${requiredSha256(caseHash, "caseHash")}`);
  const threshold = ((1n << 256n) * 5n) / 100n;
  return value < threshold;
}

function buildFullAdjudicationQueue(rows, targetResults, boundaryStress) {
  const queue = new Map();
  const targetByKey = new Map(targetResults.map(
    (row) => [`${row.source.campaignHash}\0${row.caseHash}`, row],
  ));
  const stress = new Set(boundaryStress.selected.map(
    (row) => `${row.campaignHash}\0${row.caseHash}`,
  ));
  for (const row of rows) {
    if (["both-pass", "coverage-false-negative"].includes(
      row.classification,
    )) {
      addQueueReason(queue, row, `classification:${row.classification}`);
    }
    if (["coverage-false-negative", "coverage-false-positive"].includes(
      row.classification,
    )) {
      addQueueReason(queue, row, "case-level-cross-resolution-disagreement");
    }
    for (const gate of row.gateComparisons.filter(
      (comparison) => comparison.disagreed,
    )) {
      addQueueReason(queue, row, `gate-disagreement:${gate.gateId}`);
    }
    const key = `${row.source.campaignHash}\0${row.compactRow.caseHash}`;
    const target = targetByKey.get(key);
    if (target?.disposition === "resolution-settled") {
      addQueueReason(queue, row, "targeted-resolution-settled");
    }
    if (target?.root?.failures?.includes("root-identity-mismatch")) {
      addQueueReason(queue, row, "topology-anomaly");
    }
    if (target?.originalDispositionReproduced === false) {
      addQueueReason(queue, row, "replay-mismatch");
    }
    if (stress.has(key)) addQueueReason(queue, row, "boundary-stress");
    if (row.classification === "both-reject" &&
        belowFivePercentCaseHash(row.compactRow.caseHash)) {
      addQueueReason(
        queue,
        row,
        "deterministic-five-percent-concordant-both-reject-audit",
      );
    }
    if (drawState(row.fullRow) === "not-evaluated") {
      addQueueReason(queue, row, "full-resolution-not-evaluated");
    }
  }
  return [...queue.values()].map((row) => ({
    ...row,
    reasons: row.reasons.sort(compareText),
  })).sort((left, right) =>
    compareText(left.memberId, right.memberId) ||
    left.sampleOrdinal - right.sampleOrdinal ||
    compareText(left.caseHash, right.caseHash));
}

function sufficiencyAssessment({
  inventory,
  rows,
  gates,
}) {
  const fullPassRows = rows.filter((row) =>
    ["both-pass", "coverage-false-negative"].includes(row.classification));
  const families = [...new Set(fullPassRows.map(
    (row) => row.compactRow.familyId,
  ))].sort(compareText);
  const members = [...new Set(fullPassRows.map(
    (row) => row.compactRow.memberId,
  ))].sort(compareText);
  const conditions = [
    {
      id: "minimum-joint-full-passes",
      passed: inventory.falseNegative.denominator >= 59,
      observed: inventory.falseNegative.denominator,
      required: 59,
    },
    {
      id: "full-pass-family-breadth",
      passed: families.length === 3,
      observed: families,
      required: ["A", "B", "C"],
    },
    {
      id: "full-pass-member-breadth",
      passed: members.length >= 11,
      observed: members.length,
      required: 11,
    },
    {
      id: "false-negative-upper-bound",
      passed:
        inventory.falseNegative.oneSidedUpper95 !== null &&
        inventory.falseNegative.oneSidedUpper95 <= 0.05,
      observed: inventory.falseNegative.oneSidedUpper95,
      requiredMaximum: 0.05,
    },
    {
      id: "false-positive-upper-bound",
      passed:
        inventory.falsePositive.oneSidedUpper95 !== null &&
        inventory.falsePositive.oneSidedUpper95 <= 0.10,
      observed: inventory.falsePositive.oneSidedUpper95,
      requiredMaximum: 0.10,
    },
    {
      id: "compact-not-evaluated-rate",
      passed: inventory.compact.notEvaluatedRate <= 0.05,
      observed: inventory.compact.notEvaluatedRate,
      requiredMaximum: 0.05,
    },
    {
      id: "full-not-evaluated-rate",
      passed: inventory.full.notEvaluatedRate <= 0.05,
      observed: inventory.full.notEvaluatedRate,
      requiredMaximum: 0.05,
    },
    {
      id: "gate-disagreement-bound",
      passed: gates.every((gate) =>
        (gate.disagreementRate ?? 0) <= 0.10 &&
        gate.disagreementFamilies.length < 3),
      observedFailures: gates.filter((gate) =>
        (gate.disagreementRate ?? 0) > 0.10 ||
        gate.disagreementFamilies.length >= 3),
      required:
        "no gate above 10 percent or in three families before full adjudication",
    },
  ];
  return {
    status: conditions.every((condition) => condition.passed)
      ? "calibration-sufficient"
      : "calibration-insufficient",
    fullPassFamilies: families,
    fullPassMembers: members,
    conditions,
    noAdditionalDrawsLaunched: true,
  };
}

function taskId(kind, item) {
  return [
    kind,
    item.source.campaignHash,
    item.compactRow.caseHash,
  ].join(":");
}

function journalHeader(binding, outputPath) {
  return {
    schema: "prescribed-path-analysis/resolution-calibration-journal.v1",
    packetSha256: binding.packetSha256,
    receiptSha256: binding.receiptSha256,
    implementationHash: binding.currentImplementation.implementationHash,
    coverageProtocolHash: COVERAGE_PROTOCOL_HASH,
    fullProtocolHash: FULL_PROTOCOL_HASH,
    outputPath: path.resolve(outputPath),
  };
}

function loadOrCreateJournal(file, header) {
  const results = new Map();
  if (!existsSync(file)) {
    appendFileSync(file, `${JSON.stringify({ type: "header", header })}\n`);
    return results;
  }
  const lines = readFileSync(file, "utf8").split("\n").filter(Boolean);
  if (lines.length === 0) fail("calibration journal is empty.");
  let first;
  try {
    first = JSON.parse(lines[0]);
  } catch {
    fail("calibration journal header is unreadable.");
  }
  assertEqual(first, { type: "header", header }, "calibration journal binding");
  for (const line of lines.slice(1)) {
    let entry;
    try {
      entry = JSON.parse(line);
    } catch {
      fail("calibration journal contains a partial or invalid result line.");
    }
    if (entry.type !== "result" || !entry.result?.jobId) {
      fail("calibration journal result line is malformed.");
    }
    if (results.has(entry.result.jobId)) {
      fail(`calibration journal repeats ${entry.result.jobId}.`);
    }
    results.set(entry.result.jobId, entry.result);
  }
  return results;
}

function appendJournalResult(file, result) {
  appendFileSync(file, `${JSON.stringify({ type: "result", result })}\n`);
}

async function runWorkerPool({
  jobs,
  registryPath,
  workerCount,
  onResult,
}) {
  if (jobs.length === 0) return;
  let nextIndex = 0;
  let completed = 0;
  let rejected = null;
  const live = new Set();
  const latest = new Map();
  const heartbeat = setInterval(() => {
    const elapsed = ((Date.now() - heartbeat.started) / 1_000).toFixed(1);
    const active = [...latest.entries()].map(([jobId, update]) =>
      `${jobId}:${update.stage ?? "working"}`).join(",");
    process.stderr.write(
      `[heartbeat] calibration completed=${completed}/${jobs.length} ` +
      `active=${active || "starting"} elapsed=${elapsed}s\n`,
    );
  }, 30_000);
  heartbeat.started = Date.now();
  const count = Math.min(workerCount, jobs.length);
  try {
    await new Promise((resolve, reject) => {
      const dispatch = (worker) => {
        if (rejected) return;
        if (nextIndex >= jobs.length) {
          if (completed === jobs.length) resolve();
          return;
        }
        const job = jobs[nextIndex];
        nextIndex += 1;
        latest.set(job.jobId, { stage: "dispatched" });
        worker.currentJobId = job.jobId;
        worker.postMessage(job);
      };
      for (let index = 0; index < count; index += 1) {
        const worker = new Worker(new URL(import.meta.url), {
          workerData: {
            mode: "calibration-worker",
            registryPath,
          },
        });
        live.add(worker);
        worker.on("message", (message) => {
          if (message.type === "ready") {
            dispatch(worker);
            return;
          }
          if (message.type === "progress") {
            latest.set(message.jobId, message.update);
            return;
          }
          if (message.type === "result") {
            latest.delete(message.result.jobId);
            completed += 1;
            try {
              onResult(message.result);
            } catch (error) {
              rejected = error;
              reject(error);
              return;
            }
            if (message.result.fatal) {
              const error = new Error(
                `${message.result.fatalCode}: ${message.result.message ?? ""}`,
              );
              rejected = error;
              reject(error);
              return;
            }
            dispatch(worker);
          }
        });
        worker.on("error", (error) => {
          if (!rejected) {
            rejected = error;
            reject(error);
          }
        });
        worker.on("exit", (code) => {
          live.delete(worker);
          if (code !== 0 && !rejected) {
            const error = new Error(`calibration worker exited with code ${code}.`);
            rejected = error;
            reject(error);
          }
        });
      }
    });
  } finally {
    clearInterval(heartbeat);
    await Promise.all([...live].map((worker) => worker.terminate()));
  }
}

function verifyBindingsUnchanged(binding) {
  const next = verifyReceiptAndPacket({
    packetPath: binding.packetPath,
    sweepInput: binding.sweepInput,
    receiptPath: binding.receiptPath,
    loadCampaignRows: false,
  });
  const before = {
    packetSha256: binding.packetSha256,
    receiptSha256: binding.receiptSha256,
    implementationHash: binding.currentImplementation.implementationHash,
  };
  const after = {
    packetSha256: next.packetSha256,
    receiptSha256: next.receiptSha256,
    implementationHash: next.currentImplementation.implementationHash,
  };
  assertEqual(after, before, "post-campaign frozen bindings");
}

function preflightReplay(binding) {
  const evaluated = binding.census.filter(
    ({ compactRow }) => drawState(compactRow) !== "not-evaluated",
  ).sort((left, right) =>
    (left.compactRow.measuredCost?.wallSeconds ?? Infinity) -
      (right.compactRow.measuredCost?.wallSeconds ?? Infinity) ||
    compareText(left.compactRow.caseHash, right.compactRow.caseHash));
  const selected = evaluated[0];
  if (!selected) fail("receipt census contains no active compact case.");
  const candidate = candidateMap(binding.loaded).get(
    selected.compactRow.candidateId,
  );
  const started = performance.now();
  const replay = evaluateExactRetainedCase({
    candidate,
    retainedRow: selected.compactRow,
    protocol: createCompactCoverageProtocol(binding.loaded.protocol),
    implementation: binding.currentImplementation,
  });
  if (canonicalJson(replayIdentity(replay)) !==
      canonicalJson(replayIdentity(selected.compactRow))) {
    fail("frozen implementation did not reproduce the active compact case.");
  }
  return {
    file: selected.source.file,
    campaignHash: selected.source.campaignHash,
    caseHash: selected.compactRow.caseHash,
    scoreHash: selected.compactRow.scoreHash,
    replayedCaseHash: replay.caseHash,
    replayedScoreHash: replay.scoreHash,
    exactMatch: true,
    wallSeconds: (performance.now() - started) / 1_000,
  };
}

function outputDirectoryGuard(outputPath, header) {
  const directory = path.dirname(outputPath);
  mkdirSync(directory, { recursive: true });
  const basename = path.basename(outputPath);
  const journal = `${outputPath}.journal.jsonl`;
  for (const file of readdirSync(directory)) {
    const absolute = path.join(directory, file);
    if (absolute === journal || file === basename || file.endsWith(".tmp")) {
      continue;
    }
    if (!file.endsWith(".json")) continue;
    const artifact = readStableJson(absolute, file).value;
    const observed = {
      packetSha256: artifact.provenance?.packetSha256,
      receiptSha256: artifact.provenance?.receiptSha256,
      implementationHash: artifact.provenance?.implementationHash,
      coverageProtocolHash: artifact.provenance?.coverageProtocolHash,
      fullProtocolHash: artifact.provenance?.fullProtocolHash,
    };
    const expected = {
      packetSha256: header.packetSha256,
      receiptSha256: header.receiptSha256,
      implementationHash: header.implementationHash,
      coverageProtocolHash: header.coverageProtocolHash,
      fullProtocolHash: header.fullProtocolHash,
    };
    if (canonicalJson(observed) !== canonicalJson(expected)) {
      fail(
        `output directory contains a different packet identity: ${file}.`,
      );
    }
  }
  if (existsSync(outputPath)) {
    fail(
      "calibration output already exists; use --verify rather than overwrite it.",
    );
  }
  return journal;
}

function assembleArtifact({
  binding,
  outputPath,
  preflight,
  fullResults,
  targetResults,
  coordinatorWallSeconds,
  workerCount,
  journalBytes,
}) {
  const fullByKey = new Map(fullResults.map((result) => [
    `${result.source.campaignHash}\0${result.compactCaseHash}`,
    result.fullRow,
  ]));
  const rows = binding.census.map(({ source, compactRow }) => {
    const key = `${source.campaignHash}\0${compactRow.caseHash}`;
    const fullRow = fullByKey.get(key);
    if (!fullRow) fail(`full-resolution result is missing ${key}.`);
    return {
      source,
      compactRow,
      fullRow,
      classification: classifyPair(compactRow, fullRow),
      gateComparisons: gateComparisons(compactRow, fullRow),
    };
  });
  const inventory = confusionInventory(rows);
  if (Object.values(inventory.classifications).reduce(
    (sum, count) => sum + count,
    0,
  ) !== EXPECTED.draws) {
    fail("classification counts do not sum to the complete draw count.");
  }
  const gates = gateInventory(rows);
  const members = memberInventories(rows);
  const boundaryStress = buildBoundaryStress(rows);
  const sufficiency = sufficiencyAssessment({ inventory, rows, gates });
  const queue = buildFullAdjudicationQueue(
    rows,
    targetResults,
    boundaryStress,
  );
  const targetCounts = countBy(targetResults.map((row) => row.disposition));
  const fullWallSeconds = fullResults.reduce(
    (sum, result) =>
      sum + (result.fullRow.measuredCost?.wallSeconds ?? 0),
    0,
  );
  const targetWallSeconds = targetResults.reduce(
    (sum, result) =>
      sum +
      result.surface.reduce(
        (levelSum, level) => levelSum + (level.wallSeconds ?? 0),
        0,
      ),
    0,
  );
  const uniqueSources = new Set(rows.map(
    (row) => row.compactRow.exactRerunInstruction.sampledSpecHash,
  ));
  const body = {
    schema: CALIBRATION_SCHEMA,
    artifactId: "a1-3-c5-and-full-taxonomy-v1",
    status: sufficiency.status,
    claimBoundary: clone(CLAIM_BOUNDARY),
    provenance: {
      packetPath: path.relative(process.cwd(), binding.packetPath),
      packetSha256: binding.packetSha256,
      receiptPath: path.relative(process.cwd(), binding.receiptPath),
      receiptSha256: binding.receiptSha256,
      receiptAnalysisHash:
        binding.receipt.coordinatorReceipt.analysisHash,
      receiptManifestHash:
        binding.receipt.coordinatorReceipt.manifestHash,
      implementationHash:
        binding.currentImplementation.implementationHash,
      implementationIdentity: binding.currentImplementation,
      coverageProtocolHash: COVERAGE_PROTOCOL_HASH,
      fullProtocolHash: FULL_PROTOCOL_HASH,
      samplerId: FROZEN_SAMPLER_ID,
      fieldSpeed: 1,
      distinctCampaignIdentitiesPreserved: true,
      canonicalMergedCampaignCreated: false,
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
    },
    preflight: {
      receiptHashVerified: true,
      receiptContractVerified: true,
      receiptInternalHashesReproduced: true,
      manifestFileHashesVerified: true,
      implementationHashVerified: true,
      protocolHashesVerified: true,
      registryIdentityVerified: true,
      fieldSpeedVerified: true,
      activeCompactCaseReplay: preflight,
    },
    sourceCensus: {
      drawCount: rows.length,
      uniqueSampledSpecCount: uniqueSources.size,
      duplicateDrawCount: rows.length - uniqueSources.size,
      campaignFileCount:
        binding.receipt.campaignAndFileManifest.campaignFiles.length,
      shardFileCount: EXPECTED.shardFiles,
      memberFileCount: EXPECTED.memberFiles,
      evaluatedCompactCount: EXPECTED.evaluated,
      retainedCompactNullScoreCount: EXPECTED.notEvaluated,
      manifest: binding.receipt.campaignAndFileManifest,
      syntheticCampaignIdentityCreated: false,
    },
    compactVersusFull: {
      inventory,
      perMember: members,
      equalMemberMacroDrawState: macroDrawState(members),
      gateDisagreements: gates,
      boundaryStress,
      sufficiency,
    },
    targetedResolutionLadder: {
      targetMembers: clone(TARGET_MEMBERS),
      expectedRowsPerMember: EXPECTED.perMember,
      rowCount: targetResults.length,
      rootTiers: clone(ROOT_TIERS),
      surfaceLevels: clone(SURFACE_LEVELS),
      dispositionCounts: targetCounts,
      rows: targetResults,
    },
    exactFailureClassifications: {
      compact: groupFailures(rows, "compact"),
      full: groupFailures(rows, "full"),
      targeted: targetResults.filter(
        (row) => row.disposition !== "resolution-settled",
      ).map((row) => ({
        file: row.source.file,
        campaignHash: row.source.campaignHash,
        caseHash: row.caseHash,
        memberId: row.memberId,
        disposition: row.disposition,
        rootFailures: row.root.failures ?? [],
        rootFailure: row.root.failure ?? null,
        surfaceFailures: row.surface.flatMap((level) =>
          level.failure ? [{ level: level.level, ...level.failure }] : []),
        failedSurfaceGates: row.surface.flatMap((level) =>
          Object.entries(level.gates ?? {})
            .filter(([, gate]) => !gate.passed)
            .map(([gateId, gate]) => ({
              level: level.level,
              gateId,
              maximumChange: gate.maximumChange,
              threshold: gate.threshold,
              identityMatch: gate.identityMatch,
            }))),
      })),
    },
    fullAdjudicationQueue: {
      independentAcceptancePerformed: false,
      separatelyRetainedPacketsCreated: false,
      queueCount: queue.length,
      rows: queue,
    },
    measuredCost: {
      coordinatorWallSeconds,
      workerCount,
      activeCompactPreflightReplayWallSeconds: preflight.wallSeconds,
      aggregateFullResolutionCaseWallSeconds: fullWallSeconds,
      aggregateTargetSurfaceWallSeconds: targetWallSeconds,
      inputCampaignJsonBytes:
        binding.receipt.storageAndWallTime.jsonFileBytes,
      inputRetainedCaseBytes:
        binding.receipt.storageAndWallTime.retainedCaseBytes,
      progressJournalBytesBeforeFinalization: journalBytes,
      outputFileBytes: 0,
      maximumObservedProcessLifetimeRssKilobytes: Math.max(
        process.resourceUsage().maxRSS,
        ...fullResults.map(
          (result) =>
            result.fullRow.measuredCost
              ?.processLifetimeMaximumRssKilobytes ?? 0,
        ),
      ),
      storageDisposition:
        "byte counts are measured retained JSON or serialized artifact bytes",
    },
    rows,
  };
  let serialized = null;
  for (let iteration = 0; iteration < 12; iteration += 1) {
    const artifact = {
      ...body,
      resultHash: sha256Canonical(body),
    };
    serialized = `${JSON.stringify(artifact, null, 2)}\n`;
    const bytes = Buffer.byteLength(serialized);
    if (body.measuredCost.outputFileBytes === bytes) break;
    body.measuredCost.outputFileBytes = bytes;
  }
  const artifact = JSON.parse(serialized);
  if (artifact.measuredCost.outputFileBytes !==
      Buffer.byteLength(serialized)) {
    fail("artifact output byte count did not reach a fixed point.");
  }
  const temporary = `${outputPath}.tmp`;
  writeFileSync(temporary, serialized);
  renameSync(temporary, outputPath);
  return artifact;
}

export function verifyCalibrationArtifact({
  artifactPath,
  packetPath = DEFAULT_PACKET,
  receiptPath = DEFAULT_RECEIPT,
} = {}) {
  const { bytes, value: artifact } = readStableJson(
    path.resolve(artifactPath),
    "calibration artifact",
  );
  if (artifact.schema !== CALIBRATION_SCHEMA) {
    fail("calibration artifact schema differs.");
  }
  const { resultHash, ...body } = artifact;
  if (resultHash !== sha256Canonical(body)) {
    fail("calibration artifact resultHash does not reproduce.");
  }
  const packetSha256 = sha256Bytes(
    readStableBytes(path.resolve(packetPath), "packet"),
  );
  const receiptSha256 = sha256Bytes(
    readStableBytes(path.resolve(receiptPath), "receipt"),
  );
  if (artifact.provenance.packetSha256 !== packetSha256 ||
      artifact.provenance.receiptSha256 !== receiptSha256 ||
      receiptSha256 !== RECEIPT_SHA256) {
    fail("calibration artifact packet or receipt binding drifted.");
  }
  if (artifact.provenance.fieldSpeed !== 1 ||
      artifact.provenance.pathEvolutionInvoked !== false ||
      artifact.provenance.eomSolverInvoked !== false ||
      artifact.provenance.canonicalMergedCampaignCreated !== false ||
      artifact.claimBoundary.independentAcceptancePerformed !== false) {
    fail("calibration artifact crossed its claim or execution boundary.");
  }
  if (artifact.rows?.length !== EXPECTED.draws ||
      artifact.targetedResolutionLadder?.rowCount !==
        EXPECTED.perMember * TARGET_MEMBERS.length ||
      Object.values(
        artifact.compactVersusFull.inventory.classifications,
      ).reduce((sum, count) => sum + count, 0) !== EXPECTED.draws) {
    fail("calibration artifact row or confusion census differs.");
  }
  if (artifact.measuredCost.outputFileBytes !== bytes.length) {
    fail("calibration artifact measured output byte count differs.");
  }
  return {
    artifactPath: path.resolve(artifactPath),
    resultHash,
    outputFileBytes: bytes.length,
    status: artifact.status,
    confusion:
      artifact.compactVersusFull.inventory.classifications,
    targetedDispositionCounts:
      artifact.targetedResolutionLadder.dispositionCounts,
    fullAdjudicationQueueCount:
      artifact.fullAdjudicationQueue.queueCount,
  };
}

function parseArguments(argv) {
  const values = new Map();
  const flags = new Set();
  for (let index = 0; index < argv.length; index += 1) {
    const key = argv[index];
    if (["--help"].includes(key)) {
      flags.add(key);
      continue;
    }
    if (!key.startsWith("--")) fail(`unexpected argument ${key}.`);
    const value = argv[index + 1];
    if (value === undefined || value.startsWith("--")) {
      fail(`${key} requires a value.`);
    }
    values.set(key, value);
    index += 1;
  }
  const workers = Number(values.get("--workers") ??
    String(Math.max(1, Math.min(4, os.availableParallelism?.() ?? 4))));
  if (!Number.isSafeInteger(workers) || workers < 1 || workers > 16) {
    fail("--workers must be an integer from 1 through 16.");
  }
  return {
    help: flags.has("--help"),
    verify: values.get("--verify") ?? null,
    packetPath: values.get("--packet") ?? DEFAULT_PACKET,
    sweepInput: values.get("--sweep-input") ?? DEFAULT_SWEEP_INPUT,
    receiptPath: values.get("--sweep-receipt") ?? DEFAULT_RECEIPT,
    outputPath: values.get("--output") ?? DEFAULT_OUTPUT,
    workers,
  };
}

function help() {
  console.log([
    "Usage:",
    "  node scripts/eom/run-a1-3-c5-resolution-coverage-calibration.mjs",
    "    --packet PATH --sweep-input PATH --sweep-receipt PATH --output PATH",
    "    [--workers 1..16]",
    "",
    "  node scripts/eom/run-a1-3-c5-resolution-coverage-calibration.mjs",
    "    --verify ARTIFACT --packet PATH --sweep-receipt PATH",
    "",
    "This is a receipt-bound prescribed-path analytical calibration. It does",
    "not evolve paths, invoke the EOM solver, publish data, or independently",
    "accept any numerical result.",
  ].join("\n"));
}

async function runCalibration(options) {
  const coordinatorStarted = performance.now();
  const binding = verifyReceiptAndPacket({
    packetPath: options.packetPath,
    sweepInput: options.sweepInput,
    receiptPath: options.receiptPath,
  });
  const outputPath = path.resolve(options.outputPath);
  const header = journalHeader(binding, outputPath);
  const journalPath = outputDirectoryGuard(outputPath, header);
  const journalResults = loadOrCreateJournal(journalPath, header);
  const preflight = preflightReplay(binding);
  process.stderr.write(
    `[preflight] receipt=${binding.receiptSha256} ` +
    `implementation=${binding.currentImplementation.implementationHash} ` +
    `activeReplay=${preflight.exactMatch}\n`,
  );
  const fullJobs = binding.census.map((item) => ({
    kind: "full",
    jobId: taskId("full", item),
    item,
  }));
  const targetJobs = binding.census.filter(
    ({ compactRow }) => TARGET_MEMBERS.includes(compactRow.memberId),
  ).map((item) => ({
    kind: "target",
    jobId: taskId("target", item),
    item,
  }));
  const runStage = async (jobs, stage) => {
    const pending = jobs.filter((job) => !journalResults.has(job.jobId));
    process.stderr.write(
      `[stage] ${stage} total=${jobs.length} ` +
      `resumed=${jobs.length - pending.length} pending=${pending.length}\n`,
    );
    await runWorkerPool({
      jobs: pending,
      registryPath:
        path.resolve(DEFAULT_ALL_CANDIDATE_CAMPAIGN_REGISTRY_PATH),
      workerCount: options.workers,
      onResult(result) {
        appendJournalResult(journalPath, result);
        journalResults.set(result.jobId, result);
      },
    });
    const fatal = jobs.map((job) => journalResults.get(job.jobId))
      .find((result) => result?.fatal);
    if (fatal) {
      fail(`${fatal.fatalCode}: ${fatal.message ?? "fatal calibration drift"}`);
    }
    verifyBindingsUnchanged(binding);
  };
  await runStage(fullJobs, "compact-versus-full");
  await runStage(targetJobs, "a1-3-c5-resolution-ladder");
  const fullResults = fullJobs.map((job) => journalResults.get(job.jobId));
  const targetResults = targetJobs.map(
    (job) => journalResults.get(job.jobId),
  );
  const journalBytes = statSync(journalPath).size;
  const artifact = assembleArtifact({
    binding,
    outputPath,
    preflight,
    fullResults,
    targetResults,
    coordinatorWallSeconds:
      (performance.now() - coordinatorStarted) / 1_000,
    workerCount: options.workers,
    journalBytes,
  });
  verifyBindingsUnchanged(binding);
  const verification = verifyCalibrationArtifact({
    artifactPath: outputPath,
    packetPath: options.packetPath,
    receiptPath: options.receiptPath,
  });
  unlinkSync(journalPath);
  return {
    outputPath,
    resultHash: artifact.resultHash,
    status: artifact.status,
    confusion:
      artifact.compactVersusFull.inventory.classifications,
    targetedDispositionCounts:
      artifact.targetedResolutionLadder.dispositionCounts,
    measuredCost: artifact.measuredCost,
    fullAdjudicationQueueCount:
      artifact.fullAdjudicationQueue.queueCount,
    verification,
    claimBoundary: artifact.claimBoundary,
  };
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    help();
    return;
  }
  if (options.verify !== null) {
    const result = verifyCalibrationArtifact({
      artifactPath: options.verify,
      packetPath: options.packetPath,
      receiptPath: options.receiptPath,
    });
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    return;
  }
  const result = await runCalibration(options);
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (!isMainThread && workerData?.mode === "calibration-worker") {
  startWorkerThread();
} else {
  const invokedPath = process.argv[1] === undefined
    ? null
    : pathToFileURL(path.resolve(process.argv[1])).href;
  if (invokedPath === import.meta.url) {
    main().catch((error) => {
      process.stderr.write(`${error?.stack ?? error}\n`);
      process.exitCode = 1;
    });
  }
}
