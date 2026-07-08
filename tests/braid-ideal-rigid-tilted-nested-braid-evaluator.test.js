import test from "node:test";
import assert from "node:assert/strict";
import { residuals, rigidityCheck, polarScore, diagnosticReport } from "../scripts/braid-ideal/rigid-tilted-nested-braid-evaluator.mjs";

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

test("polar limit: no levitation equilibrium (axial force stays inward) and counter-tilt beats plain tilt", () => {
  const near = polarScore({ qI: 0.5, qO: 1.5 });
  const far = polarScore({ qI: 0.5, qO: 3.0 });
  assert.ok(near.polarAxialForce < 0 && far.polarAxialForce < 0, "caps always pulled inward");
  assert.ok(Math.abs(far.polarAxialForce) < Math.abs(near.polarAxialForce), "pull decays with height");
  const plain = residuals({ qI: 0.5, qO: 2.0, alphaI: 0, alphaO: 84 * d }).globalRelResidual;
  const counter = residuals({ qI: 0.5, qO: 2.0, alphaI: -15 * d, alphaO: 84 * d }).globalRelResidual;
  assert.ok(counter < plain, `counter ${counter} vs plain ${plain}`);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
