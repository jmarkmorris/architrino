import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
  OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
  evaluateCandidateBRangeProbe,
  evaluateLiveCorrectionDirectionCertificate,
  evaluateLiveDerivativeMatrixCertificate,
  evaluateLiveDerivativeColumnPreviewRangeProbe,
  evaluateLiveDerivativeColumnIntake,
  evaluateSpeedPrimitiveFeasibilityCertificate,
  evaluateSpeedClockLengthCertificate,
  evaluateNormalReconstructionHandoff,
  evaluateBoundedSpeedNormalReconstructionCandidate,
  evaluateActionStabilityAfterNormalCandidateIntake,
  buildOctahedralZeroMeanCorrectionIntake,
  validateOctahedralZeroMeanCorrectionIntake,
} from "../scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs";

const RECEIVER_LABELS = ["1+", "1-", "2+", "2-", "3+", "3-"];
const SOURCE_ARTIFACT_ID = "neutral_braid_octahedral_zero_mean_correction_intake.frozen_constant_vector.v1";
const REQUIRED_LIVE_DERIVATIVE_BLOCKS = [
  "clock",
  "inverse-clock",
  "root",
  "jacobian",
  "force-weight",
  "support",
  "action",
  "event",
];
const REQUIRED_LIVE_DERIVATIVE_GUARDS = [
  "clock_guard",
  "inverse_clock_guard",
  "root_guard",
  "jacobian_guard",
  "force_weight_guard",
  "support_guard",
  "action_guard",
  "event_guard",
  "force_checksum_guard",
  "consumer_checksum_guard",
];
const REQUIRED_CORRECTION_DIRECTION_GUARDS = [
  "delay_floor_guard",
  "jacobian_floor_guard",
  "speed_band_margin_guard",
  "support_margin_guard",
  "action_convention_guard",
  "event_convention_guard",
];
const REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS = [
  "action_scale",
  "action_curl",
  "speed_factor_storage_exchange",
  "noether_event_exchange",
  "tail_refinement_persistence",
  "bounded_speed_stability",
  "observer_export_eligibility",
  "coupled_fixed_point",
];
const REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS = [
  ["action_derived_scale", "action_scale"],
  ["action_curl", "action_curl"],
  ["speed_factor_storage_exchange", "speed_factor_storage_exchange"],
  ["noether_event_exchange", "noether_event_exchange"],
  ["tail_refinement_persistence", "tail_refinement_persistence"],
  ["bounded_speed_stability", "bounded_speed_stability"],
  ["observer_export_eligibility", "observer_export_eligibility"],
  ["coupled_fixed_point", "coupled_fixed_point"],
];

function candidateBPacket(matrix, overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA,
    matrix_id: "candidate-b",
    claim_scope: "candidate-range-probe-only",
    live_derivative_columns_claimed: false,
    row_labels: RECEIVER_LABELS,
    column_labels: matrix[0].map((_, index) => `column_${index}`),
    matrix,
    ...overrides,
  };
}

function passedLiveDerivativeGuards() {
  return Object.fromEntries(REQUIRED_LIVE_DERIVATIVE_GUARDS.map((guard) => [guard, "passed"]));
}

function passedCorrectionDirectionGuards() {
  return Object.fromEntries(REQUIRED_CORRECTION_DIRECTION_GUARDS.map((guard) => [guard, "passed"]));
}

function liveDerivativeColumnPacket(overrides = {}) {
  const columns =
    overrides.columns ??
    [
      {
        column_label: "constant_speed_direction",
        parameter_id: "b:constant-speed-test",
        parameter_kind: "speed-coefficient",
        difference_scheme: "central-finite-difference",
        perturbation_epsilon: 0.001,
        baseline_artifact_id: "baseline-live-mean-row",
        plus_artifact_id: "plus-live-mean-row",
        minus_artifact_id: "minus-live-mean-row",
        ledger_convention_id: "bounded-speed-ledger-convention-test",
        same_ledger_convention: true,
        guards: passedLiveDerivativeGuards(),
        receiver_rows: RECEIVER_LABELS.map((receiver_label) => ({
          receiver_label,
          baseline_mean: 1.15740669293,
          plus_mean: 1.15840669293,
          minus_mean: 1.15640669293,
          derivative_value: 1,
          finite_difference_residual: 0,
        })),
      },
    ];

  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA,
    claim_scope: "live-derivative-column-provenance-intake",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    certifies_live_derivative_matrix: false,
    certifies_correction_direction: false,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    column_labels: columns.map((column) => column.column_label),
    derivative_column_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS,
    columns,
    ...overrides,
  };
}

function liveDerivativePreviewPacketWithColumn(columnValues, overrides = {}) {
  return liveDerivativeColumnPacket({
    columns: [
      {
        column_label: "preview_direction",
        parameter_id: "b:preview-direction",
        parameter_kind: "speed-coefficient",
        difference_scheme: "central-finite-difference",
        perturbation_epsilon: 0.001,
        baseline_artifact_id: "baseline-live-mean-row",
        plus_artifact_id: "plus-live-mean-row",
        minus_artifact_id: "minus-live-mean-row",
        ledger_convention_id: "bounded-speed-ledger-convention-test",
        same_ledger_convention: true,
        guards: passedLiveDerivativeGuards(),
        receiver_rows: RECEIVER_LABELS.map((receiver_label, index) => ({
          receiver_label,
          baseline_mean: 1.15740669293,
          plus_mean: 1.15740669293 + 0.001 * columnValues[index],
          minus_mean: 1.15740669293 - 0.001 * columnValues[index],
          derivative_value: columnValues[index],
          finite_difference_residual: 0,
        })),
      },
    ],
    ...overrides,
  });
}

function liveDerivativePreviewPacketWithColumns(columnVectors, overrides = {}) {
  return liveDerivativeColumnPacket({
    columns: columnVectors.map((columnValues, columnIndex) => ({
      column_label: `preview_direction_${columnIndex}`,
      parameter_id: `b:preview-direction-${columnIndex}`,
      parameter_kind: "speed-coefficient",
      difference_scheme: "central-finite-difference",
      perturbation_epsilon: 0.001,
      baseline_artifact_id: "baseline-live-mean-row",
      plus_artifact_id: `plus-live-mean-row-${columnIndex}`,
      minus_artifact_id: `minus-live-mean-row-${columnIndex}`,
      ledger_convention_id: "bounded-speed-ledger-convention-test",
      same_ledger_convention: true,
      guards: passedLiveDerivativeGuards(),
      receiver_rows: RECEIVER_LABELS.map((receiver_label, index) => ({
        receiver_label,
        baseline_mean: 1.15740669293,
        plus_mean: 1.15740669293 + 0.001 * columnValues[index],
        minus_mean: 1.15740669293 - 0.001 * columnValues[index],
        derivative_value: columnValues[index],
        finite_difference_residual: 0,
      })),
    })),
    ...overrides,
  });
}

function liveDerivativeMatrixPacket(matrix, overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    claim_scope: "live-derivative-matrix-range-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    matrix_id: "same-ledger-live-b-test",
    ledger_convention_id: "bounded-speed-ledger-convention-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    force_checksum_id: "force-checksum-test",
    consumer_checksum_id: "consumer-checksum-test",
    certifies_live_derivative_matrix: true,
    certifies_bounded_speed_live_ledger: false,
    certifies_correction_direction: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    column_labels: matrix[0].map((_, index) => `live_direction_${index}`),
    derivative_column_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS,
    guards: passedLiveDerivativeGuards(),
    matrix,
    ...overrides,
  };
}

function liveCorrectionDirectionPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    claim_scope: "live-correction-direction-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_live_derivative_matrix_certificate_schema:
      OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA,
    source_live_derivative_matrix_id: "same-ledger-constant-column-pass",
    source_range_certificate_status: "certified-live-rhs-in-range",
    direction_id: "alpha-constant-column-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    first_order_margin_guards: passedCorrectionDirectionGuards(),
    ...overrides,
  };
}

function speedPrimitiveFeasibilityPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    claim_scope: "speed-primitive-feasibility-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_correction_direction_certificate_schema:
      OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA,
    source_correction_direction_id: "alpha-constant-column-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    primitive_id: "post-correction-speed-primitive-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    receiver_primitives: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      primitive_return_residual: 0,
      primitive_excursion_min: -0.1,
      primitive_excursion_max: 0.1,
      nu_initial: 1,
      speed_band_lower: 0.5,
      speed_band_upper: 1.5,
    })),
    ...overrides,
  };
}

function speedClockLengthPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    claim_scope: "speed-clock-length-certificate",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_speed_primitive_feasibility_schema:
      OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA,
    source_speed_primitive_feasibility_id: "post-correction-speed-primitive-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    clock_length_id: "post-correction-speed-clock-length-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    receiver_clock_length_rows: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      center_time_period: 2,
      target_length: 2,
      winding_number: 1,
      nu_initial: 1,
      primitive_integral: 0,
      length_return_residual: 0,
    })),
    ...overrides,
  };
}

function normalReconstructionHandoffPacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    claim_scope: "normal-reconstruction-handoff",
    promotion_status: "priority-only",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_speed_clock_length_schema: OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA,
    source_speed_clock_length_id: "post-correction-speed-clock-length-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    normal_handoff_id: "post-correction-normal-reconstruction-handoff-test",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: false,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    receiver_normal_handoff_rows: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      normal_residual_norm_2: 0.25,
      tangent_holonomy_residual_norm_2: 0.125,
      position_closure_residual_norm_2: 0.0625,
      unit_tangent_residual_abs_max: 0,
      support_margin_min: 0.5,
    })),
    ...overrides,
  };
}

function boundedSpeedNormalReconstructionCandidatePacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    claim_scope: "bounded-speed-normal-reconstruction-candidate",
    promotion_status: "priority-only",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_normal_reconstruction_handoff_schema: OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA,
    source_normal_handoff_id: "post-correction-normal-reconstruction-handoff-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    force_checksum_id: "force-checksum-test",
    consumer_checksum_id: "consumer-checksum-test",
    normal_reconstruction_candidate_id: "post-correction-bounded-speed-normal-reconstruction-candidate-test",
    normal_equation_status: "normal-equation-closed",
    tangent_holonomy_status: "tangent-holonomy-closed",
    position_closure_status: "position-closure-closed",
    unit_tangent_status: "unit-tangent-closed",
    support_margin_status: "support-margin-positive",
    noncollision_status: "noncollision-certified",
    root_persistence_status: "root-persistence-certified",
    krawczyk_status: "bounded-speed-branch-krawczyk-accepted",
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: true,
    certifies_bounded_speed_live_ledger: false,
    retained_branch: false,
    row_labels: RECEIVER_LABELS,
    tolerances: {
      normal_residual_norm_2: 1e-9,
      tangent_holonomy_residual_norm_2: 1e-9,
      position_closure_residual_norm_2: 1e-9,
      unit_tangent_residual_abs_max: 1e-9,
      krawczyk_residual_norm_2: 1e-9,
    },
    margin_floors: {
      support_margin_min: 0,
      noncollision_margin_min: 0,
      root_persistence_margin_min: 0,
    },
    receiver_normal_candidate_rows: RECEIVER_LABELS.map((receiver_label) => ({
      receiver_label,
      normal_residual_norm_2: 0,
      tangent_holonomy_residual_norm_2: 0,
      position_closure_residual_norm_2: 0,
      unit_tangent_residual_abs_max: 0,
      support_margin_min: 0.5,
      noncollision_margin_min: 0.25,
      root_persistence_margin_min: 0.125,
      krawczyk_residual_norm_2: 0,
    })),
    ...overrides,
  };
}

function actionStabilityAfterNormalCandidatePacket(overrides = {}) {
  return {
    schema: OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA,
    claim_scope: "bounded-speed-action-stability-after-normal-candidate-intake",
    promotion_status: "priority-only",
    source_intake_schema: OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA,
    source_artifact_id: SOURCE_ARTIFACT_ID,
    source_bounded_speed_normal_reconstruction_candidate_schema:
      OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA,
    source_normal_reconstruction_candidate_id:
      "post-correction-bounded-speed-normal-reconstruction-candidate-test",
    action_stability_intake_id: "after-normal-action-stability-intake-test",
    bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
    force_checksum_id: "force-checksum-test",
    consumer_checksum_id: "consumer-checksum-test",
    live_ledger_identity: {
      bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
      force_checksum_id: "force-checksum-test",
      consumer_checksum_id: "consumer-checksum-test",
      certification_status: "bounded-speed-live-ledger-open",
    },
    bounded_speed_live_ledger: {
      claim_scope: "bounded-speed-live-ledger-target-after-normal-candidate",
      source_normal_reconstruction_candidate_id:
        "post-correction-bounded-speed-normal-reconstruction-candidate-test",
      bounded_speed_ledger_id: "bounded-speed-live-ledger-test",
      force_checksum_id: "force-checksum-test",
      consumer_checksum_id: "consumer-checksum-test",
      intake_status: "bounded-speed-live-ledger-open",
      first_failure_row: "bounded-speed-live-ledger-open",
      required_same_ledger_rows: Object.fromEntries(
        REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row, downstreamRow]) => [
          row,
          {
            downstream_row: downstreamRow,
            same_ledger_binding: "same-normal-candidate-ledger-checksum",
            status: "blocked:bounded-speed-live-ledger-open",
          },
        ])
      ),
      certifies_bounded_speed_live_ledger: false,
      certifies_action_stability: false,
      certifies_observer_export: false,
      retention: "not_retained",
      retained_branch: false,
    },
    normal_candidate_status: "bounded-speed-normal-reconstruction-candidate",
    live_ledger_status: "bounded-speed-live-ledger-open",
    first_failure_row: "bounded-speed-live-ledger-open",
    downstream_row_statuses: Object.fromEntries(
      REQUIRED_ACTION_STABILITY_DOWNSTREAM_ROWS.map((row) => [
        row,
        "blocked:bounded-speed-live-ledger-open",
      ])
    ),
    certifies_live_derivative_matrix: true,
    certifies_correction_direction: true,
    certifies_speed_primitive_feasibility: true,
    certifies_speed_clock_length: true,
    certifies_normal_reconstruction: true,
    certifies_bounded_speed_live_ledger: false,
    certifies_action_stability: false,
    certifies_observer_export: false,
    retention: "not_retained",
    retained_branch: false,
    ...overrides,
  };
}

test("octahedral zero-mean correction intake emits the constant six-vector obstruction", () => {
  const artifact = buildOctahedralZeroMeanCorrectionIntake({ phaseSamples: 120, ySubdivisions: 240 });
  const errors = validateOctahedralZeroMeanCorrectionIntake(artifact);

  assert.deepEqual(errors, []);
  assert.equal(artifact.schema, "neutral-braid-octahedral-zero-mean-correction-intake/v1");
  assert.equal(artifact.packet_id, "octahedral_zero_mean_correction_intake");
  assert.equal(artifact.promotion_status, "priority-only");
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.emits_live_derivative_columns, false);
  assert.equal(artifact.artifact_claim.certifies_live_derivative_matrix, false);
  assert.equal(artifact.artifact_claim.certifies_correction_direction, false);
  assert.equal(artifact.source_diagnostic.validation_status, "source-speed-diagnostic-valid");
  assert.equal(artifact.source_diagnostic.mean_split_status, "frozen-fixed-ledger-mean-obstruction");
  assert.equal(
    artifact.source_diagnostic.cross_binary_symmetry_certificate_status,
    "analytic-cross-binary-phase-antiperiodicity-certified"
  );
  assert.equal(artifact.frozen_mean_vector.period_integral_vector.length, 6);
  assert.equal(artifact.frozen_mean_vector.constant_vector_status, "constant-six-vector-certified");
  assert.equal(artifact.frozen_mean_vector.positivity_status, "positive-period-mean-certified");
  assert.ok(artifact.frozen_mean_vector.mu_period_integral > 1);
  assert.ok(artifact.frozen_mean_vector.period_integral_deviation_abs_max < 1e-9);
  assert.deepEqual(
    artifact.linear_system_intake.rhs_vector,
    artifact.frozen_mean_vector.period_integral_vector.map((value) => -value)
  );
  assert.equal(artifact.linear_system_intake.equation, "B*alpha=-M");
  assert.equal(
    artifact.linear_system_intake.exact_range_condition,
    "Since M=mu*1_6 with mu>0, first-order solvability is equivalent to 1_6 being in Range(B)."
  );
  assert.ok(artifact.linear_system_intake.normalized_constant_covector.projection_of_M > 2);
  assert.equal(
    artifact.linear_system_intake.normalized_constant_covector.projection_of_rhs,
    -artifact.linear_system_intake.normalized_constant_covector.projection_of_M
  );
  assert.equal(artifact.linear_system_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(artifact.linear_system_intake.range_certificate_status, "correction-rank-open");
  assert.equal(artifact.linear_system_intake.correction_status, "zero-mean-correction-open");
  assert.equal(artifact.linear_system_intake.derivative_matrix, null);
  assert.equal(artifact.linear_system_intake.range_residual, null);
  assert.equal(artifact.linear_system_intake.range_projection, null);
  assert.equal(artifact.linear_system_intake.cokernel_projection, null);
  assert.equal(artifact.derivative_column_audit.live_derivative_columns_claimed, false);
  assert.deepEqual(artifact.derivative_column_audit.included_column_blocks, []);
  assert.deepEqual(artifact.derivative_column_audit.omitted_required_live_blocks, [
    "clock",
    "inverse-clock",
    "root",
    "jacobian",
    "force-weight",
    "support",
    "action",
    "event",
  ]);
  assert.equal(artifact.live_derivative_column_intake, null);
  assert.equal(artifact.residual_vector.first_failure_row, "live-ledger-derivative-open");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
});

test("octahedral zero-mean correction intake checks candidate range matrices", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const passingPacket = candidateBPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "constant-column-pass",
    column_labels: ["constant_receiver_column"],
  });
  const passingArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    candidateBPacket: passingPacket,
  });
  const passingProbe = evaluateCandidateBRangeProbe(baseArtifact, passingPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(passingArtifact), []);
  assert.deepEqual(passingArtifact.candidate_b_range_probe, passingProbe);
  assert.equal(passingArtifact.candidate_b_range_probe.schema, OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA);
  assert.equal(passingArtifact.candidate_b_range_probe.range_membership_status, "candidate-rhs-in-range");
  assert.equal(passingArtifact.candidate_b_range_probe.matrix_rank, 1);
  assert.equal(passingArtifact.candidate_b_range_probe.augmented_rank_with_constant_direction, 1);
  assert.equal(passingArtifact.candidate_b_range_probe.candidate_range_residual_norm_2, 0);
  assert.equal(passingArtifact.candidate_b_range_probe.balanced_column_status, "candidate-columns-unbalanced");
  assert.equal(passingArtifact.linear_system_intake.derivative_matrix, null);
  assert.equal(passingArtifact.linear_system_intake.rank, null);
  assert.equal(passingArtifact.linear_system_intake.range_residual, null);
  assert.equal(passingArtifact.linear_system_intake.range_certificate_status, "correction-rank-open");
  assert.equal(passingArtifact.linear_system_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(passingArtifact.result.retained_branch, false);

  const balancedPacket = candidateBPacket([[1], [-1], [1], [-1], [1], [-1]], {
    matrix_id: "balanced-column-fail",
    column_labels: ["zero_sum_column"],
  });
  const obstructedArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    candidateBPacket: balancedPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(obstructedArtifact), []);
  assert.equal(obstructedArtifact.candidate_b_range_probe.range_membership_status, "candidate-rhs-out-of-range");
  assert.equal(obstructedArtifact.candidate_b_range_probe.balanced_column_status, "candidate-columns-balanced");
  assert.equal(obstructedArtifact.candidate_b_range_probe.max_abs_column_sum, 0);
  assert.equal(
    obstructedArtifact.candidate_b_range_probe.cokernel_obstruction_status,
    "left-null-constant-covector-obstructs"
  );
  assert.ok(obstructedArtifact.candidate_b_range_probe.candidate_range_residual_norm_2 > 2);
  assert.equal(obstructedArtifact.linear_system_intake.derivative_matrix, null);
  assert.equal(obstructedArtifact.result.retention, "not_retained");

  assert.throws(
    () =>
      evaluateCandidateBRangeProbe(baseArtifact, {
        ...passingPacket,
        live_derivative_columns_claimed: true,
      }),
    /must not claim live derivative columns/
  );
  assert.throws(
    () =>
      evaluateCandidateBRangeProbe(baseArtifact, {
        ...passingPacket,
        row_labels: ["1-", "1+", "2+", "2-", "3+", "3-"],
      }),
    /row_labels must match/
  );
});

test("octahedral zero-mean correction intake checks live derivative column provenance packets", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const columnPacket = liveDerivativeColumnPacket();
  const evaluated = evaluateLiveDerivativeColumnIntake(baseArtifact, columnPacket);
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeColumnPacket: columnPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.live_derivative_column_intake, evaluated);
  assert.equal(
    artifact.live_derivative_column_intake.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA
  );
  assert.equal(artifact.live_derivative_column_intake.guard_status, "live-derivative-column-provenance-checked");
  assert.deepEqual(artifact.live_derivative_column_intake.omitted_required_live_blocks, []);
  assert.deepEqual(
    artifact.live_derivative_column_intake.column_matrix_preview,
    Array.from({ length: 6 }, () => [1])
  );
  assert.equal(artifact.live_derivative_column_intake.finite_difference_residual_abs_max, 0);
  assert.equal(artifact.live_derivative_column_intake.certifies_live_derivative_matrix, false);
  assert.equal(artifact.live_derivative_column_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(artifact.live_derivative_column_intake.correction_status, "zero-mean-correction-open");
  assert.equal(artifact.live_derivative_column_intake.retention, "not_retained");
  assert.equal(artifact.linear_system_intake.derivative_matrix, null);
  assert.equal(artifact.linear_system_intake.rank, null);
  assert.equal(artifact.linear_system_intake.range_residual, null);
  assert.equal(artifact.result.retained_branch, false);

  assert.throws(
    () =>
      evaluateLiveDerivativeColumnIntake(
        baseArtifact,
        liveDerivativeColumnPacket({
          derivative_column_blocks: REQUIRED_LIVE_DERIVATIVE_BLOCKS.filter((block) => block !== "event"),
        })
      ),
    /omits required live blocks: event/
  );
  assert.throws(
    () =>
      evaluateLiveDerivativeColumnIntake(
        baseArtifact,
        liveDerivativeColumnPacket({
          certifies_live_derivative_matrix: true,
        })
      ),
    /must set certifies_live_derivative_matrix=false/
  );
});

test("octahedral zero-mean correction intake range-probes live derivative column previews without certifying B", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const passingPacket = liveDerivativePreviewPacketWithColumn([1, 1, 1, 1, 1, 1]);
  const passingProbe = evaluateLiveDerivativeColumnPreviewRangeProbe(baseArtifact, passingPacket);
  const passingArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeColumnPacket: passingPacket,
    probeLiveDerivativeColumnPreview: true,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(passingArtifact), []);
  assert.deepEqual(passingArtifact.live_derivative_column_preview_range_probe, passingProbe);
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.claim_scope,
    "live-derivative-column-preview-range-probe-only"
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.matrix_source,
    "live_derivative_column_intake.column_matrix_preview"
  );
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.range_membership_status, "preview-rhs-in-range");
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.preview_range_residual_norm_2, 0);
  assert.deepEqual(passingArtifact.live_derivative_column_preview_range_probe.preview_range_residual_vector, [0, 0, 0, 0, 0, 0]);
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.preview_cokernel_witness.status,
    "preview-cokernel-witness-not-needed"
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.preview_cokernel_witness.normalized_left_null_witness,
    null
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.status,
    "least-squares-preview-computed"
  );
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.equation,
    "B_preview*alpha_preview=-m_frz"
  );
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.alpha_preview_vector.length, 1);
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.residual_norm_2, 0);
  assert.equal(
    passingArtifact.live_derivative_column_preview_range_probe.least_squares_preview.certifies_correction_direction,
    false
  );
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.certifies_live_derivative_matrix, false);
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.certifies_correction_direction, false);
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(passingArtifact.live_derivative_column_preview_range_probe.retention, "not_retained");
  assert.equal(passingArtifact.linear_system_intake.derivative_matrix, null);
  assert.equal(passingArtifact.linear_system_intake.rank, null);
  assert.equal(passingArtifact.linear_system_intake.range_residual, null);
  assert.equal(passingArtifact.linear_system_intake.range_projection, null);
  assert.equal(passingArtifact.linear_system_intake.cokernel_projection, null);
  assert.equal(passingArtifact.result.retained_branch, false);

  const obstructedPacket = liveDerivativePreviewPacketWithColumn([1, -1, 1, -1, 1, -1]);
  const obstructedProbe = evaluateLiveDerivativeColumnPreviewRangeProbe(baseArtifact, obstructedPacket);

  assert.equal(obstructedProbe.range_membership_status, "preview-rhs-out-of-range");
  assert.equal(obstructedProbe.balanced_column_status, "candidate-columns-balanced");
  assert.equal(obstructedProbe.cokernel_obstruction_status, "left-null-constant-covector-obstructs");
  assert.ok(obstructedProbe.preview_range_residual_norm_2 > 2);
  assert.equal(obstructedProbe.preview_cokernel_witness.claim_scope, "preview-cokernel-witness-only");
  assert.equal(obstructedProbe.preview_cokernel_witness.status, "preview-only-cokernel-witness");
  assert.equal(obstructedProbe.preview_cokernel_witness.witness_source, "preview_range_residual");
  assert.equal(obstructedProbe.preview_cokernel_witness.normalized_left_null_witness.length, 6);
  assert.ok(obstructedProbe.preview_cokernel_witness.witness_dot_preview_columns_abs_max <= 1e-9);
  assert.ok(obstructedProbe.preview_cokernel_witness.witness_dot_rhs > 2);
  assert.equal(obstructedProbe.preview_cokernel_witness.certifies_correction_direction, false);
  assert.equal(obstructedProbe.preview_cokernel_witness.retention, "not_retained");
  assert.equal(obstructedProbe.least_squares_preview.status, "least-squares-preview-computed");
  assert.ok(obstructedProbe.least_squares_preview.residual_norm_2 > 2);
  assert.equal(obstructedProbe.least_squares_preview.certifies_correction_direction, false);
  assert.equal(obstructedProbe.least_squares_preview.retention, "not_retained");

  const duplicatePacket = liveDerivativePreviewPacketWithColumns([
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ]);
  const duplicateProbe = evaluateLiveDerivativeColumnPreviewRangeProbe(baseArtifact, duplicatePacket);

  assert.equal(duplicateProbe.matrix_rank, 1);
  assert.equal(duplicateProbe.least_squares_preview.status, "least-squares-preview-rank-deficient-not-computed");
  assert.equal(duplicateProbe.least_squares_preview.alpha_preview_vector, null);
  assert.equal(duplicateProbe.least_squares_preview.fitted_rhs_preview, null);
  assert.equal(duplicateProbe.least_squares_preview.certifies_correction_direction, false);
  assert.equal(duplicateProbe.preview_cokernel_witness.status, "preview-cokernel-witness-not-needed");
});

test("octahedral zero-mean correction intake certifies same-ledger derivative matrix range verdicts", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const passingPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const passingCertificate = evaluateLiveDerivativeMatrixCertificate(baseArtifact, passingPacket);
  const passingArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: passingPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(passingArtifact), []);
  assert.deepEqual(passingArtifact.live_derivative_matrix_certificate, passingCertificate);
  assert.equal(
    passingArtifact.live_derivative_matrix_certificate.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA
  );
  assert.equal(passingArtifact.artifact_claim.certifies_live_derivative_matrix, true);
  assert.equal(passingArtifact.artifact_claim.certifies_correction_direction, false);
  assert.equal(passingArtifact.live_derivative_matrix_certificate.range_membership_status, "live-rhs-in-range");
  assert.equal(passingArtifact.live_derivative_matrix_certificate.range_certificate_status, "certified-live-rhs-in-range");
  assert.equal(passingArtifact.linear_system_intake.live_derivative_status, "live-derivative-matrix-certified");
  assert.deepEqual(passingArtifact.linear_system_intake.derivative_matrix, Array.from({ length: 6 }, () => [1]));
  assert.equal(passingArtifact.linear_system_intake.rank, 1);
  assert.deepEqual(passingArtifact.linear_system_intake.range_residual, [0, 0, 0, 0, 0, 0]);
  assert.equal(passingArtifact.linear_system_intake.range_residual_norm_2, 0);
  assert.deepEqual(
    passingArtifact.linear_system_intake.range_projection,
    passingArtifact.linear_system_intake.rhs_vector
  );
  assert.equal(
    passingArtifact.linear_system_intake.cokernel_projection.status,
    "live-cokernel-witness-not-needed"
  );
  assert.equal(passingArtifact.residual_vector.first_failure_row, "correction-direction-open");
  assert.equal(passingArtifact.result.retention, "not_retained");
  assert.equal(passingArtifact.result.retained_branch, false);

  const obstructedPacket = liveDerivativeMatrixPacket([[1], [-1], [1], [-1], [1], [-1]], {
    matrix_id: "same-ledger-balanced-column-fail",
    column_labels: ["zero_sum_live_direction"],
  });
  const obstructedArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: obstructedPacket,
  });

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(obstructedArtifact), []);
  assert.equal(obstructedArtifact.live_derivative_matrix_certificate.range_membership_status, "live-rhs-out-of-range");
  assert.equal(
    obstructedArtifact.live_derivative_matrix_certificate.range_certificate_status,
    "certified-live-rhs-out-of-range"
  );
  assert.equal(
    obstructedArtifact.live_derivative_matrix_certificate.certified_cokernel_witness.status,
    "certified-live-cokernel-obstruction"
  );
  assert.equal(
    obstructedArtifact.live_derivative_matrix_certificate.certified_cokernel_witness.claim_scope,
    "certified-live-cokernel-witness"
  );
  assert.equal(
    obstructedArtifact.linear_system_intake.cokernel_projection.status,
    "certified-live-cokernel-obstruction"
  );
  assert.ok(
    obstructedArtifact.live_derivative_matrix_certificate.certified_cokernel_witness
      .witness_dot_live_columns_abs_max <= 1e-9
  );
  assert.ok(obstructedArtifact.live_derivative_matrix_certificate.live_range_residual_norm_2 > 2);
  assert.equal(obstructedArtifact.residual_vector.first_failure_row, "correction-obstruction-certified");
  assert.equal(obstructedArtifact.result.retained_branch, false);

  assert.throws(
    () =>
      evaluateLiveDerivativeMatrixCertificate(
        baseArtifact,
        liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
          certifies_correction_direction: true,
        })
      ),
    /must set certifies_correction_direction=false/
  );
  assert.throws(
    () =>
      evaluateLiveDerivativeMatrixCertificate(
        baseArtifact,
        liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
          guards: {
            ...passedLiveDerivativeGuards(),
            event_guard: "open",
          },
        })
      ),
    /event_guard must be passed/
  );

  const forgedArtifact = {
    ...baseArtifact,
    linear_system_intake: {
      ...baseArtifact.linear_system_intake,
      derivative_matrix: Array.from({ length: 6 }, () => [1]),
    },
  };
  assert.match(
    validateOctahedralZeroMeanCorrectionIntake(forgedArtifact).join("; "),
    /derivative matrix must not be claimed/
  );
});

test("octahedral zero-mean correction intake certifies first-order correction directions without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
  });
  const evaluatedDirection = evaluateLiveCorrectionDirectionCertificate(
    buildOctahedralZeroMeanCorrectionIntake({
      phaseSamples: 120,
      ySubdivisions: 240,
      liveDerivativeMatrixPacket: matrixPacket,
    }),
    directionPacket
  );

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.live_correction_direction_certificate, evaluatedDirection);
  assert.equal(
    artifact.live_correction_direction_certificate.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.certifies_live_derivative_matrix, true);
  assert.equal(artifact.artifact_claim.certifies_correction_direction, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.live_correction_direction_certificate.correction_status, "correction-direction-found");
  assert.equal(artifact.live_correction_direction_certificate.downstream_status, "bounded-speed-live-ledger-open");
  assert.equal(artifact.live_correction_direction_certificate.retention, "not_retained");
  assert.equal(artifact.linear_system_intake.correction_status, "correction-direction-found");
  assert.equal(artifact.linear_system_intake.alpha_b_vector.length, 1);
  assert.equal(artifact.linear_system_intake.solution_alpha_vector.length, 1);
  assert.equal(
    artifact.linear_system_intake.alpha_b_vector[0],
    artifact.frozen_mean_vector.period_integral_vector[0] * -1
  );
  assert.equal(artifact.linear_system_intake.alpha_b_residual_norm_2, 0);
  assert.equal(artifact.linear_system_intake.solution_residual_norm_2, 0);
  assert.equal(
    artifact.linear_system_intake.correction_direction_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA
  );
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(artifact.result.intake_status, "zero-mean-live-correction-direction-certified");
  assert.equal(artifact.result.correction_direction, "found_first_order_not_retained");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveCorrectionDirectionPacket: directionPacket,
      }),
    /requires an attached live derivative matrix certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: liveDerivativeMatrixPacket([[1], [-1], [1], [-1], [1], [-1]], {
          matrix_id: "same-ledger-balanced-column-fail",
          column_labels: ["zero_sum_live_direction"],
        }),
        liveCorrectionDirectionPacket: liveCorrectionDirectionPacket({
          source_live_derivative_matrix_id: "same-ledger-balanced-column-fail",
          alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
        }),
      }),
    /requires certified-live-rhs-in-range/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: liveCorrectionDirectionPacket({
          alpha_b_vector: [0],
        }),
      }),
    /alpha_B residual/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: liveCorrectionDirectionPacket({
          alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
          first_order_margin_guards: {
            ...passedCorrectionDirectionGuards(),
            speed_band_margin_guard: "open",
          },
        }),
      }),
    /speed_band_margin_guard must be passed/
  );
});

test("octahedral zero-mean correction intake certifies post-correction speed primitive feasibility without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const correctionArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
  });
  const evaluatedPrimitive = evaluateSpeedPrimitiveFeasibilityCertificate(correctionArtifact, primitivePacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.speed_ode_primitive_feasibility_certificate, evaluatedPrimitive);
  assert.equal(
    artifact.speed_ode_primitive_feasibility_certificate.schema,
    OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.certifies_speed_primitive_feasibility, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    artifact.speed_ode_primitive_feasibility_certificate.speed_primitive_status,
    "speed-primitive-feasibility-certified"
  );
  assert.equal(
    artifact.speed_ode_primitive_feasibility_certificate.guard_status,
    "speed-primitive-return-and-band-passed"
  );
  assert.equal(artifact.speed_ode_primitive_feasibility_certificate.downstream_status, "clock-length-return-open");
  assert.equal(artifact.speed_ode_primitive_feasibility_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.speed_ode_primitive_feasibility_certificate.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-speed-primitive-feasibility-certified");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "clock-length-return-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) => row.row === "R_speed_ode_primitive_feasibility" && row.status === "passed"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
      }),
    /requires an attached live correction direction certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          source_correction_direction_id: "wrong-alpha-id",
        }),
      }),
    /source_correction_direction_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          receiver_primitives: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            primitive_return_residual: 1e-3,
            primitive_excursion_min: -0.1,
            primitive_excursion_max: 0.1,
            nu_initial: 1,
            speed_band_lower: 0.5,
            speed_band_upper: 1.5,
          })),
        }),
      }),
    /primitive return residual/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          receiver_primitives: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            primitive_return_residual: 0,
            primitive_excursion_min: -0.1,
            primitive_excursion_max: 0.1,
            nu_initial: 1,
            speed_band_lower: 0.95,
            speed_band_upper: 1.05,
          })),
        }),
      }),
    /speed band margin/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: speedPrimitiveFeasibilityPacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
});

test("octahedral zero-mean correction intake certifies post-correction speed clock length without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const primitiveArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
  });
  const evaluatedClockLength = evaluateSpeedClockLengthCertificate(primitiveArtifact, clockPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.speed_ode_clock_length_certificate, evaluatedClockLength);
  assert.equal(artifact.speed_ode_clock_length_certificate.schema, OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA);
  assert.equal(artifact.artifact_claim.certifies_speed_clock_length, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.speed_ode_clock_length_certificate.speed_clock_length_status, "speed-clock-length-return-certified");
  assert.equal(artifact.speed_ode_clock_length_certificate.guard_status, "speed-clock-length-return-passed");
  assert.equal(artifact.speed_ode_clock_length_certificate.downstream_status, "normal-reconstruction-open");
  assert.equal(artifact.speed_ode_clock_length_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.speed_ode_clock_length_certificate.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-speed-clock-length-certified");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "normal-reconstruction-open");
  assert.equal(
    artifact.residual_vector.rows.some((row) => row.row === "R_speed_ode_clock_length_return" && row.status === "passed"),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedClockLengthPacket: clockPacket,
      }),
    /requires an attached speed primitive feasibility certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          source_speed_primitive_feasibility_id: "wrong-primitive-id",
        }),
      }),
    /source_speed_primitive_feasibility_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          receiver_clock_length_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            center_time_period: 2,
            target_length: 2,
            winding_number: 1,
            nu_initial: 1,
            primitive_integral: 0.001,
            length_return_residual: 1e-3,
          })),
        }),
      }),
    /length return residual/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          receiver_clock_length_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            center_time_period: 2,
            target_length: 2,
            winding_number: 1,
            nu_initial: 1,
            primitive_integral: 0.25,
            length_return_residual: 0,
          })),
        }),
      }),
    /length residual mismatch/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: speedClockLengthPacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
});

test("octahedral zero-mean correction intake stages normal reconstruction handoff without certification", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const handoffPacket = normalReconstructionHandoffPacket();
  const clockArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
  });
  const evaluatedHandoff = evaluateNormalReconstructionHandoff(clockArtifact, handoffPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.normal_reconstruction_handoff, evaluatedHandoff);
  assert.equal(artifact.normal_reconstruction_handoff.schema, OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA);
  assert.equal(artifact.artifact_claim.emits_normal_reconstruction_handoff, true);
  assert.equal(artifact.artifact_claim.certifies_normal_reconstruction, false);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    artifact.normal_reconstruction_handoff.normal_reconstruction_handoff_status,
    "normal-reconstruction-handoff-staged"
  );
  assert.equal(artifact.normal_reconstruction_handoff.normal_reconstruction_status, "normal-reconstruction-open");
  assert.equal(artifact.normal_reconstruction_handoff.certifies_normal_reconstruction, false);
  assert.equal(artifact.normal_reconstruction_handoff.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.normal_reconstruction_handoff.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-normal-reconstruction-handoff-staged");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "normal-reconstruction-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) => row.row === "R_normal_reconstruction_handoff" && row.status === "open"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        normalReconstructionHandoffPacket: handoffPacket,
      }),
    /requires an attached speed clock length certificate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          source_speed_clock_length_id: "wrong-clock-length-id",
        }),
      }),
    /source_speed_clock_length_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          certifies_normal_reconstruction: true,
        }),
      }),
    /must set certifies_normal_reconstruction=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: normalReconstructionHandoffPacket({
          receiver_normal_handoff_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            normal_residual_norm_2: Number.NaN,
            tangent_holonomy_residual_norm_2: 0.125,
            position_closure_residual_norm_2: 0.0625,
            unit_tangent_residual_abs_max: 0,
            support_margin_min: 0.5,
          })),
        }),
      }),
    /normal residual norms must be nonnegative finite numbers/
  );
});

test("octahedral zero-mean correction intake certifies bounded-speed normal reconstruction candidate without retention", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const handoffPacket = normalReconstructionHandoffPacket();
  const candidatePacket = boundedSpeedNormalReconstructionCandidatePacket();
  const handoffArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
  });
  const evaluatedCandidate = evaluateBoundedSpeedNormalReconstructionCandidate(handoffArtifact, candidatePacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.bounded_speed_normal_reconstruction_candidate, evaluatedCandidate);
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.schema,
    OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.emits_bounded_speed_normal_reconstruction_candidate, true);
  assert.equal(artifact.artifact_claim.certifies_normal_reconstruction, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.candidate_status,
    "bounded-speed-normal-reconstruction-candidate"
  );
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.downstream_status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.certifies_normal_reconstruction, true);
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.retention, "not_retained");
  assert.equal(artifact.result.intake_status, "zero-mean-bounded-speed-normal-reconstruction-candidate");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) => row.row === "R_bounded_speed_normal_reconstruction_candidate" && row.status === "passed"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
      }),
    /requires an attached normal reconstruction handoff/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          source_normal_handoff_id: "wrong-normal-handoff-id",
        }),
      }),
    /source_normal_handoff_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          tangent_holonomy_status: "normal-holonomy-open",
        }),
      }),
    /tangent holonomy row must be closed/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          receiver_normal_candidate_rows: RECEIVER_LABELS.map((receiver_label) => ({
            receiver_label,
            normal_residual_norm_2: 2e-9,
            tangent_holonomy_residual_norm_2: 0,
            position_closure_residual_norm_2: 0,
            unit_tangent_residual_abs_max: 0,
            support_margin_min: 0.5,
            noncollision_margin_min: 0.25,
            root_persistence_margin_min: 0.125,
            krawczyk_residual_norm_2: 0,
          })),
        }),
      }),
    /normal residuals must be inside tolerance/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          margin_floors: {
            support_margin_min: 1,
            noncollision_margin_min: 0,
            root_persistence_margin_min: 0,
          },
        }),
      }),
    /support margins must clear the floor/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          certifies_bounded_speed_live_ledger: true,
        }),
      }),
    /must set certifies_bounded_speed_live_ledger=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: boundedSpeedNormalReconstructionCandidatePacket({
          retained_branch: true,
        }),
      }),
    /must set retained_branch=false/
  );
});

test("octahedral zero-mean correction intake emits fail-closed action stability boundary after normal candidate", () => {
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const matrixPacket = liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
    matrix_id: "same-ledger-constant-column-pass",
    column_labels: ["constant_receiver_direction"],
  });
  const directionPacket = liveCorrectionDirectionPacket({
    alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
  });
  const primitivePacket = speedPrimitiveFeasibilityPacket();
  const clockPacket = speedClockLengthPacket();
  const handoffPacket = normalReconstructionHandoffPacket();
  const candidatePacket = boundedSpeedNormalReconstructionCandidatePacket();
  const actionPacket = actionStabilityAfterNormalCandidatePacket();
  const candidateArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
  });
  const artifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
    liveDerivativeMatrixPacket: matrixPacket,
    liveCorrectionDirectionPacket: directionPacket,
    speedPrimitiveFeasibilityPacket: primitivePacket,
    speedClockLengthPacket: clockPacket,
    normalReconstructionHandoffPacket: handoffPacket,
    boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
    actionStabilityAfterNormalCandidatePacket: actionPacket,
  });
  const evaluatedIntake = evaluateActionStabilityAfterNormalCandidateIntake(candidateArtifact, actionPacket);

  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.deepEqual(artifact.action_stability_after_normal_candidate_intake, evaluatedIntake);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA
  );
  assert.equal(artifact.artifact_claim.emits_action_stability_after_normal_candidate_intake, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.certifies_action_stability, false);
  assert.equal(artifact.artifact_claim.certifies_observer_export, false);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.source_normal_reconstruction_candidate_id,
    artifact.bounded_speed_normal_reconstruction_candidate.normal_reconstruction_candidate_id
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.live_ledger_status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.intake_status,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger.consumer_checksum_id,
    artifact.bounded_speed_normal_reconstruction_candidate.consumer_checksum_id
  );
  assert.deepEqual(
    Object.keys(
      artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
        .required_same_ledger_rows
    ),
    REQUIRED_BOUNDED_SPEED_LIVE_LEDGER_TARGET_ROWS.map(([row]) => row)
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.action_derived_scale.downstream_row,
    "action_scale"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.noether_event_exchange.status,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.first_failure_row,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.downstream_row_statuses.action_scale,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.downstream_row_statuses.coupled_fixed_point,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.certifies_bounded_speed_live_ledger,
    false
  );
  assert.equal(artifact.action_stability_after_normal_candidate_intake.certifies_action_stability, false);
  assert.equal(artifact.action_stability_after_normal_candidate_intake.certifies_observer_export, false);
  assert.equal(artifact.action_stability_after_normal_candidate_intake.retention, "not_retained");
  assert.equal(artifact.action_stability_after_normal_candidate_intake.retained_branch, false);
  assert.equal(artifact.result.intake_status, "zero-mean-action-stability-after-normal-candidate-blocked");
  assert.equal(artifact.result.action_stability, "not_certified");
  assert.equal(artifact.result.observer_export, "not_authorized");
  assert.equal(artifact.result.retention, "not_retained");
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(
    artifact.residual_vector.rows.some(
      (row) =>
        row.row === "R_bounded_speed_action_stability_after_normal_candidate" &&
        row.status === "open" &&
        row.value === "bounded-speed-live-ledger-open"
    ),
    true
  );

  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        actionStabilityAfterNormalCandidatePacket: actionPacket,
      }),
    /requires an attached bounded speed normal reconstruction candidate/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_ledger_id: "wrong-ledger",
        }),
      }),
    /bounded_speed_ledger_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: undefined,
        }),
      }),
    /must declare bounded_speed_live_ledger target/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          bounded_speed_live_ledger: {
            ...actionPacket.bounded_speed_live_ledger,
            consumer_checksum_id: "wrong-consumer-checksum",
          },
        }),
      }),
    /bounded_speed_live_ledger consumer_checksum_id must match/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          downstream_row_statuses: {
            ...actionPacket.downstream_row_statuses,
            action_curl: "action-curl-open",
          },
        }),
      }),
    /downstream row action_curl must be blocked:bounded-speed-live-ledger-open/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          certifies_action_stability: true,
        }),
      }),
    /must set certifies_action_stability=false/
  );
  assert.throws(
    () =>
      buildOctahedralZeroMeanCorrectionIntake({
        phaseSamples: 120,
        ySubdivisions: 240,
        liveDerivativeMatrixPacket: matrixPacket,
        liveCorrectionDirectionPacket: directionPacket,
        speedPrimitiveFeasibilityPacket: primitivePacket,
        speedClockLengthPacket: clockPacket,
        normalReconstructionHandoffPacket: handoffPacket,
        boundedSpeedNormalReconstructionCandidatePacket: candidatePacket,
        actionStabilityAfterNormalCandidatePacket: actionStabilityAfterNormalCandidatePacket({
          retained_branch: true,
        }),
      }),
    /must set retained_branch=false/
  );
});

test("octahedral zero-mean correction intake CLI emits and validates JSON artifacts", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-zero-mean-intake-"));
  const artifactPath = path.join(tempDir, "artifact.json");
  const candidatePath = path.join(tempDir, "candidate-b-pass.json");
  const failCandidatePath = path.join(tempDir, "candidate-b-fail.json");
  const liveDerivativeColumnPath = path.join(tempDir, "live-derivative-columns.json");
  const liveDerivativeMatrixPath = path.join(tempDir, "live-derivative-matrix.json");
  const liveCorrectionDirectionPath = path.join(tempDir, "live-correction-direction.json");
  const speedPrimitiveFeasibilityPath = path.join(tempDir, "speed-primitive-feasibility.json");
  const speedClockLengthPath = path.join(tempDir, "speed-clock-length.json");
  const normalReconstructionHandoffPath = path.join(tempDir, "normal-reconstruction-handoff.json");
  const boundedSpeedNormalReconstructionCandidatePath = path.join(
    tempDir,
    "bounded-speed-normal-reconstruction-candidate.json"
  );
  const actionStabilityAfterNormalCandidatePath = path.join(
    tempDir,
    "action-stability-after-normal-candidate.json"
  );
  const baseArtifact = buildOctahedralZeroMeanCorrectionIntake({
    phaseSamples: 120,
    ySubdivisions: 240,
  });
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs", import.meta.url)
  );
  fs.writeFileSync(
    candidatePath,
    `${JSON.stringify(
      candidateBPacket(Array.from({ length: 6 }, () => [1]), {
        matrix_id: "constant-column-pass",
        column_labels: ["constant_receiver_column"],
      })
    )}\n`
  );
  fs.writeFileSync(
    failCandidatePath,
    `${JSON.stringify(
      candidateBPacket([[1], [-1], [1], [-1], [1], [-1]], {
        matrix_id: "balanced-column-fail",
        column_labels: ["zero_sum_column"],
      })
    )}\n`
  );
  fs.writeFileSync(liveDerivativeColumnPath, `${JSON.stringify(liveDerivativeColumnPacket())}\n`);
  fs.writeFileSync(
    liveDerivativeMatrixPath,
    `${JSON.stringify(
      liveDerivativeMatrixPacket(Array.from({ length: 6 }, () => [1]), {
        matrix_id: "same-ledger-constant-column-pass",
        column_labels: ["constant_receiver_direction"],
      })
    )}\n`
  );
  fs.writeFileSync(
    liveCorrectionDirectionPath,
    `${JSON.stringify(
      liveCorrectionDirectionPacket({
        alpha_b_vector: [baseArtifact.linear_system_intake.rhs_vector[0]],
      })
    )}\n`
  );
  fs.writeFileSync(speedPrimitiveFeasibilityPath, `${JSON.stringify(speedPrimitiveFeasibilityPacket())}\n`);
  fs.writeFileSync(speedClockLengthPath, `${JSON.stringify(speedClockLengthPacket())}\n`);
  fs.writeFileSync(normalReconstructionHandoffPath, `${JSON.stringify(normalReconstructionHandoffPacket())}\n`);
  fs.writeFileSync(
    boundedSpeedNormalReconstructionCandidatePath,
    `${JSON.stringify(boundedSpeedNormalReconstructionCandidatePacket())}\n`
  );
  fs.writeFileSync(
    actionStabilityAfterNormalCandidatePath,
    `${JSON.stringify(actionStabilityAfterNormalCandidatePacket())}\n`
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--samples",
      "120",
      "--subdivisions",
      "240",
      "--candidate-b",
      candidatePath,
      "--live-derivative-columns",
      liveDerivativeColumnPath,
      "--probe-live-derivative-preview",
      "--live-derivative-matrix",
      liveDerivativeMatrixPath,
      "--live-correction-direction",
      liveCorrectionDirectionPath,
      "--speed-primitive-feasibility",
      speedPrimitiveFeasibilityPath,
      "--speed-clock-length",
      speedClockLengthPath,
      "--normal-reconstruction-handoff",
      normalReconstructionHandoffPath,
      "--bounded-speed-normal-reconstruction-candidate",
      boundedSpeedNormalReconstructionCandidatePath,
      "--action-stability-after-normal-candidate",
      actionStabilityAfterNormalCandidatePath,
      "--out",
      artifactPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.deepEqual(validateOctahedralZeroMeanCorrectionIntake(artifact), []);
  assert.equal(artifact.live_derivative_column_intake.guard_status, "live-derivative-column-provenance-checked");
  assert.equal(
    artifact.live_derivative_column_preview_range_probe.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  assert.equal(validation.valid, true);
  assert.equal(validation.result.intake_status, "zero-mean-action-stability-after-normal-candidate-blocked");
  assert.equal(validation.result.correction_direction, "found_first_order_not_retained");
  assert.equal(validation.result.action_stability, "not_certified");
  assert.equal(validation.result.observer_export, "not_authorized");
  assert.equal(validation.result.retention, "not_retained");
  assert.equal(validation.result.retained_branch, false);
  assert.equal(validation.linear_system_intake.live_derivative_status, "live-derivative-matrix-certified");
  assert.equal(validation.linear_system_intake.range_certificate_status, "certified-live-rhs-in-range");
  assert.equal(validation.candidate_b_range_probe.range_membership_status, "candidate-rhs-in-range");
  assert.equal(validation.live_derivative_column_intake.live_derivative_status, "live-ledger-derivative-open");
  assert.equal(validation.live_derivative_column_preview_range_probe.range_membership_status, "preview-rhs-in-range");
  assert.equal(validation.live_derivative_matrix_certificate.range_membership_status, "live-rhs-in-range");
  assert.equal(validation.live_correction_direction_certificate.correction_status, "correction-direction-found");
  assert.equal(validation.live_correction_direction_certificate.retention, "not_retained");
  assert.equal(
    validation.speed_ode_primitive_feasibility_certificate.speed_primitive_status,
    "speed-primitive-feasibility-certified"
  );
  assert.equal(validation.speed_ode_primitive_feasibility_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    validation.speed_ode_clock_length_certificate.speed_clock_length_status,
    "speed-clock-length-return-certified"
  );
  assert.equal(validation.speed_ode_clock_length_certificate.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    validation.normal_reconstruction_handoff.normal_reconstruction_handoff_status,
    "normal-reconstruction-handoff-staged"
  );
  assert.equal(validation.normal_reconstruction_handoff.certifies_normal_reconstruction, false);
  assert.equal(validation.normal_reconstruction_handoff.certifies_bounded_speed_live_ledger, false);
  assert.equal(
    validation.bounded_speed_normal_reconstruction_candidate.candidate_status,
    "bounded-speed-normal-reconstruction-candidate"
  );
  assert.equal(validation.bounded_speed_normal_reconstruction_candidate.certifies_normal_reconstruction, true);
  assert.equal(
    validation.bounded_speed_normal_reconstruction_candidate.certifies_bounded_speed_live_ledger,
    false
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.first_failure_row,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.coupled_fixed_point.status,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.downstream_row_statuses.action_scale,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.certifies_action_stability,
    false
  );
  assert.equal(
    validation.action_stability_after_normal_candidate_intake.certifies_observer_export,
    false
  );
  assert.equal(validation.action_stability_after_normal_candidate_intake.retained_branch, false);

  const validationWithColumnPacket = JSON.parse(
    execFileSync(
      process.execPath,
      [scriptPath, "--validate", artifactPath, "--live-derivative-columns", liveDerivativeColumnPath, "--probe-live-derivative-preview"],
      {
        encoding: "utf8",
      }
    )
  );
  assert.equal(validationWithColumnPacket.valid, true);
  assert.equal(
    validationWithColumnPacket.live_derivative_column_intake.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA
  );
  assert.equal(
    validationWithColumnPacket.live_derivative_column_preview_range_probe.schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );

  const validationWithFailProbe = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath, "--candidate-b", failCandidatePath], {
      encoding: "utf8",
    })
  );
  assert.equal(validationWithFailProbe.valid, true);
  assert.equal(validationWithFailProbe.candidate_b_range_probe.range_membership_status, "candidate-rhs-out-of-range");

  const schema = JSON.parse(execFileSync(process.execPath, [scriptPath, "--schema"], { encoding: "utf8" }));
  assert.equal(schema.artifact_schema, OCTAHEDRAL_ZERO_MEAN_CORRECTION_INTAKE_SCHEMA);
  assert.equal(schema.candidate_b_schema, OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_SCHEMA);
  assert.equal(schema.candidate_b_range_probe_schema, OCTAHEDRAL_ZERO_MEAN_CANDIDATE_B_RANGE_PROBE_SCHEMA);
  assert.equal(schema.live_derivative_column_intake_schema, OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_INTAKE_SCHEMA);
  assert.equal(
    schema.live_derivative_column_preview_range_probe_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_COLUMN_PREVIEW_RANGE_PROBE_SCHEMA
  );
  assert.equal(
    schema.live_derivative_matrix_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_DERIVATIVE_MATRIX_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.live_correction_direction_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_LIVE_CORRECTION_DIRECTION_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.speed_primitive_feasibility_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_SPEED_PRIMITIVE_FEASIBILITY_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.speed_clock_length_certificate_schema,
    OCTAHEDRAL_ZERO_MEAN_SPEED_CLOCK_LENGTH_CERTIFICATE_SCHEMA
  );
  assert.equal(
    schema.normal_reconstruction_handoff_schema,
    OCTAHEDRAL_ZERO_MEAN_NORMAL_RECONSTRUCTION_HANDOFF_SCHEMA
  );
  assert.equal(
    schema.bounded_speed_normal_reconstruction_candidate_schema,
    OCTAHEDRAL_ZERO_MEAN_BOUNDED_SPEED_NORMAL_RECONSTRUCTION_CANDIDATE_SCHEMA
  );
  assert.equal(
    schema.action_stability_after_normal_candidate_intake_schema,
    OCTAHEDRAL_ZERO_MEAN_ACTION_STABILITY_AFTER_NORMAL_CANDIDATE_INTAKE_SCHEMA
  );
});

test("octahedral zero-mean correction intake validates committed normal-candidate fixture", () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "neutral-braid-zero-mean-fixture-"));
  const artifactPath = path.join(tempDir, "fixture-artifact.json");
  const scriptPath = fileURLToPath(
    new URL("../scripts/neutral-braid/octahedral-zero-mean-correction-intake.mjs", import.meta.url)
  );
  const fixtureDir = fileURLToPath(
    new URL("../scripts/neutral-braid/fixtures/zero-mean-normal-candidate/", import.meta.url)
  );

  execFileSync(
    process.execPath,
    [
      scriptPath,
      "--samples",
      "120",
      "--subdivisions",
      "240",
      "--live-derivative-matrix",
      path.join(fixtureDir, "live-derivative-matrix.json"),
      "--live-correction-direction",
      path.join(fixtureDir, "live-correction-direction.json"),
      "--speed-primitive-feasibility",
      path.join(fixtureDir, "speed-primitive-feasibility.json"),
      "--speed-clock-length",
      path.join(fixtureDir, "speed-clock-length.json"),
      "--normal-reconstruction-handoff",
      path.join(fixtureDir, "normal-reconstruction-handoff.json"),
      "--bounded-speed-normal-reconstruction-candidate",
      path.join(fixtureDir, "bounded-speed-normal-reconstruction-candidate.json"),
      "--action-stability-after-normal-candidate",
      path.join(fixtureDir, "action-stability-after-normal-candidate.json"),
      "--out",
      artifactPath,
      "--pretty",
    ],
    { encoding: "utf8" }
  );

  const validation = JSON.parse(
    execFileSync(process.execPath, [scriptPath, "--validate", artifactPath], { encoding: "utf8" })
  );
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  assert.equal(validation.valid, true);
  assert.equal(artifact.result.intake_status, "zero-mean-action-stability-after-normal-candidate-blocked");
  assert.equal(artifact.residual_vector.first_failure_row, "bounded-speed-live-ledger-open");
  assert.equal(artifact.artifact_claim.emits_bounded_speed_normal_reconstruction_candidate, true);
  assert.equal(artifact.artifact_claim.emits_action_stability_after_normal_candidate_intake, true);
  assert.equal(artifact.artifact_claim.certifies_normal_reconstruction, true);
  assert.equal(artifact.artifact_claim.certifies_bounded_speed_live_ledger, false);
  assert.equal(artifact.artifact_claim.certifies_action_stability, false);
  assert.equal(artifact.artifact_claim.certifies_observer_export, false);
  assert.equal(artifact.result.retained_branch, false);
  assert.equal(
    artifact.bounded_speed_normal_reconstruction_candidate.candidate_status,
    "bounded-speed-normal-reconstruction-candidate"
  );
  assert.equal(artifact.bounded_speed_normal_reconstruction_candidate.retained_branch, false);
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.first_failure_row,
    "bounded-speed-live-ledger-open"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.bounded_speed_live_ledger
      .required_same_ledger_rows.action_derived_scale.downstream_row,
    "action_scale"
  );
  assert.equal(
    artifact.action_stability_after_normal_candidate_intake.downstream_row_statuses.observer_export_eligibility,
    "blocked:bounded-speed-live-ledger-open"
  );
  assert.equal(artifact.action_stability_after_normal_candidate_intake.retained_branch, false);
});
