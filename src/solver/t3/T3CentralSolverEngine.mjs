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
    const dt = positiveFiniteNumber(
      options.timestep ?? options.dt ?? this.config.solver?.timestep ?? this.config.timestep ?? 0.01,
      "timestep"
    );
    const context = this.createContext(state, { timestep: dt });
    this.interactionPipeline.beforeStep(context);
    this.interactionPipeline.evaluateAccelerations(context);
    const framesByParticle = await integrateParticlesWithCentralSolver({
      solverClient: this.solverClient,
      state,
      startTime: state.time,
      timestep: dt,
      integrationTolerance: this.config.solver?.tolerance ?? 0,
      maxConcurrency: this.config.solver?.centralSolverConcurrency ?? 32,
    });
    applyCentralSolverFrames(state, framesByParticle, this.topology);
    state.time += dt;
    state.stepIndex += 1;
    this.lastAcceptedTimestep = dt;
    this.solverCallCount += state.particleCount;
    const result = {
      schema: "t3-solver-step-result.v1",
      mode: "central-solver",
      engine: "solver",
      accepted: true,
      timestep: dt,
      time: state.time,
      stepIndex: state.stepIndex,
      solverCallCount: this.solverCallCount,
      particleSolveCount: state.particleCount,
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
      integrationPath: "solver.integrateConstantAccelerationMotionF64",
    };
  }
}

export function createT3CentralSolverEngine(input = {}) {
  return new T3CentralSolverEngine(input);
}

export function createT3MotionIntegrationRequest(state, particleIndex, startTime, timestep, options = {}) {
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

export async function integrateParticlesWithCentralSolver(input) {
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
      const request = createT3MotionIntegrationRequest(state, particleIndex, startTime, timestep, {
        integrationTolerance,
      });
      const response = await solverClient.integrateConstantAccelerationMotionF64(request);
      results[particleIndex] = selectFinalFrame(response, request);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

export function applyCentralSolverFrames(state, framesByParticle, topology) {
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
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue) || numericValue <= 0) {
    throw new TypeError(`${fieldName} must be positive and finite`);
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
