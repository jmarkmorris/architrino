#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  ALL_RETAINED_ROOTS_POLICY,
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
  "reference/priorities/braid-program/evidence/2026-09-02-stella-octangula-catalog-endpoint-balance.predeclaration.v1.json",
);
const OUTPUT_PATH = path.resolve(
  REPO_ROOT,
  "reference/priorities/braid-program/evidence/2026-09-02-stella-octangula-catalog-endpoint-balance.packet.v1.json",
);

function requireCondition(condition, message) {
  if (!condition) throw new Error(message);
}

function sha256Bytes(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function loadJsonBytes(absolutePath) {
  const bytes = readFileSync(absolutePath);
  return { bytes, value: JSON.parse(bytes.toString("utf8")) };
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

export function buildCatalogEndpointRequest(staticSpec, declaration) {
  validatePrescribedAssemblySpec(staticSpec);
  requireCondition(staticSpec.identity.assemblyId === declaration.source.assemblyId,
    "catalog assemblyId differs from the predeclaration");
  requireCondition(
    staticSpec.identity.modelRevisionSha256 === declaration.source.modelRevisionSha256,
    "catalog modelRevisionSha256 differs from the predeclaration",
  );
  requireCondition(
    staticSpec.history.start === declaration.observationBoundary.history.start &&
      staticSpec.history.end === declaration.observationBoundary.history.end,
    "catalog history differs from the predeclared observation history",
  );
  requireCondition(
    declaration.observationBoundary.observationTime === staticSpec.history.end,
    "observation time must be the catalog history endpoint",
  );
  const sources = sourceRows(staticSpec);
  const sourceRecord = {
    schema: "prescribed-path-analysis/exact-source-record.v1",
    recordId: `${declaration.packetId}:exact-catalog-source`,
    sourceSchema: staticSpec.schema,
    engineId: "prescribed-geometry",
    engineVersion: "catalog-endpoint-source-builder.v1",
    claimGrade: "derived-prescribed-history",
    evidenceStatus: "exact-catalog-endpoint-balance-question",
    assemblyId: staticSpec.identity.assemblyId,
    modelRevisionSha256: staticSpec.identity.modelRevisionSha256,
    generatingSpec: {
      path: declaration.source.path,
      sha256: declaration.source.sha256,
    },
    parameterVector: {
      normalizedFieldSpeed: declaration.observationBoundary.normalizedFieldSpeed,
      coupling: declaration.observationBoundary.coupling,
      history: structuredClone(staticSpec.history),
      observationTime: declaration.observationBoundary.observationTime,
      sourceInventory: sources.map(({ id, constituentId, charge, position }) => ({
        id,
        constituentId,
        charge,
        position,
      })),
    },
    history: {
      start: staticSpec.history.start,
      end: staticSpec.history.end,
    },
    sources: sources.map(({ id, charge, trajectory }) => ({ id, charge, trajectory })),
  };
  const protocol = {
    schema: "prescribed-path-analysis/analysis-protocol.v1",
    protocolId: `${declaration.packetId}:endpoint-T-${staticSpec.history.end}`,
    fieldSpeed: declaration.observationBoundary.normalizedFieldSpeed,
    coupling: declaration.observationBoundary.coupling,
    history: { ...sourceRecord.history, minimumDelay: 1e-12 },
    returnWindow: { start: staticSpec.history.start, period: staticSpec.history.end - staticSpec.history.start },
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
      id: `catalog-endpoint-receiver-${source.constituentId}`,
      kind: "prescribed-source-endpoint-probe.v1",
      transmitterId: source.id,
      selfHitPolicy: declaration.observationBoundary.selfHitPolicy,
      observationTimes: [declaration.observationBoundary.observationTime],
      polarities: [source.charge],
    })),
  };
  return { sourceRecord, protocol, sources };
}

function summarize(evaluation, sources, oracleRows, declaration) {
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const oracleById = new Map(oracleRows.map((row) => [row.receiverId, row]));
  const rows = evaluation.rawLedgers.causalRoots.map((event) => {
    const source = sourceById.get(event.receiverSourceId);
    const oracle = oracleById.get(event.receiverSourceId);
    const evaluated = vectorObjectToArray(event.measures.probeResponses[0].acceleration);
    const radialCoefficient = dot(evaluated, source.position) / dot(source.position, source.position);
    const radialVector = source.position.map((value) => value * radialCoefficient);
    const tangentialResidual = subtract(evaluated, radialVector);
    const distanceMultiplicityChecks = declaration.rootContract.expectedDistanceMultiplicitiesPerReceiver
      .map((expected) => ({
        ...expected,
        measuredMultiplicity: event.roots.filter((root) =>
          Math.abs(root.distance - expected.distance) <= declaration.tolerances.rootDistanceAbsolute).length,
      }));
    return {
      receiverId: event.receiverSourceId,
      receiverPolarity: source.charge,
      position: source.position,
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
    evaluatorValidity: evaluation.reducedMeasures.validity,
    receiverCount: rows.length,
    totalCertifiedRoots: rows.reduce((sum, row) => sum + row.certifiedRootCount, 0),
    leftBoundaryRootCount: rows.reduce((sum, row) => sum + row.roots.filter((root) =>
      Math.abs(root.emissionTime - declaration.observationBoundary.history.start) <=
        declaration.tolerances.rootTimeAbsolute).length, 0),
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

export function buildCatalogEndpointBalancePacket({ staticSpec, declaration, sourceSha256 }) {
  const request = buildCatalogEndpointRequest(staticSpec, declaration);
  const evaluation = evaluatePrescribedRecordAnalysis(request);
  const oracleRows = evaluateIndependentStationaryPairSum(
    request.sources,
    declaration.observationBoundary.coupling,
  );
  const closedFormRadialCoefficient = stellaOctangulaClosedFormCoefficient(
    declaration.independentReference.circumradius,
    declaration.observationBoundary.coupling,
  );
  const measurement = summarize(evaluation, request.sources, oracleRows, declaration);
  const tolerances = declaration.tolerances;
  const checks = {
    sourceSha256Matches: sourceSha256 === declaration.source.sha256,
    exactIdentityMatches:
      request.sourceRecord.assemblyId === declaration.source.assemblyId &&
      request.sourceRecord.modelRevisionSha256 === declaration.source.modelRevisionSha256,
    exactHistoryMatches:
      request.sourceRecord.history.start === declaration.observationBoundary.history.start &&
      request.sourceRecord.history.end === declaration.observationBoundary.history.end,
    receiverCountMatches: measurement.receiverCount === declaration.rootContract.expectedReceiverCount,
    totalRootCountMatches: measurement.totalCertifiedRoots === declaration.rootContract.expectedTotalRoots,
    rootsPerReceiverMatch: measurement.rows.every((row) =>
      row.certifiedRootCount === declaration.rootContract.expectedRootsPerReceiver),
    leftBoundaryRootsMatch:
      measurement.leftBoundaryRootCount === declaration.rootContract.expectedLeftBoundaryRoots,
    distanceMultiplicitiesMatch: measurement.rows.every((row) =>
      row.distanceMultiplicityChecks.every((check) => check.measuredMultiplicity === check.multiplicity)),
    evaluatorValidityPasses: measurement.evaluatorValidity.passed === true,
    rootResidualPasses: measurement.maximumRootResidual <= tolerances.rootResidualAbsolute,
    independentVectorParityPasses:
      measurement.maximumIndependentVectorError <= tolerances.accelerationVectorAbsolute,
    closedFormRadialCoefficientPasses: measurement.rows.every((row) =>
      Math.abs(row.radialCoefficient - closedFormRadialCoefficient) <=
        tolerances.radialCoefficientAbsolute),
    radialSymmetryPasses:
      measurement.maximumTangentialResidual <= tolerances.tangentialResidualAbsolute,
    nonzeroAccelerationExcludesBalance:
      measurement.minimumAccelerationMagnitude > tolerances.balanceAccelerationAbsolute,
  };
  const passed = Object.values(checks).every(Boolean);
  const body = {
    schema: "braid-program/stella-octangula-catalog-endpoint-balance-packet.v1",
    packetId: declaration.packetId,
    date: declaration.date,
    predeclaration: { schema: declaration.schema, sha256: sha256Canonical(declaration) },
    sourceBinding: {
      path: declaration.source.path,
      sha256: sourceSha256,
      assemblyId: request.sourceRecord.assemblyId,
      modelRevisionSha256: request.sourceRecord.modelRevisionSha256,
      exactSourceHash: evaluation.source.sourceHash,
      protocolHash: evaluation.protocolHash,
    },
    observationBoundary: declaration.observationBoundary,
    independentReference: {
      ...declaration.independentReference,
      closedFormRadialCoefficient,
      predictedAccelerationMagnitude:
        Math.abs(closedFormRadialCoefficient) * declaration.independentReference.circumradius,
      oracleRows,
    },
    measurement,
    checks,
    verdict: passed ? "passed" : "failed",
    scientificAdjudication: passed ? declaration.intendedAdjudication : null,
    claimGrade: "derived-and-measured-exact-catalog-endpoint-balance-exclusion",
    claimBoundary: declaration.claimBoundary,
    falsifier: declaration.decisionRule.fail,
    evaluatorPacket: evaluation,
  };
  return { ...body, resultHash: sha256Canonical(body) };
}

function main() {
  const declaration = loadJsonBytes(PREDECLARATION_PATH).value;
  const sourcePath = path.resolve(REPO_ROOT, declaration.source.path);
  const sourceLoaded = loadJsonBytes(sourcePath);
  const sourceSha256 = sha256Bytes(sourceLoaded.bytes);
  requireCondition(sourceSha256 === declaration.source.sha256,
    `source SHA-256 mismatch: expected ${declaration.source.sha256}, got ${sourceSha256}`);
  const packet = buildCatalogEndpointBalancePacket({
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
      `generated catalog-endpoint packet is stale; run ${path.relative(REPO_ROOT, SCRIPT_PATH)} --write`);
  } else {
    process.stdout.write(bytes);
  }
  if (packet.verdict !== "passed") process.exitCode = 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) main();
