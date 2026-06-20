export const SOLVER_APP_ADAPTERS_VERSION = "solver-app-adapters.v1";

const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_STREAM_TARGET = "caller-buffer";
const KNOWN_APP_IDS = new Set(["animator", "photon", "ideal-swarm", "causal-delay-feedback"]);
const KNOWN_RUN_KINDS = new Set([
  "motionSimulation",
  "pathHistory",
  "causalRoots",
  "phaseDiagnostics",
  "delayedHits",
  "sharedGeometry",
  "appPlayback",
  "pairInteraction",
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
  pairInteraction: "causal-delay-feedback-pair-interaction-adapter.v1",
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
  pairInteraction: ["frameBuffer", "pathStream", "diagnostics"],
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
      ...cloneRootRequestConfig(input, "photon causal-root adapter input", { allowCircularSource: true }),
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
      ...cloneRootRequestConfig(input, "ideal swarm delayed-hit adapter input", {
        allowCircularSource: true,
      }),
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
  const hasMotionRequest = input.motionRequest != null;
  const hasMotionIntegrationRequest = input.motionIntegrationRequest != null;
  if (hasMotionRequest === hasMotionIntegrationRequest) {
    throw new TypeError(
      "animator motion-simulation adapter input requires exactly one of motionRequest or motionIntegrationRequest"
    );
  }
  return createSolverRunRequest({
    ...input,
    appId: "animator",
    runKind: "motionSimulation",
    claimLevel: input.claimLevel ?? "interactive-preview",
    configVersion: input.configVersion ?? "animator-motion-simulation-adapter.v1",
    config: {
      appId: "animator",
      ...(hasMotionIntegrationRequest
        ? { motionIntegrationRequest: cloneRequiredObject(input.motionIntegrationRequest, "motionIntegrationRequest") }
        : { motionRequest: cloneRequiredObject(input.motionRequest, "motionRequest") }),
      streamId: cloneOptionalString(input.streamId, "streamId"),
      rowsPerChunk: cloneOptionalPositiveInteger(input.rowsPerChunk, "rowsPerChunk"),
      storagePolicy: cloneOptionalObject(input.storagePolicy, "storagePolicy"),
      metadata: cloneOptionalObject(input.metadata, "metadata"),
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

export function createPathHistoryStreamRequest(input) {
  requireObject(input, "path-history stream adapter input");
  return {
    runId: normalizeOptionalId(input.runId, undefined, "runId"),
    datasetId: cloneOptionalString(input.datasetId, "datasetId"),
    streamId: normalizeOptionalId(input.streamId, undefined, "streamId"),
    pathRows: cloneRequiredArray(input.pathRows, "pathRows"),
    rowsPerChunk: cloneOptionalPositiveInteger(input.rowsPerChunk, "rowsPerChunk"),
    storagePolicy: normalizeStreamStoragePolicy(input.storagePolicy, input),
    metadata: cloneOptionalObject(input.metadata, "metadata"),
  };
}

export function createAssemblyGraphDatasetRequest(input) {
  requireObject(input, "assembly graph dataset adapter input");
  return {
    assemblyStates: cloneOptionalArray(input.assemblyStates, "assemblyStates"),
    memberships: cloneOptionalArray(input.memberships, "memberships"),
    hierarchy: cloneOptionalArray(input.hierarchy, "hierarchy"),
    events: cloneOptionalArray(input.events, "events"),
    deriveMembershipEvents: cloneOptionalBoolean(
      input.deriveMembershipEvents,
      "deriveMembershipEvents"
    ),
    maxEvents: cloneOptionalPositiveInteger(input.maxEvents, "maxEvents"),
  };
}

export function createAssemblyGraphStoreRequest(input) {
  requireObject(input, "assembly graph store adapter input");
  return {
    storeId: normalizeOptionalId(input.storeId, undefined, "storeId"),
    ...createAssemblyGraphDatasetRequest(input),
    storagePolicy: normalizeAssemblyGraphStoreStoragePolicy(input.storagePolicy, input),
  };
}

export function createDescribeAssemblyGraphStoreRequest(input) {
  requireObject(input, "describe assembly graph store adapter input");
  return {
    storeId: cloneOptionalString(input.storeId, "storeId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
  };
}

export function createAssemblyGraphStoreReadRequest(input) {
  requireObject(input, "assembly graph store read adapter input");
  return {
    storeId: cloneOptionalString(input.storeId, "storeId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    layouts: cloneOptionalArray(input.layouts, "layouts"),
    rowOffset: cloneOptionalNonnegativeInteger(input.rowOffset, "rowOffset"),
    rowCount: cloneOptionalNonnegativeInteger(input.rowCount, "rowCount"),
    pathKey: cloneOptionalNonnegativeInteger(input.pathKey, "pathKey"),
    assemblyKey: cloneOptionalNonnegativeInteger(input.assemblyKey, "assemblyKey"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
    byteRange: cloneOptionalRange(input.byteRange, "byteRange"),
    maxBytes: cloneOptionalPositiveInteger(input.maxBytes, "maxBytes"),
  };
}

export function createPathHistoryStreamSpaceTimeIndexRequest(input) {
  requireObject(input, "path-history stream space-time index adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    chunkIndices: cloneOptionalArray(input.chunkIndices, "chunkIndices"),
    pathKeys: cloneOptionalArray(input.pathKeys, "pathKeys"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
    frameRange: cloneOptionalRange(input.frameRange, "frameRange"),
    byteRange: cloneOptionalRange(input.byteRange, "byteRange"),
    assemblyStates: cloneOptionalArray(input.assemblyStates, "assemblyStates"),
    options: cloneRequiredObject(input.options, "options"),
    maxRows: cloneOptionalPositiveInteger(input.maxRows, "maxRows"),
    maxBytes: cloneOptionalPositiveInteger(input.maxBytes, "maxBytes"),
  };
}

export function createOpenStreamRequest(input) {
  requireObject(input, "open stream adapter input");
  return {
    runId: cloneOptionalString(input.runId, "runId"),
    datasetId: cloneOptionalString(input.datasetId, "datasetId"),
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    purpose: normalizeOptionalString(input.purpose, "playback", "purpose"),
  };
}

export function createDescribeStreamRequest(input) {
  requireObject(input, "describe stream adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
  };
}

export function createPathHistoryDynamicReplayValidationRequest(input) {
  requireObject(input, "path-history dynamic replay validation adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    tolerance: cloneOptionalNonnegativeFiniteNumber(input.tolerance, "tolerance"),
    maxRows: cloneOptionalPositiveInteger(input.maxRows, "maxRows"),
  };
}

export function createReadStreamRangeRequest(input) {
  requireObject(input, "read stream range adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    pathIds: cloneOptionalArray(input.pathIds, "pathIds"),
    pathKeys: cloneOptionalArray(input.pathKeys, "pathKeys"),
    chunkIndices: cloneOptionalArray(input.chunkIndices, "chunkIndices"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
    frameRange: cloneOptionalRange(input.frameRange, "frameRange"),
    byteRange: cloneOptionalRange(input.byteRange, "byteRange"),
    eventKinds: cloneOptionalArray(input.eventKinds, "eventKinds"),
    maxBytes: cloneOptionalPositiveInteger(input.maxBytes, "maxBytes"),
  };
}

export function createPathHistoryStorageLifecycleRequest(input) {
  requireObject(input, "path-history storage lifecycle adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    policy: cloneRequiredObject(input.policy, "policy"),
    chunks: cloneOptionalArray(input.chunks, "chunks"),
  };
}

export function createPathHistoryStorageLifecycleApplyRequest(input) {
  requireObject(input, "path-history storage lifecycle apply adapter input");
  if (input.chunks != null) {
    throw new TypeError("path-history storage lifecycle apply requires a streamId or manifestPath, not loose chunks");
  }
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    policy: cloneRequiredObject(input.policy, "policy"),
    deleteStreamWhenAllChunksDeleted: cloneOptionalBoolean(
      input.deleteStreamWhenAllChunksDeleted,
      "deleteStreamWhenAllChunksDeleted"
    ),
  };
}

export function createPathHistoryWorkPacketPlanRequest(input) {
  requireObject(input, "path-history work-packet plan adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    runId: normalizeOptionalId(input.runId, undefined, "runId"),
    modelId: normalizeOptionalId(input.modelId, undefined, "modelId"),
    precisionPath: normalizeConcretePrecisionPath(input.precisionPath ?? "event_root_focused"),
    packetIdPrefix: cloneOptionalString(input.packetIdPrefix, "packetIdPrefix"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
    expectedOutputs: cloneOptionalArray(input.expectedOutputs, "expectedOutputs"),
    sourcePathKeys: cloneOptionalArray(input.sourcePathKeys, "sourcePathKeys"),
    receiverPathKeys: cloneOptionalArray(input.receiverPathKeys, "receiverPathKeys"),
    sourceChunkIndices: cloneOptionalArray(input.sourceChunkIndices, "sourceChunkIndices"),
    receiverChunkIndices: cloneOptionalArray(input.receiverChunkIndices, "receiverChunkIndices"),
    includeSameChunk: cloneOptionalBoolean(input.includeSameChunk, "includeSameChunk"),
    maxPacketCount: cloneOptionalPositiveInteger(input.maxPacketCount, "maxPacketCount"),
  };
}

export function createEmissionShellCandidateQueryRequest(input) {
  requireObject(input, "emission-shell candidate query adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    signalSpeed: requirePositiveFiniteNumber(input.signalSpeed, "signalSpeed"),
    tolerance: cloneOptionalNonnegativeFiniteNumber(input.tolerance, "tolerance"),
    maxCandidates: cloneOptionalPositiveInteger(input.maxCandidates, "maxCandidates"),
    sourcePathKeys: cloneOptionalArray(input.sourcePathKeys, "sourcePathKeys"),
    receiverPathKeys: cloneOptionalArray(input.receiverPathKeys, "receiverPathKeys"),
    sourceChunkIndices: cloneOptionalArray(input.sourceChunkIndices, "sourceChunkIndices"),
    receiverChunkIndices: cloneOptionalArray(input.receiverChunkIndices, "receiverChunkIndices"),
    allowSamePath: cloneOptionalBoolean(input.allowSamePath, "allowSamePath"),
    workerCount: cloneOptionalNonnegativeInteger(input.workerCount, "workerCount"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
  };
}

export function createEmissionShellRootRefinementRequest(input) {
  requireObject(input, "emission-shell root-refinement adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    candidates: copyRequiredArray(input.candidates, "candidates"),
    signalSpeed: requirePositiveFiniteNumber(input.signalSpeed, "signalSpeed"),
    tolerance: cloneOptionalNonnegativeFiniteNumber(input.tolerance, "tolerance"),
    rootTolerance: cloneOptionalPositiveFiniteNumber(input.rootTolerance, "rootTolerance"),
    maxCandidates: cloneOptionalPositiveInteger(input.maxCandidates, "maxCandidates"),
    maxIterations: cloneOptionalPositiveInteger(input.maxIterations, "maxIterations"),
    scanSubdivisions: cloneOptionalPositiveInteger(input.scanSubdivisions, "scanSubdivisions"),
    maxRootsPerCandidate: cloneOptionalPositiveInteger(input.maxRootsPerCandidate, "maxRootsPerCandidate"),
    maxHitsPerCandidate: cloneOptionalPositiveInteger(input.maxHitsPerCandidate, "maxHitsPerCandidate"),
    workerCount: cloneOptionalNonnegativeInteger(input.workerCount, "workerCount"),
  };
}

export function createEmissionShellCandidatePacketQueryRequest(input) {
  requireObject(input, "emission-shell candidate packet query adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    packet: cloneRequiredObject(input.packet, "packet"),
    signalSpeed: requirePositiveFiniteNumber(input.signalSpeed, "signalSpeed"),
    tolerance: cloneOptionalNonnegativeFiniteNumber(input.tolerance, "tolerance"),
    maxCandidates: cloneOptionalPositiveInteger(input.maxCandidates, "maxCandidates"),
    sourcePathKeys: cloneOptionalArray(input.sourcePathKeys, "sourcePathKeys"),
    receiverPathKeys: cloneOptionalArray(input.receiverPathKeys, "receiverPathKeys"),
    allowSamePath: cloneOptionalBoolean(input.allowSamePath, "allowSamePath"),
    workerCount: cloneOptionalNonnegativeInteger(input.workerCount, "workerCount"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
  };
}

export function createEmissionShellCandidatePacketBatchQueryRequest(input) {
  requireObject(input, "emission-shell candidate packet batch query adapter input");
  return {
    streamId: cloneOptionalString(input.streamId, "streamId"),
    manifestPath: cloneOptionalString(input.manifestPath, "manifestPath"),
    packets: cloneRequiredArray(input.packets, "packets"),
    signalSpeed: requirePositiveFiniteNumber(input.signalSpeed, "signalSpeed"),
    tolerance: cloneOptionalNonnegativeFiniteNumber(input.tolerance, "tolerance"),
    maxCandidatesPerPacket: cloneOptionalPositiveInteger(
      input.maxCandidatesPerPacket,
      "maxCandidatesPerPacket"
    ),
    sourcePathKeys: cloneOptionalArray(input.sourcePathKeys, "sourcePathKeys"),
    receiverPathKeys: cloneOptionalArray(input.receiverPathKeys, "receiverPathKeys"),
    allowSamePath: cloneOptionalBoolean(input.allowSamePath, "allowSamePath"),
    workerCount: cloneOptionalNonnegativeInteger(input.workerCount, "workerCount"),
    timeRange: cloneOptionalRange(input.timeRange, "timeRange"),
  };
}

export function createEmissionShellCandidatePacketMergeRequest(input) {
  requireObject(input, "emission-shell candidate packet merge adapter input");
  return {
    responses: copyRequiredArray(input.responses, "responses"),
  };
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

function cloneRootRequestConfig(input, label, options = {}) {
  const hasRootRequest = input.rootRequest != null;
  const hasNormalizedRootRequest = input.normalizedRootRequest != null;
  const hasCircularSourceRootRequest = input.circularSourceRootRequest != null;
  const hasNormalizedCircularSourceRootRequest = input.normalizedCircularSourceRootRequest != null;
  const requestCount = Number(hasRootRequest) +
    Number(hasNormalizedRootRequest) +
    Number(hasCircularSourceRootRequest) +
    Number(hasNormalizedCircularSourceRootRequest);
  const hasUnsupportedCircularSource =
    (hasCircularSourceRootRequest || hasNormalizedCircularSourceRootRequest) &&
    !options.allowCircularSource;
  if (requestCount !== 1 || hasUnsupportedCircularSource) {
    const allowed = options.allowCircularSource
      ? "rootRequest, normalizedRootRequest, circularSourceRootRequest, or normalizedCircularSourceRootRequest"
      : "rootRequest or normalizedRootRequest";
    throw new TypeError(
      `${label} must include exactly one of ${allowed}`
    );
  }
  if (hasNormalizedCircularSourceRootRequest) {
    return {
      normalizedCircularSourceRootRequest: cloneRequiredObject(
        input.normalizedCircularSourceRootRequest,
        "normalizedCircularSourceRootRequest"
      ),
    };
  }
  if (hasCircularSourceRootRequest) {
    return {
      circularSourceRootRequest: cloneRequiredObject(
        input.circularSourceRootRequest,
        "circularSourceRootRequest"
      ),
    };
  }
  if (hasNormalizedRootRequest) {
    return {
      normalizedRootRequest: cloneRequiredObject(input.normalizedRootRequest, "normalizedRootRequest"),
    };
  }
  return {
    rootRequest: cloneRequiredObject(input.rootRequest, "rootRequest"),
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

function cloneOptionalString(value, label) {
  if (value == null) {
    return undefined;
  }
  return normalizeOptionalString(value, undefined, label);
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

function copyRequiredArray(value, label) {
  if (!Array.isArray(value)) {
    throw new TypeError(`${label} must be an array`);
  }
  return value.slice();
}

function cloneOptionalRange(value, label) {
  if (value == null) {
    return undefined;
  }
  requireObject(value, label);
  requireFiniteNumber(value.start, `${label}.start`);
  requireFiniteNumber(value.end, `${label}.end`);
  if (value.end < value.start) {
    throw new TypeError(`${label}.end must be greater than or equal to ${label}.start`);
  }
  return cloneJson(value);
}

function cloneOptionalBoolean(value, label) {
  if (value == null) {
    return undefined;
  }
  if (typeof value !== "boolean") {
    throw new TypeError(`${label} must be a boolean`);
  }
  return value;
}

function cloneOptionalPositiveInteger(value, label) {
  if (value == null) {
    return undefined;
  }
  requirePositiveInteger(value, label);
  return value;
}

function cloneOptionalNonnegativeInteger(value, label) {
  if (value == null) {
    return undefined;
  }
  if (!Number.isInteger(value) || value < 0) {
    throw new TypeError(`${label} must be a nonnegative integer`);
  }
  return value;
}

function cloneOptionalNonnegativeFiniteNumber(value, label) {
  if (value == null) {
    return undefined;
  }
  requireFiniteNumber(value, label);
  if (value < 0) {
    throw new TypeError(`${label} must be nonnegative`);
  }
  return value;
}

function cloneOptionalPositiveFiniteNumber(value, label) {
  if (value == null) {
    return undefined;
  }
  return requirePositiveFiniteNumber(value, label);
}

function normalizeStreamStoragePolicy(storagePolicy, input) {
  if (storagePolicy != null) {
    return cloneRequiredObject(storagePolicy, "storagePolicy");
  }
  return {
    target: DEFAULT_STREAM_TARGET,
    durable: false,
    maxBytes: input.memoryBudgetBytes ?? DEFAULT_MEMORY_BUDGET_BYTES,
  };
}

function normalizeAssemblyGraphStoreStoragePolicy(storagePolicy, input) {
  if (storagePolicy != null) {
    return cloneRequiredObject(storagePolicy, "storagePolicy");
  }
  return {
    target: "native-file",
    durable: true,
    maxBytes: input.memoryBudgetBytes ?? 0,
  };
}

function normalizeConcretePrecisionPath(value) {
  const precisionPath = normalizeOptionalString(value, undefined, "precisionPath");
  if (precisionPath === "auto") {
    throw new TypeError("precisionPath must be concrete for work-packet planning");
  }
  return precisionPath;
}

function requirePositiveFiniteNumber(value, label) {
  requireFiniteNumber(value, label);
  if (value <= 0) {
    throw new TypeError(`${label} must be greater than zero`);
  }
  return value;
}

function requireFiniteNumber(value, label) {
  if (!Number.isFinite(value)) {
    throw new TypeError(`${label} must be a finite number`);
  }
  return value;
}

function requirePositiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new TypeError(`${label} must be a positive integer`);
  }
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
