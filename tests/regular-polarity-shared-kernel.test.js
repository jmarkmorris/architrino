import test from "node:test";
import assert from "node:assert/strict";

import {
  buildRegularCircularRootKernel,
  evaluatePlanarCoRotatingRing,
  projectRegularPolarityKernel,
  regularRingPhases,
} from "../src/prescribed-path-analysis/PlanarCoRotatingRingBalance.mjs";

function close(actual, expected, tolerance = 3e-11) {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(expected)),
    `${actual} differs from ${expected}`);
}

const WORDS = new Map([
  [2, [1, 1, -1, -1]],
  [4, [1, 1, -1, 1, -1, -1, 1, -1]],
  [7, [1, 1, -1, 1, -1, -1, 1, -1, 1, -1, 1, -1, 1, -1]],
]);

test("one shared regular circular kernel reproduces every receiver row", () => {
  for (const [n, polarities] of WORDS) {
    for (const beta of [0.5, 0.99, 1.01, 3.070356625390253, 10]) {
      const kernel = buildRegularCircularRootKernel({ n, beta });
      const projected = projectRegularPolarityKernel({ kernel, polarities });
      const direct = evaluatePlanarCoRotatingRing({ phases: regularRingPhases(n), polarities, beta });
      assert.equal(kernel.rootCompleteness.complete, direct.rootCompleteness.complete);
      assert.equal(kernel.rootCountPerReceiver * kernel.memberCount, direct.rootCount);
      for (const receiver of direct.receivers) {
        const actual = projected.receivers[receiver.receiverIndex];
        close(actual.radialCoefficient, receiver.radialCoefficient);
        close(actual.tangentialCoefficient, receiver.tangentialCoefficient);
        close(actual.axialCoefficient, receiver.axialCoefficient);
      }
      if (direct.compatibleScale == null) assert.equal(projected.compatibleScale, null);
      else close(projected.compatibleScale, direct.compatibleScale);
      close(projected.residuals.maximumFullVector, direct.residuals.maximumFullVector);
    }
  }
});

test("one kernel projects distinct balanced polarity words without another root solve", () => {
  const kernel = buildRegularCircularRootKernel({ n: 4, beta: 3.070356625390253 });
  const first = projectRegularPolarityKernel({ kernel, polarities: [1, -1, 1, -1, 1, -1, 1, -1] });
  const second = projectRegularPolarityKernel({ kernel, polarities: [1, 1, -1, -1, 1, 1, -1, -1] });
  assert.equal(first.kernel.beta, second.kernel.beta);
  assert.notDeepEqual(first.receivers, second.receivers);
  assert.equal(kernel.entries.length, 8);
});
