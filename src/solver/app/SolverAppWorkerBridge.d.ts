import type {
  SolverBridgeClientOptions,
  SolverClient,
  SolverStatusRecord,
} from "./SolverAppBridgeContract";

export declare const SOLVER_APP_WORKER_PROTOCOL_VERSION: "solver-app-worker/v1";

export type SolverAppWorkerMethod = keyof SolverClient;

export declare const SOLVER_APP_WORKER_METHODS: readonly SolverAppWorkerMethod[];

export interface SolverAppWorkerRequestMessage {
  schema: typeof SOLVER_APP_WORKER_PROTOCOL_VERSION;
  type: "request";
  requestId: string;
  method: SolverAppWorkerMethod;
  request?: unknown;
}

export interface SolverAppWorkerResponseMessage {
  schema: typeof SOLVER_APP_WORKER_PROTOCOL_VERSION;
  type: "response";
  requestId: string;
  method: SolverAppWorkerMethod;
  response: unknown;
}

export interface SolverAppWorkerErrorMessage {
  schema: typeof SOLVER_APP_WORKER_PROTOCOL_VERSION;
  type: "error";
  requestId: string;
  method: string;
  status: SolverStatusRecord;
}

export type SolverAppWorkerRpcMessage =
  | SolverAppWorkerRequestMessage
  | SolverAppWorkerResponseMessage
  | SolverAppWorkerErrorMessage;

export interface SolverAppWorkerHandler {
  handleMessage(message: SolverAppWorkerRequestMessage | unknown): Promise<SolverAppWorkerResponseMessage | SolverAppWorkerErrorMessage>;
  dispose(): Promise<void>;
}

export interface SolverAppWorkerHandlerOptions extends SolverBridgeClientOptions {
  client?: SolverClient;
  clientOptions?: SolverBridgeClientOptions;
}

export interface SolverAppWorkerClientOptions {
  requestIdPrefix?: string;
  requestTimeoutMs?: number;
  terminateOnDispose?: boolean;
}

export interface SolverAppWorkerInstall {
  handler: SolverAppWorkerHandler;
  dispose(): Promise<void>;
}

export declare function createSolverAppWorkerHandler(
  options?: SolverAppWorkerHandlerOptions
): SolverAppWorkerHandler;

export declare function dispatchSolverAppWorkerMessage(
  client: SolverClient,
  message: SolverAppWorkerRequestMessage | unknown
): Promise<SolverAppWorkerResponseMessage | SolverAppWorkerErrorMessage>;

export declare function installSolverAppWorkerBridge(
  scope: unknown,
  options?: SolverAppWorkerHandlerOptions
): SolverAppWorkerInstall;

export declare function createSolverAppWorkerClient(
  worker: unknown,
  options?: SolverAppWorkerClientOptions
): SolverClient;

export declare function createInProcessSolverAppWorkerClient(
  options?: SolverAppWorkerHandlerOptions
): SolverClient;

export declare function collectTransferables(value: unknown): ArrayBuffer[];
