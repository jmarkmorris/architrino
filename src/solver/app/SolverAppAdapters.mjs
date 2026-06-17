export const SOLVER_APP_ADAPTERS_VERSION = "solver-app-adapters.v1";

const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_STREAM_TARGET = "caller-buffer";
const KNOWN_APP_IDS = new Set(["animator", "photon", "ideal-swarm"]);
const KNOWN_RUN_KINDS = new Set([
  "motionSimulation",
  "pathHistory",
  "causalRoots",
  "phaseDiagnostics",
  "delayedHits",
  "sharedGeometry",
  "appPlayback",
  "validationReplay",
]);
const DEFAULT_CONFIG_VERSION_BY_RUN_KIND = Object.freeze({
  motionSimulation: "animator-motion-simulation-adapter.v1",
  pathHistory: "path-history-adapter.v1",
  causalRoots: "photon-causal-roots-adapter.v1",
  phaseDiagnostics: "photon-phase-diagnostics-adapter.v1",
  delayedHits: "ideal-swarm-delayed-hits-adapter.v1",
  sharedGeometry: "shared-geometry-adapter.v1",
  appPlayback: "animator-app-playback-adapter.v1",
  validationReplay: "validation-replay-adapter.v1",
});
const DEFAULT_OUTPUTS_BY_RUN_KIND = Object.freeze({
  motionSimulation: ["frameBuffer", "diagnostics"],
  pathHistory: ["pathStream", "diagnostics"],
  causalRoots: ["rootLedger", "delayedHitEvents", "diagnostics"],
  phaseDiagnostics: ["phaseAtHit", "diagnostics"],
  delayedHits: ["rootLedger", "delayedHitEvents", "diagnostics"],
  sharedGeometry: ["geometryBuffer", "diagnostics"],
  appPlayback: ["summary", "diagnostics"],
  validationReplay: ["validationArtifacts", "diagnostics"],
});

export function createSolverRunRequest(input) {
  requireObject(input, "solver adapter input");
  const appId = requireKnownValue(input.appId, KNOWN_APP_IDS, "appId");
  const runKind = requireKnownValue(input.runKind, KNOWN_RUN_KINDS, "runKind");
  const runId = normalizeOptionalId(input.runId, `${appId}-${runKind}-run`, "runId");
  const request = {
    requestId: normalizeOptionalId(input.requestId, `${runId}-request`, "requestId"),
    runId,
    datasetId: normalizeOptionalId(input.datasetId, `${runId}-dataset`, "datasetId"),
    appId,
    runKind,
    claimLevel: normalizeOptionalString(input.claimLevel, defaultClaimLevelFor(runKind), "claimLevel"),
    precisionPath: normalizeOptionalString(input.precisionPath, "auto", "precisionPath"),
    configVersion: normalizeOptionalString(
      input.configVersion,
      DEFAULT_CONFIG_VERSION_BY_RUN_KIND[runKind],
      "configVersion"
    ),
    model: cloneRequiredObject(input.model, "model"),
    envelope: cloneRequiredObject(input.envelope, "envelope"),
    errorBudget: cloneRequiredObject(input.errorBudget, "errorBudget"),
    config: cloneRequiredObject(input.config, "config"),
    output: normalizeOutputRequest(input.output, runKind, input),
  };
  if (input.configHash != null) {
    request.configHash = normalizeOptionalString(input.configHash, undefined, "configHash");
  }
  return request;
}

export function createPhotonCausalRootsRunRequest(input) {
  requireObject(input, "photon causal-root adapter input");
  return createSolverRunRequest({
    ...input,
    appId: "photon",
    runKind: "causalRoots",
    claimLevel: input.claimLevel ?? "migration-parity",
    configVersion: input.configVersion ?? "photon-causal-roots-adapter.v1",
    config: {
      appId: "photon",
      rootRequest: cloneRequiredObject(input.rootRequest, "rootRequest"),
    },
  });
}

export function createPhotonPhaseDiagnosticsRunRequest(input) {
  requireObject(input, "photon phase-diagnostics adapter input");
  return createSolverRunRequest({
    ...input,
    appId: "photon",
    runKind: "phaseDiagnostics",
    claimLevel: input.claimLevel ?? "migration-parity",
    configVersion: input.configVersion ?? "photon-phase-diagnostics-adapter.v1",
    config: {
      appId: "photon",
      phaseRequest: cloneRequiredObject(input.phaseRequest, "phaseRequest"),
    },
  });
}

export function createIdealSwarmDelayedHitsRunRequest(input) {
  requireObject(input, "ideal swarm delayed-hit adapter input");
  return createSolverRunRequest({
    ...input,
    appId: "ideal-swarm",
    runKind: "delayedHits",
    claimLevel: input.claimLevel ?? "migration-parity",
    configVersion: input.configVersion ?? "ideal-swarm-delayed-hits-adapter.v1",
    config: {
      appId: "ideal-swarm",
      rootRequest: cloneRequiredObject(input.rootRequest, "rootRequest"),
    },
  });
}

export function createIdealSwarmSharedGeometryRunRequest(input) {
  requireObject(input, "ideal swarm shared-geometry adapter input");
  return createSolverRunRequest({
    ...input,
    appId: "ideal-swarm",
    runKind: "sharedGeometry",
    claimLevel: input.claimLevel ?? "migration-parity",
    configVersion: input.configVersion ?? "ideal-swarm-shared-geometry-adapter.v1",
    config: {
      appId: "ideal-swarm",
      geometryRequest: cloneRequiredObject(input.geometryRequest, "geometryRequest"),
    },
  });
}

export function createAnimatorMotionSimulationRunRequest(input) {
  requireObject(input, "animator motion-simulation adapter input");
  return createSolverRunRequest({
    ...input,
    appId: "animator",
    runKind: "motionSimulation",
    claimLevel: input.claimLevel ?? "interactive-preview",
    configVersion: input.configVersion ?? "animator-motion-simulation-adapter.v1",
    config: {
      appId: "animator",
      motionRequest: cloneRequiredObject(input.motionRequest, "motionRequest"),
    },
  });
}

export function createPathHistoryRunRequest(input) {
  requireObject(input, "path-history adapter input");
  const appId = input.appId ?? "animator";
  return createSolverRunRequest({
    ...input,
    appId,
    runKind: "pathHistory",
    claimLevel: input.claimLevel ?? "interactive-preview",
    configVersion: input.configVersion ?? `${appId}-path-history-adapter.v1`,
    config: {
      appId,
      streamId: input.streamId,
      pathRows: cloneRequiredArray(input.pathRows, "pathRows"),
      rowsPerChunk: input.rowsPerChunk,
      storagePolicy: cloneOptionalObject(input.storagePolicy, "storagePolicy"),
      metadata: cloneOptionalObject(input.metadata, "metadata"),
    },
  });
}

export function createAnimatorAppPlaybackRunRequest(input) {
  requireObject(input, "animator app-playback adapter input");
  return createSolverRunRequest({
    ...input,
    appId: "animator",
    runKind: "appPlayback",
    claimLevel: input.claimLevel ?? "interactive-preview",
    configVersion: input.configVersion ?? "animator-app-playback-adapter.v1",
    config: {
      appId: "animator",
      sourceRunId: input.sourceRunId,
      sourceDatasetId: input.sourceDatasetId,
      frames: cloneOptionalArray(input.frames, "frames"),
      roots: cloneOptionalArray(input.roots, "roots"),
      hits: cloneOptionalArray(input.hits, "hits"),
      geometry: cloneOptionalObject(input.geometry, "geometry"),
      diagnostics: cloneOptionalArray(input.diagnostics, "diagnostics"),
    },
    output: input.output ?? createDefaultPlaybackOutput(input),
  });
}

export function createSharedGeometryRunRequest(input) {
  requireObject(input, "shared-geometry adapter input");
  const appId = input.appId ?? "animator";
  return createSolverRunRequest({
    ...input,
    appId,
    runKind: "sharedGeometry",
    claimLevel: input.claimLevel ?? "interactive-preview",
    configVersion: input.configVersion ?? `${appId}-shared-geometry-adapter.v1`,
    config: {
      appId,
      geometryRequest: cloneRequiredObject(input.geometryRequest, "geometryRequest"),
    },
  });
}

export function createValidationReplayRunRequest(input) {
  requireObject(input, "validation-replay adapter input");
  const appId = input.appId ?? "animator";
  return createSolverRunRequest({
    ...input,
    appId,
    runKind: "validationReplay",
    claimLevel: input.claimLevel ?? "validation-evidence",
    precisionPath: input.precisionPath ?? "auto",
    configVersion: input.configVersion ?? `${appId}-validation-replay-adapter.v1`,
    config: {
      appId,
      baselineRunId: input.baselineRunId,
      baselineArtifactHash: input.baselineArtifactHash,
      replayPrecisionPath: input.replayPrecisionPath,
      compareLayouts: cloneRequiredArray(input.compareLayouts, "compareLayouts"),
      baselineResponse: cloneRequiredObject(input.baselineResponse, "baselineResponse"),
      candidateResponse: cloneRequiredObject(input.candidateResponse, "candidateResponse"),
      tolerance: input.tolerance,
      refinementTolerance: input.refinementTolerance,
    },
  });
}

function createDefaultPlaybackOutput(input) {
  const outputs = ["summary", "diagnostics"];
  if (Array.isArray(input.frames) && input.frames.length > 0) {
    outputs.splice(1, 0, "frameBuffer");
  }
  if (Array.isArray(input.roots) && input.roots.length > 0) {
    outputs.splice(outputs.length - 1, 0, "rootLedger");
  }
  if (Array.isArray(input.hits) && input.hits.length > 0) {
    outputs.splice(outputs.length - 1, 0, "delayedHitEvents");
  }
  if (input.geometry != null) {
    outputs.splice(outputs.length - 1, 0, "geometryBuffer");
  }
  return {
    outputs: unique(outputs),
    streamTarget: DEFAULT_STREAM_TARGET,
    memoryBudgetBytes: input.memoryBudgetBytes ?? DEFAULT_MEMORY_BUDGET_BYTES,
    deterministic: input.deterministic ?? true,
  };
}

function normalizeOutputRequest(output, runKind, input) {
  if (output != null) {
    return cloneRequiredObject(output, "output");
  }
  return {
    outputs: DEFAULT_OUTPUTS_BY_RUN_KIND[runKind].slice(),
    streamTarget: input.streamTarget ?? DEFAULT_STREAM_TARGET,
    memoryBudgetBytes: input.memoryBudgetBytes ?? DEFAULT_MEMORY_BUDGET_BYTES,
    deterministic: input.deterministic ?? true,
  };
}

function defaultClaimLevelFor(runKind) {
  return runKind === "validationReplay" ? "validation-evidence" : "interactive-preview";
}

function requireKnownValue(value, knownValues, label) {
  if (!knownValues.has(value)) {
    throw new TypeError(`${label} must be a known solver value`);
  }
  return value;
}

function normalizeOptionalId(value, fallback, label) {
  return normalizeOptionalString(value, fallback, label);
}

function normalizeOptionalString(value, fallback, label) {
  const nextValue = value ?? fallback;
  if (typeof nextValue !== "string" || nextValue.length === 0) {
    throw new TypeError(`${label} must be a non-empty string`);
  }
  return nextValue;
}

function cloneRequiredObject(value, label) {
  requireObject(value, label);
  return cloneJson(value);
}

function cloneOptionalObject(value, label) {
  if (value == null) {
    return undefined;
  }
  return cloneRequiredObject(value, label);
}

function cloneRequiredArray(value, label) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${label} must be an array`);
  }
  return cloneJson(value);
}

function cloneOptionalArray(value, label) {
  if (value == null) {
    return undefined;
  }
  return cloneRequiredArray(value, label);
}

function requireObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new TypeError(`${label} is required`);
  }
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function unique(values) {
  return Array.from(new Set(values));
}
