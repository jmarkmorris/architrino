#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PACKET_SCHEMA = "a0-tier1-carrier-correction-packet/v1";
const REPLAY_SCHEMA = "a0-tier1-carrier-correction-waveform-replay/v1";
const REPLAY_ROW_SCHEMA = "a0-tier1-carrier-correction-waveform-replay-row/v1";
const READY_PACKET_STATUS = "correction_packet_ready";
const READY_REPLAY_STATUS = "waveform_replay_ready";
const RETAINED_MODE_STATUS = "retained_correction_mode";
const LAYERS = ["I", "M", "O"];
const BODY_IDS = LAYERS.flatMap((layer) => [`${layer}+`, `${layer}-`]);
const DEFAULT_SAMPLE_COUNT = 64;
const COEFFICIENT_RELATIVE_TOLERANCE = 1e-9;
const COEFFICIENT_ABSOLUTE_TOLERANCE = 1e-12;

function parseArgs(argv) {
  const args = {
    packet: null,
    rows: "all",
    sampleCount: DEFAULT_SAMPLE_COUNT,
    out: null,
    pretty: false,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--packet") {
      args.packet = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--sample-count") {
      args.sampleCount = parseSampleCount(argv[++i]);
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-carrier-correction-waveform-replay.mjs --packet PATH [options]

Options:
  --packet PATH      JSON output from a0-tier1-carrier-correction-packet.mjs.
  --rows VALUE       "all" or a comma-separated row list. Defaults to "all".
  --sample-count N   Number of samples on [0,T]. Defaults to ${DEFAULT_SAMPLE_COUNT}.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON.
  --help             Show this help.

This fail-closed checker consumes a0-tier1-carrier-correction-packet/v1,
verifies retained Fourier coefficient identities, reconstructs the layer
correction waveform, and applies the declared center-preserving plus/minus
placement convention. It does not certify an accepted history boundary.`);
}

function parseSampleCount(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 2) {
    throw new Error(`Expected --sample-count to be an integer >= 2, got: ${value}`);
  }
  return number;
}

function requirePacketPath(args) {
  if (!args.packet) {
    throw new Error("Missing required --packet PATH argument.");
  }
  return path.resolve(args.packet);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function rowsOf(packet) {
  return Array.isArray(packet?.rows) ? packet.rows : [];
}

function selectRows(packet, selector) {
  const rows = rowsOf(packet);
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

function finiteComplexVector3(value) {
  return Boolean(value) && finiteVector3(value.real) && finiteVector3(value.imag);
}

function zeroVector3() {
  return [0, 0, 0];
}

function scaleVector3(value, factor) {
  return [value[0] * factor, value[1] * factor, value[2] * factor];
}

function complexVectorNorm(value) {
  let sum = 0;
  for (let component = 0; component < 3; component += 1) {
    sum += value.real[component] * value.real[component] + value.imag[component] * value.imag[component];
  }
  return Math.sqrt(sum);
}

function complexVectorDifference(a, b) {
  return {
    real: [
      a.real[0] - b.real[0],
      a.real[1] - b.real[1],
      a.real[2] - b.real[2],
    ],
    imag: [
      a.imag[0] - b.imag[0],
      a.imag[1] - b.imag[1],
      a.imag[2] - b.imag[2],
    ],
  };
}

function topLevelMissingFields(packet) {
  const missing = [];
  if (packet?.artifact_schema !== PACKET_SCHEMA) {
    missing.push(`artifact_schema=${PACKET_SCHEMA}`);
  }
  if (!Array.isArray(packet?.rows)) {
    missing.push("rows[]");
  }
  return missing;
}

function rowMissingFields(row) {
  const missing = [];
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (row?.status !== READY_PACKET_STATUS) {
    missing.push(`rows[].status=${READY_PACKET_STATUS}`);
  }
  const correctionPacket = row?.correction_packet;
  if (!correctionPacket || typeof correctionPacket !== "object") {
    missing.push("rows[].correction_packet");
    return missing;
  }
  if (!Number.isFinite(correctionPacket.period) || correctionPacket.period <= 0) {
    missing.push("rows[].correction_packet.period");
  }
  if (!correctionPacket.fourier_synthesis_convention || typeof correctionPacket.fourier_synthesis_convention !== "object") {
    missing.push("rows[].correction_packet.fourier_synthesis_convention");
  }
  const placementConvention = correctionPacket.placement_convention;
  if (!placementConvention || typeof placementConvention !== "object") {
    missing.push("rows[].correction_packet.placement_convention");
  } else {
    if (placementConvention.schema !== "a0-tier1-layer-relative-antisymmetric-placement/v1") {
      missing.push("rows[].correction_packet.placement_convention.schema=a0-tier1-layer-relative-antisymmetric-placement/v1");
    }
    if (placementConvention.center_preserving !== true) {
      missing.push("rows[].correction_packet.placement_convention.center_preserving=true");
    }
    for (const bodyId of BODY_IDS) {
      const update = placementConvention.body_updates?.[bodyId];
      if (!update || typeof update !== "object") {
        missing.push(`rows[].correction_packet.placement_convention.body_updates.${bodyId}`);
        continue;
      }
      if (!LAYERS.includes(update.layer)) {
        missing.push(`rows[].correction_packet.placement_convention.body_updates.${bodyId}.layer`);
      }
      for (const field of ["displacement_scale", "velocity_scale", "acceleration_scale"]) {
        if (!Number.isFinite(update[field])) {
          missing.push(`rows[].correction_packet.placement_convention.body_updates.${bodyId}.${field}`);
        }
      }
    }
  }
  const layerModeCoefficients = correctionPacket.layer_mode_coefficients;
  if (!layerModeCoefficients || typeof layerModeCoefficients !== "object") {
    missing.push("rows[].correction_packet.layer_mode_coefficients");
    return missing;
  }
  for (const layer of LAYERS) {
    const layerPacket = layerModeCoefficients[layer];
    if (!layerPacket || typeof layerPacket !== "object") {
      missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}`);
      continue;
    }
    if (layerPacket.period !== undefined && (!Number.isFinite(layerPacket.period) || layerPacket.period <= 0)) {
      missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}.period`);
    }
    if (!Array.isArray(layerPacket.modes)) {
      missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}.modes[]`);
      continue;
    }
    for (const mode of layerPacket.modes) {
      const modeLabel = Number.isInteger(mode?.mode) ? mode.mode : "unknown";
      if (!Number.isInteger(mode?.mode) || mode.mode <= 0) {
        missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}.modes[].mode`);
      }
      if (mode?.status !== RETAINED_MODE_STATUS) {
        missing.push(
          `rows[].correction_packet.layer_mode_coefficients.${layer}.modes[mode=${modeLabel}].status=${RETAINED_MODE_STATUS}`
        );
      }
      if (!finiteComplexVector3(mode?.correction_hat)) {
        missing.push(
          `rows[].correction_packet.layer_mode_coefficients.${layer}.modes[mode=${modeLabel}].correction_hat`
        );
      }
      if (!finiteComplexVector3(mode?.forcing_hat)) {
        missing.push(
          `rows[].correction_packet.layer_mode_coefficients.${layer}.modes[mode=${modeLabel}].forcing_hat`
        );
      }
    }
  }
  return missing;
}

function blockedRow(row, status, failureCode, details = {}) {
  return {
    schema: REPLAY_ROW_SCHEMA,
    row: Number.isInteger(row?.row) ? row.row : null,
    status,
    failure_code: failureCode,
    source_status: row?.status ?? null,
    source_failure_code: row?.failure_code ?? null,
    correction_rerun_required: false,
    accepted_history_boundary: false,
    ...details,
  };
}

function coefficientIdentityCheck(mode, period) {
  const omega = (2 * Math.PI * mode.mode) / period;
  const expectedCorrectionHat = {
    real: scaleVector3(mode.forcing_hat.real, -1 / (omega * omega)),
    imag: scaleVector3(mode.forcing_hat.imag, -1 / (omega * omega)),
  };
  const difference = complexVectorDifference(mode.correction_hat, expectedCorrectionHat);
  const absoluteError = complexVectorNorm(difference);
  const correctionNorm = complexVectorNorm(mode.correction_hat);
  const expectedNorm = complexVectorNorm(expectedCorrectionHat);
  const relativeError =
    absoluteError / Math.max(correctionNorm, expectedNorm, COEFFICIENT_ABSOLUTE_TOLERANCE);
  const ok =
    absoluteError <= COEFFICIENT_ABSOLUTE_TOLERANCE ||
    relativeError <= COEFFICIENT_RELATIVE_TOLERANCE;
  return {
    mode: mode.mode,
    angular_frequency: omega,
    status: ok ? "coefficient_identity_verified" : "coefficient_identity_failed",
    absolute_error: absoluteError,
    relative_error: relativeError,
  };
}

function layerCoefficientChecks(layerPacket, period) {
  const modeChecks = layerPacket.modes.map((mode) => coefficientIdentityCheck(mode, period));
  return {
    layer: layerPacket.layer ?? null,
    mode_count: modeChecks.length,
    max_absolute_error: modeChecks.reduce((max, check) => Math.max(max, check.absolute_error), 0),
    max_relative_error: modeChecks.reduce((max, check) => Math.max(max, check.relative_error), 0),
    modes: modeChecks,
  };
}

function coefficientChecks(layerModeCoefficients, period) {
  return Object.fromEntries(
    LAYERS.map((layer) => [layer, layerCoefficientChecks(layerModeCoefficients[layer], period)])
  );
}

function failedCoefficientChecks(checks) {
  const failures = [];
  for (const layer of LAYERS) {
    for (const mode of checks[layer].modes) {
      if (mode.status !== "coefficient_identity_verified") {
        failures.push({
          layer,
          mode: mode.mode,
          absolute_error: mode.absolute_error,
          relative_error: mode.relative_error,
        });
      }
    }
  }
  return failures;
}

function addModeContribution(target, mode, phase, factor) {
  const cosValue = Math.cos(phase);
  const sinValue = Math.sin(phase);
  for (let component = 0; component < 3; component += 1) {
    target[component] +=
      factor *
      (mode.correction_hat.real[component] * cosValue - mode.correction_hat.imag[component] * sinValue);
  }
}

function addModeVelocityContribution(target, mode, phase, omega) {
  const cosValue = Math.cos(phase);
  const sinValue = Math.sin(phase);
  for (let component = 0; component < 3; component += 1) {
    target[component] +=
      2 *
      omega *
      (-mode.correction_hat.real[component] * sinValue - mode.correction_hat.imag[component] * cosValue);
  }
}

function reconstructLayerAtTime(layerPacket, period, t) {
  const correctionDisplacement = zeroVector3();
  const correctionVelocity = zeroVector3();
  const correctionAcceleration = zeroVector3();
  for (const mode of layerPacket.modes) {
    const omega = (2 * Math.PI * mode.mode) / period;
    const phase = omega * t;
    addModeContribution(correctionDisplacement, mode, phase, 2);
    addModeVelocityContribution(correctionVelocity, mode, phase, omega);
    addModeContribution(correctionAcceleration, mode, phase, -2 * omega * omega);
  }
  return {
    correction_displacement: correctionDisplacement,
    correction_velocity: correctionVelocity,
    correction_acceleration: correctionAcceleration,
  };
}

function bodyUpdatesForLayers(layerWaveforms, placementConvention) {
  return Object.fromEntries(
    BODY_IDS.map((bodyId) => {
      const placement = placementConvention.body_updates[bodyId];
      const layerWaveform = layerWaveforms[placement.layer];
      return [
        bodyId,
        {
          layer: placement.layer,
          polarity: placement.polarity ?? bodyId.slice(-1),
          correction_displacement: scaleVector3(
            layerWaveform.correction_displacement,
            placement.displacement_scale
          ),
          correction_velocity: scaleVector3(layerWaveform.correction_velocity, placement.velocity_scale),
          correction_acceleration: scaleVector3(
            layerWaveform.correction_acceleration,
            placement.acceleration_scale
          ),
        },
      ];
    })
  );
}

function sampleRows(correctionPacket, sampleCount) {
  const period = correctionPacket.period;
  const layerModeCoefficients = correctionPacket.layer_mode_coefficients;
  const placementConvention = correctionPacket.placement_convention;
  const samples = [];
  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
    const phaseFraction = sampleIndex / (sampleCount - 1);
    const t = period * phaseFraction;
    const layers = Object.fromEntries(
      LAYERS.map((layer) => [layer, reconstructLayerAtTime(layerModeCoefficients[layer], period, t)])
    );
    samples.push({
      sample_index: sampleIndex,
      t,
      phase_fraction: phaseFraction,
      layers,
      body_updates: bodyUpdatesForLayers(layers, placementConvention),
    });
  }
  return samples;
}

function replayRow(row, args) {
  if (row?.status !== READY_PACKET_STATUS) {
    return blockedRow(row, "blocked_source_row_not_ready", "source-row-not-correction-packet-ready");
  }
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return blockedRow(row, "blocked_packet_fields_missing", "packet-fields-missing", {
      missing_fields: missingFields,
    });
  }
  const correctionPacket = row.correction_packet;
  const period = correctionPacket.period;
  const layerModeCoefficients = correctionPacket.layer_mode_coefficients;
  const checks = coefficientChecks(layerModeCoefficients, period);
  const coefficientFailures = failedCoefficientChecks(checks);
  if (coefficientFailures.length > 0) {
    return blockedRow(row, "blocked_coefficient_identity_failed", "coefficient-identity-failed", {
      coefficient_identity_tolerance: {
        relative: COEFFICIENT_RELATIVE_TOLERANCE,
        absolute: COEFFICIENT_ABSOLUTE_TOLERANCE,
      },
      coefficient_identity_checks: checks,
      coefficient_identity_failures: coefficientFailures,
    });
  }
  return {
    schema: REPLAY_ROW_SCHEMA,
    row: row.row,
    status: READY_REPLAY_STATUS,
    failure_code: null,
    source_status: row.status,
    source_failure_code: row.failure_code ?? null,
    period,
    sample_count: args.sampleCount,
    layer_mode_counts: Object.fromEntries(
      LAYERS.map((layer) => [layer, layerModeCoefficients[layer].modes.length])
    ),
    coefficient_identity_tolerance: {
      relative: COEFFICIENT_RELATIVE_TOLERANCE,
      absolute: COEFFICIENT_ABSOLUTE_TOLERANCE,
    },
    coefficient_identity_checks: checks,
    fourier_synthesis_convention: correctionPacket.fourier_synthesis_convention,
    placement_convention: correctionPacket.placement_convention,
    samples: sampleRows(correctionPacket, args.sampleCount),
    correction_rerun_required: true,
    accepted_history_boundary: false,
  };
}

function statusCounts(rows) {
  const counts = {};
  for (const row of rows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }
  return counts;
}

function artifactStatus(rows, topMissingFields) {
  if (topMissingFields.length > 0) {
    return "blocked_packet_fields_missing";
  }
  if (rows.length === 0) {
    return "blocked_no_rows_selected";
  }
  if (rows.some((row) => row.status === READY_REPLAY_STATUS)) {
    return READY_REPLAY_STATUS;
  }
  return "blocked";
}

function run(packet, packetPath, args) {
  const topMissingFields = topLevelMissingFields(packet);
  const rows =
    topMissingFields.length === 0
      ? selectRows(packet, args.rows).map((row) => replayRow(row, args))
      : [
          blockedRow(null, "blocked_packet_fields_missing", "packet-envelope-fields-missing", {
            missing_fields: topMissingFields,
          }),
        ];
  const readyCount = rows.filter((row) => row.status === READY_REPLAY_STATUS).length;
  return {
    artifact_schema: REPLAY_SCHEMA,
    metadata: {
      artifact: "a0-tier1-carrier-correction-waveform-replay",
      schema_status: "provisional",
      status: artifactStatus(rows, topMissingFields),
      generatedAt: new Date().toISOString(),
      sourcePacket: path.relative(process.cwd(), packetPath),
      sourcePacketSchema: packet?.artifact_schema ?? null,
      rowSelector: args.rows,
      sampleCount: args.sampleCount,
      coefficientIdentityTolerance: {
        relative: COEFFICIENT_RELATIVE_TOLERANCE,
        absolute: COEFFICIENT_ABSOLUTE_TOLERANCE,
      },
      note:
        "Fail-closed retained Fourier correction waveform replay. Ready rows authorize only a corrected one-period rerun input check, not an accepted history segment.",
    },
    source_packet_metadata: packet?.metadata ?? null,
    selected_row_count: rows.length,
    summary: {
      status_counts: statusCounts(rows),
      waveform_replay_ready_row_count: readyCount,
      blocked_row_count: rows.length - readyCount,
    },
    correction_rerun_required: readyCount > 0,
    accepted_history_boundary: false,
    rows,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const packetPath = requirePacketPath(args);
  const packet = readJson(packetPath);
  const output = run(packet, packetPath, args);
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
