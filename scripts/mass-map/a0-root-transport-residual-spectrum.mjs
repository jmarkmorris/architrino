#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const ROOT_TRANSPORT_SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const LEDGER_SCHEMA = "a0-tier1-refined-residual-basis-ledger/v1";
const SCAN_SCHEMA = "a0-root-transport-feature-span-scanner/v1";
const OUTPUT_SCHEMA = "a0-root-transport-residual-spectrum/v1";
const OUTPUT_ROW_SCHEMA = "a0-root-transport-residual-spectrum-row/v1";
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";
const COMPONENTS = ["x", "y", "z"];

function parseArgs(argv) {
  const args = {
    intake: null,
    scan: null,
    rows: "all",
    maxMode: null,
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
    } else if (arg === "--scan") {
      args.scan = argv[++index];
    } else if (arg === "--rows") {
      args.rows = argv[++index];
    } else if (arg === "--max-mode") {
      args.maxMode = parseNonnegativeInteger(argv[++index], "--max-mode");
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
  console.log(`Usage: node scripts/mass-map/a0-root-transport-residual-spectrum.mjs --intake PATH [options]

Options:
  --intake PATH       JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --scan PATH         Optional a0-root-transport-feature-span-scanner/v1 artifact for context only.
  --rows VALUE        "all" or a comma-separated row list. Defaults to all.
  --max-mode N        Highest one-sided Fourier mode to report. Defaults to floor(sample_count / 2).
  --out PATH          Write JSON output to a file instead of stdout.
  --pretty            Pretty-print JSON.
  --help              Show this help.

This diagnostic reports the residual forcing spectrum of the sampled
refined_i_receiver_phase_bin_residual_balance buckets. It does not fit branch
chart coordinates and never authorizes corrected rerun or accepted history.`);
}

function parseNonnegativeInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Expected ${name} to be a nonnegative integer, got: ${value}`);
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
  if (!Array.isArray(forcing?.samples) || forcing.samples.length < 2) {
    missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.samples[2+]`);
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
  return missing;
}

function samplesFromLedger(ledger) {
  return ledger.sampled_forcing.samples.map((sample) => ({
    t: sample.t,
    residual: sample.layers.I.residual_forcing,
  }));
}

function squaredNorm(values) {
  return values.reduce((sum, value) => sum + value * value, 0);
}

function componentNorms(samples) {
  const squared = [0, 0, 0];
  for (const sample of samples) {
    for (let component = 0; component < 3; component += 1) {
      squared[component] += sample.residual[component] * sample.residual[component];
    }
  }
  return {
    x: Math.sqrt(squared[0]),
    y: Math.sqrt(squared[1]),
    z: Math.sqrt(squared[2]),
  };
}

function modeEnergy(values, mode) {
  const n = values.length;
  let real = 0;
  let imag = 0;
  for (let index = 0; index < n; index += 1) {
    const angle = (-2 * Math.PI * mode * index) / n;
    real += values[index] * Math.cos(angle);
    imag += values[index] * Math.sin(angle);
  }
  real /= n;
  imag /= n;
  const twoSidedEnergy = real * real + imag * imag;
  const oneSidedMultiplier = mode === 0 || mode * 2 === n ? 1 : 2;
  return oneSidedMultiplier * twoSidedEnergy;
}

function spectralDiagnostics(samples, requestedMaxMode) {
  const n = samples.length;
  const safeMaxMode = Math.floor(n / 2);
  const maxMode = Math.min(requestedMaxMode ?? safeMaxMode, safeMaxMode);
  const columns = [0, 1, 2].map((component) => samples.map((sample) => sample.residual[component]));
  const componentTotalEnergy = columns.map((column) => squaredNorm(column) / n);
  const totalEnergy = componentTotalEnergy.reduce((sum, value) => sum + value, 0);
  const modes = [];
  for (let mode = 0; mode <= maxMode; mode += 1) {
    const componentEnergies = columns.map((column) => modeEnergy(column, mode));
    const modeTotalEnergy = componentEnergies.reduce((sum, value) => sum + value, 0);
    modes.push({
      mode,
      total_energy_fraction: totalEnergy > 0 ? modeTotalEnergy / totalEnergy : null,
      component_energy_fractions: Object.fromEntries(
        COMPONENTS.map((name, index) => [
          name,
          componentTotalEnergy[index] > 0 ? componentEnergies[index] / componentTotalEnergy[index] : null,
        ])
      ),
    });
  }
  return {
    reported_mode_count: modes.length,
    max_mode: maxMode,
    safe_max_mode: safeMaxMode,
    modes,
    dominant_mode_summary: dominantModeSummary(modes),
  };
}

function dominantModeSummary(modes) {
  const byTotal = modes
    .filter((mode) => Number.isFinite(mode.total_energy_fraction))
    .sort((left, right) => right.total_energy_fraction - left.total_energy_fraction)[0];
  const components = {};
  for (const component of COMPONENTS) {
    const best = modes
      .filter((mode) => Number.isFinite(mode.component_energy_fractions[component]))
      .sort(
        (left, right) =>
          right.component_energy_fractions[component] - left.component_energy_fractions[component]
      )[0];
    components[component] = best
      ? {
          mode: best.mode,
          energy_fraction: best.component_energy_fractions[component],
        }
      : null;
  }
  return {
    total: byTotal
      ? {
          mode: byTotal.mode,
          energy_fraction: byTotal.total_energy_fraction,
        }
      : null,
    components,
  };
}

function scanContextForRow(scanArtifact, rowNumber) {
  if (!scanArtifact) {
    return null;
  }
  const scanRow = rowsOf(scanArtifact).find((row) => row.row === rowNumber) ?? null;
  return {
    scan_schema: scanArtifact?.artifact_schema ?? null,
    scan_status: scanArtifact?.status ?? null,
    row_status: scanRow?.status ?? null,
    best_source_declared_family: scanRow?.best_source_declared_family ?? null,
    best_overall_family: scanRow?.best_overall_family ?? null,
  };
}

function solveRow(row, args, scanArtifact) {
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_residual_spectrum_fields",
      failure_code: "missing-residual-spectrum-fields",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: missingFields,
      scan_context: scanContextForRow(scanArtifact, row?.row),
    };
  }
  const ledger = baselineLedger(row);
  const samples = samplesFromLedger(ledger);
  const norms = componentNorms(samples);
  const totalNorm = Math.sqrt(norms.x * norms.x + norms.y * norms.y + norms.z * norms.z);
  const spectrum = spectralDiagnostics(samples, args.maxMode);
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status: "residual_spectrum_computed",
    failure_code: null,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    ledger_key: LEDGER_KEY,
    sample_count: samples.length,
    period: ledger.sampled_forcing.period,
    component_norms: norms,
    total_norm: totalNorm,
    spectrum,
    scan_context: scanContextForRow(scanArtifact, row.row),
    note:
      "This row reports residual forcing spectral diagnostics only. It does not fit root-transport branch-chart coordinates and does not authorize corrected rerun or accepted history.",
  };
}

function buildOutput(args, intakePath, artifact, scanPath, scanArtifact) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  if (scanArtifact && scanArtifact?.artifact_schema !== SCAN_SCHEMA) {
    topMissing.push(`scan.artifact_schema=${SCAN_SCHEMA}`);
  }
  const rows =
    topMissing.length === 0
      ? selectRows(artifact, args.rows).map((row) => solveRow(row, args, scanArtifact))
      : [];
  const blockedCount = rows.filter((row) => String(row.status).startsWith("blocked_")).length;
  const status = topMissing.length > 0 || blockedCount > 0 ? "blocked_missing_residual_spectrum_fields" : "computed";
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    inputs: {
      intake: intakePath,
      scan: scanPath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
      scan_schema: scanArtifact?.artifact_schema ?? null,
    },
    parameters: {
      max_mode: args.maxMode,
      default_max_mode_rule: "floor(sample_count / 2)",
      residual_source:
        "rows[].residual_ledgers.refined_i_receiver_phase_bin_residual_balance.sampled_forcing.samples[].layers.I.residual_forcing",
      scan_context_rule:
        "Optional feature-span scan status and best-family residuals are copied as context only and are not inputs to the residual spectrum computation.",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      computed_count: rows.filter((row) => row.status === "residual_spectrum_computed").length,
      blocked_count: blockedCount,
    },
    rows,
    promotion_decision: "diagnostic-only",
    note:
      "This artifact is a residual forcing spectrum diagnostic. It does not fit new branch-chart coordinates and is not corrected-rerun authority.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntake(args);
  const scanPath = args.scan ? path.resolve(args.scan) : null;
  const artifact = readJson(intakePath);
  const scanArtifact = scanPath ? readJson(scanPath) : null;
  writeJson(args, buildOutput(args, intakePath, artifact, scanPath, scanArtifact));
}

main();
