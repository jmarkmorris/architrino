// Rigid tilted-nested braid evaluator (the rigidity-preserving 3D lift).
//
// Closure goal (2026-07-08, spec Section 19): the harmonic-matching principle says
// closure requires co-rotation rigidity, so the right 3D lift keeps ONE rotation
// axis: three nested neutral antipodal binaries as tilted dumbbells, all rigidly
// co-rotating about z at common omega. Axis a's pair sits at +/- R_a * n_a(t),
// n_a(t) = Rot_z(omega t) * (cos(alpha_a) cos(theta_a), cos(alpha_a) sin(theta_a), sin(alpha_a)),
// with tilt alpha_a (elevation of the pair axis from the equatorial plane) and
// azimuth theta_a. Every site traces a horizontal circle at cylindrical radius
// rho_a = R_a cos(alpha_a) and fixed height +/- R_a sin(alpha_a): a global rigid
// rotation, so all alignment scalars are constant and single-time evaluation is
// exact (verified). Speeds: beta_a = omega R_a cos(alpha_a). Rail: middle at
// beta_M = 1 with alpha_M = 0 (the clicker stays equatorial and clean).
//
// Why tilt is the right knob: the planar family's obstruction was the radial
// support-ratio mismatch (needed centripetal omega^2 R_a vs wake supply). Tilt
// rescales the NEED per layer (omega^2 R_a cos alpha_a -> the cylindrical radius,
// not the site radius) while reshaping the SUPPLY through 3D geometry, and adds
// a vertical force-balance condition (kinematic need is horizontal; any axial
// wake force is pure residual, which the unified 3-component metric counts).
//
// Same unified closure metric, signed normals, partner channel. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "rigid_tilted_nested_braid_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

export function buildBraid({ qI = 0.5, qO = 1.6, alphaI = 0, alphaM = 0, alphaO = 0, betaM = 1.0, phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = {}) {
  const RM = 1;
  const omega = (betaM * cf) / (RM * Math.cos(alphaM));
  const layers = [
    { name: "I", R: qI * RM, alpha: alphaI, th: phases[0] },
    { name: "M", R: RM, alpha: alphaM, th: phases[1] },
    { name: "O", R: qO * RM, alpha: alphaO, th: phases[2] },
  ];
  const sites = [];
  for (const L of layers) {
    sites.push({ ...L, sgn: +1, pol: +1 });
    sites.push({ ...L, sgn: -1, pol: -1 });
  }
  return {
    omega, sites,
    betas: Object.fromEntries(layers.map((L) => [L.name, omega * L.R * Math.cos(L.alpha)])),
  };
}

function pos(s, t, w) {
  const a = w * t + s.th, ca = Math.cos(s.alpha);
  return [s.sgn * s.R * ca * Math.cos(a), s.sgn * s.R * ca * Math.sin(a), s.sgn * s.R * Math.sin(s.alpha)];
}
function vel(s, t, w) {
  const a = w * t + s.th, ca = Math.cos(s.alpha), v = s.sgn * s.R * ca * w;
  return [-v * Math.sin(a), v * Math.cos(a), 0];
}
function kinAccel(s, t, w) {
  const a = w * t + s.th, k = s.sgn * s.R * Math.cos(s.alpha) * w * w;
  return [-k * Math.cos(a), -k * Math.sin(a), 0];
}

function causalRoots(Xi, src, T, w, dmax, N = 4000, minDelay = 1e-9) {
  const g = (te) => { const p = pos(src, te, w); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]) - cf * (T - te); };
  const out = []; let g0 = g(T - dmax);
  for (let k = 1; k <= N; k++) {
    const te = T - dmax + dmax * (k / N); if (te >= T - minDelay) break;
    const g1 = g(te);
    if (g0 === 0 || (g0 < 0) !== (g1 < 0)) {
      let lo = T - dmax + dmax * ((k - 1) / N), hi = te; const gl = g(lo);
      for (let b = 0; b < 64; b++) { const m = (lo + hi) / 2; if ((gl < 0) === (g(m) < 0)) lo = m; else hi = m; }
      out.push((lo + hi) / 2);
    }
    g0 = g1;
  }
  return out;
}

export function wakeAccel(braid, recvIdx, T = 0, { soft = 0.02 } = {}) {
  const recv = braid.sites[recvIdx];
  const Xi = pos(recv, T, braid.omega), vi = vel(recv, T, braid.omega);
  let av = [0, 0, 0], minAbsDs = Infinity;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = recv.R + src.R + 0.3;
    for (const te of causalRoots(Xi, src, T, braid.omega, dmax)) {
      const p = pos(src, te, braid.omega);
      const d = [Xi[0] - p[0], Xi[1] - p[1], Xi[2] - p[2]];
      const rr = Math.hypot(d[0], d[1], d[2]);
      if (rr < 1e-9) continue;
      const rh = [d[0] / rr, d[1] / rr, d[2] / rr];
      const vs = vel(src, te, braid.omega);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1] + vs[2] * rh[2]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1] + vi[2] * rh[2]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      const m = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (recv.pol * src.pol) * m / (rr * rr);
      av[0] += w * rh[0]; av[1] += w * rh[1]; av[2] += w * rh[2];
    }
  }
  return { a: av, minAbsDs };
}

// Rigid => single-time evaluation; rigidity witnessed via time spot-checks.
export function rigidityCheck(cfg = {}) {
  const braid = buildBraid(cfg);
  const f = (T) => [0, 2, 4].map((i) => {
    const w = wakeAccel(braid, i, T);
    const s = braid.sites[i], a = braid.omega * T + s.th;
    // compare rotating-frame components (co-rotate the vector back by -a about z)
    const c = Math.cos(-a), sn = Math.sin(-a);
    return [c * w.a[0] - sn * w.a[1], sn * w.a[0] + c * w.a[1], w.a[2]];
  });
  const A = f(0), B = f(0.53);
  let maxVar = 0;
  for (let i = 0; i < 3; i++) for (let c = 0; c < 3; c++) maxVar = Math.max(maxVar, Math.abs(A[i][c] - B[i][c]));
  return { maxVar, timeIndependent: maxVar < 1e-6 };
}

export function residuals(cfg = {}, { soft = 0.02, recvs = [0, 2, 4] } = {}) {
  const braid = buildBraid(cfg);
  const samples = []; let minAbsDs = Infinity;
  for (const i of recvs) {
    const s = braid.sites[i];
    const kin = kinAccel(s, 0, braid.omega);
    const wk = wakeAccel(braid, i, 0, { soft });
    minAbsDs = Math.min(minAbsDs, wk.minAbsDs);
    samples.push({ layer: s.name, kin, wake: wk.a });
  }
  let num = 0, den = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { num += s.kin[c] * s.wake[c]; den += s.wake[c] ** 2; }
  const kappaStar = num / den;
  const per = {}; const axial = {};
  for (const s of samples) {
    let res = 0, ref = 0;
    for (let c = 0; c < 3; c++) { res += (s.kin[c] - kappaStar * s.wake[c]) ** 2; ref += s.kin[c] ** 2; }
    per[s.layer] = Math.sqrt(res / ref);
    axial[s.layer] = Math.abs(kappaStar * s.wake[2]) / Math.hypot(s.kin[0], s.kin[1]);
  }
  let rA = 0, fA = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { rA += (s.kin[c] - kappaStar * s.wake[c]) ** 2; fA += s.kin[c] ** 2; }
  return { kappaStar, relResidual: per, axialFrac: axial, globalRelResidual: Math.sqrt(rA / fA), minAbsDs, betas: braid.betas };
}

// Honest polar-limit scoring: at alpha_O = 90 deg the outer pair is STATIC on the
// axis at heights +/- R_O; its closure condition is ABSOLUTE net force -> 0 (no
// centripetal need to normalize by). Score: |kappa* a_wake| on the polar + site,
// normalized by the middle layer's kinematic need (omega^2 R_M), alongside the
// orbiting core's need-relative residuals. Also expose the net AXIAL force on the
// polar site as a function of R_O -- an equilibrium height exists where it
// crosses zero (partner pull inward vs core push outward).
export function polarScore({ qI = 0.5, qO = 2.0, alphaI = 0, alphaM = 0, phases } = {}) {
  const cfg = { qI, qO, alphaI, alphaM, alphaO: Math.PI / 2, ...(phases ? { phases } : {}) };
  const braid = buildBraid(cfg);
  const need = braid.omega * braid.omega * 1; // middle need, R_M = 1
  // core residuals (I, M) with kappa* fitted on core samples only
  const samples = [];
  for (const i of [0, 2]) {
    const st = braid.sites[i];
    samples.push({ layer: st.name, kin: kinAccel(st, 0, braid.omega), wake: wakeAccel(braid, i, 0).a });
  }
  let num = 0, den = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { num += s.kin[c] * s.wake[c]; den += s.wake[c] ** 2; }
  const kappaStar = num / den;
  const per = {};
  for (const s of samples) {
    let res = 0, ref = 0;
    for (let c = 0; c < 3; c++) { res += (s.kin[c] - kappaStar * s.wake[c]) ** 2; ref += s.kin[c] ** 2; }
    per[s.layer] = Math.sqrt(res / ref);
  }
  // polar pair absolute score with the SAME kappa*
  const wO = wakeAccel(braid, 4, 0).a;
  const absPolar = kappaStar * Math.hypot(wO[0], wO[1], wO[2]) / need;
  const axialForce = kappaStar * wO[2] / need; // signed: + pushes the +z cap outward
  return { kappaStar, coreRelResidual: per, polarAbsScore: absPolar, polarAxialForce: axialForce, betas: braid.betas };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    rigidity: rigidityCheck({ alphaI: 0.4, alphaO: 0.9 }),
    planarRegression: residuals({ alphaI: 0, alphaO: 0 }),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
