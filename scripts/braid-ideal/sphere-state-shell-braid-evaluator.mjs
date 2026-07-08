// Sphere-state shell braid evaluator (first out-of-plane lift).
//
// Autonomous exploration (2026-07-08). Operator geometry: the shell braid's 3D
// state -- three neutral antipodal binaries at ONE common radius and ONE common
// frequency, orbiting in three MUTUALLY ORTHOGONAL planes (xy, yz, zx): the
// sphere state ("r is approximately equal when it is a sphere"). Six architrinos,
// per-axis neutral. Unlike the planar hexagon this configuration is NOT rigid --
// inter-binary distances oscillate at 2*omega -- so residuals are cycle-sampled
// (period pi/omega) with the declared caustic regulator. By the harmonic-matching
// principle (spec Section 18) the oscillating wake content is unmatchable by
// circular kinematics UNLESS the three-fold orthogonal symmetry cancels it; that
// cancellation question is exactly what this evaluator measures. Equal radii also
// remove the planar family's radial-support mismatch by symmetry.
//
// Same unified closure metric; same signed-normal convention; partner channel.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "sphere_state_shell_braid_evaluator.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

// Orthogonal-plane basis per binary: plane a spanned by (u_a, w_a).
const PLANES = [
  { u: [1, 0, 0], w: [0, 1, 0] }, // xy
  { u: [0, 1, 0], w: [0, 0, 1] }, // yz
  { u: [0, 0, 1], w: [1, 0, 0] }, // zx
];

export function buildBraid({ R = 1, beta = 0.9, phases = [0, 0, 0] } = {}) {
  const omega = (beta * cf) / R;
  const sites = [];
  for (let a = 0; a < 3; a++) {
    sites.push({ plane: a, R, phi0: phases[a], pol: +1, sgn: +1 });
    sites.push({ plane: a, R, phi0: phases[a], pol: -1, sgn: -1 }); // antipode
  }
  return { omega, period: Math.PI / omega, sites, beta };
}

function pos(s, t, w) {
  const th = w * t + s.phi0, P = PLANES[s.plane];
  const c = s.R * Math.cos(th) * s.sgn, sn = s.R * Math.sin(th) * s.sgn;
  return [c * P.u[0] + sn * P.w[0], c * P.u[1] + sn * P.w[1], c * P.u[2] + sn * P.w[2]];
}
function vel(s, t, w) {
  const th = w * t + s.phi0, P = PLANES[s.plane];
  const c = -s.R * w * Math.sin(th) * s.sgn, sn = s.R * w * Math.cos(th) * s.sgn;
  return [c * P.u[0] + sn * P.w[0], c * P.u[1] + sn * P.w[1], c * P.u[2] + sn * P.w[2]];
}
function kinAccel(s, t, w) { const p = pos(s, t, w); return [-w * w * p[0], -w * w * p[1], -w * w * p[2]]; }

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

export function wakeAccel(braid, recvIdx, T, { soft = 0.02 } = {}) {
  const recv = braid.sites[recvIdx];
  const Xi = pos(recv, T, braid.omega), vi = vel(recv, T, braid.omega);
  let av = [0, 0, 0], minAbsDs = Infinity;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = 2 * braid.sites[0].R + 0.3;
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

export function cycleResiduals(cfg = {}, { Nt = 12, soft = 0.02 } = {}) {
  const braid = buildBraid(cfg);
  const recvs = [0, 2, 4]; // + site of each binary
  const samples = []; let minAbsDs = Infinity;
  for (let k = 0; k < Nt; k++) {
    const T = (k / Nt) * braid.period;
    for (const i of recvs) {
      const s = braid.sites[i];
      const kin = kinAccel(s, T, braid.omega);
      const wk = wakeAccel(braid, i, T, { soft });
      minAbsDs = Math.min(minAbsDs, wk.minAbsDs);
      samples.push({ plane: s.plane, kin, wake: wk.a });
    }
  }
  let num = 0, den = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { num += s.kin[c] * s.wake[c]; den += s.wake[c] ** 2; }
  const kappaStar = num / den;
  const per = [0, 1, 2].map((pl) => {
    let res = 0, ref = 0;
    for (const s of samples) {
      if (s.plane !== pl) continue;
      for (let c = 0; c < 3; c++) { res += (s.kin[c] - kappaStar * s.wake[c]) ** 2; ref += s.kin[c] ** 2; }
    }
    return Math.sqrt(res / ref);
  });
  let rA = 0, fA = 0;
  for (const s of samples) for (let c = 0; c < 3; c++) { rA += (s.kin[c] - kappaStar * s.wake[c]) ** 2; fA += s.kin[c] ** 2; }
  return { kappaStar, relResidualPerBinary: per, globalRelResidual: Math.sqrt(rA / fA), minAbsDs };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    sample: cycleResiduals({ beta: 0.9, phases: [0, 0, 0] }),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
