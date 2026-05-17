#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(
  SCRIPT_DIR,
  "fixtures",
  "earth-core-iron-replay.mock.json"
);
const VECTOR3_LENGTH = 3;

const DEFAULT_THRESHOLDS = {
  source_abs_max: 0,
  segregation_residual_abs_max: 1e-12,
  phase_positive_abs_max: 0,
  gamma_residual_abs_max: 1e-12,
  transport_excess_abs_max: 0,
  null_residual_abs_max: 1e-9,
  Q_max: 1e-18,
};

const DEFAULT_EPSILONS = {
  S: 1,
  J: 1,
  G: 1,
  Gamma: 1,
  tr: 1,
};

const DEFAULT_WEIGHTS = {
  S: 1,
  J: 1,
  G: 1,
  Gamma: 1,
  tr: 1,
};

const NULL_KEYS = ["R_biref", "R_gamma_disp", "R_LV", "R_clksig", "R_tr"];

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
  console.log(`Usage: node scripts/mass-map/earth-core-iron-replay.mjs [options]

Options:
  --input PATH  Earth-core iron replay packet. Defaults to scripts/mass-map/fixtures/earth-core-iron-replay.mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This evaluates the Earth-core iron residual scaffold:
  S_Fe_nuc = 0
  J_Fe + D_Fe grad(mu_Fe + M_sh Phi_eff) = 0
  [Delta G_Fe^{metal/silicate}]_+ = 0
  ln Gamma_N - b_N dot g_N = 0
  [R_tr - R_tr,*]_+ = 0
It is a fail-closed fixture for the pressure-response bridge, not empirical
geophysics and not a pressure-created-iron claim.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function asObject(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value;
}

function finiteNumber(value, label) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`${label} must be a finite number.`);
  }
  return number;
}

function nonnegativeNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new Error(`${label} must be nonnegative.`);
  }
  return number;
}

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function numericMap(inputMap, defaults, label, parser = nonnegativeNumber) {
  const raw = { ...defaults, ...(inputMap ?? {}) };
  return Object.fromEntries(
    Object.entries(raw).map(([key, value]) => [key, parser(value, `${label}.${key}`)])
  );
}

function thresholdMap(inputThresholds) {
  return numericMap(inputThresholds, DEFAULT_THRESHOLDS, "thresholds", nonnegativeNumber);
}

function epsilonMap(inputEpsilons) {
  return numericMap(inputEpsilons, DEFAULT_EPSILONS, "epsilons", positiveNumber);
}

function weightMap(inputWeights) {
  return numericMap(inputWeights, DEFAULT_WEIGHTS, "weights", nonnegativeNumber);
}

function vector3(value, label) {
  if (!Array.isArray(value) || value.length !== VECTOR3_LENGTH) {
    throw new Error(`${label} must be a length-3 vector.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function addVectors(a, b) {
  return a.map((entry, index) => entry + b[index]);
}

function scaleVector(vector, scalar) {
  return vector.map((entry) => entry * scalar);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function positivePart(value) {
  return Math.max(0, value);
}

function gate(status, value, threshold, failureCode) {
  return {
    status,
    value,
    threshold,
    failure_code: status === "pass" ? null : failureCode,
  };
}

function sourceValue(guardrail) {
  return finiteNumber(
    guardrail.S_Fe_nuc ?? guardrail.S_Fe_nuc_density ?? guardrail.S_Fe_nuc_per_s ?? 0,
    "inventory_guardrail.S_Fe_nuc"
  );
}

function evaluateInventoryGuardrail(input, thresholds) {
  const guardrail = asObject(input.inventory_guardrail ?? {}, "inventory_guardrail");
  const source = sourceValue(guardrail);
  const failures = [];
  if (guardrail.fixed_inventory !== true) {
    failures.push({
      field: "fixed_inventory",
      value: guardrail.fixed_inventory ?? null,
      failure_code: "source-guardrail-open",
    });
  }
  if (Math.abs(source) > thresholds.source_abs_max) {
    failures.push({
      field: "S_Fe_nuc",
      value: source,
      threshold: thresholds.source_abs_max,
      failure_code: "source-guardrail-open",
    });
  }
  for (const key of ["delta_Z_Fe", "delta_A_Fe"]) {
    const value = finiteNumber(guardrail[key] ?? 0, `inventory_guardrail.${key}`);
    if (value !== 0) {
      failures.push({
        field: key,
        value,
        failure_code: "source-guardrail-open",
      });
    }
  }

  return {
    element: guardrail.element ?? "Fe",
    Z: guardrail.Z ?? null,
    A: guardrail.A ?? null,
    fixed_inventory: guardrail.fixed_inventory === true,
    S_Fe_nuc: source,
    delta_Z_Fe: finiteNumber(guardrail.delta_Z_Fe ?? 0, "inventory_guardrail.delta_Z_Fe"),
    delta_A_Fe: finiteNumber(guardrail.delta_A_Fe ?? 0, "inventory_guardrail.delta_A_Fe"),
    failures,
  };
}

function thetaRecords(input) {
  const records = Array.isArray(input.theta_sea_records) ? input.theta_sea_records : [];
  if (records.length === 0) {
    throw new Error("theta_sea_records must contain at least one record.");
  }
  const map = new Map();
  for (const [index, record] of records.entries()) {
    const theta = asObject(record, `theta_sea_records[${index}]`);
    const id = theta.theta_sea_id ?? theta.id;
    if (typeof id !== "string" || id.length === 0) {
      throw new Error(`theta_sea_records[${index}] must declare theta_sea_id.`);
    }
    if (map.has(id)) {
      throw new Error(`Duplicate theta_sea_id: ${id}`);
    }
    map.set(id, theta);
  }
  return map;
}

function thetaLogGamma(theta, label) {
  if (theta.ln_Gamma_N !== undefined) {
    return finiteNumber(theta.ln_Gamma_N, `${label}.ln_Gamma_N`);
  }
  return Math.log(positiveNumber(theta.Gamma_N, `${label}.Gamma_N`));
}

function thetaGN(theta, label) {
  const g = asObject(theta.g_N, `${label}.g_N`);
  return {
    ln_n: finiteNumber(g.ln_n, `${label}.g_N.ln_n`),
    ln_chi_sea: finiteNumber(g.ln_chi_sea, `${label}.g_N.ln_chi_sea`),
    ln_lambda: finiteNumber(g.ln_lambda, `${label}.g_N.ln_lambda`),
    neg_ln_xi: finiteNumber(g.neg_ln_xi, `${label}.g_N.neg_ln_xi`),
    ln_R_core_ratio: finiteNumber(g.ln_R_core_ratio, `${label}.g_N.ln_R_core_ratio`),
  };
}

function thetaCadenceRow(theta, label) {
  const row = asObject(theta.cadence_row, `${label}.cadence_row`);
  return {
    b_n: finiteNumber(row.b_n ?? 0, `${label}.cadence_row.b_n`),
    b_chi: finiteNumber(row.b_chi ?? 0, `${label}.cadence_row.b_chi`),
    b_lambda: finiteNumber(row.b_lambda ?? 0, `${label}.cadence_row.b_lambda`),
    b_xi: finiteNumber(row.b_xi ?? 0, `${label}.cadence_row.b_xi`),
    b_R: finiteNumber(row.b_R ?? 0, `${label}.cadence_row.b_R`),
  };
}

function cadencePrediction(g, row) {
  return (
    row.b_n * g.ln_n +
    row.b_chi * g.ln_chi_sea +
    row.b_lambda * g.ln_lambda +
    row.b_xi * g.neg_ln_xi +
    row.b_R * g.ln_R_core_ratio
  );
}

function nullResidual(row, label) {
  const bounds = asObject(row.null_bounds ?? {}, `${label}.null_bounds`);
  const entries = Object.fromEntries(
    NULL_KEYS.map((key) => [key, nonnegativeNumber(bounds[key] ?? 0, `${label}.null_bounds.${key}`)])
  );
  return {
    entries,
    R_null_P: Math.max(...Object.values(entries)),
  };
}

function rowId(row, index) {
  return row.row_id ?? `row-${index}`;
}

function evaluateRow(rowInput, index, thetaMap, epsilons, weights) {
  const row = asObject(rowInput, `rows[${index}]`);
  const id = rowId(row, index);
  const thetaId = row.theta_sea_id;
  if (typeof thetaId !== "string" || thetaId.length === 0) {
    throw new Error(`${id}.theta_sea_id must be a nonempty string.`);
  }
  const theta = thetaMap.get(thetaId);
  if (!theta) {
    throw new Error(`${id}.theta_sea_id references missing record ${thetaId}.`);
  }

  const flux = vector3(row.J_Fe, `${id}.J_Fe`);
  const diffusion = finiteNumber(row.D_Fe, `${id}.D_Fe`);
  const gradient = vector3(row.grad_mu_plus_msh_phi_eff, `${id}.grad_mu_plus_msh_phi_eff`);
  const segregationVector = addVectors(flux, scaleVector(gradient, diffusion));
  const segregationResidual = norm(segregationVector);
  const phaseValue = finiteNumber(
    row.delta_G_Fe_metal_silicate,
    `${id}.delta_G_Fe_metal_silicate`
  );
  const phasePositive = positivePart(phaseValue);
  const transmutationClaim = row.delta_G_sea_transmutation_claim === true;
  const Rtr = finiteNumber(row.R_tr, `${id}.R_tr`);
  const RtrStar = finiteNumber(row.R_tr_star, `${id}.R_tr_star`);
  const transportExcess = positivePart(Rtr - RtrStar);
  const gN = thetaGN(theta, `theta_sea_records.${thetaId}`);
  const cadenceRow = thetaCadenceRow(theta, `theta_sea_records.${thetaId}`);
  const lnGamma = thetaLogGamma(theta, `theta_sea_records.${thetaId}`);
  const gammaPrediction = cadencePrediction(gN, cadenceRow);
  const gammaResidual = lnGamma - gammaPrediction;
  const nulls = nullResidual(row, id);

  const components = {
    source: 0,
    segregation: weights.J * (segregationResidual / epsilons.J) ** 2,
    phase: weights.G * (phasePositive / epsilons.G) ** 2,
    gamma: weights.Gamma * (gammaResidual / epsilons.Gamma) ** 2,
    transport: weights.tr * (transportExcess / epsilons.tr) ** 2,
  };
  const Q_row = Object.values(components).reduce((sum, value) => sum + value, 0);

  return {
    row_id: id,
    region: row.region ?? null,
    theta_sea_id: thetaId,
    state: {
      P_GPa: row.P_GPa ?? null,
      T_K: row.T_K ?? null,
      Phi_eff: row.Phi_eff ?? null,
      phase_label: row.phase_label ?? null,
      lattice_branch: row.lattice_branch ?? null,
      N_Fe_density: row.N_Fe_density ?? null,
    },
    segregation: {
      J_Fe: flux,
      D_Fe: diffusion,
      grad_mu_plus_msh_phi_eff: gradient,
      residual_vector: segregationVector,
      residual_norm: segregationResidual,
    },
    phase: {
      delta_G_Fe_metal_silicate: phaseValue,
      positive_part: phasePositive,
      delta_G_sea_transmutation_claim: transmutationClaim,
    },
    cadence: {
      ln_Gamma_N: lnGamma,
      b_N_dot_g_N: gammaPrediction,
      residual: gammaResidual,
      g_N: gN,
      cadence_row: cadenceRow,
    },
    transport: {
      R_tr: Rtr,
      R_tr_star: RtrStar,
      logged_event_channel: row.logged_event_channel ?? null,
      excess: transportExcess,
    },
    null_bounds: nulls,
    Q_components: components,
    Q_row,
  };
}

function sharedThetaGate(input, rows) {
  const ids = [...new Set(rows.map((row) => row.theta_sea_id))];
  const expected = input.shared_theta_sea_id ?? ids[0] ?? null;
  const failures = ids.filter((id) => id !== expected);
  return {
    expected_theta_sea_id: expected,
    observed_theta_sea_ids: ids,
    failures,
  };
}

function maxOf(rows, reader) {
  return Math.max(...rows.map(reader));
}

function sourceQ(inventory, epsilons, weights) {
  return weights.S * (inventory.S_Fe_nuc / epsilons.S) ** 2;
}

function firstFailureCode(gates) {
  const orderedKeys = [
    "source_guardrail",
    "shared_theta_record",
    "hidden_transmutation",
    "segregation_flux",
    "metallic_phase",
    "gamma_row",
    "transport_threshold",
    "null_bounds",
    "Q_packet",
    "failure_injections",
  ];
  for (const key of orderedKeys) {
    if (gates[key]?.status === "fail") {
      return gates[key].failure_code;
    }
  }
  return null;
}

function promotionStatus(gates) {
  const failureCode = firstFailureCode(gates);
  if (failureCode) {
    return {
      promotion_status: "failed",
      failure_code: failureCode,
    };
  }
  return {
    promotion_status: "fixture_pass",
    failure_code: null,
  };
}

function setPath(target, pathParts, value) {
  if (!Array.isArray(pathParts) || pathParts.length === 0) {
    throw new Error("mutation.path must be a nonempty array.");
  }
  let cursor = target;
  for (let i = 0; i < pathParts.length - 1; i += 1) {
    const key = pathParts[i];
    if (cursor?.[key] === undefined) {
      throw new Error(`mutation.path missing segment: ${pathParts.slice(0, i + 1).join(".")}`);
    }
    cursor = cursor[key];
  }
  cursor[pathParts[pathParts.length - 1]] = value;
}

function applyFailureInjection(input, injection) {
  const scenario = deepClone(input);
  delete scenario.failure_injections;
  const mutations = Array.isArray(injection.mutations) ? injection.mutations : [];
  for (const mutation of mutations) {
    setPath(scenario, mutation.path, mutation.value);
  }
  return scenario;
}

function evaluateFailureInjections(input, inputPath) {
  const injections = Array.isArray(input.failure_injections) ? input.failure_injections : [];
  const controls = injections.map((injection, index) => {
    const name = injection.name ?? `failure-injection-${index}`;
    const scenario = applyFailureInjection(input, injection);
    const result = evaluateScenario(scenario, inputPath, { includeFailureInjections: false });
    const expectedFailureCode = injection.expected_failure_code ?? null;
    const failedAsExpected = result.promotion_status !== "fixture_pass";
    const matchedExpectedCode =
      expectedFailureCode === null || result.failure_code === expectedFailureCode;
    return {
      name,
      expected_failure_code: expectedFailureCode,
      actual_failure_code: result.failure_code,
      promotion_status: result.promotion_status,
      passed_when_should_fail: !failedAsExpected,
      expected_code_mismatch: failedAsExpected && !matchedExpectedCode,
    };
  });

  return {
    controls,
    failures: controls.filter((control) => control.passed_when_should_fail || control.expected_code_mismatch),
  };
}

function evaluateScenario(input, inputPath, options = {}) {
  const includeFailureInjections = options.includeFailureInjections ?? true;
  const thresholds = thresholdMap(input.thresholds);
  const epsilons = epsilonMap(input.epsilons);
  const weights = weightMap(input.weights);
  const inventory = evaluateInventoryGuardrail(input, thresholds);
  const thetaMap = thetaRecords(input);
  const rowsInput = Array.isArray(input.rows) ? input.rows : [];
  if (rowsInput.length === 0) {
    throw new Error("rows must contain at least one Earth-core iron replay row.");
  }
  const rows = rowsInput.map((row, index) => evaluateRow(row, index, thetaMap, epsilons, weights));
  const sharedTheta = sharedThetaGate(input, rows);
  const QSource = sourceQ(inventory, epsilons, weights);
  const maxSegregationResidual = maxOf(rows, (row) => row.segregation.residual_norm);
  const maxPhasePositive = maxOf(rows, (row) => row.phase.positive_part);
  const maxAbsGammaResidual = maxOf(rows, (row) => Math.abs(row.cadence.residual));
  const maxTransportExcess = maxOf(rows, (row) => row.transport.excess);
  const maxNullResidual = maxOf(rows, (row) => row.null_bounds.R_null_P);
  const hiddenTransmutationRows = rows.filter((row) => row.phase.delta_G_sea_transmutation_claim);
  const rowQMax = maxOf(rows, (row) => row.Q_row + QSource);
  const Q_total = QSource + rows.reduce((sum, row) => sum + row.Q_row, 0);
  const QGateValue = Math.max(rowQMax, Q_total);
  const failureInjections = includeFailureInjections
    ? evaluateFailureInjections(input, inputPath)
    : { controls: [], failures: [] };

  const gates = {
    source_guardrail: gate(
      inventory.failures.length === 0 ? "pass" : "fail",
      inventory.failures,
      "fixed Fe inventory, delta_Z_Fe = delta_A_Fe = S_Fe_nuc = 0",
      "source-guardrail-open"
    ),
    shared_theta_record: gate(
      sharedTheta.failures.length === 0 ? "pass" : "fail",
      sharedTheta,
      "all rows use shared_theta_sea_id",
      "shared-theta-open"
    ),
    hidden_transmutation: gate(
      hiddenTransmutationRows.length === 0 ? "pass" : "fail",
      hiddenTransmutationRows.map((row) => row.row_id),
      "delta_G_sea must not claim transmutation",
      "hidden-transmutation-open"
    ),
    segregation_flux: gate(
      maxSegregationResidual <= thresholds.segregation_residual_abs_max ? "pass" : "fail",
      maxSegregationResidual,
      thresholds.segregation_residual_abs_max,
      "segregation-flux-open"
    ),
    metallic_phase: gate(
      maxPhasePositive <= thresholds.phase_positive_abs_max ? "pass" : "fail",
      maxPhasePositive,
      thresholds.phase_positive_abs_max,
      "metallic-phase-open"
    ),
    gamma_row: gate(
      maxAbsGammaResidual <= thresholds.gamma_residual_abs_max ? "pass" : "fail",
      maxAbsGammaResidual,
      thresholds.gamma_residual_abs_max,
      "gamma-row-open"
    ),
    transport_threshold: gate(
      maxTransportExcess <= thresholds.transport_excess_abs_max ? "pass" : "fail",
      maxTransportExcess,
      thresholds.transport_excess_abs_max,
      "transport-threshold-open"
    ),
    null_bounds: gate(
      maxNullResidual <= thresholds.null_residual_abs_max ? "pass" : "fail",
      maxNullResidual,
      thresholds.null_residual_abs_max,
      "null-bound-open"
    ),
    Q_packet: gate(
      QGateValue <= thresholds.Q_max ? "pass" : "fail",
      {
        row_Q_max: rowQMax,
        Q_total,
      },
      thresholds.Q_max,
      "Q-packet-open"
    ),
    failure_injections: gate(
      failureInjections.failures.length === 0 ? "pass" : "fail",
      failureInjections.failures,
      "all declared failure injections fail as expected",
      "failure-injection-open"
    ),
  };
  const classification = promotionStatus(gates);

  return {
    schema: "earth-core-iron-replay-result/v1",
    input_path: path.relative(process.cwd(), inputPath),
    metadata: input.metadata ?? {},
    thresholds,
    epsilons,
    weights,
    inventory_guardrail: inventory,
    shared_theta_record: sharedTheta,
    rows,
    totals: {
      Q_source: QSource,
      Q_total,
      row_Q_max: rowQMax,
      max_segregation_residual: maxSegregationResidual,
      max_phase_positive: maxPhasePositive,
      max_abs_gamma_residual: maxAbsGammaResidual,
      max_transport_excess: maxTransportExcess,
      max_null_residual: maxNullResidual,
      failure_injection_count: failureInjections.controls.length,
    },
    gates,
    failure_injections: failureInjections.controls,
    promotion_status: classification.promotion_status,
    failure_code: classification.failure_code,
    note:
      "This is a mock residual scaffold for existing Earth-core iron assemblies. Passing it does not validate geophysics and does not permit a pressure-created-iron claim.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const inputPath = path.resolve(args.input);
  const input = readJson(inputPath);
  const result = evaluateScenario(input, inputPath);
  const output = JSON.stringify(result, null, args.pretty ? 2 : 0);
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
