export type SolverAppId = "animator" | "photon" | "ideal-swarm";

export type SolverRunKind =
  | "motionSimulation"
  | "pathHistory"
  | "causalRoots"
  | "phaseDiagnostics"
  | "delayedHits"
  | "sharedGeometry"
  | "appPlayback"
  | "validationReplay";

export type SolverPrecisionPath =
  | "auto"
  | "scaled_f64_fast"
  | "scaled_f64_strict"
  | "adaptive_multirate"
  | "event_root_focused"
  | "extended_precision"
  | "validation_replay";

export type SolverClaimLevel =
  | "interactive-preview"
  | "migration-parity"
  | "exported-dataset"
  | "validation-evidence";

export type SolverAdmissionDecision = "admit" | "batch" | "escalate_precision" | "reject";

export type SolverErrorBudgetStage =
  | "root_isolation"
  | "delayed_hit"
  | "motion_integration"
  | "stream_encoding"
  | "stream_readback"
  | "projection"
  | "app_buffer";

export type SolverValueAuthority = "authoritative" | "approximate" | "display-only" | "rejected";

export interface SolverClient {
  init(request: SolverInitRequest): Promise<SolverInitResponse>;
  capabilities(): Promise<SolverCapabilities>;
  planThreadingPolicy(request: SolverThreadingPlanRequest): Promise<SolverThreadingPlanResponse>;
  prepareWorkPacketHeader(request: SolverWorkPacketHeader): Promise<SolverWorkPacketHeaderResponse>;
  orderWorkPacketResults(request: SolverWorkPacketResultOrderRequest): Promise<SolverWorkPacketResultOrderResponse>;
  mergeEmissionShellCandidatePacketResponsesF64(
    request: SolverEmissionShellCandidatePacketMergeF64Request
  ): Promise<SolverEmissionShellCandidateF64Response>;
  planPathHistoryWorkPackets(
    request: SolverPathHistoryWorkPacketPlanRequest
  ): Promise<SolverPathHistoryWorkPacketPlanResponse>;
  admitSimulationEnvelope(request: SolverAdmissionRequest): Promise<SolverAdmissionResponse>;
  runSimulation(request: SolverRunRequest): Promise<SolverRunHandle>;
  describeRun(request: SolverDescribeRunRequest): Promise<SolverRunDescription>;
  describeStream(request: SolverDescribeStreamRequest): Promise<SolverStreamDescription>;
  diagnosePrecisionF64(request: SolverCausalRootsF64Request): Promise<SolverPrecisionDiagnosticF64Response>;
  propagateErrorBudgetF64(request: SolverErrorBudgetPropagationRequest): Promise<SolverErrorBudgetPropagationResponse>;
  checkRootHitInvariantsF64(request: SolverRootHitInvariantF64Request): Promise<SolverRootHitInvariantF64Response>;
  classifyRootLedgerTransitionsF64(
    request: SolverRootLedgerTransitionF64Request
  ): Promise<SolverRootLedgerTransitionF64Response>;
  solveCausalRootsF64(request: SolverCausalRootsF64Request): Promise<SolverCausalRootsF64Response>;
  solveCausalRootsPrecisionF64(
    request: SolverCausalRootsPrecisionF64Request
  ): Promise<SolverCausalRootsPrecisionF64Response>;
  solveRootsAndHitsPrecisionF64(
    request: SolverCausalRootsPrecisionF64Request
  ): Promise<SolverRootsAndHitsPrecisionF64Response>;
  solveCausalRootsNormalizedF64(
    request: SolverCausalRootsNormalizedF64Request
  ): Promise<SolverCausalRootsNormalizedF64Response>;
  solveCausalRootBatchF64(
    request: SolverCausalRootBatchF64Request
  ): Promise<SolverCausalRootBatchF64Response>;
  solveRootsAndHitsF64(request: SolverCausalRootsF64Request): Promise<SolverRootsAndHitsF64Response>;
  buildRootLedgerDetailF64(
    request: SolverRootLedgerDetailF64Request
  ): Promise<SolverRootLedgerDetailF64Response>;
  computePhaseAtHitF64(request: SolverPhaseAtHitF64Request): Promise<SolverPhaseAtHitF64Response>;
  summarizePhaseAtHitsF64(
    request: SolverPhaseAtHitSummaryF64Request
  ): Promise<SolverPhaseAtHitSummaryF64Response>;
  computeSharedGeometryF64(request: SolverSharedGeometryF64Request): Promise<SolverSharedGeometryF64Response>;
  detectAssemblyMembershipEventsF64(
    request: SolverAssemblyMembershipEventsF64Request
  ): Promise<SolverAssemblyMembershipEventsF64Response>;
  buildAssemblyGraphDatasetF64(
    request: SolverAssemblyGraphDatasetF64Request
  ): Promise<SolverAssemblyGraphDatasetF64Response>;
  createAssemblyGraphStoreF64(
    request: SolverAssemblyGraphStoreF64Request
  ): Promise<SolverAssemblyGraphStoreF64Response>;
  describeAssemblyGraphStoreF64(
    request: SolverDescribeAssemblyGraphStoreF64Request
  ): Promise<SolverAssemblyGraphStoreDescriptionF64Response>;
  readAssemblyGraphStoreRangeF64(
    request: SolverAssemblyGraphStoreReadF64Request
  ): Promise<SolverAssemblyGraphStoreReadF64Response>;
  buildSpaceTimeIndexF64(request: SolverBuildSpaceTimeIndexF64Request): Promise<SolverSpaceTimeIndexF64Response>;
  buildPathHistoryStreamSpaceTimeIndexF64(
    request: SolverBuildPathHistoryStreamSpaceTimeIndexF64Request
  ): Promise<SolverSpaceTimeIndexF64Response>;
  querySpaceTimeIndexF64(request: SolverQuerySpaceTimeIndexF64Request): Promise<SolverSpaceTimeIndexF64Response>;
  sampleLinearMotionF64(request: SolverLinearMotionSampleF64Request): Promise<SolverLinearMotionSampleF64Response>;
  createPathHistoryStreamF64(
    request: SolverCreatePathHistoryStreamF64Request
  ): Promise<SolverPathHistoryStreamF64Response>;
  planPathHistoryStorageLifecycleF64(
    request: SolverPathHistoryStorageLifecycleRequest
  ): Promise<SolverPathHistoryStorageLifecycleResponse>;
  queryEmissionShellCandidatesF64(
    request: SolverEmissionShellCandidateF64Request
  ): Promise<SolverEmissionShellCandidateF64Response>;
  queryEmissionShellCandidatePacketF64(
    request: SolverEmissionShellCandidatePacketF64Request
  ): Promise<SolverEmissionShellCandidateF64Response>;
  queryEmissionShellCandidatePacketsF64(
    request: SolverEmissionShellCandidatePacketsF64Request
  ): Promise<SolverEmissionShellCandidateF64Response>;
  refineEmissionShellCandidateRootsF64(
    request: SolverEmissionShellRootRefinementF64Request
  ): Promise<SolverEmissionShellRootRefinementF64Response>;
  cancelRun(request: SolverCancelRequest): Promise<SolverStatusRecord>;
  openStream(request: SolverOpenStreamRequest): Promise<SolverStreamHandle>;
  readStreamRange(request: SolverReadStreamRangeRequest): Promise<SolverStreamRangeResponse>;
  closeRun(request: SolverCloseRunRequest): Promise<SolverStatusRecord>;
  dispose(): Promise<void>;
}

export interface SolverBridgeClientOptions {
  createWasmModule?: (options: { locateFile?: (fileName: string) => string }) => Promise<unknown>;
  locateFile?: (fileName: string) => string;
}

export interface SolverLinearPathSegmentF64 {
  startTime: number;
  endTime: number;
  positionAtStart: SolverVector3F64;
  velocity: SolverVector3F64;
  errorBound?: number;
}

export interface SolverVector3F64 {
  x: number;
  y: number;
  z: number;
}

export interface SolverLinearMotionSampleF64Request {
  segment: SolverLinearPathSegmentF64;
  pathKey: number;
  startTime: number;
  endTime: number;
  step: number;
  stateFlags?: number;
  maxFrames?: number;
}

export interface SolverLinearMotionSampleF64Response {
  frames: SolverMotionFrameF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverMotionFrameF64 {
  pathKey: number;
  frameIndex: number;
  time: number;
  position: SolverVector3F64;
  velocity: SolverVector3F64;
  errorBound: number;
  stateFlags: number;
}

export interface SolverSharedGeometryF64Request {
  pathBounds?: SolverPathBoundsF64Request[];
  spherePointIntersections?: SolverSpherePointIntersectionF64Request[];
  delayedPotentials?: SolverDelayedPotentialF64Request[];
  circularSelfHitSpans?: SolverCircularSelfHitSpanF64Request[];
}

export interface SolverPathBoundsF64Request {
  segment: SolverLinearPathSegmentF64;
  pathKey?: number;
}

export interface SolverSpherePointIntersectionF64Request {
  center: SolverVector3F64;
  radius: number;
  point: SolverVector3F64;
  tolerance?: number;
}

export interface SolverDelayedPotentialF64Request {
  source: SolverLinearPathSegmentF64;
  samplePoint: SolverVector3F64;
  observationTime: number;
  fieldSpeed?: number;
  normalization?: number;
  softening?: number;
  sourceCharge?: number;
  iterations?: number;
  useCausalDenominator?: boolean;
}

export interface SolverCircularSelfHitSpanF64Request {
  fieldSpeedRatio: number;
  fieldSpeedTolerance?: number;
  tolerance?: number;
  maxIterations?: number;
  scanSubdivisions?: number;
  maxAngle?: number;
}

export interface SolverSharedGeometryF64Response {
  pathBounds: SolverPathBoundsF64[];
  spherePointIntersections: SolverSpherePointIntersectionF64[];
  delayedPotentials: SolverDelayedPotentialF64[];
  circularSelfHitSpans: SolverCircularSelfHitSpanF64[];
  status: SolverStatusRecord;
}

export interface SolverPathBoundsF64 {
  itemIndex: number;
  statusCode: number;
  pathKey: number;
  min: SolverVector3F64;
  max: SolverVector3F64;
}

export interface SolverSpherePointIntersectionF64 {
  itemIndex: number;
  intersects: boolean;
  centerDistance: number;
  signedDistance: number;
}

export interface SolverDelayedPotentialF64 {
  itemIndex: number;
  statusCode: number;
  tau: number;
  emissionTime: number;
  emissionPoint: SolverVector3F64;
  displacement: SolverVector3F64;
  distance: number;
  denominator: number;
  potential: number;
  kappa: number;
  iterations: number;
  usedCausalDenominator: boolean;
}

export interface SolverCircularSelfHitSpanF64 {
  itemIndex: number;
  statusCode: number;
  fieldSpeedRatio: number;
  fieldSpeedTolerance: number;
  regime: "sub_field" | "field_speed" | "super_field";
  resultKind: "below_threshold" | "root_solved" | "fallback_pi";
  span: number;
  rootFound: boolean;
  bracketLow: number;
  bracketHigh: number;
  residual: number;
  iterations: number;
}

export interface SolverAssemblyMembershipEventsF64Request {
  memberships: SolverAssemblyMembershipF64[];
  maxEvents?: number;
}

export interface SolverAssemblyMembershipEventsF64Response {
  events: SolverAssemblyEventF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverAssemblyGraphDatasetF64Request {
  assemblyStates?: SolverAssemblyStateF64[];
  memberships?: SolverAssemblyMembershipF64[];
  hierarchy?: SolverAssemblyHierarchyF64[];
  events?: SolverAssemblyEventF64[];
  deriveMembershipEvents?: boolean;
  maxEvents?: number;
}

export interface SolverAssemblyGraphDatasetF64Response {
  schema: "solver-assembly-graph-dataset.v1";
  summary: SolverAssemblyGraphDatasetF64Summary;
  assemblyStates: SolverAssemblyStateF64[];
  memberships: SolverAssemblyMembershipF64[];
  hierarchy: SolverAssemblyHierarchyF64[];
  events: SolverAssemblyEventF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverAssemblyGraphDatasetF64Summary {
  schema: "solver-assembly-graph-summary.v1";
  assemblyStateCount: number;
  membershipCount: number;
  hierarchyCount: number;
  eventCount: number;
  derivedEventCount: number;
  explicitEventCount: number;
  assemblyCount: number;
  pathCount: number;
  bufferCount: number;
  eventSource: "derived" | "explicit" | "none";
  timeRange: SolverRange;
}

export interface SolverAssemblyGraphStoreF64Request extends SolverAssemblyGraphDatasetF64Request {
  storeId: string;
  storagePolicy?: SolverStoragePolicy;
}

export interface SolverDescribeAssemblyGraphStoreF64Request {
  storeId?: string;
  manifestPath?: string;
}

export interface SolverAssemblyGraphStoreReadF64Request {
  storeId?: string;
  manifestPath?: string;
  layouts?: SolverAssemblyGraphLayoutId[];
  rowOffset?: number;
  rowCount?: number;
  pathKey?: number;
  assemblyKey?: number;
  timeRange?: SolverRange;
  byteRange?: SolverRange;
  maxBytes?: number;
}

export interface SolverAssemblyGraphStoreF64Response {
  schema: "solver-assembly-graph-store.v1";
  store: SolverAssemblyGraphStoreManifest;
  summary: SolverAssemblyGraphDatasetF64Summary;
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverAssemblyGraphStoreDescriptionF64Response {
  schema: "solver-assembly-graph-store-description.v1";
  store: SolverAssemblyGraphStoreManifest;
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverAssemblyGraphStoreReadF64Response {
  schema: "solver-assembly-graph-read.v1";
  storeId: string;
  manifestVersion: "solver-assembly-graph-manifest.v1";
  readSummary: SolverAssemblyGraphStoreReadSummary;
  assemblyStates: SolverAssemblyStateF64[];
  memberships: SolverAssemblyMembershipF64[];
  hierarchy: SolverAssemblyHierarchyF64[];
  events: SolverAssemblyEventF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverAssemblyGraphStoreReadSummary {
  schema: "solver-assembly-graph-read-summary.v1";
  assemblyStateCount: number;
  membershipCount: number;
  hierarchyCount: number;
  eventCount: number;
  bufferCount: number;
  byteLength: number;
  indexed: boolean;
  indexedLayoutCount: number;
  indexRowCount: number;
  indexSkippedRowCount: number;
}

export interface SolverAssemblyGraphStoreManifest {
  storeId: string;
  manifestVersion: "solver-assembly-graph-manifest.v1";
  numericType: "f64";
  byteOrder: "little-endian";
  timeRange: SolverRange | null;
  durable: boolean;
  metadataPath: string;
  storagePolicy: SolverStoragePolicy;
  summary?: SolverAssemblyGraphDatasetF64Summary;
  index?: SolverAssemblyGraphStoreIndex | null;
  datasets: {
    states: SolverAssemblyGraphStoreDataset;
    memberships: SolverAssemblyGraphStoreDataset;
    hierarchy: SolverAssemblyGraphStoreDataset;
    events: SolverAssemblyGraphStoreDataset;
  };
}

export interface SolverAssemblyGraphStoreIndex {
  schema: "solver-assembly-graph-index.v1";
  indexedFilters: ("pathKey" | "assemblyKey" | "timeRange" | "rowRange" | "byteRange")[];
  rowCount: number;
  rows: SolverAssemblyGraphStoreIndexRow[];
  summary: SolverAssemblyGraphStoreIndexSummary;
  sidecar?: SolverAssemblyGraphStoreIndexSidecar;
}

export interface SolverAssemblyGraphStoreIndexSidecar {
  schema: "solver-assembly-graph-index-sidecar.v1";
  indexLayout: "assembly_graph_index.v1";
  numericType: SolverNumericType;
  byteOrder: "little-endian";
  rowSizeBytes: 72;
  rowCount: number;
  byteLength: number;
  filePath: string;
  checksum: string;
}

export interface SolverAssemblyGraphStoreIndexSummary {
  schema: "solver-assembly-graph-index-summary.v1";
  rowCount: number;
  countsByLayout: Record<SolverAssemblyGraphLayoutId, number | undefined>;
  countsByKeyKind: Record<SolverAssemblyGraphIndexKeyKind, number | undefined>;
}

export interface SolverAssemblyGraphStoreIndexRow {
  layout: SolverAssemblyGraphLayoutId;
  keyKind: SolverAssemblyGraphIndexKeyKind;
  key: number;
  rowOffset: number;
  rowCount: number;
  timeRange: SolverRange;
  byteRange: SolverRange;
}

export type SolverAssemblyGraphIndexKeyKind =
  | "path"
  | "assembly"
  | "parent-assembly"
  | "child-assembly";

export interface SolverAssemblyGraphStoreDataset {
  layout: SolverAssemblyGraphLayoutId;
  rowSizeBytes: number;
  rowCount: number;
  byteLength: number;
  path: string;
  checksum?: string;
}

export interface SolverAssemblyMembershipF64 {
  membershipKey: number;
  pathKey: number;
  assemblyKey: number;
  assemblyStateKey: number;
  timeStart: number;
  timeEnd: number;
  confidence: number;
  localRole?: number;
  bindingState?: number;
  membershipVersion?: number;
  eventKind?: number;
  statusFlags?: number;
}

export interface SolverAssemblyEventF64 {
  eventKey: number;
  primaryId: number;
  secondaryId: number;
  priorStateKey: number;
  nextStateKey: number;
  relatedPathKey: number;
  relatedAssemblyKey: number;
  branchTransitionKey: number;
  eventTime: number;
  eventKind: number;
  speedRegime: number;
  statusFlags: number;
}

export interface SolverAssemblyHierarchyF64 {
  hierarchyKey: number;
  parentAssemblyKey: number;
  childAssemblyKey: number;
  timeStart: number;
  timeEnd: number;
  relationType?: number;
  hierarchyVersion?: number;
  statusFlags?: number;
}

export type SolverAssemblyGraphLayoutId =
  | "assembly_state.v1"
  | "assembly_membership.v1"
  | "assembly_hierarchy.v1"
  | "assembly_events.v1";

export interface SolverBuildSpaceTimeIndexF64Request {
  pathRows?: SolverPathHistoryRowF64[];
  assemblyStates?: SolverAssemblyStateF64[];
  options: SolverSpaceTimeIndexOptionsF64;
  maxRows?: number;
}

export interface SolverBuildPathHistoryStreamSpaceTimeIndexF64Request {
  streamId: string;
  chunkIndices?: number[];
  pathKeys?: number[];
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  byteRange?: SolverRange;
  assemblyStates?: SolverAssemblyStateF64[];
  options: SolverSpaceTimeIndexOptionsF64;
  maxRows?: number;
  maxBytes?: number;
}

export interface SolverQuerySpaceTimeIndexF64Request {
  rows: SolverSpaceTimeIndexRowF64[];
  query: SolverSpaceTimeQueryF64;
  options: SolverSpaceTimeIndexOptionsF64;
  maxRows?: number;
}

export interface SolverSpaceTimeIndexF64Response {
  rows: SolverSpaceTimeIndexRowF64[];
  buffers: SolverBufferDescriptor[];
  overflowEntryCount: number;
  status: SolverStatusRecord;
}

export interface SolverPathHistoryRowF64 {
  pathKey: number;
  segmentIndex: number;
  startTime: number;
  endTime: number;
  start: SolverVector3F64;
  velocity: SolverVector3F64;
  errorBound?: number;
  stateFlags?: number;
}

export interface SolverCreatePathHistoryStreamF64Request {
  runId: string;
  datasetId?: string;
  streamId: string;
  pathRows: SolverPathHistoryRowF64[];
  rowsPerChunk?: number;
  storagePolicy?: SolverStoragePolicy;
  metadata?: Partial<SolverPathHistoryStreamMetadata>;
}

export interface SolverPathHistoryStreamF64Response {
  schema: "solver-path-history-stream.v1";
  stream: SolverStreamDescriptor;
  buffers: SolverBufferMetadata[];
  summary: SolverPathHistoryStreamSummary;
  status: SolverStatusRecord;
}

export interface SolverPathHistoryStreamSummary {
  schema: "solver-path-history-stream-summary.v1";
  runId: string;
  datasetId?: string;
  streamId: string;
  rowCount: number;
  chunkCount: number;
  pathCount: number;
  byteLength: number;
  rowSizeBytes: number;
  pathIndexRowCount: number;
  pathIndexedChunkCount: number;
  timeRange: SolverRange;
  frameRange: SolverRange;
  storagePolicy: SolverStoragePolicy;
  metadata: SolverPathHistoryStreamMetadata;
}

export type SolverPathHistoryStorageTier = "active" | "warm" | "cold" | "deleted" | "unknown";

export type SolverPathHistoryStorageAction =
  | "keep_active"
  | "spill_warm"
  | "archive_cold"
  | "build_deep_index"
  | "delete"
  | "blocked_unsafe"
  | "unknown";

export type SolverPathHistoryStorageReason =
  | "unknown"
  | "delete_requested"
  | "failed_run_cleanup"
  | "overlaps_active_window"
  | "chunk_is_pinned_active"
  | "aged_chunk_requires_deep_index"
  | "storage_pressure_without_export_request"
  | "export_retention_requested"
  | "deep_index_already_built"
  | "aged_out_of_active_window";

export interface SolverPathHistoryStorageLifecyclePolicy {
  activeWindow?: SolverRange;
  deepIndexEnabled?: boolean;
  exportRequested?: boolean;
  failedRun?: boolean;
  deleteRequested?: boolean;
  activeMemoryBudgetBytes?: number;
  storageBudgetBytes?: number;
}

export interface SolverPathHistoryChunkMetadata {
  chunkIndex: number;
  pathKeyStart: number;
  pathKeyEnd: number;
  rowOffset: number;
  rowCount: number;
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  byteRange?: SolverRange;
  timeStart?: number;
  timeEnd?: number;
  frameStart?: number;
  frameEnd?: number;
  byteOffset?: number;
  byteLength?: number;
  checksum64?: number | string | bigint;
  stateFlags?: number;
}

export interface SolverPathHistoryStorageLifecycleRequest {
  streamId?: string;
  policy: SolverPathHistoryStorageLifecyclePolicy;
  chunks?: SolverPathHistoryChunkMetadata[];
}

export interface SolverPathHistoryLifecycleDecision {
  chunkIndex: number;
  tierCode: number;
  tier: SolverPathHistoryStorageTier;
  actionCode: number;
  action: SolverPathHistoryStorageAction;
  safeToAgeOut: boolean;
  requiresDeepIndex: boolean;
  reasonCode: number;
  reason: SolverPathHistoryStorageReason;
}

export interface SolverPathHistoryStorageLifecycleResponse {
  schema: "solver-path-history-storage-lifecycle.v1";
  streamId?: string;
  policy: Required<Omit<SolverPathHistoryStorageLifecyclePolicy, "activeWindow">> & {
    activeWindow?: SolverRange;
  };
  chunkCount: number;
  decisions: SolverPathHistoryLifecycleDecision[];
  status: SolverStatusRecord;
}

export interface SolverPathHistoryStreamMetadata {
  schema: "solver-path-history-stream-metadata.v1";
  precisionPath: SolverPrecisionPath;
  units: string;
  coordinateFrame: string;
  scaleNormalization: string;
  interpolationRule: string;
  provenance: Record<string, unknown>;
  diagnostics: SolverDiagnosticRecord[];
}

export interface SolverEmissionShellCandidateF64Request {
  streamId: string;
  signalSpeed: number;
  tolerance?: number;
  maxCandidates?: number;
  sourcePathKeys?: number[];
  receiverPathKeys?: number[];
  sourceChunkIndices?: number[];
  receiverChunkIndices?: number[];
  allowSamePath?: boolean;
  workerCount?: number;
  timeRange?: SolverRange;
}

export interface SolverEmissionShellCandidatePacketF64Request {
  streamId: string;
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

export interface SolverEmissionShellCandidatePacketsF64Request {
  streamId: string;
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

export interface SolverEmissionShellCandidatePacketMergeF64Request {
  responses: SolverEmissionShellCandidateF64Response[];
}

export interface SolverEmissionShellCandidateF64Response {
  schema: "solver-emission-shell-candidates.v1";
  packetId?: string;
  packetMergeOrder?: number;
  packetMergeKey?: string;
  packetResult?: SolverWorkPacketResultRef;
  packetResults?: SolverWorkPacketResultRef[];
  streamId: string;
  signalSpeed: number;
  tolerance: number;
  pairCount: number;
  rejectedPairCount: number;
  candidateCount: number;
  rejectionRate: number;
  candidateRate: number;
  falsePositiveEstimate: SolverEmissionShellFalsePositiveEstimate;
  scanSummary: SolverEmissionShellScanSummary;
  truncated: boolean;
  candidates: SolverEmissionShellCandidateF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverEmissionShellRootRefinementF64Request {
  streamId: string;
  candidates: SolverEmissionShellCandidateF64[];
  signalSpeed: number;
  tolerance?: number;
  rootTolerance?: number;
  maxCandidates?: number;
  maxIterations?: number;
  scanSubdivisions?: number;
  maxRootsPerCandidate?: number;
  maxHitsPerCandidate?: number;
  workerCount?: number;
}

export interface SolverEmissionShellRootRefinementF64Response {
  schema: "solver-emission-shell-root-refinement.v1";
  streamId: string;
  signalSpeed: number;
  tolerance: number;
  candidateCount: number;
  processedCandidateCount: number;
  attemptedCandidateCount: number;
  skippedCandidateCount: number;
  rootCount: number;
  hitCount: number;
  truncated: boolean;
  items: SolverEmissionShellRootRefinementItemF64[];
  roots: SolverCausalRootF64[];
  hits: SolverDelayedHitF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverEmissionShellRootRefinementItemF64 {
  candidateIndex: number;
  sourcePathKey: number;
  receiverPathKey: number;
  sourceChunkIndex: number;
  receiverChunkIndex: number;
  sourceRowOffset: number;
  receiverRowOffset: number;
  hitTime: number | null;
  sampledEmissionTime: number | null;
  rootOffset: number;
  rootCount: number;
  hitOffset: number;
  hitCount: number;
  status: SolverStatusRecord;
}

export interface SolverEmissionShellScanSummary {
  schema: "solver-emission-shell-scan-summary.v1";
  executionPath: "native_c_abi" | "javascript_fallback" | "packet_merge";
  streamChunkCount: number;
  skippedChunkCount: number;
  prunedByTimeChunkCount: number;
  prunedByPathChunkCount: number;
  pathIndexRowCount: number;
  pathIndexedChunkCount: number;
  indexSkippedRowCount: number;
  scannedRowCount: number;
  skippedRowCount: number;
  uniqueMaterializedRowCount: number;
  materializedRoleRowCount: number;
  sourceRowCount: number;
  receiverRowCount: number;
  possiblePairUpperBound: number;
  testedPairCount: number;
  skippedPairCount: number;
  rejectedPairCount: number;
  candidateCount: number;
  outputBufferCount: number;
  outputByteLength: number;
  requestedWorkerCount: number;
  plannedWorkerCount: number;
  truncated: boolean;
}

export interface SolverEmissionShellFalsePositiveEstimate {
  method: "sampled_linear_segment_bisection.v1";
  testedCandidateCount: number;
  estimatedTruePositiveCount: number;
  estimatedFalsePositiveCount: number;
  estimatedFalsePositiveRate: number;
}

export interface SolverEmissionShellCandidateF64 {
  sourcePathKey: number;
  receiverPathKey: number;
  sourceSegmentIndex: number;
  receiverSegmentIndex: number;
  sourceChunkIndex: number;
  receiverChunkIndex: number;
  sourceRowOffset: number;
  receiverRowOffset: number;
  sourceTimeRange: SolverRange;
  receiverTimeRange: SolverRange;
  distanceLowerBound: number;
  distanceUpperBound: number;
  radiusLowerBound: number;
  radiusUpperBound: number;
  candidateKind: "broad_phase_possible";
  narrowPhaseEstimate: SolverEmissionShellNarrowPhaseEstimate;
}

export interface SolverEmissionShellNarrowPhaseEstimate {
  method: "sampled_linear_segment_bisection.v1";
  classification: "sampled_hit" | "sampled_miss";
  sampleCount: number;
  hitTime?: number;
  emissionTime?: number;
  residual: number | null;
}

export interface SolverAssemblyStateF64 {
  assemblyKey: number;
  assemblyStateKey: number;
  timeStart: number;
  timeEnd: number;
  center: SolverVector3F64;
  velocity: SolverVector3F64;
  phase?: number;
  cycleIndex?: number;
  modelVersion?: number;
  statusFlags?: number;
  fidelityFlags?: number;
}

export interface SolverSpaceTimeIndexOptionsF64 {
  spatialCellSize: number;
  timeBinSize: number;
  maxCellsPerItem: number;
}

export interface SolverSpaceTimeQueryF64 {
  bounds: SolverSpaceTimeBoundsF64;
  filterSpace?: boolean;
  filterTime?: boolean;
  subjectKind?: number;
  subjectKey?: number;
}

export interface SolverSpaceTimeBoundsF64 {
  min: SolverVector3F64;
  max: SolverVector3F64;
  timeStart: number;
  timeEnd: number;
}

export interface SolverSpaceTimeIndexRowF64 extends SolverSpaceTimeBoundsF64 {
  cellX: number;
  cellY: number;
  cellZ: number;
  cellT: number;
  subjectKey: number;
  rowOffset: number;
  subjectKind: number;
  sourceLayout: number;
  stateFlags: number;
}

export interface SolverCausalRootsF64Request {
  source: SolverLinearPathSegmentF64;
  receiver: SolverLinearPathSegmentF64;
  hitTime: number;
  signalSpeed: number;
  rootTolerance?: number;
  maxIterations?: number;
  scanSubdivisions?: number;
  maxRoots?: number;
  maxHits?: number;
}

export interface SolverRootLedgerDetailF64Request extends SolverCausalRootsF64Request {
  maxRows?: number;
}

export interface SolverCausalRootsF64Response {
  roots: SolverCausalRootF64[];
  status: SolverStatusRecord;
}

export interface SolverCausalRootsPrecisionF64Request {
  rootRequest: SolverCausalRootsF64Request;
  requestedPrecisionPath?: SolverPrecisionPath;
  claimLevel?: SolverClaimLevel;
  allowEscalation?: boolean;
  runValidationReplay?: boolean;
  maxRoots?: number;
  maxHits?: number;
}

export interface SolverCausalRootsPrecisionF64Response {
  schema: "solver-causal-roots-precision-f64.v1";
  roots: SolverCausalRootF64[];
  precision: SolverPrecisionSolveSummaryF64;
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverPrecisionSolveSummaryF64 {
  requestedPrecisionPath: SolverPrecisionPath;
  diagnosticPrecisionPath: SolverPrecisionPath;
  selectedPrecisionPath: SolverPrecisionPath;
  selectedNumericType: SolverNumericType;
  claimLevel: SolverClaimLevel;
  statusCode: SolverStatusCode;
  statusSeverity: SolverStatusSeverity;
  rootCount: number;
  rootTolerance: number;
  maxResidual: number;
  minAbsJacobian: number;
  maxIterations: number;
  scanSubdivisions: number;
  escalated: boolean;
  validationReplayRun: boolean;
  validationReplayMatched: boolean;
}

export interface SolverCausalRootsNormalizedF64Request {
  coordinateOrigin: SolverVector3F64;
  localRequest: SolverCausalRootsF64Request;
  restoreAbsolutePoints?: boolean;
}

export interface SolverCausalRootsNormalizedF64Response {
  schema: "solver-causal-roots-normalized-f64.v1";
  coordinateFrame: "origin-normalized";
  coordinateOrigin: SolverVector3F64;
  localRequest: SolverCausalRootsF64Request;
  roots: SolverNormalizedCausalRootF64[];
  absoluteRoots?: SolverAbsoluteDisplayCausalRootF64[];
  status: SolverStatusRecord;
}

export interface SolverNormalizedCausalRootF64 extends SolverCausalRootF64 {
  coordinateFrame: "origin-normalized";
}

export interface SolverAbsoluteDisplayCausalRootF64 extends SolverCausalRootF64 {
  coordinateFrame: "absolute-display";
  localSourcePoint: SolverVector3F64;
  localReceiverPoint: SolverVector3F64;
  absolutePointAuthority: "display-only";
}

export interface SolverRootLedgerDetailF64Response {
  rows: SolverRootLedgerDetailF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverPrecisionDiagnosticF64Response {
  statusCode: number;
  recommendedPath: SolverPrecisionPath;
  recommendedNumericType: SolverNumericType;
  scaleNormalizationRecommended: boolean;
  extendedPrecisionRecommended: boolean;
  scaleResolutionLimited: boolean;
  timeResolutionLimited: boolean;
  timeScale: SolverMagnitudeSummary;
  geometryScale: SolverMagnitudeSummary;
  speedScale: Omit<SolverMagnitudeSummary, "minNonzeroMagnitude">;
  toleranceScale: Omit<SolverMagnitudeSummary, "maxMagnitude">;
  status: SolverStatusRecord;
}

export interface SolverMagnitudeSummary {
  ordersOfMagnitude: number;
  maxMagnitude: number;
  minNonzeroMagnitude: number;
}

export interface SolverCausalRootBatchF64Request {
  requests: SolverCausalRootsF64Request[];
  maxItems?: number;
  maxRoots?: number;
  workerCount?: number;
}

export interface SolverCausalRootBatchF64Response {
  items: SolverCausalRootBatchItemF64[];
  roots: SolverCausalRootF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverCausalRootBatchItemF64 {
  itemIndex: number;
  statusCode: number;
  rootOffset: number;
  rootCount: number;
  roots: SolverCausalRootF64[];
}

export interface SolverRootsAndHitsF64Response {
  roots: SolverCausalRootF64[];
  hits: SolverDelayedHitF64[];
  buffers: SolverBufferDescriptor[];
  streams: SolverStreamDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverRootsAndHitsPrecisionF64Response extends SolverRootsAndHitsF64Response {
  schema: "solver-roots-and-hits-precision-f64.v1";
  precision: SolverPrecisionSolveSummaryF64;
}

export interface SolverPhaseClockF64 {
  period: number;
  epoch?: number;
  phaseOffset?: number;
}

export interface SolverPhaseAtHitF64Request {
  roots: SolverCausalRootF64[];
  sourceClock: SolverPhaseClockF64;
  receiverClock: SolverPhaseClockF64;
}

export interface SolverPhaseAtHitF64Response {
  rows: SolverPhaseAtHitF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
}

export interface SolverPhaseAtHitSummaryF64Request {
  rows: SolverPhaseAtHitF64[];
}

export interface SolverPhaseAtHitSummaryF64Response {
  summary: SolverPhaseAtHitSummaryF64;
  status: SolverStatusRecord;
}

export interface SolverPhaseAtHitSummaryF64 {
  schema: "solver-phase-at-hit-summary.v1";
  rowCount: number;
  rootIdRange: SolverRange;
  statusCounts: SolverPhaseAtHitStatusCount[];
  sourceCycleIndexRange: SolverRange;
  receiverCycleIndexRange: SolverRange;
  emissionTimeRange: SolverRange;
  hitTimeRange: SolverRange;
  sourcePhaseRange: SolverRange;
  receiverPhaseRange: SolverRange;
  phaseDeltaRange: SolverRange;
  phaseSpreadRange: SolverRange;
  meanPhaseDelta: number;
  meanPhaseSpread: number;
  maxPhaseSpread: number;
}

export interface SolverPhaseAtHitStatusCount {
  statusCode: number;
  rowCount: number;
}

export interface SolverPhaseAtHitF64 {
  rootId: number;
  statusCode: number;
  sourceCycleIndex: number;
  receiverCycleIndex: number;
  emissionTime: number;
  hitTime: number;
  sourcePhase: number;
  receiverPhase: number;
  phaseDelta: number;
  phaseSpread: number;
}

export interface SolverCausalRootF64 {
  rootId: number;
  statusCode: number;
  emissionTime: number;
  hitTime: number;
  delay: number;
  distance: number;
  residual: number;
  jacobian: number;
  branchWeight: number;
  sourcePoint: SolverVector3F64;
  receiverPoint: SolverVector3F64;
}

export interface SolverRootLedgerDetailF64 {
  ledgerKey: number;
  sourceKey: number;
  receiverKey: number;
  rootKey: number;
  intervalStart: number;
  intervalEnd: number;
  emissionTime: number;
  hitTime: number;
  delay: number;
  residual: number;
  jacobian: number;
  branchWeight: number;
  bracketStart: number;
  bracketEnd: number;
  sourcePoint: SolverVector3F64;
  receiverPoint: SolverVector3F64;
  entryKind: number;
  rootKind: number;
  statusCode: number;
  jacobianSignStratum: number;
  sequenceIndex: number;
  iterationCount: number;
  stateFlags: number;
}

export interface SolverDelayedHitF64 {
  eventId: number;
  rootId: number;
  statusCode: number;
  emissionTime: number;
  hitTime: number;
  distance: number;
  jacobian: number;
  strength: number;
  emissionPoint: SolverVector3F64;
  receiverPoint: SolverVector3F64;
  unitDirection: SolverVector3F64;
}

export interface SolverInitRequest {
  appId: SolverAppId;
  apiVersion: string;
  requestedCapabilities: string[];
  storagePolicy: SolverStoragePolicy;
  threadingPolicy: SolverThreadingPolicy;
}

export interface SolverRunRequest {
  requestId?: string;
  runId?: string;
  datasetId?: string;
  appId: SolverAppId;
  runKind: SolverRunKind;
  claimLevel: SolverClaimLevel;
  precisionPath: SolverPrecisionPath;
  configVersion: string;
  configHash?: string;
  model: SolverModelContract;
  envelope: SolverSimulationEnvelope;
  errorBudget: SolverErrorBudget;
  config: SolverRunConfig;
  output: SolverOutputRequest;
}

export interface SolverAdmissionRequest {
  model: SolverModelContract;
  errorBudget: SolverErrorBudget;
  envelope: SolverSimulationEnvelope;
  capability?: SolverCapabilityEnvelope;
}

export interface SolverAdmissionResponse {
  decision: SolverAdmissionDecision;
  selectedPrecisionPath: SolverPrecisionPath;
  admitted: boolean;
  stressSummary: SolverAdmissionStressSummary;
  statuses: SolverStatusRecord[];
  status: SolverStatusRecord;
}

export type SolverAdmissionStressDimension =
  | "entity_count"
  | "interaction_graph"
  | "memory"
  | "time_steps"
  | "output_detail"
  | "precision";

export interface SolverAdmissionStressSummary {
  schema: "solver-admission-stress-summary.v1";
  entityCount: number;
  estimatedPairCount: number;
  entityPressure: number;
  interactionPressure: number;
  memoryPressure: number;
  timeStepCountEstimate: number | null;
  timeStepPressure: number;
  outputPressure: number;
  precisionPressure: number;
  dominantStress: SolverAdmissionStressDimension;
  pressureScore: number;
}

export interface SolverCapabilityEnvelope {
  maxInteractiveEntities?: number;
  maxBatchEntities?: number;
  minMemoryBudgetBytes?: number;
  minStorageBudgetBytesForStreaming?: number;
  minimumPositiveTolerance?: number;
  maxInteractiveStepCount?: number;
}

export interface SolverModelContract {
  modelId: string;
  equationVersion: string;
  forceLawVersion?: string;
  constantsHash: string;
  causalSpeedPolicy: string;
  branchPolicy: string;
  unitConvention: string;
  compatiblePrecisionPaths: SolverPrecisionPath[];
}

export interface SolverErrorBudget {
  globalTolerance: number;
  rootIsolationTolerance: number;
  delayedHitTolerance: number;
  integrationTolerance: number;
  streamEncodingTolerance: number;
  readbackTolerance: number;
  projectionTolerance?: number;
  displayTolerance?: number;
}

export interface SolverErrorBudgetStageReport {
  stage: SolverErrorBudgetStage;
  estimatedAbsoluteError: number;
  tolerance: number;
  toleranceRatio: number;
  authority: SolverValueAuthority;
  status: SolverStatusRecord;
}

export interface SolverErrorBudgetPropagationReport {
  cumulativeError: number;
  cumulativeBudgetRatio: number;
  authority: SolverValueAuthority;
  stages: SolverErrorBudgetStageReport[];
  statuses: SolverStatusRecord[];
}

export interface SolverErrorBudgetStageInput {
  stage: SolverErrorBudgetStage;
  estimatedAbsoluteError: number;
}

export interface SolverErrorBudgetPropagationRequest {
  errorBudget: SolverErrorBudget;
  stages: SolverErrorBudgetStageInput[];
  maxRows?: number;
}

export interface SolverErrorBudgetPropagationResponse extends SolverErrorBudgetPropagationReport {
  status: SolverStatusRecord;
}

export interface SolverRootHitInvariantOptions {
  rootResidualTolerance?: number;
  timeTolerance?: number;
  distanceTolerance?: number;
  directionTolerance?: number;
  branchWeightTolerance?: number;
  smallJacobianTolerance?: number;
}

export interface SolverRootHitInvariantF64Request {
  roots?: SolverCausalRootF64[];
  hits?: SolverDelayedHitF64[];
  options?: SolverRootHitInvariantOptions;
}

export interface SolverRootHitInvariantF64Response {
  rootCount: number;
  hitCount: number;
  statuses: SolverStatusRecord[];
  status: SolverStatusRecord;
}

export type SolverRootLedgerTransitionKind =
  | "retained"
  | "appeared"
  | "disappeared"
  | "folded"
  | "assimilated_from_tail"
  | "ledger_rerun_required";

export interface SolverRootLedgerTransitionF64Request {
  priorRows: SolverRootLedgerDetailF64[];
  nextRows: SolverRootLedgerDetailF64[];
}

export interface SolverRootLedgerTransitionF64 {
  transitionKey: string;
  kind: SolverRootLedgerTransitionKind;
  priorRootKey: number;
  nextRootKey: number;
  sourceKey: number;
  receiverKey: number;
  intervalStart: number;
  intervalEnd: number;
  priorEntryKind: number;
  nextEntryKind: number;
  priorStatusCode: number;
  nextStatusCode: number;
  priorJacobianSignStratum: number;
  nextJacobianSignStratum: number;
  status: SolverStatusRecord;
}

export interface SolverRootLedgerTransitionF64Response {
  transitions: SolverRootLedgerTransitionF64[];
  statuses: SolverStatusRecord[];
  status: SolverStatusRecord;
}

export type SolverRunConfig =
  | CausalRootsSolverConfig
  | PhaseDiagnosticsSolverConfig
  | PathHistorySolverConfig
  | DelayedHitsSolverConfig
  | SharedGeometrySolverConfig
  | MotionSimulationSolverConfig
  | AppPlaybackSolverConfig
  | AnimatorSolverConfig
  | PhotonSolverConfig
  | IdealSwarmSolverConfig
  | ValidationReplayConfig;

export type CausalRootsSolverConfig = { appId: SolverAppId } &
  (
    | { rootRequest: SolverCausalRootsF64Request; normalizedRootRequest?: never }
    | { rootRequest?: never; normalizedRootRequest: SolverCausalRootsNormalizedF64Request }
  );

export interface PhaseDiagnosticsSolverConfig {
  appId: SolverAppId;
  phaseRequest: SolverPhaseAtHitF64Request;
}

export interface PathHistorySolverConfig {
  appId: SolverAppId;
  streamId?: string;
  pathRows: SolverPathHistoryRowF64[];
  rowsPerChunk?: number;
  storagePolicy?: SolverStoragePolicy;
  metadata?: Partial<SolverPathHistoryStreamMetadata>;
}

export type DelayedHitsSolverConfig = { appId: SolverAppId } &
  (
    | { rootRequest: SolverCausalRootsF64Request; normalizedRootRequest?: never }
    | { rootRequest?: never; normalizedRootRequest: SolverCausalRootsNormalizedF64Request }
  );

export interface SharedGeometrySolverConfig {
  appId: SolverAppId;
  geometryRequest: SolverSharedGeometryF64Request;
}

export interface MotionSimulationSolverConfig {
  appId: SolverAppId;
  motionRequest: SolverLinearMotionSampleF64Request;
}

export interface AppPlaybackSolverConfig {
  appId: SolverAppId;
  sourceRunId?: string;
  sourceDatasetId?: string;
  frames?: SolverMotionFrameF64[];
  roots?: SolverCausalRootF64[];
  hits?: SolverDelayedHitF64[];
  geometry?: SolverSharedGeometryF64Response;
  diagnostics?: SolverDiagnosticRecord[];
}

export interface SolverRunHandle {
  requestId: string;
  runId: string;
  datasetId?: string;
  cancellationToken: string;
  acceptedPrecisionPath: SolverPrecisionPath;
  expectedOutputs: SolverOutputKind[];
  response?: SolverRunResponse;
  status?: SolverStatusRecord;
}

export type SolverOutputKind =
  | "summary"
  | "frameBuffer"
  | "pathSegmentBuffer"
  | "pathStream"
  | "assemblyMembership"
  | "assemblyGraph"
  | "rootLedger"
  | "delayedHitEvents"
  | "phaseAtHit"
  | "geometryBuffer"
  | "diagnostics"
  | "validationArtifacts";

export interface SolverOutputRequest {
  outputs: SolverOutputKind[];
  streamTarget?: "worker-memory" | "opfs" | "native-file" | "caller-buffer";
  memoryBudgetBytes: number;
  sampleStride?: number;
  deterministic: boolean;
}

export interface SolverSimulationEnvelope {
  entityCount: number;
  assemblyCount?: number;
  spatialBounds?: SolverSpatialBounds;
  densityEstimate?: number;
  timeWindow: SolverTimeWindow;
  timeResolutionHint?: number;
  interactionPolicy: "sparse" | "neighbor-pruned" | "all-to-all" | "same-source-enabled";
  expectedBranchComplexity: "low" | "moderate" | "high" | "unknown";
  outputDetail: "preview" | "playback" | "export" | "validation";
  memoryBudgetBytes: number;
  storageBudgetBytes?: number;
  latencyTarget: "interactive" | "background" | "batch" | "validation";
  simplificationPolicy: "none" | "explicit-reduced-model";
}

export interface SolverSpatialBounds {
  x: SolverRange;
  y: SolverRange;
  z: SolverRange;
  units: string;
}

export type SolverWorkerMessage =
  | { type: "progress"; runId: string; stage: string; fraction?: number }
  | { type: "diagnostic"; runId: string; diagnostic: SolverDiagnosticRecord }
  | { type: "completed"; runId: string; response: SolverRunResponse }
  | { type: "halt"; runId: string; status: SolverStatusRecord }
  | { type: "error"; requestId: string; status: SolverStatusRecord };

export interface SolverRunResponse {
  runId: string;
  datasetId?: string;
  manifest: SolverRunManifest;
  summary: SolverRunSummary;
  buffers: SolverBufferDescriptor[];
  streams: SolverStreamDescriptor[];
  diagnostics: SolverDiagnosticRecord[];
  frames?: SolverMotionFrameF64[];
  roots?: SolverCausalRootF64[];
  hits?: SolverDelayedHitF64[];
  phaseRows?: SolverPhaseAtHitF64[];
  phaseSummary?: SolverPhaseAtHitSummaryF64;
  pathHistory?: SolverPathHistoryStreamSummary;
  geometry?: SolverSharedGeometryF64Response;
  validationReplay?: SolverBaselineComparisonResult;
  status: SolverStatusRecord;
}

export interface SolverDescribeRunRequest {
  runId: string;
}

export interface SolverRunDescription {
  schema: "solver-run-description.v1";
  runId: string;
  datasetId?: string;
  manifest: SolverRunManifest;
  summary: SolverRunSummary;
  buffers: SolverBufferMetadata[];
  streams: SolverStreamDescriptor[];
  diagnostics: SolverDiagnosticRecord[];
  status: SolverStatusRecord;
}

export interface SolverRunManifest {
  schema: "solver-run-manifest.v1";
  manifestHash: string;
  requestId: string;
  runId: string;
  datasetId: string;
  appId: SolverAppId;
  runKind: SolverRunKind;
  claimLevel: SolverClaimLevel;
  configVersion: string;
  configHash: string;
  model: SolverModelContract;
  envelope: SolverSimulationEnvelope;
  errorBudget: SolverErrorBudget;
  requestedPrecisionPath: SolverPrecisionPath;
  selectedPrecisionPath: SolverPrecisionPath;
  output: SolverOutputRequest;
  admission: SolverRunManifestAdmission;
  provenance: SolverRunManifestProvenance;
  deterministic: boolean;
  buffers: SolverRunManifestBuffer[];
  streams: SolverRunManifestStream[];
  diagnostics: SolverDiagnosticRecord[];
  status: SolverStatusRecord;
}

export interface SolverRunManifestAdmission {
  decision: SolverAdmissionDecision;
  admitted: boolean;
  stressSummary: SolverAdmissionStressSummary;
  statuses: SolverStatusRecord[];
}

export interface SolverRunManifestProvenance {
  apiVersion: string;
  solverVersion: string;
  bridge: string;
  wasmAbiVersion: string;
  generatedAt: string;
}

export interface SolverRunManifestBuffer {
  bufferId: string;
  layout: SolverBinaryLayoutId;
  byteLength: number;
  rowCount: number;
  numericType: SolverNumericType;
  checksum: string;
}

export interface SolverRunManifestStream {
  streamId: string;
  manifestVersion: string;
  indexLayout: SolverBinaryLayoutId;
  rangeCount: number;
  storagePolicy: SolverStoragePolicy;
}

export interface SolverBufferDescriptor {
  bufferId: string;
  layout: SolverBinaryLayoutId;
  byteOffset: number;
  byteLength: number;
  rowCount: number;
  numericType: SolverNumericType;
  checksum?: string;
  storageTarget?: "caller-buffer" | "native-file";
  filePath?: string;
  buffer: ArrayBuffer;
}

export type SolverBufferMetadata = Omit<SolverBufferDescriptor, "buffer">;

export interface SolverWorkPacketHeader {
  schema: "solver-work-packet.v1";
  packetId: string;
  runId: string;
  modelId: string;
  precisionPath: Exclude<SolverPrecisionPath, "auto">;
  sourceBlock: SolverWorkPacketIndexRange;
  receiverBlock: SolverWorkPacketIndexRange;
  pathBlock: SolverWorkPacketIndexRange;
  timeRange: SolverRange;
  expectedOutputs: SolverBinaryLayoutId[];
  inputBuffers: SolverWorkPacketBufferRef[];
  mergeOrder: number;
  mergeKey: string;
  headerChecksum?: string;
}

export interface SolverWorkPacketHeaderResponse {
  schema: "solver-work-packet-header.v1";
  packet: SolverWorkPacketHeader;
  serializedHeader: string;
  headerChecksum: string;
  diagnostics: SolverDiagnosticRecord[];
  status: SolverStatusRecord;
}

export interface SolverWorkPacketIndexRange {
  enabled: boolean;
  start: number;
  end: number;
}

export interface SolverWorkPacketBufferRef {
  bufferId: string;
  layout: SolverBinaryLayoutId;
  numericType: SolverNumericType;
  byteOffset: number;
  byteLength: number;
  rowOffset: number;
  rowCount: number;
  checksum: string;
}

export interface SolverWorkPacketResultRef {
  packetId: string;
  mergeOrder: number;
  mergeKey: string;
  outputs: SolverWorkPacketBufferRef[];
}

export interface SolverWorkPacketResultOrderRequest {
  results: SolverWorkPacketResultRef[];
}

export interface SolverWorkPacketResultOrderResponse {
  schema: "solver-work-packet-result-order.v1";
  results: SolverWorkPacketResultRef[];
  status: SolverStatusRecord;
}

export interface SolverPathHistoryWorkPacketPlanRequest {
  streamId: string;
  runId: string;
  modelId: string;
  precisionPath: Exclude<SolverPrecisionPath, "auto">;
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

export interface SolverPathHistoryWorkPacketPlanResponse {
  schema: "solver-path-history-work-packet-plan.v1";
  streamId: string;
  runId: string;
  modelId: string;
  precisionPath: Exclude<SolverPrecisionPath, "auto">;
  sourceChunkCount: number;
  receiverChunkCount: number;
  pathIndexRowCount: number;
  pathIndexedChunkCount: number;
  sourcePathPrunedChunkCount: number;
  receiverPathPrunedChunkCount: number;
  chunkPairCount: number;
  packetCount: number;
  truncated: boolean;
  packets: SolverWorkPacketHeader[];
  status: SolverStatusRecord;
}

export interface SolverStreamDescriptor {
  streamId: string;
  manifestVersion: string;
  indexLayout: SolverBinaryLayoutId;
  availableRanges: SolverStreamRange[];
  storagePolicy: SolverStoragePolicy;
  metadata?: SolverPathHistoryStreamMetadata;
}

export type SolverBinaryLayoutId =
  | "frame_buffer.v1"
  | "path_segment.v1"
  | "assembly_state.v1"
  | "assembly_membership.v1"
  | "assembly_hierarchy.v1"
  | "assembly_events.v1"
  | "path_chunk.v1"
  | "root_ledger.v1"
  | "root_ledger_detail.v1"
  | "delayed_hit_events.v1"
  | "phase_at_hit.v1"
  | "spacetime_index.v1"
  | "emission_shell_candidate.v1"
  | "emission_shell_narrow_phase.v1"
  | "stream_index.v1"
  | "assembly_graph_index.v1";

export type SolverNumericType =
  | "f64"
  | "scaled_i64"
  | "interval_f64_pair"
  | "decimal128"
  | "mp_limb_block";

export type SolverStatusSeverity = "ok" | "info" | "warning" | "halt" | "error";

export type SolverStatusCode =
  | "ok"
  | "cancelled"
  | "baseline_within_tolerance"
  | "baseline_refined_result"
  | "baseline_model_boundary_difference"
  | "baseline_investigation_required_mismatch"
  | "precision_escalated"
  | "precision_failed"
  | "simulation_envelope_exceeded"
  | "insufficient_history_depth"
  | "insufficient_scale_resolution"
  | "time_resolution_insufficient"
  | "root_not_bracketed"
  | "root_unresolved"
  | "small_jacobian"
  | "transversality_floor_failed"
  | "ledger_rerun_required"
  | "stream_memory_pressure"
  | "stream_write_failed"
  | "stream_read_failed"
  | "unsupported_browser_storage"
  | "unsupported_wasm_threads"
  | "validation_replay_mismatch"
  | "app_contract_error"
  | "internal_solver_error";

export interface SolverStatusRecord {
  code: SolverStatusCode;
  severity: SolverStatusSeverity;
  message: string;
  runId?: string;
  requestId?: string;
  stage?: string;
  recoverable: boolean;
  details?: Record<string, unknown>;
}

export interface SolverInitResponse {
  apiVersion: string;
  solverVersion: string;
  capabilities: SolverCapabilities;
  status: SolverStatusRecord;
}

export interface SolverCapabilities {
  precisionPaths: SolverPrecisionPath[];
  outputLayouts: SolverBinaryLayoutId[];
  storage: SolverStorageCapability;
  threading: SolverThreadingCapability;
  appBridge: SolverAppBridgeCapability;
  numericSerialization: SolverNumericSerializationContract;
  errorBudgetPropagation: SolverErrorBudgetPropagationContract;
  validation: SolverValidationCapability;
  maxTransferBytes: number;
  wasmModuleFactory: boolean;
  abiInfo?: SolverAbiInfo;
}

export interface SolverAppBridgeCapability {
  schema: "solver-app-bridge-capabilities.v1";
  apiVersion: string;
  adapterVersion: string;
  appAdapters: SolverAppAdapterCapability[];
  denseDataTransport: ("array-buffer" | "stream-handle")[];
  workerModel: SolverBridgeWorkerModelCapability;
  storageFallbacks: SolverBridgeStorageFallbackCapability;
  streamQueries: SolverStreamQueryCapability;
  workPackets: SolverWorkPacketCapability;
}

export interface SolverAppAdapterCapability {
  appId: SolverAppId;
  runKinds: SolverRunKind[];
}

export interface SolverBridgeWorkerModelCapability {
  bridgeOwnsWasmLifecycle: boolean;
  appsRequireCppHandling: boolean;
  longRunningRunsOffUiThreadRequired: boolean;
  browserWorkerAvailable: boolean;
  wasmInternalThreadsAvailable: boolean;
  fallback: "single-solver-worker-or-batch";
}

export interface SolverBridgeStorageFallbackCapability {
  preferredDurableBrowserTarget: "opfs";
  durableBrowserTargetAvailable: boolean;
  transientTarget: "caller-buffer";
  unsupportedStorageStatusCode: "unsupported_browser_storage";
}

export interface SolverStreamQueryCapability {
  schema: "solver-stream-query-capabilities.v1";
  helpers: (
    | "createPathHistoryStreamF64"
    | "describeStream"
    | "readStreamRange"
    | "buildPathHistoryStreamSpaceTimeIndexF64"
    | "queryEmissionShellCandidatesF64"
    | "queryEmissionShellCandidatePacketF64"
    | "queryEmissionShellCandidatePacketsF64"
    | "refineEmissionShellCandidateRootsF64"
  )[];
  pathHistoryLayouts: Array<Extract<SolverBinaryLayoutId, "path_segment.v1">>;
  indexedFilters: ("pathKeys" | "chunkIndices" | "timeRange" | "frameRange" | "byteRange")[];
  broadPhaseQueries: SolverBroadPhaseQueryCapability[];
}

export interface SolverBroadPhaseQueryCapability {
  method:
    | "queryEmissionShellCandidatesF64"
    | "queryEmissionShellCandidatePacketF64"
    | "queryEmissionShellCandidatePacketsF64";
  responseSchema: "solver-emission-shell-candidates.v1";
  candidateKind: "broad_phase_possible";
  estimateMethod: "sampled_linear_segment_bisection.v1";
  narrowPhaseAuthorities: (
    | "solveCausalRootsF64"
    | "solveCausalRootsPrecisionF64"
    | "solveCausalRootsNormalizedF64"
    | "solveRootsAndHitsPrecisionF64"
    | "solveRootsAndHitsF64"
    | "refineEmissionShellCandidateRootsF64"
  )[];
}

export interface SolverWorkPacketCapability {
  schema: "solver-work-packet-capabilities.v1";
  headerSchema: "solver-work-packet.v1";
  helpers: (
    | "prepareWorkPacketHeader"
    | "orderWorkPacketResults"
    | "planPathHistoryWorkPackets"
    | "mergeEmissionShellCandidatePacketResponsesF64"
  )[];
  pathHistoryPlanFilters: (
    | "sourcePathKeys"
    | "receiverPathKeys"
    | "sourceChunkIndices"
    | "receiverChunkIndices"
    | "timeRange"
  )[];
  deterministicMergeOrder: ("mergeKey" | "mergeOrder" | "packetId")[];
  rowSizeValidation: boolean;
}

export interface SolverAbiInfo {
  abiMajor: number;
  abiMinor: number;
  abiPatch: number;
  rootRequestF64Bytes: number;
  rootRowF64Bytes: number;
  delayedHitRowF64Bytes: number;
  motionSampleRequestF64Bytes: number;
  motionFrameRowF64Bytes: number;
  phaseClockF64Bytes: number;
  phaseAtHitRowF64Bytes: number;
  boundsRowF64Bytes: number;
  spherePointRequestF64Bytes: number;
  spherePointRowF64Bytes: number;
  delayedPotentialRequestF64Bytes: number;
  delayedPotentialRowF64Bytes: number;
  circularSelfHitRequestF64Bytes: number;
  circularSelfHitRowF64Bytes: number;
  assemblyStateRowF64Bytes: number;
  assemblyMembershipRowF64Bytes: number;
  assemblyHierarchyRowF64Bytes: number;
  assemblyEventRowF64Bytes: number;
  pathHistoryRowF64Bytes: number;
  pathHistoryChunkRowBytes: number;
  storageLifecyclePolicyBytes: number;
  pathHistoryLifecycleDecisionRowBytes: number;
  spaceTimeIndexRowF64Bytes: number;
  emissionShellBroadPhaseOptionsF64Bytes: number;
  emissionShellCandidateRowF64Bytes: number;
  emissionShellBroadPhaseSummaryBytes: number;
  emissionShellNarrowPhaseRequestF64Bytes: number;
  emissionShellNarrowPhaseRowF64Bytes: number;
  rootLedgerDetailRowF64Bytes: number;
  errorBudgetF64Bytes: number;
  errorBudgetStageInputF64Bytes: number;
  errorBudgetStageRowF64Bytes: number;
  errorBudgetSummaryF64Bytes: number;
  precisionSolveOptionsBytes: number;
  precisionSolveSummaryF64Bytes: number;
}

export interface SolverNumericSerializationDescriptor {
  numericType: SolverNumericType;
  byteOrder: "little-endian";
  scalarSizeBytes: number;
  signedness: "signed" | "unsigned" | "not-applicable";
  scaleFactor: string;
  exponentLayout: string;
  limbOrder: string;
  intervalEndpointConvention: string;
  roundingMode: string;
  comparisonSemantics: string;
  textExport: string;
  appBufferSafe: boolean;
  authoritativeStorageSafe: boolean;
}

export interface SolverNumericSerializationContract {
  schema: "solver-numeric-serialization.v1";
  descriptors: SolverNumericSerializationDescriptor[];
}

export interface SolverErrorBudgetPropagationStageDescriptor {
  stage: SolverErrorBudgetStage;
  budgetField: keyof SolverErrorBudget;
  cumulative: boolean;
}

export interface SolverErrorBudgetPropagationContract {
  schema: "solver-error-budget-propagation.v1";
  stages: SolverErrorBudgetPropagationStageDescriptor[];
  authorityLevels: SolverValueAuthority[];
}

export interface SolverValidationCapability {
  invariantChecks: Array<"root_hit_f64">;
  transitionClassifiers: Array<"root_ledger_f64">;
  baselineClassifications: SolverBaselineComparisonResult["classification"][];
}

export interface SolverStoragePolicy {
  target: "worker-memory" | "opfs" | "native-file" | "caller-buffer";
  durable: boolean;
  maxBytes: number;
  basePath?: string;
  streamPath?: string;
  storePath?: string;
  indexPath?: string;
  manifestPath?: string;
}

export interface SolverStorageCapability {
  supportsOpfs: boolean;
  supportsNativeFile: boolean;
  supportsCallerBuffer: boolean;
  maxRecommendedBytes: number;
}

export interface SolverThreadingPolicy {
  mode: "single-thread" | "auto" | "fixed";
  maxThreads?: number;
  deterministic: boolean;
}

export interface SolverThreadingPlanRequest {
  policy: SolverThreadingPolicy;
  workload: SolverThreadingWorkload;
}

export interface SolverThreadingWorkload {
  stage: string;
  itemCount: number;
  minItemsPerWorker?: number;
  deterministicRequired?: boolean;
}

export interface SolverThreadingPlanResponse {
  schema: "solver-threading-plan.v1";
  stage: string;
  itemCount: number;
  minItemsPerWorker: number;
  requestedWorkerCount: number;
  activeWorkerCount: number;
  schedulingMode: "idle" | "sequential" | "native-thread-pool" | "wasm-thread-pool";
  backend: "single-thread" | "native-threads" | "wasm-threads";
  deterministicReduction: boolean;
  browserWorkerAvailable: boolean;
  wasmThreadsAvailable: boolean;
  nativeThreadsAvailable: boolean;
  fallbackReason?: "wasm_threads_unavailable" | null;
  speedupBaselineWorkerCount: number;
  statuses: SolverStatusRecord[];
  status: SolverStatusRecord;
}

export interface SolverThreadingCapability {
  nativeThreads: boolean;
  wasmThreads: boolean;
  browserWorker: boolean;
  crossOriginIsolationRequired: boolean;
}

export interface SolverCancelRequest {
  requestId?: string;
  runId?: string;
  reason?: string;
}

export interface SolverCloseRunRequest {
  runId: string;
  releaseStreams: boolean;
}

export interface SolverOpenStreamRequest {
  runId?: string;
  datasetId?: string;
  streamId?: string;
  manifestPath?: string;
  purpose: "playback" | "diagnostics" | "export" | "validation";
}

export interface SolverDescribeStreamRequest {
  streamId: string;
}

export interface SolverStreamDescription {
  schema: "solver-stream-description.v1";
  stream: SolverStreamDescriptor;
  buffers: SolverBufferMetadata[];
  index: SolverStreamIndexDescription;
  status: SolverStatusRecord;
}

export interface SolverStreamIndexDescription {
  schema: "solver-stream-index.v1";
  streamId: string;
  indexLayout: SolverBinaryLayoutId;
  chunkCount: number;
  sidecar?: SolverStreamIndexSidecar;
  pathIndexRows: SolverPathHistoryIndexMetadata[];
}

export interface SolverStreamIndexSidecar {
  schema: "solver-stream-index-sidecar.v1";
  indexLayout: "stream_index.v1";
  numericType: SolverNumericType;
  byteOrder: "little-endian";
  rowSizeBytes: number;
  rowCount: number;
  byteLength: number;
  filePath: string;
  checksum: string;
}

export interface SolverPathHistoryIndexMetadata {
  pathKey: number;
  chunkIndex: number;
  rowOffset: number;
  rowCount: number;
  timeRange: SolverRange;
  frameRange: SolverRange;
  byteRange: SolverRange;
}

export interface SolverStreamHandle {
  streamId: string;
  manifestVersion: string;
  readableLayouts: SolverBinaryLayoutId[];
  availableRanges: SolverStreamRange[];
}

export interface SolverReadStreamRangeRequest {
  streamId: string;
  pathIds?: string[];
  pathKeys?: number[];
  chunkIndices?: number[];
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  byteRange?: SolverRange;
  eventKinds?: string[];
  maxBytes?: number;
}

export interface SolverStreamRangeResponse {
  streamId: string;
  ranges: SolverStreamRange[];
  buffers: SolverBufferDescriptor[];
  diagnostics: SolverDiagnosticRecord[];
  status: SolverStatusRecord;
}

export interface SolverRange {
  start: number;
  end: number;
}

export interface SolverStreamRange {
  timeRange?: SolverRange;
  frameRange?: SolverRange;
  byteRange: SolverRange;
}

export interface SolverTimeWindow {
  start: number;
  end: number;
  stepHint?: number;
  units: "solver-time" | "seconds" | "cycles";
}

export interface SolverHistoryRef {
  pathId: string;
  role: "source" | "receiver" | "architrino" | "assembly" | "observer";
  source: "inlineSamples" | "streamRef" | "proceduralOrbit" | "appState";
  streamId?: string;
  layout?: SolverBinaryLayoutId;
  numericType?: SolverNumericType;
  parameters?: Record<string, number>;
}

export interface SolverPairSpec {
  receiverId: string;
  sourceId: string;
  includeSameSource: boolean;
  rootKinds: ("partner" | "same-source" | "tail" | "separator")[];
}

export interface AnimatorSolverConfig {
  appId: "animator";
  timeWindow: SolverTimeWindow;
  histories: SolverHistoryRef[];
  pairs: SolverPairSpec[];
  requestedGeometry: ("fieldShells" | "delayedHitConnectors" | "pathTrails")[];
}

export interface PhotonSolverConfig {
  appId: "photon";
  timeWindow: SolverTimeWindow;
  photonChannelSpeed: number;
  branchSignalSpeed: number;
  sourceHistories: SolverHistoryRef[];
  receiverHistory: SolverHistoryRef;
  pairs: SolverPairSpec[];
  phaseLedger: "disabled" | "source" | "source-and-receiver";
}

export interface IdealSwarmSolverConfig {
  appId: "ideal-swarm";
  timeWindow: SolverTimeWindow;
  histories: SolverHistoryRef[];
  pairs: SolverPairSpec[];
  requestedGeometry: ("flightTime" | "delayedPotential" | "circularSelfHitSpan")[];
}

export interface ValidationReplayConfig {
  appId: SolverAppId;
  baselineRunId?: string;
  baselineArtifactHash?: string;
  replayPrecisionPath: Exclude<SolverPrecisionPath, "auto">;
  compareLayouts: SolverBinaryLayoutId[];
  baselineResponse: SolverComparableResponse;
  candidateResponse: SolverComparableResponse;
  tolerance?: number;
  refinementTolerance?: number;
}

export interface SolverComparableResponse {
  roots?: SolverCausalRootF64[];
  hits?: SolverDelayedHitF64[];
  phaseRows?: SolverPhaseAtHitF64[];
  phaseSummary?: SolverPhaseAtHitSummaryF64;
  pathHistory?: SolverPathHistoryStreamSummary;
  geometry?: SolverSharedGeometryF64Response;
  buffers?: Omit<SolverBufferDescriptor, "buffer">[];
  status?: SolverStatusRecord;
}

export interface SolverBaselineDifference {
  kind: string;
  path: string;
  baseline?: unknown;
  candidate?: unknown;
  absoluteDifference?: number;
  baselineType?: string;
  candidateType?: string;
  baselineLength?: number;
  candidateLength?: number;
}

export interface SolverBaselineComparisonResult {
  classification:
    | "baseline_within_tolerance"
    | "baseline_refined_result"
    | "baseline_model_boundary_difference"
    | "baseline_investigation_required_mismatch";
  maxAbsoluteDifference: number;
  differences: SolverBaselineDifference[];
  status: SolverStatusRecord;
}

export interface SolverRunSummary {
  runId: string;
  claimLevel: SolverClaimLevel;
  precisionPath: SolverPrecisionPath;
  status: SolverStatusRecord;
  frameCount?: number;
  pathCount?: number;
  rootCount?: number;
  eventCount?: number;
  phaseRowCount?: number;
  pathRowCount?: number;
  chunkCount?: number;
  streamCount?: number;
}

export interface SolverDiagnosticRecord {
  code: string;
  severity: SolverStatusSeverity;
  message: string;
  stage?: string;
  details?: Record<string, unknown>;
}
