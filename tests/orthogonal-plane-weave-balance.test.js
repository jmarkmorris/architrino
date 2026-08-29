import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  evaluateOrthogonalPlaneWeaveCycle,
  evaluateOrthogonalPlaneWeavePhase,
  ORTHOGONAL_PLANE_WEAVE_LABELS,
  orthogonalPlaneWeaveState,
  verifyOrthogonalPlaneWeaveGeometry,
} from "../src/prescribed-path-analysis/OrthogonalPlaneWeaveBalance.mjs";
import {
  applyCircularRelationshipParameters,
  projectCircularRelationshipParameters,
} from "../src/prescribed-geometry/PrescribedCircularRelationshipParameters.mjs";

const BINARY_SEED_BETA = 3.070356625390253;

function explicitPosition(label, time, beta) {
  const theta = beta * time;
  const cosine = Math.cos(theta);
  const sine = Math.sin(theta);
  const base = label.pairIndex === 0
    ? [0, cosine, sine]
    : label.pairIndex === 1
      ? [sine, 0, cosine]
      : [cosine, sine, 0];
  return base.map((value) => label.endpointSign * value);
}

function explicitVelocity(label, time, beta) {
  const theta = beta * time;
  const cosine = Math.cos(theta);
  const sine = Math.sin(theta);
  const base = label.pairIndex === 0
    ? [0, -sine, cosine]
    : label.pairIndex === 1
      ? [cosine, 0, -sine]
      : [-sine, cosine, 0];
  return base.map((value) => label.endpointSign * beta * value);
}

function subtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function readJson(relativeUrl) {
  return JSON.parse(readFileSync(new URL(relativeUrl, import.meta.url), "utf8"));
}

function stateFromCircularOperator(operator, time) {
  const angle = operator.phaseAtEpoch + operator.angularVelocity *
    (time - operator.epochTime);
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return {
    position: operator.centerAtEpoch.map((value, index) => value +
      cosine * operator.radiusU[index] + sine * operator.radiusV[index]),
    velocity: operator.centerVelocity.map((value, index) => value +
      operator.angularVelocity * (-sine * operator.radiusU[index] +
        cosine * operator.radiusV[index])),
  };
}

test("target coordinates are accepted by the live A1.2 relations and A2 cyclic-frame materializer", () => {
  const a12 = projectCircularRelationshipParameters(readJson(
    "../reference/priorities/braid-program/configurations/family-a-a1-2-equal-frequency-equal-radius.v2.json",
  ));
  const a12Pairs = a12.components[0].pairs;
  assert.deepEqual(a12Pairs.map((pair) => pair.phase),
    [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]);
  assert.ok(a12Pairs.every((pair) => pair.radius === a12Pairs[0].radius));
  assert.ok(a12Pairs.every((pair) => pair.frequency === a12Pairs[0].frequency));
  assert.ok(a12Pairs.every((pair) => pair.axialHalfSeparation === 0));
  assert.ok(a12Pairs.every((pair) => pair.transverseOrbitRadius === pair.radius));

  const a2Source = readJson(
    "../reference/priorities/braid-program/configurations/family-a-a2-fully-symmetric.v2.json",
  );
  const targetParameters = projectCircularRelationshipParameters(a2Source);
  targetParameters.assemblyPlacement.centerAtEpoch = [0, 0, 0];
  targetParameters.assemblyPlacement.velocity = [0, 0, 0];
  targetParameters.components[0].circulationSense = 1;
  assert.equal(
    targetParameters.components[0].frameDefinition.phaseCompensatedCyclicFrames,
    true,
  );
  targetParameters.components[0].pairs.forEach((pair) => {
    pair.centerOffset = [0, 0, 0];
    pair.radius = 1;
    pair.axialHalfSeparation = 0;
    pair.transverseOrbitRadius = 1;
    pair.frequency = BINARY_SEED_BETA / (2 * Math.PI);
    pair.polarityAssignment = 1;
  });
  const materialized = applyCircularRelationshipParameters(a2Source, targetParameters);
  const constituentById = new Map(materialized.constituents.map((row) => [row.id, row]));
  for (const [index, label] of ORTHOGONAL_PLANE_WEAVE_LABELS.entries()) {
    const worldline = materialized.worldlines[index];
    const constituent = constituentById.get(worldline.constituentId);
    assert.equal(constituent.polarity, label.polarity);
    for (const time of [0, 0.137, 0.811]) {
      const canonical = stateFromCircularOperator(worldline.operator, time);
      const target = orthogonalPlaneWeaveState(label, time, BINARY_SEED_BETA);
      assert.ok(norm(subtract(canonical.position, target.position)) < 3e-15);
      assert.ok(norm(subtract(canonical.velocity, target.velocity)) < 1e-14);
    }
  }
});

test("orthogonal-plane weave satisfies the frozen A1.2 and cyclic geometry identities", () => {
  const geometry = verifyOrthogonalPlaneWeaveGeometry({
    beta: BINARY_SEED_BETA,
    sampleCount: 96,
  });
  assert.equal(geometry.passed, true);
  assert.deepEqual(geometry.phases, [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3]);
  assert.ok(geometry.minimumDistinctEndpointSeparation > 0.999999999999);
  assert.ok(Math.max(...Object.values(geometry.residuals)) < 3e-14);

  for (const label of ORTHOGONAL_PLANE_WEAVE_LABELS) {
    for (const time of [0, 0.137, 0.811]) {
      const state = orthogonalPlaneWeaveState(label, time, BINARY_SEED_BETA);
      const position = explicitPosition(label, time, BINARY_SEED_BETA);
      const velocity = explicitVelocity(label, time, BINARY_SEED_BETA);
      assert.ok(norm(subtract(state.position, position)) < 2e-15);
      assert.ok(norm(subtract(state.velocity, velocity)) < 6e-15);
      assert.ok(norm(subtract(
        state.acceleration,
        position.map((value) => -(BINARY_SEED_BETA ** 2) * value),
      )) < 2e-14);
    }
  }
});

test("every seed-phase root passes an independent direct-coordinate root and Jacobian check", () => {
  const phase = evaluateOrthogonalPlaneWeavePhase({
    beta: BINARY_SEED_BETA,
    phase: 0,
  });
  assert.equal(phase.rootComplete, true);
  assert.equal(phase.regular, true);
  assert.deepEqual(phase.receivers.map((row) => row.rootCount), [10, 10, 10, 10, 10, 10]);
  assert.deepEqual(
    phase.receivers[0].directedPairs.map((row) => row.rootCount),
    [1, 3, 1, 1, 1, 3],
  );

  const labels = new Map(ORTHOGONAL_PLANE_WEAVE_LABELS.map((label) => [label.id, label]));
  for (const receiver of phase.receivers) {
    for (const pair of receiver.directedPairs) {
      assert.equal(pair.complete, true);
      assert.equal(pair.unresolvedIntervals.length, 0);
      for (const root of pair.roots) {
        const receiverLabel = labels.get(root.identity.receiverId);
        const transmitterLabel = labels.get(root.identity.transmitterId);
        const receiverPosition = explicitPosition(
          receiverLabel, root.receptionTime, BINARY_SEED_BETA);
        const transmitterPosition = explicitPosition(
          transmitterLabel, root.emissionTime, BINARY_SEED_BETA);
        const transmitterVelocity = explicitVelocity(
          transmitterLabel, root.emissionTime, BINARY_SEED_BETA);
        const receiverVelocity = explicitVelocity(
          receiverLabel, root.receptionTime, BINARY_SEED_BETA);
        const separation = subtract(receiverPosition, transmitterPosition);
        const distance = norm(separation);
        const direction = separation.map((value) => value / distance);
        const dt = 1 - dot(transmitterVelocity, direction);
        const dr = 1 - dot(receiverVelocity, direction);
        assert.ok(Math.abs(distance - root.delay) < 4e-12);
        assert.ok(Math.abs(distance * distance - root.delay * root.delay) < 8e-12);
        assert.ok(Math.abs(dt - root.transmitterSideFactorDt) < 2e-12);
        assert.ok(Math.abs(dr - root.receiverSideFactorDr) < 2e-12);
        assert.ok(Math.abs(1 / Math.abs(dt) - root.accelerationWeight) < 2e-12);
        if (root.identity.sameTransmitter) assert.ok(root.delay > 0);
      }
    }
  }
});

test("regenerated receipt cycles pass direct-coordinate root, contribution, projection, and all-receiver checks", () => {
  const receipt = readJson(
    "../reference/priorities/braid-program/evidence/2026-08-29-orthogonal-plane-weave-complete-cycle.receipt.v1.json",
  );
  assert.equal(receipt.rawArtifact.requiredForTests, false);
  const labels = new Map(ORTHOGONAL_PLANE_WEAVE_LABELS.map((label) => [label.id, label]));
  for (const control of Object.values(receipt.detailedCycleControls)) {
    const cycle = evaluateOrthogonalPlaneWeaveCycle({
      beta: control.beta,
      phaseSampleCount: control.phaseSampleCount,
    });
    const beta = cycle.scan.beta;
    assert.equal(cycle.phaseEvaluations.length * 36, control.directedPairPhaseRowCount);
    assert.equal(cycle.summary.rootComplete, control.summary.rootComplete);
    assert.equal(cycle.summary.regular, control.summary.regular);
    assert.ok(Math.abs(
      cycle.summary.maximumAbsoluteTransverseVector -
      control.summary.maximumAbsoluteTransverseVector,
    ) < 5e-12);
    assert.ok(Math.abs(
      cycle.summary.maximumFullVectorResidual - control.summary.maximumFullVectorResidual,
    ) < 5e-12);
    for (const phase of cycle.phaseEvaluations) {
      assert.equal(phase.receivers.length, 6);
      for (const receiver of phase.receivers) {
        assert.equal(receiver.directedPairs.length, 6);
        const receiverLabel = labels.get(receiver.receiverId);
        const receiverPosition = explicitPosition(receiverLabel, phase.receptionTime, beta);
        const receiverVelocity = explicitVelocity(receiverLabel, phase.receptionTime, beta);
        const recomputed = [0, 0, 0];
        for (const pair of receiver.directedPairs) {
          assert.equal(pair.unresolvedIntervals.length, 0);
          assert.equal(pair.complete, true);
          const transmitterLabel = labels.get(pair.roots[0]?.identity.transmitterId ??
            pair.pairId.split("<-")[1]);
          for (const root of pair.roots) {
            const transmitterPosition = explicitPosition(
              transmitterLabel, root.emissionTime, beta);
            const transmitterVelocity = explicitVelocity(
              transmitterLabel, root.emissionTime, beta);
            const separation = subtract(receiverPosition, transmitterPosition);
            const distance = norm(separation);
            const direction = separation.map((value) => value / distance);
            const dt = 1 - dot(transmitterVelocity, direction);
            const dr = 1 - dot(receiverVelocity, direction);
            const polaritySign = receiverLabel.polarity * transmitterLabel.polarity;
            const magnitude = polaritySign / (Math.abs(dt) * distance * distance);
            const contribution = direction.map((value) => magnitude * value);
            assert.ok(Math.abs(distance - root.delay) < 8e-12);
            assert.ok(Math.abs(dt - root.transmitterSideFactorDt) < 5e-12);
            assert.ok(Math.abs(dr - root.receiverSideFactorDr) < 5e-12);
            contribution.forEach((value, index) => {
              assert.ok(Math.abs(value - root.accelerationContribution[index]) < 2e-10);
              recomputed[index] += value;
            });
          }
        }
        recomputed.forEach((value, index) =>
          assert.ok(Math.abs(value - receiver.masterAcceleration[index]) < 4e-10));
        const projections = receiver.masterAccelerationProjections;
        assert.ok(Math.abs(dot(recomputed, receiver.basis.radial) - projections.radial) < 4e-10);
        assert.ok(Math.abs(dot(recomputed, receiver.basis.tangent) - projections.tangent) < 4e-10);
        assert.ok(Math.abs(
          dot(recomputed, receiver.basis.planeNormal) - projections.planeNormal,
        ) < 4e-10);
      }
    }
  }
});

test("cyclic symmetry covers all receivers without hiding the seed imbalance", () => {
  const phase = evaluateOrthogonalPlaneWeavePhase({
    beta: BINARY_SEED_BETA,
    phase: 0,
  });
  const plusRows = phase.receivers.filter((row) => row.endpointSign > 0);
  for (const row of plusRows.slice(1)) {
    assert.ok(Math.abs(
      row.masterAccelerationProjections.radial -
      plusRows[0].masterAccelerationProjections.radial,
    ) < 2e-14);
    assert.ok(Math.abs(
      row.masterAccelerationProjections.tangent -
      plusRows[0].masterAccelerationProjections.tangent,
    ) < 2e-14);
    assert.ok(Math.abs(
      row.masterAccelerationProjections.planeNormal -
      plusRows[0].masterAccelerationProjections.planeNormal,
    ) < 2e-14);
  }
  assert.ok(Math.abs(plusRows[0].masterAccelerationProjections.tangent) > 0.25);
  assert.ok(Math.abs(plusRows[0].masterAccelerationProjections.planeNormal) > 1.3);
});

test("complete-cycle refinement preserves a decisive sampled failure at the binary seed", () => {
  const coarse = evaluateOrthogonalPlaneWeaveCycle({
    beta: BINARY_SEED_BETA,
    phaseSampleCount: 12,
    includeFullLedgers: false,
  }).summary;
  const refined = evaluateOrthogonalPlaneWeaveCycle({
    beta: BINARY_SEED_BETA,
    phaseSampleCount: 48,
    includeFullLedgers: false,
  }).summary;
  assert.equal(coarse.rootComplete, true);
  assert.equal(refined.rootComplete, true);
  assert.equal(coarse.regular, true);
  assert.equal(refined.regular, true);
  assert.equal(coarse.radialSignFailure, true);
  assert.equal(refined.radialSignFailure, true);
  assert.ok(coarse.maximumAbsoluteTransverseVector > 1.3);
  assert.ok(refined.maximumAbsoluteTransverseVector > coarse.maximumAbsoluteTransverseVector);
  assert.ok(refined.maximumFullVectorResidual > 10);
});
