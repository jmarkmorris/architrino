import assert from "node:assert/strict";
import test from "node:test";

import {
  CANDIDATE_SCHEMA,
  clippedPowerMaturity,
  evaluateLineageGate,
  oddOrderBirthMetrics,
  quadraticCubicSensitivity,
  receiverClockAccountControl,
  runCandidateAnalysis,
} from "../scripts/equation-mapping/analyze-causal-wake-birth-lineage-candidate.mjs";

function closeTo(actual, expected, tolerance = 1e-12) {
  assert.ok(
    Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `expected ${actual} to be close to ${expected}`,
  );
}

test("the frozen cubic candidate fails full receiver-sensitivity integrability", () => {
  const coarse = quadraticCubicSensitivity({ a: 0.2, tau: 1e-2 });
  const fine = quadraticCubicSensitivity({ a: 0.2, tau: 1e-3 });
  closeTo(
    fine.cubicComplete / coarse.cubicComplete,
    100,
  );
  closeTo(
    fine.cubicMaturityTerm + fine.cubicMaturityGradientTerm,
    fine.cubicComplete,
  );
});

test("the quintic candidate has integrable finite-order birth powers", () => {
  for (const k of [1, 3, 5, 9]) {
    const row = oddOrderBirthMetrics({ k, a: 0.2, tau: 1e-3 });
    assert.ok(row.accelerationPower > -1);
    assert.ok(row.longitudinalSensitivityPower > -1);
    assert.ok(Number.isFinite(row.quinticAccelerationMagnitude));
    assert.ok(Number.isFinite(row.quinticLongitudinalSensitivityMagnitude));
  }

  const quadratic = oddOrderBirthMetrics({ k: 1, a: 0.2, tau: 1e-3 });
  closeTo(quadratic.quinticAccelerationMagnitude, 1.28e-8);
  closeTo(quadratic.quinticLongitudinalSensitivityMagnitude, 0.032);
});

test("lineage gates the boundary rule away from ordinary folds", () => {
  const diagonalBirth = evaluateLineageGate({
    rho: 0.2,
    origin: "same_transmitter_diagonal_birth",
  });
  assert.equal(diagonalBirth.status, "active_birth_boundary");
  assert.equal(diagonalBirth.maturity, clippedPowerMaturity(0.2, 5));

  const ordinaryFold = evaluateLineageGate({
    rho: 0.2,
    origin: "ordinary_positive_separation_fold",
  });
  assert.equal(ordinaryFold.status, "regular_sharp");
  assert.equal(ordinaryFold.maturity, 1);
});

test("release is continuous and irreversible", () => {
  assert.ok(clippedPowerMaturity(1 - 1e-8, 5) < 1);
  assert.ok(1 - clippedPowerMaturity(1 - 1e-8, 5) < 6e-8);

  const release = evaluateLineageGate({
    rho: 1,
    origin: "same_transmitter_diagonal_birth",
  });
  assert.equal(release.status, "regular_released");
  assert.equal(release.maturity, 1);

  const laterSmallRho = evaluateLineageGate({
    rho: 0.1,
    origin: "same_transmitter_diagonal_birth",
    releaseStatus: release.nextReleaseStatus,
  });
  assert.equal(laterSmallRho.status, "regular_sharp");
  assert.equal(laterSmallRho.maturity, 1);
});

test("persistent tangencies fail closed", () => {
  const result = evaluateLineageGate({
    rho: 0,
    origin: "same_transmitter_diagonal_birth",
    topology: "root_interval",
  });
  assert.equal(result.status, "quarantined_unresolved");
  assert.equal(result.maturity, null);
});

test("finite shell extraction cannot match nonzero motion at a receiver fold", () => {
  const result = receiverClockAccountControl({
    sourceCoefficient: 1,
    patchVectorMagnitude: 0.2,
    receiverFactor: 0,
    transmitterFactor: 0.4,
    motionScale: 1,
    maturity: 1,
    accelerationCoefficient: 1,
    distance: 2,
  });
  assert.equal(result.shellMomentumRate, 0);
  assert.ok(result.motionMomentumRate > 0);
  assert.equal(result.closes, false);
});

test("candidate report preserves the Not advanced boundary", () => {
  const report = runCandidateAnalysis();
  assert.equal(report.schema, CANDIDATE_SCHEMA);
  assert.equal(report.frozenCandidates.length, 3);
  assert.equal(report.ordinaryFold.maturity, 1);
  assert.equal(report.persistentTangent.status, "quarantined_unresolved");
  assert.equal(report.accountAtReceiverFold.closes, false);
  assert.match(report.conclusion, /Not advanced/);
});
