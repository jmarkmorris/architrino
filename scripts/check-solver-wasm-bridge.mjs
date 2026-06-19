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
  assert(initResponse.capabilities.abiInfo?.rootRowF64Bytes === 112, "expected root row ABI size");

  const rootsResponse = await client.solveCausalRootsF64(fixtureRequest.request);
  assert(rootsResponse.status.code === "ok", "expected causal root status ok");
  assert(rootsResponse.roots.length === 1, "expected one causal root");
  assert(
    Math.abs(rootsResponse.roots[0].emissionTime) <= 1e-10 &&
      Math.abs(rootsResponse.roots[0].distance - 10) <= 1e-10,
    "expected bridged causal root values"
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
