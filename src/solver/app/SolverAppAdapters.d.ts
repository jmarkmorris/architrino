import type {
  SolverAppId,
  SolverAssemblyGraphDatasetF64Request,
  SolverAssemblyGraphStoreF64Request,
  SolverAssemblyGraphStoreReadF64Request,
  SolverBuildPathHistoryStreamSpaceTimeIndexF64Request,
  SolverDescribeAssemblyGraphStoreF64Request,
  SolverBinaryLayoutId,
  SolverCausalRootF64,
  SolverCausalRootsF64Request,
  SolverCausalRootsNormalizedF64Request,
  SolverCircularSourceCausalRootsF64Request,
  SolverClaimLevel,
  SolverComparableResponse,
  SolverCreatePathHistoryStreamF64Request,
  SolverDelayedHitF64,
  SolverDescribeStreamRequest,
  SolverDiagnosticRecord,
  SolverEmissionShellCandidateF64Request,
  SolverEmissionShellCandidateF64Response,
  SolverEmissionShellCandidatePacketF64Request,
  SolverEmissionShellCandidatePacketMergeF64Request,
  SolverEmissionShellCandidatePacketsF64Request,
  SolverEmissionShellRootRefinementF64Request,
  SolverErrorBudget,
  SolverLinearMotionSampleF64Request,
  SolverModelContract,
  SolverMotionIntegrationF64Request,
  SolverMotionFrameF64,
  SolverOpenStreamRequest,
  SolverOutputRequest,
  SolverPhaseAtHitF64Request,
  SolverPrecisionPath,
  SolverPathHistoryRowF64,
  SolverPathHistoryDynamicReplayValidationRequest,
  SolverPathHistoryStorageLifecyclePolicy,
  SolverPathHistoryChunkMetadata,
  SolverPathHistoryStorageLifecycleRequest,
  SolverRunConfig,
  SolverRunKind,
  SolverRunRequest,
  SolverReadStreamRangeRequest,
  SolverRange,
  SolverSharedGeometryF64Request,
  SolverSharedGeometryF64Response,
  SolverSimulationEnvelope,
  SolverStoragePolicy,
  SolverPathHistoryStreamMetadata,
  SolverPathHistoryWorkPacketPlanRequest,
  SolverWorkPacketHeader,
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

export type PhotonCausalRootsRunAdapterInput = SolverRunAdapterBaseInput &
  (
    | {
        rootRequest: SolverCausalRootsF64Request;
        normalizedRootRequest?: never;
        circularSourceRootRequest?: never;
      }
    | {
        rootRequest?: never;
        normalizedRootRequest: SolverCausalRootsNormalizedF64Request;
        circularSourceRootRequest?: never;
      }
    | {
        rootRequest?: never;
        normalizedRootRequest?: never;
        circularSourceRootRequest: SolverCircularSourceCausalRootsF64Request;
      }
  );

export interface PhotonPhaseDiagnosticsRunAdapterInput extends SolverRunAdapterBaseInput {
  phaseRequest: SolverPhaseAtHitF64Request;
}

export type IdealSwarmDelayedHitsRunAdapterInput = SolverRunAdapterBaseInput &
  (
    | { rootRequest: SolverCausalRootsF64Request; normalizedRootRequest?: never }
    | { rootRequest?: never; normalizedRootRequest: SolverCausalRootsNormalizedF64Request }
  );

export interface IdealSwarmSharedGeometryRunAdapterInput extends SolverRunAdapterBaseInput {
  geometryRequest: SolverSharedGeometryF64Request;
}

export type AnimatorMotionSimulationRunAdapterInput = SolverRunAdapterBaseInput &
  {
    streamId?: string;
    rowsPerChunk?: number;
    storagePolicy?: SolverStoragePolicy;
    metadata?: Partial<SolverPathHistoryStreamMetadata>;
  } &
  (
    | { motionRequest: SolverLinearMotionSampleF64Request; motionIntegrationRequest?: never }
    | { motionRequest?: never; motionIntegrationRequest: SolverMotionIntegrationF64Request }
  );

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

export interface PathHistoryStreamAdapterInput {
  runId: string;
  datasetId?: string;
  streamId: string;
  pathRows: SolverPathHistoryRowF64[];
  rowsPerChunk?: number;
  storagePolicy?: SolverStoragePolicy;
  metadata?: Partial<SolverPathHistoryStreamMetadata>;
  memoryBudgetBytes?: number;
}

export type AssemblyGraphDatasetAdapterInput = SolverAssemblyGraphDatasetF64Request;

export type AssemblyGraphStoreAdapterInput = SolverAssemblyGraphStoreF64Request;

export type DescribeAssemblyGraphStoreAdapterInput = SolverDescribeAssemblyGraphStoreF64Request;

export type AssemblyGraphStoreReadAdapterInput = SolverAssemblyGraphStoreReadF64Request;

export type PathHistoryStreamSpaceTimeIndexAdapterInput =
  SolverBuildPathHistoryStreamSpaceTimeIndexF64Request;

export interface OpenStreamAdapterInput {
  runId?: string;
  datasetId?: string;
  streamId?: string;
  manifestPath?: string;
  purpose?: SolverOpenStreamRequest["purpose"];
}

export interface DescribeStreamAdapterInput {
  streamId?: string;
  manifestPath?: string;
}

export interface PathHistoryDynamicReplayValidationAdapterInput {
  streamId?: string;
  manifestPath?: string;
  tolerance?: number;
  maxRows?: number;
}

export interface ReadStreamRangeAdapterInput {
  streamId?: string;
  manifestPath?: string;
  pathIds?: string[];
  pathKeys?: number[];
  chunkIndices?: number[];
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  byteRange?: SolverRange;
  eventKinds?: string[];
  maxBytes?: number;
}

export interface PathHistoryStorageLifecycleAdapterInput {
  streamId?: string;
  manifestPath?: string;
  policy: SolverPathHistoryStorageLifecyclePolicy;
  chunks?: SolverPathHistoryChunkMetadata[];
}

export interface PathHistoryWorkPacketPlanAdapterInput {
  streamId?: string;
  manifestPath?: string;
  runId: string;
  modelId: string;
  precisionPath?: Exclude<SolverPrecisionPath, "auto">;
  packetIdPrefix?: string;
  timeRange?: SolverRange;
  expectedOutputs?: SolverBinaryLayoutId[];
  sourcePathKeys?: number[];
  receiverPathKeys?: number[];
  sourceChunkIndices?: number[];
  receiverChunkIndices?: number[];
  includeSameChunk?: boolean;
  maxPacketCount?: number;
}

export type EmissionShellCandidateQueryAdapterInput = SolverEmissionShellCandidateF64Request;

export type EmissionShellRootRefinementAdapterInput = SolverEmissionShellRootRefinementF64Request;

export interface EmissionShellCandidatePacketQueryAdapterInput {
  streamId?: string;
  manifestPath?: string;
  packet: SolverWorkPacketHeader;
  signalSpeed: number;
  tolerance?: number;
  maxCandidates?: number;
  sourcePathKeys?: number[];
  receiverPathKeys?: number[];
  allowSamePath?: boolean;
  workerCount?: number;
  timeRange?: SolverRange;
}

export interface EmissionShellCandidatePacketBatchQueryAdapterInput {
  streamId?: string;
  manifestPath?: string;
  packets: SolverWorkPacketHeader[];
  signalSpeed: number;
  tolerance?: number;
  maxCandidatesPerPacket?: number;
  sourcePathKeys?: number[];
  receiverPathKeys?: number[];
  allowSamePath?: boolean;
  workerCount?: number;
  timeRange?: SolverRange;
}

export interface EmissionShellCandidatePacketMergeAdapterInput {
  responses: SolverEmissionShellCandidateF64Response[];
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

export declare function createPathHistoryStreamRequest(
  input: PathHistoryStreamAdapterInput
): SolverCreatePathHistoryStreamF64Request;

export declare function createAssemblyGraphDatasetRequest(
  input: AssemblyGraphDatasetAdapterInput
): SolverAssemblyGraphDatasetF64Request;

export declare function createAssemblyGraphStoreRequest(
  input: AssemblyGraphStoreAdapterInput
): SolverAssemblyGraphStoreF64Request;

export declare function createDescribeAssemblyGraphStoreRequest(
  input: DescribeAssemblyGraphStoreAdapterInput
): SolverDescribeAssemblyGraphStoreF64Request;

export declare function createAssemblyGraphStoreReadRequest(
  input: AssemblyGraphStoreReadAdapterInput
): SolverAssemblyGraphStoreReadF64Request;

export declare function createPathHistoryStreamSpaceTimeIndexRequest(
  input: PathHistoryStreamSpaceTimeIndexAdapterInput
): SolverBuildPathHistoryStreamSpaceTimeIndexF64Request;

export declare function createOpenStreamRequest(input: OpenStreamAdapterInput): SolverOpenStreamRequest;

export declare function createDescribeStreamRequest(
  input: DescribeStreamAdapterInput
): SolverDescribeStreamRequest;

export declare function createPathHistoryDynamicReplayValidationRequest(
  input: PathHistoryDynamicReplayValidationAdapterInput
): SolverPathHistoryDynamicReplayValidationRequest;

export declare function createReadStreamRangeRequest(
  input: ReadStreamRangeAdapterInput
): SolverReadStreamRangeRequest;

export declare function createPathHistoryStorageLifecycleRequest(
  input: PathHistoryStorageLifecycleAdapterInput
): SolverPathHistoryStorageLifecycleRequest;

export declare function createPathHistoryWorkPacketPlanRequest(
  input: PathHistoryWorkPacketPlanAdapterInput
): SolverPathHistoryWorkPacketPlanRequest;

export declare function createEmissionShellCandidateQueryRequest(
  input: EmissionShellCandidateQueryAdapterInput
): SolverEmissionShellCandidateF64Request;

export declare function createEmissionShellRootRefinementRequest(
  input: EmissionShellRootRefinementAdapterInput
): SolverEmissionShellRootRefinementF64Request;

export declare function createEmissionShellCandidatePacketQueryRequest(
  input: EmissionShellCandidatePacketQueryAdapterInput
): SolverEmissionShellCandidatePacketF64Request;

export declare function createEmissionShellCandidatePacketBatchQueryRequest(
  input: EmissionShellCandidatePacketBatchQueryAdapterInput
): SolverEmissionShellCandidatePacketsF64Request;

export declare function createEmissionShellCandidatePacketMergeRequest(
  input: EmissionShellCandidatePacketMergeAdapterInput
): SolverEmissionShellCandidatePacketMergeF64Request;
