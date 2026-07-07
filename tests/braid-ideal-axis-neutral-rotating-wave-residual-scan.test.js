import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  rotatingWaveResiduals,
  runScan,
} from "../scripts/braid-ideal/axis-neutral-rotating-wave-residual-scan.mjs";

test("axial residual is strictly negative for alpha>0 (sign-lemma witness)", () => {
  for (const [alpha, beta] of [[0.2, 0.1], [0.7071, 0.5], [1.5, 0.9], [0.1, 0.05]]) {
    const r = rotatingWaveResiduals(alpha, beta);
    assert.ok(r, `residuals must resolve at alpha=${alpha}, beta=${beta}`);
    assert.ok(r.axial < 0, `axial residual must be negative, got ${r.axial}`);
  }
});

test("planar hexagon tangential residual stays positive across the scan (anti-damping, no rigid equilibrium)", () => {
  const result = runScan();
  assert.equal(result.schema, SCHEMA);
  assert.equal(result.axial_no_balance.all_negative, true);
  assert.ok(result.axial_no_balance.max_axial_residual < 0);
  assert.equal(result.planar_tangential_scan.sign_changes, 0);
  assert.ok(result.planar_tangential_scan.min_tangential > 0);
  assert.equal(result.disposition, "rigid_u0_rotating_wave_family_no_admissible_row_in_scan");
});

test("scan output remains fail closed", () => {
  const result = runScan();
  assert.equal(result.retainedBranchClaim, false);
  assert.equal(result.acceptedSameLevelBranchClaim, false);
  assert.equal(result.scoreMovement, "no_score_increase");
  assert.equal(result.claim_level, "priority_only_sampled_diagnostic_not_retained_branch_evidence");
});

test("planar static limit is tangentially quiet by reflection symmetry", () => {
  const r = rotatingWaveResiduals(0, 0.0001);
  assert.ok(Math.abs(r.tangential) < 0.001, `near-static tangential must vanish linearly, got ${r.tangential}`);
  assert.ok(r.radial < 0, "net radial force must be inward on the planar hexagon");
});
