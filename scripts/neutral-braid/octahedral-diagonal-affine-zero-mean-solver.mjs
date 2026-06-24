#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA =
  "neutral-braid-octahedral-diagonal-affine-zero-mean-solver/v1";

const PACKET_ID = "octahedral_diagonal_affine_zero_mean_solver";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 37;
const DEFAULT_Y_SUBDIVISIONS = 240;
const DEFAULT_SCALE_MIN = 0.2;
const DEFAULT_SCALE_MAX = 6;
const DEFAULT_GRID_VALUES = [0.8, 1.1, 1.4, 1.7, 2, 2.3];
const DEFAULT_ZERO_MEAN_TOLERANCE = 1e-8;
const DEFAULT_GAMMA = 1;
const DEFAULT_NU_MIN = 0.5;
const DEFAULT_NU_MAX = 1.5;
const DEFAULT_VALIDATION_RERUNS = [
  { phaseSamples: 73, ySubdivisions: 480 },
  { phaseSamples: 149, ySubdivisions: 960 },
];
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MARGIN = 1e-8;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;
const JACOBIAN_FLOOR = 1e-9;

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function scaleVector(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function phaseTheta(index, phaseSamples) {
  return (TAU * index) / phaseSamples;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function maxAbs(values) {
  return values.reduce((best, value) => Math.max(best, Math.abs(value)), 0);
}

function maxDifference(values) {
  let best = 0;
  for (let left = 0; left < values.length; left += 1) {
    for (let right = left + 1; right < values.length; right += 1) {
      best = Math.max(best, Math.abs(values[left] - values[right]));
    }
  }
  return best;
}

function vectorNorm(values) {
  return Math.hypot(...values);
}

function finiteMin(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value < best ? value : best), Infinity);
}

function finiteMax(values) {
  return values.reduce((best, value) => (Number.isFinite(value) && value > best ? value : best), -Infinity);
}

function diagonalMap(scales, vector) {
  return [scales[0] * vector[0], scales[1] * vector[1], scales[2] * vector[2]];
}

function deformedPosition(site, theta, scales) {
  return diagonalMap(scales, octahedralSitePosition(site, theta));
}

function deformedTangent(site, theta, scales) {
  return diagonalMap(scales, octahedralSiteTangent(site, theta));
}

function primitiveStats(values, step, gamma, nuMin, nuMax, pathLength, metadata = {}) {
  let primitive = 0;
  let primitiveIntegral = 0;
  let primitiveMin = 0;
  let primitiveMax = 0;

  for (const value of values) {
    primitiveIntegral += primitive * step;
    primitive += gamma * value * step;
    primitiveMin = Math.min(primitiveMin, primitive);
    primitiveMax = Math.max(primitiveMax, primitive);
  }

  const initialSpeedInterval = [nuMin - primitiveMin, nuMax - primitiveMax];
  const intervalWidth = initialSpeedInterval[1] - initialSpeedInterval[0];
  const clockLengthInitialSpeed = (pathLength - primitiveIntegral) / TAU;

  return {
    sampled_phase_count: values.length,
    expected_phase_count: metadata.expectedPhaseCount ?? values.length,
    receiver_root_failure_count: metadata.rootFailureCount ?? 0,
    primitive_return_residual: primitive,
    primitive_end_value: primitive,
    primitive_min: primitiveMin,
    primitive_max: primitiveMax,
    primitive_excursion: primitiveMax - primitiveMin,
    primitive_integral_over_period: primitiveIntegral,
    path_length: pathLength,
    mean_path_speed: pathLength / TAU,
    initial_speed_interval: initialSpeedInterval,
    initial_speed_interval_width: intervalWidth,
    initial_speed_interval_nonempty: intervalWidth >= 0,
    clock_length_initial_speed: clockLengthInitialSpeed,
    clock_length_initial_speed_in_interval:
      clockLengthInitialSpeed >= initialSpeedInterval[0] && clockLengthInitialSpeed <= initialSpeedInterval[1],
    delay_min: metadata.delays?.length > 0 ? Math.min(...metadata.delays) : null,
    delay_max: metadata.delays?.length > 0 ? Math.max(...metadata.delays) : null,
    jacobian_abs_min: metadata.jacobianAbs?.length > 0 ? Math.min(...metadata.jacobianAbs) : null,
    jacobian_abs_max: metadata.jacobianAbs?.length > 0 ? Math.max(...metadata.jacobianAbs) : null,
  };
}

function rootDomainMax(scales) {
  return 2 * Math.max(...scales) + ROOT_DOMAIN_MARGIN * Math.max(1, ...scales);
}

function deformedRootEquation(receiver, source, theta, y, scales) {
  const receiverPosition = deformedPosition(receiver, theta, scales);
  const sourcePosition = deformedPosition(source, theta - y, scales);
  return norm(subtract(receiverPosition, sourcePosition)) - y;
}

function bisectRoot(receiver, source, theta, left, right, scales) {
  let a = left;
  let b = right;
  let fa = deformedRootEquation(receiver, source, theta, a, scales);
  let fb = deformedRootEquation(receiver, source, theta, b, scales);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 90; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = deformedRootEquation(receiver, source, theta, mid, scales);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function addUniqueRoot(roots, root, domainMax) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > domainMax + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function findRoots(receiver, source, theta, scales, ySubdivisions) {
  const roots = [];
  const domainMax = rootDomainMax(scales);
  let previousY = ROOT_DOMAIN_MIN;
  let previousValue = deformedRootEquation(receiver, source, theta, previousY, scales);

  for (let step = 1; step <= ySubdivisions; step += 1) {
    const y = ROOT_DOMAIN_MIN + ((domainMax - ROOT_DOMAIN_MIN) * step) / ySubdivisions;
    const value = deformedRootEquation(receiver, source, theta, y, scales);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, y, domainMax);
    } else if (Number.isFinite(previousValue) && Number.isFinite(value) && previousValue * value < 0) {
      addUniqueRoot(roots, bisectRoot(receiver, source, theta, previousY, y, scales), domainMax);
    }
    previousY = y;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function deformedForceContribution(pair, theta, y, scales) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const displacement = subtract(deformedPosition(receiver, theta, scales), deformedPosition(source, theta - y, scales));
  const distance = norm(displacement);
  const rhat = scaleVector(displacement, 1 / distance);
  const sourceTangent = deformedTangent(source, theta - y, scales);
  const jacobian = 1 - dot(sourceTangent, rhat);
  const coefficient = pair.force_sign / (y * y * Math.abs(jacobian));
  return { force: scaleVector(rhat, coefficient), jacobian };
}

function receiverTangentialForcing(receiver, theta, pairs, scales, ySubdivisions) {
  const receiverTangent = deformedTangent(receiver, theta, scales);
  const receiverTangentNorm = norm(receiverTangent);
  let force = [0, 0, 0];
  const failures = [];
  const delays = [];
  const jacobianAbs = [];

  for (const pair of pairs.filter((candidate) => candidate.receiver === receiver.id)) {
    const source = octahedralSiteById(pair.source);
    const roots = findRoots(receiver, source, theta, scales, ySubdivisions);
    if (roots.length !== 1) {
      failures.push({
        receiver: pair.receiver,
        source: pair.source,
        root_count: roots.length,
      });
      continue;
    }
    const contribution = deformedForceContribution(pair, theta, roots[0], scales);
    delays.push(roots[0]);
    jacobianAbs.push(Math.abs(contribution.jacobian));
    force = add(force, contribution.force);
  }

  const tangentialValue = dot(receiverTangent, force);

  return {
    value: tangentialValue,
    physical_speed_value: receiverTangentNorm > 0 ? tangentialValue / receiverTangentNorm : NaN,
    failures,
    delays,
    jacobian_abs: jacobianAbs,
  };
}

export function evaluateDiagonalAffineScale(scales, options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const gamma = Number(options.gamma ?? DEFAULT_GAMMA);
  const nuMin = Number(options.nuMin ?? DEFAULT_NU_MIN);
  const nuMax = Number(options.nuMax ?? DEFAULT_NU_MAX);
  const pairs = orderedOctahedralPairs();
  const valuesByReceiver = OCTAHEDRAL_SITES.map(() => []);
  const primitiveValuesByReceiver = OCTAHEDRAL_SITES.map(() => []);
  const pathLengthsByReceiver = OCTAHEDRAL_SITES.map(() => 0);
  const rootFailuresByReceiver = OCTAHEDRAL_SITES.map(() => 0);
  const delaysByReceiver = OCTAHEDRAL_SITES.map(() => []);
  const jacobianAbsByReceiver = OCTAHEDRAL_SITES.map(() => []);
  const failures = [];
  const delays = [];
  const jacobianAbs = [];
  const step = TAU / phaseSamples;

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    for (const [receiverIndex, receiver] of OCTAHEDRAL_SITES.entries()) {
      pathLengthsByReceiver[receiverIndex] += norm(deformedTangent(receiver, theta, scales)) * step;
      const forcing = receiverTangentialForcing(receiver, theta, pairs, scales, ySubdivisions);
      if (forcing.failures.length > 0) {
        failures.push({
          phase_index: phaseIndex,
          receiver: receiver.id,
          receiver_label: receiver.label,
          theta,
          failures: forcing.failures,
        });
        rootFailuresByReceiver[receiverIndex] += forcing.failures.length;
        continue;
      }
      valuesByReceiver[receiverIndex].push(forcing.value);
      primitiveValuesByReceiver[receiverIndex].push(forcing.physical_speed_value);
      delaysByReceiver[receiverIndex].push(...forcing.delays);
      jacobianAbsByReceiver[receiverIndex].push(...forcing.jacobian_abs);
      delays.push(...forcing.delays);
      jacobianAbs.push(...forcing.jacobian_abs);
    }
  }

  const vector = valuesByReceiver.map((values) =>
    values.length > 0 ? (values.reduce((sum, value) => sum + value, 0) / values.length) * TAU : NaN
  );
  const pairedRows = [
    0.5 * (vector[0] + vector[1]),
    0.5 * (vector[2] + vector[3]),
    0.5 * (vector[4] + vector[5]),
  ];
  const pairDeviation = Math.max(
    Math.abs(vector[0] - vector[1]),
    Math.abs(vector[2] - vector[3]),
    Math.abs(vector[4] - vector[5])
  );
  const zeroMeanResidualNormInf = maxAbs(vector);
  const zeroMeanResidualNorm2 = vectorNorm(vector);
  const primitiveRows = primitiveValuesByReceiver.map((values, receiverIndex) =>
    primitiveStats(values, step, gamma, nuMin, nuMax, pathLengthsByReceiver[receiverIndex], {
      expectedPhaseCount: phaseSamples,
      rootFailureCount: rootFailuresByReceiver[receiverIndex],
      delays: delaysByReceiver[receiverIndex],
      jacobianAbs: jacobianAbsByReceiver[receiverIndex],
    })
  );
  const primitiveExcursions = primitiveRows.map((row) => row.primitive_excursion);
  const initialSpeedWidths = primitiveRows.map((row) => row.initial_speed_interval_width);
  const declaredSpeedWindowRowsPassed = primitiveRows.every(
    (row) => row.initial_speed_interval_nonempty && row.clock_length_initial_speed_in_interval
  );

  return {
    scales,
    receiver_vector: vector,
    paired_rows: pairedRows,
    objective: vectorNorm(pairedRows),
    zero_mean_residual_norm_inf: zeroMeanResidualNormInf,
    zero_mean_residual_norm_2: zeroMeanResidualNorm2,
    pair_deviation_abs_max: pairDeviation,
    root_failure_count: failures.length,
    first_root_failure: failures[0] ?? null,
    delay_min: delays.length > 0 ? Math.min(...delays) : null,
    delay_max: delays.length > 0 ? Math.max(...delays) : null,
    jacobian_abs_min: jacobianAbs.length > 0 ? Math.min(...jacobianAbs) : null,
    jacobian_abs_max: jacobianAbs.length > 0 ? Math.max(...jacobianAbs) : null,
    primitive_rows: primitiveRows,
    primitive_end_abs_max: maxAbs(primitiveRows.map((row) => row.primitive_end_value)),
    primitive_excursion_max: finiteMax(primitiveExcursions),
    initial_speed_interval_width_min: finiteMin(initialSpeedWidths),
    declared_speed_window_rows_passed: declaredSpeedWindowRowsPassed,
  };
}

function formatRow(row) {
  return {
    scales: row.scales.map(formatNumber),
    receiver_vector: row.receiver_vector.map(formatNumber),
    paired_rows: row.paired_rows.map(formatNumber),
    objective: formatNumber(row.objective),
    zero_mean_residual_norm_inf: formatNumber(row.zero_mean_residual_norm_inf),
    zero_mean_residual_norm_2: formatNumber(row.zero_mean_residual_norm_2),
    pair_deviation_abs_max: formatNumber(row.pair_deviation_abs_max),
    root_failure_count: row.root_failure_count,
    first_root_failure: row.first_root_failure,
    delay_min: formatNumber(row.delay_min),
    delay_max: formatNumber(row.delay_max),
    jacobian_abs_min: formatNumber(row.jacobian_abs_min),
    jacobian_abs_max: formatNumber(row.jacobian_abs_max),
    primitive: {
      primitive_end_abs_max: formatNumber(row.primitive_end_abs_max),
      primitive_excursion_max: formatNumber(row.primitive_excursion_max),
      initial_speed_interval_width_min: formatNumber(row.initial_speed_interval_width_min),
      declared_speed_window_rows_passed: row.declared_speed_window_rows_passed,
      receiver_rows: row.primitive_rows.map((primitiveRow, index) => ({
        receiver: OCTAHEDRAL_SITES[index].id,
        receiver_label: OCTAHEDRAL_SITES[index].label,
        sampled_phase_count: primitiveRow.sampled_phase_count,
        expected_phase_count: primitiveRow.expected_phase_count,
        receiver_root_failure_count: primitiveRow.receiver_root_failure_count,
        primitive_return_residual: formatNumber(primitiveRow.primitive_return_residual),
        primitive_end_value: formatNumber(primitiveRow.primitive_end_value),
        primitive_min: formatNumber(primitiveRow.primitive_min),
        primitive_max: formatNumber(primitiveRow.primitive_max),
        primitive_excursion: formatNumber(primitiveRow.primitive_excursion),
        primitive_integral_over_period: formatNumber(primitiveRow.primitive_integral_over_period),
        path_length: formatNumber(primitiveRow.path_length),
        mean_path_speed: formatNumber(primitiveRow.mean_path_speed),
        initial_speed_interval: primitiveRow.initial_speed_interval.map(formatNumber),
        initial_speed_interval_width: formatNumber(primitiveRow.initial_speed_interval_width),
        initial_speed_interval_nonempty: primitiveRow.initial_speed_interval_nonempty,
        clock_length_initial_speed: formatNumber(primitiveRow.clock_length_initial_speed),
        clock_length_initial_speed_in_interval: primitiveRow.clock_length_initial_speed_in_interval,
        delay_min: formatNumber(primitiveRow.delay_min),
        delay_max: formatNumber(primitiveRow.delay_max),
        jacobian_abs_min: formatNumber(primitiveRow.jacobian_abs_min),
        jacobian_abs_max: formatNumber(primitiveRow.jacobian_abs_max),
        declared_speed_window_status:
          primitiveRow.initial_speed_interval_nonempty && primitiveRow.clock_length_initial_speed_in_interval
            ? "declared-speed-window-and-clock-length-compatible"
            : "declared-speed-window-or-clock-length-failed",
      })),
    },
    row_status: row.root_failure_count === 0 ? "sampled-one-root-passed" : "sampled-root-ledger-failed",
    retention: "not_retained",
  };
}

function parseGridValues(value) {
  return String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter(Number.isFinite);
}

function buildGridRows(gridValues, options) {
  const rows = [];
  for (const sx of gridValues) {
    for (const sy of gridValues) {
      for (const sz of gridValues) {
        rows.push(evaluateDiagonalAffineScale([sx, sy, sz], options));
      }
    }
  }
  return rows;
}

function numericalJacobian(logScales, options) {
  const step = Number(options.newtonStep ?? 1e-4);
  const matrix = [];
  const baseScales = logScales.map(Math.exp);
  const base = evaluateDiagonalAffineScale(baseScales, options).paired_rows;
  for (let column = 0; column < 3; column += 1) {
    const plus = [...logScales];
    const minus = [...logScales];
    plus[column] += step;
    minus[column] -= step;
    const plusRows = evaluateDiagonalAffineScale(plus.map(Math.exp), options).paired_rows;
    const minusRows = evaluateDiagonalAffineScale(minus.map(Math.exp), options).paired_rows;
    matrix.push(plusRows.map((entry, index) => (entry - minusRows[index]) / (2 * step)));
  }
  return {
    base,
    jacobian: Array.from({ length: 3 }, (_, row) => matrix.map((columnValues) => columnValues[row])),
  };
}

function solveLinear3(matrix, vector) {
  const a = matrix.map((row, index) => [...row, vector[index]]);
  for (let pivot = 0; pivot < 3; pivot += 1) {
    let best = pivot;
    for (let row = pivot + 1; row < 3; row += 1) {
      if (Math.abs(a[row][pivot]) > Math.abs(a[best][pivot])) {
        best = row;
      }
    }
    if (Math.abs(a[best][pivot]) < 1e-12) {
      return null;
    }
    [a[pivot], a[best]] = [a[best], a[pivot]];
    const scale = a[pivot][pivot];
    for (let column = pivot; column <= 3; column += 1) {
      a[pivot][column] /= scale;
    }
    for (let row = 0; row < 3; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = a[row][pivot];
      for (let column = pivot; column <= 3; column += 1) {
        a[row][column] -= factor * a[pivot][column];
      }
    }
  }
  return a.map((row) => row[3]);
}

function clampLogScales(logScales, scaleMin, scaleMax) {
  const logMin = Math.log(scaleMin);
  const logMax = Math.log(scaleMax);
  return logScales.map((entry) => Math.min(logMax, Math.max(logMin, entry)));
}

function improveWithDampedNewton(seedRow, options) {
  const maxIterations = Number.parseInt(options.maxNewtonIterations ?? 8, 10);
  const scaleMin = Number(options.scaleMin ?? DEFAULT_SCALE_MIN);
  const scaleMax = Number(options.scaleMax ?? DEFAULT_SCALE_MAX);
  let logScales = seedRow.scales.map(Math.log);
  let best = seedRow;
  const iterations = [];

  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    const { base, jacobian } = numericalJacobian(logScales, options);
    const step = solveLinear3(jacobian, base.map((entry) => -entry));
    if (!step) {
      iterations.push({
        iteration,
        status: "singular-jacobian",
        scales: logScales.map((entry) => formatNumber(Math.exp(entry))),
        residual: base.map(formatNumber),
      });
      break;
    }

    let accepted = false;
    let acceptedRow = best;
    let damping = 1;
    for (let attempt = 0; attempt < 8; attempt += 1) {
      const candidateLogs = clampLogScales(
        logScales.map((entry, index) => entry + damping * step[index]),
        scaleMin,
        scaleMax
      );
      const candidate = evaluateDiagonalAffineScale(candidateLogs.map(Math.exp), options);
      if (candidate.root_failure_count === 0 && candidate.objective < best.objective) {
        accepted = true;
        acceptedRow = candidate;
        logScales = candidateLogs;
        best = candidate;
        break;
      }
      damping *= 0.5;
    }

    iterations.push({
      iteration,
      status: accepted ? "accepted" : "no-improving-damped-step",
      damping: formatNumber(accepted ? damping : 0),
      scales: acceptedRow.scales.map(formatNumber),
      residual: acceptedRow.paired_rows.map(formatNumber),
      objective: formatNumber(acceptedRow.objective),
    });

    if (!accepted || best.objective <= Number(options.zeroMeanTolerance ?? DEFAULT_ZERO_MEAN_TOLERANCE)) {
      break;
    }
  }

  return { best, iterations };
}

function buildResolutionValidation(candidateRow, options) {
  const zeroMeanTolerance = Number(options.zeroMeanTolerance ?? DEFAULT_ZERO_MEAN_TOLERANCE);
  const rerunSpecs = options.validationReruns ?? DEFAULT_VALIDATION_RERUNS;
  const reruns = rerunSpecs.map((spec) => {
    const phaseSamples = Number.parseInt(spec.phaseSamples, 10);
    const ySubdivisions = Number.parseInt(spec.ySubdivisions, 10);
    const row = evaluateDiagonalAffineScale(candidateRow.scales, {
      ...options,
      phaseSamples,
      ySubdivisions,
    });
    const formatted = formatRow(row);
    const zeroMeanPassed = row.root_failure_count === 0 && row.zero_mean_residual_norm_inf <= zeroMeanTolerance;
    const primitiveReturned = row.primitive_end_abs_max <= zeroMeanTolerance;
    return {
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      scales: formatted.scales,
      receiver_vector: formatted.receiver_vector,
      paired_rows: formatted.paired_rows,
      zero_mean_residual_norm_inf: formatted.zero_mean_residual_norm_inf,
      zero_mean_residual_norm_2: formatted.zero_mean_residual_norm_2,
      primitive_end_abs_max: formatted.primitive.primitive_end_abs_max,
      primitive_excursion_max: formatted.primitive.primitive_excursion_max,
      initial_speed_interval_width_min: formatted.primitive.initial_speed_interval_width_min,
      declared_speed_window_rows_passed: formatted.primitive.declared_speed_window_rows_passed,
      root_failure_count: row.root_failure_count,
      delay_min: formatted.delay_min,
      delay_max: formatted.delay_max,
      jacobian_abs_min: formatted.jacobian_abs_min,
      jacobian_abs_max: formatted.jacobian_abs_max,
      primitive: formatted.primitive,
      validation_status:
        row.root_failure_count === 0 && zeroMeanPassed && primitiveReturned
          ? "resolution-zero-mean-and-primitive-return-passed"
          : row.root_failure_count === 0
            ? "resolution-zero-mean-or-primitive-return-failed"
            : "resolution-root-ledger-failed",
    };
  });
  const maxValidationResidual = finiteMax(reruns.map((row) => row.zero_mean_residual_norm_inf));
  const maxPrimitiveReturn = finiteMax(reruns.map((row) => row.primitive_end_abs_max));
  const minValidationJacobian = finiteMin(reruns.map((row) => row.jacobian_abs_min));
  const allZeroMeanPassed = reruns.every(
    (row) => row.validation_status === "resolution-zero-mean-and-primitive-return-passed"
  );

  return {
    source_scales: candidateRow.scales.map(formatNumber),
    source_zero_mean_residual_norm_inf: formatNumber(candidateRow.zero_mean_residual_norm_inf),
    reruns,
    summary: {
      status: allZeroMeanPassed
        ? "sampled-candidate-resolution-stable"
        : "sampled-candidate-resolution-unstable",
      rerun_count: reruns.length,
      max_validation_zero_mean_residual_norm_inf: formatNumber(maxValidationResidual),
      max_validation_primitive_end_abs_max: formatNumber(maxPrimitiveReturn),
      min_validation_jacobian_abs_min: formatNumber(minValidationJacobian),
    },
  };
}

export function buildOctahedralDiagonalAffineZeroMeanSolver(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const scaleMin = Number(options.scaleMin ?? DEFAULT_SCALE_MIN);
  const scaleMax = Number(options.scaleMax ?? DEFAULT_SCALE_MAX);
  const zeroMeanTolerance = Number(options.zeroMeanTolerance ?? DEFAULT_ZERO_MEAN_TOLERANCE);
  const gamma = Number(options.gamma ?? DEFAULT_GAMMA);
  const nuMin = Number(options.nuMin ?? DEFAULT_NU_MIN);
  const nuMax = Number(options.nuMax ?? DEFAULT_NU_MAX);
  const gridValues = options.gridValues ?? DEFAULT_GRID_VALUES;

  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(scaleMin) || scaleMin <= 0) {
    throw new Error("scaleMin must be positive");
  }
  if (!Number.isFinite(scaleMax) || scaleMax <= scaleMin) {
    throw new Error("scaleMax must be greater than scaleMin");
  }
  if (!Number.isFinite(zeroMeanTolerance) || zeroMeanTolerance <= 0) {
    throw new Error("zeroMeanTolerance must be positive");
  }
  if (!Number.isFinite(gamma) || gamma === 0) {
    throw new Error("gamma must be a finite nonzero number");
  }
  if (!Number.isFinite(nuMin) || !Number.isFinite(nuMax) || !(0 < nuMin && nuMin < nuMax)) {
    throw new Error("declared speed window must satisfy 0 < nuMin < nuMax");
  }
  if (!Array.isArray(gridValues) || gridValues.length === 0 || !gridValues.every((value) => value >= scaleMin && value <= scaleMax)) {
    throw new Error("grid values must be a nonempty array inside the scale domain");
  }

  const searchOptions = { ...options, phaseSamples, ySubdivisions, scaleMin, scaleMax, zeroMeanTolerance, gamma, nuMin, nuMax };
  const unitRow = evaluateDiagonalAffineScale([1, 1, 1], searchOptions);
  const gridRows = buildGridRows(gridValues, searchOptions);
  const validGridRows = gridRows.filter((row) => row.root_failure_count === 0);
  const bestGridRow = validGridRows.reduce((best, row) => (row.objective < best.objective ? row : best), unitRow);
  const newton = improveWithDampedNewton(bestGridRow, searchOptions);
  const best = newton.best.objective < bestGridRow.objective ? newton.best : bestGridRow;
  const solveStatus =
    best.zero_mean_residual_norm_inf <= zeroMeanTolerance
      ? "sampled-diagonal-zero-mean-candidate-found"
      : "sampled-diagonal-zero-mean-not-found";
  const scaleSpread = maxDifference(best.scales);
  const candidateKind =
    solveStatus === "sampled-diagonal-zero-mean-candidate-found" && scaleSpread <= 1e-8
      ? "uniform-trace-subfamily"
      : "diagonal-nontrace-or-none";
  const fixedCandidateValidation =
    solveStatus === "sampled-diagonal-zero-mean-candidate-found"
      ? buildResolutionValidation(best, searchOptions)
      : {
          source_scales: best.scales.map(formatNumber),
          source_zero_mean_residual_norm_inf: formatNumber(best.zero_mean_residual_norm_inf),
          reruns: [],
          summary: {
            status: "not-run-no-zero-mean-candidate",
            rerun_count: 0,
            max_validation_zero_mean_residual_norm_inf: null,
            max_validation_primitive_end_abs_max: null,
            min_validation_jacobian_abs_min: null,
          },
        };
  const resolutionStable =
    fixedCandidateValidation.summary.status === "sampled-candidate-resolution-stable";

  return {
    schema: OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_root_ledger: "scripts/neutral-braid/octahedral-root-ledger.mjs",
    source_affine_force_mean_derivative:
      "scripts/neutral-braid/octahedral-affine-force-mean-derivative.mjs",
    priority_packet: "reference/priorities/braid-geometry-export-bridge/octahedral-diagonal-affine-zero-mean-solver.md",
    artifact_claim: {
      finite_family: "positive diagonal affine scales A=diag(s1,s2,s3)",
      solves_dynamics: false,
      certifies_root_ledger: false,
      certifies_bounded_speed_live_ledger: false,
      retained_branch: false,
      claim_level:
        solveStatus === "sampled-diagonal-zero-mean-candidate-found" && resolutionStable
          ? "resolution-stable sampled finite diagonal zero-mean candidate only"
          : solveStatus === "sampled-diagonal-zero-mean-candidate-found"
            ? "resolution-unstable sampled finite diagonal near-fold cancellation only"
          : "sampled finite diagonal obstruction only",
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      scale_domain: [formatNumber(scaleMin), formatNumber(scaleMax)],
      grid_values: gridValues.map(formatNumber),
      grid_row_count: gridRows.length,
      valid_grid_row_count: validGridRows.length,
      zero_mean_tolerance: zeroMeanTolerance,
      gamma,
      declared_speed_window: [formatNumber(nuMin), formatNumber(nuMax)],
      declared_speed_window_claim_level: "diagnostic only; not an imposed theory constraint",
      speed_projection: "physical unit tangent forcing",
      fixed_candidate_validation_reruns: DEFAULT_VALIDATION_RERUNS,
      jacobian_floor: JACOBIAN_FLOOR,
      root_domain: "0<y<=2*max(s1,s2,s3)+margin",
    },
    receiver_labels: OCTAHEDRAL_SITES.map((site) => site.label),
    unit_row: formatRow(unitRow),
    best_grid_row: formatRow(bestGridRow),
    newton_iterations: newton.iterations,
    best_row: formatRow(best),
    fixed_candidate_validation: fixedCandidateValidation,
    solve_result: {
      status: solveStatus,
      equation: "M_pair(A)=0 for A=diag(s1,s2,s3)",
      independent_rows: ["pair_1", "pair_2", "pair_3"],
      best_scales: best.scales.map(formatNumber),
      best_paired_rows: best.paired_rows.map(formatNumber),
      best_zero_mean_residual_norm_inf: formatNumber(best.zero_mean_residual_norm_inf),
      best_zero_mean_residual_norm_2: formatNumber(best.zero_mean_residual_norm_2),
      primitive_end_abs_max: formatNumber(best.primitive_end_abs_max),
      primitive_excursion_max: formatNumber(best.primitive_excursion_max),
      declared_speed_window_rows_passed: best.declared_speed_window_rows_passed,
      resolution_stability_status: fixedCandidateValidation.summary.status,
      first_failure_status:
        solveStatus === "sampled-diagonal-zero-mean-candidate-found" && !resolutionStable
          ? "sampled-candidate-resolution-stability-failed"
          : solveStatus === "sampled-diagonal-zero-mean-candidate-found" && !best.declared_speed_window_rows_passed
            ? "declared-speed-window-or-clock-length-failed"
          : solveStatus === "sampled-diagonal-zero-mean-candidate-found"
            ? "bounded-speed-live-ledger-open"
            : "non-diagonal-live-variable-or-speed-support-correction-required",
      candidate_kind: candidateKind,
      scale_spread_abs_max: formatNumber(scaleSpread),
    },
    result: {
      theory_status:
        solveStatus === "sampled-diagonal-zero-mean-candidate-found" && resolutionStable
          ? "sampled-diagonal-affine-zero-mean-candidate-found"
          : solveStatus === "sampled-diagonal-zero-mean-candidate-found"
            ? "sampled-diagonal-affine-zero-mean-candidate-resolution-unstable"
          : "sampled-diagonal-affine-zero-mean-not-found",
      retention: "not_retained",
      retained_branch: false,
      certifies_bounded_speed_live_ledger: false,
      status_note:
        "This artifact evaluates finite positive diagonal affine scales, fixed-candidate resolution stability, and the sampled physical speed-ODE primitive row only. It does not certify a bounded-speed live ledger, action row, event row, stability row, Noether row, observer export, or retained branch.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralDiagonalAffineZeroMeanSolver(artifact) {
  const errors = [];
  assertField(
    artifact?.schema === OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA,
    "schema must match diagonal affine solver schema",
    errors
  );
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match diagonal affine solver packet", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(artifact?.artifact_claim?.solves_dynamics === false, "artifact must not claim dynamics closure", errors);
  assertField(artifact?.artifact_claim?.retained_branch === false, "artifact must not claim retained branch", errors);
  assertField(
    Array.isArray(artifact?.receiver_labels) && artifact.receiver_labels.length === 6,
    "must emit six receiver labels",
    errors
  );
  assertField(
    Array.isArray(artifact?.best_row?.receiver_vector) &&
      artifact.best_row.receiver_vector.length === 6 &&
      artifact.best_row.receiver_vector.every(Number.isFinite),
    "best row must emit six finite receiver residuals",
    errors
  );
  assertField(artifact?.best_row?.root_failure_count === 0, "best row must have no sampled root failures", errors);
  assertField(
    artifact?.best_row?.primitive?.receiver_rows?.length === 6,
    "best row must emit six primitive receiver rows",
    errors
  );
  assertField(
    artifact?.best_row?.primitive?.receiver_rows?.every(
      (row) =>
        Number.isInteger(row.sampled_phase_count) &&
        Number.isInteger(row.expected_phase_count) &&
        Number.isInteger(row.receiver_root_failure_count) &&
        Number.isFinite(row.primitive_return_residual)
    ),
    "primitive receiver rows must emit sample counts, root failures, and finite return residuals",
    errors
  );
  assertField(
    artifact?.fixed_candidate_validation?.summary?.status === "sampled-candidate-resolution-stable" ||
      artifact?.fixed_candidate_validation?.summary?.status === "sampled-candidate-resolution-unstable" ||
      artifact?.fixed_candidate_validation?.summary?.status === "not-run-no-zero-mean-candidate",
    "fixed candidate validation must emit a recognized status",
    errors
  );
  assertField(
    Number(artifact?.best_row?.jacobian_abs_min) > Number(artifact?.numerical_method?.jacobian_floor),
    "best row must keep sampled jacobian away from zero",
    errors
  );
  assertField(artifact?.result?.retention === "not_retained", "artifact must not claim retained branch status", errors);
  assertField(
    artifact?.result?.certifies_bounded_speed_live_ledger === false,
    "artifact must not certify bounded-speed live ledger",
    errors
  );
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-diagonal-affine-zero-mean-solver.mjs [options]",
    "",
    "Options:",
    "  --samples <n>        Periodic phase samples over [0, 2*pi) (default: 37)",
    "  --subdivisions <n>   Root-search subdivisions (default: 240)",
    "  --scale-min <s>      Positive minimum diagonal scale (default: 0.2)",
    "  --scale-max <s>      Positive maximum diagonal scale (default: 6)",
    "  --grid <csv>         Comma-separated diagonal scale grid (default: 0.8,1.1,1.4,1.7,2,2.3)",
    "  --zero-tol <x>       Zero-mean tolerance (default: 1e-8)",
    "  --out <path>         Write artifact JSON to path instead of stdout",
    "  --validate <path>    Validate an existing artifact JSON file",
    "  --schema             Print the artifact schema identifier",
    "  --pretty             Pretty-print JSON output",
    "  --help               Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    scaleMin: DEFAULT_SCALE_MIN,
    scaleMax: DEFAULT_SCALE_MAX,
    gridValues: DEFAULT_GRID_VALUES,
    zeroMeanTolerance: DEFAULT_ZERO_MEAN_TOLERANCE,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--scale-min") {
      args.scaleMin = Number(argv[++index]);
    } else if (arg === "--scale-max") {
      args.scaleMax = Number(argv[++index]);
    } else if (arg === "--grid") {
      args.gridValues = parseGridValues(argv[++index]);
    } else if (arg === "--zero-tol") {
      args.zeroMeanTolerance = Number(argv[++index]);
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "neutral-braid-octahedral-diagonal-affine-zero-mean-solver-schema/v1",
          artifact_schema: OCTAHEDRAL_DIAGONAL_AFFINE_ZERO_MEAN_SOLVER_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralDiagonalAffineZeroMeanSolver(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          result: artifact.result ?? null,
          solve_result: artifact.solve_result ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralDiagonalAffineZeroMeanSolver({
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    scaleMin: args.scaleMin,
    scaleMax: args.scaleMax,
    gridValues: args.gridValues,
    zeroMeanTolerance: args.zeroMeanTolerance,
  });
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
