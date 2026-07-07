import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  breathingResidualsAtPhase,
  cycleAveragedResiduals,
  rationalLock,
  runScan,
} from "../scripts/braid-ideal/axis-neutral-breathing-residual-scan.mjs";
import { rotatingWaveResiduals } from "../scripts/braid-ideal/axis-neutral-rotating-wave-residual-scan.mjs";

test("delta=0 limit reproduces the rigid rotating-wave residuals exactly", () => {
  for (const beta of [0.1, 0.3, 0.5, 0.8]) {
    const rigid = rotatingWaveResiduals(0, beta);
    const breathing = cycleAveragedResiduals(0, beta, 0, 1);
    assert.ok(Math.abs(breathing.avg_tangential - rigid.tangential) < 1e-12,
      `tangential mismatch at beta=${beta}`);
    assert.ok(Math.abs(breathing.avg_force_radial - rigid.radial) < 1e-12,
      `radial mismatch at beta=${beta}`);
  }
});

test("cycle averages are quadrature-stable and sampling-offset-stable (phi0 quotient)", () => {
  const a = cycleAveragedResiduals(0, 0.3, 0.3, 1.5, { nPhase: 64 });
  const b = cycleAveragedResiduals(0, 0.3, 0.3, 1.5, { nPhase: 96 });
  assert.ok(Math.abs(a.avg_tangential - b.avg_tangential) < 1e-6,
    "cycle average must converge in the phase quadrature");
  // Residuals depend on time only through the breathing phase: a phase-shifted
  // evaluation grid is the same integral, so the midpoint averages must agree.
  const nPhase = 64;
  let shifted = 0;
  for (let k = 0; k < nPhase; k += 1) {
    const theta = (2 * Math.PI * (k + 0.25)) / nPhase;
    shifted += breathingResidualsAtPhase(0, 0.3, 0.3, 0.45, theta).force_tangential;
  }
  assert.ok(Math.abs(shifted / nPhase - a.avg_tangential) < 1e-6,
    "cycle average must be independent of the sampling phase offset");
});

test("axial residual stays strictly negative over the cycle for alpha>0 under breathing", () => {
  for (const [alpha, beta, delta, ratio] of [[0.2, 0.1, 0.2, 1], [0.7071, 0.5, 0.3, 2], [1.5, 0.7, 0.1, 0.5]]) {
    const row = cycleAveragedResiduals(alpha, beta, delta, ratio);
    assert.ok(row, `cycle average must resolve at alpha=${alpha}`);
    assert.ok(row.max_axial < 0, `pointwise-max axial must stay negative, got ${row.max_axial}`);
  }
});

test("scan reports the breathing-family disposition with consistent candidate bookkeeping", () => {
  const result = runScan();
  assert.equal(result.schema, SCHEMA);
  assert.equal(result.axial_witness.all_negative, true);
  assert.ok(result.axial_witness.max_axial_residual < 0);
  assert.ok(result.planar_breathing_scan.admissible_cells > 1000);
  assert.equal(result.planar_breathing_scan.cross_axis_sign_changes, 0);
  if (result.candidates.length === 0) {
    assert.equal(result.disposition, "breathing_family_no_zero_average_row_in_scanned_box");
    assert.ok(result.planar_breathing_scan.min_avg_tangential > 0);
    assert.ok(result.extended_omega_probe.min_avg_tangential > 0);
  } else {
    assert.equal(result.disposition, "breathing_family_cycle_averaged_zero_rows_found_candidate_only");
    for (const row of result.candidates) {
      assert.ok(Math.abs(row.avg_tangential) < 1e-6, "candidate rows must sit on the cycle-averaged zero");
      assert.ok(row.sub_field && row.radial_scale_recoverable, "candidate rows must satisfy admissibility");
      assert.ok(Number.isInteger(row.phase_closure.p) && Number.isInteger(row.phase_closure.q),
        "candidate rows carry integer phase-closure labels");
    }
  }
});

test("breathing pump suppression is real but floored above zero in the scanned box", () => {
  const result = runScan();
  const probe = result.extended_omega_probe;
  assert.ok(probe.min_pump_suppression_vs_rigid < 0.85,
    "breathing must visibly suppress the rigid pump at the admissibility edge");
  assert.ok(probe.min_pump_suppression_vs_rigid > 0,
    "no admissible cell reverses the cycle-averaged pump in the scanned box");
  assert.ok(probe.pointwise_reversal_at_min_cell.negative_phase_fraction > 0,
    "the instantaneous pump reverses within the cycle at the probe minimum");
});

test("rational lock labels are continued-fraction sane", () => {
  assert.deepEqual(rationalLock(2), { p: 2, q: 1, error: 0 });
  const lock = rationalLock(1.5);
  assert.equal(lock.p, 3);
  assert.equal(lock.q, 2);
  const golden = rationalLock((1 + Math.sqrt(5)) / 2, 16);
  assert.ok(golden.error > 1e-4, "an irrational ratio must show visible detuning at bounded q");
});

test("scan output remains fail closed", () => {
  const result = runScan();
  assert.equal(result.retainedBranchClaim, false);
  assert.equal(result.acceptedSameLevelBranchClaim, false);
  assert.equal(result.scoreMovement, "no_score_increase");
  assert.equal(result.claim_level, "priority_only_sampled_diagnostic_not_retained_branch_evidence");
});
