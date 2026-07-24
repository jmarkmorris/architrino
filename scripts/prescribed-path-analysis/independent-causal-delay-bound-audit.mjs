#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  createPrescribedBraidExactSourceRecord,
  validatePrescribedBraidSpec,
} from "../eom/generate-prescribed-braid-record.mjs";

const INSTRUMENT_PATH = fileURLToPath(import.meta.url);
const WORKSPACE = path.resolve(path.dirname(INSTRUMENT_PATH), "../..");
const BASE =
  `${WORKSPACE}/.local-data/braid-analysis/compact-monte-carlo/family-sweep-v1`;
const STUDY_PATH = `${BASE}/all-active-angular-mode-study-v1.json`;
const DATABASE_PATH = `${BASE}/compact-campaigns.sqlite3`;
const OUTPUT_PATH = `${BASE}/independent-causal-delay-bound-audit-v1.json`;
const EXPECTED_STUDY_RESULT_HASH =
  "4c938796df305197c707e633d6d591c3840ef137d037c989f76efefa0c92db65";
const RADIUS = 3;
const OBSERVATION_START = 4;
const OBSERVATION_PERIOD = 4;
const TIME_SAMPLES = 24;
const POLAR_ORDER = 12;
const AZIMUTH_COUNT = 24;
const ROOT_ITERATIONS = 80;

function sha256Bytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

function canonical(value) {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.keys(value).sort().map((key) => [key, canonical(value[key])]),
    );
  }
  return value;
}

function sha256Canonical(value) {
  return sha256Bytes(JSON.stringify(canonical(value)));
}

function add(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function subtract(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function scale(a, factor) {
  return { x: factor * a.x, y: factor * a.y, z: factor * a.z };
}

function dot(a, b) {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function stateAt(trajectory, time) {
  const dt = time - trajectory.epochTime;
  const omega =
    trajectory.angularVelocity + trajectory.angularAcceleration * dt;
  const phase =
    trajectory.phaseAtEpoch +
    trajectory.angularVelocity * dt +
    0.5 * trajectory.angularAcceleration * dt * dt;
  const cosine = Math.cos(phase);
  const sine = Math.sin(phase);
  const center = add(
    trajectory.centerAtEpoch,
    scale(trajectory.centerVelocity, dt),
  );
  const radial = add(
    scale(trajectory.radiusU, cosine),
    scale(trajectory.radiusV, sine),
  );
  const tangent = add(
    scale(trajectory.radiusU, -sine),
    scale(trajectory.radiusV, cosine),
  );
  const acceleration = add(
    scale(tangent, trajectory.angularAcceleration),
    scale(radial, -omega * omega),
  );
  return {
    position: add(center, radial),
    velocity: add(trajectory.centerVelocity, scale(tangent, omega)),
    acceleration,
  };
}

function bisection(low, high, residual) {
  let fLow = residual(low);
  let fHigh = residual(high);
  if (fLow > 1e-11 || fHigh < -1e-11) {
    throw new Error(`root bracket failed: ${fLow}, ${fHigh}`);
  }
  for (let index = 0; index < ROOT_ITERATIONS; index += 1) {
    const middle = (low + high) / 2;
    const fMiddle = residual(middle);
    if (fMiddle <= 0) {
      low = middle;
      fLow = fMiddle;
    } else {
      high = middle;
      fHigh = fMiddle;
    }
  }
  return Math.abs(fLow) <= Math.abs(fHigh) ? low : high;
}

function finiteRoot(source, direction, observationTime, envelope) {
  const t0 = observationTime - RADIUS;
  return bisection(-envelope, envelope, (delta) => {
    const x = stateAt(source.trajectory, t0 + delta).position;
    return norm(subtract(scale(direction, RADIUS), x)) -
      (RADIUS - delta);
  });
}

function farRoot(source, direction, observationTime, envelope) {
  const t0 = observationTime - RADIUS;
  return bisection(-envelope, envelope, (delta) => {
    const x = stateAt(source.trajectory, t0 + delta).position;
    return delta - dot(direction, x);
  });
}

function normalizedDirection(x, y, z) {
  const magnitude = Math.hypot(x, y, z);
  return { x: x / magnitude, y: y / magnitude, z: z / magnitude };
}

function gaussLegendre(order) {
  const nodes = Array(order);
  const weights = Array(order);
  const half = Math.ceil(order / 2);
  for (let index = 0; index < half; index += 1) {
    let x = Math.cos(Math.PI * (index + 0.75) / (order + 0.5));
    let derivative = 0;
    for (let iteration = 0; iteration < 30; iteration += 1) {
      let previous = 1;
      let current = x;
      for (let degree = 2; degree <= order; degree += 1) {
        const next =
          ((2 * degree - 1) * x * current -
            (degree - 1) * previous) / degree;
        previous = current;
        current = next;
      }
      derivative = order * (x * current - previous) / (x * x - 1);
      const nextX = x - current / derivative;
      if (Math.abs(nextX - x) < 1e-15) {
        x = nextX;
        break;
      }
      x = nextX;
    }
    const weight = 2 / ((1 - x * x) * derivative * derivative);
    nodes[index] = -x;
    nodes[order - 1 - index] = x;
    weights[index] = weight;
    weights[order - 1 - index] = weight;
  }
  return { nodes, weights };
}

function verificationDirections() {
  const polar = gaussLegendre(POLAR_ORDER);
  const rows = [];
  for (let polarIndex = 0; polarIndex < POLAR_ORDER; polarIndex += 1) {
    const z = polar.nodes[polarIndex];
    const radius = Math.sqrt(Math.max(0, 1 - z * z));
    for (let azimuthIndex = 0; azimuthIndex < AZIMUTH_COUNT; azimuthIndex += 1) {
      const phi = 2 * Math.PI * azimuthIndex / AZIMUTH_COUNT;
      rows.push({
        unitVector: normalizedDirection(
          radius * Math.cos(phi),
          radius * Math.sin(phi),
          z,
        ),
        solidAngleWeight:
          polar.weights[polarIndex] * 2 * Math.PI / AZIMUTH_COUNT,
      });
    }
  }
  return rows;
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
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      matrix[i][j] += factor * a[i] * b[j];
    }
  }
}

function stfNormSquared(matrix) {
  const trace = matrix[0][0] + matrix[1][1] + matrix[2][2];
  let sum = 0;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const value = matrix[i][j] - (i === j ? trace / 3 : 0);
      sum += value * value;
    }
  }
  return sum;
}

function modeAccumulator() {
  return { first: { x: 0, y: 0, z: 0 }, second: zeroMatrix() };
}

function addModeSample(accumulator, direction, weight, value) {
  accumulator.first = add(
    accumulator.first,
    scale(direction, weight * value),
  );
  addOuter(
    accumulator.second,
    direction,
    direction,
    weight * value,
  );
}

function modePowers(accumulator) {
  return {
    l1: 3 / (4 * Math.PI) * dot(accumulator.first, accumulator.first),
    l2: 15 / (8 * Math.PI) * stfNormSquared(accumulator.second),
  };
}

function approximationAnalyticPowers(record, observationTime) {
  const t0 = observationTime - RADIUS;
  let velocityMoment = { x: 0, y: 0, z: 0 };
  const positionAccelerationMoment = zeroMatrix();
  for (const source of record.sources) {
    const state = stateAt(source.trajectory, t0);
    velocityMoment = add(
      velocityMoment,
      scale(state.velocity, source.charge),
    );
    addOuter(
      positionAccelerationMoment,
      state.position,
      state.acceleration,
      source.charge / 2,
    );
    addOuter(
      positionAccelerationMoment,
      state.acceleration,
      state.position,
      source.charge / 2,
    );
  }
  return {
    l1: 4 * Math.PI / 3 * dot(velocityMoment, velocityMoment),
    l2:
      8 * Math.PI / 15 *
      stfNormSquared(positionAccelerationMoment),
  };
}

function sourceBounds(record) {
  let envelope = 0;
  let speed = 0;
  let acceleration = 0;
  let jerk = 0;
  let absoluteCharge = 0;
  for (const source of record.sources) {
    const trajectory = source.trajectory;
    if (trajectory.angularAcceleration !== 0) {
      throw new Error("audit v1 supports the active constant-angular-rate records only");
    }
    const orbitRadius = norm(trajectory.radiusU);
    const centerAtStart = add(
      trajectory.centerAtEpoch,
      scale(
        trajectory.centerVelocity,
        record.history.start - trajectory.epochTime,
      ),
    );
    const centerAtEnd = add(
      trajectory.centerAtEpoch,
      scale(
        trajectory.centerVelocity,
        record.history.end - trajectory.epochTime,
      ),
    );
    envelope = Math.max(
      envelope,
      norm(centerAtStart) + orbitRadius,
      norm(centerAtEnd) + orbitRadius,
    );
    const angularRate = Math.abs(trajectory.angularVelocity);
    speed = Math.max(
      speed,
      norm(trajectory.centerVelocity) + angularRate * orbitRadius,
    );
    acceleration = Math.max(
      acceleration,
      angularRate * angularRate * orbitRadius,
    );
    jerk = Math.max(jerk, angularRate ** 3 * orbitRadius);
    absoluteCharge += Math.abs(source.charge);
  }
  return { envelope, speed, acceleration, jerk, absoluteCharge };
}

function theoremBounds(bounds) {
  const { envelope: a, speed: nu, acceleration: accel, jerk, absoluteCharge: q } =
    bounds;
  if (!(a < RADIUS)) throw new Error(`envelope ${a} reaches radius ${RADIUS}`);
  if (!(nu < 1)) throw new Error(`speed ${nu} reaches field speed`);
  const rootDifference =
    a * a / (2 * (RADIUS - a) * (1 - nu));
  const directionDifference = 2 * a / (RADIUS - a);
  const radialScale = (RADIUS / (RADIUS - a)) ** 2;
  const geometryDifference =
    radialScale - 1 + radialScale * directionDifference;
  const farPerAbsoluteCharge =
    geometryDifference / (1 - nu) +
    (accel * rootDifference + nu * directionDifference) /
      (1 - nu) ** 2;
  const dynamicPerAbsoluteCharge =
    nu * nu / (1 - nu) +
    accel * nu * a +
    0.5 * jerk * a * a;
  return {
    rootDifference,
    directionDifference,
    geometryDifference,
    farPerAbsoluteCharge,
    dynamicPerAbsoluteCharge,
    far: q * farPerAbsoluteCharge,
    dynamic: q * dynamicPerAbsoluteCharge,
    total: q * (farPerAbsoluteCharge + dynamicPerAbsoluteCharge),
  };
}

function evaluateDirection(record, direction, observationTime, bounds) {
  const t0 = observationTime - RADIUS;
  let finite = 0;
  let far = 0;
  let approximation = 0;
  let maximumFiniteFarRootDifference = 0;
  for (const source of record.sources) {
    const deltaFinite = finiteRoot(
      source,
      direction,
      observationTime,
      bounds.envelope,
    );
    const deltaFar = farRoot(
      source,
      direction,
      observationTime,
      bounds.envelope,
    );
    maximumFiniteFarRootDifference = Math.max(
      maximumFiniteFarRootDifference,
      Math.abs(deltaFinite - deltaFar),
    );
    const finiteState = stateAt(source.trajectory, t0 + deltaFinite);
    const displacement = subtract(
      scale(direction, RADIUS),
      finiteState.position,
    );
    const distance = norm(displacement);
    const sourceDirection = scale(displacement, 1 / distance);
    const finiteWeight =
      1 / (1 - dot(finiteState.velocity, sourceDirection));
    const finiteGeometry =
      (RADIUS / distance) ** 2 * dot(direction, sourceDirection);
    finite += source.charge * finiteGeometry * finiteWeight;

    const farState = stateAt(source.trajectory, t0 + deltaFar);
    far += source.charge /
      (1 - dot(direction, farState.velocity));

    const baseState = stateAt(source.trajectory, t0);
    const projectedPosition = dot(direction, baseState.position);
    const projectedVelocity = dot(direction, baseState.velocity);
    const projectedAcceleration = dot(direction, baseState.acceleration);
    approximation += source.charge * (
      1 +
      projectedVelocity +
      projectedPosition * projectedAcceleration
    );
  }
  return {
    finite,
    far,
    approximation,
    finiteFarError: Math.abs(finite - far),
    dynamicError: Math.abs(far - approximation),
    totalError: Math.abs(finite - approximation),
    maximumFiniteFarRootDifference,
  };
}

function stats(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const median = sorted.length % 2 === 1
    ? sorted[(sorted.length - 1) / 2]
    : (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2;
  return {
    count: values.length,
    minimum: sorted[0],
    median,
    maximum: sorted[sorted.length - 1],
    mean,
  };
}

function pearson(left, right) {
  const leftMean =
    left.reduce((sum, value) => sum + value, 0) / left.length;
  const rightMean =
    right.reduce((sum, value) => sum + value, 0) / right.length;
  let numerator = 0;
  let leftSquared = 0;
  let rightSquared = 0;
  for (let index = 0; index < left.length; index += 1) {
    const a = left[index] - leftMean;
    const b = right[index] - rightMean;
    numerator += a * b;
    leftSquared += a * a;
    rightSquared += b * b;
  }
  return numerator / Math.sqrt(leftSquared * rightSquared);
}

function relationSummary(rows) {
  const exact = rows.map((row) => row.degreePowers.ratios.finite);
  const approximation = rows.map(
    (row) => row.degreePowers.ratios.approximationAnalytic,
  );
  const logApproximation = approximation.map(Math.log);
  const logExact = exact.map(Math.log);
  const xMean =
    logApproximation.reduce((sum, value) => sum + value, 0) /
    logApproximation.length;
  const yMean =
    logExact.reduce((sum, value) => sum + value, 0) / logExact.length;
  const slope = logApproximation.reduce(
    (sum, value, index) =>
      sum + (value - xMean) * (logExact[index] - yMean),
    0,
  ) / logApproximation.reduce(
    (sum, value) => sum + (value - xMean) ** 2,
    0,
  );
  const intercept = yMean - slope * xMean;
  return {
    exactRatio: stats(exact),
    approximationRatio: stats(approximation),
    logPearson: pearson(logApproximation, logExact),
    fit: {
      slope,
      exactToApproximationFactor: Math.exp(intercept),
      effectiveMomentFactor: 0.4 * Math.exp(intercept),
    },
    relativeError: stats(
      rows.map(
        (row) =>
          Math.abs(
            row.degreePowers.ratios.finite -
            row.degreePowers.ratios.approximationAnalytic,
          ) /
          Math.max(Math.abs(row.degreePowers.ratios.finite), 1e-30),
      ),
    ),
  };
}

function analyticChecks() {
  const samples = [-0.8, -0.5, -0.1, 0.1, 0.5, 0.8].map((z) => {
    const exactRemainder = Math.abs(1 / (1 - z) - (1 + z));
    const bound = z * z / (1 - Math.abs(z));
    return { z, exactRemainder, bound, pass: exactRemainder <= bound + 1e-15 };
  });
  const saturationZ = 0.8;
  const saturationExact =
    1 / (1 - saturationZ) - (1 + saturationZ);
  const saturationBound =
    saturationZ * saturationZ / (1 - saturationZ);
  return {
    constantVelocityJacobianRemainder: {
      identity: "1/(1-z) - (1+z) = z^2/(1-z)",
      samples,
      positiveSpeedBoundSaturated:
        Math.abs(saturationExact - saturationBound) <= 1e-14,
    },
    sphereMoments: {
      second:
        "integral n_i n_j dOmega = (4 pi / 3) delta_ij",
      fourth:
        "integral n_i n_j n_k n_l dOmega = (4 pi / 15)(delta_ij delta_kl + delta_ik delta_jl + delta_il delta_jk)",
      consequence:
        "P2/P1 = (2/5)<||STF sum q sym(x tensor a)||_F^2>/<||sum q v||^2>",
    },
  };
}

function run() {
  const startedAt = performance.now();
  const study = JSON.parse(readFileSync(STUDY_PATH, "utf8"));
  if (study.resultHash !== EXPECTED_STUDY_RESULT_HASH) {
    throw new Error("primary angular study hash differs from the declared input");
  }
  const activeFamilyC = study.cases.filter(
    (row) => row.familyId === "C" && row.baselineEvaluationStatus.evaluated,
  );
  const rerunBySource = new Map();
  const database = new DatabaseSync(DATABASE_PATH, { readOnly: true });
  for (const raw of database.prepare("select row_json from compact_case").all()) {
    const row = JSON.parse(raw.row_json);
    const rerun = row.exactRerunInstruction;
    if (rerun) rerunBySource.set(rerun.exactSourceHash, rerun);
  }
  database.close();
  const directions = verificationDirections();
  const times = Array.from(
    { length: TIME_SAMPLES },
    (_, index) =>
      OBSERVATION_START + OBSERVATION_PERIOD * index / TIME_SAMPLES,
  );
  const rows = [];
  for (let caseIndex = 0; caseIndex < activeFamilyC.length; caseIndex += 1) {
    const primary = activeFamilyC[caseIndex];
    const rerun = rerunBySource.get(primary.exactSourceHash);
    if (!rerun) throw new Error(`missing rerun for ${primary.exactSourceHash}`);
    const spec = validatePrescribedBraidSpec(rerun.sampledSpec);
    if (sha256Canonical(spec) !== rerun.sampledSpecHash) {
      throw new Error(`${primary.exactSourceHash} sampled specification hash differs`);
    }
    const record = createPrescribedBraidExactSourceRecord(spec, {
      sourceHash: rerun.sampledSpecHash,
      generatingSpec: "independent-bound-audit",
    });
    const bounds = sourceBounds(record);
    const theorem = theoremBounds(bounds);
    let maximumFiniteFarError = 0;
    let maximumDynamicError = 0;
    let maximumTotalError = 0;
    let maximumFiniteFarRootDifference = 0;
    let squaredApproximationSum = 0;
    let squaredDynamicErrorSum = 0;
    let sampleCount = 0;
    const degreePowers = {
      finite: { l1: 0, l2: 0 },
      far: { l1: 0, l2: 0 },
      approximation: { l1: 0, l2: 0 },
      approximationAnalytic: { l1: 0, l2: 0 },
    };
    for (const observationTime of times) {
      const accumulators = {
        finite: modeAccumulator(),
        far: modeAccumulator(),
        approximation: modeAccumulator(),
      };
      for (const directionRow of directions) {
        const direction = directionRow.unitVector;
        const value = evaluateDirection(
          record,
          direction,
          observationTime,
          bounds,
        );
        maximumFiniteFarError = Math.max(
          maximumFiniteFarError,
          value.finiteFarError,
        );
        maximumDynamicError = Math.max(
          maximumDynamicError,
          value.dynamicError,
        );
        maximumTotalError = Math.max(
          maximumTotalError,
          value.totalError,
        );
        maximumFiniteFarRootDifference = Math.max(
          maximumFiniteFarRootDifference,
          value.maximumFiniteFarRootDifference,
        );
        squaredApproximationSum += value.approximation ** 2;
        squaredDynamicErrorSum += value.dynamicError ** 2;
        addModeSample(
          accumulators.finite,
          direction,
          directionRow.solidAngleWeight,
          value.finite,
        );
        addModeSample(
          accumulators.far,
          direction,
          directionRow.solidAngleWeight,
          value.far,
        );
        addModeSample(
          accumulators.approximation,
          direction,
          directionRow.solidAngleWeight,
          value.approximation,
        );
        sampleCount += 1;
      }
      for (const key of ["finite", "far", "approximation"]) {
        const power = modePowers(accumulators[key]);
        degreePowers[key].l1 += power.l1 / times.length;
        degreePowers[key].l2 += power.l2 / times.length;
      }
      const analyticPower = approximationAnalyticPowers(
        record,
        observationTime,
      );
      degreePowers.approximationAnalytic.l1 +=
        analyticPower.l1 / times.length;
      degreePowers.approximationAnalytic.l2 +=
        analyticPower.l2 / times.length;
    }
    rows.push({
      familyId: primary.familyId,
      memberId: primary.memberId,
      caseId: primary.caseId,
      sampleOrdinal: primary.sampleOrdinal,
      exactSourceHash: primary.exactSourceHash,
      bounds,
      theorem,
      sampledAudit: {
        sampleCount,
        maximumFiniteFarRootDifference,
        maximumFiniteFarError,
        maximumDynamicError,
        maximumTotalError,
        dynamicErrorRms: Math.sqrt(squaredDynamicErrorSum / sampleCount),
        approximationRms: Math.sqrt(squaredApproximationSum / sampleCount),
        dynamicErrorToApproximationRms:
          Math.sqrt(squaredDynamicErrorSum / sampleCount) /
          Math.max(Math.sqrt(squaredApproximationSum / sampleCount), 1e-30),
        farBoundPass: maximumFiniteFarError <= theorem.far + 1e-10,
        dynamicBoundPass: maximumDynamicError <= theorem.dynamic + 1e-10,
        totalBoundPass: maximumTotalError <= theorem.total + 1e-10,
        rootBoundPass:
          maximumFiniteFarRootDifference <=
            theorem.rootDifference + 1e-10,
      },
      degreePowers: {
        ...degreePowers,
        ratios: Object.fromEntries(
          Object.entries(degreePowers).map(([key, value]) => [
            key,
            value.l2 / value.l1,
          ]),
        ),
        approximationQuadratureRelativeDifferences: {
          l1:
            Math.abs(
              degreePowers.approximation.l1 -
              degreePowers.approximationAnalytic.l1,
            ) /
            Math.max(degreePowers.approximationAnalytic.l1, 1e-30),
          l2:
            Math.abs(
              degreePowers.approximation.l2 -
              degreePowers.approximationAnalytic.l2,
            ) /
            Math.max(degreePowers.approximationAnalytic.l2, 1e-30),
        },
      },
    });
    if ((caseIndex + 1) % 10 === 0 || caseIndex + 1 === activeFamilyC.length) {
      process.stderr.write(
        `[independent-bound-audit] completed=${caseIndex + 1}/${activeFamilyC.length} ` +
        `elapsed=${((performance.now() - startedAt) / 1000).toFixed(1)}s\n`,
      );
    }
  }
  const summary = {
    caseCount: rows.length,
    sampledEvaluationCount:
      rows.reduce((sum, row) => sum + row.sampledAudit.sampleCount, 0),
    boundPassCounts: {
      far: rows.filter((row) => row.sampledAudit.farBoundPass).length,
      dynamic: rows.filter((row) => row.sampledAudit.dynamicBoundPass).length,
      total: rows.filter((row) => row.sampledAudit.totalBoundPass).length,
      root: rows.filter((row) => row.sampledAudit.rootBoundPass).length,
    },
    sourceEnvelopeOverRadius: stats(
      rows.map((row) => row.bounds.envelope / RADIUS),
    ),
    speed: stats(rows.map((row) => row.bounds.speed)),
    dynamicBound: stats(rows.map((row) => row.theorem.dynamic)),
    dynamicErrorToApproximationRms: stats(
      rows.map((row) => row.sampledAudit.dynamicErrorToApproximationRms),
    ),
    boundToApproximationRms: stats(
      rows.map(
        (row) =>
          row.theorem.dynamic /
          Math.max(row.sampledAudit.approximationRms, 1e-30),
      ),
    ),
    maximumObservedToBoundRatios: {
      root: Math.max(
        ...rows.map(
          (row) =>
            row.sampledAudit.maximumFiniteFarRootDifference /
            row.theorem.rootDifference,
        ),
      ),
      far: Math.max(
        ...rows.map(
          (row) =>
            row.sampledAudit.maximumFiniteFarError / row.theorem.far,
        ),
      ),
      dynamic: Math.max(
        ...rows.map(
          (row) =>
            row.sampledAudit.maximumDynamicError / row.theorem.dynamic,
        ),
      ),
      total: Math.max(
        ...rows.map(
          (row) =>
            row.sampledAudit.maximumTotalError / row.theorem.total,
        ),
      ),
    },
    degreeRatioRelativeError: {
      finiteVersusApproximation: stats(
        rows.map(
          (row) =>
            Math.abs(
              row.degreePowers.ratios.finite -
              row.degreePowers.ratios.approximationAnalytic,
            ) /
            Math.max(
              Math.abs(row.degreePowers.ratios.finite),
              1e-30,
            ),
        ),
      ),
      farVersusApproximation: stats(
        rows.map(
          (row) =>
            Math.abs(
              row.degreePowers.ratios.far -
              row.degreePowers.ratios.approximationAnalytic,
            ) /
            Math.max(
              Math.abs(row.degreePowers.ratios.far),
              1e-30,
            ),
        ),
      ),
      finiteVersusFar: stats(
        rows.map(
          (row) =>
            Math.abs(
              row.degreePowers.ratios.finite -
              row.degreePowers.ratios.far,
            ) /
            Math.max(
              Math.abs(row.degreePowers.ratios.finite),
              1e-30,
            ),
        ),
      ),
    },
    approximationQuadratureMaximumRelativeDifference: {
      l1: Math.max(
        ...rows.map(
          (row) =>
            row.degreePowers.approximationQuadratureRelativeDifferences.l1,
        ),
      ),
      l2: Math.max(
        ...rows.map(
          (row) =>
            row.degreePowers.approximationQuadratureRelativeDifferences.l2,
        ),
      ),
    },
    independentRelation: {
      familyC: relationSummary(rows),
      c4: relationSummary(rows.filter((row) => row.memberId === "C4")),
    },
    primaryStudyAgreement: {
      degreeRatioRelativeDifference: stats(
        rows.map((row) => {
          const primary = activeFamilyC.find(
            (candidate) =>
              candidate.exactSourceHash === row.exactSourceHash,
          );
          const primaryRatio =
            primary.degreePower[2].power /
            primary.degreePower[1].power;
          return Math.abs(
            row.degreePowers.ratios.finite - primaryRatio,
          ) / Math.max(Math.abs(primaryRatio), 1e-30);
        }),
      ),
    },
  };
  const analytic = analyticChecks();
  if (
    !analytic.constantVelocityJacobianRemainder.positiveSpeedBoundSaturated ||
    analytic.constantVelocityJacobianRemainder.samples.some(
      (row) => !row.pass,
    )
  ) {
    throw new Error("closed-form transmitter-factor checks failed");
  }
  if (
    Object.values(summary.boundPassCounts).some(
      (count) => count !== rows.length,
    )
  ) {
    throw new Error("one or more independently sampled theorem bounds failed");
  }
  if (
    summary.approximationQuadratureMaximumRelativeDifference.l1 > 1e-12 ||
    summary.approximationQuadratureMaximumRelativeDifference.l2 > 1e-12
  ) {
    throw new Error("sphere quadrature disagrees with the closed-form moments");
  }
  if (
    summary.primaryStudyAgreement.degreeRatioRelativeDifference.maximum >
    1e-9
  ) {
    throw new Error("independent degree ratios disagree with the primary study");
  }
  const resultWithoutHash = {
    schema: "prescribed-path-analysis/independent-causal-delay-bound-audit.v1",
    instrument: {
      path: path.relative(WORKSPACE, INSTRUMENT_PATH),
      sha256: sha256Bytes(readFileSync(INSTRUMENT_PATH)),
      independence:
        "does not import the prescribed wake evaluator, causal-root solver, angular reducer, or prior attribution instrument; it implements roots, fields, trajectories, and elementary checks directly",
    },
    inputs: {
      studyPath: STUDY_PATH.slice(WORKSPACE.length + 1),
      studyResultHash: study.resultHash,
      databasePath: DATABASE_PATH.slice(WORKSPACE.length + 1),
      databaseReadOnly: true,
      family: "C",
      radius: RADIUS,
      observationStart: OBSERVATION_START,
      observationPeriod: OBSERVATION_PERIOD,
      timeSamples: TIME_SAMPLES,
      directionSamples: directions.length,
      polarOrder: POLAR_ORDER,
      azimuthCount: AZIMUTH_COUNT,
      fieldSpeed: 1,
    },
    theorem:
      "For neutral C3 paths with |x|<=a<R, |v|<=nu<1, |a_path|<=A, and |j|<=J, the rescaled exact radial field differs from L=sum q[1+n.v0+(n.x0)(n.a0)] by at most E_R+E_D, where E_R and E_D are recorded per row. Harmonic projection then changes each cycle-RMS degree amplitude by at most sqrt(4 pi) times that pointwise bound.",
    analyticChecks: analytic,
    summary,
    rows,
    pathEvolutionInvoked: false,
    eomSolverInvoked: false,
    databaseWritesPerformed: false,
    claimGrade: "independent analytical check of a derived bound",
    claimScope:
      "checks elementary identities and sampled consequences for active prescribed Family-C paths; it does not establish evolved behavior",
    falsifier:
      "Reject the bound if any exact algebraic identity fails, any independently sampled root or field difference exceeds its declared bound, or the hypotheses fail on the evaluated interval.",
  };
  const result = {
    ...resultWithoutHash,
    resultHash: sha256Canonical(resultWithoutHash),
  };
  writeFileSync(OUTPUT_PATH, `${JSON.stringify(result, null, 2)}\n`);
  process.stdout.write(
    `${JSON.stringify({
      outputPath: OUTPUT_PATH,
      resultHash: result.resultHash,
      elapsedSeconds: (performance.now() - startedAt) / 1000,
      summary,
    }, null, 2)}\n`,
  );
}

run();
