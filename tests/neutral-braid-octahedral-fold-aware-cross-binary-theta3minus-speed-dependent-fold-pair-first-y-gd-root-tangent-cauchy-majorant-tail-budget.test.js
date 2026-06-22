import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget,
  computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate,
  computeH39PrimitiveRemainderBudgetCandidate,
  computeH39PrimitiveRemainderProfileScaleCandidate,
  computeH39PrimitiveSlackTolerancesCandidate,
  computeH39RouchePrimitiveClosure,
  computeH39RoucheRadiusSupremumCeiling,
  computeH39RoucheRhoXOptimumCeiling,
  computeH39RoucheYRadiusOptimumCeiling,
  computeH39RootGraphRoucheLift,
  computeH39RootGraphRoucheRadiusWindow,
  computeH39RootTangentCauchyMajorantBudget,
  computeH39RootTangentDerivedSlopeRatio,
  computeH39RootTangentSlopeEnvelope,
  validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget,
} from "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs";

const EXPECTED_STATUS =
  "h39-rouche-y-radius-optimum-reduction-certified";
const NO_SPEED_WINDOW =
  "none; uses the certified positive speed-ratio zero enclosure only";

function scriptPath() {
  return path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    "../scripts/neutral-braid/octahedral-fold-aware-cross-binary-theta3minus-speed-dependent-fold-pair-first-y-gd-root-tangent-cauchy-majorant-tail-budget.mjs"
  );
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("theta3minus h39 root-tangent Cauchy-majorant tail budget validates", () => {
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_THETA3MINUS_SPEED_DEPENDENT_FOLD_PAIR_FIRST_Y_GD_ROOT_TANGENT_CAUCHY_MAJORANT_TAIL_BUDGET_SCHEMA
  );
  assert.equal(packet.promotion_status, "priority-only");
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
});

test("h39 Cauchy-majorant budget imposes no fixed speed band", () => {
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget();
  const params = packet.root_tangent_cauchy_majorant_tail_budget_parameters;

  assert.equal(params.speed_constraint, NO_SPEED_WINDOW);
  assert.deepEqual(params.speed_ratio_enclosure, [3.02156, 3.02157]);
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
  assert.equal(params.speed_band, undefined);
  assert.equal(params.speed_window, undefined);
  assert.equal(params.speed_min, undefined);
  assert.equal(params.speed_max, undefined);
});

test("h39 Cauchy-majorant budget computes the rho=4Y D-tail bottleneck", () => {
  const budget = computeH39RootTangentCauchyMajorantBudget();

  assert.equal(budget.radius_multiple, 4);
  assert.equal(budget.q, 0.25);
  assert.equal(budget.active_bottleneck, "D_tail");
  assert.equal(budget.D_tail_active_bottleneck_for_all_radius_and_slope, true);
  assert.ok(budget.D_over_G_threshold_ratio < 1);
  assert.ok(Math.abs(budget.rho - 0.0071875) < 1e-16);
  assert.ok(
    Math.abs(budget.rho_power_41 - 1.3173226696331288e-88) < 1e-100
  );
  assert.ok(
    Math.abs(budget.G_tail_M_G_threshold - 1.0061465645125542e18) < 1e6
  );
  assert.ok(
    Math.abs(budget.D_tail_M_G_threshold - 2.494413265600795e16) < 1e5
  );
});

test("h39 Cauchy-majorant budget accounts for the Xi over sigma_X slope cost", () => {
  const zeroSlope = computeH39RootTangentCauchyMajorantBudget();
  const withSlope = computeH39RootTangentCauchyMajorantBudget({
    xiOverSigmaX: 10,
  });

  assert.equal(withSlope.active_bottleneck, "D_tail");
  assert.equal(withSlope.G_tail_M_G_threshold, zeroSlope.G_tail_M_G_threshold);
  assert.ok(
    withSlope.D_tail_M_G_threshold < zeroSlope.D_tail_M_G_threshold
  );
});

test("h39 Cauchy-majorant budget thresholds increase with certified radius", () => {
  const radius4 = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple: 4,
    xiOverSigmaX: 10,
  });
  const radius5 = computeH39RootTangentCauchyMajorantBudget({
    radiusMultiple: 5,
    xiOverSigmaX: 10,
  });

  assert.equal(radius4.thresholds_strictly_increase_with_radius, true);
  assert.ok(radius4.G_tail_log_derivative_wrt_s > 0);
  assert.ok(radius4.D_tail_log_derivative_wrt_s > 0);
  assert.ok(radius4.D_tail_log_derivative_lower_bound > 0);
  assert.ok(radius4.D_over_G_threshold_ratio < 1);
  assert.equal(radius4.D_tail_active_bottleneck_for_all_radius_and_slope, true);
  assert.ok(radius5.G_tail_M_G_threshold > radius4.G_tail_M_G_threshold);
  assert.ok(radius5.D_tail_M_G_threshold > radius4.D_tail_M_G_threshold);
  assert.ok(radius5.D_over_G_threshold_ratio < 1);
});

test("h39 Cauchy-majorant budget decides a provided M_G candidate against the D bottleneck", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const passing =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      { mGBound: threshold * 0.5 }
    );
  const failing =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      { mGBound: threshold * 2 }
    );

  assert.equal(
    passing.root_tangent_cauchy_majorant_tail_budget_summary
      .candidate_closes_h39_majorant_budget,
    true
  );
  assert.equal(
    passing.root_tangent_cauchy_majorant_tail_budget_summary
      .active_budget_decision,
    "closed-for-provided-M_G-bound"
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      passing
    ),
    []
  );
  assert.equal(
    failing.root_tangent_cauchy_majorant_tail_budget_summary
      .candidate_closes_h39_majorant_budget,
    false
  );
  assert.equal(
    failing.root_tangent_cauchy_majorant_tail_budget_summary
      .active_budget_decision,
    "open-for-provided-M_G-bound"
  );
});

test("h39 Cauchy-majorant budget inverts the D bottleneck into a slope envelope", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const envelope = computeH39RootTangentSlopeEnvelope({
    mGBound: threshold * 0.5,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      { mGBound: threshold * 0.5, xiOverSigmaX: 10 }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    envelope.slope_envelope_status,
    "nonnegative-slope-budget-available"
  );
  assert.ok(envelope.maximum_admissible_xi_over_sigma_X > 40);
  assert.equal(
    summary.maximum_admissible_xi_over_sigma_X,
    envelope.maximum_admissible_xi_over_sigma_X
  );
  assert.equal(
    summary.candidate_xi_over_sigma_X_margin,
    envelope.maximum_admissible_xi_over_sigma_X - 10
  );
  assert.equal(summary.candidate_nonnegative_slope_feasible, true);
  assert.ok(summary.candidate_D_tail_closure_left_scalar > 0);
  assert.ok(
    summary.candidate_D_tail_closure_left_scalar <
      summary.candidate_D_tail_closure_right_scalar
  );
  assert.ok(summary.candidate_D_tail_closure_scalar_margin > 0);
  assert.equal(summary.candidate_closes_h39_majorant_budget, true);
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Cauchy-majorant slope envelope identifies no-slope-budget candidates", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const envelope = computeH39RootTangentSlopeEnvelope({
    mGBound: threshold * 2,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      { mGBound: threshold * 2 }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    envelope.slope_envelope_status,
    "no-nonnegative-slope-budget"
  );
  assert.ok(envelope.maximum_admissible_xi_over_sigma_X < 0);
  assert.equal(summary.candidate_closes_h39_majorant_budget, false);
  assert.equal(summary.slope_envelope_status, "no-nonnegative-slope-budget");
  assert.equal(summary.candidate_nonnegative_slope_feasible, false);
  assert.ok(summary.candidate_xi_over_sigma_X_margin < 0);
  assert.ok(summary.candidate_D_tail_closure_scalar_margin < 0);
});

test("h39 Cauchy-majorant budget derives Xi over sigma_X from root-tangent inputs", () => {
  const derived = computeH39RootTangentDerivedSlopeRatio({
    rootTangentNumeratorBound: 20,
    jacobianLowerBound: 4,
    sigmaX: 2,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 20,
        jacobianLowerBound: 4,
        sigmaX: 2,
        mGBound: 1e12,
      }
    );
  const params = packet.root_tangent_cauchy_majorant_tail_budget_parameters;
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(derived.derived_Xi_bound, 5);
  assert.equal(derived.derived_xi_over_sigma_X, 2.5);
  assert.equal(
    params.xi_over_sigma_X_source,
    "derived-from-root-tangent-inputs"
  );
  assert.equal(summary.root_tangent_input_status, "derived-from-R43-J-sigma");
  assert.equal(summary.derived_Xi_bound, 5);
  assert.equal(summary.derived_Xi_star_bound, 5);
  assert.equal(summary.root_tangent_Xi_bound, 5);
  assert.equal(summary.derived_xi_over_sigma_X, 2.5);
  assert.equal(summary.xi_over_sigma_X, 2.5);
  assert.equal(summary.candidate_tail_closure_scalar_margins_positive, true);
  assert.equal(summary.candidate_closes_h39_majorant_budget, true);
  assert.equal(
    summary.primitive_polydisc_certificate_formula,
    "M_G*(40+M_R/(J_min*sigma_X)+1/(s-1)) < B_D_39*Y^41*s^40*(s-1)"
  );
  assert.equal(
    summary.maximum_admissible_root_tangent_numerator_formula,
    "M_R < J_min*sigma_X*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))"
  );
  assert.equal(
    summary.candidate_primitive_polydisc_certificate_closes,
    true
  );
  assert.ok(summary.candidate_primitive_polydisc_closure_ratio < 1);
  assert.ok(summary.maximum_admissible_root_tangent_numerator_bound_M_R > 20);
  assert.equal(
    summary.candidate_root_tangent_numerator_bound_M_R_margin,
    summary.maximum_admissible_root_tangent_numerator_bound_M_R - 20
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Cauchy-majorant budget derives sigma_X from rho_X and r_X", () => {
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 18,
        jacobianLowerBound: 3,
        rhoX: 5,
        rX: 2,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(summary.sigma_X, 3);
  assert.equal(summary.derived_Xi_bound, 6);
  assert.equal(summary.derived_xi_over_sigma_X, 2);
  assert.equal(summary.xi_over_sigma_X, 2);
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Cauchy-majorant budget derives J_min and sigma_X from a Rouché graph lift", () => {
  const radiusWindow = computeH39RootGraphRoucheRadiusWindow({
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    rhoX: 3,
  });
  assert.equal(radiusWindow.rouche_radius_window_nonempty, true);
  assert.ok(radiusWindow.rouche_radius_lower_boundary > 0);
  assert.ok(radiusWindow.rouche_radius_lower_boundary < 0.021);
  assert.ok(radiusWindow.rouche_best_sigma_X_supremum > 2.979);

  const graphLift = computeH39RootGraphRoucheLift({
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    rhoX: 3,
    rX: 2,
  });
  assert.equal(graphLift.root_graph_lift_status, "rouche-certified");
  assert.equal(graphLift.derived_jacobian_lower_bound_J_min, 4.7);
  assert.equal(graphLift.root_graph_jacobian_loss_bound, 0.30000000000000004);
  assert.equal(graphLift.root_graph_nonlinear_remainder_bound, 0.2);
  assert.ok(Math.abs(graphLift.root_graph_rouche_margin - 9.7) < 1e-12);

  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 9.4,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        rhoX: 3,
        rX: 2,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(summary.root_graph_lift_status, "rouche-certified");
  assert.equal(summary.certifies_unique_root_in_X_disc, true);
  assert.equal(summary.rouche_radius_window_nonempty, true);
  assert.ok(summary.rouche_radius_lower_boundary < 2);
  assert.ok(summary.rouche_best_sigma_X_supremum > summary.sigma_X);
  assert.equal(summary.jacobian_lower_bound, 4.7);
  assert.equal(summary.sigma_X, 1);
  assert.equal(summary.derived_xi_over_sigma_X, 2);
  assert.equal(summary.candidate_primitive_polydisc_certificate_closes, true);
  assert.equal(
    summary.rouche_primitive_closure_status,
    "closed-for-provided-rouche-primitive-bounds"
  );
  assert.equal(
    summary.rouche_primitive_h39_report_status,
    "closed-for-provided-rouche-primitive-bounds"
  );
  assert.equal(summary.candidate_rouche_primitive_certificate_closes, true);
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_below_one,
    true
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Rouché primitive closure ratio combines graph lift with M_G and M_R", () => {
  const closure = computeH39RouchePrimitiveClosure({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    rhoX: 3,
    rX: 2,
    mGBound: 1e12,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 9.4,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        rhoX: 3,
        rX: 2,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    closure.rouche_primitive_closure_status,
    "closed-for-provided-rouche-primitive-bounds"
  );
  assert.equal(closure.candidate_rouche_primitive_certificate_closes, true);
  assert.ok(closure.candidate_rouche_primitive_closure_ratio < 1);
  assert.equal(
    closure.candidate_rouche_primitive_h39_closure_ratio_below_one,
    true
  );
  assert.equal(
    closure.candidate_rouche_primitive_h39_closure_ratio_margin_to_one,
    1 - closure.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim
  );
  assert.equal(
    closure.rouche_primitive_closure_formula,
    "Lambda_39^R=M_G*(40+M_R/((nu_J-L_J*rho_X)*(rho_X-r_X))+1/(s-1))/(B_D_39*Y^41*s^40*(s-1))"
  );
  assert.equal(
    closure.rouche_primitive_h39_closure_ratio_formula,
    "Lambda_39^prim=M_G*(40+M_R/((nu_J-L_J*rho_X)*(rho_X-r_X))+1/(s-1))/(B_D_39*Y^41*s^40*(s-1))"
  );
  assert.equal(
    closure.maximum_admissible_root_tangent_numerator_from_rouche_formula,
    "M_R < (nu_J-L_J*rho_X)*(rho_X-r_X)*((1-q)*B_D_39*rho^41/M_G - 40 - q/(1-q))"
  );
  assert.equal(
    closure.rouche_form_admissible_M_R_ceiling,
    closure.maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs
  );
  assert.equal(
    closure.candidate_rouche_form_M_R_margin,
    closure.rouche_form_admissible_M_R_ceiling - 9.4
  );
  assert.equal(
    summary.candidate_rouche_primitive_closure_ratio,
    closure.candidate_rouche_primitive_closure_ratio
  );
  assert.equal(
    summary.candidate_rouche_primitive_closure_left_scalar,
    summary.candidate_primitive_polydisc_closure_left_scalar
  );
  assert.equal(
    summary.candidate_rouche_primitive_closure_right_scalar,
    summary.candidate_primitive_polydisc_closure_right_scalar
  );
  assert.equal(
    summary.maximum_admissible_root_tangent_numerator_bound_M_R_from_rouche_inputs,
    summary.maximum_admissible_root_tangent_numerator_bound_M_R
  );
  assert.equal(
    summary.rouche_form_admissible_M_R_ceiling,
    summary.maximum_admissible_root_tangent_numerator_bound_M_R
  );
  assert.equal(
    summary.candidate_rouche_root_tangent_numerator_bound_M_R_margin,
    summary.candidate_root_tangent_numerator_bound_M_R_margin
  );
  assert.equal(
    summary.candidate_rouche_form_M_R_margin,
    summary.candidate_root_tangent_numerator_bound_M_R_margin
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 primitive slack tolerances invert each supplied primitive bound", () => {
  const budget = computeH39RootTangentCauchyMajorantBudget();
  const mGBound = budget.D_tail_M_G_threshold / 2;
  const slack = computeH39PrimitiveSlackTolerancesCandidate({
    radiusMultiple: 4,
    mGBound,
    rootTangentNumeratorBound: 0,
    centerResidualBound: 1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 1,
    rhoX: 2,
    rX: 1,
  });

  const sigmaX = 1;
  const jMin = 3;
  const constantTerm = 40 + 1 / 3;
  const slopeBudget =
    slack.primitive_slack_right_scalar / mGBound - constantTerm;
  const roucheLower = 5 - Math.sqrt(23);

  assert.equal(
    slack.primitive_slack_tolerances_status,
    "h39-primitive-slack-tolerances-candidate-emitted"
  );
  assert.ok(Math.abs(slopeBudget - constantTerm) < 1e-12);
  assert.equal(slack.primitive_slack_current_J_min, jMin);
  assert.equal(slack.primitive_slack_current_sigma_X, sigmaX);
  assert.equal(slack.primitive_slack_current_J_min_sigma_X, 3);
  assert.equal(slack.primitive_slack_required_J_min_sigma_X_from_closure, 0);
  assert.equal(slack.primitive_slack_maximum_E_R, 4.5);
  assert.equal(slack.primitive_slack_E_R_margin, 3.5);
  assert.equal(slack.primitive_slack_minimum_nu_J, 2);
  assert.equal(slack.primitive_slack_nu_J_margin, 3);
  assert.equal(slack.primitive_slack_maximum_L_J, 2.5);
  assert.equal(slack.primitive_slack_L_J_margin, 1.5);
  assert.equal(slack.primitive_slack_rho_X_admissible_lower_bound, 1);
  assert.equal(slack.primitive_slack_rho_X_admissible_upper_bound, 5);
  assert.equal(slack.primitive_slack_rho_X_lower_margin, 1);
  assert.equal(slack.primitive_slack_rho_X_upper_margin, 3);
  assert.ok(
    Math.abs(slack.primitive_slack_r_X_admissible_lower_bound - roucheLower) <
      1e-12
  );
  assert.equal(slack.primitive_slack_r_X_admissible_upper_bound, 2);
  assert.ok(
    Math.abs(slack.primitive_slack_r_X_lower_margin - (1 - roucheLower)) <
      1e-12
  );
  assert.equal(slack.primitive_slack_r_X_upper_margin, 1);
  assert.ok(
    Math.abs(
      slack.primitive_slack_maximum_M_G -
        budget.D_tail_M_G_threshold
    ) < 1e4
  );
  assert.ok(
    Math.abs(slack.primitive_slack_M_G_margin - mGBound) < 1e4
  );
  assert.ok(
    Math.abs(
      slack.primitive_slack_maximum_M_R -
        jMin * sigmaX * slopeBudget
    ) < 1e-9
  );
  assert.ok(Math.abs(slack.primitive_slack_maximum_M_R - 121) < 1e-9);
  assert.ok(Math.abs(slack.primitive_slack_M_R_margin - 121) < 1e-9);
  assert.ok(
    Math.abs(
      slack.primitive_slack_maximum_M_G -
        slack.primitive_slack_right_scalar / constantTerm
    ) < 1e4
  );
  assert.equal(slack.primitive_slack_all_current_margins_positive, true);
  assert.equal(slack.certifies_directed_rounded_h39_polydisc_bounds, false);
  assert.equal(slack.retained_branch, false);
});

test("h39 primitive remainder budget certifies a pessimistic allowance rectangle", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const mGBound = threshold / 2;
  const remainder = computeH39PrimitiveRemainderBudgetCandidate({
    radiusMultiple: 4,
    mGBound,
    rootTangentNumeratorBound: 0,
    centerResidualBound: 1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 1,
    rhoX: 2,
    rX: 1,
    centerResidualRemainderBound: 0.5,
    centerJacobianLowerRemainderBound: 1,
    jacobianLipschitzRemainderBound: 0.5,
    rhoXLowerRemainderBound: 0.25,
    rhoXUpperRemainderBound: 0.5,
    rXLowerRemainderBound: 0.1,
    rXUpperRemainderBound: 0.25,
    mGRemainderBound: threshold / 4,
    rootTangentNumeratorRemainderBound: 1,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        radiusMultiple: 4,
        mGBound,
        rootTangentNumeratorBound: 0,
        centerResidualBound: 1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 1,
        rhoX: 2,
        rX: 1,
        centerResidualRemainderBound: 0.5,
        centerJacobianLowerRemainderBound: 1,
        jacobianLipschitzRemainderBound: 0.5,
        rhoXLowerRemainderBound: 0.25,
        rhoXUpperRemainderBound: 0.5,
        rXLowerRemainderBound: 0.1,
        rXUpperRemainderBound: 0.25,
        mGRemainderBound: threshold / 4,
        rootTangentNumeratorRemainderBound: 1,
      }
    );

  assert.equal(
    remainder.primitive_remainder_budget_status,
    "h39-primitive-remainder-budget-candidate-emitted"
  );
  assert.equal(remainder.primitive_remainder_budget_worst_E_R, 1.5);
  assert.equal(remainder.primitive_remainder_budget_worst_nu_J, 4);
  assert.equal(remainder.primitive_remainder_budget_worst_L_J, 1.5);
  assert.equal(remainder.primitive_remainder_budget_rho_X_lower, 1.75);
  assert.equal(remainder.primitive_remainder_budget_rho_X_upper, 2.5);
  assert.equal(remainder.primitive_remainder_budget_r_X_lower, 0.9);
  assert.equal(remainder.primitive_remainder_budget_r_X_upper, 1.25);
  assert.equal(remainder.primitive_remainder_budget_worst_M_G, threshold * 0.75);
  assert.equal(remainder.primitive_remainder_budget_worst_M_R, 1);
  assert.equal(remainder.primitive_remainder_budget_min_J_min, 0.25);
  assert.equal(remainder.primitive_remainder_budget_min_sigma_X, 0.5);
  assert.equal(remainder.primitive_remainder_budget_min_J_min_sigma_X, 0.3125);
  assert.ok(
    Math.abs(remainder.primitive_remainder_budget_min_rouche_margin - 1.4925) <
      1e-12
  );
  assert.ok(remainder.primitive_remainder_budget_scalar_margin > 0);
  assert.equal(remainder.primitive_remainder_budget_closes_candidate, true);
  assert.equal(
    packet.root_tangent_cauchy_majorant_tail_budget_summary
      .primitive_remainder_budget_closes_candidate,
    true
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
  assert.equal(remainder.certifies_directed_rounded_h39_polydisc_bounds, false);
  assert.equal(remainder.retained_branch, false);
});

test("h39 primitive remainder profile scale finds the admissible M_G profile multiplier", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const scale = computeH39PrimitiveRemainderProfileScaleCandidate({
    radiusMultiple: 4,
    mGBound: threshold / 2,
    rootTangentNumeratorBound: 0,
    centerResidualBound: 1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 1,
    rhoX: 2,
    rX: 1,
    mGRemainderProfile: threshold / 4,
    profileScaleUpperBound: 4,
    profileScaleTolerance: 1e-12,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        radiusMultiple: 4,
        mGBound: threshold / 2,
        rootTangentNumeratorBound: 0,
        centerResidualBound: 1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 1,
        rhoX: 2,
        rX: 1,
        mGRemainderProfile: threshold / 4,
        profileScaleUpperBound: 4,
        profileScaleTolerance: 1e-12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    scale.primitive_remainder_profile_scale_status,
    "h39-primitive-remainder-profile-scale-candidate-emitted"
  );
  assert.equal(
    scale.primitive_remainder_profile_scale_budget_at_candidate
      .primitive_remainder_profile_scale_safe_closes_candidate,
    true
  );
  assert.equal(
    scale.primitive_remainder_profile_scale_budget_at_first_failing_upper
      .primitive_remainder_profile_scale_safe_closes_candidate,
    false
  );
  assert.equal(
    summary.primitive_remainder_profile_scale_status,
    scale.primitive_remainder_profile_scale_status
  );
  assert.ok(
    Math.abs(summary.primitive_remainder_profile_scale_candidate - 2) < 1e-9
  );
  assert.equal(
    summary.primitive_remainder_profile_scale_budget_at_candidate
      .primitive_remainder_profile_scale_safe_closes_candidate,
    true
  );
  assert.ok(
    Math.abs(scale.primitive_remainder_profile_scale_candidate - 2) < 1e-9
  );
  assert.ok(scale.primitive_remainder_profile_scale_candidate < 2);
  assert.ok(
    Math.abs(
      scale.primitive_remainder_profile_scale_first_failing_upper - 2
    ) < 1e-9
  );
  assert.ok(
    scale.primitive_remainder_profile_scale_first_failing_upper >=
      scale.primitive_remainder_profile_scale_candidate
  );
  assert.ok(
    Math.abs(
      scale.primitive_remainder_profile_scale_scaled_M_G_allowance -
        threshold / 2
    ) < 1e5
  );
  assert.equal(
    scale.primitive_remainder_profile_scale_budget_at_candidate
      .primitive_remainder_budget_worst_M_G <
      threshold,
    true
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
  assert.equal(scale.certifies_directed_rounded_h39_polydisc_bounds, false);
  assert.equal(
    scale.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(scale.retained_branch, false);
});

test("h39 primitive analytic remainder multi-profile boundary matches the safe profile replay", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const params = {
    radiusMultiple: 4,
    mGBound: threshold / 2,
    rootTangentNumeratorBound: 0,
    centerResidualBound: 1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 1,
    rhoX: 2,
    rX: 1,
    centerResidualRemainderProfile: 0.125,
    centerJacobianLowerRemainderProfile: 0.25,
    mGRemainderProfile: threshold / 4,
    rootTangentNumeratorRemainderProfile: 0.5,
    profileScaleUpperBound: 4,
    profileScaleTolerance: 1e-12,
  };
  const exact =
    computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate(params);
  const scale = computeH39PrimitiveRemainderProfileScaleCandidate(params);
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      params
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;
  const embedded =
    summary.primitive_remainder_profile_scale_exact_multi_profile_boundary;

  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_boundary_status,
    "h39-primitive-analytic-remainder-multi-profile-boundary-emitted"
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_bottleneck_name,
    "h39_scalar_margin"
  );
  assert.deepEqual(
    exact.primitive_analytic_remainder_multi_profile_active_bottleneck_names,
    ["h39_scalar_margin"]
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_lambda_supremum_attained,
    false
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_J_min_boundary,
    12
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_required_scale,
    1
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_J_min_at_required_scale,
    2.75
  );
  assert.equal(
    exact
      .primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale,
    3.125
  );
  assert.equal(
    exact
      .primitive_analytic_remainder_multi_profile_scalar_polynomial_at_required_scale,
    exact.primitive_analytic_remainder_multi_profile_scalar_polynomial_constant +
      exact.primitive_analytic_remainder_multi_profile_scalar_polynomial_linear +
      exact.primitive_analytic_remainder_multi_profile_scalar_polynomial_quadratic
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_required_scale_closes,
    true
  );
  assert.deepEqual(
    exact
      .primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names,
    []
  );
  assert.ok(
    Math.abs(
      exact.primitive_analytic_remainder_multi_profile_rouche_margin_boundary -
        28 / 3
    ) < 1e-12
  );
  assert.ok(
    Math.abs(
      exact.primitive_analytic_remainder_multi_profile_lambda_supremum -
        1.9616127303245676
    ) < 1e-12
  );
  assert.ok(
    scale.primitive_remainder_profile_scale_candidate <
      exact.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.ok(
    scale.primitive_remainder_profile_scale_first_failing_upper >=
      exact.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.ok(
    Math.abs(
      scale.primitive_remainder_profile_scale_candidate -
        exact.primitive_analytic_remainder_multi_profile_lambda_supremum
    ) < 1e-9
  );
  assert.equal(
    scale.primitive_remainder_profile_scale_budget_at_candidate
      .primitive_remainder_profile_scale_safe_closes_candidate,
    true
  );
  assert.equal(
    scale.primitive_remainder_profile_scale_budget_at_first_failing_upper
      .primitive_remainder_profile_scale_safe_closes_candidate,
    false
  );
  assert.ok(scale.primitive_remainder_profile_scale_scaled_E_R_allowance > 0);
  assert.ok(
    scale.primitive_remainder_profile_scale_scaled_nu_J_loss_allowance > 0
  );
  assert.ok(scale.primitive_remainder_profile_scale_scaled_M_G_allowance > 0);
  assert.ok(scale.primitive_remainder_profile_scale_scaled_M_R_allowance > 0);
  assert.equal(
    embedded.primitive_analytic_remainder_multi_profile_boundary_status,
    exact.primitive_analytic_remainder_multi_profile_boundary_status
  );
  assert.equal(
    embedded.primitive_analytic_remainder_multi_profile_lambda_supremum,
    exact.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
  assert.equal(exact.certifies_directed_rounded_h39_polydisc_bounds, false);
  assert.equal(
    exact.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(exact.retained_branch, false);
});

test("h39 primitive analytic remainder multi-profile boundary absorbs fixed-radii L_J pressure", () => {
  const threshold =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold;
  const params = {
    radiusMultiple: 4,
    mGBound: threshold / 2,
    rootTangentNumeratorBound: 0,
    centerResidualBound: 1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 1,
    rhoX: 2,
    rX: 1,
    centerResidualRemainderProfile: 0.125,
    centerJacobianLowerRemainderProfile: 0.25,
    jacobianLipschitzRemainderProfile: 0.125,
    mGRemainderProfile: threshold / 4,
    rootTangentNumeratorRemainderProfile: 0.5,
    profileScaleUpperBound: 4,
    profileScaleTolerance: 1e-12,
  };
  const exact =
    computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate(params);
  const scale = computeH39PrimitiveRemainderProfileScaleCandidate(params);
  const embedded =
    scale.primitive_remainder_profile_scale_exact_multi_profile_boundary;

  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_boundary_status,
    "h39-primitive-analytic-remainder-multi-profile-boundary-emitted"
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_L_J_profile,
    0.125
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_J_min_profile_slope,
    0.5
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_rouche_margin_profile_slope,
    0.4375
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_J_min_boundary,
    6
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_J_min_at_required_scale,
    2.5
  );
  assert.equal(
    exact
      .primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale,
    3.0625
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_required_scale_closes,
    true
  );
  assert.deepEqual(
    exact
      .primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names,
    []
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_rouche_margin_boundary,
    8
  );
  assert.equal(
    exact.primitive_analytic_remainder_multi_profile_bottleneck_name,
    "h39_scalar_margin"
  );
  assert.ok(
    Math.abs(
      exact.primitive_analytic_remainder_multi_profile_lambda_supremum -
        1.9527167593074624
    ) < 1e-12
  );
  assert.ok(
    scale.primitive_remainder_profile_scale_candidate <
      exact.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.ok(
    scale.primitive_remainder_profile_scale_first_failing_upper >=
      exact.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.ok(
    Math.abs(
      scale.primitive_remainder_profile_scale_candidate -
        exact.primitive_analytic_remainder_multi_profile_lambda_supremum
    ) < 1e-9
  );
  assert.equal(
    embedded.primitive_analytic_remainder_multi_profile_L_J_profile,
    exact.primitive_analytic_remainder_multi_profile_L_J_profile
  );
  assert.equal(
    embedded.primitive_analytic_remainder_multi_profile_lambda_supremum,
    exact.primitive_analytic_remainder_multi_profile_lambda_supremum
  );
  assert.equal(exact.certifies_directed_rounded_h39_polydisc_bounds, false);
  assert.equal(
    exact.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound,
    false
  );
  assert.equal(exact.retained_branch, false);
});

test("h39 primitive analytic remainder multi-profile boundary reports J_min and Rouché bottlenecks", () => {
  const jMinBottleneck =
    computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate({
      radiusMultiple: 4,
      mGBound: 0,
      rootTangentNumeratorBound: 0,
      centerResidualBound: 1,
      centerJacobianLowerBound: 5,
      jacobianLipschitzBound: 1,
      rhoX: 2,
      rX: 1,
      centerJacobianLowerRemainderProfile: 0.1,
      jacobianLipschitzRemainderProfile: 10,
    });
  const roucheBottleneck =
    computeH39PrimitiveAnalyticRemainderMultiProfileBoundaryCandidate({
      radiusMultiple: 4,
      mGBound: 0,
      rootTangentNumeratorBound: 0,
      centerResidualBound: 1,
      centerJacobianLowerBound: 5,
      jacobianLipschitzBound: 1,
      rhoX: 2,
      rX: 1,
      centerResidualRemainderProfile: 10,
      jacobianLipschitzRemainderProfile: 0.1,
    });

  assert.equal(
    jMinBottleneck.primitive_analytic_remainder_multi_profile_bottleneck_name,
    "J_min"
  );
  assert.ok(
    jMinBottleneck.primitive_analytic_remainder_multi_profile_active_bottleneck_names.includes(
      "J_min"
    )
  );
  assert.ok(
    Math.abs(
      jMinBottleneck.primitive_analytic_remainder_multi_profile_J_min_boundary -
        3 / 20.1
    ) < 1e-14
  );
  assert.equal(
    jMinBottleneck.primitive_analytic_remainder_multi_profile_J_min_profile_slope,
    20.1
  );
  assert.equal(
    jMinBottleneck
      .primitive_analytic_remainder_multi_profile_required_scale_closes,
    false
  );
  assert.ok(
    jMinBottleneck
      .primitive_analytic_remainder_multi_profile_J_min_at_required_scale < 0
  );
  assert.ok(
    jMinBottleneck
      .primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names.includes(
        "J_min"
      )
  );
  assert.equal(
    roucheBottleneck.primitive_analytic_remainder_multi_profile_bottleneck_name,
    "rouche_margin"
  );
  assert.deepEqual(
    roucheBottleneck.primitive_analytic_remainder_multi_profile_active_bottleneck_names,
    ["rouche_margin"]
  );
  assert.ok(
    Math.abs(
      roucheBottleneck.primitive_analytic_remainder_multi_profile_rouche_margin_boundary -
        3.5 / 10.05
    ) < 1e-14
  );
  assert.equal(
    roucheBottleneck.primitive_analytic_remainder_multi_profile_rouche_margin_profile_slope,
    10.05
  );
  assert.equal(
    roucheBottleneck
      .primitive_analytic_remainder_multi_profile_required_scale_closes,
    false
  );
  assert.ok(
    roucheBottleneck
      .primitive_analytic_remainder_multi_profile_rouche_margin_at_required_scale <
      0
  );
  assert.ok(
    roucheBottleneck
      .primitive_analytic_remainder_multi_profile_required_scale_failed_margin_names.includes(
        "rouche_margin"
      )
  );
  assert.equal(
    jMinBottleneck.certifies_directed_rounded_h39_polydisc_bounds,
    false
  );
  assert.equal(roucheBottleneck.retained_branch, false);
});

test("h39 Rouché radius supremum computes the unattained best M_R ceiling", () => {
  const supremum = computeH39RoucheRadiusSupremumCeiling({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    rhoX: 3,
    mGBound: 1e12,
  });
  const chosenRadiusClosure = computeH39RouchePrimitiveClosure({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    rhoX: 3,
    rX: 2,
    mGBound: 1e12,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 9.4,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        rhoX: 3,
        rX: 2,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    supremum.rouche_radius_supremum_status,
    "positive-supremal-M_R-budget"
  );
  assert.equal(supremum.rouche_radius_supremum_attained, false);
  assert.equal(supremum.rouche_radius_supremum_strict_slack_required, true);
  assert.ok(supremum.rouche_radius_supremum_lower_boundary_r_X > 0);
  assert.ok(supremum.rouche_radius_supremum_lower_boundary_r_X < 0.021);
  assert.ok(supremum.rouche_radius_supremum_sigma_X > 2.979);
  assert.ok(supremum.rouche_radius_supremal_M_R_ceiling > 9.4);
  assert.ok(
    supremum.rouche_radius_supremal_M_R_ceiling >
      chosenRadiusClosure.rouche_form_admissible_M_R_ceiling
  );
  assert.equal(supremum.candidate_M_R_below_rouche_radius_supremum, true);
  assert.equal(
    supremum.candidate_M_R_margin_to_rouche_radius_supremum,
    supremum.rouche_radius_supremal_M_R_ceiling - 9.4
  );
  assert.equal(
    summary.rouche_radius_supremal_M_R_ceiling,
    supremum.rouche_radius_supremal_M_R_ceiling
  );
  assert.equal(
    summary.candidate_M_R_margin_to_rouche_radius_supremum,
    supremum.candidate_M_R_margin_to_rouche_radius_supremum
  );
  assert.equal(
    summary.rouche_radius_supremum_formula,
    "sup M_R=(nu_J-L_J*rho_X)*(rho_X-r_R^-)*((1-q)*B_D_39*rho^41/M_G-40-q/(1-q)); use r_R^-=E_R/nu_J when L_J=0"
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Rouché radius supremum handles zero-oscillation and missing graph inputs", () => {
  const zeroOscillation = computeH39RoucheRadiusSupremumCeiling({
    rootTangentNumeratorBound: 4,
    centerResidualBound: 0.2,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0,
    rhoX: 1,
    mGBound: 1e12,
  });
  assert.equal(
    zeroOscillation.rouche_radius_supremum_lower_boundary_r_X,
    0.04
  );
  assert.equal(zeroOscillation.rouche_radius_supremum_sigma_X, 0.96);
  assert.equal(zeroOscillation.candidate_M_R_below_rouche_radius_supremum, true);

  const directInputs =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 20,
        jacobianLowerBound: 4,
        sigmaX: 2,
        mGBound: 1e12,
      }
    );
  const summary =
    directInputs.root_tangent_cauchy_majorant_tail_budget_summary;
  assert.equal(summary.rouche_radius_supremum_status, "not-provided");
  assert.equal(summary.rouche_radius_supremal_M_R_ceiling, null);
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      directInputs
    ),
    []
  );
});

test("h39 Rouché radius supremum reports no ceiling when the slope budget is nonpositive", () => {
  const mGBound =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold * 2;
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 1,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        rhoX: 3,
        rX: 2,
        mGBound,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    summary.rouche_radius_supremum_status,
    "no-positive-rouche-window-M_R-budget"
  );
  assert.equal(
    summary.rouche_window_supremal_M_R_ceiling_status,
    "no-positive-rouche-window-M_R-budget"
  );
  assert.ok(summary.rouche_radius_supremum_slope_budget < 0);
  assert.equal(summary.rouche_radius_supremal_M_R_ceiling, null);
  assert.equal(
    summary.rouche_window_supremal_admissible_root_tangent_numerator_bound_M_R,
    null
  );
  assert.equal(
    summary.candidate_root_tangent_numerator_below_rouche_window_supremal_M_R_ceiling,
    null
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Rouché rho_X optimum computes the unattained best M_R ceiling", () => {
  const optimum = computeH39RoucheRhoXOptimumCeiling({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    mGBound: 1e12,
  });
  const fixedRhoX = computeH39RoucheRadiusSupremumCeiling({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    rhoX: 3,
    mGBound: 1e12,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 9.4,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;
  const expectedRhoX =
    (5 / 0.1 + optimum.rouche_rho_X_optimum_lower_boundary_r_X) / 2;
  const expectedCeiling =
    (5 - 0.1 * expectedRhoX) *
    (expectedRhoX - optimum.rouche_rho_X_optimum_lower_boundary_r_X) *
    optimum.rouche_rho_X_optimum_slope_budget;

  assert.equal(
    optimum.rouche_rho_X_optimum_status,
    "positive-rho-X-optimal-M_R-budget"
  );
  assert.equal(optimum.rouche_rho_X_optimum_attained, false);
  assert.equal(optimum.rouche_rho_X_optimum_strict_slack_required, true);
  assert.ok(
    Math.abs(optimum.rouche_rho_X_optimum_rho_X - expectedRhoX) < 1e-12
  );
  assert.ok(
    Math.abs(optimum.rouche_rho_X_optimal_M_R_ceiling - expectedCeiling) /
      expectedCeiling <
      1e-12
  );
  assert.ok(
    optimum.rouche_rho_X_optimal_M_R_ceiling >
      fixedRhoX.rouche_radius_supremal_M_R_ceiling
  );
  assert.equal(optimum.candidate_M_R_below_rouche_rho_X_optimum, true);
  assert.equal(
    summary.rouche_rho_X_optimal_M_R_ceiling,
    optimum.rouche_rho_X_optimal_M_R_ceiling
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Rouché rho_X optimum handles zero oscillation and caps", () => {
  const uncapped = computeH39RoucheRhoXOptimumCeiling({
    rootTangentNumeratorBound: 4,
    centerResidualBound: 0.2,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0,
    mGBound: 1e12,
  });
  const capped = computeH39RoucheRhoXOptimumCeiling({
    rootTangentNumeratorBound: 4,
    centerResidualBound: 0.2,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0,
    rhoXUpperBound: 1,
    mGBound: 1e12,
  });

  assert.equal(
    uncapped.rouche_rho_X_optimum_status,
    "unbounded-rho-X-optimum-with-zero-L_J"
  );
  assert.equal(uncapped.rouche_rho_X_optimal_M_R_ceiling, null);
  assert.equal(capped.rouche_rho_X_optimum_lower_boundary_r_X, 0.04);
  assert.equal(capped.rouche_rho_X_optimum_rho_X, 1);
  assert.equal(capped.rouche_rho_X_optimum_sigma_X, 0.96);
  assert.equal(capped.candidate_M_R_below_rouche_rho_X_optimum, true);
});

test("h39 Rouché rho_X optimum reports no ceiling when the slope budget is nonpositive", () => {
  const mGBound =
    computeH39RootTangentCauchyMajorantBudget().D_tail_M_G_threshold * 2;
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 1,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        mGBound,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(
    summary.rouche_rho_X_optimum_status,
    "no-positive-rouche-rho-X-M_R-budget"
  );
  assert.ok(summary.rouche_rho_X_optimum_slope_budget < 0);
  assert.equal(summary.rouche_rho_X_optimal_M_R_ceiling, null);
  assert.equal(
    summary.rouche_rho_X_optimal_admissible_root_tangent_numerator_bound_M_R,
    null
  );
  assert.equal(
    summary.candidate_root_tangent_numerator_below_rouche_rho_X_optimal_M_R_ceiling,
    null
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Rouché y-radius optimum uses the largest certified radius cap", () => {
  const optimum = computeH39RoucheYRadiusOptimumCeiling({
    radiusMultipleUpperBound: 8,
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    mGBound: 1e12,
  });
  const rhoXOptimumAtDefaultRadius = computeH39RoucheRhoXOptimumCeiling({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    mGBound: 1e12,
  });
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        radiusMultipleUpperBound: 8,
        rootTangentNumeratorBound: 9.4,
        centerResidualBound: 0.1,
        centerJacobianLowerBound: 5,
        jacobianLipschitzBound: 0.1,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;
  const slopeAtCap = computeH39RootTangentSlopeEnvelope({
    radiusMultiple: 8,
    mGBound: 1e12,
  }).maximum_admissible_xi_over_sigma_X;
  const expectedCeiling =
    optimum.rouche_y_radius_optimum_X_factor * slopeAtCap;

  assert.equal(
    optimum.rouche_y_radius_optimum_status,
    "positive-y-radius-optimal-M_R-budget"
  );
  assert.equal(optimum.rouche_y_radius_optimum_attained, false);
  assert.equal(optimum.rouche_y_radius_optimum_strict_slack_required, true);
  assert.equal(optimum.rouche_y_radius_upper_bound_s, 8);
  assert.equal(optimum.rouche_y_radius_optimum_s, 8);
  assert.ok(
    Math.abs(optimum.rouche_y_radius_optimal_M_R_ceiling - expectedCeiling) /
      expectedCeiling <
      1e-12
  );
  assert.ok(
    optimum.rouche_y_radius_optimal_M_R_ceiling >
      rhoXOptimumAtDefaultRadius.rouche_rho_X_optimal_M_R_ceiling
  );
  assert.equal(optimum.candidate_M_R_below_rouche_y_radius_optimum, true);
  assert.equal(
    summary.rouche_y_radius_optimal_M_R_ceiling,
    optimum.rouche_y_radius_optimal_M_R_ceiling
  );
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Rouché y-radius optimum reports uncapped and low-cap limits honestly", () => {
  const uncapped = computeH39RoucheYRadiusOptimumCeiling({
    rootTangentNumeratorBound: 9.4,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    mGBound: 1e12,
  });
  const lowCap = computeH39RoucheYRadiusOptimumCeiling({
    radiusMultipleUpperBound: 1.01,
    rootTangentNumeratorBound: 1,
    centerResidualBound: 0.1,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0.1,
    mGBound: 1e12,
  });

  assert.equal(
    uncapped.rouche_y_radius_optimum_status,
    "unbounded-y-radius-optimum-under-fixed-M_G-bound"
  );
  assert.equal(uncapped.rouche_y_radius_optimal_M_R_ceiling, null);
  assert.equal(
    lowCap.rouche_y_radius_optimum_status,
    "no-positive-rouche-y-radius-M_R-budget"
  );
  assert.ok(lowCap.rouche_y_radius_optimum_slope_budget < 0);
  assert.equal(lowCap.rouche_y_radius_optimal_M_R_ceiling, null);
});

test("h39 Rouché y-radius optimum handles zero oscillation only with an X cap", () => {
  const uncappedX = computeH39RoucheYRadiusOptimumCeiling({
    radiusMultipleUpperBound: 8,
    rootTangentNumeratorBound: 4,
    centerResidualBound: 0.2,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0,
    mGBound: 1e12,
  });
  const cappedX = computeH39RoucheYRadiusOptimumCeiling({
    radiusMultipleUpperBound: 8,
    rootTangentNumeratorBound: 4,
    centerResidualBound: 0.2,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0,
    rhoXUpperBound: 1,
    mGBound: 1e12,
  });

  assert.equal(
    uncappedX.rouche_y_radius_optimum_status,
    "unbounded-rho-X-optimum-with-zero-L_J"
  );
  assert.equal(uncappedX.rouche_y_radius_optimal_M_R_ceiling, null);
  assert.equal(cappedX.rouche_y_radius_optimum_lower_boundary_r_X, 0.04);
  assert.equal(cappedX.rouche_y_radius_optimum_rho_X, 1);
  assert.equal(cappedX.rouche_y_radius_optimum_sigma_X, 0.96);
  assert.equal(cappedX.candidate_M_R_below_rouche_y_radius_optimum, true);
});

test("h39 Rouché primitive fields stay empty for direct J_min and sigma_X inputs", () => {
  const packet =
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      {
        rootTangentNumeratorBound: 20,
        jacobianLowerBound: 4,
        sigmaX: 2,
        mGBound: 1e12,
      }
    );
  const summary = packet.root_tangent_cauchy_majorant_tail_budget_summary;

  assert.equal(summary.root_tangent_input_status, "derived-from-R43-J-sigma");
  assert.equal(summary.candidate_primitive_polydisc_certificate_closes, true);
  assert.equal(summary.rouche_primitive_h39_report_status, "not-provided");
  assert.equal(summary.rouche_rho_X_optimum_status, "not-provided");
  assert.equal(summary.rouche_rho_X_optimal_M_R_ceiling, null);
  assert.equal(summary.rouche_y_radius_optimum_status, "not-provided");
  assert.equal(summary.rouche_y_radius_optimal_M_R_ceiling, null);
  assert.equal(
    summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim,
    null
  );
  assert.equal(summary.rouche_form_admissible_M_R_ceiling, null);
  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    ),
    []
  );
});

test("h39 Cauchy-majorant budget rejects inconsistent direct and Rouché graph inputs", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
        {
          rootTangentNumeratorBound: 9.4,
          centerResidualBound: 0.1,
          centerJacobianLowerBound: 5,
          jacobianLipschitzBound: 0.1,
          rhoX: 3,
          rX: 2,
          jacobianLowerBound: 4,
        }
      ),
    /jacobianLowerBound must match the Rouché-derived J_min/
  );
});

test("h39 Rouché graph radius window handles the zero-oscillation edge case", () => {
  const radiusWindow = computeH39RootGraphRoucheRadiusWindow({
    centerResidualBound: 0.2,
    centerJacobianLowerBound: 5,
    jacobianLipschitzBound: 0,
    rhoX: 1,
  });

  assert.equal(radiusWindow.rouche_radius_window_nonempty, true);
  assert.equal(radiusWindow.rouche_radius_lower_boundary, 0.04);
  assert.equal(radiusWindow.rouche_radius_upper_boundary, null);
  assert.equal(radiusWindow.rouche_best_sigma_X_supremum, 0.96);
});

test("h39 Cauchy-majorant budget rejects incomplete root-tangent derived inputs", () => {
  assert.throws(
    () =>
      computeH39RootTangentDerivedSlopeRatio({
        rootTangentNumeratorBound: 20,
        sigmaX: 2,
      }),
    /rootTangentNumeratorBound and jacobianLowerBound are required together/
  );
  assert.throws(
    () =>
      computeH39RootTangentDerivedSlopeRatio({
        rootTangentNumeratorBound: 20,
        jacobianLowerBound: 4,
        rhoX: 1,
        rX: 1,
      }),
    /rhoX must be greater than rX/
  );
});

test("h39 Cauchy-majorant budget rejects inconsistent explicit and derived slope ratios", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
        {
          xiOverSigmaX: 10,
          rootTangentNumeratorBound: 20,
          jacobianLowerBound: 4,
          sigmaX: 2,
        }
      ),
    /xiOverSigmaX must match the derived root-tangent Xi_\*\/sigma_X/
  );
});

test("h39 Cauchy-majorant budget validator rejects speed-band fields and overclaims", () => {
  const packet = clone(
    buildOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget()
  );
  packet.root_tangent_cauchy_majorant_tail_budget_parameters.speed_band =
    "forbidden";
  packet.artifact_claim.proves_h39_majorant_radius_threshold_monotonicity =
    false;
  packet.artifact_claim.proves_h39_majorant_D_tail_active_bottleneck = false;
  packet.artifact_claim.certifies_directed_rounded_h39_polydisc_M_G_bound =
    true;
  packet.artifact_claim.certifies_directed_rounded_h39_polydisc_Xi_bound =
    true;
  packet.artifact_claim.certifies_directed_rounded_first_y_GD_continuous_successor_tail_bound =
    true;
  packet.artifact_claim.retained_branch = true;
  packet.root_tangent_cauchy_majorant_tail_budget_summary.candidate_rouche_primitive_h39_closure_ratio_Lambda_39_prim =
    0.5;
  packet.root_tangent_cauchy_majorant_tail_budget_summary.rouche_form_admissible_M_R_ceiling =
    10;
  packet.root_tangent_cauchy_majorant_tail_budget_summary.rouche_radius_supremal_M_R_ceiling =
    10;
  packet.root_tangent_cauchy_majorant_tail_budget_summary.rouche_rho_X_optimal_M_R_ceiling =
    10;
  packet.root_tangent_cauchy_majorant_tail_budget_summary.rouche_y_radius_optimal_M_R_ceiling =
    10;

  const errors =
    validateOctahedralFoldAwareCrossBinaryTheta3minusSpeedDependentFoldPairFirstYGdRootTangentCauchyMajorantTailBudget(
      packet
    );

  assert.ok(
    errors.includes(
      "h39 Cauchy-majorant budget parameters must not contain speed-band fields"
    )
  );
  assert.ok(
    errors.includes(
      "artifact claim must reduce the h39 tail to a majorant budget without overclaiming polydisc, continuous-tail, scaled-remainder, I1, or retention closure"
    )
  );
  assert.ok(
    errors.includes(
      "h39 Rouché primitive closure fields must match the seven-input closure ratio and M_R ceiling"
    )
  );
  assert.ok(
    errors.includes(
      "h39 Rouché radius supremum fields must match the unattained radius-window M_R ceiling"
    )
  );
  assert.ok(
    errors.includes(
      "h39 Rouché rho_X optimum fields must match the admissible rho_X and r_X optimum M_R ceiling"
    )
  );
  assert.ok(
    errors.includes(
      "h39 Rouché y-radius optimum fields must match the admissible y-radius cap optimum M_R ceiling"
    )
  );
});

test("h39 Cauchy-majorant budget CLI writes and validates artifact JSON", () => {
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "theta3minus-h39-cauchy-majorant-budget-")
  );
  const outPath = path.join(tmpDir, "artifact.json");

  execFileSync(process.execPath, [
    scriptPath(),
    "--xi-over-sigma-x",
    "2",
    "--m-g-bound",
    "1e12",
    "--root-tangent-numerator-bound",
    "9.4",
    "--center-residual-bound",
    "0.1",
    "--center-jacobian-lower-bound",
    "5",
    "--jacobian-lipschitz-bound",
    "0.1",
    "--rho-x",
    "3",
    "--r-x",
    "2",
    "--out",
    outPath,
  ]);
  const validateOutput = JSON.parse(
    execFileSync(process.execPath, [scriptPath(), "--validate", outPath], {
      encoding: "utf8",
    })
  );

  assert.equal(validateOutput.valid, true);
  const packet = JSON.parse(fs.readFileSync(outPath, "utf8"));
  assert.equal(packet.result.theory_status, EXPECTED_STATUS);
  assert.equal(
    packet.root_tangent_cauchy_majorant_tail_budget_summary.xi_over_sigma_X,
    2
  );
  assert.equal(
    packet.root_tangent_cauchy_majorant_tail_budget_summary
      .root_graph_lift_status,
    "rouche-certified"
  );
  assert.equal(
    packet.root_tangent_cauchy_majorant_tail_budget_summary
      .candidate_closes_h39_majorant_budget,
    true
  );
  assert.equal(
    packet.root_tangent_cauchy_majorant_tail_budget_summary
      .derived_xi_over_sigma_X,
    2
  );
  assert.equal(
    packet.root_tangent_cauchy_majorant_tail_budget_summary
      .candidate_tail_closure_scalar_margins_positive,
    true
  );
  assert.ok(
    packet.root_tangent_cauchy_majorant_tail_budget_summary
      .maximum_admissible_xi_over_sigma_X > 10
  );
});
