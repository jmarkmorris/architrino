#!/usr/bin/env node
// darwin-overnight ring derivation (lens joseph-louis-lagrange), 2026-10-05.
// Four-member alternating ring under the frozen Darwin-inspired functional
// (Section 10 box: unit weights, inverse-distance pair term, velocity coupling
// 1/(2 c_f^2), c_f = K = 1, instantaneous support, no kinetic correction).
// Order of operations (binding evidence rule: known case before target):
//   0. Jacobi eigensolver known case: isolated pair Hessian at r = 3 against the
//      closed-form pair spectrum 1 +- 1/r, 1 +- 1/(2r).
//   1. General-N assembly (H blocks and G) verified for N = 4, alternating polarity,
//      by central finite differences of a DIRECT evaluation of L_D at random states.
//   2. Zero-coupling ring control (velocity term deleted): H = I, closed-form
//      v0^2 = (2 sqrt2 - 1)/(4R); residual of the rigid rotation must vanish.
//   3. Target: 12x12 Hessian spectrum vs closed forms, det H, condition number,
//      residual ||H A - G||_inf with A = -Omega^2 X at the derived balance
//      v^2 = 2(2 sqrt2 - 1)/(8R - 1 - sqrt2), several R inside and outside the domain.
// Run: node darwin-overnight-ring-balance.mjs  (prints JSON; writes a receipt copy to
// .local-data/master-equation-closure/darwin-overnight/ring/ if that directory exists).
// Derivation: ../../braid-program/analysis/darwin-overnight-ring.md. No ODE is integrated.

import { writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const SQ2 = Math.SQRT2;
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const scale = (s, a) => [s * a[0], s * a[1], s * a[2]];
const norm = (a) => Math.sqrt(dot(a, a));

// ---------- direct evaluation of L_D (the reference for the finite-difference check) ----------
// X, V: arrays of N 3-vectors; q: polarities (+1/-1); coupling: 1 keeps the velocity term, 0 deletes it.
function lagrangian(X, V, q, coupling = 1) {
  const N = X.length;
  let L = 0;
  for (let i = 0; i < N; i++) L += 0.5 * dot(V[i], V[i]);
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const sigma = q[i] * q[j];
      const d = sub(X[i], X[j]);
      const r = norm(d);
      const e = scale(1 / r, d);
      L -= sigma / r;
      if (coupling) L += (sigma / (2 * r)) * (dot(V[i], V[j]) + dot(V[i], e) * dot(V[j], e));
    }
  }
  return L;
}

// ---------- general-N closed-form assembly (my own, written for this script) ----------
function assembleH(X, q, coupling = 1) {
  const N = X.length;
  const H = Array.from({ length: 3 * N }, () => new Array(3 * N).fill(0));
  for (let i = 0; i < N; i++) for (let a = 0; a < 3; a++) H[3 * i + a][3 * i + a] = 1;
  if (!coupling) return H;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      const sigma = q[i] * q[j];
      const d = sub(X[i], X[j]);
      const r = norm(d);
      const e = scale(1 / r, d);
      const m = sigma / (2 * r);
      for (let a = 0; a < 3; a++) {
        for (let b = 0; b < 3; b++) {
          const val = m * ((a === b ? 1 : 0) + e[a] * e[b]);
          H[3 * i + a][3 * j + b] = val;
          H[3 * j + b][3 * i + a] = val;
        }
      }
    }
  }
  return H;
}

// G_i = dL/dX_i - sum_{j != i} Mdot_ij V_j, closed form (Section 1 of the investigation file).
function assembleG(X, V, q, coupling = 1) {
  const N = X.length;
  const G = Array.from({ length: N }, () => [0, 0, 0]);
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const sigma = q[i] * q[j];
      const d = sub(X[i], X[j]);
      const r = norm(d);
      const e = scale(1 / r, d);
      const Vi = V[i], Vj = V[j];
      const vie = dot(Vi, e), vje = dot(Vj, e);
      let g = [0, 0, 0];
      if (!coupling) {
        g = scale(sigma / (r * r), e);
      } else {
        const S = dot(Vi, Vj) + vie * vje;
        // position gradient
        for (let a = 0; a < 3; a++) {
          g[a] = (sigma / (r * r)) * ((1 - 0.5 * S) * e[a] + 0.5 * (vje * Vi[a] + vie * Vj[a] - 2 * vie * vje * e[a]));
        }
        // minus Mdot_ij V_j
        const dV = sub(Vi, Vj);
        const rdot = dot(e, dV);
        const w = sub(dV, scale(rdot, e));
        const u = Vj;
        const eu = dot(e, u), wu = dot(w, u);
        for (let a = 0; a < 3; a++) {
          const md = (sigma / (2 * r * r)) * (-rdot * (u[a] + eu * e[a]) + eu * w[a] + wu * e[a]);
          g[a] -= md;
        }
      }
      for (let a = 0; a < 3; a++) G[i][a] += g[a];
    }
  }
  return G;
}

// ---------- finite differences of L_D ----------
function cloneState(S) { return S.map((v) => v.slice()); }
function fdH(X, V, q, h = 1e-3) {
  const N = X.length, n = 3 * N;
  const H = Array.from({ length: n }, () => new Array(n).fill(0));
  const f = (dv) => {
    const W = cloneState(V);
    for (const [k, a, s] of dv) W[k][a] += s;
    return lagrangian(X, W, q);
  };
  for (let p = 0; p < n; p++) {
    for (let r = p; r < n; r++) {
      const kp = Math.floor(p / 3), ap = p % 3, kr = Math.floor(r / 3), ar = r % 3;
      let val;
      if (p === r) {
        val = (f([[kp, ap, h]]) - 2 * f([]) + f([[kp, ap, -h]])) / (h * h);
      } else {
        val = (f([[kp, ap, h], [kr, ar, h]]) - f([[kp, ap, h], [kr, ar, -h]]) - f([[kp, ap, -h], [kr, ar, h]]) + f([[kp, ap, -h], [kr, ar, -h]])) / (4 * h * h);
      }
      H[p][r] = val; H[r][p] = val;
    }
  }
  return H;
}
function fdG(X, V, q, h = 1e-4) {
  const N = X.length;
  const G = Array.from({ length: N }, () => [0, 0, 0]);
  const Lx = (k, a, s, W) => { const Y = cloneState(X); Y[k][a] += s; return lagrangian(Y, W ?? V, q); };
  for (let i = 0; i < N; i++) {
    for (let a = 0; a < 3; a++) {
      G[i][a] = (Lx(i, a, h) - Lx(i, a, -h)) / (2 * h);
      // mixed term: sum_k sum_b (d^2 L / dV_i^a dX_k^b) V_k^b
      for (let k = 0; k < N; k++) {
        for (let b = 0; b < 3; b++) {
          const Vp = cloneState(V); Vp[i][a] += h;
          const Vm = cloneState(V); Vm[i][a] -= h;
          const mixed = (Lx(k, b, h, Vp) - Lx(k, b, -h, Vp) - Lx(k, b, h, Vm) + Lx(k, b, -h, Vm)) / (4 * h * h);
          G[i][a] -= mixed * V[k][b];
        }
      }
    }
  }
  return G;
}

// ---------- linear algebra ----------
function matVec(H, v) { return H.map((row) => row.reduce((s, x, j) => s + x * v[j], 0)); }
function jacobiEigen(Ain) {
  const n = Ain.length;
  const A = Ain.map((r) => r.slice());
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let r = p + 1; r < n; r++) off += A[p][r] * A[p][r];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) {
      for (let r = p + 1; r < n; r++) {
        if (Math.abs(A[p][r]) < 1e-300) continue;
        const theta = (A[r][r] - A[p][p]) / (2 * A[p][r]);
        const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
        const c = 1 / Math.sqrt(t * t + 1), s = t * c;
        for (let k = 0; k < n; k++) {
          const akp = A[k][p], akr = A[k][r];
          A[k][p] = c * akp - s * akr; A[k][r] = s * akp + c * akr;
        }
        for (let k = 0; k < n; k++) {
          const apk = A[p][k], ark = A[r][k];
          A[p][k] = c * apk - s * ark; A[r][k] = s * apk + c * ark;
        }
      }
    }
  }
  return A.map((r, i) => r[i]).sort((a, b) => a - b);
}
function luDet(Ain) {
  const n = Ain.length; const A = Ain.map((r) => r.slice()); let det = 1;
  for (let k = 0; k < n; k++) {
    let piv = k;
    for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[piv][k])) piv = i;
    if (piv !== k) { [A[k], A[piv]] = [A[piv], A[k]]; det = -det; }
    if (A[k][k] === 0) return 0;
    det *= A[k][k];
    for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; for (let j = k; j < n; j++) A[i][j] -= f * A[k][j]; }
  }
  return det;
}
const maxAbsDiff = (A, B) => { let m = 0; A.forEach((row, i) => row.forEach((x, j) => { m = Math.max(m, Math.abs(x - B[i][j])); })); return m; };
const flat = (G) => G.flat();
const infNorm = (v) => v.reduce((m, x) => Math.max(m, Math.abs(x)), 0);

// deterministic pseudo-random (LCG) so the receipt is reproducible
let seed = 20261005;
const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 - 0.5; };

// ---------- ring geometry ----------
const Q = [1, -1, 1, -1];
function ringState(R, Omega, phi0) {
  const X = [], V = [];
  for (let k = 0; k < 4; k++) {
    const ph = phi0 + k * Math.PI / 2;
    X.push([R * Math.cos(ph), R * Math.sin(ph), 0]);
    V.push([-R * Omega * Math.sin(ph), R * Omega * Math.cos(ph), 0]);
  }
  return { X, V };
}
// closed-form 12 eigenvalues (derivation Section 2 of the ring file)
function ringSpectrumClosed(R) {
  const s73 = Math.sqrt(73);
  return [
    1 - (2 - SQ2) / (4 * R),        // m=0 radial (breathing)
    1 - (1 + SQ2) / (4 * R),        // m=0 tangential (rigid rotation)
    1 - (2 + SQ2) / (4 * R),        // m=2 radial (rhombic shear)
    1 + (SQ2 - 1) / (4 * R),        // m=2 tangential
    1 - (s73 - 3) / (8 * R), 1 - (s73 - 3) / (8 * R),   // m=1,3 lower
    1 + (s73 + 3) / (8 * R), 1 + (s73 + 3) / (8 * R),   // m=1,3 upper
    1 - (2 * SQ2 - 1) / (4 * R),    // z, m=0 (uniform axial)
    1 - 1 / (4 * R), 1 - 1 / (4 * R), // z, m=1,3 (tilt)
    1 + (2 * SQ2 + 1) / (4 * R),    // z, m=2 (alternating axial)
  ].sort((a, b) => a - b);
}
const singularRadii = {
  'in-plane m=0 radial (breathing)': (2 - SQ2) / 4,
  'axial m=1,3 (tilt, double)': 0.25,
  'axial m=0 (uniform axial)': (2 * SQ2 - 1) / 4,
  'in-plane m=0 tangential (rigid rotation)': (1 + SQ2) / 4,
  'in-plane m=1,3 lower (double)': (Math.sqrt(73) - 3) / 8,
  'in-plane m=2 radial (rhombic shear)': (2 + SQ2) / 4,
};
const Rbalance = (1 + SQ2) / 8;                   // real Omega exists iff R > Rbalance
const v2coupled = (R) => 2 * (2 * SQ2 - 1) / (8 * R - 1 - SQ2);
const v2zero = (R) => (2 * SQ2 - 1) / (4 * R);
const Rspeed01 = (2 * (2 * SQ2 - 1) / 0.01 + 1 + SQ2) / 8;  // v = 0.1 boundary
const Rweak = 1 / (0.05 * SQ2);                              // K/(R sqrt2) = 0.05 boundary

function ringInvariants(R, v) {
  const lam2 = 1 - (1 + SQ2) / (4 * R);
  return {
    E: 2 * v * v + (1 - 2 * SQ2) / R - (1 + SQ2) * v * v / (2 * R),
    P: [0, 0, 0],
    Jz: 4 * R * v * lam2,
    pTangentialPerMember: v * lam2,
  };
}
function invariantsDirect(X, V, q) {
  const H = assembleH(X, q);
  const p = matVec(H, flat(V));
  const N = X.length;
  let E = 0; const P = [0, 0, 0]; const J = [0, 0, 0];
  for (let i = 0; i < N; i++) {
    const pi = p.slice(3 * i, 3 * i + 3);
    for (let a = 0; a < 3; a++) { E += pi[a] * V[i][a]; P[a] += pi[a]; }
    J[0] += X[i][1] * pi[2] - X[i][2] * pi[1];
    J[1] += X[i][2] * pi[0] - X[i][0] * pi[2];
    J[2] += X[i][0] * pi[1] - X[i][1] * pi[0];
  }
  E -= lagrangian(X, V, q);
  return { E, P, J };
}

// ================= run =================
const out = { script: 'darwin-overnight-ring-balance.mjs', utc: new Date().toISOString(), law: 'Section 10 box, K=1, c_f=1, instantaneous, no kinetic correction', polarities: Q };

// 0. Jacobi known case: isolated pair at r = 3, sigma = -1 (opposite) and +1 (same)
{
  const res = {};
  for (const sigma of [-1, 1]) {
    const q = [1, sigma];
    const X = [[0.3, -0.2, 0.1], [0.3 + 3 * 0.6, -0.2 + 3 * 0.8, 0.1]]; // r = 3 along a non-axis direction
    const H = assembleH(X, q);
    const eig = jacobiEigen(H);
    const r = 3;
    const closed = [1 + sigma / r, 1 + sigma / (2 * r), 1 + sigma / (2 * r), 1 - sigma / r, 1 - sigma / (2 * r), 1 - sigma / (2 * r)].sort((a, b) => a - b);
    res[sigma === -1 ? 'opposite' : 'same'] = { eig, closed, maxAbsDiff: Math.max(...eig.map((x, i) => Math.abs(x - closed[i]))) };
  }
  out.step0_jacobiKnownCase_pair_r3 = res;
  out.step0_pass = Object.values(res).every((x) => x.maxAbsDiff < 1e-12);
}

// 1. finite-difference verification of the general-N assembly for N = 4 (alternating polarity)
{
  const trials = [];
  let worstH = 0, worstG = 0;
  for (let t = 0; t < 3; t++) {
    const X = Array.from({ length: 4 }, () => [4 * rnd(), 4 * rnd(), 4 * rnd()]);
    // keep pairs apart (r >= ~1) by pushing members to distinct corners plus noise
    X[0][0] += 2; X[1][1] += 2; X[2][0] -= 2; X[3][1] -= 2;
    const V = Array.from({ length: 4 }, () => [0.6 * rnd(), 0.6 * rnd(), 0.6 * rnd()]);
    const dH = maxAbsDiff(assembleH(X, Q), fdH(X, V, Q));
    const dG = infNorm(flat(assembleG(X, V, Q)).map((x, i) => x - flat(fdG(X, V, Q))[i]));
    let rmin = Infinity; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) rmin = Math.min(rmin, norm(sub(X[i], X[j])));
    trials.push({ rmin, maxAbsDiffH: dH, maxAbsDiffG: dG });
    worstH = Math.max(worstH, dH); worstG = Math.max(worstG, dG);
  }
  // also a ring state itself (generic phase, inside the domain), coupled and zero-coupling
  const { X, V } = ringState(50, Math.sqrt(v2coupled(50)) / 50, 0.37);
  const dH = maxAbsDiff(assembleH(X, Q), fdH(X, V, Q));
  const dG = infNorm(flat(assembleG(X, V, Q)).map((x, i) => x - flat(fdG(X, V, Q))[i]));
  trials.push({ state: 'ring R=50 phi0=0.37', maxAbsDiffH: dH, maxAbsDiffG: dG });
  worstH = Math.max(worstH, dH); worstG = Math.max(worstG, dG);
  out.step1_fdVerification_N4 = { trials, worstH, worstG, tolerance: 1e-6, pass: worstH < 1e-6 && worstG < 1e-6 };
}

// 2. zero-coupling control: H = I, G = inverse-square gradient, closed-form v0^2 = (2 sqrt2 - 1)/(4R)
{
  const rows = [];
  for (const R of [20, 50, 100]) {
    const Omega = Math.sqrt(v2zero(R)) / R;
    const { X, V } = ringState(R, Omega, 0.37);
    const H = assembleH(X, Q, 0), G = flat(assembleG(X, V, Q, 0));
    const A = flat(X).map((x) => -Omega * Omega * x);
    rows.push({ R, v: R * Omega, residualInf: infNorm(matVec(H, A).map((x, i) => x - G[i])) });
  }
  out.step2_zeroCouplingControl = { rows, pass: rows.every((r) => r.residualInf < 1e-13) };
}

// 3. target: spectrum, det, condition number, balance residual
{
  const spectrumRows = [];
  for (const R of [0.2, 0.5, 0.75, 1, 2, 10, 50]) {
    const { X } = ringState(R, 0, 0.37);
    const H = assembleH(X, Q);
    const eig = jacobiEigen(H), closed = ringSpectrumClosed(R);
    spectrumRows.push({ R, eigJacobi: eig, eigClosed: closed, maxAbsDiff: Math.max(...eig.map((x, i) => Math.abs(x - closed[i]))), detLU: luDet(H), detClosedProduct: closed.reduce((p, x) => p * x, 1), negativeCount: eig.filter((x) => x < 0).length });
  }
  out.step3_spectrum = { rows: spectrumRows, singularRadii, positiveDefiniteFor: `R > ${(2 + SQ2) / 4}`, pass: spectrumRows.every((r) => r.maxAbsDiff < 1e-12) };

  const balanceRows = [];
  for (const R of [0.5, 1, 5, 20, 46.012, 50, 100, 1000]) {
    const v2 = v2coupled(R);
    const row = { R, v2closed: v2, inDomain_speedLe0p1_and_weakLe0p05: R >= Rspeed01 && R >= Rweak };
    if (v2 <= 0) { row.note = 'no real Omega (R <= (1+sqrt2)/8)'; balanceRows.push(row); continue; }
    const v = Math.sqrt(v2), Omega = v / R;
    const { X, V } = ringState(R, Omega, 0.37);
    const H = assembleH(X, Q), G = flat(assembleG(X, V, Q));
    const A = flat(X).map((x) => -Omega * Omega * x);
    const HA = matVec(H, A);
    const eig = jacobiEigen(H);
    const absEig = eig.map(Math.abs);
    row.v = v; row.Omega = Omega; row.v0_zeroCoupling = Math.sqrt(v2zero(R));
    row.residualInf = infNorm(HA.map((x, i) => x - G[i]));
    row.GInf = infNorm(G);
    row.detH_LU = luDet(H);
    row.condH = Math.max(...absEig) / Math.min(...absEig);
    row.minEig = eig[0];
    row.epsAdjacent = 1 / (R * SQ2); row.epsDiagonal = 1 / (2 * R);
    // tangential component of G per member (should vanish) and radial component
    const gt = [], gr = [];
    for (let k = 0; k < 4; k++) {
      const rk = scale(1 / R, X[k]); const tk = [-rk[1], rk[0], 0];
      const Gk = G.slice(3 * k, 3 * k + 3);
      gr.push(dot(Gk, rk)); gt.push(dot(Gk, tk));
    }
    row.G_radial_members = gr; row.G_tangential_members = gt;
    row.G_radial_closed = -(2 * SQ2 - 1) / (4 * R * R) - 3 * (SQ2 - 1) * v2 / (8 * R * R);
    const invC = ringInvariants(R, v), invD = invariantsDirect(X, V, Q);
    row.invariants = { closed: invC, direct: invD, dE: Math.abs(invC.E - invD.E), dJz: Math.abs(invC.Jz - invD.J[2]), PInf: infNorm(invD.P) };
    balanceRows.push(row);
  }
  out.step4_balance = {
    relation: 'v^2 (R - (1+sqrt2)/8) = (2 sqrt2 - 1)/4, i.e. v^2 = 2(2 sqrt2 - 1)/(8R - 1 - sqrt2); zero coupling v0^2 = (2 sqrt2 - 1)/(4R)',
    RbalanceThreshold: Rbalance, Rspeed01, Rweak, domainR: `R >= ${Rspeed01} (speed binds; weak bound R >= ${Rweak} is implied)`,
    rows: balanceRows,
    pass: balanceRows.filter((r) => r.v !== undefined).every((r) => r.residualInf < 1e-12 * Math.max(1, r.GInf) + 1e-15),
  };
}

const json = JSON.stringify(out, null, 1);
console.log(json);
try {
  const here = dirname(fileURLToPath(import.meta.url));
  const dir = resolve(here, '../../../../../.local-data/master-equation-closure/darwin-overnight/ring');
  if (existsSync(dir)) writeFileSync(resolve(dir, 'ring-balance-receipt.json'), json);
} catch (e) { /* receipt copy is optional */ }
