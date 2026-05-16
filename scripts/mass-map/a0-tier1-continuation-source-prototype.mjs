#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const DEFAULT_ROWS = "ready";
const DEFAULT_SAMPLE_COUNT = 320;
const DEFAULT_DYNAMICS_STEP_FRACTION = 1 / 4096;
const DEFAULT_ROOT_REFINEMENT_FACTOR = 2;
const DEFAULT_DIRECT_PROBE_STEPS = 8;
const DIRECT_PROBE_LADDER_FACTORS = [4, 16];
const DIRECT_PROBE_MAX_ADAPTIVE_REFINEMENT_LEVEL = 2;
const DEFAULT_J_ATTRIBUTION_FRACTION = 0.75;
const DEFAULT_BRANCH_GAP_DELAY_FACTOR = 4;
const LAYER_ORDER = ["I", "M", "O"];
const POLARITIES = ["+", "-"];
const BODY_IDS = ["I+", "I-", "M+", "M-", "O+", "O-"];
const ROOT_RELATIONS = ["partner", "self", "inter_layer"];
const CHARGE = { "+": 1, "-": -1 };
const SIGN = { "+": 1, "-": -1 };
const BLOCKED_STATUS = "blocked_carrier_replay_only";
const BLOCKED_FAILURE_CODE = "tier1-integrator-not-run";
const SOURCE_TIME_COVERAGE_EPSILON_FACTOR = 16;
const SELF_ROOT_FOLD_SIGN_OFFSETS = [-1, -0.5, 0, 0.5, 1];

function parseArgs(argv) {
  const args = {
    tier0: null,
    config: null,
    rows: DEFAULT_ROWS,
    sampleCount: DEFAULT_SAMPLE_COUNT,
    dynamicsStepFraction: DEFAULT_DYNAMICS_STEP_FRACTION,
    rootRefinementFactor: DEFAULT_ROOT_REFINEMENT_FACTOR,
    directProbeSteps: DEFAULT_DIRECT_PROBE_STEPS,
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
    } else if (arg === "--root-refinement-factor") {
      args.rootRefinementFactor = parsePositiveInteger(argv[++i], "--root-refinement-factor");
    } else if (arg === "--direct-probe-steps") {
      args.directProbeSteps = parsePositiveInteger(argv[++i], "--direct-probe-steps");
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
  --root-refinement-factor N
                       Multiplier for carrier-root replay refinement. Defaults to ${DEFAULT_ROOT_REFINEMENT_FACTOR}.
  --direct-probe-steps N
                       Direct root-recomputing probe steps. Defaults to ${DEFAULT_DIRECT_PROBE_STEPS}.
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

function layerAcceleration(layer, values, t) {
  const state = layerState(layer, values, t);
  const omega = values.omega[layer];
  return scale(state.relative, -omega * omega);
}

function bodyState(body, values, t) {
  const state = layerState(body.layer, values, t);
  return {
    position: scale(state.relative, SIGN[body.polarity] * 0.5),
    velocity: scale(state.relativeVelocity, SIGN[body.polarity] * 0.5),
  };
}

function bodyAcceleration(body, values, t) {
  return scale(layerAcceleration(body.layer, values, t), SIGN[body.polarity] * 0.5);
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
  if (sampleCount <= 1) {
    return [{ t: start }];
  }
  return Array.from({ length: sampleCount }, (_, i) => ({
    t:
      i === 0
        ? start
        : i === sampleCount - 1
          ? period
          : start + ((period - start) * i) / (sampleCount - 1),
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

function refinedConfigResult(tier0, configResult, factor) {
  const baseConfig = carrierReplayConfig(tier0, configResult.config);
  return {
    ...configResult,
    config: {
      ...baseConfig,
      seaCell: { ...baseConfig.seaCell },
      classification: { ...baseConfig.classification },
      sampling: {
        ...baseConfig.sampling,
        sampleCount: Math.max(2, Math.round(baseConfig.sampling.sampleCount * factor)),
        rootSamples: Math.max(2, Math.round(baseConfig.sampling.rootSamples * factor)),
      },
    },
  };
}

function rootStepFor(row, config) {
  const values = rowValues(row);
  const historyWindow = config.sampling.historyPeriods * Math.max(...Object.values(values.periods));
  return historyWindow / config.sampling.rootSamples;
}

function rootTimeTolerance(row) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? 1;
  return Math.max(Math.abs(period) * 1e-10, Number.EPSILON);
}

function rootDelayTolerance(row, baseConfig, refinedConfig) {
  return Math.max(
    (baseConfig.sampling.rootTolerance ?? 0) * 8,
    (refinedConfig.sampling.rootTolerance ?? 0) * 8,
    rootStepFor(row, baseConfig) * 1e-6,
    Number.EPSILON
  );
}

function rootJTolerance(baseConfig, refinedConfig) {
  return Math.max(
    (baseConfig.sampling.rootTolerance ?? 0) * 8,
    (refinedConfig.sampling.rootTolerance ?? 0) * 8,
    1e-8
  );
}

function rootJDriftClassifications() {
  return {
    within_fixed_J_tolerance: 0,
    root_solve_tolerance_dominated: 0,
    velocity_direction_sensitivity_dominated: 0,
    unresolved_branch_chart_instability: 0,
  };
}

function rootJDriftExamples() {
  return Object.fromEntries(Object.keys(rootJDriftClassifications()).map((classification) => [classification, []]));
}

function bodyById(bodyId) {
  return bodyCatalog().find((body) => body.id === bodyId) ?? null;
}

function rootJAtDelay(row, config, root, delay) {
  const receiver = bodyById(root.receiver);
  const source = bodyById(root.source);
  if (!receiver || !source || !Number.isFinite(delay)) {
    return null;
  }
  const values = rowValues(row);
  const cF = config.seaCell.c_f;
  const receiverState = bodyState(receiver, values, root.t);
  const sourceState = bodyState(source, values, root.t - delay);
  const direction = unit(sub(receiverState.position, sourceState.position));
  return 1 - dot(sourceState.velocity, direction) / cF;
}

function rootJFiniteDifferenceStep(row, root, baseConfig, refinedConfig, delayTolerance) {
  const rawStep = Math.max(
    (baseConfig.sampling.rootTolerance ?? 0) * 2,
    (refinedConfig.sampling.rootTolerance ?? 0) * 2,
    Math.abs(root.delay) * 1e-6,
    Number.EPSILON
  );
  return Math.min(rawStep, rootStepFor(row, refinedConfig) / 4, delayTolerance / 2);
}

function rootJDelaySensitivity(row, config, root, delay, step) {
  const minDelay = config.sampling.minDelay ?? 0;
  const lo = Math.max(minDelay, delay - step);
  const hi = delay + step;
  if (!(hi > lo)) {
    return null;
  }
  const jLo = rootJAtDelay(row, config, root, lo);
  const jHi = rootJAtDelay(row, config, root, hi);
  if (jLo === null || jHi === null) {
    return null;
  }
  return Math.abs(jHi - jLo) / (hi - lo);
}

function rootResidualDelayBound(config, root) {
  if (!Number.isFinite(root.residual) || !Number.isFinite(root.J)) {
    return null;
  }
  const cF = config.seaCell.c_f;
  return Math.abs(root.residual) / Math.max(cF * Math.abs(root.J), Number.EPSILON);
}

function nearestSameIdentityDelayGap(roots, root, timeTolerance) {
  const gaps = roots
    .filter(
      (candidate) =>
        candidate !== root &&
        rootIdentityMatches(root, candidate, timeTolerance) &&
        Math.abs(candidate.delay - root.delay) > Number.EPSILON
    )
    .map((candidate) => Math.abs(candidate.delay - root.delay));
  return gaps.length === 0 ? null : Math.min(...gaps);
}

function classifyRootJDrift(row, baseRoot, refinedRoot, baseConfig, refinedConfig, delayDrift, jDrift, options) {
  const { tolerances, nearestDelayGap } = options;
  const baseReplayJ = rootJAtDelay(row, baseConfig, baseRoot, baseRoot.delay);
  const refinedReplayJ = rootJAtDelay(row, baseConfig, baseRoot, refinedRoot.delay);
  const finiteStep = rootJFiniteDifferenceStep(row, baseRoot, baseConfig, refinedConfig, tolerances.delay);
  const localSensitivity = rootJDelaySensitivity(row, baseConfig, baseRoot, baseRoot.delay, finiteStep);
  const baseResidualDelayBound = rootResidualDelayBound(baseConfig, baseRoot);
  const refinedResidualDelayBound = rootResidualDelayBound(refinedConfig, refinedRoot);
  const residualDelayBound = Math.max(baseResidualDelayBound ?? 0, refinedResidualDelayBound ?? 0);
  const finiteDelayReplayJDrift =
    baseReplayJ === null || refinedReplayJ === null ? null : Math.abs(refinedReplayJ - baseReplayJ);
  const recordReplayError =
    baseReplayJ === null || refinedReplayJ === null
      ? null
      : Math.max(Math.abs(baseReplayJ - baseRoot.J), Math.abs(refinedReplayJ - refinedRoot.J));
  const delayReplayResidual =
    finiteDelayReplayJDrift === null ? null : Math.abs(jDrift - finiteDelayReplayJDrift);
  const sensitivityThreshold =
    tolerances.delay > 0 ? tolerances.J / tolerances.delay : Number.POSITIVE_INFINITY;
  const sensitivityBoundAtMatch =
    localSensitivity === null ? null : localSensitivity * delayDrift + tolerances.J;
  const delayToleranceBound =
    localSensitivity === null ? null : localSensitivity * tolerances.delay + tolerances.J;
  const attributionFraction = DEFAULT_J_ATTRIBUTION_FRACTION;
  const branchGapRatio = nearestDelayGap === null ? null : nearestDelayGap / tolerances.delay;
  const branchGapCrowded =
    nearestDelayGap !== null && nearestDelayGap <= DEFAULT_BRANCH_GAP_DELAY_FACTOR * tolerances.delay;
  const minAbsJ = Math.min(Math.abs(baseRoot.J), Math.abs(refinedRoot.J));

  let classification = "within_fixed_J_tolerance";
  if (jDrift > tolerances.J) {
    const replayConsistent =
      recordReplayError !== null &&
      delayReplayResidual !== null &&
      recordReplayError <= tolerances.J &&
      delayReplayResidual <= tolerances.J;
    const driftExplainedByDelay =
      finiteDelayReplayJDrift !== null && finiteDelayReplayJDrift >= attributionFraction * jDrift;
    const toleranceBoundExplains =
      delayToleranceBound !== null && delayToleranceBound >= attributionFraction * jDrift;
    if (!replayConsistent || delayDrift > tolerances.delay || localSensitivity === null || branchGapCrowded) {
      classification = "unresolved_branch_chart_instability";
    } else if (localSensitivity > sensitivityThreshold && (driftExplainedByDelay || toleranceBoundExplains)) {
      classification = "velocity_direction_sensitivity_dominated";
    } else if (driftExplainedByDelay || residualDelayBound >= attributionFraction * delayDrift) {
      classification = "root_solve_tolerance_dominated";
    } else {
      classification = "unresolved_branch_chart_instability";
    }
  }

  return {
    classification,
    receiver: baseRoot.receiver,
    source: baseRoot.source,
    relation: baseRoot.relation,
    t: baseRoot.t,
    base_delay: baseRoot.delay,
    refined_delay: refinedRoot.delay,
    delay_drift: delayDrift,
    base_J: baseRoot.J,
    refined_J: refinedRoot.J,
    J_drift: jDrift,
    min_abs_J: minAbsJ,
    fixed_J_tolerance: tolerances.J,
    delay_match_tolerance: tolerances.delay,
    finite_delay_replay_J_drift: finiteDelayReplayJDrift,
    delay_replay_residual: delayReplayResidual,
    residual_delay_bound: residualDelayBound,
    nearest_same_identity_delay_gap: nearestDelayGap,
    branch_gap_ratio: branchGapRatio,
    local_J_delay_sensitivity: localSensitivity,
    J_sensitivity_threshold: sensitivityThreshold,
    J_sensitivity_bound_at_match: sensitivityBoundAtMatch,
    J_sensitivity_bound_at_delay_tolerance: delayToleranceBound,
    record_replay_error: recordReplayError,
    finite_difference_step: finiteStep,
  };
}

function pushJDriftExample(examples, attribution) {
  const bucket = attribution.classification;
  if (!Object.hasOwn(examples, bucket)) {
    return;
  }
  if (examples[bucket].length < 10) {
    examples[bucket].push(attribution);
  }
}

function rootJDriftAttributionStatus(counts, jDriftCount) {
  if (jDriftCount === 0) {
    return {
      status: "carrier-root-J-drift-attribution-passed",
      attribution_code: "carrier-root-J-drift-none",
    };
  }
  if (counts.unresolved_branch_chart_instability > 0) {
    return {
      status: "carrier-root-J-drift-attribution-failed",
      attribution_code: "carrier-root-J-drift-unresolved-branch-chart-instability",
    };
  }
  if (counts.velocity_direction_sensitivity_dominated > 0) {
    return {
      status: "carrier-root-J-drift-attribution-warning",
      attribution_code: "carrier-root-J-drift-velocity-direction-sensitivity-dominated",
    };
  }
  return {
    status: "carrier-root-J-drift-attribution-warning",
    attribution_code: "carrier-root-J-drift-root-solve-tolerance-dominated",
  };
}

function updateJDriftAttributionMaxima(maxima, attribution) {
  maxima.max_observed_J_drift = Math.max(maxima.max_observed_J_drift, attribution.J_drift);
  maxima.max_observed_delay_drift = Math.max(maxima.max_observed_delay_drift, attribution.delay_drift);
  maxima.max_residual_delay_bound = Math.max(maxima.max_residual_delay_bound, attribution.residual_delay_bound ?? 0);
  maxima.max_abs_dJ_dDelay = Math.max(maxima.max_abs_dJ_dDelay, attribution.local_J_delay_sensitivity ?? 0);
  maxima.max_delay_amplified_J_bound = Math.max(
    maxima.max_delay_amplified_J_bound,
    attribution.J_sensitivity_bound_at_delay_tolerance ?? 0
  );
  maxima.min_abs_J = Math.min(maxima.min_abs_J, attribution.min_abs_J);
  if (attribution.nearest_same_identity_delay_gap !== null) {
    maxima.min_branch_delay_gap = Math.min(maxima.min_branch_delay_gap, attribution.nearest_same_identity_delay_gap);
  }
}

function rootJDriftAttributionDiagnostic(counts, examples, maxima, matchedRootCount, jDriftCount, tolerances) {
  const status = rootJDriftAttributionStatus(counts, jDriftCount);
  return {
    schema: "carrier-root-J-drift-attribution/v1",
    ...status,
    acceptance_scope:
      "Diagnostic-only attribution of carrier-root J drift; does not change accepted-history status or root_ledger_stable_under_refinement.",
    evaluated_match_count: matchedRootCount,
    J_drift_count: jDriftCount,
    classification_counts: counts,
    thresholds: {
      J_match_tolerance: tolerances.J,
      delay_match_tolerance: tolerances.delay,
      attribution_fraction_threshold: DEFAULT_J_ATTRIBUTION_FRACTION,
      branch_gap_delay_factor: DEFAULT_BRANCH_GAP_DELAY_FACTOR,
    },
    maxima: {
      ...maxima,
      min_branch_delay_gap: Number.isFinite(maxima.min_branch_delay_gap) ? maxima.min_branch_delay_gap : null,
      min_abs_J: Number.isFinite(maxima.min_abs_J) ? maxima.min_abs_J : null,
    },
    examples,
  };
}

function rootIdentityMatches(a, b, timeTolerance) {
  return (
    a.receiver === b.receiver &&
    a.source === b.source &&
    a.relation === b.relation &&
    a.status === b.status &&
    Math.abs(a.t - b.t) <= timeTolerance
  );
}

function uniqueRootTimes(roots, timeTolerance) {
  const times = [];
  for (const root of roots) {
    if (!times.some((time) => Math.abs(root.t - time) <= timeTolerance)) {
      times.push(root.t);
    }
  }
  return times.sort((a, b) => a - b);
}

function rootsAtAnyTime(roots, times, timeTolerance) {
  return roots.filter((root) => times.some((time) => Math.abs(root.t - time) <= timeTolerance));
}

function rootLedgerCoverageStable(baseDiagnostics, refinedDiagnostics) {
  const relationCoverageStable = ROOT_RELATIONS.every(
    (relation) =>
      baseDiagnostics.relation_classes_present[relation] === true &&
      refinedDiagnostics.relation_classes_present[relation] === true
  );
  const sourceCoverageStable = BODY_IDS.every(
    (bodyId) => baseDiagnostics.by_source[bodyId] > 0 && refinedDiagnostics.by_source[bodyId] > 0
  );
  return {
    relation_coverage_stable: relationCoverageStable,
    source_coverage_stable: sourceCoverageStable,
  };
}

function compareActiveCarrierRootLedgers(row, baseRoots, refinedRoots, baseConfig, refinedConfig) {
  const timeTolerance = rootTimeTolerance(row);
  const delayTolerance = rootDelayTolerance(row, baseConfig, refinedConfig);
  const jTolerance = rootJTolerance(baseConfig, refinedConfig);
  const tolerances = { delay: delayTolerance, J: jTolerance };
  const baseTimes = uniqueRootTimes(baseRoots, timeTolerance);
  const refinedRootsAtSharedTimes = rootsAtAnyTime(refinedRoots, baseTimes, timeTolerance);
  const usedRefined = new Set();
  const missingInRefined = [];
  const ambiguousMatches = [];
  const jDriftAttributionCounts = rootJDriftClassifications();
  const jDriftAttributionExamples = rootJDriftExamples();
  const jDriftAttributionMaxima = {
    max_observed_J_drift: 0,
    max_observed_delay_drift: 0,
    max_residual_delay_bound: 0,
    max_abs_dJ_dDelay: 0,
    max_delay_amplified_J_bound: 0,
    min_branch_delay_gap: Number.POSITIVE_INFINITY,
    min_abs_J: Number.POSITIVE_INFINITY,
  };
  let maxDelayDrift = 0;
  let maxJDrift = 0;
  let delayDriftCount = 0;
  let jDriftCount = 0;
  let nearSeparatorMatchedCount = 0;

  for (const baseRoot of baseRoots) {
    const candidates = refinedRootsAtSharedTimes
      .map((root, index) => ({ root, index }))
      .filter(({ root, index }) => !usedRefined.has(index) && rootIdentityMatches(baseRoot, root, timeTolerance))
      .map(({ root, index }) => ({
        root,
        index,
        delayDrift: Math.abs(baseRoot.delay - root.delay),
        jDrift: Math.abs(baseRoot.J - root.J),
      }))
      .sort((a, b) => a.delayDrift - b.delayDrift || a.jDrift - b.jDrift);

    if (candidates.length === 0) {
      missingInRefined.push(baseRoot);
      continue;
    }
    if (candidates.length > 1 && Math.abs(candidates[1].delayDrift - candidates[0].delayDrift) <= delayTolerance) {
      ambiguousMatches.push(baseRoot);
      continue;
    }
    const match = candidates[0];
    usedRefined.add(match.index);
    maxDelayDrift = Math.max(maxDelayDrift, match.delayDrift);
    maxJDrift = Math.max(maxJDrift, match.jDrift);
    const jDriftAttribution = classifyRootJDrift(
      row,
      baseRoot,
      match.root,
      baseConfig,
      refinedConfig,
      match.delayDrift,
      match.jDrift,
      {
        tolerances,
        nearestDelayGap: nearestSameIdentityDelayGap(baseRoots, baseRoot, timeTolerance),
      }
    );
    jDriftAttributionCounts[jDriftAttribution.classification] += 1;
    updateJDriftAttributionMaxima(jDriftAttributionMaxima, jDriftAttribution);
    if (match.jDrift > jTolerance) {
      pushJDriftExample(jDriftAttributionExamples, jDriftAttribution);
    }
    if (match.delayDrift > delayTolerance) {
      delayDriftCount += 1;
    }
    if (match.jDrift > jTolerance) {
      jDriftCount += 1;
    }
    if (baseRoot.nearSeparator || match.root.nearSeparator) {
      nearSeparatorMatchedCount += 1;
    }
  }

  const extraInRefinedAtSharedTimes = refinedRootsAtSharedTimes.filter((root, index) => !usedRefined.has(index));
  return {
    shared_observation_time_count: baseTimes.length,
    shared_time_base_active_root_count: baseRoots.length,
    shared_time_refined_active_root_count: refinedRootsAtSharedTimes.length,
    matched_root_count: usedRefined.size,
    missing_in_refined_count: missingInRefined.length,
    extra_in_refined_at_shared_times_count: extraInRefinedAtSharedTimes.length,
    ambiguous_match_count: ambiguousMatches.length,
    near_separator_matched_count: nearSeparatorMatchedCount,
    max_delay_drift: maxDelayDrift,
    max_J_drift: maxJDrift,
    delay_match_tolerance: delayTolerance,
    J_match_tolerance: jTolerance,
    delay_drift_count: delayDriftCount,
    J_drift_count: jDriftCount,
    J_drift_attribution: rootJDriftAttributionDiagnostic(
      jDriftAttributionCounts,
      jDriftAttributionExamples,
      jDriftAttributionMaxima,
      usedRefined.size,
      jDriftCount,
      tolerances
    ),
    intermediate_refined_active_root_count: refinedRoots.length - refinedRootsAtSharedTimes.length,
    examples: {
      missing_in_refined: missingInRefined.slice(0, 10),
      extra_in_refined_at_shared_times: extraInRefinedAtSharedTimes.slice(0, 10),
      ambiguous_matches: ambiguousMatches.slice(0, 10),
    },
  };
}

function carrierRootLedgerRefinementDiagnostic(row, tier0, configResult, baseRoots, args) {
  if (configResult.error) {
    return {
      status: "carrier-root-ledger-refinement-blocked",
      scope: "carrier_root_replay_only",
      failure_code: "carrier-root-refinement-config-unavailable",
      root_ledger_stable_under_refinement: false,
      config_error: configResult.error,
    };
  }
  if (baseRoots.length === 0) {
    return {
      status: "carrier-root-ledger-refinement-blocked",
      scope: "carrier_root_replay_only",
      failure_code: "carrier-root-refinement-base-ledger-empty",
      root_ledger_stable_under_refinement: false,
    };
  }
  const baseConfig = carrierReplayConfig(tier0, configResult.config);
  const refinedResult = refinedConfigResult(tier0, configResult, args.rootRefinementFactor);
  const refinedConfig = carrierReplayConfig(tier0, refinedResult.config);
  const refinedRoots = enumerateCarrierRoots(row, tier0, refinedResult);
  if (refinedRoots.length === 0) {
    return {
      status: "carrier-root-ledger-refinement-blocked",
      scope: "carrier_root_replay_only",
      failure_code: "carrier-root-refinement-refined-ledger-empty",
      root_ledger_stable_under_refinement: false,
      base_active_root_count: baseRoots.length,
      refined_active_root_count: 0,
    };
  }
  const baseDiagnostics = rootReplayDiagnostics(baseRoots, configResult);
  const refinedDiagnostics = rootReplayDiagnostics(refinedRoots, refinedResult);
  const coverage = rootLedgerCoverageStable(baseDiagnostics, refinedDiagnostics);
  const comparison = compareActiveCarrierRootLedgers(row, baseRoots, refinedRoots, baseConfig, refinedConfig);
  const pass =
    coverage.relation_coverage_stable &&
    coverage.source_coverage_stable &&
    comparison.shared_observation_time_count > 0 &&
    comparison.missing_in_refined_count === 0 &&
    comparison.extra_in_refined_at_shared_times_count === 0 &&
    comparison.ambiguous_match_count === 0 &&
    comparison.delay_drift_count === 0;
  let failureCode = null;
  if (!pass) {
    if (comparison.shared_observation_time_count === 0) {
      failureCode = "carrier-root-refinement-shared-times-missing";
    } else if (comparison.missing_in_refined_count > 0) {
      failureCode = "carrier-root-refinement-missing-root";
    } else if (comparison.extra_in_refined_at_shared_times_count > 0) {
      failureCode = "carrier-root-refinement-extra-root-at-shared-time";
    } else if (comparison.ambiguous_match_count > 0) {
      failureCode = "carrier-root-refinement-ambiguous-match";
    } else if (comparison.delay_drift_count > 0) {
      failureCode = "carrier-root-refinement-delay-drift";
    } else {
      failureCode = "carrier-root-refinement-coverage-drift";
    }
  }
  return {
    status: pass ? "carrier-root-ledger-refinement-passed" : "carrier-root-ledger-refinement-failed",
    scope: "carrier_root_replay_only",
    acceptance_scope:
      "Sets only validation.root_ledger_stable_under_refinement for provisional carrier-root identity and delay stability; it does not establish Tier 1 continuation acceptance.",
    failure_code: failureCode,
    warning_code: comparison.J_drift_count > 0 ? "carrier-root-refinement-J-drift-reported" : null,
    root_ledger_stable_under_refinement: pass,
    refinement_factor: args.rootRefinementFactor,
    base_sample_count: baseConfig.sampling.sampleCount,
    refined_sample_count: refinedConfig.sampling.sampleCount,
    base_root_samples: baseConfig.sampling.rootSamples,
    refined_root_samples: refinedConfig.sampling.rootSamples,
    base_active_root_count: baseRoots.length,
    refined_active_root_count: refinedRoots.length,
    relation_coverage_stable: coverage.relation_coverage_stable,
    source_coverage_stable: coverage.source_coverage_stable,
    comparison,
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

function averageVectors(vectors) {
  if (vectors.length === 0) {
    return [0, 0, 0];
  }
  const sum = vectors.reduce((acc, vector) => addTo(acc, vector), [0, 0, 0]);
  return scale(sum, 1 / vectors.length);
}

function maxFinite(values, fallback) {
  const finite = values.filter(Number.isFinite);
  return finite.length === 0 ? fallback : Math.max(...finite);
}

function carrierReplayScales(row, samples, cF) {
  const values = rowValues(row);
  const positionNorms = [];
  const velocityNorms = [];
  for (const sample of samples) {
    for (const bodyId of BODY_IDS) {
      const state = sample.bodies?.[bodyId];
      if (state) {
        positionNorms.push(norm(state.position));
        velocityNorms.push(norm(state.velocity));
      }
    }
  }
  return {
    position: Math.max(1, maxFinite(positionNorms, 0), maxFinite(Object.values(values.radii), 0)),
    velocity: Math.max(1, Math.abs(cF), maxFinite(velocityNorms, 0)),
  };
}

function carrierReplayResidualTolerances(tier0, configResult) {
  const config = carrierReplayConfig(tier0, configResult.config);
  const rootTolerance = config.sampling.rootTolerance ?? tier0.tolerances?.root ?? 1e-6;
  return {
    state_return: config.sampling.stateTolerance ?? config.sampling.phaseTolerance ?? null,
    root: rootTolerance,
    speed: config.sampling.speedTolerance ?? tier0.tolerances?.speed ?? 0.02,
    center_gauge: config.sampling.driftTolerance ?? config.sampling.phaseTolerance ?? Math.max(rootTolerance, Number.EPSILON),
  };
}

function sampleCenterGauge(row, sample) {
  const values = rowValues(row);
  const bodies = bodyCatalog();
  const positions = bodies.map((body) => sample.bodies[body.id]?.position ?? bodyState(body, values, sample.t).position);
  const velocities = bodies.map((body) => sample.bodies[body.id]?.velocity ?? bodyState(body, values, sample.t).velocity);
  const accelerations = bodies.map((body) => bodyAcceleration(body, values, sample.t));
  return {
    t: sample.t,
    position: averageVectors(positions),
    velocity: averageVectors(velocities),
    acceleration: averageVectors(accelerations),
  };
}

function centerSlopeVector(centers, field) {
  if (centers.length < 2) {
    return [0, 0, 0];
  }
  const meanT = centers.reduce((sum, center) => sum + center.t, 0) / centers.length;
  const meanVector = averageVectors(centers.map((center) => center[field]));
  const numerator = [0, 0, 0];
  let denominator = 0;
  for (const center of centers) {
    const dt = center.t - meanT;
    addTo(numerator, scale(sub(center[field], meanVector), dt));
    denominator += dt * dt;
  }
  return denominator > 0 ? scale(numerator, 1 / denominator) : [0, 0, 0];
}

function centerGaugeDriftBudget(row, samples, scales, period, tolerance) {
  const centers = samples.map((sample) => sampleCenterGauge(row, sample));
  const first = centers[0] ?? { position: [0, 0, 0], velocity: [0, 0, 0] };
  const last = centers[centers.length - 1] ?? first;
  let maxCenterPositionAbs = 0;
  let maxCenterVelocityAbs = 0;
  let maxCenterAccelerationAbs = 0;
  let maxCenterDrift = 0;
  let samplesOverCenterTolerance = 0;
  const centerDriftExamples = [];

  for (const center of centers) {
    const centerPositionAbs = norm(center.position) / scales.position;
    const centerVelocityAbs = norm(center.velocity) / scales.velocity;
    const centerAccelerationAbs = norm(center.acceleration) / scales.velocity;
    const centerDrift = Math.max(
      norm(sub(center.position, first.position)) / scales.position,
      norm(sub(center.velocity, first.velocity)) / scales.velocity
    );
    maxCenterPositionAbs = Math.max(maxCenterPositionAbs, centerPositionAbs);
    maxCenterVelocityAbs = Math.max(maxCenterVelocityAbs, centerVelocityAbs);
    maxCenterAccelerationAbs = Math.max(maxCenterAccelerationAbs, centerAccelerationAbs);
    maxCenterDrift = Math.max(maxCenterDrift, centerDrift);
    if (Number.isFinite(tolerance) && centerDrift > tolerance) {
      samplesOverCenterTolerance += 1;
      if (centerDriftExamples.length < 10) {
        centerDriftExamples.push({ t: center.t, center_drift: centerDrift });
      }
    }
  }

  const centerEndpointDrift = Math.max(
    norm(sub(last.position, first.position)) / scales.position,
    norm(sub(last.velocity, first.velocity)) / scales.velocity
  );
  const positionSlope = centerSlopeVector(centers, "position");
  const velocitySlope = centerSlopeVector(centers, "velocity");
  const centerSlopePosition = Number.isFinite(period) ? (norm(positionSlope) * Math.abs(period)) / scales.position : null;
  const centerSlopeVelocity = Number.isFinite(period) ? (norm(velocitySlope) * Math.abs(period)) / scales.velocity : null;

  return {
    max_center_position_abs: maxCenterPositionAbs,
    max_center_velocity_abs: maxCenterVelocityAbs,
    max_center_acceleration_abs: maxCenterAccelerationAbs,
    max_center_drift: maxCenterDrift,
    center_endpoint_drift: centerEndpointDrift,
    center_slope_position: centerSlopePosition,
    center_slope_velocity: centerSlopeVelocity,
    samples_over_center_tolerance: samplesOverCenterTolerance,
    examples: centerDriftExamples,
  };
}

function relationRootBudget() {
  return Object.fromEntries(
    ROOT_RELATIONS.map((relation) => [
      relation,
      {
        root_count: 0,
        max_root_residual: 0,
        max_root_residual_over_tolerance: 0,
        roots_over_tolerance: 0,
      },
    ])
  );
}

function rootResidualBudget(row, roots, cF, rootTolerance) {
  const values = rowValues(row);
  const byRelation = relationRootBudget();
  const examples = [];
  let rootsEvaluated = 0;
  let rootsOverTolerance = 0;
  let maxRootResidual = 0;
  let maxRootResidualOverTolerance = 0;

  for (const root of roots) {
    const receiver = bodyById(root.receiver);
    const source = bodyById(root.source);
    if (!receiver || !source || !Number.isFinite(root.delay)) {
      continue;
    }
    const residual = Math.abs(rootFunction(receiver, source, values, root.t, root.delay, cF));
    const residualOverTolerance = Number.isFinite(rootTolerance) && rootTolerance > 0 ? residual / rootTolerance : null;
    rootsEvaluated += 1;
    maxRootResidual = Math.max(maxRootResidual, residual);
    if (residualOverTolerance !== null) {
      maxRootResidualOverTolerance = Math.max(maxRootResidualOverTolerance, residualOverTolerance);
    }
    if (Object.hasOwn(byRelation, root.relation)) {
      byRelation[root.relation].root_count += 1;
      byRelation[root.relation].max_root_residual = Math.max(byRelation[root.relation].max_root_residual, residual);
      byRelation[root.relation].max_root_residual_over_tolerance = Math.max(
        byRelation[root.relation].max_root_residual_over_tolerance,
        residualOverTolerance ?? 0
      );
    }
    if (residualOverTolerance !== null && residualOverTolerance > 1) {
      rootsOverTolerance += 1;
      if (Object.hasOwn(byRelation, root.relation)) {
        byRelation[root.relation].roots_over_tolerance += 1;
      }
      if (examples.length < 10) {
        examples.push({
          receiver: root.receiver,
          source: root.source,
          relation: root.relation,
          t: root.t,
          delay: root.delay,
          root_residual: residual,
          root_residual_over_tolerance: residualOverTolerance,
        });
      }
    }
  }

  return {
    roots_evaluated: rootsEvaluated,
    roots_over_tolerance: rootsOverTolerance,
    max_root_residual: maxRootResidual,
    max_root_residual_over_tolerance: maxRootResidualOverTolerance,
    by_relation: byRelation,
    examples,
  };
}

function carrierReturnResidualBudget(row, samples, period, scales, stateReturnTolerance) {
  if (!Number.isFinite(period)) {
    return {
      evaluated_sample_count: 0,
      samples_over_state_tolerance: 0,
      max_state_return_residual: null,
      examples: [],
    };
  }
  let maxStateReturnResidual = 0;
  let samplesOverStateTolerance = 0;
  const examples = [];
  for (const sample of samples) {
    const returnStates = finiteBodyStates(row, sample.t + period);
    let sampleResidual = 0;
    for (const bodyId of BODY_IDS) {
      const state = sample.bodies?.[bodyId];
      const returnState = returnStates[bodyId];
      if (!state || !returnState) {
        continue;
      }
      sampleResidual = Math.max(
        sampleResidual,
        norm(sub(returnState.position, state.position)) / scales.position,
        norm(sub(returnState.velocity, state.velocity)) / scales.velocity
      );
    }
    maxStateReturnResidual = Math.max(maxStateReturnResidual, sampleResidual);
    if (Number.isFinite(stateReturnTolerance) && sampleResidual > stateReturnTolerance) {
      samplesOverStateTolerance += 1;
      if (examples.length < 10) {
        examples.push({ t: sample.t, state_return_residual: sampleResidual });
      }
    }
  }
  return {
    evaluated_sample_count: samples.length,
    samples_over_state_tolerance: samplesOverStateTolerance,
    max_state_return_residual: maxStateReturnResidual,
    examples,
  };
}

function speedResidualBudget(samples, cF, speedTolerance) {
  let maxSpeedOrderingResidual = 0;
  let samplesOverSpeedTolerance = 0;
  const examples = [];
  for (const sample of samples) {
    const residual = speedOrderingResidual(layerAverageSpeeds(sample.bodies), cF);
    maxSpeedOrderingResidual = Math.max(maxSpeedOrderingResidual, residual);
    if (Number.isFinite(speedTolerance) && residual > speedTolerance) {
      samplesOverSpeedTolerance += 1;
      if (examples.length < 10) {
        examples.push({ t: sample.t, speed_ordering_residual: residual });
      }
    }
  }
  return {
    samples_over_speed_tolerance: samplesOverSpeedTolerance,
    max_speed_ordering_residual: maxSpeedOrderingResidual,
    examples,
  };
}

function carrierTrapezoidResidualBudget(row, samples, scales) {
  const values = rowValues(row);
  const bodies = bodyCatalog();
  const invalidIntervals = [];
  let intervalCount = 0;
  let maxPositionResidual = 0;
  let maxVelocityResidual = 0;
  let maxNormalizedPositionResidual = 0;
  let maxNormalizedVelocityResidual = 0;

  for (let i = 0; i < samples.length - 1; i += 1) {
    const current = samples[i];
    const next = samples[i + 1];
    const dt = next.t - current.t;
    if (!Number.isFinite(dt) || dt <= 0) {
      invalidIntervals.push({ index: i, t0: current.t, t1: next.t, dt });
      continue;
    }
    intervalCount += 1;
    for (const body of bodies) {
      const currentState = current.bodies[body.id];
      const nextState = next.bodies[body.id];
      if (!currentState || !nextState) {
        invalidIntervals.push({ index: i, body: body.id, t0: current.t, t1: next.t, reason: "missing-body-state" });
        continue;
      }
      const currentAcceleration = bodyAcceleration(body, values, current.t);
      const nextAcceleration = bodyAcceleration(body, values, next.t);
      const positionResidual = sub(
        sub(nextState.position, currentState.position),
        scale(add(currentState.velocity, nextState.velocity), 0.5 * dt)
      );
      const velocityResidual = sub(
        sub(nextState.velocity, currentState.velocity),
        scale(add(currentAcceleration, nextAcceleration), 0.5 * dt)
      );
      const positionScale = Math.max(
        norm(sub(nextState.position, currentState.position)),
        norm(scale(add(currentState.velocity, nextState.velocity), 0.5 * dt)),
        Number.EPSILON
      );
      const velocityScale = Math.max(
        norm(sub(nextState.velocity, currentState.velocity)),
        norm(scale(add(currentAcceleration, nextAcceleration), 0.5 * dt)),
        Number.EPSILON
      );
      const positionResidualNorm = norm(positionResidual);
      const velocityResidualNorm = norm(velocityResidual);
      maxPositionResidual = Math.max(maxPositionResidual, positionResidualNorm);
      maxVelocityResidual = Math.max(maxVelocityResidual, velocityResidualNorm);
      maxNormalizedPositionResidual = Math.max(maxNormalizedPositionResidual, positionResidualNorm / positionScale);
      maxNormalizedVelocityResidual = Math.max(maxNormalizedVelocityResidual, velocityResidualNorm / velocityScale);
    }
  }

  return {
    interval_count: intervalCount,
    invalid_interval_count: invalidIntervals.length,
    invalid_intervals: invalidIntervals.slice(0, 10),
    max_position_trapezoid_residual: maxPositionResidual,
    max_velocity_trapezoid_residual: maxVelocityResidual,
    max_normalized_position_trapezoid_residual: maxNormalizedPositionResidual,
    max_normalized_velocity_trapezoid_residual: maxNormalizedVelocityResidual,
    finite_trapezoid_budget:
      Number.isFinite(maxPositionResidual) &&
      Number.isFinite(maxVelocityResidual) &&
      Number.isFinite(maxNormalizedPositionResidual) &&
      Number.isFinite(maxNormalizedVelocityResidual) &&
      invalidIntervals.length === 0,
  };
}

function carrierReplayResidualAndCenterDriftDiagnostic(row, tier0, configResult, samples, roots) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const config = carrierReplayConfig(tier0, configResult.config);
  const cF = config.seaCell.c_f;
  const scales = carrierReplayScales(row, samples, cF);
  const tolerances = carrierReplayResidualTolerances(tier0, configResult);
  const stateReturn = carrierReturnResidualBudget(row, samples, period, scales, tolerances.state_return);
  const speedBudget = speedResidualBudget(samples, cF, tolerances.speed);
  const rootBudget = rootResidualBudget(row, roots, cF, tolerances.root);
  const centerBudget = centerGaugeDriftBudget(row, samples, scales, period, tolerances.center_gauge);
  const trapezoidBudget = carrierTrapezoidResidualBudget(row, samples, scales);
  const warning =
    rootBudget.roots_over_tolerance > 0 ||
    stateReturn.samples_over_state_tolerance > 0 ||
    speedBudget.samples_over_speed_tolerance > 0 ||
    centerBudget.samples_over_center_tolerance > 0 ||
    trapezoidBudget.invalid_interval_count > 0;

  return {
    schema: "carrier-replay-residual-budget/v1",
    status: warning ? "carrier-replay-residual-budget-warning" : "carrier-replay-residual-budget-recorded",
    dynamics_scope: "carrier_replay_residual_budget_only",
    acceptance_scope:
      "Carrier replay residual and center-gauge audit only; does not establish Tier 1 residual convergence or secular-drift absence.",
    formulas: {
      state_return_residual: "epsilon_state(t) = max_b max(|x_b(t+T)-x_b(t)|/R_scale, |v_b(t+T)-v_b(t)|/V_scale)",
      root_residual: "epsilon_root = ||x_r(t)-x_s(t-delay)|| - c_F delay",
      position_trapezoid_residual: "e_x = x(t+h)-x(t)-0.5*h*(v(t+h)+v(t))",
      velocity_trapezoid_residual: "e_v = v(t+h)-v(t)-0.5*h*(a_carrier(t+h)+a_carrier(t))",
      center_gauge_position: "X_c(t) = (1/6) sum_b x_b(t)",
      center_gauge_velocity: "V_c(t) = (1/6) sum_b v_b(t)",
    },
    sample_count: samples.length,
    sample_interval: {
      start: samples[0]?.t ?? null,
      end: samples[samples.length - 1]?.t ?? null,
    },
    tolerances,
    scales,
    maxima: {
      state_return_residual: stateReturn.max_state_return_residual,
      speed_ordering_residual: speedBudget.max_speed_ordering_residual,
      root_residual: rootBudget.max_root_residual,
      root_residual_over_tolerance: rootBudget.max_root_residual_over_tolerance,
      center_position_abs: centerBudget.max_center_position_abs,
      center_velocity_abs: centerBudget.max_center_velocity_abs,
      center_acceleration_abs: centerBudget.max_center_acceleration_abs,
      center_drift: centerBudget.max_center_drift,
      center_endpoint_drift: centerBudget.center_endpoint_drift,
      center_slope_position: centerBudget.center_slope_position,
      center_slope_velocity: centerBudget.center_slope_velocity,
      position_trapezoid_residual: trapezoidBudget.max_position_trapezoid_residual,
      velocity_trapezoid_residual: trapezoidBudget.max_velocity_trapezoid_residual,
    },
    counts: {
      roots_evaluated: rootBudget.roots_evaluated,
      roots_over_tolerance: rootBudget.roots_over_tolerance,
      samples_over_state_tolerance: stateReturn.samples_over_state_tolerance,
      samples_over_speed_tolerance: speedBudget.samples_over_speed_tolerance,
      samples_over_center_tolerance: centerBudget.samples_over_center_tolerance,
      invalid_trapezoid_intervals: trapezoidBudget.invalid_interval_count,
    },
    by_relation: rootBudget.by_relation,
    kinematic_trapezoid_budget: trapezoidBudget,
    examples: {
      root_residual_over_tolerance: rootBudget.examples,
      state_return_over_tolerance: stateReturn.examples,
      speed_ordering_over_tolerance: speedBudget.examples,
      center_drift_samples: centerBudget.examples,
    },
    validation_effect: {
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      reason: "carrier replay is not a direct regularized Tier 1 delayed-dynamics integration",
    },
  };
}

function sortedRootObservationTimes(row, roots) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const tolerance = rootTimeTolerance(row);
  const times = uniqueRootTimes(
    roots.filter((root) => Number.isFinite(root.t) && root.t >= -tolerance && (!Number.isFinite(period) || root.t < period)),
    tolerance
  );
  if (times.length === 0 || Math.abs(times[0]) > tolerance) {
    times.unshift(0);
  }
  return times;
}

function cloneStates(states) {
  return Object.fromEntries(
    Object.entries(states).map(([bodyId, state]) => [
      bodyId,
      {
        position: [...state.position],
        velocity: [...state.velocity],
      },
    ])
  );
}

function centerGaugeFromStates(states) {
  return {
    position: averageVectors(BODY_IDS.map((bodyId) => states[bodyId].position)),
    velocity: averageVectors(BODY_IDS.map((bodyId) => states[bodyId].velocity)),
  };
}

function meanSquaredSpeed(states) {
  return BODY_IDS.reduce((sum, bodyId) => sum + dot(states[bodyId].velocity, states[bodyId].velocity), 0) / BODY_IDS.length;
}

function finiteStateMap(states) {
  return BODY_IDS.every((bodyId) => {
    const state = states[bodyId];
    return (
      state &&
      state.position.every(Number.isFinite) &&
      state.velocity.every(Number.isFinite)
    );
  });
}

function maxEndpointStateDrift(states, referenceStates, scales) {
  let maxPositionDrift = 0;
  let maxVelocityDrift = 0;
  for (const bodyId of BODY_IDS) {
    maxPositionDrift = Math.max(maxPositionDrift, norm(sub(states[bodyId].position, referenceStates[bodyId].position)));
    maxVelocityDrift = Math.max(maxVelocityDrift, norm(sub(states[bodyId].velocity, referenceStates[bodyId].velocity)));
  }
  return {
    max_position_drift: maxPositionDrift,
    max_velocity_drift: maxVelocityDrift,
    max_normalized_position_drift: maxPositionDrift / scales.position,
    max_normalized_velocity_drift: maxVelocityDrift / scales.velocity,
  };
}

function frozenRootOnePeriodDriftDiagnostic(row, tier0, configResult, roots, samples) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const config = carrierReplayConfig(tier0, configResult.config);
  const cF = config.seaCell.c_f;
  const speedTolerance = config.sampling.speedTolerance ?? tier0.tolerances?.speed ?? 0.02;
  const scales = carrierReplayScales(row, samples, cF);
  const observationTimes = sortedRootObservationTimes(row, roots);
  const initialStates = finiteBodyStates(row, 0);
  const endpointReferenceStates = Number.isFinite(period) ? finiteBodyStates(row, period) : initialStates;
  const states = cloneStates(initialStates);
  const stepExamples = [];
  let intervalCount = 0;
  let rootObservationCount = 0;
  let invalidContributionCount = 0;
  let maxAcceleration = 0;
  let maxStepDeltaV = 0;
  let maxStepDeltaX = 0;
  let maxStepDt = 0;

  if (!Number.isFinite(period) || period <= 0) {
    return {
      schema: "frozen-root-one-period-drift/v1",
      status: "frozen-root-one-period-drift-blocked",
      failure_code: "period-unavailable",
      acceptance_scope:
        "Frozen-root one-period drift diagnostic only; does not establish accepted Tier 1 continuation or Floquet stability.",
      validation_effect: {
        status_is_accepted_history_segment: false,
        Delta_k_positive: false,
        same_branch_persists_across_eta_ladder: false,
      },
    };
  }

  for (let i = 0; i < observationTimes.length; i += 1) {
    const t = observationTimes[i];
    const nextT = i + 1 < observationTimes.length ? observationTimes[i + 1] : period;
    const dt = nextT - t;
    if (!Number.isFinite(dt) || dt <= 0) {
      continue;
    }
    const accelerationRecord = rootKickAccelerations(row, tier0, configResult, roots, t);
    rootObservationCount += accelerationRecord.root_count > 0 ? 1 : 0;
    invalidContributionCount += accelerationRecord.invalid_contribution_count;
    intervalCount += 1;
    maxStepDt = Math.max(maxStepDt, dt);
    for (const bodyId of BODY_IDS) {
      const state = states[bodyId];
      const acceleration = accelerationRecord.accelerations[bodyId];
      const deltaV = scale(acceleration, dt);
      const deltaX = add(scale(state.velocity, dt), scale(acceleration, 0.5 * dt * dt));
      state.position = add(state.position, deltaX);
      state.velocity = add(state.velocity, deltaV);
      maxAcceleration = Math.max(maxAcceleration, speed(acceleration));
      maxStepDeltaV = Math.max(maxStepDeltaV, speed(deltaV));
      maxStepDeltaX = Math.max(maxStepDeltaX, norm(deltaX));
    }
    if (stepExamples.length < 10) {
      stepExamples.push({
        t,
        dt,
        root_count: accelerationRecord.root_count,
        max_step_delta_v: maxStepDeltaV,
        max_step_delta_x: maxStepDeltaX,
      });
    }
  }

  const endpointDrift = maxEndpointStateDrift(states, endpointReferenceStates, scales);
  const endpointCenter = centerGaugeFromStates(states);
  const referenceCenter = centerGaugeFromStates(endpointReferenceStates);
  const initialSpeedEnergy = meanSquaredSpeed(initialStates);
  const endpointSpeedEnergy = meanSquaredSpeed(states);
  const speedEnergyDrift =
    initialSpeedEnergy > 0 ? Math.abs(endpointSpeedEnergy - initialSpeedEnergy) / initialSpeedEnergy : null;
  const endpointLayerSpeeds = layerAverageSpeeds(states);
  const endpointSpeedOrderingResidual = speedOrderingResidual(endpointLayerSpeeds, cF);
  const numericallyBounded =
    finiteStateMap(states) &&
    Number.isFinite(endpointDrift.max_normalized_position_drift) &&
    Number.isFinite(endpointDrift.max_normalized_velocity_drift) &&
    Number.isFinite(endpointSpeedOrderingResidual) &&
    invalidContributionCount === 0;
  const driftTolerances = {
    endpoint_state_drift: 1,
    endpoint_speed_ordering: speedTolerance,
    speed_energy_drift: 1,
  };
  const dynamicallyBounded =
    numericallyBounded &&
    endpointDrift.max_normalized_position_drift <= driftTolerances.endpoint_state_drift &&
    endpointDrift.max_normalized_velocity_drift <= driftTolerances.endpoint_state_drift &&
    endpointSpeedOrderingResidual <= driftTolerances.endpoint_speed_ordering &&
    (speedEnergyDrift === null || speedEnergyDrift <= driftTolerances.speed_energy_drift);

  return {
    schema: "frozen-root-one-period-drift/v1",
    status: dynamicallyBounded ? "frozen-root-one-period-drift-recorded" : "frozen-root-one-period-drift-warning",
    warning_code: dynamicallyBounded ? null : "frozen-root-kick-map-large-endpoint-drift",
    dynamics_scope: "frozen_root_replay_kick_map_only",
    acceptance_scope:
      "Frozen-root one-period drift diagnostic only; does not establish accepted Tier 1 continuation, residual convergence, eta persistence, or Floquet stability.",
    formula:
      "x_{n+1}=x_n+v_n dt+0.5 a_root(t_n) dt^2, v_{n+1}=v_n+a_root(t_n) dt",
    period,
    observation_time_count: observationTimes.length,
    interval_count: intervalCount,
    root_observation_count: rootObservationCount,
    invalid_contribution_count: invalidContributionCount,
    scales,
    drift_tolerances: driftTolerances,
    maxima: {
      max_step_dt: maxStepDt,
      max_acceleration: maxAcceleration,
      max_step_delta_v: maxStepDeltaV,
      max_step_delta_x: maxStepDeltaX,
      endpoint_speed_ordering_residual: endpointSpeedOrderingResidual,
      speed_energy_drift: speedEnergyDrift,
      endpoint_center_position_drift: norm(sub(endpointCenter.position, referenceCenter.position)) / scales.position,
      endpoint_center_velocity_drift: norm(sub(endpointCenter.velocity, referenceCenter.velocity)) / scales.velocity,
      ...endpointDrift,
    },
    endpoint_layer_speeds: endpointLayerSpeeds,
    numerically_bounded: numericallyBounded,
    dynamically_bounded: dynamicallyBounded,
    step_examples: stepExamples,
    validation_effect: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      reason: "roots and accelerations are replayed from the Tier 0 carrier chart rather than recomputed from a direct Tier 1 delayed-dynamics trajectory",
    },
  };
}

function interpolateBodyState(a, b, t) {
  const span = b.t - a.t;
  if (!(span > 0)) {
    return null;
  }
  const weight = (t - a.t) / span;
  return Object.fromEntries(
    BODY_IDS.map((bodyId) => {
      const aState = a.states[bodyId];
      const bState = b.states[bodyId];
      return [
        bodyId,
        {
          position: add(scale(aState.position, 1 - weight), scale(bState.position, weight)),
          velocity: add(scale(aState.velocity, 1 - weight), scale(bState.velocity, weight)),
        },
      ];
    })
  );
}

function stateHistoryAt(row, history, t) {
  const tolerance = 1e-12;
  if (history.length === 0 || t < history[0].t - tolerance) {
    return finiteBodyStates(row, t);
  }
  for (const record of history) {
    if (Math.abs(record.t - t) <= tolerance) {
      return record.states;
    }
  }
  for (let i = 0; i < history.length - 1; i += 1) {
    const current = history[i];
    const next = history[i + 1];
    if (t >= current.t - tolerance && t <= next.t + tolerance) {
      return interpolateBodyState(current, next, t);
    }
  }
  const last = history[history.length - 1];
  return t <= last.t + tolerance ? last.states : null;
}

function directRootFunction(receiverState, sourceState, delay, cF) {
  return norm(sub(receiverState.position, sourceState.position)) - cF * delay;
}

function directRootValue(row, history, receiverState, source, t, delay, cF) {
  const sourceStates = stateHistoryAt(row, history, t - delay);
  const sourceState = sourceStates?.[source.id] ?? null;
  return sourceState ? directRootFunction(receiverState, sourceState, delay, cF) : null;
}

function solveDirectRoot(row, history, receiverState, source, t, lo, hi, cF, tolerance, options = {}) {
  let a = lo;
  let b = hi;
  let fa = directRootValue(row, history, receiverState, source, t, a, cF);
  let fb = directRootValue(row, history, receiverState, source, t, b, cF);
  if (fa === null || fb === null) {
    return null;
  }
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
    const fm = directRootValue(row, history, receiverState, source, t, mid, cF);
    if (fm === null) {
      return null;
    }
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

function buildDirectRootRecord(row, history, receiver, source, receiverState, t, rootDelay, cF, config) {
  const sourceStates = stateHistoryAt(row, history, t - rootDelay);
  const sourceState = sourceStates?.[source.id] ?? null;
  if (!sourceState) {
    return null;
  }
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
    residual: Math.abs(directRootFunction(receiverState, sourceState, rootDelay, cF)),
    J: j,
    nearSeparator: rootClass.nearSeparator,
    nearZeroSelf: rootClass.nearZeroSelf,
    selfDelayClass: rootClass.selfDelayClass,
    selfFoldLayer: rootClass.selfFoldLayer,
    delayedSelfHit: rootClass.delayedSelfHit,
    admissibleDelayedSelfHit: rootClass.admissibleDelayedSelfHit,
    provenance: "tier1_direct_root_recompute_probe",
  };
}

function enumerateDirectRoots(row, tier0, configResult, history, t, states) {
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

  for (const receiver of bodies) {
    const receiverState = states[receiver.id];
    for (const source of bodies) {
      const relation = sourceRelation(receiver, source);
      let priorDelay = sampling.minDelay;
      let priorValue = directRootValue(row, history, receiverState, source, t, priorDelay, cF);
      for (let index = 1; index <= sampling.rootSamples; index += 1) {
        const delay = sampling.minDelay + index * rootStep;
        const value = directRootValue(row, history, receiverState, source, t, delay, cF);
        if (priorValue === null || value === null) {
          priorDelay = delay;
          priorValue = value;
          continue;
        }
        const hasBracket = priorValue === 0 || value === 0 || priorValue * value < 0;
        if (hasBracket) {
          const rootDelay = solveDirectRoot(
            row,
            history,
            receiverState,
            source,
            t,
            priorDelay,
            delay,
            cF,
            sampling.rootTolerance
          );
          if (rootDelay !== null) {
            const root = buildDirectRootRecord(row, history, receiver, source, receiverState, t, rootDelay, cF, config);
            if (root) {
              pushDistinctRoot(roots, root, duplicateTolerance);
            }
            if (relation === "self" && rootDelay <= selfWindow.foldLayerDelay && delay > selfWindow.foldLayerDelay) {
              const delayedRootDelay = solveDirectRoot(
                row,
                history,
                receiverState,
                source,
                t,
                selfWindow.foldLayerDelay,
                delay,
                cF,
                sampling.rootTolerance,
                { ignoreLoEndpoint: true }
              );
              if (delayedRootDelay !== null) {
                const delayedRoot = buildDirectRootRecord(
                  row,
                  history,
                  receiver,
                  source,
                  receiverState,
                  t,
                  delayedRootDelay,
                  cF,
                  config
                );
                if (delayedRoot) {
                  pushDistinctRoot(roots, delayedRoot, duplicateTolerance);
                }
              }
            }
          }
        }
        priorDelay = delay;
        priorValue = value;
      }
    }
  }
  return roots.filter((root) => root.status === "active");
}

function directRootKickAccelerations(row, tier0, configResult, roots, states, history, observationTime) {
  const eta = regularizationEta(row, tier0, configResult);
  const accelerations = Object.fromEntries(BODY_IDS.map((bodyId) => [bodyId, [0, 0, 0]]));
  let invalidContributionCount = 0;

  for (const root of roots) {
    const receiverState = states[root.receiver];
    const sourceStates = stateHistoryAt(row, history, observationTime - root.delay);
    const sourceState = sourceStates?.[root.source] ?? null;
    if (!receiverState || !sourceState || !Number.isFinite(root.delay) || !Number.isFinite(root.J)) {
      invalidContributionCount += 1;
      continue;
    }
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
    root_count: roots.length,
    invalid_contribution_count: invalidContributionCount,
    accelerations,
  };
}

function directRootBranchKey(root) {
  return [root.receiver, root.source, root.relation, root.status].join("|");
}

function directRootBranchCounts(roots) {
  const counts = new Map();
  for (const root of roots) {
    const key = directRootBranchKey(root);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return counts;
}

function retainedRootBranchCount(initialCounts, currentCounts) {
  let retained = 0;
  for (const [key, count] of initialCounts.entries()) {
    retained += Math.min(count, currentCounts.get(key) ?? 0);
  }
  return retained;
}

function missingRootBranchKeys(initialCounts, currentCounts) {
  const missing = [];
  for (const [key, count] of initialCounts.entries()) {
    const current = currentCounts.get(key) ?? 0;
    for (let i = current; i < count; i += 1) {
      missing.push(key);
    }
  }
  return missing;
}

function extraRootBranchKeys(initialCounts, currentCounts) {
  const extra = [];
  for (const [key, count] of currentCounts.entries()) {
    const initial = initialCounts.get(key) ?? 0;
    for (let i = initial; i < count; i += 1) {
      extra.push(key);
    }
  }
  return extra;
}

function extraRootBranchCount(initialCounts, currentCounts) {
  let extra = 0;
  for (const [key, count] of currentCounts.entries()) {
    extra += Math.max(0, count - (initialCounts.get(key) ?? 0));
  }
  return extra;
}

function directRootRecordSummary(root) {
  return {
    receiver: root.receiver,
    source: root.source,
    relation: root.relation,
    status: root.status,
    delay: root.delay,
    J: root.J,
    residual: root.residual,
  };
}

function extraRootBranchRecords(initialCounts, roots) {
  const currentCounts = directRootBranchCounts(roots);
  const surplusKeys = [];
  for (const [key, count] of currentCounts.entries()) {
    if (count > (initialCounts.get(key) ?? 0)) {
      surplusKeys.push(key);
    }
  }
  return directRootRecordsForBranchKeys(roots, surplusKeys);
}

function directRootRecordsForBranchKeys(roots, branchKeys) {
  const keySet = new Set(branchKeys);
  return roots
    .filter((root) => keySet.has(directRootBranchKey(root)))
    .sort((a, b) => {
      const keyOrder = directRootBranchKey(a).localeCompare(directRootBranchKey(b));
      return keyOrder === 0 ? a.delay - b.delay : keyOrder;
    })
    .map((root) => ({
      branch_key: directRootBranchKey(root),
      ...directRootRecordSummary(root),
    }));
}

function parseDirectRootBranchKey(branchKey) {
  const [receiver, source, relation, status] = String(branchKey).split("|");
  return { receiver, source, relation, status };
}

function isSelfActiveRootBranchKey(branchKey) {
  const parsed = parseDirectRootBranchKey(branchKey);
  return parsed.receiver === parsed.source && parsed.relation === "self" && parsed.status === "active";
}

function rawDirectRootRecordsForBranchKey(roots, branchKey) {
  return roots
    .filter((root) => directRootBranchKey(root) === branchKey)
    .sort((a, b) => a.delay - b.delay);
}

function unmatchedCurrentRootRecords(previousRecords, currentRecords, delayTolerance) {
  return currentRecords.filter(
    (current) =>
      !previousRecords.some((previous) => Math.abs(previous.delay - current.delay) <= delayTolerance)
  );
}

function foldSplittingDelayRadius(row, config, delay) {
  const rootStep = rootStepFor(row, config);
  const rootTolerance = config.sampling.rootTolerance ?? 0;
  const minDelay = config.sampling.minDelay ?? 0;
  const lowerRoom = Math.max(0, delay - minDelay);
  const scale = Math.max(rootTolerance * 16, Math.abs(delay) * 0.5, Number.EPSILON);
  const radius = Math.min(scale, rootStep * 0.25, lowerRoom * 0.75 || scale);
  return Number.isFinite(radius) && radius > 0 ? radius : Math.max(rootTolerance, Number.EPSILON);
}

function directRootValueAtRecord(row, history, states, root, t, delay, cF) {
  const receiverState = states[root.receiver] ?? null;
  const source = bodyById(root.source);
  if (!receiverState || !source) {
    return null;
  }
  return directRootValue(row, history, receiverState, source, t, delay, cF);
}

function rootSign(value, tolerance) {
  if (!Number.isFinite(value)) {
    return null;
  }
  if (Math.abs(value) <= tolerance) {
    return 0;
  }
  return value > 0 ? 1 : -1;
}

function selfRootFoldSignChart(row, history, states, root, t, cF, config) {
  const radius = foldSplittingDelayRadius(row, config, root.delay);
  const rootTolerance = config.sampling.rootTolerance ?? 0;
  const samples = SELF_ROOT_FOLD_SIGN_OFFSETS.map((offset) => {
    const delay = root.delay + offset * radius;
    const value = delay > 0 ? directRootValueAtRecord(row, history, states, root, t, delay, cF) : null;
    return {
      offset,
      delay,
      value,
      sign: rootSign(value, rootTolerance),
    };
  });
  const left = samples.find((sample) => sample.offset === -1);
  const center = samples.find((sample) => sample.offset === 0);
  const right = samples.find((sample) => sample.offset === 1);
  const signChangeAcrossRoot =
    Number.isFinite(left?.value) &&
    Number.isFinite(right?.value) &&
    left.value * right.value <= 0;
  const finiteValues = samples.map((sample) => sample.value).filter(Number.isFinite);
  const minAbsValue = finiteValues.length === 0 ? null : Math.min(...finiteValues.map((value) => Math.abs(value)));
  const positiveExitTouch =
    Number.isFinite(left?.value) &&
    Number.isFinite(center?.value) &&
    Number.isFinite(right?.value) &&
    Math.abs(center.value) <= rootTolerance &&
    left.value >= -rootTolerance &&
    right.value >= -rootTolerance;
  const foldLayerSupport = signChangeAcrossRoot || positiveExitTouch;
  const slopeEstimate =
    Number.isFinite(left?.value) && Number.isFinite(right?.value)
      ? (right.value - left.value) / (2 * radius)
      : null;
  const curvatureEstimate =
    Number.isFinite(left?.value) && Number.isFinite(center?.value) && Number.isFinite(right?.value)
      ? (left.value - 2 * center.value + right.value) / (radius * radius)
      : null;
  return {
    root_delay: root.delay,
    radius,
    root_tolerance: rootTolerance,
    samples,
    min_abs_value: minAbsValue,
    sign_change_across_root: signChangeAcrossRoot,
    positive_exit_touch: positiveExitTouch,
    fold_layer_support: foldLayerSupport,
    slope_estimate: slopeEstimate,
    curvature_estimate: curvatureEstimate,
  };
}

function selfRootPolarityPairStatus(branchPackets) {
  const byLayer = new Map();
  for (const packet of branchPackets) {
    const body = bodyById(packet.receiver);
    if (!body) {
      continue;
    }
    const entry = byLayer.get(body.layer) ?? { layer: body.layer, plus: 0, minus: 0 };
    if (body.polarity === "+") {
      entry.plus += packet.new_root_count;
    } else if (body.polarity === "-") {
      entry.minus += packet.new_root_count;
    }
    byLayer.set(body.layer, entry);
  }
  const layers = [...byLayer.values()];
  return {
    layers,
    paired_polarities:
      layers.length > 0 && layers.every((entry) => entry.plus > 0 && entry.plus === entry.minus),
  };
}

function selfRootFoldSplittingClassification({
  allKeysSelf,
  retainedInitialBranches,
  evenSurplusParity,
  pairedPolarityStatus,
  branchPackets,
}) {
  const newRoots = branchPackets.flatMap((packet) => packet.new_roots);
  const allNewRootsResolved =
    newRoots.length > 0 &&
    newRoots.every(
      (root) =>
        Number.isFinite(root.residual) &&
        Number.isFinite(root.J) &&
        root.sign_chart?.fold_layer_support === true
    );
  if (!allKeysSelf || !retainedInitialBranches || !evenSurplusParity || !pairedPolarityStatus.paired_polarities) {
    return {
      classification: "branch-proliferation",
      reason:
        "surplus roots are not a retained, even-parity, polarity-paired self-root event",
    };
  }
  if (!allNewRootsResolved) {
    return {
      classification: "resolution-artifact",
      reason:
        "surplus self-root event lacks complete local sign-chart or residual evidence at the selected resolution",
    };
  }
  return {
    classification: "fold-layer",
    reason:
      "surplus is an even-parity, polarity-paired self-root event with retained initial branches and local positive-exit/sign-chart support",
  };
}

function selfRootFoldSplittingDiagnostic(
  row,
  tier0,
  rootSelection,
  previousRootEvaluation,
  roots,
  currentTime,
  states,
  history,
  initialBranchCount,
  step
) {
  const extraKeys = rootSelection.extra_branch_keys ?? [];
  if (extraKeys.length === 0 || rootSelection.extra_branch_count <= 0) {
    return null;
  }
  const config = carrierReplayConfig(tier0, rootSelection.configResult.config);
  const cF = config.seaCell.c_f;
  const delayTolerance = rootDuplicateTolerance(config.sampling, rootStepFor(row, config));
  const branchPackets = extraKeys.map((branchKey) => {
    const parsed = parseDirectRootBranchKey(branchKey);
    const previousRoots =
      previousRootEvaluation === null
        ? []
        : rawDirectRootRecordsForBranchKey(previousRootEvaluation.roots, branchKey);
    const currentRoots = rawDirectRootRecordsForBranchKey(roots, branchKey);
    const newRoots = unmatchedCurrentRootRecords(previousRoots, currentRoots, delayTolerance).map((root) => ({
      ...directRootRecordSummary(root),
      sign_chart: selfRootFoldSignChart(row, history, states, root, currentTime, cF, config),
    }));
    return {
      branch_key: branchKey,
      receiver: parsed.receiver,
      source: parsed.source,
      relation: parsed.relation,
      status: parsed.status,
      previous_root_count: previousRoots.length,
      current_root_count: currentRoots.length,
      new_root_count: newRoots.length,
      previous_roots: previousRoots.map(directRootRecordSummary),
      current_roots: currentRoots.map(directRootRecordSummary),
      new_roots: newRoots,
    };
  });
  const allKeysSelf = extraKeys.every(isSelfActiveRootBranchKey);
  const retainedInitialBranches =
    initialBranchCount > 0 &&
    rootSelection.branch_retained_count === initialBranchCount &&
    rootSelection.branch_loss === false;
  const evenSurplusParity = rootSelection.extra_branch_count > 0 && rootSelection.extra_branch_count % 2 === 0;
  const pairedPolarityStatus = selfRootPolarityPairStatus(branchPackets);
  const verdict = selfRootFoldSplittingClassification({
    allKeysSelf,
    retainedInitialBranches,
    evenSurplusParity,
    pairedPolarityStatus,
    branchPackets,
  });
  return {
    schema: "self-root-fold-splitting-diagnostic/v1",
    status: `self-root-${verdict.classification}`,
    classification: verdict.classification,
    reason: verdict.reason,
    step,
    t: currentTime,
    selected_refinement_level: rootSelection.refinement_level,
    selected_root_samples: rootSelection.root_samples,
    initial_branch_count: initialBranchCount,
    retained_branch_count: rootSelection.branch_retained_count,
    surplus_branch_count: rootSelection.extra_branch_count,
    surplus_branch_keys: extraKeys,
    all_surplus_keys_self_active: allKeysSelf,
    retained_initial_branches: retainedInitialBranches,
    even_surplus_parity: evenSurplusParity,
    polarity_pair_status: pairedPolarityStatus,
    local_bracket_packets: branchPackets,
    validation_effect: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      reason:
        "self-root fold/splitting classification is a branch-chart diagnostic only and does not establish one-period Tier 1 continuation",
    },
  };
}

function directRootAdaptiveConfigResult(tier0, configResult, args, refinementLevel) {
  if (refinementLevel <= 0) {
    return configResult;
  }
  return refinedConfigResult(tier0, configResult, Math.pow(args.rootRefinementFactor, refinementLevel));
}

function directRootBranchRetentionSnapshot(roots, initialBranchCounts, initialBranchCount) {
  const branchCounts = directRootBranchCounts(roots);
  if (initialBranchCounts === null) {
    return {
      branchCounts,
      branch_retained_count: roots.length,
      extra_branch_count: 0,
      missing_branch_keys: [],
      extra_branch_keys: [],
      extra_branch_records: [],
      branch_loss: false,
    };
  }
  const branchRetainedCount = retainedRootBranchCount(initialBranchCounts, branchCounts);
  const missingBranchKeys = missingRootBranchKeys(initialBranchCounts, branchCounts).slice(0, 10);
  const extraBranchKeys = extraRootBranchKeys(initialBranchCounts, branchCounts).slice(0, 10);
  const extraBranchRecords = extraRootBranchRecords(initialBranchCounts, roots).slice(0, 10);
  return {
    branchCounts,
    branch_retained_count: branchRetainedCount,
    extra_branch_count: extraRootBranchCount(initialBranchCounts, branchCounts),
    missing_branch_keys: missingBranchKeys,
    extra_branch_keys: extraBranchKeys,
    extra_branch_records: extraBranchRecords,
    branch_loss: branchRetainedCount < initialBranchCount,
  };
}

function selectDirectRootsForProbeStep(
  row,
  tier0,
  configResult,
  args,
  history,
  currentTime,
  states,
  initialBranchCounts,
  initialBranchCount
) {
  const attempts = [];
  for (let refinementLevel = 0; refinementLevel <= DIRECT_PROBE_MAX_ADAPTIVE_REFINEMENT_LEVEL; refinementLevel += 1) {
    const attemptConfigResult = directRootAdaptiveConfigResult(tier0, configResult, args, refinementLevel);
    const attemptConfig = carrierReplayConfig(tier0, attemptConfigResult.config);
    const roots = enumerateDirectRoots(row, tier0, attemptConfigResult, history, currentTime, states);
    const retention = directRootBranchRetentionSnapshot(roots, initialBranchCounts, initialBranchCount);
    const attempt = {
      refinement_level: refinementLevel,
      root_samples: attemptConfig.sampling.rootSamples,
      root_count: roots.length,
      retained_branch_count: retention.branch_retained_count,
      extra_branch_count: retention.extra_branch_count,
      branch_loss: retention.branch_loss,
      missing_branch_keys: retention.missing_branch_keys,
      extra_branch_keys: retention.extra_branch_keys,
    };
    attempts.push(attempt);
    if (roots.length > 0 && !retention.branch_loss) {
      return {
        roots,
        configResult: attemptConfigResult,
        branchCounts: retention.branchCounts,
        branch_retained_count: retention.branch_retained_count,
        extra_branch_count: retention.extra_branch_count,
        missing_branch_keys: retention.missing_branch_keys,
        extra_branch_keys: retention.extra_branch_keys,
        extra_branch_records: retention.extra_branch_records,
        branch_loss: false,
        refinement_level: refinementLevel,
        root_samples: attemptConfig.sampling.rootSamples,
        attempts,
      };
    }
  }

  const fallback = attempts[attempts.length - 1];
  const fallbackConfigResult = directRootAdaptiveConfigResult(tier0, configResult, args, fallback.refinement_level);
  const roots = enumerateDirectRoots(row, tier0, fallbackConfigResult, history, currentTime, states);
  const retention = directRootBranchRetentionSnapshot(roots, initialBranchCounts, initialBranchCount);
  return {
    roots,
    configResult: fallbackConfigResult,
    branchCounts: retention.branchCounts,
    branch_retained_count: retention.branch_retained_count,
    extra_branch_count: retention.extra_branch_count,
    missing_branch_keys: retention.missing_branch_keys,
    extra_branch_keys: retention.extra_branch_keys,
    extra_branch_records: retention.extra_branch_records,
    branch_loss: retention.branch_loss,
    refinement_level: fallback.refinement_level,
    root_samples: fallback.root_samples,
    attempts,
  };
}

function directRootRecomputingProbeDiagnostic(row, tier0, configResult, args, samples) {
  if (configResult.error) {
    return {
      schema: "direct-root-recomputing-probe/v1",
      status: "direct-root-recomputing-probe-blocked",
      failure_code: "config-unavailable",
      config_error: configResult.error,
    };
  }
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const config = carrierReplayConfig(tier0, configResult.config);
  const cF = config.seaCell.c_f;
  const speedTolerance = config.sampling.speedTolerance ?? tier0.tolerances?.speed ?? 0.02;
  const baseDt = Number.isFinite(period) ? period * args.dynamicsStepFraction : null;
  const maxDeltaV = cF * args.dynamicsStepFraction;
  const scales = carrierReplayScales(row, samples, cF);
  let states = finiteBodyStates(row, 0);
  let currentTime = 0;
  const history = [{ t: currentTime, states: cloneStates(states) }];
  const stepRecords = [];
  let completedSteps = 0;
  let invalidContributionCount = 0;
  let maxAcceleration = 0;
  let maxStepDeltaV = 0;
  let maxStepDeltaX = 0;
  let maxRootCount = 0;
  let minRootCount = Number.POSITIVE_INFINITY;
  let maxRootResidual = 0;
  let failureCode = null;
  let initialBranchCounts = null;
  let initialBranchCount = 0;
  let minBranchRetainedCount = Number.POSITIVE_INFINITY;
  let maxExtraBranchCount = 0;
  let firstBranchLossStep = null;
  let firstMissingBranchKeys = [];
  let firstBranchSurplusStep = null;
  let firstExtraBranchKeys = [];
  let firstExtraBranchRecords = [];
  let firstBranchSurplusBracket = null;
  let firstSelfRootFoldSplitting = null;
  let previousRootEvaluation = null;
  let adaptiveRootRefinementUseCount = 0;
  let maxAdaptiveRootRefinementLevel = 0;
  let firstAdaptiveRootRefinementStep = null;
  let firstAdaptiveRootRefinementTrigger = null;
  const adaptiveRootRefinementRecords = [];

  if (!Number.isFinite(period) || period <= 0 || !Number.isFinite(baseDt) || baseDt <= 0) {
    return {
      schema: "direct-root-recomputing-probe/v1",
      status: "direct-root-recomputing-probe-blocked",
      failure_code: "period-or-step-unavailable",
      acceptance_scope:
        "Short-horizon direct root-recomputing probe only; does not establish accepted Tier 1 continuation.",
    };
  }

  for (let step = 0; step < args.directProbeSteps; step += 1) {
    const rootSelection = selectDirectRootsForProbeStep(
      row,
      tier0,
      configResult,
      args,
      history,
      currentTime,
      states,
      initialBranchCounts,
      initialBranchCount
    );
    const roots = rootSelection.roots;
    if (roots.length === 0) {
      failureCode = "direct-roots-missing";
      break;
    }
    if (initialBranchCounts === null) {
      initialBranchCounts = rootSelection.branchCounts;
      initialBranchCount = roots.length;
    }
    const branchRetainedCount = rootSelection.branch_retained_count;
    minBranchRetainedCount = Math.min(minBranchRetainedCount, branchRetainedCount);
    maxExtraBranchCount = Math.max(maxExtraBranchCount, rootSelection.extra_branch_count);
    if (firstBranchLossStep === null && branchRetainedCount < initialBranchCount) {
      firstBranchLossStep = step;
      firstMissingBranchKeys = rootSelection.missing_branch_keys;
    }
    if (firstBranchSurplusStep === null && rootSelection.extra_branch_count > 0) {
      firstBranchSurplusStep = step;
      firstExtraBranchKeys = rootSelection.extra_branch_keys;
      firstExtraBranchRecords = rootSelection.extra_branch_records;
      firstBranchSurplusBracket = {
        previous:
          previousRootEvaluation === null
            ? null
            : {
                step: previousRootEvaluation.step,
                t: previousRootEvaluation.t,
                root_records: directRootRecordsForBranchKeys(previousRootEvaluation.roots, firstExtraBranchKeys),
              },
        current: {
          step,
          t: currentTime,
          root_records: directRootRecordsForBranchKeys(roots, firstExtraBranchKeys),
          surplus_branch_records: firstExtraBranchRecords,
        },
      };
      firstSelfRootFoldSplitting = selfRootFoldSplittingDiagnostic(
        row,
        tier0,
        rootSelection,
        previousRootEvaluation,
        roots,
        currentTime,
        states,
        history,
        initialBranchCount,
        step
      );
    }
    if (rootSelection.refinement_level > 0) {
      adaptiveRootRefinementUseCount += 1;
      maxAdaptiveRootRefinementLevel = Math.max(maxAdaptiveRootRefinementLevel, rootSelection.refinement_level);
      if (firstAdaptiveRootRefinementStep === null) {
        firstAdaptiveRootRefinementStep = step;
        firstAdaptiveRootRefinementTrigger = rootSelection.attempts[0] ?? null;
      }
      if (adaptiveRootRefinementRecords.length < 10) {
        adaptiveRootRefinementRecords.push({
          step,
          selected_refinement_level: rootSelection.refinement_level,
          selected_root_samples: rootSelection.root_samples,
          selected_root_count: roots.length,
          selected_retained_branch_count: branchRetainedCount,
          selected_extra_branch_count: rootSelection.extra_branch_count,
          attempts: rootSelection.attempts,
        });
      }
    }
    const accelerations = directRootKickAccelerations(row, tier0, rootSelection.configResult, roots, states, history, currentTime);
    const stepMaxAcceleration = Math.max(...BODY_IDS.map((bodyId) => speed(accelerations.accelerations[bodyId])));
    const boundedDt = stepMaxAcceleration > 0 ? Math.min(baseDt, maxDeltaV / stepMaxAcceleration) : baseDt;
    if (!Number.isFinite(boundedDt) || boundedDt <= 0) {
      failureCode = "bounded-step-unavailable";
      break;
    }
    const nextStates = cloneStates(states);
    let stepMaxDeltaV = 0;
    let stepMaxDeltaX = 0;
    for (const bodyId of BODY_IDS) {
      const state = states[bodyId];
      const acceleration = accelerations.accelerations[bodyId];
      const deltaV = scale(acceleration, boundedDt);
      const deltaX = add(scale(state.velocity, boundedDt), scale(acceleration, 0.5 * boundedDt * boundedDt));
      nextStates[bodyId] = {
        position: add(state.position, deltaX),
        velocity: add(state.velocity, deltaV),
      };
      stepMaxDeltaV = Math.max(stepMaxDeltaV, speed(deltaV));
      stepMaxDeltaX = Math.max(stepMaxDeltaX, norm(deltaX));
    }
    currentTime += boundedDt;
    states = nextStates;
    history.push({ t: currentTime, states: cloneStates(states) });
    completedSteps += 1;
    invalidContributionCount += accelerations.invalid_contribution_count;
    maxAcceleration = Math.max(maxAcceleration, stepMaxAcceleration);
    maxStepDeltaV = Math.max(maxStepDeltaV, stepMaxDeltaV);
    maxStepDeltaX = Math.max(maxStepDeltaX, stepMaxDeltaX);
    maxRootCount = Math.max(maxRootCount, roots.length);
    minRootCount = Math.min(minRootCount, roots.length);
    maxRootResidual = Math.max(maxRootResidual, ...roots.map((root) => root.residual));
    if (stepRecords.length < 10) {
      stepRecords.push({
        step,
        t: currentTime,
        dt: boundedDt,
        root_count: roots.length,
        retained_branch_count: branchRetainedCount,
        extra_branch_count: rootSelection.extra_branch_count,
        adaptive_refinement_level: rootSelection.refinement_level,
        root_samples: rootSelection.root_samples,
        max_acceleration: stepMaxAcceleration,
        max_step_delta_v: stepMaxDeltaV,
        max_step_delta_x: stepMaxDeltaX,
      });
    }
    previousRootEvaluation = { step, t: currentTime - boundedDt, roots };
  }

  const referenceStates = finiteBodyStates(row, currentTime);
  const endpointDrift = maxEndpointStateDrift(states, referenceStates, scales);
  const endpointCenter = centerGaugeFromStates(states);
  const referenceCenter = centerGaugeFromStates(referenceStates);
  const endpointLayerSpeeds = layerAverageSpeeds(states);
  const endpointSpeedOrderingResidual = speedOrderingResidual(endpointLayerSpeeds, cF);
  const numericallyBounded =
    completedSteps === args.directProbeSteps &&
    failureCode === null &&
    finiteStateMap(states) &&
    invalidContributionCount === 0 &&
    Number.isFinite(endpointSpeedOrderingResidual);
  const horizonFraction = period > 0 ? currentTime / period : null;
  const dynamicallyBounded =
    numericallyBounded &&
    endpointDrift.max_normalized_position_drift <= 1 &&
    endpointDrift.max_normalized_velocity_drift <= 1 &&
    endpointSpeedOrderingResidual <= speedTolerance;

  return {
    schema: "direct-root-recomputing-probe/v1",
    status: dynamicallyBounded ? "direct-root-recomputing-probe-recorded" : "direct-root-recomputing-probe-warning",
    warning_code: dynamicallyBounded ? null : failureCode ?? "direct-root-probe-short-horizon-only",
    dynamics_scope: "short_horizon_direct_root_recomputing_probe",
    acceptance_scope:
      "Short-horizon direct root-recomputing probe only; does not establish accepted Tier 1 continuation, one-period closure, eta persistence, or Floquet stability.",
    formula:
      "At each step, recompute active causal roots from the evolving state history; if the retained branch count drops, retry that step on a refined root grid before applying x_{n+1}=x_n+v_n dt+0.5 a_root(t_n) dt^2 and v_{n+1}=v_n+a_root(t_n) dt.",
    requested_steps: args.directProbeSteps,
    completed_steps: completedSteps,
    requested_dt: baseDt,
    reached_time: currentTime,
    horizon_period_fraction: horizonFraction,
    max_delta_v: maxDeltaV,
    invalid_contribution_count: invalidContributionCount,
    root_count_range: {
      min: Number.isFinite(minRootCount) ? minRootCount : 0,
      max: maxRootCount,
    },
    branch_retention: {
      initial_branch_count: initialBranchCount,
      min_retained_branch_count: Number.isFinite(minBranchRetainedCount) ? minBranchRetainedCount : 0,
      max_extra_branch_count: maxExtraBranchCount,
      first_branch_loss_step: firstBranchLossStep,
      first_missing_branch_keys: firstMissingBranchKeys,
      first_branch_surplus_step: firstBranchSurplusStep,
      first_extra_branch_keys: firstExtraBranchKeys,
      first_extra_branch_records: firstExtraBranchRecords,
      first_surplus_branch_records: firstExtraBranchRecords,
      first_branch_surplus_bracket: firstBranchSurplusBracket,
    },
    self_root_fold_splitting: firstSelfRootFoldSplitting,
    adaptive_root_refinement: {
      enabled: true,
      max_refinement_level: DIRECT_PROBE_MAX_ADAPTIVE_REFINEMENT_LEVEL,
      refinement_factor: args.rootRefinementFactor,
      use_count: adaptiveRootRefinementUseCount,
      max_used_refinement_level: maxAdaptiveRootRefinementLevel,
      first_refinement_step: firstAdaptiveRootRefinementStep,
      first_refinement_trigger: firstAdaptiveRootRefinementTrigger,
      records: adaptiveRootRefinementRecords,
    },
    scales,
    maxima: {
      max_acceleration: maxAcceleration,
      max_step_delta_v: maxStepDeltaV,
      max_step_delta_x: maxStepDeltaX,
      max_root_residual: maxRootResidual,
      endpoint_speed_ordering_residual: endpointSpeedOrderingResidual,
      endpoint_center_position_drift: norm(sub(endpointCenter.position, referenceCenter.position)) / scales.position,
      endpoint_center_velocity_drift: norm(sub(endpointCenter.velocity, referenceCenter.velocity)) / scales.velocity,
      ...endpointDrift,
    },
    endpoint_layer_speeds: endpointLayerSpeeds,
    numerically_bounded: numericallyBounded,
    dynamically_bounded: dynamicallyBounded,
    step_records: stepRecords,
    validation_effect: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      reason: "probe covers only a bounded short horizon and has no eta ladder or monodromy calculation",
    },
  };
}

function directRootProbeSummary(probe) {
  return {
    status: probe.status,
    warning_code: probe.warning_code ?? null,
    failure_code: probe.failure_code ?? null,
    completed_steps: probe.completed_steps ?? 0,
    horizon_period_fraction: probe.horizon_period_fraction ?? null,
    root_count_range: probe.root_count_range ?? null,
    branch_retention: probe.branch_retention ?? null,
    adaptive_root_refinement: probe.adaptive_root_refinement ?? null,
    self_root_fold_splitting: probe.self_root_fold_splitting ?? null,
    dynamically_bounded: probe.dynamically_bounded ?? false,
    endpoint_speed_ordering_residual: probe.maxima?.endpoint_speed_ordering_residual ?? null,
    max_normalized_position_drift: probe.maxima?.max_normalized_position_drift ?? null,
    max_normalized_velocity_drift: probe.maxima?.max_normalized_velocity_drift ?? null,
  };
}

function branchRetentionRestored(probe) {
  const retention = probe.branch_retention;
  return (
    retention !== null &&
    retention !== undefined &&
    retention.initial_branch_count > 0 &&
    retention.min_retained_branch_count === retention.initial_branch_count &&
    retention.first_branch_loss_step === null
  );
}

function directRootBranchLossRefinementRescue(row, tier0, configResult, args, samples, stepCount) {
  const baseConfig = carrierReplayConfig(tier0, configResult.config);
  const refinedResult = refinedConfigResult(tier0, configResult, args.rootRefinementFactor);
  const refinedConfig = carrierReplayConfig(tier0, refinedResult.config);
  const refinedProbe = directRootRecomputingProbeDiagnostic(
    row,
    tier0,
    refinedResult,
    { ...args, directProbeSteps: stepCount },
    samples
  );
  return {
    schema: "direct-root-branch-loss-refinement-rescue/v1",
    refinement_factor: args.rootRefinementFactor,
    base_root_samples: baseConfig.sampling.rootSamples,
    refined_root_samples: refinedConfig.sampling.rootSamples,
    base_sample_count: baseConfig.sampling.sampleCount,
    refined_sample_count: refinedConfig.sampling.sampleCount,
    restored_branch_retention: branchRetentionRestored(refinedProbe),
    refined_probe: directRootProbeSummary(refinedProbe),
  };
}

function directRootHorizonLadderStatus(allEntriesBlocked, firstBranchLossEntry, unresolvedBranchLossEntry) {
  if (allEntriesBlocked) {
    return "direct-root-horizon-ladder-blocked";
  }
  if (firstBranchLossEntry === null) {
    return "direct-root-horizon-ladder-recorded";
  }
  if (unresolvedBranchLossEntry === null) {
    return "direct-root-horizon-ladder-refinement-rescued";
  }
  return "direct-root-horizon-ladder-branch-loss-warning";
}

function directRootHorizonLadderDiagnostic(row, tier0, configResult, args, samples) {
  const stepCounts = DIRECT_PROBE_LADDER_FACTORS.map((factor) => args.directProbeSteps * factor);
  const entries = stepCounts.map((stepCount) => {
    const probe = directRootRecomputingProbeDiagnostic(
      row,
      tier0,
      configResult,
      { ...args, directProbeSteps: stepCount },
      samples
    );
    const summary = directRootProbeSummary(probe);
    const branchLossStep = summary.branch_retention?.first_branch_loss_step ?? null;
    return {
      requested_steps: stepCount,
      ...summary,
      branch_loss_refinement_rescue:
        branchLossStep === null
          ? null
          : directRootBranchLossRefinementRescue(row, tier0, configResult, args, samples, stepCount),
    };
  });
  const boundedEntries = entries.filter((entry) => entry.dynamically_bounded && Number.isFinite(entry.horizon_period_fraction));
  const bestBoundedEntry = boundedEntries.reduce(
    (best, entry) =>
      !best || entry.horizon_period_fraction > best.horizon_period_fraction ? entry : best,
    null
  );
  const branchLossEntries = entries.filter((entry) => {
    const branchLossStep = entry.branch_retention?.first_branch_loss_step;
    return branchLossStep !== null && branchLossStep !== undefined;
  });
  const branchSurplusEntries = entries.filter((entry) => {
    const branchSurplusStep = entry.branch_retention?.first_branch_surplus_step;
    return branchSurplusStep !== null && branchSurplusStep !== undefined;
  });
  const foldSplittingEntries = entries.filter((entry) => entry.self_root_fold_splitting !== null);
  const adaptiveEntries = entries.filter((entry) => (entry.adaptive_root_refinement?.use_count ?? 0) > 0);
  const allEntriesBlocked =
    entries.length > 0 && entries.every((entry) => entry.status === "direct-root-recomputing-probe-blocked");
  const firstBranchLossEntry =
    branchLossEntries.length > 0 ? branchLossEntries[0] : null;
  const unresolvedBranchLossEntry =
    branchLossEntries.find((entry) => !entry.branch_loss_refinement_rescue?.restored_branch_retention) ?? null;
  return {
    schema: "direct-root-horizon-ladder/v1",
    status: directRootHorizonLadderStatus(allEntriesBlocked, firstBranchLossEntry, unresolvedBranchLossEntry),
    failure_code: allEntriesBlocked ? entries[0]?.failure_code ?? "direct-root-horizon-ladder-blocked" : null,
    dynamics_scope: "short_horizon_direct_root_recomputing_ladder",
    acceptance_scope:
      "Horizon ladder for the direct root-recomputing probe only; does not establish accepted Tier 1 continuation or Floquet stability.",
    base_requested_steps: args.directProbeSteps,
    ladder_factors: DIRECT_PROBE_LADDER_FACTORS,
    requested_step_counts: stepCounts,
    best_bounded_horizon_period_fraction: bestBoundedEntry?.horizon_period_fraction ?? null,
    adaptive_root_refinement: {
      enabled: true,
      entry_count: adaptiveEntries.length,
      first_refinement:
        adaptiveEntries.length === 0
          ? null
          : {
              requested_steps: adaptiveEntries[0].requested_steps,
              first_refinement_step: adaptiveEntries[0].adaptive_root_refinement.first_refinement_step,
              max_used_refinement_level: adaptiveEntries[0].adaptive_root_refinement.max_used_refinement_level,
              refinement_factor: adaptiveEntries[0].adaptive_root_refinement.refinement_factor,
            },
    },
    first_branch_loss: firstBranchLossEntry
      ? {
          requested_steps: firstBranchLossEntry.requested_steps,
          first_branch_loss_step: firstBranchLossEntry.branch_retention.first_branch_loss_step,
          first_missing_branch_keys: firstBranchLossEntry.branch_retention.first_missing_branch_keys,
          refinement_rescued:
            firstBranchLossEntry.branch_loss_refinement_rescue?.restored_branch_retention ?? false,
        }
      : null,
    first_branch_surplus:
      branchSurplusEntries.length === 0
        ? null
        : {
            requested_steps: branchSurplusEntries[0].requested_steps,
            first_branch_surplus_step: branchSurplusEntries[0].branch_retention.first_branch_surplus_step,
            first_extra_branch_keys: branchSurplusEntries[0].branch_retention.first_extra_branch_keys,
            first_extra_branch_records: branchSurplusEntries[0].branch_retention.first_extra_branch_records,
            first_surplus_branch_records: branchSurplusEntries[0].branch_retention.first_surplus_branch_records,
            first_branch_surplus_bracket: branchSurplusEntries[0].branch_retention.first_branch_surplus_bracket,
            max_extra_branch_count: branchSurplusEntries[0].branch_retention.max_extra_branch_count,
          },
    first_self_root_fold_splitting:
      foldSplittingEntries.length === 0 ? null : foldSplittingEntries[0].self_root_fold_splitting,
    self_root_fold_splitting_classifications: Object.fromEntries(
      ["fold-layer", "branch-proliferation", "resolution-artifact"].map((classification) => [
        classification,
        foldSplittingEntries.filter(
          (entry) => entry.self_root_fold_splitting?.classification === classification
        ).length,
      ])
    ),
    entries,
    validation_effect: {
      status_is_accepted_history_segment: false,
      residuals_below_tolerance: false,
      no_secular_center_drift: false,
      Delta_k_positive: false,
      same_branch_persists_across_eta_ladder: false,
      reason: "ladder is a bounded horizon-extension diagnostic and has no one-period closure or monodromy calculation",
    },
  };
}

function sourceCoverageComplete(row, samples) {
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod;
  const maxDelay = row.root_ledger?.maxDelay ?? 0;
  const firstSampleTime = samples[0]?.t;
  const lastSampleTime = samples[samples.length - 1]?.t;
  const coverageTolerance = sourceTimeCoverageTolerance(period, maxDelay);
  if (!Number.isFinite(period) || samples.length === 0) {
    return false;
  }
  return (
    Number.isFinite(firstSampleTime) &&
    Number.isFinite(lastSampleTime) &&
    firstSampleTime <= -maxDelay + coverageTolerance &&
    lastSampleTime + coverageTolerance >= period
  );
}

function sourceTimeCoverageTolerance(period, maxDelay) {
  const scale = Math.max(
    1,
    Number.isFinite(period) ? Math.abs(period) : 0,
    Number.isFinite(maxDelay) ? Math.abs(maxDelay) : 0
  );
  return SOURCE_TIME_COVERAGE_EPSILON_FACTOR * Number.EPSILON * scale;
}

function lowerEndpointDeficit(sampleTime, requiredTime) {
  if (!Number.isFinite(sampleTime) || !Number.isFinite(requiredTime)) {
    return null;
  }
  return Math.max(0, sampleTime - requiredTime);
}

function upperEndpointDeficit(sampleTime, requiredTime) {
  if (!Number.isFinite(sampleTime) || !Number.isFinite(requiredTime)) {
    return null;
  }
  return Math.max(0, requiredTime - sampleTime);
}

function continuationSourceRow(row, tier0, configResult, args) {
  const samples = carrierReplaySamples(row, args.sampleCount);
  const roots = configResult.error ? [] : enumerateCarrierRoots(row, tier0, configResult);
  const rootReplay = rootReplayDiagnostics(roots, configResult);
  const dynamicsDiagnostic = oneStepDynamicsDiagnostic(row, tier0, configResult, roots, args);
  const rootRefinementDiagnostic = carrierRootLedgerRefinementDiagnostic(row, tier0, configResult, roots, args);
  const residualBudgetDiagnostic = carrierReplayResidualAndCenterDriftDiagnostic(row, tier0, configResult, samples, roots);
  const frozenRootDriftDiagnostic = frozenRootOnePeriodDriftDiagnostic(row, tier0, configResult, roots, samples);
  const directRootProbeDiagnostic = directRootRecomputingProbeDiagnostic(row, tier0, configResult, args, samples);
  const directRootHorizonLadder = directRootHorizonLadderDiagnostic(row, tier0, configResult, args, samples);
  const coverageComplete = sourceCoverageComplete(row, samples);
  const period = row.closure_labels?.T_k ?? row.geometry?.commonPeriod ?? null;
  const maxDelay = row.root_ledger?.maxDelay ?? 0;
  const requiredStart = -maxDelay;
  const sampleStart = samples[0]?.t ?? null;
  const sampleEnd = samples[samples.length - 1]?.t ?? null;
  const coverageTolerance = sourceTimeCoverageTolerance(period, maxDelay);
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
    period,
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
        start: sampleStart,
        end: sampleEnd,
        required_start: requiredStart,
        required_end: period,
        coverage_tolerance: coverageTolerance,
        start_deficit: lowerEndpointDeficit(sampleStart, requiredStart),
        end_deficit: upperEndpointDeficit(sampleEnd, period),
      },
      root_replay: rootReplay,
    },
    diagnostics: {
      speed_ordering: dynamicsDiagnostic,
      root_ledger_refinement: rootRefinementDiagnostic,
      residual_budget: residualBudgetDiagnostic,
      frozen_root_one_period_drift: frozenRootDriftDiagnostic,
      direct_root_recomputing_probe: directRootProbeDiagnostic,
      direct_root_horizon_ladder: directRootHorizonLadder,
    },
    samples,
    active_causal_root_ledger: roots,
    validation: {
      status_is_accepted_history_segment: false,
      root_ledger_stable_under_refinement: rootRefinementDiagnostic.root_ledger_stable_under_refinement,
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
      "direct root-recomputing probe is short-horizon only; no one-period direct continuation was accepted",
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
