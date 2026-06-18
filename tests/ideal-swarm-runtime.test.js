import test from "node:test";
import assert from "node:assert/strict";

import * as THREE from "../vendor/three/three.module.js";
import {
  createIdealSwarmCircularSelfHitSpanRunRequest,
  solveCircularSelfHitSpan,
  solveCircularSelfHitSpanRowWithSolverBridge,
  solveCircularSelfHitSpanWithSolverBridge,
} from "../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js";
import {
  computeAssemblyMomentumContractionMatrix,
  computeLorentzAlignedOrbitBasis,
  computeLorentzState,
  computePotentialContribution,
  computePotentialSum,
  createIdealSwarmFlightTimeRunRequest,
  createSurfaceSamples,
  createIdealSwarmModel,
  getOrbitPathTintProfile,
  navigateIdealSwarmHome,
  solveFlightTime,
  solveFlightTimeRowWithSolverBridge,
  solveFlightTimeWithSolverBridge,
} from "../src/apps/ideal-swarm/IdealSwarmRuntime.js";
import { createSolverBridgeLoopbackWorker } from "./solver-worker-loopback.mjs";

test("Ideal Swarm model reuses three animator circular binaries", () => {
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

test("surface sample poles align with assembly momentum", () => {
  const samples = createSurfaceSamples(THREE);
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const firstPole = samples[0].unit;
  const lastPole = samples[samples.length - 1].unit;

  assert.ok(firstPole.distanceTo(assemblyMomentum) < 1e-12);
  assert.ok(lastPole.distanceTo(assemblyMomentum.clone().multiplyScalar(-1)) < 1e-12);
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

test("Ideal Swarm flight time can be routed through the solver app bridge for a linear source", async () => {
  const sourceStart = new THREE.Vector3(1, -0.5, 0.25);
  const sourceVelocity = new THREE.Vector3(0.2, 0.1, -0.05);
  const architrino = {
    q: 2,
    positionAt(timeSeconds) {
      return sourceStart.clone().add(sourceVelocity.clone().multiplyScalar(timeSeconds));
    },
    velocityAt() {
      return sourceVelocity.clone();
    },
  };
  const samplePoint = new THREE.Vector3(3.4, 1.2, -0.7);
  const observationTime = 2.5;
  const options = {
    fieldSpeed: 6,
    iterations: 6,
    sourceStartTime: 0,
    sourceEndTime: observationTime,
    normalization: 2,
    sourceCharge: 2,
    useCausalDenominator: true,
  };
  const expectedTau = solveFlightTime(samplePoint, architrino, observationTime, options);
  const runRequest = createIdealSwarmFlightTimeRunRequest(
    samplePoint,
    architrino,
    observationTime,
    {
      ...options,
      requestId: "ideal_flight_bridge_request",
      runId: "ideal_flight_bridge_run",
      datasetId: "ideal_flight_bridge_dataset",
    }
  );

  assert.equal(runRequest.appId, "ideal-swarm");
  assert.equal(runRequest.runKind, "sharedGeometry");
  assert.equal(runRequest.envelope.timeWindow.units, "seconds");
  assert.equal(runRequest.config.geometryRequest.delayedPotentials[0].iterations, 6);
  assert.deepEqual(runRequest.config.geometryRequest.delayedPotentials[0].source.velocity, {
    x: 0.2,
    y: 0.1,
    z: -0.05,
  });

  const row = await solveFlightTimeRowWithSolverBridge(samplePoint, architrino, observationTime, {
    runRequest,
    async runSolverBridge(request) {
      assert.equal(request.requestId, "ideal_flight_bridge_request");
      return createFlightTimeRunHandle(request, expectedTau);
    },
  });

  assert.equal(row.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(row.runId, "ideal_flight_bridge_run");
  assert.ok(Math.abs(row.tau - expectedTau) < 1e-12);

  const tau = await solveFlightTimeWithSolverBridge(samplePoint, architrino, observationTime, {
    async runSolverBridge(request) {
      return createFlightTimeRunHandle(request, expectedTau);
    },
  });
  assert.ok(Math.abs(tau - expectedTau) < 1e-12);
});

test("Ideal Swarm flight time can create and dispose a solver bridge client", async () => {
  const sourceStart = new THREE.Vector3(0.4, -0.2, 0.1);
  const sourceVelocity = new THREE.Vector3(0.05, 0.1, -0.02);
  const architrino = {
    q: 1,
    positionAt(timeSeconds) {
      return sourceStart.clone().add(sourceVelocity.clone().multiplyScalar(timeSeconds));
    },
    velocityAt() {
      return sourceVelocity.clone();
    },
  };
  const samplePoint = new THREE.Vector3(1.3, 0.7, -0.2);
  const observationTime = 1.5;
  const expectedTau = 0.25;
  let disposed = false;

  const row = await solveFlightTimeRowWithSolverBridge(samplePoint, architrino, observationTime, {
    requestId: "ideal_flight_factory_request",
    runId: "ideal_flight_factory_run",
    datasetId: "ideal_flight_factory_dataset",
    disposeSolverBridgeClientAfterRun: true,
    createSolverBridgeClient(factoryRequest, context) {
      assert.equal(context.appId, "ideal-swarm");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("sharedGeometry"));
      assert.equal(factoryRequest.observationTime, observationTime);
      return {
        async runSimulation(runRequest) {
          assert.equal(runRequest.requestId, "ideal_flight_factory_request");
          return createFlightTimeRunHandle(runRequest, expectedTau);
        },
        async dispose() {
          disposed = true;
        },
      };
    },
  });

  assert.equal(row.runId, "ideal_flight_factory_run");
  assert.equal(row.tau, expectedTau);
  assert.equal(disposed, true);
});

test("Ideal Swarm flight time can create and dispose a solver bridge worker client", async () => {
  const sourceStart = new THREE.Vector3(0.2, 0.1, -0.3);
  const sourceVelocity = new THREE.Vector3(0.04, -0.03, 0.02);
  const architrino = {
    q: 1,
    positionAt(timeSeconds) {
      return sourceStart.clone().add(sourceVelocity.clone().multiplyScalar(timeSeconds));
    },
    velocityAt() {
      return sourceVelocity.clone();
    },
  };
  const samplePoint = new THREE.Vector3(0.8, -0.6, 0.5);
  const observationTime = 2.25;
  const expectedTau = 0.375;
  const worker = createSolverBridgeLoopbackWorker({
    init(initRequest) {
      assert.equal(initRequest.appId, "ideal-swarm");
      assert.ok(initRequest.requestedCapabilities.includes("sharedGeometry"));
      return {
        apiVersion: initRequest.apiVersion,
        status: { code: "ok", severity: "ok", message: "solver initialized" },
      };
    },
    runSimulation(runRequest) {
      assert.equal(runRequest.requestId, "ideal_flight_worker_request");
      assert.equal(runRequest.runKind, "sharedGeometry");
      return createFlightTimeRunHandle(runRequest, expectedTau);
    },
  });

  const row = await solveFlightTimeRowWithSolverBridge(samplePoint, architrino, observationTime, {
    requestId: "ideal_flight_worker_request",
    runId: "ideal_flight_worker_run",
    datasetId: "ideal_flight_worker_dataset",
    createSolverWorker(factoryRequest, context) {
      assert.equal(context.appId, "ideal-swarm");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("sharedGeometry"));
      assert.equal(factoryRequest.observationTime, observationTime);
      return worker;
    },
  });

  assert.equal(row.runId, "ideal_flight_worker_run");
  assert.equal(row.tau, expectedTau);
  assert.deepEqual(
    worker.messages.map((message) => message.method),
    ["init", "runSimulation", "dispose"]
  );
  assert.equal(worker.terminated, true);
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

test("Ideal Swarm circular self-hit span can be routed through the solver app bridge", async () => {
  const runRequest = createIdealSwarmCircularSelfHitSpanRunRequest(1.2, {
    requestId: "ideal_self_hit_bridge_request",
    runId: "ideal_self_hit_bridge_run",
    datasetId: "ideal_self_hit_bridge_dataset",
  });

  assert.equal(runRequest.appId, "ideal-swarm");
  assert.equal(runRequest.runKind, "sharedGeometry");
  assert.equal(runRequest.config.geometryRequest.circularSelfHitSpans[0].fieldSpeedRatio, 1.2);
  assert.equal(runRequest.config.geometryRequest.circularSelfHitSpans[0].maxIterations, 28);
  assert.equal(runRequest.envelope.timeWindow.units, "cycles");

  const expectedSpan = 2.0534765827345125;
  const row = await solveCircularSelfHitSpanRowWithSolverBridge(1.2, {
    runRequest,
    async runSolverBridge(request) {
      assert.equal(request.requestId, "ideal_self_hit_bridge_request");
      return createSelfHitRunHandle(request, expectedSpan);
    },
  });

  assert.equal(row.solverEngineId, "architrino-solver-app-bridge");
  assert.equal(row.runId, "ideal_self_hit_bridge_run");
  assert.equal(row.resultKind, "root_solved");
  assert.equal(row.rootFound, true);
  assert.ok(Math.abs(row.span - expectedSpan) < 1e-12);

  const span = await solveCircularSelfHitSpanWithSolverBridge(1.2, {
    async runSolverBridge(request) {
      return createSelfHitRunHandle(request, expectedSpan);
    },
  });
  assert.ok(Math.abs(span - expectedSpan) < 1e-12);
});

test("Ideal Swarm circular self-hit span can create and dispose a solver bridge client", async () => {
  const expectedSpan = 2.5;
  let disposed = false;
  const row = await solveCircularSelfHitSpanRowWithSolverBridge(1.35, {
    requestId: "ideal_self_hit_factory_request",
    runId: "ideal_self_hit_factory_run",
    datasetId: "ideal_self_hit_factory_dataset",
    disposeSolverBridgeClientAfterRun: true,
    createSolverBridgeClient(factoryRequest, context) {
      assert.equal(context.appId, "ideal-swarm");
      assert.equal(context.requiredMethod, "runSimulation");
      assert.ok(context.requestedCapabilities.includes("sharedGeometry"));
      assert.equal(factoryRequest.fieldSpeedRatio, 1.35);
      return {
        async runSimulation(runRequest) {
          assert.equal(runRequest.requestId, "ideal_self_hit_factory_request");
          return createSelfHitRunHandle(runRequest, expectedSpan);
        },
        async dispose() {
          disposed = true;
        },
      };
    },
  });

  assert.equal(row.runId, "ideal_self_hit_factory_run");
  assert.equal(row.span, expectedSpan);
  assert.equal(disposed, true);
});

function createSelfHitRunHandle(runRequest, span) {
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        circularSelfHitSpans: [
          {
            itemIndex: 0,
            statusCode: 0,
            fieldSpeedRatio: 1.2,
            fieldSpeedTolerance: 0.015,
            regime: "super_field",
            resultKind: "root_solved",
            span,
            rootFound: true,
            bracketLow: span,
            bracketHigh: span,
            residual: 0,
            iterations: 28,
          },
        ],
      },
      status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    },
  };
}

function createFlightTimeRunHandle(runRequest, tau) {
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        delayedPotentials: [
          {
            itemIndex: 0,
            statusCode: 0,
            tau,
            emissionTime: runRequest.config.geometryRequest.delayedPotentials[0].observationTime - tau,
            emissionPoint: { x: 0, y: 0, z: 0 },
            displacement: { x: 0, y: 0, z: 0 },
            distance: 1,
            denominator: 1,
            potential: 1,
            kappa: 1,
            iterations: runRequest.config.geometryRequest.delayedPotentials[0].iterations,
            usedCausalDenominator: true,
          },
        ],
      },
      status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    },
  };
}
