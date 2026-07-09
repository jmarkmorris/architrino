import test from "node:test";
import assert from "node:assert/strict";
import { clickEventStudy, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-rail-chatter-limit-cycle-integrator.mjs";

// Section 34 (event-local fine study): the click event is SELF-LIMITING — absorbed
// magnitude is a dt-artifact (continuum limit = perfect ceiling / sliding mode on
// beta = 1), but the radial:tangential RATIO of the event impulse is dt-converged
// and obeys a linear law in the entry radial velocity:
//   ratio(vr) ~ 0.013 + 1.02 * vr
// (clicks kick inward harder when the site moves outward — a click-synchronized
// radial damper; the epicyclic lever, measured).

test("event impulse ratio is dt-converged even though magnitudes are not", () => {
  const a = clickEventStudy({ dtFine: 2e-5 });
  const b = clickEventStudy({ dtFine: 1e-5 });
  assert.ok(Math.abs(b.pTanAbsorbed / a.pTanAbsorbed) < 0.7, "absorbed magnitude is dt-limited (ceiling limit)");
  assert.ok(Math.abs(a.radialPerTangential - b.radialPerTangential) < 1e-3,
    `ratio converged: ${a.radialPerTangential} vs ${b.radialPerTangential}`);
});

test("the epicyclic lever: ratio is linear in entry radial velocity, damper-signed", () => {
  const out = clickEventStudy({ vr0: +0.15 });
  const mid = clickEventStudy({ vr0: 0 });
  const inn = clickEventStudy({ vr0: -0.15 });
  assert.ok(mid.radialPerTangential > 0.005 && mid.radialPerTangential < 0.02, `grazing ratio ${mid.radialPerTangential}`);
  assert.ok(out.radialPerTangential > 0.12, "outward-moving click kicks inward much harder");
  assert.ok(inn.radialPerTangential < -0.10, "inward-moving click kicks outward (damper sign)");
  const slope = (out.radialPerTangential - inn.radialPerTangential) / 0.3;
  assert.ok(Math.abs(slope - 1.02) < 0.15, `linear slope ${slope}`);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
