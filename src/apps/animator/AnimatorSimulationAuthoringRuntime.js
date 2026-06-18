import { getAnimatorSimulationDataset } from "./AnimatorSimulationPlaybackRuntime.js";
import { ANIMATOR_SOLVER_BRIDGE_ENGINE_ID } from "./AnimatorSimulationWorkerProtocolRuntime.js";

export const DEFAULT_ANIMATOR_SIMULATION_AUTHORING_DRAFT = Object.freeze({
  duration: 6,
  loop: false,
  steps: 600,
  dt: 0.01,
  stride: 10,
  particles: 6,
  radius: 1,
  radialSpeed: 0,
  tangentialSpeed: 0.55,
  driftX: 0.035,
  driftY: -0.018,
  cf: 1,
  kappa: 0.02,
  historyMode: "adaptive",
  rootHaltPolicy: "all",
  claimLevel: "solver-derived-diagnostic",
  datasetId: "",
  solverEngine: "",
  solverBridge: null,
});

const HISTORY_MODES = Object.freeze(["adaptive", "deep", "fixed"]);
const ROOT_HALT_POLICIES = Object.freeze(["all", "partner", "none"]);

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizePositiveNumber(value, fallback = 0, min = 0) {
  const number = normalizeNumber(value, fallback);
  return number > min ? number : fallback;
}

function normalizeNonNegativeNumber(value, fallback = 0) {
  const number = normalizeNumber(value, fallback);
  return number >= 0 ? number : fallback;
}

function normalizeInteger(value, fallback = 0, min = 0) {
  const number = Math.round(normalizeNumber(value, fallback));
  return number >= min ? number : fallback;
}

function normalizeString(value, fallback = "") {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
}

function normalizeChoice(value, allowedValues, fallback) {
  const normalized = normalizeString(value, fallback);
  return allowedValues.includes(normalized) ? normalized : fallback;
}

function normalizeSolverEngine(value, fallback = "") {
  const normalized = normalizeString(value, fallback);
  if (
    normalized === ANIMATOR_SOLVER_BRIDGE_ENGINE_ID ||
    normalized === "solver-app-bridge"
  ) {
    return ANIMATOR_SOLVER_BRIDGE_ENGINE_ID;
  }
  return "";
}

function normalizeSolverBridgeConfig(config = {}, defaults = {}) {
  const bridge = config.solverBridge && typeof config.solverBridge === "object"
    ? config.solverBridge
    : {};
  const defaultBridge = defaults.solverBridge && typeof defaults.solverBridge === "object"
    ? defaults.solverBridge
    : {};
  const solverEngine = normalizeSolverEngine(config.solverEngine, defaults.solverEngine);
  const requestedEnabled =
    bridge.enabled === true ||
    (bridge.enabled !== false && defaultBridge.enabled === true) ||
    (bridge.enabled !== false && solverEngine === ANIMATOR_SOLVER_BRIDGE_ENGINE_ID);
  if (!requestedEnabled) {
    return null;
  }
  return {
    ...defaultBridge,
    ...bridge,
    enabled: true,
  };
}

function getSceneId(documentData = {}) {
  return normalizeString(documentData?.scene?.id, "animator_scene");
}

function getSceneTimeWindow(documentData = {}) {
  const time = documentData?.scene?.time && typeof documentData.scene.time === "object"
    ? documentData.scene.time
    : {};
  const start = normalizeNumber(time.start, 0);
  const end = normalizeNumber(time.end, start);
  return {
    start,
    end: end > start ? end : start,
    loop: time.loop === true,
  };
}

function getWorkerMetadata(documentData = {}) {
  const metadata = documentData?.metadata && typeof documentData.metadata === "object"
    ? documentData.metadata
    : {};
  const worker = metadata.simulationWorker && typeof metadata.simulationWorker === "object"
    ? metadata.simulationWorker
    : {};
  const legacyRun = metadata.simulationRun && typeof metadata.simulationRun === "object"
    ? metadata.simulationRun
    : {};
  const config = worker.config && typeof worker.config === "object"
    ? worker.config
    : legacyRun.config && typeof legacyRun.config === "object"
      ? legacyRun.config
      : {};
  const datasetOptions =
    worker.datasetOptions && typeof worker.datasetOptions === "object"
      ? worker.datasetOptions
      : legacyRun.datasetOptions && typeof legacyRun.datasetOptions === "object"
        ? legacyRun.datasetOptions
        : {};
  return { worker, config, datasetOptions };
}

function getDatasetTime(dataset = null) {
  const time = dataset?.simulation?.time && typeof dataset.simulation.time === "object"
    ? dataset.simulation.time
    : {};
  return {
    start: normalizeNumber(time.start, 0),
    end: normalizeNumber(time.end, 0),
    dt: normalizeNumber(time.dt, 0),
    sampleStride: normalizeInteger(time.sampleStride, 1, 1),
  };
}

function getDatasetSolver(dataset = null) {
  return dataset?.simulation?.solver && typeof dataset.simulation.solver === "object"
    ? dataset.simulation.solver
    : {};
}

function shouldSeedWorkerControlsFromDataset(dataset = null) {
  if (!dataset) {
    return false;
  }
  const claimLevel = normalizeString(dataset.claimLevel, "");
  const haltStatus = normalizeString(dataset.simulation?.halt?.status, "");
  return claimLevel !== "fixture-only" && haltStatus !== "not-run";
}

export function createAnimatorSimulationAuthoringDraft(documentData = {}, overrides = {}) {
  const defaults = {
    ...DEFAULT_ANIMATOR_SIMULATION_AUTHORING_DRAFT,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
  const sceneTime = getSceneTimeWindow(documentData);
  const dataset = getAnimatorSimulationDataset(documentData);
  const datasetTime = getDatasetTime(dataset);
  const datasetSolver = getDatasetSolver(dataset);
  const seedFromDataset = shouldSeedWorkerControlsFromDataset(dataset);
  const { config, datasetOptions } = getWorkerMetadata(documentData);
  const sceneDuration = sceneTime.end > sceneTime.start ? sceneTime.end - sceneTime.start : 0;
  const datasetDuration =
    datasetTime.end > datasetTime.start ? datasetTime.end - datasetTime.start : 0;
  const dt = normalizePositiveNumber(
    config.dt ?? (seedFromDataset ? datasetTime.dt : null),
    defaults.dt,
    0
  );
  const duration = normalizePositiveNumber(
    config.duration ?? sceneDuration ?? datasetDuration,
    defaults.duration,
    0
  );
  const inferredSteps = dt > 0 ? Math.max(1, Math.ceil(duration / dt)) : defaults.steps;
  const datasetIdFallback = `${getSceneId(documentData)}_worker_dataset`;
  const solverEngine = normalizeSolverEngine(config.solverEngine, defaults.solverEngine);
  const solverBridge = normalizeSolverBridgeConfig(config, defaults);

  return {
    duration,
    loop: config.loop === true || sceneTime.loop === true,
    steps: normalizeInteger(config.steps, inferredSteps, 1),
    dt,
    stride: normalizeInteger(
      config.stride ?? (seedFromDataset ? datasetTime.sampleStride : null),
      defaults.stride,
      1
    ),
    particles: normalizeInteger(
      config.particles,
      seedFromDataset && Array.isArray(dataset?.particles) && dataset.particles.length
        ? dataset.particles.length
        : defaults.particles,
      1
    ),
    radius: normalizePositiveNumber(config.radius, defaults.radius, 0),
    radialSpeed: normalizeNumber(config.radialSpeed, defaults.radialSpeed),
    tangentialSpeed: normalizeNumber(config.tangentialSpeed, defaults.tangentialSpeed),
    driftX: normalizeNumber(config.driftX, defaults.driftX),
    driftY: normalizeNumber(config.driftY, defaults.driftY),
    cf: normalizePositiveNumber(
      config.cf ??
        config.fieldSpeed ??
        (seedFromDataset ? dataset?.simulation?.fieldSpeed ?? datasetSolver.cf : null),
      defaults.cf,
      0
    ),
    kappa: normalizeNumber(
      config.kappa ?? (seedFromDataset ? datasetSolver.kappa : null),
      defaults.kappa
    ),
    historyMode: normalizeChoice(
      config.historyMode ?? (seedFromDataset ? datasetSolver.historyMode : null),
      HISTORY_MODES,
      defaults.historyMode
    ),
    rootHaltPolicy: normalizeChoice(
      config.rootHaltPolicy ?? (seedFromDataset ? datasetSolver.rootHaltPolicy : null),
      ROOT_HALT_POLICIES,
      defaults.rootHaltPolicy
    ),
    claimLevel: normalizeString(datasetOptions.claimLevel, defaults.claimLevel),
    datasetId: normalizeString(datasetOptions.id, datasetIdFallback),
    solverEngine: solverBridge ? solverEngine || ANIMATOR_SOLVER_BRIDGE_ENGINE_ID : "",
    solverBridge,
  };
}

export function normalizeAnimatorSimulationAuthoringDraft(draft = {}, documentData = {}) {
  const fallback = createAnimatorSimulationAuthoringDraft(documentData);
  return createAnimatorSimulationAuthoringDraft(
    {
      scene: {
        id: getSceneId(documentData),
        time: {
          start: 0,
          end: normalizePositiveNumber(draft.duration, fallback.duration, 0),
          loop: draft.loop === true,
        },
      },
      metadata: {
        simulationWorker: {
          config: draft,
          datasetOptions: {
            id: draft.datasetId,
            claimLevel: draft.claimLevel,
          },
        },
      },
    },
    fallback
  );
}

export function buildAnimatorSimulationAuthoringWorkerPayload(draft = {}, documentData = {}) {
  const normalized = normalizeAnimatorSimulationAuthoringDraft(draft, documentData);
  const config = {
    steps: normalized.steps,
    dt: normalized.dt,
    stride: normalized.stride,
    particles: normalized.particles,
    radius: normalized.radius,
    radialSpeed: normalized.radialSpeed,
    tangentialSpeed: normalized.tangentialSpeed,
    driftX: normalized.driftX,
    driftY: normalized.driftY,
    cf: normalized.cf,
    kappa: normalized.kappa,
    shellK: 0,
    historyMode: normalized.historyMode,
    rootHaltPolicy: normalized.rootHaltPolicy,
  };
  if (normalized.solverBridge) {
    config.solverEngine = normalized.solverEngine || ANIMATOR_SOLVER_BRIDGE_ENGINE_ID;
    config.solverBridge = normalized.solverBridge;
  }
  return {
    config,
    datasetOptions: {
      id: normalized.datasetId,
      claimLevel: normalized.claimLevel,
    },
  };
}

export function applyAnimatorSimulationAuthoringDraftToDocument(documentData = {}, draft = {}) {
  const normalized = normalizeAnimatorSimulationAuthoringDraft(draft, documentData);
  const payload = buildAnimatorSimulationAuthoringWorkerPayload(normalized, documentData);
  const scene = documentData?.scene && typeof documentData.scene === "object"
    ? documentData.scene
    : {};
  const sceneTime = scene.time && typeof scene.time === "object" ? scene.time : {};
  const metadata = documentData?.metadata && typeof documentData.metadata === "object"
    ? documentData.metadata
    : {};
  const simulationWorker =
    metadata.simulationWorker && typeof metadata.simulationWorker === "object"
      ? metadata.simulationWorker
      : {};

  return {
    ...documentData,
    scene: {
      ...scene,
      mode: scene.mode ?? "planar-2d",
      time: {
        ...sceneTime,
        start: normalizeNumber(sceneTime.start, 0),
        end: normalizeNumber(sceneTime.start, 0) + normalized.duration,
        loop: normalized.loop,
      },
    },
    metadata: {
      ...metadata,
      simulationWorker: {
        ...simulationWorker,
        config: payload.config,
        datasetOptions: payload.datasetOptions,
      },
    },
  };
}

function summarizeAggregateHitStats(stats = null) {
  if (!stats || typeof stats !== "object") {
    return "";
  }
  const totalPartnerHits = normalizeInteger(stats.total_partner_hits, 0, 0);
  const totalSelfHits = normalizeInteger(stats.total_self_hits, 0, 0);
  const unresolvedRoots = normalizeInteger(stats.total_unresolved_roots, 0, 0);
  const maxRootsPerPair = normalizeInteger(stats.max_roots_per_pair, 0, 0);
  return `${totalPartnerHits} partner / ${totalSelfHits} self / ${unresolvedRoots} unresolved / max ${maxRootsPerPair}`;
}

export function summarizeAnimatorSimulationAuthoringDataset(documentData = {}) {
  const dataset = getAnimatorSimulationDataset(documentData);
  const metadata = documentData?.metadata && typeof documentData.metadata === "object"
    ? documentData.metadata
    : {};
  const lastRun = metadata.simulationWorker?.lastRun ?? null;
  if (!dataset) {
    return {
      hasDataset: false,
      rows: [
        ["Dataset", "none"],
        ["Last Run", lastRun?.status ?? "not run"],
      ],
    };
  }
  const simulation = dataset.simulation && typeof dataset.simulation === "object"
    ? dataset.simulation
    : {};
  const datasetTime = getDatasetTime(dataset);
  const solver = getDatasetSolver(dataset);
  const aggregateHitStats = summarizeAggregateHitStats(dataset.diagnostics?.aggregateHitStats);
  const engineId = normalizeString(
    dataset.provenance?.engineId ??
      dataset.provenance?.engine?.id ??
      solver.engineId ??
      solver.id,
    "unknown"
  );
  const rows = [
    ["Dataset", normalizeString(dataset.id, "unnamed")],
    ["Claim", normalizeString(dataset.claimLevel, "unspecified")],
    ["Mode", `${normalizeString(simulation.mode, "unknown")} / ${normalizeInteger(simulation.dimensions, 0, 0)}D`],
    ["Time", `${datasetTime.start.toFixed(2)}s - ${datasetTime.end.toFixed(2)}s`],
    ["Frames", String(Array.isArray(dataset.frames) ? dataset.frames.length : 0)],
    ["Particles", String(Array.isArray(dataset.particles) ? dataset.particles.length : 0)],
    ["Shells", String(Array.isArray(dataset.fieldShells) ? dataset.fieldShells.length : 0)],
    ["Delayed Hits", String(Array.isArray(dataset.delayedHits) ? dataset.delayedHits.length : 0)],
    ["Halt", normalizeString(simulation.halt?.status, "unknown")],
    ["Engine", engineId],
  ];
  if (aggregateHitStats) {
    rows.push(["Hit Stats", aggregateHitStats]);
  }
  if (lastRun && typeof lastRun === "object") {
    rows.push(["Last Run", `${lastRun.status ?? "unknown"} / ${lastRun.frameCount ?? 0} frames`]);
  }
  return {
    hasDataset: true,
    rows,
  };
}
