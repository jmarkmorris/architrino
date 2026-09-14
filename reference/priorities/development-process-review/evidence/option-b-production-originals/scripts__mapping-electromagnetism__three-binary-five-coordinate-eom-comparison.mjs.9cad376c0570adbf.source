#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

import {
  createBorgEomShadowRunner,
} from "../../src/apps/borg/BorgEomShadowRunner.js";
import {
  BORG_ELECTRINO_STATE_FLAG,
  BORG_POSITRINO_STATE_FLAG,
} from "../../src/apps/borg/BorgPolarityDiagnostics.js";
import {
  evaluateEomCubicHistoryAtTime,
} from "../../src/apps/shared/EomCubicHistoryEvaluation.mjs";
import {
  createBorgNativeEomProcessClient,
} from "../eom/BorgNativeEomProcessClient.mjs";
import {
  buildMatchedFiveCoordinateInitializations,
} from "./three-binary-five-coordinate-initialization-ledger.mjs";

const SCHEMA = "three_binary_five_coordinate_bounded_eom_comparison/v1";
const CF = 1;
const START_TIME = 0;
const END_TIME = 0.15;
const CHUNK_DURATION = 0.05;
const HISTORY_DEPTH = 4;
const SIMULATION_OUTER_RADIUS = 1.5;
const COUPLING = String(36 * 0.2862286103053385);
const CHARGE_MAGNITUDE = "0.1666666666666666666666666666666667";
const MATERIALITY_FRACTION = 0.1;
const AXES = ["x", "y", "z"];
const Q = [
  [0, 0, 1],
  [1, 0, 0],
  [0, 1, 0],
];

export const DECLARED_FIVE_COORDINATE_INPUT = Object.freeze({
  seed: Object.freeze({
    h: 0.28,
    rho: 0.19,
    theta: 0.42,
    hDot: 0.01,
    rhoDot: -0.02,
    thetaDot: 0.3,
  }),
  coordinates: Object.freeze([0.02, -0.015, 0.01, 0.012, -0.008]),
  rates: Object.freeze([0.03, -0.02, 0.04, 0.01, -0.015]),
});

const COMMON_LOCUS_INPUT = Object.freeze({
  ...DECLARED_FIVE_COORDINATE_INPUT,
  coordinates: Object.freeze([
    ...DECLARED_FIVE_COORDINATE_INPUT.coordinates.slice(0, 3),
    0,
    0,
  ]),
  rates: Object.freeze([
    ...DECLARED_FIVE_COORDINATE_INPUT.rates.slice(0, 3),
    0,
    0,
  ]),
});

const MANIFEST = Object.freeze({
  manifestId: "three-binary-five-coordinate-bounded-eom-comparison-v1",
  population: Object.freeze({
    architrinoCount: 6,
    maximumArchitrinoCount: 6,
  }),
  simulationEnvelope: Object.freeze({
    center: Object.freeze({ x: 0, y: 0, z: 0 }),
    outerRadius: SIMULATION_OUTER_RADIUS,
    fieldSpeed: CF,
    sampleInterval: CHUNK_DURATION,
    historyDepth: HISTORY_DEPTH,
  }),
  initialConditions: Object.freeze({
    positrinoCharge: Number(CHARGE_MAGNITUDE),
    electrinoCharge: -Number(CHARGE_MAGNITUDE),
  }),
  modelControls: Object.freeze({ coupling: COUPLING }),
});

function add(left, right) {
  return left.map((value, index) => value + right[index]);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function scale(vector, factor) {
  return vector.map((value) => value * factor);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function rotate(vector) {
  return Q.map((row) => dot(row, vector));
}

function mean(vectors) {
  return scale(vectors.reduce((sum, vector) => add(sum, vector), [0, 0, 0]), 1 / vectors.length);
}

function maximum(values, fallback = 0) {
  return values.length === 0 ? fallback : Math.max(...values);
}

function minimum(values, fallback = null) {
  return values.length === 0 ? fallback : Math.min(...values);
}

function memberOrder(left, right) {
  return left.module - right.module || right.polarity - left.polarity;
}

function initialGeometry(input, candidate) {
  const built = buildMatchedFiveCoordinateInitializations(input);
  return candidate === "A" ? built.candidateA : built.candidateB;
}

export function createExactLinearHistories(geometry, {
  historyStart = -HISTORY_DEPTH,
  historyEnd = START_TIME,
} = {}) {
  if (!(historyEnd > historyStart)) {
    throw new RangeError("exact linear histories require a positive time interval");
  }
  return geometry.members.slice().sort(memberOrder).map((member, pathKey) => {
    const startPosition = add(
      member.position,
      scale(member.velocity, historyStart - historyEnd),
    );
    return Object.freeze({
      pathId: member.id,
      pathKey,
      memberId: member.id,
      module: member.module,
      polarity: member.polarity,
      charge: member.polarity > 0 ? CHARGE_MAGNITUDE : `-${CHARGE_MAGNITUDE}`,
      stateFlags: member.polarity > 0
        ? BORG_POSITRINO_STATE_FLAG
        : BORG_ELECTRINO_STATE_FLAG,
      coverageStart: String(historyStart),
      coverageEnd: String(historyEnd),
      interpolation: "exact-inertial-polynomial/v1",
      sourceProvenance: "five-coordinate-ledger-linear-prehistory/v1",
      sourceClaimLevel: "declared-accepted-initial-datum",
      sourceAcceptedInitialDatum: true,
      sourceIsEomOutput: false,
      segments: Object.freeze([Object.freeze({
        startTime: String(historyStart),
        endTime: String(historyEnd),
        coefficients: Object.freeze(startPosition.map((position, axis) => Object.freeze([
          String(position),
          String(member.velocity[axis]),
          "0",
          "0",
        ]))),
        positionErrors: Object.freeze(["0", "0", "0"]),
        velocityErrors: Object.freeze(["0", "0", "0"]),
      })]),
    });
  });
}

function stateRowsAt(histories, time, metadata) {
  return histories.map((history) => {
    const evaluated = evaluateEomCubicHistoryAtTime(history, time);
    const member = metadata.get(history.pathId);
    return {
      id: history.pathId,
      module: member.module,
      polarity: member.polarity,
      position: AXES.map((axis) => evaluated.position[axis]),
      velocity: AXES.map((axis) => evaluated.velocity[axis]),
      errorBound: evaluated.errorBound,
    };
  }).sort(memberOrder);
}

function currentSegmentAcceleration(history, time) {
  const segment = history.segments.find((candidate, index) =>
    Number(candidate.startTime) <= time &&
    (time < Number(candidate.endTime) || index + 1 === history.segments.length));
  if (!segment) return null;
  const localTime = time - Number(segment.startTime);
  return segment.coefficients.map((axis) => {
    const [, , c2, c3] = axis.map(Number);
    return 2 * c2 + 6 * c3 * localTime;
  });
}

function clearance(rows) {
  const distances = [];
  for (let left = 0; left < rows.length; left += 1) {
    for (let right = left + 1; right < rows.length; right += 1) {
      distances.push(norm(subtract(rows[left].position, rows[right].position)));
    }
  }
  return minimum(distances);
}

function cyclicResidual(rows, centerPosition, centerVelocity) {
  const byKey = new Map(rows.map((row) => [`${row.module}:${row.polarity}`, row]));
  const position = [];
  const velocity = [];
  rows.forEach((row) => {
    const next = byKey.get(`${(row.module + 1) % 3}:${row.polarity}`);
    position.push(norm(subtract(
      rotate(subtract(row.position, centerPosition)),
      subtract(next.position, centerPosition),
    )));
    velocity.push(norm(subtract(
      rotate(subtract(row.velocity, centerVelocity)),
      subtract(next.velocity, centerVelocity),
    )));
  });
  return { position: maximum(position), velocity: maximum(velocity) };
}

function pairConjugacyResidual(rows, centerPosition, centerVelocity) {
  const position = [];
  const velocity = [];
  for (let module = 0; module < 3; module += 1) {
    const positive = rows.find((row) => row.module === module && row.polarity === 1);
    const negative = rows.find((row) => row.module === module && row.polarity === -1);
    position.push(norm(subtract(add(positive.position, negative.position), scale(centerPosition, 2))));
    velocity.push(norm(subtract(add(positive.velocity, negative.velocity), scale(centerVelocity, 2))));
  }
  return { position: maximum(position), velocity: maximum(velocity) };
}

function tangentNormalLeakage(rows, initialRows, tangentColumns) {
  const center = mean(rows.map((row) => row.position));
  const initialCenter = mean(initialRows.map((row) => row.position));
  const centeredDelta = rows.flatMap((row, index) => subtract(
    subtract(row.position, center),
    subtract(initialRows[index].position, initialCenter),
  ));
  const projection = Array(centeredDelta.length).fill(0);
  const recoveredCoordinates = tangentColumns.map((column) => dot(column, centeredDelta) / 6);
  tangentColumns.forEach((column, coordinate) => {
    column.forEach((entry, index) => {
      projection[index] += recoveredCoordinates[coordinate] * entry;
    });
  });
  const normal = subtract(centeredDelta, projection);
  return {
    rmsPosition: norm(normal) / Math.sqrt(6),
    projectedCoordinates: recoveredCoordinates,
  };
}

export function measureState(histories, time, geometry, initialRows) {
  const metadata = new Map(geometry.members.map((member) => [member.id, member]));
  const rows = stateRowsAt(histories, time, metadata);
  const centerPosition = mean(rows.map((row) => row.position));
  const centerVelocity = mean(rows.map((row) => row.velocity));
  const accelerations = histories.map((history) => currentSegmentAcceleration(history, time));
  const centerAcceleration = accelerations.every(Boolean) ? mean(accelerations) : null;
  const identityPosition = rows.map((row, index) => norm(subtract(row.position, initialRows[index].position)));
  const identityVelocity = rows.map((row, index) => norm(subtract(row.velocity, initialRows[index].velocity)));
  return {
    time,
    minimumPairDistance: clearance(rows),
    maximumMemberSpeed: maximum(rows.map((row) => norm(row.velocity))),
    speedPinMargin: CF - maximum(rows.map((row) => norm(row.velocity))),
    maximumHistoryErrorBound: maximum(rows.map((row) => row.errorBound)),
    centerPosition,
    centerVelocity,
    centerAccelerationFromAcceptedSegment: centerAcceleration,
    centerPositionMagnitude: norm(centerPosition),
    centerVelocityMagnitude: norm(centerVelocity),
    centerAccelerationMagnitude: centerAcceleration == null ? null : norm(centerAcceleration),
    pairConjugacyResidual: pairConjugacyResidual(rows, centerPosition, centerVelocity),
    cyclicResidual: cyclicResidual(rows, centerPosition, centerVelocity),
    normalLeakage: tangentNormalLeakage(rows, initialRows, geometry.tangentColumns),
    declaredReturnActions: Object.freeze({
      actionSet: Object.freeze(["identity-labeled"]),
      identityLabeledRmsPosition: Math.hypot(...identityPosition) / Math.sqrt(rows.length),
      identityLabeledRmsVelocity: Math.hypot(...identityVelocity) / Math.sqrt(rows.length),
    }),
  };
}

function summarizeRootDiagnostics(diagnostics) {
  const steps = diagnostics.flatMap((row) => row.stepFailures ?? []);
  const acceptedSteps = steps.filter((step) => step.status === "accepted");
  const rejectedSteps = steps.filter((step) => step.status !== "accepted");
  const rootRows = acceptedSteps.flatMap((step) => step.rootAccounting ?? []);
  const transmitterLowerBounds = rootRows.flatMap((row) => (row.roots ?? []).map((root) => {
    const lower = Number(root.transmitterFactorLower);
    const upper = Number(root.transmitterFactorUpper);
    return lower <= 0 && upper >= 0 ? 0 : Math.min(Math.abs(lower), Math.abs(upper));
  })).filter(Number.isFinite);
  const statusCounts = Object.fromEntries([...new Set(rootRows.map((row) => row.status))]
    .sort()
    .map((status) => [status, rootRows.filter((row) => row.status === status).length]));
  const acceptedRootRows = rootRows.filter((row) =>
    (row.status === "certified_complete" || row.status === "certified_enclosed") &&
    row.memoryBoundaryContact !== true);
  return {
    attemptedStepCount: steps.length,
    acceptedStepCount: acceptedSteps.length,
    rejectedAttemptCount: rejectedSteps.length,
    rootCertificateCount: rootRows.length,
    acceptedRootCertificateCount: acceptedRootRows.length,
    certifiedCompleteRootCertificateCount: rootRows.filter((row) =>
      row.status === "certified_complete" && row.memoryBoundaryContact !== true).length,
    certifiedEnclosedRootCertificateCount: rootRows.filter((row) =>
      row.status === "certified_enclosed" && row.memoryBoundaryContact !== true).length,
    rootCertificateStatusCounts: statusCounts,
    unresolvedTraversalPairCount: acceptedSteps.reduce(
      (sum, step) => sum + Number(step.traversalUnresolvedPairs ?? 0),
      0,
    ),
    rootFailureCount: rootRows.length - acceptedRootRows.length,
    retryRootFailureCount: acceptedSteps.reduce(
      (sum, step) => sum + (step.rootFailures?.length ?? 0),
      0,
    ),
    minimumTransmitterFactorMagnitudeLowerBound: minimum(transmitterLowerBounds),
  };
}

function mergeRootSummaries(left, right) {
  return {
    attemptedStepCount: left.attemptedStepCount + right.attemptedStepCount,
    acceptedStepCount: left.acceptedStepCount + right.acceptedStepCount,
    rejectedAttemptCount: left.rejectedAttemptCount + right.rejectedAttemptCount,
    rootCertificateCount: left.rootCertificateCount + right.rootCertificateCount,
    acceptedRootCertificateCount:
      left.acceptedRootCertificateCount + right.acceptedRootCertificateCount,
    certifiedCompleteRootCertificateCount:
      left.certifiedCompleteRootCertificateCount + right.certifiedCompleteRootCertificateCount,
    certifiedEnclosedRootCertificateCount:
      left.certifiedEnclosedRootCertificateCount + right.certifiedEnclosedRootCertificateCount,
    rootCertificateStatusCounts: Object.fromEntries([
      ...new Set([
        ...Object.keys(left.rootCertificateStatusCounts),
        ...Object.keys(right.rootCertificateStatusCounts),
      ]),
    ].sort().map((status) => [
      status,
      (left.rootCertificateStatusCounts[status] ?? 0) +
      (right.rootCertificateStatusCounts[status] ?? 0),
    ])),
    unresolvedTraversalPairCount:
      left.unresolvedTraversalPairCount + right.unresolvedTraversalPairCount,
    rootFailureCount: left.rootFailureCount + right.rootFailureCount,
    retryRootFailureCount: left.retryRootFailureCount + right.retryRootFailureCount,
    minimumTransmitterFactorMagnitudeLowerBound: minimum([
      left.minimumTransmitterFactorMagnitudeLowerBound,
      right.minimumTransmitterFactorMagnitudeLowerBound,
    ].filter((value) => value != null)),
  };
}

async function runCase({
  binaryPath,
  id,
  input,
  candidate,
  endTime,
  chunkDuration = CHUNK_DURATION,
}) {
  const geometry = initialGeometry(input, candidate);
  const initialHistories = createExactLinearHistories(geometry);
  const metadata = new Map(geometry.members.map((member) => [member.id, member]));
  const initialRows = stateRowsAt(initialHistories, START_TIME, metadata);
  const client = createBorgNativeEomProcessClient({
    binaryPath,
    timeoutMs: 180000,
  });
  const runner = createBorgEomShadowRunner(MANIFEST, {
    eomClient: client,
    initialRetainedHistories: initialHistories,
    runId: id,
    pathCount: 6,
    startTime: START_TIME,
    targetDuration: endTime,
    chunkDuration,
    sampleInterval: chunkDuration,
    historyDepth: HISTORY_DEPTH,
    historySafetyMargin: 0.15,
    simulationOuterRadius: SIMULATION_OUTER_RADIUS,
    fieldSpeed: CF,
    coupling: COUPLING,
  });
  const samples = [measureState(initialHistories, START_TIME, geometry, initialRows)];
  const chunks = [];
  let rootSummary = {
    attemptedStepCount: 0,
    acceptedStepCount: 0,
    rejectedAttemptCount: 0,
    rootCertificateCount: 0,
    acceptedRootCertificateCount: 0,
    certifiedCompleteRootCertificateCount: 0,
    certifiedEnclosedRootCertificateCount: 0,
    rootCertificateStatusCounts: {},
    unresolvedTraversalPairCount: 0,
    rootFailureCount: 0,
    retryRootFailureCount: 0,
    minimumTransmitterFactorMagnitudeLowerBound: null,
  };
  const started = performance.now();
  let terminalHalt = false;
  try {
    while (runner.canComputeNextChunk()) {
      const target = Math.min(endTime, runner.nextStartTime + chunkDuration);
      process.stderr.write(`[heartbeat] ${id} requesting ${runner.nextStartTime.toFixed(6)} -> ${target.toFixed(6)}\n`);
      const chunkStarted = performance.now();
      const chunk = await runner.computeNextChunk();
      const chunkRootSummary = summarizeRootDiagnostics(chunk.diagnostics);
      rootSummary = mergeRootSummaries(rootSummary, chunkRootSummary);
      const measurement = measureState(chunk.histories, chunk.endTime, geometry, initialRows);
      samples.push(measurement);
      chunks.push({
        chunkIndex: chunk.chunkIndex,
        startTime: chunk.startTime,
        acceptedEndTime: chunk.endTime,
        statusCode: chunk.statusCode,
        terminalHalt: chunk.terminalHalt,
        evidenceStatus: chunk.evidenceStatus,
        claimGrade: chunk.claimGrade,
        initialHistoryAccepted: chunk.initialHistoryAccepted,
        rootSummary: chunkRootSummary,
        wallTimeSeconds: (performance.now() - chunkStarted) / 1000,
      });
      process.stderr.write(`[heartbeat] ${id} accepted through ${chunk.endTime.toFixed(6)}\n`);
      if (chunk.terminalHalt) {
        terminalHalt = true;
        break;
      }
    }
  } finally {
    await runner.dispose();
  }
  const acceptedEndTime = samples.at(-1).time;
  const rootCompletenessPassed = rootSummary.rootCertificateCount > 0 &&
    rootSummary.rootCertificateCount === rootSummary.acceptedRootCertificateCount &&
    rootSummary.unresolvedTraversalPairCount === 0 &&
    rootSummary.rootFailureCount === 0;
  const guardedSamples = samples.filter((sample) =>
    sample.minimumPairDistance > 0 && sample.maximumMemberSpeed < CF);
  const guardedEndTime = guardedSamples.at(-1)?.time ?? null;
  const firstGuardViolation = samples.find((sample) =>
    !(sample.minimumPairDistance > 0) || !(sample.maximumMemberSpeed < CF));
  return {
    id,
    candidate,
    candidateShortName: candidate === "A" ? "A3 pair-conjugate slice" : "SD3",
    inputKind: input === COMMON_LOCUS_INPUT ? "common-three-coordinate-locus" : "declared-five-coordinate-slice",
    status: terminalHalt
      ? "halted_prefix"
      : firstGuardViolation
        ? "speed_or_clearance_guard_crossed"
        : acceptedEndTime === endTime
          ? "completed_bounded_window"
          : "incomplete_prefix",
    acceptedEndTime,
    guardedEndTime,
    firstGuardViolation: firstGuardViolation == null ? null : {
      time: firstGuardViolation.time,
      minimumPairDistance: firstGuardViolation.minimumPairDistance,
      maximumMemberSpeed: firstGuardViolation.maximumMemberSpeed,
    },
    requestedEndTime: endTime,
    chunkDuration,
    boundedThroughRequestedEnd:
      !terminalHalt && acceptedEndTime === endTime && firstGuardViolation == null,
    rootCompletenessPassed,
    rootSummary,
    wallTimeSeconds: (performance.now() - started) / 1000,
    chunks,
    samples,
  };
}

function stateDelta(left, right) {
  const fields = [
    "minimumPairDistance",
    "maximumMemberSpeed",
    "centerPositionMagnitude",
    "centerVelocityMagnitude",
    "centerAccelerationMagnitude",
  ];
  const scalarDeltas = Object.fromEntries(fields.map((field) => [
    field,
    left[field] == null || right[field] == null ? null : Math.abs(left[field] - right[field]),
  ]));
  return {
    ...scalarDeltas,
    pairConjugacyPosition: Math.abs(
      left.pairConjugacyResidual.position - right.pairConjugacyResidual.position,
    ),
    cyclicPosition: Math.abs(left.cyclicResidual.position - right.cyclicResidual.position),
    normalLeakage: Math.abs(
      left.normalLeakage.rmsPosition - right.normalLeakage.rmsPosition,
    ),
    identityReturnPosition: Math.abs(
      left.declaredReturnActions.identityLabeledRmsPosition -
      right.declaredReturnActions.identityLabeledRmsPosition,
    ),
  };
}

function relativeDifference(left, right) {
  const scaleValue = Math.max(Math.abs(left), Math.abs(right), Number.EPSILON);
  return Math.abs(left - right) / scaleValue;
}

function decideRefinement(candidateA, candidateB) {
  const comparisonEndTime = Math.min(candidateA.guardedEndTime, candidateB.guardedEndTime);
  const finalA = candidateA.samples.find((sample) => sample.time === comparisonEndTime);
  const finalB = candidateB.samples.find((sample) => sample.time === comparisonEndTime);
  if (!(comparisonEndTime > 0) || !finalA || !finalB ||
      !candidateA.rootCompletenessPassed || !candidateB.rootCompletenessPassed) {
    return {
      triggered: false,
      reason: "refinement is barred because one declared guard or bounded window did not close",
    };
  }
  const metrics = {
    minimumPairDistance: relativeDifference(finalA.minimumPairDistance, finalB.minimumPairDistance),
    maximumMemberSpeed: relativeDifference(finalA.maximumMemberSpeed, finalB.maximumMemberSpeed),
    normalLeakage: relativeDifference(
      finalA.normalLeakage.rmsPosition,
      finalB.normalLeakage.rmsPosition,
    ),
    identityReturnPosition: relativeDifference(
      finalA.declaredReturnActions.identityLabeledRmsPosition,
      finalB.declaredReturnActions.identityLabeledRmsPosition,
    ),
  };
  const triggeredMetrics = Object.entries(metrics)
    .filter(([, value]) => value >= MATERIALITY_FRACTION)
    .map(([name]) => name);
  return {
    triggered: triggeredMetrics.length > 0,
    comparisonEndTime,
    reason: triggeredMetrics.length > 0
      ? `at least one predeclared endpoint metric differs by ${MATERIALITY_FRACTION * 100}% or more`
      : `no predeclared endpoint metric differs by ${MATERIALITY_FRACTION * 100}% or more`,
    relativeDifferences: metrics,
    triggeredMetrics,
  };
}

export async function runBoundedFiveCoordinateComparison({
  binaryPath = resolve(".tmp/eom-native-dev/eom_borg_shadow_cli"),
  endTime = END_TIME,
} = {}) {
  const cases = [];
  for (const row of [
    { id: "common-locus-A", input: COMMON_LOCUS_INPUT, candidate: "A" },
    { id: "common-locus-B", input: COMMON_LOCUS_INPUT, candidate: "B" },
    { id: "declared-slice-A", input: DECLARED_FIVE_COORDINATE_INPUT, candidate: "A" },
    { id: "declared-slice-B", input: DECLARED_FIVE_COORDINATE_INPUT, candidate: "B" },
  ]) {
    cases.push(await runCase({ ...row, binaryPath, endTime }));
  }
  const commonA = cases[0];
  const commonB = cases[1];
  const candidateA = cases[2];
  const candidateB = cases[3];
  const commonLocusControl = commonA.samples.length === commonB.samples.length
    ? commonA.samples.map((sample, index) => ({
      time: sample.time,
      deltas: stateDelta(sample, commonB.samples[index]),
    }))
    : null;
  const refinementDecision = decideRefinement(candidateA, candidateB);
  const refinementCases = [];
  if (refinementDecision.triggered) {
    for (const row of [
      {
        id: "declared-slice-A-half-chunk",
        input: DECLARED_FIVE_COORDINATE_INPUT,
        candidate: "A",
      },
      {
        id: "declared-slice-B-half-chunk",
        input: DECLARED_FIVE_COORDINATE_INPUT,
        candidate: "B",
      },
    ]) {
      refinementCases.push(await runCase({
        ...row,
        binaryPath,
        endTime,
        chunkDuration: CHUNK_DURATION / 2,
      }));
    }
  }
  const refinementReplication = refinementCases.length === 2 ? {
    status: refinementCases.every((row) =>
      row.boundedThroughRequestedEnd && row.rootCompletenessPassed)
      ? "completed"
      : "guard_failed",
    halfChunkDuration: CHUNK_DURATION / 2,
    cases: refinementCases,
    comparisonEndTime: refinementDecision.comparisonEndTime,
    candidateAEndpointDelta: stateDelta(
      candidateA.samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
      refinementCases[0].samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
    ),
    candidateBEndpointDelta: stateDelta(
      candidateB.samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
      refinementCases[1].samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
    ),
    refinedEndpointComparison: stateDelta(
      refinementCases[0].samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
      refinementCases[1].samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
    ),
  } : null;
  return {
    schema: SCHEMA,
    generatedAt: new Date().toISOString(),
    closureGoal: "bounded EOM behavior of one declared five-coordinate Candidate-A slice relative to its matched SD3 sector-differential counterpart",
    claimGrade: "measured executable-architecture evidence conditioned on one declared accepted linear prehistory",
    scope: {
      familyGeneralizationAuthorized: false,
      candidateAScope: "one affine five-coordinate A3 slice at one declared coordinate/rate row",
      candidateBScope: "its metric-matched gauge-fixed SD3 sector-differential row; candidateBScope is a provenance-bound schema key",
      stabilityClaimAuthorized: false,
      retentionClaimAuthorized: false,
      pairConjugacyOnlyAttributionAuthorized: false,
    },
    protocol: {
      cF: CF,
      interval: [START_TIME, endTime],
      historyInterval: [-HISTORY_DEPTH, START_TIME],
      historyConstruction: "exact linear continuation of each ledger endpoint and rate",
      chunkDuration: CHUNK_DURATION,
      requestedSampleCadence: CHUNK_DURATION,
      coupling: COUPLING,
      chargeMagnitude: CHARGE_MAGNITUDE,
      coreScale: 0.2,
      certifiedBudgetId: "research-certified-v1",
      commonLocusControl: "Candidate A and B are separately encoded from the analytically identical three-coordinate locus",
      declaredReturnActions: ["identity-labeled"],
      stoppingRule: `stop at T=${endTime} or the first fail-closed EOM halt; do not label a finite section crossing as retention`,
      refinementRule: `run one half-chunk replication only when all guards close and an endpoint metric differs by at least ${MATERIALITY_FRACTION * 100}%`,
    },
    input: DECLARED_FIVE_COORDINATE_INPUT,
    cases,
    commonLocusControl,
    commonLocusMaximumDelta: commonLocusControl == null ? null : Math.max(
      ...commonLocusControl.flatMap((row) => Object.values(row.deltas).filter(Number.isFinite)),
    ),
    guardedComparisonEndTime: refinementDecision.comparisonEndTime ?? null,
    declaredSliceEndpointComparison: refinementDecision.comparisonEndTime == null
      ? null
      : stateDelta(
        candidateA.samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
        candidateB.samples.find((sample) => sample.time === refinementDecision.comparisonEndTime),
      ),
    refinementDecision,
    refinementReplication,
    adjudication: {
      boundedComparisonCompleted:
        (refinementDecision.comparisonEndTime ?? 0) > 0 &&
        candidateA.rootCompletenessPassed && candidateB.rootCompletenessPassed,
      boundedComparisonEndTime: refinementDecision.comparisonEndTime ?? null,
      requestedWindowReachedWithoutGuardCrossing:
        candidateA.boundedThroughRequestedEnd && candidateB.boundedThroughRequestedEnd,
      causalRootGuardsClosed: candidateA.rootCompletenessPassed && candidateB.rootCompletenessPassed,
      commonLocusEncodingControlPassed:
        commonA.boundedThroughRequestedEnd && commonB.boundedThroughRequestedEnd &&
        commonLocusControl != null && commonLocusControl.every((row) =>
          Object.values(row.deltas).filter(Number.isFinite).every((value) => value <= 1e-12)),
      resultScope: "specific declared A3 slice only; no full-family inference",
      excludedClaims: [
        "retention or stability",
        "binding or particle identity",
        "electromagnetic recovery",
        "causal attribution to pair conjugacy alone",
        "behavior of the full A3 family",
      ],
    },
  };
}

function parseArguments(argv) {
  const options = {};
  argv.forEach((argument) => {
    if (argument.startsWith("--binary=")) options.binaryPath = resolve(argument.slice(9));
    else if (argument.startsWith("--end-time=")) options.endTime = Number(argument.slice(11));
    else if (argument.startsWith("--output=")) options.outputPath = resolve(argument.slice(9));
    else throw new RangeError(`unsupported option: ${argument}`);
  });
  if (options.endTime != null && (!(options.endTime > 0) || options.endTime > END_TIME)) {
    throw new RangeError(`end-time must be greater than zero and no larger than ${END_TIME}`);
  }
  return options;
}

const invokedPath = process.argv[1] ? pathToFileURL(resolve(process.argv[1])).href : null;
if (invokedPath === import.meta.url) {
  const { outputPath, ...options } = parseArguments(process.argv.slice(2));
  const report = await runBoundedFiveCoordinateComparison(options);
  const json = `${JSON.stringify(report, null, 2)}\n`;
  if (outputPath) {
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, json);
    process.stderr.write(`[complete] wrote ${outputPath}\n`);
  } else {
    process.stdout.write(json);
  }
}
