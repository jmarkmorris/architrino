import test from "node:test";
import assert from "node:assert/strict";
import { vectorClickImpulse, sustainedChannelMap, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-rail-click-booking-vector-evaluator.mjs";

// Section 32 (the brake attack, evaluator track): full-vector chart-clean booking.
//  - The click impulse across the field-speed crossing is tangentially ABSORPTIVE and
//    radially INWARD, converged in nstep, signs stable across coincidence cuts
//    (magnitude is stratum-set by derivation, Section 2.3).
//  - The sustained supra-rail channel is a phase-sensitive valve: m = +1 exactly at
//    betaDot = 0 (reflection symmetry; outward+forward pump), m > 1 for betaDot < 0
//    (decay boosted outward — the native dispersal mechanism), m < 0 for strong
//    betaDot > 0 (brake + inward). Confinement is DYNAMIC, not static.

test("click impulse: absorptive tangential, inward radial, cut-stable signs", () => {
  const a = vectorClickImpulse({ nstep: 200, cut: 0.01 });
  const b = vectorClickImpulse({ nstep: 200, cut: 0.005 });
  assert.ok(a.definable && b.definable);
  for (const r of [a, b]) {
    assert.ok(r.impulseTangential < 0, `tangential ${r.impulseTangential} should be absorptive`);
    assert.ok(r.impulseRadial < 0, `radial ${r.impulseRadial} should be inward`);
  }
  assert.ok(Math.abs(b.impulseTangential) > Math.abs(a.impulseTangential), "magnitude grows as the cut shrinks (stratum-set)");
});

test("click impulse converges in nstep", () => {
  const a = vectorClickImpulse({ nstep: 200, cut: 0.01 });
  const b = vectorClickImpulse({ nstep: 400, cut: 0.01 });
  assert.ok(Math.abs((b.impulseTangential - a.impulseTangential) / b.impulseTangential) < 0.08, "tangential nstep-converged");
});

test("sustained channel: exact reflection symmetry at betaDot=0, valve asymmetry around it", () => {
  const rows = sustainedChannelMap({ betas: [1.02], betaDots: [-0.02, 0, 0.1] });
  const at = (bd) => rows.find((r) => r.betaDot === bd);
  assert.ok(Math.abs(at(0).m - 1) < 1e-9, `steady circle m=${at(0).m} must be +1 exactly`);
  assert.ok(at(0).radial > 0, "steady supra-rail self-channel pushes OUTWARD (anti-confining)");
  assert.ok(at(-0.02).m > 1, `decaying rider boosted (m=${at(-0.02).m} > 1): the native outward-ride mechanism`);
  assert.ok(at(0.1).m < 0, `strongly pumped rider braked (m=${at(0.1).m} < 0)`);
  assert.ok(at(0.1).radial < 0, "brake phase pulls INWARD (dynamic confinement window)");
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
