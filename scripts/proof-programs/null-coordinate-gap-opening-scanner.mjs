#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INPUT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan/v1";
const RESULT_SCHEMA = "aaa-proof/null-coordinate-gap-opening-scan-result/v1";
const DEFAULT_TOLERANCE = 1e-9;
const DEFAULT_TARGET_MARGIN = 1;
const DEFAULT_MAX_ITERATIONS = 20000;
const DEFAULT_SEED = 1729;

function parseArgs(argv) {
  const args = {
    input: null,
    out: null,
    pretty: false,
    tolerance: DEFAULT_TOLERANCE,
    targetMargin: DEFAULT_TARGET_MARGIN,
    maxIterations: DEFAULT_MAX_ITERATIONS,
    seed: DEFAULT_SEED,
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
    } else if (arg === "--tolerance") {
      args.tolerance = parsePositiveNumber(argv[++i], "--tolerance");
    } else if (arg === "--target-margin") {
      args.targetMargin = parsePositiveNumber(argv[++i], "--target-margin");
    } else if (arg === "--max-iterations") {
      args.maxIterations = parsePositiveInteger(argv[++i], "--max-iterations");
    } else if (arg === "--seed") {
      args.seed = parseInteger(argv[++i], "--seed");
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/proof-programs/null-coordinate-gap-opening-scanner.mjs --input PATH [options]

Options:
  --input PATH        Gap-opening scan JSON, schema ${INPUT_SCHEMA}.
  --out PATH          Write result JSON to PATH instead of stdout.
  --pretty            Pretty-print JSON.
  --tolerance N       Numerical tolerance for equalities and strict margins. Defaults to ${DEFAULT_TOLERANCE}.
  --target-margin N   Search-scale margin used inside the projected perceptron. Defaults to ${DEFAULT_TARGET_MARGIN}.
  --max-iterations N  Maximum deterministic perceptron iterations. Defaults to ${DEFAULT_MAX_ITERATIONS}.
  --seed N            Deterministic pseudo-random seed used for trial directions. Defaults to ${DEFAULT_SEED}.
  --help              Show this help.

This fail-closed scanner tests the finite tangent-space condition

  B xi = 0,   A xi >= kappa 1

from the null-coordinate separation-direction lemma. It reports status=feasible
only when it emits an explicit strict witness vector with ||xi||_inf <= 1.
Failure to find a witness is reported as inconclusive, not as proof of
infeasibility.`);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive number, got: ${value}`);
  }
  return number;
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
}

function parseInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number)) {
    throw new Error(`Expected ${name} to be an integer, got: ${value}`);
  }
  return number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(filePath, value, pretty) {
  const text = JSON.stringify(value, null, pretty ? 2 : 0) + "\n";
  if (filePath) {
    fs.writeFileSync(filePath, text);
  } else {
    process.stdout.write(text);
  }
}

function variableIds(input) {
  if (!Array.isArray(input.variables) || input.variables.length === 0) {
    throw new Error("Input requires a nonempty variables array.");
  }
  const ids = input.variables.map((entry) => (typeof entry === "string" ? entry : entry?.id));
  if (ids.some((id) => typeof id !== "string" || id.length === 0)) {
    throw new Error("Every variable must be a string or an object with an id.");
  }
  if (new Set(ids).size !== ids.length) {
    throw new Error("Variable ids must be unique.");
  }
  return ids;
}

function constraintRows(rows, ids, rowKind) {
  if (!Array.isArray(rows)) {
    return [];
  }
  return rows.map((row, index) => {
    const coefficients = vectorFromCoefficients(row.coefficients, ids, `${rowKind}[${index}].coefficients`);
    const target = Number.isFinite(row.target) ? row.target : 0;
    return {
      id: row.id ?? `${rowKind}_${index + 1}`,
      coefficients,
      target,
      metadata: row,
    };
  });
}

function gapRows(rows, ids) {
  if (!Array.isArray(rows) || rows.length === 0) {
    throw new Error("Input requires at least one gap_constraints row.");
  }
  return rows.map((row, index) => {
    const coefficients = vectorFromCoefficients(row.coefficients, ids, `gap_constraints[${index}].coefficients`);
    const requiredMargin = Number.isFinite(row.required_margin) ? row.required_margin : 0;
    if (requiredMargin < 0) {
      throw new Error(`gap_constraints[${index}].required_margin must be nonnegative.`);
    }
    return {
      id: row.id ?? `gap_${index + 1}`,
      coefficients,
      requiredMargin,
      metadata: row,
    };
  });
}

function vectorFromCoefficients(coefficients, ids, label) {
  if (!coefficients || typeof coefficients !== "object" || Array.isArray(coefficients)) {
    throw new Error(`${label} must be an object keyed by variable id.`);
  }
  const unknown = Object.keys(coefficients).filter((key) => !ids.includes(key));
  if (unknown.length > 0) {
    throw new Error(`${label} references unknown variables: ${unknown.join(", ")}`);
  }
  return ids.map((id) => {
    const value = coefficients[id] ?? 0;
    if (!Number.isFinite(value)) {
      throw new Error(`${label}.${id} must be finite.`);
    }
    return value;
  });
}

function dot(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i += 1) {
    sum += a[i] * b[i];
  }
  return sum;
}

function addScaled(target, source, scale) {
  for (let i = 0; i < target.length; i += 1) {
    target[i] += source[i] * scale;
  }
}

function norm(vector) {
  return Math.sqrt(dot(vector, vector));
}

function infinityNorm(vector) {
  return vector.reduce((max, value) => Math.max(max, Math.abs(value)), 0);
}

function scale(vector, factor) {
  return vector.map((value) => value * factor);
}

function matVec(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function transpose(matrix, columns) {
  return Array.from({ length: columns }, (_, column) => matrix.map((row) => row[column]));
}

function multiplyMatrices(a, b) {
  if (a.length === 0 || b.length === 0) {
    return [];
  }
  const bColumns = transpose(b, b[0].length);
  return a.map((row) => bColumns.map((column) => dot(row, column)));
}

function rref(matrix, tolerance) {
  const rows = matrix.map((row) => row.slice());
  const rowCount = rows.length;
  const columnCount = rowCount === 0 ? 0 : rows[0].length;
  const pivots = [];
  let leadRow = 0;
  for (let column = 0; column < columnCount && leadRow < rowCount; column += 1) {
    let pivotRow = leadRow;
    let pivotAbs = Math.abs(rows[pivotRow][column]);
    for (let row = leadRow + 1; row < rowCount; row += 1) {
      const valueAbs = Math.abs(rows[row][column]);
      if (valueAbs > pivotAbs) {
        pivotAbs = valueAbs;
        pivotRow = row;
      }
    }
    if (pivotAbs <= tolerance) {
      continue;
    }
    [rows[leadRow], rows[pivotRow]] = [rows[pivotRow], rows[leadRow]];
    const pivot = rows[leadRow][column];
    for (let col = column; col < columnCount; col += 1) {
      rows[leadRow][col] /= pivot;
    }
    for (let row = 0; row < rowCount; row += 1) {
      if (row === leadRow) {
        continue;
      }
      const factor = rows[row][column];
      if (Math.abs(factor) <= tolerance) {
        continue;
      }
      for (let col = column; col < columnCount; col += 1) {
        rows[row][col] -= factor * rows[leadRow][col];
      }
    }
    pivots.push(column);
    leadRow += 1;
  }
  return { rows, pivots };
}

function nullspace(matrix, variableCount, tolerance) {
  if (matrix.length === 0) {
    return Array.from({ length: variableCount }, (_, index) =>
      Array.from({ length: variableCount }, (_, column) => (index === column ? 1 : 0))
    );
  }
  const { rows, pivots } = rref(matrix, tolerance);
  const pivotSet = new Set(pivots);
  const freeColumns = [];
  for (let column = 0; column < variableCount; column += 1) {
    if (!pivotSet.has(column)) {
      freeColumns.push(column);
    }
  }
  return freeColumns.map((freeColumn) => {
    const vector = Array(variableCount).fill(0);
    vector[freeColumn] = 1;
    for (let pivotIndex = 0; pivotIndex < pivots.length; pivotIndex += 1) {
      vector[pivots[pivotIndex]] = -rows[pivotIndex][freeColumn];
    }
    return vector;
  });
}

function lcg(seed) {
  let state = Math.abs(seed) % 2147483647;
  if (state === 0) {
    state = 1;
  }
  return () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
}

function candidateDirections(rows, dimension, seed) {
  const directions = [];
  for (const row of rows) {
    if (norm(row) > 0) {
      directions.push(row.slice());
    }
  }
  const rowSum = Array(dimension).fill(0);
  for (const row of rows) {
    addScaled(rowSum, row, 1);
  }
  if (norm(rowSum) > 0) {
    directions.push(rowSum);
  }
  for (let i = 0; i < dimension; i += 1) {
    const basis = Array(dimension).fill(0);
    basis[i] = 1;
    directions.push(basis);
    directions.push(scale(basis, -1));
  }
  const random = lcg(seed);
  const randomCount = Math.max(64, 16 * dimension);
  for (let sample = 0; sample < randomCount; sample += 1) {
    const direction = Array.from({ length: dimension }, () => 2 * random() - 1);
    if (norm(direction) > 0) {
      directions.push(direction);
    }
  }
  return directions;
}

function perceptron(rows, dimension, maxIterations, seed, tolerance) {
  const starts = candidateDirections(rows, dimension, seed);
  let best = { z: Array(dimension).fill(0), margin: -Infinity };
  for (const start of starts) {
    const z = start.slice();
    for (let iteration = 0; iteration < maxIterations; iteration += 1) {
      const values = rows.map((row) => dot(row, z));
      const minValue = Math.min(...values);
      if (minValue > best.margin) {
        best = { z: z.slice(), margin: minValue };
      }
      if (minValue > tolerance) {
        return { z, margin: minValue, iterations: iteration + 1 };
      }
      const minIndex = values.indexOf(minValue);
      const row = rows[minIndex];
      const rowNormSquared = dot(row, row);
      if (rowNormSquared <= tolerance) {
        break;
      }
      const step = (1 - minValue) / rowNormSquared;
      addScaled(z, row, step);
    }
  }
  return { z: best.z, margin: best.margin, iterations: maxIterations };
}

function combineBasis(basis, coordinates) {
  const variableCount = basis[0]?.length ?? 0;
  const vector = Array(variableCount).fill(0);
  for (let basisIndex = 0; basisIndex < basis.length; basisIndex += 1) {
    addScaled(vector, basis[basisIndex], coordinates[basisIndex]);
  }
  return vector;
}

function witnessFromInput(input, ids) {
  const witness = input?.candidate_witness;
  if (!witness) {
    return null;
  }
  return vectorFromCoefficients(witness, ids, "candidate_witness");
}

function evaluateWitness(vector, structuralRows, gapConstraintRows) {
  const structuralResiduals = structuralRows.map((row) => dot(row.coefficients, vector) - row.target);
  const gapValues = gapConstraintRows.map((row) => dot(row.coefficients, vector) - row.requiredMargin);
  return {
    structuralResiduals,
    gapValues,
    maxStructuralResidual: structuralResiduals.reduce((max, value) => Math.max(max, Math.abs(value)), 0),
    minGapValue: gapValues.length === 0 ? Infinity : Math.min(...gapValues),
  };
}

function vectorObject(ids, vector) {
  return Object.fromEntries(ids.map((id, index) => [id, cleanNumber(vector[index])]));
}

function cleanNumber(value) {
  if (Math.abs(value) < 1e-14) {
    return 0;
  }
  return Number(value.toPrecision(12));
}

function scan(input, args) {
  if (input.schema !== INPUT_SCHEMA) {
    throw new Error(`Expected input schema ${INPUT_SCHEMA}, got ${input.schema}`);
  }
  const ids = variableIds(input);
  const structuralRows = constraintRows(input.structural_constraints ?? [], ids, "structural_constraints");
  const gapConstraintRows = gapRows(input.gap_constraints, ids);
  const structuralMatrix = structuralRows.map((row) => row.coefficients);
  const gapMatrix = gapConstraintRows.map((row) => row.coefficients);
  const targetVector = structuralRows.map((row) => row.target);
  const result = (scanResult) =>
    buildResult(input, ids, structuralRows, gapConstraintRows, {
      ...scanResult,
      tolerance: args.tolerance,
    });
  if (targetVector.some((value) => Math.abs(value) > args.tolerance)) {
    throw new Error("This scanner supports tangent-space homogeneous structural constraints only: targets must be zero.");
  }

  const inputWitness = witnessFromInput(input, ids);
  if (inputWitness) {
    const evaluation = evaluateWitness(inputWitness, structuralRows, gapConstraintRows);
    const witnessInfinityNorm = infinityNorm(inputWitness);
    if (
      witnessInfinityNorm <= 1 + args.tolerance &&
      evaluation.maxStructuralResidual <= args.tolerance &&
      evaluation.minGapValue > args.tolerance
    ) {
      return result({
        status: "feasible",
        method: "input_witness",
        witness: inputWitness,
        evaluation,
        nullity: null,
      });
    }
  }

  const basis = nullspace(structuralMatrix, ids.length, args.tolerance);
  if (basis.length === 0) {
    const zero = Array(ids.length).fill(0);
    const evaluation = evaluateWitness(zero, structuralRows, gapConstraintRows);
    return result({
      status: "inconclusive",
      method: "zero_nullspace",
      witness: null,
      evaluation,
      nullity: 0,
      note: "Structural tangent space is zero-dimensional; strict gap opening needs a different basis or structural point.",
    });
  }

  const projectedGapRows = multiplyMatrices(gapMatrix, transpose(basis, ids.length));
  const normalizedRows = projectedGapRows.map((row, index) => {
    const rowNorm = norm(row);
    if (rowNorm <= args.tolerance) {
      return row.map(() => 0);
    }
    const required = Math.max(gapConstraintRows[index].requiredMargin, args.targetMargin);
    return row.map((value) => value / (rowNorm * required));
  });
  const zeroRows = normalizedRows
    .map((row, index) => ({ row, index }))
    .filter(({ row }) => norm(row) <= args.tolerance)
    .map(({ index }) => gapConstraintRows[index].id);
  if (zeroRows.length > 0) {
    const zero = Array(ids.length).fill(0);
    const evaluation = evaluateWitness(zero, structuralRows, gapConstraintRows);
    return result({
      status: "inconclusive",
      method: "zero_gap_derivative_rows",
      witness: null,
      evaluation,
      nullity: basis.length,
      note: `Gap rows have zero derivative on the structural tangent space: ${zeroRows.join(", ")}`,
    });
  }

  const found = perceptron(normalizedRows, basis.length, args.maxIterations, args.seed, args.tolerance);
  if (found.margin > args.tolerance) {
    const rawWitness = combineBasis(basis, found.z);
    const witnessInfinityNorm = infinityNorm(rawWitness);
    const witness =
      witnessInfinityNorm > args.tolerance ? scale(rawWitness, 1 / witnessInfinityNorm) : rawWitness;
    const evaluation = evaluateWitness(witness, structuralRows, gapConstraintRows);
    if (
      infinityNorm(witness) <= 1 + args.tolerance &&
      evaluation.maxStructuralResidual <= args.tolerance &&
      evaluation.minGapValue > args.tolerance
    ) {
      return result({
        status: "feasible",
        method: "nullspace_perceptron_strict_witness",
        witness,
        evaluation,
        nullity: basis.length,
        projectedMargin: found.margin,
        iterations: found.iterations,
      });
    }
  }

  const fallbackWitness = combineBasis(basis, found.z);
  const evaluation = evaluateWitness(fallbackWitness, structuralRows, gapConstraintRows);
  return result({
    status: "inconclusive",
    method: "nullspace_perceptron_no_strict_witness",
    witness: null,
    diagnosticCandidate: fallbackWitness,
    evaluation,
    nullity: basis.length,
    projectedMargin: found.margin,
    iterations: found.iterations,
    note: "No strict witness was found. This is not a proof of infeasibility.",
  });
}

function buildResult(input, ids, structuralRows, gapConstraintRows, scanResult) {
  const witnessObject = scanResult.witness ? vectorObject(ids, scanResult.witness) : null;
  const witnessInfinityNorm = scanResult.witness ? infinityNorm(scanResult.witness) : null;
  const diagnosticCandidateObject = scanResult.diagnosticCandidate
    ? vectorObject(ids, scanResult.diagnosticCandidate)
    : null;
  const tolerance = scanResult.tolerance ?? DEFAULT_TOLERANCE;
  const result = {
    schema: RESULT_SCHEMA,
    input_schema: input.schema,
    packet_id: input.packet_id ?? null,
    packet_identity: input.packet_identity ?? null,
    source: input.source ?? null,
    status: scanResult.status,
    theory_success_marker:
      scanResult.status === "feasible" ? "strict_null_coordinate_gap_opening_tangent_witness" : null,
    method: scanResult.method,
    claim_level:
      scanResult.status === "feasible"
        ? "strict tangent-space gap-opening witness for declared finite matrix"
        : "inconclusive; no infeasibility proof",
    branch_chart_authorized: false,
    preledger_pass: false,
    nullity: scanResult.nullity,
    variable_count: ids.length,
    structural_constraint_count: structuralRows.length,
    gap_constraint_count: gapConstraintRows.length,
    tolerance,
    normalization: "||xi||_inf <= 1",
    xi_infinity_norm: Number.isFinite(witnessInfinityNorm) ? cleanNumber(witnessInfinityNorm) : null,
    updates_live_ledger: false,
    B_xi_residual_verified_zero_with_tolerance:
      scanResult.status === "feasible" && scanResult.evaluation.maxStructuralResidual <= tolerance,
    B_xi_residual_certified_zero: false,
    rank_B_certified: false,
    kappa_observed_after_required_margin:
      scanResult.status === "feasible" ? cleanNumber(scanResult.evaluation.minGapValue) : null,
    max_structural_residual: cleanNumber(scanResult.evaluation.maxStructuralResidual),
    min_gap_value_after_required_margin: cleanNumber(scanResult.evaluation.minGapValue),
    witness: witnessObject,
    diagnostic_candidate: diagnosticCandidateObject,
    structural_rows: structuralRows.map((row, index) => ({
      id: row.id,
      residual: cleanNumber(scanResult.evaluation.structuralResiduals[index] ?? 0),
    })),
    gap_rows: gapConstraintRows.map((row, index) => ({
      id: row.id,
      value_after_required_margin: cleanNumber(scanResult.evaluation.gapValues[index] ?? 0),
      required_margin: row.requiredMargin,
      collar_id: row.metadata.collar_id ?? null,
      ledger: row.metadata.ledger ?? null,
    })),
    iterations: scanResult.iterations ?? null,
    projected_margin: Number.isFinite(scanResult.projectedMargin) ? cleanNumber(scanResult.projectedMargin) : null,
    note: scanResult.note ?? null,
    limitations: [
      "The scanner certifies only the declared finite tangent matrix, not a passed pre-ledger.",
      "A feasible witness must still be integrated into a fresh same-packet candidate and interval-validated.",
      "An inconclusive result is not a proof that no gap-opening direction exists.",
    ],
  };
  if (
    "basis_includes_fold_coordinate_columns" in input ||
    input.basis_definition?.basis_includes_fold_coordinate_columns !== undefined
  ) {
    result.basis_includes_fold_coordinate_columns = Boolean(
      input.basis_includes_fold_coordinate_columns ??
        input.basis_definition?.basis_includes_fold_coordinate_columns
    );
  }
  if ("uses_receiver_cover_ownership" in input) {
    result.uses_receiver_cover_ownership = Boolean(input.uses_receiver_cover_ownership);
  }
  if (Array.isArray(input.one_leaf_boundary_opening_constraints)) {
    result.one_leaf_boundary_opening_constraint_count = input.one_leaf_boundary_opening_constraints.length;
    result.one_leaf_min_boundary_opening_margin = Number.isFinite(
      input.one_leaf_boundary_opening_summary?.min_boundary_opening_margin
    )
      ? cleanNumber(input.one_leaf_boundary_opening_summary.min_boundary_opening_margin)
      : null;
    result.one_leaf_screen_level_success =
      input.one_leaf_boundary_opening_summary?.screen_level_success ?? null;
  }
  return result;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  if (!args.input) {
    throw new Error("Missing required --input PATH argument.");
  }
  const inputPath = path.resolve(args.input);
  const input = readJson(inputPath);
  const result = scan(input, args);
  result.input_path = inputPath;
  writeJson(args.out ? path.resolve(args.out) : null, result, args.pretty);
}

try {
  main();
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
