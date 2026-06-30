import assert from "node:assert/strict";
import test from "node:test";

import {
  createInitialT3State,
  computeReceiverNormalFactor,
  createSoftSphereRepulsionInteraction,
  createInteractionPipeline,
  createT3SpatialIndex,
  createT3Topology,
  createT3OrientedBoundaryPrototype,
  T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA,
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

test("central solver engine advances particles through bulk T3 solver client", async () => {
  const calls = [];
  const solverClient = {
    async stepT3UniverseF64(request) {
      calls.push(request);
      const dt = request.timestep;
      const particle = request.particles[0];
      return {
        schema: "solver-t3-step-response.v1",
        rows: [
          {
            pathKey: particle.pathKey,
            position: { x: 0.3, y: particle.position.y, z: particle.position.z },
            velocity: {
              x: particle.velocity.x,
              y: particle.velocity.y,
              z: particle.velocity.z,
            },
            acceleration: { x: 0, y: 0, z: 0 },
            imageDelta: { x: 1, y: 0, z: 0 },
            stateFlags: particle.stateFlags,
          },
        ],
        summary: {
          startTime: request.startTime,
          endTime: request.startTime + dt,
          timestep: dt,
          particleCount: request.particles.length,
          neighborPairCount: 0,
          occupiedCellCount: 1,
        },
        executionPath: "native_c_abi",
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
  assert.equal(result.mode, "central-solver-bulk-t3");
  assert.equal(result.executionPath, "native_c_abi");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].schema, "solver-t3-step-request.v1");
  assert.equal(calls[0].particles.length, 1);
  assert.deepEqual(calls[0].particles[0].position, { x: 9.8, y: 1, z: 1 });
  assert.deepEqual(calls[0].particles[0].velocity, { x: 0.5, y: 0, z: 0 });
  assert.equal(calls[0].interaction.law, "none");
  assert.ok(Math.abs(simulator.state.positions[0] - 0.3) < 1e-12);
  assert.equal(simulator.state.imageOffsets[0], 1);
});

test("solver run summary uses native bulk T3 route without per-particle fallback", async () => {
  const bulkCalls = [];
  let fallbackCallCount = 0;
  const solverClient = {
    async stepT3UniverseF64(request) {
      bulkCalls.push(request);
      const dt = request.timestep;
      const sideLength = request.topology.sideLength;
      const rows = request.particles.map((particle) => {
        const nextX = particle.position.x + particle.velocity.x * dt;
        const wrappedX = wrapScalarForTest(nextX, sideLength);
        return {
          pathKey: particle.pathKey,
          position: { x: wrappedX.value, y: particle.position.y, z: particle.position.z },
          velocity: {
            x: particle.velocity.x,
            y: particle.velocity.y,
            z: particle.velocity.z,
          },
          acceleration: { x: 0, y: 0, z: 0 },
          imageDelta: { x: wrappedX.imageDelta, y: 0, z: 0 },
          stateFlags: particle.stateFlags,
        };
      });
      return {
        schema: "solver-t3-step-response.v1",
        rows,
        summary: {
          startTime: request.startTime,
          endTime: request.startTime + dt,
          timestep: dt,
          particleCount: request.particles.length,
          neighborPairCount: 0,
          cellCount: 8,
          occupiedCellCount: 1,
          maxAcceleration: 0,
          interactionEnergy: 0,
          interactionLaw: request.interaction.law,
        },
        executionPath: "native_c_abi",
        status: { code: "ok", severity: "ok", message: "fake native bulk solver integrated" },
      };
    },
    async integrateConstantAccelerationMotionF64() {
      fallbackCallCount += 1;
      throw new Error("per-particle fallback must not be called for solver T3 runs");
    },
  };
  const simulator = createT3UniverseSimulator({
    config: {
      topology: { sideLength: 1 },
      initialConditions: {
        particles: [{ id: "solver-runner", position: [0.75, 0.2, 0.2], velocity: [0.5, 0, 0] }],
      },
      interactions: { interactionRadius: 0.5, spatialIndexCellSize: 0.5 },
      solver: { engine: "solver", timestep: 1, centralSolverConcurrency: 1 },
    },
    solverClient,
  });

  const result = await simulator.run({ steps: 3, collectFrames: false });

  assert.equal(bulkCalls.length, 3);
  assert.equal(fallbackCallCount, 0);
  assert.equal(result.runSummary.schema, "t3-run-summary.v1");
  assert.equal(result.runSummary.stepCount, 3);
  assert.equal(result.runSummary.particleCount, 1);
  assert.equal(result.runSummary.nativeBulkStepCount, 3);
  assert.equal(result.runSummary.perParticleFallbackStepCount, 0);
  assert.equal(result.runSummary.usedPerParticleFallback, false);
  assert.equal(result.runSummary.executionPath, "native_c_abi");
  assert.deepEqual(result.runSummary.executionPathCounts, { native_c_abi: 3 });
  assert.equal(result.runSummary.interactionPreset, "none");
  assert.deepEqual(result.runSummary.neighborPairCounts.perStep, [0, 0, 0]);
  assert.deepEqual(result.runSummary.occupiedCellCounts.perStep, [1, 1, 1]);
  assert.deepEqual(result.runSummary.cellCounts.perStep, [8, 8, 8]);
  assert.equal(result.runSummary.periodicWrapEvidence.hasPeriodicWrap, true);
  assert.equal(result.runSummary.periodicWrapEvidence.stepCountWithPeriodicWrap, 2);
  assert.equal(result.runSummary.periodicWrapEvidence.wrappedParticleStepCount, 2);
  assert.deepEqual(result.runSummary.periodicWrapEvidence.imageDeltaTotals, { x: 2, y: 0, z: 0 });
  assert.deepEqual(result.runSummary.periodicWrapEvidence.absoluteImageDeltaTotals, { x: 2, y: 0, z: 0 });
  assert.equal(
    result.runSummary.retainedCausalRootReplaySource.schema,
    "t3-retained-causal-root-replay.v1"
  );
  assert.equal(
    result.runSummary.retainedCausalRootReplaySource.summary.status,
    "candidate_rows_missing_required_same_record_fields"
  );
  assert.equal(result.runSummary.retainedCausalRootReplaySource.summary.candidateRowCount, 2);
  assert.equal(result.runSummary.retainedCausalRootReplaySource.summary.acceptedReplayRowCount, 0);
  assert.equal(result.runSummary.retainedCausalRootReplaySource.summary.replayAuthorization, false);
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows.map((row) => [
      row.chronologyRowId,
      row.retainedSourceRecordId,
      row.rowFamilyIdentity,
      row.boundaryOrientation,
      row.windingLabel,
      row.replayAuthorization,
    ]),
    [
      [
        "step_0_seam_x",
        "t3-step-0:pathKey-1",
        "seam",
        "positive_boundary_orientation_candidate",
        "x:+1",
        false,
      ],
      [
        "step_2_seam_x",
        "t3-step-2:pathKey-1",
        "seam",
        "positive_boundary_orientation_candidate",
        "x:+1",
        false,
      ],
    ]
  );
  assert.equal(
    result.runSummary.retainedCausalRootReplaySource.rows[0].missingFields.includes(
      "retainedCausalRootRowId"
    ),
    true
  );
  assert.equal(
    result.runSummary.retainedCausalRootReplaySource.rows[0].missingFields.includes(
      "endpointRoute"
    ),
    false
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].endpointRoute,
    {
      schema: "t3-endpoint-route.v1",
      routeStatus: "declared_from_same_solver_step_record",
      sourceObjectSchema: "solver-t3-step-request+response.v1",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      startTime: 0,
      endTime: 1,
      timestep: 1,
      initialPosition: { x: 0.75, y: 0.2, z: 0.2 },
      finalPosition: { x: 0.25, y: 0.2, z: 0.2 },
      imageDelta: { x: 1, y: 0, z: 0 },
    }
  );
  assert.equal(result.runSummary.eventSummary.totalEventCount, 0);
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.schema,
    T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA
  );
  assert.equal(result.runSummary.orientedBoundaryPrototype.result.masterEomDependency, false);
  assert.equal(result.runSummary.orientedBoundaryPrototype.result.provesBranchAdmissibility, false);
  assert.equal(result.runSummary.orientedBoundaryPrototype.result.retainedBranch, false);
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.result.firstFailureStatus,
    "retained_boundary_target_unresolved:seam_x"
  );
  assert.deepEqual(result.runSummary.orientedBoundaryPrototype.seamOwnershipRows[0], {
    axis: "x",
    signedImageDelta: 2,
    absoluteImageDelta: 2,
    orientedBoundaryCoefficient: 2,
    orientation: "positive_winding_orientation",
    status: "same_record_seam_owner_required",
    boundaryStratum: "winding/seam",
  });
  assert.deepEqual(
    result.runSummary.orientedBoundaryPrototype.neighborPairBoundaryRows.map((row) => row.status),
    ["neighbor_population_unchanged", "neighbor_population_unchanged"]
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.eventBoundaryRows[0].status,
    "absent"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.retainedBoundaryTarget.summary.matrixStatus,
    "fail_closed_priority_only"
  );
  assert.deepEqual(
    result.runSummary.orientedBoundaryPrototype.retainedBoundaryTarget.rows.map((row) => row.rowId),
    [
      "seam_x",
      "seam_y",
      "seam_z",
      "neighbor_0_1",
      "neighbor_1_2",
      "event_boundary_like_event_aggregate",
      "unresolved_root_rows",
    ]
  );
  assert.deepEqual(
    result.runSummary.orientedBoundaryPrototype.negativeControlMatrix.controls.map((row) => row.controlId),
    [
      "signed_image_delta_without_winding_owner",
      "run_summary_without_retained_causal_root_rows",
    ]
  );
  assert.equal(result.runSummary.eventSummary.perStep.length, 3);
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.retainedBoundaryChronology.schema,
    "t3-retained-boundary-chronology.v1"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.retainedBoundaryChronology.summary.status,
    "fail_closed_priority_only"
  );
  assert.equal(result.runSummary.orientedBoundaryPrototype.retainedBoundaryChronology.summary.rowCount, 17);
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.retainedBoundaryChronology.summary.firstFailureStatus,
    "signed_image_delta_without_winding_owner"
  );
  assert.deepEqual(
    result.runSummary.orientedBoundaryPrototype.retainedBoundaryChronology.rows
      .filter((row) => row.stepIndex === 0 && row.closureStatus !== "absent")
      .map((row) => [row.rowId, row.rowKind, row.firstBlocker]),
    [
      ["step_0_seam_x", "retained-boundary-target", "signed_image_delta_without_winding_owner"],
      ["step_0_unresolved_root_rows", "retained-boundary-target", "run_summary_without_retained_causal_root_rows"],
    ]
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.schema,
    "t3-same-record-replay-boundary.v1"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.replayStatus,
    "fail_closed_missing_same_record_replay"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.acceptedReplayRowCount,
    0
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.firstProducerObjectRequired,
    "t3-retained-causal-root-replay.v1"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.producerRowSourceStatus,
    "candidate_source_rows_missing_required_same_record_fields"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.producerRowSourceBoundary.observedSourceObject.sourceStatus,
    "candidate_rows_missing_required_same_record_fields"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.producerRowSourceBoundary.summary.retainedProducerRowSourcePresent,
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.producerRowSourceBoundary.summary.retainedProducerRowCount,
    2
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.producerRowSourceBoundary.expectedSourceObject.schema,
    "t3-retained-causal-root-replay.v1"
  );
  assert.equal(
    [
      "retainedSourceRecordId",
      "retainedCausalRootRowId",
      "boundaryOrientation",
      "windingLabel",
      "endpointRoute",
      "memoryWindowRoute",
      "collisionCoreRoute",
      "omittedRowRoute",
    ].every((field) =>
      result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.producerRowSourceBoundary.expectedSourceObject.requiredFields.includes(
        field
      )
    ),
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].chronologyRowId,
    "step_0_seam_x"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].producerCandidateRowCount,
    1
  );
  assert.deepEqual(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].producerCandidateRowIds,
    ["t3-step-0:pathKey-1:seam-x"]
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].availableProducerFields.includes(
      "retainedSourceRecordId"
    ),
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].availableProducerFields.includes(
      "windingLabel"
    ),
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].availableProducerFields.includes(
      "endpointRoute"
    ),
    true
  );
  assert.equal(
    [
      "retainedCausalRootRowId",
      "memoryWindowRoute",
    ].every((field) =>
      result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
        field
      )
    ),
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
      "windingLabel"
    ),
    false
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
      "endpointRoute"
    ),
    false
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.negativeControls.some(
      (row) =>
        row.controlId ===
        "cross_step_or_aggregate_only_replay_without_chronology_row_identity"
    ),
    true
  );
  assert.equal(simulator.solver.solverCallCount, 3);
  assert.equal(simulator.state.imageOffsets[0], 2);
});

test("oriented boundary prototype consumes T3 run-summary evidence without branch retention", () => {
  const prototype = createT3OrientedBoundaryPrototype({
    schema: "t3-run-summary.v1",
    stepCount: 4,
    particleCount: 2,
    solverEngine: "solver",
    interactionPreset: "soft_sphere_repel_v1",
    executionPath: "native_c_abi",
    neighborPairCounts: { perStep: [0, 2, 1, 1] },
    periodicWrapEvidence: {
      imageDeltaTotals: { x: 0, y: -1, z: 0 },
      absoluteImageDeltaTotals: { x: 2, y: 1, z: 0 },
      perStep: [
        {
          imageDeltaTotals: { x: 1, y: -1, z: 0 },
          absoluteImageDeltaTotals: { x: 1, y: 1, z: 0 },
        },
        {
          imageDeltaTotals: { x: -1, y: 0, z: 0 },
          absoluteImageDeltaTotals: { x: 1, y: 0, z: 0 },
        },
        {
          imageDeltaTotals: { x: 0, y: 0, z: 0 },
          absoluteImageDeltaTotals: { x: 0, y: 0, z: 0 },
        },
        null,
      ],
    },
    eventSummary: {
      totalEventCount: 3,
      boundaryLikeEventCount: 2,
      eventTypeCounts: {
        "periodic-seam-boundary": 2,
        collision: 1,
      },
      perStep: [
        { eventCount: 0, boundaryLikeEventCount: 0, eventTypeCounts: {} },
        {
          eventCount: 2,
          boundaryLikeEventCount: 2,
          eventTypeCounts: { "periodic-seam-boundary": 2 },
        },
        { eventCount: 1, boundaryLikeEventCount: 0, eventTypeCounts: { collision: 1 } },
        { eventCount: 0, boundaryLikeEventCount: 0, eventTypeCounts: {} },
      ],
    },
  });

  assert.equal(prototype.schema, T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA);
  assert.equal(prototype.result.masterEomDependency, false);
  assert.equal(prototype.result.retainedBranch, false);
  assert.equal(prototype.result.provesBranchAdmissibility, false);
  assert.equal(prototype.result.firstFailureStatus, "retained_boundary_target_unresolved:seam_x");
  assert.equal(
    prototype.result.firstRequiredEvidence,
    "same-record pairing map proving the cancelling image deltas are the same retained seam transfer"
  );
  assert.deepEqual(
    prototype.seamOwnershipRows.map((row) => [row.axis, row.status, row.orientedBoundaryCoefficient]),
    [
      ["x", "paired_seam_transfer_candidate", 0],
      ["y", "same_record_seam_owner_required", -1],
      ["z", "absent", 0],
    ]
  );
  assert.deepEqual(
    prototype.neighborPairBoundaryRows.map((row) => row.orientation),
    ["pair_contact_birth_candidate", "pair_contact_death_candidate", "none"]
  );
  assert.equal(prototype.eventBoundaryRows[0].count, 2);
  assert.equal(prototype.eventBoundaryRows[1].status, "event_count_only");
  assert.equal(prototype.eventBoundaryRows[2].status, "boundary_like_event_type");
  assert.equal(
    prototype.remainingUnproven.includes(
      "retained winding-labeled causal-root rows are not constructed from the run envelope"
    ),
    true
  );
  assert.equal(prototype.retainedBoundaryTarget.summary.matrixStatus, "fail_closed_priority_only");
  assert.equal(prototype.retainedBoundaryTarget.summary.unresolvedRowCount, 8);
  assert.deepEqual(prototype.retainedBoundaryTarget.coefficientBalance, {
    signedCoefficientTotal: 0,
    absoluteCoefficientTotal: 4,
    evidenceMagnitudeTotal: 11,
    unsignedOrUnorientedRowCount: 4,
  });
  assert.equal(
    prototype.retainedBoundaryTarget.summary.signedBalanceStatus,
    "signed_balance_is_not_boundary_closure"
  );
  assert.deepEqual(
    prototype.retainedBoundaryTarget.rows
      .filter((row) => row.closureStatus !== "absent")
      .map((row) => [row.rowId, row.negativeControl]),
    [
      ["seam_x", "cancelled_image_delta_without_same_record_pairing"],
      ["seam_y", "signed_image_delta_without_winding_owner"],
      ["neighbor_0_1", "neighbor_pair_delta_without_retained_causal_root_rows"],
      ["neighbor_1_2", "neighbor_pair_delta_without_retained_causal_root_rows"],
      ["event_boundary_like_event_aggregate", "boundary_like_detector_event_without_retained_event_row"],
      ["event_collision", "generic_event_count_without_boundary_stratum"],
      ["event_periodic_seam_boundary", "boundary_like_detector_event_without_retained_event_row"],
      ["unresolved_root_rows", "run_summary_without_retained_causal_root_rows"],
    ]
  );
  assert.equal(prototype.negativeControlMatrix.summary.promotionBlocked, true);
  assert.equal(prototype.negativeControlMatrix.summary.retainedBranch, false);
  assert.equal(prototype.negativeControlMatrix.summary.provesBranchAdmissibility, false);
  assert.equal(
    prototype.negativeControlMatrix.controls.some(
      (row) => row.controlId === "zero_signed_boundary_sum_without_same_record_routing"
    ),
    true
  );
  assert.equal(prototype.retainedBoundaryChronology.summary.status, "fail_closed_priority_only");
  assert.equal(prototype.retainedBoundaryChronology.summary.stepCount, 4);
  assert.equal(
    prototype.retainedBoundaryChronology.rows.some(
      (row) =>
        row.stepIndex === 0 &&
        row.negativeControlRow === true &&
        row.firstBlocker === "zero_signed_boundary_sum_without_same_record_routing"
    ),
    true
  );
  assert.deepEqual(
    prototype.retainedBoundaryChronology.rows
      .filter((row) => row.stepIndex === 1 && row.closureStatus !== "absent")
      .map((row) => [row.rowFamily, row.rowKind, row.firstBlocker]),
    [
      ["seam", "retained-boundary-target", "signed_image_delta_without_winding_owner"],
      ["neighbor", "neighbor-row", "neighbor_pair_delta_without_retained_causal_root_rows"],
      ["detector-event", "detector-row", "boundary_like_detector_event_without_retained_event_row"],
      ["detector-event", "detector-row", "boundary_like_detector_event_without_retained_event_row"],
      ["unresolved-root", "retained-boundary-target", "run_summary_without_retained_causal_root_rows"],
    ]
  );
  assert.equal(prototype.result.sameRecordReplayStatus, "fail_closed_missing_same_record_replay");
  assert.equal(
    prototype.result.firstProducerObjectRequired,
    "t3-retained-causal-root-replay.v1"
  );
  assert.equal(prototype.sameRecordReplayBoundary.summary.acceptedReplayRowCount, 0);
  assert.equal(
    prototype.sameRecordReplayBoundary.summary.producerRowSourceStatus,
    "missing_retained_causal_root_replay_source"
  );
  assert.equal(
    prototype.sameRecordReplayBoundary.producerRowSourceBoundary.summary.retainedProducerRowSourcePresent,
    false
  );
  assert.equal(
    prototype.sameRecordReplayBoundary.producerRowSourceBoundary.observedSourceObject.aggregateOrStepOnlyChannels.includes(
      "periodicWrapEvidence.perStep"
    ),
    true
  );
  assert.equal(
    prototype.sameRecordReplayBoundary.producerRowSourceBoundary.blockedReplayAuthorization.negativeControlIds.includes(
      "cross_step_or_aggregate_only_replay_without_chronology_row_identity"
    ),
    true
  );
  assert.equal(
    prototype.sameRecordReplayBoundary.rows.some(
      (row) =>
        row.chronologyRowId === "step_0_zero_signed_boundary_sum" &&
        row.boundaryOrientation === "zero_or_cancelled_summary_balance_not_replay_orientation" &&
        row.missingFields.includes("sameRecordCancellationPairingMap")
    ),
    true
  );
  assert.equal(
    prototype.sameRecordReplayBoundary.negativeControls.some(
      (row) =>
        row.controlId ===
        "cross_step_or_aggregate_only_replay_without_chronology_row_identity"
    ),
    true
  );
  assert.equal(
    prototype.sameRecordReplayBoundary.negativeControls.some(
      (row) =>
        row.controlId === "zero_signed_balance_replay_without_same_record_pairing_map" &&
        row.chronologyRowId === "step_0_zero_signed_boundary_sum"
    ),
    true
  );
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

function wrapScalarForTest(value, sideLength) {
  let imageDelta = Math.floor(value / sideLength);
  let wrapped = value - imageDelta * sideLength;
  if (wrapped >= sideLength) {
    wrapped = 0;
  } else if (wrapped < 0) {
    wrapped += sideLength;
    imageDelta -= 1;
  }
  return { value: wrapped, imageDelta };
}
