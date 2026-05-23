#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const SOURCE_ELIGIBILITY_SCHEMA = "a0-mode-band-source-eligibility/v1";
const ROOT_TRANSPORT_SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const LEDGER_SCHEMA = "a0-tier1-refined-residual-basis-ledger/v1";
const OUTPUT_SCHEMA = "a0-reciprocal-interlayer-branch-equation-checker/v1";
const OUTPUT_ROW_SCHEMA = "a0-reciprocal-interlayer-branch-equation-checker-row/v1";
const DEFAULT_TOLERANCE = 0.02;
const DEFAULT_RIDGE = 1e-12;
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";
const COMPONENTS = ["x", "y", "z"];
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const PROJECTION_MODES = ["velocity", "radial", "tangential", "radial_tangential"];
const FRAME_TIME_RULES = ["nearest", "linear"];
const SCALAR_CHANNELS = [
  ["transport:M:inter_layer:I:mean_D_J", "D_J_M_from_I"],
  ["transport:M:inter_layer:I:sum_source_layer_shear_projection", "shear_M_from_I"],
  ["root:M:inter_layer:I:mean_J", "J_M_from_I"],
];

function parseArgs(argv) {
  const args = {
    intake: null,
    sourceEligibility: null,
    rows: "all",
    tolerance: DEFAULT_TOLERANCE,
    ridge: DEFAULT_RIDGE,
    projection: "velocity",
    frameTimeRule: "nearest",
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
    } else if (arg === "--source-eligibility") {
      args.sourceEligibility = argv[++index];
    } else if (arg === "--rows") {
      args.rows = argv[++index];
    } else if (arg === "--tolerance") {
      args.tolerance = parsePositiveNumber(argv[++index], "--tolerance");
    } else if (arg === "--ridge") {
      args.ridge = parseNonnegativeNumber(argv[++index], "--ridge");
    } else if (arg === "--projection") {
      args.projection = parseChoice(argv[++index], "--projection", PROJECTION_MODES);
    } else if (arg === "--frame-time-rule") {
      args.frameTimeRule = parseChoice(argv[++index], "--frame-time-rule", FRAME_TIME_RULES);
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
  console.log(`Usage: node scripts/mass-map/a0-reciprocal-interlayer-branch-equation-checker.mjs --intake PATH [options]

Options:
  --intake PATH                JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --source-eligibility PATH    Optional a0-mode-band-source-eligibility/v1 artifact for context only.
  --rows VALUE                 "all" or a comma-separated row list. Defaults to all.
  --tolerance N                Held-out relative residual tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --ridge N                    Ridge added to normal-equation diagonal. Defaults to ${DEFAULT_RIDGE}.
  --projection VALUE           velocity, radial, tangential, or radial_tangential. Defaults to velocity.
  --frame-time-rule VALUE      nearest or linear carrier-frame time rule. Defaults to nearest.
  --out PATH                   Write JSON output to a file instead of stdout.
  --pretty                     Pretty-print JSON.
  --help                       Show this help.

This diagnostic tests the smallest predeclared reciprocal inter-layer source
equation over M<-I transport fields projected into a declared corrected I
carrier-frame direction. It does not authorize corrected rerun or accepted
history.`);
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

function rootTransportRecord(row) {
  return row?.branch_chart_source_records?.root_transport_source_record ?? null;
}

function rowMissingFields(row) {
  const missing = [];
  const ledger = baselineLedger(row);
  const forcing = ledger?.sampled_forcing;
  const record = rootTransportRecord(row);
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
  if (record?.schema !== ROOT_TRANSPORT_SOURCE_SCHEMA) {
    missing.push(`rows[].branch_chart_source_records.root_transport_source_record.schema=${ROOT_TRANSPORT_SOURCE_SCHEMA}`);
  }
  if (!Array.isArray(record?.roots) || record.roots.length < 2) {
    missing.push("rows[].branch_chart_source_records.root_transport_source_record.roots[2+]");
  }
  if (!Array.isArray(row?.active_causal_root_ledger) || row.active_causal_root_ledger.length < 2) {
    missing.push("rows[].active_causal_root_ledger[2+]");
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

function nearestRows(rows, t, period) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const row of rows) {
    const distance = circularDistance(Number(row.t), t, period);
    if (Number.isFinite(distance) && distance < bestDistance) {
      bestDistance = distance;
    }
  }
  const tolerance = Math.max(Math.abs(period) * 1e-10, 1e-12);
  return rows.filter((row) => circularDistance(Number(row.t), t, period) <= bestDistance + tolerance);
}

function nearestSample(samples, t, period) {
  return nearestRows(samples, t, period)[0] ?? null;
}

function nearestCarrierMatch(samples, t, period) {
  const matches = nearestRows(samples, t, period);
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const sample of samples) {
    const distance = circularDistance(Number(sample.t), t, period);
    if (Number.isFinite(distance) && distance < bestDistance) {
      bestDistance = distance;
    }
  }
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
      const bodies = {};
      for (const bodyId of BODY_IDS) {
        bodies[bodyId] = {
          position: interpolateVector(left.bodies[bodyId].position, right.bodies[bodyId].position, alpha),
          velocity: interpolateVector(left.bodies[bodyId].velocity, right.bodies[bodyId].velocity, alpha),
        };
      }
      return {
        sample: { t, bodies },
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
  const eTheta = normalize(tangential, fallbackTangent(eR));
  return {
    rel_position: relPosition,
    rel_velocity: relVelocity,
    rel_velocity_direction: normalize(relVelocity),
    radial: eR,
    tangential: eTheta,
    normal: normalize(cross(eR, eTheta), [0, 0, 1]),
    used_tangent_fallback: tangentialNorm < 1e-14,
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

function analysisSamples(row, frameTimeRule) {
  const forcingSamples = baselineLedger(row).sampled_forcing.samples;
  return forcingSamples.map((forcing) => ({
    t: forcing.t,
    target: forcing.layers.I.residual_forcing,
    carrier_match: carrierMatch(row, forcing.t, frameTimeRule),
  }));
}

function bodyLayer(bodyId) {
  return typeof bodyId === "string" ? bodyId.slice(0, 1) : null;
}

function relationKey(row) {
  return `${bodyLayer(row.receiver)}:${row.relation}:${bodyLayer(row.source)}`;
}

function reciprocalTransportRows(row, sample) {
  const rows = nearestRows(rootTransportRecord(row).roots, sample.t, row.period);
  return rows.filter(
    (root) => relationKey(root) === "M:inter_layer:I" && root.locked_fold_layer_key !== true
  );
}

function reciprocalActiveRoots(row, sample) {
  const rows = nearestRows(row.active_causal_root_ledger, sample.t, row.period);
  return rows.filter((root) => relationKey(root) === "M:inter_layer:I");
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function reciprocalScalars(row, sample) {
  const transport = reciprocalTransportRows(row, sample);
  const active = reciprocalActiveRoots(row, sample);
  if (transport.length === 0 || active.length === 0) {
    return null;
  }
  return {
    D_J_M_from_I: mean(transport.map((root) => root.D_J)),
    D_tau_M_from_I: mean(transport.map((root) => root.D_tau)),
    shear_M_from_I: transport.reduce(
      (sum, root) => sum + root.G_r * (root.D_J * Math.cos(root.theta) + root.D_tau * Math.sin(root.theta)),
      0
    ),
    J_M_from_I: mean(active.map((root) => root.J)),
    log_abs_J_M_from_I: mean(active.map((root) => Math.log(Math.max(Math.abs(root.J), 1e-300)))),
  };
}

function projectionDirections(frame, projection) {
  if (projection === "radial") {
    return [["e_I,r", frame.radial]];
  }
  if (projection === "tangential") {
    return [["e_I,theta", frame.tangential]];
  }
  if (projection === "radial_tangential") {
    return [
      ["e_I,r", frame.radial],
      ["e_I,theta", frame.tangential],
    ];
  }
  return [["vhat_I", frame.rel_velocity_direction]];
}

function featureNamesForProjection(projection) {
  const suffixes =
    projection === "radial"
      ? ["e_I,r"]
      : projection === "tangential"
        ? ["e_I,theta"]
        : projection === "radial_tangential"
          ? ["e_I,r", "e_I,theta"]
          : ["vhat_I"];
  return suffixes.flatMap((suffix) => SCALAR_CHANNELS.map(([channel]) => `${channel}:${suffix}`));
}

function timeAlignmentAudit(samples) {
  const interpolationStatusCounts = {};
  let maxNearestDistance = 0;
  let maxTieCount = 0;
  let tiedSampleCount = 0;
  let tangentFallbackCount = 0;
  for (const sample of samples) {
    const match = sample.carrier_match;
    interpolationStatusCounts[match.interpolation_status] =
      (interpolationStatusCounts[match.interpolation_status] ?? 0) + 1;
    if (Number.isFinite(match.nearest_distance)) {
      maxNearestDistance = Math.max(maxNearestDistance, match.nearest_distance);
    }
    maxTieCount = Math.max(maxTieCount, match.tie_count ?? 0);
    if ((match.tie_count ?? 0) > 1) {
      tiedSampleCount += 1;
    }
    if (sample.carrier_frame?.used_tangent_fallback === true) {
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

function reciprocalFeaturePacket(row, args) {
  const samples = analysisSamples(row, args.frameTimeRule);
  const featureNames = featureNamesForProjection(args.projection);
  const equationRows = [];
  const targets = [];
  let selectedTransportRootCount = 0;
  let selectedActiveRootCount = 0;
  for (const [sampleIndex, sample] of samples.entries()) {
    if (!sample.carrier_match.sample) {
      return {
        status: "blocked",
        failure_code: "missing-carrier-sample-at-residual-time",
        missing_fields: [`row.samples nearest t=${sample.t}`],
      };
    }
    const frame = carrierFrame(sample.carrier_match.sample);
    sample.carrier_frame = frame;
    if (args.projection !== "velocity" && args.frameTimeRule === "nearest" && sample.carrier_match.tie_count > 1) {
      return {
        status: "blocked",
        failure_code: "nearest-carrier-frame-ties",
        missing_fields: [`row.samples tied nearest carrier matches at t=${sample.t}`],
        time_alignment_audit: timeAlignmentAudit(samples),
      };
    }
    const scalars = reciprocalScalars(row, sample);
    if (!scalars) {
      return {
        status: "blocked",
        failure_code: "missing-reciprocal-interlayer-source-rows",
        missing_fields: [`M:inter_layer:I reciprocal source rows at t=${sample.t}`],
      };
    }
    selectedTransportRootCount += reciprocalTransportRows(row, sample).length;
    selectedActiveRootCount += reciprocalActiveRoots(row, sample).length;
    const directions = projectionDirections(frame, args.projection);
    for (let component = 0; component < COMPONENTS.length; component += 1) {
      const rowValues = [];
      for (const [, direction] of directions) {
        for (const [, scalarName] of SCALAR_CHANNELS) {
          rowValues.push(scalars[scalarName] * direction[component]);
        }
      }
      equationRows.push({
        sample_index: sampleIndex,
        component: COMPONENTS[component],
        values: rowValues,
      });
      targets.push(sample.target[component]);
    }
  }
  return {
    status: "computed",
    sample_count: samples.length,
    equation_count: equationRows.length,
    feature_names: featureNames,
    selected_transport_root_count: selectedTransportRootCount,
    selected_active_root_count: selectedActiveRootCount,
    time_alignment_audit: timeAlignmentAudit(samples),
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
    for (let col = 0; col < rhs.length; col += 1) {
      rhs[col] += matrix[row][col] * targets[row];
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
  return Math.sqrt(residualNormSquared / Math.max(targetNormSquared, Number.EPSILON));
}

function fullFit(packet, ridge) {
  const coefficients = fitRows(packet.equation_rows, packet.targets, ridge);
  if (!coefficients) {
    return {
      status: "blocked",
      failure_code: "full-fit-normal-equation-singular",
      relative_residual: null,
    };
  }
  return {
    status: "computed",
    failure_code: null,
    relative_residual: residualFor(packet.equation_rows, packet.targets, coefficients),
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
    relative_residual: residualFor(testRowsForSplit, testTargets, coefficients),
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
    feature_rank: featureRank,
    full_column_rank: featureRank === featureCount,
  };
}

function sourceEligibilityContextForRow(sourceEligibility, rowNumber) {
  if (!sourceEligibility) {
    return null;
  }
  const row = rowsOf(sourceEligibility).find((entry) => entry.row === rowNumber) ?? null;
  return {
    source_eligibility_schema: sourceEligibility?.artifact_schema ?? null,
    source_eligibility_status: sourceEligibility?.status ?? null,
    row_status: row?.status ?? null,
    top_channel: row?.top_channel ?? null,
  };
}

function solveRow(row, args, sourceEligibility) {
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_reciprocal_branch_equation_fields",
      failure_code: "missing-reciprocal-branch-equation-fields",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: missingFields,
      source_eligibility_context: sourceEligibilityContextForRow(sourceEligibility, row?.row),
    };
  }
  const packet = reciprocalFeaturePacket(row, args);
  if (packet.status !== "computed") {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: row.row,
      status: "blocked_missing_reciprocal_branch_equation_fields",
      failure_code: packet.failure_code,
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: packet.missing_fields ?? [],
      time_alignment_audit: packet.time_alignment_audit ?? null,
      source_eligibility_context: sourceEligibilityContextForRow(sourceEligibility, row.row),
    };
  }
  const full = fullFit(packet, args.ridge);
  const df = dfGuard(packet, args.ridge);
  const heldOut = heldOutResidual(packet, args.ridge, args.tolerance);
  const passed = df.status === "passed" && heldOut.status === "passed";
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status: passed
      ? "reciprocal_interlayer_branch_equation_diagnostic_candidate"
      : "reciprocal_interlayer_branch_equation_no_go",
    failure_code: passed ? null : heldOut.failure_code ?? df.failure_code ?? "reciprocal-branch-equation-no-go",
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    branch_equation: {
      equation_id: "reciprocal_interlayer_M_from_I_to_I_residual",
      source_channels: [
        "transport:M:inter_layer:I:mean_D_J",
        "transport:M:inter_layer:I:sum_source_layer_shear_projection",
        "root:M:inter_layer:I:mean_J",
      ],
      projection:
        args.projection === "velocity"
          ? "corrected-carrier I relative-velocity direction vhat_I"
          : args.projection === "radial"
            ? "corrected-carrier I radial direction e_I,r"
            : args.projection === "tangential"
              ? "corrected-carrier I tangential direction e_I,theta"
              : "corrected-carrier I radial and tangential directions {e_I,r,e_I,theta}",
      projection_mode: args.projection,
      frame_time_rule: args.frameTimeRule,
      residual_target: `${LEDGER_KEY}.sampled_forcing.samples[].layers.I.residual_forcing`,
      coefficients_fit_after_source_declaration: true,
      corrected_rerun_authorized: false,
    },
    feature_names: packet.feature_names,
    sample_count: packet.sample_count,
    equation_count: packet.equation_count,
    selected_transport_root_count: packet.selected_transport_root_count,
    selected_active_root_count: packet.selected_active_root_count,
    time_alignment_audit: packet.time_alignment_audit,
    full_fit: full,
    degrees_of_freedom_guard: df,
    held_out_residual: heldOut,
    source_eligibility_context: sourceEligibilityContextForRow(sourceEligibility, row.row),
    promotion_decision: "priority-only",
    note:
      "This row tests a reciprocal inter-layer branch-equation diagnostic only. It does not authorize corrected rerun or accepted history.",
  };
}

function buildOutput(args, intakePath, artifact, sourceEligibilityPath, sourceEligibility) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  if (sourceEligibility && sourceEligibility?.artifact_schema !== SOURCE_ELIGIBILITY_SCHEMA) {
    topMissing.push(`source_eligibility.artifact_schema=${SOURCE_ELIGIBILITY_SCHEMA}`);
  }
  const rows =
    topMissing.length === 0
      ? selectRows(artifact, args.rows).map((row) => solveRow(row, args, sourceEligibility))
      : [];
  const blockedCount = rows.filter((row) => String(row.status).startsWith("blocked_")).length;
  const candidateCount = rows.filter(
    (row) => row.status === "reciprocal_interlayer_branch_equation_diagnostic_candidate"
  ).length;
  const status = topMissing.length > 0 || blockedCount > 0 ? "blocked_missing_reciprocal_branch_equation_fields" : candidateCount > 0 ? "diagnostic_candidate" : "no_go";
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    inputs: {
      intake: intakePath,
      source_eligibility: sourceEligibilityPath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
      source_eligibility_schema: sourceEligibility?.artifact_schema ?? null,
    },
    parameters: {
      tolerance: args.tolerance,
      ridge: args.ridge,
      projection: args.projection,
      frame_time_rule: args.frameTimeRule,
      held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
      source_eligibility_context_rule:
        "Optional source-eligibility top channel is copied as context only and is not an input to fitting.",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      candidate_count: candidateCount,
      no_go_count: rows.filter((row) => row.status === "reciprocal_interlayer_branch_equation_no_go").length,
      blocked_count: blockedCount,
    },
    rows,
    promotion_decision: "diagnostic-only",
    note:
      "This artifact is a reciprocal branch-equation diagnostic. It does not authorize corrected rerun or accepted history.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntake(args);
  const sourceEligibilityPath = args.sourceEligibility ? path.resolve(args.sourceEligibility) : null;
  const artifact = readJson(intakePath);
  const sourceEligibility = sourceEligibilityPath ? readJson(sourceEligibilityPath) : null;
  writeJson(args, buildOutput(args, intakePath, artifact, sourceEligibilityPath, sourceEligibility));
}

main();
