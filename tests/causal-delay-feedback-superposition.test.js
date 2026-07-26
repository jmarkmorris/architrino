import assert from "node:assert/strict";
import test from "node:test";

import {
  createCanonicalLearnerState,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackCausalHistory.js";
import {
  createMockCausalDelayReplayDataset,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackReplayAdapter.js";
import {
  createSuperpositionPaths,
  createSuperpositionScene,
} from "../src/apps/causal-delay-feedback/CausalDelayFeedbackSuperpositionMode.js";

function createState() {
  return createCanonicalLearnerState(createMockCausalDelayReplayDataset(), {
    mode: "story",
  });
}

test("Lesson Seven declares three shared-frame bodies at 0%, 25%, and 50%", () => {
  const scene = createSuperpositionScene(createState());

  assert.equal(scene.lessonNumber, 7);
  assert.equal(scene.displayAuthority.evidenceStatus, "display-only");
  assert.equal(scene.displayAuthority.teachingFixture, true);
  assert.equal(scene.displayAuthority.physicsAcceptance, false);
  assert.equal(scene.displayAuthority.physicalLawClaim, false);
  assert.equal(scene.displayAuthority.bindingClaim, false);
  assert.equal(scene.displayAuthority.stabilityClaim, false);
  assert.equal(scene.displayAuthority.solvedTrajectoryClaim, false);
  assert.equal(scene.paths.length, 3);
  assert.deepEqual(scene.bodies.map((body) => body.id), [
    "original-electrino",
    "positrino",
    "second-electrino",
  ]);
  assert.deepEqual(scene.bodies.map((body) => body.pathTime), [0, 0.25, 0.5]);
  assert.equal(scene.selectedArcs.length, 2);
  assert.equal(scene.omittedReciprocalSet, true);
});

test("Lesson Seven places one electrino below and one between the red and lower paths", () => {
  const paths = createSuperpositionPaths(createState());
  const red = paths.find((path) => path.id === "positrino-path");
  const lower = paths.find((path) => path.id === "original-electrino-path");
  const middle = paths.find((path) => path.id === "second-electrino-path");

  assert.equal(red.points.length, lower.points.length);
  assert.equal(lower.points.length, middle.points.length);
  lower.points.forEach((point, index) => {
    const redPoint = red.points[index];
    const middlePoint = middle.points[index];
    assert.ok(point.y >= redPoint.y);
    assert.ok(middlePoint.y >= redPoint.y);
    assert.ok(middlePoint.y <= point.y);
    assert.ok(
      Math.abs(
        middlePoint.y - (redPoint.y + (point.y - redPoint.y) * 0.5),
      ) < 1e-9,
    );
  });
});

test("Lesson Seven keeps exactly two selected electrino-to-positrino arcs and a downward net", () => {
  const scene = createSuperpositionScene(createState(), { phase: 0.5 });

  assert.deepEqual(
    scene.selectedArcs.map((arc) => arc.direction),
    ["electrino-to-positrino", "electrino-to-positrino"],
  );
  assert.equal(scene.selectedArcs.filter((arc) => arc.nearer).length, 1);
  assert.ok(
    scene.selectedArcs.every(
      (arc) =>
        arc.wakeFront.style === "standard-fading-dotted-wake-front",
    ),
  );
  const larger = scene.contributions.find(
    (contribution) => contribution.teachingWeight > 1,
  );
  const smaller = scene.contributions.find(
    (contribution) => contribution.teachingWeight === 1,
  );
  assert.ok(larger);
  assert.ok(smaller);
  assert.ok(larger.teachingWeight > smaller.teachingWeight);
  assert.ok(larger.arrow.lengthFraction > smaller.arrow.lengthFraction);
  assert.ok(larger.arrow.width > smaller.arrow.width);
  assert.equal(scene.componentArrows.length, 2);
  assert.equal(scene.netAccelerationArrow.label, "net acceleration");
  assert.ok(scene.netVector.y > 0);
  assert.ok(
    Math.abs(scene.netVector.y) >= Math.abs(scene.netVector.x),
    "canvas-positive y must be the dominant net direction",
  );
});

test("Lesson Seven advances all three bodies by the same path-time increment", () => {
  const state = createState();
  const initial = createSuperpositionScene(state, { phase: 0 });
  const advanced = createSuperpositionScene(state, { phase: 1 });
  const increments = advanced.bodies.map(
    (body, index) => body.pathTime - initial.bodies[index].pathTime,
  );

  assert.deepEqual(increments, [0.25, 0.25, 0.25]);
});
