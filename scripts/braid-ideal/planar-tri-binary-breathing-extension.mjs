// Non-circular extension of the iso-frequency planar tri-binary evaluator.
//
// Closure goal (2026-07-08, spec Section 16): relax circularity -- give the inner
// and outer layers a lowest-Fourier radius modulation and test whether orbit SHAPE
// can absorb the radial-support mismatch found at the tangential-closure curve
// (suppR = 10.9/2.0/0.3 for I/M/O at the circular net-torque zero).
//
// Ansatz: common angular rate omega (iso-frequency preserved); layer a's sites at
//   phi(t) = omega t + theta_site,
//   r(t)   = R_a (1 + e_a cos(2 phi + psi_a)),      (m = 2 "centered ellipse" mode)
//   x(t)   = r (cos phi, sin phi).
// The m=2 mode keeps each axis an exact antipodal pair (r is pi-periodic in phi),
// preserving per-axis neutrality and central symmetry, so + sites remain
// representative. The middle layer stays CIRCULAR (e_M = 0) so the rail beta_M = 1
// is exact (the clicker sits clean on the hinge). Breathing breaks rigidity: the
// relative geometry is periodic with period pi/omega, so residuals are evaluated
// around the cycle, not at one instant.
//
// Closure metric: a candidate row exists iff ONE global coupling kappa makes the
// wake acceleration match the kinematic acceleration of the prescribed path at
// every cycle phase on every layer. We fit kappa* by least squares over all
// samples and report the per-layer relative residual
//   rho_a = sqrt( sum |a_kin - kappa* a_wake|^2 / sum |a_kin|^2 ).
// The circular baseline (e = 0) reproduces the Section 16 mismatch in this metric.
//
// Signed-normal convention throughout (audited): rhat = source->receiver at the
// causal root, D_s at emission, D_T at reception, m = D_T/D_s. Partner channel
// only; self-hit contributions are d0-dependent and excluded as before.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "planar_tri_binary_breathing_extension.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-archive/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

export function buildBraid({ qI = 0.3, qO = 2.09, betaM = 1.0, eI = 0, psiI = 0, eO = 0, psiO = 0, phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = {}) {
  const RM = 1, omega = (betaM * cf) / RM;
  const layers = [
    { name: "I", R: qI * RM, e: eI, psi: psiI, phi0: phases[0] },
    { name: "M", R: RM, e: 0, psi: 0, phi0: phases[1] },
    { name: "O", R: qO * RM, e: eO, psi: psiO, phi0: phases[2] },
  ];
  const sites = [];
  for (const L of layers) {
    sites.push({ ...L, th: L.phi0, pol: +1 });
    sites.push({ ...L, th: L.phi0 + Math.PI, pol: -1 });
  }
  return { omega, sites };
}

function pos(s, t, omega) {
  const phi = omega * t + s.th;
  const r = s.R * (1 + s.e * Math.cos(2 * phi + s.psi));
  return [r * Math.cos(phi), r * Math.sin(phi)];
}
function vel(s, t, omega) {
  const phi = omega * t + s.th;
  const r = s.R * (1 + s.e * Math.cos(2 * phi + s.psi));
  const rdot = -2 * omega * s.R * s.e * Math.sin(2 * phi + s.psi);
  const c = Math.cos(phi), sn = Math.sin(phi);
  return [rdot * c - r * omega * sn, rdot * sn + r * omega * c];
}
function kinAccel(s, t, omega) {
  const h = 1e-5 * (2 * Math.PI / omega);
  const a = pos(s, t + h, omega), b = pos(s, t, omega), d = pos(s, t - h, omega);
  return [(a[0] - 2 * b[0] + d[0]) / (h * h), (a[1] - 2 * b[1] + d[1]) / (h * h)];
}

function causalRoots(Xi, src, T, omega, dmax, N = 4000, minDelay = 1e-9) {
  const g = (te) => { const p = pos(src, te, omega); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1]) - cf * (T - te); };
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

// Wake acceleration vector on one receiver at time T (partner channel, signed).
export function wakeAccel(braid, recvIdx, T) {
  const recv = braid.sites[recvIdx];
  const Xi = pos(recv, T, braid.omega), vi = vel(recv, T, braid.omega);
  let ax = 0, ay = 0, minAbsDs = Infinity;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = recv.R * (1 + Math.abs(recv.e)) + src.R * (1 + Math.abs(src.e)) + 0.2;
    for (const te of causalRoots(Xi, src, T, braid.omega, dmax)) {
      const p = pos(src, te, braid.omega);
      const dx = Xi[0] - p[0], dy = Xi[1] - p[1], rr = Math.hypot(dx, dy);
      if (rr < 1e-9) continue;
      const rh = [dx / rr, dy / rr], vs = vel(src, te, braid.omega);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      if (Math.abs(Ds) < 1e-9) continue;
      const w = (recv.pol * src.pol) * (Dt / Ds) / (rr * rr);
      ax += w * rh[0]; ay += w * rh[1];
    }
  }
  return { ax, ay, minAbsDs };
}

// Cycle-sampled closure residuals with a single global least-squares kappa*.
export function cycleResiduals(cfg = {}, { Nt = 12 } = {}) {
  const braid = buildBraid(cfg);
  const period = Math.PI / braid.omega; // m=2 modulation period
  const recvs = [0, 2, 4];
  const samples = []; // {layer, kin:[..], wake:[..]}
  for (let k = 0; k < Nt; k++) {
    const T = (k / Nt) * period;
    for (const i of recvs) {
      const s = braid.sites[i];
      const kin = kinAccel(s, T, braid.omega);
      const wk = wakeAccel(braid, i, T);
      samples.push({ layer: s.name, kin, wake: [wk.ax, wk.ay] });
    }
  }
  // kappa* = argmin sum |kin - kappa*wake|^2  =>  kappa* = <kin.wake>/<wake.wake>
  let num = 0, den = 0;
  for (const s of samples) { num += s.kin[0] * s.wake[0] + s.kin[1] * s.wake[1]; den += s.wake[0] ** 2 + s.wake[1] ** 2; }
  const kappaStar = num / den;
  const per = {};
  for (const L of ["I", "M", "O"]) {
    let res = 0, ref = 0;
    for (const s of samples) {
      if (s.layer !== L) continue;
      res += (s.kin[0] - kappaStar * s.wake[0]) ** 2 + (s.kin[1] - kappaStar * s.wake[1]) ** 2;
      ref += s.kin[0] ** 2 + s.kin[1] ** 2;
    }
    per[L] = Math.sqrt(res / ref);
  }
  let resAll = 0, refAll = 0;
  for (const s of samples) {
    resAll += (s.kin[0] - kappaStar * s.wake[0]) ** 2 + (s.kin[1] - kappaStar * s.wake[1]) ** 2;
    refAll += s.kin[0] ** 2 + s.kin[1] ** 2;
  }
  return { kappaStar, relResidual: per, globalRelResidual: Math.sqrt(resAll / refAll) };
}

export function diagnosticReport() {
  return {
    schema: SCHEMA, specPacketRef: SPEC_PACKET_REF,
    circularBaseline: cycleResiduals({ eI: 0, eO: 0 }),
    ...FAIL_CLOSED,
  };
}

function isMain() { return process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]; }
if (isMain()) { const pretty = process.argv.includes("--pretty"); process.stdout.write(JSON.stringify(diagnosticReport(), null, pretty ? 2 : 0) + "\n"); }
