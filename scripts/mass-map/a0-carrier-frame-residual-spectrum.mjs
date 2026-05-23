#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const INTAKE_SCHEMA = "a0-tier1-fold-layer-locked-one-period-attempt/v1";
const LEDGER_KEY = "refined_i_receiver_phase_bin_residual_balance";
const LEDGER_SCHEMA = "a0-tier1-refined-residual-basis-ledger/v1";
const RECIPROCAL_SCHEMA = "a0-reciprocal-interlayer-branch-equation-checker/v1";
const OUTPUT_SCHEMA = "a0-carrier-frame-residual-spectrum/v1";
const OUTPUT_ROW_SCHEMA = "a0-carrier-frame-residual-spectrum-row/v1";
const RERUN_AUTHORITY = "diagnostic_only_not_corrected_rerun_authority";
const FRAME_COMPONENTS = ["radial", "tangential", "normal"];
const DEFAULT_MODE_BAND = [4, 5, 6, 7];
const FRAME_TIME_RULES = ["nearest", "linear"];

function parseArgs(argv) {
  const args = {
    intake: null,
    reciprocalCheck: null,
    rows: "all",
    maxMode: null,
    modeBand: DEFAULT_MODE_BAND,
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
    } else if (arg === "--reciprocal-check") {
      args.reciprocalCheck = argv[++index];
    } else if (arg === "--rows") {
      args.rows = argv[++index];
    } else if (arg === "--max-mode") {
      args.maxMode = parseNonnegativeInteger(argv[++index], "--max-mode");
    } else if (arg === "--mode-band") {
      args.modeBand = parseModeList(argv[++index], "--mode-band");
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
  console.log(`Usage: node scripts/mass-map/a0-carrier-frame-residual-spectrum.mjs --intake PATH [options]

Options:
  --intake PATH             JSON artifact from a0-tier1-fold-layer-locked-one-period-attempt.mjs.
  --reciprocal-check PATH   Optional reciprocal branch-equation checker artifact for context only.
  --rows VALUE              "all" or a comma-separated row list. Defaults to all.
  --max-mode N              Highest one-sided Fourier mode to report. Defaults to floor(sample_count / 2).
  --mode-band LIST          Comma-separated cyclic modes to summarize. Defaults to ${DEFAULT_MODE_BAND.join(",")}.
  --frame-time-rule VALUE   nearest or linear. Defaults to nearest.
  --out PATH                Write JSON output to a file instead of stdout.
  --pretty                  Pretty-print JSON.
  --help                    Show this help.

This diagnostic projects the I residual forcing into the local corrected-carrier
I frame {radial,tangential,normal}. It does not fit a branch coordinate and never
authorizes corrected rerun or accepted history.`);
}

function parseNonnegativeInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) {
    throw new Error(`Expected ${name} to be a nonnegative integer, got: ${value}`);
  }
  return number;
}

function parseModeList(value, name) {
  const modes = String(value)
    .split(",")
    .map((entry) => parseNonnegativeInteger(entry.trim(), name));
  if (modes.length === 0) {
    throw new Error(`Expected ${name} to contain at least one mode.`);
  }
  return [...new Set(modes)].sort((left, right) => left - right);
}

function parseChoice(value, name, choices) {
  if (!choices.includes(value)) {
    throw new Error(`Expected ${name} to be one of ${choices.join(", ")}, got: ${value}`);
  }
  return value;
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
      if (!finiteVector3(sample?.bodies?.["I+"]?.position)) {
        missing.push(`rows[].samples[${sampleIndex}].bodies.I+.position[3]`);
      }
      if (!finiteVector3(sample?.bodies?.["I-"]?.position)) {
        missing.push(`rows[].samples[${sampleIndex}].bodies.I-.position[3]`);
      }
      if (!finiteVector3(sample?.bodies?.["I+"]?.velocity)) {
        missing.push(`rows[].samples[${sampleIndex}].bodies.I+.velocity[3]`);
      }
      if (!finiteVector3(sample?.bodies?.["I-"]?.velocity)) {
        missing.push(`rows[].samples[${sampleIndex}].bodies.I-.velocity[3]`);
      }
    }
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
  const tangential = vectorSubtract(relVelocity, scale(eR, dot(relVelocity, eR)));
  const tangentialNorm = norm(tangential);
  const usedTangentFallback = tangentialNorm < 1e-14;
  const eTheta = normalize(tangential, fallbackTangent(eR));
  const eN = normalize(cross(eR, eTheta), [0, 0, 1]);
  const vHat = normalize(relVelocity, eTheta);
  const radius = norm(relPosition);
  return {
    radial: eR,
    tangential: eTheta,
    normal: eN,
    velocity_direction: vHat,
    velocity_direction_components: {
      radial: dot(vHat, eR),
      tangential: dot(vHat, eTheta),
      normal: dot(vHat, eN),
    },
    kinematics: {
      rel_radius: radius,
      tangential_speed: tangentialNorm,
      angular_velocity: radius > 0 ? dot(cross(relPosition, relVelocity), eN) / (radius * radius) : null,
      used_tangent_fallback: usedTangentFallback,
    },
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

function projectedSamples(row, frameTimeRule) {
  return baselineLedger(row).sampled_forcing.samples.map((sample, index) => {
    const match = carrierMatch(row, sample.t, frameTimeRule);
    if (!match.sample) {
      throw new Error(`Missing carrier sample for forcing sample ${index}.`);
    }
    const frame = carrierFrame(match.sample);
    const residual = sample.layers.I.residual_forcing;
    return {
      sample_index: index,
      t: sample.t,
      residual,
      frame_components: {
        radial: dot(residual, frame.radial),
        tangential: dot(residual, frame.tangential),
        normal: dot(residual, frame.normal),
      },
      velocity_projection: dot(residual, frame.velocity_direction),
      velocity_direction_components: frame.velocity_direction_components,
      frame_kinematics: frame.kinematics,
      nearest_carrier_sample: {
        t: match.sample.t,
        match_rule: match.match_rule,
        interpolation_status: match.interpolation_status,
        interpolation_gap: match.interpolation_gap,
        nearest_distance: match.nearest_distance,
        tie_count: match.tie_count,
      },
    };
  });
}

function squaredNorm(values) {
  return values.reduce((sum, value) => sum + value * value, 0);
}

function componentSeries(samples, component) {
  return samples.map((sample) => sample.frame_components[component]);
}

function componentNorms(samples) {
  return Object.fromEntries(
    FRAME_COMPONENTS.map((component) => [component, Math.sqrt(squaredNorm(componentSeries(samples, component)))])
  );
}

function componentEnergyFractions(samples) {
  const energies = Object.fromEntries(
    FRAME_COMPONENTS.map((component) => [component, squaredNorm(componentSeries(samples, component))])
  );
  const total = Object.values(energies).reduce((sum, value) => sum + value, 0);
  return Object.fromEntries(
    FRAME_COMPONENTS.map((component) => [component, total > 0 ? energies[component] / total : null])
  );
}

function velocityDirectionSummary(samples) {
  const values = Object.fromEntries(
    FRAME_COMPONENTS.map((component) => [
      component,
      samples.map((sample) => sample.velocity_direction_components[component]),
    ])
  );
  return Object.fromEntries(
    FRAME_COMPONENTS.map((component) => {
      const column = values[component];
      return [
        component,
        {
          mean: column.reduce((sum, value) => sum + value, 0) / column.length,
          rms: Math.sqrt(squaredNorm(column) / column.length),
        },
      ];
    })
  );
}

function rangeSummary(values) {
  return {
    min: Math.min(...values),
    max: Math.max(...values),
    mean: values.reduce((sum, value) => sum + value, 0) / values.length,
  };
}

function frameRegularity(samples) {
  return {
    rel_radius: rangeSummary(samples.map((sample) => sample.frame_kinematics.rel_radius)),
    tangential_speed: rangeSummary(samples.map((sample) => sample.frame_kinematics.tangential_speed)),
    angular_velocity: rangeSummary(samples.map((sample) => sample.frame_kinematics.angular_velocity)),
    tangent_fallback_count: samples.filter((sample) => sample.frame_kinematics.used_tangent_fallback).length,
  };
}

function nearestSampleAudit(samples) {
  return {
    max_nearest_distance: Math.max(...samples.map((sample) => sample.nearest_carrier_sample.nearest_distance)),
    max_tie_count: Math.max(...samples.map((sample) => sample.nearest_carrier_sample.tie_count)),
    tied_sample_count: samples.filter((sample) => sample.nearest_carrier_sample.tie_count > 1).length,
    interpolation_status_counts: samples.reduce((counts, sample) => {
      const status = sample.nearest_carrier_sample.interpolation_status;
      counts[status] = (counts[status] ?? 0) + 1;
      return counts;
    }, {}),
  };
}

function orderedTimeAudit(samples, period) {
  const times = samples.map((sample) => modulo(sample.t, period));
  const deltas = times.map((time, index) => {
    const next = times[(index + 1) % times.length];
    return modulo(next - time, period);
  });
  const mean = deltas.reduce((sum, value) => sum + value, 0) / deltas.length;
  return {
    sample_order_rule: "residual forcing sample order",
    delta_mean: mean,
    delta_min: Math.min(...deltas),
    delta_max: Math.max(...deltas),
    max_abs_delta_deviation: Math.max(...deltas.map((delta) => Math.abs(delta - mean))),
  };
}

function diagnosticClassification(energyFractions, regularity, nearestAudit, frameTimeRule) {
  const interpolationOutside =
    (nearestAudit.interpolation_status_counts.outside_sample_window ?? 0) > 0 ||
    (nearestAudit.interpolation_status_counts.missing ?? 0) > 0;
  if (regularity.tangent_fallback_count > 0 || interpolationOutside) {
    return "insufficient_frame_regularization";
  }
  if (frameTimeRule === "nearest" && nearestAudit.max_tie_count > 1) {
    return "insufficient_frame_regularization";
  }
  const ranked = FRAME_COMPONENTS.map((component) => ({
    component,
    energy_fraction: energyFractions[component],
  })).sort((left, right) => right.energy_fraction - left.energy_fraction);
  if (ranked[0].energy_fraction < 0.55) {
    return "mixed_carrier_frame_residual";
  }
  if (ranked[0].component === "radial") {
    return "radial_deformation_dominated";
  }
  if (ranked[0].component === "tangential") {
    return "tangential_phase_cadence_dominated";
  }
  return "normal_plane_wobble_dominated";
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

function oneDimensionalSpectrum(values, requestedMaxMode) {
  const n = values.length;
  const safeMaxMode = Math.floor(n / 2);
  const maxMode = Math.min(requestedMaxMode ?? safeMaxMode, safeMaxMode);
  const totalEnergy = squaredNorm(values) / n;
  const modes = [];
  for (let mode = 0; mode <= maxMode; mode += 1) {
    const energy = modeEnergy(values, mode);
    modes.push({
      mode,
      energy_fraction: totalEnergy > 0 ? energy / totalEnergy : null,
    });
  }
  const dominant = modes
    .filter((mode) => Number.isFinite(mode.energy_fraction))
    .sort((left, right) => right.energy_fraction - left.energy_fraction)[0];
  return {
    norm: Math.sqrt(squaredNorm(values)),
    reported_mode_count: modes.length,
    max_mode: maxMode,
    safe_max_mode: safeMaxMode,
    dominant_mode: dominant ? { mode: dominant.mode, energy_fraction: dominant.energy_fraction } : null,
    modes,
  };
}

function dominantModeSummary(modes) {
  const byTotal = modes
    .filter((mode) => Number.isFinite(mode.total_energy_fraction))
    .sort((left, right) => right.total_energy_fraction - left.total_energy_fraction)[0];
  const components = {};
  for (const component of FRAME_COMPONENTS) {
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

function spectralDiagnostics(samples, requestedMaxMode) {
  const n = samples.length;
  const safeMaxMode = Math.floor(n / 2);
  const maxMode = Math.min(requestedMaxMode ?? safeMaxMode, safeMaxMode);
  const columns = FRAME_COMPONENTS.map((component) => componentSeries(samples, component));
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
        FRAME_COMPONENTS.map((component, index) => [
          component,
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

function modeBandSummary(spectrum, modeBand) {
  const selected = spectrum.modes.filter((mode) => modeBand.includes(mode.mode));
  return {
    modes: modeBand,
    total_energy_fraction: selected.reduce(
      (sum, mode) => sum + (Number.isFinite(mode.total_energy_fraction) ? mode.total_energy_fraction : 0),
      0
    ),
    component_energy_fractions: Object.fromEntries(
      FRAME_COMPONENTS.map((component) => [
        component,
        selected.reduce((sum, mode) => {
          const value = mode.component_energy_fractions[component];
          return sum + (Number.isFinite(value) ? value : 0);
        }, 0),
      ])
    ),
  };
}

function reciprocalContextForRow(reciprocalArtifact, rowNumber) {
  if (!reciprocalArtifact) {
    return null;
  }
  const row = rowsOf(reciprocalArtifact).find((entry) => entry.row === rowNumber) ?? null;
  return {
    reciprocal_schema: reciprocalArtifact?.artifact_schema ?? null,
    reciprocal_status: reciprocalArtifact?.status ?? null,
    row_status: row?.status ?? null,
    failure_code: row?.failure_code ?? null,
    full_relative_residual: row?.full_fit?.relative_residual ?? null,
    max_held_out_relative_residual: row?.held_out_residual?.max_held_out_relative_residual ?? null,
  };
}

function solveRow(row, args, reciprocalArtifact) {
  const missingFields = rowMissingFields(row);
  if (missingFields.length > 0) {
    return {
      schema: OUTPUT_ROW_SCHEMA,
      row: Number.isInteger(row?.row) ? row.row : null,
      status: "blocked_missing_carrier_frame_residual_fields",
      failure_code: "missing-carrier-frame-residual-fields",
      accepted_history_boundary: false,
      rerun_authority: RERUN_AUTHORITY,
      missing_fields: missingFields,
      reciprocal_context: reciprocalContextForRow(reciprocalArtifact, row?.row),
    };
  }
  const samples = projectedSamples(row, args.frameTimeRule);
  const norms = componentNorms(samples);
  const energyFractions = componentEnergyFractions(samples);
  const regularity = frameRegularity(samples);
  const nearestAudit = nearestSampleAudit(samples);
  const spectrum = spectralDiagnostics(samples, args.maxMode);
  return {
    schema: OUTPUT_ROW_SCHEMA,
    row: row.row,
    status: "carrier_frame_residual_geometry_computed",
    failure_code: null,
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    sample_count: samples.length,
    frame: "I corrected-carrier frame {radial,tangential,normal}",
    frame_time_rule: args.frameTimeRule,
    diagnostic_classification: diagnosticClassification(energyFractions, regularity, nearestAudit, args.frameTimeRule),
    residual_target: `${LEDGER_KEY}.sampled_forcing.samples[].layers.I.residual_forcing`,
    total_norm: Math.sqrt(Object.values(norms).reduce((sum, value) => sum + value * value, 0)),
    component_norms: norms,
    component_energy_fractions: energyFractions,
    velocity_projection_spectrum: oneDimensionalSpectrum(samples.map((sample) => sample.velocity_projection), args.maxMode),
    velocity_direction_summary: velocityDirectionSummary(samples),
    frame_regularity: regularity,
    nearest_sample_audit: nearestAudit,
    forcing_time_audit: orderedTimeAudit(samples, baselineLedger(row).sampled_forcing.period),
    mode_band_summary: modeBandSummary(spectrum, args.modeBand),
    spectrum,
    reciprocal_context: reciprocalContextForRow(reciprocalArtifact, row.row),
    promotion_decision: "priority-only",
    note:
      "This diagnostic localizes residual forcing in the corrected-carrier frame. It does not fit a coordinate or authorize rerun.",
  };
}

function buildOutput(args, intakePath, artifact, reciprocalPath, reciprocalArtifact) {
  const topMissing = [];
  if (artifact?.artifact_schema !== INTAKE_SCHEMA) {
    topMissing.push(`artifact_schema=${INTAKE_SCHEMA}`);
  }
  if (!Array.isArray(artifact?.rows)) {
    topMissing.push("rows[]");
  }
  if (reciprocalArtifact && reciprocalArtifact?.artifact_schema !== RECIPROCAL_SCHEMA) {
    topMissing.push(`reciprocal_check.artifact_schema=${RECIPROCAL_SCHEMA}`);
  }
  const rows =
    topMissing.length === 0
      ? selectRows(artifact, args.rows).map((row) => solveRow(row, args, reciprocalArtifact))
      : [];
  const blockedCount = rows.filter((row) => String(row.status).startsWith("blocked_")).length;
  return {
    artifact_schema: OUTPUT_SCHEMA,
    generated_at: new Date().toISOString(),
    status: topMissing.length > 0 || blockedCount > 0 ? "blocked_missing_carrier_frame_residual_fields" : "computed",
    accepted_history_boundary: false,
    rerun_authority: RERUN_AUTHORITY,
    inputs: {
      intake: intakePath,
      reciprocal_check: reciprocalPath,
      rows: args.rows,
      intake_schema: artifact?.artifact_schema ?? null,
      reciprocal_schema: reciprocalArtifact?.artifact_schema ?? null,
    },
    parameters: {
      max_mode: args.maxMode,
      mode_band: args.modeBand,
      frame_time_rule: args.frameTimeRule,
      reciprocal_context_rule:
        "Optional reciprocal branch-equation checker input is copied as context only and is not used in the frame projection.",
    },
    missing_fields: topMissing,
    summary: {
      row_count: rows.length,
      computed_count: rows.filter((row) => row.status === "carrier_frame_residual_geometry_computed").length,
      blocked_count: blockedCount,
    },
    rows,
    promotion_decision: "diagnostic-only",
    note:
      "This artifact is a carrier-frame residual geometry diagnostic. It does not authorize corrected rerun or accepted history.",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const intakePath = requireIntake(args);
  const reciprocalPath = args.reciprocalCheck ? path.resolve(args.reciprocalCheck) : null;
  const artifact = readJson(intakePath);
  const reciprocalArtifact = reciprocalPath ? readJson(reciprocalPath) : null;
  writeJson(args, buildOutput(args, intakePath, artifact, reciprocalPath, reciprocalArtifact));
}

main();
