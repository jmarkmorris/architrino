#!/usr/bin/env node

// Priority-only, test-charge diagnostic: the sea-braid SHIELDING RATIO
// (braid-ideal brainstorming entry 36 closure goal). It puts one number on the
// operator's "high energy but near-perfect superposition" reading of the sea
// braid: how much the superposed delayed potential of the neutral drum cancels
// in the far field, and how that cancellation deepens for the anti-paired quiet
// doublet.
//
// Quantities (all strict potential-superposition, no field ontology):
//   - singleSitePotential(r): the UNSHIELDED reference, one bare architrino at
//     far radius r, |kappa|/sqrt(r^2+eps^2);
//   - netFarFieldRms(r): RMS over a far sphere and one rotation period of the
//     superposed delayed potential of the whole assembly (neutral drum, or the
//     anti-paired quiet doublet), delays at field speed c_f on the exact
//     rotating worldlines;
//   - shieldingRatio(r) = singleSitePotential(r) / netFarFieldRms(r): large
//     means near-perfect superposition cancellation;
//   - leadingMultipole: from the log-log slope of netFarFieldRms(r) over a
//     radius sweep, ell = -slope - 1 (bare neutral drum -> axial dipole ell=1,
//     slope -2; anti-paired quiet doublet -> quadrupole or higher, slope <= -3);
//   - internalPotentialNet / internalPotentialAbs: the internal
//     potential-superposition ledger (geometric, scale-free) reported as
//     context for the "interior energy" half.
//
// Claim-level discipline. This measures the near-perfect-superposition
// (shielding) half, which is establishable. The absolute interior-energy
// magnitude is the OPEN A_0 / mass-map scale and is NOT claimed here; the
// reported site speed and internal ledger are geometric context only.
// Architrino primitives carry no physical mass; every ledger term is a unit
// numerical weight, not an energy claim. Fail-closed: no retained-branch claim,
// no accepted-evidence claim, no score movement.
//
// Signed polarity units epsilon_{+,x|y|z} (positrinos, sigma=+1) and
// epsilon_{-,x|y|z} (electrinos, sigma=-1) on the face-opposite seed rotating
// rigidly about n_hat=(1,1,1)/sqrt(3), per the six-point symmetry invariant
// lemma proof packet and the interior-axial-potential-gradient diagnostic.

import fs from "node:fs";
import path from "node:path";

const N_HAT = [1 / Math.sqrt(3), 1 / Math.sqrt(3), 1 / Math.sqrt(3)];
// A unit vector orthogonal to n_hat, for lateral (side-by-side) displacement.
const E1_HAT = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];

// --- CLI ---------------------------------------------------------------------

// Only run the CLI when invoked directly; stay side-effect-free on import so
// sibling diagnostics can reuse the kernel.
if (import.meta.url === `file://${process.argv[1]}`) {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printUsage(0);
  }
  const report = runDiagnostic(options);
  const serialized = JSON.stringify(report, null, options.pretty ? 2 : 0);
  if (options.outPath) {
    fs.mkdirSync(path.dirname(path.resolve(options.outPath)), { recursive: true });
    fs.writeFileSync(options.outPath, `${serialized}\n`);
  }
  console.log(serialized);
}

function parseArgs(argv) {
  const rawArgs = [];
  for (const arg of argv) {
    if (arg.startsWith("--") && arg.includes("=")) {
      const eq = arg.indexOf("=");
      rawArgs.push(arg.slice(0, eq), arg.slice(eq + 1));
    } else {
      rawArgs.push(arg);
    }
  }
  const parsed = {
    help: false,
    fieldSpeed: 1,
    radius: 1,
    coupling: 1,
    softening: 0.05,
    jacobianFloor: 0.05,
    mode: "both", // "single" | "doublet" | "both"
    pairing: "both", // "reversed" | "aligned" | "both"
    offsetDir: "lateral", // "axial" | "lateral"
    doubletOffset: 0.5, // second-drum separation, in units of R
    surfaceSpeedFractions: [0.3, 0.6, 0.9, 0.99],
    farRadii: [20, 40, 80],
    sphereSamples: 96,
    timeSamples: 24,
    outPath: null,
    pretty: false,
  };
  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];
    if (arg === "--help") {
      parsed.help = true;
    } else if (arg === "--field-speed") {
      parsed.fieldSpeed = positiveFiniteNumber(requireNext(rawArgs, index, arg), "field-speed");
      index += 1;
    } else if (arg === "--radius") {
      parsed.radius = positiveFiniteNumber(requireNext(rawArgs, index, arg), "radius");
      index += 1;
    } else if (arg === "--coupling") {
      parsed.coupling = positiveFiniteNumber(requireNext(rawArgs, index, arg), "coupling");
      index += 1;
    } else if (arg === "--softening") {
      parsed.softening = positiveFiniteNumber(requireNext(rawArgs, index, arg), "softening");
      index += 1;
    } else if (arg === "--jacobian-floor") {
      parsed.jacobianFloor = positiveFiniteNumber(requireNext(rawArgs, index, arg), "jacobian-floor");
      index += 1;
    } else if (arg === "--mode") {
      parsed.mode = requireEnum(requireNext(rawArgs, index, arg), ["single", "doublet", "both"], "mode");
      index += 1;
    } else if (arg === "--pairing") {
      parsed.pairing = requireEnum(requireNext(rawArgs, index, arg), ["reversed", "aligned", "both"], "pairing");
      index += 1;
    } else if (arg === "--offset-dir") {
      parsed.offsetDir = requireEnum(requireNext(rawArgs, index, arg), ["axial", "lateral"], "offset-dir");
      index += 1;
    } else if (arg === "--doublet-offset") {
      parsed.doubletOffset = positiveFiniteNumber(requireNext(rawArgs, index, arg), "doublet-offset");
      index += 1;
    } else if (arg === "--surface-speed-fractions") {
      parsed.surfaceSpeedFractions = numberList(requireNext(rawArgs, index, arg), "surface-speed-fractions");
      index += 1;
    } else if (arg === "--far-radii") {
      parsed.farRadii = numberList(requireNext(rawArgs, index, arg), "far-radii");
      index += 1;
    } else if (arg === "--sphere-samples") {
      parsed.sphereSamples = positiveInteger(requireNext(rawArgs, index, arg), "sphere-samples");
      index += 1;
    } else if (arg === "--time-samples") {
      parsed.timeSamples = positiveInteger(requireNext(rawArgs, index, arg), "time-samples");
      index += 1;
    } else if (arg === "--out") {
      parsed.outPath = requireNext(rawArgs, index, arg);
      index += 1;
    } else if (arg === "--pretty") {
      parsed.pretty = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return parsed;
}

// --- geometry ----------------------------------------------------------------

function baseDrum(radius) {
  return [
    { label: "epsilon_plus_x", sigma: 1, seed: [radius, 0, 0] },
    { label: "epsilon_plus_y", sigma: 1, seed: [0, radius, 0] },
    { label: "epsilon_plus_z", sigma: 1, seed: [0, 0, radius] },
    { label: "epsilon_minus_x", sigma: -1, seed: [-radius, 0, 0] },
    { label: "epsilon_minus_y", sigma: -1, seed: [0, -radius, 0] },
    { label: "epsilon_minus_z", sigma: -1, seed: [0, 0, -radius] },
  ].map((s) => ({ ...s, center: [0, 0, 0] }));
}

// The neutral drum, or a dimer of two drums. The second drum is displaced by
// `offset` (in units of R) either along n_hat ("axial", colinear stacking) or
// along e1_hat ("lateral", side-by-side), and its polarity is either reversed
// (`pairing="reversed"`, the C-conjugate dipole-reversed anti-pair -> the quiet
// quadrupolar doublet) or preserved (`pairing="aligned"`, parallel dipoles ->
// the chain candidate, the discriminating foil).
function buildSources(radius, mode, config = {}) {
  const { pairing = "reversed", offsetDir = "lateral", offset = 0.5 } = config;
  const base = baseDrum(radius);
  if (mode !== "doublet") {
    return base;
  }
  const dir = offsetDir === "axial" ? N_HAT : E1_HAT;
  const center = [dir[0] * offset * radius, dir[1] * offset * radius, dir[2] * offset * radius];
  const sigmaFactor = pairing === "aligned" ? 1 : -1;
  const second = base.map((s) => ({
    label: `${s.label}__b`,
    sigma: sigmaFactor * s.sigma,
    seed: s.seed,
    center,
  }));
  return [...base, ...second];
}

// Rodrigues rotation of a seed offset about n_hat by angle theta.
function rotatedOffset(seed, theta) {
  const cos = Math.cos(theta);
  const sin = Math.sin(theta);
  const dot = seed[0] * N_HAT[0] + seed[1] * N_HAT[1] + seed[2] * N_HAT[2];
  const cross = [
    N_HAT[1] * seed[2] - N_HAT[2] * seed[1],
    N_HAT[2] * seed[0] - N_HAT[0] * seed[2],
    N_HAT[0] * seed[1] - N_HAT[1] * seed[0],
  ];
  return [
    seed[0] * cos + cross[0] * sin + N_HAT[0] * dot * (1 - cos),
    seed[1] * cos + cross[1] * sin + N_HAT[1] * dot * (1 - cos),
    seed[2] * cos + cross[2] * sin + N_HAT[2] * dot * (1 - cos),
  ];
}

function sourceState(source, time, omega) {
  const rotated = rotatedOffset(source.seed, omega * time);
  const position = [
    source.center[0] + rotated[0],
    source.center[1] + rotated[1],
    source.center[2] + rotated[2],
  ];
  const velocity = [
    omega * (N_HAT[1] * rotated[2] - N_HAT[2] * rotated[1]),
    omega * (N_HAT[2] * rotated[0] - N_HAT[0] * rotated[2]),
    omega * (N_HAT[0] * rotated[1] - N_HAT[1] * rotated[0]),
  ];
  return { position, velocity };
}

// --- delayed potential (exact causal root at field speed c_f) ----------------

function causalRootTime(point, source, absoluteTime, context) {
  const { options, omega } = context;
  const cf = options.fieldSpeed;
  const seedSpan = Math.hypot(...source.seed) + Math.hypot(...source.center);
  const pointNorm = Math.hypot(point[0], point[1], point[2]);
  let low = absoluteTime - ((pointNorm + seedSpan) / cf + 1);
  let high = absoluteTime;
  const residualAt = (t) => {
    const state = sourceState(source, t, omega);
    const dx = point[0] - state.position[0];
    const dy = point[1] - state.position[1];
    const dz = point[2] - state.position[2];
    return Math.hypot(dx, dy, dz) - cf * (absoluteTime - t);
  };
  let t = absoluteTime - residualAt(absoluteTime) / cf;
  for (let iteration = 0; iteration < 80; iteration += 1) {
    if (!(t > low && t < high)) {
      t = 0.5 * (low + high);
    }
    const state = sourceState(source, t, omega);
    const dx = point[0] - state.position[0];
    const dy = point[1] - state.position[1];
    const dz = point[2] - state.position[2];
    const distance = Math.hypot(dx, dy, dz);
    const value = distance - cf * (absoluteTime - t);
    if (Math.abs(value) < 1e-13) {
      return t;
    }
    if (value > 0) {
      high = t;
    } else {
      low = t;
    }
    const slope =
      cf - (distance > 0 ? (dx * state.velocity[0] + dy * state.velocity[1] + dz * state.velocity[2]) / distance : 0);
    t = slope > 0 ? t - value / slope : 0.5 * (low + high);
  }
  return 0.5 * (low + high);
}

function delayedPotential(point, absoluteTime, context) {
  const { options, sources, omega } = context;
  const cf = options.fieldSpeed;
  let potential = 0;
  for (const source of sources) {
    const rootTime = causalRootTime(point, source, absoluteTime, context);
    const state = sourceState(source, rootTime, omega);
    const dx = point[0] - state.position[0];
    const dy = point[1] - state.position[1];
    const dz = point[2] - state.position[2];
    const distance = Math.hypot(dx, dy, dz);
    const sourceNormalSpeed =
      distance > 0 ? (dx * state.velocity[0] + dy * state.velocity[1] + dz * state.velocity[2]) / distance : 0;
    const sourceJacobian = (cf - sourceNormalSpeed) / cf;
    const clampedSourceJacobian = signPreservingMax(sourceJacobian, options.jacobianFloor);
    const receiverNormalFactor = 1; // static hypothetical receiver
    const branchWeight = Math.abs(receiverNormalFactor / clampedSourceJacobian);
    potential +=
      (options.coupling * source.sigma * branchWeight) /
      Math.sqrt(distance * distance + options.softening * options.softening);
  }
  return potential;
}

// --- diagnostic --------------------------------------------------------------

function runDiagnostic(options) {
  const directions = fibonacciSphere(options.sphereSamples);
  const pairings = options.pairing === "both" ? ["reversed", "aligned"] : [options.pairing];
  // Assembly plan: the single neutral drum, plus each requested dimer pairing.
  const plan = [];
  if (options.mode === "single" || options.mode === "both") {
    plan.push({ mode: "single", label: "single", config: {} });
  }
  if (options.mode === "doublet" || options.mode === "both") {
    for (const pairing of pairings) {
      plan.push({
        mode: "doublet",
        label: `doublet_${pairing}`,
        config: { pairing, offsetDir: options.offsetDir, offset: options.doubletOffset },
      });
    }
  }
  const rows = plan.map((entry) => evaluateMode(entry, directions, options));
  return {
    diagnostic: "sea_braid_shielding_ratio_diagnostic.v0",
    generatedAt: new Date().toISOString(),
    description:
      "shielding ratio (single-site potential / net far-field RMS) and leading uncancelled multipole of the neutral drum and the anti-paired quiet doublet; strict potential-superposition, delays at field speed c_f",
    claimLevel: "priority-only diagnostic; retainedBranchClaim=false; scoreMovement=no_score_increase",
    interiorEnergyNote:
      "the absolute interior-energy magnitude is the open A_0 / mass-map scale and is NOT claimed here; site speed and internal ledger are geometric context only",
    parameters: {
      fieldSpeed: options.fieldSpeed,
      radius: options.radius,
      coupling: options.coupling,
      softening: options.softening,
      jacobianFloor: options.jacobianFloor,
      pairing: options.pairing,
      offsetDir: options.offsetDir,
      doubletOffset: options.doubletOffset,
      surfaceSpeedFractions: options.surfaceSpeedFractions,
      farRadii: options.farRadii,
      sphereSamples: options.sphereSamples,
      timeSamples: options.timeSamples,
    },
    modes: rows,
  };
}

function evaluateMode(entry, directions, options) {
  const { mode, label, config } = entry;
  const sources = buildSources(options.radius, mode, config);
  const netSigma = sources.reduce((acc, s) => acc + s.sigma, 0);
  const internal = internalLedger(sources, options);
  const leverArm = options.radius * Math.sqrt(2 / 3);

  const speedRows = options.surfaceSpeedFractions.map((beta) => {
    const omega = (beta * options.fieldSpeed) / leverArm;
    const context = { options, sources, omega };
    const period = (2 * Math.PI) / omega;
    // Near the rail the Doppler beaming sharpens; resolving the cycle-averaged
    // (DC) channel needs finer time sampling as beta -> 1. Scale ~1/(1-beta),
    // capped, so default runs stay time-converged without hand-tuning.
    const effectiveTimeSamples = Math.min(
      options.timeSamples * 40,
      Math.max(options.timeSamples, Math.round(options.timeSamples / (1 - Math.min(beta, 0.99)))),
    );

    const radiusRows = options.farRadii.map((rFar) => {
      const single = Math.abs(options.coupling) / Math.sqrt(rFar * rFar + options.softening * options.softening);
      const net = netFarField(rFar, directions, period, context, effectiveTimeSamples);
      return {
        farRadius: round(rFar),
        singleSitePotential: round(single),
        // DC (cycle-averaged) channel: the static multipole = the shielding half.
        meanFarField: round(net.mean),
        shieldingRatio: net.mean > 0 ? round(single / net.mean) : null,
        // AC (oscillating) channel: the radiative far-field tail (entry 35 Phi_inf).
        oscFarField: round(net.osc),
      };
    });

    const logR = radiusRows.map((r) => Math.log(r.farRadius));
    // Static-shielding multipole from the DC (cycle-averaged) channel.
    const meanSlope = linearSlope(logR, radiusRows.map((r) => Math.log(r.meanFarField)));
    // Radiative tail exponent from the AC (oscillating) channel.
    const oscSlope = linearSlope(logR, radiusRows.map((r) => Math.log(r.oscFarField)));
    return {
      surfaceSpeedFraction: beta,
      omega: round(omega),
      siteSpeed: round(beta * options.fieldSpeed),
      effectiveTimeSamples,
      radiusRows,
      meanFieldSlope: round(meanSlope),
      shieldingMultipoleEll: Math.max(0, Math.round(-meanSlope - 1)),
      radiativeSlope: round(oscSlope),
    };
  });

  return {
    mode,
    label,
    pairing: config.pairing ?? null,
    offsetDir: mode === "doublet" ? config.offsetDir ?? options.offsetDir : null,
    sourceCount: sources.length,
    netPolarityInventory: round(netSigma),
    neutral: Math.abs(netSigma) < 1e-12,
    internalPotentialNet: round(internal.net),
    internalPotentialAbs: round(internal.abs),
    speedRows,
  };
}

// Internal potential-superposition ledger at the static (t=0) configuration:
// signed net and sum of magnitudes over site pairs. Geometric, scale-free.
function internalLedger(sources, options) {
  let net = 0;
  let abs = 0;
  for (let i = 0; i < sources.length; i += 1) {
    for (let j = i + 1; j < sources.length; j += 1) {
      const a = sourceState(sources[i], 0, 0).position;
      const b = sourceState(sources[j], 0, 0).position;
      const distance = Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
      const term =
        (options.coupling * sources[i].sigma * sources[j].sigma) /
        Math.sqrt(distance * distance + options.softening * options.softening);
      net += term;
      abs += Math.abs(term);
    }
  }
  return { net, abs };
}

// Superposed delayed potential over a far sphere and one rotation period, split
// into the DC (cycle-averaged, static-shielding) channel and the AC
// (oscillating, radiative) channel:
//   - mean: RMS over the sphere of each point's TIME-MEAN potential (the static
//     multipole that survives superposition = the near-perfect-superposition
//     shielding half);
//   - osc:  RMS over the sphere of each point's TIME-STD (the oscillating
//     radiative tail the rotating drum emits, entry 35's Phi_inf).
function netFarField(rFar, directions, period, context, timeSamples) {
  let meanSq = 0;
  let oscSq = 0;
  for (const dir of directions) {
    const point = [rFar * dir[0], rFar * dir[1], rFar * dir[2]];
    let sum = 0;
    let sumSq = 0;
    for (let k = 0; k < timeSamples; k += 1) {
      const time = (k / timeSamples) * period;
      const value = delayedPotential(point, time, context);
      sum += value;
      sumSq += value * value;
    }
    const mean = sum / timeSamples;
    const variance = Math.max(0, sumSq / timeSamples - mean * mean);
    meanSq += mean * mean;
    oscSq += variance;
  }
  return {
    mean: Math.sqrt(meanSq / directions.length),
    osc: Math.sqrt(oscSq / directions.length),
  };
}

// --- helpers -----------------------------------------------------------------

function fibonacciSphere(n) {
  const points = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i += 1) {
    const y = 1 - (2 * (i + 0.5)) / n;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    points.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return points;
}

function linearSlope(x, y) {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b, 0) / n;
  const meanY = y.reduce((a, b) => a + b, 0) / n;
  let num = 0;
  let den = 0;
  for (let i = 0; i < n; i += 1) {
    num += (x[i] - meanX) * (y[i] - meanY);
    den += (x[i] - meanX) * (x[i] - meanX);
  }
  return den > 0 ? num / den : 0;
}

function signPreservingMax(value, floor) {
  if (value === 0) {
    return floor;
  }
  const sign = value > 0 ? 1 : -1;
  return sign * Math.max(Math.abs(value), floor);
}

function round(value) {
  if (!Number.isFinite(value)) {
    return value;
  }
  return Number(value.toPrecision(10));
}

function requireNext(args, index, flag) {
  if (index + 1 >= args.length) {
    throw new Error(`Missing value for ${flag}`);
  }
  return args[index + 1];
}

function requireEnum(value, allowed, name) {
  if (!allowed.includes(value)) {
    throw new Error(`Invalid ${name}: ${value} (allowed: ${allowed.join(", ")})`);
  }
  return value;
}

function positiveFiniteNumber(value, name) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${name}: ${value}`);
  }
  return parsed;
}

function positiveInteger(value, name) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid ${name}: ${value}`);
  }
  return parsed;
}

function numberList(value, name) {
  const list = value
    .split(",")
    .map((token) => token.trim())
    .filter((token) => token.length > 0)
    .map((token) => {
      const parsed = Number(token);
      if (!Number.isFinite(parsed)) {
        throw new Error(`Invalid ${name} entry: ${token}`);
      }
      return parsed;
    });
  if (list.length === 0) {
    throw new Error(`Empty ${name} list`);
  }
  return list;
}

function printUsage(code) {
  console.log(
    [
      "Usage: node scripts/braid-ideal/sea-braid-shielding-ratio-diagnostic.mjs [options]",
      "",
      "  --mode single|doublet|both   assembly to measure (default both)",
      "  --pairing reversed|aligned|both  dimer polarity: reversed=quiet doublet, aligned=chain foil (default both)",
      "  --offset-dir axial|lateral   second-drum displacement direction (default lateral / side-by-side)",
      "  --field-speed <c_f>          default 1",
      "  --radius <R>                 default 1",
      "  --coupling <kappa>           default 1",
      "  --softening <eps>            default 0.05",
      "  --jacobian-floor <Jf>        default 0.05",
      "  --doublet-offset <s>         axial anti-pair separation in units of R (default 0.5)",
      "  --surface-speed-fractions a,b,c   default 0.3,0.6,0.9,0.99",
      "  --far-radii a,b,c            default 20,40,80",
      "  --sphere-samples <n>         default 96",
      "  --time-samples <n>           default 24",
      "  --out <path>                 write JSON report",
      "  --pretty                     pretty-print JSON",
    ].join("\n"),
  );
  process.exit(code);
}

export {
  N_HAT,
  E1_HAT,
  baseDrum,
  buildSources,
  rotatedOffset,
  sourceState,
  delayedPotential,
  internalLedger,
  netFarField,
  fibonacciSphere,
  linearSlope,
  round,
  runDiagnostic,
};
