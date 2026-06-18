import { installSolverAppWorkerBridge } from "./SolverAppWorkerBridge.mjs";

export const SOLVER_APP_WORKER_RUNTIME_VERSION = "solver-app-worker-runtime.v1";

const DEFAULT_WASM_FACTORY_GLOBAL_NAMES = [
  "createArchitrinoSolverModule",
  "createArchitrinoSolverSmoke",
];

export function installSolverAppWorkerRuntime(scope = globalThis, options = {}) {
  if (!scope || typeof scope.postMessage !== "function") {
    throw new TypeError("worker scope with postMessage is required");
  }
  const createWasmModule =
    options.createWasmModule ?? resolveSolverWasmModuleFactory(scope, options);
  if (typeof createWasmModule !== "function") {
    throw new TypeError("solver wasm module factory is required");
  }
  const locateFile =
    options.locateFile ?? createSolverWasmLocateFile(scope, options);
  return installSolverAppWorkerBridge(scope, {
    ...options,
    createWasmModule,
    locateFile,
  });
}

export function resolveSolverWasmModuleFactory(scope = globalThis, options = {}) {
  if (typeof options.createWasmModule === "function") {
    return options.createWasmModule;
  }
  const globalNames = [
    options.wasmFactoryGlobalName,
    ...(options.wasmFactoryGlobalNames ?? DEFAULT_WASM_FACTORY_GLOBAL_NAMES),
  ].filter(Boolean);
  for (const globalName of globalNames) {
    const candidate = scope?.[globalName];
    if (typeof candidate === "function") {
      return candidate;
    }
  }
  return null;
}

export function createSolverWasmLocateFile(scope = globalThis, options = {}) {
  const baseUrl = options.wasmBaseUrl ?? scope?.location?.href ?? import.meta.url;
  return (fileName) => new URL(fileName, baseUrl).href;
}

export function shouldAutoInstallSolverAppWorkerRuntime(scope = globalThis, options = {}) {
  if (options.autoInstall === false || scope?.ARCHITRINO_SOLVER_WORKER_AUTO_INSTALL === false) {
    return false;
  }
  return Boolean(
    scope &&
      typeof scope.postMessage === "function" &&
      (typeof scope.addEventListener === "function" || "onmessage" in scope) &&
      resolveSolverWasmModuleFactory(scope, options)
  );
}

export function autoInstallSolverAppWorkerRuntime(scope = globalThis, options = {}) {
  if (!shouldAutoInstallSolverAppWorkerRuntime(scope, options)) {
    return null;
  }
  return installSolverAppWorkerRuntime(scope, options);
}

export const solverAppWorkerRuntimeInstall = autoInstallSolverAppWorkerRuntime(
  globalThis,
  globalThis.ARCHITRINO_SOLVER_WORKER_OPTIONS ?? {}
);
