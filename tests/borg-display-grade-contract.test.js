import assert from "node:assert/strict";
import test from "node:test";

import {
  BORG_DISPLAY_TRACK_POSITION_LIMIT,
  evaluateBorgDisplayTrackAgreement,
} from "../src/apps/borg/BorgDisplayGradeContract.js";

const frame = (pathKey, time, x) => ({
  pathKey,
  time,
  position: { x, y: 0, z: 0 },
});

test("Borg display track target is a normalized h versus h/2 comparison", () => {
  const accepted = evaluateBorgDisplayTrackAgreement({
    coarseFrames: [frame(1, 0, 0), frame(1, 1, 0.0249)],
    refinedFrames: [frame(1, 0, 0), frame(1, 1, 0)],
    envelopeRadius: 0.5,
  });
  assert.equal(BORG_DISPLAY_TRACK_POSITION_LIMIT, 0.05);
  assert.equal(accepted.accepted, true);
  assert.equal(accepted.status, "within-preset-target");
  assert.ok(Math.abs(accepted.normalizedMaximumPositionDelta - 0.0498) < 1e-12);
  assert.equal(accepted.claimLevel, "preset-step-height-comparison-not-evidence");

  const rejected = evaluateBorgDisplayTrackAgreement({
    coarseFrames: [frame(1, 1, 0.0251)],
    refinedFrames: [frame(1, 1, 0)],
    envelopeRadius: 0.5,
  });
  assert.equal(rejected.accepted, false);
  assert.equal(rejected.status, "outside-preset-target");
});

test("Borg display track comparison fails on an unmatched sample", () => {
  assert.throws(
    () => evaluateBorgDisplayTrackAgreement({
      coarseFrames: [frame(1, 1, 0)],
      refinedFrames: [frame(1, 0, 0)],
      envelopeRadius: 0.5,
    }),
    /matching path\/time samples/,
  );
});
