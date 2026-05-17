#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "retuning-map-mock.json");
const DEFAULT_VARIABLES = [
  "ln_nu_I",
  "ln_nu_M",
  "ln_nu_O",
  "ln_R_I",
  "ln_R_M",
  "ln_R_O",
  "ln_lambda",
  "ln_xi",
];
const LAYER_KEYS = ["I", "M", "O"];

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
  console.log(`Usage: node scripts/tri-binary/retuning-map-toy-model.mjs [options]

Options:
  --input PATH  Retuning-map input packet. Defaults to scripts/tri-binary/retuning-map-mock.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This solves the toy retuning problem:
  minimize 1/2 Delta y^T K_ret Delta y
  subject to D A_cyc[Delta y] + Delta A_wake = sigma h
  and declared linearized branch constraints.

It is a fixture for branch bookkeeping, not delayed-dynamics validation.`);
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

function positiveNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number <= 0) {
    throw new Error(`${label} must be positive.`);
  }
  return number;
}

function vectorFromCoefficients(coefficients, variables, label) {
  if (!coefficients || typeof coefficients !== "object" || Array.isArray(coefficients)) {
    throw new Error(`${label} must be an object.`);
  }
  return variables.map((variable) => finiteNumber(coefficients[variable] ?? 0, `${label}.${variable}`));
}

function diagonalFromWeights(weights, variables, label) {
  if (!weights || typeof weights !== "object" || Array.isArray(weights)) {
    throw new Error(`${label} must be an object.`);
  }
  return variables.map((variable) => positiveNumber(weights[variable] ?? 1, `${label}.${variable}`));
}

function dot(a, b) {
  return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

function matVec(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function transpose(matrix) {
  return matrix[0].map((_, columnIndex) => matrix.map((row) => row[columnIndex]));
}

function invertMatrix(matrix) {
  const n = matrix.length;
  const augmented = matrix.map((row, rowIndex) => [
    ...row.map((value) => finiteNumber(value, `matrix[${rowIndex}]`)),
    ...Array.from({ length: n }, (_, columnIndex) => (columnIndex === rowIndex ? 1 : 0)),
  ]);

  for (let pivotIndex = 0; pivotIndex < n; pivotIndex += 1) {
    let pivotRow = pivotIndex;
    for (let rowIndex = pivotIndex + 1; rowIndex < n; rowIndex += 1) {
      if (Math.abs(augmented[rowIndex][pivotIndex]) > Math.abs(augmented[pivotRow][pivotIndex])) {
        pivotRow = rowIndex;
      }
    }
    if (Math.abs(augmented[pivotRow][pivotIndex]) < 1e-12) {
      throw new Error("Constraint matrix is singular or underdetermined for this toy packet.");
    }
    if (pivotRow !== pivotIndex) {
      [augmented[pivotIndex], augmented[pivotRow]] = [augmented[pivotRow], augmented[pivotIndex]];
    }
    const pivot = augmented[pivotIndex][pivotIndex];
    for (let columnIndex = 0; columnIndex < 2 * n; columnIndex += 1) {
      augmented[pivotIndex][columnIndex] /= pivot;
    }
    for (let rowIndex = 0; rowIndex < n; rowIndex += 1) {
      if (rowIndex === pivotIndex) {
        continue;
      }
      const factor = augmented[rowIndex][pivotIndex];
      for (let columnIndex = 0; columnIndex < 2 * n; columnIndex += 1) {
        augmented[rowIndex][columnIndex] -= factor * augmented[pivotIndex][columnIndex];
      }
    }
  }

  return augmented.map((row) => row.slice(n));
}

function multiplyMatrices(a, b) {
  const bT = transpose(b);
  return a.map((row) => bT.map((column) => dot(row, column)));
}

function solveConstrainedMinimum(kDiagonal, rows, rhs) {
  const invKDiagonal = kDiagonal.map((value) => 1 / value);
  const weightedRowsT = transpose(rows).map((column, index) =>
    column.map((value) => value * invKDiagonal[index])
  );
  const gram = multiplyMatrices(rows, weightedRowsT);
  const gramInverse = invertMatrix(gram);
  const multipliers = matVec(gramInverse, rhs);
  return weightedRowsT.map((row) => dot(row, multipliers));
}

function rowsFromTransaction(packet, scenario, transaction, variables) {
  const actionGradient = vectorFromCoefficients(
    transaction.action_gradient_h_per_log ?? scenario.action_gradient_h_per_log,
    variables,
    `${scenario.id}.${transaction.id}.action_gradient_h_per_log`
  );
  const sigma = finiteNumber(transaction.sigma, `${scenario.id}.${transaction.id}.sigma`);
  const actionIncrement = positiveNumber(
    transaction.action_increment_h ?? scenario.action_increment_h ?? packet.action_increment_h ?? 1,
    `${scenario.id}.${transaction.id}.action_increment_h`
  );
  const wakeIncrement = finiteNumber(
    transaction.wake_action_increment_h ?? scenario.wake_action_increment_h ?? 0,
    `${scenario.id}.${transaction.id}.wake_action_increment_h`
  );
  const rows = [actionGradient];
  const rhs = [sigma * actionIncrement - wakeIncrement];
  const constraints = transaction.constraints ?? scenario.constraints ?? [];
  if (!Array.isArray(constraints)) {
    throw new Error(`${scenario.id}.${transaction.id}.constraints must be an array.`);
  }
  constraints.forEach((constraint, index) => {
    rows.push(vectorFromCoefficients(
      constraint.coefficients,
      variables,
      `${scenario.id}.${transaction.id}.constraints[${index}].coefficients`
    ));
    rhs.push(finiteNumber(constraint.target ?? 0, `${scenario.id}.${transaction.id}.constraints[${index}].target`));
  });
  return { rows, rhs };
}

function byVariable(vector, variables) {
  return Object.fromEntries(variables.map((variable, index) => [variable, vector[index]]));
}

function valueFromDelta(referenceState, deltaByVariable, key, variable) {
  const reference = finiteNumber(referenceState[key], `reference_state.${key}`);
  return reference * Math.expm1(deltaByVariable[variable] ?? 0);
}

function representativeCadenceDelta(referenceState, deltaByVariable, weights) {
  const wI = finiteNumber(weights.I ?? 0, "representative_cadence_weights.I");
  const wM = finiteNumber(weights.M ?? 0, "representative_cadence_weights.M");
  const wO = finiteNumber(weights.O ?? 0, "representative_cadence_weights.O");
  const weightSum = wI + wM + wO;
  if (Math.abs(weightSum) < 1e-12) {
    throw new Error("representative_cadence_weights must not sum to zero.");
  }
  const deltaLnNuN = (
    wI * (deltaByVariable.ln_nu_I ?? 0)
    + wM * (deltaByVariable.ln_nu_M ?? 0)
    + wO * (deltaByVariable.ln_nu_O ?? 0)
  ) / weightSum;
  const nuN = finiteNumber(referenceState.nu_N ?? 1, "reference_state.nu_N");
  return {
    delta_ln_nu_N: deltaLnNuN,
    delta_nu_N: nuN * Math.expm1(deltaLnNuN),
    weights_sum: weightSum,
  };
}

function speedDiagnostics(referenceState, deltaByVariable, transaction) {
  const cF = positiveNumber(referenceState.c_f ?? 1, "reference_state.c_f");
  const epsilonM = positiveNumber(transaction.epsilon_M ?? referenceState.epsilon_M ?? 0.03, "epsilon_M");
  const diagnostics = {};
  const failures = [];

  LAYER_KEYS.forEach((layer) => {
    const deltaLnS = (deltaByVariable[`ln_R_${layer}`] ?? 0) + (deltaByVariable[`ln_nu_${layer}`] ?? 0);
    const initial = positiveNumber(referenceState[`s_${layer}`], `reference_state.s_${layer}`);
    const post = initial * Math.exp(deltaLnS);
    let status = "pass";
    let threshold = null;
    if (layer === "I") {
      threshold = cF;
      status = post > cF ? "pass" : "fail";
      if (status === "fail") failures.push("inner-speed-regime-crossing");
    } else if (layer === "M") {
      threshold = epsilonM * cF;
      status = Math.abs(post - cF) <= threshold ? "pass" : "fail";
      if (status === "fail") failures.push("middle-hinge-violation");
    } else if (layer === "O") {
      threshold = cF;
      status = post < cF ? "pass" : "fail";
      if (status === "fail") failures.push("outer-speed-regime-crossing");
    }
    diagnostics[layer] = {
      delta_ln_s: deltaLnS,
      initial_s: initial,
      post_s: post,
      status,
      threshold,
    };
  });

  return { diagnostics, failures };
}

function maxAbs(values) {
  return values.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
}

function solveTransaction(packet, scenario, transaction) {
  const variables = transaction.variables ?? scenario.variables ?? packet.variables ?? DEFAULT_VARIABLES;
  const kDiagonal = diagonalFromWeights(
    transaction.compliance_diagonal ?? scenario.compliance_diagonal,
    variables,
    `${scenario.id}.${transaction.id}.compliance_diagonal`
  );
  const { rows, rhs } = rowsFromTransaction(packet, scenario, transaction, variables);
  const delta = solveConstrainedMinimum(kDiagonal, rows, rhs);
  const deltaByVariable = byVariable(delta, variables);
  const residuals = matVec(rows, delta).map((value, index) => value - rhs[index]);
  const cost = 0.5 * delta.reduce((sum, value, index) => sum + kDiagonal[index] * value ** 2, 0);
  const referenceState = transaction.reference_state ?? scenario.reference_state;
  const cadenceWeights = transaction.representative_cadence_weights ?? scenario.representative_cadence_weights;
  const cadence = representativeCadenceDelta(referenceState, deltaByVariable, cadenceWeights);
  const retuningComponents = {
    delta_nu_N: cadence.delta_nu_N,
    delta_R_I: valueFromDelta(referenceState, deltaByVariable, "R_I", "ln_R_I"),
    delta_R_M: valueFromDelta(referenceState, deltaByVariable, "R_M", "ln_R_M"),
    delta_R_O: valueFromDelta(referenceState, deltaByVariable, "R_O", "ln_R_O"),
    delta_lambda: valueFromDelta(referenceState, deltaByVariable, "lambda", "ln_lambda"),
    delta_xi: valueFromDelta(referenceState, deltaByVariable, "xi", "ln_xi"),
  };
  const speed = speedDiagnostics(referenceState, deltaByVariable, transaction);
  const fN = finiteNumber(transaction.f_N ?? scenario.f_N ?? 1, `${scenario.id}.${transaction.id}.f_N`);
  const rate = finiteNumber(
    transaction.rate_density_per_core ?? scenario.rate_density_per_core ?? 0,
    `${scenario.id}.${transaction.id}.rate_density_per_core`
  );
  const partialNuFN = finiteNumber(
    transaction.partial_nu_f_N ?? scenario.partial_nu_f_N ?? 0,
    `${scenario.id}.${transaction.id}.partial_nu_f_N`
  );
  const jNuContribution = fN * rate * cadence.delta_nu_N;
  const higherOrderEstimate = Math.abs(cadence.delta_nu_N ** 2 * partialNuFN);
  const constraintResidualMax = maxAbs(residuals);
  const failures = [
    ...(constraintResidualMax <= 1e-9 ? [] : ["constraint-residual-open"]),
    ...speed.failures,
  ];

  return {
    id: transaction.id,
    sigma: finiteNumber(transaction.sigma, `${scenario.id}.${transaction.id}.sigma`),
    status: failures.length === 0 ? "candidate" : "failed",
    failure_codes: failures,
    cost,
    delta_y: deltaByVariable,
    residuals: {
      constraint_residuals: residuals,
      constraint_residual_max: constraintResidualMax,
    },
    speed_gates: speed.diagnostics,
    representative_cadence: cadence,
    retuning_components: retuningComponents,
    J_nu: {
      f_N: fN,
      rate_density_per_core: rate,
      contribution: jNuContribution,
      higher_order_estimate: higherOrderEstimate,
    },
  };
}

function solveScenario(packet, scenario) {
  if (!Array.isArray(scenario.transactions) || scenario.transactions.length === 0) {
    throw new Error(`${scenario.id}.transactions must be a nonempty array.`);
  }
  const transactions = scenario.transactions.map((transaction) => solveTransaction(packet, scenario, transaction));
  const netJNu = transactions.reduce((sum, transaction) => sum + transaction.J_nu.contribution, 0);
  const higherOrderEstimate = transactions.reduce(
    (sum, transaction) => sum + transaction.J_nu.higher_order_estimate,
    0
  );
  return {
    id: scenario.id,
    description: scenario.description ?? "",
    status: transactions.every((transaction) => transaction.status === "candidate") ? "candidate" : "failed",
    transactions,
    net_J_nu: {
      value: netJNu,
      higher_order_estimate: higherOrderEstimate,
    },
  };
}

function run(packet) {
  if (!Array.isArray(packet.scenarios) || packet.scenarios.length === 0) {
    throw new Error("Input packet must define a nonempty scenarios array.");
  }
  return {
    schema: "aaa.retuning_map_toy.output.v0",
    input_schema: packet.schema ?? null,
    note: "Toy constrained retuning replay; not delayed-dynamics validation.",
    scenarios: packet.scenarios.map((scenario) => solveScenario(packet, scenario)),
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const packet = readJson(args.input);
  const output = run(packet);
  const text = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${text}\n`);
  } else {
    console.log(text);
  }
}

try {
  main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
