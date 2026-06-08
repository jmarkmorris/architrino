import {
  DEFAULTS as LEGACY_DEFAULTS,
  run as runLegacyAssemblyDynamics,
} from "../assembly-dynamics-toy.mjs";

export const ASSEMBLY_DYNAMICS_ENGINE_ID = "assembly-dynamics-toy";
export const ASSEMBLY_DYNAMICS_ENGINE_INTERFACE_VERSION = "0.1.0";
export const ANIMATOR_SIMULATION_DATASET_KIND = "animator.simulation.dataset";
export const ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION = "0.1.0";
export const DEFAULTS = Object.freeze({ ...LEGACY_DEFAULTS });

const OUTPUT_KEYS = ["out", "csv", "svg", "pretty"];

function vector2To3(value = []) {
  return [Number(value[0]) || 0, Number(value[1]) || 0, 0];
}

function particleDatasetId(rawId) {
  const text = String(rawId ?? "").trim();
  if (!text) {
    return "p0";
  }
  return /^\d+$/.test(text) ? `p${text}` : text;
}

function particleChargeType(q) {
  if (q > 0) return "positive";
  if (q < 0) return "negative";
  return "neutral";
}

function frameDiagnostics(frame = {}) {
  const conserved = frame.conserved_quantities ?? {};
  const hitStats = frame.hit_stats ?? {};
  return {
    center: vector2To3(frame.center),
    shellRadius: frame.shell_radius ?? null,
    energyProxy: conserved.energy_proxy ?? null,
    momentum: vector2To3(conserved.momentum),
    angularMomentumZ: conserved.angular_momentum_z ?? null,
    partnerHits: hitStats.partner_hits ?? 0,
    selfHits: hitStats.self_hits ?? 0,
    unresolvedRoots: hitStats.unresolved_roots ?? 0,
    partnerUnresolvedRoots: hitStats.partner_unresolved_roots ?? 0,
    selfUnresolvedRoots: hitStats.self_unresolved_roots ?? 0,
    minAbsJacobian: hitStats.min_abs_jacobian ?? null,
    maxRootsPerPair: hitStats.max_roots_per_pair ?? 0,
    maxAbsAcceleration: hitStats.max_abs_acceleration ?? 0,
  };
}

function simulationHalt(result = {}) {
  if (result.completed) {
    return { status: "completed" };
  }
  return {
    status: "halted",
    code: result.error?.code ?? null,
    message: result.error?.message ?? "",
    t: result.error?.t ?? null,
    attemptedStep: result.error?.attempted_step ?? null,
  };
}

export function createAssemblyDynamicsConfig(inputConfig = {}, options = {}) {
  const rawConfig = inputConfig && typeof inputConfig === "object" ? inputConfig : {};
  const config = { ...DEFAULTS, ...rawConfig };
  if (options.includeOutputOptions !== true) {
    for (const key of OUTPUT_KEYS) {
      config[key] = DEFAULTS[key];
    }
  }
  return config;
}

export function runAssemblyDynamicsSimulation(inputConfig = {}, options = {}) {
  return runLegacyAssemblyDynamics(createAssemblyDynamicsConfig(inputConfig, options));
}

export const run = runAssemblyDynamicsSimulation;

export function createAnimatorSimulationDatasetFromAssemblyDynamicsResult(
  result,
  options = {}
) {
  const frames = Array.isArray(result?.frames) ? result.frames : [];
  const firstFrame = frames[0] ?? {};
  const lastFrame = frames[frames.length - 1] ?? firstFrame;
  const config = result?.config ?? {};
  const initialParticles = Array.isArray(firstFrame.particles)
    ? firstFrame.particles
    : [];

  return {
    schemaVersion:
      options.schemaVersion ?? ANIMATOR_SIMULATION_DATASET_SCHEMA_VERSION,
    kind: ANIMATOR_SIMULATION_DATASET_KIND,
    id: options.id ?? "assembly_dynamics_toy_dataset",
    claimLevel: options.claimLevel ?? "solver-derived-diagnostic",
    provenance: {
      engineId: ASSEMBLY_DYNAMICS_ENGINE_ID,
      engineInterfaceVersion: ASSEMBLY_DYNAMICS_ENGINE_INTERFACE_VERSION,
      sourceScript: "scripts/simulations/assembly-dynamics-toy.mjs",
      adapter: "scripts/simulations/lib/assembly-dynamics-engine.mjs",
      model: result?.model ?? null,
      ...(options.provenance && typeof options.provenance === "object"
        ? options.provenance
        : {}),
    },
    simulation: {
      mode: "planar-2d",
      dimensions: 2,
      units: options.units ?? "relative",
      time: {
        start: firstFrame.t ?? 0,
        end: lastFrame.t ?? firstFrame.t ?? 0,
        dt: config.dt ?? 0,
        sampleStride: config.stride ?? 1,
      },
      solver: {
        engineId: ASSEMBLY_DYNAMICS_ENGINE_ID,
        engineInterfaceVersion: ASSEMBLY_DYNAMICS_ENGINE_INTERFACE_VERSION,
        sourceModel: result?.model?.name ?? ASSEMBLY_DYNAMICS_ENGINE_ID,
        rootHaltPolicy: config.rootHaltPolicy ?? DEFAULTS.rootHaltPolicy,
        historyMode: config.historyMode ?? DEFAULTS.historyMode,
        cf: config.cf ?? DEFAULTS.cf,
        kappa: config.kappa ?? DEFAULTS.kappa,
        jacobianFloor: config.jacobianFloor ?? DEFAULTS.jacobianFloor,
        rootTolerance: config.rootTolerance ?? DEFAULTS.rootTolerance,
      },
      halt: simulationHalt(result),
    },
    particles: initialParticles.map((particle) => ({
      id: particleDatasetId(particle.id),
      label: `Particle ${particle.id}`,
      polarity: particle.q ?? 0,
      chargeType: particleChargeType(particle.q ?? 0),
      initial: {
        position: vector2To3([particle.x, particle.y]),
        velocity: vector2To3([particle.vx, particle.vy]),
      },
      style: {},
    })),
    frames: frames.map((frame, index) => ({
      index,
      t: frame.t ?? index,
      particles: (frame.particles ?? []).map((particle) => ({
        id: particleDatasetId(particle.id),
        position: vector2To3([particle.x, particle.y]),
        velocity: vector2To3([particle.vx, particle.vy]),
        phase: particle.phase ?? 0,
        radialVelocity: particle.radial_velocity ?? 0,
        angularVelocity: particle.angular_velocity ?? 0,
      })),
      diagnostics: frameDiagnostics(frame),
    })),
    fieldShells: [],
    delayedHits: [],
    diagnostics: {
      status: result?.summary?.status ?? "unknown",
      completed: !!result?.completed,
      errorCode: result?.error?.code ?? null,
      drift: result?.summary?.drift ?? null,
      aggregateHitStats: result?.summary?.aggregate_hit_stats ?? null,
      history: result?.summary?.history ?? null,
    },
  };
}

export function runAssemblyDynamicsDataset(inputConfig = {}, options = {}) {
  return createAnimatorSimulationDatasetFromAssemblyDynamicsResult(
    runAssemblyDynamicsSimulation(inputConfig, options),
    options
  );
}
