#!/usr/bin/env node

import fs from "node:fs";

const LAYERS = ["I", "M", "O"];
const SIGNS = [-1, 1];
const TWO_PI = 2 * Math.PI;
const EPS = 1e-12;

function parseArgs(argv) {
  const args = {
    maxN: 5,
    minN: 3,
    historyPeriods: 1,
    phaseSamples: 12,
    deltaSamples: 240,
    maxRootIndex: 4,
    jacobianFloor: 1e-4,
    innerSpeed: 0.92,
    middleSpeed: 1,
    outerSpeed: 0.999,
    rootTolerance: 1e-9,
    actionKernel: "inverse-square",
    kernelStrength: 1,
    fitKernelStrength: true,
    conservationTolerance: 1e-6,
    cycleResidualTolerance: 1e-2,
    ledgerTolerance: 1e-6,
    quotient: "coarse",
    includeBranches: false,
    pretty: false,
    out: null,
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      args.help = true;
    } else if (arg === "--max-n") {
      args.maxN = Number(argv[++i]);
    } else if (arg === "--min-n") {
      args.minN = Number(argv[++i]);
    } else if (arg === "--history-periods") {
      args.historyPeriods = Number(argv[++i]);
    } else if (arg === "--phase-samples") {
      args.phaseSamples = Number(argv[++i]);
    } else if (arg === "--delta-samples") {
      args.deltaSamples = Number(argv[++i]);
    } else if (arg === "--max-root-index") {
      args.maxRootIndex = Number(argv[++i]);
    } else if (arg === "--jacobian-floor") {
      args.jacobianFloor = Number(argv[++i]);
    } else if (arg === "--inner-speed") {
      args.innerSpeed = Number(argv[++i]);
    } else if (arg === "--middle-speed") {
      args.middleSpeed = Number(argv[++i]);
    } else if (arg === "--outer-speed") {
      args.outerSpeed = Number(argv[++i]);
    } else if (arg === "--root-tolerance") {
      args.rootTolerance = Number(argv[++i]);
    } else if (arg === "--action-kernel") {
      args.actionKernel = argv[++i];
    } else if (arg === "--kernel-strength") {
      args.kernelStrength = Number(argv[++i]);
      args.fitKernelStrength = false;
    } else if (arg === "--fit-kernel-strength") {
      args.fitKernelStrength = true;
    } else if (arg === "--fixed-kernel-strength") {
      args.fitKernelStrength = false;
    } else if (arg === "--conservation-tolerance") {
      args.conservationTolerance = Number(argv[++i]);
    } else if (arg === "--cycle-residual-tolerance") {
      args.cycleResidualTolerance = Number(argv[++i]);
    } else if (arg === "--ledger-tolerance") {
      args.ledgerTolerance = Number(argv[++i]);
    } else if (arg === "--quotient") {
      args.quotient = argv[++i];
    } else if (arg === "--include-branches") {
      args.includeBranches = true;
    } else if (arg === "--pretty") {
      args.pretty = true;
    } else if (arg === "--out") {
      args.out = argv[++i];
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (!Number.isInteger(args.minN) || args.minN < 3) {
    throw new Error("--min-n must be an integer >= 3.");
  }
  if (!Number.isInteger(args.maxN) || args.maxN < args.minN) {
    throw new Error("--max-n must be an integer >= --min-n.");
  }
  if (!Number.isFinite(args.historyPeriods) || args.historyPeriods <= 0) {
    throw new Error("--history-periods must be positive.");
  }
  if (!Number.isInteger(args.phaseSamples) || args.phaseSamples < 1) {
    throw new Error("--phase-samples must be a positive integer.");
  }
  if (!Number.isInteger(args.deltaSamples) || args.deltaSamples < 8) {
    throw new Error("--delta-samples must be an integer >= 8.");
  }
  if (!Number.isInteger(args.maxRootIndex) || args.maxRootIndex < 0) {
    throw new Error("--max-root-index must be a nonnegative integer.");
  }
  if (!Number.isFinite(args.jacobianFloor) || args.jacobianFloor < 0) {
    throw new Error("--jacobian-floor must be nonnegative.");
  }
  if (!["none", "unit-radial", "inverse-square"].includes(args.actionKernel)) {
    throw new Error("--action-kernel must be none, unit-radial, or inverse-square.");
  }
  for (const key of ["kernelStrength", "conservationTolerance", "cycleResidualTolerance", "ledgerTolerance"]) {
    if (!Number.isFinite(args[key]) || args[key] < 0) {
      throw new Error(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)} must be nonnegative.`);
    }
  }
  for (const key of ["innerSpeed", "middleSpeed", "outerSpeed"]) {
    if (!Number.isFinite(args[key]) || args[key] <= 0) {
      throw new Error(`--${key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)} must be positive.`);
    }
  }
  if (!["coarse", "strict"].includes(args.quotient)) {
    throw new Error("--quotient must be coarse or strict.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/tri-binary/terminal-alignment-enumerator.mjs [options]

Options:
  --min-n N             Minimum inner integer lock. Defaults to 3.
  --max-n N             Maximum inner integer lock. Defaults to 5.
  --history-periods N   Delayed-root search window in outer periods. Defaults to 1.
  --phase-samples N     Reception phases sampled per outer period. Defaults to 12.
  --delta-samples N     Bracketing samples per delayed-root search. Defaults to 240.
  --max-root-index N    Max circular self/partner root index. Defaults to 4.
  --jacobian-floor X    Transversality floor for |J_b|. Defaults to 1e-4.
  --inner-speed X       Normalized s_I/c_f. Defaults to 0.92.
  --middle-speed X      Normalized s_M/c_f. Defaults to 1.
  --outer-speed X       Normalized s_O/c_f. Defaults to 0.999.
  --action-kernel MODE  Diagnostic action kernel: none, unit-radial, or inverse-square. Defaults to inverse-square.
  --kernel-strength X   Use a fixed diagnostic kernel strength instead of the least-squares fitted strength.
  --fit-kernel-strength Fit the kernel strength per candidate. This is the default.
  --fixed-kernel-strength
                         Keep the supplied --kernel-strength.
  --conservation-tolerance X
                         Tolerance for local ledger closure. Defaults to 1e-6.
  --cycle-residual-tolerance X
                         Tolerance for the cycle residual adapter. Defaults to 1e-2.
  --ledger-tolerance X  Tolerance for edge-ledger transfer balance. Defaults to 1e-6.
  --quotient MODE       Edge-key quotient: coarse or strict. Defaults to coarse.
  --include-branches    Include sampled delayed branch rows in the JSON output.
  --out PATH            Write JSON output to PATH instead of stdout.
  --pretty              Pretty-print JSON output.
  --help                Show this help.

This is a reduced terminal-alignment kinematic enumerator. It computes
candidate delayed roots, diagnostic action rows, edge-map multisets, local
ledger residuals, cycle-residual adapters, and transfer rows for the current
transfer-matrix proof route. Its action kernels are diagnostic adapters, not
accepted substrate dynamics.`);
}

function layerParams(n, m, args) {
  const omega = { O: 1, M: m, I: n };
  const speed = {
    I: args.innerSpeed,
    M: args.middleSpeed,
    O: args.outerSpeed,
  };
  const radius = Object.fromEntries(
    LAYERS.map((layer) => [layer, speed[layer] / omega[layer]])
  );
  return {
    cF: 1,
    period: TWO_PI,
    omega,
    speed,
    radius,
    phase: { I: 0, M: 0, O: 0 },
    center: {
      I: [0, 0],
      M: [0, 0],
      O: [0, 0],
    },
  };
}

function vecSub(left, right) {
  return [left[0] - right[0], left[1] - right[1]];
}

function vecAdd(left, right) {
  return [left[0] + right[0], left[1] + right[1]];
}

function dot(left, right) {
  return left[0] * right[0] + left[1] * right[1];
}

function cross2d(left, right) {
  return left[0] * right[1] - left[1] * right[0];
}

function norm(vector) {
  return Math.hypot(vector[0], vector[1]);
}

function scale(vector, factor) {
  return [vector[0] * factor, vector[1] * factor];
}

function position(params, layer, sign, time) {
  const angle = params.omega[layer] * time + params.phase[layer];
  const radius = sign * params.radius[layer];
  const center = params.center[layer];
  return [
    center[0] + radius * Math.cos(angle),
    center[1] + radius * Math.sin(angle),
  ];
}

function velocity(params, layer, sign, time) {
  const angle = params.omega[layer] * time + params.phase[layer];
  const speed = sign * params.radius[layer] * params.omega[layer];
  return [-speed * Math.sin(angle), speed * Math.cos(angle)];
}

function circularAcceleration(params, layer, sign, time) {
  const angle = params.omega[layer] * time + params.phase[layer];
  const magnitude = -sign * params.radius[layer] * params.omega[layer] ** 2;
  return [magnitude * Math.cos(angle), magnitude * Math.sin(angle)];
}

function zeroLedger() {
  return {
    deltaE: 0,
    deltaP: [0, 0],
    deltaJ: 0,
    deltaQ: 0,
  };
}

function addLedger(left, right) {
  return {
    deltaE: left.deltaE + right.deltaE,
    deltaP: vecAdd(left.deltaP, right.deltaP),
    deltaJ: left.deltaJ + right.deltaJ,
    deltaQ: left.deltaQ + right.deltaQ,
  };
}

function scaleLedger(ledger, factor) {
  return {
    deltaE: ledger.deltaE * factor,
    deltaP: scale(ledger.deltaP, factor),
    deltaJ: ledger.deltaJ * factor,
    deltaQ: ledger.deltaQ * factor,
  };
}

function ledgerNorm(ledger) {
  return Math.hypot(ledger.deltaE, ledger.deltaP[0], ledger.deltaP[1], ledger.deltaJ, ledger.deltaQ);
}

function actionMagnitude(distance, chargeSign, args) {
  if (args.actionKernel === "none") {
    return 0;
  }
  if (args.actionKernel === "unit-radial") {
    return chargeSign;
  }
  return chargeSign / Math.max(distance, EPS) ** 2;
}

function delayedResidual(params, branch, delta) {
  const receiver = position(params, branch.receiverLayer, branch.receiverSign, branch.t);
  const source = position(
    params,
    branch.sourceLayer,
    branch.sourceSign,
    branch.t - delta
  );
  return norm(vecSub(receiver, source)) - params.cF * delta;
}

function bisectRoot(params, branch, left, right, tolerance) {
  let a = left;
  let b = right;
  let fa = delayedResidual(params, branch, a);
  let fb = delayedResidual(params, branch, b);

  if (Math.abs(fa) <= tolerance) {
    return a;
  }
  if (Math.abs(fb) <= tolerance) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }

  for (let index = 0; index < 80; index += 1) {
    const mid = 0.5 * (a + b);
    const fm = delayedResidual(params, branch, mid);
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

function delayedRoots(params, branch, args) {
  const minDelta = 1e-7;
  const maxDelta = args.historyPeriods * params.period;
  const step = (maxDelta - minDelta) / args.deltaSamples;
  const roots = [];
  let left = minDelta;
  let fLeft = delayedResidual(params, branch, left);

  for (let index = 1; index <= args.deltaSamples; index += 1) {
    const right = minDelta + index * step;
    const fRight = delayedResidual(params, branch, right);
    const hasRoot =
      Math.abs(fLeft) <= args.rootTolerance ||
      Math.abs(fRight) <= args.rootTolerance ||
      fLeft * fRight < 0;

    if (hasRoot) {
      const root = bisectRoot(params, branch, left, right, args.rootTolerance);
      if (root !== null && root > minDelta && root <= maxDelta) {
        const duplicate = roots.some((value) => Math.abs(value - root) < 1e-5);
        if (!duplicate) {
          roots.push(root);
        }
      }
    }

    left = right;
    fLeft = fRight;
  }

  return roots;
}

function branchGeometry(params, branch, delta, args) {
  const receiver = position(params, branch.receiverLayer, branch.receiverSign, branch.t);
  const source = position(
    params,
    branch.sourceLayer,
    branch.sourceSign,
    branch.t - delta
  );
  const displacement = vecSub(receiver, source);
  const distance = norm(displacement);
  const rHat = distance > EPS ? scale(displacement, 1 / distance) : [0, 0];
  const sourceVelocity = velocity(
    params,
    branch.sourceLayer,
    branch.sourceSign,
    branch.t - delta
  );
  const receiverVelocity = velocity(
    params,
    branch.receiverLayer,
    branch.receiverSign,
    branch.t
  );
  const chargeSign = branch.sourceSign * branch.receiverSign;
  const baseAcceleration = scale(rHat, actionMagnitude(distance, chargeSign, args));
  const jacobian = 1 - dot(sourceVelocity, rHat) / params.cF;
  const normalProjection = dot(rHat, [1, 0]);
  const side =
    normalProjection > args.jacobianFloor
      ? "plus"
      : normalProjection < -args.jacobianFloor
        ? "minus"
        : "tangent";

  return {
    delta,
    residual: delayedResidual(params, branch, delta),
    jacobian,
    transversal: Math.abs(jacobian) >= args.jacobianFloor,
    normal_projection: normalProjection,
    edge_side: side,
    r_hat: rHat,
    charge_sign: chargeSign,
    receiver_position: receiver,
    receiver_velocity: receiverVelocity,
    base_acceleration: baseAcceleration,
  };
}

function solveScalarRoot(fn, left, right, tolerance) {
  let a = left;
  let b = right;
  let fa = fn(a);
  let fb = fn(b);
  if (Math.abs(fa) <= tolerance) {
    return a;
  }
  if (Math.abs(fb) <= tolerance) {
    return b;
  }
  if (fa * fb > 0) {
    return null;
  }
  for (let index = 0; index < 80; index += 1) {
    const mid = 0.5 * (a + b);
    const fm = fn(mid);
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

function circularRootSets(speed, args) {
  const self = [];
  const partner = [];
  for (let r = 0; r <= args.maxRootIndex; r += 1) {
    const selfFn = (delta) => delta + TWO_PI * r - 2 * speed * Math.sin(delta / 2);
    const partnerFn = (delta) => delta + TWO_PI * r - 2 * speed * Math.cos(delta / 2);
    const selfRoot = solveScalarRoot(selfFn, 0, TWO_PI, args.rootTolerance);
    if (selfRoot !== null) {
      self.push({
        r,
        delta: selfRoot,
        derivative: 1 - speed * Math.cos(selfRoot / 2),
        class: selfRoot <= 1e-7 ? "zero-delay-boundary" : "interior",
      });
    }
    const partnerRoot = solveScalarRoot(partnerFn, 0, TWO_PI, args.rootTolerance);
    if (partnerRoot !== null) {
      partner.push({
        r,
        delta: partnerRoot,
        derivative: 1 + speed * Math.sin(partnerRoot / 2),
        class: "interior",
      });
    }
  }
  return { self, partner };
}

function receiverKey(row) {
  return `${row.receiverLayer}:${row.receiverSign}:p${row.reception_phase_fraction}`;
}

function expectedReceiverAcceleration(params, row) {
  return circularAcceleration(params, row.receiverLayer, row.receiverSign, row.t);
}

function cycleResidualFit(params, branchRows, args) {
  const groups = new Map();
  for (const row of branchRows) {
    const key = receiverKey(row);
    if (!groups.has(key)) {
      groups.set(key, {
        expected: expectedReceiverAcceleration(params, row),
        base: [0, 0],
        rows: 0,
      });
    }
    const group = groups.get(key);
    group.base = vecAdd(group.base, row.base_acceleration);
    group.rows += 1;
  }

  let numerator = 0;
  let denominator = 0;
  for (const group of groups.values()) {
    numerator += dot(group.expected, group.base);
    denominator += dot(group.base, group.base);
  }
  const fittedStrength =
    args.actionKernel === "none" || denominator <= EPS ? 0 : numerator / denominator;
  const kernelStrength = args.fitKernelStrength ? fittedStrength : args.kernelStrength;

  let squared = 0;
  let maxNorm = 0;
  const samples = [];
  for (const [key, group] of groups.entries()) {
    const produced = scale(group.base, kernelStrength);
    const residual = vecSub(group.expected, produced);
    const residualNorm = norm(residual);
    squared += residualNorm * residualNorm;
    maxNorm = Math.max(maxNorm, residualNorm);
    samples.push({
      receiver: key,
      branch_count: group.rows,
      expected: group.expected,
      produced,
      residual,
      residual_norm: residualNorm,
    });
  }

  const rms = groups.size > 0 ? Math.sqrt(squared / groups.size) : 0;
  return {
    action_kernel: args.actionKernel,
    fitted_kernel_strength: fittedStrength,
    used_kernel_strength: kernelStrength,
    fit_mode: args.fitKernelStrength ? "least_squares_per_candidate" : "fixed_kernel_strength",
    sample_count: groups.size,
    rms_residual: rms,
    max_residual: maxNorm,
    tolerance: args.cycleResidualTolerance,
    status: rms <= args.cycleResidualTolerance ? "pass" : "fail",
    note:
      "This adapter compares circular terminal acceleration with the diagnostic inter-layer action sum. It excludes intra-layer action, regularization, and the true substrate action functional.",
    worst_samples: samples
      .sort((left, right) => right.residual_norm - left.residual_norm)
      .slice(0, 6),
  };
}

function branchLedger(row, kernelStrength) {
  const acceleration = scale(row.base_acceleration, kernelStrength);
  const impulse = scale(acceleration, row.delta);
  const work = dot(impulse, row.receiver_velocity);
  return {
    acceleration,
    ledger: {
      deltaE: work,
      deltaP: impulse,
      deltaJ: cross2d(row.receiver_position, impulse),
      deltaQ: 0,
    },
  };
}

function materializeActionRows(branchRows, kernelStrength) {
  return branchRows.map((row) => {
    const action = branchLedger(row, kernelStrength);
    return {
      ...row,
      action_acceleration: action.acceleration,
      action_ledger: action.ledger,
    };
  });
}

function localConservation(actionRows, args) {
  const total = actionRows.reduce(
    (sum, row) => addLedger(sum, row.action_ledger ?? zeroLedger()),
    zeroLedger()
  );
  const residualNorm = ledgerNorm(total);
  return {
    total,
    residual_norm: residualNorm,
    tolerance: args.conservationTolerance,
    status: residualNorm <= args.conservationTolerance ? "pass" : "fail",
    note:
      "This is a diagnostic receiver-side sum over sampled inter-layer branches. It becomes a proof object only after the missing source recoil, intra-layer action, and regularized energy ledger are supplied.",
  };
}

function edgeLedger(row) {
  if (row.edge_side === "plus") {
    return row.action_ledger ?? zeroLedger();
  }
  if (row.edge_side === "minus") {
    return scaleLedger(row.action_ledger ?? zeroLedger(), -1);
  }
  return zeroLedger();
}

function edgeKey(branchRow, quotient) {
  const chargeSign = branchRow.sourceSign * branchRow.receiverSign;
  const layerPair = `${branchRow.sourceLayer}->${branchRow.receiverLayer}`;
  const normalBin =
    Math.abs(branchRow.normal_projection) < 0.25
      ? "near-tangent"
      : Math.abs(branchRow.normal_projection) < 0.75
        ? "oblique"
        : "normal";
  if (quotient === "strict") {
    const phaseBin = Math.round(branchRow.reception_phase_fraction * 24);
    const deltaBin = Math.round(branchRow.delta * 1000);
    return `inter-layer:${layerPair}:q${chargeSign}:p${phaseBin}:d${deltaBin}:${normalBin}`;
  }
  return `inter-layer:${layerPair}:q${chargeSign}:${normalBin}`;
}

function multiset(rows, side, quotient) {
  const entries = new Map();
  for (const row of rows) {
    if (row.edge_side !== side || !row.transversal) {
      continue;
    }
    const key = edgeKey(row, quotient);
    if (!entries.has(key)) {
      entries.set(key, { key, count: 0, ledger: zeroLedger() });
    }
    const entry = entries.get(key);
    entry.count += 1;
    entry.ledger = addLedger(entry.ledger, edgeLedger(row));
  }
  return [...entries.values()]
    .sort((left, right) => left.key.localeCompare(right.key))
    .map((entry) => ({
      ...entry,
      ledger_norm: ledgerNorm(entry.ledger),
    }));
}

function sameMultiset(left, right) {
  const simplify = (entries) => entries.map((entry) => ({ key: entry.key, count: entry.count }));
  return JSON.stringify(simplify(left)) === JSON.stringify(simplify(right));
}

function candidate(n, m, args) {
  const params = layerParams(n, m, args);
  const branchRows = [];
  const circular_roots = Object.fromEntries(
    LAYERS.map((layer) => [layer, circularRootSets(params.speed[layer], args)])
  );

  for (let phaseIndex = 0; phaseIndex < args.phaseSamples; phaseIndex += 1) {
    const t = (phaseIndex / args.phaseSamples) * params.period;
    for (const sourceLayer of LAYERS) {
      for (const receiverLayer of LAYERS) {
        if (sourceLayer === receiverLayer) {
          continue;
        }
        for (const sourceSign of SIGNS) {
          for (const receiverSign of SIGNS) {
            const branch = { sourceLayer, receiverLayer, sourceSign, receiverSign, t };
            const roots = delayedRoots(params, branch, args);
            roots.forEach((delta, rootIndex) => {
              const geometry = branchGeometry(params, branch, delta, args);
              branchRows.push({
                id: `${sourceLayer}${sourceSign > 0 ? "p" : "m"}_${receiverLayer}${receiverSign > 0 ? "p" : "m"}_phase${phaseIndex}_root${rootIndex}`,
                sourceLayer,
                receiverLayer,
                sourceSign,
                receiverSign,
                t,
                reception_phase_fraction: phaseIndex / args.phaseSamples,
                root_index: rootIndex,
                ...geometry,
              });
            });
          }
        }
      }
    }
  }

  const cycle_residual_adapter = cycleResidualFit(params, branchRows, args);
  const actionRows = materializeActionRows(
    branchRows,
    cycle_residual_adapter.used_kernel_strength
  );
  const local_conservation = localConservation(actionRows, args);
  const plus = multiset(actionRows, "plus", args.quotient);
  const minus = multiset(actionRows, "minus", args.quotient);
  const transversalCount = actionRows.filter((row) => row.transversal).length;
  const grazingCount = actionRows.length - transversalCount;
  const byLayerPair = {};
  for (const row of actionRows) {
    const key = `${row.sourceLayer}->${row.receiverLayer}`;
    byLayerPair[key] ??= { total: 0, transversal: 0, grazing: 0 };
    byLayerPair[key].total += 1;
    byLayerPair[key][row.transversal ? "transversal" : "grazing"] += 1;
  }

  const result = {
    id: `term_n${n}_m${m}`,
    integer_lock: { I: n, M: m, O: 1 },
    normalized_speeds: params.speed,
    normalized_radii: params.radius,
    circular_roots,
    delayed_branch_inventory: {
      scanned_contexts:
        args.phaseSamples * LAYERS.length * (LAYERS.length - 1) * SIGNS.length * SIGNS.length,
      roots_total: branchRows.length,
      transversal: transversalCount,
      grazing_or_boundary: grazingCount,
      by_layer_pair: byLayerPair,
    },
    action_diagnostics: {
      cycle_residual_adapter,
      local_conservation,
    },
    edge_maps: { plus, minus },
    status:
      branchRows.length === 0
        ? "no_delayed_roots_found"
        : grazingCount === branchRows.length
          ? "grazing_boundary_only"
          : "kinematic_edge_maps_enumerated",
  };

  if (args.includeBranches) {
    result.sampled_branches = actionRows;
  }

  return result;
}

function edgeEntryMap(entries) {
  return new Map(entries.map((entry) => [entry.key, entry]));
}

function edgeBalance(leftEntries, rightEntries) {
  const leftByKey = edgeEntryMap(leftEntries);
  const rightByKey = edgeEntryMap(rightEntries);
  const keys = new Set([...leftByKey.keys(), ...rightByKey.keys()]);
  let total = zeroLedger();
  const byKey = [];
  for (const key of [...keys].sort()) {
    const left = leftByKey.get(key);
    const right = rightByKey.get(key);
    const balance = addLedger(left?.ledger ?? zeroLedger(), right?.ledger ?? zeroLedger());
    total = addLedger(total, balance);
    byKey.push({
      key,
      left_count: left?.count ?? 0,
      right_count: right?.count ?? 0,
      ledger_balance_norm: ledgerNorm(balance),
    });
  }
  return {
    total,
    residual_norm: ledgerNorm(total),
    by_key: byKey,
  };
}

function transferRow(left, right, args) {
  const edgeKeyMatch = sameMultiset(left.edge_maps.plus, right.edge_maps.minus);
  const balance = edgeBalance(left.edge_maps.plus, right.edge_maps.minus);
  const localConservationPass =
    left.action_diagnostics.local_conservation.status === "pass" &&
    right.action_diagnostics.local_conservation.status === "pass";
  const cycleResidualPass =
    left.action_diagnostics.cycle_residual_adapter.status === "pass" &&
    right.action_diagnostics.cycle_residual_adapter.status === "pass";
  const edgeLedgerPass = balance.residual_norm <= args.ledgerTolerance;
  const accepted = edgeKeyMatch && edgeLedgerPass && localConservationPass && cycleResidualPass;
  const failureCodes = [];
  if (!edgeKeyMatch) {
    failureCodes.push("terminal.edge_key_mismatch");
  }
  if (!edgeLedgerPass) {
    failureCodes.push("terminal.edge_ledger_balance_residual");
  }
  if (!localConservationPass) {
    failureCodes.push("terminal.local_conservation_residual");
  }
  if (!cycleResidualPass) {
    failureCodes.push("terminal.cycle_residual_adapter_residual");
  }
  return {
    from: left.id,
    to: right.id,
    edge_key_match: edgeKeyMatch,
    edge_ledger_balance_norm: balance.residual_norm,
    ledger_tolerance: args.ledgerTolerance,
    accepted,
    failure_codes: failureCodes,
  };
}

function compatibility(candidates, args) {
  const edgeProxyMatrix = candidates.map((left) =>
    candidates.map((right) => (sameMultiset(left.edge_maps.plus, right.edge_maps.minus) ? 1 : 0))
  );
  const rows = candidates.flatMap((left) =>
    candidates.map((right) => transferRow(left, right, args))
  );
  const actionMatrix = candidates.map((left) =>
    candidates.map((right) =>
      rows.some((row) => row.from === left.id && row.to === right.id && row.accepted) ? 1 : 0
    )
  );
  const edges = [];
  edgeProxyMatrix.forEach((row, leftIndex) => {
    row.forEach((value, rightIndex) => {
      if (value) {
        edges.push({
          from: candidates[leftIndex].id,
          to: candidates[rightIndex].id,
        });
      }
    });
  });
  const acceptedEdges = rows
    .filter((row) => row.accepted)
    .map((row) => ({ from: row.from, to: row.to }));
  return {
    edge_proxy: {
      matrix: edgeProxyMatrix,
      edges,
      spectral_radius: spectralRadius(edgeProxyMatrix),
    },
    action_complete: {
      matrix: actionMatrix,
      edges: acceptedEdges,
      rows,
      spectral_radius: spectralRadius(actionMatrix),
    },
  };
}

function spectralRadius(matrix) {
  const size = matrix.length;
  if (size === 0) {
    return 0;
  }
  let vector = Array(size).fill(1 / size);
  let lambda = 0;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const next = matrix.map((row) =>
      row.reduce((sum, value, index) => sum + value * vector[index], 0)
    );
    const total = next.reduce((sum, value) => sum + value, 0);
    if (total <= EPS) {
      return 0;
    }
    lambda = total / vector.reduce((sum, value) => sum + value, 0);
    vector = next.map((value) => value / total);
  }
  return lambda;
}

function buildPacket(args) {
  const candidates = [];
  for (let n = args.minN; n <= args.maxN; n += 1) {
    for (let m = 2; m < n; m += 1) {
      candidates.push(candidate(n, m, args));
    }
  }
  const transfer = compatibility(candidates, args);
  const edgeRho = transfer.edge_proxy.spectral_radius;
  const actionRho = transfer.action_complete.spectral_radius;
  return {
    artifact: "terminal-alignment-action-enumerator",
    generated_by: "scripts/tri-binary/terminal-alignment-enumerator.mjs",
    comparison_level: "reduced circular terminal-action diagnostic proof packet",
    note:
      "This enumerates delayed roots, diagnostic branch-action rows, edge-map multisets, local ledger residuals, and transfer rows. Its action kernels are diagnostic adapters, not accepted substrate dynamics.",
    parameters: {
      min_n: args.minN,
      max_n: args.maxN,
      history_periods: args.historyPeriods,
      phase_samples: args.phaseSamples,
      delta_samples: args.deltaSamples,
      max_root_index: args.maxRootIndex,
      jacobian_floor: args.jacobianFloor,
      action_kernel: args.actionKernel,
      kernel_strength: args.kernelStrength,
      fit_kernel_strength: args.fitKernelStrength,
      conservation_tolerance: args.conservationTolerance,
      cycle_residual_tolerance: args.cycleResidualTolerance,
      ledger_tolerance: args.ledgerTolerance,
      quotient: args.quotient,
      normalized_speeds: {
        I: args.innerSpeed,
        M: args.middleSpeed,
        O: args.outerSpeed,
      },
    },
    proof_obligations: {
      terminal_kinematics: "enumerated_by_this_packet",
      edge_projection: "action_row_edge_multisets_enumerated_by_this_packet",
      cycle_averaged_residual: "diagnostic_adapter_only_until_action_kernel_is_accepted",
      local_conservation_ledger: "diagnostic_receiver_side_sum_only_until_source_recoil_and_regularized_energy_ledger_are_supplied",
      physical_observer_quotient: "coarse_or_strict_numerical_quotient_only",
    },
    candidates,
    transfer_compatibility: {
      scope: "edge proxy plus action-complete diagnostic rows",
      edge_proxy: {
        ...transfer.edge_proxy,
        strip_entropy_density_proxy: edgeRho > 0 ? Math.log(edgeRho) : null,
      },
      action_complete: {
        ...transfer.action_complete,
        strip_entropy_density_proxy: actionRho > 0 ? Math.log(actionRho) : null,
      },
    },
    classification:
      actionRho > 0
        ? "nonempty_action_complete_transfer_proxy"
        : edgeRho > 0
          ? "edge_proxy_nonempty_but_action_complete_transfer_blocked"
          : "empty_edge_proxy_or_overstrict_quotient",
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }
  const packet = buildPacket(args);
  const json = JSON.stringify(packet, null, args.pretty ? 2 : 0);
  if (args.out) {
    fs.writeFileSync(args.out, `${json}\n`);
  } else {
    console.log(json);
  }
}

main();
