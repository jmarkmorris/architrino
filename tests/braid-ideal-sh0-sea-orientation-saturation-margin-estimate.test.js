import test from "node:test";
import assert from "node:assert/strict";
import { saturationMarginPerP0, braidAxialDipole, FAIL_CLOSED } from "../scripts/braid-ideal/sh0-sea-orientation-saturation-margin-estimate.mjs";

// Section 40: saturated ORIENTATION response (the SH-0-sea live channel) at the
// named spacing, with the braid's OWN axial dipole as p0, delivers ~4-6% inward
// margin from a single 6-site shell in the fast-alignment limit — meeting the
// Section 37 requirement that linear-dipole response missed by 25-40x. The
// alignment-speed limit is decisive (slow limit ~10x weaker), and the band
// structure persists (R=3.0 strongly loosening, R=4.0 the confining peak).

test("orientation saturation meets the 6% class at the named spacing (fast limit)", () => {
  const p0 = braidAxialDipole();
  assert.ok(p0 > 1.5 && p0 < 3, `available axial dipole ${p0}`);
  const r = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 8 });
  const margin = r.meanPerP0 * p0;
  assert.ok(margin > 0.03 && margin < 0.08, `named-spacing margin ${margin} in the 4-6% class (sampling wobble tolerated)`);
});

test("alignment speed is decisive: slow limit is several-fold weaker", () => {
  const fast = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 8 });
  const slow = saturationMarginPerP0({ Rsea: 4.25, mode: "slow", Nt: 8 });
  assert.ok(fast.meanPerP0 / Math.max(slow.meanPerP0, 1e-9) > 5, `fast/slow ${fast.meanPerP0}/${slow.meanPerP0}`);
});

test("band structure persists at saturation grade", () => {
  const tight = saturationMarginPerP0({ Rsea: 3.0, mode: "fast", Nt: 8 });
  const peak = saturationMarginPerP0({ Rsea: 4.0, mode: "fast", Nt: 8 });
  assert.ok(tight.meanPerP0 < 0, "R=3.0 strongly loosening");
  assert.ok(peak.meanPerP0 > 0.04, `R=4.0 confining peak ${peak.meanPerP0}`);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
