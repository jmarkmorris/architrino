import type {
  SolverBridgeClientOptions,
} from "./SolverAppBridgeContract";
import type {
  SolverAppWorkerInstall,
} from "./SolverAppWorkerBridge";

export declare const SOLVER_APP_WORKER_RUNTIME_VERSION: "solver-app-worker-runtime.v1";

export interface SolverAppWorkerRuntimeOptions extends SolverBridgeClientOptions {
  wasmBaseUrl?: string;
  wasmFactoryGlobalName?: string;
  wasmFactoryGlobalNames?: string[];
  autoInstall?: boolean;
}

export declare function installSolverAppWorkerRuntime(
  scope?: unknown,
  options?: SolverAppWorkerRuntimeOptions
): SolverAppWorkerInstall;

export declare function resolveSolverWasmModuleFactory(
  scope?: unknown,
  options?: SolverAppWorkerRuntimeOptions
): ((options?: { locateFile?: (fileName: string) => string }) => Promise<unknown>) | null;

export declare function createSolverWasmLocateFile(
  scope?: unknown,
  options?: SolverAppWorkerRuntimeOptions
): (fileName: string) => string;

export declare function shouldAutoInstallSolverAppWorkerRuntime(
  scope?: unknown,
  options?: SolverAppWorkerRuntimeOptions
): boolean;

export declare function autoInstallSolverAppWorkerRuntime(
  scope?: unknown,
  options?: SolverAppWorkerRuntimeOptions
): SolverAppWorkerInstall | null;

export declare const solverAppWorkerRuntimeInstall: SolverAppWorkerInstall | null;
