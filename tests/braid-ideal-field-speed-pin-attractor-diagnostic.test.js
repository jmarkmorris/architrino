import test from "node:test";
import assert from "node:assert/strict";

import {
  brakeOverPumpAt,
  marginalStratum,
  pinAttractorIntegration,
  diagnosticReport,
} from "../scripts/braid-ideal/field-speed-pin-attractor-diagnostic.mjs";

test("self-hit brake/pump ratio is monotone decreasing in the coincidence stratum", () => {
  const a = brakeOverPumpAt(0.1), b = brakeOverPumpAt(0.02), c = brakeOverPumpAt(0.005);
  assert.ok(a < b && b < c, `expected increasing brake as stratum shrinks: ${a},${b},${c}`);
});

test("inverting the pin balance gives a marginal stratum where brake = pump at field speed", () => {
  const m = marginalStratum();
  assert.ok(Math.abs(m.brakeOverPumpAtMarginal - 1) < 1e-3);
  // rho* lands in the measured bracket (0.01, 0.05)
  assert.ok(m.marginalStratum_rhoStar > 0.01 && m.marginalStratum_rhoStar < 0.05);
});

test("beta = 1 is a two-sided attractor when the brake exceeds the pump (ratio > 1)", () => {
  const stable = pinAttractorIntegration({ ratio: 1.5 });
  assert.equal(stable.twoSidedPin, true);
  for (const r of stable.runs) assert.ok(Math.abs(r.betaFinal - 1) < 0.03, `release ${r.release} -> ${r.betaFinal}`);
});

test("the balance is a bound, not a unique fixed point: marginal is half-stable, sub-marginal runs away", () => {
  const marginal = pinAttractorIntegration({ ratio: 1.0 });
  const sub = pinAttractorIntegration({ ratio: 0.5 });
  assert.equal(marginal.twoSidedPin, false); // neutral above field speed
  assert.equal(sub.twoSidedPin, false);
  // sub-marginal: super-field releases run away upward
  const up = sub.runs.find((r) => r.release === 1.1);
  assert.ok(up.betaFinal > 1.5, `sub-marginal should run away, got ${up.betaFinal}`);
});

test("the declared d0 (~50x brake) sits well inside the stable range and pins firmly", () => {
  const declared = pinAttractorIntegration({ ratio: 50 });
  assert.equal(declared.twoSidedPin, true);
});

test("report is fail-closed and reference (not the native solver)", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.ok(/reference_reduced_dynamics_not_native_solver/.test(r.authority));
});
