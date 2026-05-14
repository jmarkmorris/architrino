#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROWS = "ready";
const DEFAULT_SAMPLE_COUNTS = [32, 64, 128];
const DEFAULT_ETA_STEPS = 3;
const DEFAULT_DRIFT_TOLERANCE = 0.05;
const DEFAULT_APERTURE_WIDTH = 0.35;
const TIER_LAYERS = {
  IMO: ["I", "M", "O"],
  "IM-": ["I", "M"],
  "I--": ["I"],
};
const POLARITIES = ["+", "-"];
const POLARITY_SIGN = { "+": 1, "-": -1 };
const POLARITY_CHARGE = { "+": 1, "-": -1 };

function parseArgs(argv) {
  const args = {
    tier0: null,
    rows: DEFAULT_ROWS,
    tierSelector: null,
    sampleCounts: DEFAULT_SAMPLE_COUNTS,
    etaLadder: null,
    RRel: null,
    c: null,
    sigmaAx: null,
    driftTolerance: DEFAULT_DRIFT_TOLERANCE,
    apertureWidth: DEFAULT_APERTURE_WIDTH,
    pretty: false,
    out: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--tier0") {
      args.tier0 = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--tier-selector") {
      args.tierSelector = argv[++i];
    } else if (arg === "--sample-counts") {
      args.sampleCounts = parseIntegerList(argv[++i]);
    } else if (arg === "--eta-ladder") {
      args.etaLadder = parseNumberList(argv[++i]);
    } else if (arg === "--R-rel") {
      args.RRel = parsePositiveNumber(argv[++i], "--R-rel");
    } else if (arg === "--c") {
      args.c = parsePositiveNumber(argv[++i], "--c");
    } else if (arg === "--sigma-ax") {
      args.sigmaAx = parseSigmaAx(argv[++i]);
    } else if (arg === "--drift-tolerance") {
      args.driftTolerance = parsePositiveNumber(argv[++i], "--drift-tolerance");
    } else if (arg === "--aperture-width") {
      args.apertureWidth = parsePositiveNumber(argv[++i], "--aperture-width");
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier1-weak-retained-emitter-prototype.mjs --tier0 PATH [options]

Options:
  --tier0 PATH            Tier 0 JSON output from a0-tier0-branch-search.mjs.
  --rows VALUE            "ready", "all", or a comma-separated row list. Defaults to "ready".
  --tier-selector VALUE   IMO, IM-, or I--. Defaults to the row handoff selector or IMO.
  --sample-counts LIST    Comma-separated positive integer refinement counts. Defaults to 32,64,128.
  --eta-ladder LIST       Comma-separated positive eta values. Defaults to the Tier 0 fold layer and halvings.
  --R-rel VALUE           Diagnostic extraction radius. Defaults to 4 * R_O for each row.
  --c VALUE               Weak-sector propagation scale. Defaults to the source sea_cell.c_f.
  --sigma-ax VALUE        Axial sign, +1 or -1. Defaults to the row orientation sign.
  --drift-tolerance VALUE Relative drift tolerance. Defaults to ${DEFAULT_DRIFT_TOLERANCE}.
  --aperture-width VALUE  Provisional polar-site aperture width. Defaults to ${DEFAULT_APERTURE_WIDTH}.
  --out PATH              Write JSON output to a file instead of stdout.
  --pretty                Pretty-print JSON.
  --help                  Show this help.

This is a Tier 1 weak-retained emitter prototype. It reconstructs a provisional
diagnostic wake from Tier 0 carrier data and reports active-tier norm and
refinement drift. It does not emit weak-emitter-ready and it must not be used as
a Standard Model shielding-envelope input.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireTier0Path(args) {
  if (!args.tier0) {
    throw new Error("Missing required --tier0 PATH argument.");
  }
  return path.resolve(args.tier0);
}

function parseNumberList(value) {
  const numbers = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isFinite(entry) && entry > 0);
  if (numbers.length === 0) {
    throw new Error(`Expected a comma-separated list of positive numbers, got: ${value}`);
  }
  return uniquePositive(numbers);
}

function parseIntegerList(value) {
  const numbers = String(value)
    .split(",")
    .map((entry) => Number(entry.trim()))
    .filter((entry) => Number.isInteger(entry) && entry > 0);
  if (numbers.length === 0) {
    throw new Error(`Expected a comma-separated list of positive integers, got: ${value}`);
  }
  return [...new Set(numbers)].sort((a, b) => a - b);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be positive, got: ${value}`);
  }
  return number;
}

function parseSigmaAx(value) {
  if (value === "+" || value === "+1" || value === "1") {
    return 1;
  }
  if (value === "-" || value === "-1") {
    return -1;
  }
  throw new Error(`Expected --sigma-ax to be +1 or -1, got: ${value}`);
}

function uniquePositive(values) {
  const seen = new Set();
  const result = [];
  for (const value of values) {
    if (!Number.isFinite(value) || value <= 0) {
      continue;
    }
    const key = value.toPrecision(16);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(value);
    }
  }
  return result;
}

function selectRows(tier0, selector) {
  const candidates = Array.isArray(tier0.candidates) ? tier0.candidates : [];
  if (selector === "all") {
    return candidates;
  }
  if (selector === "ready") {
    return candidates.filter((row) => row.status === "tier0_continuation_ready");
  }
  const selected = new Set(
    String(selector)
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter((entry) => Number.isInteger(entry))
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return candidates.filter((row) => selected.has(row.row));
}

function defaultEtaLadder(tier0, row) {
  const seed =
    row.self_root_delay_window?.window?.foldLayerDelay ??
    tier0.tolerances?.selfRootFoldLayerDelay ??
    tier0.tolerances?.instantaneousSelfDelay ??
    tier0.tolerances?.root ??
    1e-6;
  const ladder = [];
  for (let i = 0; i < DEFAULT_ETA_STEPS; i += 1) {
    ladder.push(seed / 2 ** i);
  }
  return uniquePositive(ladder);
}

function refinementStages(sampleCounts, etaLadder) {
  const count = Math.max(sampleCounts.length, etaLadder.length);
  return Array.from({ length: count }, (_, index) => ({
    nu: index + 1,
    sample_count: sampleCounts[Math.min(index, sampleCounts.length - 1)],
    eta: etaLadder[Math.min(index, etaLadder.length - 1)],
  }));
}

function tierSelectorFor(row, override) {
  const rowLabel = row.weak_retained_amplitude_handoff?.tier_selector?.label ?? "IMO";
  const label = override ?? rowLabel;
  if (!Object.hasOwn(TIER_LAYERS, label)) {
    throw new Error(`Unsupported tier selector: ${label}`);
  }
  if (override && override !== rowLabel) {
    throw new Error(
      `Row ${row.row} carries weak tier selector ${rowLabel}; this prototype will not derive ${override} by dropping layers from the same row.`
    );
  }
  return {
    label,
    active_layers: TIER_LAYERS[label],
    schema_status: "provisional",
  };
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, value) {
  return [a[0] * value, a[1] * value, a[2] * value];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cross(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function unit(a) {
  const value = norm(a);
  return value === 0 ? [0, 0, 0] : scale(a, 1 / value);
}

function cAdd(a, b) {
  return { re: a.re + b.re, im: a.im + b.im };
}

function cSub(a, b) {
  return { re: a.re - b.re, im: a.im - b.im };
}

function cScale(a, value) {
  return { re: a.re * value, im: a.im * value };
}

function cMul(a, b) {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

function cAbs(a) {
  return Math.hypot(a.re, a.im);
}

function cPhase(a) {
  return Math.atan2(a.im, a.re);
}

function cExp(theta) {
  return { re: Math.cos(theta), im: Math.sin(theta) };
}

function complexRecord(value) {
  return {
    re: value.re,
    im: value.im,
    abs: cAbs(value),
    phase: cPhase(value),
  };
}

function fibonacciDirections(count) {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: count }, (_, index) => {
    const y = 1 - (2 * (index + 0.5)) / count;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = index * goldenAngle;
    return [Math.cos(theta) * radius, y, Math.sin(theta) * radius];
  });
}

function stateEntries(row) {
  const entries = row.state_vector?.initial ?? [];
  return Object.fromEntries(entries.map((entry) => [entry.id, entry]));
}

function reconstructLayers(row) {
  const entries = stateEntries(row);
  const layers = {};
  for (const layer of ["I", "M", "O"]) {
    const plus = entries[`${layer}+`];
    const minus = entries[`${layer}-`];
    if (!plus || !minus) {
      throw new Error(`Row ${row.row} is missing initial state entries for layer ${layer}.`);
    }
    const relative = sub(plus.position, minus.position);
    const relativeVelocity = sub(plus.velocity, minus.velocity);
    const radius = row.geometry?.radii?.[layer] ?? norm(relative);
    const omega = row.geometry?.omega?.[layer] ?? norm(relativeVelocity) / Math.max(radius, Number.EPSILON);
    const ellipticity =
      row.z_lambda?.ellipticity?.[layer] ??
      (typeof row.branch_label?.ellipticity === "number" ? row.branch_label.ellipticity : 1);
    const e1 = unit(relative);
    const e2 = unit(relativeVelocity);
    layers[layer] = {
      layer,
      radius,
      omega,
      ellipticity,
      e1,
      e2,
      normal: unit(cross(e1, e2)),
    };
  }
  return layers;
}

function carrierState(layerData, polarity, t) {
  const sign = POLARITY_SIGN[polarity];
  const phase = layerData.omega * t;
  const relative = add(
    scale(layerData.e1, layerData.radius * Math.cos(phase)),
    scale(layerData.e2, layerData.radius * layerData.ellipticity * Math.sin(phase))
  );
  const relativeVelocity = add(
    scale(layerData.e1, -layerData.radius * layerData.omega * Math.sin(phase)),
    scale(layerData.e2, layerData.radius * layerData.omega * layerData.ellipticity * Math.cos(phase))
  );
  return {
    position: scale(relative, sign * 0.5),
    velocity: scale(relativeVelocity, sign * 0.5),
    charge: POLARITY_CHARGE[polarity],
  };
}

function exposureWeight(layerData, direction, sigmaAx, apertureWidth) {
  const plusAperture = Math.exp((dot(direction, layerData.normal) - 1) / apertureWidth);
  const minusAperture = Math.exp((dot(direction, scale(layerData.normal, -1)) - 1) / apertureWidth);
  const chirality = Math.max(0, 0.5 * (1 + sigmaAx * dot(layerData.normal, direction)));
  return chirality * (plusAperture + minusAperture);
}

function wakeKernel(layerData, polarity, direction, t, params) {
  const state = carrierState(layerData, polarity, t);
  const observation = scale(direction, params.RRel);
  const sourceToObservation = sub(observation, state.position);
  const distance = Math.sqrt(dot(sourceToObservation, sourceToObservation) + params.eta * params.eta);
  const directionToObservation = unit(sourceToObservation);
  const radialVelocity = scale(directionToObservation, dot(state.velocity, directionToObservation));
  const transverseVelocity = sub(state.velocity, radialVelocity);
  const realComponent = dot(transverseVelocity, layerData.e1);
  const imaginaryComponent = params.sigmaAx * dot(transverseVelocity, layerData.e2);
  const historyPhase = layerData.omega * (t - distance / params.c);
  const carrier = { re: realComponent / distance, im: imaginaryComponent / distance };
  return cMul(carrier, cExp(historyPhase));
}

function computeLayerStage(row, layerData, stage, params) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod;
  if (!Number.isFinite(period) || period <= 0) {
    throw new Error(`Row ${row.row} does not expose a positive cycle period.`);
  }
  const directions = fibonacciDirections(stage.sample_count);
  const directionWeight = 1 / directions.length;
  let weightedAmplitude = { re: 0, im: 0 };
  let weightedNormSquared = 0;
  let measureNormalizer = 0;

  for (const direction of directions) {
    const exposure = exposureWeight(layerData, direction, params.sigmaAx, params.apertureWidth);
    measureNormalizer += exposure * directionWeight;
    let cycleAverage = { re: 0, im: 0 };
    for (let timeIndex = 0; timeIndex < stage.sample_count; timeIndex += 1) {
      const t = (period * timeIndex) / stage.sample_count;
      let polaritySum = { re: 0, im: 0 };
      for (const polarity of POLARITIES) {
        const wake = wakeKernel(layerData, polarity, direction, t, {
          ...params,
          eta: stage.eta,
        });
        polaritySum = cAdd(polaritySum, cScale(wake, POLARITY_CHARGE[polarity]));
      }
      cycleAverage = cAdd(cycleAverage, cScale(polaritySum, 1 / stage.sample_count));
    }
    const projected = cScale(cycleAverage, exposure);
    weightedAmplitude = cAdd(weightedAmplitude, cScale(projected, directionWeight));
    weightedNormSquared += directionWeight * exposure * cAbs(cycleAverage) ** 2;
  }

  const safeNormalizer = Math.max(measureNormalizer, Number.EPSILON);
  const amplitude = cScale(weightedAmplitude, 1 / safeNormalizer);
  const normValue = Math.sqrt(weightedNormSquared / safeNormalizer);
  return {
    nu: stage.nu,
    sample_count: stage.sample_count,
    eta: stage.eta,
    measure_normalizer: measureNormalizer,
    amplitude: complexRecord(amplitude),
    norm_mu_W_L: normValue,
  };
}

function layerDrift(stages) {
  if (stages.length < 2) {
    return {
      amplitude_relative_drift: null,
      norm_relative_drift: null,
    };
  }
  const prior = stages[stages.length - 2];
  const last = stages[stages.length - 1];
  const priorAmplitude = { re: prior.amplitude.re, im: prior.amplitude.im };
  const lastAmplitude = { re: last.amplitude.re, im: last.amplitude.im };
  const amplitudeScale = Math.max(cAbs(lastAmplitude), cAbs(priorAmplitude), Number.EPSILON);
  const normScale = Math.max(last.norm_mu_W_L, prior.norm_mu_W_L, Number.EPSILON);
  return {
    amplitude_relative_drift: cAbs(cSub(lastAmplitude, priorAmplitude)) / amplitudeScale,
    norm_relative_drift: Math.abs(last.norm_mu_W_L - prior.norm_mu_W_L) / normScale,
  };
}

function rowDefaults(tier0, row, args) {
  const outerRadius = row.geometry?.radii?.O ?? Math.max(...Object.values(row.geometry?.radii ?? { O: 1 }));
  const orientationSign = row.z_lambda?.orientation_class?.chi_N;
  return {
    RRel: args.RRel ?? 4 * outerRadius,
    c: args.c ?? tier0.sea_cell?.c_f ?? 1,
    sigmaAx: args.sigmaAx ?? (orientationSign === -1 ? -1 : 1),
    apertureWidth: args.apertureWidth,
  };
}

function rowPacket(tier0, row, args) {
  const sourceReady = row.status === "tier0_continuation_ready";
  const tierSelector = tierSelectorFor(row, args.tierSelector);
  const etaLadder = args.etaLadder ?? defaultEtaLadder(tier0, row);
  const stages = refinementStages(args.sampleCounts, etaLadder);
  const params = rowDefaults(tier0, row, args);
  const layers = reconstructLayers(row);
  const layerChannels = {};
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;

  for (const layer of tierSelector.active_layers) {
    const stageValues = stages.map((stage) => computeLayerStage(row, layers[layer], stage, params));
    const last = stageValues[stageValues.length - 1];
    layerChannels[layer] = {
      status: sourceReady ? "prototype-computed" : "source-row-not-ready",
      schema_status: "provisional",
      formula:
        "L_layer^(W,Lambda_tier,nu) = Pi_weak <sum_sigma q_layer,sigma W_layer,sigma^(nu)> over T_k, using a diagnostic carrier wake.",
      per_polarity_wake_diagnostics: {
        status: "charge-weighted-cycle-sum",
        polarities: POLARITIES,
        note:
          "Per-polarity W_layer,sigma^(nu) contributions are sampled internally and emitted after the charge-weighted layer sum.",
      },
      final_stage: last,
      refinement_stages: stageValues,
      refinement_drift: layerDrift(stageValues),
    };
  }

  const finalNorms = Object.values(layerChannels).map((channel) => channel.final_stage.norm_mu_W_L);
  const activeTierNorm = finalNorms.reduce((sum, value) => sum + value, 0);
  const maxNormDrift = Math.max(
    ...Object.values(layerChannels).map((channel) => channel.refinement_drift.norm_relative_drift ?? 0)
  );
  const maxAmplitudeDrift = Math.max(
    ...Object.values(layerChannels).map((channel) => channel.refinement_drift.amplitude_relative_drift ?? 0)
  );
  const driftPass = maxNormDrift <= args.driftTolerance && maxAmplitudeDrift <= args.driftTolerance;
  const nonzeroNorm = activeTierNorm > Number.EPSILON;
  const prototypeFailureCode = !sourceReady
    ? row.failure_code
    : !nonzeroNorm
      ? "weak-emitter-zero-norm"
      : !driftPass
        ? "weak-emitter-refinement-drift"
        : "weak-emitter-not-computed";
  const prototypeStatus = !sourceReady
    ? "source-row-not-ready"
    : !nonzeroNorm
      ? "prototype-zero-norm"
      : !driftPass
        ? "prototype-refinement-drift"
        : "prototype-converged-not-ready";
  const status = sourceReady && nonzeroNorm && driftPass ? "candidate" : "failed";

  return {
    row: row.row,
    schema: "provisional-a0-tier1-weak-retained-emitter-prototype/v1",
    schema_status: "provisional",
    status,
    prototype_status: prototypeStatus,
    failure_code: prototypeFailureCode,
    source_row_status: row.status,
    source_row_failure_code: row.failure_code,
    source_weak_handoff_status: row.weak_retained_amplitude_handoff?.status ?? null,
    source_row: {
      branch_label: row.branch_label ?? null,
      z_lambda: row.z_lambda ?? null,
      root_ledger: row.root_ledger ?? null,
      residual_values: row.residual_values ?? null,
      Delta_k: row.Delta_k ?? null,
      certificate_gates: row.certificate_gates ?? null,
      promotion_boundary: row.promotion_boundary ?? null,
    },
    tier_selector: tierSelector,
    weak_inputs: {
      R_rel: {
        value: params.RRel,
        status: args.RRel ? "cli_supplied_prototype_input" : "prototype_default_outer_radius_multiple",
      },
      c: {
        value: params.c,
        status: args.c ? "cli_supplied_prototype_input" : "source_sea_cell_c_f",
      },
      sigma_ax: {
        value: params.sigmaAx,
        status: args.sigmaAx ? "cli_supplied_prototype_input" : "source_orientation_sign",
      },
      eta_a_h: {
        value: "left axial exposure weight from carrier normal and sample direction",
        status: "provisional_diagnostic_model",
      },
      polar_site_aperture: {
        value: `exponential aperture with width ${params.apertureWidth}`,
        status: args.apertureWidth ? "cli_supplied_prototype_input" : "prototype_default",
      },
      rho_core: {
        value: null,
        status: "not_reconstructed",
      },
      chi_sea: {
        value: tier0.sea_cell?.chi_sea ?? null,
        status: Object.hasOwn(tier0.sea_cell ?? {}, "chi_sea")
          ? "source_homogeneous_rest_cell_input"
          : "not_reconstructed",
      },
      local_noether_sea_state: {
        value: tier0.sea_cell ?? null,
        status: "source_tier0_rest_cell",
      },
    },
    weak_measure_model: {
      schema_status: "provisional",
      handedness: "L",
      measure: "discrete direction average with exposure weight eta_a^(L) A_a(x;R_rel)",
      rho_core: null,
      chi_sea: tier0.sea_cell?.chi_sea ?? null,
      normalizer: "computed per layer and refinement stage",
    },
    weak_exposure_map: {
      schema_status: "provisional",
      Pi_weak:
        "left axial diagnostic projection retaining the carrier transverse wake weighted by polar-site aperture",
      Q_weak: null,
      retained_labels: [
        "weak-coupling-triad exposure",
        "axial-frame branch data",
        "chirality channel",
        "flavor-overlap data",
        "weak-corridor provenance",
      ],
      discarded_labels: [],
      readiness_blocker:
        "This prototype does not prove that the retained labels form one accepted weak-visible domain.",
      failure_code_if_domain_splits: "weak-emitter-split-domain",
    },
    phase_handoff: {
      status: row.z_lambda?.phase_offset_quotient?.status ? "source_quotient_data_only" : "missing",
      phase_offset_quotient: row.z_lambda?.phase_offset_quotient ?? null,
      handedness: row.z_lambda?.handedness ?? row.branch_label?.handedness ?? null,
      orientation_class: row.z_lambda?.orientation_class ?? null,
      branch_class: row.z_lambda?.branch_class ?? row.branch_label ?? null,
      failure_code_if_ambiguous: "weak-emitter-phase-underdetermined",
    },
    reconstruction_kernel: {
      schema_status: "provisional",
      W_layer_sigma_nu:
        "diagnostic transverse carrier wake with phase omega_layer * (t - |x-s_layer,sigma(t)|/c) and eta-mollified distance",
      cycle_average: "uniform average over the row's T_k using sample_count points",
      direction_rule: "Fibonacci-sphere angular samples at radius R_rel",
      benchmark_inputs_excluded: [
        "CKM magnitude",
        "CKM angle",
        "charged-lepton mass ratio",
        "particle mass",
        "CKM-derived transport action",
      ],
    },
    layer_channels: layerChannels,
    active_tier_norm: {
      formula:
        "N_active = sum_{layer in I_Lambda_tier} ||L_layer^(W,Lambda_tier)||_{mu_W^(L)}",
      value: activeTierNorm,
      status: nonzeroNorm ? "nonzero" : "zero",
      failure_code_if_zero: "weak-emitter-zero-norm",
    },
    refinement: {
      status: driftPass ? "pass" : "fail",
      extraction_radius: params.RRel,
      angular_resolution: stages.map((stage) => stage.sample_count),
      cycle_window: period,
      Delta_t: stages.map((stage) => ({
        nu: stage.nu,
        value: period === null ? null : period / stage.sample_count,
      })),
      history_depth: row.state_vector?.historyWindow ?? null,
      eta: etaLadder,
      norm_deltas: Object.fromEntries(
        Object.entries(layerChannels).map(([layer, channel]) => [
          layer,
          channel.refinement_drift.norm_relative_drift,
        ])
      ),
      amplitude_deltas: Object.fromEntries(
        Object.entries(layerChannels).map(([layer, channel]) => [
          layer,
          channel.refinement_drift.amplitude_relative_drift,
        ])
      ),
      convergence_status: driftPass ? "prototype_drift_within_tolerance" : "prototype_drift_above_tolerance",
      failure_code_if_drift: "weak-emitter-refinement-drift",
    },
    refinement_drift: {
      max_norm_relative_drift: maxNormDrift,
      max_amplitude_relative_drift: maxAmplitudeDrift,
      tolerance: args.driftTolerance,
      status: driftPass ? "pass" : "fail",
      failure_code_if_fail: "weak-emitter-refinement-drift",
    },
    standard_model_handoff: {
      status: "blocked",
      failure_code: prototypeFailureCode === "weak-emitter-not-computed" ? "weak-emitter-not-computed" : prototypeFailureCode,
      reason:
        "The packet is a provisional diagnostic reconstruction. It is not weak-emitter-ready until direct Tier 1 continuation, accepted Pi_weak/Q_weak, phase quotient closure, and convergence under declared refinement all pass.",
    },
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to construct this prototype.",
  };
}

function run(tier0, tier0Path, args) {
  const rows = selectRows(tier0, args.rows);
  return {
    metadata: {
      artifact: "a0-tier1-weak-retained-emitter-prototype",
      schema_status: "provisional",
      status: "diagnostic-prototype",
      generatedAt: new Date().toISOString(),
      sourceTier0: path.relative(process.cwd(), tier0Path),
      rowSelector: args.rows,
      note:
        "This packet computes a provisional weak-retained diagnostic reconstruction from Tier 0 carrier data. It does not emit weak-emitter-ready.",
    },
    source_tier0_metadata: tier0.metadata ?? null,
    selected_row_count: rows.length,
    global_readiness_boundary: {
      pass_statement:
        "A row can feed a Standard Model shielding envelope only after weak-emitter-ready, finite nonzero active-tier norm, accepted Pi_weak/Q_weak, phase quotient closure, and refinement convergence.",
      current_packet_boundary:
        "This prototype can report nonzero norm and refinement drift, but keeps Standard Model handoff blocked.",
      failure_modes: [
        "weak-emitter-zero-norm",
        "weak-emitter-phase-underdetermined",
        "weak-emitter-refinement-drift",
        "weak-emitter-split-domain",
        "weak-emitter-benchmark-fit",
        "weak-emitter-not-computed",
      ],
    },
    rows: rows.map((row) => rowPacket(tier0, row, args)),
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const tier0Path = requireTier0Path(args);
  const tier0 = readJson(tier0Path);
  const output = run(tier0, tier0Path, args);
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
