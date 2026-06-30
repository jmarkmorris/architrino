export const T3_CENTRAL_SOLVER_ENGINE_SCHEMA = "t3-central-solver-engine.v1";

export class T3CentralSolverEngine {
  constructor(input = {}) {
    if (!input.topology) {
      throw new TypeError("T3CentralSolverEngine requires a topology");
    }
    if (!input.spatialIndex) {
      throw new TypeError("T3CentralSolverEngine requires a spatialIndex");
    }
    if (!input.interactionPipeline) {
      throw new TypeError("T3CentralSolverEngine requires an interactionPipeline");
    }
    this.id = "solver";
    this.schema = T3_CENTRAL_SOLVER_ENGINE_SCHEMA;
    this.topology = input.topology;
    this.spatialIndex = input.spatialIndex;
    this.interactionPipeline = input.interactionPipeline;
    this.config = input.config ?? {};
    this.solverClient = input.solverClient ?? null;
    this.solverCallCount = 0;
    this.lastAcceptedTimestep = null;
  }

  async step(state, options = {}) {
    if (!this.solverClient) {
      throw new TypeError(
        "T3 central solver engine requires solverClient; pass createSolverAppBridgeClient(...) or choose solver.engine=\"reference\""
      );
    }
    if (typeof this.solverClient.stepT3UniverseF64 !== "function") {
      throw new TypeError(
        "T3 solver engine requires solverClient.stepT3UniverseF64; choose solver.engine=\"reference\" for JS callback interactions"
      );
    }
    const dt = positiveFiniteNumber(
      options.timestep ?? options.dt ?? this.config.solver?.timestep ?? this.config.timestep ?? 0.01,
      "timestep"
    );
    const request = createT3BulkStepRequest({
      state,
      startTime: state.time,
      timestep: dt,
      topology: this.topology,
      spatialIndex: this.spatialIndex,
      interactionPipeline: this.interactionPipeline,
      integrationTolerance: this.config.solver?.tolerance ?? 0,
      maxRows: state.particleCount,
    });
    const response = await this.solverClient.stepT3UniverseF64(request);
    const rows = response?.rows ?? [];
    const bulkStepSummary = response?.summary ?? {};
    const periodicWrapEvidence = summarizeT3ImageDeltas(rows, {
      stepIndex: state.stepIndex,
      request,
      response,
    });
    applyT3BulkStepRows(state, rows);
    state.time = bulkStepSummary.endTime ?? state.time + dt;
    state.stepIndex += 1;
    this.lastAcceptedTimestep = dt;
    this.solverCallCount += 1;
    const result = {
      schema: "t3-solver-step-result.v1",
      mode: "central-solver-bulk-t3",
      engine: "solver",
      accepted: true,
      timestep: dt,
      time: state.time,
      stepIndex: state.stepIndex,
      solverCallCount: this.solverCallCount,
      particleCount: bulkStepSummary.particleCount ?? state.particleCount,
      particleSolveCount: state.particleCount,
      nativeStepCount: this.solverCallCount,
      interactionLaw: request.interaction.law,
      neighborPairCount: bulkStepSummary.neighborPairCount ?? 0,
      cellCount: bulkStepSummary.cellCount ?? null,
      occupiedCellCount: bulkStepSummary.occupiedCellCount ?? 0,
      maxAcceleration: bulkStepSummary.maxAcceleration ?? 0,
      interactionEnergy: bulkStepSummary.interactionEnergy ?? 0,
      bulkStepSummary,
      periodicWrapEvidence,
      executionPath: response?.executionPath ?? "central_solver_bridge",
    };
    this.interactionPipeline.afterStep(this.createContext(state, result));
    return result;
  }

  createContext(state, extra = {}) {
    return {
      schema: "t3-solver-context.v1",
      solver: this,
      state,
      topology: this.topology,
      spatialIndex: this.spatialIndex,
      config: this.config,
      ...extra,
    };
  }

  snapshot() {
    return {
      schema: "t3-central-solver-engine-snapshot.v1",
      id: this.id,
      solverCallCount: this.solverCallCount,
      lastAcceptedTimestep: this.lastAcceptedTimestep,
      integrationPath: "solver.stepT3UniverseF64",
    };
  }
}

export function createT3CentralSolverEngine(input = {}) {
  return new T3CentralSolverEngine(input);
}

export function createT3BulkStepRequest(input = {}) {
  const {
    state,
    startTime,
    timestep,
    topology,
    spatialIndex,
    interactionPipeline,
    integrationTolerance = 0,
    maxRows,
  } = input;
  if (!state || !topology || !spatialIndex) {
    throw new TypeError("T3 bulk step request requires state, topology, and spatialIndex");
  }
  const dt = positiveFiniteNumber(timestep, "timestep");
  return {
    schema: "solver-t3-step-request.v1",
    startTime,
    endTime: startTime + dt,
    timestep: dt,
    topology: {
      sideLength: topology.sideLength,
    },
    spatialIndex: {
      interactionRadius: spatialIndex.interactionRadius,
      cellSize: spatialIndex.cellSize,
    },
    interaction: createNativeT3InteractionSpec(interactionPipeline),
    particles: Array.from({ length: state.particleCount }, (_, particleIndex) => {
      const offset = particleIndex * 3;
      return {
        pathKey: particleIndex + 1,
        position: vectorObject(state.positions, offset),
        velocity: vectorObject(state.velocities, offset),
        mass: state.masses[particleIndex],
        charge: state.electrineFractions[particleIndex],
        stateFlags: particleIndex + 1,
      };
    }),
    integrationTolerance,
    integrationMethod: 1,
    maxRows: maxRows ?? state.particleCount,
  };
}

export function createNativeT3InteractionSpec(interactionPipeline) {
  const interactions = Array.isArray(interactionPipeline?.interactions)
    ? interactionPipeline.interactions.filter(Boolean)
    : [];
  const activeInteractions = interactions.filter((interaction) => interaction.id !== "noop");
  if (activeInteractions.length === 0) {
    return {
      law: "none",
      radius: 1,
      interactionRadius: 1,
      strength: 0,
      softening: 0,
    };
  }
  if (activeInteractions.length > 1) {
    throw new TypeError("T3 solver engine supports one native interaction preset per step");
  }
  const nativeKernel = activeInteractions[0].nativeKernel;
  if (!nativeKernel || nativeKernel.law !== "soft_sphere_repel_v1") {
    throw new TypeError(
      `T3 solver engine cannot run JS interaction callback "${activeInteractions[0].id}"; choose solver.engine="reference" or provide a nativeKernel`
    );
  }
  return {
    law: "soft_sphere_repel_v1",
    radius: positiveFiniteNumber(nativeKernel.radius, "nativeKernel.radius"),
    interactionRadius: positiveFiniteNumber(nativeKernel.interactionRadius ?? nativeKernel.radius, "nativeKernel.interactionRadius"),
    strength: finiteNumber(nativeKernel.strength ?? 1, "nativeKernel.strength"),
    softening: positiveFiniteNumber(nativeKernel.softening ?? nativeKernel.radius * 1e-6, "nativeKernel.softening"),
  };
}

export function applyT3BulkStepRows(state, rows) {
  if (!Array.isArray(rows) || rows.length !== state.particleCount) {
    throw new TypeError("T3 bulk solver row count must match particle count");
  }
  for (let particleIndex = 0; particleIndex < state.particleCount; particleIndex += 1) {
    const row = rows[particleIndex];
    if (!row || row.pathKey !== particleIndex + 1) {
      throw new TypeError(`T3 bulk solver row ${particleIndex} has an unexpected pathKey`);
    }
    const offset = particleIndex * 3;
    state.positions[offset] = row.position.x;
    state.positions[offset + 1] = row.position.y;
    state.positions[offset + 2] = row.position.z;
    state.velocities[offset] = row.velocity.x;
    state.velocities[offset + 1] = row.velocity.y;
    state.velocities[offset + 2] = row.velocity.z;
    state.accelerations[offset] = row.acceleration.x;
    state.accelerations[offset + 1] = row.acceleration.y;
    state.accelerations[offset + 2] = row.acceleration.z;
    state.imageOffsets[offset] += row.imageDelta?.x ?? 0;
    state.imageOffsets[offset + 1] += row.imageDelta?.y ?? 0;
    state.imageOffsets[offset + 2] += row.imageDelta?.z ?? 0;
  }
}

export function summarizeT3ImageDeltas(rows = [], options = {}) {
  if (!Array.isArray(rows)) {
    throw new TypeError("T3 image delta summary requires solver rows");
  }
  const imageDeltaTotals = { x: 0, y: 0, z: 0 };
  const absoluteImageDeltaTotals = { x: 0, y: 0, z: 0 };
  let wrappedParticleCount = 0;
  for (const row of rows) {
    const x = integerImageDelta(row?.imageDelta?.x);
    const y = integerImageDelta(row?.imageDelta?.y);
    const z = integerImageDelta(row?.imageDelta?.z);
    imageDeltaTotals.x += x;
    imageDeltaTotals.y += y;
    imageDeltaTotals.z += z;
    absoluteImageDeltaTotals.x += Math.abs(x);
    absoluteImageDeltaTotals.y += Math.abs(y);
    absoluteImageDeltaTotals.z += Math.abs(z);
    if (x !== 0 || y !== 0 || z !== 0) {
      wrappedParticleCount += 1;
    }
  }
  const totalAbsoluteImageDelta =
    absoluteImageDeltaTotals.x + absoluteImageDeltaTotals.y + absoluteImageDeltaTotals.z;
  return {
    schema: "t3-image-delta-summary.v1",
    particleCount: rows.length,
    imageDeltaTotals,
    absoluteImageDeltaTotals,
    totalAbsoluteImageDelta,
    wrappedParticleCount,
    hasPeriodicWrap: wrappedParticleCount > 0,
    retainedCausalRootReplaySource: createRetainedCausalRootReplaySource(rows, options),
  };
}

function createRetainedCausalRootReplaySource(rows, options = {}) {
  const stepIndex = Number.isInteger(options.stepIndex) ? options.stepIndex : null;
  const candidateRows = [];
  for (let rowIndex = 0; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    for (const axis of ["x", "y", "z"]) {
      const signedImageDelta = integerImageDelta(row?.imageDelta?.[axis]);
      if (signedImageDelta === 0) {
        continue;
      }
      candidateRows.push(createRetainedCausalRootReplayCandidateRow({
        row,
        rowIndex,
        rows,
        stepIndex,
        request: options.request,
        response: options.response,
        axis,
        signedImageDelta,
      }));
    }
  }
  return {
    schema: "t3-retained-causal-root-replay.v1",
    sourceObjectSchema: "solver-t3-step-response.v1",
    replayAuthorization: false,
    acceptedReplayEvidence: false,
    rows: candidateRows,
    negativeControls: [
      {
        controlId: "candidate_step_row_without_retained_causal_root_id",
        expectedFailure:
          "solver step rows can identify a source pathKey and image-delta axis but cannot authorize replay without a retained causal-root row id",
        promotionBlocked: true,
      },
      {
        controlId: "candidate_step_row_without_endpoint_memory_or_omitted_row_routes",
        expectedFailure:
          "solver step rows cannot authorize replay until endpoint, memory-window, collision/core, and omitted-row routes are declared on the same retained record",
        promotionBlocked: true,
      },
    ],
    summary: {
      status:
        candidateRows.length > 0
          ? "candidate_rows_missing_required_same_record_fields"
          : "no_candidate_replay_rows",
      candidateRowCount: candidateRows.length,
      acceptedReplayRowCount: 0,
      replayAuthorization: false,
      firstCandidateRowId: candidateRows[0]?.rowId ?? null,
      firstMissingField: candidateRows[0]?.missingFields?.[0] ?? null,
      retainedBranch: false,
      provesBranchAdmissibility: false,
    },
  };
}

function createRetainedCausalRootReplayCandidateRow(input) {
  const { row, rowIndex, stepIndex, axis, signedImageDelta } = input;
  const sourceRecordId = retainedSourceRecordId(row, rowIndex, stepIndex);
  const rowId = `${sourceRecordId}:seam-${axis}`;
  const retainedCausalRootRowId = `${rowId}:candidate-root`;
  const endpointRoute = createEndpointRoute({
    row,
    rowIndex,
    stepIndex,
    request: input.request,
  });
  const memoryWindowRoute = createMemoryWindowRoute({
    row,
    rowIndex,
    stepIndex,
    request: input.request,
  });
  const omittedRowRoute = createOmittedRowRoute({
    row,
    rowIndex,
    stepIndex,
    rows: input.rows,
    request: input.request,
  });
  const seamOwnerRoute = createSeamOwnerRoute({
    row,
    stepIndex,
    axis,
    signedImageDelta,
    rowId,
  });
  const collisionCoreRoute = createCollisionCoreRoute({
    row,
    stepIndex,
    request: input.request,
  });
  const providedFields = [
    "sameRecordReplayId",
    "retainedSourceRecordId",
    "retainedCausalRootRowId",
    "rowFamilyIdentity",
    "boundaryOrientation",
    "windingLabel",
    "imageDeltaAxis",
    "signedImageDeltaWitness",
  ];
  if (endpointRoute) {
    providedFields.push("endpointRoute");
  }
  if (memoryWindowRoute) {
    providedFields.push("memoryWindowRoute");
  }
  if (collisionCoreRoute) {
    providedFields.push("collisionCoreRoute");
  }
  if (omittedRowRoute) {
    providedFields.push("omittedRowRoute");
  }
  if (seamOwnerRoute) {
    providedFields.push("seamPairingMapOrWindingOwnerRowId");
  }
  return {
    schema: "t3-retained-causal-root-replay-row.v1",
    rowId,
    sameRecordReplayId: `candidate-replay:${rowId}`,
    retainedSourceRecordId: sourceRecordId,
    retainedCausalRootRowId,
    stepIndex,
    sourcePathKey: row?.pathKey ?? rowIndex + 1,
    rowFamilyIdentity: "seam",
    chronologyRowId: stepIndex == null ? null : `step_${stepIndex}_seam_${axis}`,
    boundaryOrientation:
      signedImageDelta > 0
        ? "positive_boundary_orientation_candidate"
        : "negative_boundary_orientation_candidate",
    windingLabel: `${axis}:${signedImageDelta > 0 ? "+1" : "-1"}`,
    imageDeltaAxis: axis,
    signedImageDeltaWitness: signedImageDelta,
    jacobianFloorOrDeclaredStratum: null,
    jacobianFloorSourceBoundary: createJacobianFloorSourceBoundary({
      row,
      stepIndex,
      rowId,
    }),
    endpointRoute,
    memoryWindowRoute,
    collisionCoreRoute,
    omittedRowRoute,
    seamPairingMapOrWindingOwnerRowId: seamOwnerRoute?.windingOwnerRowId ?? null,
    seamOwnerRoute,
    rowStatus: "candidate_missing_required_same_record_fields",
    replayAuthorization: false,
    acceptedReplayEvidence: false,
    providedFields,
    missingFields: [
      "jacobianFloorOrDeclaredStratum",
    ]
      .concat(endpointRoute ? [] : ["endpointRoute"])
      .concat(memoryWindowRoute ? [] : ["memoryWindowRoute"])
      .concat(collisionCoreRoute ? [] : ["collisionCoreRoute"])
      .concat(omittedRowRoute ? [] : ["omittedRowRoute"])
      .concat(seamOwnerRoute ? [] : ["seamPairingMapOrWindingOwnerRowId"]),
  };
}

function createJacobianFloorSourceBoundary(input) {
  const { row, stepIndex, rowId } = input;
  return {
    schema: "t3-jacobian-floor-source-boundary.v1",
    blockerStatus: "missing_same_record_jacobian_floor_or_declared_stratum",
    expectedSourceObject: "solver-t3-step-response.v1",
    expectedField: "jacobianFloorOrDeclaredStratum",
    sameRecordBinding: "pathKey",
    stepIndex,
    pathKey: row?.pathKey ?? null,
    retainedCausalRootReplayRowId: rowId,
    replayAuthorization: false,
  };
}

function createEndpointRoute(input) {
  const { row, rowIndex, stepIndex, request } = input;
  const requestParticle = request?.particles?.[rowIndex] ?? null;
  if (!requestParticle || requestParticle.pathKey !== row?.pathKey) {
    return null;
  }
  return {
    schema: "t3-endpoint-route.v1",
    routeStatus: "declared_from_same_solver_step_record",
    sourceObjectSchema: "solver-t3-step-request+response.v1",
    sameRecordBinding: "pathKey",
    stepIndex,
    pathKey: row.pathKey,
    startTime: request.startTime,
    endTime: request.endTime,
    timestep: request.timestep,
    initialPosition: cloneVectorObject(requestParticle.position),
    finalPosition: cloneVectorObject(row.position),
    imageDelta: cloneImageDelta(row.imageDelta),
  };
}

function createMemoryWindowRoute(input) {
  const { row, rowIndex, stepIndex, request } = input;
  const requestParticle = request?.particles?.[rowIndex] ?? null;
  if (!requestParticle || requestParticle.pathKey !== row?.pathKey) {
    return null;
  }
  return {
    schema: "t3-memory-window-route.v1",
    routeStatus: "declared_from_same_solver_step_interval",
    sourceObjectSchema: "solver-t3-step-request+response.v1",
    sameRecordBinding: "pathKey",
    stepIndex,
    pathKey: row.pathKey,
    startTime: request.startTime,
    endTime: request.endTime,
    timestep: request.timestep,
    memoryWindowStart: request.startTime,
    memoryWindowEnd: request.endTime,
  };
}

function createCollisionCoreRoute(input) {
  const { row, stepIndex, request } = input;
  if (request?.interaction?.law !== "none") {
    return null;
  }
  return {
    schema: "t3-collision-core-route.v1",
    routeStatus: "declared_no_collision_core_channel_in_solver_step",
    sourceObjectSchema: "solver-t3-step-request.v1",
    sameRecordBinding: "pathKey",
    stepIndex,
    pathKey: row?.pathKey ?? null,
    interactionLaw: request.interaction.law,
  };
}

function createOmittedRowRoute(input) {
  const { row, rowIndex, rows, stepIndex, request } = input;
  const requestParticles = Array.isArray(request?.particles) ? request.particles : [];
  const responseRows = Array.isArray(rows) ? rows : [];
  const requestParticle = requestParticles[rowIndex] ?? null;
  if (!requestParticle || requestParticle.pathKey !== row?.pathKey) {
    return null;
  }
  const pathKeySequenceMatches = responseRows.every(
    (responseRow, index) => responseRow?.pathKey === requestParticles[index]?.pathKey
  );
  if (requestParticles.length !== responseRows.length || !pathKeySequenceMatches) {
    return null;
  }
  return {
    schema: "t3-omitted-row-route.v1",
    routeStatus: "declared_no_omitted_solver_step_rows",
    sourceObjectSchema: "solver-t3-step-request+response.v1",
    sameRecordBinding: "pathKey",
    stepIndex,
    pathKey: row.pathKey,
    requestParticleCount: requestParticles.length,
    responseRowCount: responseRows.length,
    rowIndex,
  };
}

function createSeamOwnerRoute(input) {
  const { row, stepIndex, axis, signedImageDelta, rowId } = input;
  if (!row?.pathKey || signedImageDelta === 0) {
    return null;
  }
  return {
    schema: "t3-seam-owner-route.v1",
    routeStatus: "declared_from_same_solver_step_image_delta",
    sourceObjectSchema: "solver-t3-step-response.v1",
    sameRecordBinding: "pathKey",
    stepIndex,
    pathKey: row.pathKey,
    imageDeltaAxis: axis,
    signedImageDeltaWitness: signedImageDelta,
    windingOwnerRowId: `${rowId}:winding-owner`,
  };
}

function cloneVectorObject(value = {}) {
  return {
    x: finiteOrNull(value.x),
    y: finiteOrNull(value.y),
    z: finiteOrNull(value.z),
  };
}

function cloneImageDelta(value = {}) {
  return {
    x: integerImageDelta(value.x),
    y: integerImageDelta(value.y),
    z: integerImageDelta(value.z),
  };
}

function finiteOrNull(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : null;
}

function retainedSourceRecordId(row, rowIndex, stepIndex) {
  const stepToken = stepIndex == null ? "step-unknown" : `step-${stepIndex}`;
  const pathKey = row?.pathKey ?? rowIndex + 1;
  return `t3-${stepToken}:pathKey-${pathKey}`;
}

export function createT3FallbackMotionIntegrationRequest(state, particleIndex, startTime, timestep, options = {}) {
  const offset = particleIndex * 3;
  return {
    pathKey: particleIndex + 1,
    startTime,
    endTime: startTime + timestep,
    step: timestep,
    initialPosition: vectorObject(state.positions, offset),
    initialVelocity: vectorObject(state.velocities, offset),
    acceleration: vectorObject(state.accelerations, offset),
    integrationTolerance: options.integrationTolerance ?? 0,
    integrationMethod: 1,
    stateFlags: particleIndex + 1,
    maxFrames: 2,
  };
}

export async function integrateParticlesWithFallbackCentralMotionSolver(input) {
  const {
    solverClient,
    state,
    startTime,
    timestep,
    integrationTolerance,
    maxConcurrency,
  } = input;
  const results = new Array(state.particleCount);
  const concurrency = Math.max(1, Math.min(positiveInteger(maxConcurrency ?? 32, "maxConcurrency"), state.particleCount || 1));
  let nextIndex = 0;
  async function worker() {
    while (nextIndex < state.particleCount) {
      const particleIndex = nextIndex;
      nextIndex += 1;
      const request = createT3FallbackMotionIntegrationRequest(state, particleIndex, startTime, timestep, {
        integrationTolerance,
      });
      const response = await solverClient.integrateConstantAccelerationMotionF64(request);
      results[particleIndex] = selectFinalFrame(response, request);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

export function applyFallbackCentralSolverFrames(state, framesByParticle, topology) {
  if (framesByParticle.length !== state.particleCount) {
    throw new TypeError("central solver frame count must match particle count");
  }
  for (let particleIndex = 0; particleIndex < state.particleCount; particleIndex += 1) {
    const frame = framesByParticle[particleIndex];
    if (!frame) {
      throw new TypeError(`missing central solver frame for particle ${particleIndex}`);
    }
    const offset = particleIndex * 3;
    state.positions[offset] = frame.position.x;
    state.positions[offset + 1] = frame.position.y;
    state.positions[offset + 2] = frame.position.z;
    topology.wrapPositionInPlace(state.positions, particleIndex, state.imageOffsets);
    state.velocities[offset] = frame.velocity.x;
    state.velocities[offset + 1] = frame.velocity.y;
    state.velocities[offset + 2] = frame.velocity.z;
  }
}

function selectFinalFrame(response, request) {
  const frames = response?.frames ?? response?.response?.frames ?? [];
  if (!Array.isArray(frames) || frames.length === 0) {
    throw new TypeError("central solver response must include frames");
  }
  const finalFrame = frames[frames.length - 1];
  if (!finalFrame.position || !finalFrame.velocity) {
    throw new TypeError("central solver final frame must include position and velocity");
  }
  if (Math.abs(finalFrame.time - request.endTime) > Math.max(1e-12, request.step * 1e-9)) {
    throw new TypeError("central solver final frame time does not match requested endTime");
  }
  return finalFrame;
}

function vectorObject(values, offset) {
  return {
    x: values[offset],
    y: values[offset + 1],
    z: values[offset + 2],
  };
}

function positiveFiniteNumber(value, fieldName) {
  const numericValue = finiteNumber(value, fieldName);
  if (numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive and finite`);
  }
  return numericValue;
}

function finiteNumber(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new TypeError(`${fieldName} must be finite`);
  }
  return numericValue;
}

function integerImageDelta(value) {
  const numericValue = Number(value ?? 0);
  if (!Number.isInteger(numericValue)) {
    throw new TypeError("T3 image delta must be an integer");
  }
  return numericValue;
}

function positiveInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be a positive integer`);
  }
  return numericValue;
}
