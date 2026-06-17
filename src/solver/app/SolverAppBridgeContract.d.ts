export type SolverAppId = "animator" | "photon" | "ideal-swarm";

export type SolverRunKind =
  | "motionSimulation"
  | "causalRoots"
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

export interface SolverClient {
  init(request: SolverInitRequest): Promise<SolverInitResponse>;
  capabilities(): Promise<SolverCapabilities>;
  admitSimulationEnvelope(request: SolverAdmissionRequest): Promise<SolverAdmissionResponse>;
  runSimulation(request: SolverRunRequest): Promise<SolverRunHandle>;
  diagnosePrecisionF64(request: SolverCausalRootsF64Request): Promise<SolverPrecisionDiagnosticF64Response>;
  solveCausalRootsF64(request: SolverCausalRootsF64Request): Promise<SolverCausalRootsF64Response>;
  solveCausalRootBatchF64(
    request: SolverCausalRootBatchF64Request
  ): Promise<SolverCausalRootBatchF64Response>;
  solveRootsAndHitsF64(request: SolverCausalRootsF64Request): Promise<SolverRootsAndHitsF64Response>;
  buildRootLedgerDetailF64(
    request: SolverRootLedgerDetailF64Request
  ): Promise<SolverRootLedgerDetailF64Response>;
  computePhaseAtHitF64(request: SolverPhaseAtHitF64Request): Promise<SolverPhaseAtHitF64Response>;
  computeSharedGeometryF64(request: SolverSharedGeometryF64Request): Promise<SolverSharedGeometryF64Response>;
  detectAssemblyMembershipEventsF64(
    request: SolverAssemblyMembershipEventsF64Request
  ): Promise<SolverAssemblyMembershipEventsF64Response>;
  buildSpaceTimeIndexF64(request: SolverBuildSpaceTimeIndexF64Request): Promise<SolverSpaceTimeIndexF64Response>;
  querySpaceTimeIndexF64(request: SolverQuerySpaceTimeIndexF64Request): Promise<SolverSpaceTimeIndexF64Response>;
  sampleLinearMotionF64(request: SolverLinearMotionSampleF64Request): Promise<SolverLinearMotionSampleF64Response>;
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

export interface SolverSharedGeometryF64Response {
  pathBounds: SolverPathBoundsF64[];
  spherePointIntersections: SolverSpherePointIntersectionF64[];
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

export interface SolverAssemblyMembershipEventsF64Request {
  memberships: SolverAssemblyMembershipF64[];
  maxEvents?: number;
}

export interface SolverAssemblyMembershipEventsF64Response {
  events: SolverAssemblyEventF64[];
  buffers: SolverBufferDescriptor[];
  status: SolverStatusRecord;
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

export interface SolverBuildSpaceTimeIndexF64Request {
  pathRows?: SolverPathHistoryRowF64[];
  assemblyStates?: SolverAssemblyStateF64[];
  options: SolverSpaceTimeIndexOptionsF64;
  maxRows?: number;
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
  statuses: SolverStatusRecord[];
  status: SolverStatusRecord;
}

export interface SolverCapabilityEnvelope {
  maxInteractiveEntities?: number;
  maxBatchEntities?: number;
  minMemoryBudgetBytes?: number;
  minStorageBudgetBytesForStreaming?: number;
  minimumPositiveTolerance?: number;
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

export type SolverRunConfig =
  | CausalRootsSolverConfig
  | MotionSimulationSolverConfig
  | AnimatorSolverConfig
  | PhotonSolverConfig
  | IdealSwarmSolverConfig
  | ValidationReplayConfig;

export interface CausalRootsSolverConfig {
  appId: SolverAppId;
  rootRequest: SolverCausalRootsF64Request;
}

export interface MotionSimulationSolverConfig {
  appId: SolverAppId;
  motionRequest: SolverLinearMotionSampleF64Request;
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
  summary: SolverRunSummary;
  buffers: SolverBufferDescriptor[];
  streams: SolverStreamDescriptor[];
  diagnostics: SolverDiagnosticRecord[];
  frames?: SolverMotionFrameF64[];
  roots?: SolverCausalRootF64[];
  hits?: SolverDelayedHitF64[];
  status: SolverStatusRecord;
}

export interface SolverBufferDescriptor {
  bufferId: string;
  layout: SolverBinaryLayoutId;
  byteOffset: number;
  byteLength: number;
  rowCount: number;
  numericType: SolverNumericType;
  buffer: ArrayBuffer;
}

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

export interface SolverStreamDescriptor {
  streamId: string;
  manifestVersion: string;
  indexLayout: SolverBinaryLayoutId;
  availableRanges: SolverStreamRange[];
  storagePolicy: SolverStoragePolicy;
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
  | "stream_index.v1";

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
  numericSerialization: SolverNumericSerializationContract;
  maxTransferBytes: number;
  abiInfo?: SolverAbiInfo;
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
  assemblyStateRowF64Bytes: number;
  assemblyMembershipRowF64Bytes: number;
  assemblyHierarchyRowF64Bytes: number;
  assemblyEventRowF64Bytes: number;
  pathHistoryRowF64Bytes: number;
  spaceTimeIndexRowF64Bytes: number;
  rootLedgerDetailRowF64Bytes: number;
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

export interface SolverStoragePolicy {
  target: "worker-memory" | "opfs" | "native-file" | "caller-buffer";
  durable: boolean;
  maxBytes: number;
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
  runId: string;
  datasetId?: string;
  streamId?: string;
  purpose: "playback" | "diagnostics" | "export" | "validation";
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
}

export interface SolverDiagnosticRecord {
  code: string;
  severity: SolverStatusSeverity;
  message: string;
  stage?: string;
  details?: Record<string, unknown>;
}
