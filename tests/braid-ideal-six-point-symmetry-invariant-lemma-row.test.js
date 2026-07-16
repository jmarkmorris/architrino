import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  NEXT_MISSING_FIELD,
  NEXT_MISSING_OBJECT,
  SCHEMA,
  buildSixPointSymmetryInvariantLemmaRow,
  evaluateSixPointSymmetryInvariantLemmaEvidence,
  validateSixPointSymmetryInvariantLemmaRow,
} from "../scripts/braid-ideal/six-point-symmetry-invariant-lemma-row.mjs";

const PROOF_PACKET_REF =
  "priority-proof-packet:reference/priorities/braid-archive/braid-ideal/six-point-symmetry-invariant-lemma-proof-packet.md";

test("six-point symmetry invariant lemma row is deterministic and fail closed", () => {
  const first = buildSixPointSymmetryInvariantLemmaRow();
  const second = buildSixPointSymmetryInvariantLemmaRow();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.artifact_status, "fail_closed_missing_force_law_equivariance_proof");
  assert.equal(first.source_status, "source_acquisition_blocked");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.row_id.startsWith("six_point_symmetry_invariant_lemma_row:"), true);
  assert.deepEqual(validateSixPointSymmetryInvariantLemmaRow(first), []);
});

test("face-opposite manifold rows preserve center, common radius, and antipodal pairs", () => {
  const row = buildSixPointSymmetryInvariantLemmaRow({ a: 2, b: -0.25 });
  const checks = row.invariant_manifold.checks;
  const positions = Object.fromEntries(
    row.invariant_manifold.position_rows.map((entry) => [entry.architrino_id, entry.position])
  );

  assert.equal(checks.pass, true);
  assert.equal(checks.center_residual, 0);
  assert.equal(checks.common_radius_squared, 2 * 2 + 2 * 0.25 * 0.25);
  assert.equal(checks.common_radius_max_residual, 0);
  assert.equal(checks.antipodal_pair_max_residual, 0);
  assert.deepEqual(positions.P_x, [2, -0.25, -0.25]);
  assert.deepEqual(positions.P_y, [-0.25, 2, -0.25]);
  assert.deepEqual(positions.P_z, [-0.25, -0.25, 2]);
  assert.deepEqual(positions.E_x, [-2, 0.25, 0.25]);
});

test("tangent acceleration template preserves the same invariant manifold shape", () => {
  const row = buildSixPointSymmetryInvariantLemmaRow({ A: -0.7, B: 0.11 });
  const checks = row.tangent_acceleration_template.checks;
  const accelerations = Object.fromEntries(
    row.tangent_acceleration_template.acceleration_rows.map((entry) => [
      entry.architrino_id,
      entry.acceleration,
    ])
  );

  assert.equal(checks.pass, true);
  assert.equal(checks.center_acceleration_residual, 0);
  assert.equal(checks.antipodal_acceleration_max_residual, 0);
  assert.deepEqual(accelerations.P_x, [-0.7, 0.11, 0.11]);
  assert.deepEqual(accelerations.P_y, [0.11, -0.7, 0.11]);
  assert.deepEqual(accelerations.P_z, [0.11, 0.11, -0.7]);
  assert.deepEqual(accelerations.E_x, [0.7, -0.11, -0.11]);
});

test("axial-paired decoration is retained as a negative control, not the lemma channel", () => {
  const row = buildSixPointSymmetryInvariantLemmaRow();

  assert.equal(row.decoration_classification.balanced_octahedral_decoration_count, 20);
  assert.equal(row.decoration_classification.proper_rotation_class_count, 2);
  assert.equal(row.decoration_classification.face_opposite.rotation_class, "face-opposite");
  assert.equal(row.decoration_classification.face_opposite.split_axis_count, 3);
  assert.equal(row.decoration_classification.face_opposite.same_polarity_axis_count, 0);
  assert.equal(row.decoration_classification.axial_paired_control.rotation_class, "axial-paired");
  assert.equal(row.decoration_classification.axial_paired_control.split_axis_count, 1);
  assert.equal(row.decoration_classification.axial_paired_control.same_polarity_axis_count, 2);
  assert.equal(
    row.decoration_classification.axial_paired_control.support_status,
    "negative_control_not_this_invariant_channel"
  );
  assert.equal(row.decoration_classification.axial_paired_control.accepted_as_antimatter_branch, false);
});

test("proof obligations remain same-record requirements and do not authorize branch claims", () => {
  const row = buildSixPointSymmetryInvariantLemmaRow();

  assert.deepEqual(
    row.proof_obligations.map((obligation) => obligation.obligation_id),
    [
      "coordinate_permutation_equivariance_of_retained_force_law",
      "charge_conjugate_inversion_oddness_of_retained_force_law",
      "complete_retained_root_set_no_asymmetric_root_pruning",
      "same_record_binding_for_retained_history_rows",
    ]
  );
  assert.equal(row.force_law_equivariance_proof_ref, null);
  assert.equal(row.retained_root_ledger_ref, null);
  assert.equal(row.retained_record_id, null);
  assert.equal(row.provider_object_ref, null);

  assert.equal(row.authorization.accepted_same_record_evidence, false);
  assert.equal(row.authorization.six_point_symmetry_invariant_lemma, false);
  assert.equal(row.authorization.retainedBranchClaim, false);
  assert.equal(row.authorization.acceptedSameLevelBranchClaim, false);
  assert.equal(row.authorization.accepted_transition_source, false);
  assert.equal(row.authorization.moving_retained_branch_certificate, false);
  assert.equal(row.authorization.same_ledger_action_measure_row, false);
  assert.equal(row.authorization.bounded_speed_live_ledger, false);
  assert.equal(row.authorization.receiver_normal_branch_strength, false);
  assert.equal(row.authorization.scoreMovement, "no_score_increase");
});

test("evidence guard rejects non-evidence classes and schema-only rows", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateSixPointSymmetryInvariantLemmaEvidence({ evidence_class: evidenceClass });
    assert.deepEqual(result, {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }

  assert.deepEqual(evaluateSixPointSymmetryInvariantLemmaEvidence({ schema: "wrong.v0" }), {
    accepted: false,
    reason: "schema_not_six_point_symmetry_invariant_lemma_row_v0",
    first_missing_field: FIRST_MISSING_FIELD,
  });

  assert.deepEqual(evaluateSixPointSymmetryInvariantLemmaEvidence({ schema: SCHEMA }), {
    accepted: false,
    reason: "force_law_equivariance_proof_missing",
    first_missing_field: FIRST_MISSING_FIELD,
  });
});

test("proof packet ref advances the ladder to the retained root ledger while remaining fail closed", () => {
  const row = buildSixPointSymmetryInvariantLemmaRow({
    forceLawEquivarianceProofRef: PROOF_PACKET_REF,
  });
  const defaultRow = buildSixPointSymmetryInvariantLemmaRow();

  assert.equal(row.force_law_equivariance_proof_ref, PROOF_PACKET_REF);
  assert.equal(row.artifact_status, "fail_closed_missing_retained_root_ledger");
  assert.equal(row.source_status, "source_acquisition_blocked");
  assert.equal(row.first_missing_object, NEXT_MISSING_OBJECT);
  assert.equal(row.first_missing_field, NEXT_MISSING_FIELD);
  assert.notEqual(row.artifact_hash, defaultRow.artifact_hash);
  assert.deepEqual(validateSixPointSymmetryInvariantLemmaRow(row), []);

  const obligations = Object.fromEntries(
    row.proof_obligations.map((obligation) => [obligation.obligation_id, obligation])
  );
  assert.equal(
    obligations.coordinate_permutation_equivariance_of_retained_force_law.proof_ref,
    PROOF_PACKET_REF
  );
  assert.equal(
    obligations.coordinate_permutation_equivariance_of_retained_force_law.first_missing_field,
    null
  );
  assert.equal(
    obligations.charge_conjugate_inversion_oddness_of_retained_force_law.proof_ref,
    PROOF_PACKET_REF
  );
  assert.equal(
    obligations.charge_conjugate_inversion_oddness_of_retained_force_law.first_missing_field,
    null
  );
  assert.equal(
    obligations.complete_retained_root_set_no_asymmetric_root_pruning.retained_root_ledger_ref,
    null
  );
  assert.equal(
    obligations.complete_retained_root_set_no_asymmetric_root_pruning.first_missing_field,
    NEXT_MISSING_FIELD
  );
  assert.equal(obligations.same_record_binding_for_retained_history_rows.retained_record_id, null);
  assert.equal(
    obligations.same_record_binding_for_retained_history_rows.first_missing_field,
    "six_point_symmetry_invariant_lemma_row.retained_record_id"
  );

  assert.equal(row.retained_root_ledger_ref, null);
  assert.equal(row.retained_record_id, null);
  assert.equal(row.provider_object_ref, null);
  assert.deepEqual(row.evidence_evaluation, {
    accepted: false,
    reason: "retained_root_ledger_missing",
    first_missing_field: NEXT_MISSING_FIELD,
  });

  for (const [flag, value] of Object.entries(row.authorization)) {
    if (flag === "scoreMovement") {
      assert.equal(value, "no_score_increase");
    } else {
      assert.equal(value, false, `${flag} must remain false with a proof ref`);
    }
  }
});

test("default row is unchanged by the proof-ref option pathway", () => {
  const defaultRow = buildSixPointSymmetryInvariantLemmaRow();
  const emptyRefRow = buildSixPointSymmetryInvariantLemmaRow({ forceLawEquivarianceProofRef: "" });

  assert.deepEqual(defaultRow, emptyRefRow);
  assert.equal(defaultRow.artifact_status, "fail_closed_missing_force_law_equivariance_proof");
  assert.equal(defaultRow.first_missing_field, FIRST_MISSING_FIELD);
});
