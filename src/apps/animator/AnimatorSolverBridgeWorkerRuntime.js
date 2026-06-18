const DEFAULT_SOLVER_WASM_RELATIVE_URL =
  "../../../.tmp/solver-build/wasm/architrino_solver_wasm_smoke.mjs";
const DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL = "../../../.tmp/solver-build/wasm/";
const DEFAULT_WASM_FACTORY_EXPORTS = Object.freeze([
  "default",
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
]);

export function createAnimatorSolverBridgeWorkerOptions(scope = globalThis, overrides = {}) {
  const configuredOptions = getAnimatorSolverBridgeConfiguredOptions(scope);
  const options = {
    ...configuredOptions,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
  const resolverScope = options.scope ?? scope;
  const wasmBaseUrl =
    options.wasmBaseUrl ??
    createAnimatorDefaultSolverWasmBaseUrl();
  const createWasmModule =
    options.createWasmModule ??
    resolveAnimatorSolverBridgeGlobalFactory(resolverScope, options) ??
    createAnimatorSolverBridgeWasmLoaderFactory(
      options.wasmLoaderUrl ?? createAnimatorDefaultSolverWasmLoaderUrl(),
      options
    );
  return {
    ...options,
    scope: resolverScope,
    wasmBaseUrl,
    createWasmModule,
    locateFile:
      options.locateFile ??
      ((fileName) => new URL(fileName, wasmBaseUrl).href),
  };
}

export function createAnimatorDefaultSolverWasmLoaderUrl() {
  return new URL(DEFAULT_SOLVER_WASM_RELATIVE_URL, import.meta.url).href;
}

export function createAnimatorDefaultSolverWasmBaseUrl() {
  return new URL(DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL, import.meta.url).href;
}

function getAnimatorSolverBridgeConfiguredOptions(scope) {
  const options = scope?.ARCHITRINO_ANIMATOR_SOLVER_BRIDGE_OPTIONS;
  return options && typeof options === "object" ? options : {};
}

function resolveAnimatorSolverBridgeGlobalFactory(scope, options = {}) {
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

function createAnimatorSolverBridgeWasmLoaderFactory(wasmLoaderUrl, options = {}) {
  return async function createAnimatorSolverBridgeWasmModule(moduleOptions = {}) {
    const loader = await import(wasmLoaderUrl);
    const factory = selectAnimatorSolverBridgeFactoryExport(loader, options);
    return factory(moduleOptions);
  };
}

function selectAnimatorSolverBridgeFactoryExport(moduleExports, options = {}) {
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
  throw new TypeError("Animator solver bridge WASM loader does not export a module factory.");
}
