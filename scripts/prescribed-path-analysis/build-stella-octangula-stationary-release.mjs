#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALL_RETAINED_ROOTS_POLICY,
  canonicalJson,
  evaluatePrescribedRecordAnalysis,
  sha256Canonical,
} from "../../src/prescribed-path-analysis/AnalyticalBraidEvaluator.mjs";
import { validatePrescribedAssemblySpec } from "../../src/prescribed-geometry/PrescribedAssemblySpec.mjs";
import {
  evaluateIndependentStationaryPairSum,
  stellaOctangulaClosedFormCoefficient,
} from "./oracle/stella-octangula-stationary-release-oracle.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);
const REPO_ROOT = path.resolve(path.dirname(SCRIPT_PATH), "../..");
const PREDECLARATION_PATH = path.resolve(
  REPO_ROOT,
  "reference/priorities/braid-program/evidence/2026-09-01-stella-octangula-stationary-release.predeclaration.v1.json",
);
const OUTPUT_PATH = path.resolve(
  REPO_ROOT,
  "reference/priorities/braid-program/evidence/2026-09-01-stella-octangula-stationary-release.packet.v1.json",
);

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function vectorObjectToArray(value) {
  return [value.x, value.y, value.z];
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(value) {
  return Math.sqrt(dot(value, value));
}

function maximum(values) {
  return values.length === 0 ? 0 : Math.max(...values);
}

function loadJsonBytes(absolutePath) {
  const bytes = readFileSync(absolutePath);
  return { bytes, value: JSON.parse(bytes.toString("utf8")) };
}

function sourceRows(staticSpec) {
  const worldlineById = new Map(staticSpec.worldlines.map((row) => [row.id, row]));
  const constituentById = new Map(staticSpec.constituents.map((row) => [row.id, row]));
  return staticSpec.relationships.sourceOrder.map((constituentId) => {
    const constituent = constituentById.get(constituentId);
    const worldline = worldlineById.get(constituent.worldlineId);
    requireCondition(worldline.operator.kind === "stationary.v1",
      `source ${worldline.id} is not stationary.v1`);
    return {
      id: worldline.id,
      constituentId,
      charge: constituent.polarity,
      position: structuredClone(worldline.operator.position),
      trajectory: structuredClone(worldline.operator),
    };
  });
}

export function buildStationaryReleaseRequest(staticSpec, declaration, history) {
  validatePrescribedAssemblySpec(staticSpec);
  requireCondition(staticSpec.identity.assemblyId === declaration.source.assemblyId,
    "static source assemblyId differs from the predeclaration");
  requireCondition(
    staticSpec.identity.modelRevisionSha256 === declaration.source.modelRevisionSha256,
    "static source modelRevisionSha256 differs from the predeclaration",
  );
  requireCondition(history.end === declaration.releaseBoundary.releaseTime,
    "stationary history must end exactly at the release boundary");
  const sources = sourceRows(staticSpec);
  const scientificModel = {
    schema: "braid-program/stella-octangula-stationary-release-source.v1",
    baseStaticAssembly: {
      assemblyId: staticSpec.identity.assemblyId,
      modelRevisionSha256: staticSpec.identity.modelRevisionSha256,
    },
    normalizedFieldSpeed: declaration.releaseBoundary.normalizedFieldSpeed,
    coupling: declaration.releaseBoundary.coupling,
    history,
    sources: sources.map((source) => ({
      id: source.id,
      constituentId: source.constituentId,
      charge: source.charge,
      trajectory: source.trajectory,
    })),
  };
  const modelRevisionSha256 = sha256Canonical(scientificModel);
  const sourceRecord = {
    schema: "prescribed-path-analysis/exact-source-record.v1",
    recordId: `${declaration.packetId}:history-${Math.abs(history.start)}-to-0`,
    sourceSchema: scientificModel.schema,
    engineId: "prescribed-geometry",
    engineVersion: "stationary-release-source-builder.v1",
    claimGrade: "derived-prescribed-history",
    evidenceStatus: "release-boundary-diagnostic-only",
    assemblyId: `asm-${modelRevisionSha256.slice(0, 32)}`,
    modelRevisionSha256,
    scientificIdentityPreimage: canonicalJson(scientificModel),
    parameterVector: {
      baseStaticAssembly: scientificModel.baseStaticAssembly,
      normalizedFieldSpeed: scientificModel.normalizedFieldSpeed,
      coupling: scientificModel.coupling,
      history,
      releaseTime: declaration.releaseBoundary.releaseTime,
      incomingVelocity: declaration.releaseBoundary.incomingVelocity,
      sourceInventory: sources.map(({ id, constituentId, charge, position }) => ({
        id,
        constituentId,
        charge,
        position,
      })),
    },
    history,
    sources: sources.map(({ id, charge, trajectory }) => ({ id, charge, trajectory })),
  };

  const protocol = {
    schema: "prescribed-path-analysis/analysis-protocol.v1",
    protocolId: `${declaration.packetId}:history-${Math.abs(history.start)}-to-0`,
    fieldSpeed: declaration.releaseBoundary.normalizedFieldSpeed,
    coupling: declaration.releaseBoundary.coupling,
    history: { ...history, minimumDelay: 1e-12 },
    returnWindow: { start: -1, period: 1 },
    rootPolicy: {
      id: ALL_RETAINED_ROOTS_POLICY,
      tolerance: 1e-13,
      maxIterations: 160,
      initialSubdivisionCount: 16,
      maximumSubdivisionDepth: 24,
      maximumCandidateIntervals: 4096,
    },
    tolerances: {
      cancellationFloor: 1e-30,
      rootTransversalityFloor: 0.999999999,
      minimumSeparationFloor: 0.5,
      convergenceAbsolute: 1e-11,
    },
    geometry: { minimumSeparationSamples: 8 },
    convergence: {
      rootTolerance: 1e-14,
      maxIterations: 192,
      minimumSeparationSamples: 16,
    },
    probes: sources.map((source) => ({
      id: `release-receiver-${source.constituentId}`,
      kind: "prescribed-source-endpoint-probe.v1",
      transmitterId: source.id,
      selfHitPolicy: declaration.releaseBoundary.selfHitPolicy,
      observationTimes: [declaration.releaseBoundary.releaseTime],
      polarities: [source.charge],
    })),
  };
  return { sourceRecord, protocol, sources };
}

function summarizeSubject(packet, sources, oracleRows, declaration) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const oracleById = new Map(oracleRows.map((row) => [row.receiverId, row]));
  const expectedDistances = declaration.rootContract.expectedDistanceMultiplicitiesPerReceiver;
  const rows = packet.rawLedgers.causalRoots.map((event) => {
    const source = sourceById.get(event.receiverSourceId);
    const oracle = oracleById.get(event.receiverSourceId);
    const evaluated = vectorObjectToArray(event.measures.probeResponses[0].acceleration);
    const radialCoefficient = dot(evaluated, source.position) / dot(source.position, source.position);
    const radialVector = source.position.map((value) => value * radialCoefficient);
    const tangentialResidual = subtract(evaluated, radialVector);
    const distanceMultiplicityChecks = expectedDistances.map((expected) => ({
      ...expected,
      measuredMultiplicity: event.roots.filter((root) =>
        Math.abs(root.distance - expected.distance) <=
          declaration.tolerances.rootDistanceAbsolute).length,
    }));
    return {
      receiverId: event.receiverSourceId,
      receiverPolarity: source.charge,
      position: source.position,
      incomingVelocity: vectorObjectToArray(event.probeVelocity),
      certifiedRootCount: event.rootCount,
      rootCompletenessCertified: event.rootCompletenessCertification.complete,
      roots: event.roots.map((root) => ({
        transmitterId: root.transmitterId,
        transmitterPolarity: root.transmitterCharge,
        emissionTime: root.emissionTime,
        delay: root.delay,
        distance: root.distance,
        residual: root.residual,
        transmitterSideFactorDt: root.transmitterSideFactorDt,
      })),
      distanceMultiplicityChecks,
      evaluatedAcceleration: evaluated,
      evaluatedAccelerationMagnitude: norm(evaluated),
      independentAcceleration: oracle.acceleration,
      independentVectorError: norm(subtract(evaluated, oracle.acceleration)),
      radialCoefficient,
      tangentialResidual,
      tangentialResidualMagnitude: norm(tangentialResidual),
    };
  });
  return {
    evaluatorValidity: packet.reducedMeasures.validity,
    receiverCount: rows.length,
    totalCertifiedRoots: rows.reduce((sum, row) => sum + row.certifiedRootCount, 0),
    maximumRootResidual: maximum(rows.flatMap((row) => row.roots.map((root) => Math.abs(root.residual)))),
    maximumIndependentVectorError: maximum(rows.map((row) => row.independentVectorError)),
    maximumTangentialResidual: maximum(rows.map((row) => row.tangentialResidualMagnitude)),
    minimumAccelerationMagnitude: Math.min(...rows.map((row) => row.evaluatedAccelerationMagnitude)),
    maximumAccelerationMagnitude: maximum(rows.map((row) => row.evaluatedAccelerationMagnitude)),
    minimumRadialCoefficient: Math.min(...rows.map((row) => row.radialCoefficient)),
    maximumRadialCoefficient: maximum(rows.map((row) => row.radialCoefficient)),
    rows,
  };
}

function compareHistories(primary, deeper) {
  const deeperById = new Map(deeper.rows.map((row) => [row.receiverId, row]));
  const rows = primary.rows.map((row) => {
    const control = deeperById.get(row.receiverId);
    const accelerationDifference = norm(subtract(
      row.evaluatedAcceleration,
      control.evaluatedAcceleration,
    ));
    const primaryRootSignature = row.roots.map((root) =>
      `${root.transmitterId}:${root.distance.toPrecision(15)}`).sort();
    const controlRootSignature = control.roots.map((root) =>
      `${root.transmitterId}:${root.distance.toPrecision(15)}`).sort();
    return {
      receiverId: row.receiverId,
      primaryRootCount: row.certifiedRootCount,
      deeperRootCount: control.certifiedRootCount,
      rootInventoryMatches: canonicalJson(primaryRootSignature) === canonicalJson(controlRootSignature),
      accelerationDifference,
    };
  });
  return {
    rows,
    maximumAccelerationDifference: maximum(rows.map((row) => row.accelerationDifference)),
    rootInventoriesMatch: rows.every((row) => row.rootInventoryMatches),
  };
}

export function buildStationaryReleasePacket({ staticSpec, declaration, sourceSha256 }) {
  const primaryRequest = buildStationaryReleaseRequest(
    staticSpec,
    declaration,
    declaration.releaseBoundary.primaryHistory,
  );
  const deeperRequest = buildStationaryReleaseRequest(
    staticSpec,
    declaration,
    declaration.releaseBoundary.deeperHistoryControl,
  );
  const primaryEvaluation = evaluatePrescribedRecordAnalysis(primaryRequest);
  const deeperEvaluation = evaluatePrescribedRecordAnalysis(deeperRequest);
  const oracleRows = evaluateIndependentStationaryPairSum(
    primaryRequest.sources,
    declaration.releaseBoundary.coupling,
  );
  const closedFormRadialCoefficient = stellaOctangulaClosedFormCoefficient(
    declaration.independentReference.circumradius,
    declaration.releaseBoundary.coupling,
  );
  const primary = summarizeSubject(
    primaryEvaluation,
    primaryRequest.sources,
    oracleRows,
    declaration,
  );
  const deeper = summarizeSubject(
    deeperEvaluation,
    deeperRequest.sources,
    oracleRows,
    declaration,
  );
  const historyDepthControl = compareHistories(primary, deeper);
  const tolerances = declaration.tolerances;
  const checks = {
    sourceSha256Matches: sourceSha256 === declaration.source.sha256,
    receiverCountMatches: primary.receiverCount === declaration.rootContract.expectedReceiverCount,
    totalRootCountMatches:
      primary.totalCertifiedRoots === declaration.rootContract.expectedTotalRoots,
    rootsPerReceiverMatch: primary.rows.every((row) =>
      row.certifiedRootCount === declaration.rootContract.expectedRootsPerReceiver),
    distanceMultiplicitiesMatch: primary.rows.every((row) =>
      row.distanceMultiplicityChecks.every((check) =>
        check.measuredMultiplicity === check.multiplicity)),
    evaluatorValidityPasses: primary.evaluatorValidity.passed === true,
    rootResidualPasses: primary.maximumRootResidual <= tolerances.rootResidualAbsolute,
    independentVectorParityPasses:
      primary.maximumIndependentVectorError <= tolerances.accelerationVectorAbsolute,
    closedFormRadialCoefficientPasses: primary.rows.every((row) =>
      Math.abs(row.radialCoefficient - closedFormRadialCoefficient) <=
        tolerances.radialCoefficientAbsolute),
    radialSymmetryPasses:
      primary.maximumTangentialResidual <= tolerances.tangentialResidualAbsolute,
    historyDepthRootInventoryPasses: historyDepthControl.rootInventoriesMatch,
    historyDepthAccelerationPasses:
      historyDepthControl.maximumAccelerationDifference <= tolerances.historyDepthParityAbsolute,
  };
  const passed = Object.values(checks).every(Boolean);
  const body = {
    schema: "braid-program/stella-octangula-stationary-release-packet.v1",
    packetId: declaration.packetId,
    date: declaration.date,
    predeclaration: {
      schema: declaration.schema,
      sha256: sha256Canonical(declaration),
    },
    sourceBinding: {
      path: declaration.source.path,
      sha256: sourceSha256,
      assemblyId: staticSpec.identity.assemblyId,
      modelRevisionSha256: staticSpec.identity.modelRevisionSha256,
    },
    releaseBoundary: declaration.releaseBoundary,
    primaryReleaseSource: {
      assemblyId: primaryRequest.sourceRecord.assemblyId,
      modelRevisionSha256: primaryRequest.sourceRecord.modelRevisionSha256,
      exactSourceHash: primaryEvaluation.source.sourceHash,
      protocolHash: primaryEvaluation.protocolHash,
    },
    independentReference: {
      ...declaration.independentReference,
      closedFormRadialCoefficient,
      predictedAccelerationMagnitude:
        Math.abs(closedFormRadialCoefficient) * declaration.independentReference.circumradius,
      oracleRows,
    },
    measurement: primary,
    deeperHistoryControl: {
      releaseSource: {
        assemblyId: deeperRequest.sourceRecord.assemblyId,
        modelRevisionSha256: deeperRequest.sourceRecord.modelRevisionSha256,
        exactSourceHash: deeperEvaluation.source.sourceHash,
        protocolHash: deeperEvaluation.protocolHash,
      },
      comparison: historyDepthControl,
    },
    checks,
    verdict: passed ? "passed" : "failed",
    claimGrade: "measured-prescribed-history-release-boundary",
    claimBoundary: declaration.claimBoundary,
    falsifier: declaration.decisionRule.fail,
    evaluatorPacket: primaryEvaluation,
  };
  return { ...body, resultHash: sha256Canonical(body) };
}

function main() {
  const declarationLoaded = loadJsonBytes(PREDECLARATION_PATH);
  const declaration = declarationLoaded.value;
  const sourcePath = path.resolve(REPO_ROOT, declaration.source.path);
  const sourceLoaded = loadJsonBytes(sourcePath);
  const sourceSha256 = sha256Bytes(sourceLoaded.bytes);
  requireCondition(sourceSha256 === declaration.source.sha256,
    `source SHA-256 mismatch: expected ${declaration.source.sha256}, got ${sourceSha256}`);
  const packet = buildStationaryReleasePacket({
    staticSpec: sourceLoaded.value,
    declaration,
    sourceSha256,
  });
  const bytes = `${JSON.stringify(packet, null, 2)}\n`;
  if (process.argv.includes("--write")) {
    writeFileSync(OUTPUT_PATH, bytes);
  } else if (process.argv.includes("--check")) {
    const existing = readFileSync(OUTPUT_PATH, "utf8");
    requireCondition(existing === bytes,
      `generated stationary-release packet is stale; run ${path.relative(REPO_ROOT, SCRIPT_PATH)} --write`);
  } else {
    process.stdout.write(bytes);
  }
  if (packet.verdict !== "passed") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) main();
