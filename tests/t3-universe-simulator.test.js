import assert from "node:assert/strict";
import test from "node:test";

import {
  createInitialT3State,
  computeReceiverNormalFactor,
  createSoftSphereRepulsionInteraction,
  createInteractionPipeline,
  createT3SpatialIndex,
  createT3Topology,
  createT3UniverseSimulator,
  restoreT3UniverseSimulatorFromCheckpoint,
} from "../src/solver/t3/index.mjs";

test("T3 topology wraps positions and preserves nearest-image distances", () => {
  const topology = createT3Topology({ baseUnitLength: 2, scaleFactor: 5 });
  const positions = new Float64Array([10.25, -0.5, 9.9]);
  const imageOffsets = new Int32Array(3);

  topology.wrapPositionInPlace(positions, 0, imageOffsets);

  assert.deepEqual(Array.from(positions), [0.25, 9.5, 9.9]);
  assert.deepEqual(Array.from(imageOffsets), [1, -1, 0]);
  assert.equal(topology.nearestImageDelta(9.5, 0.25), 0.75);
  assert.equal(topology.nearestImageDelta(0.25, 9.5), -0.75);
});

test("spatial index finds periodic nearest-image neighbors across cube faces", () => {
  const topology = createT3Topology({ sideLength: 10 });
  const state = createInitialT3State({
    topology: { sideLength: 10 },
    particles: {
      items: [
        { id: "left", position: [0.2, 5, 5], velocity: [0, 0, 0] },
        { id: "right", position: [9.8, 5, 5], velocity: [0, 0, 0] },
        { id: "far", position: [5, 5, 5], velocity: [0, 0, 0] },
      ],
    },
  });
  const index = createT3SpatialIndex({ topology, interactionRadius: 0.6 });
  const pairs = [];

  index.rebuild(state);
  index.forEachNeighborPair(state, (i, j, distanceSquared) => {
    pairs.push([state.ids[i], state.ids[j], distanceSquared]);
  });

  assert.equal(pairs.length, 1);
  assert.deepEqual(pairs[0].slice(0, 2), ["left", "right"]);
  assert.ok(Math.abs(pairs[0][2] - 0.16) < 1e-12);
});

test("seeded initial conditions and electrine composition are reproducible", () => {
  const config = {
    topology: { sideLength: 3 },
    particles: { count: 8, electrineFraction: 45 },
    initialConditions: { seed: "same-seed", distribution: "random", velocityDistribution: "gaussian" },
  };

  const a = createInitialT3State(config);
  const b = createInitialT3State(config);

  assert.deepEqual(Array.from(a.positions), Array.from(b.positions));
  assert.deepEqual(Array.from(a.velocities), Array.from(b.velocities));
  assert.equal(a.electrineFractions[0], 0.45);
});

test("fixed reference solver wraps crossing particles without changing velocity or orientation", async () => {
  const simulator = createT3UniverseSimulator({
    config: {
      topology: { sideLength: 10 },
      particles: {
        items: [{ id: "runner", position: [9.8, 1, 1], velocity: [0.5, 0, 0] }],
      },
      initialConditions: { particles: [{ id: "runner", position: [9.8, 1, 1], velocity: [0.5, 0, 0] }] },
      interactions: { interactionRadius: 1 },
      solver: { engine: "reference", mode: "fixed", timestep: 1 },
    },
  });

  const orientationBefore = Array.from(simulator.state.orientations);
  const result = await simulator.step();

  assert.equal(result.accepted, true);
  assert.ok(Math.abs(simulator.state.positions[0] - 0.3) < 1e-12);
  assert.equal(simulator.state.imageOffsets[0], 1);
  assert.equal(simulator.state.velocities[0], 0.5);
  assert.deepEqual(Array.from(simulator.state.orientations), orientationBefore);
});

test("adaptive reference solver accepts deterministic free-flight steps", async () => {
  const simulator = createT3UniverseSimulator({
    config: {
      topology: { sideLength: 10 },
      initialConditions: {
        particles: [{ id: "free", position: [1, 2, 3], velocity: [0.25, 0, 0] }],
      },
      interactions: { interactionRadius: 1 },
      solver: { engine: "reference", mode: "adaptive", timestep: 0.2, tolerance: 1e-9 },
    },
  });

  const result = await simulator.step();

  assert.equal(result.mode, "adaptive");
  assert.equal(result.accepted, true);
  assert.equal(simulator.state.stepIndex, 1);
  assert.ok(Math.abs(simulator.state.time - 0.2) < 1e-12);
  assert.ok(Math.abs(simulator.state.positions[0] - 1.05) < 1e-12);
});

test("receiver normal factor separates source and receiver normal cadence", () => {
  const stationary = computeReceiverNormalFactor({
    direction: [1, 0, 0],
    sourceVelocity: [0, 0, 0],
    receiverVelocity: [0, 0, 0],
    causalSpeed: 1,
  });
  assert.equal(stationary.status, "ok");
  assert.equal(stationary.receiverNormalFactor, 1);

  const moving = computeReceiverNormalFactor({
    direction: [1, 0, 0],
    sourceVelocity: [0.25, 0, 0],
    receiverVelocity: [-0.5, 0, 0],
    causalSpeed: 1,
  });
  assert.equal(moving.status, "ok");
  assert.equal(moving.sourceNormalDenominator, 0.75);
  assert.equal(moving.receiverNormalNumerator, 1.5);
  assert.equal(moving.sourceJacobian, 0.75);
  assert.equal(moving.receiverNormalCrossingFactor, 1.5);
  assert.equal(moving.receiverNormalFactor, 2);

  const sameNormalDrift = computeReceiverNormalFactor({
    direction: [1, 0, 0],
    sourceVelocity: [0.2, 0, 0],
    receiverVelocity: [0.2, 0, 0],
    causalSpeed: 1,
  });
  assert.equal(sameNormalDrift.receiverNormalFactor, 1);

  const grazingSource = computeReceiverNormalFactor({
    direction: [1, 0, 0],
    sourceVelocity: [1, 0, 0],
    receiverVelocity: [0, 0, 0],
    causalSpeed: 1,
  });
  assert.equal(grazingSource.status, "nonfinite");
});

test("pair interaction context exposes receiver normal factor rows", () => {
  const topology = createT3Topology({ sideLength: 10 });
  const state = createInitialT3State({
    topology: { sideLength: 10 },
    initialConditions: {
      particles: [
        { id: "source", position: [4, 5, 5], velocity: [0.25, 0, 0] },
        { id: "receiver", position: [5, 5, 5], velocity: [-0.5, 0, 0] },
      ],
    },
  });
  const spatialIndex = createT3SpatialIndex({ topology, interactionRadius: 2 });
  const rows = [];
  const pipeline = createInteractionPipeline([
    {
      id: "receiver-normal-factor-probe",
      schema: "t3-interaction.v1",
      applyPair(context) {
        rows.push(context.receiverNormalFactor(context.i, context.j, { causalSpeed: 1 }));
      },
    },
  ]);

  pipeline.evaluateAccelerations({
    schema: "t3-solver-context.v1",
    state,
    topology,
    spatialIndex,
    config: { model: { causalSpeed: 1 } },
  });

  assert.equal(rows.length, 1);
  assert.equal(rows[0].status, "ok");
  assert.equal(rows[0].receiverNormalFactor, 2);
});

test("central solver engine advances particles through existing solver client", async () => {
  const calls = [];
  const solverClient = {
    async integrateConstantAccelerationMotionF64(request) {
      calls.push(request);
      const dt = request.endTime - request.startTime;
      return {
        frames: [
          {
            pathKey: request.pathKey,
            frameIndex: 0,
            time: request.startTime,
            position: request.initialPosition,
            velocity: request.initialVelocity,
            errorBound: 0,
            stateFlags: request.stateFlags,
          },
          {
            pathKey: request.pathKey,
            frameIndex: 1,
            time: request.endTime,
            position: {
              x:
                request.initialPosition.x +
                request.initialVelocity.x * dt +
                0.5 * request.acceleration.x * dt * dt,
              y:
                request.initialPosition.y +
                request.initialVelocity.y * dt +
                0.5 * request.acceleration.y * dt * dt,
              z:
                request.initialPosition.z +
                request.initialVelocity.z * dt +
                0.5 * request.acceleration.z * dt * dt,
            },
            velocity: {
              x: request.initialVelocity.x + request.acceleration.x * dt,
              y: request.initialVelocity.y + request.acceleration.y * dt,
              z: request.initialVelocity.z + request.acceleration.z * dt,
            },
            errorBound: 0,
            stateFlags: request.stateFlags,
          },
        ],
        status: { code: "ok", severity: "ok", message: "fake solver integrated" },
      };
    },
  };
  const simulator = createT3UniverseSimulator({
    config: {
      topology: { sideLength: 10 },
      initialConditions: {
        particles: [{ id: "solver-runner", position: [9.8, 1, 1], velocity: [0.5, 0, 0] }],
      },
      interactions: { interactionRadius: 1 },
      solver: { engine: "solver", timestep: 1, centralSolverConcurrency: 1 },
    },
    solverClient,
  });

  const result = await simulator.step();

  assert.equal(result.engine, "solver");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].pathKey, 1);
  assert.deepEqual(calls[0].initialPosition, { x: 9.8, y: 1, z: 1 });
  assert.deepEqual(calls[0].initialVelocity, { x: 0.5, y: 0, z: 0 });
  assert.ok(Math.abs(simulator.state.positions[0] - 0.3) < 1e-12);
  assert.equal(simulator.state.imageOffsets[0], 1);
});

test("soft pair interaction preserves total momentum under deterministic fixed stepping", async () => {
  const simulator = createT3UniverseSimulator({
    config: {
      topology: { sideLength: 10 },
      initialConditions: {
        particles: [
          { id: "a", position: [4.8, 5, 5], velocity: [0, 0, 0] },
          { id: "b", position: [5.2, 5, 5], velocity: [0, 0, 0] },
        ],
      },
      interactions: { interactionRadius: 1 },
      solver: { engine: "reference", mode: "fixed", timestep: 0.01 },
    },
    interactions: [createSoftSphereRepulsionInteraction({ radius: 1, strength: 2 })],
  });

  await simulator.run({ steps: 10, collectFrames: false });
  const momentum = simulator.statistics().momentum;

  assert.ok(Math.abs(momentum.x) < 1e-12);
  assert.ok(Math.abs(momentum.y) < 1e-12);
  assert.ok(Math.abs(momentum.z) < 1e-12);
});

test("checkpoint restart reproduces uninterrupted fixed-step reference run", async () => {
  const config = {
    topology: { sideLength: 10 },
    initialConditions: {
      particles: [
        { id: "a", position: [1, 1, 1], velocity: [0.1, 0.2, 0.3] },
        { id: "b", position: [9.5, 9.5, 9.5], velocity: [-0.2, -0.1, 0.05] },
      ],
    },
    interactions: { interactionRadius: 2 },
    solver: { engine: "reference", mode: "fixed", timestep: 0.05 },
  };
  const interactions = [createSoftSphereRepulsionInteraction({ radius: 2, strength: 0.5 })];
  const uninterrupted = createT3UniverseSimulator({ config, interactions });
  const restarted = createT3UniverseSimulator({ config, interactions });

  await uninterrupted.run({ steps: 10, collectFrames: false });
  await restarted.run({ steps: 5, collectFrames: false });
  const checkpoint = restarted.checkpoint({ test: "restart" });
  const restored = restoreT3UniverseSimulatorFromCheckpoint(checkpoint, { interactions });
  await restored.run({ steps: 5, collectFrames: false });

  assert.deepEqual(Array.from(restored.state.imageOffsets), Array.from(uninterrupted.state.imageOffsets));
  assertVectorsClose(restored.state.positions, uninterrupted.state.positions, 1e-12);
  assertVectorsClose(restored.state.velocities, uninterrupted.state.velocities, 1e-12);
});

function assertVectorsClose(actual, expected, tolerance) {
  assert.equal(actual.length, expected.length);
  for (let index = 0; index < actual.length; index += 1) {
    assert.ok(
      Math.abs(actual[index] - expected[index]) <= tolerance,
      `index ${index}: expected ${expected[index]}, got ${actual[index]}`
    );
  }
}
