#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

export const PACKET_SCHEMA = "a0-tier1-carrier-correction-packet/v1";
export const PACKET_ROW_SCHEMA = "a0-tier1-carrier-correction-packet-row/v1";
export const PACKET_PAYLOAD_SCHEMA = "a0-tier1-carrier-correction-packet-row-payload/v1";
export const EVALUATOR_SCHEMA = "a0-tier1-carrier-correction-evaluator/v1";
export const READY_PACKET_STATUS = "correction_packet_ready";
export const READY_EVALUATOR_STATUS = "correction_evaluator_ready";
export const RETAINED_MODE_STATUS = "retained_correction_mode";
export const PLACEMENT_SCHEMA = "a0-tier1-layer-relative-antisymmetric-placement/v1";
export const FOURIER_SYNTHESIS_SCHEMA = "a0-tier1-carrier-correction-fourier-synthesis/v1";
export const LAYERS = Object.freeze(["I", "M", "O"]);
export const BODY_IDS = Object.freeze(LAYERS.flatMap((layer) => [`${layer}+`, `${layer}-`]));
export const DEFAULT_SAMPLE_COUNT = 8;

const REQUIRED_BODY_UPDATE_FIELDS = Object.freeze([
  "displacement_scale",
  "velocity_scale",
  "acceleration_scale",
]);

function parseArgs(argv) {
  const args = {
    packet: null,
    row: null,
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
    } else if (arg === "--row") {
      args.row = parseRowNumber(argv[++i]);
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-carrier-correction-evaluator.mjs --packet PATH --row N [options]

Options:
  --packet PATH      JSON output from a0-tier1-carrier-correction-packet.mjs.
  --row N            Source packet row number to evaluate.
  --sample-count N   Number of sample corrections on [0,T]. Defaults to ${DEFAULT_SAMPLE_COUNT}.
  --out PATH         Write JSON output to a file instead of stdout.
  --pretty           Pretty-print JSON.
  --help             Show this help.

This fail-closed module-level self-check validates one correction-packet row and
samples its reusable arbitrary-time evaluator. It emits correction inputs only;
it never claims accepted history.`);
}

function parseRowNumber(value) {
  const number = Number(value);
  if (!Number.isInteger(number)) {
    throw new Error(`Expected row number to be an integer, got: ${value}`);
  }
  return number;
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

function requireRowNumber(args) {
  if (!Number.isInteger(args.row)) {
    throw new Error("Missing required --row N argument.");
  }
  return args.row;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function rowsOf(packet) {
  return Array.isArray(packet?.rows) ? packet.rows : [];
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

function addVector3(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function failClosed(status, failureCode, details = {}) {
  return {
    ok: false,
    schema: EVALUATOR_SCHEMA,
    status,
    failure_code: failureCode,
    correction_rerun_required: false,
    accepted_history_boundary: false,
    ...details,
  };
}

function packetEnvelopeMissingFields(packet) {
  const missing = [];
  if (packet?.artifact_schema !== PACKET_SCHEMA) {
    missing.push(`artifact_schema=${PACKET_SCHEMA}`);
  }
  if (!Array.isArray(packet?.rows)) {
    missing.push("rows[]");
  }
  return missing;
}

function selectedRow(packet, rowNumber) {
  return rowsOf(packet).find((row) => row?.row === rowNumber) ?? null;
}

function rowMissingFields(row) {
  const missing = [];
  if (!Number.isInteger(row?.row)) {
    missing.push("rows[].row");
  }
  if (row?.schema !== undefined && row.schema !== PACKET_ROW_SCHEMA) {
    missing.push(`rows[].schema=${PACKET_ROW_SCHEMA}`);
  }
  if (row?.status !== READY_PACKET_STATUS) {
    missing.push(`rows[].status=${READY_PACKET_STATUS}`);
  }
  const correctionPacket = row?.correction_packet;
  if (!isObject(correctionPacket)) {
    missing.push("rows[].correction_packet");
    return missing;
  }
  if (correctionPacket.packet_schema !== undefined && correctionPacket.packet_schema !== PACKET_PAYLOAD_SCHEMA) {
    missing.push(`rows[].correction_packet.packet_schema=${PACKET_PAYLOAD_SCHEMA}`);
  }
  if (!Number.isFinite(correctionPacket.period) || correctionPacket.period <= 0) {
    missing.push("rows[].correction_packet.period");
  }
  validateFourierConvention(correctionPacket.fourier_synthesis_convention, missing);
  validatePlacementConvention(correctionPacket.placement_convention, missing);
  validateLayerModeCoefficients(correctionPacket.layer_mode_coefficients, correctionPacket.period, missing);
  return missing;
}

function validateFourierConvention(convention, missing) {
  if (!isObject(convention)) {
    missing.push("rows[].correction_packet.fourier_synthesis_convention");
    return;
  }
  if (convention.schema !== undefined && convention.schema !== FOURIER_SYNTHESIS_SCHEMA) {
    missing.push(`rows[].correction_packet.fourier_synthesis_convention.schema=${FOURIER_SYNTHESIS_SCHEMA}`);
  }
}

function validatePlacementConvention(placementConvention, missing) {
  if (!isObject(placementConvention)) {
    missing.push("rows[].correction_packet.placement_convention");
    return;
  }
  if (placementConvention.schema !== PLACEMENT_SCHEMA) {
    missing.push(`rows[].correction_packet.placement_convention.schema=${PLACEMENT_SCHEMA}`);
  }
  if (placementConvention.center_preserving !== true) {
    missing.push("rows[].correction_packet.placement_convention.center_preserving=true");
  }
  if (!isObject(placementConvention.body_updates)) {
    missing.push("rows[].correction_packet.placement_convention.body_updates");
    return;
  }
  for (const bodyId of BODY_IDS) {
    const update = placementConvention.body_updates[bodyId];
    if (!isObject(update)) {
      missing.push(`rows[].correction_packet.placement_convention.body_updates.${bodyId}`);
      continue;
    }
    const expectedLayer = bodyId.slice(0, 1);
    if (update.layer !== expectedLayer || !LAYERS.includes(update.layer)) {
      missing.push(`rows[].correction_packet.placement_convention.body_updates.${bodyId}.layer=${expectedLayer}`);
    }
    for (const field of REQUIRED_BODY_UPDATE_FIELDS) {
      if (!Number.isFinite(update[field])) {
        missing.push(`rows[].correction_packet.placement_convention.body_updates.${bodyId}.${field}`);
      }
    }
  }
}

function validateLayerModeCoefficients(layerModeCoefficients, packetPeriod, missing) {
  if (!isObject(layerModeCoefficients)) {
    missing.push("rows[].correction_packet.layer_mode_coefficients");
    return;
  }
  for (const layer of LAYERS) {
    const layerPacket = layerModeCoefficients[layer];
    if (!isObject(layerPacket)) {
      missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}`);
      continue;
    }
    if (layerPacket.layer !== undefined && layerPacket.layer !== layer) {
      missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}.layer=${layer}`);
    }
    if (layerPacket.period !== undefined) {
      if (!Number.isFinite(layerPacket.period) || layerPacket.period <= 0) {
        missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}.period`);
      } else if (Number.isFinite(packetPeriod) && Math.abs(layerPacket.period - packetPeriod) > 0) {
        missing.push(`rows[].correction_packet.layer_mode_coefficients.${layer}.period=correction_packet.period`);
      }
    }
    if (!Array.isArray(layerPacket.modes) || layerPacket.modes.length === 0) {
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
    }
  }
}

function sortedModesForLayer(layerModeCoefficients, layer) {
  return [...layerModeCoefficients[layer].modes].sort((a, b) => a.mode - b.mode);
}

function layerModeCounts(layerModeCoefficients) {
  return Object.fromEntries(LAYERS.map((layer) => [layer, layerModeCoefficients[layer].modes.length]));
}

function angularFrequency(modeNumber, period) {
  return (2 * Math.PI * modeNumber) / period;
}

function retainedModeContribution(mode, omega, t) {
  const phase = omega * t;
  const cosValue = Math.cos(phase);
  const sinValue = Math.sin(phase);
  const displacement = zeroVector3();
  const velocity = zeroVector3();
  const acceleration = zeroVector3();
  for (let component = 0; component < 3; component += 1) {
    const real = mode.correction_hat.real[component];
    const imag = mode.correction_hat.imag[component];
    const realSignal = real * cosValue - imag * sinValue;
    displacement[component] = 2 * realSignal;
    velocity[component] = 2 * omega * (-real * sinValue - imag * cosValue);
    acceleration[component] = -2 * omega * omega * realSignal;
  }
  return { displacement, velocity, acceleration };
}

function addModeCorrection(target, correction) {
  for (const field of ["displacement", "velocity", "acceleration"]) {
    for (let component = 0; component < 3; component += 1) {
      target[field][component] += correction[field][component];
    }
  }
}

function synthesizeLayer(layerPacket, period, t) {
  const correction = {
    displacement: zeroVector3(),
    velocity: zeroVector3(),
    acceleration: zeroVector3(),
  };
  for (const mode of layerPacket.modes) {
    addModeCorrection(correction, retainedModeContribution(mode, angularFrequency(mode.mode, period), t));
  }
  return correction;
}

function requireLayer(layer) {
  if (!LAYERS.includes(layer)) {
    throw new RangeError(`Unknown layer: ${layer}`);
  }
}

function requireBodyId(bodyId) {
  if (!BODY_IDS.includes(bodyId)) {
    throw new RangeError(`Unknown bodyId: ${bodyId}`);
  }
}

function requireFiniteTime(t) {
  if (!Number.isFinite(t)) {
    throw new TypeError(`Expected finite time t, got: ${t}`);
  }
}

function requireBaseVector(baseState, field) {
  const value = baseState?.[field];
  if (!finiteVector3(value)) {
    throw new TypeError(`Expected baseState.${field} to be a finite 3-vector.`);
  }
  return value;
}

function makeEvaluator(row) {
  const correctionPacket = row.correction_packet;
  const period = correctionPacket.period;
  const layerModeCoefficients = Object.fromEntries(
    LAYERS.map((layer) => [
      layer,
      {
        ...correctionPacket.layer_mode_coefficients[layer],
        modes: sortedModesForLayer(correctionPacket.layer_mode_coefficients, layer),
      },
    ])
  );
  const placementConvention = correctionPacket.placement_convention;

  function layerCorrection(layer, t) {
    requireLayer(layer);
    requireFiniteTime(t);
    return synthesizeLayer(layerModeCoefficients[layer], period, t);
  }

  function bodyCorrection(bodyId, t) {
    requireBodyId(bodyId);
    requireFiniteTime(t);
    const placement = placementConvention.body_updates[bodyId];
    const layer = layerCorrection(placement.layer, t);
    return {
      position: scaleVector3(layer.displacement, placement.displacement_scale),
      velocity: scaleVector3(layer.velocity, placement.velocity_scale),
      acceleration: scaleVector3(layer.acceleration, placement.acceleration_scale),
    };
  }

  function correctedState(bodyId, t, baseState) {
    const correction = bodyCorrection(bodyId, t);
    return {
      ...baseState,
      position: addVector3(requireBaseVector(baseState, "position"), correction.position),
      velocity: addVector3(requireBaseVector(baseState, "velocity"), correction.velocity),
      acceleration: addVector3(requireBaseVector(baseState, "acceleration"), correction.acceleration),
      correction,
    };
  }

  return {
    ok: true,
    schema: EVALUATOR_SCHEMA,
    status: READY_EVALUATOR_STATUS,
    failure_code: null,
    row: row.row,
    source_status: row.status,
    source_failure_code: row.failure_code ?? null,
    period,
    layer_ids: [...LAYERS],
    body_ids: [...BODY_IDS],
    layer_mode_counts: layerModeCounts(layerModeCoefficients),
    fourier_synthesis_convention: correctionPacket.fourier_synthesis_convention,
    placement_convention: placementConvention,
    correction_rerun_required: true,
    accepted_history_boundary: false,
    angularFrequency: (modeNumber) => angularFrequency(modeNumber, period),
    layerCorrection,
    bodyCorrection,
    correctedState,
  };
}

export function createCarrierCorrectionEvaluator(packet, options = {}) {
  const rowNumber = options.rowNumber ?? options.row;
  if (!Number.isInteger(rowNumber)) {
    return failClosed("blocked_row_selector_invalid", "row-selector-invalid", {
      row: rowNumber ?? null,
      missing_fields: ["options.rowNumber"],
    });
  }

  const envelopeMissingFields = packetEnvelopeMissingFields(packet);
  if (envelopeMissingFields.length > 0) {
    return failClosed("blocked_packet_fields_missing", "packet-envelope-fields-missing", {
      row: rowNumber,
      missing_fields: envelopeMissingFields,
      source_packet_schema: packet?.artifact_schema ?? null,
    });
  }

  const row = selectedRow(packet, rowNumber);
  if (!row) {
    return failClosed("blocked_row_not_found", "row-not-found", {
      row: rowNumber,
      available_rows: rowsOf(packet).map((entry) => entry?.row).filter(Number.isInteger),
    });
  }

  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return failClosed("blocked_packet_fields_missing", "packet-row-fields-missing", {
      row: rowNumber,
      source_status: row?.status ?? null,
      source_failure_code: row?.failure_code ?? null,
      missing_fields: missingFields,
    });
  }

  return makeEvaluator(row);
}

export function evaluateCarrierCorrectionPacket(packet, options = {}) {
  return createCarrierCorrectionEvaluator(packet, options);
}

export function sampleCarrierCorrections(evaluator, sampleCount = DEFAULT_SAMPLE_COUNT) {
  if (!evaluator?.ok) {
    return [];
  }
  const samples = [];
  for (let sampleIndex = 0; sampleIndex < sampleCount; sampleIndex += 1) {
    const phaseFraction = sampleIndex / (sampleCount - 1);
    const t = evaluator.period * phaseFraction;
    samples.push({
      sample_index: sampleIndex,
      t,
      phase_fraction: phaseFraction,
      layers: Object.fromEntries(LAYERS.map((layer) => [layer, evaluator.layerCorrection(layer, t)])),
      bodies: Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, evaluator.bodyCorrection(bodyId, t)])),
    });
  }
  return samples;
}

function evaluatorSummary(evaluator) {
  if (!evaluator.ok) {
    return evaluator;
  }
  return {
    ok: true,
    schema: evaluator.schema,
    status: evaluator.status,
    failure_code: null,
    row: evaluator.row,
    source_status: evaluator.source_status,
    source_failure_code: evaluator.source_failure_code,
    period: evaluator.period,
    layer_ids: evaluator.layer_ids,
    body_ids: evaluator.body_ids,
    layer_mode_counts: evaluator.layer_mode_counts,
    correction_rerun_required: evaluator.correction_rerun_required,
    accepted_history_boundary: false,
  };
}

function runCli(packet, packetPath, args) {
  const row = requireRowNumber(args);
  const evaluator = createCarrierCorrectionEvaluator(packet, { rowNumber: row });
  const samples = sampleCarrierCorrections(evaluator, args.sampleCount);
  return {
    artifact_schema: EVALUATOR_SCHEMA,
    metadata: {
      artifact: "a0-tier1-carrier-correction-evaluator",
      schema_status: "provisional",
      status: evaluator.status,
      generatedAt: new Date().toISOString(),
      sourcePacket: path.relative(process.cwd(), packetPath),
      sourcePacketSchema: packet?.artifact_schema ?? null,
      row,
      sampleCount: args.sampleCount,
      note:
        "Fail-closed reusable retained Fourier correction evaluator for corrected one-period rerun inputs only.",
    },
    evaluator: evaluatorSummary(evaluator),
    sample_count: samples.length,
    samples,
    correction_rerun_required: evaluator.ok === true,
    accepted_history_boundary: false,
  };
}

function writeOutput(output, args) {
  const serialized = JSON.stringify(output, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${serialized}\n`);
  } else {
    console.log(serialized);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const packetPath = requirePacketPath(args);
  const packet = readJson(packetPath);
  writeOutput(runCli(packet, packetPath, args), args);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  });
}
