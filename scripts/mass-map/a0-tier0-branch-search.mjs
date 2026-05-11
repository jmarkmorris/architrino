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

function classifyRoot(receiver, source, rootTau, j, config) {
  const relation = sourceRelation(receiver, source);
  const isNearZeroSelf = relation === "self" && rootTau <= minimumSelfDelay(config);
  return {
    relation,
    status: isNearZeroSelf ? "excluded_instantaneous_self_kick" : "active",
    nearSeparator: Math.abs(j) <= config.classification.jLockThreshold,
    nearZeroSelf: isNearZeroSelf,
  };
}

function rootFunction(receiver, source, values, t, tau, cF) {
  const receiverState = bodyState(receiver, values, t);
  const sourceState = bodyState(source, values, t - tau);
  return norm(sub(receiverState.position, sourceState.position)) - cF * tau;
}

function solveRoot(receiver, source, values, t, lo, hi, cF, tolerance) {
  let a = lo;
  let b = hi;
  let fa = rootFunction(receiver, source, values, t, a, cF);
  let fb = rootFunction(receiver, source, values, t, b, cF);
  if (Math.abs(fa) <= tolerance) {
    return a;
  }
  if (Math.abs(fb) <= tolerance) {
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

function enumerateRoots(values, config) {
  const cF = config.seaCell.c_f;
  const bodies = createBodies();
  const sampling = config.sampling;
  const historyWindow = sampling.historyPeriods * Math.max(...Object.values(values.periods));
  const rootStep = historyWindow / sampling.rootSamples;
  const roots = [];
  const sampleTimes = Array.from({ length: sampling.sampleCount }, (_, i) =>
    (values.commonPeriod * i) / sampling.sampleCount
  );

  for (const t of sampleTimes) {
    for (const receiver of bodies) {
      for (const source of bodies) {
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
            const duplicate = roots.some(
              (root) =>
                root.receiver === receiver.id &&
                root.source === source.id &&
                Math.abs(root.t - t) < 1e-9 &&
                Math.abs(root.delay - rootTau) < rootStep
            );
            if (!duplicate) {
              const receiverState = bodyState(receiver, values, t);
              const sourceState = bodyState(source, values, t - rootTau);
              const direction = unit(sub(receiverState.position, sourceState.position));
              const j = 1 - dot(sourceState.velocity, direction) / cF;
              const rootClass = classifyRoot(receiver, source, rootTau, j, config);
              roots.push({
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
              });
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
      }
      continue;
    }
    summary.byRelation[root.relation] += 1;
    summary.nearSeparator += root.nearSeparator ? 1 : 0;
    summary.minAbsJ = summary.minAbsJ === null ? absJ : Math.min(summary.minAbsJ, absJ);
    summary.maxDelay = Math.max(summary.maxDelay, root.delay);
    summary.maxRootResidual = Math.max(summary.maxRootResidual, root.residual);
  }
  return summary;
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

function candidateFailure(rootSummary, residuals, config) {
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
  if (rootSummary.excluded.instantaneousSelfKick > (config.classification.maxExcludedInstantaneousSelfRoots ?? 0)) {
    return "near-zero-self-root-excluded";
  }
  if (
    rootSummary.total === 0 ||
    rootSummary.byRelation.partner === 0 ||
    rootSummary.byRelation.self === 0 ||
    rootSummary.byRelation.inter_layer === 0
  ) {
    return "root-ledger-open";
  }
  return "candidate";
}

function buildCertificateGates(failureCode, rootSummary, residuals, config) {
  return {
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
    near_zero_self_roots: gate(
      rootSummary.excluded.instantaneousSelfKick <=
        (config.classification.maxExcludedInstantaneousSelfRoots ?? 0)
        ? "pass"
        : "fail",
      "Near-zero self roots are recorded but excluded from the active ledger under H(0)=0."
    ),
    residual_vector_semantics: gate(
      residualSemanticsPass(residuals) ? "pass" : "fail",
      "Every residual component carries status, tolerance, role, and note fields."
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
  const failureCode = candidateFailure(rootSummary, residuals, config);
  const certificateGates = buildCertificateGates(failureCode, rootSummary, residuals, config);
  return {
    row: index,
    status: failureCode === "candidate" ? "tier0_continuation_ready" : "tier0_rejected",
    failure_code: failureCode,
    branch_label: {
      k: values.windings,
      q: {
        IM: values.windings.I - values.windings.M,
        MO: values.windings.M - values.windings.O,
        IO: values.windings.I - values.windings.O,
      },
      handedness: values.handedness,
      ellipticity: values.ellipticity,
    },
    closure_labels: {
      T_k: values.commonPeriod,
      k: values.windings,
      q: {
        IM: values.windings.I - values.windings.M,
        MO: values.windings.M - values.windings.O,
        IO: values.windings.I - values.windings.O,
      },
      activeRootClasses: rootSummary.byRelation,
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
    root_ledger: rootSummary,
    term_classification: classification,
    leakage_placeholder: leakage,
    residuals,
    residual_values: numericResiduals(residuals),
    certificate_gates: certificateGates,
    promotion_boundary:
      failureCode === "candidate"
        ? "May seed Tier 1 eta>0 continuation; not an attractor, mass-map result, or inertial-response result."
        : "Does not seed Tier 1 until the failing gate is resolved.",
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
    },
    audit_policy: {
      instantaneousSelfKick:
        "Self roots with delay at or below the near-zero threshold are recorded in raw ledgers but excluded from active branch counts under H(0)=0.",
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
