import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildOblateSpheroidReducedResidualRow,
  evaluateOblateSpheroidReducedResidualEvidence,
  validateOblateSpheroidReducedResidualRow,
} from "../scripts/braid-ideal/oblate-spheroid-reduced-residual-row.mjs";

test("oblate spheroid reduced residual row is deterministic and fail closed", () => {
  const first = buildOblateSpheroidReducedResidualRow();
  const second = buildOblateSpheroidReducedResidualRow();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.artifact_status, "fail_closed_missing_retained_root_ledger");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.deepEqual(validateOblateSpheroidReducedResidualRow(first), []);
});

test("oblate spheroid artifact emits six kinematic rows on the support surface", () => {
  const artifact = buildOblateSpheroidReducedResidualRow();

  assert.equal(artifact.kinematic_rows.length, 6);
  assert.equal(artifact.parameters.R_parallel, artifact.parameters.chi * artifact.parameters.R_perp);
  assert.ok(Math.abs(artifact.parameters.v_orb - artifact.parameters.orbital_radius * Math.abs(artifact.parameters.omega)) <= 1e-15);
  assert.equal(artifact.support_surface_checks.pass, true);
  assert.ok(artifact.support_surface_checks.max_abs_phi <= 1e-12);
  for (const row of artifact.kinematic_rows) {
    assert.equal(row.schema, "oblate_spheroid_kinematic_row.v0");
    assert.ok(Math.abs(row.support_surface.Phi) <= 1e-12);
    assert.equal(row.retained_root_ledger_ref, null);
  }
});

test("oblate spheroid artifact records three antipodal pairs and closure conventions", () => {
  const artifact = buildOblateSpheroidReducedResidualRow();

  assert.equal(artifact.antipodal_pair_refs.length, 3);
  for (const pair of artifact.antipodal_pair_refs) {
    assert.equal(pair.pass, true);
    assert.ok(pair.position_residual <= 1e-12);
    assert.ok(pair.center_frame_velocity_residual <= 1e-12);
  }
  assert.equal(artifact.closure_convention.labeled_retained_path_history_required, true);
  assert.equal(artifact.closure_convention.quotient_level_closure_allowed_for_assembly_state, true);
  assert.equal(artifact.closure_convention.selected_closure_level, "labeled_retained_path_history");
});

test("oblate spheroid artifact emits directed causal-root and projection residual requirements", () => {
  const artifact = buildOblateSpheroidReducedResidualRow();

  assert.equal(artifact.causal_root_equation_requirements.length, 36);
  assert.equal(
    artifact.causal_root_equation_requirements.filter((row) => row.same_source_self_hit_required_when_root_exists)
      .length,
    6
  );
  assert.equal(artifact.wake_acceleration_row_requirements.length, 6);
  assert.equal(artifact.projection_residual_requirements.length, 24);
  assert.deepEqual(
    [...new Set(artifact.projection_residual_requirements.map((row) => row.projection))].sort(),
    ["R_parallel", "R_perp", "R_psi", "R_zeta"]
  );
  assert.equal(artifact.center_residual_requirement.equation, "R_C = sum_a E_a");
  assert.equal(artifact.angular_residual_requirement.equation, "R_J = sum_a (x_a-C) x E_a");
});

test("optional Noether sea pressure diagnostic remains non-authorizing", () => {
  const artifact = buildOblateSpheroidReducedResidualRow({ K_sea: 0.25, Gamma_sea: 0.05 });

  assert.equal(artifact.noether_sea_pressure_diagnostic.enabled, true);
  assert.equal(artifact.noether_sea_pressure_diagnostic.K_sea, 0.25);
  assert.equal(artifact.noether_sea_pressure_diagnostic.Gamma_sea, 0.05);
  assert.equal(artifact.noether_sea_pressure_diagnostic.accepted_noether_sea_response, false);
  assert.equal(artifact.noether_sea_pressure_diagnostic.pressure_rows.length, 6);
  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
});

test("injected retained root ledger sharpens later blockers without authorization", () => {
  const artifact = buildOblateSpheroidReducedResidualRow({
    retainedRootLedgerRef: "retained-root-ledger:demo",
  });

  assert.equal(artifact.artifact_status, "fail_closed_missing_retained_wake_rows");
  assert.equal(
    artifact.first_missing_field,
    "oblate_spheroid_reduced_residual_row.wake_acceleration_requirements[*].retained_wake_rows_ref"
  );
  assert.equal(artifact.root_ledger_status.retained_root_ledger_ref, "retained-root-ledger:demo");
  assert.equal(artifact.authorization.oblate_spheroid_reduced_residual_row, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
});

test("generic spheroid display metadata is rejected as accepted evidence", () => {
  const result = evaluateOblateSpheroidReducedResidualEvidence({
    evidence_class: "generic_spheroid_display_metadata_without_same_record_binding",
  });

  assert.equal(result.accepted, false);
  assert.equal(
    result.reason,
    NEGATIVE_CONTROL_REASONS.generic_spheroid_display_metadata_without_same_record_binding
  );

  const schemaOnly = evaluateOblateSpheroidReducedResidualEvidence({
    schema: SCHEMA,
    kinematic_rows: Array.from({ length: 6 }, (_, index) => ({ index })),
    root_ledger_status: { retained_root_ledger_ref: null },
  });
  assert.equal(schemaOnly.reason, "retained_root_ledger_missing");
  assert.equal(schemaOnly.first_missing_field, FIRST_MISSING_FIELD);
});

test("oblate spheroid artifact does not authorize retained branch or downstream evidence", () => {
  const artifact = buildOblateSpheroidReducedResidualRow();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.oblate_spheroid_reduced_residual_row, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.acceptedSameLevelBranchClaim, false);
  assert.equal(artifact.authorization.accepted_transition_source, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.same_ledger_action_measure_row, false);
  assert.equal(artifact.authorization.bounded_speed_live_ledger, false);
  assert.equal(artifact.authorization.receiver_normal_branch_strength, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
});

test("oblate spheroid artifact can solve omega from declared orbital velocity", () => {
  const artifact = buildOblateSpheroidReducedResidualRow({ v_orb: 0.4 });

  assert.equal(artifact.parameters.v_orb, 0.4);
  assert.ok(Math.abs(artifact.parameters.omega - 0.4 / artifact.parameters.orbital_radius) <= 1e-15);
  assert.equal(artifact.fixed_frequency_validation_row.theta.v_orb, 0.4);
});
