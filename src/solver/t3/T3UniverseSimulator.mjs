import { createInteractionPipeline, collectT3Events } from "./T3InteractionRuntime.mjs";
import { createInitialT3State } from "./T3InitialConditions.mjs";
import { createT3SpatialIndex } from "./T3SpatialIndex.mjs";
import { computeParticleStatistics } from "./T3Statistics.mjs";
import { createT3State } from "./T3State.mjs";
import { createT3Topology } from "./T3Topology.mjs";
import { createT3CentralSolverEngine } from "./T3CentralSolverEngine.mjs";
import { referenceActionSolver } from "./T3ActionSolver.mjs";
import {
  createT3Checkpoint,
  createT3TrajectoryFrame,
  deserializeT3State,
  serializeT3State,
} from "./T3Serialization.mjs";
import { createT3VisualizationFrame, createTrailRecorder } from "./T3Visualization.mjs";

export const T3_UNIVERSE_CONFIG_SCHEMA = "t3-universe-simulator-config.v1";

export function createT3UniverseSimulator(input = {}) {
  const config = normalizeT3UniverseConfig(input.config ?? input);
  const topology = createT3Topology(config.topology);
  const state = input.state
    ? input.state.schema === "t3-state.v1"
      ? input.state
      : createT3State(input.state)
    : createInitialT3State(config);
  const spatialIndex = createT3SpatialIndex({
    topology,
    interactionRadius: config.interactions.interactionRadius,
    cellSize: config.interactions.spatialIndexCellSize,
  });
  const interactionPipeline = createInteractionPipeline(input.interactions ?? []);
  const eventDetectors = Array.isArray(input.eventDetectors) ? input.eventDetectors : [];
  const integrationSolver = createIntegrationSolver({
    topology,
    spatialIndex,
    interactionPipeline,
    config,
    solverClient: input.solverClient,
  });
  const trailRecorder = config.visualization.enabled && config.visualization.trails.enabled
    ? createTrailRecorder({
        maxSamples: config.visualization.trails.maxSamples,
        stride: config.visualization.trails.stride,
      })
    : null;
  if (trailRecorder) {
    trailRecorder.record(state);
  }

  return {
    schema: "t3-universe-simulator.v1",
    config,
    topology,
    state,
    spatialIndex,
    solver: integrationSolver,
    eventDetectors,
    async step(options = {}) {
      const result = await integrationSolver.step(state, options);
      if (trailRecorder) {
        trailRecorder.record(state);
      }
      const events = collectT3Events(integrationSolver.createContext(state, result), eventDetectors);
      return { ...result, events };
    },
    async run(options = {}) {
      return runT3Simulation(this, options);
    },
    statistics() {
      const interactionEnergy = interactionPipeline.computeInteractionEnergy(
        integrationSolver.createContext(state)
      );
      return computeParticleStatistics(state, topology, { interactionEnergy });
    },
    trajectoryFrame(options = {}) {
      return createT3TrajectoryFrame(state, options);
    },
    visualizationFrame(options = {}) {
      return createT3VisualizationFrame(state, topology, {
        ...options,
        trails: trailRecorder ? trailRecorder.snapshot() : undefined,
        statistics: options.statistics ?? this.statistics(),
      });
    },
    checkpoint(metadata = {}) {
      return createT3Checkpoint({
        config,
        state,
        solverSnapshot: integrationSolver.snapshot(),
        metadata,
      });
    },
    serializeState() {
      return serializeT3State(state);
    },
  };
}

export function restoreT3UniverseSimulatorFromCheckpoint(checkpoint, input = {}) {
  if (!checkpoint || checkpoint.schema !== "t3-checkpoint.v1") {
    throw new TypeError("checkpoint must be a t3-checkpoint.v1 record");
  }
  return createT3UniverseSimulator({
    config: checkpoint.config,
    state: deserializeT3State(checkpoint.state),
    interactions: input.interactions ?? [],
    eventDetectors: input.eventDetectors ?? [],
    solverClient: input.solverClient,
  });
}

export function normalizeT3UniverseConfig(input = {}) {
  const topologyInput = input.topology ?? {};
  const baseUnitLength = positiveFiniteNumber(
    topologyInput.baseUnitLength ?? topologyInput.U ?? input.baseUnitLength ?? input.U ?? 1,
    "baseUnitLength"
  );
  const scaleFactor = positiveFiniteNumber(
    topologyInput.scaleFactor ?? topologyInput.N ?? input.scaleFactor ?? input.N ?? 1,
    "scaleFactor"
  );
  const sideLength = positiveFiniteNumber(
    topologyInput.sideLength ?? input.sideLength ?? baseUnitLength * scaleFactor,
    "sideLength"
  );
  const particleInput = input.particles ?? {};
  const interactionInput = input.interactions ?? {};
  const solverInput = input.solver ?? input.integration ?? {};
  const visualizationInput = input.visualization ?? {};
  return {
    schema: T3_UNIVERSE_CONFIG_SCHEMA,
    model: {
      id: input.model?.id ?? "t3-flexible-architrino-platform",
      forceLawVersion: input.model?.forceLawVersion ?? "user-callback",
      constantsHash: input.model?.constantsHash ?? "none",
      causalSpeedPolicy: input.model?.causalSpeedPolicy ?? "not-assumed",
      branchPolicy: input.model?.branchPolicy ?? "not-assumed",
      unitConvention: input.model?.unitConvention ?? "configurable",
      ...clonePlainObject(input.model ?? {}),
    },
    topology: {
      schema: "t3-topology-config.v1",
      baseUnitLength,
      scaleFactor,
      sideLength,
    },
    particles: {
      count: particleInput.count ?? input.architrinoCount ?? input.particleCount,
      spatialDensity: particleInput.spatialDensity ?? input.spatialDensity,
      mass: particleInput.mass ?? input.mass ?? 1,
      electrineFraction: particleInput.electrineFraction ?? input.electrineFraction ?? 0.5,
      items: particleInput.items,
    },
    initialConditions: {
      seed: input.initialConditions?.seed ?? input.seed ?? 1,
      distribution: input.initialConditions?.distribution ?? input.initialDistribution ?? "random",
      velocityDistribution:
        input.initialConditions?.velocityDistribution ?? input.initialVelocityDistribution ?? "stationary",
      densityGradient: input.initialConditions?.densityGradient ?? input.densityGradient,
      clusters: input.initialConditions?.clusters,
      particles: input.initialConditions?.particles,
      importedState: input.initialConditions?.importedState,
      maxSpeed: input.initialConditions?.maxSpeed,
      velocityMean: input.initialConditions?.velocityMean,
      velocityStdDev: input.initialConditions?.velocityStdDev,
    },
    interactions: {
      interactionRadius: positiveFiniteNumber(
        interactionInput.interactionRadius ?? interactionInput.radius ?? input.interactionRadius ?? sideLength / 16,
        "interactionRadius"
      ),
      spatialIndexCellSize: positiveFiniteNumber(
        interactionInput.spatialIndexCellSize ??
          interactionInput.cellSize ??
          input.spatialIndexCellSize ??
          interactionInput.interactionRadius ??
          input.interactionRadius ??
          sideLength / 16,
        "spatialIndexCellSize"
      ),
    },
    solver: {
      engine: solverInput.engine ?? input.solverEngine ?? "solver",
      mode: solverInput.mode ?? solverInput.timestepMode ?? "fixed",
      timestep: positiveFiniteNumber(solverInput.timestep ?? solverInput.dt ?? input.timestep ?? 0.01, "timestep"),
      minTimestep: positiveFiniteNumber(
        solverInput.minTimestep ?? input.minTimestep ?? Math.max(1e-12, (solverInput.timestep ?? 0.01) / 1024),
        "minTimestep"
      ),
      maxTimestep: positiveFiniteNumber(
        solverInput.maxTimestep ?? input.maxTimestep ?? Math.max(solverInput.timestep ?? 0.01, 0.01),
        "maxTimestep"
      ),
      tolerance: positiveFiniteNumber(solverInput.tolerance ?? input.tolerance ?? 1e-6, "tolerance"),
      deterministic: solverInput.deterministic ?? true,
      checkpointRestart: true,
      centralSolverConcurrency: positiveInteger(
        solverInput.centralSolverConcurrency ?? input.centralSolverConcurrency ?? 32,
        "centralSolverConcurrency"
      ),
    },
    output: {
      sampleEvery: positiveInteger(input.output?.sampleEvery ?? input.sampleEvery ?? 1, "sampleEvery"),
      trajectoryStride: positiveInteger(input.output?.trajectoryStride ?? input.trajectoryStride ?? 1, "trajectoryStride"),
      metadata: clonePlainObject(input.output?.metadata ?? {}),
    },
    visualization: {
      enabled: Boolean(visualizationInput.enabled ?? false),
      densityGridResolution: visualizationInput.densityGridResolution ?? 16,
      trails: {
        enabled: Boolean(visualizationInput.trails?.enabled ?? false),
        maxSamples: positiveInteger(visualizationInput.trails?.maxSamples ?? 256, "trail maxSamples"),
        stride: positiveInteger(visualizationInput.trails?.stride ?? 1, "trail stride"),
      },
    },
    metadata: clonePlainObject(input.metadata ?? {}),
  };
}

function createIntegrationSolver(input) {
  if (input.config.solver.engine === "solver") {
    return createT3CentralSolverEngine(input);
  }
  if (input.config.solver.engine === "reference") {
    return referenceActionSolver.create(input);
  }
  throw new TypeError(`unsupported T3 solver engine: ${input.config.solver.engine}`);
}

async function runT3Simulation(simulator, options = {}) {
  const steps = options.steps == null ? null : nonnegativeInteger(options.steps, "steps");
  const duration = options.duration == null ? null : positiveFiniteNumber(options.duration, "duration");
  if (steps == null && duration == null) {
    throw new TypeError("run requires steps or duration");
  }
  const sampleEvery = positiveInteger(options.sampleEvery ?? simulator.config.output.sampleEvery, "sampleEvery");
  const collectFrames = options.collectFrames ?? true;
  const trajectoryFrames = [];
  const stepResults = [];
  const startTime = simulator.state.time;
  let completedSteps = 0;
  while (true) {
    if (steps != null && completedSteps >= steps) {
      break;
    }
    if (duration != null && simulator.state.time - startTime >= duration) {
      break;
    }
    const stepResult = await simulator.step(options.stepOptions ?? {});
    completedSteps += 1;
    stepResults.push(stepResult);
    if (completedSteps % sampleEvery === 0) {
      const frame = simulator.trajectoryFrame({ stride: simulator.config.output.trajectoryStride });
      options.onFrame?.(frame, simulator);
      if (collectFrames) {
        trajectoryFrames.push(frame);
      }
    }
  }
  return {
    schema: "t3-run-result.v1",
    completedSteps,
    startTime,
    endTime: simulator.state.time,
    trajectoryFrames,
    stepResults,
    statistics: simulator.statistics(),
    checkpoint: simulator.checkpoint({ reason: "run-complete" }),
  };
}

function clonePlainObject(value) {
  return JSON.parse(JSON.stringify(value ?? {}));
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

function nonnegativeInteger(value, fieldName) {
  const numericValue = Number(value);
  if (!Number.isInteger(numericValue) || numericValue < 0) {
    throw new TypeError(`${fieldName} must be a nonnegative integer`);
  }
  return numericValue;
}
