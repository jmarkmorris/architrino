import test from "node:test";
import assert from "node:assert/strict";
import { integrateChatter, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-rail-chatter-limit-cycle-integrator.mjs";

// Section 33 (reduced chatter integrator, first pass): the rail-straddling relaxation
// oscillation EXISTS (pump drives the site up through c_f, the click knocks it back;
// deterministic, self-timed), and the radial click contribution is real but small on
// circular-chatter geometry. QUANTITATIVE shape is NOT dt-converged: the pointwise
// 1/r^2 click spike reproduces the known pointwise-booking artifact — the redesign
// (clicks booked as chart-integrated impulse events) is the named next pass. Tests
// assert only the dt-robust facts.

test("null run: sub-rail site with no pump stays sub-rail, clickless, and circular", () => {
  const r = integrateChatter({ c1: 0, support: 1.0, beta0: 0.5, duration: 6 });
  assert.equal(r.clicksTotal, 0);
  assert.equal(r.crossUpTotal, 0);
  assert.ok(Math.abs(r.rMeanTail - 1) < 0.02, `radius held: ${r.rMeanTail}`);
  assert.ok(Math.abs(r.betaMean - 0.5) < 0.02, `speed held: ${r.betaMean}`);
});

test("pumped site clicks: the relaxation oscillation exists at both dt grades", () => {
  const a = integrateChatter({ duration: 8, dt: 5e-4 });
  const b = integrateChatter({ duration: 8, dt: 2.5e-4 });
  for (const r of [a, b]) {
    assert.ok(r.crossUpTotal >= 1, "site driven up through the rail (per-step witness)");
    assert.ok(r.clicksTotal >= 1, "self-channel click booked");
  }
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
