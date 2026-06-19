const DEFAULT_SOLVER_WASM_RELATIVE_URL =
  "../../../.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs";
const DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL = "../../../.tmp/solver-build/wasm/";
const DEFAULT_SOLVER_WASM_CACHE_TAG = "photon-solver-wasm-v1";
const DEFAULT_WASM_FACTORY_EXPORTS = Object.freeze([
  "default",
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
]);

export function createPhotonSolverBridgeOptions(scope = globalThis, overrides = {}) {
  const configuredOptions = getPhotonSolverBridgeConfiguredOptions(scope);
  const options = {
    ...configuredOptions,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
  const resolverScope = options.scope ?? scope;
  const wasmBaseUrl = options.wasmBaseUrl ?? createPhotonDefaultSolverWasmBaseUrl();
  const createWasmModule =
    options.createWasmModule ??
    resolvePhotonGlobalFactory(resolverScope, options) ??
    createPhotonSolverBridgeWasmLoaderFactory(
      options.wasmLoaderUrl ?? createPhotonDefaultSolverWasmLoaderUrl(),
      options
    );

  return {
    ...options,
    scope: resolverScope,
    wasmBaseUrl,
    createWasmModule,
    locateFile:
      options.locateFile ??
      ((fileName) => createVersionedWasmFileUrl(fileName, wasmBaseUrl, options)),
  };
}

export function createPhotonDefaultSolverWasmLoaderUrl() {
  return new URL(DEFAULT_SOLVER_WASM_RELATIVE_URL, import.meta.url).href;
}

export function createPhotonDefaultSolverWasmBaseUrl() {
  return new URL(DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL, import.meta.url).href;
}

function getPhotonSolverBridgeConfiguredOptions(scope) {
  const options = scope?.ARCHITRINO_PHOTON_SOLVER_BRIDGE_OPTIONS;
  return options && typeof options === "object" ? options : {};
}

function resolvePhotonGlobalFactory(scope, options = {}) {
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

function createPhotonSolverBridgeWasmLoaderFactory(wasmLoaderUrl, options = {}) {
  return async function createPhotonSolverBridgeWasmModule(moduleOptions = {}) {
    const loader = await import(wasmLoaderUrl);
    const factory = selectPhotonSolverBridgeFactoryExport(loader, options);
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

function selectPhotonSolverBridgeFactoryExport(moduleExports, options = {}) {
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
  throw new TypeError("Photon solver bridge WASM loader does not export a module factory.");
}
