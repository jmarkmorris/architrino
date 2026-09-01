import { createHash } from "node:crypto";

import {
  evaluateValidatedExactPrescribedSourceState,
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";
import { prescribedWorldlineSpeedBound } from
  "../prescribed-geometry/PrescribedWorldlineOperators.mjs";

export const PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/analysis-protocol.v1";
export const PRESCRIBED_RECORD_ANALYSIS_RESULT_SCHEMA =
  "prescribed-path-analysis/result-packet.v1";
export const PRESCRIBED_RECORD_COMPACT_EVENT_BATCH_SCHEMA =
  "prescribed-path-analysis/compact-event-batch.v1";
export const PRESCRIBED_RECORD_ANALYSIS_SESSION_SCHEMA =
  "prescribed-path-analysis/evaluation-session.v1";
export const ALL_RETAINED_SIMPLE_ROOTS_POLICY =
  "all-retained-simple-roots/sub-field-speed-certified.v1";
export const ALL_RETAINED_ROOTS_POLICY =
  "all-retained-roots/event-specific-isolation-certified.v2";

const FOUR_PI = 4 * Math.PI;
const TWO_PI = 2 * Math.PI;
const analysisSessionStates = new WeakMap();

export class CausalRootEnumerationError extends Error {
  constructor(message, details) {
    super(message);
    this.name = "CausalRootEnumerationError";
    this.code = "causal_root_enumeration_incomplete";
    this.details = details;
  }
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function nonnegativeNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) throw new RangeError(`${label} must be nonnegative.`);
  return number;
}

function positiveInteger(value, label) {
  const number = finiteNumber(value, label);
  if (!Number.isSafeInteger(number) || number < 1) {
    throw new TypeError(`${label} must be a positive safe integer.`);
  }
  return number;
}

function concreteString(value, label) {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new TypeError(`${label} must be a nonempty string.`);
  }
  return value;
}

function vector(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} must be an {x,y,z} vector.`);
  }
  return {
    x: finiteNumber(value.x, `${label}.x`),
    y: finiteNumber(value.y, `${label}.y`),
    z: finiteNumber(value.z, `${label}.z`),
  };
}

function add(left, right) {
  return { x: left.x + right.x, y: left.y + right.y, z: left.z + right.z };
}

function subtract(left, right) {
  return { x: left.x - right.x, y: left.y - right.y, z: left.z - right.z };
}

function scale(value, scalar) {
  return { x: value.x * scalar, y: value.y * scalar, z: value.z * scalar };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function magnitude(value) {
  return Math.sqrt(dot(value, value));
}

function maximumComponentDifference(left, right) {
  return Math.max(
    Math.abs(left.x - right.x),
    Math.abs(left.y - right.y),
    Math.abs(left.z - right.z),
  );
}

function wrappedPhaseDifference(left, right) {
  const difference = right - left;
  return ((difference + Math.PI) % TWO_PI + TWO_PI) % TWO_PI - Math.PI;
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

function normalizeProbe(rawProbe, index) {
  const label = `protocol.probes[${index}]`;
  const id = concreteString(rawProbe?.id, `${label}.id`);
  if (rawProbe?.kind !== "stationary-coordinate-probe.v1" &&
      rawProbe?.kind !== "prescribed-source-endpoint-probe.v1") {
    throw new TypeError(
      `${label}.kind must be stationary-coordinate-probe.v1 or ` +
      "prescribed-source-endpoint-probe.v1.",
    );
  }
  if (!Array.isArray(rawProbe.observationTimes) || rawProbe.observationTimes.length === 0) {
    throw new TypeError(`${label}.observationTimes must be nonempty.`);
  }
  if (!Array.isArray(rawProbe.polarities) || rawProbe.polarities.length === 0) {
    throw new TypeError(`${label}.polarities must be nonempty.`);
  }
  const observationTimes = rawProbe.observationTimes.map((time, timeIndex) =>
    finiteNumber(time, `${label}.observationTimes[${timeIndex}]`));
  const polarities = rawProbe.polarities.map((polarity, polarityIndex) => {
    const value = finiteNumber(polarity, `${label}.polarities[${polarityIndex}]`);
    if (value === 0) throw new RangeError(`${label}.polarities[${polarityIndex}] must be nonzero.`);
    return value;
  });
  if (new Set(observationTimes).size !== observationTimes.length) {
    throw new TypeError(`${label}.observationTimes must be unique.`);
  }
  if (new Set(polarities).size !== polarities.length) {
    throw new TypeError(`${label}.polarities must be unique.`);
  }
  const common = {
    id,
    kind: rawProbe.kind,
    observationTimes,
    polarities,
  };
  if (rawProbe.kind === "stationary-coordinate-probe.v1") {
    return {
      ...common,
      position: vector(rawProbe.position, `${label}.position`),
    };
  }
  const transmitterId = concreteString(rawProbe.transmitterId, `${label}.transmitterId`);
  if (rawProbe.selfHitPolicy !== "exclude-same-transmitter-id.v1") {
    throw new TypeError(
      `${label}.selfHitPolicy must be exclude-same-transmitter-id.v1 for a moving endpoint receiver.`,
    );
  }
  return {
    ...common,
    transmitterId,
    selfHitPolicy: rawProbe.selfHitPolicy,
  };
}

export function validatePrescribedRecordAnalysisProtocol(rawProtocol) {
  if (!rawProtocol || typeof rawProtocol !== "object" || Array.isArray(rawProtocol)) {
    throw new TypeError("analysis protocol must be an object.");
  }
  if (rawProtocol.schema !== PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `analysis protocol requires schema ${PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA}.`,
    );
  }
  const protocolId = concreteString(rawProtocol.protocolId, "protocol.protocolId");
  const fieldSpeed = positiveNumber(rawProtocol.fieldSpeed, "protocol.fieldSpeed");
  const coupling = positiveNumber(rawProtocol.coupling, "protocol.coupling");
  const historyStart = finiteNumber(rawProtocol.history?.start, "protocol.history.start");
  const historyEnd = finiteNumber(rawProtocol.history?.end, "protocol.history.end");
  if (!(historyEnd > historyStart)) {
    throw new RangeError("protocol.history.end must be greater than history.start.");
  }
  const minimumDelay = nonnegativeNumber(
    rawProtocol.history?.minimumDelay,
    "protocol.history.minimumDelay",
  );
  const returnStart = finiteNumber(
    rawProtocol.returnWindow?.start,
    "protocol.returnWindow.start",
  );
  const returnPeriod = positiveNumber(
    rawProtocol.returnWindow?.period,
    "protocol.returnWindow.period",
  );
  const rootPolicyId = rawProtocol.rootPolicy?.id;
  if (rootPolicyId !== ALL_RETAINED_SIMPLE_ROOTS_POLICY &&
      rootPolicyId !== ALL_RETAINED_ROOTS_POLICY) {
    throw new TypeError(
      `protocol.rootPolicy.id must be ${ALL_RETAINED_SIMPLE_ROOTS_POLICY} or ` +
      `${ALL_RETAINED_ROOTS_POLICY}.`,
    );
  }
  const rootTolerance = positiveNumber(
    rawProtocol.rootPolicy?.tolerance,
    "protocol.rootPolicy.tolerance",
  );
  const maxIterations = positiveInteger(
    rawProtocol.rootPolicy?.maxIterations,
    "protocol.rootPolicy.maxIterations",
  );
  const cancellationFloor = positiveNumber(
    rawProtocol.tolerances?.cancellationFloor,
    "protocol.tolerances.cancellationFloor",
  );
  const rootTransversalityFloor = positiveNumber(
    rawProtocol.tolerances?.rootTransversalityFloor,
    "protocol.tolerances.rootTransversalityFloor",
  );
  const minimumSeparationFloor = nonnegativeNumber(
    rawProtocol.tolerances?.minimumSeparationFloor,
    "protocol.tolerances.minimumSeparationFloor",
  );
  const convergenceAbsolute = positiveNumber(
    rawProtocol.tolerances?.convergenceAbsolute,
    "protocol.tolerances.convergenceAbsolute",
  );
  const minimumSeparationSamples = positiveInteger(
    rawProtocol.geometry?.minimumSeparationSamples,
    "protocol.geometry.minimumSeparationSamples",
  );
  const tightenedRootTolerance = positiveNumber(
    rawProtocol.convergence?.rootTolerance,
    "protocol.convergence.rootTolerance",
  );
  if (!(tightenedRootTolerance < rootTolerance)) {
    throw new RangeError("protocol.convergence.rootTolerance must be tighter than rootPolicy.tolerance.");
  }
  const tightenedMaxIterations = positiveInteger(
    rawProtocol.convergence?.maxIterations,
    "protocol.convergence.maxIterations",
  );
  if (tightenedMaxIterations < maxIterations) {
    throw new RangeError(
      "protocol.convergence.maxIterations must be at least rootPolicy.maxIterations.",
    );
  }
  const refinedSeparationSamples = positiveInteger(
    rawProtocol.convergence?.minimumSeparationSamples,
    "protocol.convergence.minimumSeparationSamples",
  );
  if (!(refinedSeparationSamples > minimumSeparationSamples)) {
    throw new RangeError(
      "protocol.convergence.minimumSeparationSamples must exceed the primary sample count.",
    );
  }
  if (!Array.isArray(rawProtocol.probes) || rawProtocol.probes.length === 0) {
    throw new TypeError("protocol.probes must be nonempty.");
  }
  const probes = rawProtocol.probes.map(normalizeProbe);
  if (new Set(probes.map((probe) => probe.id)).size !== probes.length) {
    throw new TypeError("protocol probe ids must be unique.");
  }
  for (const probe of probes) {
    for (const observationTime of probe.observationTimes) {
      if (observationTime < historyStart || observationTime > historyEnd + returnPeriod) {
        throw new RangeError(
          `probe ${probe.id} observation time ${observationTime} is outside the declared analysis span.`,
        );
      }
    }
  }
  return {
    schema: PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA,
    protocolId,
    fieldSpeed,
    coupling,
    history: { start: historyStart, end: historyEnd, minimumDelay },
    returnWindow: { start: returnStart, period: returnPeriod },
    rootPolicy: rootPolicyId === ALL_RETAINED_ROOTS_POLICY
      ? {
          id: rootPolicyId,
          tolerance: rootTolerance,
          maxIterations,
          initialSubdivisionCount: positiveInteger(
            rawProtocol.rootPolicy?.initialSubdivisionCount,
            "protocol.rootPolicy.initialSubdivisionCount",
          ),
          maximumSubdivisionDepth: positiveInteger(
            rawProtocol.rootPolicy?.maximumSubdivisionDepth,
            "protocol.rootPolicy.maximumSubdivisionDepth",
          ),
          maximumCandidateIntervals: positiveInteger(
            rawProtocol.rootPolicy?.maximumCandidateIntervals,
            "protocol.rootPolicy.maximumCandidateIntervals",
          ),
        }
      : {
          id: rootPolicyId,
          tolerance: rootTolerance,
          maxIterations,
        },
    tolerances: {
      cancellationFloor,
      rootTransversalityFloor,
      minimumSeparationFloor,
      convergenceAbsolute,
    },
    geometry: {
      minimumSeparationSamples,
      samplingRule: "uniform-left-closed-periodic-grid.v1",
    },
    convergence: {
      rootTolerance: tightenedRootTolerance,
      maxIterations: tightenedMaxIterations,
      minimumSeparationSamples: refinedSeparationSamples,
    },
    probes,
  };
}

function maximumTrajectorySpeed(trajectory, startTime, endTime) {
  if (trajectory.kind === "moving-circular.v1") {
    const startRate = trajectory.angularVelocity +
      trajectory.angularAcceleration * (startTime - trajectory.epochTime);
    const endRate = trajectory.angularVelocity +
      trajectory.angularAcceleration * (endTime - trajectory.epochTime);
    const maximumAngularRate = Math.max(Math.abs(startRate), Math.abs(endRate));
    return magnitude(trajectory.centerVelocity) +
      maximumAngularRate * magnitude(trajectory.radiusU);
  }
  return prescribedWorldlineSpeedBound(trajectory, startTime, endTime);
}

function residualAt(source, emissionTime, observationTime, probePosition, fieldSpeed) {
  const state = evaluateValidatedExactPrescribedSourceState(source, emissionTime);
  const displacement = subtract(probePosition, state.position);
  const distance = magnitude(displacement);
  return {
    emissionTime,
    state,
    displacement,
    distance,
    residual: distance - fieldSpeed * (observationTime - emissionTime),
  };
}

function solveCertifiedSubFieldRoot({
  source,
  retainedStart,
  retainedEnd,
  observationTime,
  probePosition,
  fieldSpeed,
  tolerance,
  maxIterations,
}) {
  const speedBound = maximumTrajectorySpeed(source.trajectory, retainedStart, retainedEnd);
  const monotonicityMargin = fieldSpeed - speedBound;
  if (!(monotonicityMargin > 0)) {
    throw new RangeError(
      `source ${source.id} speed bound ${speedBound} must remain below fieldSpeed ${fieldSpeed}; ` +
      "all-root completeness is certified only in the strictly monotone simple-root domain.",
    );
  }
  const start = residualAt(source, retainedStart, observationTime, probePosition, fieldSpeed);
  const end = residualAt(source, retainedEnd, observationTime, probePosition, fieldSpeed);
  if (Math.abs(start.residual) <= tolerance) {
    return {
      root: start,
      iterations: 0,
      finalBracket: [retainedStart, retainedStart],
      endpointResiduals: [start.residual, end.residual],
      speedBound,
      monotonicityMargin,
    };
  }
  if (Math.abs(end.residual) <= tolerance) {
    return {
      root: end,
      iterations: 0,
      finalBracket: [retainedEnd, retainedEnd],
      endpointResiduals: [start.residual, end.residual],
      speedBound,
      monotonicityMargin,
    };
  }
  if (start.residual > 0 || end.residual < 0) {
    return {
      root: null,
      reason: start.residual > 0
        ? "root_precedes_retained_history"
        : "root_follows_retained_history",
      endpointResiduals: [start.residual, end.residual],
      retainedInterval: [retainedStart, retainedEnd],
      speedBound,
      monotonicityMargin,
    };
  }

  let lowTime = retainedStart;
  let highTime = retainedEnd;
  let low = start;
  let high = end;
  let best = Math.abs(low.residual) <= Math.abs(high.residual) ? low : high;
  let iterations = 0;
  for (; iterations < maxIterations; iterations += 1) {
    const middleTime = (lowTime + highTime) / 2;
    const middle = residualAt(
      source,
      middleTime,
      observationTime,
      probePosition,
      fieldSpeed,
    );
    if (Math.abs(middle.residual) < Math.abs(best.residual)) best = middle;
    if (Math.abs(middle.residual) <= tolerance) {
      lowTime = middleTime;
      highTime = middleTime;
      best = middle;
      break;
    }
    if (middle.residual < 0) {
      lowTime = middleTime;
      low = middle;
    } else {
      highTime = middleTime;
      high = middle;
    }
  }
  if (Math.abs(best.residual) > tolerance) {
    throw new Error(
      `causal root for ${source.id} did not converge within ${maxIterations} iterations; ` +
      `residual=${best.residual}.`,
    );
  }
  return {
    root: best,
    iterations,
    finalBracket: [lowTime, highTime],
    endpointResiduals: [start.residual, end.residual],
    speedBound,
    monotonicityMargin,
  };
}

function maximumTrajectoryAcceleration(trajectory, startTime, endTime) {
  if (trajectory.kind === "stationary.v1" || trajectory.kind === "inertial.v1" ||
      trajectory.kind === "sd3-centered-linear-member.v1") return 0;
  if (trajectory.kind !== "moving-circular.v1") {
    throw new RangeError(
      `analysis root isolation has no certified acceleration bound for ${trajectory.kind}.`,
    );
  }
  const startRate = trajectory.angularVelocity +
    trajectory.angularAcceleration * (startTime - trajectory.epochTime);
  const endRate = trajectory.angularVelocity +
    trajectory.angularAcceleration * (endTime - trajectory.epochTime);
  const maximumAngularRate = Math.max(Math.abs(startRate), Math.abs(endRate));
  const radius = magnitude(trajectory.radiusU);
  return radius * (
    Math.abs(trajectory.angularAcceleration) +
    maximumAngularRate * maximumAngularRate
  );
}

function residualDerivative(row, fieldSpeed) {
  if (!(row.distance > 0)) return Number.NaN;
  return fieldSpeed - dot(
    row.state.velocity,
    scale(row.displacement, 1 / row.distance),
  );
}

function bisectCertifiedSimpleRoot({
  source,
  left,
  right,
  observationTime,
  probePosition,
  fieldSpeed,
  tolerance,
  maxIterations,
}) {
  let low = left;
  let high = right;
  let best = Math.abs(low.residual) <= Math.abs(high.residual) ? low : high;
  if (Math.abs(low.residual) <= tolerance) {
    return {
      root: low,
      iterations: 0,
      finalBracket: [low.emissionTime, low.emissionTime],
    };
  }
  if (Math.abs(high.residual) <= tolerance) {
    return {
      root: high,
      iterations: 0,
      finalBracket: [high.emissionTime, high.emissionTime],
    };
  }
  if (!(low.residual * high.residual < 0)) {
    throw new Error("certified simple-root bracket must have opposite residual signs.");
  }
  let iterations = 0;
  for (; iterations < maxIterations; iterations += 1) {
    const middle = residualAt(
      source,
      (low.emissionTime + high.emissionTime) / 2,
      observationTime,
      probePosition,
      fieldSpeed,
    );
    if (Math.abs(middle.residual) < Math.abs(best.residual)) best = middle;
    if (Math.abs(middle.residual) <= tolerance) {
      best = middle;
      low = middle;
      high = middle;
      break;
    }
    if (low.residual * middle.residual < 0) high = middle;
    else low = middle;
  }
  if (Math.abs(best.residual) > tolerance) {
    throw new Error(
      `causal root for ${source.id} did not converge within ${maxIterations} iterations; ` +
      `residual=${best.residual}.`,
    );
  }
  return {
    root: best,
    iterations,
    finalBracket: [low.emissionTime, high.emissionTime],
  };
}

function solveCertifiedRetainedRoots({
  source,
  retainedStart,
  retainedEnd,
  observationTime,
  probePosition,
  fieldSpeed,
  tolerance,
  maxIterations,
  rootPolicy,
}) {
  if (rootPolicy.id === ALL_RETAINED_SIMPLE_ROOTS_POLICY) {
    const solved = solveCertifiedSubFieldRoot({
      source,
      retainedStart,
      retainedEnd,
      observationTime,
      probePosition,
      fieldSpeed,
      tolerance,
      maxIterations,
    });
    return {
      roots: solved.root ? [{
        ...solved,
        certificate: {
          method: "global-speed-monotonicity.v1",
          isolatedInterval: [retainedStart, retainedEnd],
          derivativeRange: [solved.monotonicityMargin, Number.POSITIVE_INFINITY],
          subdivisionDepth: 0,
        },
      }] : [],
      noRootReason: solved.root ? null : solved.reason,
      endpointResiduals: solved.endpointResiduals,
      retainedInterval: solved.retainedInterval ?? [retainedStart, retainedEnd],
      speedBound: solved.speedBound,
      accelerationBound: maximumTrajectoryAcceleration(
        source.trajectory,
        retainedStart,
        retainedEnd,
      ),
      intervalCount: 1,
      certifiedNoRootIntervalCount: solved.root ? 0 : 1,
      certifiedMonotonicIntervalCount: 1,
      maximumSubdivisionDepthReached: 0,
    };
  }

  const speedBound = maximumTrajectorySpeed(
    source.trajectory,
    retainedStart,
    retainedEnd,
  );
  const accelerationBound = maximumTrajectoryAcceleration(
    source.trajectory,
    retainedStart,
    retainedEnd,
  );
  const residualLipschitzBound = fieldSpeed + speedBound;
  const evaluations = new Map();
  const at = (time) => {
    const cached = evaluations.get(time);
    if (cached) return cached;
    const row = residualAt(
      source,
      time,
      observationTime,
      probePosition,
      fieldSpeed,
    );
    evaluations.set(time, row);
    return row;
  };
  const initialCount = rootPolicy.initialSubdivisionCount;
  const stack = Array.from({ length: initialCount }, (_, index) => ({
    leftTime:
      retainedStart + (retainedEnd - retainedStart) * index / initialCount,
    rightTime:
      retainedStart + (retainedEnd - retainedStart) * (index + 1) / initialCount,
    depth: 0,
  })).reverse();
  const isolatedRoots = [];
  const unresolvedIntervals = [];
  let intervalCount = 0;
  let certifiedNoRootIntervalCount = 0;
  let certifiedMonotonicIntervalCount = 0;
  let maximumSubdivisionDepthReached = 0;

  while (stack.length > 0) {
    if (intervalCount >= rootPolicy.maximumCandidateIntervals) {
      unresolvedIntervals.push({
        reason: "maximum-candidate-intervals-reached",
        pendingIntervalCount: stack.length,
      });
      break;
    }
    const interval = stack.pop();
    intervalCount += 1;
    maximumSubdivisionDepthReached = Math.max(
      maximumSubdivisionDepthReached,
      interval.depth,
    );
    const midpoint = (interval.leftTime + interval.rightTime) / 2;
    const halfWidth = (interval.rightTime - interval.leftTime) / 2;
    const middle = at(midpoint);
    const residualRadius = residualLipschitzBound * halfWidth;
    const residualRange = [
      middle.residual - residualRadius,
      middle.residual + residualRadius,
    ];
    if (residualRange[0] > tolerance || residualRange[1] < -tolerance) {
      certifiedNoRootIntervalCount += 1;
      continue;
    }

    const distanceLowerBound = middle.distance - speedBound * halfWidth;
    const middleDerivative = residualDerivative(middle, fieldSpeed);
    const secondDerivativeBound = distanceLowerBound > 0
      ? accelerationBound + speedBound * speedBound / distanceLowerBound
      : Number.POSITIVE_INFINITY;
    const derivativeRadius = secondDerivativeBound * halfWidth;
    const derivativeRange = [
      middleDerivative - derivativeRadius,
      middleDerivative + derivativeRadius,
    ];
    const monotonic =
      derivativeRange[0] > 0 || derivativeRange[1] < 0;
    if (monotonic) {
      certifiedMonotonicIntervalCount += 1;
      const left = at(interval.leftTime);
      const right = at(interval.rightTime);
      if (Math.abs(left.residual) <= tolerance ||
          Math.abs(right.residual) <= tolerance ||
          left.residual * right.residual < 0) {
        const solved = bisectCertifiedSimpleRoot({
          source,
          left,
          right,
          observationTime,
          probePosition,
          fieldSpeed,
          tolerance,
          maxIterations,
        });
        isolatedRoots.push({
          ...solved,
          certificate: {
            method: "event-specific-derivative-isolation.v2",
            isolatedInterval: [interval.leftTime, interval.rightTime],
            residualRange,
            derivativeRange,
            distanceLowerBound,
            secondDerivativeBound,
            subdivisionDepth: interval.depth,
          },
        });
      } else {
        certifiedNoRootIntervalCount += 1;
      }
      continue;
    }

    if (interval.depth >= rootPolicy.maximumSubdivisionDepth) {
      unresolvedIntervals.push({
        reason: "possible-root-or-fold-not-isolated",
        interval: [interval.leftTime, interval.rightTime],
        residualRange,
        derivativeRange,
        midpointResidual: middle.residual,
        midpointDerivative: middleDerivative,
        distanceLowerBound,
        subdivisionDepth: interval.depth,
      });
      continue;
    }
    stack.push({
      leftTime: midpoint,
      rightTime: interval.rightTime,
      depth: interval.depth + 1,
    });
    stack.push({
      leftTime: interval.leftTime,
      rightTime: midpoint,
      depth: interval.depth + 1,
    });
  }

  if (unresolvedIntervals.length > 0) {
    throw new CausalRootEnumerationError(
      `causal-root enumeration for ${source.id} could not certify every retained interval.`,
      {
        transmitterId: source.id,
        observationTime,
        probePosition,
        retainedInterval: [retainedStart, retainedEnd],
        fieldSpeed,
        speedBound,
        accelerationBound,
        intervalCount,
        maximumSubdivisionDepthReached,
        unresolvedIntervals,
      },
    );
  }

  isolatedRoots.sort((left, right) =>
    left.root.emissionTime - right.root.emissionTime);
  const deduplicatedRoots = [];
  const timeIdentityTolerance =
    tolerance + 64 * Number.EPSILON *
      Math.max(1, Math.abs(retainedStart), Math.abs(retainedEnd));
  for (const row of isolatedRoots) {
    const previous = deduplicatedRoots.at(-1);
    if (previous &&
        Math.abs(previous.root.emissionTime - row.root.emissionTime) <=
          timeIdentityTolerance) {
      if (Math.abs(row.root.residual) < Math.abs(previous.root.residual)) {
        deduplicatedRoots[deduplicatedRoots.length - 1] = row;
      }
    } else {
      deduplicatedRoots.push(row);
    }
  }
  const start = at(retainedStart);
  const end = at(retainedEnd);
  return {
    roots: deduplicatedRoots,
    noRootReason:
      deduplicatedRoots.length === 0 ? "certified_no_retained_root" : null,
    endpointResiduals: [start.residual, end.residual],
    retainedInterval: [retainedStart, retainedEnd],
    speedBound,
    accelerationBound,
    intervalCount,
    certifiedNoRootIntervalCount,
    certifiedMonotonicIntervalCount,
    maximumSubdivisionDepthReached,
  };
}

function evaluateEvent({ sourceRecord, protocol, probe, observationTime, rootTolerance, maxIterations }) {
  const receiverSource = probe.kind === "prescribed-source-endpoint-probe.v1"
    ? sourceRecord.sources.find((source) => source.id === probe.transmitterId)
    : null;
  if (probe.kind === "prescribed-source-endpoint-probe.v1" && !receiverSource) {
    throw new Error(
      `moving endpoint probe ${probe.id} names absent transmitter ${probe.transmitterId}.`,
    );
  }
  const receiverState = receiverSource
    ? evaluateValidatedExactPrescribedSourceState(receiverSource, observationTime)
    : null;
  const probePosition = receiverState?.position ?? probe.position;
  const probeVelocity = receiverState?.velocity ?? { x: 0, y: 0, z: 0 };
  const retainedStart = Math.max(sourceRecord.history.start, protocol.history.start);
  const retainedEnd = Math.min(
    sourceRecord.history.end,
    protocol.history.end,
    observationTime - protocol.history.minimumDelay,
  );
  if (!(retainedEnd > retainedStart)) {
    throw new RangeError(
      `probe ${probe.id} at time ${observationTime} has no retained emission-time interval.`,
    );
  }
  const roots = [];
  const noRootTransmitters = [];
  const transmitterCertificates = [];
  for (const source of sourceRecord.sources) {
    if (receiverSource && source.id === receiverSource.id) continue;
    const solved = solveCertifiedRetainedRoots({
      source,
      retainedStart,
      retainedEnd,
      observationTime,
      probePosition,
      fieldSpeed: protocol.fieldSpeed,
      tolerance: rootTolerance,
      maxIterations,
      rootPolicy: protocol.rootPolicy,
    });
    transmitterCertificates.push({
      transmitterId: source.id,
      rootCount: solved.roots.length,
      retainedInterval: solved.retainedInterval,
      certifiedSpeedBound: solved.speedBound,
      certifiedAccelerationBound: solved.accelerationBound,
      intervalCount: solved.intervalCount,
      certifiedNoRootIntervalCount: solved.certifiedNoRootIntervalCount,
      certifiedMonotonicIntervalCount: solved.certifiedMonotonicIntervalCount,
      maximumSubdivisionDepthReached: solved.maximumSubdivisionDepthReached,
      complete: true,
    });
    if (solved.roots.length === 0) {
      noRootTransmitters.push({
        transmitterId: source.id,
        rootCount: 0,
        reason: solved.noRootReason,
        retainedInterval: solved.retainedInterval,
        endpointResiduals: solved.endpointResiduals,
        certifiedSpeedBound: solved.speedBound,
        certifiedAccelerationBound: solved.accelerationBound,
        globalSubFieldMonotonicityMargin:
          protocol.fieldSpeed - solved.speedBound,
        certifiedMonotonicityMargin:
          protocol.rootPolicy.id === ALL_RETAINED_ROOTS_POLICY
            ? null
            : protocol.fieldSpeed - solved.speedBound,
      });
      continue;
    }
    solved.roots.forEach((isolated, rootOrdinal) => {
      const root = isolated.root;
      if (!(root.distance > 0)) {
        throw new RangeError(`causal root for ${source.id} has zero distance.`);
      }
      const direction = scale(root.displacement, 1 / root.distance);
      const transmitterRadialSpeed = dot(root.state.velocity, direction);
      const transmitterSideFactorDt = protocol.fieldSpeed - transmitterRadialSpeed;
      if (transmitterSideFactorDt === 0) {
        throw new CausalRootEnumerationError(
          `causal root for ${source.id} is a non-transverse fold.`,
          {
            transmitterId: source.id,
            observationTime,
            emissionTime: root.emissionTime,
            transmitterSideFactorDt,
            reason: "non-transverse-fold-root",
          },
        );
      }
      const receiverRadialSpeed = dot(probeVelocity, direction);
      const receiverSideFactorDr = protocol.fieldSpeed - receiverRadialSpeed;
      const denominator =
        FOUR_PI * root.distance * root.distance * Math.abs(transmitterSideFactorDt);
      const accelerationBaseScale = protocol.coupling * source.charge *
        protocol.fieldSpeed / Math.abs(transmitterSideFactorDt) /
        (root.distance * root.distance);
      roots.push({
        rootId: `${probe.id}<-${source.id}:simple:${rootOrdinal}`,
        rootOrdinal,
        rootStatus: "retained-simple-root",
        transmitterId: source.id,
        transmitterCharge: source.charge,
        emissionTime: root.emissionTime,
        receptionTime: observationTime,
        delay: observationTime - root.emissionTime,
        transmitterPosition: root.state.position,
        transmitterVelocity: root.state.velocity,
        displacement: root.displacement,
        direction,
        distance: root.distance,
        residual: root.residual,
        transmitterRadialSpeed,
        transmitterSideFactorDt,
        receiverRadialSpeed,
        receiverSideFactorDr,
        rootPlaybackDerivative: receiverSideFactorDr / transmitterSideFactorDt,
        rootTransversalityMargin: Math.abs(transmitterSideFactorDt),
        accelerationWeight: protocol.fieldSpeed / Math.abs(transmitterSideFactorDt),
        signedWakeContribution: source.charge / denominator,
        unsignedWakeContribution: Math.abs(source.charge) / denominator,
        probeAccelerationContributions: probe.polarities.map((probePolarity) => ({
          probePolarity,
          acceleration: scale(direction, accelerationBaseScale * probePolarity),
        })),
        rootIterations: isolated.iterations,
        finalBracket: isolated.finalBracket,
        endpointResiduals: solved.endpointResiduals,
        certifiedSpeedBound: solved.speedBound,
        certifiedAccelerationBound: solved.accelerationBound,
        globalSubFieldMonotonicityMargin:
          protocol.fieldSpeed - solved.speedBound,
        certifiedMonotonicityMargin:
          protocol.rootPolicy.id === ALL_RETAINED_ROOTS_POLICY
            ? Math.min(
              Math.abs(isolated.certificate.derivativeRange[0]),
              Math.abs(isolated.certificate.derivativeRange[1]),
            )
            : protocol.fieldSpeed - solved.speedBound,
        rootIsolationCertificate: isolated.certificate,
      });
    });
  }
  const signedWake = roots.reduce((sum, root) => sum + root.signedWakeContribution, 0);
  const unsignedWake = roots.reduce((sum, root) => sum + root.unsignedWakeContribution, 0);
  const probeResponses = probe.polarities.map((probePolarity) => ({
    probePolarity,
    acceleration: roots.reduce((sum, root) => {
      const row = root.probeAccelerationContributions.find(
        (entry) => entry.probePolarity === probePolarity,
      );
      return add(sum, row.acceleration);
    }, { x: 0, y: 0, z: 0 }),
  }));
  return {
    eventId: `${probe.id}@${observationTime}`,
    probeId: probe.id,
    observationTime,
    probeKind: probe.kind,
    receiverSourceId: receiverSource?.id ?? null,
    selfHitPolicy: receiverSource ? probe.selfHitPolicy : "not-applicable",
    probePosition,
    probeVelocity,
    retainedHistory: { start: retainedStart, end: retainedEnd },
    rootCompletenessCertification: {
      policy: protocol.rootPolicy.id,
      complete: true,
      reason: protocol.rootPolicy.id === ALL_RETAINED_ROOTS_POLICY
        ? "Every retained-time interval was certified root-free or monotonic; every sign-changing monotonic interval was isolated to one simple root."
        : "Each transmitter residual is strictly increasing because its certified speed bound is below fieldSpeed; therefore the retained interval contains at most one root.",
      transmitterCertificates,
    },
    expectedTransmitterCount: sourceRecord.sources.length - (receiverSource ? 1 : 0),
    rootCount: roots.length,
    noRootCount: noRootTransmitters.length,
    roots,
    noRootTransmitters,
    measures: {
      signedWake,
      unsignedWake,
      signedCancellationRatio:
        Math.abs(signedWake) / (unsignedWake + protocol.tolerances.cancellationFloor),
      probeResponses,
      rootTransversalityMargin: roots.length === 0
        ? null
        : Math.min(...roots.map((root) => root.rootTransversalityMargin)),
      maximumRootResidual: roots.reduce(
        (maximum, root) => Math.max(maximum, Math.abs(root.residual)),
        0,
      ),
    },
  };
}

function evaluateAllEvents(sourceRecord, protocol, rootTolerance, maxIterations) {
  return protocol.probes.flatMap((probe) => probe.observationTimes.map((observationTime) =>
    evaluateEvent({
      sourceRecord,
      protocol,
      probe,
      observationTime,
      rootTolerance,
      maxIterations,
    })));
}

function evaluatePeriodClosure(sourceRecord, protocol) {
  const start = protocol.returnWindow.start;
  const end = start + protocol.returnWindow.period;
  const entries = sourceRecord.sources.map((source) => {
    const startState = evaluateValidatedExactPrescribedSourceState(source, start);
    const endState = evaluateValidatedExactPrescribedSourceState(source, end);
    const translatingVelocity = source.trajectory.kind === "moving-circular.v1"
      ? source.trajectory.centerVelocity
      : source.trajectory.kind === "inertial.v1" ||
          source.trajectory.kind === "sd3-centered-linear-member.v1"
        ? source.trajectory.velocity
        : source.trajectory.assemblyVelocity ?? { x: 0, y: 0, z: 0 };
    const translatingCenterDisplacement = scale(
      translatingVelocity,
      protocol.returnWindow.period,
    );
    const absolutePositionDisplacement =
      subtract(endState.position, startState.position);
    const positionResidual = subtract(
      absolutePositionDisplacement,
      translatingCenterDisplacement,
    );
    const velocityResidual = subtract(endState.velocity, startState.velocity);
    const phaseResidual = startState.phase && endState.phase
      ? wrappedPhaseDifference(
          startState.phase.rawRadians,
          endState.phase.rawRadians,
        )
      : 0;
    return {
      transmitterId: source.id,
      startTime: start,
      endTime: end,
      closureFrame: "declared-common-translating-center.v1",
      absolutePositionDisplacement,
      translatingCenterDisplacement,
      positionResidual,
      positionResidualNorm: magnitude(positionResidual),
      velocityResidual,
      velocityResidualNorm: magnitude(velocityResidual),
      phaseResidual,
    };
  });
  return {
    start,
    end,
    period: protocol.returnWindow.period,
    entries,
    maximumPositionResidual: Math.max(...entries.map((entry) => entry.positionResidualNorm)),
    maximumVelocityResidual: Math.max(...entries.map((entry) => entry.velocityResidualNorm)),
    maximumPhaseResidual: Math.max(...entries.map((entry) => Math.abs(entry.phaseResidual))),
  };
}

function evaluateMinimumSeparation(sourceRecord, protocol, sampleCount) {
  const start = protocol.returnWindow.start;
  const period = protocol.returnWindow.period;
  const pairRows = [];
  for (let leftIndex = 0; leftIndex < sourceRecord.sources.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < sourceRecord.sources.length; rightIndex += 1) {
      const left = sourceRecord.sources[leftIndex];
      const right = sourceRecord.sources[rightIndex];
      let minimum = Number.POSITIVE_INFINITY;
      let minimumTime = start;
      for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
        const time = start + period * sampleIndex / sampleCount;
        const leftState = evaluateValidatedExactPrescribedSourceState(left, time);
        const rightState = evaluateValidatedExactPrescribedSourceState(right, time);
        const separation = magnitude(subtract(leftState.position, rightState.position));
        if (separation < minimum) {
          minimum = separation;
          minimumTime = time;
        }
      }
      const relativeSpeedUpperBound =
        maximumTrajectorySpeed(left.trajectory, start, start + period) +
        maximumTrajectorySpeed(right.trajectory, start, start + period);
      const startRelativePosition = subtract(
        evaluateValidatedExactPrescribedSourceState(left, start).position,
        evaluateValidatedExactPrescribedSourceState(right, start).position,
      );
      const endRelativePosition = subtract(
        evaluateValidatedExactPrescribedSourceState(left, start + period).position,
        evaluateValidatedExactPrescribedSourceState(right, start + period).position,
      );
      const relativePeriodClosureResidual = magnitude(subtract(
        endRelativePosition,
        startRelativePosition,
      ));
      const relativePeriodClosureTolerance = 64 * Number.EPSILON * Math.max(
        1,
        magnitude(startRelativePosition),
        magnitude(endRelativePosition),
      );
      const relativePeriodClosed =
        relativePeriodClosureResidual <= relativePeriodClosureTolerance;
      const sampleCoveringRadius = relativePeriodClosed
        ? period / (2 * sampleCount)
        : period / sampleCount;
      const continuousLowerBound = Math.max(
        0,
        minimum - relativeSpeedUpperBound * sampleCoveringRadius,
      );
      pairRows.push({
        pairId: `${left.id}<->${right.id}`,
        leftTransmitterId: left.id,
        rightTransmitterId: right.id,
        minimumSeparation: minimum,
        firstMinimumSampleTime: minimumTime,
        relativeSpeedUpperBound,
        relativePeriodClosed,
        relativePeriodClosureResidual,
        relativePeriodClosureTolerance,
        sampleCoveringRadius,
        continuousLowerBound,
        certificateRule: "periodic-sample-lipschitz-lower-bound.v1",
      });
    }
  }
  const minimumRow = pairRows.reduce(
    (best, row) => row.minimumSeparation < best.minimumSeparation ? row : best,
    pairRows[0],
  );
  const certificateRow = pairRows.reduce(
    (best, row) => row.continuousLowerBound < best.continuousLowerBound ? row : best,
    pairRows[0],
  );
  return {
    samplingRule: protocol.geometry.samplingRule,
    certificateRule: "periodic-sample-lipschitz-lower-bound.v1",
    start,
    period,
    sampleCount,
    sampleCoveringRadius: certificateRow.sampleCoveringRadius,
    pairRows,
    minimumSeparation: minimumRow.minimumSeparation,
    minimumPairId: minimumRow.pairId,
    firstMinimumSampleTime: minimumRow.firstMinimumSampleTime,
    certifiedContinuousLowerBound: certificateRow.continuousLowerBound,
    certificatePairId: certificateRow.pairId,
  };
}

function compareEventLedgers(primaryEvents, refinedEvents, protocol) {
  const entries = primaryEvents.map((primary) => {
    const refined = refinedEvents.find((event) => event.eventId === primary.eventId);
    if (!refined) throw new Error(`refined event ${primary.eventId} is missing.`);
    const primaryRootIds = primary.roots.map((root) => root.rootId);
    const refinedRootIds = refined.roots.map((root) => root.rootId);
    const rootIdentityMatch = JSON.stringify(primaryRootIds) === JSON.stringify(refinedRootIds);
    const maximumEmissionTimeChange = primary.roots.reduce((maximum, root) => {
      const refinedRoot = refined.roots.find((candidate) => candidate.rootId === root.rootId);
      return Math.max(
        maximum,
        refinedRoot ? Math.abs(root.emissionTime - refinedRoot.emissionTime) : Number.POSITIVE_INFINITY,
      );
    }, 0);
    const responseChanges = primary.measures.probeResponses.map((response) => {
      const refinedResponse = refined.measures.probeResponses.find(
        (candidate) => candidate.probePolarity === response.probePolarity,
      );
      return {
        probePolarity: response.probePolarity,
        maximumComponentChange: maximumComponentDifference(
          response.acceleration,
          refinedResponse.acceleration,
        ),
      };
    });
    const maximumProbeAccelerationComponentChange = Math.max(
      0,
      ...responseChanges.map((row) => row.maximumComponentChange),
    );
    return {
      eventId: primary.eventId,
      rootIdentityMatch,
      maximumEmissionTimeChange,
      signedWakeChange: Math.abs(
        primary.measures.signedWake - refined.measures.signedWake,
      ),
      unsignedWakeChange: Math.abs(
        primary.measures.unsignedWake - refined.measures.unsignedWake,
      ),
      signedCancellationRatioChange: Math.abs(
        primary.measures.signedCancellationRatio -
        refined.measures.signedCancellationRatio,
      ),
      responseChanges,
      maximumProbeAccelerationComponentChange,
    };
  });
  const maximumChange = Math.max(
    0,
    ...entries.flatMap((entry) => [
      entry.maximumEmissionTimeChange,
      entry.signedWakeChange,
      entry.unsignedWakeChange,
      entry.signedCancellationRatioChange,
      entry.maximumProbeAccelerationComponentChange,
    ]),
  );
  return {
    primaryRootTolerance: protocol.rootPolicy.tolerance,
    refinedRootTolerance: protocol.convergence.rootTolerance,
    entries,
    maximumChange,
    rootIdentitiesMatch: entries.every((entry) => entry.rootIdentityMatch),
  };
}

function exactParameterVector(sourceRecord) {
  if (sourceRecord.parameterVector && typeof sourceRecord.parameterVector === "object") {
    return sourceRecord.parameterVector;
  }
  return {
    history: sourceRecord.history,
    sources: sourceRecord.sources.map((source) => ({
      id: source.id,
      charge: source.charge,
      trajectory: source.trajectory,
    })),
  };
}

export function createPrescribedRecordAnalysisSession(rawSourceRecord) {
  const sourceRecord = validateExactPrescribedSourceRecord(rawSourceRecord);
  if (sourceRecord.sources.length < 2) {
    throw new RangeError("analytical braid evaluation requires at least two prescribed sources.");
  }
  const sourceHash = sha256Canonical(sourceRecord);
  const session = Object.freeze({
    schema: PRESCRIBED_RECORD_ANALYSIS_SESSION_SCHEMA,
    sourceHash,
    sourceCount: sourceRecord.sources.length,
  });
  analysisSessionStates.set(session, {
    rawSourceRecord,
    sourceRecord,
    sourceHash,
    invariantCache: new Map(),
    invariantEvaluationCount: 0,
    invariantCacheHitCount: 0,
  });
  return session;
}

export function getPrescribedRecordAnalysisSessionStats(session) {
  const state = analysisSessionStates.get(session);
  if (!state) {
    throw new TypeError("analysis session was not created by createPrescribedRecordAnalysisSession.");
  }
  return {
    sourceHash: state.sourceHash,
    sourceCount: state.sourceRecord.sources.length,
    invariantCacheEntryCount: state.invariantCache.size,
    invariantEvaluationCount: state.invariantEvaluationCount,
    invariantCacheHitCount: state.invariantCacheHitCount,
  };
}

function resolveAnalysisSession(request) {
  if (request.session == null) {
    const session = createPrescribedRecordAnalysisSession(request.sourceRecord);
    return {
      session,
      state: analysisSessionStates.get(session),
    };
  }
  const state = analysisSessionStates.get(request.session);
  if (!state) {
    throw new TypeError("analysis session was not created by createPrescribedRecordAnalysisSession.");
  }
  if (request.sourceRecord != null &&
      request.sourceRecord !== state.rawSourceRecord &&
      request.sourceRecord !== state.sourceRecord) {
    throw new Error("analysis session source record differs from the requested source record.");
  }
  return { session: request.session, state };
}

function validateProtocolSpan(sourceRecord, protocol) {
  if (protocol.history.start < sourceRecord.history.start ||
      protocol.history.end > sourceRecord.history.end) {
    throw new RangeError("protocol history must lie within the exact source-record history.");
  }
  const returnEnd = protocol.returnWindow.start + protocol.returnWindow.period;
  if (protocol.returnWindow.start < sourceRecord.history.start ||
      returnEnd > sourceRecord.history.end) {
    throw new RangeError("protocol return window must lie within the exact source-record history.");
  }
}

function sourceInvariantKey(protocol) {
  return canonicalJson({
    returnWindow: protocol.returnWindow,
    primaryMinimumSeparationSamples: protocol.geometry.minimumSeparationSamples,
    refinedMinimumSeparationSamples:
      protocol.convergence.minimumSeparationSamples,
  });
}

function sourceInvariants(state, protocol) {
  const key = sourceInvariantKey(protocol);
  const cached = state.invariantCache.get(key);
  if (cached) {
    state.invariantCacheHitCount += 1;
    return cached;
  }
  const prescribedPeriodClosure = evaluatePeriodClosure(
    state.sourceRecord,
    protocol,
  );
  const minimumSeparation = evaluateMinimumSeparation(
    state.sourceRecord,
    protocol,
    protocol.geometry.minimumSeparationSamples,
  );
  const refinedMinimumSeparation = evaluateMinimumSeparation(
    state.sourceRecord,
    protocol,
    protocol.convergence.minimumSeparationSamples,
  );
  const invariants = Object.freeze({
    prescribedPeriodClosure,
    minimumSeparation,
    refinedMinimumSeparation,
  });
  state.invariantCache.set(key, invariants);
  state.invariantEvaluationCount += 1;
  return invariants;
}

export function evaluatePrescribedRecordAnalysis(request = {}) {
  const { state } = resolveAnalysisSession(request);
  const sourceRecord = state.sourceRecord;
  const protocol = validatePrescribedRecordAnalysisProtocol(request.protocol);
  validateProtocolSpan(sourceRecord, protocol);
  const resultMode = request.resultMode ?? "full";
  if (resultMode !== "full" && resultMode !== "compact-event-batch") {
    throw new TypeError("resultMode must be full or compact-event-batch.");
  }

  const sourceHash = state.sourceHash;
  const protocolHash = resultMode === "full" ? sha256Canonical(protocol) : null;
  const events = evaluateAllEvents(
    sourceRecord,
    protocol,
    protocol.rootPolicy.tolerance,
    protocol.rootPolicy.maxIterations,
  );
  const refinedEvents = evaluateAllEvents(
    sourceRecord,
    protocol,
    protocol.convergence.rootTolerance,
    protocol.convergence.maxIterations,
  );
  const {
    prescribedPeriodClosure,
    minimumSeparation,
    refinedMinimumSeparation,
  } = sourceInvariants(state, protocol);
  const eventConvergence = compareEventLedgers(events, refinedEvents, protocol);
  const minimumSeparationChange = Math.abs(
    minimumSeparation.minimumSeparation - refinedMinimumSeparation.minimumSeparation,
  );
  const convergenceMaximumChange = eventConvergence.maximumChange;
  const numericalConvergence = {
    comparisonRule: "primary-versus-tighter-root-event-ledger.v2",
    absoluteTolerance: protocol.tolerances.convergenceAbsolute,
    eventConvergence,
    minimumSeparation: {
      disposition: "separate-continuous-separation-certificate-not-a-convergence-gate",
      primarySampleCount: minimumSeparation.sampleCount,
      refinedSampleCount: refinedMinimumSeparation.sampleCount,
      primaryValue: minimumSeparation.minimumSeparation,
      refinedValue: refinedMinimumSeparation.minimumSeparation,
      absoluteChange: minimumSeparationChange,
      primaryCertifiedContinuousLowerBound:
        minimumSeparation.certifiedContinuousLowerBound,
      refinedCertifiedContinuousLowerBound:
        refinedMinimumSeparation.certifiedContinuousLowerBound,
      minimumPairIdentityMatch:
        minimumSeparation.minimumPairId === refinedMinimumSeparation.minimumPairId,
    },
    maximumReportedChange: convergenceMaximumChange,
    passed: eventConvergence.rootIdentitiesMatch &&
      convergenceMaximumChange <= protocol.tolerances.convergenceAbsolute,
  };
  const rootTransversalityMargin = events.flatMap((event) => event.roots).reduce(
    (minimum, root) => Math.min(minimum, root.rootTransversalityMargin),
    Number.POSITIVE_INFINITY,
  );
  const finiteRootTransversalityMargin = Number.isFinite(rootTransversalityMargin)
    ? rootTransversalityMargin
    : null;
  const validity = {
    rootTopologyComplete: events.every(
      (event) => event.rootCompletenessCertification.complete,
    ),
    rootTransversalityPassed: finiteRootTransversalityMargin === null ||
      finiteRootTransversalityMargin >= protocol.tolerances.rootTransversalityFloor,
    minimumSeparationPassed:
      minimumSeparation.certifiedContinuousLowerBound >=
        protocol.tolerances.minimumSeparationFloor,
    numericalConvergencePassed: numericalConvergence.passed,
  };
  validity.passed = Object.values(validity).every(Boolean);

  if (resultMode === "compact-event-batch") {
    return {
      schema: PRESCRIBED_RECORD_COMPACT_EVENT_BATCH_SCHEMA,
      evaluator: {
        id: "prescribed-record-analytical-braid-evaluator",
        version: "v2",
        resultMode,
        pathEvolutionInvoked: false,
        eomSolverInvoked: false,
      },
      claimGrade: "derived",
      claimScope:
        "diagnostic event batch for compact prescribed-path reduction",
      excludedClaims: [
        "independent-acceptance",
        "stability",
        "energy",
        "retention",
        "physical-realization",
      ],
      source: {
        recordId: sourceRecord.recordId,
        sourceHash,
      },
      protocolId: protocol.protocolId,
      rawLedgers: {
        causalRoots: events,
        numericalConvergence: eventConvergence.entries,
      },
      reducedMeasures: {
        rootTransversalityMargin: finiteRootTransversalityMargin,
        numericalConvergence,
        validity,
      },
      status: {
        code: validity.passed ? "ok" : "analytical_validity_gate_failed",
        severity: validity.passed ? "ok" : "error",
        message: validity.passed
          ? "compact prescribed-record event batch evaluated"
          : "one or more declared analytical validity gates failed",
      },
    };
  }

  const packetWithoutHash = {
    schema: PRESCRIBED_RECORD_ANALYSIS_RESULT_SCHEMA,
    evaluator: {
      id: "prescribed-record-analytical-braid-evaluator",
      version: "v2",
      pathEvolutionInvoked: false,
      eomSolverInvoked: false,
    },
    claimGrade: "derived",
    claimScope: "conditional analytical consequence of the exact prescribed source record and complete protocol",
    excludedClaims: ["stability", "energy", "retention", "physical-realization"],
    source: {
      recordId: sourceRecord.recordId,
      sourceHash,
      upstreamSourceHash: sourceRecord.sourceHash ?? null,
      sourceSchema: sourceRecord.sourceSchema ?? sourceRecord.schema,
      exactSourceRecordSchema: sourceRecord.schema,
      generatingSpec: sourceRecord.generatingSpec ?? null,
      engineId: sourceRecord.engineId,
      engineVersion: sourceRecord.engineVersion ?? null,
      sourceClaimGrade: sourceRecord.claimGrade ?? null,
      sourceEvidenceStatus: sourceRecord.evidenceStatus ?? null,
      taxonomy: sourceRecord.taxonomy ?? null,
      parameterVector: exactParameterVector(sourceRecord),
    },
    protocolHash,
    protocol,
    tolerances: {
      ...protocol.tolerances,
      primaryRootTolerance: protocol.rootPolicy.tolerance,
      refinedRootTolerance: protocol.convergence.rootTolerance,
    },
    probeDefinitions: protocol.probes,
    rawLedgers: {
      causalRoots: events,
      prescribedPeriodClosure: prescribedPeriodClosure.entries,
      minimumSeparation: minimumSeparation.pairRows,
      refinedMinimumSeparation: refinedMinimumSeparation.pairRows,
      numericalConvergence: eventConvergence.entries,
    },
    reducedMeasures: {
      events: events.map((event) => ({
        eventId: event.eventId,
        probeId: event.probeId,
        observationTime: event.observationTime,
        rootCount: event.rootCount,
        noRootCount: event.noRootCount,
        ...event.measures,
      })),
      prescribedPeriodClosure: {
        start: prescribedPeriodClosure.start,
        end: prescribedPeriodClosure.end,
        period: prescribedPeriodClosure.period,
        maximumPositionResidual: prescribedPeriodClosure.maximumPositionResidual,
        maximumVelocityResidual: prescribedPeriodClosure.maximumVelocityResidual,
        maximumPhaseResidual: prescribedPeriodClosure.maximumPhaseResidual,
      },
      minimumSeparation: {
        value: minimumSeparation.minimumSeparation,
        pairId: minimumSeparation.minimumPairId,
        firstMinimumSampleTime: minimumSeparation.firstMinimumSampleTime,
        sampleCount: minimumSeparation.sampleCount,
        samplingRule: minimumSeparation.samplingRule,
        certifiedContinuousLowerBound:
          minimumSeparation.certifiedContinuousLowerBound,
        certificatePairId: minimumSeparation.certificatePairId,
        certificateRule: minimumSeparation.certificateRule,
        sampleCoveringRadius: minimumSeparation.sampleCoveringRadius,
      },
      rootTransversalityMargin: finiteRootTransversalityMargin,
      numericalConvergence,
      validity,
    },
    status: {
      code: validity.passed ? "ok" : "analytical_validity_gate_failed",
      severity: validity.passed ? "ok" : "error",
      message: validity.passed
        ? "prescribed-record analytical measures evaluated under the complete protocol"
        : "one or more declared analytical validity gates failed",
    },
    falsifier:
      "Reject evaluator correctness if an independent closed-form or symmetry-protected case differs beyond the declared tolerance, if a retained root is missing, or if identical exact source and protocol inputs produce a different result hash.",
  };
  const resultHash = sha256Canonical(packetWithoutHash);
  return { ...packetWithoutHash, resultHash };
}
