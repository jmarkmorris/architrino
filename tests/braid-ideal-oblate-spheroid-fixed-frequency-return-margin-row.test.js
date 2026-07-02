import test from "node:test";
import assert from "node:assert/strict";

import { buildOblateSpheroidReducedResidualRow } from "../scripts/braid-ideal/oblate-spheroid-reduced-residual-row.mjs";
import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildOblateSpheroidFixedFrequencyReturnMarginRow,
  evaluateOblateSpheroidFixedFrequencyReturnMarginEvidence,
  validateOblateSpheroidFixedFrequencyReturnMarginRow,
} from "../scripts/braid-ideal/oblate-spheroid-fixed-frequency-return-margin-row.mjs";

test("fixed-frequency return-margin row is deterministic and fail closed", () => {
  const first = buildOblateSpheroidFixedFrequencyReturnMarginRow();
  const second = buildOblateSpheroidFixedFrequencyReturnMarginRow();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.artifact_status, "fail_closed_missing_retained_root_ledger");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.deepEqual(validateOblateSpheroidFixedFrequencyReturnMarginRow(first), []);
});

test("fixed-frequency artifact computes concrete frequency and period residual rows", () => {
  const artifact = buildOblateSpheroidFixedFrequencyReturnMarginRow();

  assert.equal(artifact.fixed_frequency_residual_rows.length, 5);
  const phase = artifact.fixed_frequency_residual_rows.find((row) => row.frequency_component === "nu_psi");
  const zeta = artifact.fixed_frequency_residual_rows.find((row) => row.frequency_component === "nu_z");
  const labeledPeriod = artifact.fixed_frequency_residual_rows.find(
    (row) => row.closure_level === "labeled_retained_path_history"
  );
  const quotientPeriod = artifact.fixed_frequency_residual_rows.find(
    (row) => row.closure_level === "quotient_level_assembly_state"
  );

  assert.ok(Math.abs(phase.cycles_per_unit_time - 1 / (6 * Math.PI)) <= 1e-15);
  assert.equal(zeta.failure_code, "degenerate_meridional_frequency");
  assert.ok(Math.abs(labeledPeriod.period - 6 * Math.PI) <= 1e-12);
  assert.ok(labeledPeriod.phase_residual <= 1e-12);
  assert.ok(Math.abs(quotientPeriod.period - 2 * Math.PI) <= 1e-12);
  assert.ok(quotientPeriod.phase_residual <= 1e-12);
});

test("fixed-frequency artifact computes flattening, support, common-level, and antipodal residuals", () => {
  const artifact = buildOblateSpheroidFixedFrequencyReturnMarginRow();

  assert.equal(artifact.flattening_support_residual_rows.length, 3);
  assert.equal(artifact.common_level_residual_rows.length, 2);
  assert.equal(artifact.antipodal_return_margin_residual_rows.length, 3);
  assert.equal(artifact.return_margin_residual_rows.length, 2);

  const support = artifact.flattening_support_residual_rows.find(
    (row) => row.schema === "oblate_spheroid_support_surface_residual_row.v0"
  );
  const radius = artifact.common_level_residual_rows.find((row) => row.quantity === "center_radius");
  const speed = artifact.common_level_residual_rows.find((row) => row.quantity === "center_speed");

  assert.equal(support.pass, true);
  assert.ok(support.max_abs_phi <= 1e-12);
  assert.equal(radius.pass, true);
  assert.equal(speed.pass, true);
  for (const row of artifact.antipodal_return_margin_residual_rows) {
    assert.equal(row.pass, true);
    assert.ok(row.position_residual <= 1e-12);
    assert.ok(row.center_frame_velocity_residual <= 1e-12);
  }
});

test("source oblate row binding and retained-root blocker are preserved", () => {
  const oblateArtifact = buildOblateSpheroidReducedResidualRow({ v_orb: 0.4 });
  const artifact = buildOblateSpheroidFixedFrequencyReturnMarginRow({ oblateArtifact });

  assert.equal(artifact.source_oblate_spheroid_reduced_residual_row.row_id, oblateArtifact.row_id);
  assert.equal(artifact.source_oblate_spheroid_reduced_residual_row.artifact_hash, oblateArtifact.artifact_hash);
  assert.equal(artifact.theta.v_orb, 0.4);
  assert.equal(artifact.root_ledger_status.retained_root_ledger_ref, null);
  assert.equal(artifact.root_ledger_status.accepted_retained_root_ledger_ref, null);
  assert.equal(artifact.root_ledger_status.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(artifact.retained_source_status.accepted_same_record_source, false);
});

test("demo retained-root refs sharpen the blocker but do not authorize evidence", () => {
  const oblateArtifact = buildOblateSpheroidReducedResidualRow({
    retainedRootLedgerRef: "retained-root-ledger:demo",
  });
  const artifact = buildOblateSpheroidFixedFrequencyReturnMarginRow({ oblateArtifact });

  assert.equal(artifact.artifact_status, "fail_closed_retained_root_ledger_unaccepted");
  assert.equal(artifact.root_ledger_status.retained_root_ledger_ref, "retained-root-ledger:demo");
  assert.equal(artifact.root_ledger_status.accepted_retained_root_ledger_ref, null);
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_fixed_frequency_return_margin_row.root_ledger_status.accepted_retained_root_ledger_ref"
  );
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_retained_evidence, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
});

test("generic spheroid display metadata is rejected as accepted evidence", () => {
  const result = evaluateOblateSpheroidFixedFrequencyReturnMarginEvidence({
    evidence_class: "generic_spheroid_display_metadata_without_same_record_binding",
  });

  assert.equal(result.accepted, false);
  assert.equal(
    result.reason,
    NEGATIVE_CONTROL_REASONS.generic_spheroid_display_metadata_without_same_record_binding
  );

  const schemaOnly = evaluateOblateSpheroidFixedFrequencyReturnMarginEvidence({
    schema: SCHEMA,
    root_ledger_status: {
      retained_root_ledger_ref: null,
      accepted_retained_root_ledger_ref: null,
    },
  });
  assert.equal(schemaOnly.reason, "accepted_retained_root_ledger_missing");
  assert.equal(schemaOnly.first_missing_field, FIRST_MISSING_FIELD);
});

test("fixed-frequency artifact does not authorize retained branch or downstream evidence", () => {
  const artifact = buildOblateSpheroidFixedFrequencyReturnMarginRow();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.accepted_retained_evidence, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.acceptedSameLevelBranchClaim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});
