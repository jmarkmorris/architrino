import test from "node:test";
import assert from "node:assert/strict";
import { buildBraid, cycleResiduals, diagnosticReport } from "../scripts/braid-ideal/planar-tri-binary-frequency-lock-evaluator.mjs";

test("4:2:1 with middle on rail restores the inner-super-field ordering", () => {
  const b = buildBraid({ lock: [4, 2, 1], qI: 0.7, qO: 1.5 });
  assert.ok(Math.abs(b.betas.M - 1) < 1e-12);
  assert.ok(b.betas.I > 1, `inner beta ${b.betas.I}`);
  assert.ok(b.betas.O < 1, `outer beta ${b.betas.O}`);
});

test("frequency-locked circular states are far from closure (harmonic mismatch)", () => {
  const a = cycleResiduals({ lock: [4, 2, 1], qI: 0.7, qO: 1.5 });
  const k = cycleResiduals({ lock: [4, 2, 1], qI: 0.63, qO: 1.587 }); // Kepler-third-law radii
  assert.ok(a.globalRelResidual > 0.9, `generic ${a.globalRelResidual}`);
  assert.ok(k.globalRelResidual > 0.9, `Kepler-scaled ${k.globalRelResidual}`);
});

test("counter-rotation degrades closure relative to the co-rotating iso-frequency floor", () => {
  const c = cycleResiduals({ lock: [1, 1, -1], qI: 0.5, qO: 1.6 });
  assert.ok(c.globalRelResidual > 0.8, `counter-rotating ${c.globalRelResidual} vs floor 0.646`);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
