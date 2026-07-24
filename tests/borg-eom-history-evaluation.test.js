import assert from "node:assert/strict";
import test from "node:test";

import {
  evaluateEomCubicHistoryAtTime,
} from "../src/apps/shared/EomCubicHistoryEvaluation.mjs";

const history = Object.freeze({
  pathId: "7",
  coverageStart: "0",
  coverageEnd: "1",
  segments: Object.freeze([{
    startTime: "0",
    endTime: "1",
    coefficients: [
      ["1", "2", "0", "0"],
      ["3", "0", "0", "0"],
      ["4", "-1", "0", "0"],
    ],
    positionErrors: ["0.01", "0.02", "0.03"],
    velocityErrors: ["0.04", "0.05", "0.06"],
  }]),
});

test("shared cubic-history evaluation handles EOM token rows without extrapolation", () => {
  const state = evaluateEomCubicHistoryAtTime(history, 0.5);
  assert.deepEqual(state.position, { x: 2, y: 3, z: 3.5 });
  assert.deepEqual(state.velocity, { x: 2, y: 0, z: -1 });
  assert.equal(state.errorBound, 0.06);

  assert.throws(
    () => evaluateEomCubicHistoryAtTime(history, 1.0001),
    /does not cover output time/,
  );
});

test("shared cubic-history evaluation rejects gaps even inside declared coverage", () => {
  const inconsistent = {
    ...history,
    coverageEnd: "2",
  };
  assert.throws(
    () => evaluateEomCubicHistoryAtTime(inconsistent, 1.5),
    /does not cover output time/,
  );
});
