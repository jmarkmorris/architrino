#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  findOctahedralRoots,
  octahedralRootJacobian,
  octahedralSiteById,
  octahedralSitePosition,
  octahedralSiteTangent,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA =
  "neutral-braid-octahedral-coordinate-exposure-matrix/v1";

const PACKET_ID = "octahedral_coordinate_exposure_matrix";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 121;
const DEFAULT_Y_SUBDIVISIONS = 720;
const DEFAULT_FINITE_DIFFERENCE_EPSILON = 1e-5;
const FINITE_DIFFERENCE_MAX_ABS_TOLERANCE = 1e-8;
const FINITE_DIFFERENCE_FROBENIUS_TOLERANCE = 3e-8;
const ROOT_DOMAIN_MIN = 1e-9;
const ROOT_DOMAIN_MAX = 2.1;
const ROOT_TOLERANCE = 1e-12;
const DUPLICATE_ROOT_TOLERANCE = 1e-7;

function zeroMatrix() {
  return [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
}

function identityMatrix() {
  return [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
}

function addMatrix(left, right) {
  return left.map((row, rowIndex) => row.map((entry, colIndex) => entry + right[rowIndex][colIndex]));
}

function subtractMatrix(left, right) {
  return left.map((row, rowIndex) => row.map((entry, colIndex) => entry - right[rowIndex][colIndex]));
}

function scaleMatrix(matrix, factor) {
  return matrix.map((row) => row.map((entry) => factor * entry));
}

function matrixVector(matrix, vector) {
  return matrix.map((row) => dot(row, vector));
}

function matrixInner(left, right) {
  let sum = 0;
  for (let row = 0; row < 3; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      sum += left[row][col] * right[row][col];
    }
  }
  return sum;
}

function matrixFrobenius(matrix) {
  return Math.sqrt(matrixInner(matrix, matrix));
}

function maxAbsMatrix(matrix) {
  let result = 0;
  for (const row of matrix) {
    for (const entry of row) {
      result = Math.max(result, Math.abs(entry));
    }
  }
  return result;
}

function outer(left, right) {
  return left.map((leftEntry) => right.map((rightEntry) => leftEntry * rightEntry));
}

function traceFree(matrix) {
  const trace = matrix[0][0] + matrix[1][1] + matrix[2][2];
  const result = matrix.map((row) => [...row]);
  for (let index = 0; index < 3; index += 1) {
    result[index][index] -= trace / 3;
  }
  return result;
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

function phaseTheta(index, phaseSamples) {
  return (TAU * (index + 0.5)) / phaseSamples;
}

function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }
  return Number(value.toPrecision(12));
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

function curvature(site, theta) {
  return scale(octahedralSitePosition(site, theta), -1);
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

function deformedRootRow(receiver, source, theta, y, epsilon, coordinateMatrix) {
  const receiverPosition = deformedPosition(receiver, theta, epsilon, coordinateMatrix);
  const sourcePosition = deformedPosition(source, theta - y, epsilon, coordinateMatrix);
  const displacement = subtract(receiverPosition, sourcePosition);
  const distance = norm(displacement);
  const rhat = scale(displacement, 1 / distance);
  const tangent = deformedTangent(source, theta - y, epsilon, coordinateMatrix);
  const jacobian = 1 - dot(tangent, rhat);
  return { y, rhat, jacobian };
}

const COORDINATE_COLUMNS = [
  {
    id: "trace_I",
    kind: "mean-trace",
    description: "Retained coordinate scaling H = epsilon I; includes delayed endpoint and Jacobian variation.",
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

function analyticCoordinateContribution(coordinateMatrix, row) {
  const hRhat = matrixVector(coordinateMatrix, row.rhat);
  const stretch = dot(row.rhat, hRhat);
  const alpha = row.y * stretch;
  const deltaEta = alpha / row.jacobian;
  const deltaReceiver = matrixVector(coordinateMatrix, row.receiver_position);
  const deltaSource = matrixVector(coordinateMatrix, row.source_position);
  const deltaTangent = matrixVector(coordinateMatrix, row.source_tangent);
  const deltaFixedSeparation = subtract(deltaReceiver, deltaSource);
  const deltaDisplacement = add(deltaFixedSeparation, scale(row.source_tangent, deltaEta));
  const radialPart = dot(row.rhat, deltaDisplacement);
  const deltaRhat = scale(subtract(deltaDisplacement, scale(row.rhat, radialPart)), 1 / row.y);
  const deltaJ =
    -dot(row.rhat, deltaTangent) + dot(row.source_curvature, row.rhat) * deltaEta - dot(row.source_tangent, deltaRhat);

  const projector = traceFree(outer(row.rhat, row.rhat));
  const deltaProjector = addMatrix(outer(deltaRhat, row.rhat), outer(row.rhat, deltaRhat));
  const weight = 1 / (row.y * row.y * row.jacobian);
  const logWeightDerivative = -((2 * deltaEta) / row.y + deltaJ / row.jacobian);
  const matrix = scaleMatrix(addMatrix(deltaProjector, scaleMatrix(projector, logWeightDerivative)), weight);

  return {
    matrix,
    delta_eta: deltaEta,
    delta_jacobian: deltaJ,
    delta_rhat_norm: norm(deltaRhat),
    weight,
    projector,
  };
}

function rootSampleRows(theta, pairs, ySubdivisions) {
  const rows = [];
  const failures = [];

  for (const pair of pairs) {
    const receiver = octahedralSiteById(pair.receiver);
    const source = octahedralSiteById(pair.source);
    const roots = findOctahedralRoots(receiver, source, theta, ySubdivisions);
    if (roots.length !== 1) {
      failures.push({
        receiver: pair.receiver,
        source: pair.source,
        theta,
        root_count: roots.length,
      });
      continue;
    }

    const y = roots[0];
    const receiverPosition = octahedralSitePosition(receiver, theta);
    const sourcePosition = octahedralSitePosition(source, theta - y);
    const displacement = subtract(receiverPosition, sourcePosition);
    const distance = norm(displacement);
    const rhat = scale(displacement, 1 / distance);
    const jacobian = octahedralRootJacobian(receiver, source, theta, y);
    const sourceTangent = octahedralSiteTangent(source, theta - y);
    const sourceCurvature = curvature(source, theta - y);

    rows.push({
      receiver: pair.receiver,
      source: pair.source,
      y,
      jacobian,
      rhat,
      receiver_position: receiverPosition,
      source_position: sourcePosition,
      source_tangent: sourceTangent,
      source_curvature: sourceCurvature,
    });
  }

  return { rows, failures };
}

function exposureTensorForCoordinateMatrix(coordinateMatrix, epsilon, phaseSamples, ySubdivisions) {
  const pairs = orderedOctahedralPairs();
  const denominator = phaseSamples * pairs.length;
  const failures = [];
  let exposureAccumulator = zeroMatrix();
  let resolvedRowCount = 0;

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    for (const pair of pairs) {
      const receiver = octahedralSiteById(pair.receiver);
      const source = octahedralSiteById(pair.source);
      const roots = findDeformedRoots(receiver, source, theta, ySubdivisions, epsilon, coordinateMatrix);
      if (roots.length !== 1) {
        failures.push({
          receiver: pair.receiver,
          source: pair.source,
          theta,
          epsilon,
          root_count: roots.length,
        });
        continue;
      }

      const root = deformedRootRow(receiver, source, theta, roots[0], epsilon, coordinateMatrix);
      const weight = 1 / (root.y * root.y * root.jacobian);
      exposureAccumulator = addMatrix(exposureAccumulator, scaleMatrix(traceFree(outer(root.rhat, root.rhat)), weight));
      resolvedRowCount += 1;
    }
  }

  return {
    matrix: scaleMatrix(exposureAccumulator, 1 / denominator),
    failures,
    resolved_row_count: resolvedRowCount,
    expected_row_count: denominator,
  };
}

function finiteDifferenceColumn(coordinateMatrix, epsilon, phaseSamples, ySubdivisions) {
  const plus = exposureTensorForCoordinateMatrix(coordinateMatrix, epsilon, phaseSamples, ySubdivisions);
  const minus = exposureTensorForCoordinateMatrix(coordinateMatrix, -epsilon, phaseSamples, ySubdivisions);
  return {
    matrix: scaleMatrix(subtractMatrix(plus.matrix, minus.matrix), 1 / (2 * epsilon)),
    failures: [...plus.failures, ...minus.failures],
    resolved_row_count: plus.resolved_row_count + minus.resolved_row_count,
    expected_row_count: plus.expected_row_count + minus.expected_row_count,
  };
}

export function buildOctahedralCoordinateExposureMatrix(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  const finiteDifferenceEpsilon = Number(options.finiteDifferenceEpsilon ?? DEFAULT_FINITE_DIFFERENCE_EPSILON);
  if (!Number.isInteger(phaseSamples) || phaseSamples < 1) {
    throw new Error("phaseSamples must be a positive integer");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }
  if (!Number.isFinite(finiteDifferenceEpsilon) || finiteDifferenceEpsilon <= 0) {
    throw new Error("finiteDifferenceEpsilon must be a positive number");
  }

  const pairs = orderedOctahedralPairs();
  const denominator = phaseSamples * pairs.length;
  const columnAccumulators = COORDINATE_COLUMNS.map((column) => ({
    ...column,
    accumulator: zeroMatrix(),
    delta_eta_values: [],
    delta_jacobian_values: [],
    delta_rhat_norms: [],
  }));
  const failures = [];
  const delays = [];
  const jacobians = [];
  const weights = [];
  let exposureAccumulator = zeroMatrix();
  let resolvedRowCount = 0;

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    const sample = rootSampleRows(theta, pairs, ySubdivisions);
    failures.push(...sample.failures);

    for (const row of sample.rows) {
      resolvedRowCount += 1;
      delays.push(row.y);
      jacobians.push(row.jacobian);
      const baseWeight = 1 / (row.y * row.y * row.jacobian);
      weights.push(baseWeight);
      exposureAccumulator = addMatrix(exposureAccumulator, scaleMatrix(traceFree(outer(row.rhat, row.rhat)), baseWeight));

      for (const column of columnAccumulators) {
        const contribution = analyticCoordinateContribution(column.matrix, row);
        column.accumulator = addMatrix(column.accumulator, contribution.matrix);
        column.delta_eta_values.push(contribution.delta_eta);
        column.delta_jacobian_values.push(contribution.delta_jacobian);
        column.delta_rhat_norms.push(contribution.delta_rhat_norm);
      }
    }
  }

  const finiteDifferenceChecks = [];
  const columns = columnAccumulators.map((column) => {
    const matrix = scaleMatrix(column.accumulator, 1 / denominator);
    const output = {
      id: column.id,
      kind: column.kind,
      description: column.description ?? null,
      coordinate_matrix: column.matrix,
      matrix,
      rounded_matrix: formatMatrix(matrix),
      frobenius_norm: matrixFrobenius(matrix),
      delta_eta_max_abs: Math.max(...column.delta_eta_values.map((value) => Math.abs(value))),
      delta_jacobian_max_abs: Math.max(...column.delta_jacobian_values.map((value) => Math.abs(value))),
      delta_rhat_norm_max: Math.max(...column.delta_rhat_norms),
    };

    const finiteDifference = finiteDifferenceColumn(
      column.matrix,
      finiteDifferenceEpsilon,
      phaseSamples,
      ySubdivisions
    );
    const difference = subtractMatrix(output.matrix, finiteDifference.matrix);
    const check = {
      column_id: column.id,
      epsilon: finiteDifferenceEpsilon,
      analytic_matrix: output.matrix,
      finite_difference_matrix: finiteDifference.matrix,
      rounded_finite_difference_matrix: formatMatrix(finiteDifference.matrix),
      max_abs_error: maxAbsMatrix(difference),
      frobenius_error: matrixFrobenius(difference),
      failed_node_count: finiteDifference.failures.length,
      resolved_row_count: finiteDifference.resolved_row_count,
      expected_row_count: finiteDifference.expected_row_count,
    };
    finiteDifferenceChecks.push(check);
    output.finite_difference_check = check;

    return output;
  });

  return {
    schema: OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_root_ledger: "scripts/neutral-braid/octahedral-root-ledger.mjs",
    priority_packet: "reference/priorities/geometry-bridge/octahedral-full-coordinate-exposure-matrix.md",
    conventions: {
      seed: "rigid-octahedral-carrier",
      coordinate_chart: "nine-dimensional affine branch-coordinate variation delta Y_i = H Y_i",
      exposure_weights: "equal all-pairs W_ext=1",
      phase_measure: "midpoint average over [0, 2*pi) and ordered distinct pairs",
      root_weight: "w=1/(eta^2 J), using the certified positive-J octahedral ledger",
      included_rows: ["delayed endpoint", "source tangent", "source curvature", "Jacobian derivative"],
      fixed_rows: ["external exposure weights", "cycle measure", "event rows"],
      retention_claim: "coordinate derivative emitted for a rigid diagnostic row; force/action/event retention is not certified",
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      ordered_pair_count: pairs.length,
      expected_row_count: denominator,
      resolved_row_count: resolvedRowCount,
      failed_node_count: failures.length,
      finite_difference_epsilon: finiteDifferenceEpsilon,
    },
    sampled_summary: {
      delay_min: Math.min(...delays),
      delay_max: Math.max(...delays),
      jacobian_min: Math.min(...jacobians),
      jacobian_max: Math.max(...jacobians),
      weight_min: Math.min(...weights),
      weight_max: Math.max(...weights),
    },
    base_exposure_tf: {
      matrix: scaleMatrix(exposureAccumulator, 1 / denominator),
      rounded_matrix: formatMatrix(scaleMatrix(exposureAccumulator, 1 / denominator)),
    },
    coordinate_decomposition: {
      basis: "mean trace + symmetric trace-free + active rotation",
      columns,
      finite_difference_checks: finiteDifferenceChecks.map((check) => ({
        column_id: check.column_id,
        epsilon: check.epsilon,
        max_abs_error: check.max_abs_error,
        frobenius_error: check.frobenius_error,
        failed_node_count: check.failed_node_count,
        resolved_row_count: check.resolved_row_count,
        expected_row_count: check.expected_row_count,
      })),
      rotation_status: "gauge-covariant-frame-columns; quotient out unless a fixed external frame is intentionally retained",
    },
    failures,
    result: {
      coordinate_exposure_matrix: "same_ledger_affine_coordinate_matrix_emitted",
      finite_difference_validation: finiteDifferenceChecks.every(
        (check) =>
          check.failed_node_count === 0 &&
          check.max_abs_error <= FINITE_DIFFERENCE_MAX_ABS_TOLERANCE &&
          check.frobenius_error <= FINITE_DIFFERENCE_FROBENIUS_TOLERANCE
      )
        ? "passed"
        : "failed",
      theory_status: "octahedral-coordinate-exposure-matrix-closed-for-rigid-affine-chart",
      retention: "not_retained",
      first_failure_status: "rigid-octahedral-force-action-event-retention-rejected",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralCoordinateExposureMatrix(artifact) {
  const errors = [];
  assertField(artifact?.schema === OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA, "schema must match coordinate exposure matrix schema", errors);
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match coordinate exposure matrix packet", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(artifact?.numerical_method?.failed_node_count === 0, "all sampled root nodes must resolve exactly one base root", errors);
  assertField(
    artifact?.numerical_method?.resolved_row_count === artifact?.numerical_method?.expected_row_count,
    "resolved row count must match expected row count",
    errors
  );
  assertField(
    Array.isArray(artifact?.coordinate_decomposition?.columns) && artifact.coordinate_decomposition.columns.length === 9,
    "coordinate decomposition must emit nine columns",
    errors
  );
  assertField(
    artifact?.coordinate_decomposition?.columns?.filter((column) => column.kind === "symmetric-trace-free").length === 5,
    "coordinate decomposition must emit five symmetric trace-free columns",
    errors
  );
  assertField(
    artifact?.coordinate_decomposition?.columns?.filter((column) => column.kind === "rotation-gauge-covariant").length === 3,
    "coordinate decomposition must emit three rotation gauge-covariant columns",
    errors
  );
  assertField(
    artifact?.coordinate_decomposition?.finite_difference_checks?.length === 9,
    "finite-difference diagnostics must cover all nine columns",
    errors
  );
  assertField(
    artifact?.coordinate_decomposition?.finite_difference_checks?.every(
      (check) =>
        check.failed_node_count === 0 &&
        check.max_abs_error <= FINITE_DIFFERENCE_MAX_ABS_TOLERANCE &&
        check.frobenius_error <= FINITE_DIFFERENCE_FROBENIUS_TOLERANCE
    ),
    "finite-difference checks must pass tolerance",
    errors
  );
  assertField(
    artifact?.result?.theory_status === "octahedral-coordinate-exposure-matrix-closed-for-rigid-affine-chart",
    "result must close the rigid affine coordinate exposure matrix",
    errors
  );
  assertField(artifact?.result?.retention === "not_retained", "artifact must not claim retained branch status", errors);
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-coordinate-exposure-matrix.mjs [options]",
    "",
    "Options:",
    "  --samples <n>       Midpoint phase samples over [0, 2*pi) (default: 121)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2.1 (default: 720)",
    "  --fd-epsilon <x>    Central finite-difference epsilon (default: 1e-5)",
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
          schema: "neutral-braid-octahedral-coordinate-exposure-matrix-schema/v1",
          artifact_schema: OCTAHEDRAL_COORDINATE_EXPOSURE_MATRIX_SCHEMA,
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
    const errors = validateOctahedralCoordinateExposureMatrix(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          phase_sample_count: artifact.numerical_method?.phase_sample_count ?? null,
          result: artifact.result ?? null,
          finite_difference_checks: artifact.coordinate_decomposition?.finite_difference_checks ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralCoordinateExposureMatrix({
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
    finiteDifferenceEpsilon: args.finiteDifferenceEpsilon,
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
