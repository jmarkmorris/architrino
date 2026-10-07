#!/usr/bin/env node
// Delayed Weber pair instrument (lane B): coupled-history integrator for the
// frozen Section 9a law of equation-variants/manuscript.md on one isolated
// opposite-polarity pair. Research comparison instrument only: floating point,
// not an enclosure, not the EOM solver. Units: c_f = 1 (enforced), K = 1.
//
// Law (receiver i at absolute time T, transmitter j, every ordinary causal root
// S < T of |X_i(T) - X_j(S)| = c_f (T - S) > 0; same-time endpoint excluded):
//   A_i(T) = sum sigma K c_f / (R^2 |D_t|) [1 + lambda Rdot^2/c_f^2 + mu R Rddot/c_f^2] n
//   with lambda = -1/2, mu = 1 frozen; the zero-coefficient pair (0, 0) is the
//   canonical Master Equation and is used only as a control.
// Derived relations (see weber-delayed-pair-instrument.md, "Derivation"):
//   p = S' = D_r/D_t,  Rdot = c_f (1 - p),
//   Rddot = (c_f/D_t) [ n.(A_i(T) - p^2 A_j(S)) + |w_perp|^2 / R ],  w = V_i(T) - p V_j(S).
//   Present-acceleration block:  M_i A_i = b_i,
//   M_i = I - sum sigma K mu n n^T / (R |D_t| D_t),
//   b_i = sum sigma K c_f/(R^2 |D_t|) [1 + lambda (1-p)^2 + mu (|w_perp|^2 - R p^2 n.A_j(S)) / (c_f D_t)] n.
// History: (T, X, V, A) at every accepted step, quintic Hermite interpolation
// (position O(h^6), velocity O(h^5), acceleration O(h^4) local error); declared
// past on S < 0 supplied by a function (rigid circle, stationary, affine,
// or a densely tabulated Section 9 backward trajectory).
// Integrator: Dormand-Prince 5(4) with step control (default) or fixed-step RK4.
// Breaking points: every reception time of an acceleration jump is located and
// made a step end; both one-sided accelerations are recorded there.
//
// CLI:
//   node weber-delayed-pair-instrument.mjs controls            # known cases, writes the receipt
//   node weber-delayed-pair-instrument.mjs run <case.json> [--refine] [--stem s] [--tEnd T] [--no-record]
//   node weber-delayed-pair-instrument.mjs past <case.json>    # generate and cache the Section 9 backward past
// Module: import { runCase, presentAcceleration, partnerRoot, hermite5, ... }.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as S9 from './weber-overnight-pair-instrument.mjs';

const EPS = Number.EPSILON;
const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(HERE, '../../../../..');
export const DATA_ROOT = path.join(REPO_ROOT, '.local-data/master-equation-closure/weber-delayed-pair');
export const CASES_DIR = path.join(HERE, 'weber-delayed-pair-cases');
export const RUNS_PATH = path.join(HERE, 'weber-delayed-pair-runs.json');
export const CONTROLS_PATH = path.join(HERE, 'weber-delayed-pair-instrument-controls.json');
export const OWNER_TASK = 'claude-weber-delayed-pair-20261006';
const CF = 1;

export class DomainExitError extends Error { constructor(msg, info) { super(msg); this.info = info ?? {}; } }

// ---------------------------------------------------------------- vectors
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const norm = a => Math.hypot(a[0], a[1], a[2]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// ---------------------------------------------------------------- quintic Hermite
// Interpolant on [t0, t1] (h = t1 - t0) matching x, v, a at both ends. Returns x, v, a at t.
export function hermite5(t, t0, t1, x0, v0, a0, x1, v1, a1) {
  const h = t1 - t0, s = (t - t0) / h, s2 = s * s, s3 = s2 * s, s4 = s3 * s, s5 = s4 * s;
  const H0 = 1 - 10 * s3 + 15 * s4 - 6 * s5, H1 = s - 6 * s3 + 8 * s4 - 3 * s5, H2 = 0.5 * (s2 - 3 * s3 + 3 * s4 - s5);
  const H3 = 10 * s3 - 15 * s4 + 6 * s5, H4 = -4 * s3 + 7 * s4 - 3 * s5, H5 = 0.5 * (s3 - 2 * s4 + s5);
  const d0 = -30 * s2 + 60 * s3 - 30 * s4, d1 = 1 - 18 * s2 + 32 * s3 - 15 * s4, d2 = 0.5 * (2 * s - 9 * s2 + 12 * s3 - 5 * s4);
  const d3 = 30 * s2 - 60 * s3 + 30 * s4, d4 = -12 * s2 + 28 * s3 - 15 * s4, d5 = 0.5 * (3 * s2 - 8 * s3 + 5 * s4);
  const e0 = -60 * s + 180 * s2 - 120 * s3, e1 = -36 * s + 96 * s2 - 60 * s3, e2 = 0.5 * (2 - 18 * s + 36 * s2 - 20 * s3);
  const e3 = 60 * s - 180 * s2 + 120 * s3, e4 = -24 * s + 84 * s2 - 60 * s3, e5 = 0.5 * (6 * s - 24 * s2 + 20 * s3);
  const x = [0, 0, 0], v = [0, 0, 0], a = [0, 0, 0];
  for (let k = 0; k < 3; k++) {
    x[k] = x0[k] * H0 + h * v0[k] * H1 + h * h * a0[k] * H2 + x1[k] * H3 + h * v1[k] * H4 + h * h * a1[k] * H5;
    v[k] = (x0[k] * d0 + h * v0[k] * d1 + h * h * a0[k] * d2 + x1[k] * d3 + h * v1[k] * d4 + h * h * a1[k] * d5) / h;
    a[k] = (x0[k] * e0 + h * v0[k] * e1 + h * h * a0[k] * e2 + x1[k] * e3 + h * v1[k] * e4 + h * h * a1[k] * e5) / (h * h);
  }
  return { x, v, a };
}

// ---------------------------------------------------------------- declared pasts
export function rigidCirclePast({ rho, Omega, phi0 = 0, sign = 1 }) {
  // X(S) = sign * rho (cos(Omega S + phi0), sin(Omega S + phi0), 0)
  return {
    kind: 'rigid-circle', rho, Omega, phi0, sign, sMin: -Infinity,
    eval(S) {
      const th = Omega * S + phi0, c = Math.cos(th), s = Math.sin(th), r = sign * rho;
      return { x: [r * c, r * s, 0], v: [-r * Omega * s, r * Omega * c, 0], a: [-r * Omega * Omega * c, -r * Omega * Omega * s, 0] };
    },
  };
}
export function stationaryPast(x) { return { kind: 'stationary', sMin: -Infinity, eval() { return { x: x.slice(), v: [0, 0, 0], a: [0, 0, 0] }; } }; }
export function affinePast(b, v) { return { kind: 'affine', sMin: -Infinity, eval(S) { return { x: add(b, scale(v, S)), v: v.slice(), a: [0, 0, 0] }; } }; }
// records: arrays t (ascending), x, v, a; quintic Hermite between samples
export function tabulatedPast(rec) {
  const n = rec.t.length;
  return {
    kind: 'tabulated', sMin: rec.t[0], sMax: rec.t[n - 1], count: n,
    eval(S) {
      if (S < rec.t[0] - 1e-12 || S > rec.t[n - 1] + 1e-6) throw new DomainExitError(`tabulated past exhausted at S=${S}`, { S });
      if (S > rec.t[n - 1]) { // left-side lookup within the snap window above the final sample: Taylor from the final (left-limit) sample
        const d = S - rec.t[n - 1], x0 = rec.x[n - 1], v0 = rec.v[n - 1], a0 = rec.a[n - 1];
        return { x: [x0[0] + v0[0] * d + 0.5 * a0[0] * d * d, x0[1] + v0[1] * d + 0.5 * a0[1] * d * d, x0[2] + v0[2] * d + 0.5 * a0[2] * d * d], v: [v0[0] + a0[0] * d, v0[1] + a0[1] * d, v0[2] + a0[2] * d], a: a0.slice() };
      }
      let lo = 0, hi = n - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (rec.t[m] <= S) lo = m; else hi = m; }
      if (S === rec.t[hi]) return { x: rec.x[hi].slice(), v: rec.v[hi].slice(), a: rec.a[hi].slice() };
      return hermite5(S, rec.t[lo], rec.t[hi], rec.x[lo], rec.v[lo], rec.a[lo], rec.x[hi], rec.v[hi], rec.a[hi]);
    },
  };
}

// ---------------------------------------------------------------- member history
// Stored (T, X, V, A) at every accepted step; A is the right limit, aL the left
// limit when the record is a breaking point. side '+' at an exact record time
// uses the segment starting there; side '-' the segment ending there.
export class MemberHistory {
  constructor(past, prescribed = false) {
    this.past = past; this.prescribed = prescribed;
    this.t = []; this.x = []; this.v = []; this.a = []; this.aL = [];
  }
  get lastT() { return this.t.length ? this.t[this.t.length - 1] : 0; }
  push(t, x, v, a, aLeft = null) {
    if (this.t.length && !(t > this.lastT)) throw new Error(`history push out of order: ${t} <= ${this.lastT}`);
    this.t.push(t); this.x.push(x.slice()); this.v.push(v.slice()); this.a.push(a.slice()); this.aL.push(aLeft ? aLeft.slice() : null);
  }
  setLeftAcceleration(aLeft) { this.aL[this.aL.length - 1] = aLeft.slice(); }
  truncateTo(k) { this.t.length = k; this.x.length = k; this.v.length = k; this.a.length = k; this.aL.length = k; }
  eval(S, side = '+') {
    if (this.prescribed) return this.past.eval(S);
    const n = this.t.length, t = this.t;
    if (n === 0) return this.past.eval(S);
    const snap = 1e-9 * Math.max(1, Math.abs(S));
    if (S < t[0] - snap) return this.past.eval(S);
    if (S > t[n - 1] + snap) throw new DomainExitError(`history overrun: S=${S} beyond last record ${t[n - 1]}`, { S, retry: true });
    let lo = 0, hi = n - 1;
    while (hi - lo > 1) { const m = (lo + hi) >> 1; if (t[m] <= S) lo = m; else hi = m; }
    if (n === 1) { lo = 0; hi = 0; }
    // snap to a record time: side '+' uses the segment starting there, '-' the segment ending there
    if (Math.abs(S - t[hi]) <= snap && side === '+') { lo = hi; hi = hi + 1; }
    else if (Math.abs(S - t[lo]) <= snap && side === '-') { hi = lo; lo = lo - 1; }
    else if (hi === lo) { if (side === '+') hi = lo + 1; else { hi = lo; lo = lo - 1; } }
    if (lo < 0) return this.past.eval(S);
    if (hi > n - 1) { // at or just beyond the last record on the right side: Taylor from the record
      const d = S - t[lo], x0 = this.x[lo], v0 = this.v[lo], a0 = this.a[lo];
      return { x: [x0[0] + v0[0] * d + 0.5 * a0[0] * d * d, x0[1] + v0[1] * d + 0.5 * a0[1] * d * d, x0[2] + v0[2] * d + 0.5 * a0[2] * d * d], v: [v0[0] + a0[0] * d, v0[1] + a0[1] * d, v0[2] + a0[2] * d], a: a0.slice() };
    }
    const a1 = this.aL[hi] ?? this.a[hi];
    return hermite5(S, t[lo], t[hi], this.x[lo], this.v[lo], this.a[lo], this.x[hi], this.v[hi], a1);
  }
}

// ---------------------------------------------------------------- root solve
// f(S) = |X_i(T) - X_j(S)| - c_f (T - S); f'(S) = D_t = c_f - n.V_j(S) > 0 for a subfield transmitter.
export function partnerRoot(T, Xi, histJ, lagGuess, opt = {}) {
  const tol = opt.tol ?? 1e-13;
  const sideAt = opt.side ?? '+';
  const f = S => {
    const p = histJ.eval(S, sideAt); const d = sub(Xi, p.x); const R = norm(d);
    const n = R > 0 ? scale(d, 1 / R) : [0, 0, 0];
    return { val: R - CF * (T - S), R, n, Dt: CF - dot(n, p.v), p };
  };
  // upper end of the bracket: the latest available history time (<= T)
  let Shi = histJ.prescribed ? T - 1e-300 : Math.min(T, histJ.lastT);
  if (Shi >= T) Shi = T - 1e-300;
  let fhi = f(Shi);
  if (!(fhi.val > 0)) throw new DomainExitError('arrival function not positive at the upper bracket end: root census outside the regular chart', { T, Shi, f: fhi.val });
  let lag = lagGuess > 0 ? lagGuess : 1;
  let Slo = T - lag, flo = f(Slo), expansions = 0, minDt = Math.min(fhi.Dt, flo.Dt);
  while (flo.val > 0) { lag *= 2; Slo = T - lag; flo = f(Slo); minDt = Math.min(minDt, flo.Dt); if (++expansions > 200) throw new DomainExitError('no causal root found within the searched past', { T }); }
  // safeguarded Newton on [Slo, Shi]
  let S = Slo + (Shi - Slo) * (-flo.val) / (fhi.val - flo.val), it = 0, cur = f(S);
  minDt = Math.min(minDt, cur.Dt);
  const floor = 4 * EPS * (Math.abs(T) + cur.R + 1);
  while (it < 100) {
    it++;
    if (Math.abs(cur.val) <= tol) break;
    if (cur.val > 0) Shi = S; else Slo = S;
    let Sn = cur.Dt > 0 ? S - cur.val / cur.Dt : NaN;
    if (!(Sn > Slo && Sn < Shi)) Sn = 0.5 * (Slo + Shi);
    if (Sn === S) break;
    S = Sn; cur = f(S); minDt = Math.min(minDt, cur.Dt);
    if (Shi - Slo <= 2 * EPS * Math.max(1, Math.abs(S))) break;
  }
  if (!(cur.R > 0)) throw new DomainExitError('zero range at root', { T, S });
  if (!(cur.Dt !== 0) || !Number.isFinite(cur.Dt)) throw new DomainExitError('D_t = 0 at root: non-ordinary root', { T, S });
  return { S, lag: T - S, R: cur.R, n: cur.n, Dt: cur.Dt, Xj: cur.p.x, Vj: cur.p.v, Aj: cur.p.a, residual: cur.val, iterations: it, expansions, minDtOnBracket: minDt, monotone: minDt > 0, residualFloor: floor };
}

// Self-root census: sample f_self(S) = |X_i(T) - X_i(S)| - (T - S) on [T - lookback, lastT]
// and count sign changes; also return the largest history speed on the samples.
// Derived guard: if sup |V_i| < c_f over the history then f_self < 0 on S < T, so no self root.
export function selfRootCensus(T, Xi, histI, lookback, samples = 24) {
  const end = histI.prescribed ? T : Math.min(T, histI.lastT);
  const start = Math.max(T - lookback, histI.past.sMin ?? -Infinity);
  if (!(end > start)) return { count: 0, samples: 0, maxSpeed: 0 };
  let prev = null, count = 0, maxSpeed = 0, maxF = -Infinity;
  for (let k = 0; k <= samples; k++) {
    const S = start + (end - start) * k / samples;
    if (S >= T) break;
    const p = histI.eval(S); const val = norm(sub(Xi, p.x)) - CF * (T - S);
    maxSpeed = Math.max(maxSpeed, norm(p.v)); maxF = Math.max(maxF, val);
    // a sign change counts only above the floating-point floor of the arrival function (1e-11 time units)
    if (prev !== null && ((val > 1e-11 && prev < -1e-11) || (val < -1e-11 && prev > 1e-11))) count++;
    prev = val;
  }
  return { count, samples, maxSpeed, maxF };
}

// ---------------------------------------------------------------- hits and present solve
// Kinematic quantities of one root for receiver (Xi, Vi) at T.
export function hitKinematics(root, Vi) {
  const { n, R, Dt, Vj } = root;
  const Dr = CF - dot(n, Vi), p = Dr / Dt;
  const w = sub(Vi, scale(Vj, p)); const nw = dot(n, w); const wperp = sub(w, scale(n, nw));
  const wperp2 = dot(wperp, wperp);
  return { Dr, p, Rdot: CF * (1 - p), w, wperp2, nAj: dot(n, root.Aj) };
}
export function rddotOf(root, kin, Ai) { return (CF / root.Dt) * (dot(root.n, Ai) - kin.p * kin.p * kin.nAj + kin.wperp2 / root.R); }

function det3(M) {
  return M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
}
function solve3(M, b) {
  const A = M.map(r => r.slice()), x = b.slice(), n = 3;
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    if (!(Math.abs(A[p][k]) > 0)) throw new DomainExitError('singular present-acceleration block', {});
    if (p !== k) { [A[p], A[k]] = [A[k], A[p]]; [x[p], x[k]] = [x[k], x[p]]; }
    for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; x[i] -= f * x[k]; }
  }
  for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
  return x;
}

// Present acceleration of receiver i at T. members[k] = { q, hist }, present X/V arrays
// for all members. opt.prescribedAi: evaluate the hits with a given receiver
// acceleration instead of solving (controls). opt.side: history side at exact break times.
export function presentAcceleration(T, i, X, V, members, coeff, state, opt = {}) {
  const { lambda, mu, K } = coeff; const N = members.length; const roots = [];
  const M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], b = [0, 0, 0];
  const Xi = X[i], Vi = V[i];
  if (!opt.prescribedAi && norm(Vi) >= CF) throw new DomainExitError(`speed-equality: receiver ${i} speed ${norm(Vi)} reached c_f (census change outside the regular chart; a self root may appear)`, { T, i, speed: norm(Vi), retry: true, event: 'speed-equality' });
  let lagMax = 0;
  for (let j = 0; j < N; j++) {
    if (j === i) continue;
    const sigma = Math.sign(members[i].q * members[j].q);
    const guess = state?.lag?.[i]?.[j] ?? norm(sub(Xi, X[j]));
    const root = partnerRoot(T, Xi, members[j].hist, guess, { side: opt.side });
    if (!root.monotone) throw new DomainExitError('arrival function not monotone on the bracket (D_t <= 0 sampled): root uniqueness not established', { T, i, j });
    if (state?.lag) state.lag[i][j] = root.lag;
    lagMax = Math.max(lagMax, root.lag);
    const kin = hitKinematics(root, Vi);
    const pref = sigma * K * CF / (root.R * root.R * Math.abs(root.Dt));
    const known = 1 + lambda * kin.Rdot * kin.Rdot / (CF * CF) + mu * (kin.wperp2 - root.R * kin.p * kin.p * kin.nAj) / (CF * root.Dt);
    const cu = sigma * K * mu / (root.R * Math.abs(root.Dt) * root.Dt);
    for (let a = 0; a < 3; a++) {
      b[a] += pref * known * root.n[a];
      for (let c = 0; c < 3; c++) M[a][c] -= cu * root.n[a] * root.n[c];
    }
    roots.push({ j, sigma, root, kin, pref });
  }
  // self-root census on the receiver's own history
  const census = selfRootCensus(T, Xi, members[i].hist, Math.max(4 * lagMax, 1e-6));
  if (census.count > 0) throw new DomainExitError('self-root-census: sampled self-root census changed (sign change of |X_i(T)-X_i(S)|-(T-S)); outside the regular chart', { T, i, census, retry: true, event: 'self-root-census' });
  const det = det3(M);
  let A, solved = true;
  if (opt.prescribedAi) { A = opt.prescribedAi.slice(); solved = false; }
  else A = solve3(M, b);
  const hits = roots.map(({ j, sigma, root, kin, pref }) => {
    const Rddot = rddotOf(root, kin, A);
    const bracket = 1 + lambda * kin.Rdot * kin.Rdot / (CF * CF) + mu * root.R * Rddot / (CF * CF);
    return { j, sigma, S: root.S, lag: root.lag, R: root.R, n: root.n, Dt: root.Dt, Dr: kin.Dr, p: kin.p, Rdot: kin.Rdot, Rddot, bracket, wperp2: kin.wperp2, nAj: kin.nAj, hit: scale(root.n, pref * bracket), residual: root.residual, iterations: root.iterations, residualFloor: root.residualFloor };
  });
  if (!opt.prescribedAi) {
    // law residual: A must equal the sum of hits with Rddot recomputed from A
    const sumHit = hits.reduce((s, h) => add(s, h.hit), [0, 0, 0]);
    const res = norm(sub(A, sumHit)) / Math.max(1e-300, norm(A));
    if (!(res < 1e-9)) throw new Error(`present solve inconsistent: relative law residual ${res}`);
  }
  return { A, det, M, b, hits, census, solved };
}

// ---------------------------------------------------------------- diagnostics
export function pairDiagnostics(X, V, K = 1) {
  const r = sub(X[0], X[1]), rd = sub(V[0], V[1]); const rn = norm(r);
  const e = scale(r, 1 / rn); const rdot = dot(e, rd); const hv = cross(r, rd); const h = norm(hv);
  const eps = 0.5 * (1 + 2 * K / (CF * CF * rn)) * rdot * rdot + h * h / (2 * rn * rn) - 2 * K / rn;
  return { r: rn, rdot, h, rhoH: h * h / (4 * K), eps, speeds: V.map(norm), hAxis: h > 0 ? scale(hv, 1 / h) : [0, 0, 1] };
}

// ---------------------------------------------------------------- integrators (f(T, y))
const DP = {
  c: [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1],
  a: [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9], [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
    [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656], [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]],
  b: [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0],
  e: [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40],
};
function scaledErr(y0, y1, err, atol, rtol) { let m = 0; for (let i = 0; i < y0.length; i++) { const sc = atol + rtol * Math.max(Math.abs(y0[i]), Math.abs(y1[i])); m = Math.max(m, Math.abs(err[i]) / sc); } return m; }
export function makeStepper(method, f, opt) {
  const rtol = opt.rtol ?? 1e-10, atol = opt.atol ?? 1e-14;
  if (method === 'rk4') return {
    method, adaptive: false, order: 4,
    step(t, y0, f0, h) {
      const n = y0.length, tmp = new Float64Array(n);
      const k1 = f0; for (let i = 0; i < n; i++) tmp[i] = y0[i] + 0.5 * h * k1[i]; const k2 = f(t + h / 2, tmp);
      for (let i = 0; i < n; i++) tmp[i] = y0[i] + 0.5 * h * k2[i]; const k3 = f(t + h / 2, tmp);
      for (let i = 0; i < n; i++) tmp[i] = y0[i] + h * k3[i]; const k4 = f(t + h, tmp);
      const y = new Float64Array(n); for (let i = 0; i < n; i++) y[i] = y0[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
      return { y, err: 0, hNew: h };
    },
  };
  if (method === 'dp54') return {
    method, adaptive: true, order: 5,
    step(t, y0, f0, h) {
      const n = y0.length, k = [f0], tmp = new Float64Array(n);
      for (let s = 1; s < 7; s++) {
        for (let i = 0; i < n; i++) { let acc = 0; for (let m = 0; m < s; m++) acc += DP.a[s][m] * k[m][i]; tmp[i] = y0[i] + h * acc; }
        k.push(f(t + DP.c[s] * h, Float64Array.from(tmp)));
      }
      const y = new Float64Array(n), err = new Float64Array(n);
      for (let i = 0; i < n; i++) { let acc = 0, ea = 0; for (let m = 0; m < 7; m++) { acc += DP.b[m] * k[m][i]; ea += DP.e[m] * k[m][i]; } y[i] = y0[i] + h * acc; err[i] = h * ea; }
      const E = scaledErr(y0, y, err, atol, rtol);
      const fac = Math.min(5, Math.max(0.2, 0.9 * Math.pow(Math.max(E, 1e-300), -0.2)));
      return { y, err: E, hNew: h * fac };
    },
  };
  throw new Error(`unknown method ${method}`);
}

// ---------------------------------------------------------------- pasts from a case
export function buildPast(spec, memberIndex, cache = {}) {
  const m = spec.members[memberIndex], p = m.past;
  if (p.kind === 'rigid-circle') return rigidCirclePast(p);
  if (p.kind === 'stationary') return stationaryPast(p.x);
  if (p.kind === 'affine') return affinePast(p.b, p.v);
  if (p.kind === 'section9-backward') {
    if (!cache.s9) cache.s9 = section9BackwardPast(spec);
    return tabulatedPast(cache.s9.members[memberIndex]);
  }
  throw new Error(`unknown past kind ${p.kind}`);
}

// Section 9 backward past: the instantaneous Section 9 law is even in velocities
// (it depends on V only through rdot^2 and |w_perp|^2), so reversing all velocities
// and integrating forward over [0, L] with the frozen Section 9 instrument gives the
// backward solution X(-t), V -> -V, A unchanged. Dense records, Hermite interpolation.
export function section9BackwardPast(spec, opt = {}) {
  const L = opt.length ?? spec.pastLength ?? 40, hmax = opt.hmax ?? spec.pastHmax ?? 0.02, rtol = opt.rtol ?? 1e-12;
  const stem = spec.name ?? 'case';
  const cacheFile = path.join(DATA_ROOT, `${stem}.section9-past.json`);
  if (fs.existsSync(cacheFile) && !opt.force) {
    const c = JSON.parse(fs.readFileSync(cacheFile, 'utf8'));
    if (c.length === L && c.hmax === hmax && c.rtol === rtol) return c;
  }
  const N = spec.members.length;
  const s9spec = {
    name: `${stem}-s9-backward`,
    members: spec.members.map(m => ({ x: m.x.slice(), v: m.v.map(z => -z), q: m.q })),
    coefficients: { lambda: -0.5, mu: 1, K: spec.coefficients?.K ?? 1, cf: 1 },
    integrator: { method: 'gbs', rtol, atol: 1e-14, hmax },
    events: { turning: { record: false }, speed: { record: true, stop: false }, rEscape: 1e4 },
    tEnd: L, candidate: 'weber', condition: 'none', output: { every: 1 },
  };
  const P = S9.makeParams({ q: s9spec.members.map(m => m.q), K: s9spec.coefficients.K, lambda: -0.5, mu: 1, cf: 1, condition: 'none' });
  const recs = [];
  const summary = S9.runCase(s9spec, { onRecord: rec => { if (rec.type === 'state') recs.push(rec); } });
  if (summary.termination.reason !== 'final-time') throw new Error(`Section 9 backward past did not reach ${L}: ${JSON.stringify(summary.termination)}`);
  // reverse: S = -t, V -> -V, A from the Section 9 solve on the recorded state
  recs.sort((a, b) => b.t - a.t);
  const members = Array.from({ length: N }, () => ({ t: [], x: [], v: [], a: [] }));
  let lastT = null;
  for (const rec of recs) {
    if (lastT !== null && rec.t === lastT) continue; lastT = rec.t;
    const y = new Float64Array(6 * N); for (let k = 0; k < 3 * N; k++) { y[k] = rec.x[k]; y[3 * N + k] = rec.v[k]; }
    const sol = S9.solveAccelerations(y, P);
    for (let i = 0; i < N; i++) {
      members[i].t.push(-rec.t);
      members[i].x.push(rec.x.slice(3 * i, 3 * i + 3));
      members[i].v.push(rec.v.slice(3 * i, 3 * i + 3).map(z => -z));
      members[i].a.push(Array.from(sol.A.slice(3 * i, 3 * i + 3)));
    }
  }
  const out = { kind: 'section9-backward', length: L, hmax, rtol, records: members[0].t.length, members, s9summary: { termination: summary.termination, nfev: summary.nfev, steps: summary.steps, maxSpeed: summary.diagnostics.maxSpeed, candidateDrift: summary.diagnostics.maxRelDriftCandidate, events: summary.events.length } };
  fs.mkdirSync(DATA_ROOT, { recursive: true });
  fs.writeFileSync(cacheFile, JSON.stringify(out));
  return out;
}

// ---------------------------------------------------------------- run a case
function lsqSlope(ts, ys) {
  const n = ts.length; if (n < 2) return null;
  let mt = 0, my = 0; for (let k = 0; k < n; k++) { mt += ts[k]; my += ys[k]; } mt /= n; my /= n;
  let sxx = 0, sxy = 0; for (let k = 0; k < n; k++) { sxx += (ts[k] - mt) ** 2; sxy += (ts[k] - mt) * (ys[k] - my); }
  return sxx > 0 ? sxy / sxx : null;
}

export function runCase(spec, hooks = {}) {
  const coeff = { lambda: spec.coefficients?.lambda ?? -0.5, mu: spec.coefficients?.mu ?? 1, K: spec.coefficients?.K ?? 1, cf: spec.coefficients?.cf ?? 1 };
  if (coeff.cf !== 1) throw new Error('c_f must be instantiated as 1 in every numerical run');
  const integ = { ...(spec.integrator ?? {}) };
  if (spec.refine) { integ.rtol = (integ.rtol ?? 1e-10) / 100; integ.atol = (integ.atol ?? 1e-14) / 100; if (integ.h) integ.h /= 100; }
  const method = integ.method ?? 'dp54';
  const tEnd = spec.tEnd; if (!(tEnd > 0)) throw new Error('tEnd must be positive');
  const ev = { rContact: 1e-6, rEscape: 1e3, detMin: 1e-8, ...(spec.events ?? {}) };
  const N = spec.members.length;
  const cache = {};
  const members = spec.members.map((m, i) => ({ q: m.q, evolve: m.evolve !== false, hist: null }));
  for (let i = 0; i < N; i++) members[i].hist = new MemberHistory(buildPast(spec, i, cache), !members[i].evolve);
  const pastInfo = cache.s9 ? { kind: 'section9-backward', length: cache.s9.length, records: cache.s9.records, hmax: cache.s9.hmax, rtol: cache.s9.rtol, s9summary: cache.s9.s9summary } : { kind: spec.members.map(m => m.past.kind).join(',') };
  const evolving = members.map((m, i) => i).filter(i => members[i].evolve);
  const nE = evolving.length;
  // state vector y = [X_e (3 nE), V_e (3 nE)] for evolving members
  const unpack = (T, y) => {
    const X = [], V = [];
    for (let i = 0; i < N; i++) {
      const k = evolving.indexOf(i);
      if (k >= 0) { X.push([y[3 * k], y[3 * k + 1], y[3 * k + 2]]); V.push([y[3 * nE + 3 * k], y[3 * nE + 3 * k + 1], y[3 * nE + 3 * k + 2]]); }
      else { const p = members[i].hist.past.eval(T); X.push(p.x); V.push(p.v); }
    }
    return { X, V };
  };
  const y0 = new Float64Array(6 * nE);
  evolving.forEach((i, k) => { for (let a = 0; a < 3; a++) { y0[3 * k + a] = spec.members[i].x[a]; y0[3 * nE + 3 * k + a] = spec.members[i].v[a]; } });
  const lagState = { lag: Array.from({ length: N }, () => new Array(N).fill(null)) };
  let nfev = 0;
  const evaluate = (T, y, side = '+') => {
    nfev++;
    const { X, V } = unpack(T, y);
    const per = [];
    const dy = new Float64Array(6 * nE);
    evolving.forEach((i, k) => {
      const sol = presentAcceleration(T, i, X, V, members, coeff, lagState, { side });
      per.push(sol);
      for (let a = 0; a < 3; a++) { dy[3 * k + a] = V[i][a]; dy[3 * nE + 3 * k + a] = sol.A[a]; }
    });
    return { dy, per, X, V };
  };
  const ctx = { side: '+' };
  const f = (T, y) => evaluate(T, y, ctx.side).dy;
  const stepper = makeStepper(method, f, integ);
  if (method === 'rk4' && !integ.h) throw new Error('rk4 requires integrator.h');

  // release: compatibility defect
  const wall0 = Date.now();
  let T = 0, y = y0;
  let cur = evaluate(T, y, '+');
  const releaseDefect = evolving.map((i, k) => {
    const aPast = members[i].hist.past.eval(0).a; const d = sub(cur.per[k].A, aPast);
    return { member: i, aPast, aLaw: cur.per[k].A, defect: d, magnitude: norm(d), tangential: Math.abs(dot(d, scale(cur.V[i], 1 / Math.max(norm(cur.V[i]), 1e-300)))) };
  });
  evolving.forEach((i, k) => members[i].hist.push(0, cur.X[i], cur.V[i], cur.per[k].A, members[i].hist.past.eval(0).a));
  // breaking points: times at which a transmitter's acceleration jumps; receivers track reception
  const breaks = members.map(m => (m.evolve ? [0] : [])), pend = members.map(() => members.map(() => 0));
  const jumps = []; let jumpGen1 = null;
  const minLag = () => Math.min(...cur.per.flatMap(p => p.hits.map(h => h.lag)));
  const hmaxSpec = integ.hmax ?? tEnd / 50, hmin = integ.hmin ?? 1e-14 * Math.max(1, tEnd);
  let h = integ.h ?? integ.h0 ?? Math.min(hmaxSpec, 1e-3 * tEnd, minLag() / 4);

  // bookkeeping
  const Ts = [], rho2s = [], hs = [], events = [], turning = [];
  const stats = { speedMax: new Array(N).fill(0), speedMin: new Array(N).fill(Infinity), detMin: new Array(N).fill(Infinity), detMax: new Array(N).fill(-Infinity), rMin: Infinity, rMax: -Infinity, maxResidual: 0, maxResidualFloor: 0, maxCensus: 0, bracketMin: Infinity, bracketMax: -Infinity, RdotMax: 0, RddotMax: 0, pMin: Infinity, pMax: -Infinity, DtMin: Infinity, rejects: 0, steps: 0, hMin: Infinity, hMax: 0 };
  const out = hooks.onRecord ?? (() => {});
  const every = spec.output?.every ?? 1;
  const diagOf = (TT, XX, VV, per) => {
    const D = nE === 2 && N === 2 ? pairDiagnostics(XX, VV, coeff.K) : { r: norm(sub(XX[0], XX[1])), rdot: 0, h: 0, rhoH: 0, eps: 0, speeds: VV.map(norm) };
    return D;
  };
  const record = (TT, XX, VV, per, extra = {}) => {
    const D = diagOf(TT, XX, VV, per);
    Ts.push(TT); rho2s.push(D.rhoH * D.rhoH); hs.push(D.h);
    D.speeds.forEach((s, i) => { stats.speedMax[i] = Math.max(stats.speedMax[i], s); stats.speedMin[i] = Math.min(stats.speedMin[i], s); });
    per.forEach((p, k) => { const i = evolving[k]; stats.detMin[i] = Math.min(stats.detMin[i], p.det); stats.detMax[i] = Math.max(stats.detMax[i], p.det); stats.maxCensus = Math.max(stats.maxCensus, p.census.count);
      for (const hh of p.hits) { stats.maxResidual = Math.max(stats.maxResidual, Math.abs(hh.residual)); stats.maxResidualFloor = Math.max(stats.maxResidualFloor, hh.residualFloor); stats.bracketMin = Math.min(stats.bracketMin, hh.bracket); stats.bracketMax = Math.max(stats.bracketMax, hh.bracket); stats.RdotMax = Math.max(stats.RdotMax, Math.abs(hh.Rdot)); stats.RddotMax = Math.max(stats.RddotMax, Math.abs(hh.Rddot)); stats.pMin = Math.min(stats.pMin, hh.p); stats.pMax = Math.max(stats.pMax, hh.p); stats.DtMin = Math.min(stats.DtMin, hh.Dt); } });
    stats.rMin = Math.min(stats.rMin, D.r); stats.rMax = Math.max(stats.rMax, D.r);
    return { type: 'state', T: TT, x: XX, v: VV, a: per.map(p => p.A), r: D.r, rdot: D.rdot, h: D.h, rhoH: D.rhoH, eps: D.eps, speeds: D.speeds, det: per.map(p => p.det), census: per.map(p => p.census.count),
      roots: per.map(p => p.hits.map(hh => ({ j: hh.j, S: hh.S, lag: hh.lag, R: hh.R, Dt: hh.Dt, p: hh.p, Rdot: hh.Rdot, Rddot: hh.Rddot, bracket: hh.bracket, residual: hh.residual }))), ...extra };
  };
  const first = record(0, cur.X, cur.V, cur.per, { initial: true, releaseDefect });
  out(first);
  const D0 = diagOf(0, cur.X, cur.V, cur.per);
  let prevD = D0;
  const initialViolations = [];
  if (D0.r > ev.rEscape) initialViolations.push({ name: 'escape', r: D0.r, threshold: ev.rEscape, note: 'initial separation already above the frozen escape threshold; the escape event is reported only on a crossing' });
  if (D0.r < ev.rContact) initialViolations.push({ name: 'contact', r: D0.r, threshold: ev.rContact });

  // predicted reception time of break tau of transmitter j by receiver i, from quadratic extrapolation of X_i
  const predictBreak = (i, j, tau, Xi, Vi, Ai, Xjtau) => {
    let Tstar = T + Math.max(0, tau - (lagState.lag[i][j] != null ? T - lagState.lag[i][j] : T));
    for (let it = 0; it < 30; it++) {
      const dt = Tstar - T; const Xp = add(add(Xi, scale(Vi, dt)), scale(Ai, 0.5 * dt * dt)); const Vp = add(Vi, scale(Ai, dt));
      const d = sub(Xp, Xjtau); const R = norm(d); const g = R - (Tstar - tau); const n = scale(d, 1 / R);
      const dg = dot(n, Vp) - 1; const step = -g / dg; Tstar += step;
      if (Math.abs(step) < 1e-13 * Math.max(1, Math.abs(Tstar))) break;
    }
    return Tstar;
  };

  let termination = null;
  const maxSteps = integ.maxSteps ?? 5e6;
  const historyMark = members.map(m => m.hist.t.length);
  while (!termination) {
    if (T >= tEnd) { termination = { reason: 'final-time', T }; break; }
    if (stats.steps >= maxSteps) { termination = { reason: 'max-steps', T }; break; }
    const lagNow = minLag();
    let hTry = Math.min(h, hmaxSpec, lagNow / 4, tEnd - T);
    // breaking points: clip the step to the next predicted reception of a pending break
    let flagged = null;
    for (const i of evolving) for (let j = 0; j < N; j++) {
      if (j === i || pend[i][j] >= breaks[j].length) continue;
      const tau = breaks[j][pend[i][j]];
      const k = evolving.indexOf(i);
      const Tstar = predictBreak(i, j, tau, cur.X[i], cur.V[i], cur.per[k].A, members[j].hist.eval(tau, '+').x);
      if (Tstar > T + 1e-12 && Tstar - T <= hTry * (1 + 1e-9)) { hTry = Tstar - T; flagged = { i, j, tau }; }
    }
    let res, nxt, Tn;
    try {
      let attempt = 0;
      for (;;) {
        attempt++;
        ctx.side = flagged ? '-' : '+';
        res = stepper.step(T, y, cur.dy, hTry);
        if (res.err > 1 && stepper.adaptive) { stats.rejects++; h = res.hNew; if (h < hmin) termination = { reason: 'step-underflow', T }; break; }
        for (let k = 0; k < res.y.length; k++) if (!Number.isFinite(res.y[k])) throw new DomainExitError('non-finite state', { T, retry: true });
        Tn = (hTry >= tEnd - T && !flagged) ? tEnd : T + hTry;
        if (flagged) {
          // land the step end exactly on the reception time: g = S_ij(Tn) - tau, dS/dT = p ~ 1
          const { X } = unpack(Tn, res.y);
          const root = partnerRoot(Tn, X[flagged.i], members[flagged.j].hist, lagState.lag[flagged.i][flagged.j] ?? 1, { side: '-' });
          const g = root.S - flagged.tau;
          if (Math.abs(g) > 1e-11 * Math.max(1, Math.abs(Tn)) && attempt < 8) { const kin = hitKinematics(root, unpack(Tn, res.y).V[flagged.i]); hTry -= g / Math.max(kin.p, 0.1); if (!(hTry > hmin)) hTry = hmin; continue; }
        }
        break;
      }
      if (termination) break;
      ctx.side = '+';
      if (res.err > 1 && stepper.adaptive) continue;
      nxt = evaluate(Tn, res.y, flagged ? '-' : '+');
    } catch (err) {
      ctx.side = '+';
      if (!(err instanceof DomainExitError)) throw err;
      const name = err.info?.event ?? 'domain-exit';
      const stopHere = !stepper.adaptive || !err.info?.retry || hTry * 0.25 < Math.max(hmin, 1e-10 * Math.max(1, T));
      if (stopHere) {
        const rec = { type: 'event', name, T, boundaryBefore: T + hTry, message: err.message, info: err.info, speeds: cur.V.map(norm), stop: true };
        events.push(rec); out(rec);
        termination = { reason: name, T, message: err.message, info: err.info, event: rec }; break;
      }
      stats.rejects++; h = hTry * 0.25;
      continue;
    }
    // accepted step
    const Xn = nxt.X, Vn = nxt.V;
    const Dn = diagOf(Tn, Xn, Vn, nxt.per);
    // events located inside the step by quintic Hermite interpolation of both members
    const interp = tt => {
      const XX = [], VV = [];
      for (let i = 0; i < N; i++) {
        const k = evolving.indexOf(i);
        if (k < 0) { const p = members[i].hist.past.eval(tt); XX.push(p.x); VV.push(p.v); continue; }
        const hh = hermite5(tt, T, Tn, cur.X[i], cur.V[i], cur.per[k].A, Xn[i], Vn[i], nxt.per[k].A); XX.push(hh.x); VV.push(hh.v);
      }
      return pairDiagnostics(XX, VV, coeff.K);
    };
    const locate = (g0, g1, fn) => { let lo = T, hi = Tn, glo = g0; for (let it = 0; it < 60 && hi - lo > 1e-14 * Math.max(1, Tn); it++) { const m = 0.5 * (lo + hi); const gm = fn(m); if (Math.sign(gm) === Math.sign(glo)) { lo = m; glo = gm; } else hi = m; } return 0.5 * (lo + hi); };
    let stop = null;
    if (N === 2 && nE === 2) {
      if (prevD.rdot * Dn.rdot < 0) {
        const tt = locate(prevD.rdot, Dn.rdot, t => interp(t).rdot); const Dt = interp(tt);
        const rec = { type: 'event', name: 'turning', T: tt, r: Dt.r, h: Dt.h, turn: prevD.rdot < 0 ? 'minimum' : 'maximum' }; turning.push(rec); events.push(rec); out(rec);
      }
      if (Dn.r < ev.rContact && prevD.r >= ev.rContact) { const tt = locate(prevD.r - ev.rContact, Dn.r - ev.rContact, t => interp(t).r - ev.rContact); stop = { name: 'contact', T: tt, r: interp(tt).r }; }
      if (!stop && Dn.r > ev.rEscape && prevD.r <= ev.rEscape) { const tt = locate(prevD.r - ev.rEscape, Dn.r - ev.rEscape, t => interp(t).r - ev.rEscape); stop = { name: 'escape', T: tt, r: interp(tt).r }; }
    }
    if (!stop) for (let i = 0; i < N; i++) if (Dn.speeds[i] >= CF) {
      const tt = locate(prevD.speeds[i] - CF, Dn.speeds[i] - CF, t => interp(t).speeds[i] - CF);
      stop = { name: 'speed-equality', member: i, T: tt, speed: Dn.speeds[i], note: 'census change outside the regular chart: a self root may appear; run stopped without remedy' };
    }
    if (!stop) nxt.per.forEach((p, k) => { if (Math.abs(p.det) < ev.detMin && !stop) stop = { name: 'obstruction', member: evolving[k], T: Tn, det: p.det }; });
    if (stop) { const rec = { type: 'event', ...stop, stop: true }; events.push(rec); out(rec); termination = { reason: stop.name, T: stop.T, event: rec }; }

    // commit history; breaking-point two-sided accelerations
    let extra = {};
    if (flagged) {
      const plus = evaluate(Tn, res.y, '+');
      evolving.forEach((i, k) => {
        // a receiver whose root at Tn sits on a pending break of transmitter j receives a jump now
        let got = false;
        for (let j = 0; j < N; j++) {
          if (j === i || pend[i][j] >= breaks[j].length) continue;
          const tau = breaks[j][pend[i][j]], hit = nxt.per[k].hits.find(hh => hh.j === j);
          if (hit && Math.abs(hit.S - tau) <= 1e-9 * Math.max(1, Math.abs(tau))) {
            const jump = sub(plus.per[k].A, nxt.per[k].A); const mag = norm(jump);
            const gen = breaks[j].indexOf(tau) + 1;
            const rec = { type: 'event', name: 'acceleration-jump', T: Tn, member: i, transmitter: j, emission: tau, generation: gen, aMinus: nxt.per[k].A, aPlus: plus.per[k].A, magnitude: mag, rootR: hit.R, Dt: hit.Dt, geometricFactor: coeff.K / (hit.R * hit.Dt * hit.Dt) };
            if (jumps.length < 400) jumps.push(rec); events.push(rec); out(rec);
            if (gen === 1 && (jumpGen1 === null || mag > jumpGen1.magnitude)) jumpGen1 = rec;
            pend[i][j]++; got = true;
            if (mag > 0) breaks[i].push(Tn);
          }
        }
        members[i].hist.push(Tn, Xn[i], Vn[i], plus.per[k].A, got ? nxt.per[k].A : null);
      });
      nxt = plus; extra = { breakingPoint: true };
    } else {
      evolving.forEach((i, k) => members[i].hist.push(Tn, Xn[i], Vn[i], nxt.per[k].A));
    }
    // breaks passed without landing (prediction failure): advance and note
    for (const i of evolving) for (let j = 0; j < N; j++) {
      if (j === i) continue;
      while (pend[i][j] < breaks[j].length) {
        const tau = breaks[j][pend[i][j]], hit = nxt.per[evolving.indexOf(i)].hits.find(hh => hh.j === j);
        if (hit && hit.S > tau + 1e-9 * Math.max(1, Math.abs(tau))) { const rec = { type: 'event', name: 'break-crossed-inside-step', T: Tn, member: i, transmitter: j, emission: tau }; events.push(rec); pend[i][j]++; } else break;
      }
    }
    stats.steps++; stats.hMin = Math.min(stats.hMin, hTry); stats.hMax = Math.max(stats.hMax, hTry);
    T = Tn; y = res.y; cur = nxt; prevD = Dn;
    if (stepper.adaptive) h = Math.max(res.hNew, hmin);
    const line = record(T, cur.X, cur.V, cur.per, { ...extra, ...(T >= tEnd || termination ? { final: true } : {}) });
    if (stats.steps % every === 0 || T >= tEnd || termination) out(line);
    if (hooks.heartbeat && stats.steps % (hooks.heartbeatEvery ?? 2000) === 0) hooks.heartbeat({ T, steps: stats.steps, nfev });
  }

  // summary: secular slope of rho_h^2 on a uniform grid of the stored histories (sampling independent), plus the per-step sample slope
  const half = Ts.length >> 1;
  const slopeSteps = { full: lsqSlope(Ts, rho2s), firstHalf: lsqSlope(Ts.slice(0, half), rho2s.slice(0, half)), secondHalf: lsqSlope(Ts.slice(half), rho2s.slice(half)) };
  let slope = slopeSteps, uniform = null;
  if (N === 2 && nE === 2 && T > 0) {
    const M = Math.min(4000, Math.max(200, Ts.length * 4)); const uT = [], uR = [], uH = [], uRho2 = [], uEps = [];
    for (let k = 0; k <= M; k++) {
      const tt = T * k / M; const XX = [], VV = [];
      for (const i of evolving) { const q = members[i].hist.eval(Math.min(tt, members[i].hist.lastT), '+'); XX.push(q.x); VV.push(q.v); }
      const D = pairDiagnostics(XX, VV, coeff.K); uT.push(tt); uR.push(D.r); uH.push(D.h); uRho2.push(D.rhoH * D.rhoH); uEps.push(D.eps);
    }
    const hM = uT.length >> 1;
    slope = { full: lsqSlope(uT, uRho2), firstHalf: lsqSlope(uT.slice(0, hM), uRho2.slice(0, hM)), secondHalf: lsqSlope(uT.slice(hM), uRho2.slice(hM)), grid: 'uniform', points: uT.length };
    const dec = Math.max(1, Math.floor(uT.length / 200));
    uniform = { points: uT.length, T: uT.filter((_, k) => k % dec === 0), r: uR.filter((_, k) => k % dec === 0), h: uH.filter((_, k) => k % dec === 0), eps: uEps.filter((_, k) => k % dec === 0) };
  }
  const cycles = [];
  for (let k = 0; k + 1 < turning.length; k++) cycles.push({ from: turning[k].T, to: turning[k + 1].T, rA: turning[k].r, rB: turning[k + 1].r, typeA: turning[k].turn });
  const Dend = prevD;
  return {
    name: spec.name ?? null, law: 'equation-variants/manuscript.md Section 9a, frozen: Weber bracket on ordinary causal roots, transmitter weight c_f/|D_t|, lambda=-1/2, mu=1, K=c_f=1, self roots admitted when they exist, same-time endpoint excluded, no boundary response, no softening',
    coefficients: coeff, polarities: members.map(m => m.q), method, order: stepper.order, rtol: integ.rtol ?? 1e-10, atol: integ.atol ?? 1e-14, h: integ.h ?? null, hmax: hmaxSpec, refine: !!spec.refine,
    past: pastInfo, tEnd, termination, TFinal: T, steps: stats.steps, rejects: stats.rejects, nfev, wallSeconds: (Date.now() - wall0) / 1000,
    releaseDefect, firstGenerationJump: jumpGen1 ? { T: jumpGen1.T, magnitude: jumpGen1.magnitude, member: jumpGen1.member, geometricFactor: jumpGen1.geometricFactor } : null,
    jumps: jumps.map(j => ({ T: j.T, member: j.member, generation: j.generation, magnitude: j.magnitude, geometricFactor: j.geometricFactor })).slice(0, 60), jumpCount: jumps.length,
    firstEvent: events.find(e => e.name !== 'acceleration-jump' && e.name !== 'break-crossed-inside-step') ?? null,
    eventCounts: events.reduce((m, e) => { m[e.name] = (m[e.name] ?? 0) + 1; return m; }, {}),
    turningCount: turning.length, cycles: cycles.slice(0, 200), turningFirst: turning.slice(0, 6), turningLast: turning.slice(-6),
    initial: { r: D0.r, h: D0.h, rhoH: D0.rhoH, eps: D0.eps, speeds: D0.speeds, det: first.det, roots: first.roots },
    final: { T, r: Dend.r, rdot: Dend.rdot, h: Dend.h, rhoH: Dend.rhoH, eps: Dend.eps, speeds: Dend.speeds, det: cur.per.map(p => p.det), x: cur.X, v: cur.V, a: cur.per.map(p => p.A), roots: cur.per.map(p => p.hits.map(hh => ({ j: hh.j, lag: hh.lag, R: hh.R, Dt: hh.Dt, p: hh.p, Rdot: hh.Rdot, Rddot: hh.Rddot, bracket: hh.bracket }))) },
    hStart: D0.h, hEnd: Dend.h, hChangeRelative: (Dend.h - D0.h) / D0.h, rhoH2Slope: slope, rhoH2SlopeStepSamples: slopeSteps, uniformSeries: uniform, initialViolations, rExtremes: { min: stats.rMin, max: stats.rMax },
    speedExtremes: { max: stats.speedMax, min: stats.speedMin }, detExtremes: { min: stats.detMin, max: stats.detMax },
    rootDiagnostics: { maxResidual: stats.maxResidual, maxResidualFloor: stats.maxResidualFloor, maxSelfRootCensus: stats.maxCensus, bracketMin: stats.bracketMin, bracketMax: stats.bracketMax, RdotMax: stats.RdotMax, RddotMax: stats.RddotMax, pMin: stats.pMin, pMax: stats.pMax, DtMin: stats.DtMin },
    stepSizes: { min: stats.hMin, max: stats.hMax }, records: Ts.length,
  };
}

// ---------------------------------------------------------------- CLI helpers
function writeRun(specPath, flags) {
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  if (flags.refine) spec.refine = true;
  if (flags.tEnd) { spec.tEnd = flags.tEnd; spec.name = `${spec.name}-tEnd${flags.tEnd}`; }
  const stem = flags.stem ?? `${spec.name}${spec.refine ? '-refine' : ''}`;
  fs.mkdirSync(DATA_ROOT, { recursive: true });
  const trajPath = path.join(DATA_ROOT, `${stem}.trajectory.jsonl`), sumPath = path.join(DATA_ROOT, `${stem}.summary.json`);
  const fd = fs.openSync(trajPath, 'w');
  let lines = 0;
  const t0 = Date.now();
  const summary = runCase(spec, { onRecord: rec => { fs.writeSync(fd, JSON.stringify(rec) + '\n'); lines++; }, heartbeat: ({ T, steps }) => process.stderr.write(`  [${spec.name}] T=${T.toFixed(3)} steps=${steps} wall=${((Date.now() - t0) / 1000).toFixed(1)}s\n`) });
  fs.closeSync(fd);
  summary.files = { trajectory: path.relative(REPO_ROOT, trajPath), summary: path.relative(REPO_ROOT, sumPath), lines, case: path.relative(REPO_ROOT, specPath) };
  summary.node = process.version; summary.recordedAt = new Date().toISOString();
  fs.writeFileSync(sumPath, JSON.stringify(summary, null, 1));
  return summary;
}

export function appendRunsRecord(summary, label) {
  let rec = { schema: 'weber-delayed-pair-runs.v1', ownerTask: OWNER_TASK, instrument: 'weber-delayed-pair-instrument.mjs', law: summary.law, runs: [] };
  if (fs.existsSync(RUNS_PATH)) rec = JSON.parse(fs.readFileSync(RUNS_PATH, 'utf8'));
  const entry = {
    label, name: summary.name, refine: summary.refine, method: summary.method, rtol: summary.rtol, hmax: summary.hmax, past: summary.past.kind, pastRecords: summary.past.records ?? null,
    tEnd: summary.tEnd, termination: summary.termination, firstEvent: summary.firstEvent, eventCounts: summary.eventCounts,
    initial: { r: summary.initial.r, h: summary.initial.h, rhoH: summary.initial.rhoH, eps: summary.initial.eps, speeds: summary.initial.speeds, det: summary.initial.det },
    final: { T: summary.final.T, r: summary.final.r, rdot: summary.final.rdot, h: summary.final.h, rhoH: summary.final.rhoH, eps: summary.final.eps, speeds: summary.final.speeds, det: summary.final.det },
    hStart: summary.hStart, hEnd: summary.hEnd, hChangeRelative: summary.hChangeRelative, rhoH2Slope: summary.rhoH2Slope, rhoH2SlopeStepSamples: summary.rhoH2SlopeStepSamples, initialViolations: summary.initialViolations, rExtremes: summary.rExtremes,
    turningCount: summary.turningCount, cyclesFirst: summary.cycles.slice(0, 5), cyclesLast: summary.cycles.slice(-5),
    speedExtremes: summary.speedExtremes, detExtremes: summary.detExtremes, releaseDefect: summary.releaseDefect.map(d => ({ member: d.member, magnitude: d.magnitude, tangential: d.tangential })),
    firstGenerationJump: summary.firstGenerationJump, jumpCount: summary.jumpCount, jumpsFirst: summary.jumps.slice(0, 4),
    rootDiagnostics: summary.rootDiagnostics, steps: summary.steps, rejects: summary.rejects, nfev: summary.nfev, wallSeconds: summary.wallSeconds, stepSizes: summary.stepSizes, files: summary.files, recordedAt: summary.recordedAt, node: summary.node,
  };
  rec.runs = rec.runs.filter(r => r.label !== label);
  rec.runs.push(entry);
  fs.writeFileSync(RUNS_PATH, JSON.stringify(rec, null, 1));
  return entry;
}

// ---------------------------------------------------------------- known cases
export function runControls() {
  const results = []; const t0 = Date.now();
  const push = (name, pass, measured, reference, tolerance, note) => { results.push({ name, pass: !!pass, measured, reference, tolerance, note }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name}`); };
  const frozen = { lambda: -0.5, mu: 1, K: 1, cf: 1 }, canon = { lambda: 0, mu: 0, K: 1, cf: 1 };

  // 1. stationary separated pair at range 2 (prescribed stationary paths, hit evaluated with A_i = 0)
  {
    const mem = [{ q: -1, hist: new MemberHistory(stationaryPast([1, 0, 0]), true) }, { q: 1, hist: new MemberHistory(stationaryPast([-1, 0, 0]), true) }];
    const X = [[1, 0, 0], [-1, 0, 0]], V = [[0, 0, 0], [0, 0, 0]];
    const s = presentAcceleration(5, 0, X, V, mem, frozen, null, { prescribedAi: [0, 0, 0] });
    const hh = s.hits[0];
    const solved = presentAcceleration(5, 0, X, V, mem, frozen, null, {});
    const ok = Math.abs(hh.lag - 2) < 1e-13 && Math.abs(hh.Dt - 1) < 1e-15 && Math.abs(hh.Rdot) < 1e-15 && Math.abs(hh.Rddot) < 1e-15 && Math.abs(hh.bracket - 1) < 1e-15 && Math.abs(norm(hh.hit) - 0.25) < 1e-15 && hh.hit[0] < 0 && s.hits.length === 1 && s.census.count === 0;
    push('1 stationary pair range 2', ok, { lag: hh.lag, Dt: hh.Dt, Rdot: hh.Rdot, Rddot: hh.Rddot, bracket: hh.bracket, hitMagnitude: norm(hh.hit), hitDirection: hh.hit.map(z => z / norm(hh.hit)), rootCount: s.hits.length, selfCensus: s.census.count, implicitSolveForComparison: { A: solved.A, det: solved.det, Rddot: solved.hits[0].Rddot, bracket: solved.hits[0].bracket } },
      { lag: 2, Dt: 1, Rdot: 0, Rddot: 0, bracket: 1, hitMagnitude: 0.25, direction: 'toward partner', roots: 1 }, 1e-13, 'prescribed stationary paths; the implicit solve on a held stationary receiver is reported for comparison only (det M = 1 + 1/(R D_t^2) = 1.5)');
  }
  // 2. transverse affine source and general affine closed forms (stationary receiver)
  {
    const mem = [{ q: -1, hist: new MemberHistory(stationaryPast([1, 0, 0]), true) }, { q: 1, hist: new MemberHistory(affinePast([0, 0.3, 0], [0, 0.3, 0]), true) }];
    const X = [[1, 0, 0], mem[1].hist.eval(0).x], V = [[0, 0, 0], [0, 0.3, 0]];
    const s = presentAcceleration(0, 0, X, V, mem, frozen, null, { prescribedAi: [0, 0, 0] });
    const hh = s.hits[0];
    const ok1 = Math.abs(hh.S + 1) < 1e-13 && Math.abs(hh.Rddot - 0.09) < 1e-13 && Math.abs(hh.bracket - 1.09) < 1e-13 && Math.abs(hh.Rdot) < 1e-14 && Math.abs(hh.Dt - 1) < 1e-14;
    // general affine: random d, v with |v| < 1
    let rng = 12345; const rnd = () => { rng = (rng * 1103515245 + 12345) & 0x7fffffff; return rng / 0x7fffffff; };
    let worst = { root: 0, Rdot: 0, Rddot: 0, bracket: 0 };
    for (let k = 0; k < 200; k++) {
      const d = [rnd() * 4 - 2, rnd() * 4 - 2, rnd() * 4 - 2]; const speed = 0.05 + 0.9 * rnd(); let v = [rnd() - 0.5, rnd() - 0.5, rnd() - 0.5]; v = scale(v, speed / norm(v));
      const Xi = [0.3, -0.2, 0.1]; const b = sub(Xi, d); // X_j(T=0) = b, so d = X_i - X_j(0)
      const m2 = [{ q: -1, hist: new MemberHistory(stationaryPast(Xi), true) }, { q: 1, hist: new MemberHistory(affinePast(b, v), true) }];
      const s2 = presentAcceleration(0, 0, [Xi, b], [[0, 0, 0], v], m2, frozen, null, { prescribedAi: [0, 0, 0] });
      const h2 = s2.hits[0];
      const dv = dot(d, v), v2 = dot(v, v), d2 = dot(d, d);
      const tau = (dv + Math.sqrt(dv * dv + (1 - v2) * d2)) / (1 - v2);
      const n = scale(add(d, scale(v, tau)), 1 / tau); const Dt = 1 - dot(n, v); const nv = dot(n, v); const vperp2 = v2 - nv * nv;
      const RdotRef = -nv / Dt, RddotRef = vperp2 / (tau * Dt * Dt * Dt), Bref = 1 - nv * nv / (2 * Dt * Dt) + vperp2 / (Dt * Dt * Dt);
      worst.root = Math.max(worst.root, Math.abs(h2.lag - tau)); worst.Rdot = Math.max(worst.Rdot, Math.abs(h2.Rdot - RdotRef)); worst.Rddot = Math.max(worst.Rddot, Math.abs(h2.Rddot - RddotRef)); worst.bracket = Math.max(worst.bracket, Math.abs(h2.bracket - Bref));
    }
    const ok2 = worst.root < 1e-12 && worst.Rdot < 1e-12 && worst.Rddot < 1e-11 && worst.bracket < 1e-11;
    push('2 transverse affine source and affine closed forms', ok1 && ok2, { S: hh.S, Rdot: hh.Rdot, Rddot: hh.Rddot, bracket: hh.bracket, Dt: hh.Dt, randomAffineWorstAbsErr: worst, randomCases: 200 }, { S: -1, Rddot: 0.09, bracket: 1.09, closedForms: 'tau from the causal quadratic; Rdot=-(n.v)/Dt; Rddot=|v_perp|^2/(R Dt^3)' }, 1e-11, 'stationary receiver, prescribed affine transmitter');
  }
  // 3. zero-coefficient control on the rigid mirror circle, beta = 0.05, rho = 100
  const circleSetup = beta => { const rho = 1 / (4 * beta * beta), Omega = beta / rho; return { rho, Omega, mem: [{ q: -1, hist: new MemberHistory(rigidCirclePast({ rho, Omega, phi0: 0, sign: 1 }), true) }, { q: 1, hist: new MemberHistory(rigidCirclePast({ rho, Omega, phi0: 0, sign: -1 }), true) }], X: [[rho, 0, 0], [-rho, 0, 0]], V: [[0, beta, 0], [0, -beta, 0]], Acirc: [[-Omega * Omega * rho, 0, 0], [Omega * Omega * rho, 0, 0]] }; };
  const scalarD = beta => { let d = 2 * beta; for (let k = 0; k < 200; k++) { const g = d - 2 * beta * Math.cos(d / 2), dg = 1 + beta * Math.sin(d / 2); const nd = d - g / dg; if (Math.abs(nd - d) < 1e-17) { d = nd; break; } d = nd; } return d; };
  {
    const beta = 0.05, c = circleSetup(beta); const d = scalarD(beta);
    const s = presentAcceleration(0, 0, c.X, c.V, c.mem, canon, null, { prescribedAi: c.Acirc[0] });
    const hh = s.hits[0];
    const dInst = hh.lag * c.Omega;
    const R = 2 * c.rho * Math.cos(d / 2), n = [Math.cos(d / 2), -Math.sin(d / 2), 0], Dt = 1 + beta * Math.sin(d / 2);
    const radial = -1 / (4 * c.rho * c.rho * Math.cos(d / 2) * Dt), tang = Math.sin(d / 2) / (4 * c.rho * c.rho * Math.cos(d / 2) ** 2 * Dt);
    const aRad = hh.hit[0], aTan = hh.hit[1];
    const errs = { d: Math.abs(dInst - d), R: Math.abs(hh.R - R), n: norm(sub(hh.n, n)), Dt: Math.abs(hh.Dt - Dt), radial: Math.abs(aRad - radial) / Math.abs(radial), tangential: Math.abs(aTan - tang) / Math.abs(tang), bracket: Math.abs(hh.bracket - 1) };
    const ok = errs.d < 1e-13 && errs.R < 1e-10 && errs.n < 1e-13 && errs.Dt < 1e-14 && errs.radial < 1e-12 && errs.tangential < 1e-10 && errs.bracket < 1e-15 && Math.abs(d - 0.0998753) < 5e-8;
    push('3 zero-coefficient canonical control on rigid circle beta=0.05', ok, { dInstrument: dInst, dScalar: d, R: hh.R, n: hh.n, Dt: hh.Dt, radial: aRad, tangential: aTan, bracket: hh.bracket, relErrors: errs, closedForm: { R, n, Dt, radial, tang }, preregisteredD: 0.0998753 },
      { d: '2 beta cos(d/2) fixed point', radial: '-1/(4 rho^2 cos(d/2) D_t)', tangential: '+sin(d/2)/(4 rho^2 cos^2(d/2) D_t)' }, 1e-10, 'lambda=mu=0 control only; tangential coefficient strictly positive, so no exact circle at this radius');
  }
  // 4. rigid-circle bracket with the frozen coefficients (prescribed circle acceleration), several beta
  {
    const rows = [];
    let ok = true;
    for (const beta of [0.02, 0.05, 0.1, 0.3, 0.7]) {
      const c = circleSetup(beta);
      const s = presentAcceleration(0, 0, c.X, c.V, c.mem, frozen, null, { prescribedAi: c.Acirc[0] });
      const sc = presentAcceleration(0, 0, c.X, c.V, c.mem, canon, null, { prescribedAi: c.Acirc[0] });
      const solved = presentAcceleration(0, 0, c.X, c.V, c.mem, frozen, null, {});
      const hh = s.hits[0];
      const row = { beta, rho: c.rho, Rdot: hh.Rdot, Rddot: hh.Rddot, bracket: hh.bracket, p: hh.p, hitMinusCanonical: norm(sub(hh.hit, sc.hits[0].hit)), implicitSolve: { A: solved.A, det: solved.det, detPredicted: 1 + 1 / (hh.R * hh.Dt * hh.Dt), bracket: solved.hits[0].bracket, Rddot: solved.hits[0].Rddot, defectFromCircle: norm(sub(solved.A, c.Acirc[0])), defectFromCanonical: norm(sub(solved.A, sc.hits[0].hit)) } };
      rows.push(row);
      ok = ok && Math.abs(hh.Rdot) < 1e-12 && Math.abs(hh.Rddot) < 1e-12 && Math.abs(hh.bracket - 1) < 1e-12 && row.hitMinusCanonical < 1e-14 * Math.max(1, norm(hh.hit)) && Math.abs(solved.det - row.implicitSolve.detPredicted) < 1e-13;
    }
    push('4 rigid-circle bracket, frozen coefficients', ok, { rows }, { Rdot: 0, Rddot: 0, bracket: 1, detM: '1 + K/(R D_t^2)' }, 1e-12, 'prescribed rigid circle (receiver acceleration centripetal): Section 9a hit equals the canonical hit; the implicit solve is reported, and its defect from the circle is the release compatibility defect of the SC preparations');
  }
  // 5. slow weakly coupled scaling: Section 9a minus Section 9 on the same Kepler circle history
  {
    const rows = [];
    const P9 = S9.makeParams({ q: [-1, 1], K: 1, lambda: -0.5, mu: 1, cf: 1, condition: 'none' });
    for (const beta of [0.05, 0.025, 0.0125, 0.00625]) {
      const c = circleSetup(beta); const r = 2 * c.rho;
      const s9a = presentAcceleration(0, 0, c.X, c.V, c.mem, frozen, null, {});
      const y = Float64Array.from([...c.X[0], ...c.X[1], ...c.V[0], ...c.V[1]]);
      const sol9 = S9.solveAccelerations(y, P9); const A9 = Array.from(sol9.A.slice(0, 3));
      // Section 9 bracket on the circle: 1 + lambda rdot^2 + mu r rddot, rddot = e.(A1-A2) + |w_perp|^2/r
      const e = [1, 0, 0], w = sub(c.V[0], c.V[1]); const rdot = dot(e, w); const wperp2 = dot(w, w) - rdot * rdot;
      const rddot9 = dot(e, sub(A9, Array.from(sol9.A.slice(3, 6)))) + wperp2 / r;
      const bracket9 = 1 - 0.5 * rdot * rdot + r * rddot9;
      const diff = norm(sub(s9a.A, A9)) * r * r; // normalized by K/r^2
      const predictedFirstOrder = norm(sub(c.V[1], scale(e, 2 * dot(e, c.V[1])))) ; // |v_j - 2(e.v_j)e| = beta
      rows.push({ beta, rho: c.rho, A9a: s9a.A, A9, normalizedDifference: diff, predictedFirstOrder, bracket9Deviation: bracket9 - 1, bracket9a: s9a.hits[0].bracket, det9a: s9a.det });
    }
    // Supplementary off-balance rigid circle (rho' = 1.2 rho_Kepler at the same beta): on the Kepler circle
    // itself the Section 9 bracket is identically one (derived: h^2 = 2Kr there, the exact Section 9 circle),
    // so its deviation cannot be ratioed; the off-balance circle exposes the second-order deviation.
    const rowsOff = [];
    for (const beta of [0.05, 0.025, 0.0125, 0.00625]) {
      const rhoK = 1 / (4 * beta * beta), rho = 1.2 * rhoK, Omega = beta / rho, r = 2 * rho;
      const mem = [{ q: -1, hist: new MemberHistory(rigidCirclePast({ rho, Omega, phi0: 0, sign: 1 }), true) }, { q: 1, hist: new MemberHistory(rigidCirclePast({ rho, Omega, phi0: 0, sign: -1 }), true) }];
      const X = [[rho, 0, 0], [-rho, 0, 0]], V = [[0, beta, 0], [0, -beta, 0]];
      const s9a = presentAcceleration(0, 0, X, V, mem, frozen, null, {});
      const y = Float64Array.from([...X[0], ...X[1], ...V[0], ...V[1]]);
      const sol9 = S9.solveAccelerations(y, P9); const A9 = Array.from(sol9.A.slice(0, 3));
      const e = [1, 0, 0], w = sub(V[0], V[1]); const rdot = dot(e, w); const wperp2 = dot(w, w) - rdot * rdot;
      const rddot9 = dot(e, sub(A9, Array.from(sol9.A.slice(3, 6)))) + wperp2 / r;
      const bracket9 = 1 - 0.5 * rdot * rdot + r * rddot9;
      const predictedBracketDeviation = 4 * beta * beta * (1.2 - 1) / 1.2; // r rddot to leading order on the c rho_K circle: 4 beta^2 (c-1)/c
      rowsOff.push({ beta, rho, normalizedDifference: norm(sub(s9a.A, A9)) * r * r, bracket9Deviation: bracket9 - 1, predictedBracketDeviationLeading: predictedBracketDeviation, bracket9a: s9a.hits[0].bracket });
    }
    const ratios = [], ratiosOff = [];
    let ok = true;
    for (let k = 1; k < rows.length; k++) {
      const rd = rows[k].normalizedDifference / rows[k - 1].normalizedDifference;
      ratios.push({ betaFrom: rows[k - 1].beta, betaTo: rows[k].beta, differenceRatio: rd, bracket9DeviationBoth: [rows[k - 1].bracket9Deviation, rows[k].bracket9Deviation] });
      ok = ok && Math.abs(rd - 0.5) < 0.05 && Math.abs(rows[k].bracket9Deviation) < 1e-12;
      const rdo = rowsOff[k].normalizedDifference / rowsOff[k - 1].normalizedDifference, rbo = rowsOff[k].bracket9Deviation / rowsOff[k - 1].bracket9Deviation;
      ratiosOff.push({ betaFrom: rows[k - 1].beta, betaTo: rows[k].beta, differenceRatio: rdo, bracketRatio: rbo });
      ok = ok && Math.abs(rdo - 0.5) < 0.05 && Math.abs(rbo - 0.25) < 0.025;
    }
    push('5 slow weakly coupled: 9a minus 9 first order in beta, Section 9 bracket deviation second order', ok, { keplerCircle: { rows, ratios, note: 'Section 9 bracket deviation is identically zero on the Kepler circle (it is the exact Section 9 circle h^2 = 2Kr); measured |deviation| < 1e-12 at every beta' }, offBalanceCircle: { rows: rowsOff, ratios: ratiosOff } }, { differenceRatio: 0.5, bracketRatio: 0.25, within: '10% (0.05 and 0.025 absolute)' }, 0.05, 'Section 9 side from the frozen weber-overnight-pair-instrument.mjs solveAccelerations; both laws solved implicitly on identical prescribed rigid-circle histories: the Kepler circle rho = 1/(4 beta^2) as frozen, plus the off-balance circle rho = 1.2/(4 beta^2) added because the frozen case is degenerate for the second-order half');
  }
  // 6. integrator order on a closed-form problem: receiver on a circle about a prescribed stationary source
  {
    // exact circle under Section 9a with a stationary transmitter: D_t = 1, R = r, p = 1, Rdot = 0,
    // Rddot = n.A_i + v^2/r = 0, so A = -K e / r^2 = -v^2/r e  =>  v = sqrt(K/r). r = 4, v = 1/2, period 16 pi.
    const r = 4, v = 0.5, period = 2 * Math.PI * r / v;
    const mk = (method, opts) => ({ name: 'control-6', members: [{ q: -1, x: [r, 0, 0], v: [0, v, 0], past: { kind: 'rigid-circle', rho: r, Omega: v / r, phi0: 0, sign: 1 } }, { q: 1, x: [0, 0, 0], v: [0, 0, 0], evolve: false, past: { kind: 'stationary', x: [0, 0, 0] } }], coefficients: { lambda: -0.5, mu: 1, K: 1, cf: 1 }, integrator: { method, hmax: 1, ...opts }, tEnd: period, output: { every: 1e9 } });
    const errOf = s => Math.hypot(s.final.x[0][0] - r, s.final.x[0][1], s.final.x[0][2]);
    const rk = [];
    for (const h of [1, 0.5, 0.25, 0.125]) { const s = runCase(mk('rk4', { h })); rk.push({ h, err: errOf(s), nfev: s.nfev, releaseDefect: s.releaseDefect[0].magnitude, jump1: s.firstGenerationJump }); }
    const orders = []; for (let k = 1; k < rk.length; k++) orders.push(Math.log2(rk[k - 1].err / rk[k].err));
    const dp = [];
    for (const rtol of [1e-8, 1e-10, 1e-12]) { const s = runCase(mk('dp54', { rtol, atol: rtol * 1e-4 })); dp.push({ rtol, err: errOf(s), nfev: s.nfev, steps: s.steps, rejects: s.rejects }); }
    // Hermite interpolation order on x(t) = (sin t, cos 2t, exp(t/3)): error at midpoints vs spacing
    const fx = t => ({ x: [Math.sin(t), Math.cos(2 * t), Math.exp(t / 3)], v: [Math.cos(t), -2 * Math.sin(2 * t), Math.exp(t / 3) / 3], a: [-Math.sin(t), -4 * Math.cos(2 * t), Math.exp(t / 3) / 9] });
    const herm = [];
    for (const hh of [0.4, 0.2, 0.1, 0.05]) { const p0 = fx(1), p1 = fx(1 + hh), m = fx(1 + hh / 2); const q = hermite5(1 + hh / 2, 1, 1 + hh, p0.x, p0.v, p0.a, p1.x, p1.v, p1.a); herm.push({ h: hh, ex: norm(sub(q.x, m.x)), ev: norm(sub(q.v, m.v)), ea: norm(sub(q.a, m.a)) }); }
    const hermOrders = []; for (let k = 1; k < herm.length; k++) hermOrders.push({ x: Math.log2(herm[k - 1].ex / herm[k].ex), v: Math.log2(herm[k - 1].ev / herm[k].ev), a: Math.log2(herm[k - 1].ea / herm[k].ea) });
    const ok = orders.every(o => o > 3.7 && o < 4.6) && dp[1].err < 1e-7 && dp[2].err < 1e-9 && hermOrders.every(o => o.x > 5.5 && o.v > 4.5 && o.a > 3.5) && rk.every(z => z.releaseDefect < 1e-14);
    push('6 integrator order on the closed-form circle about a stationary source; Hermite order', ok, { period, rk4: rk, rk4Orders: orders, dp54: dp, hermite: herm, hermiteOrders: hermOrders }, { rk4Order: 4, dp54: 'error below 1e-7 at rtol 1e-10 and 1e-9 at 1e-12 after one period', hermite: 'x order 6, v order 5, a order 4' }, 'orders in [3.7, 4.6]', 'the circle is an exact Section 9a solution (derived above); the release defect must be at round-off since the past is compatible');
  }
  const receipt = { schema: 'weber-delayed-pair-instrument-controls.v1', instrument: 'weber-delayed-pair-instrument.mjs', recordedAt: new Date().toISOString(), node: process.version, wallSeconds: (Date.now() - t0) / 1000, allPass: results.every(r => r.pass), results };
  fs.writeFileSync(CONTROLS_PATH, JSON.stringify(receipt, null, 1));
  console.log(`${receipt.allPass ? 'ALL PASS' : 'SOME FAIL'} (${receipt.wallSeconds.toFixed(2)} s) -> ${path.relative(REPO_ROOT, CONTROLS_PATH)}`);
  return receipt;
}

// ---------------------------------------------------------------- main
async function main(argv) {
  const cmd = argv[0];
  if (cmd === 'controls') { const r = runControls(); process.exitCode = r.allPass ? 0 : 1; return; }
  if (cmd === 'run') {
    const specPath = path.resolve(argv[1]); const flags = { refine: argv.includes('--refine') };
    const si = argv.indexOf('--stem'); if (si >= 0) flags.stem = argv[si + 1];
    const ti = argv.indexOf('--tEnd'); if (ti >= 0) flags.tEnd = Number(argv[ti + 1]);
    const label = flags.stem ?? (path.basename(specPath, '.json') + (flags.refine ? '-refine' : ''));
    const s = writeRun(specPath, flags);
    if (!argv.includes('--no-record')) appendRunsRecord(s, label);
    console.log(JSON.stringify({ name: s.name, refine: s.refine, termination: s.termination, firstEvent: s.firstEvent?.name ?? null, firstEventT: s.firstEvent?.T ?? null, rEnd: s.final.r, hStart: s.hStart, hEnd: s.hEnd, slope: s.rhoH2Slope, speedMax: s.speedExtremes.max, detMin: s.detExtremes.min, jump1: s.firstGenerationJump?.magnitude ?? null, releaseDefect: s.releaseDefect.map(d => d.magnitude), steps: s.steps, nfev: s.nfev, wall: s.wallSeconds, maxResidual: s.rootDiagnostics.maxResidual }, null, 1));
    return;
  }
  if (cmd === 'past') { const spec = JSON.parse(fs.readFileSync(path.resolve(argv[1]), 'utf8')); const p = section9BackwardPast(spec, { force: argv.includes('--force') }); console.log(JSON.stringify({ records: p.records, s9summary: p.s9summary })); return; }
  console.error('usage: controls | run <case.json> [--refine] [--stem s] | past <case.json>'); process.exitCode = 2;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv.slice(2)).catch(err => { console.error(err); process.exitCode = 1; });
