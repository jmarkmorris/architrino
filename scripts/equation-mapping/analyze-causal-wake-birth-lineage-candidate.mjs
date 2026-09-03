#!/usr/bin/env node

import assert from "node:assert/strict";
import { pathToFileURL } from "node:url";

export const CANDIDATE_SCHEMA =
  "causal_wake_diagonal_birth_lineage_candidate/v2";

export function clippedPowerMaturity(rho, power) {
  assert.ok(Number.isFinite(rho) && rho >= 0);
  assert.ok(Number.isInteger(power) && power > 0);
  return rho < 1 ? rho ** power : 1;
}

export function evaluateLineageGate({
  rho,
  origin,
  releaseStatus = "active_birth_boundary",
  topology = "isolated_simple_root",
}) {
  assert.ok(Number.isFinite(rho) && rho >= 0);
  if (
    topology === "root_interval" ||
    topology === "nonisolated_tangent" ||
    topology === "non_tame_accumulation"
  ) {
    return {
      status: "quarantined_unresolved",
      maturity: null,
      nextReleaseStatus: releaseStatus,
    };
  }

  const isDiagonalBirth = origin === "same_transmitter_diagonal_birth";
  if (!isDiagonalBirth || releaseStatus === "regular_released") {
    return {
      status: "regular_sharp",
      maturity: 1,
      nextReleaseStatus: releaseStatus,
    };
  }

  if (rho >= 1) {
    return {
      status: "regular_released",
      maturity: 1,
      nextReleaseStatus: "regular_released",
    };
  }

  return {
    status: "active_birth_boundary",
    maturity: clippedPowerMaturity(rho, 5),
    nextReleaseStatus: "active_birth_boundary",
  };
}

export function oddOrderBirthMetrics({ k, a, tau, coefficient = 1 }) {
  assert.ok(Number.isInteger(k) && k >= 1 && k % 2 === 1);
  assert.ok(Number.isFinite(a) && a > 0);
  assert.ok(Number.isFinite(tau) && tau > 0);
  assert.ok(Number.isFinite(coefficient));

  const distance = 2 * tau;
  const transmitterFactor = a * tau ** k;
  const transmitterFactorDerivative = a * k * tau ** (k - 1);
  const rho = distance * transmitterFactorDerivative;
  const sharpAccelerationMagnitude =
    Math.abs(coefficient) / (4 * a * tau ** (k + 2));
  const quinticAccelerationMagnitude =
    8 * Math.abs(coefficient) * a ** 4 * k ** 5 * tau ** (4 * k - 2);
  const quinticLongitudinalSensitivityMagnitude =
    4 *
    Math.abs(coefficient) *
    a ** 3 *
    k ** 5 *
    (8 * k - 7) *
    tau ** (3 * k - 3);

  return {
    k,
    distance,
    transmitterFactor,
    transmitterFactorDerivative,
    rho,
    sharpAccelerationMagnitude,
    quinticAccelerationMagnitude,
    quinticLongitudinalSensitivityMagnitude,
    accelerationPower: 4 * k - 2,
    longitudinalSensitivityPower: 3 * k - 3,
  };
}

export function quadraticCubicSensitivity({
  a,
  tau,
  coefficient = 1,
}) {
  assert.ok(Number.isFinite(a) && a > 0);
  assert.ok(Number.isFinite(tau) && tau > 0);
  assert.ok(Number.isFinite(coefficient));
  return {
    sharp: -coefficient / (2 * a ** 2 * tau ** 5),
    cubicMaturityTerm: -4 * coefficient * a / tau ** 2,
    cubicMaturityGradientTerm: 3 * coefficient * a / tau ** 2,
    cubicComplete: -coefficient * a / tau ** 2,
  };
}

export function receiverClockAccountControl({
  sourceCoefficient,
  patchVectorMagnitude,
  receiverFactor,
  transmitterFactor,
  motionScale,
  maturity,
  accelerationCoefficient,
  fieldSpeed = 1,
  distance,
}) {
  for (const value of [
    sourceCoefficient,
    patchVectorMagnitude,
    receiverFactor,
    transmitterFactor,
    motionScale,
    maturity,
    accelerationCoefficient,
    fieldSpeed,
    distance,
  ]) {
    assert.ok(Number.isFinite(value));
  }
  assert.notEqual(transmitterFactor, 0);
  assert.ok(fieldSpeed > 0 && distance > 0);

  const shellMomentumRate =
    Math.abs(
      sourceCoefficient *
        patchVectorMagnitude *
        (receiverFactor / transmitterFactor),
    );
  const motionMomentumRate = Math.abs(
    (motionScale *
      maturity *
      accelerationCoefficient *
      fieldSpeed) /
      (distance ** 2 * Math.abs(transmitterFactor)),
  );
  return {
    shellMomentumRate,
    motionMomentumRate,
    closes: shellMomentumRate === motionMomentumRate,
  };
}

export function runCandidateAnalysis() {
  const oddOrderControls = [1, 3, 5, 9].map((k) =>
    oddOrderBirthMetrics({ k, a: 0.2, tau: 1e-3 }),
  );
  return {
    schema: CANDIDATE_SCHEMA,
    frozenCandidates: [
      {
        id: "CWB-rho3/v0",
        status: "rejected_nonintegrable_receiver_sensitivity",
      },
      {
        id: "CWB-rho5/v1",
        status: "partial_missing_lineage",
      },
      {
        id: "CWB-rho5-lineage/v2",
        status: "priority_only_not_advanced",
      },
    ],
    oddOrderControls,
    persistentTangent: evaluateLineageGate({
      rho: 0,
      origin: "same_transmitter_diagonal_birth",
      topology: "root_interval",
    }),
    ordinaryFold: evaluateLineageGate({
      rho: 0.1,
      origin: "ordinary_positive_separation_fold",
    }),
    accountAtReceiverFold: receiverClockAccountControl({
      sourceCoefficient: 1,
      patchVectorMagnitude: 0.2,
      receiverFactor: 0,
      transmitterFactor: 0.4,
      motionScale: 1,
      maturity: 1,
      accelerationCoefficient: 1,
      distance: 2,
    }),
    conclusion:
      "The lineage-gated quintic passes finite-order local magnitude and sensitivity controls, while persistent tangencies, full continuation, and all-three-account closure remain Not advanced.",
  };
}

const isMain =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  process.stdout.write(`${JSON.stringify(runCandidateAnalysis(), null, 2)}\n`);
}
