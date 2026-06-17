export const SOLVER_APP_BRIDGE_API_VERSION = "solver-app-bridge.v1";

const DEFAULT_PRECISION_PATHS = [
  "auto",
  "scaled_f64_fast",
  "scaled_f64_strict",
  "adaptive_multirate",
  "event_root_focused",
  "extended_precision",
  "validation_replay",
];

const DEFAULT_OUTPUT_LAYOUTS = [
  "frame_buffer.v1",
  "path_segment.v1",
  "assembly_state.v1",
  "assembly_membership.v1",
  "assembly_hierarchy.v1",
  "assembly_events.v1",
  "path_chunk.v1",
  "root_ledger.v1",
  "root_ledger_detail.v1",
  "delayed_hit_events.v1",
  "phase_at_hit.v1",
  "spacetime_index.v1",
  "stream_index.v1",
];

const PRECISION_PATH_BY_ID = DEFAULT_PRECISION_PATHS;
const NUMERIC_TYPE_BY_ID = ["f64", "scaled_i64", "interval_f64_pair", "decimal128", "mp_limb_block"];
const STATUS_CODE_BY_ID = [
  "ok",
  "cancelled",
  "baseline_within_tolerance",
  "baseline_refined_result",
  "baseline_model_boundary_difference",
  "baseline_investigation_required_mismatch",
  "precision_escalated",
  "precision_failed",
  "simulation_envelope_exceeded",
  "insufficient_history_depth",
  "insufficient_scale_resolution",
  "time_resolution_insufficient",
  "root_not_bracketed",
  "root_unresolved",
  "small_jacobian",
  "transversality_floor_failed",
  "ledger_rerun_required",
  "stream_memory_pressure",
  "stream_write_failed",
  "stream_read_failed",
  "unsupported_browser_storage",
  "unsupported_wasm_threads",
  "validation_replay_mismatch",
  "app_contract_error",
  "internal_solver_error",
];
const DEFAULT_CAPABILITY_ENVELOPE = {
  maxInteractiveEntities: 2048,
  maxBatchEntities: 200000,
  minMemoryBudgetBytes: 16 * 1024 * 1024,
  minStorageBudgetBytesForStreaming: 64 * 1024 * 1024,
  minimumPositiveTolerance: 1e-15,
};
const CAUSAL_ROOT_REQUEST_F64_BYTES = 176;
const CAUSAL_ROOT_ROW_F64_BYTES = 112;
const ROOT_LEDGER_DETAIL_ROW_F64_BYTES = 192;
const DELAYED_HIT_ROW_F64_BYTES = 128;
const CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES = 24;
const PRECISION_DIAGNOSTIC_ROW_F64_BYTES = 96;
const MOTION_SAMPLE_REQUEST_F64_BYTES = 112;
const PHASE_CLOCK_F64_BYTES = 24;
const PHASE_AT_HIT_ROW_F64_BYTES = 72;
const FRAME_BUFFER_ROW_F64_BYTES = 88;
const GEOMETRY_BOUNDS_ROW_F64_BYTES = 64;
const SPHERE_POINT_INTERSECTION_REQUEST_F64_BYTES = 64;
const SPHERE_POINT_INTERSECTION_ROW_F64_BYTES = 24;
const ASSEMBLY_STATE_ROW_F64_BYTES = 112;
const ASSEMBLY_MEMBERSHIP_ROW_F64_BYTES = 80;
const ASSEMBLY_HIERARCHY_ROW_F64_BYTES = 56;
const ASSEMBLY_EVENT_ROW_F64_BYTES = 88;
const PATH_HISTORY_ROW_F64_BYTES = 96;
const SPACETIME_INDEX_OPTIONS_F64_BYTES = 24;
const SPACETIME_INDEX_ROW_F64_BYTES = 128;
const SPACETIME_QUERY_F64_BYTES = 96;
const DEFAULT_MAX_CAUSAL_ROOTS = 64;
const DEFAULT_MAX_ROOT_LEDGER_DETAIL_ROWS = 4096;
const DEFAULT_MAX_MOTION_FRAMES = 65536;
const DEFAULT_MAX_SPACETIME_INDEX_ROWS = 65536;
const ABI_INFO_BYTES = 80;

export class SolverBridgeError extends Error {
  constructor(status) {
    super(status.message);
    this.name = "SolverBridgeError";
    this.status = status;
  }
}

export function createSolverAppBridgeClient(options = {}) {
  const state = {
    appId: null,
    apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
    createWasmModule: options.createWasmModule || null,
    locateFile: options.locateFile || null,
    modulePromise: null,
    module: null,
    abiInfo: null,
    streams: new Map(),
    runs: new Map(),
    nextRunSequence: 1,
    disposed: false,
    capabilities: createCapabilities(Boolean(options.createWasmModule)),
  };

  return {
    async init(request) {
      assertNotDisposed(state);
      const validation = validateInitRequest(request);
      if (validation.code !== "ok") {
        throw new SolverBridgeError(validation);
      }
      state.appId = request.appId;
      state.apiVersion = request.apiVersion;

      if (state.createWasmModule) {
        state.module = await loadWasmModule(state);
        runExportedSmoke(state.module, "architrino_solver_smoke");
        runExportedSmoke(state.module, "architrino_solver_contract_smoke");
        runExportedSmoke(state.module, "architrino_solver_root_smoke");
        state.abiInfo = readAbiInfo(state.module);
        assertAbiInfo(state.abiInfo);
        state.capabilities = {
          ...state.capabilities,
          abiInfo: state.abiInfo,
        };
      }

      return {
        apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
        solverVersion: "0.1.0",
        capabilities: state.capabilities,
        status: createStatus("ok", "ok", "solver bridge initialized"),
      };
    },

    async capabilities() {
      assertNotDisposed(state);
      return state.capabilities;
    },

    async runSimulation(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return runSimulationWithModule(state, module, request, state.abiInfo || defaultAbiInfo());
    },

    async admitSimulationEnvelope(request) {
      assertNotDisposed(state);
      return admitSimulationEnvelope(request);
    },

    async diagnosePrecisionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return diagnosePrecisionF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveCausalRootsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCausalRootsF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveCausalRootBatchF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return solveCausalRootBatchF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async solveRootsAndHitsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      const response = solveRootsAndHitsF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
      registerResponseStreams(state, response);
      return response;
    },

    async buildRootLedgerDetailF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return buildRootLedgerDetailF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async computePhaseAtHitF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return computePhaseAtHitF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async computeSharedGeometryF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return computeSharedGeometryF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async detectAssemblyMembershipEventsF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return detectAssemblyMembershipEventsF64WithModule(
        module,
        request,
        state.abiInfo || defaultAbiInfo()
      );
    },

    async buildSpaceTimeIndexF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return buildSpaceTimeIndexF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async querySpaceTimeIndexF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return querySpaceTimeIndexF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async sampleLinearMotionF64(request) {
      assertNotDisposed(state);
      const module = await requireWasmModule(state);
      return sampleLinearMotionF64WithModule(module, request, state.abiInfo || defaultAbiInfo());
    },

    async cancelRun(request = {}) {
      assertNotDisposed(state);
      return createStatus("cancelled", "info", request.reason || "run cancellation acknowledged", {
        runId: request.runId,
        requestId: request.requestId,
      });
    },

    async openStream(request = {}) {
      assertNotDisposed(state);
      return openRegisteredStream(state, request);
    },

    async readStreamRange(request = {}) {
      assertNotDisposed(state);
      return readRegisteredStreamRange(state, request);
    },

    async closeRun(request = {}) {
      assertNotDisposed(state);
      if (request.releaseStreams) {
        state.streams.clear();
        state.runs.delete(request.runId);
      }
      return createStatus("ok", "ok", "run resources released", {
        runId: request.runId,
      });
    },

    async dispose() {
      state.disposed = true;
      state.module = null;
      state.modulePromise = null;
      state.streams.clear();
      state.runs.clear();
    },
  };
}

function createCapabilities(hasWasmModuleFactory) {
  return {
    precisionPaths: DEFAULT_PRECISION_PATHS,
    outputLayouts: DEFAULT_OUTPUT_LAYOUTS,
    storage: {
      supportsOpfs: typeof navigator !== "undefined" && Boolean(navigator.storage?.getDirectory),
      supportsNativeFile: false,
      supportsCallerBuffer: true,
      maxRecommendedBytes: 64 * 1024 * 1024,
    },
    threading: {
      nativeThreads: false,
      wasmThreads: false,
      browserWorker: typeof Worker !== "undefined",
      crossOriginIsolationRequired: true,
    },
    maxTransferBytes: 64 * 1024 * 1024,
    wasmModuleFactory: hasWasmModuleFactory,
  };
}

function validateInitRequest(request) {
  if (!request || typeof request !== "object") {
    return createStatus("app_contract_error", "error", "init request object is required", {
      recoverable: false,
    });
  }
  if (!["animator", "photon", "ideal-swarm"].includes(request.appId)) {
    return createStatus("app_contract_error", "error", "known app id is required", {
      recoverable: false,
    });
  }
  if (!request.apiVersion) {
    return createStatus("app_contract_error", "error", "api version is required", {
      recoverable: false,
    });
  }
  if (!request.storagePolicy || !request.threadingPolicy) {
    return createStatus(
      "app_contract_error",
      "error",
      "storage policy and threading policy are required",
      { recoverable: false }
    );
  }
  return createStatus("ok", "ok", "init request accepted");
}

function admitSimulationEnvelope(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "admission request object is required", {
        recoverable: false,
      })
    );
  }

  const capability = {
    ...DEFAULT_CAPABILITY_ENVELOPE,
    ...(request.capability || {}),
  };
  const statuses = [
    ...validateModelContract(request.model),
    ...validateErrorBudget(request.errorBudget),
    ...validateSimulationEnvelope(request.envelope),
  ];

  let decision = "admit";
  let selectedPrecisionPath = "auto";
  if (hasHaltOrError(statuses)) {
    decision = "reject";
  } else if (
    request.errorBudget.globalTolerance < capability.minimumPositiveTolerance &&
    !hasCompatiblePrecisionPath(request.model, "extended_precision") &&
    !hasCompatiblePrecisionPath(request.model, "validation_replay")
  ) {
    statuses.push(
      createStatus("precision_failed", "halt", "requested tolerance requires a stricter precision path", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else if (request.envelope.memoryBudgetBytes < capability.minMemoryBudgetBytes) {
    statuses.push(
      createStatus("stream_memory_pressure", "halt", "memory budget is below the minimum solver active-window budget", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else if (
    isDenseInteraction(request.envelope.interactionPolicy) &&
    request.envelope.entityCount > capability.maxBatchEntities
  ) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "halt", "dense interaction graph exceeds the supported batch envelope", {
        stage: "admission",
        recoverable: false,
      })
    );
    decision = "reject";
  } else {
    if (
      request.envelope.entityCount > capability.maxInteractiveEntities ||
      request.envelope.outputDetail === "validation" ||
      request.envelope.latencyTarget === "batch" ||
      request.envelope.latencyTarget === "validation"
    ) {
      decision = "batch";
    }

    if (
      request.errorBudget.globalTolerance < 1e-12 &&
      hasCompatiblePrecisionPath(request.model, "extended_precision")
    ) {
      selectedPrecisionPath = "extended_precision";
      statuses.push(
        createStatus("precision_escalated", "info", "selected extended precision for strict global tolerance", {
          stage: "admission",
        })
      );
      if (decision === "admit") {
        decision = "escalate_precision";
      }
    } else if (hasCompatiblePrecisionPath(request.model, "event_root_focused")) {
      selectedPrecisionPath = "event_root_focused";
    } else if (hasCompatiblePrecisionPath(request.model, "scaled_f64_strict")) {
      selectedPrecisionPath = "scaled_f64_strict";
    } else {
      selectedPrecisionPath = request.model.compatiblePrecisionPaths[0] || "auto";
    }
  }

  const ok = !hasHaltOrError(statuses);
  return {
    decision,
    selectedPrecisionPath,
    admitted: ok && decision !== "reject",
    statuses,
    status: ok
      ? createStatus("ok", "ok", "simulation envelope admission complete")
      : createStatus("simulation_envelope_exceeded", "halt", "simulation envelope rejected", {
          recoverable: false,
        }),
  };
}

function validateModelContract(model) {
  const statuses = [];
  if (!model || typeof model !== "object") {
    return [
      createStatus("app_contract_error", "error", "model contract is required", {
        stage: "model",
        recoverable: false,
      }),
    ];
  }
  requireNonemptyStringStatus(statuses, model.modelId, "model id is required", "model");
  requireNonemptyStringStatus(statuses, model.equationVersion, "equation version is required", "model");
  requireNonemptyStringStatus(statuses, model.constantsHash, "constants hash is required", "model");
  requireNonemptyStringStatus(statuses, model.causalSpeedPolicy, "causal speed policy is required", "model");
  requireNonemptyStringStatus(statuses, model.branchPolicy, "branch policy is required", "model");
  requireNonemptyStringStatus(statuses, model.unitConvention, "unit convention is required", "model");
  if (!Array.isArray(model.compatiblePrecisionPaths) || model.compatiblePrecisionPaths.length === 0) {
    statuses.push(
      createStatus("precision_failed", "error", "at least one compatible precision path is required", {
        stage: "model",
        recoverable: false,
      })
    );
  } else {
    model.compatiblePrecisionPaths.forEach((path) => {
      if (!DEFAULT_PRECISION_PATHS.includes(path)) {
        statuses.push(
          createStatus("precision_failed", "error", `unknown compatible precision path: ${path}`, {
            stage: "model",
            recoverable: false,
          })
        );
      }
    });
  }
  return statuses;
}

function validateErrorBudget(budget) {
  if (!budget || typeof budget !== "object") {
    return [
      createStatus("precision_failed", "error", "error budget is required", {
        stage: "error-budget",
        recoverable: false,
      }),
    ];
  }
  const statuses = [];
  [
    ["globalTolerance", "global tolerance"],
    ["rootIsolationTolerance", "root isolation tolerance"],
    ["delayedHitTolerance", "delayed hit tolerance"],
    ["integrationTolerance", "integration tolerance"],
    ["streamEncodingTolerance", "stream encoding tolerance"],
    ["readbackTolerance", "readback tolerance"],
  ].forEach(([key, label]) => {
    if (!isPositiveFinite(budget[key])) {
      statuses.push(
        createStatus("precision_failed", "error", `${label} must be positive and finite`, {
          stage: "error-budget",
          recoverable: false,
        })
      );
    }
  });
  if (budget.projectionTolerance != null && !isNonnegativeFinite(budget.projectionTolerance)) {
    statuses.push(
      createStatus("precision_failed", "error", "projection tolerance must be nonnegative and finite", {
        stage: "error-budget",
        recoverable: false,
      })
    );
  }
  if (budget.displayTolerance != null && !isNonnegativeFinite(budget.displayTolerance)) {
    statuses.push(
      createStatus("precision_failed", "error", "display tolerance must be nonnegative and finite", {
        stage: "error-budget",
        recoverable: false,
      })
    );
  }
  if (
    Number.isFinite(budget.rootIsolationTolerance) &&
    Number.isFinite(budget.globalTolerance) &&
    budget.rootIsolationTolerance > budget.globalTolerance
  ) {
    statuses.push(
      createStatus("precision_escalated", "warning", "root isolation tolerance is looser than the global tolerance", {
        stage: "error-budget",
      })
    );
  }
  return statuses;
}

function validateSimulationEnvelope(envelope) {
  if (!envelope || typeof envelope !== "object") {
    return [
      createStatus("simulation_envelope_exceeded", "error", "simulation envelope is required", {
        stage: "simulation-envelope",
        recoverable: false,
      }),
    ];
  }
  const statuses = [];
  if (!Number.isInteger(envelope.entityCount) || envelope.entityCount <= 0) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "error", "entity count must be greater than zero", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  if (
    !envelope.timeWindow ||
    !Number.isFinite(envelope.timeWindow.start) ||
    !Number.isFinite(envelope.timeWindow.end) ||
    envelope.timeWindow.end <= envelope.timeWindow.start
  ) {
    statuses.push(
      createStatus(
        "simulation_envelope_exceeded",
        "error",
        "time window must have finite start and end with end greater than start",
        { stage: "simulation-envelope", recoverable: false }
      )
    );
  } else if (
    envelope.timeWindow.units &&
    !["solver-time", "seconds", "cycles"].includes(envelope.timeWindow.units)
  ) {
    statuses.push(
      createStatus("app_contract_error", "error", "time window units must be solver-time, seconds, or cycles", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  if (envelope.timeWindow?.stepHint != null && envelope.timeWindow.stepHint !== 0) {
    if (!isPositiveFinite(envelope.timeWindow.stepHint)) {
      statuses.push(
        createStatus("time_resolution_insufficient", "error", "time window step hint must be positive when specified", {
          stage: "simulation-envelope",
          recoverable: false,
        })
      );
    }
  }
  if (envelope.timeResolutionHint != null && envelope.timeResolutionHint !== 0) {
    if (!isPositiveFinite(envelope.timeResolutionHint)) {
      statuses.push(
        createStatus("time_resolution_insufficient", "error", "time resolution hint must be positive when specified", {
          stage: "simulation-envelope",
          recoverable: false,
        })
      );
    }
  }
  if (!Number.isInteger(envelope.memoryBudgetBytes) || envelope.memoryBudgetBytes <= 0) {
    statuses.push(
      createStatus("simulation_envelope_exceeded", "error", "memory budget must be greater than zero", {
        stage: "simulation-envelope",
        recoverable: false,
      })
    );
  }
  return statuses;
}

function requireNonemptyStringStatus(statuses, value, message, stage) {
  if (typeof value !== "string" || value.length === 0) {
    statuses.push(
      createStatus("app_contract_error", "error", message, {
        stage,
        recoverable: false,
      })
    );
  }
}

function hasCompatiblePrecisionPath(model, path) {
  return Array.isArray(model?.compatiblePrecisionPaths) && model.compatiblePrecisionPaths.includes(path);
}

function hasHaltOrError(statuses) {
  return statuses.some((status) => status.severity === "halt" || status.severity === "error");
}

function isDenseInteraction(interactionPolicy) {
  return interactionPolicy === "all-to-all" || interactionPolicy === "same-source-enabled";
}

function isPositiveFinite(value) {
  return typeof value === "number" && Number.isFinite(value) && value > 0;
}

function isNonnegativeFinite(value) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function runSimulationWithModule(state, module, request, abiInfo) {
  validateRunSimulationRequest(request);
  const admission = admitSimulationEnvelope({
    model: request.model,
    errorBudget: request.errorBudget,
    envelope: request.envelope,
  });
  if (!admission.admitted) {
    throw new SolverBridgeError(
      createStatus("simulation_envelope_exceeded", "halt", "simulation run was not admitted", {
        recoverable: false,
        details: admission,
      })
    );
  }

  const requestId = request.requestId || `${request.appId}-${request.runKind}-${state.nextRunSequence}`;
  const runId = request.runId || `solver-run-${state.nextRunSequence}`;
  const datasetId = request.datasetId || `${runId}-dataset`;
  state.nextRunSequence += 1;

  let completedResponse;
  if (request.runKind === "causalRoots") {
    const rootRequest = request.config.rootRequest;
    const rootsAndHits = solveRootsAndHitsF64WithModule(module, rootRequest, abiInfo);
    const streams = rootsAndHits.streams.map((stream) => ({
      ...stream,
      streamId: `${runId}:${stream.streamId}`,
    }));
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: createStatus("ok", "ok", "causal-root simulation completed", { runId, requestId }),
        rootCount: rootsAndHits.roots.length,
        eventCount: rootsAndHits.hits.length,
      },
      buffers: rootsAndHits.buffers,
      streams,
      diagnostics: admission.statuses.map(toDiagnosticRecord),
      roots: rootsAndHits.roots,
      hits: rootsAndHits.hits,
      status: createStatus("ok", "ok", "causal-root simulation completed", { runId, requestId }),
    };
  } else if (request.runKind === "motionSimulation") {
    const motion = sampleLinearMotionF64WithModule(module, request.config.motionRequest, abiInfo);
    completedResponse = {
      runId,
      datasetId,
      summary: {
        runId,
        claimLevel: request.claimLevel,
        precisionPath: admission.selectedPrecisionPath,
        status: createStatus("ok", "ok", "motion simulation completed", { runId, requestId }),
        frameCount: motion.frames.length,
        pathCount: motion.frames.length > 0 ? 1 : 0,
      },
      buffers: motion.buffers,
      streams: [],
      diagnostics: admission.statuses.map(toDiagnosticRecord),
      frames: motion.frames,
      status: createStatus("ok", "ok", "motion simulation completed", { runId, requestId }),
    };
  } else {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "halt", `run kind is not implemented: ${request.runKind}`, {
        recoverable: false,
      })
    );
  }

  state.runs.set(runId, completedResponse);
  registerResponseStreams(state, completedResponse);

  return {
    requestId,
    runId,
    datasetId,
    cancellationToken: `cancel-${runId}`,
    acceptedPrecisionPath: admission.selectedPrecisionPath,
    expectedOutputs: request.output.outputs,
    response: completedResponse,
    status: createStatus("ok", "ok", "simulation run completed", { runId, requestId }),
  };
}

function toDiagnosticRecord(status) {
  return {
    code: status.code,
    severity: status.severity,
    message: status.message,
    stage: status.stage,
    details: status.details,
  };
}

function computePhaseAtHitF64WithModule(module, request, abiInfo) {
  validatePhaseAtHitRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const rootCount = request.roots.length;
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * rootCount);
  const sourceClockPtr = module._malloc(abiInfo.phaseClockF64Bytes);
  const receiverClockPtr = module._malloc(abiInfo.phaseClockF64Bytes);
  const rowsPtr = module._malloc(abiInfo.phaseAtHitRowF64Bytes * rootCount);
  const outRowCountPtr = module._malloc(4);
  try {
    request.roots.forEach((root, index) => {
      writeCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes, root);
    });
    writePhaseClockF64(module, sourceClockPtr, request.sourceClock);
    writePhaseClockF64(module, receiverClockPtr, request.receiverClock);
    module.setValue(outRowCountPtr, 0, "i32");
    const compute = module.cwrap("architrino_solver_compute_phase_at_hit_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = compute(
      rootsPtr,
      rootCount,
      sourceClockPtr,
      receiverClockPtr,
      rowsPtr,
      rootCount,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `phase-at-hit C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, rootCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readPhaseAtHitRowF64(module, rowsPtr + index * abiInfo.phaseAtHitRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.phaseAtHitRowF64Bytes);
    return {
      rows,
      buffers: [
        createBufferDescriptor(
          "phase-at-hit",
          "phase_at_hit.v1",
          rowCount,
          abiInfo.phaseAtHitRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "phase-at-hit diagnostics computed"),
    };
  } finally {
    module._free(rootsPtr);
    module._free(sourceClockPtr);
    module._free(receiverClockPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function validatePhaseAtHitRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase-at-hit request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.roots)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "phase-at-hit roots array is required", {
        recoverable: false,
      })
    );
  }
  validatePhaseClock(request.sourceClock, "sourceClock");
  validatePhaseClock(request.receiverClock, "receiverClock");
  request.roots.forEach((root, index) => {
    requireFiniteNumber(root.rootId, `roots[${index}].rootId`);
    requireFiniteNumber(root.statusCode, `roots[${index}].statusCode`);
    requireFiniteNumber(root.emissionTime, `roots[${index}].emissionTime`);
    requireFiniteNumber(root.hitTime, `roots[${index}].hitTime`);
  });
}

function validatePhaseClock(clock, label) {
  if (!clock || typeof clock !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} is required`, {
        recoverable: false,
      })
    );
  }
  requirePositiveFiniteNumber(clock.period, `${label}.period`);
  if (clock.epoch != null) {
    requireFiniteNumber(clock.epoch, `${label}.epoch`);
  }
  if (clock.phaseOffset != null) {
    requireFiniteNumber(clock.phaseOffset, `${label}.phaseOffset`);
  }
}

function sampleLinearMotionF64WithModule(module, request, abiInfo) {
  validateLinearMotionSampleRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const estimatedFrames = estimateLinearMotionFrameCount(request);
  const maxFrames = request.maxFrames ?? Math.min(estimatedFrames, DEFAULT_MAX_MOTION_FRAMES);
  if (estimatedFrames > maxFrames) {
    throw new SolverBridgeError(
      createStatus("stream_memory_pressure", "halt", "motion frame request exceeds frame buffer cap", {
        recoverable: true,
        details: { estimatedFrames, maxFrames },
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.motionSampleRequestF64Bytes);
  const framesPtr = module._malloc(abiInfo.motionFrameRowF64Bytes * maxFrames);
  const outFrameCountPtr = module._malloc(4);
  try {
    writeMotionSampleRequestF64(module, requestPtr, request);
    module.setValue(outFrameCountPtr, 0, "i32");
    const sample = module.cwrap("architrino_solver_sample_linear_motion_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = sample(requestPtr, framesPtr, maxFrames, outFrameCountPtr);
    const frameCount = module.getValue(outFrameCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `motion sampler C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, frameCount, maxFrames },
        })
      );
    }
    const frames = [];
    for (let index = 0; index < frameCount; index += 1) {
      frames.push(readMotionFrameRowF64(module, framesPtr + index * abiInfo.motionFrameRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, framesPtr, frameCount * abiInfo.motionFrameRowF64Bytes);
    return {
      frames,
      buffers: [
        createBufferDescriptor(
          "frame-buffer",
          "frame_buffer.v1",
          frameCount,
          abiInfo.motionFrameRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "linear motion sampled"),
    };
  } finally {
    module._free(requestPtr);
    module._free(framesPtr);
    module._free(outFrameCountPtr);
  }
}

function validateLinearMotionSampleRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "linear motion sample request object is required", {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(request.pathKey, "pathKey");
  validateSegment(request.segment, "segment");
  requireFiniteNumber(request.startTime, "startTime");
  requireFiniteNumber(request.endTime, "endTime");
  requirePositiveFiniteNumber(request.step, "step");
  if (request.endTime < request.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "motion sample time bounds are not ordered", {
        recoverable: false,
      })
    );
  }
  if (request.startTime < request.segment.startTime || request.endTime > request.segment.endTime) {
    throw new SolverBridgeError(
      createStatus("insufficient_history_depth", "halt", "motion sample window is outside the retained segment", {
        recoverable: false,
      })
    );
  }
  if (request.stateFlags != null) {
    requireUint32(request.stateFlags, "stateFlags");
  }
  if (request.maxFrames != null) {
    requirePositiveInteger(request.maxFrames, "maxFrames");
  }
}

function estimateLinearMotionFrameCount(request) {
  const duration = request.endTime - request.startTime;
  return Math.floor((duration + request.step * 1e-9) / request.step) + 1;
}

function computeSharedGeometryF64WithModule(module, request, abiInfo) {
  validateSharedGeometryRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const pathBounds = computePathBoundsF64WithModule(module, request.pathBounds ?? [], abiInfo);
  const spherePointIntersections = computeSpherePointIntersectionsF64WithModule(
    module,
    request.spherePointIntersections ?? [],
    abiInfo
  );
  return {
    pathBounds,
    spherePointIntersections,
    status: createStatus("ok", "ok", "shared geometry computed"),
  };
}

function computePathBoundsF64WithModule(module, requests, abiInfo) {
  if (requests.length === 0) {
    return [];
  }
  const segmentBytes = 72;
  const segmentsPtr = module._malloc(segmentBytes * requests.length);
  const pathKeysPtr = module._malloc(8 * requests.length);
  const rowsPtr = module._malloc(abiInfo.boundsRowF64Bytes * requests.length);
  const outRowCountPtr = module._malloc(4);
  try {
    requests.forEach((item, index) => {
      writeSegment(module, segmentsPtr + index * segmentBytes, item.segment);
      writeUint64(module, pathKeysPtr + index * 8, item.pathKey ?? index);
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const compute = module.cwrap("architrino_solver_compute_path_bounds_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = compute(
      segmentsPtr,
      pathKeysPtr,
      requests.length,
      rowsPtr,
      requests.length,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `path-bounds C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readBoundsRowF64(module, rowsPtr + index * abiInfo.boundsRowF64Bytes));
    }
    return rows;
  } finally {
    module._free(segmentsPtr);
    module._free(pathKeysPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function computeSpherePointIntersectionsF64WithModule(module, requests, abiInfo) {
  if (requests.length === 0) {
    return [];
  }
  const requestsPtr = module._malloc(abiInfo.spherePointRequestF64Bytes * requests.length);
  const rowsPtr = module._malloc(abiInfo.spherePointRowF64Bytes * requests.length);
  const outRowCountPtr = module._malloc(4);
  try {
    requests.forEach((item, index) => {
      writeSpherePointIntersectionRequestF64(
        module,
        requestsPtr + index * abiInfo.spherePointRequestF64Bytes,
        item
      );
    });
    module.setValue(outRowCountPtr, 0, "i32");
    const intersect = module.cwrap("architrino_solver_intersect_sphere_points_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = intersect(requestsPtr, requests.length, rowsPtr, requests.length, outRowCountPtr);
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `sphere-point C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readSpherePointIntersectionRowF64(module, rowsPtr + index * abiInfo.spherePointRowF64Bytes));
    }
    return rows;
  } finally {
    module._free(requestsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
  }
}

function validateSharedGeometryRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "shared geometry request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.pathBounds != null && !Array.isArray(request.pathBounds)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pathBounds must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.spherePointIntersections != null && !Array.isArray(request.spherePointIntersections)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "spherePointIntersections must be an array", {
        recoverable: false,
      })
    );
  }
  (request.pathBounds ?? []).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `pathBounds[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    validateSegment(item.segment, `pathBounds[${index}].segment`);
    if (item.pathKey != null) {
      requireSafeUint64(item.pathKey, `pathBounds[${index}].pathKey`);
    }
  });
  (request.spherePointIntersections ?? []).forEach((item, index) => {
    if (!item || typeof item !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `spherePointIntersections[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    validateVector(item.center, `spherePointIntersections[${index}].center`);
    requireNonnegativeFiniteNumber(item.radius, `spherePointIntersections[${index}].radius`);
    validateVector(item.point, `spherePointIntersections[${index}].point`);
    if (item.tolerance != null) {
      requireNonnegativeFiniteNumber(item.tolerance, `spherePointIntersections[${index}].tolerance`);
    }
  });
}

function detectAssemblyMembershipEventsF64WithModule(module, request, abiInfo) {
  validateAssemblyMembershipEventsRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const memberships = request.memberships;
  const membershipCount = memberships.length;
  const maxEvents = request.maxEvents ?? Math.max(1, membershipCount);
  if (membershipCount === 0) {
    return {
      events: [],
      buffers: [
        createBufferDescriptor(
          "assembly-events",
          "assembly_events.v1",
          0,
          abiInfo.assemblyEventRowF64Bytes,
          new ArrayBuffer(0)
        ),
      ],
      status: createStatus("ok", "ok", "assembly membership events detected"),
    };
  }

  const membershipsPtr = module._malloc(abiInfo.assemblyMembershipRowF64Bytes * membershipCount);
  const eventsPtr = module._malloc(abiInfo.assemblyEventRowF64Bytes * maxEvents);
  const outEventCountPtr = module._malloc(4);
  try {
    memberships.forEach((membership, index) => {
      writeAssemblyMembershipRowF64(
        module,
        membershipsPtr + index * abiInfo.assemblyMembershipRowF64Bytes,
        membership
      );
    });
    module.setValue(outEventCountPtr, 0, "i32");
    const detect = module.cwrap("architrino_solver_detect_assembly_membership_events_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = detect(membershipsPtr, membershipCount, eventsPtr, maxEvents, outEventCountPtr);
    const eventCount = module.getValue(outEventCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `assembly membership C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, eventCount },
        })
      );
    }

    const events = [];
    for (let index = 0; index < eventCount; index += 1) {
      events.push(readAssemblyEventRowF64(module, eventsPtr + index * abiInfo.assemblyEventRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, eventsPtr, eventCount * abiInfo.assemblyEventRowF64Bytes);
    return {
      events,
      buffers: [
        createBufferDescriptor(
          "assembly-events",
          "assembly_events.v1",
          eventCount,
          abiInfo.assemblyEventRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "assembly membership events detected"),
    };
  } finally {
    module._free(membershipsPtr);
    module._free(eventsPtr);
    module._free(outEventCountPtr);
  }
}

function validateAssemblyMembershipEventsRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assembly membership event request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.memberships)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "memberships must be an array", {
        recoverable: false,
      })
    );
  }
  request.memberships.forEach((membership, index) => {
    if (!membership || typeof membership !== "object") {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `memberships[${index}] is required`, {
          recoverable: false,
        })
      );
    }
    requireSafeUint64(membership.membershipKey, `memberships[${index}].membershipKey`);
    requireSafeUint64(membership.pathKey, `memberships[${index}].pathKey`);
    requireSafeUint64(membership.assemblyKey, `memberships[${index}].assemblyKey`);
    requireSafeUint64(membership.assemblyStateKey, `memberships[${index}].assemblyStateKey`);
    requireFiniteNumber(membership.timeStart, `memberships[${index}].timeStart`);
    requireFiniteNumber(membership.timeEnd, `memberships[${index}].timeEnd`);
    if (membership.timeEnd < membership.timeStart) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `memberships[${index}] time bounds are not ordered`, {
          recoverable: false,
        })
      );
    }
    requireFiniteNumber(membership.confidence, `memberships[${index}].confidence`);
    if (membership.confidence < 0 || membership.confidence > 1) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", `memberships[${index}].confidence must be in [0, 1]`, {
          recoverable: false,
        })
      );
    }
    requireUint32(membership.localRole ?? 0, `memberships[${index}].localRole`);
    requireUint32(membership.bindingState ?? 0, `memberships[${index}].bindingState`);
    requireUint32(membership.membershipVersion ?? 1, `memberships[${index}].membershipVersion`);
    requireUint32(membership.eventKind ?? 0, `memberships[${index}].eventKind`);
    requireUint32(membership.statusFlags ?? 0, `memberships[${index}].statusFlags`);
  });
  if (request.maxEvents != null) {
    requirePositiveInteger(request.maxEvents, "maxEvents");
  }
}

function buildSpaceTimeIndexF64WithModule(module, request, abiInfo) {
  validateBuildSpaceTimeIndexRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const pathRows = request.pathRows ?? [];
  const assemblyStates = request.assemblyStates ?? [];
  const maxRows = request.maxRows ?? DEFAULT_MAX_SPACETIME_INDEX_ROWS;
  if (pathRows.length === 0 && assemblyStates.length === 0) {
    return createSpaceTimeIndexResponse([], 0, abiInfo, "space-time index built");
  }

  const pathRowsPtr =
    pathRows.length > 0 ? module._malloc(abiInfo.pathHistoryRowF64Bytes * pathRows.length) : 0;
  const assemblyRowsPtr =
    assemblyStates.length > 0
      ? module._malloc(abiInfo.assemblyStateRowF64Bytes * assemblyStates.length)
      : 0;
  const optionsPtr = module._malloc(SPACETIME_INDEX_OPTIONS_F64_BYTES);
  const rowsPtr = module._malloc(abiInfo.spaceTimeIndexRowF64Bytes * maxRows);
  const outRowCountPtr = module._malloc(4);
  const outOverflowCountPtr = module._malloc(4);
  try {
    pathRows.forEach((row, index) => {
      writePathHistoryRowF64(module, pathRowsPtr + index * abiInfo.pathHistoryRowF64Bytes, row);
    });
    assemblyStates.forEach((row, index) => {
      writeAssemblyStateRowF64(module, assemblyRowsPtr + index * abiInfo.assemblyStateRowF64Bytes, row);
    });
    writeSpaceTimeIndexOptionsF64(module, optionsPtr, request.options);
    module.setValue(outRowCountPtr, 0, "i32");
    module.setValue(outOverflowCountPtr, 0, "i32");
    const build = module.cwrap("architrino_solver_build_spacetime_index_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = build(
      pathRowsPtr,
      pathRows.length,
      assemblyRowsPtr,
      assemblyStates.length,
      optionsPtr,
      rowsPtr,
      maxRows,
      outRowCountPtr,
      outOverflowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    const overflowEntryCount = module.getValue(outOverflowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `space-time index C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, overflowEntryCount },
        })
      );
    }
    const rows = readSpaceTimeIndexRows(module, rowsPtr, rowCount, abiInfo);
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.spaceTimeIndexRowF64Bytes);
    return createSpaceTimeIndexResponse(rows, overflowEntryCount, abiInfo, "space-time index built", buffer);
  } finally {
    if (pathRowsPtr) {
      module._free(pathRowsPtr);
    }
    if (assemblyRowsPtr) {
      module._free(assemblyRowsPtr);
    }
    module._free(optionsPtr);
    module._free(rowsPtr);
    module._free(outRowCountPtr);
    module._free(outOverflowCountPtr);
  }
}

function querySpaceTimeIndexF64WithModule(module, request, abiInfo) {
  validateQuerySpaceTimeIndexRequest(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const rows = request.rows;
  const maxRows = request.maxRows ?? Math.max(1, rows.length);
  if (rows.length === 0) {
    return createSpaceTimeIndexResponse([], 0, abiInfo, "space-time index queried");
  }

  const inputRowsPtr = module._malloc(abiInfo.spaceTimeIndexRowF64Bytes * rows.length);
  const queryPtr = module._malloc(SPACETIME_QUERY_F64_BYTES);
  const optionsPtr = module._malloc(SPACETIME_INDEX_OPTIONS_F64_BYTES);
  const outputRowsPtr = module._malloc(abiInfo.spaceTimeIndexRowF64Bytes * maxRows);
  const outRowCountPtr = module._malloc(4);
  try {
    rows.forEach((row, index) => {
      writeSpaceTimeIndexRowF64(module, inputRowsPtr + index * abiInfo.spaceTimeIndexRowF64Bytes, row);
    });
    writeSpaceTimeQueryF64(module, queryPtr, request.query);
    writeSpaceTimeIndexOptionsF64(module, optionsPtr, request.options);
    module.setValue(outRowCountPtr, 0, "i32");
    const query = module.cwrap("architrino_solver_query_spacetime_index_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = query(
      inputRowsPtr,
      rows.length,
      queryPtr,
      optionsPtr,
      outputRowsPtr,
      maxRows,
      outRowCountPtr
    );
    const rowCount = module.getValue(outRowCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `space-time query C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount },
        })
      );
    }
    const matches = readSpaceTimeIndexRows(module, outputRowsPtr, rowCount, abiInfo);
    const buffer = copyWasmBytes(module, outputRowsPtr, rowCount * abiInfo.spaceTimeIndexRowF64Bytes);
    return createSpaceTimeIndexResponse(matches, 0, abiInfo, "space-time index queried", buffer);
  } finally {
    module._free(inputRowsPtr);
    module._free(queryPtr);
    module._free(optionsPtr);
    module._free(outputRowsPtr);
    module._free(outRowCountPtr);
  }
}

function createSpaceTimeIndexResponse(rows, overflowEntryCount, abiInfo, message, buffer = new ArrayBuffer(0)) {
  return {
    rows,
    buffers: [
      createBufferDescriptor(
        "spacetime-index",
        "spacetime_index.v1",
        rows.length,
        abiInfo.spaceTimeIndexRowF64Bytes,
        buffer
      ),
    ],
    overflowEntryCount,
    status: createStatus("ok", "ok", message),
  };
}

function validateBuildSpaceTimeIndexRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time index request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.pathRows != null && !Array.isArray(request.pathRows)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "pathRows must be an array", {
        recoverable: false,
      })
    );
  }
  if (request.assemblyStates != null && !Array.isArray(request.assemblyStates)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "assemblyStates must be an array", {
        recoverable: false,
      })
    );
  }
  (request.pathRows ?? []).forEach(validatePathHistoryRowF64);
  (request.assemblyStates ?? []).forEach(validateAssemblyStateRowF64);
  validateSpaceTimeIndexOptions(request.options);
  if (request.maxRows != null) {
    requirePositiveInteger(request.maxRows, "maxRows");
  }
}

function validateQuerySpaceTimeIndexRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time query request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.rows)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "rows must be an array", {
        recoverable: false,
      })
    );
  }
  request.rows.forEach(validateSpaceTimeIndexRowF64);
  validateSpaceTimeQuery(request.query);
  validateSpaceTimeIndexOptions(request.options);
  if (request.maxRows != null) {
    requirePositiveInteger(request.maxRows, "maxRows");
  }
}

function validatePathHistoryRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `pathRows[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(row.pathKey, `pathRows[${index}].pathKey`);
  requireSafeUint64(row.segmentIndex, `pathRows[${index}].segmentIndex`);
  requireFiniteNumber(row.startTime, `pathRows[${index}].startTime`);
  requireFiniteNumber(row.endTime, `pathRows[${index}].endTime`);
  validateVector(row.start, `pathRows[${index}].start`);
  validateVector(row.velocity, `pathRows[${index}].velocity`);
  requireNonnegativeFiniteNumber(row.errorBound ?? 0, `pathRows[${index}].errorBound`);
  requireUint32(row.stateFlags ?? 0, `pathRows[${index}].stateFlags`);
}

function validateAssemblyStateRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `assemblyStates[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeUint64(row.assemblyKey, `assemblyStates[${index}].assemblyKey`);
  requireSafeUint64(row.assemblyStateKey, `assemblyStates[${index}].assemblyStateKey`);
  requireFiniteNumber(row.timeStart, `assemblyStates[${index}].timeStart`);
  requireFiniteNumber(row.timeEnd, `assemblyStates[${index}].timeEnd`);
  validateVector(row.center, `assemblyStates[${index}].center`);
  validateVector(row.velocity, `assemblyStates[${index}].velocity`);
  requireFiniteNumber(row.phase ?? 0, `assemblyStates[${index}].phase`);
  requireSafeInt64(row.cycleIndex ?? 0, `assemblyStates[${index}].cycleIndex`);
  requireUint32(row.modelVersion ?? 1, `assemblyStates[${index}].modelVersion`);
  requireUint32(row.statusFlags ?? 0, `assemblyStates[${index}].statusFlags`);
  requireUint32(row.fidelityFlags ?? 0, `assemblyStates[${index}].fidelityFlags`);
}

function validateSpaceTimeIndexOptions(options) {
  if (!options || typeof options !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time index options are required", {
        recoverable: false,
      })
    );
  }
  requirePositiveFiniteNumber(options.spatialCellSize, "options.spatialCellSize");
  requirePositiveFiniteNumber(options.timeBinSize, "options.timeBinSize");
  requirePositiveInteger(options.maxCellsPerItem, "options.maxCellsPerItem");
  requireUint32(options.maxCellsPerItem, "options.maxCellsPerItem");
}

function validateSpaceTimeQuery(query) {
  if (!query || typeof query !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "space-time query is required", {
        recoverable: false,
      })
    );
  }
  validateSpaceTimeBounds(query.bounds, "query.bounds");
  if (query.subjectKind != null) {
    requireUint32(query.subjectKind, "query.subjectKind");
  }
  if (query.subjectKey != null) {
    requireSafeUint64(query.subjectKey, "query.subjectKey");
  }
}

function validateSpaceTimeIndexRowF64(row, index) {
  if (!row || typeof row !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `rows[${index}] is required`, {
        recoverable: false,
      })
    );
  }
  requireSafeInt64(row.cellX, `rows[${index}].cellX`);
  requireSafeInt64(row.cellY, `rows[${index}].cellY`);
  requireSafeInt64(row.cellZ, `rows[${index}].cellZ`);
  requireSafeInt64(row.cellT, `rows[${index}].cellT`);
  requireSafeUint64(row.subjectKey, `rows[${index}].subjectKey`);
  requireSafeUint64(row.rowOffset, `rows[${index}].rowOffset`);
  validateSpaceTimeBounds(row, `rows[${index}]`);
  requireUint32(row.subjectKind, `rows[${index}].subjectKind`);
  requireUint32(row.sourceLayout, `rows[${index}].sourceLayout`);
  requireUint32(row.stateFlags ?? 0, `rows[${index}].stateFlags`);
}

function validateSpaceTimeBounds(bounds, label) {
  if (!bounds || typeof bounds !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} bounds are required`, {
        recoverable: false,
      })
    );
  }
  validateVector(bounds.min, `${label}.min`);
  validateVector(bounds.max, `${label}.max`);
  requireFiniteNumber(bounds.timeStart, `${label}.timeStart`);
  requireFiniteNumber(bounds.timeEnd, `${label}.timeEnd`);
  if (
    bounds.max.x < bounds.min.x ||
    bounds.max.y < bounds.min.y ||
    bounds.max.z < bounds.min.z ||
    bounds.timeEnd < bounds.timeStart
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
}

function validateRunSimulationRequest(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "solver request object is required", {
        recoverable: false,
      })
    );
  }
  if (!["animator", "photon", "ideal-swarm"].includes(request.appId)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "known app id is required", {
        recoverable: false,
      })
    );
  }
  if (!DEFAULT_PRECISION_PATHS.includes(request.precisionPath)) {
    throw new SolverBridgeError(
      createStatus("precision_failed", "error", "known precision path is required", {
        recoverable: false,
      })
    );
  }
  if (!request.output || !Array.isArray(request.output.outputs)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "run output contract is required", {
        recoverable: false,
      })
    );
  }
  if (request.runKind === "causalRoots") {
    validateCausalRootsRunConfig(request.config);
  } else if (request.runKind === "motionSimulation") {
    validateMotionSimulationRunConfig(request.config);
  }
}

function validateCausalRootsRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root run config is required", {
        recoverable: false,
      })
    );
  }
  validateCausalRootF64Request(config.rootRequest);
}

function validateMotionSimulationRunConfig(config) {
  if (!config || typeof config !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "motion simulation run config is required", {
        recoverable: false,
      })
    );
  }
  validateLinearMotionSampleRequest(config.motionRequest);
}

async function loadWasmModule(state) {
  if (!state.modulePromise) {
    state.modulePromise = state.createWasmModule({
      locateFile: state.locateFile,
    });
  }
  return state.modulePromise;
}

async function requireWasmModule(state) {
  if (!state.createWasmModule) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "halt", "WebAssembly module factory is required", {
        recoverable: false,
      })
    );
  }
  if (!state.module) {
    state.module = await loadWasmModule(state);
  }
  return state.module;
}

function runExportedSmoke(module, exportName) {
  if (!module || typeof module.cwrap !== "function") {
    throw new SolverBridgeError(
      createStatus("unsupported_browser_storage", "error", "WebAssembly module did not expose cwrap", {
        recoverable: false,
      })
    );
  }
  const smoke = module.cwrap(exportName, "number", []);
  const status = smoke();
  if (status !== 0) {
    throw new SolverBridgeError(
      createStatus("internal_solver_error", "error", `${exportName} failed`, {
        recoverable: false,
      })
    );
  }
}

export function hasSolverCAbi(module) {
  return (
    typeof module?._architrino_solver_solve_causal_roots_f64 === "function" &&
    typeof module?._architrino_solver_solve_roots_and_hits_f64 === "function" &&
    typeof module?._architrino_solver_build_root_ledger_detail_f64 === "function" &&
    typeof module?._architrino_solver_solve_causal_root_batch_f64 === "function" &&
    typeof module?._architrino_solver_diagnose_precision_f64 === "function" &&
    typeof module?._architrino_solver_sample_linear_motion_f64 === "function" &&
    typeof module?._architrino_solver_compute_phase_at_hit_f64 === "function" &&
    typeof module?._architrino_solver_compute_path_bounds_f64 === "function" &&
    typeof module?._architrino_solver_intersect_sphere_points_f64 === "function" &&
    typeof module?._architrino_solver_detect_assembly_membership_events_f64 === "function" &&
    typeof module?._architrino_solver_build_spacetime_index_f64 === "function" &&
    typeof module?._architrino_solver_query_spacetime_index_f64 === "function" &&
    typeof module?._architrino_solver_get_abi_info === "function"
  );
}

function readAbiInfo(module) {
  const ptr = module._malloc(ABI_INFO_BYTES);
  try {
    const getAbiInfo = module.cwrap("architrino_solver_get_abi_info", "number", ["number"]);
    const status = getAbiInfo(ptr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "error", "ABI info query failed", {
          recoverable: false,
        })
      );
    }
    return {
      abiMajor: module.getValue(ptr, "i32"),
      abiMinor: module.getValue(ptr + 4, "i32"),
      abiPatch: module.getValue(ptr + 8, "i32"),
      rootRequestF64Bytes: module.getValue(ptr + 12, "i32"),
      rootRowF64Bytes: module.getValue(ptr + 16, "i32"),
      delayedHitRowF64Bytes: module.getValue(ptr + 20, "i32"),
      motionSampleRequestF64Bytes: module.getValue(ptr + 24, "i32"),
      motionFrameRowF64Bytes: module.getValue(ptr + 28, "i32"),
      phaseClockF64Bytes: module.getValue(ptr + 32, "i32"),
      phaseAtHitRowF64Bytes: module.getValue(ptr + 36, "i32"),
      boundsRowF64Bytes: module.getValue(ptr + 40, "i32"),
      spherePointRequestF64Bytes: module.getValue(ptr + 44, "i32"),
      spherePointRowF64Bytes: module.getValue(ptr + 48, "i32"),
      assemblyStateRowF64Bytes: module.getValue(ptr + 52, "i32"),
      assemblyMembershipRowF64Bytes: module.getValue(ptr + 56, "i32"),
      assemblyHierarchyRowF64Bytes: module.getValue(ptr + 60, "i32"),
      assemblyEventRowF64Bytes: module.getValue(ptr + 64, "i32"),
      pathHistoryRowF64Bytes: module.getValue(ptr + 68, "i32"),
      spaceTimeIndexRowF64Bytes: module.getValue(ptr + 72, "i32"),
      rootLedgerDetailRowF64Bytes: module.getValue(ptr + 76, "i32"),
    };
  } finally {
    module._free(ptr);
  }
}

function defaultAbiInfo() {
  return {
    abiMajor: 0,
    abiMinor: 1,
    abiPatch: 0,
    rootRequestF64Bytes: CAUSAL_ROOT_REQUEST_F64_BYTES,
    rootRowF64Bytes: CAUSAL_ROOT_ROW_F64_BYTES,
    delayedHitRowF64Bytes: DELAYED_HIT_ROW_F64_BYTES,
    motionSampleRequestF64Bytes: MOTION_SAMPLE_REQUEST_F64_BYTES,
    motionFrameRowF64Bytes: FRAME_BUFFER_ROW_F64_BYTES,
    phaseClockF64Bytes: PHASE_CLOCK_F64_BYTES,
    phaseAtHitRowF64Bytes: PHASE_AT_HIT_ROW_F64_BYTES,
    boundsRowF64Bytes: GEOMETRY_BOUNDS_ROW_F64_BYTES,
    spherePointRequestF64Bytes: SPHERE_POINT_INTERSECTION_REQUEST_F64_BYTES,
    spherePointRowF64Bytes: SPHERE_POINT_INTERSECTION_ROW_F64_BYTES,
    assemblyStateRowF64Bytes: ASSEMBLY_STATE_ROW_F64_BYTES,
    assemblyMembershipRowF64Bytes: ASSEMBLY_MEMBERSHIP_ROW_F64_BYTES,
    assemblyHierarchyRowF64Bytes: ASSEMBLY_HIERARCHY_ROW_F64_BYTES,
    assemblyEventRowF64Bytes: ASSEMBLY_EVENT_ROW_F64_BYTES,
    pathHistoryRowF64Bytes: PATH_HISTORY_ROW_F64_BYTES,
    spaceTimeIndexRowF64Bytes: SPACETIME_INDEX_ROW_F64_BYTES,
    rootLedgerDetailRowF64Bytes: ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
  };
}

function assertAbiInfo(abiInfo) {
  if (
    abiInfo.rootRequestF64Bytes !== CAUSAL_ROOT_REQUEST_F64_BYTES ||
    abiInfo.rootRowF64Bytes !== CAUSAL_ROOT_ROW_F64_BYTES ||
    abiInfo.delayedHitRowF64Bytes !== DELAYED_HIT_ROW_F64_BYTES ||
    abiInfo.motionSampleRequestF64Bytes !== MOTION_SAMPLE_REQUEST_F64_BYTES ||
    abiInfo.motionFrameRowF64Bytes !== FRAME_BUFFER_ROW_F64_BYTES ||
    abiInfo.phaseClockF64Bytes !== PHASE_CLOCK_F64_BYTES ||
    abiInfo.phaseAtHitRowF64Bytes !== PHASE_AT_HIT_ROW_F64_BYTES ||
    abiInfo.boundsRowF64Bytes !== GEOMETRY_BOUNDS_ROW_F64_BYTES ||
    abiInfo.spherePointRequestF64Bytes !== SPHERE_POINT_INTERSECTION_REQUEST_F64_BYTES ||
    abiInfo.spherePointRowF64Bytes !== SPHERE_POINT_INTERSECTION_ROW_F64_BYTES ||
    abiInfo.assemblyStateRowF64Bytes !== ASSEMBLY_STATE_ROW_F64_BYTES ||
    abiInfo.assemblyMembershipRowF64Bytes !== ASSEMBLY_MEMBERSHIP_ROW_F64_BYTES ||
    abiInfo.assemblyHierarchyRowF64Bytes !== ASSEMBLY_HIERARCHY_ROW_F64_BYTES ||
    abiInfo.assemblyEventRowF64Bytes !== ASSEMBLY_EVENT_ROW_F64_BYTES ||
    abiInfo.pathHistoryRowF64Bytes !== PATH_HISTORY_ROW_F64_BYTES ||
    abiInfo.spaceTimeIndexRowF64Bytes !== SPACETIME_INDEX_ROW_F64_BYTES ||
    abiInfo.rootLedgerDetailRowF64Bytes !== ROOT_LEDGER_DETAIL_ROW_F64_BYTES
  ) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "solver ABI row sizes do not match bridge layout", {
        recoverable: false,
        details: abiInfo,
      })
    );
  }
}

function solveCausalRootsF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRoots = request.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const outCountPtr = module._malloc(4);

  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_causal_roots_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(requestPtr, rootsPtr, maxRoots, outCountPtr);
    const rootCount = module.getValue(outCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `causal root C ABI returned ${status}`, {
          recoverable: false,
          details: { status, rootCount },
        })
      );
    }
    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    return {
      roots,
      status: createStatus("ok", "ok", "causal roots solved"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rootsPtr);
    module._free(outCountPtr);
  }
}

function buildRootLedgerDetailF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (request.maxRows != null) {
    requirePositiveInteger(request.maxRows, "maxRows");
  }
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRows = request.maxRows ?? DEFAULT_MAX_ROOT_LEDGER_DETAIL_ROWS;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const rowsPtr = module._malloc(abiInfo.rootLedgerDetailRowF64Bytes * maxRows);
  const outCountPtr = module._malloc(4);

  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outCountPtr, 0, "i32");
    const buildLedger = module.cwrap("architrino_solver_build_root_ledger_detail_f64", "number", [
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = buildLedger(requestPtr, rowsPtr, maxRows, outCountPtr);
    const rowCount = module.getValue(outCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `root-ledger detail C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, rowCount, maxRows },
        })
      );
    }
    const rows = [];
    for (let index = 0; index < rowCount; index += 1) {
      rows.push(readRootLedgerDetailRowF64(module, rowsPtr + index * abiInfo.rootLedgerDetailRowF64Bytes));
    }
    const buffer = copyWasmBytes(module, rowsPtr, rowCount * abiInfo.rootLedgerDetailRowF64Bytes);
    return {
      rows,
      buffers: [
        createBufferDescriptor(
          "root-ledger-detail",
          "root_ledger_detail.v1",
          rowCount,
          abiInfo.rootLedgerDetailRowF64Bytes,
          buffer
        ),
      ],
      status: createStatus("ok", "ok", "root-ledger detail built"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rowsPtr);
    module._free(outCountPtr);
  }
}

function diagnosePrecisionF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const diagnosticPtr = module._malloc(PRECISION_DIAGNOSTIC_ROW_F64_BYTES);
  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    const diagnose = module.cwrap("architrino_solver_diagnose_precision_f64", "number", [
      "number",
      "number",
    ]);
    const status = diagnose(requestPtr, diagnosticPtr);
    const diagnostic = readPrecisionDiagnosticRowF64(module, diagnosticPtr);
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `precision diagnostic C ABI returned ${status}`, {
          recoverable: false,
          details: { status, diagnostic },
        })
      );
    }
    return {
      ...diagnostic,
      status: createPrecisionDiagnosticStatus(diagnostic),
    };
  } finally {
    module._free(requestPtr);
    module._free(diagnosticPtr);
  }
}

function createPrecisionDiagnosticStatus(diagnostic) {
  const code = STATUS_CODE_BY_ID[diagnostic.statusCode] || "precision_failed";
  if (code === "ok") {
    return createStatus("ok", "ok", "precision diagnostic complete");
  }
  return createStatus(code, "warning", "precision diagnostic completed with warnings", {
    details: {
      statusCode: diagnostic.statusCode,
      scaleResolutionLimited: diagnostic.scaleResolutionLimited,
      timeResolutionLimited: diagnostic.timeResolutionLimited,
      scaleNormalizationRecommended: diagnostic.scaleNormalizationRecommended,
      extendedPrecisionRecommended: diagnostic.extendedPrecisionRecommended,
    },
  });
}

function solveCausalRootBatchF64WithModule(module, request, abiInfo) {
  validateCausalRootBatchF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }

  const requestCount = request.requests.length;
  const maxItems = request.maxItems ?? requestCount;
  const maxRoots = request.maxRoots ?? requestCount * DEFAULT_MAX_CAUSAL_ROOTS;
  const workerCount = request.workerCount ?? 0;
  const requestsPtr = module._malloc(abiInfo.rootRequestF64Bytes * requestCount);
  const itemRowsPtr = module._malloc(CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES * maxItems);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const outItemCountPtr = module._malloc(4);
  const outRootCountPtr = module._malloc(4);

  try {
    request.requests.forEach((itemRequest, index) => {
      writeCausalRootRequestF64(module, requestsPtr + index * abiInfo.rootRequestF64Bytes, itemRequest);
    });
    module.setValue(outItemCountPtr, 0, "i32");
    module.setValue(outRootCountPtr, 0, "i32");
    const solveBatch = module.cwrap("architrino_solver_solve_causal_root_batch_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solveBatch(
      requestsPtr,
      requestCount,
      workerCount,
      itemRowsPtr,
      maxItems,
      rootsPtr,
      maxRoots,
      outItemCountPtr,
      outRootCountPtr
    );
    const itemCount = module.getValue(outItemCountPtr, "i32");
    const rootCount = module.getValue(outRootCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `causal root batch C ABI returned ${status}`, {
          recoverable: status === -3,
          details: { status, itemCount, rootCount },
        })
      );
    }

    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    const items = [];
    for (let index = 0; index < itemCount; index += 1) {
      const item = readCausalRootBatchItemRowF64(
        module,
        itemRowsPtr + index * CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES
      );
      items.push({
        ...item,
        roots: roots.slice(item.rootOffset, item.rootOffset + item.rootCount),
      });
    }
    const rootBuffer = copyWasmBytes(module, rootsPtr, rootCount * abiInfo.rootRowF64Bytes);
    return {
      items,
      roots,
      buffers: [
        createBufferDescriptor(
          "batch-root-ledger",
          "root_ledger.v1",
          rootCount,
          abiInfo.rootRowF64Bytes,
          rootBuffer
        ),
      ],
      status: createStatus("ok", "ok", "causal root batch solved"),
    };
  } finally {
    module._free(requestsPtr);
    module._free(itemRowsPtr);
    module._free(rootsPtr);
    module._free(outItemCountPtr);
    module._free(outRootCountPtr);
  }
}

function solveRootsAndHitsF64WithModule(module, request, abiInfo) {
  validateCausalRootF64Request(request);
  if (typeof module._malloc !== "function" || typeof module._free !== "function") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "WebAssembly allocator exports are required", {
        recoverable: false,
      })
    );
  }
  const maxRoots = request.maxRoots ?? DEFAULT_MAX_CAUSAL_ROOTS;
  const maxHits = request.maxHits ?? maxRoots;
  const requestPtr = module._malloc(abiInfo.rootRequestF64Bytes);
  const rootsPtr = module._malloc(abiInfo.rootRowF64Bytes * maxRoots);
  const hitsPtr = module._malloc(abiInfo.delayedHitRowF64Bytes * maxHits);
  const outRootCountPtr = module._malloc(4);
  const outHitCountPtr = module._malloc(4);

  try {
    writeCausalRootRequestF64(module, requestPtr, request);
    module.setValue(outRootCountPtr, 0, "i32");
    module.setValue(outHitCountPtr, 0, "i32");
    const solve = module.cwrap("architrino_solver_solve_roots_and_hits_f64", "number", [
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
      "number",
    ]);
    const status = solve(
      requestPtr,
      rootsPtr,
      maxRoots,
      outRootCountPtr,
      hitsPtr,
      maxHits,
      outHitCountPtr
    );
    const rootCount = module.getValue(outRootCountPtr, "i32");
    const hitCount = module.getValue(outHitCountPtr, "i32");
    if (status !== 0) {
      throw new SolverBridgeError(
        createStatus("internal_solver_error", "halt", `roots-and-hits C ABI returned ${status}`, {
          recoverable: false,
          details: { status, rootCount, hitCount },
        })
      );
    }
    const roots = [];
    for (let index = 0; index < rootCount; index += 1) {
      roots.push(readCausalRootRowF64(module, rootsPtr + index * abiInfo.rootRowF64Bytes));
    }
    const hits = [];
    for (let index = 0; index < hitCount; index += 1) {
      hits.push(readDelayedHitRowF64(module, hitsPtr + index * abiInfo.delayedHitRowF64Bytes));
    }
    const rootBufferByteLength = rootCount * abiInfo.rootRowF64Bytes;
    const hitBufferByteLength = hitCount * abiInfo.delayedHitRowF64Bytes;
    const rootBuffer = copyWasmBytes(module, rootsPtr, rootBufferByteLength);
    const hitBuffer = copyWasmBytes(module, hitsPtr, hitBufferByteLength);
    const rootBufferDescriptor = createBufferDescriptor(
      "root-ledger",
      "root_ledger.v1",
      rootCount,
      abiInfo.rootRowF64Bytes,
      rootBuffer
    );
    const hitBufferDescriptor = createBufferDescriptor(
      "delayed-hit-events",
      "delayed_hit_events.v1",
      hitCount,
      abiInfo.delayedHitRowF64Bytes,
      hitBuffer
    );
    return {
      roots,
      hits,
      buffers: [rootBufferDescriptor, hitBufferDescriptor],
      streams: [
        createTransientStreamDescriptor("causal-root-transient", request.hitTime, [
          rootBufferDescriptor,
          hitBufferDescriptor,
        ]),
      ],
      status: createStatus("ok", "ok", "causal roots and delayed hits solved"),
    };
  } finally {
    module._free(requestPtr);
    module._free(rootsPtr);
    module._free(hitsPtr);
    module._free(outRootCountPtr);
    module._free(outHitCountPtr);
  }
}

function validateCausalRootF64Request(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root request object is required", {
        recoverable: false,
      })
    );
  }
  if (!request.source || !request.receiver) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "source and receiver segments are required", {
        recoverable: false,
      })
    );
  }
  validateSegment(request.source, "source");
  validateSegment(request.receiver, "receiver");
  requireFiniteNumber(request.hitTime, "hitTime");
  requirePositiveFiniteNumber(request.signalSpeed, "signalSpeed");
  if (request.rootTolerance != null) {
    requirePositiveFiniteNumber(request.rootTolerance, "rootTolerance");
  }
  if (request.maxIterations != null) {
    requirePositiveInteger(request.maxIterations, "maxIterations");
  }
  if (request.scanSubdivisions != null) {
    requirePositiveInteger(request.scanSubdivisions, "scanSubdivisions");
  }
  if (request.maxRoots != null) {
    requirePositiveInteger(request.maxRoots, "maxRoots");
  }
  if (request.maxHits != null) {
    requirePositiveInteger(request.maxHits, "maxHits");
  }
}

function validateCausalRootBatchF64Request(request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root batch request object is required", {
        recoverable: false,
      })
    );
  }
  if (!Array.isArray(request.requests) || request.requests.length === 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "causal-root batch requests array is required", {
        recoverable: false,
      })
    );
  }
  request.requests.forEach(validateCausalRootF64Request);
  if (request.maxItems != null) {
    requirePositiveInteger(request.maxItems, "maxItems");
    if (request.maxItems < request.requests.length) {
      throw new SolverBridgeError(
        createStatus("app_contract_error", "error", "maxItems must cover all batch requests", {
          recoverable: false,
        })
      );
    }
  }
  if (request.maxRoots != null) {
    requirePositiveInteger(request.maxRoots, "maxRoots");
  }
  if (request.workerCount != null && (!Number.isInteger(request.workerCount) || request.workerCount < 0)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "workerCount must be a nonnegative integer", {
        recoverable: false,
      })
    );
  }
}

function validateSegment(segment, label) {
  requireFiniteNumber(segment.startTime, `${label}.startTime`);
  requireFiniteNumber(segment.endTime, `${label}.endTime`);
  if (segment.endTime < segment.startTime) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} time bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
  validateVector(segment.positionAtStart, `${label}.positionAtStart`);
  validateVector(segment.velocity, `${label}.velocity`);
  if (segment.errorBound != null) {
    requireNonnegativeFiniteNumber(segment.errorBound, `${label}.errorBound`);
  }
}

function validateVector(vector, label) {
  if (!vector || typeof vector !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} vector is required`, {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(vector.x, `${label}.x`);
  requireFiniteNumber(vector.y, `${label}.y`);
  requireFiniteNumber(vector.z, `${label}.z`);
}

function requireFiniteNumber(value, label) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be finite`, {
        recoverable: false,
      })
    );
  }
}

function requireNonnegativeFiniteNumber(value, label) {
  requireFiniteNumber(value, label);
  if (value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be nonnegative`, {
        recoverable: false,
      })
    );
  }
}

function requirePositiveFiniteNumber(value, label) {
  requireFiniteNumber(value, label);
  if (value <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be positive`, {
        recoverable: false,
      })
    );
  }
}

function requirePositiveInteger(value, label) {
  if (!Number.isInteger(value) || value <= 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a positive integer`, {
        recoverable: false,
      })
    );
  }
}

function requireNonnegativeInteger(value, label) {
  if (!Number.isInteger(value) || value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a nonnegative integer`, {
        recoverable: false,
      })
    );
  }
}

function requireSafeUint64(value, label) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a nonnegative safe integer`, {
        recoverable: false,
      })
    );
  }
}

function requireSafeInt64(value, label) {
  if (!Number.isSafeInteger(value)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be a safe integer`, {
        recoverable: false,
      })
    );
  }
}

function requireUint32(value, label) {
  if (!Number.isInteger(value) || value < 0 || value > 0xffffffff) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must fit uint32`, {
        recoverable: false,
      })
    );
  }
}

function writeCausalRootRequestF64(module, ptr, request) {
  writeSegment(module, ptr, request.source);
  writeSegment(module, ptr + 72, request.receiver);
  module.setValue(ptr + 144, request.hitTime, "double");
  module.setValue(ptr + 152, request.signalSpeed, "double");
  module.setValue(ptr + 160, request.rootTolerance ?? 1e-12, "double");
  module.setValue(ptr + 168, request.maxIterations ?? 96, "i32");
  module.setValue(ptr + 172, request.scanSubdivisions ?? 64, "i32");
}

function writeCausalRootRowF64(module, ptr, root) {
  module.setValue(ptr, root.rootId, "i32");
  module.setValue(ptr + 4, root.statusCode, "i32");
  module.setValue(ptr + 8, root.emissionTime, "double");
  module.setValue(ptr + 16, root.hitTime, "double");
  module.setValue(ptr + 24, root.delay ?? 0, "double");
  module.setValue(ptr + 32, root.distance ?? 0, "double");
  module.setValue(ptr + 40, root.residual ?? 0, "double");
  module.setValue(ptr + 48, root.jacobian ?? 0, "double");
  module.setValue(ptr + 56, root.branchWeight ?? 0, "double");
  writeVector(module, ptr + 64, root.sourcePoint ?? { x: 0, y: 0, z: 0 });
  writeVector(module, ptr + 88, root.receiverPoint ?? { x: 0, y: 0, z: 0 });
}

function writePhaseClockF64(module, ptr, clock) {
  module.setValue(ptr, clock.period, "double");
  module.setValue(ptr + 8, clock.epoch ?? 0, "double");
  module.setValue(ptr + 16, clock.phaseOffset ?? 0, "double");
}

function writeSpherePointIntersectionRequestF64(module, ptr, request) {
  writeVector(module, ptr, request.center);
  module.setValue(ptr + 24, request.radius, "double");
  writeVector(module, ptr + 32, request.point);
  module.setValue(ptr + 56, request.tolerance ?? 0, "double");
}

function writeMotionSampleRequestF64(module, ptr, request) {
  writeSegment(module, ptr, request.segment);
  writeUint64(module, ptr + 72, request.pathKey);
  module.setValue(ptr + 80, request.startTime, "double");
  module.setValue(ptr + 88, request.endTime, "double");
  module.setValue(ptr + 96, request.step, "double");
  module.setValue(ptr + 104, request.stateFlags ?? 0, "i32");
  module.setValue(ptr + 108, 0, "i32");
}

function writeAssemblyMembershipRowF64(module, ptr, membership) {
  writeUint64(module, ptr, membership.membershipKey);
  writeUint64(module, ptr + 8, membership.pathKey);
  writeUint64(module, ptr + 16, membership.assemblyKey);
  writeUint64(module, ptr + 24, membership.assemblyStateKey);
  module.setValue(ptr + 32, membership.timeStart, "double");
  module.setValue(ptr + 40, membership.timeEnd, "double");
  module.setValue(ptr + 48, membership.confidence, "double");
  module.setValue(ptr + 56, membership.localRole ?? 0, "i32");
  module.setValue(ptr + 60, membership.bindingState ?? 0, "i32");
  module.setValue(ptr + 64, membership.membershipVersion ?? 1, "i32");
  module.setValue(ptr + 68, membership.eventKind ?? 0, "i32");
  module.setValue(ptr + 72, membership.statusFlags ?? 0, "i32");
  module.setValue(ptr + 76, 0, "i32");
}

function writePathHistoryRowF64(module, ptr, row) {
  writeUint64(module, ptr, row.pathKey);
  writeUint64(module, ptr + 8, row.segmentIndex);
  module.setValue(ptr + 16, row.startTime, "double");
  module.setValue(ptr + 24, row.endTime, "double");
  writeVector(module, ptr + 32, row.start);
  writeVector(module, ptr + 56, row.velocity);
  module.setValue(ptr + 80, row.errorBound ?? 0, "double");
  module.setValue(ptr + 88, row.stateFlags ?? 0, "i32");
  module.setValue(ptr + 92, 0, "i32");
}

function writeAssemblyStateRowF64(module, ptr, row) {
  writeUint64(module, ptr, row.assemblyKey);
  writeUint64(module, ptr + 8, row.assemblyStateKey);
  module.setValue(ptr + 16, row.timeStart, "double");
  module.setValue(ptr + 24, row.timeEnd, "double");
  writeVector(module, ptr + 32, row.center);
  writeVector(module, ptr + 56, row.velocity);
  module.setValue(ptr + 80, row.phase ?? 0, "double");
  writeInt64(module, ptr + 88, row.cycleIndex ?? 0);
  module.setValue(ptr + 96, row.modelVersion ?? 1, "i32");
  module.setValue(ptr + 100, row.statusFlags ?? 0, "i32");
  module.setValue(ptr + 104, row.fidelityFlags ?? 0, "i32");
  module.setValue(ptr + 108, 0, "i32");
}

function writeSpaceTimeIndexOptionsF64(module, ptr, options) {
  module.setValue(ptr, options.spatialCellSize, "double");
  module.setValue(ptr + 8, options.timeBinSize, "double");
  module.setValue(ptr + 16, options.maxCellsPerItem, "i32");
  module.setValue(ptr + 20, 0, "i32");
}

function writeSpaceTimeQueryF64(module, ptr, query) {
  writeSpaceTimeBoundsF64(module, ptr, query.bounds);
  module.setValue(ptr + 64, query.filterSpace === false ? 0 : 1, "i32");
  module.setValue(ptr + 68, query.filterTime === false ? 0 : 1, "i32");
  module.setValue(ptr + 72, query.subjectKind == null ? 0 : 1, "i32");
  module.setValue(ptr + 76, query.subjectKind ?? 1, "i32");
  module.setValue(ptr + 80, query.subjectKey == null ? 0 : 1, "i32");
  module.setValue(ptr + 84, 0, "i32");
  writeUint64(module, ptr + 88, query.subjectKey ?? 0);
}

function writeSpaceTimeBoundsF64(module, ptr, bounds) {
  writeVector(module, ptr, bounds.min);
  writeVector(module, ptr + 24, bounds.max);
  module.setValue(ptr + 48, bounds.timeStart, "double");
  module.setValue(ptr + 56, bounds.timeEnd, "double");
}

function writeSpaceTimeIndexRowF64(module, ptr, row) {
  writeInt64(module, ptr, row.cellX);
  writeInt64(module, ptr + 8, row.cellY);
  writeInt64(module, ptr + 16, row.cellZ);
  writeInt64(module, ptr + 24, row.cellT);
  writeUint64(module, ptr + 32, row.subjectKey);
  writeUint64(module, ptr + 40, row.rowOffset);
  writeVector(module, ptr + 48, row.min);
  writeVector(module, ptr + 72, row.max);
  module.setValue(ptr + 96, row.timeStart, "double");
  module.setValue(ptr + 104, row.timeEnd, "double");
  module.setValue(ptr + 112, row.subjectKind, "i32");
  module.setValue(ptr + 116, row.sourceLayout, "i32");
  module.setValue(ptr + 120, row.stateFlags ?? 0, "i32");
  module.setValue(ptr + 124, 0, "i32");
}

function writeSegment(module, ptr, segment) {
  module.setValue(ptr, segment.startTime, "double");
  module.setValue(ptr + 8, segment.endTime, "double");
  writeVector(module, ptr + 16, segment.positionAtStart);
  writeVector(module, ptr + 40, segment.velocity);
  module.setValue(ptr + 64, segment.errorBound ?? 0, "double");
}

function writeVector(module, ptr, vector) {
  module.setValue(ptr, vector?.x ?? 0, "double");
  module.setValue(ptr + 8, vector?.y ?? 0, "double");
  module.setValue(ptr + 16, vector?.z ?? 0, "double");
}

function readCausalRootRowF64(module, ptr) {
  return {
    rootId: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    emissionTime: module.getValue(ptr + 8, "double"),
    hitTime: module.getValue(ptr + 16, "double"),
    delay: module.getValue(ptr + 24, "double"),
    distance: module.getValue(ptr + 32, "double"),
    residual: module.getValue(ptr + 40, "double"),
    jacobian: module.getValue(ptr + 48, "double"),
    branchWeight: module.getValue(ptr + 56, "double"),
    sourcePoint: readVector(module, ptr + 64),
    receiverPoint: readVector(module, ptr + 88),
  };
}

function readRootLedgerDetailRowF64(module, ptr) {
  return {
    ledgerKey: readUint64(module, ptr),
    sourceKey: readUint64(module, ptr + 8),
    receiverKey: readUint64(module, ptr + 16),
    rootKey: readUint64(module, ptr + 24),
    intervalStart: module.getValue(ptr + 32, "double"),
    intervalEnd: module.getValue(ptr + 40, "double"),
    emissionTime: module.getValue(ptr + 48, "double"),
    hitTime: module.getValue(ptr + 56, "double"),
    delay: module.getValue(ptr + 64, "double"),
    residual: module.getValue(ptr + 72, "double"),
    jacobian: module.getValue(ptr + 80, "double"),
    branchWeight: module.getValue(ptr + 88, "double"),
    bracketStart: module.getValue(ptr + 96, "double"),
    bracketEnd: module.getValue(ptr + 104, "double"),
    sourcePoint: readVector(module, ptr + 112),
    receiverPoint: readVector(module, ptr + 136),
    entryKind: module.getValue(ptr + 160, "i32") >>> 0,
    rootKind: module.getValue(ptr + 164, "i32") >>> 0,
    statusCode: module.getValue(ptr + 168, "i32") >>> 0,
    jacobianSignStratum: module.getValue(ptr + 172, "i32") >>> 0,
    sequenceIndex: module.getValue(ptr + 176, "i32") >>> 0,
    iterationCount: module.getValue(ptr + 180, "i32") >>> 0,
    stateFlags: module.getValue(ptr + 184, "i32") >>> 0,
  };
}

function readDelayedHitRowF64(module, ptr) {
  return {
    eventId: module.getValue(ptr, "i32"),
    rootId: module.getValue(ptr + 4, "i32"),
    statusCode: module.getValue(ptr + 8, "i32"),
    emissionTime: module.getValue(ptr + 16, "double"),
    hitTime: module.getValue(ptr + 24, "double"),
    distance: module.getValue(ptr + 32, "double"),
    jacobian: module.getValue(ptr + 40, "double"),
    strength: module.getValue(ptr + 48, "double"),
    emissionPoint: readVector(module, ptr + 56),
    receiverPoint: readVector(module, ptr + 80),
    unitDirection: readVector(module, ptr + 104),
  };
}

function readCausalRootBatchItemRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    rootOffset: module.getValue(ptr + 8, "i32"),
    rootCount: module.getValue(ptr + 12, "i32"),
  };
}

function readPrecisionDiagnosticRowF64(module, ptr) {
  const flags = module.getValue(ptr + 12, "i32");
  return {
    statusCode: module.getValue(ptr, "i32"),
    recommendedPath: PRECISION_PATH_BY_ID[module.getValue(ptr + 4, "i32")] || "auto",
    recommendedNumericType: NUMERIC_TYPE_BY_ID[module.getValue(ptr + 8, "i32")] || "f64",
    scaleNormalizationRecommended: Boolean(flags & 1),
    extendedPrecisionRecommended: Boolean(flags & 2),
    scaleResolutionLimited: Boolean(flags & 4),
    timeResolutionLimited: Boolean(flags & 8),
    timeScale: {
      ordersOfMagnitude: module.getValue(ptr + 16, "double"),
      maxMagnitude: module.getValue(ptr + 48, "double"),
      minNonzeroMagnitude: module.getValue(ptr + 80, "double"),
    },
    geometryScale: {
      ordersOfMagnitude: module.getValue(ptr + 24, "double"),
      maxMagnitude: module.getValue(ptr + 56, "double"),
      minNonzeroMagnitude: module.getValue(ptr + 88, "double"),
    },
    speedScale: {
      ordersOfMagnitude: module.getValue(ptr + 32, "double"),
      maxMagnitude: module.getValue(ptr + 64, "double"),
    },
    toleranceScale: {
      ordersOfMagnitude: module.getValue(ptr + 40, "double"),
      minNonzeroMagnitude: module.getValue(ptr + 72, "double"),
    },
  };
}

function readPhaseAtHitRowF64(module, ptr) {
  return {
    rootId: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    sourceCycleIndex: readInt64(module, ptr + 8),
    receiverCycleIndex: readInt64(module, ptr + 16),
    emissionTime: module.getValue(ptr + 24, "double"),
    hitTime: module.getValue(ptr + 32, "double"),
    sourcePhase: module.getValue(ptr + 40, "double"),
    receiverPhase: module.getValue(ptr + 48, "double"),
    phaseDelta: module.getValue(ptr + 56, "double"),
    phaseSpread: module.getValue(ptr + 64, "double"),
  };
}

function readBoundsRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    statusCode: module.getValue(ptr + 4, "i32"),
    pathKey: readUint64(module, ptr + 8),
    min: readVector(module, ptr + 16),
    max: readVector(module, ptr + 40),
  };
}

function readSpherePointIntersectionRowF64(module, ptr) {
  return {
    itemIndex: module.getValue(ptr, "i32"),
    intersects: module.getValue(ptr + 4, "i32") !== 0,
    centerDistance: module.getValue(ptr + 8, "double"),
    signedDistance: module.getValue(ptr + 16, "double"),
  };
}

function readMotionFrameRowF64(module, ptr) {
  return {
    pathKey: readUint64(module, ptr),
    frameIndex: readUint64(module, ptr + 8),
    time: module.getValue(ptr + 16, "double"),
    position: readVector(module, ptr + 24),
    velocity: readVector(module, ptr + 48),
    errorBound: module.getValue(ptr + 72, "double"),
    stateFlags: module.getValue(ptr + 80, "i32") >>> 0,
  };
}

function readAssemblyEventRowF64(module, ptr) {
  return {
    eventKey: readUint64(module, ptr),
    primaryId: readUint64(module, ptr + 8),
    secondaryId: readUint64(module, ptr + 16),
    priorStateKey: readUint64(module, ptr + 24),
    nextStateKey: readUint64(module, ptr + 32),
    relatedPathKey: readUint64(module, ptr + 40),
    relatedAssemblyKey: readUint64(module, ptr + 48),
    branchTransitionKey: readUint64(module, ptr + 56),
    eventTime: module.getValue(ptr + 64, "double"),
    eventKind: module.getValue(ptr + 72, "i32") >>> 0,
    speedRegime: module.getValue(ptr + 76, "i32") >>> 0,
    statusFlags: module.getValue(ptr + 80, "i32") >>> 0,
  };
}

function readSpaceTimeIndexRows(module, ptr, rowCount, abiInfo) {
  const rows = [];
  for (let index = 0; index < rowCount; index += 1) {
    rows.push(readSpaceTimeIndexRowF64(module, ptr + index * abiInfo.spaceTimeIndexRowF64Bytes));
  }
  return rows;
}

function readSpaceTimeIndexRowF64(module, ptr) {
  return {
    cellX: readInt64(module, ptr),
    cellY: readInt64(module, ptr + 8),
    cellZ: readInt64(module, ptr + 16),
    cellT: readInt64(module, ptr + 24),
    subjectKey: readUint64(module, ptr + 32),
    rowOffset: readUint64(module, ptr + 40),
    min: readVector(module, ptr + 48),
    max: readVector(module, ptr + 72),
    timeStart: module.getValue(ptr + 96, "double"),
    timeEnd: module.getValue(ptr + 104, "double"),
    subjectKind: module.getValue(ptr + 112, "i32") >>> 0,
    sourceLayout: module.getValue(ptr + 116, "i32") >>> 0,
    stateFlags: module.getValue(ptr + 120, "i32") >>> 0,
  };
}

function readVector(module, ptr) {
  return {
    x: module.getValue(ptr, "double"),
    y: module.getValue(ptr + 8, "double"),
    z: module.getValue(ptr + 16, "double"),
  };
}

function writeUint64(module, ptr, value) {
  const encoded = BigInt(value);
  const low = Number(encoded & 0xffffffffn);
  const high = Number((encoded >> 32n) & 0xffffffffn);
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    module.HEAPU32[index] = low;
    module.HEAPU32[index + 1] = high;
    return;
  }
  module.setValue(ptr, low, "i32");
  module.setValue(ptr + 4, high, "i32");
}

function writeInt64(module, ptr, value) {
  let encoded = BigInt(value);
  if (encoded < 0) {
    encoded = (1n << 64n) + encoded;
  }
  const low = Number(encoded & 0xffffffffn);
  const high = Number((encoded >> 32n) & 0xffffffffn);
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    module.HEAPU32[index] = low;
    module.HEAPU32[index + 1] = high;
    return;
  }
  module.setValue(ptr, low, "i32");
  module.setValue(ptr + 4, high, "i32");
}

function readUint64(module, ptr) {
  let low;
  let high;
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    low = module.HEAPU32[index];
    high = module.HEAPU32[index + 1];
  } else {
    low = module.getValue(ptr, "i32") >>> 0;
    high = module.getValue(ptr + 4, "i32") >>> 0;
  }
  return Number((BigInt(high) << 32n) + BigInt(low));
}

function readInt64(module, ptr) {
  let low;
  let high;
  if (module.HEAPU32 && ptr % 4 === 0) {
    const index = ptr >>> 2;
    low = module.HEAPU32[index];
    high = module.HEAPU32[index + 1];
  } else {
    low = module.getValue(ptr, "i32") >>> 0;
    high = module.getValue(ptr + 4, "i32") >>> 0;
  }
  const unsigned = (BigInt(high) << 32n) + BigInt(low);
  const signed = high & 0x80000000 ? unsigned - (1n << 64n) : unsigned;
  return Number(signed);
}

function copyWasmBytes(module, ptr, byteLength) {
  if (byteLength === 0) {
    return new ArrayBuffer(0);
  }
  if (module.HEAPU8 && typeof module.HEAPU8.subarray === "function") {
    const copy = new Uint8Array(byteLength);
    copy.set(module.HEAPU8.subarray(ptr, ptr + byteLength));
    return copy.buffer;
  }
  const copy = new Uint8Array(byteLength);
  for (let index = 0; index < byteLength; index += 1) {
    copy[index] = module.getValue(ptr + index, "i8") & 0xff;
  }
  return copy.buffer;
}

function createBufferDescriptor(bufferId, layout, rowCount, rowSizeBytes, buffer) {
  const descriptor = {
    bufferId,
    layout,
    byteOffset: 0,
    byteLength: rowCount * rowSizeBytes,
    rowCount,
    numericType: "f64",
  };
  if (buffer) {
    descriptor.buffer = buffer;
  }
  return descriptor;
}

function createTransientStreamDescriptor(streamId, hitTime, buffers) {
  let byteOffset = 0;
  const availableRanges = buffers.map((buffer) => {
    const byteRange = {
      start: byteOffset,
      end: byteOffset + buffer.byteLength,
    };
    byteOffset += buffer.byteLength;
    return {
      timeRange: { start: hitTime, end: hitTime },
      frameRange: { start: 0, end: Math.max(0, buffer.rowCount - 1) },
      byteRange,
    };
  });
  return {
    streamId,
    manifestVersion: "solver-stream-manifest.v1",
    indexLayout: "stream_index.v1",
    availableRanges,
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: byteOffset,
    },
  };
}

function registerResponseStreams(state, response) {
  if (!response || !Array.isArray(response.streams)) {
    return;
  }
  response.streams.forEach((stream) => {
    state.streams.set(stream.streamId, {
      stream,
      buffers: response.buffers.map(copyBufferDescriptor),
    });
  });
}

function openRegisteredStream(state, request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream open request object is required", {
        recoverable: false,
      })
    );
  }
  if (!["playback", "diagnostics", "export", "validation"].includes(request.purpose)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream open purpose is required", {
        recoverable: false,
      })
    );
  }
  const streamEntry = findStreamEntry(state, request.streamId);
  const readableLayouts = [...new Set(streamEntry.buffers.map((buffer) => buffer.layout))];
  return {
    streamId: streamEntry.stream.streamId,
    manifestVersion: streamEntry.stream.manifestVersion,
    readableLayouts,
    availableRanges: streamEntry.stream.availableRanges.map(copyStreamRange),
  };
}

function readRegisteredStreamRange(state, request) {
  if (!request || typeof request !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "stream range request object is required", {
        recoverable: false,
      })
    );
  }
  if (request.eventKinds?.length) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "event kind filtering is not available for this stream", {
        recoverable: false,
      })
    );
  }
  const streamEntry = findStreamEntry(state, request.streamId);
  const selected = selectStreamRanges(streamEntry, request);
  const totalBytes = selected.reduce((sum, item) => sum + item.buffer.byteLength, 0);
  if (request.maxBytes != null) {
    requireNonnegativeInteger(request.maxBytes, "maxBytes");
    if (totalBytes > request.maxBytes) {
      throw new SolverBridgeError(
        createStatus("stream_memory_pressure", "halt", "requested stream range exceeds maxBytes", {
          recoverable: true,
          details: { requestedBytes: totalBytes, maxBytes: request.maxBytes },
        })
      );
    }
  }
  return {
    streamId: streamEntry.stream.streamId,
    ranges: selected.map((item) => copyStreamRange(item.range)),
    buffers: selected.map((item) => ({
      ...copyBufferDescriptor(item.descriptor),
      byteOffset: 0,
      byteLength: item.buffer.byteLength,
      rowCount: item.rowCount,
      buffer: item.buffer,
    })),
    diagnostics: [],
    status: createStatus("ok", "ok", "stream range read"),
  };
}

function findStreamEntry(state, streamId) {
  if (streamId != null && (typeof streamId !== "string" || streamId.length === 0)) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "streamId must be a nonempty string", {
        recoverable: false,
      })
    );
  }
  if (streamId) {
    const entry = state.streams.get(streamId);
    if (entry) {
      return entry;
    }
    throw new SolverBridgeError(
      createStatus("stream_read_failed", "halt", "stream not found", {
        recoverable: false,
        details: { streamId },
      })
    );
  }
  if (state.streams.size === 1) {
    return [...state.streams.values()][0];
  }
  throw new SolverBridgeError(
    createStatus("app_contract_error", "error", "streamId is required when multiple streams exist", {
      recoverable: false,
    })
  );
}

function selectStreamRanges(streamEntry, request) {
  const results = [];
  streamEntry.stream.availableRanges.forEach((range, index) => {
    const descriptor = streamEntry.buffers[index];
    if (!descriptor || !descriptor.buffer) {
      return;
    }
    if (!rangeMatchesRequest(range, request)) {
      return;
    }
    const sliceRange = request.byteRange
      ? intersectRange(range.byteRange, request.byteRange)
      : { ...range.byteRange };
    if (!sliceRange) {
      return;
    }
    const localStart = Math.max(0, sliceRange.start - range.byteRange.start);
    const localEnd = Math.max(localStart, sliceRange.end - range.byteRange.start);
    results.push({
      range: {
        ...copyStreamRange(range),
        byteRange: { start: sliceRange.start, end: sliceRange.end },
      },
      descriptor,
      rowCount: rowCountForSlice(descriptor, localStart, localEnd),
      buffer: sliceArrayBuffer(descriptor.buffer, localStart, localEnd),
    });
  });
  return results;
}

function rowCountForSlice(descriptor, localStart, localEnd) {
  if (!descriptor.rowCount || !descriptor.byteLength) {
    return 0;
  }
  const rowSize = descriptor.byteLength / descriptor.rowCount;
  const byteLength = localEnd - localStart;
  if (!Number.isInteger(rowSize) || rowSize <= 0) {
    return 0;
  }
  if (localStart % rowSize !== 0 || byteLength % rowSize !== 0) {
    return 0;
  }
  return byteLength / rowSize;
}

function rangeMatchesRequest(range, request) {
  return (
    rangeOverlapsOptional(range.timeRange, request.timeRange) &&
    rangeOverlapsOptional(range.frameRange, request.frameRange) &&
    byteRangeOverlapsOptional(range.byteRange, request.byteRange)
  );
}

function rangeOverlapsOptional(available, requested) {
  if (!requested) {
    return true;
  }
  validateRange(requested, "range filter");
  if (!available) {
    return false;
  }
  return available.start <= requested.end && available.end >= requested.start;
}

function byteRangeOverlapsOptional(available, requested) {
  if (!requested) {
    return true;
  }
  validateRange(requested, "byteRange");
  if (!available) {
    return false;
  }
  return available.start < requested.end && available.end > requested.start;
}

function intersectRange(available, requested) {
  validateRange(requested, "byteRange");
  const start = Math.max(available.start, requested.start);
  const end = Math.min(available.end, requested.end);
  return start < end ? { start, end } : null;
}

function validateRange(range, label) {
  if (!range || typeof range !== "object") {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} must be an object`, {
        recoverable: false,
      })
    );
  }
  requireFiniteNumber(range.start, `${label}.start`);
  requireFiniteNumber(range.end, `${label}.end`);
  if (range.end < range.start) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", `${label} bounds are not ordered`, {
        recoverable: false,
      })
    );
  }
}

function copyBufferDescriptor(descriptor) {
  return {
    ...descriptor,
    buffer: descriptor.buffer ? descriptor.buffer.slice(0) : undefined,
  };
}

function copyStreamRange(range) {
  return {
    timeRange: range.timeRange ? { ...range.timeRange } : undefined,
    frameRange: range.frameRange ? { ...range.frameRange } : undefined,
    byteRange: { ...range.byteRange },
  };
}

function sliceArrayBuffer(buffer, start, end) {
  return buffer.slice(start, end);
}

function assertNotDisposed(state) {
  if (state.disposed) {
    throw new SolverBridgeError(
      createStatus("app_contract_error", "error", "solver bridge has been disposed", {
        recoverable: false,
      })
    );
  }
}

function createStatus(code, severity, message, options = {}) {
  return {
    code,
    severity,
    message,
    runId: options.runId,
    requestId: options.requestId,
    stage: options.stage,
    recoverable: options.recoverable ?? true,
    details: options.details,
  };
}
