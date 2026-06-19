#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const solverDir = path.join(rootDir, "src", "solver");
const buildDir = path.join(rootDir, ".tmp", "solver-build", "precision-dynamic-range");
const executable = path.join(buildDir, "architrino_solver_precision_dynamic_range_smoke");
const emCache = process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache");
const env = {
  ...process.env,
  EM_CACHE: emCache,
};

fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(emCache, { recursive: true });

runChecked("node", ["scripts/solver-toolchain-preflight.mjs"], { env });
runChecked(
  "cmake",
  [
    "-S",
    solverDir,
    "-B",
    buildDir,
    "-G",
    "Ninja",
    "-DCMAKE_BUILD_TYPE=Debug",
    "-DCMAKE_CXX_COMPILER=/opt/homebrew/opt/llvm/bin/clang++",
    "-DARCHITRINO_SOLVER_BOOST_INCLUDE_DIR=/opt/homebrew/opt/boost/include",
  ],
  { env }
);
runChecked("cmake", ["--build", buildDir, "--target", "architrino_solver_precision_dynamic_range_smoke"], {
  env,
});
runChecked(executable, [], { env });

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
