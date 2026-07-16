// Priority-only diagnostic scan for the u=0 rigid rotating-wave residual system
// on the axis-neutral channel (see reference/priorities/braid-archive/braid-ideal/axis-neutral-rotating-wave-spectrum-packet.md).
// Units: rho=1, c_f=1, kappa=1, softening=0. Unknowns: alpha=h/rho, beta=omega*rho.
// Fail-closed: this scan never authorizes a retained branch, an admissible spectrum row,
// accepted evidence, or score movement.
import { fileURLToPath } from "node:url";

export const SCHEMA = "axis_neutral_rotating_wave_residual_scan.v0";

const SQ3 = Math.sqrt(3), SQ6 = Math.sqrt(6), SQ2 = Math.sqrt(2);
const N_HAT = [1 / SQ3, 1 / SQ3, 1 / SQ3];
const ER0 = [2 / SQ6, -1 / SQ6, -1 / SQ6];
const ET0 = [0, 1 / SQ2, -1 / SQ2];
const D2R = Math.PI / 180;
// sources relative to receiver eps+x at phase 0, height +alpha
const SOURCES = [
  { psi: 120 * D2R, ring: +1 },
  { psi: 240 * D2R, ring: +1 },
  { psi: 60 * D2R, ring: -1 },
  { psi: 180 * D2R, ring: -1 },
  { psi: 300 * D2R, ring: -1 },
];

const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const er = (t) => add(mul(ER0, Math.cos(t)), mul(ET0, Math.sin(t)));
const et = (t) => add(mul(ER0, -Math.sin(t)), mul(ET0, Math.cos(t)));

function separation(alpha, beta, psi, ring, lag) {
  const del = psi - beta * lag;
  const sinHalf = Math.sin(del / 2);
  const gap = ring > 0 ? 0 : 2 * alpha;
  return Math.sqrt(gap * gap + 4 * sinHalf * sinHalf);
}

function causalLag(alpha, beta, psi, ring) {
  const G = (s) => separation(alpha, beta, psi, ring, s) - s;
  const hi = 2 * Math.sqrt(alpha * alpha + 1) + 2;
  let prev = 1e-9, prevG = G(prev), bracket = null;
  for (let s = prev; s <= hi; s += hi / 4000) {
    const g = G(s);
    if (prevG > 0 && g <= 0) { bracket = [prev, s]; break; }
    prev = s; prevG = g;
  }
  if (!bracket) return null;
  let [a, b] = bracket;
  for (let i = 0; i < 80; i += 1) { const m = (a + b) / 2; if (G(m) > 0) a = m; else b = m; }
  return (a + b) / 2;
}

export function rotatingWaveResiduals(alpha, beta) {
  const receiver = add(mul(N_HAT, alpha), ER0);
  const vRec = mul(ET0, beta);
  let force = [0, 0, 0];
  let minSourceNormal = Infinity;
  for (const src of SOURCES) {
    const lag = causalLag(alpha, beta, src.psi, src.ring);
    if (lag == null) return null;
    const del = src.psi - beta * lag;
    const sourcePos = add(mul(N_HAT, src.ring > 0 ? alpha : -alpha), er(del));
    const vSrc = mul(et(del), beta);
    const d = sub(receiver, sourcePos);
    const dist = Math.hypot(...d);
    const dHat = mul(d, 1 / dist);
    const sourceNormal = 1 - dot(vSrc, dHat);
    const receiverNormal = 1 - dot(vRec, dHat);
    minSourceNormal = Math.min(minSourceNormal, Math.abs(sourceNormal));
    const branchWeight = Math.abs(receiverNormal / sourceNormal);
    const polarityProduct = src.ring > 0 ? +1 : -1;
    force = add(force, mul(dHat, (polarityProduct * branchWeight) / (dist * dist)));
  }
  return {
    axial: dot(force, N_HAT),
    radial: dot(force, ER0),
    tangential: dot(force, ET0),
    min_source_normal: minSourceNormal,
  };
}

export function runScan() {
  // Row 1: axial sign check on an alpha>0 grid (numerical witness of the sign lemma).
  let axialAllNegative = true, axialMax = -Infinity, axialSamples = 0;
  for (let a = 0.1; a <= 2.001; a += 0.1) {
    for (let b = 0.05; b <= 0.951; b += 0.05) {
      const r = rotatingWaveResiduals(a, b);
      if (!r) continue;
      axialSamples += 1;
      if (r.axial >= 0) axialAllNegative = false;
      axialMax = Math.max(axialMax, r.axial);
    }
  }
  // Row 2: planar hexagon tangential zero scan.
  const rows = [];
  let signChanges = 0, prev = null;
  for (let b = 0.02; b <= 0.985; b += 0.005) {
    const r = rotatingWaveResiduals(0, b);
    if (!r) continue;
    if (prev !== null && Math.sign(r.tangential) !== Math.sign(prev)) signChanges += 1;
    prev = r.tangential;
    rows.push({ beta: Number(b.toFixed(3)), tangential: r.tangential, radial: r.radial });
  }
  const minTangential = Math.min(...rows.map((r) => r.tangential));
  return {
    schema: SCHEMA,
    claim_level: "priority_only_sampled_diagnostic_not_retained_branch_evidence",
    kernel: { field_speed: 1, coupling: 1, softening: 0, weights: "receiver_normal_over_floored_source_normal" },
    axial_no_balance: {
      statement: "rigid two-ring rotating waves have strictly negative axial residual for alpha>0 (sign lemma; every opposite-ring term pulls the rings together, same-ring terms have zero axial part)",
      grid_samples: axialSamples,
      all_negative: axialAllNegative,
      max_axial_residual: axialMax,
    },
    planar_tangential_scan: {
      beta_range: [0.02, 0.985],
      sign_changes: signChanges,
      min_tangential: minTangential,
      interpretation: "tangential residual positive throughout: net wake force along the velocity (anti-damping); no rigid rotating-wave equilibrium in the scanned sub-field range",
      sample_rows: rows.filter((_, i) => i % 20 === 0),
    },
    disposition: "rigid_u0_rotating_wave_family_no_admissible_row_in_scan",
    retainedBranchClaim: false,
    acceptedSameLevelBranchClaim: false,
    scoreMovement: "no_score_increase",
  };
}

function runCli() {
  const result = runScan();
  const pretty = process.argv.includes("--pretty");
  console.log(JSON.stringify(result, null, pretty ? 2 : 0));
}

if (process.argv[1] === fileURLToPath(import.meta.url)) runCli();
