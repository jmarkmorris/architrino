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
    terminalFamily: "concentric",
    terminalPhaseOffset: 0.125,
    terminalCenterShift: 0.05,
    rootTolerance: 1e-9,
    actionKernel: "inverse-square",
    kernelStrength: 1,
    fitKernelStrength: true,
    conservationTolerance: 1e-6,
    cycleResidualTolerance: 1e-2,
    ledgerTolerance: 1e-6,
    variationTolerance: 1e-3,
    variationStep: 1e-4,
    quotient: "coarse",
    blockSize: 16,
    patchAreaFactor: 1,
    areaModel: "declared",
    coefficientTarget: 0.25,
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
    } else if (arg === "--terminal-family") {
      args.terminalFamily = argv[++i];
    } else if (arg === "--terminal-phase-offset") {
      args.terminalPhaseOffset = Number(argv[++i]);
    } else if (arg === "--terminal-center-shift") {
      args.terminalCenterShift = Number(argv[++i]);
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
    } else if (arg === "--variation-tolerance") {
      args.variationTolerance = Number(argv[++i]);
    } else if (arg === "--variation-step") {
      args.variationStep = Number(argv[++i]);
    } else if (arg === "--quotient") {
      args.quotient = argv[++i];
    } else if (arg === "--block-size") {
      args.blockSize = Number(argv[++i]);
    } else if (arg === "--patch-area-factor") {
      args.patchAreaFactor = Number(argv[++i]);
    } else if (arg === "--area-model") {
      args.areaModel = argv[++i];
    } else if (arg === "--coefficient-target") {
      args.coefficientTarget = Number(argv[++i]);
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
  for (const key of [
    "kernelStrength",
    "conservationTolerance",
    "cycleResidualTolerance",
    "ledgerTolerance",
    "variationTolerance",
    "variationStep",
  ]) {
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
  if (!["concentric", "phase-offset", "shifted-center"].includes(args.terminalFamily)) {
    throw new Error("--terminal-family must be concentric, phase-offset, or shifted-center.");
  }
  if (
    !Number.isFinite(args.terminalPhaseOffset) ||
    args.terminalPhaseOffset < -0.5 ||
    args.terminalPhaseOffset > 0.5
  ) {
    throw new Error("--terminal-phase-offset must be a finite outer-period fraction in [-0.5, 0.5].");
  }
  if (
    !Number.isFinite(args.terminalCenterShift) ||
    args.terminalCenterShift < 0 ||
    args.terminalCenterShift > 1
  ) {
    throw new Error("--terminal-center-shift must be a finite outer-radius fraction in [0, 1].");
  }
  if (!["declared", "outer-disk", "layer-sum"].includes(args.areaModel)) {
    throw new Error("--area-model must be declared, outer-disk, or layer-sum.");
  }
  if (!Number.isInteger(args.blockSize) || args.blockSize < 1) {
    throw new Error("--block-size must be a positive integer.");
  }
  if (!Number.isFinite(args.patchAreaFactor) || args.patchAreaFactor <= 0) {
    throw new Error("--patch-area-factor must be positive.");
  }
  if (!Number.isFinite(args.coefficientTarget) || args.coefficientTarget < 0) {
    throw new Error("--coefficient-target must be nonnegative.");
  }

  return args;
}

function printHelp() {
  console.log(`Usage: node scripts/nested-shell-swarm/terminal-alignment-enumerator.mjs [options]

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
  --terminal-family MODE
                         Terminal branch family: concentric, phase-offset, or shifted-center. Defaults to concentric.
  --terminal-phase-offset X
                         Phase-offset family fraction of one outer period. Defaults to 0.125.
  --terminal-center-shift X
                         Shifted-center family fraction of the outer alignment radius. Defaults to 0.05.
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
  --variation-tolerance X
                         Tolerance for the branch-summed action-variation residual. Defaults to 1e-3.
  --variation-step X    Finite-difference step for variation residuals. Defaults to 1e-4.
  --quotient MODE       Edge-key quotient: coarse or strict. Defaults to coarse.
  --block-size N        Open-strip finite block length for coefficient residuals. Defaults to 16.
  --patch-area-factor X Dimensionless a_theta = A_theta/(|U| A_align). Defaults to 1.
  --area-model MODE     Patch area model: declared, outer-disk, or layer-sum. Defaults to declared.
  --coefficient-target X
                         Area-normalized entropy coefficient target. Defaults to 0.25.
  --include-branches    Include sampled delayed branch rows in the JSON output.
  --out PATH            Write JSON output to PATH instead of stdout.
  --pretty              Pretty-print JSON output.
  --help                Show this help.

This is a reduced terminal-alignment kinematic enumerator. It computes
candidate delayed roots, diagnostic action rows, edge-map multisets, local
and source-recoil ledger residuals, per-branch stationarity residuals,
branch-summed action-variation residuals, cycle-residual adapters,
area-normalized finite-block coefficients, and transfer rows for the current
transfer-matrix proof route. Active intra-layer partner-hit rows and any
interior self-hit rows are materialized from the circular root ledgers; zero-delay
self-hit boundaries are inventoried but excluded by H(0)=0. Its action kernels are
diagnostic adapters, not accepted substrate dynamics.`);
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
  const phase =
    args.terminalFamily === "phase-offset"
      ? {
          I: -TWO_PI * args.terminalPhaseOffset,
          M: TWO_PI * args.terminalPhaseOffset,
          O: 0,
        }
      : { I: 0, M: 0, O: 0 };
  const alignRadius = 1 / omega.O;
  const centerShift =
    args.terminalFamily === "shifted-center" ? args.terminalCenterShift * alignRadius : 0;
  const center =
    args.terminalFamily === "shifted-center"
      ? {
          I: [-centerShift, 0],
          M: [0.5 * centerShift, (Math.sqrt(3) / 2) * centerShift],
          O: [0.5 * centerShift, -(Math.sqrt(3) / 2) * centerShift],
        }
      : {
          I: [0, 0],
          M: [0, 0],
          O: [0, 0],
        };
  return {
    cF: 1,
    period: TWO_PI,
    omega,
    speed,
    radius,
    phase,
    center,
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
    distance,
    charge_sign: chargeSign,
    source_position: source,
    source_velocity: sourceVelocity,
    receiver_position: receiver,
    receiver_velocity: receiverVelocity,
    base_acceleration: baseAcceleration,
  };
}

function branchVariationKernel(params, branch, delta) {
  const receiver = position(params, branch.receiverLayer, branch.receiverSign, branch.t);
  const source = position(
    params,
    branch.sourceLayer,
    branch.sourceSign,
    branch.t - delta
  );
  const displacement = vecSub(receiver, source);
  const distance = norm(displacement);
  if (distance <= EPS) {
    return null;
  }
  const rHat = scale(displacement, 1 / distance);
  const sourceVelocity = velocity(
    params,
    branch.sourceLayer,
    branch.sourceSign,
    branch.t - delta
  );
  const jacobian = 1 - dot(sourceVelocity, rHat) / params.cF;
  if (Math.abs(jacobian) <= EPS) {
    return null;
  }
  return scale(rHat, 1 / (distance * jacobian));
}

function branchVariationResidual(params, branch, delta, args) {
  const requestedStep = args.variationStep || 0;
  const step = Math.max(requestedStep, args.rootTolerance * 100, EPS);
  const leftDelta = delta - step;
  const rightDelta = delta + step;
  const center = branchVariationKernel(params, branch, delta);
  let derivative = null;
  let mode = null;

  if (leftDelta > EPS) {
    const left = branchVariationKernel(params, branch, leftDelta);
    const right = branchVariationKernel(params, branch, rightDelta);
    if (left && right) {
      derivative = scale(vecSub(right, left), -1 / (2 * step));
      mode = "central_t0_difference";
    }
  }

  if (!derivative && center) {
    const right = branchVariationKernel(params, branch, rightDelta);
    if (right) {
      derivative = scale(vecSub(right, center), -1 / step);
      mode = "forward_t0_difference";
    }
  }

  const residualNorm = derivative ? norm(derivative) : null;
  return {
    derivative,
    residual_norm: residualNorm,
    finite_difference_step: step,
    mode,
    tolerance: args.variationTolerance,
    status:
      residualNorm !== null && residualNorm <= args.variationTolerance ? "pass" : "fail",
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

function sourceIdentity(branch) {
  if (branch.source_identity) {
    return branch.source_identity;
  }
  if (branch.sourceLayer !== branch.receiverLayer) {
    return "inter-layer";
  }
  return branch.sourceSign === branch.receiverSign ? "self-hit" : "partner-hit";
}

function incrementInventoryCounter(summary, identity, layer) {
  summary.total += 1;
  summary.by_source_identity[identity] ??= 0;
  summary.by_source_identity[identity] += 1;
  summary.by_layer[layer] ??= 0;
  summary.by_layer[layer] += 1;
}

function materializeIntraLayerRows(params, circularRoots, args) {
  const rows = [];
  const boundary = { total: 0, by_source_identity: {}, by_layer: {} };

  for (let phaseIndex = 0; phaseIndex < args.phaseSamples; phaseIndex += 1) {
    const t = (phaseIndex / args.phaseSamples) * params.period;
    for (const layer of LAYERS) {
      for (const receiverSign of SIGNS) {
        const rootSets = [
          {
            source_identity: "self-hit",
            sourceSign: receiverSign,
            roots: circularRoots[layer].self,
          },
          {
            source_identity: "partner-hit",
            sourceSign: -receiverSign,
            roots: circularRoots[layer].partner,
          },
        ];

        for (const rootSet of rootSets) {
          for (let rootIndex = 0; rootIndex < rootSet.roots.length; rootIndex += 1) {
            const root = rootSet.roots[rootIndex];
            const phaseDelay = root.delta + TWO_PI * root.r;
            const delta = phaseDelay / params.omega[layer];
            const branch = {
              sourceLayer: layer,
              receiverLayer: layer,
              sourceSign: rootSet.sourceSign,
              receiverSign,
              source_identity: rootSet.source_identity,
              t,
            };

            if (root.class !== "interior" || delta <= EPS) {
              incrementInventoryCounter(boundary, rootSet.source_identity, layer);
              continue;
            }

            const geometry = branchGeometry(params, branch, delta, args);
            const variation_residual = branchVariationResidual(params, branch, delta, args);
            rows.push({
              id: `${layer}${rootSet.sourceSign > 0 ? "p" : "m"}_${layer}${receiverSign > 0 ? "p" : "m"}_phase${phaseIndex}_${rootSet.source_identity}_root${rootIndex}`,
              sourceLayer: layer,
              receiverLayer: layer,
              sourceSign: rootSet.sourceSign,
              receiverSign,
              source_identity: rootSet.source_identity,
              t,
              reception_phase_fraction: phaseIndex / args.phaseSamples,
              root_index: rootIndex,
              root_cycle_index: root.r,
              root_class: root.class,
              phase_delay: phaseDelay,
              circular_root_derivative: root.derivative,
              ...geometry,
              variation_residual,
            });
          }
        }
      }
    }
  }

  return { rows, boundary };
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
      "This adapter compares circular terminal acceleration with the diagnostic terminal-branch action sum. It still excludes regularization and the true substrate action functional.",
    worst_samples: samples
      .sort((left, right) => right.residual_norm - left.residual_norm)
      .slice(0, 6),
  };
}

function branchLedger(row, kernelStrength) {
  const acceleration = scale(row.base_acceleration, kernelStrength);
  const receiverImpulse = scale(acceleration, row.delta);
  const sourceImpulse = scale(receiverImpulse, -1);
  const receiverWork = dot(receiverImpulse, row.receiver_velocity);
  const sourceWork = dot(sourceImpulse, row.source_velocity);
  const receiverLedger = {
    deltaE: receiverWork,
    deltaP: receiverImpulse,
    deltaJ: cross2d(row.receiver_position, receiverImpulse),
    deltaQ: 0,
  };
  const sourceLedger = {
    deltaE: sourceWork,
    deltaP: sourceImpulse,
    deltaJ: cross2d(row.source_position, sourceImpulse),
    deltaQ: 0,
  };
  return {
    acceleration,
    ledger: receiverLedger,
    source_recoil_ledger: sourceLedger,
    pair_ledger: addLedger(receiverLedger, sourceLedger),
  };
}

function materializeActionRows(branchRows, kernelStrength) {
  return branchRows.map((row) => {
    const action = branchLedger(row, kernelStrength);
    return {
      ...row,
      action_acceleration: action.acceleration,
      action_ledger: action.ledger,
      source_recoil_ledger: action.source_recoil_ledger,
      pair_ledger: action.pair_ledger,
    };
  });
}

function localConservation(actionRows, args, ledgerKey = "action_ledger", note = null) {
  const total = actionRows.reduce(
    (sum, row) => addLedger(sum, row[ledgerKey] ?? zeroLedger()),
    zeroLedger()
  );
  const residualNorm = ledgerNorm(total);
  return {
    ledger_key: ledgerKey,
    total,
    residual_norm: residualNorm,
    tolerance: args.conservationTolerance,
    status: residualNorm <= args.conservationTolerance ? "pass" : "fail",
    note:
      note ??
      "This is a diagnostic receiver-side sum over sampled terminal branches. It becomes a proof object only after the regularized source-recoil and wake-energy boundary ledgers are supplied.",
  };
}

function variationResidualStats(actionRows, args) {
  const residuals = actionRows
    .map((row) => row.variation_residual?.residual_norm)
    .filter((value) => value !== null && value !== undefined);
  if (!residuals.length) {
    return {
      branch_count: 0,
      max_residual: null,
      rms_residual: null,
      tolerance: args.variationTolerance,
      status: "fail",
      note:
        "No branch variation residuals were available; the terminal action stationarity condition is untested.",
    };
  }
  const maxResidual = Math.max(...residuals);
  const rmsResidual = Math.sqrt(
    residuals.reduce((sum, value) => sum + value * value, 0) / residuals.length
  );
  return {
    branch_count: residuals.length,
    max_residual: maxResidual,
    rms_residual: rmsResidual,
    tolerance: args.variationTolerance,
    status: maxResidual <= args.variationTolerance ? "pass" : "fail",
    note:
      "Finite-difference proxy for the receiver-side action-variation stationarity condition D_{t0}[r_hat/(rJ)]=0 on sampled terminal branches.",
  };
}

function branchSummedVariationResidual(actionRows, args) {
  const groups = new Map();
  const bySourceIdentity = {};
  const skipped = {
    non_transversal: 0,
    missing_derivative: 0,
    missing_jacobian: 0,
  };
  let branchCount = 0;

  for (const row of actionRows) {
    if (!row.transversal) {
      skipped.non_transversal += 1;
      continue;
    }

    const derivative = row.variation_residual?.derivative;
    if (
      !Array.isArray(derivative) ||
      derivative.length !== 2 ||
      !derivative.every((value) => Number.isFinite(value))
    ) {
      skipped.missing_derivative += 1;
      continue;
    }

    if (!Number.isFinite(row.jacobian) || Math.abs(row.jacobian) <= EPS) {
      skipped.missing_jacobian += 1;
      continue;
    }

    const identity = sourceIdentity(row);
    bySourceIdentity[identity] ??= 0;
    bySourceIdentity[identity] += 1;

    const key = receiverKey(row);
    if (!groups.has(key)) {
      groups.set(key, {
        receiver: key,
        branch_count: 0,
        residual: [0, 0],
      });
    }

    const group = groups.get(key);
    const contribution = scale(
      derivative,
      row.charge_sign / Math.abs(row.jacobian)
    );
    group.residual = vecAdd(group.residual, contribution);
    group.branch_count += 1;
    branchCount += 1;
  }

  const samples = [...groups.values()]
    .map((group) => ({
      ...group,
      residual_norm: norm(group.residual),
    }))
    .sort((left, right) => right.residual_norm - left.residual_norm);

  const maxResidual = samples.length ? samples[0].residual_norm : null;
  const rmsResidual = samples.length
    ? Math.sqrt(
        samples.reduce((sum, sample) => sum + sample.residual_norm ** 2, 0) /
          samples.length
      )
    : null;

  return {
    branch_count: branchCount,
    receiver_count: samples.length,
    by_source_identity: bySourceIdentity,
    skipped,
    max_residual: maxResidual,
    rms_residual: rmsResidual,
    tolerance: args.variationTolerance,
    status:
      maxResidual !== null && maxResidual <= args.variationTolerance ? "pass" : "fail",
    note:
      "Branch-summed finite-difference proxy for the receiver-side scalar-action residual after the direct inverse-square term is removed. It includes sampled inter-layer rows plus active intra-layer self-hit and partner-hit rows; zero-delay self-hit boundaries remain excluded by H(0)=0. Full terminal closure still needs regularized wake-boundary terms.",
    worst_receivers: samples.slice(0, 6),
  };
}

function edgeLedger(row, ledgerKey = "action_ledger") {
  const ledger = row[ledgerKey] ?? zeroLedger();
  if (row.edge_side === "plus") {
    return ledger;
  }
  if (row.edge_side === "minus") {
    return scaleLedger(ledger, -1);
  }
  return zeroLedger();
}

function edgeKey(branchRow, quotient) {
  const chargeSign = branchRow.sourceSign * branchRow.receiverSign;
  const layerPair = `${branchRow.sourceLayer}->${branchRow.receiverLayer}`;
  const identity = sourceIdentity(branchRow);
  const normalBin =
    Math.abs(branchRow.normal_projection) < 0.25
      ? "near-tangent"
      : Math.abs(branchRow.normal_projection) < 0.75
        ? "oblique"
        : "normal";
  if (quotient === "strict") {
    const phaseBin = Math.round(branchRow.reception_phase_fraction * 24);
    const deltaBin = Math.round(branchRow.delta * 1000);
    return `${identity}:${layerPair}:q${chargeSign}:p${phaseBin}:d${deltaBin}:${normalBin}`;
  }
  return `${identity}:${layerPair}:q${chargeSign}:${normalBin}`;
}

function multiset(rows, side, quotient, ledgerKey = "action_ledger") {
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
    entry.ledger = addLedger(entry.ledger, edgeLedger(row, ledgerKey));
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

function terminalPatchAreaFactor(params, args) {
  const alignRadius = params.cF / params.omega.O;
  if (args.areaModel === "outer-disk") {
    return args.patchAreaFactor * (params.radius.O / alignRadius) ** 2;
  }
  if (args.areaModel === "layer-sum") {
    const layerArea =
      params.radius.I ** 2 + params.radius.M ** 2 + params.radius.O ** 2;
    return args.patchAreaFactor * layerArea / alignRadius ** 2;
  }
  return args.patchAreaFactor;
}

function candidate(n, m, args) {
  const params = layerParams(n, m, args);
  const interLayerRows = [];
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
              const variation_residual = branchVariationResidual(params, branch, delta, args);
              interLayerRows.push({
                id: `${sourceLayer}${sourceSign > 0 ? "p" : "m"}_${receiverLayer}${receiverSign > 0 ? "p" : "m"}_phase${phaseIndex}_root${rootIndex}`,
                sourceLayer,
                receiverLayer,
                sourceSign,
                receiverSign,
                source_identity: "inter-layer",
                t,
                reception_phase_fraction: phaseIndex / args.phaseSamples,
                root_index: rootIndex,
                root_class: "interior",
                ...geometry,
                variation_residual,
              });
            });
          }
        }
      }
    }
  }

  const intraLayer = materializeIntraLayerRows(params, circular_roots, args);
  const branchRows = [...interLayerRows, ...intraLayer.rows];
  const cycle_residual_adapter = cycleResidualFit(params, branchRows, args);
  const actionRows = materializeActionRows(
    branchRows,
    cycle_residual_adapter.used_kernel_strength
  );
  const receiverSideConservation = localConservation(actionRows, args);
  const sourceRecoilConservation = localConservation(
    actionRows,
    args,
    "pair_ledger",
    "This diagnostic pairs each receiver impulse with an opposite source-recoil impulse at emission time. It still omits regularized wake-energy boundary terms."
  );
  const perBranchStationarityResidual = variationResidualStats(actionRows, args);
  const actionVariationResidual = branchSummedVariationResidual(actionRows, args);
  const plus = multiset(actionRows, "plus", args.quotient);
  const minus = multiset(actionRows, "minus", args.quotient);
  const terminalPlus = multiset(actionRows, "plus", args.quotient, "pair_ledger");
  const terminalMinus = multiset(actionRows, "minus", args.quotient, "pair_ledger");
  const transversalCount = actionRows.filter((row) => row.transversal).length;
  const grazingCount = actionRows.length - transversalCount;
  const byLayerPair = {};
  const bySourceIdentity = {};
  for (const row of actionRows) {
    const key = `${row.sourceLayer}->${row.receiverLayer}`;
    const identity = sourceIdentity(row);
    byLayerPair[key] ??= { total: 0, transversal: 0, grazing: 0 };
    byLayerPair[key].total += 1;
    byLayerPair[key][row.transversal ? "transversal" : "grazing"] += 1;
    bySourceIdentity[identity] ??= { total: 0, transversal: 0, grazing: 0 };
    bySourceIdentity[identity].total += 1;
    bySourceIdentity[identity][row.transversal ? "transversal" : "grazing"] += 1;
  }

  const result = {
    id: `term_n${n}_m${m}`,
    integer_lock: { I: n, M: m, O: 1 },
    normalized_speeds: params.speed,
    normalized_radii: params.radius,
    terminal_family: args.terminalFamily,
    terminal_phase_offset: args.terminalFamily === "phase-offset" ? args.terminalPhaseOffset : 0,
    terminal_center_shift: args.terminalFamily === "shifted-center" ? args.terminalCenterShift : 0,
    terminal_phases: params.phase,
    terminal_centers: params.center,
    terminal_area_factor: terminalPatchAreaFactor(params, args),
    circular_roots,
    delayed_branch_inventory: {
      scanned_contexts:
        args.phaseSamples * LAYERS.length * (LAYERS.length - 1) * SIGNS.length * SIGNS.length +
        args.phaseSamples * LAYERS.length * SIGNS.length * 2,
      inter_layer_scanned_contexts:
        args.phaseSamples * LAYERS.length * (LAYERS.length - 1) * SIGNS.length * SIGNS.length,
      intra_layer_scanned_contexts: args.phaseSamples * LAYERS.length * SIGNS.length * 2,
      roots_total: branchRows.length,
      inter_layer_roots: interLayerRows.length,
      intra_layer_active_roots: intraLayer.rows.length,
      intra_layer_boundary_roots: intraLayer.boundary,
      transversal: transversalCount,
      grazing_or_boundary: grazingCount,
      by_source_identity: bySourceIdentity,
      by_layer_pair: byLayerPair,
    },
    action_diagnostics: {
      cycle_residual_adapter,
      local_conservation: receiverSideConservation,
      receiver_side_conservation: receiverSideConservation,
      source_recoil_conservation: sourceRecoilConservation,
      per_branch_stationarity_residual: perBranchStationarityResidual,
      action_variation_residual: actionVariationResidual,
    },
    edge_maps: { plus, minus },
    terminal_edge_maps: { plus: terminalPlus, minus: terminalMinus },
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

function terminalTransferRow(left, right, args) {
  const edgeKeyMatch = sameMultiset(
    left.terminal_edge_maps.plus,
    right.terminal_edge_maps.minus
  );
  const balance = edgeBalance(left.terminal_edge_maps.plus, right.terminal_edge_maps.minus);
  const sourceRecoilPass =
    left.action_diagnostics.source_recoil_conservation.status === "pass" &&
    right.action_diagnostics.source_recoil_conservation.status === "pass";
  const variationPass =
    left.action_diagnostics.action_variation_residual.status === "pass" &&
    right.action_diagnostics.action_variation_residual.status === "pass";
  const cycleResidualPass =
    left.action_diagnostics.cycle_residual_adapter.status === "pass" &&
    right.action_diagnostics.cycle_residual_adapter.status === "pass";
  const edgeLedgerPass = balance.residual_norm <= args.ledgerTolerance;
  const accepted =
    edgeKeyMatch && edgeLedgerPass && sourceRecoilPass && variationPass && cycleResidualPass;
  const failureCodes = [];
  if (!edgeKeyMatch) {
    failureCodes.push("terminal_dynamic.edge_key_mismatch");
  }
  if (!edgeLedgerPass) {
    failureCodes.push("terminal_dynamic.source_recoil_edge_ledger_balance_residual");
  }
  if (!sourceRecoilPass) {
    failureCodes.push("terminal_dynamic.source_recoil_conservation_residual");
  }
  if (!variationPass) {
    failureCodes.push("terminal_dynamic.action_variation_residual");
  }
  if (!cycleResidualPass) {
    failureCodes.push("terminal_dynamic.cycle_residual_adapter_residual");
  }
  return {
    from: left.id,
    to: right.id,
    edge_key_match: edgeKeyMatch,
    source_recoil_edge_ledger_balance_norm: balance.residual_norm,
    source_recoil_residual_norm: Math.max(
      left.action_diagnostics.source_recoil_conservation.residual_norm,
      right.action_diagnostics.source_recoil_conservation.residual_norm
    ),
    action_variation_max_residual: Math.max(
      left.action_diagnostics.action_variation_residual.max_residual ?? Infinity,
      right.action_diagnostics.action_variation_residual.max_residual ?? Infinity
    ),
    per_branch_stationarity_max_residual: Math.max(
      left.action_diagnostics.per_branch_stationarity_residual.max_residual ?? Infinity,
      right.action_diagnostics.per_branch_stationarity_residual.max_residual ?? Infinity
    ),
    cycle_residual_rms: Math.max(
      left.action_diagnostics.cycle_residual_adapter.rms_residual,
      right.action_diagnostics.cycle_residual_adapter.rms_residual
    ),
    ledger_tolerance: args.ledgerTolerance,
    variation_tolerance: args.variationTolerance,
    cycle_residual_tolerance: args.cycleResidualTolerance,
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
  const terminalRows = candidates.flatMap((left) =>
    candidates.map((right) => terminalTransferRow(left, right, args))
  );
  const actionMatrix = candidates.map((left) =>
    candidates.map((right) =>
      rows.some((row) => row.from === left.id && row.to === right.id && row.accepted) ? 1 : 0
    )
  );
  const terminalMatrix = candidates.map((left) =>
    candidates.map((right) =>
      terminalRows.some((row) => row.from === left.id && row.to === right.id && row.accepted)
        ? 1
        : 0
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
  const terminalEdges = terminalRows
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
    terminal_dynamic: {
      matrix: terminalMatrix,
      edges: terminalEdges,
      rows: terminalRows,
      spectral_radius: spectralRadius(terminalMatrix),
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

function finiteOpenStripCount(matrix, blockSize) {
  const size = matrix.length;
  if (size === 0) {
    return 0;
  }
  let counts = Array(size).fill(1);
  for (let step = 1; step < blockSize; step += 1) {
    const next = Array(size).fill(0);
    for (let left = 0; left < size; left += 1) {
      for (let right = 0; right < size; right += 1) {
        next[right] += counts[left] * matrix[left][right];
      }
    }
    counts = next;
  }
  return counts.reduce((sum, value) => sum + value, 0);
}

function finiteOpenStripStats(matrix, blockSize, areaFactors) {
  const size = matrix.length;
  if (size === 0) {
    return {
      count: 0,
      total_area_factor_sum: 0,
      average_total_area_factor: null,
      average_patch_area_factor: null,
    };
  }
  let counts = Array(size).fill(1);
  let areaSums = areaFactors.slice(0, size);
  for (let step = 1; step < blockSize; step += 1) {
    const nextCounts = Array(size).fill(0);
    const nextAreaSums = Array(size).fill(0);
    for (let left = 0; left < size; left += 1) {
      for (let right = 0; right < size; right += 1) {
        const transitions = matrix[left][right];
        if (!transitions) {
          continue;
        }
        nextCounts[right] += counts[left] * transitions;
        nextAreaSums[right] +=
          transitions * (areaSums[left] + counts[left] * areaFactors[right]);
      }
    }
    counts = nextCounts;
    areaSums = nextAreaSums;
  }
  const count = counts.reduce((sum, value) => sum + value, 0);
  const totalAreaFactorSum = areaSums.reduce((sum, value) => sum + value, 0);
  const averageTotalAreaFactor = count > 0 ? totalAreaFactorSum / count : null;
  return {
    count,
    total_area_factor_sum: totalAreaFactorSum,
    average_total_area_factor: averageTotalAreaFactor,
    average_patch_area_factor:
      averageTotalAreaFactor === null ? null : averageTotalAreaFactor / blockSize,
  };
}

function areaVariation(areaFactors) {
  if (!areaFactors.length) {
    return 0;
  }
  const mean = areaFactors.reduce((sum, value) => sum + value, 0) / areaFactors.length;
  if (mean <= EPS) {
    return 0;
  }
  const variance =
    areaFactors.reduce((sum, value) => sum + (value - mean) ** 2, 0) / areaFactors.length;
  return Math.sqrt(variance) / mean;
}

function maxEdgeLedgerResidual(rows) {
  if (!rows?.length) {
    return null;
  }
  return Math.max(...rows.map((row) => row.edge_ledger_balance_norm));
}

function maxTerminalLedgerResidual(rows) {
  if (!rows?.length) {
    return null;
  }
  return Math.max(...rows.map((row) => row.source_recoil_edge_ledger_balance_norm));
}

function maxTerminalVariationResidual(rows) {
  if (!rows?.length) {
    return null;
  }
  const finite = rows
    .map((row) => row.action_variation_max_residual)
    .filter((value) => Number.isFinite(value));
  return finite.length ? Math.max(...finite) : null;
}

function coefficientSummary(matrix, args, residuals = {}) {
  const rho = spectralRadius(matrix);
  const areaFactors =
    residuals.areaFactors?.length === matrix.length
      ? residuals.areaFactors
      : Array(matrix.length).fill(args.patchAreaFactor);
  const meanAreaFactor =
    areaFactors.length > 0
      ? areaFactors.reduce((sum, value) => sum + value, 0) / areaFactors.length
      : args.patchAreaFactor;
  const finiteStats = finiteOpenStripStats(matrix, args.blockSize, areaFactors);
  const asymptoticDensity = rho > 0 ? Math.log(rho) : null;
  const finiteCount = finiteStats.count;
  const finiteDensity = finiteCount > 0 ? Math.log(finiteCount) / args.blockSize : null;
  const asymptoticCoefficient =
    asymptoticDensity === null ? null : asymptoticDensity / meanAreaFactor;
  const finiteCoefficient =
    finiteCount > 0 && finiteStats.average_total_area_factor !== null
      ? Math.log(finiteCount) / finiteStats.average_total_area_factor
      : null;
  const epsilonArea = areaVariation(areaFactors);
  return {
    block_size: args.blockSize,
    patch_area_factor: meanAreaFactor,
    area_model: args.areaModel,
    area_factor_range:
      areaFactors.length > 0
        ? {
            min: Math.min(...areaFactors),
            max: Math.max(...areaFactors),
            coefficient_of_variation: epsilonArea,
          }
        : null,
    coefficient_target: args.coefficientTarget,
    open_strip_label_count: finiteCount,
    boundary_to_block_proxy: 2 / args.blockSize,
    finite_block_average_total_area_factor: finiteStats.average_total_area_factor,
    finite_block_average_patch_area_factor: finiteStats.average_patch_area_factor,
    asymptotic_entropy_density_proxy: asymptoticDensity,
    asymptotic_area_normalized_coefficient_proxy: asymptoticCoefficient,
    asymptotic_coefficient_residual:
      asymptoticCoefficient === null ? null : Math.abs(asymptoticCoefficient - args.coefficientTarget),
    finite_block_entropy_density_proxy: finiteDensity,
    finite_block_area_normalized_coefficient_proxy: finiteCoefficient,
    finite_block_coefficient_residual:
      finiteCoefficient === null ? null : Math.abs(finiteCoefficient - args.coefficientTarget),
    finite_block_residual_vector: {
      coefficient:
        finiteCoefficient === null ? null : Math.abs(finiteCoefficient - args.coefficientTarget),
      boundary_to_block_proxy: 2 / args.blockSize,
      epsilon_branch: residuals.epsilonBranch ?? null,
      epsilon_area: residuals.epsilonArea ?? epsilonArea,
      epsilon_quot: residuals.epsilonQuot ?? null,
      epsilon_cons: residuals.epsilonCons ?? null,
      epsilon_var: residuals.epsilonVar ?? null,
    },
  };
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
  const terminalRho = transfer.terminal_dynamic.spectral_radius;
  const areaFactors = candidates.map((item) => item.terminal_area_factor);
  const meanAreaFactor =
    areaFactors.length > 0
      ? areaFactors.reduce((sum, value) => sum + value, 0) / areaFactors.length
      : args.patchAreaFactor;
  const edgeCoefficient = coefficientSummary(transfer.edge_proxy.matrix, args, {
    areaFactors,
  });
  const actionCoefficient = coefficientSummary(transfer.action_complete.matrix, args, {
    areaFactors,
    epsilonCons: maxEdgeLedgerResidual(transfer.action_complete.rows),
    epsilonVar: null,
  });
  const terminalCoefficient = coefficientSummary(transfer.terminal_dynamic.matrix, args, {
    areaFactors,
    epsilonCons: maxTerminalLedgerResidual(transfer.terminal_dynamic.rows),
    epsilonVar: maxTerminalVariationResidual(transfer.terminal_dynamic.rows),
  });
  return {
    artifact: "terminal-alignment-action-enumerator",
    generated_by: "scripts/nested-shell-swarm/terminal-alignment-enumerator.mjs",
    comparison_level: "reduced circular, phase-offset, or shifted-center terminal-action diagnostic proof packet",
    note:
      "This enumerates delayed roots, active intra-layer circular-root action rows, diagnostic branch-action rows, edge-map multisets, source-recoil ledger residuals, per-branch stationarity residuals, branch-summed action-variation residuals, transfer rows, and area-normalized finite-block coefficient residuals. Zero-delay self-hit boundaries are inventoried but excluded by H(0)=0. Its action kernels are diagnostic adapters, not accepted substrate dynamics.",
    parameters: {
      min_n: args.minN,
      max_n: args.maxN,
      history_periods: args.historyPeriods,
      phase_samples: args.phaseSamples,
      delta_samples: args.deltaSamples,
      max_root_index: args.maxRootIndex,
      jacobian_floor: args.jacobianFloor,
      terminal_family: args.terminalFamily,
      terminal_phase_offset:
        args.terminalFamily === "phase-offset" ? args.terminalPhaseOffset : 0,
      terminal_center_shift:
        args.terminalFamily === "shifted-center" ? args.terminalCenterShift : 0,
      action_kernel: args.actionKernel,
      kernel_strength: args.kernelStrength,
      fit_kernel_strength: args.fitKernelStrength,
      conservation_tolerance: args.conservationTolerance,
      cycle_residual_tolerance: args.cycleResidualTolerance,
      ledger_tolerance: args.ledgerTolerance,
      variation_tolerance: args.variationTolerance,
      variation_step: args.variationStep,
      quotient: args.quotient,
      block_size: args.blockSize,
      patch_area_factor: args.patchAreaFactor,
      area_model: args.areaModel,
      coefficient_target: args.coefficientTarget,
      normalized_speeds: {
        I: args.innerSpeed,
        M: args.middleSpeed,
        O: args.outerSpeed,
      },
    },
    proof_obligations: {
      terminal_kinematics: "enumerated_by_this_packet",
      terminal_family: "concentric_baseline_bounded_phase_offset_or_shifted_center_variant",
      edge_projection: "action_row_edge_multisets_enumerated_by_this_packet",
      cycle_averaged_residual: "diagnostic_adapter_only_until_action_kernel_is_accepted",
      local_conservation_ledger: "receiver_side_and_source_recoil_pair_ledgers_reported_but_wake_energy_boundary_terms_still_open",
      intra_layer_action_rows: "active_partner_hit_and_interior_self_hit_rows_materialized_from_circular_roots_zero_delay_self_hit_boundary_excluded_by_H0",
      per_branch_stationarity_residual: "finite_difference_stationarity_proxy_reported_for_each_sampled_terminal_branch_as_obstruction_context",
      action_variation_residual: "branch_summed_finite_difference_residual_reported_by_receiver_phase_for_sampled_inter_layer_and_active_intra_layer_branches",
      physical_observer_quotient: "coarse_or_strict_numerical_quotient_only",
      area_normalization: "declared_or_proxy_patch_area_factor_until_metric_reconstruction_supplies_A_theta",
      coefficient_target: "finite_block_area_normalized_proxy_not_horizon_entropy_proof",
    },
    candidates,
    transfer_compatibility: {
      scope: "edge proxy plus action-complete diagnostic rows",
      edge_proxy: {
        ...transfer.edge_proxy,
        strip_entropy_density_proxy: edgeRho > 0 ? Math.log(edgeRho) : null,
        area_normalized_coefficient_proxy:
          edgeRho > 0 ? Math.log(edgeRho) / meanAreaFactor : null,
        coefficient_residual:
          edgeRho > 0 ? Math.abs(Math.log(edgeRho) / meanAreaFactor - args.coefficientTarget) : null,
        finite_block_coefficient: edgeCoefficient,
      },
      action_complete: {
        ...transfer.action_complete,
        strip_entropy_density_proxy: actionRho > 0 ? Math.log(actionRho) : null,
        area_normalized_coefficient_proxy:
          actionRho > 0 ? Math.log(actionRho) / meanAreaFactor : null,
        coefficient_residual:
          actionRho > 0 ? Math.abs(Math.log(actionRho) / meanAreaFactor - args.coefficientTarget) : null,
        finite_block_coefficient: actionCoefficient,
      },
      terminal_dynamic: {
        ...transfer.terminal_dynamic,
        strip_entropy_density_proxy: terminalRho > 0 ? Math.log(terminalRho) : null,
        area_normalized_coefficient_proxy:
          terminalRho > 0 ? Math.log(terminalRho) / meanAreaFactor : null,
        coefficient_residual:
          terminalRho > 0 ? Math.abs(Math.log(terminalRho) / meanAreaFactor - args.coefficientTarget) : null,
        finite_block_coefficient: terminalCoefficient,
      },
    },
    classification:
      terminalRho > 0
        ? "nonempty_terminal_dynamic_transfer"
        : actionRho > 0
          ? "action_complete_transfer_nonempty_but_terminal_dynamic_blocked"
          : edgeRho > 0
            ? "edge_proxy_nonempty_but_terminal_dynamic_transfer_blocked"
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
