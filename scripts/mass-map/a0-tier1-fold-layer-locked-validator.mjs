#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const LAYERS = ["I", "M", "O"];
const POLARITIES = ["+", "-"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const READY_STATUS = "ready_for_fold_layer_locked_one_period_attempt";
const DEFAULT_C_F = 1;
const DEFAULT_STATE_TOLERANCE = 0.02;
const DEFAULT_ROOT_TOLERANCE = 1e-6;
const DEFAULT_SPEED_TOLERANCE = 0.02;
const DEFAULT_CENTER_TOLERANCE = 0.02;
const DEFAULT_ENERGY_TOLERANCE = 0.02;
const ACCEPTED_HISTORY_BLOCKERS = [
  "status_is_accepted_history_segment",
  "residuals_below_tolerance",
  "no_secular_center_drift",
  "Delta_k_positive",
  "same_branch_persists_across_eta_ladder",
];

function parseArgs(argv) {
  const args = {
    intake: null,
    source: null,
    rows: "all",
    cF: DEFAULT_C_F,
    stateTolerance: DEFAULT_STATE_TOLERANCE,
    rootTolerance: DEFAULT_ROOT_TOLERANCE,
    speedTolerance: DEFAULT_SPEED_TOLERANCE,
    centerTolerance: DEFAULT_CENTER_TOLERANCE,
    energyTolerance: DEFAULT_ENERGY_TOLERANCE,
    pretty: false,
    out: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--intake") {
      args.intake = argv[++i];
    } else if (arg === "--source") {
      args.source = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--c-f") {
      args.cF = parsePositiveNumber(argv[++i], "--c-f");
    } else if (arg === "--state-tolerance") {
      args.stateTolerance = parsePositiveNumber(argv[++i], "--state-tolerance");
    } else if (arg === "--root-tolerance") {
      args.rootTolerance = parsePositiveNumber(argv[++i], "--root-tolerance");
    } else if (arg === "--speed-tolerance") {
      args.speedTolerance = parsePositiveNumber(argv[++i], "--speed-tolerance");
    } else if (arg === "--center-tolerance") {
      args.centerTolerance = parsePositiveNumber(argv[++i], "--center-tolerance");
    } else if (arg === "--energy-tolerance") {
      args.energyTolerance = parsePositiveNumber(argv[++i], "--energy-tolerance");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-fold-layer-locked-validator.mjs --intake PATH [options]

Options:
  --intake PATH             JSON from a0-tier1-one-period-continuation-prototype.mjs.
  --source PATH             Optional source JSON from a0-tier1-continuation-source-prototype.mjs.
  --rows VALUE              "all" or a comma-separated row list. Defaults to "all".
  --c-f N                   Field speed used for speed-ordering checks. Defaults to ${DEFAULT_C_F}.
  --state-tolerance N       Endpoint state-return tolerance. Defaults to ${DEFAULT_STATE_TOLERANCE}.
  --root-tolerance N        Root residual tolerance when source budget lacks one. Defaults to ${DEFAULT_ROOT_TOLERANCE}.
  --speed-tolerance N       Speed-ordering tolerance. Defaults to ${DEFAULT_SPEED_TOLERANCE}.
  --center-tolerance N      Center-gauge drift tolerance. Defaults to ${DEFAULT_CENTER_TOLERANCE}.
  --energy-tolerance N      Energy-like speed ledger tolerance. Defaults to ${DEFAULT_ENERGY_TOLERANCE}.
  --out PATH                Write JSON output to a file instead of stdout.
  --pretty                  Pretty-print JSON.
  --help                    Show this help.

This validator consumes a fold-layer-locked one-period intake and computes the
residual ledgers that are available from carried replay samples, source
diagnostics, and lock metadata. It is fail-closed: it does not manufacture a
direct regularized Tier 1 trajectory, quotient monodromy, or eta ladder.`);
}

function parsePositiveNumber(value, name) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) {
    throw new Error(`Expected ${name} to be a positive number, got: ${value}`);
  }
  return number;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function requireIntakePath(args) {
  if (!args.intake) {
    throw new Error("Missing required --intake PATH argument.");
  }
  return path.resolve(args.intake);
}

function rowsOf(artifact) {
  return Array.isArray(artifact?.rows) ? artifact.rows : [];
}

function rowMap(artifact) {
  return new Map(rowsOf(artifact).filter((row) => Number.isInteger(row.row)).map((row) => [row.row, row]));
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
      .filter((entry) => Number.isInteger(entry))
  );
  if (selected.size === 0) {
    throw new Error(`Unsupported --rows selector: ${selector}`);
  }
  return rows.filter((row) => selected.has(row.row));
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every((entry) => Number.isFinite(entry));
}

function add(a, b) {
  return a.map((value, index) => value + b[index]);
}

function sub(a, b) {
  return a.map((value, index) => value - b[index]);
}

function scale(a, factor) {
  return a.map((value) => value * factor);
}

function norm(vector) {
  return Math.hypot(...vector);
}

function speed(state) {
  return finiteVector3(state?.velocity) ? norm(state.velocity) : Number.NaN;
}

function mean(vectors) {
  if (vectors.length === 0) {
    return [0, 0, 0];
  }
  return scale(vectors.reduce((acc, vector) => add(acc, vector), [0, 0, 0]), 1 / vectors.length);
}

function canonicalSamples(row) {
  return [...(row.samples ?? [])]
    .filter((sample) => Number.isFinite(sample.t))
    .map((sample) => ({
      t: sample.t,
      bodies: Object.fromEntries(
        BODY_IDS.map((bodyId) => {
          const state = sample.bodies?.[bodyId] ?? {};
          return [
            bodyId,
            {
              position: finiteVector3(state.position) ? state.position.map(Number) : null,
              velocity: finiteVector3(state.velocity) ? state.velocity.map(Number) : null,
            },
          ];
        })
      ),
    }))
    .sort((a, b) => a.t - b.t);
}

function interpolateVector(a, b, alpha) {
  return a.map((value, index) => value + alpha * (b[index] - value));
}

function interpolateSample(samples, target) {
  if (samples.length === 0 || !Number.isFinite(target)) {
    return { status: "missing", sample: null, gap: null };
  }
  let nearest = samples[0];
  for (const sample of samples) {
    if (Math.abs(sample.t - target) < Math.abs(nearest.t - target)) {
      nearest = sample;
    }
  }
  if (nearest.t === target) {
    return { status: "exact", sample: nearest, gap: 0 };
  }
  for (let i = 0; i < samples.length - 1; i += 1) {
    const left = samples[i];
    const right = samples[i + 1];
    if (left.t <= target && target <= right.t && right.t > left.t) {
      const alpha = (target - left.t) / (right.t - left.t);
      const bodies = {};
      for (const bodyId of BODY_IDS) {
        const leftState = left.bodies[bodyId];
        const rightState = right.bodies[bodyId];
        bodies[bodyId] = {
          position:
            finiteVector3(leftState?.position) && finiteVector3(rightState?.position)
              ? interpolateVector(leftState.position, rightState.position, alpha)
              : null,
          velocity:
            finiteVector3(leftState?.velocity) && finiteVector3(rightState?.velocity)
              ? interpolateVector(leftState.velocity, rightState.velocity, alpha)
              : null,
        };
      }
      return { status: "interpolated", sample: { t: target, bodies }, gap: 0 };
    }
  }
  return {
    status: "outside_sample_window",
    sample: nearest,
    gap: Math.abs(nearest.t - target),
  };
}

function finiteSamplesInCycle(samples, period) {
  if (!Number.isFinite(period)) {
    return samples;
  }
  const tolerance = Math.max(Number.EPSILON, Math.abs(period) * Number.EPSILON * 16);
  return samples.filter((sample) => sample.t >= -tolerance && sample.t <= period + tolerance);
}

function scales(samples) {
  const positionNorms = [];
  const velocityNorms = [];
  for (const sample of samples) {
    for (const bodyId of BODY_IDS) {
      const state = sample.bodies[bodyId];
      if (finiteVector3(state?.position)) {
        positionNorms.push(norm(state.position));
      }
      if (finiteVector3(state?.velocity)) {
        velocityNorms.push(norm(state.velocity));
      }
    }
  }
  return {
    position: Math.max(1, ...positionNorms),
    velocity: Math.max(1, ...velocityNorms),
  };
}

function maxStateReturn(startSample, endSample, sampleScales) {
  let maxPosition = 0;
  let maxVelocity = 0;
  const missing = [];
  for (const bodyId of BODY_IDS) {
    const start = startSample?.bodies?.[bodyId];
    const end = endSample?.bodies?.[bodyId];
    if (!finiteVector3(start?.position) || !finiteVector3(start?.velocity)) {
      missing.push(`${bodyId}:start`);
      continue;
    }
    if (!finiteVector3(end?.position) || !finiteVector3(end?.velocity)) {
      missing.push(`${bodyId}:end`);
      continue;
    }
    maxPosition = Math.max(maxPosition, norm(sub(end.position, start.position)) / sampleScales.position);
    maxVelocity = Math.max(maxVelocity, norm(sub(end.velocity, start.velocity)) / sampleScales.velocity);
  }
  return {
    missing,
    max_position_return_residual: maxPosition,
    max_velocity_return_residual: maxVelocity,
    max_state_return_residual: Math.max(maxPosition, maxVelocity),
  };
}

function residualStatus(value, tolerance, unavailable = false) {
  if (unavailable || !Number.isFinite(value)) {
    return "not_computed";
  }
  return value <= tolerance ? "passed" : "failed";
}

function stateReturnLedger(row, samples, sampleScales, tolerance) {
  const period = row.period;
  const start = interpolateSample(samples, 0);
  const end = interpolateSample(samples, period);
  const values = maxStateReturn(start.sample, end.sample, sampleScales);
  const unavailable = !start.sample || !end.sample || values.missing.length > 0;
  return {
    schema: "a0-tier1-state-return-residual/v1",
    status: residualStatus(values.max_state_return_residual, tolerance, unavailable),
    data_source: "carried_replay_samples",
    acceptance_effect: false,
    period,
    tolerance,
    sample_selectors: {
      start_status: start.status,
      start_gap: start.gap,
      end_status: end.status,
      end_gap: end.gap,
    },
    ...values,
    reason:
      "Computed on carried replay samples. A passing value is a sample-consistency result, not a direct Tier 1 continuation acceptance predicate.",
  };
}

function layerAverageSpeeds(sample) {
  return Object.fromEntries(
    LAYERS.map((layer) => {
      const values = POLARITIES.map((polarity) => speed(sample.bodies[`${layer}${polarity}`])).filter(
        Number.isFinite
      );
      return [layer, values.length === 0 ? Number.NaN : values.reduce((sum, value) => sum + value, 0) / values.length];
    })
  );
}

function speedOrderingResidual(layerSpeeds, cF) {
  if (!LAYERS.every((layer) => Number.isFinite(layerSpeeds[layer]))) {
    return Number.NaN;
  }
  return Math.max(
    Math.max(0, (cF - layerSpeeds.I) / cF),
    Math.abs(layerSpeeds.M - cF) / cF,
    Math.max(0, (layerSpeeds.O - cF) / cF)
  );
}

function speedOrderingLedger(samples, cF, tolerance) {
  let maxResidual = 0;
  const examples = [];
  let evaluated = 0;
  for (const sample of samples) {
    const layerSpeeds = layerAverageSpeeds(sample);
    const residual = speedOrderingResidual(layerSpeeds, cF);
    if (!Number.isFinite(residual)) {
      continue;
    }
    evaluated += 1;
    maxResidual = Math.max(maxResidual, residual);
    if (residual > tolerance && examples.length < 10) {
      examples.push({ t: sample.t, speed_ordering_residual: residual, layer_speeds: layerSpeeds });
    }
  }
  return {
    schema: "a0-tier1-speed-ordering-residual/v1",
    status: residualStatus(maxResidual, tolerance, evaluated === 0),
    data_source: "carried_replay_samples",
    acceptance_effect: true,
    c_f: cF,
    tolerance,
    evaluated_sample_count: evaluated,
    max_speed_ordering_residual: maxResidual,
    examples,
  };
}

function centerOf(sample, field) {
  return mean(
    BODY_IDS.map((bodyId) => sample.bodies[bodyId]?.[field])
      .filter(finiteVector3)
      .map((vector) => vector.map(Number))
  );
}

function centerDriftLedger(samples, sampleScales, tolerance) {
  if (samples.length === 0) {
    return {
      schema: "a0-tier1-center-drift-residual/v1",
      status: "not_computed",
      data_source: "carried_replay_samples",
      acceptance_effect: false,
      tolerance,
      reason: "no finite samples available",
    };
  }
  const startPosition = centerOf(samples[0], "position");
  const startVelocity = centerOf(samples[0], "velocity");
  let maxCenterDrift = 0;
  const examples = [];
  for (const sample of samples) {
    const positionDrift = norm(sub(centerOf(sample, "position"), startPosition)) / sampleScales.position;
    const velocityDrift = norm(sub(centerOf(sample, "velocity"), startVelocity)) / sampleScales.velocity;
    const drift = Math.max(positionDrift, velocityDrift);
    maxCenterDrift = Math.max(maxCenterDrift, drift);
    if (drift > tolerance && examples.length < 10) {
      examples.push({ t: sample.t, center_drift: drift });
    }
  }
  return {
    schema: "a0-tier1-center-drift-residual/v1",
    status: residualStatus(maxCenterDrift, tolerance),
    data_source: "carried_replay_samples",
    acceptance_effect: false,
    tolerance,
    max_center_drift: maxCenterDrift,
    examples,
    reason:
      "Computed on carried replay samples. A passing value is not enough for no_secular_center_drift until a direct regularized continuation trajectory exists.",
  };
}

function meanSquaredSpeed(sample) {
  const values = BODY_IDS.map((bodyId) => speed(sample.bodies[bodyId])).filter(Number.isFinite);
  if (values.length === 0) {
    return Number.NaN;
  }
  return values.reduce((sum, value) => sum + value * value, 0) / values.length;
}

function energyLikeSpeedLedger(row, samples, tolerance) {
  const start = interpolateSample(samples, 0);
  const end = interpolateSample(samples, row.period);
  const startMean = start.sample ? meanSquaredSpeed(start.sample) : Number.NaN;
  const endMean = end.sample ? meanSquaredSpeed(end.sample) : Number.NaN;
  const residual =
    Number.isFinite(startMean) && Number.isFinite(endMean)
      ? Math.abs(endMean - startMean) / Math.max(Math.abs(startMean), Number.EPSILON)
      : Number.NaN;
  return {
    schema: "a0-tier1-energy-like-speed-residual/v1",
    status: residualStatus(residual, tolerance),
    data_source: "carried_replay_samples",
    acceptance_effect: false,
    tolerance,
    start_mean_squared_speed: Number.isFinite(startMean) ? startMean : null,
    end_mean_squared_speed: Number.isFinite(endMean) ? endMean : null,
    energy_like_speed_residual: Number.isFinite(residual) ? residual : null,
    reason:
      "This is an energy-like speed ledger on carried samples, not a Noether energy conservation check for an integrated Tier 1 trajectory.",
  };
}

function sourceResidualBudget(sourceRow, args) {
  const budget = sourceRow?.diagnostics?.residual_budget ?? null;
  if (!budget) {
    return {
      schema: "a0-tier1-root-residual-ledger/v1",
      status: "not_computed",
      data_source: "source_residual_budget_missing",
      acceptance_effect: false,
      tolerance: args.rootTolerance,
      reason:
        "The one-period intake does not carry root observation times or raw root residuals. Provide --source to import the carrier replay root residual budget.",
    };
  }
  const tolerance = budget.tolerances?.root ?? args.rootTolerance;
  const maxRootResidual = budget.maxima?.root_residual ?? null;
  const rootsOverTolerance = budget.counts?.roots_over_tolerance ?? null;
  return {
    schema: "a0-tier1-root-residual-ledger/v1",
    status:
      rootsOverTolerance === 0 && Number.isFinite(maxRootResidual) && maxRootResidual <= tolerance
        ? "passed"
        : "failed",
    data_source: "carrier_replay_residual_budget",
    acceptance_effect: false,
    tolerance,
    roots_evaluated: budget.counts?.roots_evaluated ?? null,
    roots_over_tolerance: rootsOverTolerance,
    max_root_residual: maxRootResidual,
    max_root_residual_over_tolerance: budget.maxima?.root_residual_over_tolerance ?? null,
    by_relation: budget.by_relation ?? null,
    reason:
      "Imported from carrier replay diagnostics. Passing root residuals are necessary evidence but not a direct Tier 1 continuation acceptance predicate.",
  };
}

function sourceStateReturnLedger(sourceRow, fallbackTolerance) {
  const budget = sourceRow?.diagnostics?.residual_budget ?? null;
  if (!budget) {
    return null;
  }
  const tolerance = budget.tolerances?.state_return ?? fallbackTolerance;
  const value = budget.maxima?.state_return_residual ?? null;
  const overTolerance = budget.counts?.samples_over_state_tolerance ?? null;
  return {
    schema: "a0-tier1-state-return-residual/v1",
    status: overTolerance === 0 && Number.isFinite(value) && value <= tolerance ? "passed" : "failed",
    data_source: "carrier_replay_residual_budget",
    acceptance_effect: false,
    tolerance,
    evaluated_sample_count: budget.sample_count ?? null,
    samples_over_state_tolerance: overTolerance,
    max_state_return_residual: value,
    reason:
      "Imported from exact carrier replay diagnostics. A passing value is sample-consistency evidence, not a direct Tier 1 continuation acceptance predicate.",
  };
}

function sourceSpeedOrderingLedger(sourceRow, fallbackTolerance) {
  const budget = sourceRow?.diagnostics?.residual_budget ?? null;
  if (!budget) {
    return null;
  }
  const tolerance = budget.tolerances?.speed ?? fallbackTolerance;
  const value = budget.maxima?.speed_ordering_residual ?? null;
  const overTolerance = budget.counts?.samples_over_speed_tolerance ?? null;
  return {
    schema: "a0-tier1-speed-ordering-residual/v1",
    status: overTolerance === 0 && Number.isFinite(value) && value <= tolerance ? "passed" : "failed",
    data_source: "carrier_replay_residual_budget",
    acceptance_effect: true,
    tolerance,
    evaluated_sample_count: budget.sample_count ?? null,
    samples_over_speed_tolerance: overTolerance,
    max_speed_ordering_residual: value,
  };
}

function sourceCenterDriftLedger(sourceRow, fallbackTolerance) {
  const budget = sourceRow?.diagnostics?.residual_budget ?? null;
  if (!budget) {
    return null;
  }
  const tolerance = budget.tolerances?.center_gauge ?? fallbackTolerance;
  const value = budget.maxima?.center_drift ?? null;
  const endpoint = budget.maxima?.center_endpoint_drift ?? null;
  const overTolerance = budget.counts?.samples_over_center_tolerance ?? null;
  return {
    schema: "a0-tier1-center-drift-residual/v1",
    status: overTolerance === 0 && Number.isFinite(value) && value <= tolerance ? "passed" : "failed",
    data_source: "carrier_replay_residual_budget",
    acceptance_effect: false,
    tolerance,
    samples_over_center_tolerance: overTolerance,
    max_center_drift: value,
    center_endpoint_drift: endpoint,
    reason:
      "Imported from carrier replay diagnostics. A passing value is not enough for no_secular_center_drift until a direct regularized continuation trajectory exists.",
  };
}

function notComputedEnergyLikeSpeedLedger(sourceRow) {
  const frozen = sourceRow?.diagnostics?.frozen_root_one_period_drift ?? null;
  return {
    schema: "a0-tier1-energy-like-speed-residual/v1",
    status: "not_computed",
    data_source: "direct_energy_ledger_missing",
    acceptance_effect: false,
    tolerance: null,
    energy_like_speed_residual: null,
    negative_control_speed_energy_drift: frozen?.maxima?.speed_energy_drift ?? null,
    reason:
      "No direct fold-layer-locked trajectory energy-like speed ledger or Noether energy ledger exists. The frozen-root speed-energy drift is retained only as a negative control.",
  };
}

function phaseClosureLedger() {
  return {
    schema: "a0-tier1-phase-closure-residual/v1",
    status: "not_computed",
    data_source: "phase_coordinate_series_missing",
    acceptance_effect: false,
    phase_closure_residual: null,
    reason:
      "The fold-layer-locked intake does not yet emit a phase-coordinate series or winding-error ledger for the macro-stride continuation.",
  };
}

function lockStabilityLedger(row) {
  const fold = row.branch_chart?.self_root_fold_splitting ?? null;
  const routing = row.branch_chart?.fold_layer_routing ?? null;
  const budget = row.one_period_step_budget ?? null;
  const locked = budget?.fold_layer_locked_integrator ?? null;
  const surplusKeys = Array.isArray(fold?.surplus_branch_keys) ? fold.surplus_branch_keys : [];
  const validations = [
    fold?.classification === "fold-layer",
    fold?.retained_initial_branches === true,
    fold?.all_surplus_keys_self_active === true,
    fold?.even_surplus_parity === true,
    fold?.polarity_pair_status?.paired_polarities === true,
    routing?.can_route_to_lock_ledger === true,
    budget?.can_attempt_with_current_cap === true,
    locked?.status === "direct-root-fold-layer-locked-integrator-seed-ready",
    Number.isFinite(locked?.planned_estimated_steps_for_one_period),
  ];
  const passed = validations.every(Boolean);
  return {
    schema: "a0-tier1-fold-layer-lock-stability-residual/v1",
    status: passed ? "passed" : "failed",
    data_source: "one_period_intake_branch_chart",
    acceptance_effect: true,
    classification: fold?.classification ?? null,
    surplus_branch_keys: surplusKeys,
    fold_layer_route: routing?.route ?? null,
    can_attempt_with_current_cap: budget?.can_attempt_with_current_cap ?? false,
    selected_step_budget_source: budget?.selected_step_budget_source ?? null,
    planned_estimated_steps_for_one_period: locked?.planned_estimated_steps_for_one_period ?? null,
    selected_macro_stride: locked?.selected_macro_stride ?? null,
    locked_event_count: locked?.locked_event_count ?? null,
    retained_direct_root_steps_per_event: locked?.retained_direct_root_steps_per_event ?? null,
    reason:
      "The lock ledger is an attempt-admissibility predicate. It does not replace one-period residual, monodromy, or eta-ladder validation.",
  };
}

function monodromyLedger(row) {
  return {
    schema: "a0-tier1-monodromy-validation/v1",
    status: "not_computed",
    data_source: "return_map_missing",
    acceptance_effect: false,
    operator: row.monodromy_setup?.operator ?? "P_eta_Lambda",
    Delta_k: null,
    Delta_k_positive: false,
    quotient_rule: row.monodromy_setup?.quotient_rule ?? null,
    reason:
      "The fold-layer-locked intake plans a return-map attempt but does not construct the finite-difference quotient monodromy.",
  };
}

function etaLadderLedger() {
  return {
    schema: "a0-tier1-eta-ladder-validation/v1",
    status: "not_computed",
    data_source: "eta_ladder_missing",
    acceptance_effect: false,
    same_branch_persists_across_eta_ladder: false,
    reason:
      "No eta-ladder continuation has been run from the fold-layer-locked macro-stride attempt.",
  };
}

function negativeControls(sourceRow) {
  const frozen = sourceRow?.diagnostics?.frozen_root_one_period_drift ?? null;
  if (!frozen) {
    return {
      frozen_root_one_period_drift: {
        status: "not_available",
        reason: "source artifact was not supplied or lacks the frozen-root one-period drift diagnostic",
      },
    };
  }
  return {
    frozen_root_one_period_drift: {
      status: frozen.status,
      warning_code: frozen.warning_code ?? null,
      dynamically_bounded: frozen.dynamically_bounded ?? false,
      endpoint_speed_ordering_residual: frozen.maxima?.endpoint_speed_ordering_residual ?? null,
      speed_energy_drift: frozen.maxima?.speed_energy_drift ?? null,
      max_normalized_position_drift: frozen.maxima?.max_normalized_position_drift ?? null,
      max_normalized_velocity_drift: frozen.maxima?.max_normalized_velocity_drift ?? null,
      reason:
        "This negative control confirms that replaying frozen roots is not a substitute for a fold-layer-locked direct continuation.",
    },
  };
}

function copiedValidation(row, ledgers) {
  return {
    status_is_accepted_history_segment: false,
    source_row_present: row.validation?.source_row_present === true,
    sample_count_at_least_two: row.validation?.sample_count_at_least_two === true,
    samples_ordered_by_t: row.validation?.samples_ordered_by_t === true,
    samples_cover_cycle: row.validation?.samples_cover_cycle === true,
    samples_cover_all_delayed_source_times: row.validation?.samples_cover_all_delayed_source_times === true,
    all_required_body_states_present: row.validation?.all_required_body_states_present === true,
    body_state_vectors_finite: row.validation?.body_state_vectors_finite === true,
    active_root_labels_valid: row.validation?.active_root_labels_valid === true,
    active_root_delays_finite_nonnegative: row.validation?.active_root_delays_finite_nonnegative === true,
    active_root_J_finite: row.validation?.active_root_J_finite === true,
    root_ledger_stable_under_refinement: row.validation?.root_ledger_stable_under_refinement === true,
    residuals_below_tolerance: false,
    speed_ordering_retained:
      row.validation?.speed_ordering_retained === true && ledgers.speed_ordering?.status === "passed",
    no_secular_center_drift: false,
    Delta_k_positive: false,
    same_branch_persists_across_eta_ladder: false,
    benchmark_inputs_excluded: row.validation?.benchmark_inputs_excluded === true,
    active_root_relations_present: row.validation?.active_root_relations_present ?? null,
    active_root_sources_cover_selected_layers:
      row.validation?.active_root_sources_cover_selected_layers ?? null,
  };
}

function rowStatus(row, ledgers) {
  if (row.status !== READY_STATUS) {
    return {
      status: "blocked_intake_not_ready",
      failure_code: "fold-layer-locked-intake-not-ready",
    };
  }
  if (ledgers.fold_layer_lock.status !== "passed") {
    return {
      status: "blocked_fold_layer_lock_validation_failed",
      failure_code: "fold-layer-lock-validation-failed",
    };
  }
  const localFailures = [
    ledgers.state_return,
    ledgers.root_closure,
    ledgers.speed_ordering,
    ledgers.center_drift,
    ledgers.energy_like_speed,
    ledgers.fold_layer_lock,
  ].filter((ledger) => ledger.status === "failed");
  if (localFailures.length > 0) {
    return {
      status: "blocked_local_residual_validation_failed",
      failure_code: "fold-layer-local-residual-validation-failed",
    };
  }
  return {
    status: "blocked_direct_one_period_integrator_not_run",
    failure_code: "direct-regularized-one-period-integrator-not-run",
  };
}

function validationRow(row, sourceRow, args) {
  const samples = canonicalSamples(row);
  const cycleSamples = finiteSamplesInCycle(samples, row.period);
  const sampleScales = scales(samples);
  const sourceBudget = sourceRow?.diagnostics?.residual_budget ?? null;
  const tolerances = {
    state_return: sourceBudget?.tolerances?.state_return ?? args.stateTolerance,
    root: sourceBudget?.tolerances?.root ?? args.rootTolerance,
    speed: sourceBudget?.tolerances?.speed ?? args.speedTolerance,
    center_gauge: sourceBudget?.tolerances?.center_gauge ?? args.centerTolerance,
    energy_like_speed: args.energyTolerance,
  };
  const ledgers = {
    state_return:
      sourceStateReturnLedger(sourceRow, tolerances.state_return) ??
      stateReturnLedger(row, samples, sampleScales, tolerances.state_return),
    root_closure: sourceResidualBudget(sourceRow, args),
    phase_closure: phaseClosureLedger(),
    speed_ordering:
      sourceSpeedOrderingLedger(sourceRow, tolerances.speed) ??
      speedOrderingLedger(cycleSamples, args.cF, tolerances.speed),
    center_drift:
      sourceCenterDriftLedger(sourceRow, tolerances.center_gauge) ??
      centerDriftLedger(cycleSamples, sampleScales, tolerances.center_gauge),
    energy_like_speed: sourceRow
      ? notComputedEnergyLikeSpeedLedger(sourceRow)
      : energyLikeSpeedLedger(row, samples, tolerances.energy_like_speed),
    fold_layer_lock: lockStabilityLedger(row),
    monodromy: monodromyLedger(row),
    eta_ladder: etaLadderLedger(),
  };
  const status = rowStatus(row, ledgers);
  const validation = copiedValidation(row, ledgers);
  return {
    row: row.row,
    schema: "a0-tier1-fold-layer-locked-continuation-validation-row/v1",
    schema_status: "provisional",
    status: status.status,
    failure_code: status.failure_code,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    period: row.period ?? null,
    source_row: row.source_row ?? null,
    selected_weak_tier_layers: row.selected_weak_tier_layers ?? ["I", "M", "O"],
    samples: row.samples ?? [],
    active_causal_root_ledger: row.active_causal_root_ledger ?? [],
    one_period_step_budget: row.one_period_step_budget ?? null,
    residual_ledgers: ledgers,
    negative_controls: negativeControls(sourceRow),
    validation,
    accepted_history_boundary: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      blocked_fields: ACCEPTED_HISTORY_BLOCKERS,
      additional_uncomputed_fields: [
        "direct_regularized_one_period_trajectory",
        "phase_closure_residual",
        "quotient_monodromy_operator",
        "eta_ladder_continuation",
      ],
      reason:
        "This validator records available residual evidence and blockers. It does not emit accepted-history rows because the direct fold-layer-locked one-period trajectory, quotient monodromy, and eta ladder are absent.",
    },
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to produce this validation row.",
  };
}

function statusCounts(rows) {
  const counts = {};
  for (const row of rows) {
    counts[row.status] = (counts[row.status] ?? 0) + 1;
  }
  return counts;
}

function run(intake, intakePath, source, sourcePath, args) {
  const selected = selectRows(intake, args.rows);
  const sourcesByRow = rowMap(source);
  const rows = selected.map((row) => validationRow(row, sourcesByRow.get(row.row) ?? null, args));
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-continuation-validation/v1",
    metadata: {
      artifact: "a0-tier1-fold-layer-locked-validator",
      schema_status: "provisional",
      status: rows.every((row) => row.status === "blocked_direct_one_period_integrator_not_run")
        ? "blocked_direct_one_period_integrator_not_run"
        : "blocked",
      generatedAt: new Date().toISOString(),
      sourceIntake: path.relative(process.cwd(), intakePath),
      sourceContinuation: sourcePath ? path.relative(process.cwd(), sourcePath) : null,
      rowSelector: args.rows,
      note:
        "Computes fold-layer-locked residual ledgers available from the intake and carrier-replay source, then blocks accepted history until a direct regularized one-period trajectory, monodromy, and eta ladder exist.",
    },
    source_intake_metadata: intake.metadata ?? null,
    source_continuation_metadata: source?.metadata ?? null,
    selected_row_count: rows.length,
    summary: {
      status_counts: statusCounts(rows),
      accepted_history_row_count: rows.filter((row) => row.status === "accepted_history_segment").length,
      direct_integrator_present: false,
      Delta_k_computed: false,
      eta_ladder_computed: false,
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
  const sourcePath = args.source ? path.resolve(args.source) : null;
  const intake = readJson(intakePath);
  const source = sourcePath ? readJson(sourcePath) : null;
  const output = run(intake, intakePath, source, sourcePath, args);
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
