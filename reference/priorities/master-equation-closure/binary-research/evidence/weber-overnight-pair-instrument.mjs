#!/usr/bin/env node
// Weber-overnight comparison instrument: N-member integrator for the fixed
// instantaneous Weber-inspired law of equation-variants/manuscript.md, Section 9.
// Research comparison instrument only: not an EOM solver, not an enclosure.
// Units: c_f = 1 (enforced), coupling K = 1 by default; lengths in K/c_f^2.
//
// Law (per ordered pair i <- j, r > 0, e = (X_i - X_j)/r, w = V_i - V_j):
//   A_{i<-j} = (sigma_ij K_ij / r^2) [1 + lambda rdot^2/c_f^2 + mu r rddot/c_f^2] e
//   rddot    = e.(A_i - A_j) + |w_perp|^2 / r,   X_i'' = sum_{j != i} A_{i<-j}.
// The unknown accelerations enter through rddot, so every right-hand-side
// evaluation assembles and solves a 3N x 3N linear system (partial-pivot LU).
// No pair-reduced scalar formula is used in the right-hand side; the Section 9
// scalar identity appears only in the controls, as an independent comparison.
//
// CLI:
//   node weber-overnight-pair-instrument.mjs controls [--receipt <path>]
//   node weber-overnight-pair-instrument.mjs run <case.json>
//   node weber-overnight-pair-instrument.mjs linearize <case.json>
//   node weber-overnight-pair-instrument.mjs smoke
// Module: import { runCase, solveAccelerations, linearize, eigenvalues, ... }.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const EPS = Number.EPSILON;
const HERE = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(HERE, '../../../../..');
export const RECEIPT_PATH = path.join(HERE, 'weber-overnight-pair-instrument-controls.json');
export const DATA_ROOT = path.join(REPO_ROOT, '.local-data/master-equation-closure/weber-overnight');

export class SingularSystemError extends Error {}

// ---------------------------------------------------------------- vectors
const dot3 = (a, ia, b, ib) => a[ia] * b[ib] + a[ia + 1] * b[ib + 1] + a[ia + 2] * b[ib + 2];
const norm = a => Math.sqrt(a.reduce((s, z) => s + z * z, 0));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const vsub = (a, b) => a.map((z, k) => z - b[k]);

// ---------------------------------------------------------------- parameters
export function makeParams(spec) {
  const cf = spec.cf ?? 1;
  if (cf !== 1) throw new Error('c_f must be instantiated as 1 in every numerical run (AGENTS.md)');
  const q = spec.q;
  if (!Array.isArray(q) || q.length < 2) throw new Error('need at least two members with polarities');
  for (const v of q) if (v !== 1 && v !== -1) throw new Error('polarity must be +1 or -1');
  const K = spec.K ?? 1;
  if (!(K > 0)) throw new Error('coupling K must be positive');
  if (typeof spec.lambda !== 'number' || typeof spec.mu !== 'number') throw new Error('lambda and mu are required numbers');
  const N = q.length;
  const sigma = new Float64Array(N * N), Kij = new Float64Array(N * N);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    sigma[i * N + j] = Math.sign(q[i] * q[j]);
    Kij[i * N + j] = K * Math.abs(q[i] * q[j]);
  }
  return { N, q: q.slice(), K, lambda: spec.lambda, mu: spec.mu, cf, sigma, Kij, condition: spec.condition ?? 'exact' };
}

export function packState(members) {
  const N = members.length, y = new Float64Array(6 * N);
  members.forEach((m, i) => { for (let a = 0; a < 3; a++) { y[3 * i + a] = m.x[a]; y[3 * N + 3 * i + a] = m.v[a]; } });
  return y;
}

// pair kinematics from the state vector (absolute frame)
export function pairKinematics(y, N, i, j) {
  const d = [y[3 * i] - y[3 * j], y[3 * i + 1] - y[3 * j + 1], y[3 * i + 2] - y[3 * j + 2]];
  const o = 3 * N;
  const w = [y[o + 3 * i] - y[o + 3 * j], y[o + 3 * i + 1] - y[o + 3 * j + 1], y[o + 3 * i + 2] - y[o + 3 * j + 2]];
  const r = Math.sqrt(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  const e = [d[0] / r, d[1] / r, d[2] / r];
  const rdot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
  const w2 = w[0] * w[0] + w[1] * w[1] + w[2] * w[2];
  const wperp2 = Math.max(0, w2 - rdot * rdot);
  return { d, w, r, e, rdot, wperp2 };
}

// ---------------------------------------------------------------- linear system
// Assemble M A = b directly from the boxed pair law, one ordered pair at a time.
export function assemble(y, P) {
  const { N, lambda, mu, cf } = P, n = 3 * N, c2 = cf * cf;
  const M = new Float64Array(n * n), b = new Float64Array(n);
  for (let k = 0; k < n; k++) M[k * n + k] = 1;
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const { r, e, rdot, wperp2 } = pairKinematics(y, N, i, j);
    if (!(r > 0)) throw new SingularSystemError(`zero separation for pair ${i},${j}`);
    const pref = P.sigma[i * N + j] * P.Kij[i * N + j] / (r * r);
    // rddot = e.(A_i - A_j) + wperp2/r ; the known part of the bracket:
    const rddotKnown = wperp2 / r;
    const bracketKnown = 1 + lambda * rdot * rdot / c2 + mu * r * rddotKnown / c2;
    // unknown part: pref * mu * r / c2 * e.(A_i - A_j), moved to the left side
    const cu = pref * mu * r / c2;
    for (let a = 0; a < 3; a++) {
      b[3 * i + a] += pref * bracketKnown * e[a];
      for (let bb = 0; bb < 3; bb++) {
        const t = cu * e[a] * e[bb];
        M[(3 * i + a) * n + 3 * i + bb] -= t;
        M[(3 * i + a) * n + 3 * j + bb] += t;
      }
    }
  }
  return { M, b, n };
}

export function luFactor(M, n) {
  const LU = Float64Array.from(M), piv = new Int32Array(n);
  let sign = 1, minPivot = Infinity, maxPivot = 0, logAbsDet = 0;
  for (let k = 0; k < n; k++) {
    let p = k, big = Math.abs(LU[k * n + k]);
    for (let i = k + 1; i < n; i++) { const v = Math.abs(LU[i * n + k]); if (v > big) { big = v; p = i; } }
    piv[k] = p;
    if (!(big > 0) || !Number.isFinite(big)) throw new SingularSystemError(`zero or non-finite pivot at column ${k}`);
    if (p !== k) { sign = -sign; for (let j = 0; j < n; j++) { const t = LU[k * n + j]; LU[k * n + j] = LU[p * n + j]; LU[p * n + j] = t; } }
    const pk = LU[k * n + k];
    minPivot = Math.min(minPivot, Math.abs(pk)); maxPivot = Math.max(maxPivot, Math.abs(pk));
    logAbsDet += Math.log(Math.abs(pk)); if (pk < 0) sign = -sign;
    for (let i = k + 1; i < n; i++) {
      const f = LU[i * n + k] / pk; LU[i * n + k] = f;
      if (f !== 0) for (let j = k + 1; j < n; j++) LU[i * n + j] -= f * LU[k * n + j];
    }
  }
  return { LU, piv, n, det: sign * Math.exp(logAbsDet), detSign: sign, logAbsDet, minPivot, maxPivot };
}

export function luSolve(F, rhs) {
  const { LU, piv, n } = F, x = Float64Array.from(rhs);
  for (let k = 0; k < n; k++) { const p = piv[k]; if (p !== k) { const t = x[k]; x[k] = x[p]; x[p] = t; } }
  for (let i = 1; i < n; i++) { let s = x[i]; for (let j = 0; j < i; j++) s -= LU[i * n + j] * x[j]; x[i] = s; }
  for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let j = i + 1; j < n; j++) s -= LU[i * n + j] * x[j]; x[i] = s / LU[i * n + i]; }
  return x;
}

// exact 1-norm condition number ||M||_1 ||M^{-1}||_1 (small systems)
export function condition1(M, F, n) {
  let nM = 0, nInv = 0;
  for (let j = 0; j < n; j++) { let s = 0; for (let i = 0; i < n; i++) s += Math.abs(M[i * n + j]); nM = Math.max(nM, s); }
  const e = new Float64Array(n);
  for (let j = 0; j < n; j++) {
    e.fill(0); e[j] = 1; const col = luSolve(F, e);
    let s = 0; for (let i = 0; i < n; i++) s += Math.abs(col[i]); nInv = Math.max(nInv, s);
  }
  return nM * nInv;
}

export function solveAccelerations(y, P) {
  const { M, b, n } = assemble(y, P);
  const F = luFactor(M, n);
  const A = luSolve(F, b);
  for (let k = 0; k < n; k++) if (!Number.isFinite(A[k])) throw new SingularSystemError('non-finite acceleration');
  const cond = P.condition === 'none' ? NaN : condition1(M, F, n);
  return { A, det: F.det, detSign: F.detSign, logAbsDet: F.logAbsDet, minPivot: F.minPivot, cond, M, b };
}

// first-order system y' = F(y), y = [X (3N), V (3N)]
export function derivative(y, P) {
  const N = P.N, s = solveAccelerations(y, P), dy = new Float64Array(6 * N);
  for (let k = 0; k < 3 * N; k++) { dy[k] = y[3 * N + k]; dy[3 * N + k] = s.A[k]; }
  return { dy, sol: s };
}

// Residual of the boxed law for given accelerations, recomputing rddot from A.
export function lawResidual(y, A, P) {
  const { N, lambda, mu, cf } = P, c2 = cf * cf;
  let maxAbs = 0, maxRel = 0;
  for (let i = 0; i < N; i++) {
    const sum = [0, 0, 0];
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      const { r, e, rdot, wperp2 } = pairKinematics(y, N, i, j);
      const rddot = e[0] * (A[3 * i] - A[3 * j]) + e[1] * (A[3 * i + 1] - A[3 * j + 1]) + e[2] * (A[3 * i + 2] - A[3 * j + 2]) + wperp2 / r;
      const mag = P.sigma[i * N + j] * P.Kij[i * N + j] / (r * r) * (1 + lambda * rdot * rdot / c2 + mu * r * rddot / c2);
      for (let a = 0; a < 3; a++) sum[a] += mag * e[a];
    }
    const res = norm([A[3 * i] - sum[0], A[3 * i + 1] - sum[1], A[3 * i + 2] - sum[2]]);
    const scale = Math.max(norm(sum), norm([A[3 * i], A[3 * i + 1], A[3 * i + 2]]), 1e-300);
    maxAbs = Math.max(maxAbs, res); maxRel = Math.max(maxRel, res / scale);
  }
  return { maxAbs, maxRel };
}

// ---------------------------------------------------------------- diagnostics
export function diagnostics(y, P) {
  const N = P.N, o = 3 * N, Psum = [0, 0, 0], L = [0, 0, 0], C = [0, 0, 0];
  for (let i = 0; i < N; i++) {
    const x = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], v = [y[o + 3 * i], y[o + 3 * i + 1], y[o + 3 * i + 2]];
    const l = cross(x, v);
    for (let a = 0; a < 3; a++) { Psum[a] += v[a]; L[a] += l[a]; C[a] += x[a] / N; }
  }
  return { P: Psum, L, C };
}

// Monitored candidate first integrals (not premises; not physical energy accounts).
export const candidates = {
  // historical Weber-type velocity-dependent expression, lambda = -1/2, mu = 1
  weber(y, P) {
    const N = P.N, o = 3 * N; let H = 0;
    for (let k = 0; k < 3 * N; k++) H += 0.5 * y[o + k] * y[o + k];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const { r, rdot } = pairKinematics(y, N, i, j);
      H += P.sigma[i * N + j] * P.Kij[i * N + j] / r * (1 - rdot * rdot / (2 * P.cf * P.cf));
    }
    return H;
  },
  // lambda = mu = 0 instantaneous inverse-square control
  kepler(y, P) {
    const N = P.N, o = 3 * N; let H = 0;
    for (let k = 0; k < 3 * N; k++) H += 0.5 * y[o + k] * y[o + k];
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) H += P.sigma[i * N + j] * P.Kij[i * N + j] / pairKinematics(y, N, i, j).r;
    return H;
  },
};
export function pickCandidate(name, P) {
  if (typeof name === 'function') return name;
  if (name === 'none') return null;
  if (name === 'weber' || name === 'kepler') return candidates[name];
  if (P.lambda === -0.5 && P.mu === 1) return candidates.weber;
  if (P.lambda === 0 && P.mu === 0) return candidates.kepler;
  return null;
}

// ---------------------------------------------------------------- one-step methods
function scaledMaxErr(y0, y1, err, atol, rtol) {
  let m = 0;
  for (let k = 0; k < y0.length; k++) {
    const sc = atol + rtol * Math.max(Math.abs(y0[k]), Math.abs(y1[k]));
    m = Math.max(m, Math.abs(err[k]) / sc);
  }
  return m;
}

// Dormand-Prince 5(4)
const DP = {
  c: [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1],
  a: [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9],
    [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
    [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
    [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]],
  b: [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0],
  e: [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40],
};

export function makeStepper(method, f, opt) {
  const rtol = opt.rtol ?? 1e-12, atol = opt.atol ?? 1e-14;
  if (method === 'rk4') {
    return {
      method, adaptive: false,
      step(y0, f0, h) {
        const n = y0.length, t = new Float64Array(n);
        const k1 = f0;
        for (let i = 0; i < n; i++) t[i] = y0[i] + 0.5 * h * k1[i]; const k2 = f(t);
        for (let i = 0; i < n; i++) t[i] = y0[i] + 0.5 * h * k2[i]; const k3 = f(t);
        for (let i = 0; i < n; i++) t[i] = y0[i] + h * k3[i]; const k4 = f(t);
        const y = new Float64Array(n);
        for (let i = 0; i < n; i++) y[i] = y0[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
        return { y, err: 0, hNew: h, nfev: 3 };
      },
    };
  }
  if (method === 'dp54') {
    return {
      method, adaptive: true,
      step(y0, f0, h) {
        const n = y0.length, k = [f0], t = new Float64Array(n);
        for (let s = 1; s < 7; s++) {
          const a = DP.a[s];
          for (let i = 0; i < n; i++) { let acc = 0; for (let m = 0; m < s; m++) acc += a[m] * k[m][i]; t[i] = y0[i] + h * acc; }
          k.push(f(t));
        }
        const y = Float64Array.from(t); // stage 7 point equals the 5th-order solution
        const err = new Float64Array(n);
        for (let i = 0; i < n; i++) { let acc = 0; for (let m = 0; m < 7; m++) acc += DP.e[m] * k[m][i]; err[i] = h * acc; }
        const e = scaledMaxErr(y0, y, err, atol, rtol);
        const fac = e === 0 ? 5 : Math.min(5, Math.max(0.2, 0.9 * Math.pow(e, -1 / 5)));
        return { y, err: e, hNew: h * fac, nfev: 6, order: 5 };
      },
    };
  }
  if (method === 'gbs') {
    // Gragg-Bulirsch-Stoer extrapolation of the modified midpoint rule,
    // sequence n_j = 2(j+1); diagonal entry T_jj has order 2(j+1).
    const kmax = opt.kmax ?? 9, seq = Array.from({ length: kmax }, (_, j) => 2 * (j + 1));
    return {
      method, adaptive: true,
      step(y0, f0, H) {
        const n = y0.length; let prev = null, nfev = 0, e = Infinity, j;
        for (j = 0; j < kmax; j++) {
          const m = seq[j], hs = H / m;
          let zp = Float64Array.from(y0), z = new Float64Array(n);
          for (let i = 0; i < n; i++) z[i] = y0[i] + hs * f0[i];
          for (let s = 1; s < m; s++) {
            const fz = f(z); nfev++;
            const zn = new Float64Array(n);
            for (let i = 0; i < n; i++) zn[i] = zp[i] + 2 * hs * fz[i];
            zp = z; z = zn;
          }
          const row = [z];
          for (let k = 1; k <= j; k++) {
            const ratio = (seq[j] / seq[j - k]) ** 2 - 1, R = new Float64Array(n);
            for (let i = 0; i < n; i++) R[i] = row[k - 1][i] + (row[k - 1][i] - prev[k - 1][i]) / ratio;
            row.push(R);
          }
          if (j >= 1) {
            const diff = new Float64Array(n);
            for (let i = 0; i < n; i++) diff[i] = row[j][i] - row[j - 1][i];
            e = scaledMaxErr(y0, row[j], diff, atol, rtol);
            if (j >= 2 && e <= 1) {
              const fac = e === 0 ? 4 : Math.min(4, Math.max(0.2, 0.9 * Math.pow(e, -1 / (2 * j + 1))));
              return { y: row[j], err: e, hNew: H * fac, nfev, order: 2 * (j + 1) };
            }
          }
          prev = row;
        }
        const fac = Math.min(0.9, Math.max(0.2, 0.9 * Math.pow(e, -1 / (2 * kmax - 1))));
        return { y: prev[prev.length - 1], err: e, hNew: H * fac, nfev, order: 2 * kmax };
      },
    };
  }
  throw new Error(`unknown method ${method}`);
}

// ---------------------------------------------------------------- events
export const DEFAULT_EVENTS = {
  rContact: 1e-6, // K/c_f^2
  rEscape: 1e4,
  detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10,
  contact: { stop: true }, escape: { stop: true }, obstruction: { stop: true },
  speed: { record: true, stop: false }, turning: { record: true, floor: 0 },
};

function buildEventDefs(P, ev) {
  const defs = [], N = P.N;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    defs.push({ name: `contact:${i}-${j}`, kind: 'contact', i, j, dir: 'down', stop: ev.contact.stop !== false });
    defs.push({ name: `escape:${i}-${j}`, kind: 'escape', i, j, dir: 'down', stop: ev.escape.stop !== false });
    if (ev.turning.record !== false) defs.push({ name: `turning:${i}-${j}`, kind: 'turning', i, j, dir: 'both', stop: false, floor: ev.turning.floor ?? 0 });
  }
  if (ev.speed.record !== false || ev.speed.stop) for (let i = 0; i < N; i++) defs.push({ name: `speed:${i}`, kind: 'speed', i, dir: 'both', stop: !!ev.speed.stop });
  defs.push({ name: 'obstruction:det', kind: 'obstruction', which: 'det', dir: 'down', stop: ev.obstruction.stop !== false });
  defs.push({ name: 'obstruction:pivot', kind: 'obstruction', which: 'pivot', dir: 'down', stop: ev.obstruction.stop !== false });
  if (P.condition !== 'none') defs.push({ name: 'obstruction:cond', kind: 'obstruction', which: 'cond', dir: 'down', stop: ev.obstruction.stop !== false });
  return defs;
}

function eventValues(y, sol, P, defs, ev, detSign0) {
  const N = P.N, o = 3 * N, g = new Float64Array(defs.length);
  defs.forEach((d, k) => {
    if (d.kind === 'contact') g[k] = pairKinematics(y, N, d.i, d.j).r - ev.rContact;
    else if (d.kind === 'escape') g[k] = ev.rEscape - pairKinematics(y, N, d.i, d.j).r;
    else if (d.kind === 'turning') g[k] = pairKinematics(y, N, d.i, d.j).rdot;
    else if (d.kind === 'speed') g[k] = Math.hypot(y[o + 3 * d.i], y[o + 3 * d.i + 1], y[o + 3 * d.i + 2]) - P.cf;
    else if (d.which === 'det') g[k] = detSign0 * sol.det - ev.detMin;
    else if (d.which === 'pivot') g[k] = sol.minPivot - ev.pivotMin;
    else g[k] = Math.log(ev.condMax) - Math.log(sol.cond);
  });
  return g;
}

function crossed(d, g0, g1) {
  if (d.dir === 'down') return g0 > 0 && g1 <= 0;
  if (g0 === 0) return false;
  if (d.floor && Math.max(Math.abs(g0), Math.abs(g1)) < d.floor) return false;
  return (g0 > 0 && g1 <= 0) || (g0 < 0 && g1 >= 0);
}

// signed in-plane angle increment of the pair's relative vector about axis n
function angleIncrement(u0, u1, n) {
  const c = cross(u0, u1);
  return Math.atan2(c[0] * n[0] + c[1] * n[1] + c[2] * n[2], u0[0] * u1[0] + u0[1] * u1[1] + u0[2] * u1[2]);
}

// ---------------------------------------------------------------- driver
export function runCase(spec, hooks = {}) {
  const coeff = spec.coefficients ?? {};
  const P = makeParams({ q: spec.members.map(m => m.q), K: coeff.K, lambda: coeff.lambda, mu: coeff.mu, cf: coeff.cf, condition: spec.condition });
  const N = P.N, integ = spec.integrator ?? {};
  const method = integ.method ?? 'gbs';
  const ev = { ...DEFAULT_EVENTS, ...(spec.events ?? {}) };
  for (const key of ['contact', 'escape', 'obstruction', 'speed', 'turning']) ev[key] = { ...DEFAULT_EVENTS[key], ...((spec.events ?? {})[key] ?? {}) };
  const tEnd = spec.tEnd;
  if (!(tEnd > 0)) throw new Error('tEnd must be positive');
  const cand = pickCandidate(spec.candidate ?? 'auto', P);
  let nfev = 0;
  const f = yy => { nfev++; return derivative(yy, P).dy; };
  const stepper = makeStepper(method, f, integ);
  const hmax = integ.hmax ?? tEnd / 20, hmin = integ.hmin ?? 1e-14 * Math.max(1, tEnd);
  let y = packState(spec.members), t = 0;

  const evaluate = yy => { nfev++; const { dy, sol } = derivative(yy, P); return { f: dy, sol }; };
  let cur = evaluate(y);
  const detSign0 = Math.sign(cur.sol.det) || 1;
  const defs = buildEventDefs(P, ev);
  let g0 = eventValues(y, cur.sol, P, defs, ev, detSign0);
  const initialViolations = defs.filter((d, k) => d.dir === 'down' && !(g0[k] > 0)).map(d => d.name);
  // speed exactly equal to c_f at the start: later departures from equality are not reported as crossings
  const initialAtSpeedBoundary = defs.filter((d, k) => d.kind === 'speed' && g0[k] === 0).map(d => d.i);

  // per-pair unwrapped angle bookkeeping
  const pairs = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const k = pairKinematics(y, N, i, j); let nAx = cross(k.d, k.w); const nn = norm(nAx);
    nAx = nn > 1e-14 * k.r * Math.max(norm(k.w), 1e-300) ? nAx.map(z => z / nn) : [0, 0, 1];
    pairs.push({ i, j, axis: nAx, phi: 0, u: k.d.slice(), rMin: k.r, rMax: k.r });
  }
  const pairIndex = (i, j) => pairs.findIndex(p => p.i === i && p.j === j);

  const D0 = diagnostics(y, P), H0 = cand ? cand(y, P) : null;
  const stats = { maxDP: 0, maxDL: 0, maxDC: 0, maxRelDH: 0, minAbsDet: Math.abs(cur.sol.det), minPivot: cur.sol.minPivot, maxCond: cur.sol.cond || 0, maxSpeed: new Array(N).fill(0) };
  const speeds = yy => Array.from({ length: N }, (_, i) => Math.hypot(yy[3 * N + 3 * i], yy[3 * N + 3 * i + 1], yy[3 * N + 3 * i + 2]));
  const record = (tt, yy, sol) => {
    const D = diagnostics(yy, P), H = cand ? cand(yy, P) : null;
    stats.maxDP = Math.max(stats.maxDP, norm(vsub(D.P, D0.P)));
    stats.maxDL = Math.max(stats.maxDL, norm(vsub(D.L, D0.L)));
    stats.maxDC = Math.max(stats.maxDC, norm(vsub(D.C, D0.C.map((c, a) => c + D0.P[a] / N * tt))));
    if (cand) stats.maxRelDH = Math.max(stats.maxRelDH, Math.abs(H - H0) / Math.max(Math.abs(H0), 1e-300));
    stats.minAbsDet = Math.min(stats.minAbsDet, Math.abs(sol.det)); stats.minPivot = Math.min(stats.minPivot, sol.minPivot);
    if (Number.isFinite(sol.cond)) stats.maxCond = Math.max(stats.maxCond, sol.cond);
    speeds(yy).forEach((s, i) => { stats.maxSpeed[i] = Math.max(stats.maxSpeed[i], s); });
    return { D, H };
  };
  const out = hooks.onRecord ?? (() => {});
  const stateLine = (tt, yy, sol, extra = {}) => {
    const { D, H } = record(tt, yy, sol);
    return { type: 'state', t: tt, x: Array.from(yy.slice(0, 3 * N)), v: Array.from(yy.slice(3 * N)), det: sol.det, minPivot: sol.minPivot, cond: sol.cond, H, P: D.P, L: D.L, C: D.C, phi: pairs.map(p => p.phi), ...extra };
  };
  out(stateLine(t, y, cur.sol, { initial: true }));

  const events = []; let steps = 0, rejects = 0, termination = null, every = spec.output?.every ?? 1;
  let h = integ.h ?? integ.h0 ?? Math.min(hmax, 1e-3 * tEnd);
  if (method === 'rk4' && !integ.h) throw new Error('rk4 requires integrator.h');
  const wall0 = Date.now();
  const maxSteps = integ.maxSteps ?? 5e6;

  while (!termination) {
    if (t >= tEnd) { termination = { reason: 'final-time', t }; break; }
    if (steps >= maxSteps) { termination = { reason: 'max-steps', t }; break; }
    let hTry = Math.min(h, hmax, tEnd - t);
    const last = hTry >= tEnd - t;
    let res, nxt;
    try {
      res = stepper.step(y, cur.f, hTry);
      if (res.err > 1 && stepper.adaptive) { rejects++; h = res.hNew; if (h < hmin) termination = { reason: 'step-underflow', t }; continue; }
      for (let k = 0; k < res.y.length; k++) if (!Number.isFinite(res.y[k])) throw new SingularSystemError('non-finite state');
      nxt = evaluate(res.y);
    } catch (err) {
      if (!(err instanceof SingularSystemError)) throw err;
      if (!stepper.adaptive) { termination = { reason: 'singular-system-in-step', t, message: err.message }; break; }
      rejects++; h = hTry * 0.25;
      if (h < hmin) termination = { reason: 'step-underflow-singular', t, message: err.message };
      continue;
    }
    const tStepEnd = last ? tEnd : t + hTry;
    const g1 = eventValues(res.y, nxt.sol, P, defs, ev, detSign0);
    const hits = [];
    defs.forEach((d, k) => { if (crossed(d, g0[k], g1[k])) hits.push(k); });
    let stopAt = null;
    if (hits.length) {
      const located = hits.map(k => locate(k));
      located.sort((a, b) => a.tau - b.tau);
      for (const L of located) {
        const d = defs[L.k];
        const rec = { type: 'event', name: d.name, kind: d.kind, t: t + L.tau, stop: d.stop };
        if (d.kind === 'turning' || d.kind === 'contact' || d.kind === 'escape') {
          const pk = pairKinematics(L.y, N, d.i, d.j), pi = pairs[pairIndex(d.i, d.j)];
          rec.pair = [d.i, d.j]; rec.r = pk.r; rec.rdot = pk.rdot; rec.rel = pk.d;
          rec.phi = pi.phi + angleIncrement(pi.u, pk.d, pi.axis);
          if (d.kind === 'turning') rec.turn = g0[L.k] < 0 ? 'minimum' : 'maximum';
        }
        if (d.kind === 'speed') { rec.member = d.i; rec.direction = g0[L.k] < 0 ? 'rising-through-cf' : 'falling-through-cf'; rec.speed = speeds(L.y)[d.i]; }
        if (d.kind === 'obstruction') { rec.det = L.sol.det; rec.minPivot = L.sol.minPivot; rec.cond = L.sol.cond; }
        rec.locate = { iterations: L.it, bracket: L.width };
        events.push(rec); out(rec);
        if (d.stop) { stopAt = L; break; }
      }
    }
    if (stopAt) {
      const tt = t + stopAt.tau;
      advancePairs(stopAt.y);
      out(stateLine(tt, stopAt.y, stopAt.sol, { final: true }));
      y = stopAt.y; t = tt; cur = { f: null, sol: stopAt.sol }; steps++;
      termination = { reason: defs[stopAt.k].kind, event: defs[stopAt.k].name, t: tt };
      break;
    }
    advancePairs(res.y);
    t = tStepEnd; y = res.y; cur = nxt; g0 = g1; steps++;
    if (stepper.adaptive) h = Math.max(res.hNew, hmin);
    if (steps % every === 0 || t >= tEnd) out(stateLine(t, y, cur.sol, t >= tEnd ? { final: true } : {}));
    else record(t, y, cur.sol);
    if (hooks.heartbeat && steps % (hooks.heartbeatEvery ?? 5000) === 0) hooks.heartbeat({ t, steps, nfev });

    // locate a sign change of event k inside (0, hTry] by Illinois with re-stepping from (t, y)
    function locate(k) {
      const d = defs[k]; let lo = 0, hi = hTry, glo = g0[k], ghi = g1[k], side = 0, it = 0;
      let best = { tau: hTry, y: res.y, sol: nxt.sol };
      const target = d.dir === 'down' ? 0 : 0;
      while (it < 80 && hi - lo > 4 * EPS * Math.max(1, Math.abs(t) + hTry)) {
        it++;
        let tau = (lo * ghi - hi * glo) / (ghi - glo);
        if (!(tau > lo && tau < hi) || it % 8 === 0) tau = 0.5 * (lo + hi);
        let gy, sy, ssol;
        try {
          sy = stepper.step(y, cur.f, tau).y; const e2 = evaluate(sy); ssol = e2.sol;
          gy = eventValues(sy, ssol, P, defs, ev, detSign0)[k] - target;
        } catch (err) { if (!(err instanceof SingularSystemError)) throw err; gy = null; }
        const afterSide = gy === null || (glo > 0 ? gy <= 0 : gy >= 0);
        if (afterSide) { hi = tau; if (gy !== null) { best = { tau, y: sy, sol: ssol }; ghi = gy; } if (side === 1) glo /= 2; side = 1; }
        else { lo = tau; glo = gy; if (side === -1) ghi /= 2; side = -1; }
        if (gy === 0) break;
      }
      return { k, tau: best.tau, y: best.y, sol: best.sol, it, width: hi - lo };
    }
  }

  function advancePairs(yy) {
    for (const p of pairs) {
      const k = pairKinematics(yy, N, p.i, p.j);
      p.phi += angleIncrement(p.u, k.d, p.axis); p.u = k.d.slice();
      p.rMin = Math.min(p.rMin, k.r); p.rMax = Math.max(p.rMax, k.r);
    }
  }

  const Df = diagnostics(y, P), Hf = cand ? cand(y, P) : null;
  return {
    name: spec.name ?? null,
    law: 'equation-variants/manuscript.md Section 9, instantaneous support, unit integration weights',
    coefficients: { lambda: P.lambda, mu: P.mu, K: P.K, cf: P.cf },
    polarities: P.q, method, rtol: integ.rtol ?? 1e-12, atol: integ.atol ?? 1e-14, h: integ.h ?? null, hmax,
    tEnd, termination, tFinal: t, steps, rejects, nfev, wallSeconds: (Date.now() - wall0) / 1000,
    initialViolations, initialAtSpeedBoundary, events,
    final: { x: Array.from(y.slice(0, 3 * N)), v: Array.from(y.slice(3 * N)) },
    diagnostics: {
      initial: { ...D0, H: H0 }, final: { ...Df, H: Hf },
      candidate: cand === candidates.weber ? 'weber' : cand === candidates.kepler ? 'kepler' : cand ? 'user' : 'none',
      maxAbsDeltaSumV: stats.maxDP, maxAbsDeltaSumXxV: stats.maxDL, maxAbsCentreDeviationFromLinear: stats.maxDC,
      maxRelDriftCandidate: cand ? stats.maxRelDH : null, finalRelDriftCandidate: cand ? (Hf - H0) / Math.max(Math.abs(H0), 1e-300) : null,
      minAbsDet: stats.minAbsDet, minPivot: stats.minPivot, maxCond: stats.maxCond, maxSpeed: stats.maxSpeed,
      centreVelocity: D0.P.map(z => z / N),
      speedFrame: 'absolute (void) frame of the supplied coordinates; centre velocity reported separately',
    },
    pairs: pairs.map(p => ({ pair: [p.i, p.j], phiUnwrapped: p.phi, rMin: p.rMin, rMax: p.rMax })),
  };
}

// ---------------------------------------------------------------- linearization
// Rotating-frame vector field (angular velocity omega): X' = U,
// U' = A(X, U + omega x X) - 2 omega x U - omega x (omega x X). Valid because the
// law depends only on relative positions and inertial relative velocities.
export function rotatingDerivative(y, P, omega) {
  const N = P.N, o = 3 * N, yi = Float64Array.from(y);
  for (let i = 0; i < N; i++) {
    const x = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], wx = cross(omega, x);
    for (let a = 0; a < 3; a++) yi[o + 3 * i + a] = y[o + 3 * i + a] + wx[a];
  }
  const { A } = solveAccelerations(yi, P), dy = new Float64Array(6 * N);
  for (let i = 0; i < N; i++) {
    const x = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], u = [y[o + 3 * i], y[o + 3 * i + 1], y[o + 3 * i + 2]];
    const cor = cross(omega, u), cen = cross(omega, cross(omega, x));
    for (let a = 0; a < 3; a++) { dy[3 * i + a] = u[a]; dy[o + 3 * i + a] = A[3 * i + a] - 2 * cor[a] - cen[a]; }
  }
  return dy;
}

// central-difference Jacobian with Richardson step control (h and h/2)
export function jacobian(F, y, opt = {}) {
  const n = y.length, rel = opt.step ?? 1e-4, scale = opt.scale ?? 1;
  const J = Array.from({ length: n }, () => new Float64Array(n));
  let errEst = 0;
  for (let k = 0; k < n; k++) {
    const h = rel * Math.max(Math.abs(y[k]), scale);
    const col = hh => { const yp = Float64Array.from(y), ym = Float64Array.from(y); yp[k] += hh; ym[k] -= hh; const fp = F(yp), fm = F(ym); return fp.map((z, i) => (z - fm[i]) / (2 * hh)); };
    const c1 = col(h), c2 = col(h / 2);
    for (let i = 0; i < n; i++) { J[i][k] = (4 * c2[i] - c1[i]) / 3; errEst = Math.max(errEst, Math.abs(c2[i] - c1[i]) / 3); }
  }
  return { J, errEst };
}

// eigenvalues of a real nonsymmetric matrix: balance, Hessenberg (elimination), Francis double-shift QR
export function eigenvalues(Ain) {
  const n = Ain.length, a = Ain.map(r => Array.from(r));
  // balance
  const RADIX = 2, sq = RADIX * RADIX; let done = false;
  while (!done) {
    done = true;
    for (let i = 0; i < n; i++) {
      let r = 0, c = 0;
      for (let j = 0; j < n; j++) if (j !== i) { c += Math.abs(a[j][i]); r += Math.abs(a[i][j]); }
      if (c && r) {
        let g = r / RADIX, f = 1; const s = c + r;
        while (c < g) { f *= RADIX; c *= sq; }
        g = r * RADIX;
        while (c > g) { f /= RADIX; c /= sq; }
        if ((c + r) / f < 0.95 * s) { done = false; g = 1 / f; for (let j = 0; j < n; j++) a[i][j] *= g; for (let j = 0; j < n; j++) a[j][i] *= f; }
      }
    }
  }
  // Hessenberg by stabilized elimination
  for (let m = 1; m < n - 1; m++) {
    let x = 0, i = m;
    for (let j = m; j < n; j++) if (Math.abs(a[j][m - 1]) > Math.abs(x)) { x = a[j][m - 1]; i = j; }
    if (i !== m) {
      for (let j = m - 1; j < n; j++) { const t = a[i][j]; a[i][j] = a[m][j]; a[m][j] = t; }
      for (let j = 0; j < n; j++) { const t = a[j][i]; a[j][i] = a[j][m]; a[j][m] = t; }
    }
    if (x) for (i = m + 1; i < n; i++) {
      let y = a[i][m - 1];
      if (y) { y /= x; a[i][m - 1] = y; for (let j = m; j < n; j++) a[i][j] -= y * a[m][j]; for (let j = 0; j < n; j++) a[j][m] += y * a[j][i]; }
    }
  }
  for (let i = 2; i < n; i++) for (let j = 0; j < i - 1; j++) a[i][j] = 0;
  // Francis double-shift QR
  const wr = new Array(n).fill(0), wi = new Array(n).fill(0), SIGN = (p, q) => (q >= 0 ? Math.abs(p) : -Math.abs(p));
  let anorm = 0;
  for (let i = 0; i < n; i++) for (let j = Math.max(i - 1, 0); j < n; j++) anorm += Math.abs(a[i][j]);
  let nn = n - 1, t = 0;
  while (nn >= 0) {
    let its = 0, l;
    do {
      for (l = nn; l >= 1; l--) {
        let s = Math.abs(a[l - 1][l - 1]) + Math.abs(a[l][l]);
        if (s === 0) s = anorm;
        if (Math.abs(a[l][l - 1]) + s === s) { a[l][l - 1] = 0; break; }
      }
      let x = a[nn][nn];
      if (l === nn) { wr[nn] = x + t; wi[nn--] = 0; }
      else {
        let y = a[nn - 1][nn - 1], w = a[nn][nn - 1] * a[nn - 1][nn];
        if (l === nn - 1) {
          const p = 0.5 * (y - x), q = p * p + w; let z = Math.sqrt(Math.abs(q));
          x += t;
          if (q >= 0) { z = p + SIGN(z, p); wr[nn - 1] = wr[nn] = x + z; if (z) wr[nn] = x - w / z; wi[nn - 1] = wi[nn] = 0; }
          else { wr[nn - 1] = wr[nn] = x + p; wi[nn - 1] = -(wi[nn] = z); }
          nn -= 2;
        } else {
          if (its === 60) throw new Error('too many QR iterations');
          if (its === 10 || its === 20) {
            t += x; for (let i = 0; i <= nn; i++) a[i][i] -= x;
            const s = Math.abs(a[nn][nn - 1]) + Math.abs(a[nn - 1][nn - 2]);
            y = x = 0.75 * s; w = -0.4375 * s * s;
          }
          ++its;
          let m, p, q, r, z;
          for (m = nn - 2; m >= l; m--) {
            z = a[m][m]; r = x - z; let s = y - z;
            p = (r * s - w) / a[m + 1][m] + a[m][m + 1]; q = a[m + 1][m + 1] - z - r - s; r = a[m + 2][m + 1];
            s = Math.abs(p) + Math.abs(q) + Math.abs(r); p /= s; q /= s; r /= s;
            if (m === l) break;
            const u = Math.abs(a[m][m - 1]) * (Math.abs(q) + Math.abs(r));
            const v = Math.abs(p) * (Math.abs(a[m - 1][m - 1]) + Math.abs(z) + Math.abs(a[m + 1][m + 1]));
            if (u + v === v) break;
          }
          for (let i = m + 2; i <= nn; i++) { a[i][i - 2] = 0; if (i !== m + 2) a[i][i - 3] = 0; }
          for (let k = m; k <= nn - 1; k++) {
            if (k !== m) {
              p = a[k][k - 1]; q = a[k + 1][k - 1]; r = 0; if (k !== nn - 1) r = a[k + 2][k - 1];
              x = Math.abs(p) + Math.abs(q) + Math.abs(r);
              if (x !== 0) { p /= x; q /= x; r /= x; }
            }
            const s = SIGN(Math.sqrt(p * p + q * q + r * r), p);
            if (s !== 0) {
              if (k === m) { if (l !== m) a[k][k - 1] = -a[k][k - 1]; } else a[k][k - 1] = -s * x;
              p += s; x = p / s; y = q / s; z = r / s; q /= p; r /= p;
              for (let j = k; j <= nn; j++) {
                p = a[k][j] + q * a[k + 1][j];
                if (k !== nn - 1) { p += r * a[k + 2][j]; a[k + 2][j] -= p * z; }
                a[k + 1][j] -= p * y; a[k][j] -= p * x;
              }
              const mmin = nn < k + 3 ? nn : k + 3;
              for (let i = l; i <= mmin; i++) {
                p = x * a[i][k] + y * a[i][k + 1];
                if (k !== nn - 1) { p += z * a[i][k + 2]; a[i][k + 2] -= p * r; }
                a[i][k + 1] -= p * q; a[i][k] -= p;
              }
            }
          }
        }
      }
    } while (l < nn - 1);
  }
  return wr.map((re, k) => ({ re, im: wi[k] }));
}

// Linearize the first-order system about a supplied state. Refuses a spectrum
// unless the state is an equilibrium of the chosen frame (|F(y*)| <= balanceTol).
export function linearize(spec, opt = {}) {
  const coeff = spec.coefficients ?? {};
  const P = makeParams({ q: spec.members.map(m => m.q), K: coeff.K, lambda: coeff.lambda, mu: coeff.mu, cf: coeff.cf });
  const y = packState(spec.members), omega = spec.frame?.omega ?? [0, 0, 0];
  const F = yy => rotatingDerivative(yy, P, omega);
  const f0 = F(y), balance = Math.max(...Array.from(f0, Math.abs));
  const balanceTol = opt.balanceTol ?? spec.balanceTol ?? 1e-10;
  const result = { frameOmega: omega, balanceResidualMax: balance, balanceTol, balanced: balance <= balanceTol };
  if (!result.balanced && !opt.allowUnbalanced) { result.note = 'state is not an equilibrium of this frame; no spectrum reported'; return result; }
  const { J, errEst } = jacobian(F, y, opt);
  result.jacobianErrorEstimate = errEst;
  result.eigenvalues = eigenvalues(J).sort((u, v) => u.im - v.im || u.re - v.re);
  return result;
}

// ---------------------------------------------------------------- Kepler closed forms (controls)
function keplerE(M, e) { let E = e < 0.8 ? M : Math.PI; for (let k = 0; k < 100; k++) { const d = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); E -= d; if (Math.abs(d) < 1e-16) break; } return E; }
function pairMembers(rel, relV, q = [1, -1]) {
  return [{ x: rel.map(z => z / 2), v: relV.map(z => z / 2), q: q[0] }, { x: rel.map(z => -z / 2), v: relV.map(z => -z / 2), q: q[1] }];
}
function relOf(y) { return [y[0] - y[3], y[1] - y[4], y[2] - y[5]]; }

// deterministic PRNG for controls
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// independent rddot: numerical second derivative of r(t) = |d + w t + a t^2/2| at t = 0
function rddotNumeric(d, w, a) {
  const rr = tt => norm(d.map((z, k) => z + w[k] * tt + 0.5 * a[k] * tt * tt));
  const r0 = norm(d), tau = Math.min(r0 / Math.max(norm(w), 1e-300), Math.sqrt(r0 / Math.max(norm(a), 1e-300)), 1e3);
  const D = hh => (rr(hh) - 2 * r0 + rr(-hh)) / (hh * hh);
  const h = 0.02 * tau, d1 = D(h), d2 = D(h / 2), d3 = D(h / 4);
  const e1 = (4 * d2 - d1) / 3, e2 = (4 * d3 - d2) / 3;
  return (16 * e2 - e1) / 15;
}

export function runControls() {
  const out = { instrument: 'reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-pair-instrument.mjs', command: 'node reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-pair-instrument.mjs controls', date: new Date().toISOString(), node: process.version, units: { cf: 1, K: 1 }, claimBoundary: 'Floating-point comparison against closed forms on the listed cases only; not an enclosure; no Weber-coefficient target was run before these controls.', controls: [] };
  const push = (c) => { out.controls.push(c); return c; };
  const GM = 2; // relative inverse-square coupling 2K for an opposite-polarity pair, unit weights
  const tightGBS = { method: 'gbs', rtol: 1e-13, atol: 1e-15 };
  const zeroCoeff = { lambda: 0, mu: 0, K: 1, cf: 1 };

  // (a1) circular angular rate
  {
    const r = 1, om = Math.sqrt(GM / r ** 3), T = 2 * Math.PI / om, nOrb = 10;
    const res = runCase({ members: pairMembers([r, 0, 0], [0, om * r, 0]), coefficients: zeroCoeff, integrator: { ...tightGBS, hmax: T / 8 }, tEnd: nOrb * T, events: { turning: { record: false }, speed: { record: false } } });
    const rel = relOf(res.final.x);
    const phiErr = Math.abs(res.pairs[0].phiUnwrapped - om * res.tFinal);
    const rErr = Math.max(Math.abs(res.pairs[0].rMax - r), Math.abs(res.pairs[0].rMin - r));
    const posErr = norm(vsub(rel, [r * Math.cos(om * res.tFinal), r * Math.sin(om * res.tFinal), 0]));
    const tol = { phi: 1e-9, r: 1e-10 };
    push({ id: 'a1-kepler-circular-rate', reference: 'closed form: relative circular rate omega = sqrt(2K/r^3) for lambda=mu=0, sigma=-1, unit weights', case: { r, omega: om, orbits: nOrb, method: 'gbs', rtol: 1e-13, atol: 1e-15 }, tolerance: tol, phiError: phiErr, radiusError: rErr, finalPositionError: posErr, relDriftH0: res.diagnostics.maxRelDriftCandidate, steps: res.steps, nfev: res.nfev, wallSeconds: res.wallSeconds, pass: phiErr < tol.phi && rErr < tol.r });
  }
  // (a2,a3) eccentric orbit: position via Kepler's equation; radial period; apsides
  const ecc = { a: 3, e: 0.5 };
  {
    const { a, e } = ecc, rp = a * (1 - e), vp = Math.sqrt(GM * (1 + e) / (a * (1 - e))), n = Math.sqrt(GM / a ** 3), T = 2 * Math.PI / n;
    const checkTimes = [1.7, 7.3, 13.9, 2.5 * T + 0.37];
    const posErrs = [];
    for (const tc of checkTimes) {
      const res = runCase({ members: pairMembers([rp, 0, 0], [0, vp, 0]), coefficients: zeroCoeff, integrator: { ...tightGBS, hmax: T / 16 }, tEnd: tc, events: { turning: { record: false }, speed: { record: false } } });
      const E = keplerE(n * tc, e), ref = [a * (Math.cos(E) - e), a * Math.sqrt(1 - e * e) * Math.sin(E), 0];
      const y = Float64Array.from([...res.final.x, ...res.final.v]);
      posErrs.push({ t: tc, error: norm(vsub(relOf(y), ref)) / a });
    }
    const nOrb = 5;
    const res = runCase({ members: pairMembers([rp, 0, 0], [0, vp, 0]), coefficients: zeroCoeff, integrator: { ...tightGBS, hmax: T / 16 }, tEnd: nOrb * T + 0.25 * T, events: { speed: { record: false } } });
    const mins = res.events.filter(x => x.kind === 'turning' && x.turn === 'minimum'), maxs = res.events.filter(x => x.kind === 'turning' && x.turn === 'maximum');
    const periods = mins.slice(1).map((m, k) => m.t - mins[k].t);
    const periodErr = Math.max(...periods.map(p => Math.abs(p - T) / T), Math.abs(mins[0].t - T) / T);
    const apoErr = Math.max(...maxs.map(x => Math.abs(x.r - a * (1 + e)) / a)), periErr = Math.max(...mins.map(x => Math.abs(x.r - rp) / a));
    const apsidal = mins.slice(1).map((m, k) => m.phi - mins[k].phi), apsidalErr = Math.max(...apsidal.map(x => Math.abs(x - 2 * Math.PI)));
    const firstApoErr = Math.abs(maxs[0].t - T / 2) / T;
    const tol = { position: 1e-9, period: 1e-10, apsides: 1e-10, apsidalAngle: 1e-8 };
    push({ id: 'a2-kepler-eccentric-position', reference: "closed form: Kepler's equation E - e sin E = n t, relative coupling 2K", case: { a, e, rp, vp, method: 'gbs', rtol: 1e-13, atol: 1e-15 }, tolerance: { relPosition: tol.position }, errors: posErrs, pass: posErrs.every(p => p.error < tol.position) });
    push({ id: 'a3-kepler-radial-period-and-apsides', reference: 'closed form: T = 2 pi sqrt(a^3/(2K)), r_min = a(1-e), r_max = a(1+e), zero apsidal advance', case: { a, e, orbits: nOrb, expectedPeriod: T }, tolerance: tol, measuredPeriods: periods, firstPericentreReturn: mins[0].t, maxRelPeriodError: periodErr, firstApocentreRelTimeError: firstApoErr, maxRelApocentreError: apoErr, maxRelPericentreError: periErr, maxApsidalAngleError: apsidalErr, relDriftH0: res.diagnostics.maxRelDriftCandidate, steps: res.steps, nfev: res.nfev, wallSeconds: res.wallSeconds, wallSecondsPerOrbit: res.wallSeconds / (nOrb + 0.25), pass: periodErr < tol.period && firstApoErr < tol.period && apoErr < tol.apsides && periErr < tol.apsides && apsidalErr < tol.apsidalAngle });
  }
  // (a4) radial infall from rest to contact; member speed crossing c_f
  {
    const r0 = 1, rc = 1e-6;
    const tOf = r => { const psi = Math.acos(2 * r / r0 - 1); return Math.sqrt(r0 ** 3 / (8 * GM)) * (psi + Math.sin(psi)); };
    const tContact = tOf(rc), tSpeed = tOf(1 / (1 / r0 + 2 / GM)); // member speed 1 <=> relative speed 2
    const res = runCase({ members: pairMembers([r0, 0, 0], [0, 0, 0]), coefficients: zeroCoeff, integrator: { method: 'gbs', rtol: 1e-13, atol: 1e-18, hmax: 0.05 }, tEnd: 2, events: { rContact: rc, turning: { record: false } } });
    const sp = res.events.filter(x => x.kind === 'speed');
    const contactErr = Math.abs(res.termination.t - tContact), speedErr = Math.max(...sp.map(x => Math.abs(x.t - tSpeed)));
    const tol = { contactTime: 1e-9, speedCrossingTime: 1e-11 };
    push({ id: 'a4-kepler-radial-infall-contact', reference: 'closed form: radial Kepler fall r = r0(1+cos psi)/2, t = sqrt(r0^3/(8*2K))(psi + sin psi)', case: { r0, rContact: rc }, tolerance: tol, termination: res.termination, expectedContactTime: tContact, contactTimeError: contactErr, speedEvents: sp.map(x => ({ member: x.member, t: x.t, direction: x.direction })), expectedSpeedCrossingTime: tSpeed, speedCrossingTimeError: speedErr, steps: res.steps, nfev: res.nfev, pass: res.termination.reason === 'contact' && contactErr < tol.contactTime && sp.length === 2 && speedErr < tol.speedCrossingTime && sp.every(x => x.direction === 'rising-through-cf') });
  }
  // (a5) parabolic radial escape: r(t) = (r0^{3/2} + (3/2) sqrt(2 GM) t)^{2/3}
  {
    const r0 = 2, rEsc = 50, w0 = Math.sqrt(2 * GM / r0);
    const tEsc = (rEsc ** 1.5 - r0 ** 1.5) / (1.5 * Math.sqrt(2 * GM));
    const res = runCase({ members: pairMembers([r0, 0, 0], [w0, 0, 0]), coefficients: zeroCoeff, integrator: { ...tightGBS, hmax: 10 }, tEnd: 2 * tEsc, events: { rEscape: rEsc, turning: { record: false } } });
    const sp = res.events.filter(x => x.kind === 'speed');
    const err = Math.abs(res.termination.t - tEsc) / tEsc, tol = { relEscapeTime: 1e-10 };
    push({ id: 'a5-kepler-parabolic-escape', reference: 'closed form: zero-energy radial motion r(t)^{3/2} = r0^{3/2} + (3/2) sqrt(2*2K) t', case: { r0, rEscape: rEsc, relSpeed0: w0 }, tolerance: tol, termination: res.termination, expectedEscapeTime: tEsc, relEscapeTimeError: err, speedEvents: sp.map(x => ({ member: x.member, t: x.t, direction: x.direction })), pass: res.termination.reason === 'escape' && err < tol.relEscapeTime });
  }
  // (g) obstruction event on a test-only coefficient pair (lambda=0, mu=-1, sigma=-1):
  // det = 1 - 2/r; from rest at r0 the collinear motion obeys rddot = -2/(r(r-2)),
  // so rdot^2/2 = ln((r0-2) r/(r0 (r-2))); the time to det = detMin is a quadrature.
  // These coefficients exercise the event machinery only; they are not a target case.
  {
    const r0 = 3, detMin = 1e-3, rd = 2 / (1 - detMin);
    const integrand = s => { if (s === 0) return Math.sqrt(r0 * (r0 - 2)); const r = r0 - s * s; const G = 2 * Math.log1p(2 * s * s / (r0 * (r - 2))); return 2 * s / Math.sqrt(G); };
    const simpson = (f, a, b, fa, fm, fb, whole, tol, depth) => { const m = (a + b) / 2, lm = (a + m) / 2, rm = (m + b) / 2, flm = f(lm), frm = f(rm); const left = (m - a) / 6 * (fa + 4 * flm + fm), right = (b - m) / 6 * (fm + 4 * frm + fb); if (depth > 50 || Math.abs(left + right - whole) <= 15 * tol) return left + right + (left + right - whole) / 15; return simpson(f, a, m, fa, flm, fm, left, tol / 2, depth + 1) + simpson(f, m, b, fm, frm, fb, right, tol / 2, depth + 1); };
    const sMax = Math.sqrt(r0 - rd), fa = integrand(0), fb = integrand(sMax), fm = integrand(sMax / 2);
    const tRef = simpson(integrand, 0, sMax, fa, fm, fb, sMax / 6 * (fa + 4 * fm + fb), 1e-14, 0);
    const res = runCase({ members: pairMembers([r0, 0, 0], [0, 0, 0]), coefficients: { lambda: 0, mu: -1, K: 1, cf: 1 }, integrator: { ...tightGBS, hmax: 0.1 }, tEnd: 10, events: { detMin, turning: { record: false }, speed: { record: false } } });
    const ev = res.events.find(x => x.kind === 'obstruction');
    const err = Math.abs(res.termination.t - tRef), tol = { obstructionTime: 1e-9, detAtEvent: 1e-9 };
    push({ id: 'g-obstruction-event-test-coefficients', reference: 'independent adaptive-Simpson quadrature of the collinear energy relation for det = 1 - 2/r (test-only coefficients lambda=0, mu=-1)', case: { r0, detMin, rAtThreshold: rd }, tolerance: tol, termination: res.termination, expectedTime: tRef, timeError: err, detAtEvent: ev ? ev.det : null, pass: res.termination.reason === 'obstruction' && res.termination.event === 'obstruction:det' && err < tol.obstructionTime && ev && Math.abs(ev.det - detMin) < tol.detAtEvent });
  }
  // (b) lambda = mu = 0: sum of velocities and angular momentum, pair and N = 4
  {
    const R = rng(11), members = [];
    const q4 = [1, -1, 1, -1];
    for (let i = 0; i < 4; i++) members.push({ x: [3 * (R() - 0.5), 3 * (R() - 0.5), 3 * (R() - 0.5)], v: [0.4 * (R() - 0.5), 0.4 * (R() - 0.5), 0.4 * (R() - 0.5)], q: q4[i] });
    const res4 = runCase({ members, coefficients: zeroCoeff, integrator: { ...tightGBS, hmax: 0.5 }, tEnd: 5, events: { turning: { record: false }, speed: { record: false } } });
    const { a, e } = ecc, rp = a * (1 - e), vp = Math.sqrt(GM * (1 + e) / (a * (1 - e)));
    const res2 = runCase({ members: pairMembers([rp, 0, 0], [0, vp, 0]).map((m, k) => ({ ...m, v: [m.v[0] + 0.1, m.v[1], m.v[2] + 0.05] })), coefficients: zeroCoeff, integrator: { ...tightGBS, hmax: 1 }, tEnd: 50, events: { turning: { record: false }, speed: { record: false } } });
    const tol = { sumV: 1e-11, angularMomentumRel: 1e-10, centre: 1e-11, H0rel: 1e-10 }; // sumV: round-off accumulation of solved accelerations over ~1e3 steps
    const rows = [res2, res4].map((res, k) => {
      const L0 = norm(res.diagnostics.initial.L);
      return { case: k === 0 ? 'eccentric pair with centre drift, t=50' : 'N=4 random mixed polarity, t=5', termination: res.termination, maxAbsDeltaSumV: res.diagnostics.maxAbsDeltaSumV, maxRelDeltaSumXxV: res.diagnostics.maxAbsDeltaSumXxV / L0, maxCentreDeviation: res.diagnostics.maxAbsCentreDeviationFromLinear, maxRelDriftH0: res.diagnostics.maxRelDriftCandidate, minPairSeparation: Math.min(...res.pairs.map(p => p.rMin)) };
    });
    push({ id: 'b-zero-coefficient-linear-and-angular-invariants', reference: 'antisymmetric pair contributions (sum of accelerations zero, central directions) for lambda=mu=0', tolerance: tol, rows, pass: rows.every(r => r.termination.reason === 'final-time' && r.maxAbsDeltaSumV < tol.sumV && r.maxRelDeltaSumXxV < tol.angularMomentumRel && r.maxCentreDeviation < tol.centre && r.maxRelDriftH0 < tol.H0rel) });
  }
  // (c) linear-solve check for pairs at lambda=-1/2, mu=1; determinant form
  {
    const R = rng(23); let maxLaw = 0, maxRdd = 0, maxIdent = 0, maxDetRel = 0, maxAntisym = 0, maxPerp = 0, n = 0, maxCond = 0, nearSingularSkipped = 0;
    const expRows = [];
    for (let s = 0; s < 2000; s++) {
      const sig = s % 2 === 0 ? -1 : 1, r = Math.exp(Math.log(0.05) + R() * (Math.log(50) - Math.log(0.05)));
      const dir = [R() - 0.5, R() - 0.5, R() - 0.5], dn = norm(dir), d = dir.map(z => z * r / dn);
      const w = [3 * (R() - 0.5), 3 * (R() - 0.5), 3 * (R() - 0.5)], vc = [R() - 0.5, R() - 0.5, R() - 0.5];
      const P = makeParams({ q: [1, sig], lambda: -0.5, mu: 1 });
      const fac = 1 - 2 * sig * 1 * 1 / r;
      if (Math.abs(fac) < 1e-3) { nearSingularSkipped++; continue; }
      const y = packState([{ x: d.map(z => z / 2), v: vc.map((z, k) => z + w[k] / 2), q: 1 }, { x: d.map(z => -z / 2), v: vc.map((z, k) => z - w[k] / 2), q: sig }]);
      const sol = solveAccelerations(y, P); n++;
      maxCond = Math.max(maxCond, sol.cond);
      const lr = lawResidual(y, sol.A, P); maxLaw = Math.max(maxLaw, lr.maxRel);
      const Ai = Array.from(sol.A.slice(0, 3)), Aj = Array.from(sol.A.slice(3, 6));
      maxAntisym = Math.max(maxAntisym, norm(Ai.map((z, k) => z + Aj[k])) / norm(Ai));
      const e = d.map(z => z / r), fsol = Ai[0] * e[0] + Ai[1] * e[1] + Ai[2] * e[2];
      maxPerp = Math.max(maxPerp, norm(Ai.map((z, k) => z - fsol * e[k])) / norm(Ai));
      // independent rddot (numerical differentiation of |relative position|)
      const arel = Ai.map((z, k) => z - Aj[k]);
      const rdotv = e[0] * w[0] + e[1] * w[1] + e[2] * w[2], wperp2 = norm(w) ** 2 - rdotv ** 2;
      const rddFormula = e[0] * arel[0] + e[1] * arel[1] + e[2] * arel[2] + wperp2 / r, rddNum = rddotNumeric(d, w, arel);
      maxRdd = Math.max(maxRdd, Math.abs(rddFormula - rddNum) / Math.max(Math.abs(rddFormula), wperp2 / r, 1e-300));
      // Section 9 scalar identity, used only as a comparison
      const fIdent = sig / (r * r) * (1 - 0.5 * rdotv * rdotv + wperp2) / fac;
      maxIdent = Math.max(maxIdent, Math.abs(fsol - fIdent) / Math.abs(fIdent));
      maxDetRel = Math.max(maxDetRel, Math.abs(sol.det - fac) / (1 + 2 / r)); // absolute error scaled by the size of the terms forming the factor
      if (s < 400 && Math.abs(Math.log(Math.abs(fac))) > 1e-2) expRows.push(Math.log(Math.abs(sol.det)) / Math.log(Math.abs(fac)));
    }
    // determinant independence from velocities, lambda; dependence on mu, sigma, r
    const formRows = [];
    for (const mu of [1, 0.37, -2]) for (const sig of [-1, 1]) for (const r of [0.1, 0.5, 1.5, 3, 10, 100]) {
      const fac = 1 - 2 * sig * mu / r; if (Math.abs(fac) < 1e-6) continue;
      const dets = [];
      for (const lam of [-0.5, 0, 2]) for (const wv of [[0, 0, 0], [0.3, -1.2, 0.7]]) {
        const P = makeParams({ q: [1, sig], lambda: lam, mu });
        const y = packState([{ x: [r * 0.6, r * 0.8, 0].map(z => z / 2), v: wv.map(z => z / 2), q: 1 }, { x: [r * 0.6, r * 0.8, 0].map(z => -z / 2), v: wv.map(z => -z / 2), q: sig }]);
        dets.push(solveAccelerations(y, P).det);
      }
      const spread = Math.max(...dets) - Math.min(...dets);
      formRows.push({ mu, sigma: sig, r, det: dets[0], factor: fac, relDiff: Math.abs(dets[0] - fac) / Math.abs(fac), spreadOverLambdaAndVelocity: spread, exponent: Math.abs(Math.log(Math.abs(fac))) > 1e-3 ? Math.log(Math.abs(dets[0])) / Math.log(Math.abs(fac)) : null });
    }
    const exps = formRows.filter(x => x.exponent !== null).map(x => x.exponent).concat(expRows);
    const expMin = Math.min(...exps), expMax = Math.max(...exps);
    const tol = { lawResidualRel: 1e-12, rddotIndependentRel: 1e-7, section9IdentityRel: 1e-12, detScaled: 1e-14, detRel: 1e-13, antisymmetry: 1e-13, perpendicular: 1e-13 };
    const maxFormDiff = Math.max(...formRows.map(x => x.relDiff)), maxSpread = Math.max(...formRows.map(x => x.spreadOverLambdaAndVelocity));
    push({ id: 'c-pair-linear-solve-and-determinant', reference: 'boxed Section 9 law residual (round-off), independent numerical second derivative of |X_i - X_j|, and the Section 9 scalar pair identity (comparison only)', case: { states: n, coefficients: { lambda: -0.5, mu: 1 }, rRange: [0.05, 50], relSpeedBox: 1.5, nearSingularSkipped, maxCond }, tolerance: tol, maxLawResidualRel: maxLaw, maxRddotIndependentRel: maxRdd, maxSection9IdentityRel: maxIdent, maxScaledDetMinusFactor: maxDetRel, detScaling: "abs(det - (1 - 2 sigma K mu/r)) / (1 + 2 K mu/r), mu = 1", maxAntisymmetry: maxAntisym, maxPerpendicularFraction: maxPerp, determinantForm: { observed: 'det M = (1 - 2 sigma K mu/(c_f^2 r))^p with p = 1, independent of lambda and velocities', exponentRange: [expMin, expMax], maxRelDiffOverGrid: maxFormDiff, maxSpreadOverLambdaAndVelocity: maxSpread, grid: formRows, agreementWithSection9Factor: 'agrees: the only non-unit eigenvalue of the 6x6 pair matrix is the Section 9 factor (sum and transverse-difference directions carry eigenvalue 1)' }, pass: maxLaw < tol.lawResidualRel && maxRdd < tol.rddotIndependentRel && maxIdent < tol.section9IdentityRel && maxDetRel < tol.detScaled && maxAntisym < tol.antisymmetry && maxPerp < tol.perpendicular && Math.abs(expMin - 1) < 1e-10 && Math.abs(expMax - 1) < 1e-10 && maxFormDiff < tol.detRel && maxSpread < 1e-14 });
  }
  // (d) N = 4 random states: all pair laws satisfied to round-off
  {
    const R = rng(37); let maxLaw = 0, maxRdd = 0, maxCond = 0, minAbsDet = Infinity, maxSumA = 0; const rows = [];
    for (let s = 0; s < 500; s++) {
      const q = [0, 1, 2, 3].map(() => (R() < 0.5 ? 1 : -1));
      const members = q.map(qq => ({ x: [4 * (R() - 0.5), 4 * (R() - 0.5), 4 * (R() - 0.5)], v: [2 * (R() - 0.5), 2 * (R() - 0.5), 2 * (R() - 0.5)], q: qq }));
      const P = makeParams({ q, lambda: -0.5, mu: 1 }), y = packState(members);
      let sol; try { sol = solveAccelerations(y, P); } catch { continue; }
      if (sol.cond > 1e8) continue;
      const lr = lawResidual(y, sol.A, P); maxLaw = Math.max(maxLaw, lr.maxRel);
      maxCond = Math.max(maxCond, sol.cond); minAbsDet = Math.min(minAbsDet, Math.abs(sol.det));
      const sA = [0, 1, 2].map(a => sol.A[a] + sol.A[3 + a] + sol.A[6 + a] + sol.A[9 + a]);
      maxSumA = Math.max(maxSumA, norm(sA) / Math.max(...[0, 1, 2, 3].map(i => norm(Array.from(sol.A.slice(3 * i, 3 * i + 3))))));
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
        const pk = pairKinematics(y, 4, i, j), arel = [0, 1, 2].map(a => sol.A[3 * i + a] - sol.A[3 * j + a]);
        const f = pk.e[0] * arel[0] + pk.e[1] * arel[1] + pk.e[2] * arel[2] + pk.wperp2 / pk.r, nm = rddotNumeric(pk.d, pk.w, arel);
        maxRdd = Math.max(maxRdd, Math.abs(f - nm) / Math.max(Math.abs(f), pk.wperp2 / pk.r, 1e-300));
      }
      if (rows.length < 3) rows.push({ q, det: sol.det, cond: sol.cond, lawResidualRel: lr.maxRel });
    }
    const tol = { lawResidualRel: 1e-11, rddotIndependentRel: 1e-7, sumAccelerations: 1e-12 };
    push({ id: 'd-n4-linear-solve', reference: 'boxed Section 9 law for every member (residual with rddot recomputed from solved accelerations) and independent numerical rddot', case: { states: 500, condCut: 1e8, coefficients: { lambda: -0.5, mu: 1 } }, tolerance: tol, maxLawResidualRel: maxLaw, maxRddotIndependentRel: maxRdd, maxRelSumOfAccelerations: maxSumA, maxCond, minAbsDet, examples: rows, pass: maxLaw < tol.lawResidualRel && maxRdd < tol.rddotIndependentRel && maxSumA < tol.sumAccelerations });
  }
  // (e) integrator refinement: RK4 order and three-method agreement on the eccentric Kepler pair
  {
    const { a, e } = ecc, rp = a * (1 - e), vp = Math.sqrt(GM * (1 + e) / (a * (1 - e))), n = Math.sqrt(GM / a ** 3), T = 2 * Math.PI / n;
    const tc = T; const E = keplerE(n * tc, e), ref = [a * (Math.cos(E) - e), a * Math.sqrt(1 - e * e) * Math.sin(E), 0];
    const run = integ => { const res = runCase({ members: pairMembers([rp, 0, 0], [0, vp, 0]), coefficients: zeroCoeff, integrator: integ, tEnd: tc, events: { turning: { record: false }, speed: { record: false } } }); const y = Float64Array.from([...res.final.x, ...res.final.v]); return { err: norm(vsub(relOf(y), ref)) / a, steps: res.steps, nfev: res.nfev }; };
    const rk = [400, 800, 1600, 3200].map(m => ({ stepsPerOrbit: m, ...run({ method: 'rk4', h: T / m, hmax: T }) }));
    const orders = rk.slice(1).map((x, k) => Math.log2(rk[k].err / x.err));
    const dp = run({ method: 'dp54', rtol: 1e-11, atol: 1e-13, hmax: T / 16 });
    const gb = run({ method: 'gbs', rtol: 1e-13, atol: 1e-15, hmax: T / 16 });
    push({ id: 'e-integrator-refinement', reference: "Kepler's equation after one radial period (a=3, e=0.5)", rk4: rk, rk4ObservedOrders: orders, dp54: dp, gbs: gb, tolerance: { rk4OrderWindow: [3.7, 4.3], dp54: 1e-8, gbs: 1e-10 }, pass: orders.every(o => o > 3.7 && o < 4.3) && dp.err < 1e-8 && gb.err < 1e-10 });
  }
  // (f) eigenvalue routine on known matrices; linearization of circular Kepler pair in rotating frame
  {
    const R = rng(51), n = 8;
    const B = Array.from({ length: n }, () => new Array(n).fill(0));
    const known = [3, -1, 0.5, 1e-3]; known.forEach((v, k) => { B[k][k] = v; });
    const blocks = [[2, 1.5], [-0.3, 0.7]];
    blocks.forEach(([re, im], k) => { const i0 = 4 + 2 * k; B[i0][i0] = re; B[i0 + 1][i0 + 1] = re; B[i0][i0 + 1] = im; B[i0 + 1][i0] = -im; });
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (!(i >= 4 && j === i + 1 && i % 2 === 0)) B[i][j] += 0.3 * (R() - 0.5);
    const S = Array.from({ length: n }, () => Array.from({ length: n }, () => R() - 0.5)); for (let i = 0; i < n; i++) S[i][i] += 2;
    const SF = luFactor(Float64Array.from(S.flat()), n);
    const SB = S.map(row => B[0].map((_, j) => row.reduce((s, z, k) => s + z * B[k][j], 0)));
    const Sinv = Array.from({ length: n }, (_, j) => { const e = new Float64Array(n); e[j] = 1; return luSolve(SF, e); }); // columns
    const Mx = SB.map(row => Array.from({ length: n }, (_, j) => row.reduce((s, z, k) => s + z * Sinv[j][k], 0)));
    const expected = [...known.map(v => ({ re: v, im: 0 })), ...blocks.flatMap(([re, im]) => [{ re, im }, { re, im: -im }])];
    const got = eigenvalues(Mx);
    const match = (gotL, expL) => { const used = new Set(); let m = 0; for (const x of expL) { let best = -1, bd = Infinity; gotL.forEach((g, k) => { if (used.has(k)) return; const dd = Math.hypot(g.re - x.re, g.im - x.im); if (dd < bd) { bd = dd; best = k; } }); used.add(best); m = Math.max(m, bd); } return m; };
    const errKnown = match(got, expected);
    // companion matrix of (x-1)(x+2)(x^2+2x+5)(x-0.5): roots 1,-2,-1+-2i,0.5
    const roots = [{ re: 1, im: 0 }, { re: -2, im: 0 }, { re: -1, im: 2 }, { re: -1, im: -2 }, { re: 0.5, im: 0 }];
    let poly = [1]; // coefficients highest first, built from real factors
    const mulp = (p, q) => { const r = new Array(p.length + q.length - 1).fill(0); p.forEach((a, i) => q.forEach((b, j) => { r[i + j] += a * b; })); return r; };
    for (const f of [[1, -1], [1, 2], [1, 2, 5], [1, -0.5]]) poly = mulp(poly, f);
    const deg = poly.length - 1, Cm = Array.from({ length: deg }, () => new Array(deg).fill(0));
    for (let j = 0; j < deg; j++) Cm[0][j] = -poly[j + 1] / poly[0]; for (let i = 1; i < deg; i++) Cm[i][i - 1] = 1;
    const errComp = match(eigenvalues(Cm), roots);
    // circular Kepler pair, rotating frame
    const r = 1, om = Math.sqrt(GM / r ** 3);
    const spec = { members: pairMembers([r, 0, 0], [0, 0, 0]), coefficients: zeroCoeff, frame: { omega: [0, 0, om] } };
    const lin = linearize(spec, { balanceTol: 1e-12 });
    const expectK = [...Array(4).fill({ re: 0, im: 0 }), ...Array(4).fill({ re: 0, im: om }), ...Array(4).fill({ re: 0, im: -om })];
    const errLin = lin.eigenvalues ? match(lin.eigenvalues, expectK) : Infinity;
    const offBalance = linearize({ ...spec, frame: { omega: [0, 0, om * 1.01] } });
    const tol = { knownMatrix: 1e-10, companion: 1e-10, keplerRotating: 1e-5 };
    push({ id: 'f-linearization-helper', reference: 'similarity-transformed block matrix with prescribed spectrum; companion matrix of a polynomial with known roots; lambda=mu=0 circular pair in the co-rotating frame (expected spectrum: 0 x4, +-i*omega x4 each, omega = sqrt(2K/r^3): epicyclic frequency equals orbital rate, out-of-plane tilt at omega, centre translation gives +-i*omega and 0 in the rotating frame)', tolerance: tol, knownMatrixMaxError: errKnown, companionMaxError: errComp, kepler: { omega: om, balanceResidualMax: lin.balanceResidualMax, jacobianErrorEstimate: lin.jacobianErrorEstimate, eigenvalues: lin.eigenvalues, maxErrorToExpected: errLin, note: 'eigenvalues 0 and +-i*omega are defective (Jordan blocks), so splitting of order sqrt(Jacobian error) is expected' }, refusesUnbalanced: { balanced: offBalance.balanced, balanceResidualMax: offBalance.balanceResidualMax, spectrumReported: !!offBalance.eigenvalues }, pass: errKnown < tol.knownMatrix && errComp < tol.companion && lin.balanced && errLin < tol.keplerRotating && !offBalance.balanced && !offBalance.eigenvalues });
  }
  out.allPass = out.controls.every(c => c.pass);
  return out;
}

// ---------------------------------------------------------------- CLI
function writeRun(spec, specPath) {
  const sub = spec.output?.subdir ?? 'binary';
  const dir = path.resolve(REPO_ROOT, spec.output?.dir ?? path.join(DATA_ROOT, sub));
  fs.mkdirSync(dir, { recursive: true });
  const stem = spec.output?.stem ?? (spec.name ?? path.basename(specPath ?? 'case', '.json'));
  const trajPath = path.join(dir, `${stem}.trajectory.jsonl`), sumPath = path.join(dir, `${stem}.summary.json`);
  const fd = fs.openSync(trajPath, 'w');
  const summary = runCase(spec, {
    onRecord: rec => fs.writeSync(fd, JSON.stringify(rec) + '\n'),
    heartbeat: hb => process.stderr.write(`[heartbeat ${new Date().toISOString()}] t=${hb.t} steps=${hb.steps} nfev=${hb.nfev}\n`),
  });
  fs.closeSync(fd);
  summary.caseFile = specPath ?? null; summary.trajectory = path.relative(REPO_ROOT, trajPath); summary.date = new Date().toISOString();
  summary.command = specPath ? `node ${path.relative(REPO_ROOT, fileURLToPath(import.meta.url))} run ${path.relative(REPO_ROOT, path.resolve(specPath))}` : null;
  fs.writeFileSync(sumPath, JSON.stringify(summary, null, 2) + '\n');
  return { summary, trajPath, sumPath };
}

function smokeCases() {
  // Loose-tolerance code-path checks only; not preregistered targets, not interpreted.
  const W = { lambda: -0.5, mu: 1, K: 1, cf: 1 }, loose = { method: 'gbs', rtol: 1e-8, atol: 1e-10, hmax: 0.5 };
  return [
    { name: 'smoke-weber-opposite-planar', members: pairMembers([4, 0, 0], [0, 0.6, 0]), coefficients: W, integrator: loose, tEnd: 30, output: { subdir: 'binary', stem: 'smoke-weber-opposite-planar' } },
    { name: 'smoke-weber-same-collinear', members: pairMembers([5, 0, 0], [-0.4, 0, 0], [1, 1]), coefficients: W, integrator: loose, tEnd: 20, output: { subdir: 'binary', stem: 'smoke-weber-same-collinear' } },
    { name: 'smoke-weber-opposite-dp54', members: pairMembers([4, 0, 0], [0, 0.6, 0]), coefficients: W, integrator: { method: 'dp54', rtol: 1e-8, atol: 1e-10, hmax: 0.5 }, tEnd: 10, output: { subdir: 'binary', stem: 'smoke-weber-opposite-dp54' } },
    { name: 'smoke-weber-ring4', members: [0, 1, 2, 3].map(k => ({ x: [3 * Math.cos(k * Math.PI / 2), 3 * Math.sin(k * Math.PI / 2), 0], v: [-0.3 * Math.sin(k * Math.PI / 2), 0.3 * Math.cos(k * Math.PI / 2), 0.01 * k], q: k % 2 ? -1 : 1 })), coefficients: W, integrator: loose, tEnd: 5, output: { subdir: 'ring', stem: 'smoke-weber-ring4' } },
  ];
}

async function main(argv) {
  const [cmd, ...rest] = argv;
  if (cmd === 'controls') {
    const ri = rest.indexOf('--receipt'), receipt = ri >= 0 ? path.resolve(rest[ri + 1]) : RECEIPT_PATH;
    const t0 = Date.now(), res = runControls(); res.wallSeconds = (Date.now() - t0) / 1000;
    fs.writeFileSync(receipt, JSON.stringify(res, null, 2) + '\n');
    for (const c of res.controls) console.log(`${c.pass ? 'PASS' : 'FAIL'}  ${c.id}`);
    console.log(`allPass=${res.allPass} receipt=${path.relative(process.cwd(), receipt)} wall=${res.wallSeconds}s`);
    process.exitCode = res.allPass ? 0 : 1;
  } else if (cmd === 'run') {
    const spec = JSON.parse(fs.readFileSync(rest[0], 'utf8'));
    const { summary, trajPath, sumPath } = writeRun(spec, rest[0]);
    console.log(JSON.stringify({ termination: summary.termination, steps: summary.steps, nfev: summary.nfev, wallSeconds: summary.wallSeconds, trajectory: trajPath, summary: sumPath }));
  } else if (cmd === 'linearize') {
    const spec = JSON.parse(fs.readFileSync(rest[0], 'utf8'));
    console.log(JSON.stringify(linearize(spec, { balanceTol: spec.balanceTol }), null, 2));
  } else if (cmd === 'smoke') {
    for (const spec of smokeCases()) {
      const { summary, sumPath } = writeRun(spec, null);
      console.log(`${spec.name}: ran, termination=${summary.termination.reason} steps=${summary.steps} nfev=${summary.nfev} wall=${summary.wallSeconds}s -> ${path.relative(REPO_ROOT, sumPath)}`);
    }
  } else {
    console.log('usage: weber-overnight-pair-instrument.mjs controls [--receipt path] | run <case.json> | linearize <case.json> | smoke');
    process.exitCode = cmd ? 1 : 0;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main(process.argv.slice(2));
