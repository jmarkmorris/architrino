#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_INPUT_PATH = path.join(SCRIPT_DIR, "pressure-replay-fe-cr-empty-fixture.json");
const DEFAULT_FEATURE_ORDER = [
  "delta_Pi",
  "delta_Pi_parallel_perp",
  "delta_ln_n_max_obl",
  "heavy_scaling_pressure",
];
const DEFAULT_CHANNEL_ORDER = [
  "delta_ln_Gamma_N",
  "delta_ln_chi_sea",
  "delta_ln_c_eff_over_c_f",
  "delta_M0",
  "delta_M2",
  "delta_S_dev",
];
const DEFAULT_NULL_KEYS = ["biref", "gamma_disp", "LV", "clksig", "tr"];
const DEFAULT_THRESHOLDS = {
  epsilon_row: 1e-9,
  epsilon_split: 0,
  epsilon_P: 0,
  rank_tolerance: 1e-10,
  epsilon_dof: 1e-12,
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
  console.log(`Usage: node scripts/mass-map/pressure-replay-fit-runner.mjs [options]

Options:
  --input PATH  Pressure replay packet. Defaults to scripts/mass-map/pressure-replay-fe-cr-empty-fixture.json
  --out PATH    Write JSON output to a file instead of stdout.
  --pretty      Pretty-print JSON output.
  --help        Show this help.

This runner evaluates the Fe/Cr pressure-replay fit contract:
  y_M,r = E_M,r (o_raw,M,r - o_std,M,r)
  yhat_M,r = B_P q_M,r
  R_split = [(R_row - R_sep) / (nu_dof + epsilon) - epsilon_split]_+.
It is fail-closed: missing rows, missing covariance, rank-deficient channels,
or missing null-sector bounds produce bound_only, not pass.`);
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

function nonnegativeNumber(value, label) {
  const number = finiteNumber(value, label);
  if (number < 0) {
    throw new Error(`${label} must be nonnegative.`);
  }
  return number;
}

function stringArray(value, fallback, label) {
  const array = value ?? fallback;
  if (!Array.isArray(array) || array.length === 0 || array.some((entry) => typeof entry !== "string")) {
    throw new Error(`${label} must be a nonempty array of strings.`);
  }
  return array;
}

function thresholdMap(inputThresholds = {}) {
  const raw = { ...DEFAULT_THRESHOLDS, ...inputThresholds };
  return {
    epsilon_row: nonnegativeNumber(raw.epsilon_row, "thresholds.epsilon_row"),
    epsilon_split: nonnegativeNumber(raw.epsilon_split, "thresholds.epsilon_split"),
    epsilon_P: nonnegativeNumber(raw.epsilon_P, "thresholds.epsilon_P"),
    rank_tolerance: nonnegativeNumber(raw.rank_tolerance, "thresholds.rank_tolerance"),
    epsilon_dof: nonnegativeNumber(raw.epsilon_dof, "thresholds.epsilon_dof"),
  };
}

function arrayOfFiniteNumbers(value, length, label) {
  if (!Array.isArray(value) || value.length !== length) {
    throw new Error(`${label} must be an array of length ${length}.`);
  }
  return value.map((entry, index) => finiteNumber(entry, `${label}[${index}]`));
}

function optionalFiniteVector(value, length, label, issues) {
  if (value === undefined) {
    issues.push(`${label}:missing`);
    return null;
  }
  try {
    return arrayOfFiniteNumbers(value, length, label);
  } catch (error) {
    issues.push(error.message);
    return null;
  }
}

function normalizeMask(row, channelCount, issues, rowLabel) {
  const raw = row.mask ?? row.channel_mask;
  if (raw === undefined) {
    issues.push(`${rowLabel}.channel_mask:missing`);
    return Array(channelCount).fill(0);
  }
  if (!Array.isArray(raw) || raw.length !== channelCount) {
    issues.push(`${rowLabel}.channel_mask must have length ${channelCount}`);
    return Array(channelCount).fill(0);
  }
  return raw.map((entry) => (entry === true || Number(entry) > 0 ? 1 : 0));
}

function normalizeCovariance(row, channelCount, issues, rowLabel) {
  const raw = row.covariance_diagonal ?? row.sigma_diagonal;
  if (raw === undefined) {
    issues.push(`${rowLabel}.covariance_diagonal:missing`);
    return null;
  }
  try {
    const vector = arrayOfFiniteNumbers(raw, channelCount, `${rowLabel}.covariance_diagonal`);
    vector.forEach((entry, index) => {
      if (entry <= 0) {
        throw new Error(`${rowLabel}.covariance_diagonal[${index}] must be positive.`);
      }
    });
    return vector;
  } catch (error) {
    issues.push(error.message);
    return null;
  }
}

function normalizeRows(input, featureOrder, channelOrder) {
  const rows = Array.isArray(input.rows) ? input.rows : [];
  return rows.map((row, index) => {
    const rowId = row.row_id ?? row.id ?? `row-${index}`;
    const rowLabel = `rows[${index}]`;
    const issues = [];
    const q = optionalFiniteVector(row.q, featureOrder.length, `${rowLabel}.q`, issues);
    const y = optionalFiniteVector(row.y, channelOrder.length, `${rowLabel}.y`, issues);
    const mask = normalizeMask(row, channelOrder.length, issues, rowLabel);
    const covarianceDiagonal = normalizeCovariance(row, channelOrder.length, issues, rowLabel);
    const materialId = typeof row.material_id === "string" ? row.material_id : "UNKNOWN";
    if (materialId === "UNKNOWN") {
      issues.push(`${rowLabel}.material_id:missing`);
    }
    const activeChannels = channelOrder
      .map((channel, channelIndex) => ({ channel, channelIndex }))
      .filter(({ channelIndex }) =>
        mask[channelIndex] === 1 &&
        q !== null &&
        y !== null &&
        covarianceDiagonal !== null
      );
    return {
      row_id: rowId,
      material_id: materialId,
      q,
      y,
      mask,
      covariance_diagonal: covarianceDiagonal,
      active_channels: activeChannels.map(({ channel }) => channel),
      issues,
    };
  });
}

function matrixRank(matrix, tolerance) {
  if (matrix.length === 0) {
    return 0;
  }
  const work = matrix.map((row) => row.map(Number));
  const rowCount = work.length;
  const colCount = work[0].length;
  let rank = 0;
  for (let col = 0; col < colCount && rank < rowCount; col += 1) {
    let pivot = rank;
    for (let row = rank + 1; row < rowCount; row += 1) {
      if (Math.abs(work[row][col]) > Math.abs(work[pivot][col])) {
        pivot = row;
      }
    }
    if (Math.abs(work[pivot][col]) <= tolerance) {
      continue;
    }
    [work[rank], work[pivot]] = [work[pivot], work[rank]];
    const pivotValue = work[rank][col];
    for (let j = col; j < colCount; j += 1) {
      work[rank][j] /= pivotValue;
    }
    for (let row = 0; row < rowCount; row += 1) {
      if (row === rank) {
        continue;
      }
      const factor = work[row][col];
      for (let j = col; j < colCount; j += 1) {
        work[row][j] -= factor * work[rank][j];
      }
    }
    rank += 1;
  }
  return rank;
}

function independentColumns(matrix, tolerance) {
  if (matrix.length === 0) {
    return [];
  }
  const selected = [];
  let selectedMatrix = matrix.map(() => []);
  let currentRank = 0;
  for (let col = 0; col < matrix[0].length; col += 1) {
    const candidate = matrix.map((row, rowIndex) => [...selectedMatrix[rowIndex], row[col]]);
    const nextRank = matrixRank(candidate, tolerance);
    if (nextRank > currentRank) {
      selected.push(col);
      selectedMatrix = candidate;
      currentRank = nextRank;
    }
  }
  return selected;
}

function solveLinearSystem(matrix, vector, tolerance) {
  const n = vector.length;
  const augmented = matrix.map((row, index) => [...row, vector[index]]);
  for (let pivot = 0; pivot < n; pivot += 1) {
    let best = pivot;
    for (let row = pivot + 1; row < n; row += 1) {
      if (Math.abs(augmented[row][pivot]) > Math.abs(augmented[best][pivot])) {
        best = row;
      }
    }
    if (Math.abs(augmented[best][pivot]) <= tolerance) {
      throw new Error("normal matrix is singular or rank-deficient");
    }
    [augmented[pivot], augmented[best]] = [augmented[best], augmented[pivot]];
    const pivotValue = augmented[pivot][pivot];
    for (let col = pivot; col <= n; col += 1) {
      augmented[pivot][col] /= pivotValue;
    }
    for (let row = 0; row < n; row += 1) {
      if (row === pivot) {
        continue;
      }
      const factor = augmented[row][pivot];
      for (let col = pivot; col <= n; col += 1) {
        augmented[row][col] -= factor * augmented[pivot][col];
      }
    }
  }
  return augmented.map((row) => row[n]);
}

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function observationsForChannel(rows, channelIndex) {
  return rows.flatMap((row) => {
    if (
      row.mask[channelIndex] !== 1 ||
      row.q === null ||
      row.y === null ||
      row.covariance_diagonal === null
    ) {
      return [];
    }
    return [{
      row_id: row.row_id,
      material_id: row.material_id,
      q: row.q,
      y: row.y[channelIndex],
      variance: row.covariance_diagonal[channelIndex],
    }];
  });
}

function fitObservationSet(observations, featureCount, tolerance) {
  const qRows = observations.map((entry) => entry.q);
  const rank = matrixRank(qRows, tolerance);
  const selected = independentColumns(qRows, tolerance);
  const eligible = observations.length > rank && rank > 0;
  if (!eligible) {
    return {
      status: "bound_only",
      observations: observations.length,
      rank,
      parameters: rank,
      selected_features: selected,
      coefficients: Array(featureCount).fill(0),
      residual: null,
      dof: Math.max(0, observations.length - rank),
      failure_code: observations.length === 0 ? "no-observations" : "rank-deficient-or-exact-fit",
    };
  }

  const p = selected.length;
  const normal = Array.from({ length: p }, () => Array(p).fill(0));
  const rhs = Array(p).fill(0);
  for (const observation of observations) {
    const weight = 1 / observation.variance;
    const row = selected.map((index) => observation.q[index]);
    for (let i = 0; i < p; i += 1) {
      rhs[i] += weight * row[i] * observation.y;
      for (let j = 0; j < p; j += 1) {
        normal[i][j] += weight * row[i] * row[j];
      }
    }
  }

  const reducedCoefficients = solveLinearSystem(normal, rhs, tolerance);
  const coefficients = Array(featureCount).fill(0);
  selected.forEach((featureIndex, index) => {
    coefficients[featureIndex] = reducedCoefficients[index];
  });
  const residual = observations.reduce((sum, observation) => {
    const delta = observation.y - dot(coefficients, observation.q);
    return sum + (delta * delta) / observation.variance;
  }, 0);

  return {
    status: "fit",
    observations: observations.length,
    rank,
    parameters: rank,
    selected_features: selected,
    coefficients,
    residual,
    dof: observations.length - rank,
    failure_code: null,
  };
}

function fitShared(rows, featureOrder, channelOrder, thresholds) {
  const channels = channelOrder.map((channel, channelIndex) => {
    const observations = observationsForChannel(rows, channelIndex);
    return {
      channel,
      ...fitObservationSet(observations, featureOrder.length, thresholds.rank_tolerance),
    };
  });
  const eligibleChannels = channels.filter((channel) => channel.status === "fit");
  return {
    status: eligibleChannels.length > 0 ? "fit" : "bound_only",
    residual: eligibleChannels.length > 0
      ? eligibleChannels.reduce((sum, channel) => sum + channel.residual, 0)
      : null,
    dof: eligibleChannels.reduce((sum, channel) => sum + channel.dof, 0),
    eligible_channels: eligibleChannels.map((channel) => channel.channel),
    channels,
  };
}

function fitSeparated(rows, featureOrder, channelOrder, thresholds) {
  const materials = [...new Set(rows.map((row) => row.material_id).filter((id) => id !== "UNKNOWN"))];
  const materialFits = materials.map((materialId) => {
    const materialRows = rows.filter((row) => row.material_id === materialId);
    return {
      material_id: materialId,
      ...fitShared(materialRows, featureOrder, channelOrder, thresholds),
    };
  });
  const allFitChannels = materialFits.flatMap((fit) =>
    fit.channels
      .filter((channel) => channel.status === "fit")
      .map((channel) => `${fit.material_id}:${channel.channel}`)
  );
  return {
    status: allFitChannels.length > 0 ? "fit" : "bound_only",
    residual: allFitChannels.length > 0
      ? materialFits.reduce((sum, fit) => sum + (fit.residual ?? 0), 0)
      : null,
    eligible_material_channels: allFitChannels,
    materials: materialFits,
  };
}

function evaluateNullBounds(input, thresholds) {
  const bounds = input.null_bounds && typeof input.null_bounds === "object" ? input.null_bounds : {};
  const entries = DEFAULT_NULL_KEYS.map((key) => {
    const raw = bounds[key];
    if (raw === undefined) {
      return { key, status: "missing", value: null, threshold: thresholds.epsilon_P, failure_code: "missing-null-bound" };
    }
    if (typeof raw === "string") {
      return {
        key,
        status: raw === "pass" ? "pass" : raw === "fail" ? "fail" : "missing",
        value: null,
        threshold: thresholds.epsilon_P,
        failure_code: raw === "pass" ? null : `null-bound-${raw}`,
      };
    }
    if (typeof raw === "object" && raw !== null) {
      const threshold = nonnegativeNumber(raw.threshold ?? thresholds.epsilon_P, `null_bounds.${key}.threshold`);
      const value = raw.value === undefined ? null : nonnegativeNumber(raw.value, `null_bounds.${key}.value`);
      const explicitStatus = typeof raw.status === "string" ? raw.status : null;
      const status = explicitStatus ?? (value !== null && value <= threshold ? "pass" : "fail");
      return {
        key,
        status,
        value,
        threshold,
        failure_code: status === "pass" ? null : `null-bound-${status}`,
      };
    }
    return { key, status: "missing", value: null, threshold: thresholds.epsilon_P, failure_code: "invalid-null-bound" };
  });
  const status = entries.some((entry) => entry.status === "fail")
    ? "fail"
    : entries.every((entry) => entry.status === "pass")
      ? "pass"
      : "missing";
  return { status, entries };
}

function readingFor({ shared, separated, splitResidual, nullBounds, thresholds, rows }) {
  const blockers = [];
  const rowIssues = rows.flatMap((row) => row.issues.map((issue) => `${row.row_id}:${issue}`));
  if (rowIssues.length > 0) {
    blockers.push(...rowIssues);
  }
  if (rows.length === 0) {
    blockers.push("no-pressure-rows");
  }
  if (shared.status !== "fit") {
    blockers.push("no-fit-eligible-shared-channel");
  }
  if (shared.channels.some((channel) => channel.observations > 0 && channel.status !== "fit")) {
    blockers.push("rank-deficient-retained-channel");
  }
  if (separated.status !== "fit") {
    blockers.push("separated-fit-not-computable");
  }
  if (nullBounds.status === "missing") {
    blockers.push("null-sector-bounds-missing");
  }
  if (nullBounds.status === "fail") {
    return { reading: "fail", empirical_pass: false, blockers: ["null-sector-failure", ...blockers] };
  }
  if (shared.residual !== null && shared.residual > thresholds.epsilon_row) {
    return { reading: "fail", empirical_pass: false, blockers: ["shared-row-residual-above-threshold", ...blockers] };
  }
  if (splitResidual !== null && splitResidual > 0) {
    return { reading: "demote", empirical_pass: false, blockers: ["separated-row-improves-fit", ...blockers] };
  }
  if (blockers.length > 0) {
    return { reading: "bound_only", empirical_pass: false, blockers };
  }
  return { reading: "pass", empirical_pass: true, blockers: [] };
}

function evaluate(input, inputPath) {
  const featureOrder = stringArray(input.feature_order, DEFAULT_FEATURE_ORDER, "feature_order");
  const channelOrder = stringArray(input.channel_order, DEFAULT_CHANNEL_ORDER, "channel_order");
  const thresholds = thresholdMap(input.thresholds);
  const rows = normalizeRows(input, featureOrder, channelOrder);
  const shared = fitShared(rows, featureOrder, channelOrder, thresholds);
  const separated = fitSeparated(rows, featureOrder, channelOrder, thresholds);
  const splitResidual =
    shared.residual !== null && separated.residual !== null
      ? Math.max(
          0,
          (shared.residual - separated.residual) / (shared.dof + thresholds.epsilon_dof) -
            thresholds.epsilon_split
        )
      : null;
  const nullBounds = evaluateNullBounds(input, thresholds);
  const reading = readingFor({ shared, separated, splitResidual, nullBounds, thresholds, rows });
  return {
    schema: "pressure-replay-fit-runner-result/v1",
    input_file: inputPath,
    metadata: input.metadata ?? {},
    feature_order: featureOrder,
    channel_order: channelOrder,
    thresholds,
    rows_total: rows.length,
    active_observations: rows.reduce((sum, row) => sum + row.active_channels.length, 0),
    rows: rows.map((row) => ({
      row_id: row.row_id,
      material_id: row.material_id,
      active_channels: row.active_channels,
      issues: row.issues,
    })),
    fits: {
      shared,
      separated,
      split: {
        residual: splitResidual,
        threshold: 0,
        status: splitResidual === null ? "bound_only" : splitResidual <= 0 ? "pass" : "demote",
      },
    },
    null_bounds: nullBounds,
    reading: reading.reading,
    empirical_pass: reading.empirical_pass,
    blockers: reading.blockers,
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
  const result = evaluate(input, inputPath);
  const json = JSON.stringify(result, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

try {
  main();
} catch (error) {
  console.error(`pressure-replay-fit-runner: ${error.message}`);
  process.exitCode = 1;
}

