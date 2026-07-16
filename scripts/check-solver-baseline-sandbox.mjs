#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import * as THREE from "../vendor/three/three.module.js";
import {
  solveFlightTimeRowWithPrescribedPathAnalysis,
} from "../src/apps/ideal-braid/IdealBraidRuntime.js";
import {
  runPhotonCausalRootsWithPrescribedPathAnalysis,
  solvePhotonCircularSourceRootsHitsLedgerWithPrescribedPathAnalysis,
} from "../src/apps/photon/PhotonFormulaRuntime.js";
import {
  solveCircularSelfHitSpanRowWithPrescribedPathAnalysis,
} from "../src/apps/ideal-braid/IdealBraidPathPotentialProfile.js";
import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";
import {
  createAnimatorMotionSimulationRunRequest,
  createPathHistoryDynamicReplayValidationRequest,
  createPathHistoryRunRequest,
} from "../src/solver/app/SolverAppAdapters.mjs";
import { classifySolverBaselineResponse } from "../src/solver/app/SolverBaselineComparison.mjs";
import {
  computePrescribedPathGeometry,
  runPrescribedPathAnalysisRequest,
} from "../src/prescribed-path-analysis/index.mjs";

const rootDir = process.cwd();
const wasmDir = path.join(rootDir, ".tmp", "solver-build", "wasm");
const outputDir = path.join(rootDir, ".tmp", "solver-baseline-sandbox");
const wasmLoaderPath = path.join(wasmDir, "architrino_solver_wasm_smoke.mjs");
const { default: createWasmModule } = await import(pathToFileURL(wasmLoaderPath).href);
const locateWasmFile = (fileName) => path.join(wasmDir, fileName);
const fixtureRequest = readJson("src/solver/fixtures/causal-roots-f64-smoke.request.json");
const fixtureResponse = readJson("src/solver/fixtures/roots-and-hits-f64-smoke.response.json");

const ROOT_LEDGER_ROW_F64_BYTES = 176;
const DELAYED_HIT_ROW_F64_BYTES = 192;
const ROOT_LEDGER_DETAIL_ROW_F64_BYTES = 248;

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
const photonFacadeRunHandle = await runPhotonCausalRootsWithPrescribedPathAnalysis(
  photonFacadeCase.request,
  {
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
  analysisId: "prescribed-path-analysis",
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
  manifestHash: "prescribed-path-analysis",
});

const photonCircularFacadeCase = createPhotonCircularSourceFacadeCase();
const photonCircularFacadeResponse = await solvePhotonCircularSourceRootsHitsLedgerWithPrescribedPathAnalysis(
  null,
  null,
  photonCircularFacadeCase.request.hitTime,
  {
    request: photonCircularFacadeCase.request,
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
  manifestHash: "prescribed-path-analysis",
});

const idealBraidGeometryCase = createIdealBraidGeometryCase();
const idealBraidGeometryCandidate = computePrescribedPathGeometry(
  idealBraidGeometryCase.geometryRequest
);
const idealBraidFacadeSelfHit = await solveCircularSelfHitSpanRowWithPrescribedPathAnalysis(1.2, {
  runId: `${idealBraidGeometryCase.caseId}-facade-run`,
});
const idealBraidBaselineSelfHitSpan =
  idealBraidGeometryCase.baseline.geometry.circularSelfHitSpans[0].span;
assert(
  Math.abs(idealBraidFacadeSelfHit.span - idealBraidBaselineSelfHitSpan) <=
    idealBraidGeometryCase.tolerance,
  `${idealBraidGeometryCase.caseId} facade self-hit span drifted from baseline`
);
const idealBraidGeometryComparable = {
  geometry: projectIdealBraidGeometryForBaseline(idealBraidGeometryCandidate),
  status: idealBraidGeometryCandidate.status,
};
const idealBraidGeometryComparison = classifySolverBaselineResponse({
  baseline: idealBraidGeometryCase.baseline,
  candidate: idealBraidGeometryComparable,
  tolerance: idealBraidGeometryCase.tolerance,
  refinementTolerance: idealBraidGeometryCase.refinementTolerance,
});
assert(
  idealBraidGeometryComparison.classification === "baseline_within_tolerance",
  `${idealBraidGeometryCase.caseId} baseline classification was ${idealBraidGeometryComparison.classification}`
);
const idealBraidGeometryArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: idealBraidGeometryCase.caseId,
  appId: idealBraidGeometryCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: idealBraidGeometryCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(idealBraidGeometryCase),
  provenance: createSandboxProvenance(idealBraidGeometryCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: idealBraidGeometryComparison,
  baseline: idealBraidGeometryCase.baseline,
  response: idealBraidGeometryComparable,
  fullResponse: {
    geometry: idealBraidGeometryCandidate,
    appFacadeSelfHit: idealBraidFacadeSelfHit,
    status: idealBraidGeometryCandidate.status,
  },
};
const idealBraidGeometryArtifactPath = path.join(outputDir, `${idealBraidGeometryCase.caseId}.json`);
const idealBraidGeometryArtifactSha256 = writeJsonArtifact(
  idealBraidGeometryArtifactPath,
  idealBraidGeometryArtifact
);
artifacts.push({
  caseId: idealBraidGeometryCase.caseId,
  appId: idealBraidGeometryCase.appId,
  path: idealBraidGeometryArtifactPath,
  artifactSha256: idealBraidGeometryArtifactSha256,
  tolerancePolicy: createTolerancePolicy(idealBraidGeometryCase),
  classification: idealBraidGeometryComparison.classification,
  manifestHash: "prescribed-path-analysis",
});

const idealBraidFlightTimeCase = createIdealBraidFlightTimeCase();
const idealBraidFlightTimeRow = await solveFlightTimeRowWithPrescribedPathAnalysis(
  idealBraidFlightTimeCase.samplePoint,
  idealBraidFlightTimeCase.architrino,
  idealBraidFlightTimeCase.observationTime,
  {
    ...idealBraidFlightTimeCase.options,
    runId: `${idealBraidFlightTimeCase.caseId}-facade-run`,
  }
);
const idealBraidFlightTimeCandidate = {
  geometry: {
    delayedPotentials: [
      projectDelayedPotentialRowForBaseline(idealBraidFlightTimeRow),
    ],
  },
  status: {
    code: "ok",
    severity: "ok",
    message: "shared geometry computed",
    recoverable: true,
  },
};
const idealBraidFlightTimeComparison = classifySolverBaselineResponse({
  baseline: idealBraidFlightTimeCase.baseline,
  candidate: idealBraidFlightTimeCandidate,
  tolerance: idealBraidFlightTimeCase.tolerance,
  refinementTolerance: idealBraidFlightTimeCase.refinementTolerance,
});
assert(
  idealBraidFlightTimeComparison.classification === "baseline_within_tolerance",
  `${idealBraidFlightTimeCase.caseId} baseline classification was ${idealBraidFlightTimeComparison.classification}`
);
const idealBraidFlightTimeArtifact = {
  schema: "solver-baseline-sandbox/v1",
  caseId: idealBraidFlightTimeCase.caseId,
  appId: idealBraidFlightTimeCase.appId,
  seedPolicy: "fixed-no-randomness",
  resourceCaps: idealBraidFlightTimeCase.resourceCaps,
  tolerancePolicy: createTolerancePolicy(idealBraidFlightTimeCase),
  provenance: createSandboxProvenance(idealBraidFlightTimeCase),
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: idealBraidFlightTimeComparison,
  baseline: idealBraidFlightTimeCase.baseline,
  response: idealBraidFlightTimeCandidate,
  fullResponse: {
    appFacadeFlightTime: idealBraidFlightTimeRow,
  },
};
const idealBraidFlightTimeArtifactPath = path.join(outputDir, `${idealBraidFlightTimeCase.caseId}.json`);
const idealBraidFlightTimeArtifactSha256 = writeJsonArtifact(
  idealBraidFlightTimeArtifactPath,
  idealBraidFlightTimeArtifact
);
artifacts.push({
  caseId: idealBraidFlightTimeCase.caseId,
  appId: idealBraidFlightTimeCase.appId,
  path: idealBraidFlightTimeArtifactPath,
  artifactSha256: idealBraidFlightTimeArtifactSha256,
  tolerancePolicy: createTolerancePolicy(idealBraidFlightTimeCase),
  classification: idealBraidFlightTimeComparison.classification,
  manifestHash: "prescribed-path-analysis",
});

const photonPhaseCase = createPhotonPhaseDiagnosticsCase();
const photonPhaseRunHandle = await runPrescribedPathAnalysisRequest(
  createPhotonPhaseDiagnosticsRunSimulationRequest(photonPhaseCase)
);
const photonPhaseNormalizedResponse = stripRuntimeBuffers(photonPhaseRunHandle.response);
const photonPhaseComparison = classifySolverBaselineResponse({
  baseline: projectPhotonPhaseResponseForBaseline(photonPhaseCase.baseline),
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
  analysisId: "prescribed-path-analysis",
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
  manifestHash: "prescribed-path-analysis",
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
        { layout: "root_ledger.v1", byteLength: ROOT_LEDGER_ROW_F64_BYTES, rowCount: 1 },
        { layout: "delayed_hit_events.v1", byteLength: DELAYED_HIT_ROW_F64_BYTES, rowCount: 1 },
        { layout: "root_ledger_detail.v1", byteLength: ROOT_LEDGER_DETAIL_ROW_F64_BYTES * 4, rowCount: 4 },
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

function createIdealBraidGeometryCase() {
  const delayedPotentialBaseline = {
    tau: 1,
    emissionTime: 5,
    distance: 6,
    potential: 6 / Math.sqrt(36 + 0.08 * 0.08),
  };
  const selfHitSpan = 2.0534765827345125;
  return {
    caseId: "ideal-braid-geometry-smoke",
    appId: "ideal-braid",
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
            tau: delayedPotentialBaseline.tau,
            emissionTime: delayedPotentialBaseline.emissionTime,
            distance: delayedPotentialBaseline.distance,
            potential: delayedPotentialBaseline.potential,
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

function createIdealBraidFlightTimeCase() {
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
  const delayedPotentialBaseline = {
    tau: 0.43776433548735727,
    emissionTime: 2.0622356645126425,
    distance: 2.6265860131821737,
    potential: 1.581307013398278,
  };
  return {
    caseId: "ideal-braid-flight-time-smoke",
    appId: "ideal-braid",
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
            tau: delayedPotentialBaseline.tau,
            emissionTime: delayedPotentialBaseline.emissionTime,
            distance: delayedPotentialBaseline.distance,
            potential: delayedPotentialBaseline.potential,
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

function projectIdealBraidGeometryForBaseline(geometry) {
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
    roots: (response.roots ?? []).map((root) => ({
      rootId: root.rootId,
      statusCode: root.statusCode,
      emissionTime: root.emissionTime,
      hitTime: root.hitTime,
      delay: root.delay,
      distance: root.distance,
      residual: root.residual,
      jacobian: root.jacobian,
      branchWeight: root.branchWeight,
      sourcePoint: root.sourcePoint,
      receiverPoint: root.receiverPoint,
      sourceNormalSpeed: root.sourceNormalSpeed,
      receiverNormalSpeed: root.receiverNormalSpeed,
      sourceNormalDenominator: root.sourceNormalDenominator,
      receiverNormalNumerator: root.receiverNormalNumerator,
      receiverNormalCrossingFactor: root.receiverNormalCrossingFactor,
      receiverNormalFactor: root.receiverNormalFactor,
      unsignedReceiverNormalFactor: root.unsignedReceiverNormalFactor,
      receiverNormalStatusCode: root.receiverNormalStatusCode,
    })),
    hits: (response.hits ?? []).map((hit) => ({
      eventId: hit.eventId,
      rootId: hit.rootId,
      statusCode: hit.statusCode,
      emissionTime: hit.emissionTime,
      hitTime: hit.hitTime,
      distance: hit.distance,
      jacobian: hit.jacobian,
      strength: hit.strength,
      emissionPoint: hit.emissionPoint,
      receiverPoint: hit.receiverPoint,
      unitDirection: hit.unitDirection,
      sourceNormalSpeed: hit.sourceNormalSpeed,
      receiverNormalSpeed: hit.receiverNormalSpeed,
      sourceNormalDenominator: hit.sourceNormalDenominator,
      receiverNormalNumerator: hit.receiverNormalNumerator,
      receiverNormalCrossingFactor: hit.receiverNormalCrossingFactor,
      receiverNormalFactor: hit.receiverNormalFactor,
      unsignedReceiverNormalFactor: hit.unsignedReceiverNormalFactor,
      receiverNormalStatusCode: hit.receiverNormalStatusCode,
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
    status: {
      code: response.status?.code,
    },
  };
}

function projectPhotonPhaseResponseForBaseline(response) {
  const summary = response.phaseSummary ?? {};
  return {
    phaseRows: (response.phaseRows ?? []).map((row) => ({
      rootId: row.rootId,
      statusCode: row.statusCode,
      sourceCycleIndex: row.sourceCycleIndex,
      receiverCycleIndex: row.receiverCycleIndex,
      emissionTime: row.emissionTime,
      hitTime: row.hitTime,
      sourcePhase: row.sourcePhase,
      receiverPhase: row.receiverPhase,
      phaseDelta: row.phaseDelta,
      phaseSpread: row.phaseSpread,
      rootKind: row.rootKind,
      sourceLayerCode: row.sourceLayerCode,
      receiverLayerCode: row.receiverLayerCode,
      sourceRoleCode: row.sourceRoleCode,
      receiverRoleCode: row.receiverRoleCode,
      sourceChargeSign: row.sourceChargeSign,
      receiverChargeSign: row.receiverChargeSign,
      stateFlags: row.stateFlags,
    })),
    phaseSummary: {
      schema: summary.schema,
      rowCount: summary.rowCount,
      rootIdRange: summary.rootIdRange,
      statusCounts: summary.statusCounts,
      sourceCycleIndexRange: summary.sourceCycleIndexRange,
      receiverCycleIndexRange: summary.receiverCycleIndexRange,
      emissionTimeRange: summary.emissionTimeRange,
      hitTimeRange: summary.hitTimeRange,
      sourcePhaseRange: summary.sourcePhaseRange,
      receiverPhaseRange: summary.receiverPhaseRange,
      phaseDeltaRange: summary.phaseDeltaRange,
      phaseSpreadRange: summary.phaseSpreadRange,
      meanPhaseDelta: summary.meanPhaseDelta,
      meanPhaseSpread: summary.meanPhaseSpread,
      maxPhaseSpread: summary.maxPhaseSpread,
    },
    status: { code: response.status?.code },
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

function createPhotonPhaseDiagnosticsRunSimulationRequest(testCase) {
  return {
    requestId: `${testCase.caseId}-request`,
    runId: `${testCase.caseId}-run`,
    datasetId: `${testCase.caseId}-dataset`,
    runKind: "phaseDiagnostics",
    config: {
      phaseRequest: testCase.phaseRequest,
    },
  };
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

function stripRuntimeBuffers(response) {
  return {
    ...response,
    buffers: (response.buffers ?? []).map(({ buffer, ...descriptor }) => descriptor),
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
