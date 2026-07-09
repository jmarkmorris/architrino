import test from "node:test";
import assert from "node:assert/strict";
import { screwRigidity, residuals, residualsPerp, pass2Optimize, FAIL_CLOSED } from "../scripts/braid-ideal/spindle-braid-screw-drift-evaluator.mjs";

test("screw motion preserves rigidity under drift (co-screwing wake constant)", () => {
  const r = screwRigidity({ u: 0.4, cTrans: 0.9 });
  assert.equal(r.screwRigid, true, `maxVar ${r.maxVar}`);
});

test("rest anchor reproduces the spindle champion", () => {
  const f = residuals({ u: 0, cTrans: 1.0 }).globalRelResidual;
  assert.ok(Math.abs(f - 0.4721) < 0.002, `rest ${f}`);
});

test("partner-only closure has no interior cadence optimum: the pump pushes up-cadence at drift", () => {
  const cRail = Math.sqrt(1 - 0.16);
  const lo = residuals({ u: 0.4, cTrans: 0.92 * cRail }).globalRelResidual;
  const hi = residuals({ u: 0.4, cTrans: 1.08 * cRail }).globalRelResidual;
  assert.ok(hi < lo, `up-cadence ${hi} should beat down-cadence ${lo} (pump signature; brake channel excluded)`);
});

test("the electrino cap leads: closure prefers drift anti-parallel to the polarity dipole, growing with speed", () => {
  const c4 = Math.sqrt(1 - 0.16), c6 = Math.sqrt(1 - 0.36);
  const plus4 = residuals({ u: +0.4, cTrans: c4 }).globalRelResidual;
  const minus4 = residuals({ u: -0.4, cTrans: c4 }).globalRelResidual;
  const plus6 = residuals({ u: +0.6, cTrans: c6 }).globalRelResidual;
  const minus6 = residuals({ u: -0.6, cTrans: c6 }).globalRelResidual;
  assert.ok(minus4 < plus4, "electrino cap preferred at u=0.4");
  assert.ok(minus6 < plus6, "electrino cap preferred at u=0.6");
  assert.ok((plus6 - minus6) > (plus4 - minus4), "preference grows with speed");
});

test("pass 2: preferred-direction drift with geometry response closes better than rest, and the dish angle runs", () => {
  const rest = residuals({ u: 0, cTrans: 1.0 }).globalRelResidual;
  const r = pass2Optimize({ u: -0.2, rounds: 1 });
  assert.ok(r.fOpt < rest, `moving ${r.fOpt} vs rest ${rest}`);
  assert.ok(r.deg.alphaI > -12, `dish angle ran from -12 toward flat: ${r.deg.alphaI}`);
});

test("MM-analog: perpendicular drift closes worse than parallel (orientation anisotropy exists)", () => {
  const u = 0.2, c = Math.sqrt(1 - u * u);
  const par = residuals({ u: -u, cTrans: c }).globalRelResidual;
  const perp = residualsPerp({ u, cTrans: c }, { Nt: 6 }).globalRelResidual;
  assert.ok(perp > par + 0.03, `perp ${perp} vs par ${par}`);
});

test("report is fail-closed", () => {
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
