#!/usr/bin/env node
// weber-frequency-continuation.mjs
// Lane "weber-frequency derivation" of the Weber binding-sphere continuation (2026-10-05).
// Independent instrument: no imports from any other instrument. Node >= 20, no dependencies.
//
// Law (instantaneous Weber comparison, equation-variants manuscript Section 9), unit weights:
//   A_i = sum_{j != i} (sigma_ij K / d^2) [ 1 + lamW * ddot_d^2 / c^2 + muW * d * dddot_d / c^2 ] e_ij
// with dddot_d = e_ij . (A_i - A_j) + |w_perp|^2 / d. The law is implicit in the accelerations;
// every evaluation assembles and solves the 3N x 3N linear system M a = b from the law itself.
//
// Outputs (all beside this file unless noted):
//   weber-frequency-continuation.json                      receipt (known cases first, then target table)
//   weber-frequency-continuation-radius.svg                rho(f), d(f)
//   weber-frequency-continuation-speed.svg                 v(f) with the equality line
//   weber-frequency-continuation-radial.svg                omega_r/Omega and delta_varpi/(2 pi) with resonances
// Scratch: none required. Run:  node weber-frequency-continuation.mjs

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_JSON = join(HERE, 'weber-frequency-continuation.json');
const T_START = new Date();

// ---------------------------------------------------------------- linear algebra (own code)
function solveLinear(Ain, bin) {
  // Gaussian elimination with partial pivoting; returns { x, det }.
  const n = bin.length;
  const A = Ain.map((r) => r.slice());
  const b = bin.slice();
  let det = 1;
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    if (p !== k) { [A[p], A[k]] = [A[k], A[p]]; [b[p], b[k]] = [b[k], b[p]]; det = -det; }
    const piv = A[k][k];
    if (!Number.isFinite(piv) || piv === 0) return { x: null, det: 0 };
    det *= piv;
    for (let i = k + 1; i < n; i++) {
      const f = A[i][k] / piv;
      if (f === 0) continue;
      for (let j = k; j < n; j++) A[i][j] -= f * A[k][j];
      b[i] -= f * b[k];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = b[i];
    for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j];
    x[i] = s / A[i][i];
  }
  return { x, det };
}

// ---------------------------------------------------------------- the law
// state: X = [[x,y,z],...], V = [[vx,vy,vz],...], q = [+1,-1,...]
function assembleAndSolve(X, V, q, par) {
  const { K, c, lamW, muW } = par;
  const N = X.length, n = 3 * N;
  const M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const b = new Array(n).fill(0);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const r = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]];
      const d = Math.hypot(r[0], r[1], r[2]);
      const e = [r[0] / d, r[1] / d, r[2] / d];
      const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]];
      const ddot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
      const w2 = w[0] * w[0] + w[1] * w[1] + w[2] * w[2];
      const wperp2 = Math.max(0, w2 - ddot * ddot);
      const sig = q[i] * q[j];
      const pref = sig * K / (d * d);
      // known part of the bracket: 1 + lamW ddot^2/c^2 + muW (|w_perp|^2/d) d / c^2
      const known = 1 + lamW * ddot * ddot / (c * c) + muW * wperp2 / (c * c);
      for (let a = 0; a < 3; a++) b[3 * i + a] += pref * known * e[a];
      // unknown part: pref * muW * d / c^2 * e_a * (e . (A_i - A_j))  -> move to left side
      const coef = pref * muW * d / (c * c);
      for (let a = 0; a < 3; a++) {
        for (let bb = 0; bb < 3; bb++) {
          M[3 * i + a][3 * i + bb] -= coef * e[a] * e[bb];
          M[3 * i + a][3 * j + bb] += coef * e[a] * e[bb];
        }
      }
    }
  }
  const { x, det } = solveLinear(M, b);
  if (!x) throw new Error('singular acceleration solve');
  const A = [];
  for (let i = 0; i < N; i++) A.push([x[3 * i], x[3 * i + 1], x[3 * i + 2]]);
  return { A, det };
}

// ---------------------------------------------------------------- integrator (own RK4, fixed step)
function rhs(y, q, par) {
  const N = q.length;
  const X = [], V = [];
  for (let i = 0; i < N; i++) { X.push([y[6 * i], y[6 * i + 1], y[6 * i + 2]]); V.push([y[6 * i + 3], y[6 * i + 4], y[6 * i + 5]]); }
  const { A } = assembleAndSolve(X, V, q, par);
  const dy = new Array(6 * N);
  for (let i = 0; i < N; i++) {
    dy[6 * i] = V[i][0]; dy[6 * i + 1] = V[i][1]; dy[6 * i + 2] = V[i][2];
    dy[6 * i + 3] = A[i][0]; dy[6 * i + 4] = A[i][1]; dy[6 * i + 5] = A[i][2];
  }
  return dy;
}
function rk4Step(y, h, q, par) {
  const n = y.length;
  const k1 = rhs(y, q, par);
  const y2 = y.map((v, i) => v + 0.5 * h * k1[i]);
  const k2 = rhs(y2, q, par);
  const y3 = y.map((v, i) => v + 0.5 * h * k2[i]);
  const k3 = rhs(y3, q, par);
  const y4 = y.map((v, i) => v + h * k3[i]);
  const k4 = rhs(y4, q, par);
  const out = new Array(n);
  for (let i = 0; i < n; i++) out[i] = y[i] + (h / 6) * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  return out;
}
function pairScalars(y) {
  // relative vector of member 0 minus member 1
  const r = [y[0] - y[6], y[1] - y[7], y[2] - y[8]];
  const w = [y[3] - y[9], y[4] - y[10], y[5] - y[11]];
  const d = Math.hypot(r[0], r[1], r[2]);
  const ddot = (r[0] * w[0] + r[1] * w[1] + r[2] * w[2]) / d;
  const theta = Math.atan2(r[1], r[0]);
  const hx = r[1] * w[2] - r[2] * w[1], hy = r[2] * w[0] - r[0] * w[2], hz = r[0] * w[1] - r[1] * w[0];
  return { d, ddot, theta, h: Math.hypot(hx, hy, hz) };
}

// ---------------------------------------------------------------- closed forms (this lane)
const PAR = { K: 1, c: 1, lamW: -0.5, muW: 1 };
function circleFromOmega(Om, K = 1, c = 1) {
  const rho = Math.cbrt(K / (4 * Om * Om));
  const d = 2 * rho;
  const v = Om * rho;
  const Delta = 1 + 2 * K / (c * c * d);
  const omr = Om / Math.sqrt(Delta);
  const Phi = Math.PI * Om / omr;
  const dvarpi = 2 * Math.PI * (Om / omr - 1);
  const label = v < c ? 'strict (v<c_f)' : (v === c ? 'equality (v=c_f)' : 'superfield (v>c_f)');
  return { Omega: Om, f: Om / (2 * Math.PI), rho, d, v, Delta, omega_r: omr, Phi_lin: Phi, delta_varpi: dvarpi, label };
}
function circleState(rho, Om, delta = 0) {
  // Radial perturbation at fixed relative angular momentum h = d v: the radius is stretched by (1 + delta)
  // and the speed divided by (1 + delta), so the perturbed history oscillates about the nominal circle.
  const v = Om * rho / (1 + delta);
  return [rho * (1 + delta), 0, 0, 0, v, 0, -rho * (1 + delta), 0, 0, 0, -v, 0];
}

// ---------------------------------------------------------------- known cases
const receipt = { instrument: 'weber-frequency-continuation.mjs', law: PAR, started_utc: T_START.toISOString(), known_cases: [], target: {} };
const Q = [1, -1];
function stamp() { return new Date().toISOString(); }

// K1: circle balance at rho in {0.25, 1, 3}
{
  const rows = [];
  let pass = true;
  for (const rho of [0.25, 1, 3]) {
    const Om = Math.sqrt(PAR.K / (4 * rho ** 3));
    const y = circleState(rho, Om);
    const X = [[y[0], y[1], y[2]], [y[6], y[7], y[8]]], V = [[y[3], y[4], y[5]], [y[9], y[10], y[11]]];
    const { A, det } = assembleAndSolve(X, V, Q, PAR);
    let res = 0;
    for (let i = 0; i < 2; i++) for (let a = 0; a < 3; a++) res = Math.max(res, Math.abs(A[i][a] + Om * Om * X[i][a]));
    const detExp = 1 + 2 / (2 * rho);
    const ok = res <= 1e-13 * Om * Om * rho && Math.abs(det - detExp) <= 1e-13 * detExp;
    pass = pass && ok;
    rows.push({ rho, Omega: Om, residual: res, tolerance: 1e-13 * Om * Om * rho, det, det_expected: detExp, pass: ok });
  }
  receipt.known_cases.push({ case: 'K1', spec: 'opposite-polarity circle, A_i = -Omega^2 X_i, det M = 1 + 1/rho', rows, pass, utc: stamp() });
}
// K5: mu_W = 0 keeps balance at rho = 1; static pair at d = 2 gives |A| = 1/8
{
  const rho = 1, Om = Math.sqrt(PAR.K / (4 * rho ** 3));
  const y = circleState(rho, Om);
  const X = [[y[0], y[1], y[2]], [y[6], y[7], y[8]]], V = [[y[3], y[4], y[5]], [y[9], y[10], y[11]]];
  const { A } = assembleAndSolve(X, V, Q, { ...PAR, muW: 0 });
  let res = 0;
  for (let i = 0; i < 2; i++) for (let a = 0; a < 3; a++) res = Math.max(res, Math.abs(A[i][a] + Om * Om * X[i][a]));
  const st = assembleAndSolve([[1, 0, 0], [-1, 0, 0]], [[0, 0, 0], [0, 0, 0]], Q, PAR);
  const mag = Math.hypot(...st.A[0]);
  const ok = res <= 1e-13 && Math.abs(mag - 1 / 8) <= 1e-13 && Math.abs(st.det - 2) <= 1e-13 && st.A[0][0] < 0;
  receipt.known_cases.push({ case: 'K5', spec: 'mu_W=0 circle at rho=1 balanced; static pair d=2: |A|=1/8 toward partner, det=2', residual_muW0: res, static_magnitude: mag, static_det: st.det, static_A0: st.A[0], pass: ok, utc: stamp() });
}
// K6: zero-coefficient Kepler ellipse a = 3, e = 0.5, relative coupling k = 2K
function keplerPosition(a, e, k, t) {
  const n = Math.sqrt(k / a ** 3);
  const Mm = n * t;
  let E = Mm;
  for (let it = 0; it < 60; it++) { const dE = (E - e * Math.sin(E) - Mm) / (1 - e * Math.cos(E)); E -= dE; if (Math.abs(dE) < 1e-16) break; }
  return [a * (Math.cos(E) - e), a * Math.sqrt(1 - e * e) * Math.sin(E)];
}
function integrateK6(steps) {
  const a = 3, e = 0.5, k = 2 * PAR.K;
  const rp = a * (1 - e), vp = Math.sqrt(k * (1 + e) / (a * (1 - e)));
  // members at +-r/2 with velocities +-w/2
  let y = [rp / 2, 0, 0, 0, vp / 2, 0, -rp / 2, 0, 0, 0, -vp / 2, 0];
  const P = 2 * Math.PI * Math.sqrt(a ** 3 / k);
  const par0 = { ...PAR, lamW: 0, muW: 0 };
  const h = P / steps;
  let maxErr = 0;
  const checks = [0.25, 0.5, 0.75, 1.0].map((fr) => Math.round(fr * steps));
  for (let s = 1; s <= steps; s++) {
    y = rk4Step(y, h, Q, par0);
    if (checks.includes(s)) {
      const t = s * h;
      const [xk, yk] = keplerPosition(a, e, k, t);
      const err = Math.hypot(y[0] - y[6] - xk, y[1] - y[7] - yk);
      maxErr = Math.max(maxErr, err);
    }
  }
  return { P, steps, h, maxErr };
}
{
  const r1 = integrateK6(40000), r2 = integrateK6(80000);
  const ok = r2.maxErr <= 1e-9;
  receipt.known_cases.push({ case: 'K6', spec: 'zero-coefficient Kepler ellipse a=3 e=0.5, one radial period 2 pi sqrt(a^3/2), RK4 own integrator, relative position vs Kepler equation at T/4, T/2, 3T/4, T', runs: [r1, r2], pass: ok, utc: stamp() });
}
// K7 (reduced form): radial frequency at rho = 1 from the perturbed-circle measurement below is compared with omega_r^2 = Omega^2/2.

// ---------------------------------------------------------------- target: frequency grid
const fGrid = [0.01, 0.05, 0.1, 0.2, 1 / (2 * Math.PI), 0.5, 2 / Math.PI, 1, 2, 10];
const gridRows = fGrid.map((f) => ({ source: 'f-grid', ...circleFromOmega(2 * Math.PI * f) }));
const ladderRows = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
  const r = circleFromOmega(n);
  const L = 2 * Math.PI * r.rho, P = 2 * Math.PI / n;
  return { source: 'ladder', n, ...r, L, P, L_minus_vP: L - r.v * P };
});

// Direct 6x6 balance at every grid point
function balanceCheck(row) {
  const y = circleState(row.rho, row.Omega);
  const X = [[y[0], y[1], y[2]], [y[6], y[7], y[8]]], V = [[y[3], y[4], y[5]], [y[9], y[10], y[11]]];
  const { A, det } = assembleAndSolve(X, V, Q, PAR);
  let res = 0;
  for (let i = 0; i < 2; i++) for (let a = 0; a < 3; a++) res = Math.max(res, Math.abs(A[i][a] + row.Omega ** 2 * X[i][a]) / (row.Omega ** 2 * row.rho));
  return { balance_rel_residual: res, det_solved: det, det_minus_Delta: det - row.Delta, balance_pass: res <= 1e-13 };
}

// Exact quadratures (overnight (7.4)-(7.5), re-implemented here) for the measured (eps, h)
function quadratures(eps, h, K = 1, c = 1, n = 4096) {
  const k = 2 * K, kap = 2 * K / (c * c);
  const A = k / (2 * Math.abs(eps)), e = Math.sqrt(Math.max(0, 1 - 2 * Math.abs(eps) * h * h / (k * k)));
  let Tr = 0, Phi = 0;
  for (let i = 0; i < n; i++) {
    const psi = 2 * Math.PI * (i + 0.5) / n;
    const r = A * (1 - e * Math.cos(psi));
    Tr += Math.sqrt(r * (r + kap));
    Phi += Math.sqrt(1 + kap / r) / r;
  }
  Tr *= (2 * Math.PI / n) / Math.sqrt(2 * Math.abs(eps));
  Phi *= (2 * Math.PI / n) * h / (2 * Math.sqrt(2 * Math.abs(eps)));
  return { T_r: Tr, Phi, e };
}

// Perturbed-circle integration: measure radial period and apsidal advance
function hermiteRoot(t0, f0, df0, t1, f1, df1) {
  // cubic Hermite on [t0,t1] for f, find root by Newton from linear guess
  const hh = t1 - t0;
  let s = f0 / (f0 - f1);
  for (let it = 0; it < 30; it++) {
    const s2 = s * s, s3 = s2 * s;
    const H00 = 2 * s3 - 3 * s2 + 1, H10 = s3 - 2 * s2 + s, H01 = -2 * s3 + 3 * s2, H11 = s3 - s2;
    const val = H00 * f0 + H10 * hh * df0 + H01 * f1 + H11 * hh * df1;
    const dH00 = 6 * s2 - 6 * s, dH10 = 3 * s2 - 4 * s + 1, dH01 = -6 * s2 + 6 * s, dH11 = 3 * s2 - 2 * s;
    const der = dH00 * f0 + dH10 * hh * df0 + dH01 * f1 + dH11 * hh * df1;
    const ds = val / der;
    s -= ds;
    if (Math.abs(ds) < 1e-15) break;
  }
  return t0 + s * hh;
}
function perturbedCircle(row, delta = 1e-4, radialPeriods = 4, stepsPerOrbit = 4000) {
  const { rho, Omega, omega_r } = row;
  let y = circleState(rho, Omega, delta);
  const Porb = 2 * Math.PI / Omega, Prad = 2 * Math.PI / omega_r;
  const h = Porb / stepsPerOrbit;
  const Tend = (radialPeriods + 0.6) * Prad;
  const nSteps = Math.ceil(Tend / h);
  // invariants from the initial state
  const s0 = pairScalars(y);
  const K = PAR.K, c = PAR.c;
  const eps = 0.5 * (1 + 2 * K / (c * c * s0.d)) * s0.ddot ** 2 + s0.h ** 2 / (2 * s0.d ** 2) - 2 * K / s0.d;
  const peris = [];
  let prev = s0, prevT = 0, prevDdd = null;
  const dddOf = (yy) => {
    const X = [[yy[0], yy[1], yy[2]], [yy[6], yy[7], yy[8]]], V = [[yy[3], yy[4], yy[5]], [yy[9], yy[10], yy[11]]];
    const { A } = assembleAndSolve(X, V, Q, PAR);
    const sc = pairScalars(yy);
    const r = [yy[0] - yy[6], yy[1] - yy[7], yy[2] - yy[8]];
    const e = r.map((v) => v / sc.d);
    const w = [yy[3] - yy[9], yy[4] - yy[10], yy[5] - yy[11]];
    const w2 = w[0] ** 2 + w[1] ** 2 + w[2] ** 2;
    return e[0] * (A[0][0] - A[1][0]) + e[1] * (A[0][1] - A[1][1]) + e[2] * (A[0][2] - A[1][2]) + (w2 - sc.ddot ** 2) / sc.d;
  };
  prevDdd = dddOf(y);
  let dmin = s0.d, dmax = s0.d, epsDrift = 0, hDrift = 0;
  let t = 0;
  for (let s = 1; s <= nSteps; s++) {
    y = rk4Step(y, h, Q, PAR);
    t = s * h;
    const cur = pairScalars(y);
    dmin = Math.min(dmin, cur.d); dmax = Math.max(dmax, cur.d);
    const epsNow = 0.5 * (1 + 2 * K / (c * c * cur.d)) * cur.ddot ** 2 + cur.h ** 2 / (2 * cur.d ** 2) - 2 * K / cur.d;
    epsDrift = Math.max(epsDrift, Math.abs(epsNow - eps));
    hDrift = Math.max(hDrift, Math.abs(cur.h - s0.h));
    const curDdd = dddOf(y);
    if (prev.ddot < 0 && cur.ddot >= 0) {
      // pericentre: ddot crosses zero upward
      const tp = hermiteRoot(prevT, prev.ddot, prevDdd, t, cur.ddot, curDdd);
      // interpolate theta linearly in time between samples (theta rate ~ h/d^2 smooth)
      const fr = (tp - prevT) / h;
      let dth = cur.theta - prev.theta; if (dth > Math.PI) dth -= 2 * Math.PI; if (dth < -Math.PI) dth += 2 * Math.PI;
      // refine theta with midpoint rate: theta(tp) ~ theta_prev + thetadot*(tp-prevT) using h/d^2 at the two samples (trapezoid)
      const thdPrev = prev.h / prev.d ** 2, thdCur = cur.h / cur.d ** 2;
      const thp = prev.theta + (thdPrev * fr + 0.5 * (thdCur - thdPrev) * fr * fr) * h;
      peris.push({ t: tp, theta: thp, theta_lin: prev.theta + dth * fr });
    }
    prev = cur; prevT = t; prevDdd = curDdd;
  }
  const periods = [], advances = [];
  for (let i = 1; i < peris.length; i++) {
    periods.push(peris[i].t - peris[i - 1].t);
    let a = peris[i].theta - peris[i - 1].theta;
    // unwrap: the advance per radial period is 2 pi + delta_varpi with delta_varpi in (0, large); recover by counting orbits
    const orbits = Math.round(((peris[i].t - peris[i - 1].t) * Omega - a) / (2 * Math.PI));
    a += 2 * Math.PI * orbits;
    advances.push(a - 2 * Math.PI);
  }
  const mean = (arr) => arr.reduce((p, q) => p + q, 0) / arr.length;
  const Tmeas = mean(periods), advMeas = mean(advances);
  const quad = quadratures(eps, s0.h);
  return {
    delta, steps_per_orbit: stepsPerOrbit, step: h, radial_periods_requested: radialPeriods, pericentres_found: peris.length,
    eps, h: s0.h, d_min: dmin, d_max: dmax, eps_drift_max: epsDrift, h_drift_max: hDrift,
    T_r_measured: Tmeas, T_r_linear: Prad, T_r_rel_err_vs_linear: Math.abs(Tmeas / Prad - 1),
    T_r_quadrature: quad.T_r, T_r_rel_err_vs_quadrature: Math.abs(Tmeas / quad.T_r - 1),
    advance_measured: advMeas, delta_varpi_linear: row.delta_varpi, advance_minus_linear: advMeas - row.delta_varpi,
    advance_quadrature: 2 * quad.Phi - 2 * Math.PI, advance_minus_quadrature: advMeas - (2 * quad.Phi - 2 * Math.PI),
    eccentricity_from_invariants: quad.e,
    radial_pass: Math.abs(Tmeas / Prad - 1) <= 1e-6,
  };
}

const allRows = [...gridRows, ...ladderRows];
for (const row of allRows) Object.assign(row, balanceCheck(row));
// perturbation runs on every grid and ladder point (cheap); step refinement at three points
const perturbRows = [];
for (const row of allRows) {
  const p = perturbedCircle(row);
  perturbRows.push({ source: row.source, f: row.f, Omega: row.Omega, n: row.n, ...p });
}
const refinement = [];
for (const f of [1 / (2 * Math.PI), 2 / Math.PI, 1]) {
  const row = circleFromOmega(2 * Math.PI * f);
  for (const spo of [2000, 4000, 8000]) {
    const p = perturbedCircle(row, 1e-4, 4, spo);
    refinement.push({ f, steps_per_orbit: spo, T_r_measured: p.T_r_measured, T_r_rel_err_vs_linear: p.T_r_rel_err_vs_linear, advance_measured: p.advance_measured, advance_minus_linear: p.advance_minus_linear, eps_drift_max: p.eps_drift_max });
  }
}

// Resonances and equality point
const equality = { Omega: 4 * PAR.c ** 3 / PAR.K, f: 2 * PAR.c ** 3 / (Math.PI * PAR.K), d: 2 ** (1 / 3) * PAR.K / (4 ** (2 / 3) * PAR.c ** 2) };
equality.rho_check = circleFromOmega(equality.Omega).rho;
equality.v_check = circleFromOmega(equality.Omega).v;
const resonances = [[2, 1], [3, 2], [4, 3], [3, 1], [5, 4], [5, 3], [5, 2], [4, 1]].map(([p, q]) => {
  const ratio2 = (p / q) ** 2;
  const d = 2 * PAR.K / (PAR.c ** 2 * (ratio2 - 1));
  const Om = Math.sqrt(2 * PAR.K / d ** 3);
  const r = circleFromOmega(Om);
  return { p, q, d, Omega: Om, f: Om / (2 * Math.PI), v: r.v, label: r.label, ratio_check: r.Omega / r.omega_r };
});

receipt.target = {
  closed_forms: {
    rho: '(K/(4 Omega^2))^(1/3) = (K/(16 pi^2 f^2))^(1/3)',
    d: '(2K/Omega^2)^(1/3) = (K/(2 pi^2 f^2))^(1/3)',
    v: '(K Omega/4)^(1/3) = (pi K f/2)^(1/3)',
    Delta: '1 + 2K/(c_f^2 d) = 1 + (2 K Omega)^(2/3)/c_f^2 = 1 + (4 pi K f)^(2/3)/c_f^2',
    omega_r: 'Omega/sqrt(Delta)', Phi_lin: 'pi sqrt(Delta)', delta_varpi: '2 pi (sqrt(Delta) - 1)',
    equality: 'Omega = 4 c_f^3/K, f = 2 c_f^3/(pi K)',
    resonance: 'Omega/omega_r = p/q  <=>  d = 2K/(c_f^2((p/q)^2 - 1))',
  },
  equality, resonances,
  grid: gridRows, ladder: ladderRows, perturbation: perturbRows, step_refinement: refinement,
};

// ---------------------------------------------------------------- plots (own SVG writer)
const INK = '#1f2328', MUTED = '#6e7781', GRID = '#d0d7de', C1 = '#2a78d6', C2 = '#e87ba4', C3 = '#008300', C4 = '#eda100';
const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
function logTicks(lo, hi) {
  const t = [];
  for (let e = Math.floor(Math.log10(lo)); e <= Math.ceil(Math.log10(hi)); e++) {
    for (const m of [1, 2, 5]) { const v = m * 10 ** e; if (v >= lo * 0.999 && v <= hi * 1.001) t.push(v); }
  }
  return t;
}
function fmtTick(v) { return v >= 1 ? String(Number(v.toPrecision(3))) : String(Number(v.toPrecision(2))); }
function svgPlot({ title, xlabel, ylabel, xlog, ylog, xr, yr, series, hlines = [], vlines = [], points = [], notes = [] }) {
  const W = 760, H = 460, mL = 78, mR = 24, mT = 48, mB = 62;
  const pw = W - mL - mR, ph = H - mT - mB;
  const sx = (x) => mL + ((xlog ? Math.log10(x) - Math.log10(xr[0]) : x - xr[0]) / (xlog ? Math.log10(xr[1]) - Math.log10(xr[0]) : xr[1] - xr[0])) * pw;
  const sy = (y) => mT + ph - ((ylog ? Math.log10(y) - Math.log10(yr[0]) : y - yr[0]) / (ylog ? Math.log10(yr[1]) - Math.log10(yr[0]) : yr[1] - yr[0])) * ph;
  const xt = xlog ? logTicks(xr[0], xr[1]) : Array.from({ length: 6 }, (_, i) => xr[0] + (i * (xr[1] - xr[0])) / 5);
  const yt = ylog ? logTicks(yr[0], yr[1]) : Array.from({ length: 6 }, (_, i) => yr[0] + (i * (yr[1] - yr[0])) / 5);
  let s = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Helvetica, Arial, sans-serif" font-size="12">\n`;
  s += `<rect width="${W}" height="${H}" fill="#ffffff"/>\n<text x="${mL}" y="24" font-size="15" font-weight="600" fill="${INK}">${esc(title)}</text>\n`;
  for (const v of xt) s += `<line x1="${sx(v).toFixed(1)}" y1="${mT}" x2="${sx(v).toFixed(1)}" y2="${mT + ph}" stroke="${GRID}" stroke-width="1"/>\n<text x="${sx(v).toFixed(1)}" y="${mT + ph + 18}" text-anchor="middle" fill="${MUTED}">${fmtTick(v)}</text>\n`;
  for (const v of yt) s += `<line x1="${mL}" y1="${sy(v).toFixed(1)}" x2="${mL + pw}" y2="${sy(v).toFixed(1)}" stroke="${GRID}" stroke-width="1"/>\n<text x="${mL - 8}" y="${(sy(v) + 4).toFixed(1)}" text-anchor="end" fill="${MUTED}">${fmtTick(v)}</text>\n`;
  s += `<rect x="${mL}" y="${mT}" width="${pw}" height="${ph}" fill="none" stroke="${MUTED}" stroke-width="1"/>\n`;
  s += `<text x="${mL + pw / 2}" y="${H - 20}" text-anchor="middle" fill="${INK}">${esc(xlabel)}</text>\n`;
  s += `<text transform="translate(18 ${mT + ph / 2}) rotate(-90)" text-anchor="middle" fill="${INK}">${esc(ylabel)}</text>\n`;
  for (const hl of hlines) s += `<line x1="${mL}" y1="${sy(hl.y).toFixed(1)}" x2="${mL + pw}" y2="${sy(hl.y).toFixed(1)}" stroke="${hl.color || MUTED}" stroke-width="1.5" stroke-dasharray="6 4"/>\n<text x="${mL + pw - 6}" y="${(sy(hl.y) - 6).toFixed(1)}" text-anchor="end" fill="${INK}">${esc(hl.label)}</text>\n`;
  for (const vl of vlines) s += `<line x1="${sx(vl.x).toFixed(1)}" y1="${mT}" x2="${sx(vl.x).toFixed(1)}" y2="${mT + ph}" stroke="${vl.color || MUTED}" stroke-width="1.5" stroke-dasharray="6 4"/>\n<text x="${(sx(vl.x) + 5).toFixed(1)}" y="${mT + 14 + (vl.dy || 0)}" fill="${INK}">${esc(vl.label)}</text>\n`;
  for (const se of series) {
    const pts = se.xy.filter(([x, y]) => x >= xr[0] && x <= xr[1] && y >= yr[0] && y <= yr[1]);
    const dpath = pts.map(([x, y], i) => `${i ? 'L' : 'M'}${sx(x).toFixed(2)} ${sy(y).toFixed(2)}`).join(' ');
    s += `<path d="${dpath}" fill="none" stroke="${se.color}" stroke-width="2"/>\n`;
    const last = pts[pts.length - 1];
    const lx = se.labelAt ? sx(se.labelAt[0]) : sx(last[0]) - 4, ly = se.labelAt ? sy(se.labelAt[1]) : sy(last[1]) - 8;
    s += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" text-anchor="${se.labelAt ? 'start' : 'end'}" fill="${INK}" font-weight="600">${esc(se.label)}</text>\n`;
  }
  for (const p of points) s += `<circle cx="${sx(p.x).toFixed(1)}" cy="${sy(p.y).toFixed(1)}" r="${p.r || 4.5}" fill="${p.fill || '#ffffff'}" stroke="${p.color}" stroke-width="2"/>\n` + (p.label ? `<text x="${(sx(p.x) + (p.dx || 7)).toFixed(1)}" y="${(sy(p.y) + (p.dy || 4)).toFixed(1)}" fill="${INK}" font-size="11">${esc(p.label)}</text>\n` : '');
  notes.forEach((n, i) => { s += `<text x="${mL + 8}" y="${mT + ph - 10 - 15 * (notes.length - 1 - i)}" fill="${MUTED}" font-size="11">${esc(n)}</text>\n`; });
  return s + '</svg>\n';
}
const fs = []; for (let i = 0; i <= 400; i++) fs.push(10 ** (-2.3 + (3.3 * i) / 400));
const curves = fs.map((f) => [f, circleFromOmega(2 * Math.PI * f)]);
const fEq = 2 / Math.PI;
writeFileSync(join(HERE, 'weber-frequency-continuation-radius.svg'), svgPlot({
  title: 'Opposite-polarity Weber circle: radius and separation versus cyclic frequency (K = c_f = 1)',
  xlabel: 'cyclic frequency f = 1/P (units c_f^3/K)', ylabel: 'length (units K/c_f^2)', xlog: true, ylog: true, xr: [0.005, 20], yr: [0.02, 20],
  series: [{ xy: curves.map(([f, r]) => [f, r.d]), color: C1, label: 'd(f) = (K/(2 pi^2 f^2))^(1/3)', labelAt: [0.012, 9] }, { xy: curves.map(([f, r]) => [f, r.rho]), color: C2, label: 'rho(f) = d/2', labelAt: [0.012, 2.4] }],
  vlines: [{ x: fEq, label: 'v = c_f at f = 2/pi', color: C4 }],
  points: [...gridRows.map((r) => ({ x: r.f, y: r.d, color: C1 })), ...gridRows.map((r) => ({ x: r.f, y: r.rho, color: C2 }))],
  notes: ['Lines: closed form. Circles: preregistered grid points, each verified by the 6x6 solve (receipt).'],
}));
writeFileSync(join(HERE, 'weber-frequency-continuation-speed.svg'), svgPlot({
  title: 'Opposite-polarity Weber circle: centre-rest speed versus cyclic frequency (K = c_f = 1)',
  xlabel: 'cyclic frequency f = 1/P (units c_f^3/K)', ylabel: 'member speed v (units c_f)', xlog: true, ylog: true, xr: [0.005, 20], yr: [0.2, 3],
  series: [{ xy: curves.map(([f, r]) => [f, r.v]), color: C1, label: 'v(f) = (pi K f/2)^(1/3)', labelAt: [0.012, 1.9] }],
  hlines: [{ y: 1, label: 'equality v = c_f', color: C4 }],
  vlines: [{ x: fEq, label: 'f = 2/pi: strict below, inclusive up to, superfield above', color: C4 }],
  points: gridRows.map((r) => ({ x: r.f, y: r.v, color: r.v < 1 ? C3 : (r.v > 1 ? C2 : C4) })),
  notes: ['Green: strict (v < c_f); amber: equality; magenta: superfield. No ceiling is enforced; labels never alter an acceleration.'],
}));
writeFileSync(join(HERE, 'weber-frequency-continuation-radial.svg'), svgPlot({
  title: 'Radial frequency ratio and apsidal precession versus cyclic frequency (K = c_f = 1)',
  xlabel: 'cyclic frequency f = 1/P (units c_f^3/K)', ylabel: 'dimensionless', xlog: true, ylog: false, xr: [0.005, 20], yr: [0, 3],
  series: [
    { xy: curves.map(([f, r]) => [f, r.omega_r / r.Omega]), color: C1, label: 'omega_r / Omega = Delta^(-1/2)', labelAt: [0.006, 0.55] },
    { xy: curves.map(([f, r]) => [f, r.delta_varpi / (2 * Math.PI)]), color: C2, label: 'delta_varpi / (2 pi) = Delta^(1/2) - 1', labelAt: [0.3, 1.6] },
  ],
  points: resonances.filter((r) => r.p <= 4).map((r) => ({ x: r.f, y: (r.p / r.q) - 1, color: C2, label: `${r.p}:${r.q}`, dy: -8 })),
  notes: ['Marked points: Omega/omega_r = p/q (4:3, 3:2, 2:1, 3:1, 4:1), rosette closures, not stability changes.'],
}));

receipt.finished_utc = stamp();
receipt.elapsed_seconds = (Date.now() - T_START.getTime()) / 1000;
writeFileSync(OUT_JSON, JSON.stringify(receipt, null, 2));

// ---------------------------------------------------------------- console summary
const p = (x, n = 10) => (typeof x === 'number' ? x.toPrecision(n) : String(x));
console.log('Known cases:');
for (const kc of receipt.known_cases) console.log(`  ${kc.case}: ${kc.pass ? 'PASS' : 'FAIL'}  ${JSON.stringify(kc.rows ? kc.rows.map((r) => ({ rho: r.rho, residual: r.residual, det: r.det })) : (kc.runs ? kc.runs.map((r) => r.maxErr) : [kc.residual_muW0, kc.static_magnitude, kc.static_det]))}`);
console.log('\nGrid:');
for (const r of allRows) console.log(`  ${r.source}${r.n ? ' n=' + r.n : ''} f=${p(r.f, 8)} Omega=${p(r.Omega, 8)} rho=${p(r.rho, 8)} d=${p(r.d, 8)} v=${p(r.v, 8)} omega_r=${p(r.omega_r, 8)} Phi=${p(r.Phi_lin, 8)} dvarpi=${p(r.delta_varpi, 8)} Delta=${p(r.Delta, 8)} ${r.label} res=${r.balance_rel_residual.toExponential(2)} det-Delta=${r.det_minus_Delta.toExponential(2)}`);
console.log('\nPerturbation:');
for (const r of perturbRows) console.log(`  f=${p(r.f, 6)} peris=${r.pericentres_found} Tr_meas=${p(r.T_r_measured, 10)} Tr_lin=${p(r.T_r_linear, 10)} rel=${r.T_r_rel_err_vs_linear.toExponential(2)} relQuad=${r.T_r_rel_err_vs_quadrature.toExponential(2)} adv=${p(r.advance_measured, 8)} lin=${p(r.delta_varpi_linear, 8)} diff=${r.advance_minus_linear.toExponential(2)} diffQuad=${r.advance_minus_quadrature.toExponential(2)} epsDrift=${r.eps_drift_max.toExponential(2)} ${r.radial_pass ? 'PASS' : 'FAIL'}`);
console.log('\nRefinement:'); for (const r of refinement) console.log('  ' + JSON.stringify(r));
console.log('\nEquality:', JSON.stringify(equality));
console.log('Resonances:'); for (const r of resonances) console.log('  ' + JSON.stringify(r));
console.log(`\nelapsed ${receipt.elapsed_seconds}s; receipt ${OUT_JSON}`);
