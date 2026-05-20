#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const OUTPUT_SCHEMA = "a0-tier1-branch-chart-revision-checker/v1";
const OUTPUT_ROW_SCHEMA = "a0-tier1-branch-chart-revision-checker-row/v1";
const CONTRACT_SCHEMA = "a0-branch-chart-revision-contract/v1";
const BASELINE_LEDGER = "refined_i_receiver_phase_bin_residual_balance";
const REVISION_TYPE = "non_root_key_z_lambda_mode";
const REVISION_MODE = "i_layer_harmonic_deformation_coordinate";
const PRIMARY_MODES = [4, 5, 7];
const GUARD_MODES = [6];
const NYQUIST_WARNING_MODE = 8;
const DEFAULT_TOLERANCE = 0.02;
const DEFAULT_RIDGE = 1e-12;
const SOURCE_DECLARATIONS = new Set([
  "residual_surface_audit",
  "prefit_branch_chart",
  "active_roots",
  "root_times",
  "corrected_carrier_state",
]);

function parseArgs(argv) {
  const args = {
    intake: null,
    rows: "all",
    tolerance: DEFAULT_TOLERANCE,
    ridge: DEFAULT_RIDGE,
    coordinateSource: "residual_surface_audit",
    primaryModes: PRIMARY_MODES,
    guardModes: GUARD_MODES,
    nyquistGuardMode: NYQUIST_WARNING_MODE,
    bucketCount: null,
    out: null,
    pretty: false,
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
    } else if (arg === "--tolerance") {
      args.tolerance = parsePositiveNumber(argv[++i], "--tolerance");
    } else if (arg === "--ridge") {
      args.ridge = parseNonnegativeNumber(argv[++i], "--ridge");
    } else if (arg === "--coordinate-source") {
      args.coordinateSource = parseSourceDeclaration(argv[++i]);
    } else if (arg === "--primary-modes") {
      args.primaryModes = parseModeList(argv[++i], "--primary-modes");
    } else if (arg === "--guard-modes") {
      args.guardModes = parseModeList(argv[++i], "--guard-modes");
    } else if (arg === "--nyquist-guard-mode") {
      args.nyquistGuardMode = parsePositiveInteger(argv[++i], "--nyquist-guard-mode");
    } else if (arg === "--bucket-count") {
      args.bucketCount = parsePositiveInteger(argv[++i], "--bucket-count");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-branch-chart-revision-checker.mjs --intake PATH [options]

Options:
  --intake PATH             JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --rows VALUE              "all" or a comma-separated row list. Defaults to "all".
  --coordinate-source VALUE residual_surface_audit, prefit_branch_chart, active_roots, root_times, or corrected_carrier_state.
                            Defaults to residual_surface_audit, which fails closed as a hidden-fit source.
  --primary-modes VALUE     Comma-separated harmonic modes. Defaults to ${PRIMARY_MODES.join(",")}.
  --guard-modes VALUE       Comma-separated guard harmonic modes. Defaults to ${GUARD_MODES.join(",")}.
  --nyquist-guard-mode N    Mode treated as a Nyquist warning. Defaults to ${NYQUIST_WARNING_MODE}.
  --bucket-count N          Expected observation bucket count. Defaults to sampled-forcing sample count.
  --tolerance N             Held-out relative residual tolerance. Defaults to ${DEFAULT_TOLERANCE}.
  --ridge N                 Ridge added to normal-equation diagonal. Defaults to ${DEFAULT_RIDGE}.
  --out PATH                Write JSON output to a file instead of stdout.
  --pretty                  Pretty-print JSON.
  --help                    Show this help.

This fail-closed checker consumes a corrected $A_0$ one-period attempt artifact
and emits the pre-rerun branch-chart revision contract ledger. It does not run a
corrected one-period map and never emits accepted history.`);
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

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
}

function parseModeList(value, name) {
  const modes = String(value)
    .split(",")
    .map((entry) => parsePositiveInteger(entry.trim(), name));
  if (modes.length === 0) {
    throw new Error(`Expected ${name} to contain at least one mode.`);
  }
  return [...new Set(modes)].sort((left, right) => left - right);
}

function parseSourceDeclaration(value) {
  if (SOURCE_DECLARATIONS.has(value)) {
    return value;
  }
  throw new Error(`Unsupported --coordinate-source value: ${value}`);
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

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every(Number.isFinite);
}

function rowMissingFields(row) {
  const missing = [];
  const ledger = row?.residual_ledgers?.[BASELINE_LEDGER];
  const forcing = ledger?.sampled_forcing;
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (ledger?.schema !== "a0-tier1-refined-residual-basis-ledger/v1") {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.schema=a0-tier1-refined-residual-basis-ledger/v1`);
  }
  if (!Number.isFinite(ledger?.relative_residual)) {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.relative_residual`);
  }
  if (!Number.isFinite(forcing?.period) || forcing.period <= 0) {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.sampled_forcing.period`);
  }
  if (!Array.isArray(forcing?.samples) || forcing.samples.length < 2) {
    missing.push(`rows[].residual_ledgers.${BASELINE_LEDGER}.sampled_forcing.samples[2+]`);
    return missing;
  }
  for (const [index, sample] of forcing.samples.entries()) {
    if (!Number.isFinite(sample?.t)) {
      missing.push(`sampled_forcing.samples[${index}].t`);
    }
    if (!finiteVector3(sample?.layers?.I?.residual_forcing)) {
      missing.push(`sampled_forcing.samples[${index}].layers.I.residual_forcing`);
    }
  }
  return missing;
}

function baselineLedger(row) {
  return row?.residual_ledgers?.[BASELINE_LEDGER] ?? null;
}

function sourceCheck(args) {
  const passed = args.coordinateSource !== "residual_surface_audit";
  return {
    residual: "R_src",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "rejected_hidden_fit_split",
    coordinate_source: args.coordinateSource,
    allowed_sources: ["prefit_branch_chart", "active_roots", "root_times", "corrected_carrier_state"],
    note: passed
      ? "The coordinate source declaration is pre-fit or branch-state facing; this checker still requires held-out residual evidence."
      : "The available coordinate signal is only a residual-surface audit. It may diagnose a candidate mode, but it cannot authorize a branch coordinate.",
  };
}

function noveltyCheck(ledger) {
  const passed = ledger?.basis_resolution?.basis_mode === "i_receiver_root_key_phase_bin";
  return {
    residual: "D_new",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "missing_failed_phase_bin_baseline",
    baseline_basis_mode: ledger?.basis_resolution?.basis_mode ?? null,
    declared_revision_type: REVISION_TYPE,
    declared_non_root_key_mode: true,
  };
}

function symmetryCheck(primaryModes, guardModes) {
  return {
    residual: "R_sym",
    status: "passed",
    basis: "cos/sin harmonic pair under common S^1_k phase gauge",
    primary_modes: primaryModes,
    guard_modes: guardModes,
  };
}

function equalityCheck(ledger) {
  const constraints = ledger?.equality_constraints ?? {};
  const passed =
    constraints.root_key_resolved_mu_test === true &&
    constraints.phase_bin_branch_coordinate_test === true &&
    typeof ledger?.basis_resolution?.equality_group_key === "string";
  return {
    residual: "R_eq",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "baseline_equality_map_missing",
    baseline_equality_group_key: ledger?.basis_resolution?.equality_group_key ?? null,
    revision_equality_group_key:
      "relation + receiver_layer + source_layer + polarity_pair + root_key + harmonic_mode + harmonic_quadrature + projection",
  };
}

function lockCheck(ledger) {
  const passed = ledger?.equality_constraints?.locked_fold_layer_keys_excluded === true;
  return {
    residual: "R_lock",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "locked_fold_layer_keys_not_excluded",
    locked_fold_layer_keys_excluded: passed,
  };
}

function benchmarkCheck(row, ledger) {
  const passed =
    ledger?.equality_constraints?.benchmark_inputs_excluded === true &&
    row?.validation?.benchmark_inputs_excluded === true;
  return {
    residual: "R_bench",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "benchmark_inputs_not_excluded",
    ledger_benchmark_inputs_excluded: ledger?.equality_constraints?.benchmark_inputs_excluded === true,
    row_benchmark_inputs_excluded: row?.validation?.benchmark_inputs_excluded === true,
  };
}

function transportCheck(row) {
  const passed = row?.validation?.root_ledger_stable_under_refinement === true;
  return {
    residual: "R_transport",
    status: passed ? "passed" : "pending",
    failure_code: passed ? null : "branch_transport_not_yet_certified",
    root_ledger_stable_under_refinement: row?.validation?.root_ledger_stable_under_refinement ?? null,
    note: "This pre-rerun checker records the transport blocker; a corrected rerun still must prove persistence under refinement and eta-ladder transport.",
  };
}

function onePeriodCheck(row) {
  const passed = row?.validation?.direct_residuals_passed === true;
  return {
    residual: "R_1p",
    status: passed ? "passed" : "pending",
    failure_code: passed ? null : "corrected_one_period_residuals_not_passed",
    direct_residuals_passed: row?.validation?.direct_residuals_passed ?? null,
    accepted_history_boundary: false,
  };
}

function nyquistCheck(sampleCount, primaryModes, guardModes, nyquistGuardMode, expectedBucketCount) {
  const bucketCount = expectedBucketCount ?? sampleCount;
  const nyquist = bucketCount / 2;
  const allModes = [...primaryModes, ...guardModes];
  const maxMode = Math.max(...allModes);
  const passed = Number.isFinite(nyquist) && maxMode < nyquist && !allModes.includes(nyquistGuardMode);
  return {
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "nyquist_mode_requires_higher_sample_count",
    sample_count: sampleCount,
    expected_bucket_count: bucketCount,
    nyquist_mode: nyquist,
    primary_modes: primaryModes,
    guard_modes: guardModes,
    nyquist_guard_mode: nyquistGuardMode,
    nyquist_guard_mode_admitted: false,
  };
}

function designRow(t, period, modes) {
  const phi = (2 * Math.PI * t) / period;
  return modes.flatMap((mode) => [Math.cos(mode * phi), Math.sin(mode * phi)]);
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
  for (let i = 0; i < columnCount; i += 1) {
    normal[i][i] += ridge;
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

function splitFit(samples, modes, period, ridge, fitSelector, testSelector) {
  const fitSamples = samples.filter(fitSelector);
  const testSamples = samples.filter(testSelector);
  if (fitSamples.length === 0 || testSamples.length === 0) {
    return {
      status: "blocked",
      failure_code: "empty_fit_or_holdout_split",
      fit_sample_count: fitSamples.length,
      holdout_sample_count: testSamples.length,
    };
  }
  const fitRows = fitSamples.map((sample) => designRow(sample.t, period, modes));
  const testRows = testSamples.map((sample) => designRow(sample.t, period, modes));
  let residualNormSquared = 0;
  let targetNormSquared = 0;
  for (let component = 0; component < 3; component += 1) {
    const fitTargets = fitSamples.map((sample) => sample.residual[component]);
    const coefficients = componentFit(fitRows, fitTargets, ridge);
    if (!coefficients) {
      return {
        status: "blocked",
        failure_code: "holdout_normal_equation_singular",
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
    fit_sample_count: fitSamples.length,
    holdout_sample_count: testSamples.length,
    residual_norm: Math.sqrt(residualNormSquared),
    target_norm: Math.sqrt(targetNormSquared),
    relative_residual: Math.sqrt(residualNormSquared / Math.max(targetNormSquared, Number.EPSILON)),
  };
}

function leverageDiagnostics(samples, modes, period, ridge) {
  const matrix = samples.map((sample) => designRow(sample.t, period, modes));
  const normal = normalFor(matrix, ridge);
  const leverages = matrix.map((row) => {
    const solved = solveLinearSystem(normal, row);
    return solved ? dot(row, solved) : Number.POSITIVE_INFINITY;
  });
  const coefficientCount = modes.length * 2 * 2;
  const equationCount = samples.length * 2;
  return {
    equation_count: equationCount,
    coefficient_count: coefficientCount,
    overdetermined: equationCount > coefficientCount,
    trace_h_over_equations: coefficientCount / Math.max(equationCount, 1),
    max_leverage: Math.max(...leverages),
    minimum_observation_buckets_per_basis_group: samples.length,
    diagnostic_cartesian_equation_count: samples.length * 3,
    diagnostic_cartesian_coefficient_count: modes.length * 2 * 3,
  };
}

function fullFitResidual(samples, modes, period, ridge) {
  const computed = splitFit(samples, modes, period, ridge, () => true, () => true);
  return {
    status: computed.status,
    failure_code: computed.failure_code ?? null,
    residual_norm: computed.residual_norm ?? null,
    target_norm: computed.target_norm ?? null,
    relative_residual: computed.relative_residual ?? null,
  };
}

function heldOutResidual(samples, modes, period, ridge, tolerance) {
  const evenToOdd = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index % 2 === 0,
    (_sample, index) => index % 2 === 1
  );
  const oddToEven = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index % 2 === 1,
    (_sample, index) => index % 2 === 0
  );
  const blockHalf = Math.floor(samples.length / 2);
  const firstToSecond = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index < blockHalf,
    (_sample, index) => index >= blockHalf
  );
  const secondToFirst = splitFit(
    samples,
    modes,
    period,
    ridge,
    (_sample, index) => index >= blockHalf,
    (_sample, index) => index < blockHalf
  );
  const splits = { even_to_odd: evenToOdd, odd_to_even: oddToEven, first_half_to_second_half: firstToSecond, second_half_to_first_half: secondToFirst };
  const computed = Object.values(splits).filter((split) => split.status === "computed");
  const maxRelativeResidual = computed.length
    ? Math.max(...computed.map((split) => split.relative_residual))
    : Number.POSITIVE_INFINITY;
  const passed =
    computed.length === Object.values(splits).length &&
    Number.isFinite(maxRelativeResidual) &&
    maxRelativeResidual <= tolerance;
  return {
    residual: "R_xval",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "overfit_holdout_fail",
    tolerance,
    held_out_bucket_scheme: "even_odd_and_blocked_bucket_holdout",
    max_held_out_relative_residual: Number.isFinite(maxRelativeResidual) ? maxRelativeResidual : null,
    splits,
  };
}

function dfGuard(samples, modes, period, ridge) {
  const diagnostics = leverageDiagnostics(samples, modes, period, ridge);
  const passed =
    diagnostics.trace_h_over_equations <= 0.5 &&
    diagnostics.max_leverage <= 0.5 &&
    diagnostics.minimum_observation_buckets_per_basis_group >= 2 &&
    diagnostics.overdetermined;
  return {
    residual: "R_df",
    status: passed ? "passed" : "failed",
    failure_code: passed ? null : "df_guard_fail",
    ...diagnostics,
  };
}

function samplesFromLedger(ledger) {
  return ledger.sampled_forcing.samples.map((sample) => ({
    t: sample.t,
    residual: sample.layers.I.residual_forcing,
  }));
}

function finalStatus(checks) {
  const failureOrder = [
    ["R_src", "rejected_hidden_fit_split"],
    ["D_new", "rejected_already_covered_coordinate"],
    ["nyquist", "nyquist_mode_requires_higher_sample_count"],
    ["R_lock", "locked_fold_layer_keys_not_excluded"],
    ["R_bench", "benchmark_inputs_not_excluded"],
    ["R_df", "df_guard_fail"],
    ["R_xval", "overfit_holdout_fail"],
  ];
  for (const [key, status] of failureOrder) {
    const check = checks[key];
    if (check?.status === "failed") {
      return status;
    }
  }
  if (checks.R_transport?.status !== "passed") {
    return "revision_candidate_only";
  }
  if (checks.R_1p?.status !== "passed") {
    return "revision_candidate_only";
  }
  return "revision_candidate_only";
}

function solveRow(row, args, intakePath) {
  const missing = rowMissingFields(row);
  if (missing.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_branch_chart_revision_fields",
      failure_code: "missing-branch-chart-revision-fields",
      missing_fields: missing,
      accepted_history_boundary: false,
    };
  }
  const ledger = baselineLedger(row);
  const samples = samplesFromLedger(ledger);
  const period = ledger.sampled_forcing.period;
  const nyquist = nyquistCheck(
    samples.length,
    args.primaryModes,
    args.guardModes,
    args.nyquistGuardMode,
    args.bucketCount
  );
  const fullFit = fullFitResidual(samples, args.primaryModes, period, args.ridge);
  const guardFit = fullFitResidual(samples, [...args.primaryModes, ...args.guardModes], period, args.ridge);
  const checks = {
    R_src: sourceCheck(args),
    D_new: noveltyCheck(ledger),
    R_sym: symmetryCheck(args.primaryModes, args.guardModes),
    R_eq: equalityCheck(ledger),
    R_lock: lockCheck(ledger),
    R_transport: transportCheck(row),
    R_df: dfGuard(samples, args.primaryModes, period, args.ridge),
    R_xval: heldOutResidual(samples, args.primaryModes, period, args.ridge, args.tolerance),
    R_1p: onePeriodCheck(row),
    R_bench: benchmarkCheck(row, ledger),
    nyquist,
  };
  const status = finalStatus(checks);
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status,
    failure_code: status === "revision_candidate_only" ? null : status,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    branch_chart_revision: {
      schema: CONTRACT_SCHEMA,
      source_artifact: intakePath,
      revision_type: REVISION_TYPE,
      mode: REVISION_MODE,
      coordinate_name: "H_I",
      receiver_layer: "I",
      z_lambda_extension: {
        primary_inner_harmonic_modes: args.primaryModes,
        guard_inner_harmonic_modes: args.guardModes,
      },
      nyquist_guard: {
        mode_8_requires_higher_sample_count: args.nyquistGuardMode === 8,
        nyquist_guard_mode: args.nyquistGuardMode,
        max_mode_must_be_below_sample_count_over_2: true,
      },
      coordinate_source_fields: args.coordinateSource,
      equality_group_key:
        "relation + receiver_layer + source_layer + polarity_pair + root_key + harmonic_mode + harmonic_quadrature + projection",
      held_out_residual_rule: "even_odd_and_blocked_bucket_holdout",
      locked_fold_layer_keys_excluded: checks.R_lock.status === "passed",
      benchmark_inputs_excluded: checks.R_bench.status === "passed",
      accepted_history_boundary: false,
    },
    baseline_no_go: {
      ledger: BASELINE_LEDGER,
      status: ledger.status,
      relative_residual: ledger.relative_residual,
      tolerance: ledger.tolerance ?? args.tolerance,
      basis_group_count: ledger.basis_group_count,
      equation_count: ledger.equation_count,
      sample_count: ledger.sample_count,
    },
    harmonic_audit: {
      primary_modes: args.primaryModes,
      guard_modes: args.guardModes,
      full_fit_primary: fullFit,
      full_fit_primary_plus_guard: guardFit,
      diagnostic_fit_basis: "cartesian residual-forcing surrogate; declared coordinate count remains radial/tangential",
      note:
        "The harmonic audit is diagnostic only. A low in-sample residual is not a branch-chart coordinate unless the source and held-out residual checks pass.",
    },
    anti_overfit_residual: checks,
    accepted_history_boundary: false,
    rerun_authority:
      status === "revision_candidate_only"
        ? "corrected_rerun_input_check_only_not_accepted_history"
        : "blocked_before_corrected_rerun",
  };
}

function buildOutput(artifact, args, intakePath) {
  const topMissing = topLevelMissingFields(artifact);
  const rows = topMissing.length > 0 ? [] : selectRows(artifact, args.rows).map((row) => solveRow(row, args, intakePath));
  const statusCounts = rows.reduce((counts, row) => {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
    return counts;
  }, {});
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    intake: intakePath,
    intake_schema: artifact?.artifact_schema ?? null,
    status: topMissing.length
      ? "blocked_invalid_intake"
      : rows.some((row) => row.status !== "revision_candidate_only")
        ? "blocked_before_corrected_rerun"
        : "revision_candidate_only",
    accepted_history_boundary: false,
    parameters: {
      rows: args.rows,
      tolerance: args.tolerance,
      ridge: args.ridge,
      coordinate_source: args.coordinateSource,
      primary_modes: args.primaryModes,
      guard_modes: args.guardModes,
      nyquist_guard_mode: args.nyquistGuardMode,
      bucket_count: args.bucketCount,
    },
    missing_fields: topMissing,
    summary: {
      selected_row_count: rows.length,
      status_counts: statusCounts,
      accepted_history_row_count: 0,
      rerun_candidate_row_count: rows.filter((row) => row.status === "revision_candidate_only").length,
    },
    nonfit_statement:
      "This checker may audit harmonic residual structure, but it does not use observed particle masses, measured alpha, CKM values, or accepted-history output. A residual-surface-only coordinate source fails closed as hidden fitting.",
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
