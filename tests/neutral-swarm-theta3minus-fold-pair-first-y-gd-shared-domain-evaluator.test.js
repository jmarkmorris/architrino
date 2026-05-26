import test from "node:test";
import assert from "node:assert/strict";

import {
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA,
  THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA,
  THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS,
  branchSeriesCoordinates,
  buildH39SharedDomainCoefficientArtifact,
  computeCauchyRemovableQuotientFloor,
  computeCauchyRemovableQuotientPrefixFloor,
  computeCauchyShiftedTailMajorants,
  computeCauchyShiftedPrefixTailMajorant,
  computeCauchyShiftedTailOrderForTarget,
  computeCauchyShiftedTailOrderSensitivity,
  computeBranchGDenominatorClearanceMajorant,
  computeBranchGDenominatorAllocationTargetsCandidate,
  computeBranchGDenominatorCauchyIngredientCandidate,
  computeBranchGDenominatorIngredientCandidate,
  computeCauchyCoefficientPrefixFloor,
  computeCauchyCoefficientPrefixMajorant,
  computeCoefficientPrefixFloor,
  computeCoefficientPrefixMajorant,
  computeH39DenominatorCauchyOuterBoundCeilingCandidate,
  computeH39DenominatorCauchyPrimitiveClosureCandidate,
  computeH39FinitePrefixPrimitiveScalarReplay,
  computeH39NGOuterBoundCandidateMG,
  computeH39NGOuterBoundPrimitiveReplay,
  computeH39KernelContinuousMajorant,
  computeMultivariateCoefficientPrefixFloor,
  computeMultivariateCoefficientPrefixMajorant,
  computeNGOuterBoundFromDenominatorClearance,
  computeYPowerFactoredCoefficientPrefixMajorant,
  evaluateH39SharedDomainCoefficientCell,
  evaluateH39SharedDomainCoefficientRows,
  evaluateNGCoefficientRows,
  evaluateR43CoefficientRows,
  makeTheta3minusFirstYGdSeriesContext,
  r43JacobianShiftedCoefficients,
  r43SecondXDerivativeShiftedCoefficients,
  solveH39CenterCoefficientRow,
  sourceEquationSeries,
  summarizeSharedDomainPrimitiveBounds,
  validateH39SharedDomainCoefficientArtifact,
  r43SecondXDerivativeKernelCoefficients,
} from "../scripts/neutral-swarm/theta3minus-fold-pair-first-y-gd-shared-domain-evaluator.mjs";

const CELL = {
  speed_interval: [3.02156, 3.02157],
  delta_fold_interval: [0.72, 0.72],
  phi_fold_interval: [0.41, 0.41],
  beta_interval: [0.18, 0.18],
  gamma_interval: [0.025, 0.025],
  L_interval: [0, 0],
};

function hIntervals() {
  return Array.from({ length: 39 }, (_, index) => [
    (index + 1) * 1e-6,
    (index + 1) * 1e-6,
  ]);
}

function h38BranchRow(branch) {
  const row = { branch };
  hIntervals().forEach((interval, index) => {
    row[`h${index}_interval`] = interval;
  });
  row.h38_solve_slope_interval =
    branch === "-" ? [0.15, 0.152] : [-0.152, -0.15];
  return row;
}

function h38Row() {
  return {
    cell_id: "speed.test.first-y",
    speed_interval: CELL.speed_interval,
    first_y_cell: [0, 0.115 / 64],
    delta_fold_interval: CELL.delta_fold_interval,
    phi_fold_interval: CELL.phi_fold_interval,
    beta_interval: CELL.beta_interval,
    gamma_interval: CELL.gamma_interval,
    L_interval: CELL.L_interval,
    row_status: "fixture-h38-row",
    branch_rows: [h38BranchRow("-"), h38BranchRow("+")],
  };
}

function intervalClose(left, right, tolerance = 1e-9) {
  assert.equal(left.length, 2);
  assert.equal(right.length, 2);
  const scale = Math.max(
    1,
    Math.abs(left[0]),
    Math.abs(left[1]),
    Math.abs(right[0]),
    Math.abs(right[1])
  );
  assert.ok(Math.abs(left[0] - right[0]) <= tolerance * scale);
  assert.ok(Math.abs(left[1] - right[1]) <= tolerance * scale);
}

function parseInterval(text) {
  if (Array.isArray(text)) {
    return text.map(Number);
  }
  return text
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map(Number);
}

test("h39 shared-domain series context builds branch coordinates through X39", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const { delta, phi } = branchSeriesCoordinates({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [3, 3],
  });

  assert.equal(
    context.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA
  );
  assert.deepEqual(delta[42], [3, 3]);
  intervalClose(phi[42], [-3, -3]);
});

test("h39 R43 leading shifted coefficient is affine in X", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const base = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
  });
  const one = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [1, 1],
  });
  const two = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [2, 2],
  });
  const jacobianCoefficient = [
    one[43][0] - base[43][1],
    one[43][1] - base[43][0],
  ];
  const expectedAtTwo = [
    base[43][0] + 2 * jacobianCoefficient[0],
    base[43][1] + 2 * jacobianCoefficient[1],
  ];
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [2, 2],
    shiftedOrder: 1,
  });

  intervalClose(two[43], expectedAtTwo);
  intervalClose(parseInterval(row.R43_center_coefficient_interval), two[43]);
  assert.deepEqual(parseInterval(row.R43_second_x_coefficient_interval), [
    0, 0,
  ]);
  intervalClose(parseInterval(row.y_partial_y_R43_shifted_coefficients[0]), [
    0, 0,
  ]);
  assert.equal(row.certifies_continuous_polydisc_primitives, false);
});

test("h39 center coefficient solve zeroes the leading R43 source row", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const solve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
  });
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: solve.h39_center_interval,
    shiftedOrder: 1,
  });
  const solvedCoefficient = parseInterval(row.R43_center_coefficient_interval);

  assert.equal(solve.status, "h39-center-coefficient-row-solved");
  assert.ok(solvedCoefficient[0] <= 0);
  assert.ok(solvedCoefficient[1] >= 0);
  assert.equal(solve.certifies_continuous_polydisc_primitives, false);
});

test("h39 center coefficient solve accepts inherited recurrence slope", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const solve = solveH39CenterCoefficientRow({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    solveSlopeInterval: [0.79, 0.8],
  });
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: solve.h39_center_interval,
    solveSlopeInterval: solve.h39_solve_slope_interval,
    shiftedOrder: 1,
  });

  assert.equal(
    solve.h39_solve_slope_source,
    "inherited-formal-recurrence-slope"
  );
  assert.equal(
    row.R43_jacobian_coefficient_source,
    "inherited-formal-recurrence-slope"
  );
  assert.deepEqual(parseInterval(row.R43_jacobian_coefficient_interval), [
    0.79, 0.8,
  ]);
});

test("h39 X-derivative identities emit removable Jacobian and y41 curvature rows", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const sourceAtZero = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
  });
  const sourceAtOne = sourceEquationSeries({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [1, 1],
  });
  const jacobian = r43JacobianShiftedCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    shiftedOrder: 3,
  });
  const curvature = r43SecondXDerivativeShiftedCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    shiftedOrder: 42,
  });
  const leadingFiniteDifference = [
    sourceAtOne[43][0] - sourceAtZero[43][1],
    sourceAtOne[43][1] - sourceAtZero[43][0],
  ];

  intervalClose(jacobian[0], leadingFiniteDifference);
  assert.equal(
    curvature
      .slice(0, 41)
      .every((interval) => interval[0] === 0 && interval[1] === 0),
    true
  );
  assert.ok(parseInterval(curvature[41])[0] < parseInterval(curvature[41])[1]);
});

test("h39 second-X row factors as y41 times the explicit kernel prefix", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const rho = 0.001;
  const shifted = r43SecondXDerivativeShiftedCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    shiftedOrder: 43,
  });
  const kernel = r43SecondXDerivativeKernelCoefficients({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    kernelOrder: 2,
  });

  assert.equal(
    shifted
      .slice(0, 41)
      .every(([left, right]) => left === 0 && right === 0),
    true
  );
  for (let index = 0; index < kernel.length; index += 1) {
    intervalClose(shifted[41 + index], kernel[index]);
  }
  assert.equal(
    computeCoefficientPrefixMajorant(shifted, rho),
    computeYPowerFactoredCoefficientPrefixMajorant(kernel, rho, 41)
  );
});

test("h39 kernel coordinate seminorm gives a continuous reduced Lipschitz majorant", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const rho = 0.001;
  const majorant = computeH39KernelContinuousMajorant({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho,
  });
  const row = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho,
  });

  assert.ok(
    majorant.R43_second_x_kernel_delta_coefficient_seminorm_rho > 0
  );
  assert.ok(majorant.R43_second_x_kernel_phi_coefficient_seminorm_rho > 0);
  assert.equal(majorant.R43_second_x_kernel_speed_min, CELL.speed_interval[0]);
  assert.ok(
    majorant.R43_second_x_kernel_continuous_majorant >=
      majorant.R43_second_x_kernel_speed_term
  );
  assert.ok(
    majorant.R43_jacobian_lipschitz_reduced_continuous_majorant > 0
  );
  assert.ok(
    majorant.R43_jacobian_lipschitz_reduced_continuous_majorant <=
      rho ** 41 *
        majorant.R43_second_x_kernel_continuous_majorant *
        (1 + 1e-12)
  );
  assert.equal(
    row.R43_second_x_kernel_continuous_majorant,
    majorant.R43_second_x_kernel_continuous_majorant
  );
  assert.equal(row.certifies_continuous_polydisc_primitives, false);
});

test("h39 branch G denominator ingredients emit candidate floors only", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const candidate = computeBranchGDenominatorIngredientCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
  });

  assert.equal(
    candidate.status,
    "h39-branch-g-denominator-ingredient-candidate-emitted"
  );
  assert.equal(
    candidate.candidate_denominator_clearance_status,
    "candidate-denominator-clearance-positive"
  );
  assert.ok(candidate.branch_kernel_majorant >= 1);
  assert.ok(candidate.delta_clearance_floor > 0);
  assert.ok(candidate.jacobian_abs_floor > 0);
  assert.ok(candidate.branch_g_outer_majorant > 0);
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(candidate.retained_branch, false);
});

test("h39 branch G Cauchy denominator ingredients emit prefix-plus-tail floors only", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const candidate = computeBranchGDenominatorCauchyIngredientCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
  });

  assert.equal(
    candidate.status,
    "h39-branch-g-denominator-cauchy-ingredient-candidate-emitted"
  );
  assert.equal(
    candidate.candidate_denominator_clearance_status,
    "candidate-denominator-clearance-positive"
  );
  assert.equal(candidate.q, 0.1);
  assert.ok(candidate.delta_coordinate_prefix_plus_tail_majorant > 0);
  assert.ok(candidate.phi_coordinate_prefix_plus_tail_majorant > 0);
  assert.ok(candidate.delta_clearance_prefix_plus_tail_floor > 0);
  assert.ok(candidate.jacobian_abs_prefix_plus_tail_floor > 0);
  assert.ok(candidate.branch_g_outer_majorant > 0);
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(candidate.retained_branch, false);
});

test("h39 denominator Cauchy primitive closure candidate composes branch bounds", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const minusBranch = computeBranchGDenominatorCauchyIngredientCandidate({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
  });
  const plusBranch = computeBranchGDenominatorCauchyIngredientCandidate({
    context,
    cell: CELL,
    branch: "+",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
    outerRadius: 0.01,
    deltaOuterBound: 100,
    phiOuterBound: 100,
    jacobianAbsOuterBound: 100,
  });
  const candidate = computeH39DenominatorCauchyPrimitiveClosureCandidate({
    branchDenominatorCandidates: [minusBranch, plusBranch],
    lMajorant: 0,
    lowerPolynomialMajorant: 0,
    outerRadius: 0.01,
    nGShiftedCoefficients: [[1e-120, 1e-120]],
    rho: 0.001,
    candidate_E_R_bound: 1e-6,
    candidate_nu_J_bound: 1,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_R_bound: 1e-6,
  });

  assert.equal(
    candidate.status,
    "h39-denominator-cauchy-primitive-closure-candidate-emitted"
  );
  assert.equal(candidate.branch_count, 2);
  assert.equal(
    candidate.n_g_outer_bound,
    minusBranch.branch_g_outer_majorant + plusBranch.branch_g_outer_majorant
  );
  assert.ok(candidate.candidate_M_G_bound > 0);
  assert.equal(candidate.candidate_scalar_replay_closes, true);
  assert.equal(candidate.certifies_directed_rounded_shared_domain, false);
  assert.equal(candidate.retained_branch, false);
});

test("h39 denominator Cauchy outer-bound ceiling inverts the primitive replay", () => {
  const ceiling = computeH39DenominatorCauchyOuterBoundCeilingCandidate({
    nGShiftedCoefficients: [[1e-120, 1e-120]],
    rho: 0.001,
    nGOuterRadius: 0.01,
    lMajorant: 1,
    lowerPolynomialMajorant: 2,
    outerRadius: 0.01,
    candidate_E_R_bound: 1e-6,
    candidate_nu_J_bound: 1,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_R_bound: 1e-6,
  });

  assert.equal(
    ceiling.status,
    "h39-denominator-cauchy-outer-bound-ceiling-candidate-emitted"
  );
  assert.ok(ceiling.candidate_primitive_M_G_closure_ceiling > 0);
  assert.ok(ceiling.n_g_outer_bound_ceiling > 0);
  assert.ok(ceiling.branch_g_sum_budget_ceiling > 0);
  assert.equal(
    ceiling.n_g_outer_bound_tail_coefficient,
    ceiling.n_g_tail_diagnostic.unshifted_cauchy_tail_after_prefix_majorant
  );
  assert.ok(
    Math.abs(
      ceiling.n_g_outer_bound_ceiling -
        (ceiling.candidate_primitive_M_G_closure_ceiling -
          ceiling.n_g_shifted_unshifted_prefix_majorant) /
          ceiling.n_g_outer_bound_tail_coefficient
    ) <
      Math.abs(ceiling.n_g_outer_bound_ceiling) * 1e-12
  );
  assert.ok(
    Math.abs(
      ceiling.branch_g_sum_budget_ceiling -
        (ceiling.n_g_outer_bound_ceiling - ceiling.fixed_outer_terms)
    ) <
      Math.abs(ceiling.branch_g_sum_budget_ceiling) * 1e-12
  );
  assert.equal(ceiling.certifies_directed_rounded_shared_domain, false);
  assert.equal(ceiling.retained_branch, false);
});

test("h39 branch G allocation targets invert denominator clearances", () => {
  const allocation = computeBranchGDenominatorAllocationTargetsCandidate({
    branchGSumBudgetCeiling: 0.22,
    allocationWeights: [3, 5],
    branchInputs: [
      {
        branch: "-",
        kernelMajorant: 3,
        speedLowerBound: 2,
        deltaClearance: 4,
        jacobianClearance: 5,
      },
      {
        branch: "+",
        kernelMajorant: 2,
        speedLowerBound: 4,
        deltaClearance: 2,
        jacobianClearance: 4,
      },
    ],
  });

  assert.equal(
    allocation.status,
    "h39-branch-g-denominator-allocation-targets-candidate-emitted"
  );
  assert.equal(allocation.allocation_weight_sum, 8);
  assert.equal(allocation.branch_rows[0].allocated_branch_g_budget, 0.0825);
  assert.equal(allocation.branch_rows[1].allocated_branch_g_budget, 0.1375);
  assert.equal(allocation.branch_rows[0].branch_pressure_coefficient, 6);
  assert.equal(allocation.branch_rows[1].branch_pressure_coefficient, 2);
  assert.deepEqual(allocation.pressure_balanced_allocation_weights, [6, 2]);
  assert.ok(
    Math.abs(
      allocation.pressure_balanced_common_required_delta_squared_jacobian_clearance -
        8 / 0.22
    ) < 1e-12
  );
  assert.ok(
    Math.abs(
      allocation.branch_rows[0].required_delta_squared_jacobian_clearance -
        12 / (2 * 0.0825)
    ) < 1e-12
  );
  assert.ok(
    Math.abs(
      allocation.branch_rows[0].required_jacobian_clearance_given_delta -
        allocation.branch_rows[0].required_delta_squared_jacobian_clearance /
          16
    ) < 1e-12
  );
  assert.equal(allocation.branch_rows[0].candidate_branch_target_met, true);
  assert.equal(
    allocation.branch_rows[0].candidate_branch_majorant_below_allocation,
    true
  );
  assert.equal(allocation.candidate_all_supplied_branch_targets_met, true);
  assert.equal(allocation.certifies_directed_rounded_shared_domain, false);
  assert.equal(allocation.retained_branch, false);
});

test("h39 finite-prefix primitive scalar replay is feasibility only", () => {
  const replay = computeH39FinitePrefixPrimitiveScalarReplay({
    candidate_E_R_finite_prefix: 10,
    candidate_nu_J_finite_prefix: 2,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_G_finite_prefix: 1e-12,
    candidate_M_R_finite_prefix: 1,
  });

  assert.equal(
    replay.candidate_primitive_bounds_status,
    "finite-prefix-plus-kernel-continuous-candidate-not-certificate"
  );
  assert.equal(replay.candidate_scalar_replay_closes, true);
  assert.equal(replay.certifies_continuous_polydisc_primitives, false);
  assert.equal(replay.certifies_directed_rounded_shared_domain, false);
  assert.equal(replay.retained_branch, false);
  assert.equal(replay.rouche_radius_lower_boundary, 5);
  assert.equal(replay.candidate_rho_X, 10);
  assert.equal(replay.candidate_r_X, 7.5);
  assert.ok(replay.candidate_rouche_primitive_closure_ratio < 1);
});

test("h39 coefficient-prefix seminorm helpers compute majorants and floors", () => {
  assert.equal(
    computeCoefficientPrefixMajorant(
      [
        [2, 3],
        [-1, 1],
      ],
      0.5,
      1
    ),
    1.75
  );
  assert.equal(
    computeCoefficientPrefixFloor(
      [
        [2, 3],
        [-1, 1],
      ],
      0.5
    ),
    1.5
  );
});

test("h39 Cauchy shifted-tail helpers expose sufficient bounds only", () => {
  const shifted = computeCauchyShiftedTailMajorants({
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
  });
  const quotient = computeCauchyRemovableQuotientFloor({
    outerBound: 6,
    outerRadius: 3,
    targetRadius: 1,
    leadingCoefficientInterval: [5, 6],
  });

  assert.equal(shifted.q, 0.5);
  assert.equal(shifted.shifted_function_majorant, 8);
  assert.equal(shifted.y_derivative_shifted_function_majorant, 8);
  assert.equal(shifted.certifies_continuous_polydisc_primitives, false);
  assert.ok(Math.abs(quotient.removable_quotient_tail_majorant - 1) < 1e-12);
  assert.ok(Math.abs(quotient.removable_quotient_floor - 4) < 1e-12);
  assert.equal(quotient.certifies_continuous_polydisc_primitives, false);
});

test("h39 Cauchy hybrid prefix-tail helpers quantify remaining analytic tail", () => {
  const shifted = computeCauchyShiftedPrefixTailMajorant({
    coefficients: [
      [1, 1],
      [2, 2],
    ],
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
  });
  const quotient = computeCauchyRemovableQuotientPrefixFloor({
    coefficients: [
      [5, 6],
      [0.5, 0.5],
    ],
    outerBound: 6,
    outerRadius: 3,
    targetRadius: 1,
  });
  const functionOrder = computeCauchyShiftedTailOrderForTarget({
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
    tailTarget: 0.25,
  });
  const derivativeOrder = computeCauchyShiftedTailOrderForTarget({
    outerBound: 32,
    outerRadius: 2,
    targetRadius: 1,
    shiftPower: 3,
    tailTarget: 1,
    tailKind: "y-derivative",
  });

  assert.equal(shifted.finite_prefix_order, 1);
  assert.equal(shifted.finite_prefix_majorant, 3);
  assert.equal(shifted.cauchy_tail_after_prefix_majorant, 2);
  assert.equal(shifted.shifted_function_prefix_plus_tail_majorant, 5);
  assert.equal(shifted.y_derivative_finite_prefix_majorant, 2);
  assert.equal(shifted.y_derivative_cauchy_tail_after_prefix_majorant, 6);
  assert.equal(shifted.y_derivative_prefix_plus_tail_majorant, 8);
  assert.equal(quotient.finite_prefix_order, 1);
  assert.ok(
    Math.abs(
      quotient.removable_quotient_prefix_plus_tail_floor -
        (4.5 - 1 / 3)
    ) < 1e-12
  );
  assert.equal(functionOrder.required_prefix_order, 4);
  assert.equal(derivativeOrder.required_prefix_order, 5);
  assert.equal(functionOrder.certifies_continuous_polydisc_primitives, false);
  assert.equal(derivativeOrder.certifies_continuous_polydisc_primitives, false);
});

test("h39 Cauchy coefficient prefix helpers compute majorants and floors", () => {
  const coefficients = [
    [2, 2],
    [0.5, 0.5],
  ];
  const majorant = computeCauchyCoefficientPrefixMajorant({
    coefficients,
    outerBound: 3,
    outerRadius: 1,
    targetRadius: 0.1,
  });
  const floor = computeCauchyCoefficientPrefixFloor({
    coefficients,
    outerBound: 3,
    outerRadius: 1,
    targetRadius: 0.1,
  });

  assert.equal(majorant.status, "cauchy-coefficient-prefix-majorant-emitted");
  assert.equal(floor.status, "cauchy-coefficient-prefix-floor-emitted");
  assert.equal(majorant.finite_prefix_majorant, 2.05);
  assert.ok(
    Math.abs(majorant.prefix_plus_tail_majorant - 2.0833333333333335) <
      1e-15
  );
  assert.ok(
    Math.abs(floor.prefix_plus_tail_floor - 1.9166666666666667) < 1e-15
  );
  assert.equal(majorant.certifies_continuous_polydisc_primitives, false);
  assert.equal(floor.certifies_continuous_polydisc_primitives, false);
});

test("h39 Cauchy tail order sensitivity keeps M_G obstruction candidate-only", () => {
  const sensitivity = computeCauchyShiftedTailOrderSensitivity({
    outerBounds: [1e-20, 1],
    outerRadius: 0.001796875,
    targetRadius: 0.001,
    shiftPower: 41,
    tailTarget: 9.468681741438209e-99,
    tailKind: "unshifted-function",
    maxPrefixOrder: 1000,
  });

  assert.equal(
    sensitivity.status,
    "cauchy-shifted-tail-order-sensitivity-complete"
  );
  assert.equal(sensitivity.rows[0].required_prefix_order, 266);
  assert.equal(sensitivity.rows[1].required_prefix_order, 345);
  assert.equal(sensitivity.certifies_continuous_polydisc_primitives, false);
});

test("h39 N_G denominator-clearance outer majorant stays candidate-only", () => {
  const plusBranch = computeBranchGDenominatorClearanceMajorant({
    kernelMajorant: 3,
    speedLowerBound: 2,
    deltaClearance: 4,
    jacobianClearance: 5,
  });
  const minusBranch = computeBranchGDenominatorClearanceMajorant({
    kernelMajorant: 2,
    speedLowerBound: 4,
    deltaClearance: 2,
    jacobianClearance: 4,
  });
  const nG = computeNGOuterBoundFromDenominatorClearance({
    branchGOuterMajorants: [
      plusBranch.branch_g_outer_majorant,
      minusBranch.branch_g_outer_majorant,
    ],
    lMajorant: 7,
    lowerPolynomialMajorant: 11,
    outerRadius: 0.5,
  });

  assert.equal(plusBranch.denominator_clearance, 160);
  assert.equal(plusBranch.branch_g_outer_majorant, 0.075);
  assert.equal(minusBranch.branch_g_outer_majorant, 0.125);
  assert.equal(nG.pair_g_outer_majorant, 0.2);
  assert.equal(nG.lower_polynomial_y2_majorant, 2.75);
  assert.equal(nG.n_g_outer_bound, 9.95);
  assert.equal(nG.certifies_continuous_polydisc_primitives, false);
  assert.equal(nG.certifies_directed_rounded_shared_domain, false);
});

test("h39 N_G outer-bound candidate M_G restores the y41 scale", () => {
  const diagnostic = computeH39NGOuterBoundCandidateMG({
    nGShiftedCoefficients: [
      [1, 1],
      [2, 2],
    ],
    nGOuterBound: 32,
    nGOuterRadius: 2,
    rho: 1,
    nGShift: 3,
  });

  assert.equal(diagnostic.retained_shifted_prefix_order, 1);
  assert.equal(diagnostic.candidate_M_G_finite_prefix, 3);
  assert.equal(diagnostic.candidate_M_G_cauchy_tail_after_prefix, 2);
  assert.equal(diagnostic.candidate_M_G_prefix_plus_tail_bound, 5);
  assert.equal(diagnostic.shifted_T_G_prefix_plus_tail_majorant, 5);
  assert.equal(
    diagnostic.certifies_directed_rounded_h39_polydisc_M_G_bound,
    false
  );
  assert.equal(diagnostic.retained_branch, false);
});

test("h39 N_G outer-bound primitive replay is candidate-only", () => {
  const replay = computeH39NGOuterBoundPrimitiveReplay({
    nGShiftedCoefficients: [[1e-90, 1e-90]],
    nGOuterBound: 1e-20,
    nGOuterRadius: 0.001796875,
    rho: 0.001,
    candidate_E_R_bound: 10,
    candidate_nu_J_bound: 2,
    candidate_L_J_reduced_continuous_majorant: 0,
    candidate_M_R_bound: 1,
  });

  assert.equal(
    replay.status,
    "h39-n-g-outer-bound-primitive-replay-emitted"
  );
  assert.ok(replay.candidate_M_G_bound > 0);
  assert.equal(replay.candidate_scalar_replay_closes, true);
  assert.equal(replay.certifies_directed_rounded_shared_domain, false);
  assert.equal(replay.retained_branch, false);
});

test("h39 multivariate coefficient-prefix helpers compute shared-domain bounds", () => {
  const entries = [
    { coefficient: [5, 6], powers: [0, 0] },
    { coefficient: [-2, 1], powers: [1, 0] },
    { coefficient: [3, 4], powers: [0, 2] },
  ];

  assert.equal(
    computeMultivariateCoefficientPrefixMajorant(entries, [0.5, 0.25], {
      tailMajorant: 0.1,
    }),
    6 + 2 * 0.5 + 4 * 0.25 ** 2 + 0.1
  );
  assert.ok(
    Math.abs(
      computeMultivariateCoefficientPrefixFloor(entries, [0.5, 0.25], {
        tailMajorant: 0.1,
      }) -
        (5 - (2 * 0.5 + 4 * 0.25 ** 2 + 0.1))
    ) < 1e-12
  );
});

test("h39 multivariate coefficient-prefix helpers accept tuple entries", () => {
  assert.equal(
    computeMultivariateCoefficientPrefixMajorant(
      [
        [[1, 2], [0, 0]],
        [[-3, 3], [2, 1]],
      ],
      [0.5, 0.25]
    ),
    2 + 3 * 0.5 ** 2 * 0.25
  );
});

test("h39 N_G coefficient evaluator preserves the shifted D identity", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const row = evaluateNGCoefficientRows({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [-1, -1] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [1, 1] },
    ],
    shiftedOrder: 3,
  });

  assert.equal(row.status, "h39-n-g-coefficient-rows-evaluated");
  assert.equal(
    row.all_D_plus_40_plus_k_G_identity_witnesses_contain_zero,
    true
  );
  assert.equal(row.N_G_shifted_coefficients.length, 4);
  assert.equal(row.N_D_shifted_coefficients.length, 4);
  assert.equal(row.certifies_continuous_polydisc_primitives, false);
});

test("h39 shared-domain coefficient summary refuses continuous primitive bounds", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const r43 = evaluateR43CoefficientRows({
    context,
    cell: CELL,
    branch: "-",
    hIntervals: hIntervals(),
    xInterval: [0, 0],
    rho: 0.001,
  });
  const nG = evaluateNGCoefficientRows({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals(), xInterval: [0, 0] },
      { branch: "+", hIntervals: hIntervals(), xInterval: [0, 0] },
    ],
  });
  const summary = summarizeSharedDomainPrimitiveBounds({
    r43Rows: [r43],
    nGRows: [nG],
    rho: 0.001,
  });

  assert.equal(
    summary.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_EVALUATOR_SCHEMA
  );
  assert.equal(summary.E_R, null);
  assert.equal(summary.nu_J, null);
  assert.equal(summary.L_J, null);
  assert.equal(summary.M_R, null);
  assert.equal(summary.M_G, null);
  assert.equal(summary.certifies_continuous_polydisc_primitives, false);
  assert.ok(summary.max_abs_R43_center_coefficient > 0);
  assert.ok(summary.max_abs_N_G_shifted_coefficient > 0);
  assert.ok(summary.candidate_E_R_finite_prefix > 0);
  assert.ok(summary.candidate_M_R_finite_prefix > 0);
  assert.ok(Number.isFinite(summary.candidate_nu_J_finite_prefix));
  assert.ok(Number.isFinite(summary.candidate_L_J_finite_prefix));
  assert.equal(summary.second_x_kernel_y_power, 41);
  assert.ok(summary.candidate_M_K_finite_prefix > 0);
  assert.equal(
    summary.candidate_L_J_factored_finite_prefix,
    summary.candidate_L_J_finite_prefix
  );
  assert.equal(
    summary.candidate_L_J_factor_identity_finite_prefix_holds,
    true
  );
  assert.ok(summary.candidate_M_K_continuous_majorant > 0);
  assert.ok(summary.candidate_L_J_reduced_continuous_majorant > 0);
  assert.ok(
    summary.candidate_L_J_reduced_continuous_majorant >=
      summary.candidate_L_J_factored_finite_prefix
  );
  assert.equal(
    summary.candidate_L_J_reduced_continuous_majorant_source,
    "kernel-continuous-majorant"
  );
  assert.ok(summary.candidate_M_G_finite_prefix > 0);
  assert.equal(
    summary.candidate_finite_prefix_primitive_scalar_replay
      .certifies_continuous_polydisc_primitives,
    false
  );
  assert.equal(
    summary.candidate_finite_prefix_primitive_scalar_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.ok(
    Number.isFinite(
      summary.candidate_finite_prefix_primitive_scalar_replay
        .candidate_rho_X
    )
  );
  assert.equal(JSON.stringify(summary).includes("speed_band"), false);
});

test("h39 shared-domain coefficient cell evaluates both centered branches without closure claims", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const cell = evaluateH39SharedDomainCoefficientCell({
    context,
    cell: CELL,
    branchInputs: [
      { branch: "-", hIntervals: hIntervals() },
      { branch: "+", hIntervals: hIntervals() },
    ],
    shiftedOrder: 1,
    rho: 0.001,
  });

  assert.equal(cell.status, "h39-shared-domain-coefficient-cell-evaluated");
  assert.equal(cell.h39_center_solves.length, 2);
  assert.equal(cell.r43_rows.length, 2);
  assert.equal(
    cell.n_g_row.all_D_plus_40_plus_k_G_identity_witnesses_contain_zero,
    true
  );
  assert.ok(cell.finite_prefix_summary.candidate_E_R_finite_prefix > 0);
  assert.ok(cell.finite_prefix_summary.candidate_M_G_finite_prefix > 0);
  assert.equal(
    cell.claim_boundary.certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(cell.claim_boundary.retained_branch, false);
});

test("h39 shared-domain coefficient rows consume h38 branch rows", () => {
  const context = makeTheta3minusFirstYGdSeriesContext({ seriesOrder: 44 });
  const rows = evaluateH39SharedDomainCoefficientRows({
    context,
    h38Rows: [h38Row()],
    shiftedOrder: 1,
    rho: 0.001,
  });

  assert.equal(rows.length, 1);
  assert.equal(rows[0].cell_id, "speed.test.first-y");
  assert.equal(
    rows[0].h39_coefficient_cell.status,
    "h39-shared-domain-coefficient-cell-evaluated"
  );
  assert.equal(
    rows[0].h39_coefficient_cell.claim_boundary
      .certifies_directed_rounded_shared_domain,
    false
  );
});

test("h39 coefficient artifact summarizes supplied h38 rows without closure claims", () => {
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder: 1,
    rho: 0.001,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);

  assert.equal(
    artifact.schema,
    THETA3MINUS_FOLD_PAIR_FIRST_Y_GD_SHARED_DOMAIN_COEFFICIENT_ARTIFACT_SCHEMA
  );
  assert.deepEqual(errors, []);
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary.coefficient_row_count,
    1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .all_centered_leading_R43_coefficients_contain_zero,
    true
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .min_h39_jacobian_coefficient_clearance > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .second_x_derivative_lowest_y_power,
    41
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_L_J_finite_prefix > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary.second_x_kernel_y_power,
    41
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_M_K_finite_prefix > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .all_candidate_L_J_factor_identities_hold,
    true
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_M_K_continuous_majorant > 0
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .max_candidate_L_J_reduced_continuous_majorant > 0
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_scalar_replay_closes,
    true
  );
  assert.ok(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_scalar_replay_ratio < 1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_primitive_scalar_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
  assert.equal(
    artifact.claim_boundary
      .certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(JSON.stringify(artifact).includes("speed_band"), false);
});

test("h39 coefficient artifact raises series order for deeper shifted prefixes", () => {
  const shiftedOrder = 6;
  const requestedSeriesOrder = 44;
  const artifact = buildH39SharedDomainCoefficientArtifact({
    h38Rows: [h38Row()],
    validateH38: false,
    shiftedOrder,
    seriesOrder: requestedSeriesOrder,
    rho: 0.001,
  });
  const errors = validateH39SharedDomainCoefficientArtifact(artifact);
  const requiredSeriesOrder = Math.max(
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.default_series_order,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.r43_source_shift +
      shiftedOrder,
    THETA3MINUS_H39_SHARED_DOMAIN_EVALUATOR_CONSTANTS.n_g_shift + shiftedOrder
  );

  assert.deepEqual(errors, []);
  assert.equal(
    artifact.coefficient_artifact_parameters.requested_series_order,
    requestedSeriesOrder
  );
  assert.equal(
    artifact.coefficient_artifact_parameters.series_order,
    requiredSeriesOrder
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_rows[0].h39_coefficient_cell
      .r43_rows[0].R43_shifted_coefficients.length,
    shiftedOrder + 1
  );
  assert.equal(
    artifact.h39_shared_domain_coefficient_summary
      .candidate_finite_prefix_primitive_scalar_replay
      .certifies_directed_rounded_shared_domain,
    false
  );
});
