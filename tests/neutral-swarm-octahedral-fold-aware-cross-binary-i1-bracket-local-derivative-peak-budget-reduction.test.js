import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA,
  buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction,
  validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction,
} from "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs";

let cachedArtifact = null;
const EXPECTED_SUMMARY_STATUS =
  "i1-f1-bracket-local-directed-rounded-source-root-interval-theta-localized-taylor-intervalization-certified";
const EXPECTED_RESULT_THEORY_STATUS =
  "source-atlas-aware-i1-f1-bracket-local-directed-rounded-taylor-derivative-variation-certified";
const EXPECTED_SOURCE_ROOT_COUNT = 6;
const SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS = 16;

function progressLogger(label) {
  if (process.env.AAA_TEST_HEARTBEAT === "0") {
    return null;
  }
  let lastPrintedAt = 0;
  return (progress) => {
    const now = Date.now();
    const completed = progress.stage === "peak-budget-parent-complete";
    const first = progress.parent_row_index === 1;
    const last = progress.parent_row_index === progress.parent_row_count;
    const intervalElapsed = now - lastPrintedAt >= 30_000;
    const rowBoundary =
      completed && progress.parent_row_index % 8 === 0;
    if (!(first || last || intervalElapsed || rowBoundary)) {
      return;
    }
    lastPrintedAt = now;
    console.error(
      `# ${label}: ${progress.parent_row_index}/${progress.parent_row_count} parent rows, ${progress.completed_subcell_row_count} subcells, ${(progress.elapsed_ms / 1000).toFixed(1)}s`
    );
  };
}

function artifact() {
  if (!cachedArtifact) {
    cachedArtifact =
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          rootSubdivisions: 5000,
          endpointSpeedSampleCount: 9,
          zeroBranchSpeedSampleCount: 9,
          derivativeThetaSampleCount: 48,
          thetaCellCount: 16,
          speedCellCount: 8,
          parentStencilSamplesPerAxis: 5,
          refinementSamplesPerSubcellAxis: 3,
          endpointPadding: 1e-5,
          machinePadding: 1e-9,
          bisectionTolerance: 1e-12,
          progressCallback: progressLogger("I1.f1 peak-budget reduction"),
        }
      );
  }
  return cachedArtifact;
}

function near(actual, expected, tolerance = 5e-12) {
  assert.ok(
    Math.abs(Number(actual) - expected) <= tolerance,
    `${actual} not within ${tolerance} of ${expected}`
  );
}

test("I1.f1 bracket-local derivative peak-budget reduction validates", () => {
  const packet = artifact();

  assert.deepEqual(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      packet
    ),
    []
  );
  assert.equal(
    packet.schema,
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA
  );
  assert.equal(
    packet.packet_id,
    "octahedral_fold_aware_cross_binary_i1_bracket_local_derivative_peak_budget_reduction"
  );
  assert.equal(packet.promotion_status, "priority-only");
});

test("I1.f1 bracket-local derivative peak-budget reduction consumes the sampled predecessor and closes the directed-rounded successor", () => {
  const packet = artifact();

  assert.equal(packet.variation_certificate_check.valid, true);
  assert.equal(
    packet.variation_certificate_check
      .certifies_I1_f1_bracket_local_derivative_variation_stencil_certificate,
    true
  );
  assert.equal(
    packet.variation_certificate_check
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    false
  );
  assert.equal(
    packet.variation_certificate_check.first_successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    true
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.f1.full-interval-zero-isolation-critical-exhaustion-quadrature-required"
  );
});

test("I1.f1 bracket-local derivative peak-budget reduction imposes no fixed speed window", () => {
  const packet = artifact();

  assert.equal(
    packet.peak_budget_parameters.speed_constraint,
    "none; uses the certified positive speed-ratio zero enclosure only"
  );
  assert.deepEqual(packet.peak_budget_parameters.speed_ratio_enclosure, [
    3.02156,
    3.02157,
  ]);
  assert.equal(packet.peak_budget_parameters.speed_band, undefined);
  assert.equal(packet.peak_budget_parameters.speed_window, undefined);
  assert.equal(packet.peak_budget_parameters.speed_min, undefined);
  assert.equal(packet.peak_budget_parameters.speed_max, undefined);
  assert.equal(
    packet.peak_budget_parameters
      .direct_interval_theta_localization_subdivision_count,
    2
  );
  assert.equal(
    packet.peak_budget_parameters
      .direct_interval_speed_ratio_localization_subdivision_count,
    1
  );
  assert.equal(
    packet.peak_budget_parameters.direct_interval_parameter_localized_tiles_per_root,
    2
  );
  assert.equal(
    packet.peak_budget_parameters.theta_localized_taylor_subdivision_count,
    2
  );
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 bracket-local derivative peak-budget reduction records finite subcell budgets", () => {
  const packet = artifact();
  const summary = packet.peak_budget_summary;
  const thetaLocalizationSubdivisions =
    packet.peak_budget_parameters
      .direct_interval_theta_localization_subdivision_count;
  const speedLocalizationSubdivisions =
    packet.peak_budget_parameters
      .direct_interval_speed_ratio_localization_subdivision_count;
  const parameterLocalizedTilesPerRoot =
    thetaLocalizationSubdivisions * speedLocalizationSubdivisions;
  const expectedDirectIntervalSourceEvaluations =
    summary.subcell_row_count *
    EXPECTED_SOURCE_ROOT_COUNT *
    SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS *
    parameterLocalizedTilesPerRoot;
  const expectedParameterLocalizedRootSheetContractions =
    summary.subcell_row_count *
    EXPECTED_SOURCE_ROOT_COUNT *
    parameterLocalizedTilesPerRoot;

  assert.equal(
    summary.peak_budget_row_id,
    "I1.f1.bracket-local-derivative-peak-budget-reduction"
  );
  assert.equal(
    summary.successor_row,
    "I1.f1.full-interval-zero-isolation-critical-exhaustion-quadrature-required"
  );
  assert.equal(summary.subcell_row_count, 2048);
  assert.equal(summary.certified_subcell_row_count, 2048);
  assert.equal(summary.total_refined_derivative_sample_count, 10368);
  near(summary.minimum_parent_peak_budget_mu, 0.00000378761869309, 5e-16);
  near(
    summary.minimum_peak_budget_after_refined_replay,
    0.00000378761869309,
    5e-16
  );
  near(
    summary.minimum_effective_peak_overshoot_ceiling_after_refined_replay,
    0.00000378761869309,
    5e-16
  );
  near(summary.maximum_refined_derivative, -0.060388174983, 5e-13);
  near(summary.minimum_refined_derivative_clearance, 0.060388174983, 5e-13);
  assert.equal(summary.maximum_refined_excess_over_vertices, 0);
  assert.equal(summary.maximum_parent_refined_excess_over_coarse_stencil, 0);
  near(summary.minimum_balanced_pure_curvature_bound, 287.476602603, 5e-9);
  near(
    summary.maximum_sampled_bilinear_curvature_remainder,
    3.58713895559e-7,
    5e-19
  );
  near(
    summary.maximum_sampled_bilinear_curvature_remainder_ratio,
    0.0632306995182,
    5e-13
  );
  assert.equal(summary.sampled_bilinear_curvature_feasibility_subcell_count, 2048);
  assert.equal(summary.sampled_analytic_jet_curvature_witness_subcell_count, 2048);
  assert.ok(
    Number(
      summary.maximum_sampled_analytic_jet_bilinear_curvature_remainder_ratio
    ) < 1
  );
  assert.ok(
    Number(
      summary.maximum_sampled_analytic_jet_derivative_formula_residual_abs
    ) < 1e-7
  );
  assert.ok(
    Number(
      summary.maximum_sampled_analytic_jet_root_equation_residual_abs
    ) < 1e-9
  );
  assert.equal(summary.sampled_analytic_jet_envelope_budget_subcell_count, 2048);
  assert.ok(
    Number(
      summary.maximum_sampled_curvature_estimator_envelope_remainder_ratio
    ) < 1
  );
  assert.ok(
    Number(summary.minimum_sampled_curvature_estimator_envelope_headroom) > 0
  );
  assert.ok(
    Number(
      summary.minimum_uniform_sampled_curvature_estimator_envelope_inflation_factor_less_than
    ) > 1
  );
  assert.ok(
    Number(
      summary.maximum_sampled_analytic_vs_second_difference_remainder_gap
    ) >= 0
  );
  assert.ok(
    Number(
      summary.maximum_sampled_analytic_to_second_difference_remainder_ratio
    ) > 0
  );
  assert.equal(
    summary.sampled_fourth_jet_curvature_transport_witness_subcell_count,
    2048
  );
  assert.ok(
    Number(summary.maximum_sampled_fourth_jet_transport_remainder_ratio) < 1
  );
  assert.ok(Number(summary.minimum_sampled_fourth_jet_transport_headroom) > 0);
  assert.ok(
    Number(summary.maximum_sampled_fourth_jet_theta_transport_radius) > 0
  );
  assert.ok(
    Number(summary.maximum_sampled_fourth_jet_speed_transport_radius) > 0
  );
  assert.ok(
    Number(
      summary.minimum_uniform_sampled_fourth_jet_transport_inflation_factor_less_than
    ) > 1
  );
  assert.equal(
    summary.sampled_fifth_jet_curvature_gradient_transport_witness_subcell_count,
    2048
  );
  assert.ok(
    Number(summary.maximum_sampled_fifth_jet_transport_remainder_ratio) < 1
  );
  assert.ok(Number(summary.minimum_sampled_fifth_jet_transport_headroom) > 0);
  assert.ok(
    Number(
      summary.maximum_sampled_fifth_jet_theta_gradient_transport_radius
    ) > 0
  );
  assert.ok(
    Number(
      summary.maximum_sampled_fifth_jet_speed_gradient_transport_radius
    ) > 0
  );
  assert.ok(
    Number(
      summary.minimum_uniform_sampled_fifth_jet_transport_inflation_factor_less_than
    ) > 1
  );
  assert.equal(
    summary.sampled_theta_localized_taylor_upper_envelope_attempt_subcell_count,
    2048
  );
  assert.equal(
    summary.sampled_theta_localized_taylor_upper_envelope_witness_subcell_count,
    2048
  );
  assert.equal(
    summary.sampled_theta_localized_taylor_upper_envelope_open_subcell_count,
    0
  );
  assert.ok(
    Number(
      summary.maximum_sampled_theta_localized_taylor_upper_envelope_remainder_ratio
    ) < 1
  );
  assert.ok(
    Number(
      summary.minimum_sampled_theta_localized_taylor_upper_envelope_headroom
    ) > 0
  );
  assert.equal(
    Number(summary.maximum_sampled_theta_localized_taylor_upper_envelope_overrun),
    0
  );
  assert.ok(
    Number(
      summary.minimum_direct_to_sampled_theta_localized_taylor_remainder_ratio_reduction_factor
    ) > 1
  );
  assert.match(
    summary.sampled_theta_localized_taylor_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.equal(
    summary.directed_rounded_theta_localized_taylor_intervalization_attempt_subcell_count,
    2048
  );
  assert.equal(
    summary.directed_rounded_theta_localized_taylor_intervalization_passed_subcell_count,
    2048
  );
  assert.equal(
    summary.directed_rounded_theta_localized_taylor_intervalization_open_subcell_count,
    0
  );
  assert.equal(
    summary.directed_rounded_theta_localized_taylor_intervalization_nonfinite_subcell_count,
    0
  );
  assert.equal(
    summary.directed_rounded_theta_localized_taylor_intervalization_nonfinite_tile_count,
    0
  );
  near(
    summary.maximum_directed_rounded_theta_localized_taylor_intervalization_remainder_ratio,
    0.0164397437213,
    5e-10
  );
  near(
    summary.minimum_directed_rounded_theta_localized_taylor_intervalization_headroom,
    0.00000372535118309,
    1e-11
  );
  assert.equal(
    Number(
      summary.maximum_directed_rounded_theta_localized_taylor_intervalization_overrun
    ),
    0
  );
  assert.ok(
    Number(
      summary.maximum_directed_rounded_theta_localized_taylor_interval_theta_second_partial_bound
    ) > 0
  );
  assert.ok(
    Number(
      summary.maximum_directed_rounded_theta_localized_taylor_interval_speed_second_partial_bound
    ) > 0
  );
  assert.ok(
    Number(
      summary.maximum_interval_taylor_minus_sampled_theta_localized_taylor_upper_bound
    ) > 0
  );
  assert.match(
    summary.directed_rounded_theta_localized_taylor_intervalization_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.equal(summary.sampled_curvature_inflation_headroom_subcell_count, 2048);
  assert.equal(summary.curvature_interval_jet_target_subcell_count, 2048);
  assert.equal(summary.sampled_curvature_headroom_reference_factor, 10);
  near(
    summary.minimum_uniform_sampled_curvature_inflation_factor_less_than,
    15.8151025945,
    5e-11
  );
  near(
    summary.minimum_sampled_curvature_headroom_margin_after_reference_factor,
    0.00000139268513329,
    5e-18
  );
  assert.equal(
    summary.sampled_bilinear_curvature_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.4.peak-budget.3.0"
  );
  assert.equal(
    summary.sampled_curvature_inflation_factor_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.4.peak-budget.3.0"
  );
  assert.equal(
    summary.sampled_curvature_inflation_margin_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.3.0"
  );
  near(summary.minimum_sampled_abs_F_delta, 0.686789509138, 5e-13);
  near(summary.minimum_sampled_root_tube_abs_F_delta, 0.686789509138, 5e-13);
  near(summary.minimum_sampled_root_tube_positive_delta, 1.28454542829, 5e-12);
  near(summary.minimum_sampled_root_tube_separation, 1.28117968261, 5e-12);
  near(summary.maximum_sampled_root_branch_delta_width, 0.000775623934, 5e-13);
  assert.equal(
    summary.sampled_root_tube_regularity_feasibility_subcell_count,
    2048
  );
  assert.equal(
    summary.sampled_root_tube_abs_F_delta_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.15.7.peak-budget.3.3"
  );
  assert.equal(
    summary.sampled_root_tube_separation_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary.finite_interval_root_tube_certificate_target_subcell_count,
    2048
  );
  assert.equal(summary.total_retained_root_tube_target_count, 12288);
  assert.equal(summary.total_complement_slab_target_count, 20480);
  near(
    summary.minimum_finite_root_tube_target_padding_radius,
    0.108489314201,
    5e-13
  );
  near(
    summary.minimum_finite_root_tube_target_complement_width,
    0.325467942606,
    5e-13
  );
  assert.equal(
    summary.finite_root_tube_padding_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0"
  );
  assert.equal(
    summary.finite_root_tube_complement_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0"
  );
  assert.equal(
    summary.sampled_finite_root_tube_sign_margin_certificate_subcell_count,
    2048
  );
  assert.equal(summary.total_sampled_tube_endpoint_sign_pair_count, 110592);
  assert.equal(summary.total_sampled_tube_endpoint_F_sample_count, 221184);
  assert.equal(summary.total_sampled_tube_F_delta_sample_count, 331776);
  assert.equal(summary.total_sampled_complement_F_sample_count, 1658880);
  near(summary.minimum_sampled_tube_endpoint_abs_F, 0.243939101042, 5e-13);
  near(
    summary.minimum_sampled_tube_endpoint_sign_product_margin,
    0.0781604324357,
    5e-13
  );
  near(summary.minimum_sampled_tube_F_delta_abs, 0.530629746881, 5e-13);
  near(summary.minimum_sampled_complement_abs_F, 0.243939101042, 5e-13);
  assert.equal(
    summary.sampled_tube_endpoint_abs_F_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary.sampled_tube_endpoint_sign_product_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0"
  );
  assert.equal(
    summary.sampled_tube_F_delta_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary.sampled_complement_abs_F_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary.machine_padded_source_root_interval_certificate_subcell_count,
    2048
  );
  assert.equal(
    summary.total_machine_padded_tube_endpoint_sign_pair_interval_count,
    12288
  );
  assert.equal(summary.total_machine_padded_tube_endpoint_F_interval_count, 24576);
  assert.equal(summary.total_machine_padded_tube_F_delta_interval_count, 196608);
  assert.equal(summary.total_machine_padded_complement_F_interval_count, 655360);
  near(
    summary.minimum_machine_padded_tube_endpoint_interval_abs_F,
    0.243939100042,
    5e-13
  );
  near(
    summary.minimum_machine_padded_tube_endpoint_interval_sign_product_margin,
    0.0780705608725,
    5e-13
  );
  near(
    summary.minimum_machine_padded_tube_interval_F_delta_abs,
    0.521855012428,
    5e-13
  );
  near(
    summary.minimum_machine_padded_complement_interval_abs_F,
    0.23413485329,
    5e-13
  );
  assert.equal(
    summary.machine_padded_tube_endpoint_interval_abs_F_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary
      .machine_padded_tube_endpoint_interval_sign_product_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.15.0.peak-budget.3.0"
  );
  assert.equal(
    summary.machine_padded_tube_interval_F_delta_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary.machine_padded_complement_interval_abs_F_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.3"
  );
  assert.equal(
    summary.directed_rounded_source_root_interval_certificate_subcell_count,
    2048
  );
  assert.equal(
    summary.total_directed_rounded_tube_endpoint_sign_pair_interval_count,
    12288
  );
  assert.equal(
    summary.total_directed_rounded_tube_endpoint_F_interval_count,
    24576
  );
  assert.equal(summary.total_directed_rounded_tube_F_delta_interval_count, 196608);
  assert.equal(summary.total_directed_rounded_complement_F_interval_count, 655360);
  assert.ok(
    Number(summary.minimum_directed_rounded_tube_endpoint_interval_abs_F) > 0
  );
  assert.ok(
    Number(
      summary.minimum_directed_rounded_tube_endpoint_interval_sign_product_margin
    ) > 0
  );
  assert.ok(Number(summary.minimum_directed_rounded_tube_interval_F_delta_abs) > 0);
  assert.ok(
    Number(summary.minimum_directed_rounded_complement_interval_abs_F) > 0
  );
  assert.equal(
    summary.direct_interval_derivative_envelope_attempt_subcell_count,
    2048
  );
  assert.equal(
    summary.direct_interval_derivative_envelope_passed_subcell_count,
    0
  );
  assert.equal(
    summary.direct_interval_derivative_envelope_open_subcell_count,
    2048
  );
  assert.equal(
    summary.total_direct_interval_derivative_protected_tube_subdivision_count,
    expectedDirectIntervalSourceEvaluations
  );
  assert.equal(
    summary.total_direct_interval_derivative_source_evaluation_count,
    expectedDirectIntervalSourceEvaluations
  );
  assert.equal(
    summary.fixed_sign_F_delta_root_sheet_contraction_subcell_count,
    2048
  );
  assert.equal(
    summary.fixed_sign_F_delta_root_sheet_contraction_passed_subcell_count,
    2048
  );
  assert.equal(
    summary.total_fixed_sign_F_delta_root_sheet_contraction_count,
    12288
  );
  assert.ok(
    Number(summary.maximum_fixed_sign_F_delta_protected_root_interval_width) > 0
  );
  assert.ok(
    Number(summary.maximum_fixed_sign_F_delta_contracted_root_interval_width) > 0
  );
  assert.ok(
    Number(summary.maximum_fixed_sign_F_delta_contracted_root_interval_width) <
      Number(summary.maximum_fixed_sign_F_delta_protected_root_interval_width)
  );
  assert.ok(
    Number(summary.minimum_fixed_sign_F_delta_root_sheet_width_reduction_factor) >
      1
  );
  assert.match(
    summary.fixed_sign_F_delta_contraction_width_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.match(
    summary.fixed_sign_F_delta_contraction_reduction_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.equal(
    summary.parameter_localized_direct_interval_envelope_subcell_count,
    summary.subcell_row_count
  );
  assert.equal(
    summary.parameter_localized_root_sheet_contraction_passed_subcell_count,
    summary.subcell_row_count
  );
  assert.equal(
    summary.total_parameter_localized_root_sheet_contraction_count,
    expectedParameterLocalizedRootSheetContractions
  );
  assert.ok(
    Number(summary.maximum_parameter_localized_contracted_root_interval_width) > 0
  );
  assert.ok(
    Number(summary.minimum_parameter_localized_root_sheet_width_reduction_factor) >
      1
  );
  assert.match(
    summary.parameter_localized_contraction_width_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.match(
    summary.parameter_localized_contraction_reduction_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.ok(
    Number(summary.minimum_direct_interval_derivative_F_delta_abs_clearance) > 0
  );
  assert.ok(
    Number(summary.maximum_direct_interval_derivative_upper_bound_overrun) > 0
  );
  assert.ok(
    Number(summary.minimum_direct_interval_derivative_upper_bound_headroom) < 0
  );
  assert.ok(
    Number(summary.maximum_direct_interval_derivative_remainder_ratio) > 1
  );
  assert.ok(
    Number(summary.maximum_direct_interval_derivative_root_interval_width) > 0
  );
  assert.match(
    summary.direct_interval_derivative_ratio_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.match(
    summary.direct_interval_derivative_overrun_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.match(
    summary.direct_interval_derivative_width_bottleneck_subcell_row_id,
    /^I1\.f1\.bracket-derivative-mesh\./
  );
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  assert.equal(
    summary.bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.0"
  );
  assert.equal(
    summary.status,
    EXPECTED_SUMMARY_STATUS
  );
});

test("I1.f1 bracket-local derivative peak-budget reduction exposes backend-ready subcell data", () => {
  const packet = artifact();
  const firstRow = packet.peak_budget_rows[0];
  const thetaLocalizationSubdivisions =
    packet.peak_budget_parameters
      .direct_interval_theta_localization_subdivision_count;
  const speedLocalizationSubdivisions =
    packet.peak_budget_parameters
      .direct_interval_speed_ratio_localization_subdivision_count;
  const parameterLocalizedTilesPerRoot =
    thetaLocalizationSubdivisions * speedLocalizationSubdivisions;
  const thetaLocalizedTaylorSubdivisions =
    packet.peak_budget_parameters.theta_localized_taylor_subdivision_count;
  const expectedDirectIntervalSourceEvaluations =
    EXPECTED_SOURCE_ROOT_COUNT *
    SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS *
    parameterLocalizedTilesPerRoot;
  const expectedParameterLocalizedRootSheetContractions =
    EXPECTED_SOURCE_ROOT_COUNT * parameterLocalizedTilesPerRoot;

  assert.match(
    packet.backend_input_formula_sheet.source_root_equation,
    /delta\^2\/nu\^2-2\+sin\(phi\)\+kappa\*sin\(delta\)=0/
  );
  assert.equal(
    packet.backend_input_formula_sheet.implicit_root_derivative,
    "delta_prime=-2*cos(phi)/F_delta"
  );
  assert.equal(
    packet.backend_input_formula_sheet.implicit_root_first_partial,
    "for x in {theta,nu}: delta_x=-F_x/F_delta"
  );
  assert.match(
    packet.backend_input_formula_sheet.implicit_root_pure_second_partial,
    /delta_xx=-\(F_xx\+2\*F_x_delta\*delta_x\+F_delta_delta\*delta_x\^2\)\/F_delta/
  );
  assert.deepEqual(
    packet.backend_input_formula_sheet
      .required_root_sheet_multi_indices_for_curvature_target,
    [
      "delta_{theta}",
      "delta_{theta theta}",
      "delta_{theta theta theta}",
      "delta_{nu}",
      "delta_{nu nu}",
      "delta_{theta nu}",
      "delta_{theta nu nu}",
    ]
  );
  assert.deepEqual(
    packet.backend_input_formula_sheet
      .required_root_sheet_multi_indices_for_fourth_jet_transport_target,
    [
      "delta_{theta theta theta theta}",
      "delta_{theta theta theta nu}",
      "delta_{theta theta nu nu}",
      "delta_{theta nu nu nu}",
    ]
  );
  assert.deepEqual(
    packet.backend_input_formula_sheet
      .required_root_sheet_multi_indices_for_fifth_jet_gradient_transport_target,
    [
      "delta_{theta theta theta theta theta}",
      "delta_{theta theta theta theta nu}",
      "delta_{theta theta theta nu nu}",
      "delta_{theta theta nu nu nu}",
      "delta_{theta nu nu nu nu}",
    ]
  );
  assert.match(
    packet.backend_input_formula_sheet.required_cross_binary_source_derivatives,
    /partial_theta\^3/
  );
  assert.match(
    packet.backend_input_formula_sheet.required_cross_binary_source_derivatives,
    /partial_theta\^4/
  );
  assert.match(
    packet.backend_input_formula_sheet.required_cross_binary_source_derivatives,
    /partial_theta\^5/
  );
  assert.match(
    packet.backend_input_formula_sheet.source_root_theta_partials,
    /F_theta=2\*cos\(phi\)/
  );
  assert.match(
    packet.backend_input_formula_sheet.source_root_speed_partials,
    /F_nu=-2\*delta\^2\/nu\^3/
  );
  assert.match(
    packet.backend_input_formula_sheet.cross_binary_combination,
    /s_\{\+,\+\}\(theta\)-s_\{\+,\+\}\(theta\+Q\)\+s_\{-,\+\}\(theta\)-s_\{-,\+\}\(theta\+Q\)/
  );
  assert.match(
    packet.backend_input_formula_sheet.bilinear_vertex_envelope,
    /sup_Q g <= vertex_max_derivative/
  );
  assert.match(
    packet.backend_input_formula_sheet.direct_interval_derivative_envelope_route,
    /source-derivative interval upper bound/
  );
  assert.match(
    packet.backend_input_formula_sheet.monotone_root_sheet_contractor,
    /contract/
  );
  assert.match(
    packet.backend_input_formula_sheet.root_tube_interval_certificate,
    /exactly one C\^1 implicit root sheet/
  );
  assert.match(
    packet.backend_input_formula_sheet.curvature_interval_jet_route,
    /implicit root-sheet jet recurrence/
  );
  assert.match(
    packet.backend_input_formula_sheet.sampled_fourth_jet_curvature_transport_route,
    /nearest-sample covering radii/
  );
  assert.match(
    packet.backend_input_formula_sheet
      .sampled_fifth_jet_curvature_gradient_transport_route,
    /transport those gradients/
  );
  near(firstRow.theta_interval[0], 0.124678831905, 5e-13);
  near(firstRow.theta_interval[1], 0.125003490321, 5e-13);
  near(firstRow.speed_ratio_interval[0], 3.02156, 5e-13);
  near(firstRow.speed_ratio_interval[1], 3.0215603125, 5e-13);
  near(firstRow.theta_width, 0.0003246584165, 5e-13);
  near(firstRow.speed_ratio_width, 0.0000003125, 5e-16);
  assert.equal(firstRow.backend_input_inequality.object, "sup_Q f_cross_prime");
  assert.equal(
    firstRow.backend_input_inequality.required_overshoot_bound_less_than,
    firstRow.effective_peak_overshoot_ceiling_after_refined_replay
  );
  assert.equal(firstRow.backend_input_inequality.protects_allowance, true);
  assert.equal(
    firstRow.backend_input_inequality.protects_derivative_negativity,
    true
  );
  assert.equal(
    firstRow.bilinear_curvature_sufficient_condition.function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.bilinear_curvature_sufficient_condition
      .required_error_bound_less_than,
    firstRow.effective_peak_overshoot_ceiling_after_refined_replay
  );
  const thetaScale =
    (Number(firstRow.theta_width) * Number(firstRow.theta_width)) / 8;
  const speedScale =
    (Number(firstRow.speed_ratio_width) *
      Number(firstRow.speed_ratio_width)) /
    8;
  near(
    firstRow.bilinear_curvature_sufficient_condition
      .balanced_pure_curvature_bound,
    Number(firstRow.effective_peak_overshoot_ceiling_after_refined_replay) /
      (thetaScale + speedScale),
    5e-9
  );
  assert.equal(
    firstRow.sampled_pure_curvature_probe.probe_type,
    "sampled-pure-second-difference-bilinear-remainder"
  );
  assert.equal(
    firstRow.sampled_pure_curvature_probe
      .certifies_interval_second_partial_bounds,
    false
  );
  near(
    firstRow.sampled_pure_curvature_probe.theta_second_partial_sample_max_abs,
    17.7732602784,
    5e-10
  );
  near(
    firstRow.sampled_pure_curvature_probe.speed_second_partial_sample_max_abs,
    23.00339473,
    5e-8
  );
  near(
    firstRow.sampled_pure_curvature_probe.sampled_bilinear_remainder,
    2.34169844126e-7,
    5e-19
  );
  near(
    firstRow.sampled_pure_curvature_probe
      .sampled_bilinear_remainder_ratio_to_required_bound,
    0.0618216443293,
    5e-13
  );
  assert.equal(
    firstRow.sampled_pure_curvature_probe.status,
    "sampled-bilinear-curvature-feasibility-passed"
  );
  assert.equal(
    firstRow.sampled_analytic_jet_curvature_witness.witness_type,
    "sampled-analytic-jet-curvature-witness"
  );
  assert.equal(
    firstRow.sampled_analytic_jet_curvature_witness.target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.sampled_analytic_jet_curvature_witness
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.sampled_analytic_jet_curvature_witness
      .certifies_sampled_analytic_jet_curvature_witness,
    true
  );
  assert.equal(
    firstRow.sampled_analytic_jet_curvature_witness.analytic_jet_sample_count,
    9
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_curvature_witness
        .theta_second_partial_analytic_jet_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_curvature_witness
        .speed_second_partial_analytic_jet_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_curvature_witness
        .sampled_analytic_jet_remainder_ratio_to_required_bound
    ) < 1
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_curvature_witness
        .maximum_derivative_formula_residual_abs
    ) < 1e-7
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_curvature_witness
        .maximum_root_equation_residual_abs
    ) < 1e-9
  );
  assert.equal(
    firstRow.sampled_analytic_jet_curvature_witness.status,
    "sampled-analytic-jet-curvature-witness-passed"
  );
  assert.equal(
    firstRow.sampled_analytic_jet_envelope_budget.budget_type,
    "sampled-analytic-jet-envelope-budget"
  );
  assert.equal(
    firstRow.sampled_analytic_jet_envelope_budget.target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.sampled_analytic_jet_envelope_budget
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.sampled_analytic_jet_envelope_budget
      .certifies_sampled_analytic_jet_envelope_budget,
    true
  );
  assert.equal(
    firstRow.sampled_analytic_jet_envelope_budget.required_error_bound_less_than,
    firstRow.effective_peak_overshoot_ceiling_after_refined_replay
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_envelope_budget
        .sampled_curvature_estimator_envelope_remainder
    ) +
      1e-14 >=
      Number(firstRow.sampled_pure_curvature_probe.sampled_bilinear_remainder)
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_envelope_budget
        .sampled_curvature_estimator_envelope_remainder
    ) +
      1e-14 >=
      Number(
        firstRow.sampled_analytic_jet_curvature_witness
          .sampled_analytic_jet_bilinear_remainder
      )
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_envelope_budget
        .sampled_curvature_estimator_envelope_ratio_to_required_bound
    ) < 1
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_envelope_budget.remaining_envelope_headroom
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_analytic_jet_envelope_budget
        .balanced_analytic_jet_envelope_radius_less_than
    ) > 0
  );
  assert.equal(
    firstRow.sampled_analytic_jet_envelope_budget.status,
    "sampled-analytic-jet-envelope-budget-passed"
  );
  assert.equal(
    firstRow.sampled_fourth_jet_curvature_transport_witness.witness_type,
    "sampled-fourth-jet-curvature-transport-witness"
  );
  assert.equal(
    firstRow.sampled_fourth_jet_curvature_transport_witness.target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.sampled_fourth_jet_curvature_transport_witness
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.sampled_fourth_jet_curvature_transport_witness
      .certifies_sampled_fourth_jet_curvature_transport_witness,
    true
  );
  assert.ok(
    Number(
      firstRow.sampled_fourth_jet_curvature_transport_witness
        .theta_second_partial_theta_gradient_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fourth_jet_curvature_transport_witness
        .theta_second_partial_speed_gradient_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fourth_jet_curvature_transport_witness
        .speed_second_partial_theta_gradient_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fourth_jet_curvature_transport_witness
        .speed_second_partial_speed_gradient_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fourth_jet_curvature_transport_witness
        .sampled_fourth_jet_transport_remainder_ratio_to_required_bound
    ) < 1
  );
  assert.ok(
    Number(
      firstRow.sampled_fourth_jet_curvature_transport_witness
        .remaining_transport_headroom
    ) > 0
  );
  assert.equal(
    firstRow.sampled_fourth_jet_curvature_transport_witness.status,
    "sampled-fourth-jet-curvature-transport-witness-passed"
  );
  assert.equal(
    firstRow.sampled_fifth_jet_curvature_gradient_transport_witness.witness_type,
    "sampled-fifth-jet-curvature-gradient-transport-witness"
  );
  assert.equal(
    firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
      .target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
      .certifies_sampled_fifth_jet_curvature_gradient_transport_witness,
    true
  );
  assert.ok(
    Number(
      firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
        .theta_second_partial_theta_theta_hessian_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
        .speed_second_partial_speed_speed_hessian_sample_max_abs
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
        .sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound
    ) < 1
  );
  assert.ok(
    Number(
      firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
        .remaining_fifth_jet_transport_headroom
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
        .fifth_jet_transported_theta_second_partial_sample_max_abs
    ) >=
      Number(
        firstRow.sampled_fourth_jet_curvature_transport_witness
          .transported_theta_second_partial_sample_max_abs
      )
  );
  assert.ok(
    Number(
      firstRow.sampled_fifth_jet_curvature_gradient_transport_witness
        .fifth_jet_transported_speed_second_partial_sample_max_abs
    ) >=
      Number(
        firstRow.sampled_fourth_jet_curvature_transport_witness
          .transported_speed_second_partial_sample_max_abs
      )
  );
  assert.equal(
    firstRow.sampled_fifth_jet_curvature_gradient_transport_witness.status,
    "sampled-fifth-jet-curvature-gradient-transport-witness-passed"
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness.witness_type,
    "sampled-theta-localized-taylor-upper-envelope-witness"
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness.attempt_type,
    "sampled-theta-localized-taylor-upper-envelope-attempt"
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness
      .target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness
      .certifies_sampled_theta_localized_taylor_upper_envelope_witness,
    true
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness
      .certifies_directed_rounded_taylor_upper_envelope,
    false
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness
      .certifies_interval_derivative_enclosure,
    false
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness
      .theta_localized_taylor_subdivision_count,
    2
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness
      .theta_localized_taylor_tile_count,
    2
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness.tile_rows
      .length,
    2
  );
  assert.ok(
    Number(
      firstRow.sampled_theta_localized_taylor_upper_envelope_witness
        .sampled_theta_localized_taylor_remainder_ratio_to_required_bound
    ) < 1
  );
  assert.ok(
    Number(
      firstRow.sampled_theta_localized_taylor_upper_envelope_witness
        .sampled_theta_localized_taylor_upper_bound_headroom
    ) > 0
  );
  assert.equal(
    Number(
      firstRow.sampled_theta_localized_taylor_upper_envelope_witness
        .sampled_theta_localized_taylor_upper_bound_overrun
    ),
    0
  );
  assert.ok(
    Number(
      firstRow.sampled_theta_localized_taylor_upper_envelope_witness
        .direct_to_sampled_taylor_remainder_ratio_reduction_factor
    ) > 1
  );
  assert.equal(
    firstRow.sampled_theta_localized_taylor_upper_envelope_witness.status,
    "sampled-theta-localized-taylor-upper-envelope-witness-passed"
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .attempt_type,
    "directed-rounded-theta-localized-taylor-intervalization-attempt"
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .certifies_directed_rounded_taylor_upper_envelope,
    true
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .certifies_interval_second_partial_curvature_enclosure,
    true
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .certifies_interval_derivative_enclosure,
    false
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .theta_localized_taylor_tile_count,
    2
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .nonfinite_interval_taylor_tile_count,
    0
  );
  assert.ok(
    Number(
      firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
        .directed_rounded_interval_taylor_remainder_ratio_to_required_bound
    ) < 1
  );
  assert.ok(
    Number(
      firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
        .directed_rounded_interval_taylor_upper_bound_headroom
    ) > 0
  );
  assert.equal(
    Number(
      firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
        .directed_rounded_interval_taylor_upper_bound_overrun
    ),
    0
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .tile_rows.length,
    2
  );
  assert.ok(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt.tile_rows.every(
      (tileRow) =>
        tileRow.status ===
          "directed-rounded-interval-taylor-upper-envelope-passed" &&
        Number(
          tileRow.directed_rounded_interval_taylor_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(tileRow.directed_rounded_interval_taylor_upper_bound_headroom) >
          0 &&
        tileRow.vertex_derivative_rows.length === 4
    )
  );
  assert.equal(
    firstRow.directed_rounded_theta_localized_taylor_intervalization_attempt
      .status,
    "directed-rounded-interval-taylor-upper-envelope-passed"
  );
  assert.equal(
    firstRow.sampled_curvature_inflation_headroom_certificate.certificate_type,
    "sampled-curvature-inflation-headroom-certificate"
  );
  assert.equal(
    firstRow.sampled_curvature_inflation_headroom_certificate
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.sampled_curvature_inflation_headroom_certificate
      .certifies_sampled_curvature_inflation_headroom,
    true
  );
  assert.equal(
    firstRow.sampled_curvature_inflation_headroom_certificate
      .reference_uniform_inflation_factor,
    10
  );
  near(
    firstRow.sampled_curvature_inflation_headroom_certificate
      .maximum_uniform_sampled_curvature_inflation_factor_less_than,
    16.1755645753,
    5e-11
  );
  near(
    firstRow.sampled_curvature_inflation_headroom_certificate
      .margin_after_reference_uniform_inflation_factor,
    0.00000144613099399,
    5e-18
  );
  assert.equal(
    firstRow.sampled_curvature_inflation_headroom_certificate.status,
    "sampled-curvature-inflation-headroom-passed"
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.target_type,
    "curvature-interval-jet-target"
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .certifies_curvature_interval_jet_target,
    true
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .certifies_interval_derivative_enclosure,
    false
  );
  assert.match(
    firstRow.curvature_interval_jet_target.root_sheet_identity,
    /F_\{kappa,nu\}/
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.implicit_root_first_partial,
    "for x in {theta,nu}: delta_x=-F_x/F_delta"
  );
  assert.match(
    firstRow.curvature_interval_jet_target.implicit_root_pure_second_partial,
    /delta_xx=-\(F_xx\+2\*F_x_delta\*delta_x\+F_delta_delta\*delta_x\^2\)\/F_delta/
  );
  assert.deepEqual(
    firstRow.curvature_interval_jet_target
      .required_root_sheet_multi_indices,
    [
      "delta_{theta}",
      "delta_{theta theta}",
      "delta_{theta theta theta}",
      "delta_{nu}",
      "delta_{nu nu}",
      "delta_{theta nu}",
      "delta_{theta nu nu}",
    ]
  );
  assert.deepEqual(
    firstRow.curvature_interval_jet_target
      .required_root_sheet_multi_indices_for_fifth_jet_gradient_transport,
    [
      "delta_{theta theta theta theta theta}",
      "delta_{theta theta theta theta nu}",
      "delta_{theta theta theta nu nu}",
      "delta_{theta theta nu nu nu}",
      "delta_{theta nu nu nu nu}",
    ]
  );
  assert.match(
    firstRow.curvature_interval_jet_target.derivative_order_census
      .theta_curvature,
    /delta_\{theta theta theta\}/
  );
  assert.match(
    firstRow.curvature_interval_jet_target.derivative_order_census
      .speed_curvature,
    /delta_\{theta nu nu\}/
  );
  assert.match(
    firstRow.curvature_interval_jet_target.derivative_order_census
      .fifth_jet_curvature_gradient_transport,
    /partial_theta\^5/
  );
  assert.deepEqual(
    firstRow.curvature_interval_jet_target.required_interval_jet_objects,
    [
      "source-root sheet jets delta(theta,nu) on every protected tube",
      "interval evaluation of source contribution derivative s_prime_{kappa,sigma}",
      "cross-binary interval jet for g=f_cross_prime",
      "pure curvature enclosures M_theta_theta and M_nu_nu for g",
    ]
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .consumes_finite_interval_root_tube_certificate_target_status,
    "finite-interval-root-tube-certificate-target-emitted"
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .consumes_machine_padded_source_root_interval_certificate_status,
    "machine-padded-source-root-interval-certificate-passed"
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .requires_directed_rounded_source_root_certificate,
    true
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.required_error_bound_less_than,
    firstRow.effective_peak_overshoot_ceiling_after_refined_replay
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.theta_second_partial_coefficient,
    firstRow.bilinear_curvature_sufficient_condition
      .theta_second_partial_coefficient
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.speed_second_partial_coefficient,
    firstRow.bilinear_curvature_sufficient_condition
      .speed_second_partial_coefficient
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.sampled_reference_remainder,
    firstRow.sampled_pure_curvature_probe.sampled_bilinear_remainder
  );
  assert.equal(
    firstRow.curvature_interval_jet_target
      .maximum_uniform_sampled_curvature_inflation_factor_less_than,
    firstRow.sampled_curvature_inflation_headroom_certificate
      .maximum_uniform_sampled_curvature_inflation_factor_less_than
  );
  assert.match(
    firstRow.curvature_interval_jet_target.curvature_acceptance_inequality,
    /\(h_theta\^2\/8\)M_theta_theta/
  );
  assert.equal(
    firstRow.curvature_interval_jet_target.status,
    "curvature-interval-jet-target-emitted"
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe.probe_type,
    "sampled-root-tube-regularity-budget"
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe.certifies_interval_root_isolation,
    false
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe
      .certifies_interval_root_tube_isolation,
    false
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe
      .certifies_interval_root_sheet_continuation,
    false
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe
      .certifies_interval_F_delta_lower_bound,
    false
  );
  assert.deepEqual(
    firstRow.sampled_root_tube_regularity_probe.root_count_signatures,
    ["1,3,1,1"]
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe.root_count_signature_preserved,
    true
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe.all_F_delta_signs_preserved,
    true
  );
  near(
    firstRow.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta,
    0.712949999342,
    5e-13
  );
  near(
    firstRow.sampled_root_tube_regularity_probe.minimum_sampled_positive_delta,
    1.28454542829,
    5e-12
  );
  near(
    firstRow.sampled_root_tube_regularity_probe
      .minimum_sampled_root_tube_separation,
    1.28118560251,
    5e-12
  );
  near(
    firstRow.sampled_root_tube_regularity_probe
      .maximum_sampled_branch_delta_width,
    0.00069886013,
    5e-13
  );
  assert.equal(
    firstRow.sampled_root_tube_regularity_probe.status,
    "sampled-root-tube-regularity-feasibility-passed"
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target.target_type,
    "finite-interval-root-tube-certificate-target"
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target
      .certifies_interval_root_tube_isolation,
    false
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target
      .certifies_interval_root_sheet_continuation,
    false
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target
      .certifies_interval_F_delta_lower_bound,
    false
  );
  assert.deepEqual(
    firstRow.finite_interval_root_tube_certificate_target.source_delta_domain,
    [1e-9, 6.04312065522]
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target.retained_tube_count,
    6
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target.complement_slab_count,
    10
  );
  near(
    firstRow.finite_interval_root_tube_certificate_target
      .minimum_tube_padding_radius,
    0.110790218616,
    5e-13
  );
  near(
    firstRow.finite_interval_root_tube_certificate_target
      .minimum_complement_slab_width,
    0.332370655846,
    5e-13
  );
  assert.match(
    firstRow.finite_interval_root_tube_certificate_target.interval_implication,
    /sampled root signature lifts to an interval root-tube isolation/
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target.term_target_rows[1]
      .protected_tubes.length,
    3
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target.term_target_rows[1]
      .complement_slabs.length,
    4
  );
  assert.equal(
    firstRow.finite_interval_root_tube_certificate_target.status,
    "finite-interval-root-tube-certificate-target-emitted"
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate.certificate_type,
    "sampled-finite-root-tube-sign-margin-certificate"
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .certifies_interval_root_tube_isolation,
    false
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .certifies_interval_root_sheet_continuation,
    false
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .certifies_interval_F_delta_lower_bound,
    false
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .certifies_interval_complement_exclusion,
    false
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .parameter_sample_count,
    9
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .tube_F_delta_samples_per_parameter,
    3
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .complement_delta_samples_per_slab,
    9
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .sampled_tube_endpoint_sign_pair_count,
    54
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .sampled_tube_endpoint_F_sample_count,
    108
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .sampled_tube_F_delta_sample_count,
    162
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .sampled_complement_F_sample_count,
    810
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .all_sampled_endpoint_signs_opposite,
    true
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .all_sampled_tube_F_delta_signs_match_target,
    true
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .all_sampled_complement_signs_nonzero,
    true
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .all_sampled_complement_signs_stable,
    true
  );
  near(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .minimum_sampled_tube_endpoint_abs_F,
    0.243940809153,
    5e-13
  );
  near(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .minimum_sampled_tube_endpoint_sign_product_margin,
    0.0826425110429,
    5e-13
  );
  near(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .minimum_sampled_tube_abs_F_delta,
    0.530631297629,
    5e-13
  );
  near(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .minimum_sampled_complement_abs_F,
    0.243940809153,
    5e-13
  );
  assert.deepEqual(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .term_certificate_rows[1].protected_tubes[1]
      .sampled_endpoint_sign_pairs,
    ["+-"]
  );
  assert.deepEqual(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .term_certificate_rows[1].protected_tubes[1].sampled_F_delta_signs,
    ["-"]
  );
  assert.deepEqual(
    firstRow.sampled_finite_root_tube_sign_margin_certificate
      .term_certificate_rows[1].complement_slabs[1].sampled_complement_signs,
    ["+"]
  );
  assert.equal(
    firstRow.sampled_finite_root_tube_sign_margin_certificate.status,
    "sampled-finite-root-tube-sign-margin-certificate-passed"
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate.certificate_type,
    "machine-padded-source-root-interval-certificate"
  );
  near(
    firstRow.machine_padded_source_root_interval_certificate.interval_padding,
    1e-9,
    1e-20
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_machine_padded_interval_source_root_tube_isolation,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_machine_padded_interval_source_root_sheet_continuation,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_machine_padded_interval_F_delta_lower_bound,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_machine_padded_interval_complement_exclusion,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_interval_root_tube_isolation,
    false
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_interval_root_sheet_continuation,
    false
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_interval_F_delta_lower_bound,
    false
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_interval_complement_exclusion,
    false
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .tube_F_delta_subdivision_count,
    16
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .complement_subdivision_count,
    32
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .tube_endpoint_sign_pair_interval_count,
    6
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .tube_endpoint_F_interval_count,
    12
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .tube_F_delta_interval_count,
    96
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .complement_F_interval_count,
    320
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .all_tube_endpoint_intervals_opposite,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .all_tube_F_delta_intervals_match_target,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .all_complement_intervals_exclude_zero,
    true
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate
      .all_complement_interval_signs_stable,
    true
  );
  near(
    firstRow.machine_padded_source_root_interval_certificate
      .minimum_tube_endpoint_interval_abs_F,
    0.243940808153,
    5e-13
  );
  near(
    firstRow.machine_padded_source_root_interval_certificate
      .minimum_tube_endpoint_interval_sign_product_margin,
    0.0825451253432,
    5e-13
  );
  near(
    firstRow.machine_padded_source_root_interval_certificate
      .minimum_tube_interval_abs_F_delta,
    0.52185646639,
    5e-13
  );
  near(
    firstRow.machine_padded_source_root_interval_certificate
      .minimum_complement_interval_abs_F,
    0.234136438697,
    5e-13
  );
  assert.deepEqual(
    firstRow.machine_padded_source_root_interval_certificate
      .term_certificate_rows[1].protected_tubes[1].endpoint_left_sign,
    "+"
  );
  assert.deepEqual(
    firstRow.machine_padded_source_root_interval_certificate
      .term_certificate_rows[1].protected_tubes[1].endpoint_right_sign,
    "-"
  );
  assert.deepEqual(
    firstRow.machine_padded_source_root_interval_certificate
      .term_certificate_rows[1].protected_tubes[1]
      .F_delta_subdivision_summary.signs,
    ["-"]
  );
  assert.deepEqual(
    firstRow.machine_padded_source_root_interval_certificate
      .term_certificate_rows[1].complement_slabs[1]
      .complement_subdivision_summary.signs,
    ["+"]
  );
  assert.equal(
    firstRow.machine_padded_source_root_interval_certificate.status,
    "machine-padded-source-root-interval-certificate-passed"
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate.certificate_type,
    "directed-rounded-source-root-interval-certificate"
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate.interval_rounding,
    "ieee-754-nextafter-outward"
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_directed_rounded_source_root_interval_certificate,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_directed_rounded_interval_source_root_tube_isolation,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_directed_rounded_interval_source_root_sheet_continuation,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_directed_rounded_interval_F_delta_lower_bound,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_directed_rounded_interval_complement_exclusion,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_interval_root_tube_isolation,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_interval_root_sheet_continuation,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_interval_F_delta_lower_bound,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_interval_complement_exclusion,
    true
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate
      .certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.ok(
    Number(
      firstRow.directed_rounded_source_root_interval_certificate
        .minimum_tube_endpoint_interval_abs_F
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.directed_rounded_source_root_interval_certificate
        .minimum_tube_interval_abs_F_delta
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.directed_rounded_source_root_interval_certificate
        .minimum_complement_interval_abs_F
    ) > 0
  );
  assert.deepEqual(
    firstRow.directed_rounded_source_root_interval_certificate
      .term_certificate_rows[1].protected_tubes[1].endpoint_left_sign,
    "+"
  );
  assert.deepEqual(
    firstRow.directed_rounded_source_root_interval_certificate
      .term_certificate_rows[1].protected_tubes[1].endpoint_right_sign,
    "-"
  );
  assert.deepEqual(
    firstRow.directed_rounded_source_root_interval_certificate
      .term_certificate_rows[1].protected_tubes[1]
      .F_delta_subdivision_summary.signs,
    ["-"]
  );
  assert.deepEqual(
    firstRow.directed_rounded_source_root_interval_certificate
      .term_certificate_rows[1].complement_slabs[1]
      .complement_subdivision_summary.signs,
    ["+"]
  );
  assert.equal(
    firstRow.directed_rounded_source_root_interval_certificate.status,
    "directed-rounded-source-root-interval-certificate-passed"
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt.attempt_type,
    "direct-interval-derivative-envelope-attempt"
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt.target_function,
    "g=f_cross_prime"
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .consumes_directed_rounded_source_root_interval_certificate_status,
    "directed-rounded-source-root-interval-certificate-passed"
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .certifies_interval_derivative_enclosure,
    false
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    false
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .protected_tube_subdivision_count,
    expectedDirectIntervalSourceEvaluations
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .source_derivative_interval_evaluation_count,
    expectedDirectIntervalSourceEvaluations
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .uses_monotone_root_sheet_contractor,
    true
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .emits_fixed_sign_F_delta_root_sheet_contractions,
    true
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .all_root_sheet_contractions_passed,
    true
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .total_root_sheet_contraction_count,
    6
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .uses_parameter_localized_direct_interval_envelope,
    true
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .theta_localization_subdivision_count,
    thetaLocalizationSubdivisions
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .speed_ratio_localization_subdivision_count,
    speedLocalizationSubdivisions
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .localized_parameter_tile_count,
    expectedParameterLocalizedRootSheetContractions
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .all_parameter_localized_root_sheet_contractions_passed,
    true
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .total_parameter_localized_root_sheet_contraction_count,
    expectedParameterLocalizedRootSheetContractions
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .maximum_parameter_localized_contracted_delta_width
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .minimum_parameter_localized_root_sheet_width_reduction_factor
    ) > 1
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .maximum_contracted_delta_width
    ) <
      Number(
        firstRow.direct_interval_derivative_envelope_attempt
          .maximum_protected_delta_width
      )
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .minimum_root_sheet_width_reduction_factor
    ) > 1
  );
  const firstContraction =
    firstRow.direct_interval_derivative_envelope_attempt.term_rows[0]
      .root_rows[0].root_sheet_contraction;
  assert.equal(
    firstContraction.contraction_type,
    "fixed-sign-F-delta-monotone-root-sheet-contraction"
  );
  assert.equal(
    firstContraction.certifies_fixed_sign_F_delta_root_sheet_contraction,
    true
  );
  assert.equal(firstContraction.endpoint_orientation_passed, true);
  assert.equal(firstContraction.F_delta_subdivision_count, 16);
  assert.ok(Number(firstContraction.contracted_to_original_width_ratio) < 1);
  const firstLocalizedRoot =
    firstRow.direct_interval_derivative_envelope_attempt.term_rows[0]
      .root_rows[0];
  assert.equal(firstLocalizedRoot.uses_parameter_localized_root_sheet_contractor, true);
  assert.equal(
    firstLocalizedRoot.localized_parameter_tile_count,
    parameterLocalizedTilesPerRoot
  );
  assert.equal(
    firstLocalizedRoot.localized_root_sheet_contraction_count,
    parameterLocalizedTilesPerRoot
  );
  assert.equal(
    firstLocalizedRoot.all_localized_root_sheet_contractions_passed,
    true
  );
  assert.ok(
    Number(firstLocalizedRoot.maximum_localized_contracted_delta_width) > 0
  );
  assert.ok(
    Number(firstLocalizedRoot.minimum_localized_root_sheet_width_reduction_factor) >
      1
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .all_F_delta_subdivision_signs_match_expected,
    true
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt.term_rows.length,
    4
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt.term_rows.reduce(
      (sum, termRow) => sum + termRow.root_rows.length,
      0
    ),
    6
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .direct_interval_derivative_enclosure.length,
    2
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .direct_interval_derivative_upper_bound,
    firstRow.direct_interval_derivative_envelope_attempt
      .direct_interval_derivative_enclosure[1]
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt.vertex_max_derivative,
    firstRow.vertex_max_derivative
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt
      .required_overshoot_bound_less_than,
    firstRow.effective_peak_overshoot_ceiling_after_refined_replay
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .minimum_F_delta_abs_clearance
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .direct_interval_upper_bound_overrun
    ) > 0
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .direct_interval_remainder_ratio_to_required_bound
    ) > 1
  );
  assert.ok(
    Number(
      firstRow.direct_interval_derivative_envelope_attempt
        .maximum_root_derivative_interval_width
    ) > 0
  );
  assert.equal(
    firstRow.direct_interval_derivative_envelope_attempt.status,
    "direct-interval-derivative-envelope-open"
  );
});

test("I1.f1 bracket-local derivative peak-budget rows stay positive and finite", () => {
  const packet = artifact();
  const rows = packet.peak_budget_rows;
  const thetaLocalizationSubdivisions =
    packet.peak_budget_parameters
      .direct_interval_theta_localization_subdivision_count;
  const speedLocalizationSubdivisions =
    packet.peak_budget_parameters
      .direct_interval_speed_ratio_localization_subdivision_count;
  const parameterLocalizedTilesPerRoot =
    thetaLocalizationSubdivisions * speedLocalizationSubdivisions;
  const thetaLocalizedTaylorSubdivisions =
    packet.peak_budget_parameters.theta_localized_taylor_subdivision_count;
  const expectedDirectIntervalSourceEvaluations =
    EXPECTED_SOURCE_ROOT_COUNT *
    SOURCE_INTERVAL_F_DELTA_SUBDIVISIONS *
    parameterLocalizedTilesPerRoot;
  const expectedParameterLocalizedRootSheetContractions =
    EXPECTED_SOURCE_ROOT_COUNT * parameterLocalizedTilesPerRoot;

  assert.equal(rows.length, 2048);
  assert.equal(
    rows.every(
      (row) =>
        row.status ===
          "i1-f1-bracket-local-derivative-peak-budget-subcell-certified" &&
        row.source_root_count_preserved === true &&
        row.source_root_counts.length === 1 &&
        row.source_root_counts[0] === 6 &&
        row.term_root_count_signatures.length === 1 &&
        row.term_root_count_signatures[0] === "1,3,1,1" &&
        row.theta_interval.length === 2 &&
        row.speed_ratio_interval.length === 2 &&
        Number(row.theta_width) > 0 &&
        Number(row.speed_ratio_width) > 0 &&
        row.backend_input_inequality.object === "sup_Q f_cross_prime" &&
        row.backend_input_inequality.required_overshoot_bound_less_than ===
          row.effective_peak_overshoot_ceiling_after_refined_replay &&
        row.bilinear_curvature_sufficient_condition.function ===
          "g=f_cross_prime" &&
        Number(
          row.bilinear_curvature_sufficient_condition
            .balanced_pure_curvature_bound
        ) > 0 &&
        row.sampled_pure_curvature_probe.status ===
          "sampled-bilinear-curvature-feasibility-passed" &&
        row.sampled_pure_curvature_probe
          .certifies_interval_second_partial_bounds === false &&
        row.sampled_analytic_jet_curvature_witness.status ===
          "sampled-analytic-jet-curvature-witness-passed" &&
        row.sampled_analytic_jet_curvature_witness.witness_type ===
          "sampled-analytic-jet-curvature-witness" &&
        row.sampled_analytic_jet_curvature_witness.target_function ===
          "g=f_cross_prime" &&
        row.sampled_analytic_jet_curvature_witness
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.sampled_analytic_jet_curvature_witness
          .certifies_sampled_analytic_jet_curvature_witness === true &&
        row.sampled_analytic_jet_curvature_witness
          .analytic_jet_sample_count > 0 &&
        Number(
          row.sampled_analytic_jet_curvature_witness
            .sampled_analytic_jet_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(
          row.sampled_analytic_jet_curvature_witness
            .maximum_derivative_formula_residual_abs
        ) < 1e-7 &&
        Number(
          row.sampled_analytic_jet_curvature_witness
            .maximum_root_equation_residual_abs
        ) < 1e-9 &&
        row.sampled_analytic_jet_envelope_budget.status ===
          "sampled-analytic-jet-envelope-budget-passed" &&
        row.sampled_analytic_jet_envelope_budget.budget_type ===
          "sampled-analytic-jet-envelope-budget" &&
        row.sampled_analytic_jet_envelope_budget
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.sampled_analytic_jet_envelope_budget
          .certifies_sampled_analytic_jet_envelope_budget === true &&
        row.sampled_analytic_jet_envelope_budget
          .required_error_bound_less_than ===
          row.effective_peak_overshoot_ceiling_after_refined_replay &&
        Number(
          row.sampled_analytic_jet_envelope_budget
            .sampled_curvature_estimator_envelope_ratio_to_required_bound
        ) < 1 &&
        Number(
          row.sampled_analytic_jet_envelope_budget.remaining_envelope_headroom
        ) > 0 &&
        Number(
          row.sampled_analytic_jet_envelope_budget
            .balanced_analytic_jet_envelope_radius_less_than
        ) > 0 &&
        row.sampled_fourth_jet_curvature_transport_witness.status ===
          "sampled-fourth-jet-curvature-transport-witness-passed" &&
        row.sampled_fourth_jet_curvature_transport_witness.witness_type ===
          "sampled-fourth-jet-curvature-transport-witness" &&
        row.sampled_fourth_jet_curvature_transport_witness.target_function ===
          "g=f_cross_prime" &&
        row.sampled_fourth_jet_curvature_transport_witness
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.sampled_fourth_jet_curvature_transport_witness
          .certifies_sampled_fourth_jet_curvature_transport_witness === true &&
        Number(
          row.sampled_fourth_jet_curvature_transport_witness
            .sampled_fourth_jet_transport_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(
          row.sampled_fourth_jet_curvature_transport_witness
            .remaining_transport_headroom
        ) > 0 &&
        row.sampled_fifth_jet_curvature_gradient_transport_witness.status ===
          "sampled-fifth-jet-curvature-gradient-transport-witness-passed" &&
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .witness_type ===
          "sampled-fifth-jet-curvature-gradient-transport-witness" &&
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .target_function === "g=f_cross_prime" &&
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.sampled_fifth_jet_curvature_gradient_transport_witness
          .certifies_sampled_fifth_jet_curvature_gradient_transport_witness ===
          true &&
        Number(
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            .sampled_fifth_jet_curvature_gradient_transport_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            .remaining_fifth_jet_transport_headroom
        ) > 0 &&
        Number(
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            .theta_second_partial_theta_theta_hessian_sample_max_abs
        ) > 0 &&
        Number(
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            .speed_second_partial_speed_speed_hessian_sample_max_abs
        ) > 0 &&
        Number(
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            .fifth_jet_transported_theta_second_partial_sample_max_abs
        ) >=
          Number(
            row.sampled_fourth_jet_curvature_transport_witness
              .transported_theta_second_partial_sample_max_abs
          ) &&
        Number(
          row.sampled_fifth_jet_curvature_gradient_transport_witness
            .fifth_jet_transported_speed_second_partial_sample_max_abs
        ) >=
          Number(
            row.sampled_fourth_jet_curvature_transport_witness
              .transported_speed_second_partial_sample_max_abs
          ) &&
        row.sampled_theta_localized_taylor_upper_envelope_witness.status ===
          "sampled-theta-localized-taylor-upper-envelope-witness-passed" &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .witness_type ===
          "sampled-theta-localized-taylor-upper-envelope-witness" &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .target_function === "g=f_cross_prime" &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .certifies_sampled_theta_localized_taylor_upper_envelope_witness ===
          true &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .certifies_directed_rounded_taylor_upper_envelope === false &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .certifies_interval_derivative_enclosure === false &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
          false &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .theta_localized_taylor_subdivision_count ===
          thetaLocalizedTaylorSubdivisions &&
        row.sampled_theta_localized_taylor_upper_envelope_witness
          .theta_localized_taylor_tile_count ===
          thetaLocalizedTaylorSubdivisions &&
        row.sampled_theta_localized_taylor_upper_envelope_witness.tile_rows
          .length === thetaLocalizedTaylorSubdivisions &&
        row.sampled_theta_localized_taylor_upper_envelope_witness.tile_rows.every(
          (tileRow) =>
            Number(tileRow.sampled_taylor_upper_bound_headroom) > 0 &&
            Number(tileRow.sampled_taylor_remainder_ratio_to_required_bound) <
              1
        ) &&
        Number(
          row.sampled_theta_localized_taylor_upper_envelope_witness
            .sampled_theta_localized_taylor_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(
          row.sampled_theta_localized_taylor_upper_envelope_witness
            .sampled_theta_localized_taylor_upper_bound_headroom
        ) > 0 &&
        Number(
          row.sampled_theta_localized_taylor_upper_envelope_witness
            .sampled_theta_localized_taylor_upper_bound_overrun
        ) === 0 &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .status === "directed-rounded-interval-taylor-upper-envelope-passed" &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .attempt_type ===
          "directed-rounded-theta-localized-taylor-intervalization-attempt" &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .target_function === "g=f_cross_prime" &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .certifies_directed_rounded_taylor_upper_envelope === true &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .certifies_interval_second_partial_curvature_enclosure === true &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .certifies_interval_derivative_enclosure === false &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .theta_localized_taylor_tile_count ===
          thetaLocalizedTaylorSubdivisions &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .nonfinite_interval_taylor_tile_count === 0 &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .all_interval_jet_curvature_bounds_finite === true &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .all_interval_root_sheet_contractions_passed === true &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt
          .all_interval_F_delta_signs_match_expected === true &&
        Number(
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .directed_rounded_interval_taylor_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .directed_rounded_interval_taylor_upper_bound_headroom
        ) > 0 &&
        Number(
          row.directed_rounded_theta_localized_taylor_intervalization_attempt
            .directed_rounded_interval_taylor_upper_bound_overrun
        ) === 0 &&
        row.directed_rounded_theta_localized_taylor_intervalization_attempt.tile_rows.every(
          (tileRow) =>
            tileRow.status ===
              "directed-rounded-interval-taylor-upper-envelope-passed" &&
            tileRow.vertex_derivative_rows.length === 4 &&
            Number(tileRow.theta_second_partial_bound) > 0 &&
            Number(tileRow.speed_second_partial_bound) > 0 &&
            Number(
              tileRow.directed_rounded_interval_taylor_remainder_ratio_to_required_bound
            ) < 1
        ) &&
        row.sampled_curvature_inflation_headroom_certificate.status ===
          "sampled-curvature-inflation-headroom-passed" &&
        row.sampled_curvature_inflation_headroom_certificate
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.sampled_curvature_inflation_headroom_certificate
          .certifies_sampled_curvature_inflation_headroom === true &&
        row.sampled_curvature_inflation_headroom_certificate
          .reference_uniform_inflation_factor === 10 &&
        Number(
          row.sampled_curvature_inflation_headroom_certificate
            .maximum_uniform_sampled_curvature_inflation_factor_less_than
        ) > 10 &&
        Number(
          row.sampled_curvature_inflation_headroom_certificate
            .margin_after_reference_uniform_inflation_factor
        ) > 0 &&
        row.curvature_interval_jet_target.status ===
          "curvature-interval-jet-target-emitted" &&
        row.curvature_interval_jet_target.target_type ===
          "curvature-interval-jet-target" &&
        row.curvature_interval_jet_target.target_function ===
          "g=f_cross_prime" &&
        row.curvature_interval_jet_target
          .certifies_curvature_interval_jet_target === true &&
        row.curvature_interval_jet_target
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.curvature_interval_jet_target
          .certifies_interval_derivative_enclosure === false &&
        row.curvature_interval_jet_target
          .consumes_finite_interval_root_tube_certificate_target_status ===
          "finite-interval-root-tube-certificate-target-emitted" &&
        row.curvature_interval_jet_target
          .consumes_machine_padded_source_root_interval_certificate_status ===
          "machine-padded-source-root-interval-certificate-passed" &&
        row.curvature_interval_jet_target
          .requires_directed_rounded_source_root_certificate === true &&
        row.curvature_interval_jet_target.required_error_bound_less_than ===
          row.effective_peak_overshoot_ceiling_after_refined_replay &&
        row.curvature_interval_jet_target.sampled_reference_remainder ===
          row.sampled_pure_curvature_probe.sampled_bilinear_remainder &&
        row.curvature_interval_jet_target
          .sampled_reference_remainder_ratio ===
          row.sampled_pure_curvature_probe
            .sampled_bilinear_remainder_ratio_to_required_bound &&
        Number(
          row.curvature_interval_jet_target.sampled_reference_remainder_ratio
        ) < 1 &&
        row.curvature_interval_jet_target
          .curvature_acceptance_inequality.includes(
            "(h_theta^2/8)M_theta_theta"
          ) &&
        row.sampled_root_tube_regularity_probe.status ===
          "sampled-root-tube-regularity-feasibility-passed" &&
        row.sampled_root_tube_regularity_probe.certifies_interval_root_isolation ===
          false &&
        row.sampled_root_tube_regularity_probe
          .certifies_interval_root_tube_isolation === false &&
        row.sampled_root_tube_regularity_probe
          .certifies_interval_root_sheet_continuation === false &&
        row.sampled_root_tube_regularity_probe
          .certifies_interval_F_delta_lower_bound === false &&
        row.sampled_root_tube_regularity_probe.root_count_signature_preserved ===
          true &&
        row.sampled_root_tube_regularity_probe.all_F_delta_signs_preserved ===
          true &&
        Number(
          row.sampled_root_tube_regularity_probe.minimum_sampled_abs_F_delta
        ) > 0 &&
        Number(
          row.sampled_root_tube_regularity_probe.minimum_sampled_positive_delta
        ) > 0 &&
        Number(
          row.sampled_root_tube_regularity_probe
            .minimum_sampled_root_tube_separation
        ) > 0 &&
        row.finite_interval_root_tube_certificate_target.status ===
          "finite-interval-root-tube-certificate-target-emitted" &&
        row.finite_interval_root_tube_certificate_target
          .certifies_interval_root_tube_isolation === false &&
        row.finite_interval_root_tube_certificate_target
          .certifies_interval_root_sheet_continuation === false &&
        row.finite_interval_root_tube_certificate_target
          .certifies_interval_F_delta_lower_bound === false &&
        row.finite_interval_root_tube_certificate_target.retained_tube_count ===
          6 &&
        row.finite_interval_root_tube_certificate_target.complement_slab_count ===
          10 &&
        Number(
          row.finite_interval_root_tube_certificate_target
            .minimum_tube_padding_radius
        ) > 0 &&
        Number(
          row.finite_interval_root_tube_certificate_target
            .minimum_complement_slab_width
        ) > 0 &&
        row.sampled_finite_root_tube_sign_margin_certificate.status ===
          "sampled-finite-root-tube-sign-margin-certificate-passed" &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .certifies_interval_root_tube_isolation === false &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .certifies_interval_root_sheet_continuation === false &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .certifies_interval_F_delta_lower_bound === false &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .certifies_interval_complement_exclusion === false &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .parameter_sample_count === 9 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .tube_F_delta_samples_per_parameter === 3 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .complement_delta_samples_per_slab === 9 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_tube_endpoint_sign_pair_count === 54 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_tube_endpoint_F_sample_count === 108 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_tube_F_delta_sample_count === 162 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .sampled_complement_F_sample_count === 810 &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .all_sampled_endpoint_signs_opposite === true &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .all_sampled_tube_F_delta_signs_match_target === true &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .all_sampled_complement_signs_nonzero === true &&
        row.sampled_finite_root_tube_sign_margin_certificate
          .all_sampled_complement_signs_stable === true &&
        Number(
          row.sampled_finite_root_tube_sign_margin_certificate
            .minimum_sampled_tube_endpoint_abs_F
        ) > 0 &&
        Number(
          row.sampled_finite_root_tube_sign_margin_certificate
            .minimum_sampled_tube_endpoint_sign_product_margin
        ) > 0 &&
        Number(
          row.sampled_finite_root_tube_sign_margin_certificate
            .minimum_sampled_tube_abs_F_delta
        ) > 0 &&
        Number(
          row.sampled_finite_root_tube_sign_margin_certificate
            .minimum_sampled_complement_abs_F
        ) > 0 &&
        row.machine_padded_source_root_interval_certificate.status ===
          "machine-padded-source-root-interval-certificate-passed" &&
        row.machine_padded_source_root_interval_certificate
          .certifies_machine_padded_interval_source_root_tube_isolation ===
          true &&
        row.machine_padded_source_root_interval_certificate
          .certifies_machine_padded_interval_source_root_sheet_continuation ===
          true &&
        row.machine_padded_source_root_interval_certificate
          .certifies_machine_padded_interval_F_delta_lower_bound === true &&
        row.machine_padded_source_root_interval_certificate
          .certifies_machine_padded_interval_complement_exclusion === true &&
        row.machine_padded_source_root_interval_certificate
          .certifies_interval_root_tube_isolation === false &&
        row.machine_padded_source_root_interval_certificate
          .certifies_interval_root_sheet_continuation === false &&
        row.machine_padded_source_root_interval_certificate
          .certifies_interval_F_delta_lower_bound === false &&
        row.machine_padded_source_root_interval_certificate
          .certifies_interval_complement_exclusion === false &&
        row.machine_padded_source_root_interval_certificate
          .certifies_outward_rounded_interval_enclosure === false &&
        row.machine_padded_source_root_interval_certificate
          .tube_F_delta_subdivision_count === 16 &&
        row.machine_padded_source_root_interval_certificate
          .complement_subdivision_count === 32 &&
        row.machine_padded_source_root_interval_certificate
          .tube_endpoint_sign_pair_interval_count === 6 &&
        row.machine_padded_source_root_interval_certificate
          .tube_endpoint_F_interval_count === 12 &&
        row.machine_padded_source_root_interval_certificate
          .tube_F_delta_interval_count === 96 &&
        row.machine_padded_source_root_interval_certificate
          .complement_F_interval_count === 320 &&
        row.machine_padded_source_root_interval_certificate
          .all_tube_endpoint_intervals_opposite === true &&
        row.machine_padded_source_root_interval_certificate
          .all_tube_F_delta_intervals_match_target === true &&
        row.machine_padded_source_root_interval_certificate
          .all_complement_intervals_exclude_zero === true &&
        row.machine_padded_source_root_interval_certificate
          .all_complement_interval_signs_stable === true &&
        Number(
          row.machine_padded_source_root_interval_certificate
            .minimum_tube_endpoint_interval_abs_F
        ) > 0 &&
        Number(
          row.machine_padded_source_root_interval_certificate
            .minimum_tube_endpoint_interval_sign_product_margin
        ) > 0 &&
        Number(
          row.machine_padded_source_root_interval_certificate
            .minimum_tube_interval_abs_F_delta
        ) > 0 &&
        Number(
          row.machine_padded_source_root_interval_certificate
            .minimum_complement_interval_abs_F
        ) > 0 &&
        row.directed_rounded_source_root_interval_certificate.status ===
          "directed-rounded-source-root-interval-certificate-passed" &&
        row.directed_rounded_source_root_interval_certificate.certificate_type ===
          "directed-rounded-source-root-interval-certificate" &&
        row.directed_rounded_source_root_interval_certificate.interval_rounding ===
          "ieee-754-nextafter-outward" &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_directed_rounded_source_root_interval_certificate === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_directed_rounded_interval_source_root_tube_isolation === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_directed_rounded_interval_source_root_sheet_continuation ===
          true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_directed_rounded_interval_F_delta_lower_bound === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_directed_rounded_interval_complement_exclusion === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_interval_root_tube_isolation === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_interval_root_sheet_continuation === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_interval_F_delta_lower_bound === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_interval_complement_exclusion === true &&
        row.directed_rounded_source_root_interval_certificate
          .certifies_outward_rounded_interval_enclosure === false &&
        row.directed_rounded_source_root_interval_certificate
          .tube_F_delta_subdivision_count === 16 &&
        row.directed_rounded_source_root_interval_certificate
          .complement_subdivision_count === 32 &&
        row.directed_rounded_source_root_interval_certificate
          .all_tube_endpoint_intervals_opposite === true &&
        row.directed_rounded_source_root_interval_certificate
          .all_tube_F_delta_intervals_match_target === true &&
        row.directed_rounded_source_root_interval_certificate
          .all_complement_intervals_exclude_zero === true &&
        row.directed_rounded_source_root_interval_certificate
          .all_complement_interval_signs_stable === true &&
        Number(
          row.directed_rounded_source_root_interval_certificate
            .minimum_tube_endpoint_interval_abs_F
        ) > 0 &&
        Number(
          row.directed_rounded_source_root_interval_certificate
            .minimum_tube_interval_abs_F_delta
        ) > 0 &&
        Number(
          row.directed_rounded_source_root_interval_certificate
            .minimum_complement_interval_abs_F
        ) > 0 &&
        row.direct_interval_derivative_envelope_attempt.attempt_type ===
          "direct-interval-derivative-envelope-attempt" &&
        row.direct_interval_derivative_envelope_attempt.target_function ===
          "g=f_cross_prime" &&
        row.direct_interval_derivative_envelope_attempt
          .consumes_directed_rounded_source_root_interval_certificate_status ===
          "directed-rounded-source-root-interval-certificate-passed" &&
        row.direct_interval_derivative_envelope_attempt
          .certifies_interval_derivative_enclosure === false &&
        row.direct_interval_derivative_envelope_attempt
          .certifies_interval_second_partial_curvature_enclosure === false &&
        row.direct_interval_derivative_envelope_attempt
          .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure ===
          false &&
        row.direct_interval_derivative_envelope_attempt
          .protected_tube_subdivision_count ===
          expectedDirectIntervalSourceEvaluations &&
        row.direct_interval_derivative_envelope_attempt
          .source_derivative_interval_evaluation_count ===
          expectedDirectIntervalSourceEvaluations &&
        row.direct_interval_derivative_envelope_attempt
          .uses_monotone_root_sheet_contractor === true &&
        row.direct_interval_derivative_envelope_attempt
          .emits_fixed_sign_F_delta_root_sheet_contractions === true &&
        row.direct_interval_derivative_envelope_attempt
          .certifies_monotone_root_sheet_range_contraction === true &&
        row.direct_interval_derivative_envelope_attempt
          .all_root_sheet_contractions_passed === true &&
        row.direct_interval_derivative_envelope_attempt
          .total_root_sheet_contraction_count === 6 &&
        row.direct_interval_derivative_envelope_attempt
          .uses_parameter_localized_direct_interval_envelope === true &&
        row.direct_interval_derivative_envelope_attempt
          .theta_localization_subdivision_count ===
          thetaLocalizationSubdivisions &&
        row.direct_interval_derivative_envelope_attempt
          .speed_ratio_localization_subdivision_count ===
          speedLocalizationSubdivisions &&
        row.direct_interval_derivative_envelope_attempt
          .localized_parameter_tile_count ===
          expectedParameterLocalizedRootSheetContractions &&
        row.direct_interval_derivative_envelope_attempt
          .all_parameter_localized_root_sheet_contractions_passed === true &&
        row.direct_interval_derivative_envelope_attempt
          .total_parameter_localized_root_sheet_contraction_count ===
          expectedParameterLocalizedRootSheetContractions &&
        Number(
          row.direct_interval_derivative_envelope_attempt
            .maximum_parameter_localized_contracted_delta_width
        ) > 0 &&
        Number(
          row.direct_interval_derivative_envelope_attempt
            .minimum_parameter_localized_root_sheet_width_reduction_factor
        ) > 1 &&
        Number(
          row.direct_interval_derivative_envelope_attempt
            .maximum_contracted_delta_width
        ) <
          Number(
            row.direct_interval_derivative_envelope_attempt
              .maximum_protected_delta_width
          ) &&
        Number(
          row.direct_interval_derivative_envelope_attempt
            .minimum_root_sheet_width_reduction_factor
        ) > 1 &&
        row.direct_interval_derivative_envelope_attempt
          .all_F_delta_subdivision_signs_match_expected === true &&
        row.direct_interval_derivative_envelope_attempt.term_rows.length === 4 &&
        row.direct_interval_derivative_envelope_attempt.term_rows.every(
          (termRow) =>
            termRow.root_rows.every(
              (rootRow) =>
                rootRow.root_sheet_contraction
                  .certifies_fixed_sign_F_delta_root_sheet_contraction ===
                  true &&
                rootRow.root_sheet_contraction.endpoint_orientation_passed ===
                  true &&
                Number(
                  rootRow.root_sheet_contraction
                    .contracted_to_original_width_ratio
                ) < 1 &&
                rootRow.uses_parameter_localized_root_sheet_contractor ===
                  true &&
                rootRow.localized_parameter_tile_count ===
                  parameterLocalizedTilesPerRoot &&
                rootRow.localized_root_sheet_contraction_count ===
                  parameterLocalizedTilesPerRoot &&
                rootRow.all_localized_root_sheet_contractions_passed ===
                  true &&
                Number(rootRow.maximum_localized_contracted_delta_width) >
                  0 &&
                Number(
                  rootRow.minimum_localized_root_sheet_width_reduction_factor
                ) > 1
            )
        ) &&
        row.direct_interval_derivative_envelope_attempt.term_rows.reduce(
          (sum, termRow) => sum + termRow.root_rows.length,
          0
        ) === 6 &&
        Number(
          row.direct_interval_derivative_envelope_attempt
            .minimum_F_delta_abs_clearance
        ) > 0 &&
        row.direct_interval_derivative_envelope_attempt
          .direct_interval_derivative_enclosure.length === 2 &&
        row.direct_interval_derivative_envelope_attempt
          .direct_interval_derivative_upper_bound ===
          row.direct_interval_derivative_envelope_attempt
            .direct_interval_derivative_enclosure[1] &&
        row.direct_interval_derivative_envelope_attempt.vertex_max_derivative ===
          row.vertex_max_derivative &&
        row.direct_interval_derivative_envelope_attempt
          .required_overshoot_bound_less_than ===
          row.effective_peak_overshoot_ceiling_after_refined_replay &&
        Number(
          row.direct_interval_derivative_envelope_attempt
            .maximum_root_derivative_interval_width
        ) > 0 &&
        (row.direct_interval_derivative_envelope_attempt.status ===
        "direct-interval-derivative-envelope-passed"
          ? Number(
              row.direct_interval_derivative_envelope_attempt
                .direct_interval_upper_bound_headroom
            ) > 0 &&
            Number(
              row.direct_interval_derivative_envelope_attempt
                .direct_interval_remainder_ratio_to_required_bound
            ) < 1
          : Number(
              row.direct_interval_derivative_envelope_attempt
                .direct_interval_upper_bound_overrun
            ) > 0 &&
            Number(
              row.direct_interval_derivative_envelope_attempt
                .direct_interval_remainder_ratio_to_required_bound
            ) >= 1) &&
        Number(
          row.sampled_pure_curvature_probe
            .sampled_bilinear_remainder_ratio_to_required_bound
        ) < 1 &&
        Number(row.effective_peak_overshoot_ceiling_after_refined_replay) > 0 &&
        Number(row.refined_max_derivative) < 0 &&
        Number(row.min_abs_F_delta) > 0
    ),
    true
  );
});

test("I1.f1 bracket-local derivative peak-budget reduction closes finite Taylor curvature and keeps downstream claims open", () => {
  const packet = artifact();

  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_derivative_peak_budget_reduction,
    true
  );
  assert.equal(
    packet.artifact_claim
      .converts_directed_rounding_derivative_variation_to_finite_subcell_peak_bounds,
    true
  );
  assert.equal(packet.artifact_claim.certifies_refined_sampled_peak_audit, true);
  assert.equal(
    packet.artifact_claim.certifies_sampled_bilinear_curvature_feasibility,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_sampled_curvature_inflation_headroom,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_curvature_interval_jet_target,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_sampled_analytic_jet_curvature_witness,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_sampled_analytic_jet_envelope_budget,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_sampled_fourth_jet_curvature_transport_witness,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_sampled_fifth_jet_curvature_gradient_transport_witness,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_sampled_theta_localized_taylor_upper_envelope_witness,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_sampled_root_tube_regularity_feasibility,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_finite_interval_root_tube_certificate_target,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_sampled_finite_root_tube_sign_margin_certificate,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_machine_padded_source_root_interval_certificate,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_machine_padded_interval_source_root_tube_isolation,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_machine_padded_interval_source_root_sheet_continuation,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_machine_padded_interval_F_delta_lower_bound,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_machine_padded_interval_complement_exclusion,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_source_root_interval_certificate,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_interval_source_root_tube_isolation,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_interval_source_root_sheet_continuation,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_interval_F_delta_lower_bound,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_directed_rounded_interval_complement_exclusion,
    true
  );
  assert.equal(
    packet.artifact_claim.emits_direct_interval_derivative_envelope_attempt,
    true
  );
  assert.equal(
    packet.artifact_claim.emits_parameter_localized_direct_interval_envelope,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_monotone_root_sheet_range_contraction,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_parameter_localized_monotone_root_sheet_range_contraction,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_direct_interval_derivative_upper_envelope,
    false
  );
  assert.equal(
    packet.artifact_claim
      .emits_directed_rounded_theta_localized_taylor_intervalization_attempt,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_directed_rounded_taylor_upper_envelope,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_interval_second_partial_curvature_enclosure,
    true
  );
  assert.equal(packet.artifact_claim.certifies_interval_root_tube_isolation, true);
  assert.equal(
    packet.artifact_claim.certifies_interval_root_sheet_continuation,
    true
  );
  assert.equal(packet.artifact_claim.certifies_interval_F_delta_lower_bound, true);
  assert.equal(
    packet.artifact_claim.certifies_interval_complement_exclusion,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_derivative_negative_full_cell_interval_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(packet.artifact_claim.certifies_I1_zero_isolation, false);
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.certifies_interval_sign_topology, false);
  assert.equal(packet.artifact_claim.certifies_interval_critical_exhaustion, false);
  assert.equal(
    packet.artifact_claim.certifies_interval_quadrature_enclosure,
    false
  );
  assert.deepEqual(packet.artifact_claim.open_quantity_names, [
    "interval_derivative_enclosure",
    "I1_f1_full_interval_zero_isolation",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ]);
  assert.deepEqual(packet.interval_profile_boundary.open_quantity_names, [
    "interval_derivative_enclosure",
    "I1_f1_full_interval_zero_isolation",
    "interval_critical_exhaustion",
    "interval_quadrature_enclosure",
    "retained_branch_status",
  ]);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    EXPECTED_RESULT_THEORY_STATUS
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.f1.full-interval-zero-isolation-critical-exhaustion-quadrature-required"
  );
});

test("I1.f1 bracket-local derivative peak-budget reduction rejects invalid controls and overclaims", () => {
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          parentStencilSamplesPerAxis: 4,
        }
      ),
    /parentStencilSamplesPerAxis/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          refinementSamplesPerSubcellAxis: 1,
        }
      ),
    /refinementSamplesPerSubcellAxis/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          speedCellCount: 1,
        }
      ),
    /speedCellCount/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          directIntervalThetaLocalizationSubdivisions: 0,
        }
      ),
    /directIntervalThetaLocalizationSubdivisions/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          directIntervalSpeedLocalizationSubdivisions: 0,
        }
      ),
    /directIntervalSpeedLocalizationSubdivisions/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          thetaLocalizedTaylorSubdivisions: 0,
        }
      ),
    /thetaLocalizedTaylorSubdivisions/
  );
  assert.throws(
    () =>
      buildOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
        {
          refinementSamplesPerSubcellAxis: 3,
          thetaLocalizedTaylorSubdivisions: 3,
        }
      ),
    /thetaLocalizedTaylorSubdivisions/
  );

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_derivative_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      broken
    ).join("\n"),
    /leaving zero isolation, derivative interval, critical exhaustion, quadrature, and retention claims open/
  );

  const outwardRoundedOverclaim = structuredClone(artifact());
  outwardRoundedOverclaim.artifact_claim.certifies_outward_rounded_interval_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      outwardRoundedOverclaim
    ).join("\n"),
    /leaving zero isolation, derivative interval, critical exhaustion, quadrature, and retention claims open/
  );

  const criticalExhaustionOverclaim = structuredClone(artifact());
  criticalExhaustionOverclaim.artifact_claim.certifies_interval_critical_exhaustion =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      criticalExhaustionOverclaim
    ).join("\n"),
    /leaving zero isolation, derivative interval, critical exhaustion, quadrature, and retention claims open/
  );

  const quadratureOverclaim = structuredClone(artifact());
  quadratureOverclaim.artifact_claim.certifies_interval_quadrature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      quadratureOverclaim
    ).join("\n"),
    /leaving zero isolation, derivative interval, critical exhaustion, quadrature, and retention claims open/
  );

  const targetOverclaim = structuredClone(artifact());
  targetOverclaim.peak_budget_rows[0].finite_interval_root_tube_certificate_target.certifies_interval_root_tube_isolation =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      targetOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const sampledSignOverclaim = structuredClone(artifact());
  sampledSignOverclaim.peak_budget_rows[0].sampled_finite_root_tube_sign_margin_certificate.certifies_interval_complement_exclusion =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      sampledSignOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const curvatureOverclaim = structuredClone(artifact());
  curvatureOverclaim.peak_budget_rows[0].sampled_curvature_inflation_headroom_certificate.certifies_interval_second_partial_curvature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      curvatureOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const curvatureJetOverclaim = structuredClone(artifact());
  curvatureJetOverclaim.peak_budget_rows[0].curvature_interval_jet_target.certifies_interval_second_partial_curvature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      curvatureJetOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const sampledAnalyticJetOverclaim = structuredClone(artifact());
  sampledAnalyticJetOverclaim.peak_budget_rows[0].sampled_analytic_jet_curvature_witness.certifies_interval_second_partial_curvature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      sampledAnalyticJetOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const sampledEnvelopeOverclaim = structuredClone(artifact());
  sampledEnvelopeOverclaim.peak_budget_rows[0].sampled_analytic_jet_envelope_budget.certifies_interval_second_partial_curvature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      sampledEnvelopeOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const sampledFourthJetTransportOverclaim = structuredClone(artifact());
  sampledFourthJetTransportOverclaim.peak_budget_rows[0].sampled_fourth_jet_curvature_transport_witness.certifies_interval_second_partial_curvature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      sampledFourthJetTransportOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const sampledFifthJetTransportOverclaim = structuredClone(artifact());
  sampledFifthJetTransportOverclaim.peak_budget_rows[0].sampled_fifth_jet_curvature_gradient_transport_witness.certifies_interval_second_partial_curvature_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      sampledFifthJetTransportOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const sampledThetaLocalizedTaylorOverclaim = structuredClone(artifact());
  sampledThetaLocalizedTaylorOverclaim.peak_budget_rows[0].sampled_theta_localized_taylor_upper_envelope_witness.certifies_directed_rounded_taylor_upper_envelope =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      sampledThetaLocalizedTaylorOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const directIntervalDerivativeOverclaim = structuredClone(artifact());
  directIntervalDerivativeOverclaim.peak_budget_rows[0].direct_interval_derivative_envelope_attempt.certifies_interval_derivative_enclosure =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      directIntervalDerivativeOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );

  const machineIntervalOverclaim = structuredClone(artifact());
  machineIntervalOverclaim.peak_budget_rows[0].machine_padded_source_root_interval_certificate.certifies_interval_root_tube_isolation =
    true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      machineIntervalOverclaim
    ).join("\n"),
    /preserve roots, stay negative/
  );
});

test("I1.f1 bracket-local derivative peak-budget reduction CLI emits and validates JSON artifacts", () => {
  const script = fileURLToPath(
    new URL(
      "../scripts/neutral-swarm/octahedral-fold-aware-cross-binary-i1-bracket-local-derivative-peak-budget-reduction.mjs",
      import.meta.url
    )
  );
  const tmpDir = fs.mkdtempSync(
    path.join(os.tmpdir(), "cross-binary-i1-peak-budget-")
  );
  const outPath = path.join(tmpDir, "packet.json");

  execFileSync(
    process.execPath,
    [
      script,
      "--out",
      outPath,
      "--pretty",
      "--endpoint-speed-samples",
      "3",
      "--zero-branch-speed-samples",
      "3",
      "--derivative-theta-samples",
      "8",
      "--theta-cells",
      "4",
      "--speed-cells",
      "2",
      "--parent-stencil-samples",
      "3",
      "--refinement-samples",
      "2",
    ],
    {
      stdio: "pipe",
    }
  );
  execFileSync(process.execPath, [script, "--validate", outPath], {
    stdio: "pipe",
  });
  assert.equal(
    execFileSync(process.execPath, [script, "--schema"], {
      encoding: "utf8",
    }).trim(),
    OCTAHEDRAL_FOLD_AWARE_CROSS_BINARY_I1_BRACKET_LOCAL_DERIVATIVE_PEAK_BUDGET_REDUCTION_SCHEMA
  );
});
