import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

import {
  FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD,
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA,
  PHASE_ORDER_MEASUREMENT_ROW_SCHEMA,
  RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA,
  RESIDUAL_MEASUREMENT_ROW_SCHEMA,
  SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA,
  SCHEMA,
  buildAcceptedMeasurementBraidIdealChiralityRetainedHistoryTarget,
  buildBraidIdealChiralityRetainedHistoryTarget,
  buildProviderBackedBraidIdealChiralityRetainedHistoryTarget,
  evaluateBraidIdealChiralityRetainedHistoryTargetEvidence,
  validateBraidIdealChiralityRetainedHistoryTarget,
} from "../scripts/braid-ideal/matter-antimatter-chirality-retained-history-target.mjs";
import { buildCentralSolverRetainedHistoryRow } from "../scripts/braid-ideal/central-solver-retained-history-row.mjs";

const SCRIPT_PATH = fileURLToPath(
  new URL("../scripts/braid-ideal/matter-antimatter-chirality-retained-history-target.mjs", import.meta.url)
);

test("chirality retained-history target emits deterministic paired central-solver row schema", () => {
  const first = buildBraidIdealChiralityRetainedHistoryTarget();
  const second = buildBraidIdealChiralityRetainedHistoryTarget();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(
    first.artifact_status,
    "priority_only_chirality_target_present_retained_evidence_blocked"
  );
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.central_solver_row_schema.schema_id, SCHEMA);
  assert.equal(first.central_solver_row_schema.required_source_schema, "central_solver_retained_history_row.v0");
  assert.equal(first.central_solver_row_schema.required_residual_components.length, 9);
  assert.equal(first.central_solver_retained_history_row_request.consumed_schema, "central_solver_retained_history_row.v0");
  assert.equal(first.paired_rows.length, 2);
  assert.deepEqual(
    first.paired_rows.map((row) => row.chi_c),
    [1, -1]
  );
  assert.equal(first.support_projection.accepted_static_support_table_evidence, false);
  assert.deepEqual(validateBraidIdealChiralityRetainedHistoryTarget(first), []);
});

test("chirality target carries residuals and retained-history component obligations", () => {
  const artifact = buildBraidIdealChiralityRetainedHistoryTarget();
  const residualKeys = Object.keys(artifact.residual_vector);

  assert.deepEqual(residualKeys, [
    "R_phase",
    "R_root",
    "R_self",
    "R_wake",
    "R_action",
    "R_J",
    "R_support",
    "R_return",
    "R_charge",
  ]);
  assert.equal(
    residualKeys.every((key) => artifact.residual_vector[key].first_missing_field === FIRST_MISSING_FIELD),
    true
  );
  for (const row of artifact.paired_rows) {
    assert.equal(row.central_solver_retained_history_row_ref, null);
    assert.equal(row.retained_record_id, null);
    assert.equal(row.required_retained_history_components.includes("same_source_self_hit_rows"), true);
    assert.equal(row.required_retained_history_components.includes("same_record_angular_momentum_rows"), true);
    assert.equal(row.required_retained_history_components.includes("spherical_support_projection_rows"), true);
    assert.equal(row.support_projection_requirement.support_class_is_output_diagnostic, true);
  }
  assert.equal(
    artifact.conjugation_map.polarity_relabel_operation,
    "not_the_matter_antimatter_operation"
  );
  assert.equal(artifact.conjugation_map.support_section_is_output_diagnostic, true);
});

test("chirality target sharpens wrong or missing central-solver row inputs", () => {
  const missing = buildBraidIdealChiralityRetainedHistoryTarget({
    centralSolverRetainedHistoryRow: null,
  });
  assert.equal(missing.artifact_status, "fail_closed_missing_central_solver_retained_history_row");
  assert.equal(missing.first_missing_object, "central_solver_retained_history_row");
  assert.equal(missing.first_missing_field, "central_solver_retained_history_row");

  const wrongSchema = buildBraidIdealChiralityRetainedHistoryTarget({
    centralSolverRetainedHistoryRow: { schema: "fixture.v0" },
  });
  assert.equal(wrongSchema.artifact_status, "fail_closed_wrong_central_solver_row_schema");
  assert.equal(wrongSchema.first_missing_field, "central_solver_retained_history_row.schema");

  const retainedRow = buildCentralSolverRetainedHistoryRow();
  const withProvider = buildBraidIdealChiralityRetainedHistoryTarget({
    centralSolverRetainedHistoryRow: {
      ...retainedRow,
      provider_provenance: {
        ...retainedRow.provider_provenance,
        provider_object_ref: "accepted:central-solver-provider-object-demo",
      },
    },
  });
  assert.equal(
    withProvider.artifact_status,
    "fail_closed_missing_provider_backed_retained_record_id"
  );
  assert.equal(
    withProvider.first_missing_field,
    "central_solver_retained_history_row.retained_record_request.retained_record_id"
  );
});

test("provider-backed chirality target populates paired rows without authorizing evidence", () => {
  const artifact = buildProviderBackedBraidIdealChiralityRetainedHistoryTarget({
    retainedRecordId: "retained-record:braid-ideal:test-chirality-provider-backed",
  });

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "provider_backed_chirality_residual_rows_present_measurements_blocked"
  );
  assert.equal(artifact.source_status, "candidate_provider_backed_source_unaccepted");
  assert.equal(artifact.first_missing_object, "accepted_chirality_residual_measurements");
  assert.equal(
    artifact.first_missing_field,
    "braid_ideal_chirality_retained_history_target.residual_vector.R_phase.accepted_measurement_ref"
  );
  assert.equal(
    artifact.provider_backed_source.retained_record_id,
    "retained-record:braid-ideal:test-chirality-provider-backed"
  );
  assert.equal(
    artifact.provider_backed_source.provider_object_ref.startsWith(
      "candidate:central_solver_retained_history_provider_object:"
    ),
    true
  );
  assert.equal(
    artifact.central_solver_retained_history_row_request.provider_object_ref,
    artifact.provider_backed_source.provider_object_ref
  );
  assert.equal(artifact.provider_backed_source.provider_object_status, "fail_closed_missing_acceptance_certificate");
  assert.equal(
    artifact.provider_backed_source.provider_object_evidence_reason,
    "producer_does_not_authorize_accepted_provider_object_evidence"
  );
  assert.equal(
    artifact.provider_backed_source.seed_path_rows_status,
    "provider_backed_seed_path_rows_present_acceptance_blocked"
  );
  assert.equal(
    artifact.provider_backed_source.stream_manifest_set_status,
    "provider_backed_stream_manifest_set_present_acceptance_blocked"
  );
  assert.equal(artifact.provider_backed_source.durable_stream_manifest_ref_count, 6);
  assert.equal(
    artifact.conjugation_map.first_missing_field,
    "braid_ideal_chirality_retained_history_target.residual_vector.R_phase.accepted_measurement_ref"
  );
  assert.equal(artifact.residual_vector.R_phase.provider_backed, true);
  assert.equal(
    artifact.residual_vector.R_phase.value.provider_object_ref,
    artifact.provider_backed_source.provider_object_ref
  );
  assert.equal(artifact.residual_vector.R_phase.value.retained_record_id, artifact.provider_backed_source.retained_record_id);
  assert.equal(
    artifact.residual_vector.R_phase.value.central_solver_retained_history_row_ref,
    artifact.provider_backed_source.central_solver_retained_history_row_ref
  );
  assert.equal(artifact.residual_vector.R_phase.value.matter_orientation_sign, 1);
  assert.equal(artifact.residual_vector.R_phase.value.antimatter_orientation_sign, -1);
  assert.equal(artifact.residual_vector.R_root.value.partner_causal_root_requirement_count, 30);
  assert.equal(artifact.residual_vector.R_self.value.same_source_self_hit_requirement_count, 6);
  assert.equal(artifact.residual_vector.R_wake.value.accepted_wake_row_count, 0);
  assert.equal(artifact.residual_vector.R_action.value.accepted_action_row_count, 0);
  assert.equal(artifact.residual_vector.R_support.value.support_class_is_output_diagnostic, true);
  assert.equal(artifact.residual_vector.R_charge.value.charged_sector_projection_exposed, false);
  assert.equal(
    artifact.evidence_evaluation.reason,
    "accepted_chirality_residual_measurements_missing"
  );
  for (const row of artifact.paired_rows) {
    assert.equal(
      row.central_solver_retained_history_row_ref,
      artifact.provider_backed_source.central_solver_retained_history_row_ref
    );
    assert.equal(row.retained_record_id, artifact.provider_backed_source.retained_record_id);
    assert.equal(
      row.first_missing_field,
      "braid_ideal_chirality_retained_history_target.residual_vector.R_phase.accepted_measurement_ref"
    );
    assert.equal(row.missing_retained_history_components.includes("central_solver_retained_history_row"), false);
    assert.equal(row.missing_retained_history_components.includes("provider_provenance"), false);
    assert.equal(row.missing_retained_history_components.includes("same_source_self_hit_rows"), true);
  }
  assert.equal(artifact.authorization.accepted_chirality_retained_history_target, false);
  assert.equal(artifact.authorization.accepted_matter_antimatter_chirality_bridge, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(validateBraidIdealChiralityRetainedHistoryTarget(artifact), []);
  assert.deepEqual(evaluateBraidIdealChiralityRetainedHistoryTargetEvidence(artifact), {
    accepted: false,
    reason: "accepted_chirality_residual_measurements_missing",
    first_missing_field:
      "braid_ideal_chirality_retained_history_target.residual_vector.R_phase.accepted_measurement_ref",
  });
});

test("accepted measurement chirality target measures phase, root, self-hit, and wake residuals", () => {
  const artifact = buildAcceptedMeasurementBraidIdealChiralityRetainedHistoryTarget({
    retainedRecordId: "retained-record:braid-ideal:test-chirality-accepted-measurements",
  });

  assert.equal(
    artifact.artifact_status,
    "accepted_chirality_residual_measurement_rows_present_residuals_failed"
  );
  assert.equal(artifact.source_status, "accepted_residual_measurement_rows_present_target_unaccepted");
  assert.equal(artifact.first_missing_object, "passing_chirality_residual_measurements");
  assert.equal(artifact.first_missing_field, FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD);
  assert.equal(
    artifact.central_solver_retained_history_row_request.first_missing_field,
    FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD
  );
  assert.equal(artifact.conjugation_map.first_missing_field, FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD);
  assert.equal(artifact.support_projection.first_missing_field, FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD);
  assert.deepEqual(artifact.first_blocker, {
    object: "chirality_residual_measurement_failed",
    field: FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD,
    reason: "same_record_action_energy_residual_row_missing",
  });
  assert.equal(artifact.accepted_residual_measurement_source.measurement_row_count, 9);
  assert.equal(artifact.accepted_residual_measurement_source.accepted_measurement_row_count, 9);
  assert.equal(artifact.accepted_residual_measurement_source.passing_measurement_row_count, 5);
  assert.equal(artifact.accepted_residual_measurement_source.failing_measurement_row_count, 4);

  const phaseMeasurement = artifact.residual_vector.R_phase.value;
  assert.equal(phaseMeasurement.schema, RESIDUAL_MEASUREMENT_ROW_SCHEMA);
  assert.equal(phaseMeasurement.accepted_measurement, true);
  assert.equal(phaseMeasurement.measured, true);
  assert.equal(phaseMeasurement.measurement_passed, true);
  assert.equal(phaseMeasurement.measurement_status, "accepted_measurement_passed");
  assert.equal(phaseMeasurement.residual_value, 0);
  assert.equal(
    phaseMeasurement.residual_value_status,
    "same_record_phase_order_reversal_residual_zero"
  );
  assert.equal(phaseMeasurement.failure_reason, null);
  assert.equal(phaseMeasurement.first_failed_requirement, null);
  assert.deepEqual(
    phaseMeasurement.accepted_phase_order_measurement_refs,
    artifact.accepted_phase_order_measurement_source.accepted_phase_order_measurement_refs
  );
  assert.equal(phaseMeasurement.phase_order_measurement_summary.measurement_passed, true);
  assert.equal(
    phaseMeasurement.same_record_binding.retained_record_id,
    artifact.provider_backed_source.retained_record_id
  );
  assert.equal(
    phaseMeasurement.same_record_binding.provider_object_ref,
    artifact.provider_backed_source.provider_object_ref
  );
  assert.equal(
    artifact.residual_vector.R_phase.accepted_measurement_ref,
    phaseMeasurement.accepted_measurement_ref
  );
  assert.equal(artifact.residual_vector.R_phase.accepted, true);
  assert.equal(artifact.accepted_phase_order_measurement_source.measurement_passed, true);
  assert.equal(artifact.accepted_phase_order_measurement_source.phase_order_row_count, 2);
  assert.equal(artifact.accepted_phase_order_measurement_source.phase_order_row_schema, PHASE_ORDER_MEASUREMENT_ROW_SCHEMA);
  assert.equal(artifact.accepted_phase_order_measurement_source.phase_order_reversal_residual, 0);
  assert.deepEqual(artifact.accepted_phase_order_measurement_source.residuals, {
    theta_orb_orientation_sum: 0,
    psi_orientation_sum: 0,
    Omega_chi_signed_component_sum: 0,
  });
  assert.deepEqual(
    artifact.accepted_phase_order_measurement_source.phase_order_rows.map((row) => row.schema),
    [PHASE_ORDER_MEASUREMENT_ROW_SCHEMA, PHASE_ORDER_MEASUREMENT_ROW_SCHEMA]
  );
  assert.deepEqual(
    artifact.accepted_phase_order_measurement_source.phase_order_rows.map((row) => row.orientation_sign),
    [1, -1]
  );
  for (const row of artifact.accepted_phase_order_measurement_source.phase_order_rows) {
    assert.equal(row.accepted_measurement, true);
    assert.equal(row.same_record_binding.retained_record_id, artifact.provider_backed_source.retained_record_id);
    assert.equal(
      row.same_record_binding.central_solver_retained_history_row_ref,
      artifact.provider_backed_source.central_solver_retained_history_row_ref
    );
    assert.equal(row.same_record_binding.provider_object_ref, artifact.provider_backed_source.provider_object_ref);
  }
  const rootMeasurement = artifact.residual_vector.R_root.value;
  assert.equal(rootMeasurement.measurement_passed, true);
  assert.equal(rootMeasurement.measurement_status, "accepted_measurement_passed");
  assert.equal(rootMeasurement.residual_value, 0);
  assert.equal(
    rootMeasurement.residual_value_status,
    "same_record_partner_causal_root_residual_rows_complete"
  );
  assert.equal(rootMeasurement.failure_reason, null);
  assert.equal(rootMeasurement.first_failed_requirement, null);
  assert.equal(rootMeasurement.partner_causal_root_residual_summary.measurement_passed, true);
  assert.deepEqual(
    rootMeasurement.accepted_partner_causal_root_residual_refs,
    artifact.accepted_partner_causal_root_residual_source.accepted_partner_causal_root_residual_refs
  );
  assert.equal(artifact.residual_vector.R_root.accepted, true);
  assert.equal(artifact.accepted_partner_causal_root_residual_source.measurement_passed, true);
  assert.equal(artifact.accepted_partner_causal_root_residual_source.expected_requirement_count, 30);
  assert.equal(artifact.accepted_partner_causal_root_residual_source.residual_row_count, 30);
  assert.equal(
    artifact.accepted_partner_causal_root_residual_source.residual_row_schema,
    PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA
  );
  assert.equal(artifact.accepted_partner_causal_root_residual_source.partner_causal_root_reversal_residual, 0);
  assert.deepEqual(artifact.accepted_partner_causal_root_residual_source.residuals, {
    missing_requirement_count: 0,
    extra_residual_row_count: 0,
    duplicate_requirement_count: 0,
    same_record_binding_failure_count: 0,
    asymmetric_directed_pair_count: 0,
  });
  assert.equal(
    artifact.accepted_partner_causal_root_residual_source.partner_causal_root_residual_rows.length,
    30
  );
  for (const row of artifact.accepted_partner_causal_root_residual_source.partner_causal_root_residual_rows) {
    assert.equal(row.schema, PARTNER_CAUSAL_ROOT_RESIDUAL_ROW_SCHEMA);
    assert.equal(row.accepted_measurement, true);
    assert.equal(row.same_record_binding.retained_record_id, artifact.provider_backed_source.retained_record_id);
    assert.equal(
      row.same_record_binding.central_solver_retained_history_row_ref,
      artifact.provider_backed_source.central_solver_retained_history_row_ref
    );
    assert.equal(row.same_record_binding.provider_object_ref, artifact.provider_backed_source.provider_object_ref);
    assert.equal(row.required_relation, "directed-partner-causal-root-replay");
  }
  const selfMeasurement = artifact.residual_vector.R_self.value;
  assert.equal(selfMeasurement.measurement_passed, true);
  assert.equal(selfMeasurement.measurement_status, "accepted_measurement_passed");
  assert.equal(selfMeasurement.residual_value, 0);
  assert.equal(
    selfMeasurement.residual_value_status,
    "same_record_same_source_self_hit_residual_rows_complete"
  );
  assert.equal(selfMeasurement.failure_reason, null);
  assert.equal(selfMeasurement.first_failed_requirement, null);
  assert.equal(selfMeasurement.same_source_self_hit_residual_summary.measurement_passed, true);
  assert.deepEqual(
    selfMeasurement.accepted_same_source_self_hit_residual_refs,
    artifact.accepted_same_source_self_hit_residual_source.accepted_same_source_self_hit_residual_refs
  );
  assert.equal(artifact.residual_vector.R_self.accepted, true);
  assert.equal(artifact.accepted_same_source_self_hit_residual_source.measurement_passed, true);
  assert.equal(artifact.accepted_same_source_self_hit_residual_source.expected_requirement_count, 6);
  assert.equal(artifact.accepted_same_source_self_hit_residual_source.residual_row_count, 6);
  assert.equal(
    artifact.accepted_same_source_self_hit_residual_source.residual_row_schema,
    SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA
  );
  assert.equal(artifact.accepted_same_source_self_hit_residual_source.same_source_self_hit_residual, 0);
  assert.deepEqual(artifact.accepted_same_source_self_hit_residual_source.residuals, {
    missing_requirement_count: 0,
    extra_residual_row_count: 0,
    duplicate_requirement_count: 0,
    same_record_binding_failure_count: 0,
    receiver_source_mismatch_count: 0,
    strict_delay_relation_failure_count: 0,
  });
  assert.equal(
    artifact.accepted_same_source_self_hit_residual_source.same_source_self_hit_residual_rows.length,
    6
  );
  for (const row of artifact.accepted_same_source_self_hit_residual_source.same_source_self_hit_residual_rows) {
    assert.equal(row.schema, SAME_SOURCE_SELF_HIT_RESIDUAL_ROW_SCHEMA);
    assert.equal(row.accepted_measurement, true);
    assert.equal(row.receiver_architrino_id, row.source_architrino_id);
    assert.equal(row.required_relation, "strictly-delayed-same-source-root");
    assert.equal(row.same_record_binding.retained_record_id, artifact.provider_backed_source.retained_record_id);
    assert.equal(
      row.same_record_binding.central_solver_retained_history_row_ref,
      artifact.provider_backed_source.central_solver_retained_history_row_ref
    );
    assert.equal(row.same_record_binding.provider_object_ref, artifact.provider_backed_source.provider_object_ref);
  }

  const wakeMeasurement = artifact.residual_vector.R_wake.value;
  assert.equal(wakeMeasurement.measurement_passed, true);
  assert.equal(wakeMeasurement.measurement_status, "accepted_measurement_passed");
  assert.equal(wakeMeasurement.residual_value, 0);
  assert.equal(wakeMeasurement.residual_value_status, "retained_wake_history_residual_rows_complete");
  assert.equal(wakeMeasurement.failure_reason, null);
  assert.equal(wakeMeasurement.first_failed_requirement, null);
  assert.equal(wakeMeasurement.retained_wake_history_residual_summary.measurement_passed, true);
  assert.deepEqual(
    wakeMeasurement.accepted_retained_wake_history_residual_refs,
    artifact.accepted_retained_wake_history_residual_source.accepted_retained_wake_history_residual_refs
  );
  assert.equal(artifact.residual_vector.R_wake.accepted, true);
  assert.equal(artifact.accepted_retained_wake_history_residual_source.measurement_passed, true);
  assert.equal(artifact.accepted_retained_wake_history_residual_source.expected_seed_row_count, 6);
  assert.equal(artifact.accepted_retained_wake_history_residual_source.residual_row_count, 6);
  assert.equal(
    artifact.accepted_retained_wake_history_residual_source.residual_row_schema,
    RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA
  );
  assert.equal(artifact.accepted_retained_wake_history_residual_source.retained_wake_history_residual, 0);
  assert.deepEqual(artifact.accepted_retained_wake_history_residual_source.residuals, {
    missing_hook_count: 0,
    missing_seed_row_count: 0,
    extra_residual_row_count: 0,
    duplicate_architrino_count: 0,
    same_record_binding_failure_count: 0,
    ledger_mismatch_count: 0,
  });
  assert.equal(
    artifact.accepted_retained_wake_history_residual_source.retained_wake_history_residual_rows.length,
    6
  );
  for (const row of artifact.accepted_retained_wake_history_residual_source.retained_wake_history_residual_rows) {
    assert.equal(row.schema, RETAINED_WAKE_HISTORY_RESIDUAL_ROW_SCHEMA);
    assert.equal(row.accepted_measurement, true);
    assert.equal(row.ledger, "retained_wake_history_rows");
    assert.equal(row.hook_id.includes("retained_wake_history_rows:hook"), true);
    assert.equal(row.same_record_binding.retained_record_id, artifact.provider_backed_source.retained_record_id);
    assert.equal(
      row.same_record_binding.central_solver_retained_history_row_ref,
      artifact.provider_backed_source.central_solver_retained_history_row_ref
    );
    assert.equal(row.same_record_binding.provider_object_ref, artifact.provider_backed_source.provider_object_ref);
  }
  assert.equal(artifact.residual_vector.R_action.value.measurement_passed, false);
  assert.equal(
    artifact.residual_vector.R_action.value.failure_reason,
    "same_record_action_energy_residual_row_missing"
  );
  assert.equal(artifact.residual_vector.R_charge.value.measurement_passed, true);
  assert.equal(artifact.residual_vector.R_charge.accepted, true);
  assert.equal(
    artifact.paired_rows.every((row) => row.first_missing_field === FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD),
    true
  );
  assert.equal(
    artifact.paired_rows.every((row) => row.phase_order_requirement.first_missing_field === null),
    true
  );
  assert.equal(
    artifact.paired_rows.every((row) => row.phase_order_requirement.accepted_phase_order_measurement_ref != null),
    true
  );
  assert.equal(artifact.authorization.accepted_chirality_retained_history_target, false);
  assert.equal(artifact.authorization.accepted_matter_antimatter_chirality_bridge, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.deepEqual(evaluateBraidIdealChiralityRetainedHistoryTargetEvidence(artifact), {
    accepted: false,
    reason: "chirality_residual_measurements_failed",
    first_missing_field: FIRST_FAILED_RESIDUAL_MEASUREMENT_FIELD,
  });
  assert.deepEqual(validateBraidIdealChiralityRetainedHistoryTarget(artifact), []);
});

test("chirality target evidence guard rejects support tables, relabels, and synthetic accepted refs", () => {
  const artifact = buildBraidIdealChiralityRetainedHistoryTarget();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_chirality_retained_history_target, false);
  assert.equal(artifact.authorization.accepted_matter_antimatter_chirality_bridge, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.matter_antimatter_discovery_claim, false);
  assert.equal(artifact.authorization.particle_sector_promotion, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");

  assert.equal(
    evaluateBraidIdealChiralityRetainedHistoryTargetEvidence({
      schema: SCHEMA,
      accepted_chirality_retained_history_target: true,
    }).reason,
    NEGATIVE_CONTROL_REASONS.synthetic_accepted_ref
  );
  assert.equal(
    evaluateBraidIdealChiralityRetainedHistoryTargetEvidence({
      schema: SCHEMA,
      paired_rows: [{}, {}],
    }).reason,
    "paired_rows_missing_central_solver_retained_history_refs"
  );

  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    assert.deepEqual(
      evaluateBraidIdealChiralityRetainedHistoryTargetEvidence({ evidence_class: evidenceClass }),
      {
        accepted: false,
        reason,
        first_missing_field: FIRST_MISSING_FIELD,
      }
    );
  }
});

test("chirality target CLI emits the v0 schema packet", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH, "--pretty"], { encoding: "utf8" });
  const artifact = JSON.parse(output);

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(artifact.central_solver_row_schema.schema_id, SCHEMA);
  assert.deepEqual(validateBraidIdealChiralityRetainedHistoryTarget(artifact), []);
});

test("chirality target CLI can emit the provider-backed v0 packet", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH, "--provider-backed", "--pretty"], {
    encoding: "utf8",
  });
  const artifact = JSON.parse(output);

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "provider_backed_chirality_residual_rows_present_measurements_blocked"
  );
  assert.equal(artifact.provider_backed_source.provider_object_ref.startsWith("candidate:"), true);
  assert.equal(artifact.residual_vector.R_phase.value.measured, false);
  assert.deepEqual(validateBraidIdealChiralityRetainedHistoryTarget(artifact), []);
});

test("chirality target CLI can emit accepted residual measurement rows", () => {
  const output = execFileSync(process.execPath, [SCRIPT_PATH, "--accepted-measurements", "--pretty"], {
    encoding: "utf8",
  });
  const artifact = JSON.parse(output);

  assert.equal(artifact.schema, SCHEMA);
  assert.equal(
    artifact.artifact_status,
    "accepted_chirality_residual_measurement_rows_present_residuals_failed"
  );
  assert.equal(artifact.residual_vector.R_phase.value.schema, RESIDUAL_MEASUREMENT_ROW_SCHEMA);
  assert.equal(artifact.residual_vector.R_phase.value.accepted_measurement, true);
  assert.equal(artifact.residual_vector.R_phase.value.measurement_passed, true);
  assert.equal(artifact.residual_vector.R_root.value.measurement_passed, true);
  assert.equal(artifact.residual_vector.R_self.value.measurement_passed, true);
  assert.equal(artifact.residual_vector.R_wake.value.measurement_passed, true);
  assert.equal(artifact.residual_vector.R_action.value.measurement_passed, false);
  assert.equal(artifact.accepted_phase_order_measurement_source.phase_order_row_count, 2);
  assert.equal(artifact.accepted_partner_causal_root_residual_source.residual_row_count, 30);
  assert.equal(artifact.accepted_same_source_self_hit_residual_source.residual_row_count, 6);
  assert.equal(artifact.accepted_retained_wake_history_residual_source.residual_row_count, 6);
  assert.equal(artifact.residual_vector.R_phase.accepted_measurement_ref.startsWith("accepted:"), true);
  assert.deepEqual(validateBraidIdealChiralityRetainedHistoryTarget(artifact), []);
});
