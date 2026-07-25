import assert from "node:assert/strict";
import test from "node:test";

import {
  reduceBinaryBreatherFrames,
} from "../scripts/eom/analyze-binary-breather-frames.mjs";

function pairRows(separations) {
  const rows = [];
  for (let frameIndex = 0; frameIndex < separations.length; ++frameIndex) {
    const { r, radialSpeed } = separations[frameIndex];
    for (const pathKey of [1, 2]) {
      const sign = pathKey === 1 ? 1 : -1;
      rows.push({
        pathKey,
        frameIndex,
        time: frameIndex,
        position: { x: sign * r / 2, y: 0, z: 0 },
        velocity: { x: sign * radialSpeed / 2, y: 0, z: 0 },
        errorBound: 1e-9,
      });
    }
  }
  return rows;
}

test("finds alternating minimum and maximum brackets", () => {
  const result = reduceBinaryBreatherFrames(
    pairRows([
      { r: 2, radialSpeed: -1 },
      { r: 1, radialSpeed: -0.25 },
      { r: 1.1, radialSpeed: 0.5 },
      { r: 2, radialSpeed: 0.2 },
      { r: 1.9, radialSpeed: -0.4 },
      { r: 1, radialSpeed: -0.2 },
      { r: 1.1, radialSpeed: 0.2 },
    ]),
  );

  assert.deepEqual(
    result.turningPoints.map(({ kind }) => kind),
    ["minimum", "maximum", "minimum"],
  );
  assert.equal(result.returnMap.completedReturnIntervals, 1);
  assert.equal(result.returnMap.excursions.length, 1);
  assert.equal(
    result.returnMap.sufficientForRepeatedBreathingDiagnostic,
    true,
  );
  assert.equal(result.midpointDrift.maximumMagnitude, 0);
});

test("does not manufacture a return map from one rebound", () => {
  const result = reduceBinaryBreatherFrames(
    pairRows([
      { r: 2, radialSpeed: -1 },
      { r: 1, radialSpeed: -0.1 },
      { r: 1.1, radialSpeed: 0.2 },
      { r: 1.3, radialSpeed: 0.4 },
    ]),
  );

  assert.equal(result.turningPoints.length, 1);
  assert.equal(result.returnMap.completedReturnIntervals, 0);
  assert.equal(
    result.returnMap.sufficientForRepeatedBreathingDiagnostic,
    false,
  );
  assert.match(result.energyAccount, /not evaluated/);
});

test("does not count a numerical-zero release slope as a turning point", () => {
  const result = reduceBinaryBreatherFrames(
    pairRows([
      { r: 1, radialSpeed: -3e-17 },
      { r: 1.1, radialSpeed: 0.2 },
      { r: 1.3, radialSpeed: 0.4 },
    ]),
  );

  assert.equal(result.turningPoints.length, 0);
});

test("reports labeled-path crossing separately from a radial minimum", () => {
  const rows = pairRows([
    { r: 1, radialSpeed: -0.5 },
    { r: 0.2, radialSpeed: -0.5 },
    { r: -0.2, radialSpeed: -0.5 },
  ]);
  const result = reduceBinaryBreatherFrames(rows);

  assert.equal(result.labeledPathCrossings.length, 1);
  assert.deepEqual(
    result.labeledPathCrossings[0].signedAxialSeparationBracket,
    [0.2, -0.2],
  );
  assert.equal(result.returnMap.crossingOccurred, true);
  assert.deepEqual(
    result.labeledPathCrossings[0].linearCrossingLocation,
    [0, 0, 0],
  );
  assert.deepEqual(
    result.labeledPathCrossings[0].fieldSpeedFractions,
    [0.25, 0.25],
  );
});
