import type {
  SolverAppId,
  SolverBinaryLayoutId,
  SolverCausalRootF64,
  SolverCausalRootsF64Request,
  SolverClaimLevel,
  SolverComparableResponse,
  SolverDelayedHitF64,
  SolverDiagnosticRecord,
  SolverErrorBudget,
  SolverLinearMotionSampleF64Request,
  SolverModelContract,
  SolverMotionFrameF64,
  SolverOutputRequest,
  SolverPhaseAtHitF64Request,
  SolverPrecisionPath,
  SolverPathHistoryRowF64,
  SolverRunConfig,
  SolverRunKind,
  SolverRunRequest,
  SolverSharedGeometryF64Request,
  SolverSharedGeometryF64Response,
  SolverSimulationEnvelope,
  SolverStoragePolicy,
  SolverPathHistoryStreamMetadata,
} from "./SolverAppBridgeContract";

export declare const SOLVER_APP_ADAPTERS_VERSION: "solver-app-adapters.v1";

export interface SolverRunAdapterBaseInput {
  requestId?: string;
  runId?: string;
  datasetId?: string;
  claimLevel?: SolverClaimLevel;
  precisionPath?: SolverPrecisionPath;
  configVersion?: string;
  configHash?: string;
  model: SolverModelContract;
  envelope: SolverSimulationEnvelope;
  errorBudget: SolverErrorBudget;
  output?: SolverOutputRequest;
  streamTarget?: SolverOutputRequest["streamTarget"];
  memoryBudgetBytes?: number;
  deterministic?: boolean;
}

export interface SolverGenericRunAdapterInput extends SolverRunAdapterBaseInput {
  appId: SolverAppId;
  runKind: SolverRunKind;
  config: SolverRunConfig;
}

export interface PhotonCausalRootsRunAdapterInput extends SolverRunAdapterBaseInput {
  rootRequest: SolverCausalRootsF64Request;
}

export interface PhotonPhaseDiagnosticsRunAdapterInput extends SolverRunAdapterBaseInput {
  phaseRequest: SolverPhaseAtHitF64Request;
}

export interface IdealSwarmDelayedHitsRunAdapterInput extends SolverRunAdapterBaseInput {
  rootRequest: SolverCausalRootsF64Request;
}

export interface IdealSwarmSharedGeometryRunAdapterInput extends SolverRunAdapterBaseInput {
  geometryRequest: SolverSharedGeometryF64Request;
}

export interface AnimatorMotionSimulationRunAdapterInput extends SolverRunAdapterBaseInput {
  motionRequest: SolverLinearMotionSampleF64Request;
}

export interface PathHistoryRunAdapterInput extends SolverRunAdapterBaseInput {
  appId?: SolverAppId;
  streamId?: string;
  pathRows: SolverPathHistoryRowF64[];
  rowsPerChunk?: number;
  storagePolicy?: SolverStoragePolicy;
  metadata?: Partial<SolverPathHistoryStreamMetadata>;
}

export interface AnimatorAppPlaybackRunAdapterInput extends SolverRunAdapterBaseInput {
  sourceRunId?: string;
  sourceDatasetId?: string;
  frames?: SolverMotionFrameF64[];
  roots?: SolverCausalRootF64[];
  hits?: SolverDelayedHitF64[];
  geometry?: SolverSharedGeometryF64Response;
  diagnostics?: SolverDiagnosticRecord[];
}

export interface SharedGeometryRunAdapterInput extends SolverRunAdapterBaseInput {
  appId?: SolverAppId;
  geometryRequest: SolverSharedGeometryF64Request;
}

export interface ValidationReplayRunAdapterInput extends SolverRunAdapterBaseInput {
  appId?: SolverAppId;
  baselineRunId?: string;
  baselineArtifactHash?: string;
  replayPrecisionPath: Exclude<SolverPrecisionPath, "auto">;
  compareLayouts: SolverBinaryLayoutId[];
  baselineResponse: SolverComparableResponse;
  candidateResponse: SolverComparableResponse;
  tolerance?: number;
  refinementTolerance?: number;
}

export declare function createSolverRunRequest(input: SolverGenericRunAdapterInput): SolverRunRequest;

export declare function createPhotonCausalRootsRunRequest(
  input: PhotonCausalRootsRunAdapterInput
): SolverRunRequest;

export declare function createPhotonPhaseDiagnosticsRunRequest(
  input: PhotonPhaseDiagnosticsRunAdapterInput
): SolverRunRequest;

export declare function createIdealSwarmDelayedHitsRunRequest(
  input: IdealSwarmDelayedHitsRunAdapterInput
): SolverRunRequest;

export declare function createIdealSwarmSharedGeometryRunRequest(
  input: IdealSwarmSharedGeometryRunAdapterInput
): SolverRunRequest;

export declare function createAnimatorMotionSimulationRunRequest(
  input: AnimatorMotionSimulationRunAdapterInput
): SolverRunRequest;

export declare function createPathHistoryRunRequest(input: PathHistoryRunAdapterInput): SolverRunRequest;

export declare function createAnimatorAppPlaybackRunRequest(
  input: AnimatorAppPlaybackRunAdapterInput
): SolverRunRequest;

export declare function createSharedGeometryRunRequest(input: SharedGeometryRunAdapterInput): SolverRunRequest;

export declare function createValidationReplayRunRequest(
  input: ValidationReplayRunAdapterInput
): SolverRunRequest;
