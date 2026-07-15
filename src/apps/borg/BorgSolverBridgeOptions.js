// The deployed runtime artifacts, matching the deployedWasmLoader/
// deployedWasmBinary entrypoints in the solver package manifest. The
// .tmp/solver-build/ build directory is gitignored, so a loader pointed there
// resolves locally and 404s on the published site, where the app then falls
// back to replaying a recording instead of computing.
const DEFAULT_SOLVER_WASM_RELATIVE_URL =
  "../../solver/wasm/runtime/architrino_solver_wasm_smoke.mjs";
const DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL = "../../solver/wasm/runtime/";
const DEFAULT_WASM_FACTORY_EXPORTS = Object.freeze([
  "default",
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
]);

export function createBorgSolverBridgeOptions(scope = globalThis, overrides = {}) {
  const configuredOptions = getBorgSolverBridgeConfiguredOptions(scope);
  const options = {
    ...configuredOptions,
    ...(overrides && typeof overrides === "object" ? overrides : {}),
  };
  const resolverScope = options.scope ?? scope;
  const wasmBaseUrl = options.wasmBaseUrl ?? createBorgDefaultSolverWasmBaseUrl();
  const createWasmModule =
    options.createWasmModule ??
    resolveBorgSolverBridgeGlobalFactory(resolverScope, options) ??
    createBorgSolverBridgeWasmLoaderFactory(
      options.wasmLoaderUrl ?? createBorgDefaultSolverWasmLoaderUrl(),
      options,
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

export function createBorgDefaultSolverWasmLoaderUrl() {
  return new URL(DEFAULT_SOLVER_WASM_RELATIVE_URL, import.meta.url).href;
}

export function createBorgDefaultSolverWasmBaseUrl() {
  return new URL(DEFAULT_SOLVER_WASM_BASE_RELATIVE_URL, import.meta.url).href;
}

function getBorgSolverBridgeConfiguredOptions(scope) {
  const options = scope?.ARCHITRINO_BORG_SOLVER_BRIDGE_OPTIONS;
  return options && typeof options === "object" ? options : {};
}

function resolveBorgSolverBridgeGlobalFactory(scope, options = {}) {
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

function createBorgSolverBridgeWasmLoaderFactory(wasmLoaderUrl, options = {}) {
  return async function createBorgSolverBridgeWasmModule(moduleOptions = {}) {
    const loader = await import(wasmLoaderUrl);
    const factory = selectBorgSolverBridgeFactoryExport(loader, options);
    return factory(moduleOptions);
  };
}

function selectBorgSolverBridgeFactoryExport(moduleExports, options = {}) {
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
  throw new TypeError("Borg solver bridge WASM loader does not export a module factory.");
}
