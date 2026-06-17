#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

import * as THREE from "../vendor/three/three.module.js";
import { computePotentialContribution } from "../src/apps/ideal-swarm/IdealSwarmRuntime.js";
import { solveCircularSelfHitSpan } from "../src/apps/ideal-swarm/IdealSwarmPathPotentialProfile.js";
import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";
import {
  createPathHistoryRunRequest,
  createPhotonPhaseDiagnosticsRunRequest,
} from "../src/solver/app/SolverAppAdapters.mjs";
import { classifySolverBaselineResponse } from "../src/solver/app/SolverBaselineComparison.mjs";

const require = createRequire(import.meta.url);
const rootDir = process.cwd();
const wasmDir = path.join(rootDir, ".tmp", "solver-build", "wasm");
const outputDir = path.join(rootDir, ".tmp", "solver-baseline-sandbox");
const wasmLoaderPath = path.join(wasmDir, "architrino_solver_wasm_smoke.js");
const createWasmModule = require(wasmLoaderPath);
const fixtureRequest = readJson("src/solver/fixtures/causal-roots-f64-smoke.request.json");
const fixtureResponse = readJson("src/solver/fixtures/roots-and-hits-f64-smoke.response.json");

fs.mkdirSync(outputDir, { recursive: true });

const client = createSolverAppBridgeClient({
  createWasmModule,
  locateFile: (fileName) => path.join(wasmDir, fileName),
});

await client.init({
  appId: "animator",
  apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
  requestedCapabilities: ["causalRoots", "delayedHits", "validationReplay"],
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
    workingDirectory: outputDir,
    outputPolicy: "artifact-only",
    writesToAppSource: false,
    comparison,
    runManifest: normalizedResponse.manifest,
    response: normalizedResponse,
  };
  const artifactPath = path.join(outputDir, `${testCase.caseId}.json`);
  assertInsideOutputDir(artifactPath);
  fs.writeFileSync(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`);
  artifacts.push({
    caseId: testCase.caseId,
    appId: testCase.appId,
    path: artifactPath,
    classification: comparison.classification,
    manifestHash: normalizedResponse.manifest.manifestHash,
  });
}

const idealSwarmGeometryCase = createIdealSwarmGeometryCase();
const idealSwarmGeometryCandidate = await client.computeSharedGeometryF64(
  idealSwarmGeometryCase.geometryRequest
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
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: idealSwarmGeometryComparison,
  baseline: idealSwarmGeometryCase.baseline,
  response: idealSwarmGeometryComparable,
  fullResponse: {
    geometry: idealSwarmGeometryCandidate,
    status: idealSwarmGeometryCandidate.status,
  },
};
const idealSwarmGeometryArtifactPath = path.join(outputDir, `${idealSwarmGeometryCase.caseId}.json`);
assertInsideOutputDir(idealSwarmGeometryArtifactPath);
fs.writeFileSync(idealSwarmGeometryArtifactPath, `${JSON.stringify(idealSwarmGeometryArtifact, null, 2)}\n`);
artifacts.push({
  caseId: idealSwarmGeometryCase.caseId,
  appId: idealSwarmGeometryCase.appId,
  path: idealSwarmGeometryArtifactPath,
  classification: idealSwarmGeometryComparison.classification,
  manifestHash: "geometry-direct-bridge",
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
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: photonPhaseComparison,
  baseline: photonPhaseCase.baseline,
  runManifest: photonPhaseNormalizedResponse.manifest,
  response: photonPhaseNormalizedResponse,
};
const photonPhaseArtifactPath = path.join(outputDir, `${photonPhaseCase.caseId}.json`);
assertInsideOutputDir(photonPhaseArtifactPath);
fs.writeFileSync(photonPhaseArtifactPath, `${JSON.stringify(photonPhaseArtifact, null, 2)}\n`);
artifacts.push({
  caseId: photonPhaseCase.caseId,
  appId: photonPhaseCase.appId,
  path: photonPhaseArtifactPath,
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
  workingDirectory: outputDir,
  outputPolicy: "artifact-only",
  writesToAppSource: false,
  comparison: pathHistoryComparison,
  baseline: pathHistoryCase.baseline,
  runManifest: pathHistoryNormalizedResponse.manifest,
  response: pathHistoryNormalizedResponse,
};
const pathHistoryArtifactPath = path.join(outputDir, `${pathHistoryCase.caseId}.json`);
assertInsideOutputDir(pathHistoryArtifactPath);
fs.writeFileSync(pathHistoryArtifactPath, `${JSON.stringify(pathHistoryArtifact, null, 2)}\n`);
artifacts.push({
  caseId: pathHistoryCase.caseId,
  appId: pathHistoryCase.appId,
  path: pathHistoryArtifactPath,
  classification: pathHistoryComparison.classification,
  manifestHash: pathHistoryNormalizedResponse.manifest.manifestHash,
});

const manifestPath = path.join(outputDir, "manifest.json");
assertInsideOutputDir(manifestPath);
fs.writeFileSync(
  manifestPath,
  `${JSON.stringify(
    {
      schema: "solver-baseline-sandbox-manifest/v1",
      caseCount: artifacts.length,
      outputDirectory: outputDir,
      artifacts,
    },
    null,
    2
  )}\n`
);

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
          byteLength: 72,
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

function assert(condition, message) {
  if (!condition) {
    console.error(message);
    process.exit(1);
  }
}
