#!/usr/bin/env node

// Section 91 seed-grade Kapitza test for the V5 axis-sector flutter.
//
// The measured quadratic pencil comes from gyroscopicTiltAnalysisFull.  This
// runner does not touch the central solver.  It applies a declared parametric
// axis drive in mass-normalized relative-tilt coordinates,
//
//   M qdd + C qdot + [S0 + a f(Omega t) H] q = 0,
//
// where H = M^(1/2) P_rel M^(1/2) and P_rel removes the two global-tilt
// directions.  Fast-time averaging gives
//
//   S_eff = S0 + <a^2>_spectral H / Omega^2.
//
// For a coherent cosine of peak amplitude a, the coefficient is
// a^2/(2 Omega^2).  For broadband forcing it is the spectral sum
// sum_j a_j^2/(2 Omega_j^2).  Additive zero-mean forcing is deliberately not
// used: it shakes a linear mode but cannot create a Kapitza restoring term.
// This is a stand-in for sea buffeting, not a derived sea response.

import { fileURLToPath } from "node:url";
import { gyroscopicTiltAnalysisFull } from "./spindle-support-ratio-targeted-search.mjs";

export const KAPITZA_FLUTTER_SCHEMA = "kapitza_flutter_stabilization.v0";
export const KAPITZA_FLUTTER_SPEC = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md#91-kapitza-dynamic-stabilization-of-the-flutter-does-buffeting-quiet-it-2026-07-11";

const zeros = (n) => Array.from({ length: n }, () => Array(n).fill(0));
const add = (A, B) => A.map((r, i) => r.map((v, j) => v + B[i][j]));
const scale = (A, s) => A.map((r) => r.map((v) => s * v));

function relativeTiltDriveMatrix(M) {
  const n = M.length;
  const sqrtMass = M.map((r, i) => Math.sqrt(r[i]));
  const P = zeros(n);
  for (const offset of [0, 3]) {
    const u = [0, 1, 2].map((j) => sqrtMass[offset + j]);
    const u2 = u.reduce((s, v) => s + v * v, 0);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
      P[offset + i][offset + j] = (i === j ? 1 : 0) - (u[i] * u[j]) / u2;
    }
  }
  return P.map((r, i) => r.map((v, j) => sqrtMass[i] * v * sqrtMass[j]));
}

const cAdd = (a, b) => [a[0] + b[0], a[1] + b[1]];
const cSub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cMul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cAbs = (a) => Math.hypot(a[0], a[1]);
const cDiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };

function determinantComplex(input) {
  const A = input.map((r) => r.map((v) => [...v]));
  let det = [1, 0];
  for (let col = 0; col < A.length; col++) {
    let pivot = col;
    for (let row = col + 1; row < A.length; row++) if (cAbs(A[row][col]) > cAbs(A[pivot][col])) pivot = row;
    if (cAbs(A[pivot][col]) < 1e-300) return [0, 0];
    if (pivot !== col) { [A[pivot], A[col]] = [A[col], A[pivot]]; det = cMul(det, [-1, 0]); }
    det = cMul(det, A[col][col]);
    for (let row = col + 1; row < A.length; row++) {
      const f = cDiv(A[row][col], A[col][col]);
      for (let j = col; j < A.length; j++) A[row][j] = cSub(A[row][j], cMul(f, A[col][j]));
    }
  }
  return det;
}

export function axisPencilSpectrum({ mass, velocity, stiffness }) {
  const n = mass.length;
  const pencil = (lambda) => {
    const lambda2 = cMul(lambda, lambda);
    return determinantComplex(Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) =>
      cAdd(cAdd(cMul(lambda2, [mass[i][j], 0]), cMul(lambda, [velocity[i][j], 0])), [stiffness[i][j], 0]))));
  };
  const massLead = mass.reduce((p, r, i) => p * r[i], 1);
  const scaleHint = Math.max(1, ...stiffness.flat().map(Math.abs), ...velocity.flat().map((v) => v * v));
  const massFloor = Math.min(...mass.map((r, i) => r[i]));
  const radius = 2 * Math.sqrt(scaleHint / massFloor);
  let roots = Array.from({ length: 2 * n }, (_, i) => {
    const theta = 0.31 + (2 * Math.PI * i) / (2 * n);
    return [radius * Math.cos(theta), radius * Math.sin(theta)];
  });
  let dkResidual = Infinity;
  for (let iteration = 0; iteration < 600; iteration++) {
    let moved = 0;
    for (let i = 0; i < roots.length; i++) {
      let denominator = [massLead, 0];
      for (let j = 0; j < roots.length; j++) if (i !== j) denominator = cMul(denominator, cSub(roots[i], roots[j]));
      const delta = cDiv(pencil(roots[i]), denominator);
      roots[i] = cSub(roots[i], delta);
      moved = Math.max(moved, cAbs(delta));
    }
    dkResidual = moved;
    if (moved < 1e-12) break;
  }
  const all = roots.map((z) => ({ re: z[0], im: z[1], pencilResidual: cAbs(pencil(z)) })).sort((a, b) => b.re - a.re);
  const globalPair = [...all].sort((a, b) => Math.hypot(a.re, a.im) - Math.hypot(b.re, b.im)).slice(0, 2);
  const quotient = all.filter((row) => !globalPair.includes(row));
  return { all, globalPair, quotient, leading: quotient[0], dkResidual };
}

function averagedPoint(base, driveMatrix, coefficient) {
  const spectrum = axisPencilSpectrum({
    mass: base.pencilMatrices.mass,
    velocity: base.pencilMatrices.velocity,
    stiffness: add(base.pencilMatrices.stiffness, scale(driveMatrix, coefficient)),
  });
  return { coefficient, leadingRe: spectrum.leading.re, leadingIm: Math.abs(spectrum.leading.im), dkResidual: spectrum.dkResidual };
}

function bisectThreshold(pointAtAmplitude, { low = 0, high = 1, tolerance = 1e-8 } = {}) {
  const atZero = pointAtAmplitude(0);
  while (pointAtAmplitude(high).leadingRe > 0 && high < 1e6) high *= 2;
  const atHigh = pointAtAmplitude(high);
  if (atHigh.leadingRe > 0) return { crossed: false, amplitude: null, below: atZero, above: atHigh };
  for (let i = 0; i < 80 && high - low > tolerance * Math.max(1, high); i++) {
    const mid = (low + high) / 2;
    if (pointAtAmplitude(mid).leadingRe <= 0) high = mid; else low = mid;
  }
  return { crossed: true, amplitude: high, below: pointAtAmplitude(low), above: pointAtAmplitude(high) };
}

function mulberry32(seed) {
  return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

function broadbandShape({ centerFrequency, fractionalBandwidth = 1, modes = 64, seed = 91091 }) {
  const low = centerFrequency * (1 - fractionalBandwidth / 2);
  const high = centerFrequency * (1 + fractionalBandwidth / 2);
  if (!(low > 0 && high > low)) throw new Error("broadband frequencies must be positive");
  const random = mulberry32(seed);
  const rows = Array.from({ length: modes }, (_, i) => ({
    frequency: low + (high - low) * ((i + 0.5) / modes),
    rawPower: -Math.log(Math.max(1e-15, 1 - random())),
    phase: 2 * Math.PI * random(),
  }));
  const power = rows.reduce((s, r) => s + r.rawPower, 0);
  for (const row of rows) row.rmsFraction = row.rawPower / power;
  const inverseSquareMoment = rows.reduce((s, r) => s + r.rmsFraction / (r.frequency * r.frequency), 0);
  return { low, high, rows, inverseSquareMoment, effectiveFrequency: 1 / Math.sqrt(inverseSquareMoment) };
}

export function kapitzaFlutterAnalysis({ frequencyRatios = [4, 6, 8, 12, 16], stochasticCenterRatio = 8, stochasticFractionalBandwidth = 1, stochasticModes = 64, stochasticSeed = 91091 } = {}) {
  const base = gyroscopicTiltAnalysisFull({});
  const driveMatrix = relativeTiltDriveMatrix(base.pencilMatrices.mass);
  const baseline = averagedPoint(base, driveMatrix, 0);
  const whirl = base.maxGrowthWhirlFrequency;
  const coherent = frequencyRatios.map((frequencyRatio) => {
    const frequency = frequencyRatio * whirl;
    const threshold = bisectThreshold((peakAmplitude) => averagedPoint(base, driveMatrix, peakAmplitude * peakAmplitude / (2 * frequency * frequency)));
    return { frequencyRatio, frequency, thresholdPeakAmplitude: threshold.amplitude,
      thresholdRmsAmplitude: threshold.amplitude === null ? null : threshold.amplitude / Math.sqrt(2),
      thresholdModulationRatio: threshold.amplitude === null ? null : threshold.amplitude / (frequency * frequency),
      leadingAtThreshold: threshold.above };
  });
  const stochasticCenterFrequency = stochasticCenterRatio * whirl;
  const shape = broadbandShape({ centerFrequency: stochasticCenterFrequency, fractionalBandwidth: stochasticFractionalBandwidth, modes: stochasticModes, seed: stochasticSeed });
  const stochasticThreshold = bisectThreshold((rmsAmplitude) => averagedPoint(base, driveMatrix, rmsAmplitude * rmsAmplitude * shape.inverseSquareMoment));

  // Order-of-magnitude comparison using only already-declared seed scales:
  // the braid cadence omega and twice that cadence bracket the fastest named
  // local sea-alignment scale, while c_f/a at a≈3.4 is slower.  None is in the
  // required Omega >= 4*whirl averaging regime.  The amplitude is therefore
  // intentionally left un-derived rather than fitted to force a verdict.
  const seaScale = {
    status: "frequency_scale_incompatible_amplitude_not_derived",
    namedFrequencyRange: [1 / 3.4, 2 * base.omega],
    namedFrequencyRatioToWhirl: [(1 / 3.4) / whirl, (2 * base.omega) / whirl],
    averagingMinimumFrequency: 4 * whirl,
    amplitudeEstimate: null,
    physicallyPlausibleQuenchEstablished: false,
  };
  const coefficientMap = [0, ...Array.from({ length: 141 }, (_, i) => 10 ** (-8 + i / 10))]
    .map((coefficient) => averagedPoint(base, driveMatrix, coefficient));
  const minimumMappedGrowth = coefficientMap.reduce((best, row) => row.leadingRe < best.leadingRe ? row : best, coefficientMap[0]);
  return {
    schema: KAPITZA_FLUTTER_SCHEMA,
    spec: KAPITZA_FLUTTER_SPEC,
    claimLevel: "seed-grade effective-averaged stand-in; not a derived sea response",
    model: { coordinate: "mass-normalized relative tilt", additiveDriveWouldStabilize: false,
      coherentCorrection: "Delta S = a_peak^2 H / (2 Omega^2)", stochasticCorrection: "Delta S = sum_j a_j,peak^2 H / (2 Omega_j^2)" },
    baseline: { leadingRe: baseline.leadingRe, leadingIm: baseline.leadingIm, sourceLeadingRe: base.maxGrowthRate, sourceLeadingIm: base.maxGrowthWhirlFrequency },
    thresholdCoefficient: null,
    coefficientMap,
    minimumMappedGrowth,
    coherent,
    stochastic: { centerFrequencyRatio: stochasticCenterRatio, centerFrequency: stochasticCenterFrequency,
      fractionalBandwidth: stochasticFractionalBandwidth, modes: stochasticModes, seed: stochasticSeed,
      band: [shape.low, shape.high], effectiveFrequency: shape.effectiveFrequency,
      thresholdRmsAmplitude: stochasticThreshold.amplitude,
      thresholdPeakEquivalent: stochasticThreshold.amplitude === null ? null : stochasticThreshold.amplitude * Math.sqrt(2),
      thresholdModulationRatio: stochasticThreshold.amplitude === null ? null : stochasticThreshold.amplitude / (shape.effectiveFrequency ** 2),
      leadingAtThreshold: stochasticThreshold.above },
    seaScale,
    decision: "negative_no_averaged_restoring_threshold_flutter_not_quenched",
    followupGate: "derive the sea fluctuation spectrum and multiplicative axis-coupling matrix on the native sea-coupled record",
    centralSolverTouched: false,
    retainedBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) process.stdout.write(`${JSON.stringify(kapitzaFlutterAnalysis(), null, process.argv.includes("--pretty") ? 2 : 0)}\n`);
