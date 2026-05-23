#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const RESIDUAL_SPECTRUM_SCHEMA = "a0-root-transport-residual-spectrum/v1";
const ROOT_TRANSPORT_SOURCE_SCHEMA = "a0-root-transport-source-record/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const OUTPUT_SCHEMA = "a0-mode-band-source-eligibility/v1";
const OUTPUT_ROW_SCHEMA = "a0-mode-band-source-eligibility-row/v1";
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";
const DEFAULT_MODES = [4, 5, 6, 7];
const DEFAULT_TOP = 12;
const DEFAULT_CANDIDATE_FRACTION = 0.7;
const COMPONENTS = ["x", "y", "z"];
const LAYERS = ["I", "M", "O"];
const POLARITIES = ["+", "-"];

function parseArgs(argv) {
  const args = {
    intake: null,
    residualSpectrum: null,
    rows: "all",
    modes: DEFAULT_MODES,
    top: DEFAULT_TOP,
    candidateFraction: DEFAULT_CANDIDATE_FRACTION,
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
    } else if (arg === "--residual-spectrum") {
      args.residualSpectrum = argv[++index];
    } else if (arg === "--rows") {
      args.rows = argv[++index];
    } else if (arg === "--modes") {
      args.modes = parseModeList(argv[++index], "--modes");
    } else if (arg === "--top") {
      args.top = parsePositiveInteger(argv[++index], "--top");
    } else if (arg === "--candidate-fraction") {
      args.candidateFraction = parseFraction(argv[++index], "--candidate-fraction");
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
  console.log(`Usage: node scripts/mass-map/a0-mode-band-source-eligibility.mjs --intake PATH [options]

Options:
  --intake PATH              JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --residual-spectrum PATH   Optional a0-root-transport-residual-spectrum/v1 artifact for context only.
  --rows VALUE               "all" or a comma-separated row list. Defaults to all.
  --modes VALUE              Comma-separated cyclic modes to audit. Defaults to ${DEFAULT_MODES.join(",")}.
  --top N                    Number of ranked source channels to report. Defaults to ${DEFAULT_TOP}.
  --candidate-fraction N     Diagnostic threshold for source-direction presence. Defaults to ${DEFAULT_CANDIDATE_FRACTION}.
  --out PATH                 Write JSON output to a file instead of stdout.
  --pretty                   Pretty-print JSON.
  --help                     Show this help.

This diagnostic audits pre-fit branch-state source channels for cyclic mode-band
content. It does not fit residuals, does not define a branch-chart coordinate,
and never authorizes corrected rerun or accepted history.`);
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive integer, got: ${value}`);
  }
  return number;
}

function parseFraction(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0 || number > 1) {
    throw new Error(`Expected ${name} to be a number in [0,1], got: ${value}`);
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

function bodyIds() {
  return LAYERS.flatMap((layer) => POLARITIES.map((polarity) => `${layer}${polarity}`));
}

function bodyLayer(bodyId) {
  return typeof bodyId === "string" ? bodyId.slice(0, 1) : null;
}

function rowMissingFields(row) {
  const missing = [];
  const forcing = row?.residual_ledgers?.[LEDGER_KEY]?.sampled_forcing;
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
      for (const bodyId of bodyIds()) {
        if (!finiteVector3(sample?.bodies?.[bodyId]?.position)) {
          missing.push(`rows[].samples[${sampleIndex}].bodies.${bodyId}.position[3]`);
        }
        if (!finiteVector3(sample?.bodies?.[bodyId]?.velocity)) {
          missing.push(`rows[].samples[${sampleIndex}].bodies.${bodyId}.velocity[3]`);
        }
      }
    }
  }
  if (forcing !== undefined) {
    if (!Array.isArray(forcing?.samples) || forcing.samples.length < 2) {
      missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.samples[2+]`);
    } else {
      for (const [sampleIndex, sample] of forcing.samples.entries()) {
        if (!Number.isFinite(sample?.t)) {
          missing.push(`rows[].residual_ledgers.${LEDGER_KEY}.sampled_forcing.samples[${sampleIndex}].t`);
        }
      }
    }
  }
  return missing;
}

function vectorSubtract(left, right) {
  return left.map((value, index) => value - right[index]);
}

function vectorNorm(vector) {
  return Math.sqrt(vector.reduce((sum, value) => sum + value * value, 0));
}

function addChannel(channels, name, sourceClass, values) {
  if (values.length > 0 && values.every(Number.isFinite)) {
    channels.push({ name, source_class: sourceClass, values });
  }
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

function analysisSamples(row) {
  const forcingSamples = row?.residual_ledgers?.[LEDGER_KEY]?.sampled_forcing?.samples;
  const times =
    Array.isArray(forcingSamples) && forcingSamples.length >= 2
      ? forcingSamples.map((sample) => sample.t)
      : row.samples.map((sample) => sample.t);
  return times
    .map((t) => nearestSample(row.samples, t, row.period))
    .filter((sample) => sample && Number.isFinite(sample.t));
}

function groupedKeys(rows, keyFor) {
  return [...new Set((Array.isArray(rows) ? rows : []).map(keyFor).filter(Boolean))].sort();
}

function sampleGroups(rows, sample, period, keyFor) {
  const groups = new Map();
  for (const row of nearestRows(rows, sample.t, period)) {
    const key = keyFor(row);
    if (!key) {
      continue;
    }
    const group = groups.get(key) ?? [];
    group.push(row);
    groups.set(key, group);
  }
  return groups;
}

function mean(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function bodyStateChannels(samples) {
  const channels = [];
  for (const layer of LAYERS) {
    const positions = samples.map((sample) =>
      vectorSubtract(sample.bodies[`${layer}+`].position, sample.bodies[`${layer}-`].position)
    );
    const velocities = samples.map((sample) =>
      vectorSubtract(sample.bodies[`${layer}+`].velocity, sample.bodies[`${layer}-`].velocity)
    );
    for (let component = 0; component < COMPONENTS.length; component += 1) {
      addChannel(
        channels,
        `body:${layer}:rel_pos:${COMPONENTS[component]}`,
        "corrected_carrier_state",
        positions.map((vector) => vector[component])
      );
      addChannel(
        channels,
        `body:${layer}:rel_vel:${COMPONENTS[component]}`,
        "corrected_carrier_state",
        velocities.map((vector) => vector[component])
      );
    }
    addChannel(
      channels,
      `body:${layer}:rel_radius`,
      "corrected_carrier_state",
      positions.map(vectorNorm)
    );
    addChannel(
      channels,
      `body:${layer}:rel_speed`,
      "corrected_carrier_state",
      velocities.map(vectorNorm)
    );
  }
  return channels;
}

function activeRootChannels(row, samples) {
  const roots = Array.isArray(row?.active_causal_root_ledger) ? row.active_causal_root_ledger : [];
  const keys = groupedKeys(
    roots,
    (root) => `root:${bodyLayer(root.receiver)}:${root.relation}:${bodyLayer(root.source)}`
  );
  const channels = [];
  for (const key of keys) {
    const buckets = samples.map((sample) =>
      sampleGroups(
        roots,
        sample,
        row.period,
        (root) => `root:${bodyLayer(root.receiver)}:${root.relation}:${bodyLayer(root.source)}`
      ).get(key)
    );
    if (buckets.some((bucket) => !Array.isArray(bucket) || bucket.length === 0)) {
      continue;
    }
    addChannel(channels, `${key}:count`, "active_causal_root_ledger", buckets.map((bucket) => bucket.length));
    addChannel(
      channels,
      `${key}:mean_delay`,
      "active_causal_root_ledger",
      buckets.map((bucket) => mean(bucket.map((root) => root.delay)))
    );
    addChannel(
      channels,
      `${key}:mean_J`,
      "active_causal_root_ledger",
      buckets.map((bucket) => mean(bucket.map((root) => root.J)))
    );
    addChannel(
      channels,
      `${key}:mean_log_abs_J`,
      "active_causal_root_ledger",
      buckets.map((bucket) => mean(bucket.map((root) => Math.log(Math.max(Math.abs(root.J), 1e-300)))))
    );
  }
  return channels;
}

function rootTransportChannels(row, samples) {
  const record = row?.branch_chart_source_records?.root_transport_source_record;
  const roots = record?.schema === ROOT_TRANSPORT_SOURCE_SCHEMA && Array.isArray(record.roots) ? record.roots : [];
  const keys = groupedKeys(
    roots,
    (root) => `transport:${bodyLayer(root.receiver)}:${root.relation}:${bodyLayer(root.source)}`
  );
  const channels = [];
  for (const key of keys) {
    const buckets = samples.map((sample) =>
      sampleGroups(
        roots,
        sample,
        row.period,
        (root) => `transport:${bodyLayer(root.receiver)}:${root.relation}:${bodyLayer(root.source)}`
      ).get(key)
    );
    if (buckets.some((bucket) => !Array.isArray(bucket) || bucket.length === 0)) {
      continue;
    }
    addChannel(channels, `${key}:count`, "root_transport_source_record", buckets.map((bucket) => bucket.length));
    addChannel(
      channels,
      `${key}:mean_D_J`,
      "root_transport_source_record",
      buckets.map((bucket) => mean(bucket.map((root) => root.D_J)))
    );
    addChannel(
      channels,
      `${key}:mean_D_tau`,
      "root_transport_source_record",
      buckets.map((bucket) => mean(bucket.map((root) => root.D_tau)))
    );
    addChannel(
      channels,
      `${key}:mean_G_r`,
      "root_transport_source_record",
      buckets.map((bucket) => mean(bucket.map((root) => root.G_r)))
    );
    addChannel(
      channels,
      `${key}:sum_source_layer_shear_projection`,
      "root_transport_source_record",
      buckets.map((bucket) =>
        bucket.reduce(
          (sum, root) => sum + root.G_r * (root.D_J * Math.cos(root.theta) + root.D_tau * Math.sin(root.theta)),
          0
        )
      )
    );
  }
  return channels;
}

function centered(values) {
  const offset = mean(values);
  return values.map((value) => value - offset);
}

function squaredNorm(values) {
  return values.reduce((sum, value) => sum + value * value, 0);
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

function channelSpectrum(channel, modes, sampleCount) {
  const values = centered(channel.values);
  const safeMaxMode = Math.floor(sampleCount / 2);
  const allModes = Array.from({ length: safeMaxMode + 1 }, (_entry, index) => index);
  const totalEnergy = allModes.reduce((sum, mode) => sum + modeEnergy(values, mode), 0);
  const modeEnergies = allModes.map((mode) => ({
    mode,
    energy_fraction: totalEnergy > 0 ? modeEnergy(values, mode) / totalEnergy : null,
  }));
  const auditedModes = modes.filter((mode) => mode <= safeMaxMode);
  const modeBandEnergyFraction =
    totalEnergy > 0 ? auditedModes.reduce((sum, mode) => sum + modeEnergy(values, mode), 0) / totalEnergy : null;
  const dominantMode = modeEnergies
    .filter((entry) => Number.isFinite(entry.energy_fraction))
    .sort((left, right) => right.energy_fraction - left.energy_fraction)[0];
  return {
    channel: channel.name,
    source_class: channel.source_class,
    sample_count: sampleCount,
    mode_band: auditedModes,
    mode_band_energy_fraction: modeBandEnergyFraction,
    dominant_mode: dominantMode
      ? {
          mode: dominantMode.mode,
          energy_fraction: dominantMode.energy_fraction,
        }
      : null,
    total_centered_energy: totalEnergy,
  };
}

function residualSpectrumContextForRow(residualSpectrum, rowNumber, modes = DEFAULT_MODES) {
  if (!residualSpectrum) {
    return null;
  }
  const spectrumRow = rowsOf(residualSpectrum).find((row) => row.row === rowNumber) ?? null;
  return {
    residual_spectrum_schema: residualSpectrum?.artifact_schema ?? null,
    residual_spectrum_status: residualSpectrum?.status ?? null,
    row_status: spectrumRow?.status ?? null,
    target_dominant_mode: spectrumRow?.spectrum?.dominant_mode_summary?.total ?? null,
    target_mode_band_energy_fraction: Array.isArray(spectrumRow?.spectrum?.modes)
      ? spectrumRow.spectrum.modes
          .filter((entry) => modes.includes(entry.mode))
          .reduce((sum, entry) => sum + (Number(entry.total_energy_fraction) || 0), 0)
      : null,
  };
}

function solveRow(row, args, residualSpectrum) {
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_mode_band_source_fields",
      failure_code: "missing-mode-band-source-fields",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: missingFields,
      residual_spectrum_context: residualSpectrumContextForRow(residualSpectrum, row?.row, args.modes),
    };
  }
  const samples = analysisSamples(row);
  const channels = [...bodyStateChannels(samples), ...activeRootChannels(row, samples), ...rootTransportChannels(row, samples)];
  const rankedChannels = channels
    .map((channel) => channelSpectrum(channel, args.modes, samples.length))
    .filter((entry) => Number.isFinite(entry.mode_band_energy_fraction) && entry.total_centered_energy > 1e-18)
    .sort(
      (left, right) =>
        right.mode_band_energy_fraction - left.mode_band_energy_fraction ||
        right.total_centered_energy - left.total_centered_energy
    );
  const topChannels = rankedChannels.slice(0, args.top);
  const topChannel = topChannels[0] ?? null;
  const sourceDirectionPresent =
    topChannel !== null && topChannel.mode_band_energy_fraction >= args.candidateFraction;
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status: sourceDirectionPresent
      ? "pre_fit_mode_band_source_direction_present"
      : "pre_fit_mode_band_source_direction_not_found",
    failure_code: null,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    sample_count: samples.length,
    period: row.period,
    sample_source:
      Array.isArray(row?.residual_ledgers?.[LEDGER_KEY]?.sampled_forcing?.samples) &&
      row.residual_ledgers[LEDGER_KEY].sampled_forcing.samples.length >= 2
        ? `nearest corrected carrier samples at ${LEDGER_KEY}.sampled_forcing times`
        : "corrected carrier row.samples",
    audited_mode_band: args.modes,
    candidate_fraction: args.candidateFraction,
    channel_count: rankedChannels.length,
    top_channel: topChannel,
    top_channels: topChannels,
    residual_spectrum_context: residualSpectrumContextForRow(residualSpectrum, row.row, args.modes),
    note:
      "This row audits pre-fit branch-state source channels only. It does not fit residuals, define a branch-chart coordinate, or authorize corrected rerun.",
  };
}

function buildOutput(args, intakePath, artifact, residualSpectrumPath, residualSpectrum) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  if (residualSpectrum && residualSpectrum?.artifact_schema !== RESIDUAL_SPECTRUM_SCHEMA) {
    topMissing.push(`residual_spectrum.artifact_schema=${RESIDUAL_SPECTRUM_SCHEMA}`);
  }
  const rows =
    topMissing.length === 0
      ? selectRows(artifact, args.rows).map((row) => solveRow(row, args, residualSpectrum))
      : [];
  const blockedCount = rows.filter((row) => String(row.status).startsWith("blocked_")).length;
  const status = topMissing.length > 0 || blockedCount > 0 ? "blocked_missing_mode_band_source_fields" : "computed";
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    inputs: {
      intake: intakePath,
      residual_spectrum: residualSpectrumPath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
      residual_spectrum_schema: residualSpectrum?.artifact_schema ?? null,
    },
    parameters: {
      modes: args.modes,
      top: args.top,
      candidate_fraction: args.candidateFraction,
      residual_spectrum_context_rule:
        "Optional residual-spectrum target fields are copied as context only and are not inputs to source-channel spectra.",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      computed_count: rows.filter((row) => !String(row.status).startsWith("blocked_")).length,
      blocked_count: blockedCount,
      source_direction_present_count: rows.filter(
        (row) => row.status === "pre_fit_mode_band_source_direction_present"
      ).length,
    },
    rows,
    promotion_decision: "diagnostic-only",
    note:
      "This artifact is a source-eligibility diagnostic. It does not fit residuals and is not corrected-rerun authority.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntake(args);
  const residualSpectrumPath = args.residualSpectrum ? path.resolve(args.residualSpectrum) : null;
  const artifact = readJson(intakePath);
  const residualSpectrum = residualSpectrumPath ? readJson(residualSpectrumPath) : null;
  writeJson(args, buildOutput(args, intakePath, artifact, residualSpectrumPath, residualSpectrum));
}

main();
