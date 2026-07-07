import test from "node:test";
import assert from "node:assert/strict";

import {
  SCHEMA,
  run,
  evaluateBeta,
  torqueHarmonics,
  CERTIFIED_PUMP_C1,
} from "../scripts/braid-ideal/sh-0-sea-dynamic-polarization-drive-diagnostic.mjs";

test("C3 symmetry forces threefold-only orientational drive harmonics", () => {
  const h = torqueHarmonics({ beta: 0.5, delayed: true });
  // m=1,2,4,5,7,8 vanish; m=0,3,6,9 survive
  for (const m of [1, 2, 4, 5, 7, 8]) {
    assert.ok(h[m] < 1e-18, `harmonic m=${m} should vanish, got ${h[m]}`);
  }
  assert.ok(h[0] > 0.1, `static torque m=0 present: ${h[0]}`);
  assert.ok(h[3] > 1e-3, `leading AC drive m=3 present: ${h[3]}`);
  // the m=3 harmonic dominates the threefold ladder by orders of magnitude
  assert.ok(h[3] > 1e3 * Math.max(h[6], h[9]), "m=3 dominates higher threefold harmonics");
});

test("dynamic induced polarization is absorptive but insufficient at cluster stiffness", () => {
  const result = run();
  assert.equal(result.schema, SCHEMA);
  assert.equal(result.disposition, "dynamic_induced_polarization_absorptive_but_insufficient_at_cluster_stiffness");
  assert.equal(result.cluster_stiffness_sufficient_for_absorption, false);
  // the chi'' threshold to beat the pump exceeds the cluster-derived chi'' max
  assert.ok(result.shortfall_factor_chi_threshold_over_cluster_chi_max > 1);
  // the required orientational stiffness is far softer than the cluster's O(0.3-0.5)
  assert.ok(result.max_stiffness_threshold_K < 0.1, `K threshold ${result.max_stiffness_threshold_K}`);
  assert.equal(result.free_amplitude_parameter_count, 0);
  assert.equal(result.retainedBranchClaim, false);
  assert.equal(result.scoreMovement, "no_score_increase");
  assert.equal(result.authorization.scoreMovement, "no_score_increase");
});

test("per-beta damping coefficient and pump-threshold structure", () => {
  const r = evaluateBeta({ beta: 0.9, delayed: true });
  // damping prefactor Phi_ind/chi'' is O(0.1); pump slope is the certified c1
  assert.ok(r.phi_ind_per_chi > 0.05 && r.phi_ind_per_chi < 0.3);
  assert.ok(Math.abs(r.pump_c1_beta - CERTIFIED_PUMP_C1 * 0.9) < 1e-12);
  // absorbing the pump needs chi'' well above unity (soft near-Goldstone mode)
  assert.ok(r.chi_second_threshold_to_beat_pump > 5);
  // at plausible cluster chi'' ~ 1 the damping is <= ~0.2, i.e. <10% of the pump
  const phiAtChiOne = r.phi_ind_per_chi * 1.0;
  assert.ok(phiAtChiOne < 0.1 * r.pump_c1_beta + 0.02);
});
