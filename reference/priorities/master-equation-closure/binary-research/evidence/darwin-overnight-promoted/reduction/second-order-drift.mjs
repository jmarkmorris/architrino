#!/usr/bin/env node
// darwin-overnight binary extension (lens emmy-noether), 2026-10-05, round 2.
// Second-order drift coupling of the relative motion for the frozen Darwin-inspired
// functional (Section 10 box, c_f = K = 1, opposite polarity), isolated pair.
//
// Exact reduction used here (derived in Section 13 of the investigation file):
//   L = U^T (I+M) U + (1/4) rhodot^T (I-M) rhodot + 1/r ,  P = 2 (I+M) U  constant,
//   Routhian at fixed P:  Rth = (1/4) rhodot^T (I-M) rhodot + 1/r - W(rho),
//   W(rho) = (1/4) P^T B(rho) P,  B = (I+M)^{-1} = beta1 e e^T + beta2 (I - e e^T),
//   beta1 = r/(r-1), beta2 = 2r/(2r-1)   (sigma = -1).
// Part A: closed-form averaged coefficients (secular shift, 2theta response, period, tilt rate).
// Part B: direct integration of the 6-dimensional reduced Routhian system (RK4, fixed step) for
//         DG-100 and DT-100, with a check of the reduced field against the full 12-dimensional
//         solve H A = G imported from the predictions script, and the P = 0 tilted baseline.
// Run: node second-order-drift.mjs [periods]   (prints JSON)

import { hessianH, vectorG, solve, eccentric } from '../../../reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-reduction-predictions.mjs';

const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scl = (s, a) => [s * a[0], s * a[1], s * a[2]];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a) => Math.sqrt(dot(a, a));

const beta1 = (r) => r / (r - 1), beta2 = (r) => 2 * r / (2 * r - 1);
const dbeta2 = (r) => -2 / ((2 * r - 1) ** 2);
const b12 = (r) => r / ((r - 1) * (2 * r - 1));                 // beta1 - beta2
const db12 = (r) => (1 - 2 * r * r) / (((r - 1) * (2 * r - 1)) ** 2); // d/dr (beta1 - beta2)
const a_of = (r) => 1 + 1 / r, b_of = (r) => 1 + 1 / (2 * r);

// ---------- reduced Routhian field: state [rho(3), rhodot(3)], parameter P ----------
export function reducedAccel(rho, rhodot, P) {
  const r = norm(rho), e = scl(1 / r, rho); const rdot = dot(e, rhodot); const w = sub(rhodot, scl(rdot, e));
  // N = I - M = I + (1/(2r))(I + e e^T);  (1/2) N rhoddot = -(1/2) Ndot rhodot + (1/4) grad(rhodot^T N rhodot) - e/r^2 - grad W
  const Ndot_v = add(scl(-rdot / (2 * r * r), add(rhodot, scl(rdot, e))), scl(1 / (2 * r * r), add(scl(rdot, w), scl(dot(w, w), e))));
  const gradQ = add(scl(-(dot(rhodot, rhodot) + rdot * rdot) / (2 * r * r), e), scl(rdot / (r * r), w));
  const Pe = dot(P, e), PP = dot(P, P);
  const gradW = add(scl(0.25 * dbeta2(r) * PP + 0.25 * db12(r) * Pe * Pe, e), scl(0.5 * b12(r) * Pe / r, sub(P, scl(Pe, e))));
  const rhs = sub(sub(add(scl(-0.5, Ndot_v), scl(0.25, gradQ)), scl(1 / (r * r), e)), gradW);
  // solve (1/2) N x = rhs with N = a e e^T + b (I - e e^T)
  const a = a_of(r), b = b_of(r); const re = dot(rhs, e);
  return add(scl(2 * re / a, e), scl(2 / b, sub(rhs, scl(re, e))));
}

function rk4(rho, rhodot, P, h, nSteps, onSample) {
  let x = [...rho, ...rhodot]; let t = 0;
  const f = (s) => { const acc = reducedAccel(s.slice(0, 3), s.slice(3), P); return [s[3], s[4], s[5], ...acc]; };
  const axpy = (s, k, c) => s.map((v, i) => v + c * k[i]);
  onSample(t, x);
  for (let n = 0; n < nSteps; n++) {
    const k1 = f(x), k2 = f(axpy(x, k1, h / 2)), k3 = f(axpy(x, k2, h / 2)), k4 = f(axpy(x, k3, h));
    x = x.map((v, i) => v + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); t = (n + 1) * h;
    onSample(t, x);
  }
  return x;
}

// extrema of r(t) from three consecutive samples (parabolic interpolation); tilt = angle(L, z)
function runCase(rho0, rhodot0, P, periods, period, h = 0.5) {
  const nSteps = Math.round(periods * period / h); const hh = periods * period / nSteps;
  const minima = [], maxima = []; let prev2 = null, prev1 = null; let tiltMin = Infinity, tiltMax = -Infinity, rMin = Infinity, rMax = -Infinity;
  let tiltFirst = null, tiltLast = null;
  const onSample = (t, s) => {
    const rho = s.slice(0, 3), rd = s.slice(3); const r = norm(rho); const rdot = dot(rho, rd) / r;
    const L = cross(rho, rd); const tilt = Math.acos(L[2] / norm(L));
    if (tiltFirst === null) tiltFirst = tilt; tiltLast = tilt;
    tiltMin = Math.min(tiltMin, tilt); tiltMax = Math.max(tiltMax, tilt); rMin = Math.min(rMin, r); rMax = Math.max(rMax, r);
    const cur = { t, r, rdot };
    if (prev2 && prev1) {
      if (prev1.r <= prev2.r && prev1.r < cur.r && t > hh) { minima.push(parab(prev2, prev1, cur)); }
      if (prev1.r >= prev2.r && prev1.r > cur.r) { maxima.push(parab(prev2, prev1, cur)); }
    }
    prev2 = prev1; prev1 = cur;
  };
  const parab = (p0, p1, p2) => { // vertex of parabola through three equally spaced points
    const d = (p0.r - 2 * p1.r + p2.r); if (d === 0) return { t: p1.t, r: p1.r };
    const dt = 0.5 * (p0.r - p2.r) / d * hh; const r = p1.r - 0.125 * (p0.r - p2.r) ** 2 / d; return { t: p1.t + dt, r };
  };
  const final = rk4(rho0, rhodot0, P, hh, nSteps, onSample);
  const spacing = minima.length > 1 ? (minima[minima.length - 1].t - minima[0].t) / (minima.length - 1) : null;
  return { h: hh, steps: nSteps, rMin, rMax, minima, maxima, meanMinimaSpacing: spacing, tilt: { first: tiltFirst, last: tiltLast, min: tiltMin, max: tiltMax }, final };
}

// ---------- preparations ----------
const r0 = 100, u = 0.07062245515464487; // DC-100 circle, exact u_c(100) as preregistered
const thdot0 = Math.sqrt(2 / (r0 * r0 * (r0 + 0.25))); const P0 = 2 * Math.PI / thdot0;
const wr2 = 16 / ((4 * r0 + 1) * (2 * r0 + 1) * (r0 + 1)), wr = Math.sqrt(wr2); const Tr = 2 * Math.PI / wr; const dphi = 2 * Math.PI * (thdot0 / wr - 1);
const Mfull = (rho) => { const r = norm(rho), e = scl(1 / r, rho); return [0, 1, 2].map((i) => [0, 1, 2].map((j) => -(1 / (2 * r)) * ((i === j ? 1 : 0) + e[i] * e[j]))); };
const matvec = (A, v) => A.map((row) => dot(row, v));
function prep(V1, V2) {
  const X1 = [r0 / 2, 0, 0], X2 = [-r0 / 2, 0, 0]; const rho = sub(X1, X2); const Vsum = add(V1, V2);
  const IpM = Mfull(rho).map((row, i) => row.map((v, j) => v + (i === j ? 1 : 0)));
  const P = matvec(IpM, Vsum); return { X: [X1, X2], V: [V1, V2], rho, rhodot: sub(V1, V2), P, U0: scl(0.5, Vsum) };
}
const DG = prep([0.005, u, 0.002], [0.005, -u, 0]);
const DT = prep([0, 1.01 * u, 0], [0, -u, 0]);

// ---------- check of the reduced field against the full 12-dimensional solve ----------
function fullRelativeAccel(X, V) {
  const sigma = () => -1; const A = solve(hessianH(X, sigma), vectorG(X, V, sigma)); return sub(A.slice(0, 3), A.slice(3, 6));
}
function fieldCheck() {
  let worst = 0; const rng = (s) => () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296 - 0.5; };
  const rnd = rng(12345);
  for (let k = 0; k < 20; k++) {
    const X1 = [60 + 20 * rnd(), 20 * rnd(), 10 * rnd()], X2 = [-50 + 20 * rnd(), 20 * rnd(), 10 * rnd()];
    const V1 = [0.02 * rnd(), 0.08 + 0.02 * rnd(), 0.01 * rnd()], V2 = [0.02 * rnd(), -0.07 + 0.02 * rnd(), 0.01 * rnd()];
    const rho = sub(X1, X2); const IpM = Mfull(rho).map((row, i) => row.map((v, j) => v + (i === j ? 1 : 0))); const P = matvec(IpM, add(V1, V2));
    const red = reducedAccel(rho, sub(V1, V2), P); const full = fullRelativeAccel([X1, X2], [V1, V2]);
    worst = Math.max(worst, norm(sub(red, full)) / norm(full));
  }
  return worst;
}

// ---------- Part A: closed-form averaged coefficients ----------
function closedForms(P, rhodot0) {
  const L0 = cross([r0, 0, 0], scl(b_of(r0), rhodot0)); const n = scl(1 / norm(L0), L0); // unit normal of the initial relative plane (relative angular momentum (1/2) rho x (I-M) rhodot)
  const ell = 0.5 * norm(L0);
  const Pn = dot(P, n); const PP = dot(P, P); const Ppar2 = PP - Pn * Pn;
  const Ueff2 = 8 / (r0 * (4 * r0 + 1) * (2 * r0 + 1)); // U_eff''(r0) at ell0
  const Wbar1 = 0.25 * dbeta2(r0) * PP + 0.125 * db12(r0) * Ppar2; // d/dr of the averaged drift potential
  const drSec = -Wbar1 / Ueff2;
  // 2theta response: (1/2) a x'' + Ueff'' x = F cos(2 thdot0 t + psi), F = -(Ppar^2/8)[(beta1-beta2)(4r0+1)/(r0(2r0+1)) + (beta1-beta2)']
  const F = -(Ppar2 / 8) * (b12(r0) * (4 * r0 + 1) / (r0 * (2 * r0 + 1)) + db12(r0));
  const A2 = F / (Ueff2 - 0.5 * a_of(r0) * 4 * thdot0 * thdot0);
  const lamAmp = -b12(r0) * Ppar2 / (8 * thdot0); // ell modulation amplitude (times cos(2 thdot0 t + psi))
  // radial frequency at the shifted circle: omega_r^2 = 2 U''(r_c)/a(r_c) with U = ell^2/(b r^2) - 1/r + Wbar(r); first-order change
  const Ueff3 = -(8 / (r0 * (4 * r0 + 1) * (2 * r0 + 1))) * (1 / r0 + 4 / (4 * r0 + 1) + 2 / (2 * r0 + 1)); // d/dr of Ueff'' along the fixed-ell family is not this; use numeric derivative below
  const Ueff = (r, l2) => l2 / (b_of(r) * r * r) - 1 / r;
  const l2 = (2 * r0 + 1) ** 2 / (2 * (4 * r0 + 1)); const hh = 1e-3;
  const d2 = (f, x) => (f(x + hh) - 2 * f(x) + f(x - hh)) / (hh * hh);
  const Wbar = (r) => 0.25 * beta2(r) * PP + 0.125 * b12(r) * Ppar2;
  const Upert = (r) => Ueff(r, l2) + Wbar(r);
  // analytic second derivatives (numerical second differences of U ~ 1e-6 are unreliable at 1e-4 relative)
  const Dd = (r) => r * r + r / 2, Dd1 = (r) => 2 * r + 0.5;
  const U2a = (r, l2v) => l2v * (2 * Dd1(r) ** 2 / Dd(r) ** 3 - 2 / Dd(r) ** 2) - 2 / (r ** 3);
  const beta2pp = (r) => 8 / ((2 * r - 1) ** 3);
  const b12pp = (r) => { const D2 = (r - 1) * (2 * r - 1); return (-4 * r * D2 - 2 * (1 - 2 * r * r) * (4 * r - 3)) / (D2 ** 3); };
  const Wbar2 = (r) => 0.25 * beta2pp(r) * PP + 0.125 * b12pp(r) * Ppar2;
  const rc = r0 + drSec; const wr2new = 2 * (U2a(rc, l2) + Wbar2(rc)) / a_of(rc); const wr2old = 2 * U2a(r0, l2) / a_of(r0);
  void d2; void Upert; void Ueff;
  const dTr_rel = -0.5 * (wr2new - wr2old) / wr2old; // relative radial-period shift at fixed ell0 (second order in P)
  // tilt: averaged torque dL/dT = -(1/4)(beta1-beta2)(P.n)(P x n) -> normal precesses about P at rate Omega = (1/4)(beta1-beta2)|P.n||P|/ell
  const Omega = 0.25 * b12(r0) * Math.abs(Pn) * Math.sqrt(PP) / ell;
  const dndt = scl(-0.25 * b12(r0) * Pn / ell, cross(P, n)); // dn/dT (vector)
  const tiltRate = -dndt[2] / Math.sqrt(1 - n[2] * n[2]); // d/dT acos(n_z)
  void Ueff3;
  return { n, ell, Pn, PP, Ppar2, Ueff2, Wbar1, drSec, drSecOverR0U2: drSec / (r0 * PP / 4), F, A2, A2OverR0U2: A2 / (r0 * PP / 4), lamAmp,
    wr2old, wr2new, dTr_rel, dTr: dTr_rel * Tr, Omega, precessionPeriod: 2 * Math.PI / Omega, tiltRate, tiltRatePerRadialPeriod: tiltRate * Tr,
    modulationPeriodRadialPeriods: Math.PI / dphi, modulationPeriodTime: (Math.PI / dphi) * Tr, modulationPeakToPeak: 2 * Math.abs(A2) };
}

// ---------- baseline: P = 0 tilted eccentric (mirror reduced problem) ----------
function baseline(rhodot0) {
  const up = 0.5 * norm(rhodot0); // member speed in the tilted plane
  const ell = (r0 + 0.5) * up; const E = b_of(r0) * up * up - 1 / r0; return { up, ell, E, ...eccentric(E, ell, true) };
}

// ---------- assembled predictions for the recorded quantities (closed forms, first order in P^2) ----------
const g_of = (r) => (2 * r + 1) ** 2 / (2 * (4 * r + 1)), dg_of = (r) => 4 * r * (2 * r + 1) / ((4 * r + 1) ** 2);
function rcOfEll(ell) { let r = 2 * ell * ell; for (let i = 0; i < 60; i++) r -= (g_of(r) - ell * ell) / dg_of(r); return r; }
function assemble(P, rhodot0, cf, base, nMin = 19, nMax = 20) {
  const e0 = [1, 0, 0]; const Pn = cf.Pn; const n = cf.n; const Ppar = sub(P, scl(Pn, n)); const Pparn = norm(Ppar);
  const cosPsi = Pparn > 0 ? 2 * (dot(Ppar, e0) / Pparn) ** 2 - 1 : 1; // cos 2(theta(0) - phi_P)
  const lam0 = cf.lamAmp * cosPsi; // initial ell minus mean ell
  const drEll = -2 * cf.ell * lam0 / dg_of(r0); // circle-radius shift from the mean ell
  const drCentre = cf.drSec + drEll;
  const A0 = -(base.apocentre - base.pericentre) / 2; const A = A0 - drCentre - cf.A2 * cosPsi; // first-order radial amplitude (negative: launch at pericentre)
  const dphiE = base.apsidalAdvancePerRadialPeriod; // advance per radial period of the baseline eccentric orbit
  const psi = Math.acos(Math.max(-1, Math.min(1, cosPsi)));
  const peri = [], apo = [], dt = [];
  for (let k = 0; k <= nMax; k++) {
    peri.push(base.pericentre + cf.A2 * (Math.cos(2 * k * dphiE + psi) - cosPsi));
    apo.push(base.apocentre + 2 * drCentre + cf.A2 * (cosPsi + Math.cos((2 * k + 1) * dphiE + psi)));
    dt.push(2 * thdot0 * cf.A2 * Math.sin(2 * k * dphiE + psi) / (Math.abs(A) * wr2));
  }
  // radial period of the mean motion: new circle for (mean ell, averaged potential), omega_r^2 = 2 U''/a there
  const ellBar = cf.ell - lam0; const PP = cf.PP, Ppar2 = cf.Ppar2;
  const Wbar = (r) => 0.25 * beta2(r) * PP + 0.125 * b12(r) * Ppar2;
  const U = (r, l) => l * l / (b_of(r) * r * r) - 1 / r;
  // analytic derivatives (a numerical second difference of U ~ 1e-6 loses five digits; see Section 13)
  const Dd = (r) => r * r + r / 2, Dd1 = (r) => 2 * r + 0.5, Dd2 = 2;
  const beta2pp = (r) => 8 / ((2 * r - 1) ** 3);
  const b12pp = (r) => { const D2 = (r - 1) * (2 * r - 1); return (-4 * r * D2 - 2 * (1 - 2 * r * r) * (4 * r - 3)) / (D2 ** 3); };
  const Wbar1 = (r) => 0.25 * dbeta2(r) * PP + 0.125 * db12(r) * Ppar2, Wbar2 = (r) => 0.25 * beta2pp(r) * PP + 0.125 * b12pp(r) * Ppar2;
  const U1 = (r, l, w) => -l * l * Dd1(r) / Dd(r) ** 2 + 1 / (r * r) + (w ? Wbar1(r) : 0);
  const U2 = (r, l, w) => l * l * (2 * Dd1(r) ** 2 / Dd(r) ** 3 - Dd2 / Dd(r) ** 2) - 2 / (r ** 3) + (w ? Wbar2(r) : 0);
  let rc = rcOfEll(ellBar); for (let i = 0; i < 40; i++) rc -= U1(rc, ellBar, true) / U2(rc, ellBar, true);
  const rc0 = rcOfEll(cf.ell);
  const wr2Pert = 2 * U2(rc, ellBar, true) / a_of(rc), wr2Base = 2 * U2(rc0, cf.ell, false) / a_of(rc0);
  void U;
  const TrPert = base.radialPeriod * Math.sqrt(wr2Base / wr2Pert); // radial period of the perturbed mean motion (baseline eccentric period scaled)
  const meanSpacing = TrPert + (dt[nMin] - dt[1]) / (nMin - 1);
  return { cosPsi, lam0, drEll, drCentre, drCentreOverR0U2: drCentre / (r0 * PP / 4), A, rc0, rcPert: rc, TrPert, dTrSecular: TrPert - base.radialPeriod,
    minimaTimeShiftLast: dt[nMin], predictedMeanMinimaSpacing: meanSpacing, pericentres: peri.slice(0, nMin + 1), apocentres: apo.slice(0, nMax),
    firstApocentre: apo[0], lastPericentre: peri[nMin], lastApocentre: apo[nMax - 1] };
}
// KAM-type isoenergetic nondegeneracy at fixed ell: d(omega_r/thetadot)/dE = -(1/(2 pi)) d(Delta phi)/dE (ratio = 2 pi/(2 pi + Delta phi))
function kamDerivative(ell) {
  const rc = rcOfEll(ell); const E0 = -2 / (4 * rc + 1); const dphi0 = 2 * Math.PI * (Math.sqrt((1 + 1 / (2 * rc)) * (1 + 1 / rc)) - 1);
  const pts = [1e-6, 4e-6, 1.6e-5].map((f) => { const E = E0 * (1 - f); const ec = eccentric(E, ell, true); return { dE: E - E0, dphi: ec.apsidalAdvancePerRadialPeriod - dphi0, ecc: (ec.apocentre - ec.pericentre) / (ec.apocentre + ec.pericentre) }; });
  return { rc, E0, dphi0, slopes: pts.map((p) => ({ dE: p.dE, ecc: p.ecc, dDphi_dE: p.dphi / p.dE, dRatio_dE: -(p.dphi / p.dE) / (2 * Math.PI) })) };
}
// amended-potential Hessian at the circle with normal parallel to P (relative equilibrium of the Routhian), latitude chi
function amendedHessian(PPabs2, rc) {
  // V(r,chi) = ellP^2/(b r^2 cos^2 chi) - 1/r + (1/4) beta2 |P|^2 + (1/4)(beta1-beta2)|P|^2 sin^2 chi ; ellP fixed by V_r(rc,0)=0
  const D = (r) => b_of(r) * r * r; const dD = (r) => 2 * r + 0.5;
  const ellP2 = (1 / (rc * rc) - 0.25 * dbeta2(rc) * PPabs2) * D(rc) ** 2 / dD(rc);
  const V = (r) => ellP2 / D(r) - 1 / r + 0.25 * beta2(r) * PPabs2;
  const h = 1e-3; const Vrr = (V(rc + h) - 2 * V(rc) + V(rc - h)) / (h * h);
  const Vchichi = 2 * ellP2 / D(rc) + 0.5 * b12(rc) * PPabs2; // d^2/dchi^2 at chi = 0; cross term vanishes by chi -> -chi
  return { ellP2, Vrr, Vchichi, positiveDefinite: Vrr > 0 && Vchichi > 0 };
}

const periods = Number(process.argv[2] || 20);
const out = { meta: { worker: 'darwin-overnight binary extension', lens: 'emmy-noether', law: 'Section 10 box, c_f=K=1, opposite polarity', date: '2026-10-05' },
  circle: { r0, u, thdot0, P0, wr, Tr, dphi } };
out.fieldCheck = { maxRelDiscrepancyReducedVsFull: fieldCheck(), note: 'reduced Routhian field against the full 12-dimensional H A = G solve at 20 random states (same frozen law; a check of the reduction, not independent evidence)' };
out.DG100 = { preparation: { V1: DG.V[0], V2: DG.V[1], P: DG.P, U0: DG.U0, rhodot0: DG.rhodot }, closedForms: closedForms(DG.P, DG.rhodot), baselineP0: baseline(DG.rhodot) };
out.DT100 = { preparation: { V1: DT.V[0], V2: DT.V[1], P: DT.P, U0: DT.U0, rhodot0: DT.rhodot }, closedForms: closedForms(DT.P, DT.rhodot), baselineP0: baseline(DT.rhodot) };
out.DG100.assembled = assemble(DG.P, DG.rhodot, out.DG100.closedForms, out.DG100.baselineP0);
out.DT100.assembled = assemble(DT.P, DT.rhodot, out.DT100.closedForms, out.DT100.baselineP0);
out.DG100.measured = { setting: 'dp54-rtol1e-10 (C: rtol1e-12)', rMin: [99.9997596622744, 99.99975949397783], rMax: [100.04718038761162, 100.04718038839601], firstApocentre: 100.04718038761162, lastPericentre: 99.9997596622744, lastApocentre: 100.04692566875391, meanMinimaSpacing: (85196.16373426293 - 4484.565216926726) / 18, tilt: [0.01385, 0.01416], centreMeanVelocity: [0.00498742, 4e-8, 0.00099999934] };
out.DT100.measured = { setting: 'dp54-rtol1e-10', rMin: 100.0000000074, rMax: 102.04062950465118, firstApocentre: 102.04062674512406, lastApocentre: 102.04062950465118, meanMinimaSpacing: (86452.86169745483 - 4550.150582003936) / 18 };
out.kam = { r0_100: kamDerivative(Math.sqrt(g_of(100))), DGell: kamDerivative(out.DG100.closedForms.ell) };
out.amendedHessian = { atRc100_PDG: amendedHessian(out.DG100.closedForms.PP, 100), atRc100_P0p1: amendedHessian(0.01, 100), atRc20_P0p1: amendedHessian(0.01, 20) };
if (!process.env.NO_INTEGRATE) {
  out.DG100.reducedRun = runCase(DG.rho, DG.rhodot, DG.P, periods, P0);
  out.DG100.reducedRunP0 = runCase(DG.rho, DG.rhodot, [0, 0, 0], periods, P0);
  out.DT100.reducedRun = runCase(DT.rho, DT.rhodot, DT.P, periods, P0);
}
console.log(JSON.stringify(out, (k, v) => (typeof v === 'number' ? Number(v.toPrecision(13)) : v), 1));
