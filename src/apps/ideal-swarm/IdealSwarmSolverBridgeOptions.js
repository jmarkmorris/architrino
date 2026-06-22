const DEFAULT_SOLVER_WASM_RELATIVE_URL =
  "../../../.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs";
const DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL = "../../../.tmp/solver-build/wasm/";
const DEFAULT_SOLVER_WORKER_RELATIVE_URL = "./IdealSwarmSolverBridgeWorker.js";
const DEFAULT_SOLVER_WASM_CACHE_TAG = "ideal-swarm-solver-wasm-v1";
const DEFAULT_WASM_FACTORY_EXPORTS = Object.freeze([
  "default",
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
]);

export function createIdealSwarmSolverBridgeOptions(scope = globalThis, overrides = {}) {
  const configuredOptions = getIdealSwarmSolverBridgeConfiguredOptions(scope);
  const options = {
    ...configuredOptions,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
  const resolverScope = options.scope ?? scope;
  const wasmBaseUrl = options.wasmBaseUrl ?? createIdealSwarmDefaultSolverWasmBaseUrl();
  const workerUrl = options.workerUrl ?? createIdealSwarmDefaultSolverWorkerUrl();
  const createWasmModule =
    options.createWasmModule ??
    resolveIdealSwarmGlobalFactory(resolverScope, options) ??
    createIdealSwarmSolverBridgeWasmLoaderFactory(
      options.wasmLoaderUrl ?? createIdealSwarmDefaultSolverWasmLoaderUrl(),
      options
    );

  return {
    ...options,
    scope: resolverScope,
    wasmBaseUrl,
    workerUrl,
    createWasmModule,
    locateFile:
      options.locateFile ??
      ((fileName) => createVersionedWasmFileUrl(fileName, wasmBaseUrl, options)),
  };
}

export function createIdealSwarmDefaultSolverWasmLoaderUrl() {
  return new URL(DEFAULT_SOLVER_WASM_RELATIVE_URL, import.meta.url).href;
}

export function createIdealSwarmDefaultSolverWasmBaseUrl() {
  return new URL(DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL, import.meta.url).href;
}

export function createIdealSwarmDefaultSolverWorkerUrl() {
  return new URL(DEFAULT_SOLVER_WORKER_RELATIVE_URL, import.meta.url).href;
}

function getIdealSwarmSolverBridgeConfiguredOptions(scope) {
  const options = scope?.ARCHITRINO_IDEAL_SWARM_SOLVER_BRIDGE_OPTIONS;
  return options && typeof options === "object" ? options : {};
}

function resolveIdealSwarmGlobalFactory(scope, options = {}) {
  const names = [
    options.wasmFactoryGlobalName,
    ...(options.wasmFactoryGlobalNames ?? DEFAULT_WASM_FACTORY_EXPORTS),
  ].filter(Boolean);
  for (const name of names) {
    const factory = scope?.[name];
    if (typeof factory === "function") {
      return factory;
    }
  }
  return null;
}

function createIdealSwarmSolverBridgeWasmLoaderFactory(wasmLoaderUrl, options = {}) {
  return async function createIdealSwarmSolverBridgeWasmModule(moduleOptions = {}) {
    const loader = await import(wasmLoaderUrl);
    const factory = selectIdealSwarmSolverBridgeFactoryExport(loader, options);
    return factory(moduleOptions);
  };
}

function createVersionedWasmFileUrl(fileName, wasmBaseUrl, options = {}) {
  const url = new URL(fileName, wasmBaseUrl);
  const cacheTag = options.wasmCacheTag ?? DEFAULT_SOLVER_WASM_CACHE_TAG;
  if (cacheTag) {
    url.searchParams.set("v", cacheTag);
  }
  return url.href;
}

function selectIdealSwarmSolverBridgeFactoryExport(moduleExports, options = {}) {
  const exportNames = [
    options.wasmFactoryExportName,
    ...(options.wasmFactoryExportNames ?? DEFAULT_WASM_FACTORY_EXPORTS),
  ].filter(Boolean);
  for (const exportName of exportNames) {
    const factory = moduleExports?.[exportName];
    if (typeof factory === "function") {
      return factory;
    }
  }
  throw new TypeError("Ideal Braid solver bridge WASM loader does not export a module factory.");
}
