import test from "node:test";
import assert from "node:assert/strict";

import * as THREE from "../vendor/three/three.module.js";
import { solveCircularSelfHitSpan } from "../src/apps/ideal-core/IdealCorePathPotentialProfile.js";
import {
  computePotentialContribution,
  computePotentialSum,
  createIdealCoreModel,
  getOrbitPathTintProfile,
  getSelectedArchitrinos,
  solveFlightTime,
} from "../src/apps/ideal-core/IdealCorePrototypeRuntime.js";

test("ideal core model reuses three animator circular binaries", () => {
  const model = createIdealCoreModel({ THREE });

  assert.equal(model.binaries.length, 3);
  assert.equal(model.architrinos.length, 6);
  assert.deepEqual(
    model.binaries.map((binary) => binary.id),
    ["inner", "middle", "outer"]
  );
  assert.deepEqual(
    model.binaries.map((binary) => binary.fieldSpeedRegime),
    ["faster", "field speed", "slower"]
  );
  assert.deepEqual(
    model.architrinos.map((architrino) => architrino.chargeType).slice(0, 2),
    ["positrino", "electrino"]
  );
});

test("selected binary potential is the sum of that binary's two arriving emissions", () => {
  const model = createIdealCoreModel({ THREE });
  const samplePoint = new THREE.Vector3(2.4, 0.2, 0.15);
  const observationTime = 0.7;
  const options = { fieldSpeed: 6, softening: 0.1 };
  const innerArchitrinos = getSelectedArchitrinos(model, "inner");
  const manualInner = innerArchitrinos
    .map((architrino) =>
      computePotentialContribution(samplePoint, architrino, observationTime, options)
    )
    .reduce((sum, contribution) => sum + contribution.potential, 0);
  const selectedInner = computePotentialSum(
    samplePoint,
    model,
    "inner",
    observationTime,
    options
  ).potential;

  assert.equal(innerArchitrinos.length, 2);
  assert.ok(Math.abs(selectedInner - manualInner) < 1e-12);
});

test("full potential is the six-emission superposition", () => {
  const model = createIdealCoreModel({ THREE });
  const samplePoint = new THREE.Vector3(1.8, -0.4, 0.65);
  const observationTime = 1.35;
  const options = { fieldSpeed: 6, softening: 0.1 };
  const manualTotal = model.architrinos
    .map((architrino) =>
      computePotentialContribution(samplePoint, architrino, observationTime, options)
    )
    .reduce((sum, contribution) => sum + contribution.potential, 0);
  const total = computePotentialSum(samplePoint, model, "all", observationTime, options).potential;

  assert.ok(Math.abs(total - manualTotal) < 1e-12);
});

test("flight time solver returns a positive emission delay", () => {
  const model = createIdealCoreModel({ THREE });
  const samplePoint = new THREE.Vector3(1.6, 0.3, -0.5);
  const tau = solveFlightTime(samplePoint, model.architrinos[0], 0.9, {
    fieldSpeed: 6,
    iterations: 5,
  });

  assert.ok(tau > 0);
  assert.ok(Number.isFinite(tau));
});

test("orbit path tint profiles distinguish inner middle and outer binaries", () => {
  const inner = getOrbitPathTintProfile("inner");
  const middle = getOrbitPathTintProfile("middle");
  const outer = getOrbitPathTintProfile("outer");

  assert.equal(middle.regime, "field speed");
  assert.equal(inner.regime, "faster");
  assert.equal(outer.regime, "slower");
  assert.equal(middle.forwardSpan, 0);
  assert.ok(middle.backwardSpan > 0);
  assert.ok(middle.backwardGain > 1);
  assert.ok(middle.wakeWidthScale > 1.4);
  assert.equal(inner.forwardSpan, 0);
  assert.ok(inner.backwardSpan > inner.forwardSpan);
  assert.ok(inner.backwardGain > 0.85);
  assert.ok(inner.backwardGain < middle.backwardGain);
  assert.ok(inner.falloff < middle.falloff);
  assert.ok(inner.wakeWidthScale > 1);
  assert.ok(inner.wakeWidthScale < middle.wakeWidthScale);
  assert.ok(Math.abs(inner.wakeWidthScale - 1 - (middle.wakeWidthScale - 1) / 2) < 0.02);
  assert.ok(outer.forwardSpan > outer.backwardSpan);
  assert.ok(outer.forwardWidthScale < 1);
  assert.ok(outer.wakeWidthScale > 2.5);
});

test("super-field profile expands the path-history span from circular self-hit geometry", () => {
  const nearThresholdSpan = solveCircularSelfHitSpan(1.08);
  const innerSpan = solveCircularSelfHitSpan(1.35);

  assert.ok(nearThresholdSpan > 0);
  assert.ok(innerSpan > nearThresholdSpan);
  assert.ok(Math.abs(getOrbitPathTintProfile("inner").selfHitSpan - innerSpan) < 1e-12);
});
