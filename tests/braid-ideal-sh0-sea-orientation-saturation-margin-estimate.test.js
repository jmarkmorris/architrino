import test from "node:test";
import assert from "node:assert/strict";
import { saturationMarginPerP0, braidAxialDipole, FAIL_CLOSED } from "../scripts/braid-ideal/sh0-sea-orientation-saturation-margin-estimate.mjs";

// UNIFORM-DELAY REGRESSION ROWS (pre-Row-3 published numbers; the Row 3 native run
// showed the uniform 2R/c idealization FLIPS the ledgers at exact per-pair delays —
// these tests pin the published rows in exactDelays:false mode for the record).
// Section 40 (by title): saturated ORIENTATION response (the SH-0-sea live channel) at the
// named spacing, with the braid's OWN axial dipole as p0, delivers ~4-6% inward
// margin from a single 6-site shell in the fast-alignment limit — meeting the
// Section 37 requirement that linear-dipole response missed by 25-40x. The
// alignment-speed limit is decisive (slow limit ~10x weaker), and the band
// structure persists (R=3.0 strongly loosening, R=4.0 the confining peak).

test("orientation saturation meets the 6% class at the named spacing (fast limit)", () => {
  const p0 = braidAxialDipole();
  assert.ok(p0 > 1.5 && p0 < 3, `available axial dipole ${p0}`);
  const r = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 8, exactDelays: false });
  const margin = r.meanPerP0 * p0;
  assert.ok(margin > 0.03 && margin < 0.08, `named-spacing margin ${margin} in the 4-6% class (sampling wobble tolerated)`);
});

test("alignment speed is decisive: slow limit is several-fold weaker", () => {
  const fast = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 8, exactDelays: false });
  const slow = saturationMarginPerP0({ Rsea: 4.25, mode: "slow", Nt: 8, exactDelays: false });
  assert.ok(fast.meanPerP0 / Math.max(slow.meanPerP0, 1e-9) > 5, `fast/slow ${fast.meanPerP0}/${slow.meanPerP0}`);
});

test("band structure persists at saturation grade", () => {
  const tight = saturationMarginPerP0({ Rsea: 3.0, mode: "fast", Nt: 8, exactDelays: false });
  const peak = saturationMarginPerP0({ Rsea: 4.0, mode: "fast", Nt: 8, exactDelays: false });
  assert.ok(tight.meanPerP0 < 0, "R=3.0 strongly loosening");
  assert.ok(peak.meanPerP0 > 0.04, `R=4.0 confining peak ${peak.meanPerP0}`);
});

test("sea tangential rows at the named spacing: forward on the inner, neutral on the middle", () => {
  const p0 = braidAxialDipole();
  const r = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 12, exactDelays: false });
  assert.ok(r.tanRowPerP0.I * p0 > 0.02, `sea torques the inner FORWARD: ${r.tanRowPerP0.I * p0}`);
  assert.ok(Math.abs(r.tanRowPerP0.M * p0) < 0.01, `sea leaves the rail layer alone: ${r.tanRowPerP0.M * p0}`);
  const off = saturationMarginPerP0({ Rsea: 3.5, mode: "fast", Nt: 12, exactDelays: false });
  assert.ok(off.tanRowPerP0.I * p0 < 0, "off-band spacing torques the inner backward (sign structure is spacing-selective)");
});

test("FCC-structured sea closes the radial budget at estimate grade; alignment must be fast", () => {
  const p0 = braidAxialDipole();
  const fcc = [[4.25, 12], [6.01, 6], [7.36, 24]];
  let radMean = 0, tanI = 0;
  for (const [R, n] of fcc) {
    const m = saturationMarginPerP0({ Rsea: R, mode: "fast", Nt: 8, exactDelays: false });
    radMean += ((m.marginPerP0.I + m.marginPerP0.M + m.marginPerP0.O) / 3) * (n / 6) * p0;
    tanI += m.tanRowPerP0.I * (n / 6) * p0;
  }
  assert.ok(radMean > 0.04 && radMean < 0.11, `FCC radial mean ${radMean} in the 6% class`);
  assert.ok(tanI > 0.02, `FCC inner torque ${tanI} forward but partial (~20% of need)`);
  // finite alignment rate: gamma/omega = 0.5 degrades the radial channel
  const slowish = saturationMarginPerP0({ Rsea: 4.25, mode: "relax", Nt: 8, gammaOverOmega: 0.5, exactDelays: false });
  const fast = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 8, exactDelays: false });
  const mean = (m) => (m.marginPerP0.I + m.marginPerP0.M + m.marginPerP0.O) / 3;
  assert.ok(mean(slowish) < mean(fast) - 0.005, "sluggish alignment loses the radial margin (fast-alignment requirement is one-sided)");
});

test("EXACT DELAYS: the named spacing anti-confines; the band moves inward; the fixed point sits near R*~3.4-3.5", () => {
  const p0 = braidAxialDipole();
  const at425 = saturationMarginPerP0({ Rsea: 4.25, mode: "fast", Nt: 8, exactDelays: true });
  const mean = (m) => ((m.marginPerP0.I + m.marginPerP0.M + m.marginPerP0.O) / 3) * p0;
  assert.ok(mean(at425) < -0.03, `exact delays flip 4.25 to anti-confining: ${mean(at425)} (Row 3 blocker reproduced)`);
  const at325 = saturationMarginPerP0({ Rsea: 3.25, mode: "fast", Nt: 8, exactDelays: true });
  const at35 = saturationMarginPerP0({ Rsea: 3.5, mode: "fast", Nt: 8, exactDelays: true });
  assert.ok(mean(at325) > 0.08 && mean(at35) > 0 && mean(at35) < 0.06, `band bracketed: ${mean(at325)}, ${mean(at35)} — 6-shell fixed point between 3.25 and 3.5`);
  assert.ok(at325.tanRowPerP0.I * p0 > 0.04, `inner torque forward in the band: ${at325.tanRowPerP0.I * p0}`);
});

test("EXACT DELAYS: no alignment rate rescues the named spacing (the band is geometric, not dynamic)", () => {
  const p0 = braidAxialDipole();
  const mean = (m) => ((m.marginPerP0.I + m.marginPerP0.M + m.marginPerP0.O) / 3) * p0;
  const r = saturationMarginPerP0({ Rsea: 4.25, mode: "relax", Nt: 8, gammaOverOmega: 2, exactDelays: true });
  assert.ok(mean(r) < -0.02, `4.25 stays anti-confining under relaxation dynamics: ${mean(r)}`);
});

test("SCOPED NEGATIVE (Row 5 gate): the FCC orientational-dipole sea starves the middle radially in every cell", () => {
  const p0 = braidAxialDipole();
  // representative cells of the (gamma, a) map at settled-relaxation, exact-delay grade
  for (const [a, g] of [[3.4, 2], [3.25, 2], [3.4, 5]]) {
    const m = saturationMarginPerP0({ Rsea: a, mode: "relax", Nt: 16, gammaOverOmega: g, exactDelays: true });
    assert.ok(m.marginPerP0.M * p0 < 0, `radM at (a=${a}, g=${g}) = ${m.marginPerP0.M * p0} (universal middle starvation)`);
    assert.ok(m.tanRowPerP0.I * p0 > 0.03, `tangential inner feed lag-robust at (a=${a}, g=${g})`);
  }
});

test("SECOND SCOPED NEGATIVE: complementary allocation cannot beat the sea's middle penalty", () => {
  // lambda-allocated braid (bare middle surplus) + this sea family: the sea's M-penalty
  // (~-0.15 at the geometry-matched p0) eats the bare surplus in every cell; min-total
  // stalls near 0.8, WORSE than bare v1's 0.88 — allocation cannot rescue this family.
  const d = Math.PI / 180;
  const v1 = { qI: 0.462, qO: 1.236, alphaI: -10.44 * d, alphaM: -2.67 * d, alphaO: 84 * d, thetaO: 337.04 * d, thetaI: -23.7 * d };
  const geo = { ...v1, qI: v1.qI / 0.9, qO: v1.qO / 0.9 };
  const p0 = braidAxialDipole(geo);
  const sea = saturationMarginPerP0({ geo, Rsea: 3.25, mode: "relax", Nt: 16, gammaOverOmega: 2, exactDelays: true });
  const totM = 0.95 + 2 * sea.marginPerP0.M * p0; // bare M at lambda=0.9 is 0.95
  assert.ok(sea.marginPerP0.M * p0 < -0.05, `sea M-penalty persists at lambda-geometry: ${sea.marginPerP0.M * p0}`);
  assert.ok(totM < 0.85, `total M ${totM} cannot reach the corridor`);
});

test("fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
