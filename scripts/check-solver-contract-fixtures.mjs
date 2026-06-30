#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const schemaPath = "src/contracts/solver-app-bridge/v1/schema.json";
const workerBridgePath = "src/solver/app/SolverAppWorkerBridge.mjs";
const bridgeContractPath = "src/solver/app/SolverAppBridgeContract.d.ts";
const requestPath = "src/solver/fixtures/causal-roots-f64-smoke.request.json";
const movingReceiverRequestPath = "src/solver/fixtures/causal-roots-moving-receiver-f64-smoke.request.json";
const batchResponsePath = "src/solver/fixtures/causal-root-batch-f64-smoke.response.json";
const responsePath = "src/solver/fixtures/roots-and-hits-f64-smoke.response.json";
const movingReceiverResponsePath =
  "src/solver/fixtures/roots-and-hits-moving-receiver-f64-smoke.response.json";

const schema = readJson(schemaPath);
const workerBridgeSource = fs.readFileSync(path.join(rootDir, workerBridgePath), "utf8");
const bridgeContractSource = fs.readFileSync(path.join(rootDir, bridgeContractPath), "utf8");
const request = readJson(requestPath);
const movingReceiverRequest = readJson(movingReceiverRequestPath);
const batchResponse = readJson(batchResponsePath);
const response = readJson(responsePath);
const movingReceiverResponse = readJson(movingReceiverResponsePath);

const ROOT_LEDGER_ROW_F64_BYTES = 176;
const DELAYED_HIT_ROW_F64_BYTES = 192;
const ROOT_LEDGER_DETAIL_ROW_F64_BYTES = 248;
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
const circularSourceCausalRootsRequest = createCircularSourceCausalRootsRequestEnvelope();
const circularSourceCausalRootsResponse = createCircularSourceCausalRootsResponseEnvelope();
const circularSourceRootsHitsLedgerRequest = createCircularSourceRootsHitsLedgerRequestEnvelope();
const circularSourceRootsHitsLedgerResponse = createCircularSourceRootsHitsLedgerResponseEnvelope();
const circularSourceRootsHitsLedgerNormalizedRequest =
  createCircularSourceRootsHitsLedgerNormalizedRequestEnvelope();
const circularSourceRootsHitsLedgerNormalizedResponse =
  createCircularSourceRootsHitsLedgerNormalizedResponseEnvelope();
const causalRootsPrecisionRequest = createCausalRootsPrecisionRequestEnvelope();
const causalRootsPrecisionResponse = createCausalRootsPrecisionResponseEnvelope();
const rootsAndHitsPrecisionRequest = createRootsAndHitsPrecisionRequestEnvelope();
const rootsAndHitsPrecisionResponse = createRootsAndHitsPrecisionResponseEnvelope();
const rootLedgerDetailRequest = createRootLedgerDetailRequestEnvelope();
const rootLedgerDetailResponse = createRootLedgerDetailResponseEnvelope();
const precisionDiagnosticRequest = createPrecisionDiagnosticRequestEnvelope();
const precisionDiagnosticResponse = createPrecisionDiagnosticResponseEnvelope();
const errorBudgetPropagationRequest = createErrorBudgetPropagationRequestEnvelope();
const errorBudgetPropagationResponse = createErrorBudgetPropagationResponseEnvelope();
const rootHitInvariantRequest = createRootHitInvariantRequestEnvelope();
const rootHitInvariantResponse = createRootHitInvariantResponseEnvelope();
const rootLedgerTransitionRequest = createRootLedgerTransitionRequestEnvelope();
const rootLedgerTransitionResponse = createRootLedgerTransitionResponseEnvelope();
const causalRootBatchRequest = createCausalRootBatchRequestEnvelope();
const linearMotionSampleRequest = createLinearMotionSampleRequestEnvelope();
const linearMotionSampleResponse = createLinearMotionSampleResponseEnvelope();
const phaseAtHitRequest = createPhaseAtHitRequestEnvelope();
const phaseAtHitResponse = createPhaseAtHitResponseEnvelope();
const phaseAtHitSummaryRequest = createPhaseAtHitSummaryRequestEnvelope();
const phaseAtHitSummaryResponse = createPhaseAtHitSummaryResponseEnvelope();
const sharedGeometryRequest = createSharedGeometryRequestEnvelope();
const sharedGeometryResponse = createSharedGeometryResponseEnvelope();
const assemblyMembershipEventsRequest = createAssemblyMembershipEventsRequestEnvelope();
const assemblyMembershipEventsResponse = createAssemblyMembershipEventsResponseEnvelope();
const assemblyGraphDatasetRequest = createAssemblyGraphDatasetRequestEnvelope();
const assemblyGraphDatasetResponse = createAssemblyGraphDatasetResponseEnvelope();
const assemblyGraphStoreRequest = createAssemblyGraphStoreRequestEnvelope();
const assemblyGraphStoreResponse = createAssemblyGraphStoreResponseEnvelope();
const describeAssemblyGraphStoreRequest = createDescribeAssemblyGraphStoreRequestEnvelope();
const assemblyGraphStoreDescriptionResponse = createAssemblyGraphStoreDescriptionResponseEnvelope();
const assemblyGraphStoreReadRequest = createAssemblyGraphStoreReadRequestEnvelope();
const assemblyGraphStoreReadResponse = createAssemblyGraphStoreReadResponseEnvelope();
const buildSpaceTimeIndexRequest = createBuildSpaceTimeIndexRequestEnvelope();
const buildPathHistoryStreamSpaceTimeIndexRequest = createBuildPathHistoryStreamSpaceTimeIndexRequestEnvelope();
const spaceTimeIndexResponse = createSpaceTimeIndexResponseEnvelope();
const querySpaceTimeIndexRequest = createQuerySpaceTimeIndexRequestEnvelope();
const motionIntegrationRequest = createMotionIntegrationRequestEnvelope();
const motionIntegrationResponse = createMotionIntegrationResponseEnvelope();
const pathHistoryStreamRequest = createPathHistoryStreamRequestEnvelope();
const pathHistoryStreamResponse = createPathHistoryStreamResponseEnvelope();
const runSimulationRequest = createRunSimulationRequestEnvelope();
const runSimulationNormalizedRequest = createRunSimulationNormalizedRequestEnvelope();
const runSimulationResponse = createRunSimulationResponseEnvelope();
const pairInteractionRunSimulationRequest = createPairInteractionRunSimulationRequestEnvelope();
const pairInteractionRunSimulationResponse = createPairInteractionRunSimulationResponseEnvelope();
const describeRunRequest = createDescribeRunRequestEnvelope();
const describeRunResponse = createDescribeRunResponseEnvelope();
const cancelRunRequest = createCancelRunRequestEnvelope();
const cancelRunResponse = createCancelRunResponseEnvelope();
const closeRunRequest = createCloseRunRequestEnvelope();
const closeRunResponse = createCloseRunResponseEnvelope();
const describeStreamRequest = createDescribeStreamRequestEnvelope();
const describeStreamResponse = createDescribeStreamResponseEnvelope();
const pathHistoryDynamicReplayValidationRequest = createPathHistoryDynamicReplayValidationRequestEnvelope();
const pathHistoryDynamicReplayValidationResponse = createPathHistoryDynamicReplayValidationResponseEnvelope();
const openStreamRequest = createOpenStreamRequestEnvelope();
const openStreamResponse = createOpenStreamResponseEnvelope();
const readStreamRangeRequest = createReadStreamRangeRequestEnvelope();
const readStreamRangeResponse = createReadStreamRangeResponseEnvelope();
const pathHistoryStorageLifecycleRequest = createPathHistoryStorageLifecycleRequestEnvelope();
const pathHistoryStorageLifecycleResponse = createPathHistoryStorageLifecycleResponseEnvelope();
const pathHistoryStorageLifecycleApplyRequest = createPathHistoryStorageLifecycleApplyRequestEnvelope();
const pathHistoryStorageLifecycleApplyResponse = createPathHistoryStorageLifecycleApplyResponseEnvelope();
const workPacketHeader = createWorkPacketHeaderEnvelope();
const workPacketHeaderResponse = createWorkPacketHeaderResponseEnvelope();
const workPacketResultOrderRequest = createWorkPacketResultOrderRequestEnvelope();
const workPacketResultOrderResponse = createWorkPacketResultOrderResponseEnvelope();
const emissionShellCandidatePacketMergeRequest = createEmissionShellCandidatePacketMergeRequestEnvelope();
const pathHistoryWorkPacketPlanRequest = createPathHistoryWorkPacketPlanRequestEnvelope();
const pathHistoryWorkPacketPlanResponse = createPathHistoryWorkPacketPlanResponseEnvelope();
const emissionShellCandidateRequest = createEmissionShellCandidateRequestEnvelope();
const emissionShellCandidatePacketRequest = createEmissionShellCandidatePacketRequestEnvelope();
const emissionShellCandidatePacketsRequest = createEmissionShellCandidatePacketsRequestEnvelope();
const emissionShellCandidateResponse = createEmissionShellCandidateResponseEnvelope();
const emissionShellRootRefinementRequest = createEmissionShellRootRefinementRequestEnvelope();
const emissionShellRootRefinementResponse = createEmissionShellRootRefinementResponseEnvelope();
const workerRequestMessage = createWorkerRequestMessage();
const workerResponseMessage = createWorkerResponseMessage();
const workerErrorMessage = createWorkerErrorMessage();
const schemaFixtures = [
  ["worker request message", "solverAppWorkerRequestMessage", workerRequestMessage],
  ["worker response message", "solverAppWorkerResponseMessage", workerResponseMessage],
  ["worker error message", "solverAppWorkerErrorMessage", workerErrorMessage],
  ["causal roots request", "causalRootsF64RequestEnvelope", request],
  ["moving-receiver causal roots request", "causalRootsF64RequestEnvelope", movingReceiverRequest],
  ["init request", "initRequestEnvelope", initRequest],
  ["init response", "initResponseEnvelope", initResponse],
  ["capabilities request", "capabilitiesRequestEnvelope", capabilitiesRequest],
  ["capabilities response", "capabilitiesResponseEnvelope", capabilitiesResponse],
  ["threading plan request", "threadingPlanRequestEnvelope", threadingPlanRequest],
  ["threading plan response", "threadingPlanResponseEnvelope", threadingPlanResponse],
  ["admission request", "admissionRequestEnvelope", admissionRequest],
  ["admission response", "admissionResponseEnvelope", admissionResponse],
  ["causal roots response", "causalRootsF64ResponseEnvelope", causalRootsResponse],
  ["normalized causal roots request", "causalRootsNormalizedF64RequestEnvelope", causalRootsNormalizedRequest],
  ["normalized causal roots response", "causalRootsNormalizedF64ResponseEnvelope", causalRootsNormalizedResponse],
  ["circular-source causal roots request", "circularSourceCausalRootsF64RequestEnvelope", circularSourceCausalRootsRequest],
  ["circular-source causal roots response", "circularSourceCausalRootsF64ResponseEnvelope", circularSourceCausalRootsResponse],
  [
    "circular-source roots/hits/ledger request",
    "circularSourceRootsHitsLedgerF64RequestEnvelope",
    circularSourceRootsHitsLedgerRequest,
  ],
  [
    "circular-source roots/hits/ledger response",
    "circularSourceRootsHitsLedgerF64ResponseEnvelope",
    circularSourceRootsHitsLedgerResponse,
  ],
  [
    "normalized circular-source roots/hits/ledger request",
    "circularSourceRootsHitsLedgerNormalizedF64RequestEnvelope",
    circularSourceRootsHitsLedgerNormalizedRequest,
  ],
  [
    "normalized circular-source roots/hits/ledger response",
    "circularSourceRootsHitsLedgerNormalizedF64ResponseEnvelope",
    circularSourceRootsHitsLedgerNormalizedResponse,
  ],
  ["precision causal roots request", "causalRootsPrecisionF64RequestEnvelope", causalRootsPrecisionRequest],
  ["precision causal roots response", "causalRootsPrecisionF64ResponseEnvelope", causalRootsPrecisionResponse],
  ["precision roots-and-hits request", "rootsAndHitsPrecisionF64RequestEnvelope", rootsAndHitsPrecisionRequest],
  ["precision roots-and-hits response", "rootsAndHitsPrecisionF64ResponseEnvelope", rootsAndHitsPrecisionResponse],
  ["root-ledger detail request", "rootLedgerDetailF64RequestEnvelope", rootLedgerDetailRequest],
  ["root-ledger detail response", "rootLedgerDetailF64ResponseEnvelope", rootLedgerDetailResponse],
  ["precision diagnostic request", "precisionDiagnosticF64RequestEnvelope", precisionDiagnosticRequest],
  ["precision diagnostic response", "precisionDiagnosticF64ResponseEnvelope", precisionDiagnosticResponse],
  ["error-budget propagation request", "errorBudgetPropagationF64RequestEnvelope", errorBudgetPropagationRequest],
  ["error-budget propagation response", "errorBudgetPropagationF64ResponseEnvelope", errorBudgetPropagationResponse],
  ["root-hit invariant request", "rootHitInvariantF64RequestEnvelope", rootHitInvariantRequest],
  ["root-hit invariant response", "rootHitInvariantF64ResponseEnvelope", rootHitInvariantResponse],
  ["root-ledger transition request", "rootLedgerTransitionF64RequestEnvelope", rootLedgerTransitionRequest],
  ["root-ledger transition response", "rootLedgerTransitionF64ResponseEnvelope", rootLedgerTransitionResponse],
  ["causal-root batch request", "causalRootBatchF64RequestEnvelope", causalRootBatchRequest],
  ["linear motion sample request", "linearMotionSampleF64RequestEnvelope", linearMotionSampleRequest],
  ["linear motion sample response", "linearMotionSampleF64ResponseEnvelope", linearMotionSampleResponse],
  ["phase-at-hit request", "phaseAtHitF64RequestEnvelope", phaseAtHitRequest],
  ["phase-at-hit response", "phaseAtHitF64ResponseEnvelope", phaseAtHitResponse],
  ["phase-at-hit summary request", "phaseAtHitSummaryF64RequestEnvelope", phaseAtHitSummaryRequest],
  ["phase-at-hit summary response", "phaseAtHitSummaryF64ResponseEnvelope", phaseAtHitSummaryResponse],
  ["shared geometry request", "sharedGeometryF64RequestEnvelope", sharedGeometryRequest],
  ["shared geometry response", "sharedGeometryF64ResponseEnvelope", sharedGeometryResponse],
  [
    "assembly membership events request",
    "assemblyMembershipEventsF64RequestEnvelope",
    assemblyMembershipEventsRequest,
  ],
  [
    "assembly membership events response",
    "assemblyMembershipEventsF64ResponseEnvelope",
    assemblyMembershipEventsResponse,
  ],
  ["assembly graph dataset request", "assemblyGraphDatasetF64RequestEnvelope", assemblyGraphDatasetRequest],
  ["assembly graph dataset response", "assemblyGraphDatasetF64ResponseEnvelope", assemblyGraphDatasetResponse],
  ["assembly graph store request", "assemblyGraphStoreF64RequestEnvelope", assemblyGraphStoreRequest],
  ["assembly graph store response", "assemblyGraphStoreF64ResponseEnvelope", assemblyGraphStoreResponse],
  [
    "describe assembly graph store request",
    "describeAssemblyGraphStoreF64RequestEnvelope",
    describeAssemblyGraphStoreRequest,
  ],
  [
    "assembly graph store description response",
    "assemblyGraphStoreDescriptionF64ResponseEnvelope",
    assemblyGraphStoreDescriptionResponse,
  ],
  ["assembly graph store read request", "assemblyGraphStoreReadF64RequestEnvelope", assemblyGraphStoreReadRequest],
  ["assembly graph store read response", "assemblyGraphStoreReadF64ResponseEnvelope", assemblyGraphStoreReadResponse],
  ["build spacetime index request", "buildSpaceTimeIndexF64RequestEnvelope", buildSpaceTimeIndexRequest],
  [
    "build path-history stream spacetime index request",
    "buildPathHistoryStreamSpaceTimeIndexF64RequestEnvelope",
    buildPathHistoryStreamSpaceTimeIndexRequest,
  ],
  ["spacetime index response", "spaceTimeIndexF64ResponseEnvelope", spaceTimeIndexResponse],
  ["query spacetime index request", "querySpaceTimeIndexF64RequestEnvelope", querySpaceTimeIndexRequest],
  ["motion integration request", "motionIntegrationF64RequestEnvelope", motionIntegrationRequest],
  ["motion integration response", "motionIntegrationF64ResponseEnvelope", motionIntegrationResponse],
  ["causal-root batch response", "causalRootBatchF64ResponseEnvelope", batchResponse],
  ["roots-and-hits response", "rootsAndHitsF64ResponseEnvelope", response],
  ["moving-receiver roots-and-hits response", "rootsAndHitsF64ResponseEnvelope", movingReceiverResponse],
  ["run simulation request", "runSimulationRequestEnvelope", runSimulationRequest],
  ["normalized run simulation request", "runSimulationRequestEnvelope", runSimulationNormalizedRequest],
  ["run simulation response", "runSimulationResponseEnvelope", runSimulationResponse],
  ["pair interaction run simulation request", "runSimulationRequestEnvelope", pairInteractionRunSimulationRequest],
  ["pair interaction run simulation response", "runSimulationResponseEnvelope", pairInteractionRunSimulationResponse],
  ["describe run request", "describeRunRequestEnvelope", describeRunRequest],
  ["describe run response", "describeRunResponseEnvelope", describeRunResponse],
  ["cancel run request", "cancelRunRequestEnvelope", cancelRunRequest],
  ["cancel run response", "cancelRunResponseEnvelope", cancelRunResponse],
  ["close run request", "closeRunRequestEnvelope", closeRunRequest],
  ["close run response", "closeRunResponseEnvelope", closeRunResponse],
  ["path-history stream request", "pathHistoryStreamF64RequestEnvelope", pathHistoryStreamRequest],
  ["path-history stream response", "pathHistoryStreamF64ResponseEnvelope", pathHistoryStreamResponse],
  ["describe stream request", "describeStreamRequestEnvelope", describeStreamRequest],
  ["describe stream response", "describeStreamResponseEnvelope", describeStreamResponse],
  [
    "path-history dynamic replay validation request",
    "pathHistoryDynamicReplayValidationRequestEnvelope",
    pathHistoryDynamicReplayValidationRequest,
  ],
  [
    "path-history dynamic replay validation response",
    "pathHistoryDynamicReplayValidationResponseEnvelope",
    pathHistoryDynamicReplayValidationResponse,
  ],
  ["open stream request", "openStreamRequestEnvelope", openStreamRequest],
  ["open stream response", "openStreamResponseEnvelope", openStreamResponse],
  ["read stream range request", "readStreamRangeRequestEnvelope", readStreamRangeRequest],
  ["read stream range response", "readStreamRangeResponseEnvelope", readStreamRangeResponse],
  [
    "path-history storage lifecycle request",
    "pathHistoryStorageLifecycleRequestEnvelope",
    pathHistoryStorageLifecycleRequest,
  ],
  [
    "path-history storage lifecycle response",
    "pathHistoryStorageLifecycleResponseEnvelope",
    pathHistoryStorageLifecycleResponse,
  ],
  [
    "path-history storage lifecycle apply request",
    "pathHistoryStorageLifecycleApplyRequestEnvelope",
    pathHistoryStorageLifecycleApplyRequest,
  ],
  [
    "path-history storage lifecycle apply response",
    "pathHistoryStorageLifecycleApplyResponseEnvelope",
    pathHistoryStorageLifecycleApplyResponse,
  ],
  ["work packet header", "workPacketHeaderEnvelope", workPacketHeader],
  ["work packet header response", "workPacketHeaderResponseEnvelope", workPacketHeaderResponse],
  ["work packet result order request", "workPacketResultOrderRequestEnvelope", workPacketResultOrderRequest],
  ["work packet result order response", "workPacketResultOrderResponseEnvelope", workPacketResultOrderResponse],
  [
    "emission-shell candidate packet merge request",
    "emissionShellCandidatePacketMergeF64RequestEnvelope",
    emissionShellCandidatePacketMergeRequest,
  ],
  [
    "path-history work packet plan request",
    "pathHistoryWorkPacketPlanRequestEnvelope",
    pathHistoryWorkPacketPlanRequest,
  ],
  [
    "path-history work packet plan response",
    "pathHistoryWorkPacketPlanResponseEnvelope",
    pathHistoryWorkPacketPlanResponse,
  ],
  ["emission-shell candidate request", "emissionShellCandidateF64RequestEnvelope", emissionShellCandidateRequest],
  [
    "emission-shell candidate packet request",
    "emissionShellCandidatePacketF64RequestEnvelope",
    emissionShellCandidatePacketRequest,
  ],
  [
    "emission-shell candidate packets request",
    "emissionShellCandidatePacketsF64RequestEnvelope",
    emissionShellCandidatePacketsRequest,
  ],
  ["emission-shell candidate response", "emissionShellCandidateF64ResponseEnvelope", emissionShellCandidateResponse],
  [
    "emission-shell root refinement request",
    "emissionShellRootRefinementF64RequestEnvelope",
    emissionShellRootRefinementRequest,
  ],
  [
    "emission-shell root refinement response",
    "emissionShellRootRefinementF64ResponseEnvelope",
    emissionShellRootRefinementResponse,
  ],
];

assert(schema.$id === "https://architrino.local/contracts/solver-app-bridge/v1/schema.json", "schema id mismatch");
assert(schema.$defs?.initRequest, "init request schema missing");
assert(schema.$defs?.solverAppWorkerMethod, "worker method schema missing");
assert(schema.$defs?.solverAppWorkerRequestMessage, "worker request message schema missing");
assert(schema.$defs?.solverAppWorkerResponseMessage, "worker response message schema missing");
assert(schema.$defs?.solverAppWorkerErrorMessage, "worker error message schema missing");
assert(schema.$defs?.initResponse, "init response schema missing");
assert(schema.$defs?.solverCapabilities, "solver capabilities schema missing");
assert(schema.$defs?.binaryLayoutCatalog, "binary layout catalog schema missing");
assert(schema.$defs?.binaryLayoutDescriptor, "binary layout descriptor schema missing");
assert(schema.$defs?.solverStoragePolicy, "solver storage policy schema missing");
assert(schema.$defs?.solverStorageCapability, "solver storage capability schema missing");
assert(schema.$defs?.solverThreadingCapability, "solver threading capability schema missing");
assert(schema.$defs?.appBridgeCapability, "app bridge capability schema missing");
assert(schema.$defs?.appAdapterCapability, "app adapter capability schema missing");
assert(schema.$defs?.statusTaxonomyCapability, "status taxonomy capability schema missing");
assert(schema.$defs?.statusTaxonomyCode, "status taxonomy code schema missing");
assert(schema.$defs?.streamQueryCapability, "stream query capability schema missing");
assert(schema.$defs?.workPacketCapability, "work packet capability schema missing");
assert(schema.$defs?.solverValidationCapability, "solver validation capability schema missing");
assert(schema.$defs?.solverAbiInfo, "solver ABI info schema missing");
assert(schema.$defs?.threadingPolicy, "threading policy schema missing");
assert(schema.$defs?.threadingWorkload, "threading workload schema missing");
assert(schema.$defs?.threadingWorkloadObservations, "threading workload observations schema missing");
assert(schema.$defs?.threadingPlanRequest, "threading plan request schema missing");
assert(schema.$defs?.threadingPlanResponse, "threading plan response schema missing");
assert(schema.$defs?.threadingContentionDiagnostics, "threading contention diagnostics schema missing");
assert(schema.$defs?.threadingChunkTimingSummary, "threading chunk timing summary schema missing");
assert(schema.$defs?.threadingStageSpeedupSummary, "threading stage speedup summary schema missing");
assert(schema.$defs?.capabilityEnvelope, "capability envelope schema missing");
assert(schema.$defs?.admissionRequest, "admission request schema missing");
assert(schema.$defs?.admissionResponse, "admission response schema missing");
assert(
  schema.$defs.admissionResponse.properties.decision.enum.includes("simplify") &&
    schema.$defs.runManifestAdmission.properties.decision.enum.includes("simplify"),
  "admission simplify decision schema missing"
);
assert(schema.$defs?.causalRootsF64Request, "request schema missing");
assert(schema.$defs?.causalRootsF64Response, "causal roots response schema missing");
assert(schema.$defs?.causalRootsNormalizedF64Request, "normalized causal roots request schema missing");
assert(schema.$defs?.causalRootsNormalizedF64Response, "normalized causal roots response schema missing");
assert(schema.$defs?.normalizedCausalRootF64, "normalized causal root schema missing");
assert(schema.$defs?.absoluteDisplayCausalRootF64, "absolute-display causal root schema missing");
assert(
  schema.$defs?.circularSourceCausalRootsF64RequestEnvelope,
  "circular-source root-only request envelope schema missing"
);
assert(
  schema.$defs?.circularSourceCausalRootsF64ResponseEnvelope,
  "circular-source root-only response envelope schema missing"
);
assert(
  schema.$defs?.circularSourceRootsHitsLedgerF64RequestEnvelope,
  "circular-source direct request envelope schema missing"
);
assert(
  schema.$defs?.circularSourceRootsHitsLedgerF64ResponseEnvelope,
  "circular-source direct response envelope schema missing"
);
assert(
  schema.$defs?.circularSourceRootsHitsLedgerNormalizedF64RequestEnvelope,
  "normalized circular-source request envelope schema missing"
);
assert(
  schema.$defs?.circularSourceRootsHitsLedgerNormalizedF64ResponseEnvelope,
  "normalized circular-source response envelope schema missing"
);
assert(schema.$defs?.circularSourceCausalRootsF64Request, "circular-source root request schema missing");
assert(
  schema.$defs?.circularSourceRootsHitsLedgerF64Response,
  "circular-source roots-hits-ledger response schema missing"
);
assert(
  schema.$defs?.circularSourceRootsHitsLedgerNormalizedF64Request,
  "normalized circular-source roots-hits-ledger request schema missing"
);
assert(
  schema.$defs?.circularSourceRootsHitsLedgerNormalizedF64Response,
  "normalized circular-source roots-hits-ledger response schema missing"
);
assert(schema.$defs?.causalRootsPrecisionF64Request, "precision causal roots request schema missing");
assert(schema.$defs?.causalRootsPrecisionF64Response, "precision causal roots response schema missing");
assert(schema.$defs?.rootsAndHitsPrecisionF64Response, "precision roots-and-hits response schema missing");
assert(schema.$defs?.precisionSolveSummaryF64, "precision solve summary schema missing");
assert(schema.$defs?.precisionEscalationRecord, "precision escalation record schema missing");
assert(schema.$defs?.runPrecisionMetadata, "run precision metadata schema missing");
assert(schema.$defs?.rootLedgerDetailF64Request, "root-ledger detail request schema missing");
assert(schema.$defs?.rootLedgerDetailF64Response, "root-ledger detail response schema missing");
assert(schema.$defs?.rootLedgerDetailF64, "root-ledger detail row schema missing");
for (const field of [
  "residualScale",
  "absoluteResidual",
  "normalizedResidual",
  "rootTolerance",
  "firstFailureCode",
]) {
  assert(schema.$defs.rootLedgerDetailF64.required.includes(field), `root-ledger detail ${field} required`);
  assert(schema.$defs.rootLedgerDetailF64.properties[field], `root-ledger detail ${field} schema missing`);
}
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
assert(schema.$defs?.numericChartId, "numeric chart schema missing");
assert(
  schema.$defs.numericChartId.enum.includes("direction_log_magnitude"),
  "numeric chart schema missing direction log magnitude"
);
assert(schema.$defs?.numericSerializationDescriptor, "numeric serialization descriptor schema missing");
assert(schema.$defs?.numericChartDescriptor, "numeric chart descriptor schema missing");
assert(schema.$defs?.numericSerializationContract, "numeric serialization contract schema missing");
assert(schema.$defs?.precisionRoutingCapability, "precision routing capability schema missing");
assert(schema.$defs?.precisionRouteCapability, "precision route capability schema missing");
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
assert(schema.$defs?.phaseAtHitMetadataF64, "phase-at-hit metadata schema missing");
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
assert(schema.$defs?.pathHistoryStreamContractArtifacts, "path-history stream contract artifacts schema missing");
assert(schema.$defs?.pathHistoryStreamContractManifest, "path-history stream contract manifest schema missing");
assert(schema.$defs?.pathHistoryLogicalStreamTable, "path-history logical stream table schema missing");
assert(schema.$defs?.pathHistoryChunkRecord, "path-history contract chunk record schema missing");
assert(schema.$defs?.pathHistoryEncodingDictionary, "path-history encoding dictionary schema missing");
assert(schema.$defs?.pathHistoryEventStore, "path-history event store schema missing");
assert(schema.$defs?.pathHistoryEventRecord, "path-history event record schema missing");
assert(schema.$defs?.pathHistoryContractSummaryRecord, "path-history contract summary record schema missing");
assert(schema.$defs?.pathHistoryStreamMemoryBudget, "path-history stream memory budget schema missing");
assert(schema.$defs?.pathHistoryChecksumPolicy, "path-history checksum policy schema missing");
assert(
  schema.$defs?.pathHistoryStreamContractFixtureEvidence,
  "path-history stream contract fixture evidence schema missing"
);
assert(schema.$defs?.pathHistoryDynamicReplayMetadata, "path-history dynamic replay metadata schema missing");
assert(schema.$defs?.pathHistoryDynamicReplayValidationRequest, "path-history dynamic replay request schema missing");
assert(schema.$defs?.pathHistoryDynamicReplayValidationResponse, "path-history dynamic replay response schema missing");
assert(schema.$defs?.pathHistoryDynamicReplayValidationMismatch, "path-history dynamic replay mismatch schema missing");
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
assert(
  schema.$defs.pathHistoryStorageLifecycleRequest.anyOf?.length === 3,
  "path-history lifecycle request source selector schema missing"
);
assert(
  schema.$defs.pathHistoryStorageLifecycleRequestEnvelope.properties.request.$ref ===
    "#/$defs/pathHistoryStorageLifecycleRequest",
  "path-history lifecycle request envelope points at wrong schema"
);
assert(schema.$defs?.pathHistoryStorageLifecycleResponse, "path-history lifecycle response schema missing");
assert(schema.$defs?.pathHistoryStorageLifecycleApplyRequest, "path-history lifecycle apply request schema missing");
assert(
  schema.$defs.pathHistoryStorageLifecycleApplyRequest.properties.deleteStreamWhenAllChunksDeleted?.type ===
    "boolean",
  "path-history lifecycle apply cleanup flag schema missing"
);
assert(
  schema.$defs.pathHistoryStorageLifecycleApplyRequestEnvelope.properties.request.$ref ===
    "#/$defs/pathHistoryStorageLifecycleApplyRequest",
  "path-history lifecycle apply request envelope points at wrong schema"
);
assert(schema.$defs?.pathHistoryStorageLifecycleApplyResponse, "path-history lifecycle apply response schema missing");
assert(schema.$defs?.pathHistoryStorageLifecycleCleanup, "path-history lifecycle cleanup schema missing");
assert(
  schema.$defs.pathHistoryStorageLifecycleApplyResponse.properties.cleanup?.$ref ===
    "#/$defs/pathHistoryStorageLifecycleCleanup",
  "path-history lifecycle apply cleanup response schema missing"
);
assert(schema.$defs?.pathHistoryStorageLifecycleMetadata, "path-history lifecycle metadata schema missing");
assert(schema.$defs?.pathHistoryDeepIndexMetadata, "path-history deep-index metadata schema missing");
assert(schema.$defs?.pathHistoryStorageLifecycleSummary, "path-history lifecycle summary schema missing");
assert(schema.$defs?.pathHistoryStorageTierCounts, "path-history lifecycle tier-count schema missing");
assert(schema.$defs?.pathHistoryStorageActionCounts, "path-history lifecycle action-count schema missing");
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
assert(schema.$defs?.emissionShellIndexedBroadPhaseOptions, "emission-shell index options schema missing");
assert(
  schema.$defs?.emissionShellCandidateF64ResponseEnvelope,
  "emission-shell candidate response envelope schema missing"
);
assert(schema.$defs?.emissionShellCandidateF64Response, "emission-shell candidate response schema missing");
assert(
  schema.$defs?.emissionShellIndexedBroadPhaseSummary,
  "emission-shell indexed broad-phase summary schema missing"
);
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
assert(
  schema.$defs.emissionShellCandidateF64Response.properties.indexSummary.$ref ===
    "#/$defs/emissionShellIndexedBroadPhaseSummary",
  "emission-shell index summary response schema mismatch"
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
  "field_shell_events.v1",
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
  "pairInteraction",
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
  "solveCausalRootsF64",
  "solveCircularSourceCausalRootsF64",
  "solveCircularSourceRootsHitsLedgerF64",
  "solveCircularSourceRootsHitsLedgerNormalizedF64",
  "solveMovingCircularSourceCausalRootsF64",
  "solveMovingCircularSameSourceCausalRootsF64",
  "computeMovingCircularObserverFieldF64",
  "solveCausalRootsPrecisionF64",
  "solveRootsAndHitsPrecisionF64",
  "solveCausalRootsNormalizedF64",
  "buildAssemblyGraphDatasetF64",
  "createAssemblyGraphStoreF64",
  "describeAssemblyGraphStoreF64",
  "readAssemblyGraphStoreRangeF64",
  "buildPathHistoryStreamSpaceTimeIndexF64",
  "stepT3UniverseF64",
  "integrateConstantAccelerationMotionF64",
  "createPathHistoryStreamF64",
  "applyPathHistoryStorageLifecycleF64",
  "validatePathHistoryDynamicReplayF64",
  "queryEmissionShellCandidatePacketsF64",
  "refineEmissionShellCandidateRootsF64",
  "readStreamRange",
  "cancelRun",
  "dispose",
]);

assertTopLevelSchemaFixtureCoverage(schemaFixtures);
validateSchemaFixtures(schemaFixtures);

validateWorkerRequestMessage(workerRequestMessage);
validateWorkerResponseMessage(workerResponseMessage);
validateWorkerErrorMessage(workerErrorMessage);
validateRequestEnvelope(request);
validateRequestEnvelope(movingReceiverRequest);
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
validateCircularSourceCausalRootsRequestEnvelope(circularSourceCausalRootsRequest);
validateCircularSourceCausalRootsResponseEnvelope(circularSourceCausalRootsResponse);
validateCircularSourceRootsHitsLedgerRequestEnvelope(circularSourceRootsHitsLedgerRequest);
validateCircularSourceRootsHitsLedgerResponseEnvelope(circularSourceRootsHitsLedgerResponse);
validateCircularSourceRootsHitsLedgerNormalizedRequestEnvelope(circularSourceRootsHitsLedgerNormalizedRequest);
validateCircularSourceRootsHitsLedgerNormalizedResponseEnvelope(circularSourceRootsHitsLedgerNormalizedResponse);
validateCausalRootsPrecisionRequestEnvelope(causalRootsPrecisionRequest);
validateCausalRootsPrecisionResponseEnvelope(causalRootsPrecisionResponse);
validateRootsAndHitsPrecisionRequestEnvelope(rootsAndHitsPrecisionRequest);
validateRootsAndHitsPrecisionResponseEnvelope(rootsAndHitsPrecisionResponse);
validateMotionIntegrationRequestEnvelope(motionIntegrationRequest);
validateMotionIntegrationResponseEnvelope(motionIntegrationResponse);
validateBatchResponseEnvelope(batchResponse);
validateResponseEnvelope(response);
validateResponseEnvelope(movingReceiverResponse, {
  emissionTime: 5,
  distance: 5,
  hitStrength: 1.5,
});
assertMovingReceiverBranchFamilyFixture(movingReceiverRequest, movingReceiverResponse);
validateRunSimulationRequestEnvelope(runSimulationRequest);
validateRunSimulationNormalizedRequestEnvelope(runSimulationNormalizedRequest);
validateRunSimulationResponseEnvelope(runSimulationResponse);
validatePairInteractionRunSimulationRequestEnvelope(pairInteractionRunSimulationRequest);
validatePairInteractionRunSimulationResponseEnvelope(pairInteractionRunSimulationResponse);
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
validatePathHistoryDynamicReplayValidationRequestEnvelope(pathHistoryDynamicReplayValidationRequest);
validatePathHistoryDynamicReplayValidationResponseEnvelope(pathHistoryDynamicReplayValidationResponse);
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

function assertTopLevelSchemaFixtureCoverage(fixtures) {
  const fixtureDefinitionNames = new Set(fixtures.map(([, definitionName]) => definitionName));
  const topLevelDefinitionNames = (schema.oneOf ?? [])
    .map((entry) => entry.$ref?.split("/").at(-1))
    .filter(Boolean);
  const missing = topLevelDefinitionNames.filter((definitionName) => !fixtureDefinitionNames.has(definitionName));
  assert(topLevelDefinitionNames.length > 0, "top-level solver app-bridge schema has no oneOf entries");
  assert(
    missing.length === 0,
    `missing schema fixtures for top-level solver app-bridge definitions: ${missing.join(", ")}`
  );
}

function validateSchemaFixtures(fixtures) {
  const failures = [];
  for (const [label, definitionName, value] of fixtures) {
    const definition = schema.$defs?.[definitionName];
    if (!definition) {
      failures.push(`${label}: missing schema definition ${definitionName}`);
      continue;
    }
    const errors = validateAgainstSchema(value, definition, schema, "$");
    if (errors.length > 0) {
      failures.push(`${label} against ${definitionName}:\n${errors.map((error) => `  - ${error}`).join("\n")}`);
    }
    const topLevelErrors = validateAgainstSchema(value, schema, schema, "$");
    if (topLevelErrors.length > 0) {
      failures.push(
        `${label} against top-level solver-app-bridge schema:\n${topLevelErrors
          .map((error) => `  - ${error}`)
          .join("\n")}`
      );
    }
  }
  if (failures.length > 0) {
    console.error(`solver contract fixture schema validation failed:\n${failures.join("\n")}`);
    process.exit(1);
  }
}

function validateAgainstSchema(value, schemaNode, rootSchema, schemaPath = "$", seenRefs = new Set()) {
  if (schemaNode === true) {
    return [];
  }
  if (schemaNode === false) {
    return [`${schemaPath}: schema rejects all values`];
  }
  if (!schemaNode || typeof schemaNode !== "object") {
    return [];
  }
  if (schemaNode.$ref) {
    const resolved = resolveSchemaRef(schemaNode.$ref, rootSchema);
    const refKey = `${schemaPath}:${schemaNode.$ref}`;
    if (seenRefs.has(refKey)) {
      return [];
    }
    return validateAgainstSchema(value, resolved, rootSchema, schemaPath, new Set([...seenRefs, refKey]));
  }

  const errors = [];
  if (schemaNode.oneOf) {
    const branchErrors = schemaNode.oneOf.map((candidate) =>
      validateAgainstSchema(value, candidate, rootSchema, schemaPath, seenRefs)
    );
    const matchCount = branchErrors.filter((candidateErrors) => candidateErrors.length === 0).length;
    if (matchCount !== 1) {
      errors.push(`${schemaPath}: expected exactly one oneOf branch to match, matched ${matchCount}`);
      if (matchCount === 0) {
        errors.push(...summarizeBranchErrors(schemaPath, "oneOf", branchErrors));
      }
    }
  }
  if (schemaNode.anyOf) {
    const branchErrors = schemaNode.anyOf.map((candidate) =>
      validateAgainstSchema(value, candidate, rootSchema, schemaPath, seenRefs)
    );
    if (!branchErrors.some((candidateErrors) => candidateErrors.length === 0)) {
      errors.push(`${schemaPath}: expected at least one anyOf branch to match`);
      errors.push(...summarizeBranchErrors(schemaPath, "anyOf", branchErrors));
    }
  }

  if (Object.prototype.hasOwnProperty.call(schemaNode, "const") && !Object.is(value, schemaNode.const)) {
    errors.push(`${schemaPath}: expected constant ${JSON.stringify(schemaNode.const)}`);
    return errors;
  }
  if (Array.isArray(schemaNode.enum) && !schemaNode.enum.some((entry) => Object.is(entry, value))) {
    errors.push(`${schemaPath}: expected one of ${schemaNode.enum.map((entry) => JSON.stringify(entry)).join(", ")}`);
  }

  if (schemaNode.type) {
    const allowedTypes = Array.isArray(schemaNode.type) ? schemaNode.type : [schemaNode.type];
    if (!allowedTypes.some((type) => isSchemaTypeMatch(value, type))) {
      errors.push(`${schemaPath}: expected type ${allowedTypes.join(" | ")}`);
      return errors;
    }
  }

  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      errors.push(`${schemaPath}: expected finite number`);
    }
    if (typeof schemaNode.minimum === "number" && value < schemaNode.minimum) {
      errors.push(`${schemaPath}: expected number >= ${schemaNode.minimum}`);
    }
    if (typeof schemaNode.exclusiveMinimum === "number" && value <= schemaNode.exclusiveMinimum) {
      errors.push(`${schemaPath}: expected number > ${schemaNode.exclusiveMinimum}`);
    }
    if (typeof schemaNode.maximum === "number" && value > schemaNode.maximum) {
      errors.push(`${schemaPath}: expected number <= ${schemaNode.maximum}`);
    }
    if (typeof schemaNode.exclusiveMaximum === "number" && value >= schemaNode.exclusiveMaximum) {
      errors.push(`${schemaPath}: expected number < ${schemaNode.exclusiveMaximum}`);
    }
  }

  if (typeof value === "string") {
    if (typeof schemaNode.minLength === "number" && value.length < schemaNode.minLength) {
      errors.push(`${schemaPath}: expected string length >= ${schemaNode.minLength}`);
    }
    if (typeof schemaNode.maxLength === "number" && value.length > schemaNode.maxLength) {
      errors.push(`${schemaPath}: expected string length <= ${schemaNode.maxLength}`);
    }
    if (schemaNode.pattern && !new RegExp(schemaNode.pattern).test(value)) {
      errors.push(`${schemaPath}: expected string matching ${schemaNode.pattern}`);
    }
  }

  if (Array.isArray(value)) {
    if (typeof schemaNode.minItems === "number" && value.length < schemaNode.minItems) {
      errors.push(`${schemaPath}: expected array length >= ${schemaNode.minItems}`);
    }
    if (typeof schemaNode.maxItems === "number" && value.length > schemaNode.maxItems) {
      errors.push(`${schemaPath}: expected array length <= ${schemaNode.maxItems}`);
    }
    if (schemaNode.uniqueItems) {
      const seenItems = new Set(value.map((item) => JSON.stringify(item)));
      if (seenItems.size !== value.length) {
        errors.push(`${schemaPath}: expected unique array items`);
      }
    }
    if (schemaNode.items) {
      value.forEach((item, index) => {
        errors.push(...validateAgainstSchema(item, schemaNode.items, rootSchema, `${schemaPath}[${index}]`, seenRefs));
      });
    }
  }

  if (value && typeof value === "object" && !Array.isArray(value)) {
    const properties = schemaNode.properties ?? {};
    for (const key of schemaNode.required ?? []) {
      if (!Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(`${schemaPath}: missing required property ${key}`);
      }
    }
    if (schemaNode.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        if (!Object.prototype.hasOwnProperty.call(properties, key)) {
          errors.push(`${schemaPath}: unexpected property ${key}`);
        }
      }
    }
    for (const [key, childSchema] of Object.entries(properties)) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        errors.push(...validateAgainstSchema(value[key], childSchema, rootSchema, `${schemaPath}.${key}`, seenRefs));
      }
    }
  }

  return errors;
}

function resolveSchemaRef(ref, rootSchema) {
  if (!ref.startsWith("#/")) {
    throw new Error(`unsupported schema ref ${ref}`);
  }
  return ref
    .slice(2)
    .split("/")
    .reduce((node, part) => node?.[part.replace(/~1/g, "/").replace(/~0/g, "~")], rootSchema);
}

function summarizeBranchErrors(schemaPath, branchType, branchErrors) {
  return branchErrors.slice(0, 3).flatMap((errors, index) =>
    errors.slice(0, 5).map((error) => `${schemaPath}: ${branchType}[${index}] ${error}`)
  );
}

function isSchemaTypeMatch(value, type) {
  switch (type) {
    case "array":
      return Array.isArray(value);
    case "boolean":
      return typeof value === "boolean";
    case "integer":
      return Number.isInteger(value);
    case "null":
      return value === null;
    case "number":
      return typeof value === "number" && Number.isFinite(value);
    case "object":
      return value !== null && typeof value === "object" && !Array.isArray(value);
    case "string":
      return typeof value === "string";
    default:
      return false;
  }
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

function validateCircularSourceCausalRootsRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "circular-source root-only request schema tag mismatch");
  assert(
    value.kind === "circular-source-causal-roots-f64-request",
    "circular-source root-only request kind mismatch"
  );
  assertNonemptyString(value.requestId, "circular-source root-only request id");
  assertCircularSourceCausalRootRequest(value.request, "circular-source root-only");
}

function validateCircularSourceCausalRootsResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "circular-source root-only response schema tag mismatch");
  assert(
    value.kind === "circular-source-causal-roots-f64-response",
    "circular-source root-only response kind mismatch"
  );
  assertNonemptyString(value.requestId, "circular-source root-only response request id");
  const responseValue = value.response;
  assert(responseValue.roots.length === 1, "circular-source root-only response root count mismatch");
  assertClose(responseValue.roots[0].hitTime, 1, "circular-source root-only response hit time");
  assertClose(responseValue.roots[0].distance, 1, "circular-source root-only response distance");
  assert(responseValue.status.code === "ok", "circular-source root-only response status mismatch");
}

function validateCircularSourceRootsHitsLedgerRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "circular-source request schema tag mismatch");
  assert(
    value.kind === "circular-source-roots-hits-ledger-f64-request",
    "circular-source request kind mismatch"
  );
  assertNonemptyString(value.requestId, "circular-source request id");
  assertCircularSourceCausalRootRequest(value.request, "circular-source");
}

function assertCircularSourceCausalRootRequest(requestValue, label) {
  assertFinite(requestValue.source.angularVelocity, `${label} angular velocity`);
  assertClose(requestValue.source.radiusU.x, 1, `${label} radius u x`);
  assertClose(requestValue.source.radiusV.y, 1, `${label} radius v y`);
  assertSegment(requestValue.receiver, `${label} receiver`);
  assertPositiveFinite(requestValue.signalSpeed, `${label} signal speed`);
  assertFinite(requestValue.hitTime, `${label} hit time`);
  assertPositiveFinite(requestValue.rootTolerance, `${label} root tolerance`);
  assertPositiveInteger(requestValue.maxIterations, `${label} max iterations`);
  assertPositiveInteger(requestValue.scanSubdivisions, `${label} scan subdivisions`);
  assertPositiveInteger(requestValue.maxRoots, `${label} max roots`);
  assertNonemptyString(requestValue.streamId, `${label} stream id`);
}

function validateCircularSourceRootsHitsLedgerResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "circular-source response schema tag mismatch");
  assert(
    value.kind === "circular-source-roots-hits-ledger-f64-response",
    "circular-source response kind mismatch"
  );
  assertNonemptyString(value.requestId, "circular-source response request id");
  const responseValue = value.response;
  assert(
    responseValue.schema === "solver-circular-source-roots-hits-ledger-f64.v1",
    "circular-source response schema mismatch"
  );
  assert(responseValue.roots.length === 1, "circular-source response root count mismatch");
  assert(responseValue.hits.length === 1, "circular-source response hit count mismatch");
  assert(responseValue.rootLedgerDetails.length === 1, "circular-source ledger detail count mismatch");
  assert(responseValue.rootLedgerDetails[0].entryKind === 1, "circular-source ledger detail entry mismatch");
  assertRootLedgerDetailForensics(responseValue.rootLedgerDetails[0], 1e-13, "circular-source ledger detail");
  assert(responseValue.buffers[2].layout === "root_ledger_detail.v1", "circular-source ledger buffer mismatch");
  assert(responseValue.streams[0].indexLayout === "stream_index.v1", "circular-source stream index mismatch");
  assert(responseValue.statuses[0].code === "ok", "circular-source status row mismatch");
  assert(responseValue.status.code === "ok", "circular-source response status mismatch");
}

function validateCircularSourceRootsHitsLedgerNormalizedRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "normalized circular-source request schema tag mismatch");
  assert(
    value.kind === "circular-source-roots-hits-ledger-normalized-f64-request",
    "normalized circular-source request kind mismatch"
  );
  assertNonemptyString(value.requestId, "normalized circular-source request id");
  const requestValue = value.request;
  assertClose(requestValue.coordinateOrigin.x, 1e18, "normalized circular-source coordinate origin x");
  assertClose(requestValue.localRequest.source.center.x, 0, "normalized circular-source local center x");
  assertClose(requestValue.localRequest.receiver.positionAtStart.x, 2, "normalized circular-source local receiver x");
  assert(requestValue.restoreAbsolutePoints === true, "normalized circular-source restore absolute flag mismatch");
}

function validateCircularSourceRootsHitsLedgerNormalizedResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "normalized circular-source response schema tag mismatch");
  assert(
    value.kind === "circular-source-roots-hits-ledger-normalized-f64-response",
    "normalized circular-source response kind mismatch"
  );
  assertNonemptyString(value.requestId, "normalized circular-source response request id");
  const responseValue = value.response;
  assert(
    responseValue.schema === "solver-circular-source-roots-hits-ledger-normalized-f64.v1",
    "normalized circular-source response schema mismatch"
  );
  assert(responseValue.coordinateFrame === "origin-normalized", "normalized circular-source frame mismatch");
  assertClose(responseValue.coordinateOrigin.x, 1e18, "normalized circular-source response origin x");
  assert(responseValue.roots.length === 1, "normalized circular-source root count mismatch");
  assert(responseValue.roots[0].coordinateFrame === "origin-normalized", "normalized circular-source root frame mismatch");
  assert(responseValue.absoluteRoots.length === 1, "normalized circular-source absolute root count mismatch");
  assert(
    responseValue.absoluteRoots[0].absolutePointAuthority === "display-only",
    "normalized circular-source absolute authority mismatch"
  );
  assert(responseValue.rootLedgerDetails.length === 1, "normalized circular-source ledger detail count mismatch");
  assert(responseValue.statuses.length === 2, "normalized circular-source status row count mismatch");
  assert(responseValue.status.code === "ok", "normalized circular-source response status mismatch");
}

function validateCausalRootsPrecisionRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "precision causal roots request schema tag mismatch");
  assert(value.kind === "causal-roots-precision-f64-request", "precision causal roots request kind mismatch");
  assertNonemptyString(value.requestId, "precision causal roots request id");
  const requestValue = value.request;
  assert(requestValue.rootRequest.hitTime === request.request.hitTime, "precision root request hit time mismatch");
  assert(requestValue.rootRequest.rootTolerance === 1e-16, "precision root request tolerance mismatch");
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
  assert(responseValue.precision.selectedNumericChart === "interval_bounds", "precision numeric chart mismatch");
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
  assert(requestValue.rootRequest.rootTolerance === 1e-16, "precision roots-and-hits tolerance mismatch");
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
  assertRootLedgerDetailForensics(responseValue.rootLedgerDetails[0], 1e-16, "precision roots-and-hits detail");
  assert(responseValue.precision.selectedPrecisionPath === "extended_precision", "precision roots-and-hits path mismatch");
  assert(responseValue.precision.selectedNumericType === "decimal128", "precision roots-and-hits numeric type mismatch");
  assert(
    responseValue.precision.selectedNumericChart === "interval_bounds",
    "precision roots-and-hits numeric chart mismatch"
  );
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
  assert(value.request.workload.observations.chunkDurationsMs.length === 4, "threading plan observations mismatch");
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
  assert(responseValue.plannedChunkCount === 4, "threading plan chunk count mismatch");
  assert(responseValue.queueDepth === 3, "threading plan queue depth mismatch");
  assert(responseValue.determinismStatus === "deterministic", "threading plan determinism mismatch");
  assert(responseValue.contention.oversubscribedWorkerCount === 3, "threading plan oversubscription mismatch");
  assert(responseValue.chunkTimings.meanMs === 1.625, "threading plan chunk timing mismatch");
  assert(responseValue.stageSpeedup.speedupRatio === 1, "threading plan speedup mismatch");
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
  assert(value.binaryLayouts.schema === "solver-binary-layout-catalog.v1", `${label} binary layout schema mismatch`);
  assert(
    value.binaryLayouts.layouts.some(
      (layout) =>
        layout.layout === "path_segment.v1" &&
        layout.rowSizeBytes === 96 &&
        layout.role === "path-history" &&
        layout.streamable === true
    ),
    `${label} path segment binary layout mismatch`
  );
  assert(
    value.binaryLayouts.layouts.some(
      (layout) =>
        layout.layout === "root_ledger_detail.v1" &&
        layout.rowSizeBytes === ROOT_LEDGER_DETAIL_ROW_F64_BYTES
    ),
    `${label} root ledger detail binary layout mismatch`
  );
  assert(value.storage.supportsCallerBuffer === true, `${label} caller-buffer storage mismatch`);
  assert(value.threading.crossOriginIsolationRequired === true, `${label} threading isolation mismatch`);
  assert(value.appBridge.schema === "solver-app-bridge-capabilities.v1", `${label} app bridge schema mismatch`);
  assert(value.appBridge.denseDataTransport.includes("stream-handle"), `${label} dense transport mismatch`);
  assert(value.appBridge.workerModel.appsRequireCppHandling === false, `${label} worker model mismatch`);
  assert(value.appBridge.statusTaxonomy.schema === "solver-status-taxonomy.v1", `${label} status taxonomy mismatch`);
  assert(
    value.appBridge.statusTaxonomy.severities.includes("halt"),
    `${label} status taxonomy severity mismatch`
  );
  assert(
    value.appBridge.statusTaxonomy.codes.some(
      (entry) => entry.code === "unsupported_wasm_threads" && entry.category === "runtime-support"
    ),
    `${label} runtime support status taxonomy mismatch`
  );
  assert(
    value.appBridge.statusTaxonomy.codes.some(
      (entry) => entry.code === "app_contract_error" && entry.defaultSeverity === "error"
    ),
    `${label} app contract status taxonomy mismatch`
  );
  assert(value.appBridge.streamQueries.helpers.includes("readStreamRange"), `${label} stream query helper mismatch`);
  assert(
    value.appBridge.streamQueries.helpers.includes("planPathHistoryStorageLifecycleF64") &&
      value.appBridge.streamQueries.helpers.includes("applyPathHistoryStorageLifecycleF64"),
    `${label} stream lifecycle helper mismatch`
  );
  assert(
    value.appBridge.streamQueries.helpers.includes("buildPathHistoryStreamSpaceTimeIndexF64"),
    `${label} stream space-time helper mismatch`
  );
  assert(
    value.appBridge.streamQueries.helpers.includes("refineEmissionShellCandidateRootsF64"),
    `${label} emission-shell refinement helper mismatch`
  );
  assert(
    value.appBridge.streamQueries.helpers.includes("validatePathHistoryDynamicReplayF64"),
    `${label} dynamic replay validation helper mismatch`
  );
  assert(
    value.appBridge.streamQueries.rangeMetadata.includes("bounds"),
    `${label} stream range metadata mismatch`
  );
  assert(value.appBridge.workPackets.helpers.includes("planPathHistoryWorkPackets"), `${label} work packet helper mismatch`);
  assert(value.numericSerialization.descriptors.length >= 1, `${label} numeric descriptors mismatch`);
  assert(value.numericSerialization.chartDescriptors.length === 7, `${label} numeric chart descriptor count mismatch`);
  assert(
    findNumericChartDescriptor(value, "local_frame").preservesLocalDetailAcrossLargeOffsets === true,
    `${label} local-frame chart descriptor mismatch`
  );
  assert(
    findNumericChartDescriptor(value, "direction_log_magnitude").preservesLocalDetailAcrossLargeOffsets === true,
    `${label} direction-log chart descriptor mismatch`
  );
  assert(
    findNumericChartDescriptor(value, "interval_bounds").preservesLocalDetailAcrossLargeOffsets === true,
    `${label} interval-bounds chart descriptor mismatch`
  );
  assert(value.errorBudgetPropagation.stages.length >= 1, `${label} error budget propagation mismatch`);
  assert(value.validation.invariantChecks.includes("root_hit_f64"), `${label} validation capability mismatch`);
  assert(value.maxTransferBytes === 67108864, `${label} max transfer mismatch`);
  assert(value.wasmModuleFactory === true, `${label} wasm factory mismatch`);
  assert(value.abiInfo.rootRowF64Bytes === ROOT_LEDGER_ROW_F64_BYTES, `${label} ABI root row mismatch`);
  assert(value.abiInfo.motionIntegrationRequestF64Bytes === 120, `${label} ABI motion integration mismatch`);
  assert(value.abiInfo.pairInteractionRequestF64Bytes === 88, `${label} ABI pair request mismatch`);
}

function findNumericChartDescriptor(capabilities, numericChart) {
  const descriptor = capabilities.numericSerialization.chartDescriptors.find(
    (candidate) => candidate.numericChart === numericChart
  );
  assert(descriptor, `Missing numeric chart descriptor ${numericChart}`);
  return descriptor;
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
  assertBuffer(
    responseValue.buffers[0],
    "batch-root-ledger",
    "root_ledger.v1",
    ROOT_LEDGER_ROW_F64_BYTES * 2,
    2
  );
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

function validateResponseEnvelope(
  value,
  expected = { emissionTime: 0, distance: 10, hitStrength: 1 }
) {
  assert(value.schema === "solver-app-bridge/v1", "response schema tag mismatch");
  assert(value.kind === "roots-and-hits-f64-response", "response kind mismatch");
  assertNonemptyString(value.requestId, "response request id");
  const responseValue = value.response;
  assert(Array.isArray(responseValue.roots), "roots must be an array");
  assert(Array.isArray(responseValue.hits), "hits must be an array");
  assert(responseValue.roots.length === 1, "smoke response must contain one root");
  assert(responseValue.hits.length === 1, "smoke response must contain one hit");
  assertClose(responseValue.roots[0].emissionTime, expected.emissionTime, "root emission time");
  assertClose(responseValue.roots[0].distance, expected.distance, "root distance");
  assertClose(responseValue.hits[0].unitDirection.x, 1, "hit unit direction x");
  assertClose(responseValue.hits[0].strength, expected.hitStrength, "hit strength");
  assertBuffer(responseValue.buffers[0], "root-ledger", "root_ledger.v1", ROOT_LEDGER_ROW_F64_BYTES, 1);
  assertBuffer(
    responseValue.buffers[1],
    "delayed-hit-events",
    "delayed_hit_events.v1",
    DELAYED_HIT_ROW_F64_BYTES,
    1
  );
  assert(responseValue.streams.length === 1, "expected one transient stream");
  const stream = responseValue.streams[0];
  assert(stream.indexLayout === "stream_index.v1", "stream index layout mismatch");
  assert(stream.availableRanges.length === 2, "stream ranges mismatch");
  assert(
    stream.storagePolicy.maxBytes === ROOT_LEDGER_ROW_F64_BYTES + DELAYED_HIT_ROW_F64_BYTES,
    "stream storage byte count mismatch"
  );
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
    responseValue.response.manifest.precision.selectedNumericChart === "interval_bounds",
    "run manifest precision numeric chart mismatch"
  );
  assert(
    responseValue.response.precision.escalations[0].newPrecisionPath === "extended_precision",
    "run response precision escalation record mismatch"
  );
  assert(
    responseValue.response.manifest.precisionMetadata.numericType === "decimal128" &&
      responseValue.response.manifest.precisionMetadata.numericChart === "interval_bounds" &&
      responseValue.response.manifest.precisionMetadata.scaleNormalization === "unit-test-scale",
    "run manifest precision metadata mismatch"
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
  assertRootLedgerDetailForensics(responseValue.response.rootLedgerDetails[0], 1e-16, "run response detail row");
  assert(responseValue.response.buffers.length === 3, "run response buffer count mismatch");
}

function validatePairInteractionRunSimulationRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "pair run request schema tag mismatch");
  assert(value.kind === "run-simulation-request", "pair run request kind mismatch");
  assertNonemptyString(value.requestId, "pair run request id");
  const requestValue = value.request;
  assert(requestValue.appId === "causal-delay-feedback", "pair run app id mismatch");
  assert(requestValue.runKind === "pairInteraction", "pair run kind mismatch");
  assert(requestValue.config.pairInteractionRequest.initialStates.length === 2, "pair initial state count mismatch");
  assert(requestValue.config.pairInteractionRequest.pathConstraints.length === 2, "pair constraint count mismatch");
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintBoundaryResidualTolerance === 0.5,
    "pair boundary tolerance mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.signalSpeed === 1234,
    "pair signal speed mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintPositionResidualTolerance === 0.01,
    "pair position tolerance mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintGuidanceAccelerationTolerance === 6,
    "pair guidance acceleration tolerance mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintInitialVelocityResidualTolerance === 0.06,
    "pair initial velocity residual tolerance mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintBoundaryRelaxationIterationCount === 12,
    "pair boundary relaxation iteration mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintBoundaryRelaxationTolerance === 0.01,
    "pair boundary relaxation tolerance mismatch"
  );
  assert(
    requestValue.config.pairInteractionRequest.pathConstraintBoundaryRelaxationStepTolerance === 0.001,
    "pair boundary relaxation step tolerance mismatch"
  );
}

function validatePairInteractionRunSimulationResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "pair run response schema tag mismatch");
  assert(value.kind === "run-simulation-response", "pair run response kind mismatch");
  assertNonemptyString(value.requestId, "pair run response request id");
  const responseValue = value.response;
  assert(responseValue.runId === "pair-interaction-contract", "pair run handle id mismatch");
  const runResponse = responseValue.response;
  assert(
    runResponse.summary.pathConstraintFrameRefinementSampleCount === 1,
    "pair summary frame refinement mismatch"
  );
  assert(runResponse.summary.signalSpeed === 1234, "pair summary signal speed mismatch");
  assert(runResponse.summary.pathConstraintBoundaryResidualStatus === "within_tolerance", "pair summary status mismatch");
  assert(
    runResponse.summary.pathConstraintBoundaryResidualMode === "causal_delay_pair_law",
    "pair summary residual mode mismatch"
  );
  assert(runResponse.summary.pathConstraintBoundaryResidualTolerance === 0.5, "pair summary tolerance mismatch");
  assert(
    runResponse.summary.pathConstraintPositionResidualStatus === "within_tolerance" &&
      runResponse.summary.pathConstraintPositionResidualTolerance === 0.01,
    "pair summary position residual acceptance mismatch"
  );
  assert(
    runResponse.summary.pathConstraintInitialVelocityResidualSampleCount === 2 &&
      runResponse.summary.maxPathConstraintInitialVelocityResidual === 0.05 &&
      runResponse.summary.pathConstraintInitialVelocityResidualStatus === "within_tolerance" &&
      runResponse.summary.pathConstraintInitialVelocityResidualTolerance === 0.06,
    "pair summary initial velocity residual acceptance mismatch"
  );
  assert(
    runResponse.summary.pathConstraintGuidanceAccelerationStatus === "within_tolerance" &&
      runResponse.summary.pathConstraintGuidanceAccelerationTolerance === 6,
    "pair summary guidance acceleration acceptance mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationMode === "finite_difference_frame_relaxation_v1",
    "pair summary relaxation mode mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationIterationCount === 12,
    "pair summary relaxation iteration mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationAppliedIterationCount === 4,
    "pair summary relaxation applied iteration mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationTolerance === 0.01,
    "pair summary relaxation tolerance mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationStepTolerance === 0.001,
    "pair summary relaxation step tolerance mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationStatus === "accepted",
    "pair summary relaxation status mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationResidualEvidenceStatus ===
      "aggregate_non_worsening",
    "pair summary relaxation residual evidence status mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationResidualSampleCount === 2,
    "pair summary relaxation residual sample count mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationResidualMode === "causal_delay_pair_law",
    "pair summary relaxation residual mode mismatch"
  );
  assert(
    runResponse.summary.maxPathConstraintBoundaryRelaxationResidualBefore === 8 &&
      runResponse.summary.maxPathConstraintBoundaryRelaxationResidualAfter === 2 &&
      runResponse.summary.pathConstraintBoundaryRelaxationResidualRatio === 0.25,
    "pair summary relaxation residual improvement mismatch"
  );
  assert(
    runResponse.summary.meanPathConstraintBoundaryRelaxationResidualBefore === 6 &&
      runResponse.summary.meanPathConstraintBoundaryRelaxationResidualAfter === 1.5 &&
      runResponse.summary.rmsPathConstraintBoundaryRelaxationResidualBefore === 6.5 &&
      runResponse.summary.rmsPathConstraintBoundaryRelaxationResidualAfter === 1.75 &&
      runResponse.summary.meanPathConstraintBoundaryRelaxationResidualRatio === 0.25 &&
      runResponse.summary.rmsPathConstraintBoundaryRelaxationResidualRatio === 1.75 / 6.5,
    "pair summary relaxation residual mean/rms mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationResidualSettlingRate === Math.pow(0.25, 1 / 4) &&
      runResponse.summary.meanPathConstraintBoundaryRelaxationResidualSettlingRate === Math.pow(0.25, 1 / 4) &&
      runResponse.summary.rmsPathConstraintBoundaryRelaxationResidualSettlingRate ===
        Math.pow(1.75 / 6.5, 1 / 4),
    "pair summary relaxation residual settling-rate mismatch"
  );
  assert(
    runResponse.summary.pathConstraintBoundaryRelaxationCandidateVariantCount === 14 &&
      runResponse.summary.pathConstraintBoundaryRelaxationLineSearchTrialCount === 112 &&
      runResponse.summary.pathConstraintBoundaryRelaxationCandidateKindMask === 0x7ffffe,
    "pair summary relaxation candidate telemetry mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintFrameRefinementSampleCount === 1,
    "pair interaction nested frame refinement mismatch"
  );
  assert(runResponse.pairInteraction.signalSpeed === 1234, "pair interaction nested signal speed mismatch");
  assert(
    runResponse.pairInteraction.pathConstraintInitialVelocityResidualSampleCount === 2 &&
      runResponse.pairInteraction.maxPathConstraintInitialVelocityResidual === 0.05 &&
      runResponse.pairInteraction.pathConstraintInitialVelocityResidualStatus === "within_tolerance" &&
      runResponse.pairInteraction.pathConstraintInitialVelocityResidualTolerance === 0.06,
    "pair interaction nested initial velocity residual acceptance mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryResidualStatus === "within_tolerance",
    "pair interaction nested status mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryResidualMode === "causal_delay_pair_law",
    "pair interaction nested residual mode mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintGuidanceAccelerationStatus === "within_tolerance" &&
      runResponse.pairInteraction.pathConstraintGuidanceAccelerationTolerance === 6,
    "pair interaction nested guidance acceleration acceptance mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationMode === "finite_difference_frame_relaxation_v1",
    "pair interaction nested relaxation mode mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationIterationCount === 12,
    "pair interaction nested relaxation iteration mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationAppliedIterationCount === 4,
    "pair interaction nested relaxation applied iteration mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationTolerance === 0.01,
    "pair interaction nested relaxation tolerance mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationStepTolerance === 0.001,
    "pair interaction nested relaxation step tolerance mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationStatus === "accepted",
    "pair interaction nested relaxation status mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationResidualEvidenceStatus ===
      "aggregate_non_worsening",
    "pair interaction nested relaxation residual evidence status mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationResidualSampleCount === 2,
    "pair interaction nested relaxation residual sample count mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationResidualMode === "causal_delay_pair_law",
    "pair interaction nested relaxation residual mode mismatch"
  );
  assert(
    runResponse.pairInteraction.maxPathConstraintBoundaryRelaxationResidualBefore === 8 &&
      runResponse.pairInteraction.maxPathConstraintBoundaryRelaxationResidualAfter === 2 &&
      runResponse.pairInteraction.pathConstraintBoundaryRelaxationResidualRatio === 0.25,
    "pair interaction nested relaxation residual improvement mismatch"
  );
  assert(
    runResponse.pairInteraction.meanPathConstraintBoundaryRelaxationResidualBefore === 6 &&
      runResponse.pairInteraction.meanPathConstraintBoundaryRelaxationResidualAfter === 1.5 &&
      runResponse.pairInteraction.rmsPathConstraintBoundaryRelaxationResidualBefore === 6.5 &&
      runResponse.pairInteraction.rmsPathConstraintBoundaryRelaxationResidualAfter === 1.75 &&
      runResponse.pairInteraction.meanPathConstraintBoundaryRelaxationResidualRatio === 0.25 &&
      runResponse.pairInteraction.rmsPathConstraintBoundaryRelaxationResidualRatio === 1.75 / 6.5,
    "pair interaction nested relaxation residual mean/rms mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationResidualSettlingRate === Math.pow(0.25, 1 / 4) &&
      runResponse.pairInteraction.meanPathConstraintBoundaryRelaxationResidualSettlingRate ===
        Math.pow(0.25, 1 / 4) &&
      runResponse.pairInteraction.rmsPathConstraintBoundaryRelaxationResidualSettlingRate ===
        Math.pow(1.75 / 6.5, 1 / 4),
    "pair interaction nested relaxation residual settling-rate mismatch"
  );
  assert(
    runResponse.pairInteraction.pathConstraintBoundaryRelaxationCandidateVariantCount === 14 &&
      runResponse.pairInteraction.pathConstraintBoundaryRelaxationLineSearchTrialCount === 112 &&
      runResponse.pairInteraction.pathConstraintBoundaryRelaxationCandidateKindMask === 0x7ffffe,
    "pair interaction nested relaxation candidate telemetry mismatch"
  );
  assert(runResponse.frames.length === 4, "pair frame count mismatch");
  assert(runResponse.pathHistory.rowCount === 4, "pair path-history row count mismatch");
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
  assertPathHistoryContractArtifacts(responseValue.contractArtifacts);
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

function validatePathHistoryDynamicReplayValidationRequestEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "dynamic replay request schema tag mismatch");
  assert(value.kind === "path-history-dynamic-replay-validation-request", "dynamic replay request kind mismatch");
  assertNonemptyString(value.requestId, "dynamic replay request id");
  const requestValue = value.request;
  assert(requestValue.streamId === "fixture-path-history-stream", "dynamic replay stream id mismatch");
  assert(requestValue.tolerance === 0, "dynamic replay tolerance mismatch");
  assert(requestValue.maxRows === 16, "dynamic replay max rows mismatch");
}

function validatePathHistoryDynamicReplayValidationResponseEnvelope(value) {
  assert(value.schema === "solver-app-bridge/v1", "dynamic replay response schema tag mismatch");
  assert(value.kind === "path-history-dynamic-replay-validation-response", "dynamic replay response kind mismatch");
  assertNonemptyString(value.requestId, "dynamic replay response id");
  const responseValue = value.response;
  assert(
    responseValue.schema === "solver-path-history-dynamic-replay-validation.v1",
    "dynamic replay response schema mismatch"
  );
  assert(responseValue.streamId === "fixture-path-history-stream", "dynamic replay response stream mismatch");
  assert(responseValue.replayKind === "linear-motion-sample", "dynamic replay kind mismatch");
  assert(responseValue.tolerance === 0, "dynamic replay response tolerance mismatch");
  assert(responseValue.actualRowCount === 1, "dynamic replay actual row count mismatch");
  assert(responseValue.expectedRowCount === 1, "dynamic replay expected row count mismatch");
  assert(responseValue.selectedRangeCount === 1, "dynamic replay range count mismatch");
  assert(responseValue.selectedByteLength === 96, "dynamic replay byte length mismatch");
  assert(responseValue.matched === true, "dynamic replay match flag mismatch");
  assert(responseValue.mismatchCount === 0, "dynamic replay mismatch count mismatch");
  assert(responseValue.firstMismatch === null, "dynamic replay first mismatch mismatch");
  assert(responseValue.status.code === "ok", "dynamic replay status mismatch");
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
  assert(responseValue.scanSummary.executionPath === "native_c_abi_indexed_v0", "emission-shell scan execution path mismatch");
  assert(responseValue.scanSummary.outputBufferCount === 2, "emission-shell scan output buffer count mismatch");
  assert(responseValue.indexSummary.coverageStatus === "complete", "emission-shell index coverage mismatch");
  assert(responseValue.indexSummary.timeSlabCount === 32, "emission-shell index slab count mismatch");
  assert(responseValue.indexSummary.indexedPairTests === 1, "emission-shell indexed pair count mismatch");
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
  assert(requestValue.packet.packetId === "packet-refine-a", "emission-shell refinement packet id mismatch");
  assert(
    requestValue.packet.expectedOutputs.includes("root_ledger.v1") &&
      requestValue.packet.expectedOutputs.includes("delayed_hit_events.v1"),
    "emission-shell refinement packet expected outputs mismatch"
  );
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
  assert(responseValue.packetId === "packet-refine-a", "emission-shell refinement packet id mismatch");
  assert(responseValue.packetMergeOrder === 2, "emission-shell refinement packet merge order mismatch");
  assert(responseValue.packetMergeKey === "source:0:receiver:1:refine", "emission-shell refinement packet merge key mismatch");
  assertRootRefinementPacketResultRef(responseValue.packetResult, "packet-refine-a", 2, "source:0:receiver:1:refine");
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
  assertBuffer(
    responseValue.buffers[0],
    "packet-refine-a:emission-shell-refined-root-ledger",
    "root_ledger.v1",
    ROOT_LEDGER_ROW_F64_BYTES,
    1
  );
  assertBuffer(
    responseValue.buffers[1],
    "packet-refine-a:emission-shell-refined-delayed-hits",
    "delayed_hit_events.v1",
    DELAYED_HIT_ROW_F64_BYTES,
    1
  );
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

function assertRootRefinementPacketResultRef(result, packetId, mergeOrder, mergeKey) {
  assert(result.packetId === packetId, `${packetId} refinement result packet id mismatch`);
  assert(result.mergeOrder === mergeOrder, `${packetId} refinement result merge order mismatch`);
  assert(result.mergeKey === mergeKey, `${packetId} refinement result merge key mismatch`);
  assert(result.outputs.length === 2, `${packetId} refinement result output count mismatch`);
  assert(
    result.outputs[0].layout === "root_ledger.v1" &&
      result.outputs[1].layout === "delayed_hit_events.v1",
    `${packetId} refinement result output layout mismatch`
  );
  assert(result.outputs[0].checksum.length === 16, `${packetId} refinement root checksum mismatch`);
  assert(result.outputs[1].checksum.length === 16, `${packetId} refinement hit checksum mismatch`);
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
  assert(metadata.numericType === "f64", `${label} numeric type mismatch`);
  assert(metadata.numericChart === "absolute_f64", `${label} numeric chart mismatch`);
  assert(metadata.valueAuthority === "authoritative", `${label} value authority mismatch`);
  assert(metadata.appBufferAuthority === "authoritative", `${label} app buffer authority mismatch`);
  assert(metadata.claimLevel === "migration-parity", `${label} claim level mismatch`);
  assert(metadata.units === "solver-si", `${label} units mismatch`);
  assert(metadata.coordinateFrame === "absolute-lab-frame", `${label} coordinate frame mismatch`);
  assert(metadata.scaleNormalization === "unit-test-scale", `${label} scale normalization mismatch`);
  assert(metadata.interpolationRule === "linear-segment", `${label} interpolation rule mismatch`);
  assert(metadata.dynamicReplay.schema === "solver-path-history-dynamic-replay.v1", `${label} replay schema mismatch`);
  assert(metadata.dynamicReplay.replayKind === "linear-motion-sample", `${label} replay kind mismatch`);
  assert(metadata.dynamicReplay.pathKey === 2000, `${label} replay path key mismatch`);
  assert(metadata.dynamicReplay.motionRequest.pathKey === 2000, `${label} replay request path key mismatch`);
  assert(metadata.provenance.fixture === "path-history-contract-fixture", `${label} provenance mismatch`);
  assert(Array.isArray(metadata.diagnostics), `${label} diagnostics must be an array`);
  assert(metadata.diagnostics[0].code === "ok", `${label} diagnostic code mismatch`);
}

function assertPathHistoryContractArtifacts(artifacts) {
  assert(artifacts.schema === "solver-path-history-stream-contract-artifacts.v1", "contract artifacts schema mismatch");
  assert(artifacts.manifest.schema === "path_history_stream_manifest.v1", "contract manifest schema mismatch");
  assert(artifacts.manifest.runId === "path-history-contract-run", "contract manifest run mismatch");
  assert(artifacts.manifest.chunkStoreId === "fixture-path-chunk-store", "contract chunk store id mismatch");
  assert(artifacts.manifest.encodingDictionaryId === "fixture-path-encoding-dictionary", "contract dictionary id mismatch");
  assert(artifacts.manifest.eventStoreId === "fixture-path-event-store", "contract event store id mismatch");
  assert(artifacts.manifest.indexSidecarId === "fixture-path-index-sidecar", "contract index sidecar id mismatch");
  assert(artifacts.manifest.lifecycleStatus === "finalized", "contract manifest lifecycle mismatch");
  assert(artifacts.logicalStreamTable.schema === "path_stream_table.v1", "logical stream table schema mismatch");
  assert(artifacts.logicalStreamTable.streams.length === 2, "logical stream table count mismatch");
  assert(
    artifacts.logicalStreamTable.streams.every((stream) => stream.replayStatus === "complete"),
    "logical stream replay status mismatch"
  );
  assert(artifacts.chunkRecords.length === 2, "contract chunk record count mismatch");
  assert(artifacts.chunkRecords.every((chunk) => chunk.schema === "path_chunk.v1"), "contract chunk schema mismatch");
  assert(artifacts.chunkRecords.every((chunk) => chunk.committed === true), "contract chunk commit mismatch");
  assertRange(artifacts.chunkRecords[0].byteRange, 0, 192, "contract first chunk byte range");
  assertRange(artifacts.chunkRecords[1].byteRange, 192, 288, "contract second chunk byte range");
  assert(artifacts.encodingDictionary.schema === "path_encoding_dictionary.v1", "encoding dictionary schema mismatch");
  assert(
    artifacts.encodingDictionary.columnLayouts.includes("path_chunk.v1") &&
      artifacts.encodingDictionary.columnLayouts.includes("stream_index.v1"),
    "encoding dictionary layout coverage mismatch"
  );
  assert(
    artifacts.checksumPolicy.scopes.includes("chunk_header") &&
      artifacts.checksumPolicy.scopes.includes("chunk_payload") &&
      artifacts.checksumPolicy.scopes.includes("chunk_trailer") &&
      artifacts.checksumPolicy.scopes.includes("sidecar") &&
      artifacts.checksumPolicy.scopes.includes("manifest"),
    "checksum policy scope coverage mismatch"
  );
  assert(artifacts.eventStore.schema === "path_event_store.v1", "event store schema mismatch");
  assert(
    artifacts.eventStore.events.some((event) => event.eventClass === "chunk_committed") &&
      artifacts.eventStore.events.some((event) => event.eventClass === "checksum_fault") &&
      artifacts.eventStore.events.some((event) => event.eventClass === "run_finalized"),
    "event store required classes mismatch"
  );
  assert(artifacts.indexSidecar.schema === "solver-stream-index.v1", "contract index sidecar schema mismatch");
  assert(artifacts.indexSidecar.sidecar.rowCount === 3, "contract index sidecar row count mismatch");
  assert(artifacts.indexSidecar.pathIndexRows.length === 3, "contract path index row count mismatch");
  assert(artifacts.summary.schema === "path_history_summary.v1", "contract summary schema mismatch");
  assert(artifacts.summary.rowCount === 3, "contract summary row count mismatch");
  assert(artifacts.summary.chunkCount === 2, "contract summary chunk count mismatch");
  assert(artifacts.summary.checksumFaultCount === 1, "contract summary checksum fault count mismatch");
  assert(artifacts.summary.activeWindowMaxBytes <= artifacts.memoryBudget.activeWindowBytes, "active bytes exceed budget");
  assert(artifacts.memoryBudget.schema === "path_history_stream_memory_budget.v1", "memory budget schema mismatch");
  assert(artifacts.memoryBudget.onBudgetPressure === "spill", "memory budget pressure policy mismatch");
  const fixtureById = new Map(artifacts.fixtures.map((fixture) => [fixture.fixtureId, fixture]));
  const roundTrip = fixtureById.get("path_stream_round_trip");
  const replayInvariants = fixtureById.get("stream_replay_invariants");
  const ageOutDeepIndex = fixtureById.get("history_age_out_and_deep_index");
  const interruptedRecovery = fixtureById.get("interrupted_stream_recovery");
  const highSpeedReadback = fixtureById.get("high_speed_readback_budget");
  const fastSpill = fixtureById.get("fast_spill_budget");
  assert(roundTrip, "path_stream_round_trip fixture missing");
  assert(replayInvariants, "stream_replay_invariants fixture missing");
  assert(ageOutDeepIndex, "history_age_out_and_deep_index fixture missing");
  assert(interruptedRecovery, "interrupted_stream_recovery fixture missing");
  assert(highSpeedReadback, "high_speed_readback_budget fixture missing");
  assert(fastSpill, "fast_spill_budget fixture missing");
  assert(roundTrip.status === "passed", "path_stream_round_trip status mismatch");
  assert(roundTrip.roundTripByteStable === true, "path_stream_round_trip byte stability mismatch");
  assert(roundTrip.indexSeekMatched === true, "path_stream_round_trip index seek mismatch");
  assert(roundTrip.fullRunScanRequired === false, "path_stream_round_trip full scan mismatch");
  assert(roundTrip.checksumFaultDetected === true, "path_stream_round_trip checksum fault detection mismatch");
  assert(
    roundTrip.validatedArtifacts.includes("path_history_stream_manifest.v1") &&
      roundTrip.validatedArtifacts.includes("path_chunk.v1") &&
      roundTrip.validatedArtifacts.includes("stream_index.v1"),
    "path_stream_round_trip artifact coverage mismatch"
  );
  assert(replayInvariants.status === "passed", "stream_replay_invariants status mismatch");
  assert(replayInvariants.pathErrorBoundPreserved === true, "stream_replay_invariants path error mismatch");
  assert(replayInvariants.rootCountPreserved === true, "stream_replay_invariants root count mismatch");
  assert(replayInvariants.timeOrderingPreserved === true, "stream_replay_invariants ordering mismatch");
  assert(replayInvariants.checksumIdentityPreserved === true, "stream_replay_invariants checksum mismatch");
  assert(replayInvariants.projectionAuthorityPreserved === true, "stream_replay_invariants projection authority mismatch");
  assert(ageOutDeepIndex.status === "passed", "history_age_out_and_deep_index status mismatch");
  assert(ageOutDeepIndex.safeAgeOutCount > 0, "history_age_out safe count missing");
  assert(ageOutDeepIndex.unsafeAgeOutCount > 0, "history_age_out unsafe count missing");
  assert(ageOutDeepIndex.deepIndexBuilt === true, "history_age_out deep-index build mismatch");
  assert(ageOutDeepIndex.authoritativeReplayReplaced === false, "history_age_out authoritative replay mismatch");
  assert(
    ageOutDeepIndex.validatedArtifacts.includes("solver-path-history-storage-lifecycle-summary.v1") &&
      ageOutDeepIndex.validatedArtifacts.includes("solver-path-history-deep-index.v1"),
    "history_age_out artifact coverage mismatch"
  );
  assert(interruptedRecovery.status === "passed", "interrupted_stream_recovery status mismatch");
  assert(interruptedRecovery.partialWriteDetected === true, "interrupted recovery partial write mismatch");
  assert(interruptedRecovery.staleSidecarDetected === true, "interrupted recovery stale sidecar mismatch");
  assert(interruptedRecovery.manifestMismatchDetected === true, "interrupted recovery manifest mismatch");
  assert(interruptedRecovery.recoveryEventAppended === true, "interrupted recovery event mismatch");
  assert(interruptedRecovery.quarantinedChunkCount > 0, "interrupted recovery quarantine count mismatch");
  assert(highSpeedReadback.status === "passed", "high_speed_readback_budget status mismatch");
  assert(highSpeedReadback.indexedLookupUsed === true, "high speed readback indexed lookup mismatch");
  assert(highSpeedReadback.fullRunScanRequired === false, "high speed readback full scan mismatch");
  assert(highSpeedReadback.selectedRangeReadbackRows > 0, "high speed readback selected rows mismatch");
  assert(highSpeedReadback.scannedChunkCount < highSpeedReadback.chunkCount, "high speed readback scan budget mismatch");
  assert(highSpeedReadback.readbackBytes <= highSpeedReadback.readbackMemoryBudgetBytes, "readback memory budget exceeded");
  assertPositiveFinite(highSpeedReadback.readbackThroughputRowsPerSecond, "high_speed_readback_budget readback throughput");
  assert(fastSpill.status === "passed", "fast_spill_budget status mismatch");
  assert(fastSpill.maxActiveBytes <= fastSpill.memoryBudgetBytes, "fast_spill_budget memory budget exceeded");
  assert(fastSpill.spilledBytes > 0, "fast_spill_budget spilled bytes missing");
  assert(fastSpill.backpressureApplied === true, "fast_spill_budget backpressure mismatch");
  assert(fastSpill.halted === false, "fast_spill_budget halt mismatch");
  assertPositiveFinite(fastSpill.spillThroughputRowsPerSecond, "fast_spill_budget spill throughput");
}

function assertBuffer(value, bufferId, layout, byteLength, rowCount) {
  assert(value.bufferId === bufferId, `${bufferId} id mismatch`);
  assert(value.layout === layout, `${bufferId} layout mismatch`);
  assert(value.rowCount === rowCount, `${bufferId} row count mismatch`);
  assert(value.byteLength === byteLength, `${bufferId} byte length mismatch`);
  assert(value.numericType === "f64", `${bufferId} numeric type mismatch`);
}

function assertMovingReceiverBranchFamilyFixture(requestEnvelope, responseEnvelope) {
  assert(
    requestEnvelope.requestId === "causal-roots-moving-receiver-f64-smoke",
    "moving-receiver request id mismatch"
  );
  assert(
    responseEnvelope.requestId === requestEnvelope.requestId,
    "moving-receiver response request id mismatch"
  );
  assertClose(requestEnvelope.request.receiver.velocity.x, -0.5, "moving-receiver velocity x");

  const root = responseEnvelope.response.roots[0];
  const hit = responseEnvelope.response.hits[0];
  assert(root, "moving-receiver root missing");
  assert(hit, "moving-receiver hit missing");
  assertClose(root.emissionTime, 5, "moving-receiver root emission time");
  assertClose(root.hitTime, 10, "moving-receiver root hit time");
  assertClose(root.distance, 5, "moving-receiver root distance");
  assertClose(root.sourceNormalDenominator, 1, "moving-receiver root source-normal denominator");
  assertClose(root.receiverNormalNumerator, 1.5, "moving-receiver root receiver-normal numerator");
  assertClose(root.receiverNormalFactor, 1.5, "moving-receiver root receiver-normal factor");
  assertClose(root.branchWeight, 1.5, "moving-receiver root branch weight");
  assertClose(hit.strength, 1.5, "moving-receiver hit strength");
  const failures = receiverNormalInvariantFailures(responseEnvelope);
  assert(
    failures.length === 0,
    `moving-receiver fixture should satisfy receiver-normal invariants: ${failures.join(", ")}`
  );

  const rootProxy = deepClone(responseEnvelope);
  rootProxy.response.roots[0].branchWeight = root.sourceNormalDenominator;
  assert(
    receiverNormalInvariantFailures(rootProxy).includes("root_branch_weight_mismatch"),
    "moving-receiver root source-normal proxy negative control did not fail"
  );

  const hitProxy = deepClone(responseEnvelope);
  hitProxy.response.hits[0].strength = hit.sourceNormalDenominator;
  assert(
    receiverNormalInvariantFailures(hitProxy).includes("hit_strength_mismatch"),
    "moving-receiver hit source-normal proxy negative control did not fail"
  );

  const mixedRecordProxy = deepClone(responseEnvelope);
  mixedRecordProxy.response.hits[0].receiverNormalNumerator = 1;
  mixedRecordProxy.response.hits[0].receiverNormalCrossingFactor = 1;
  mixedRecordProxy.response.hits[0].receiverNormalFactor = 1;
  mixedRecordProxy.response.hits[0].unsignedReceiverNormalFactor = 1;
  mixedRecordProxy.response.hits[0].strength = 1;
  assert(
    receiverNormalInvariantFailures(mixedRecordProxy).includes("same_record_receiver_normal_mismatch"),
    "moving-receiver mixed-record receiver-normal negative control did not fail"
  );
}

function receiverNormalInvariantFailures(responseEnvelope) {
  const failures = [];
  const rootsById = new Map();
  for (const root of responseEnvelope.response.roots ?? []) {
    rootsById.set(root.rootId, root);
    const expectedReceiverNormalFactor =
      root.receiverNormalNumerator / root.sourceNormalDenominator;
    const expectedBranchWeight = Math.abs(expectedReceiverNormalFactor);
    if (!closeEnough(root.receiverNormalFactor, expectedReceiverNormalFactor)) {
      failures.push("root_receiver_normal_factor_mismatch");
    }
    if (!closeEnough(root.unsignedReceiverNormalFactor, expectedBranchWeight)) {
      failures.push("root_unsigned_receiver_normal_factor_mismatch");
    }
    if (!closeEnough(root.branchWeight, expectedBranchWeight)) {
      failures.push("root_branch_weight_mismatch");
    }
  }
  for (const hit of responseEnvelope.response.hits ?? []) {
    const expectedReceiverNormalFactor =
      hit.receiverNormalNumerator / hit.sourceNormalDenominator;
    const expectedStrength = Math.abs(expectedReceiverNormalFactor);
    if (!closeEnough(hit.receiverNormalFactor, expectedReceiverNormalFactor)) {
      failures.push("hit_receiver_normal_factor_mismatch");
    }
    if (!closeEnough(hit.unsignedReceiverNormalFactor, expectedStrength)) {
      failures.push("hit_unsigned_receiver_normal_factor_mismatch");
    }
    if (!closeEnough(hit.strength, expectedStrength)) {
      failures.push("hit_strength_mismatch");
    }

    const root = rootsById.get(hit.rootId);
    if (!root) {
      failures.push("same_record_root_missing");
      continue;
    }
    const sameRecordFields = [
      ["sourceNormalSpeed", root.sourceNormalSpeed, hit.sourceNormalSpeed],
      ["receiverNormalSpeed", root.receiverNormalSpeed, hit.receiverNormalSpeed],
      ["sourceNormalDenominator", root.sourceNormalDenominator, hit.sourceNormalDenominator],
      ["receiverNormalNumerator", root.receiverNormalNumerator, hit.receiverNormalNumerator],
      ["receiverNormalCrossingFactor", root.receiverNormalCrossingFactor, hit.receiverNormalCrossingFactor],
      ["receiverNormalFactor", root.receiverNormalFactor, hit.receiverNormalFactor],
      ["unsignedReceiverNormalFactor", root.unsignedReceiverNormalFactor, hit.unsignedReceiverNormalFactor],
      ["receiverNormalStatusCode", root.receiverNormalStatusCode, hit.receiverNormalStatusCode],
    ];
    if (sameRecordFields.some(([, rootValue, hitValue]) => !closeEnough(rootValue, hitValue))) {
      failures.push("same_record_receiver_normal_mismatch");
    }
    if (!closeEnough(hit.strength, root.branchWeight)) {
      failures.push("same_record_hit_strength_mismatch");
    }
  }
  return failures;
}

function closeEnough(actual, expected) {
  return Math.abs(actual - expected) <= 1e-10;
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
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
  const bridgeMethods = readWorkerBridgeMethods();
  const clientMethods = readSolverClientMethods();
  assertSameOrderedList(actualMethods, bridgeMethods, "schema worker method enum", "SolverAppWorkerBridge methods");
  assertSameSet(actualMethods, clientMethods, "schema worker method enum", "SolverClient methods");
}

function readWorkerBridgeMethods() {
  const match = workerBridgeSource.match(/SOLVER_APP_WORKER_METHODS\s*=\s*Object\.freeze\(\[([\s\S]*?)\]\)/u);
  assert(match, "unable to read SOLVER_APP_WORKER_METHODS from worker bridge");
  return [...match[1].matchAll(/"([A-Za-z][A-Za-z0-9_]*)"/gu)].map((entry) => entry[1]);
}

function readSolverClientMethods() {
  const match = bridgeContractSource.match(/export interface SolverClient \{([\s\S]*?)\n\}/u);
  assert(match, "unable to read SolverClient interface from bridge contract declarations");
  return [...match[1].matchAll(/^\s{2}([A-Za-z][A-Za-z0-9_]*)\(/gmu)].map((entry) => entry[1]);
}

function assertSameOrderedList(left, right, leftLabel, rightLabel) {
  assert(
    left.length === right.length,
    `${leftLabel} count ${left.length} does not match ${rightLabel} count ${right.length}`
  );
  left.forEach((value, index) => {
    assert(value === right[index], `${leftLabel} ${value} does not match ${rightLabel} ${right[index]} at ${index}`);
  });
}

function assertSameSet(left, right, leftLabel, rightLabel) {
  const missing = left.filter((value) => !right.includes(value));
  const extra = right.filter((value) => !left.includes(value));
  assert(missing.length === 0, `${rightLabel} missing ${leftLabel} value(s): ${missing.join(", ")}`);
  assert(extra.length === 0, `${rightLabel} has extra value(s) not in ${leftLabel}: ${extra.join(", ")}`);
}

function createNeutralReceiverNormalFields() {
  return {
    sourceNormalSpeed: 0,
    receiverNormalSpeed: 0,
    sourceNormalDenominator: 1,
    receiverNormalNumerator: 1,
    receiverNormalCrossingFactor: 1,
    receiverNormalFactor: 1,
    unsignedReceiverNormalFactor: 1,
    receiverNormalStatusCode: 0,
  };
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

function createCircularSourceCausalRootsRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "circular-source-causal-roots-f64-request",
    requestId: "circular-source-causal-roots-contract-request",
    request: createCircularSourceRootRequestFixture(),
  };
}

function createCircularSourceCausalRootsResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "circular-source-causal-roots-f64-response",
    requestId: "circular-source-causal-roots-contract-request",
    response: {
      roots: [createCircularSourceRootFixture()],
      status: createStatusFixture("ok", "ok", "circular-source causal roots solved"),
    },
  };
}

function createCircularSourceRootsHitsLedgerRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "circular-source-roots-hits-ledger-f64-request",
    requestId: "circular-source-roots-hits-ledger-contract-request",
    request: createCircularSourceRootRequestFixture(),
  };
}

function createCircularSourceRootRequestFixture() {
  return {
    source: {
      startTime: 0,
      endTime: 1,
      center: { x: 0, y: 0, z: 0 },
      radiusU: { x: 1, y: 0, z: 0 },
      radiusV: { x: 0, y: 1, z: 0 },
      angularVelocity: 1,
      phaseAtEpoch: 0,
      epochTime: 0,
      errorBound: 1e-12,
    },
    receiver: {
      startTime: 0,
      endTime: 1,
      positionAtStart: { x: 2, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      errorBound: 1e-12,
    },
    hitTime: 1,
    signalSpeed: 1,
    rootTolerance: 1e-13,
    maxIterations: 128,
    scanSubdivisions: 64,
    maxRoots: 4,
    streamId: "circular-source-contract-stream",
  };
}

function createCircularSourceRootsHitsLedgerResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "circular-source-roots-hits-ledger-f64-response",
    requestId: "circular-source-roots-hits-ledger-contract-request",
    response: createCircularSourceRootsHitsLedgerResponseFixture(),
  };
}

function createCircularSourceRootsHitsLedgerResponseFixture() {
  const root = createCircularSourceRootFixture();
  const hit = createCircularSourceHitFixture(root);
  const rootBuffer = {
    bufferId: "circular-source-root-ledger",
    layout: "root_ledger.v1",
    byteOffset: 0,
    byteLength: ROOT_LEDGER_ROW_F64_BYTES,
    rowCount: 1,
    numericType: "f64",
  };
  const hitBuffer = {
    bufferId: "circular-source-delayed-hit-events",
    layout: "delayed_hit_events.v1",
    byteOffset: 0,
    byteLength: DELAYED_HIT_ROW_F64_BYTES,
    rowCount: 1,
    numericType: "f64",
  };
  const detailBuffer = {
    bufferId: "circular-source-root-ledger-detail",
    layout: "root_ledger_detail.v1",
    byteOffset: 0,
    byteLength: ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
    rowCount: 1,
    numericType: "f64",
  };
  const circularStatus = createStatusFixture(
    "ok",
    "info",
    "circular-source roots, delayed hits, and ledger rows solved natively"
  );
  return {
    schema: "solver-circular-source-roots-hits-ledger-f64.v1",
    roots: [root],
    hits: [hit],
    rootLedgerDetails: [createRootLedgerDetailFixture()],
    buffers: [rootBuffer, hitBuffer, detailBuffer],
    streams: [createCircularSourceStreamFixture([rootBuffer, hitBuffer, detailBuffer])],
    statuses: [circularStatus],
    status: createStatusFixture("ok", "ok", "circular-source roots, delayed hits, and ledger rows solved"),
  };
}

function createCircularSourceRootFixture() {
  return {
    ...response.response.roots[0],
    emissionTime: 0,
    hitTime: 1,
    delay: 1,
    distance: 1,
    sourcePoint: { x: 1, y: 0, z: 0 },
    receiverPoint: { x: 2, y: 0, z: 0 },
  };
}

function createCircularSourceHitFixture(root) {
  return {
    ...response.response.hits[0],
    emissionTime: root.emissionTime,
    hitTime: root.hitTime,
    distance: root.distance,
    emissionPoint: root.sourcePoint,
    receiverPoint: root.receiverPoint,
    unitDirection: { x: 1, y: 0, z: 0 },
  };
}

function createCircularSourceStreamFixture(buffers) {
  let byteStart = 0;
  return {
    streamId: "circular-source-contract-stream",
    manifestVersion: "solver-stream-manifest.v1",
    indexLayout: "stream_index.v1",
    metadata: createRunStreamMetadataFixture(),
    availableRanges: buffers.map((buffer) => {
      const byteEnd = byteStart + buffer.byteLength;
      const range = {
        timeRange: { start: 1, end: 1 },
        frameRange: { start: 0, end: 0 },
        byteRange: { start: byteStart, end: byteEnd },
      };
      byteStart = byteEnd;
      return range;
    }),
    storagePolicy: {
      target: "caller-buffer",
      durable: false,
      maxBytes: buffers.reduce((total, buffer) => total + buffer.byteLength, 0),
    },
  };
}

function createCircularSourceRootsHitsLedgerNormalizedRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "circular-source-roots-hits-ledger-normalized-f64-request",
    requestId: "circular-source-roots-hits-ledger-normalized-contract-request",
    request: {
      coordinateOrigin: { x: 1e18, y: -2e18, z: 3e18 },
      localRequest: circularSourceRootsHitsLedgerRequest.request,
      restoreAbsolutePoints: true,
    },
  };
}

function createCircularSourceRootsHitsLedgerNormalizedResponseEnvelope() {
  const localResponse = createCircularSourceRootsHitsLedgerResponseFixture();
  const root = {
    ...localResponse.roots[0],
    coordinateFrame: "origin-normalized",
  };
  const normalizedStatus = createStatusFixture(
    "ok",
    "ok",
    "origin-normalized circular-source roots, hits, and ledger rows solved"
  );
  return {
    schema: "solver-app-bridge/v1",
    kind: "circular-source-roots-hits-ledger-normalized-f64-response",
    requestId: "circular-source-roots-hits-ledger-normalized-contract-request",
    response: {
      schema: "solver-circular-source-roots-hits-ledger-normalized-f64.v1",
      coordinateFrame: "origin-normalized",
      coordinateOrigin: { x: 1e18, y: -2e18, z: 3e18 },
      localRequest: circularSourceRootsHitsLedgerNormalizedRequest.request.localRequest,
      roots: [root],
      hits: localResponse.hits,
      rootLedgerDetails: localResponse.rootLedgerDetails,
      absoluteRoots: [
        {
          ...root,
          coordinateFrame: "absolute-display",
          sourcePoint: { x: 1e18, y: -2e18, z: 3e18 },
          receiverPoint: { x: 1e18, y: -2e18, z: 3e18 },
          localSourcePoint: root.sourcePoint,
          localReceiverPoint: root.receiverPoint,
          absolutePointAuthority: "display-only",
        },
      ],
      buffers: localResponse.buffers,
      streams: localResponse.streams,
      statuses: [...localResponse.statuses, normalizedStatus],
      status: normalizedStatus,
    },
  };
}

function createCausalRootsPrecisionRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-roots-precision-f64-request",
    requestId: "causal-roots-precision-contract-request",
    request: {
      rootRequest: {
        ...request.request,
        rootTolerance: 1e-16,
      },
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
    selectedNumericChart: "interval_bounds",
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
    escalations: [
      {
        priorPrecisionPath: "scaled_f64_strict",
        newPrecisionPath: "extended_precision",
        triggeringDiagnostic: "precision-diagnostic",
        affectedStage: "precision-path",
        claimLevelSatisfied: true,
      },
    ],
    validationReplayRun: true,
    validationReplayMatched: true,
  };
}

function createRootLedgerDetailFixture(options = {}) {
  const rootTolerance = options.rootTolerance ?? 1e-13;
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
    residualScale: 10,
    absoluteResidual: 0,
    normalizedResidual: 0,
    rootTolerance,
    jacobian: 1,
    branchWeight: 1,
    bracketStart: 0,
    bracketEnd: 0,
    sourcePoint: { x: 0, y: 0, z: 0 },
    receiverPoint: { x: 10, y: 0, z: 0 },
    ...createNeutralReceiverNormalFields(),
    entryKind: 1,
    rootKind: 1,
    statusCode: 0,
    jacobianSignStratum: 3,
    sequenceIndex: 0,
    iterationCount: 1,
    stateFlags: 0,
    firstFailureCode: 0,
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
          byteLength: ROOT_LEDGER_ROW_F64_BYTES,
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
      rootRequest: {
        ...request.request,
        rootTolerance: 1e-16,
      },
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
      rootLedgerDetails: [createRootLedgerDetailFixture({ rootTolerance: 1e-16 })],
      precision: createPrecisionSummaryFixture(),
      buffers: [
        {
          bufferId: "precision-root-ledger",
          layout: "root_ledger.v1",
          byteOffset: 0,
          byteLength: ROOT_LEDGER_ROW_F64_BYTES,
          rowCount: 1,
          numericType: "f64",
        },
        {
          bufferId: "precision-delayed-hit-events",
          layout: "delayed_hit_events.v1",
          byteOffset: 0,
          byteLength: DELAYED_HIT_ROW_F64_BYTES,
          rowCount: 1,
          numericType: "f64",
        },
        {
          bufferId: "precision-root-ledger-detail",
          layout: "root_ledger_detail.v1",
          byteOffset: 0,
          byteLength: ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
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
              byteRange: { start: 0, end: ROOT_LEDGER_ROW_F64_BYTES },
            },
            {
              timeRange: { start: 10, end: 10 },
              frameRange: { start: 0, end: 0 },
              byteRange: {
                start: ROOT_LEDGER_ROW_F64_BYTES,
                end: ROOT_LEDGER_ROW_F64_BYTES + DELAYED_HIT_ROW_F64_BYTES,
              },
            },
            {
              timeRange: { start: 10, end: 10 },
              frameRange: { start: 0, end: 0 },
              byteRange: {
                start: ROOT_LEDGER_ROW_F64_BYTES + DELAYED_HIT_ROW_F64_BYTES,
                end:
                  ROOT_LEDGER_ROW_F64_BYTES +
                  DELAYED_HIT_ROW_F64_BYTES +
                  ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
              },
            },
          ],
          storagePolicy: {
            target: "caller-buffer",
            durable: false,
            maxBytes:
              ROOT_LEDGER_ROW_F64_BYTES + DELAYED_HIT_ROW_F64_BYTES + ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
          },
          metadata: createRunStreamMetadataFixture(),
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

function createRootLedgerDetailRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "root-ledger-detail-f64-request",
    requestId: "root-ledger-detail-contract-request",
    request: {
      ...request.request,
      maxRows: 8,
    },
  };
}

function createRootLedgerDetailResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "root-ledger-detail-f64-response",
    requestId: "root-ledger-detail-contract-request",
    response: {
      rows: [createRootLedgerDetailFixture()],
      buffers: [
        createBufferDescriptorFixture(
          "root-ledger-detail-contract-buffer",
          "root_ledger_detail.v1",
          ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
          1
        ),
      ],
      status: createStatusFixture("ok", "ok", "root-ledger detail fixture"),
    },
  };
}

function createPrecisionDiagnosticRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "precision-diagnostic-f64-request",
    requestId: "precision-diagnostic-contract-request",
    request: request.request,
  };
}

function createPrecisionDiagnosticResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "precision-diagnostic-f64-response",
    requestId: "precision-diagnostic-contract-request",
    response: {
      statusCode: 0,
      recommendedPath: "scaled_f64_strict",
      recommendedNumericType: "f64",
      recommendedChart: "local_frame",
      speedChart: "log_magnitude",
      scaleNormalizationRecommended: true,
      extendedPrecisionRecommended: false,
      scaleResolutionLimited: false,
      timeResolutionLimited: false,
      timeScale: createMagnitudeSummaryFixture(),
      geometryScale: createMagnitudeSummaryFixture(),
      speedScale: createMagnitudeMaxSummaryFixture(),
      toleranceScale: createMagnitudeMinSummaryFixture(),
      status: createStatusFixture("ok", "ok", "precision diagnostic fixture"),
    },
  };
}

function createErrorBudgetPropagationRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "error-budget-propagation-f64-request",
    requestId: "error-budget-propagation-contract-request",
    request: {
      errorBudget: createRunErrorBudget(),
      stages: [
        {
          stage: "root_isolation",
          estimatedAbsoluteError: 1e-15,
        },
      ],
      maxRows: 4,
    },
  };
}

function createErrorBudgetPropagationResponseEnvelope() {
  const stageStatus = createStatusFixture("ok", "ok", "root isolation budget inside tolerance");
  return {
    schema: "solver-app-bridge/v1",
    kind: "error-budget-propagation-f64-response",
    requestId: "error-budget-propagation-contract-request",
    response: {
      cumulativeError: 1e-15,
      cumulativeBudgetRatio: 0.1,
      authority: "authoritative",
      stages: [
        {
          stage: "root_isolation",
          estimatedAbsoluteError: 1e-15,
          tolerance: 1e-14,
          toleranceRatio: 0.1,
          authority: "authoritative",
          status: stageStatus,
        },
      ],
      statuses: [stageStatus],
      status: createStatusFixture("ok", "ok", "error budget propagated"),
    },
  };
}

function createRootHitInvariantRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "root-hit-invariant-f64-request",
    requestId: "root-hit-invariant-contract-request",
    request: {
      roots: response.response.roots,
      hits: response.response.hits,
      options: {
        rootResidualTolerance: 1e-12,
        timeTolerance: 1e-12,
        distanceTolerance: 1e-12,
        directionTolerance: 1e-12,
        branchWeightTolerance: 1e-12,
        smallJacobianTolerance: 1e-12,
      },
    },
  };
}

function createRootHitInvariantResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "root-hit-invariant-f64-response",
    requestId: "root-hit-invariant-contract-request",
    response: {
      rootCount: 1,
      hitCount: 1,
      statuses: [createStatusFixture("ok", "ok", "root-hit invariants passed")],
      status: createStatusFixture("ok", "ok", "root-hit invariant fixture"),
    },
  };
}

function createRootLedgerTransitionRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "root-ledger-transition-f64-request",
    requestId: "root-ledger-transition-contract-request",
    request: {
      priorRows: [createRootLedgerDetailFixture()],
      nextRows: [createRootLedgerDetailFixture()],
    },
  };
}

function createRootLedgerTransitionResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "root-ledger-transition-f64-response",
    requestId: "root-ledger-transition-contract-request",
    response: {
      transitions: [
        {
          transitionKey: "0000000000001b59",
          kind: "retained",
          priorRootKey: 4001,
          nextRootKey: 4001,
          sourceKey: 2001,
          receiverKey: 3001,
          intervalStart: 0,
          intervalEnd: 10,
          priorEntryKind: 1,
          nextEntryKind: 1,
          priorStatusCode: 0,
          nextStatusCode: 0,
          priorJacobianSignStratum: 3,
          nextJacobianSignStratum: 3,
          status: createStatusFixture("ok", "ok", "root retained"),
        },
      ],
      statuses: [createStatusFixture("ok", "ok", "root transition fixture")],
      status: createStatusFixture("ok", "ok", "root-ledger transitions classified"),
    },
  };
}

function createCausalRootBatchRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "causal-root-batch-f64-request",
    requestId: "causal-root-batch-contract-request",
    request: {
      requests: [request.request],
      maxItems: 1,
      maxRoots: 4,
      workerCount: 1,
    },
  };
}

function createLinearMotionSampleRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "linear-motion-sample-f64-request",
    requestId: "linear-motion-sample-contract-request",
    request: createLinearMotionSampleRequestFixture(),
  };
}

function createLinearMotionSampleResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "linear-motion-sample-f64-response",
    requestId: "linear-motion-sample-contract-request",
    response: {
      frames: [createMotionFrameFixture({ pathKey: 2000, frameIndex: 0, time: 0, x: 0, y: 0, z: 0 })],
      buffers: [createBufferDescriptorFixture("linear-motion-frame-buffer", "frame_buffer.v1", 88, 1)],
      status: createStatusFixture("ok", "ok", "linear motion sampled"),
    },
  };
}

function createLinearMotionSampleRequestFixture() {
  return {
    pathKey: 2000,
    segment: request.request.source,
    startTime: 0,
    endTime: 1,
    step: 1,
    stateFlags: 1,
    maxFrames: 2,
  };
}

function createPhaseAtHitRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "phase-at-hit-f64-request",
    requestId: "phase-at-hit-contract-request",
    request: {
      roots: response.response.roots,
      sourceClock: { period: 3, epoch: 0, phaseOffset: 0 },
      receiverClock: { period: 3, epoch: 0, phaseOffset: 0 },
      metadata: [createPhaseAtHitMetadataFixture()],
    },
  };
}

function createPhaseAtHitResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "phase-at-hit-f64-response",
    requestId: "phase-at-hit-contract-request",
    response: {
      rows: [createPhaseAtHitRowFixture()],
      buffers: [createBufferDescriptorFixture("phase-at-hit-buffer", "phase_at_hit.v1", 88, 1)],
      status: createStatusFixture("ok", "ok", "phase-at-hit rows computed"),
    },
  };
}

function createPhaseAtHitSummaryRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "phase-at-hit-summary-f64-request",
    requestId: "phase-at-hit-summary-contract-request",
    request: {
      rows: [createPhaseAtHitRowFixture()],
    },
  };
}

function createPhaseAtHitSummaryResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "phase-at-hit-summary-f64-response",
    requestId: "phase-at-hit-summary-contract-request",
    response: {
      summary: createPhaseAtHitSummaryFixture(),
      status: createStatusFixture("ok", "ok", "phase-at-hit summary computed"),
    },
  };
}

function createPhaseAtHitMetadataFixture() {
  return {
    rootKind: 1,
    sourceLayerCode: 2,
    receiverLayerCode: 3,
    sourceRoleCode: 4,
    receiverRoleCode: 5,
    sourceChargeSign: 1,
    receiverChargeSign: -1,
    stateFlags: 0,
  };
}

function createPhaseAtHitRowFixture() {
  return {
    rootId: 0,
    statusCode: 0,
    sourceCycleIndex: 3,
    receiverCycleIndex: 3,
    emissionTime: 0,
    hitTime: 10,
    sourcePhase: 0,
    receiverPhase: 1 / 3,
    phaseDelta: 1 / 3,
    phaseSpread: 1 / 3,
    ...createPhaseAtHitMetadataFixture(),
  };
}

function createPhaseAtHitSummaryFixture() {
  const range = { start: 0, end: 0 };
  const phaseRange = { start: 1 / 3, end: 1 / 3 };
  return {
    schema: "solver-phase-at-hit-summary.v1",
    rowCount: 1,
    rootIdRange: range,
    statusCounts: [{ statusCode: 0, rowCount: 1 }],
    sourceCycleIndexRange: { start: 3, end: 3 },
    receiverCycleIndexRange: { start: 3, end: 3 },
    emissionTimeRange: range,
    hitTimeRange: { start: 10, end: 10 },
    sourcePhaseRange: range,
    receiverPhaseRange: phaseRange,
    phaseDeltaRange: phaseRange,
    phaseSpreadRange: phaseRange,
    meanPhaseDelta: 1 / 3,
    meanPhaseSpread: 1 / 3,
    maxPhaseSpread: 1 / 3,
  };
}

function createSharedGeometryRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "shared-geometry-f64-request",
    requestId: "shared-geometry-contract-request",
    request: {
      pathBounds: [
        {
          pathKey: 2000,
          segment: request.request.source,
        },
      ],
      spherePointIntersections: [
        {
          center: { x: 0, y: 0, z: 0 },
          radius: 1,
          point: { x: 0.5, y: 0, z: 0 },
          tolerance: 1e-12,
        },
      ],
      delayedPotentials: [
        {
          source: request.request.source,
          samplePoint: { x: 1, y: 0, z: 0 },
          observationTime: 2,
          fieldSpeed: 1,
          normalization: 1,
          softening: 1e-12,
          sourceCharge: 1,
          iterations: 8,
          useCausalDenominator: true,
        },
      ],
      circularSelfHitSpans: [
        {
          fieldSpeedRatio: 0.5,
          fieldSpeedTolerance: 1e-12,
          tolerance: 1e-12,
          maxIterations: 32,
          scanSubdivisions: 64,
          maxAngle: Math.PI,
        },
      ],
    },
  };
}

function createSharedGeometryResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "shared-geometry-f64-response",
    requestId: "shared-geometry-contract-request",
    response: {
      pathBounds: [
        {
          itemIndex: 0,
          statusCode: 0,
          pathKey: 2000,
          min: { x: 0, y: 0, z: 0 },
          max: { x: 10, y: 0, z: 0 },
        },
      ],
      spherePointIntersections: [
        {
          itemIndex: 0,
          intersects: true,
          centerDistance: 0.5,
          signedDistance: -0.5,
        },
      ],
      delayedPotentials: [
        {
          itemIndex: 0,
          statusCode: 0,
          tau: 1,
          emissionTime: 1,
          emissionPoint: { x: 1, y: 0, z: 0 },
          displacement: { x: 0, y: 0, z: 0 },
          distance: 0,
          denominator: 1,
          potential: 1,
          kappa: 0,
          iterations: 1,
          usedCausalDenominator: true,
        },
      ],
      circularSelfHitSpans: [
        {
          itemIndex: 0,
          statusCode: 0,
          fieldSpeedRatio: 0.5,
          fieldSpeedTolerance: 1e-12,
          regime: "sub_field",
          resultKind: "below_threshold",
          span: 0,
          rootFound: false,
          bracketLow: 0,
          bracketHigh: Math.PI,
          residual: 0,
          iterations: 0,
        },
      ],
      status: createStatusFixture("ok", "ok", "shared geometry fixture"),
    },
  };
}

function createAssemblyMembershipEventsRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-membership-events-f64-request",
    requestId: "assembly-membership-events-contract-request",
    request: {
      memberships: [createAssemblyMembershipFixture()],
      maxEvents: 8,
    },
  };
}

function createAssemblyMembershipEventsResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-membership-events-f64-response",
    requestId: "assembly-membership-events-contract-request",
    response: {
      events: [createAssemblyEventFixture()],
      buffers: [createBufferDescriptorFixture("assembly-events-buffer", "assembly_events.v1", 88, 1)],
      status: createStatusFixture("ok", "ok", "assembly membership events fixture"),
    },
  };
}

function createAssemblyGraphDatasetRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-dataset-f64-request",
    requestId: "assembly-graph-dataset-contract-request",
    request: {
      assemblyStates: [createAssemblyStateFixture()],
      memberships: [createAssemblyMembershipFixture()],
      hierarchy: [createAssemblyHierarchyFixture()],
      events: [createAssemblyEventFixture()],
      deriveMembershipEvents: true,
      maxEvents: 8,
    },
  };
}

function createAssemblyGraphDatasetResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-dataset-f64-response",
    requestId: "assembly-graph-dataset-contract-request",
    response: {
      schema: "solver-assembly-graph-dataset.v1",
      summary: createAssemblyGraphSummaryFixture(),
      assemblyStates: [createAssemblyStateFixture()],
      memberships: [createAssemblyMembershipFixture()],
      hierarchy: [createAssemblyHierarchyFixture()],
      events: [createAssemblyEventFixture()],
      buffers: createAssemblyGraphBuffersFixture(),
      status: createStatusFixture("ok", "ok", "assembly graph dataset fixture"),
    },
  };
}

function createAssemblyGraphStoreRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-store-f64-request",
    requestId: "assembly-graph-store-contract-request",
    request: {
      storeId: "fixture-assembly-graph-store",
      assemblyStates: [createAssemblyStateFixture()],
      memberships: [createAssemblyMembershipFixture()],
      hierarchy: [createAssemblyHierarchyFixture()],
      events: [createAssemblyEventFixture()],
      deriveMembershipEvents: true,
      maxEvents: 8,
      storagePolicy: createStoragePolicyFixture(),
    },
  };
}

function createAssemblyGraphStoreResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-store-f64-response",
    requestId: "assembly-graph-store-contract-request",
    response: {
      schema: "solver-assembly-graph-store.v1",
      store: createAssemblyGraphStoreManifestFixture(),
      summary: createAssemblyGraphSummaryFixture(),
      buffers: createAssemblyGraphBuffersFixture(),
      status: createStatusFixture("ok", "ok", "assembly graph store fixture"),
    },
  };
}

function createDescribeAssemblyGraphStoreRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "describe-assembly-graph-store-f64-request",
    requestId: "describe-assembly-graph-store-contract-request",
    request: {
      storeId: "fixture-assembly-graph-store",
    },
  };
}

function createAssemblyGraphStoreDescriptionResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-store-description-f64-response",
    requestId: "describe-assembly-graph-store-contract-request",
    response: {
      schema: "solver-assembly-graph-store-description.v1",
      store: createAssemblyGraphStoreManifestFixture(),
      buffers: createAssemblyGraphBuffersFixture(),
      status: createStatusFixture("ok", "ok", "assembly graph store description fixture"),
    },
  };
}

function createAssemblyGraphStoreReadRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-store-read-f64-request",
    requestId: "assembly-graph-store-read-contract-request",
    request: {
      storeId: "fixture-assembly-graph-store",
      layouts: ["assembly_membership.v1", "assembly_events.v1"],
      rowOffset: 0,
      rowCount: 1,
      pathKey: 2000,
      assemblyKey: 3000,
      timeRange: { start: 0, end: 1 },
      byteRange: { start: 0, end: 168 },
      maxBytes: 168,
    },
  };
}

function createAssemblyGraphStoreReadResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "assembly-graph-store-read-f64-response",
    requestId: "assembly-graph-store-read-contract-request",
    response: {
      schema: "solver-assembly-graph-read.v1",
      storeId: "fixture-assembly-graph-store",
      manifestVersion: "solver-assembly-graph-manifest.v1",
      readSummary: {
        schema: "solver-assembly-graph-read-summary.v1",
        assemblyStateCount: 0,
        membershipCount: 1,
        hierarchyCount: 0,
        eventCount: 1,
        bufferCount: 2,
        byteLength: 168,
        indexed: true,
        indexedLayoutCount: 2,
        indexRowCount: 2,
        indexSkippedRowCount: 0,
      },
      assemblyStates: [],
      memberships: [createAssemblyMembershipFixture()],
      hierarchy: [],
      events: [createAssemblyEventFixture()],
      buffers: [
        createBufferDescriptorFixture("assembly-membership-read-buffer", "assembly_membership.v1", 80, 1),
        createBufferDescriptorFixture("assembly-events-read-buffer", "assembly_events.v1", 88, 1),
      ],
      status: createStatusFixture("ok", "ok", "assembly graph store read fixture"),
    },
  };
}

function createAssemblyGraphSummaryFixture() {
  return {
    schema: "solver-assembly-graph-summary.v1",
    assemblyStateCount: 1,
    membershipCount: 1,
    hierarchyCount: 1,
    eventCount: 1,
    derivedEventCount: 1,
    explicitEventCount: 0,
    assemblyCount: 1,
    pathCount: 1,
    bufferCount: 4,
    eventSource: "derived",
    timeRange: { start: 0, end: 1 },
  };
}

function createAssemblyStateFixture() {
  return {
    assemblyKey: 3000,
    assemblyStateKey: 3001,
    timeStart: 0,
    timeEnd: 1,
    center: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    phase: 0,
    cycleIndex: 0,
    modelVersion: 1,
    statusFlags: 0,
    fidelityFlags: 0,
  };
}

function createAssemblyMembershipFixture() {
  return {
    membershipKey: 1001,
    pathKey: 2000,
    assemblyKey: 3000,
    assemblyStateKey: 3001,
    timeStart: 0,
    timeEnd: 1,
    confidence: 1,
    localRole: 1,
    bindingState: 1,
    membershipVersion: 1,
    eventKind: 1,
    statusFlags: 0,
  };
}

function createAssemblyHierarchyFixture() {
  return {
    hierarchyKey: 4001,
    parentAssemblyKey: 3000,
    childAssemblyKey: 3001,
    timeStart: 0,
    timeEnd: 1,
    relationType: 1,
    hierarchyVersion: 1,
    statusFlags: 0,
  };
}

function createAssemblyEventFixture() {
  return {
    eventKey: 5001,
    primaryId: 1001,
    secondaryId: 0,
    priorStateKey: 3001,
    nextStateKey: 3001,
    relatedPathKey: 2000,
    relatedAssemblyKey: 3000,
    branchTransitionKey: 0,
    eventTime: 0,
    eventKind: 1,
    speedRegime: 0,
    statusFlags: 0,
  };
}

function createAssemblyGraphBuffersFixture() {
  return [
    createBufferDescriptorFixture("assembly-state-buffer", "assembly_state.v1", 112, 1),
    createBufferDescriptorFixture("assembly-membership-buffer", "assembly_membership.v1", 80, 1),
    createBufferDescriptorFixture("assembly-hierarchy-buffer", "assembly_hierarchy.v1", 56, 1),
    createBufferDescriptorFixture("assembly-events-buffer", "assembly_events.v1", 88, 1),
  ];
}

function createAssemblyGraphStoreManifestFixture() {
  return {
    storeId: "fixture-assembly-graph-store",
    manifestVersion: "solver-assembly-graph-manifest.v1",
    numericType: "f64",
    byteOrder: "little-endian",
    timeRange: { start: 0, end: 1 },
    durable: false,
    metadataPath: ".tmp/fixture-assembly-graph-store/manifest.json",
    storagePolicy: createStoragePolicyFixture(),
    summary: createAssemblyGraphSummaryFixture(),
    index: {
      schema: "solver-assembly-graph-index.v1",
      indexedFilters: ["pathKey", "assemblyKey", "timeRange", "rowRange", "byteRange"],
      rowCount: 2,
      rows: [
        createAssemblyGraphIndexRowFixture("assembly_membership.v1", "path", 2000, 0, 1, 0, 80),
        createAssemblyGraphIndexRowFixture("assembly_events.v1", "assembly", 3000, 0, 1, 80, 168),
      ],
      summary: {
        schema: "solver-assembly-graph-index-summary.v1",
        rowCount: 2,
        countsByLayout: {
          "assembly_membership.v1": 1,
          "assembly_events.v1": 1,
        },
        countsByKeyKind: {
          path: 1,
          assembly: 1,
        },
      },
      sidecar: {
        schema: "solver-assembly-graph-index-sidecar.v1",
        indexLayout: "assembly_graph_index.v1",
        numericType: "f64",
        byteOrder: "little-endian",
        rowSizeBytes: 72,
        rowCount: 2,
        byteLength: 144,
        filePath: ".tmp/fixture-assembly-graph-store/index.bin",
        checksum: "0123456789abcdef",
      },
    },
    datasets: {
      states: createAssemblyGraphStoreDatasetFixture("assembly_state.v1", 112, 1, "states.bin"),
      memberships: createAssemblyGraphStoreDatasetFixture("assembly_membership.v1", 80, 1, "memberships.bin"),
      hierarchy: createAssemblyGraphStoreDatasetFixture("assembly_hierarchy.v1", 56, 1, "hierarchy.bin"),
      events: createAssemblyGraphStoreDatasetFixture("assembly_events.v1", 88, 1, "events.bin"),
    },
  };
}

function createAssemblyGraphIndexRowFixture(layout, keyKind, key, rowOffset, rowCount, byteStart, byteEnd) {
  return {
    layout,
    keyKind,
    key,
    rowOffset,
    rowCount,
    timeRange: { start: 0, end: 1 },
    byteRange: { start: byteStart, end: byteEnd },
  };
}

function createAssemblyGraphStoreDatasetFixture(layout, rowSizeBytes, rowCount, fileName) {
  return {
    layout,
    rowSizeBytes,
    rowCount,
    byteLength: rowSizeBytes * rowCount,
    path: `.tmp/fixture-assembly-graph-store/${fileName}`,
    checksum: "0123456789abcdef",
  };
}

function createBuildSpaceTimeIndexRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "build-spacetime-index-f64-request",
    requestId: "build-spacetime-index-contract-request",
    request: {
      pathRows: createPathHistoryRows(),
      assemblyStates: [createAssemblyStateFixture()],
      options: createSpaceTimeIndexOptionsFixture(),
      maxRows: 16,
    },
  };
}

function createBuildPathHistoryStreamSpaceTimeIndexRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "build-path-history-stream-spacetime-index-f64-request",
    requestId: "build-path-history-stream-spacetime-index-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      pathKeys: [2000],
      chunkIndices: [0],
      timeRange: { start: 0, end: 1 },
      frameRange: { start: 0, end: 0 },
      byteRange: { start: 0, end: 96 },
      assemblyStates: [createAssemblyStateFixture()],
      options: createSpaceTimeIndexOptionsFixture(),
      maxRows: 16,
      maxBytes: 2048,
    },
  };
}

function createSpaceTimeIndexResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "spacetime-index-f64-response",
    requestId: "build-spacetime-index-contract-request",
    response: {
      rows: [createSpaceTimeIndexRowFixture()],
      buffers: [createBufferDescriptorFixture("spacetime-index-buffer", "spacetime_index.v1", 128, 1)],
      overflowEntryCount: 0,
      status: createStatusFixture("ok", "ok", "space-time index fixture"),
    },
  };
}

function createQuerySpaceTimeIndexRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "query-spacetime-index-f64-request",
    requestId: "query-spacetime-index-contract-request",
    request: {
      rows: [createSpaceTimeIndexRowFixture()],
      query: {
        bounds: {
          min: { x: 0, y: 0, z: 0 },
          max: { x: 1, y: 1, z: 1 },
          timeStart: 0,
          timeEnd: 1,
        },
        filterSpace: true,
        filterTime: true,
        subjectKind: 1,
        subjectKey: 2000,
      },
      options: createSpaceTimeIndexOptionsFixture(),
      maxRows: 16,
    },
  };
}

function createSpaceTimeIndexOptionsFixture() {
  return {
    spatialCellSize: 1,
    timeBinSize: 1,
    maxCellsPerItem: 8,
  };
}

function createSpaceTimeIndexRowFixture() {
  return {
    cellX: 0,
    cellY: 0,
    cellZ: 0,
    cellT: 0,
    subjectKey: 2000,
    rowOffset: 0,
    min: { x: 0, y: 0, z: 0 },
    max: { x: 1, y: 1, z: 1 },
    timeStart: 0,
    timeEnd: 1,
    subjectKind: 1,
    sourceLayout: 1,
    stateFlags: 0,
  };
}

function createMagnitudeSummaryFixture() {
  return {
    ordersOfMagnitude: 0,
    maxMagnitude: 1,
    minNonzeroMagnitude: 1,
  };
}

function createMagnitudeMaxSummaryFixture() {
  return {
    ordersOfMagnitude: 0,
    maxMagnitude: 1,
  };
}

function createMagnitudeMinSummaryFixture() {
  return {
    ordersOfMagnitude: 0,
    minNonzeroMagnitude: 1,
  };
}

function createBufferDescriptorFixture(bufferId, layout, byteLength, rowCount) {
  return {
    bufferId,
    layout,
    byteOffset: 0,
    byteLength,
    rowCount,
    numericType: "f64",
  };
}

function createStoragePolicyFixture() {
  return {
    target: "caller-buffer",
    durable: false,
    maxBytes: 4096,
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
      details: {
        method: "missingMethod",
      },
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
        observations: {
          chunkDurationsMs: [1.25, 1.5, 1.75, 2],
          singleThreadElapsedMs: 8,
          activeElapsedMs: 8,
          contentionWaitMs: 0,
        },
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
      plannedChunkCount: 4,
      plannedChunkItemCount: 4,
      tailChunkItemCount: 4,
      queueDepth: 3,
      determinismStatus: "deterministic",
      contention: {
        source: "caller-observed",
        risk: "none",
        queueDepth: 3,
        oversubscribedWorkerCount: 3,
        observedWaitMs: 0,
      },
      chunkTimings: {
        source: "caller-observed",
        observedChunkCount: 4,
        minMs: 1.25,
        maxMs: 2,
        meanMs: 1.625,
        totalMs: 6.5,
      },
      stageSpeedup: {
        source: "caller-observed",
        baselineWorkerCount: 1,
        comparedWorkerCount: 1,
        speedupRatio: 1,
        parallelEfficiency: 1,
      },
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

function createBinaryLayoutCatalogFixture() {
  const rows = [
    ["frame_buffer.v1", "motion-frame", 88, false],
    ["path_segment.v1", "path-history", 96, true],
    ["assembly_state.v1", "assembly-graph", 112, false],
    ["assembly_membership.v1", "assembly-graph", 80, false],
    ["assembly_hierarchy.v1", "assembly-graph", 56, false],
    ["assembly_events.v1", "assembly-graph", 88, false],
    ["path_chunk.v1", "path-history-index", 104, true],
    ["root_ledger.v1", "root-ledger", ROOT_LEDGER_ROW_F64_BYTES, false],
    ["root_ledger_detail.v1", "root-ledger", ROOT_LEDGER_DETAIL_ROW_F64_BYTES, false],
    ["delayed_hit_events.v1", "delayed-hit", DELAYED_HIT_ROW_F64_BYTES, false],
    ["field_shell_events.v1", "field-shell-event", 160, true],
    ["phase_at_hit.v1", "phase-diagnostic", 104, false],
    ["spacetime_index.v1", "spacetime-index", 128, false],
    ["emission_shell_candidate.v1", "emission-shell", 112, false],
    ["emission_shell_narrow_phase.v1", "emission-shell", 40, false],
    ["stream_index.v1", "path-history-index", 64, true],
    ["assembly_graph_index.v1", "assembly-graph-index", 72, true],
  ];
  return {
    schema: "solver-binary-layout-catalog.v1",
    byteOrder: "little-endian",
    layouts: rows.map(([layout, role, rowSizeBytes, streamable]) => ({
      layout,
      role,
      numericType: "f64",
      rowSizeBytes,
      fixedRowSize: true,
      denseBufferSafe: true,
      authoritativeStorageSafe: true,
      streamable,
    })),
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
      "field_shell_events.v1",
      "phase_at_hit.v1",
      "spacetime_index.v1",
      "emission_shell_candidate.v1",
      "emission_shell_narrow_phase.v1",
      "stream_index.v1",
      "assembly_graph_index.v1",
    ],
    binaryLayouts: createBinaryLayoutCatalogFixture(),
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
          appId: "ideal-braid",
          runKinds: ["delayedHits", "pathHistory", "sharedGeometry", "validationReplay"],
        },
        {
          appId: "t3",
          runKinds: ["motionSimulation", "pathHistory", "validationReplay"],
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
      precisionRouting: {
        schema: "solver-precision-routing-capabilities.v1",
        routes: [
          {
            routeFamily: "linear-root",
            runConfigKeys: ["rootRequest", "normalizedRootRequest"],
            precisionEngine: "native-precision-path",
            precisionSummary: "native-precision-solve-summary-f64",
            fullPrecisionPathSelector: true,
            normalizedCoordinatesSupported: true,
            selectedNumericTypes: ["f64", "decimal128"],
          },
          {
            routeFamily: "circular-source",
            runConfigKeys: ["circularSourceRootRequest", "normalizedCircularSourceRootRequest"],
            precisionEngine: "analytic-circular-source-f64",
            precisionSummary: "analytic-circular-source-run-summary-f64",
            fullPrecisionPathSelector: true,
            normalizedCoordinatesSupported: true,
            selectedNumericTypes: ["f64"],
          },
        ],
      },
      statusTaxonomy: {
        schema: "solver-status-taxonomy.v1",
        severities: ["ok", "info", "warning", "halt", "error"],
        codes: [
          {
            id: 0,
            code: "ok",
            category: "success",
            defaultSeverity: "ok",
            recoverableByDefault: true,
            stageHints: ["all"],
            description: "Operation completed without solver warnings or errors.",
          },
          {
            id: 21,
            code: "unsupported_wasm_threads",
            category: "runtime-support",
            defaultSeverity: "warning",
            recoverableByDefault: true,
            stageHints: ["threading_plan", "app_bridge"],
            description: "Requested WebAssembly internal threading is unavailable in the current runtime.",
          },
          {
            id: 23,
            code: "app_contract_error",
            category: "app-contract",
            defaultSeverity: "error",
            recoverableByDefault: true,
            stageHints: ["app_bridge", "request_validation"],
            description: "App request or bridge message violates the solver contract.",
          },
        ],
      },
      streamQueries: {
        schema: "solver-stream-query-capabilities.v1",
        helpers: [
          "createPathHistoryStreamF64",
          "planPathHistoryStorageLifecycleF64",
          "applyPathHistoryStorageLifecycleF64",
          "describeStream",
          "validatePathHistoryDynamicReplayF64",
          "readStreamRange",
          "buildPathHistoryStreamSpaceTimeIndexF64",
          "queryEmissionShellCandidatesF64",
          "queryEmissionShellCandidatePacketF64",
          "queryEmissionShellCandidatePacketsF64",
          "refineEmissionShellCandidateRootsF64",
        ],
        pathHistoryLayouts: ["path_segment.v1"],
        indexedFilters: ["pathKeys", "chunkIndices", "timeRange", "frameRange", "byteRange"],
        rangeMetadata: ["timeRange", "frameRange", "byteRange", "bounds"],
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
      chartDescriptors: [
        {
          numericChart: "absolute_f64",
          role: "raw-coordinate-chart",
          preservesLocalDetailAcrossLargeOffsets: false,
        },
        {
          numericChart: "local_frame",
          role: "translated-local-geometry-chart",
          preservesLocalDetailAcrossLargeOffsets: true,
        },
        {
          numericChart: "nondimensional_ratio",
          role: "scale-ratio-chart",
          preservesLocalDetailAcrossLargeOffsets: true,
        },
        {
          numericChart: "log_magnitude",
          role: "positive-scale-chart",
          preservesLocalDetailAcrossLargeOffsets: true,
        },
        {
          numericChart: "signed_log_magnitude",
          role: "signed-scale-chart",
          preservesLocalDetailAcrossLargeOffsets: true,
        },
        {
          numericChart: "direction_log_magnitude",
          role: "vector-direction-plus-scale-chart",
          preservesLocalDetailAcrossLargeOffsets: true,
        },
        {
          numericChart: "interval_bounds",
          role: "bounded-validation-chart",
          preservesLocalDetailAcrossLargeOffsets: true,
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
      "solveCircularSourceRootsHitsLedgerF64",
      "solveCircularSourceRootsHitsLedgerNormalizedF64",
      "solveMovingCircularSourceCausalRootsF64",
      "solveMovingCircularSameSourceCausalRootsF64",
      "solveRootsAndHitsPrecisionF64",
      "solveRootsAndHitsF64",
      "refineEmissionShellCandidateRootsF64",
    ],
  };
}

function createAbiInfoFixture() {
  return {
    abiMajor: 0,
    abiMinor: 20,
    abiPatch: 0,
    rootRequestF64Bytes: 176,
    rootRowF64Bytes: ROOT_LEDGER_ROW_F64_BYTES,
    delayedHitRowF64Bytes: DELAYED_HIT_ROW_F64_BYTES,
    motionSampleRequestF64Bytes: 112,
    motionFrameRowF64Bytes: 88,
    phaseClockF64Bytes: 24,
    phaseAtHitRowF64Bytes: 104,
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
    rootLedgerDetailRowF64Bytes: ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
    errorBudgetF64Bytes: 64,
    errorBudgetStageInputF64Bytes: 16,
    errorBudgetStageRowF64Bytes: 40,
    errorBudgetSummaryF64Bytes: 32,
    precisionSolveOptionsBytes: 16,
    precisionSolveSummaryF64Bytes: 80,
    motionIntegrationRequestF64Bytes: 120,
    circularPathSegmentF64Bytes: 120,
    circularSourceRootRequestF64Bytes: 224,
    modelContractBytes: 32,
    simulationEnvelopeF64Bytes: 88,
    capabilityEnvelopeF64Bytes: 48,
    admissionStressSummaryF64Bytes: 96,
    statusRowBytes: 24,
    admissionReportF64Bytes: 112,
    pairInteractionRequestF64Bytes: 88,
    t3StepRequestF64Bytes: 120,
    t3ParticleStateF64Bytes: 80,
    t3ParticleStepRowF64Bytes: 104,
    t3StepSummaryF64Bytes: 88,
    t3UnresolvedRootSegmentRowF64Bytes: 208,
    t3RetainedCausalRootReplayRowF64Bytes: 128,
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

function createPairInteractionRunSimulationRequestEnvelope() {
  const runRequest = {
    ...createSolverRunRequest(),
    requestId: "pair-interaction-contract-request",
    runId: "pair-interaction-contract",
    datasetId: "pair-interaction-contract-dataset",
    appId: "causal-delay-feedback",
    runKind: "pairInteraction",
    configVersion: "pair-interaction-contract.v1",
    configHash: "pair-interaction-contract",
    config: {
      appId: "causal-delay-feedback",
      pairInteractionRequest: createPairInteractionRequestFixture(),
      streamId: "pair-interaction-contract:path-history",
      rowsPerChunk: 16,
      storagePolicy: createStoragePolicyFixture(),
      metadata: {
        replayKind: "pair-interaction-path-integration",
      },
    },
    output: {
      outputs: ["summary", "frameBuffer", "pathStream", "diagnostics"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: 1048576,
      deterministic: true,
    },
  };
  return {
    schema: "solver-app-bridge/v1",
    kind: "run-simulation-request",
    requestId: runRequest.requestId,
    request: runRequest,
  };
}

function createPairInteractionRunSimulationResponseEnvelope() {
  const summary = createPairInteractionRunSummaryFixture();
  const { status: _summaryStatus, ...pairInteractionSummary } = summary;
  const pathHistorySummary = {
    ...createPathHistoryStreamResponseEnvelope().response.summary,
    runId: "pair-interaction-contract",
    datasetId: "pair-interaction-contract-dataset",
    streamId: "pair-interaction-contract:path-history",
    rowCount: 4,
    chunkCount: 1,
    pathCount: 2,
    byteLength: 384,
    timeRange: { start: 0, end: 1 },
    frameRange: { start: 0, end: 1 },
  };
  const runResponse = {
    runId: "pair-interaction-contract",
    datasetId: "pair-interaction-contract-dataset",
    manifest: {
      ...createRunManifest(),
      requestId: "pair-interaction-contract-request",
      runId: "pair-interaction-contract",
      datasetId: "pair-interaction-contract-dataset",
      appId: "causal-delay-feedback",
      runKind: "pairInteraction",
      configVersion: "pair-interaction-contract.v1",
      configHash: "pair-interaction-contract",
      output: {
        outputs: ["summary", "frameBuffer", "pathStream", "diagnostics"],
        streamTarget: "caller-buffer",
        memoryBudgetBytes: 1048576,
        deterministic: true,
      },
      buffers: [
        createBufferDescriptorFixture("pair-interaction-contract:frames", "frame_buffer.v1", 352, 4),
        createBufferDescriptorFixture("pair-interaction-contract:path-history", "path_segment.v1", 384, 4),
      ].map(({ byteOffset, ...buffer }, index) => ({
        ...buffer,
        checksum: index === 0 ? "1212121212121212" : "3434343434343434",
      })),
      streams: [
        {
          streamId: "pair-interaction-contract:path-history",
          manifestVersion: "solver-stream-manifest.v1",
          indexLayout: "stream_index.v1",
          rangeCount: 1,
          storagePolicy: createStoragePolicyFixture(),
          metadata: createPathHistoryStreamMetadata(),
        },
      ],
    },
    summary,
    buffers: [
      createBufferDescriptorFixture("pair-interaction-contract:frames", "frame_buffer.v1", 352, 4),
      createBufferDescriptorFixture("pair-interaction-contract:path-history", "path_segment.v1", 384, 4),
    ],
    streams: [
      {
        streamId: "pair-interaction-contract:path-history",
        manifestVersion: "solver-stream-manifest.v1",
        indexLayout: "stream_index.v1",
        availableRanges: [
          {
            timeRange: { start: 0, end: 1 },
            frameRange: { start: 0, end: 1 },
            byteRange: { start: 0, end: 384 },
          },
        ],
        storagePolicy: createStoragePolicyFixture(),
        metadata: createPathHistoryStreamMetadata(),
      },
    ],
    diagnostics: [{ code: "ok", severity: "ok", message: "pair interaction contract fixture" }],
    frames: [
      createMotionFrameFixture({ pathKey: 1, frameIndex: 0, time: 0, x: 100, y: 220, z: 0, vx: 55, vy: 20, vz: 0 }),
      createMotionFrameFixture({ pathKey: 2, frameIndex: 0, time: 0, x: 100, y: 860, z: 0, vx: 55, vy: -20, vz: 0 }),
      createMotionFrameFixture({ pathKey: 1, frameIndex: 1, time: 1, x: 1820, y: 620, z: 0, vx: 55, vy: 20, vz: 0 }),
      createMotionFrameFixture({ pathKey: 2, frameIndex: 1, time: 1, x: 1820, y: 460, z: 0, vx: 55, vy: -20, vz: 0 }),
    ],
    pathHistory: pathHistorySummary,
    pairInteraction: pairInteractionSummary,
    status: createStatusFixture("ok", "ok", "pair interaction completed"),
  };
  return {
    schema: "solver-app-bridge/v1",
    kind: "run-simulation-response",
    requestId: "pair-interaction-contract-request",
    response: {
      requestId: "pair-interaction-contract-request",
      runId: "pair-interaction-contract",
      datasetId: "pair-interaction-contract-dataset",
      cancellationToken: "pair-interaction-contract:cancel",
      acceptedPrecisionPath: "scaled_f64_fast",
      expectedOutputs: ["summary", "frameBuffer", "pathStream", "diagnostics"],
      response: runResponse,
      status: createStatusFixture("ok", "ok", "pair interaction run completed"),
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
      details: {
        releasedStreams: true,
      },
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
    capability: createCapabilityEnvelope(),
    errorBudget: createRunErrorBudget(),
    threadingPolicy: {
      mode: "single-thread",
      deterministic: true,
    },
    config: {
      appId: "photon",
      rootRequest: request.request,
    },
    output: createRunOutputRequest(),
  };
}

function createPairInteractionRequestFixture() {
  return {
    startTime: 0,
    endTime: 1,
    step: 0.5,
    maxFrames: 3,
    pairAccelerationScale: 0.18,
    signalSpeed: 1234,
    softening: 0,
    integrationTolerance: 1e-12,
    interactionLaw: "inverse_distance_pair_attraction_v1",
    pathConstraintBoundaryRelaxationIterationCount: 12,
    pathConstraintBoundaryRelaxationTolerance: 0.01,
    pathConstraintBoundaryRelaxationStepTolerance: 0.001,
    pathConstraintBoundaryResidualTolerance: 0.5,
    pathConstraintPositionResidualTolerance: 0.01,
    pathConstraintGuidanceAccelerationTolerance: 6,
    pathConstraintInitialVelocityResidualTolerance: 0.06,
    initialStates: [
      {
        pathKey: 1,
        initialPosition: { x: 100, y: 220, z: 0 },
        initialVelocity: { x: 55, y: 20, z: 0 },
        charge: 1,
        mass: 1,
        stateFlags: 1,
      },
      {
        pathKey: 2,
        initialPosition: { x: 100, y: 860, z: 0 },
        initialVelocity: { x: 55, y: -20, z: 0 },
        charge: -1,
        mass: 1,
        stateFlags: 2,
      },
    ],
    pathConstraints: [
      {
        pathKey: 1,
        depth: 2,
        time: 1,
        position: { x: 1820, y: 620, z: 0 },
      },
      {
        pathKey: 2,
        depth: 2,
        time: 1,
        position: { x: 1820, y: 460, z: 0 },
      },
    ],
  };
}

function createPairInteractionRunSummaryFixture() {
  return {
    runId: "pair-interaction-contract",
    claimLevel: "interactive-preview",
    precisionPath: "scaled_f64_fast",
    status: createStatusFixture("ok", "ok", "pair interaction summary ready"),
    frameCount: 4,
    pathCount: 2,
    pathRowCount: 4,
    stepCount: 2,
    interactionLaw: "inverse_distance_pair_attraction_v1",
    signalSpeed: 1234,
    executionPath: "native_c_abi",
    pathConstraintCount: 2,
    pathConstraintFrameRefinementSampleCount: 1,
    pathConstraintPositionResidualSampleCount: 2,
    pathConstraintPositionResidualStatus: "within_tolerance",
    pathConstraintPositionResidualTolerance: 0.01,
    maxPathConstraintPositionResidual: 0,
    meanPathConstraintPositionResidual: 0,
    rmsPathConstraintPositionResidual: 0,
    pathConstraintInitialVelocityResidualSampleCount: 2,
    pathConstraintInitialVelocityResidualStatus: "within_tolerance",
    pathConstraintInitialVelocityResidualTolerance: 0.06,
    maxPathConstraintInitialVelocityResidual: 0.05,
    meanPathConstraintInitialVelocityResidual: 0.025,
    rmsPathConstraintInitialVelocityResidual: 0.035,
    pathConstraintResidualSampleCount: 2,
    maxPathConstraintResidual: 0.125,
    meanPathConstraintResidual: 0.0625,
    rmsPathConstraintResidual: 0.088,
    pathConstraintGuidanceSampleCount: 2,
    pathConstraintGuidanceMode: "retained_knot_boundary",
    pathConstraintBoundaryMode: "law_aware_retained_knot_boundary",
    pathConstraintBoundaryRelaxationMode: "finite_difference_frame_relaxation_v1",
    pathConstraintBoundaryRelaxationIterationCount: 12,
    pathConstraintBoundaryRelaxationAppliedIterationCount: 4,
    pathConstraintBoundaryRelaxationTolerance: 0.01,
    pathConstraintBoundaryRelaxationStepTolerance: 0.001,
    pathConstraintBoundaryRelaxationStatus: "accepted",
    pathConstraintBoundaryRelaxationResidualEvidenceStatus: "aggregate_non_worsening",
    pathConstraintBoundaryRelaxationResidualSampleCount: 2,
    pathConstraintBoundaryRelaxationResidualMode: "causal_delay_pair_law",
    maxPathConstraintBoundaryRelaxationResidualBefore: 8,
    maxPathConstraintBoundaryRelaxationResidualAfter: 2,
    meanPathConstraintBoundaryRelaxationResidualBefore: 6,
    meanPathConstraintBoundaryRelaxationResidualAfter: 1.5,
    rmsPathConstraintBoundaryRelaxationResidualBefore: 6.5,
    rmsPathConstraintBoundaryRelaxationResidualAfter: 1.75,
    pathConstraintBoundaryRelaxationResidualRatio: 0.25,
    meanPathConstraintBoundaryRelaxationResidualRatio: 0.25,
    rmsPathConstraintBoundaryRelaxationResidualRatio: 1.75 / 6.5,
    pathConstraintBoundaryRelaxationResidualSettlingRate: Math.pow(0.25, 1 / 4),
    meanPathConstraintBoundaryRelaxationResidualSettlingRate: Math.pow(0.25, 1 / 4),
    rmsPathConstraintBoundaryRelaxationResidualSettlingRate: Math.pow(1.75 / 6.5, 1 / 4),
    pathConstraintBoundaryRelaxationCandidateVariantCount: 14,
    pathConstraintBoundaryRelaxationLineSearchTrialCount: 112,
    pathConstraintBoundaryRelaxationCandidateKindMask: 0x7ffffe,
    pathConstraintSolverStatus: "guided_constraint_path",
    pathConstraintSolverClaim: "diagnostic_constraint_replay_not_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverStatus: "physical_boundary_solver_pending",
    pathConstraintPhysicalBoundarySolverClaim:
      "retained_knot_guidance_not_physical_boundary_value_solve",
    pathConstraintPhysicalBoundarySolverBlockingReason:
      "retained_knot_guidance_acceleration_required",
    maxPathConstraintGuidanceAcceleration: 4.5,
    meanPathConstraintGuidanceAcceleration: 2.25,
    rmsPathConstraintGuidanceAcceleration: 3.1,
    pathConstraintGuidanceAccelerationStatus: "within_tolerance",
    pathConstraintGuidanceAccelerationTolerance: 6,
    pathConstraintBoundaryResidualSampleCount: 2,
    pathConstraintBoundaryResidualMode: "causal_delay_pair_law",
    pathConstraintBoundaryResidualStatus: "within_tolerance",
    pathConstraintBoundaryResidualTolerance: 0.5,
    maxPathConstraintBoundaryResidual: 0.25,
    meanPathConstraintBoundaryResidual: 0.125,
    rmsPathConstraintBoundaryResidual: 0.177,
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
    rootLedgerDetails: [createRootLedgerDetailFixture({ rootTolerance: 1e-16 })],
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
    capability: createCapabilityEnvelope(),
    errorBudget: createRunErrorBudget(),
    precisionMetadata: createRunPrecisionMetadataFixture(),
    requestedPrecisionPath: "auto",
    selectedPrecisionPath: "extended_precision",
    output: createRunOutputRequest(),
    threading: createThreadingPlanResponseEnvelope().response,
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
      schemaVersionHash: "cccccccccccccccc",
      statusTaxonomyHash: "dddddddddddddddd",
      binaryLayoutHash: "eeeeeeeeeeeeeeee",
      modelContractHash: "1111111111111111",
      simulationEnvelopeHash: "2222222222222222",
      capabilityEnvelopeHash: "3333333333333333",
      errorBudgetHash: "4444444444444444",
      outputContractHash: "5555555555555555",
      threadingHash: "6666666666666666",
      admissionHash: "7777777777777777",
      provenanceHash: "8888888888888888",
      bufferHashes: ["5555555555555555", "6666666666666666", "7777777777777777"],
      streamHashes: ["8888888888888888"],
      diagnosticHash: "9999999999999999",
      summaryHash: "aaaaaaaaaaaaaaaa",
      responseStatusHash: "bbbbbbbbbbbbbbbb",
    },
  };
}

function createRunPrecisionMetadataFixture() {
  return {
    schema: "solver-run-precision-metadata.v1",
    requestedPrecisionPath: "auto",
    selectedPrecisionPath: "extended_precision",
    numericType: "decimal128",
    numericChart: "interval_bounds",
    unitConvention: "solver-si",
    scaleNormalization: "unit-test-scale",
    globalErrorBudget: 1e-13,
    stageErrorBudgets: createRunErrorBudget(),
    claimLevel: "interactive-preview",
    valueAuthority: "authoritative",
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

function createCapabilityEnvelope() {
  return {
    maxInteractiveEntities: 2048,
    maxBatchEntities: 65536,
    minMemoryBudgetBytes: 1048576,
    minStorageBudgetBytesForStreaming: 1048576,
    minimumPositiveTolerance: 1e-18,
    maxInteractiveStepCount: 100000,
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
    storagePressure: 0.0002,
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
      byteLength: ROOT_LEDGER_ROW_F64_BYTES,
      rowCount: 1,
      numericType: "f64",
      checksum: "5555555555555555",
    },
    {
      bufferId: "run-contract:delayed-hit-events",
      layout: "delayed_hit_events.v1",
      byteOffset: 0,
      byteLength: DELAYED_HIT_ROW_F64_BYTES,
      rowCount: 1,
      numericType: "f64",
      checksum: "6666666666666666",
    },
    {
      bufferId: "run-contract:root-ledger-detail",
      layout: "root_ledger_detail.v1",
      byteOffset: 0,
      byteLength: ROOT_LEDGER_DETAIL_ROW_F64_BYTES,
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
      metadata: createRunStreamMetadataFixture(),
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
    metadata: stream.metadata,
  }));
}

function createRunStreamMetadataFixture() {
  return {
    schema: "solver-path-history-stream-metadata.v1",
    precisionPath: "extended_precision",
    numericType: "f64",
    numericChart: "interval_bounds",
    valueAuthority: "authoritative",
    appBufferAuthority: "approximate",
    claimLevel: "interactive-preview",
    units: "solver-si",
    coordinateFrame: "absolute-lab-frame",
    scaleNormalization: "unit-test-scale",
    interpolationRule: "causal-root-transient",
    provenance: { fixture: "run-contract-fixture" },
    diagnostics: [
      {
        code: "ok",
        severity: "info",
        message: "run stream precision metadata fixture",
      },
    ],
  };
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
        numericType: "f64",
        numericChart: "absolute_f64",
        valueAuthority: "authoritative",
        appBufferAuthority: "authoritative",
        claimLevel: "migration-parity",
        units: "solver-si",
        coordinateFrame: "absolute-lab-frame",
        scaleNormalization: "unit-test-scale",
        interpolationRule: "linear-segment",
        dynamicReplay: createPathHistoryDynamicReplayMetadata(),
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
      contractArtifacts: createPathHistoryStreamContractArtifactsFixture(),
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
    numericType: "f64",
    numericChart: "absolute_f64",
    valueAuthority: "authoritative",
    appBufferAuthority: "authoritative",
    claimLevel: "migration-parity",
    units: "solver-si",
    coordinateFrame: "absolute-lab-frame",
    scaleNormalization: "unit-test-scale",
    interpolationRule: "linear-segment",
    dynamicReplay: createPathHistoryDynamicReplayMetadata(),
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

function createPathHistoryStreamContractArtifactsFixture() {
  const metadata = createPathHistoryStreamMetadata();
  return {
    schema: "solver-path-history-stream-contract-artifacts.v1",
    manifest: {
      schema: "path_history_stream_manifest.v1",
      runId: "path-history-contract-run",
      modelId: "aaa.central-solver",
      streamTableId: "fixture-path-stream-table",
      chunkStoreId: "fixture-path-chunk-store",
      encodingDictionaryId: "fixture-path-encoding-dictionary",
      eventStoreId: "fixture-path-event-store",
      indexSidecarId: "fixture-path-index-sidecar",
      summaryRecordId: "fixture-path-history-summary",
      checksumPolicyId: "fixture-path-checksum-policy",
      memoryBudgetId: "fixture-path-memory-budget",
      lifecycleStatus: "finalized",
      precisionPath: metadata.precisionPath,
      numericType: metadata.numericType,
      numericChart: metadata.numericChart,
      claimLevel: metadata.claimLevel,
    },
    logicalStreamTable: {
      schema: "path_stream_table.v1",
      tableId: "fixture-path-stream-table",
      streams: [
        {
          streamId: "fixture-path-history-stream",
          pathId: "fixture-source-path",
          pathKey: 2000,
          entityId: "fixture-source-entity",
          pathRole: "source-history",
          claimLevel: metadata.claimLevel,
          precisionPath: metadata.precisionPath,
          numericChart: metadata.numericChart,
          timeRange: { start: 0, end: 3 },
          frameRange: { start: 0, end: 2 },
          chunkIds: ["fixture-path-chunk-0", "fixture-path-chunk-1"],
          replayStatus: "complete",
        },
        {
          streamId: "fixture-path-history-stream",
          pathId: "fixture-receiver-path",
          pathKey: 2001,
          entityId: "fixture-receiver-entity",
          pathRole: "receiver-history",
          claimLevel: metadata.claimLevel,
          precisionPath: metadata.precisionPath,
          numericChart: metadata.numericChart,
          timeRange: { start: 1, end: 2 },
          frameRange: { start: 1, end: 1 },
          chunkIds: ["fixture-path-chunk-0"],
          replayStatus: "complete",
        },
      ],
    },
    chunkRecords: [
      createPathHistoryContractChunkRecord("fixture-path-chunk-0", 0, 2000, 2001, 0, 2, 0, 2, 0, 1, 0, 192),
      createPathHistoryContractChunkRecord("fixture-path-chunk-1", 1, 2000, 2000, 2, 1, 2, 3, 2, 2, 192, 288),
    ],
    encodingDictionary: {
      schema: "path_encoding_dictionary.v1",
      dictionaryId: "fixture-path-encoding-dictionary",
      columnLayouts: ["path_chunk.v1", "path_segment.v1", "stream_index.v1"],
      numericEncodings: ["f64"],
      units: ["solver-si"],
      eventCodes: ["stream_opened", "chunk_committed", "checksum_fault", "run_finalized"],
      checksumAlgorithms: ["fnv1a64"],
      dictionaryChecksum: "4444444444444444",
    },
    eventStore: {
      schema: "path_event_store.v1",
      eventStoreId: "fixture-path-event-store",
      events: [
        createPathHistoryContractEvent(0, "stream_opened", "info", "fixture-path-history-stream"),
        createPathHistoryContractEvent(1, "chunk_committed", "info", "fixture-path-history-stream", "fixture-path-chunk-0"),
        createPathHistoryContractEvent(2, "chunk_committed", "info", "fixture-path-history-stream", "fixture-path-chunk-1"),
        createPathHistoryContractEvent(3, "active_window_aged_out", "info", "fixture-path-history-stream", "fixture-path-chunk-0"),
        createPathHistoryContractEvent(4, "age_out_blocked", "warning", "fixture-path-history-stream", "fixture-path-chunk-1"),
        createPathHistoryContractEvent(5, "index_built", "info", "fixture-path-history-stream", "fixture-path-chunk-0"),
        createPathHistoryContractEvent(6, "checksum_fault", "warning", "fixture-path-history-stream", "fixture-path-chunk-corrupt"),
        createPathHistoryContractEvent(7, "recovery_action", "warning", "fixture-path-history-stream", "fixture-path-chunk-corrupt"),
        createPathHistoryContractEvent(8, "run_finalized", "ok", "fixture-path-history-stream"),
      ],
    },
    indexSidecar: createPathHistoryContractIndexSidecarFixture(),
    summary: {
      schema: "path_history_summary.v1",
      streamCount: 1,
      pathCount: 2,
      chunkCount: 2,
      rowCount: 3,
      byteCount: 288,
      bytesByTier: { active: 96, warm: 192, cold: 0, deleted: 0, unknown: 0 },
      activeWindowMaxBytes: 96,
      checksumCleanCount: 2,
      checksumFaultCount: 1,
      spillThroughputRowsPerSecond: 48000,
      readbackThroughputRowsPerSecond: 96000,
      replayStatus: "complete",
    },
    memoryBudget: {
      schema: "path_history_stream_memory_budget.v1",
      activeWindowBytes: 128,
      activeWindowTimeDepth: 1,
      activeWindowFrameDepth: 1,
      spillBufferBytes: 256,
      indexMemoryBytes: 128,
      deepIndexMemoryBytes: 0,
      onBudgetPressure: "spill",
    },
    checksumPolicy: {
      policyId: "fixture-path-checksum-policy",
      algorithm: "fnv1a64",
      scopes: [
        "chunk_header",
        "chunk_payload",
        "chunk_trailer",
        "chain",
        "dictionary",
        "sidecar",
        "event_store",
        "manifest",
        "export_artifact",
      ],
    },
    fixtures: [
      {
        fixtureId: "path_stream_round_trip",
        status: "passed",
        validatedArtifacts: [
          "path_history_stream_manifest.v1",
          "path_stream_table.v1",
          "path_chunk.v1",
          "path_encoding_dictionary.v1",
          "path_event_store.v1",
          "stream_index.v1",
          "path_history_summary.v1",
          "path_history_stream_memory_budget.v1",
        ],
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        memoryBudgetBytes: 128,
        activeWindowBytes: 96,
        maxActiveBytes: 96,
        spilledBytes: 192,
        checksumFaultDetected: true,
        indexSeekMatched: true,
        fullRunScanRequired: false,
        roundTripByteStable: true,
      },
      {
        fixtureId: "stream_replay_invariants",
        status: "passed",
        validatedArtifacts: [
          "path_history_stream_manifest.v1",
          "path_stream_table.v1",
          "path_chunk.v1",
          "stream_index.v1",
          "path_history_summary.v1",
        ],
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        pathErrorBoundPreserved: true,
        rootCountPreserved: true,
        timeOrderingPreserved: true,
        checksumIdentityPreserved: true,
        projectionAuthorityPreserved: true,
        indexSeekMatched: true,
        fullRunScanRequired: false,
      },
      {
        fixtureId: "history_age_out_and_deep_index",
        status: "passed",
        validatedArtifacts: [
          "path_history_stream_manifest.v1",
          "path_chunk.v1",
          "path_event_store.v1",
          "stream_index.v1",
          "path_history_summary.v1",
          "path_history_stream_memory_budget.v1",
          "solver-path-history-storage-lifecycle-summary.v1",
          "solver-path-history-deep-index.v1",
        ],
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        memoryBudgetBytes: 128,
        activeWindowBytes: 96,
        maxActiveBytes: 96,
        spilledBytes: 192,
        safeAgeOutCount: 1,
        unsafeAgeOutCount: 1,
        deepIndexBuilt: true,
        authoritativeReplayReplaced: false,
        fullRunScanRequired: false,
      },
      {
        fixtureId: "interrupted_stream_recovery",
        status: "passed",
        validatedArtifacts: [
          "path_history_stream_manifest.v1",
          "path_chunk.v1",
          "path_encoding_dictionary.v1",
          "path_event_store.v1",
          "stream_index.v1",
          "path_history_summary.v1",
        ],
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        checksumFaultDetected: true,
        partialWriteDetected: true,
        staleSidecarDetected: true,
        manifestMismatchDetected: true,
        recoveryEventAppended: true,
        quarantinedChunkCount: 1,
        fullRunScanRequired: false,
      },
      {
        fixtureId: "high_speed_readback_budget",
        status: "passed",
        validatedArtifacts: [
          "path_history_stream_manifest.v1",
          "path_chunk.v1",
          "stream_index.v1",
          "path_history_summary.v1",
          "path_history_stream_memory_budget.v1",
        ],
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        activeWindowBytes: 96,
        readbackMemoryBudgetBytes: 128,
        readbackBytes: 96,
        selectedRangeReadbackRows: 1,
        scannedChunkCount: 1,
        indexedLookupUsed: true,
        indexSeekMatched: true,
        fullRunScanRequired: false,
        readbackThroughputRowsPerSecond: 96000,
      },
      {
        fixtureId: "fast_spill_budget",
        status: "passed",
        validatedArtifacts: [
          "path_history_stream_manifest.v1",
          "path_chunk.v1",
          "path_event_store.v1",
          "stream_index.v1",
          "path_history_summary.v1",
          "path_history_stream_memory_budget.v1",
        ],
        rowCount: 3,
        chunkCount: 2,
        pathCount: 2,
        byteLength: 288,
        memoryBudgetBytes: 128,
        activeWindowBytes: 96,
        maxActiveBytes: 96,
        spilledBytes: 192,
        checksumFaultDetected: false,
        indexSeekMatched: true,
        fullRunScanRequired: false,
        roundTripByteStable: true,
        backpressureApplied: true,
        halted: false,
        spillThroughputRowsPerSecond: 48000,
      },
    ],
  };
}

function createPathHistoryContractChunkRecord(
  chunkId,
  chunkIndex,
  pathKeyStart,
  pathKeyEnd,
  rowOffset,
  rowCount,
  timeStart,
  timeEnd,
  frameStart,
  frameEnd,
  byteStart,
  byteEnd
) {
  return {
    schema: "path_chunk.v1",
    chunkId,
    chunkIndex,
    streamId: "fixture-path-history-stream",
    pathKeyStart,
    pathKeyEnd,
    rowOffset,
    rowCount,
    timeRange: { start: timeStart, end: timeEnd },
    frameRange: { start: frameStart, end: frameEnd },
    byteRange: { start: byteStart, end: byteEnd },
    layout: "path_chunk.v1",
    numericType: "f64",
    headerChecksum: chunkIndex === 0 ? "aaaaaaaaaaaaaaaa" : "bbbbbbbbbbbbbbbb",
    payloadChecksum: chunkIndex === 0 ? "1111111111111111" : "2222222222222222",
    chunkChecksum: chunkIndex === 0 ? "cccccccccccccccc" : "dddddddddddddddd",
    committed: true,
  };
}

function createPathHistoryContractEvent(sequence, eventClass, severity, affectedStreamId, affectedChunkId) {
  const event = {
    sequence,
    eventClass,
    affectedStreamId,
    severity,
    recoverable: severity !== "error" && severity !== "halt",
  };
  if (affectedChunkId) {
    event.affectedChunkId = affectedChunkId;
  }
  return event;
}

function createPathHistoryContractIndexSidecarFixture() {
  return {
    schema: "solver-stream-index.v1",
    streamId: "fixture-path-history-stream",
    indexLayout: "stream_index.v1",
    chunkCount: 2,
    sidecar: {
      schema: "solver-stream-index-sidecar.v1",
      indexLayout: "stream_index.v1",
      numericType: "f64",
      byteOrder: "little-endian",
      rowSizeBytes: 64,
      rowCount: 3,
      byteLength: 192,
      filePath: ".tmp/fixture-path-history-stream/stream-index.bin",
      checksum: "eeeeeeeeeeeeeeee",
    },
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
  };
}

function createPathHistoryDynamicReplayMetadata() {
  return {
    schema: "solver-path-history-dynamic-replay.v1",
    replayKind: "linear-motion-sample",
    pathKey: 2000,
    startTime: 0,
    endTime: 1,
    step: 1,
    stateFlags: 1,
    motionRequest: {
      pathKey: 2000,
      segment: {
        startTime: 0,
        endTime: 3,
        positionAtStart: { x: 0, y: 0, z: 0 },
        velocity: { x: 1, y: 0, z: 0 },
        errorBound: 1e-12,
      },
      startTime: 0,
      endTime: 1,
      step: 1,
      stateFlags: 1,
    },
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

function createPathHistoryDynamicReplayValidationRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-dynamic-replay-validation-request",
    requestId: "path-history-dynamic-replay-validation-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      tolerance: 0,
      maxRows: 16,
    },
  };
}

function createPathHistoryDynamicReplayValidationResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-dynamic-replay-validation-response",
    requestId: "path-history-dynamic-replay-validation-contract-request",
    response: {
      schema: "solver-path-history-dynamic-replay-validation.v1",
      streamId: "fixture-path-history-stream",
      replayKind: "linear-motion-sample",
      tolerance: 0,
      actualRowCount: 1,
      expectedRowCount: 1,
      selectedRangeCount: 1,
      selectedByteLength: 96,
      matched: true,
      mismatchCount: 0,
      maxTimeDifference: 0,
      maxPositionDifference: 0,
      maxVelocityDifference: 0,
      maxErrorBoundDifference: 0,
      firstMismatch: null,
      diagnostics: [
        {
          code: "ok",
          severity: "ok",
          message: "dynamic replay matched fixture path history",
        },
      ],
      status: createStatusFixture("ok", "ok", "path-history dynamic replay matched"),
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

function createPathHistoryStorageLifecycleRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-storage-lifecycle-request",
    requestId: "path-history-storage-lifecycle-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      policy: createPathHistoryStorageLifecyclePolicyFixture(),
      chunks: [createPathHistoryChunkMetadataFixture()],
    },
  };
}

function createPathHistoryStorageLifecycleResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-storage-lifecycle-response",
    requestId: "path-history-storage-lifecycle-contract-request",
    response: createPathHistoryStorageLifecyclePlanFixture(),
  };
}

function createPathHistoryStorageLifecycleApplyRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-storage-lifecycle-apply-request",
    requestId: "path-history-storage-lifecycle-apply-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      policy: createPathHistoryStorageLifecyclePolicyFixture(),
      deleteStreamWhenAllChunksDeleted: false,
    },
  };
}

function createPathHistoryStorageLifecycleApplyResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-storage-lifecycle-apply-response",
    requestId: "path-history-storage-lifecycle-apply-contract-request",
    response: {
      schema: "solver-path-history-storage-lifecycle-apply.v1",
      streamId: "fixture-path-history-stream",
      plan: createPathHistoryStorageLifecyclePlanFixture(),
      appliedChunkCount: 1,
      nativeManifestUpdated: false,
      manifestPath: ".tmp/fixture-path-history-stream/stream-manifest.json",
      metadata: {
        schema: "solver-path-history-storage-lifecycle-metadata.v1",
        policy: createPathHistoryStorageLifecyclePolicyFixture(),
        summary: createPathHistoryStorageLifecycleSummaryFixture(),
        decisions: [createPathHistoryLifecycleDecisionFixture()],
        deepIndex: {
          schema: "solver-path-history-deep-index.v1",
          indexKind: "spacetime",
          indexLayout: "spacetime_index.v1",
          sourceStreamId: "fixture-path-history-stream",
          builtChunkIndices: [0],
          rowCount: 1,
          overflowEntryCount: 0,
          byteLength: 128,
          checksum: "0123456789abcdef",
          options: createSpaceTimeIndexOptionsFixture(),
        },
      },
      cleanup: {
        schema: "solver-path-history-storage-lifecycle-cleanup.v1",
        requested: false,
        deletedStream: false,
        releasedStream: false,
        deletedNativeFileStream: false,
        plannedDeleteChunkCount: 0,
        skippedReason: "not_requested",
      },
      status: createStatusFixture("ok", "ok", "path-history lifecycle apply fixture"),
    },
  };
}

function createPathHistoryStorageLifecyclePlanFixture() {
  return {
    schema: "solver-path-history-storage-lifecycle.v1",
    streamId: "fixture-path-history-stream",
    policy: createPathHistoryStorageLifecyclePolicyFixture(),
    chunkCount: 1,
    decisions: [createPathHistoryLifecycleDecisionFixture()],
    summary: createPathHistoryStorageLifecycleSummaryFixture(),
    status: createStatusFixture("ok", "ok", "path-history lifecycle plan fixture"),
  };
}

function createPathHistoryStorageLifecyclePolicyFixture() {
  return {
    activeWindow: { start: 0, end: 1 },
    deepIndexEnabled: true,
    exportRequested: true,
    failedRun: false,
    deleteRequested: false,
    activeMemoryBudgetBytes: 1024,
    storageBudgetBytes: 4096,
  };
}

function createPathHistoryChunkMetadataFixture() {
  return {
    chunkIndex: 0,
    pathKeyStart: 2000,
    pathKeyEnd: 2001,
    rowOffset: 0,
    rowCount: 2,
    timeRange: { start: 0, end: 1 },
    frameRange: { start: 0, end: 1 },
    byteRange: { start: 0, end: 192 },
    timeStart: 0,
    timeEnd: 1,
    frameStart: 0,
    frameEnd: 1,
    byteOffset: 0,
    byteLength: 192,
    checksum64: "0123456789abcdef",
    stateFlags: 0,
  };
}

function createPathHistoryLifecycleDecisionFixture() {
  return {
    chunkIndex: 0,
    tierCode: 1,
    tier: "warm",
    actionCode: 3,
    action: "build_deep_index",
    safeToAgeOut: true,
    requiresDeepIndex: true,
    reasonCode: 5,
    reason: "aged_chunk_requires_deep_index",
  };
}

function createPathHistoryStorageLifecycleSummaryFixture() {
  return {
    schema: "solver-path-history-storage-lifecycle-summary.v1",
    totalChunkCount: 1,
    totalBytes: 192,
    tierCounts: createPathHistoryStorageTierCountsFixture({ warm: 1 }),
    actionCounts: createPathHistoryStorageActionCountsFixture({ build_deep_index: 1 }),
    bytesByTier: createPathHistoryStorageTierCountsFixture({ warm: 192 }),
    safeToAgeOutCount: 1,
    unsafeToAgeOutCount: 0,
    deepIndexRequiredCount: 1,
    deepIndexQueueChunkIndices: [0],
    unsafeToAgeOutChunkIndices: [],
  };
}

function createPathHistoryStorageTierCountsFixture(overrides = {}) {
  return {
    active: 0,
    warm: 0,
    cold: 0,
    deleted: 0,
    unknown: 0,
    ...overrides,
  };
}

function createPathHistoryStorageActionCountsFixture(overrides = {}) {
  return {
    keep_active: 0,
    spill_warm: 0,
    archive_cold: 0,
    build_deep_index: 0,
    delete: 0,
    blocked_unsafe: 0,
    unknown: 0,
    ...overrides,
  };
}

function createWorkPacketHeaderEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "work-packet-header",
    requestId: "work-packet-header-contract-request",
    packet: createWorkPacketHeaderFixture(),
  };
}

function createWorkPacketHeaderResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "work-packet-header-response",
    requestId: "work-packet-header-contract-request",
    response: {
      schema: "solver-work-packet-header.v1",
      packet: createWorkPacketHeaderFixture(),
      serializedHeader: "solver-work-packet.v1:packet-a",
      headerChecksum: "0123456789abcdef",
      diagnostics: [
        {
          code: "ok",
          severity: "ok",
          message: "work packet header fixture",
        },
      ],
      precision: createPrecisionSummaryFixture(),
      status: createStatusFixture("ok", "ok", "work packet header fixture"),
    },
  };
}

function createWorkPacketResultOrderRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "work-packet-result-order-request",
    requestId: "work-packet-result-order-contract-request",
    request: {
      results: [
        createEmissionShellPacketResult("packet-b", 1, "source:1:receiver:2", 0),
        createEmissionShellPacketResult("packet-a", 0, "source:0:receiver:1", 1),
      ],
    },
  };
}

function createWorkPacketResultOrderResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "work-packet-result-order-response",
    requestId: "work-packet-result-order-contract-request",
    response: {
      schema: "solver-work-packet-result-order.v1",
      results: [
        createEmissionShellPacketResult("packet-a", 0, "source:0:receiver:1", 1),
        createEmissionShellPacketResult("packet-b", 1, "source:1:receiver:2", 0),
      ],
      status: createStatusFixture("ok", "ok", "work packet result order fixture"),
    },
  };
}

function createEmissionShellCandidatePacketMergeRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-candidate-packet-merge-f64-request",
    requestId: "emission-shell-candidate-packet-merge-contract-request",
    request: {
      responses: [createEmissionShellCandidateResponseEnvelope().response],
    },
  };
}

function createPathHistoryWorkPacketPlanRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-work-packet-plan-request",
    requestId: "path-history-work-packet-plan-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      runId: "run-contract",
      modelId: "aaa.central-solver",
      precisionPath: "scaled_f64_strict",
      packetIdPrefix: "packet",
      timeRange: { start: 0, end: 1 },
      expectedOutputs: ["emission_shell_candidate.v1", "emission_shell_narrow_phase.v1"],
      sourcePathKeys: [2000],
      receiverPathKeys: [2001],
      sourceChunkIndices: [0],
      receiverChunkIndices: [1],
      includeSameChunk: false,
      maxPacketCount: 4,
    },
  };
}

function createPathHistoryWorkPacketPlanResponseEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "path-history-work-packet-plan-response",
    requestId: "path-history-work-packet-plan-contract-request",
    response: {
      schema: "solver-path-history-work-packet-plan.v1",
      streamId: "fixture-path-history-stream",
      runId: "run-contract",
      modelId: "aaa.central-solver",
      precisionPath: "scaled_f64_strict",
      sourceChunkCount: 1,
      receiverChunkCount: 1,
      pathIndexRowCount: 2,
      pathIndexedChunkCount: 2,
      sourcePathPrunedChunkCount: 0,
      receiverPathPrunedChunkCount: 0,
      chunkPairCount: 1,
      packetCount: 1,
      truncated: false,
      sourceSelections: [createPathHistoryWorkPacketChunkSelectionFixture(0, "source-chunk-0", 0, 1, 96)],
      receiverSelections: [createPathHistoryWorkPacketChunkSelectionFixture(1, "receiver-chunk-1", 0, 1, 96)],
      planChecksum: "0123456789abcdef",
      packets: [createWorkPacketHeaderFixture()],
      status: createStatusFixture("ok", "ok", "path-history work packet plan fixture"),
    },
  };
}

function createEmissionShellCandidateRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-candidate-f64-request",
    requestId: "emission-shell-candidate-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      signalSpeed: 1,
      tolerance: 1e-12,
      maxCandidates: 4,
      sourcePathKeys: [2000],
      receiverPathKeys: [2001],
      sourceChunkIndices: [0],
      receiverChunkIndices: [1],
      allowSamePath: false,
      workerCount: 2,
      timeRange: { start: 0, end: 2 },
      indexOptions: createEmissionShellIndexedBroadPhaseOptionsFixture(),
    },
  };
}

function createEmissionShellCandidatePacketRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-candidate-packet-f64-request",
    requestId: "emission-shell-candidate-packet-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      packet: createWorkPacketHeaderFixture(),
      signalSpeed: 1,
      tolerance: 1e-12,
      maxCandidates: 4,
      sourcePathKeys: [2000],
      receiverPathKeys: [2001],
      allowSamePath: false,
      workerCount: 2,
      timeRange: { start: 0, end: 2 },
      indexOptions: createEmissionShellIndexedBroadPhaseOptionsFixture(),
    },
  };
}

function createEmissionShellCandidatePacketsRequestEnvelope() {
  return {
    schema: "solver-app-bridge/v1",
    kind: "emission-shell-candidate-packets-f64-request",
    requestId: "emission-shell-candidate-packets-contract-request",
    request: {
      streamId: "fixture-path-history-stream",
      packets: [createWorkPacketHeaderFixture()],
      signalSpeed: 1,
      tolerance: 1e-12,
      maxCandidatesPerPacket: 4,
      sourcePathKeys: [2000],
      receiverPathKeys: [2001],
      allowSamePath: false,
      workerCount: 2,
      timeRange: { start: 0, end: 2 },
      indexOptions: createEmissionShellIndexedBroadPhaseOptionsFixture(),
    },
  };
}

function createWorkPacketHeaderFixture() {
  return {
    schema: "solver-work-packet.v1",
    packetId: "packet-a",
    runId: "run-contract",
    modelId: "aaa.central-solver",
    precisionPath: "scaled_f64_strict",
    sourceBlock: { enabled: true, start: 0, end: 1 },
    receiverBlock: { enabled: true, start: 1, end: 2 },
    pathBlock: { enabled: true, start: 0, end: 2 },
    timeRange: { start: 0, end: 2 },
    expectedOutputs: ["emission_shell_candidate.v1", "emission_shell_narrow_phase.v1"],
    inputBuffers: [
      {
        bufferId: "fixture-path-history-stream:path-chunk-0",
        layout: "path_segment.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: 192,
        rowOffset: 0,
        rowCount: 2,
        checksum: "0123456789abcdef",
      },
    ],
    mergeOrder: 0,
    mergeKey: "source:0:receiver:1",
    headerChecksum: "0123456789abcdef",
  };
}

function createRootRefinementWorkPacketHeaderFixture() {
  return {
    schema: "solver-work-packet.v1",
    packetId: "packet-refine-a",
    runId: "run-contract",
    modelId: "aaa.central-solver",
    precisionPath: "event_root_focused",
    sourceBlock: { enabled: true, start: 0, end: 1 },
    receiverBlock: { enabled: true, start: 1, end: 2 },
    pathBlock: { enabled: true, start: 0, end: 2 },
    timeRange: { start: 0, end: 2 },
    expectedOutputs: ["root_ledger.v1", "delayed_hit_events.v1"],
    inputBuffers: [
      {
        bufferId: "fixture-path-history-stream:path-chunk-0",
        layout: "path_segment.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: 192,
        rowOffset: 0,
        rowCount: 2,
        checksum: "0123456789abcdef",
      },
    ],
    mergeOrder: 2,
    mergeKey: "source:0:receiver:1:refine",
    headerChecksum: "0123456789abcdef",
  };
}

function createPathHistoryWorkPacketChunkSelectionFixture(chunkIndex, bufferId, rowOffset, rowCount, byteLength) {
  return {
    chunkIndex,
    bufferId,
    rowOffset,
    rowCount,
    byteLength,
    checksum: "0123456789abcdef",
    timeRange: { start: 0, end: 1 },
    frameRange: { start: 0, end: 0 },
    byteRange: { start: 0, end: byteLength },
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

function createEmissionShellIndexedBroadPhaseOptionsFixture() {
  return {
    strategy: "emission_shell_broad_phase_v0",
    timeSlabCount: 32,
    spatialCellSize: 0.5,
    sourceRowOffset: 0,
    receiverRowOffset: 0,
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
        executionPath: "native_c_abi_indexed_v0",
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
      indexSummary: {
        sourceRowOffset: 0,
        receiverRowOffset: 0,
        receiverCellRows: 2,
        shellAnnulusRows: 1,
        cellLookups: 4,
        indexedPairTests: 1,
        duplicatePairTests: 0,
        spatialCellSize: 0.5,
        timeRangeStart: 0,
        timeRangeEnd: 2,
        timeSlabCount: 32,
        coverageStatus: "complete",
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
      packet: createRootRefinementWorkPacketHeaderFixture(),
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
      packetId: "packet-refine-a",
      packetMergeOrder: 2,
      packetMergeKey: "source:0:receiver:1:refine",
      packetResult: createRootRefinementPacketResult(
        "packet-refine-a",
        2,
        "source:0:receiver:1:refine",
        1
      ),
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
          bufferId: "packet-refine-a:emission-shell-refined-root-ledger",
          layout: "root_ledger.v1",
          byteOffset: 0,
          byteLength: ROOT_LEDGER_ROW_F64_BYTES,
          rowCount: 1,
          numericType: "f64",
          checksum: "cccccccccccccccc",
        },
        {
          bufferId: "packet-refine-a:emission-shell-refined-delayed-hits",
          layout: "delayed_hit_events.v1",
          byteOffset: 0,
          byteLength: DELAYED_HIT_ROW_F64_BYTES,
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

function createRootRefinementPacketResult(packetId, mergeOrder, mergeKey, rowCount) {
  return {
    packetId,
    mergeOrder,
    mergeKey,
    outputs: [
      {
        bufferId: `${packetId}:emission-shell-refined-root-ledger`,
        layout: "root_ledger.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: rowCount * ROOT_LEDGER_ROW_F64_BYTES,
        rowOffset: 0,
        rowCount,
        checksum: "cccccccccccccccc",
      },
      {
        bufferId: `${packetId}:emission-shell-refined-delayed-hits`,
        layout: "delayed_hit_events.v1",
        numericType: "f64",
        byteOffset: 0,
        byteLength: rowCount * DELAYED_HIT_ROW_F64_BYTES,
        rowOffset: 0,
        rowCount,
        checksum: "dddddddddddddddd",
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

function assertRootLedgerDetailForensics(row, expectedRootTolerance, label) {
  const residualScale = Math.max(
    Math.abs(row.delay),
    Math.abs(row.hitTime - row.emissionTime),
    Math.abs(row.intervalEnd - row.intervalStart),
    1
  );
  assertClose(row.residualScale, residualScale, `${label} residual scale`);
  assert(row.absoluteResidual === Math.abs(row.residual), `${label} absolute residual mismatch`);
  assertClose(row.normalizedResidual, row.absoluteResidual / row.residualScale, `${label} normalized residual`);
  assert(row.rootTolerance === expectedRootTolerance, `${label} root tolerance mismatch`);
  assert(
    row.firstFailureCode === ((row.stateFlags & 1) !== 0 ? row.statusCode : 0),
    `${label} first failure code mismatch`
  );
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
