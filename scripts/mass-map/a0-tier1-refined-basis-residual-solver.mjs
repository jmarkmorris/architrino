#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const OUTPUT_SCHEMA = "a0-tier1-refined-basis-residual-solver/v1";
const OUTPUT_ROW_SCHEMA = "a0-tier1-refined-basis-residual-solver-row/v1";
const RESIDUAL_BALANCE_SCHEMA = "a0-tier1-residual-balance-ledger/v1";
const SAMPLED_FORCING_SCHEMA = "a0-tier1-residual-balance-sampled-forcing/v1";
const LAYERS = ["I", "M", "O"];
const RELATIONS = ["partner", "self", "inter_layer"];
const AXES = ["x", "y", "z"];
const DEFAULT_TOLERANCE = 0.02;
const DEFAULT_RIDGE = 1e-12;
const DEFAULT_EPSILON = 1e-12;

function parseArgs(argv) {
  const args = {
    intake: null,
    rows: "all",
    out: null,
    pretty: false,
    tolerance: DEFAULT_TOLERANCE,
    ridge: DEFAULT_RIDGE,
    epsilon: DEFAULT_EPSILON,
    basis: "projection-component",
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--intake") {
      args.intake = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--tolerance") {
      args.tolerance = parseNonnegativeNumber(argv[++i], "--tolerance");
    } else if (arg === "--ridge") {
      args.ridge = parseNonnegativeNumber(argv[++i], "--ridge");
    } else if (arg === "--epsilon") {
      args.epsilon = parsePositiveNumber(argv[++i], "--epsilon");
    } else if (arg === "--basis") {
      args.basis = parseBasis(argv[++i]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier1-refined-basis-residual-solver.mjs --intake PATH [options]

Options:
  --intake PATH       JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --rows VALUE        "all" or a comma-separated row list. Defaults to "all".
  --basis VALUE       projection-component or projection-vector. Defaults to projection-component.
  --tolerance N       Relative residual tolerance for row-level status. Defaults to ${DEFAULT_TOLERANCE}.
  --ridge N           Ridge added to normal-equation diagonal. Defaults to ${DEFAULT_RIDGE}.
  --epsilon N         Numerical floor for norms and pivots. Defaults to ${DEFAULT_EPSILON}.
  --out PATH          Write JSON output to a file instead of stdout.
  --pretty            Pretty-print JSON output.
  --help              Show this help.

This fail-closed CLI consumes a0-tier1-fold-layer-locked-one-period-attempt/v1
artifacts and evaluates a refined branch-native least-squares basis using the
available sampled relation-projection fields. It never emits accepted history:
accepted_history_boundary is always false. If per-root contribution data are
absent, root-key reconstruction is reported as blocked rather than inferred.`);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive number, got: ${value}`);
  }
  return number;
}

function parseNonnegativeNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) {
    throw new Error(`Expected ${name} to be a nonnegative number, got: ${value}`);
  }
  return number;
}

function parseBasis(value) {
  if (value === "projection-component" || value === "projection-vector") {
    return value;
  }
  throw new Error(`Unsupported --basis value: ${value}`);
}

function requireIntakePath(args) {
  if (!args.intake) {
    throw new Error("Missing required --intake PATH argument.");
  }
  return path.resolve(args.intake);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(args, output) {
  const json = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${json}\n`);
  } else {
    console.log(json);
  }
}

function rowsOf(artifact) {
  return Array.isArray(artifact?.rows) ? artifact.rows : [];
}

function selectRows(artifact, selector) {
  const rows = rowsOf(artifact);
  if (selector === "all") {
    return rows;
  }
  const selected = new Set(
    String(selector)
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter(Number.isInteger)
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return rows.filter((row) => selected.has(row.row));
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
}

function norm(values) {
  return Math.sqrt(values.reduce((sum, value) => sum + value * value, 0));
}

function topLevelMissingFields(artifact) {
  const missing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    missing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    missing.push("rows[]");
  }
  return missing;
}

function sampledForcing(row) {
  return row?.residual_ledgers?.residual_balance?.sampled_forcing;
}

function rowMissingFields(row) {
  const missing = [];
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (row?.schema !== "a0-tier1-fold-layer-locked-one-period-attempt-row/v1") {
    missing.push("rows[].schema=a0-tier1-fold-layer-locked-one-period-attempt-row/v1");
  }
  const residualBalance = row?.residual_ledgers?.residual_balance;
  if (residualBalance?.schema !== RESIDUAL_BALANCE_SCHEMA) {
    missing.push(`rows[].residual_ledgers.residual_balance.schema=${RESIDUAL_BALANCE_SCHEMA}`);
  }
  const forcing = sampledForcing(row);
  if (forcing?.schema !== SAMPLED_FORCING_SCHEMA) {
    missing.push(`rows[].residual_ledgers.residual_balance.sampled_forcing.schema=${SAMPLED_FORCING_SCHEMA}`);
  }
  if (!Number.isFinite(forcing?.period) || forcing.period <= 0) {
    missing.push("rows[].residual_ledgers.residual_balance.sampled_forcing.period");
  }
  if (!Array.isArray(forcing?.samples) || forcing.samples.length < 2) {
    missing.push("rows[].residual_ledgers.residual_balance.sampled_forcing.samples[2+]");
    return missing;
  }
  for (const [sampleIndex, sample] of forcing.samples.entries()) {
    if (!Number.isFinite(sample?.t)) {
      missing.push(`sampled_forcing.samples[${sampleIndex}].t`);
    }
    for (const layer of LAYERS) {
      const layerData = sample?.layers?.[layer];
      if (!finiteVector3(layerData?.target_relative_acceleration)) {
        missing.push(`sampled_forcing.samples[${sampleIndex}].layers.${layer}.target_relative_acceleration`);
      }
      for (const relation of RELATIONS) {
        if (!finiteVector3(layerData?.relation_basis_relative?.[relation])) {
          missing.push(
            `sampled_forcing.samples[${sampleIndex}].layers.${layer}.relation_basis_relative.${relation}`
          );
        }
      }
    }
  }
  return missing;
}

function rootKeyMissingFields(row) {
  const missing = [];
  const firstRoot = Array.isArray(row?.active_causal_root_ledger) ? row.active_causal_root_ledger[0] : null;
  if (!Array.isArray(row?.active_causal_root_ledger) || row.active_causal_root_ledger.length === 0) {
    missing.push("rows[].active_causal_root_ledger[]");
  }
  for (const field of ["root_key", "basis_relative_acceleration", "source_position_at_delay"]) {
    if (!(field in (firstRoot ?? {}))) {
      missing.push(`rows[].active_causal_root_ledger[].${field}`);
    }
  }
  const firstSample = sampledForcing(row)?.samples?.[0];
  if (!Array.isArray(firstSample?.root_contributions)) {
    missing.push("sampled_forcing.samples[].root_contributions[]");
  }
  return missing;
}

function basisColumns(mode) {
  const columns = [];
  for (const layer of LAYERS) {
    for (const relation of RELATIONS) {
      if (mode === "projection-vector") {
        columns.push({ id: `${layer}.${relation}`, layer, relation, axisIndex: null });
      } else {
        for (const [axisIndex, axis] of AXES.entries()) {
          columns.push({ id: `${layer}.${relation}.${axis}`, layer, relation, axisIndex });
        }
      }
    }
  }
  return columns;
}

function buildSystem(row, mode) {
  const columns = basisColumns(mode);
  const columnIndex = new Map(columns.map((column, index) => [column.id, index]));
  const matrix = [];
  const target = [];
  const equationLabels = [];
  for (const sample of sampledForcing(row).samples) {
    for (const layer of LAYERS) {
      const layerData = sample.layers[layer];
      for (let axisIndex = 0; axisIndex < AXES.length; axisIndex += 1) {
        const equation = new Array(columns.length).fill(0);
        for (const relation of RELATIONS) {
          if (mode === "projection-vector") {
            equation[columnIndex.get(`${layer}.${relation}`)] =
              layerData.relation_basis_relative[relation][axisIndex];
          } else {
            equation[columnIndex.get(`${layer}.${relation}.${AXES[axisIndex]}`)] =
              layerData.relation_basis_relative[relation][axisIndex];
          }
        }
        matrix.push(equation);
        target.push(layerData.target_relative_acceleration[axisIndex]);
        equationLabels.push({ t: sample.t, layer, axis: AXES[axisIndex] });
      }
    }
  }
  return { columns, matrix, target, equationLabels };
}

function solveLeastSquares(matrix, target, ridge, epsilon) {
  const rowCount = matrix.length;
  const columnCount = matrix[0]?.length ?? 0;
  const normal = Array.from({ length: columnCount }, () => new Array(columnCount).fill(0));
  const rhs = new Array(columnCount).fill(0);
  for (let row = 0; row < rowCount; row += 1) {
    for (let i = 0; i < columnCount; i += 1) {
      const ai = matrix[row][i];
      rhs[i] += ai * target[row];
      for (let j = 0; j < columnCount; j += 1) {
        normal[i][j] += ai * matrix[row][j];
      }
    }
  }
  for (let i = 0; i < columnCount; i += 1) {
    normal[i][i] += ridge;
  }
  return solveLinearSystem(normal, rhs, epsilon);
}

function solveLinearSystem(matrix, rhs, epsilon) {
  const n = rhs.length;
  const augmented = matrix.map((row, index) => [...row, rhs[index]]);
  for (let pivot = 0; pivot < n; pivot += 1) {
    let pivotRow = pivot;
    for (let row = pivot + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[pivotRow][pivot])) {
        pivotRow = row;
      }
    }
    if (Math.abs(augmented[pivotRow][pivot]) < epsilon) {
      throw new Error(`Singular normal equation at pivot ${pivot}`);
    }
    if (pivotRow !== pivot) {
      [augmented[pivot], augmented[pivotRow]] = [augmented[pivotRow], augmented[pivot]];
    }
    const pivotValue = augmented[pivot][pivot];
    for (let column = pivot; column <= n; column += 1) {
      augmented[pivot][column] /= pivotValue;
    }
    for (let row = 0; row < n; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = augmented[row][pivot];
      for (let column = pivot; column <= n; column += 1) {
        augmented[row][column] -= factor * augmented[pivot][column];
      }
    }
  }
  return augmented.map((row) => row[n]);
}

function matVec(matrix, coefficients) {
  return matrix.map((row) => row.reduce((sum, value, index) => sum + value * coefficients[index], 0));
}

function residualExamples(equationLabels, target, predicted, limit = 10) {
  return target
    .map((value, index) => ({
      ...equationLabels[index],
      target: value,
      predicted: predicted[index],
      residual: value - predicted[index],
    }))
    .sort((a, b) => Math.abs(b.residual) - Math.abs(a.residual))
    .slice(0, limit);
}

function coefficientObject(columns, coefficients) {
  return Object.fromEntries(columns.map((column, index) => [column.id, coefficients[index]]));
}

function blockedRow(row, status, failureCode, missingFields, args) {
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: Number.isInteger(row?.row) ? row.row : null,
    status,
    failure_code: failureCode,
    source_status: row?.status ?? null,
    source_failure_code: row?.failure_code ?? null,
    basis_mode: args.basis,
    missing_fields: missingFields,
    root_key_reconstruction: {
      status: "blocked_missing_root_key_projection_fields",
      missing_fields: rootKeyMissingFields(row),
    },
    accepted_history_boundary: false,
  };
}

function solveRow(row, args) {
  const missing = rowMissingFields(row);
  if (missing.length > 0) {
    return blockedRow(row, "blocked_missing_projection_basis_fields", "missing-projection-basis-fields", missing, args);
  }
  try {
    const system = buildSystem(row, args.basis);
    const coefficients = solveLeastSquares(system.matrix, system.target, args.ridge, args.epsilon);
    const predicted = matVec(system.matrix, coefficients);
    const residual = system.target.map((value, index) => value - predicted[index]);
    const targetNorm = norm(system.target);
    const residualNorm = norm(residual);
    const relativeResidual = residualNorm / Math.max(targetNorm, args.epsilon);
    const maxComponentResidual = Math.max(...residual.map((value) => Math.abs(value)));
    const status =
      relativeResidual <= args.tolerance
        ? "projection_refined_residual_within_tolerance_not_accepted_history"
        : "projection_refined_residual_above_tolerance";
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: row.row,
      status,
      failure_code: status === "projection_refined_residual_above_tolerance" ? "refined-residual-too-large" : null,
      source_status: row.status ?? null,
      source_failure_code: row.failure_code ?? null,
      basis_mode: args.basis,
      reconstruction_level: "sampled_forcing.layer.relation_basis_relative",
      equation_count: system.matrix.length,
      basis_count: system.columns.length,
      sample_count: sampledForcing(row).samples.length,
      period: sampledForcing(row).period,
      tolerance: args.tolerance,
      ridge: args.ridge,
      target_norm: targetNorm,
      residual_norm: residualNorm,
      relative_residual: relativeResidual,
      max_component_residual: maxComponentResidual,
      coefficients: coefficientObject(system.columns, coefficients),
      largest_residual_examples: residualExamples(system.equationLabels, system.target, predicted),
      source_relation_weight_only: row.residual_ledgers?.residual_balance
        ? {
            status: row.residual_ledgers.residual_balance.status ?? null,
            failure_code: row.residual_ledgers.residual_balance.failure_code ?? null,
            relative_residual: row.residual_ledgers.residual_balance.relative_residual ?? null,
            relation_weight_solution: row.residual_ledgers.residual_balance.relation_weight_solution ?? null,
          }
        : null,
      root_key_reconstruction: {
        status: "blocked_missing_root_key_projection_fields",
        missing_fields: rootKeyMissingFields(row),
        note:
          "The intake supplies relation-projected layer basis vectors, but not per-root contribution vectors keyed by receiver/source/relation/delay/J. This solver does not infer root-key coefficients from aggregate projections.",
      },
      accepted_history_boundary: false,
    };
  } catch (error) {
    return blockedRow(row, "blocked_linear_solve_failed", "linear-solve-failed", [error.message], args);
  }
}

function buildOutput(artifact, args, intakePath) {
  const topMissing = topLevelMissingFields(artifact);
  const selectedRows = topMissing.length > 0 ? [] : selectRows(artifact, args.rows);
  const rows = selectedRows.map((row) => solveRow(row, args));
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    intake: intakePath,
    intake_schema: artifact?.artifact_schema ?? null,
    status: topMissing.length
      ? "blocked_invalid_intake"
      : rows.some((row) => row.status === "projection_refined_residual_above_tolerance")
        ? "refined_basis_residuals_above_tolerance"
        : rows.some((row) => row.status.startsWith("blocked_"))
          ? "blocked"
          : "projection_refined_basis_evaluated",
    accepted_history_boundary: false,
    parameters: {
      rows: args.rows,
      basis: args.basis,
      tolerance: args.tolerance,
      ridge: args.ridge,
      epsilon: args.epsilon,
    },
    missing_fields: topMissing,
    summary: {
      selected_row_count: rows.length,
      status_counts: rows.reduce((acc, row) => {
        acc[row.status] = (acc[row.status] ?? 0) + 1;
        return acc;
      }, {}),
      accepted_history_row_count: 0,
      root_key_reconstruction_blocked_count: rows.filter(
        (row) => row.root_key_reconstruction?.status === "blocked_missing_root_key_projection_fields"
      ).length,
    },
    nonfit_statement:
      "This solver uses only intake branch-native sampled forcing and relation-projection basis fields. It does not use accepted history, particle masses, CKM values, measured alpha, or benchmark target values.",
    rows,
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntakePath(args);
  const artifact = readJson(intakePath);
  writeJson(args, buildOutput(artifact, args, intakePath));
}

main();
