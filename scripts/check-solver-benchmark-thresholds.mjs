#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const CASE_NAME = "emission-shell-broad-phase-v0";
const DEFAULT_REPORT_PATH = path.join(
  process.cwd(),
  ".tmp",
  "solver-build",
  "benchmark",
  "solver-benchmark-report.json"
);

const options = parseArgs(process.argv.slice(2));

if (options.help) {
  printUsage(0);
}

const reportPath = path.resolve(options.reportPath ?? DEFAULT_REPORT_PATH);
let report;
try {
  report = readReport(reportPath);
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
const checks = [];
const failures = [];

check("report schema", report.schema, "solver-benchmark-report.v1", (value) => value === "solver-benchmark-report.v1");
check("report status", report.status, "ok", (value) => value === "ok");
check("case count", report.caseCount, "at least 1", (value) => finiteNumber(value) && value >= 1);
check("cases array", report.cases?.length, "matches caseCount", (value) => finiteNumber(value) && value === report.caseCount);

const benchmarkCase = Array.isArray(report.cases)
  ? report.cases.find((candidate) => candidate?.name === CASE_NAME)
  : null;

check("target benchmark case", benchmarkCase?.name ?? null, CASE_NAME, (value) => value === CASE_NAME);

if (benchmarkCase) {
  const metrics = benchmarkCase.metrics ?? {};
  const metric = (name) => metrics[name];

  check("strategy", benchmarkCase.strategy, "interval-time-slab-spatial-hash-emission-shell-annulus-v0", (value) =>
    value === "interval-time-slab-spatial-hash-emission-shell-annulus-v0"
  );
  check("operations", benchmarkCase.operations, ">= 5000000 brute-force replay pairs", (value) =>
    finiteNumber(value) && value >= 5_000_000
  );
  check("observations", benchmarkCase.observations, "equals indexed_candidates", (value) =>
    finiteNumber(value) && value === metric("indexed_candidates")
  );
  check("scenario_count", metric("scenario_count"), ">= 5", atLeast(5));
  check("path_count_min", metric("path_count_min"), "<= 16", atMost(16));
  check("path_count_max", metric("path_count_max"), ">= 2048", atLeast(2048));
  check("time_slab_min", metric("time_slab_min"), "<= 32", atMost(32));
  check("time_slab_max", metric("time_slab_max"), ">= 256", atLeast(256));
  check("speed_regime_count", metric("speed_regime_count"), ">= 5", atLeast(5));
  check("density_case_count", metric("density_case_count"), ">= 3", atLeast(3));
  check("same_source_enabled", metric("same_source_enabled"), "1", equalsNumber(1));
  check("all_to_all_enabled", metric("all_to_all_enabled"), "1", equalsNumber(1));
  check("oracle_replay_sweeps", metric("oracle_replay_sweeps"), ">= scenario_count", (value) =>
    finiteNumber(value) && finiteNumber(metric("scenario_count")) && value >= metric("scenario_count")
  );

  check("brute_force_pairs", metric("brute_force_pairs"), "matches operations and >= 5000000", (value) =>
    finiteNumber(value) && value === benchmarkCase.operations && value >= 5_000_000
  );
  check("brute_force_candidates", metric("brute_force_candidates"), "equals indexed_candidates", (value) =>
    finiteNumber(value) && value === metric("indexed_candidates")
  );
  check("indexed_candidates", metric("indexed_candidates"), ">= 20000", atLeast(20_000));
  check("indexed_pair_tests", metric("indexed_pair_tests"), "> 0 and < brute_force_pairs", (value) =>
    finiteNumber(value) && value > 0 && value < metric("brute_force_pairs")
  );
  check("missing_oracle_candidates", metric("missing_oracle_candidates"), "0", equalsNumber(0));
  check("extra_indexed_candidates", metric("extra_indexed_candidates"), "0", equalsNumber(0));
  check("broad_phase_recall", metric("broad_phase_recall"), ">= 1.0", atLeast(1.0));
  check("candidate_count_reduction", metric("candidate_count_reduction"), ">= 0.995", atLeast(0.995));
  check("indexed_pair_test_reduction", metric("indexed_pair_test_reduction"), ">= 0.93", atLeast(0.93));
  check("narrow_phase_hits", metric("narrow_phase_hits"), ">= 16000", atLeast(16_000));
  check("false_positive_ratio", metric("false_positive_ratio"), "<= 0.35", atMost(0.35));

  check("same_source_candidate_count", metric("same_source_candidate_count"), "> 0", greaterThan(0));
  check("transition_candidate_count", metric("transition_candidate_count"), ">= 8000", atLeast(8_000));
  check("receiver_cell_rows", metric("receiver_cell_rows"), "> 0", greaterThan(0));
  check("shell_annulus_rows", metric("shell_annulus_rows"), "> 0", greaterThan(0));
  check("cell_lookups", metric("cell_lookups"), "> 0", greaterThan(0));
  check("chunk_replay_rows", metric("chunk_replay_rows"), ">= 6000", atLeast(6000));
  check("chunk_replay_bytes", metric("chunk_replay_bytes"), ">= 650000", atLeast(650000));

  check("work_packet_count", metric("work_packet_count"), ">= 20", atLeast(20));
  check("work_packet_candidate_count", metric("work_packet_candidate_count"), "equals indexed_candidates", (value) =>
    finiteNumber(value) && value === metric("indexed_candidates")
  );
  check("work_packet_header_checksum_count", metric("work_packet_header_checksum_count"), "equals work_packet_count", (value) =>
    finiteNumber(value) && value === metric("work_packet_count")
  );
  check("work_packet_missing_candidates", metric("work_packet_missing_candidates"), "0", equalsNumber(0));
  check("work_packet_extra_candidates", metric("work_packet_extra_candidates"), "0", equalsNumber(0));
  check("work_packet_merge_order_mismatches", metric("work_packet_merge_order_mismatches"), "0", equalsNumber(0));
}

if (failures.length > 0) {
  console.error(`solver benchmark thresholds=failed case=${CASE_NAME} report=${path.relative(process.cwd(), reportPath)}`);
  for (const failure of failures) {
    console.error(`- ${failure.label}: got ${formatValue(failure.actual)}, expected ${failure.expected}`);
  }
  process.exit(1);
}

console.log(
  `solver benchmark thresholds=ok case=${CASE_NAME} checks=${checks.length} report=${path.relative(
    process.cwd(),
    reportPath
  )}`
);

function parseArgs(rawArgs) {
  const parsed = {
    help: false,
    reportPath: undefined,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
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

function readReport(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    throw new Error(`failed to read benchmark report ${filePath}: ${error.message}`);
  }
}

function check(label, actual, expected, predicate) {
  checks.push(label);
  if (!predicate(actual)) {
    failures.push({ label, actual, expected });
  }
}

function finiteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function atLeast(threshold) {
  return (value) => finiteNumber(value) && value >= threshold;
}

function atMost(threshold) {
  return (value) => finiteNumber(value) && value <= threshold;
}

function greaterThan(threshold) {
  return (value) => finiteNumber(value) && value > threshold;
}

function equalsNumber(expected) {
  return (value) => finiteNumber(value) && value === expected;
}

function formatValue(value) {
  if (value === undefined) {
    return "undefined";
  }
  return JSON.stringify(value);
}

function printUsage(exitCode) {
  console.log("Usage: node scripts/check-solver-benchmark-thresholds.mjs [--report <path>]");
  console.log("  Enforces non-wall-clock acceptance thresholds for solver benchmark report cases.");
  console.log("  Defaults to .tmp/solver-build/benchmark/solver-benchmark-report.json.");
  process.exit(exitCode);
}
