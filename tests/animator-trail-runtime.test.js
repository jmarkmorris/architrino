import test from "node:test";
import assert from "node:assert/strict";

import {
  createAnimatorFadeableTrailSamples,
  createAnimatorTimedTrailSamples,
  getAnimatorTrailMaterialOpacity,
  normalizeAnimatorTrailControls,
} from "../src/apps/animator/AnimatorTrailRuntime.js";

function roundTriplet(triplet) {
  return triplet.map((value) => Number(value.toFixed(6)));
}

test("animator trail controls normalize opacity, lifetime, and emphasis", () => {
  const controls = normalizeAnimatorTrailControls({
    opacityScale: 2,
    lifetimeSeconds: -1,
    diagnosticEmphasis: false,
    fadeFloor: 2,
  });

  assert.equal(controls.opacityScale, 1);
  assert.equal(controls.lifetimeSeconds, 0.25);
  assert.equal(controls.diagnosticEmphasis, false);
  assert.equal(controls.fadeFloor, 0.95);
});

test("animator timed path samples map path positions across the simulation window", () => {
  const samples = createAnimatorTimedTrailSamples(
    [
      [0, 0, 0],
      [2, 1, 0],
      [4, 0, 0],
    ],
    { start: 2, end: 6 }
  );

  assert.deepEqual(
    samples.map((sample) => [sample.t, ...sample.position]),
    [
      [2, 0, 0, 0],
      [4, 2, 1, 0],
      [6, 4, 0, 0],
    ]
  );
});

test("animator fadeable trails clip to lifetime and insert a cutoff sample", () => {
  const samples = createAnimatorFadeableTrailSamples(
    [
      { t: 0, position: [0, 0, 0] },
      { t: 1, position: [1, 0, 0] },
      { t: 2, position: [2, 1, 0] },
      { t: 3, position: [3, 1, 0] },
    ],
    2.5,
    { lifetimeSeconds: 1, fadeFloor: 0 }
  );

  assert.deepEqual(
    samples.map((sample) => [Number(sample.t.toFixed(3)), ...roundTriplet(sample.position)]),
    [
      [1.5, 1.5, 0.5, 0],
      [2, 2, 1, 0],
      [2.5, 2.5, 1, 0],
    ]
  );
  assert.deepEqual(
    samples.map((sample) => Number(sample.fade.toFixed(3))),
    [0, 0.5, 1]
  );
});

test("animator trail opacity applies global scale and solver diagnostic emphasis", () => {
  const emphasizedOpacity = getAnimatorTrailMaterialOpacity(
    { kind: "solver-derived", style: { opacity: 0.5 } },
    { opacityScale: 0.5, diagnosticEmphasis: true }
  );
  assert.ok(Math.abs(emphasizedOpacity - 0.295) < 0.000001);
  assert.equal(
    getAnimatorTrailMaterialOpacity(
      { kind: "solver-derived", style: { opacity: 0.5 } },
      { opacityScale: 0.5, diagnosticEmphasis: false }
    ),
    0.25
  );
});
