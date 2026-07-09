import test from "node:test";
import assert from "node:assert/strict";
import {
  buildBraid,
  rigidityCheck,
  equalRadiiValidation,
  receiverTangential,
  receiverResiduals,
  selfRootCount,
  railScan,
  diagnosticReport,
} from "../scripts/braid-ideal/planar-tri-binary-iso-frequency-evaluator.mjs";

test("iso-frequency braid is rigid: per-layer tangential residual is time-independent", () => {
  const r = rigidityCheck({ RI: 0.5, RM: 1, RO: 1.5, betaM: 0.9 });
  assert.equal(r.timeIndependent, true, `maxVar ${r.maxVar}`);
});

test("equal-radii limit reproduces the certified hexagon band and is layer-symmetric", () => {
  const v = equalRadiiValidation({ beta: 0.9 });
  assert.equal(v.layerSymmetric, true);
  assert.equal(v.inCertifiedBand, true, `Phi/beta ${v.ratio}`);
});

test("rail regime map: self-hit roots on the outer layer only (birth at the rail)", () => {
  const braid = buildBraid({ RI: 0.5, RM: 1, RO: 1.5, betaM: 1.0 });
  assert.equal(selfRootCount(braid, 0), 0); // inner sub-field
  assert.equal(selfRootCount(braid, 2), 0); // middle exactly at birth
  assert.ok(selfRootCount(braid, 4) >= 1); // outer super-field
});

test("nested geometry reverses the inner layer's tangential sign (partner wakes brake it)", () => {
  const braid = buildBraid({ RI: 0.3, RM: 1, RO: 2.0, betaM: 1.0 });
  const inner = receiverTangential(braid, 0, 0);
  assert.ok(inner.phiTan < 0, `Phi_I ${inner.phiTan} should be negative (braking)`);
});

test("a whole-braid net-torque zero exists on the rail (bracketed in qO at qI=0.3)", () => {
  const rows = railScan({ qIs: [0.3], qOs: [2.0, 2.2] });
  const a = rows[0].netTorque, b = rows[1].netTorque;
  assert.ok(a > 0 && b < 0, `net ${a} -> ${b} should bracket zero`);
});

test("equal-radii radial anchor: inward and within the certified radial bound", () => {
  const braid = buildBraid({ RI: 1, RM: 1, RO: 1, betaM: 0.9 });
  const r = receiverResiduals(braid, 0, 0);
  assert.ok(r.aRad <= -0.672, `aRad ${r.aRad} (certified Phi_rad <= -0.672)`);
  assert.ok(r.supportRatio > 0, "shell layer is bound (net inward)");
});

test("at the net-torque zero the layers are bound but radially mismatched (circular ansatz obstruction)", () => {
  const row = railScan({ qIs: [0.3], qOs: [2.09] })[0];
  const s = row.supportRatio;
  assert.ok(s.I > 0 && s.M > 0 && s.O > 0, "every layer net inward (bound)");
  // structural mismatch: inner over-bound, outer under-bound by large factors
  assert.ok(s.I / s.M > 3, `I/M ${s.I / s.M}`);
  assert.ok(s.M / s.O > 3, `M/O ${s.M / s.O}`);
});

test("report is fail-closed and prescribed-worldline (not the native solver)", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.ok(/prescribed_worldline/.test(r.authority));
});
