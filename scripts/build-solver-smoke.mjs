#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const args = process.argv.slice(2);
const target = args[0] || "all";
const allowedTargets = new Set(["native", "wasm", "all"]);

if (args.includes("--help") || !allowedTargets.has(target)) {
  printUsage(target && !allowedTargets.has(target) ? 2 : 0);
}

const rootDir = process.cwd();
const solverDir = path.join(rootDir, "src", "solver");
const buildRoot = path.join(rootDir, ".tmp", "solver-build");
const emCache = process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache");
const env = {
  ...process.env,
  EM_CACHE: emCache,
};

fs.mkdirSync(buildRoot, { recursive: true });
fs.mkdirSync(emCache, { recursive: true });

runChecked("node", ["scripts/solver-toolchain-preflight.mjs"], { env });
runChecked("node", ["scripts/check-solver-contract-fixtures.mjs"], { env });
runChecked("node", ["scripts/check-solver-geometry-inventory.mjs"], { env });

if (target === "native" || target === "all") {
  configureNative();
  build("native");
  runChecked(path.join(buildRoot, "native", "architrino_solver_assembly_graph_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_assembly_graph_store_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_analytic_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_contract_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_error_budget_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_batch_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_geometry_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_invariant_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_motion_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_numeric_serialization_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_parallel_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_phase_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_precision_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_root_ledger_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_root_transition_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_spacetime_index_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_storage_lifecycle_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_stream_smoke"), [], { env });
  runChecked(path.join(buildRoot, "native", "architrino_solver_work_packet_smoke"), [], { env });
}

if (target === "wasm" || target === "all") {
  configureWasm();
  build("wasm");
  await verifyWasmSmoke();
  runChecked("node", ["scripts/build-solver-package-manifest.mjs", "--write"], { env });
  runChecked("node", ["scripts/build-solver-package-manifest.mjs", "--check"], { env });
  runChecked("node", ["scripts/check-solver-app-bridge.mjs"], { env });
  runChecked("node", ["scripts/check-solver-baseline-sandbox.mjs"], { env });
  runChecked("node", ["scripts/check-solver-migration-parity.mjs"], { env });
}

console.log(`solver smoke build complete: ${target}`);

function printUsage(exitCode) {
  console.log("Usage: node scripts/build-solver-smoke.mjs [native|wasm|all]");
  console.log("  Builds the initial native and/or WebAssembly solver smoke targets.");
  console.log("  EM_CACHE defaults to .tmp/solver-emcache when not set.");
  process.exit(exitCode);
}

function configureNative() {
  runChecked(
    "cmake",
    [
      "-S",
      solverDir,
      "-B",
      path.join(buildRoot, "native"),
      "-G",
      "Ninja",
      "-DCMAKE_BUILD_TYPE=Debug",
      "-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/llvm/bin/clang++",
      "-DARCHITRINO_SOLVER_BOOST_INCLUDE_DIR=/opt/homebrew/opt/boost/include",
    ],
    { env }
  );
}

function configureWasm() {
  runChecked(
    "emcmake",
    [
      "cmake",
      "-S",
      solverDir,
      "-B",
      path.join(buildRoot, "wasm"),
      "-G",
      "Ninja",
      "-DCMAKE_BUILD_TYPE=Release",
      "-DARCHITRINO_SOLVER_BUILD_WASM=ON",
      "-DARCHITRINO_SOLVER_BOOST_INCLUDE_DIR=/opt/homebrew/opt/boost/include",
    ],
    { env }
  );
}

function build(name) {
  runChecked("cmake", ["--build", path.join(buildRoot, name)], { env });
}

function assertExists(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Expected build artifact not found: ${filePath}`);
    process.exit(1);
  }
}

async function verifyWasmSmoke() {
  const wasmDir = path.join(buildRoot, "wasm");
  const jsPath = path.join(wasmDir, "architrino_solver_wasm_smoke.mjs");
  const wasmPath = path.join(wasmDir, "architrino_solver_wasm_smoke.wasm");
  assertExists(jsPath);
  assertExists(wasmPath);

  const { default: createModule } = await import(pathToFileURL(jsPath).href);
  const module = await createModule({
    locateFile: (fileName) => path.join(wasmDir, fileName),
  });
  const smokeNames = [
    "architrino_solver_smoke",
    "architrino_solver_contract_smoke",
    "architrino_solver_root_smoke",
  ];
  for (const smokeName of smokeNames) {
    const smoke = module.cwrap(smokeName, "number", []);
    const status = smoke();
    if (status !== 0) {
      console.error(`WebAssembly ${smokeName} call failed with status ${status}`);
      process.exit(1);
    }
  }
  console.log("WebAssembly smoke calls passed.");
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
