#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  findOctahedralRoots,
  octahedralRootJacobian,
  octahedralSiteById,
  octahedralSitePosition,
  orderedOctahedralPairs,
} from "./octahedral-root-ledger.mjs";

const SCRIPT_PATH = fileURLToPath(import.meta.url);

export const OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA =
  "neutral-braid-octahedral-affine-exposure-probe/v1";

const PACKET_ID = "octahedral_affine_exposure_probe";
const PROMOTION_STATUS = "priority-only";
const TAU = 2 * Math.PI;
const DEFAULT_PHASE_SAMPLES = 181;
const DEFAULT_Y_SUBDIVISIONS = 720;
const EXPECTED_ZETA_DELTA_Z = -0.000680152657812;
const TRACE_ZETA_TOLERANCE = 5e-5;

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

function axialTensor() {
  const n = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
  return traceFree(outer(n, n));
}

const AFFINE_DECOMPOSITION_COLUMNS = [
  {
    id: "trace_I",
    kind: "mean-trace",
    description: "H = epsilon I; this is the closed isotropic affine exposure column.",
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

function exposureContribution(probeMatrix, rhat, y, jacobian) {
  const hRhat = matrixVector(probeMatrix, rhat);
  const stretch = dot(rhat, hRhat);
  const q = subtract(hRhat, scale(rhat, stretch));
  const projector = traceFree(outer(rhat, rhat));
  const deltaProjector = addMatrix(outer(q, rhat), outer(rhat, q));
  const weight = 1 / (y * y * jacobian);
  const rootTerm = addMatrix(deltaProjector, scaleMatrix(projector, (-2 * stretch) / jacobian));

  return {
    matrix: scaleMatrix(rootTerm, weight),
    stretch,
    q_norm: norm(q),
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

    rows.push({
      receiver: pair.receiver,
      source: pair.source,
      y,
      jacobian,
      rhat,
    });
  }

  return { rows, failures };
}

export function buildOctahedralAffineExposureProbe(options = {}) {
  const phaseSamples = Number.parseInt(options.phaseSamples ?? DEFAULT_PHASE_SAMPLES, 10);
  const ySubdivisions = Number.parseInt(options.ySubdivisions ?? DEFAULT_Y_SUBDIVISIONS, 10);
  if (!Number.isInteger(phaseSamples) || phaseSamples < 1) {
    throw new Error("phaseSamples must be a positive integer");
  }
  if (!Number.isInteger(ySubdivisions) || ySubdivisions < 10) {
    throw new Error("ySubdivisions must be an integer >= 10");
  }

  const pairs = orderedOctahedralPairs();
  const denominator = phaseSamples * pairs.length;
  const columnAccumulators = AFFINE_DECOMPOSITION_COLUMNS.map((column) => ({
    ...column,
    accumulator: zeroMatrix(),
  }));
  let exposureAccumulator = zeroMatrix();
  let resolvedRowCount = 0;
  const failures = [];
  const delays = [];
  const jacobians = [];
  const weights = [];

  for (let phaseIndex = 0; phaseIndex < phaseSamples; phaseIndex += 1) {
    const theta = phaseTheta(phaseIndex, phaseSamples);
    const sample = rootSampleRows(theta, pairs, ySubdivisions);
    failures.push(...sample.failures);

    for (const row of sample.rows) {
      resolvedRowCount += 1;
      delays.push(row.y);
      jacobians.push(row.jacobian);
      const weight = 1 / (row.y * row.y * row.jacobian);
      weights.push(weight);
      exposureAccumulator = addMatrix(exposureAccumulator, scaleMatrix(traceFree(outer(row.rhat, row.rhat)), weight));

      for (const column of columnAccumulators) {
        const contribution = exposureContribution(column.matrix, row.rhat, row.y, row.jacobian);
        column.accumulator = addMatrix(column.accumulator, contribution.matrix);
      }
    }
  }

  const exposureTf = scaleMatrix(exposureAccumulator, 1 / denominator);
  const columns = columnAccumulators.map((column) => {
    const matrix = scaleMatrix(column.accumulator, 1 / denominator);
    return {
      id: column.id,
      kind: column.kind,
      description: column.description ?? null,
      probe_matrix: column.matrix,
      matrix,
      rounded_matrix: formatMatrix(matrix),
      frobenius_norm: matrixFrobenius(matrix),
    };
  });

  const traceColumn = columns.find((column) => column.id === "trace_I");
  const axis = axialTensor();
  const axisNormSquared = matrixInner(axis, axis);
  const zetaEstimate = matrixInner(traceColumn.matrix, axis) / axisNormSquared;

  return {
    schema: OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA,
    packet_id: PACKET_ID,
    promotion_status: PROMOTION_STATUS,
    source_root_ledger: "scripts/neutral-braid/octahedral-root-ledger.mjs",
    priority_packet: "reference/priorities/braid-archive/braid-geometry-export-bridge/octahedral-affine-exposure-matrix.md",
    conventions: {
      seed: "rigid-octahedral-carrier",
      exposure_weights: "equal all-pairs W_ext=1",
      phase_measure: "midpoint average over [0, 2*pi) and ordered distinct pairs",
      root_weight: "w=1/(eta^2 J), using the certified positive-J octahedral ledger",
      probe: "fixed-ledger affine exposure readout",
      fixed_rows: ["branch labels", "external exposure weights", "cycle measure", "tangent rows", "Jacobian rows"],
      retention_claim: "not a retained branch derivative or observer-geometry certificate",
    },
    numerical_method: {
      phase_sample_count: phaseSamples,
      y_subdivision_count: ySubdivisions,
      ordered_pair_count: pairs.length,
      expected_row_count: denominator,
      resolved_row_count: resolvedRowCount,
      failed_node_count: failures.length,
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
      matrix: exposureTf,
      rounded_matrix: formatMatrix(exposureTf),
      frobenius_norm: matrixFrobenius(exposureTf),
    },
    affine_decomposition: {
      basis: "mean trace + symmetric trace-free + active rotation",
      columns,
      trace_column_summary: {
        column_id: "trace_I",
        zeta_delta_Z_estimate: zetaEstimate,
        expected_zeta_delta_Z: EXPECTED_ZETA_DELTA_Z,
        absolute_error: Math.abs(zetaEstimate - EXPECTED_ZETA_DELTA_Z),
        axial_tensor: axis,
        rounded_axial_tensor: formatMatrix(axis),
      },
      rotation_status: "gauge-covariant-frame-columns; quotient out unless a fixed external frame is intentionally retained",
    },
    failures,
    result: {
      affine_exposure_probe_matrix: "numerical_probe_matrix_emitted",
      theory_status: "octahedral-affine-exposure-probe-matrix-closed",
      retention: "not_retained",
      first_failure_status: "full-retained-branch-coordinate-matrix-not-emitted",
    },
  };
}

function assertField(condition, message, errors) {
  if (!condition) {
    errors.push(message);
  }
}

export function validateOctahedralAffineExposureProbe(artifact) {
  const errors = [];
  assertField(artifact?.schema === OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA, "schema must match affine exposure probe schema", errors);
  assertField(artifact?.packet_id === PACKET_ID, "packet id must match affine exposure probe packet", errors);
  assertField(artifact?.promotion_status === PROMOTION_STATUS, "promotion status must remain priority-only", errors);
  assertField(artifact?.numerical_method?.failed_node_count === 0, "all sampled root nodes must resolve exactly one root", errors);
  assertField(
    artifact?.numerical_method?.resolved_row_count === artifact?.numerical_method?.expected_row_count,
    "resolved row count must match expected row count",
    errors
  );
  assertField(
    Array.isArray(artifact?.affine_decomposition?.columns) && artifact.affine_decomposition.columns.length === 9,
    "affine decomposition must emit nine columns",
    errors
  );
  assertField(
    artifact?.affine_decomposition?.columns?.filter((column) => column.kind === "symmetric-trace-free").length === 5,
    "affine decomposition must emit five symmetric trace-free columns",
    errors
  );
  assertField(
    artifact?.affine_decomposition?.columns?.filter((column) => column.kind === "rotation-gauge-covariant").length === 3,
    "affine decomposition must emit three rotation gauge-covariant columns",
    errors
  );
  const zetaError = artifact?.affine_decomposition?.trace_column_summary?.absolute_error;
  assertField(Number.isFinite(zetaError) && zetaError <= TRACE_ZETA_TOLERANCE, "trace column must reproduce the known axial zeta coefficient within tolerance", errors);
  assertField(
    artifact?.result?.theory_status === "octahedral-affine-exposure-probe-matrix-closed",
    "result must close the affine exposure-probe matrix",
    errors
  );
  assertField(artifact?.result?.retention === "not_retained", "artifact must not claim retained branch status", errors);
  return errors;
}

function usage() {
  return [
    "Usage: node scripts/neutral-braid/octahedral-affine-exposure-probe.mjs [options]",
    "",
    "Options:",
    "  --samples <n>       Midpoint phase samples over [0, 2*pi) (default: 181)",
    "  --subdivisions <n>  Root-search subdivisions over 0 < y <= 2 (default: 720)",
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
          schema: "neutral-braid-octahedral-affine-exposure-probe-schema/v1",
          artifact_schema: OCTAHEDRAL_AFFINE_EXPOSURE_PROBE_SCHEMA,
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
    const errors = validateOctahedralAffineExposureProbe(artifact);
    process.stdout.write(
      printJson(
        {
          valid: errors.length === 0,
          errors,
          schema: artifact.schema,
          phase_sample_count: artifact.numerical_method?.phase_sample_count ?? null,
          result: artifact.result ?? null,
          trace_column_summary: artifact.affine_decomposition?.trace_column_summary ?? null,
        },
        args.pretty
      )
    );
    process.exitCode = errors.length === 0 ? 0 : 1;
    return;
  }

  const artifact = buildOctahedralAffineExposureProbe({
    phaseSamples: args.phaseSamples,
    ySubdivisions: args.ySubdivisions,
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
