#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  OCTAHEDRAL_SITES,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA =
  "neutral-braid-octahedral-affine-force-mean-derivative/v1";

const PACKET_ID = "octahedral_affine_force_mean_derivative";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 120;
const DEFAULT_Y_SUBDIVISIONS = 240;
const DEFAULT_FINITE_DIFFERENCE_EPSILON = 1e-5;
const DEFAULT_RANGE_TOLERANCE = 1e-8;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MAX = 2.1;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;

function identityMatrix() {
  return [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
}

function matrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function add(left, right) {
  return left.map((entry, index) => entry + right[index]);
}

function scale(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function subtract(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, entry, index) => sum + entry * right[index], 0);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function vectorNorm(vector) {
  return Math.hypot(...vector);
}

function phaseTheta(index, phaseSamples) {
  return (TAU * index) / phaseSamples;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  const rounded = Number(value.toFixed(12));
  return Math.abs(rounded) < 5e-13 ? 0 : rounded;
}

function formatMatrix(matrix) {
  return matrix.map((row) => row.map(formatNumber));
}

function deformedPosition(site, theta, epsilon, coordinateMatrix) {
  const position = octahedralSitePosition(site, theta);
  return add(position, scale(matrixVector(coordinateMatrix, position), epsilon));
}

function deformedTangent(site, theta, epsilon, coordinateMatrix) {
  const tangent = octahedralSiteTangent(site, theta);
  return add(tangent, scale(matrixVector(coordinateMatrix, tangent), epsilon));
}

function deformedRootEquation(receiver, source, theta, y, epsilon, coordinateMatrix) {
  const receiverPosition = deformedPosition(receiver, theta, epsilon, coordinateMatrix);
  const sourcePosition = deformedPosition(source, theta - y, epsilon, coordinateMatrix);
  return norm(subtract(receiverPosition, sourcePosition)) - y;
}

function bisectDeformedRoot(receiver, source, theta, left, right, epsilon, coordinateMatrix) {
  let a = left;
  let b = right;
  let fa = deformedRootEquation(receiver, source, theta, a, epsilon, coordinateMatrix);
  let fb = deformedRootEquation(receiver, source, theta, b, epsilon, coordinateMatrix);

  if (Math.abs(fa) <= ROOT_TOLERANCE) {
    return a;
  }
  if (Math.abs(fb) <= ROOT_TOLERANCE) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let step = 0; step < 80; step += 1) {
    const mid = 0.5 * (a + b);
    const fm = deformedRootEquation(receiver, source, theta, mid, epsilon, coordinateMatrix);
    if (Math.abs(fm) <= ROOT_TOLERANCE || Math.abs(b - a) <= ROOT_TOLERANCE) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }

  return 0.5 * (a + b);
}

function addUniqueRoot(roots, root) {
  if (!Number.isFinite(root)) {
    return;
  }
  if (root <= ROOT_DOMAIN_MIN || root > ROOT_DOMAIN_MAX + DUPLICATE_ROOT_TOLERANCE) {
    return;
  }
  if (!roots.some((candidate) => Math.abs(candidate - root) <= DUPLICATE_ROOT_TOLERANCE)) {
    roots.push(root);
  }
}

function findDeformedRoots(receiver, source, theta, ySubdivisions, epsilon, coordinateMatrix) {
  const roots = [];
  let previousY = ROOT_DOMAIN_MIN;
  let previousValue = deformedRootEquation(receiver, source, theta, previousY, epsilon, coordinateMatrix);

  for (let step = 1; step <= ySubdivisions; step += 1) {
    const y = ROOT_DOMAIN_MIN + ((ROOT_DOMAIN_MAX - ROOT_DOMAIN_MIN) * step) / ySubdivisions;
    const value = deformedRootEquation(receiver, source, theta, y, epsilon, coordinateMatrix);
    if (Math.abs(value) <= ROOT_TOLERANCE) {
      addUniqueRoot(roots, y);
    } else if (Number.isFinite(previousValue) && Number.isFinite(value) && previousValue * value < 0) {
      addUniqueRoot(roots, bisectDeformedRoot(receiver, source, theta, previousY, y, epsilon, coordinateMatrix));
    }
    previousY = y;
    previousValue = value;
  }

  return roots.sort((left, right) => left - right);
}

function deformedForceContribution(pair, theta, y, epsilon, coordinateMatrix) {
  const receiver = octahedralSiteById(pair.receiver);
  const source = octahedralSiteById(pair.source);
  const receiverPosition = deformedPosition(receiver, theta, epsilon, coordinateMatrix);
  const sourcePosition = deformedPosition(source, theta - y, epsilon, coordinateMatrix);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  const rhat = scale(displacement, 1 / distance);
  const sourceTangent = deformedTangent(source, theta - y, epsilon, coordinateMatrix);
  const jacobian = 1 - dot(sourceTangent, rhat);
  const receiverTangent = deformedTangent(receiver, theta, epsilon, coordinateMatrix);
  const receiverNormalNumerator = 1 - dot(receiverTangent, rhat);
  const receiverNormalFactor = receiverNormalNumerator / jacobian;
  const coefficient = pair.force_sign * Math.abs(receiverNormalFactor) / (y * y);
  return { force: scale(rhat, coefficient), jacobian };
}

function receiverTangentialForcing(receiver, theta, pairs, ySubdivisions, epsilon, coordinateMatrix) {
  const receiverTangent = deformedTangent(receiver, theta, epsilon, coordinateMatrix);
  let force = [0, 0, 0];
  const failures = [];

  for (const pair of pairs.filter((candidate) => candidate.receiver === receiver.id)) {
    const source = octahedralSiteById(pair.source);
    const roots = findDeformedRoots(receiver, source, theta, ySubdivisions, epsilon, coordinateMatrix);
    if (roots.length !== 1) {
      failures.push({
        receiver: pair.receiver,
        source: pair.source,
        root_count: roots.length,
      });
      continue;
    }
    force = add(force, deformedForceContribution(pair, theta, roots[0], epsilon, coordinateMatrix).force);
  }

  return {
    value: dot(receiverTangent, force),
    failures,
  };
}

function periodIntegralVector(epsilon, coordinateMatrix, phaseSamples, ySubdivisions) {
  const pairs = orderedOctahedralPairs();
  const valuesByReceiver = OCTAHEDRAL_SITES.map(() => []);
  const failures = [];

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    for (const [receiverIndex, receiver] of OCTAHEDRAL_SITES.entries()) {
      const forcing = receiverTangentialForcing(receiver, theta, pairs, ySubdivisions, epsilon, coordinateMatrix);
      if (forcing.failures.length > 0) {
        failures.push({
          phase_index: phaseIndex,
          receiver: receiver.id,
          receiver_label: receiver.label,
          theta,
          failures: forcing.failures,
        });
        continue;
      }
      valuesByReceiver[receiverIndex].push(forcing.value);
    }
  }

  return {
    vector: valuesByReceiver.map((values) => (values.reduce((sum, value) => sum + value, 0) / values.length) * TAU),
    failures,
  };
}

const AFFINE_COLUMNS = [
  {
    id: "trace_I",
    kind: "mean-trace",
    matrix: identityMatrix(),
  },
  {
    id: "shear_x_minus_y",
    kind: "symmetric-trace-free",
    matrix: [
      [1, 0, 0],
      [0, -1, 0],
      [0, 0, 0],
    ],
  },
  {
    id: "shear_x_plus_y_minus_2z",
    kind: "symmetric-trace-free",
    matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, -2],
    ],
  },
  {
    id: "shear_xy",
    kind: "symmetric-trace-free",
    matrix: [
      [0, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    id: "shear_xz",
    kind: "symmetric-trace-free",
    matrix: [
      [0, 0, 1],
      [0, 0, 0],
      [1, 0, 0],
    ],
  },
  {
    id: "shear_yz",
    kind: "symmetric-trace-free",
    matrix: [
      [0, 0, 0],
      [0, 0, 1],
      [0, 1, 0],
    ],
  },
  {
    id: "rotation_xy",
    kind: "rotation-gauge-covariant",
    matrix: [
      [0, -1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  {
    id: "rotation_xz",
    kind: "rotation-gauge-covariant",
    matrix: [
      [0, 0, -1],
      [0, 0, 0],
      [1, 0, 0],
    ],
  },
  {
    id: "rotation_yz",
    kind: "rotation-gauge-covariant",
    matrix: [
      [0, 0, 0],
      [0, 0, -1],
      [0, 1, 0],
    ],
  },
];

function columnsToMatrix(columns) {
  return OCTAHEDRAL_SITES.map((_, rowIndex) => columns.map((column) => column.derivative_vector[rowIndex]));
}

function matrixColumns(matrix) {
  return Array.from({ length: matrix[0].length }, (_, columnIndex) => matrix.map((row) => row[columnIndex]));
}

function subtractVector(left, right) {
  return left.map((entry, index) => entry - right[index]);
}

function scaleVector(vector, factor) {
  return vector.map((entry) => factor * entry);
}

function orthonormalColumnBasis(matrix, tolerance) {
  const basis = [];
  const independentColumns = [];
  matrixColumns(matrix).forEach((column, columnIndex) => {
    let residual = [...column];
    for (const basisVector of basis) {
      residual = subtractVector(residual, scaleVector(basisVector, dot(basisVector, residual)));
    }
    const residualNorm = vectorNorm(residual);
    if (residualNorm > tolerance) {
      basis.push(scaleVector(residual, 1 / residualNorm));
      independentColumns.push(columnIndex);
    }
  });
  return { basis, independentColumns };
}

function projectOntoBasis(vector, basis) {
  return basis.reduce(
    (projection, basisVector) => projection.map((entry, index) => entry + dot(basisVector, vector) * basisVector[index]),
    Array.from({ length: vector.length }, () => 0)
  );
}

function solveNormalEquations(matrix, target, tolerance) {
  const columnCount = matrix[0].length;
  const normal = Array.from({ length: columnCount }, () => Array.from({ length: columnCount }, () => 0));
  const rhs = Array.from({ length: columnCount }, () => 0);
  for (let row = 0; row < matrix.length; row += 1) {
    for (let col = 0; col < columnCount; col += 1) {
      rhs[col] += matrix[row][col] * target[row];
      for (let other = 0; other < columnCount; other += 1) {
        normal[col][other] += matrix[row][col] * matrix[row][other];
      }
    }
  }
  return solveLinearSystem(normal, rhs, tolerance);
}

function matrixWithColumns(matrix, columnIndices) {
  return matrix.map((row) => columnIndices.map((columnIndex) => row[columnIndex]));
}

function solveLinearSystem(matrix, vector, tolerance) {
  const size = matrix.length;
  const a = matrix.map((row, index) => [...row, vector[index]]);
  for (let pivotIndex = 0; pivotIndex < size; pivotIndex += 1) {
    let best = pivotIndex;
    for (let row = pivotIndex + 1; row < size; row += 1) {
      if (Math.abs(a[row][pivotIndex]) > Math.abs(a[best][pivotIndex])) {
        best = row;
      }
    }
    if (Math.abs(a[best][pivotIndex]) <= tolerance) {
      throw new Error("linear solve failed: singular normal matrix");
    }
    [a[pivotIndex], a[best]] = [a[best], a[pivotIndex]];
    const pivot = a[pivotIndex][pivotIndex];
    for (let col = pivotIndex; col <= size; col += 1) {
      a[pivotIndex][col] /= pivot;
    }
    for (let row = 0; row < size; row += 1) {
      if (row === pivotIndex) {
        continue;
      }
      const factor = a[row][pivotIndex];
      for (let col = pivotIndex; col <= size; col += 1) {
        a[row][col] -= factor * a[pivotIndex][col];
      }
    }
  }
  return a.map((row) => row[size]);
}

function multiplyMatrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function evaluateRange(matrix, target, tolerance) {
  const { basis, independentColumns } = orthonormalColumnBasis(matrix, tolerance);
  const projection = projectOntoBasis(target, basis);
  const residual = subtractVector(target, projection);
  const residualNorm = vectorNorm(residual);
  let coefficients = null;
  let fitted = null;
  let solveResidualNorm = null;
  let solveStatus = "least-squares-not-computed";
  try {
    const independentMatrix = matrixWithColumns(matrix, independentColumns);
    const reducedCoefficients = solveNormalEquations(independentMatrix, target, tolerance);
    const rawCoefficients = Array.from({ length: matrix[0].length }, () => 0);
    independentColumns.forEach((columnIndex, reducedIndex) => {
      rawCoefficients[columnIndex] = reducedCoefficients[reducedIndex];
    });
    const rawFitted = multiplyMatrixVector(matrix, rawCoefficients);
    coefficients = rawCoefficients.map(formatNumber);
    fitted = rawFitted.map(formatNumber);
    solveResidualNorm = formatNumber(vectorNorm(subtractVector(rawFitted, target)));
    solveStatus = "independent-column-solve-computed";
  } catch {
    solveStatus = "independent-column-solve-failed";
  }

  return {
    rank: basis.length,
    independent_column_indices: independentColumns,
    projection: projection.map(formatNumber),
    residual: residual.map(formatNumber),
    residual_norm_2: formatNumber(residualNorm),
    range_status: residualNorm <= tolerance ? "rhs-in-range" : "rhs-out-of-range",
    solve_status: solveStatus,
    alpha_vector: coefficients,
    fitted_rhs: fitted,
    solution_residual_norm_2: solveResidualNorm,
  };
}

function evaluateSingleColumnDirection(matrix, target, columnIndex, columnId) {
  const column = matrix.map((row) => row[columnIndex]);
  const denominator = dot(column, column);
  const alpha = denominator > 0 ? dot(column, target) / denominator : null;
  const fitted = alpha === null ? null : column.map((entry) => entry * alpha);
  const residual = fitted === null ? null : subtractVector(target, fitted);
  return {
    column_id: columnId,
    column_index: columnIndex,
    equation: `${columnId}*alpha=-M`,
    alpha: formatNumber(alpha),
    fitted_rhs: fitted === null ? null : fitted.map(formatNumber),
    residual_vector: residual === null ? null : residual.map(formatNumber),
    residual_norm_2: residual === null ? null : formatNumber(vectorNorm(residual)),
  };
}

export function buildOctahedralAffineForceMeanDerivative(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const finiteDifferenceEpsilon = Number(options.finiteDifferenceEpsilon ?? DEFAULT_FINITE_DIFFERENCE_EPSILON);
  const rangeTolerance = Number(options.rangeTolerance ?? DEFAULT_RANGE_TOLERANCE);
  if (!Number.isInteger(phaseSamples) || phaseSamples < 4) {
    throw new Error("phaseSamples must be an integer >= 4");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(finiteDifferenceEpsilon) || finiteDifferenceEpsilon <= 0) {
    throw new Error("finiteDifferenceEpsilon must be a positive number");
  }
  if (!Number.isFinite(rangeTolerance) || rangeTolerance < 0) {
    throw new Error("rangeTolerance must be nonnegative");
  }

  const zeroMatrix = identityMatrix().map((row) => row.map(() => 0));
  const base = periodIntegralVector(0, zeroMatrix, phaseSamples, ySubdivisions);
  const columns = AFFINE_COLUMNS.map((column) => {
    const plus = periodIntegralVector(finiteDifferenceEpsilon, column.matrix, phaseSamples, ySubdivisions);
    const minus = periodIntegralVector(-finiteDifferenceEpsilon, column.matrix, phaseSamples, ySubdivisions);
    const derivative = plus.vector.map((entry, index) => (entry - minus.vector[index]) / (2 * finiteDifferenceEpsilon));
    return {
      id: column.id,
      kind: column.kind,
      coordinate_matrix: column.matrix,
      derivative_vector: derivative,
      rounded_derivative_vector: derivative.map(formatNumber),
      plus_root_failure_count: plus.failures.length,
      minus_root_failure_count: minus.failures.length,
    };
  });
  const derivativeMatrix = columnsToMatrix(columns);
  const rhs = base.vector.map((entry) => -entry);
  const range = evaluateRange(derivativeMatrix, rhs, rangeTolerance);
  const traceDirection = evaluateSingleColumnDirection(derivativeMatrix, rhs, 0, "trace_I");
  const traceDirectionPassed = Number(traceDirection.residual_norm_2) <= rangeTolerance;

  return {
    schema: OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_root_ledger: "scripts/neutral-braid/octahedral-root-ledger.mjs",
    source_speed_ode: "scripts/neutral-braid/octahedral-speed-ode-diagnostic.mjs",
    priority_packet: "reference/priorities/braid-geometry-export-bridge/octahedral-affine-force-mean-derivative.md",
    conventions: {
      seed: "rigid-octahedral-carrier",
      coordinate_chart: "nine-dimensional affine branch-coordinate variation delta Y_i = H Y_i",
      finite_difference_scheme: "central-finite-difference",
      force_formula: "sum_j sign(q_i*q_j)*rhat_ij/(y_ij^2*abs(J_ij)); f_i(theta)=T_i(theta) dot force_i(theta)",
      integration_rule: "uniform periodic left-endpoint sum on [0, 2*pi)",
      retention_claim: "candidate first-order zero-mean affine force-mean correction only; no bounded-speed live ledger is certified",
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      finite_difference_epsilon: finiteDifferenceEpsilon,
      range_tolerance: rangeTolerance,
    },
    receiver_labels: OCTAHEDRAL_SITES.map((site) => site.label),
    base_period_integral_vector: base.vector.map(formatNumber),
    rhs_vector: rhs.map(formatNumber),
    affine_derivative_matrix: formatMatrix(derivativeMatrix),
    affine_columns: columns,
    range_certificate: range,
    trace_direction_certificate: traceDirection,
    root_failure_count: {
      base: base.failures.length,
      finite_difference_total: columns.reduce(
        (sum, column) => sum + column.plus_root_failure_count + column.minus_root_failure_count,
        0
      ),
    },
    result: {
      force_mean_derivative: "affine-coordinate-force-mean-derivative-emitted",
      range_status: range.range_status,
      candidate_correction_direction:
        range.range_status === "rhs-in-range" && traceDirectionPassed
          ? "candidate-affine-trace-direction-found"
          : "not_found",
      theory_status:
        range.range_status === "rhs-in-range"
          ? "candidate-affine-zero-mean-range-obstruction-removed"
          : "affine-coordinate-zero-mean-correction-obstructed",
      certifies_live_derivative_matrix: false,
      certifies_live_correction_direction: false,
      certifies_bounded_speed_live_ledger: false,
      retention: "not_retained",
      retained_branch: false,
      first_failure_status:
        range.range_status === "rhs-in-range"
          ? "live-ledger-derivative-open"
          : "affine-coordinate-zero-mean-range-obstructed",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralAffineForceMeanDerivative(artifact) {
  const errors = [];
  assertField(artifact?.schema === OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA, "schema must match affine force mean derivative schema", errors);
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match affine force mean derivative packet", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(Array.isArray(artifact?.receiver_labels) && artifact.receiver_labels.length === 6, "must emit six receiver labels", errors);
  assertField(
    Array.isArray(artifact?.affine_columns) && artifact.affine_columns.length === 9,
    "must emit nine affine derivative columns",
    errors
  );
  assertField(
    Array.isArray(artifact?.affine_derivative_matrix) &&
      artifact.affine_derivative_matrix.length === 6 &&
      artifact.affine_derivative_matrix.every((row) => Array.isArray(row) && row.length === 9),
    "affine derivative matrix must be 6x9",
    errors
  );
  assertField(artifact?.root_failure_count?.base === 0, "base row must have no root failures", errors);
  assertField(
    artifact?.root_failure_count?.finite_difference_total === 0,
    "finite-difference rows must have no root failures",
    errors
  );
  assertField(
    artifact?.range_certificate?.range_status === "rhs-in-range",
    "affine force mean derivative must put the negative mean vector in range",
    errors
  );
  assertField(
    Array.isArray(artifact?.range_certificate?.alpha_vector) &&
      artifact.range_certificate.alpha_vector.length === 9 &&
      artifact.range_certificate.alpha_vector.every(Number.isFinite),
    "affine range certificate must emit a finite nine-entry alpha vector",
    errors
  );
  assertField(
    Number.isFinite(artifact?.range_certificate?.solution_residual_norm_2) &&
      Number(artifact.range_certificate.solution_residual_norm_2) <= Number(artifact?.numerical_method?.range_tolerance),
    "affine solution residual must be within range tolerance",
    errors
  );
  assertField(
    artifact?.trace_direction_certificate?.column_id === "trace_I" &&
      Number.isFinite(artifact.trace_direction_certificate.alpha) &&
      Number(artifact.trace_direction_certificate.residual_norm_2) <= Number(artifact?.numerical_method?.range_tolerance),
    "trace_I column alone must certify the candidate affine correction direction",
    errors
  );
  assertField(
    artifact?.result?.certifies_live_derivative_matrix === false &&
      artifact?.result?.certifies_live_correction_direction === false &&
      artifact?.result?.certifies_bounded_speed_live_ledger === false,
    "artifact must not claim live derivative, live correction, or bounded-speed live-ledger certification",
    errors
  );
  assertField(artifact?.result?.retention === "not_retained", "artifact must not claim retained branch status", errors);
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-affine-force-mean-derivative.mjs [options]",
    "",
    "Options:",
    "  --samples <n>       Periodic phase samples over [0, 2*pi) (default: 120)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2.1 (default: 240)",
    "  --fd-epsilon <x>    Central finite-difference epsilon (default: 1e-5)",
    "  --range-tol <x>     Range/correction residual tolerance (default: 1e-8)",
    "  --out <path>        Write artifact JSON to path instead of stdout",
    "  --validate <path>   Validate an existing artifact JSON file",
    "  --schema            Print the artifact schema identifier",
    "  --pretty            Pretty-print JSON output",
    "  --help              Print this help text",
  ].join("\n");
}

function parseArgs(argv) {
  const args = {
    phaseSamples: DEFAULT_PHASE_SAMPLES,
    ySubdivisions: DEFAULT_Y_SUBDIVISIONS,
    finiteDifferenceEpsilon: DEFAULT_FINITE_DIFFERENCE_EPSILON,
    rangeTolerance: DEFAULT_RANGE_TOLERANCE,
    out: null,
    validate: null,
    schema: false,
    pretty: false,
    help: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--samples") {
      args.phaseSamples = Number.parseInt(argv[++index], 10);
    } else if (arg === "--subdivisions") {
      args.ySubdivisions = Number.parseInt(argv[++index], 10);
    } else if (arg === "--fd-epsilon") {
      args.finiteDifferenceEpsilon = Number(argv[++index]);
    } else if (arg === "--range-tol") {
      args.rangeTolerance = Number(argv[++index]);
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--validate") {
      args.validate = argv[++index];
    } else if (arg === "--schema") {
      args.schema = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else {
      throw new Error(`unknown argument: ${arg}`);
    }
  }

  return args;
}

function printJson(value, pretty) {
  return `${JSON.stringify(value, null, pretty ? 2 : 0)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    process.stdout.write(`${usage()}\n`);
    return;
  }
  if (args.schema) {
    process.stdout.write(
      printJson(
        {
          schema: "neutral-braid-octahedral-affine-force-mean-derivative-schema/v1",
          artifact_schema: OCTAHEDRAL_AFFINE_FORCE_MEAN_DERIVATIVE_SCHEMA,
          promotion_status: PROMOTION_STATUS,
          packet_id: PACKET_ID,
        },
        args.pretty
      )
    );
    return;
  }
  if (args.validate) {
    const artifact = JSON.parse(fs.readFileSync(args.validate, "utf8"));
    const errors = validateOctahedralAffineForceMeanDerivative(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          phase_sample_count: artifact.numerical_method?.phase_sample_count ?? null,
          result: artifact.result ?? null,
          range_certificate: artifact.range_certificate ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralAffineForceMeanDerivative({
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    finiteDifferenceEpsilon: args.finiteDifferenceEpsilon,
    rangeTolerance: args.rangeTolerance,
  });
  const output = printJson(artifact, args.pretty);
  if (args.out) {
    fs.mkdirSync(path.dirname(args.out), { recursive: true });
    fs.writeFileSync(args.out, output);
  } else {
    process.stdout.write(output);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === SCRIPT_PATH) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}
