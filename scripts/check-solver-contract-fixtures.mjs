#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const schemaPath = "src/contracts/solver-app-bridge/v1/schema.json";
const requestPath = "src/solver/fixtures/causal-roots-f64-smoke.request.json";
const batchResponsePath = "src/solver/fixtures/causal-root-batch-f64-smoke.response.json";
const responsePath = "src/solver/fixtures/roots-and-hits-f64-smoke.response.json";

const schema = readJson(schemaPath);
const request = readJson(requestPath);
const batchResponse = readJson(batchResponsePath);
const response = readJson(responsePath);
const initRequest = createInitRequestEnvelope();
const initResponse = createInitResponseEnvelope();
const capabilitiesRequest = createCapabilitiesRequestEnvelope();
const capabilitiesResponse = createCapabilitiesResponseEnvelope();
const threadingPlanRequest = createThreadingPlanRequestEnvelope();
const threadingPlanResponse = createThreadingPlanResponseEnvelope();
const admissionRequest = createAdmissionRequestEnvelope();
const admissionResponse = createAdmissionResponseEnvelope();
const causalRootsResponse = createCausalRootsResponseEnvelope();
const causalRootsNormalizedRequest = createCausalRootsNormalizedRequestEnvelope();
const causalRootsNormalizedResponse = createCausalRootsNormalizedResponseEnvelope();
const causalRootsPrecisionRequest = createCausalRootsPrecisionRequestEnvelope();
const causalRootsPrecisionResponse = createCausalRootsPrecisionResponseEnvelope();
const rootsAndHitsPrecisionRequest = createRootsAndHitsPrecisionRequestEnvelope();
const rootsAndHitsPrecisionResponse = createRootsAndHitsPrecisionResponseEnvelope();
const motionIntegrationRequest = createMotionIntegrationRequestEnvelope();
const motionIntegrationResponse = createMotionIntegrationResponseEnvelope();
const pathHistoryStreamRequest = createPathHistoryStreamRequestEnvelope();
const pathHistoryStreamResponse = createPathHistoryStreamResponseEnvelope();
const runSimulationRequest = createRunSimulationRequestEnvelope();
const runSimulationNormalizedRequest = createRunSimulationNormalizedRequestEnvelope();
const runSimulationResponse = createRunSimulationResponseEnvelope();
const describeRunRequest = createDescribeRunRequestEnvelope();
const describeRunResponse = createDescribeRunResponseEnvelope();
const cancelRunRequest = createCancelRunRequestEnvelope();
const cancelRunResponse = createCancelRunResponseEnvelope();
const closeRunRequest = createCloseRunRequestEnvelope();
const closeRunResponse = createCloseRunResponseEnvelope();
const describeStreamRequest = createDescribeStreamRequestEnvelope();
const describeStreamResponse = createDescribeStreamResponseEnvelope();
const openStreamRequest = createOpenStreamRequestEnvelope();
const openStreamResponse = createOpenStreamResponseEnvelope();
const readStreamRangeRequest = createReadStreamRangeRequestEnvelope();
const readStreamRangeResponse = createReadStreamRangeResponseEnvelope();
const emissionShellCandidateResponse = createEmissionShellCandidateResponseEnvelope();
const emissionShellRootRefinementRequest = createEmissionShellRootRefinementRequestEnvelope();
const emissionShellRootRefinementResponse = createEmissionShellRootRefinementResponseEnvelope();
const workerRequestMessage = createWorkerRequestMessage();
const workerResponseMessage = createWorkerResponseMessage();
const workerErrorMessage = createWorkerErrorMessage();

assert(schema.$id === "https://architrino.local/contracts/solver-app-bridge/v1/schema.json", "schema id mismatch");
assert(schema.$defs?.initRequest, "init request schema missing");
assert(schema.$defs?.solverAppWorkerMethod, "worker method schema missing");
assert(schema.$defs?.solverAppWorkerRequestMessage, "worker request message schema missing");
assert(schema.$defs?.solverAppWorkerResponseMessage, "worker response message schema missing");
assert(schema.$defs?.solverAppWorkerErrorMessage, "worker error message schema missing");
assert(schema.$defs?.initResponse, "init response schema missing");
assert(schema.$defs?.solverCapabilities, "solver capabilities schema missing");
assert(schema.$defs?.solverStoragePolicy, "solver storage policy schema missing");
assert(schema.$defs?.solverStorageCapability, "solver storage capability schema missing");
assert(schema.$defs?.solverThreadingCapability, "solver threading capability schema missing");
assert(schema.$defs?.appBridgeCapability, "app bridge capability schema missing");
assert(schema.$defs?.appAdapterCapability, "app adapter capability schema missing");
assert(schema.$defs?.streamQueryCapability, "stream query capability schema missing");
assert(schema.$defs?.workPacketCapability, "work packet capability schema missing");
assert(schema.$defs?.solverValidationCapability, "solver validation capability schema missing");
assert(schema.$defs?.solverAbiInfo, "solver ABI info schema missing");
assert(schema.$defs?.threadingPolicy, "threading policy schema missing");
assert(schema.$defs?.threadingWorkload, "threading workload schema missing");
assert(schema.$defs?.threadingPlanRequest, "threading plan request schema missing");
assert(schema.$defs?.threadingPlanResponse, "threading plan response schema missing");
assert(schema.$defs?.capabilityEnvelope, "capability envelope schema missing");
assert(schema.$defs?.admissionRequest, "admission request schema missing");
assert(schema.$defs?.admissionResponse, "admission response schema missing");
assert(schema.$defs?.causalRootsF64Request, "request schema missing");
assert(schema.$defs?.causalRootsF64Response, "causal roots response schema missing");
assert(schema.$defs?.causalRootsNormalizedF64Request, "normalized causal roots request schema missing");
assert(schema.$defs?.causalRootsNormalizedF64Response, "normalized causal roots response schema missing");
assert(schema.$defs?.normalizedCausalRootF64, "normalized causal root schema missing");
assert(schema.$defs?.absoluteDisplayCausalRootF64, "absolute-display causal root schema missing");
assert(schema.$defs?.causalRootsPrecisionF64Request, "precision causal roots request schema missing");
assert(schema.$defs?.causalRootsPrecisionF64Response, "precision causal roots response schema missing");
assert(schema.$defs?.rootsAndHitsPrecisionF64Response, "precision roots-and-hits response schema missing");
assert(schema.$defs?.precisionSolveSummaryF64, "precision solve summary schema missing");
assert(schema.$defs?.rootLedgerDetailF64Request, "root-ledger detail request schema missing");
assert(schema.$defs?.rootLedgerDetailF64Response, "root-ledger detail response schema missing");
assert(schema.$defs?.rootLedgerDetailF64, "root-ledger detail row schema missing");
assert(schema.$defs?.precisionDiagnosticF64Request, "precision diagnostic request schema missing");
assert(schema.$defs?.precisionDiagnosticF64Response, "precision diagnostic response schema missing");
assert(schema.$defs?.errorBudgetPropagationF64Request, "error budget propagation request schema missing");
assert(schema.$defs?.errorBudgetPropagationF64Response, "error budget propagation response schema missing");
assert(schema.$defs?.solverErrorBudget, "solver error budget schema missing");
assert(schema.$defs?.errorBudgetStageInput, "error budget stage input schema missing");
assert(schema.$defs?.rootHitInvariantF64Request, "root-hit invariant request schema missing");
assert(schema.$defs?.rootHitInvariantF64Response, "root-hit invariant response schema missing");
assert(schema.$defs?.rootHitInvariantOptions, "root-hit invariant options schema missing");
assert(schema.$defs?.rootLedgerTransitionF64Request, "root-ledger transition request schema missing");
assert(schema.$defs?.rootLedgerTransitionF64Response, "root-ledger transition response schema missing");
assert(schema.$defs?.rootLedgerTransitionF64, "root-ledger transition row schema missing");
assert(schema.$defs?.rootLedgerTransitionKind, "root-ledger transition kind schema missing");
assert(schema.$defs?.precisionPathId, "precision path schema missing");
assert(schema.$defs?.numericTypeId, "numeric type schema missing");
assert(schema.$defs?.numericSerializationDescriptor, "numeric serialization descriptor schema missing");
assert(schema.$defs?.numericSerializationContract, "numeric serialization contract schema missing");
assert(schema.$defs?.solverAppId, "solver app id schema missing");
assert(schema.$defs?.solverRunKind, "solver run kind schema missing");
assert(schema.$defs?.solverClaimLevel, "solver claim level schema missing");
assert(schema.$defs?.solverModelContract, "solver model contract schema missing");
assert(schema.$defs?.solverSimulationEnvelope, "solver simulation envelope schema missing");
assert(schema.$defs?.solverOutputRequest, "solver output request schema missing");
assert(schema.$defs?.solverOutputKind, "solver output kind schema missing");
assert(schema.$defs?.causalRootsRunConfig, "causal roots run config schema missing");
assert(schema.$defs?.phaseDiagnosticsRunConfig, "phase diagnostics run config schema missing");
assert(schema.$defs?.pathHistoryRunConfig, "path-history run config schema missing");
assert(schema.$defs?.delayedHitsRunConfig, "delayed hits run config schema missing");
assert(schema.$defs?.sharedGeometryRunConfig, "shared geometry run config schema missing");
assert(schema.$defs?.validationReplayRunConfig, "validation replay run config schema missing");
assert(schema.$defs?.appPlaybackRunConfig, "app playback run config schema missing");
assert(schema.$defs?.comparableSolverResponse, "comparable solver response schema missing");
assert(schema.$defs?.baselineComparisonResult, "baseline comparison result schema missing");
assert(schema.$defs?.motionSimulationRunConfig, "motion simulation run config schema missing");
assert(schema.$defs?.solverRunConfig, "solver run config schema missing");
assert(schema.$defs?.solverRunRequest, "solver run request schema missing");
assert(schema.$defs?.solverRunHandle, "solver run handle schema missing");
assert(schema.$defs?.solverRunResponse, "solver run response schema missing");
assert(schema.$defs?.solverRunSummary, "solver run summary schema missing");
assert(schema.$defs?.describeRunRequest, "describe run request schema missing");
assert(schema.$defs?.solverRunDescription, "solver run description schema missing");
assert(schema.$defs?.cancelRunRequest, "cancel run request schema missing");
assert(schema.$defs?.closeRunRequest, "close run request schema missing");
assert(schema.$defs?.streamIndexSidecar, "stream index sidecar schema missing");
assert(schema.$defs?.runManifest, "run manifest schema missing");
assert(schema.$defs?.runManifestBuffer, "run manifest buffer schema missing");
assert(schema.$defs?.runManifestStream, "run manifest stream schema missing");
assert(schema.$defs?.runValidationArtifacts, "run validation artifacts schema missing");
assert(schema.$defs?.runArtifactHashes, "run artifact hashes schema missing");
assert(schema.$defs?.admissionStressSummary, "admission stress summary schema missing");
assert(schema.$defs?.runManifestAdmission, "run manifest admission schema missing");
assert(schema.$defs?.runManifestProvenance, "run manifest provenance schema missing");
assert(schema.$defs?.errorBudgetStageId, "error budget stage schema missing");
assert(schema.$defs?.valueAuthorityId, "value authority schema missing");
assert(schema.$defs?.errorBudgetStageReport, "error budget stage report schema missing");
assert(schema.$defs?.errorBudgetPropagationReport, "error budget propagation report schema missing");
assert(schema.$defs?.errorBudgetPropagationContract, "error budget propagation contract schema missing");
assert(schema.$defs?.magnitudeSummary, "magnitude summary schema missing");
assert(schema.$defs?.causalRootBatchF64Request, "batch request schema missing");
assert(schema.$defs?.causalRootBatchF64Response, "batch response schema missing");
assert(schema.$defs?.linearMotionSampleF64Request, "motion sample request schema missing");
assert(schema.$defs?.linearMotionSampleF64Response, "motion sample response schema missing");
assert(schema.$defs?.motionIntegrationF64Request, "motion integration request schema missing");
assert(schema.$defs?.motionIntegrationF64Response, "motion integration response schema missing");
assert(schema.$defs?.phaseAtHitF64Request, "phase-at-hit request schema missing");
assert(schema.$defs?.phaseAtHitF64Response, "phase-at-hit response schema missing");
assert(schema.$defs?.phaseAtHitSummaryF64Request, "phase-at-hit summary request schema missing");
assert(schema.$defs?.phaseAtHitSummaryF64Response, "phase-at-hit summary response schema missing");
assert(schema.$defs?.phaseAtHitSummaryF64, "phase-at-hit summary schema missing");
assert(schema.$defs?.phaseAtHitStatusCount, "phase-at-hit status count schema missing");
assert(schema.$defs?.sharedGeometryF64Request, "shared geometry request schema missing");
assert(schema.$defs?.sharedGeometryF64Response, "shared geometry response schema missing");
assert(schema.$defs?.delayedPotentialF64Request, "delayed potential request schema missing");
assert(schema.$defs?.delayedPotentialF64, "delayed potential row schema missing");
assert(schema.$defs?.circularSelfHitSpanF64Request, "circular self-hit span request schema missing");
assert(schema.$defs?.circularSelfHitSpanF64, "circular self-hit span row schema missing");
assert(schema.$defs?.assemblyMembershipEventsF64Request, "assembly membership events request schema missing");
assert(schema.$defs?.assemblyMembershipEventsF64Response, "assembly membership events response schema missing");
assert(schema.$defs?.assemblyGraphDatasetF64Request, "assembly graph dataset request schema missing");
assert(schema.$defs?.assemblyGraphDatasetF64Response, "assembly graph dataset response schema missing");
assert(schema.$defs?.assemblyGraphDatasetF64Summary, "assembly graph dataset summary schema missing");
assert(schema.$defs?.assemblyGraphStoreF64Request, "assembly graph store request schema missing");
assert(schema.$defs?.assemblyGraphStoreF64Response, "assembly graph store response schema missing");
assert(schema.$defs?.describeAssemblyGraphStoreF64Request, "assembly graph store describe request schema missing");
assert(
  schema.$defs?.assemblyGraphStoreDescriptionF64Response,
  "assembly graph store description response schema missing"
);
assert(schema.$defs?.assemblyGraphStoreReadF64Request, "assembly graph store read request schema missing");
assert(schema.$defs?.assemblyGraphStoreReadF64Response, "assembly graph store read response schema missing");
assert(schema.$defs?.assemblyGraphStoreManifest, "assembly graph store manifest schema missing");
assert(schema.$defs?.assemblyGraphStoreDataset, "assembly graph store dataset schema missing");
assert(schema.$defs?.assemblyGraphStoreIndex, "assembly graph store index schema missing");
assert(schema.$defs?.assemblyGraphStoreIndexSummary, "assembly graph store index summary schema missing");
assert(schema.$defs?.assemblyGraphStoreIndexRow, "assembly graph store index row schema missing");
assert(schema.$defs?.assemblyGraphIndexKeyKind, "assembly graph index key kind schema missing");
assert(schema.$defs?.assemblyGraphStoreIndexSidecar, "assembly graph store index sidecar schema missing");
assert(schema.$defs?.assemblyGraphLayoutId, "assembly graph layout id schema missing");
assert(schema.$defs?.assemblyMembershipF64, "assembly membership row schema missing");
assert(schema.$defs?.assemblyHierarchyF64, "assembly hierarchy row schema missing");
assert(schema.$defs?.assemblyEventF64, "assembly event row schema missing");
assert(schema.$defs?.buildSpaceTimeIndexF64Request, "space-time index build request schema missing");
assert(
  schema.$defs?.buildPathHistoryStreamSpaceTimeIndexF64Request,
  "stream-backed space-time index build request schema missing"
);
assert(schema.$defs?.querySpaceTimeIndexF64Request, "space-time index query request schema missing");
assert(schema.$defs?.spaceTimeIndexF64Response, "space-time index response schema missing");
assert(schema.$defs?.pathHistoryRowF64, "path-history row schema missing");
assert(schema.$defs?.pathHistoryStreamF64Request, "path-history stream request schema missing");
assert(schema.$defs?.pathHistoryStreamF64Response, "path-history stream response schema missing");
assert(schema.$defs?.pathHistoryStreamSummary, "path-history stream summary schema missing");
assert(schema.$defs?.pathHistoryStreamMetadata, "path-history stream metadata schema missing");
assert(schema.$defs?.describeStreamRequest, "describe stream request schema missing");
assert(schema.$defs?.streamDescription, "stream description schema missing");
assert(schema.$defs?.streamIndexDescription, "stream index description schema missing");
assert(schema.$defs?.pathHistoryIndexMetadata, "path-history index metadata schema missing");
assert(schema.$defs?.streamOpenPurpose, "stream open purpose schema missing");
assert(schema.$defs?.openStreamRequest, "open stream request schema missing");
assert(schema.$defs?.openStreamResponse, "open stream response schema missing");
assert(schema.$defs?.readStreamRangeRequest, "read stream range request schema missing");
assert(schema.$defs?.readStreamRangeResponse, "read stream range response schema missing");
assert(schema.$defs?.pathHistoryStorageLifecycleRequest, "path-history lifecycle request schema missing");
assert(schema.$defs?.pathHistoryStorageLifecycleResponse, "path-history lifecycle response schema missing");
assert(schema.$defs?.pathHistoryChunkMetadata, "path-history chunk metadata schema missing");
assert(schema.$defs?.pathHistoryLifecycleDecision, "path-history lifecycle decision schema missing");
assert(schema.$defs?.assemblyStateF64, "assembly state row schema missing");
assert(schema.$defs?.spaceTimeIndexRowF64, "space-time index row schema missing");
assert(schema.$defs?.workPacketHeader, "work packet header schema missing");
assert(schema.$defs?.workPacketHeaderResponse, "work packet header response schema missing");
assert(schema.$defs?.workPacketBufferRef, "work packet buffer ref schema missing");
assert(schema.$defs?.workPacketResultRef, "work packet result ref schema missing");
assert(schema.$defs?.workPacketResultOrderRequest, "work packet result order request schema missing");
assert(schema.$defs?.workPacketResultOrderResponse, "work packet result order response schema missing");
assert(schema.$defs?.pathHistoryWorkPacketPlanRequest, "path-history work packet plan request schema missing");
assert(schema.$defs?.pathHistoryWorkPacketPlanResponse, "path-history work packet plan response schema missing");
assert(schema.$defs?.emissionShellCandidateF64Request, "emission-shell candidate request schema missing");
assert(
  schema.$defs?.emissionShellCandidatePacketF64Request,
  "emission-shell candidate packet request schema missing"
);
assert(
  schema.$defs?.emissionShellCandidatePacketsF64Request,
  "emission-shell candidate packets request schema missing"
);
assert(
  schema.$defs?.emissionShellCandidatePacketMergeF64Request,
  "emission-shell candidate packet merge request schema missing"
);
assert(
  schema.$defs?.emissionShellCandidateF64ResponseEnvelope,
  "emission-shell candidate response envelope schema missing"
);
assert(schema.$defs?.emissionShellCandidateF64Response, "emission-shell candidate response schema missing");
assert(
  schema.$defs?.emissionShellRootRefinementF64Request,
  "emission-shell root refinement request schema missing"
);
assert(
  schema.$defs?.emissionShellRootRefinementF64Response,
  "emission-shell root refinement response schema missing"
);
assert(
  schema.$defs?.emissionShellRootRefinementItemF64,
  "emission-shell root refinement item schema missing"
);
assert(
  schema.$defs.emissionShellCandidateF64Response.properties.packetResult.$ref === "#/$defs/workPacketResultRef",
  "emission-shell packet result response schema mismatch"
);
assert(
  schema.$defs.emissionShellCandidateF64Response.properties.packetResults.items.$ref ===
    "#/$defs/workPacketResultRef",
  "emission-shell packet results response schema mismatch"
);
assert(schema.$defs?.emissionShellCandidateF64, "emission-shell candidate row schema missing");
assert(schema.$defs?.emissionShellScanSummary, "emission-shell scan summary schema missing");
assert(schema.$defs?.emissionShellFalsePositiveEstimate, "emission-shell false-positive estimate schema missing");
assert(schema.$defs?.emissionShellNarrowPhaseEstimate, "emission-shell narrow-phase estimate schema missing");
assert(schema.$defs?.rootsAndHitsF64Response, "response schema missing");
assert(schema.$defs?.rootsAndHitsPrecisionF64RequestEnvelope, "precision roots-and-hits request envelope missing");
assert(schema.$defs?.rootsAndHitsPrecisionF64ResponseEnvelope, "precision roots-and-hits response envelope missing");
assert(schema.$defs?.bufferDescriptor, "buffer descriptor schema missing");
assert(schema.$defs?.streamDescriptor, "stream descriptor schema missing");
assertCoreBinaryLayouts([
  "frame_buffer.v1",
  "path_segment.v1",
  "assembly_state.v1",
  "assembly_membership.v1",
  "assembly_hierarchy.v1",
  "assembly_events.v1",
  "path_chunk.v1",
  "root_ledger.v1",
  "root_ledger_detail.v1",
  "delayed_hit_events.v1",
  "phase_at_hit.v1",
  "spacetime_index.v1",
  "emission_shell_candidate.v1",
  "emission_shell_narrow_phase.v1",
  "stream_index.v1",
  "assembly_graph_index.v1",
]);
assertEnumValues("solverRunKind", [
  "motionSimulation",
  "pathHistory",
  "causalRoots",
  "phaseDiagnostics",
  "delayedHits",
  "sharedGeometry",
  "appPlayback",
  "validationReplay",
]);
assertNumericTypes(["f64", "scaled_i64", "interval_f64_pair", "decimal128", "mp_limb_block"]);
assertErrorBudgetStages([
  "root_isolation",
  "delayed_hit",
  "motion_integration",
  "stream_encoding",
  "stream_readback",
  "projection",
  "app_buffer",
]);
assertValueAuthorities(["authoritative", "approximate", "display-only", "rejected"]);
assertWorkerMethods([
  "init",
  "capabilities",
  "runSimulation",
  "solveCausalRootsPrecisionF64",
  "solveRootsAndHitsPrecisionF64",
  "solveCausalRootsNormalizedF64",
  "buildAssemblyGraphDatasetF64",
  "createAssemblyGraphStoreF64",
  "describeAssemblyGraphStoreF64",
  "readAssemblyGraphStoreRangeF64",
  "buildPathHistoryStreamSpaceTimeIndexF64",
  "integrateConstantAccelerationMotionF64",
  "createPathHistoryStreamF64",
  "queryEmissionShellCandidatePacketsF64",
  "refineEmissionShellCandidateRootsF64",
  "readStreamRange",
  "cancelRun",
  "dispose",
]);

validateWorkerRequestMessage(workerRequestMessage);
validateWorkerResponseMessage(workerResponseMessage);
validateWorkerErrorMessage(workerErrorMessage);
validateRequestEnvelope(request);
validateInitRequestEnvelope(initRequest);
validateInitResponseEnvelope(initResponse);
validateCapabilitiesRequestEnvelope(capabilitiesRequest);
validateCapabilitiesResponseEnvelope(capabilitiesResponse);
validateThreadingPlanRequestEnvelope(threadingPlanRequest);
validateThreadingPlanResponseEnvelope(threadingPlanResponse);
validateAdmissionRequestEnvelope(admissionRequest);
validateAdmissionResponseEnvelope(admissionResponse);
validateCausalRootsResponseEnvelope(causalRootsResponse);
validateCausalRootsNormalizedRequestEnvelope(causalRootsNormalizedRequest);
validateCausalRootsNormalizedResponseEnvelope(causalRootsNormalizedResponse);
validateCausalRootsPrecisionRequestEnvelope(causalRootsPrecisionRequest);
validateCausalRootsPrecisionResponseEnvelope(causalRootsPrecisionResponse);
validateRootsAndHitsPrecisionRequestEnvelope(rootsAndHitsPrecisionRequest);
validateRootsAndHitsPrecisionResponseEnvelope(rootsAndHitsPrecisionResponse);
validateMotionIntegrationRequestEnvelope(motionIntegrationRequest);
validateMotionIntegrationResponseEnvelope(motionIntegrationResponse);
validateBatchResponseEnvelope(batchResponse);
validateResponseEnvelope(response);
validateRunSimulationRequestEnvelope(runSimulationRequest);
validateRunSimulationNormalizedRequestEnvelope(runSimulationNormalizedRequest);
validateRunSimulationResponseEnvelope(runSimulationResponse);
validateDescribeRunRequestEnvelope(describeRunRequest);
validateDescribeRunResponseEnvelope(describeRunResponse);
validateCancelRunRequestEnvelope(cancelRunRequest);
validateCancelRunResponseEnvelope(cancelRunResponse);
validateCloseRunRequestEnvelope(closeRunRequest);
validateCloseRunResponseEnvelope(closeRunResponse);
validatePathHistoryStreamRequestEnvelope(pathHistoryStreamRequest);
validatePathHistoryStreamResponseEnvelope(pathHistoryStreamResponse);
validateDescribeStreamRequestEnvelope(describeStreamRequest);
validateDescribeStreamResponseEnvelope(describeStreamResponse);
validateOpenStreamRequestEnvelope(openStreamRequest);
validateOpenStreamResponseEnvelope(openStreamResponse);
validateReadStreamRangeRequestEnvelope(readStreamRangeRequest);
validateReadStreamRangeResponseEnvelope(readStreamRangeResponse);
validateEmissionShellCandidateResponseEnvelope(emissionShellCandidateResponse);
validateEmissionShellRootRefinementRequestEnvelope(emissionShellRootRefinementRequest);
validateEmissionShellRootRefinementResponseEnvelope(emissionShellRootRefinementResponse);

console.log("solver contract fixtures check passed.");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function validateRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "request schema tag mismatch");
  assert(value.kind === "causal-roots-f64-request", "request kind mismatch");
  assertNonemptyString(value.requestId, "request id");
  const requestValue = value.request;
  assertSegment(requestValue.source, "source");
  assertSegment(requestValue.receiver, "receiver");
  assertPositiveFinite(requestValue.signalSpeed, "signal speed");
  assertFinite(requestValue.hitTime, "hit time");
  assertPositiveFinite(requestValue.rootTolerance, "root tolerance");
  assertPositiveInteger(requestValue.maxIterations, "max iterations");
  assertPositiveInteger(requestValue.scanSubdivisions, "scan subdivisions");
  assertPositiveInteger(requestValue.maxRoots, "max roots");
  assertPositiveInteger(requestValue.maxHits, "max hits");
}

function validateWorkerRequestMessage(value) {
  assert(value.schema === "solver-app-worker/v1", "worker request schema tag mismatch");
  assert(value.type === "request", "worker request type mismatch");
  assertNonemptyString(value.requestId, "worker request id");
  assert(value.method === "runSimulation", "worker request method mismatch");
  assert(value.request.runId === "run-contract", "worker request payload mismatch");
}

function validateWorkerResponseMessage(value) {
  assert(value.schema === "solver-app-worker/v1", "worker response schema tag mismatch");
  assert(value.type === "response", "worker response type mismatch");
  assertNonemptyString(value.requestId, "worker response id");
  assert(value.method === "capabilities", "worker response method mismatch");
  assertCapabilities(value.response, "worker response capabilities");
}

function validateWorkerErrorMessage(value) {
  assert(value.schema === "solver-app-worker/v1", "worker error schema tag mismatch");
  assert(value.type === "error", "worker error type mismatch");
  assertNonemptyString(value.requestId, "worker error id");
  assert(value.method === "missingMethod", "worker error method mismatch");
  assert(value.status.code === "app_contract_error", "worker error status code mismatch");
  assert(value.status.severity === "error", "worker error status severity mismatch");
}

function validateCausalRootsResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "causal roots response schema tag mismatch");
  assert(value.kind === "causal-roots-f64-response", "causal roots response kind mismatch");
  assertNonemptyString(value.requestId, "causal roots response request id");
  const responseValue = value.response;
  assert(responseValue.roots.length === 1, "causal roots response root count mismatch");
  assertClose(responseValue.roots[0].emissionTime, 0, "causal roots response emission time");
  assertClose(responseValue.roots[0].distance, 10, "causal roots response distance");
  assert(responseValue.status.code === "ok", "causal roots response status mismatch");
}

function validateCausalRootsNormalizedRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "normalized causal roots request schema tag mismatch");
  assert(value.kind === "causal-roots-normalized-f64-request", "normalized causal roots request kind mismatch");
  assertNonemptyString(value.requestId, "normalized causal roots request id");
  const requestValue = value.request;
  assertClose(requestValue.coordinateOrigin.x, 1e18, "normalized coordinate origin x");
  assert(requestValue.localRequest.source.positionAtStart.x === 0, "normalized source local x mismatch");
  assert(requestValue.localRequest.receiver.positionAtStart.x === 1, "normalized receiver local x mismatch");
  assert(requestValue.restoreAbsolutePoints === true, "normalized restore absolute flag mismatch");
}

function validateCausalRootsNormalizedResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "normalized causal roots response schema tag mismatch");
  assert(value.kind === "causal-roots-normalized-f64-response", "normalized causal roots response kind mismatch");
  assertNonemptyString(value.requestId, "normalized causal roots response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-causal-roots-normalized-f64.v1", "normalized response schema mismatch");
  assert(responseValue.coordinateFrame === "origin-normalized", "normalized coordinate frame mismatch");
  assertClose(responseValue.coordinateOrigin.x, 1e18, "normalized response origin x");
  assert(responseValue.roots.length === 1, "normalized response root count mismatch");
  assert(responseValue.roots[0].coordinateFrame === "origin-normalized", "normalized root frame mismatch");
  assertClose(responseValue.roots[0].distance, 1, "normalized root distance");
  assert(responseValue.absoluteRoots.length === 1, "absolute-display root count mismatch");
  assert(responseValue.absoluteRoots[0].coordinateFrame === "absolute-display", "absolute-display frame mismatch");
  assert(responseValue.absoluteRoots[0].absolutePointAuthority === "display-only", "absolute-display authority mismatch");
  assertClose(responseValue.absoluteRoots[0].localReceiverPoint.x, 1, "absolute-display local receiver x");
  assert(responseValue.status.code === "ok", "normalized causal roots response status mismatch");
}

function validateCausalRootsPrecisionRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "precision causal roots request schema tag mismatch");
  assert(value.kind === "causal-roots-precision-f64-request", "precision causal roots request kind mismatch");
  assertNonemptyString(value.requestId, "precision causal roots request id");
  const requestValue = value.request;
  assert(requestValue.rootRequest.hitTime === request.request.hitTime, "precision root request hit time mismatch");
  assert(requestValue.requestedPrecisionPath === "scaled_f64_strict", "precision requested path mismatch");
  assert(requestValue.claimLevel === "exported-dataset", "precision claim level mismatch");
  assert(requestValue.allowEscalation === true, "precision allow escalation mismatch");
  assert(requestValue.runValidationReplay === true, "precision replay flag mismatch");
  assert(requestValue.maxRoots === 4, "precision max roots mismatch");
}

function validateCausalRootsPrecisionResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "precision causal roots response schema tag mismatch");
  assert(value.kind === "causal-roots-precision-f64-response", "precision causal roots response kind mismatch");
  assertNonemptyString(value.requestId, "precision causal roots response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-causal-roots-precision-f64.v1", "precision response schema mismatch");
  assert(responseValue.roots.length === 1, "precision response root count mismatch");
  assert(responseValue.precision.selectedPrecisionPath === "extended_precision", "precision selected path mismatch");
  assert(responseValue.precision.selectedNumericType === "decimal128", "precision numeric type mismatch");
  assert(responseValue.precision.escalated === true, "precision escalation mismatch");
  assert(responseValue.precision.validationReplayRun === true, "precision replay run mismatch");
  assert(responseValue.precision.validationReplayMatched === true, "precision replay matched mismatch");
  assert(responseValue.buffers[0].layout === "root_ledger.v1", "precision buffer layout mismatch");
  assert(responseValue.status.code === "insufficient_scale_resolution", "precision response status mismatch");
}

function validateRootsAndHitsPrecisionRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "precision roots-and-hits request schema tag mismatch");
  assert(value.kind === "roots-and-hits-precision-f64-request", "precision roots-and-hits request kind mismatch");
  assertNonemptyString(value.requestId, "precision roots-and-hits request id");
  const requestValue = value.request;
  assert(requestValue.rootRequest.hitTime === request.request.hitTime, "precision roots-and-hits hit time mismatch");
  assert(requestValue.requestedPrecisionPath === "scaled_f64_strict", "precision roots-and-hits path mismatch");
  assert(requestValue.claimLevel === "exported-dataset", "precision roots-and-hits claim level mismatch");
  assert(requestValue.allowEscalation === true, "precision roots-and-hits escalation mismatch");
  assert(requestValue.runValidationReplay === true, "precision roots-and-hits replay mismatch");
  assert(requestValue.maxRoots === 4, "precision roots-and-hits max roots mismatch");
  assert(requestValue.maxHits === 4, "precision roots-and-hits max hits mismatch");
}

function validateRootsAndHitsPrecisionResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "precision roots-and-hits response schema tag mismatch");
  assert(value.kind === "roots-and-hits-precision-f64-response", "precision roots-and-hits response kind mismatch");
  assertNonemptyString(value.requestId, "precision roots-and-hits response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-roots-and-hits-precision-f64.v1", "precision roots-and-hits schema mismatch");
  assert(responseValue.roots.length === 1, "precision roots-and-hits root count mismatch");
  assert(responseValue.hits.length === 1, "precision roots-and-hits hit count mismatch");
  assert(responseValue.rootLedgerDetails.length >= 1, "precision roots-and-hits detail rows mismatch");
  assert(responseValue.rootLedgerDetails[0].entryKind === 1, "precision roots-and-hits detail entry mismatch");
  assert(responseValue.precision.selectedPrecisionPath === "extended_precision", "precision roots-and-hits path mismatch");
  assert(responseValue.precision.selectedNumericType === "decimal128", "precision roots-and-hits numeric type mismatch");
  assert(responseValue.buffers[0].layout === "root_ledger.v1", "precision roots-and-hits root buffer mismatch");
  assert(responseValue.buffers[1].layout === "delayed_hit_events.v1", "precision roots-and-hits hit buffer mismatch");
  assert(responseValue.buffers[2].layout === "root_ledger_detail.v1", "precision roots-and-hits detail buffer mismatch");
  assert(responseValue.streams[0].indexLayout === "stream_index.v1", "precision roots-and-hits stream mismatch");
  assert(responseValue.status.code === "insufficient_scale_resolution", "precision roots-and-hits status mismatch");
}

function validateInitRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "init request schema tag mismatch");
  assert(value.kind === "init-request", "init request kind mismatch");
  assertNonemptyString(value.requestId, "init request id");
  assert(value.request.appId === "animator", "init app id mismatch");
  assert(value.request.apiVersion === "solver-app-bridge.v1", "init api version mismatch");
  assert(value.request.storagePolicy.target === "caller-buffer", "init storage target mismatch");
  assert(value.request.threadingPolicy.mode === "single-thread", "init threading mode mismatch");
}

function validateInitResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "init response schema tag mismatch");
  assert(value.kind === "init-response", "init response kind mismatch");
  assertNonemptyString(value.requestId, "init response request id");
  assert(value.response.apiVersion === "solver-app-bridge.v1", "init response api version mismatch");
  assert(value.response.solverVersion === "0.1.0", "init response solver version mismatch");
  assert(value.response.status.code === "ok", "init response status mismatch");
  assertCapabilities(value.response.capabilities, "init capabilities");
}

function validateCapabilitiesRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "capabilities request schema tag mismatch");
  assert(value.kind === "capabilities-request", "capabilities request kind mismatch");
  assertNonemptyString(value.requestId, "capabilities request id");
}

function validateCapabilitiesResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "capabilities response schema tag mismatch");
  assert(value.kind === "capabilities-response", "capabilities response kind mismatch");
  assertNonemptyString(value.requestId, "capabilities response request id");
  assertCapabilities(value.response, "capabilities response");
}

function validateThreadingPlanRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "threading plan request schema tag mismatch");
  assert(value.kind === "threading-plan-request", "threading plan request kind mismatch");
  assertNonemptyString(value.requestId, "threading plan request id");
  assert(value.request.policy.mode === "fixed", "threading plan mode mismatch");
  assert(value.request.policy.maxThreads === 4, "threading plan max threads mismatch");
  assert(value.request.workload.itemCount === 16, "threading plan item count mismatch");
}

function validateThreadingPlanResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "threading plan response schema tag mismatch");
  assert(value.kind === "threading-plan-response", "threading plan response kind mismatch");
  assertNonemptyString(value.requestId, "threading plan response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-threading-plan.v1", "threading plan schema mismatch");
  assert(responseValue.requestedWorkerCount === 4, "threading plan requested workers mismatch");
  assert(responseValue.activeWorkerCount === 1, "threading plan active workers mismatch");
  assert(responseValue.fallbackReason === "wasm_threads_unavailable", "threading plan fallback mismatch");
  assert(responseValue.status.code === "unsupported_wasm_threads", "threading plan status mismatch");
}

function validateAdmissionRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "admission request schema tag mismatch");
  assert(value.kind === "admission-request", "admission request kind mismatch");
  assertNonemptyString(value.requestId, "admission request id");
  assert(value.request.model.modelId === "aaa.central-solver", "admission model mismatch");
  assert(value.request.errorBudget.globalTolerance === 1e-13, "admission error budget mismatch");
  assert(value.request.envelope.entityCount === 16, "admission entity count mismatch");
}

function validateAdmissionResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "admission response schema tag mismatch");
  assert(value.kind === "admission-response", "admission response kind mismatch");
  assertNonemptyString(value.requestId, "admission response request id");
  assert(value.response.decision === "escalate_precision", "admission decision mismatch");
  assert(value.response.selectedPrecisionPath === "extended_precision", "admission precision mismatch");
  assert(value.response.admitted === true, "admission admitted mismatch");
  assert(value.response.stressSummary.dominantStress === "precision", "admission dominant stress mismatch");
  assert(value.response.status.code === "precision_escalated", "admission status mismatch");
}

function assertCapabilities(value, label) {
  assert(value.precisionPaths.includes("extended_precision"), `${label} precision path mismatch`);
  assert(value.outputLayouts.includes("path_segment.v1"), `${label} output layouts mismatch`);
  assert(value.storage.supportsCallerBuffer === true, `${label} caller-buffer storage mismatch`);
  assert(value.threading.crossOriginIsolationRequired === true, `${label} threading isolation mismatch`);
  assert(value.appBridge.schema === "solver-app-bridge-capabilities.v1", `${label} app bridge schema mismatch`);
  assert(value.appBridge.denseDataTransport.includes("stream-handle"), `${label} dense transport mismatch`);
  assert(value.appBridge.workerModel.appsRequireCppHandling === false, `${label} worker model mismatch`);
  assert(value.appBridge.streamQueries.helpers.includes("readStreamRange"), `${label} stream query helper mismatch`);
  assert(
    value.appBridge.streamQueries.helpers.includes("buildPathHistoryStreamSpaceTimeIndexF64"),
    `${label} stream space-time helper mismatch`
  );
  assert(
    value.appBridge.streamQueries.helpers.includes("refineEmissionShellCandidateRootsF64"),
    `${label} emission-shell refinement helper mismatch`
  );
  assert(value.appBridge.workPackets.helpers.includes("planPathHistoryWorkPackets"), `${label} work packet helper mismatch`);
  assert(value.numericSerialization.descriptors.length >= 1, `${label} numeric descriptors mismatch`);
  assert(value.errorBudgetPropagation.stages.length >= 1, `${label} error budget propagation mismatch`);
  assert(value.validation.invariantChecks.includes("root_hit_f64"), `${label} validation capability mismatch`);
  assert(value.maxTransferBytes === 67108864, `${label} max transfer mismatch`);
  assert(value.wasmModuleFactory === true, `${label} wasm factory mismatch`);
  assert(value.abiInfo.rootRowF64Bytes === 112, `${label} ABI root row mismatch`);
  assert(value.abiInfo.motionIntegrationRequestF64Bytes === 120, `${label} ABI motion integration mismatch`);
}

function validateBatchResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "batch response schema tag mismatch");
  assert(value.kind === "causal-root-batch-f64-response", "batch response kind mismatch");
  assertNonemptyString(value.requestId, "batch response request id");
  const responseValue = value.response;
  assert(Array.isArray(responseValue.items), "batch items must be an array");
  assert(Array.isArray(responseValue.roots), "batch roots must be an array");
  assert(responseValue.items.length === 2, "batch response must contain two item rows");
  assert(responseValue.roots.length === 2, "batch response must contain two roots");
  assert(responseValue.items[0].itemIndex === 0, "first batch item index mismatch");
  assert(responseValue.items[0].rootOffset === 0, "first batch root offset mismatch");
  assert(responseValue.items[0].rootCount === 1, "first batch root count mismatch");
  assert(responseValue.items[1].itemIndex === 1, "second batch item index mismatch");
  assert(responseValue.items[1].rootOffset === 1, "second batch root offset mismatch");
  assert(responseValue.items[1].rootCount === 1, "second batch root count mismatch");
  assertClose(responseValue.items[0].roots[0].distance, 10, "first batch root distance");
  assertClose(responseValue.items[1].roots[0].distance, 6, "second batch root distance");
  assertBuffer(responseValue.buffers[0], "batch-root-ledger", "root_ledger.v1", 224, 2);
  assert(responseValue.status.code === "ok", "batch status code mismatch");
}

function validateMotionIntegrationRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "motion integration request schema tag mismatch");
  assert(value.kind === "motion-integration-f64-request", "motion integration request kind mismatch");
  assertNonemptyString(value.requestId, "motion integration request id");
  const requestValue = value.request;
  assertPositiveInteger(requestValue.pathKey, "motion integration path key");
  assertFinite(requestValue.startTime, "motion integration start time");
  assertFinite(requestValue.endTime, "motion integration end time");
  assertPositiveFinite(requestValue.step, "motion integration step");
  assertVector(requestValue.initialPosition, "motion integration initial position");
  assertVector(requestValue.initialVelocity, "motion integration initial velocity");
  assertVector(requestValue.acceleration, "motion integration acceleration");
  assertFinite(requestValue.integrationTolerance, "motion integration tolerance");
  assert(requestValue.integrationMethod === 1, "motion integration method mismatch");
}

function validateMotionIntegrationResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "motion integration response schema tag mismatch");
  assert(value.kind === "motion-integration-f64-response", "motion integration response kind mismatch");
  assertNonemptyString(value.requestId, "motion integration response id");
  const responseValue = value.response;
  assert(responseValue.frames.length === 3, "motion integration frame count mismatch");
  assert(responseValue.frames[2].position.x === 6, "motion integration final x mismatch");
  assert(responseValue.frames[2].velocity.z === 3, "motion integration final z velocity mismatch");
  assertBuffer(responseValue.buffers[0], "frame-buffer", "frame_buffer.v1", 264, 3);
  assert(responseValue.status.code === "ok", "motion integration status mismatch");
}

function validateResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "response schema tag mismatch");
  assert(value.kind === "roots-and-hits-f64-response", "response kind mismatch");
  assertNonemptyString(value.requestId, "response request id");
  const responseValue = value.response;
  assert(Array.isArray(responseValue.roots), "roots must be an array");
  assert(Array.isArray(responseValue.hits), "hits must be an array");
  assert(responseValue.roots.length === 1, "smoke response must contain one root");
  assert(responseValue.hits.length === 1, "smoke response must contain one hit");
  assertClose(responseValue.roots[0].emissionTime, 0, "root emission time");
  assertClose(responseValue.roots[0].distance, 10, "root distance");
  assertClose(responseValue.hits[0].unitDirection.x, 1, "hit unit direction x");
  assertClose(responseValue.hits[0].strength, 1, "hit strength");
  assertBuffer(responseValue.buffers[0], "root-ledger", "root_ledger.v1", 112, 1);
  assertBuffer(responseValue.buffers[1], "delayed-hit-events", "delayed_hit_events.v1", 128, 1);
  assert(responseValue.streams.length === 1, "expected one transient stream");
  const stream = responseValue.streams[0];
  assert(stream.indexLayout === "stream_index.v1", "stream index layout mismatch");
  assert(stream.availableRanges.length === 2, "stream ranges mismatch");
  assert(stream.storagePolicy.maxBytes === 240, "stream storage byte count mismatch");
  assert(responseValue.status.code === "ok", "status code mismatch");
}

function validateRunSimulationRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "run simulation request schema tag mismatch");
  assert(value.kind === "run-simulation-request", "run simulation request kind mismatch");
  assertNonemptyString(value.requestId, "run simulation request id");
  const requestValue = value.request;
  assert(requestValue.requestId === "run-contract-request", "run request id mismatch");
  assert(requestValue.runId === "run-contract", "run id mismatch");
  assert(requestValue.datasetId === "run-contract-dataset", "run dataset id mismatch");
  assert(requestValue.appId === "photon", "run app id mismatch");
  assert(requestValue.runKind === "causalRoots", "run kind mismatch");
  assert(requestValue.claimLevel === "interactive-preview", "run claim level mismatch");
  assert(requestValue.precisionPath === "auto", "run precision path mismatch");
  assert(requestValue.config.rootRequest.hitTime === 10, "run root request mismatch");
  assert(requestValue.output.outputs.includes("rootLedger"), "run output request mismatch");
}

function validateRunSimulationNormalizedRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "normalized run simulation request schema tag mismatch");
  assert(value.kind === "run-simulation-request", "normalized run simulation request kind mismatch");
  assertNonemptyString(value.requestId, "normalized run simulation request id");
  const requestValue = value.request;
  assert(requestValue.requestId === "run-normalized-contract-request", "normalized run request id mismatch");
  assert(requestValue.runId === "run-normalized-contract", "normalized run id mismatch");
  assert(requestValue.appId === "photon", "normalized run app id mismatch");
  assert(requestValue.runKind === "causalRoots", "normalized run kind mismatch");
  assert(requestValue.config.normalizedRootRequest.coordinateFrame == null, "normalized request should not duplicate response frame");
  assertClose(
    requestValue.config.normalizedRootRequest.coordinateOrigin.x,
    1e18,
    "normalized run coordinate origin x"
  );
  assert(requestValue.config.normalizedRootRequest.localRequest.hitTime === 1, "normalized run local hit time mismatch");
  assert(
    requestValue.config.normalizedRootRequest.localRequest.receiver.positionAtStart.x === 1,
    "normalized run local receiver x mismatch"
  );
  assert(requestValue.config.rootRequest == null, "normalized run should not include absolute rootRequest");
}

function validateRunSimulationResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "run simulation response schema tag mismatch");
  assert(value.kind === "run-simulation-response", "run simulation response kind mismatch");
  assertNonemptyString(value.requestId, "run simulation response request id");
  const responseValue = value.response;
  assert(responseValue.requestId === "run-contract-request", "run handle request id mismatch");
  assert(responseValue.runId === "run-contract", "run handle id mismatch");
  assert(responseValue.datasetId === "run-contract-dataset", "run handle dataset id mismatch");
  assert(responseValue.acceptedPrecisionPath === "extended_precision", "run accepted precision mismatch");
  assert(responseValue.expectedOutputs.includes("delayedHitEvents"), "run expected outputs mismatch");
  assert(responseValue.status.code === "ok", "run handle status mismatch");
  assert(responseValue.response.runId === "run-contract", "run response id mismatch");
  assert(responseValue.response.summary.rootCount === 1, "run response root count mismatch");
  assert(responseValue.response.manifest.manifestHash === "4444444444444444", "run manifest hash mismatch");
  assert(
    responseValue.response.precision.selectedPrecisionPath === "extended_precision",
    "run response precision summary mismatch"
  );
  assert(
    responseValue.response.manifest.precision.selectedNumericType === "decimal128",
    "run manifest precision summary mismatch"
  );
  assert(
    responseValue.response.manifest.validationArtifacts.toleranceVector.rootIsolationTolerance === 1e-14,
    "run manifest validation tolerance mismatch"
  );
  assert(
    responseValue.response.manifest.validationArtifacts.artifactHashes.bufferHashes.length === 3,
    "run manifest artifact hash count mismatch"
  );
  assert(responseValue.response.rootLedgerDetails[0].entryKind === 1, "run response detail row mismatch");
  assert(responseValue.response.buffers.length === 3, "run response buffer count mismatch");
}

function validateDescribeRunRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "describe run request schema tag mismatch");
  assert(value.kind === "describe-run-request", "describe run request kind mismatch");
  assertNonemptyString(value.requestId, "describe run request id");
  assert(value.request.runId === "run-contract", "describe run id mismatch");
}

function validateDescribeRunResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "describe run response schema tag mismatch");
  assert(value.kind === "describe-run-response", "describe run response kind mismatch");
  assertNonemptyString(value.requestId, "describe run response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-run-description.v1", "run description schema mismatch");
  assert(responseValue.runId === "run-contract", "run description id mismatch");
  assert(responseValue.manifest.requestId === "run-contract-request", "run description manifest mismatch");
  assert(responseValue.summary.eventCount === 1, "run description event count mismatch");
  assert(responseValue.precision.rootCount === 1, "run description precision summary mismatch");
  assert(responseValue.buffers.length === 3, "run description buffer count mismatch");
  assert(responseValue.streams.length === 1, "run description stream count mismatch");
  assert(responseValue.status.code === "ok", "run description status mismatch");
}

function validateCancelRunRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "cancel run request schema tag mismatch");
  assert(value.kind === "cancel-run-request", "cancel run request kind mismatch");
  assertNonemptyString(value.requestId, "cancel run request id");
  assert(value.request.runId === "run-contract", "cancel run id mismatch");
}

function validateCancelRunResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "cancel run response schema tag mismatch");
  assert(value.kind === "cancel-run-response", "cancel run response kind mismatch");
  assertNonemptyString(value.requestId, "cancel run response request id");
  assert(value.response.code === "cancelled", "cancel run response status mismatch");
}

function validateCloseRunRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "close run request schema tag mismatch");
  assert(value.kind === "close-run-request", "close run request kind mismatch");
  assertNonemptyString(value.requestId, "close run request id");
  assert(value.request.runId === "run-contract", "close run id mismatch");
  assert(value.request.releaseStreams === true, "close run release streams mismatch");
}

function validateCloseRunResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "close run response schema tag mismatch");
  assert(value.kind === "close-run-response", "close run response kind mismatch");
  assertNonemptyString(value.requestId, "close run response request id");
  assert(value.response.code === "ok", "close run response status mismatch");
}

function validatePathHistoryStreamRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "path-history stream request schema tag mismatch");
  assert(value.kind === "path-history-stream-f64-request", "path-history stream request kind mismatch");
  assertNonemptyString(value.requestId, "path-history stream request id");
  const requestValue = value.request;
  assertNonemptyString(requestValue.runId, "path-history stream run id");
  assertNonemptyString(requestValue.datasetId, "path-history stream dataset id");
  assertNonemptyString(requestValue.streamId, "path-history stream id");
  assertPositiveInteger(requestValue.rowsPerChunk, "path-history rows per chunk");
  assert(Array.isArray(requestValue.pathRows), "path-history stream pathRows must be an array");
  assert(requestValue.pathRows.length === 3, "path-history stream request row count mismatch");
  requestValue.pathRows.forEach(validatePathHistoryRow);
  assertStoragePolicy(requestValue.storagePolicy, 1024, "path-history stream request storage policy");
  assert(requestValue.metadata.precisionPath === "scaled_f64_strict", "path-history request precision path mismatch");
}

function validatePathHistoryStreamResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "path-history stream response schema tag mismatch");
  assert(value.kind === "path-history-stream-f64-response", "path-history stream response kind mismatch");
  assertNonemptyString(value.requestId, "path-history stream response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-path-history-stream.v1", "path-history stream response schema mismatch");
  assert(responseValue.status.code === "ok", "path-history stream response status code mismatch");
  assert(responseValue.stream.streamId === "fixture-path-history-stream", "path-history stream descriptor id mismatch");
  assert(responseValue.stream.indexLayout === "stream_index.v1", "path-history stream index layout mismatch");
  assert(responseValue.stream.availableRanges.length === 2, "path-history stream range count mismatch");
  assertPathHistoryMetadata(responseValue.stream.metadata, "path-history stream descriptor metadata");
  assert(responseValue.buffers.length === 2, "path-history stream buffer count mismatch");
  assertBuffer(responseValue.buffers[0], "fixture-path-history-stream:path-chunk-0", "path_segment.v1", 192, 2);
  assert(responseValue.buffers[0].checksum === "1111111111111111", "path-history first checksum mismatch");
  assertBuffer(responseValue.buffers[1], "fixture-path-history-stream:path-chunk-1", "path_segment.v1", 96, 1);
  assert(responseValue.buffers[1].checksum === "2222222222222222", "path-history second checksum mismatch");
  const summary = responseValue.summary;
  assert(summary.schema === "solver-path-history-stream-summary.v1", "path-history stream summary schema mismatch");
  assert(summary.rowCount === 3, "path-history stream summary row count mismatch");
  assert(summary.chunkCount === 2, "path-history stream summary chunk count mismatch");
  assert(summary.pathCount === 2, "path-history stream summary path count mismatch");
  assert(summary.byteLength === 288, "path-history stream summary byte length mismatch");
  assert(summary.rowSizeBytes === 96, "path-history stream summary row size mismatch");
  assert(summary.pathIndexRowCount === 3, "path-history stream summary index row count mismatch");
  assert(summary.pathIndexedChunkCount === 2, "path-history stream summary indexed chunk count mismatch");
  assertRange(summary.timeRange, 0, 3, "path-history stream summary time range");
  assertRange(summary.frameRange, 0, 2, "path-history stream summary frame range");
  assertStoragePolicy(summary.storagePolicy, 288, "path-history stream summary storage policy");
  assertPathHistoryMetadata(summary.metadata, "path-history stream summary metadata");
}

function validateDescribeStreamRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "describe stream request schema tag mismatch");
  assert(value.kind === "describe-stream-request", "describe stream request kind mismatch");
  assertNonemptyString(value.requestId, "describe stream request id");
  assert(value.request.streamId === "fixture-path-history-stream", "describe stream id mismatch");
}

function validateDescribeStreamResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "describe stream response schema tag mismatch");
  assert(value.kind === "describe-stream-response", "describe stream response kind mismatch");
  assertNonemptyString(value.requestId, "describe stream response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-stream-description.v1", "stream description schema mismatch");
  assert(responseValue.status.code === "ok", "stream description status code mismatch");
  assert(responseValue.stream.streamId === "fixture-path-history-stream", "stream description id mismatch");
  assert(responseValue.stream.indexLayout === "stream_index.v1", "stream description index layout mismatch");
  assertStoragePolicy(responseValue.stream.storagePolicy, 288, "stream description storage policy");
  assertPathHistoryMetadata(responseValue.stream.metadata, "stream description metadata");
  assert(responseValue.stream.availableRanges.length === 2, "stream description range count mismatch");
  assert(responseValue.buffers.length === 2, "stream description buffer count mismatch");
  assertBuffer(responseValue.buffers[0], "fixture-path-history-stream:path-chunk-0", "path_segment.v1", 192, 2);
  assert(responseValue.buffers[0].checksum === "1111111111111111", "stream description first checksum mismatch");
  assertBuffer(responseValue.buffers[1], "fixture-path-history-stream:path-chunk-1", "path_segment.v1", 96, 1);
  assert(responseValue.buffers[1].checksum === "2222222222222222", "stream description second checksum mismatch");
  assert(responseValue.index.schema === "solver-stream-index.v1", "stream index schema mismatch");
  assert(responseValue.index.streamId === "fixture-path-history-stream", "stream index id mismatch");
  assert(responseValue.index.indexLayout === "stream_index.v1", "stream index layout mismatch");
  assert(responseValue.index.chunkCount === 2, "stream index chunk count mismatch");
  assert(responseValue.index.pathIndexRows.length === 3, "stream index row count mismatch");
  assert(responseValue.index.pathIndexRows[1].pathKey === 2001, "stream index second path key mismatch");
  assertRange(responseValue.index.pathIndexRows[1].byteRange, 96, 192, "stream index second byte range");
}

function validateOpenStreamRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "open stream request schema tag mismatch");
  assert(value.kind === "open-stream-request", "open stream request kind mismatch");
  assertNonemptyString(value.requestId, "open stream request id");
  const requestValue = value.request;
  assert(requestValue.purpose === "diagnostics", "open stream purpose mismatch");
  assert(requestValue.streamId === "fixture-path-history-stream", "open stream id mismatch");
  assert(requestValue.manifestPath === ".tmp/fixture-path-history-stream/stream-manifest.json", "open stream manifest path mismatch");
}

function validateOpenStreamResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "open stream response schema tag mismatch");
  assert(value.kind === "open-stream-response", "open stream response kind mismatch");
  assertNonemptyString(value.requestId, "open stream response request id");
  const responseValue = value.response;
  assert(responseValue.streamId === "fixture-path-history-stream", "open stream response id mismatch");
  assert(responseValue.manifestVersion === "solver-stream-manifest.v1", "open stream manifest mismatch");
  assert(responseValue.readableLayouts.includes("path_segment.v1"), "open stream readable layout mismatch");
  assert(responseValue.availableRanges.length === 2, "open stream range count mismatch");
  assertRange(responseValue.availableRanges[0].timeRange, 0, 2, "open stream first time range");
  assertRange(responseValue.availableRanges[0].frameRange, 0, 1, "open stream first frame range");
  assertRange(responseValue.availableRanges[0].byteRange, 0, 192, "open stream first byte range");
}

function validateReadStreamRangeRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "read stream request schema tag mismatch");
  assert(value.kind === "read-stream-range-request", "read stream request kind mismatch");
  assertNonemptyString(value.requestId, "read stream request id");
  const requestValue = value.request;
  assert(requestValue.streamId === "fixture-path-history-stream", "read stream request id mismatch");
  assert(requestValue.pathKeys.length === 1 && requestValue.pathKeys[0] === 2000, "read stream path key mismatch");
  assertRange(requestValue.timeRange, 0, 3, "read stream request time range");
  assert(requestValue.maxBytes === 96, "read stream max bytes mismatch");
}

function validateReadStreamRangeResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "read stream response schema tag mismatch");
  assert(value.kind === "read-stream-range-response", "read stream response kind mismatch");
  assertNonemptyString(value.requestId, "read stream response request id");
  const responseValue = value.response;
  assert(responseValue.streamId === "fixture-path-history-stream", "read stream response id mismatch");
  assert(responseValue.status.code === "ok", "read stream status code mismatch");
  assert(responseValue.ranges.length === 1, "read stream range count mismatch");
  assertRange(responseValue.ranges[0].timeRange, 0, 1, "read stream response time range");
  assertRange(responseValue.ranges[0].frameRange, 0, 0, "read stream response frame range");
  assertRange(responseValue.ranges[0].byteRange, 0, 96, "read stream response byte range");
  assert(responseValue.buffers.length === 1, "read stream buffer count mismatch");
  assertBuffer(responseValue.buffers[0], "fixture-path-history-stream:path-chunk-0", "path_segment.v1", 96, 1);
  assert(responseValue.buffers[0].checksum === "3333333333333333", "read stream checksum mismatch");
  assert(responseValue.diagnostics.length === 1, "read stream diagnostic count mismatch");
  assert(responseValue.diagnostics[0].code === "path_history_indexed_readback", "read stream diagnostic code mismatch");
  assert(responseValue.diagnostics[0].stage === "stream_readback", "read stream diagnostic stage mismatch");
  assert(responseValue.diagnostics[0].details.selectedRowCount === 1, "read stream selected rows mismatch");
}

function validateEmissionShellCandidateResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "emission-shell response schema tag mismatch");
  assert(value.kind === "emission-shell-candidate-f64-response", "emission-shell response kind mismatch");
  assertNonemptyString(value.requestId, "emission-shell response request id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-emission-shell-candidates.v1", "emission-shell schema mismatch");
  assert(responseValue.packetId === "packet-a", "emission-shell packet id mismatch");
  assert(responseValue.packetMergeOrder === 0, "emission-shell packet merge order mismatch");
  assert(responseValue.packetMergeKey === "source:0:receiver:1", "emission-shell packet merge key mismatch");
  assertWorkPacketResultRef(responseValue.packetResult, "packet-a", 0, "source:0:receiver:1");
  assert(responseValue.packetResults.length === 2, "emission-shell packet result count mismatch");
  assertWorkPacketResultRef(responseValue.packetResults[0], "packet-a", 0, "source:0:receiver:1");
  assertWorkPacketResultRef(responseValue.packetResults[1], "packet-b", 1, "source:1:receiver:2");
  assert(responseValue.streamId === "fixture-path-history-stream", "emission-shell stream id mismatch");
  assert(responseValue.signalSpeed === 1, "emission-shell signal speed mismatch");
  assert(responseValue.tolerance === 1e-12, "emission-shell tolerance mismatch");
  assert(responseValue.pairCount === 1, "emission-shell pair count mismatch");
  assert(responseValue.rejectedPairCount === 0, "emission-shell rejected pair count mismatch");
  assert(responseValue.candidateCount === 1, "emission-shell candidate count mismatch");
  assert(responseValue.falsePositiveEstimate.method === "sampled_linear_segment_bisection.v1", "emission-shell false-positive method mismatch");
  assert(responseValue.scanSummary.executionPath === "packet_merge", "emission-shell scan execution path mismatch");
  assert(responseValue.scanSummary.outputBufferCount === 2, "emission-shell scan output buffer count mismatch");
  assert(responseValue.truncated === false, "emission-shell truncated mismatch");
  assert(responseValue.candidates.length === 1, "emission-shell candidate row count mismatch");
  assert(responseValue.candidates[0].candidateKind === "broad_phase_possible", "emission-shell candidate kind mismatch");
  assert(responseValue.candidates[0].narrowPhaseEstimate.classification === "sampled_hit", "emission-shell narrow phase mismatch");
  assertBuffer(responseValue.buffers[0], "packet-a:emission-shell-candidates", "emission_shell_candidate.v1", 112, 1);
  assertBuffer(responseValue.buffers[1], "packet-a:emission-shell-narrow-phase", "emission_shell_narrow_phase.v1", 40, 1);
  assert(responseValue.status.code === "ok", "emission-shell response status mismatch");
}

function validateEmissionShellRootRefinementRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "emission-shell refinement request schema tag mismatch");
  assert(value.kind === "emission-shell-root-refinement-f64-request", "emission-shell refinement request kind mismatch");
  assertNonemptyString(value.requestId, "emission-shell refinement request id");
  const requestValue = value.request;
  assert(requestValue.streamId === "fixture-path-history-stream", "emission-shell refinement stream id mismatch");
  assert(requestValue.signalSpeed === 1, "emission-shell refinement signal speed mismatch");
  assert(requestValue.rootTolerance === 1e-12, "emission-shell refinement root tolerance mismatch");
  assert(requestValue.candidates.length === 1, "emission-shell refinement candidate count mismatch");
  assert(requestValue.candidates[0].narrowPhaseEstimate.classification === "sampled_hit", "emission-shell refinement candidate hit mismatch");
}

function validateEmissionShellRootRefinementResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "emission-shell refinement response schema tag mismatch");
  assert(value.kind === "emission-shell-root-refinement-f64-response", "emission-shell refinement response kind mismatch");
  assertNonemptyString(value.requestId, "emission-shell refinement response id");
  const responseValue = value.response;
  assert(responseValue.schema === "solver-emission-shell-root-refinement.v1", "emission-shell refinement schema mismatch");
  assert(responseValue.streamId === "fixture-path-history-stream", "emission-shell refinement response stream mismatch");
  assert(responseValue.candidateCount === 1, "emission-shell refinement candidate count mismatch");
  assert(responseValue.processedCandidateCount === 1, "emission-shell refinement processed count mismatch");
  assert(responseValue.attemptedCandidateCount === 1, "emission-shell refinement attempted count mismatch");
  assert(responseValue.skippedCandidateCount === 0, "emission-shell refinement skipped count mismatch");
  assert(responseValue.rootCount === 1, "emission-shell refinement root count mismatch");
  assert(responseValue.hitCount === 1, "emission-shell refinement hit count mismatch");
  assert(responseValue.items[0].candidateIndex === 0, "emission-shell refinement item index mismatch");
  assert(responseValue.items[0].rootOffset === 0, "emission-shell refinement root offset mismatch");
  assert(responseValue.items[0].hitOffset === 0, "emission-shell refinement hit offset mismatch");
  assert(responseValue.roots.length === 1, "emission-shell refinement roots mismatch");
  assert(responseValue.hits.length === 1, "emission-shell refinement hits mismatch");
  assertBuffer(responseValue.buffers[0], "emission-shell-refined-root-ledger", "root_ledger.v1", 112, 1);
  assertBuffer(responseValue.buffers[1], "emission-shell-refined-delayed-hits", "delayed_hit_events.v1", 128, 1);
  assert(responseValue.status.code === "ok", "emission-shell refinement status mismatch");
}

function assertWorkPacketResultRef(result, packetId, mergeOrder, mergeKey) {
  assert(result.packetId === packetId, `${packetId} result packet id mismatch`);
  assert(result.mergeOrder === mergeOrder, `${packetId} result merge order mismatch`);
  assert(result.mergeKey === mergeKey, `${packetId} result merge key mismatch`);
  assert(result.outputs.length === 2, `${packetId} result output count mismatch`);
  assert(
    result.outputs[0].layout === "emission_shell_candidate.v1" &&
      result.outputs[1].layout === "emission_shell_narrow_phase.v1",
    `${packetId} result output layout mismatch`
  );
  assert(result.outputs[0].checksum.length === 16, `${packetId} candidate output checksum mismatch`);
  assert(result.outputs[1].checksum.length === 16, `${packetId} narrow-phase output checksum mismatch`);
}

function assertSegment(value, label) {
  assertFinite(value.startTime, `${label} start time`);
  assertFinite(value.endTime, `${label} end time`);
  assert(value.endTime >= value.startTime, `${label} time bounds`);
  assertVector(value.positionAtStart, `${label} position`);
  assertVector(value.velocity, `${label} velocity`);
}

function assertVector(value, label) {
  assertFinite(value.x, `${label} x`);
  assertFinite(value.y, `${label} y`);
  assertFinite(value.z, `${label} z`);
}

function validatePathHistoryRow(row, index) {
  assert(Number.isInteger(row.pathKey) && row.pathKey >= 0, `path row ${index} path key`);
  assert(Number.isInteger(row.segmentIndex) && row.segmentIndex >= 0, `path row ${index} segment index`);
  assertFinite(row.startTime, `path row ${index} start time`);
  assertFinite(row.endTime, `path row ${index} end time`);
  assert(row.endTime >= row.startTime, `path row ${index} time bounds`);
  assertVector(row.start, `path row ${index} start`);
  assertVector(row.velocity, `path row ${index} velocity`);
}

function assertRange(range, start, end, label) {
  assert(range.start === start && range.end === end, `${label} expected ${start}..${end}`);
}

function assertStoragePolicy(policy, maxBytes, label) {
  assert(policy.target === "caller-buffer", `${label} target mismatch`);
  assert(policy.durable === false, `${label} durable mismatch`);
  assert(policy.maxBytes === maxBytes, `${label} max bytes mismatch`);
}

function assertPathHistoryMetadata(metadata, label) {
  assert(metadata.schema === "solver-path-history-stream-metadata.v1", `${label} schema mismatch`);
  assert(metadata.precisionPath === "scaled_f64_strict", `${label} precision path mismatch`);
  assert(metadata.units === "solver-si", `${label} units mismatch`);
  assert(metadata.coordinateFrame === "absolute-lab-frame", `${label} coordinate frame mismatch`);
  assert(metadata.scaleNormalization === "unit-test-scale", `${label} scale normalization mismatch`);
  assert(metadata.interpolationRule === "linear-segment", `${label} interpolation rule mismatch`);
  assert(metadata.provenance.fixture === "path-history-contract-fixture", `${label} provenance mismatch`);
  assert(Array.isArray(metadata.diagnostics), `${label} diagnostics must be an array`);
  assert(metadata.diagnostics[0].code === "ok", `${label} diagnostic code mismatch`);
}

function assertBuffer(value, bufferId, layout, byteLength, rowCount) {
  assert(value.bufferId === bufferId, `${bufferId} id mismatch`);
  assert(value.layout === layout, `${bufferId} layout mismatch`);
  assert(value.rowCount === rowCount, `${bufferId} row count mismatch`);
  assert(value.byteLength === byteLength, `${bufferId} byte length mismatch`);
  assert(value.numericType === "f64", `${bufferId} numeric type mismatch`);
}

function assertCoreBinaryLayouts(expectedLayouts) {
  const actualLayouts = schema.$defs.coreBinaryLayoutId?.enum || [];
  for (const layout of expectedLayouts) {
    assert(actualLayouts.includes(layout), `core binary layout missing ${layout}`);
  }
}

function assertEnumValues(defName, expectedValues) {
  const actualValues = schema.$defs[defName]?.enum || [];
  for (const value of expectedValues) {
    assert(actualValues.includes(value), `${defName} missing ${value}`);
  }
}

function assertNumericTypes(expectedTypes) {
  const actualTypes = schema.$defs.numericTypeId?.enum || [];
  for (const numericType of expectedTypes) {
    assert(actualTypes.includes(numericType), `numeric type missing ${numericType}`);
  }
}

function assertErrorBudgetStages(expectedStages) {
  const actualStages = schema.$defs.errorBudgetStageId?.enum || [];
  for (const stage of expectedStages) {
    assert(actualStages.includes(stage), `error budget stage missing ${stage}`);
  }
}

function assertValueAuthorities(expectedAuthorities) {
  const actualAuthorities = schema.$defs.valueAuthorityId?.enum || [];
  for (const authority of expectedAuthorities) {
    assert(actualAuthorities.includes(authority), `value authority missing ${authority}`);
  }
}

function assertWorkerMethods(expectedMethods) {
  const actualMethods = schema.$defs.solverAppWorkerMethod?.enum || [];
  for (const method of expectedMethods) {
    assert(actualMethods.includes(method), `worker method missing ${method}`);
  }
}

function createCausalRootsResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-roots-f64-response",
    requestId: "causal-roots-f64-smoke",
    response: {
      roots: response.response.roots,
      status: createStatusFixture("ok", "ok", "causal roots solved"),
    },
  };
}

function createCausalRootsNormalizedRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-roots-normalized-f64-request",
    requestId: "causal-roots-normalized-contract-request",
    request: {
      coordinateOrigin: { x: 1e18, y: -2e18, z: 3e18 },
      localRequest: {
        ...request.request,
        source: {
          ...request.request.source,
          positionAtStart: { x: 0, y: 0, z: 0 },
        },
        receiver: {
          ...request.request.receiver,
          positionAtStart: { x: 1, y: 0, z: 0 },
        },
        hitTime: 1,
        rootTolerance: 1e-15,
      },
      restoreAbsolutePoints: true,
    },
  };
}

function createCausalRootsNormalizedResponseEnvelope() {
  const root = {
    ...response.response.roots[0],
    distance: 1,
    coordinateFrame: "origin-normalized",
    sourcePoint: { x: 0, y: 0, z: 0 },
    receiverPoint: { x: 1, y: 0, z: 0 },
  };
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-roots-normalized-f64-response",
    requestId: "causal-roots-normalized-contract-request",
    response: {
      schema: "solver-causal-roots-normalized-f64.v1",
      coordinateFrame: "origin-normalized",
      coordinateOrigin: { x: 1e18, y: -2e18, z: 3e18 },
      localRequest: causalRootsNormalizedRequest.request.localRequest,
      roots: [root],
      absoluteRoots: [
        {
          ...root,
          coordinateFrame: "absolute-display",
          sourcePoint: { x: 1e18, y: -2e18, z: 3e18 },
          receiverPoint: { x: 1e18, y: -2e18, z: 3e18 },
          localSourcePoint: { x: 0, y: 0, z: 0 },
          localReceiverPoint: { x: 1, y: 0, z: 0 },
          absolutePointAuthority: "display-only",
        },
      ],
      status: createStatusFixture("ok", "ok", "origin-normalized causal roots solved"),
    },
  };
}

function createCausalRootsPrecisionRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-roots-precision-f64-request",
    requestId: "causal-roots-precision-contract-request",
    request: {
      rootRequest: request.request,
      requestedPrecisionPath: "scaled_f64_strict",
      claimLevel: "exported-dataset",
      allowEscalation: true,
      runValidationReplay: true,
      maxRoots: 4,
    },
  };
}

function createPrecisionSummaryFixture() {
  return {
    requestedPrecisionPath: "scaled_f64_strict",
    diagnosticPrecisionPath: "extended_precision",
    selectedPrecisionPath: "extended_precision",
    selectedNumericType: "decimal128",
    claimLevel: "exported-dataset",
    statusCode: "insufficient_scale_resolution",
    statusSeverity: "warning",
    rootCount: 1,
    rootTolerance: 1e-16,
    maxResidual: 0,
    minAbsJacobian: 1,
    maxIterations: 256,
    scanSubdivisions: 512,
    escalated: true,
    validationReplayRun: true,
    validationReplayMatched: true,
  };
}

function createRootLedgerDetailFixture() {
  return {
    ledgerKey: 1001,
    sourceKey: 2001,
    receiverKey: 3001,
    rootKey: 4001,
    intervalStart: 0,
    intervalEnd: 10,
    emissionTime: 0,
    hitTime: 10,
    delay: 10,
    residual: 0,
    jacobian: 1,
    branchWeight: 1,
    bracketStart: 0,
    bracketEnd: 0,
    sourcePoint: { x: 0, y: 0, z: 0 },
    receiverPoint: { x: 10, y: 0, z: 0 },
    entryKind: 1,
    rootKind: 1,
    statusCode: 0,
    jacobianSignStratum: 3,
    sequenceIndex: 0,
    iterationCount: 1,
    stateFlags: 0,
  };
}

function createCausalRootsPrecisionResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-roots-precision-f64-response",
    requestId: "causal-roots-precision-contract-request",
    response: {
      schema: "solver-causal-roots-precision-f64.v1",
      roots: response.response.roots,
      precision: createPrecisionSummaryFixture(),
      buffers: [
        {
          bufferId: "precision-root-ledger",
          layout: "root_ledger.v1",
          byteOffset: 0,
          byteLength: 112,
          rowCount: 1,
          numericType: "f64",
        },
      ],
      status: createStatusFixture(
        "insufficient_scale_resolution",
        "warning",
        "precision causal roots solved with diagnostics"
      ),
    },
  };
}

function createRootsAndHitsPrecisionRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "roots-and-hits-precision-f64-request",
    requestId: "roots-and-hits-precision-contract-request",
    request: {
      rootRequest: request.request,
      requestedPrecisionPath: "scaled_f64_strict",
      claimLevel: "exported-dataset",
      allowEscalation: true,
      runValidationReplay: true,
      maxRoots: 4,
      maxHits: 4,
    },
  };
}

function createRootsAndHitsPrecisionResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "roots-and-hits-precision-f64-response",
    requestId: "roots-and-hits-precision-contract-request",
    response: {
      schema: "solver-roots-and-hits-precision-f64.v1",
      roots: response.response.roots,
      hits: response.response.hits,
      rootLedgerDetails: [createRootLedgerDetailFixture()],
      precision: createPrecisionSummaryFixture(),
      buffers: [
        {
          bufferId: "precision-root-ledger",
          layout: "root_ledger.v1",
          byteOffset: 0,
          byteLength: 112,
          rowCount: 1,
          numericType: "f64",
        },
        {
          bufferId: "precision-delayed-hit-events",
          layout: "delayed_hit_events.v1",
          byteOffset: 0,
          byteLength: 128,
          rowCount: 1,
          numericType: "f64",
        },
        {
          bufferId: "precision-root-ledger-detail",
          layout: "root_ledger_detail.v1",
          byteOffset: 0,
          byteLength: 192,
          rowCount: 1,
          numericType: "f64",
        },
      ],
      streams: [
        {
          streamId: "causal-root-transient",
          manifestVersion: "solver-stream-manifest.v1",
          indexLayout: "stream_index.v1",
          availableRanges: [
            {
              timeRange: { start: 10, end: 10 },
              frameRange: { start: 0, end: 0 },
              byteRange: { start: 0, end: 112 },
            },
            {
              timeRange: { start: 10, end: 10 },
              frameRange: { start: 0, end: 0 },
              byteRange: { start: 112, end: 240 },
            },
            {
              timeRange: { start: 10, end: 10 },
              frameRange: { start: 0, end: 0 },
              byteRange: { start: 240, end: 432 },
            },
          ],
          storagePolicy: {
            target: "caller-buffer",
            durable: false,
            maxBytes: 432,
          },
        },
      ],
      status: createStatusFixture(
        "insufficient_scale_resolution",
        "warning",
        "precision causal roots and delayed hits solved with diagnostics"
      ),
    },
  };
}

function createWorkerRequestMessage() {
  return {
    schema: "solver-app-worker/v1",
    type: "request",
    requestId: "worker-run-contract-request",
    method: "runSimulation",
    request: createSolverRunRequest(),
  };
}

function createWorkerResponseMessage() {
  return {
    schema: "solver-app-worker/v1",
    type: "response",
    requestId: "worker-capabilities-contract-request",
    method: "capabilities",
    response: createCapabilitiesFixture(),
  };
}

function createWorkerErrorMessage() {
  return {
    schema: "solver-app-worker/v1",
    type: "error",
    requestId: "worker-invalid-method-request",
    method: "missingMethod",
    status: createStatusFixture("app_contract_error", "error", "solver worker method is not supported", {
      method: "missingMethod",
    }),
  };
}

function createInitRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "init-request",
    requestId: "init-contract-request",
    request: {
      appId: "animator",
      apiVersion: "solver-app-bridge.v1",
      requestedCapabilities: ["causalRoots", "pathHistory", "sharedGeometry"],
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: 67108864,
      },
      threadingPolicy: {
        mode: "single-thread",
        deterministic: true,
      },
    },
  };
}

function createInitResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "init-response",
    requestId: "init-contract-request",
    response: {
      apiVersion: "solver-app-bridge.v1",
      solverVersion: "0.1.0",
      capabilities: createCapabilitiesFixture(),
      status: createStatusFixture("ok", "ok", "solver bridge initialized"),
    },
  };
}

function createCapabilitiesRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "capabilities-request",
    requestId: "capabilities-contract-request",
  };
}

function createCapabilitiesResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "capabilities-response",
    requestId: "capabilities-contract-request",
    response: createCapabilitiesFixture(),
  };
}

function createThreadingPlanRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "threading-plan-request",
    requestId: "threading-plan-contract-request",
    request: {
      policy: {
        mode: "fixed",
        maxThreads: 4,
        deterministic: true,
      },
      workload: {
        stage: "emission_shell_candidates",
        itemCount: 16,
        minItemsPerWorker: 4,
        deterministicRequired: true,
      },
    },
  };
}

function createThreadingPlanResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "threading-plan-response",
    requestId: "threading-plan-contract-request",
    response: {
      schema: "solver-threading-plan.v1",
      stage: "emission_shell_candidates",
      itemCount: 16,
      minItemsPerWorker: 4,
      requestedWorkerCount: 4,
      activeWorkerCount: 1,
      schedulingMode: "sequential",
      backend: "single-thread",
      deterministicReduction: true,
      browserWorkerAvailable: true,
      wasmThreadsAvailable: false,
      nativeThreadsAvailable: false,
      fallbackReason: "wasm_threads_unavailable",
      speedupBaselineWorkerCount: 1,
      statuses: [
        createStatusFixture("unsupported_wasm_threads", "warning", "threaded execution fell back to sequential bridge execution", {
          stage: "threading_plan",
        }),
      ],
      status: createStatusFixture("unsupported_wasm_threads", "warning", "threading plan selected sequential fallback", {
        stage: "threading_plan",
      }),
    },
  };
}

function createAdmissionRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "admission-request",
    requestId: "admission-contract-request",
    request: {
      model: createRunModel(),
      errorBudget: createRunErrorBudget(),
      envelope: createRunEnvelope(),
      capability: {
        maxInteractiveEntities: 2048,
        maxBatchEntities: 65536,
        minMemoryBudgetBytes: 1048576,
        minStorageBudgetBytesForStreaming: 1048576,
        minimumPositiveTolerance: 1e-18,
        maxInteractiveStepCount: 100000,
      },
    },
  };
}

function createAdmissionResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "admission-response",
    requestId: "admission-contract-request",
    response: {
      decision: "escalate_precision",
      selectedPrecisionPath: "extended_precision",
      admitted: true,
      stressSummary: createAdmissionStressSummary(),
      statuses: [createStatusFixture("precision_escalated", "info", "selected extended precision for strict global tolerance", {
        stage: "admission",
      })],
      status: createStatusFixture("precision_escalated", "info", "simulation admitted with precision escalation", {
        stage: "admission",
      }),
    },
  };
}

function createCapabilitiesFixture() {
  return {
    precisionPaths: [
      "auto",
      "scaled_f64_fast",
      "scaled_f64_strict",
      "adaptive_multirate",
      "event_root_focused",
      "extended_precision",
      "validation_replay",
    ],
    outputLayouts: [
      "frame_buffer.v1",
      "path_segment.v1",
      "assembly_state.v1",
      "assembly_membership.v1",
      "assembly_hierarchy.v1",
      "assembly_events.v1",
      "path_chunk.v1",
      "root_ledger.v1",
      "root_ledger_detail.v1",
      "delayed_hit_events.v1",
      "phase_at_hit.v1",
      "spacetime_index.v1",
      "emission_shell_candidate.v1",
      "emission_shell_narrow_phase.v1",
      "stream_index.v1",
      "assembly_graph_index.v1",
    ],
    storage: {
      supportsOpfs: false,
      supportsNativeFile: true,
      supportsCallerBuffer: true,
      maxRecommendedBytes: 67108864,
    },
    threading: {
      nativeThreads: false,
      wasmThreads: false,
      browserWorker: true,
      crossOriginIsolationRequired: true,
    },
    appBridge: {
      schema: "solver-app-bridge-capabilities.v1",
      apiVersion: "solver-app-bridge.v1",
      adapterVersion: "solver-app-adapters.v1",
      appAdapters: [
        {
          appId: "animator",
          runKinds: ["motionSimulation", "pathHistory", "appPlayback", "sharedGeometry", "validationReplay"],
        },
        {
          appId: "photon",
          runKinds: ["causalRoots", "phaseDiagnostics", "pathHistory", "sharedGeometry", "validationReplay"],
        },
        {
          appId: "ideal-swarm",
          runKinds: ["delayedHits", "pathHistory", "sharedGeometry", "validationReplay"],
        },
      ],
      denseDataTransport: ["array-buffer", "stream-handle"],
      workerModel: {
        bridgeOwnsWasmLifecycle: true,
        appsRequireCppHandling: false,
        longRunningRunsOffUiThreadRequired: true,
        browserWorkerAvailable: true,
        wasmInternalThreadsAvailable: false,
        fallback: "single-solver-worker-or-batch",
      },
      storageFallbacks: {
        preferredDurableBrowserTarget: "opfs",
        durableBrowserTargetAvailable: false,
        preferredNativeFileTarget: "native-file",
        nativeFileTargetAvailable: true,
        transientTarget: "caller-buffer",
        unsupportedStorageStatusCode: "unsupported_browser_storage",
      },
      streamQueries: {
        schema: "solver-stream-query-capabilities.v1",
        helpers: [
          "createPathHistoryStreamF64",
          "describeStream",
          "readStreamRange",
          "buildPathHistoryStreamSpaceTimeIndexF64",
          "queryEmissionShellCandidatesF64",
          "queryEmissionShellCandidatePacketF64",
          "queryEmissionShellCandidatePacketsF64",
          "refineEmissionShellCandidateRootsF64",
        ],
        pathHistoryLayouts: ["path_segment.v1"],
        indexedFilters: ["pathKeys", "chunkIndices", "timeRange", "frameRange", "byteRange"],
        broadPhaseQueries: [
          createBroadPhaseCapability("queryEmissionShellCandidatesF64"),
          createBroadPhaseCapability("queryEmissionShellCandidatePacketF64"),
          createBroadPhaseCapability("queryEmissionShellCandidatePacketsF64"),
        ],
      },
      workPackets: {
        schema: "solver-work-packet-capabilities.v1",
        headerSchema: "solver-work-packet.v1",
        helpers: [
          "prepareWorkPacketHeader",
          "orderWorkPacketResults",
          "planPathHistoryWorkPackets",
          "mergeEmissionShellCandidatePacketResponsesF64",
        ],
        pathHistoryPlanFilters: [
          "sourcePathKeys",
          "receiverPathKeys",
          "sourceChunkIndices",
          "receiverChunkIndices",
          "timeRange",
        ],
        deterministicMergeOrder: ["mergeKey", "mergeOrder", "packetId"],
        rowSizeValidation: true,
      },
    },
    numericSerialization: {
      schema: "solver-numeric-serialization.v1",
      descriptors: [
        {
          numericType: "f64",
          byteOrder: "little-endian",
          scalarSizeBytes: 8,
          signedness: "not-applicable",
          scaleFactor: "1",
          exponentLayout: "ieee754-binary64",
          limbOrder: "not-applicable",
          intervalEndpointConvention: "not-applicable",
          roundingMode: "nearest-even",
          comparisonSemantics: "total-order-with-nan-rejected",
          textExport: "decimal-roundtrip",
          appBufferSafe: true,
          authoritativeStorageSafe: true,
        },
      ],
    },
    errorBudgetPropagation: {
      schema: "solver-error-budget-propagation.v1",
      stages: [
        {
          stage: "root_isolation",
          budgetField: "rootIsolationTolerance",
          cumulative: true,
        },
      ],
      authorityLevels: ["authoritative", "approximate", "display-only", "rejected"],
    },
    validation: {
      invariantChecks: ["root_hit_f64"],
      transitionClassifiers: ["root_ledger_f64"],
      baselineClassifications: [
        "baseline_within_tolerance",
        "baseline_refined_result",
        "baseline_model_boundary_difference",
        "baseline_investigation_required_mismatch",
      ],
    },
    maxTransferBytes: 67108864,
    wasmModuleFactory: true,
    abiInfo: createAbiInfoFixture(),
  };
}

function createBroadPhaseCapability(method) {
  return {
    method,
    responseSchema: "solver-emission-shell-candidates.v1",
    candidateKind: "broad_phase_possible",
    estimateMethod: "sampled_linear_segment_bisection.v1",
    narrowPhaseAuthorities: [
      "solveCausalRootsF64",
      "solveCausalRootsPrecisionF64",
      "solveCausalRootsNormalizedF64",
      "solveRootsAndHitsPrecisionF64",
      "solveRootsAndHitsF64",
      "refineEmissionShellCandidateRootsF64",
    ],
  };
}

function createAbiInfoFixture() {
  return {
    abiMajor: 0,
    abiMinor: 4,
    abiPatch: 0,
    rootRequestF64Bytes: 176,
    rootRowF64Bytes: 112,
    delayedHitRowF64Bytes: 128,
    motionSampleRequestF64Bytes: 112,
    motionFrameRowF64Bytes: 88,
    phaseClockF64Bytes: 24,
    phaseAtHitRowF64Bytes: 72,
    boundsRowF64Bytes: 64,
    spherePointRequestF64Bytes: 64,
    spherePointRowF64Bytes: 24,
    delayedPotentialRequestF64Bytes: 144,
    delayedPotentialRowF64Bytes: 112,
    circularSelfHitRequestF64Bytes: 48,
    circularSelfHitRowF64Bytes: 72,
    assemblyStateRowF64Bytes: 112,
    assemblyMembershipRowF64Bytes: 80,
    assemblyHierarchyRowF64Bytes: 56,
    assemblyEventRowF64Bytes: 88,
    pathHistoryRowF64Bytes: 96,
    pathHistoryChunkRowBytes: 104,
    storageLifecyclePolicyBytes: 56,
    pathHistoryLifecycleDecisionRowBytes: 32,
    spaceTimeIndexRowF64Bytes: 128,
    emissionShellBroadPhaseOptionsF64Bytes: 48,
    emissionShellCandidateRowF64Bytes: 112,
    emissionShellBroadPhaseSummaryBytes: 32,
    emissionShellNarrowPhaseRequestF64Bytes: 208,
    emissionShellNarrowPhaseRowF64Bytes: 40,
    rootLedgerDetailRowF64Bytes: 192,
    errorBudgetF64Bytes: 64,
    errorBudgetStageInputF64Bytes: 16,
    errorBudgetStageRowF64Bytes: 40,
    errorBudgetSummaryF64Bytes: 32,
    precisionSolveOptionsBytes: 16,
    precisionSolveSummaryF64Bytes: 80,
    motionIntegrationRequestF64Bytes: 120,
  };
}

function createMotionIntegrationRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "motion-integration-f64-request",
    requestId: "motion-integration-contract",
    request: {
      pathKey: 4321,
      startTime: 0,
      endTime: 2,
      step: 1,
      initialPosition: { x: 1, y: 1, z: 1 },
      initialVelocity: { x: 2, y: 0, z: -1 },
      acceleration: { x: 0.5, y: 1, z: 2 },
      integrationTolerance: 1e-11,
      integrationMethod: 1,
      stateFlags: 11,
      maxFrames: 3,
    },
  };
}

function createMotionIntegrationResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "motion-integration-f64-response",
    requestId: "motion-integration-contract",
    response: {
      frames: [
        createMotionFrameFixture({ pathKey: 4321, frameIndex: 0, time: 0, x: 1, y: 1, z: 1 }),
        createMotionFrameFixture({ pathKey: 4321, frameIndex: 1, time: 1, x: 3.25, y: 1.5, z: 1 }),
        createMotionFrameFixture({ pathKey: 4321, frameIndex: 2, time: 2, x: 6, y: 3, z: 3, vx: 3, vy: 2, vz: 3 }),
      ],
      buffers: [
        {
          bufferId: "frame-buffer",
          layout: "frame_buffer.v1",
          byteOffset: 0,
          byteLength: 264,
          rowCount: 3,
          numericType: "f64",
          buffer: {},
        },
      ],
      status: createStatusFixture("ok", "ok", "constant-acceleration motion integrated"),
    },
  };
}

function createMotionFrameFixture(input) {
  return {
    pathKey: input.pathKey,
    frameIndex: input.frameIndex,
    time: input.time,
    position: { x: input.x, y: input.y, z: input.z },
    velocity: { x: input.vx ?? 2, y: input.vy ?? 0, z: input.vz ?? -1 },
    errorBound: input.errorBound ?? 1e-11,
    stateFlags: input.stateFlags ?? 11,
  };
}

function createRunSimulationRequestEnvelope() {
  const runRequest = createSolverRunRequest();
  return {
    schema: "solver-app-bridge/v1",
    kind: "run-simulation-request",
    requestId: runRequest.requestId,
    request: runRequest,
  };
}

function createRunSimulationNormalizedRequestEnvelope() {
  const runRequest = {
    ...createSolverRunRequest(),
    requestId: "run-normalized-contract-request",
    runId: "run-normalized-contract",
    datasetId: "run-normalized-contract-dataset",
    configVersion: "solver-run-normalized-contract.v1",
    configHash: "solver-run-normalized-contract",
    config: {
      appId: "photon",
      normalizedRootRequest: causalRootsNormalizedRequest.request,
    },
  };
  return {
    schema: "solver-app-bridge/v1",
    kind: "run-simulation-request",
    requestId: runRequest.requestId,
    request: runRequest,
  };
}

function createRunSimulationResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "run-simulation-response",
    requestId: "run-contract-request",
    response: {
      requestId: "run-contract-request",
      runId: "run-contract",
      datasetId: "run-contract-dataset",
      cancellationToken: "run-contract:cancel",
      acceptedPrecisionPath: "extended_precision",
      expectedOutputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
      response: createSolverRunResponse(),
      status: createStatusFixture("ok", "ok", "run simulation completed"),
    },
  };
}

function createDescribeRunRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "describe-run-request",
    requestId: "describe-run-contract-request",
    request: {
      runId: "run-contract",
    },
  };
}

function createDescribeRunResponseEnvelope() {
  const runResponse = createSolverRunResponse();
  return {
    schema: "solver-app-bridge/v1",
    kind: "describe-run-response",
    requestId: "describe-run-contract-request",
    response: {
      schema: "solver-run-description.v1",
      runId: runResponse.runId,
      datasetId: runResponse.datasetId,
      manifest: runResponse.manifest,
      summary: runResponse.summary,
      buffers: runResponse.buffers,
      streams: runResponse.streams,
      precision: runResponse.precision,
      diagnostics: runResponse.diagnostics,
      status: createStatusFixture("ok", "ok", "run description read"),
    },
  };
}

function createCancelRunRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "cancel-run-request",
    requestId: "cancel-run-contract-request",
    request: {
      requestId: "run-contract-request",
      runId: "run-contract",
      reason: "contract fixture complete",
    },
  };
}

function createCancelRunResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "cancel-run-response",
    requestId: "cancel-run-contract-request",
    response: createStatusFixture("cancelled", "info", "run cancellation acknowledged", {
      runId: "run-contract",
      requestId: "run-contract-request",
    }),
  };
}

function createCloseRunRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "close-run-request",
    requestId: "close-run-contract-request",
    request: {
      runId: "run-contract",
      releaseStreams: true,
    },
  };
}

function createCloseRunResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "close-run-response",
    requestId: "close-run-contract-request",
    response: createStatusFixture("ok", "ok", "run closed", {
      runId: "run-contract",
      releasedStreams: true,
    }),
  };
}

function createSolverRunRequest() {
  return {
    requestId: "run-contract-request",
    runId: "run-contract",
    datasetId: "run-contract-dataset",
    appId: "photon",
    runKind: "causalRoots",
    claimLevel: "interactive-preview",
    precisionPath: "auto",
    configVersion: "solver-run-contract.v1",
    configHash: "solver-run-contract",
    model: createRunModel(),
    envelope: createRunEnvelope(),
    errorBudget: createRunErrorBudget(),
    config: {
      appId: "photon",
      rootRequest: request.request,
    },
    output: createRunOutputRequest(),
  };
}

function createSolverRunResponse() {
  return {
    runId: "run-contract",
    datasetId: "run-contract-dataset",
    manifest: createRunManifest(),
    summary: createRunSummary(),
    buffers: createRunBuffers(),
    streams: createRunStreams(),
    precision: createPrecisionSummaryFixture(),
    diagnostics: [
      {
        code: "ok",
        severity: "ok",
        message: "run contract fixture",
      },
    ],
    roots: response.response.roots,
    hits: response.response.hits,
    rootLedgerDetails: [createRootLedgerDetailFixture()],
    status: createStatusFixture("ok", "ok", "run response ready"),
  };
}

function createRunManifest() {
  return {
    schema: "solver-run-manifest.v1",
    manifestHash: "4444444444444444",
    requestId: "run-contract-request",
    runId: "run-contract",
    datasetId: "run-contract-dataset",
    appId: "photon",
    runKind: "causalRoots",
    claimLevel: "interactive-preview",
    configVersion: "solver-run-contract.v1",
    configHash: "solver-run-contract",
    model: createRunModel(),
    envelope: createRunEnvelope(),
    errorBudget: createRunErrorBudget(),
    requestedPrecisionPath: "auto",
    selectedPrecisionPath: "extended_precision",
    output: createRunOutputRequest(),
    admission: {
      decision: "escalate_precision",
      admitted: true,
      stressSummary: createAdmissionStressSummary(),
      statuses: [createStatusFixture("precision_escalated", "info", "extended precision selected")],
    },
    provenance: {
      apiVersion: "solver-app-bridge.v1",
      solverVersion: "architrino_solver 0.1.0",
      bridge: "js-wasm",
      wasmAbiVersion: "0.1.0",
      generatedAt: "2026-06-17T00:00:00.000Z",
    },
    deterministic: true,
    buffers: createRunManifestBuffers(),
    streams: createRunManifestStreams(),
    precision: createPrecisionSummaryFixture(),
    validationArtifacts: createRunValidationArtifactsFixture(),
    diagnostics: [
      {
        code: "ok",
        severity: "ok",
        message: "run manifest fixture",
      },
    ],
    status: createStatusFixture("ok", "ok", "run manifest ready"),
  };
}

function createRunValidationArtifactsFixture() {
  return {
    schema: "solver-run-validation-artifacts.v1",
    claimLevel: "interactive-preview",
    selectedPrecisionPath: "extended_precision",
    precisionReplayStatus: "matched",
    migrationParityStatus: "not-run",
    toleranceVector: createRunErrorBudget(),
    artifactHashes: {
      configHash: "solver-run-contract",
      bufferHashes: ["5555555555555555", "6666666666666666", "7777777777777777"],
      streamHashes: ["8888888888888888"],
      diagnosticHash: "9999999999999999",
      summaryHash: "aaaaaaaaaaaaaaaa",
      responseStatusHash: "bbbbbbbbbbbbbbbb",
    },
  };
}

function createRunModel() {
  return {
    modelId: "aaa.central-solver",
    equationVersion: "motion-root-v1",
    forceLawVersion: "causal-delay-v1",
    constantsHash: "constants:test",
    causalSpeedPolicy: "fixed-field-speed",
    branchPolicy: "all-positive-roots",
    unitConvention: "solver-si",
    compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
  };
}

function createRunEnvelope() {
  return {
    entityCount: 16,
    assemblyCount: 1,
    timeWindow: { start: 0, end: 10, stepHint: 0.01, units: "solver-time" },
    timeResolutionHint: 0.01,
    interactionPolicy: "neighbor-pruned",
    expectedBranchComplexity: "low",
    outputDetail: "playback",
    memoryBudgetBytes: 134217728,
    storageBudgetBytes: 536870912,
    latencyTarget: "background",
    simplificationPolicy: "none",
  };
}

function createRunErrorBudget() {
  return {
    globalTolerance: 1e-13,
    rootIsolationTolerance: 1e-14,
    delayedHitTolerance: 1e-13,
    integrationTolerance: 1e-12,
    streamEncodingTolerance: 1e-12,
    readbackTolerance: 1e-12,
    projectionTolerance: 1e-9,
    displayTolerance: 1e-6,
  };
}

function createRunOutputRequest() {
  return {
    outputs: ["rootLedger", "delayedHitEvents", "diagnostics"],
    streamTarget: "caller-buffer",
    memoryBudgetBytes: 67108864,
    deterministic: true,
  };
}

function createRunSummary() {
  return {
    runId: "run-contract",
    claimLevel: "interactive-preview",
    precisionPath: "extended_precision",
    rootCount: 1,
    eventCount: 1,
    status: createStatusFixture("ok", "ok", "run summary ready"),
  };
}

function createAdmissionStressSummary() {
  return {
    schema: "solver-admission-stress-summary.v1",
    entityCount: 16,
    estimatedPairCount: 240,
    entityPressure: 0.0016,
    interactionPressure: 0.0024,
    memoryPressure: 0.0001,
    timeStepCountEstimate: 1000,
    timeStepPressure: 0.01,
    outputPressure: 0.001,
    precisionPressure: 1,
    dominantStress: "precision",
    pressureScore: 1,
  };
}

function createRunBuffers() {
  return [
    {
      bufferId: "run-contract:root-ledger",
      layout: "root_ledger.v1",
      byteOffset: 0,
      byteLength: 112,
      rowCount: 1,
      numericType: "f64",
      checksum: "5555555555555555",
    },
    {
      bufferId: "run-contract:delayed-hit-events",
      layout: "delayed_hit_events.v1",
      byteOffset: 0,
      byteLength: 128,
      rowCount: 1,
      numericType: "f64",
      checksum: "6666666666666666",
    },
    {
      bufferId: "run-contract:root-ledger-detail",
      layout: "root_ledger_detail.v1",
      byteOffset: 0,
      byteLength: 192,
      rowCount: 1,
      numericType: "f64",
      checksum: "7777777777777777",
    },
  ];
}

function createRunManifestBuffers() {
  return createRunBuffers().map(({ byteOffset, ...buffer }) => buffer);
}

function createRunStreams() {
  return [
    {
      streamId: "run-contract:causal-root-transient",
      manifestVersion: "solver-stream-manifest.v1",
      indexLayout: "stream_index.v1",
      availableRanges: [
        {
          timeRange: { start: 10, end: 10 },
          frameRange: { start: 0, end: 0 },
          byteRange: { start: 0, end: 112 },
        },
        {
          timeRange: { start: 10, end: 10 },
          frameRange: { start: 0, end: 0 },
          byteRange: { start: 112, end: 240 },
        },
        {
          timeRange: { start: 10, end: 10 },
          frameRange: { start: 0, end: 0 },
          byteRange: { start: 240, end: 432 },
        },
      ],
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: 432,
      },
    },
  ];
}

function createRunManifestStreams() {
  return createRunStreams().map((stream) => ({
    streamId: stream.streamId,
    manifestVersion: stream.manifestVersion,
    indexLayout: stream.indexLayout,
    rangeCount: stream.availableRanges.length,
    storagePolicy: stream.storagePolicy,
  }));
}

function createStatusFixture(code, severity, message, extra = {}) {
  return {
    code,
    severity,
    message,
    recoverable: true,
    ...extra,
  };
}

function createPathHistoryStreamRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-stream-f64-request",
    requestId: "path-history-stream-contract-request",
    request: {
      runId: "path-history-contract-run",
      datasetId: "path-history-contract-dataset",
      streamId: "fixture-path-history-stream",
      pathRows: createPathHistoryRows(),
      rowsPerChunk: 2,
      storagePolicy: {
        target: "caller-buffer",
        durable: false,
        maxBytes: 1024,
      },
      metadata: {
        precisionPath: "scaled_f64_strict",
        units: "solver-si",
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "unit-test-scale",
        interpolationRule: "linear-segment",
        provenance: { fixture: "path-history-contract-fixture" },
        diagnostics: [
          {
            code: "ok",
            severity: "ok",
            message: "path history contract fixture",
          },
        ],
      },
    },
  };
}

function createPathHistoryStreamResponseEnvelope() {
  const metadata = createPathHistoryStreamMetadata();
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-stream-f64-response",
    requestId: "path-history-stream-contract-request",
    response: {
      schema: "solver-path-history-stream.v1",
      stream: {
        streamId: "fixture-path-history-stream",
        manifestVersion: "solver-stream-manifest.v1",
        indexLayout: "stream_index.v1",
        availableRanges: [
          {
            timeRange: { start: 0, end: 2 },
            frameRange: { start: 0, end: 1 },
            byteRange: { start: 0, end: 192 },
          },
          {
            timeRange: { start: 2, end: 3 },
            frameRange: { start: 2, end: 2 },
            byteRange: { start: 192, end: 288 },
          },
        ],
        storagePolicy: {
          target: "caller-buffer",
          durable: false,
          maxBytes: 288,
        },
        metadata,
      },
      buffers: [
        {
          bufferId: "fixture-path-history-stream:path-chunk-0",
          layout: "path_segment.v1",
          byteOffset: 0,
          byteLength: 192,
          rowCount: 2,
          numericType: "f64",
          checksum: "1111111111111111",
        },
        {
          bufferId: "fixture-path-history-stream:path-chunk-1",
          layout: "path_segment.v1",
          byteOffset: 0,
          byteLength: 96,
          rowCount: 1,
          numericType: "f64",
          checksum: "2222222222222222",
        },
      ],
      summary: {
        schema: "solver-path-history-stream-summary.v1",
        runId: "path-history-contract-run",
        datasetId: "path-history-contract-dataset",
        streamId: "fixture-path-history-stream",
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        rowSizeBytes: 96,
        pathIndexRowCount: 3,
        pathIndexedChunkCount: 2,
        timeRange: { start: 0, end: 3 },
        frameRange: { start: 0, end: 2 },
        storagePolicy: {
          target: "caller-buffer",
          durable: false,
          maxBytes: 288,
        },
        metadata,
      },
      status: {
        code: "ok",
        severity: "ok",
        message: "path-history stream created",
        recoverable: true,
      },
    },
  };
}

function createPathHistoryStreamMetadata() {
  return {
    schema: "solver-path-history-stream-metadata.v1",
    precisionPath: "scaled_f64_strict",
    units: "solver-si",
    coordinateFrame: "absolute-lab-frame",
    scaleNormalization: "unit-test-scale",
    interpolationRule: "linear-segment",
    provenance: { fixture: "path-history-contract-fixture" },
    diagnostics: [
      {
        code: "ok",
        severity: "ok",
        message: "path history contract fixture",
      },
    ],
  };
}

function createDescribeStreamRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "describe-stream-request",
    requestId: "describe-stream-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
    },
  };
}

function createDescribeStreamResponseEnvelope() {
  const metadata = createPathHistoryStreamMetadata();
  return {
    schema: "solver-app-bridge/v1",
    kind: "describe-stream-response",
    requestId: "describe-stream-contract-request",
    response: {
      schema: "solver-stream-description.v1",
      stream: {
        streamId: "fixture-path-history-stream",
        manifestVersion: "solver-stream-manifest.v1",
        indexLayout: "stream_index.v1",
        availableRanges: [
          {
            timeRange: { start: 0, end: 2 },
            frameRange: { start: 0, end: 1 },
            byteRange: { start: 0, end: 192 },
          },
          {
            timeRange: { start: 2, end: 3 },
            frameRange: { start: 2, end: 2 },
            byteRange: { start: 192, end: 288 },
          },
        ],
        storagePolicy: {
          target: "caller-buffer",
          durable: false,
          maxBytes: 288,
        },
        metadata,
      },
      buffers: [
        {
          bufferId: "fixture-path-history-stream:path-chunk-0",
          layout: "path_segment.v1",
          byteOffset: 0,
          byteLength: 192,
          rowCount: 2,
          numericType: "f64",
          checksum: "1111111111111111",
        },
        {
          bufferId: "fixture-path-history-stream:path-chunk-1",
          layout: "path_segment.v1",
          byteOffset: 0,
          byteLength: 96,
          rowCount: 1,
          numericType: "f64",
          checksum: "2222222222222222",
        },
      ],
      index: {
        schema: "solver-stream-index.v1",
        streamId: "fixture-path-history-stream",
        indexLayout: "stream_index.v1",
        chunkCount: 2,
        pathIndexRows: [
          {
            pathKey: 2000,
            chunkIndex: 0,
            rowOffset: 0,
            rowCount: 1,
            timeRange: { start: 0, end: 1 },
            frameRange: { start: 0, end: 0 },
            byteRange: { start: 0, end: 96 },
          },
          {
            pathKey: 2001,
            chunkIndex: 0,
            rowOffset: 1,
            rowCount: 1,
            timeRange: { start: 1, end: 2 },
            frameRange: { start: 1, end: 1 },
            byteRange: { start: 96, end: 192 },
          },
          {
            pathKey: 2000,
            chunkIndex: 1,
            rowOffset: 0,
            rowCount: 1,
            timeRange: { start: 2, end: 3 },
            frameRange: { start: 2, end: 2 },
            byteRange: { start: 192, end: 288 },
          },
        ],
      },
      status: {
        code: "ok",
        severity: "ok",
        message: "stream description read",
        recoverable: true,
      },
    },
  };
}

function createOpenStreamRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "open-stream-request",
    requestId: "open-stream-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      manifestPath: ".tmp/fixture-path-history-stream/stream-manifest.json",
      purpose: "diagnostics",
    },
  };
}

function createOpenStreamResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "open-stream-response",
    requestId: "open-stream-contract-request",
    response: {
      streamId: "fixture-path-history-stream",
      manifestVersion: "solver-stream-manifest.v1",
      readableLayouts: ["path_segment.v1"],
      availableRanges: [
        {
          timeRange: { start: 0, end: 2 },
          frameRange: { start: 0, end: 1 },
          byteRange: { start: 0, end: 192 },
        },
        {
          timeRange: { start: 2, end: 3 },
          frameRange: { start: 2, end: 2 },
          byteRange: { start: 192, end: 288 },
        },
      ],
    },
  };
}

function createReadStreamRangeRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "read-stream-range-request",
    requestId: "read-stream-range-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      chunkIndices: [0],
      pathKeys: [2000],
      timeRange: { start: 0, end: 3 },
      maxBytes: 96,
    },
  };
}

function createReadStreamRangeResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "read-stream-range-response",
    requestId: "read-stream-range-contract-request",
    response: {
      streamId: "fixture-path-history-stream",
      ranges: [
        {
          timeRange: { start: 0, end: 1 },
          frameRange: { start: 0, end: 0 },
          byteRange: { start: 0, end: 96 },
        },
      ],
      buffers: [
        {
          bufferId: "fixture-path-history-stream:path-chunk-0",
          layout: "path_segment.v1",
          byteOffset: 0,
          byteLength: 96,
          rowCount: 1,
          numericType: "f64",
          checksum: "3333333333333333",
        },
      ],
      diagnostics: [
        {
          code: "path_history_indexed_readback",
          severity: "info",
          message: "path-history indexed readback",
          stage: "stream_readback",
          details: {
            streamId: "fixture-path-history-stream",
            chunkIndex: 0,
            mode: "path-key-index",
            indexed: true,
            scannedRowCount: 2,
            selectedRowCount: 1,
            indexSkippedRowCount: 1,
          },
        },
      ],
      status: {
        code: "ok",
        severity: "ok",
        message: "stream range read",
        recoverable: true,
      },
    },
  };
}

function createEmissionShellCandidateFixture() {
  return {
    sourcePathKey: 2000,
    receiverPathKey: 2001,
    sourceSegmentIndex: 0,
    receiverSegmentIndex: 1,
    sourceChunkIndex: 0,
    receiverChunkIndex: 1,
    sourceRowOffset: 0,
    receiverRowOffset: 1,
    sourceTimeRange: { start: 0, end: 1 },
    receiverTimeRange: { start: 1, end: 2 },
    distanceLowerBound: 0,
    distanceUpperBound: 1,
    radiusLowerBound: 0,
    radiusUpperBound: 1,
    candidateKind: "broad_phase_possible",
    narrowPhaseEstimate: {
      method: "sampled_linear_segment_bisection.v1",
      classification: "sampled_hit",
      sampleCount: 16,
      hitTime: 1,
      emissionTime: 0,
      residual: 0,
    },
  };
}

function createEmissionShellCandidateResponseEnvelope() {
  const packetAResult = createEmissionShellPacketResult("packet-a", 0, "source:0:receiver:1", 1);
  const packetBResult = createEmissionShellPacketResult("packet-b", 1, "source:1:receiver:2", 0);
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-candidate-f64-response",
    requestId: "emission-shell-candidate-contract-response",
    response: {
      schema: "solver-emission-shell-candidates.v1",
      packetId: "packet-a",
      packetMergeOrder: 0,
      packetMergeKey: "source:0:receiver:1",
      packetResult: packetAResult,
      packetResults: [packetAResult, packetBResult],
      streamId: "fixture-path-history-stream",
      signalSpeed: 1,
      tolerance: 1e-12,
      pairCount: 1,
      rejectedPairCount: 0,
      candidateCount: 1,
      rejectionRate: 0,
      candidateRate: 1,
      falsePositiveEstimate: {
        method: "sampled_linear_segment_bisection.v1",
        testedCandidateCount: 1,
        estimatedTruePositiveCount: 1,
        estimatedFalsePositiveCount: 0,
        estimatedFalsePositiveRate: 0,
      },
      scanSummary: {
        schema: "solver-emission-shell-scan-summary.v1",
        executionPath: "packet_merge",
        streamChunkCount: 2,
        skippedChunkCount: 0,
        prunedByTimeChunkCount: 0,
        prunedByPathChunkCount: 0,
        pathIndexRowCount: 2,
        pathIndexedChunkCount: 2,
        indexSkippedRowCount: 0,
        scannedRowCount: 2,
        skippedRowCount: 0,
        uniqueMaterializedRowCount: 2,
        materializedRoleRowCount: 2,
        sourceRowCount: 1,
        receiverRowCount: 1,
        possiblePairUpperBound: 1,
        testedPairCount: 1,
        skippedPairCount: 0,
        rejectedPairCount: 0,
        candidateCount: 1,
        outputBufferCount: 2,
        outputByteLength: 152,
        requestedWorkerCount: 2,
        plannedWorkerCount: 1,
        truncated: false,
      },
      truncated: false,
      candidates: [createEmissionShellCandidateFixture()],
      buffers: [
        {
          bufferId: "packet-a:emission-shell-candidates",
          layout: "emission_shell_candidate.v1",
          byteOffset: 0,
          byteLength: 112,
          rowCount: 1,
          numericType: "f64",
          checksum: "aaaaaaaaaaaaaaaa",
        },
        {
          bufferId: "packet-a:emission-shell-narrow-phase",
          layout: "emission_shell_narrow_phase.v1",
          byteOffset: 0,
          byteLength: 40,
          rowCount: 1,
          numericType: "f64",
          checksum: "bbbbbbbbbbbbbbbb",
        },
      ],
      status: createStatusFixture("ok", "ok", "emission-shell packet response fixture"),
    },
  };
}

function createEmissionShellRootRefinementRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-root-refinement-f64-request",
    requestId: "emission-shell-root-refinement-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      candidates: [createEmissionShellCandidateFixture()],
      signalSpeed: 1,
      tolerance: 1e-12,
      rootTolerance: 1e-12,
      maxCandidates: 1,
      maxIterations: 96,
      scanSubdivisions: 64,
      maxRootsPerCandidate: 4,
      maxHitsPerCandidate: 4,
      workerCount: 2,
    },
  };
}

function createEmissionShellRootRefinementResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-root-refinement-f64-response",
    requestId: "emission-shell-root-refinement-contract-request",
    response: {
      schema: "solver-emission-shell-root-refinement.v1",
      streamId: "fixture-path-history-stream",
      signalSpeed: 1,
      tolerance: 1e-12,
      candidateCount: 1,
      processedCandidateCount: 1,
      attemptedCandidateCount: 1,
      skippedCandidateCount: 0,
      rootCount: 1,
      hitCount: 1,
      truncated: false,
      items: [
        {
          candidateIndex: 0,
          sourcePathKey: 2000,
          receiverPathKey: 2001,
          sourceChunkIndex: 0,
          receiverChunkIndex: 1,
          sourceRowOffset: 0,
          receiverRowOffset: 1,
          hitTime: 1,
          sampledEmissionTime: 0,
          rootOffset: 0,
          rootCount: 1,
          hitOffset: 0,
          hitCount: 1,
          status: createStatusFixture("ok", "ok", "emission-shell candidate root refined"),
        },
      ],
      roots: [response.response.roots[0]],
      hits: [response.response.hits[0]],
      buffers: [
        {
          bufferId: "emission-shell-refined-root-ledger",
          layout: "root_ledger.v1",
          byteOffset: 0,
          byteLength: 112,
          rowCount: 1,
          numericType: "f64",
          checksum: "cccccccccccccccc",
        },
        {
          bufferId: "emission-shell-refined-delayed-hits",
          layout: "delayed_hit_events.v1",
          byteOffset: 0,
          byteLength: 128,
          rowCount: 1,
          numericType: "f64",
          checksum: "dddddddddddddddd",
        },
      ],
      status: createStatusFixture("ok", "ok", "emission-shell root refinement completed"),
    },
  };
}

function createEmissionShellPacketResult(packetId, mergeOrder, mergeKey, rowCount) {
  return {
    packetId,
    mergeOrder,
    mergeKey,
    outputs: [
      {
        bufferId: `${packetId}:emission-shell-candidates`,
        layout: "emission_shell_candidate.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: rowCount * 112,
        rowOffset: 0,
        rowCount,
        checksum: rowCount === 0 ? "cbf29ce484222325" : "aaaaaaaaaaaaaaaa",
      },
      {
        bufferId: `${packetId}:emission-shell-narrow-phase`,
        layout: "emission_shell_narrow_phase.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: rowCount * 40,
        rowOffset: 0,
        rowCount,
        checksum: rowCount === 0 ? "cbf29ce484222325" : "bbbbbbbbbbbbbbbb",
      },
    ],
  };
}

function createPathHistoryRows() {
  return [
    {
      pathKey: 2000,
      segmentIndex: 0,
      startTime: 0,
      endTime: 1,
      start: { x: 0, y: 0, z: 0 },
      velocity: { x: 1, y: 0, z: 0 },
      errorBound: 1e-12,
      stateFlags: 1,
    },
    {
      pathKey: 2001,
      segmentIndex: 1,
      startTime: 1,
      endTime: 2,
      start: { x: 1, y: 0, z: 0 },
      velocity: { x: 1, y: 1, z: 0 },
      errorBound: 2e-12,
      stateFlags: 2,
    },
    {
      pathKey: 2000,
      segmentIndex: 2,
      startTime: 2,
      endTime: 3,
      start: { x: 2, y: 1, z: 0 },
      velocity: { x: 0, y: 1, z: 1 },
      errorBound: 3e-12,
      stateFlags: 3,
    },
  ];
}

function assertNonemptyString(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be nonempty`);
}

function assertPositiveInteger(value, label) {
  assert(Number.isInteger(value) && value > 0, `${label} must be a positive integer`);
}

function assertPositiveFinite(value, label) {
  assertFinite(value, label);
  assert(value > 0, `${label} must be positive`);
}

function assertFinite(value, label) {
  assert(typeof value === "number" && Number.isFinite(value), `${label} must be finite`);
}

function assertClose(actual, expected, label) {
  assert(Math.abs(actual - expected) <= 1e-10, `${label} expected ${expected} got ${actual}`);
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
