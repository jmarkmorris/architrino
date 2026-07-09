import test from "node:test";
import assert from "node:assert/strict";
import { cycleResiduals, diagnosticReport } from "../scripts/braid-ideal/planar-tri-binary-kepler-extension.mjs";

test("e=0 regression matches the circular iso-frequency floor", () => {
  const b = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0, eO: 0 });
  assert.ok(Math.abs(b.globalRelResidual - 0.646) < 0.01, `global ${b.globalRelResidual}`);
});

test("psi is a live knob under equal-area modulation (gauge argument does not apply)", () => {
  const a = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0.2, psiI: Math.PI / 2 });
  const b = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0.2, psiI: (3 * Math.PI) / 2 });
  assert.ok(Math.abs(a.globalRelResidual - b.globalRelResidual) > 1e-3);
});

test("equal-area (Kepler) modulation degrades closure in the scanned directions", () => {
  const base = cycleResiduals({ qI: 0.5, qO: 1.6 }).globalRelResidual;
  const dI = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0.2 }).globalRelResidual;
  const dO = cycleResiduals({ qI: 0.5, qO: 1.6, eO: 0.2 }).globalRelResidual;
  assert.ok(dI > base, `inner Kepler ${dI} vs ${base}`);
  assert.ok(dO > base, `outer Kepler ${dO} vs ${base}`);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
