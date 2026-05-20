#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const LAYERS = ["I", "M", "O"];
const ROOT_RELATIONS = ["self", "partner", "inter_layer"];
const DEFAULT_MODE_COUNT = 8;
const DEFAULT_MEAN_TOLERANCE = 0.02;
const DEFAULT_CORRECTION_TOLERANCE = 0.02;
const DEFAULT_MAX_OMITTED_MODE_FRACTION = 0.5;
const DEFAULT_EPSILON = 1e-12;

function parseArgs(argv) {
  const args = {
    intake: null,
    rows: "all",
    modeCount: DEFAULT_MODE_COUNT,
    meanTolerance: DEFAULT_MEAN_TOLERANCE,
    correctionTolerance: DEFAULT_CORRECTION_TOLERANCE,
    maxOmittedModeFraction: DEFAULT_MAX_OMITTED_MODE_FRACTION,
    omitModes: new Set([1]),
    epsilon: DEFAULT_EPSILON,
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
    } else if (arg === "--mode-count") {
      args.modeCount = parsePositiveInteger(argv[++i], "--mode-count");
    } else if (arg === "--mean-tolerance") {
      args.meanTolerance = parsePositiveNumber(argv[++i], "--mean-tolerance");
    } else if (arg === "--correction-tolerance") {
      args.correctionTolerance = parsePositiveNumber(argv[++i], "--correction-tolerance");
    } else if (arg === "--max-omitted-mode-fraction") {
      args.maxOmittedModeFraction = parseNonnegativeNumber(argv[++i], "--max-omitted-mode-fraction");
    } else if (arg === "--omit-modes") {
      args.omitModes = parseModeSet(argv[++i], "--omit-modes");
    } else if (arg === "--epsilon") {
      args.epsilon = parsePositiveNumber(argv[++i], "--epsilon");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-carrier-correction-scanner.mjs --intake PATH [options]

Options:
  --intake PATH                  JSON from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --rows VALUE                   "all" or a comma-separated row list. Defaults to "all".
  --mode-count N                 Highest Fourier mode to scan. Defaults to ${DEFAULT_MODE_COUNT}.
  --omit-modes LIST              Comma-separated positive modes absorbed by z_Lambda. Defaults to 1.
  --mean-tolerance N             Relative mean-solvability tolerance. Defaults to ${DEFAULT_MEAN_TOLERANCE}.
  --correction-tolerance N       Relative correction residual tolerance. Defaults to ${DEFAULT_CORRECTION_TOLERANCE}.
  --max-omitted-mode-fraction N  Fail if omitted chart modes dominate resolved nonzero forcing. Defaults to ${DEFAULT_MAX_OMITTED_MODE_FRACTION}.
  --epsilon N                    Normalization floor. Defaults to ${DEFAULT_EPSILON}.
  --out PATH                     Write JSON output to a file instead of stdout.
  --pretty                       Pretty-print JSON.
  --help                         Show this help.

This fail-closed scanner consumes a0-tier1-residual-balance-ledger/v1 sampled
forcing data. It tests the mean-solvability condition for d_l''(t)=Q_l g_l(t),
computes nonzero Fourier correction modes, and reports whether the current row
can advance to a corrected one-period rerun. It does not certify an accepted
history segment.`);
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
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

function parseModeSet(value, name) {
  if (String(value).trim() === "none") {
    return new Set();
  }
  const modes = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isInteger(entry) && entry > 0);
  if (modes.length === 0 && String(value).trim() !== "") {
    throw new Error(`Expected ${name} to be comma-separated positive integers or "none".`);
  }
  return new Set(modes);
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

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, factor) {
  return [a[0] * factor, a[1] * factor, a[2] * factor];
}

function norm(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
}

function complexVectorNormSquared(value) {
  let sum = 0;
  for (let component = 0; component < 3; component += 1) {
    sum += value.real[component] * value.real[component] + value.imag[component] * value.imag[component];
  }
  return sum;
}

function zeroComplexVector() {
  return { real: [0, 0, 0], imag: [0, 0, 0] };
}

function addComplexWeighted(acc, vector, cosValue, sinValue, weight) {
  for (let component = 0; component < 3; component += 1) {
    acc.real[component] += vector[component] * cosValue * weight;
    acc.imag[component] -= vector[component] * sinValue * weight;
  }
}

function requiredForcingFields(row) {
  const missing = [];
  const ledger = row.residual_ledgers?.residual_balance;
  if (!ledger) {
    missing.push("rows[].residual_ledgers.residual_balance");
    return missing;
  }
  if (ledger.schema !== "a0-tier1-residual-balance-ledger/v1") {
    missing.push("rows[].residual_ledgers.residual_balance.schema=a0-tier1-residual-balance-ledger/v1");
  }
  const forcing = ledger.sampled_forcing;
  if (!forcing) {
    missing.push("rows[].residual_ledgers.residual_balance.sampled_forcing");
    return missing;
  }
  if (forcing.schema !== "a0-tier1-residual-balance-sampled-forcing/v1") {
    missing.push("rows[].residual_ledgers.residual_balance.sampled_forcing.schema=a0-tier1-residual-balance-sampled-forcing/v1");
  }
  if (!Number.isFinite(forcing.period) || forcing.period <= 0) {
    missing.push("rows[].residual_ledgers.residual_balance.sampled_forcing.period");
  }
  if (!Array.isArray(forcing.samples) || forcing.samples.length < 2) {
    missing.push("rows[].residual_ledgers.residual_balance.sampled_forcing.samples[2+]");
    return missing;
  }
  for (const [sampleIndex, sample] of forcing.samples.entries()) {
    if (!Number.isFinite(sample.t)) {
      missing.push(`sampled_forcing.samples[${sampleIndex}].t`);
    }
    for (const layer of LAYERS) {
      if (!finiteVector3(sample.layers?.[layer]?.residual_forcing)) {
        missing.push(`sampled_forcing.samples[${sampleIndex}].layers.${layer}.residual_forcing`);
      }
    }
    if (missing.length > 24) {
      missing.push("...");
      return missing;
    }
  }
  return missing;
}

function canonicalLayerSamples(forcing, layer, period) {
  const byTime = new Map();
  for (const sample of forcing.samples) {
    if (!Number.isFinite(sample.t) || !finiteVector3(sample.layers?.[layer]?.residual_forcing)) {
      continue;
    }
    const t = modulo(sample.t, period);
    const key = t.toPrecision(12);
    byTime.set(key, { t, value: sample.layers[layer].residual_forcing.map(Number) });
  }
  return [...byTime.values()].sort((a, b) => a.t - b.t);
}

function modulo(value, modulus) {
  return ((value % modulus) + modulus) % modulus;
}

function cyclicIntervals(samples, period) {
  const intervals = [];
  for (let i = 0; i < samples.length; i += 1) {
    const left = samples[i];
    const right = i + 1 < samples.length ? samples[i + 1] : { t: samples[0].t + period, value: samples[0].value };
    const width = right.t - left.t;
    if (Number.isFinite(width) && width > Number.EPSILON) {
      intervals.push({ left, right, width });
    }
  }
  return intervals;
}

function averageNorm(samples, period, power) {
  let integral = 0;
  for (const interval of cyclicIntervals(samples, period)) {
    const leftNorm = norm(interval.left.value);
    const rightNorm = norm(interval.right.value);
    integral += 0.5 * (leftNorm ** power + rightNorm ** power) * interval.width;
  }
  return integral / period;
}

function fourierCoefficient(samples, period, mode) {
  const coefficient = zeroComplexVector();
  const omega = (2 * Math.PI * mode) / period;
  for (const interval of cyclicIntervals(samples, period)) {
    const leftPhase = omega * interval.left.t;
    const rightPhase = omega * interval.right.t;
    addComplexWeighted(coefficient, interval.left.value, Math.cos(leftPhase), Math.sin(leftPhase), interval.width / 2);
    addComplexWeighted(coefficient, interval.right.value, Math.cos(rightPhase), Math.sin(rightPhase), interval.width / 2);
  }
  return {
    real: scale(coefficient.real, 1 / period),
    imag: scale(coefficient.imag, 1 / period),
  };
}

function correctionModeFromForcing(coefficient, period, mode) {
  const omega = (2 * Math.PI * mode) / period;
  return {
    real: scale(coefficient.real, -1 / (omega * omega)),
    imag: scale(coefficient.imag, -1 / (omega * omega)),
  };
}

function layerScan(forcing, layer, args) {
  const period = forcing.period;
  const samples = canonicalLayerSamples(forcing, layer, period);
  if (samples.length < 2) {
    return {
      status: "blocked",
      failure_code: "layer-sampled-forcing-insufficient",
      layer,
      sample_count: samples.length,
    };
  }
  const meanCoefficient = fourierCoefficient(samples, period, 0);
  const meanForcing = meanCoefficient.real;
  const meanAbsForcing = averageNorm(samples, period, 1);
  const meanSolvabilityResidual = norm(meanForcing) / Math.max(meanAbsForcing, args.epsilon);
  const meanSquareForcing = averageNorm(samples, period, 2);
  const modes = [];
  let retainedEnergy = 0;
  let omittedModeEnergy = 0;
  let resolvedNonzeroEnergy = 0;
  for (let mode = 1; mode <= args.modeCount; mode += 1) {
    const forcingCoefficient = fourierCoefficient(samples, period, mode);
    const forcingEnergy = complexVectorNormSquared(forcingCoefficient);
    const omitted = args.omitModes.has(mode);
    resolvedNonzeroEnergy += forcingEnergy;
    if (omitted) {
      omittedModeEnergy += forcingEnergy;
    } else {
      retainedEnergy += forcingEnergy;
    }
    const correctionCoefficient = correctionModeFromForcing(forcingCoefficient, period, mode);
    modes.push({
      mode,
      status: omitted ? "omitted_chart_mode" : "retained_correction_mode",
      forcing_hat: forcingCoefficient,
      correction_hat: omitted ? null : correctionCoefficient,
      forcing_energy: forcingEnergy,
      correction_amplitude: omitted ? null : Math.sqrt(complexVectorNormSquared(correctionCoefficient)),
    });
  }
  const omittedModeEnergyFraction =
    resolvedNonzeroEnergy > args.epsilon ? omittedModeEnergy / resolvedNonzeroEnergy : 0;
  const retainedResolvedEnergyFraction =
    resolvedNonzeroEnergy > args.epsilon ? retainedEnergy / resolvedNonzeroEnergy : 0;
  const correctionResidual = Math.max(meanSolvabilityResidual, Math.sqrt(omittedModeEnergyFraction));
  return {
    status:
      meanSolvabilityResidual > args.meanTolerance
        ? "blocked_mean_solvability_failed"
        : omittedModeEnergyFraction > args.maxOmittedModeFraction
          ? "blocked_chart_mode_dominated"
          : correctionResidual > args.correctionTolerance
            ? "blocked_correction_residual_above_tolerance"
            : "fourier_correction_candidate",
    failure_code:
      meanSolvabilityResidual > args.meanTolerance
        ? "mean-forcing-nonzero"
        : omittedModeEnergyFraction > args.maxOmittedModeFraction
          ? "omitted-chart-mode-dominates-resolved-forcing"
          : correctionResidual > args.correctionTolerance
            ? "resolved-correction-residual-above-tolerance"
            : null,
    layer,
    period,
    sample_count: samples.length,
    mean_forcing: meanForcing,
    mean_abs_forcing: meanAbsForcing,
    mean_square_forcing: meanSquareForcing,
    mean_solvability_residual: meanSolvabilityResidual,
    correction_residual: correctionResidual,
    resolved_nonzero_forcing_energy: resolvedNonzeroEnergy,
    retained_resolved_energy_fraction: retainedResolvedEnergyFraction,
    omitted_chart_mode_energy_fraction: omittedModeEnergyFraction,
    omitted_modes: [...args.omitModes].sort((a, b) => a - b),
    modes,
  };
}

function rowStatus(layerScans) {
  const statuses = layerScans.map((scan) => scan.status);
  if (statuses.includes("blocked_mean_solvability_failed")) {
    return {
      status: "blocked_mean_solvability_failed",
      failure_code: "mean-solvability-condition-failed",
    };
  }
  if (statuses.includes("blocked_chart_mode_dominated")) {
    return {
      status: "blocked_chart_mode_dominated",
      failure_code: "omitted-chart-mode-dominates-resolved-forcing",
    };
  }
  if (statuses.includes("blocked_correction_residual_above_tolerance")) {
    return {
      status: "blocked_correction_residual_above_tolerance",
      failure_code: "resolved-correction-residual-above-tolerance",
    };
  }
  if (statuses.every((status) => status === "fourier_correction_candidate")) {
    return {
      status: "fourier_carrier_correction_candidate",
      failure_code: null,
    };
  }
  return {
    status: "blocked",
    failure_code: "layer-scan-blocked",
  };
}

function scanRow(row, args) {
  const missingFields = requiredForcingFields(row);
  if (missingFields.length > 0) {
    return {
      row: row.row,
      schema: "a0-tier1-carrier-correction-scanner-row/v1",
      status: "blocked_sampled_forcing_missing",
      failure_code: "sampled-forcing-fields-missing",
      missing_fields: missingFields,
      source_status: row.status ?? null,
      correction_rerun_required: false,
      reason:
        "The scanner needs sampled layer residual forcing from a0-tier1-residual-balance-ledger/v1 before it can test mean solvability or Fourier modes.",
    };
  }
  const forcing = row.residual_ledgers.residual_balance.sampled_forcing;
  const layerScans = LAYERS.map((layer) => layerScan(forcing, layer, args));
  const status = rowStatus(layerScans);
  return {
    row: row.row,
    schema: "a0-tier1-carrier-correction-scanner-row/v1",
    status: status.status,
    failure_code: status.failure_code,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    period: forcing.period,
    relation_weight_solution: row.residual_ledgers.residual_balance.relation_weight_solution ?? null,
    tolerances: {
      mean_solvability: args.meanTolerance,
      correction_residual: args.correctionTolerance,
      max_omitted_mode_fraction: args.maxOmittedModeFraction,
    },
    correction_equation: "d_l''(t)=Q_l g_l(t); retained Fourier modes use d_hat_l,m=-g_hat_l,m/(2*pi*m/T)^2 for m != 0.",
    layer_scans: Object.fromEntries(layerScans.map((scan) => [scan.layer, scan])),
    correction_rerun_required: status.status === "fourier_carrier_correction_candidate",
    accepted_history_boundary: {
      status_is_accepted_history_segment: false,
      reason:
        "A Fourier correction candidate only authorizes a corrected one-period rerun. It does not certify state return, root closure, quotient monodromy, Delta_k, or eta-ladder persistence.",
    },
  };
}

function statusCounts(rows) {
  const counts = {};
  for (const row of rows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }
  return counts;
}

function artifactStatus(rows) {
  if (rows.length === 0) {
    return "blocked";
  }
  if (rows.some((row) => row.status === "fourier_carrier_correction_candidate")) {
    return "fourier_carrier_correction_candidate";
  }
  if (rows.some((row) => row.status === "blocked_sampled_forcing_missing")) {
    return "blocked_sampled_forcing_missing";
  }
  if (rows.some((row) => row.status === "blocked_mean_solvability_failed")) {
    return "blocked_mean_solvability_failed";
  }
  return "blocked";
}

function run(artifact, intakePath, args) {
  const rows = selectRows(artifact, args.rows).map((row) => scanRow(row, args));
  return {
    artifact_schema: "a0-tier1-carrier-correction-scanner/v1",
    metadata: {
      artifact: "a0-tier1-carrier-correction-scanner",
      schema_status: "provisional",
      status: artifactStatus(rows),
      generatedAt: new Date().toISOString(),
      sourceIntake: path.relative(process.cwd(), intakePath),
      rowSelector: args.rows,
      modeCount: args.modeCount,
      omittedModes: [...args.omitModes].sort((a, b) => a - b),
      note:
        "Fail-closed mean-solvability and Fourier-mode scanner for the non-circular A0 carrier correction. A candidate row still requires corrected causal-root rerun.",
    },
    source_attempt_metadata: artifact.metadata ?? null,
    selected_row_count: rows.length,
    summary: {
      status_counts: statusCounts(rows),
      candidate_row_count: rows.filter((row) => row.status === "fourier_carrier_correction_candidate").length,
      blocked_row_count: rows.filter((row) => row.status !== "fourier_carrier_correction_candidate").length,
    },
    rows,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const intakePath = requireIntakePath(args);
  const intake = readJson(intakePath);
  const output = run(intake, intakePath, args);
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
}
