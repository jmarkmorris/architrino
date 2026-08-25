import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateEomCubicHistoryAtTime,
} from "../src/apps/shared/EomCubicHistoryEvaluation.mjs";
import {
  DECLARED_FIVE_COORDINATE_INPUT,
  createExactLinearHistories,
  measureState,
} from "../scripts/mapping-electromagnetism/three-binary-five-coordinate-eom-comparison.mjs";
import {
  buildMatchedFiveCoordinateInitializations,
} from "../scripts/mapping-electromagnetism/three-binary-five-coordinate-initialization-ledger.mjs";

function vector(record) {
  return [record.x, record.y, record.z];
}

function maximumResidual(left, right) {
  return Math.max(...left.map((value, index) => Math.abs(value - right[index])));
}

test("bounded EOM comparison histories exactly recover every declared endpoint and rate", () => {
  const built = buildMatchedFiveCoordinateInitializations(DECLARED_FIVE_COORDINATE_INPUT);
  for (const geometry of [built.candidateA, built.candidateB]) {
    const byId = new Map(geometry.members.map((member) => [member.id, member]));
    const histories = createExactLinearHistories(geometry);
    assert.equal(histories.length, 6);
    histories.forEach((history) => {
      const member = byId.get(history.pathId);
      const start = evaluateEomCubicHistoryAtTime(history, -4);
      const endpoint = evaluateEomCubicHistoryAtTime(history, 0);
      assert.ok(maximumResidual(vector(endpoint.position), member.position) < 1e-15);
      assert.ok(maximumResidual(vector(endpoint.velocity), member.velocity) < 1e-15);
      const expectedStart = member.position.map((value, axis) => value - 4 * member.velocity[axis]);
      assert.ok(maximumResidual(vector(start.position), expectedStart) < 1e-15);
      assert.ok(maximumResidual(vector(start.velocity), member.velocity) < 1e-15);
      assert.deepEqual(history.segments[0].positionErrors, ["0", "0", "0"]);
      assert.deepEqual(history.segments[0].velocityErrors, ["0", "0", "0"]);
    });
  }
});

test("common-locus encodings and measured symmetry controls are identical", () => {
  const common = {
    ...DECLARED_FIVE_COORDINATE_INPUT,
    coordinates: [...DECLARED_FIVE_COORDINATE_INPUT.coordinates.slice(0, 3), 0, 0],
    rates: [...DECLARED_FIVE_COORDINATE_INPUT.rates.slice(0, 3), 0, 0],
  };
  const built = buildMatchedFiveCoordinateInitializations(common);
  const historiesA = createExactLinearHistories(built.candidateA);
  const historiesB = createExactLinearHistories(built.candidateB);
  assert.deepEqual(historiesA, historiesB);

  const initialRows = built.candidateA.members.slice().sort((left, right) =>
    left.module - right.module || right.polarity - left.polarity);
  const measuredA = measureState(historiesA, 0, built.candidateA, initialRows);
  const measuredB = measureState(historiesB, 0, built.candidateB, initialRows);
  assert.equal(measuredA.minimumPairDistance, measuredB.minimumPairDistance);
  assert.equal(measuredA.maximumMemberSpeed, measuredB.maximumMemberSpeed);
  assert.ok(measuredA.pairConjugacyResidual.position < 1e-15);
  assert.ok(measuredA.cyclicResidual.position < 1e-15);
  assert.ok(measuredB.pairConjugacyResidual.position < 1e-15);
  assert.ok(measuredB.cyclicResidual.position < 1e-15);
  assert.ok(measuredA.normalLeakage.rmsPosition < 1e-15);
  assert.ok(measuredB.normalLeakage.rmsPosition < 1e-15);
});

test("declared structural rows retain their different polarity-parity symmetries", () => {
  const built = buildMatchedFiveCoordinateInitializations(DECLARED_FIVE_COORDINATE_INPUT);
  for (const [geometry, exactSymmetry, brokenSymmetry] of [
    [built.candidateA, "pairConjugacyResidual", "cyclicResidual"],
    [built.candidateB, "cyclicResidual", "pairConjugacyResidual"],
  ]) {
    const histories = createExactLinearHistories(geometry);
    const initialRows = geometry.members.slice().sort((left, right) =>
      left.module - right.module || right.polarity - left.polarity);
    const measured = measureState(histories, 0, geometry, initialRows);
    assert.ok(measured[exactSymmetry].position < 1e-15);
    assert.ok(measured[brokenSymmetry].position > 1e-3);
    assert.ok(measured.centerPositionMagnitude < 1e-15);
    assert.ok(measured.maximumMemberSpeed < 1);
  }
});
