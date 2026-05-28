#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA =
  "neutral-swarm-octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget/v1";

const PACKET_ID =
  "octahedral_fold_aware_cross_binary_theta3minus_speed_dependent_fold_pair_first_y_gd_root_tangent_cauchy_majorant_tail_budget";
const PROMOTION_STATUS = "priority-only";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";
const FIRST_Y_CELL_UPPER = 0.115 / 64;
const DEFAULT_RADIUS_MULTIPLE = 4;
const DEFAULT_XI_OVER_SIGMA_X = 0;
const H39_SHIFT_POWER = 41;
const D_IDENTITY_COEFFICIENT = 40;
const B_G_39 = 1.01837521179e106;
const B_D_39 = 1.01830785559e106;
const DEFAULT_PROFILE_SCALE_TOLERANCE = 1e-10;
const DEFAULT_PROFILE_SCALE_MAX_ITERATIONS = 80;
const DEFAULT_PROFILE_SCALE_SEARCH_LIMIT = 1e12;

function isProvided(value) {
  return value !== undefined && value !== null;
}

function assertFinitePositive(name, value) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new Error(`${name} must be a finite positive number`);
  }
}

function assertFiniteNonnegative(name, value) {
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`${name} must be a finite nonnegative number`);
  }
}

function approximatelyEqual(left, right, relativeTolerance = 1e-12) {
  if (!Number.isFinite(left) || !Number.isFinite(right)) {
    return false;
  }
  const scale = Math.max(1, Math.abs(left), Math.abs(right));
  return Math.abs(left - right) <= relativeTolerance * scale;
}

function nullableApproximatelyEqual(left, right, relativeTolerance = 1e-12) {
  if (right === null) {
    return left === null;
  }
  return approximatelyEqual(Number(left), right, relativeTolerance);
}

export function computeH39RootGraphRoucheRadiusWindow({
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
} = {}) {
  const hasAnyRootGraphInput = [
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
  ].some(isProvided);

  if (!hasAnyRootGraphInput) {
    return {
      root_graph_lift_status: "not-provided",
      center_residual_bound_E_R: null,
      center_jacobian_lower_bound_nu_J: null,
      jacobian_lipschitz_bound_L_J: null,
      rouche_radius_discriminant: null,
      rouche_radius_lower_boundary: null,
      rouche_radius_upper_boundary: null,
      rouche_radius_effective_upper_boundary: null,
      rouche_radius_window_nonempty: null,
      rouche_best_sigma_X_supremum: null,
      rouche_radius_window_formula: null,
    };
  }

  if (
    !isProvided(centerResidualBound) ||
    !isProvided(centerJacobianLowerBound) ||
    !isProvided(jacobianLipschitzBound) ||
    !isProvided(rhoX)
  ) {
    throw new Error(
      "centerResidualBound, centerJacobianLowerBound, jacobianLipschitzBound, and rhoX are required together"
    );
  }

  const residualBound = Number(centerResidualBound);
  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const resolvedRhoX = Number(rhoX);
  assertFiniteNonnegative("centerResidualBound", residualBound);
  assertFinitePositive("centerJacobianLowerBound", centerJacobianBound);
  assertFiniteNonnegative("jacobianLipschitzBound", lipschitzBound);
  assertFinitePositive("rhoX", resolvedRhoX);

  if (lipschitzBound === 0) {
    const lowerBoundary = residualBound / centerJacobianBound;
    const nonempty = lowerBoundary < resolvedRhoX;
    return {
      root_graph_lift_status: nonempty
        ? "rouche-radius-window-nonempty"
        : "rouche-radius-window-empty",
      center_residual_bound_E_R: residualBound,
      center_jacobian_lower_bound_nu_J: centerJacobianBound,
      jacobian_lipschitz_bound_L_J: lipschitzBound,
      rouche_radius_discriminant: null,
      rouche_radius_lower_boundary: lowerBoundary,
      rouche_radius_upper_boundary: null,
      rouche_radius_effective_upper_boundary: resolvedRhoX,
      rouche_radius_window_nonempty: nonempty,
      rouche_best_sigma_X_supremum: nonempty
        ? resolvedRhoX - lowerBoundary
        : null,
      rouche_radius_window_formula:
        "L_J=0: choose E_R/nu_J < r_X < rho_X; best sigma_X is approached as rho_X-E_R/nu_J",
    };
  }

  const discriminant =
    centerJacobianBound * centerJacobianBound -
    2 * lipschitzBound * residualBound;
  if (!(discriminant > 0)) {
    return {
      root_graph_lift_status: "rouche-radius-window-empty",
      center_residual_bound_E_R: residualBound,
      center_jacobian_lower_bound_nu_J: centerJacobianBound,
      jacobian_lipschitz_bound_L_J: lipschitzBound,
      rouche_radius_discriminant: discriminant,
      rouche_radius_lower_boundary: null,
      rouche_radius_upper_boundary: null,
      rouche_radius_effective_upper_boundary: null,
      rouche_radius_window_nonempty: false,
      rouche_best_sigma_X_supremum: null,
      rouche_radius_window_formula:
        "L_J>0: require nu_J^2-2*L_J*E_R>0 and choose r_X between the two strict roots",
    };
  }

  const sqrtDiscriminant = Math.sqrt(discriminant);
  const lowerBoundary =
    (2 * residualBound) / (centerJacobianBound + sqrtDiscriminant);
  const upperBoundary =
    (centerJacobianBound + sqrtDiscriminant) / lipschitzBound;
  const effectiveUpperBoundary = Math.min(upperBoundary, resolvedRhoX);
  const nonempty = lowerBoundary < effectiveUpperBoundary;

  return {
    root_graph_lift_status: nonempty
      ? "rouche-radius-window-nonempty"
      : "rouche-radius-window-empty",
    center_residual_bound_E_R: residualBound,
    center_jacobian_lower_bound_nu_J: centerJacobianBound,
    jacobian_lipschitz_bound_L_J: lipschitzBound,
    rouche_radius_discriminant: discriminant,
    rouche_radius_lower_boundary: lowerBoundary,
    rouche_radius_upper_boundary: upperBoundary,
    rouche_radius_effective_upper_boundary: effectiveUpperBoundary,
    rouche_radius_window_nonempty: nonempty,
    rouche_best_sigma_X_supremum: nonempty
      ? resolvedRhoX - lowerBoundary
      : null,
    rouche_radius_window_formula:
      "L_J>0: r_X in (2*E_R/(nu_J+sqrt(nu_J^2-2*L_J*E_R)), min((nu_J+sqrt(nu_J^2-2*L_J*E_R))/L_J,rho_X)); if J_min=nu_J-L_J*rho_X>0, the upper quadratic root does not bind and best sigma_X is approached at the lower boundary",
  };
}

export function computeH39RootGraphRoucheLift({
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
  rX,
} = {}) {
  const radiusWindow = computeH39RootGraphRoucheRadiusWindow({
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
  });

  if (radiusWindow.root_graph_lift_status === "not-provided") {
    return {
      ...radiusWindow,
      root_graph_nonlinear_remainder_bound: null,
      root_graph_jacobian_loss_bound: null,
      derived_jacobian_lower_bound_J_min: null,
      root_graph_rouche_margin: null,
      certifies_unique_root_in_X_disc: null,
      root_graph_lift_formula: null,
    };
  }

  if (!isProvided(rX)) {
    throw new Error("rX is required with the Rouché graph-lift inputs");
  }

  const residualBound = radiusWindow.center_residual_bound_E_R;
  const centerJacobianBound = radiusWindow.center_jacobian_lower_bound_nu_J;
  const lipschitzBound = radiusWindow.jacobian_lipschitz_bound_L_J;
  const resolvedRhoX = Number(rhoX);
  const resolvedRX = Number(rX);
  assertFinitePositive("rX", resolvedRX);
  if (!(resolvedRhoX > resolvedRX)) {
    throw new Error("rhoX must be greater than rX");
  }

  const jacobianLossBound = lipschitzBound * resolvedRhoX;
  const derivedJacobianLowerBound = centerJacobianBound - jacobianLossBound;
  const nonlinearRemainderBound =
    0.5 * lipschitzBound * resolvedRX * resolvedRX;
  const roucheMargin =
    centerJacobianBound * resolvedRX - residualBound - nonlinearRemainderBound;
  const insideRadiusWindow =
    radiusWindow.rouche_radius_window_nonempty === true &&
    resolvedRX > radiusWindow.rouche_radius_lower_boundary &&
    (radiusWindow.rouche_radius_upper_boundary === null ||
      resolvedRX < radiusWindow.rouche_radius_upper_boundary);
  const closes =
    derivedJacobianLowerBound > 0 && roucheMargin > 0 && insideRadiusWindow;

  return {
    ...radiusWindow,
    root_graph_lift_status: closes ? "rouche-certified" : "rouche-open",
    center_residual_bound_E_R: residualBound,
    center_jacobian_lower_bound_nu_J: centerJacobianBound,
    jacobian_lipschitz_bound_L_J: lipschitzBound,
    root_graph_nonlinear_remainder_bound: nonlinearRemainderBound,
    root_graph_jacobian_loss_bound: jacobianLossBound,
    derived_jacobian_lower_bound_J_min: derivedJacobianLowerBound,
    root_graph_rouche_margin: roucheMargin,
    certifies_unique_root_in_X_disc: closes,
    root_graph_lift_formula:
      "E_R+0.5*L_J*r_X^2 < nu_J*r_X, with J_min=nu_J-L_J*rho_X and sigma_X=rho_X-r_X",
  };
}

export function computeH39RootTangentDerivedSlopeRatio({
  rootTangentNumeratorBound,
  jacobianLowerBound,
  sigmaX,
  rhoX,
  rX,
} = {}) {
  const hasAnyDerivedInput = [
    rootTangentNumeratorBound,
    jacobianLowerBound,
    sigmaX,
    rhoX,
    rX,
  ].some(isProvided);

  if (!hasAnyDerivedInput) {
    return {
      root_tangent_input_status: "not-provided",
      root_tangent_numerator_bound: null,
      root_tangent_numerator_bound_M_R: null,
      jacobian_lower_bound: null,
      root_tangent_jacobian_lower_bound_J_min: null,
      rho_X: null,
      X_polydisc_radius_rho_X: null,
      r_X: null,
      X_graph_enclosure_radius_r_X: null,
      sigma_X: null,
      x_cauchy_margin_sigma_X: null,
      derived_Xi_bound: null,
      derived_Xi_star_bound: null,
      root_tangent_Xi_bound: null,
      derived_xi_over_sigma_X: null,
      xi_over_sigma_X_formula: "direct input",
      derived_xi_over_sigma_X_formula: null,
      root_tangent_slope_source: "explicit",
    };
  }

  if (
    !isProvided(rootTangentNumeratorBound) ||
    !isProvided(jacobianLowerBound)
  ) {
    throw new Error(
      "rootTangentNumeratorBound and jacobianLowerBound are required together"
    );
  }

  const numeratorBound = Number(rootTangentNumeratorBound);
  const jLowerBound = Number(jacobianLowerBound);
  assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  assertFinitePositive("jacobianLowerBound", jLowerBound);

  let resolvedRhoX = isProvided(rhoX) ? Number(rhoX) : null;
  let resolvedRX = isProvided(rX) ? Number(rX) : null;
  let resolvedSigmaX = isProvided(sigmaX) ? Number(sigmaX) : null;
  if (isProvided(rhoX) !== isProvided(rX)) {
    throw new Error("rhoX and rX must be provided together");
  }
  if (resolvedRhoX !== null || resolvedRX !== null) {
    assertFinitePositive("rhoX", resolvedRhoX);
    assertFiniteNonnegative("rX", resolvedRX);
    if (!(resolvedRhoX > resolvedRX)) {
      throw new Error("rhoX must be greater than rX");
    }
    const margin = resolvedRhoX - resolvedRX;
    if (resolvedSigmaX !== null && Math.abs(resolvedSigmaX - margin) > 0) {
      throw new Error("sigmaX must equal rhoX-rX when all are provided");
    }
    resolvedSigmaX = margin;
  }
  assertFinitePositive("sigmaX", resolvedSigmaX);

  const derivedXiBound = numeratorBound / jLowerBound;
  const derivedXiOverSigmaX = derivedXiBound / resolvedSigmaX;

  return {
    root_tangent_input_status: "derived-from-R43-J-sigma",
    root_tangent_residual: "R_{epsilon,43}",
    root_tangent_numerator_bound: numeratorBound,
    root_tangent_numerator_bound_M_R: numeratorBound,
    jacobian_lower_bound: jLowerBound,
    root_tangent_jacobian_lower_bound_J_min: jLowerBound,
    rho_X: resolvedRhoX,
    X_polydisc_radius_rho_X: resolvedRhoX,
    r_X: resolvedRX,
    X_graph_enclosure_radius_r_X: resolvedRX,
    sigma_X: resolvedSigmaX,
    x_cauchy_margin_sigma_X: resolvedSigmaX,
    derived_Xi_bound: derivedXiBound,
    derived_Xi_star_bound: derivedXiBound,
    root_tangent_Xi_bound: derivedXiBound,
    derived_xi_over_sigma_X: derivedXiOverSigmaX,
    xi_over_sigma_X_formula:
      "root_tangent_Xi_bound/sigma_X with root_tangent_Xi_bound=root_tangent_numerator_bound/jacobian_lower_bound",
    derived_xi_over_sigma_X_formula: "M_R/(J_min*sigma_X)",
    root_tangent_slope_formula:
      "Xi_*/sigma_X <= M_R/(J_min*sigma_X), where M_R>=sup|y partial_y R_epsilon,43| and J_min<=inf|J_epsilon|",
    root_tangent_slope_source: "derived-from-root-tangent-inputs",
  };
}

export function computeH39RootTangentCauchyMajorantBudget({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  xiOverSigmaX = DEFAULT_XI_OVER_SIGMA_X,
} = {}) {
  assertFinitePositive("radiusMultiple", radiusMultiple);
  assertFiniteNonnegative("xiOverSigmaX", xiOverSigmaX);

  const rho = radiusMultiple * FIRST_Y_CELL_UPPER;
  if (!(rho > FIRST_Y_CELL_UPPER)) {
    throw new Error("rho must be greater than the first-y collar radius");
  }

  const q = FIRST_Y_CELL_UPPER / rho;
  const oneMinusQ = 1 - q;
  const rhoPower = Math.pow(rho, H39_SHIFT_POWER);
  const slopeRatio = xiOverSigmaX;
  const dTailSlopeCoefficient = D_IDENTITY_COEFFICIENT + slopeRatio;
  const gTailMgThreshold = B_G_39 * rhoPower * oneMinusQ;
  const dTailDenominator =
    D_IDENTITY_COEFFICIENT / oneMinusQ +
    q / Math.pow(oneMinusQ, 2) +
    slopeRatio / oneMinusQ;
  const dTailMgThreshold = (B_D_39 * rhoPower) / dTailDenominator;
  const activeBottleneck =
    dTailMgThreshold < gTailMgThreshold ? "D_tail" : "G_tail";
  const dOverGRatio =
    dTailMgThreshold / gTailMgThreshold;
  const gTailLogDerivative =
    (H39_SHIFT_POWER - 1) / radiusMultiple + 1 / (radiusMultiple - 1);
  const dTailLogDerivative =
    (H39_SHIFT_POWER - 1) / radiusMultiple +
    2 / (radiusMultiple - 1) -
    dTailSlopeCoefficient /
      (dTailSlopeCoefficient * (radiusMultiple - 1) + 1);
  const dTailLogDerivativeLowerBound =
    (H39_SHIFT_POWER - 1) / radiusMultiple + 1 / (radiusMultiple - 1);

  return {
    first_y_cell_upper: FIRST_Y_CELL_UPPER,
    radius_multiple: radiusMultiple,
    rho,
    q,
    one_minus_q: oneMinusQ,
    h39_shift_power: H39_SHIFT_POWER,
    rho_power_41: rhoPower,
    B_G_39,
    B_D_39,
    xi_over_sigma_X: xiOverSigmaX,
    d_identity_coefficient: D_IDENTITY_COEFFICIENT,
    d_tail_denominator: dTailDenominator,
    G_tail_M_G_threshold: gTailMgThreshold,
    D_tail_M_G_threshold: dTailMgThreshold,
    D_over_G_threshold_ratio: dOverGRatio,
    active_bottleneck: activeBottleneck,
    D_tail_active_bottleneck_for_all_radius_and_slope: true,
    D_over_G_ratio_formula:
      "(B_D_39/B_G_39)/(40+Xi_*/sigma_X+1/(s-1))",
    normalized_G_tail_threshold_formula:
      "B_G_39*Y^41*s^40*(s-1)",
    normalized_D_tail_threshold_formula:
      "B_D_39*Y^41*s^40*(s-1)^2/(((40+Xi_*/sigma_X)*(s-1))+1)",
    radius_monotonicity_variable: "s=rho/Y>1",
    G_tail_log_derivative_wrt_s: gTailLogDerivative,
    D_tail_log_derivative_wrt_s: dTailLogDerivative,
    D_tail_log_derivative_lower_bound: dTailLogDerivativeLowerBound,
    thresholds_strictly_increase_with_radius: true,
  };
}

export function computeH39RootTangentSlopeEnvelope({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
} = {}) {
  assertFinitePositive("radiusMultiple", radiusMultiple);
  if (mGBound === undefined || mGBound === null) {
    return {
      candidate_M_G_bound: null,
      candidate_normalized_M_G: null,
      maximum_admissible_xi_over_sigma_X: null,
      slope_envelope_status: "open: provide a directed-rounded M_G bound",
    };
  }

  const candidateMGBound = Number(mGBound);
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  if (candidateMGBound === 0) {
    return {
      candidate_M_G_bound: 0,
      candidate_normalized_M_G: 0,
      maximum_admissible_xi_over_sigma_X: null,
      slope_envelope_status: "unbounded-for-zero-M_G-bound",
    };
  }

  const rho = radiusMultiple * FIRST_Y_CELL_UPPER;
  const q = FIRST_Y_CELL_UPPER / rho;
  const oneMinusQ = 1 - q;
  const rhoPower = Math.pow(rho, H39_SHIFT_POWER);
  const numeratorScale = B_D_39 * rhoPower;
  const maximumAdmissibleXiOverSigmaX =
    oneMinusQ * numeratorScale / candidateMGBound -
    D_IDENTITY_COEFFICIENT -
    q / oneMinusQ;

  return {
    candidate_M_G_bound: candidateMGBound,
    candidate_normalized_M_G:
      candidateMGBound /
      (B_D_39 * Math.pow(FIRST_Y_CELL_UPPER, H39_SHIFT_POWER)),
    maximum_admissible_xi_over_sigma_X: maximumAdmissibleXiOverSigmaX,
    slope_envelope_formula:
      "(1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q)",
    normalized_slope_envelope_formula:
      "s^40*(s-1)/mu_D - 40 - 1/(s-1), where mu_D=M_G/(B_D_39*Y^41)",
    slope_envelope_status:
      maximumAdmissibleXiOverSigmaX >= 0
        ? "nonnegative-slope-budget-available"
        : "no-nonnegative-slope-budget",
  };
}

function emptyRouchePrimitiveClosure(status) {
  return {
    rouche_primitive_closure_status: status,
    rouche_primitive_h39_report_status: status,
    rouche_primitive_closure_formula:
      "M_G*(40+M_R/((nu_J-L_J*rho_X)*(rho_X-r_X))+1/(s-1))/(B_D_39*Y^41*s^40*(s-1))",
    rouche_primitive_h39_closure_ratio_formula:
      "Lambda_39^prim=M_G*(40+M_R/((nu_J-L_J*rho_X)*(rho_X-r_X))+1/(s-1))/(B_D_39*Y^41*s^40*(s-1))",
    rouche_primitive_required_inputs:
      "E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R on one shared graph-centered polydisc",
    candidate_rouche_primitive_closure_left_scalar: null,
    candidate_rouche_primitive_closure_right_scalar: null,
    candidate_rouche_primitive_closure_ratio: null,
    candidate_rouche_primitive_certificate_closes: null,
    candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim: null,
    candidate_rouche_primitive_h39_closure_ratio_margin_to_one: null,
    candidate_rouche_primitive_h39_closure_ratio_below_one: null,
    maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs:
      null,
    rouche_form_admissible_M_R_ceiling: null,
    maximum_admissible_root_tangent_numerator_from_rouche_formula:
      "M_R < (nu_J-L_J*rho_X)*(rho_X-r_X)*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
    rouche_form_admissible_M_R_ceiling_formula:
      "M_R < (nu_J-L_J*rho_X)*(rho_X-r_X)*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
    candidate_rouche_root_tangent_numerator_bound_M_R_margin: null,
    candidate_rouche_form_M_R_margin: null,
  };
}

export function computeH39RouchePrimitiveClosure({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
  rX,
} = {}) {
  const roucheInputs = [
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
    rX,
  ];
  const hasAnyRoucheInput = roucheInputs.some(isProvided);
  const hasCompleteRoucheInputs = roucheInputs.every(isProvided);
  const hasAnyClosureInput = [
    mGBound,
    rootTangentNumeratorBound,
    ...roucheInputs,
  ].some(isProvided);

  if (!hasAnyClosureInput) {
    return emptyRouchePrimitiveClosure("not-provided");
  }
  if (!hasCompleteRoucheInputs) {
    if (!hasAnyRoucheInput) {
      return emptyRouchePrimitiveClosure("not-provided");
    }
    if (isProvided(rhoX) || isProvided(rX)) {
      computeH39RootGraphRoucheLift({
        centerResidualBound,
        centerJacobianLowerBound,
        jacobianLipschitzBound,
        rhoX,
        rX,
      });
    }
    return emptyRouchePrimitiveClosure("missing-rouche-inputs");
  }

  const rootGraphLift = computeH39RootGraphRoucheLift({
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
    rX,
  });

  if (!isProvided(mGBound) || !isProvided(rootTangentNumeratorBound)) {
    return emptyRouchePrimitiveClosure("open: provide M_G and M_R bounds");
  }

  const candidateMGBound = Number(mGBound);
  const numeratorBound = Number(rootTangentNumeratorBound);
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);

  const jMin = rootGraphLift.derived_jacobian_lower_bound_J_min;
  const sigmaX = Number(rhoX) - Number(rX);
  if (
    rootGraphLift.certifies_unique_root_in_X_disc !== true ||
    !(jMin > 0) ||
    !(sigmaX > 0)
  ) {
    return emptyRouchePrimitiveClosure("rouche-open");
  }

  const slopeRatio = numeratorBound / (jMin * sigmaX);
  const budget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: slopeRatio,
  });
  const leftScalar =
    candidateMGBound *
    (D_IDENTITY_COEFFICIENT +
      slopeRatio +
      1 / (budget.radius_multiple - 1));
  const rightScalar = B_D_39 * budget.rho_power_41 * budget.one_minus_q;
  const closureRatio = leftScalar / rightScalar;
  const maximumAdmissibleRootTangentNumeratorBound =
    candidateMGBound === 0
      ? null
      : jMin *
        sigmaX *
        ((1 - budget.q) * B_D_39 * budget.rho_power_41 / candidateMGBound -
          D_IDENTITY_COEFFICIENT -
          budget.q / (1 - budget.q));
  const numeratorMargin =
    maximumAdmissibleRootTangentNumeratorBound === null
      ? null
      : maximumAdmissibleRootTangentNumeratorBound - numeratorBound;

  return {
    rouche_primitive_closure_status:
      closureRatio < 1
        ? "closed-for-provided-rouche-primitive-bounds"
        : "open-for-provided-rouche-primitive-bounds",
    rouche_primitive_h39_report_status:
      closureRatio < 1
        ? "closed-for-provided-rouche-primitive-bounds"
        : "open-for-provided-rouche-primitive-bounds",
    rouche_primitive_closure_formula:
      "Lambda_39^R=M_G*(40+M_R/((nu_J-L_J*rho_X)*(rho_X-r_X))+1/(s-1))/(B_D_39*Y^41*s^40*(s-1))",
    rouche_primitive_h39_closure_ratio_formula:
      "Lambda_39^prim=M_G*(40+M_R/((nu_J-L_J*rho_X)*(rho_X-r_X))+1/(s-1))/(B_D_39*Y^41*s^40*(s-1))",
    rouche_primitive_required_inputs:
      "E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R on one shared graph-centered polydisc",
    rouche_primitive_J_min_formula: "J_min=nu_J-L_J*rho_X",
    rouche_primitive_sigma_X_formula: "sigma_X=rho_X-r_X",
    candidate_rouche_primitive_closure_left_scalar: leftScalar,
    candidate_rouche_primitive_closure_right_scalar: rightScalar,
    candidate_rouche_primitive_closure_ratio: closureRatio,
    candidate_rouche_primitive_certificate_closes: closureRatio < 1,
    candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim:
      closureRatio,
    candidate_rouche_primitive_h39_closure_ratio_margin_to_one:
      1 - closureRatio,
    candidate_rouche_primitive_h39_closure_ratio_below_one: closureRatio < 1,
    maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs:
      maximumAdmissibleRootTangentNumeratorBound,
    rouche_form_admissible_M_R_ceiling:
      maximumAdmissibleRootTangentNumeratorBound,
    maximum_admissible_root_tangent_numerator_from_rouche_formula:
      "M_R < (nu_J-L_J*rho_X)*(rho_X-r_X)*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
    rouche_form_admissible_M_R_ceiling_formula:
      "M_R < (nu_J-L_J*rho_X)*(rho_X-r_X)*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
    candidate_rouche_root_tangent_numerator_bound_M_R_margin: numeratorMargin,
    candidate_rouche_form_M_R_margin: numeratorMargin,
  };
}

function emptyPrimitiveSlackTolerances(status) {
  return {
    primitive_slack_tolerances_status: status,
    primitive_slack_tolerances_formula:
      "at fixed s, rho_X, r_X: require E_R+0.5*L_J*r_X^2 < nu_J*r_X, J_min=nu_J-L_J*rho_X>0, and M_G*(40+M_R/(J_min*sigma_X)+1/(s-1)) < B_D_39*Y^41*s^40*(s-1)",
    primitive_slack_tolerances_strict_inequalities: true,
    primitive_slack_tolerances_candidate_only: true,
    primitive_slack_right_scalar: null,
    primitive_slack_constant_term: null,
    primitive_slack_current_J_min: null,
    primitive_slack_current_sigma_X: null,
    primitive_slack_current_J_min_sigma_X: null,
    primitive_slack_required_J_min_sigma_X_from_closure: null,
    primitive_slack_required_J_min_from_closure: null,
    primitive_slack_slope_budget_for_M_R: null,
    primitive_slack_maximum_E_R: null,
    primitive_slack_E_R_margin: null,
    primitive_slack_minimum_nu_J: null,
    primitive_slack_nu_J_margin: null,
    primitive_slack_maximum_L_J: null,
    primitive_slack_L_J_margin: null,
    primitive_slack_rho_X_admissible_lower_bound: null,
    primitive_slack_rho_X_admissible_upper_bound: null,
    primitive_slack_rho_X_lower_margin: null,
    primitive_slack_rho_X_upper_margin: null,
    primitive_slack_r_X_admissible_lower_bound: null,
    primitive_slack_r_X_admissible_upper_bound: null,
    primitive_slack_r_X_lower_margin: null,
    primitive_slack_r_X_upper_margin: null,
    primitive_slack_maximum_M_G: null,
    primitive_slack_M_G_margin: null,
    primitive_slack_maximum_M_R: null,
    primitive_slack_M_R_margin: null,
    primitive_slack_all_current_margins_positive: null,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

function allowanceNumber(name, value) {
  if (!isProvided(value)) {
    return 0;
  }
  const resolved = Number(value);
  assertFiniteNonnegative(name, resolved);
  return resolved;
}

export function computeH39PrimitiveSlackTolerancesCandidate({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
  rX,
} = {}) {
  const inputs = [
    mGBound,
    rootTangentNumeratorBound,
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
    rX,
  ];
  if (!inputs.some(isProvided)) {
    return emptyPrimitiveSlackTolerances("not-provided");
  }
  if (!inputs.every(isProvided)) {
    return emptyPrimitiveSlackTolerances(
      "missing-primitive-slack-inputs"
    );
  }

  const candidateMGBound = Number(mGBound);
  const numeratorBound = Number(rootTangentNumeratorBound);
  const residualBound = Number(centerResidualBound);
  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const resolvedRhoX = Number(rhoX);
  const resolvedRX = Number(rX);

  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  assertFiniteNonnegative("centerResidualBound", residualBound);
  assertFinitePositive("centerJacobianLowerBound", centerJacobianBound);
  assertFiniteNonnegative("jacobianLipschitzBound", lipschitzBound);
  assertFinitePositive("rhoX", resolvedRhoX);
  assertFiniteNonnegative("rX", resolvedRX);
  if (!(resolvedRhoX > resolvedRX)) {
    throw new Error("rhoX must be greater than rX");
  }
  if (!(resolvedRX > 0)) {
    throw new Error("rX must be positive for primitive slack tolerances");
  }

  const rootGraphLift = computeH39RootGraphRoucheLift({
    centerResidualBound: residualBound,
    centerJacobianLowerBound: centerJacobianBound,
    jacobianLipschitzBound: lipschitzBound,
    rhoX: resolvedRhoX,
    rX: resolvedRX,
  });
  const budget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: 0,
  });
  const sigmaX = resolvedRhoX - resolvedRX;
  const jMin = centerJacobianBound - lipschitzBound * resolvedRhoX;
  const rightScalar = B_D_39 * budget.rho_power_41 * budget.one_minus_q;
  const constantTerm =
    D_IDENTITY_COEFFICIENT + 1 / (budget.radius_multiple - 1);
  const slopeBudgetForMR =
    candidateMGBound === 0
      ? null
      : rightScalar / candidateMGBound - constantTerm;
  const requiredJMinFromClosure =
    candidateMGBound === 0
      ? 0
      : slopeBudgetForMR > 0
        ? numeratorBound / (sigmaX * slopeBudgetForMR)
        : null;

  const maximumER =
    centerJacobianBound * resolvedRX -
    0.5 * lipschitzBound * resolvedRX * resolvedRX;
  const roucheNuFloor =
    (residualBound + 0.5 * lipschitzBound * resolvedRX * resolvedRX) /
    resolvedRX;
  const closureNuFloor =
    requiredJMinFromClosure === null
      ? null
      : lipschitzBound * resolvedRhoX + requiredJMinFromClosure;
  const minimumNuJ =
    closureNuFloor === null
      ? null
      : Math.max(roucheNuFloor, closureNuFloor);
  const roucheLJCeiling =
    (2 * (centerJacobianBound * resolvedRX - residualBound)) /
    (resolvedRX * resolvedRX);
  const closureLJCeiling =
    requiredJMinFromClosure === null
      ? null
      : (centerJacobianBound - requiredJMinFromClosure) / resolvedRhoX;
  const maximumLJ =
    closureLJCeiling === null
      ? null
      : Math.min(roucheLJCeiling, closureLJCeiling);
  const primitiveXMinimum =
    candidateMGBound === 0
      ? 0
      : slopeBudgetForMR > 0
        ? numeratorBound / slopeBudgetForMR
        : null;
  const currentPrimitiveX = jMin * sigmaX;
  let rhoXLowerBound = null;
  let rhoXUpperBound = null;
  if (primitiveXMinimum !== null) {
    if (lipschitzBound === 0) {
      rhoXLowerBound =
        resolvedRX + primitiveXMinimum / centerJacobianBound;
      rhoXUpperBound = null;
    } else {
      const rhoDiscriminant =
        (centerJacobianBound + lipschitzBound * resolvedRX) ** 2 -
        4 *
          lipschitzBound *
          (centerJacobianBound * resolvedRX + primitiveXMinimum);
      if (rhoDiscriminant > 0) {
        const sqrtRhoDiscriminant = Math.sqrt(rhoDiscriminant);
        rhoXLowerBound =
          (centerJacobianBound +
            lipschitzBound * resolvedRX -
            sqrtRhoDiscriminant) /
          (2 * lipschitzBound);
        rhoXUpperBound =
          (centerJacobianBound +
            lipschitzBound * resolvedRX +
            sqrtRhoDiscriminant) /
          (2 * lipschitzBound);
      }
    }
  }
  let rXLowerBound = null;
  let rXUpperBound = null;
  if (primitiveXMinimum !== null && jMin > 0) {
    let roucheLower = null;
    let roucheUpper = null;
    if (lipschitzBound === 0) {
      roucheLower = residualBound / centerJacobianBound;
      roucheUpper = null;
    } else {
      const rDiscriminant =
        centerJacobianBound * centerJacobianBound -
        2 * lipschitzBound * residualBound;
      if (rDiscriminant > 0) {
        const sqrtRDiscriminant = Math.sqrt(rDiscriminant);
        roucheLower =
          (2 * residualBound) /
          (centerJacobianBound + sqrtRDiscriminant);
        roucheUpper =
          (centerJacobianBound + sqrtRDiscriminant) /
          lipschitzBound;
      }
    }
    if (roucheLower !== null) {
      rXLowerBound = Math.max(0, roucheLower);
      const tailUpper = resolvedRhoX - primitiveXMinimum / jMin;
      rXUpperBound = Math.min(
        resolvedRhoX,
        tailUpper,
        roucheUpper === null ? Number.POSITIVE_INFINITY : roucheUpper
      );
    }
  }
  const maximumMG =
    jMin > 0 && sigmaX > 0
      ? rightScalar /
        (constantTerm + numeratorBound / (jMin * sigmaX))
      : null;
  const maximumMR =
    candidateMGBound === 0
      ? null
      : slopeBudgetForMR > 0 && jMin > 0 && sigmaX > 0
        ? jMin * sigmaX * slopeBudgetForMR
        : null;

  const eRMargin = maximumER - residualBound;
  const nuJMargin =
    minimumNuJ === null ? null : centerJacobianBound - minimumNuJ;
  const lJMargin =
    maximumLJ === null ? null : maximumLJ - lipschitzBound;
  const rhoXLowerMargin =
    rhoXLowerBound === null ? null : resolvedRhoX - rhoXLowerBound;
  const rhoXUpperMargin =
    rhoXUpperBound === null ? null : rhoXUpperBound - resolvedRhoX;
  const rXLowerMargin =
    rXLowerBound === null ? null : resolvedRX - rXLowerBound;
  const rXUpperMargin =
    rXUpperBound === null ? null : rXUpperBound - resolvedRX;
  const mGMargin =
    maximumMG === null ? null : maximumMG - candidateMGBound;
  const mRMargin =
    maximumMR === null ? null : maximumMR - numeratorBound;
  const allMarginsPositive =
    eRMargin > 0 &&
    nuJMargin > 0 &&
    lJMargin > 0 &&
    rhoXLowerMargin > 0 &&
    (rhoXUpperMargin === null || rhoXUpperMargin > 0) &&
    rXLowerMargin > 0 &&
    rXUpperMargin > 0 &&
    mGMargin > 0 &&
    mRMargin > 0 &&
    rootGraphLift.certifies_unique_root_in_X_disc === true;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
    primitive_slack_tolerances_status:
      allMarginsPositive
        ? "h39-primitive-slack-tolerances-candidate-emitted"
        : "h39-primitive-slack-tolerances-candidate-open",
    primitive_slack_tolerances_formula:
      "at fixed s, rho_X, r_X: require E_R+0.5*L_J*r_X^2 < nu_J*r_X, J_min=nu_J-L_J*rho_X>0, and M_G*(40+M_R/(J_min*sigma_X)+1/(s-1)) < B_D_39*Y^41*s^40*(s-1)",
    primitive_slack_tolerances_strict_inequalities: true,
    primitive_slack_tolerances_candidate_only: true,
    radius_multiple: budget.radius_multiple,
    rho: budget.rho,
    q: budget.q,
    primitive_slack_right_scalar: rightScalar,
    primitive_slack_constant_term: constantTerm,
    primitive_slack_current_E_R: residualBound,
    primitive_slack_current_nu_J: centerJacobianBound,
    primitive_slack_current_L_J: lipschitzBound,
    primitive_slack_current_rho_X: resolvedRhoX,
    primitive_slack_current_r_X: resolvedRX,
    primitive_slack_current_M_G: candidateMGBound,
    primitive_slack_current_M_R: numeratorBound,
    primitive_slack_current_J_min: jMin,
    primitive_slack_current_sigma_X: sigmaX,
    primitive_slack_current_J_min_sigma_X: currentPrimitiveX,
    primitive_slack_required_J_min_sigma_X_from_closure:
      primitiveXMinimum,
    primitive_slack_required_J_min_from_closure:
      requiredJMinFromClosure,
    primitive_slack_slope_budget_for_M_R: slopeBudgetForMR,
    primitive_slack_maximum_E_R: maximumER,
    primitive_slack_E_R_margin: eRMargin,
    primitive_slack_minimum_nu_J: minimumNuJ,
    primitive_slack_nu_J_margin: nuJMargin,
    primitive_slack_maximum_L_J: maximumLJ,
    primitive_slack_L_J_margin: lJMargin,
    primitive_slack_rho_X_admissible_lower_bound: rhoXLowerBound,
    primitive_slack_rho_X_admissible_upper_bound: rhoXUpperBound,
    primitive_slack_rho_X_lower_margin: rhoXLowerMargin,
    primitive_slack_rho_X_upper_margin: rhoXUpperMargin,
    primitive_slack_r_X_admissible_lower_bound: rXLowerBound,
    primitive_slack_r_X_admissible_upper_bound:
      Number.isFinite(rXUpperBound) ? rXUpperBound : null,
    primitive_slack_r_X_lower_margin: rXLowerMargin,
    primitive_slack_r_X_upper_margin:
      Number.isFinite(rXUpperMargin) ? rXUpperMargin : null,
    primitive_slack_maximum_M_G: maximumMG,
    primitive_slack_M_G_margin: mGMargin,
    primitive_slack_maximum_M_R: maximumMR,
    primitive_slack_M_R_margin: mRMargin,
    primitive_slack_all_current_margins_positive: allMarginsPositive,
    root_graph_lift_status: rootGraphLift.root_graph_lift_status,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

function emptyPrimitiveRemainderBudget(status) {
  return {
    primitive_remainder_budget_status: status,
    primitive_remainder_budget_formula:
      "robust candidate: replace E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R by their pessimistic remainder rectangle and require positive Rouché margin, positive J_min*sigma_X, and the h39 scalar inequality",
    primitive_remainder_budget_strict_inequalities: true,
    primitive_remainder_budget_candidate_only: true,
    primitive_remainder_budget_E_R_allowance: null,
    primitive_remainder_budget_nu_J_loss_allowance: null,
    primitive_remainder_budget_L_J_allowance: null,
    primitive_remainder_budget_rho_X_lower_allowance: null,
    primitive_remainder_budget_rho_X_upper_allowance: null,
    primitive_remainder_budget_r_X_lower_allowance: null,
    primitive_remainder_budget_r_X_upper_allowance: null,
    primitive_remainder_budget_M_G_allowance: null,
    primitive_remainder_budget_M_R_allowance: null,
    primitive_remainder_budget_worst_E_R: null,
    primitive_remainder_budget_worst_nu_J: null,
    primitive_remainder_budget_worst_L_J: null,
    primitive_remainder_budget_rho_X_lower: null,
    primitive_remainder_budget_rho_X_upper: null,
    primitive_remainder_budget_r_X_lower: null,
    primitive_remainder_budget_r_X_upper: null,
    primitive_remainder_budget_worst_M_G: null,
    primitive_remainder_budget_worst_M_R: null,
    primitive_remainder_budget_min_J_min: null,
    primitive_remainder_budget_min_sigma_X: null,
    primitive_remainder_budget_min_J_min_sigma_X: null,
    primitive_remainder_budget_required_J_min_sigma_X: null,
    primitive_remainder_budget_min_rouche_margin: null,
    primitive_remainder_budget_scalar_left: null,
    primitive_remainder_budget_scalar_right: null,
    primitive_remainder_budget_scalar_margin: null,
    primitive_remainder_budget_closes_candidate: null,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

export function computeH39PrimitiveRemainderBudgetCandidate({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
  rX,
  centerResidualRemainderBound,
  centerJacobianLowerRemainderBound,
  jacobianLipschitzRemainderBound,
  rhoXLowerRemainderBound,
  rhoXUpperRemainderBound,
  rXLowerRemainderBound,
  rXUpperRemainderBound,
  mGRemainderBound,
  rootTangentNumeratorRemainderBound,
} = {}) {
  const primitiveInputs = [
    mGBound,
    rootTangentNumeratorBound,
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
    rX,
  ];
  const remainderInputs = [
    centerResidualRemainderBound,
    centerJacobianLowerRemainderBound,
    jacobianLipschitzRemainderBound,
    rhoXLowerRemainderBound,
    rhoXUpperRemainderBound,
    rXLowerRemainderBound,
    rXUpperRemainderBound,
    mGRemainderBound,
    rootTangentNumeratorRemainderBound,
  ];
  if (!primitiveInputs.some(isProvided) && !remainderInputs.some(isProvided)) {
    return emptyPrimitiveRemainderBudget("not-provided");
  }
  if (!primitiveInputs.every(isProvided)) {
    return emptyPrimitiveRemainderBudget(
      "missing-primitive-remainder-budget-inputs"
    );
  }

  const candidateMGBound = Number(mGBound);
  const numeratorBound = Number(rootTangentNumeratorBound);
  const residualBound = Number(centerResidualBound);
  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const resolvedRhoX = Number(rhoX);
  const resolvedRX = Number(rX);
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  assertFiniteNonnegative("centerResidualBound", residualBound);
  assertFinitePositive("centerJacobianLowerBound", centerJacobianBound);
  assertFiniteNonnegative("jacobianLipschitzBound", lipschitzBound);
  assertFinitePositive("rhoX", resolvedRhoX);
  assertFinitePositive("rX", resolvedRX);
  if (!(resolvedRhoX > resolvedRX)) {
    throw new Error("rhoX must be greater than rX");
  }

  const residualAllowance = allowanceNumber(
    "centerResidualRemainderBound",
    centerResidualRemainderBound
  );
  const jacobianLossAllowance = allowanceNumber(
    "centerJacobianLowerRemainderBound",
    centerJacobianLowerRemainderBound
  );
  const lipschitzAllowance = allowanceNumber(
    "jacobianLipschitzRemainderBound",
    jacobianLipschitzRemainderBound
  );
  const rhoXLowerAllowance = allowanceNumber(
    "rhoXLowerRemainderBound",
    rhoXLowerRemainderBound
  );
  const rhoXUpperAllowance = allowanceNumber(
    "rhoXUpperRemainderBound",
    rhoXUpperRemainderBound
  );
  const rXLowerAllowance = allowanceNumber(
    "rXLowerRemainderBound",
    rXLowerRemainderBound
  );
  const rXUpperAllowance = allowanceNumber(
    "rXUpperRemainderBound",
    rXUpperRemainderBound
  );
  const mGAllowance = allowanceNumber("mGRemainderBound", mGRemainderBound);
  const numeratorAllowance = allowanceNumber(
    "rootTangentNumeratorRemainderBound",
    rootTangentNumeratorRemainderBound
  );

  const worstResidual = residualBound + residualAllowance;
  const worstJacobian = centerJacobianBound - jacobianLossAllowance;
  const worstLipschitz = lipschitzBound + lipschitzAllowance;
  const rhoXLower = resolvedRhoX - rhoXLowerAllowance;
  const rhoXUpper = resolvedRhoX + rhoXUpperAllowance;
  const rXLower = resolvedRX - rXLowerAllowance;
  const rXUpper = resolvedRX + rXUpperAllowance;
  const worstMG = candidateMGBound + mGAllowance;
  const worstMR = numeratorBound + numeratorAllowance;

  const intervalsValid =
    worstJacobian > 0 &&
    rhoXLower > 0 &&
    rhoXUpper >= rhoXLower &&
    rXLower > 0 &&
    rXUpper >= rXLower &&
    rhoXLower > rXUpper;
  const minJMin = intervalsValid
    ? worstJacobian - worstLipschitz * rhoXUpper
    : null;
  const minSigmaX = intervalsValid ? rhoXLower - rXUpper : null;
  const jSigmaAtRhoLower =
    intervalsValid
      ? (worstJacobian - worstLipschitz * rhoXLower) *
        (rhoXLower - rXUpper)
      : null;
  const jSigmaAtRhoUpper =
    intervalsValid
      ? (worstJacobian - worstLipschitz * rhoXUpper) *
        (rhoXUpper - rXUpper)
      : null;
  const minJMinSigmaX =
    intervalsValid && minJMin > 0 && minSigmaX > 0
      ? Math.min(jSigmaAtRhoLower, jSigmaAtRhoUpper)
      : null;
  const roucheMarginAtLower =
    intervalsValid
      ? worstJacobian * rXLower -
        worstResidual -
        0.5 * worstLipschitz * rXLower * rXLower
      : null;
  const roucheMarginAtUpper =
    intervalsValid
      ? worstJacobian * rXUpper -
        worstResidual -
        0.5 * worstLipschitz * rXUpper * rXUpper
      : null;
  const minRoucheMargin =
    intervalsValid
      ? Math.min(roucheMarginAtLower, roucheMarginAtUpper)
      : null;
  const budget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: 0,
  });
  const rightScalar = B_D_39 * budget.rho_power_41 * budget.one_minus_q;
  const constantTerm =
    D_IDENTITY_COEFFICIENT + 1 / (budget.radius_multiple - 1);
  const slopeBudgetForMR =
    worstMG === 0 ? null : rightScalar / worstMG - constantTerm;
  const requiredJMinSigmaX =
    worstMG === 0
      ? 0
      : slopeBudgetForMR > 0
        ? worstMR / slopeBudgetForMR
        : null;
  const scalarLeft =
    minJMinSigmaX === null || !(minJMinSigmaX > 0)
      ? null
      : worstMG * (constantTerm + worstMR / minJMinSigmaX);
  const scalarMargin =
    scalarLeft === null ? null : rightScalar - scalarLeft;
  const closes =
    intervalsValid &&
    minJMin > 0 &&
    minSigmaX > 0 &&
    minJMinSigmaX > 0 &&
    minRoucheMargin > 0 &&
    scalarMargin > 0;

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
    primitive_remainder_budget_status: closes
      ? "h39-primitive-remainder-budget-candidate-emitted"
      : "h39-primitive-remainder-budget-candidate-open",
    primitive_remainder_budget_formula:
      "robust candidate: E_R increases, nu_J decreases, L_J increases, rho_X and r_X vary over the supplied rectangle, M_G and M_R increase; endpoint checks certify the strict Rouché margin and h39 scalar inequality",
    primitive_remainder_budget_strict_inequalities: true,
    primitive_remainder_budget_candidate_only: true,
    radius_multiple: budget.radius_multiple,
    rho: budget.rho,
    q: budget.q,
    primitive_remainder_budget_E_R_allowance: residualAllowance,
    primitive_remainder_budget_nu_J_loss_allowance:
      jacobianLossAllowance,
    primitive_remainder_budget_L_J_allowance: lipschitzAllowance,
    primitive_remainder_budget_rho_X_lower_allowance:
      rhoXLowerAllowance,
    primitive_remainder_budget_rho_X_upper_allowance:
      rhoXUpperAllowance,
    primitive_remainder_budget_r_X_lower_allowance: rXLowerAllowance,
    primitive_remainder_budget_r_X_upper_allowance: rXUpperAllowance,
    primitive_remainder_budget_M_G_allowance: mGAllowance,
    primitive_remainder_budget_M_R_allowance: numeratorAllowance,
    primitive_remainder_budget_worst_E_R: worstResidual,
    primitive_remainder_budget_worst_nu_J: worstJacobian,
    primitive_remainder_budget_worst_L_J: worstLipschitz,
    primitive_remainder_budget_rho_X_lower: rhoXLower,
    primitive_remainder_budget_rho_X_upper: rhoXUpper,
    primitive_remainder_budget_r_X_lower: rXLower,
    primitive_remainder_budget_r_X_upper: rXUpper,
    primitive_remainder_budget_worst_M_G: worstMG,
    primitive_remainder_budget_worst_M_R: worstMR,
    primitive_remainder_budget_min_J_min: minJMin,
    primitive_remainder_budget_min_sigma_X: minSigmaX,
    primitive_remainder_budget_min_J_min_sigma_X: minJMinSigmaX,
    primitive_remainder_budget_required_J_min_sigma_X:
      requiredJMinSigmaX,
    primitive_remainder_budget_min_rouche_margin: minRoucheMargin,
    primitive_remainder_budget_scalar_left: scalarLeft,
    primitive_remainder_budget_scalar_right: rightScalar,
    primitive_remainder_budget_scalar_margin: scalarMargin,
    primitive_remainder_budget_closes_candidate: closes,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

function finiteBoundary(value) {
  return Number.isFinite(value) ? value : null;
}

function firstPositiveQuadraticRoot(constant, linear, quadratic) {
  if (
    !Number.isFinite(constant) ||
    !Number.isFinite(linear) ||
    !Number.isFinite(quadratic) ||
    !(constant > 0)
  ) {
    return null;
  }
  const scale = Math.max(
    1,
    Math.abs(constant),
    Math.abs(linear),
    Math.abs(quadratic)
  );
  const tolerance = 1e-14 * scale;
  if (Math.abs(quadratic) <= tolerance) {
    if (linear < 0) {
      const root = -constant / linear;
      return root > 0 ? root : null;
    }
    return null;
  }

  const discriminant = linear * linear - 4 * quadratic * constant;
  if (discriminant < -tolerance) {
    return null;
  }
  const sqrtDiscriminant = Math.sqrt(Math.max(0, discriminant));
  const roots = [
    (-linear - sqrtDiscriminant) / (2 * quadratic),
    (-linear + sqrtDiscriminant) / (2 * quadratic),
  ].filter((root) => Number.isFinite(root) && root > 0);
  if (roots.length === 0) {
    return null;
  }
  return Math.min(...roots);
}

function emptyPrimitiveAnalyticRemainderMultiProfileBoundary(status) {
  return {
    primitive_analytic_remainder_multi_profile_boundary_status: status,
    primitive_analytic_remainder_multi_profile_boundary_formula:
      "fixed-radii primitive-pressure profile: scale E_R, nu_J loss, L_J, M_G, and M_R by lambda; the strict supremum is the first boundary among J_min, the Rouché margin, and the h39 scalar polynomial",
    primitive_analytic_remainder_multi_profile_boundary_candidate_only: true,
    primitive_analytic_remainder_multi_profile_boundary_strict_inequalities:
      true,
    primitive_analytic_remainder_multi_profile_lambda_supremum: null,
    primitive_analytic_remainder_multi_profile_lambda_supremum_attained:
      false,
    primitive_analytic_remainder_multi_profile_bottleneck_name: null,
    primitive_analytic_remainder_multi_profile_active_bottleneck_names: [],
    primitive_analytic_remainder_multi_profile_J_min_boundary: null,
    primitive_analytic_remainder_multi_profile_rouche_margin_boundary:
      null,
    primitive_analytic_remainder_multi_profile_h39_scalar_boundary: null,
    primitive_analytic_remainder_multi_profile_base_sigma_X: null,
    primitive_analytic_remainder_multi_profile_base_J_min: null,
    primitive_analytic_remainder_multi_profile_base_rouche_margin: null,
    primitive_analytic_remainder_multi_profile_base_scalar_margin: null,
    primitive_analytic_remainder_multi_profile_required_scale: null,
    primitive_analytic_remainder_multi_profile_J_min_at_required_scale:
      null,
    primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale:
      null,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_at_required_scale:
      null,
    primitive_analytic_remainder_multi_profile_required_scale_closes:
      null,
    primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names:
      [],
    primitive_analytic_remainder_multi_profile_scalar_polynomial_constant:
      null,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_linear:
      null,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_quadratic:
      null,
    primitive_analytic_remainder_multi_profile_E_R_profile: null,
    primitive_analytic_remainder_multi_profile_nu_J_loss_profile: null,
    primitive_analytic_remainder_multi_profile_L_J_profile: null,
    primitive_analytic_remainder_multi_profile_M_G_profile: null,
    primitive_analytic_remainder_multi_profile_M_R_profile: null,
    primitive_analytic_remainder_multi_profile_J_min_profile_slope:
      null,
    primitive_analytic_remainder_multi_profile_rouche_margin_profile_slope:
      null,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

export function computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
  rX,
  centerResidualRemainderProfile,
  centerJacobianLowerRemainderProfile,
  jacobianLipschitzRemainderProfile,
  mGRemainderProfile,
  rootTangentNumeratorRemainderProfile,
} = {}) {
  const primitiveInputs = [
    mGBound,
    rootTangentNumeratorBound,
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
    rX,
  ];
  const profileInputs = [
    centerResidualRemainderProfile,
    centerJacobianLowerRemainderProfile,
    jacobianLipschitzRemainderProfile,
    mGRemainderProfile,
    rootTangentNumeratorRemainderProfile,
  ];
  if (!primitiveInputs.some(isProvided) && !profileInputs.some(isProvided)) {
    return emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
      "not-provided"
    );
  }
  if (!primitiveInputs.every(isProvided)) {
    return emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
      "missing-primitive-analytic-remainder-multi-profile-boundary-inputs"
    );
  }

  const candidateMGBound = Number(mGBound);
  const numeratorBound = Number(rootTangentNumeratorBound);
  const residualBound = Number(centerResidualBound);
  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const resolvedRhoX = Number(rhoX);
  const resolvedRX = Number(rX);
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  assertFiniteNonnegative("centerResidualBound", residualBound);
  assertFinitePositive("centerJacobianLowerBound", centerJacobianBound);
  assertFiniteNonnegative("jacobianLipschitzBound", lipschitzBound);
  assertFinitePositive("rhoX", resolvedRhoX);
  assertFinitePositive("rX", resolvedRX);
  if (!(resolvedRhoX > resolvedRX)) {
    throw new Error("rhoX must be greater than rX");
  }

  const residualProfile = allowanceNumber(
    "centerResidualRemainderProfile",
    centerResidualRemainderProfile
  );
  const jacobianLossProfile = allowanceNumber(
    "centerJacobianLowerRemainderProfile",
    centerJacobianLowerRemainderProfile
  );
  const lipschitzProfile = allowanceNumber(
    "jacobianLipschitzRemainderProfile",
    jacobianLipschitzRemainderProfile
  );
  const mGProfile = allowanceNumber("mGRemainderProfile", mGRemainderProfile);
  const numeratorProfile = allowanceNumber(
    "rootTangentNumeratorRemainderProfile",
    rootTangentNumeratorRemainderProfile
  );
  const hasPositiveProfile = [
    residualProfile,
    jacobianLossProfile,
    lipschitzProfile,
    mGProfile,
    numeratorProfile,
  ].some((value) => value > 0);

  const budget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: 0,
  });
  const rightScalar = B_D_39 * budget.rho_power_41 * budget.one_minus_q;
  const constantTerm =
    D_IDENTITY_COEFFICIENT + 1 / (budget.radius_multiple - 1);
  const sigmaX = resolvedRhoX - resolvedRX;
  const baseJMin = centerJacobianBound - lipschitzBound * resolvedRhoX;
  const jMinProfileSlope =
    jacobianLossProfile + lipschitzProfile * resolvedRhoX;
  const baseRoucheMargin =
    centerJacobianBound * resolvedRX -
    residualBound -
    0.5 * lipschitzBound * resolvedRX * resolvedRX;
  const roucheMarginProfileSlope =
    jacobianLossProfile * resolvedRX +
    residualProfile +
    0.5 * lipschitzProfile * resolvedRX * resolvedRX;
  const scalarAffineConstant =
    constantTerm * sigmaX * baseJMin + numeratorBound;
  const scalarAffineLinear =
    numeratorProfile - constantTerm * sigmaX * jMinProfileSlope;
  const polynomialConstant =
    rightScalar * sigmaX * baseJMin -
    candidateMGBound * scalarAffineConstant;
  const polynomialLinear =
    -rightScalar * sigmaX * jMinProfileSlope -
    candidateMGBound * scalarAffineLinear -
    mGProfile * scalarAffineConstant;
  const polynomialQuadratic = -mGProfile * scalarAffineLinear;
  const baseScalarMargin =
    baseJMin > 0 && sigmaX > 0
      ? rightScalar -
        candidateMGBound *
          (constantTerm + numeratorBound / (baseJMin * sigmaX))
      : null;
  const baseCloses =
    sigmaX > 0 &&
    baseJMin > 0 &&
    baseRoucheMargin > 0 &&
    polynomialConstant > 0;
  const requiredScale = 1;
  const requiredScaleJMin =
    baseJMin - requiredScale * jMinProfileSlope;
  const requiredScaleRoucheMargin =
    baseRoucheMargin - requiredScale * roucheMarginProfileSlope;
  const requiredScaleScalarPolynomial =
    polynomialConstant +
    polynomialLinear * requiredScale +
    polynomialQuadratic * requiredScale * requiredScale;
  const requiredScaleFailedMarginNames = [
    ["J_min", requiredScaleJMin],
    ["rouche_margin", requiredScaleRoucheMargin],
    ["h39_scalar_margin", requiredScaleScalarPolynomial],
  ]
    .filter(([, value]) => !(Number.isFinite(value) && value > 0))
    .map(([name]) => name);
  const baseFields = {
    primitive_analytic_remainder_multi_profile_base_sigma_X: sigmaX,
    primitive_analytic_remainder_multi_profile_base_J_min: baseJMin,
    primitive_analytic_remainder_multi_profile_base_rouche_margin:
      baseRoucheMargin,
    primitive_analytic_remainder_multi_profile_base_scalar_margin:
      baseScalarMargin,
    primitive_analytic_remainder_multi_profile_required_scale:
      requiredScale,
    primitive_analytic_remainder_multi_profile_J_min_at_required_scale:
      requiredScaleJMin,
    primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale:
      requiredScaleRoucheMargin,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_at_required_scale:
      requiredScaleScalarPolynomial,
    primitive_analytic_remainder_multi_profile_required_scale_closes:
      requiredScaleFailedMarginNames.length === 0,
    primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names:
      requiredScaleFailedMarginNames,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_constant:
      polynomialConstant,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_linear:
      polynomialLinear,
    primitive_analytic_remainder_multi_profile_scalar_polynomial_quadratic:
      polynomialQuadratic,
    primitive_analytic_remainder_multi_profile_E_R_profile:
      residualProfile,
    primitive_analytic_remainder_multi_profile_nu_J_loss_profile:
      jacobianLossProfile,
    primitive_analytic_remainder_multi_profile_L_J_profile:
      lipschitzProfile,
    primitive_analytic_remainder_multi_profile_M_G_profile: mGProfile,
    primitive_analytic_remainder_multi_profile_M_R_profile:
      numeratorProfile,
    primitive_analytic_remainder_multi_profile_J_min_profile_slope:
      jMinProfileSlope,
    primitive_analytic_remainder_multi_profile_rouche_margin_profile_slope:
      roucheMarginProfileSlope,
  };
  if (!baseCloses) {
    return {
      ...emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
        "h39-primitive-analytic-remainder-multi-profile-base-open"
      ),
      ...baseFields,
    };
  }
  if (!hasPositiveProfile) {
    return {
      ...emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
        "h39-primitive-analytic-remainder-multi-profile-unbounded-for-zero-profile"
      ),
      ...baseFields,
    };
  }

  const jBoundary =
    jMinProfileSlope > 0 ? baseJMin / jMinProfileSlope : Infinity;
  const roucheBoundary =
    roucheMarginProfileSlope > 0
      ? baseRoucheMargin / roucheMarginProfileSlope
      : Infinity;
  const scalarBoundary =
    firstPositiveQuadraticRoot(
      polynomialConstant,
      polynomialLinear,
      polynomialQuadratic
    ) ?? Infinity;
  const finiteBoundaries = [
    ["J_min", jBoundary],
    ["rouche_margin", roucheBoundary],
    ["h39_scalar_margin", scalarBoundary],
  ].filter(([, value]) => Number.isFinite(value) && value > 0);

  if (finiteBoundaries.length === 0) {
    return {
      ...emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
        "h39-primitive-analytic-remainder-multi-profile-unbounded"
      ),
      ...baseFields,
      primitive_analytic_remainder_multi_profile_J_min_boundary:
        finiteBoundary(jBoundary),
      primitive_analytic_remainder_multi_profile_rouche_margin_boundary:
        finiteBoundary(roucheBoundary),
      primitive_analytic_remainder_multi_profile_h39_scalar_boundary:
        finiteBoundary(scalarBoundary),
    };
  }

  const [bottleneckName, supremum] = finiteBoundaries.reduce((best, entry) =>
    entry[1] < best[1] ? entry : best
  );
  const activeBottlenecks = finiteBoundaries
    .filter(([, value]) => approximatelyEqual(value, supremum, 1e-10))
    .map(([name]) => name);

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
    ...emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
      "h39-primitive-analytic-remainder-multi-profile-boundary-emitted"
    ),
    ...baseFields,
    primitive_analytic_remainder_multi_profile_lambda_supremum:
      supremum,
    primitive_analytic_remainder_multi_profile_bottleneck_name:
      bottleneckName,
    primitive_analytic_remainder_multi_profile_active_bottleneck_names:
      activeBottlenecks,
    primitive_analytic_remainder_multi_profile_J_min_boundary:
      finiteBoundary(jBoundary),
    primitive_analytic_remainder_multi_profile_rouche_margin_boundary:
      finiteBoundary(roucheBoundary),
    primitive_analytic_remainder_multi_profile_h39_scalar_boundary:
      finiteBoundary(scalarBoundary),
  };
}

function emptyPrimitiveRemainderProfileScale(status) {
  return {
    primitive_remainder_profile_scale_status: status,
    primitive_remainder_profile_scale_formula:
      "lambda profile: scale nonnegative primitive remainder directions by lambda and find the largest candidate scale that preserves the robust h39 primitive remainder budget",
    primitive_remainder_profile_scale_candidate_only: true,
    primitive_remainder_profile_scale_strict_inequalities: true,
    primitive_remainder_profile_scale_candidate: null,
    primitive_remainder_profile_scale_first_failing_upper: null,
    primitive_remainder_profile_scale_closed_through_upper_bound: null,
    primitive_remainder_profile_scale_iterations: null,
    primitive_remainder_profile_scale_tolerance: null,
    primitive_remainder_profile_scale_limiting_margin_name: null,
    primitive_remainder_profile_scale_limiting_margin_value: null,
    primitive_remainder_profile_scale_E_R_profile: null,
    primitive_remainder_profile_scale_nu_J_loss_profile: null,
    primitive_remainder_profile_scale_L_J_profile: null,
    primitive_remainder_profile_scale_rho_X_lower_profile: null,
    primitive_remainder_profile_scale_rho_X_upper_profile: null,
    primitive_remainder_profile_scale_r_X_lower_profile: null,
    primitive_remainder_profile_scale_r_X_upper_profile: null,
    primitive_remainder_profile_scale_M_G_profile: null,
    primitive_remainder_profile_scale_M_R_profile: null,
    primitive_remainder_profile_scale_scaled_E_R_allowance: null,
    primitive_remainder_profile_scale_scaled_nu_J_loss_allowance: null,
    primitive_remainder_profile_scale_scaled_L_J_allowance: null,
    primitive_remainder_profile_scale_scaled_rho_X_lower_allowance: null,
    primitive_remainder_profile_scale_scaled_rho_X_upper_allowance: null,
    primitive_remainder_profile_scale_scaled_r_X_lower_allowance: null,
    primitive_remainder_profile_scale_scaled_r_X_upper_allowance: null,
    primitive_remainder_profile_scale_scaled_M_G_allowance: null,
    primitive_remainder_profile_scale_scaled_M_R_allowance: null,
    primitive_remainder_profile_scale_budget_at_candidate: null,
    primitive_remainder_profile_scale_exact_multi_profile_boundary: null,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

function limitingPrimitiveRemainderMargin(budget) {
  const margins = [
    [
      "primitive_remainder_budget_min_J_min",
      budget.primitive_remainder_budget_min_J_min,
    ],
    [
      "primitive_remainder_budget_min_sigma_X",
      budget.primitive_remainder_budget_min_sigma_X,
    ],
    [
      "primitive_remainder_budget_min_J_min_sigma_X_margin",
      budget.primitive_remainder_budget_min_J_min_sigma_X === null ||
      budget.primitive_remainder_budget_required_J_min_sigma_X === null
        ? null
        : budget.primitive_remainder_budget_min_J_min_sigma_X -
          budget.primitive_remainder_budget_required_J_min_sigma_X,
    ],
    [
      "primitive_remainder_budget_min_rouche_margin",
      budget.primitive_remainder_budget_min_rouche_margin,
    ],
    [
      "primitive_remainder_budget_scalar_margin",
      budget.primitive_remainder_budget_scalar_margin,
    ],
    [
      "primitive_remainder_profile_scale_safe_scalar_margin",
      budget.primitive_remainder_profile_scale_safe_scalar_margin,
    ],
  ].filter(([, value]) => Number.isFinite(value));
  if (margins.length === 0) {
    return [null, null];
  }
  return margins.reduce((best, entry) =>
    entry[1] < best[1] ? entry : best
  );
}

export function computeH39PrimitiveRemainderProfileScaleCandidate({
  profileScaleUpperBound,
  profileScaleTolerance = DEFAULT_PROFILE_SCALE_TOLERANCE,
  profileScaleMaxIterations = DEFAULT_PROFILE_SCALE_MAX_ITERATIONS,
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
  rX,
  centerResidualRemainderProfile,
  centerJacobianLowerRemainderProfile,
  jacobianLipschitzRemainderProfile,
  rhoXLowerRemainderProfile,
  rhoXUpperRemainderProfile,
  rXLowerRemainderProfile,
  rXUpperRemainderProfile,
  mGRemainderProfile,
  rootTangentNumeratorRemainderProfile,
} = {}) {
  const primitiveInputs = [
    mGBound,
    rootTangentNumeratorBound,
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
    rX,
  ];
  const profileInputs = [
    centerResidualRemainderProfile,
    centerJacobianLowerRemainderProfile,
    jacobianLipschitzRemainderProfile,
    rhoXLowerRemainderProfile,
    rhoXUpperRemainderProfile,
    rXLowerRemainderProfile,
    rXUpperRemainderProfile,
    mGRemainderProfile,
    rootTangentNumeratorRemainderProfile,
  ];
  if (!primitiveInputs.some(isProvided) && !profileInputs.some(isProvided)) {
    return emptyPrimitiveRemainderProfileScale("not-provided");
  }
  if (!primitiveInputs.every(isProvided)) {
    return emptyPrimitiveRemainderProfileScale(
      "missing-primitive-remainder-profile-scale-inputs"
    );
  }

  assertFinitePositive("profileScaleTolerance", Number(profileScaleTolerance));
  const maxIterations = Number(profileScaleMaxIterations);
  if (
    !Number.isInteger(maxIterations) ||
    maxIterations <= 0 ||
    maxIterations > 1000
  ) {
    throw new Error("profileScaleMaxIterations must be an integer in [1,1000]");
  }

  const profile = {
    centerResidualRemainderBound: allowanceNumber(
      "centerResidualRemainderProfile",
      centerResidualRemainderProfile
    ),
    centerJacobianLowerRemainderBound: allowanceNumber(
      "centerJacobianLowerRemainderProfile",
      centerJacobianLowerRemainderProfile
    ),
    jacobianLipschitzRemainderBound: allowanceNumber(
      "jacobianLipschitzRemainderProfile",
      jacobianLipschitzRemainderProfile
    ),
    rhoXLowerRemainderBound: allowanceNumber(
      "rhoXLowerRemainderProfile",
      rhoXLowerRemainderProfile
    ),
    rhoXUpperRemainderBound: allowanceNumber(
      "rhoXUpperRemainderProfile",
      rhoXUpperRemainderProfile
    ),
    rXLowerRemainderBound: allowanceNumber(
      "rXLowerRemainderProfile",
      rXLowerRemainderProfile
    ),
    rXUpperRemainderBound: allowanceNumber(
      "rXUpperRemainderProfile",
      rXUpperRemainderProfile
    ),
    mGRemainderBound: allowanceNumber("mGRemainderProfile", mGRemainderProfile),
    rootTangentNumeratorRemainderBound: allowanceNumber(
      "rootTangentNumeratorRemainderProfile",
      rootTangentNumeratorRemainderProfile
    ),
  };
  const hasPositiveProfile = Object.values(profile).some((value) => value > 0);
  const exactMultiProfileBoundary =
    profile.rhoXLowerRemainderBound === 0 &&
    profile.rhoXUpperRemainderBound === 0 &&
    profile.rXLowerRemainderBound === 0 &&
    profile.rXUpperRemainderBound === 0
      ? computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate({
          radiusMultiple,
          mGBound,
          rootTangentNumeratorBound,
          centerResidualBound,
          centerJacobianLowerBound,
          jacobianLipschitzBound,
          rhoX,
          rX,
          centerResidualRemainderProfile:
            profile.centerResidualRemainderBound,
          centerJacobianLowerRemainderProfile:
            profile.centerJacobianLowerRemainderBound,
          jacobianLipschitzRemainderProfile:
            profile.jacobianLipschitzRemainderBound,
          mGRemainderProfile: profile.mGRemainderBound,
          rootTangentNumeratorRemainderProfile:
            profile.rootTangentNumeratorRemainderBound,
        })
      : emptyPrimitiveAnalyticRemainderMultiProfileBoundary(
          "not-applicable-nonzero-graph-radius-profile"
        );
  const profileCauchyBudget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: 0,
  });
  const profileRightScalar =
    B_D_39 *
    profileCauchyBudget.rho_power_41 *
    profileCauchyBudget.one_minus_q;
  const profileConstantTerm =
    D_IDENTITY_COEFFICIENT +
    1 / (profileCauchyBudget.radius_multiple - 1);
  const scaledBudget = (scale) =>
    computeH39PrimitiveRemainderBudgetCandidate({
      radiusMultiple,
      mGBound,
      rootTangentNumeratorBound,
      centerResidualBound,
      centerJacobianLowerBound,
      jacobianLipschitzBound,
      rhoX,
      rX,
      centerResidualRemainderBound:
        scale * profile.centerResidualRemainderBound,
      centerJacobianLowerRemainderBound:
        scale * profile.centerJacobianLowerRemainderBound,
      jacobianLipschitzRemainderBound:
        scale * profile.jacobianLipschitzRemainderBound,
      rhoXLowerRemainderBound:
        scale * profile.rhoXLowerRemainderBound,
      rhoXUpperRemainderBound:
        scale * profile.rhoXUpperRemainderBound,
      rXLowerRemainderBound: scale * profile.rXLowerRemainderBound,
      rXUpperRemainderBound: scale * profile.rXUpperRemainderBound,
      mGRemainderBound: scale * profile.mGRemainderBound,
      rootTangentNumeratorRemainderBound:
        scale * profile.rootTangentNumeratorRemainderBound,
    });
  const profileBudget = (scale) => {
    const budget = scaledBudget(scale);
    const safeProduct =
      budget.primitive_remainder_budget_min_J_min !== null &&
      budget.primitive_remainder_budget_min_sigma_X !== null
        ? budget.primitive_remainder_budget_min_J_min *
          budget.primitive_remainder_budget_min_sigma_X
        : null;
    const safeScalarLeft =
      safeProduct === null || !(safeProduct > 0)
        ? null
        : budget.primitive_remainder_budget_worst_M_G *
          (profileConstantTerm +
            budget.primitive_remainder_budget_worst_M_R / safeProduct);
    const safeScalarMargin =
      safeScalarLeft === null
        ? null
        : profileRightScalar - safeScalarLeft;
    return {
      ...budget,
      primitive_remainder_profile_scale_monotone_mode:
        "safe-product-floor",
      primitive_remainder_profile_scale_safe_J_min_sigma_X:
        safeProduct,
      primitive_remainder_profile_scale_safe_scalar_left:
        safeScalarLeft,
      primitive_remainder_profile_scale_safe_scalar_margin:
        safeScalarMargin,
      primitive_remainder_profile_scale_safe_closes_candidate:
        budget.primitive_remainder_budget_min_J_min > 0 &&
        budget.primitive_remainder_budget_min_sigma_X > 0 &&
        budget.primitive_remainder_budget_min_rouche_margin > 0 &&
        safeScalarMargin > 0,
    };
  };

  const zeroBudget = profileBudget(0);
  if (
    zeroBudget.primitive_remainder_profile_scale_safe_closes_candidate !== true
  ) {
    return {
      ...emptyPrimitiveRemainderProfileScale(
        "h39-primitive-remainder-profile-scale-base-open"
      ),
      primitive_remainder_profile_scale_budget_at_candidate: zeroBudget,
      primitive_remainder_profile_scale_exact_multi_profile_boundary:
        exactMultiProfileBoundary,
    };
  }
  if (!hasPositiveProfile) {
    const [limitingName, limitingValue] =
      limitingPrimitiveRemainderMargin(zeroBudget);
    return {
      ...emptyPrimitiveRemainderProfileScale(
        "h39-primitive-remainder-profile-scale-unbounded-for-zero-profile"
      ),
      primitive_remainder_profile_scale_candidate: null,
      primitive_remainder_profile_scale_closed_through_upper_bound: null,
      primitive_remainder_profile_scale_iterations: 0,
      primitive_remainder_profile_scale_tolerance: Number(profileScaleTolerance),
      primitive_remainder_profile_scale_limiting_margin_name: limitingName,
      primitive_remainder_profile_scale_limiting_margin_value: limitingValue,
      primitive_remainder_profile_scale_budget_at_candidate: zeroBudget,
      primitive_remainder_profile_scale_exact_multi_profile_boundary:
        exactMultiProfileBoundary,
    };
  }

  const hasProvidedUpper = isProvided(profileScaleUpperBound);
  let upper = hasProvidedUpper ? Number(profileScaleUpperBound) : 1;
  assertFinitePositive("profileScaleUpperBound", upper);
  let lower = 0;
  let upperBudget = profileBudget(upper);
  let bracketIterations = 0;
  if (!hasProvidedUpper) {
    while (
      upperBudget.primitive_remainder_profile_scale_safe_closes_candidate ===
        true &&
      upper < DEFAULT_PROFILE_SCALE_SEARCH_LIMIT
    ) {
      lower = upper;
      upper *= 2;
      upperBudget = profileBudget(upper);
      bracketIterations += 1;
    }
  }

  if (
    upperBudget.primitive_remainder_profile_scale_safe_closes_candidate ===
    true
  ) {
    const [limitingName, limitingValue] =
      limitingPrimitiveRemainderMargin(upperBudget);
    return {
      ...emptyPrimitiveRemainderProfileScale(
        hasProvidedUpper
          ? "h39-primitive-remainder-profile-scale-closed-through-upper-bound"
          : "h39-primitive-remainder-profile-scale-closed-through-search-limit"
      ),
      primitive_remainder_profile_scale_candidate: upper,
      primitive_remainder_profile_scale_closed_through_upper_bound: true,
      primitive_remainder_profile_scale_iterations: bracketIterations,
      primitive_remainder_profile_scale_tolerance: Number(profileScaleTolerance),
      primitive_remainder_profile_scale_limiting_margin_name: limitingName,
      primitive_remainder_profile_scale_limiting_margin_value: limitingValue,
      primitive_remainder_profile_scale_budget_at_candidate: upperBudget,
      primitive_remainder_profile_scale_exact_multi_profile_boundary:
        exactMultiProfileBoundary,
    };
  }

  let candidateBudget = lower === 0 ? zeroBudget : profileBudget(lower);
  let iterations = bracketIterations;
  for (let i = 0; i < maxIterations; i += 1) {
    const mid = 0.5 * (lower + upper);
    const midBudget = profileBudget(mid);
    iterations += 1;
    if (
      midBudget.primitive_remainder_profile_scale_safe_closes_candidate === true
    ) {
      lower = mid;
      candidateBudget = midBudget;
    } else {
      upper = mid;
      upperBudget = midBudget;
    }
    if (upper - lower <= Number(profileScaleTolerance) * Math.max(1, upper)) {
      break;
    }
  }

  const [limitingName, limitingValue] =
    limitingPrimitiveRemainderMargin(candidateBudget);
  const scaled = {
    E: lower * profile.centerResidualRemainderBound,
    nu: lower * profile.centerJacobianLowerRemainderBound,
    L: lower * profile.jacobianLipschitzRemainderBound,
    rhoLower: lower * profile.rhoXLowerRemainderBound,
    rhoUpper: lower * profile.rhoXUpperRemainderBound,
    rLower: lower * profile.rXLowerRemainderBound,
    rUpper: lower * profile.rXUpperRemainderBound,
    G: lower * profile.mGRemainderBound,
    R: lower * profile.rootTangentNumeratorRemainderBound,
  };

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
    primitive_remainder_profile_scale_status:
      "h39-primitive-remainder-profile-scale-candidate-emitted",
    primitive_remainder_profile_scale_formula:
      "lambda profile: scale nonnegative primitive remainder directions by lambda and find the largest candidate scale that preserves the robust h39 primitive remainder budget",
    primitive_remainder_profile_scale_candidate_only: true,
    primitive_remainder_profile_scale_strict_inequalities: true,
    primitive_remainder_profile_scale_candidate: lower,
    primitive_remainder_profile_scale_first_failing_upper: upper,
    primitive_remainder_profile_scale_closed_through_upper_bound: false,
    primitive_remainder_profile_scale_iterations: iterations,
    primitive_remainder_profile_scale_tolerance: Number(profileScaleTolerance),
    primitive_remainder_profile_scale_limiting_margin_name: limitingName,
    primitive_remainder_profile_scale_limiting_margin_value: limitingValue,
    primitive_remainder_profile_scale_E_R_profile:
      profile.centerResidualRemainderBound,
    primitive_remainder_profile_scale_nu_J_loss_profile:
      profile.centerJacobianLowerRemainderBound,
    primitive_remainder_profile_scale_L_J_profile:
      profile.jacobianLipschitzRemainderBound,
    primitive_remainder_profile_scale_rho_X_lower_profile:
      profile.rhoXLowerRemainderBound,
    primitive_remainder_profile_scale_rho_X_upper_profile:
      profile.rhoXUpperRemainderBound,
    primitive_remainder_profile_scale_r_X_lower_profile:
      profile.rXLowerRemainderBound,
    primitive_remainder_profile_scale_r_X_upper_profile:
      profile.rXUpperRemainderBound,
    primitive_remainder_profile_scale_M_G_profile:
      profile.mGRemainderBound,
    primitive_remainder_profile_scale_M_R_profile:
      profile.rootTangentNumeratorRemainderBound,
    primitive_remainder_profile_scale_scaled_E_R_allowance: scaled.E,
    primitive_remainder_profile_scale_scaled_nu_J_loss_allowance: scaled.nu,
    primitive_remainder_profile_scale_scaled_L_J_allowance: scaled.L,
    primitive_remainder_profile_scale_scaled_rho_X_lower_allowance:
      scaled.rhoLower,
    primitive_remainder_profile_scale_scaled_rho_X_upper_allowance:
      scaled.rhoUpper,
    primitive_remainder_profile_scale_scaled_r_X_lower_allowance:
      scaled.rLower,
    primitive_remainder_profile_scale_scaled_r_X_upper_allowance:
      scaled.rUpper,
    primitive_remainder_profile_scale_scaled_M_G_allowance: scaled.G,
    primitive_remainder_profile_scale_scaled_M_R_allowance: scaled.R,
    primitive_remainder_profile_scale_budget_at_candidate: candidateBudget,
    primitive_remainder_profile_scale_budget_at_first_failing_upper:
      upperBudget,
    primitive_remainder_profile_scale_exact_multi_profile_boundary:
      exactMultiProfileBoundary,
    certifies_directed_rounded_h39_polydisc_bounds: false,
    certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
      false,
    retained_branch: false,
  };
}

function emptyRoucheRadiusSupremum(status) {
  return {
    rouche_radius_supremum_status: status,
    rouche_window_supremal_M_R_ceiling_status: status,
    rouche_radius_supremum_formula:
      "sup M_R=(nu_J-L_J*rho_X)*(rho_X-r_R^-)*((1-q)*B_D_39*rho^41/M_G-40-q/(1-q))",
    rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R_formula:
      "sup_{r_X in I_R} M_R < (nu_J-L_J*rho_X)*rouche_best_sigma_X_supremum*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
    rouche_radius_supremum_monotonicity:
      "for fixed E_R, nu_J, L_J, rho_X, M_G, the admissible M_R ceiling is linear in rho_X-r_X and is maximized as r_X approaches the lower strict Rouché boundary from above",
    rouche_radius_supremum_attained: null,
    rouche_radius_supremum_strict_slack_required: null,
    rouche_radius_supremum_lower_boundary_r_X: null,
    rouche_radius_supremum_sigma_X: null,
    rouche_radius_supremum_slope_budget: null,
    rouche_radius_supremal_M_R_ceiling: null,
    rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R:
      null,
    rouche_window_supremal_M_R_ceiling_r_X_boundary: null,
    rouche_window_supremal_M_R_ceiling_sigma_X_supremum: null,
    rouche_window_supremal_M_R_ceiling_attained: null,
    rouche_window_supremal_M_R_ceiling_attainment_status: null,
    rouche_radius_supremal_M_R_ceiling_positive: null,
    candidate_M_R_below_rouche_radius_supremum: null,
    candidate_M_R_margin_to_rouche_radius_supremum: null,
    candidate_rouche_window_root_tangent_numerator_bound_M_R_margin:
      null,
    candidate_root_tangent_numerator_below_rouche_window_supremal_M_R_ceiling:
      null,
  };
}

export function computeH39RoucheRadiusSupremumCeiling({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoX,
} = {}) {
  const roucheInputs = [
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
  ];
  const hasAnyRoucheInput = roucheInputs.some(isProvided);
  const hasCompleteRoucheInputs = roucheInputs.every(isProvided);
  const hasAnyInput = [mGBound, rootTangentNumeratorBound, ...roucheInputs].some(
    isProvided
  );

  if (!hasAnyInput || !hasAnyRoucheInput) {
    return emptyRoucheRadiusSupremum("not-provided");
  }
  if (!hasCompleteRoucheInputs) {
    return emptyRoucheRadiusSupremum("missing-rouche-radius-inputs");
  }
  if (!isProvided(mGBound)) {
    return emptyRoucheRadiusSupremum("open: provide M_G bound");
  }

  const radiusWindow = computeH39RootGraphRoucheRadiusWindow({
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
    rhoX,
  });
  const candidateMGBound = Number(mGBound);
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  if (candidateMGBound === 0) {
    return {
      ...emptyRoucheRadiusSupremum("unbounded-for-zero-M_G-bound"),
      rouche_window_supremal_M_R_ceiling_status:
        "unbounded-for-zero-M_G-bound",
      rouche_radius_supremum_attained: false,
      rouche_radius_supremum_strict_slack_required: true,
      rouche_radius_supremum_lower_boundary_r_X:
        radiusWindow.rouche_radius_lower_boundary,
      rouche_radius_supremum_sigma_X:
        radiusWindow.rouche_best_sigma_X_supremum,
      rouche_window_supremal_M_R_ceiling_r_X_boundary:
        radiusWindow.rouche_radius_lower_boundary,
      rouche_window_supremal_M_R_ceiling_sigma_X_supremum:
        radiusWindow.rouche_best_sigma_X_supremum,
      rouche_window_supremal_M_R_ceiling_attained: false,
      rouche_window_supremal_M_R_ceiling_attainment_status:
        "unattained-open-rouche-window",
    };
  }
  if (radiusWindow.rouche_radius_window_nonempty !== true) {
    return emptyRoucheRadiusSupremum("rouche-radius-window-empty");
  }

  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const resolvedRhoX = Number(rhoX);
  const jMinSupremum = centerJacobianBound - lipschitzBound * resolvedRhoX;
  if (!(jMinSupremum > 0)) {
    return emptyRoucheRadiusSupremum("rouche-jacobian-floor-open");
  }

  const budget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: 0,
  });
  const slopeBudget =
    (1 - budget.q) * B_D_39 * budget.rho_power_41 / candidateMGBound -
    D_IDENTITY_COEFFICIENT -
    budget.q / (1 - budget.q);
  const sigmaSupremum = radiusWindow.rouche_best_sigma_X_supremum;
  const supremalMR = jMinSupremum * sigmaSupremum * slopeBudget;
  const numeratorBound = isProvided(rootTangentNumeratorBound)
    ? Number(rootTangentNumeratorBound)
    : null;
  if (numeratorBound !== null) {
    assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  }
  if (!(slopeBudget > 0) || !(supremalMR > 0)) {
    return {
      ...emptyRoucheRadiusSupremum("no-positive-rouche-window-M_R-budget"),
      rouche_window_supremal_M_R_ceiling_status:
        "no-positive-rouche-window-M_R-budget",
      rouche_radius_supremum_attained: false,
      rouche_radius_supremum_strict_slack_required: true,
      rouche_radius_supremum_lower_boundary_r_X:
        radiusWindow.rouche_radius_lower_boundary,
      rouche_radius_supremum_sigma_X: sigmaSupremum,
      rouche_radius_supremum_slope_budget: slopeBudget,
      rouche_window_supremal_M_R_ceiling_r_X_boundary:
        radiusWindow.rouche_radius_lower_boundary,
      rouche_window_supremal_M_R_ceiling_sigma_X_supremum: sigmaSupremum,
      rouche_window_supremal_M_R_ceiling_attained: false,
      rouche_window_supremal_M_R_ceiling_attainment_status:
        "unattained-open-rouche-window",
    };
  }
  const candidateMargin =
    numeratorBound === null ? null : supremalMR - numeratorBound;

  return {
    rouche_radius_supremum_status:
      "positive-supremal-M_R-budget",
    rouche_window_supremal_M_R_ceiling_status:
      "positive-supremal-M_R-budget",
    rouche_radius_supremum_formula:
      "sup M_R=(nu_J-L_J*rho_X)*(rho_X-r_R^-)*((1-q)*B_D_39*rho^41/M_G-40-q/(1-q)); use r_R^-=E_R/nu_J when L_J=0",
    rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R_formula:
      "sup_{r_X in I_R} M_R < (nu_J-L_J*rho_X)*rouche_best_sigma_X_supremum*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
    rouche_radius_supremum_monotonicity:
      "for fixed E_R, nu_J, L_J, rho_X, M_G, the admissible M_R ceiling is linear in rho_X-r_X and is maximized as r_X approaches the lower strict Rouché boundary from above",
    rouche_radius_supremum_attained: false,
    rouche_radius_supremum_strict_slack_required: true,
    rouche_radius_supremum_lower_boundary_r_X:
      radiusWindow.rouche_radius_lower_boundary,
    rouche_radius_supremum_sigma_X: sigmaSupremum,
    rouche_radius_supremum_slope_budget: slopeBudget,
    rouche_radius_supremal_M_R_ceiling: supremalMR,
    rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R:
      supremalMR,
    rouche_window_supremal_M_R_ceiling_r_X_boundary:
      radiusWindow.rouche_radius_lower_boundary,
    rouche_window_supremal_M_R_ceiling_sigma_X_supremum: sigmaSupremum,
    rouche_window_supremal_M_R_ceiling_attained: false,
    rouche_window_supremal_M_R_ceiling_attainment_status:
      "unattained-open-rouche-window",
    rouche_radius_supremal_M_R_ceiling_positive: true,
    candidate_M_R_below_rouche_radius_supremum:
      numeratorBound === null ? null : numeratorBound < supremalMR,
    candidate_M_R_margin_to_rouche_radius_supremum: candidateMargin,
    candidate_rouche_window_root_tangent_numerator_bound_M_R_margin:
      candidateMargin,
    candidate_root_tangent_numerator_below_rouche_window_supremal_M_R_ceiling:
      numeratorBound === null ? null : numeratorBound < supremalMR,
  };
}

function emptyRoucheRhoXOptimum(status) {
  return {
    rouche_rho_X_optimum_status: status,
    rouche_rho_X_optimal_M_R_ceiling_status: status,
    rouche_rho_X_optimum_formula:
      "optimize C_D*(nu_J-L_J*rho_X)*(rho_X-r_low) over admissible rho_X, then let r_X approach r_low from above",
    rouche_rho_X_optimum_monotonicity:
      "after r_X optimization, the rho_X factor is concave quadratic for L_J>0 and linear increasing for L_J=0",
    rouche_rho_X_optimum_attained: null,
    rouche_rho_X_optimum_strict_slack_required: null,
    rouche_rho_X_optimum_lower_boundary_r_X: null,
    rouche_rho_X_optimum_rho_X: null,
    rouche_rho_X_upper_bound: null,
    rouche_rho_X_optimum_sigma_X: null,
    rouche_rho_X_optimum_slope_budget: null,
    rouche_rho_X_optimal_M_R_ceiling: null,
    rouche_rho_X_optimal_admissible_root_tangent_numerator_bound_M_R:
      null,
    rouche_rho_X_optimal_M_R_ceiling_positive: null,
    candidate_M_R_below_rouche_rho_X_optimum: null,
    candidate_M_R_margin_to_rouche_rho_X_optimum: null,
    candidate_root_tangent_numerator_below_rouche_rho_X_optimal_M_R_ceiling:
      null,
  };
}

export function computeH39RoucheRhoXOptimumCeiling({
  radiusMultiple = DEFAULT_RADIUS_MULTIPLE,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoXUpperBound,
} = {}) {
  const coreInputs = [
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
  ];
  const hasAnyInput = [
    mGBound,
    rootTangentNumeratorBound,
    rhoXUpperBound,
    ...coreInputs,
  ].some(isProvided);
  const hasAnyOptimumInput = [rhoXUpperBound, ...coreInputs].some(isProvided);
  const hasCompleteCoreInputs = coreInputs.every(isProvided);

  if (!hasAnyInput || !hasAnyOptimumInput) {
    return emptyRoucheRhoXOptimum("not-provided");
  }
  if (!hasCompleteCoreInputs) {
    return emptyRoucheRhoXOptimum(
      "missing-rouche-rho-X-optimum-inputs"
    );
  }
  if (!isProvided(mGBound)) {
    return emptyRoucheRhoXOptimum("open: provide M_G bound");
  }

  const residualBound = Number(centerResidualBound);
  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const candidateMGBound = Number(mGBound);
  const upperBound = isProvided(rhoXUpperBound)
    ? Number(rhoXUpperBound)
    : null;
  assertFiniteNonnegative("centerResidualBound", residualBound);
  assertFinitePositive("centerJacobianLowerBound", centerJacobianBound);
  assertFiniteNonnegative("jacobianLipschitzBound", lipschitzBound);
  if (upperBound !== null) {
    assertFinitePositive("rhoXUpperBound", upperBound);
  }
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }

  let lowerBoundary = null;
  let unconstrainedRhoX = null;
  if (lipschitzBound === 0) {
    lowerBoundary = residualBound / centerJacobianBound;
  } else {
    const discriminant =
      centerJacobianBound * centerJacobianBound -
      2 * lipschitzBound * residualBound;
    if (!(discriminant > 0)) {
      return {
        ...emptyRoucheRhoXOptimum("rouche-radius-window-empty"),
        rouche_rho_X_upper_bound: upperBound,
      };
    }
    const sqrtDiscriminant = Math.sqrt(discriminant);
    lowerBoundary =
      (2 * residualBound) / (centerJacobianBound + sqrtDiscriminant);
    unconstrainedRhoX =
      (centerJacobianBound + lipschitzBound * lowerBoundary) /
      (2 * lipschitzBound);
  }

  if (upperBound !== null && !(upperBound > lowerBoundary)) {
    return {
      ...emptyRoucheRhoXOptimum("rouche-radius-window-empty"),
      rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_rho_X_upper_bound: upperBound,
    };
  }
  if (candidateMGBound === 0) {
    return {
      ...emptyRoucheRhoXOptimum("unbounded-for-zero-M_G-bound"),
      rouche_rho_X_optimum_attained: false,
      rouche_rho_X_optimum_strict_slack_required: true,
      rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_rho_X_upper_bound: upperBound,
    };
  }

  const budget = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple,
    xiOverSigmaX: 0,
  });
  const slopeBudget =
    (1 - budget.q) * B_D_39 * budget.rho_power_41 / candidateMGBound -
    D_IDENTITY_COEFFICIENT -
    budget.q / (1 - budget.q);
  if (!(slopeBudget > 0)) {
    return {
      ...emptyRoucheRhoXOptimum("no-positive-rouche-rho-X-M_R-budget"),
      rouche_rho_X_optimum_attained: false,
      rouche_rho_X_optimum_strict_slack_required: true,
      rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_rho_X_upper_bound: upperBound,
      rouche_rho_X_optimum_slope_budget: slopeBudget,
    };
  }

  if (lipschitzBound === 0 && upperBound === null) {
    return {
      ...emptyRoucheRhoXOptimum(
        "unbounded-rho-X-optimum-with-zero-L_J"
      ),
      rouche_rho_X_optimum_attained: false,
      rouche_rho_X_optimum_strict_slack_required: true,
      rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_rho_X_optimum_slope_budget: slopeBudget,
    };
  }

  const selectedRhoX =
    lipschitzBound === 0
      ? upperBound
      : upperBound === null
        ? unconstrainedRhoX
        : Math.min(upperBound, unconstrainedRhoX);
  const jacobianFloor =
    centerJacobianBound - lipschitzBound * selectedRhoX;
  const sigmaSupremum = selectedRhoX - lowerBoundary;
  if (!(jacobianFloor > 0) || !(sigmaSupremum > 0)) {
    return {
      ...emptyRoucheRhoXOptimum("rouche-jacobian-floor-open"),
      rouche_rho_X_optimum_attained: false,
      rouche_rho_X_optimum_strict_slack_required: true,
      rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_rho_X_optimum_rho_X: selectedRhoX,
      rouche_rho_X_upper_bound: upperBound,
      rouche_rho_X_optimum_sigma_X: sigmaSupremum,
      rouche_rho_X_optimum_slope_budget: slopeBudget,
    };
  }

  const supremalMR = jacobianFloor * sigmaSupremum * slopeBudget;
  if (!(supremalMR > 0)) {
    return {
      ...emptyRoucheRhoXOptimum("no-positive-rouche-rho-X-M_R-budget"),
      rouche_rho_X_optimum_attained: false,
      rouche_rho_X_optimum_strict_slack_required: true,
      rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_rho_X_optimum_rho_X: selectedRhoX,
      rouche_rho_X_upper_bound: upperBound,
      rouche_rho_X_optimum_sigma_X: sigmaSupremum,
      rouche_rho_X_optimum_slope_budget: slopeBudget,
    };
  }

  const numeratorBound = isProvided(rootTangentNumeratorBound)
    ? Number(rootTangentNumeratorBound)
    : null;
  if (numeratorBound !== null) {
    assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  }
  const candidateMargin =
    numeratorBound === null ? null : supremalMR - numeratorBound;

  return {
    rouche_rho_X_optimum_status: "positive-rho-X-optimal-M_R-budget",
    rouche_rho_X_optimal_M_R_ceiling_status:
      "positive-rho-X-optimal-M_R-budget",
    rouche_rho_X_optimum_formula:
      lipschitzBound === 0
        ? "with L_J=0 and rho_X<=rho_X_upper, sup M_R=(nu_J*rho_X_upper-E_R)*C_D"
        : "with L_J>0, rho_X*=min(rho_X_upper,(nu_J/L_J+r_low)/2) when a cap is supplied; without a cap use the interior rho_X*",
    rouche_rho_X_optimum_monotonicity:
      "after r_X optimization, the rho_X factor is concave quadratic for L_J>0 and linear increasing for L_J=0",
    rouche_rho_X_optimum_attained: false,
    rouche_rho_X_optimum_strict_slack_required: true,
    rouche_rho_X_optimum_lower_boundary_r_X: lowerBoundary,
    rouche_rho_X_optimum_rho_X: selectedRhoX,
    rouche_rho_X_upper_bound: upperBound,
    rouche_rho_X_optimum_sigma_X: sigmaSupremum,
    rouche_rho_X_optimum_slope_budget: slopeBudget,
    rouche_rho_X_optimal_M_R_ceiling: supremalMR,
    rouche_rho_X_optimal_admissible_root_tangent_numerator_bound_M_R:
      supremalMR,
    rouche_rho_X_optimal_M_R_ceiling_positive: true,
    candidate_M_R_below_rouche_rho_X_optimum:
      numeratorBound === null ? null : numeratorBound < supremalMR,
    candidate_M_R_margin_to_rouche_rho_X_optimum: candidateMargin,
    candidate_root_tangent_numerator_below_rouche_rho_X_optimal_M_R_ceiling:
      numeratorBound === null ? null : numeratorBound < supremalMR,
  };
}

function emptyRoucheYRadiusOptimum(status) {
  return {
    rouche_y_radius_optimum_status: status,
    rouche_y_radius_optimal_M_R_ceiling_status: status,
    rouche_y_radius_optimum_formula:
      "under fixed shared-domain constants, optimize C_D(s)*X_factor with C_D(s)=B_D_39*Y^41*s^40*(s-1)/M_G-40-1/(s-1)",
    rouche_y_radius_optimum_derivative_formula:
      "C_D'(s)=(B_D_39*Y^41/M_G)*s^39*(41*s-40)+1/(s-1)^2",
    rouche_y_radius_optimum_monotonicity:
      "for M_G>0 and s>1, C_D'(s)>0, so a finite certified y-radius cap is optimized at the largest admissible s",
    rouche_y_radius_optimum_fixed_constant_caveat:
      "valid only while E_R, nu_J, L_J, and M_G are certified over the compared shared-domain family",
    rouche_y_radius_optimum_attained: null,
    rouche_y_radius_optimum_strict_slack_required: null,
    rouche_y_radius_optimum_lower_boundary_r_X: null,
    rouche_y_radius_optimum_rho_X: null,
    rouche_y_radius_rho_X_upper_bound: null,
    rouche_y_radius_optimum_sigma_X: null,
    rouche_y_radius_upper_bound_s: null,
    rouche_y_radius_optimum_s: null,
    rouche_y_radius_optimum_rho: null,
    rouche_y_radius_optimum_slope_budget: null,
    rouche_y_radius_optimum_X_factor: null,
    rouche_y_radius_optimal_M_R_ceiling: null,
    rouche_y_radius_optimal_admissible_root_tangent_numerator_bound_M_R:
      null,
    rouche_y_radius_optimal_M_R_ceiling_positive: null,
    candidate_M_R_below_rouche_y_radius_optimum: null,
    candidate_M_R_margin_to_rouche_y_radius_optimum: null,
    candidate_root_tangent_numerator_below_rouche_y_radius_optimal_M_R_ceiling:
      null,
  };
}

export function computeH39RoucheYRadiusOptimumCeiling({
  radiusMultipleUpperBound,
  mGBound,
  rootTangentNumeratorBound,
  centerResidualBound,
  centerJacobianLowerBound,
  jacobianLipschitzBound,
  rhoXUpperBound,
} = {}) {
  const coreInputs = [
    centerResidualBound,
    centerJacobianLowerBound,
    jacobianLipschitzBound,
  ];
  const hasAnyInput = [
    radiusMultipleUpperBound,
    mGBound,
    rootTangentNumeratorBound,
    rhoXUpperBound,
    ...coreInputs,
  ].some(isProvided);
  const hasAnyOptimumInput = [
    radiusMultipleUpperBound,
    rhoXUpperBound,
    ...coreInputs,
  ].some(isProvided);
  const hasCompleteCoreInputs = coreInputs.every(isProvided);

  if (!hasAnyInput || !hasAnyOptimumInput) {
    return emptyRoucheYRadiusOptimum("not-provided");
  }
  if (!hasCompleteCoreInputs) {
    return emptyRoucheYRadiusOptimum(
      "missing-rouche-y-radius-optimum-inputs"
    );
  }
  if (!isProvided(mGBound)) {
    return emptyRoucheYRadiusOptimum("open: provide M_G bound");
  }

  const residualBound = Number(centerResidualBound);
  const centerJacobianBound = Number(centerJacobianLowerBound);
  const lipschitzBound = Number(jacobianLipschitzBound);
  const candidateMGBound = Number(mGBound);
  const radiusUpperBound = isProvided(radiusMultipleUpperBound)
    ? Number(radiusMultipleUpperBound)
    : null;
  const rhoXUpper = isProvided(rhoXUpperBound)
    ? Number(rhoXUpperBound)
    : null;
  assertFiniteNonnegative("centerResidualBound", residualBound);
  assertFinitePositive("centerJacobianLowerBound", centerJacobianBound);
  assertFiniteNonnegative("jacobianLipschitzBound", lipschitzBound);
  if (radiusUpperBound !== null) {
    assertFinitePositive("radiusMultipleUpperBound", radiusUpperBound);
  }
  if (rhoXUpper !== null) {
    assertFinitePositive("rhoXUpperBound", rhoXUpper);
  }
  if (!Number.isFinite(candidateMGBound) || candidateMGBound < 0) {
    throw new Error("mGBound must be a finite nonnegative number");
  }

  let lowerBoundary = null;
  let unconstrainedRhoX = null;
  if (lipschitzBound === 0) {
    lowerBoundary = residualBound / centerJacobianBound;
  } else {
    const discriminant =
      centerJacobianBound * centerJacobianBound -
      2 * lipschitzBound * residualBound;
    if (!(discriminant > 0)) {
      return {
        ...emptyRoucheYRadiusOptimum("rouche-radius-window-empty"),
        rouche_y_radius_upper_bound_s: radiusUpperBound,
        rouche_y_radius_rho_X_upper_bound: rhoXUpper,
      };
    }
    const sqrtDiscriminant = Math.sqrt(discriminant);
    lowerBoundary =
      (2 * residualBound) / (centerJacobianBound + sqrtDiscriminant);
    unconstrainedRhoX =
      (centerJacobianBound + lipschitzBound * lowerBoundary) /
      (2 * lipschitzBound);
  }

  if (rhoXUpper !== null && !(rhoXUpper > lowerBoundary)) {
    return {
      ...emptyRoucheYRadiusOptimum("rouche-radius-window-empty"),
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
    };
  }
  if (candidateMGBound === 0) {
    return {
      ...emptyRoucheYRadiusOptimum("unbounded-for-zero-M_G-bound"),
      rouche_y_radius_optimum_attained: false,
      rouche_y_radius_optimum_strict_slack_required: true,
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
    };
  }
  if (radiusUpperBound === null) {
    return {
      ...emptyRoucheYRadiusOptimum(
        "unbounded-y-radius-optimum-under-fixed-M_G-bound"
      ),
      rouche_y_radius_optimum_attained: false,
      rouche_y_radius_optimum_strict_slack_required: true,
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
    };
  }
  if (!(radiusUpperBound > 1)) {
    return {
      ...emptyRoucheYRadiusOptimum("rouche-y-radius-cap-empty"),
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
    };
  }

  const slopeEnvelope = computeH39RootTangentSlopeEnvelope({
    radiusMultiple: radiusUpperBound,
    mGBound: candidateMGBound,
  });
  const slopeBudget = slopeEnvelope.maximum_admissible_xi_over_sigma_X;
  if (!(slopeBudget > 0)) {
    return {
      ...emptyRoucheYRadiusOptimum(
        "no-positive-rouche-y-radius-M_R-budget"
      ),
      rouche_y_radius_optimum_attained: false,
      rouche_y_radius_optimum_strict_slack_required: true,
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_optimum_s: radiusUpperBound,
      rouche_y_radius_optimum_rho:
        radiusUpperBound * FIRST_Y_CELL_UPPER,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
      rouche_y_radius_optimum_slope_budget: slopeBudget,
    };
  }
  if (lipschitzBound === 0 && rhoXUpper === null) {
    return {
      ...emptyRoucheYRadiusOptimum(
        "unbounded-rho-X-optimum-with-zero-L_J"
      ),
      rouche_y_radius_optimum_attained: false,
      rouche_y_radius_optimum_strict_slack_required: true,
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_optimum_s: radiusUpperBound,
      rouche_y_radius_optimum_rho:
        radiusUpperBound * FIRST_Y_CELL_UPPER,
      rouche_y_radius_optimum_slope_budget: slopeBudget,
    };
  }

  const selectedRhoX =
    lipschitzBound === 0
      ? rhoXUpper
      : rhoXUpper === null
        ? unconstrainedRhoX
        : Math.min(rhoXUpper, unconstrainedRhoX);
  const jacobianFloor =
    centerJacobianBound - lipschitzBound * selectedRhoX;
  const sigmaSupremum = selectedRhoX - lowerBoundary;
  const xFactor = jacobianFloor * sigmaSupremum;
  if (!(jacobianFloor > 0) || !(sigmaSupremum > 0) || !(xFactor > 0)) {
    return {
      ...emptyRoucheYRadiusOptimum("rouche-jacobian-floor-open"),
      rouche_y_radius_optimum_attained: false,
      rouche_y_radius_optimum_strict_slack_required: true,
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_optimum_rho_X: selectedRhoX,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
      rouche_y_radius_optimum_sigma_X: sigmaSupremum,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_optimum_s: radiusUpperBound,
      rouche_y_radius_optimum_rho:
        radiusUpperBound * FIRST_Y_CELL_UPPER,
      rouche_y_radius_optimum_slope_budget: slopeBudget,
    };
  }

  const supremalMR = xFactor * slopeBudget;
  if (!(supremalMR > 0)) {
    return {
      ...emptyRoucheYRadiusOptimum(
        "no-positive-rouche-y-radius-M_R-budget"
      ),
      rouche_y_radius_optimum_attained: false,
      rouche_y_radius_optimum_strict_slack_required: true,
      rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
      rouche_y_radius_optimum_rho_X: selectedRhoX,
      rouche_y_radius_rho_X_upper_bound: rhoXUpper,
      rouche_y_radius_optimum_sigma_X: sigmaSupremum,
      rouche_y_radius_upper_bound_s: radiusUpperBound,
      rouche_y_radius_optimum_s: radiusUpperBound,
      rouche_y_radius_optimum_rho:
        radiusUpperBound * FIRST_Y_CELL_UPPER,
      rouche_y_radius_optimum_slope_budget: slopeBudget,
      rouche_y_radius_optimum_X_factor: xFactor,
    };
  }

  const numeratorBound = isProvided(rootTangentNumeratorBound)
    ? Number(rootTangentNumeratorBound)
    : null;
  if (numeratorBound !== null) {
    assertFiniteNonnegative("rootTangentNumeratorBound", numeratorBound);
  }
  const candidateMargin =
    numeratorBound === null ? null : supremalMR - numeratorBound;

  return {
    rouche_y_radius_optimum_status:
      "positive-y-radius-optimal-M_R-budget",
    rouche_y_radius_optimal_M_R_ceiling_status:
      "positive-y-radius-optimal-M_R-budget",
    rouche_y_radius_optimum_formula:
      "with fixed shared-domain constants and 1<s<=s_upper, C_D(s)=B_D_39*Y^41*s^40*(s-1)/M_G-40-1/(s-1), so use s=s_upper",
    rouche_y_radius_optimum_derivative_formula:
      "C_D'(s)=(B_D_39*Y^41/M_G)*s^39*(41*s-40)+1/(s-1)^2",
    rouche_y_radius_optimum_monotonicity:
      "for M_G>0 and s>1, C_D'(s)>0, so a finite certified y-radius cap is optimized at the largest admissible s",
    rouche_y_radius_optimum_fixed_constant_caveat:
      "valid only while E_R, nu_J, L_J, and M_G are certified over the compared shared-domain family",
    rouche_y_radius_optimum_attained: false,
    rouche_y_radius_optimum_strict_slack_required: true,
    rouche_y_radius_optimum_lower_boundary_r_X: lowerBoundary,
    rouche_y_radius_optimum_rho_X: selectedRhoX,
    rouche_y_radius_rho_X_upper_bound: rhoXUpper,
    rouche_y_radius_optimum_sigma_X: sigmaSupremum,
    rouche_y_radius_upper_bound_s: radiusUpperBound,
    rouche_y_radius_optimum_s: radiusUpperBound,
    rouche_y_radius_optimum_rho: radiusUpperBound * FIRST_Y_CELL_UPPER,
    rouche_y_radius_optimum_slope_budget: slopeBudget,
    rouche_y_radius_optimum_X_factor: xFactor,
    rouche_y_radius_optimal_M_R_ceiling: supremalMR,
    rouche_y_radius_optimal_admissible_root_tangent_numerator_bound_M_R:
      supremalMR,
    rouche_y_radius_optimal_M_R_ceiling_positive: true,
    candidate_M_R_below_rouche_y_radius_optimum:
      numeratorBound === null ? null : numeratorBound < supremalMR,
    candidate_M_R_margin_to_rouche_y_radius_optimum: candidateMargin,
    candidate_root_tangent_numerator_below_rouche_y_radius_optimal_M_R_ceiling:
      numeratorBound === null ? null : numeratorBound < supremalMR,
  };
}

export function buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
  options = {}
) {
  const hasChosenRoucheRadius =
    isProvided(options.rhoX) || isProvided(options.rX);
  const rootGraphLift = hasChosenRoucheRadius
    ? computeH39RootGraphRoucheLift(options)
    : computeH39RootGraphRoucheLift({});
  const derivedInputOptions = { ...options };
  if (rootGraphLift.certifies_unique_root_in_X_disc === true) {
    if (
      isProvided(options.jacobianLowerBound) &&
      !approximatelyEqual(
        Number(options.jacobianLowerBound),
        rootGraphLift.derived_jacobian_lower_bound_J_min
      )
    ) {
      throw new Error(
        "jacobianLowerBound must match the Rouché-derived J_min"
      );
    }
    const graphSigmaX = Number(options.rhoX) - Number(options.rX);
    if (
      isProvided(options.sigmaX) &&
      !approximatelyEqual(Number(options.sigmaX), graphSigmaX)
    ) {
      throw new Error("sigmaX must match rhoX-rX from the Rouché graph lift");
    }
    derivedInputOptions.jacobianLowerBound =
      rootGraphLift.derived_jacobian_lower_bound_J_min;
    derivedInputOptions.sigmaX = graphSigmaX;
  }
  if (
    !isProvided(derivedInputOptions.jacobianLowerBound) &&
    !isProvided(derivedInputOptions.sigmaX) &&
    !hasChosenRoucheRadius
  ) {
    derivedInputOptions.rootTangentNumeratorBound = undefined;
  }
  const derivedSlopeRatio =
    computeH39RootTangentDerivedSlopeRatio(derivedInputOptions);
  if (
    derivedSlopeRatio.derived_xi_over_sigma_X !== null &&
    isProvided(options.xiOverSigmaX) &&
    !approximatelyEqual(
      Number(options.xiOverSigmaX),
      derivedSlopeRatio.derived_xi_over_sigma_X
    )
  ) {
    throw new Error(
      "xiOverSigmaX must match the derived root-tangent Xi_*/sigma_X"
    );
  }
  const effectiveXiOverSigmaX =
    derivedSlopeRatio.derived_xi_over_sigma_X ?? options.xiOverSigmaX;
  const effectiveOptions = {
    ...options,
    xiOverSigmaX: effectiveXiOverSigmaX,
  };
  const budget = computeH39RootTangentCauchyMajorantBudget(effectiveOptions);
  const slopeEnvelope = computeH39RootTangentSlopeEnvelope(effectiveOptions);
  const rouchePrimitiveClosure =
    computeH39RouchePrimitiveClosure(options);
  const primitiveSlackTolerances =
    computeH39PrimitiveSlackTolerancesCandidate(options);
  const primitiveRemainderBudget =
    computeH39PrimitiveRemainderBudgetCandidate(options);
  const primitiveRemainderProfileScale =
    computeH39PrimitiveRemainderProfileScaleCandidate(options);
  const roucheRadiusSupremum =
    computeH39RoucheRadiusSupremumCeiling(options);
  const roucheRhoXOptimum =
    computeH39RoucheRhoXOptimumCeiling(options);
  const roucheYRadiusOptimum =
    computeH39RoucheYRadiusOptimumCeiling(options);
  const candidateMGBound =
    options.mGBound === undefined ? null : Number(options.mGBound);
  if (
    candidateMGBound !== null &&
    (!Number.isFinite(candidateMGBound) || candidateMGBound < 0)
  ) {
    throw new Error("mGBound must be a finite nonnegative number");
  }
  const candidateCloses =
    candidateMGBound === null
      ? null
      : candidateMGBound < budget.D_tail_M_G_threshold;
  const candidateClosureLeftScalar =
    candidateMGBound === null
      ? null
      : candidateMGBound *
        (D_IDENTITY_COEFFICIENT +
          budget.xi_over_sigma_X +
          1 / (budget.radius_multiple - 1));
  const candidateClosureRightScalar =
    candidateMGBound === null
      ? null
      : B_D_39 * budget.rho_power_41 * budget.one_minus_q;
  const candidateGClosureLeftScalar = candidateMGBound;
  const candidateGClosureRightScalar =
    candidateMGBound === null ? null : budget.G_tail_M_G_threshold;
  const maximumAdmissibleRootTangentNumeratorBound =
    slopeEnvelope.maximum_admissible_xi_over_sigma_X === null ||
    derivedSlopeRatio.jacobian_lower_bound === null ||
    derivedSlopeRatio.sigma_X === null
      ? null
      : slopeEnvelope.maximum_admissible_xi_over_sigma_X *
        derivedSlopeRatio.jacobian_lower_bound *
        derivedSlopeRatio.sigma_X;
  const candidatePrimitivePolydiscLeftScalar =
    derivedSlopeRatio.derived_xi_over_sigma_X === null ||
    candidateClosureLeftScalar === null
      ? null
      : candidateClosureLeftScalar;
  const candidatePrimitivePolydiscRightScalar =
    derivedSlopeRatio.derived_xi_over_sigma_X === null ||
    candidateClosureRightScalar === null
      ? null
      : candidateClosureRightScalar;
  const candidatePrimitivePolydiscClosureRatio =
    candidatePrimitivePolydiscLeftScalar === null
      ? null
      : candidatePrimitivePolydiscLeftScalar /
        candidatePrimitivePolydiscRightScalar;
  const candidateRootTangentNumeratorMargin =
    maximumAdmissibleRootTangentNumeratorBound === null ||
    derivedSlopeRatio.root_tangent_numerator_bound === null
      ? null
      : maximumAdmissibleRootTangentNumeratorBound -
        derivedSlopeRatio.root_tangent_numerator_bound;
  const passed = budget.active_bottleneck === "D_tail";

  return {
    schema:
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    root_tangent_cauchy_majorant_tail_budget_parameters: {
      source_label: "3-",
      speed_constraint: NO_SPEED_WINDOW,
      speed_ratio_enclosure: [3.02156, 3.02157],
      first_y_cell: [0, FIRST_Y_CELL_UPPER],
      radius_multiple: budget.radius_multiple,
      radius_multiple_upper_bound: isProvided(
        options.radiusMultipleUpperBound
      )
        ? Number(options.radiusMultipleUpperBound)
        : null,
      rho_X_upper_bound: isProvided(options.rhoXUpperBound)
        ? Number(options.rhoXUpperBound)
        : null,
      center_residual_remainder_bound_E_R: isProvided(
        options.centerResidualRemainderBound
      )
        ? Number(options.centerResidualRemainderBound)
        : null,
      center_jacobian_lower_remainder_bound_nu_J: isProvided(
        options.centerJacobianLowerRemainderBound
      )
        ? Number(options.centerJacobianLowerRemainderBound)
        : null,
      jacobian_lipschitz_remainder_bound_L_J: isProvided(
        options.jacobianLipschitzRemainderBound
      )
        ? Number(options.jacobianLipschitzRemainderBound)
        : null,
      rho_X_lower_remainder_bound: isProvided(
        options.rhoXLowerRemainderBound
      )
        ? Number(options.rhoXLowerRemainderBound)
        : null,
      rho_X_upper_remainder_bound: isProvided(
        options.rhoXUpperRemainderBound
      )
        ? Number(options.rhoXUpperRemainderBound)
        : null,
      r_X_lower_remainder_bound: isProvided(options.rXLowerRemainderBound)
        ? Number(options.rXLowerRemainderBound)
        : null,
      r_X_upper_remainder_bound: isProvided(options.rXUpperRemainderBound)
        ? Number(options.rXUpperRemainderBound)
        : null,
      M_G_remainder_bound: isProvided(options.mGRemainderBound)
        ? Number(options.mGRemainderBound)
        : null,
      M_R_remainder_bound: isProvided(
        options.rootTangentNumeratorRemainderBound
      )
        ? Number(options.rootTangentNumeratorRemainderBound)
        : null,
      primitive_remainder_profile_scale_upper_bound: isProvided(
        options.profileScaleUpperBound
      )
        ? Number(options.profileScaleUpperBound)
        : null,
      primitive_remainder_profile_scale_tolerance: isProvided(
        options.profileScaleTolerance
      )
        ? Number(options.profileScaleTolerance)
        : DEFAULT_PROFILE_SCALE_TOLERANCE,
      primitive_remainder_profile_scale_max_iterations: isProvided(
        options.profileScaleMaxIterations
      )
        ? Number(options.profileScaleMaxIterations)
        : DEFAULT_PROFILE_SCALE_MAX_ITERATIONS,
      center_residual_remainder_profile_E_R: isProvided(
        options.centerResidualRemainderProfile
      )
        ? Number(options.centerResidualRemainderProfile)
        : null,
      center_jacobian_lower_remainder_profile_nu_J: isProvided(
        options.centerJacobianLowerRemainderProfile
      )
        ? Number(options.centerJacobianLowerRemainderProfile)
        : null,
      jacobian_lipschitz_remainder_profile_L_J: isProvided(
        options.jacobianLipschitzRemainderProfile
      )
        ? Number(options.jacobianLipschitzRemainderProfile)
        : null,
      rho_X_lower_remainder_profile: isProvided(
        options.rhoXLowerRemainderProfile
      )
        ? Number(options.rhoXLowerRemainderProfile)
        : null,
      rho_X_upper_remainder_profile: isProvided(
        options.rhoXUpperRemainderProfile
      )
        ? Number(options.rhoXUpperRemainderProfile)
        : null,
      r_X_lower_remainder_profile: isProvided(options.rXLowerRemainderProfile)
        ? Number(options.rXLowerRemainderProfile)
        : null,
      r_X_upper_remainder_profile: isProvided(options.rXUpperRemainderProfile)
        ? Number(options.rXUpperRemainderProfile)
        : null,
      M_G_remainder_profile: isProvided(options.mGRemainderProfile)
        ? Number(options.mGRemainderProfile)
        : null,
      M_R_remainder_profile: isProvided(
        options.rootTangentNumeratorRemainderProfile
      )
        ? Number(options.rootTangentNumeratorRemainderProfile)
        : null,
      rho: budget.rho,
      q: budget.q,
      xi_over_sigma_X: budget.xi_over_sigma_X,
      xi_over_sigma_X_source: derivedSlopeRatio.root_tangent_slope_source,
      candidate_M_G_bound: candidateMGBound,
      candidate_root_tangent_numerator_bound_M_R: isProvided(
        options.rootTangentNumeratorBound
      )
        ? Number(options.rootTangentNumeratorBound)
        : null,
      h39_shift_power: H39_SHIFT_POWER,
      G_tail_budget: B_G_39,
      D_tail_budget: B_D_39,
      ...rootGraphLift,
      center_residual_bound_E_R: isProvided(options.centerResidualBound)
        ? Number(options.centerResidualBound)
        : rootGraphLift.center_residual_bound_E_R,
      center_jacobian_lower_bound_nu_J: isProvided(
        options.centerJacobianLowerBound
      )
        ? Number(options.centerJacobianLowerBound)
        : rootGraphLift.center_jacobian_lower_bound_nu_J,
      jacobian_lipschitz_bound_L_J: isProvided(
        options.jacobianLipschitzBound
      )
        ? Number(options.jacobianLipschitzBound)
        : rootGraphLift.jacobian_lipschitz_bound_L_J,
      ...derivedSlopeRatio,
      root_tangent_identity:
        "T_D^(39)=-40*T_G^(39)-D_y^(X39)T_G^(39)",
      majorant_target:
        "certify sup|N_G|=M_G and sup|Xi_epsilon|=Xi_* on one graph-centered complex polydisc with X-Cauchy margin sigma_X",
    },
    root_tangent_cauchy_majorant_tail_budget_summary: {
      status:
        "theta3minus-fold-pair-first-y-GD-h39-rouche-y-radius-optimum-reduction-certified",
      ...budget,
      all_budget_formulas_finite: true,
      D_tail_stricter_than_G_tail: passed,
      candidate_closes_h39_majorant_budget: candidateCloses,
      ...rootGraphLift,
      ...derivedSlopeRatio,
      ...slopeEnvelope,
      ...rouchePrimitiveClosure,
      ...primitiveSlackTolerances,
      ...primitiveRemainderBudget,
      ...primitiveRemainderProfileScale,
      ...roucheRadiusSupremum,
      ...roucheRhoXOptimum,
      ...roucheYRadiusOptimum,
      D_tail_closure_scalar_formula:
        "M_G*(40+Xi_*/sigma_X+1/(s-1)) < B_D_39*Y^41*s^40*(s-1)",
      primitive_polydisc_certificate_formula:
        "M_G*(40+M_R/(J_min*sigma_X)+1/(s-1)) < B_D_39*Y^41*s^40*(s-1)",
      candidate_G_tail_closure_scalar_formula:
        "M_G < B_G_39*Y^41*s^40*(s-1)",
      candidate_G_tail_closure_left_scalar: candidateGClosureLeftScalar,
      candidate_G_tail_closure_right_scalar: candidateGClosureRightScalar,
      candidate_G_tail_closure_scalar_margin:
        candidateGClosureLeftScalar === null
          ? null
          : candidateGClosureRightScalar - candidateGClosureLeftScalar,
      candidate_D_tail_closure_left_scalar: candidateClosureLeftScalar,
      candidate_D_tail_closure_right_scalar: candidateClosureRightScalar,
      candidate_D_tail_closure_scalar_margin:
        candidateClosureLeftScalar === null
          ? null
          : candidateClosureRightScalar - candidateClosureLeftScalar,
      candidate_derived_D_tail_closure_left_scalar:
        derivedSlopeRatio.derived_xi_over_sigma_X === null ||
        candidateClosureLeftScalar === null
          ? null
          : candidateClosureLeftScalar,
      candidate_derived_D_tail_closure_scalar_margin:
        derivedSlopeRatio.derived_xi_over_sigma_X === null ||
        candidateClosureLeftScalar === null
          ? null
          : candidateClosureRightScalar - candidateClosureLeftScalar,
      candidate_derived_closes_h39_majorant_budget:
        derivedSlopeRatio.derived_xi_over_sigma_X === null ||
        candidateClosureLeftScalar === null
          ? null
          : candidateCloses,
      maximum_admissible_root_tangent_numerator_bound_M_R:
        maximumAdmissibleRootTangentNumeratorBound,
      maximum_admissible_root_tangent_numerator_formula:
        "M_R < J_min*sigma_X*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))",
      candidate_root_tangent_numerator_bound_M_R_margin:
        candidateRootTangentNumeratorMargin,
      candidate_primitive_polydisc_closure_left_scalar:
        candidatePrimitivePolydiscLeftScalar,
      candidate_primitive_polydisc_closure_right_scalar:
        candidatePrimitivePolydiscRightScalar,
      candidate_primitive_polydisc_closure_ratio:
        candidatePrimitivePolydiscClosureRatio,
      candidate_primitive_polydisc_certificate_closes:
        candidatePrimitivePolydiscClosureRatio === null
          ? null
          : candidatePrimitivePolydiscClosureRatio < 1,
      candidate_tail_closure_scalar_margins_positive:
        candidateClosureLeftScalar === null
          ? null
          : candidateGClosureRightScalar - candidateGClosureLeftScalar > 0 &&
            candidateClosureRightScalar - candidateClosureLeftScalar > 0,
      candidate_nonnegative_slope_feasible:
        slopeEnvelope.maximum_admissible_xi_over_sigma_X === null
          ? null
          : slopeEnvelope.maximum_admissible_xi_over_sigma_X > 0,
      candidate_xi_over_sigma_X_margin:
        slopeEnvelope.maximum_admissible_xi_over_sigma_X === null
          ? null
          : slopeEnvelope.maximum_admissible_xi_over_sigma_X -
            budget.xi_over_sigma_X,
      active_budget_decision:
        candidateCloses === null
          ? "open: provide a directed-rounded M_G bound"
          : candidateCloses
            ? "closed-for-provided-M_G-bound"
            : "open-for-provided-M_G-bound",
      radius_monotonicity_status:
        "for fixed Xi_*/sigma_X>=0, both h39 M_G thresholds strictly increase with s=rho/Y>1",
      bottleneck_status:
        "for every s>1 and Xi_*/sigma_X>=0, the correlated D threshold is stricter than the G threshold",
      required_polydisc_certificate:
        "open: directed-rounded E_R, nu_J, L_J, rho_X, finite y-radius cap when optimizing s, M_G, and M_R values on one shared graph-centered polydisc, plus a strict r_X slack choice above the Rouché lower boundary, satisfying the Rouché graph lift and primitive h39 Cauchy-majorant inequality",
    },
    closure_burndown: [
      {
        row: "theta3minus.fold-pair-first-y-GD-thirty-eighth-order-post-U-successor-coefficient",
        status: "directed-rounded-interval-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-h39-root-tangent-cauchy-majorant-budget",
        status: "rouche-y-radius-optimum-reduction-certified",
      },
      {
        row: "theta3minus.fold-pair-first-y-GD-h39-polydisc-M_G-Xi-certificate",
        status: "directed-rounded-open",
      },
    ],
    artifact_claim: {
      assumes_fixed_speed_window: false,
      reduces_h39_continuous_tail_closure_to_cauchy_majorant: true,
      certifies_directed_rounded_h39_cauchy_majorant_budget_formula: true,
      certifies_h39_root_tangent_slope_derivation_formula: true,
      certifies_h39_rouche_primitive_closure_formula: true,
      certifies_h39_rouche_radius_supremum_formula: true,
      certifies_h39_rouche_rho_X_optimum_formula: true,
      certifies_h39_rouche_y_radius_optimum_formula: true,
      proves_h39_majorant_radius_threshold_monotonicity: true,
      proves_h39_majorant_D_tail_active_bottleneck: true,
      certifies_directed_rounded_h39_polydisc_M_G_bound: false,
      certifies_directed_rounded_h39_polydisc_Xi_bound: false,
      certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound:
        false,
      certifies_directed_rounded_fold_pair_scaled_remainder: false,
      certifies_I1_regular_critical_exhaustion: false,
      retained_branch: false,
      claim_level:
        "Executable analytic budget reduction for the h39 root-tangent Cauchy-majorant route. It computes the M_G threshold implied by rho, Xi_*/sigma_X, and the h39 G/D budgets after the certified h38 coefficient row, records that the thresholds strictly increase with s=rho/Y for fixed Xi_*/sigma_X>=0, proves that the D threshold is the active bottleneck, inverts the D inequality into a maximum admissible Xi_*/sigma_X for a provided M_G bound, derives Xi_*/sigma_X from a root-tangent numerator bound, a Jacobian lower bound, and an X-Cauchy margin, computes the maximum admissible primitive numerator M_R when J_min and sigma_X are supplied, derives J_min and sigma_X from Rouché graph-lift inputs, solves the Rouché radius window to expose the best attainable Cauchy-margin target, emits the named Rouché-primitive closure ratio Lambda_39^R in the seven backend variables E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R, computes the unattained supremal admissible M_R ceiling obtained as r_X approaches the lower strict Rouché boundary from above, reduces the rho_X choice to a concave quadratic or capped linear optimum when one shared-domain rho_X upper bound is supplied, proves that under fixed shared-domain constants the y-radius budget C_D(s) has positive derivative for s>1, so a finite certified y-radius cap is optimized at the largest admissible s while an uncapped scalar y-radius family is unbounded, forms pessimistic analytic-remainder rectangles, and inverts a nonnegative analytic-remainder profile into a candidate maximum scale using the monotone safe product floor J_rob*sigma_rob; it does not certify the missing directed-rounded polydisc numerator or root-tangent bounds, and it does not claim that E_R, nu_J, L_J, or M_G remain fixed when an interval backend enlarges the shared domain.",
    },
    result: {
      theory_status:
        "h39-rouche-y-radius-optimum-reduction-certified",
      first_successor_row:
        "theta3minus.fold-pair-first-y-GD-h39-polydisc-M_G-Xi-certificate-required",
      retention: "not_retained",
      retained_branch: false,
      status_note:
        "The infinite h39 tail is now reduced to a numeric polydisc target: at rho=4Y and zero slope cost, the D tail requires M_G below the computed threshold. For fixed slope ratio, larger certified analytic radius improves both thresholds. If a candidate M_G bound is provided, this artifact computes the maximum admissible Xi_*/sigma_X slope ratio and decides the active D-threshold inequality. If Rouché graph-lift, root-tangent numerator, and M_G inputs are provided, it derives J_min, sigma_X, and Xi_*/sigma_X, reports the admissible r_X window, reports the remaining admissible M_R numerator margin, can optimize rho_X under fixed shared-domain constants, can optimize the y-radius scalar budget at a finite certified s upper cap while reporting the uncapped y-radius family as unbounded under fixed constants, and can invert a nonnegative analytic-remainder profile into the largest candidate scale that preserves the monotone safe-product h39 primitive budget.",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
  artifact
) {
  const errors = [];
  const params =
    artifact?.root_tangent_cauchy_majorant_tail_budget_parameters;
  const summary = artifact?.root_tangent_cauchy_majorant_tail_budget_summary;
  const candidateMGBound = params?.candidate_M_G_bound;
  let expectedBudget = null;
  let expectedSlopeEnvelope = null;
  let expectedDerivedSlopeRatio = null;
  let expectedRootGraphLift = null;
  let expectedRouchePrimitiveClosure = null;
  let expectedPrimitiveSlackTolerances = null;
  let expectedPrimitiveRemainderBudget = null;
  let expectedPrimitiveRemainderProfileScale = null;
  let expectedRoucheRadiusSupremum = null;
  let expectedRoucheRhoXOptimum = null;
  let expectedRoucheYRadiusOptimum = null;
  try {
    const hasChosenRoucheRadius =
      params?.rho_X !== null || params?.r_X !== null;
    expectedRootGraphLift = hasChosenRoucheRadius
      ? computeH39RootGraphRoucheLift({
          centerResidualBound: params?.center_residual_bound_E_R,
          centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
          jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
          rhoX: params?.rho_X,
          rX: params?.r_X,
        })
      : computeH39RootGraphRoucheLift({});
    expectedDerivedSlopeRatio = computeH39RootTangentDerivedSlopeRatio({
      rootTangentNumeratorBound: params?.root_tangent_numerator_bound,
      jacobianLowerBound: params?.jacobian_lower_bound,
      sigmaX: params?.sigma_X,
      rhoX: params?.rho_X,
      rX: params?.r_X,
    });
    expectedBudget = computeH39RootTangentCauchyMajorantBudget({
      radiusMultiple: Number(params?.radius_multiple),
      xiOverSigmaX: Number(params?.xi_over_sigma_X),
    });
    expectedSlopeEnvelope = computeH39RootTangentSlopeEnvelope({
      radiusMultiple: Number(params?.radius_multiple),
      mGBound: candidateMGBound,
    });
    expectedRouchePrimitiveClosure = computeH39RouchePrimitiveClosure({
      radiusMultiple: Number(params?.radius_multiple),
      mGBound: candidateMGBound,
      rootTangentNumeratorBound: params?.root_tangent_numerator_bound,
      centerResidualBound: params?.center_residual_bound_E_R,
      centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
      jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
      rhoX: params?.rho_X,
      rX: params?.r_X,
    });
    expectedPrimitiveSlackTolerances =
      computeH39PrimitiveSlackTolerancesCandidate({
        radiusMultiple: Number(params?.radius_multiple),
        mGBound: candidateMGBound,
        rootTangentNumeratorBound: params?.root_tangent_numerator_bound,
        centerResidualBound: params?.center_residual_bound_E_R,
        centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
        jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
        rhoX: params?.rho_X,
        rX: params?.r_X,
      });
    expectedPrimitiveRemainderBudget =
      computeH39PrimitiveRemainderBudgetCandidate({
        radiusMultiple: Number(params?.radius_multiple),
        mGBound: candidateMGBound,
        rootTangentNumeratorBound: params?.root_tangent_numerator_bound,
        centerResidualBound: params?.center_residual_bound_E_R,
        centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
        jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
        rhoX: params?.rho_X,
        rX: params?.r_X,
        centerResidualRemainderBound:
          params?.center_residual_remainder_bound_E_R,
        centerJacobianLowerRemainderBound:
          params?.center_jacobian_lower_remainder_bound_nu_J,
        jacobianLipschitzRemainderBound:
          params?.jacobian_lipschitz_remainder_bound_L_J,
        rhoXLowerRemainderBound: params?.rho_X_lower_remainder_bound,
        rhoXUpperRemainderBound: params?.rho_X_upper_remainder_bound,
        rXLowerRemainderBound: params?.r_X_lower_remainder_bound,
        rXUpperRemainderBound: params?.r_X_upper_remainder_bound,
        mGRemainderBound: params?.M_G_remainder_bound,
        rootTangentNumeratorRemainderBound: params?.M_R_remainder_bound,
      });
    expectedPrimitiveRemainderProfileScale =
      computeH39PrimitiveRemainderProfileScaleCandidate({
        profileScaleUpperBound:
          params?.primitive_remainder_profile_scale_upper_bound,
        profileScaleTolerance:
          params?.primitive_remainder_profile_scale_tolerance,
        profileScaleMaxIterations:
          params?.primitive_remainder_profile_scale_max_iterations,
        radiusMultiple: Number(params?.radius_multiple),
        mGBound: candidateMGBound,
        rootTangentNumeratorBound: params?.root_tangent_numerator_bound,
        centerResidualBound: params?.center_residual_bound_E_R,
        centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
        jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
        rhoX: params?.rho_X,
        rX: params?.r_X,
        centerResidualRemainderProfile:
          params?.center_residual_remainder_profile_E_R,
        centerJacobianLowerRemainderProfile:
          params?.center_jacobian_lower_remainder_profile_nu_J,
        jacobianLipschitzRemainderProfile:
          params?.jacobian_lipschitz_remainder_profile_L_J,
        rhoXLowerRemainderProfile:
          params?.rho_X_lower_remainder_profile,
        rhoXUpperRemainderProfile:
          params?.rho_X_upper_remainder_profile,
        rXLowerRemainderProfile: params?.r_X_lower_remainder_profile,
        rXUpperRemainderProfile: params?.r_X_upper_remainder_profile,
        mGRemainderProfile: params?.M_G_remainder_profile,
        rootTangentNumeratorRemainderProfile:
          params?.M_R_remainder_profile,
      });
    expectedRoucheRadiusSupremum = computeH39RoucheRadiusSupremumCeiling({
      radiusMultiple: Number(params?.radius_multiple),
      mGBound: candidateMGBound,
      rootTangentNumeratorBound: params?.root_tangent_numerator_bound,
      centerResidualBound: params?.center_residual_bound_E_R,
      centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
      jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
      rhoX: params?.rho_X,
    });
    expectedRoucheRhoXOptimum = computeH39RoucheRhoXOptimumCeiling({
      radiusMultiple: Number(params?.radius_multiple),
      mGBound: candidateMGBound,
      rootTangentNumeratorBound:
        params?.candidate_root_tangent_numerator_bound_M_R,
      centerResidualBound: params?.center_residual_bound_E_R,
      centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
      jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
      rhoXUpperBound: params?.rho_X_upper_bound,
    });
    expectedRoucheYRadiusOptimum = computeH39RoucheYRadiusOptimumCeiling({
      radiusMultipleUpperBound: params?.radius_multiple_upper_bound,
      mGBound: candidateMGBound,
      rootTangentNumeratorBound:
        params?.candidate_root_tangent_numerator_bound_M_R,
      centerResidualBound: params?.center_residual_bound_E_R,
      centerJacobianLowerBound: params?.center_jacobian_lower_bound_nu_J,
      jacobianLipschitzBound: params?.jacobian_lipschitz_bound_L_J,
      rhoXUpperBound: params?.rho_X_upper_bound,
    });
  } catch {
    expectedBudget = null;
    expectedSlopeEnvelope = null;
    expectedDerivedSlopeRatio = null;
    expectedRootGraphLift = null;
    expectedRouchePrimitiveClosure = null;
    expectedPrimitiveSlackTolerances = null;
    expectedPrimitiveRemainderBudget = null;
    expectedPrimitiveRemainderProfileScale = null;
    expectedRoucheRadiusSupremum = null;
    expectedRoucheRhoXOptimum = null;
    expectedRoucheYRadiusOptimum = null;
  }

  assertField(
    artifact?.schema ===
      OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
    "schema must match theta3minus fold-pair first-y G/D root-tangent Cauchy-majorant tail budget schema",
    errors
  );
  assertField(
    artifact?.packet_id === PACKET_ID,
    "packet id must match theta3minus fold-pair first-y G/D root-tangent Cauchy-majorant tail budget packet",
    errors
  );
  assertField(
    artifact?.promotion_status === PROMOTION_STATUS,
    "promotion status must remain priority-only",
    errors
  );
  assertField(
    params?.speed_constraint === NO_SPEED_WINDOW &&
      artifact?.artifact_claim?.assumes_fixed_speed_window === false,
    "h39 Cauchy-majorant budget must not impose a fixed speed window",
    errors
  );
  assertField(
    params?.speed_band === undefined &&
      params?.speed_window === undefined &&
      params?.speed_min === undefined &&
      params?.speed_max === undefined,
    "h39 Cauchy-majorant budget parameters must not contain speed-band fields",
    errors
  );
  assertField(
    expectedRootGraphLift !== null &&
      params?.root_graph_lift_status ===
        expectedRootGraphLift.root_graph_lift_status &&
      summary?.root_graph_lift_status ===
        expectedRootGraphLift.root_graph_lift_status &&
      (expectedRootGraphLift.root_graph_lift_status === "not-provided"
        ? summary?.center_residual_bound_E_R === null &&
          summary?.derived_jacobian_lower_bound_J_min === null &&
          summary?.rouche_radius_lower_boundary === null &&
          summary?.rouche_best_sigma_X_supremum === null &&
          summary?.root_graph_rouche_margin === null &&
          summary?.certifies_unique_root_in_X_disc === null
        : approximatelyEqual(
            Number(summary?.center_residual_bound_E_R),
            expectedRootGraphLift.center_residual_bound_E_R
          ) &&
          approximatelyEqual(
            Number(summary?.center_jacobian_lower_bound_nu_J),
            expectedRootGraphLift.center_jacobian_lower_bound_nu_J
          ) &&
          approximatelyEqual(
            Number(summary?.jacobian_lipschitz_bound_L_J),
            expectedRootGraphLift.jacobian_lipschitz_bound_L_J
          ) &&
          summary?.rouche_radius_window_nonempty ===
            expectedRootGraphLift.rouche_radius_window_nonempty &&
          approximatelyEqual(
            Number(summary?.rouche_radius_lower_boundary),
            expectedRootGraphLift.rouche_radius_lower_boundary
          ) &&
          (expectedRootGraphLift.rouche_radius_upper_boundary === null
            ? summary?.rouche_radius_upper_boundary === null
            : approximatelyEqual(
                Number(summary?.rouche_radius_upper_boundary),
                expectedRootGraphLift.rouche_radius_upper_boundary
              )) &&
          approximatelyEqual(
            Number(summary?.rouche_radius_effective_upper_boundary),
            expectedRootGraphLift.rouche_radius_effective_upper_boundary
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_best_sigma_X_supremum),
            expectedRootGraphLift.rouche_best_sigma_X_supremum
          ) &&
          approximatelyEqual(
            Number(summary?.root_graph_nonlinear_remainder_bound),
            expectedRootGraphLift.root_graph_nonlinear_remainder_bound
          ) &&
          approximatelyEqual(
            Number(summary?.root_graph_jacobian_loss_bound),
            expectedRootGraphLift.root_graph_jacobian_loss_bound
          ) &&
          approximatelyEqual(
            Number(summary?.derived_jacobian_lower_bound_J_min),
            expectedRootGraphLift.derived_jacobian_lower_bound_J_min
          ) &&
          approximatelyEqual(
            Number(summary?.root_graph_rouche_margin),
            expectedRootGraphLift.root_graph_rouche_margin
          ) &&
          summary?.certifies_unique_root_in_X_disc ===
            expectedRootGraphLift.certifies_unique_root_in_X_disc),
    "h39 Cauchy-majorant budget Rouché graph lift fields must match the certified X-disc graph condition",
    errors
  );
  assertField(
    expectedDerivedSlopeRatio !== null &&
      params?.root_tangent_input_status ===
        expectedDerivedSlopeRatio.root_tangent_input_status &&
      params?.xi_over_sigma_X_source ===
        expectedDerivedSlopeRatio.root_tangent_slope_source &&
      (expectedDerivedSlopeRatio.derived_xi_over_sigma_X === null
        ? summary?.root_tangent_input_status === "not-provided" &&
          summary?.derived_Xi_bound === null &&
          summary?.derived_Xi_star_bound === null &&
          summary?.root_tangent_Xi_bound === null &&
          summary?.derived_xi_over_sigma_X === null
        : approximatelyEqual(
            Number(summary?.derived_Xi_bound),
            expectedDerivedSlopeRatio.derived_Xi_bound
          ) &&
          approximatelyEqual(
            Number(summary?.derived_Xi_star_bound),
            expectedDerivedSlopeRatio.derived_Xi_star_bound
          ) &&
          approximatelyEqual(
            Number(summary?.root_tangent_Xi_bound),
            expectedDerivedSlopeRatio.root_tangent_Xi_bound
          ) &&
          approximatelyEqual(
            Number(summary?.derived_xi_over_sigma_X),
            expectedDerivedSlopeRatio.derived_xi_over_sigma_X
          ) &&
          approximatelyEqual(
            Number(summary?.xi_over_sigma_X),
            expectedDerivedSlopeRatio.derived_xi_over_sigma_X
          )),
    "h39 Cauchy-majorant budget derived root-tangent inputs must match Xi_*/sigma_X <= M_R/(J_min*sigma_X)",
    errors
  );
  assertField(
    summary?.status ===
      "theta3minus-fold-pair-first-y-GD-h39-rouche-y-radius-optimum-reduction-certified" &&
      expectedBudget !== null &&
      Number(summary?.rho) > FIRST_Y_CELL_UPPER &&
      Number(summary?.q) > 0 &&
      Number(summary?.q) < 1 &&
      Number.isFinite(Number(summary?.rho_power_41)) &&
      Number.isFinite(Number(summary?.G_tail_M_G_threshold)) &&
      Number.isFinite(Number(summary?.D_tail_M_G_threshold)) &&
      Number(summary?.D_tail_M_G_threshold) > 0 &&
      Number(summary?.G_tail_M_G_threshold) > 0 &&
      Number(summary?.G_tail_log_derivative_wrt_s) > 0 &&
      Number(summary?.D_tail_log_derivative_wrt_s) > 0 &&
      Number(summary?.D_tail_log_derivative_lower_bound) > 0 &&
      Number(summary?.D_over_G_threshold_ratio) > 0 &&
      Number(summary?.D_over_G_threshold_ratio) < 1 &&
      summary?.thresholds_strictly_increase_with_radius === true &&
      summary?.D_tail_active_bottleneck_for_all_radius_and_slope === true &&
      summary?.D_tail_stricter_than_G_tail === true &&
      summary?.active_bottleneck === "D_tail",
    "h39 Cauchy-majorant budget must compute finite positive thresholds with monotone radius dependence and the D tail as the active bottleneck",
    errors
  );
  assertField(
    expectedBudget !== null &&
      approximatelyEqual(Number(summary?.rho), expectedBudget.rho) &&
      approximatelyEqual(Number(summary?.q), expectedBudget.q) &&
      approximatelyEqual(
        Number(summary?.rho_power_41),
        expectedBudget.rho_power_41
      ) &&
      approximatelyEqual(
        Number(summary?.d_tail_denominator),
        expectedBudget.d_tail_denominator
      ) &&
      approximatelyEqual(
        Number(summary?.G_tail_M_G_threshold),
        expectedBudget.G_tail_M_G_threshold
      ) &&
      approximatelyEqual(
        Number(summary?.D_tail_M_G_threshold),
        expectedBudget.D_tail_M_G_threshold
      ) &&
      approximatelyEqual(
        Number(summary?.D_over_G_threshold_ratio),
        expectedBudget.D_over_G_threshold_ratio
      ) &&
      approximatelyEqual(
        Number(summary?.G_tail_log_derivative_wrt_s),
        expectedBudget.G_tail_log_derivative_wrt_s
      ) &&
      approximatelyEqual(
        Number(summary?.D_tail_log_derivative_wrt_s),
        expectedBudget.D_tail_log_derivative_wrt_s
      ),
    "h39 Cauchy-majorant budget summary must match the recomputed rho, q, denominator, M_G thresholds, and radius derivatives",
    errors
  );
  assertField(
    (candidateMGBound === null ||
      (Number.isFinite(Number(candidateMGBound)) &&
        Number(candidateMGBound) >= 0)) &&
      (candidateMGBound === null
        ? summary?.candidate_closes_h39_majorant_budget === null &&
          summary?.active_budget_decision ===
            "open: provide a directed-rounded M_G bound"
        : summary?.candidate_closes_h39_majorant_budget ===
            (Number(candidateMGBound) <
              Number(summary?.D_tail_M_G_threshold))),
    "h39 Cauchy-majorant budget candidate M_G decision must match the active D-threshold inequality",
    errors
  );
  assertField(
    expectedSlopeEnvelope !== null &&
      (candidateMGBound === null
        ? summary?.maximum_admissible_xi_over_sigma_X === null &&
          summary?.candidate_xi_over_sigma_X_margin === null &&
          summary?.candidate_G_tail_closure_left_scalar === null &&
          summary?.candidate_G_tail_closure_right_scalar === null &&
          summary?.candidate_G_tail_closure_scalar_margin === null &&
          summary?.candidate_D_tail_closure_left_scalar === null &&
          summary?.candidate_D_tail_closure_right_scalar === null &&
          summary?.candidate_D_tail_closure_scalar_margin === null &&
          summary?.maximum_admissible_root_tangent_numerator_bound_M_R ===
            null &&
          summary?.candidate_root_tangent_numerator_bound_M_R_margin ===
            null &&
          summary?.candidate_primitive_polydisc_closure_left_scalar === null &&
          summary?.candidate_primitive_polydisc_closure_right_scalar === null &&
          summary?.candidate_primitive_polydisc_closure_ratio === null &&
          summary?.candidate_primitive_polydisc_certificate_closes === null &&
          summary?.candidate_tail_closure_scalar_margins_positive === null &&
          summary?.candidate_nonnegative_slope_feasible === null &&
          summary?.slope_envelope_status ===
            "open: provide a directed-rounded M_G bound"
        : approximatelyEqual(
            Number(summary?.candidate_normalized_M_G),
            expectedSlopeEnvelope.candidate_normalized_M_G
          ) &&
          (expectedSlopeEnvelope.maximum_admissible_xi_over_sigma_X === null
            ? summary?.maximum_admissible_xi_over_sigma_X === null &&
              summary?.candidate_xi_over_sigma_X_margin === null
            : approximatelyEqual(
                Number(summary?.maximum_admissible_xi_over_sigma_X),
                expectedSlopeEnvelope.maximum_admissible_xi_over_sigma_X
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_xi_over_sigma_X_margin),
                expectedSlopeEnvelope.maximum_admissible_xi_over_sigma_X -
                  Number(summary?.xi_over_sigma_X)
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_G_tail_closure_left_scalar),
                Number(candidateMGBound)
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_G_tail_closure_right_scalar),
                Number(summary?.G_tail_M_G_threshold)
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_G_tail_closure_scalar_margin),
                Number(summary?.candidate_G_tail_closure_right_scalar) -
                  Number(summary?.candidate_G_tail_closure_left_scalar)
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_D_tail_closure_left_scalar),
                Number(candidateMGBound) *
                  (D_IDENTITY_COEFFICIENT +
                    Number(summary?.xi_over_sigma_X) +
                    1 / (Number(summary?.radius_multiple) - 1))
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_D_tail_closure_right_scalar),
                B_D_39 *
                  Number(summary?.rho_power_41) *
                  Number(summary?.one_minus_q)
              ) &&
              approximatelyEqual(
                Number(summary?.candidate_D_tail_closure_scalar_margin),
                Number(summary?.candidate_D_tail_closure_right_scalar) -
                  Number(summary?.candidate_D_tail_closure_left_scalar)
              ) &&
              summary?.candidate_tail_closure_scalar_margins_positive ===
                (Number(summary?.candidate_G_tail_closure_scalar_margin) > 0 &&
                  Number(summary?.candidate_D_tail_closure_scalar_margin) >
                    0) &&
              summary?.candidate_closes_h39_majorant_budget ===
                summary?.candidate_tail_closure_scalar_margins_positive &&
              (expectedDerivedSlopeRatio.derived_xi_over_sigma_X === null
                ? summary?.candidate_derived_D_tail_closure_left_scalar ===
                    null &&
                  summary?.candidate_derived_D_tail_closure_scalar_margin ===
                    null &&
                  summary?.candidate_derived_closes_h39_majorant_budget ===
                    null &&
                  summary?.maximum_admissible_root_tangent_numerator_bound_M_R ===
                    null &&
                  summary?.candidate_root_tangent_numerator_bound_M_R_margin ===
                    null &&
                  summary?.candidate_primitive_polydisc_closure_left_scalar ===
                    null &&
                  summary?.candidate_primitive_polydisc_closure_right_scalar ===
                    null &&
                  summary?.candidate_primitive_polydisc_closure_ratio ===
                    null &&
                  summary?.candidate_primitive_polydisc_certificate_closes ===
                    null
                : approximatelyEqual(
                    Number(
                      summary?.candidate_derived_D_tail_closure_left_scalar
                    ),
                    Number(summary?.candidate_D_tail_closure_left_scalar)
                  ) &&
                  approximatelyEqual(
                    Number(
                      summary?.candidate_derived_D_tail_closure_scalar_margin
                    ),
                    Number(summary?.candidate_D_tail_closure_scalar_margin)
                  ) &&
                  summary?.candidate_derived_closes_h39_majorant_budget ===
                    summary?.candidate_closes_h39_majorant_budget &&
                  approximatelyEqual(
                    Number(
                      summary
                        ?.maximum_admissible_root_tangent_numerator_bound_M_R
                    ),
                    expectedSlopeEnvelope.maximum_admissible_xi_over_sigma_X *
                      expectedDerivedSlopeRatio.jacobian_lower_bound *
                      expectedDerivedSlopeRatio.sigma_X
                  ) &&
                  approximatelyEqual(
                    Number(
                      summary
                        ?.candidate_root_tangent_numerator_bound_M_R_margin
                    ),
                    Number(
                      summary
                        ?.maximum_admissible_root_tangent_numerator_bound_M_R
                    ) -
                      expectedDerivedSlopeRatio.root_tangent_numerator_bound
                  ) &&
                  approximatelyEqual(
                    Number(
                      summary?.candidate_primitive_polydisc_closure_left_scalar
                    ),
                    Number(summary?.candidate_D_tail_closure_left_scalar)
                  ) &&
                  approximatelyEqual(
                    Number(
                      summary
                        ?.candidate_primitive_polydisc_closure_right_scalar
                    ),
                    Number(summary?.candidate_D_tail_closure_right_scalar)
                  ) &&
                  approximatelyEqual(
                    Number(summary?.candidate_primitive_polydisc_closure_ratio),
                    Number(summary?.candidate_D_tail_closure_left_scalar) /
                      Number(summary?.candidate_D_tail_closure_right_scalar)
                  ) &&
                  summary?.candidate_primitive_polydisc_certificate_closes ===
                    (Number(
                      summary?.candidate_primitive_polydisc_closure_ratio
                    ) < 1)) &&
              summary?.candidate_nonnegative_slope_feasible ===
                (expectedSlopeEnvelope.maximum_admissible_xi_over_sigma_X >
                  0)) &&
          summary?.slope_envelope_status ===
            expectedSlopeEnvelope.slope_envelope_status),
    "h39 Cauchy-majorant budget slope envelope must match the inverted active D inequality",
    errors
  );
  assertField(
    expectedRouchePrimitiveClosure !== null &&
      summary?.rouche_primitive_closure_status ===
        expectedRouchePrimitiveClosure.rouche_primitive_closure_status &&
      summary?.rouche_primitive_h39_report_status ===
        expectedRouchePrimitiveClosure.rouche_primitive_h39_report_status &&
      summary?.rouche_primitive_closure_formula ===
        expectedRouchePrimitiveClosure.rouche_primitive_closure_formula &&
      summary?.rouche_primitive_h39_closure_ratio_formula ===
        expectedRouchePrimitiveClosure.rouche_primitive_h39_closure_ratio_formula &&
      summary?.rouche_primitive_required_inputs ===
        expectedRouchePrimitiveClosure.rouche_primitive_required_inputs &&
      (expectedRouchePrimitiveClosure.candidate_rouche_primitive_closure_ratio ===
      null
        ? summary?.candidate_rouche_primitive_closure_left_scalar === null &&
          summary?.candidate_rouche_primitive_closure_right_scalar === null &&
          summary?.candidate_rouche_primitive_closure_ratio === null &&
          summary?.candidate_rouche_primitive_certificate_closes === null &&
          summary
            ?.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim ===
            null &&
          summary
            ?.candidate_rouche_primitive_h39_closure_ratio_margin_to_one ===
            null &&
          summary
            ?.candidate_rouche_primitive_h39_closure_ratio_below_one ===
            null &&
          summary
            ?.maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs ===
            null &&
          summary?.rouche_form_admissible_M_R_ceiling === null &&
          summary?.candidate_rouche_root_tangent_numerator_bound_M_R_margin ===
            null &&
          summary?.candidate_rouche_form_M_R_margin ===
            null
        : approximatelyEqual(
            Number(summary?.candidate_rouche_primitive_closure_left_scalar),
            expectedRouchePrimitiveClosure.candidate_rouche_primitive_closure_left_scalar
          ) &&
          approximatelyEqual(
            Number(summary?.candidate_rouche_primitive_closure_right_scalar),
            expectedRouchePrimitiveClosure.candidate_rouche_primitive_closure_right_scalar
          ) &&
          approximatelyEqual(
            Number(summary?.candidate_rouche_primitive_closure_ratio),
            expectedRouchePrimitiveClosure.candidate_rouche_primitive_closure_ratio
          ) &&
          summary?.candidate_rouche_primitive_certificate_closes ===
            expectedRouchePrimitiveClosure.candidate_rouche_primitive_certificate_closes &&
          approximatelyEqual(
            Number(
              summary
                ?.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim
            ),
            expectedRouchePrimitiveClosure.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim
          ) &&
          approximatelyEqual(
            Number(
              summary
                ?.candidate_rouche_primitive_h39_closure_ratio_margin_to_one
            ),
            1 -
              expectedRouchePrimitiveClosure.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim
          ) &&
          summary
            ?.candidate_rouche_primitive_h39_closure_ratio_below_one ===
            (expectedRouchePrimitiveClosure.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim <
              1) &&
          approximatelyEqual(
            Number(
              summary
                ?.maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs
            ),
            expectedRouchePrimitiveClosure.maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_form_admissible_M_R_ceiling),
            expectedRouchePrimitiveClosure.rouche_form_admissible_M_R_ceiling
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_form_admissible_M_R_ceiling),
            Number(summary?.maximum_admissible_root_tangent_numerator_bound_M_R)
          ) &&
          approximatelyEqual(
            Number(summary?.candidate_rouche_root_tangent_numerator_bound_M_R_margin),
            expectedRouchePrimitiveClosure.candidate_rouche_root_tangent_numerator_bound_M_R_margin
          ) &&
          approximatelyEqual(
            Number(summary?.candidate_rouche_form_M_R_margin),
            expectedRouchePrimitiveClosure.candidate_rouche_form_M_R_margin
          ) &&
          (summary?.candidate_rouche_primitive_h39_closure_ratio_below_one ===
            (Number(summary?.candidate_rouche_form_M_R_margin) > 0))),
    "h39 Rouché primitive closure fields must match the seven-input closure ratio and M_R ceiling",
    errors
  );
  assertField(
    expectedPrimitiveSlackTolerances !== null &&
      summary?.primitive_slack_tolerances_status ===
        expectedPrimitiveSlackTolerances.primitive_slack_tolerances_status &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_current_J_min_sigma_X,
        expectedPrimitiveSlackTolerances.primitive_slack_current_J_min_sigma_X
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_required_J_min_sigma_X_from_closure,
        expectedPrimitiveSlackTolerances.primitive_slack_required_J_min_sigma_X_from_closure
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_maximum_E_R,
        expectedPrimitiveSlackTolerances.primitive_slack_maximum_E_R
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_minimum_nu_J,
        expectedPrimitiveSlackTolerances.primitive_slack_minimum_nu_J
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_maximum_L_J,
        expectedPrimitiveSlackTolerances.primitive_slack_maximum_L_J
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_rho_X_admissible_lower_bound,
        expectedPrimitiveSlackTolerances.primitive_slack_rho_X_admissible_lower_bound
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_rho_X_admissible_upper_bound,
        expectedPrimitiveSlackTolerances.primitive_slack_rho_X_admissible_upper_bound
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_rho_X_lower_margin,
        expectedPrimitiveSlackTolerances.primitive_slack_rho_X_lower_margin
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_rho_X_upper_margin,
        expectedPrimitiveSlackTolerances.primitive_slack_rho_X_upper_margin
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_r_X_admissible_lower_bound,
        expectedPrimitiveSlackTolerances.primitive_slack_r_X_admissible_lower_bound
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_r_X_admissible_upper_bound,
        expectedPrimitiveSlackTolerances.primitive_slack_r_X_admissible_upper_bound
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_r_X_lower_margin,
        expectedPrimitiveSlackTolerances.primitive_slack_r_X_lower_margin
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_r_X_upper_margin,
        expectedPrimitiveSlackTolerances.primitive_slack_r_X_upper_margin
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_maximum_M_G,
        expectedPrimitiveSlackTolerances.primitive_slack_maximum_M_G
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_slack_maximum_M_R,
        expectedPrimitiveSlackTolerances.primitive_slack_maximum_M_R
      ) &&
      summary?.primitive_slack_all_current_margins_positive ===
        expectedPrimitiveSlackTolerances.primitive_slack_all_current_margins_positive,
    "h39 primitive slack tolerance fields must match the one-at-a-time E_R, nu_J, L_J, rho_X, r_X, M_G, and M_R thresholds",
    errors
  );
  assertField(
    expectedPrimitiveRemainderBudget !== null &&
      summary?.primitive_remainder_budget_status ===
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_status &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_worst_E_R,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_worst_E_R
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_worst_nu_J,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_worst_nu_J
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_worst_L_J,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_worst_L_J
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_rho_X_lower,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_rho_X_lower
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_rho_X_upper,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_rho_X_upper
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_r_X_lower,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_r_X_lower
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_r_X_upper,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_r_X_upper
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_worst_M_G,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_worst_M_G
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_worst_M_R,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_worst_M_R
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_min_J_min,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_min_J_min
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_min_sigma_X,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_min_sigma_X
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_min_J_min_sigma_X,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_min_J_min_sigma_X
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_required_J_min_sigma_X,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_required_J_min_sigma_X
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_min_rouche_margin,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_min_rouche_margin
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_scalar_left,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_scalar_left
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_scalar_right,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_scalar_right
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_budget_scalar_margin,
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_scalar_margin
      ) &&
      summary?.primitive_remainder_budget_closes_candidate ===
        expectedPrimitiveRemainderBudget.primitive_remainder_budget_closes_candidate,
    "h39 primitive remainder budget fields must match the robust pessimistic primitive rectangle",
    errors
  );
  assertField(
    expectedPrimitiveRemainderProfileScale !== null &&
      summary?.primitive_remainder_profile_scale_status ===
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_status &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_candidate,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_candidate
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_first_failing_upper,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_first_failing_upper
      ) &&
      summary?.primitive_remainder_profile_scale_closed_through_upper_bound ===
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_closed_through_upper_bound &&
      summary?.primitive_remainder_profile_scale_limiting_margin_name ===
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_limiting_margin_name &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_limiting_margin_value,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_limiting_margin_value
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_E_R_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_E_R_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_nu_J_loss_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_nu_J_loss_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_L_J_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_L_J_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_rho_X_lower_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_rho_X_lower_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_rho_X_upper_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_rho_X_upper_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_r_X_lower_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_r_X_lower_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_r_X_upper_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_r_X_upper_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_M_G_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_M_G_allowance
      ) &&
      nullableApproximatelyEqual(
        summary?.primitive_remainder_profile_scale_scaled_M_R_allowance,
        expectedPrimitiveRemainderProfileScale.primitive_remainder_profile_scale_scaled_M_R_allowance
      ),
    "h39 primitive remainder profile-scale fields must match the monotone safe-product budget inversion",
    errors
  );
  assertField(
    expectedRoucheRadiusSupremum !== null &&
      summary?.rouche_radius_supremum_status ===
        expectedRoucheRadiusSupremum.rouche_radius_supremum_status &&
      summary?.rouche_window_supremal_M_R_ceiling_status ===
        expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_status &&
      summary?.rouche_radius_supremum_formula ===
        expectedRoucheRadiusSupremum.rouche_radius_supremum_formula &&
      summary
        ?.rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R_formula ===
        expectedRoucheRadiusSupremum.rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R_formula &&
      summary?.rouche_radius_supremum_monotonicity ===
        expectedRoucheRadiusSupremum.rouche_radius_supremum_monotonicity &&
      (expectedRoucheRadiusSupremum.rouche_radius_supremal_M_R_ceiling === null
        ? summary?.rouche_radius_supremum_attained ===
            expectedRoucheRadiusSupremum.rouche_radius_supremum_attained &&
          summary?.rouche_radius_supremum_strict_slack_required ===
            expectedRoucheRadiusSupremum.rouche_radius_supremum_strict_slack_required &&
          summary?.rouche_radius_supremum_lower_boundary_r_X ===
            expectedRoucheRadiusSupremum.rouche_radius_supremum_lower_boundary_r_X &&
          summary?.rouche_window_supremal_M_R_ceiling_r_X_boundary ===
            expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_r_X_boundary &&
          summary?.rouche_radius_supremum_sigma_X ===
            expectedRoucheRadiusSupremum.rouche_radius_supremum_sigma_X &&
          summary?.rouche_window_supremal_M_R_ceiling_sigma_X_supremum ===
            expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_sigma_X_supremum &&
          (expectedRoucheRadiusSupremum.rouche_radius_supremum_slope_budget ===
          null
            ? summary?.rouche_radius_supremum_slope_budget === null
            : approximatelyEqual(
                Number(summary?.rouche_radius_supremum_slope_budget),
                expectedRoucheRadiusSupremum.rouche_radius_supremum_slope_budget
              )) &&
          summary?.rouche_radius_supremal_M_R_ceiling === null &&
          summary
            ?.rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R ===
            null &&
          summary?.rouche_window_supremal_M_R_ceiling_attained ===
            expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_attained &&
          summary?.rouche_window_supremal_M_R_ceiling_attainment_status ===
            expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_attainment_status &&
          summary?.rouche_radius_supremal_M_R_ceiling_positive === null &&
          summary?.candidate_M_R_below_rouche_radius_supremum === null &&
          summary?.candidate_M_R_margin_to_rouche_radius_supremum === null &&
          summary
            ?.candidate_rouche_window_root_tangent_numerator_bound_M_R_margin ===
            null &&
          summary
            ?.candidate_root_tangent_numerator_below_rouche_window_supremal_M_R_ceiling ===
            null
        : summary?.rouche_radius_supremum_attained === false &&
          summary?.rouche_radius_supremum_strict_slack_required === true &&
          summary?.rouche_window_supremal_M_R_ceiling_attained === false &&
          summary?.rouche_window_supremal_M_R_ceiling_attainment_status ===
            "unattained-open-rouche-window" &&
          approximatelyEqual(
            Number(summary?.rouche_radius_supremum_lower_boundary_r_X),
            expectedRoucheRadiusSupremum.rouche_radius_supremum_lower_boundary_r_X
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_window_supremal_M_R_ceiling_r_X_boundary),
            expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_r_X_boundary
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_radius_supremum_sigma_X),
            expectedRoucheRadiusSupremum.rouche_radius_supremum_sigma_X
          ) &&
          approximatelyEqual(
            Number(
              summary?.rouche_window_supremal_M_R_ceiling_sigma_X_supremum
            ),
            expectedRoucheRadiusSupremum.rouche_window_supremal_M_R_ceiling_sigma_X_supremum
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_radius_supremum_slope_budget),
            expectedRoucheRadiusSupremum.rouche_radius_supremum_slope_budget
          ) &&
          approximatelyEqual(
            Number(summary?.rouche_radius_supremal_M_R_ceiling),
            expectedRoucheRadiusSupremum.rouche_radius_supremal_M_R_ceiling
          ) &&
          approximatelyEqual(
            Number(
              summary
                ?.rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R
            ),
            expectedRoucheRadiusSupremum.rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R
          ) &&
          summary?.rouche_radius_supremal_M_R_ceiling_positive ===
            (expectedRoucheRadiusSupremum.rouche_radius_supremal_M_R_ceiling >
              0) &&
          (expectedRoucheRadiusSupremum.candidate_M_R_margin_to_rouche_radius_supremum ===
          null
            ? summary?.candidate_M_R_below_rouche_radius_supremum === null &&
              summary?.candidate_M_R_margin_to_rouche_radius_supremum === null &&
              summary
                ?.candidate_rouche_window_root_tangent_numerator_bound_M_R_margin ===
                null &&
              summary
                ?.candidate_root_tangent_numerator_below_rouche_window_supremal_M_R_ceiling ===
                null
            : summary?.candidate_M_R_below_rouche_radius_supremum ===
                (expectedRoucheRadiusSupremum.candidate_M_R_margin_to_rouche_radius_supremum >
                  0) &&
              summary
                ?.candidate_root_tangent_numerator_below_rouche_window_supremal_M_R_ceiling ===
                (expectedRoucheRadiusSupremum.candidate_rouche_window_root_tangent_numerator_bound_M_R_margin >
                  0) &&
              approximatelyEqual(
                Number(
                  summary?.candidate_M_R_margin_to_rouche_radius_supremum
                ),
                expectedRoucheRadiusSupremum.candidate_M_R_margin_to_rouche_radius_supremum
              ) &&
              approximatelyEqual(
                Number(
                  summary
                    ?.candidate_rouche_window_root_tangent_numerator_bound_M_R_margin
                ),
                expectedRoucheRadiusSupremum.candidate_rouche_window_root_tangent_numerator_bound_M_R_margin
              ))),
    "h39 Rouché radius supremum fields must match the unattained radius-window M_R ceiling",
    errors
  );
  assertField(
    expectedRoucheRhoXOptimum !== null &&
      summary?.rouche_rho_X_optimum_status ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_status &&
      summary?.rouche_rho_X_optimal_M_R_ceiling_status ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimal_M_R_ceiling_status &&
      summary?.rouche_rho_X_optimum_formula ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_formula &&
      summary?.rouche_rho_X_optimum_monotonicity ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_monotonicity &&
      summary?.rouche_rho_X_optimum_attained ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_attained &&
      summary?.rouche_rho_X_optimum_strict_slack_required ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_strict_slack_required &&
      nullableApproximatelyEqual(
        summary?.rouche_rho_X_optimum_lower_boundary_r_X,
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_lower_boundary_r_X
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_rho_X_optimum_rho_X,
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_rho_X
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_rho_X_upper_bound,
        expectedRoucheRhoXOptimum.rouche_rho_X_upper_bound
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_rho_X_optimum_sigma_X,
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_sigma_X
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_rho_X_optimum_slope_budget,
        expectedRoucheRhoXOptimum.rouche_rho_X_optimum_slope_budget
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_rho_X_optimal_M_R_ceiling,
        expectedRoucheRhoXOptimum.rouche_rho_X_optimal_M_R_ceiling
      ) &&
      nullableApproximatelyEqual(
        summary
          ?.rouche_rho_X_optimal_admissible_root_tangent_numerator_bound_M_R,
        expectedRoucheRhoXOptimum
          .rouche_rho_X_optimal_admissible_root_tangent_numerator_bound_M_R
      ) &&
      summary?.rouche_rho_X_optimal_M_R_ceiling_positive ===
        expectedRoucheRhoXOptimum.rouche_rho_X_optimal_M_R_ceiling_positive &&
      summary?.candidate_M_R_below_rouche_rho_X_optimum ===
        expectedRoucheRhoXOptimum.candidate_M_R_below_rouche_rho_X_optimum &&
      nullableApproximatelyEqual(
        summary?.candidate_M_R_margin_to_rouche_rho_X_optimum,
        expectedRoucheRhoXOptimum.candidate_M_R_margin_to_rouche_rho_X_optimum
      ) &&
      summary
        ?.candidate_root_tangent_numerator_below_rouche_rho_X_optimal_M_R_ceiling ===
        expectedRoucheRhoXOptimum
          .candidate_root_tangent_numerator_below_rouche_rho_X_optimal_M_R_ceiling &&
      (expectedRoucheRhoXOptimum.rouche_rho_X_optimal_M_R_ceiling === null
        ? summary?.rouche_rho_X_optimal_M_R_ceiling === null &&
          summary
            ?.rouche_rho_X_optimal_admissible_root_tangent_numerator_bound_M_R ===
            null
        : Number(summary?.rouche_rho_X_optimal_M_R_ceiling) > 0),
    "h39 Rouché rho_X optimum fields must match the admissible rho_X and r_X optimum M_R ceiling",
    errors
  );
  assertField(
    expectedRoucheYRadiusOptimum !== null &&
      summary?.rouche_y_radius_optimum_status ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_status &&
      summary?.rouche_y_radius_optimal_M_R_ceiling_status ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimal_M_R_ceiling_status &&
      summary?.rouche_y_radius_optimum_formula ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_formula &&
      summary?.rouche_y_radius_optimum_derivative_formula ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_derivative_formula &&
      summary?.rouche_y_radius_optimum_monotonicity ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_monotonicity &&
      summary?.rouche_y_radius_optimum_fixed_constant_caveat ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_fixed_constant_caveat &&
      summary?.rouche_y_radius_optimum_attained ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_attained &&
      summary?.rouche_y_radius_optimum_strict_slack_required ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_strict_slack_required &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_lower_boundary_r_X,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_lower_boundary_r_X
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_rho_X,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_rho_X
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_rho_X_upper_bound,
        expectedRoucheYRadiusOptimum.rouche_y_radius_rho_X_upper_bound
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_sigma_X,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_sigma_X
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_upper_bound_s,
        expectedRoucheYRadiusOptimum.rouche_y_radius_upper_bound_s
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_s,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_s
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_rho,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_rho
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_slope_budget,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_slope_budget
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimum_X_factor,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimum_X_factor
      ) &&
      nullableApproximatelyEqual(
        summary?.rouche_y_radius_optimal_M_R_ceiling,
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimal_M_R_ceiling
      ) &&
      nullableApproximatelyEqual(
        summary
          ?.rouche_y_radius_optimal_admissible_root_tangent_numerator_bound_M_R,
        expectedRoucheYRadiusOptimum
          .rouche_y_radius_optimal_admissible_root_tangent_numerator_bound_M_R
      ) &&
      summary?.rouche_y_radius_optimal_M_R_ceiling_positive ===
        expectedRoucheYRadiusOptimum.rouche_y_radius_optimal_M_R_ceiling_positive &&
      summary?.candidate_M_R_below_rouche_y_radius_optimum ===
        expectedRoucheYRadiusOptimum.candidate_M_R_below_rouche_y_radius_optimum &&
      nullableApproximatelyEqual(
        summary?.candidate_M_R_margin_to_rouche_y_radius_optimum,
        expectedRoucheYRadiusOptimum.candidate_M_R_margin_to_rouche_y_radius_optimum
      ) &&
      summary
        ?.candidate_root_tangent_numerator_below_rouche_y_radius_optimal_M_R_ceiling ===
        expectedRoucheYRadiusOptimum
          .candidate_root_tangent_numerator_below_rouche_y_radius_optimal_M_R_ceiling &&
      (expectedRoucheYRadiusOptimum.rouche_y_radius_optimal_M_R_ceiling ===
      null
        ? summary?.rouche_y_radius_optimal_M_R_ceiling === null &&
          summary
            ?.rouche_y_radius_optimal_admissible_root_tangent_numerator_bound_M_R ===
            null
        : Number(summary?.rouche_y_radius_optimal_M_R_ceiling) > 0),
    "h39 Rouché y-radius optimum fields must match the admissible y-radius cap optimum M_R ceiling",
    errors
  );
  assertField(
    artifact?.artifact_claim
      ?.reduces_h39_continuous_tail_closure_to_cauchy_majorant === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_h39_cauchy_majorant_budget_formula ===
        true &&
      artifact?.artifact_claim
        ?.certifies_h39_root_tangent_slope_derivation_formula === true &&
      artifact?.artifact_claim
        ?.certifies_h39_rouche_primitive_closure_formula === true &&
      artifact?.artifact_claim
        ?.certifies_h39_rouche_radius_supremum_formula === true &&
      artifact?.artifact_claim
        ?.certifies_h39_rouche_rho_X_optimum_formula === true &&
      artifact?.artifact_claim
        ?.certifies_h39_rouche_y_radius_optimum_formula === true &&
      artifact?.artifact_claim
        ?.proves_h39_majorant_radius_threshold_monotonicity === true &&
      artifact?.artifact_claim
        ?.proves_h39_majorant_D_tail_active_bottleneck === true &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_h39_polydisc_M_G_bound === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_h39_polydisc_Xi_bound === false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound ===
        false &&
      artifact?.artifact_claim
        ?.certifies_directed_rounded_fold_pair_scaled_remainder === false &&
      artifact?.artifact_claim?.certifies_I1_regular_critical_exhaustion ===
        false &&
      artifact?.artifact_claim?.retained_branch === false,
    "artifact claim must reduce the h39 tail to a majorant budget without overclaiming polydisc, continuous-tail, scaled-remainder, I1, or retention closure",
    errors
  );
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
    if (arg === "--out") {
      options.out = argv[++index];
    } else if (arg === "--validate") {
      options.validate = argv[++index];
    } else if (arg === "--radius-multiple") {
      options.radiusMultiple = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--radius-multiple-upper-bound") {
      options.radiusMultipleUpperBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--xi-over-sigma-x") {
      options.xiOverSigmaX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--m-g-bound") {
      options.mGBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--root-tangent-numerator-bound") {
      options.rootTangentNumeratorBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--center-residual-bound") {
      options.centerResidualBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--center-jacobian-lower-bound") {
      options.centerJacobianLowerBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--jacobian-lipschitz-bound") {
      options.jacobianLipschitzBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--jacobian-lower-bound") {
      options.jacobianLowerBound = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--sigma-x") {
      options.sigmaX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho-x") {
      options.rhoX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--r-x") {
      options.rX = parseNumberArg(arg, argv[++index]);
    } else if (arg === "--rho-x-upper-bound") {
      options.rhoXUpperBound = parseNumberArg(arg, argv[++index]);
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
    "Usage: node scripts/neutral-swarm/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs [options]",
    "",
    "Options:",
    "  --out <path>             Write artifact JSON",
    "  --validate <path>        Validate an artifact JSON",
    "  --radius-multiple <n>    Set rho=nY, with n>1",
    "  --radius-multiple-upper-bound <n>",
    "                           Set a finite certified y-radius cap for optimizing s=rho/Y",
    "  --xi-over-sigma-x <n>    Set the slope ratio Xi_*/sigma_X",
    "  --m-g-bound <n>          Test a candidate directed-rounded M_G bound",
    "  --root-tangent-numerator-bound <n>",
    "                           Set M_R>=sup|y partial_y R_epsilon,43|",
    "  --center-residual-bound <n>",
    "                           Set E_R>=sup|R_epsilon,43(y,X_center)|",
    "  --center-jacobian-lower-bound <n>",
    "                           Set nu_J<=inf|partial_X R_epsilon,43 at X_center|",
    "  --jacobian-lipschitz-bound <n>",
    "                           Set L_J>=sup|partial_X^2 R_epsilon,43| on the X disc",
    "  --jacobian-lower-bound <n>",
    "                           Set J_min<=inf|J_epsilon|",
    "  --sigma-x <n>            Set the X-Cauchy margin sigma_X",
    "  --rho-x <n>              Set rho_X; requires --r-x",
    "  --r-x <n>                Set graph radius r_X; requires --rho-x",
    "  --rho-x-upper-bound <n>  Set a shared-domain upper bound for optimizing rho_X",
    "  --schema                 Print artifact schema metadata",
  ].join("\n");
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
    console.log(
      JSON.stringify(
        {
          artifact_schema:
            OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
          packet_id: PACKET_ID,
          promotion_status: PROMOTION_STATUS,
        },
        null,
        2
      )
    );
    return;
  }
  if (options.validate) {
    const artifact = JSON.parse(fs.readFileSync(options.validate, "utf8"));
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
        artifact
      );
    console.log(JSON.stringify({ valid: errors.length === 0, errors }, null, 2));
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }
  try {
    const artifact =
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
        options
      );
    const errors =
      validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
        artifact
      );
    if (errors.length > 0) {
      throw new Error(`artifact validation failed: ${errors.join("; ")}`);
    }
    const output = `${JSON.stringify(artifact, null, 2)}\n`;
    if (options.out) {
      fs.mkdirSync(path.dirname(options.out), { recursive: true });
      fs.writeFileSync(options.out, output);
    } else {
      process.stdout.write(output);
    }
  } catch (error) {
    console.error(error.stack ?? error.message);
    process.exitCode = 1;
  }
}

if (process.argv[1] === SCRIPT_PATH) {
  main();
}
