#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "static-response-vector-mock.json");
const RESPONSE_KEYS = ["n", "chi", "lambda", "R"];
const PRESSURE_DELTA_ALIASES = {
  n: ["delta_ln_n"],
  chi: ["delta_ln_chi_sea", "delta_ln_chi"],
  lambda: ["delta_ln_lambda"],
  R: ["delta_ln_R", "delta_ln_R_core"],
};

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
Pressure bridges can also replay b . delta_g = delta ln Gamma_N after isotropic projection.
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

function optionalNumberOrNull(value, label) {
  return value === undefined ? null : finiteNumber(value, label);
}

function firstDefinedByAliases(object, aliases) {
  if (!object || typeof object !== "object" || Array.isArray(object)) {
    return undefined;
  }
  return aliases.find((alias) => Object.prototype.hasOwnProperty.call(object, alias));
}

function responseCoefficient(response, key) {
  return finiteNumber(response[`a_${key}`], `response.a_${key}`);
}

function pressureBridgeDeltas(bridge) {
  const source = bridge.response_deltas ?? bridge.deltas ?? {};
  return Object.fromEntries(
    RESPONSE_KEYS.map((key) => {
      const alias = firstDefinedByAliases(source, PRESSURE_DELTA_ALIASES[key]);
      return [key, alias === undefined ? 0 : finiteNumber(source[alias], `pressure_bridge.response_deltas.${alias}`)];
    }),
  );
}

function pressureObservedDeltas(bridge) {
  const source = bridge.observed_deltas ?? bridge.response_deltas ?? bridge.deltas ?? {};
  return {
    delta_ln_chi_sea: optionalNumberOrNull(source.delta_ln_chi_sea ?? source.delta_ln_chi, "pressure_bridge.observed_deltas.delta_ln_chi_sea"),
    delta_ln_c_eff_over_c_f: optionalNumberOrNull(
      source.delta_ln_c_eff_over_c_f,
      "pressure_bridge.observed_deltas.delta_ln_c_eff_over_c_f",
    ),
  };
}

function pressureDeltaGamma(bridge) {
  return finiteNumber(
    bridge.delta_ln_Gamma_N ?? bridge.observed_deltas?.delta_ln_Gamma_N,
    "pressure_bridge.delta_ln_Gamma_N",
  );
}

function pressureNormalizer(bridge) {
  const mode = bridge.derive_response ?? "gamma_normalized";
  if (mode !== "gamma_normalized") {
    throw new Error(`Unsupported pressure_bridge.derive_response: ${mode}`);
  }
  const normalizer = pressureDeltaGamma(bridge);
  if (normalizer === 0) {
    throw new Error("pressure_bridge.delta_ln_Gamma_N must be nonzero for gamma_normalized response derivation.");
  }
  return normalizer;
}

function responseFromPressureBridge(bridge) {
  const normalizer = pressureNormalizer(bridge);
  const deltas = pressureBridgeDeltas(bridge);
  return Object.fromEntries(RESPONSE_KEYS.map((key) => [`a_${key}`, deltas[key] / normalizer]));
}

function scenarioResponse(scenario) {
  if (scenario.response !== undefined) {
    return scenario.response;
  }
  if (scenario.pressure_bridge !== undefined) {
    return responseFromPressureBridge(scenario.pressure_bridge);
  }
  throw new Error("scenario must define response or pressure_bridge.");
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

function dotDeltas(rowReader, row, deltas) {
  return RESPONSE_KEYS.reduce((sum, key) => sum + rowReader(row, key) * deltas[key], 0);
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

function evaluateGammaSweep(scenario, response, tolerance) {
  if (!Array.isArray(scenario.gamma_eff_sweep)) {
    return null;
  }
  const aChi = responseCoefficient(response, "chi");
  return scenario.gamma_eff_sweep.map((gammaEff, index) => {
    const gamma = finiteNumber(gammaEff, `gamma_eff_sweep[${index}]`);
    const aChiSig = 1 + gamma;
    const delta = aChi - aChiSig;
    return {
      gamma_eff: gamma,
      a_chi_sig: aChiSig,
      delta_chi_clk_sig: delta,
      shared_delay_pass: residualPass(delta, tolerance),
    };
  });
}

function evaluatePressureBridge(scenario, tolerance) {
  const bridge = scenario.pressure_bridge;
  if (bridge === undefined) {
    return null;
  }

  const deltas = pressureBridgeDeltas(bridge);
  const observed = pressureObservedDeltas(bridge);
  const deltaGamma = pressureDeltaGamma(bridge);
  const pressureCoordinate = optionalNumberOrNull(bridge.pressure_coordinate, "pressure_bridge.pressure_coordinate");
  const anisotropicCoordinate = optionalNumberOrNull(bridge.anisotropic_coordinate, "pressure_bridge.anisotropic_coordinate");
  const cadenceSum = scenario.cadence_row === undefined ? null : dotDeltas(cadenceCoefficient, scenario.cadence_row, deltas);
  const cadenceResidual = cadenceSum === null ? null : cadenceSum - deltaGamma;
  const cadencePass = cadenceResidual === null ? true : residualPass(cadenceResidual, tolerance);
  const clockRateSum =
    scenario.clock_rate_row === undefined ? null : dotDeltas(clockRateCoefficient, scenario.clock_rate_row, deltas);
  const clockRateResidual = clockRateSum === null ? null : clockRateSum + deltaGamma;
  const clockRatePass = clockRateResidual === null ? true : residualPass(clockRateResidual, tolerance);
  const speedIdentityResidual =
    observed.delta_ln_chi_sea === null || observed.delta_ln_c_eff_over_c_f === null
      ? null
      : observed.delta_ln_chi_sea + observed.delta_ln_c_eff_over_c_f;
  const speedIdentityPass = speedIdentityResidual === null ? true : residualPass(speedIdentityResidual, tolerance);
  const slopes =
    pressureCoordinate === null || pressureCoordinate === 0
      ? null
      : {
          delta_ln_Gamma_N: deltaGamma / pressureCoordinate,
          delta_ln_n: deltas.n / pressureCoordinate,
          delta_ln_chi_sea: deltas.chi / pressureCoordinate,
          delta_ln_lambda: deltas.lambda / pressureCoordinate,
          delta_ln_R: deltas.R / pressureCoordinate,
        };

  return {
    source: bridge.source ?? null,
    projection: bridge.projection ?? "isotropic_static",
    material_id: bridge.material_id ?? null,
    step: bridge.step ?? null,
    pressure_coordinate: pressureCoordinate,
    anisotropic_coordinate: anisotropicCoordinate,
    delta_ln_Gamma_N: deltaGamma,
    response_deltas: deltas,
    pressure_coordinate_slopes: slopes,
    cadence_prediction_sum: cadenceSum,
    cadence_prediction_residual: cadenceResidual,
    cadence_prediction_pass: cadencePass,
    clock_rate_prediction_sum: clockRateSum,
    clock_rate_prediction_residual: clockRateResidual,
    clock_rate_prediction_pass: clockRatePass,
    effective_speed_identity_residual: speedIdentityResidual,
    effective_speed_identity_pass: speedIdentityPass,
    anisotropic_residuals: bridge.anisotropic_residuals ?? null,
  };
}

function evaluateScenario(packet, scenario) {
  const tolerance = scenarioTolerance(packet, scenario);
  const gammaEff = finiteNumber(scenario.gamma_eff, "gamma_eff");
  const response = scenarioResponse(scenario);
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
  const gammaSweep = evaluateGammaSweep(scenario, response, tolerance);
  const pressureBridge = evaluatePressureBridge(scenario, tolerance);
  const pressureBridgePass =
    pressureBridge === null
      ? true
      : pressureBridge.cadence_prediction_pass &&
        pressureBridge.clock_rate_prediction_pass &&
        pressureBridge.effective_speed_identity_pass;
  const status =
    endpointPass && clockRatePass && rowInversePass && sharedDelayExpectationPass && pressureBridgePass
      ? "pass"
      : "fail";

  return {
    name: scenario.name,
    status,
    tolerance,
    diagnostics: {
      response_origin: scenario.response === undefined ? "pressure_bridge_gamma_normalized" : "declared",
      response,
      a_chi_sig: aChiSig,
      delta_chi_clk_sig: deltaChiClkSig,
      shared_delay_pass: sharedDelayPass,
      gamma_eff_sweep: gammaSweep,
      endpoint_sum: endpointSum,
      endpoint_residual: endpointResidual,
      endpoint_pass: endpointPass,
      clock_rate_sum: clockRateSum,
      clock_rate_residual: clockRateResidual,
      clock_rate_pass: clockRatePass,
      row_inverse_residuals: inverseResiduals,
      row_inverse_max_residual: rowInverseMaxResidual,
      row_inverse_pass: rowInversePass,
      pressure_bridge: pressureBridge,
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
