#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdThirtyEighthOrderPostUSuccessorCoefficientCertificate as validateH38Artifact,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-thirty-eighth-order-post-u-successor-coefficient-certificate.mjs";
import {
  theta3minusFoldPairScaledRootTubeCellInternals as root,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-scaled-root-tube-cell-certificate.mjs";
import {
  computeH39RouchePrimitiveClosure,
} from "./octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-evaluator/v1";
export const THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA =
  "neutral-swarm-theta3minus-fold-pair-first-y-gd-shared-domain-coefficient-artifact/v1";

export const THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS = {
  no_speed_window:
    "none; uses the certified positive speed-ratio zero enclosure only",
  promotion_status: "priority-only",
  first_y_cell_upper: 0.115 / 64,
  h38_index: 38,
  h39_index: 39,
  r43_source_shift: 43,
  n_g_shift: 41,
  default_series_order: 44,
  default_jacobian_shifted_order: 43,
  second_x_derivative_y_power: 41,
  finite_prefix_scalar_replay_radius_multiple: 4,
  finite_prefix_scalar_replay_rho_x_multiplier: 2,
  finite_prefix_scalar_replay_r_x_fraction: 0.5,
};

function isProvided(value) {
  return value !== undefined && value !== null;
}

function numericInterval(value) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  return [Number(value), Number(value)];
}

function parseFormattedInterval(value) {
  if (Array.isArray(value)) {
    return value.map(Number);
  }
  if (typeof value === "string") {
    return value
      .replace("[", "")
      .replace("]", "")
      .split(",")
      .map(Number);
  }
  return [Number(value), Number(value)];
}

function assertInterval(name, interval) {
  if (
    !Array.isArray(interval) ||
    interval.length !== 2 ||
    !Number.isFinite(interval[0]) ||
    !Number.isFinite(interval[1]) ||
    interval[0] > interval[1]
  ) {
    throw new Error(`${name} must be a finite interval [left,right]`);
  }
}

function assertCell(cell) {
  for (const key of [
    "speed_interval",
    "delta_fold_interval",
    "phi_fold_interval",
    "beta_interval",
    "gamma_interval",
    "L_interval",
  ]) {
    assertInterval(`cell.${key}`, cell?.[key]);
  }
}

function hFieldName(index, suffix = "interval") {
  return `h${index}_${suffix}`;
}

export function hIntervalsFromBranchRow(branchRow, { hCount = 39 } = {}) {
  return Array.from({ length: hCount }, (_, index) =>
    numericInterval(branchRow[hFieldName(index)])
  );
}

export function cellFromCertificateRow(row) {
  return {
    speed_interval: numericInterval(row.speed_interval),
    delta_fold_interval: numericInterval(row.delta_fold_interval),
    phi_fold_interval: numericInterval(row.phi_fold_interval),
    beta_interval: numericInterval(row.beta_interval),
    gamma_interval: numericInterval(row.gamma_interval),
    L_interval: numericInterval(row.L_interval),
  };
}

function finiteMax(values) {
  const finiteValues = values
    .map((value) => (value === null || value === undefined ? null : Number(value)))
    .filter((value) => Number.isFinite(value));
  return finiteValues.length === 0 ? null : Math.max(...finiteValues);
}

function finiteMin(values) {
  const finiteValues = values
    .map((value) => (value === null || value === undefined ? null : Number(value)))
    .filter((value) => Number.isFinite(value));
  return finiteValues.length === 0 ? null : Math.min(...finiteValues);
}

function intervalHullFromFormatted(intervals) {
  const parsed = intervals.map(parseFormattedInterval);
  if (parsed.length === 0) {
    return null;
  }
  return root.formatInterval([
    Math.min(...parsed.map(([left]) => left)),
    Math.max(...parsed.map(([, right]) => right)),
  ]);
}

function maxAbsFormattedIntervals(intervals) {
  if (intervals.length === 0) {
    return null;
  }
  return Math.max(...intervals.map(maxAbsFormattedInterval));
}

function nearlyEqualNumbers(left, right, tolerance = 1e-15) {
  const resolvedLeft = Number(left);
  const resolvedRight = Number(right);
  if (!Number.isFinite(resolvedLeft) || !Number.isFinite(resolvedRight)) {
    return false;
  }
  const scale = Math.max(1, Math.abs(resolvedLeft), Math.abs(resolvedRight));
  return Math.abs(resolvedLeft - resolvedRight) <= tolerance * scale;
}

export function makeTheta3minusFirstYGdSeriesContext({
  seriesOrder =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.default_series_order,
} = {}) {
  if (!Number.isInteger(seriesOrder) || seriesOrder < 43) {
    throw new Error("seriesOrder must be an integer at least 43");
  }

  const factorials = Array.from({ length: seriesOrder + 1 }, (_, index) =>
    index === 0 ? 1 : null
  );
  for (let index = 1; index < factorials.length; index += 1) {
    factorials[index] = factorials[index - 1] * index;
  }

  function zeros() {
    return Array.from({ length: seriesOrder + 1 }, () => [0, 0]);
  }

  function constant(valueOrInterval) {
    const series = zeros();
    series[0] = Array.isArray(valueOrInterval)
      ? root.outwardInterval(valueOrInterval)
      : root.pointInterval(valueOrInterval);
    return series;
  }

  function add(left, right) {
    return left.map((value, index) => root.addIntervals(value, right[index]));
  }

  function subtract(left, right) {
    return left.map((value, index) =>
      root.subtractIntervals(value, right[index])
    );
  }

  function scale(series, factor) {
    return series.map((value) => root.scaleInterval(value, factor));
  }

  function scaleByInterval(series, factorInterval) {
    return series.map((value) =>
      root.multiplyIntervals(value, factorInterval)
    );
  }

  function multiply(left, right) {
    const result = zeros();
    for (let leftIndex = 0; leftIndex <= seriesOrder; leftIndex += 1) {
      for (
        let rightIndex = 0;
        leftIndex + rightIndex <= seriesOrder;
        rightIndex += 1
      ) {
        result[leftIndex + rightIndex] = root.addIntervals(
          result[leftIndex + rightIndex],
          root.multiplyIntervals(left[leftIndex], right[rightIndex])
        );
      }
    }
    return result;
  }

  function power(series, exponent) {
    let result = constant(1);
    for (let index = 0; index < exponent; index += 1) {
      result = multiply(result, series);
    }
    return result;
  }

  function inverse(series) {
    const result = zeros();
    result[0] = root.reciprocalInterval(series[0]);
    for (let order = 1; order <= seriesOrder; order += 1) {
      let convolution = [0, 0];
      for (let index = 1; index <= order; index += 1) {
        convolution = root.addIntervals(
          convolution,
          root.multiplyIntervals(series[index], result[order - index])
        );
      }
      result[order] = root.divideIntervals(
        root.scaleInterval(convolution, -1),
        series[0]
      );
    }
    return result;
  }

  function divide(left, right) {
    return multiply(left, inverse(right));
  }

  function sinDerivativeInterval(center, derivativeIndex) {
    if (derivativeIndex % 4 === 0) {
      return root.sinInterval(center);
    }
    if (derivativeIndex % 4 === 1) {
      return root.cosInterval(center);
    }
    if (derivativeIndex % 4 === 2) {
      return root.scaleInterval(root.sinInterval(center), -1);
    }
    return root.scaleInterval(root.cosInterval(center), -1);
  }

  function cosDerivativeInterval(center, derivativeIndex) {
    if (derivativeIndex % 4 === 0) {
      return root.cosInterval(center);
    }
    if (derivativeIndex % 4 === 1) {
      return root.scaleInterval(root.sinInterval(center), -1);
    }
    if (derivativeIndex % 4 === 2) {
      return root.scaleInterval(root.cosInterval(center), -1);
    }
    return root.sinInterval(center);
  }

  function analyticSeries(series, derivativeInterval) {
    const center = series[0];
    const nilpotent = [...series];
    nilpotent[0] = [0, 0];
    let nilpotentPower = constant(1);
    let sum = zeros();
    for (let order = 0; order <= seriesOrder; order += 1) {
      sum = add(
        sum,
        scaleByInterval(
          nilpotentPower,
          root.scaleInterval(
            derivativeInterval(center, order),
            1 / factorials[order]
          )
        )
      );
      nilpotentPower = multiply(nilpotentPower, nilpotent);
    }
    return sum;
  }

  function sinSeries(series) {
    return analyticSeries(series, sinDerivativeInterval);
  }

  function cosSeries(series) {
    return analyticSeries(series, cosDerivativeInterval);
  }

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    seriesOrder,
    zeros,
    constant,
    add,
    subtract,
    scale,
    scaleByInterval,
    multiply,
    power,
    inverse,
    divide,
    sinSeries,
    cosSeries,
  };
}

function branchSignValue(branch) {
  return typeof branch === "number" ? branch : root.branchSign(branch);
}

function hIntervalAt(hIntervals, index) {
  return hIntervals[index] ?? [0, 0];
}

function hIntervalsWithX(hIntervals, xInterval) {
  const extended = hIntervals.map(numericInterval);
  extended[THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.h39_index] =
    numericInterval(xInterval ?? [0, 0]);
  return extended;
}

function intervalAbsUpper(interval) {
  const [left, right] = numericInterval(interval);
  return Math.max(Math.abs(left), Math.abs(right));
}

function intervalClearanceFromZero(interval) {
  const [left, right] = numericInterval(interval);
  if (left > 0) {
    return left;
  }
  if (right < 0) {
    return -right;
  }
  return 0;
}

function assertFiniteNonnegativeNumber(name, value) {
  const resolved = Number(value);
  if (!Number.isFinite(resolved) || resolved < 0) {
    throw new Error(`${name} must be a finite nonnegative number`);
  }
  return resolved;
}

function assertFinitePositiveNumber(name, value) {
  const resolved = Number(value);
  if (!Number.isFinite(resolved) || resolved <= 0) {
    throw new Error(`${name} must be a finite positive number`);
  }
  return resolved;
}

export function computeCoefficientPrefixMajorant(
  coefficients,
  rho,
  shiftPower = 0
) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  return coefficients.reduce(
    (sum, coefficient, index) =>
      sum +
      intervalAbsUpper(coefficient) * resolvedRho ** (index + shiftPower),
    0
  );
}

export function computeYPowerFactoredCoefficientPrefixMajorant(
  coefficients,
  rho,
  yPower
) {
  const resolvedYPower = Number(yPower);
  if (!Number.isInteger(resolvedYPower) || resolvedYPower < 0) {
    throw new Error("yPower must be a nonnegative integer");
  }
  return computeCoefficientPrefixMajorant(coefficients, rho, resolvedYPower);
}

export function computeSeriesCoordinateMajorant(coefficients, rho) {
  return computeCoefficientPrefixMajorant(coefficients, rho);
}

export function computeCoefficientPrefixFloor(coefficients, rho) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const tailMajorant = computeCoefficientPrefixMajorant(
    coefficients.slice(1),
    resolvedRho,
    1
  );
  return intervalClearanceFromZero(coefficients[0]) - tailMajorant;
}

export function computeCauchyShiftedTailMajorants({
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
} = {}) {
  const bound = Number(outerBound);
  const outer = Number(outerRadius);
  const target = Number(targetRadius);
  const shift = Number(shiftPower);
  if (!Number.isFinite(bound) || bound < 0) {
    throw new Error("outerBound must be a finite nonnegative number");
  }
  if (!Number.isFinite(outer) || outer <= 0) {
    throw new Error("outerRadius must be a finite positive number");
  }
  if (!Number.isFinite(target) || target < 0 || target >= outer) {
    throw new Error(
      "targetRadius must be finite and satisfy 0 <= targetRadius < outerRadius"
    );
  }
  if (!Number.isInteger(shift) || shift < 0) {
    throw new Error("shiftPower must be a nonnegative integer");
  }
  const q = target / outer;
  return {
    status: "cauchy-shifted-tail-majorants-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    shift_power: shift,
    q,
    shifted_function_majorant: bound / (outer ** shift * (1 - q)),
    y_derivative_shifted_function_majorant:
      (bound / outer ** shift) * (q / (1 - q) ** 2),
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyRemovableQuotientFloor({
  outerBound,
  outerRadius,
  targetRadius,
  leadingCoefficientInterval,
} = {}) {
  const bound = Number(outerBound);
  const outer = Number(outerRadius);
  const target = Number(targetRadius);
  if (!Number.isFinite(bound) || bound < 0) {
    throw new Error("outerBound must be a finite nonnegative number");
  }
  if (!Number.isFinite(outer) || outer <= 0) {
    throw new Error("outerRadius must be a finite positive number");
  }
  if (!Number.isFinite(target) || target < 0 || target >= outer) {
    throw new Error(
      "targetRadius must be finite and satisfy 0 <= targetRadius < outerRadius"
    );
  }
  const leadingCoefficient = numericInterval(leadingCoefficientInterval);
  assertInterval("leadingCoefficientInterval", leadingCoefficient);
  const q = target / outer;
  const tailMajorant = (bound / outer) * (q / (1 - q));
  return {
    status: "cauchy-removable-quotient-floor-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    q,
    leading_coefficient_clearance: intervalClearanceFromZero(leadingCoefficient),
    removable_quotient_tail_majorant: tailMajorant,
    removable_quotient_floor:
      intervalClearanceFromZero(leadingCoefficient) - tailMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

function assertCauchyTailInputs({
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
}) {
  const bound = Number(outerBound);
  const outer = Number(outerRadius);
  const target = Number(targetRadius);
  const shift = Number(shiftPower);
  if (!Number.isFinite(bound) || bound < 0) {
    throw new Error("outerBound must be a finite nonnegative number");
  }
  if (!Number.isFinite(outer) || outer <= 0) {
    throw new Error("outerRadius must be a finite positive number");
  }
  if (!Number.isFinite(target) || target < 0 || target >= outer) {
    throw new Error(
      "targetRadius must be finite and satisfy 0 <= targetRadius < outerRadius"
    );
  }
  if (!Number.isInteger(shift) || shift < 0) {
    throw new Error("shiftPower must be a nonnegative integer");
  }
  return { bound, outer, target, shift, q: target / outer };
}

export function computeBranchGDenominatorClearanceMajorant({
  kernelMajorant,
  speedLowerBound,
  deltaClearance,
  jacobianClearance,
  sourceCoefficientAbs = 1,
} = {}) {
  const kernel = assertFiniteNonnegativeNumber("kernelMajorant", kernelMajorant);
  const speedFloor = assertFinitePositiveNumber(
    "speedLowerBound",
    speedLowerBound
  );
  const deltaFloor = assertFinitePositiveNumber(
    "deltaClearance",
    deltaClearance
  );
  const jacobianFloor = assertFinitePositiveNumber(
    "jacobianClearance",
    jacobianClearance
  );
  const sourceAbs = assertFiniteNonnegativeNumber(
    "sourceCoefficientAbs",
    sourceCoefficientAbs
  );
  const denominatorClearance = speedFloor * deltaFloor ** 2 * jacobianFloor;
  const branchMajorant = (4 * sourceAbs * kernel) / denominatorClearance;
  return {
    status: "h39-branch-g-denominator-clearance-majorant-emitted",
    kernel_majorant: kernel,
    speed_lower_bound: speedFloor,
    delta_clearance: deltaFloor,
    jacobian_clearance: jacobianFloor,
    source_coefficient_abs: sourceAbs,
    denominator_clearance: denominatorClearance,
    branch_g_outer_majorant: branchMajorant,
    formula:
      "4*sourceCoefficientAbs*kernelMajorant/(speedLowerBound*deltaClearance^2*jacobianClearance)",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
  };
}

export function computeNGOuterBoundFromDenominatorClearance({
  branchGOuterMajorants,
  lMajorant,
  lowerPolynomialMajorant,
  outerRadius,
} = {}) {
  if (
    !Array.isArray(branchGOuterMajorants) ||
    branchGOuterMajorants.length === 0
  ) {
    throw new Error("branchGOuterMajorants must be a nonempty array");
  }
  const branchBounds = branchGOuterMajorants.map((value, index) =>
    assertFiniteNonnegativeNumber(`branchGOuterMajorants[${index}]`, value)
  );
  const lBound = assertFiniteNonnegativeNumber("lMajorant", lMajorant);
  const lowerPolynomialBound = assertFiniteNonnegativeNumber(
    "lowerPolynomialMajorant",
    lowerPolynomialMajorant
  );
  const outer = assertFiniteNonnegativeNumber("outerRadius", outerRadius);
  const pairGOuterMajorant = branchBounds.reduce(
    (sum, value) => sum + value,
    0
  );
  const lowerPolynomialY2Majorant = outer ** 2 * lowerPolynomialBound;
  const nGOuterBound =
    pairGOuterMajorant + lBound + lowerPolynomialY2Majorant;
  return {
    status: "h39-n-g-denominator-clearance-outer-majorant-emitted",
    branch_g_outer_majorants: branchBounds,
    pair_g_outer_majorant: pairGOuterMajorant,
    l_majorant: lBound,
    lower_polynomial_majorant: lowerPolynomialBound,
    outer_radius: outer,
    lower_polynomial_y2_majorant: lowerPolynomialY2Majorant,
    n_g_outer_bound: nGOuterBound,
    formula:
      "sum(branchGOuterMajorants)+lMajorant+outerRadius^2*lowerPolynomialMajorant",
    candidate_bound_role:
      "outer bound for N_G=P-L-y^2 A_G38 when all inputs are certified on the same graph-centered domain",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
  };
}

export function computeH39NGOuterBoundCandidateMG({
  nGShiftedCoefficients,
  nGOuterBound,
  nGOuterRadius,
  rho,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
} = {}) {
  const cauchyDiagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients: nGShiftedCoefficients,
    outerBound: nGOuterBound,
    outerRadius: nGOuterRadius,
    targetRadius: rho,
    shiftPower: nGShift,
  });
  return {
    status: "h39-n-g-outer-bound-candidate-m-g-emitted",
    evaluation_level: "candidate-prefix-plus-cauchy-tail",
    n_g_shift: cauchyDiagnostic.shift_power,
    retained_shifted_prefix_order: cauchyDiagnostic.finite_prefix_order,
    n_g_outer_bound: cauchyDiagnostic.outer_bound,
    n_g_outer_radius: cauchyDiagnostic.outer_radius,
    rho: cauchyDiagnostic.target_radius,
    q: cauchyDiagnostic.q,
    candidate_M_G_finite_prefix:
      cauchyDiagnostic.unshifted_finite_prefix_majorant,
    candidate_M_G_cauchy_tail_after_prefix:
      cauchyDiagnostic.unshifted_cauchy_tail_after_prefix_majorant,
    candidate_M_G_prefix_plus_tail_bound:
      cauchyDiagnostic.unshifted_function_prefix_plus_tail_majorant,
    shifted_T_G_prefix_plus_tail_majorant:
      cauchyDiagnostic.shifted_function_prefix_plus_tail_majorant,
    cauchy_diagnostic: cauchyDiagnostic,
    candidate_bound_source:
      "shifted N_G retained prefix plus unshifted N_G Cauchy tail",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39NGOuterBoundPrimitiveReplay({
  nGShiftedCoefficients,
  nGOuterBound,
  nGOuterRadius,
  rho,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  const candidateMG = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients,
    nGOuterBound,
    nGOuterRadius,
    rho,
    nGShift,
  });
  const replay = computeH39FinitePrefixPrimitiveScalarReplay({
    candidate_E_R_finite_prefix: candidate_E_R_bound,
    candidate_nu_J_finite_prefix: candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_G_finite_prefix:
      candidateMG.candidate_M_G_prefix_plus_tail_bound,
    candidate_M_R_finite_prefix: candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  return {
    status: "h39-n-g-outer-bound-primitive-replay-emitted",
    evaluation_level: "candidate-replay-not-certificate",
    candidate_M_G_outer_bound_diagnostic: candidateMG,
    candidate_M_G_bound: candidateMG.candidate_M_G_prefix_plus_tail_bound,
    candidate_primitive_replay: replay,
    candidate_scalar_replay_closes:
      replay.candidate_scalar_replay_closes ?? false,
    candidate_rouche_primitive_closure_ratio:
      replay.candidate_rouche_primitive_closure_ratio ?? null,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39PrimitiveMGClosureCeilingCandidate({
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  const unitReplay = computeH39FinitePrefixPrimitiveScalarReplay({
    candidate_E_R_finite_prefix: candidate_E_R_bound,
    candidate_nu_J_finite_prefix: candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_G_finite_prefix: 1,
    candidate_M_R_finite_prefix: candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  const ratio = primitiveCandidateNumber(
    unitReplay.candidate_rouche_primitive_closure_ratio
  );
  const canInvert = unitReplay.status.endsWith("-emitted") && ratio > 0;
  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: canInvert
      ? "h39-primitive-m-g-closure-ceiling-candidate-emitted"
      : "h39-primitive-m-g-closure-ceiling-candidate-open",
    evaluation_level: "candidate-primitive-m-g-ceiling",
    unit_M_G_replay: unitReplay,
    candidate_primitive_M_G_unit_closure_ratio: ratio,
    candidate_primitive_M_G_closure_ceiling: canInvert ? 1 / ratio : null,
    candidate_bound_source:
      "h39 primitive replay is linear in M_G after E_R, nu_J, L_J, M_R, and the X-radius policy are fixed",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39DenominatorCauchyOuterBoundCeilingCandidate({
  nGShiftedCoefficients,
  rho,
  nGOuterRadius,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
  lMajorant = 0,
  lowerPolynomialMajorant = 0,
  outerRadius = nGOuterRadius,
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  const primitiveCeiling = computeH39PrimitiveMGClosureCeilingCandidate({
    candidate_E_R_bound,
    candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });
  const tailDiagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients: nGShiftedCoefficients,
    outerBound: 1,
    outerRadius: nGOuterRadius,
    targetRadius: rho,
    shiftPower: nGShift,
  });
  const lBound = assertFiniteNonnegativeNumber("lMajorant", lMajorant);
  const lowerPolynomialBound = assertFiniteNonnegativeNumber(
    "lowerPolynomialMajorant",
    lowerPolynomialMajorant
  );
  const outer = assertFiniteNonnegativeNumber("outerRadius", outerRadius);
  const mGCeiling =
    primitiveCeiling.candidate_primitive_M_G_closure_ceiling;
  const prefixMajorant =
    tailDiagnostic.unshifted_finite_prefix_majorant;
  const tailCoefficient =
    tailDiagnostic.unshifted_cauchy_tail_after_prefix_majorant;
  const hasPositiveNGOuterBudget =
    mGCeiling !== null && mGCeiling > prefixMajorant && tailCoefficient > 0;
  const nGOuterBoundCeiling = hasPositiveNGOuterBudget
    ? (mGCeiling - prefixMajorant) / tailCoefficient
    : null;
  const fixedOuterTerms =
    lBound + outer ** 2 * lowerPolynomialBound;
  const branchGSumBudgetCeiling =
    nGOuterBoundCeiling === null
      ? null
      : nGOuterBoundCeiling - fixedOuterTerms;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status:
      branchGSumBudgetCeiling !== null && branchGSumBudgetCeiling > 0
        ? "h39-denominator-cauchy-outer-bound-ceiling-candidate-emitted"
        : "h39-denominator-cauchy-outer-bound-ceiling-candidate-open",
    evaluation_level: "candidate-denominator-cauchy-outer-bound-ceiling",
    rho: Number(rho),
    n_g_outer_radius: Number(nGOuterRadius),
    n_g_shift: Number(nGShift),
    retained_shifted_prefix_order: tailDiagnostic.finite_prefix_order,
    q: tailDiagnostic.q,
    candidate_primitive_M_G_closure_ceiling: mGCeiling,
    n_g_shifted_unshifted_prefix_majorant: prefixMajorant,
    n_g_outer_bound_tail_coefficient: tailCoefficient,
    n_g_outer_bound_ceiling: nGOuterBoundCeiling,
    l_majorant: lBound,
    lower_polynomial_majorant: lowerPolynomialBound,
    outer_radius: outer,
    fixed_outer_terms: fixedOuterTerms,
    branch_g_sum_budget_ceiling: branchGSumBudgetCeiling,
    ceiling_formula:
      "B_NG_out < (M_G_ceiling-prefix_unshifted)/(q^(nGShift+K+1)/(1-q)); branch sum ceiling subtracts L_*+R_y^2*A_*",
    primitive_M_G_ceiling_diagnostic: primitiveCeiling,
    n_g_tail_diagnostic: tailDiagnostic,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeBranchGDenominatorAllocationTargetsCandidate({
  branchGSumBudgetCeiling,
  branchInputs,
  allocationWeights,
} = {}) {
  const totalBudget = assertFinitePositiveNumber(
    "branchGSumBudgetCeiling",
    branchGSumBudgetCeiling
  );
  if (!Array.isArray(branchInputs) || branchInputs.length === 0) {
    throw new Error("branchInputs must be a nonempty array");
  }
  const weights = Array.isArray(allocationWeights)
    ? allocationWeights.map((weight, index) =>
        assertFinitePositiveNumber(`allocationWeights[${index}]`, weight)
      )
    : branchInputs.map(() => 1);
  if (weights.length !== branchInputs.length) {
    throw new Error("allocationWeights must match branchInputs length");
  }
  const weightSum = weights.reduce((sum, weight) => sum + weight, 0);

  function inputNumber(input, keys, fallback, assertFn, label, index) {
    const value = keys
      .map((key) => input?.[key])
      .find((candidate) => isProvided(candidate));
    return assertFn(
      `branchInputs[${index}].${label}`,
      isProvided(value) ? value : fallback
    );
  }

  const rows = branchInputs.map((input, index) => {
    const allocatedBudget = (totalBudget * weights[index]) / weightSum;
    const kernelMajorant = inputNumber(
      input,
      ["kernelMajorant", "kernel_majorant", "branch_kernel_majorant"],
      undefined,
      assertFiniteNonnegativeNumber,
      "kernelMajorant",
      index
    );
    const speedLowerBound = inputNumber(
      input,
      ["speedLowerBound", "speed_lower_bound"],
      undefined,
      assertFinitePositiveNumber,
      "speedLowerBound",
      index
    );
    const sourceCoefficientAbs = inputNumber(
      input,
      ["sourceCoefficientAbs", "source_coefficient_abs"],
      1,
      assertFiniteNonnegativeNumber,
      "sourceCoefficientAbs",
      index
    );
    const deltaClearanceValue = [
      "deltaClearance",
      "delta_clearance",
      "delta_clearance_floor",
      "delta_clearance_prefix_plus_tail_floor",
    ]
      .map((key) => input?.[key])
      .find((candidate) => isProvided(candidate));
    const jacobianClearanceValue = [
      "jacobianClearance",
      "jacobian_clearance",
      "jacobian_abs_floor",
      "jacobian_abs_prefix_plus_tail_floor",
    ]
      .map((key) => input?.[key])
      .find((candidate) => isProvided(candidate));
    const deltaClearance = isProvided(deltaClearanceValue)
      ? assertFinitePositiveNumber(
          `branchInputs[${index}].deltaClearance`,
          deltaClearanceValue
        )
      : null;
    const jacobianClearance = isProvided(jacobianClearanceValue)
      ? assertFinitePositiveNumber(
          `branchInputs[${index}].jacobianClearance`,
          jacobianClearanceValue
        )
      : null;
    const requiredDeltaSquaredJacobianClearance =
      (4 * sourceCoefficientAbs * kernelMajorant) /
      (speedLowerBound * allocatedBudget);
    const branchPressureCoefficient =
      (4 * sourceCoefficientAbs * kernelMajorant) / speedLowerBound;
    const requiredJacobianClearanceGivenDelta =
      deltaClearance === null
        ? null
        : requiredDeltaSquaredJacobianClearance / deltaClearance ** 2;
    const requiredDeltaClearanceGivenJacobian =
      jacobianClearance === null
        ? null
        : Math.sqrt(
            requiredDeltaSquaredJacobianClearance / jacobianClearance
          );
    const suppliedDeltaSquaredJacobianClearance =
      deltaClearance === null || jacobianClearance === null
        ? null
        : deltaClearance ** 2 * jacobianClearance;
    const branchMajorant =
      deltaClearance === null || jacobianClearance === null
        ? null
        : computeBranchGDenominatorClearanceMajorant({
            kernelMajorant,
            speedLowerBound,
            deltaClearance,
            jacobianClearance,
            sourceCoefficientAbs,
          });

    return {
      branch: input?.branch ?? input?.branchSign ?? index,
      allocation_weight: weights[index],
      allocated_branch_g_budget: allocatedBudget,
      kernel_majorant: kernelMajorant,
      speed_lower_bound: speedLowerBound,
      source_coefficient_abs: sourceCoefficientAbs,
      branch_pressure_coefficient: branchPressureCoefficient,
      required_delta_squared_jacobian_clearance:
        requiredDeltaSquaredJacobianClearance,
      supplied_delta_clearance: deltaClearance,
      supplied_jacobian_clearance: jacobianClearance,
      required_jacobian_clearance_given_delta:
        requiredJacobianClearanceGivenDelta,
      required_delta_clearance_given_jacobian:
        requiredDeltaClearanceGivenJacobian,
      supplied_delta_squared_jacobian_clearance:
        suppliedDeltaSquaredJacobianClearance,
      supplied_delta_squared_jacobian_margin:
        suppliedDeltaSquaredJacobianClearance === null
          ? null
          : suppliedDeltaSquaredJacobianClearance -
            requiredDeltaSquaredJacobianClearance,
      branch_g_majorant_from_supplied_clearances:
        branchMajorant?.branch_g_outer_majorant ?? null,
      candidate_branch_target_met:
        suppliedDeltaSquaredJacobianClearance === null
          ? null
          : suppliedDeltaSquaredJacobianClearance >
            requiredDeltaSquaredJacobianClearance,
      candidate_branch_majorant_below_allocation:
        branchMajorant === null
          ? null
          : branchMajorant.branch_g_outer_majorant < allocatedBudget,
    };
  });
  const pressureCoefficients = rows.map(
    (row) => row.branch_pressure_coefficient
  );
  const pressureCoefficientSum = pressureCoefficients.reduce(
    (sum, coefficient) => sum + coefficient,
    0
  );
  const allPressureCoefficientsPositive = pressureCoefficients.every(
    (coefficient) => coefficient > 0
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-branch-g-denominator-allocation-targets-candidate-emitted",
    evaluation_level: "candidate-branch-denominator-allocation-targets",
    branch_g_sum_budget_ceiling: totalBudget,
    allocation_policy:
      "normalize allocationWeights; each branch majorant must be strictly below its allocated budget, and the allocations sum to the branch G sum ceiling",
    allocation_weight_sum: weightSum,
    pressure_balanced_allocation_policy:
      "if all branch_pressure_coefficient values are positive, choosing allocation weights proportional to them equalizes the required delta^2*jacobian product and minimizes the maximum required product for this candidate formula",
    pressure_balanced_allocation_weights: allPressureCoefficientsPositive
      ? pressureCoefficients
      : null,
    pressure_balanced_common_required_delta_squared_jacobian_clearance:
      allPressureCoefficientsPositive
        ? pressureCoefficientSum / totalBudget
        : null,
    branch_rows: rows,
    candidate_all_supplied_branch_targets_met: rows.every(
      (row) => row.candidate_branch_target_met === true
    ),
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeH39DenominatorCauchyPrimitiveClosureCandidate({
  branchDenominatorCandidates,
  lMajorant,
  lowerPolynomialMajorant,
  outerRadius,
  nGShiftedCoefficients,
  nGOuterRadius = outerRadius,
  rho,
  nGShift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift,
  candidate_E_R_bound,
  candidate_nu_J_bound,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_R_bound,
  radiusMultiple,
  rhoXMultiplier,
  rXFraction,
} = {}) {
  if (
    !Array.isArray(branchDenominatorCandidates) ||
    branchDenominatorCandidates.length === 0
  ) {
    throw new Error(
      "branchDenominatorCandidates must be a nonempty array"
    );
  }
  const branchGOuterMajorants = branchDenominatorCandidates.map(
    (candidate, index) => {
      const value =
        typeof candidate === "number"
          ? candidate
          : candidate?.branch_g_outer_majorant;
      return assertFiniteNonnegativeNumber(
        `branchDenominatorCandidates[${index}].branch_g_outer_majorant`,
        value
      );
    }
  );
  const nGOuterBoundDiagnostic = computeNGOuterBoundFromDenominatorClearance({
    branchGOuterMajorants,
    lMajorant,
    lowerPolynomialMajorant,
    outerRadius,
  });
  const primitiveReplay = computeH39NGOuterBoundPrimitiveReplay({
    nGShiftedCoefficients,
    nGOuterBound: nGOuterBoundDiagnostic.n_g_outer_bound,
    nGOuterRadius,
    rho,
    nGShift,
    candidate_E_R_bound,
    candidate_nu_J_bound,
    candidate_L_J_reduced_continuous_majorant,
    candidate_M_R_bound,
    radiusMultiple,
    rhoXMultiplier,
    rXFraction,
  });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-denominator-cauchy-primitive-closure-candidate-emitted",
    evaluation_level:
      "candidate-branch-denominator-cauchy-to-primitive-replay",
    branch_count: branchGOuterMajorants.length,
    branch_g_outer_majorants: branchGOuterMajorants,
    l_majorant: nGOuterBoundDiagnostic.l_majorant,
    lower_polynomial_majorant:
      nGOuterBoundDiagnostic.lower_polynomial_majorant,
    outer_radius: nGOuterBoundDiagnostic.outer_radius,
    n_g_outer_bound: nGOuterBoundDiagnostic.n_g_outer_bound,
    candidate_M_G_bound: primitiveReplay.candidate_M_G_bound,
    candidate_scalar_replay_closes:
      primitiveReplay.candidate_scalar_replay_closes ?? false,
    candidate_rouche_primitive_closure_ratio:
      primitiveReplay.candidate_rouche_primitive_closure_ratio ?? null,
    n_g_outer_bound_diagnostic: nGOuterBoundDiagnostic,
    primitive_replay: primitiveReplay,
    candidate_bound_source:
      "branch Cauchy denominator candidates plus denominator-clearance N_G outer bound plus corrected unshifted M_G Cauchy replay",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_h39_polydisc_M_G_bound: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function derivativeTailGeometricSum(q, firstTailIndex) {
  return (
    q ** firstTailIndex *
    (firstTailIndex - (firstTailIndex - 1) * q) /
    (1 - q) ** 2
  );
}

function computeCauchyTailMajorantForOrder({
  bound,
  outer,
  q,
  shift,
  prefixOrder,
  tailKind,
}) {
  const base = bound / outer ** shift;
  const firstTailIndex = prefixOrder + 1;
  if (tailKind === "function") {
    return base * (q ** firstTailIndex / (1 - q));
  }
  if (tailKind === "unshifted-function") {
    return bound * (q ** (shift + firstTailIndex) / (1 - q));
  }
  if (tailKind === "y-derivative") {
    return base * derivativeTailGeometricSum(q, firstTailIndex);
  }
  throw new Error("tailKind must be function, unshifted-function, or y-derivative");
}

export function computeCauchyShiftedPrefixTailMajorant({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const { bound, outer, target, shift, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower,
  });
  const prefixOrder = coefficients.length - 1;
  const prefixMajorant = computeCoefficientPrefixMajorant(coefficients, target);
  const unshiftedPrefixMajorant = computeCoefficientPrefixMajorant(
    coefficients,
    target,
    shift
  );
  const yDerivativePrefixMajorant = coefficients.reduce(
    (sum, coefficient, index) =>
      sum + index * intervalAbsUpper(coefficient) * target ** index,
    0
  );
  const tailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift,
    prefixOrder,
    tailKind: "function",
  });
  const yDerivativeTailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift,
    prefixOrder,
    tailKind: "y-derivative",
  });
  const unshiftedTailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift,
    prefixOrder,
    tailKind: "unshifted-function",
  });

  return {
    status: "cauchy-shifted-prefix-tail-majorant-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    shift_power: shift,
    q,
    finite_prefix_order: prefixOrder,
    finite_prefix_majorant: prefixMajorant,
    cauchy_tail_after_prefix_majorant: tailAfterPrefixMajorant,
    shifted_function_prefix_plus_tail_majorant:
      prefixMajorant + tailAfterPrefixMajorant,
    unshifted_finite_prefix_majorant: unshiftedPrefixMajorant,
    unshifted_cauchy_tail_after_prefix_majorant:
      unshiftedTailAfterPrefixMajorant,
    unshifted_function_prefix_plus_tail_majorant:
      unshiftedPrefixMajorant + unshiftedTailAfterPrefixMajorant,
    y_derivative_finite_prefix_majorant: yDerivativePrefixMajorant,
    y_derivative_cauchy_tail_after_prefix_majorant:
      yDerivativeTailAfterPrefixMajorant,
    y_derivative_prefix_plus_tail_majorant:
      yDerivativePrefixMajorant + yDerivativeTailAfterPrefixMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyCoefficientPrefixMajorant({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  const diagnostic = computeCauchyShiftedPrefixTailMajorant({
    coefficients,
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower: 0,
  });
  return {
    status: "cauchy-coefficient-prefix-majorant-emitted",
    outer_bound: diagnostic.outer_bound,
    outer_radius: diagnostic.outer_radius,
    target_radius: diagnostic.target_radius,
    q: diagnostic.q,
    finite_prefix_order: diagnostic.finite_prefix_order,
    finite_prefix_majorant: diagnostic.finite_prefix_majorant,
    cauchy_tail_after_prefix_majorant:
      diagnostic.cauchy_tail_after_prefix_majorant,
    prefix_plus_tail_majorant:
      diagnostic.shifted_function_prefix_plus_tail_majorant,
    cauchy_diagnostic: diagnostic,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyCoefficientPrefixFloor({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const { bound, outer, target, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower: 0,
  });
  const prefixOrder = coefficients.length - 1;
  const finitePrefixFloor = computeCoefficientPrefixFloor(coefficients, target);
  const tailAfterPrefixMajorant = computeCauchyTailMajorantForOrder({
    bound,
    outer,
    q,
    shift: 0,
    prefixOrder,
    tailKind: "function",
  });
  return {
    status: "cauchy-coefficient-prefix-floor-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    q,
    finite_prefix_order: prefixOrder,
    finite_prefix_floor: finitePrefixFloor,
    cauchy_tail_after_prefix_majorant: tailAfterPrefixMajorant,
    prefix_plus_tail_floor: finitePrefixFloor - tailAfterPrefixMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyRemovableQuotientPrefixFloor({
  coefficients,
  outerBound,
  outerRadius,
  targetRadius,
} = {}) {
  if (!Array.isArray(coefficients) || coefficients.length === 0) {
    throw new Error("coefficients must be a nonempty coefficient list");
  }
  const { bound, outer, target, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower: 1,
  });
  const prefixOrder = coefficients.length - 1;
  const finitePrefixFloor = computeCoefficientPrefixFloor(coefficients, target);
  const tailAfterPrefixMajorant =
    (bound / outer) * (q ** (prefixOrder + 1) / (1 - q));
  return {
    status: "cauchy-removable-quotient-prefix-floor-emitted",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    q,
    finite_prefix_order: prefixOrder,
    finite_prefix_floor: finitePrefixFloor,
    removable_quotient_tail_after_prefix_majorant: tailAfterPrefixMajorant,
    removable_quotient_prefix_plus_tail_floor:
      finitePrefixFloor - tailAfterPrefixMajorant,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyShiftedTailOrderForTarget({
  outerBound,
  outerRadius,
  targetRadius,
  shiftPower,
  tailTarget,
  tailKind = "function",
  maxPrefixOrder = 100000,
} = {}) {
  const { bound, outer, target, shift, q } = assertCauchyTailInputs({
    outerBound,
    outerRadius,
    targetRadius,
    shiftPower,
  });
  const resolvedTailTarget = Number(tailTarget);
  const resolvedMaxPrefixOrder = Number(maxPrefixOrder);
  if (!Number.isFinite(resolvedTailTarget) || resolvedTailTarget <= 0) {
    throw new Error("tailTarget must be a finite positive number");
  }
  if (
    !Number.isInteger(resolvedMaxPrefixOrder) ||
    resolvedMaxPrefixOrder < 0
  ) {
    throw new Error("maxPrefixOrder must be a nonnegative integer");
  }

  for (let prefixOrder = 0; prefixOrder <= resolvedMaxPrefixOrder; prefixOrder += 1) {
    const tailMajorant = computeCauchyTailMajorantForOrder({
      bound,
      outer,
      q,
      shift,
      prefixOrder,
      tailKind,
    });
    if (tailMajorant <= resolvedTailTarget) {
      return {
        status: "cauchy-shifted-tail-order-target-met",
        outer_bound: bound,
        outer_radius: outer,
        target_radius: target,
        shift_power: shift,
        q,
        tail_kind: tailKind,
        tail_target: resolvedTailTarget,
        required_prefix_order: prefixOrder,
        tail_majorant_at_required_prefix_order: tailMajorant,
        previous_tail_majorant:
          prefixOrder > 0
            ? computeCauchyTailMajorantForOrder({
                bound,
                outer,
                q,
                shift,
                prefixOrder: prefixOrder - 1,
                tailKind,
              })
            : null,
        certifies_continuous_polydisc_primitives: false,
      };
    }
  }

  return {
    status: "cauchy-shifted-tail-order-target-not-met",
    outer_bound: bound,
    outer_radius: outer,
    target_radius: target,
    shift_power: shift,
    q,
    tail_kind: tailKind,
    tail_target: resolvedTailTarget,
    max_prefix_order: resolvedMaxPrefixOrder,
    tail_majorant_at_max_prefix_order: computeCauchyTailMajorantForOrder({
      bound,
      outer,
      q,
      shift,
      prefixOrder: resolvedMaxPrefixOrder,
      tailKind,
    }),
    required_prefix_order: null,
    certifies_continuous_polydisc_primitives: false,
  };
}

export function computeCauchyShiftedTailOrderSensitivity({
  outerBounds,
  outerRadius,
  targetRadius,
  shiftPower,
  tailTarget,
  tailKind = "function",
  maxPrefixOrder = 100000,
} = {}) {
  if (!Array.isArray(outerBounds) || outerBounds.length === 0) {
    throw new Error("outerBounds must be a nonempty array");
  }
  const rows = outerBounds.map((outerBound) =>
    computeCauchyShiftedTailOrderForTarget({
      outerBound,
      outerRadius,
      targetRadius,
      shiftPower,
      tailTarget,
      tailKind,
      maxPrefixOrder,
    })
  );
  return {
    status: rows.every(
      (row) => row.status === "cauchy-shifted-tail-order-target-met"
    )
      ? "cauchy-shifted-tail-order-sensitivity-complete"
      : "cauchy-shifted-tail-order-sensitivity-incomplete",
    outer_radius: Number(outerRadius),
    target_radius: Number(targetRadius),
    shift_power: Number(shiftPower),
    tail_kind: tailKind,
    tail_target: Number(tailTarget),
    rows,
    certifies_continuous_polydisc_primitives: false,
  };
}

function coefficientEntryInterval(entry) {
  return numericInterval(Array.isArray(entry) ? entry[0] : entry?.coefficient);
}

function coefficientEntryPowers(entry) {
  const powers = Array.isArray(entry) ? entry[1] : entry?.powers;
  if (!Array.isArray(powers) || powers.length === 0) {
    throw new Error("coefficient entry powers must be a nonempty array");
  }
  return powers.map((power) => {
    if (!Number.isInteger(power) || power < 0) {
      throw new Error("coefficient entry powers must be nonnegative integers");
    }
    return power;
  });
}

function radiusWeight(powers, radii) {
  if (powers.length !== radii.length) {
    throw new Error("coefficient powers and radii must have the same length");
  }
  return powers.reduce(
    (weight, power, index) => weight * Number(radii[index]) ** power,
    1
  );
}

function assertRadii(radii) {
  if (
    !Array.isArray(radii) ||
    radii.length === 0 ||
    radii.some((radius) => !Number.isFinite(Number(radius)) || Number(radius) < 0)
  ) {
    throw new Error("radii must be a nonempty array of finite nonnegative numbers");
  }
}

export function computeMultivariateCoefficientPrefixMajorant(
  coefficientEntries,
  radii,
  { tailMajorant = 0 } = {}
) {
  if (!Array.isArray(coefficientEntries)) {
    throw new Error("coefficientEntries must be an array");
  }
  assertRadii(radii);
  const tail = Number(tailMajorant);
  if (!Number.isFinite(tail) || tail < 0) {
    throw new Error("tailMajorant must be a finite nonnegative number");
  }
  return (
    coefficientEntries.reduce((sum, entry) => {
      const powers = coefficientEntryPowers(entry);
      return (
        sum +
        intervalAbsUpper(coefficientEntryInterval(entry)) *
          radiusWeight(powers, radii)
      );
    }, 0) + tail
  );
}

export function computeMultivariateCoefficientPrefixFloor(
  coefficientEntries,
  radii,
  { tailMajorant = 0 } = {}
) {
  if (!Array.isArray(coefficientEntries) || coefficientEntries.length === 0) {
    throw new Error("coefficientEntries must be a nonempty array");
  }
  assertRadii(radii);
  const constantEntries = coefficientEntries.filter((entry) =>
    coefficientEntryPowers(entry).every((power) => power === 0)
  );
  if (constantEntries.length === 0) {
    throw new Error("coefficientEntries must include a constant entry");
  }
  const constantInterval = constantEntries.reduce(
    (sum, entry) => root.addIntervals(sum, coefficientEntryInterval(entry)),
    [0, 0]
  );
  const nonconstantEntries = coefficientEntries.filter((entry) =>
    coefficientEntryPowers(entry).some((power) => power !== 0)
  );
  return (
    intervalClearanceFromZero(constantInterval) -
    computeMultivariateCoefficientPrefixMajorant(nonconstantEntries, radii, {
      tailMajorant,
    })
  );
}

export function branchSeriesCoordinates({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
} = {}) {
  assertCell(cell);
  if (!Array.isArray(hIntervals)) {
    throw new Error("hIntervals must be supplied");
  }

  const hWithX = hIntervalsWithX(hIntervals, xInterval);
  const delta = context.constant(cell.delta_fold_interval);
  delta[1] = root.scaleInterval(cell.beta_interval, branchSign);
  delta[2] = cell.gamma_interval;

  const phi = context.constant(cell.phi_fold_interval);
  phi[1] = root.scaleInterval(cell.beta_interval, -branchSign);
  phi[2] = root.scaleInterval(
    root.addIntervals(cell.gamma_interval, [2, 2]),
    -1
  );

  for (
    let index = 0;
    index < hWithX.length && index + 3 <= context.seriesOrder;
    index += 1
  ) {
    delta[index + 3] = hIntervalAt(hWithX, index);
    phi[index + 3] = root.scaleInterval(hIntervalAt(hWithX, index), -1);
  }

  return { delta, phi };
}

export function computeH39KernelContinuousMajorant({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  rho,
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const deltaMajorant = computeSeriesCoordinateMajorant(delta, resolvedRho);
  const phiMajorant = computeSeriesCoordinateMajorant(phi, resolvedRho);
  const twiceInverseSpeedSquaredMajorant = intervalAbsUpper(
    root.scaleInterval(root.inverseSpeedSquaredInterval(cell.speed_interval), 2)
  );
  const sinDeltaEntireMajorant = root.nextUp(Math.sinh(deltaMajorant));
  const sinPhiEntireMajorant = root.nextUp(Math.sinh(phiMajorant));
  const candidateMKContinuousMajorant = root.nextUp(
    twiceInverseSpeedSquaredMajorant +
      sinDeltaEntireMajorant +
      sinPhiEntireMajorant
  );
  const yPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  const candidateLJReducedContinuousMajorant = root.nextUp(
    resolvedRho ** yPower * candidateMKContinuousMajorant
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-kernel-continuous-elementary-majorant-emitted",
    evaluation_level: "elementary-continuous-majorant",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    delta_coordinate_majorant: deltaMajorant,
    phi_coordinate_majorant: phiMajorant,
    R43_second_x_kernel_delta_coefficient_seminorm_rho:
      deltaMajorant,
    R43_second_x_kernel_phi_coefficient_seminorm_rho:
      phiMajorant,
    R43_second_x_kernel_speed_min: Number(cell.speed_interval[0]),
    twice_inverse_speed_squared_majorant: twiceInverseSpeedSquaredMajorant,
    R43_second_x_kernel_speed_term: twiceInverseSpeedSquaredMajorant,
    sin_delta_entire_majorant: sinDeltaEntireMajorant,
    sin_phi_entire_majorant: sinPhiEntireMajorant,
    R43_second_x_kernel_continuous_majorant_formula:
      "M_K <= 2/min(nu)^2 + sinh(||delta||_rho) + sinh(||phi||_rho)",
    candidate_M_K_continuous_elementary_majorant:
      candidateMKContinuousMajorant,
    R43_second_x_kernel_continuous_majorant:
      candidateMKContinuousMajorant,
    second_x_kernel_y_power: yPower,
    R43_jacobian_lipschitz_reduced_continuous_majorant_formula:
      "L_J^red <= rho^41 M_K",
    candidate_L_J_reduced_continuous_elementary_majorant:
      candidateLJReducedContinuousMajorant,
    R43_jacobian_lipschitz_reduced_continuous_majorant:
      candidateLJReducedContinuousMajorant,
    analytic_inequality:
      "|sin(z)| <= sinh(|z|), so sup|K_epsilon| <= 2/nu_min^2 + sinh(||delta||_rho) + sinh(||phi||_rho)",
    reduction:
      "sup|partial_X^2 R43| <= rho^41 * candidate_M_K_continuous_elementary_majorant",
    certifies_h39_primitive_closure: false,
  };
}

export function computeBranchGDenominatorIngredientCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  rho,
  sourceCoefficientAbs = 1,
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const deltaMajorant = computeSeriesCoordinateMajorant(delta, resolvedRho);
  const phiMajorant = computeSeriesCoordinateMajorant(phi, resolvedRho);
  const branchKernelMajorant = root.nextUp(
    0.5 * (Math.cosh(deltaMajorant) + Math.cosh(phiMajorant))
  );
  const deltaClearanceFloor = computeCoefficientPrefixFloor(delta, resolvedRho);
  const fDelta = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.cosSeries(phi), -1)
    ),
    context.cosSeries(delta)
  );
  const jacobian = context.zeros();
  for (let order = 0; order < context.seriesOrder; order += 1) {
    jacobian[order] = fDelta[order + 1];
  }
  const absJacobian = context.scale(jacobian, -branchSign);
  const jacobianAbsFloor = computeCoefficientPrefixFloor(
    absJacobian,
    resolvedRho
  );
  const speedLowerBound = Number(cell.speed_interval?.[0]);
  const canEmitBranchMajorant =
    speedLowerBound > 0 && deltaClearanceFloor > 0 && jacobianAbsFloor > 0;
  const branchGDenominatorClearanceMajorant = canEmitBranchMajorant
    ? computeBranchGDenominatorClearanceMajorant({
        kernelMajorant: branchKernelMajorant,
        speedLowerBound,
        deltaClearance: deltaClearanceFloor,
        jacobianClearance: jacobianAbsFloor,
        sourceCoefficientAbs,
      })
    : null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-branch-g-denominator-ingredient-candidate-emitted",
    evaluation_level: "candidate-coordinate-seminorm",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    delta_coordinate_majorant: deltaMajorant,
    phi_coordinate_majorant: phiMajorant,
    branch_kernel_majorant: branchKernelMajorant,
    branch_kernel_majorant_formula:
      "K_epsilon <= 0.5*(cosh(||delta||_rho)+cosh(||phi||_rho))",
    delta_clearance_floor: deltaClearanceFloor,
    jacobian_abs_floor: jacobianAbsFloor,
    speed_lower_bound: speedLowerBound,
    source_coefficient_abs: Number(sourceCoefficientAbs),
    branch_g_denominator_clearance_majorant:
      branchGDenominatorClearanceMajorant,
    branch_g_outer_majorant:
      branchGDenominatorClearanceMajorant?.branch_g_outer_majorant ?? null,
    candidate_denominator_clearance_status: canEmitBranchMajorant
      ? "candidate-denominator-clearance-positive"
      : "candidate-denominator-clearance-open",
    analytic_inequality:
      "|cos(z)| <= cosh(|z|), delta floor = dist(delta_0,0)-tail, and J_abs floor = dist(J_abs,0)-tail",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function computeBranchGDenominatorCauchyIngredientCandidate({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  rho,
  outerRadius,
  deltaOuterBound,
  phiOuterBound,
  jacobianAbsOuterBound,
  sourceCoefficientAbs = 1,
} = {}) {
  const resolvedRho = Number(rho);
  if (!Number.isFinite(resolvedRho) || resolvedRho < 0) {
    throw new Error("rho must be a finite nonnegative number");
  }
  const sourceAbs = assertFiniteNonnegativeNumber(
    "sourceCoefficientAbs",
    sourceCoefficientAbs
  );
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const deltaMajorantDiagnostic = computeCauchyCoefficientPrefixMajorant({
    coefficients: delta,
    outerBound: deltaOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const phiMajorantDiagnostic = computeCauchyCoefficientPrefixMajorant({
    coefficients: phi,
    outerBound: phiOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const branchKernelMajorant = root.nextUp(
    0.5 *
      (Math.cosh(deltaMajorantDiagnostic.prefix_plus_tail_majorant) +
        Math.cosh(phiMajorantDiagnostic.prefix_plus_tail_majorant))
  );
  const deltaFloorDiagnostic = computeCauchyCoefficientPrefixFloor({
    coefficients: delta,
    outerBound: deltaOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const fDelta = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.cosSeries(phi), -1)
    ),
    context.cosSeries(delta)
  );
  const jacobian = context.zeros();
  for (let order = 0; order < context.seriesOrder; order += 1) {
    jacobian[order] = fDelta[order + 1];
  }
  const absJacobian = context.scale(jacobian, -branchSign);
  const jacobianFloorDiagnostic = computeCauchyCoefficientPrefixFloor({
    coefficients: absJacobian,
    outerBound: jacobianAbsOuterBound,
    outerRadius,
    targetRadius: resolvedRho,
  });
  const speedLowerBound = Number(cell.speed_interval?.[0]);
  const deltaClearanceFloor =
    deltaFloorDiagnostic.prefix_plus_tail_floor;
  const jacobianAbsFloor =
    jacobianFloorDiagnostic.prefix_plus_tail_floor;
  const canEmitBranchMajorant =
    speedLowerBound > 0 && deltaClearanceFloor > 0 && jacobianAbsFloor > 0;
  const branchGDenominatorClearanceMajorant = canEmitBranchMajorant
    ? computeBranchGDenominatorClearanceMajorant({
        kernelMajorant: branchKernelMajorant,
        speedLowerBound,
        deltaClearance: deltaClearanceFloor,
        jacobianClearance: jacobianAbsFloor,
        sourceCoefficientAbs: sourceAbs,
      })
    : null;

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-branch-g-denominator-cauchy-ingredient-candidate-emitted",
    evaluation_level: "candidate-coordinate-prefix-cauchy-tail",
    branch: branch ?? branchSign,
    rho: resolvedRho,
    outer_radius: Number(outerRadius),
    q: deltaMajorantDiagnostic.q,
    delta_coordinate_prefix_plus_tail_majorant:
      deltaMajorantDiagnostic.prefix_plus_tail_majorant,
    phi_coordinate_prefix_plus_tail_majorant:
      phiMajorantDiagnostic.prefix_plus_tail_majorant,
    branch_kernel_majorant: branchKernelMajorant,
    branch_kernel_majorant_formula:
      "K_epsilon <= 0.5*(cosh(delta prefix+Cauchy tail)+cosh(phi prefix+Cauchy tail))",
    delta_clearance_prefix_plus_tail_floor: deltaClearanceFloor,
    jacobian_abs_prefix_plus_tail_floor: jacobianAbsFloor,
    speed_lower_bound: speedLowerBound,
    source_coefficient_abs: sourceAbs,
    delta_coordinate_majorant_diagnostic: deltaMajorantDiagnostic,
    phi_coordinate_majorant_diagnostic: phiMajorantDiagnostic,
    delta_clearance_floor_diagnostic: deltaFloorDiagnostic,
    jacobian_abs_floor_diagnostic: jacobianFloorDiagnostic,
    branch_g_denominator_clearance_majorant:
      branchGDenominatorClearanceMajorant,
    branch_g_outer_majorant:
      branchGDenominatorClearanceMajorant?.branch_g_outer_majorant ?? null,
    candidate_denominator_clearance_status: canEmitBranchMajorant
      ? "candidate-denominator-clearance-positive"
      : "candidate-denominator-clearance-open",
    candidate_bound_source:
      "retained branch coefficient prefixes plus Cauchy tails from supplied shared-domain outer bounds",
    analytic_inequality:
      "Cauchy tail bounds close the coordinate seminorms and denominator floors before applying |cos(z)| <= cosh(|z|)",
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

function primitiveCandidateNumber(value) {
  const resolved = Number(value);
  return Number.isFinite(resolved) ? resolved : null;
}

function computeRoucheLowerBoundary({
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
}) {
  const residual = Number(centerResidualBound);
  const jacobianFloor = Number(centerJacobianLowerBound);
  const lipschitz = Number(jacobianLipschitzBound);
  if (
    !Number.isFinite(residual) ||
    residual < 0 ||
    !Number.isFinite(jacobianFloor) ||
    jacobianFloor <= 0 ||
    !Number.isFinite(lipschitz) ||
    lipschitz < 0
  ) {
    return {
      rouche_lower_boundary_status: "invalid-primitive-candidate",
      rouche_radius_discriminant: null,
      rouche_radius_lower_boundary: null,
    };
  }
  if (lipschitz === 0) {
    return {
      rouche_lower_boundary_status: "rouche-lower-boundary-computed",
      rouche_radius_discriminant: null,
      rouche_radius_lower_boundary: residual / jacobianFloor,
    };
  }
  const discriminant = jacobianFloor ** 2 - 2 * lipschitz * residual;
  if (!(discriminant > 0)) {
    return {
      rouche_lower_boundary_status: "rouche-discriminant-open",
      rouche_radius_discriminant: discriminant,
      rouche_radius_lower_boundary: null,
    };
  }
  return {
    rouche_lower_boundary_status: "rouche-lower-boundary-computed",
    rouche_radius_discriminant: discriminant,
    rouche_radius_lower_boundary:
      (2 * residual) / (jacobianFloor + Math.sqrt(discriminant)),
  };
}

export function computeH39FinitePrefixPrimitiveScalarReplay({
  candidate_E_R_finite_prefix,
  candidate_nu_J_finite_prefix,
  candidate_L_J_reduced_continuous_majorant,
  candidate_M_G_finite_prefix,
  candidate_M_R_finite_prefix,
  radiusMultiple =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_radius_multiple,
  rhoXMultiplier =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_rho_x_multiplier,
  rXFraction =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .finite_prefix_scalar_replay_r_x_fraction,
} = {}) {
  const primitiveCandidates = {
    center_residual_bound_E_R: primitiveCandidateNumber(
      candidate_E_R_finite_prefix
    ),
    center_jacobian_lower_bound_nu_J: primitiveCandidateNumber(
      candidate_nu_J_finite_prefix
    ),
    jacobian_lipschitz_bound_L_J: primitiveCandidateNumber(
      candidate_L_J_reduced_continuous_majorant
    ),
    candidate_M_G_bound: primitiveCandidateNumber(
      candidate_M_G_finite_prefix
    ),
    candidate_root_tangent_numerator_bound_M_R: primitiveCandidateNumber(
      candidate_M_R_finite_prefix
    ),
  };
  const missing = Object.entries(primitiveCandidates)
    .filter(([, value]) => value === null)
    .map(([key]) => key);
  if (missing.length > 0) {
    return {
      status: "h39-finite-prefix-primitive-scalar-replay-open",
      replay_status: "missing-finite-prefix-candidates",
      missing_finite_prefix_candidates: missing,
      candidate_primitive_bounds_status:
        "finite-prefix-plus-kernel-continuous-candidate-not-certificate",
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      retained_branch: false,
    };
  }

  const lowerBoundary = computeRoucheLowerBoundary({
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
  });
  if (lowerBoundary.rouche_radius_lower_boundary === null) {
    return {
      status: "h39-finite-prefix-primitive-scalar-replay-open",
      replay_status: lowerBoundary.rouche_lower_boundary_status,
      ...primitiveCandidates,
      ...lowerBoundary,
      candidate_primitive_bounds_status:
        "finite-prefix-plus-kernel-continuous-candidate-not-certificate",
      certifies_continuous_polydisc_primitives: false,
      certifies_directed_rounded_shared_domain: false,
      retained_branch: false,
    };
  }

  const resolvedRadiusMultiple = Number(radiusMultiple);
  const resolvedRhoXMultiplier = Number(rhoXMultiplier);
  const resolvedRXFraction = Number(rXFraction);
  if (
    !Number.isFinite(resolvedRadiusMultiple) ||
    resolvedRadiusMultiple <= 1 ||
    !Number.isFinite(resolvedRhoXMultiplier) ||
    resolvedRhoXMultiplier <= 1 ||
    !Number.isFinite(resolvedRXFraction) ||
    resolvedRXFraction <= 0 ||
    resolvedRXFraction >= 1
  ) {
    throw new Error(
      "radiusMultiple must exceed 1, rhoXMultiplier must exceed 1, and rXFraction must lie in (0,1)"
    );
  }

  const baseRadius =
    lowerBoundary.rouche_radius_lower_boundary > 0
      ? lowerBoundary.rouche_radius_lower_boundary
      : 1;
  const rhoX = resolvedRhoXMultiplier * baseRadius;
  const rX =
    lowerBoundary.rouche_radius_lower_boundary +
    resolvedRXFraction *
      (rhoX - lowerBoundary.rouche_radius_lower_boundary);
  const replay = computeH39RouchePrimitiveClosure({
    radiusMultiple: resolvedRadiusMultiple,
    mGBound: primitiveCandidates.candidate_M_G_bound,
    rootTangentNumeratorBound:
      primitiveCandidates.candidate_root_tangent_numerator_bound_M_R,
    centerResidualBound: primitiveCandidates.center_residual_bound_E_R,
    centerJacobianLowerBound:
      primitiveCandidates.center_jacobian_lower_bound_nu_J,
    jacobianLipschitzBound:
      primitiveCandidates.jacobian_lipschitz_bound_L_J,
    rhoX,
    rX,
  });

  return {
    status: "h39-finite-prefix-primitive-scalar-replay-emitted",
    replay_status: replay.rouche_primitive_closure_status,
    candidate_primitive_bounds_status:
      "finite-prefix-plus-kernel-continuous-candidate-not-certificate",
    finite_prefix_scalar_replay_claim:
      "finite-prefix E_R, nu_J, M_G, and M_R plus kernel-reduced L_J pass the scalar Rouché-primitive algebra for the displayed X-radius policy; this is a feasibility replay, not a shared-domain primitive certificate",
    radius_multiple: resolvedRadiusMultiple,
    candidate_rho_X_policy:
      "rho_X = rhoXMultiplier * r_R^-; r_X = r_R^- + rXFraction*(rho_X-r_R^-)",
    candidate_rho_X_multiplier: resolvedRhoXMultiplier,
    candidate_r_X_fraction: resolvedRXFraction,
    candidate_rho_X: rhoX,
    candidate_r_X: rX,
    ...primitiveCandidates,
    ...lowerBoundary,
    candidate_scalar_replay_closes:
      replay.candidate_rouche_primitive_certificate_closes,
    candidate_rouche_primitive_closure_ratio:
      replay.candidate_rouche_primitive_closure_ratio,
    candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim:
      replay.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim,
    candidate_rouche_primitive_h39_closure_ratio_margin_to_one:
      replay.candidate_rouche_primitive_h39_closure_ratio_margin_to_one,
    candidate_rouche_form_M_R_margin:
      replay.candidate_rouche_form_M_R_margin,
    derived_jacobian_lower_bound_J_min:
      primitiveCandidates.center_jacobian_lower_bound_nu_J -
      primitiveCandidates.jacobian_lipschitz_bound_L_J * rhoX,
    sigma_X: rhoX - rX,
    certifies_continuous_polydisc_primitives: false,
    certifies_directed_rounded_shared_domain: false,
    retained_branch: false,
  };
}

export function sourceEquationSeries({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
} = {}) {
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  return context.add(
    context.add(
      context.scaleByInterval(
        context.power(delta, 2),
        root.inverseSpeedSquaredInterval(cell.speed_interval)
      ),
      context.constant(-2)
    ),
    context.add(context.sinSeries(phi), context.sinSeries(delta))
  );
}

export function r43JacobianShiftedCoefficients({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  shiftedOrder = Math.min(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .default_jacobian_shifted_order,
    context.seriesOrder - 1
  ),
} = {}) {
  if (!Number.isInteger(shiftedOrder) || shiftedOrder < 0) {
    throw new Error("shiftedOrder must be a nonnegative integer");
  }
  if (shiftedOrder + 1 > context.seriesOrder) {
    throw new Error("seriesOrder is too small for the requested Jacobian shift");
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const numerator = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.cosSeries(delta)
    ),
    context.scale(context.cosSeries(phi), -1)
  );
  return Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => numerator[index + 1]
  );
}

export function r43SecondXDerivativeShiftedCoefficients({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  shiftedOrder = Math.min(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .default_jacobian_shifted_order,
    context.seriesOrder - 1
  ),
} = {}) {
  if (!Number.isInteger(shiftedOrder) || shiftedOrder < 0) {
    throw new Error("shiftedOrder must be a nonnegative integer");
  }
  const lowestPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  if (shiftedOrder - lowestPower > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested second-X derivative shift"
    );
  }
  const kernelCoefficients =
    shiftedOrder < lowestPower
      ? []
      : r43SecondXDerivativeKernelCoefficients({
          context,
          cell,
          branch,
          branchSign,
          hIntervals,
          xInterval,
          kernelOrder: shiftedOrder - lowestPower,
        });
  return Array.from({ length: shiftedOrder + 1 }, (_, index) =>
    index < lowestPower ? [0, 0] : kernelCoefficients[index - lowestPower]
  );
}

export function r43SecondXDerivativeKernelCoefficients({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  kernelOrder = null,
} = {}) {
  const lowestPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  const resolvedKernelOrder =
    kernelOrder === null || kernelOrder === undefined
      ? Math.max(
          0,
          Math.min(
            THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
              .default_jacobian_shifted_order,
            context.seriesOrder - 1
          ) - lowestPower
        )
      : Number(kernelOrder);
  if (
    !Number.isInteger(resolvedKernelOrder) ||
    resolvedKernelOrder < 0
  ) {
    throw new Error("kernelOrder must be a nonnegative integer");
  }
  if (resolvedKernelOrder > context.seriesOrder) {
    throw new Error(
      "seriesOrder is too small for the requested second-X derivative kernel"
    );
  }
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const kernel = context.add(
    context.add(
      context.constant(
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.sinSeries(delta), -1)
    ),
    context.scale(context.sinSeries(phi), -1)
  );
  return Array.from(
    { length: resolvedKernelOrder + 1 },
    (_, index) => kernel[index]
  );
}

export function solveH39CenterCoefficientRow({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  solveSlopeInterval = null,
} = {}) {
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });
  const intervalSlope = root.subtractIntervals(
    sourceAtOne[shift],
    sourceAtZero[shift]
  );
  const slope = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : intervalSlope;
  const h39 = root.divideIntervals(root.scaleInterval(sourceAtZero[shift], -1), slope);
  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-center-coefficient-row-solved",
    evaluation_level: "coefficient-only",
    branch: branch ?? branchSign,
    r43_source_shift: shift,
    R43_unsolved_center_coefficient_interval:
      root.formatInterval(sourceAtZero[shift]),
    h39_interval_recomputed_jacobian_coefficient_interval:
      root.formatInterval(intervalSlope),
    h39_solve_slope_interval: root.formatInterval(slope),
    h39_solve_slope_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    h39_center_interval: root.formatInterval(h39),
    coefficient_only_claim:
      "Solves only the leading shifted h39 center coefficient. A finite X39 root tube and continuous primitive bounds remain open.",
    certifies_continuous_polydisc_primitives: false,
  };
}

export function branchGSeries({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign = branchSignValue(branch),
  hIntervals,
  xInterval = [0, 0],
  sourceCoefficient = -1,
} = {}) {
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const kernel = context.scale(
    context.add(context.cosSeries(phi), context.cosSeries(delta)),
    -0.5
  );
  const fDelta = context.add(
    context.add(
      context.scaleByInterval(
        delta,
        root.scaleInterval(
          root.inverseSpeedSquaredInterval(cell.speed_interval),
          2
        )
      ),
      context.scale(context.cosSeries(phi), -1)
    ),
    context.cosSeries(delta)
  );
  const j = context.zeros();
  for (let order = 0; order < context.seriesOrder; order += 1) {
    j[order] = fDelta[order + 1];
  }
  const absJ = context.scale(j, -branchSign);
  const denominator = context.scaleByInterval(
    context.multiply(context.power(delta, 2), absJ),
    cell.speed_interval
  );
  return context.divide(context.scale(kernel, 4 * sourceCoefficient), denominator);
}

export function transformedDSeries({
  context = makeTheta3minusFirstYGdSeriesContext(),
  pairGSeries,
} = {}) {
  return pairGSeries.map((coefficient, order) =>
    root.scaleInterval(coefficient, 1 - order)
  );
}

export function evaluateR43CoefficientRows({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branch,
  branchSign,
  hIntervals,
  xInterval = [0, 0],
  solveSlopeInterval = null,
  rho = null,
  shiftedOrder = 1,
  derivativeShiftedOrder = Math.min(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .default_jacobian_shifted_order,
    context.seriesOrder - 1
  ),
} = {}) {
  const shift =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift;
  if (shift + shiftedOrder > context.seriesOrder) {
    throw new Error("seriesOrder is too small for the requested R43 shift");
  }

  const sourceAtX = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval,
  });
  const sourceAtZero = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell,
    branch,
    branchSign,
    hIntervals,
    xInterval: [1, 1],
  });

  const shiftedCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => sourceAtX[shift + index]
  );
  const rootTangentShiftedCoefficients = shiftedCoefficients.map(
    (coefficient, index) => root.scaleInterval(coefficient, index)
  );
  const recomputedJacobianCoefficient = root.subtractIntervals(
    sourceAtOne[shift],
    sourceAtZero[shift]
  );
  const jacobianCoefficient = isProvided(solveSlopeInterval)
    ? numericInterval(solveSlopeInterval)
    : recomputedJacobianCoefficient;
  const recomputedJacobianShiftedCoefficients =
    r43JacobianShiftedCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      shiftedOrder: derivativeShiftedOrder,
    });
  const jacobianShiftedCoefficients = [
    jacobianCoefficient,
    ...recomputedJacobianShiftedCoefficients.slice(1),
  ];
  const secondXDerivativeShiftedCoefficients =
    r43SecondXDerivativeShiftedCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      shiftedOrder: derivativeShiftedOrder,
    });
  const secondXKernelOrder =
    derivativeShiftedOrder >=
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power
      ? derivativeShiftedOrder -
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
          .second_x_derivative_y_power
      : 0;
  const secondXDerivativeKernelCoefficients =
    r43SecondXDerivativeKernelCoefficients({
      context,
      cell,
      branch,
      branchSign,
      hIntervals,
      xInterval,
      kernelOrder: secondXKernelOrder,
    });
  const kernelContinuousMajorant =
    rho === null || rho === undefined
      ? null
      : computeH39KernelContinuousMajorant({
          context,
          cell,
          branch,
          branchSign,
          hIntervals,
          xInterval,
          rho: Number(rho),
        });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-r43-coefficient-rows-evaluated",
    evaluation_level: "coefficient-only",
    branch: branch ?? branchSign,
    x_interval: root.formatInterval(numericInterval(xInterval)),
    r43_source_shift: shift,
    R43_shifted_coefficients: shiftedCoefficients.map(root.formatInterval),
    R43_center_coefficient_interval: root.formatInterval(sourceAtX[shift]),
    R43_jacobian_coefficient_interval:
      root.formatInterval(jacobianCoefficient),
    R43_recomputed_interval_jacobian_coefficient_interval:
      root.formatInterval(recomputedJacobianCoefficient),
    R43_jacobian_coefficient_source: isProvided(solveSlopeInterval)
      ? "inherited-formal-recurrence-slope"
      : "recomputed-interval-series-slope",
    R43_jacobian_shifted_coefficients:
      jacobianShiftedCoefficients.map(root.formatInterval),
    R43_recomputed_jacobian_shifted_coefficients:
      recomputedJacobianShiftedCoefficients.map(root.formatInterval),
    R43_second_x_coefficient_interval: root.formatInterval([0, 0]),
    R43_second_x_derivative_lowest_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    R43_second_x_kernel_identity:
      "partial_X^2 R43 = y^41 K_epsilon",
    R43_second_x_kernel_formula:
      "K_epsilon = 2/nu^2 - sin(delta_epsilon) - sin(phi_epsilon)",
    R43_second_x_kernel_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    R43_second_x_kernel_coefficients:
      secondXDerivativeKernelCoefficients.map(root.formatInterval),
    R43_second_x_kernel_delta_coefficient_seminorm_rho:
      kernelContinuousMajorant
        ?.R43_second_x_kernel_delta_coefficient_seminorm_rho ?? null,
    R43_second_x_kernel_phi_coefficient_seminorm_rho:
      kernelContinuousMajorant
        ?.R43_second_x_kernel_phi_coefficient_seminorm_rho ?? null,
    R43_second_x_kernel_speed_min:
      kernelContinuousMajorant?.R43_second_x_kernel_speed_min ?? null,
    R43_second_x_kernel_speed_term:
      kernelContinuousMajorant?.R43_second_x_kernel_speed_term ?? null,
    R43_second_x_kernel_continuous_majorant_formula:
      kernelContinuousMajorant
        ?.R43_second_x_kernel_continuous_majorant_formula ?? null,
    R43_second_x_kernel_continuous_majorant:
      kernelContinuousMajorant?.R43_second_x_kernel_continuous_majorant ??
      null,
    R43_jacobian_lipschitz_reduced_continuous_majorant_formula:
      kernelContinuousMajorant
        ?.R43_jacobian_lipschitz_reduced_continuous_majorant_formula ??
      null,
    R43_jacobian_lipschitz_reduced_continuous_majorant:
      kernelContinuousMajorant
        ?.R43_jacobian_lipschitz_reduced_continuous_majorant ?? null,
    R43_second_x_kernel_continuous_majorant_evaluation:
      kernelContinuousMajorant,
    R43_second_x_derivative_kernel_factor_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    R43_second_x_derivative_kernel_coefficients:
      secondXDerivativeKernelCoefficients.map(root.formatInterval),
    R43_second_x_derivative_shifted_coefficients:
      secondXDerivativeShiftedCoefficients.map(root.formatInterval),
    y_partial_y_R43_shifted_coefficients:
      rootTangentShiftedCoefficients.map(root.formatInterval),
    coefficient_only_claim:
      "The h39 leading shifted source coefficient is affine in X at this order, the removable X-Jacobian row is explicit, and the second-X row starts at y^41. Continuous E_R, nu_J, L_J, and M_R still require a graph-centered polydisc evaluator with remainders.",
    certifies_continuous_polydisc_primitives: false,
  };
}

export function evaluateNGCoefficientRows({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  shiftedOrder = 1,
} = {}) {
  assertCell(cell);
  if (!Array.isArray(branchInputs) || branchInputs.length !== 2) {
    throw new Error("branchInputs must contain the two fold-pair branches");
  }

  const shift = THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift;
  if (shift + shiftedOrder > context.seriesOrder) {
    throw new Error("seriesOrder is too small for the requested N_G shift");
  }

  const branchSeries = branchInputs.map((input) =>
    branchGSeries({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      xInterval: input.xInterval ?? [0, 0],
    })
  );
  const pairG = context.add(branchSeries[0], branchSeries[1]);
  const pairD = transformedDSeries({ context, pairGSeries: pairG });
  const nGCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => pairG[shift + index]
  );
  const nDCoefficients = Array.from(
    { length: shiftedOrder + 1 },
    (_, index) => pairD[shift + index]
  );
  const identityWitnesses = nDCoefficients.map((coefficient, index) =>
    root.addIntervals(
      coefficient,
      root.scaleInterval(nGCoefficients[index], 40 + index)
    )
  );

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-n-g-coefficient-rows-evaluated",
    evaluation_level: "coefficient-only",
    n_g_shift: shift,
    N_G_shifted_coefficients: nGCoefficients.map(root.formatInterval),
    N_D_shifted_coefficients: nDCoefficients.map(root.formatInterval),
    D_plus_40_plus_k_G_identity_witnesses:
      identityWitnesses.map(root.formatInterval),
    all_D_plus_40_plus_k_G_identity_witnesses_contain_zero:
      identityWitnesses.every(([left, right]) => left <= 0 && right >= 0),
    coefficient_only_claim:
      "The shifted coefficients are exact interval-series coefficients of the post-h38 numerator. A continuous M_G bound still requires a shared graph-centered polydisc evaluator with analytic remainder control.",
    certifies_continuous_polydisc_primitives: false,
  };
}

export function evaluateH39SharedDomainCoefficientCell({
  context = makeTheta3minusFirstYGdSeriesContext(),
  cell,
  branchInputs,
  shiftedOrder = 1,
  rho = null,
} = {}) {
  if (!Array.isArray(branchInputs) || branchInputs.length !== 2) {
    throw new Error("branchInputs must contain the two fold-pair branches");
  }

  const centerSolves = branchInputs.map((input) =>
    solveH39CenterCoefficientRow({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      solveSlopeInterval: input.solveSlopeInterval,
    })
  );
  const centeredBranchInputs = branchInputs.map((input, index) => ({
    ...input,
    xInterval: centerSolves[index].h39_center_interval,
  }));
  const r43Rows = centeredBranchInputs.map((input) =>
    evaluateR43CoefficientRows({
      context,
      cell,
      branch: input.branch,
      branchSign: input.branchSign,
      hIntervals: input.hIntervals,
      xInterval: input.xInterval,
      solveSlopeInterval: input.solveSlopeInterval,
      rho,
      shiftedOrder,
    })
  );
  const nGRow = evaluateNGCoefficientRows({
    context,
    cell,
    branchInputs: centeredBranchInputs,
    shiftedOrder,
  });
  const finitePrefixSummary = summarizeSharedDomainPrimitiveBounds({
    r43Rows,
    nGRows: [nGRow],
    rho,
  });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-shared-domain-coefficient-cell-evaluated",
    evaluation_level: "coefficient-only",
    rho,
    shifted_order: shiftedOrder,
    h39_center_solves: centerSolves,
    r43_rows: r43Rows,
    n_g_row: nGRow,
    finite_prefix_summary: finitePrefixSummary,
    claim_boundary: {
      computes_h39_shared_domain_coefficient_prefixes: true,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      retained_branch: false,
    },
  };
}

function maxAbsFormattedInterval(intervalText) {
  const [left, right] = Array.isArray(intervalText)
    ? intervalText.map(Number)
    : intervalText
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map(Number);
  return Math.max(Math.abs(left), Math.abs(right));
}

export function summarizeSharedDomainPrimitiveBounds({
  r43Rows = [],
  nGRows = [],
  rho = null,
} = {}) {
  const r43CenterCoefficients = r43Rows
    .map((row) => row.R43_center_coefficient_interval)
    .filter(Boolean);
  const nGCoefficients = nGRows
    .flatMap((row) => row.N_G_shifted_coefficients ?? [])
    .filter(Boolean);
  const r43CoefficientLists = r43Rows
    .map((row) => row.R43_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const yPartialCoefficientLists = r43Rows
    .map((row) => row.y_partial_y_R43_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const jacobianCoefficientLists = r43Rows
    .map((row) => row.R43_jacobian_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const secondXCoefficientLists = r43Rows
    .map((row) => row.R43_second_x_derivative_shifted_coefficients ?? [])
    .filter((row) => row.length > 0);
  const secondXKernelCoefficientLists = r43Rows
    .map(
      (row) =>
        row.R43_second_x_kernel_coefficients ??
        row.R43_second_x_derivative_kernel_coefficients ??
        []
    )
    .filter((row) => row.length > 0);
  const kernelContinuousMajorants = r43Rows
    .map((row) => row.R43_second_x_kernel_continuous_majorant)
    .filter((value) => Number.isFinite(Number(value)))
    .map(Number);
  const reducedLJContinuousMajorants = r43Rows
    .map((row) => row.R43_jacobian_lipschitz_reduced_continuous_majorant)
    .filter((value) => Number.isFinite(Number(value)))
    .map(Number);
  const secondXKernelFactorPower =
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
      .second_x_derivative_y_power;
  const rhoProvided = rho !== null && rho !== undefined;
  const candidateLJFinitePrefix =
    rhoProvided && secondXCoefficientLists.length > 0
      ? Math.max(
          ...secondXCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateMKFinitePrefix =
    rhoProvided && secondXKernelCoefficientLists.length > 0
      ? Math.max(
          ...secondXKernelCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateLJFactoredFinitePrefix =
    rhoProvided && secondXKernelCoefficientLists.length > 0
      ? Math.max(
          ...secondXKernelCoefficientLists.map((coefficients) =>
            computeYPowerFactoredCoefficientPrefixMajorant(
              coefficients,
              rho,
              secondXKernelFactorPower
            )
          )
        )
      : null;
  const candidateERFinitePrefix =
    rhoProvided && r43CoefficientLists.length > 0
      ? Math.max(
          ...r43CoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateMRFinitePrefix =
    rhoProvided && yPartialCoefficientLists.length > 0
      ? Math.max(
          ...yPartialCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixMajorant(coefficients, rho)
          )
        )
      : null;
  const candidateNuJFinitePrefix =
    rhoProvided && jacobianCoefficientLists.length > 0
      ? Math.min(
          ...jacobianCoefficientLists.map((coefficients) =>
            computeCoefficientPrefixFloor(coefficients, rho)
          )
        )
      : null;
  const candidateMKContinuousMajorant =
    kernelContinuousMajorants.length > 0
      ? Math.max(...kernelContinuousMajorants)
      : null;
  const candidateLJReducedContinuousMajorant =
    reducedLJContinuousMajorants.length > 0
      ? Math.max(...reducedLJContinuousMajorants)
      : null;
  const candidateMGFinitePrefix =
    rhoProvided && nGCoefficients.length > 0
      ? Math.max(
          ...nGRows.map((row) =>
            computeCoefficientPrefixMajorant(
              row.N_G_shifted_coefficients ?? [],
              rho,
              THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift
            )
          )
        )
      : null;
  const finitePrefixPrimitiveScalarReplay =
    computeH39FinitePrefixPrimitiveScalarReplay({
      candidate_E_R_finite_prefix: candidateERFinitePrefix,
      candidate_nu_J_finite_prefix: candidateNuJFinitePrefix,
      candidate_L_J_reduced_continuous_majorant:
        candidateLJReducedContinuousMajorant,
      candidate_M_G_finite_prefix: candidateMGFinitePrefix,
      candidate_M_R_finite_prefix: candidateMRFinitePrefix,
    });

  return {
    schema: THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    status: "h39-shared-domain-coefficient-summary-emitted",
    evaluation_level: "coefficient-only",
    coefficient_row_count: r43Rows.length + nGRows.length,
    max_abs_R43_center_coefficient:
      r43CenterCoefficients.length === 0
        ? null
        : Math.max(...r43CenterCoefficients.map(maxAbsFormattedInterval)),
    max_abs_N_G_shifted_coefficient:
      nGCoefficients.length === 0
        ? null
        : Math.max(...nGCoefficients.map(maxAbsFormattedInterval)),
    candidate_E_R_finite_prefix: candidateERFinitePrefix,
    candidate_M_R_finite_prefix: candidateMRFinitePrefix,
    candidate_nu_J_finite_prefix: candidateNuJFinitePrefix,
    candidate_L_J_finite_prefix: candidateLJFinitePrefix,
    second_x_kernel_y_power: secondXKernelFactorPower,
    candidate_M_K_finite_prefix: candidateMKFinitePrefix,
    candidate_L_J_factored_finite_prefix: candidateLJFactoredFinitePrefix,
    candidate_L_J_from_kernel_factor_finite_prefix:
      candidateLJFactoredFinitePrefix,
    candidate_L_J_factor_identity_finite_prefix_holds:
      candidateLJFinitePrefix !== null &&
      candidateLJFactoredFinitePrefix !== null
        ? nearlyEqualNumbers(
            candidateLJFinitePrefix,
            candidateLJFactoredFinitePrefix
          )
        : null,
    candidate_M_K_continuous_elementary_majorant:
      candidateMKContinuousMajorant,
    candidate_M_K_continuous_majorant:
      candidateMKContinuousMajorant,
    candidate_L_J_reduced_continuous_elementary_majorant:
      candidateLJReducedContinuousMajorant,
    candidate_L_J_reduced_continuous_majorant:
      candidateLJReducedContinuousMajorant,
    candidate_L_J_reduced_continuous_majorant_source:
      reducedLJContinuousMajorants.length > 0
        ? "kernel-continuous-majorant"
        : null,
    candidate_M_G_finite_prefix: candidateMGFinitePrefix,
    candidate_finite_prefix_primitive_scalar_replay:
      finitePrefixPrimitiveScalarReplay,
    E_R: null,
    nu_J: null,
    L_J: null,
    M_R: null,
    M_G: null,
    certifies_continuous_polydisc_primitives: false,
    first_successor:
      "upgrade coefficient-only rows into directed-rounded shared-domain E_R, nu_J, L_J, M_G, and M_R bounds with analytic remainders",
  };
}

function h38RowsFromArtifact(artifact) {
  const rows =
    artifact?.thirty_eighth_order_post_u_successor_coefficient_rows;
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error(
      "h38 artifact must contain thirty_eighth_order_post_u_successor_coefficient_rows"
    );
  }
  return rows;
}

function branchInputsFromH38Row(row) {
  if (!Array.isArray(row?.branch_rows) || row.branch_rows.length !== 2) {
    throw new Error("h38 row must contain exactly two branch_rows");
  }
  return row.branch_rows.map((branchRow) => ({
    branch: branchRow.branch,
    hIntervals: hIntervalsFromBranchRow(branchRow, { hCount: 39 }),
    solveSlopeInterval: numericInterval(branchRow.h38_solve_slope_interval),
  }));
}

export function evaluateH39SharedDomainCoefficientRows({
  context = makeTheta3minusFirstYGdSeriesContext(),
  h38Rows,
  shiftedOrder = 1,
  rho = null,
  rowLimit = null,
} = {}) {
  if (!Array.isArray(h38Rows) || h38Rows.length === 0) {
    throw new Error("h38Rows must be a nonempty array");
  }
  const selectedRows =
    rowLimit === null || rowLimit === undefined
      ? h38Rows
      : h38Rows.slice(0, Number(rowLimit));

  return selectedRows.map((row, index) => {
    const coefficientCell = evaluateH39SharedDomainCoefficientCell({
      context,
      cell: cellFromCertificateRow(row),
      branchInputs: branchInputsFromH38Row(row),
      shiftedOrder,
      rho,
    });
    return {
      cell_id: row.cell_id ?? `h38-row.${index}`,
      speed_interval: row.speed_interval,
      first_y_cell: row.first_y_cell,
      h38_row_status: row.row_status ?? null,
      h39_coefficient_cell: coefficientCell,
      row_status: "h39-shared-domain-coefficient-row-evaluated",
    };
  });
}

function summarizeH39CoefficientRows({ rows, h38ValidationErrors = null }) {
  const cells = rows.map((row) => row.h39_coefficient_cell);
  const r43Rows = cells.flatMap((cell) => cell.r43_rows);
  const nGRows = cells.map((cell) => cell.n_g_row);
  const centerSolves = cells.flatMap((cell) => cell.h39_center_solves);
  const finitePrefixSummaries = cells.map((cell) => cell.finite_prefix_summary);
  const allDIdentityWitnessesContainZero = nGRows.every(
    (row) => row.all_D_plus_40_plus_k_G_identity_witnesses_contain_zero === true
  );
  const allCenteredLeadingR43ContainsZero = r43Rows.every((row) => {
    const interval = parseFormattedInterval(row.R43_center_coefficient_interval);
    return interval[0] <= 0 && interval[1] >= 0;
  });
  const jacobianClearances = r43Rows.map((row) =>
    intervalClearanceFromZero(
      parseFormattedInterval(row.R43_jacobian_coefficient_interval)
    )
  );
  const aggregateCandidateERFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_E_R_finite_prefix
    )
  );
  const aggregateCandidateMRFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_R_finite_prefix
    )
  );
  const aggregateCandidateNuJFinitePrefix = finiteMin(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_nu_J_finite_prefix
    )
  );
  const aggregateCandidateLJReducedContinuousMajorant = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_L_J_reduced_continuous_majorant
    )
  );
  const aggregateCandidateMGFinitePrefix = finiteMax(
    finitePrefixSummaries.map(
      (summary) => summary.candidate_M_G_finite_prefix
    )
  );
  const aggregateFinitePrefixPrimitiveScalarReplay =
    computeH39FinitePrefixPrimitiveScalarReplay({
      candidate_E_R_finite_prefix: aggregateCandidateERFinitePrefix,
      candidate_nu_J_finite_prefix: aggregateCandidateNuJFinitePrefix,
      candidate_L_J_reduced_continuous_majorant:
        aggregateCandidateLJReducedContinuousMajorant,
      candidate_M_G_finite_prefix: aggregateCandidateMGFinitePrefix,
      candidate_M_R_finite_prefix: aggregateCandidateMRFinitePrefix,
    });

  return {
    h38_artifact_validation_error_count: Array.isArray(h38ValidationErrors)
      ? h38ValidationErrors.length
      : null,
    h38_artifact_valid: Array.isArray(h38ValidationErrors)
      ? h38ValidationErrors.length === 0
      : null,
    coefficient_row_count: rows.length,
    branch_coefficient_row_count: r43Rows.length,
    all_centered_leading_R43_coefficients_contain_zero:
      allCenteredLeadingR43ContainsZero,
    all_shifted_D_identity_witnesses_contain_zero:
      allDIdentityWitnessesContainZero,
    h39_center_interval_hull: intervalHullFromFormatted(
      centerSolves.map((solve) => solve.h39_center_interval)
    ),
    h39_jacobian_coefficient_interval_hull: intervalHullFromFormatted(
      r43Rows.map((row) => row.R43_jacobian_coefficient_interval)
    ),
    min_h39_jacobian_coefficient_clearance:
      finiteMin(jacobianClearances),
    max_abs_R43_center_coefficient: maxAbsFormattedIntervals(
      r43Rows.map((row) => row.R43_center_coefficient_interval)
    ),
    max_abs_R43_jacobian_coefficient: maxAbsFormattedIntervals(
      r43Rows.map((row) => row.R43_jacobian_coefficient_interval)
    ),
    max_abs_N_G_shifted_coefficient: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.max_abs_N_G_shifted_coefficient
      )
    ),
    max_candidate_E_R_finite_prefix: aggregateCandidateERFinitePrefix,
    max_candidate_M_R_finite_prefix: aggregateCandidateMRFinitePrefix,
    min_candidate_nu_J_finite_prefix: aggregateCandidateNuJFinitePrefix,
    max_candidate_L_J_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_L_J_finite_prefix
      )
    ),
    max_candidate_M_K_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_M_K_finite_prefix
      )
    ),
    max_candidate_L_J_factored_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_L_J_factored_finite_prefix
      )
    ),
    max_candidate_L_J_from_kernel_factor_finite_prefix: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_L_J_factored_finite_prefix
      )
    ),
    max_candidate_M_K_continuous_elementary_majorant: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_M_K_continuous_elementary_majorant
      )
    ),
    max_candidate_M_K_continuous_majorant: finiteMax(
      finitePrefixSummaries.map(
        (summary) => summary.candidate_M_K_continuous_majorant
      )
    ),
    max_candidate_L_J_reduced_continuous_elementary_majorant: finiteMax(
      finitePrefixSummaries.map(
        (summary) =>
          summary.candidate_L_J_reduced_continuous_elementary_majorant
      )
    ),
    max_candidate_L_J_reduced_continuous_majorant:
      aggregateCandidateLJReducedContinuousMajorant,
    all_candidate_L_J_factor_identities_hold:
      finitePrefixSummaries.length > 0
        ? finitePrefixSummaries.every(
            (summary) =>
              summary.candidate_L_J_factor_identity_finite_prefix_holds ===
              true
          )
        : null,
    max_candidate_M_G_finite_prefix: aggregateCandidateMGFinitePrefix,
    candidate_finite_prefix_primitive_scalar_replay:
      aggregateFinitePrefixPrimitiveScalarReplay,
    candidate_finite_prefix_scalar_replay_closes:
      aggregateFinitePrefixPrimitiveScalarReplay.candidate_scalar_replay_closes,
    candidate_finite_prefix_scalar_replay_ratio:
      aggregateFinitePrefixPrimitiveScalarReplay
        .candidate_rouche_primitive_closure_ratio,
    candidate_finite_prefix_scalar_replay_rho_X:
      aggregateFinitePrefixPrimitiveScalarReplay.candidate_rho_X,
    candidate_finite_prefix_scalar_replay_r_X:
      aggregateFinitePrefixPrimitiveScalarReplay.candidate_r_X,
    second_x_kernel_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    second_x_derivative_lowest_y_power:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS
        .second_x_derivative_y_power,
    certifies_continuous_polydisc_primitives: false,
    first_successor:
      "replace finite-prefix candidates with outward-rounded shared-domain E_R, nu_J, L_J, M_G, and M_R bounds with analytic remainders",
  };
}

export function buildH39SharedDomainCoefficientArtifact({
  h38Artifact,
  h38Rows,
  validateH38 = true,
  shiftedOrder = 1,
  seriesOrder = null,
  rho = null,
  rowLimit = null,
  includeRows = true,
} = {}) {
  const sourceRows = h38Rows ?? h38RowsFromArtifact(h38Artifact);
  const h38ValidationErrors =
    h38Artifact && validateH38 ? validateH38Artifact(h38Artifact) : null;
  const minimumSeriesOrder = Math.max(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.default_series_order,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      Number(shiftedOrder),
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift +
      Number(shiftedOrder)
  );
  const context = makeTheta3minusFirstYGdSeriesContext({
    seriesOrder:
      seriesOrder === null || seriesOrder === undefined
        ? minimumSeriesOrder
        : Math.max(Number(seriesOrder), minimumSeriesOrder),
  });
  const rows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: sourceRows,
    shiftedOrder,
    rho,
    rowLimit,
  });
  const summary = summarizeH39CoefficientRows({
    rows,
    h38ValidationErrors,
  });

  return {
    schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
    coefficient_engine_schema:
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    packet_id:
      "theta3minus_fold_pair_first_y_gd_h39_shared_domain_coefficient_artifact",
    promotion_status:
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    source_h38_row_key:
      "thirty_eighth_order_post_u_successor_coefficient_rows",
    coefficient_artifact_parameters: {
      speed_constraint:
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.no_speed_window,
      shifted_order: shiftedOrder,
      requested_series_order: seriesOrder,
      rho,
      row_limit: rowLimit,
      h38_rows_available: sourceRows.length,
      h38_rows_evaluated: rows.length,
      series_order: context.seriesOrder,
      first_y_cell_upper:
        THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.first_y_cell_upper,
      coefficient_only: true,
    },
    h39_shared_domain_coefficient_rows: includeRows ? rows : [],
    h39_shared_domain_coefficient_summary: summary,
    claim_boundary: {
      assumes_fixed_speed_window: false,
      consumes_h38_successor_rows: true,
      computes_h39_shared_domain_coefficient_prefixes: true,
      certifies_h39_primitive_series_provenance_on_one_declared_coefficient_domain:
        true,
      certifies_directed_rounded_shared_domain: false,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound: false,
      certifies_directed_rounded_h39_jacobian_lower_bound: false,
      certifies_directed_rounded_h39_jacobian_lipschitz_bound: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
    },
    result: {
      theory_status:
        "h39-shared-domain-coefficient-artifact-emitted",
      retention: "not_retained",
      retained_branch: false,
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-h39-shared-domain-continuous-primitive-bounds-required",
      status_note:
        "The actual h38 branch rows now feed one h39 coefficient-domain evaluator for R43, its X Jacobian, y-partial row, N_G, and the correlated D identity. Continuous primitive bounds remain open.",
    },
  };
}

function findForbiddenSpeedBandFields(value, trail = "$", found = []) {
  if (value === null || typeof value !== "object") {
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) =>
      findForbiddenSpeedBandFields(item, `${trail}[${index}]`, found)
    );
    return found;
  }
  for (const [key, child] of Object.entries(value)) {
    const childTrail = `${trail}.${key}`;
    if (
      key === "speed_band" ||
      key === "speed_window" ||
      key === "speed_min" ||
      key === "speed_max"
    ) {
      found.push(childTrail);
    }
    findForbiddenSpeedBandFields(child, childTrail, found);
  }
  return found;
}

function assertValidationField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateH39SharedDomainCoefficientArtifact(artifact) {
  const errors = [];
  const summary = artifact?.h39_shared_domain_coefficient_summary ?? {};
  const rows = artifact?.h39_shared_domain_coefficient_rows ?? [];
  const forbiddenSpeedFields = findForbiddenSpeedBandFields(artifact);

  assertValidationField(
    forbiddenSpeedFields.length === 0,
    `h39 coefficient artifact must not contain speed-band fields: ${forbiddenSpeedFields.join(
      ", "
    )}`,
    errors
  );
  assertValidationField(
    artifact?.schema ===
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
    "schema must match h39 shared-domain coefficient artifact schema",
    errors
  );
  assertValidationField(
    artifact?.coefficient_engine_schema ===
      THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
    "coefficient engine schema must match h39 shared-domain evaluator schema",
    errors
  );
  assertValidationField(
    artifact?.promotion_status ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
    "promotion status must remain priority-only",
    errors
  );
  assertValidationField(
    artifact?.coefficient_artifact_parameters?.speed_constraint ===
      THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.no_speed_window &&
      artifact?.claim_boundary?.assumes_fixed_speed_window === false,
    "h39 coefficient artifact must not impose a fixed speed window",
    errors
  );
  assertValidationField(
    artifact?.coefficient_artifact_parameters?.coefficient_only === true &&
      artifact?.claim_boundary?.computes_h39_shared_domain_coefficient_prefixes ===
        true &&
      artifact?.claim_boundary
        ?.certifies_h39_primitive_series_provenance_on_one_declared_coefficient_domain ===
        true,
    "h39 coefficient artifact must identify coefficient-only provenance",
    errors
  );
  assertValidationField(
    artifact?.claim_boundary?.certifies_directed_rounded_shared_domain ===
      false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_h39_polydisc_M_G_bound === false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_h39_root_tangent_numerator_M_R_bound ===
        false &&
      artifact?.claim_boundary
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      artifact?.claim_boundary?.retained_branch === false,
    "h39 coefficient artifact must not certify shared-domain, continuous tail, or retention closure",
    errors
  );
  assertValidationField(
    summary.certifies_continuous_polydisc_primitives === false &&
      artifact?.result?.retention === "not_retained" &&
      artifact?.result?.retained_branch === false,
    "h39 coefficient summary and result must remain not retained and not continuous",
    errors
  );

  if (rows.length > 0) {
    assertValidationField(
      summary.coefficient_row_count === rows.length,
      "summary coefficient row count must equal emitted row count",
      errors
    );
    assertValidationField(
      rows.every(
        (row) =>
          row.row_status === "h39-shared-domain-coefficient-row-evaluated" &&
          row.h39_coefficient_cell?.claim_boundary
            ?.certifies_directed_rounded_shared_domain === false
      ),
      "every emitted h39 coefficient row must remain coefficient-only",
      errors
    );
    assertValidationField(
      summary.all_centered_leading_R43_coefficients_contain_zero === true &&
        summary.all_shifted_D_identity_witnesses_contain_zero === true,
      "emitted h39 rows must preserve centered R43 zero containment and shifted D identity witnesses",
      errors
    );
  }

  return errors;
}

function parseNumberArg(name, value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`${name} must be numeric`);
  }
  return parsed;
}

function parseArgs(argv) {
  const options = {};
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--h38-artifact") {
      options.h38Artifact = argv[++index];
    } else if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--row-limit") {
      options.rowLimit = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--shifted-order") {
      options.shiftedOrder = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--series-order") {
      options.seriesOrder = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho") {
      options.rho = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--no-rows") {
      options.includeRows = false;
    } else if (arg === "--pretty") {
      options.pretty = true;
    } else if (arg === "--schema") {
      options.schema = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }
  return options;
}

function usage() {
  return [
    "Usage: node scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs [options]",
    "",
    "Options:",
    "  --h38-artifact <path>  Read an existing h38 successor coefficient artifact JSON",
    "  --out <path>           Write h39 coefficient artifact JSON",
    "  --validate <path>      Validate an emitted h39 coefficient artifact JSON",
    "  --row-limit <n>        Evaluate only the first n h38 rows",
    "  --shifted-order <n>    Number of shifted coefficients after the h39 leading row",
    "  --series-order <n>     Override the interval-series order when sweeping deeper prefixes",
    "  --rho <n>              Radius used for finite-prefix candidate seminorms",
    "  --no-rows              Omit per-cell coefficient rows from output",
    "  --pretty               Pretty-print JSON output",
    "  --schema               Print artifact schema metadata",
  ].join("\n");
}

function writeJson(value, outPath, pretty) {
  const output = `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
  if (outPath) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, output);
  } else {
    process.stdout.write(output);
  }
}

function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  if (options.schema) {
    writeJson(
      {
        evaluator_schema:
          THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
        artifact_schema:
          THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
        promotion_status:
          THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.promotion_status,
      },
      null,
      options.pretty
    );
    return;
  }

  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors = validateH39SharedDomainCoefficientArtifact(artifact);
    writeJson(
      {
        valid: errors.length === 0,
        errors,
        retained_branch: artifact?.result?.retained_branch ?? null,
      },
      null,
      options.pretty
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  if (!options.h38Artifact) {
    console.error("--h38-artifact is required unless --schema or --validate is used");
    console.error(usage());
    process.exitCode = 1;
    return;
  }

  try {
    const h38Artifact = JSON.parse(fs.readFileSync(options.h38Artifact, "utf8"));
    const artifact = buildH39SharedDomainCoefficientArtifact({
      h38Artifact,
      shiftedOrder: options.shiftedOrder ?? 1,
      seriesOrder: options.seriesOrder ?? null,
      rho: options.rho ?? null,
      rowLimit: options.rowLimit ?? null,
      includeRows: options.includeRows !== false,
    });
    const errors = validateH39SharedDomainCoefficientArtifact(artifact);
    if (errors.length > 0) {
      throw new Error(`artifact validation failed: ${errors.join("; ")}`);
    }
    writeJson(artifact, options.out, options.pretty);
  } catch (error) {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
