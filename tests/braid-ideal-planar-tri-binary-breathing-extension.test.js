import test from "node:test";
import assert from "node:assert/strict";
import { cycleResiduals, diagnosticReport } from "../scripts/braid-ideal/planar-tri-binary-breathing-extension.mjs";

test("circular baseline reproduces the Section 16 mismatch in the unified metric", () => {
  const b = cycleResiduals({ qI: 0.3, qO: 2.09, eI: 0, eO: 0 }, { Nt: 1 });
  // inner worst (over-bound), outer bad (under-bound), middle best
  assert.ok(b.relResidual.I > b.relResidual.O && b.relResidual.O > b.relResidual.M);
  assert.ok(b.relResidual.I > 1.5, `I ${b.relResidual.I}`);
  assert.ok(b.globalRelResidual > 0.5, "circular zero-curve point is far from full closure");
});

test("psi is a gauge for m=2 modulation at constant angular rate", () => {
  const a = cycleResiduals({ qI: 0.5, qO: 1.6, eO: 0.2, psiO: 0 });
  const b = cycleResiduals({ qI: 0.5, qO: 1.6, eO: 0.2, psiO: Math.PI / 2 });
  assert.ok(Math.abs(a.globalRelResidual - b.globalRelResidual) < 1e-6);
});

test("circular is a shape-space local minimum: every m=2 breathing direction degrades closure", () => {
  const base = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0, eO: 0 }, { Nt: 1 }).globalRelResidual;
  const dI = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0.1, eO: 0 }).globalRelResidual;
  const dO = cycleResiduals({ qI: 0.5, qO: 1.6, eI: 0, eO: 0.1 }).globalRelResidual;
  assert.ok(dI > base, `eI direction ${dI} vs ${base}`);
  assert.ok(dO > base, `eO direction ${dO} vs ${base}`);
});

test("report is fail-closed and prescribed-worldline", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.ok(/prescribed_worldline/.test(r.authority));
});
