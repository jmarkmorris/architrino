import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTRA_ROTATING_PAIR_SCHEMA,
  contraRotatingProAntiPairInstrument,
} from "../scripts/braid-ideal/contra-rotating-pro-anti-pair-instrument.mjs";

let cached;
function report() { return cached ??= contraRotatingProAntiPairInstrument(); }

test("§92 regression: each braid alone reproduces the +0.424 pump and Re lambda = 0.19886 flutter", () => {
  const result = report();
  assert.equal(result.schema, CONTRA_ROTATING_PAIR_SCHEMA);
  assert.ok(Math.abs(result.regression.pro.pump - 0.42403002923413363) < 1e-12);
  assert.ok(Math.abs(result.regression.anti.pump + 0.42403002923413363) < 1e-12);
  assert.ok(Math.abs(result.regression.pro.leadingRe - 0.19885688497216406) < 1e-12);
  assert.ok(Math.abs(result.regression.anti.leadingRe - 0.19885688497216406) < 1e-10);
  assert.equal(result.regression.removingPartnerRecoversSingleBraid, true);
});

test("§92 ansatz explicitly declares shared axis, separation, relative phase, senses, and polarity conjugation", () => {
  const { ansatz } = report();
  assert.deepEqual(ansatz.primary.sharedAxis, [0, 0, 1]);
  assert.equal(ansatz.primary.geometryClass, "axially_stacked_coaxial");
  assert.equal(ansatz.primary.axialSeparationInMiddleRadiusUnits, 1);
  assert.equal(ansatz.primary.relativePhaseRad, Math.PI);
  assert.equal(ansatz.primary.proRotationSense, 1);
  assert.equal(ansatz.primary.antiRotationSense, -1);
  assert.equal(ansatz.primary.polarityRelation, "sitewise_polarity_conjugate");
});

test("§92 pump ledger: conjugate intrinsic pumps sum to zero but cross-pair self-sinking is not overclaimed", () => {
  const { pump } = report();
  assert.ok(Math.abs(pump.intrinsicNet) < 1e-12);
  assert.equal(pump.cancelsAtDeclaredPairBoundary, true);
  assert.equal(pump.crossPairContributionMeasured, false);
  assert.equal(pump.genuinelySelfSinkingEstablished, false);
});

test("§92 joint axis pencil: finite locking scan and hard-lock limit both retain a growing mode", () => {
  const { jointFlutter } = report();
  assert.ok(jointFlutter.freePair.leadingRe > 0);
  assert.equal(jointFlutter.anyFiniteLockStable, false);
  assert.ok(jointFlutter.finiteLockingScan.every((row) => row.leadingRe > 0));
  assert.ok(jointFlutter.hardLockCounterfactual.leadingRe > 0);
  assert.ok(jointFlutter.hardLockCounterfactual.handedVelocityCancellationResidual < 1e-14);
  assert.equal(jointFlutter.flutterCancelled, false);
});

test("§92 release gate fails closed before native release or xi continuation", () => {
  const result = report();
  assert.equal(result.lockingRepresentability.nativeCrossPairRowsPresent, false);
  assert.equal(result.lockingRepresentability.locks, false);
  assert.equal(result.luminalApproach.reached, false);
  assert.equal(result.releaseGate.closesLinearGates, false);
  assert.equal(result.releaseGate.firstFailedGate, "joint_flutter");
  assert.equal(result.releaseGate.nativeRetainedHistoryReleaseAuthorized, false);
  assert.equal(result.centralSolverTouched, false);
  assert.equal(result.retainedBranchClaim, false);
  assert.equal(result.scoreMovement, "no_score_increase");
});
