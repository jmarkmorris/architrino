#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const ROOT_TRANSPORT_SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const LEDGER_SCHEMA = "a0-tier1-refined-residual-basis-ledger/v1";
const OUTPUT_SCHEMA = "a0-root-transport-feature-span-scanner/v1";
const OUTPUT_ROW_SCHEMA = "a0-root-transport-feature-span-scanner-row/v1";
const DEFAULT_TOLERANCE = 0.02;
const DEFAULT_RIDGE = 1e-12;
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";

const FEATURE_FAMILIES = [
  {
    family_id: "source_layer_shear",
    feature_names: ["M:D_J", "M:D_tau", "O:D_J", "O:D_tau"],
    source_declaration: "source_layer_shear",
  },
  {
    family_id: "source_layer_signed_polarity_shear",
    feature_names: ["M:signed:D_J", "M:signed:D_tau", "O:signed:D_J", "O:signed:D_tau"],
    source_declaration: "source_layer_signed_polarity_shear",
  },
  {
    family_id: "m_jacobian_signed_polarity_shear",
    feature_names: ["M:D_J", "M:signed:D_J", "M:D_tau", "O:D_J", "O:D_tau"],
    source_declaration: "m_jacobian_signed_polarity_shear",
  },
  {
    family_id: "source_layer_DJ_Dtau_no_phase_projection",
    feature_names: ["M:D_J_unprojected", "M:D_tau_unprojected", "O:D_J_unprojected", "O:D_tau_unprojected"],
    source_declaration: null,
  },
  {
    family_id: "source_layer_full_theta_projection",
    feature_names: [
      "M:D_J",
      "M:D_J_sin",
      "M:D_tau_cos",
      "M:D_tau",
      "O:D_J",
      "O:D_J_sin",
      "O:D_tau_cos",
      "O:D_tau",
    ],
    source_declaration: null,
  },
  {
    family_id: "signed_polarity_full_theta_projection",
    feature_names: [
      "M:signed:D_J",
      "M:signed:D_J_sin",
      "M:signed:D_tau_cos",
      "M:signed:D_tau",
      "O:signed:D_J",
      "O:signed:D_J_sin",
      "O:signed:D_tau_cos",
      "O:signed:D_tau",
    ],
    source_declaration: null,
  },
  {
    family_id: "source_layer_gap_phase",
    feature_names: ["M:G_cos", "M:G_sin", "O:G_cos", "O:G_sin"],
    source_declaration: null,
  },
  {
    family_id: "source_layer_shear_plus_gap_phase",
    feature_names: ["M:D_J", "M:D_tau", "O:D_J", "O:D_tau", "M:G_cos", "M:G_sin", "O:G_cos", "O:G_sin"],
    source_declaration: null,
  },
];

function parseArgs(argv) {
  const args = {
    intake: null,
    rows: "all",
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
    } else if (arg === "--rows") {
      args.rows = argv[++index];
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
  console.log(`Usage: node scripts/mass-map/a0-root-transport-feature-span-scanner.mjs --intake PATH [options]

Options:
  --intake PATH       JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --rows VALUE        "all" or a comma-separated row list. Defaults to all.
  --tolerance N       Held-out relative residual tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --ridge N           Ridge added to normal-equation diagonal. Defaults to ${DEFAULT_RIDGE}.
  --out PATH          Write JSON output to a file instead of stdout.
  --pretty            Pretty-print JSON.
  --help              Show this help.

This diagnostic scanner tests fixed branch-geometric feature spans assembled
from root_transport_source_record. It never authorizes corrected rerun or
accepted history. A non-source-declared family is reported as diagnostic-only.`);
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
  if (ledger?.schema !== LEDGER_SCHEMA) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.schema=${LEDGER_SCHEMA}`);
  }
  if (!Number.isFinite(forcing?.period) || forcing.period <= 0) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.period`);
  }
  if (!Array.isArray(forcing?.samples) || forcing.samples.length < 4) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.samples[4+]`);
  } else {
    for (const [index, sample] of forcing.samples.entries()) {
      if (!Number.isFinite(sample?.t)) {
        missing.push(`sampled_forcing.samples[${index}].t`);
      }
      if (!finiteVector3(sample?.layers?.I?.residual_forcing)) {
        missing.push(`sampled_forcing.samples[${index}].layers.I.residual_forcing[3]`);
      }
    }
  }
  if (record?.schema !== ROOT_TRANSPORT_SOURCE_SCHEMA) {
    missing.push(`rows[].branch_chart_source_records.root_transport_source_record.schema=${ROOT_TRANSPORT_SOURCE_SCHEMA}`);
  }
  if (!Array.isArray(record?.roots) || record.roots.length < 2) {
    missing.push("rows[].branch_chart_source_records.root_transport_source_record.roots[2+]");
  }
  return missing;
}

function samplesFromLedger(ledger) {
  return ledger.sampled_forcing.samples.map((sample) => ({
    t: sample.t,
    residual: sample.layers.I.residual_forcing,
  }));
}

function modulo(value, modulus) {
  if (!Number.isFinite(modulus) || modulus <= 0) {
    return value;
  }
  return ((value % modulus) + modulus) % modulus;
}

function circularDistance(left, right, period) {
  const raw = Math.abs(modulo(left, period) - modulo(right, period));
  return Math.min(raw, Math.abs(period - raw));
}

function rootTransportRootsAtSample(roots, sample, period) {
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const root of roots) {
    const distance = circularDistance(root.t, sample.t, period);
    if (distance < bestDistance) {
      bestDistance = distance;
    }
  }
  const tolerance = Math.max(Math.abs(period) * 1e-10, 1e-12);
  return roots.filter((root) => circularDistance(root.t, sample.t, period) <= bestDistance + tolerance);
}

function parseRootKey(root) {
  const parts = String(root.root_key ?? "").split("|");
  return {
    receiver: root.receiver ?? parts[0] ?? null,
    source: root.source ?? parts[1] ?? null,
    relation: root.relation ?? parts[2] ?? null,
    status: root.status ?? parts[3] ?? null,
  };
}

function bodyLayer(bodyId) {
  return typeof bodyId === "string" ? bodyId.slice(0, 1) : null;
}

function bodyPolarity(bodyId) {
  return typeof bodyId === "string" ? bodyId.slice(1, 2) : null;
}

function polaritySign(receiver, source) {
  return bodyPolarity(receiver) === bodyPolarity(source) ? 1 : -1;
}

function rootFeatureValues(root, key) {
  const layer = bodyLayer(key.source);
  const signed = polaritySign(key.receiver, key.source);
  const theta = Number(root.theta);
  const dJ = Number(root.D_J);
  const dTau = Number(root.D_tau);
  const gap = Number(root.G_r);
  const cosTheta = Math.cos(theta);
  const sinTheta = Math.sin(theta);
  if (![theta, dJ, dTau, gap, cosTheta, sinTheta].every(Number.isFinite)) {
    return {};
  }
  return {
    [`${layer}:D_J`]: gap * dJ * cosTheta,
    [`${layer}:D_J_sin`]: gap * dJ * sinTheta,
    [`${layer}:D_tau_cos`]: gap * dTau * cosTheta,
    [`${layer}:D_tau`]: gap * dTau * sinTheta,
    [`${layer}:signed:D_J`]: signed * gap * dJ * cosTheta,
    [`${layer}:signed:D_J_sin`]: signed * gap * dJ * sinTheta,
    [`${layer}:signed:D_tau_cos`]: signed * gap * dTau * cosTheta,
    [`${layer}:signed:D_tau`]: signed * gap * dTau * sinTheta,
    [`${layer}:D_J_unprojected`]: gap * dJ,
    [`${layer}:D_tau_unprojected`]: gap * dTau,
    [`${layer}:G_cos`]: gap * cosTheta,
    [`${layer}:G_sin`]: gap * sinTheta,
  };
}

function featuresForSample(roots, sample, period, family) {
  const values = new Map(family.feature_names.map((name) => [name, 0]));
  let selectedRootCount = 0;
  let excludedLockedRootCount = 0;
  for (const root of rootTransportRootsAtSample(roots, sample, period)) {
    const key = parseRootKey(root);
    if (bodyLayer(key.receiver) !== "I" || key.relation !== "inter_layer") {
      continue;
    }
    const sourceLayer = bodyLayer(key.source);
    if (sourceLayer !== "M" && sourceLayer !== "O") {
      continue;
    }
    if (root.locked_fold_layer_key === true) {
      excludedLockedRootCount += 1;
      continue;
    }
    const rootValues = rootFeatureValues(root, key);
    for (const name of family.feature_names) {
      const value = rootValues[name];
      if (Number.isFinite(value)) {
        values.set(name, values.get(name) + value);
      }
    }
    selectedRootCount += 1;
  }
  return {
    features: family.feature_names.map((name) => values.get(name)),
    selected_root_count: selectedRootCount,
    excluded_locked_root_count: excludedLockedRootCount,
  };
}

function normalFor(matrix, ridge) {
  const columnCount = matrix[0]?.length ?? 0;
  const normal = Array.from({ length: columnCount }, () => new Array(columnCount).fill(0));
  for (const row of matrix) {
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

function dot(left, right) {
  return left.reduce((sum, value, index) => sum + value * right[index], 0);
}

function componentFit(fitRows, fitTargets, ridge) {
  const normal = normalFor(fitRows, ridge);
  const rhs = new Array(fitRows[0]?.length ?? 0).fill(0);
  for (let row = 0; row < fitRows.length; row += 1) {
    for (let col = 0; col < rhs.length; col += 1) {
      rhs[col] += fitRows[row][col] * fitTargets[row];
    }
  }
  return solveLinearSystem(normal, rhs);
}

function splitFit(samples, ridge, fitSelector, testSelector) {
  const fitSamples = samples.filter(fitSelector);
  const testSamples = samples.filter(testSelector);
  if (fitSamples.length === 0 || testSamples.length === 0) {
    return {
      status: "blocked",
      failure_code: "empty_fit_or_holdout_split",
      relative_residual: null,
      fit_sample_count: fitSamples.length,
      holdout_sample_count: testSamples.length,
    };
  }
  const fitRows = fitSamples.map((sample) => sample.features);
  const testRows = testSamples.map((sample) => sample.features);
  let residualNormSquared = 0;
  let targetNormSquared = 0;
  for (let component = 0; component < 3; component += 1) {
    const fitTargets = fitSamples.map((sample) => sample.residual[component]);
    const coefficients = componentFit(fitRows, fitTargets, ridge);
    if (!coefficients) {
      return {
        status: "blocked",
        failure_code: "holdout_normal_equation_singular",
        relative_residual: null,
        fit_sample_count: fitSamples.length,
        holdout_sample_count: testSamples.length,
      };
    }
    for (let index = 0; index < testSamples.length; index += 1) {
      const target = testSamples[index].residual[component];
      const residual = target - dot(testRows[index], coefficients);
      residualNormSquared += residual * residual;
      targetNormSquared += target * target;
    }
  }
  return {
    status: "computed",
    failure_code: null,
    relative_residual: Math.sqrt(residualNormSquared / Math.max(targetNormSquared, Number.EPSILON)),
    fit_sample_count: fitSamples.length,
    holdout_sample_count: testSamples.length,
  };
}

function fullFitResidual(samples, ridge) {
  const split = splitFit(samples, ridge, () => true, () => true);
  return {
    status: split.status,
    failure_code: split.failure_code,
    relative_residual: split.relative_residual,
  };
}

function heldOutResidual(samples, ridge, tolerance) {
  const half = Math.floor(samples.length / 2);
  const splits = {
    even_to_odd: splitFit(samples, ridge, (_sample, index) => index % 2 === 0, (_sample, index) => index % 2 === 1),
    odd_to_even: splitFit(samples, ridge, (_sample, index) => index % 2 === 1, (_sample, index) => index % 2 === 0),
    first_half_to_second_half: splitFit(samples, ridge, (_sample, index) => index < half, (_sample, index) => index >= half),
    second_half_to_first_half: splitFit(samples, ridge, (_sample, index) => index >= half, (_sample, index) => index < half),
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

function leverageDiagnostics(samples, ridge) {
  const matrix = samples.map((sample) => sample.features);
  const normal = normalFor(matrix, ridge);
  const leverages = matrix.map((row) => {
    const solved = solveLinearSystem(normal, row);
    return solved ? dot(row, solved) : Number.POSITIVE_INFINITY;
  });
  const featureCount = matrix[0]?.length ?? 0;
  const equationCount = samples.length * 3;
  const coefficientCount = featureCount * 3;
  const perFeatureActiveBucketCounts = new Array(featureCount).fill(0);
  for (const row of matrix) {
    for (let column = 0; column < featureCount; column += 1) {
      if (Number.isFinite(row[column]) && Math.abs(row[column]) > 1e-14) {
        perFeatureActiveBucketCounts[column] += 1;
      }
    }
  }
  const featureRank = matrixRank(matrix);
  return {
    equation_count: equationCount,
    coefficient_count: coefficientCount,
    overdetermined: equationCount > coefficientCount,
    trace_h_over_equations: coefficientCount / Math.max(equationCount, 1),
    max_leverage: Math.max(...leverages),
    minimum_observation_buckets_per_basis_group:
      featureCount > 0 ? Math.min(...perFeatureActiveBucketCounts) : 0,
    per_feature_active_bucket_counts: perFeatureActiveBucketCounts,
    feature_rank: featureRank,
    full_column_rank: featureRank === featureCount,
    feature_count: featureCount,
  };
}

function dfGuard(samples, ridge) {
  const diagnostics = leverageDiagnostics(samples, ridge);
  const passed =
    diagnostics.trace_h_over_equations <= 0.5 &&
    diagnostics.max_leverage <= 0.5 &&
    diagnostics.minimum_observation_buckets_per_basis_group >= 2 &&
    diagnostics.overdetermined;
  return {
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "df_guard_fail",
    ...diagnostics,
  };
}

function familySamples(row, family) {
  const ledger = baselineLedger(row);
  const samples = samplesFromLedger(ledger);
  const period = ledger.sampled_forcing.period;
  const record = rootTransportRecord(row);
  let selectedRootCount = 0;
  let excludedLockedRootCount = 0;
  const packet = samples.map((sample) => {
    const features = featuresForSample(record.roots, sample, period, family);
    selectedRootCount += features.selected_root_count;
    excludedLockedRootCount += features.excluded_locked_root_count;
    return {
      t: sample.t,
      residual: sample.residual,
      features: features.features,
    };
  });
  return {
    samples: packet,
    selected_root_count: selectedRootCount,
    excluded_locked_root_count: excludedLockedRootCount,
  };
}

function familyStatus(sourceDeclared, df, heldOut) {
  if (df.status !== "passed") {
    return sourceDeclared ? "source_declared_feature_span_df_fail" : "diagnostic_feature_span_df_fail";
  }
  if (heldOut.status === "passed") {
    return sourceDeclared ? "source_declared_feature_span_candidate" : "diagnostic_feature_span_candidate_not_source_declared";
  }
  return sourceDeclared ? "source_declared_feature_span_no_go" : "diagnostic_feature_span_no_go";
}

function scanFamily(row, family, args) {
  const record = rootTransportRecord(row);
  const declared = Array.isArray(record?.declared_root_transport_quotients)
    ? record.declared_root_transport_quotients
    : [];
  const sourceDeclared = family.source_declaration ? declared.includes(family.source_declaration) : false;
  const samplePacket = familySamples(row, family);
  const df = dfGuard(samplePacket.samples, args.ridge);
  const heldOut = heldOutResidual(samplePacket.samples, args.ridge, args.tolerance);
  return {
    family_id: family.family_id,
    source_declaration: family.source_declaration,
    source_declared: sourceDeclared,
    status: familyStatus(sourceDeclared, df, heldOut),
    feature_names: family.feature_names,
    sample_count: samplePacket.samples.length,
    selected_root_count: samplePacket.selected_root_count,
    excluded_locked_root_count: samplePacket.excluded_locked_root_count,
    full_fit: fullFitResidual(samplePacket.samples, args.ridge),
    df_guard: df,
    held_out_residual: heldOut,
  };
}

function bestByHeldOut(families, predicate) {
  const candidates = families
    .filter(predicate)
    .filter((family) => Number.isFinite(family.held_out_residual?.max_held_out_relative_residual));
  candidates.sort(
    (left, right) =>
      left.held_out_residual.max_held_out_relative_residual -
      right.held_out_residual.max_held_out_relative_residual
  );
  return candidates[0] ?? null;
}

function solveRow(row, args) {
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_feature_span_fields",
      failure_code: "missing-feature-span-fields",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: missingFields,
    };
  }
  const families = FEATURE_FAMILIES.map((family) => scanFamily(row, family, args));
  const bestDeclared = bestByHeldOut(families, (family) => family.source_declared);
  const bestDiagnostic = bestByHeldOut(families, () => true);
  const sourceDeclaredPass = families.find(
    (family) => family.source_declared && family.status === "source_declared_feature_span_candidate"
  );
  const diagnosticPass = families.find((family) => family.status === "diagnostic_feature_span_candidate_not_source_declared");
  const status = sourceDeclaredPass
    ? "root_transport_feature_span_source_declared_candidate"
    : diagnosticPass
      ? "root_transport_feature_span_diagnostic_candidate_not_source_declared"
      : "root_transport_feature_span_no_go";
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status,
    failure_code: status === "root_transport_feature_span_no_go" ? "all-feature-spans-fail-held-out-residual" : null,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    tolerance: args.tolerance,
    source_declared_family_count: families.filter((family) => family.source_declared).length,
    diagnostic_family_count: families.filter((family) => !family.source_declared).length,
    best_source_declared_family: bestDeclared
      ? {
          family_id: bestDeclared.family_id,
          status: bestDeclared.status,
          max_held_out_relative_residual: bestDeclared.held_out_residual.max_held_out_relative_residual,
        }
      : null,
    best_overall_family: bestDiagnostic
      ? {
          family_id: bestDiagnostic.family_id,
          source_declared: bestDiagnostic.source_declared,
          status: bestDiagnostic.status,
          max_held_out_relative_residual: bestDiagnostic.held_out_residual.max_held_out_relative_residual,
        }
      : null,
    families,
    note:
      "This row is a diagnostic scan of fixed branch-geometric feature spans. It does not declare a new quotient for the source artifact and does not authorize corrected rerun or accepted history.",
  };
}

function buildOutput(args, intakePath, artifact) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  const rows =
    topMissing.length === 0
      ? selectRows(artifact, args.rows).map((row) => solveRow(row, args))
      : [];
  const sourceDeclaredCandidateCount = rows.filter(
    (row) => row.status === "root_transport_feature_span_source_declared_candidate"
  ).length;
  const diagnosticCandidateCount = rows.filter(
    (row) => row.status === "root_transport_feature_span_diagnostic_candidate_not_source_declared"
  ).length;
  const blockedCount = rows.filter((row) => String(row.status).startsWith("blocked_")).length;
  const noGoCount = rows.filter((row) => row.status === "root_transport_feature_span_no_go").length;
  const status =
    topMissing.length > 0 || blockedCount > 0
      ? "blocked_missing_feature_span_fields"
      : sourceDeclaredCandidateCount > 0
        ? "root_transport_feature_span_source_declared_candidate"
        : diagnosticCandidateCount > 0
          ? "root_transport_feature_span_diagnostic_candidate_not_source_declared"
          : "root_transport_feature_span_no_go";
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    inputs: {
      intake: intakePath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
    },
    parameters: {
      tolerance: args.tolerance,
      ridge: args.ridge,
      feature_family_count: FEATURE_FAMILIES.length,
      selected_root_rule:
        "I-receiver inter_layer roots at the nearest observation time; locked fold-layer roots excluded; transport_id is not used as a feature.",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      source_declared_candidate_count: sourceDeclaredCandidateCount,
      diagnostic_candidate_count: diagnosticCandidateCount,
      no_go_count: noGoCount,
      blocked_count: blockedCount,
    },
    rows,
    promotion_decision: "priority-only",
    note:
      "A pass here is at most a source-declaration candidate for a future artifact and checker run. It is not corrected-rerun authority.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntake(args);
  const artifact = readJson(intakePath);
  writeJson(args, buildOutput(args, intakePath, artifact));
}

main();
