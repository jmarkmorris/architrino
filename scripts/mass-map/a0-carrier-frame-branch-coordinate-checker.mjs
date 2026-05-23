#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const LEDGER_SCHEMA = "a0-tier1-refined-residual-basis-ledger/v1";
const CARRIER_SPECTRUM_SCHEMA = "a0-carrier-frame-residual-spectrum/v1";
const OUTPUT_SCHEMA = "a0-carrier-frame-branch-coordinate-checker/v1";
const OUTPUT_ROW_SCHEMA = "a0-carrier-frame-branch-coordinate-checker-row/v1";
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";
const DEFAULT_TOLERANCE = 0.02;
const DEFAULT_RIDGE = 1e-12;
const FRAME_TIME_RULES = ["nearest", "linear"];
const FAMILY_SELECTOR_VALUES = [
  "all",
  "radial_deformation",
  "radial_phase_state",
  "radial_tangential_phase_state",
];
const BODY_IDS = ["I+", "I-"];
const COMPONENTS = ["x", "y", "z"];
const FAMILY_DEFINITIONS = [
  {
    family_id: "radial_deformation",
    frame_components: ["radial"],
    scalar_channels: ["radius_delta"],
    source_declaration: "corrected_carrier_state",
  },
  {
    family_id: "radial_phase_state",
    frame_components: ["radial"],
    scalar_channels: ["radius_delta", "radial_velocity_delta"],
    source_declaration: "corrected_carrier_state",
  },
  {
    family_id: "radial_tangential_phase_state",
    frame_components: ["radial", "tangential"],
    scalar_channels: ["radius_delta", "radial_velocity_delta"],
    source_declaration: "corrected_carrier_state",
  },
];
const SOURCE_SCALAR_CHANNELS = [
  ...new Set(FAMILY_DEFINITIONS.flatMap((family) => family.scalar_channels)),
];

function parseArgs(argv) {
  const args = {
    intake: null,
    carrierSpectrum: null,
    rows: "all",
    coordinateFamily: "all",
    frameTimeRule: "linear",
    tolerance: DEFAULT_TOLERANCE,
    ridge: DEFAULT_RIDGE,
    out: null,
    pretty: false,
    help: false,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--intake") {
      args.intake = argv[++index];
    } else if (arg === "--carrier-spectrum") {
      args.carrierSpectrum = argv[++index];
    } else if (arg === "--rows") {
      args.rows = argv[++index];
    } else if (arg === "--coordinate-family") {
      args.coordinateFamily = parseChoice(argv[++index], "--coordinate-family", FAMILY_SELECTOR_VALUES);
    } else if (arg === "--frame-time-rule") {
      args.frameTimeRule = parseChoice(argv[++index], "--frame-time-rule", FRAME_TIME_RULES);
    } else if (arg === "--tolerance") {
      args.tolerance = parsePositiveNumber(argv[++index], "--tolerance");
    } else if (arg === "--ridge") {
      args.ridge = parseNonnegativeNumber(argv[++index], "--ridge");
    } else if (arg === "--out") {
      args.out = argv[++index];
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-carrier-frame-branch-coordinate-checker.mjs --intake PATH [options]

Options:
  --intake PATH              JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --carrier-spectrum PATH    Optional a0-carrier-frame-residual-spectrum/v1 artifact for context only.
  --rows VALUE               "all" or a comma-separated row list. Defaults to all.
  --coordinate-family VALUE  all, radial_deformation, radial_phase_state, or radial_tangential_phase_state. Defaults to all.
  --frame-time-rule VALUE    nearest or linear. Defaults to linear.
  --tolerance N              Held-out relative residual tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --ridge N                  Ridge added to normal-equation diagonal. Defaults to ${DEFAULT_RIDGE}.
  --out PATH                 Write JSON output to a file instead of stdout.
  --pretty                   Pretty-print JSON.
  --help                     Show this help.

This checker tests source-derived corrected-carrier I-frame deformation
coordinates against the existing I sampled forcing residual. It never uses
residual labels to build features and never authorizes corrected rerun or
accepted history.`);
}

function parseChoice(value, name, choices) {
  if (!choices.includes(value)) {
    throw new Error(`Expected ${name} to be one of ${choices.join(", ")}, got: ${value}`);
  }
  return value;
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

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeJson(args, output) {
  const text = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(path.resolve(args.out), `${text}\n`);
  } else {
    console.log(text);
  }
}

function requireIntake(args) {
  if (!args.intake) {
    throw new Error("Missing required --intake PATH argument.");
  }
  return path.resolve(args.intake);
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

function baselineLedger(row) {
  return row?.residual_ledgers?.[LEDGER_KEY] ?? null;
}

function rowMissingFields(row) {
  const missing = [];
  const ledger = baselineLedger(row);
  const forcing = ledger?.sampled_forcing;
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (!Number.isFinite(row?.period) || row.period <= 0) {
    missing.push("rows[].period");
  }
  if (!Array.isArray(row?.samples) || row.samples.length < 2) {
    missing.push("rows[].samples[2+]");
  } else {
    for (const [sampleIndex, sample] of row.samples.entries()) {
      if (!Number.isFinite(sample?.t)) {
        missing.push(`rows[].samples[${sampleIndex}].t`);
      }
      for (const bodyId of BODY_IDS) {
        if (!finiteVector3(sample?.bodies?.[bodyId]?.position)) {
          missing.push(`rows[].samples[${sampleIndex}].bodies.${bodyId}.position[3]`);
        }
        if (!finiteVector3(sample?.bodies?.[bodyId]?.velocity)) {
          missing.push(`rows[].samples[${sampleIndex}].bodies.${bodyId}.velocity[3]`);
        }
      }
    }
  }
  if (ledger?.schema !== LEDGER_SCHEMA) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.schema=${LEDGER_SCHEMA}`);
  }
  if (!Number.isFinite(forcing?.period) || forcing.period <= 0) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.period`);
  }
  if (!Array.isArray(forcing?.samples) || forcing.samples.length < 4) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.samples[4+]`);
  } else {
    for (const [sampleIndex, sample] of forcing.samples.entries()) {
      if (!Number.isFinite(sample?.t)) {
        missing.push(`sampled_forcing.samples[${sampleIndex}].t`);
      }
      if (!finiteVector3(sample?.layers?.I?.residual_forcing)) {
        missing.push(`sampled_forcing.samples[${sampleIndex}].layers.I.residual_forcing[3]`);
      }
    }
  }
  return missing;
}

function modulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function circularDistance(left, right, period) {
  const raw = Math.abs(modulo(left, period) - modulo(right, period));
  return Math.min(raw, Math.abs(period - raw));
}

function nearestCarrierMatch(samples, t, period) {
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const sample of samples) {
    const distance = circularDistance(Number(sample.t), t, period);
    if (Number.isFinite(distance) && distance < bestDistance) {
      bestDistance = distance;
    }
  }
  const tolerance = Math.max(Math.abs(period) * 1e-10, 1e-12);
  const matches = samples.filter((sample) => circularDistance(Number(sample.t), t, period) <= bestDistance + tolerance);
  return {
    sample: matches[0] ?? null,
    nearest_distance: Number.isFinite(bestDistance) ? bestDistance : null,
    tie_count: matches.length,
  };
}

function interpolateVector(left, right, alpha) {
  return left.map((value, index) => value + alpha * (right[index] - value));
}

function linearCarrierMatch(samples, t) {
  const sorted = [...samples].sort((left, right) => left.t - right.t);
  if (sorted.length === 0 || !Number.isFinite(t)) {
    return {
      sample: null,
      interpolation_status: "missing",
      interpolation_gap: null,
    };
  }
  for (const sample of sorted) {
    if (sample.t === t) {
      return {
        sample,
        interpolation_status: "exact",
        interpolation_gap: 0,
      };
    }
  }
  for (let index = 0; index < sorted.length - 1; index += 1) {
    const left = sorted[index];
    const right = sorted[index + 1];
    if (left.t <= t && t <= right.t && right.t > left.t) {
      const alpha = (t - left.t) / (right.t - left.t);
      return {
        sample: {
          t,
          bodies: {
            "I+": {
              position: interpolateVector(left.bodies["I+"].position, right.bodies["I+"].position, alpha),
              velocity: interpolateVector(left.bodies["I+"].velocity, right.bodies["I+"].velocity, alpha),
            },
            "I-": {
              position: interpolateVector(left.bodies["I-"].position, right.bodies["I-"].position, alpha),
              velocity: interpolateVector(left.bodies["I-"].velocity, right.bodies["I-"].velocity, alpha),
            },
          },
        },
        interpolation_status: "interpolated",
        interpolation_gap: 0,
      };
    }
  }
  const nearest = sorted
    .map((sample) => ({ sample, gap: Math.abs(sample.t - t) }))
    .sort((left, right) => left.gap - right.gap)[0];
  return {
    sample: nearest?.sample ?? null,
    interpolation_status: "outside_sample_window",
    interpolation_gap: nearest?.gap ?? null,
  };
}

function carrierMatch(row, t, frameTimeRule) {
  const nearest = nearestCarrierMatch(row.samples, t, row.period);
  if (frameTimeRule === "linear") {
    const linear = linearCarrierMatch(row.samples, t);
    return {
      sample: linear.sample,
      match_rule: "linear",
      interpolation_status: linear.interpolation_status,
      interpolation_gap: linear.interpolation_gap,
      nearest_distance: nearest.nearest_distance,
      tie_count: nearest.tie_count,
    };
  }
  return {
    sample: nearest.sample,
    match_rule: "nearest",
    interpolation_status: "not_used",
    interpolation_gap: null,
    nearest_distance: nearest.nearest_distance,
    tie_count: nearest.tie_count,
  };
}

function vectorSubtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function cross(left, right) {
  return [
    left[1] * right[2] - left[2] * right[1],
    left[2] * right[0] - left[0] * right[2],
    left[0] * right[1] - left[1] * right[0],
  ];
}

function norm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function normalize(vector, fallback = [1, 0, 0]) {
  const length = norm(vector);
  if (!Number.isFinite(length) || length < 1e-14) {
    return fallback;
  }
  return vector.map((value) => value / length);
}

function scale(vector, scalar) {
  return vector.map((value) => value * scalar);
}

function fallbackTangent(eR) {
  const zCross = cross([0, 0, 1], eR);
  if (norm(zCross) >= 1e-14) {
    return normalize(zCross);
  }
  return normalize(cross([1, 0, 0], eR), [0, 1, 0]);
}

function carrierFrame(sample) {
  const relPosition = vectorSubtract(sample.bodies["I+"].position, sample.bodies["I-"].position);
  const relVelocity = vectorSubtract(sample.bodies["I+"].velocity, sample.bodies["I-"].velocity);
  const eR = normalize(relPosition);
  const radialVelocity = dot(relVelocity, eR);
  const tangential = vectorSubtract(relVelocity, scale(eR, radialVelocity));
  const tangentialNorm = norm(tangential);
  const usedTangentFallback = tangentialNorm < 1e-14;
  const eTheta = normalize(tangential, fallbackTangent(eR));
  const eN = normalize(cross(eR, eTheta), [0, 0, 1]);
  const radius = norm(relPosition);
  return {
    components: {
      radial: eR,
      tangential: eTheta,
      normal: eN,
    },
    kinematics: {
      radius,
      radial_velocity: radialVelocity,
      tangential_speed: tangentialNorm,
      angular_velocity: radius > 0 ? dot(cross(relPosition, relVelocity), eN) / (radius * radius) : null,
      used_tangent_fallback: usedTangentFallback,
    },
  };
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / Math.max(values.length, 1);
}

function sourceMeans(records) {
  return {
    radius: mean(records.map((record) => record.frame.kinematics.radius)),
    radial_velocity: mean(records.map((record) => record.frame.kinematics.radial_velocity)),
    tangential_speed: mean(records.map((record) => record.frame.kinematics.tangential_speed)),
    angular_velocity: mean(records.map((record) => record.frame.kinematics.angular_velocity ?? 0)),
  };
}

function sourceScalars(frame, means) {
  return {
    radius_delta: frame.kinematics.radius - means.radius,
    radial_velocity_delta: frame.kinematics.radial_velocity - means.radial_velocity,
    tangential_speed_delta: frame.kinematics.tangential_speed - means.tangential_speed,
    angular_velocity_delta: (frame.kinematics.angular_velocity ?? 0) - means.angular_velocity,
  };
}

function analysisRecords(row, frameTimeRule) {
  const forcingSamples = baselineLedger(row).sampled_forcing.samples;
  const rawRecords = forcingSamples.map((sample, index) => {
    const match = carrierMatch(row, sample.t, frameTimeRule);
    if (!match.sample) {
      return {
        status: "blocked",
        failure_code: "missing-carrier-state-at-forcing-time",
        index,
        t: sample.t,
        match,
      };
    }
    return {
      status: "computed",
      index,
      t: sample.t,
      residual: sample.layers.I.residual_forcing,
      match,
      frame: carrierFrame(match.sample),
    };
  });
  const blocked = rawRecords.find((record) => record.status !== "computed");
  if (blocked) {
    return {
      status: "blocked",
      failure_code: blocked.failure_code,
      missing_fields: [`row.samples corrected carrier state at t=${blocked.t}`],
      records: rawRecords,
    };
  }
  const means = sourceMeans(rawRecords);
  return {
    status: "computed",
    means,
    records: rawRecords.map((record) => ({
      ...record,
      source_scalars: sourceScalars(record.frame, means),
    })),
  };
}

function featureNamesForFamily(family) {
  const names = [];
  for (const component of family.frame_components) {
    for (const scalar of family.scalar_channels) {
      names.push(`${scalar}:${component}`);
    }
  }
  return names;
}

function featureVectorForRecord(record, family) {
  const values = [];
  for (const component of family.frame_components) {
    const direction = record.frame.components[component];
    for (const scalar of family.scalar_channels) {
      const scalarValue = record.source_scalars[scalar];
      values.push({ scalar_value: scalarValue, direction });
    }
  }
  return values;
}

function equationPacket(records, family) {
  const featureNames = featureNamesForFamily(family);
  const equationRows = [];
  const targets = [];
  for (const record of records) {
    const features = featureVectorForRecord(record, family);
    for (let component = 0; component < COMPONENTS.length; component += 1) {
      equationRows.push({
        sample_index: record.index,
        component: COMPONENTS[component],
        values: features.map((feature) => feature.scalar_value * feature.direction[component]),
      });
      targets.push(record.residual[component]);
    }
  }
  return {
    family_id: family.family_id,
    source_declaration: family.source_declaration,
    feature_names: featureNames,
    sample_count: records.length,
    equation_count: equationRows.length,
    equation_rows: equationRows,
    targets,
  };
}

function normalFor(rows, ridge) {
  const columnCount = rows[0]?.length ?? 0;
  const normal = Array.from({ length: columnCount }, () => new Array(columnCount).fill(0));
  for (const row of rows) {
    for (let i = 0; i < columnCount; i += 1) {
      for (let j = 0; j < columnCount; j += 1) {
        normal[i][j] += row[i] * row[j];
      }
    }
  }
  for (let index = 0; index < columnCount; index += 1) {
    normal[index][index] += ridge;
  }
  return normal;
}

function solveLinearSystem(matrix, rhs, epsilon = 1e-14) {
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
      return null;
    }
    [augmented[pivot], augmented[pivotRow]] = [augmented[pivotRow], augmented[pivot]];
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

function matrixRank(matrix, epsilon = 1e-10) {
  if (!Array.isArray(matrix) || matrix.length === 0) {
    return 0;
  }
  const rows = matrix.map((row) => [...row]);
  const rowCount = rows.length;
  const columnCount = rows[0]?.length ?? 0;
  let rank = 0;
  for (let column = 0; column < columnCount && rank < rowCount; column += 1) {
    let pivotRow = rank;
    for (let row = rank + 1; row < rowCount; row += 1) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivotRow][column])) {
        pivotRow = row;
      }
    }
    if (Math.abs(rows[pivotRow][column]) <= epsilon) {
      continue;
    }
    [rows[rank], rows[pivotRow]] = [rows[pivotRow], rows[rank]];
    const pivot = rows[rank][column];
    for (let col = column; col < columnCount; col += 1) {
      rows[rank][col] /= pivot;
    }
    for (let row = 0; row < rowCount; row += 1) {
      if (row === rank) {
        continue;
      }
      const factor = rows[row][column];
      for (let col = column; col < columnCount; col += 1) {
        rows[row][col] -= factor * rows[rank][col];
      }
    }
    rank += 1;
  }
  return rank;
}

function fitRows(equationRows, targets, ridge) {
  const matrix = equationRows.map((row) => row.values);
  const normal = normalFor(matrix, ridge);
  const rhs = new Array(matrix[0]?.length ?? 0).fill(0);
  for (let row = 0; row < matrix.length; row += 1) {
    for (let column = 0; column < rhs.length; column += 1) {
      rhs[column] += matrix[row][column] * targets[row];
    }
  }
  return solveLinearSystem(normal, rhs);
}

function residualFor(equationRows, targets, coefficients) {
  let residualNormSquared = 0;
  let targetNormSquared = 0;
  for (let index = 0; index < equationRows.length; index += 1) {
    const predicted = dot(equationRows[index].values, coefficients);
    const residual = targets[index] - predicted;
    residualNormSquared += residual * residual;
    targetNormSquared += targets[index] * targets[index];
  }
  return {
    residual_norm: Math.sqrt(residualNormSquared),
    target_norm: Math.sqrt(targetNormSquared),
    relative_residual: Math.sqrt(residualNormSquared / Math.max(targetNormSquared, Number.EPSILON)),
  };
}

function fullFit(packet, ridge) {
  const coefficients = fitRows(packet.equation_rows, packet.targets, ridge);
  if (!coefficients) {
    return {
      status: "blocked",
      failure_code: "full-fit-normal-equation-singular",
      residual_norm: null,
      target_norm: null,
      relative_residual: null,
    };
  }
  return {
    status: "computed",
    failure_code: null,
    coefficients,
    ...residualFor(packet.equation_rows, packet.targets, coefficients),
  };
}

function splitFit(packet, ridge, fitSelector, testSelector) {
  const fitIndexes = [];
  const testIndexes = [];
  for (let index = 0; index < packet.equation_rows.length; index += 1) {
    const sampleIndex = packet.equation_rows[index].sample_index;
    if (fitSelector(sampleIndex)) {
      fitIndexes.push(index);
    }
    if (testSelector(sampleIndex)) {
      testIndexes.push(index);
    }
  }
  if (fitIndexes.length === 0 || testIndexes.length === 0) {
    return {
      status: "blocked",
      failure_code: "empty-fit-or-holdout-split",
      residual_norm: null,
      target_norm: null,
      relative_residual: null,
      fit_equation_count: fitIndexes.length,
      holdout_equation_count: testIndexes.length,
    };
  }
  const fitRowsForSplit = fitIndexes.map((index) => packet.equation_rows[index]);
  const fitTargets = fitIndexes.map((index) => packet.targets[index]);
  const coefficients = fitRows(fitRowsForSplit, fitTargets, ridge);
  if (!coefficients) {
    return {
      status: "blocked",
      failure_code: "holdout-normal-equation-singular",
      residual_norm: null,
      target_norm: null,
      relative_residual: null,
      fit_equation_count: fitIndexes.length,
      holdout_equation_count: testIndexes.length,
    };
  }
  const testRowsForSplit = testIndexes.map((index) => packet.equation_rows[index]);
  const testTargets = testIndexes.map((index) => packet.targets[index]);
  return {
    status: "computed",
    failure_code: null,
    ...residualFor(testRowsForSplit, testTargets, coefficients),
    fit_equation_count: fitIndexes.length,
    holdout_equation_count: testIndexes.length,
  };
}

function heldOutResidual(packet, ridge, tolerance) {
  const half = Math.floor(packet.sample_count / 2);
  const splits = {
    even_to_odd: splitFit(packet, ridge, (index) => index % 2 === 0, (index) => index % 2 === 1),
    odd_to_even: splitFit(packet, ridge, (index) => index % 2 === 1, (index) => index % 2 === 0),
    first_half_to_second_half: splitFit(packet, ridge, (index) => index < half, (index) => index >= half),
    second_half_to_first_half: splitFit(packet, ridge, (index) => index >= half, (index) => index < half),
  };
  const computed = Object.values(splits).filter((split) => split.status === "computed");
  const maxRelativeResidual = computed.length
    ? Math.max(...computed.map((split) => split.relative_residual))
    : Number.POSITIVE_INFINITY;
  const passed =
    computed.length === Object.values(splits).length &&
    Number.isFinite(maxRelativeResidual) &&
    maxRelativeResidual <= tolerance;
  return {
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "overfit_holdout_fail",
    tolerance,
    held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
    max_held_out_relative_residual: Number.isFinite(maxRelativeResidual) ? maxRelativeResidual : null,
    splits,
  };
}

function dfGuard(packet, ridge) {
  const matrix = packet.equation_rows.map((row) => row.values);
  const normal = normalFor(matrix, ridge);
  const leverages = matrix.map((row) => {
    const solved = solveLinearSystem(normal, row);
    return solved ? dot(row, solved) : Number.POSITIVE_INFINITY;
  });
  const featureCount = matrix[0]?.length ?? 0;
  const equationCount = matrix.length;
  const activeCounts = new Array(featureCount).fill(0);
  for (const row of matrix) {
    for (let column = 0; column < featureCount; column += 1) {
      if (Number.isFinite(row[column]) && Math.abs(row[column]) > 1e-14) {
        activeCounts[column] += 1;
      }
    }
  }
  const featureRank = matrixRank(matrix);
  const passed =
    equationCount > featureCount &&
    featureCount / Math.max(equationCount, 1) <= 0.5 &&
    Math.max(...leverages) <= 0.5 &&
    Math.min(...activeCounts) >= 2 &&
    featureRank === featureCount;
  return {
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "df_guard_fail",
    equation_count: equationCount,
    coefficient_count: featureCount,
    overdetermined: equationCount > featureCount,
    trace_h_over_equations: featureCount / Math.max(equationCount, 1),
    max_leverage: Math.max(...leverages),
    minimum_observation_rows_per_feature: Math.min(...activeCounts),
    per_feature_active_counts: activeCounts,
    feature_rank: featureRank,
    full_column_rank: featureRank === featureCount,
  };
}

function selectedFamilies(selector) {
  if (selector === "all") {
    return FAMILY_DEFINITIONS;
  }
  return FAMILY_DEFINITIONS.filter((family) => family.family_id === selector);
}

function familyStatus(df, heldOut) {
  if (df.status !== "passed") {
    return "carrier_frame_branch_coordinate_df_fail";
  }
  if (heldOut.status === "passed") {
    return "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority";
  }
  return "carrier_frame_branch_coordinate_no_go";
}

function scanFamily(records, family, args) {
  const packet = equationPacket(records, family);
  const full = fullFit(packet, args.ridge);
  const df = dfGuard(packet, args.ridge);
  const heldOut = heldOutResidual(packet, args.ridge, args.tolerance);
  const status = familyStatus(df, heldOut);
  return {
    family_id: family.family_id,
    source_declaration: family.source_declaration,
    status,
    failure_code:
      status === "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority"
        ? null
        : heldOut.failure_code ?? df.failure_code ?? "carrier-frame-branch-coordinate-no-go",
    frame_components: family.frame_components,
    scalar_channels: family.scalar_channels,
    feature_names: packet.feature_names,
    sample_count: packet.sample_count,
    equation_count: packet.equation_count,
    full_fit: full,
    degrees_of_freedom_guard: df,
    held_out_residual: heldOut,
  };
}

function bestByHeldOut(families) {
  const candidates = families.filter((family) =>
    Number.isFinite(family.held_out_residual?.max_held_out_relative_residual)
  );
  candidates.sort(
    (left, right) =>
      left.held_out_residual.max_held_out_relative_residual -
      right.held_out_residual.max_held_out_relative_residual
  );
  return candidates[0] ?? null;
}

function carrierSpectrumContextForRow(carrierSpectrum, rowNumber) {
  if (!carrierSpectrum) {
    return null;
  }
  const row = rowsOf(carrierSpectrum).find((entry) => entry.row === rowNumber) ?? null;
  return {
    carrier_spectrum_schema: carrierSpectrum?.artifact_schema ?? null,
    carrier_spectrum_status: carrierSpectrum?.status ?? null,
    row_status: row?.status ?? null,
    frame_time_rule: row?.frame_time_rule ?? null,
    diagnostic_classification: row?.diagnostic_classification ?? null,
    radial_energy_fraction: row?.component_energy_fractions?.radial ?? null,
    radial_mode_band_fraction: row?.mode_band_summary?.component_energy_fractions?.radial ?? null,
  };
}

function timeAlignmentAudit(records) {
  const interpolationStatusCounts = {};
  let maxNearestDistance = 0;
  let maxTieCount = 0;
  let tiedSampleCount = 0;
  let tangentFallbackCount = 0;
  for (const record of records) {
    const status = record.match.interpolation_status;
    interpolationStatusCounts[status] = (interpolationStatusCounts[status] ?? 0) + 1;
    if (Number.isFinite(record.match.nearest_distance)) {
      maxNearestDistance = Math.max(maxNearestDistance, record.match.nearest_distance);
    }
    maxTieCount = Math.max(maxTieCount, record.match.tie_count ?? 0);
    if ((record.match.tie_count ?? 0) > 1) {
      tiedSampleCount += 1;
    }
    if (record.frame.kinematics.used_tangent_fallback) {
      tangentFallbackCount += 1;
    }
  }
  return {
    max_nearest_distance: maxNearestDistance,
    max_tie_count: maxTieCount,
    tied_sample_count: tiedSampleCount,
    interpolation_status_counts: interpolationStatusCounts,
    tangent_fallback_count: tangentFallbackCount,
  };
}

function solveRow(row, args, carrierSpectrum) {
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_carrier_frame_branch_coordinate_fields",
      failure_code: "missing-carrier-frame-branch-coordinate-fields",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: missingFields,
      carrier_spectrum_context: carrierSpectrumContextForRow(carrierSpectrum, row?.row),
    };
  }
  const records = analysisRecords(row, args.frameTimeRule);
  if (records.status !== "computed") {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: row.row,
      status: "blocked_missing_carrier_frame_branch_coordinate_fields",
      failure_code: records.failure_code,
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: records.missing_fields ?? [],
      carrier_spectrum_context: carrierSpectrumContextForRow(carrierSpectrum, row.row),
    };
  }
  const timeAudit = timeAlignmentAudit(records.records);
  if (args.frameTimeRule === "nearest" && timeAudit.tied_sample_count > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: row.row,
      status: "blocked_insufficient_carrier_frame_regularization",
      failure_code: "nearest-carrier-frame-ties",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      source_status: row.status ?? null,
      source_failure_code: row.failure_code ?? null,
      time_alignment_audit: timeAudit,
      carrier_spectrum_context: carrierSpectrumContextForRow(carrierSpectrum, row.row),
      promotion_decision: "priority-only",
      note:
        "Nearest carrier-frame matching has tied source samples, so this checker refuses to fit a branch coordinate under the nearest rule. Use a declared linear frame-time rule for this artifact.",
    };
  }
  const families = selectedFamilies(args.coordinateFamily).map((family) => scanFamily(records.records, family, args));
  const candidate = families.find(
    (family) => family.status === "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority"
  );
  const best = bestByHeldOut(families);
  const status = candidate
    ? "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority"
    : "carrier_frame_branch_coordinate_no_go";
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status,
    failure_code: candidate ? null : "all-carrier-frame-branch-coordinate-families-fail",
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    branch_coordinate: {
      coordinate_id: "corrected_I_carrier_frame_deformation",
      coordinate_source: "corrected_carrier_state",
      source_fields: [
        "rows[].samples[].bodies.I+.position",
        "rows[].samples[].bodies.I-.position",
        "rows[].samples[].bodies.I+.velocity",
        "rows[].samples[].bodies.I-.velocity",
      ],
      residual_target: `${LEDGER_KEY}.sampled_forcing.samples[].layers.I.residual_forcing`,
      frame_time_rule: args.frameTimeRule,
      source_scalar_channels: SOURCE_SCALAR_CHANNELS,
      source_scalar_ladder: FAMILY_DEFINITIONS.map((family) => ({
        family_id: family.family_id,
        scalar_channels: family.scalar_channels,
        frame_components: family.frame_components,
      })),
      source_centering_rule:
        "source-only mean over corrected carrier samples at sampled-forcing times; residual target is not used to center features",
      corrected_rerun_authorized: false,
    },
    time_alignment_audit: timeAudit,
    source_moments: records.means,
    family_count: families.length,
    best_family: best
      ? {
          family_id: best.family_id,
          status: best.status,
          max_held_out_relative_residual: best.held_out_residual.max_held_out_relative_residual,
          full_fit_relative_residual: best.full_fit.relative_residual,
        }
      : null,
    families,
    carrier_spectrum_context: carrierSpectrumContextForRow(carrierSpectrum, row.row),
    promotion_decision: "priority-only",
    note:
      "This row tests source-derived carrier-frame branch-coordinate families only. A pass is still not corrected-rerun authority while root-transport, raw-row root-ledger, and one-period gates remain pending or failed.",
  };
}

function buildOutput(args, intakePath, artifact, carrierSpectrumPath, carrierSpectrum) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  if (carrierSpectrum && carrierSpectrum?.artifact_schema !== CARRIER_SPECTRUM_SCHEMA) {
    topMissing.push(`carrier_spectrum.artifact_schema=${CARRIER_SPECTRUM_SCHEMA}`);
  }
  const rows =
    topMissing.length === 0
      ? selectRows(artifact, args.rows).map((row) => solveRow(row, args, carrierSpectrum))
      : [];
  const candidateCount = rows.filter(
    (row) => row.status === "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority"
  ).length;
  const missingBlockedCount = rows.filter(
    (row) => row.status === "blocked_missing_carrier_frame_branch_coordinate_fields"
  ).length;
  const regularizationBlockedCount = rows.filter(
    (row) => row.status === "blocked_insufficient_carrier_frame_regularization"
  ).length;
  const blockedCount = missingBlockedCount + regularizationBlockedCount;
  const status =
    topMissing.length > 0 || missingBlockedCount > 0
      ? "blocked_missing_carrier_frame_branch_coordinate_fields"
      : regularizationBlockedCount > 0
        ? "blocked_insufficient_carrier_frame_regularization"
      : candidateCount > 0
        ? "carrier_frame_branch_coordinate_source_candidate_not_rerun_authority"
        : "carrier_frame_branch_coordinate_no_go";
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    inputs: {
      intake: intakePath,
      carrier_spectrum: carrierSpectrumPath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
      carrier_spectrum_schema: carrierSpectrum?.artifact_schema ?? null,
    },
    parameters: {
      tolerance: args.tolerance,
      ridge: args.ridge,
      coordinate_family: args.coordinateFamily,
      frame_time_rule: args.frameTimeRule,
      held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
      feature_leakage_guard:
        "Features are built only from corrected_carrier_state positions and velocities before fitting; residual_forcing is the target only.",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      candidate_count: candidateCount,
      no_go_count: rows.filter((row) => row.status === "carrier_frame_branch_coordinate_no_go").length,
      blocked_count: blockedCount,
      regularization_blocked_count: regularizationBlockedCount,
    },
    rows,
    promotion_decision: "priority-only",
    note:
      "This artifact is a source-side carrier-frame branch-coordinate diagnostic. It does not authorize corrected rerun or accepted history.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntake(args);
  const carrierSpectrumPath = args.carrierSpectrum ? path.resolve(args.carrierSpectrum) : null;
  const artifact = readJson(intakePath);
  const carrierSpectrum = carrierSpectrumPath ? readJson(carrierSpectrumPath) : null;
  writeJson(args, buildOutput(args, intakePath, artifact, carrierSpectrumPath, carrierSpectrum));
}

main();
