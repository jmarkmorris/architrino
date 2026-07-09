import test from "node:test";
import assert from "node:assert/strict";
import { clickActionRow, JzHelicityDecomposition, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-braid-click-action-invariance-evaluator.mjs";

// Section 31 (h_act(u) first pass, frozen champion geometry, pinned cadence):
//  - stored kinematic action per click dilates EXACTLY as 1/gamma (pinned-cadence identity);
//  - the transacted wake angular impulse per click Jz splits: helicity-ODD linear term
//    (+0.236|u|, leader-selected sign) and helicity-EVEN quadratic run-down (-1.28 u^2),
//    ~2.6x steeper than 1/gamma — NOT invariant at frozen geometry;
//  - the frozen-geometry pump-work channel reverses sign by u ~ 0.6.

test("stored kinematic action per click dilates exactly as 1/gamma", () => {
  const rest = clickActionRow({ u: 0 });
  const r = clickActionRow({ u: -0.3 });
  assert.ok(Math.abs(r.Skin / rest.Skin - 1 / r.gamma) < 1e-9, `Skin ratio ${r.Skin / rest.Skin} vs 1/gamma ${1 / r.gamma}`);
});

test("transacted angular impulse per click: linear helicity-odd term, quadratic even run-down", () => {
  const a = JzHelicityDecomposition({ u: 0.1 });
  const b = JzHelicityDecomposition({ u: 0.2 });
  // odd part linear: coefficient ~0.236, stable under doubling
  assert.ok(a.oddPart > 0, "preferred leader carries the larger click transaction");
  const cA = a.oddPart / 0.1, cB = b.oddPart / 0.2;
  assert.ok(Math.abs(cA - 0.236) < 0.03, `odd coefficient ${cA}`);
  assert.ok(Math.abs(cB / cA - 1) < 0.1, `odd part not linear: ${cB} vs ${cA}`);
  // even deficit quadratic: ratio ~4 under doubling, coefficient ~1.28 (steeper than 1/gamma's 0.5)
  const ratio = b.evenDeficit / a.evenDeficit;
  assert.ok(ratio > 3.5 && ratio < 4.5, `even deficit ratio ${ratio} not quadratic`);
  assert.ok(a.evenDeficit / 0.01 > 1.0, `even run-down ${a.evenDeficit / 0.01} should exceed the 1/gamma rate 0.5`);
});

test("frozen-geometry pump-work action collapses and reverses sign at high drift", () => {
  const lo = clickActionRow({ u: -0.1 });
  const hi = clickActionRow({ u: -0.6 });
  assert.ok(lo.SE > 0, "pump-work action positive at low drift");
  assert.ok(hi.SE < 0, "pump-work channel reversed at u=0.6 (frozen geometry far off-family)");
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
