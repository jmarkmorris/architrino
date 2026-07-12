import test from "node:test";
import assert from "node:assert/strict";

import {
  KAPITZA_FLUTTER_SCHEMA,
  axisPencilSpectrum,
  kapitzaFlutterAnalysis,
} from "../scripts/braid-ideal/kapitza-flutter-stabilization.mjs";
import { gyroscopicTiltAnalysisFull } from "../scripts/braid-ideal/spindle-support-ratio-targeted-search.mjs";

let cached;
function report() { return cached ??= kapitzaFlutterAnalysis(); }

test("drive-off averaged pencil reproduces the measured flutter exactly", () => {
  const result = report();
  assert.equal(result.schema, KAPITZA_FLUTTER_SCHEMA);
  assert.equal(result.baseline.leadingRe, result.baseline.sourceLeadingRe);
  assert.equal(result.baseline.leadingIm, result.baseline.sourceLeadingIm);
  assert.ok(Math.abs(result.baseline.leadingRe - 0.19885688497216406) < 1e-12);
  assert.ok(Math.abs(result.baseline.leadingIm - 2.41245971901678) < 1e-12);
});

test("generic runner spectrum reproduces gyroscopicTiltAnalysisFull", () => {
  const base = gyroscopicTiltAnalysisFull({});
  const spectrum = axisPencilSpectrum(base.pencilMatrices);
  assert.ok(Math.abs(spectrum.leading.re - base.maxGrowthRate) < 1e-10);
  assert.ok(Math.abs(Math.abs(spectrum.leading.im) - base.maxGrowthWhirlFrequency) < 1e-10);
  assert.ok(spectrum.dkResidual < 1e-10);
});

test("coherent high-frequency restoring drive has no quench threshold", () => {
  const result = report();
  assert.equal(result.thresholdCoefficient, null);
  assert.equal(result.decision, "negative_no_averaged_restoring_threshold_flutter_not_quenched");
  for (const row of result.coherent) {
    assert.ok(row.frequencyRatio >= 4);
    assert.equal(row.thresholdPeakAmplitude, null);
    assert.equal(row.thresholdRmsAmplitude, null);
    assert.ok(row.leadingAtThreshold.leadingRe > 0);
  }
  assert.ok(result.minimumMappedGrowth.leadingRe > 0);
  assert.ok(result.coefficientMap.every((row) => row.leadingRe > 0));
});

test("seeded broadband stochastic averaging also has no quench threshold", () => {
  const result = report();
  assert.equal(result.stochastic.seed, 91091);
  assert.equal(result.stochastic.modes, 64);
  assert.equal(result.stochastic.thresholdRmsAmplitude, null);
  assert.equal(result.stochastic.thresholdPeakEquivalent, null);
  assert.ok(result.stochastic.leadingAtThreshold.leadingRe > 0);
  assert.equal(result.seaScale.physicallyPlausibleQuenchEstablished, false);
  assert.ok(result.seaScale.namedFrequencyRange[1] < result.seaScale.averagingMinimumFrequency);
});

test("claim boundary remains seed-grade and fail-closed", () => {
  const result = report();
  assert.match(result.claimLevel, /not a derived sea response/);
  assert.equal(result.model.additiveDriveWouldStabilize, false);
  assert.equal(result.centralSolverTouched, false);
  assert.equal(result.retainedBranchClaim, false);
  assert.equal(result.scoreMovement, "no_score_increase");
});
