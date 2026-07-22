import { createHash } from "node:crypto";

import {
  evaluateExactPrescribedSourceState,
  validateExactPrescribedSourceRecord,
} from "./ExactPrescribedSourceWake.mjs";

export const PRESCRIBED_RECORD_ANALYSIS_PROTOCOL_SCHEMA =
  "prescribed-path-analysis/analysis-protocol.v1";
export const PRESCRIBED_RECORD_ANALYSIS_RESULT_SCHEMA =
  "prescribed-path-analysis/result-packet.v1";
export const ALL_RETAINED_SIMPLE_ROOTS_POLICY =
  "all-retained-simple-roots/sub-field-speed-certified.v1";

const FOUR_PI = 4 * Math.PI;
const TWO_PI = 2 * Math.PI;

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
  if (rawProbe?.kind !== "stationary-coordinate-probe.v1") {
    throw new TypeError(`${label}.kind must be stationary-coordinate-probe.v1.`);
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
  return {
    id,
    kind: rawProbe.kind,
    position: vector(rawProbe.position, `${label}.position`),
    observationTimes,
    polarities,
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
  if (rawProtocol.rootPolicy?.id !== ALL_RETAINED_SIMPLE_ROOTS_POLICY) {
    throw new TypeError(`protocol.rootPolicy.id must be ${ALL_RETAINED_SIMPLE_ROOTS_POLICY}.`);
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
    rootPolicy: {
      id: ALL_RETAINED_SIMPLE_ROOTS_POLICY,
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
  const startRate = trajectory.angularVelocity +
    trajectory.angularAcceleration * (startTime - trajectory.epochTime);
  const endRate = trajectory.angularVelocity +
    trajectory.angularAcceleration * (endTime - trajectory.epochTime);
  const maximumAngularRate = Math.max(Math.abs(startRate), Math.abs(endRate));
  return magnitude(trajectory.centerVelocity) +
    maximumAngularRate * magnitude(trajectory.radiusU);
}

function residualAt(source, emissionTime, observationTime, probePosition, fieldSpeed) {
  const state = evaluateExactPrescribedSourceState(source, emissionTime);
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

function solveCertifiedRetainedRoot({
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

function evaluateEvent({ sourceRecord, protocol, probe, observationTime, rootTolerance, maxIterations }) {
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
  for (const source of sourceRecord.sources) {
    const solved = solveCertifiedRetainedRoot({
      source,
      retainedStart,
      retainedEnd,
      observationTime,
      probePosition: probe.position,
      fieldSpeed: protocol.fieldSpeed,
      tolerance: rootTolerance,
      maxIterations,
    });
    if (!solved.root) {
      noRootTransmitters.push({
        transmitterId: source.id,
        rootCount: 0,
        reason: solved.reason,
        retainedInterval: solved.retainedInterval,
        endpointResiduals: solved.endpointResiduals,
        certifiedSpeedBound: solved.speedBound,
        certifiedMonotonicityMargin: solved.monotonicityMargin,
      });
      continue;
    }
    const root = solved.root;
    if (!(root.distance > 0)) {
      throw new RangeError(`causal root for ${source.id} has zero distance.`);
    }
    const direction = scale(root.displacement, 1 / root.distance);
    const transmitterRadialSpeed = dot(root.state.velocity, direction);
    const transmitterSideFactorDt = protocol.fieldSpeed - transmitterRadialSpeed;
    if (!(transmitterSideFactorDt > 0)) {
      throw new RangeError(`causal root for ${source.id} is not a retained simple root.`);
    }
    const denominator = FOUR_PI * root.distance * root.distance * Math.abs(transmitterSideFactorDt);
    const accelerationBaseScale = protocol.coupling * source.charge *
      protocol.fieldSpeed / Math.abs(transmitterSideFactorDt) /
      (root.distance * root.distance);
    roots.push({
      rootId: `${probe.id}<-${source.id}:simple:0`,
      rootOrdinal: 0,
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
      rootTransversalityMargin: Math.abs(transmitterSideFactorDt),
      accelerationWeight: protocol.fieldSpeed / Math.abs(transmitterSideFactorDt),
      signedWakeContribution: source.charge / denominator,
      unsignedWakeContribution: Math.abs(source.charge) / denominator,
      probeAccelerationContributions: probe.polarities.map((probePolarity) => ({
        probePolarity,
        acceleration: scale(direction, accelerationBaseScale * probePolarity),
      })),
      rootIterations: solved.iterations,
      finalBracket: solved.finalBracket,
      endpointResiduals: solved.endpointResiduals,
      certifiedSpeedBound: solved.speedBound,
      certifiedMonotonicityMargin: solved.monotonicityMargin,
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
    probePosition: probe.position,
    retainedHistory: { start: retainedStart, end: retainedEnd },
    rootCompletenessCertification: {
      policy: ALL_RETAINED_SIMPLE_ROOTS_POLICY,
      complete: true,
      reason:
        "Each transmitter residual is strictly increasing because its certified speed bound is below fieldSpeed; therefore the retained interval contains at most one root.",
    },
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
    const startState = evaluateExactPrescribedSourceState(source, start);
    const endState = evaluateExactPrescribedSourceState(source, end);
    const positionResidual = subtract(endState.position, startState.position);
    const velocityResidual = subtract(endState.velocity, startState.velocity);
    const phaseResidual = wrappedPhaseDifference(
      startState.phase.rawRadians,
      endState.phase.rawRadians,
    );
    return {
      transmitterId: source.id,
      startTime: start,
      endTime: end,
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
        const leftState = evaluateExactPrescribedSourceState(left, time);
        const rightState = evaluateExactPrescribedSourceState(right, time);
        const separation = magnitude(subtract(leftState.position, rightState.position));
        if (separation < minimum) {
          minimum = separation;
          minimumTime = time;
        }
      }
      pairRows.push({
        pairId: `${left.id}<->${right.id}`,
        leftTransmitterId: left.id,
        rightTransmitterId: right.id,
        minimumSeparation: minimum,
        firstMinimumSampleTime: minimumTime,
      });
    }
  }
  const minimumRow = pairRows.reduce(
    (best, row) => row.minimumSeparation < best.minimumSeparation ? row : best,
    pairRows[0],
  );
  return {
    samplingRule: protocol.geometry.samplingRule,
    start,
    period,
    sampleCount,
    pairRows,
    minimumSeparation: minimumRow.minimumSeparation,
    minimumPairId: minimumRow.pairId,
    firstMinimumSampleTime: minimumRow.firstMinimumSampleTime,
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

export function evaluatePrescribedRecordAnalysis(request = {}) {
  const sourceRecord = validateExactPrescribedSourceRecord(request.sourceRecord);
  const protocol = validatePrescribedRecordAnalysisProtocol(request.protocol);
  if (protocol.history.start < sourceRecord.history.start ||
      protocol.history.end > sourceRecord.history.end) {
    throw new RangeError("protocol history must lie within the exact source-record history.");
  }
  const returnEnd = protocol.returnWindow.start + protocol.returnWindow.period;
  if (protocol.returnWindow.start < sourceRecord.history.start || returnEnd > sourceRecord.history.end) {
    throw new RangeError("protocol return window must lie within the exact source-record history.");
  }

  const sourceHash = sha256Canonical(sourceRecord);
  const protocolHash = sha256Canonical(protocol);
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
  const prescribedPeriodClosure = evaluatePeriodClosure(sourceRecord, protocol);
  const minimumSeparation = evaluateMinimumSeparation(
    sourceRecord,
    protocol,
    protocol.geometry.minimumSeparationSamples,
  );
  const refinedMinimumSeparation = evaluateMinimumSeparation(
    sourceRecord,
    protocol,
    protocol.convergence.minimumSeparationSamples,
  );
  const eventConvergence = compareEventLedgers(events, refinedEvents, protocol);
  const minimumSeparationChange = Math.abs(
    minimumSeparation.minimumSeparation - refinedMinimumSeparation.minimumSeparation,
  );
  const convergenceMaximumChange = Math.max(
    eventConvergence.maximumChange,
    minimumSeparationChange,
  );
  const numericalConvergence = {
    comparisonRule: "primary-versus-tighter-root-and-denser-periodic-grid.v1",
    absoluteTolerance: protocol.tolerances.convergenceAbsolute,
    eventConvergence,
    minimumSeparation: {
      primarySampleCount: minimumSeparation.sampleCount,
      refinedSampleCount: refinedMinimumSeparation.sampleCount,
      primaryValue: minimumSeparation.minimumSeparation,
      refinedValue: refinedMinimumSeparation.minimumSeparation,
      absoluteChange: minimumSeparationChange,
      minimumPairIdentityMatch:
        minimumSeparation.minimumPairId === refinedMinimumSeparation.minimumPairId,
    },
    maximumReportedChange: convergenceMaximumChange,
    passed: eventConvergence.rootIdentitiesMatch &&
      minimumSeparation.minimumPairId === refinedMinimumSeparation.minimumPairId &&
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
      minimumSeparation.minimumSeparation >= protocol.tolerances.minimumSeparationFloor,
    numericalConvergencePassed: numericalConvergence.passed,
  };
  validity.passed = Object.values(validity).every(Boolean);

  const packetWithoutHash = {
    schema: PRESCRIBED_RECORD_ANALYSIS_RESULT_SCHEMA,
    evaluator: {
      id: "prescribed-record-analytical-braid-evaluator",
      version: "v1",
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
      parameterVector: sourceRecord.parameterVector ?? null,
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
