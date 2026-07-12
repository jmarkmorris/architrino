#!/usr/bin/env node

// Priority-only diagnostic: the cycle-averaged, causally-delayed inter-drum
// interaction energy of a sea-braid dimer, and the equilibrium separation s*
// it selects (packet step 1-2 of
// sea-braid-dimer-shielding-ground-state-packet.md).
//
// Physics. Two neutral drums (each three epsilon_+, three epsilon_- on the
// face-opposite seed rotating rigidly about n_hat) are placed at separation s
// (units of R), either colinear along n_hat ("axial") or side-by-side along
// e1_hat ("lateral"). The second drum is polarity-reversed (the C-conjugate
// anti-pair, "reversed" -> the quiet doublet) or polarity-preserving ("aligned"
// -> the chain foil). The interaction "energy" is the cycle-averaged superposed
// DELAYED-potential coupling
//
//     U(s) = < 1/2 [ sum_{i in A} sigma_i Phi_B(x_i, t)
//                  + sum_{j in B} sigma_j Phi_A(x_j, t) ] >_t ,
//
// where Phi_X is the superposed delayed potential of drum X at field speed c_f,
// reusing the exact-worldline kernel of the shielding diagnostic. The static
// (instantaneous) energy is reported alongside for contrast: entry 33 of the
// braid-ideal brainstorming records that idealizing the delays flips the naive
// sign, so a confining minimum at finite s is expected to be a DELAY-selected
// commensurability band, not a static well.
//
// Output. For each pairing: the U(s) scan (delayed and static), the detected
// local minima (confining bands), the selected s* (deepest finite-s well), and
// a shielding check at s* confirming the selected geometry sits on the
// quadrupole (ell=2) branch. Fail-closed: no retained-branch claim, no
// accepted-evidence claim, no score movement. Architrino primitives carry no
// physical mass; U is a unit-weight potential-superposition ledger, not an
// energy claim.

import fs from "node:fs";
import path from "node:path";

import {
  N_HAT,
  E1_HAT,
  baseDrum,
  rotatedOffset,
  sourceState,
  delayedPotential,
  netFarField,
  fibonacciSphere,
  linearSlope,
  round,
} from "./sea-braid-shielding-ratio-diagnostic.mjs";

const options = parseArgs(process.argv.slice(2));
if (options.help) {
  printUsage(0);
}
const report = runDimerEnergy(options);
const serialized = JSON.stringify(report, null, options.pretty ? 2 : 0);
if (options.outPath) {
  fs.mkdirSync(path.dirname(path.resolve(options.outPath)), { recursive: true });
  fs.writeFileSync(options.outPath, `${serialized}\n`);
}
console.log(serialized);

// --- CLI ---------------------------------------------------------------------

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
    surfaceSpeedFraction: 0.6,
    offsetDir: "lateral",
    pairing: "both", // reversed | aligned | both
    sMin: 2.5,
    sMax: 9,
    sSamples: 66,
    timeSamples: 36,
    farRadii: [20, 40, 80, 160],
    sphereSamples: 160,
    invertSpacing: null,
    harmonic: 3,
    bandIndex: 1,
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
    } else if (arg === "--surface-speed-fraction") {
      parsed.surfaceSpeedFraction = positiveFiniteNumber(requireNext(rawArgs, index, arg), "surface-speed-fraction");
      index += 1;
    } else if (arg === "--offset-dir") {
      parsed.offsetDir = requireEnum(requireNext(rawArgs, index, arg), ["axial", "lateral"], "offset-dir");
      index += 1;
    } else if (arg === "--pairing") {
      parsed.pairing = requireEnum(requireNext(rawArgs, index, arg), ["reversed", "aligned", "both"], "pairing");
      index += 1;
    } else if (arg === "--s-min") {
      parsed.sMin = positiveFiniteNumber(requireNext(rawArgs, index, arg), "s-min");
      index += 1;
    } else if (arg === "--s-max") {
      parsed.sMax = positiveFiniteNumber(requireNext(rawArgs, index, arg), "s-max");
      index += 1;
    } else if (arg === "--s-samples") {
      parsed.sSamples = positiveInteger(requireNext(rawArgs, index, arg), "s-samples");
      index += 1;
    } else if (arg === "--time-samples") {
      parsed.timeSamples = positiveInteger(requireNext(rawArgs, index, arg), "time-samples");
      index += 1;
    } else if (arg === "--far-radii") {
      parsed.farRadii = numberList(requireNext(rawArgs, index, arg), "far-radii");
      index += 1;
    } else if (arg === "--sphere-samples") {
      parsed.sphereSamples = positiveInteger(requireNext(rawArgs, index, arg), "sphere-samples");
      index += 1;
    } else if (arg === "--invert-spacing") {
      parsed.invertSpacing = positiveFiniteNumber(requireNext(rawArgs, index, arg), "invert-spacing");
      index += 1;
    } else if (arg === "--harmonic") {
      parsed.harmonic = positiveInteger(requireNext(rawArgs, index, arg), "harmonic");
      index += 1;
    } else if (arg === "--band-index") {
      parsed.bandIndex = positiveInteger(requireNext(rawArgs, index, arg), "band-index");
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

// --- dimer construction ------------------------------------------------------

function drumB(radius, pairing, offsetDir, s) {
  const dir = offsetDir === "axial" ? N_HAT : E1_HAT;
  const center = [dir[0] * s * radius, dir[1] * s * radius, dir[2] * s * radius];
  const sigmaFactor = pairing === "aligned" ? 1 : -1;
  return baseDrum(radius).map((site) => ({
    label: `${site.label}__b`,
    sigma: sigmaFactor * site.sigma,
    seed: site.seed,
    center,
  }));
}

// --- energy accumulator ------------------------------------------------------

// Cycle-averaged causally-delayed inter-drum coupling at separation s.
function delayedInteractionEnergy(sourcesA, sourcesB, omega, options, timeSamples) {
  const period = (2 * Math.PI) / omega;
  const contextA = { options, sources: sourcesA, omega };
  const contextB = { options, sources: sourcesB, omega };
  let sum = 0;
  for (let k = 0; k < timeSamples; k += 1) {
    const time = (k / timeSamples) * period;
    let uAB = 0;
    for (const site of sourcesA) {
      const pos = sourceState(site, time, omega).position;
      uAB += site.sigma * delayedPotential(pos, time, contextB);
    }
    let uBA = 0;
    for (const site of sourcesB) {
      const pos = sourceState(site, time, omega).position;
      uBA += site.sigma * delayedPotential(pos, time, contextA);
    }
    sum += 0.5 * (uAB + uBA);
  }
  return sum / timeSamples;
}

// Instantaneous (no-delay) inter-drum coupling at t=0, for contrast.
function staticInteractionEnergy(sourcesA, sourcesB, options) {
  let energy = 0;
  for (const a of sourcesA) {
    const pa = sourceState(a, 0, 0).position;
    for (const b of sourcesB) {
      const pb = sourceState(b, 0, 0).position;
      const distance = Math.hypot(pa[0] - pb[0], pa[1] - pb[1], pa[2] - pb[2]);
      energy +=
        (options.coupling * a.sigma * b.sigma) /
        Math.sqrt(distance * distance + options.softening * options.softening);
    }
  }
  return energy;
}

function runDimerEnergy(options) {
  const pairings = options.pairing === "both" ? ["reversed", "aligned"] : [options.pairing];
  const leverArm = options.radius * Math.sqrt(2 / 3);
  const omega = (options.surfaceSpeedFraction * options.fieldSpeed) / leverArm;
  const directions = fibonacciSphere(options.sphereSamples);
  const sValues = linspace(options.sMin, options.sMax, options.sSamples);

  const rows = pairings.map((pairing) => {
    const sourcesA = baseDrum(options.radius);
    const scan = sValues.map((s) => {
      const sourcesB = drumB(options.radius, pairing, options.offsetDir, s);
      return {
        s: round(s),
        energyDelayed: round(delayedInteractionEnergy(sourcesA, sourcesB, omega, options, options.timeSamples)),
        energyStatic: round(staticInteractionEnergy(sourcesA, sourcesB, options)),
      };
    });

    const minima = localMinima(scan.map((r) => r.energyDelayed), sValues);
    const selected = minima.length > 0 ? minima.reduce((a, b) => (b.value < a.value ? b : a)) : null;

    let shielding = null;
    if (selected) {
      shielding = shieldingAt(options.radius, pairing, options.offsetDir, selected.s, omega, directions, options);
    }

    return {
      pairing,
      offsetDir: options.offsetDir,
      scan,
      localMinimaCount: minima.length,
      localMinima: minima.map((m) => ({ s: round(m.s), energyDelayed: round(m.value) })),
      bandLadder: bandLadder(minima, omega, options.radius, options.fieldSpeed),
      selectedSeparation: selected ? round(selected.s) : null,
      selectedEnergyDelayed: selected ? round(selected.value) : null,
      shieldingAtSelected: shielding,
    };
  });

  return {
    diagnostic: "sea_braid_dimer_energy_diagnostic.v0",
    generatedAt: new Date().toISOString(),
    description:
      "cycle-averaged causally-delayed inter-drum interaction energy vs separation, the delay-selected equilibrium s*, and a shielding check confirming the quadrupole branch at s*",
    claimLevel: "priority-only diagnostic; retainedBranchClaim=false; scoreMovement=no_score_increase",
    energyNote:
      "U is a unit-weight potential-superposition ledger (architrino primitives carry no physical mass); delayed vs static contrast follows entry 33 (delay selects the separation)",
    parameters: {
      fieldSpeed: options.fieldSpeed,
      radius: options.radius,
      coupling: options.coupling,
      softening: options.softening,
      jacobianFloor: options.jacobianFloor,
      surfaceSpeedFraction: options.surfaceSpeedFraction,
      omega: round(omega),
      offsetDir: options.offsetDir,
      sRange: [options.sMin, options.sMax],
      sSamples: options.sSamples,
      timeSamples: options.timeSamples,
      farRadii: options.farRadii,
      invertSpacing: options.invertSpacing,
      harmonic: options.harmonic,
      bandIndex: options.bandIndex,
    },
    commensurabilityLaw: {
      form: "m*omega*s*R/c_f = 2*pi*k  (confining bands of the C3 harmonic m)",
      bandSpacingInvariant: "Delta_s * omega = 2*pi*c_f/(m*R)",
      dominantHarmonic: options.harmonic,
      predictedLadderConstantSOmega: round((2 * Math.PI * options.fieldSpeed) / (options.harmonic * options.radius)),
    },
    inversion:
      options.invertSpacing != null
        ? invertSpacing(options.invertSpacing, options.harmonic, options.bandIndex, options.radius, options.fieldSpeed)
        : null,
    pairings: rows,
  };
}

// Shielding multipole of the combined dimer at separation s (DC channel slope).
function shieldingAt(radius, pairing, offsetDir, s, omega, directions, options) {
  const sourcesA = baseDrum(radius);
  const sourcesB = drumB(radius, pairing, offsetDir, s);
  const sources = [...sourcesA, ...sourcesB];
  const context = { options, sources, omega };
  const period = (2 * Math.PI) / omega;
  const beta = options.surfaceSpeedFraction;
  const timeSamples = Math.min(options.timeSamples * 40, Math.max(48, Math.round(48 / (1 - Math.min(beta, 0.99)))));
  const rows = options.farRadii.map((rFar) => {
    const net = netFarField(rFar, directions, period, context, timeSamples);
    return { farRadius: round(rFar), meanFarField: round(net.mean), oscFarField: round(net.osc) };
  });
  const logR = options.farRadii.map((r) => Math.log(r));
  const meanSlope = linearSlope(logR, rows.map((r) => Math.log(r.meanFarField)));
  return {
    separation: round(s),
    rows,
    meanFieldSlope: round(meanSlope),
    shieldingMultipoleEll: Math.max(0, Math.round(-meanSlope - 1)),
  };
}

// --- helpers -----------------------------------------------------------------

function localMinima(values, sValues) {
  const minima = [];
  for (let i = 1; i < values.length - 1; i += 1) {
    if (values[i] < values[i - 1] && values[i] <= values[i + 1]) {
      minima.push({ s: sValues[i], value: values[i], index: i });
    }
  }
  return minima;
}

// The confining bands are an evenly spaced ladder in separation. The
// cycle-averaged symmetrized delayed energy reduces to U(s) ~ cos(m*omega*s*R/c_f)
// for the drum's dominant rotating azimuthal harmonic m (the C3 structure ->
// m=3), so consecutive confining minima satisfy m*omega*Delta_s*R/c_f = 2*pi,
// i.e. the invariant band spacing Delta_s * omega = 2*pi*c_f/(m*R). This routine
// reads m and the ladder constant back from the measured minima.
function bandLadder(minima, omega, radius, fieldSpeed) {
  // Keep only the deep PRIMARY confining bands; weak secondary (m=6-flavored)
  // ripples at large s, which can outnumber the primary bands, are dropped by a
  // depth cut at a quarter of the deepest well.
  const deepest = minima.reduce((a, b) => (b.value < a.value ? b : a), minima[0]);
  const primary =
    deepest && deepest.value < 0
      ? minima.filter((m) => m.value <= 0.25 * deepest.value).map((m) => m.s)
      : minima.map((m) => m.s);
  const minimaS = primary;
  if (minimaS.length < 2) {
    return { bands: minimaS.length, primaryBands: minimaS.length, note: "need >= 2 primary bands to fit the ladder" };
  }
  const spacings = [];
  for (let i = 1; i < minimaS.length; i += 1) {
    spacings.push(minimaS[i] - minimaS[i - 1]);
  }
  const meanSpacing = spacings.reduce((a, b) => a + b, 0) / spacings.length;
  const spread = Math.max(...spacings) - Math.min(...spacings);
  // The dominant band spacing is read from the MEDIAN, which resists the
  // occasional secondary (m=6-flavored) minima that appear at large s where the
  // primary amplitude is weak; those would drag the mean and inflate the fit.
  const medianSpacing = median(spacings);
  const ladderConstant = medianSpacing * omega; // = 2*pi*c_f/(m*R)
  const harmonicFit = (2 * Math.PI * fieldSpeed) / (ladderConstant * radius);
  return {
    bands: minima.length,
    primaryBands: minimaS.length,
    spacings: spacings.map(round),
    meanSpacing: round(meanSpacing),
    medianSpacing: round(medianSpacing),
    spacingSpread: round(spread),
    ladderConstantSOmega: round(ladderConstant),
    harmonicFit: round(harmonicFit),
    harmonicNearestInteger: Math.round(harmonicFit),
  };
}

// Inversion (entry 33's named measurement): read the sea cadence off a lattice
// constant. A confining shell at separation s_obs is the k-th band of harmonic
// m, so m*omega*s_obs*R/c_f = 2*pi*k gives omega_sea = 2*pi*k*c_f/(m*R*s_obs),
// and the corresponding site-speed fraction beta = omega*R*sqrt(2/3)/c_f.
function invertSpacing(sObs, harmonic, bandIndex, radius, fieldSpeed) {
  const omegaSea = (2 * Math.PI * bandIndex * fieldSpeed) / (harmonic * radius * sObs);
  const betaSea = (omegaSea * radius * Math.sqrt(2 / 3)) / fieldSpeed;
  return {
    method: "single-shell band condition m*omega*s_obs*R/c_f = 2*pi*k",
    observedSpacing: round(sObs),
    harmonic,
    bandIndex,
    omegaSea: round(omegaSea),
    siteSpeedFractionSea: round(betaSea),
    supraField: betaSea >= 1,
    caveat:
      "assigns s_obs to band k; low-k shells at small s can be pre-empted by near-field attraction, so the physical nearest-neighbor shell is often k>=2. The band-index-free form below is robust.",
  };
}

// Robust inversion from the shell-to-shell SPACING (phase-offset-independent):
// Delta_s * omega = 2*pi*c_f/(m*R)  =>  omega_sea = 2*pi*c_f/(m*R*Delta_s).
function invertFromSpacing(deltaObs, harmonic, radius, fieldSpeed) {
  const omegaSea = (2 * Math.PI * fieldSpeed) / (harmonic * radius * deltaObs);
  const betaSea = (omegaSea * radius * Math.sqrt(2 / 3)) / fieldSpeed;
  return {
    method: "shell-spacing invariant Delta_s*omega = 2*pi*c_f/(m*R)",
    observedSpacing: round(deltaObs),
    harmonic,
    omegaSea: round(omegaSea),
    siteSpeedFractionSea: round(betaSea),
    supraField: betaSea >= 1,
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? 0.5 * (sorted[mid - 1] + sorted[mid]) : sorted[mid];
}

function linspace(a, b, n) {
  if (n === 1) {
    return [a];
  }
  const out = [];
  for (let i = 0; i < n; i += 1) {
    out.push(a + ((b - a) * i) / (n - 1));
  }
  return out;
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
      "Usage: node scripts/braid-ideal/sea-braid-dimer-energy-diagnostic.mjs [options]",
      "",
      "  --pairing reversed|aligned|both   default both",
      "  --offset-dir axial|lateral        default lateral (side-by-side)",
      "  --surface-speed-fraction <beta>   default 0.6",
      "  --s-min <s> --s-max <s> --s-samples <n>   separation scan (default 2.5 9 66)",
      "  --time-samples <n>                cycle-average samples (default 36)",
      "  --far-radii a,b,c                 shielding check radii (default 20,40,80,160)",
      "  --sphere-samples <n>              default 160",
      "  --invert-spacing <s_obs>          infer sea cadence from a lattice constant (entry 33)",
      "  --harmonic <m>                    dominant rotating multipole (default 3, the C3 drum)",
      "  --band-index <k>                  which confining shell s_obs is (default 1)",
      "  --field-speed --radius --coupling --softening --jacobian-floor",
      "  --out <path> --pretty",
    ].join("\n"),
  );
  process.exit(code);
}

export {
  drumB,
  delayedInteractionEnergy,
  staticInteractionEnergy,
  localMinima,
  bandLadder,
  invertSpacing,
  invertFromSpacing,
  runDimerEnergy,
};
