import { SolverBridgeError, createSolverAppBridgeClient } from "./SolverAppBridge.mjs";

export const SOLVER_APP_WORKER_PROTOCOL_VERSION = "solver-app-worker/v1";

export const SOLVER_APP_WORKER_METHODS = Object.freeze([
  "init",
  "capabilities",
  "planThreadingPolicy",
  "prepareWorkPacketHeader",
  "orderWorkPacketResults",
  "mergeEmissionShellCandidatePacketResponsesF64",
  "planPathHistoryWorkPackets",
  "admitSimulationEnvelope",
  "runSimulation",
  "describeRun",
  "describeStream",
  "validatePathHistoryDynamicReplayF64",
  "diagnosePrecisionF64",
  "solveCausalRootsPrecisionF64",
  "solveRootsAndHitsPrecisionF64",
  "propagateErrorBudgetF64",
  "checkRootHitInvariantsF64",
  "classifyRootLedgerTransitionsF64",
  "solveCausalRootsF64",
  "solveCausalRootsNormalizedF64",
  "solveCausalRootBatchF64",
  "solveRootsAndHitsF64",
  "buildRootLedgerDetailF64",
  "computePhaseAtHitF64",
  "summarizePhaseAtHitsF64",
  "computeSharedGeometryF64",
  "detectAssemblyMembershipEventsF64",
  "buildAssemblyGraphDatasetF64",
  "createAssemblyGraphStoreF64",
  "describeAssemblyGraphStoreF64",
  "readAssemblyGraphStoreRangeF64",
  "buildSpaceTimeIndexF64",
  "buildPathHistoryStreamSpaceTimeIndexF64",
  "querySpaceTimeIndexF64",
  "sampleLinearMotionF64",
  "integrateConstantAccelerationMotionF64",
  "createPathHistoryStreamF64",
  "planPathHistoryStorageLifecycleF64",
  "queryEmissionShellCandidatesF64",
  "queryEmissionShellCandidatePacketF64",
  "queryEmissionShellCandidatePacketsF64",
  "refineEmissionShellCandidateRootsF64",
  "cancelRun",
  "openStream",
  "readStreamRange",
  "closeRun",
  "dispose",
]);

const SOLVER_APP_WORKER_METHOD_SET = new Set(SOLVER_APP_WORKER_METHODS);

export function createSolverAppWorkerHandler(options = {}) {
  const client = options.client ?? createSolverAppBridgeClient(options.clientOptions ?? options);
  let disposed = false;
  return {
    async handleMessage(message) {
      if (disposed) {
        return createWorkerErrorResponse(message, createWorkerStatus(
          "app_contract_error",
          "error",
          "solver worker bridge has been disposed",
          { recoverable: false }
        ));
      }
      const response = await dispatchSolverAppWorkerMessage(client, message);
      if (message?.method === "dispose" && response.type === "response") {
        disposed = true;
      }
      return response;
    },
    async dispose() {
      disposed = true;
      if (typeof client.dispose === "function") {
        await client.dispose();
      }
    },
  };
}

export async function dispatchSolverAppWorkerMessage(client, message) {
  try {
    validateWorkerRequestMessage(message);
    const method = message.method;
    const request = message.request ?? {};
    const response = method === "capabilities" || method === "dispose"
      ? await client[method]()
      : await client[method](request);
    return {
      schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
      type: "response",
      requestId: message.requestId,
      method,
      response,
    };
  } catch (error) {
    return createWorkerErrorResponse(message, normalizeWorkerErrorStatus(error));
  }
}

export function installSolverAppWorkerBridge(scope, options = {}) {
  if (!scope || typeof scope.postMessage !== "function") {
    throw new TypeError("worker scope with postMessage is required");
  }
  const handler = createSolverAppWorkerHandler(options);
  const listener = async (event) => {
    const response = await handler.handleMessage(event.data);
    scope.postMessage(response, collectTransferables(response));
  };
  if (typeof scope.addEventListener === "function") {
    scope.addEventListener("message", listener);
  } else {
    scope.onmessage = listener;
  }
  return {
    handler,
    dispose() {
      if (typeof scope.removeEventListener === "function") {
        scope.removeEventListener("message", listener);
      } else if (scope.onmessage === listener) {
        scope.onmessage = null;
      }
      return handler.dispose();
    },
  };
}

export function createSolverAppWorkerClient(worker, options = {}) {
  if (!worker || typeof worker.postMessage !== "function") {
    throw new TypeError("worker with postMessage is required");
  }
  const requestTimeoutMs = options.requestTimeoutMs ?? 30000;
  const pending = new Map();
  let nextRequestId = 1;
  let disposed = false;

  const listener = (event) => {
    const message = event.data ?? event;
    if (!message || message.schema !== SOLVER_APP_WORKER_PROTOCOL_VERSION) {
      return;
    }
    const pendingRequest = pending.get(message.requestId);
    if (!pendingRequest) {
      return;
    }
    pending.delete(message.requestId);
    clearTimeout(pendingRequest.timeout);
    if (message.type === "response") {
      pendingRequest.resolve(message.response);
      return;
    }
    pendingRequest.reject(new SolverBridgeError(message.status));
  };
  const removeMessageListener = addWorkerMessageListener(worker, listener);

  const invoke = (method, request) => {
    if (disposed && method !== "dispose") {
      return Promise.reject(new SolverBridgeError(createWorkerStatus(
        "app_contract_error",
        "error",
        "solver worker client has been disposed",
        { recoverable: false }
      )));
    }
    const requestId = `${options.requestIdPrefix ?? "solver-worker"}-${nextRequestId++}`;
    const message = {
      schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
      type: "request",
      requestId,
      method,
      request,
    };
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        pending.delete(requestId);
        reject(new SolverBridgeError(createWorkerStatus(
          "internal_solver_error",
          "error",
          "solver worker request timed out",
          { recoverable: true, details: { requestId, method, reason: "worker_timeout" } }
        )));
      }, requestTimeoutMs);
      pending.set(requestId, { resolve, reject, timeout });
      worker.postMessage(message, collectTransferables(message));
    });
  };

  const client = {};
  for (const method of SOLVER_APP_WORKER_METHODS) {
    client[method] = async (request) => {
      const response = await invoke(method, request ?? {});
      if (method === "dispose") {
        disposed = true;
        removeMessageListener();
        if (options.terminateOnDispose && typeof worker.terminate === "function") {
          worker.terminate();
        }
      }
      return response;
    };
  }
  return client;
}

export function createInProcessSolverAppWorkerClient(options = {}) {
  const handler = createSolverAppWorkerHandler(options);
  const client = {};
  let nextRequestId = 1;
  for (const method of SOLVER_APP_WORKER_METHODS) {
    client[method] = async (request) => {
      const response = await handler.handleMessage({
        schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
        type: "request",
        requestId: `in-process-worker-${nextRequestId++}`,
        method,
        request,
      });
      if (response.type === "response") {
        return response.response;
      }
      throw new SolverBridgeError(response.status);
    };
  }
  return client;
}

export function collectTransferables(value) {
  const transferables = [];
  const seen = new Set();
  collectTransferablesInto(value, transferables, seen);
  return transferables;
}

function validateWorkerRequestMessage(message) {
  if (!message || typeof message !== "object" || Array.isArray(message)) {
    throw new SolverBridgeError(createWorkerStatus(
      "app_contract_error",
      "error",
      "solver worker request message is required",
      { recoverable: false }
    ));
  }
  if (message.schema !== SOLVER_APP_WORKER_PROTOCOL_VERSION) {
    throw new SolverBridgeError(createWorkerStatus(
      "app_contract_error",
      "error",
      "solver worker request schema mismatch",
      { recoverable: false, details: { schema: message.schema } }
    ));
  }
  if (message.type !== "request") {
    throw new SolverBridgeError(createWorkerStatus(
      "app_contract_error",
      "error",
      "solver worker message type must be request",
      { recoverable: false, details: { type: message.type } }
    ));
  }
  if (typeof message.requestId !== "string" || message.requestId.length === 0) {
    throw new SolverBridgeError(createWorkerStatus(
      "app_contract_error",
      "error",
      "solver worker requestId is required",
      { recoverable: false }
    ));
  }
  if (!SOLVER_APP_WORKER_METHOD_SET.has(message.method)) {
    throw new SolverBridgeError(createWorkerStatus(
      "app_contract_error",
      "error",
      "solver worker method is not supported",
      { recoverable: false, details: { method: message.method } }
    ));
  }
}

function createWorkerErrorResponse(message, status) {
  return {
    schema: SOLVER_APP_WORKER_PROTOCOL_VERSION,
    type: "error",
    requestId: typeof message?.requestId === "string" && message.requestId.length > 0
      ? message.requestId
      : "unknown-request",
    method: typeof message?.method === "string" ? message.method : "unknown",
    status,
  };
}

function normalizeWorkerErrorStatus(error) {
  if (error instanceof SolverBridgeError && error.status) {
    return error.status;
  }
  return createWorkerStatus(
    "app_contract_error",
    "error",
    error instanceof Error ? error.message : "solver worker request failed",
    { recoverable: false }
  );
}

function createWorkerStatus(code, severity, message, options = {}) {
  const status = {
    code,
    severity,
    message,
    recoverable: options.recoverable ?? true,
  };
  if (options.stage) {
    status.stage = options.stage;
  }
  if (options.details) {
    status.details = options.details;
  }
  return status;
}

function addWorkerMessageListener(worker, listener) {
  if (typeof worker.addEventListener === "function") {
    worker.addEventListener("message", listener);
    return () => worker.removeEventListener("message", listener);
  } else if (typeof worker.on === "function") {
    const wrapper = (message) => listener({ data: message });
    worker.on("message", wrapper);
    return () => {
      if (typeof worker.off === "function") {
        worker.off("message", wrapper);
      } else if (typeof worker.removeListener === "function") {
        worker.removeListener("message", wrapper);
      }
    };
  } else {
    throw new TypeError("worker must support addEventListener or on");
  }
}

function collectTransferablesInto(value, transferables, seen) {
  if (!value || typeof value !== "object") {
    return;
  }
  if (seen.has(value)) {
    return;
  }
  seen.add(value);
  if (value instanceof ArrayBuffer) {
    transferables.push(value);
    return;
  }
  if (ArrayBuffer.isView(value)) {
    if (!seen.has(value.buffer)) {
      seen.add(value.buffer);
      transferables.push(value.buffer);
    }
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item) => collectTransferablesInto(item, transferables, seen));
    return;
  }
  for (const item of Object.values(value)) {
    collectTransferablesInto(item, transferables, seen);
  }
}
