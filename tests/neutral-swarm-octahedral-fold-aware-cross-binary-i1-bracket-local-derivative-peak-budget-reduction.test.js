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

test("I1.f1 bracket-local derivative peak-budget reduction consumes sampled variation without closing directed rounding", () => {
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
  assert.equal(packet.artifact_claim.assumes_fixed_speed_window, false);
});

test("I1.f1 bracket-local derivative peak-budget reduction records finite subcell budgets", () => {
  const summary = artifact().peak_budget_summary;

  assert.equal(
    summary.peak_budget_row_id,
    "I1.f1.bracket-local-derivative-peak-budget-reduction"
  );
  assert.equal(
    summary.successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
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
  assert.equal(
    summary.sampled_bilinear_curvature_bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.4.peak-budget.3.0"
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
  assert.deepEqual(summary.source_root_counts, [6]);
  assert.deepEqual(summary.term_root_count_signatures, ["1,3,1,1"]);
  assert.equal(
    summary.bottleneck_subcell_row_id,
    "I1.f1.bracket-derivative-mesh.0.7.peak-budget.0.0"
  );
  assert.equal(
    summary.status,
    "i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified"
  );
});

test("I1.f1 bracket-local derivative peak-budget reduction exposes backend-ready subcell data", () => {
  const packet = artifact();
  const firstRow = packet.peak_budget_rows[0];

  assert.match(
    packet.backend_input_formula_sheet.source_root_equation,
    /delta\^2\/nu\^2-2\+sin\(phi\)\+kappa\*sin\(delta\)=0/
  );
  assert.equal(
    packet.backend_input_formula_sheet.implicit_root_derivative,
    "delta_prime=-2*cos(phi)/F_delta"
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
    packet.backend_input_formula_sheet.root_tube_interval_certificate,
    /exactly one C\^1 implicit root sheet/
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
});

test("I1.f1 bracket-local derivative peak-budget rows stay positive and finite", () => {
  const rows = artifact().peak_budget_rows;

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

test("I1.f1 bracket-local derivative peak-budget reduction keeps interval and retention claims open", () => {
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
    packet.artifact_claim.certifies_sampled_root_tube_regularity_feasibility,
    true
  );
  assert.equal(
    packet.artifact_claim.certifies_finite_interval_root_tube_certificate_target,
    true
  );
  assert.equal(
    packet.artifact_claim
      .certifies_I1_f1_bracket_local_directed_rounding_derivative_variation_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_interval_second_partial_curvature_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_root_tube_isolation, false);
  assert.equal(
    packet.artifact_claim.certifies_interval_root_sheet_continuation,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_F_delta_lower_bound, false);
  assert.equal(
    packet.artifact_claim
      .certifies_I1_derivative_negative_full_cell_interval_enclosure,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_I1_f1_full_interval_zero_isolation,
    false
  );
  assert.equal(
    packet.artifact_claim.certifies_outward_rounded_interval_enclosure,
    false
  );
  assert.equal(packet.artifact_claim.certifies_interval_derivative_enclosure, false);
  assert.equal(packet.artifact_claim.retained_branch, false);
  assert.equal(
    packet.result.theory_status,
    "source-atlas-aware-i1-f1-bracket-local-finite-root-tube-target-and-sampled-bilinear-curvature-feasibility-certified"
  );
  assert.equal(
    packet.result.first_successor_row,
    "I1.f1.bracket-local-directed-rounding-derivative-variation-enclosure-required"
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

  const broken = structuredClone(artifact());
  broken.artifact_claim.certifies_interval_derivative_enclosure = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      broken
    ).join("\n"),
    /leave interval\/retention claims open/
  );

  const rootTubeOverclaim = structuredClone(artifact());
  rootTubeOverclaim.artifact_claim.certifies_interval_root_tube_isolation = true;
  assert.match(
    validateOctahedralFoldAwareCrossBinaryI1BracketLocalDerivativePeakBudgetReduction(
      rootTubeOverclaim
    ).join("\n"),
    /leave interval\/retention claims open/
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
