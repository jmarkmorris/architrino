import test from "node:test";
import assert from "node:assert/strict";

import {
  buildSelfHitBrakeCentralMeasurement,
  measureRigidCrossingOnProductionSolver,
  measureAcceleratingCrossingSign,
  measureBrakeMagnitudeVsStratum,
  pumpPerRotation,
} from "../scripts/braid-ideal/self-hit-brake-central-measurement.mjs";

test("production solver reproduces the recorded vt095 rigid crossing and emits the signed orientation", () => {
  const rigid = measureRigidCrossingOnProductionSolver();
  assert.equal(rigid.rootFound, true);
  assert.equal(rigid.rootKind, "same-source");
  // Packet Section 6: r_c = 0.1768, D_s = D_T = 0.00393.
  assert.ok(Math.abs(rigid.chordRadius - 0.1766) < 2e-3, `chordRadius ${rigid.chordRadius}`);
  assert.ok(
    Math.abs(rigid.sourceNormalDenominator - rigid.receiverNormalNumerator) < 1e-9,
    "rigid circle gives D_s = D_T"
  );
  // The signed branch orientation is emitted by the production runtime.
  assert.ok(Number.isFinite(rigid.signedBranchOrientation));
  assert.equal(rigid.reflectionLockedToUnity, true);
});

test("the exposed same-source branchWeight discards the sign (naive-kernel defect)", () => {
  const rigid = measureRigidCrossingOnProductionSolver();
  assert.equal(rigid.signDiscardedByBranchWeight, true);
  assert.ok(Math.abs(rigid.exposedBranchWeight - Math.abs(rigid.signedBranchOrientation)) < 1e-12);
});

test("the accelerating crossing is regulator-independently absorptive (signed m < 0)", () => {
  const sign = measureAcceleratingCrossingSign();
  assert.ok(sign.rows.length >= 3);
  assert.equal(sign.allAbsorptive, true);
  for (const row of sign.rows) {
    assert.ok(row.signedBranchOrientation < 0, `m = ${row.signedBranchOrientation}`);
    assert.ok(row.receiverNormalNumerator < 0, "D_T < 0 past the hinge");
    assert.ok(row.sourceNormalDenominator > 0, "D_s > 0 past the hinge");
    assert.ok(row.receiverSpeed > row.sourceSpeed, "receiver faster than its own past");
  }
});

test("the brake magnitude reduces to the declared coincidence stratum", () => {
  const magnitude = measureBrakeMagnitudeVsStratum();
  assert.ok(Math.abs(magnitude.pumpPerRotation - 22.17) < 0.05);
  const fractions = magnitude.rows.map((r) => r.absorbedFractionOfCertifiedPump);
  // Monotone growth as the stratum shrinks (log-divergent magnitude).
  for (let i = 1; i < fractions.length; i += 1) {
    assert.ok(fractions[i] > fractions[i - 1], "absorbed fraction grows as stratum shrinks");
  }
  // The beat-the-clock verdict flips with the declared stratum: undecidable
  // without the ontology input.
  const large = magnitude.rows[0];
  const small = magnitude.rows[magnitude.rows.length - 1];
  assert.equal(large.beatsClock, false);
  assert.equal(small.beatsClock, true);
});

test("pump-per-rotation matches the certified value", () => {
  assert.ok(Math.abs(pumpPerRotation() - 22.17) < 0.05);
});

test("report is fail-closed and names the three producer gaps", () => {
  const report = buildSelfHitBrakeCentralMeasurement();
  assert.equal(report.retainedBranchClaim, false);
  assert.equal(report.scoreMovement, "no_score_increase");
  assert.equal(report.accepted_seed_path_certificate, false);
  assert.equal(report.central_solver_retained_history_acceptance, false);
  assert.equal(report.signed_orientation_emitted_by_production, true);
  assert.equal(report.sign_decided_absorptive, true);
  assert.equal(report.magnitude_reduces_to_declared_stratum, true);
  assert.equal(report.named_producer_gaps.length, 3);
  assert.equal(
    report.disposition,
    "central_solver_self_hit_brake_sign_absorptive_magnitude_set_by_operator_declared_d0_not_load_bearing"
  );
  assert.equal(
    report.first_missing_object,
    "non_coincident_cross_hit_hinge_sustained_alignment_over_a_click_window"
  );
  // Operator 2026-07-08 supplied the coincidence-stratum ontology input (d0 = R_MCB).
  assert.equal(report.declared_stratum_supplied_by_operator, true);
  assert.equal(report.operator_ontology_input.symbol, "d0");
  assert.equal(report.operator_ontology_input.symmetric_self_hit_load_bearing, false);
  const stratumGap = report.named_producer_gaps.find(
    (g) => g.gap === "coincidence_stratum_is_a_numerical_floor"
  );
  assert.equal(stratumGap.status, "resolved_by_operator_declared_d0_2026_07_08");
});
