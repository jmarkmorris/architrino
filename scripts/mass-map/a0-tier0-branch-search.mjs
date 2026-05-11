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

This is a Tier 0 diagnostic scaffold. It enumerates reduced carrier charts,
solves sampled causal-root ledgers, classifies averaging/locking/leakage
placeholders, and emits branch rows. It is not a full delayed-dynamics solver.`);
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
            const duplicate = roots.some(
              (root) =>
                root.receiver === receiver.id &&
                root.source === source.id &&
                Math.abs(root.t - t) < 1e-9 &&
                Math.abs(root.delay - rootTau) < rootStep
            );
            if (rootTau !== null && !duplicate) {
              const receiverState = bodyState(receiver, values, t);
              const sourceState = bodyState(source, values, t - rootTau);
              const direction = unit(sub(receiverState.position, sourceState.position));
              const j = 1 - dot(sourceState.velocity, direction) / cF;
              roots.push({
                receiver: receiver.id,
                source: source.id,
                relation: sourceRelation(receiver, source),
                t,
                delay: rootTau,
                residual: Math.abs(rootFunction(receiver, source, values, t, rootTau, cF)),
                J: j,
                nearSeparator: Math.abs(j) <= config.classification.jLockThreshold,
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
  const summary = {
    total: roots.length,
    byRelation: {
      partner: 0,
      self: 0,
      inter_layer: 0,
    },
    nearSeparator: 0,
    minAbsJ: null,
    maxDelay: 0,
    maxRootResidual: 0,
  };
  for (const root of roots) {
    summary.byRelation[root.relation] += 1;
    summary.nearSeparator += root.nearSeparator ? 1 : 0;
    const absJ = Math.abs(root.J);
    summary.minAbsJ = summary.minAbsJ === null ? absJ : Math.min(summary.minAbsJ, absJ);
    summary.maxDelay = Math.max(summary.maxDelay, root.delay);
    summary.maxRootResidual = Math.max(summary.maxRootResidual, root.residual);
  }
  return summary;
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
  const nearSeparatorRoots = roots
    .filter((root) => root.nearSeparator)
    .slice(0, 20)
    .map((root) => ({
      receiver: root.receiver,
      source: root.source,
      relation: root.relation,
      delay: root.delay,
      J: root.J,
    }));
  return {
    nonresonantCount,
    nearestMismatch,
    lockModes: lockModes.slice(0, 20),
    lockModeCount: lockModes.length,
    nearSeparatorRoots,
    nearSeparatorRootCount: roots.filter((root) => root.nearSeparator).length,
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

function candidateFailure(values, rootSummary, residuals, config) {
  if (residuals.speed > config.sampling.speedTolerance) {
    return "speed-order-collapse";
  }
  if (residuals.phase > config.sampling.phaseTolerance) {
    return "phase-closure-open";
  }
  if (rootSummary.total === 0 || rootSummary.byRelation.partner === 0 || rootSummary.byRelation.inter_layer === 0) {
    return "root-ledger-open";
  }
  return "candidate";
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
  const residuals = {
    state: null,
    root: rootSummary.maxRootResidual,
    phase: phaseResidual(values),
    energy: null,
    drift: 0,
    speed: speedResidual(values, config.seaCell.c_f),
    avg: params.epsilonIM + params.epsilonMO + Math.max(
      config.sampling.minDelay / values.radii.I,
      config.sampling.minDelay / values.radii.M,
      config.sampling.minDelay / values.radii.O
    ),
    lock: classification.nearSeparatorRootCount / Math.max(1, rootSummary.total),
    leak: leakage.averageDipole + leakage.averageQuadrupole,
    Floquet: null,
  };
  const failureCode = candidateFailure(values, rootSummary, residuals, config);
  return {
    row: index,
    status: failureCode === "candidate" ? "tier0_candidate" : "tier0_rejected",
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
    parameters: params,
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
      status: "diagnostic-scaffold",
      generatedAt: new Date().toISOString(),
      config: path.relative(process.cwd(), config.__configPath ?? DEFAULT_CONFIG_PATH),
      note: "Tier 0 rows are reduced carrier diagnostics, not accepted attractors.",
    },
    sea_cell: config.seaCell,
    tolerances: {
      root: config.sampling.rootTolerance,
      phase: config.sampling.phaseTolerance,
      speed: config.sampling.speedTolerance,
      gammaAvg: config.classification.gammaAvg,
      jLock: config.classification.jLockThreshold,
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
