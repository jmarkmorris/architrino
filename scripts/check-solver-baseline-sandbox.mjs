#!/usr/bin/env node

import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";
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
  const response = await client.solveRootsAndHitsF64(testCase.request);
  const normalizedResponse = stripRuntimeBuffers(response);
  const comparison = classifySolverBaselineResponse({
    baseline: testCase.baseline,
    candidate: normalizedResponse,
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
  });
}

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
