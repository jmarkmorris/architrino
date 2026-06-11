import test from "node:test";
import assert from "node:assert/strict";

import * as THREE from "../vendor/three/three.module.js";
import { solveCircularSelfHitSpan } from "../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js";
import {
  computeAssemblyMomentumContractionMatrix,
  computeLorentzAlignedOrbitBasis,
  computeLorentzState,
  computePotentialContribution,
  computePotentialSum,
  createIdealSwarmModel,
  getOrbitPathTintProfile,
  navigateIdealSwarmHome,
  solveFlightTime,
} from "../src/apps/ideal-swarm/IdealSwarmPrototypeRuntime.js";

test("nested shell swarm prototype model reuses three animator circular binaries", () => {
  const model = createIdealSwarmModel({ THREE });

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
  assert.equal(model.fieldSpeed, model.binaries[1].speed);
  model.binaries.forEach((binary) => {
    assert.ok(Math.abs(binary.fieldSpeedRatio - binary.speed / model.fieldSpeed) < 1e-12);
  });
  assert.ok(Math.abs(model.binaries[0].fieldSpeedRatio - 1.1538461538461537) < 1e-12);
  assert.ok(Math.abs(model.binaries[2].fieldSpeedRatio - 0.7912087912087912) < 1e-12);
  assert.deepEqual(
    model.architrinos.map((architrino) => architrino.chargeType).slice(0, 2),
    ["positrino", "electrino"]
  );
});

test("standalone Ideal Swarm home navigation returns to the main webapp", () => {
  const assigned = [];
  const locationLike = {
    assign: (href) => assigned.push(href),
  };

  assert.equal(navigateIdealSwarmHome(locationLike), true);
  assert.deepEqual(assigned, ["./index.html"]);
  assert.equal(navigateIdealSwarmHome(locationLike, ""), false);
});

test("full potential is the six-emission superposition", () => {
  const model = createIdealSwarmModel({ THREE });
  const samplePoint = new THREE.Vector3(1.8, -0.4, 0.65);
  const observationTime = 1.35;
  const options = { fieldSpeed: 6, softening: 0.1 };
  const manualTotal = model.architrinos
    .map((architrino) =>
      computePotentialContribution(samplePoint, architrino, observationTime, options)
    )
    .reduce((sum, contribution) => sum + contribution.potential, 0);
  const total = computePotentialSum(samplePoint, model, observationTime, options).potential;

  assert.ok(Math.abs(total - manualTotal) < 1e-12);
});

test("Lorentz energy ledger separates rest, movement, and total energy", () => {
  const beta = 0.6;
  const state = computeLorentzState(beta, 1.62);

  assert.equal(state.restMass, 1);
  assert.equal(state.restEnergy, 1);
  assert.ok(Math.abs(state.gamma - 1.25) < 1e-12);
  assert.ok(Math.abs(state.restEnergyShareFactor - 0.8) < 1e-12);
  assert.ok(Math.abs(state.movementEnergy - 0.25) < 1e-12);
  assert.ok(Math.abs(state.movementMassEquivalent - 0.25) < 1e-12);
  assert.ok(Math.abs(state.totalEnergy - 1.25) < 1e-12);
  assert.ok(Math.abs(state.totalMassEquivalent - 1.25) < 1e-12);
});

test("Lorentz energy ledger treats beta equals one as a limit state", () => {
  const state = computeLorentzState(1, 1.62);

  assert.equal(state.restEnergyShareFactor, 0);
  assert.equal(state.lengthRatio, 0);
  assert.equal(state.gamma, Infinity);
  assert.equal(state.movementEnergy, Infinity);
  assert.equal(state.movementMassEquivalent, Infinity);
  assert.equal(state.totalEnergy, Infinity);
  assert.equal(state.totalMassEquivalent, Infinity);
});

test("Lorentz alignment tilts binary angular momentum normals toward assembly momentum", () => {
  const model = createIdealSwarmModel({ THREE });
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const restState = computeLorentzState(0, 1.62);
  const limitState = computeLorentzState(1, 1.62);
  const movingState = computeLorentzState(0.8, 1.62);

  model.binaries.forEach((binary) => {
    const restBasis = computeLorentzAlignedOrbitBasis(THREE, binary.restBasis, restState);
    const movingBasis = computeLorentzAlignedOrbitBasis(THREE, binary.restBasis, movingState);
    const limitBasis = computeLorentzAlignedOrbitBasis(THREE, binary.restBasis, limitState);

    assert.ok(restBasis.normal.distanceTo(binary.restBasis.normal) < 1e-12);
    assert.ok(
      movingBasis.normal.dot(assemblyMomentum) > binary.restBasis.normal.dot(assemblyMomentum)
    );
    assert.ok(limitBasis.normal.distanceTo(assemblyMomentum) < 1e-12);
  });
});

test("assembly momentum contraction preserves the final shared orbit plane", () => {
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const limitState = computeLorentzState(1, 1.62);
  const contraction = computeAssemblyMomentumContractionMatrix(THREE, limitState);
  const collapsedMomentum = assemblyMomentum.clone().applyMatrix4(contraction);
  const inPlane = new THREE.Vector3(1, -1, 0).normalize();
  const contractedInPlane = inPlane.clone().applyMatrix4(contraction);

  assert.ok(collapsedMomentum.length() < 1e-10);
  assert.ok(contractedInPlane.distanceTo(inPlane) < 1e-10);
});

test("flight time solver returns a positive emission delay", () => {
  const model = createIdealSwarmModel({ THREE });
  const samplePoint = new THREE.Vector3(1.6, 0.3, -0.5);
  const tau = solveFlightTime(samplePoint, model.architrinos[0], 0.9, {
    fieldSpeed: 6,
    iterations: 5,
  });

  assert.ok(tau > 0);
  assert.ok(Number.isFinite(tau));
});

test("orbit path tint profiles distinguish inner middle and outer binaries", () => {
  const model = createIdealSwarmModel({ THREE });
  const [inner, middle, outer] = model.binaries.map((binary) => getOrbitPathTintProfile(binary));

  assert.equal(middle.regime, "field speed");
  assert.equal(inner.regime, "faster");
  assert.equal(outer.regime, "slower");
  assert.equal(middle.forwardSpan, 0);
  assert.ok(middle.backwardSpan > 0);
  assert.ok(middle.backwardGain > 1);
  assert.ok(middle.wakeWidthScale > 1.4);
  assert.equal(inner.forwardSpan, 0);
  assert.ok(inner.backwardSpan > inner.forwardSpan);
  assert.ok(inner.backwardGain > 0.8);
  assert.ok(inner.backwardGain < middle.backwardGain);
  assert.ok(inner.falloff > middle.falloff);
  assert.ok(inner.wakeWidthScale > 1);
  assert.ok(inner.wakeWidthScale < middle.wakeWidthScale);
  assert.ok(outer.forwardSpan > outer.backwardSpan);
  assert.ok(outer.forwardWidthScale < 1);
  assert.ok(outer.wakeWidthScale > 2);
});

test("super-field profile expands the path-history span from circular self-hit geometry", () => {
  const model = createIdealSwarmModel({ THREE });
  const innerRatio = model.binaries[0].fieldSpeedRatio;
  const nearThresholdSpan = solveCircularSelfHitSpan(1.08);
  const innerSpan = solveCircularSelfHitSpan(innerRatio);

  assert.ok(nearThresholdSpan > 0);
  assert.ok(innerSpan > nearThresholdSpan);
  assert.ok(Math.abs(getOrbitPathTintProfile(model.binaries[0]).selfHitSpan - innerSpan) < 1e-12);
});
