#!/usr/bin/env node
// darwin-overnight-pair-instrument.mjs
// Cartesian N-member integrator for the frozen Darwin-inspired functional of
// manuscript.md Section 10 (equation-variants), as fixed in the common brief
// .tmp/darwin-overnight/pi/common-brief.md. Worker: darwin-overnight instrument
// (lens henri-poincare). Node v22, no dependencies. K = 1 and c_f = 1 are named
// constants and are not run parameters.
//
// ---------------------------------------------------------------------------
// Derivation of the implicit acceleration equations H(X) A = G(X, V)
// ---------------------------------------------------------------------------
// Members i = 1..N, positions X_i, velocities V_i, polarities q_i in {+1,-1},
// sigma_ij = q_i q_j. Pair quantities use present positions only:
//   d_ij = X_i - X_j,  r_ij = |d_ij|,  e_ij = d_ij / r_ij,  w_ij = V_i - V_j.
// With c_f = 1 the functional is
//   L_D = 1/2 sum_i |V_i|^2 - sum_{i<j} sigma K / r_ij
//         + sum_{i<j} a_ij  V_i . M_ij V_j,
//   a_ij = sigma_ij K / (2 r_ij),      M_ij = I + e_ij e_ij^T   (3x3, symmetric).
// (the bracket V_i.V_j + (V_i.e)(V_j.e) equals V_i^T M_ij V_j.)
//
// Generalized momentum:  p_i = dL/dV_i = V_i + sum_{j != i} a_ij M_ij V_j.
// Velocity Hessian (depends on X only):
//   H_ii = I_3,   H_ij = H_ji = a_ij M_ij  (i != j).           p = H V.
// Euler-Lagrange: d/dT p_i = dL/dX_i.  Since p = H(X) V,
//   d/dT p_i = sum_j H_ij A_j + sum_j (dH_ij/dT) V_j,
//   dH_ij/dT = sum_k (V_k . grad_{X_k}) H_ij = (w_ij . grad_{X_i}) (a_ij M_ij)
// because a_ij M_ij depends on X_i - X_j only. Define the mixed term
//   C_i = sum_{j != i} [ (w_ij . grad_{X_i})(a_ij M_ij) ] V_j
// (velocity-position second derivatives of L contracted with the velocities).
// Then  H A = G  with  G_i = dL/dX_i - C_i.
//
// Explicit pieces for one pair (i<j), with s = e.w (so dr/dT = s):
//   grad_{X_i} a      = -(sigma K / (2 r^2)) e,   da/dT = -(sigma K/(2 r^2)) s
//   de/dT             = (w - s e) / r
//   (dM/dT) v         = (de/dT)(e.v) + e ((de/dT).v)
//   (dH_ij/dT) v      = (da/dT) M v + a (dM/dT) v
//   dL/dX_i (pair)    = F_ij,  dL/dX_j (pair) = -F_ij, where
//   F_ij = sigma K e / r^2
//          - (sigma K/(2 r^2)) [ V_i.V_j + (V_i.e)(V_j.e) ] e
//          + (sigma K/(2 r^2)) [ (V_j.e) V_i + (V_i.e) V_j - 2 (V_i.e)(V_j.e) e ].
//   (The last line is a d/dX_i of (V_i.e)(V_j.e) using d(V.e)/dX_i = (V - (V.e)e)/r.)
//
// Invariants of the adapted law (not physical accounts). L is quadratic in V,
// L = 1/2 V^T H V - U with U = sum_{i<j} sigma K / r_ij, so
//   E = p.V - L = 1/2 V^T H V + U,
//   P = sum_i p_i                     (translation invariance of L),
//   J = sum_i X_i x p_i               (rotation invariance of L).
//
// Pair (N = 2) closed forms used only to check the linear algebra: the eigen-
// values of M are {2, 1, 1}, so H has eigenvalues {1 +- 2a, 1 +- a, 1 +- a} and
//   det H = (1 - 4 a^2)(1 - a^2)^2,   cond_2(H) = max|lambda| / min|lambda|.
//
// Zero-coupling control (coupling factor 0, inverse-distance term kept): H = I,
// A_i = sum_j sigma K e_ij / r^2. For an opposite-polarity pair the relative
// coordinate obeys d'' = -2K e / r^2, i.e. a Kepler problem with mu = 2K.
// Mirror circular orbit at separation r0: member speed v = sqrt(K/(2 r0)),
// period T = 2 pi sqrt(r0^3 / (2K)). Radial release from rest at r0: with
// rdot^2 = 2 mu (1/r - 1/r0) the time to reach r = x r0 is
//   t(x) = sqrt(r0^3 / (2 mu)) [ sqrt(x(1-x)) + arccos(sqrt(x)) ],  mu = 2K.
// ---------------------------------------------------------------------------

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const K = 1;      // coupling, fixed
const CF = 1;     // wake speed, fixed
const CF2 = CF * CF;

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../../../..');
const OUT_DIR = path.join(REPO, '.local-data/master-equation-closure/darwin-overnight/instrument');
const RECEIPT_PATH = path.join(HERE, 'darwin-overnight-pair-instrument-controls.json');

// ---------------------------------------------------------------- utilities
const dot = (a, b, ia = 0, ib = 0) => a[ia] * b[ib] + a[ia + 1] * b[ib + 1] + a[ia + 2] * b[ib + 2];
const norm3 = (a, i = 0) => Math.hypot(a[i], a[i + 1], a[i + 2]);
function cross(a, b) { return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]]; }

class ObstructionError extends Error {
  constructor(info) { super('acceleration-matrix obstruction'); this.info = info; }
}
// Raised when a stage evaluation finds det H changed in sign, or by more than
// DET_JUMP_FACTOR, relative to the step start. The adaptive integrator halves
// the step; a fixed-step integrator ends the history with an obstruction event.
// This is a step-size control, not a regularization: it exists so that no step
// can straddle a singular locus of H without an evaluation inside the declared
// obstruction band.
class DetJumpError extends Error {
  constructor(info) { super('det H changed too fast within one step'); this.info = info; }
}
const DET_JUMP_FACTOR = 2;
const H_MIN = 1e-12;

// ------------------------------------------------- functional and assembly
// opts.coupling (0|1) multiplies the velocity-coupling term; opts.pairTerm (0|1)
// multiplies the inverse-distance term. Both are 1 for the frozen law; the
// switches exist only for the known-case controls.
function lagrangian(X, V, q, opts) {
  const N = q.length; const kap = opts.coupling, pt = opts.pairTerm;
  let L = 0;
  for (let i = 0; i < N; i++) L += 0.5 * dot(V, V, 3 * i, 3 * i);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const s = q[i] * q[j];
    const d = [X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]];
    const r = norm3(d); const e = [d[0] / r, d[1] / r, d[2] / r];
    L -= pt * s * K / r;
    const vi = [V[3 * i], V[3 * i + 1], V[3 * i + 2]], vj = [V[3 * j], V[3 * j + 1], V[3 * j + 2]];
    L += kap * s * K / (2 * CF2 * r) * (dot(vi, vj) + dot(vi, e) * dot(vj, e));
  }
  return L;
}

// Returns H (n x n row-major), G, dLdX, C (mixed term), p = H V, U, pair data.
function assemble(X, V, q, opts) {
  const N = q.length, n = 3 * N; const kap = opts.coupling, pt = opts.pairTerm;
  const H = new Float64Array(n * n);
  for (let i = 0; i < n; i++) H[i * n + i] = 1;
  const dLdX = new Float64Array(n), C = new Float64Array(n);
  const pairs = [];
  let U = 0;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const s = q[i] * q[j];
    const d = [X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]];
    const r = norm3(d); const e = [d[0] / r, d[1] / r, d[2] / r];
    const vi = [V[3 * i], V[3 * i + 1], V[3 * i + 2]], vj = [V[3 * j], V[3 * j + 1], V[3 * j + 2]];
    const w = [vi[0] - vj[0], vi[1] - vj[1], vi[2] - vj[2]];
    const sdot = dot(e, w); // dr/dT
    pairs.push({ i, j, sigma: s, r, eps: K / (CF2 * r), rdot: sdot });
    U += pt * s * K / r;
    const a = kap * s * K / (2 * CF2 * r);
    // H blocks
    for (let p = 0; p < 3; p++) for (let c = 0; c < 3; c++) {
      const m = a * ((p === c ? 1 : 0) + e[p] * e[c]);
      H[(3 * i + p) * n + 3 * j + c] = m; H[(3 * j + c) * n + 3 * i + p] = m;
    }
    // dL/dX_i pair contribution F
    const vie = dot(vi, e), vje = dot(vj, e), vivj = dot(vi, vj);
    const g1 = pt * s * K / (r * r);                 // inverse-distance term
    const g2 = kap * s * K / (2 * CF2 * r * r);      // coupling prefactor derivative
    for (let p = 0; p < 3; p++) {
      const F = g1 * e[p] - g2 * (vivj + vie * vje) * e[p] + g2 * (vje * vi[p] + vie * vj[p] - 2 * vie * vje * e[p]);
      dLdX[3 * i + p] += F; dLdX[3 * j + p] -= F;
    }
    // mixed term: (dH_ij/dT) v for v = V_j (into C_i) and v = V_i (into C_j)
    const adot = -g2 * sdot;
    const edot = [(w[0] - sdot * e[0]) / r, (w[1] - sdot * e[1]) / r, (w[2] - sdot * e[2]) / r];
    const apply = (v) => {
      const ev = dot(e, v), edv = dot(edot, v);
      return [
        adot * (v[0] + e[0] * ev) + a * (edot[0] * ev + e[0] * edv),
        adot * (v[1] + e[1] * ev) + a * (edot[1] * ev + e[1] * edv),
        adot * (v[2] + e[2] * ev) + a * (edot[2] * ev + e[2] * edv)];
    };
    const ci = apply(vj), cj = apply(vi);
    for (let p = 0; p < 3; p++) { C[3 * i + p] += ci[p]; C[3 * j + p] += cj[p]; }
  }
  const G = new Float64Array(n), pvec = new Float64Array(n);
  for (let i = 0; i < n; i++) {
    G[i] = dLdX[i] - C[i];
    let acc = 0; for (let j = 0; j < n; j++) acc += H[i * n + j] * V[j];
    pvec[i] = acc;
  }
  return { H, G, dLdX, C, p: pvec, U, pairs, n };
}

// ------------------------------------------------- dense LU, det, condition
function luFactor(A, n) {
  const LU = Float64Array.from(A); const perm = new Int32Array(n); let sign = 1;
  for (let i = 0; i < n; i++) perm[i] = i;
  for (let k = 0; k < n; k++) {
    let piv = k, best = Math.abs(LU[k * n + k]);
    for (let i = k + 1; i < n; i++) { const v = Math.abs(LU[i * n + k]); if (v > best) { best = v; piv = i; } }
    if (piv !== k) {
      for (let c = 0; c < n; c++) { const t = LU[k * n + c]; LU[k * n + c] = LU[piv * n + c]; LU[piv * n + c] = t; }
      const t = perm[k]; perm[k] = perm[piv]; perm[piv] = t; sign = -sign;
    }
    const pv = LU[k * n + k];
    if (pv === 0) return { LU, perm, det: 0, singular: true };
    for (let i = k + 1; i < n; i++) {
      const f = LU[i * n + k] / pv; LU[i * n + k] = f;
      if (f !== 0) for (let c = k + 1; c < n; c++) LU[i * n + c] -= f * LU[k * n + c];
    }
  }
  let det = sign; for (let k = 0; k < n; k++) det *= LU[k * n + k];
  return { LU, perm, det, singular: false };
}
function luSolve(f, b, n) {
  const { LU, perm } = f; const x = new Float64Array(n);
  for (let i = 0; i < n; i++) x[i] = b[perm[i]];
  for (let i = 0; i < n; i++) { let s = x[i]; for (let j = 0; j < i; j++) s -= LU[i * n + j] * x[j]; x[i] = s; }
  for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let j = i + 1; j < n; j++) s -= LU[i * n + j] * x[j]; x[i] = s / LU[i * n + i]; }
  return x;
}
function norm1(A, n) {
  let best = 0; for (let j = 0; j < n; j++) { let s = 0; for (let i = 0; i < n; i++) s += Math.abs(A[i * n + j]); if (s > best) best = s; } return best;
}
// Hager/Higham 1-norm estimate of ||H^{-1}||_1. H is symmetric, so the
// transposed solve equals the direct solve.
function invNorm1Estimate(f, n) {
  let x = new Float64Array(n).fill(1 / n), est = 0, estOld = 0;
  for (let it = 0; it < 6; it++) {
    const y = luSolve(f, x, n);
    est = 0; for (let i = 0; i < n; i++) est += Math.abs(y[i]);
    if (it > 0 && est <= estOld) { est = estOld; break; }
    estOld = est;
    const xi = new Float64Array(n); for (let i = 0; i < n; i++) xi[i] = y[i] >= 0 ? 1 : -1;
    const z = luSolve(f, xi, n);
    let jmax = 0, zmax = -1, zx = 0;
    for (let i = 0; i < n; i++) { const a = Math.abs(z[i]); if (a > zmax) { zmax = a; jmax = i; } zx += z[i] * x[i]; }
    if (it > 0 && zmax <= zx) break;
    x = new Float64Array(n); x[jmax] = 1;
  }
  // Higham's alternative lower bound
  const b = new Float64Array(n); for (let i = 0; i < n; i++) b[i] = (i % 2 ? -1 : 1) * (1 + i / (n - 1 || 1));
  const y2 = luSolve(f, b, n); let s = 0, sb = 0;
  for (let i = 0; i < n; i++) { s += Math.abs(y2[i]); sb += Math.abs(b[i]); }
  return Math.max(est, (2 * s) / (3 * sb));
}
// Eigenvalues of a symmetric matrix by cyclic Jacobi rotations. H is symmetric
// by construction, so cond_2(H) = max|lambda| / min|lambda| exactly; unlike the
// 1-norm estimate this is continuous in the state, which bisection requires.
function symmetricEigenvalues(A, n) {
  const M = Float64Array.from(A);
  for (let sweep = 0; sweep < 60; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += M[i * n + j] ** 2;
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      const apq = M[p * n + q]; if (Math.abs(apq) < 1e-300) continue;
      const theta = (M[q * n + q] - M[p * n + p]) / (2 * apq);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = M[k * n + p], akq = M[k * n + q]; M[k * n + p] = c * akp - s * akq; M[k * n + q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = M[p * n + k], aqk = M[q * n + k]; M[p * n + k] = c * apk - s * aqk; M[q * n + k] = s * apk + c * aqk; }
    }
  }
  const ev = []; for (let i = 0; i < n; i++) ev.push(M[i * n + i]); return ev;
}
function pairClosedForms(r, sigma, kap) {
  const a = kap * sigma * K / (2 * CF2 * r);
  const lam = [1 + 2 * a, 1 - 2 * a, 1 + a, 1 - a];
  const abs = lam.map(Math.abs);
  return { det: (1 - 4 * a * a) * (1 - a * a) * (1 - a * a), cond2: Math.max(...abs) / Math.min(...abs), a };
}

// ------------------------------------------------- acceleration solve
function solveAcceleration(X, V, q, opts, params) {
  const asm = assemble(X, V, q, opts); const n = asm.n;
  const f = luFactor(asm.H, n);
  const condEst1 = f.singular ? Infinity : norm1(asm.H, n) * invNorm1Estimate(f, n);
  const ev = symmetricEigenvalues(asm.H, n).map(Math.abs);
  const cond2 = Math.max(...ev) / Math.min(...ev);
  let cond2PairClosedForm = null;
  if (q.length === 2) cond2PairClosedForm = pairClosedForms(asm.pairs[0].r, asm.pairs[0].sigma, opts.coupling).cond2;
  const detH = f.det;
  // the obstruction decision uses |det H| (LU) and the exact 2-norm condition
  if (f.singular || !Number.isFinite(cond2) || Math.abs(detH) < params.detTol || cond2 > params.condMax) {
    throw new ObstructionError({ detH, condEst: cond2, condEst1, cond2PairClosedForm, pairs: asm.pairs, X: Array.from(X), V: Array.from(V) });
  }
  const A = luSolve(f, asm.G, n);
  return { A, detH, condEst: cond2, condEst1, cond2Exact: cond2PairClosedForm, asm };
}

function invariants(X, V, q, opts) {
  const asm = assemble(X, V, q, opts); const N = q.length;
  let E = asm.U; const P = [0, 0, 0], J = [0, 0, 0];
  for (let i = 0; i < 3 * N; i++) E += 0.5 * V[i] * asm.p[i];
  for (let i = 0; i < N; i++) {
    const xi = [X[3 * i], X[3 * i + 1], X[3 * i + 2]], pi = [asm.p[3 * i], asm.p[3 * i + 1], asm.p[3 * i + 2]];
    for (let c = 0; c < 3; c++) P[c] += pi[c];
    const cx = cross(xi, pi); for (let c = 0; c < 3; c++) J[c] += cx[c];
  }
  return { E, P, J, pairs: asm.pairs };
}

// ------------------------------------------------- state helpers
function split(y, N) { return { X: y.subarray(0, 3 * N), V: y.subarray(3 * N, 6 * N) }; }
function maxSpeed(V, N) { let m = 0; for (let i = 0; i < N; i++) m = Math.max(m, norm3(V, 3 * i)); return m; }

// ------------------------------------------------- integrators
const DP = {
  c: [0, 1 / 5, 3 / 10, 4 / 5, 8 / 9, 1, 1],
  a: [[], [1 / 5], [3 / 40, 9 / 40], [44 / 45, -56 / 15, 32 / 9],
    [19372 / 6561, -25360 / 2187, 64448 / 6561, -212 / 729],
    [9017 / 3168, -355 / 33, 46732 / 5247, 49 / 176, -5103 / 18656],
    [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84]],
  b: [35 / 384, 0, 500 / 1113, 125 / 192, -2187 / 6784, 11 / 84, 0],
  e: [71 / 57600, 0, -71 / 16695, 71 / 1920, -17253 / 339200, 22 / 525, -1 / 40],
};

function makeRhs(q, opts, params, stats) {
  return (y) => {
    const N = q.length; const { X, V } = split(y, N);
    const s = solveAcceleration(X, V, q, opts, params); stats.evals++;
    if (stats.refDet === null) stats.refDet = s.detH;
    else if (Math.sign(s.detH) !== Math.sign(stats.refDet)) {
      // a sign change of det H within a step means a singular locus was crossed: always an obstruction
      throw new ObstructionError({ detH: s.detH, condEst: s.condEst, condEst1: s.condEst1, pairs: s.asm.pairs, reason: 'det H changed sign within a step (singular locus crossed)' });
    } else if (stats.jumpCheck && Math.abs(Math.log(Math.abs(s.detH / stats.refDet))) > Math.log(DET_JUMP_FACTOR)) {
      throw new DetJumpError({ detH: s.detH, refDet: stats.refDet, condEst: s.condEst });
    }
    const dy = new Float64Array(6 * N);
    for (let i = 0; i < 3 * N; i++) { dy[i] = V[i]; dy[3 * N + i] = s.A[i]; }
    stats.lastDet = s.detH; stats.lastCond = s.condEst; stats.lastCond2 = s.cond2Exact;
    return dy;
  };
}

// one DP5(4) step; returns {y5, errNorm}
function dp54Step(rhs, y, h, rtol, atol, k1) {
  const n = y.length; const ks = [k1 || rhs(y)];
  const tmp = new Float64Array(n);
  for (let s = 1; s < 7; s++) {
    for (let i = 0; i < n; i++) { let acc = 0; for (let j = 0; j < s; j++) acc += DP.a[s][j] * ks[j][i]; tmp[i] = y[i] + h * acc; }
    ks.push(rhs(tmp));
  }
  const y5 = new Float64Array(n); let err = 0;
  for (let i = 0; i < n; i++) {
    let acc = 0, e = 0; for (let s = 0; s < 7; s++) { acc += DP.b[s] * ks[s][i]; e += DP.e[s] * ks[s][i]; }
    y5[i] = y[i] + h * acc;
    const sc = atol + rtol * Math.max(Math.abs(y[i]), Math.abs(y5[i]));
    err += (h * e / sc) ** 2;
  }
  return { y: y5, err: Math.sqrt(err / n), k7: ks[6] };
}
function rk4Step(rhs, y, h) {
  const n = y.length; const k1 = rhs(y), t = new Float64Array(n);
  for (let i = 0; i < n; i++) t[i] = y[i] + 0.5 * h * k1[i]; const k2 = rhs(t);
  for (let i = 0; i < n; i++) t[i] = y[i] + 0.5 * h * k2[i]; const k3 = rhs(t);
  for (let i = 0; i < n; i++) t[i] = y[i] + h * k3[i]; const k4 = rhs(t);
  const yn = new Float64Array(n); for (let i = 0; i < n; i++) yn[i] = y[i] + h / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]);
  return yn;
}

// ------------------------------------------------- events
// Event functions g(y): a sign change over a step brackets an event.
function eventFunctions(y, q, params) {
  const N = q.length; const { X, V } = split(y, N); const out = [];
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const d = [X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]];
    const r = norm3(d); const rdot = (d[0] * (V[3 * i] - V[3 * j]) + d[1] * (V[3 * i + 1] - V[3 * j + 1]) + d[2] * (V[3 * i + 2] - V[3 * j + 2])) / r;
    out.push({ kind: 'contact', pair: [i, j], g: r - params.rContact, stop: true });
    if (Number.isFinite(params.rEscape)) out.push({ kind: 'escape', pair: [i, j], g: params.rEscape - r, stop: true });
    out.push({ kind: 'turning-point', pair: [i, j], g: rdot, stop: false });
    out.push({ kind: 'eps-bound', pair: [i, j], g: params.epsBound - K / (CF2 * r), stop: false });
  }
  for (let i = 0; i < N; i++) {
    const s = norm3(V, 3 * i);
    out.push({ kind: 'speed-crossing-cf', member: i, g: CF - s, stop: false });
    out.push({ kind: 'speed-bound', member: i, g: params.speedBound - s, stop: false });
  }
  return out;
}

// ------------------------------------------------- the run
function runCase(spec) {
  const t0wall = Date.now();
  const q = spec.polarities.map((v) => (v >= 0 ? 1 : -1));
  const N = q.length;
  const opts = { coupling: spec.coupling ?? 1, pairTerm: spec.pairTerm ?? 1 };
  if (spec.interaction === 0) { opts.coupling = 0; opts.pairTerm = 0; }
  const params = {
    tMax: spec.tMax, rContact: spec.rContact ?? 1e-3, rEscape: spec.rEscape ?? Infinity,
    speedBound: spec.speedBound ?? 0.1, epsBound: spec.epsBound ?? 0.05,
    detTol: spec.detTol ?? 1e-12, condMax: spec.condMax ?? 1e12, tTol: spec.tTol ?? 1e-9,
    integrator: spec.integrator ?? 'dp54', rtol: spec.rtol ?? 1e-10, atol: spec.atol ?? 1e-12,
    h: spec.h ?? 1, hInit: spec.hInit ?? 1, hMax: spec.hMax ?? Infinity, outputDt: spec.outputDt ?? Math.max(spec.tMax / 200, 1e-12),
    maxSteps: spec.maxSteps ?? 5e6,
  };
  const stats = { evals: 0, steps: 0, rejected: 0, detJumpRejections: 0, lastDet: null, lastCond: null, lastCond2: null, refDet: null, jumpCheck: true };
  const rhs = makeRhs(q, opts, params, stats);
  let y = new Float64Array(6 * N);
  for (let i = 0; i < N; i++) for (let c = 0; c < 3; c++) { y[3 * i + c] = spec.positions[i][c]; y[3 * N + 3 * i + c] = spec.velocities[i][c]; }
  let t = 0;
  const inv0 = invariants(y.subarray(0, 3 * N), y.subarray(3 * N), q, opts);
  const sup = { speed: 0, eps: 0, detMin: Infinity, detMax: -Infinity, condMax: 0 };
  const samples = [], events = [];
  const scaleE = Math.max(Math.abs(inv0.E), 1e-300);
  const diag = (yy, tt) => {
    const { X, V } = split(yy, N); const inv = invariants(X, V, q, opts);
    const spd = maxSpeed(V, N); let eps = 0; for (const p of inv.pairs) eps = Math.max(eps, p.eps);
    sup.speed = Math.max(sup.speed, spd); sup.eps = Math.max(sup.eps, eps);
    let det = null, cond = null, cond2 = null, cond1 = null;
    try { const s = solveAcceleration(X, V, q, opts, { detTol: 0, condMax: Infinity }); det = s.detH; cond = s.condEst; cond2 = s.cond2Exact; cond1 = s.condEst1; } catch (e) { det = 0; cond = Infinity; }
    sup.detMin = Math.min(sup.detMin, det); sup.detMax = Math.max(sup.detMax, det); sup.condMax = Math.max(sup.condMax, cond);
    // Correction (round 1 batch 3): report the velocity decomposition explicitly.
    // maxSpeed is the largest member speed |V_i|. Near the pair singular locus
    // r = 1 the symmetric mode of H (common velocity along e, eigenvalue 1 - 1/r)
    // amplifies a round-off-level common momentum into a visible common velocity
    // (V_1 + V_2)/2, so |V_i| and the mirror closed forms, which assume
    // V_1 = -V_2 exactly, can differ while r, dr/dT, E and |V_1 - V_2|/2 agree.
    // The fields below let a reader separate the two without re-deriving them
    // from the state; nothing in the integration is changed.
    const memberSpeeds = Array.from({ length: N }, (_, i) => norm3(V, 3 * i));
    const centreVelocity = [0, 1, 2].map((c) => { let s = 0; for (let i = 0; i < N; i++) s += V[3 * i + c]; return s / N; });
    const pairRel = (p) => { const w = [V[3 * p.i] - V[3 * p.j], V[3 * p.i + 1] - V[3 * p.j + 1], V[3 * p.i + 2] - V[3 * p.j + 2]]; return Math.hypot(...w); };
    return {
      t: tt, E: inv.E, P: inv.P, J: inv.J,
      dE: inv.E - inv0.E, dP: inv.P.map((v, c) => v - inv0.P[c]), dJ: inv.J.map((v, c) => v - inv0.J[c]),
      dErel: (inv.E - inv0.E) / scaleE,
      maxSpeed: spd, maxEps: eps, detH: det, cond2: cond, cond2PairClosedForm: cond2, cond1Estimate: cond1,
      memberSpeeds, centreVelocity, centreSpeed: Math.hypot(...centreVelocity),
      pairs: inv.pairs.map((p) => ({ pair: [p.i, p.j], r: p.r, rdot: p.rdot, relSpeed: pairRel(p), relSpeedHalf: 0.5 * pairRel(p) })),
      supSpeed: sup.speed, supEps: sup.eps,
    };
  };
  const stateOf = (yy) => ({ positions: Array.from({ length: N }, (_, i) => [yy[3 * i], yy[3 * i + 1], yy[3 * i + 2]]), velocities: Array.from({ length: N }, (_, i) => [yy[3 * N + 3 * i], yy[3 * N + 3 * i + 1], yy[3 * N + 3 * i + 2]]) });
  samples.push({ ...diag(y, 0), state: stateOf(y) });

  const stepOnce = (yy, h) => params.integrator === 'rk4' ? rk4Step(rhs, yy, h) : dp54Step(rhs, yy, h, params.rtol, params.atol).y;
  // bisection of an event bracket inside [t, t+h] from state y0
  const locate = (y0, tStart, h, pick) => {
    let lo = 0, hi = h, yLo = y0, yHi = null;
    while (hi - lo > params.tTol) {
      const mid = 0.5 * (lo + hi); const ym = stepOnce(y0, mid);
      if (pick(ym)) { hi = mid; yHi = ym; } else { lo = mid; yLo = ym; }
    }
    return { t: tStart + hi, y: yHi || stepOnce(y0, hi), tLo: tStart + lo, yLo };
  };
  let g0 = eventFunctions(y, q, params);
  let h = params.integrator === 'rk4' ? params.h : Math.min(params.hInit, params.hMax);
  let nextSample = params.outputDt; let stopped = null; let k1 = null;
  const recordEvent = (kind, tt, yy, extra) => {
    events.push({ kind, ...extra, t: tt, ...diag(yy, tt), state: stateOf(yy) });
  };
  while (t < params.tMax && !stopped) {
    if (stats.steps > params.maxSteps) { stopped = 'max-steps'; break; }
    let hTry = Math.min(h, params.tMax - t, nextSample - t);
    if (hTry <= 0) hTry = Math.min(h, params.tMax - t);
    let yNew, hUsed = hTry, errNorm = 0;
    // refDet is the determinant at the step start: for dp54 it is carried by the
    // FSAL evaluation at the previous step end; for rk4 the first stage sets it.
    if (params.integrator === 'rk4' || k1 === null) stats.refDet = null;
    try {
      if (params.integrator === 'rk4') { yNew = rk4Step(rhs, y, hTry); }
      else {
        for (;;) {
          let res;
          try { res = dp54Step(rhs, y, hTry, params.rtol, params.atol, k1); }
          catch (e) {
            if (!(e instanceof DetJumpError)) throw e;
            stats.detJumpRejections++; hTry *= 0.5;
            if (hTry < H_MIN) throw new ObstructionError({ detH: e.info.detH, condEst: e.info.condEst, reason: 'step below H_MIN under determinant-continuity control' });
            continue;
          }
          if (res.err <= 1 || hTry < H_MIN) { yNew = res.y; hUsed = hTry; errNorm = res.err; k1 = res.k7;
            const fac = Math.min(5, Math.max(0.2, 0.9 * Math.pow(Math.max(res.err, 1e-16), -0.2)));
            h = Math.min(params.hMax, hTry * fac); break; }
          stats.rejected++; hTry *= Math.max(0.1, 0.9 * Math.pow(res.err, -0.2));
        }
      }
    } catch (err) {
      if (!(err instanceof ObstructionError) && !(err instanceof DetJumpError)) throw err;
      // locate the obstruction by bisection on the step length from y; the
      // step-start determinant is the reference throughout
      // Locate the obstruction by creeping: sub-steps from the current state that
      // halve on failure, so that the internal-stage overshoot (which scales as
      // h^2) cannot place the detection off the trajectory. Each accepted sub-step
      // end state is checked against the declared thresholds. The factor-2
      // continuity rule is suspended here (the creep resolves the threshold to
      // tTol itself); the sign rule stays on.
      stats.jumpCheck = false;
      let tc = t, yc = y, hs = 0.5 * hUsed, lastFail = err.info, failedAt = t + hUsed, creepSteps = 0;
      const endCheck = (yy) => { const { X, V } = split(yy, N); return solveAcceleration(X, V, q, opts, params).detH; };
      let detC = endCheck(yc);
      while (hs > params.tTol && tc < t + hUsed && creepSteps < 10000) {
        stats.refDet = detC; creepSteps++;
        try { const yn = stepOnce(yc, hs); const dn = endCheck(yn); yc = yn; tc += hs; detC = dn; }
        catch (e2) { if (!(e2 instanceof ObstructionError) && !(e2 instanceof DetJumpError)) throw e2; lastFail = e2.info; failedAt = tc + hs; hs *= 0.5; }
      }
      stats.jumpCheck = true;
      if (hs > params.tTol) {
        // the creep reached the end of the failed step without meeting a threshold
        // (the original failure was a stage overshoot): continue from the creep end
        yNew = yc; hUsed = tc - t; if (params.integrator !== 'rk4') h = Math.max(hs, H_MIN); k1 = null; stats.lastDet = detC;
      } else {
        const reason = err instanceof DetJumpError ? `determinant-continuity control (factor ${DET_JUMP_FACTOR}) cannot be met at the declared fixed step` : (lastFail.reason || 'declared obstruction tolerance reached (|det H| < detTol or cond_2(H) > condMax)');
        recordEvent('obstruction', tc, yc, { reason, firstFailure: err.info.reason || 'threshold', detH_at_failure: lastFail.detH, cond2_at_failure: lastFail.condEst, failedAt, creepSteps, detTol: params.detTol, condMax: params.condMax,
          // the event state is the last accepted creep sub-step end (position and
          // velocity from the same sub-step); see the diag() note on memberSpeeds
          velocityNote: 'memberSpeeds include the common velocity centreVelocity; mirror closed forms (V_1 = -V_2) compare with pairs[].relSpeedHalf, not with maxSpeed' });
        // Correction (round 1 batch 3): end the history at the event state, as the
        // contact/escape stops do, so that `final` reports the obstruction state
        // and time rather than the start of the step in which it was met.
        y = yc; t = tc;
        stopped = 'obstruction'; break;
      }
    }
    stats.steps++;
    const tNew = t + hUsed;
    const detAtNew = stats.lastDet; // dp54: the FSAL stage k7 is evaluated at yNew
    // event scan
    const g1 = eventFunctions(yNew, q, params);
    const found = [];
    for (let e = 0; e < g1.length; e++) {
      if (g0[e].g * g1[e].g < 0 || (g0[e].g !== 0 && g1[e].g === 0)) {
        const sgn0 = Math.sign(g0[e].g);
        let loc;
        try { stats.jumpCheck = false; loc = locate(y, t, hUsed, (ym) => Math.sign(eventFunctions(ym, q, params)[e].g) !== sgn0); }
        catch (e3) { if (!(e3 instanceof ObstructionError) && !(e3 instanceof DetJumpError)) throw e3; loc = { t: tNew, y: yNew, approximate: 'sub-step evaluation met an obstruction threshold; event placed at the step end' }; }
        finally { stats.jumpCheck = true; }
        const kind = g1[e].kind; const extra = { pair: g1[e].pair, member: g1[e].member };
        if (kind === 'turning-point') extra.direction = sgn0 < 0 ? 'minimum (dr/dT - to +)' : 'maximum (dr/dT + to -)';
        if (kind === 'speed-bound' || kind === 'eps-bound') extra.direction = sgn0 > 0 ? 'departure from declared domain' : 'return to declared domain';
        if (kind === 'speed-crossing-cf') extra.direction = sgn0 > 0 ? 'upward through c_f' : 'downward through c_f';
        found.push({ e, kind, stop: g1[e].stop, loc, extra });
      }
    }
    found.sort((a, b) => a.loc.t - b.loc.t);
    for (const f of found) {
      recordEvent(f.kind, f.loc.t, f.loc.y, f.extra);
      if (f.stop) { stopped = f.kind; y = f.loc.y; t = f.loc.t; break; }
    }
    if (stopped) break;
    y = yNew; t = tNew; g0 = g1;
    stats.refDet = params.integrator === 'rk4' ? null : detAtNew;
    if (t >= nextSample - 1e-12 * Math.max(1, Math.abs(t))) { samples.push({ ...diag(y, t), state: stateOf(y) }); nextSample += params.outputDt; }
  }
  if (!stopped) { stopped = 'tMax'; recordEvent('tMax', t, y, {}); }
  const final = { t, ...diag(y, t), state: stateOf(y), stopReason: stopped };
  const result = {
    caseId: spec.caseId || 'unnamed', polaritySummary: polaritySummary(q), constants: { K, c_f: CF },
    preparation: { positions: spec.positions, velocities: spec.velocities, polarities: q, coupling: opts.coupling, pairTerm: opts.pairTerm },
    parameters: params, integrator: { kind: params.integrator, rtol: params.rtol, atol: params.atol, h: params.h, steps: stats.steps, rejected: stats.rejected, evaluations: stats.evals },
    initialInvariants: { E: inv0.E, P: inv0.P, J: inv0.J },
    samples, events: events.map((e) => ({ ...e })), final, suprema: { ...sup },
    wallMs: Date.now() - t0wall,
  };
  return result;
}
function polaritySummary(q) {
  const pairs = []; for (let i = 0; i < q.length; i++) for (let j = i + 1; j < q.length; j++) pairs.push(q[i] * q[j] < 0 ? 'opposite' : 'same');
  return pairs.length ? pairs : ['none'];
}

function writeRun(result, name) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const file = path.join(OUT_DIR, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(result));
  return file;
}
function summaryLine(r) {
  const f = r.final;
  return `${r.caseId}: ${r.integrator.kind} steps=${r.integrator.steps} rej=${r.integrator.rejected} stop=${f.stopReason} t=${f.t.toPrecision(12)} dE=${f.dE.toExponential(3)} |dP|=${Math.hypot(...f.dP).toExponential(3)} |dJ|=${Math.hypot(...f.dJ).toExponential(3)} supV=${r.suprema.speed.toExponential(3)} supEps=${r.suprema.eps.toExponential(3)} detH=[${r.suprema.detMin.toPrecision(8)},${r.suprema.detMax.toPrecision(8)}] condMax=${r.suprema.condMax.toPrecision(6)} events=${r.events.length} wall=${r.wallMs}ms`;
}

// ------------------------------------------------- self-check (finite differences)
function selfcheck(verbose = true) {
  let seed = 20261005; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
  const report = { note: 'internal consistency check of the analytic assembly against central finite differences of a direct evaluation of L_D; not independent evidence', cases: [] };
  let worst = { dLdV: 0, dLdX: 0, H: 0, mixedFromL: 0, mixedFromP: 0, solveResidual: 0, detPairClosedForm: 0, cond2PairClosedForm_vs_Jacobi: 0 };
  for (const N of [2, 3]) for (const polSet of [[1, -1, 1], [-1, -1, -1], [1, 1, 1]]) for (let rep = 0; rep < 3; rep++) {
    const q = polSet.slice(0, N);
    const X = new Float64Array(3 * N), V = new Float64Array(3 * N);
    for (let i = 0; i < 3 * N; i++) { X[i] = 6 * (rnd() - 0.5); V[i] = 0.6 * (rnd() - 0.5); }
    // keep pairs separated away from the singular radii 1 and 1/2
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) { const d = Math.hypot(X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]); if (d < 2.5) { X[3 * j] += 3; } }
    const opts = { coupling: 1, pairTerm: 1 };
    const asm = assemble(X, V, q, opts); const n = 3 * N;
    const Lf = (XX, VV) => lagrangian(XX, VV, q, opts);
    const rel = (a, b, scale) => Math.abs(a - b) / scale;
    const c = { N, polarities: q, pairs: polaritySummary(q) };
    // dL/dV vs central FD (h = 1e-3; L quadratic in V so no truncation error)
    let e1 = 0, sP = Math.max(1, ...Array.from(asm.p, Math.abs));
    for (let a = 0; a < n; a++) { const h = 1e-3; const Vp = Float64Array.from(V), Vm = Float64Array.from(V); Vp[a] += h; Vm[a] -= h; e1 = Math.max(e1, rel((Lf(X, Vp) - Lf(X, Vm)) / (2 * h), asm.p[a], sP)); }
    // dL/dX vs central FD (h = 1e-5)
    let e2 = 0, sX = Math.max(1e-3, ...Array.from(asm.dLdX, Math.abs));
    for (let a = 0; a < n; a++) { const h = 1e-5; const Xp = Float64Array.from(X), Xm = Float64Array.from(X); Xp[a] += h; Xm[a] -= h; e2 = Math.max(e2, rel((Lf(Xp, V) - Lf(Xm, V)) / (2 * h), asm.dLdX[a], sX)); }
    // H vs second central differences in V
    let e3 = 0;
    for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
      const h = 1e-3; const f = (sa, sb) => { const VV = Float64Array.from(V); VV[a] += sa * h; VV[b] += sb * h; return Lf(X, VV); };
      const fd = (f(1, 1) - f(1, -1) - f(-1, 1) + f(-1, -1)) / (4 * h * h); e3 = Math.max(e3, rel(fd, asm.H[a * n + b], 1));
    }
    // mixed term C_i = sum_k sum_b d2L/(dV_i dX_kb) V_kb: from L (hX = 1e-4, hV = 1e-3) and from analytic p (hX = 1e-6)
    // (L is exactly quadratic in V, so hV may be large; the X step balances h^2 truncation against round-off)
    let e4 = 0, e5 = 0, sC = Math.max(1e-12, ...Array.from(asm.C, Math.abs));
    for (let a = 0; a < n; a++) {
      const hX = 1e-4, hV = 0.5;
      const f = (sx, sv) => { const XX = Float64Array.from(X), VV = Float64Array.from(V); for (let i = 0; i < n; i++) XX[i] += sx * hX * V[i]; VV[a] += sv * hV; return Lf(XX, VV); };
      const fd = (f(1, 1) - f(1, -1) - f(-1, 1) + f(-1, -1)) / (4 * hX * hV); e4 = Math.max(e4, rel(fd, asm.C[a], sC));
      const h2 = 1e-4; const Xp = Float64Array.from(X), Xm = Float64Array.from(X); for (let i = 0; i < n; i++) { Xp[i] += h2 * V[i]; Xm[i] -= h2 * V[i]; }
      const pp = assemble(Xp, V, q, opts).p[a], pm = assemble(Xm, V, q, opts).p[a]; e5 = Math.max(e5, rel((pp - pm) / (2 * h2), asm.C[a], sC));
    }
    // solve residual ||H A - G|| / ||G|| and pair closed-form determinant
    const sol = solveAcceleration(X, V, q, opts, { detTol: 0, condMax: Infinity });
    let res = 0, gn = 0; for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < n; j++) s += asm.H[i * n + j] * sol.A[j]; res = Math.max(res, Math.abs(s - asm.G[i])); gn = Math.max(gn, Math.abs(asm.G[i])); }
    const e6 = res / Math.max(gn, 1e-300);
    let e7 = 0, e8 = 0; if (N === 2) { const cf = pairClosedForms(asm.pairs[0].r, asm.pairs[0].sigma, 1); e7 = Math.abs(cf.det - sol.detH) / Math.abs(cf.det); e8 = Math.abs(cf.cond2 - sol.condEst) / cf.cond2; c.detLU = sol.detH; c.detClosedForm = cf.det; c.cond2PairClosedForm = cf.cond2; c.cond2Jacobi = sol.condEst; c.cond1Estimate = sol.condEst1; }
    Object.assign(c, { dLdV: e1, dLdX: e2, H: e3, mixedFromL: e4, mixedFromP: e5, solveResidual: e6, detPairClosedForm: e7, cond2PairClosedForm_vs_Jacobi: e8, detH: sol.detH, cond2: sol.condEst, cond1Estimate: sol.condEst1 });
    report.cases.push(c);
    for (const k of Object.keys(worst)) worst[k] = Math.max(worst[k], c[k]);
  }
  report.maxRelativeDiscrepancy = worst;
  report.fdSteps = { dLdV: 1e-3, dLdX: 1e-5, H: 1e-3, mixedFromL: '1e-4 (X, along V), 0.5 (V)', mixedFromP: '1e-4 (X, along V)' };
  if (verbose) { console.log('selfcheck (internal consistency, not independent evidence)'); console.log(JSON.stringify(worst, null, 1)); }
  return report;
}

// ------------------------------------------------- known-case controls
function controls() {
  const started = new Date().toISOString(); const t0 = Date.now();
  const receipt = { instrument: 'darwin-overnight-pair-instrument.mjs', worker: 'darwin-overnight instrument (lens henri-poincare)', utcStart: started, constants: { K, c_f: CF }, note: 'Known-case controls run before any target use. Invariants are of the adapted law, not physical accounts. Opposite and same polarity are labelled per pair.', controls: [] };
  const mirror = (r0, v, extra = {}) => ({ positions: [[r0 / 2, 0, 0], [-r0 / 2, 0, 0]], velocities: [[0, v, 0], [0, -v, 0]], polarities: [1, -1], ...extra });
  const r0 = 100; const vCirc0 = Math.sqrt(K / (2 * r0)); const mu = 2 * K; const Tper = 2 * Math.PI * Math.sqrt(r0 ** 3 / mu);
  const tFF = (x) => Math.sqrt(r0 ** 3 / (2 * mu)) * (Math.sqrt(x * (1 - x)) + Math.acos(Math.sqrt(x)));
  const push = (c) => { receipt.controls.push(c); console.log(`${c.pass ? 'PASS' : 'FAIL'} ${c.id}: ${c.summary}`); };
  const maxAbsDiff = (a, b) => Math.max(...a.flat().map((v, i) => Math.abs(v - b.flat()[i])));
  const files = [];
  const run = (spec, name) => { const r = runCase(spec); files.push(writeRun(r, name)); console.log('  ' + summaryLine(r)); return r; };

  // (a) straight lines
  {
    const V = [0.03, 0.011, -0.02];
    for (const integ of ['dp54', 'rk4']) {
      const r1 = run({ caseId: `a1-free-single-${integ}`, positions: [[1, 2, 3]], velocities: [V], polarities: [1], tMax: 1000, integrator: integ, h: 10, rtol: 1e-10, atol: 1e-12, outputDt: 100, rContact: 0 }, `control-a1-${integ}`);
      const exp1 = [[1 + V[0] * 1000, 2 + V[1] * 1000, 3 + V[2] * 1000]];
      const d1 = maxAbsDiff(r1.final.state.positions, exp1);
      push({ id: `a1-free-single-${integ}`, description: 'single member, N=1, straight line', expected: exp1, measured: r1.final.state.positions, difference: d1, tolerance: 1e-9, pass: d1 <= 1e-9, summary: `max|X(T)-X0-VT| = ${d1.toExponential(3)}`, runFile: files.at(-1) });
      const r2 = run({ caseId: `a2-free-pair-${integ}`, positions: [[1, 2, 3], [-4, 5, -6]], velocities: [V, [-0.02, 0.05, 0.01]], polarities: [1, -1], interaction: 0, tMax: 1000, integrator: integ, h: 10, rtol: 1e-10, atol: 1e-12, outputDt: 100 }, `control-a2-${integ}`);
      const exp2 = [[1 + V[0] * 1000, 2 + V[1] * 1000, 3 + V[2] * 1000], [-4 - 20, 5 + 50, -6 + 10]];
      const d2 = maxAbsDiff(r2.final.state.positions, exp2);
      push({ id: `a2-free-pair-${integ}`, description: 'two members (opposite polarity labels), whole interaction switched off (interaction: 0)', expected: exp2, measured: r2.final.state.positions, difference: d2, tolerance: 1e-9, pass: d2 <= 1e-9, summary: `max|X(T)-X0-VT| = ${d2.toExponential(3)}`, runFile: files.at(-1) });
    }
  }
  // (b) zero-coupling circular orbit, one closed-form period
  for (const [integ, extra] of [['dp54', { rtol: 1e-10, atol: 1e-12 }], ['rk4', { h: 5 }]]) {
    const r = run({ caseId: `b-zero-coupling-circular-${integ}`, ...mirror(r0, vCirc0, { coupling: 0 }), tMax: Tper, integrator: integ, outputDt: Tper / 50, ...extra }, `control-b-${integ}`);
    const dX = maxAbsDiff(r.final.state.positions, mirror(r0, vCirc0).positions);
    const dV = maxAbsDiff(r.final.state.velocities, mirror(r0, vCirc0).velocities);
    const tolX = integ === 'dp54' ? 1e-5 : 1e-3;
    const pass = dX <= tolX && Math.abs(r.final.dErel) <= 1e-8 && r.final.stopReason === 'tMax';
    push({ id: `b-zero-coupling-circular-${integ}`, description: `coupling 0, inverse-distance term kept, opposite-polarity mirror pair, r0=100, v=sqrt(K/(2 r0)), one closed-form period T=2 pi sqrt(r0^3/(2K))`, expected: { period: Tper, memberSpeed: vCirc0, returnError: 0, energyDrift: 0 }, measured: { positionReturnError: dX, velocityReturnError: dV, dE: r.final.dE, dErel: r.final.dErel, dP: r.final.dP, dJ: r.final.dJ, steps: r.integrator.steps, turningPointEvents: r.events.filter((e) => e.kind === 'turning-point').length }, difference: dX, tolerance: { positionReturn: tolX, relativeEnergyDrift: 1e-8 }, pass, summary: `return error ${dX.toExponential(3)} (tol ${tolX}), dE/E ${r.final.dErel.toExponential(3)}`, runFile: files.at(-1) });
  }
  // (c) zero-coupling rest release: free-fall time to r=20 and speed-bound crossing at r=50
  for (const [integ, extra] of [['dp54', { rtol: 1e-10, atol: 1e-12 }], ['rk4', { h: 0.5 }]]) {
    const r = run({ caseId: `c-zero-coupling-freefall-${integ}`, ...mirror(r0, 0, { coupling: 0 }), tMax: 2000, rContact: 20, integrator: integ, outputDt: 50, tTol: 1e-10, ...extra }, `control-c-${integ}`);
    const contact = r.events.find((e) => e.kind === 'contact'); const sb = r.events.find((e) => e.kind === 'speed-bound');
    const tExp = tFF(0.2), tSbExp = tFF(0.5);
    const d = contact ? Math.abs(contact.t - tExp) / tExp : Infinity; const d2 = sb ? Math.abs(sb.t - tSbExp) / tSbExp : Infinity;
    const tol = integ === 'dp54' ? 1e-7 : 1e-5;
    push({ id: `c-zero-coupling-freefall-${integ}`, description: 'coupling 0, rest release at r0=100, time to r=20 (contact event) against closed-form t = sqrt(r0^3/(2 mu))[sqrt(x(1-x))+arccos(sqrt x)], mu=2K, x=0.2; also speed-bound (0.1) crossing at r=50, x=0.5', expected: { tFreeFall: tExp, tSpeedBound: tSbExp }, measured: { tContact: contact?.t ?? null, rAtContact: contact?.pairs[0].r ?? null, tSpeedBound: sb?.t ?? null, rAtSpeedBound: sb?.pairs[0].r ?? null, epsBoundEvents: r.events.filter((e) => e.kind === 'eps-bound').length }, difference: { relativeFreeFall: d, relativeSpeedBound: d2 }, tolerance: tol, pass: d <= tol && d2 <= tol, summary: `rel. free-fall time error ${d.toExponential(3)}, rel. speed-bound time error ${d2.toExponential(3)} (tol ${tol})`, runFile: files.at(-1) });
  }
  // (d) full frozen law, mirror opposite-polarity pair, convergence of invariant drift
  const prepD = mirror(r0, vCirc0); const tD = 4000;
  const dRuns = {};
  const settingsD = [['dp54-1e-8', { integrator: 'dp54', rtol: 1e-8, atol: 1e-10 }], ['dp54-1e-10', { integrator: 'dp54', rtol: 1e-10, atol: 1e-12 }], ['dp54-1e-12', { integrator: 'dp54', rtol: 1e-12, atol: 1e-14 }], ['rk4-h10', { integrator: 'rk4', h: 10 }], ['rk4-h5', { integrator: 'rk4', h: 5 }], ['rk4-h2.5', { integrator: 'rk4', h: 2.5 }]];
  for (const [name, s] of settingsD) dRuns[name] = run({ caseId: `d-full-law-mirror-${name}`, ...prepD, tMax: tD, outputDt: 100, ...s }, `control-d-${name}`);
  const driftOf = (r) => ({ E: Math.abs(r.final.dE), Erel: Math.abs(r.final.dErel), P: Math.hypot(...r.final.dP), J: Math.hypot(...r.final.dJ), maxAbsdE: Math.max(...r.samples.map((s) => Math.abs(s.dE))) });
  const ref = dRuns['dp54-1e-12'];
  const finalDiff = (r) => maxAbsDiff(r.final.state.positions, ref.final.state.positions);
  const drifts = Object.fromEntries(Object.entries(dRuns).map(([k, r]) => [k, { ...driftOf(r), finalPositionDiffVsDp54_1e12: finalDiff(r), steps: r.integrator.steps, detHmin: r.suprema.detMin, detHmax: r.suprema.detMax, condMax: r.suprema.condMax, cond2Final: r.final.cond2, cond2PairClosedFormFinal: r.final.cond2PairClosedForm, cond1EstimateMaxFinal: r.final.cond1Estimate, supSpeed: r.suprema.speed, supEps: r.suprema.eps, turningPoints: r.events.filter((e) => e.kind === 'turning-point').length }]));
  const ordRK4a = Math.log2(drifts['rk4-h10'].finalPositionDiffVsDp54_1e12 / drifts['rk4-h5'].finalPositionDiffVsDp54_1e12);
  const ordRK4b = Math.log2(drifts['rk4-h5'].finalPositionDiffVsDp54_1e12 / drifts['rk4-h2.5'].finalPositionDiffVsDp54_1e12);
  const ordRK4E = Math.log2(drifts['rk4-h10'].maxAbsdE / drifts['rk4-h5'].maxAbsdE);
  const ordDPpos = Math.log10(drifts['dp54-1e-8'].finalPositionDiffVsDp54_1e12 / drifts['dp54-1e-10'].finalPositionDiffVsDp54_1e12) / 2;
  const ordDPE = Math.log10(drifts['dp54-1e-8'].maxAbsdE / drifts['dp54-1e-10'].maxAbsdE) / 2;
  const passD = ordRK4a >= 3.5 && ordRK4a <= 5.5 && ordDPpos >= 0.5 && Object.values(dRuns).every((r) => r.final.stopReason === 'tMax');
  push({ id: 'd-full-law-mirror-convergence', description: `full frozen law, opposite-polarity mirror pair r0=100, tangential member speed sqrt(K/(2 r0)) = ${vCirc0} (zero-coupling circular value, near circular), T=${tD}; invariant drift and final-position difference against the dp54 rtol 1e-12 run (same code, so a convergence check only)`, expected: { rk4GlobalOrder: 4, dp54EffectiveOrderInTolerance: '>= 0.5 (tolerance-proportional global error has exponent 0.8..1)' }, measured: { drifts, orders: { rk4PositionOrder_h10_h5: ordRK4a, rk4PositionOrder_h5_h2p5: ordRK4b, rk4EnergyDriftOrder_h10_h5: ordRK4E, dp54PositionOrderVsTol_1e8_1e10: ordDPpos, dp54EnergyDriftOrderVsTol_1e8_1e10: ordDPE } }, difference: null, tolerance: { rk4PositionOrder: [3.5, 5.5], dp54OrderVsTol: '>= 0.5' }, pass: passD, summary: `RK4 order ${ordRK4a.toFixed(2)} (h10/h5), ${ordRK4b.toFixed(2)} (h5/h2.5); DP54 order vs tol ${ordDPpos.toFixed(2)}; det H in [${drifts['dp54-1e-10'].detHmin.toPrecision(8)}, ${drifts['dp54-1e-10'].detHmax.toPrecision(8)}], cond est max ${drifts['dp54-1e-10'].condMax.toPrecision(6)}`, runFiles: files.slice(-6) });
  // (e) member order swap and rigid rotation: separation history invariance
  {
    const ang = 0.7, ax = [1, 2, 3], an = Math.hypot(...ax), u = ax.map((v) => v / an), cth = Math.cos(ang), sth = Math.sin(ang);
    const rot = (v) => { const c = cross(u, v), d = dot(u, v); return [0, 1, 2].map((k) => v[k] * cth + c[k] * sth + u[k] * d * (1 - cth)); };
    const rows = [];
    for (const [integ, s] of [['rk4', { integrator: 'rk4', h: 10 }], ['dp54', { integrator: 'dp54', rtol: 1e-10, atol: 1e-12 }]]) {
      const base = dRuns[integ === 'rk4' ? 'rk4-h10' : 'dp54-1e-10'];
      const swapped = run({ caseId: `e-swapped-${integ}`, positions: [prepD.positions[1], prepD.positions[0]], velocities: [prepD.velocities[1], prepD.velocities[0]], polarities: [-1, 1], tMax: tD, outputDt: 100, ...s }, `control-e-swapped-${integ}`);
      const rotated = run({ caseId: `e-rotated-${integ}`, positions: prepD.positions.map(rot), velocities: prepD.velocities.map(rot), polarities: [1, -1], tMax: tD, outputDt: 100, ...s }, `control-e-rotated-${integ}`);
      const sep = (r) => r.samples.map((smp) => smp.pairs[0].r);
      const dSwap = Math.max(...sep(base).map((v, i) => Math.abs(v - sep(swapped)[i])));
      const dRot = Math.max(...sep(base).map((v, i) => Math.abs(v - sep(rotated)[i])));
      rows.push({ integrator: integ, settings: s, samplesCompared: base.samples.length, maxSeparationDiffSwapped: dSwap, maxSeparationDiffRotated: dRot, stepsBase: base.integrator.steps, stepsSwapped: swapped.integrator.steps, stepsRotated: rotated.integrator.steps });
    }
    const tolE = { rk4: 1e-10, dp54: 1e-7 }; const pass = rows.every((r) => r.maxSeparationDiffSwapped <= tolE[r.integrator] && r.maxSeparationDiffRotated <= tolE[r.integrator]);
    push({ id: 'e-order-swap-and-rotation', description: 'preparation (d) with member order swapped and with a rigid rotation (axis (1,2,3), angle 0.7 rad); separation r(t) at the output samples compared with the unmodified run. The fixed-step rows test round-off invariance (same step grid); the adaptive rows differ at tolerance level because the accepted step sequence may change.', expected: 'identical separation histories up to round-off (rk4) or up to integrator tolerance (dp54)', measured: rows, tolerance: tolE, pass, summary: rows.map((r) => `${r.integrator}: swap ${r.maxSeparationDiffSwapped.toExponential(3)}, rot ${r.maxSeparationDiffRotated.toExponential(3)}`).join('; '), runFiles: files.slice(-4) });
  }
  // (f) time reversal
  {
    const rows = []; const tF = 2000;
    for (const [integ, s] of [['dp54', { integrator: 'dp54', rtol: 1e-10, atol: 1e-12 }], ['rk4', { integrator: 'rk4', h: 10 }]]) {
      const fwd = run({ caseId: `f-forward-${integ}`, ...prepD, tMax: tF, outputDt: 100, ...s }, `control-f-forward-${integ}`);
      const back = run({ caseId: `f-backward-${integ}`, positions: fwd.final.state.positions, velocities: fwd.final.state.velocities.map((v) => v.map((c) => -c)), polarities: [1, -1], tMax: tF, outputDt: 100, ...s }, `control-f-backward-${integ}`);
      const dX = maxAbsDiff(back.final.state.positions, prepD.positions);
      const dV = maxAbsDiff(back.final.state.velocities.map((v) => v.map((c) => -c)), prepD.velocities);
      rows.push({ integrator: integ, settings: s, positionReturnError: dX, velocityReturnError: dV });
    }
    const tolF = { dp54: 1e-5, rk4: 1e-3 }; const pass = rows.every((r) => r.positionReturnError <= tolF[r.integrator]);
    push({ id: 'f-time-reversal', description: `preparation (d) integrated forward to T=${tF}, velocities negated, integrated back; return error in positions (and velocities, sign restored)`, expected: 'return to the preparation', measured: rows, tolerance: tolF, pass, summary: rows.map((r) => `${r.integrator}: dX ${r.positionReturnError.toExponential(3)}, dV ${r.velocityReturnError.toExponential(3)}`).join('; '), runFiles: files.slice(-4) });
  }
  // (g) obstruction-event controls (instrument behaviour, not targets). The pair
  // Hessian has det H = (1 - 1/r^2)(1 - 1/(4 r^2))^2 for both polarities.
  // g1: an artificially high detTol = 0.9 must stop the history where the
  //     closed form crosses 0.9 (both polarities, speeds inside the domain).
  // g2: opposite polarity, inward release, default-like detTol = 1e-6: the
  //     history must end just outside the singular locus r = 1 and must not
  //     step across it.
  {
    const rows = [];
    const detCF = (r) => (1 - 1 / (r * r)) * (1 - 1 / (4 * r * r)) ** 2;
    const rAt = (dt) => { let lo = 1.0001, hi = 6; while (hi - lo > 1e-14) { const m = 0.5 * (lo + hi); if (detCF(m) < dt) lo = m; else hi = m; } return 0.5 * (lo + hi); };
    // same polarity: the energy-like invariant E = u^2 (1 - 1/r) + 1/r for the head-on
    // mirror pair caps the inward reach below c_f, so it uses a higher threshold and speed
    for (const [pol, dTol, u] of [[[1, -1], 0.9, 0.05], [[1, 1], 0.95, 0.2]]) {
      const label = pol[1] < 0 ? 'opposite' : 'same'; const rThresh = rAt(dTol);
      const r = run({ caseId: `g1-obstruction-threshold-${label}`, positions: [[3, 0, 0], [-3, 0, 0]], velocities: [[-u, 0, 0], [u, 0, 0]], polarities: pol, tMax: 200, rContact: 1e-3, integrator: 'dp54', rtol: 1e-10, atol: 1e-12, outputDt: 5, detTol: dTol, condMax: 1e6 }, `control-g1-${label}`);
      const ob = r.events.find((e) => e.kind === 'obstruction');
      rows.push({ control: 'g1', polarity: label, stopReason: r.final.stopReason, tObstruction: ob?.t ?? null, rAtObstruction: ob?.pairs[0].r ?? null, rExpected: rThresh, rDifference: ob ? Math.abs(ob.pairs[0].r - rThresh) : null, detHAtEvent: ob?.detH ?? null, detTol: dTol, memberSpeed: u, supSpeed: r.suprema.speed, detJumpRejections: r.integrator.detJumpRejections });
    }
    {
      const r = run({ caseId: 'g2-obstruction-locus-opposite', positions: [[1.5, 0, 0], [-1.5, 0, 0]], velocities: [[-0.05, 0, 0], [0.05, 0, 0]], polarities: [1, -1], tMax: 200, rContact: 1e-3, integrator: 'dp54', rtol: 1e-10, atol: 1e-12, outputDt: 5, detTol: 1e-6, condMax: 1e6, maxSteps: 2e5 }, 'control-g2-opposite');
      const ob = r.events.find((e) => e.kind === 'obstruction');
      rows.push({ control: 'g2', polarity: 'opposite', stopReason: r.final.stopReason, tObstruction: ob?.t ?? null, rAtObstruction: ob?.pairs[0].r ?? null, rExpected: 1, detHAtEvent: ob?.detH ?? null, cond2AtEvent: ob?.cond2 ?? null, cond2AtFailure: ob?.cond2_at_failure ?? null, reason: ob?.reason ?? null, detHMinOverHistory: r.suprema.detMin, detTol: 1e-6, condMax: 1e6, supSpeed: r.suprema.speed, steps: r.integrator.steps, detJumpRejections: r.integrator.detJumpRejections, note: 'speeds leave the declared domain before the locus; instrument-behaviour control only' });
    }
    const pass = rows.filter((r) => r.control === 'g1').every((r) => r.stopReason === 'obstruction' && r.rDifference <= 1e-6)
      && rows.filter((r) => r.control === 'g2').every((r) => r.stopReason === 'obstruction' && r.rAtObstruction > 1 && r.rAtObstruction < 1.01 && r.detHMinOverHistory > 0);
    push({ id: 'g-obstruction-stop', description: 'instrument-behaviour controls: pair released moving inward (member speed 0.05). g1: release at r=6, detTol 0.9 (opposite, member speed 0.05) or 0.95 (same, member speed 0.2) must stop where det H = (1-1/r^2)(1-1/(4r^2))^2 equals detTol, each polarity separately. g2: release at r=3, opposite polarity with detTol 1e-6 must end just outside the singular locus r=1 with det H positive throughout (no step across). Nothing is regularized or pseudo-inverted.', expected: { g1_rThreshold: { opposite: rAt(0.9), same: rAt(0.95) }, g2_r: 'in (1, 1.01), det H > 0 over the whole history' }, measured: rows, tolerance: { g1_rDifference: 1e-6, g2_r: [1, 1.01] }, pass, summary: rows.map((r) => `${r.control} ${r.polarity}: ${r.stopReason} r=${r.rAtObstruction?.toPrecision(10)} det=${r.detHAtEvent?.toExponential(3)}`).join('; '), runFiles: files.slice(-3) });
  }
  receipt.selfcheck = selfcheck(false);
  receipt.allPass = receipt.controls.every((c) => c.pass);
  receipt.utcEnd = new Date().toISOString(); receipt.wallMs = Date.now() - t0; receipt.runFiles = files;
  fs.writeFileSync(RECEIPT_PATH, JSON.stringify(receipt, null, 1));
  console.log(`controls: ${receipt.controls.filter((c) => c.pass).length}/${receipt.controls.length} pass; selfcheck max rel. discrepancy ${JSON.stringify(receipt.selfcheck.maxRelativeDiscrepancy)}; receipt ${RECEIPT_PATH}; wall ${receipt.wallMs} ms`);
  return receipt;
}

// ------------------------------------------------- CLI
function main(argv) {
  const args = argv.slice(2);
  if (args.includes('--selfcheck')) { const r = selfcheck(true); fs.mkdirSync(OUT_DIR, { recursive: true }); fs.writeFileSync(path.join(OUT_DIR, 'selfcheck.json'), JSON.stringify(r, null, 1)); return; }
  if (args.includes('--controls')) { controls(); return; }
  const ci = args.indexOf('--case');
  if (ci >= 0) {
    const spec = JSON.parse(fs.readFileSync(args[ci + 1], 'utf8'));
    const r = runCase(spec); const file = writeRun(r, (spec.caseId || path.basename(args[ci + 1], '.json')).replace(/[^A-Za-z0-9_.-]/g, '_'));
    console.log(summaryLine(r)); console.log(`run record: ${file}`); return;
  }
  console.log('usage: node darwin-overnight-pair-instrument.mjs --selfcheck | --controls | --case <spec.json>');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv);

export { lagrangian, assemble, luFactor, luSolve, solveAcceleration, invariants, runCase, selfcheck, controls, pairClosedForms, K, CF };
