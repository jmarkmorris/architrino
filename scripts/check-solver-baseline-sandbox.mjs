#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import * as THREE from "../vendor/three/three.module.js";
import {
  computePotentialContribution,
  solveFlightTime,
  solveFlightTimeRowWithSolverBridge,
} from "../src/apps/ideal-swarm/IdealSwarmRuntime.js";
import {
  runPhotonCausalRootsWithSolverBridge,
  solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge,
} from "../src/apps/photon/PhotonFormulaRuntime.js";
import {
  solveCircularSelfHitSpan,
  solveCircularSelfHitSpanRowWithSolverBridge,
} from "../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js";
import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";
import {
  createAnimatorMotionSimulationRunRequest,
  createPathHistoryDynamicReplayValidationRequest,
  createPathHistoryRunRequest,
  createPhotonPhaseDiagnosticsRunRequest,
} from "../src/solver/app/SolverAppAdapters.mjs";
import { runAnimatorSimulationWorkerRequestAsync } from "../src/apps/animator/AnimatorSimulationWorkerCoreRuntime.js";
import { createAnimatorSimulationWorkerRunRequest } from "../src/apps/animator/AnimatorSimulationWorkerProtocolRuntime.js";
import { hydrateAnimatorSimulationWorkerCompleteMessage } from "../src/apps/animator/AnimatorSimulationWorkerRuntime.js";
import { classifySolverBaselineResponse } from "../src/solver/app/SolverBaselineComparison.mjs";

const rootDir = process.cwd();
const wasmDir = path.join(rootDir, ".tmp", "solver-build", "wasm");
const outputDir = path.join(rootDir, ".tmp", "solver-baseline-sandbox");
const wasmLoaderPath = path.join(wasmDir, "architrino_solver_wasm_smoke.mjs");
const { default: createWasmModule } = await import(pathToFileURL(wasmLoaderPath).href);
const locateWasmFile = (fileName) => path.join(wasmDir, fileName);
const fixtureRequest = readJson("src/solver/fixtures/causal-roots-f64-smoke.request.json");
const fixtureResponse = readJson("src/solver/fixtures/roots-and-hits-f64-smoke.response.json");

fs.mkdirSync(outputDir, { recursive: true });

const client = createSolverAppBridgeClient({
  createWasmModule,
  locateFile: locateWasmFile,
});

await client.init({
  appId: "animator",
  apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
  requestedCapabilities: ["causalRoots", "delayedHits", "motionSimulation", "pathHistory", "validationReplay"],
  storagePolicy: {
    target: "caller-buffer",
    durable: false,
    maxBytes: 64 * 1024 * 1024,
  },
  threadingPolicy: {
    mode: "single-thread",
    deterministic: true,
  },
});

const cases = [
  createCase("animator-causal-root-smoke", "animator"),
  createCase("photon-causal-root-smoke", "photon"),
  createCase("ideal-swarm-causal-root-smoke", "ideal-swarm"),
];

const artifacts = [];
for (const testCase of cases) {
  const runHandle = await client.runSimulation(createRunSimulationRequest(testCase));
  const normalizedResponse = stripRuntimeBuffers(runHandle.response);
  const comparison = classifySolverBaselineResponse({
    baseline: projectRootHitResponseForBaseline(testCase.baseline),
    candidate: projectRootHitResponseForBaseline(normalizedResponse),
    tolerance: testCase.tolerance,
    refinementTolerance: testCase.refinementTolerance,
  });
  assert(
    comparison.classification === "baseline_within_tolerance",
    `${testCase.caseId} baseline classification was ${comparison.classification}`
  );

  const artifact = {
    schema: "solver-baseline-sandbox/v1",
    caseId: testCase.caseId,
    appId: testCase.appId,
    seedPolicy: "fixed-no-randomness",
    resourceCaps: testCase.resourceCaps,
    tolerancePolicy: createTolerancePolicy(testCase),
    provenance: createSandboxProvenance(testCase),
    workingDirectory: outputDir,
    outputPolicy: "artifact-only",
    writesToAppSource: false,
    comparison,
    runManifest: normalizedResponse.manifest,
    response: normalizedResponse,
  };
  const artifactPath = path.join(outputDir, `${testCase.caseId}.json`);
  const artifactSha256 = writeJsonArtifact(artifactPath, artifact);
  artifacts.push({
  caseId: testCase.caseId,
  appId: testCase.appId,
  path: artifactPath,
  artifactSha256,
  tolerancePolicy: createTolerancePolicy(testCase),
  classification: comparison.classification,
  manifestHash: normalizedResponse.manifest.manifestHash,
});
}

const photonFacadeCase = createPhotonCausalRootsFacadeCase();
const photonFacadeRunHandle = await runPhotonCausalRootsWithSolverBridge(
  photonFacadeCase.request,
  {
    solverClient: client,
    runId: `${photonFacadeCase.caseId}-run`,
  }
);
const photonFacadeNormalizedResponse = stripRuntimeBuffers(photonFacadeRunHandle.response);
const photonFacadeComparison = classifySolverBaselineResponse({
  baseline: projectRootHitResponseForBaseline(photonFacadeCase.baseline),
  candidate: projectRootHitResponseForBaseline(photonFacadeNormalizedResponse),
  tolerance: photonFacadeCase.tolerance,
  refinementTolerance: photonFacadeCase.refinementTolerance,
});
assert(
  photonFacadeComparison.classification === "baseline_within_tolerance",
  `${photonFacadeCase.caseId} baseline classification was ${photonFacadeComparison.classification}`
);
const photonFacadeArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: photonFacadeCase.caseId,
  appId: photonFacadeCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: photonFacadeCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(photonFacadeCase),
  provenance: createSandboxProvenance(photonFacadeCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: photonFacadeComparison,
  runManifest: photonFacadeNormalizedResponse.manifest,
  response: photonFacadeNormalizedResponse,
};
const photonFacadeArtifactPath = path.join(outputDir, `${photonFacadeCase.caseId}.json`);
const photonFacadeArtifactSha256 = writeJsonArtifact(photonFacadeArtifactPath, photonFacadeArtifact);
artifacts.push({
  caseId: photonFacadeCase.caseId,
  appId: photonFacadeCase.appId,
  path: photonFacadeArtifactPath,
  artifactSha256: photonFacadeArtifactSha256,
  tolerancePolicy: createTolerancePolicy(photonFacadeCase),
  classification: photonFacadeComparison.classification,
  manifestHash: photonFacadeNormalizedResponse.manifest.manifestHash,
});

const photonWasmClientCase = createPhotonCausalRootsWasmClientCase();
const photonWasmClientRunHandle = await runPhotonCausalRootsWithSolverBridge(
  photonWasmClientCase.request,
  {
    createWasmModule,
    locateFile: locateWasmFile,
    runId: `${photonWasmClientCase.caseId}-run`,
  }
);
const photonWasmClientNormalizedResponse = stripRuntimeBuffers(photonWasmClientRunHandle.response);
const photonWasmClientComparison = classifySolverBaselineResponse({
  baseline: projectRootHitResponseForBaseline(photonWasmClientCase.baseline),
  candidate: projectRootHitResponseForBaseline(photonWasmClientNormalizedResponse),
  tolerance: photonWasmClientCase.tolerance,
  refinementTolerance: photonWasmClientCase.refinementTolerance,
});
assert(
  photonWasmClientComparison.classification === "baseline_within_tolerance",
  `${photonWasmClientCase.caseId} baseline classification was ${photonWasmClientComparison.classification}`
);
recordSandboxArtifact({
  testCase: photonWasmClientCase,
  comparison: photonWasmClientComparison,
  runManifest: photonWasmClientNormalizedResponse.manifest,
  response: photonWasmClientNormalizedResponse,
  manifestHash: photonWasmClientNormalizedResponse.manifest.manifestHash,
});

const photonCircularFacadeCase = createPhotonCircularSourceFacadeCase();
const photonCircularFacadeResponse = await solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
  null,
  null,
  photonCircularFacadeCase.request.hitTime,
  {
    request: photonCircularFacadeCase.request,
    solverClient: client,
  }
);
const photonCircularFacadeNormalizedResponse = stripRuntimeBuffers(photonCircularFacadeResponse);
const photonCircularFacadeComparison = classifySolverBaselineResponse({
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(photonCircularFacadeCase.baseline),
  candidate: projectCircularSourceRootsHitsLedgerForBaseline(photonCircularFacadeNormalizedResponse),
  tolerance: photonCircularFacadeCase.tolerance,
  refinementTolerance: photonCircularFacadeCase.refinementTolerance,
});
assert(
  photonCircularFacadeComparison.classification === "baseline_within_tolerance",
  `${photonCircularFacadeCase.caseId} baseline classification was ${photonCircularFacadeComparison.classification}`
);
const photonCircularFacadeArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: photonCircularFacadeCase.caseId,
  appId: photonCircularFacadeCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: photonCircularFacadeCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(photonCircularFacadeCase),
  provenance: createSandboxProvenance(photonCircularFacadeCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: photonCircularFacadeComparison,
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(photonCircularFacadeCase.baseline),
  response: projectCircularSourceRootsHitsLedgerForBaseline(photonCircularFacadeNormalizedResponse),
  fullResponse: photonCircularFacadeNormalizedResponse,
};
const photonCircularFacadeArtifactPath = path.join(outputDir, `${photonCircularFacadeCase.caseId}.json`);
const photonCircularFacadeArtifactSha256 = writeJsonArtifact(
  photonCircularFacadeArtifactPath,
  photonCircularFacadeArtifact
);
artifacts.push({
  caseId: photonCircularFacadeCase.caseId,
  appId: photonCircularFacadeCase.appId,
  path: photonCircularFacadeArtifactPath,
  artifactSha256: photonCircularFacadeArtifactSha256,
  tolerancePolicy: createTolerancePolicy(photonCircularFacadeCase),
  classification: photonCircularFacadeComparison.classification,
  manifestHash: "circular-source-direct-bridge",
});

const photonCircularWasmClientCase = createPhotonCircularSourceWasmClientCase();
const photonCircularWasmClientResponse =
  await solvePhotonCircularSourceRootsHitsLedgerWithSolverBridge(
    null,
    null,
    photonCircularWasmClientCase.request.hitTime,
    {
      request: photonCircularWasmClientCase.request,
      createWasmModule,
      locateFile: locateWasmFile,
    }
  );
const photonCircularWasmClientNormalizedResponse = stripRuntimeBuffers(
  photonCircularWasmClientResponse
);
const photonCircularWasmClientComparison = classifySolverBaselineResponse({
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(
    photonCircularWasmClientCase.baseline
  ),
  candidate: projectCircularSourceRootsHitsLedgerForBaseline(
    photonCircularWasmClientNormalizedResponse
  ),
  tolerance: photonCircularWasmClientCase.tolerance,
  refinementTolerance: photonCircularWasmClientCase.refinementTolerance,
});
assert(
  photonCircularWasmClientComparison.classification === "baseline_within_tolerance",
  `${photonCircularWasmClientCase.caseId} baseline classification was ${photonCircularWasmClientComparison.classification}`
);
recordSandboxArtifact({
  testCase: photonCircularWasmClientCase,
  comparison: photonCircularWasmClientComparison,
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(
    photonCircularWasmClientCase.baseline
  ),
  response: projectCircularSourceRootsHitsLedgerForBaseline(
    photonCircularWasmClientNormalizedResponse
  ),
  fullResponse: photonCircularWasmClientNormalizedResponse,
  manifestHash: "circular-source-wasm-client-bridge",
});

const photonNormalizedCircularFacadeCase = createPhotonNormalizedCircularSourceFacadeCase();
const photonNormalizedCircularFacadeResponse =
  await client.solveCircularSourceRootsHitsLedgerNormalizedF64(photonNormalizedCircularFacadeCase.request);
const photonNormalizedCircularFacadeNormalizedResponse = stripRuntimeBuffers(
  photonNormalizedCircularFacadeResponse
);
const photonNormalizedCircularFacadeComparison = classifySolverBaselineResponse({
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(photonNormalizedCircularFacadeCase.baseline),
  candidate: projectCircularSourceRootsHitsLedgerForBaseline(
    photonNormalizedCircularFacadeNormalizedResponse
  ),
  tolerance: photonNormalizedCircularFacadeCase.tolerance,
  refinementTolerance: photonNormalizedCircularFacadeCase.refinementTolerance,
});
assert(
  photonNormalizedCircularFacadeComparison.classification === "baseline_within_tolerance",
  `${photonNormalizedCircularFacadeCase.caseId} baseline classification was ${photonNormalizedCircularFacadeComparison.classification}`
);
const photonNormalizedCircularFacadeArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: photonNormalizedCircularFacadeCase.caseId,
  appId: photonNormalizedCircularFacadeCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: photonNormalizedCircularFacadeCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(photonNormalizedCircularFacadeCase),
  provenance: createSandboxProvenance(photonNormalizedCircularFacadeCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: photonNormalizedCircularFacadeComparison,
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(photonNormalizedCircularFacadeCase.baseline),
  response: projectCircularSourceRootsHitsLedgerForBaseline(
    photonNormalizedCircularFacadeNormalizedResponse
  ),
  fullResponse: photonNormalizedCircularFacadeNormalizedResponse,
};
const photonNormalizedCircularFacadeArtifactPath = path.join(
  outputDir,
  `${photonNormalizedCircularFacadeCase.caseId}.json`
);
const photonNormalizedCircularFacadeArtifactSha256 = writeJsonArtifact(
  photonNormalizedCircularFacadeArtifactPath,
  photonNormalizedCircularFacadeArtifact
);
artifacts.push({
  caseId: photonNormalizedCircularFacadeCase.caseId,
  appId: photonNormalizedCircularFacadeCase.appId,
  path: photonNormalizedCircularFacadeArtifactPath,
  artifactSha256: photonNormalizedCircularFacadeArtifactSha256,
  tolerancePolicy: createTolerancePolicy(photonNormalizedCircularFacadeCase),
  classification: photonNormalizedCircularFacadeComparison.classification,
  manifestHash: "circular-source-normalized-direct-bridge",
});

const photonNormalizedCircularRunCase = createPhotonNormalizedCircularSourceRunCase();
const photonNormalizedCircularRunHandle = await client.runSimulation(
  createNormalizedCircularSourceRunSimulationRequest(photonNormalizedCircularRunCase)
);
const photonNormalizedCircularRunNormalizedResponse = stripRuntimeBuffers(
  photonNormalizedCircularRunHandle.response
);
const photonNormalizedCircularRunComparison = classifySolverBaselineResponse({
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(photonNormalizedCircularRunCase.baseline),
  candidate: projectCircularSourceRootsHitsLedgerForBaseline(
    photonNormalizedCircularRunNormalizedResponse
  ),
  tolerance: photonNormalizedCircularRunCase.tolerance,
  refinementTolerance: photonNormalizedCircularRunCase.refinementTolerance,
});
assert(
  photonNormalizedCircularRunComparison.classification === "baseline_within_tolerance",
  `${photonNormalizedCircularRunCase.caseId} baseline classification was ${photonNormalizedCircularRunComparison.classification}`
);
const photonNormalizedCircularRunArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: photonNormalizedCircularRunCase.caseId,
  appId: photonNormalizedCircularRunCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: photonNormalizedCircularRunCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(photonNormalizedCircularRunCase),
  provenance: createSandboxProvenance(photonNormalizedCircularRunCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: photonNormalizedCircularRunComparison,
  baseline: projectCircularSourceRootsHitsLedgerForBaseline(photonNormalizedCircularRunCase.baseline),
  runManifest: photonNormalizedCircularRunNormalizedResponse.manifest,
  response: projectCircularSourceRootsHitsLedgerForBaseline(
    photonNormalizedCircularRunNormalizedResponse
  ),
  fullResponse: photonNormalizedCircularRunNormalizedResponse,
};
const photonNormalizedCircularRunArtifactPath = path.join(
  outputDir,
  `${photonNormalizedCircularRunCase.caseId}.json`
);
const photonNormalizedCircularRunArtifactSha256 = writeJsonArtifact(
  photonNormalizedCircularRunArtifactPath,
  photonNormalizedCircularRunArtifact
);
artifacts.push({
  caseId: photonNormalizedCircularRunCase.caseId,
  appId: photonNormalizedCircularRunCase.appId,
  path: photonNormalizedCircularRunArtifactPath,
  artifactSha256: photonNormalizedCircularRunArtifactSha256,
  tolerancePolicy: createTolerancePolicy(photonNormalizedCircularRunCase),
  classification: photonNormalizedCircularRunComparison.classification,
  manifestHash: photonNormalizedCircularRunNormalizedResponse.manifest.manifestHash,
});

const idealSwarmGeometryCase = createIdealSwarmGeometryCase();
const idealSwarmGeometryCandidate = await client.computeSharedGeometryF64(
  idealSwarmGeometryCase.geometryRequest
);
const idealSwarmFacadeSelfHit = await solveCircularSelfHitSpanRowWithSolverBridge(1.2, {
  solverClient: client,
  runId: `${idealSwarmGeometryCase.caseId}-facade-run`,
});
const idealSwarmBaselineSelfHitSpan =
  idealSwarmGeometryCase.baseline.geometry.circularSelfHitSpans[0].span;
assert(
  Math.abs(idealSwarmFacadeSelfHit.span - idealSwarmBaselineSelfHitSpan) <=
    idealSwarmGeometryCase.tolerance,
  `${idealSwarmGeometryCase.caseId} facade self-hit span drifted from baseline`
);
const idealSwarmGeometryComparable = {
  geometry: projectIdealSwarmGeometryForBaseline(idealSwarmGeometryCandidate),
  status: idealSwarmGeometryCandidate.status,
};
const idealSwarmGeometryComparison = classifySolverBaselineResponse({
  baseline: idealSwarmGeometryCase.baseline,
  candidate: idealSwarmGeometryComparable,
  tolerance: idealSwarmGeometryCase.tolerance,
  refinementTolerance: idealSwarmGeometryCase.refinementTolerance,
});
assert(
  idealSwarmGeometryComparison.classification === "baseline_within_tolerance",
  `${idealSwarmGeometryCase.caseId} baseline classification was ${idealSwarmGeometryComparison.classification}`
);
const idealSwarmGeometryArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: idealSwarmGeometryCase.caseId,
  appId: idealSwarmGeometryCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: idealSwarmGeometryCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(idealSwarmGeometryCase),
  provenance: createSandboxProvenance(idealSwarmGeometryCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: idealSwarmGeometryComparison,
  baseline: idealSwarmGeometryCase.baseline,
  response: idealSwarmGeometryComparable,
  fullResponse: {
    geometry: idealSwarmGeometryCandidate,
    appFacadeSelfHit: idealSwarmFacadeSelfHit,
    status: idealSwarmGeometryCandidate.status,
  },
};
const idealSwarmGeometryArtifactPath = path.join(outputDir, `${idealSwarmGeometryCase.caseId}.json`);
const idealSwarmGeometryArtifactSha256 = writeJsonArtifact(
  idealSwarmGeometryArtifactPath,
  idealSwarmGeometryArtifact
);
artifacts.push({
  caseId: idealSwarmGeometryCase.caseId,
  appId: idealSwarmGeometryCase.appId,
  path: idealSwarmGeometryArtifactPath,
  artifactSha256: idealSwarmGeometryArtifactSha256,
  tolerancePolicy: createTolerancePolicy(idealSwarmGeometryCase),
  classification: idealSwarmGeometryComparison.classification,
  manifestHash: "geometry-direct-bridge",
});

const idealSwarmSelfHitWasmClientCase = createIdealSwarmSelfHitWasmClientCase(
  idealSwarmGeometryCase
);
const idealSwarmSelfHitWasmClientRow = await solveCircularSelfHitSpanRowWithSolverBridge(1.2, {
  createWasmModule,
  locateFile: locateWasmFile,
  runId: `${idealSwarmSelfHitWasmClientCase.caseId}-run`,
});
const idealSwarmSelfHitWasmClientCandidate = {
  geometry: {
    circularSelfHitSpans: [
      projectCircularSelfHitSpanRowForBaseline(idealSwarmSelfHitWasmClientRow),
    ],
  },
  status: {
    code: "ok",
    severity: "ok",
    message: "shared geometry computed",
    recoverable: true,
  },
};
const idealSwarmSelfHitWasmClientComparison = classifySolverBaselineResponse({
  baseline: idealSwarmSelfHitWasmClientCase.baseline,
  candidate: idealSwarmSelfHitWasmClientCandidate,
  tolerance: idealSwarmSelfHitWasmClientCase.tolerance,
  refinementTolerance: idealSwarmSelfHitWasmClientCase.refinementTolerance,
});
assert(
  idealSwarmSelfHitWasmClientComparison.classification === "baseline_within_tolerance",
  `${idealSwarmSelfHitWasmClientCase.caseId} baseline classification was ${idealSwarmSelfHitWasmClientComparison.classification}`
);
recordSandboxArtifact({
  testCase: idealSwarmSelfHitWasmClientCase,
  comparison: idealSwarmSelfHitWasmClientComparison,
  baseline: idealSwarmSelfHitWasmClientCase.baseline,
  response: idealSwarmSelfHitWasmClientCandidate,
  fullResponse: {
    appFacadeSelfHit: idealSwarmSelfHitWasmClientRow,
  },
  manifestHash: "ideal-swarm-self-hit-wasm-client",
});

const idealSwarmFlightTimeCase = createIdealSwarmFlightTimeCase();
const idealSwarmFlightTimeRow = await solveFlightTimeRowWithSolverBridge(
  idealSwarmFlightTimeCase.samplePoint,
  idealSwarmFlightTimeCase.architrino,
  idealSwarmFlightTimeCase.observationTime,
  {
    ...idealSwarmFlightTimeCase.options,
    solverClient: client,
    runId: `${idealSwarmFlightTimeCase.caseId}-facade-run`,
  }
);
const idealSwarmFlightTimeCandidate = {
  geometry: {
    delayedPotentials: [
      projectDelayedPotentialRowForBaseline(idealSwarmFlightTimeRow),
    ],
  },
  status: {
    code: "ok",
    severity: "ok",
    message: "shared geometry computed",
    recoverable: true,
  },
};
const idealSwarmFlightTimeComparison = classifySolverBaselineResponse({
  baseline: idealSwarmFlightTimeCase.baseline,
  candidate: idealSwarmFlightTimeCandidate,
  tolerance: idealSwarmFlightTimeCase.tolerance,
  refinementTolerance: idealSwarmFlightTimeCase.refinementTolerance,
});
assert(
  idealSwarmFlightTimeComparison.classification === "baseline_within_tolerance",
  `${idealSwarmFlightTimeCase.caseId} baseline classification was ${idealSwarmFlightTimeComparison.classification}`
);
const idealSwarmFlightTimeArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: idealSwarmFlightTimeCase.caseId,
  appId: idealSwarmFlightTimeCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: idealSwarmFlightTimeCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(idealSwarmFlightTimeCase),
  provenance: createSandboxProvenance(idealSwarmFlightTimeCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: idealSwarmFlightTimeComparison,
  baseline: idealSwarmFlightTimeCase.baseline,
  response: idealSwarmFlightTimeCandidate,
  fullResponse: {
    appFacadeFlightTime: idealSwarmFlightTimeRow,
  },
};
const idealSwarmFlightTimeArtifactPath = path.join(outputDir, `${idealSwarmFlightTimeCase.caseId}.json`);
const idealSwarmFlightTimeArtifactSha256 = writeJsonArtifact(
  idealSwarmFlightTimeArtifactPath,
  idealSwarmFlightTimeArtifact
);
artifacts.push({
  caseId: idealSwarmFlightTimeCase.caseId,
  appId: idealSwarmFlightTimeCase.appId,
  path: idealSwarmFlightTimeArtifactPath,
  artifactSha256: idealSwarmFlightTimeArtifactSha256,
  tolerancePolicy: createTolerancePolicy(idealSwarmFlightTimeCase),
  classification: idealSwarmFlightTimeComparison.classification,
  manifestHash: "ideal-swarm-flight-time-facade",
});

const idealSwarmFlightTimeWasmClientCase = createIdealSwarmFlightTimeWasmClientCase(
  idealSwarmFlightTimeCase
);
const idealSwarmFlightTimeWasmClientRow = await solveFlightTimeRowWithSolverBridge(
  idealSwarmFlightTimeWasmClientCase.samplePoint,
  idealSwarmFlightTimeWasmClientCase.architrino,
  idealSwarmFlightTimeWasmClientCase.observationTime,
  {
    ...idealSwarmFlightTimeWasmClientCase.options,
    createWasmModule,
    locateFile: locateWasmFile,
    runId: `${idealSwarmFlightTimeWasmClientCase.caseId}-run`,
  }
);
const idealSwarmFlightTimeWasmClientCandidate = {
  geometry: {
    delayedPotentials: [
      projectDelayedPotentialRowForBaseline(idealSwarmFlightTimeWasmClientRow),
    ],
  },
  status: {
    code: "ok",
    severity: "ok",
    message: "shared geometry computed",
    recoverable: true,
  },
};
const idealSwarmFlightTimeWasmClientComparison = classifySolverBaselineResponse({
  baseline: idealSwarmFlightTimeWasmClientCase.baseline,
  candidate: idealSwarmFlightTimeWasmClientCandidate,
  tolerance: idealSwarmFlightTimeWasmClientCase.tolerance,
  refinementTolerance: idealSwarmFlightTimeWasmClientCase.refinementTolerance,
});
assert(
  idealSwarmFlightTimeWasmClientComparison.classification === "baseline_within_tolerance",
  `${idealSwarmFlightTimeWasmClientCase.caseId} baseline classification was ${idealSwarmFlightTimeWasmClientComparison.classification}`
);
recordSandboxArtifact({
  testCase: idealSwarmFlightTimeWasmClientCase,
  comparison: idealSwarmFlightTimeWasmClientComparison,
  baseline: idealSwarmFlightTimeWasmClientCase.baseline,
  response: idealSwarmFlightTimeWasmClientCandidate,
  fullResponse: {
    appFacadeFlightTime: idealSwarmFlightTimeWasmClientRow,
  },
  manifestHash: "ideal-swarm-flight-time-wasm-client",
});

const photonPhaseCase = createPhotonPhaseDiagnosticsCase();
const photonPhaseRunHandle = await client.runSimulation(
  createPhotonPhaseDiagnosticsRunSimulationRequest(photonPhaseCase)
);
const photonPhaseNormalizedResponse = stripRuntimeBuffers(photonPhaseRunHandle.response);
const photonPhaseComparison = classifySolverBaselineResponse({
  baseline: photonPhaseCase.baseline,
  candidate: projectPhotonPhaseResponseForBaseline(photonPhaseNormalizedResponse),
  tolerance: photonPhaseCase.tolerance,
  refinementTolerance: photonPhaseCase.refinementTolerance,
});
assert(
  photonPhaseComparison.classification === "baseline_within_tolerance",
  `${photonPhaseCase.caseId} baseline classification was ${photonPhaseComparison.classification}`
);
const photonPhaseArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: photonPhaseCase.caseId,
  appId: photonPhaseCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: photonPhaseCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(photonPhaseCase),
  provenance: createSandboxProvenance(photonPhaseCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: photonPhaseComparison,
  baseline: photonPhaseCase.baseline,
  runManifest: photonPhaseNormalizedResponse.manifest,
  response: photonPhaseNormalizedResponse,
};
const photonPhaseArtifactPath = path.join(outputDir, `${photonPhaseCase.caseId}.json`);
const photonPhaseArtifactSha256 = writeJsonArtifact(photonPhaseArtifactPath, photonPhaseArtifact);
artifacts.push({
  caseId: photonPhaseCase.caseId,
  appId: photonPhaseCase.appId,
  path: photonPhaseArtifactPath,
  artifactSha256: photonPhaseArtifactSha256,
  tolerancePolicy: createTolerancePolicy(photonPhaseCase),
  classification: photonPhaseComparison.classification,
  manifestHash: photonPhaseNormalizedResponse.manifest.manifestHash,
});

const pathHistoryCase = createPathHistoryCase();
const pathHistoryRunHandle = await client.runSimulation(createPathHistoryRunSimulationRequest(pathHistoryCase));
const pathHistoryNormalizedResponse = stripRuntimeBuffers(pathHistoryRunHandle.response);
const pathHistoryComparison = classifySolverBaselineResponse({
  baseline: pathHistoryCase.baseline,
  candidate: projectPathHistoryResponseForBaseline(pathHistoryNormalizedResponse),
  tolerance: pathHistoryCase.tolerance,
  refinementTolerance: pathHistoryCase.refinementTolerance,
});
assert(
  pathHistoryComparison.classification === "baseline_within_tolerance",
  `${pathHistoryCase.caseId} baseline classification was ${pathHistoryComparison.classification}`
);
const pathHistoryArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: pathHistoryCase.caseId,
  appId: pathHistoryCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: pathHistoryCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(pathHistoryCase),
  provenance: createSandboxProvenance(pathHistoryCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: pathHistoryComparison,
  baseline: pathHistoryCase.baseline,
  runManifest: pathHistoryNormalizedResponse.manifest,
  response: pathHistoryNormalizedResponse,
};
const pathHistoryArtifactPath = path.join(outputDir, `${pathHistoryCase.caseId}.json`);
const pathHistoryArtifactSha256 = writeJsonArtifact(pathHistoryArtifactPath, pathHistoryArtifact);
artifacts.push({
  caseId: pathHistoryCase.caseId,
  appId: pathHistoryCase.appId,
  path: pathHistoryArtifactPath,
  artifactSha256: pathHistoryArtifactSha256,
  tolerancePolicy: createTolerancePolicy(pathHistoryCase),
  classification: pathHistoryComparison.classification,
  manifestHash: pathHistoryNormalizedResponse.manifest.manifestHash,
});

const animatorMotionCase = createAnimatorMotionCase();
const animatorMotionRunHandle = await client.runSimulation(
  createAnimatorMotionRunSimulationRequest(animatorMotionCase)
);
const animatorMotionReplayValidation = await client.validatePathHistoryDynamicReplayF64(
  createPathHistoryDynamicReplayValidationRequest({
    streamId: `${animatorMotionCase.caseId}-run:motion-path-history`,
    tolerance: 0,
  })
);
const animatorMotionNormalizedResponse = stripRuntimeBuffers(animatorMotionRunHandle.response);
const animatorMotionCandidate = projectAnimatorMotionResponseForBaseline(
  animatorMotionNormalizedResponse,
  animatorMotionReplayValidation
);
const animatorMotionComparison = classifySolverBaselineResponse({
  baseline: animatorMotionCase.baseline,
  candidate: animatorMotionCandidate,
  tolerance: animatorMotionCase.tolerance,
  refinementTolerance: animatorMotionCase.refinementTolerance,
});
assert(
  animatorMotionComparison.classification === "baseline_within_tolerance",
  `${animatorMotionCase.caseId} baseline classification was ${animatorMotionComparison.classification}`
);
const animatorMotionArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: animatorMotionCase.caseId,
  appId: animatorMotionCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: animatorMotionCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(animatorMotionCase),
  provenance: createSandboxProvenance(animatorMotionCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: animatorMotionComparison,
  baseline: animatorMotionCase.baseline,
  dynamicReplayValidation: animatorMotionReplayValidation,
  runManifest: animatorMotionNormalizedResponse.manifest,
  response: animatorMotionCandidate,
  fullResponse: animatorMotionNormalizedResponse,
};
const animatorMotionArtifactPath = path.join(outputDir, `${animatorMotionCase.caseId}.json`);
const animatorMotionArtifactSha256 = writeJsonArtifact(animatorMotionArtifactPath, animatorMotionArtifact);
artifacts.push({
  caseId: animatorMotionCase.caseId,
  appId: animatorMotionCase.appId,
  path: animatorMotionArtifactPath,
  artifactSha256: animatorMotionArtifactSha256,
  tolerancePolicy: createTolerancePolicy(animatorMotionCase),
  classification: animatorMotionComparison.classification,
  manifestHash: animatorMotionNormalizedResponse.manifest.manifestHash,
});

const animatorWorkerBridgeCase = createAnimatorWorkerBridgeCase(animatorMotionCase);
const animatorWorkerBridgeMessage = await runAnimatorSimulationWorkerRequestAsync(
  createAnimatorWorkerBridgeRunRequest(animatorWorkerBridgeCase),
  {
    createWasmModule,
    locateFile: locateWasmFile,
  }
);
const animatorWorkerBridgeHydrated = hydrateAnimatorSimulationWorkerCompleteMessage(
  animatorWorkerBridgeMessage
);
const animatorWorkerBridgeCandidate = projectAnimatorWorkerBridgeDatasetForBaseline(
  animatorWorkerBridgeHydrated.dataset
);
const animatorWorkerBridgeComparison = classifySolverBaselineResponse({
  baseline: animatorWorkerBridgeCase.baseline,
  candidate: animatorWorkerBridgeCandidate,
  tolerance: animatorWorkerBridgeCase.tolerance,
  refinementTolerance: animatorWorkerBridgeCase.refinementTolerance,
});
assert(
  animatorWorkerBridgeComparison.classification === "baseline_within_tolerance",
  `${animatorWorkerBridgeCase.caseId} baseline classification was ${animatorWorkerBridgeComparison.classification}`
);
const animatorWorkerBridgeArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: animatorWorkerBridgeCase.caseId,
  appId: animatorWorkerBridgeCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: animatorWorkerBridgeCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(animatorWorkerBridgeCase),
  provenance: createSandboxProvenance(animatorWorkerBridgeCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: animatorWorkerBridgeComparison,
  baseline: animatorWorkerBridgeCase.baseline,
  response: animatorWorkerBridgeCandidate,
  fullResponse: {
    dataset: animatorWorkerBridgeHydrated.dataset,
    frameBufferSummary: animatorWorkerBridgeHydrated.frameBufferSummary,
  },
};
const animatorWorkerBridgeArtifactPath = path.join(outputDir, `${animatorWorkerBridgeCase.caseId}.json`);
const animatorWorkerBridgeArtifactSha256 = writeJsonArtifact(
  animatorWorkerBridgeArtifactPath,
  animatorWorkerBridgeArtifact
);
artifacts.push({
  caseId: animatorWorkerBridgeCase.caseId,
  appId: animatorWorkerBridgeCase.appId,
  path: animatorWorkerBridgeArtifactPath,
  artifactSha256: animatorWorkerBridgeArtifactSha256,
  tolerancePolicy: createTolerancePolicy(animatorWorkerBridgeCase),
  classification: animatorWorkerBridgeComparison.classification,
  manifestHash: animatorWorkerBridgeHydrated.dataset.simulation.solver.runId,
});

const manifestPath = path.join(outputDir, "manifest.json");
writeJsonArtifact(manifestPath, {
  schema: "solver-baseline-sandbox-manifest/v1",
  caseCount: artifacts.length,
  outputDirectory: outputDir,
  hashAlgorithm: "sha256",
  artifacts,
});
verifyArtifactHashes(artifacts);

await client.dispose();
console.log(`solver baseline sandbox check passed: ${artifacts.length} case(s)`);

function createCase(caseId, appId) {
  return {
    caseId,
    appId,
    request: fixtureRequest.request,
    baseline: fixtureResponse.response,
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      maxRoots: fixtureRequest.request.maxRoots,
      maxHits: fixtureRequest.request.maxHits,
      network: "disabled",
      sourceWrites: "disabled",
    },
  };
}

function recordSandboxArtifact({
  testCase,
  comparison,
  baseline,
  runManifest,
  response,
  fullResponse,
  manifestHash,
}) {
  const artifact = {
    schema: "solver-baseline-sandbox/v1",
    caseId: testCase.caseId,
    appId: testCase.appId,
    seedPolicy: "fixed-no-randomness",
    resourceCaps: testCase.resourceCaps,
    tolerancePolicy: createTolerancePolicy(testCase),
    provenance: createSandboxProvenance(testCase),
    workingDirectory: outputDir,
    outputPolicy: "artifact-only",
    writesToAppSource: false,
    comparison,
    ...(baseline === undefined ? {} : { baseline }),
    ...(runManifest === undefined ? {} : { runManifest }),
    response,
    ...(fullResponse === undefined ? {} : { fullResponse }),
  };
  const artifactPath = path.join(outputDir, `${testCase.caseId}.json`);
  const artifactSha256 = writeJsonArtifact(artifactPath, artifact);
  artifacts.push({
    caseId: testCase.caseId,
    appId: testCase.appId,
    path: artifactPath,
    artifactSha256,
    tolerancePolicy: createTolerancePolicy(testCase),
    classification: comparison.classification,
    manifestHash,
  });
}

function createPhotonCausalRootsFacadeCase() {
  return {
    caseId: "photon-causal-root-facade-smoke",
    appId: "photon",
    request: fixtureRequest.request,
    baseline: fixtureResponse.response,
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      maxRoots: fixtureRequest.request.maxRoots,
      maxHits: fixtureRequest.request.maxHits,
      network: "disabled",
      sourceWrites: "disabled",
    },
  };
}

function createPhotonCausalRootsWasmClientCase() {
  return {
    ...createPhotonCausalRootsFacadeCase(),
    caseId: "photon-causal-root-wasm-client-smoke",
  };
}

function createPhotonCircularSourceFacadeCase() {
  const hitTime = 10;
  const distance = Math.sqrt(101);
  const emissionTime = hitTime - distance;
  const sourcePoint = {
    x: 0,
    y: Math.cos(emissionTime),
    z: Math.sin(emissionTime),
  };
  const receiverPoint = { x: 10, y: 0, z: 0 };
  return {
    caseId: "photon-circular-source-roots-hits-ledger-facade-smoke",
    appId: "photon",
    request: {
      source: {
        startTime: -2,
        endTime: hitTime,
        center: { x: 0, y: 0, z: 0 },
        radiusU: { x: 0, y: 1, z: 0 },
        radiusV: { x: 0, y: 0, z: 1 },
        angularVelocity: 1,
        phaseAtEpoch: 0,
        epochTime: 0,
        errorBound: 1e-15,
      },
      receiver: {
        startTime: 0,
        endTime: hitTime,
        positionAtStart: receiverPoint,
        velocity: { x: 0, y: 0, z: 0 },
        errorBound: 1e-15,
      },
      hitTime,
      signalSpeed: 1,
      rootTolerance: 1e-13,
      maxIterations: 96,
      scanSubdivisions: 256,
      maxRoots: 4,
      streamId: "baseline-photon-circular-source",
    },
    baseline: {
      roots: [
        {
          statusCode: 0,
          emissionTime,
          hitTime,
          delay: distance,
          distance,
          residual: 0,
          sourcePoint,
          receiverPoint,
        },
      ],
      hits: [
        {
          emissionTime,
          hitTime,
          distance,
          emissionPoint: sourcePoint,
          receiverPoint,
        },
      ],
      rootLedgerDetails: [
        {
          entryKind: 1,
          statusCode: 0,
          emissionTime,
          hitTime,
          residual: 0,
        },
      ],
      buffers: [
        { layout: "root_ledger.v1", byteLength: 112, rowCount: 1 },
        { layout: "delayed_hit_events.v1", byteLength: 128, rowCount: 1 },
        { layout: "root_ledger_detail.v1", byteLength: 768, rowCount: 4 },
      ],
      status: { code: "ok" },
    },
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      maxRoots: 4,
      maxHits: 4,
      network: "disabled",
      sourceWrites: "disabled",
    },
  };
}

function createPhotonCircularSourceWasmClientCase() {
  const baseCase = createPhotonCircularSourceFacadeCase();
  return {
    ...baseCase,
    caseId: "photon-circular-source-roots-hits-ledger-wasm-client-smoke",
    request: {
      ...baseCase.request,
      streamId: "baseline-photon-circular-source-wasm-client",
    },
  };
}

function createPhotonNormalizedCircularSourceFacadeCase() {
  const baseCase = createPhotonCircularSourceFacadeCase();
  return {
    ...baseCase,
    caseId: "photon-normalized-circular-source-roots-hits-ledger-smoke",
    request: {
      coordinateOrigin: { x: 1e18, y: -2e18, z: 3e18 },
      localRequest: {
        ...baseCase.request,
        streamId: "baseline-photon-normalized-circular-source",
      },
      restoreAbsolutePoints: true,
    },
  };
}

function createPhotonNormalizedCircularSourceRunCase() {
  const baseCase = createPhotonNormalizedCircularSourceFacadeCase();
  return {
    ...baseCase,
    caseId: "photon-normalized-circular-source-run-smoke",
    request: {
      ...baseCase.request,
      localRequest: {
        ...baseCase.request.localRequest,
        streamId: "baseline-photon-normalized-circular-source-run",
      },
    },
  };
}

function createIdealSwarmGeometryCase() {
  const samplePoint = new THREE.Vector3(6, 0, 0);
  const architrino = {
    q: 3,
    positionAt: () => new THREE.Vector3(0, 0, 0),
    velocityAt: () => new THREE.Vector3(0, 0, 0),
  };
  const potentialBaseline = computePotentialContribution(samplePoint, architrino, 6, {
    fieldSpeed: 6,
    normalization: 2,
    softening: 0.08,
    useCausalDenominator: true,
    iterations: 4,
  });
  const selfHitSpan = solveCircularSelfHitSpan(1.2);
  return {
    caseId: "ideal-swarm-geometry-smoke",
    appId: "ideal-swarm",
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      network: "disabled",
      sourceWrites: "disabled",
    },
    geometryRequest: {
      delayedPotentials: [
        {
          source: {
            startTime: 0,
            endTime: 10,
            positionAtStart: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
          },
          samplePoint: { x: 6, y: 0, z: 0 },
          observationTime: 6,
          fieldSpeed: 6,
          normalization: 2,
          softening: 0.08,
          sourceCharge: 3,
          iterations: 4,
          useCausalDenominator: true,
        },
      ],
      circularSelfHitSpans: [{ fieldSpeedRatio: 1.2 }],
    },
    baseline: {
      geometry: {
        pathBounds: [],
        spherePointIntersections: [],
        delayedPotentials: [
          {
            itemIndex: 0,
            statusCode: 0,
            tau: potentialBaseline.tau,
            emissionTime: potentialBaseline.emissionTime,
            distance: potentialBaseline.distance,
            potential: potentialBaseline.potential,
            kappa: 1,
            iterations: 4,
            usedCausalDenominator: true,
          },
        ],
        circularSelfHitSpans: [
          {
            itemIndex: 0,
            statusCode: 0,
            fieldSpeedRatio: 1.2,
            regime: "super_field",
            resultKind: "root_solved",
            span: selfHitSpan,
            rootFound: true,
          },
        ],
      },
      status: {
        code: "ok",
        severity: "ok",
        message: "shared geometry computed",
        recoverable: true,
      },
    },
  };
}

function createIdealSwarmSelfHitWasmClientCase(idealSwarmGeometryCase) {
  return {
    caseId: "ideal-swarm-self-hit-wasm-client-smoke",
    appId: "ideal-swarm",
    tolerance: idealSwarmGeometryCase.tolerance,
    refinementTolerance: idealSwarmGeometryCase.refinementTolerance,
    resourceCaps: idealSwarmGeometryCase.resourceCaps,
    baseline: {
      geometry: {
        circularSelfHitSpans:
          idealSwarmGeometryCase.baseline.geometry.circularSelfHitSpans.map((row) => ({
            itemIndex: row.itemIndex,
            statusCode: row.statusCode,
            fieldSpeedRatio: row.fieldSpeedRatio,
            regime: row.regime,
            resultKind: row.resultKind,
            span: row.span,
            rootFound: row.rootFound,
          })),
      },
      status: idealSwarmGeometryCase.baseline.status,
    },
  };
}

function createIdealSwarmFlightTimeCase() {
  const sourceStart = new THREE.Vector3(1, -0.5, 0.25);
  const sourceVelocity = new THREE.Vector3(0.2, 0.1, -0.05);
  const samplePoint = new THREE.Vector3(3.4, 1.2, -0.7);
  const observationTime = 2.5;
  const architrino = {
    q: 2,
    positionAt(timeSeconds) {
      return sourceStart.clone().add(sourceVelocity.clone().multiplyScalar(timeSeconds));
    },
    velocityAt() {
      return sourceVelocity.clone();
    },
  };
  const options = {
    fieldSpeed: 6,
    iterations: 6,
    sourceStartTime: 0,
    sourceEndTime: observationTime,
    normalization: 2,
    sourceCharge: 2,
    useCausalDenominator: true,
  };
  const potentialBaseline = computePotentialContribution(
    samplePoint,
    architrino,
    observationTime,
    options
  );
  const tauBaseline = solveFlightTime(samplePoint, architrino, observationTime, options);
  return {
    caseId: "ideal-swarm-flight-time-smoke",
    appId: "ideal-swarm",
    samplePoint,
    architrino,
    observationTime,
    options,
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      network: "disabled",
      sourceWrites: "disabled",
    },
    baseline: {
      geometry: {
        delayedPotentials: [
          {
            itemIndex: 0,
            statusCode: 0,
            tau: tauBaseline,
            emissionTime: potentialBaseline.emissionTime,
            distance: potentialBaseline.distance,
            potential: potentialBaseline.potential,
            iterations: options.iterations,
            usedCausalDenominator: true,
          },
        ],
      },
      status: {
        code: "ok",
        severity: "ok",
        message: "shared geometry computed",
        recoverable: true,
      },
    },
  };
}

function createIdealSwarmFlightTimeWasmClientCase(idealSwarmFlightTimeCase) {
  return {
    ...idealSwarmFlightTimeCase,
    caseId: "ideal-swarm-flight-time-wasm-client-smoke",
  };
}

function createPhotonPhaseDiagnosticsCase() {
  const root = fixtureResponse.response.roots[0];
  const receiverPhase = 2 / 3;
  const phaseDelta = -1 / 3;
  const phaseSpread = 1 / 3;
  return {
    caseId: "photon-phase-diagnostics-smoke",
    appId: "photon",
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      network: "disabled",
      sourceWrites: "disabled",
    },
    phaseRequest: {
      roots: [root],
      sourceClock: { period: 2, epoch: 0, phaseOffset: 0 },
      receiverClock: { period: 6, epoch: 0, phaseOffset: 0 },
    },
    baseline: {
      phaseRows: [
        {
          rootId: root.rootId,
          statusCode: root.statusCode,
          sourceCycleIndex: 0,
          receiverCycleIndex: 1,
          emissionTime: root.emissionTime,
          hitTime: root.hitTime,
          sourcePhase: 0,
          receiverPhase,
          phaseDelta,
          phaseSpread,
          rootKind: 0,
          sourceLayerCode: 0,
          receiverLayerCode: 0,
          sourceRoleCode: 0,
          receiverRoleCode: 0,
          sourceChargeSign: 0,
          receiverChargeSign: 0,
          stateFlags: 0,
        },
      ],
      phaseSummary: {
        schema: "solver-phase-at-hit-summary.v1",
        rowCount: 1,
        rootIdRange: { start: root.rootId, end: root.rootId },
        statusCounts: [{ statusCode: root.statusCode, rowCount: 1 }],
        sourceCycleIndexRange: { start: 0, end: 0 },
        receiverCycleIndexRange: { start: 1, end: 1 },
        emissionTimeRange: { start: root.emissionTime, end: root.emissionTime },
        hitTimeRange: { start: root.hitTime, end: root.hitTime },
        sourcePhaseRange: { start: 0, end: 0 },
        receiverPhaseRange: { start: receiverPhase, end: receiverPhase },
        phaseDeltaRange: { start: phaseDelta, end: phaseDelta },
        phaseSpreadRange: { start: phaseSpread, end: phaseSpread },
        meanPhaseDelta: phaseDelta,
        meanPhaseSpread: phaseSpread,
        maxPhaseSpread: phaseSpread,
      },
      buffers: [
        {
          bufferId: "phase-at-hit",
          layout: "phase_at_hit.v1",
          byteOffset: 0,
          byteLength: 104,
          rowCount: 1,
          numericType: "f64",
        },
      ],
      status: {
        code: "ok",
        severity: "ok",
        message: "phase diagnostics run completed",
        recoverable: true,
      },
    },
  };
}

function createPathHistoryCase() {
  const pathRows = makePathHistoryRows();
  return {
    caseId: "animator-path-history-smoke",
    appId: "animator",
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      network: "disabled",
      sourceWrites: "disabled",
    },
    pathRows,
    baseline: {
      pathHistory: {
        schema: "solver-path-history-stream-summary.v1",
        runId: "animator-path-history-smoke-run",
        datasetId: "animator-path-history-smoke-dataset",
        streamId: "animator-path-history-smoke-run:path-history",
        rowCount: 3,
        chunkCount: 3,
        pathCount: 2,
        byteLength: 288,
        rowSizeBytes: 96,
        pathIndexRowCount: 3,
        pathIndexedChunkCount: 3,
        timeRange: { start: 0, end: 3 },
        frameRange: { start: 0, end: 2 },
        storagePolicy: {
          target: "caller-buffer",
          durable: false,
          maxBytes: 288,
        },
        metadata: {
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
          provenance: { fixture: "path-history-baseline-smoke" },
          diagnostics: [],
        },
      },
      status: {
        code: "ok",
        severity: "ok",
        message: "path-history run completed",
        recoverable: true,
      },
    },
  };
}

function createAnimatorMotionCase() {
  return {
    caseId: "animator-motion-dynamic-replay-smoke",
    appId: "animator",
    tolerance: 1e-10,
    refinementTolerance: 1e-6,
    resourceCaps: {
      maxBytes: 64 * 1024 * 1024,
      network: "disabled",
      sourceWrites: "disabled",
    },
    motionRequest: {
      pathKey: 1234,
      segment: {
        startTime: 0,
        endTime: 2,
        positionAtStart: { x: 1, y: 2, z: 3 },
        velocity: { x: 2, y: 0.5, z: -1 },
        errorBound: 1e-12,
      },
      startTime: 0,
      endTime: 2,
      step: 1,
      stateFlags: 9,
    },
    baseline: {
      frames: [
        createMotionFrameBaseline(0, 0, { x: 1, y: 2, z: 3 }),
        createMotionFrameBaseline(1, 1, { x: 3, y: 2.5, z: 2 }),
        createMotionFrameBaseline(2, 2, { x: 5, y: 3, z: 1 }),
      ],
      pathHistory: {
        schema: "solver-path-history-stream-summary.v1",
        runId: "animator-motion-dynamic-replay-smoke-run",
        datasetId: "animator-motion-dynamic-replay-smoke-dataset",
        streamId: "animator-motion-dynamic-replay-smoke-run:motion-path-history",
        rowCount: 1,
        chunkCount: 1,
        pathCount: 1,
        byteLength: 96,
        rowSizeBytes: 96,
        pathIndexRowCount: 1,
        pathIndexedChunkCount: 1,
        timeRange: { start: 0, end: 2 },
        frameRange: { start: 0, end: 0 },
        storagePolicy: {
          target: "caller-buffer",
          durable: false,
          maxBytes: 96,
        },
        dynamicReplay: {
          replayKind: "linear-motion-sample",
          pathKey: 1234,
          startTime: 0,
          endTime: 2,
          step: 1,
          stateFlags: 9,
        },
      },
      dynamicReplayValidation: {
        schema: "solver-path-history-dynamic-replay-validation.v1",
        streamId: "animator-motion-dynamic-replay-smoke-run:motion-path-history",
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
        status: { code: "ok" },
      },
      status: {
        code: "ok",
      },
    },
  };
}

function createAnimatorWorkerBridgeCase(animatorMotionCase) {
  return {
    caseId: "animator-worker-solver-bridge-smoke",
    appId: "animator",
    tolerance: animatorMotionCase.tolerance,
    refinementTolerance: animatorMotionCase.refinementTolerance,
    resourceCaps: animatorMotionCase.resourceCaps,
    motionRequest: animatorMotionCase.motionRequest,
    baseline: {
      frames: animatorMotionCase.baseline.frames.map((frame) => ({
        frameIndex: frame.frameIndex,
        time: frame.time,
        position: vectorObjectToArray(frame.position),
        velocity: vectorObjectToArray(frame.velocity),
      })),
      status: {
        code: "ok",
      },
    },
  };
}

function vectorObjectToArray(value = {}) {
  return [Number(value.x) || 0, Number(value.y) || 0, Number(value.z) || 0];
}

function createMotionFrameBaseline(frameIndex, time, position) {
  return {
    pathKey: 1234,
    frameIndex,
    time,
    position,
    velocity: { x: 2, y: 0.5, z: -1 },
    errorBound: 1e-12,
    stateFlags: 9,
  };
}

function projectIdealSwarmGeometryForBaseline(geometry) {
  return {
    pathBounds: [],
    spherePointIntersections: [],
    delayedPotentials: geometry.delayedPotentials.map((row) => ({
      itemIndex: row.itemIndex,
      statusCode: row.statusCode,
      tau: row.tau,
      emissionTime: row.emissionTime,
      distance: row.distance,
      potential: row.potential,
      kappa: row.kappa,
      iterations: row.iterations,
      usedCausalDenominator: row.usedCausalDenominator,
    })),
    circularSelfHitSpans: geometry.circularSelfHitSpans.map((row) => ({
      itemIndex: row.itemIndex,
      statusCode: row.statusCode,
      fieldSpeedRatio: row.fieldSpeedRatio,
      regime: row.regime,
      resultKind: row.resultKind,
      span: row.span,
      rootFound: row.rootFound,
    })),
  };
}

function projectDelayedPotentialRowForBaseline(row) {
  return {
    itemIndex: row.itemIndex,
    statusCode: row.statusCode,
    tau: row.tau,
    emissionTime: row.emissionTime,
    distance: row.distance,
    potential: row.potential,
    iterations: row.iterations,
    usedCausalDenominator: row.usedCausalDenominator,
  };
}

function projectCircularSelfHitSpanRowForBaseline(row) {
  return {
    itemIndex: row.itemIndex,
    statusCode: row.statusCode,
    fieldSpeedRatio: row.fieldSpeedRatio,
    regime: row.regime,
    resultKind: row.resultKind,
    span: row.span,
    rootFound: row.rootFound,
  };
}

function projectRootHitResponseForBaseline(response) {
  return {
    roots: response.roots,
    hits: response.hits,
    buffers: response.buffers
      .filter((buffer) => buffer.layout === "root_ledger.v1" || buffer.layout === "delayed_hit_events.v1")
      .map((buffer) => ({
        layout: buffer.layout,
        byteOffset: buffer.byteOffset,
        byteLength: buffer.byteLength,
        rowCount: buffer.rowCount,
        numericType: buffer.numericType,
      })),
    status: {
      code: response.status?.code,
    },
  };
}

function projectCircularSourceRootsHitsLedgerForBaseline(response) {
  return {
    roots: response.roots.map((root) => ({
      statusCode: root.statusCode,
      emissionTime: root.emissionTime,
      hitTime: root.hitTime,
      delay: root.delay,
      distance: root.distance,
      residual: root.residual,
      sourcePoint: root.sourcePoint,
      receiverPoint: root.receiverPoint,
    })),
    hits: response.hits.map((hit) => ({
      emissionTime: hit.emissionTime,
      hitTime: hit.hitTime,
      distance: hit.distance,
      emissionPoint: hit.emissionPoint,
      receiverPoint: hit.receiverPoint,
    })),
    rootLedgerDetails: response.rootLedgerDetails
      .filter((row) => row.entryKind === 1)
      .map((row) => ({
        entryKind: row.entryKind,
        statusCode: row.statusCode,
        emissionTime: row.emissionTime,
        hitTime: row.hitTime,
        residual: row.residual,
      })),
    buffers: response.buffers
      .filter((buffer) =>
        ["root_ledger.v1", "delayed_hit_events.v1", "root_ledger_detail.v1"].includes(buffer.layout)
      )
      .map((buffer) => ({
        layout: buffer.layout,
        byteLength: buffer.byteLength,
        rowCount: buffer.rowCount,
      })),
    status: {
      code: response.status?.code,
    },
  };
}

function projectPhotonPhaseResponseForBaseline(response) {
  return {
    phaseRows: response.phaseRows,
    phaseSummary: response.phaseSummary,
    buffers: response.buffers,
    status: response.status,
  };
}

function projectPathHistoryResponseForBaseline(response) {
  return {
    pathHistory: response.pathHistory,
    status: response.status,
  };
}

function projectAnimatorMotionResponseForBaseline(response, dynamicReplayValidation) {
  return {
    frames: response.frames.map((frame) => ({
      pathKey: frame.pathKey,
      frameIndex: frame.frameIndex,
      time: frame.time,
      position: frame.position,
      velocity: frame.velocity,
      errorBound: frame.errorBound,
      stateFlags: frame.stateFlags,
    })),
    pathHistory: {
      schema: response.pathHistory.schema,
      runId: response.pathHistory.runId,
      datasetId: response.pathHistory.datasetId,
      streamId: response.pathHistory.streamId,
      rowCount: response.pathHistory.rowCount,
      chunkCount: response.pathHistory.chunkCount,
      pathCount: response.pathHistory.pathCount,
      byteLength: response.pathHistory.byteLength,
      rowSizeBytes: response.pathHistory.rowSizeBytes,
      pathIndexRowCount: response.pathHistory.pathIndexRowCount,
      pathIndexedChunkCount: response.pathHistory.pathIndexedChunkCount,
      timeRange: response.pathHistory.timeRange,
      frameRange: response.pathHistory.frameRange,
      storagePolicy: response.pathHistory.storagePolicy,
      dynamicReplay: {
        replayKind: response.pathHistory.metadata.dynamicReplay.replayKind,
        pathKey: response.pathHistory.metadata.dynamicReplay.pathKey,
        startTime: response.pathHistory.metadata.dynamicReplay.startTime,
        endTime: response.pathHistory.metadata.dynamicReplay.endTime,
        step: response.pathHistory.metadata.dynamicReplay.step,
        stateFlags: response.pathHistory.metadata.dynamicReplay.stateFlags,
      },
    },
    dynamicReplayValidation: projectDynamicReplayValidationForBaseline(dynamicReplayValidation),
    status: {
      code: response.status?.code,
    },
  };
}

function projectAnimatorWorkerBridgeDatasetForBaseline(dataset = {}) {
  return {
    frames: (dataset.frames ?? []).map((frame) => {
      const particle = frame.particles?.[0] ?? {};
      return {
        frameIndex: frame.index,
        time: frame.t,
        position: particle.position ?? [],
        velocity: particle.velocity ?? [],
      };
    }),
    status: {
      code: dataset.simulation?.halt?.code,
    },
  };
}

function projectDynamicReplayValidationForBaseline(validation) {
  return {
    schema: validation.schema,
    streamId: validation.streamId,
    replayKind: validation.replayKind,
    tolerance: validation.tolerance,
    actualRowCount: validation.actualRowCount,
    expectedRowCount: validation.expectedRowCount,
    selectedRangeCount: validation.selectedRangeCount,
    selectedByteLength: validation.selectedByteLength,
    matched: validation.matched,
    mismatchCount: validation.mismatchCount,
    maxTimeDifference: validation.maxTimeDifference,
    maxPositionDifference: validation.maxPositionDifference,
    maxVelocityDifference: validation.maxVelocityDifference,
    maxErrorBoundDifference: validation.maxErrorBoundDifference,
    status: {
      code: validation.status?.code,
    },
  };
}

function makePathHistoryRows() {
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

function createRunSimulationRequest(testCase) {
  return {
    requestId: `${testCase.caseId}-request`,
    runId: `${testCase.caseId}-run`,
    datasetId: `${testCase.caseId}-dataset`,
    appId: testCase.appId,
    runKind: "causalRoots",
    claimLevel: "migration-parity",
    precisionPath: "auto",
    configVersion: "solver-baseline-sandbox.v1",
    configHash: `${testCase.caseId}-config`,
    model: {
      modelId: "aaa.central-solver",
      equationVersion: "motion-root-v1",
      forceLawVersion: "causal-delay-v1",
      constantsHash: "constants:test",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    envelope: {
      entityCount: 16,
      assemblyCount: 1,
      timeWindow: { start: 0, end: 10, stepHint: 0.01, units: "solver-time" },
      timeResolutionHint: 0.01,
      interactionPolicy: "neighbor-pruned",
      expectedBranchComplexity: "low",
      outputDetail: "playback",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes * 2,
      storageBudgetBytes: testCase.resourceCaps.maxBytes * 4,
      latencyTarget: "background",
      simplificationPolicy: "none",
    },
    errorBudget: {
      globalTolerance: 1e-12,
      rootIsolationTolerance: 1e-13,
      delayedHitTolerance: 1e-13,
      integrationTolerance: 1e-12,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    config: {
      appId: testCase.appId,
      rootRequest: testCase.request,
    },
    output: {
      outputs: ["rootLedger", "delayedHitEvents", "diagnostics", "validationArtifacts"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes,
      deterministic: true,
    },
  };
}

function createNormalizedCircularSourceRunSimulationRequest(testCase) {
  const request = createRunSimulationRequest({
    ...testCase,
    request: testCase.request.localRequest,
  });
  return {
    ...request,
    config: {
      appId: testCase.appId,
      normalizedCircularSourceRootRequest: testCase.request,
    },
  };
}

function createPhotonPhaseDiagnosticsRunSimulationRequest(testCase) {
  return createPhotonPhaseDiagnosticsRunRequest({
    requestId: `${testCase.caseId}-request`,
    runId: `${testCase.caseId}-run`,
    datasetId: `${testCase.caseId}-dataset`,
    claimLevel: "migration-parity",
    precisionPath: "auto",
    configVersion: "solver-baseline-sandbox.v1",
    configHash: `${testCase.caseId}-config`,
    model: {
      modelId: "aaa.central-solver",
      equationVersion: "motion-root-v1",
      forceLawVersion: "causal-delay-v1",
      constantsHash: "constants:test",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    envelope: {
      entityCount: 16,
      assemblyCount: 1,
      timeWindow: { start: 0, end: 10, stepHint: 0.01, units: "solver-time" },
      timeResolutionHint: 0.01,
      interactionPolicy: "neighbor-pruned",
      expectedBranchComplexity: "low",
      outputDetail: "playback",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes * 2,
      storageBudgetBytes: testCase.resourceCaps.maxBytes * 4,
      latencyTarget: "background",
      simplificationPolicy: "none",
    },
    errorBudget: {
      globalTolerance: 1e-12,
      rootIsolationTolerance: 1e-13,
      delayedHitTolerance: 1e-13,
      integrationTolerance: 1e-12,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    phaseRequest: testCase.phaseRequest,
    output: {
      outputs: ["phaseAtHit", "diagnostics", "validationArtifacts"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes,
      deterministic: true,
    },
  });
}

function createPathHistoryRunSimulationRequest(testCase) {
  return createPathHistoryRunRequest({
    requestId: `${testCase.caseId}-request`,
    runId: `${testCase.caseId}-run`,
    datasetId: `${testCase.caseId}-dataset`,
    appId: testCase.appId,
    claimLevel: "migration-parity",
    precisionPath: "auto",
    configVersion: "solver-baseline-sandbox.v1",
    configHash: `${testCase.caseId}-config`,
    model: {
      modelId: "aaa.central-solver",
      equationVersion: "motion-root-v1",
      forceLawVersion: "causal-delay-v1",
      constantsHash: "constants:test",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    envelope: {
      entityCount: 16,
      assemblyCount: 1,
      timeWindow: { start: 0, end: 10, stepHint: 0.01, units: "solver-time" },
      timeResolutionHint: 0.01,
      interactionPolicy: "neighbor-pruned",
      expectedBranchComplexity: "low",
      outputDetail: "playback",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes * 2,
      storageBudgetBytes: testCase.resourceCaps.maxBytes * 4,
      latencyTarget: "background",
      simplificationPolicy: "none",
    },
    errorBudget: {
      globalTolerance: 1e-12,
      rootIsolationTolerance: 1e-13,
      delayedHitTolerance: 1e-13,
      integrationTolerance: 1e-12,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    streamId: `${testCase.caseId}-run:path-history`,
    pathRows: testCase.pathRows,
    rowsPerChunk: 1,
    metadata: {
      precisionPath: "scaled_f64_strict",
      claimLevel: "migration-parity",
      units: "solver-si",
      coordinateFrame: "absolute-lab-frame",
      scaleNormalization: "unit-test-scale",
      interpolationRule: "linear-segment",
      provenance: { fixture: "path-history-baseline-smoke" },
    },
    output: {
      outputs: ["pathStream", "diagnostics", "validationArtifacts"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes,
      deterministic: true,
    },
  });
}

function createAnimatorMotionRunSimulationRequest(testCase) {
  return createAnimatorMotionSimulationRunRequest({
    requestId: `${testCase.caseId}-request`,
    runId: `${testCase.caseId}-run`,
    datasetId: `${testCase.caseId}-dataset`,
    claimLevel: "migration-parity",
    precisionPath: "auto",
    configVersion: "solver-baseline-sandbox.v1",
    configHash: `${testCase.caseId}-config`,
    model: {
      modelId: "aaa.central-solver",
      equationVersion: "motion-root-v1",
      forceLawVersion: "causal-delay-v1",
      constantsHash: "constants:test",
      causalSpeedPolicy: "fixed-field-speed",
      branchPolicy: "all-positive-roots",
      unitConvention: "solver-si",
      compatiblePrecisionPaths: ["scaled_f64_strict", "event_root_focused", "extended_precision"],
    },
    envelope: {
      entityCount: 16,
      assemblyCount: 1,
      timeWindow: { start: 0, end: 10, stepHint: 0.01, units: "solver-time" },
      timeResolutionHint: 0.01,
      interactionPolicy: "neighbor-pruned",
      expectedBranchComplexity: "low",
      outputDetail: "playback",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes * 2,
      storageBudgetBytes: testCase.resourceCaps.maxBytes * 4,
      latencyTarget: "background",
      simplificationPolicy: "none",
    },
    errorBudget: {
      globalTolerance: 1e-12,
      rootIsolationTolerance: 1e-13,
      delayedHitTolerance: 1e-13,
      integrationTolerance: 1e-12,
      streamEncodingTolerance: 1e-12,
      readbackTolerance: 1e-12,
      projectionTolerance: 1e-9,
      displayTolerance: 1e-6,
    },
    motionRequest: testCase.motionRequest,
    streamId: `${testCase.caseId}-run:motion-path-history`,
    rowsPerChunk: 1,
    metadata: {
      precisionPath: "scaled_f64_strict",
      units: "solver-si",
      coordinateFrame: "absolute-lab-frame",
      scaleNormalization: "unit-test-scale",
      interpolationRule: "linear-segment",
      provenance: { fixture: "animator-motion-dynamic-replay-baseline-smoke" },
    },
    output: {
      outputs: ["frameBuffer", "pathStream", "diagnostics", "validationArtifacts"],
      streamTarget: "caller-buffer",
      memoryBudgetBytes: testCase.resourceCaps.maxBytes,
      deterministic: true,
    },
  });
}

function createAnimatorWorkerBridgeRunRequest(testCase) {
  return createAnimatorSimulationWorkerRunRequest(
    {
      solverBridge: {
        enabled: true,
        motionRequest: testCase.motionRequest,
        streamTarget: "caller-buffer",
        deterministic: true,
        memoryBudgetBytes: testCase.resourceCaps.maxBytes,
      },
    },
    {
      requestId: `${testCase.caseId}-request`,
      datasetOptions: {
        id: `${testCase.caseId}-dataset`,
        claimLevel: "migration-parity",
      },
    }
  );
}

function stripRuntimeBuffers(response) {
  return {
    ...response,
    buffers: response.buffers.map(({ buffer, ...descriptor }) => descriptor),
  };
}

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function assertInsideOutputDir(filePath) {
  const relative = path.relative(outputDir, filePath);
  assert(relative && !relative.startsWith("..") && !path.isAbsolute(relative), "artifact path escaped output dir");
}

function createTolerancePolicy(testCase) {
  return {
    tolerance: testCase.tolerance,
    refinementTolerance: testCase.refinementTolerance,
    classificationVocabulary: [
      "baseline_within_tolerance",
      "baseline_refined_result",
      "baseline_model_boundary_difference",
      "baseline_investigation_required_mismatch",
    ],
  };
}

function createSandboxProvenance(testCase) {
  return {
    apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
    caseId: testCase.caseId,
    appId: testCase.appId,
    wasmLoaderPath,
    fixtureRequestPath: "src/solver/fixtures/causal-roots-f64-smoke.request.json",
    fixtureResponsePath: "src/solver/fixtures/roots-and-hits-f64-smoke.response.json",
  };
}

function writeJsonArtifact(filePath, value) {
  assertInsideOutputDir(filePath);
  const payload = `${JSON.stringify(value, null, 2)}\n`;
  fs.writeFileSync(filePath, payload);
  return crypto.createHash("sha256").update(payload).digest("hex");
}

function verifyArtifactHashes(artifactRows) {
  for (const artifact of artifactRows) {
    assertInsideOutputDir(artifact.path);
    const payload = fs.readFileSync(artifact.path);
    const actualSha256 = crypto.createHash("sha256").update(payload).digest("hex");
    assert(
      actualSha256 === artifact.artifactSha256,
      `${artifact.caseId} artifact hash mismatch`
    );
  }
}

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
