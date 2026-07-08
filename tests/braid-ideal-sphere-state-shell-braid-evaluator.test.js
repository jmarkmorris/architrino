import test from "node:test";
import assert from "node:assert/strict";
import { cycleResiduals, diagnosticReport } from "../scripts/braid-ideal/sphere-state-shell-braid-evaluator.mjs";

test("sphere state is binary-symmetric under symmetric phases", () => {
  const r = cycleResiduals({ beta: 0.9, phases: [0, 0, 0] }, { Nt: 6 });
  const p = r.relResidualPerBinary;
  assert.ok(Math.max(...p) - Math.min(...p) < 1e-6);
});

test("orthogonal-plane sphere state is far from closure (harmonic mismatch extends to 3D)", () => {
  const r = cycleResiduals({ beta: 0.9, phases: [0, 0, 0] }, { Nt: 6 });
  assert.ok(r.globalRelResidual > 0.9, `global ${r.globalRelResidual}`);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
});
