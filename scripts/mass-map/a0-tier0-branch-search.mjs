#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const DEFAULT_CONFIG_PATH = path.join(SCRIPT_DIR, "a0-tier0-default-grid.json");
const TWO_PI = 2 * Math.PI;
const LAYER_ORDER = ["I", "M", "O"];
const POLARITIES = ["+", "-"];
const CHARGE = { "+": 1, "-": -1 };
const SIGN = { "+": 1, "-": -1 };

function parseArgs(argv) {
  const args = {
    config: DEFAULT_CONFIG_PATH,
    pretty: false,
    limit: Infinity,
    out: null,
    help: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--config") {
      args.config = argv[++i];
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else if (arg === "--limit") {
      args.limit = Number(argv[++i]);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/mass-map/a0-tier0-branch-search.mjs [options]

Options:
  --config PATH   JSON grid config. Defaults to scripts/mass-map/a0-tier0-default-grid.json
  --limit N       Stop after N candidate rows.
  --out PATH      Write JSON output to a file instead of stdout.
  --pretty        Pretty-print JSON.
  --help          Show this help.

This is a Tier 0 certificate scaffold. It enumerates reduced carrier charts,
solves sampled causal-root ledgers, classifies averaging/locking/leakage
diagnostics, and emits branch rows with explicit promotion gates. It is not a
full delayed-dynamics solver.`);
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureArray(value) {
  return Array.isArray(value) ? value : [value];
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

function outer(a, b) {
  return [
    [a[0] * b[0], a[0] * b[1], a[0] * b[2]],
    [a[1] * b[0], a[1] * b[1], a[1] * b[2]],
    [a[2] * b[0], a[2] * b[1], a[2] * b[2]],
  ];
}

function addMatrix(a, b) {
  return a.map((row, i) => row.map((value, j) => value + b[i][j]));
}

function scaleMatrix(a, k) {
  return a.map((row) => row.map((value) => value * k));
}

function matrixFrobenius(a) {
  let sum = 0;
  for (const row of a) {
    for (const value of row) {
      sum += value * value;
    }
  }
  return Math.sqrt(sum);
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

function planeNormal(layer) {
  const { e1, e2 } = planeFor(layer);
  return unit(cross(e1, e2));
}

function layerState(layer, values, t) {
  const { e1, e2 } = planeFor(layer);
  const phase = values.omega[layer] * t;
  const cos = Math.cos(phase);
  const sin = Math.sin(phase);
  const handed = values.handedness[layer];
  const lambda = values.ellipticity;
  const R = values.radii[layer];
  const omega = values.omega[layer];
  const relative = add(scale(e1, R * cos), scale(e2, R * handed * lambda * sin));
  const relativeVelocity = add(
    scale(e1, -R * omega * sin),
    scale(e2, R * omega * handed * lambda * cos)
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

function createBodies() {
  const bodies = [];
  for (const layer of LAYER_ORDER) {
    for (const polarity of POLARITIES) {
      bodies.push({
        id: `${layer}${polarity}`,
        layer,
        polarity,
        charge: CHARGE[polarity],
      });
    }
  }
  return bodies;
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
  const factor = config.classification.instantaneousSelfDelayFactor ?? 2;
  return config.sampling.minDelay * factor;
}

function selfRootDelayWindow(config) {
  const exclusionDelay = minimumSelfDelay(config);
  const foldLayerFactor = config.classification.selfFoldLayerFactor ?? 8;
  const tolerance = config.sampling.rootTolerance ?? 0;
  const foldLayerDelay =
    config.classification.selfFoldLayerDelay ??
    Math.max(exclusionDelay * foldLayerFactor, exclusionDelay + tolerance * foldLayerFactor);
  return {
    exclusionDelay,
    foldLayerDelay: Math.max(exclusionDelay, foldLayerDelay),
  };
}

function classifySelfRootDelay(rootTau, config) {
  const window = selfRootDelayWindow(config);
  if (rootTau <= window.exclusionDelay) {
    return "instantaneous_exclusion";
  }
  if (rootTau <= window.foldLayerDelay) {
    return "regularized_fold_layer";
  }
  return "admissible_delay";
}

function classifyRoot(receiver, source, rootTau, j, config) {
  const relation = sourceRelation(receiver, source);
  const selfDelayClass = relation === "self" ? classifySelfRootDelay(rootTau, config) : null;
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
    nearSeparator: Math.abs(j) <= config.classification.jLockThreshold,
    nearZeroSelf: isNearZeroSelf,
    selfDelayClass,
    selfFoldLayer: isSelfFoldLayer,
    delayedSelfHit: relation === "self" && rootTau > selfRootDelayWindow(config).exclusionDelay,
    admissibleDelayedSelfHit: isAdmissibleDelayedSelfHit,
  };
}

function rootFunction(receiver, source, values, t, tau, cF) {
  const receiverState = bodyState(receiver, values, t);
  const sourceState = bodyState(source, values, t - tau);
  return norm(sub(receiverState.position, sourceState.position)) - cF * tau;
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

function buildRootRecord(receiver, source, values, t, rootTau, cF, config) {
  const receiverState = bodyState(receiver, values, t);
  const sourceState = bodyState(source, values, t - rootTau);
  const direction = unit(sub(receiverState.position, sourceState.position));
  const j = 1 - dot(sourceState.velocity, direction) / cF;
  const rootClass = classifyRoot(receiver, source, rootTau, j, config);
  return {
    receiver: receiver.id,
    source: source.id,
    relation: rootClass.relation,
    status: rootClass.status,
    t,
    delay: rootTau,
    residual: Math.abs(rootFunction(receiver, source, values, t, rootTau, cF)),
    J: j,
    nearSeparator: rootClass.nearSeparator,
    nearZeroSelf: rootClass.nearZeroSelf,
    selfDelayClass: rootClass.selfDelayClass,
    selfFoldLayer: rootClass.selfFoldLayer,
    delayedSelfHit: rootClass.delayedSelfHit,
    admissibleDelayedSelfHit: rootClass.admissibleDelayedSelfHit,
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

function enumerateRoots(values, config) {
  const cF = config.seaCell.c_f;
  const bodies = createBodies();
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
        let priorTau = sampling.minDelay;
        let priorValue = rootFunction(receiver, source, values, t, priorTau, cF);
        for (let index = 1; index <= sampling.rootSamples; index += 1) {
          const tau = sampling.minDelay + index * rootStep;
          const value = rootFunction(receiver, source, values, t, tau, cF);
          const hasBracket = priorValue === 0 || value === 0 || priorValue * value < 0;
          if (hasBracket) {
            const rootTau = solveRoot(
              receiver,
              source,
              values,
              t,
              priorTau,
              tau,
              cF,
              sampling.rootTolerance
            );
            if (rootTau === null) {
              priorTau = tau;
              priorValue = value;
              continue;
            }
            pushDistinctRoot(
              roots,
              buildRootRecord(receiver, source, values, t, rootTau, cF, config),
              duplicateTolerance
            );
            if (relation === "self" && rootTau <= selfWindow.foldLayerDelay && tau > selfWindow.foldLayerDelay) {
              const delayedRootTau = solveRoot(
                receiver,
                source,
                values,
                t,
                selfWindow.foldLayerDelay,
                tau,
                cF,
                sampling.rootTolerance,
                { ignoreLoEndpoint: true }
              );
              if (delayedRootTau !== null) {
                pushDistinctRoot(
                  roots,
                  buildRootRecord(receiver, source, values, t, delayedRootTau, cF, config),
                  duplicateTolerance
                );
              }
            }
          }
          priorTau = tau;
          priorValue = value;
        }
      }
    }
  }
  return roots;
}

function summarizeRoots(roots) {
  const activeRoots = roots.filter((root) => root.status === "active");
  const summary = {
    total: activeRoots.length,
    rawTotal: roots.length,
    byRelation: {
      partner: 0,
      self: 0,
      inter_layer: 0,
    },
    rawByRelation: {
      partner: 0,
      self: 0,
      inter_layer: 0,
    },
    excluded: {
      instantaneousSelfKick: 0,
      nearSeparatorInstantaneousSelfKick: 0,
      regularizedSelfFoldLayer: 0,
      nearSeparatorRegularizedSelfFoldLayer: 0,
    },
    selfDelayClasses: {
      instantaneous_exclusion: 0,
      regularized_fold_layer: 0,
      admissible_delay: 0,
    },
    nearSeparator: 0,
    rawNearSeparator: 0,
    minAbsJ: null,
    rawMinAbsJ: null,
    maxDelay: 0,
    maxRootResidual: 0,
    rawMaxRootResidual: 0,
  };
  for (const root of roots) {
    const absJ = Math.abs(root.J);
    summary.rawByRelation[root.relation] += 1;
    summary.rawNearSeparator += root.nearSeparator ? 1 : 0;
    summary.rawMinAbsJ = summary.rawMinAbsJ === null ? absJ : Math.min(summary.rawMinAbsJ, absJ);
    summary.rawMaxRootResidual = Math.max(summary.rawMaxRootResidual, root.residual);
    if (root.status !== "active") {
      if (root.status === "excluded_instantaneous_self_kick") {
        summary.excluded.instantaneousSelfKick += 1;
        summary.excluded.nearSeparatorInstantaneousSelfKick += root.nearSeparator ? 1 : 0;
      } else if (root.status === "excluded_regularized_self_fold_layer") {
        summary.excluded.regularizedSelfFoldLayer += 1;
        summary.excluded.nearSeparatorRegularizedSelfFoldLayer += root.nearSeparator ? 1 : 0;
      }
      if (root.relation === "self" && root.selfDelayClass) {
        summary.selfDelayClasses[root.selfDelayClass] += 1;
      }
      continue;
    }
    summary.byRelation[root.relation] += 1;
    if (root.relation === "self" && root.selfDelayClass) {
      summary.selfDelayClasses[root.selfDelayClass] += 1;
    }
    summary.nearSeparator += root.nearSeparator ? 1 : 0;
    summary.minAbsJ = summary.minAbsJ === null ? absJ : Math.min(summary.minAbsJ, absJ);
    summary.maxDelay = Math.max(summary.maxDelay, root.delay);
    summary.maxRootResidual = Math.max(summary.maxRootResidual, root.residual);
  }
  return summary;
}

function updateRange(range, value) {
  range.min = range.min === null ? value : Math.min(range.min, value);
  range.max = range.max === null ? value : Math.max(range.max, value);
}

function updateAbsJRange(range, value) {
  const absJ = Math.abs(value);
  range.minAbsJ = range.minAbsJ === null ? absJ : Math.min(range.minAbsJ, absJ);
}

function buildSelfRootDiagnostic(roots, values, config) {
  const window = selfRootDelayWindow(config);
  const byLayer = Object.fromEntries(
    LAYER_ORDER.map((layer) => [
      layer,
      {
        speed: values.speeds[layer],
        speedRatio: values.speeds[layer] / config.seaCell.c_f,
        instantaneousSelfKick: 0,
        regularizedSelfFoldLayer: 0,
        admissibleDelayedSelfHit: 0,
        admissibleDelayRange: { min: null, max: null },
        foldLayerDelayRange: { min: null, max: null },
        instantaneousDelayRange: { min: null, max: null },
        minAbsJ: null,
      },
    ])
  );
  const totals = {
    instantaneousSelfKick: 0,
    regularizedSelfFoldLayer: 0,
    admissibleDelayedSelfHit: 0,
  };
  const delayRanges = {
    admissible: { min: null, max: null },
    foldLayer: { min: null, max: null },
    instantaneous: { min: null, max: null },
  };

  for (const root of roots) {
    if (root.relation !== "self") {
      continue;
    }
    const layer = root.receiver.slice(0, 1);
    const layerStats = byLayer[layer];
    updateAbsJRange(layerStats, root.J);
    if (root.selfDelayClass === "admissible_delay") {
      totals.admissibleDelayedSelfHit += 1;
      layerStats.admissibleDelayedSelfHit += 1;
      updateRange(delayRanges.admissible, root.delay);
      updateRange(layerStats.admissibleDelayRange, root.delay);
    } else if (root.selfDelayClass === "regularized_fold_layer") {
      totals.regularizedSelfFoldLayer += 1;
      layerStats.regularizedSelfFoldLayer += 1;
      updateRange(delayRanges.foldLayer, root.delay);
      updateRange(layerStats.foldLayerDelayRange, root.delay);
    } else if (root.selfDelayClass === "instantaneous_exclusion") {
      totals.instantaneousSelfKick += 1;
      layerStats.instantaneousSelfKick += 1;
      updateRange(delayRanges.instantaneous, root.delay);
      updateRange(layerStats.instantaneousDelayRange, root.delay);
    }
  }

  let status = "fail";
  let diagnosis = "delayed_self_hit_roots_absent";
  let failureCode = "delayed-self-root-absent";
  let note =
    "No admissible delayed self-hit root was found beyond the self-root exclusion and fold-layer windows.";
  if (totals.admissibleDelayedSelfHit > 0) {
    status = "pass";
    diagnosis =
      totals.instantaneousSelfKick > 0
        ? "near_zero_sampling_artifact_resolved"
        : "admissible_delayed_self_hit_roots_present";
    failureCode = null;
    note =
      "Near-zero self roots remain excluded under H(0)=0, but admissible delayed self-hit roots exist beyond the fold layer.";
  } else if (totals.regularizedSelfFoldLayer > 0) {
    diagnosis = "regularized_fold_layer_required";
    failureCode = "self-root-fold-layer-required";
    note =
      "Self roots were found only inside the fold layer above the instantaneous exclusion window; Tier 1 needs an eta>0 regularized fold-layer condition before promotion.";
  }

  return {
    status,
    diagnosis,
    failure_code: failureCode,
    window,
    totals,
    delayRanges,
    byLayer,
    note,
  };
}

function activeRoots(roots) {
  return roots.filter((root) => root.status === "active");
}

function classifyModes(values, config, roots) {
  const modeMax = config.classification.modeMax;
  const gammaAvg = config.classification.gammaAvg;
  const omegas = values.omega;
  const lockModes = [];
  let nonresonantCount = 0;
  let nearestMismatch = Infinity;
  const scale = Math.max(...Object.values(omegas));
  for (let nI = -modeMax; nI <= modeMax; nI += 1) {
    for (let nM = -modeMax; nM <= modeMax; nM += 1) {
      for (let nO = -modeMax; nO <= modeMax; nO += 1) {
        if (nI === 0 && nM === 0 && nO === 0) {
          continue;
        }
        const mismatch = Math.abs(nI * omegas.I + nM * omegas.M + nO * omegas.O) / scale;
        nearestMismatch = Math.min(nearestMismatch, mismatch);
        if (mismatch <= gammaAvg) {
          lockModes.push({ nI, nM, nO, mismatch });
        } else {
          nonresonantCount += 1;
        }
      }
    }
  }
  const active = activeRoots(roots);
  const nearSeparatorRoots = active
    .filter((root) => root.nearSeparator)
    .slice(0, 20)
    .map((root) => ({
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      delay: root.delay,
      J: root.J,
    }));
  const excludedInstantaneousSelfRoots = roots
    .filter((root) => root.status === "excluded_instantaneous_self_kick")
    .slice(0, 20)
    .map((root) => ({
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      delay: root.delay,
      J: root.J,
      nearSeparator: root.nearSeparator,
    }));
  const excludedRegularizedSelfFoldLayerRoots = roots
    .filter((root) => root.status === "excluded_regularized_self_fold_layer")
    .slice(0, 20)
    .map((root) => ({
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      delay: root.delay,
      J: root.J,
      nearSeparator: root.nearSeparator,
    }));
  const admissibleDelayedSelfRoots = active
    .filter((root) => root.relation === "self" && root.admissibleDelayedSelfHit)
    .slice(0, 20)
    .map((root) => ({
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      delay: root.delay,
      J: root.J,
      nearSeparator: root.nearSeparator,
    }));
  return {
    nonresonantCount,
    nearestMismatch,
    lockModes: lockModes.slice(0, 20),
    lockModeCount: lockModes.length,
    nearSeparatorRoots,
    nearSeparatorRootCount: active.filter((root) => root.nearSeparator).length,
    excludedInstantaneousSelfRoots,
    excludedInstantaneousSelfRootCount: roots.filter(
      (root) => root.status === "excluded_instantaneous_self_kick"
    ).length,
    excludedRegularizedSelfFoldLayerRoots,
    excludedRegularizedSelfFoldLayerRootCount: roots.filter(
      (root) => root.status === "excluded_regularized_self_fold_layer"
    ).length,
    admissibleDelayedSelfRoots,
    admissibleDelayedSelfRootCount: active.filter(
      (root) => root.relation === "self" && root.admissibleDelayedSelfHit
    ).length,
  };
}

function leakagePlaceholder(values, config) {
  const bodies = createBodies();
  const sampleCount = config.sampling.sampleCount;
  let monopole = 0;
  let dipoleNormSum = 0;
  let quadrupoleNormSum = 0;
  for (let i = 0; i < sampleCount; i += 1) {
    const t = (values.commonPeriod * i) / sampleCount;
    let dipole = [0, 0, 0];
    let quadrupole = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    for (const body of bodies) {
      const state = bodyState(body, values, t);
      const q = body.charge;
      monopole += q;
      dipole = add(dipole, scale(state.position, q));
      const rr = dot(state.position, state.position);
      const xx = outer(state.position, state.position);
      const qMatrix = xx.map((row, rowIndex) =>
        row.map((value, columnIndex) => q * (3 * value - (rowIndex === columnIndex ? rr : 0)))
      );
      quadrupole = addMatrix(quadrupole, qMatrix);
    }
    dipoleNormSum += norm(dipole);
    quadrupoleNormSum += matrixFrobenius(quadrupole);
  }
  const avgMonopole = Math.abs(monopole) / sampleCount;
  const avgDipole = dipoleNormSum / sampleCount;
  const avgQuadrupole = quadrupoleNormSum / sampleCount;
  const tolerance = config.sampling.leakageTolerance;
  let leadingOrder = null;
  if (avgMonopole > tolerance) {
    leadingOrder = "monopole";
  } else if (avgDipole > tolerance) {
    leadingOrder = "dipole";
  } else if (avgQuadrupole > tolerance) {
    leadingOrder = "quadrupole";
  } else {
    leadingOrder = "suppressed-through-quadrupole";
  }
  return {
    leadingOrder,
    averageMonopole: avgMonopole,
    averageDipole: avgDipole,
    averageQuadrupole: avgQuadrupole,
  };
}

function buildValues(params, config) {
  const cF = config.seaCell.c_f;
  const radii = {
    O: params.outerRadius,
    M: params.outerRadius * params.epsilonMO,
    I: params.outerRadius * params.epsilonMO * params.epsilonIM,
  };
  const speeds = {
    I: cF * (1 + params.deltaI),
    M: cF * (1 + params.deltaM),
    O: cF * (1 - params.deltaO),
  };
  const omega = {};
  const periods = {};
  for (const layer of LAYER_ORDER) {
    omega[layer] = (2 * speeds[layer]) / radii[layer];
    periods[layer] = TWO_PI / omega[layer];
  }
  const commonPeriod = periods.O;
  const windings = {};
  const phaseResiduals = {};
  for (const layer of LAYER_ORDER) {
    windings[layer] = Math.max(1, Math.round(commonPeriod / periods[layer]));
    phaseResiduals[layer] = Math.abs(omega[layer] * commonPeriod - TWO_PI * windings[layer]) / TWO_PI;
  }
  return {
    radii,
    speeds,
    omega,
    periods,
    commonPeriod,
    windings,
    phaseResiduals,
    ellipticity: params.ellipticity,
    handedness: {
      I: params.handedness[0],
      M: params.handedness[1],
      O: params.handedness[2],
    },
  };
}

function speedResidual(values, cF) {
  return Math.max(
    Math.max(0, (cF - values.speeds.I) / cF),
    Math.abs(values.speeds.M - cF) / cF,
    Math.max(0, (values.speeds.O - cF) / cF)
  );
}

function phaseResidual(values) {
  return Math.max(...Object.values(values.phaseResiduals));
}

function stateResidual(values, config) {
  const bodies = createBodies();
  const scalePosition = Math.max(...Object.values(values.radii), 1);
  const scaleVelocity = Math.max(...Object.values(values.speeds), 1);
  let maxResidual = 0;
  for (let i = 0; i < config.sampling.sampleCount; i += 1) {
    const t = (values.commonPeriod * i) / config.sampling.sampleCount;
    for (const body of bodies) {
      const now = bodyState(body, values, t);
      const returned = bodyState(body, values, t + values.commonPeriod);
      const positionResidual = norm(sub(now.position, returned.position)) / scalePosition;
      const velocityResidual = norm(sub(now.velocity, returned.velocity)) / scaleVelocity;
      maxResidual = Math.max(maxResidual, positionResidual, velocityResidual);
    }
  }
  return maxResidual;
}

function residualComponent(value, tolerance, role, status = null, note = null) {
  const resolvedStatus =
    status ?? (typeof value === "number" && typeof tolerance === "number" && value <= tolerance ? "pass" : "fail");
  return {
    value,
    tolerance,
    status: resolvedStatus,
    role,
    note,
  };
}

function pendingResidual(role, note) {
  return {
    value: null,
    tolerance: null,
    status: "not_computed_in_tier0",
    role,
    note,
  };
}

function gate(status, note) {
  return { status, note };
}

function gateWithCode(status, note, failureCode = null) {
  return { status, note, failure_code: failureCode };
}

function numericResiduals(residuals) {
  return Object.fromEntries(Object.entries(residuals).map(([key, value]) => [key, value.value]));
}

function residualSemanticsPass(residuals) {
  return Object.values(residuals).every(
    (component) =>
      component &&
      Object.hasOwn(component, "value") &&
      Object.hasOwn(component, "tolerance") &&
      typeof component.status === "string" &&
      typeof component.role === "string" &&
      Object.hasOwn(component, "note")
  );
}

function maximumActiveNearSeparatorRoots(config) {
  return config.classification.maxActiveNearSeparatorRoots ?? 0;
}

function interLayerClosure(values) {
  return {
    IM: values.windings.I - values.windings.M,
    MO: values.windings.M - values.windings.O,
    IO: values.windings.I - values.windings.O,
  };
}

function layerEllipticity(values) {
  return Object.fromEntries(LAYER_ORDER.map((layer) => [layer, values.ellipticity]));
}

function buildZLambda(values, rootSummary, config) {
  const normals = Object.fromEntries(LAYER_ORDER.map((layer) => [layer, planeNormal(layer)]));
  const gram = {
    IM: dot(normals.I, normals.M),
    MO: dot(normals.M, normals.O),
    OI: dot(normals.O, normals.I),
  };
  const tripleProduct = dot(normals.I, cross(normals.M, normals.O));
  const degeneracyTolerance = config.classification.quotientDegeneracyTolerance ?? 1e-9;
  const quotientDegenerate = Math.abs(tripleProduct) <= degeneracyTolerance;
  const periodRatios = {
    T_I_over_T_M: values.periods.I / values.periods.M,
    T_M_over_T_O: values.periods.M / values.periods.O,
  };
  const radiusRatios = {
    epsilon_IM: values.radii.I / values.radii.M,
    epsilon_MO: values.radii.M / values.radii.O,
  };
  const branchClass = {
    windings: values.windings,
    interLayerClosure: interLayerClosure(values),
    activeRootClasses: rootSummary.byRelation,
    rawRootClasses: rootSummary.rawByRelation,
    selfDelayClasses: rootSummary.selfDelayClasses,
    excluded: rootSummary.excluded,
  };
  return {
    schema: "a0-tier0-z-lambda/v1",
    radius_ratios: radiusRatios,
    period_ratios: periodRatios,
    delta_M: (values.speeds.M - config.seaCell.c_f) / config.seaCell.c_f,
    ellipticity: layerEllipticity(values),
    ellipticity_status: "shared_scalar_applied_to_all_layers",
    plane_gram: gram,
    orientation_class: {
      chi_N: Math.sign(tripleProduct),
      triple_product: tripleProduct,
      status: quotientDegenerate ? "degenerate" : "nondegenerate",
    },
    handedness: values.handedness,
    phase_offset_quotient: {
      gauge: "S^1_k",
      representative: { I: 0, M: 0, O: 0 },
      status: "gauge_fixed_zero_offsets_tier0",
      quotient_basis: "not_computed_in_tier0",
      independent_phase_dimension: 2,
      representative_not_quotiented: true,
      note:
        "Tier 0 carrier phases are initialized at zero; nonzero phase-offset representatives require a later phase grid or Tier 1 continuation.",
    },
    branch_class: branchClass,
    branch_class_status: "representative_not_canonical_discrete_quotient",
    removed_gauges: ["SO(3)", "S^1_k", "Gamma_Lambda"],
    quotient_degenerate: quotientDegenerate,
  };
}

function scaleSeparationGate(values, config) {
  const maxScaleRatio = config.classification.maxScaleRatio ?? 0.5;
  const radiusRatios = [values.radii.I / values.radii.M, values.radii.M / values.radii.O];
  const periodRatios = [values.periods.I / values.periods.M, values.periods.M / values.periods.O];
  const maxObservedRatio = Math.max(...radiusRatios, ...periodRatios);
  return gateWithCode(
    maxObservedRatio <= maxScaleRatio ? "pass" : "fail",
    `Requires reduced radius and period ratios to stay below ${maxScaleRatio}; observed maximum is ${maxObservedRatio}.`,
    maxObservedRatio <= maxScaleRatio ? null : "scale-separation-collapse"
  );
}

function quotientGate(zLambda) {
  return gateWithCode(
    zLambda.quotient_degenerate ? "fail" : "pass",
    "Requires nondegenerate oriented plane-normal Gram data after removing global rotations.",
    zLambda.quotient_degenerate ? "quotient-degenerate" : null
  );
}

function deltaKStatus() {
  return {
    value: null,
    status: "not_computed_in_tier0",
    role: "tier1_required",
    failure_code_if_nonpositive: "nonpositive-floquet-gap",
    note:
      "Tier 0 does not construct the monodromy operator; Tier 1 must compute Delta_k after symmetry quotienting.",
  };
}

const WEAK_TIER_SELECTOR = {
  schema_status: "provisional",
  label: "IMO",
  active_layers: ["I", "M", "O"],
  note:
    "The Tier 0 A0 branch-search row carries the full nested shell braid layer set; reduced shielding selectors IM- and I-- require later branch-family projection rows.",
};

const WEAK_REQUIRED_RETAINED_LABELS = [
  "weak-coupling-triad exposure",
  "axial-frame branch data",
  "chirality channel",
  "flavor-overlap data",
  "weak-corridor provenance",
];

const WEAK_EXCLUDED_BENCHMARK_INPUTS = [
  "CKM magnitude",
  "CKM angle",
  "charged-lepton mass ratio",
  "particle mass",
  "CKM-derived transport action",
];

function missingWeakInput(input, requiredStage, note) {
  return {
    input,
    value: null,
    status: "missing_tier1_tier2_input",
    required_stage: requiredStage,
    note,
  };
}

function buildWeakInputs(config) {
  return {
    R_rel: missingWeakInput(
      "R_rel",
      "Tier 2 shielding extraction",
      "Relative extraction radius is not part of the Tier 0 carrier root-ledger scan."
    ),
    c: missingWeakInput(
      "c",
      "weak-sector handoff",
      "Weak-sector input c is not selected by the Tier 0 A0 branch-search artifact."
    ),
    sigma_ax: missingWeakInput(
      "sigma_ax",
      "weak-sector handoff",
      "Axial-frame branch sign is not fixed until the weak exposure quotient is constructed."
    ),
    eta_a_h: missingWeakInput(
      "eta_a_h",
      "Tier 1 eta>0 continuation",
      "Mollified constituent history data are not reconstructed in Tier 0."
    ),
    polar_site_aperture: missingWeakInput(
      "A_a(x;R_rel)",
      "Tier 2 shielding extraction",
      "The polar-site aperture is part of the weak-visible extraction geometry, not the Tier 0 carrier chart."
    ),
    rho_NS: missingWeakInput(
      "rho_NS(x,t)",
      "Tier 1/Tier 2 local Noether sea state",
      "Tier 0 uses a homogeneous rest-cell scaffold and does not reconstruct local Noether braid density."
    ),
    chi_sea: {
      value: config.seaCell.chi_sea ?? null,
      status: Object.hasOwn(config.seaCell, "chi_sea")
        ? "tier0_fixed_homogeneous_rest_cell_input"
        : "missing_tier1_tier2_input",
      required_stage: "Tier 1/Tier 2 local Noether sea state",
      note:
        "The homogeneous rest-cell value is recorded for audit only; weak-measure reconstruction must retest the local chi_sea field.",
    },
    local_noether_sea_state: {
      status: "tier0_fixed_homogeneous_rest_cell_input",
      u_sea: config.seaCell.u_sea ?? null,
      G_grad: config.seaCell.G_grad ?? null,
      n: config.seaCell.n ?? null,
      chi_sea: config.seaCell.chi_sea ?? null,
      c_f: config.seaCell.c_f ?? null,
    },
  };
}

function weakMissingInputNames(weakInputs) {
  return Object.entries(weakInputs)
    .filter(([, value]) => value && value.status === "missing_tier1_tier2_input")
    .map(([key]) => key);
}

function buildLayerChannels(activeLayers, missingInputs) {
  return Object.fromEntries(
    activeLayers.map((layer) => [
      layer,
      {
        status: "not-computed",
        value: null,
        amplitude_kind: "provisional_weak_retained_causal_wake_amplitude",
        active_polarities: POLARITIES,
        missing_inputs: missingInputs,
        reason:
          "Tier 0 does not reconstruct mollified wake histories or apply the weak-sector projection.",
      },
    ])
  );
}

function buildWeakRetainedAmplitudeHandoff({
  failureCode,
  branchLabel,
  zLambda,
  rootSummary,
  residualValues,
  Delta_k,
  certificateGates,
  promotionBoundary,
  values,
  config,
}) {
  const weakInputs = buildWeakInputs(config);
  const missingInputs = [
    ...new Set([
      ...weakMissingInputNames(weakInputs),
      "Pi_weak",
      "Q_weak",
      "mollified_wake_rule",
      "extraction_radius",
      "angular_resolution",
      "Delta_t_refinement",
      "eta_schedule",
      "weak_measure_norm",
    ]),
  ];
  const handoffStatus = failureCode === "candidate" ? "candidate" : "not-computed";
  return {
    schema: "provisional-a0-tier0-weak-retained-amplitude-handoff/v1",
    schema_status: "provisional",
    status: handoffStatus,
    tier_selector: WEAK_TIER_SELECTOR,
    source_row: {
      branch_label: branchLabel,
      z_lambda: zLambda,
      root_ledger: rootSummary,
      residual_values: residualValues,
      Delta_k,
      certificate_gates: certificateGates,
      promotion_boundary: promotionBoundary,
    },
    weak_inputs: weakInputs,
    weak_exposure_map: {
      status: "not-computed",
      Pi_weak: null,
      Q_weak: null,
      required_retained_labels: WEAK_REQUIRED_RETAINED_LABELS,
      retained_labels: [],
      discarded_labels: [],
      leakage_diagnostics: {
        status: "not-computed",
        failure_code_if_split_domain: "weak-emitter-split-domain",
        note:
          "Tier 0 has not built the weak exposure quotient or checked whether weak-visible labels stay in one domain.",
      },
    },
    layer_channels: buildLayerChannels(WEAK_TIER_SELECTOR.active_layers, missingInputs),
    phase_handoff: {
      status: "candidate_phase_data_only",
      phase_offset_quotient: zLambda.phase_offset_quotient,
      handedness: zLambda.handedness,
      orientation_class: zLambda.orientation_class,
      branch_class: zLambda.branch_class,
      failure_code_if_ambiguous: "weak-emitter-phase-underdetermined",
      note:
        "Tier 0 records branch-fixed quotient data but does not determine the weak-retained amplitude phase.",
    },
    refinement: {
      status: "not-computed",
      extraction_radius: missingWeakInput(
        "extraction_radius",
        "Tier 2 shielding extraction",
        "No far-field weak extraction radius is sampled in Tier 0."
      ),
      angular_resolution: missingWeakInput(
        "angular_resolution",
        "Tier 2 shielding extraction",
        "No weak-channel angular grid is sampled in Tier 0."
      ),
      cycle_window: {
        value: values.commonPeriod,
        status: "tier0_carrier_period_only",
        note:
          "The carrier period T_k is available, but the weak-retained cycle average has not been refined.",
      },
      Delta_t: {
        value: values.commonPeriod / config.sampling.sampleCount,
        status: "tier0_sample_spacing_only",
        note:
          "This is the Tier 0 carrier sample spacing, not a converged weak-emitter Delta_t refinement.",
      },
      history_depth: {
        value: config.sampling.historyPeriods,
        status: "tier0_root_history_window_only",
        note:
          "The causal-root history window is recorded, but weak wake history convergence is not tested.",
      },
      eta: missingWeakInput(
        "eta",
        "Tier 1 eta>0 continuation",
        "Tier 0 has no eta schedule or eta refinement limit."
      ),
      convergence_status: "not-computed",
      failure_code_if_drift: "weak-emitter-refinement-drift",
    },
    nonfit_statement:
      "No CKM magnitude, CKM angle, charged-lepton mass ratio, particle mass, or CKM-derived transport action was used to construct this Tier 0 weak handoff placeholder.",
    excluded_benchmark_inputs: WEAK_EXCLUDED_BENCHMARK_INPUTS,
    missing_inputs: missingInputs,
    failure_code: "weak-emitter-not-computed",
  };
}

function failureCatalog() {
  return {
    "quotient-degenerate":
      "Reduced plane-normal Gram data are degenerate after quotienting, so z_lambda does not define a reliable moduli row.",
    "nonpositive-floquet-gap":
      "Tier 1 computed Delta_k <= 0; integer closure is not a stable rest-branch moduli point.",
    "scale-separation-collapse":
      "Radius or period ratios violate the declared separated-scale Tier 0 regime.",
    "delayed-self-root-absent":
      "The self channel contains no admissible delayed self-hit roots beyond the instantaneous exclusion and fold-layer windows.",
    "self-root-fold-layer-required":
      "Self roots occur only in the near-zero fold layer, so an eta>0 regularized fold-layer condition is required before promotion.",
    "root-ledger-instability":
      "The active causal-root ledger is empty or misses partner, self, or inter-layer root classes.",
    "weak-emitter-not-computed":
      "The row does not carry a computed weak-retained causal-wake amplitude and must not feed the Standard Model shielding-envelope packet.",
    "weak-emitter-zero-norm":
      "The computed weak-retained active-tier norm is zero, so no normalized branch-derived envelope can be formed.",
    "weak-emitter-phase-underdetermined":
      "The row does not determine the weak-retained amplitude phase after quotienting the common phase origin.",
    "weak-emitter-refinement-drift":
      "The weak-retained amplitude fails convergence under extraction radius, angular resolution, cycle window, Delta_t, history depth, or eta refinement.",
    "weak-emitter-split-domain":
      "The row does not keep chirality, flavor overlap, and weak-corridor provenance in one weak-visible projection domain.",
    "weak-emitter-benchmark-fit":
      "CKM data, charged-lepton mass ratios, particle masses, or CKM-derived transport actions were used to select or normalize the weak handoff.",
  };
}

function candidateFailure(rootSummary, selfRootDiagnostic, residuals, config, zLambda, scaleGate) {
  if (zLambda.quotient_degenerate) {
    return "quotient-degenerate";
  }
  if (scaleGate.status === "fail") {
    return "scale-separation-collapse";
  }
  if (typeof residuals.Floquet.value === "number" && residuals.Floquet.value <= 0) {
    return "nonpositive-floquet-gap";
  }
  if (residuals.speed.status !== "pass") {
    return "speed-order-collapse";
  }
  if (residuals.phase.status !== "pass") {
    return "phase-closure-open";
  }
  if (residuals.state.status !== "pass" || residuals.drift.status !== "pass") {
    return "carrier-residual-open";
  }
  if (residuals.root.status !== "pass") {
    return "root-residual-open";
  }
  if (residuals.avg.status === "fail") {
    return "averaging-residual-open";
  }
  if (residuals.lock.status === "fail") {
    return "locking-residual-open";
  }
  if (rootSummary.nearSeparator > maximumActiveNearSeparatorRoots(config)) {
    return "separator-singularity-unresolved";
  }
  if (selfRootDiagnostic.status !== "pass") {
    return selfRootDiagnostic.failure_code;
  }
  if (
    rootSummary.total === 0 ||
    rootSummary.byRelation.partner === 0 ||
    rootSummary.byRelation.self === 0 ||
    rootSummary.byRelation.inter_layer === 0
  ) {
    return "root-ledger-instability";
  }
  return "candidate";
}

function buildCertificateGates(
  failureCode,
  rootSummary,
  selfRootDiagnostic,
  residuals,
  config,
  zLambda,
  scaleGate
) {
  return {
    quotient_coordinates: quotientGate(zLambda),
    scale_separation: scaleGate,
    speed_ordering: gate(
      residuals.speed.status,
      "Checks sign-aware ordering for s_I > c_f, s_M near c_f, and s_O < c_f."
    ),
    phase_closure: gate(residuals.phase.status, "Checks layer winding closure over T_k."),
    carrier_residuals: gate(
      residuals.state.status === "pass" && residuals.drift.status === "pass" ? "pass" : "fail",
      "Checks carrier state return and center drift residuals over T_k."
    ),
    root_residual: gate(residuals.root.status, "Checks active causal-root defects on retained branches."),
    active_root_ledger: gate(
      rootSummary.total > 0 &&
        rootSummary.byRelation.partner > 0 &&
        rootSummary.byRelation.self > 0 &&
        rootSummary.byRelation.inter_layer > 0
        ? "pass"
        : "fail",
      "Requires active partner, self, and inter-layer causal-root classes."
    ),
    active_separator_roots: gate(
      rootSummary.nearSeparator <= maximumActiveNearSeparatorRoots(config) ? "pass" : "fail",
      "Active near-separator roots require an explicit locking continuation rule before promotion."
    ),
    self_root_delay_window: gateWithCode(
      selfRootDiagnostic.status,
      selfRootDiagnostic.note,
      selfRootDiagnostic.failure_code
    ),
    near_zero_self_roots: gate(
      rootSummary.excluded.instantaneousSelfKick === 0 ||
        selfRootDiagnostic.totals.admissibleDelayedSelfHit > 0
        ? "pass"
        : "fail",
      "Near-zero self roots are recorded but excluded from the active ledger under H(0)=0; this gate passes only when the self channel also has an admissible delayed hit."
    ),
    regularized_self_fold_layer: gateWithCode(
      rootSummary.excluded.regularizedSelfFoldLayer === 0 ? "pass" : "attention",
      "Self roots inside the fold layer are not promoted to active roots; if they are the only self roots, Tier 1 must regularize the fold layer.",
      rootSummary.excluded.regularizedSelfFoldLayer > 0 &&
        selfRootDiagnostic.totals.admissibleDelayedSelfHit === 0
        ? "self-root-fold-layer-required"
        : null
    ),
    residual_vector_semantics: gate(
      residualSemanticsPass(residuals) ? "pass" : "fail",
      "Every residual component carries status, tolerance, role, and note fields."
    ),
    floquet_gap: gateWithCode(
      "not_computed_in_tier0",
      "Tier 1 must compute Delta_k; Delta_k <= 0 maps to nonpositive-floquet-gap.",
      "nonpositive-floquet-gap"
    ),
    tier0_continuation: gate(
      failureCode === "candidate" ? "pass" : "fail",
      "Only pass rows may seed Tier 1 eta>0 continuation; no row is an accepted attractor."
    ),
  };
}

function buildStateVector(values, config) {
  const bodies = createBodies();
  return {
    labels: bodies.map((body) => ({
      id: body.id,
      layer: body.layer,
      polarity: body.polarity,
      charge: body.charge,
    })),
    centerGauge: "C_A0=0 diagnostic carrier chart",
    historyWindow: config.sampling.historyPeriods * Math.max(...Object.values(values.periods)),
    initial: bodies.map((body) => {
      const state = bodyState(body, values, 0);
      return {
        id: body.id,
        position: state.position,
        velocity: state.velocity,
      };
    }),
  };
}

function* paramGrid(config) {
  const grid = config.grid;
  for (const outerRadius of ensureArray(grid.outerRadius)) {
    for (const epsilonIM of ensureArray(grid.epsilonIM)) {
      for (const epsilonMO of ensureArray(grid.epsilonMO)) {
        for (const deltaI of ensureArray(grid.deltaI)) {
          for (const deltaM of ensureArray(grid.deltaM)) {
            for (const deltaO of ensureArray(grid.deltaO)) {
              for (const ellipticity of ensureArray(grid.ellipticity)) {
                for (const handedness of ensureArray(grid.handedness)) {
                  yield { outerRadius, epsilonIM, epsilonMO, deltaI, deltaM, deltaO, ellipticity, handedness };
                }
              }
            }
          }
        }
      }
    }
  }
}

function rowForParams(params, config, index) {
  const values = buildValues(params, config);
  const roots = enumerateRoots(values, config);
  const rootSummary = summarizeRoots(roots);
  const selfRootDiagnostic = buildSelfRootDiagnostic(roots, values, config);
  const classification = classifyModes(values, config, roots);
  const leakage = leakagePlaceholder(values, config);
  const avgResidual =
    params.epsilonIM +
    params.epsilonMO +
    Math.max(
      config.sampling.minDelay / values.radii.I,
      config.sampling.minDelay / values.radii.M,
      config.sampling.minDelay / values.radii.O
    );
  const leakageResidual = leakage.averageDipole + leakage.averageQuadrupole;
  const residuals = {
    state: residualComponent(
      stateResidual(values, config),
      config.sampling.stateTolerance ?? config.sampling.phaseTolerance,
      "tier0_required",
      null,
      "Carrier-chart return mismatch over one declared common period."
    ),
    root: residualComponent(
      rootSummary.maxRootResidual,
      config.sampling.rootTolerance,
      "tier0_required",
      null,
      "Maximum active causal-root defect on retained branches."
    ),
    phase: residualComponent(
      phaseResidual(values),
      config.sampling.phaseTolerance,
      "tier0_required",
      null,
      "Maximum mismatch from integer layer winding closure."
    ),
    energy: pendingResidual(
      "tier1_or_tier2_required",
      "Tier 0 has no accepted regularized energy/history functional; Tier 1/Tier 2 must compute this."
    ),
    drift: residualComponent(
      0,
      config.sampling.driftTolerance ?? config.sampling.phaseTolerance,
      "tier0_required",
      null,
      "Diagnostic carrier is centered by construction; Tier 1 must retest under direct delayed dynamics."
    ),
    speed: residualComponent(
      speedResidual(values, config.seaCell.c_f),
      config.sampling.speedTolerance,
      "tier0_required",
      null,
      "Sign-aware violation of the intended I/M/O speed ordering."
    ),
    avg: residualComponent(
      avgResidual,
      config.classification.avgTolerance ?? null,
      "tier0_diagnostic",
      config.classification.avgTolerance ? null : "diagnostic",
      "Scale-separation plus regularization proxy for terms claimed to average out."
    ),
    lock: residualComponent(
      classification.nearSeparatorRootCount / Math.max(1, rootSummary.total),
      config.classification.lockFractionTolerance ?? null,
      "tier0_diagnostic",
      config.classification.lockFractionTolerance ? null : "diagnostic",
      "Fraction of active roots classified as near-separator locking roots."
    ),
    leak: residualComponent(
      leakageResidual,
      config.sampling.leakageTolerance,
      "tier2_required",
      leakage.leadingOrder === "suppressed-through-quadrupole" ? "pass" : "attention",
      "Leading far-field leakage placeholder; Tier 2 must replace it with radius/angular extraction."
    ),
    Floquet: pendingResidual(
      "tier1_required",
      "Tier 0 does not construct a monodromy operator; Tier 1 must compute Delta_k after symmetry quotienting."
    ),
  };
  const zLambda = buildZLambda(values, rootSummary, config);
  const scaleGate = scaleSeparationGate(values, config);
  const Delta_k = deltaKStatus();
  const failureCode = candidateFailure(rootSummary, selfRootDiagnostic, residuals, config, zLambda, scaleGate);
  const certificateGates = buildCertificateGates(
    failureCode,
    rootSummary,
    selfRootDiagnostic,
    residuals,
    config,
    zLambda,
    scaleGate
  );
  const branchLabel = {
    k: values.windings,
    q: {
      ...interLayerClosure(values),
    },
    handedness: values.handedness,
    ellipticity: values.ellipticity,
  };
  const residualValues = numericResiduals(residuals);
  const promotionBoundary =
    failureCode === "candidate"
      ? "May seed Tier 1 eta>0 continuation; not an attractor, mass-map result, or inertial-response result."
      : "Does not seed Tier 1 until the failing gate is resolved.";
  const weakRetainedAmplitudeHandoff = buildWeakRetainedAmplitudeHandoff({
    failureCode,
    branchLabel,
    zLambda,
    rootSummary,
    residualValues,
    Delta_k,
    certificateGates,
    promotionBoundary,
    values,
    config,
  });
  return {
    row: index,
    status: failureCode === "candidate" ? "tier0_continuation_ready" : "tier0_rejected",
    failure_code: failureCode,
    branch_label: branchLabel,
    closure_labels: {
      T_k: values.commonPeriod,
      k: values.windings,
      q: {
        ...interLayerClosure(values),
      },
      activeRootClasses: rootSummary.byRelation,
      selfRootDiagnosis: selfRootDiagnostic.diagnosis,
    },
    parameters: params,
    state_vector: buildStateVector(values, config),
    geometry: {
      radii: values.radii,
      speeds: values.speeds,
      omega: values.omega,
      periods: values.periods,
      commonPeriod: values.commonPeriod,
      phaseResiduals: values.phaseResiduals,
    },
    z_lambda: zLambda,
    root_ledger: rootSummary,
    self_root_delay_window: selfRootDiagnostic,
    term_classification: classification,
    leakage_placeholder: leakage,
    Delta_k,
    residuals,
    residual_values: residualValues,
    certificate_gates: certificateGates,
    promotion_boundary: promotionBoundary,
    weak_retained_amplitude_handoff: weakRetainedAmplitudeHandoff,
  };
}

function run(config, limit) {
  const candidates = [];
  let index = 0;
  for (const params of paramGrid(config)) {
    index += 1;
    candidates.push(rowForParams(params, config, index));
    if (candidates.length >= limit) {
      break;
    }
  }
  return {
    metadata: {
      artifact: "a0-tier0-branch-search",
      status: "tier0-certificate-scaffold",
      generatedAt: new Date().toISOString(),
      config: path.relative(process.cwd(), config.__configPath ?? DEFAULT_CONFIG_PATH),
      note:
        "Tier 0 rows are reduced carrier certificate diagnostics. Passing rows may seed Tier 1 only; they are not accepted attractors.",
    },
    sea_cell: config.seaCell,
    tolerances: {
      root: config.sampling.rootTolerance,
      state: config.sampling.stateTolerance ?? config.sampling.phaseTolerance,
      phase: config.sampling.phaseTolerance,
      speed: config.sampling.speedTolerance,
      gammaAvg: config.classification.gammaAvg,
      jLock: config.classification.jLockThreshold,
      instantaneousSelfDelay: minimumSelfDelay(config),
      selfRootFoldLayerDelay: selfRootDelayWindow(config).foldLayerDelay,
      maxScaleRatio: config.classification.maxScaleRatio ?? 0.5,
      quotientDegeneracy: config.classification.quotientDegeneracyTolerance ?? 1e-9,
    },
    failure_catalog: failureCatalog(),
    audit_policy: {
      instantaneousSelfKick:
        "Self roots with delay at or below the near-zero threshold are recorded in raw ledgers but excluded from active branch counts under H(0)=0.",
      selfRootDelayWindow:
        "A self root seeds the active ledger only when it lies beyond the instantaneous exclusion window and the regularized fold-layer window.",
      particleBenchmarksExcluded: [
        "particle masses",
        "charged-lepton ratios",
        "electron radius",
        "measured alpha",
      ],
    },
    candidates,
  };
}

try {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  const configPath = path.resolve(args.config);
  const config = readJson(configPath);
  config.__configPath = configPath;
  const output = run(config, args.limit);
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
