import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "./SolverAppBridge.mjs";
import { createSolverAppWorkerClient } from "./SolverAppWorkerBridge.mjs";

export const SOLVER_APP_BRIDGE_CLIENT_RESOLVER_VERSION =
  "solver-app-bridge-client-resolver.v1";

const DEFAULT_MEMORY_BUDGET_BYTES = 64 * 1024 * 1024;
const DEFAULT_WASM_FACTORY_GLOBAL_NAMES = Object.freeze([
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
]);

export async function runSolverAppBridgeRequest({
  appId,
  methodName = "runSimulation",
  request,
  options = {},
  bridgeConfig,
  factoryRequest,
  requestedCapabilities = [],
  storagePolicy,
  threadingPolicy,
  initRequest,
  missingClientMessage,
} = {}) {
  const resolved = await resolveSolverAppBridgeClient({
    appId,
    requiredMethod: methodName,
    request,
    options,
    bridgeConfig,
    factoryRequest,
    requestedCapabilities,
    storagePolicy,
    threadingPolicy,
    initRequest,
    missingClientMessage,
  });
  try {
    return await resolved.client[methodName](request);
  } finally {
    if (resolved.disposeAfterRun && typeof resolved.client.dispose === "function") {
      await resolved.client.dispose();
    }
  }
}

export async function resolveSolverAppBridgeClient({
  appId,
  requiredMethod = "runSimulation",
  request,
  options = {},
  bridgeConfig,
  factoryRequest,
  requestedCapabilities = [],
  storagePolicy,
  threadingPolicy,
  initRequest,
  missingClientMessage,
} = {}) {
  const config = resolveBridgeConfig({ request, options, bridgeConfig });
  if (options.solverClient && typeof options.solverClient[requiredMethod] === "function") {
    return { client: options.solverClient, disposeAfterRun: false, source: "provided-client" };
  }
  if (typeof options.createSolverBridgeClient === "function") {
    const client = await options.createSolverBridgeClient(factoryRequest ?? request, {
      appId,
      requiredMethod,
      bridgeConfig: config,
      requestedCapabilities,
    });
    assertSolverBridgeClientMethod(client, requiredMethod, "solver bridge client factory");
    return {
      client,
      disposeAfterRun: options.disposeSolverBridgeClientAfterRun === true,
      source: "factory-client",
    };
  }

  const workerResolution = await resolveSolverAppBridgeWorker({
    appId,
    requiredMethod,
    request,
    options,
    bridgeConfig: config,
    factoryRequest,
    requestedCapabilities,
  });
  if (workerResolution) {
    const client = createSolverAppWorkerClient(workerResolution.worker, {
      requestIdPrefix:
        options.workerRequestIdPrefix ??
        config.workerRequestIdPrefix ??
        `${appId}-solver-worker`,
      terminateOnDispose:
        options.terminateSolverWorkerOnDispose ??
        config.terminateSolverWorkerOnDispose ??
        workerResolution.terminateOnDispose,
      ...(config.workerClientOptions ?? {}),
      ...(options.solverWorkerClientOptions ?? {}),
    });
    assertSolverBridgeClientMethod(client, requiredMethod, "solver app worker client");
    await client.init(
      initRequest ??
        createSolverAppBridgeInitRequest({
          appId,
          requestedCapabilities,
          options,
          bridgeConfig: config,
          storagePolicy,
          threadingPolicy,
        })
    );
    return {
      client,
      disposeAfterRun: workerResolution.disposeAfterRun,
      source: workerResolution.source,
    };
  }

  const createWasmModule = resolveSolverAppBridgeWasmModuleFactory({ options, bridgeConfig: config });
  if (typeof createWasmModule !== "function") {
    throw new Error(
      missingClientMessage ??
        "Solver bridge request requires a solver client, client factory, worker, run callback, or solver WASM module factory."
    );
  }
  const locateFile =
    options.locateFile ??
    config.locateFile ??
    createSolverAppBridgeLocateFile(options, config);
  const client = createSolverAppBridgeClient({
    ...(config.clientOptions ?? {}),
    ...(options.solverClientOptions ?? {}),
    createWasmModule,
    locateFile,
  });
  assertSolverBridgeClientMethod(client, requiredMethod, "solver app bridge client");
  await client.init(
    initRequest ??
      createSolverAppBridgeInitRequest({
        appId,
        requestedCapabilities,
        options,
        bridgeConfig: config,
        storagePolicy,
        threadingPolicy,
      })
  );
  return { client, disposeAfterRun: true, source: "wasm-module-client" };
}

export function createSolverAppBridgeInitRequest({
  appId,
  requestedCapabilities = [],
  options = {},
  bridgeConfig = {},
  storagePolicy,
  threadingPolicy,
} = {}) {
  if (typeof appId !== "string" || appId.length === 0) {
    throw new TypeError("solver app bridge init request requires appId");
  }
  return {
    appId,
    apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
    requestedCapabilities: [...requestedCapabilities],
    storagePolicy: {
      target:
        storagePolicy?.target ??
        bridgeConfig.streamTarget ??
        options.streamTarget ??
        "caller-buffer",
      durable:
        storagePolicy?.durable ??
        bridgeConfig.storagePolicy?.durable ??
        bridgeConfig.streamTarget === "native-file",
      maxBytes:
        storagePolicy?.maxBytes ??
        bridgeConfig.memoryBudgetBytes ??
        options.memoryBudgetBytes ??
        DEFAULT_MEMORY_BUDGET_BYTES,
      ...(bridgeConfig.storagePolicy ?? {}),
      ...(options.solverStoragePolicy ?? {}),
      ...(storagePolicy ?? {}),
    },
    threadingPolicy: {
      mode:
        threadingPolicy?.mode ??
        bridgeConfig.threadingMode ??
        options.threadingMode ??
        "single-thread",
      deterministic:
        threadingPolicy?.deterministic ??
        bridgeConfig.deterministic ??
        options.deterministic ??
        true,
      ...(bridgeConfig.threadingPolicy ?? {}),
      ...(options.solverThreadingPolicy ?? {}),
      ...(threadingPolicy ?? {}),
    },
  };
}

export function resolveSolverAppBridgeWasmModuleFactory({
  options = {},
  bridgeConfig = {},
  scope = options.scope ?? bridgeConfig.scope ?? globalThis,
} = {}) {
  if (typeof options.createWasmModule === "function") {
    return options.createWasmModule;
  }
  if (typeof bridgeConfig.createWasmModule === "function") {
    return bridgeConfig.createWasmModule;
  }
  const globalNames = [
    options.wasmFactoryGlobalName,
    bridgeConfig.wasmFactoryGlobalName,
    ...(options.wasmFactoryGlobalNames ?? []),
    ...(bridgeConfig.wasmFactoryGlobalNames ?? []),
    ...DEFAULT_WASM_FACTORY_GLOBAL_NAMES,
  ].filter(Boolean);
  for (const globalName of globalNames) {
    const candidate = scope?.[globalName];
    if (typeof candidate === "function") {
      return candidate;
    }
  }
  return null;
}

export function createSolverAppBridgeLocateFile(options = {}, bridgeConfig = {}) {
  const scope = options.scope ?? bridgeConfig.scope ?? globalThis;
  const baseUrl = bridgeConfig.wasmBaseUrl ?? options.wasmBaseUrl ?? scope?.location?.href ?? import.meta.url;
  return (fileName) => new URL(fileName, baseUrl).href;
}

export async function resolveSolverAppBridgeWorker({
  appId,
  requiredMethod = "runSimulation",
  request,
  options = {},
  bridgeConfig = {},
  factoryRequest,
  requestedCapabilities = [],
} = {}) {
  const context = {
    appId,
    requiredMethod,
    bridgeConfig,
    requestedCapabilities,
  };
  const providedWorker = options.solverWorker ?? bridgeConfig.solverWorker;
  if (providedWorker) {
    assertSolverWorker(providedWorker, "provided solver worker");
    return {
      worker: providedWorker,
      disposeAfterRun:
        options.disposeSolverWorkerAfterRun ??
        bridgeConfig.disposeSolverWorkerAfterRun ??
        false,
      terminateOnDispose:
        options.terminateSolverWorkerOnDispose ??
        bridgeConfig.terminateSolverWorkerOnDispose ??
        false,
      source: "provided-worker-client",
    };
  }
  const createSolverWorker = options.createSolverWorker ?? bridgeConfig.createSolverWorker;
  if (typeof createSolverWorker === "function") {
    const worker = await createSolverWorker(factoryRequest ?? request, context);
    assertSolverWorker(worker, "solver worker factory");
    return {
      worker,
      disposeAfterRun:
        options.disposeSolverWorkerAfterRun ??
        bridgeConfig.disposeSolverWorkerAfterRun ??
        true,
      terminateOnDispose:
        options.terminateSolverWorkerOnDispose ??
        bridgeConfig.terminateSolverWorkerOnDispose ??
        true,
      source: "factory-worker-client",
    };
  }
  const workerUrl = options.workerUrl ?? bridgeConfig.workerUrl;
  const scope = options.scope ?? bridgeConfig.scope ?? globalThis;
  const WorkerCtor = options.WorkerCtor ?? bridgeConfig.WorkerCtor ?? scope?.Worker;
  const hasConfiguredWorkerCtor =
    options.WorkerCtor != null || bridgeConfig.WorkerCtor != null;
  if (workerUrl != null || hasConfiguredWorkerCtor) {
    if (workerUrl == null || typeof WorkerCtor !== "function") {
      throw new Error("solver worker resolution requires both workerUrl and Worker constructor");
    }
    const worker = new WorkerCtor(workerUrl, {
      ...(bridgeConfig.workerOptions ?? {}),
      ...(options.workerOptions ?? {}),
    });
    assertSolverWorker(worker, "constructed solver worker");
    return {
      worker,
      disposeAfterRun:
        options.disposeSolverWorkerAfterRun ??
        bridgeConfig.disposeSolverWorkerAfterRun ??
        true,
      terminateOnDispose:
        options.terminateSolverWorkerOnDispose ??
        bridgeConfig.terminateSolverWorkerOnDispose ??
        true,
      source: "constructed-worker-client",
    };
  }
  return null;
}

function resolveBridgeConfig({ request, options, bridgeConfig } = {}) {
  if (bridgeConfig && typeof bridgeConfig === "object") {
    return bridgeConfig;
  }
  if (options.solverBridge && typeof options.solverBridge === "object") {
    return options.solverBridge;
  }
  if (request?.config?.solverBridge && typeof request.config.solverBridge === "object") {
    return request.config.solverBridge;
  }
  return {};
}

function assertSolverBridgeClientMethod(client, methodName, sourceLabel) {
  if (!client || typeof client[methodName] !== "function") {
    throw new Error(`${sourceLabel} did not provide ${methodName}.`);
  }
}

function assertSolverWorker(worker, sourceLabel) {
  if (!worker || typeof worker.postMessage !== "function") {
    throw new Error(`${sourceLabel} did not provide postMessage.`);
  }
}
