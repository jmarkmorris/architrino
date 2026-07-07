import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  RECORDED,
  PUMP_PER_ROTATION,
  omega,
  selfHitRoot,
  chartAtRoot,
  degeneracyDiagnosis,
  regulatorDependence,
  absorberVerdict,
  contractRows,
  measurementReport,
} from "../scripts/braid-ideal/fold-crossing-chart-measurement.mjs";

test("self-hit root exists only above field speed and opens at the crossing", () => {
  assert.equal(selfHitRoot(0.95), null); // sub-field: no same-source root
  assert.equal(selfHitRoot(1.0), null); // exactly at field speed: double root at Delta=0
  const d = selfHitRoot(RECORDED.crossingSpeedMax);
  assert.ok(d > 0, `Delta*=${d}`);
  // reconstructed omega at release matches the recorded angular rate
  assert.ok(Math.abs(omega(0.95) - 1.16350762782201) < 1e-9);
});

test("branch orientation factor is exactly 1 (reflection symmetry)", () => {
  const c = chartAtRoot(RECORDED.crossingSpeedMax);
  assert.ok(Math.abs(c.m - 1) < 1e-12);
  assert.ok(Math.abs(c.DT - c.Ds) < 1e-12); // receiver-normal == source-normal
});

test("crossing is a cusp born at the coincidence stratum, not a generic A2 fold", () => {
  const d = degeneracyDiagnosis();
  // r_c^2 ~ const * eps_beta and a ~ const * sqrt(eps_beta): both vanish at beta=1
  assert.equal(d.coincidenceCuspConfirmed, true);
  assert.equal(d.branchOrientationUnity, true);
  // r_c and a both shrink toward the crossing
  const first = d.rows[0];
  const last = d.rows[d.rows.length - 1];
  assert.ok(first.rc < last.rc); // smaller offset => smaller chord (toward coincidence)
});

test("measured click impulse is regulator-dependent (no chart-defined impulse)", () => {
  const r = regulatorDependence();
  assert.equal(r.regulatorIndependent, false);
  assert.equal(r.growsAsRegVanishes, true);
  // impulse grows without bound as the spatial regulator shrinks
  const impulses = r.values.map((v) => v.impulse);
  assert.ok(impulses[impulses.length - 1] > impulses[0]);
});

test("absorber verdict: one click does not absorb the certified pump per rotation", () => {
  const v = absorberVerdict();
  assert.equal(v.nClickPerCrossing, 1);
  assert.ok(v.pumpPerRotation > 20 && v.pumpPerRotation < 23); // 2 pi c1 / rho ~ 22.17
  assert.equal(v.absorbs, false);
  assert.ok(v.absorbedFraction < 1);
  assert.equal(v.regulatorDependent, true);
});

test("contract rows are emitted with the cusp/coincidence degeneracy flags", () => {
  const rows = contractRows();
  assert.equal(rows.action_ledger_row.chart_impulse, null);
  assert.equal(rows.action_ledger_row.regularization_independence_witness, "failed_regulator_dependent_log");
  assert.equal(rows.action_ledger_row.chart_validity, "a_below_cusp_floor_fold_born_at_coincidence");
  assert.equal(rows.root_transition_row.a_above_cusp_floor, false);
  assert.equal(rows.receiver_normal_row.branch_orientation_factor_m, 1);
  assert.equal(rows.receiver_normal_row.chart_integrated_weight, null);
});

test("measurement report is fail-closed with the failure-branch disposition", () => {
  const r = measurementReport();
  assert.equal(r.schema, SCHEMA);
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.retainedBranch, null);
  assert.equal(
    r.disposition,
    "symmetric_self_hit_fold_is_cusp_at_coincidence_no_regulator_independent_click_impulse"
  );
});
