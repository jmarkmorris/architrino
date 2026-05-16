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
  --quotient MODE       Edge-key quotient: coarse or strict. Defaults to coarse.
  --include-branches    Include sampled delayed branch rows in the JSON output.
  --out PATH            Write JSON output to PATH instead of stdout.
  --pretty              Pretty-print JSON output.
  --help                Show this help.

This is a reduced terminal-alignment kinematic enumerator. It computes
candidate delayed roots and edge-map multisets for the current transfer-matrix
proof route. It does not solve the action kernel, cycle residual, or local
conservation ledger.`);
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

function dot(left, right) {
  return left[0] * right[0] + left[1] * right[1];
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
  const counts = new Map();
  for (const row of rows) {
    if (row.edge_side !== side || !row.transversal) {
      continue;
    }
    const key = edgeKey(row, quotient);
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, count]) => ({ key, count }));
}

function sameMultiset(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
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

  const plus = multiset(branchRows, "plus", args.quotient);
  const minus = multiset(branchRows, "minus", args.quotient);
  const transversalCount = branchRows.filter((row) => row.transversal).length;
  const grazingCount = branchRows.length - transversalCount;
  const byLayerPair = {};
  for (const row of branchRows) {
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
    edge_maps: { plus, minus },
    status:
      branchRows.length === 0
        ? "no_delayed_roots_found"
        : grazingCount === branchRows.length
          ? "grazing_boundary_only"
          : "kinematic_edge_maps_enumerated",
  };

  if (args.includeBranches) {
    result.sampled_branches = branchRows;
  }

  return result;
}

function compatibility(candidates) {
  const matrix = candidates.map((left) =>
    candidates.map((right) => (sameMultiset(left.edge_maps.plus, right.edge_maps.minus) ? 1 : 0))
  );
  const edges = [];
  matrix.forEach((row, leftIndex) => {
    row.forEach((value, rightIndex) => {
      if (value) {
        edges.push({
          from: candidates[leftIndex].id,
          to: candidates[rightIndex].id,
        });
      }
    });
  });
  return { matrix, edges };
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
  const transfer = compatibility(candidates);
  const rho = spectralRadius(transfer.matrix);
  return {
    artifact: "terminal-alignment-kinematic-enumerator",
    generated_by: "scripts/tri-binary/terminal-alignment-enumerator.mjs",
    comparison_level: "reduced circular terminal-kinematic proof packet",
    note:
      "This enumerates delayed roots and edge-map multisets for the transfer-matrix route. It does not solve the action kernel, cycle-averaged residual, local conservation ledger, or full observer quotient.",
    parameters: {
      min_n: args.minN,
      max_n: args.maxN,
      history_periods: args.historyPeriods,
      phase_samples: args.phaseSamples,
      delta_samples: args.deltaSamples,
      max_root_index: args.maxRootIndex,
      jacobian_floor: args.jacobianFloor,
      quotient: args.quotient,
      normalized_speeds: {
        I: args.innerSpeed,
        M: args.middleSpeed,
        O: args.outerSpeed,
      },
    },
    proof_obligations: {
      terminal_kinematics: "enumerated_by_this_packet",
      edge_projection: "kinematic_multiset_proxy_enumerated_by_this_packet",
      cycle_averaged_residual: "blocked_until_action_kernel_is_supplied",
      local_conservation_ledger: "blocked_until_branch_energy_momentum_angular_momentum_increments_are_supplied",
      physical_observer_quotient: "coarse_or_strict_numerical_quotient_only",
    },
    candidates,
    transfer_compatibility: {
      scope:
        "edge-map multiset equality only; edge balance and observer-record equality remain proof obligations",
      ...transfer,
      spectral_radius: rho,
      strip_entropy_density_proxy: rho > 0 ? Math.log(rho) : null,
    },
    classification:
      rho > 0
        ? "nonempty_kinematic_transfer_proxy"
        : "empty_kinematic_transfer_proxy_or_overstrict_quotient",
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
