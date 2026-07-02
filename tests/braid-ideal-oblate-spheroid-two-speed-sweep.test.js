import test from "node:test";
import assert from "node:assert/strict";

import {
  FIRST_MISSING_FIELD,
  FIRST_MISSING_OBJECT,
  NEGATIVE_CONTROL_REASONS,
  SCHEMA,
  buildOblateSpheroidTwoSpeedSweep,
  evaluateOblateSpheroidTwoSpeedSweepEvidence,
  validateOblateSpheroidTwoSpeedSweep,
} from "../scripts/braid-ideal/oblate-spheroid-two-speed-sweep.mjs";

test("two-speed sweep is deterministic, canonical c_f=1, and fail closed", () => {
  const first = buildOblateSpheroidTwoSpeedSweep();
  const second = buildOblateSpheroidTwoSpeedSweep();

  assert.deepEqual(first, second);
  assert.equal(first.schema, SCHEMA);
  assert.equal(first.field_speed, 1);
  assert.equal(first.artifact_status, "fail_closed_missing_retained_root_ledger");
  assert.equal(first.first_missing_object, FIRST_MISSING_OBJECT);
  assert.equal(first.first_missing_field, FIRST_MISSING_FIELD);
  assert.equal(first.summary.bounded_return_row_count, 0);
  assert.deepEqual(validateOblateSpheroidTwoSpeedSweep(first), []);
});

test("two-speed sweep covers the requested u and orbital velocity grid", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0, 0.3],
    vOrbValues: [0.2, 0.4, 0.6],
    betaStar: 0.5,
  });

  assert.equal(artifact.rows.length, 6);
  assert.deepEqual(artifact.parameters.u_values, [0, 0.3]);
  assert.deepEqual(artifact.parameters.v_orb_values, [0.2, 0.4, 0.6]);
  assert.equal(artifact.parameters.chi_mode, "lorentz_target");
  assert.equal(artifact.rows.every((row) => row.field_speed === 1), true);
  assert.equal(artifact.rows.every((row) => row.residual_status.reduced_residual_norm === null), true);
});

test("two-speed sweep prefilter selects rows close to the constant speed-budget curve", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep({
    uValues: [0, 0.3],
    vOrbValues: [0.2, 0.4, 0.5, 0.6],
    betaStar: 0.5,
  });

  assert.equal(artifact.candidate_prefilter_rows.length, 2);
  const atRest = artifact.candidate_prefilter_rows.find((row) => row.u === 0);
  const moving = artifact.candidate_prefilter_rows.find((row) => row.u === 0.3);

  assert.equal(atRest.v_orb, 0.5);
  assert.equal(moving.v_orb, 0.4);
  assert.ok(atRest.speed_budget.root_budget_margin > 0);
  assert.ok(moving.speed_budget.root_budget_margin > 0);
  assert.equal(atRest.return_status.bounded_return_observed, false);
});

test("two-speed sweep remains non-authorizing for preferred configuration claims", () => {
  const artifact = buildOblateSpheroidTwoSpeedSweep();

  assert.equal(artifact.authorization.accepted_same_record_evidence, false);
  assert.equal(artifact.authorization.two_speed_deformation_sweep, false);
  assert.equal(artifact.authorization.retainedBranchClaim, false);
  assert.equal(artifact.authorization.acceptedSameLevelBranchClaim, false);
  assert.equal(artifact.authorization.preferred_configuration_claim, false);
  assert.equal(artifact.authorization.moving_retained_branch_certificate, false);
  assert.equal(artifact.authorization.scoreMovement, "no_score_increase");
  assert.equal(artifact.summary.preferred_configuration_status, "kinematic_prefilter_only_no_bounded_return");
});

test("two-speed sweep evidence guard rejects non-evidence classes", () => {
  for (const [evidenceClass, reason] of Object.entries(NEGATIVE_CONTROL_REASONS)) {
    const result = evaluateOblateSpheroidTwoSpeedSweepEvidence({ evidence_class: evidenceClass });
    assert.deepEqual(result, {
      accepted: false,
      reason,
      first_missing_field: FIRST_MISSING_FIELD,
    });
  }

  const schemaOnly = evaluateOblateSpheroidTwoSpeedSweepEvidence({ schema: SCHEMA });
  assert.equal(schemaOnly.accepted, false);
  assert.equal(schemaOnly.reason, "producer_does_not_authorize_accepted_two_speed_deformation_sweep_evidence");
});
