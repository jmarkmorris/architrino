#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const LAYERS = ["I", "M", "O"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const POLARITIES = ["+", "-"];
const READY_STATUS = "ready_for_fold_layer_locked_one_period_attempt";
const DEFAULT_C_F = 1;
const DEFAULT_STEP_CAP = 1_000_000;
const DEFAULT_SAMPLE_COUNT = 320;
const DEFAULT_J_MIN = 1e-6;
const DEFAULT_ETA = 1e-6;
const DEFAULT_MAX_ABS_STATE = 1e9;
const DEFAULT_MAX_SPEED = 1e6;
const DEFAULT_STATE_TOLERANCE = 0.02;
const DEFAULT_ROOT_TOLERANCE = 1e-6;
const DEFAULT_PHASE_TOLERANCE = 0.02;
const DEFAULT_SPEED_TOLERANCE = 0.02;
const DEFAULT_CENTER_TOLERANCE = 0.02;
const DEFAULT_ENERGY_TOLERANCE = 0.02;
const DEFAULT_BALANCE_TOLERANCE = 0.02;
const DEFAULT_BALANCE_RIDGE = 1e-12;
const COMPONENTS_PER_BODY = 6;
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
    stepCap: DEFAULT_STEP_CAP,
    sampleCount: DEFAULT_SAMPLE_COUNT,
    cF: DEFAULT_C_F,
    eta: null,
    jMin: DEFAULT_J_MIN,
    maxAbsState: DEFAULT_MAX_ABS_STATE,
    maxSpeed: DEFAULT_MAX_SPEED,
    stateTolerance: DEFAULT_STATE_TOLERANCE,
    rootTolerance: DEFAULT_ROOT_TOLERANCE,
    phaseTolerance: DEFAULT_PHASE_TOLERANCE,
    speedTolerance: DEFAULT_SPEED_TOLERANCE,
    centerTolerance: DEFAULT_CENTER_TOLERANCE,
    energyTolerance: DEFAULT_ENERGY_TOLERANCE,
    balanceTolerance: DEFAULT_BALANCE_TOLERANCE,
    balanceRidge: DEFAULT_BALANCE_RIDGE,
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
    } else if (arg === "--step-cap") {
      args.stepCap = parsePositiveInteger(argv[++i], "--step-cap");
    } else if (arg === "--sample-count") {
      args.sampleCount = parsePositiveInteger(argv[++i], "--sample-count");
    } else if (arg === "--c-f") {
      args.cF = parsePositiveNumber(argv[++i], "--c-f");
    } else if (arg === "--eta") {
      args.eta = parsePositiveNumber(argv[++i], "--eta");
    } else if (arg === "--j-min") {
      args.jMin = parsePositiveNumber(argv[++i], "--j-min");
    } else if (arg === "--max-abs-state") {
      args.maxAbsState = parsePositiveNumber(argv[++i], "--max-abs-state");
    } else if (arg === "--max-speed") {
      args.maxSpeed = parsePositiveNumber(argv[++i], "--max-speed");
    } else if (arg === "--state-tolerance") {
      args.stateTolerance = parsePositiveNumber(argv[++i], "--state-tolerance");
    } else if (arg === "--root-tolerance") {
      args.rootTolerance = parsePositiveNumber(argv[++i], "--root-tolerance");
    } else if (arg === "--phase-tolerance") {
      args.phaseTolerance = parsePositiveNumber(argv[++i], "--phase-tolerance");
    } else if (arg === "--speed-tolerance") {
      args.speedTolerance = parsePositiveNumber(argv[++i], "--speed-tolerance");
    } else if (arg === "--center-tolerance") {
      args.centerTolerance = parsePositiveNumber(argv[++i], "--center-tolerance");
    } else if (arg === "--energy-tolerance") {
      args.energyTolerance = parsePositiveNumber(argv[++i], "--energy-tolerance");
    } else if (arg === "--balance-tolerance") {
      args.balanceTolerance = parsePositiveNumber(argv[++i], "--balance-tolerance");
    } else if (arg === "--balance-ridge") {
      args.balanceRidge = parsePositiveNumber(argv[++i], "--balance-ridge");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-fold-layer-locked-one-period-attempt.mjs --intake PATH [options]

Options:
  --intake PATH          JSON from a0-tier1-one-period-continuation-prototype.mjs.
  --source PATH          Optional continuation-source prototype JSON for source-row identity.
  --rows VALUE           "all" or a comma-separated row list. Defaults to "all".
  --step-cap N           Maximum direct trajectory steps. Defaults to ${DEFAULT_STEP_CAP}.
  --sample-count N       Downsampled output trajectory samples on [0,T]. Defaults to ${DEFAULT_SAMPLE_COUNT}.
  --eta N                Regularization eta. Defaults to carried estimate or ${DEFAULT_ETA}.
  --j-min N              Minimum |J| denominator. Defaults to ${DEFAULT_J_MIN}.
  --c-f N                Field-speed scale. Defaults to ${DEFAULT_C_F}.
  --max-abs-state N      Abort if any position or velocity component exceeds this absolute value.
  --max-speed N          Abort if any body speed exceeds this value.
  --balance-tolerance N  Relative residual tolerance for scalar relation-weight balance.
  --balance-ridge N      Ridge term for the relation-weight normal equation.
  --out PATH             Write JSON output to a file instead of stdout.
  --pretty               Pretty-print JSON.
  --help                 Show this help.

This is a fail-closed diagnostic one-period attempt. It integrates the declared
fold-layer-locked root-weighted map, emits residual ledgers, and still blocks
accepted-history output unless direct residual closure, monodromy, and eta
ladder evidence all pass.`);
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

function bodyIndex(bodyId) {
  return BODY_IDS.indexOf(bodyId);
}

function bodyLayer(bodyId) {
  return bodyId.slice(0, 1);
}

function bodyPolarity(bodyId) {
  return bodyId.slice(1);
}

function bodyCharge(bodyId) {
  return bodyPolarity(bodyId) === "+" ? 1 : -1;
}

function relationWeight(relation) {
  return {
    self: 0.5,
    partner: 0.75,
    inter_layer: 1,
  }[relation] ?? 0.5;
}

function finiteVector3(value) {
  return Array.isArray(value) && value.length === 3 && value.every((entry) => Number.isFinite(entry));
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

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function norm(a) {
  return Math.sqrt(dot(a, a));
}

function canonicalSamples(row) {
  return [...(row.samples ?? row.history ?? [])]
    .filter((sample) => Number.isFinite(sample.t ?? sample.time))
    .map((sample) => ({
      t: Number.isFinite(sample.t) ? sample.t : sample.time,
      bodies: Object.fromEntries(
        BODY_IDS.map((bodyId) => {
          const state = sample.bodies?.[bodyId] ?? sample.state?.[bodyId] ?? sample.states?.[bodyId] ?? {};
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

function canonicalRoots(row) {
  const roots =
    row.active_causal_root_ledger ??
    row.active_roots ??
    row.root_ledger?.active_roots ??
    row.root_ledger?.roots ??
    [];
  return Array.isArray(roots)
    ? roots
        .map((root) => ({
          receiver: root.receiver ?? null,
          source: root.source ?? null,
          relation: root.relation ?? null,
          status: root.status ?? null,
          t: Number(root.t ?? root.time ?? 0),
          delay: Number(root.delay ?? root.tau ?? root.root_delay),
          J: Number(root.J),
        }))
        .filter(
          (root) =>
            BODY_IDS.includes(root.receiver) &&
            BODY_IDS.includes(root.source) &&
            ROOT_RELATIONS.includes(root.relation) &&
            root.status === "active" &&
            Number.isFinite(root.t) &&
            Number.isFinite(root.delay) &&
            root.delay >= 0 &&
            Number.isFinite(root.J)
        )
    : [];
}

function rootKey(root) {
  return `${root.receiver}|${root.source}|${root.relation}|${root.status}`;
}

function sourceRowFor(row, sourceRow) {
  const sourceObject =
    sourceRow?.source_row && typeof sourceRow.source_row === "object" ? sourceRow.source_row : null;
  return {
    branch_label: sourceRow?.branch_label ?? sourceObject?.branch_label ?? row.source_row?.branch_label ?? null,
    z_lambda: sourceRow?.z_lambda ?? sourceObject?.z_lambda ?? row.source_row?.z_lambda ?? null,
  };
}

function layerWindings(row, sourceRow) {
  const sourceObject =
    sourceRow?.source_row && typeof sourceRow.source_row === "object" ? sourceRow.source_row : null;
  return (
    sourceRow?.branch_label?.k ??
    sourceObject?.branch_label?.k ??
    sourceRow?.closure_labels?.k ??
    sourceRow?.z_lambda?.branch_class?.windings ??
    sourceObject?.z_lambda?.branch_class?.windings ??
    row.branch_label?.k ??
    row.closure_labels?.k ??
    null
  );
}

function layerHandedness(row, sourceRow) {
  const sourceObject =
    sourceRow?.source_row && typeof sourceRow.source_row === "object" ? sourceRow.source_row : null;
  const source =
    sourceRow?.branch_label?.handedness ??
    sourceObject?.branch_label?.handedness ??
    sourceRow?.z_lambda?.handedness ??
    sourceObject?.z_lambda?.handedness ??
    row.branch_label?.handedness;
  return Object.fromEntries(LAYERS.map((layer) => [layer, Number.isFinite(source?.[layer]) ? source[layer] : 1]));
}

function planeFor(layer) {
  if (layer === "I") {
    return { e1: [1, 0, 0], e2: [0, 1, 0] };
  }
  if (layer === "M") {
    return { e1: [0, 1, 0], e2: [0, 0, 1] };
  }
  return { e1: [1, 0, 0], e2: [0, 0, 1] };
}

function interpolateVector(left, right, alpha) {
  return [
    left[0] + alpha * (right[0] - left[0]),
    left[1] + alpha * (right[1] - left[1]),
    left[2] + alpha * (right[2] - left[2]),
  ];
}

function interpolateSample(samples, target) {
  if (samples.length === 0 || !Number.isFinite(target)) {
    return null;
  }
  if (target <= samples[0].t) {
    return samples[0];
  }
  const last = samples[samples.length - 1];
  if (target >= last.t) {
    return last;
  }
  let lo = 0;
  let hi = samples.length - 1;
  while (hi - lo > 1) {
    const mid = Math.floor((lo + hi) / 2);
    if (samples[mid].t <= target) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  const left = samples[lo];
  const right = samples[hi];
  const alpha = right.t > left.t ? (target - left.t) / (right.t - left.t) : 0;
  return {
    t: target,
    bodies: Object.fromEntries(
      BODY_IDS.map((bodyId) => {
        const leftState = left.bodies[bodyId];
        const rightState = right.bodies[bodyId];
        return [
          bodyId,
          {
            position:
              finiteVector3(leftState?.position) && finiteVector3(rightState?.position)
                ? interpolateVector(leftState.position, rightState.position, alpha)
                : null,
            velocity:
              finiteVector3(leftState?.velocity) && finiteVector3(rightState?.velocity)
                ? interpolateVector(leftState.velocity, rightState.velocity, alpha)
                : null,
          },
        ];
      })
    ),
  };
}

function writeStateToArray(array, step, states) {
  const base = step * BODY_IDS.length * COMPONENTS_PER_BODY;
  for (let bodyIndexValue = 0; bodyIndexValue < BODY_IDS.length; bodyIndexValue += 1) {
    const state = states[BODY_IDS[bodyIndexValue]];
    const offset = base + bodyIndexValue * COMPONENTS_PER_BODY;
    array[offset + 0] = state.position[0];
    array[offset + 1] = state.position[1];
    array[offset + 2] = state.position[2];
    array[offset + 3] = state.velocity[0];
    array[offset + 4] = state.velocity[1];
    array[offset + 5] = state.velocity[2];
  }
}

function readStateFromArray(array, step, bodyId) {
  const index = bodyIndex(bodyId);
  const offset = step * BODY_IDS.length * COMPONENTS_PER_BODY + index * COMPONENTS_PER_BODY;
  return {
    position: [array[offset + 0], array[offset + 1], array[offset + 2]],
    velocity: [array[offset + 3], array[offset + 4], array[offset + 5]],
  };
}

function stateFromSample(sample, bodyId) {
  const state = sample?.bodies?.[bodyId];
  if (!finiteVector3(state?.position) || !finiteVector3(state?.velocity)) {
    return null;
  }
  return {
    position: state.position.map(Number),
    velocity: state.velocity.map(Number),
  };
}

function historyStateAt({ array, dt, currentStep, prehistorySamples }, t, bodyId) {
  if (t >= 0 && currentStep > 0) {
    const raw = t / dt;
    const left = Math.max(0, Math.min(currentStep, Math.floor(raw)));
    const right = Math.max(0, Math.min(currentStep, Math.ceil(raw)));
    if (left === right) {
      return readStateFromArray(array, left, bodyId);
    }
    const alpha = raw - left;
    const leftState = readStateFromArray(array, left, bodyId);
    const rightState = readStateFromArray(array, right, bodyId);
    return {
      position: interpolateVector(leftState.position, rightState.position, alpha),
      velocity: interpolateVector(leftState.velocity, rightState.velocity, alpha),
    };
  }
  return stateFromSample(interpolateSample(prehistorySamples, t), bodyId);
}

function sampleFromArray(array, step, t) {
  return {
    t,
    bodies: Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, readStateFromArray(array, step, bodyId)])),
  };
}

function finiteStateSample(sample) {
  return BODY_IDS.every(
    (bodyId) => finiteVector3(sample.bodies?.[bodyId]?.position) && finiteVector3(sample.bodies?.[bodyId]?.velocity)
  );
}

function initialStates(samples) {
  const sample = interpolateSample(samples, 0);
  if (!sample || !finiteStateSample(sample)) {
    return null;
  }
  return Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, stateFromSample(sample, bodyId)]));
}

function groupRootsByObservationTime(roots, period) {
  const byKey = new Map();
  for (const root of roots) {
    const phaseTime = modulo(root.t, period);
    const key = phaseTime.toPrecision(12);
    if (!byKey.has(key)) {
      byKey.set(key, { t: phaseTime, roots: [] });
    }
    byKey.get(key).roots.push(root);
  }
  return [...byKey.values()].sort((a, b) => a.t - b.t);
}

function nearestRootBucket(buckets, t, period) {
  if (buckets.length === 0) {
    return { t: null, roots: [] };
  }
  const phaseTime = modulo(t, period);
  let best = buckets[0];
  let bestDistance = circularDistance(phaseTime, best.t, period);
  for (let i = 1; i < buckets.length; i += 1) {
    const distance = circularDistance(phaseTime, buckets[i].t, period);
    if (distance < bestDistance) {
      best = buckets[i];
      bestDistance = distance;
    }
  }
  return best;
}

function modulo(value, modulus) {
  if (!Number.isFinite(modulus) || modulus <= 0) {
    return value;
  }
  return ((value % modulus) + modulus) % modulus;
}

function circularDistance(a, b, period) {
  const raw = Math.abs(a - b);
  return Math.min(raw, Math.abs(period - raw));
}

function resolveEta(row, sourceRow, args) {
  const lockedDelay = firstLockedDelay(row);
  return (
    args.eta ??
    sourceRow?.diagnostics?.one_step_dynamics?.regularization_eta ??
    sourceRow?.diagnostics?.direct_root_fold_layer_locked_integrator_seed?.regularization_eta ??
    (Number.isFinite(lockedDelay) ? Math.max(DEFAULT_ETA, lockedDelay / 2) : DEFAULT_ETA)
  );
}

function firstLockedDelay(row) {
  const packets = row.branch_chart?.self_root_fold_splitting?.local_bracket_packets ?? [];
  for (const packet of packets) {
    const delay = packet.new_roots?.[0]?.delay;
    if (Number.isFinite(delay) && delay > 0) {
      return delay;
    }
  }
  return null;
}

function plannedSteps(row) {
  return (
    row.trajectory_target?.macro_stride_plan?.retained_direct_root_step_count ??
    row.one_period_step_budget?.best_bounded_entry?.retained_direct_root_step_count ??
    row.one_period_step_budget?.estimated_steps_for_one_period ??
    null
  );
}

function speedOfState(state) {
  return norm(state.velocity);
}

function layerAverageSpeedsFromSample(sample) {
  return Object.fromEntries(
    LAYERS.map((layer) => {
      const speeds = POLARITIES.map((polarity) => speedOfState(sample.bodies[`${layer}${polarity}`])).filter(
        Number.isFinite
      );
      return [layer, speeds.length ? speeds.reduce((sum, value) => sum + value, 0) / speeds.length : Number.NaN];
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

function meanVector(vectors) {
  if (vectors.length === 0) {
    return [0, 0, 0];
  }
  return scale(
    vectors.reduce((acc, vector) => add(acc, vector), [0, 0, 0]),
    1 / vectors.length
  );
}

function centerOf(sample, field) {
  return meanVector(BODY_IDS.map((bodyId) => sample.bodies[bodyId]?.[field]).filter(finiteVector3));
}

function meanSquaredSpeed(sample) {
  const speeds = BODY_IDS.map((bodyId) => speedOfState(sample.bodies[bodyId])).filter(Number.isFinite);
  return speeds.length ? speeds.reduce((sum, value) => sum + value * value, 0) / speeds.length : Number.NaN;
}

function computeAccelerations(context, t, currentStep, currentSample) {
  const {
    rootsByTime,
    period,
    lockedKeys,
    array,
    dt,
    prehistorySamples,
    eta,
    jMin,
    cF,
  } = context;
  const accelerations = Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, [0, 0, 0]]));
  const bucket = nearestRootBucket(rootsByTime, t, period);
  let evaluatedRootCount = 0;
  let lockedRootCount = 0;
  let invalidRootCount = 0;
  let maxAcceleration = 0;
  for (const root of bucket.roots) {
    if (lockedKeys.has(rootKey(root))) {
      lockedRootCount += 1;
      continue;
    }
    const receiverState = currentSample.bodies[root.receiver];
    const sourceState = historyStateAt(
      { array, dt, currentStep, prehistorySamples },
      t - root.delay,
      root.source
    );
    if (!receiverState || !sourceState) {
      invalidRootCount += 1;
      continue;
    }
    const sourceToReceiver = sub(sourceState.position, receiverState.position);
    const regularizedDistanceSquared = dot(sourceToReceiver, sourceToReceiver) + eta * eta;
    const denominator =
      regularizedDistanceSquared *
      Math.sqrt(regularizedDistanceSquared) *
      Math.max(Math.abs(root.J), jMin);
    if (!Number.isFinite(denominator) || denominator <= 0) {
      invalidRootCount += 1;
      continue;
    }
    const coefficient =
      (relationWeight(root.relation) * bodyCharge(root.receiver) * bodyCharge(root.source)) / denominator;
    const contribution = scale(sourceToReceiver, coefficient);
    const acceleration = accelerations[root.receiver];
    acceleration[0] += contribution[0];
    acceleration[1] += contribution[1];
    acceleration[2] += contribution[2];
    evaluatedRootCount += 1;
  }
  for (const bodyId of BODY_IDS) {
    maxAcceleration = Math.max(maxAcceleration, norm(accelerations[bodyId]));
  }
  return {
    accelerations,
    bucket_time: bucket.t,
    evaluatedRootCount,
    lockedRootCount,
    invalidRootCount,
    maxAcceleration,
  };
}

function exceedsGuard(sample, args) {
  let maxAbsState = 0;
  let maxSpeed = 0;
  for (const bodyId of BODY_IDS) {
    const state = sample.bodies[bodyId];
    if (!finiteVector3(state?.position) || !finiteVector3(state?.velocity)) {
      return { exceeded: true, reason: "nonfinite-state", maxAbsState: null, maxSpeed: null };
    }
    for (const value of [...state.position, ...state.velocity]) {
      maxAbsState = Math.max(maxAbsState, Math.abs(value));
    }
    maxSpeed = Math.max(maxSpeed, speedOfState(state));
  }
  return {
    exceeded: maxAbsState > args.maxAbsState || maxSpeed > args.maxSpeed,
    reason: maxAbsState > args.maxAbsState ? "state-guard-exceeded" : maxSpeed > args.maxSpeed ? "speed-guard-exceeded" : null,
    maxAbsState,
    maxSpeed,
  };
}

function integrateTrajectory(row, sourceRow, args) {
  const period = row.period;
  const samples = canonicalSamples(row);
  const sourceRoots = canonicalRoots(sourceRow ?? {});
  const roots = sourceRoots.length > 0 ? sourceRoots : canonicalRoots(row);
  const lockedKeys = new Set(row.trajectory_target?.branch_chart_assumptions?.locked_self_root_keys ?? []);
  const stepPlan = plannedSteps(row);
  if (row.status !== READY_STATUS) {
    return {
      status: "blocked_intake_not_ready",
      failure_code: "fold-layer-locked-intake-not-ready",
      samples: [],
      roots,
      diagnostics: { planned_steps: stepPlan },
    };
  }
  if (!Number.isFinite(period) || period <= 0) {
    return {
      status: "blocked_period_missing",
      failure_code: "one-period-period-missing",
      samples: [],
      roots,
      diagnostics: { planned_steps: stepPlan },
    };
  }
  if (!Number.isFinite(stepPlan) || stepPlan <= 0) {
    return {
      status: "blocked_step_plan_missing",
      failure_code: "one-period-step-plan-missing",
      samples: [],
      roots,
      diagnostics: { planned_steps: stepPlan },
    };
  }
  if (stepPlan > args.stepCap) {
    return {
      status: "blocked_step_cap_exceeded",
      failure_code: "one-period-step-plan-exceeds-cap",
      samples: [],
      roots,
      diagnostics: { planned_steps: stepPlan, step_cap: args.stepCap },
    };
  }
  const initial = initialStates(samples);
  if (!initial) {
    return {
      status: "blocked_initial_state_missing",
      failure_code: "one-period-initial-state-missing",
      samples: [],
      roots,
      diagnostics: { planned_steps: stepPlan, step_cap: args.stepCap },
    };
  }
  if (roots.length === 0) {
    return {
      status: "blocked_active_roots_missing",
      failure_code: "one-period-active-root-ledger-missing",
      samples: [],
      roots,
      diagnostics: { planned_steps: stepPlan, step_cap: args.stepCap },
    };
  }
  const stepCount = stepPlan;
  const dt = period / stepCount;
  const states = new Float64Array((stepCount + 1) * BODY_IDS.length * COMPONENTS_PER_BODY);
  writeStateToArray(states, 0, initial);
  const rootsByTime = groupRootsByObservationTime(roots, period);
  const eta = resolveEta(row, sourceRow, args);
  const context = {
    rootsByTime,
    period,
    lockedKeys,
    array: states,
    dt,
    prehistorySamples: samples,
    eta,
    jMin: args.jMin,
    cF: args.cF,
  };
  const sampleSteps = outputSampleSteps(stepCount, args.sampleCount);
  const outputSamples = [];
  const initialPrehistory = samples.filter((sample) => sample.t < 0);
  for (const sample of initialPrehistory) {
    outputSamples.push(sample);
  }
  outputSamples.push(sampleFromArray(states, 0, 0));
  let nextSampleStepIndex = 1;
  let abort = null;
  let maxAcceleration = 0;
  let maxStepSpeed = 0;
  let maxAbsState = 0;
  let evaluatedRootContributions = 0;
  let lockedRootContributions = 0;
  let invalidRootContributions = 0;

  for (let step = 0; step < stepCount; step += 1) {
    const t = step * dt;
    const currentSample = sampleFromArray(states, step, t);
    const acceleration = computeAccelerations(context, t, step, currentSample);
    evaluatedRootContributions += acceleration.evaluatedRootCount;
    lockedRootContributions += acceleration.lockedRootCount;
    invalidRootContributions += acceleration.invalidRootCount;
    maxAcceleration = Math.max(maxAcceleration, acceleration.maxAcceleration);
    const nextStates = {};
    for (const bodyId of BODY_IDS) {
      const current = currentSample.bodies[bodyId];
      const a = acceleration.accelerations[bodyId];
      const velocity = add(current.velocity, scale(a, dt));
      const position = add(current.position, scale(velocity, dt));
      nextStates[bodyId] = { position, velocity };
    }
    writeStateToArray(states, step + 1, nextStates);
    const guard = exceedsGuard(sampleFromArray(states, step + 1, (step + 1) * dt), args);
    maxStepSpeed = Math.max(maxStepSpeed, guard.maxSpeed ?? 0);
    maxAbsState = Math.max(maxAbsState, guard.maxAbsState ?? 0);
    if (guard.exceeded) {
      abort = {
        step: step + 1,
        t: (step + 1) * dt,
        reason: guard.reason,
        max_abs_state: guard.maxAbsState,
        max_speed: guard.maxSpeed,
      };
      break;
    }
    while (nextSampleStepIndex < sampleSteps.length && sampleSteps[nextSampleStepIndex] <= step + 1) {
      const sampleStep = sampleSteps[nextSampleStepIndex];
      outputSamples.push(sampleFromArray(states, sampleStep, sampleStep * dt));
      nextSampleStepIndex += 1;
    }
  }

  const completedStep = abort ? abort.step : stepCount;
  const outputTimeTolerance = Math.max(Number.EPSILON, Math.abs(period) * Number.EPSILON * 16);
  if (!abort && Math.abs((outputSamples[outputSamples.length - 1]?.t ?? Number.NaN) - period) > outputTimeTolerance) {
    outputSamples.push(sampleFromArray(states, stepCount, period));
  }

  return {
    status: abort ? "failed_direct_one_period_trajectory" : "direct_one_period_trajectory_computed",
    failure_code: abort ? abort.reason : null,
    samples: outputSamples,
    roots,
    states,
    dt,
    completedStep,
    diagnostics: {
      planned_steps: stepPlan,
      completed_steps: completedStep,
      step_cap: args.stepCap,
      period,
      dt,
      eta,
      j_min: args.jMin,
      root_bucket_count: rootsByTime.length,
      locked_self_root_keys: [...lockedKeys],
      evaluated_root_contributions: evaluatedRootContributions,
      locked_root_contributions: lockedRootContributions,
      invalid_root_contributions: invalidRootContributions,
      max_acceleration: maxAcceleration,
      max_speed: maxStepSpeed,
      max_abs_state: maxAbsState,
      abort,
    },
  };
}

function outputSampleSteps(stepCount, sampleCount) {
  const steps = new Set([0, stepCount]);
  const count = Math.max(2, sampleCount);
  for (let i = 0; i < count; i += 1) {
    steps.add(Math.round((stepCount * i) / (count - 1)));
  }
  return [...steps].sort((a, b) => a - b);
}

function sampleAtOrNull(samples, target) {
  const sample = interpolateSample(samples, target);
  return sample && finiteStateSample(sample) ? sample : null;
}

function positionScale(samples) {
  let maxPosition = 1;
  let maxVelocity = 1;
  for (const sample of samples) {
    for (const bodyId of BODY_IDS) {
      const state = sample.bodies[bodyId];
      if (finiteVector3(state?.position)) {
        maxPosition = Math.max(maxPosition, norm(state.position));
      }
      if (finiteVector3(state?.velocity)) {
        maxVelocity = Math.max(maxVelocity, norm(state.velocity));
      }
    }
  }
  return { position: maxPosition, velocity: maxVelocity };
}

function stateReturnLedger(samples, period, tolerance) {
  const scales = positionScale(samples);
  const start = sampleAtOrNull(samples, 0);
  const end = sampleAtOrNull(samples, period);
  if (!start || !end) {
    return {
      schema: "a0-tier1-direct-state-return-residual/v1",
      status: "not_computed",
      tolerance,
      reason: "start or end trajectory sample missing",
    };
  }
  let maxPosition = 0;
  let maxVelocity = 0;
  for (const bodyId of BODY_IDS) {
    const startState = start.bodies[bodyId];
    const endState = end.bodies[bodyId];
    maxPosition = Math.max(maxPosition, norm(sub(endState.position, startState.position)) / scales.position);
    maxVelocity = Math.max(maxVelocity, norm(sub(endState.velocity, startState.velocity)) / scales.velocity);
  }
  const value = Math.max(maxPosition, maxVelocity);
  return {
    schema: "a0-tier1-direct-state-return-residual/v1",
    status: value <= tolerance ? "passed" : "failed",
    tolerance,
    max_position_return_residual: maxPosition,
    max_velocity_return_residual: maxVelocity,
    max_state_return_residual: value,
  };
}

function speedOrderingLedger(samples, cF, tolerance) {
  let maxResidual = 0;
  let evaluated = 0;
  const examples = [];
  for (const sample of samples.filter((entry) => entry.t >= 0)) {
    const residual = speedOrderingResidual(layerAverageSpeedsFromSample(sample), cF);
    if (!Number.isFinite(residual)) {
      continue;
    }
    evaluated += 1;
    maxResidual = Math.max(maxResidual, residual);
    if (residual > tolerance && examples.length < 10) {
      examples.push({ t: sample.t, speed_ordering_residual: residual });
    }
  }
  return {
    schema: "a0-tier1-direct-speed-ordering-residual/v1",
    status: evaluated === 0 ? "not_computed" : maxResidual <= tolerance ? "passed" : "failed",
    tolerance,
    evaluated_sample_count: evaluated,
    max_speed_ordering_residual: evaluated === 0 ? null : maxResidual,
    examples,
  };
}

function centerDriftLedger(samples, tolerance) {
  const positive = samples.filter((entry) => entry.t >= 0);
  if (positive.length === 0) {
    return {
      schema: "a0-tier1-direct-center-drift-residual/v1",
      status: "not_computed",
      tolerance,
      reason: "no nonnegative trajectory samples emitted",
    };
  }
  const scales = positionScale(positive);
  const startPosition = centerOf(positive[0], "position");
  const startVelocity = centerOf(positive[0], "velocity");
  let maxDrift = 0;
  const examples = [];
  for (const sample of positive) {
    const drift = Math.max(
      norm(sub(centerOf(sample, "position"), startPosition)) / scales.position,
      norm(sub(centerOf(sample, "velocity"), startVelocity)) / scales.velocity
    );
    maxDrift = Math.max(maxDrift, drift);
    if (drift > tolerance && examples.length < 10) {
      examples.push({ t: sample.t, center_drift: drift });
    }
  }
  return {
    schema: "a0-tier1-direct-center-drift-residual/v1",
    status: maxDrift <= tolerance ? "passed" : "failed",
    tolerance,
    max_center_drift: maxDrift,
    examples,
  };
}

function energyLikeSpeedLedger(samples, period, tolerance) {
  const start = sampleAtOrNull(samples, 0);
  const end = sampleAtOrNull(samples, period);
  const startMean = start ? meanSquaredSpeed(start) : Number.NaN;
  const endMean = end ? meanSquaredSpeed(end) : Number.NaN;
  const residual =
    Number.isFinite(startMean) && Number.isFinite(endMean)
      ? Math.abs(endMean - startMean) / Math.max(Math.abs(startMean), Number.EPSILON)
      : Number.NaN;
  return {
    schema: "a0-tier1-direct-energy-like-speed-residual/v1",
    status: !Number.isFinite(residual) ? "not_computed" : residual <= tolerance ? "passed" : "failed",
    tolerance,
    start_mean_squared_speed: Number.isFinite(startMean) ? startMean : null,
    end_mean_squared_speed: Number.isFinite(endMean) ? endMean : null,
    energy_like_speed_residual: Number.isFinite(residual) ? residual : null,
    note: "Tier 1 speed-balance proxy only; not a Noether energy ledger.",
  };
}

function phaseOfLayer(sample, layer, handedness) {
  const plus = sample.bodies[`${layer}+`];
  const minus = sample.bodies[`${layer}-`];
  if (!plus || !minus) {
    return Number.NaN;
  }
  const relative = sub(plus.position, minus.position);
  const plane = planeFor(layer);
  const x = dot(relative, plane.e1);
  const y = dot(relative, plane.e2) * (handedness[layer] ?? 1);
  return Math.atan2(y, x);
}

function wrappedWindingResidual(startPhase, endPhase, winding) {
  if (!Number.isFinite(startPhase) || !Number.isFinite(endPhase) || !Number.isFinite(winding)) {
    return Number.NaN;
  }
  const target = 2 * Math.PI * winding;
  const raw = endPhase - startPhase - target;
  const wrapped = Math.atan2(Math.sin(raw), Math.cos(raw));
  return Math.abs(wrapped) / (2 * Math.PI);
}

function phaseClosureLedger(samples, period, row, sourceRow, tolerance) {
  const start = sampleAtOrNull(samples, 0);
  const end = sampleAtOrNull(samples, period);
  const windings = layerWindings(row, sourceRow);
  const handedness = layerHandedness(row, sourceRow);
  if (!start || !end || !windings) {
    return {
      schema: "a0-tier1-direct-phase-closure-residual/v1",
      status: "not_computed",
      tolerance,
      reason: "start/end phase sample or layer winding labels missing",
    };
  }
  const byLayer = Object.fromEntries(
    LAYERS.map((layer) => {
      const residual = wrappedWindingResidual(
        phaseOfLayer(start, layer, handedness),
        phaseOfLayer(end, layer, handedness),
        Number(windings[layer])
      );
      return [layer, Number.isFinite(residual) ? residual : null];
    })
  );
  const residuals = Object.values(byLayer).filter(Number.isFinite);
  const maxResidual = residuals.length ? Math.max(...residuals) : null;
  return {
    schema: "a0-tier1-direct-phase-closure-residual/v1",
    status: maxResidual === null ? "not_computed" : maxResidual <= tolerance ? "passed" : "failed",
    tolerance,
    phase_closure_residual: maxResidual,
    by_layer: byLayer,
  };
}

function rootClosureLedger(samples, roots, period, tolerance) {
  const positive = samples.filter((entry) => entry.t >= 0);
  if (positive.length === 0 || roots.length === 0) {
    return {
      schema: "a0-tier1-direct-root-residual-ledger/v1",
      status: "not_computed",
      tolerance,
      reason: "trajectory samples or active roots missing",
    };
  }
  const buckets = groupRootsByObservationTime(roots, period);
  let evaluated = 0;
  let overTolerance = 0;
  let maxResidual = 0;
  const byRelation = Object.fromEntries(
    ROOT_RELATIONS.map((relation) => [
      relation,
      { root_count: 0, max_root_residual: 0, roots_over_tolerance: 0 },
    ])
  );
  const examples = [];
  for (const sample of positive) {
    const bucket = nearestRootBucket(buckets, sample.t, period);
    for (const root of bucket.roots) {
      const receiver = sample.bodies[root.receiver];
      const sourceSample = interpolateSample(samples, sample.t - root.delay);
      const source = sourceSample?.bodies?.[root.source] ?? null;
      if (!receiver || !source || !finiteVector3(receiver.position) || !finiteVector3(source.position)) {
        continue;
      }
      const residual = Math.abs(norm(sub(receiver.position, source.position)) - root.delay);
      evaluated += 1;
      maxResidual = Math.max(maxResidual, residual);
      if (Object.hasOwn(byRelation, root.relation)) {
        byRelation[root.relation].root_count += 1;
        byRelation[root.relation].max_root_residual = Math.max(
          byRelation[root.relation].max_root_residual,
          residual
        );
      }
      if (residual > tolerance) {
        overTolerance += 1;
        if (Object.hasOwn(byRelation, root.relation)) {
          byRelation[root.relation].roots_over_tolerance += 1;
        }
        if (examples.length < 10) {
          examples.push({
            t: sample.t,
            receiver: root.receiver,
            source: root.source,
            relation: root.relation,
            delay: root.delay,
            root_residual: residual,
          });
        }
      }
    }
  }
  return {
    schema: "a0-tier1-direct-root-residual-ledger/v1",
    status: evaluated === 0 ? "not_computed" : overTolerance === 0 ? "passed" : "failed",
    tolerance,
    roots_evaluated: evaluated,
    roots_over_tolerance: overTolerance,
    max_root_residual: evaluated === 0 ? null : maxResidual,
    by_relation: byRelation,
    examples,
  };
}

function sourceSamplesForBalance(row, sourceRow) {
  const sourceSamples = canonicalSamples(sourceRow ?? {});
  return sourceSamples.length > 0 ? sourceSamples : canonicalSamples(row);
}

function accelerationStep(samples, period) {
  const nonnegative = samples
    .map((sample) => sample.t)
    .filter((time) => Number.isFinite(time) && time >= 0 && time <= period)
    .sort((a, b) => a - b);
  const gaps = [];
  for (let i = 1; i < nonnegative.length; i += 1) {
    const gap = nonnegative[i] - nonnegative[i - 1];
    if (Number.isFinite(gap) && gap > Number.EPSILON) {
      gaps.push(gap);
    }
  }
  if (gaps.length > 0) {
    return gaps.reduce((min, gap) => Math.min(min, gap), gaps[0]);
  }
  return Number.isFinite(period) && period > 0 ? period / 320 : null;
}

function sourceStateAt(samples, t, bodyId) {
  const sample = interpolateSample(samples, t);
  return sample ? stateFromSample(sample, bodyId) : null;
}

function finiteDifferenceCarrierAcceleration(samples, t, h) {
  if (!Number.isFinite(h) || h <= 0) {
    return null;
  }
  const left = interpolateSample(samples, t - h);
  const right = interpolateSample(samples, t + h);
  if (!left || !right || !finiteStateSample(left) || !finiteStateSample(right)) {
    return null;
  }
  return Object.fromEntries(
    BODY_IDS.map((bodyId) => {
      const leftVelocity = left.bodies[bodyId].velocity;
      const rightVelocity = right.bodies[bodyId].velocity;
      return [bodyId, scale(sub(rightVelocity, leftVelocity), 1 / (2 * h))];
    })
  );
}

function relationBasisAt(samples, rootsByTime, lockedKeys, period, t, eta, jMin) {
  const current = interpolateSample(samples, t);
  if (!current || !finiteStateSample(current)) {
    return null;
  }
  const basis = Object.fromEntries(
    ROOT_RELATIONS.map((relation) => [
      relation,
      Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, [0, 0, 0]])),
    ])
  );
  const bucket = nearestRootBucket(rootsByTime, t, period);
  let evaluatedRootCount = 0;
  let lockedRootCount = 0;
  let invalidRootCount = 0;
  for (const root of bucket.roots) {
    if (lockedKeys.has(rootKey(root))) {
      lockedRootCount += 1;
      continue;
    }
    const receiverState = current.bodies[root.receiver];
    const sourceState = sourceStateAt(samples, t - root.delay, root.source);
    if (!receiverState || !sourceState || !basis[root.relation]) {
      invalidRootCount += 1;
      continue;
    }
    const sourceToReceiver = sub(sourceState.position, receiverState.position);
    const regularizedDistanceSquared = dot(sourceToReceiver, sourceToReceiver) + eta * eta;
    const denominator =
      regularizedDistanceSquared *
      Math.sqrt(regularizedDistanceSquared) *
      Math.max(Math.abs(root.J), jMin);
    if (!Number.isFinite(denominator) || denominator <= 0) {
      invalidRootCount += 1;
      continue;
    }
    const coefficient = (bodyCharge(root.receiver) * bodyCharge(root.source)) / denominator;
    const contribution = scale(sourceToReceiver, coefficient);
    const receiverBasis = basis[root.relation][root.receiver];
    receiverBasis[0] += contribution[0];
    receiverBasis[1] += contribution[1];
    receiverBasis[2] += contribution[2];
    evaluatedRootCount += 1;
  }
  return {
    basis,
    bucket_time: bucket.t,
    evaluatedRootCount,
    lockedRootCount,
    invalidRootCount,
  };
}

function addOuterProduct(normal, row) {
  for (let i = 0; i < ROOT_RELATIONS.length; i += 1) {
    for (let j = 0; j < ROOT_RELATIONS.length; j += 1) {
      normal[i][j] += row[i] * row[j];
    }
  }
}

function addScaledRow(rhs, row, value) {
  for (let i = 0; i < ROOT_RELATIONS.length; i += 1) {
    rhs[i] += row[i] * value;
  }
}

function solveLinear3(matrix, rhs) {
  const a = matrix.map((row, index) => [...row, rhs[index]]);
  for (let col = 0; col < 3; col += 1) {
    let pivot = col;
    for (let row = col + 1; row < 3; row += 1) {
      if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) {
        pivot = row;
      }
    }
    if (Math.abs(a[pivot][col]) <= Number.EPSILON) {
      return null;
    }
    if (pivot !== col) {
      [a[pivot], a[col]] = [a[col], a[pivot]];
    }
    const pivotValue = a[col][col];
    for (let entry = col; entry < 4; entry += 1) {
      a[col][entry] /= pivotValue;
    }
    for (let row = 0; row < 3; row += 1) {
      if (row === col) {
        continue;
      }
      const factor = a[row][col];
      for (let entry = col; entry < 4; entry += 1) {
        a[row][entry] -= factor * a[col][entry];
      }
    }
  }
  const solution = [a[0][3], a[1][3], a[2][3]];
  return solution.every(Number.isFinite) ? solution : null;
}

function residualBalanceLedger(row, sourceRow, trajectory, args) {
  const period = row.period;
  const samples = sourceSamplesForBalance(row, sourceRow);
  const roots = trajectory.roots;
  const lockedKeys = new Set(row.trajectory_target?.branch_chart_assumptions?.locked_self_root_keys ?? []);
  const eta = trajectory.diagnostics?.eta ?? resolveEta(row, sourceRow, args);
  const h = accelerationStep(samples, period);
  if (!Number.isFinite(period) || period <= 0 || samples.length === 0 || roots.length === 0 || !Number.isFinite(h)) {
    return {
      schema: "a0-tier1-residual-balance-ledger/v1",
      status: "not_computed",
      reason: "source samples, active roots, period, or acceleration step missing",
    };
  }
  const rootsByTime = groupRootsByObservationTime(roots, period);
  const normal = ROOT_RELATIONS.map(() => ROOT_RELATIONS.map(() => 0));
  const rhs = ROOT_RELATIONS.map(() => 0);
  let equationCount = 0;
  let sampleCount = 0;
  let evaluatedRootContributions = 0;
  let lockedRootContributions = 0;
  let invalidRootContributions = 0;
  let targetNormSquared = 0;
  const rows = [];

  for (const bucket of rootsByTime) {
    const t = bucket.t;
    if (!Number.isFinite(t) || t < 0 || t > period) {
      continue;
    }
    const target = finiteDifferenceCarrierAcceleration(samples, t, h);
    const basisPacket = relationBasisAt(samples, rootsByTime, lockedKeys, period, t, eta, args.jMin);
    if (!target || !basisPacket) {
      continue;
    }
    sampleCount += 1;
    evaluatedRootContributions += basisPacket.evaluatedRootCount;
    lockedRootContributions += basisPacket.lockedRootCount;
    invalidRootContributions += basisPacket.invalidRootCount;
    for (const bodyId of BODY_IDS) {
      for (let component = 0; component < 3; component += 1) {
        const rowVector = ROOT_RELATIONS.map((relation) => basisPacket.basis[relation][bodyId][component]);
        const targetValue = target[bodyId][component];
        if (!rowVector.every(Number.isFinite) || !Number.isFinite(targetValue)) {
          continue;
        }
        addOuterProduct(normal, rowVector);
        addScaledRow(rhs, rowVector, targetValue);
        targetNormSquared += targetValue * targetValue;
        rows.push({ rowVector, targetValue });
        equationCount += 1;
      }
    }
  }

  if (equationCount < ROOT_RELATIONS.length || targetNormSquared <= 0) {
    return {
      schema: "a0-tier1-residual-balance-ledger/v1",
      status: "not_computed",
      sample_count: sampleCount,
      equation_count: equationCount,
      reason: "insufficient carrier-acceleration equations for relation-weight balance",
    };
  }

  const regularizedNormal = normal.map((rowValues, index) =>
    rowValues.map((value, col) => value + (index === col ? args.balanceRidge : 0))
  );
  const solution = solveLinear3(regularizedNormal, rhs);
  if (!solution) {
    return {
      schema: "a0-tier1-residual-balance-ledger/v1",
      status: "failed",
      failure_code: "relation-weight-normal-equation-singular",
      sample_count: sampleCount,
      equation_count: equationCount,
      normal_matrix: normal,
      rhs,
    };
  }

  let residualNormSquared = 0;
  let maxComponentResidual = 0;
  for (const row of rows) {
    const predicted = row.rowVector.reduce((sum, value, index) => sum + value * solution[index], 0);
    const residual = row.targetValue - predicted;
    residualNormSquared += residual * residual;
    maxComponentResidual = Math.max(maxComponentResidual, Math.abs(residual));
  }
  const relativeResidual = Math.sqrt(residualNormSquared / targetNormSquared);
  const status =
    relativeResidual <= args.balanceTolerance
      ? "relation_weight_balance_candidate"
      : "relation_weight_only_no_go_carrier_correction_required";
  return {
    schema: "a0-tier1-residual-balance-ledger/v1",
    status,
    failure_code: status === "relation_weight_balance_candidate" ? null : "relation-weight-only-residual-too-large",
    tolerance: args.balanceTolerance,
    ridge: args.balanceRidge,
    source: "branch-carrier finite-difference acceleration and active causal-root basis",
    sample_count: sampleCount,
    equation_count: equationCount,
    acceleration_step: h,
    eta,
    relation_weight_solution: Object.fromEntries(
      ROOT_RELATIONS.map((relation, index) => [relation, solution[index]])
    ),
    target_norm: Math.sqrt(targetNormSquared),
    residual_norm: Math.sqrt(residualNormSquared),
    relative_residual: relativeResidual,
    max_component_residual: maxComponentResidual,
    evaluated_root_contributions: evaluatedRootContributions,
    locked_root_contributions: lockedRootContributions,
    invalid_root_contributions: invalidRootContributions,
    correction_equation:
      "d_l''(t) must supply the component of carrier acceleration outside span{B_self,B_partner,B_inter} when scalar relation weights do not meet tolerance.",
    no_go_statement:
      relativeResidual <= args.balanceTolerance
        ? "Scalar branch-native relation weights are not yet falsified by this residual-balance projection."
        : "Scalar branch-native relation weights alone cannot close the compact fixture; a non-circular carrier correction or richer branch equation is required.",
  };
}

function lockLedger(row) {
  const target = row.trajectory_target ?? {};
  const assumptions = target.branch_chart_assumptions ?? {};
  const plan = target.macro_stride_plan ?? {};
  const passed =
    row.status === READY_STATUS &&
    assumptions.locked_roots_are_not_promoted_to_active_branch_count === true &&
    Array.isArray(assumptions.locked_self_root_keys) &&
    assumptions.locked_self_root_keys.length > 0 &&
    plan.under_current_cap === true;
  return {
    schema: "a0-tier1-direct-lock-ledger/v1",
    status: passed ? "passed" : "failed",
    locked_self_root_keys: assumptions.locked_self_root_keys ?? [],
    locked_roots_promoted_to_active_branch_count: false,
    selected_macro_stride: plan.selected_macro_stride ?? null,
    planned_retained_direct_root_step_count: plan.retained_direct_root_step_count ?? null,
    reason:
      "Fold-layer keys are routed to the lock ledger and excluded from the diagnostic acceleration branch sum.",
  };
}

function monodromyLedger() {
  return {
    schema: "a0-tier1-direct-monodromy-ledger/v1",
    status: "not_computed",
    data_source: "finite_difference_return_map_missing",
    Delta_k: null,
    Delta_k_positive: false,
    reason:
      "This one-period attempt emits the base trajectory only; quotient finite-difference perturbation runs are still required.",
  };
}

function etaLadderLedger() {
  return {
    schema: "a0-tier1-direct-eta-ladder-ledger/v1",
    status: "not_computed",
    data_source: "eta_ladder_missing",
    same_branch_persists_across_eta_ladder: false,
    reason: "This attempt runs one eta value only; eta-ladder continuation remains a separate fail-closed target.",
  };
}

function residualLedgers(row, sourceRow, trajectory, args) {
  const period = row.period;
  const samples = trajectory.samples;
  const roots = trajectory.roots;
  return {
    trajectory: {
      schema: "a0-tier1-direct-trajectory-ledger/v1",
      status: trajectory.status,
      failure_code: trajectory.failure_code,
      diagnostics: trajectory.diagnostics,
    },
    state_return: stateReturnLedger(samples, period, args.stateTolerance),
    root_closure: rootClosureLedger(samples, roots, period, args.rootTolerance),
    phase_closure: phaseClosureLedger(samples, period, row, sourceRow, args.phaseTolerance),
    speed_ordering: speedOrderingLedger(samples, args.cF, args.speedTolerance),
    center_drift: centerDriftLedger(samples, args.centerTolerance),
    energy_like_speed: energyLikeSpeedLedger(samples, period, args.energyTolerance),
    residual_balance: residualBalanceLedger(row, sourceRow, trajectory, args),
    fold_layer_lock: lockLedger(row),
    monodromy: monodromyLedger(),
    eta_ladder: etaLadderLedger(),
  };
}

function ledgerPassed(ledger) {
  return ledger?.status === "passed";
}

function directResidualsPass(ledgers) {
  return [
    ledgers.trajectory,
    ledgers.state_return,
    ledgers.root_closure,
    ledgers.phase_closure,
    ledgers.speed_ordering,
    ledgers.center_drift,
    ledgers.energy_like_speed,
    ledgers.fold_layer_lock,
  ].every(ledgerPassed);
}

function rowStatus(ledgers) {
  if (ledgers.trajectory.status !== "direct_one_period_trajectory_computed") {
    return {
      status: ledgers.trajectory.status,
      failure_code: ledgers.trajectory.failure_code ?? "direct-one-period-trajectory-not-computed",
    };
  }
  if (!directResidualsPass(ledgers)) {
    return {
      status: "failed_direct_one_period_residuals",
      failure_code: "direct-one-period-residual-failure",
    };
  }
  return {
    status: "blocked_monodromy_eta_ladder_not_run",
    failure_code: "monodromy-eta-ladder-not-run",
  };
}

function validation(row, ledgers) {
  const residualsPass = directResidualsPass(ledgers);
  return {
    status_is_accepted_history_segment: false,
    source_row_present: row.validation?.source_row_present === true,
    sample_count_at_least_two: ledgers.trajectory.diagnostics?.completed_steps > 0,
    samples_ordered_by_t: true,
    samples_cover_cycle:
      ledgers.trajectory.diagnostics?.completed_steps === ledgers.trajectory.diagnostics?.planned_steps,
    samples_cover_all_delayed_source_times:
      ledgers.trajectory.diagnostics?.completed_steps === ledgers.trajectory.diagnostics?.planned_steps,
    all_required_body_states_present: ledgers.trajectory.status === "direct_one_period_trajectory_computed",
    body_state_vectors_finite: ledgers.trajectory.status === "direct_one_period_trajectory_computed",
    active_root_labels_valid: true,
    active_root_delays_finite_nonnegative: true,
    active_root_J_finite: true,
    root_ledger_stable_under_refinement: false,
    residuals_below_tolerance: residualsPass,
    speed_ordering_retained: ledgers.speed_ordering.status === "passed",
    no_secular_center_drift: ledgers.center_drift.status === "passed",
    Delta_k_positive: false,
    same_branch_persists_across_eta_ladder: false,
    benchmark_inputs_excluded: row.validation?.benchmark_inputs_excluded === true,
    active_root_relations_present: row.validation?.active_root_relations_present ?? null,
    active_root_sources_cover_selected_layers: row.validation?.active_root_sources_cover_selected_layers ?? null,
    direct_residuals_passed: residualsPass,
  };
}

function acceptedHistoryBoundary(ledgers, validationFlags) {
  const additionalUncomputed = [];
  if (ledgers.monodromy.status !== "passed") {
    additionalUncomputed.push("quotient_monodromy_operator");
  }
  if (ledgers.eta_ladder.status !== "passed") {
    additionalUncomputed.push("eta_ladder_continuation");
  }
  if (ledgers.energy_like_speed.status !== "passed") {
    additionalUncomputed.push("energy_like_speed_ledger");
  }
  return {
    status_is_accepted_history_segment: false,
    residuals_below_tolerance: validationFlags.residuals_below_tolerance,
    no_secular_center_drift: validationFlags.no_secular_center_drift,
    Delta_k_positive: false,
    same_branch_persists_across_eta_ladder: false,
    blocked_fields: ACCEPTED_HISTORY_BLOCKERS.filter((field) => validationFlags[field] !== true),
    additional_uncomputed_fields: additionalUncomputed,
    reason:
      "The direct fold-layer-locked trajectory attempt is a Tier 1 diagnostic. Accepted history remains blocked until direct residuals, quotient monodromy, and eta-ladder persistence all pass.",
  };
}

function attemptRow(row, sourceRow, args) {
  const trajectory = integrateTrajectory(row, sourceRow, args);
  const ledgers = residualLedgers(row, sourceRow, trajectory, args);
  const status = rowStatus(ledgers);
  const validationFlags = validation(row, ledgers);
  return {
    row: row.row,
    schema: "a0-tier1-fold-layer-locked-one-period-attempt-row/v1",
    schema_status: "provisional",
    status: status.status,
    failure_code: status.failure_code,
    source_status: row.status ?? null,
    source_failure_code: row.failure_code ?? null,
    period: row.period ?? null,
    source_row: sourceRowFor(row, sourceRow),
    selected_weak_tier_layers: row.selected_weak_tier_layers ?? ["I", "M", "O"],
    samples: trajectory.samples,
    active_causal_root_ledger: trajectory.roots,
    residual_ledgers: ledgers,
    validation: validationFlags,
    accepted_history_boundary: acceptedHistoryBoundary(ledgers, validationFlags),
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, electron radius, measured alpha, or CKM-derived transport action was used to produce this one-period attempt.",
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
  if (rows.some((row) => row.status === "failed_direct_one_period_residuals")) {
    return "failed_direct_one_period_residuals";
  }
  if (rows.some((row) => row.status === "failed_direct_one_period_trajectory")) {
    return "failed_direct_one_period_trajectory";
  }
  if (rows.every((row) => row.status === "blocked_monodromy_eta_ladder_not_run")) {
    return "blocked_monodromy_eta_ladder_not_run";
  }
  return "blocked";
}

function run(intake, intakePath, source, sourcePath, args) {
  const sourcesByRow = rowMap(source);
  const rows = selectRows(intake, args.rows).map((row) => attemptRow(row, sourcesByRow.get(row.row) ?? null, args));
  return {
    artifact_schema: "a0-tier1-fold-layer-locked-one-period-attempt/v1",
    metadata: {
      artifact: "a0-tier1-fold-layer-locked-one-period-attempt",
      schema_status: "provisional",
      status: artifactStatus(rows),
      generatedAt: new Date().toISOString(),
      sourceIntake: path.relative(process.cwd(), intakePath),
      sourceContinuation: sourcePath ? path.relative(process.cwd(), sourcePath) : null,
      rowSelector: args.rows,
      stepCap: args.stepCap,
      sampleCount: args.sampleCount,
      note:
        "Runs the declared fold-layer-locked diagnostic one-period map and emits fail-closed residual ledgers. It does not compute quotient monodromy or eta-ladder persistence.",
    },
    source_intake_metadata: intake.metadata ?? null,
    source_continuation_metadata: source?.metadata ?? null,
    selected_row_count: rows.length,
    summary: {
      status_counts: statusCounts(rows),
      accepted_history_row_count: rows.filter((row) => row.status === "accepted_history_segment").length,
      direct_integrator_present: rows.some((row) => row.residual_ledgers?.trajectory?.status === "direct_one_period_trajectory_computed"),
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
