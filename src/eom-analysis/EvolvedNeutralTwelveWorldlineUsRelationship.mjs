import {
  ASSEMBLY_VIEW_RECORD_SCHEMA,
  createEomHistoryDataset,
} from "../apps/shared/EomHistoryDataset.mjs";
import {
  createSphericalProductQuadrature,
} from "../prescribed-path-analysis/CoincidentAxisThreeBinaryCompleteCycleProbeProtocol.mjs";

export const EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_PROTOCOL_SCHEMA =
  "eom-analysis/evolved-neutral-twelve-worldline-us-protocol.v1";
export const EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_RESULT_SCHEMA =
  "eom-analysis/evolved-neutral-twelve-worldline-us-result.v1";

const FOUR_PI = 4 * Math.PI;
const AXES = Object.freeze(["x", "y", "z"]);

function finite(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) throw new TypeError(`${label} must be finite.`);
  return number;
}

function positive(value, label) {
  const number = finite(value, label);
  if (!(number > 0)) throw new RangeError(`${label} must be positive.`);
  return number;
}

function positiveInteger(value, label) {
  const number = finite(value, label);
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
  return Object.freeze({
    x: finite(value.x, `${label}.x`),
    y: finite(value.y, `${label}.y`),
    z: finite(value.z, `${label}.z`),
  });
}

function add(left, right) {
  return { x: left.x + right.x, y: left.y + right.y, z: left.z + right.z };
}

function subtract(left, right) {
  return { x: left.x - right.x, y: left.y - right.y, z: left.z - right.z };
}

function scale(value, scalar) {
  return { x: scalar * value.x, y: scalar * value.y, z: scalar * value.z };
}

function dot(left, right) {
  return left.x * right.x + left.y * right.y + left.z * right.z;
}

function norm(value) {
  return Math.sqrt(dot(value, value));
}

function zeroMatrix() {
  return [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

function addOuter(matrix, left, right, factor) {
  const a = [left.x, left.y, left.z];
  const b = [right.x, right.y, right.z];
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 3; column += 1) {
      matrix[row][column] += factor * a[row] * b[column];
    }
  }
}

function symmetricTraceFree(matrix) {
  const trace = matrix[0][0] + matrix[1][1] + matrix[2][2];
  return matrix.map((row, rowIndex) => row.map((value, columnIndex) =>
    value - (rowIndex === columnIndex ? trace / 3 : 0)));
}

function matrixNormSquared(matrix) {
  return matrix.reduce(
    (sum, row) => sum + row.reduce((rowSum, value) => rowSum + value * value, 0),
    0,
  );
}

function normalizeResolution(raw, label) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError(`${label} must be an object.`);
  }
  return Object.freeze({
    polarOrder: positiveInteger(raw.polarOrder, `${label}.polarOrder`),
    azimuthCount: positiveInteger(raw.azimuthCount, `${label}.azimuthCount`),
  });
}

export function validateEvolvedNeutralTwelveWorldlineUsProtocol(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    throw new TypeError("evolved neutral twelve-worldline U-S protocol must be an object.");
  }
  if (raw.schema !== EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_PROTOCOL_SCHEMA) {
    throw new TypeError(
      `protocol.schema must be ${EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_PROTOCOL_SCHEMA}.`,
    );
  }
  if (raw.configurationKind !== "neutral-twelve-worldline") {
    throw new TypeError(
      "protocol.configurationKind must be neutral-twelve-worldline.",
    );
  }
  if (finite(raw.fieldSpeed, "protocol.fieldSpeed") !== 1) {
    throw new RangeError("protocol.fieldSpeed must be 1.");
  }
  const start = finite(raw.claimWindow?.start, "protocol.claimWindow.start");
  const end = finite(raw.claimWindow?.end, "protocol.claimWindow.end");
  if (!(end > start)) {
    throw new RangeError("protocol.claimWindow.end must exceed start.");
  }
  const minimumAllowedEmissionTime = finite(
    raw.minimumAllowedEmissionTime,
    "protocol.minimumAllowedEmissionTime",
  );
  if (minimumAllowedEmissionTime > start) {
    throw new RangeError(
      "protocol.minimumAllowedEmissionTime must not exceed the claim-window start.",
    );
  }
  if (!Array.isArray(raw.radii) || raw.radii.length === 0) {
    throw new TypeError("protocol.radii must be a nonempty array.");
  }
  const radii = raw.radii.map((radius, index) =>
    positive(radius, `protocol.radii[${index}]`));
  for (let index = 1; index < radii.length; index += 1) {
    if (!(radii[index] > radii[index - 1])) {
      throw new RangeError("protocol.radii must be strictly increasing.");
    }
  }
  const primary = normalizeResolution(raw.quadrature?.primary, "protocol.quadrature.primary");
  const refined = normalizeResolution(raw.quadrature?.refined, "protocol.quadrature.refined");
  if (refined.polarOrder < primary.polarOrder ||
      refined.azimuthCount < primary.azimuthCount ||
      (refined.polarOrder === primary.polarOrder &&
        refined.azimuthCount === primary.azimuthCount)) {
    throw new RangeError(
      "protocol.quadrature.refined must strictly refine at least one primary dimension.",
    );
  }
  return Object.freeze({
    ...raw,
    protocolId: concreteString(raw.protocolId, "protocol.protocolId"),
    configurationKind: "neutral-twelve-worldline",
    configurationId: concreteString(
      raw.configurationId,
      "protocol.configurationId",
    ),
    fieldSpeed: 1,
    claimWindow: Object.freeze({ start, end }),
    minimumAllowedEmissionTime,
    rowCount: positiveInteger(raw.rowCount, "protocol.rowCount"),
    probeCenter: vector(raw.probeCenter, "protocol.probeCenter"),
    radii: Object.freeze(radii),
    quadrature: Object.freeze({ primary, refined }),
    rootTolerance: positive(raw.rootTolerance, "protocol.rootTolerance"),
    maxRootIterations: positiveInteger(
      raw.maxRootIterations,
      "protocol.maxRootIterations",
    ),
    neutralityTolerance: positive(
      raw.neutralityTolerance,
      "protocol.neutralityTolerance",
    ),
    minimumPower: positive(raw.minimumPower, "protocol.minimumPower"),
    retainRootLedger: raw.retainRootLedger === true,
  });
}

function segmentState(segment, time, worldlineId) {
  const local = time - segment.startTime;
  if (local < -1e-12 || local > segment.endTime - segment.startTime + 1e-12) {
    throw new RangeError(
      `worldline ${worldlineId} segment does not cover time ${time}.`,
    );
  }
  const position = {};
  const velocity = {};
  const acceleration = {};
  const jerk = {};
  AXES.forEach((axis, axisIndex) => {
    const [c0, c1, c2, c3] = segment.coefficients[axisIndex];
    position[axis] = c0 + local * (c1 + local * (c2 + local * c3));
    velocity[axis] = c1 + local * (2 * c2 + local * 3 * c3);
    acceleration[axis] = 2 * c2 + local * 6 * c3;
    jerk[axis] = 6 * c3;
  });
  return { position, velocity, acceleration, jerk };
}

export function evaluateEvolvedWorldlineState(worldline, time) {
  const normalizedTime = finite(time, "worldline evaluation time");
  const segment = worldline.segments.find((candidate, index) =>
    candidate.startTime <= normalizedTime &&
    (normalizedTime < candidate.endTime ||
      index + 1 === worldline.segments.length));
  if (!segment) {
    throw new RangeError(
      `worldline ${worldline.id} does not cover time ${normalizedTime}.`,
    );
  }
  return segmentState(segment, normalizedTime, worldline.id);
}

function bernsteinPositionControls(segment) {
  const duration = segment.endTime - segment.startTime;
  return [0, 1, 2, 3].map((controlIndex) => {
    const result = {};
    AXES.forEach((axis, axisIndex) => {
      const [c0, c1, c2, c3] = segment.coefficients[axisIndex];
      if (controlIndex === 0) result[axis] = c0;
      if (controlIndex === 1) result[axis] = c0 + c1 * duration / 3;
      if (controlIndex === 2) {
        result[axis] =
          c0 + 2 * c1 * duration / 3 + c2 * duration * duration / 3;
      }
      if (controlIndex === 3) {
        result[axis] =
          c0 + c1 * duration + c2 * duration * duration +
          c3 * duration ** 3;
      }
    });
    return result;
  });
}

function bernsteinVelocityControls(segment) {
  const duration = segment.endTime - segment.startTime;
  return [0, 1, 2].map((controlIndex) => {
    const result = {};
    AXES.forEach((axis, axisIndex) => {
      const [, c1, c2, c3] = segment.coefficients[axisIndex];
      if (controlIndex === 0) result[axis] = c1;
      if (controlIndex === 1) result[axis] = c1 + c2 * duration;
      if (controlIndex === 2) {
        result[axis] = c1 + 2 * c2 * duration + 3 * c3 * duration ** 2;
      }
    });
    return result;
  });
}

function clippedSegment(segment, startTime, endTime) {
  const clippedStart = Math.max(segment.startTime, startTime);
  const clippedEnd = Math.min(segment.endTime, endTime);
  if (!(clippedEnd > clippedStart)) return null;
  const state = segmentState(segment, clippedStart, "bound");
  return {
    startTime: clippedStart,
    endTime: clippedEnd,
    coefficients: AXES.map((axis, axisIndex) => [
      state.position[axis],
      state.velocity[axis],
      state.acceleration[axis] / 2,
      segment.coefficients[axisIndex][3],
    ]),
  };
}

function certifiedHistoryBounds(worldlines, probeCenter, startTime, endTime) {
  let envelope = 0;
  let speed = 0;
  for (const worldline of worldlines) {
    for (const segment of worldline.segments) {
      const clipped = clippedSegment(segment, startTime, endTime);
      if (!clipped) continue;
      for (const control of bernsteinPositionControls(clipped)) {
        envelope = Math.max(envelope, norm(subtract(control, probeCenter)));
      }
      for (const control of bernsteinVelocityControls(clipped)) {
        speed = Math.max(speed, norm(control));
      }
    }
  }
  return { envelope, speed };
}

function validateRecord(record, protocol) {
  if (record?.schema !== ASSEMBLY_VIEW_RECORD_SCHEMA) {
    throw new TypeError(
      `evolved neutral twelve-worldline U-S analysis requires ${ASSEMBLY_VIEW_RECORD_SCHEMA}.`,
    );
  }
  const dataset = createEomHistoryDataset(record);
  if (dataset.provenance.engineId !== "eom-solver" ||
      dataset.provenance.claimGrade !== "evolved-record" ||
      dataset.provenance.conversion != null) {
    throw new TypeError(
      "analysis requires direct EOM solver output with claimGrade evolved-record and no conversion.",
    );
  }
  if (dataset.worldlines.length !== 12) {
    throw new RangeError(
      `neutral twelve-worldline analysis requires exactly 12 evolved worldlines; received ${dataset.worldlines.length}.`,
    );
  }
  const netCharge = dataset.worldlines.reduce(
    (sum, worldline) => sum + worldline.charge,
    0,
  );
  const absoluteCharge = dataset.worldlines.reduce(
    (sum, worldline) => sum + Math.abs(worldline.charge),
    0,
  );
  if (Math.abs(netCharge) >
      protocol.neutralityTolerance * Math.max(1, absoluteCharge)) {
    throw new RangeError(
      `neutral twelve-worldline U-S analysis requires a neutral source; net charge is ${netCharge}.`,
    );
  }
  if (protocol.claimWindow.start < dataset.window.coverageStart ||
      protocol.claimWindow.end > dataset.window.coverageEnd) {
    throw new RangeError(
      "protocol claim window exceeds the evolved record's common retained coverage.",
    );
  }
  if (protocol.minimumAllowedEmissionTime < dataset.window.coverageStart) {
    throw new RangeError(
      "protocol minimum allowed emission time precedes common retained coverage.",
    );
  }
  const analysisCoverage = Object.freeze({
    start: protocol.minimumAllowedEmissionTime,
    end: Math.min(
      dataset.window.coverageEnd,
      protocol.claimWindow.end + protocol.radii.at(-1),
    ),
  });
  const bounds = certifiedHistoryBounds(
    dataset.worldlines,
    protocol.probeCenter,
    analysisCoverage.start,
    analysisCoverage.end,
  );
  if (!(bounds.speed < protocol.fieldSpeed)) {
    throw new RangeError(
      `retained-history speed bound ${bounds.speed} reaches field speed; ` +
      "the current instrument admits only the accepted simple-root domain.",
    );
  }
  if (!(protocol.radii[0] > bounds.envelope)) {
    throw new RangeError(
      `smallest enclosing radius ${protocol.radii[0]} does not exceed the ` +
      `certified retained-history envelope ${bounds.envelope}.`,
    );
  }
  return { dataset, netCharge, absoluteCharge, bounds, analysisCoverage };
}

function rootResidualFinite({
  worldline,
  emissionTime,
  observationTime,
  probePosition,
}) {
  const state = evaluateEvolvedWorldlineState(worldline, emissionTime);
  const displacement = subtract(probePosition, state.position);
  return {
    emissionTime,
    state,
    displacement,
    distance: norm(displacement),
    residual: norm(displacement) - (observationTime - emissionTime),
  };
}

function rootResidualFar({
  worldline,
  emissionTime,
  baseTime,
  direction,
  probeCenter,
}) {
  const state = evaluateEvolvedWorldlineState(worldline, emissionTime);
  return {
    emissionTime,
    state,
    residual:
      emissionTime - baseTime -
      dot(direction, subtract(state.position, probeCenter)),
  };
}

function bisectUniqueRoot({
  worldline,
  low,
  high,
  residualAt,
  tolerance,
  maxIterations,
  minimumAllowedEmissionTime,
}) {
  let lowRow = residualAt(low);
  let highRow = residualAt(high);
  if (Math.abs(lowRow.residual) <= tolerance) highRow = lowRow;
  else if (Math.abs(highRow.residual) <= tolerance) lowRow = highRow;
  else if (!(lowRow.residual < 0 && highRow.residual > 0)) {
    if (lowRow.residual > 0 &&
        Math.abs(low - minimumAllowedEmissionTime) <= tolerance) {
      throw new RangeError(
        `causal root for ${worldline.id} precedes the qualified emission ` +
        `boundary ${minimumAllowedEmissionTime}.`,
      );
    }
    throw new RangeError(
      `causal root for ${worldline.id} is not bracketed by retained history; ` +
      `endpoint residuals are ${lowRow.residual}, ${highRow.residual}.`,
    );
  }
  let best = Math.abs(lowRow.residual) <= Math.abs(highRow.residual)
    ? lowRow
    : highRow;
  let lowTime = low;
  let highTime = high;
  for (let iteration = 0;
    iteration < maxIterations && Math.abs(best.residual) > tolerance;
    iteration += 1) {
    const middle = (lowTime + highTime) / 2;
    const row = residualAt(middle);
    if (Math.abs(row.residual) < Math.abs(best.residual)) best = row;
    if (row.residual <= 0) lowTime = middle;
    else highTime = middle;
  }
  if (Math.abs(best.residual) > tolerance) {
    throw new Error(
      `causal root for ${worldline.id} did not converge; residual=${best.residual}.`,
    );
  }
  if (best.emissionTime < minimumAllowedEmissionTime - tolerance) {
    throw new RangeError(
      `causal root for ${worldline.id} at ${best.emissionTime} precedes the ` +
      `qualified emission boundary ${minimumAllowedEmissionTime}.`,
    );
  }
  return best;
}

function solveFiniteRoot(worldline, {
  baseTime,
  radius,
  direction,
  probeCenter,
  coverage,
  protocol,
}) {
  const observationTime = baseTime + radius;
  const probePosition = add(probeCenter, scale(direction, radius));
  const high = Math.min(observationTime, coverage.end);
  return bisectUniqueRoot({
    worldline,
    low: coverage.start,
    high,
    residualAt: (emissionTime) => rootResidualFinite({
      worldline,
      emissionTime,
      observationTime,
      probePosition,
    }),
    tolerance: protocol.rootTolerance,
    maxIterations: protocol.maxRootIterations,
    minimumAllowedEmissionTime: protocol.minimumAllowedEmissionTime,
  });
}

function solveFarRoot(worldline, {
  baseTime,
  direction,
  probeCenter,
  coverage,
  protocol,
}) {
  return bisectUniqueRoot({
    worldline,
    low: coverage.start,
    high: coverage.end,
    residualAt: (emissionTime) => rootResidualFar({
      worldline,
      emissionTime,
      baseTime,
      direction,
      probeCenter,
    }),
    tolerance: protocol.rootTolerance,
    maxIterations: protocol.maxRootIterations,
    minimumAllowedEmissionTime: protocol.minimumAllowedEmissionTime,
  });
}

function momentAccumulator() {
  return { first: { x: 0, y: 0, z: 0 }, second: zeroMatrix() };
}

function addAngularSample(accumulator, direction, weight, value) {
  accumulator.first = add(accumulator.first, scale(direction, weight * value));
  addOuter(accumulator.second, direction, direction, weight * value);
}

function angularPowers(accumulator) {
  const stf = symmetricTraceFree(accumulator.second);
  return {
    l1: 3 / FOUR_PI * dot(accumulator.first, accumulator.first),
    l2: 15 / (2 * FOUR_PI) * matrixNormSquared(stf),
  };
}

export function computeSameRowUsMoments(worldlines, baseTime, probeCenter) {
  let velocityMoment = { x: 0, y: 0, z: 0 };
  const symmetricMoment = zeroMatrix();
  for (const worldline of worldlines) {
    const state = evaluateEvolvedWorldlineState(worldline, baseTime);
    const relativePosition = subtract(state.position, probeCenter);
    velocityMoment = add(
      velocityMoment,
      scale(state.velocity, worldline.charge),
    );
    addOuter(
      symmetricMoment,
      relativePosition,
      state.acceleration,
      worldline.charge / 2,
    );
    addOuter(
      symmetricMoment,
      state.acceleration,
      relativePosition,
      worldline.charge / 2,
    );
  }
  const positionAccelerationMoment = symmetricTraceFree(symmetricMoment);
  const uNormSquared = dot(velocityMoment, velocityMoment);
  const sNormSquared = matrixNormSquared(positionAccelerationMoment);
  return {
    U: velocityMoment,
    S: positionAccelerationMoment,
    uNormSquared,
    sNormSquared,
    approximationPowers: {
      l1: FOUR_PI / 3 * uNormSquared,
      l2: 2 * FOUR_PI / 15 * sNormSquared,
    },
    predictedRatio: uNormSquared === 0
      ? null
      : 2 / 5 * sNormSquared / uNormSquared,
  };
}

function evaluateAngularRow({
  worldlines,
  baseTime,
  radius,
  probeCenter,
  coverage,
  protocol,
  quadrature,
}) {
  const finiteAccumulator = momentAccumulator();
  const farAccumulator = momentAccumulator();
  const rootLedger = [];
  let minimumFiniteEmissionTime = Number.POSITIVE_INFINITY;
  let minimumFarEmissionTime = Number.POSITIVE_INFINITY;
  let maximumRootResidual = 0;
  for (const node of quadrature) {
    let finitePattern = 0;
    let farPattern = 0;
    for (const worldline of worldlines) {
      const finiteRoot = solveFiniteRoot(worldline, {
        baseTime,
        radius,
        direction: node.unitVector,
        probeCenter,
        coverage,
        protocol,
      });
      const finiteDirection = scale(
        finiteRoot.displacement,
        1 / finiteRoot.distance,
      );
      const finiteDenominator =
        1 - dot(finiteDirection, finiteRoot.state.velocity);
      if (!(finiteDenominator > 0)) {
        throw new RangeError(
          `finite transmitter factor for ${worldline.id} is nonpositive.`,
        );
      }
      finitePattern +=
        worldline.charge *
        (radius / finiteRoot.distance) ** 2 *
        dot(node.unitVector, finiteDirection) /
        finiteDenominator;
      minimumFiniteEmissionTime = Math.min(
        minimumFiniteEmissionTime,
        finiteRoot.emissionTime,
      );
      maximumRootResidual = Math.max(
        maximumRootResidual,
        Math.abs(finiteRoot.residual),
      );

      const farRoot = solveFarRoot(worldline, {
        baseTime,
        direction: node.unitVector,
        probeCenter,
        coverage,
        protocol,
      });
      const farDenominator = 1 - dot(node.unitVector, farRoot.state.velocity);
      if (!(farDenominator > 0)) {
        throw new RangeError(
          `far transmitter factor for ${worldline.id} is nonpositive.`,
        );
      }
      farPattern += worldline.charge / farDenominator;
      minimumFarEmissionTime = Math.min(
        minimumFarEmissionTime,
        farRoot.emissionTime,
      );
      maximumRootResidual = Math.max(
        maximumRootResidual,
        Math.abs(farRoot.residual),
      );
      if (protocol.retainRootLedger) {
        rootLedger.push({
          directionId: node.id,
          worldlineId: worldline.id,
          finite: {
            emissionTime: finiteRoot.emissionTime,
            residual: finiteRoot.residual,
            distance: finiteRoot.distance,
            transmitterFactorDenominator: finiteDenominator,
          },
          far: {
            emissionTime: farRoot.emissionTime,
            residual: farRoot.residual,
            transmitterFactorDenominator: farDenominator,
          },
        });
      }
    }
    addAngularSample(
      finiteAccumulator,
      node.unitVector,
      node.solidAngleWeight,
      finitePattern,
    );
    addAngularSample(
      farAccumulator,
      node.unitVector,
      node.solidAngleWeight,
      farPattern,
    );
  }
  return {
    finite: angularPowers(finiteAccumulator),
    far: angularPowers(farAccumulator),
    rootAudit: {
      minimumFiniteEmissionTime,
      minimumFarEmissionTime,
      maximumAbsoluteResidual: maximumRootResidual,
    },
    rootLedger,
  };
}

function powerRatio(powers, minimumPower) {
  return powers.l1 > minimumPower && powers.l2 >= 0
    ? powers.l2 / powers.l1
    : null;
}

function relativeDifference(left, right, minimumPower) {
  if (left == null || right == null) return null;
  return Math.abs(left - right) / Math.max(Math.abs(right), minimumPower);
}

function statistics(values) {
  if (values.length === 0) return null;
  const sorted = [...values].sort((left, right) => left - right);
  return {
    count: sorted.length,
    minimum: sorted[0],
    median: sorted.length % 2 === 1
      ? sorted[(sorted.length - 1) / 2]
      : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2,
    maximum: sorted.at(-1),
    mean: sorted.reduce((sum, value) => sum + value, 0) / sorted.length,
  };
}

function logFit(rows, exactKey) {
  const usable = rows.filter((row) =>
    row.moments.predictedRatio > 0 && row[exactKey] > 0);
  if (usable.length < 2) return null;
  const x = usable.map((row) => Math.log(row.moments.predictedRatio));
  const y = usable.map((row) => Math.log(row[exactKey]));
  const xMean = x.reduce((sum, value) => sum + value, 0) / x.length;
  const yMean = y.reduce((sum, value) => sum + value, 0) / y.length;
  let covariance = 0;
  let xVariance = 0;
  let yVariance = 0;
  for (let index = 0; index < x.length; index += 1) {
    covariance += (x[index] - xMean) * (y[index] - yMean);
    xVariance += (x[index] - xMean) ** 2;
    yVariance += (y[index] - yMean) ** 2;
  }
  if (!(xVariance > 0) || !(yVariance > 0)) return null;
  const slope = covariance / xVariance;
  return {
    count: usable.length,
    logPearson: covariance / Math.sqrt(xVariance * yVariance),
    slope,
    exactToPredictorFactor: Math.exp(yMean - slope * xMean),
  };
}

export function summarizeEvolvedUsRows(rows, minimumPower = 1e-30) {
  const normalizedMinimumPower = positive(minimumPower, "minimum power");
  const usableFinite = rows.filter((row) =>
    row.finiteRatio != null && row.moments?.predictedRatio != null);
  const usableFar = rows.filter((row) =>
    row.farRatio != null && row.moments?.predictedRatio != null);
  return {
    rowRadiusCount: rows.length,
    usableFiniteCount: usableFinite.length,
    usableFarCount: usableFar.length,
    finite: {
      logFit: logFit(rows, "finiteRatio"),
      relativeError: statistics(usableFinite.map((row) =>
        Math.abs(row.finiteRatio - row.moments.predictedRatio) /
        Math.max(Math.abs(row.finiteRatio), normalizedMinimumPower))),
    },
    far: {
      logFit: logFit(rows, "farRatio"),
      relativeError: statistics(usableFar.map((row) =>
        Math.abs(row.farRatio - row.moments.predictedRatio) /
        Math.max(Math.abs(row.farRatio), normalizedMinimumPower))),
    },
  };
}

export function evaluateEvolvedNeutralTwelveWorldlineUsRelationship({ record, protocol: rawProtocol }) {
  const protocol = validateEvolvedNeutralTwelveWorldlineUsProtocol(rawProtocol);
  const { dataset, netCharge, absoluteCharge, bounds, analysisCoverage } =
    validateRecord(record, protocol);
  const quadratures = {
    primary: createSphericalProductQuadrature(protocol.quadrature.primary),
    refined: createSphericalProductQuadrature(protocol.quadrature.refined),
  };
  const baseTimes = Array.from(
    { length: protocol.rowCount },
    (_, index) =>
      protocol.claimWindow.start +
      (index + 0.5) *
      (protocol.claimWindow.end - protocol.claimWindow.start) /
      protocol.rowCount,
  );
  const rows = [];
  for (const baseTime of baseTimes) {
    const moments = computeSameRowUsMoments(
      dataset.worldlines,
      baseTime,
      protocol.probeCenter,
    );
    for (const radius of protocol.radii) {
      const primary = evaluateAngularRow({
        worldlines: dataset.worldlines,
        baseTime,
        radius,
        probeCenter: protocol.probeCenter,
        coverage: analysisCoverage,
        protocol,
        quadrature: quadratures.primary,
      });
      const refined = evaluateAngularRow({
        worldlines: dataset.worldlines,
        baseTime,
        radius,
        probeCenter: protocol.probeCenter,
        coverage: analysisCoverage,
        protocol,
        quadrature: quadratures.refined,
      });
      const primaryFiniteRatio = powerRatio(primary.finite, protocol.minimumPower);
      const refinedFiniteRatio = powerRatio(refined.finite, protocol.minimumPower);
      const primaryFarRatio = powerRatio(primary.far, protocol.minimumPower);
      const refinedFarRatio = powerRatio(refined.far, protocol.minimumPower);
      rows.push({
        baseTime,
        radius,
        moments,
        primary: {
          ...primary,
          finiteRatio: primaryFiniteRatio,
          farRatio: primaryFarRatio,
        },
        refined: {
          ...refined,
          finiteRatio: refinedFiniteRatio,
          farRatio: refinedFarRatio,
        },
        finiteRatio: refinedFiniteRatio,
        farRatio: refinedFarRatio,
        quadratureRelativeDifference: {
          finiteRatio: relativeDifference(
            primaryFiniteRatio,
            refinedFiniteRatio,
            protocol.minimumPower,
          ),
          farRatio: relativeDifference(
            primaryFarRatio,
            refinedFarRatio,
            protocol.minimumPower,
          ),
        },
      });
    }
  }
  const relationshipSummary = summarizeEvolvedUsRows(rows, protocol.minimumPower);
  return {
    schema: EVOLVED_NEUTRAL_TWELVE_WORLDLINE_US_RESULT_SCHEMA,
    protocol: {
      protocolId: protocol.protocolId,
      configurationKind: protocol.configurationKind,
      configurationId: protocol.configurationId,
      fieldSpeed: 1,
      claimWindow: protocol.claimWindow,
      minimumAllowedEmissionTime: protocol.minimumAllowedEmissionTime,
      rowCount: protocol.rowCount,
      probeCenter: protocol.probeCenter,
      radii: protocol.radii,
      quadrature: protocol.quadrature,
      retainRootLedger: protocol.retainRootLedger,
    },
    source: {
      schema: record.schema,
      runId: dataset.provenance.runId,
      engineId: dataset.provenance.engineId,
      engineVersion: dataset.provenance.engineVersion,
      claimGrade: dataset.provenance.claimGrade,
      evidenceStatus: dataset.provenance.evidenceStatus,
      generatingSpec: dataset.provenance.generatingSpec,
      worldlineCount: dataset.worldlines.length,
      netCharge,
      absoluteCharge,
      certifiedRetainedEnvelope: bounds.envelope,
      certifiedRetainedSpeedBound: bounds.speed,
      certifiedAnalysisCoverage: analysisCoverage,
    },
    claimGrade: "measured",
    instrument:
      "src/eom-analysis/EvolvedNeutralTwelveWorldlineUsRelationship.mjs",
    rows,
    summary: {
      ...relationshipSummary,
      quadratureMaximumRelativeDifference: {
        finiteRatio: Math.max(
          0,
          ...rows.map((row) =>
            row.quadratureRelativeDifference.finiteRatio ?? 0),
        ),
        farRatio: Math.max(
          0,
          ...rows.map((row) =>
            row.quadratureRelativeDifference.farRatio ?? 0),
        ),
      },
      minimumEmissionTime: Math.min(
        ...rows.flatMap((row) => [
          row.refined.rootAudit.minimumFiniteEmissionTime,
          row.refined.rootAudit.minimumFarEmissionTime,
        ]),
      ),
      maximumAbsoluteRootResidual: Math.max(
        ...rows.flatMap((row) => [
          row.primary.rootAudit.maximumAbsoluteResidual,
          row.refined.rootAudit.maximumAbsoluteResidual,
        ]),
      ),
    },
    claimBoundary:
      "This instrument measures one direct EOM evolved record. A neutral twelve-worldline " +
      "survival claim additionally requires campaign-authored prehistory-collapse, " +
      "post-seed root-clearance, refinement-envelope, and independent-oracle " +
      "evidence binding every compared record to the same qualified claim window.",
    falsifier:
      "Reject the row if any causal root precedes the qualified emission boundary, " +
      "if quadrature refinement does not converge, or if an independently " +
      "implemented piecewise-cubic/root/harmonic evaluator disagrees beyond the " +
      "declared numerical tolerances.",
  };
}
