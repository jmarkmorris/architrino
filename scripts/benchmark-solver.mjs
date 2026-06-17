#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const allowedArgs = new Set(["--help", "--skip-preflight"]);
const unknownArgs = args.filter((arg) => !allowedArgs.has(arg));

if (args.includes("--help")) {
  printUsage(0);
}
if (unknownArgs.length > 0) {
  console.error(`Unknown argument(s): ${unknownArgs.join(", ")}`);
  printUsage(2);
}

const rootDir = process.cwd();
const solverDir = path.join(rootDir, "src", "solver");
const buildDir = path.join(rootDir, ".tmp", "solver-build", "benchmark");
const emCache = process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache");
const env = {
  ...process.env,
  EM_CACHE: emCache,
};

fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(emCache, { recursive: true });

if (!args.includes("--skip-preflight")) {
  runChecked("node", ["scripts/solver-toolchain-preflight.mjs"], { env });
}

runChecked(
  "cmake",
  [
    "-S",
    solverDir,
    "-B",
    buildDir,
    "-G",
    "Ninja",
    "-DCMAKE_BUILD_TYPE=Release",
    "-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/llvm/bin/clang++",
    "-DARCHITRINO_SOLVER_BOOST_INCLUDE_DIR=/opt/homebrew/opt/boost/include",
  ],
  { env }
);
runChecked("cmake", ["--build", buildDir, "--target", "architrino_solver_benchmark"], { env });
runChecked(path.join(buildDir, "architrino_solver_benchmark"), [], { env });

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

function printUsage(exitCode) {
  console.log("Usage: node scripts/benchmark-solver.mjs [--skip-preflight]");
  console.log("  Builds and runs the native Release solver benchmark target.");
  console.log("  The benchmark checks result sanity but does not enforce wall-clock thresholds.");
  process.exit(exitCode);
}
