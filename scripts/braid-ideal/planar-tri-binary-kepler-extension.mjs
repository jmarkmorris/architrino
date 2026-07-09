// Kepler-mode extension of the iso-frequency planar tri-binary evaluator.
//
// Autonomous exploration (2026-07-08, operator: "Kepler also sounds interesting
// because nature likes to echo itself at different scales"). The m=2 radius mode
// at CONSTANT angular rate was rejected (spec Section 17). This script adds the
// missing conjugate freedom: equal-area speed modulation. Each non-circular layer
// follows r(phi) = R(1 + e cos(2 phi + psi)) with dphi/dt = C / r^2 (Kepler's
// second law, angular momentum constant along the orbit), C normalized so every
// layer keeps the SAME orbital period 2 pi / omega (iso-frequency preserved).
// The middle layer stays circular: the rail beta_M = 1 is exact.
//
// Unlike the constant-rate mode, equal-area modulation makes the layer's speed
// vary around the cycle and makes the inter-axis angles oscillate, so psi is a
// REAL knob here (the gauge argument of Section 17 Result 8 does not apply).
//
// Same unified closure metric: one global least-squares kappa* over all layers,
// both components, full cycle; per-layer relative residuals rho_a.
//
// NOT evidence; names no retained branch; authorizes no acceptance. Fail-closed.

import { fileURLToPath } from "node:url";

export const SCHEMA = "planar_tri_binary_kepler_extension.v0";
export const SPEC_PACKET_REF = "reference/priorities/braid-ideal/fold-crossing-chart-spec.md";
export const FAIL_CLOSED = Object.freeze({
  retainedBranchClaim: false, acceptedSameLevelBranchClaim: false, retainedBranch: null,
  scoreMovement: "no_score_increase", acceptedSeedPathCertificate: false,
  authority: "priority_only_prescribed_worldline_evaluator_not_native_solver_not_accepted_evidence",
});

const cf = 1;

function rOf(L, phi) { return L.R * (1 + L.e * Math.cos(2 * phi + L.psi)); }
function rP(L, phi) { return -2 * L.R * L.e * Math.sin(2 * phi + L.psi); }
function rPP(L, phi) { return -4 * L.R * L.e * Math.cos(2 * phi + L.psi); }

// Precompute phi(t) for one layer over one period by RK4 on dphi/dt = C/r^2.
function phiTable(L, omega, N = 4096) {
  const T = (2 * Math.PI) / omega;
  let I = 0; const M = 4096;
  for (let k = 0; k < M; k++) { const ph = (2 * Math.PI * k) / M; I += rOf(L, ph) ** 2 * ((2 * Math.PI) / M); }
  const C = I / T; // period normalization: T = (1/C) Int r^2 dphi
  const dt = T / N; const tab = new Float64Array(N + 1);
  let phi = L.phi0;
  tab[0] = phi;
  const f = (ph) => C / rOf(L, ph) ** 2;
  for (let k = 0; k < N; k++) {
    const k1 = f(phi), k2 = f(phi + 0.5 * dt * k1), k3 = f(phi + 0.5 * dt * k2), k4 = f(phi + dt * k3);
    phi += (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    tab[k + 1] = phi;
  }
  return { tab, T, N, C };
}
function phiAt(tbl, t) {
  const { tab, T, N } = tbl;
  let u = t / T; const wind = Math.floor(u); u -= wind;
  const x = u * N, i = Math.min(N - 1, Math.floor(x)), f = x - i;
  return tab[i] + f * (tab[i + 1] - tab[i]) + wind * 2 * Math.PI;
}

export function buildBraid({ qI = 0.5, qO = 1.6, betaM = 1.0, eI = 0, psiI = 0, eO = 0, psiO = 0, phases = [0, (2 * Math.PI) / 3, (4 * Math.PI) / 3] } = {}) {
  const RM = 1, omega = (betaM * cf) / RM;
  const layers = [
    { name: "I", R: qI * RM, e: eI, psi: psiI, phi0: phases[0] },
    { name: "M", R: RM, e: 0, psi: 0, phi0: phases[1] },
    { name: "O", R: qO * RM, e: eO, psi: psiO, phi0: phases[2] },
  ];
  const sites = [];
  for (const L of layers) {
    const plus = { ...L, tbl: phiTable(L, omega), pol: +1 };
    // antipode: r is pi-periodic in phi, so the antipodal solution is exactly
    // the + solution shifted by pi
    const minus = { ...L, tbl: null, pol: -1, antipodeOf: plus };
    sites.push(plus, minus);
  }
  return { omega, period: (2 * Math.PI) / omega, sites };
}

function sitePhi(s, t) { return s.antipodeOf ? phiAt(s.antipodeOf.tbl, t) + Math.PI : phiAt(s.tbl, t); }
function siteTbl(s) { return s.antipodeOf ? s.antipodeOf.tbl : s.tbl; }
function sitePos(s, t) { const phi = sitePhi(s, t); const r = rOf(s, phi); return [r * Math.cos(phi), r * Math.sin(phi)]; }
function siteVel(s, t) {
  const phi = sitePhi(s, t); const tbl = siteTbl(s);
  const r = rOf(s, phi), phid = tbl.C / (r * r), rp = rP(s, phi);
  const c = Math.cos(phi), sn = Math.sin(phi);
  return [rp * phid * c - r * phid * sn, rp * phid * sn + r * phid * c];
}
function siteKinAccel(s, t) {
  const phi = sitePhi(s, t); const tbl = siteTbl(s);
  const r = rOf(s, phi), phid = tbl.C / (r * r);
  const rp = rP(s, phi), rpp = rPP(s, phi);
  const phidd = -2 * tbl.C * rp * phid / (r * r * r);
  const aRad = rpp * phid * phid + rp * phidd - r * phid * phid;
  const aTan = r * phidd + 2 * rp * phid * phid;
  const c = Math.cos(phi), sn = Math.sin(phi);
  return [aRad * c - aTan * sn, aRad * sn + aTan * c];
}

function causalRoots(Xi, src, T, dmax, N = 4000, minDelay = 1e-9) {
  const g = (te) => { const p = sitePos(src, te); return Math.hypot(Xi[0] - p[0], Xi[1] - p[1]) - cf * (T - te); };
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
  const Xi = sitePos(recv, T), vi = siteVel(recv, T);
  let ax = 0, ay = 0, minAbsDs = Infinity;
  for (let j = 0; j < braid.sites.length; j++) {
    if (j === recvIdx) continue;
    const src = braid.sites[j];
    const dmax = recv.R * (1 + Math.abs(recv.e)) + src.R * (1 + Math.abs(src.e)) + 0.2;
    for (const te of causalRoots(Xi, src, T, dmax)) {
      const p = sitePos(src, te);
      const dx = Xi[0] - p[0], dy = Xi[1] - p[1], rr = Math.hypot(dx, dy);
      if (rr < 1e-9) continue;
      const rh = [dx / rr, dy / rr], vs = siteVel(src, te);
      const Ds = cf - (vs[0] * rh[0] + vs[1] * rh[1]);
      const Dt = cf - (vi[0] * rh[0] + vi[1] * rh[1]);
      minAbsDs = Math.min(minAbsDs, Math.abs(Ds));
      const m = (Dt * Ds) / (Ds * Ds + soft * soft);
      const w = (recv.pol * src.pol) * m / (rr * rr);
      ax += w * rh[0]; ay += w * rh[1];
    }
  }
  return { ax, ay, minAbsDs };
}

export function cycleResiduals(cfg = {}, { Nt = 12, soft = 0.02 } = {}) {
  const braid = buildBraid(cfg);
  const recvs = [0, 2, 4];
  const samples = []; let minAbsDs = Infinity;
  for (let k = 0; k < Nt; k++) {
    const T = (k / Nt) * braid.period;
    for (const i of recvs) {
      const s = braid.sites[i];
      const kin = siteKinAccel(s, T);
      const wk = wakeAccel(braid, i, T, { soft });
      minAbsDs = Math.min(minAbsDs, wk.minAbsDs);
      samples.push({ layer: s.name, kin, wake: [wk.ax, wk.ay] });
    }
  }
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
  let rA = 0, fA = 0;
  for (const s of samples) { rA += (s.kin[0] - kappaStar * s.wake[0]) ** 2 + (s.kin[1] - kappaStar * s.wake[1]) ** 2; fA += s.kin[0] ** 2 + s.kin[1] ** 2; }
  return { kappaStar, relResidual: per, globalRelResidual: Math.sqrt(rA / fA), minAbsDs };
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
