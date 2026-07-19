import test from "node:test";
import assert from "node:assert/strict";

import * as THREE from "../vendor/three/three.module.js";
import {
  createIdealBraidCircularSelfHitSpanRunRequest,
  solveCircularSelfHitSpanRowWithPrescribedPathAnalysis,
  solveCircularSelfHitSpanRowsWithPrescribedPathAnalysis,
  solveCircularSelfHitSpanWithPrescribedPathAnalysis,
  getOrbitPathTintProfileWithPrescribedPathAnalysis,
} from "../src/apps/ideal-braid/IdealBraidPathPotentialProfile.js";
import {
  computePotentialSamplesWithPrescribedPathAnalysis,
  computeAssemblyMomentumContractionMatrix,
  computeLorentzAlignedOrbitBasis,
  computeLorentzState,
  createIdealBraidFlightTimeRunRequest,
  createIdealBraidPotentialSamplesRunRequest,
  createSurfaceSamples,
  createIdealBraidModel,
  getOrbitPathTintProfile,
  navigateIdealBraidHome,
  solveFlightTimeRowWithPrescribedPathAnalysis,
  solveFlightTimeWithPrescribedPathAnalysis,
} from "../src/apps/ideal-braid/IdealBraidRuntime.js";

test("Ideal Braid model reuses three animator circular binaries", () => {
  const model = createIdealBraidModel({ THREE });

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

test("standalone Ideal Braid home navigation returns to the main webapp", () => {
  const assigned = [];
  const locationLike = {
    assign: (href) => assigned.push(href),
  };

  assert.equal(navigateIdealBraidHome(locationLike), true);
  assert.deepEqual(assigned, ["./index.html#scene=content%2Fscenes%2Farchie%2Fapplications.json"]);
  assert.equal(navigateIdealBraidHome(locationLike, ""), false);
});

test("surface sample poles align with assembly momentum", () => {
  const samples = createSurfaceSamples(THREE);
  const assemblyMomentum = new THREE.Vector3(1, 1, 1).normalize();
  const firstPole = samples[0].unit;
  const lastPole = samples[samples.length - 1].unit;

  assert.ok(firstPole.distanceTo(assemblyMomentum) < 1e-12);
  assert.ok(lastPole.distanceTo(assemblyMomentum.clone().multiplyScalar(-1)) < 1e-12);
});

test("full potential is the prescribed-path analysis six-emission superposition", async () => {
  const model = createIdealBraidModel({ THREE });
  const samplePoint = new THREE.Vector3(1.8, -0.4, 0.65);
  const observationTime = 1.35;
  const runRequest = createIdealBraidPotentialSamplesRunRequest(
    [samplePoint],
    model,
    observationTime,
    {
      fieldSpeed: 6,
      softening: 0.1,
      requestId: "ideal_potential_samples_request",
      runId: "ideal_potential_samples_run",
      datasetId: "ideal_potential_samples_dataset",
    }
  );
  const expectedPotentials = model.architrinos.map((architrino, index) =>
    architrino.q * (index + 1) * 0.25
  );
  const manualTotal = expectedPotentials.reduce((sum, potential) => sum + potential, 0);
  const snapshot = await computePotentialSamplesWithPrescribedPathAnalysis(
    [samplePoint],
    model,
    observationTime,
    {
      runRequest,
      async runPrescribedPathAnalysis(request) {
        assert.equal(request.requestId, "ideal_potential_samples_request");
        assert.equal(request.config.geometryRequest.delayedPotentials.length, 6);
        return createPotentialSamplesRunHandle(request, expectedPotentials);
      },
    }
  );

  assert.equal(snapshot.analysisId, "prescribed-path-analysis");
  assert.equal(snapshot.runId, "ideal_potential_samples_run");
  assert.ok(Math.abs(snapshot.samplePotentials[0] - manualTotal) < 1e-12);
  assert.equal(snapshot.contributionsBySample[0].length, 6);
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
  const model = createIdealBraidModel({ THREE });
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

test("prescribed-path flight-time analysis returns a positive emission delay", async () => {
  const model = createIdealBraidModel({ THREE });
  const samplePoint = new THREE.Vector3(1.6, 0.3, -0.5);
  const expectedTau = 0.3125;
  const tau = await solveFlightTimeWithPrescribedPathAnalysis(samplePoint, model.architrinos[0], 0.9, {
    fieldSpeed: 6,
    iterations: 5,
    async runPrescribedPathAnalysis(request) {
      return createFlightTimeRunHandle(request, expectedTau);
    },
  });

  assert.ok(tau > 0);
  assert.ok(Number.isFinite(tau));
  assert.equal(tau, expectedTau);
});

test("Ideal Braid flight time can be routed through the prescribed-path analysis for a linear transmitter", async () => {
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
  const expectedTau = 0.483125;
  const runRequest = createIdealBraidFlightTimeRunRequest(
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

  assert.equal(runRequest.appId, "ideal-braid");
  assert.equal(runRequest.runKind, "sharedGeometry");
  assert.equal(runRequest.envelope.timeWindow.units, "seconds");
  assert.equal(runRequest.config.geometryRequest.delayedPotentials[0].iterations, 6);
  assert.deepEqual(runRequest.config.geometryRequest.delayedPotentials[0].source.velocity, {
    x: 0.2,
    y: 0.1,
    z: -0.05,
  });

  const row = await solveFlightTimeRowWithPrescribedPathAnalysis(samplePoint, architrino, observationTime, {
    runRequest,
    async runPrescribedPathAnalysis(request) {
      assert.equal(request.requestId, "ideal_flight_bridge_request");
      return createFlightTimeRunHandle(request, expectedTau);
    },
  });

  assert.equal(row.analysisId, "prescribed-path-analysis");
  assert.equal(row.runId, "ideal_flight_bridge_run");
  assert.ok(Math.abs(row.tau - expectedTau) < 1e-12);

  const tau = await solveFlightTimeWithPrescribedPathAnalysis(samplePoint, architrino, observationTime, {
    async runPrescribedPathAnalysis(request) {
      return createFlightTimeRunHandle(request, expectedTau);
    },
  });
  assert.ok(Math.abs(tau - expectedTau) < 1e-12);
});

test("orbit path tint profiles distinguish inner middle and outer binaries", () => {
  const model = createIdealBraidModel({ THREE });
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

test("super-field profile expands the path-history span from prescribed circular self-hit geometry", async () => {
  const model = createIdealBraidModel({ THREE });
  const innerBinary = model.binaries[0];
  const expectedSpan = 2.0534765827345125;
  const pendingProfile = getOrbitPathTintProfile(innerBinary);
  const cachedProfile = getOrbitPathTintProfile({
    ...innerBinary,
    solverSelfHitSpan: expectedSpan,
  });
  const bridgeProfile = await getOrbitPathTintProfileWithPrescribedPathAnalysis(innerBinary, {
    async runPrescribedPathAnalysis(request) {
      assert.equal(request.config.geometryRequest.circularSelfHitSpans.length, 1);
      return createSelfHitRunHandle(request, expectedSpan);
    },
  });

  assert.equal(pendingProfile.analysisProfileStatus, "pending-analysis-row");
  assert.equal(pendingProfile.selfHitSpan, 0);
  assert.ok(Math.abs(cachedProfile.selfHitSpan - expectedSpan) < 1e-12);
  assert.ok(Math.abs(bridgeProfile.selfHitSpan - expectedSpan) < 1e-12);
  assert.equal(bridgeProfile.analysisId, "prescribed-path-analysis");
});

test("Ideal Braid circular self-hit span can be routed through the prescribed-path analysis", async () => {
  const runRequest = createIdealBraidCircularSelfHitSpanRunRequest(1.2, {
    requestId: "ideal_self_hit_bridge_request",
    runId: "ideal_self_hit_bridge_run",
    datasetId: "ideal_self_hit_bridge_dataset",
  });

  assert.equal(runRequest.appId, "ideal-braid");
  assert.equal(runRequest.runKind, "sharedGeometry");
  assert.equal(runRequest.config.geometryRequest.circularSelfHitSpans[0].fieldSpeedRatio, 1.2);
  assert.equal(runRequest.config.geometryRequest.circularSelfHitSpans[0].maxIterations, 28);
  assert.equal(runRequest.envelope.timeWindow.units, "cycles");

  const expectedSpan = 2.0534765827345125;
  const row = await solveCircularSelfHitSpanRowWithPrescribedPathAnalysis(1.2, {
    runRequest,
    async runPrescribedPathAnalysis(request) {
      assert.equal(request.requestId, "ideal_self_hit_bridge_request");
      return createSelfHitRunHandle(request, expectedSpan);
    },
  });

  assert.equal(row.analysisId, "prescribed-path-analysis");
  assert.equal(row.runId, "ideal_self_hit_bridge_run");
  assert.equal(row.resultKind, "root_solved");
  assert.equal(row.rootFound, true);
  assert.ok(Math.abs(row.span - expectedSpan) < 1e-12);

  const span = await solveCircularSelfHitSpanWithPrescribedPathAnalysis(1.2, {
    async runPrescribedPathAnalysis(request) {
      return createSelfHitRunHandle(request, expectedSpan);
    },
  });
  assert.ok(Math.abs(span - expectedSpan) < 1e-12);
});

test("Ideal Braid circular self-hit spans can be batched through the prescribed-path analysis", async () => {
  const ratios = [1.2, 1.01, 0.8];
  const spans = [2.0534765827345125, 0, 0];
  const rows = await solveCircularSelfHitSpanRowsWithPrescribedPathAnalysis(ratios, {
    requestId: "ideal_self_hit_batch_request",
    runId: "ideal_self_hit_batch_run",
    datasetId: "ideal_self_hit_batch_dataset",
    async runPrescribedPathAnalysis(request) {
      assert.equal(request.requestId, "ideal_self_hit_batch_request");
      assert.equal(request.config.geometryRequest.circularSelfHitSpans.length, 3);
      return createSelfHitRunHandle(request, spans);
    },
  });

  assert.equal(rows.length, 3);
  assert.equal(rows[0].runId, "ideal_self_hit_batch_run");
  assert.equal(rows[0].rootFound, true);
  assert.equal(rows[1].rootFound, false);
  assert.equal(rows[2].rootFound, false);
  assert.ok(Math.abs(rows[0].span - spans[0]) < 1e-12);
});

function createSelfHitRunHandle(runRequest, spanOrSpans) {
  const requests = runRequest.config.geometryRequest.circularSelfHitSpans;
  const spans = Array.isArray(spanOrSpans) ? spanOrSpans : requests.map(() => spanOrSpans);
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        circularSelfHitSpans: requests.map((request, index) => {
          const span = spans[index] ?? 0;
          const rootFound = span > 0;
          return {
            itemIndex: index,
            statusCode: 0,
            fieldSpeedRatio: request.fieldSpeedRatio,
            fieldSpeedTolerance: request.fieldSpeedTolerance ?? 0.015,
            regime: request.fieldSpeedRatio > 1.015 ? "super_field" : "sub_or_field",
            resultKind: rootFound ? "root_solved" : "below_threshold",
            span,
            rootFound,
            bracketLow: span,
            bracketHigh: span,
            residual: 0,
            iterations: request.maxIterations ?? 28,
          };
        }),
      },
      status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    },
  };
}

function createPotentialSamplesRunHandle(runRequest, potentials) {
  const requests = runRequest.config.geometryRequest.delayedPotentials;
  return {
    requestId: runRequest.requestId,
    runId: runRequest.runId,
    datasetId: runRequest.datasetId,
    status: { code: "ok", severity: "ok", message: "shared geometry completed" },
    response: {
      runId: runRequest.runId,
      datasetId: runRequest.datasetId,
      geometry: {
        delayedPotentials: requests.map((request, index) => ({
          itemIndex: index,
          statusCode: 0,
          tau: 0.25 + index * 0.01,
          emissionTime: request.observationTime - 0.25 - index * 0.01,
          emissionPoint: { x: 0, y: 0, z: 0 },
          displacement: { x: 0, y: 0, z: 0 },
          distance: 1,
          denominator: 1,
          potential: potentials[index] ?? 0,
          kappa: 1,
          iterations: request.iterations,
          usedCausalDenominator: request.useCausalDenominator === true,
        })),
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
