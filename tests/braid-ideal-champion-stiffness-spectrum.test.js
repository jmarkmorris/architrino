import test from "node:test";
import assert from "node:assert/strict";
import { residuals } from "../scripts/braid-ideal/rigid-tilted-nested-braid-evaluator.mjs";
import { CHAMPION, KNOBS, eigenSym, FAIL_CLOSED } from "../scripts/braid-ideal/champion-stiffness-spectrum.mjs";

const d = Math.PI / 180;
const f = (o = {}) => residuals({ ...CHAMPION, ...o, phases: [0, (2 * Math.PI) / 3, (o.thetaO ?? CHAMPION.thetaO)] }).globalRelResidual;

test("inner radius is the stiffness backbone; cap azimuth is nearly free", () => {
  const f0 = f();
  const kQI = (f({ qI: CHAMPION.qI + 0.03 }) - 2 * f0 + f({ qI: CHAMPION.qI - 0.03 })) / (0.03 * 0.03);
  const h = 3 * d;
  const kTh = (f({ thetaO: CHAMPION.thetaO + h }) - 2 * f0 + f({ thetaO: CHAMPION.thetaO - h })) / (h * h);
  assert.ok(kQI > 10, `qI stiffness ${kQI}`);
  assert.ok(Math.abs(kTh) < 1, `thetaO stiffness ${kTh}`);
  assert.ok(kQI > 20 * Math.abs(kTh), "backbone vs free-knob separation");
});

test("the rail gradient is the pump signature: partner-only closure improves past the rail", () => {
  const atRail = f();
  const past = f({ betaM: 1.05 });
  assert.ok(past < atRail, `past-rail ${past} vs rail ${atRail} (self-hit brake excluded here by construction)`);
});

test("eigen-decomposition is consistent (trace preserved) and fail-closed flags set", () => {
  const H = [[2, 1, 0], [1, 3, 0], [0, 0, 1]];
  // pad KNOBS-length not needed: eigenSym works on any symmetric matrix
  const modes = eigenSym(H);
  const tr = modes.reduce((s, m) => s + m.value, 0);
  assert.ok(Math.abs(tr - 6) < 1e-9);
  assert.equal(FAIL_CLOSED.retainedBranchClaim, false);
  assert.equal(FAIL_CLOSED.scoreMovement, "no_score_increase");
});
