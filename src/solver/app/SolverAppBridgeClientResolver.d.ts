import type {
  SolverAppId,
  SolverClient,
  SolverInitRequest,
} from "./SolverAppBridgeContract";
import type { SolverAppWorkerClientOptions } from "./SolverAppWorkerBridge";

export declare const SOLVER_APP_BRIDGE_CLIENT_RESOLVER_VERSION =
  "solver-app-bridge-client-resolver.v1";

export interface SolverAppBridgeClientResolverOptions {
  solverClient?: Partial<SolverClient>;
  createSolverBridgeClient?: (
    request: unknown,
    context: SolverAppBridgeClientFactoryContext
  ) => Promise<Partial<SolverClient>> | Partial<SolverClient>;
  disposeSolverBridgeClientAfterRun?: boolean;
  solverWorker?: unknown;
  createSolverWorker?: (
    request: unknown,
    context: SolverAppBridgeClientFactoryContext
  ) => Promise<unknown> | unknown;
  workerUrl?: string | URL;
  WorkerCtor?: new (url: string | URL, options?: Record<string, unknown>) => unknown;
  workerOptions?: Record<string, unknown>;
  solverWorkerClientOptions?: SolverAppWorkerClientOptions;
  workerRequestIdPrefix?: string;
  disposeSolverWorkerAfterRun?: boolean;
  terminateSolverWorkerOnDispose?: boolean;
  createWasmModule?: (options: { locateFile?: (fileName: string) => string }) => Promise<unknown>;
  locateFile?: (fileName: string) => string;
  solverClientOptions?: Record<string, unknown>;
  solverBridge?: SolverAppBridgeConfig;
  solverStoragePolicy?: Record<string, unknown>;
  solverThreadingPolicy?: Record<string, unknown>;
  streamTarget?: string;
  memoryBudgetBytes?: number;
  threadingMode?: string;
  deterministic?: boolean;
  wasmFactoryGlobalName?: string;
  wasmFactoryGlobalNames?: string[];
  wasmBaseUrl?: string;
  scope?: Record<string, unknown>;
}

export interface SolverAppBridgeConfig {
  solverWorker?: unknown;
  createSolverWorker?: (
    request: unknown,
    context: SolverAppBridgeClientFactoryContext
  ) => Promise<unknown> | unknown;
  workerUrl?: string | URL;
  WorkerCtor?: new (url: string | URL, options?: Record<string, unknown>) => unknown;
  workerOptions?: Record<string, unknown>;
  workerClientOptions?: SolverAppWorkerClientOptions;
  workerRequestIdPrefix?: string;
  disposeSolverWorkerAfterRun?: boolean;
  terminateSolverWorkerOnDispose?: boolean;
  createWasmModule?: (options: { locateFile?: (fileName: string) => string }) => Promise<unknown>;
  locateFile?: (fileName: string) => string;
  clientOptions?: Record<string, unknown>;
  storagePolicy?: Record<string, unknown>;
  threadingPolicy?: Record<string, unknown>;
  streamTarget?: string;
  memoryBudgetBytes?: number;
  threadingMode?: string;
  deterministic?: boolean;
  wasmFactoryGlobalName?: string;
  wasmFactoryGlobalNames?: string[];
  wasmBaseUrl?: string;
  scope?: Record<string, unknown>;
}

export interface SolverAppBridgeClientFactoryContext {
  appId: SolverAppId | string;
  requiredMethod: string;
  bridgeConfig: SolverAppBridgeConfig;
  requestedCapabilities: string[];
}

export interface SolverAppBridgeClientResolution {
  client: Partial<SolverClient>;
  disposeAfterRun: boolean;
  source:
    | "provided-client"
    | "factory-client"
    | "provided-worker-client"
    | "factory-worker-client"
    | "constructed-worker-client"
    | "wasm-module-client";
}

export interface SolverAppBridgeRunOptions {
  appId: SolverAppId | string;
  methodName?: keyof SolverClient & string;
  request: unknown;
  options?: SolverAppBridgeClientResolverOptions;
  bridgeConfig?: SolverAppBridgeConfig;
  factoryRequest?: unknown;
  requestedCapabilities?: string[];
  storagePolicy?: Record<string, unknown>;
  threadingPolicy?: Record<string, unknown>;
  initRequest?: SolverInitRequest;
  missingClientMessage?: string;
}

export declare function runSolverAppBridgeRequest<T = unknown>(
  options: SolverAppBridgeRunOptions
): Promise<T>;

export declare function resolveSolverAppBridgeClient(
  options: Omit<SolverAppBridgeRunOptions, "methodName"> & { requiredMethod?: keyof SolverClient & string }
): Promise<SolverAppBridgeClientResolution>;

export declare function createSolverAppBridgeInitRequest(options: {
  appId: SolverAppId | string;
  requestedCapabilities?: string[];
  options?: SolverAppBridgeClientResolverOptions;
  bridgeConfig?: SolverAppBridgeConfig;
  storagePolicy?: Record<string, unknown>;
  threadingPolicy?: Record<string, unknown>;
}): SolverInitRequest;

export declare function resolveSolverAppBridgeWasmModuleFactory(options?: {
  options?: SolverAppBridgeClientResolverOptions;
  bridgeConfig?: SolverAppBridgeConfig;
  scope?: Record<string, unknown>;
}): ((options: { locateFile?: (fileName: string) => string }) => Promise<unknown>) | null;

export declare function resolveSolverAppBridgeWorker(options?: {
  appId?: SolverAppId | string;
  requiredMethod?: keyof SolverClient & string;
  request?: unknown;
  options?: SolverAppBridgeClientResolverOptions;
  bridgeConfig?: SolverAppBridgeConfig;
  factoryRequest?: unknown;
  requestedCapabilities?: string[];
}): Promise<{
  worker: unknown;
  disposeAfterRun: boolean;
  terminateOnDispose: boolean;
  source: "provided-worker-client" | "factory-worker-client" | "constructed-worker-client";
} | null>;

export declare function createSolverAppBridgeLocateFile(
  options?: SolverAppBridgeClientResolverOptions,
  bridgeConfig?: SolverAppBridgeConfig
): (fileName: string) => string;
