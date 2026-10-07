// weber-binding-sphere-reference-lib.mjs
// Reference-lane helpers for the six-body (18x18) evaluation. Imports only the
// lane's own frozen law module; nothing is taken from any subject instrument.
import { DEFAULT_LAW, solveAccelerations, lawResidual } from '../../binary-research/evidence/weber-frequency-reference-law.mjs';

export { DEFAULT_LAW, solveAccelerations, lawResidual };

// ---------- small vector helpers ----------
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a) => Math.hypot(a[0], a[1], a[2]);
export const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const unit = (a) => scale(a, 1 / norm(a));

// ---------- own seeded PRNG (mulberry32 on a 32-bit state) ----------
export function makeRng(seed) {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const gauss = () => {
    let u = 0, v = 0;
    while (u === 0) u = next();
    while (v === 0) v = next();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const unitVec = () => unit([gauss(), gauss(), gauss()]);
  return { next, gauss, unitVec };
}

// ---------- residual of a rigid rotation about axis n (unit) through the origin ----------
// Returns per-member residual vectors A_i + Omega^2 X_perp,i and summary norms.
export function rigidResidual(X, q, Omega, n = [0, 0, 1], law = DEFAULT_LAW) {
  const V = X.map((x) => scale(cross(n, x), Omega));
  const sol = solveAccelerations({ X, V, q }, law);
  if (sol.singular) return { singular: true, det: 0 };
  const res = [];
  let worst = 0;
  let Rmax = 0;
  for (let i = 0; i < X.length; i++) {
    const axial = dot(X[i], n);
    const perp = sub(X[i], scale(n, axial));
    const r = add(sol.A[i], scale(perp, Omega * Omega));
    res.push(r);
    const nr = norm(r);
    if (nr > worst) worst = nr;
    const R = norm(X[i]);
    if (R > Rmax) Rmax = R;
  }
  return { singular: false, det: sol.det, A: sol.A, V, res, worst, normalized: worst / (Omega * Omega * Rmax), lawRes: lawResidual({ X, V, q }, sol.A, law) };
}

// ---------- prescribed-path residual for a path X_i(T), V_i(T) with A = -Omega^2 X ----------
// path(T) -> { X, V }. Samples nT times over one period 2 pi / Omega.
export function prescribedPathResidual(path, q, Omega, R, nT = 64, law = DEFAULT_LAW) {
  const P = 2 * Math.PI / Omega;
  let worst = 0, worstRad = 0, worstTan = 0, worstBin = 0, minDet = Infinity, maxDet = -Infinity, minSep = Infinity;
  let worstT = 0, worstI = -1;
  for (let k = 0; k < nT; k++) {
    const T = (k * P) / nT;
    const { X, V } = path(T);
    const sol = solveAccelerations({ X, V, q }, law);
    if (sol.singular) return { singular: true };
    if (sol.det < minDet) minDet = sol.det;
    if (sol.det > maxDet) maxDet = sol.det;
    if (sol.minSep < minSep) minSep = sol.minSep;
    for (let i = 0; i < X.length; i++) {
      const r = add(sol.A[i], scale(X[i], Omega * Omega));
      const nr = norm(r) / (Omega * Omega * R);
      if (nr > worst) { worst = nr; worstT = T; worstI = i; }
      const xh = unit(X[i]);
      const vh = unit(V[i]);
      const bh = cross(xh, vh);
      const rad = Math.abs(dot(r, xh)) / (Omega * Omega * R);
      const tan = Math.abs(dot(r, vh)) / (Omega * Omega * R);
      const bin = Math.abs(dot(r, bh)) / (Omega * Omega * R);
      if (rad > worstRad) worstRad = rad;
      if (tan > worstTan) worstTan = tan;
      if (bin > worstBin) worstBin = bin;
    }
  }
  return { singular: false, R: worst, radial: worstRad, tangential: worstTan, binormal: worstBin, minDet, maxDet, minSep, worstT, worstI };
}

// ---------- own Levenberg-Marquardt with finite-difference Jacobian ----------
// fn(p) -> residual array. Returns { p, cost, iterations, converged }.
export function levenbergMarquardt(fn, p0, opts = {}) {
  const maxIter = opts.maxIter ?? 200;
  const tolCost = opts.tolCost ?? 1e-30;
  const tolStep = opts.tolStep ?? 1e-14;
  const fdStep = opts.fdStep ?? 1e-7;
  const lower = opts.lower ?? null;
  const upper = opts.upper ?? null;
  const clamp = (p) => {
    if (!lower && !upper) return p;
    return p.map((v, i) => {
      if (lower && v < lower[i]) v = lower[i];
      if (upper && v > upper[i]) v = upper[i];
      return v;
    });
  };
  let p = clamp(p0.slice());
  let r = fn(p);
  const cost = (rr) => rr.reduce((s, v) => s + v * v, 0);
  let c = cost(r);
  let lambda = 1e-3;
  const n = p.length, m = r.length;
  let iter = 0;
  let converged = false;
  for (iter = 0; iter < maxIter; iter++) {
    if (!Number.isFinite(c)) break;
    // Jacobian by central differences
    const J = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let j = 0; j < n; j++) {
      const h = fdStep * Math.max(1, Math.abs(p[j]));
      const pp = p.slice(); pp[j] += h;
      const pm = p.slice(); pm[j] -= h;
      const rp = fn(clamp(pp)), rm = fn(clamp(pm));
      for (let i = 0; i < m; i++) J[i][j] = (rp[i] - rm[i]) / (2 * h);
    }
    // normal equations
    const JtJ = Array.from({ length: n }, () => new Array(n).fill(0));
    const Jtr = new Array(n).fill(0);
    for (let i = 0; i < m; i++) {
      for (let a = 0; a < n; a++) {
        Jtr[a] += J[i][a] * r[i];
        for (let b = 0; b < n; b++) JtJ[a][b] += J[i][a] * J[i][b];
      }
    }
    let accepted = false;
    for (let tries = 0; tries < 30; tries++) {
      const Aug = JtJ.map((row, a) => row.map((v, b) => (a === b ? v + lambda * (v + 1e-12) : v)));
      const rhs = Jtr.map((v) => -v);
      const step = solveSmall(Aug, rhs);
      if (!step) { lambda *= 10; continue; }
      const pn = clamp(p.map((v, i) => v + step[i]));
      const rn = fn(pn);
      const cn = cost(rn);
      if (Number.isFinite(cn) && cn < c) {
        const stepNorm = Math.sqrt(step.reduce((s, v) => s + v * v, 0));
        p = pn; r = rn; c = cn; lambda = Math.max(lambda / 10, 1e-15); accepted = true;
        if (stepNorm < tolStep || c < tolCost) converged = true;
        break;
      }
      lambda *= 10;
    }
    if (!accepted || converged) break;
  }
  return { p, residual: r, cost: c, rms: Math.sqrt(c / m), iterations: iter, converged };
}

function solveSmall(A, b) {
  const n = b.length;
  const M = A.map((row) => row.slice());
  const x = b.slice();
  for (let k = 0; k < n; k++) {
    let p = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    if (Math.abs(M[p][k]) < 1e-300) return null;
    [M[k], M[p]] = [M[p], M[k]]; [x[k], x[p]] = [x[p], x[k]];
    for (let i = k + 1; i < n; i++) {
      const f = M[i][k] / M[k][k];
      for (let j = k; j < n; j++) M[i][j] -= f * M[k][j];
      x[i] -= f * x[k];
    }
  }
  for (let i = n - 1; i >= 0; i--) {
    let s = x[i];
    for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j];
    x[i] = s / M[i][i];
  }
  return x;
}

// ---------- rotating-frame vector field and finite-difference Jacobian ----------
// State y = [X (3N), U (3N)] with U the rotating-frame velocity; frame rotates at
// Omega about unit axis n. X' = U, U' = A(X, U + W x X) - 2 W x U - W x (W x X), W = Omega n.
export function rotatingField(y, q, Omega, n = [0, 0, 1], law = DEFAULT_LAW) {
  const N = q.length;
  const W = scale(n, Omega);
  const X = [], U = [], V = [];
  for (let i = 0; i < N; i++) {
    X.push([y[3 * i], y[3 * i + 1], y[3 * i + 2]]);
    U.push([y[3 * N + 3 * i], y[3 * N + 3 * i + 1], y[3 * N + 3 * i + 2]]);
    V.push(add(U[i], cross(W, X[i])));
  }
  const sol = solveAccelerations({ X, V, q }, law);
  if (sol.singular) throw new Error('singular in rotating field');
  const dy = new Array(6 * N);
  for (let i = 0; i < N; i++) {
    const cor = scale(cross(W, U[i]), 2);
    const cen = cross(W, cross(W, X[i]));
    const acc = sub(sub(sol.A[i], cor), cen);
    for (let a = 0; a < 3; a++) { dy[3 * i + a] = U[i][a]; dy[3 * N + 3 * i + a] = acc[a]; }
  }
  return dy;
}

export function fdJacobian(f, y0, h = 1e-6) {
  // Richardson-extrapolated central differences: (4 D_h - D_2h)/3
  const n = y0.length;
  const f0 = f(y0);
  const m = f0.length;
  const J = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    const col = (hh) => {
      const yp = y0.slice(); yp[j] += hh;
      const ym = y0.slice(); ym[j] -= hh;
      const fp = f(yp), fm = f(ym);
      return fp.map((v, i) => (v - fm[i]) / (2 * hh));
    };
    const d1 = col(h), d2 = col(2 * h);
    for (let i = 0; i < m; i++) J[i][j] = (4 * d1[i] - d2[i]) / 3;
  }
  return { J, f0 };
}

export const sig15 = (x) => (typeof x === 'number' && Number.isFinite(x) ? Number(x.toPrecision(15)) : x);
