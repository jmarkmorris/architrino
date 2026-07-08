import test from "node:test";
import assert from "node:assert/strict";
import { residuals, rigidityCheck, diagnosticReport } from "../scripts/braid-ideal/rigid-tilted-nested-braid-evaluator.mjs";

const d = Math.PI / 180;

test("tilted dumbbells preserve rigidity (rotating-frame wake constant in time)", () => {
  const r = rigidityCheck({ alphaI: 0.4, alphaO: 0.9 });
  assert.equal(r.timeIndependent, true, `maxVar ${r.maxVar}`);
});

test("alpha=0 regression reproduces the planar nested floor", () => {
  const b = residuals({ alphaI: 0, alphaO: 0 });
  assert.ok(Math.abs(b.globalRelResidual - 0.646) < 0.01, `global ${b.globalRelResidual}`);
});

test("outer tilt improves closure below the planar floor (first freedom to do so)", () => {
  const base = residuals({ alphaI: 0, alphaO: 0 }).globalRelResidual;
  const tilted = residuals({ alphaI: 0, alphaO: 75 * d }).globalRelResidual;
  assert.ok(tilted < base, `tilted ${tilted} vs planar ${base}`);
});

test("inner tilt degrades closure (inner is over-bound; lowering its need is the wrong direction)", () => {
  const base = residuals({ alphaI: 0, alphaO: 0 }).globalRelResidual;
  const tilted = residuals({ alphaI: 30 * d, alphaO: 0 }).globalRelResidual;
  assert.ok(tilted > base);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
