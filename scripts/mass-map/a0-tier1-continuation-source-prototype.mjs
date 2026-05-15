#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROWS = "ready";
const DEFAULT_SAMPLE_COUNT = 320;
const DEFAULT_DYNAMICS_STEP_FRACTION = 1 / 4096;
const LAYER_ORDER = ["I", "M", "O"];
const POLARITIES = ["+", "-"];
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const CHARGE = { "+": 1, "-": -1 };
const SIGN = { "+": 1, "-": -1 };
const BLOCKED_STATUS = "blocked_carrier_replay_only";
const BLOCKED_FAILURE_CODE = "tier1-integrator-not-run";

function parseArgs(argv) {
  const args = {
    tier0: null,
    config: null,
    rows: DEFAULT_ROWS,
    sampleCount: DEFAULT_SAMPLE_COUNT,
    dynamicsStepFraction: DEFAULT_DYNAMICS_STEP_FRACTION,
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
    } else if (arg === "--config") {
      args.config = argv[++i];
    } else if (arg === "--rows") {
      args.rows = argv[++i];
    } else if (arg === "--sample-count") {
      args.sampleCount = parsePositiveInteger(argv[++i], "--sample-count");
    } else if (arg === "--dynamics-step-fraction") {
      args.dynamicsStepFraction = parsePositiveNumber(argv[++i], "--dynamics-step-fraction");
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
  console.log(`Usage: node scripts/mass-map/a0-tier1-continuation-source-prototype.mjs --tier0 PATH [options]

Options:
  --tier0 PATH          Tier 0 JSON output from a0-tier0-branch-search.mjs.
  --config PATH         Tier 0 grid config. Defaults to tier0.metadata.config when present.
  --rows VALUE          "ready", "all", or a comma-separated row list. Defaults to "ready".
  --sample-count N      Carrier replay samples across the required source-time interval. Defaults to ${DEFAULT_SAMPLE_COUNT}.
  --dynamics-step-fraction VALUE
                       Bounded one-step diagnostic fraction of T_k. Defaults to ${DEFAULT_DYNAMICS_STEP_FRACTION}.
  --out PATH            Write JSON output to a file instead of stdout.
  --pretty              Pretty-print JSON.
  --help                Show this help.

This is a blocked Tier 1 continuation-source prototype. It replays the Tier 0
carrier chart and recomputes provisional carrier roots so downstream validators
can inspect sample coverage and root-record structure. It does not integrate the
regularized Tier 1 delayed dynamics, run an eta ladder, or compute Delta_k.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function parsePositiveInteger(value, name) {
  const number = Number(value);
  if (!Number.isInteger(number) || number <= 1) {
    throw new Error(`Expected ${name} to be an integer greater than 1, got: ${value}`);
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

function requireTier0Path(args) {
  if (!args.tier0) {
    throw new Error("Missing required --tier0 PATH argument.");
  }
  return path.resolve(args.tier0);
}

function resolveConfigPath(args, tier0) {
  const requested = args.config ?? tier0.metadata?.config ?? null;
  return requested ? path.resolve(requested) : null;
}

function readConfig(configPath) {
  if (!configPath) {
    return {
      config: null,
      configPath: null,
      error: "tier0-config-path-missing",
    };
  }
  try {
    return {
      config: readJson(configPath),
      configPath,
      error: null,
    };
  } catch (error) {
    return {
      config: null,
      configPath,
      error: error instanceof Error ? error.message : String(error),
    };
  }
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

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale(a, k) {
  return [a[0] * k, a[1] * k, a[2] * k];
}

function addTo(a, b) {
  a[0] += b[0];
  a[1] += b[1];
  a[2] += b[2];
  return a;
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
  const n = norm(a);
  return n === 0 ? [0, 0, 0] : scale(a, 1 / n);
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

function bodyCatalog() {
  return LAYER_ORDER.flatMap((layer) =>
    POLARITIES.map((polarity) => ({
      id: `${layer}${polarity}`,
      layer,
      polarity,
      charge: CHARGE[polarity],
    }))
  );
}

function rowValues(row) {
  const ellipticity =
    typeof row.branch_label?.ellipticity === "number"
      ? row.branch_label.ellipticity
      : row.z_lambda?.ellipticity?.I ?? 1;
  return {
    radii: row.geometry?.radii ?? {},
    omega: row.geometry?.omega ?? {},
    periods: row.geometry?.periods ?? {},
    commonPeriod: row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null,
    handedness: row.branch_label?.handedness ?? row.z_lambda?.handedness ?? {},
    ellipticity,
  };
}

function layerState(layer, values, t) {
  const { e1, e2 } = planeFor(layer);
  const phase = values.omega[layer] * t;
  const cos = Math.cos(phase);
  const sin = Math.sin(phase);
  const handed = values.handedness[layer];
  const lambda = values.ellipticity;
  const radius = values.radii[layer];
  const omega = values.omega[layer];
  const relative = add(scale(e1, radius * cos), scale(e2, radius * handed * lambda * sin));
  const relativeVelocity = add(
    scale(e1, -radius * omega * sin),
    scale(e2, radius * omega * handed * lambda * cos)
  );
  return { relative, relativeVelocity };
}

function bodyState(body, values, t) {
  const state = layerState(body.layer, values, t);
  return {
    position: scale(state.relative, SIGN[body.polarity] * 0.5),
    velocity: scale(state.relativeVelocity, SIGN[body.polarity] * 0.5),
  };
}

function sourceRelation(receiver, source) {
  if (receiver.id === source.id) {
    return "self";
  }
  if (receiver.layer === source.layer) {
    return "partner";
  }
  return "inter_layer";
}

function minimumSelfDelay(config) {
  const factor = config.classification?.instantaneousSelfDelayFactor ?? 2;
  return config.sampling.minDelay * factor;
}

function selfRootDelayWindow(config) {
  const exclusionDelay = minimumSelfDelay(config);
  const foldLayerFactor = config.classification?.selfFoldLayerFactor ?? 8;
  const tolerance = config.sampling.rootTolerance ?? 0;
  const foldLayerDelay =
    config.classification?.selfFoldLayerDelay ??
    Math.max(exclusionDelay * foldLayerFactor, exclusionDelay + tolerance * foldLayerFactor);
  return {
    exclusionDelay,
    foldLayerDelay: Math.max(exclusionDelay, foldLayerDelay),
  };
}

function classifySelfRootDelay(rootDelay, config) {
  const window = selfRootDelayWindow(config);
  if (rootDelay <= window.exclusionDelay) {
    return "instantaneous_exclusion";
  }
  if (rootDelay <= window.foldLayerDelay) {
    return "regularized_fold_layer";
  }
  return "admissible_delay";
}

function classifyRoot(receiver, source, rootDelay, j, config) {
  const relation = sourceRelation(receiver, source);
  const selfDelayClass = relation === "self" ? classifySelfRootDelay(rootDelay, config) : null;
  const isNearZeroSelf = selfDelayClass === "instantaneous_exclusion";
  const isSelfFoldLayer = selfDelayClass === "regularized_fold_layer";
  const isAdmissibleDelayedSelfHit = selfDelayClass === "admissible_delay";
  let status = "active";
  if (isNearZeroSelf) {
    status = "excluded_instantaneous_self_kick";
  } else if (isSelfFoldLayer) {
    status = "excluded_regularized_self_fold_layer";
  }
  return {
    relation,
    status,
    nearSeparator: Math.abs(j) <= (config.classification?.jLockThreshold ?? 0.05),
    nearZeroSelf: isNearZeroSelf,
    selfDelayClass,
    selfFoldLayer: isSelfFoldLayer,
    delayedSelfHit: relation === "self" && rootDelay > selfRootDelayWindow(config).exclusionDelay,
    admissibleDelayedSelfHit: isAdmissibleDelayedSelfHit,
  };
}

function rootFunction(receiver, source, values, t, delay, cF) {
  const receiverState = bodyState(receiver, values, t);
  const sourceState = bodyState(source, values, t - delay);
  return norm(sub(receiverState.position, sourceState.position)) - cF * delay;
}

function solveRoot(receiver, source, values, t, lo, hi, cF, tolerance, options = {}) {
  let a = lo;
  let b = hi;
  let fa = rootFunction(receiver, source, values, t, a, cF);
  let fb = rootFunction(receiver, source, values, t, b, cF);
  if (!options.ignoreLoEndpoint && Math.abs(fa) <= tolerance) {
    return a;
  }
  if (!options.ignoreHiEndpoint && Math.abs(fb) <= tolerance) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }
  for (let i = 0; i < 64; i += 1) {
    const mid = 0.5 * (a + b);
    const fm = rootFunction(receiver, source, values, t, mid, cF);
    if (Math.abs(fm) <= tolerance || Math.abs(b - a) <= tolerance) {
      return mid;
    }
    if (fa * fm <= 0) {
      b = mid;
      fb = fm;
    } else {
      a = mid;
      fa = fm;
    }
  }
  return 0.5 * (a + b);
}

function rootDuplicateTolerance(sampling, rootStep) {
  return sampling.rootDuplicateTolerance ?? Math.max(sampling.rootTolerance * 4, rootStep * 1e-9, Number.EPSILON);
}

function buildRootRecord(receiver, source, values, t, rootDelay, cF, config) {
  const receiverState = bodyState(receiver, values, t);
  const sourceState = bodyState(source, values, t - rootDelay);
  const direction = unit(sub(receiverState.position, sourceState.position));
  const j = 1 - dot(sourceState.velocity, direction) / cF;
  const rootClass = classifyRoot(receiver, source, rootDelay, j, config);
  return {
    receiver: receiver.id,
    source: source.id,
    relation: rootClass.relation,
    status: rootClass.status,
    t,
    delay: rootDelay,
    residual: Math.abs(rootFunction(receiver, source, values, t, rootDelay, cF)),
    J: j,
    nearSeparator: rootClass.nearSeparator,
    nearZeroSelf: rootClass.nearZeroSelf,
    selfDelayClass: rootClass.selfDelayClass,
    selfFoldLayer: rootClass.selfFoldLayer,
    delayedSelfHit: rootClass.delayedSelfHit,
    admissibleDelayedSelfHit: rootClass.admissibleDelayedSelfHit,
    provenance: "tier0_carrier_root_replay",
  };
}

function pushDistinctRoot(roots, root, duplicateTolerance) {
  const duplicate = roots.some(
    (existing) =>
      existing.receiver === root.receiver &&
      existing.source === root.source &&
      Math.abs(existing.t - root.t) < 1e-9 &&
      Math.abs(existing.delay - root.delay) <= duplicateTolerance
  );
  if (!duplicate) {
    roots.push(root);
  }
}

function carrierReplayConfig(tier0, config) {
  return {
    seaCell: config?.seaCell ?? {
      c_f: tier0.sea_cell?.c_f ?? 1,
    },
    sampling: config?.sampling ?? {
      sampleCount: 16,
      rootSamples: 128,
      historyPeriods: 1.25,
      minDelay: tier0.tolerances?.instantaneousSelfDelay ?? 1e-6,
      rootTolerance: tier0.tolerances?.root ?? 1e-6,
    },
    classification: config?.classification ?? {
      jLockThreshold: tier0.tolerances?.jLock ?? 0.05,
      instantaneousSelfDelayFactor: 2,
    },
  };
}

function enumerateCarrierRoots(row, tier0, configResult) {
  const config = carrierReplayConfig(tier0, configResult.config);
  const values = rowValues(row);
  const cF = config.seaCell.c_f;
  const bodies = bodyCatalog();
  const sampling = config.sampling;
  const historyWindow = sampling.historyPeriods * Math.max(...Object.values(values.periods));
  const rootStep = historyWindow / sampling.rootSamples;
  const duplicateTolerance = rootDuplicateTolerance(sampling, rootStep);
  const selfWindow = selfRootDelayWindow(config);
  const roots = [];
  const sampleTimes = Array.from({ length: sampling.sampleCount }, (_, i) =>
    (values.commonPeriod * i) / sampling.sampleCount
  );

  for (const t of sampleTimes) {
    for (const receiver of bodies) {
      for (const source of bodies) {
        const relation = sourceRelation(receiver, source);
        let priorDelay = sampling.minDelay;
        let priorValue = rootFunction(receiver, source, values, t, priorDelay, cF);
        for (let index = 1; index <= sampling.rootSamples; index += 1) {
          const delay = sampling.minDelay + index * rootStep;
          const value = rootFunction(receiver, source, values, t, delay, cF);
          const hasBracket = priorValue === 0 || value === 0 || priorValue * value < 0;
          if (hasBracket) {
            const rootDelay = solveRoot(
              receiver,
              source,
              values,
              t,
              priorDelay,
              delay,
              cF,
              sampling.rootTolerance
            );
            if (rootDelay === null) {
              priorDelay = delay;
              priorValue = value;
              continue;
            }
            pushDistinctRoot(
              roots,
              buildRootRecord(receiver, source, values, t, rootDelay, cF, config),
              duplicateTolerance
            );
            if (relation === "self" && rootDelay <= selfWindow.foldLayerDelay && delay > selfWindow.foldLayerDelay) {
              const delayedRootDelay = solveRoot(
                receiver,
                source,
                values,
                t,
                selfWindow.foldLayerDelay,
                delay,
                cF,
                sampling.rootTolerance,
                { ignoreLoEndpoint: true }
              );
              if (delayedRootDelay !== null) {
                pushDistinctRoot(
                  roots,
                  buildRootRecord(receiver, source, values, t, delayedRootDelay, cF, config),
                  duplicateTolerance
                );
              }
            }
          }
          priorDelay = delay;
          priorValue = value;
        }
      }
    }
  }
  return roots.filter((root) => root.status === "active");
}

function finiteBodyStates(row, t) {
  const values = rowValues(row);
  return Object.fromEntries(
    bodyCatalog().map((body) => {
      const state = bodyState(body, values, t);
      return [
        body.id,
        {
          position: state.position,
          velocity: state.velocity,
        },
      ];
    })
  );
}

function replaySampleTimes(row, sampleCount) {
  const maxDelay = row.root_ledger?.maxDelay ?? 0;
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod;
  const start = -maxDelay;
  return Array.from({ length: sampleCount }, (_, i) => ({
    t: start + ((period - start) * i) / (sampleCount - 1),
  }));
}

function carrierReplaySamples(row, sampleCount) {
  return replaySampleTimes(row, sampleCount).map((sample) => ({
    t: sample.t,
    bodies: finiteBodyStates(row, sample.t),
  }));
}

function rootReplayDiagnostics(roots, configResult) {
  const byRelation = { partner: 0, self: 0, inter_layer: 0 };
  const bySource = Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, 0]));
  for (const root of roots) {
    if (Object.hasOwn(byRelation, root.relation)) {
      byRelation[root.relation] += 1;
    }
    if (Object.hasOwn(bySource, root.source)) {
      bySource[root.source] += 1;
    }
  }
  return {
    status: configResult.error ? "blocked_root_replay_unavailable" : "carrier-root-replay-computed",
    config_error: configResult.error,
    active_root_count: roots.length,
    by_relation: byRelation,
    by_source: bySource,
    relation_classes_present: {
      partner: byRelation.partner > 0,
      self: byRelation.self > 0,
      inter_layer: byRelation.inter_layer > 0,
    },
    all_body_sources_present: Object.values(bySource).every((count) => count > 0),
  };
}

function bodyLayer(bodyId) {
  return bodyId.slice(0, 1);
}

function bodyPolarity(bodyId) {
  return bodyId.slice(1);
}

function bodyCharge(bodyId) {
  return CHARGE[bodyPolarity(bodyId)] ?? 0;
}

function speed(value) {
  return norm(value);
}

function relationWeight(relation) {
  return {
    self: 0.5,
    partner: 0.75,
    inter_layer: 1,
  }[relation] ?? 0.5;
}

function regularizationEta(row, tier0, configResult) {
  return (
    row.self_root_delay_window?.foldLayerDelay ??
    tier0.tolerances?.selfRootFoldLayerDelay ??
    configResult.config?.sampling?.rootTolerance ??
    tier0.tolerances?.root ??
    1e-6
  );
}

function rootsAtObservationTime(roots, t) {
  const tolerance = 1e-9;
  return roots.filter((root) => Math.abs(root.t - t) <= tolerance);
}

function rootKickAccelerations(row, tier0, configResult, roots, observationTime) {
  const values = rowValues(row);
  const eta = regularizationEta(row, tier0, configResult);
  const accelerations = Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, [0, 0, 0]]));
  const selectedRoots = rootsAtObservationTime(roots, observationTime);
  let invalidContributionCount = 0;

  for (const root of selectedRoots) {
    const receiver = bodyCatalog().find((body) => body.id === root.receiver);
    const source = bodyCatalog().find((body) => body.id === root.source);
    if (!receiver || !source || !Number.isFinite(root.delay) || !Number.isFinite(root.J)) {
      invalidContributionCount += 1;
      continue;
    }
    const receiverState = bodyState(receiver, values, observationTime);
    const sourceState = bodyState(source, values, observationTime - root.delay);
    const sourceToReceiver = sub(sourceState.position, receiverState.position);
    const regularizedDistanceSquared = dot(sourceToReceiver, sourceToReceiver) + eta * eta;
    const regularizedDistance = Math.sqrt(regularizedDistanceSquared);
    const denominator = Math.max(regularizedDistanceSquared * regularizedDistance, Number.EPSILON);
    const signedCharge = bodyCharge(root.receiver) * bodyCharge(root.source);
    const jacobianWeight = 1 / Math.max(Math.abs(root.J), 1e-6);
    const coefficient = relationWeight(root.relation) * signedCharge * jacobianWeight;
    addTo(accelerations[root.receiver], scale(sourceToReceiver, coefficient / denominator));
  }

  return {
    eta,
    observation_time: observationTime,
    root_count: selectedRoots.length,
    invalid_contribution_count: invalidContributionCount,
    accelerations,
  };
}

function layerAverageSpeeds(states) {
  return Object.fromEntries(
    LAYER_ORDER.map((layer) => {
      const layerBodies = POLARITIES.map((polarity) => `${layer}${polarity}`);
      const values = layerBodies.map((bodyId) => speed(states[bodyId].velocity));
      return [layer, values.reduce((sum, value) => sum + value, 0) / values.length];
    })
  );
}

function speedOrderingResidual(layerSpeeds, cF) {
  return Math.max(
    Math.max(0, (cF - layerSpeeds.I) / cF),
    Math.abs(layerSpeeds.M - cF) / cF,
    Math.max(0, (layerSpeeds.O - cF) / cF)
  );
}

function speedOrderingPass(layerSpeeds, cF, tolerance) {
  return speedOrderingResidual(layerSpeeds, cF) <= tolerance;
}

function oneStepDynamicsDiagnostic(row, tier0, configResult, roots, args) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod;
  const cF = configResult.config?.seaCell?.c_f ?? tier0.sea_cell?.c_f ?? 1;
  const tolerance = configResult.config?.sampling?.speedTolerance ?? tier0.tolerances?.speed ?? 0.02;
  const baseDt = Number.isFinite(period) ? period * args.dynamicsStepFraction : null;
  const maxDeltaV = cF * args.dynamicsStepFraction;
  const initialStates = finiteBodyStates(row, 0);
  const accelerations = rootKickAccelerations(row, tier0, configResult, roots, 0);
  const maxAcceleration = Math.max(...BODY_IDS.map((bodyId) => speed(accelerations.accelerations[bodyId])));
  const boundedDt =
    Number.isFinite(baseDt) && maxAcceleration > 0
      ? Math.min(baseDt, maxDeltaV / maxAcceleration)
      : baseDt;
  const steppedStates = Object.fromEntries(
    BODY_IDS.map((bodyId) => {
      const initial = initialStates[bodyId];
      const acceleration = accelerations.accelerations[bodyId];
      const velocity = Number.isFinite(boundedDt)
        ? add(initial.velocity, scale(acceleration, boundedDt))
        : initial.velocity;
      return [
        bodyId,
        {
          position: initial.position,
          velocity,
        },
      ];
    })
  );
  const initialLayerSpeeds = layerAverageSpeeds(initialStates);
  const steppedLayerSpeeds = layerAverageSpeeds(steppedStates);
  const initialResidual = speedOrderingResidual(initialLayerSpeeds, cF);
  const steppedResidual = speedOrderingResidual(steppedLayerSpeeds, cF);
  const pass =
    accelerations.root_count > 0 &&
    accelerations.invalid_contribution_count === 0 &&
    Number.isFinite(boundedDt) &&
    speedOrderingPass(initialLayerSpeeds, cF, tolerance) &&
    speedOrderingPass(steppedLayerSpeeds, cF, tolerance);
  return {
    status: pass ? "one-step-speed-ordering-retained" : "one-step-speed-ordering-failed",
    schema_status: "provisional",
    dynamics_scope: "single bounded root-weighted regularized step",
    observation_time: 0,
    formula:
      "a_r = sum_s w_relation q_r q_s (x_s(t-delay)-x_r(t)) / ((|x_s(t-delay)-x_r(t)|^2 + eta^2)^(3/2) max(|J|,1e-6))",
    regularization_eta: accelerations.eta,
    requested_dt: baseDt,
    bounded_dt: boundedDt,
    max_delta_v: maxDeltaV,
    max_acceleration: maxAcceleration,
    tolerance,
    root_count: accelerations.root_count,
    invalid_contribution_count: accelerations.invalid_contribution_count,
    initial_speed_ordering_residual: initialResidual,
    stepped_speed_ordering_residual: steppedResidual,
    initial_layer_speeds: initialLayerSpeeds,
    stepped_layer_speeds: steppedLayerSpeeds,
    speed_ordering_retained: pass,
    acceptance_scope:
      "This computes only a bounded one-step speed-ordering diagnostic; it does not prove residual convergence, secular-drift absence, root-ledger stability, Delta_k, or branch persistence.",
  };
}

function sourceCoverageComplete(row, samples) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod;
  const maxDelay = row.root_ledger?.maxDelay ?? 0;
  if (!Number.isFinite(period) || samples.length === 0) {
    return false;
  }
  return samples[0].t <= -maxDelay && samples[samples.length - 1].t >= period;
}

function continuationSourceRow(row, tier0, configResult, args) {
  const samples = carrierReplaySamples(row, args.sampleCount);
  const roots = configResult.error ? [] : enumerateCarrierRoots(row, tier0, configResult);
  const rootReplay = rootReplayDiagnostics(roots, configResult);
  const dynamicsDiagnostic = oneStepDynamicsDiagnostic(row, tier0, configResult, roots, args);
  const coverageComplete = sourceCoverageComplete(row, samples);
  return {
    row: row.row,
    schema: "a0-tier1-continuation-source-prototype-row/v1",
    schema_status: "provisional",
    status: coverageComplete && roots.length > 0 ? BLOCKED_STATUS : "blocked_sample_or_root_replay_incomplete",
    failure_code:
      coverageComplete && roots.length > 0
        ? BLOCKED_FAILURE_CODE
        : roots.length === 0
          ? "provisional-root-records-missing"
          : "source-time-coverage-incomplete",
    period: row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null,
    source_row: {
      branch_label: row.branch_label ?? null,
      z_lambda: row.z_lambda ?? null,
    },
    carrier_replay: {
      source_kind: "tier0_carrier_replay",
      dynamics_scope: "no_regularized_delayed_dynamics_integrated",
      center_gauge: row.state_vector?.centerGauge ?? null,
      sample_count: samples.length,
      sample_interval: {
        start: samples[0]?.t ?? null,
        end: samples[samples.length - 1]?.t ?? null,
        required_start: -(row.root_ledger?.maxDelay ?? 0),
        required_end: row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null,
      },
      root_replay: rootReplay,
    },
    diagnostics: {
      speed_ordering: dynamicsDiagnostic,
    },
    samples,
    active_causal_root_ledger: roots,
    validation: {
      status_is_accepted_history_segment: false,
      root_ledger_stable_under_refinement: false,
      residuals_below_tolerance: false,
      speed_ordering_retained: dynamicsDiagnostic.speed_ordering_retained,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      benchmark_inputs_excluded: true,
      source_time_coverage_complete: coverageComplete,
      root_replay_available: roots.length > 0,
    },
    prototype_limits: [
      "samples replay the Tier 0 carrier chart only",
      "roots are provisional carrier roots, not continuation roots",
      "no eta ladder was integrated",
      "no monodromy operator or Delta_k was computed",
      "no dt, history-window, or eta refinement was tested",
    ],
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to emit this carrier-replay source.",
  };
}

function artifactStatus(rows) {
  if (rows.length === 0) {
    return "blocked_no_rows_selected";
  }
  return rows.every((row) => row.status === BLOCKED_STATUS) ? BLOCKED_STATUS : "blocked_replay_incomplete";
}

function run(tier0, tier0Path, configResult, args) {
  const rows = selectRows(tier0, args.rows);
  const emittedRows = rows.map((row) => continuationSourceRow(row, tier0, configResult, args));
  return {
    artifact_schema: "a0-tier1-continuation-source-prototype/v1",
    metadata: {
      artifact: "a0-tier1-carrier-replay-continuation-source",
      schema_status: "provisional",
      status: artifactStatus(emittedRows),
      failure_code: BLOCKED_FAILURE_CODE,
      source_kind: "tier0_carrier_replay",
      dynamics_scope: "no_regularized_delayed_dynamics_integrated",
      generatedAt: new Date().toISOString(),
      sourceTier0: path.relative(process.cwd(), tier0Path),
      sourceConfig: configResult.configPath ? path.relative(process.cwd(), configResult.configPath) : null,
      config_error: configResult.error,
      rowSelector: args.rows,
      note:
        "This source is structurally useful for writer and weak-emitter validation, but it is blocked until direct Tier 1 continuation, refinement, and Floquet diagnostics exist.",
    },
    source_tier0_metadata: tier0.metadata ?? null,
    selected_row_count: rows.length,
    rows: emittedRows,
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
  const configResult = readConfig(resolveConfigPath(args, tier0));
  const output = run(tier0, tier0Path, configResult, args);
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
