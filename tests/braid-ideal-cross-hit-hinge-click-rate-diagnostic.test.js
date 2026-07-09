import test from "node:test";
import assert from "node:assert/strict";

import {
  rigidShellClickRate,
  rigidMultiShellClickRate,
  twoFrequencyClickRate,
  absorberVerdict,
  diagnosticReport,
} from "../scripts/braid-ideal/cross-hit-hinge-click-rate-diagnostic.mjs";

test("Result 1: rigid single-frequency shell has a time-constant alignment scalar and zero clicks", () => {
  const r = rigidShellClickRate({ N: 6, R: 0.8165, beta: 1.02 });
  assert.equal(r.nClickPerRotation, 0);
  assert.equal(r.alignmentIsTimeConstant, true);
  assert.ok(r.maxAbsVariation < 1e-9, `A_ij variation ${r.maxAbsVariation}`);
});

test("Result 1b: any single common frequency (multi-radius) still gives zero clicks", () => {
  const r = rigidMultiShellClickRate({ beta: 1.05, radii: [0.5, 0.8165, 1.1] });
  assert.equal(r.nClickPerRotation, 0);
  assert.equal(r.alignmentIsTimeConstant, true);
});

test("Result 2: a genuine second frequency is required for a click train", () => {
  const low = twoFrequencyClickRate({ ratio: 1.5 });
  const high = twoFrequencyClickRate({ ratio: 6 });
  // more distinct frequencies (larger beat) -> more clicks; the click train
  // vanishes as the frequency ratio approaches the single-frequency limit.
  assert.ok(high.nClickPerRotation > low.nClickPerRotation);
  assert.ok(high.nClickPerRotation >= 10);
  assert.ok(Math.abs(high.beatPeriodsPerRotation - 5) < 1e-9);
});

test("absorber verdict reproduces the certified pump-per-rotation and the ~18-click threshold", () => {
  const v = absorberVerdict({ beta: 0.98, R: 0.8165, kappa: 1, crossPairs: 6 });
  // spec Section 2.5: pump-per-rotation = 2*pi*c1*kappa/(cf^2*rho) = 22.17 at ref
  assert.ok(Math.abs(v.pumpPerRotation - 22.17) < 0.05);
  // N_click required = 2*pi*c1*beta ~ 17.7 at beta = 0.98
  assert.ok(Math.abs(v.nClickRequired - 2 * Math.PI * 2.881 * 0.98) < 1e-6);
  assert.equal(v.singleFrequencyVerdict, "closed_negative_N_click_is_zero");
  // requires a fast inner shell: internal frequency ratio strictly above 1
  assert.ok(v.internalFrequencyRatioRequired > 1.5);
});

test("report is fail-closed", () => {
  const r = diagnosticReport();
  assert.equal(r.retainedBranchClaim, false);
  assert.equal(r.acceptedSameLevelBranchClaim, false);
  assert.equal(r.scoreMovement, "no_score_increase");
  assert.equal(r.acceptedSeedPathCertificate, false);
});
