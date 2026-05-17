#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "static-response-vector-mock.json");
const RESPONSE_KEYS = ["n", "chi", "lambda", "R"];

function parseArgs(argv) {
  const args = {
    input: DEFAULT_INPUT_PATH,
    out: null,
    pretty: false,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--input") {
      args.input = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/spacetime/static-response-vector-toy-model.mjs [options]

Options:
  --input PATH  Static-response-vector packet. Defaults to scripts/spacetime/static-response-vector-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This replays the first-order weak static response constraints:
  a_chi_sig = 1 + gamma_eff
  b_n a_n + b_chi a_chi + b_lambda a_lambda + b_R a_R = 1
  omega_n a_n + omega_chi a_chi + omega_lambda a_lambda + omega_R a_R = -1
It is a fixture for Gamma_N closure arithmetic, not an empirical PPN fitter.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function optionalFiniteNumber(value, label, fallback = 0) {
  return value === undefined ? fallback : finiteNumber(value, label);
}

function responseCoefficient(response, key) {
  return finiteNumber(response[`a_${key}`], `response.a_${key}`);
}

function cadenceCoefficient(row, key) {
  return optionalFiniteNumber(row?.[`b_${key}`], `cadence_row.b_${key}`);
}

function clockRateCoefficient(row, key) {
  return optionalFiniteNumber(row?.[`omega_${key}`], `clock_rate_row.omega_${key}`);
}

function dotResponse(rowReader, row, response) {
  return RESPONSE_KEYS.reduce(
    (sum, key) => sum + rowReader(row, key) * responseCoefficient(response, key),
    0,
  );
}

function residualPass(value, tolerance) {
  return Math.abs(value) <= tolerance;
}

function rowInverseResiduals(cadenceRow, clockRateRow) {
  if (cadenceRow === undefined || clockRateRow === undefined) {
    return null;
  }
  return Object.fromEntries(
    RESPONSE_KEYS.map((key) => [
      key,
      cadenceCoefficient(cadenceRow, key) + clockRateCoefficient(clockRateRow, key),
    ]),
  );
}

function maxAbsResidual(record) {
  if (record === null) {
    return 0;
  }
  return Math.max(...Object.values(record).map((value) => Math.abs(value)));
}

function scenarioTolerance(packet, scenario) {
  return finiteNumber(scenario.tolerance ?? packet.defaults?.tolerance ?? 1e-9, "tolerance");
}

function evaluateScenario(packet, scenario) {
  const tolerance = scenarioTolerance(packet, scenario);
  const gammaEff = finiteNumber(scenario.gamma_eff, "gamma_eff");
  const response = scenario.response;
  if (!response || typeof response !== "object" || Array.isArray(response)) {
    throw new Error("response must be an object.");
  }

  const aChi = responseCoefficient(response, "chi");
  const aChiSig = 1 + gammaEff;
  const deltaChiClkSig = aChi - aChiSig;
  const sharedDelayPass = residualPass(deltaChiClkSig, tolerance);
  const expectedSharedDelay = scenario.expect_shared_delay !== false;
  const sharedDelayExpectationPass = expectedSharedDelay ? sharedDelayPass : true;

  let endpointSum = null;
  let endpointResidual = null;
  let endpointPass = true;
  if (scenario.cadence_row !== undefined) {
    endpointSum = dotResponse(cadenceCoefficient, scenario.cadence_row, response);
    endpointResidual = endpointSum - 1;
    endpointPass = residualPass(endpointResidual, tolerance);
  }

  let clockRateSum = null;
  let clockRateResidual = null;
  let clockRatePass = true;
  if (scenario.clock_rate_row !== undefined) {
    clockRateSum = dotResponse(clockRateCoefficient, scenario.clock_rate_row, response);
    clockRateResidual = clockRateSum + 1;
    clockRatePass = residualPass(clockRateResidual, tolerance);
  }

  const inverseResiduals = rowInverseResiduals(scenario.cadence_row, scenario.clock_rate_row);
  const rowInverseMaxResidual = maxAbsResidual(inverseResiduals);
  const rowInversePass = residualPass(rowInverseMaxResidual, tolerance);
  const status =
    endpointPass && clockRatePass && rowInversePass && sharedDelayExpectationPass
      ? "pass"
      : "fail";

  return {
    name: scenario.name,
    status,
    tolerance,
    diagnostics: {
      a_chi_sig: aChiSig,
      delta_chi_clk_sig: deltaChiClkSig,
      shared_delay_pass: sharedDelayPass,
      endpoint_sum: endpointSum,
      endpoint_residual: endpointResidual,
      endpoint_pass: endpointPass,
      clock_rate_sum: clockRateSum,
      clock_rate_residual: clockRateResidual,
      clock_rate_pass: clockRatePass,
      row_inverse_residuals: inverseResiduals,
      row_inverse_max_residual: rowInverseMaxResidual,
      row_inverse_pass: rowInversePass,
    },
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const packet = readJson(args.input);
  if (!Array.isArray(packet.scenarios)) {
    throw new Error("Input packet must define scenarios as an array.");
  }

  const results = {
    schema: "aaa-static-response-vector-toy-output/v1",
    input_schema: packet.schema,
    diagnostics: {
      scenario_count: packet.scenarios.length,
      pass_count: 0,
      fail_count: 0,
    },
    results: packet.scenarios.map((scenario) => evaluateScenario(packet, scenario)),
  };

  results.diagnostics.pass_count = results.results.filter((result) => result.status === "pass").length;
  results.diagnostics.fail_count = results.results.length - results.diagnostics.pass_count;

  const output = JSON.stringify(results, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${output}\n`);
  } else {
    console.log(output);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
