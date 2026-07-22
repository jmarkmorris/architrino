import { evaluateMovingCircularTransmitterHistory } from "./PrescribedOrbitCausalRoots.mjs";

export const EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA =
  "prescribed-path-analysis/exact-source-record.v1";
export const PRESCRIBED_SOURCE_WAKE_EVALUATION_SCHEMA =
  "prescribed-path-analysis/causal-wake-evaluation.v1";

const MOVING_CIRCULAR_TRAJECTORY_SCHEMA = "moving-circular.v1";
const FOUR_PI = 4 * Math.PI;
const DEFAULT_ROOT_TOLERANCE = 1e-12;
const DEFAULT_MAX_ROOT_ITERATIONS = 128;
const DEFAULT_MINIMUM_DELAY = 1e-12;

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new TypeError(`${label} must be finite.`);
  }
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (!(number > 0)) {
    throw new RangeError(`${label} must be positive.`);
  }
  return number;
}

function nonnegativeNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new RangeError(`${label} must be nonnegative.`);
  }
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
  return {
    x: left.x + right.x,
    y: left.y + right.y,
    z: left.z + right.z,
  };
}

function subtract(left, right) {
  return {
    x: left.x - right.x,
    y: left.y - right.y,
    z: left.z - right.z,
  };
}

function scale(value, scalar) {
  return {
    x: value.x * scalar,
    y: value.y * scalar,
    z: value.z * scalar,
  };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function magnitude(value) {
  return Math.sqrt(dot(value, value));
}

function validateMovingCircularTrajectory(trajectory, label) {
  if (!trajectory || trajectory.kind !== MOVING_CIRCULAR_TRAJECTORY_SCHEMA) {
    throw new TypeError(`${label}.kind must be ${MOVING_CIRCULAR_TRAJECTORY_SCHEMA}.`);
  }
  const radiusU = vector(trajectory.radiusU, `${label}.radiusU`);
  const radiusV = vector(trajectory.radiusV, `${label}.radiusV`);
  const radiusUNorm = magnitude(radiusU);
  const radiusVNorm = magnitude(radiusV);
  const scaleTolerance = 1e-12 * Math.max(1, radiusUNorm, radiusVNorm);
  if (Math.abs(radiusUNorm - radiusVNorm) > scaleTolerance) {
    throw new RangeError(`${label} must have equal radiusU and radiusV lengths.`);
  }
  if (Math.abs(dot(radiusU, radiusV)) > scaleTolerance * Math.max(1, radiusUNorm)) {
    throw new RangeError(`${label} radiusU and radiusV must be orthogonal.`);
  }
  return {
    kind: MOVING_CIRCULAR_TRAJECTORY_SCHEMA,
    epochTime: finiteNumber(trajectory.epochTime ?? 0, `${label}.epochTime`),
    centerAtEpoch: vector(trajectory.centerAtEpoch, `${label}.centerAtEpoch`),
    centerVelocity: vector(trajectory.centerVelocity, `${label}.centerVelocity`),
    radiusU,
    radiusV,
    angularVelocity: finiteNumber(trajectory.angularVelocity ?? 0, `${label}.angularVelocity`),
    angularAcceleration: finiteNumber(
      trajectory.angularAcceleration ?? 0,
      `${label}.angularAcceleration`,
    ),
    phaseAtEpoch: finiteNumber(trajectory.phaseAtEpoch ?? 0, `${label}.phaseAtEpoch`),
  };
}

export function validateExactPrescribedSourceRecord(record) {
  if (!record || typeof record !== "object" || Array.isArray(record)) {
    throw new TypeError("exact prescribed source record must be an object.");
  }
  if (record.schema !== EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA) {
    throw new TypeError(
      `exact prescribed source record requires schema ${EXACT_PRESCRIBED_SOURCE_RECORD_SCHEMA}.`,
    );
  }
  concreteString(record.recordId, "sourceRecord.recordId");
  if (record.engineId !== "prescribed-geometry") {
    throw new TypeError("sourceRecord.engineId must be prescribed-geometry.");
  }
  const historyStart = finiteNumber(record.history?.start, "sourceRecord.history.start");
  const historyEnd = finiteNumber(record.history?.end, "sourceRecord.history.end");
  if (!(historyEnd > historyStart)) {
    throw new RangeError("sourceRecord.history.end must be greater than history.start.");
  }
  if (!Array.isArray(record.sources) || record.sources.length === 0) {
    throw new TypeError("sourceRecord.sources must contain at least one source.");
  }
  const ids = new Set();
  const sources = record.sources.map((source, index) => {
    const label = `sourceRecord.sources[${index}]`;
    const id = concreteString(source?.id, `${label}.id`);
    if (ids.has(id)) {
      throw new TypeError(`sourceRecord source id ${id} is duplicated.`);
    }
    ids.add(id);
    const charge = finiteNumber(source.charge, `${label}.charge`);
    if (charge === 0) {
      throw new RangeError(`${label}.charge must be nonzero.`);
    }
    return {
      id,
      charge,
      trajectory: validateMovingCircularTrajectory(source.trajectory, `${label}.trajectory`),
    };
  });
  return {
    ...record,
    history: { start: historyStart, end: historyEnd },
    sources,
  };
}

export function evaluateExactPrescribedSourceState(source, time) {
  const normalized = {
    id: concreteString(source?.id, "source.id"),
    charge: finiteNumber(source?.charge, "source.charge"),
    trajectory: validateMovingCircularTrajectory(source?.trajectory, "source.trajectory"),
  };
  return evaluateMovingCircularTransmitterHistory(normalized.trajectory, finiteNumber(time, "time"));
}

function maximumTrajectorySpeed(trajectory, startTime, endTime) {
  const startRate = trajectory.angularVelocity +
    trajectory.angularAcceleration * (startTime - trajectory.epochTime);
  const endRate = trajectory.angularVelocity +
    trajectory.angularAcceleration * (endTime - trajectory.epochTime);
  const maximumAngularRate = Math.max(Math.abs(startRate), Math.abs(endRate));
  return magnitude(trajectory.centerVelocity) + maximumAngularRate * magnitude(trajectory.radiusU);
}

function residualAt(source, emissionTime, observationTime, probePosition, fieldSpeed) {
  const state = evaluateMovingCircularTransmitterHistory(source.trajectory, emissionTime);
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

function solveUniqueRoot({
  source,
  startTime,
  endTime,
  observationTime,
  probePosition,
  fieldSpeed,
  rootTolerance,
  maxRootIterations,
}) {
  const start = residualAt(source, startTime, observationTime, probePosition, fieldSpeed);
  const end = residualAt(source, endTime, observationTime, probePosition, fieldSpeed);
  if (Math.abs(start.residual) <= rootTolerance) {
    return { root: start, iterations: 0, bracket: [startTime, startTime] };
  }
  if (Math.abs(end.residual) <= rootTolerance) {
    return { root: end, iterations: 0, bracket: [endTime, endTime] };
  }
  if (!(start.residual < 0 && end.residual > 0)) {
    return {
      root: null,
      iterations: 0,
      bracket: [startTime, endTime],
      reason: start.residual > 0
        ? "root_precedes_retained_history"
        : "root_follows_retained_history",
      endpointResiduals: [start.residual, end.residual],
    };
  }

  let lowTime = startTime;
  let highTime = endTime;
  let best = Math.abs(start.residual) <= Math.abs(end.residual) ? start : end;
  let iterations = 0;
  for (; iterations < maxRootIterations; iterations += 1) {
    const midTime = (lowTime + highTime) / 2;
    const mid = residualAt(source, midTime, observationTime, probePosition, fieldSpeed);
    if (Math.abs(mid.residual) < Math.abs(best.residual)) best = mid;
    if (Math.abs(mid.residual) <= rootTolerance) {
      best = mid;
      break;
    }
    if (mid.residual < 0) lowTime = midTime;
    else highTime = midTime;
  }
  if (Math.abs(best.residual) > rootTolerance) {
    throw new Error(
      `causal root for ${source.id} did not converge within ${maxRootIterations} iterations; ` +
      `residual=${best.residual}.`,
    );
  }
  return {
    root: best,
    iterations,
    bracket: [lowTime, highTime],
  };
}

function buildContribution({ source, solved, observationTime, probeCharge, fieldSpeed, coupling }) {
  const root = solved.root;
  const distance = positiveNumber(root.distance, `${source.id} root distance`);
  const direction = scale(root.displacement, 1 / distance);
  const transmitterRadialSpeed = dot(root.state.velocity, direction);
  const transmitterFactor = fieldSpeed - transmitterRadialSpeed;
  if (!(transmitterFactor > 0)) {
    throw new RangeError(
      `causal root for ${source.id} is outside the simple sub-field-speed domain.`,
    );
  }
  const denominator = FOUR_PI * distance * distance * Math.abs(transmitterFactor);
  const signedWake = source.charge / denominator;
  const unsignedWake = Math.abs(source.charge) / denominator;
  const chargeProduct = source.charge * probeCharge;
  const accelerationScale = coupling * Math.sign(chargeProduct) * Math.abs(chargeProduct) *
    (fieldSpeed / Math.abs(transmitterFactor)) / (distance * distance);
  return {
    transmitterId: source.id,
    transmitterCharge: source.charge,
    rootStatus: "simple_unique_root",
    emissionTime: root.emissionTime,
    receptionTime: observationTime,
    delay: observationTime - root.emissionTime,
    transmitterPosition: root.state.position,
    transmitterVelocity: root.state.velocity,
    displacement: root.displacement,
    direction,
    distance,
    residual: root.residual,
    transmitterRadialSpeed,
    transmitterFactor,
    accelerationWeight: fieldSpeed / Math.abs(transmitterFactor),
    signedWake,
    unsignedWake,
    virtualProbeAcceleration: scale(direction, accelerationScale),
    rootIterations: solved.iterations,
    finalBracket: solved.bracket,
  };
}

export function evaluatePrescribedSourceWake(request = {}) {
  const sourceRecord = validateExactPrescribedSourceRecord(request.sourceRecord);
  const observationTime = finiteNumber(request.observationTime, "observationTime");
  const probePosition = vector(request.probePosition, "probePosition");
  const probeCharge = finiteNumber(request.probeCharge, "probeCharge");
  if (probeCharge === 0) throw new RangeError("probeCharge must be nonzero.");
  const fieldSpeed = positiveNumber(request.fieldSpeed, "fieldSpeed");
  const coupling = positiveNumber(request.coupling ?? 1, "coupling");
  const rootTolerance = positiveNumber(
    request.rootTolerance ?? DEFAULT_ROOT_TOLERANCE,
    "rootTolerance",
  );
  const maxRootIterations = positiveInteger(
    request.maxRootIterations ?? DEFAULT_MAX_ROOT_ITERATIONS,
    "maxRootIterations",
  );
  const minimumDelay = nonnegativeNumber(
    request.minimumDelay ?? DEFAULT_MINIMUM_DELAY,
    "minimumDelay",
  );
  const cancellationFloor = positiveNumber(
    request.cancellationFloor ?? 1e-30,
    "cancellationFloor",
  );
  const retainedStart = sourceRecord.history.start;
  const retainedEnd = Math.min(sourceRecord.history.end, observationTime - minimumDelay);
  if (!(retainedEnd > retainedStart)) {
    throw new RangeError("observation event has no retained emission-time interval.");
  }

  for (const source of sourceRecord.sources) {
    const speedBound = maximumTrajectorySpeed(source.trajectory, retainedStart, retainedEnd);
    if (!(speedBound < fieldSpeed)) {
      throw new RangeError(
        `source ${source.id} speed bound ${speedBound} must remain below fieldSpeed ${fieldSpeed}; ` +
        "the first analytical evaluator certifies only the unique simple-root domain.",
      );
    }
  }

  const contributions = [];
  const noRootSources = [];
  for (const source of sourceRecord.sources) {
    const solved = solveUniqueRoot({
      source,
      startTime: retainedStart,
      endTime: retainedEnd,
      observationTime,
      probePosition,
      fieldSpeed,
      rootTolerance,
      maxRootIterations,
    });
    if (!solved.root) {
      noRootSources.push({
        transmitterId: source.id,
        rootStatus: "no_retained_root",
        reason: solved.reason,
        retainedInterval: solved.bracket,
        endpointResiduals: solved.endpointResiduals,
      });
      continue;
    }
    contributions.push(buildContribution({
      source,
      solved,
      observationTime,
      probeCharge,
      fieldSpeed,
      coupling,
    }));
  }

  const signedWake = contributions.reduce((sum, row) => sum + row.signedWake, 0);
  const unsignedWake = contributions.reduce((sum, row) => sum + row.unsignedWake, 0);
  const virtualProbeAcceleration = contributions.reduce(
    (sum, row) => add(sum, row.virtualProbeAcceleration),
    { x: 0, y: 0, z: 0 },
  );
  const maximumRootResidual = contributions.reduce(
    (maximum, row) => Math.max(maximum, Math.abs(row.residual)),
    0,
  );

  return {
    schema: PRESCRIBED_SOURCE_WAKE_EVALUATION_SCHEMA,
    sourceRecord: {
      recordId: sourceRecord.recordId,
      sourceSchema: sourceRecord.sourceSchema ?? sourceRecord.schema,
      sourceHash: sourceRecord.sourceHash ?? null,
      generatingSpec: sourceRecord.generatingSpec ?? null,
      engineId: sourceRecord.engineId,
      engineVersion: sourceRecord.engineVersion ?? null,
      sourceClaimGrade: sourceRecord.claimGrade ?? null,
      sourceEvidenceStatus: sourceRecord.evidenceStatus ?? null,
    },
    claimGrade: "derived",
    claimScope: "conditional analytical consequence of the exact prescribed source record",
    dynamicalEvidence: false,
    stabilityEvidence: false,
    observationEvent: {
      time: observationTime,
      position: probePosition,
      probeCharge,
    },
    protocol: {
      fieldSpeed,
      coupling,
      retainedHistory: { start: retainedStart, end: retainedEnd },
      rootPolicy: "unique-simple-root/sub-field-speed.v1",
      rootTolerance,
      maxRootIterations,
      minimumDelay,
      cancellationFloor,
    },
    contributionCount: contributions.length,
    noRootCount: noRootSources.length,
    contributions,
    noRootSources,
    signedWake,
    unsignedWake,
    cancellationRatio: Math.abs(signedWake) / (unsignedWake + cancellationFloor),
    virtualProbeAcceleration,
    maximumRootResidual,
    status: {
      code: "ok",
      severity: "ok",
      message: "exact prescribed-source causal wake and virtual-probe response evaluated",
    },
    falsifier:
      "Reject this evaluation if an independently known causal root, wake sum, or virtual-probe response differs beyond the declared root tolerance.",
  };
}
