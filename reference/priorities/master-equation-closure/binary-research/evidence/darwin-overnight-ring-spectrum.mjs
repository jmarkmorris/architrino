#!/usr/bin/env node
// darwin-overnight ring perturbation (lens jack-k-hale), 2026-10-05, round 2 of the ring.
// Linearization of the frozen Darwin-inspired functional (Section 10 box: unit weights,
// inverse-distance pair term, velocity coupling 1/(2 c_f^2), c_f = K = 1, instantaneous
// support, no kinetic correction) about the balanced four-member alternating ring, in the
// frame rotating at Omega about the z axis through the ring centre, where the ring is a
// fixed point of the autonomous field
//   Ydot = W,   Wdot = A(Y, W + Omega x Y) - 2 Omega x W - Omega x (Omega x Y),
//   A = H(Y)^{-1} G(Y, V)  (the implicit acceleration solve of the law).
// Order of operations (binding evidence rule: known case before target, residual before Jacobian):
//   K1. Copied general-N assembly (H, G) vs central finite differences of a direct evaluation of
//       L_D at random N = 4 three-dimensional states (alternating polarity).
//   K2. The closed-form term (dH/dX).A against the exact-derivative route.
//   K3. Rotating-frame Jacobian machinery on the opposite-polarity mirror PAIR circle at r0 = 100:
//       relative in-plane {0,0,+-i w_r}, relative axial +-i theta0dot, common in-plane +-i theta0dot
//       each double with a size-two Jordan block (finite-difference split scaling as sqrt(delta)),
//       common axial double zero.
//   For each ring radius R: recompute v^2 = 2(2 sqrt2 - 1)/(8R - 1 - sqrt2), assemble H and G at the
//   state, record ||H A - G||_inf against 1e-12 ||G||_inf, and only then form the Jacobian.
//   Jacobian route: forward-mode (dual-number) differentiation of the closed-form pair blocks of
//   H and G (exact to rounding), with the solve differentiated: dA = H^{-1}(dG - (dH) A).
//   Verification: central finite differences of the assembled rotating-frame field at >= 3 steps.
//   Block diagonalization: local bases (r_k, t_k, z), discrete Fourier transform over the cyclic
//   shift k -> k+1 (sectors m = 0..3, complex representation), axial / in-plane split.
// Run: node darwin-overnight-ring-spectrum.mjs
//   writes ../evidence/darwin-overnight-ring-spectrum-controls.json (compact receipt) and
//   .local-data/master-equation-closure/darwin-overnight/ring-perturbation/ring-spectrum-full.json (bulky).
// Derivation and discussion: ../../braid-program/analysis/darwin-overnight-ring.md Sections 9-11.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const T_START = new Date().toISOString();
const SQ2 = Math.SQRT2;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add3 = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const scale = (s, a) => [s * a[0], s * a[1], s * a[2]];
const norm = (a) => Math.sqrt(dot(a, a));
const zeros = (n, m = n) => Array.from({ length: n }, () => new Array(m).fill(0));
const flat = (G) => G.flat();
const infNorm = (v) => v.reduce((m, x) => Math.max(m, Math.abs(x)), 0);
const matMaxAbs = (A) => A.reduce((m, row) => Math.max(m, infNorm(row)), 0);
const matSub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const matVec = (H, v) => H.map((row) => row.reduce((s, x, j) => s + x * v[j], 0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const identity = (n) => zeros(n).map((row, i) => { row[i] = 1; return row; });

// ---------- direct evaluation of L_D (reference for the finite-difference check; copied) ----------
function lagrangian(X, V, q, coupling = 1) {
  const N = X.length; let L = 0;
  for (let i = 0; i < N; i++) L += 0.5 * dot(V[i], V[i]);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const sigma = q[i] * q[j]; const d = sub(X[i], X[j]); const r = norm(d); const e = scale(1 / r, d);
    L -= sigma / r;
    if (coupling) L += (sigma / (2 * r)) * (dot(V[i], V[j]) + dot(V[i], e) * dot(V[j], e));
  }
  return L;
}
// ---------- general-N closed-form assembly (copied from the ring-balance script, unchanged) ----------
function assembleH(X, q, coupling = 1) {
  const N = X.length; const H = zeros(3 * N);
  for (let i = 0; i < N; i++) for (let a = 0; a < 3; a++) H[3 * i + a][3 * i + a] = 1;
  if (!coupling) return H;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const sigma = q[i] * q[j]; const d = sub(X[i], X[j]); const r = norm(d); const e = scale(1 / r, d); const m = sigma / (2 * r);
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
      const val = m * ((a === b ? 1 : 0) + e[a] * e[b]); H[3 * i + a][3 * j + b] = val; H[3 * j + b][3 * i + a] = val;
    }
  }
  return H;
}
function assembleG(X, V, q, coupling = 1) {
  const N = X.length; const G = Array.from({ length: N }, () => [0, 0, 0]);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (j === i) continue;
    const sigma = q[i] * q[j]; const d = sub(X[i], X[j]); const r = norm(d); const e = scale(1 / r, d);
    const Vi = V[i], Vj = V[j]; const vie = dot(Vi, e), vje = dot(Vj, e);
    let g = [0, 0, 0];
    if (!coupling) g = scale(sigma / (r * r), e);
    else {
      const S = dot(Vi, Vj) + vie * vje;
      for (let a = 0; a < 3; a++) g[a] = (sigma / (r * r)) * ((1 - 0.5 * S) * e[a] + 0.5 * (vje * Vi[a] + vie * Vj[a] - 2 * vie * vje * e[a]));
      const dV = sub(Vi, Vj); const rdot = dot(e, dV); const w = sub(dV, scale(rdot, e)); const u = Vj; const eu = dot(e, u), wu = dot(w, u);
      for (let a = 0; a < 3; a++) g[a] -= (sigma / (2 * r * r)) * (-rdot * (u[a] + eu * e[a]) + eu * w[a] + wu * e[a]);
    }
    for (let a = 0; a < 3; a++) G[i][a] += g[a];
  }
  return G;
}
// ---------- finite differences of L_D (copied) ----------
function cloneState(S) { return S.map((v) => v.slice()); }
function fdH(X, V, q, h = 1e-3) {
  const N = X.length, n = 3 * N; const H = zeros(n);
  const f = (dv) => { const W = cloneState(V); for (const [k, a, s] of dv) W[k][a] += s; return lagrangian(X, W, q); };
  for (let p = 0; p < n; p++) for (let r = p; r < n; r++) {
    const kp = Math.floor(p / 3), ap = p % 3, kr = Math.floor(r / 3), ar = r % 3; let val;
    if (p === r) val = (f([[kp, ap, h]]) - 2 * f([]) + f([[kp, ap, -h]])) / (h * h);
    else val = (f([[kp, ap, h], [kr, ar, h]]) - f([[kp, ap, h], [kr, ar, -h]]) - f([[kp, ap, -h], [kr, ar, h]]) + f([[kp, ap, -h], [kr, ar, -h]])) / (4 * h * h);
    H[p][r] = val; H[r][p] = val;
  }
  return H;
}
function fdG(X, V, q, h = 1e-4) {
  const N = X.length; const G = Array.from({ length: N }, () => [0, 0, 0]);
  const Lx = (k, a, s, W) => { const Y = cloneState(X); Y[k][a] += s; return lagrangian(Y, W ?? V, q); };
  for (let i = 0; i < N; i++) for (let a = 0; a < 3; a++) {
    G[i][a] = (Lx(i, a, h) - Lx(i, a, -h)) / (2 * h);
    for (let k = 0; k < N; k++) for (let b = 0; b < 3; b++) {
      const Vp = cloneState(V); Vp[i][a] += h; const Vm = cloneState(V); Vm[i][a] -= h;
      const mixed = (Lx(k, b, h, Vp) - Lx(k, b, -h, Vp) - Lx(k, b, h, Vm) + Lx(k, b, -h, Vm)) / (4 * h * h);
      G[i][a] -= mixed * V[k][b];
    }
  }
  return G;
}
// ---------- real linear algebra ----------
function luSolve(Ain, bin) {
  const n = Ain.length; const A = Ain.map((r) => r.slice()); const b = bin.slice();
  for (let k = 0; k < n; k++) {
    let piv = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[piv][k])) piv = i;
    if (piv !== k) { [A[k], A[piv]] = [A[piv], A[k]]; [b[k], b[piv]] = [b[piv], b[k]]; }
    if (A[k][k] === 0) throw new Error('singular H');
    for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; if (f === 0) continue; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; b[i] -= f * b[k]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
  return x;
}
// deterministic pseudo-random (LCG) so the receipt is reproducible
let seed = 20261005;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 - 0.5; };

// ---------- dual numbers: exact forward-mode derivative along one direction ----------
class D {
  constructor(v, d = 0) { this.v = v; this.d = d; }
  static c(x) { return x instanceof D ? x : new D(x, 0); }
  add(o) { o = D.c(o); return new D(this.v + o.v, this.d + o.d); }
  sub(o) { o = D.c(o); return new D(this.v - o.v, this.d - o.d); }
  mul(o) { o = D.c(o); return new D(this.v * o.v, this.v * o.d + this.d * o.v); }
  div(o) { o = D.c(o); return new D(this.v / o.v, (this.d * o.v - this.v * o.d) / (o.v * o.v)); }
  sqrt() { const s = Math.sqrt(this.v); return new D(s, this.d / (2 * s)); }
}
const dotD = (a, b) => a[0].mul(b[0]).add(a[1].mul(b[1])).add(a[2].mul(b[2]));
const subD = (a, b) => [a[0].sub(b[0]), a[1].sub(b[1]), a[2].sub(b[2])];
const scaleD = (s, a) => [s.mul(a[0]), s.mul(a[1]), s.mul(a[2])];
// same formulas as assembleH / assembleG, evaluated in dual arithmetic; returns the derivative parts
function assembleHD(X, q) {
  const N = X.length; const Hd = zeros(3 * N);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const sigma = q[i] * q[j]; const d = subD(X[i], X[j]); const r = dotD(d, d).sqrt(); const e = scaleD(new D(1).div(r), d); const m = new D(sigma / 2).div(r);
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
      const val = m.mul(new D(a === b ? 1 : 0).add(e[a].mul(e[b]))); Hd[3 * i + a][3 * j + b] = val.d; Hd[3 * j + b][3 * i + a] = val.d;
    }
  }
  return Hd;
}
function assembleGD(X, V, q) {
  const N = X.length; const Gd = Array.from({ length: N }, () => [0, 0, 0]);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (j === i) continue;
    const sigma = q[i] * q[j]; const d = subD(X[i], X[j]); const r = dotD(d, d).sqrt(); const e = scaleD(new D(1).div(r), d);
    const Vi = V[i], Vj = V[j]; const vie = dotD(Vi, e), vje = dotD(Vj, e);
    const S = dotD(Vi, Vj).add(vie.mul(vje)); const r2 = r.mul(r); const c1 = new D(sigma).div(r2); const c2 = new D(sigma / 2).div(r2);
    const dV = subD(Vi, Vj); const rdot = dotD(e, dV); const w = subD(dV, scaleD(rdot, e)); const u = Vj; const eu = dotD(e, u), wu = dotD(w, u);
    for (let a = 0; a < 3; a++) {
      const g = c1.mul(new D(1).sub(S.mul(0.5)).mul(e[a]).add(vje.mul(Vi[a]).add(vie.mul(Vj[a])).sub(vie.mul(vje).mul(e[a]).mul(2)).mul(0.5)));
      const md = c2.mul(rdot.mul(-1).mul(u[a].add(eu.mul(e[a]))).add(eu.mul(w[a])).add(wu.mul(e[a])));
      Gd[i][a] += g.sub(md).d;
    }
  }
  return Gd;
}
// Jacobian of the non-rotating-frame acceleration A = H^{-1} G with the solve differentiated: dA = H^{-1}(dG - (dH) A)
function accelJacobian(X, V, q) {
  const N = X.length, n = 3 * N;
  const H = assembleH(X, q); const G = flat(assembleG(X, V, q)); const A = luSolve(H, G);
  const dAdX = zeros(n), dAdV = zeros(n);
  for (let p = 0; p < 2 * n; p++) {
    const XD = X.map((xi, k) => xi.map((x, a) => new D(x, p === 3 * k + a ? 1 : 0)));
    const VD = V.map((vi, k) => vi.map((v, a) => new D(v, p === n + 3 * k + a ? 1 : 0)));
    const dG = flat(assembleGD(XD, VD, q)); const dH = p < n ? assembleHD(XD, q) : null;
    const rhs = dG.map((x, i) => x - (dH ? dot3n(dH[i], A) : 0));
    const col = luSolve(H, rhs);
    for (let i = 0; i < n; i++) { if (p < n) dAdX[i][p] = col[i]; else dAdV[i][p - n] = col[i]; }
  }
  return { H, G, A, dAdX, dAdV };
}
const dot3n = (row, v) => row.reduce((s, x, j) => s + x * v[j], 0);
// closed-form (dH/dX).A from the pair blocks: d/dX_i [M_ij A_j] = sigma/(2 r^2) [ -(A_j + (e.A_j) e) e^T + e A_j^T (I - e e^T) + (e.A_j)(I - e e^T) ] (dX_i - dX_j)
function dHA_closed(X, q, Aflat) {
  const N = X.length, n = 3 * N; const K = zeros(n);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (j === i) continue;
    const sigma = q[i] * q[j]; const d = sub(X[i], X[j]); const r = norm(d); const e = scale(1 / r, d); const Aj = Aflat.slice(3 * j, 3 * j + 3); const eA = dot(e, Aj);
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) {
      const Pab = (a === b ? 1 : 0) - e[a] * e[b];
      let val = -(Aj[a] + eA * e[a]) * e[b];
      for (let c = 0; c < 3; c++) val += e[a] * Aj[c] * ((c === b ? 1 : 0) - e[c] * e[b]);
      val += eA * Pab; val *= sigma / (2 * r * r);
      K[3 * i + a][3 * i + b] += val; K[3 * i + a][3 * j + b] -= val;
    }
  }
  return K;
}
// ---------- rotating frame ----------
const crossZ = (Om, a) => [-Om * a[1], Om * a[0], 0];
function rotField(Y, W, q, Om) {
  const N = Y.length; const V = Y.map((y, k) => add3(W[k], crossZ(Om, y)));
  const H = assembleH(Y, q); const G = flat(assembleG(Y, V, q)); const A = luSolve(H, G);
  const Wdot = []; for (let k = 0; k < N; k++) { const a = A.slice(3 * k, 3 * k + 3); const c = crossZ(Om, W[k]); Wdot.push([a[0] - 2 * c[0] + Om * Om * Y[k][0], a[1] - 2 * c[1] + Om * Om * Y[k][1], a[2] - 2 * c[2]]); }
  return flat(W).concat(flat(Wdot));
}
// scaled Jacobian in units of Omega: time t' = Omega t, velocity W' = W / Omega; eigenvalues are lambda / Omega
function rotJacobianAD(Y, W, q, Om) {
  const N = Y.length, n = 3 * N; const V = Y.map((y, k) => add3(W[k], crossZ(Om, y)));
  const { A, dAdX, dAdV } = accelJacobian(Y, V, q);
  const Cx = zeros(n); for (let k = 0; k < N; k++) { Cx[3 * k][3 * k + 1] = -Om; Cx[3 * k + 1][3 * k] = Om; }
  const Jyy = zeros(n); // Jyy = dAdX + dAdV Cx - Cx^2
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) Jyy[i][j] = dAdX[i][j] + dot3n(dAdV[i], Cx.map((r) => r[j])) - dot3n(Cx[i], Cx.map((r) => r[j]));
  const Jyw = dAdV.map((row, i) => row.map((x, j) => x - 2 * Cx[i][j]));
  const J = zeros(2 * n);
  for (let i = 0; i < n; i++) { J[i][n + i] = 1; for (let j = 0; j < n; j++) { J[n + i][j] = Jyy[i][j] / (Om * Om); J[n + i][n + j] = Jyw[i][j] / Om; } }
  return { J, A, V };
}
function rotJacobianFD(Y, W, q, Om, h, Lscale) {
  const N = Y.length, n = 3 * N; const J = zeros(2 * n); const base = flat(Y).concat(flat(W));
  const unpack = (s) => ({ Yp: Array.from({ length: N }, (_, k) => s.slice(3 * k, 3 * k + 3)), Wp: Array.from({ length: N }, (_, k) => s.slice(n + 3 * k, n + 3 * k + 3)) });
  for (let p = 0; p < 2 * n; p++) {
    const hp = p < n ? h * Lscale : h * Lscale * Om;
    const sp = base.slice(); sp[p] += hp; const sm = base.slice(); sm[p] -= hp;
    const { Yp, Wp } = unpack(sp); const { Yp: Ym, Wp: Wm } = unpack(sm);
    const fp = rotField(Yp, Wp, q, Om), fm = rotField(Ym, Wm, q, Om);
    for (let i = 0; i < 2 * n; i++) {
      const dij = (fp[i] - fm[i]) / (2 * hp);
      // scale to units of Omega: rows n.. (Wdot) by 1/Om^2 for position columns, 1/Om for velocity columns; rows 0..n-1 (Ydot = W) unscaled -> with W' = W/Om the entry is exactly 1
      if (i < n) J[i][p] = p < n ? dij : dij; else J[i][p] = p < n ? dij / (Om * Om) : dij / Om;
    }
  }
  return J;
}
// ---------- complex arithmetic and small eigenproblems ----------
const C = {
  add: (a, b) => [a[0] + b[0], a[1] + b[1]], sub: (a, b) => [a[0] - b[0], a[1] - b[1]],
  mul: (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]],
  div: (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; },
  abs: (a) => Math.hypot(a[0], a[1]), conj: (a) => [a[0], -a[1]], sc: (s, a) => [s * a[0], s * a[1]],
  pow: (a, k) => { let r = [1, 0]; for (let i = 0; i < k; i++) r = C.mul(r, a); return r; },
};
const czeros = (n, m = n) => Array.from({ length: n }, () => Array.from({ length: m }, () => [0, 0]));
const cident = (n) => czeros(n).map((r, i) => { r[i] = [1, 0]; return r; });
const cfromReal = (A) => A.map((r) => r.map((x) => [x, 0]));
const cmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => C.add(s, C.mul(x, B[k][j])), [0, 0])));
const cherm = (A) => A[0].map((_, j) => A.map((row) => C.conj(row[j])));
const cmaxAbs = (A) => A.reduce((m, r) => Math.max(m, r.reduce((mm, x) => Math.max(mm, C.abs(x)), 0)), 0);
const csubmat = (A, idx) => idx.map((i) => idx.map((j) => A[i][j]));
function charPoly(A) { // Faddeev-LeVerrier; returns c[0..n] with p(l) = sum c[k] l^k, c[n] = 1
  const n = A.length; let M = czeros(n); const c = new Array(n + 1).fill(null); c[n] = [1, 0];
  for (let k = 1; k <= n; k++) {
    const AM = cmul(A, M); for (let i = 0; i < n; i++) AM[i][i] = C.add(AM[i][i], c[n - k + 1]); M = AM;
    const AMk = cmul(A, M); let tr = [0, 0]; for (let i = 0; i < n; i++) tr = C.add(tr, AMk[i][i]); c[n - k] = C.sc(-1 / k, tr);
  }
  return c;
}
function polyEval(c, x) { let r = c[c.length - 1]; for (let k = c.length - 2; k >= 0; k--) r = C.add(C.mul(r, x), c[k]); return r; }
function polyRoots(c) { // Durand-Kerner on a monic polynomial, then Newton polish
  const n = c.length - 1; const z = []; for (let j = 0; j < n; j++) z.push(C.pow([0.4, 0.9], j + 1));
  for (let it = 0; it < 5000; it++) {
    let mx = 0;
    for (let j = 0; j < n; j++) { let den = [1, 0]; for (let k = 0; k < n; k++) if (k !== j) den = C.mul(den, C.sub(z[j], z[k])); const st = C.div(polyEval(c, z[j]), den); z[j] = C.sub(z[j], st); mx = Math.max(mx, C.abs(st)); }
    if (mx < 1e-17) break;
  }
  const dc = c.slice(1).map((x, k) => C.sc(k + 1, x));
  for (let j = 0; j < n; j++) for (let it = 0; it < 3; it++) { const pv = polyEval(c, z[j]), dv = polyEval(dc, z[j]); if (C.abs(dv) > 1e-8) { const st = C.div(pv, dv); if (C.abs(st) < 1e-6) z[j] = C.sub(z[j], st); } }
  return z;
}
function cEliminate(Ain) { // Gaussian elimination with full pivoting; returns pivot magnitudes in order
  const A = Ain.map((r) => r.slice()); const n = A.length, m = A[0].length; const piv = [];
  for (let k = 0; k < Math.min(n, m); k++) {
    let bi = k, bj = k, bv = -1; for (let i = k; i < n; i++) for (let j = k; j < m; j++) { const v = C.abs(A[i][j]); if (v > bv) { bv = v; bi = i; bj = j; } }
    piv.push(bv); if (bv === 0) continue;
    [A[k], A[bi]] = [A[bi], A[k]]; for (let i = 0; i < n; i++) [A[i][k], A[i][bj]] = [A[i][bj], A[i][k]];
    for (let i = k + 1; i < n; i++) { const f = C.div(A[i][k], A[k][k]); for (let j = k; j < m; j++) A[i][j] = C.sub(A[i][j], C.mul(f, A[k][j])); }
  }
  return piv;
}
function cSolve(Ain, bin) {
  const n = Ain.length; const A = Ain.map((r) => r.slice()); const b = bin.slice();
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (C.abs(A[i][k]) > C.abs(A[p][k])) p = i;
    [A[k], A[p]] = [A[p], A[k]]; [b[k], b[p]] = [b[p], b[k]];
    if (C.abs(A[k][k]) === 0) A[k][k] = [1e-300, 0];
    for (let i = k + 1; i < n; i++) { const f = C.div(A[i][k], A[k][k]); for (let j = k; j < n; j++) A[i][j] = C.sub(A[i][j], C.mul(f, A[k][j])); b[i] = C.sub(b[i], C.mul(f, b[k])); }
  }
  const x = new Array(n).fill(null);
  for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s = C.sub(s, C.mul(A[i][j], x[j])); x[i] = C.div(s, A[i][i]); }
  return x;
}
function eigvec(B, lam) { // inverse iteration with a slightly detuned shift
  const n = B.length; const sh = C.add(lam, [1e-7, 3e-8]); const M = B.map((r, i) => r.map((x, j) => (i === j ? C.sub(x, sh) : x)));
  let x = Array.from({ length: n }, (_, i) => [Math.cos(i + 1), Math.sin(2 * i + 1)]);
  for (let it = 0; it < 4; it++) { x = cSolve(M, x); const nn = Math.sqrt(x.reduce((s, c) => s + c[0] * c[0] + c[1] * c[1], 0)); x = x.map((c) => C.sc(1 / nn, c)); }
  return x;
}
function matPowShift(B, lam, k) { const n = B.length; const S = B.map((r, i) => r.map((x, j) => (i === j ? C.sub(x, lam) : x))); let P = cident(n); for (let i = 0; i < k; i++) P = cmul(P, S); return P; }
// eigen-analysis of one block: roots, clusters, Jordan diagnostics, eigenvector content
function analyzeBlock(B, clusterRadius = 1e-5) {
  const n = B.length; const c = charPoly(B); const roots = polyRoots(c);
  const used = new Array(n).fill(false); const clusters = [];
  for (let i = 0; i < n; i++) {
    if (used[i]) continue; const members = [i]; used[i] = true;
    for (let j = i + 1; j < n; j++) if (!used[j] && C.abs(C.sub(roots[i], roots[j])) < clusterRadius) { members.push(j); used[j] = true; }
    let mean = [0, 0]; for (const m of members) mean = C.add(mean, roots[m]); mean = C.sc(1 / members.length, mean);
    const spread = Math.max(...members.map((m) => C.abs(C.sub(roots[m], mean))));
    const cl = { lambda: mean, algebraic: members.length, spread };
    if (members.length > 1) {
      const normB = cmaxAbs(B); const piv1 = cEliminate(matPowShift(B, mean, 1)); const tol = 1e-6 * Math.max(1, normB);
      const rank1 = piv1.filter((p) => p > tol).length; cl.geometric = n - rank1; cl.pivots_BminusLambda = piv1;
      cl.rankPowers = []; for (let k = 1; k <= members.length; k++) cl.rankPowers.push(n - cEliminate(matPowShift(B, mean, k)).filter((p) => p > tol).length);
      cl.structure = cl.geometric < cl.algebraic ? `Jordan (algebraic ${cl.algebraic}, geometric ${cl.geometric})` : 'semisimple';
    } else cl.structure = 'simple';
    const v = eigvec(B, mean); cl.eigvecAbs = v.map(C.abs);
    clusters.push(cl);
  }
  return { charPoly: c, roots, clusters };
}
// ---------- geometry ----------
const Q4 = [1, -1, 1, -1];
function ringState(R, Omega, phi0) {
  const X = [], V = [];
  for (let k = 0; k < 4; k++) { const ph = phi0 + k * Math.PI / 2; X.push([R * Math.cos(ph), R * Math.sin(ph), 0]); V.push([-R * Omega * Math.sin(ph), R * Omega * Math.cos(ph), 0]); }
  return { X, V };
}
const v2coupled = (R) => 2 * (2 * SQ2 - 1) / (8 * R - 1 - SQ2);
const Rspeed01 = (2 * (2 * SQ2 - 1) / 0.01 + 1 + SQ2) / 8; const Rweak = 1 / (0.05 * SQ2);
// sector transform for the ring: columns ordered m = 0..3, within m: [pos r, pos t, pos z, vel r, vel t, vel z]
function ringSectorTransform(phi0) {
  const T = czeros(24, 24);
  for (let m = 0; m < 4; m++) for (let part = 0; part < 2; part++) for (let c = 0; c < 3; c++) {
    const col = 6 * m + 3 * part + c;
    for (let k = 0; k < 4; k++) {
      const ph = phi0 + k * Math.PI / 2; const Qk = [[Math.cos(ph), -Math.sin(ph), 0], [Math.sin(ph), Math.cos(ph), 0], [0, 0, 1]];
      const phase = [Math.cos(m * k * Math.PI / 2) / 2, Math.sin(m * k * Math.PI / 2) / 2];
      for (let a = 0; a < 3; a++) T[12 * part + 3 * k + a][col] = C.sc(Qk[a][c], phase);
    }
  }
  return T;
}
const IN = [0, 1, 3, 4], AX = [2, 5];
function ringSectorBlocks(J, phi0) {
  const T = ringSectorTransform(phi0); const Jp = cmul(cherm(T), cmul(cfromReal(J), T));
  let leakSector = 0, leakAxial = 0; const blocks = [];
  for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) if (Math.floor(i / 6) !== Math.floor(j / 6)) leakSector = Math.max(leakSector, C.abs(Jp[i][j]));
  for (let m = 0; m < 4; m++) {
    const Bm = csubmat(Jp, [0, 1, 2, 3, 4, 5].map((i) => 6 * m + i));
    for (const i of IN) for (const j of AX) leakAxial = Math.max(leakAxial, C.abs(Bm[i][j]), C.abs(Bm[j][i]));
    blocks.push({ m, inPlane: csubmat(Bm, IN), axial: csubmat(Bm, AX) });
  }
  return { blocks, leakSector, leakAxial, normJ: matMaxAbs(J) };
}
// symmetry matrices (24 x 24, real): cyclic shift S and the reversing involution Rv
function shiftMatrix(phi0) {
  const S = zeros(24); const c = Math.cos(Math.PI / 2), s = Math.sin(Math.PI / 2); const Rz = [[c, -s, 0], [s, c, 0], [0, 0, 1]];
  for (let part = 0; part < 2; part++) for (let k = 0; k < 4; k++) { const kp = (k + 1) % 4; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) S[12 * part + 3 * kp + a][12 * part + 3 * k + b] = Rz[a][b]; }
  return S;
}
function reversalMatrix(phi0) {
  const Rv = zeros(24); const c = Math.cos(phi0), s = Math.sin(phi0);
  const Rot = [[c, -s, 0], [s, c, 0], [0, 0, 1]], RotT = transpose(Rot); const sig = matMul(matMul(Rot, [[1, 0, 0], [0, -1, 0], [0, 0, 1]]), RotT);
  for (let part = 0; part < 2; part++) for (let k = 0; k < 4; k++) { const kp = (4 - k) % 4; for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) Rv[12 * part + 3 * k + a][12 * part + 3 * kp + b] = (part === 0 ? 1 : -1) * sig[a][b]; }
  return Rv;
}
const sortC = (arr) => arr.slice().sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]));
const fmt = (z) => `${z[0].toExponential(6)}${z[1] >= 0 ? '+' : '-'}${Math.abs(z[1]).toFixed(12)}i`;

// ================= run =================
const out = { script: 'darwin-overnight-ring-spectrum.mjs', utcStart: T_START, law: 'Section 10 box, K=1, c_f=1, instantaneous, no kinetic correction', polarities: Q4, unitsNote: 'all exponents in units of Omega (time scaled by Omega, velocities by 1/Omega)' };
const full = { utcStart: T_START };
const FD_STEPS = [1e-3, 1e-4, 1e-5, 1e-6];

// K1. assembly vs finite differences of L_D at random N = 4 states
{
  const trials = []; let worstH = 0, worstG = 0;
  for (let t = 0; t < 3; t++) {
    const X = Array.from({ length: 4 }, () => [4 * rnd(), 4 * rnd(), 4 * rnd()]); X[0][0] += 2; X[1][1] += 2; X[2][0] -= 2; X[3][1] -= 2;
    const V = Array.from({ length: 4 }, () => [0.6 * rnd(), 0.6 * rnd(), 0.6 * rnd()]);
    const dH = matMaxAbs(matSub(assembleH(X, Q4), fdH(X, V, Q4))); const g1 = flat(assembleG(X, V, Q4)), g2 = flat(fdG(X, V, Q4)); const dG = infNorm(g1.map((x, i) => x - g2[i]));
    let rmin = Infinity; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) rmin = Math.min(rmin, norm(sub(X[i], X[j])));
    trials.push({ rmin, maxAbsDiffH: dH, maxAbsDiffG: dG }); worstH = Math.max(worstH, dH); worstG = Math.max(worstG, dG);
  }
  out.K1_assembly_vs_fd_LD_N4 = { trials, worstH, worstG, tolerance: 1e-6, pass: worstH < 1e-6 && worstG < 1e-6 };
}
// K2. closed-form (dH/dX).A against the dual-number route at a random state
{
  const X = Array.from({ length: 4 }, () => [4 * rnd(), 4 * rnd(), 4 * rnd()]); X[0][0] += 2; X[1][1] += 2; X[2][0] -= 2; X[3][1] -= 2;
  const Af = Array.from({ length: 12 }, () => rnd());
  const Kc = dHA_closed(X, Q4, Af); const Kd = zeros(12);
  for (let p = 0; p < 12; p++) { const XD = X.map((xi, k) => xi.map((x, a) => new D(x, p === 3 * k + a ? 1 : 0))); const dH = assembleHD(XD, Q4); for (let i = 0; i < 12; i++) Kd[i][p] = dot3n(dH[i], Af); }
  const diff = matMaxAbs(matSub(Kc, Kd));
  out.K2_dHdX_contracted_closedForm_vs_dual = { maxAbsDiff: diff, scale: matMaxAbs(Kc), pass: diff < 1e-13 * Math.max(1, matMaxAbs(Kc)) };
}
// K3. pair circle at r0 = 100 (opposite polarity, mirror preparation) through the same machinery
{
  const r0 = 100, q = [1, -1]; const th2 = 8 / (r0 * r0 * (4 * r0 + 1)); const th = Math.sqrt(th2); const uc = 1 / Math.sqrt(2 * r0 + 0.5);
  const Y = [[r0 / 2, 0, 0], [-r0 / 2, 0, 0]]; const W = [[0, 0, 0], [0, 0, 0]]; const V = [[0, uc, 0], [0, -uc, 0]];
  const H = assembleH(Y, q), G = flat(assembleG(Y, V, q)); const A = flat(Y).map((x) => -th2 * x);
  const residual = infNorm(matVec(H, A).map((x, i) => x - G[i])); const GInf = infNorm(G);
  const rec = { r0, thetaDot0: th, uc, ucFromThetaDot: th * r0 / 2, residualInf: residual, GInf, certified: residual <= 1e-12 * GInf };
  out.K3_pair_circle_r0_100 = rec;
  if (rec.certified) {
    const { J } = rotJacobianAD(Y, W, q, th);
    const fixedPoint = infNorm(rotField(Y, W, q, th));
    // relative / common transform (orthogonal): columns rel pos xyz, com pos xyz, rel vel xyz, com vel xyz
    const T = zeros(12); for (let part = 0; part < 2; part++) for (let a = 0; a < 3; a++) { const s = 1 / SQ2; T[6 * part + a][6 * part + a] = s; T[6 * part + 3 + a][6 * part + a] = -s; T[6 * part + a][6 * part + 3 + a] = s; T[6 * part + 3 + a][6 * part + 3 + a] = s; }
    const Jp = matMul(transpose(T), matMul(J, T)); const Jc = cfromReal(Jp);
    const idx = { relInPlane: [0, 1, 6, 7], relAxial: [2, 8], comInPlane: [3, 4, 9, 10], comAxial: [5, 11] };
    const leak = (() => { let L = 0; const all = Object.values(idx); for (const bi of all) for (const bj of all) if (bi !== bj) for (const i of bi) for (const j of bj) L = Math.max(L, Math.abs(Jp[i][j])); return L; })();
    const wr = Math.sqrt(16 / ((4 * r0 + 1) * (2 * r0 + 1) * (r0 + 1))) / th; // in units of thetaDot0
    const blocks = {}; for (const [name, ii] of Object.entries(idx)) blocks[name] = analyzeBlock(csubmat(Jc, ii));
    const kc = { fixedPointResidual: fixedPoint, offBlockLeakage: leak, normJ: matMaxAbs(Jp), omega_r_over_thetaDot_closed: wr, expected: { relInPlane: '{0,0,+-i w_r}', relAxial: '+-i', comInPlane: '+-i each double, Jordan size 2', comAxial: '{0,0} Jordan' } };
    for (const [name, b] of Object.entries(blocks)) kc[name] = { roots: b.roots, clusters: b.clusters.map((c) => ({ lambda: c.lambda, algebraic: c.algebraic, geometric: c.geometric, structure: c.structure, spread: c.spread })), charPoly: b.charPoly };
    // closed-form comparisons
    const relRoots = sortC(blocks.relInPlane.roots.map((z) => [Math.abs(z[0]), Math.abs(z[1])]));
    kc.relInPlane_maxAbsImag_vs_wr = Math.max(...blocks.relInPlane.roots.map((z) => C.abs(z))) - wr;
    kc.relInPlane_zeroCount = blocks.relInPlane.roots.filter((z) => C.abs(z) < 1e-5).length;
    kc.relAxial_absImag_minus_1 = blocks.relAxial.roots.map((z) => C.abs(z) - 1);
    const cp = blocks.comInPlane.charPoly; kc.comInPlane_charPoly_minus_expected = [C.sub(cp[0], [1, 0]), cp[1], C.sub(cp[2], [2, 0]), cp[3]].map(C.abs);
    kc.comInPlane_maxDistFrom_pm_i = Math.max(...blocks.comInPlane.roots.map((z) => Math.min(C.abs(C.sub(z, [0, 1])), C.abs(C.sub(z, [0, -1])))));
    kc.comAxial_maxAbs = Math.max(...blocks.comAxial.roots.map(C.abs));
    kc.maxRealPart_all = Math.max(...Object.values(blocks).flatMap((b) => b.roots.map((z) => Math.abs(z[0]))));
    // sqrt(delta) test: finite-difference Jacobians at several steps, common in-plane block split from +-i
    const sq = [];
    for (const h of [1e-2, 1e-3, 1e-4, 1e-5]) { // the first three are truncation-dominated (delta ~ h^2); 1e-5 shows the rounding floor and is excluded from the slope fit
      const Jfd = rotJacobianFD(Y, W, q, th, h, r0); const delta = matMaxAbs(matSub(Jfd, J));
      const Jpf = matMul(transpose(T), matMul(Jfd, T)); const roots = polyRoots(charPoly(csubmat(cfromReal(Jpf), idx.comInPlane)));
      const split = Math.max(...roots.map((z) => Math.min(C.abs(C.sub(z, [0, 1])), C.abs(C.sub(z, [0, -1])))));
      const maxRe = Math.max(...roots.map((z) => Math.abs(z[0])));
      sq.push({ h, delta, split, maxAbsRealPart: maxRe, ratio_split_over_sqrtDelta: split / Math.sqrt(delta), roots });
    }
    const fit = sq.slice(0, 3); const xs = fit.map((s) => Math.log(s.delta)), ys = fit.map((s) => Math.log(s.split)); const mx = xs.reduce((a, b) => a + b) / xs.length, my = ys.reduce((a, b) => a + b) / ys.length;
    const slope = xs.reduce((s, x, i) => s + (x - mx) * (ys[i] - my), 0) / xs.reduce((s, x) => s + (x - mx) ** 2, 0);
    kc.sqrtDeltaTest = { steps: sq, slopeFitSteps: [1e-2, 1e-3, 1e-4], logLogSlope: slope, pass: slope > 0.4 && slope < 0.6 && sq.every((s) => s.split <= 3 * Math.sqrt(s.delta)) };
    kc.pass = fixedPoint < 1e-12 && leak < 1e-12 && Math.abs(kc.relInPlane_maxAbsImag_vs_wr) < 1e-7 && kc.relInPlane_zeroCount === 2 && kc.relAxial_absImag_minus_1.every((x) => Math.abs(x) < 1e-7) && kc.comInPlane_charPoly_minus_expected.every((x) => x < 1e-10) && kc.comInPlane_maxDistFrom_pm_i < 1e-6 && kc.comAxial_maxAbs < 1e-6 && kc.maxRealPart_all < 1e-6 && kc.sqrtDeltaTest.pass && blocks.comInPlane.clusters.every((c) => c.algebraic !== 2 || c.geometric === 1);
    Object.assign(rec, kc); full.K3_pairJacobian = J;
  }
}
out.knownCasesPass = out.K1_assembly_vs_fd_LD_N4.pass && out.K2_dHdX_contracted_closedForm_vs_dual.pass && out.K3_pair_circle_r0_100.pass === true;

// ---------- ring target: recertify, then linearize ----------
const PHI0 = 0.37; const TAU_AD = 1e-6; // threshold on |Re lambda|/Omega for the exact-derivative Jacobian (justified in the ring file Section 10)
function labelMode(m, kind, cl) {
  const v = cl.eigvecAbs; const zero = C.abs(cl.lambda) < 1e-5; const atOmega = Math.abs(C.abs(cl.lambda) - 1) < 1e-5 && Math.abs(cl.lambda[0]) < 1e-5;
  if (kind === 'axial') {
    if (m === 0) return 'uniform axial displacement (m=0 axial, neutral drift)';
    if (m === 2) return 'alternating axial saddle (m=2 axial)';
    return atOmega ? 'tilt of the ring plane (m=1,3 axial, rotation symmetry, |lambda| = Omega)' : 'second axial m=1,3 mode (axial warp, not a symmetry)';
  }
  if (m === 0) return zero ? 'rigid-rotation phase / circular-family shift (m=0 tangential, neutral)' : 'breathing coupled to rotation-rate change (m=0 radial-tangential)';
  if (m === 2) return v[0] >= v[1] ? 'rhombic shear (m=2 radial-dominant)' : 'alternating twist (m=2 tangential-dominant)';
  return atOmega ? 'centre drift (m=1,3 in-plane: translation plus generalized-momentum partner, |lambda| = Omega)' : 'in-plane m=1,3 deformation (epicyclic / eccentric displacement of the ring)';
}
const ringRows = []; const ringFull = [];
for (const R of [50, 100, 200, 5, 20, 1]) {
  const row = { R, inDomain: R >= Rspeed01 && R >= Rweak, domainLabel: R >= Rspeed01 && R >= Rweak ? 'inside declared domain (speed <= 0.1, eps <= 0.05)' : 'OUTSIDE declared domain: adapted-law statement only' };
  const v2 = v2coupled(R); if (v2 <= 0) { row.note = 'no real Omega'; ringRows.push(row); continue; }
  const v = Math.sqrt(v2), Om = v / R; row.v = v; row.Omega = Om; row.period = 2 * Math.PI / Om; row.epsAdjacent = 1 / (R * SQ2); row.epsDiagonal = 1 / (2 * R);
  // 1. recertification of the state BEFORE any Jacobian
  const { X, V } = ringState(R, Om, PHI0); const H = assembleH(X, Q4), G = flat(assembleG(X, V, Q4)); const A = flat(X).map((x) => -Om * Om * x);
  row.recertification = { residualInf: infNorm(matVec(H, A).map((x, i) => x - G[i])), GInf: infNorm(G) };
  row.recertification.pass = row.recertification.residualInf <= 1e-12 * row.recertification.GInf;
  row.HpositiveDefinite = R > (2 + SQ2) / 4;
  if (!row.recertification.pass) { row.note = 'state NOT certified; no Jacobian formed'; ringRows.push(row); continue; }
  // 2. Jacobian (exact derivative) and its symmetry checks
  const W = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const { J } = rotJacobianAD(X, W, Q4, Om);
  row.fixedPointResidual = infNorm(rotField(X, W, Q4, Om));
  const S = shiftMatrix(PHI0), Rv = reversalMatrix(PHI0);
  row.shiftCommutator = matMaxAbs(matSub(matMul(S, J), matMul(J, S))) / matMaxAbs(J);
  row.reversibility_RvJRv_plus_J = matMaxAbs(matSub(matMul(Rv, matMul(J, Rv)), J.map((r) => r.map((x) => -x)))) / matMaxAbs(J);
  // 3. finite-difference verification (step study)
  row.fdStudy = []; const Jfds = {};
  for (const h of FD_STEPS) { const Jfd = rotJacobianFD(X, W, Q4, Om, h, R); Jfds[h] = Jfd; row.fdStudy.push({ h, delta_maxAbs_vs_exact: matMaxAbs(matSub(Jfd, J)) }); }
  for (let i = 1; i < FD_STEPS.length; i++) row.fdStudy[i].fdSelfDiff_vs_previousStep = matMaxAbs(matSub(Jfds[FD_STEPS[i]], Jfds[FD_STEPS[i - 1]]));
  row.deltaBest = Math.min(...row.fdStudy.map((s) => s.delta_maxAbs_vs_exact));
  // 4. sector blocks
  const sec = ringSectorBlocks(J, PHI0); row.leakage = { sector: sec.leakSector / sec.normJ, axialInPlane: sec.leakAxial / sec.normJ };
  row.sectors = []; const allRoots = [];
  for (const b of sec.blocks) {
    for (const kind of ['inPlane', 'axial']) {
      const an = analyzeBlock(b[kind]); const entry = { m: b.m, kind, charPoly: an.charPoly, exponents: an.roots, modes: an.clusters.map((c) => ({ lambda: c.lambda, algebraic: c.algebraic, geometric: c.geometric, structure: c.structure, spread: c.spread, eigvecAbs: c.eigvecAbs, label: labelMode(b.m, kind, c) })) };
      // finite-difference confirmation of each exponent at every step
      entry.fdExponents = {}; for (const h of FD_STEPS) { const sb = ringSectorBlocks(Jfds[h], PHI0).blocks[b.m][kind]; entry.fdExponents[h] = polyRoots(charPoly(sb)); }
      row.sectors.push(entry); allRoots.push(...an.roots.map((z) => ({ z, m: b.m, kind })));
    }
  }
  // 5. global checks: power sums against traces
  const tr = (M) => M.reduce((s, r, i) => s + r[i], 0); const J2 = matMul(J, J);
  row.powerSums = { sum_lambda_minus_trJ: allRoots.reduce((s, r) => s + r.z[0], 0) - tr(J), sum_lambda2_minus_trJ2: allRoots.reduce((s, r) => s + (r.z[0] * r.z[0] - r.z[1] * r.z[1]), 0) - tr(J2), sum_lambda4_minus_trJ4: allRoots.reduce((s, r) => { const z2 = C.mul(r.z, r.z); return s + C.mul(z2, z2)[0]; }, 0) - tr(matMul(J2, J2)) };
  // 6. counts and verdict
  const maxRe = Math.max(...allRoots.map((r) => r.z[0]));
  row.counts = { positiveRealAboveThreshold: allRoots.filter((r) => r.z[0] > TAU_AD).length, negativeRealBelowThreshold: allRoots.filter((r) => r.z[0] < -TAU_AD).length, zeroExponents: allRoots.filter((r) => C.abs(r.z) < 1e-5).length, purelyImaginaryNonzero: allRoots.filter((r) => Math.abs(r.z[0]) <= TAU_AD && C.abs(r.z) >= 1e-5).length, maxRealPart: maxRe, maxAbsRealPart_on_exact_symmetry_exponents: Math.max(...allRoots.filter((r) => C.abs(r.z) < 1e-5 || Math.abs(C.abs(r.z) - 1) < 1e-5).map((r) => Math.abs(r.z[0]))) };
  row.frequencies_over_Omega = [...new Set(allRoots.filter((r) => r.z[1] > 1e-5).map((r) => r.z[1].toPrecision(12)))].sort();
  const unstable = allRoots.filter((r) => r.z[0] > TAU_AD);
  if (unstable.length) {
    row.unstableModes = unstable.map((r) => { const sector = row.sectors.find((s) => s.m === r.m && s.kind === r.kind); const mode = sector.modes.find((c) => C.abs(C.sub(c.lambda, r.z)) < 1e-5); const fdConf = Object.entries(sector.fdExponents).map(([h, roots]) => { const d = row.fdStudy.find((s) => s.h === Number(h)).delta_maxAbs_vs_exact; const near = roots.reduce((b, z) => (C.abs(C.sub(z, r.z)) < C.abs(C.sub(b, r.z)) ? z : b)); return { h: Number(h), realPart: near[0], threshold_3sqrtDelta: 3 * Math.sqrt(d), confirmed: near[0] > 3 * Math.sqrt(d) }; }); return { m: r.m, kind: r.kind, lambda_over_Omega: r.z, growthRate_over_Omega: r.z[0], growthTime_in_rotationPeriods: 1 / (2 * Math.PI * r.z[0]), label: mode ? mode.label : '?', fdConfirmation: fdConf }; });
    row.verdict = `linearly unstable at R=${R} in mode ${row.unstableModes.map((u) => `${u.label} [m=${u.m}, ${u.kind}] (growth rate ${u.growthRate_over_Omega.toExponential(6)} Omega, e-folding ${u.growthTime_in_rotationPeriods.toPrecision(8)} rotation periods)`).join('; ')}`;
  } else {
    const neutral = row.sectors.flatMap((s) => s.modes.filter((c) => C.abs(c.lambda) < 1e-5).map((c) => `${c.label} (${c.structure})`));
    row.verdict = `spectrally stable at R=${R}: no exponent with real part above ${TAU_AD} Omega (max Re = ${maxRe.toExponential(3)} Omega); neutral directions: ${neutral.join('; ')}`;
  }
  ringRows.push(row); ringFull.push({ R, J, fd: Object.fromEntries(Object.entries(Jfds).map(([h, M]) => [h, M])) });
}
out.threshold = { tauAD_over_Omega: TAU_AD, fdThreshold: '3 sqrt(delta_h) per step', note: 'exact-derivative Jacobian: rounding ~1e-15 relative; a size-two Jordan block splits by ~sqrt(rounding) ~ 3e-8; symmetry exponents (0 and +-i Omega) are exact and their observed real parts bound the spurious part' };
out.ringPhi0 = PHI0; out.domain = { Rspeed01, Rweak };
out.ringRecertification = ringRows.map((r) => ({ R: r.R, inDomain: r.inDomain, v: r.v, Omega: r.Omega, residualInf: r.recertification?.residualInf, GInf: r.recertification?.GInf, pass: r.recertification?.pass, HpositiveDefinite: r.HpositiveDefinite }));
out.ringSpectra = ringRows.map((r) => ({ R: r.R, domainLabel: r.domainLabel, Omega: r.Omega, v: r.v, period: r.period, fixedPointResidual: r.fixedPointResidual, shiftCommutator: r.shiftCommutator, reversibility: r.reversibility_RvJRv_plus_J, fdStudy: r.fdStudy, leakage: r.leakage, powerSums: r.powerSums, counts: r.counts, frequencies_over_Omega: r.frequencies_over_Omega, sectors: r.sectors?.map((s) => ({ m: s.m, kind: s.kind, exponents: s.exponents, modes: s.modes.map((c) => ({ lambda: c.lambda, algebraic: c.algebraic, geometric: c.geometric, structure: c.structure, spread: c.spread, eigvecAbs: c.eigvecAbs, label: c.label })), fdExponentsBestStep: s.fdExponents[1e-5] })), unstableModes: r.unstableModes, verdict: r.verdict }));
// phase independence check at R = 100: sorted exponents at phi0 = 1.1 against phi0 = 0.37
{
  const R = 100; const v = Math.sqrt(v2coupled(R)), Om = v / R; const W = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const ex = (phi) => { const { X } = ringState(R, Om, phi); const { J } = rotJacobianAD(X, W, Q4, Om); const sec = ringSectorBlocks(J, phi); return sortC(sec.blocks.flatMap((b) => [...polyRoots(charPoly(b.inPlane)), ...polyRoots(charPoly(b.axial))])); };
  const a = ex(0.37), b = ex(1.1); out.phaseIndependence_R100 = { maxDiff: matchDist(a, b) };
}
// ---------- zero-coupling (inverse-square alternating square) closed-form limit spectra, derived in the ring file Section 10 ----------
// units of Omega; K-hat(m) symbols of the inverse-square acceleration gradient in local bases give, with Omega^2 R^3 = (2 sqrt2 - 1)/4:
//   m=0 in-plane {0,0,+-i}; m=0 axial {0,0}; m=1,3 in-plane {+-i double (Jordan)} and -+i +- sqrt((8+2 sqrt2)/7);
//   m=2 in-plane lambda^2 = (-1 +- sqrt(625 + 648 sqrt2)/7)/2 (one real pair, one imaginary pair); m=1,3 axial +-i (double in the limit); m=2 axial +-i sqrt((16+4 sqrt2)/7)
const ZC = (() => {
  const s = Math.sqrt(625 + 648 * SQ2) / 7; const g1 = Math.sqrt((8 + 2 * SQ2) / 7); const tw = Math.sqrt((s - 1) / 2), sh = Math.sqrt((s + 1) / 2); const az2 = Math.sqrt((16 + 4 * SQ2) / 7);
  return {
    m1_growthRate: g1, m2_twist_growthRate: tw, m2_shear_frequency: sh, m2_axial_frequency: az2, m0_breathing_frequency: 1, m13_axial_frequency: 1,
    all: [[0, 0], [0, 0], [0, 1], [0, -1], [0, 0], [0, 0], [0, 1], [0, 1], [g1, -1], [-g1, -1], [0, -1], [0, -1], [g1, 1], [-g1, 1], [0, 1], [0, -1], [0, 1], [0, -1], [tw, 0], [-tw, 0], [0, sh], [0, -sh], [0, az2], [0, -az2]],
  };
})();
out.zeroCouplingClosedFormLimit = { m1_growthRate_over_Omega: ZC.m1_growthRate, m2_twist_growthRate_over_Omega: ZC.m2_twist_growthRate, m2_shear_frequency_over_Omega: ZC.m2_shear_frequency, m2_axial_frequency_over_Omega: ZC.m2_axial_frequency };
// convergence of the coupled spectra to the zero-coupling limit (expected O(1/R))
out.coupledMinusZeroCouplingLimit = ringRows.filter((r) => r.sectors).map((r) => ({ R: r.R, maxMatchDistance: matchDist(r.sectors.flatMap((s) => s.exponents), ZC.all) }));
function matchDist(a, b) { return Math.max(...a.map((z) => Math.min(...b.map((w) => C.abs(C.sub(z, w)))))); }
// zero-coupling control: exponents in units of Omega must be R-independent (scale invariance of the inverse-square law)
{
  const rows = [];
  for (const R of [50, 120]) { // not a power-of-two ratio, so the scale check is a genuine floating-point check
    const v0 = Math.sqrt((2 * SQ2 - 1) / (4 * R)), Om = v0 / R; const { X, V } = ringState(R, Om, PHI0); const q = Q4;
    // build the zero-coupling rotating Jacobian by finite differences of the zero-coupling field (H = I, G = inverse-square gradient)
    const field0 = (Y, W) => { const Vv = Y.map((y, k) => add3(W[k], crossZ(Om, y))); const G0 = flat(assembleG(Y, Vv, q, 0)); const Wd = []; for (let k = 0; k < 4; k++) { const a = G0.slice(3 * k, 3 * k + 3); const c = crossZ(Om, W[k]); Wd.push([a[0] - 2 * c[0] + Om * Om * Y[k][0], a[1] - 2 * c[1] + Om * Om * Y[k][1], a[2] - 2 * c[2]]); } return flat(W).concat(flat(Wd)); };
    const H0 = assembleH(X, q, 0), G0 = flat(assembleG(X, V, q, 0)); const A0 = flat(X).map((x) => -Om * Om * x); const resid = infNorm(matVec(H0, A0).map((x, i) => x - G0[i]));
    const base = flat(X).concat(flat([[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]])); const J = zeros(24); const h = 1e-5;
    for (let p = 0; p < 24; p++) { const hp = p < 12 ? h * R : h * R * Om; const sp = base.slice(); sp[p] += hp; const sm = base.slice(); sm[p] -= hp; const up = (s) => [Array.from({ length: 4 }, (_, k) => s.slice(3 * k, 3 * k + 3)), Array.from({ length: 4 }, (_, k) => s.slice(12 + 3 * k, 12 + 3 * k + 3))]; const fp = field0(...up(sp)), fm = field0(...up(sm)); for (let i = 0; i < 24; i++) { const d = (fp[i] - fm[i]) / (2 * hp); J[i][p] = i < 12 ? d : (p < 12 ? d / (Om * Om) : d / Om); } }
    const sec = ringSectorBlocks(J, PHI0);
    rows.push({ R, residualInf: resid, sectors: sec.blocks.map((b) => ({ m: b.m, inPlane: polyRoots(charPoly(b.inPlane)), axial: polyRoots(charPoly(b.axial)) })) });
  }
  const flatten = (r) => sortC(r.sectors.flatMap((s) => [...s.inPlane, ...s.axial]));
  const a = flatten(rows[0]), b = flatten(rows[1]);
  out.zeroCouplingControl = { rows, maxDiff_R50_vs_R120_in_units_of_Omega: matchDist(a, b), maxDiff_vs_closedForm: matchDist(a, ZC.all), maxRealPart: Math.max(...a.map((z) => z[0])), closedFormMaxRealPart: ZC.m2_twist_growthRate, note: 'inverse-square alternating square (coupling deleted); exponents in units of Omega are scale-free; finite-difference Jacobian, step 1e-5 relative; closed forms in zeroCouplingClosedFormLimit' };
  out.zeroCouplingControl.pass = out.zeroCouplingControl.maxDiff_R50_vs_R120_in_units_of_Omega < 1e-4 && out.zeroCouplingControl.maxDiff_vs_closedForm < 1e-4;
}
out.utcEnd = new Date().toISOString(); full.utcEnd = out.utcEnd; full.rings = ringFull;

const here = dirname(fileURLToPath(import.meta.url));
writeFileSync(resolve(here, 'darwin-overnight-ring-spectrum-controls.json'), JSON.stringify(out, null, 1));
try { const dir = resolve(here, '../../../../../.local-data/master-equation-closure/darwin-overnight/ring-perturbation'); mkdirSync(dir, { recursive: true }); writeFileSync(resolve(dir, 'ring-spectrum-full.json'), JSON.stringify(full)); } catch (e) { /* bulky copy optional */ }

// console summary
console.log(`known cases pass: ${out.knownCasesPass}  (K1 ${out.K1_assembly_vs_fd_LD_N4.pass}, K2 ${out.K2_dHdX_contracted_closedForm_vs_dual.pass}, K3 ${out.K3_pair_circle_r0_100.pass})`);
const k3 = out.K3_pair_circle_r0_100; if (k3.sqrtDeltaTest) console.log(`K3 sqrt(delta) slope ${k3.sqrtDeltaTest.logLogSlope.toFixed(3)}; w_r match ${k3.relInPlane_maxAbsImag_vs_wr.toExponential(2)}; common in-plane dist from +-i ${k3.comInPlane_maxDistFrom_pm_i.toExponential(2)}; max |Re| ${k3.maxRealPart_all.toExponential(2)}`);
for (const r of out.ringSpectra) {
  console.log(`\nR=${r.R} ${r.domainLabel}; Omega=${r.Omega}; recert residual ${out.ringRecertification.find((x) => x.R === r.R).residualInf.toExponential(2)} / |G| ${out.ringRecertification.find((x) => x.R === r.R).GInf.toExponential(2)}`);
  if (!r.sectors) { console.log('  ' + (ringRows.find((x) => x.R === r.R).note || '')); continue; }
  console.log(`  fixed point ${r.fixedPointResidual.toExponential(2)}; shift commutator ${r.shiftCommutator.toExponential(2)}; reversibility ${r.reversibility.toExponential(2)}; leakage ${r.leakage.sector.toExponential(2)}/${r.leakage.axialInPlane.toExponential(2)}; delta(h): ${r.fdStudy.map((s) => `${s.h}:${s.delta_maxAbs_vs_exact.toExponential(2)}`).join(' ')}`);
  for (const s of r.sectors) console.log(`  m=${s.m} ${s.kind}: ${s.modes.map((c) => `${fmt(c.lambda)} x${c.algebraic} ${c.structure} [${c.label}]`).join(' | ')}`);
  console.log(`  counts ${JSON.stringify(r.counts)}`); console.log(`  VERDICT: ${r.verdict}`);
}
console.log(`\nphase independence R=100: ${out.phaseIndependence_R100.maxDiff.toExponential(2)}; zero-coupling scale check: ${out.zeroCouplingControl.maxDiff_R50_vs_R120_in_units_of_Omega.toExponential(2)}, vs closed form ${out.zeroCouplingControl.maxDiff_vs_closedForm.toExponential(2)}, max Re ${out.zeroCouplingControl.maxRealPart.toExponential(6)} (closed ${ZC.m2_twist_growthRate.toPrecision(12)}); m1 closed ${ZC.m1_growthRate.toPrecision(12)}`);
console.log(`coupled minus zero-coupling limit: ${out.coupledMinusZeroCouplingLimit.map((x) => `R=${x.R}:${x.maxMatchDistance.toExponential(3)}`).join(' ')}`);
for (const r of ringRows.filter((x) => x.unstableModes)) console.log(`R=${r.R} fd confirmation: ${r.unstableModes.map((u) => `${u.label.slice(0, 20)}: ${u.fdConfirmation.map((f) => `${f.h}:${f.realPart.toFixed(9)}>${f.threshold_3sqrtDelta.toExponential(1)}=${f.confirmed}`).join(',')}`).join(' | ')}`);
console.log(`utc ${T_START} .. ${out.utcEnd}`);
