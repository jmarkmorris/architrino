import test from "node:test";
import assert from "node:assert/strict";
import { cycleResiduals, diagnosticReport } from "../scripts/braid-ideal/inclined-rings-flywheel-evaluator.mjs";

const d = Math.PI / 180;

test("iota=0 regression reproduces the planar nested floor", () => {
  const b = cycleResiduals({ iotas: [0, 0, 0] }, { Nt: 2 });
  assert.ok(Math.abs(b.globalRelResidual - 0.646) < 0.01, `global ${b.globalRelResidual}`);
});

test("uniform inclination about a common node is a global rotation (score invariant)", () => {
  const a = cycleResiduals({ iotas: [0, 0, 0] }, { Nt: 4 }).globalRelResidual;
  const b = cycleResiduals({ iotas: [30 * d, 30 * d, 30 * d] }, { Nt: 4 }).globalRelResidual;
  assert.ok(Math.abs(a - b) < 1e-6);
});

test("relative outer-ring inclination degrades closure (harmonic mismatch)", () => {
  const base = cycleResiduals({ iotas: [0, 0, 0] }, { Nt: 4 }).globalRelResidual;
  const inc = cycleResiduals({ iotas: [0, 0, 45 * d] }, { Nt: 4 }).globalRelResidual;
  assert.ok(inc > base + 0.05, `inclined ${inc} vs ${base}`);
});

test("small inner-ring inclination is nearly free (low-beta layers tolerate tilt)", () => {
  const base = cycleResiduals({ iotas: [0, 0, 0] }).globalRelResidual;
  const inc = cycleResiduals({ iotas: [15 * d, 0, 0] }).globalRelResidual;
  assert.ok(Math.abs(inc - base) < 0.01, `inner-inclined ${inc} vs ${base}`);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
