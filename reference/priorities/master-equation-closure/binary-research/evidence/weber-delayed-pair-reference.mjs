#!/usr/bin/env node
// Lane C independent reference for the frozen Section 9a delayed Weber law on
// one isolated opposite-polarity pair (equation-variants manuscript, Section 9a;
// preregistration: binary-research/analysis/weber-delayed-pair-preregistration.md).
//
// Separately authored. Design: METHOD OF STEPS with fixed-step classical RK4 on the
// present state, the complete history (T, X, V, A) of both members stored as nodes
// and read through a quintic Hermite interpolant (X, V, A matched at both nodes,
// so A is C^0 and X is C^2 except at declared acceleration breakpoints, where the
// node carries a left and a right acceleration). Root bracketing and bisection /
// safeguarded Newton are written here; the 3x3 present-acceleration solve is a
// hand-written partial-pivot elimination. No generic ODE driver, no other delayed
// integrator of this repository was consulted while writing this file.
//
// Law (K = c_f = 1 enforced, lambda = -1/2, mu = 1, sigma_12 = -1), per ordinary root:
//   A_i = sum sigma K c_f / (R^2 |D_t|) [1 - Rdot^2/(2c_f^2) + R Rddot/c_f^2] n,
//   Rdot = c_f (1-p), p = D_r/D_t,
//   Rddot = (c_f/D_t) [ n.(A_i(T) - p^2 A_j(S)) + |w_perp|^2/R ],  w = V_i - p V_j(S).
// Self roots are admitted whenever they exist; this reference proves their absence
// by max speed < c_f over the whole history and STOPS (records a census change) if a
// member speed reaches c_f, because self roots with delay below the step cannot be
// enumerated by this method. No remedy of any kind is applied.
//
// CLI:
//   node weber-delayed-pair-reference.mjs known            known cases 1-6, receipt
//   node weber-delayed-pair-reference.mjs census           rigid mirror-circle census (1b)
//   node weber-delayed-pair-reference.mjs target <label> [--steps-per-period N] [--window W]
//   node weber-delayed-pair-reference.mjs profile

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(HERE, '../../../../..');
const KNOWN_RECEIPT = path.join(HERE, 'weber-delayed-pair-reference-known.json');
const RUNS_PATH = path.join(HERE, 'weber-delayed-pair-reference-runs.json');
const DATA_DIR = path.join(REPO_ROOT, '.local-data/master-equation-closure/weber-delayed-pair/reference');
const INSTRUMENT_PATH = path.join(HERE, 'weber-overnight-pair-instrument.mjs');

export const CF = 1;
export const K = 1;
export const LAMBDA = -0.5;
export const MU = 1;

// ------------------------------------------------------------------ vectors
const v3 = (a, b, c) => [a, b, c];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const norm = a => Math.sqrt(dot(a, a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];

// ------------------------------------------------------------------ 3x3 solve
// Partial-pivot Gaussian elimination; returns solution and determinant.
export function solve3(Min, bin) {
  const M = [Min[0].slice(), Min[1].slice(), Min[2].slice()];
  const b = bin.slice();
  let det = 1;
  for (let k = 0; k < 3; k++) {
    let p = k;
    for (let i = k + 1; i < 3; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    if (p !== k) { [M[p], M[k]] = [M[k], M[p]]; [b[p], b[k]] = [b[k], b[p]]; det = -det; }
    const piv = M[k][k];
    det *= piv;
    if (piv === 0) return { x: [NaN, NaN, NaN], det: 0 };
    for (let i = k + 1; i < 3; i++) {
      const f = M[i][k] / piv;
      if (f === 0) continue;
      for (let j = k; j < 3; j++) M[i][j] -= f * M[k][j];
      b[i] -= f * b[k];
    }
  }
  const x = [0, 0, 0];
  for (let i = 2; i >= 0; i--) {
    let s = b[i];
    for (let j = i + 1; j < 3; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return { x, det };
}

// ------------------------------------------------------------------ quintic Hermite
// On [t0, t1] with (x0,v0,a0), (x1,v1,a1) per component; returns {x,v,a} at t.
function quintic(t0, t1, X0, V0, A0, X1, V1, A1, t) {
  const H = t1 - t0, s = (t - t0) / H;
  const x = [0, 0, 0], v = [0, 0, 0], a = [0, 0, 0];
  for (let c = 0; c < 3; c++) {
    const x0 = X0[c], v0 = V0[c] * H, a0 = A0[c] * H * H;
    const x1 = X1[c], v1 = V1[c] * H, a1 = A1[c] * H * H;
    const D = x1 - x0 - v0 - 0.5 * a0, Dv = v1 - v0 - a0, Da = a1 - a0;
    const c3 = 10 * D - 4 * Dv + 0.5 * Da, c4 = -15 * D + 7 * Dv - Da, c5 = 6 * D - 3 * Dv + 0.5 * Da;
    const s2 = s * s, s3 = s2 * s, s4 = s3 * s, s5 = s4 * s;
    x[c] = x0 + v0 * s + 0.5 * a0 * s2 + c3 * s3 + c4 * s4 + c5 * s5;
    v[c] = (v0 + a0 * s + 3 * c3 * s2 + 4 * c4 * s3 + 5 * c5 * s4) / H;
    a[c] = (a0 + 6 * c3 * s + 12 * c4 * s2 + 20 * c5 * s3) / (H * H);
  }
  return { x, v, a };
}

// ------------------------------------------------------------------ history
// Nodes: t[k] ascending; per member m: x[m][k], v[m][k], aMinus[m][k], aPlus[m][k].
// For t < tPastEnd (closed-form pasts) the analytic past is used.
export class History {
  constructor(N, closedPast) {
    this.N = N;
    this.t = [];
    this.x = Array.from({ length: N }, () => []);
    this.v = Array.from({ length: N }, () => []);
    this.aMinus = Array.from({ length: N }, () => []);
    this.aPlus = Array.from({ length: N }, () => []);
    this.closedPast = closedPast || null; // function (m, t) -> {x,v,a} valid for t < 0
    this.maxSpeed = 0;
  }
  push(t, X, V, AMinus, APlus) {
    if (this.t.length && !(t > this.t[this.t.length - 1])) throw new Error(`history push out of order at t=${t}`);
    this.t.push(t);
    for (let m = 0; m < this.N; m++) {
      this.x[m].push(X[m].slice()); this.v[m].push(V[m].slice());
      this.aMinus[m].push(AMinus[m].slice()); this.aPlus[m].push(APlus[m].slice());
      this.maxSpeed = Math.max(this.maxSpeed, norm(V[m]));
    }
  }
  get tLast() { return this.t[this.t.length - 1]; }
  get tFirst() { return this.t[0]; }
  // locate interval index k with t[k] <= t < t[k+1]
  locate(t) {
    const T = this.t;
    let lo = 0, hi = T.length - 1;
    if (t < T[0] || t > T[hi]) return -1;
    while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (T[mid] <= t) lo = mid; else hi = mid; }
    return lo;
  }
  state(m, t) {
    if (this.closedPast && t < 0) return this.closedPast(m, t);
    const k = this.locate(t);
    if (k < 0) throw new HistoryReachError(`history has no data at t=${t} (range [${this.tFirst}, ${this.tLast}])`);
    if (k === this.t.length - 1) {
      return { x: this.x[m][k].slice(), v: this.v[m][k].slice(), a: this.aPlus[m][k].slice() };
    }
    return quintic(this.t[k], this.t[k + 1], this.x[m][k], this.v[m][k], this.aPlus[m][k],
      this.x[m][k + 1], this.v[m][k + 1], this.aMinus[m][k + 1], t);
  }
}
export class HistoryReachError extends Error {}
export class DomainExit extends Error { constructor(msg, info) { super(msg); this.info = info || {}; } }

// ------------------------------------------------------------------ closed-form pasts
export function rigidCirclePast(rho, Omega) {
  return (m, t) => {
    const c = Math.cos(Omega * t), s = Math.sin(Omega * t), sg = m === 0 ? 1 : -1;
    return {
      x: [sg * rho * c, sg * rho * s, 0],
      v: [-sg * rho * Omega * s, sg * rho * Omega * c, 0],
      a: [-sg * rho * Omega * Omega * c, -sg * rho * Omega * Omega * s, 0],
    };
  };
}
export function affinePast(members) { // members: [{b:[..], v:[..]}]
  return (m, t) => ({ x: add(members[m].b, scale(members[m].v, t)), v: members[m].v.slice(), a: [0, 0, 0] });
}

// ------------------------------------------------------------------ root solve
// F(S) = |X_i(T) - X_j(S)| - c_f (T - S); increasing in S when transmitter is subfield.
export function partnerRoot(hist, j, T, Xi, guess, opt = {}) {
  const tol = opt.tol ?? 1e-14;
  const F = S => { const st = hist.state(j, S); return norm(sub(Xi, st.x)) - CF * (T - S); };
  // the history can be read up to its last node; a closed-form past alone covers t < 0
  const upper = hist.t.length ? hist.tLast : (hist.closedPast ? -1e-12 : NaN);
  if (!Number.isFinite(upper)) throw new HistoryReachError("empty history");
  let S0 = Number.isFinite(guess) ? guess : T - norm(sub(Xi, hist.state(j, Math.min(T, upper)).x));
  if (S0 > upper) S0 = upper;
  let delta = opt.delta ?? Math.max(1e-6, 1e-3 * Math.abs(T - S0));
  let lo = S0 - delta, hi = Math.min(S0 + delta, upper);
  let Flo = F(lo), Fhi = F(hi);
  let guard = 0;
  while (Flo > 0) { delta *= 2; lo = S0 - delta; Flo = F(lo); if (++guard > 200) throw new Error('root bracket (lo) failed'); }
  guard = 0;
  while (Fhi < 0) {
    if (hi >= upper) throw new HistoryReachError(`partner root for receiver at T=${T} requires history beyond ${upper} (delay below step?)`);
    delta *= 2; hi = Math.min(S0 + delta, upper); Fhi = F(hi); if (++guard > 200) throw new Error('root bracket (hi) failed');
  }
  if (Flo === 0) return { S: lo, residual: 0, iterations: 0 };
  if (Fhi === 0) return { S: hi, residual: 0, iterations: 0 };
  // safeguarded Newton (F' = D_t) with bisection fallback
  let S = 0.5 * (lo + hi), Fs = F(S), it = 0;
  for (; it < 200; it++) {
    if (Math.abs(Fs) <= tol) break;
    if (Fs < 0) lo = S; else hi = S;
    const st = hist.state(j, S);
    const d = sub(Xi, st.x), R = norm(d);
    const Dt = CF - dot(d, st.v) / R;
    let Sn = Dt > 0 ? S - Fs / Dt : NaN;
    if (!(Sn > lo && Sn < hi)) Sn = 0.5 * (lo + hi);
    if (hi - lo <= 4 * Number.EPSILON * Math.max(1, Math.abs(S))) { S = 0.5 * (lo + hi); Fs = F(S); break; }
    S = Sn; Fs = F(S);
  }
  return { S, residual: Math.abs(Fs), iterations: it };
}

// ------------------------------------------------------------------ Section 9a evaluation
// One receiver i with partner j at reception time T. mode 'solve' solves the
// implicit 3x3 block; mode 'prescribed' inserts the given Ai into the bracket.
export function evaluateReceiver(hist, i, j, T, Xi, Vi, opt = {}) {
  const lambda = opt.lambda ?? LAMBDA, mu = opt.mu ?? MU, sigma = opt.sigma ?? -1;
  const root = partnerRoot(hist, j, T, Xi, opt.guess, opt);
  const S = root.S;
  const st = hist.state(j, S);
  let Aj = st.a;
  if (opt.replaceAj) Aj = opt.replaceAj;
  const r = sub(Xi, st.x), R = norm(r), n = scale(r, 1 / R);
  const Dt = CF - dot(n, st.v), Dr = CF - dot(n, Vi), p = Dr / Dt;
  const w = sub(Vi, scale(st.v, p)), wn = dot(w, n), wperp2 = Math.max(0, dot(w, w) - wn * wn);
  const Rdot = CF * (1 - p);
  const pref = sigma * K * CF / (R * R * Math.abs(Dt));
  const knownRddotPart = (CF / Dt) * (-p * p * dot(n, Aj) + wperp2 / R); // Rddot without the n.A_i term
  const bracketKnown = 1 + lambda * Rdot * Rdot / (CF * CF) + mu * R * knownRddotPart / (CF * CF);
  // unknown part: mu * R/(c_f^2) * (c_f/D_t) * n.A_i = mu * R/(c_f D_t) n.A_i
  const cu = pref * mu * R / (CF * Dt); // coefficient on n (n.A_i)
  let Ai, detM;
  const M = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
  for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) M[a][b] -= cu * n[a] * n[b];
  if (opt.mode === 'prescribed') {
    Ai = opt.Ai;
    detM = M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
    const Rddot = (CF / Dt) * (dot(n, sub(Ai, scale(Aj, p * p))) + wperp2 / R);
    const bracket = 1 + lambda * Rdot * Rdot / (CF * CF) + mu * R * Rddot / (CF * CF);
    const hit = scale(n, pref * bracket);
    return { hit, Ai, S, R, n, Dt, Dr, p, Rdot, Rddot, bracket, detM, residual: root.residual, iterations: root.iterations, Aj, Xj: st.x, Vj: st.v, M, cu };
  }
  const b = scale(n, pref * bracketKnown);
  const sol = solve3(M, b);
  Ai = sol.x; detM = sol.det;
  const Rddot = (CF / Dt) * (dot(n, sub(Ai, scale(Aj, p * p))) + wperp2 / R);
  const bracket = 1 + lambda * Rdot * Rdot / (CF * CF) + mu * R * Rddot / (CF * CF);
  return { hit: Ai, Ai, S, R, n, Dt, Dr, p, Rdot, Rddot, bracket, detM, residual: root.residual, iterations: root.iterations, Aj, Xj: st.x, Vj: st.v, M, cu };
}

// Pair right-hand side: both receivers, independent 3x3 solves (no self roots).
export function pairLaw(hist, T, X, V, guesses, opt = {}) {
  const out = [];
  for (let i = 0; i < 2; i++) {
    const j = 1 - i;
    out.push(evaluateReceiver(hist, i, j, T, X[i], V[i], { ...opt, mode: 'solve', guess: guesses ? guesses[i] : undefined }));
  }
  return out;
}

// ------------------------------------------------------------------ integrator (method of steps, RK4)
// law(hist, T, X, V, guesses) -> [diag_i] with .Ai, .S, .detM, .Dt ...
export function evolve(spec) {
  const { hist, law, X0, V0, Tend, h, onNode } = spec;
  const t0 = spec.T0 ?? 0;
  const bpList = spec.breakpoints ? spec.breakpoints.slice() : [0]; // acceleration breakpoints of the history
  const bpAminus = spec.bpAminus || {}; // key: time -> [A_m^-] arrays
  let T = t0, X = X0.map(a => a.slice()), V = V0.map(a => a.slice());
  let guesses = [undefined, undefined];
  let diag = law(hist, T, X, V, guesses);
  guesses = diag.map(d => d.S);
  const Aplus0 = diag.map(d => d.Ai);
  const Aminus0 = spec.Aminus0 || Aplus0;
  if (hist.t.length === 0 || hist.tLast < T) hist.push(T, X, V, Aminus0, Aplus0);
  else if (hist.tLast === T) { const k = hist.t.length - 1; for (let m = 0; m < 2; m++) hist.aPlus[m][k] = Aplus0[m].slice(); }
  else throw new Error('history extends beyond the release time');
  const record = { steps: 0, shortenedSteps: 0, tinyIntervals: 0, crossingCorrections: 0, missedCrossings: 0, jumps: [], termination: null };
  if (onNode) onNode(T, X, V, Aplus0, diag, record);
  let stepCount = 0;
  const bpIndex = [0, 0]; // next breakpoint index per receiver (roots monotone in T)
  const rk4 = (dt) => {
    const k1X = V.map(a => a.slice()), k1V = diag.map(d => d.Ai.slice());
    const Xb = X.map((x, m) => add(x, scale(k1X[m], dt / 2))), Vb = V.map((v, m) => add(v, scale(k1V[m], dt / 2)));
    const d2 = law(hist, T + dt / 2, Xb, Vb, guesses.map((g, m) => g + dt / 2 * diag[m].p));
    const k2X = Vb.map(a => a.slice()), k2V = d2.map(d => d.Ai.slice());
    const Xc = X.map((x, m) => add(x, scale(k2X[m], dt / 2))), Vc = V.map((v, m) => add(v, scale(k2V[m], dt / 2)));
    const d3 = law(hist, T + dt / 2, Xc, Vc, d2.map(d => d.S));
    const k3X = Vc.map(a => a.slice()), k3V = d3.map(d => d.Ai.slice());
    const Xd = X.map((x, m) => add(x, scale(k3X[m], dt))), Vd = V.map((v, m) => add(v, scale(k3V[m], dt)));
    const d4 = law(hist, T + dt, Xd, Vd, d3.map((d, m) => d.S + dt / 2 * d.p));
    const k4X = Vd.map(a => a.slice()), k4V = d4.map(d => d.Ai.slice());
    const Xn = X.map((x, m) => add(x, scale(add(add(k1X[m], scale(k2X[m], 2)), add(scale(k3X[m], 2), k4X[m])), dt / 6)));
    const Vn = V.map((v, m) => add(v, scale(add(add(k1V[m], scale(k2V[m], 2)), add(scale(k3V[m], 2), k4V[m])), dt / 6)));
    return { Xn, Vn, guess: d4.map((d, m) => d.S + dt / 2 * d.p) };
  };
  while (T < Tend - 1e-15 * Math.max(1, Math.abs(Tend))) {
    let dt = Math.min(h, Tend - T);
    // Step alignment to the reception of an acceleration breakpoint, with a two-step
    // lookahead so that no node interval shorter than about h/4 is created.
    let aligned = null;
    for (let i = 0; i < 2; i++) {
      while (bpIndex[i] < bpList.length && bpList[bpIndex[i]] <= diag[i].S) bpIndex[i]++;
      if (bpIndex[i] >= bpList.length) continue;
      const bpt = bpList[bpIndex[i]];
      const Spred = diag[i].S + 2 * dt * diag[i].p * 1.05;
      if (Spred < bpt) continue;
      const j = 1 - i, Xjb = hist.state(j, bpt).x;
      const Xi = X[i], Vi = V[i], Ai = diag[i].Ai;
      const G = t => { const tau = t - T; const xt = add(add(Xi, scale(Vi, tau)), scale(Ai, 0.5 * tau * tau)); return norm(sub(xt, Xjb)) - CF * (t - bpt); };
      let lo = T, hi = T + 2 * dt, Glo = G(lo), Ghi = G(hi);
      if (Glo <= 0) { record.missedCrossings++; continue; }
      if (Ghi > 0) continue; // crossing not within two steps
      for (let it = 0; it < 80; it++) { const mid = 0.5 * (lo + hi); if (G(mid) > 0) lo = mid; else hi = mid; if (hi - lo < 1e-15 * Math.max(1, T)) break; }
      const tc = 0.5 * (lo + hi);
      if (aligned === null || tc < aligned.t) aligned = { t: tc, receiver: i, bpt };
    }
    let landOnBreakpoint = false;
    if (aligned) {
      const L = aligned.t - T;
      if (L > dt) { dt = L / 2; record.shortenedSteps++; } // split the approach into two comparable steps
      else if (L > 1e-9 * h) { dt = L; landOnBreakpoint = true; record.shortenedSteps++; }
    }
    if (dt < 0.2 * h && T + dt < Tend - 1e-12) { record.tinyIntervals++; if (process.env.WDP_DEBUG) console.error('tiny', JSON.stringify({ T, dt, h, aligned, S: diag.map(d => d.S), p: diag.map(d => d.p) })); }
    let step = rk4(dt);
    // Newton correction of the crossing time so that the aligned receiver's root sits on the breakpoint
    if (landOnBreakpoint) {
      const i = aligned.receiver, j = 1 - i, bpt = aligned.bpt;
      for (let it = 0; it < 4; it++) {
        const probe = evaluateReceiver(hist, i, j, T + dt, step.Xn[i], step.Vn[i], { mode: 'solve', guess: step.guess[i] });
        const miss = probe.S - bpt;
        if (Math.abs(miss) <= 1e-11 * Math.max(1, Math.abs(bpt))) break;
        dt -= miss / probe.p; record.crossingCorrections++;
        if (!(dt > 0)) throw new Error('crossing correction produced a nonpositive step');
        step = rk4(dt);
      }
    }
    T += dt; X = step.Xn; V = step.Vn; stepCount++;
    const Aminus = [], Aplus = [];
    let dNew;
    if (landOnBreakpoint) {
      const bpt = aligned.bpt;
      const dPlus = [];
      for (let i = 0; i < 2; i++) {
        const j = 1 - i;
        // the root sits on the breakpoint to about 1e-11; force the right and left delayed accelerations explicitly
        let plus = evaluateReceiver(hist, i, j, T, X[i], V[i], { mode: 'solve', guess: step.guess[i] });
        let minus = plus;
        if (Math.abs(plus.S - bpt) <= 1e-9 * Math.max(1, Math.abs(bpt))) {
          const AjPlus = rightAcceleration(hist, j, bpt), AjMinus = leftAcceleration(hist, j, bpt, bpAminus);
          plus = evaluateReceiver(hist, i, j, T, X[i], V[i], { mode: 'solve', guess: step.guess[i], replaceAj: AjPlus });
          minus = evaluateReceiver(hist, i, j, T, X[i], V[i], { mode: 'solve', guess: step.guess[i], replaceAj: AjMinus });
        } else if (i === aligned.receiver) record.missedCrossings++;
        dPlus.push(plus);
        Aminus.push(minus.Ai); Aplus.push(plus.Ai);
        const jump = sub(plus.Ai, minus.Ai);
        if (norm(jump) > 0) record.jumps.push({ T, receiver: i, breakpoint: bpt, S: plus.S, jump: norm(jump), jumpVector: jump, Aminus: minus.Ai, Aplus: plus.Ai, generation: bpList.indexOf(bpt) });
      }
      dNew = dPlus;
      // a receiver whose root sits on the breakpoint (to the landing tolerance) has crossed it
      for (let i = 0; i < 2; i++) if (Math.abs(dPlus[i].S - bpt) <= 1e-9 * Math.max(1, Math.abs(bpt))) { const idx = bpList.indexOf(bpt); if (idx >= 0) bpIndex[i] = Math.max(bpIndex[i], idx + 1); }
      if (!bpList.some(b => Math.abs(b - T) < 1e-12 * Math.max(1, T))) { bpList.push(T); bpList.sort((a, b) => a - b); }
      bpAminus[T] = Aminus;
    } else {
      dNew = law(hist, T, X, V, step.guess);
      for (let i = 0; i < 2; i++) { Aminus.push(dNew[i].Ai); Aplus.push(dNew[i].Ai); }
    }
    hist.push(T, X, V, Aminus, Aplus);
    diag = dNew; guesses = diag.map(d => d.S);
    record.steps = stepCount;
    if (onNode) { const stop = onNode(T, X, V, Aplus, diag, record); if (stop) { record.termination = stop; break; } }
  }
  if (!record.termination) record.termination = 'window complete';
  return { T, X, V, diag, record, breakpoints: bpList };
}

function rightAcceleration(hist, m, bpt) {
  const k = hist.locate(bpt); return hist.aPlus[m][k].slice();
}
function leftAcceleration(hist, m, bpt, bpAminus) {
  if (bpt === 0) {
    if (hist.closedPast) return hist.closedPast(m, 0).a;
    const k = hist.locate(0); return hist.aMinus[m][k].slice();
  }
  if (bpAminus[bpt]) return bpAminus[bpt][m].slice();
  const k = hist.locate(bpt); return hist.aMinus[m][k].slice();
}

// ------------------------------------------------------------------ pair diagnostics
export function pairDiagnostics(X, V) {
  const r = sub(X[0], X[1]), rd = sub(V[0], V[1]);
  const rn = norm(r), e = scale(r, 1 / rn);
  const rdot = dot(e, rd), hv = cross(r, rd), h = norm(hv);
  const eps = 0.5 * (1 + 2 * K / (CF * CF * rn)) * rdot * rdot + h * h / (2 * rn * rn) - 2 * K / rn;
  return { r: rn, rdot, h, rhoH: h * h / (4 * K), eps, beta: [norm(V[0]) / CF, norm(V[1]) / CF] };
}

function leastSquaresSlope(ts, ys) {
  const n = ts.length; if (n < 2) return NaN;
  let st = 0, sy = 0; for (let i = 0; i < n; i++) { st += ts[i]; sy += ys[i]; }
  const mt = st / n, my = sy / n; let sxx = 0, sxy = 0;
  for (let i = 0; i < n; i++) { sxx += (ts[i] - mt) ** 2; sxy += (ts[i] - mt) * (ys[i] - my); }
  return sxy / sxx;
}

// ------------------------------------------------------------------ rigid circle census (1b)
// Partner: g_p(d) = d - 2 beta |cos(d/2)|; self: g_s(d) = d - 2 beta |sin(d/2)|; d in (0, 2 beta].
function monotoneRoots(g, breakpoints, dmax, lowerSign) {
  const pts = [...new Set(breakpoints.filter(p => p > 0 && p < dmax).map(p => +p.toPrecision(15)))].sort((a, b) => a - b);
  const grid = [1e-14, ...pts, dmax];
  const roots = [], unresolved = [];
  for (let k = 0; k + 1 < grid.length; k++) {
    let lo = grid[k], hi = grid[k + 1];
    if (hi - lo < 1e-13) continue;
    let glo = g(lo), ghi = g(hi);
    // the same-time endpoint d = 0 is excluded by the law; at d -> 0+ the sign is supplied analytically
    if (k === 0 && glo === 0) glo = lowerSign;
    if (Math.abs(glo) < 1e-12 && k > 0) { unresolved.push({ d: lo, g: glo, note: 'breakpoint value within 1e-12 of zero' }); }
    if (glo === 0) { roots.push(lo); continue; }
    if (ghi === 0) { if (k + 1 === grid.length - 1) roots.push(hi); continue; }
    if (glo * ghi > 0) continue;
    for (let it = 0; it < 200; it++) { const mid = 0.5 * (lo + hi); const gm = g(mid); if (gm === 0) { lo = hi = mid; break; } if (gm * glo < 0) { hi = mid; ghi = gm; } else { lo = mid; glo = gm; } if (hi - lo <= 2 * Number.EPSILON * hi) break; }
    roots.push(0.5 * (lo + hi));
  }
  return { roots, unresolved };
}
export function circleCensus(beta) {
  const dmax = 2 * beta;
  const gp = d => d - 2 * beta * Math.abs(Math.cos(d / 2));
  const gs = d => d - 2 * beta * Math.abs(Math.sin(d / 2));
  // breakpoints: zeros of |cos|, |sin| and of the derivatives (sin(d/2) = +-1/beta, cos(d/2) = +-1/beta)
  const bp = [], bs = [];
  for (let k = 0; k * Math.PI <= dmax + 1; k++) { bp.push((2 * k + 1) * Math.PI); bs.push(2 * k * Math.PI); }
  if (beta >= 1) {
    const a = Math.asin(1 / beta); // sin(d/2) = +-1/beta -> d/2 in {a, pi-a, pi+a, 2pi-a} + 2 pi k
    const c = Math.acos(1 / beta); // cos(d/2) = +-1/beta -> d/2 in {c, pi-c, pi+c, 2pi-c} + 2 pi k
    for (let k = 0; 4 * Math.PI * k <= dmax + 1; k++) {
      for (const z of [a, Math.PI - a, Math.PI + a, 2 * Math.PI - a]) bp.push(2 * (z + 2 * Math.PI * k));
      for (const z of [c, Math.PI - c, Math.PI + c, 2 * Math.PI - c]) bs.push(2 * (z + 2 * Math.PI * k));
    }
  }
  // g_p(0+) = -2 beta < 0; g_s(d) = (1-beta) d + beta d^3/24 + ... so g_s(0+) has the sign of 1-beta, or + at beta = 1
  const P = monotoneRoots(gp, bp, dmax, -1), Sf = monotoneRoots(gs, bs, dmax, beta <= 1 ? 1 : -1);
  const roots = [];
  for (const d of P.roots) {
    const c = Math.cos(d / 2), s = Math.sin(d / 2), sg = Math.sign(c) || 1;
    const n = [sg * c, -sg * s], u = d / beta, Dt = 1 + sg * beta * s;
    roots.push({ kind: 'partner', d, u, n, Dt, sigma: -1 });
  }
  for (const d of Sf.roots) {
    const c = Math.cos(d / 2), s = Math.sin(d / 2), sg = Math.sign(s) || 1;
    const n = [sg * s, sg * c], u = d / beta, Dt = 1 - sg * beta * c;
    roots.push({ kind: 'self', d, u, n, Dt, sigma: +1 });
  }
  let Cr = 0, Ct = 0;
  for (const q of roots) { const wgt = q.sigma / (q.u * q.u * Math.abs(q.Dt)); Cr += wgt * q.n[0]; Ct += wgt * q.n[1]; }
  const rho = Cr < 0 ? -K * Cr / (beta * beta * CF * CF) : NaN;
  let detM = NaN;
  if (Cr < 0) {
    const M = [[1, 0], [0, 1]];
    for (const q of roots) { const c = q.sigma * K / (q.u * rho * Math.abs(q.Dt) * q.Dt); M[0][0] -= c * q.n[0] * q.n[0]; M[0][1] -= c * q.n[0] * q.n[1]; M[1][0] -= c * q.n[1] * q.n[0]; M[1][1] -= c * q.n[1] * q.n[1]; }
    detM = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  }
  return { beta, roots, partnerCount: P.roots.length, selfCount: Sf.roots.length, unresolved: [...P.unresolved, ...Sf.unresolved], Cr, Ct, rho, detM };
}

export function runCensus() {
  const out = { schema: 'weber-delayed-pair-reference.circle-census.v1', generatedAtUtc: new Date().toISOString(), sub: [], grid: [], balanced: [] };
  for (const beta of [0.02, 0.05, 0.1, 0.3, 0.5, 0.7, 0.9, 0.99, 1.0, 1.01, 1.2, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 5.0, 6.0]) {
    const c = circleCensus(beta);
    out.sub.push({ beta, partnerCount: c.partnerCount, selfCount: c.selfCount, d: c.roots.map(q => q.d), Cr: c.Cr, Ct: c.Ct, unresolved: c.unresolved });
  }
  const betas = []; for (let b = 1.0; b <= 6.0 + 1e-9; b += 0.001) betas.push(+b.toFixed(3));
  let prev = null;
  for (const beta of betas) {
    const c = circleCensus(beta);
    const row = { beta, partnerCount: c.partnerCount, selfCount: c.selfCount, Cr: c.Cr, Ct: c.Ct, unresolved: c.unresolved.length };
    if (Math.abs(beta * 100 - Math.round(beta * 100)) < 1e-9) out.grid.push(row); // keep every 0.01 in the file
    if (prev && prev.Ct * c.Ct < 0) {
      // refine by bisection in beta to 1e-10
      let lo = prev.beta, hi = beta, clo = prev, chi = c;
      for (let it = 0; it < 200 && hi - lo > 1e-10; it++) {
        const mid = 0.5 * (lo + hi), cm = circleCensus(mid);
        if (cm.Ct * clo.Ct < 0) { hi = mid; chi = cm; } else { lo = mid; clo = cm; }
      }
      const bm = 0.5 * (lo + hi), cm = circleCensus(bm);
      out.balanced.push({
        betaBracket: [lo, hi], beta: bm, Ct: cm.Ct, Cr: cm.Cr, rho: cm.rho, Omega: cm.rho > 0 ? bm * CF / cm.rho : NaN, detM: cm.detM,
        partnerCount: cm.partnerCount, selfCount: cm.selfCount, censusConstant: clo.partnerCount === chi.partnerCount && clo.selfCount === chi.selfCount,
        CtEndpoints: [clo.Ct, chi.Ct], roots: cm.roots.map(q => ({ kind: q.kind, d: q.d, u: q.u, Dt: q.Dt })),
        continuous: Math.abs(cm.Ct) < 1e-6 * Math.max(Math.abs(clo.Ct), Math.abs(chi.Ct)) + 1e-9,
      });
    }
    prev = c;
  }
  return out;
}

// ------------------------------------------------------------------ known cases
function scalarCircleLag(beta) { // d = 2 beta cos(d/2) on (0, pi)
  let lo = 0, hi = Math.PI; for (let it = 0; it < 200; it++) { const mid = 0.5 * (lo + hi); if (mid - 2 * beta * Math.cos(mid / 2) < 0) lo = mid; else hi = mid; } return 0.5 * (lo + hi);
}

export async function runKnown() {
  const receipt = { schema: 'weber-delayed-pair-reference.known.v1', generatedAtUtc: new Date().toISOString(), lane: 'C (ramon-e-moore)', cases: [], allPassed: false };
  const pass = (name, ok, detail) => receipt.cases.push({ name, pass: !!ok, ...detail });
  // 1. stationary separated pair, range 2
  {
    const hist = new History(2, affinePast([{ b: [1, 0, 0], v: [0, 0, 0] }, { b: [-1, 0, 0], v: [0, 0, 0] }]));
    const e = evaluateReceiver(hist, 0, 1, 0, [1, 0, 0], [0, 0, 0], { mode: 'prescribed', Ai: [0, 0, 0] });
    const ok = Math.abs(e.S + 2) < 1e-13 && Math.abs(e.Dt - 1) < 1e-15 && Math.abs(e.Rdot) < 1e-15 && Math.abs(e.Rddot) < 1e-15 && Math.abs(e.bracket - 1) < 1e-15 && Math.abs(norm(e.hit) - 0.25) < 1e-15 && e.hit[0] < 0;
    const solved = evaluateReceiver(hist, 0, 1, 0, [1, 0, 0], [0, 0, 0], { mode: 'solve' });
    pass('1 stationary pair range 2 (prescribed evaluation)', ok, { lag: -e.S, Dt: e.Dt, Rdot: e.Rdot, Rddot: e.Rddot, bracket: e.bracket, magnitude: norm(e.hit), direction: e.hit.map(z => z / norm(e.hit)), residual: e.residual, note: 'solved (implicit) stationary value for information only', solvedMagnitude: norm(solved.Ai), solvedDetM: solved.detM, expectedSolved: 0.25 / (1 + 0.5) });
  }
  // 2. transverse affine source and general affine formulas
  {
    const hist = new History(2, affinePast([{ b: [1, 0, 0], v: [0, 0, 0] }, { b: [0, 0.3, 0], v: [0, 0.3, 0] }]));
    const e = evaluateReceiver(hist, 0, 1, 0, [1, 0, 0], [0, 0, 0], { mode: 'prescribed', Ai: [0, 0, 0] });
    const ok1 = Math.abs(e.S + 1) < 1e-13 && Math.abs(e.Rddot - 0.09) < 1e-13 && Math.abs(e.bracket - 1.09) < 1e-13 && Math.abs(e.Rdot) < 1e-14;
    // general affine: random subfield v, stationary receiver at origin offset
    const v = [0.21, -0.37, 0.13], b = [-0.4, 0.9, 0.2];
    const h2 = new History(2, affinePast([{ b: [1, 0.2, -0.1], v: [0, 0, 0] }, { b, v }]));
    const g = evaluateReceiver(h2, 0, 1, 0, [1, 0.2, -0.1], [0, 0, 0], { mode: 'prescribed', Ai: [0, 0, 0] });
    const nv = dot(g.n, v), vperp2 = dot(v, v) - nv * nv;
    const RdotCF = -nv / g.Dt, RddotCF = vperp2 / (g.R * g.Dt ** 3);
    // exact causal quadratic: (1-|v|^2) tau^2 - 2 (d.v) tau - |d|^2 = 0, d = X_i - X_j(T)
    const d = sub([1, 0.2, -0.1], b), dv = dot(d, v), vv = dot(v, v);
    const tau = (dv + Math.sqrt(dv * dv + (1 - vv) * dot(d, d))) / (1 - vv);
    const ok2 = Math.abs(g.Rdot - RdotCF) < 1e-13 && Math.abs(g.Rddot - RddotCF) < 1e-13 && Math.abs(-g.S - tau) < 1e-13;
    pass('2 affine source controls', ok1 && ok2, { transverse: { S: e.S, Rdot: e.Rdot, Rddot: e.Rddot, bracket: e.bracket, residual: e.residual }, general: { S: g.S, tauQuadratic: tau, Rdot: g.Rdot, RdotClosedForm: RdotCF, Rddot: g.Rddot, RddotClosedForm: RddotCF, residual: g.residual } });
  }
  // 3. zero-coefficient reproduction of the canonical rigid-circle acceleration vs closed form 1b
  {
    const rows = []; let ok = true;
    for (const beta of [0.05, 0.3]) {
      const rho = 1 / (4 * beta * beta), Omega = beta / rho;
      const hist = new History(2, rigidCirclePast(rho, Omega));
      const e = evaluateReceiver(hist, 0, 1, 0, [rho, 0, 0], [0, beta, 0], { mode: 'solve', lambda: 0, mu: 0 });
      const d = scalarCircleLag(beta), dInst = Omega * (0 - e.S);
      const R = 2 * rho * Math.cos(d / 2), n = [Math.cos(d / 2), -Math.sin(d / 2), 0], Dt = 1 + beta * Math.sin(d / 2);
      const ar = -K / (4 * rho * rho * Math.cos(d / 2) * Dt), at = K * Math.sin(d / 2) / (4 * rho * rho * Math.cos(d / 2) ** 2 * Dt);
      const rel = Math.max(Math.abs(e.Ai[0] - ar) / Math.abs(ar), Math.abs(e.Ai[1] - at) / Math.abs(at), Math.abs(dInst - d) / d, Math.abs(e.R - R) / R, Math.abs(e.Dt - Dt), norm(sub(e.n, n)));
      ok = ok && rel < 1e-11 && Math.abs(e.detM - 1) < 1e-15;
      rows.push({ beta, rho, dScalar: d, dInstrument: dInst, R, RInstrument: e.R, Dt, DtInstrument: e.Dt, ar, at, AiInstrument: e.Ai, maxRel: rel, detM: e.detM, residual: e.residual });
    }
    pass('3 zero-coefficient canonical circle vs closed form', ok, { rows, PIprintedD: 0.0998753 });
  }
  // 4. rigid-circle bracket with frozen coefficients
  {
    const rows = []; let ok = true;
    for (const beta of [0.05, 0.1, 0.5, 0.9]) {
      const rho = 1 / (4 * beta * beta), Omega = beta / rho;
      const hist = new History(2, rigidCirclePast(rho, Omega));
      const e = evaluateReceiver(hist, 0, 1, 0, [rho, 0, 0], [0, beta, 0], { mode: 'prescribed', Ai: [-Omega * Omega * rho, 0, 0] });
      const sol = evaluateReceiver(hist, 0, 1, 0, [rho, 0, 0], [0, beta, 0], { mode: 'solve' });
      const canon = scale(e.n, -K * CF / (e.R * e.R * Math.abs(e.Dt)));
      ok = ok && Math.abs(e.Rdot) < 1e-12 && Math.abs(e.Rddot) < 1e-12 && Math.abs(e.bracket - 1) < 1e-12 && norm(sub(e.hit, canon)) < 1e-12 * norm(canon);
      rows.push({ beta, rho, Rdot: e.Rdot, Rddot: e.Rddot, bracket: e.bracket, hit: e.hit, canonical: canon, detM: sol.detM, detMClosedForm: 1 + K / (e.R * e.Dt * e.Dt), solvedAi: sol.Ai, note: 'solved Ai differs from canonical because the rigid acceleration is not the solution of the implicit block on an unbalanced circle' });
    }
    pass('4 rigid-circle bracket equals one', ok, { rows });
  }
  // 5. slow weakly coupled approach to Section 9 (Section 9 side from the validated instrument)
  {
    const inst = await import(INSTRUMENT_PATH);
    const P = inst.makeParams({ q: [-1, 1], lambda: LAMBDA, mu: MU, K: 1 });
    const rows = [];
    const evalPair = (beta, rhoScale) => {
      const rho = rhoScale / (4 * beta * beta), Omega = beta / rho;
      const hist = new History(2, rigidCirclePast(rho, Omega));
      const X = [[rho, 0, 0], [-rho, 0, 0]], V = [[0, beta, 0], [0, -beta, 0]];
      const a9a = evaluateReceiver(hist, 0, 1, 0, X[0], V[0], { mode: 'solve' });
      const y = inst.packState([{ x: X[0], v: V[0] }, { x: X[1], v: V[1] }]);
      const s9 = inst.solveAccelerations(y, P);
      const A9 = [s9.A[0], s9.A[1], s9.A[2]], A9b = [s9.A[3], s9.A[4], s9.A[5]];
      const r = 2 * rho, e = [1, 0, 0], w = sub(V[0], V[1]), rdot = dot(e, w), wperp2 = dot(w, w) - rdot * rdot;
      const rddot9 = dot(e, sub(A9, A9b)) + wperp2 / r;
      const bracket9 = 1 + LAMBDA * rdot * rdot + MU * r * rddot9;
      const diff = sub(a9a.Ai, A9), normDiff = norm(diff) / (K / (r * r));
      return { beta, rho, A9a: a9a.Ai, A9, normalizedDifference: normDiff, firstOrderPrediction: beta, bracket9MinusOne: bracket9 - 1, bracket9a: a9a.bracket, tangential9a: a9a.Ai[1], tangentialFirstOrder: K * beta / (4 * rho * rho) };
    };
    let ok = true;
    for (const [b1, b2] of [[0.05, 0.025], [0.02, 0.01]]) {
      const r1 = evalPair(b1, 1), r2 = evalPair(b2, 1);
      const ratio = r2.normalizedDifference / r1.normalizedDifference;
      ok = ok && Math.abs(ratio - 0.5) < 0.05;
      // Section 9 bracket deviation on the exact Kepler circle is zero by derivation; use an off-Kepler circle for the 1/4 scaling
      const o1 = evalPair(b1, 1.2), o2 = evalPair(b2, 1.2);
      const ratioB = o2.bracket9MinusOne / o1.bracket9MinusOne;
      ok = ok && Math.abs(ratioB - 0.25) < 0.025;
      rows.push({ pair: [b1, b2], kepler: [r1, r2], differenceRatio: ratio, offKeplerRhoScale: 1.2, offKeplerBracket9MinusOne: [o1.bracket9MinusOne, o2.bracket9MinusOne], bracketRatio: ratioB });
    }
    pass('5 slow approach: 9a minus 9 first order in beta; Section 9 bracket deviation second order', ok, { rows, note: 'On an exact Kepler circle the Section 9 bracket is exactly one (derived in the reference document), so its scaling is tested on a circle with radius scaled by 1.2.' });
  }
  // 6. integrator order on a closed-form delayed problem (rotated mirror delay law; exact solution = rigid circle)
  {
    const beta = 0.3, rho = 1, Omega = beta / rho, d = scalarCircleLag(beta), cosH = Math.cos(d / 2), sinH = Math.sin(d / 2);
    const Tend = 6;
    const errs = [];
    for (const h of [0.1, 0.05, 0.025, 0.0125]) {
      const hist = new History(2, rigidCirclePast(rho, Omega));
      const law = (hs, T, X, V, guesses) => {
        const out = [];
        for (let i = 0; i < 2; i++) {
          const j = 1 - i;
          const root = partnerRoot(hs, j, T, X[i], guesses ? guesses[i] : undefined);
          const st = hs.state(j, root.S);
          const r = sub(X[i], st.x);
          const rot = [cosH * r[0] - sinH * r[1], sinH * r[0] + cosH * r[1], r[2]]; // rotate by +d/2
          const Ai = scale(rot, -Omega * Omega / (2 * cosH));
          const Rr = norm(r), n = scale(r, 1 / Rr), Dt = CF - dot(n, st.v), Dr = CF - dot(n, V[i]);
          out.push({ Ai, S: root.S, p: Dr / Dt, detM: 1, Dt, R: Rr, residual: root.residual });
        }
        return out;
      };
      const res = evolve({ hist, law, X0: [[rho, 0, 0], [-rho, 0, 0]], V0: [[0, beta, 0], [0, -beta, 0]], Tend, h, Aminus0: [[-Omega * Omega * rho, 0, 0], [Omega * Omega * rho, 0, 0]], breakpoints: [] });
      const exact = rigidCirclePast(rho, Omega)(0, Tend).x;
      errs.push({ h, error: norm(sub(res.X[0], exact)), steps: res.record.steps });
    }
    const ratios = errs.slice(1).map((e, k) => errs[k].error / e.error);
    const orders = ratios.map(r => Math.log2(r));
    const ok = orders.every(o => o > 3.6 && o < 4.6);
    pass('6 integrator order on closed-form delayed problem', ok, { beta, rho, Tend, errors: errs, ratios, observedOrders: orders, nominalOrder: 4 });
  }
  receipt.allPassed = receipt.cases.every(c => c.pass);
  fs.writeFileSync(KNOWN_RECEIPT, JSON.stringify(receipt, null, 2) + '\n');
  return receipt;
}

// ------------------------------------------------------------------ preparations (preregistration Section 3)
export const TARGETS = {
  'SC-1': { kind: 'circle', beta: 0.05, window: 25133, periods: 2 },
  'SC-2': { kind: 'circle', beta: 0.02, window: 196350, periods: 1 },
  'SC-3': { kind: 'circle', beta: 0.1, window: 3142, periods: 2 },
  'WP-2': { kind: 'section9', X1: [1.5, 0, 0], V1: [0, 0.36742346141748, 0], X2: [-1.5, 0, 0], V2: [0, -0.36742346141748, 0], window: 476.09, periodTime: 476.09 / 20 },
  'WP-3': { kind: 'section9', X1: [0.5, 0, 0], V1: [0.00070710678119, 0.70710678118655, 0.00070710678119], X2: [-0.5, 0, 0], V2: [-0.00070710678119, -0.70710678118655, -0.00070710678119], window: 88.86, periodTime: 88.86 / 20 },
  'WP-1': { kind: 'section9', X1: [2, 0, 0], V1: [0.055, 0.35355339059327, 0.01], X2: [-2, 0, 0], V2: [0.05, -0.35355339059327, 0], window: 710.86, periodTime: 710.86 / 20 },
};

// Section 9 backward past over S in [-40, 0] with my RK4 and the instrument's right-hand side.
async function section9Past(X, V, h) {
  const inst = await import(INSTRUMENT_PATH);
  const P = inst.makeParams({ q: [-1, 1], lambda: LAMBDA, mu: MU, K: 1 });
  let y = Float64Array.from(inst.packState([{ x: X[0], v: V[0] }, { x: X[1], v: V[1] }]));
  const f = yy => inst.derivative(yy, P).dy;
  const nodes = [];
  const unpack = (yy, dy) => ({ X: [[yy[0], yy[1], yy[2]], [yy[3], yy[4], yy[5]]], V: [[yy[6], yy[7], yy[8]], [yy[9], yy[10], yy[11]]], A: [[dy[6], dy[7], dy[8]], [dy[9], dy[10], dy[11]]] });
  const nSteps = Math.ceil(40 / h), dt = -40 / nSteps;
  let t = 0;
  nodes.push({ t, ...unpack(y, f(y)) });
  const axpy = (a, s, b) => a.map((z, k) => z + s * b[k]);
  for (let k = 0; k < nSteps; k++) {
    const k1 = f(y), k2 = f(axpy(y, dt / 2, k1)), k3 = f(axpy(y, dt / 2, k2)), k4 = f(axpy(y, dt, k3));
    y = y.map((z, i) => z + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
    t += dt;
    nodes.push({ t, ...unpack(y, f(y)) });
  }
  nodes.reverse();
  const hist = new History(2, null);
  for (const nd of nodes) hist.push(nd.t, nd.X, nd.V, nd.A, nd.A);
  return { hist, A0minus: nodes[nodes.length - 1].A, minT: nodes[0].t };
}

export async function runTarget(label, opt = {}) {
  const spec = TARGETS[label];
  if (!spec) throw new Error(`unknown target ${label}`);
  const stepsPerPeriod = opt.stepsPerPeriod ?? 4000;
  const escapeRadius = opt.escapeRadius ?? 1e3; // preregistered value 1e3; any other value is a labeled deviation of the diagnostic only
  const t0 = Date.now();
  let hist, X0, V0, period, Aminus0, pastKind;
  if (spec.kind === 'circle') {
    const beta = spec.beta, rho = 1 / (4 * beta * beta), Omega = beta / rho;
    period = 2 * Math.PI / Omega;
    hist = new History(2, rigidCirclePast(rho, Omega));
    X0 = [[rho, 0, 0], [-rho, 0, 0]]; V0 = [[0, beta, 0], [0, -beta, 0]];
    Aminus0 = [[-Omega * Omega * rho, 0, 0], [Omega * Omega * rho, 0, 0]];
    pastKind = `rigid mirror circle rho=${rho} Omega=${Omega} for all S<0`;
  } else {
    period = spec.periodTime;
    X0 = [spec.X1.slice(), spec.X2.slice()]; V0 = [spec.V1.slice(), spec.V2.slice()];
    const h = period / stepsPerPeriod;
    const past = await section9Past(X0, V0, h);
    hist = past.hist; Aminus0 = past.A0minus;
    pastKind = `Section 9 backward solution over S in [${past.minT}, 0], RK4 step ${h}, right-hand side from the validated instrument`;
  }
  const window = opt.window ?? spec.window;
  const h = period / stepsPerPeriod;
  const samples = { T: [], rhoH2: [], r: [], h: [] };
  const sampleEvery = Math.max(1, Math.floor(window / h / 4000));
  const stats = { rMin: Infinity, rMax: -Infinity, betaMax: [0, 0], betaMin: [Infinity, Infinity], detMMin: Infinity, detMMax: -Infinity, DtMin: Infinity, residualMax: 0, asymmetryMax: 0, bracketMin: Infinity, bracketMax: -Infinity, rdotSignChanges: 0, delayMin: Infinity };
  const firstEvents = {};
  let lastRdot = null, nodeCount = 0, h0 = null, hEnd = null, lastDiag = null, firstAsymmetry = null, prevNode = null;
  const traj = [];
  const onNode = (T, X, V, A, diag, record) => {
    const d = pairDiagnostics(X, V);
    if (h0 === null) h0 = d.h; hEnd = d.h; lastDiag = { T, X, V, A, diag, d };
    stats.rMin = Math.min(stats.rMin, d.r); stats.rMax = Math.max(stats.rMax, d.r);
    for (let m = 0; m < 2; m++) { stats.betaMax[m] = Math.max(stats.betaMax[m], d.beta[m]); stats.betaMin[m] = Math.min(stats.betaMin[m], d.beta[m]); }
    for (const q of diag) { stats.detMMin = Math.min(stats.detMMin, q.detM); stats.detMMax = Math.max(stats.detMMax, q.detM); stats.DtMin = Math.min(stats.DtMin, q.Dt); stats.residualMax = Math.max(stats.residualMax, q.residual); stats.bracketMin = Math.min(stats.bracketMin, q.bracket); stats.bracketMax = Math.max(stats.bracketMax, q.bracket); stats.delayMin = Math.min(stats.delayMin, T - q.S); }
    if (spec.kind === 'circle' || label === 'WP-2' || label === 'WP-3') { const asym = norm(add(X[0], X[1])); stats.asymmetryMax = Math.max(stats.asymmetryMax, asym); if (firstAsymmetry === null && asym > 1e-9) firstAsymmetry = { T, asym }; }
    if (nodeCount % sampleEvery === 0) { samples.T.push(T); samples.rhoH2.push(d.rhoH * d.rhoH); samples.r.push(d.r); samples.h.push(d.h); traj.push({ T, X1: X[0], V1: V[0], X2: X[1], V2: V[1], A1: A[0], A2: A[1], r: d.r, h: d.h, eps: d.eps, detM: diag.map(q => q.detM), bracket: diag.map(q => q.bracket), S: diag.map(q => q.S) }); }
    nodeCount++;
    const refine = (test) => { // test(t) true once the event condition holds; bisect on the stored interpolant
      if (!prevNode) return T;
      let lo = prevNode.T, hi = T;
      for (let it = 0; it < 100 && hi - lo > 1e-13 * Math.max(1, hi); it++) { const mid = 0.5 * (lo + hi); if (test(mid)) hi = mid; else lo = mid; }
      return hi;
    };
    const stateAt = t => { const s0 = hist.state(0, t), s1 = hist.state(1, t); return pairDiagnostics([s0.x, s1.x], [s0.v, s1.v]); };
    const ev = (name, test) => { if (!firstEvents[name]) { const Tev = test ? refine(test) : T; firstEvents[name] = { T: Tev, TNode: T, r: d.r, h: d.h }; } };
    if (d.r < 1e-6) { ev('contact', t => stateAt(t).r < 1e-6); return 'event: contact'; }
    if (d.r > escapeRadius) { ev('escape', t => stateAt(t).r > escapeRadius); return 'event: escape'; }
    if (d.beta[0] >= 1 || d.beta[1] >= 1) { ev('speed-equality', t => { const q = stateAt(t); return q.beta[0] >= 1 || q.beta[1] >= 1; }); return 'census change: member speed reached c_f; stopped (self roots below the step cannot be enumerated by this reference)'; }
    if (diag.some(q => Math.abs(q.detM) < 1e-8)) { ev('obstruction'); return 'obstruction: |det M| < 1e-8'; }
    if (lastRdot !== null && lastRdot * d.rdot < 0) { stats.rdotSignChanges++; ev('turning-point'); }
    lastRdot = d.rdot; prevNode = { T };
    return null;
  };
  let result, error = null;
  try {
    result = evolve({ hist, law: (hs, T, X, V, g) => pairLaw(hs, T, X, V, g), X0, V0, Tend: window, h, onNode, Aminus0, breakpoints: [0] });
  } catch (err) {
    error = { message: err.message, type: err.constructor.name };
  }
  const wall = (Date.now() - t0) / 1000;
  const n = samples.T.length, half = Math.floor(n / 2);
  const slopeAll = leastSquaresSlope(samples.T, samples.rhoH2);
  const slope1 = leastSquaresSlope(samples.T.slice(0, half), samples.rhoH2.slice(0, half));
  const slope2 = leastSquaresSlope(samples.T.slice(half), samples.rhoH2.slice(half));
  const firstEventName = Object.keys(firstEvents).sort((a, b) => firstEvents[a].T - firstEvents[b].T)[0] || null;
  const jumps0 = result ? result.record.jumps.filter(j => j.breakpoint === 0) : [];
  const out = {
    label, preparation: { X0, V0, past: pastKind, window, step: h, stepsPerPeriod, period },
    termination: error ? `error: ${error.message}` : result.record.termination,
    endTime: lastDiag ? lastDiag.T : null,
    firstEvent: firstEventName ? { name: firstEventName, ...firstEvents[firstEventName] } : null,
    firstEvents,
    rMin: stats.rMin, rMax: stats.rMax, h0, hEnd, rhoH2Start: samples.rhoH2[0], rhoH2End: samples.rhoH2[n - 1],
    slopeRhoH2: { full: slopeAll, firstHalf: slope1, secondHalf: slope2 },
    speedExtremes: { max: stats.betaMax, min: stats.betaMin }, detMExtremes: { min: stats.detMMin, max: stats.detMMax },
    DtMin: stats.DtMin, bracketExtremes: { min: stats.bracketMin, max: stats.bracketMax }, delayMin: stats.delayMin, delayOverStep: stats.delayMin / h,
    rootResidualMax: stats.residualMax, mirrorAsymmetryMax: stats.asymmetryMax, firstAsymmetry, rdotSignChanges: stats.rdotSignChanges, escapeRadius,
    tinyIntervals: result ? result.record.tinyIntervals : null, crossingCorrections: result ? result.record.crossingCorrections : null, missedCrossings: result ? result.record.missedCrossings : null,
    compatibilityDefect: result ? [norm(sub(hist.aPlus[0][hist.locate(0)], Aminus0[0])), norm(sub(hist.aPlus[1][hist.locate(0)], Aminus0[1]))] : null,
    accelerationJumpAtFirstReceptionOfRelease: jumps0.map(j => ({ receiver: j.receiver, T: j.T, S: j.S, jump: j.jump, jumpVector: j.jumpVector })),
    jumpGenerations: result ? result.record.jumps.length : 0,
    jumpsFirstTen: result ? result.record.jumps.slice(0, 10).map(j => ({ receiver: j.receiver, T: j.T, breakpoint: j.breakpoint, jump: j.jump })) : [],
    steps: result ? result.record.steps : null, shortenedSteps: result ? result.record.shortenedSteps : null, nodes: hist.t.length,
    selfRootCensus: `none: max member speed ${Math.max(...stats.betaMax).toPrecision(6)} c_f over the whole stored history (proof: |X(T)-X(S)| < c_f (T-S) when speed < c_f)`,
    wallSeconds: wall, error,
  };
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(path.join(DATA_DIR, `${label}-spp${stepsPerPeriod}.json`), JSON.stringify({ label, stepsPerPeriod, h, samples: traj }, null, 0) + '\n');
  return out;
}

function mergeRuns(entry) {
  let doc = { schema: 'weber-delayed-pair-reference.runs.v1', lane: 'C (ramon-e-moore)', runs: [] };
  if (fs.existsSync(RUNS_PATH)) doc = JSON.parse(fs.readFileSync(RUNS_PATH, 'utf8'));
  doc.runs = doc.runs.filter(r => !(r.label === entry.label && r.preparation.stepsPerPeriod === entry.preparation.stepsPerPeriod && (r.escapeRadius ?? 1e3) === entry.escapeRadius));
  doc.runs.push({ recordedAtUtc: new Date().toISOString(), ...entry });
  doc.updatedAtUtc = new Date().toISOString();
  fs.writeFileSync(RUNS_PATH, JSON.stringify(doc, null, 2) + '\n');
}

// ------------------------------------------------------------------ CLI
async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const getOpt = (name, dflt) => { const i = rest.indexOf(name); return i >= 0 ? Number(rest[i + 1]) : dflt; };
  if (cmd === 'known') {
    const r = await runKnown();
    for (const c of r.cases) console.log(`${c.pass ? 'PASS' : 'FAIL'}  ${c.name}`);
    console.log(`allPassed=${r.allPassed} receipt=${KNOWN_RECEIPT}`);
    process.exit(r.allPassed ? 0 : 1);
  } else if (cmd === 'census') {
    const c = runCensus();
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const p = path.join(DATA_DIR, 'circle-census.json');
    fs.writeFileSync(p, JSON.stringify(c, null, 2) + '\n');
    console.log(JSON.stringify({ sub: c.sub.map(s => ({ beta: s.beta, partner: s.partnerCount, self: s.selfCount, Ct: s.Ct })), balanced: c.balanced.map(b => ({ beta: b.beta, Ct: b.Ct, Cr: b.Cr, rho: b.rho, detM: b.detM, partner: b.partnerCount, self: b.selfCount, censusConstant: b.censusConstant, continuous: b.continuous })), file: p }, null, 2));
  } else if (cmd === 'target') {
    const label = rest[0];
    if (!fs.existsSync(KNOWN_RECEIPT) || !JSON.parse(fs.readFileSync(KNOWN_RECEIPT, 'utf8')).allPassed) throw new Error('known-case receipt missing or failed; targets refused');
    const out = await runTarget(label, { stepsPerPeriod: getOpt('--steps-per-period', 4000), window: rest.includes('--window') ? getOpt('--window') : undefined, escapeRadius: rest.includes('--escape-radius') ? getOpt('--escape-radius') : undefined });
    if (!rest.includes('--no-record')) mergeRuns(out);
    console.log(JSON.stringify(out, null, 2));
  } else if (cmd === 'profile') {
    const out = await runTarget('SC-3', { stepsPerPeriod: 2000, window: 300 });
    console.log(JSON.stringify({ wallSeconds: out.wallSeconds, steps: out.steps, termination: out.termination, slope: out.slopeRhoH2, jumps: out.accelerationJumpAtFirstReceptionOfRelease, residual: out.rootResidualMax }, null, 2));
  } else {
    console.log('usage: known | census | target <label> [--steps-per-period N] [--window W] [--no-record] | profile');
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch(err => { console.error(err); process.exit(2); });
}
