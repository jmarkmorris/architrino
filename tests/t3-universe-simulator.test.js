import assert from "node:assert/strict";
import test from "node:test";

import {
  createInitialT3State,
  computeReceiverNormalFactor,
  createSoftSphereRepulsionInteraction,
  createInteractionPipeline,
  createT3SpatialIndex,
  createT3Topology,
  createT3BulkStepRequest,
  createT3OrientedBoundaryPrototype,
  T3_ORIENTED_BOUNDARY_PROTOTYPE_SCHEMA,
  createT3UniverseSimulator,
  restoreT3UniverseSimulatorFromCheckpoint,
} from "../src/t3/index.mjs";

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

test("bulk-step client engine advances particles through bulk T3 solver client", async () => {
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
      solver: { engine: "solver", timestep: 1, bulkStepConcurrency: 1 },
    },
    solverClient,
  });

  const result = await simulator.step();

  assert.equal(result.engine, "solver");
  assert.equal(result.mode, "bulk-step-t3");
  assert.equal(result.executionPath, "native_c_abi");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].schema, "solver-t3-step-request.v1");
  assert.equal(calls[0].particles.length, 1);
  assert.deepEqual(calls[0].particles[0].position, { x: 9.8, y: 1, z: 1 });
  assert.deepEqual(calls[0].particles[0].velocity, { x: 0.5, y: 0, z: 0 });
  assert.equal(calls[0].particles[0].integrationWeight, 1);
  assert.equal("mass" in calls[0].particles[0], false);
  assert.equal(calls[0].interaction.law, "none");
  assert.ok(Math.abs(simulator.state.positions[0] - 0.3) < 1e-12);
  assert.equal(simulator.state.imageOffsets[0], 1);
});

test("bulk-step client carries unresolved-root segment sidecar as fail-closed shape evidence", async () => {
  const directTopology = createT3Topology({ sideLength: 4 });
  const directRequest = createT3BulkStepRequest({
    state: createInitialT3State({
      topology: { sideLength: 4 },
      particles: {
        items: [
          { id: "source", position: [0, 0, 0], velocity: [0.1, 0, 0] },
          { id: "receiver", position: [0.4, 0, 0], velocity: [0, 0.1, 0] },
        ],
      },
    }),
    startTime: 0,
    timestep: 0.25,
    topology: directTopology,
    spatialIndex: createT3SpatialIndex({ topology: directTopology, interactionRadius: 1, cellSize: 1 }),
    interactionPipeline: createInteractionPipeline([]),
    stepIndex: 7,
    signalSpeed: 3,
    rootTolerance: 1e-7,
    unresolvedRootSegmentSidecar: {
      enabled: true,
      pairPolicy: "neighbor_pruned_v1",
    },
  });
  assert.equal(directRequest.stepIndex, 7);
  assert.equal(directRequest.signalSpeed, 3);
  assert.equal(directRequest.rootTolerance, 1e-7);
  assert.deepEqual(directRequest.unresolvedRootSegmentSidecar, {
    schema: "t3-unresolved-root-segment-sidecar-request.v1",
    enabled: true,
    pairPolicy: "neighbor_pruned_v1",
    maxRows: 1,
  });

  const calls = [];
  const solverClient = {
    async stepT3UniverseF64(request) {
      calls.push(request);
      return {
        schema: "solver-t3-step-response.v1",
        rows: request.particles.map((particle) => ({
          pathKey: particle.pathKey,
          position: particle.position,
          velocity: particle.velocity,
          acceleration: { x: 0, y: 0, z: 0 },
          imageDelta: { x: 0, y: 0, z: 0 },
          stateFlags: particle.stateFlags,
        })),
        unresolvedRootSegmentRows: [
          {
            schema: "t3-unresolved-root-segment-row.v1",
            chronologyRowId: "step_0_unresolved_root_rows",
            stepIndex: request.stepIndex,
            sourcePathKey: request.particles[0].pathKey,
            receiverPathKey: request.particles[1].pathKey,
            sourceSegmentIndex: request.stepIndex,
            receiverSegmentIndex: request.stepIndex,
            sourceSegment: {
              pathKey: request.particles[0].pathKey,
              segmentIndex: request.stepIndex,
              startTime: request.startTime,
              endTime: request.endTime,
              position: request.particles[0].position,
              velocity: request.particles[0].velocity,
              errorBound: request.integrationTolerance,
            },
            receiverSegment: {
              pathKey: request.particles[1].pathKey,
              segmentIndex: request.stepIndex,
              startTime: request.startTime,
              endTime: request.endTime,
              position: request.particles[1].position,
              velocity: request.particles[1].velocity,
              errorBound: request.integrationTolerance,
            },
            sameRecordSegmentBinding: {
              sourcePathKey: request.particles[0].pathKey,
              receiverPathKey: request.particles[1].pathKey,
              sourceSegmentIndex: request.stepIndex,
              receiverSegmentIndex: request.stepIndex,
              bindingStatus: "same_step_segment_shape_evidence",
            },
            sourceIdentityBinding: {
              pathKey: request.particles[0].pathKey,
              stateFlags: request.particles[0].stateFlags,
              bindingStatus: "path_key_state_flags_same_step",
            },
            receiverIdentityBinding: {
              pathKey: request.particles[1].pathKey,
              stateFlags: request.particles[1].stateFlags,
              bindingStatus: "path_key_state_flags_same_step",
            },
            hitTime: request.endTime,
            signalSpeed: request.signalSpeed,
            rootTolerance: request.rootTolerance,
            rootLedgerRecordId: null,
            causticRoute: null,
            sourcePathSegmentId: null,
            pairPolicy: "neighbor_pruned_v1",
            rowStatus: "candidate_shape_evidence",
            replayAuthorization: false,
            acceptedReplayEvidence: false,
            retainedBranch: false,
            provesBranchAdmissibility: false,
          },
        ],
        retainedCausalRootReplayRows: [
          {
            schema: "t3-retained-causal-root-replay-native-row.v1",
            chronologyRowId: "step_0_unresolved_root_rows",
            sourceObjectRowSchema: "t3-unresolved-root-segment-row.v1",
            sourceObjectRowStatus: "candidate_shape_evidence",
            stepIndex: request.stepIndex,
            sourcePathKey: request.particles[0].pathKey,
            receiverPathKey: request.particles[1].pathKey,
            sourceSegmentIndex: request.stepIndex,
            receiverSegmentIndex: request.stepIndex,
            sameRecordReplayId: 1001,
            retainedSourceRecordId: 1002,
            retainedCausalRootRowId: 1003,
            rootLedgerRecordId: 1003,
            causticRoute: null,
            causticRouteKind: "missing",
            causticRouteSourceLane: {
              schema: "t3-caustic-route-source-lane.v1",
              nativeRow: "T3RetainedCausalRootReplayRowF64",
              nativeField: "causticRouteKind",
              cAbiField: "caustic_route_kind",
              bridgeField: "causticRouteKind",
              causticRouteKind: "missing",
              causticRouteStatus: "missing",
              routePayloadPresent: false,
              acceptedRouteEvidence: false,
            },
            sourcePathSegmentId: 1004,
            receiverPathSegmentId: 1005,
            windingLabel: { x: 0, y: 0, z: 0 },
            windingLabelStatus: "local_pre_wrap_candidate",
            sameRecordRetainedBinding: {
              sameRecordReplayId: 1001,
              retainedSourceRecordId: 1002,
              retainedCausalRootRowId: 1003,
              rootLedgerRecordId: 1003,
              sourcePathSegmentId: 1004,
              receiverPathSegmentId: 1005,
              windingLabel: { x: 0, y: 0, z: 0 },
              windingLabelStatus: "local_pre_wrap_candidate",
              bindingStatus: "candidate_same_record_binding",
              valueAuthority: "candidate-native-same-record-binding",
            },
            retainedSourceBindingStatus: "candidate_same_record_binding",
            sameRecordReplayStatus: "candidate_same_record_binding",
            causticRouteStatus: "missing",
            proofObjectProvenanceStatus: "candidate_sidecar_shape_evidence",
            proofObjectProvenance: {
              nativeProducer: "removed-native/T3BulkStep.cpp::step_t3_universe",
              nativeRow: "T3RetainedCausalRootReplayRowF64",
              sourceNativeRow: "T3UnresolvedRootSegmentRowF64",
              bridgeReader:
                "removed-native/bridge::readT3RetainedCausalRootReplayRowF64",
              provenanceStatus: "candidate_sidecar_shape_evidence",
            },
            rowStatus: "candidate_same_record_binding",
            replayAuthorization: false,
            acceptedReplayEvidence: false,
            retainedBranch: false,
            provesBranchAdmissibility: false,
          },
        ],
        unresolvedRootSegmentSidecar: {
          schema: "t3-unresolved-root-segment-sidecar.v1",
          enabled: true,
          pairPolicy: "neighbor_pruned_v1",
          rowCount: 1,
          rowStatus: "candidate_shape_evidence_only",
          replayAuthorization: false,
          retainedBranch: false,
          provesBranchAdmissibility: false,
        },
        summary: {
          startTime: request.startTime,
          endTime: request.endTime,
          timestep: request.timestep,
          particleCount: request.particles.length,
          neighborPairCount: 1,
          occupiedCellCount: 1,
        },
        executionPath: "native_c_abi",
        status: { code: "ok", severity: "ok", message: "fake solver integrated" },
      };
    },
  };
  const simulator = createT3UniverseSimulator({
    config: {
      model: { causalSpeed: 3 },
      topology: { sideLength: 4 },
      initialConditions: {
        particles: [
          { id: "source", position: [0, 0, 0], velocity: [0.1, 0, 0] },
          { id: "receiver", position: [0.4, 0, 0], velocity: [0, 0.1, 0] },
        ],
      },
      interactions: { interactionRadius: 1, spatialIndexCellSize: 1 },
      solver: { engine: "solver", timestep: 0.25, tolerance: 1e-7, bulkStepConcurrency: 1 },
    },
    solverClient,
  });

  const result = await simulator.step();

  assert.equal(calls.length, 1);
  assert.equal(result.engine, "solver");
  assert.equal(calls[0].stepIndex, 0);
  assert.equal(calls[0].signalSpeed, 3);
  assert.equal(calls[0].rootTolerance, 1e-7);
  assert.deepEqual(calls[0].unresolvedRootSegmentSidecar, {
    schema: "t3-unresolved-root-segment-sidecar-request.v1",
    enabled: true,
    pairPolicy: "neighbor_pruned_v1",
    maxRows: 1,
  });
  assert.equal(result.unresolvedRootSegmentRows.length, 1);
  assert.equal(result.retainedCausalRootReplayRows.length, 1);
  assert.equal(result.retainedCausalRootReplayRows[0].rootLedgerRecordId, 1003);
  assert.equal(result.retainedCausalRootReplayRows[0].causticRoute, null);
  assert.equal(result.retainedCausalRootReplayRows[0].causticRouteKind, "missing");
  assert.equal(result.retainedCausalRootReplayRows[0].sourcePathSegmentId, 1004);
  assert.equal(result.retainedCausalRootReplayRows[0].receiverPathSegmentId, 1005);
  assert.equal(result.retainedCausalRootReplayRows[0].replayAuthorization, false);
  assert.equal(result.retainedCausalRootReplayRows[0].acceptedReplayEvidence, false);
  assert.equal(result.unresolvedRootSegmentSidecar.replayAuthorization, false);
  assert.equal(result.unresolvedRootSegmentSidecar.retainedBranch, false);
  assert.equal(result.unresolvedRootSegmentSidecar.provesBranchAdmissibility, false);

  const replaySource = result.periodicWrapEvidence.retainedCausalRootReplaySource;
  const sidecarReplayRow = replaySource.rows.find(
    (row) => row.sourceObjectRowSchema === "t3-unresolved-root-segment-row.v1"
  );
  assert.equal(sidecarReplayRow.chronologyRowId, "step_0_unresolved_root_rows");
  assert.equal(sidecarReplayRow.acceptedReplayEvidence, false);
  assert.equal(sidecarReplayRow.replayAuthorization, false);
  assert.equal(sidecarReplayRow.rootLedgerRecordId, 1003);
  assert.equal(sidecarReplayRow.causticRoute, null);
  assert.equal(sidecarReplayRow.causticRouteKind, "missing");
  assert.equal(sidecarReplayRow.causticRouteSourceLane.routePayloadPresent, false);
  assert.equal(sidecarReplayRow.causticRouteSourceLane.acceptedRouteEvidence, false);
  assert.equal(sidecarReplayRow.sourcePathSegmentId, 1004);
  assert.equal(sidecarReplayRow.receiverPathSegmentId, 1005);
  assert.deepEqual(sidecarReplayRow.windingLabel, { x: 0, y: 0, z: 0 });
  assert.equal(sidecarReplayRow.windingLabelStatus, "local_pre_wrap_candidate");
  assert.equal(
    sidecarReplayRow.nativeReplayRowSchema,
    "t3-retained-causal-root-replay-native-row.v1"
  );
  assert.equal(sidecarReplayRow.nativeReplayRowStatus, "candidate_same_record_binding");
  assert.equal(sidecarReplayRow.retainedSourceBindingStatus, "candidate_same_record_binding");
  assert.equal(sidecarReplayRow.sameRecordReplayStatus, "candidate_same_record_binding");
  assert.equal(sidecarReplayRow.causticRouteStatus, "missing");
  assert.equal(
    sidecarReplayRow.proofObjectProvenance.nativeRow,
    "T3RetainedCausalRootReplayRowF64"
  );
  assert.equal(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.schema,
    "t3-retained-causal-root-replay-producer-contract.v1"
  );
  assert.equal(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.sourceObjectRowSchema,
    "t3-unresolved-root-segment-row.v1"
  );
  assert.equal(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.sourceAcquisitionStatus,
    "blocked_missing_retained_causal_root_replay_source_fields"
  );
  assert.deepEqual(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.requiredReplaySourceFields,
    ["rootLedgerRecordId", "causticRoute", "sourcePathSegmentId", "receiverPathSegmentId"]
  );
  assert.deepEqual(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.missingReplaySourceFields,
    ["causticRoute"]
  );
  assert.deepEqual(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.rejectedSyntheticFields,
    ["causticRoute"]
  );
  assert.deepEqual(sidecarReplayRow.retainedCausalRootReplayProducerContract.sameRecordBinding, {
    bindingStatus: "candidate_same_record_binding",
    chronologyRowId: "step_0_unresolved_root_rows",
    stepIndex: 0,
    sourcePathKey: 1,
    receiverPathKey: 2,
    sourceSegmentIndex: 0,
    receiverSegmentIndex: 0,
    sameRecordReplayId: 1001,
    retainedSourceRecordId: 1002,
    retainedCausalRootRowId: 1003,
      rootLedgerRecordId: 1003,
      sourcePathSegmentId: 1004,
      receiverPathSegmentId: 1005,
      windingLabel: { x: 0, y: 0, z: 0 },
      windingLabelStatus: "local_pre_wrap_candidate",
    });
  assert.deepEqual(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.companionNativeReplayRow,
    {
      rowPresent: true,
      nativeRow: "T3RetainedCausalRootReplayRowF64",
      nativeStruct:
        "removed-native/T3BulkStep.hpp::T3RetainedCausalRootReplayRowF64",
      bridgeReader:
        "removed-native/bridge::readT3RetainedCausalRootReplayRowF64",
      rowSchema: "t3-retained-causal-root-replay-native-row.v1",
      rowStatus: "candidate_same_record_binding",
      retainedSourceBindingStatus: "candidate_same_record_binding",
      sameRecordReplayStatus: "candidate_same_record_binding",
      causticRouteStatus: "missing",
      causticRouteKind: "missing",
      causticRouteSourceLane: {
        schema: "t3-caustic-route-source-lane.v1",
        nativeRow: "T3RetainedCausalRootReplayRowF64",
        nativeField: "causticRouteKind",
        cAbiField: "caustic_route_kind",
        bridgeField: "causticRouteKind",
        causticRouteKind: "missing",
        causticRouteStatus: "missing",
        routePayloadPresent: false,
        acceptedRouteEvidence: false,
      },
      proofObjectProvenanceStatus: "candidate_sidecar_shape_evidence",
      proofObjectProvenance: {
        nativeProducer: "removed-native/T3BulkStep.cpp::step_t3_universe",
        nativeRow: "T3RetainedCausalRootReplayRowF64",
        sourceNativeRow: "T3UnresolvedRootSegmentRowF64",
        bridgeReader:
          "removed-native/bridge::readT3RetainedCausalRootReplayRowF64",
        provenanceStatus: "candidate_sidecar_shape_evidence",
      },
      sameRecordReplayId: 1001,
      retainedSourceRecordId: 1002,
      retainedCausalRootRowId: 1003,
      rootLedgerRecordId: 1003,
      sourcePathSegmentId: 1004,
      receiverPathSegmentId: 1005,
      windingLabel: { x: 0, y: 0, z: 0 },
      windingLabelStatus: "local_pre_wrap_candidate",
      sameRecordRetainedBinding: {
        sameRecordReplayId: 1001,
        retainedSourceRecordId: 1002,
        retainedCausalRootRowId: 1003,
        rootLedgerRecordId: 1003,
        sourcePathSegmentId: 1004,
        receiverPathSegmentId: 1005,
        windingLabel: { x: 0, y: 0, z: 0 },
        windingLabelStatus: "local_pre_wrap_candidate",
        bindingStatus: "candidate_same_record_binding",
        valueAuthority: "candidate-native-same-record-binding",
      },
    }
  );
  assert.equal(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.replayAuthorization,
    false
  );
  assert.equal(
    sidecarReplayRow.retainedCausalRootReplayProducerContract.acceptedReplayEvidence,
    false
  );
  assert.equal(sidecarReplayRow.providedFields.includes("sourceSegment"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("receiverSegment"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("sourceIdentityBinding"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("rootLedgerRecordId"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("sourcePathSegmentId"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("receiverPathSegmentId"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("windingLabel"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("causticRouteKind"), true);
  assert.equal(sidecarReplayRow.providedFields.includes("causticRouteSourceLane"), true);
  assert.deepEqual(
    sidecarReplayRow.missingFields.filter((field) =>
      ["rootLedgerRecordId", "causticRoute", "sourcePathSegmentId", "receiverPathSegmentId", "windingLabel"].includes(field)
    ),
    ["causticRoute"]
  );
  assert.equal(replaySource.acceptedReplayEvidence, false);
  assert.equal(replaySource.replayAuthorization, false);
  assert.equal(replaySource.summary.retainedBranch, false);
  assert.equal(replaySource.summary.provesBranchAdmissibility, false);

  // The removed-native descriptor strings in this file and the engine are
  // historical provenance labels for recorded rows, not live wiring; no
  // native producer exists for them.
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
      solver: { engine: "solver", timestep: 1, bulkStepConcurrency: 1 },
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
    "same_record_replay_fields_complete"
  );
  assert.equal(result.runSummary.retainedCausalRootReplaySource.summary.candidateRowCount, 2);
  assert.equal(result.runSummary.retainedCausalRootReplaySource.summary.acceptedReplayRowCount, 2);
  assert.equal(result.runSummary.retainedCausalRootReplaySource.summary.replayAuthorization, true);
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
        true,
      ],
      [
        "step_2_seam_x",
        "t3-step-2:pathKey-1",
        "seam",
        "positive_boundary_orientation_candidate",
        "x:+1",
        true,
      ],
    ]
  );
  assert.equal(
    result.runSummary.retainedCausalRootReplaySource.rows[0].missingFields.includes(
      "retainedCausalRootRowId"
    ),
    false
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
  assert.match(
    result.runSummary.retainedCausalRootReplaySource.rows[0].retainedCausalRootRowId,
    /^t3-step-0:pathKey-1:seam-x:candidate-root$/
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].memoryWindowRoute,
    {
      schema: "t3-memory-window-route.v1",
      routeStatus: "declared_from_same_solver_step_interval",
      sourceObjectSchema: "solver-t3-step-request+response.v1",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      startTime: 0,
      endTime: 1,
      timestep: 1,
      memoryWindowStart: 0,
      memoryWindowEnd: 1,
    }
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].collisionCoreRoute,
    {
      schema: "t3-collision-core-route.v1",
      routeStatus: "declared_no_collision_core_channel_in_solver_step",
      sourceObjectSchema: "solver-t3-step-request.v1",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      interactionLaw: "none",
    }
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].omittedRowRoute,
    {
      schema: "t3-omitted-row-route.v1",
      routeStatus: "declared_no_omitted_solver_step_rows",
      sourceObjectSchema: "solver-t3-step-request+response.v1",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      requestParticleCount: 1,
      responseRowCount: 1,
      rowIndex: 0,
    }
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].seamOwnerRoute,
    {
      schema: "t3-seam-owner-route.v1",
      routeStatus: "declared_from_same_solver_step_image_delta",
      sourceObjectSchema: "solver-t3-step-response.v1",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      imageDeltaAxis: "x",
      signedImageDeltaWitness: 1,
      windingOwnerRowId: "t3-step-0:pathKey-1:seam-x:winding-owner",
    }
  );
  assert.equal(
    result.runSummary.retainedCausalRootReplaySource.rows[0].seamPairingMapOrWindingOwnerRowId,
    "t3-step-0:pathKey-1:seam-x:winding-owner"
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].jacobianFloorOrDeclaredStratum,
    {
      schema: "t3-jacobian-floor-or-declared-stratum.v1",
      sourceObjectSchema: "solver-t3-step-request+response.v1",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      retainedCausalRootReplayRowId: "t3-step-0:pathKey-1:seam-x",
      imageDeltaAxis: "x",
      signedImageDeltaWitness: 1,
      declaredStratum: "winding/seam",
      stratumStatus: "declared_from_same_solver_step_periodic_wrap",
      jacobianFloor: null,
      sideLength: 1,
    }
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].missingFields,
    []
  );
  assert.deepEqual(
    result.runSummary.retainedCausalRootReplaySource.rows[0].jacobianFloorSourceBoundary,
    {
      schema: "t3-jacobian-floor-source-boundary.v1",
      sourceStatus: "same_record_declared_stratum_available",
      blockerStatus: null,
      expectedSourceObject: "solver-t3-step-response.v1",
      expectedField: "jacobianFloorOrDeclaredStratum",
      sameRecordBinding: "pathKey",
      stepIndex: 0,
      pathKey: 1,
      retainedCausalRootReplayRowId: "t3-step-0:pathKey-1:seam-x",
      declaredStratum: "winding/seam",
      missingLocalFieldOrSourceCondition: null,
      replayAuthorization: true,
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
    "partial_same_record_replay_evidence_available"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.acceptedReplayRowCount,
    2
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.blockedReplayRowCount,
    3
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.firstBlockedReplayBoundaryRowId,
    "same_record_replay_boundary_step_0_unresolved_root_rows"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.firstProducerObjectRequired,
    "t3-retained-causal-root-replay.v1"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.producerRowSourceStatus,
    "accepted_source_rows_available_with_uncovered_chronology_rows"
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.producerRowSourceBoundary.observedSourceObject.sourceStatus,
    "same_record_replay_fields_complete"
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
      "jacobianFloorOrDeclaredStratum",
      "memoryWindowRoute",
      "collisionCoreRoute",
      "omittedRowRoute",
      "seamPairingMapOrWindingOwnerRowId",
    ].every((field) =>
      result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].availableProducerFields.includes(
        field
      )
    ),
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
      "retainedCausalRootRowId"
    ),
    false
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
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
      "memoryWindowRoute"
    ),
    false
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
      "omittedRowRoute"
    ),
    false
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields.includes(
      "seamPairingMapOrWindingOwnerRowId"
    ),
    false
  );
  assert.deepEqual(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].missingFields,
    []
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].acceptedReplayEvidence,
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows[0].replayAuthorization,
    true
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.retainedBranch,
    false
  );
  assert.equal(
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.summary.provesBranchAdmissibility,
    false
  );
  const unresolvedRootReplayRow =
    result.runSummary.orientedBoundaryPrototype.sameRecordReplayBoundary.rows.find(
      (row) => row.chronologyRowId === "step_0_unresolved_root_rows"
    );
  assert.equal(unresolvedRootReplayRow.replayStatus, "blocked_missing_same_record_replay");
  assert.equal(unresolvedRootReplayRow.acceptedReplayEvidence, false);
  assert.equal(unresolvedRootReplayRow.replayAuthorization, false);
  assert.deepEqual(
    unresolvedRootReplayRow.fieldSourceBoundary.missingFamilySpecificFields,
    ["rootLedgerRecordId", "causticRoute", "sourcePathSegmentId", "receiverPathSegmentId"]
  );
  assert.deepEqual(
    unresolvedRootReplayRow.fieldSourceBoundary.missingLocalFieldOrSourceConditions.map(
      (row) => row.field
    ),
    ["rootLedgerRecordId", "causticRoute", "sourcePathSegmentId", "receiverPathSegmentId"]
  );
  assert.deepEqual(
    unresolvedRootReplayRow.fieldSourceBoundary.missingLocalFieldOrSourceConditions.map(
      (row) => row.sourceCondition
    ),
    [
      "solver-t3-step-response.v1 does not expose a retained root-ledger record id for this unresolved-root chronology row",
      "solver-t3-step-response.v1 does not expose a same-record caustic route or declared no-caustic route for this unresolved-root chronology row",
      "solver-t3-step-response.v1 does not expose a source path segment id bound to this unresolved-root chronology row",
      "solver-t3-step-response.v1 does not expose a receiver path segment id bound to this unresolved-root chronology row",
    ]
  );
  assert.deepEqual(unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource, {
    schema: "t3-native-bridge-field-source-boundary.v1",
    sourceObjectSchema: "solver-t3-step-response.v1",
    nativeRow: "T3ParticleStepRowF64",
    nativeStruct: "removed-native/T3BulkStep.hpp::T3ParticleStepRowF64",
    nativeProducer: "removed-native/T3BulkStep.cpp::step_t3_universe",
    bridgeReader: "removed-native/bridge::readT3ParticleStepRowF64",
    availableNativeBridgeFields: [
      "pathKey",
      "position",
      "velocity",
      "acceleration",
      "integrationWeight",
      "imageDelta",
      "stateFlags",
    ],
    missingNativeBridgeFields: ["rootLedgerRecordId", "causticRoute", "sourcePathSegmentId", "receiverPathSegmentId"],
    requiredUpstreamObject:
      "solver-t3-step-response.v1 same-step retained root-ledger fields on T3ParticleStepRowF64 before t3-run-summary.v1 aggregation",
    replayAuthorization: false,
  });
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.missingLocalFieldOrSourceConditions.every(
      (row) =>
        row.requiredSameRecordSource ===
        "t3-retained-causal-root-replay.v1 row with chronologyRowId, rootLedgerRecordId, causticRoute, sourcePathSegmentId, and receiverPathSegmentId before run-summary aggregation"
    ),
    true
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

test("oriented boundary exposes unresolved-root sidecar replay producer contract fail-closed", () => {
  const requiredReplaySourceFields = [
    "rootLedgerRecordId",
    "causticRoute",
    "sourcePathSegmentId",
    "receiverPathSegmentId",
  ];
  const missingReplaySourceFields = ["causticRoute"];
  const sidecarReplayProducerContract = {
    schema: "t3-retained-causal-root-replay-producer-contract.v1",
    contractId: "step_0_unresolved_root_rows:segment:1:2:0:producer-contract",
    targetSchema: "t3-retained-causal-root-replay.v1",
    targetRowSchema: "t3-retained-causal-root-replay-row.v1",
    sourceObjectSchema: "solver-t3-step-response.v1",
    sourceObjectRowSchema: "t3-unresolved-root-segment-row.v1",
    sourceObjectRowStatus: "candidate_shape_evidence",
    nativeRow: "T3UnresolvedRootSegmentRowF64",
    bridgeReader: "removed-native/bridge::readT3UnresolvedRootSegmentRowF64",
    companionNativeReplayRow: {
      rowPresent: true,
      nativeRow: "T3RetainedCausalRootReplayRowF64",
      nativeStruct:
        "removed-native/T3BulkStep.hpp::T3RetainedCausalRootReplayRowF64",
      bridgeReader:
        "removed-native/bridge::readT3RetainedCausalRootReplayRowF64",
      rowSchema: "t3-retained-causal-root-replay-native-row.v1",
      rowStatus: "candidate_same_record_binding",
      retainedSourceBindingStatus: "candidate_same_record_binding",
      sameRecordReplayStatus: "candidate_same_record_binding",
      causticRouteStatus: "missing",
      causticRouteKind: "missing",
      causticRouteSourceLane: {
        schema: "t3-caustic-route-source-lane.v1",
        nativeRow: "T3RetainedCausalRootReplayRowF64",
        nativeField: "causticRouteKind",
        cAbiField: "caustic_route_kind",
        bridgeField: "causticRouteKind",
        causticRouteKind: "missing",
        causticRouteStatus: "missing",
        routePayloadPresent: false,
        acceptedRouteEvidence: false,
      },
      proofObjectProvenanceStatus: "candidate_sidecar_shape_evidence",
      proofObjectProvenance: {
        nativeProducer: "removed-native/T3BulkStep.cpp::step_t3_universe",
        nativeRow: "T3RetainedCausalRootReplayRowF64",
        sourceNativeRow: "T3UnresolvedRootSegmentRowF64",
        bridgeReader:
          "removed-native/bridge::readT3RetainedCausalRootReplayRowF64",
        provenanceStatus: "candidate_sidecar_shape_evidence",
      },
      sameRecordReplayId: 1001,
      retainedSourceRecordId: 1002,
      retainedCausalRootRowId: 1003,
      rootLedgerRecordId: 1003,
      sourcePathSegmentId: 1004,
      receiverPathSegmentId: 1005,
      windingLabel: { x: 0, y: 0, z: 0 },
      windingLabelStatus: "local_pre_wrap_candidate",
      sameRecordRetainedBinding: {
        sameRecordReplayId: 1001,
        retainedSourceRecordId: 1002,
        retainedCausalRootRowId: 1003,
        rootLedgerRecordId: 1003,
        sourcePathSegmentId: 1004,
        receiverPathSegmentId: 1005,
        windingLabel: { x: 0, y: 0, z: 0 },
        windingLabelStatus: "local_pre_wrap_candidate",
        bindingStatus: "candidate_same_record_binding",
        valueAuthority: "candidate-native-same-record-binding",
      },
    },
    sameRecordBinding: {
      bindingStatus: "candidate_same_record_binding",
      chronologyRowId: "step_0_unresolved_root_rows",
      stepIndex: 0,
      sourcePathKey: 1,
      receiverPathKey: 2,
      sourceSegmentIndex: 0,
      receiverSegmentIndex: 0,
      sameRecordReplayId: 1001,
      retainedSourceRecordId: 1002,
      retainedCausalRootRowId: 1003,
      rootLedgerRecordId: 1003,
      sourcePathSegmentId: 1004,
      receiverPathSegmentId: 1005,
      windingLabel: { x: 0, y: 0, z: 0 },
      windingLabelStatus: "local_pre_wrap_candidate",
    },
    availableShapeFields: [
      "chronologyRowId",
      "sourcePathKey",
      "receiverPathKey",
      "sourceSegmentIndex",
      "receiverSegmentIndex",
      "sourceSegment",
      "receiverSegment",
      "sameRecordSegmentBinding",
      "sourceIdentityBinding",
      "receiverIdentityBinding",
      "hitTime",
      "signalSpeed",
      "rootTolerance",
      "rowFamilyIdentity",
      "sameRecordReplayId",
      "retainedSourceRecordId",
      "retainedCausalRootRowId",
      "rootLedgerRecordId",
      "sourcePathSegmentId",
      "receiverPathSegmentId",
      "windingLabel",
      "windingLabelStatus",
      "sameRecordRetainedBinding",
      "causticRouteKind",
      "causticRouteSourceLane",
    ],
    requiredReplaySourceFields,
    missingReplaySourceFields,
    rejectedSyntheticFields: missingReplaySourceFields,
    sourceAcquisitionStatus: "blocked_missing_retained_causal_root_replay_source_fields",
    firstMissingReplaySourceField: "causticRoute",
    requiredUpstreamObject:
      "same-step retained causal-root replay producer that consumes T3UnresolvedRootSegmentRowF64 and emits same-record retained path-history segment ids, retained causal-root row id, rootLedgerRecordId, and causticRoute before t3-run-summary.v1 aggregation",
    replayAuthorization: false,
    acceptedReplayEvidence: false,
    retainedBranch: false,
    provesBranchAdmissibility: false,
  };
  const prototype = createT3OrientedBoundaryPrototype({
    schema: "t3-run-summary.v1",
    stepCount: 1,
    particleCount: 2,
    solverEngine: "solver",
    interactionPreset: "soft_sphere_repel_v1",
    executionPath: "native_c_abi",
    neighborPairCounts: { perStep: [1] },
    periodicWrapEvidence: {
      imageDeltaTotals: { x: 0, y: 0, z: 0 },
      absoluteImageDeltaTotals: { x: 0, y: 0, z: 0 },
      perStep: [
        {
          imageDeltaTotals: { x: 0, y: 0, z: 0 },
          absoluteImageDeltaTotals: { x: 0, y: 0, z: 0 },
        },
      ],
    },
    eventSummary: {
      totalEventCount: 0,
      boundaryLikeEventCount: 0,
      eventTypeCounts: {},
      perStep: [{ eventCount: 0, boundaryLikeEventCount: 0, eventTypeCounts: {} }],
    },
    retainedCausalRootReplaySource: {
      schema: "t3-retained-causal-root-replay.v1",
      sourceObjectSchema: "solver-t3-step-response.v1",
      replayAuthorization: false,
      acceptedReplayEvidence: false,
      rows: [
        {
          schema: "t3-retained-causal-root-replay-row.v1",
          rowId: "step_0_unresolved_root_rows:segment:1:2:0",
          sourceObjectRowSchema: "t3-unresolved-root-segment-row.v1",
          sourceObjectRowStatus: "candidate_shape_evidence",
          rowFamilyIdentity: "unresolved-root",
          chronologyRowId: "step_0_unresolved_root_rows",
          acceptedReplayEvidence: false,
          replayAuthorization: false,
          providedFields: sidecarReplayProducerContract.availableShapeFields,
          missingFields: [
            "boundaryOrientation",
            "windingLabel",
            "jacobianFloorOrDeclaredStratum",
            "endpointRoute",
            "memoryWindowRoute",
            "collisionCoreRoute",
            "omittedRowRoute",
            ...missingReplaySourceFields,
          ],
          retainedCausalRootReplayProducerContract: sidecarReplayProducerContract,
        },
      ],
      summary: {
        status: "candidate_rows_missing_required_same_record_fields",
        candidateRowCount: 1,
        acceptedReplayRowCount: 0,
        replayAuthorization: false,
      },
    },
  });

  const unresolvedRootReplayRow =
    prototype.sameRecordReplayBoundary.rows.find(
      (row) => row.chronologyRowId === "step_0_unresolved_root_rows"
    );
  assert.equal(
    unresolvedRootReplayRow.replayStatus,
    "blocked_candidate_source_missing_required_same_record_fields"
  );
  assert.equal(unresolvedRootReplayRow.producerCandidateRowCount, 1);
  assert.deepEqual(
    unresolvedRootReplayRow.fieldSourceBoundary.missingFamilySpecificFields,
    missingReplaySourceFields
  );
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.nativeRow,
    "T3UnresolvedRootSegmentRowF64"
  );
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.producerContractSchema,
    "t3-retained-causal-root-replay-producer-contract.v1"
  );
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.producerContractCount,
    1
  );
  assert.deepEqual(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.firstProducerContract
      .missingReplaySourceFields,
    missingReplaySourceFields
  );
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.firstProducerContract
      .replayAuthorization,
    false
  );
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.companionNativeReplayRow
      .nativeRow,
    "T3RetainedCausalRootReplayRowF64"
  );
  assert.equal(
    unresolvedRootReplayRow.fieldSourceBoundary.nativeBridgeSource.companionNativeReplayRow
      .sameRecordReplayStatus,
    "candidate_same_record_binding"
  );
  assert.equal(prototype.sameRecordReplayBoundary.summary.retainedBranch, false);
  assert.equal(prototype.sameRecordReplayBoundary.summary.provesBranchAdmissibility, false);
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
