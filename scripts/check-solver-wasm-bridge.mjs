#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

import {
  SOLVER_APP_BRIDGE_API_VERSION,
  createSolverAppBridgeClient,
} from "../src/solver/app/SolverAppBridge.mjs";

const rootDir = process.cwd();
const solverDir = path.join(rootDir, "src", "solver");
const buildDir = path.join(rootDir, ".tmp", "solver-build", "wasm");
const wasmLoaderPath = path.join(buildDir, "architrino_solver_wasm_smoke.mjs");
const wasmPath = path.join(buildDir, "architrino_solver_wasm_smoke.wasm");
const emCache = process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache");
const env = {
  ...process.env,
  EM_CACHE: emCache,
};

fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(emCache, { recursive: true });

runChecked("node", ["scripts/solver-toolchain-preflight.mjs"], { env });
runChecked(
  "emcmake",
  [
    "cmake",
    "-S",
    solverDir,
    "-B",
    buildDir,
    "-G",
    "Ninja",
    "-DCMAKE_BUILD_TYPE=Release",
    "-DARCHITRINO_SOLVER_BUILD_WASM=ON",
    "-DARCHITRINO_SOLVER_BOOST_INCLUDE_DIR=/opt/homebrew/opt/boost/include",
  ],
  { env }
);
runChecked("cmake", ["--build", buildDir], { env });
assertExists(wasmLoaderPath);
assertExists(wasmPath);

const { default: createWasmModule } = await import(pathToFileURL(wasmLoaderPath).href);
const locateFile = (fileName) => path.join(buildDir, fileName);
const module = await createWasmModule({ locateFile });
for (const smokeName of [
  "architrino_solver_smoke",
  "architrino_solver_contract_smoke",
  "architrino_solver_root_smoke",
]) {
  const smoke = module.cwrap(smokeName, "number", []);
  const status = smoke();
  if (status !== 0) {
    throw new Error(`WebAssembly ${smokeName} failed with status ${status}`);
  }
}

const fixtureRequest = readJson("src/solver/fixtures/causal-roots-f64-smoke.request.json");
const client = createSolverAppBridgeClient({
  createWasmModule,
  locateFile,
});
try {
  const initResponse = await client.init({
    appId: "animator",
    apiVersion: SOLVER_APP_BRIDGE_API_VERSION,
    requestedCapabilities: ["causalRoots", "delayedHits"],
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
  assert(initResponse.status.code === "ok", "expected bridge init status ok");
  assert(initResponse.capabilities.wasmModuleFactory === true, "expected Wasm-backed bridge capability");
  assert(initResponse.capabilities.abiInfo?.rootRowF64Bytes === 176, "expected root row ABI size");
  assert(
    initResponse.capabilities.abiInfo?.movingCircularRootRowF64Bytes === 232,
    "expected moving-circular root row ABI size"
  );
  assert(
    initResponse.capabilities.abiInfo?.movingCircularObserverFieldContributionF64Bytes === 200,
    "expected moving-circular observer-field contribution ABI size"
  );
  assert(
    initResponse.capabilities.abiInfo?.movingCircularObserverFieldSummaryF64Bytes === 144,
    "expected moving-circular observer-field summary ABI size"
  );

  const rootsResponse = await client.solveCausalRootsF64(fixtureRequest.request);
  assert(rootsResponse.status.code === "ok", "expected causal root status ok");
  assert(rootsResponse.roots.length === 1, "expected one causal root");
  assert(
    Math.abs(rootsResponse.roots[0].emissionTime) <= 1e-10 &&
      Math.abs(rootsResponse.roots[0].distance - 10) <= 1e-10,
    "expected bridged causal root values"
  );

  const movingResponse = await client.solveMovingCircularSourceCausalRootsF64({
    source: {
      centerAtEpoch: { x: -2, y: 0, z: 0 },
      centerVelocity: { x: 0.5, y: 0, z: 0 },
      radiusU: { x: 0, y: 0, z: 0 },
      radiusV: { x: 0, y: 0, z: 0 },
      angularVelocity: 1,
      phaseAtEpoch: 0,
      epochTime: 0,
      errorBound: 1e-13,
    },
    receiver: {
      startTime: 0,
      endTime: 10,
      positionAtStart: { x: 10, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      errorBound: 1e-13,
    },
    hitTime: 10,
    signalSpeed: 1,
    sourceStartTime: -6,
    sourceEndTime: 10,
    rootTolerance: 1e-12,
    maxIterations: 96,
    scanSubdivisions: 128,
    maxRoots: 16,
  });
  assert(
    movingResponse.rowProductionOwner === "native_wasm_c_abi",
    "expected moving-circular roots from native WASM row production"
  );
  assert(movingResponse.roots.length > 0, "expected at least one moving-circular root");
  assert(
    Number.isFinite(movingResponse.roots[0].sourceVelocity?.x) &&
      Number.isFinite(movingResponse.roots[0].sourcePhase?.rawRadians),
    "expected native moving-circular velocity and phase rows"
  );
  const observerFieldResponse = await client.computeMovingCircularObserverFieldF64({
    signalSpeed: 1,
    branches: [
      {
        chargeSign: 1,
        direction: { x: 1, y: 0, z: 0 },
        sourceVelocity: { x: 0.5, y: 0, z: 0 },
        distance: 14,
        residual: 0,
        delay: 14,
        branchWeight: 2,
        sourceNormalSpeed: 0.5,
        receiverNormalSpeed: 0,
        sourceNormalDenominator: 0.5,
        receiverNormalNumerator: 1,
        receiverNormalCrossingFactor: 1,
        receiverNormalFactor: 2,
        unsignedReceiverNormalFactor: 2,
        receiverNormalStatusCode: 0,
      },
    ],
  });
  assert(
    observerFieldResponse.rowProductionOwner === "native_wasm_c_abi",
    "expected moving-circular observer field from native WASM row production"
  );
  assert(
    Math.abs(observerFieldResponse.electric.x - 2 / (14 * 14)) <= 1e-12 &&
      observerFieldResponse.contributions[0]?.receiverNormalEvidenceStatus === "ok",
    "expected native moving-circular observer-field row values"
  );
} finally {
  await client.dispose();
}

console.log("solver wasm bridge check passed.");

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(rootDir, relativePath), "utf8"));
}

function assertExists(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Expected build artifact not found: ${filePath}`);
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function runChecked(command, commandArgs, options = {}) {
  console.log(`$ ${[command, ...commandArgs].join(" ")}`);
  const result = spawnSync(command, commandArgs, {
    cwd: rootDir,
    stdio: "inherit",
    ...options,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
