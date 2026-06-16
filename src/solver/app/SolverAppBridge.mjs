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
  "delayed_hit_events.v1",
  "phase_at_hit.v1",
  "geometry_buffer.v1",
  "stream_index.v1",
];

const PRECISION_PATH_BY_ID = DEFAULT_PRECISION_PATHS;
const NUMERIC_TYPE_BY_ID = ["f64", "scaled_i64", "interval_f64_pair", "decimal128", "mp_limb_block"];
const DEFAULT_CAPABILITY_ENVELOPE = {
  maxInteractiveEntities: 2048,
  maxBatchEntities: 200000,
  minMemoryBudgetBytes: 16 * 1024 * 1024,
  minStorageBudgetBytesForStreaming: 64 * 1024 * 1024,
  minimumPositiveTolerance: 1e-15,
};
const CAUSAL_ROOT_REQUEST_F64_BYTES = 176;
const CAUSAL_ROOT_ROW_F64_BYTES = 112;
const DELAYED_HIT_ROW_F64_BYTES = 128;
const CAUSAL_ROOT_BATCH_ITEM_ROW_F64_BYTES = 24;
const PRECISION_DIAGNOSTIC_ROW_F64_BYTES = 96;
const DEFAULT_MAX_CAUSAL_ROOTS = 64;
const ABI_INFO_BYTES = 24;

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
      if (!request || typeof request !== "object") {
        throw new SolverBridgeError(
          createStatus("app_contract_error", "error", "solver request object is required", {
            recoverable: false,
          })
        );
      }
      throw new SolverBridgeError(
        createStatus(
          "app_contract_error",
          "halt",
          "runSimulation is not implemented until the typed C ABI is added",
          { runId: request.runId, requestId: request.requestId, recoverable: false }
        )
      );
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

export function hasCausalRootCAbi(module) {
  return (
    typeof module?._architrino_solver_solve_causal_roots_f64 === "function" &&
    typeof module?._architrino_solver_solve_roots_and_hits_f64 === "function" &&
    typeof module?._architrino_solver_solve_causal_root_batch_f64 === "function" &&
    typeof module?._architrino_solver_diagnose_precision_f64 === "function" &&
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
  };
}

function assertAbiInfo(abiInfo) {
  if (
    abiInfo.rootRequestF64Bytes !== CAUSAL_ROOT_REQUEST_F64_BYTES ||
    abiInfo.rootRowF64Bytes !== CAUSAL_ROOT_ROW_F64_BYTES ||
    abiInfo.delayedHitRowF64Bytes !== DELAYED_HIT_ROW_F64_BYTES
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
      status: createStatus("ok", "ok", "precision diagnostic complete"),
    };
  } finally {
    module._free(requestPtr);
    module._free(diagnosticPtr);
  }
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

function writeCausalRootRequestF64(module, ptr, request) {
  writeSegment(module, ptr, request.source);
  writeSegment(module, ptr + 72, request.receiver);
  module.setValue(ptr + 144, request.hitTime, "double");
  module.setValue(ptr + 152, request.signalSpeed, "double");
  module.setValue(ptr + 160, request.rootTolerance ?? 1e-12, "double");
  module.setValue(ptr + 168, request.maxIterations ?? 96, "i32");
  module.setValue(ptr + 172, request.scanSubdivisions ?? 64, "i32");
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

function readVector(module, ptr) {
  return {
    x: module.getValue(ptr, "double"),
    y: module.getValue(ptr + 8, "double"),
    z: module.getValue(ptr + 16, "double"),
  };
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
