#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const options = parseArgs(args);

if (options.help) {
  printUsage(0);
}

const rootDir = process.cwd();
const solverDir = path.join(rootDir, "src", "solver");
const buildDir = path.join(rootDir, ".tmp", "solver-build", "benchmark");
const benchmarkExecutable = path.join(buildDir, "architrino_solver_benchmark");
const reportPath = options.writeReport
  ? path.resolve(options.reportPath ?? path.join(buildDir, "solver-benchmark-report.json"))
  : null;
const emCache = process.env.EM_CACHE || path.join(rootDir, ".tmp", "solver-emcache");
const env = {
  ...process.env,
  EM_CACHE: emCache,
};

fs.mkdirSync(buildDir, { recursive: true });
fs.mkdirSync(emCache, { recursive: true });

if (!options.skipPreflight) {
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
const benchmarkOutput = runCaptured(benchmarkExecutable, [], { env });
if (reportPath) {
  const report = createBenchmarkReport(benchmarkOutput, {
    rootDir,
    buildDir,
    benchmarkExecutable,
    emCache,
  });
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`wrote ${path.relative(rootDir, reportPath)}`);
  if (!options.skipThresholds) {
    runChecked("node", ["scripts/check-solver-benchmark-thresholds.mjs", "--report", reportPath], { env });
  }
}

function parseArgs(rawArgs) {
  const parsed = {
    help: false,
    skipPreflight: false,
    skipThresholds: false,
    writeReport: true,
    reportPath: undefined,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--skip-preflight") {
      parsed.skipPreflight = true;
    } else if (arg === "--skip-thresholds") {
      parsed.skipThresholds = true;
    } else if (arg === "--no-report") {
      parsed.writeReport = false;
    } else if (arg === "--report") {
      const nextValue = rawArgs[index + 1];
      if (!nextValue || nextValue.startsWith("--")) {
        console.error("--report requires a path");
        printUsage(2);
      }
      parsed.reportPath = nextValue;
      index += 1;
    } else if (arg.startsWith("--report=")) {
      const reportPathValue = arg.slice("--report=".length);
      if (!reportPathValue) {
        console.error("--report requires a path");
        printUsage(2);
      }
      parsed.reportPath = reportPathValue;
    } else {
      console.error(`Unknown argument: ${arg}`);
      printUsage(2);
    }
  }
  return parsed;
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

function runCaptured(command, commandArgs, options = {}) {
  console.log(`$ ${[command, ...commandArgs].join(" ")}`);
  const result = spawnSync(command, commandArgs, {
    cwd: rootDir,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
    ...options,
  });
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
  return result.stdout ?? "";
}

function createBenchmarkReport(output, context) {
  const cases = [];
  let status = "unknown";
  let reportedCaseCount = null;
  for (const line of output.split(/\r?\n/u)) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }
    if (trimmed.startsWith("benchmark name=")) {
      cases.push(parseBenchmarkLine(trimmed));
    } else if (trimmed.startsWith("solver benchmark=")) {
      const fields = parseKeyValueLine(trimmed);
      status = fields.benchmark ?? "unknown";
      reportedCaseCount = numberField(fields, "cases", trimmed);
    }
  }
  if (status !== "ok") {
    throw new Error(`benchmark did not report ok status: ${status}`);
  }
  if (reportedCaseCount !== cases.length) {
    throw new Error(`benchmark case count mismatch: reported ${reportedCaseCount}, parsed ${cases.length}`);
  }
  return {
    schema: "solver-benchmark-report.v1",
    tool: "scripts/benchmark-solver.mjs",
    buildType: "Release",
    buildDir: path.relative(context.rootDir, context.buildDir),
    executable: path.relative(context.rootDir, context.benchmarkExecutable),
    generatedAt: new Date().toISOString(),
    runtime: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
    },
    hardware: {
      osType: os.type(),
      osRelease: os.release(),
      cpuCount: os.cpus().length,
      totalMemoryBytes: os.totalmem(),
    },
    environment: {
      emCache: path.relative(context.rootDir, context.emCache),
    },
    status,
    caseCount: cases.length,
    cases,
  };
}

function parseBenchmarkLine(line) {
  const fields = parseKeyValueLine(line);
  const reservedKeys = new Set([
    "name",
    "operations",
    "observations",
    "elapsed_ms",
    "ops_per_sec",
    "checksum",
    "strategy",
  ]);
  const metrics = {};
  for (const [key, value] of Object.entries(fields)) {
    if (!reservedKeys.has(key)) {
      metrics[key] = numericValue(value, key, line);
    }
  }
  return {
    name: stringField(fields, "name", line),
    operations: numberField(fields, "operations", line),
    observations: numberField(fields, "observations", line),
    elapsedMs: numberField(fields, "elapsed_ms", line),
    operationsPerSecond: numberField(fields, "ops_per_sec", line),
    checksum: numberField(fields, "checksum", line),
    strategy: fields.strategy,
    metrics,
  };
}

function parseKeyValueLine(line) {
  const fields = {};
  for (const token of line.split(/\s+/u)) {
    const separatorIndex = token.indexOf("=");
    if (separatorIndex <= 0) {
      continue;
    }
    fields[token.slice(0, separatorIndex)] = token.slice(separatorIndex + 1);
  }
  return fields;
}

function stringField(fields, key, line) {
  const value = fields[key];
  if (!value) {
    throw new Error(`benchmark line missing ${key}: ${line}`);
  }
  return value;
}

function numberField(fields, key, line) {
  return numericValue(stringField(fields, key, line), key, line);
}

function numericValue(value, key, line) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`benchmark field ${key} is not finite: ${line}`);
  }
  return number;
}

function printUsage(exitCode) {
  console.log(
    "Usage: node scripts/benchmark-solver.mjs [--skip-preflight] [--skip-thresholds] [--report <path>] [--no-report]"
  );
  console.log("  Builds and runs the native Release solver benchmark target.");
  console.log("  Writes a structured benchmark report to .tmp/solver-build/benchmark/solver-benchmark-report.json by default.");
  console.log("  The benchmark checks result sanity and non-wall-clock acceptance thresholds.");
  process.exit(exitCode);
}
