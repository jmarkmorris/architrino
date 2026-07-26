import assert from "node:assert/strict";
import test from "node:test";

import {
  createCanonicalLearnerState,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCausalHistory.js";
import {
  INVERSE_SQUARE_BODY_PROGRESS,
  INVERSE_SQUARE_EMISSION_INTERVAL,
  INVERSE_SQUARE_EMISSION_RATE,
  createInverseSquareSpreadingFrame,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackInverseSquareMode.js";
import {
  sampleTimedPathByArcLength,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackTimedPath.js";
import {
  createMockCausalDelayReplayDataset,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";

function createState() {
  return createCanonicalLearnerState(
    createMockCausalDelayReplayDataset(),
    { mode: "story" },
  );
}

function assertNear(actual, expected, tolerance = 1e-9) {
  assert.ok(
    Math.abs(Number(actual) - Number(expected)) <= tolerance,
    `expected ${actual} to be within ${tolerance} of ${expected}`,
  );
}

test("Lesson Six fixes both bodies at exactly 50% path position for every frame", () => {
  const state = createState();
  const scene = { playbackStartTime: 0, playbackEndTime: 1 };
  const frames = [0, 0.2, 0.5, 0.8, 1].map((replayTime) =>
    createInverseSquareSpreadingFrame(state, scene, replayTime));

  for (const kind of ["positrino", "electrino"]) {
    const path = state.paths[kind];
    const pathTime =
      Number(path[0].t) +
      (Number(path.at(-1).t) - Number(path[0].t)) *
        INVERSE_SQUARE_BODY_PROGRESS;
    const expected = sampleTimedPathByArcLength(path, pathTime);
    frames.forEach((frame) => {
      const body = frame.bodies[kind];
      assert.equal(body.pathProgress, 0.5);
      assertNear(body.point.x, expected.x);
      assertNear(body.point.y, expected.y);
      assertNear(body.point.z, expected.z);
    });
  }
});

test("Lesson Six emits equal amounts at a constant rate into expanding circular wakefronts", () => {
  const state = createState();
  const scene = { playbackStartTime: 0, playbackEndTime: 1 };
  const earlier = createInverseSquareSpreadingFrame(state, scene, 0.5);
  const later = createInverseSquareSpreadingFrame(state, scene, 0.75);

  assert.equal(later.emissionRate, INVERSE_SQUARE_EMISSION_RATE);
  assert.equal(later.emissionInterval, INVERSE_SQUARE_EMISSION_INTERVAL);
  const emissionProgresses = [
    ...new Set(
      later.wakes
        .filter((wake) => wake.sourceKind === "positrino")
        .map((wake) => wake.emissionProgress),
    ),
  ];
  const emissionGaps = emissionProgresses.slice(1).map(
    (progress, index) => progress - emissionProgresses[index],
  );
  assert.ok(
    emissionGaps.every(
      (gap) => Math.abs(gap - INVERSE_SQUARE_EMISSION_INTERVAL) <= 1e-12,
    ),
  );
  assert.equal(
    later.wakes.filter((wake) => wake.sourceKind === "positrino").length,
    later.wakes.filter((wake) => wake.sourceKind === "electrino").length,
  );
  later.wakes.forEach((wake) => {
    assert.equal(wake.emittedAmount, 1);
    assert.equal(wake.center, later.bodies[wake.sourceKind].point);
    assert.ok(wake.radius > 0);
    assertNear(wake.sphericalArea, 4 * Math.PI * wake.radius * wake.radius);
    assertNear(wake.inverseRadiusSquared, 1 / (wake.radius * wake.radius));
  });
  earlier.wakes.forEach((wake) => {
    const matchingLaterWake = later.wakes.find(
      (candidate) => candidate.id === wake.id,
    );
    assert.ok(matchingLaterWake);
    assert.ok(matchingLaterWake.radius > wake.radius);
    assert.ok(
      matchingLaterWake.inverseRadiusSquared < wake.inverseRadiusSquared,
    );
  });
  assert.equal(later.displayAuthority.evidenceStatus, "display-only");
  assert.equal(later.displayAuthority.physicsAcceptance, false);
  assert.equal(later.fieldAmplitudeClaim, false);
  assert.equal(later.physicalLawClaim, false);
});
