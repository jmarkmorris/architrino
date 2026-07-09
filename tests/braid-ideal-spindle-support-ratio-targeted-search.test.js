import test from "node:test";
import assert from "node:assert/strict";
import { supportRatios, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs";

const d = Math.PI / 180;
// Support-candidate v1 (Section 36): found by the support-first search after opening
// the inner-azimuth knob thetaI (never a knob in the closure-first searches).
export const SUPPORT_V1 = { qI: 0.462, qO: 1.236, alphaI: -10.44 * d, alphaM: -2.67 * d, alphaO: 84 * d, thetaO: 337.04 * d, thetaI: -23.7 * d };

test("baseline validation: champion support ratios reproduce the native seed rows", () => {
  const r = supportRatios({});
  assert.ok(Math.abs(r.ratios.I - 0.90) < 0.02, `I ${r.ratios.I}`);
  assert.ok(Math.abs(r.ratios.M - 0.755) < 0.02, `M ${r.ratios.M}`);
  assert.ok(Math.abs(r.ratios.O - 0.53) < 0.02, `O ${r.ratios.O}`);
});

test("support-candidate v1: all layers above 0.85, closure BELOW the old champion (co-improvement)", () => {
  const r = supportRatios({ geo: SUPPORT_V1 });
  assert.ok(r.minRatio > 0.85, `minRatio ${r.minRatio}`);
  assert.ok(r.ratios.I > 0.94 && r.ratios.O > 0.96, "inner and outer near full support");
  assert.ok(r.closure < 0.35, `closure ${r.closure} beats the 0.4721/0.4531 champion line`);
});

test("static toy sea is not the support fix: named spacing negligible, closer sea harmful", () => {
  const bare = supportRatios({ geo: SUPPORT_V1 });
  const named = supportRatios({ geo: SUPPORT_V1, sea: { Rsea: 4.25, sepSea: 0.5 } });
  const close = supportRatios({ geo: SUPPORT_V1, sea: { Rsea: 2.0, sepSea: 0.8 } });
  assert.ok(Math.abs(named.ratios.M - bare.ratios.M) < 0.01, "named spacing negligible on the middle");
  assert.ok(close.objective > bare.objective, "close static sea degrades the support objective");
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
