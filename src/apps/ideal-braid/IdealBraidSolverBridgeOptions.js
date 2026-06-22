const DEFAULT_SOLVER_WASM_RELATIVE_URL =
  "../../../.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs";
const DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL = "../../../.tmp/solver-build/wasm/";
const DEFAULT_SOLVER_WORKER_RELATIVE_URL = "./IdealBraidSolverBridgeWorker.js";
const DEFAULT_SOLVER_WASM_CACHE_TAG = "ideal-braid-solver-wasm-v1";
const DEFAULT_WASM_FACTORY_EXPORTS = Object.freeze([
  "default",
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
]);

export function createIdealBraidSolverBridgeOptions(scope = globalThis, overrides = {}) {
  const configuredOptions = getIdealBraidSolverBridgeConfiguredOptions(scope);
  const options = {
    ...configuredOptions,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
  const resolverScope = options.scope ?? scope;
  const wasmBaseUrl = options.wasmBaseUrl ?? createIdealBraidDefaultSolverWasmBaseUrl();
  const workerUrl = options.workerUrl ?? createIdealBraidDefaultSolverWorkerUrl();
  const createWasmModule =
    options.createWasmModule ??
    resolveIdealBraidGlobalFactory(resolverScope, options) ??
    createIdealBraidSolverBridgeWasmLoaderFactory(
      options.wasmLoaderUrl ?? createIdealBraidDefaultSolverWasmLoaderUrl(),
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

export function createIdealBraidDefaultSolverWasmLoaderUrl() {
  return new URL(DEFAULT_SOLVER_WASM_RELATIVE_URL, import.meta.url).href;
}

export function createIdealBraidDefaultSolverWasmBaseUrl() {
  return new URL(DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL, import.meta.url).href;
}

export function createIdealBraidDefaultSolverWorkerUrl() {
  return new URL(DEFAULT_SOLVER_WORKER_RELATIVE_URL, import.meta.url).href;
}

function getIdealBraidSolverBridgeConfiguredOptions(scope) {
  const options = scope?.ARCHITRINO_IDEAL_BRAID_SOLVER_BRIDGE_OPTIONS;
  return options && typeof options === "object" ? options : {};
}

function resolveIdealBraidGlobalFactory(scope, options = {}) {
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

function createIdealBraidSolverBridgeWasmLoaderFactory(wasmLoaderUrl, options = {}) {
  return async function createIdealBraidSolverBridgeWasmModule(moduleOptions = {}) {
    const loader = await import(wasmLoaderUrl);
    const factory = selectIdealBraidSolverBridgeFactoryExport(loader, options);
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

function selectIdealBraidSolverBridgeFactoryExport(moduleExports, options = {}) {
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
