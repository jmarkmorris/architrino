#!/usr/bin/env node
// darwin-overnight ring reference instrument (lens: ramon-e-moore). BLIND reference for the
// four-member alternating ring under the frozen Darwin-inspired law (Section 10 functional,
// unit weights, inverse-distance pair term, velocity coupling 1/(2 c_f^2), c_f = K = 1,
// instantaneous, no kinetic correction, implicit Euler-Lagrange solve with the full 3N x 3N
// velocity Hessian).
//
// Route. A general-N Cartesian assembly of L_D, of its velocity Hessian H, of dL/dX and of the
// mixed term sum_j (dM_ij/dT) V_j is written from the functional itself (no pair formula is
// reused). The ring is then analysed in symmetry-adapted coordinates: the cyclic shift k -> k+1
// composed with the rotation by pi/2 about z commutes with H, so H splits into four sectors
// m = 0..3 (phase i^m per shift), each sector into an axial scalar and an in-plane 2 x 2 block.
// The closed forms below were derived by hand from that symbol; this script checks them
// against the Cartesian assembly, which is itself checked against central differences of a
// direct evaluation of L_D before any ring quantity is printed (instrument order rule).
//
// Known cases, run and recorded FIRST:
//   K1  H, dL/dX against central finite differences of L_D at random N=4 3-D states (both
//       with and without coupling); the mixed term against the T-derivative of p = H V along a
//       straight-line displacement of the state.
//   K2  the N=2 pair spectrum {1 +- 1/r, 1 +- 1/(2r) (x2)} recovered from the same assembly.
//   K3  the zero-coupling ring (velocity coupling deleted, inverse-distance term kept) against
//       the elementary inverse-square closed form v0^2 = (2 sqrt2 - 1)/(4R).
// Then the targets: closed-form spectrum vs Jacobi eigensolve; singular radii; balance speed
// v(R) with inertial and rotating-frame residuals; E, P, J_z; and (item 5) the 24 exponents of
// the rotating-frame linearization about the balanced ring at R in {50,100,200}.
//
// Usage: node darwin-overnight-ring-reference.mjs
// Writes: darwin-overnight-ring-reference-controls.json (compact receipt) next to this file and
//         bulky matrices under .local-data/master-equation-closure/darwin-overnight/ring-reference/.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'darwin-overnight-ring-reference-controls.json');
const RUNTIME_DIR = join(HERE, '..', '..', '..', '..', '..', '.local-data', 'master-equation-closure', 'darwin-overnight', 'ring-reference');
mkdirSync(RUNTIME_DIR, { recursive: true });

const SQ2 = Math.SQRT2, SQ73 = Math.sqrt(73);
const SPEED_BOUND = 0.1, EPS_BOUND = 0.05;   // provisional declared-domain bounds (common brief Section 2)
const PHI0 = 0.37;                           // generic phase (radians) for every Cartesian evaluation
const t0 = new Date().toISOString();
const receipt = { instrument: 'darwin-overnight-ring-reference.mjs', lens: 'ramon-e-moore', utcStart: t0,
  law: 'Section 10 functional, K=1, c_f=1, unit weights, coupling 1/(2 c_f^2), instantaneous, no kinetic correction',
  genericPhaseRad: PHI0, knownCaseFirst: {}, targets: {} };
const bulky = {};
let allPass = true;
const log = (...a) => console.log(...a);
const f12 = (x) => Number.isFinite(x) ? x.toPrecision(13) : String(x);
function check(name, ok, detail) { allPass = allPass && ok; log(`${ok ? 'PASS' : 'FAIL'}  ${name}  ${detail ?? ''}`); return ok; }

// ------------------------------------------------------------------ linear algebra (real)
const zeros = (n) => new Float64Array(n);
const mat = (n, m = n) => Array.from({ length: n }, () => new Float64Array(m));
function eye(n) { const A = mat(n); for (let i = 0; i < n; i++) A[i][i] = 1; return A; }
function matVec(A, x) { const n = A.length, y = zeros(n); for (let i = 0; i < n; i++) { let s = 0; for (let j = 0; j < x.length; j++) s += A[i][j] * x[j]; y[i] = s; } return y; }
function normInf(x) { let m = 0; for (const v of x) m = Math.max(m, Math.abs(v)); return m; }
// Gaussian elimination with partial pivoting: returns {x, det}
function solve(A0, b0) {
  const n = A0.length, A = A0.map((r) => Float64Array.from(r)), b = Float64Array.from(b0); let det = 1;
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; const t = b[p]; b[p] = b[c]; b[c] = t; det = -det; }
    const piv = A[c][c]; det *= piv; if (piv === 0) return { x: null, det: 0 };
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / piv; if (f === 0) continue; for (let k = c; k < n; k++) A[r][k] -= f * A[c][k]; b[r] -= f * b[c]; }
  }
  const x = zeros(n); for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let k = i + 1; k < n; k++) s -= A[i][k] * x[k]; x[i] = s / A[i][i]; }
  return { x, det };
}
// Cyclic Jacobi eigensolver for a real symmetric matrix: eigenvalues ascending, eigenvectors as columns
function symEig(A0) {
  const n = A0.length, A = A0.map((r) => Float64Array.from(r)), V = eye(n);
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += A[i][j] * A[i][j];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; }
      for (let k = 0; k < n; k++) { const vkp = V[k][p], vkq = V[k][q]; V[k][p] = c * vkp - s * vkq; V[k][q] = s * vkp + c * vkq; }
    }
  }
  const idx = [...Array(n).keys()].sort((a, b) => A[a][a] - A[b][b]);
  return { values: idx.map((i) => A[i][i]), vectors: idx.map((i) => Float64Array.from({ length: n }, (_, k) => V[k][i])) };
}

// ------------------------------------------------------------------ complex helpers
const C = (re, im = 0) => [re, im];
const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]], csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
const cdiv = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
const cabs = (a) => Math.hypot(a[0], a[1]), cconj = (a) => [a[0], -a[1]];
function csqrt(a) { const r = cabs(a); const re = Math.sqrt((r + a[0]) / 2), im = Math.sign(a[1] || 1) * Math.sqrt(Math.max(0, (r - a[0]) / 2)); return [re, im]; }
const cfmt = (z) => `${z[0] >= 0 ? '+' : ''}${z[0].toExponential(10)} ${z[1] >= 0 ? '+' : '-'} ${Math.abs(z[1]).toExponential(10)}i`;

// ------------------------------------------------------------------ the frozen functional, general N
// X, V: Float64Array(3N); q: polarities (+-1); coupling: 1 (frozen law) or 0 (zero-coupling control)
function LD(X, V, q, coupling) {
  const N = q.length; let L = 0;
  for (let i = 0; i < N; i++) L += 0.5 * (V[3 * i] ** 2 + V[3 * i + 1] ** 2 + V[3 * i + 2] ** 2);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const s = q[i] * q[j];
    const d = [X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]];
    const r = Math.hypot(...d); const e = d.map((x) => x / r);
    L -= s / r;
    if (coupling) {
      let vv = 0, a = 0, b = 0;
      for (let c = 0; c < 3; c++) { vv += V[3 * i + c] * V[3 * j + c]; a += V[3 * i + c] * e[c]; b += V[3 * j + c] * e[c]; }
      L += coupling * s / (2 * r) * (vv + a * b);
    }
  }
  return L;
}
// Assembly of H (velocity Hessian), dL/dX, and the mixed term MdotV_i = sum_j (dM_ij/dT) V_j, where
// dM_ij/dT uses the relative velocity Wrel_i - Wrel_j of the separation vector (Wrel defaults to V).
function assemble(X, V, q, coupling, Wrel = V) {
  const N = q.length, n = 3 * N; const H = eye(n), dLdX = zeros(n), MdotV = zeros(n); const pairs = []; let Lpos = 0;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const s = q[i] * q[j];
    const d = [X[3 * i] - X[3 * j], X[3 * i + 1] - X[3 * j + 1], X[3 * i + 2] - X[3 * j + 2]];
    const r = Math.hypot(...d), r2 = r * r; const e = d.map((x) => x / r);
    pairs.push({ i, j, r, sigma: s }); Lpos += s / r;
    for (let c = 0; c < 3; c++) { dLdX[3 * i + c] += s * e[c] / r2; dLdX[3 * j + c] -= s * e[c] / r2; }
    if (!coupling) continue;
    const c0 = coupling * s / (2 * r);
    const Vi = [V[3 * i], V[3 * i + 1], V[3 * i + 2]], Vj = [V[3 * j], V[3 * j + 1], V[3 * j + 2]];
    let a = 0, b = 0, vv = 0; for (let c = 0; c < 3; c++) { a += Vi[c] * e[c]; b += Vj[c] * e[c]; vv += Vi[c] * Vj[c]; }
    for (let p = 0; p < 3; p++) for (let u = 0; u < 3; u++) { const m = c0 * ((p === u ? 1 : 0) + e[p] * e[u]); H[3 * i + p][3 * j + u] += m; H[3 * j + u][3 * i + p] += m; }
    for (let c = 0; c < 3; c++) {
      const PVi = Vi[c] - a * e[c], PVj = Vj[c] - b * e[c];
      const g = (coupling * s / 2) * (-(e[c] / r2) * (vv + a * b) + (b * PVi + a * PVj) / r2);
      dLdX[3 * i + c] += g; dLdX[3 * j + c] -= g;
    }
    const dw = [Wrel[3 * i] - Wrel[3 * j], Wrel[3 * i + 1] - Wrel[3 * j + 1], Wrel[3 * i + 2] - Wrel[3 * j + 2]];
    let rdot = 0; for (let c = 0; c < 3; c++) rdot += dw[c] * e[c];
    const edot = dw.map((x, c) => (x - rdot * e[c]) / r);
    let edVj = 0, edVi = 0; for (let c = 0; c < 3; c++) { edVj += edot[c] * Vj[c]; edVi += edot[c] * Vi[c]; }
    for (let c = 0; c < 3; c++) {
      MdotV[3 * i + c] += (coupling * s / 2) * (-(rdot / r2) * (Vj[c] + b * e[c]) + (edot[c] * b + e[c] * edVj) / r);
      MdotV[3 * j + c] += (coupling * s / 2) * (-(rdot / r2) * (Vi[c] + a * e[c]) + (edot[c] * a + e[c] * edVi) / r);
    }
  }
  return { H, dLdX, MdotV, pairs, Lpos };
}
// Right-hand side of the implicit acceleration equations H A = G in the inertial frame.
const Gvec = (asm) => asm.dLdX.map((g, i) => g - asm.MdotV[i]);
// Invariants of the adapted law (not physical accounts): E = (1/2) V^T H V + sum sigma/r; P = sum p_i; J = sum X_i x p_i.
function invariants(X, V, asm) {
  const p = matVec(asm.H, V); const N = X.length / 3; let E = 0.5 * V.reduce((s, v, i) => s + v * p[i], 0) + asm.Lpos;
  const P = [0, 0, 0], J = [0, 0, 0];
  for (let k = 0; k < N; k++) { const x = X.subarray(3 * k, 3 * k + 3), pk = p.subarray(3 * k, 3 * k + 3);
    for (let c = 0; c < 3; c++) P[c] += pk[c];
    J[0] += x[1] * pk[2] - x[2] * pk[1]; J[1] += x[2] * pk[0] - x[0] * pk[2]; J[2] += x[0] * pk[1] - x[1] * pk[0]; }
  return { E, P, J, p };
}

// ------------------------------------------------------------------ deterministic pseudo-random states
let seed = 20261005;
function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 - 0.5; }
const RING_Q = [1, -1, 1, -1];

// ================================================================== K1: assembly against finite differences of L_D
log('=== Known case K1: Cartesian assembly against central differences of L_D (random N=4 states) ===');
{
  const results = []; let worstH = 0, worstG = 0, worstM = 0;
  for (let trial = 0; trial < 6; trial++) {
    const coupling = trial < 4 ? 1 : 0;
    const X = Float64Array.from({ length: 12 }, () => 3 * rnd()), V = Float64Array.from({ length: 12 }, () => 0.6 * rnd());
    const asm = assemble(X, V, RING_Q, coupling);
    // (a) Hessian: L_D is exactly quadratic in V, so the second central difference is exact up to roundoff.
    const h = 0.05; let errH = 0;
    for (let a = 0; a < 12; a++) for (let b = 0; b < 12; b++) {
      const f = (sa, sb) => { const W = Float64Array.from(V); W[a] += sa * h; W[b] += sb * h; return LD(X, W, RING_Q, coupling); };
      const fd = (f(1, 1) - f(1, -1) - f(-1, 1) + f(-1, -1)) / (4 * h * h);
      errH = Math.max(errH, Math.abs(fd - asm.H[a][b]));
    }
    // (b) dL/dX: fourth-order central difference, step scaled to the smallest pair separation (truncation control).
    const rmin = Math.min(...asm.pairs.map((p) => p.r)); const hx = 1e-3 * rmin; let errG = 0;
    for (let a = 0; a < 12; a++) {
      const f = (s) => { const Y = Float64Array.from(X); Y[a] += s * hx; return LD(Y, V, RING_Q, coupling); };
      const fd = (-f(2) + 8 * f(1) - 8 * f(-1) + f(-2)) / (12 * hx);
      errG = Math.max(errG, Math.abs(fd - asm.dLdX[a]));
    }
    // (c) mixed term: d/dT [H(X + T V) V] at T = 0 equals sum_j (dM_ij/dT) V_j.
    const ht = 1e-3 * rmin / Math.max(1e-9, normInf(V)); let errM = 0;
    { const pAt = (s) => { const Y = X.map((x, i) => x + s * ht * V[i]); return matVec(assemble(Y, V, RING_Q, coupling).H, V); };
      const p2 = pAt(2), p1 = pAt(1), m1 = pAt(-1), m2 = pAt(-2);
      for (let a = 0; a < 12; a++) { const fd = (-p2[a] + 8 * p1[a] - 8 * m1[a] + m2[a]) / (12 * ht); errM = Math.max(errM, Math.abs(fd - asm.MdotV[a])); } }
    results.push({ trial, coupling, maxAbsErrH: errH, maxAbsErrDLdX: errG, maxAbsErrMixed: errM });
    worstH = Math.max(worstH, errH); worstG = Math.max(worstG, errG); worstM = Math.max(worstM, errM);
  }
  const ok = check('K1 Hessian vs FD(L_D)', worstH < 1e-10, `max abs err ${worstH.toExponential(3)}`)
    & check('K1 dL/dX vs FD(L_D)', worstG < 1e-8, `max abs err ${worstG.toExponential(3)}`)
    & check('K1 mixed term vs d/dT[H V]', worstM < 1e-8, `max abs err ${worstM.toExponential(3)}`);
  receipt.knownCaseFirst.K1_assemblyVsFiniteDifferences = { pass: !!ok, trials: results, tolerances: { H: 1e-10, dLdX: 1e-8, mixed: 1e-8 } };
}

// ================================================================== K2: pair spectrum from the same assembly at N=2
log('=== Known case K2: N=2 pair Hessian spectrum from the same assembly ===');
{
  const rows = []; let worst = 0;
  for (const sigma of [-1, 1]) for (const r of [0.3, 0.5, 0.75, 1, 2, 10]) {
    const dir = [0.3, -0.5, 0.81]; const nd = Math.hypot(...dir); const e = dir.map((x) => x / nd);
    const X = Float64Array.from([...e.map((x) => 0.5 * r * x), ...e.map((x) => -0.5 * r * x)]);
    const asm = assemble(X, zeros(6), [1, sigma], 1);
    const num = symEig(asm.H).values;
    const closed = [1 + sigma / r, 1 + sigma / (2 * r), 1 + sigma / (2 * r), 1 - sigma / r, 1 - sigma / (2 * r), 1 - sigma / (2 * r)].sort((a, b) => a - b);
    let err = 0; for (let i = 0; i < 6; i++) err = Math.max(err, Math.abs(num[i] - closed[i]));
    worst = Math.max(worst, err); rows.push({ sigma, r, maxAbsErr: err });
  }
  const ok = check('K2 pair spectrum {1 +- 1/r, 1 +- 1/(2r) x2}', worst < 1e-12, `max abs err ${worst.toExponential(3)}`);
  receipt.knownCaseFirst.K2_pairSpectrumN2 = { pass: ok, rows, tolerance: 1e-12 };
}

// ------------------------------------------------------------------ ring state builder
function ringState(R, v, phi0 = PHI0) {
  const X = zeros(12), V = zeros(12), A = zeros(12), nvec = [], tvec = [];
  for (let k = 0; k < 4; k++) {
    const ph = phi0 + k * Math.PI / 2, n = [Math.cos(ph), Math.sin(ph), 0], t = [-Math.sin(ph), Math.cos(ph), 0];
    nvec.push(n); tvec.push(t);
    for (let c = 0; c < 3; c++) { X[3 * k + c] = R * n[c]; V[3 * k + c] = v * t[c]; A[3 * k + c] = -(v * v / R) * n[c]; }
  }
  return { X, V, A, nvec, tvec };
}
// Decompose a 12-vector into radial/tangential/axial components per member and the C4 sector weights.
function ringComponents(vec, st) {
  const comp = []; for (let k = 0; k < 4; k++) { let rn = 0, rt = 0; for (let c = 0; c < 3; c++) { rn += vec[3 * k + c] * st.nvec[k][c]; rt += vec[3 * k + c] * st.tvec[k][c]; } comp.push({ n: rn, t: rt, z: vec[3 * k + 2] }); }
  return comp;
}

// ================================================================== K3: zero-coupling ring against the inverse-square closed form
log('=== Known case K3: zero-coupling ring (coupling deleted, inverse-distance kept) vs v0^2 = (2 sqrt2 - 1)/(4R) ===');
{
  const rows = []; let worst = 0;
  for (const R of [0.5, 1, 5, 50, 1000]) {
    const v0 = Math.sqrt((2 * SQ2 - 1) / (4 * R));
    const st = ringState(R, v0); const asm = assemble(st.X, st.V, RING_Q, 0); const G = Gvec(asm);
    const res = normInf(matVec(asm.H, st.A).map((x, i) => x - G[i]));
    // also: the balance speed found by direct solve (radial component of A = H^{-1} G) must equal v0 (G is velocity independent here)
    const Acomp = ringComponents(solve(asm.H, G).x, st); const vSolved = Math.sqrt(-R * Acomp[0].n);
    const err = Math.max(res / normInf(G), Math.abs(vSolved - v0) / v0);
    worst = Math.max(worst, err); rows.push({ R, v0, residualInf: res, Ginf: normInf(G), vSolved });
  }
  const ok = check('K3 zero-coupling ring balance', worst < 1e-12, `max rel err ${worst.toExponential(3)}`);
  receipt.knownCaseFirst.K3_zeroCouplingRing = { pass: ok, closedForm: 'v0^2 = (2*sqrt(2)-1)/(4R), Omega0^2 = (2*sqrt(2)-1)/(4R^3)', rows, tolerance: 1e-12 };
}

if (!allPass) { log('A known case FAILED; no target results are reported.'); receipt.abortedAfterKnownCases = true; writeFileSync(OUT, JSON.stringify(receipt, null, 1)); process.exit(1); }
log('All known cases PASS; proceeding to the ring targets.\n');

// ================================================================== closed forms (derived by hand; see the analysis file)
function ringSpectrumClosed(R) {
  const b = 1 / (4 * R);
  return [
    { label: 'in-plane m=0 radial (breathing)', sector: 0, kind: 'in-plane', value: 1 - (2 - SQ2) * b, mult: 1 },
    { label: 'in-plane m=0 tangential (rigid rotation)', sector: 0, kind: 'in-plane', value: 1 - (1 + SQ2) * b, mult: 1 },
    { label: 'in-plane m=2 radial (rectangle)', sector: 2, kind: 'in-plane', value: 1 - (2 + SQ2) * b, mult: 1 },
    { label: 'in-plane m=2 tangential (rhombus)', sector: 2, kind: 'in-plane', value: 1 + (SQ2 - 1) * b, mult: 1 },
    { label: 'in-plane m=+-1 lower', sector: '1,3', kind: 'in-plane', value: 1 - (SQ73 - 3) * b / 2, mult: 2 },
    { label: 'in-plane m=+-1 upper', sector: '1,3', kind: 'in-plane', value: 1 + (SQ73 + 3) * b / 2, mult: 2 },
    { label: 'axial m=0 (common z)', sector: 0, kind: 'axial', value: 1 - (2 * SQ2 - 1) * b, mult: 1 },
    { label: 'axial m=2 (alternating z)', sector: 2, kind: 'axial', value: 1 + (2 * SQ2 + 1) * b, mult: 1 },
    { label: 'axial m=+-1 (tilt)', sector: '1,3', kind: 'axial', value: 1 - b, mult: 2 },
  ];
}
const SINGULAR_RADII = [
  { R: (2 - SQ2) / 4, closed: '(2-sqrt2)/4', mode: 'in-plane m=0 radial', mult: 1 },
  { R: 1 / 4, closed: '1/4', mode: 'axial m=+-1 (tilt)', mult: 2 },
  { R: (2 * SQ2 - 1) / 4, closed: '(2 sqrt2 - 1)/4', mode: 'axial m=0', mult: 1 },
  { R: (1 + SQ2) / 4, closed: '(1+sqrt2)/4', mode: 'in-plane m=0 tangential (rigid rotation)', mult: 1 },
  { R: (SQ73 - 3) / 8, closed: '(sqrt73 - 3)/8', mode: 'in-plane m=+-1 lower', mult: 2 },
  { R: (2 + SQ2) / 4, closed: '(2+sqrt2)/4', mode: 'in-plane m=2 radial', mult: 1 },
];
const vBalance2 = (R) => 2 * (2 * SQ2 - 1) / (8 * R - 1 - SQ2);          // frozen law
const vZero2 = (R) => (2 * SQ2 - 1) / (4 * R);                            // zero-coupling counterpart
const lambdaT = (R) => 1 - (1 + SQ2) / (4 * R);                           // rigid-rotation Hessian eigenvalue
const R_POLE = (1 + SQ2) / 8;                                             // real Omega exists for R > R_POLE

// ================================================================== T1: spectrum, closed form vs Jacobi eigensolve, with sector labels
log('=== Target T1: 12x12 velocity Hessian spectrum at the ring, closed form vs numerical symmetric eigensolve ===');
// Symmetry-adapted (sector) basis: column (m,c) has member-k block (1/2) i^{mk} f_c^{(k)}, f = (n_k, t_k, z).
function sectorBasis(st) {
  const cols = [];
  for (let m = 0; m < 4; m++) for (let c = 0; c < 3; c++) {
    const re = zeros(12), im = zeros(12);
    for (let k = 0; k < 4; k++) {
      const ph = m * k * Math.PI / 2, cr = Math.cos(ph) / 2, ci = Math.sin(ph) / 2;
      const f = c === 0 ? st.nvec[k] : c === 1 ? st.tvec[k] : [0, 0, 1];
      for (let d = 0; d < 3; d++) { re[3 * k + d] = cr * f[d]; im[3 * k + d] = ci * f[d]; }
    }
    cols.push({ m, c, re, im });
  }
  return cols;
}
// B = U^H A U for a real 12x12 A: returns per-sector 3x3 complex blocks and the maximal off-sector entry.
function sectorBlocks(A, U) {
  const full = Array.from({ length: 12 }, () => Array(12));
  for (let a = 0; a < 12; a++) for (let b = 0; b < 12; b++) {
    const Aub = matVec(A, U[b].re), Aubi = matVec(A, U[b].im); let re = 0, im = 0;
    for (let i = 0; i < 12; i++) { re += U[a].re[i] * Aub[i] + U[a].im[i] * Aubi[i]; im += U[a].re[i] * Aubi[i] - U[a].im[i] * Aub[i]; }
    full[a][b] = [re, im];
  }
  let leak = 0; const blocks = [];
  for (let m = 0; m < 4; m++) { const B = Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => full[3 * m + i][3 * m + j])); blocks.push(B); }
  for (let a = 0; a < 12; a++) for (let b = 0; b < 12; b++) if (Math.floor(a / 3) !== Math.floor(b / 3)) leak = Math.max(leak, cabs(full[a][b]));
  return { blocks, leak, full };
}
function herm2Eig(B) { // eigenvalues of a 2x2 Hermitian block (real)
  const tr = B[0][0][0] + B[1][1][0], det = B[0][0][0] * B[1][1][0] - (B[0][1][0] ** 2 + B[0][1][1] ** 2);
  const disc = Math.sqrt(Math.max(0, tr * tr / 4 - det)); return [tr / 2 - disc, tr / 2 + disc];
}
{
  const rows = []; let worst = 0, worstLeak = 0, worstSector = 0;
  for (const R of [0.2, 0.5, 0.75, 1, 2, 10, 50, 100]) {
    const st = ringState(R, 0); const asm = assemble(st.X, st.V, RING_Q, 1);
    const num = symEig(asm.H).values; const closedList = ringSpectrumClosed(R);
    const closed = closedList.flatMap((c) => Array(c.mult).fill(c.value)).sort((a, b) => a - b);
    let err = 0; for (let i = 0; i < 12; i++) err = Math.max(err, Math.abs(num[i] - closed[i]));
    // sector check: block-diagonalize H in the symmetry-adapted basis and compare each block to its label
    const U = sectorBasis(st); const sb = sectorBlocks(asm.H, U); worstLeak = Math.max(worstLeak, sb.leak);
    const sec = {}; let serr = 0;
    for (let m = 0; m < 4; m++) {
      const B = sb.blocks[m]; const inPlane = herm2Eig([[B[0][0], B[0][1]], [B[1][0], B[1][1]]]); const axial = B[2][2][0];
      const mixZ = Math.max(cabs(B[0][2]), cabs(B[1][2]), cabs(B[2][0]), cabs(B[2][1]));
      sec[`m${m}`] = { inPlane, axial, axialInPlaneMixing: mixZ };
      const want = closedList.filter((c) => String(c.sector).split(',').map(Number).includes(m));
      const wIn = want.filter((c) => c.kind === 'in-plane').map((c) => c.value).sort((a, b) => a - b), wAx = want.filter((c) => c.kind === 'axial').map((c) => c.value);
      serr = Math.max(serr, Math.abs(inPlane[0] - wIn[0]), Math.abs(inPlane[1] - wIn[1]), Math.abs(axial - wAx[0]), mixZ);
    }
    worstSector = Math.max(worstSector, serr);
    const detH = solve(asm.H, zeros(12)).det; const detClosed = closed.reduce((p, x) => p * x, 1);
    rows.push({ R, numerical: num, closedForm: closed, maxAbsErr: err, detH, detClosedProduct: detClosed, sectorLeak: sb.leak, sectorBlockErr: serr, sectors: sec });
    worst = Math.max(worst, err);
    log(`R=${R}: max|num-closed|=${err.toExponential(2)}  det H=${f12(detH)}  sector leak=${sb.leak.toExponential(2)}  sector-label err=${serr.toExponential(2)}`);
  }
  check('T1 closed-form spectrum vs eigensolve (8 radii)', worst < 1e-11, `max abs err ${worst.toExponential(3)}`);
  check('T1 sector block-diagonalization (leak) and per-sector labels', worstLeak < 1e-13 && worstSector < 1e-11, `leak ${worstLeak.toExponential(3)}, label err ${worstSector.toExponential(3)}`);
  receipt.targets.T1_spectrum = { closedForms: ringSpectrumClosed(1).map((c) => ({ label: c.label, sector: c.sector, kind: c.kind, mult: c.mult })),
    formulas: { 'in-plane m=0 radial': '1 - (2-sqrt2)/(4R)', 'in-plane m=0 tangential': '1 - (1+sqrt2)/(4R)', 'in-plane m=2 radial': '1 - (2+sqrt2)/(4R)', 'in-plane m=2 tangential': '1 + (sqrt2-1)/(4R)', 'in-plane m=+-1': '1 + (3 -+ sqrt73)/(8R) (each x2)', 'axial m=0': '1 - (2 sqrt2 - 1)/(4R)', 'axial m=2': '1 + (2 sqrt2 + 1)/(4R)', 'axial m=+-1': '1 - 1/(4R) (x2)' },
    rows: rows.map((r) => ({ R: r.R, maxAbsErr: r.maxAbsErr, detH: r.detH, sectorLeak: r.sectorLeak, sectorBlockErr: r.sectorBlockErr })), maxAbsErr: worst };
  bulky.T1_spectrumRows = rows;
}

// ================================================================== T2: singular radii and sign of det H on each interval
log('\n=== Target T2: singular radii of H (12 digits) and sign of det H between them ===');
{
  const rows = SINGULAR_RADII.map((s) => {
    // numerical confirmation: det H changes sign (odd mult) or touches zero (even mult) at s.R; eigenvalue nearest zero
    const st = ringState(s.R, 0); const ev = symEig(assemble(st.X, st.V, RING_Q, 1).H).values; const minAbs = Math.min(...ev.map(Math.abs));
    const cnt = ev.filter((x) => Math.abs(x) < 1e-12).length;
    return { R12: s.R.toFixed(12), R: s.R, closed: s.closed, mode: s.mode, multiplicity: s.mult, numericalZeroEigenvalues: cnt, smallestAbsEigenvalue: minAbs };
  });
  const bounds = [0, ...SINGULAR_RADII.map((s) => s.R), Infinity]; const intervals = [];
  for (let i = 0; i + 1 < bounds.length; i++) {
    const Rm = bounds[i + 1] === Infinity ? 2 * bounds[i] : 0.5 * (bounds[i] + bounds[i + 1]);
    const st = ringState(Rm, 0); const ev = symEig(assemble(st.X, st.V, RING_Q, 1).H).values; const neg = ev.filter((x) => x < 0).length;
    intervals.push({ interval: `(${bounds[i].toFixed(12)}, ${bounds[i + 1] === Infinity ? 'inf' : bounds[i + 1].toFixed(12)})`, sampleR: Rm, negativeEigenvalues: neg, signDetH: neg % 2 === 0 ? '+' : '-' });
  }
  for (const r of rows) log(`R_s = ${r.R12}  (${r.closed})  ${r.mode}  mult ${r.multiplicity}  numerical zero count ${r.numericalZeroEigenvalues}  min|eig| ${r.smallestAbsEigenvalue.toExponential(2)}`);
  for (const iv of intervals) log(`det H on ${iv.interval}: ${iv.signDetH}  (${iv.negativeEigenvalues} negative eigenvalues)`);
  const ok = rows.every((r) => r.numericalZeroEigenvalues === r.multiplicity);
  check('T2 singular radii: numerical zero multiplicities match', ok);
  receipt.targets.T2_singularRadii = { radii: rows, intervals, positiveDefiniteFor: `R > (2+sqrt2)/4 = ${((2 + SQ2) / 4).toFixed(12)}`, pairRadiiNote: 'none of 1, 1/2 (pair separations) nor their ring images R=1/sqrt2, 1/(2 sqrt2), 1/2 is a ring singular radius; R=1/4 is, as the diagonal same-polarity transverse term alone (the adjacent terms cancel in the axial m=+-1 sector)' };
}

// ================================================================== T3: balance speed, residuals, invariants
log('\n=== Target T3: rigid-rotation balance v(R) with inertial residual ||HA-G||inf, rotating-frame residual, and invariants ===');
function Jrot(vec) { const y = zeros(12); for (let k = 0; k < 4; k++) { y[3 * k] = -vec[3 * k + 1]; y[3 * k + 1] = vec[3 * k]; y[3 * k + 2] = 0; } return y; } // z x (.)
function balanceRow(R) {
  const v2 = vBalance2(R); const v = Math.sqrt(v2), Omega = v / R;
  const st = ringState(R, v); const asm = assemble(st.X, st.V, RING_Q, 1); const G = Gvec(asm);
  const HA = matVec(asm.H, st.A); const resI = normInf(HA.map((x, i) => x - G[i]));
  const comp = ringComponents(G, st); const Gt = Math.max(...comp.map((c) => Math.abs(c.t))), Gz = Math.max(...comp.map((c) => Math.abs(c.z)));
  // rotating-frame fixed-point residual: dL/dX - Omega z x (H V)
  const p = matVec(asm.H, st.V); const Jp = Jrot(p); const resR = normInf(asm.dLdX.map((g, i) => g - Omega * Jp[i]));
  // direct solve for A and the implied speed, as a second route to v
  const Asol = solve(asm.H, G).x; const Acomp = ringComponents(Asol, st);
  const inv = invariants(st.X, st.V, asm);
  const eps = Math.max(...asm.pairs.map((pq) => 1 / pq.r));
  return { R, v, v12: v.toFixed(12), Omega, v2closed: v2, vZeroCoupling: Math.sqrt(vZero2(R)), ratio_v_over_v0: Math.sqrt(v2 / vZero2(R)),
    residualInertialInf: resI, Ginf: normInf(G), residualRotatingInf: resR, GtangentialMax: Gt, GaxialMax: Gz,
    solvedAccelRadial: Acomp[0].n, impliedCentripetal: -v2 / R, lambdaT: lambdaT(R),
    E: inv.E, Eclosed: -2 * v2, P: inv.P, Jz: inv.J[2], JzClosed: v * (4 * R - 1 - SQ2), maxEps: eps, maxSpeed: v,
    insideDomain: v <= SPEED_BOUND && eps <= EPS_BOUND, hessianPositiveDefinite: R > (2 + SQ2) / 4 };
}
{
  const rows = []; let worst = 0, worstInv = 0;
  for (const R of [0.5, 1, 5, 20, 50, 100, 200, 1000]) {
    const r = balanceRow(R); rows.push(r);
    worst = Math.max(worst, r.residualInertialInf / r.Ginf, r.residualRotatingInf / r.Ginf, r.GtangentialMax / r.Ginf, Math.abs(r.solvedAccelRadial - r.impliedCentripetal) / Math.abs(r.impliedCentripetal));
    worstInv = Math.max(worstInv, Math.abs(r.E - r.Eclosed) / Math.abs(r.E), Math.abs(r.Jz - r.JzClosed) / Math.abs(r.Jz), normInf(r.P));
    log(`R=${R}: v=${r.v12}  v/v0=${f12(r.ratio_v_over_v0)}  ||HA-G||=${r.residualInertialInf.toExponential(2)}  ||G||=${r.Ginf.toExponential(6)}  rot-frame res=${r.residualRotatingInf.toExponential(2)}  G_t max=${r.GtangentialMax.toExponential(2)}  E=${f12(r.E)}  Jz=${f12(r.Jz)}  eps=${r.maxEps.toExponential(3)}  domain=${r.insideDomain}  Hpd=${r.hessianPositiveDefinite}`);
  }
  check('T3 balance: relative residuals (inertial, rotating, tangential, solved A) < 1e-11', worst < 1e-11, `worst ${worst.toExponential(3)}`);
  check('T3 invariants: E=-2v^2, J_z=v(4R-1-sqrt2), P=0', worstInv < 1e-11, `worst ${worstInv.toExponential(3)}`);
  // declared-domain boundary
  const R_speed = (2 * (2 * SQ2 - 1) / (SPEED_BOUND * SPEED_BOUND) + 1 + SQ2) / 8;   // v = SPEED_BOUND
  const R_eps = 1 / (EPS_BOUND * SQ2);                                              // adjacent pair 1/(R sqrt2) = EPS_BOUND
  const R_domain = Math.max(R_speed, R_eps);
  log(`balance exists (real Omega) for R > (1+sqrt2)/8 = ${R_POLE.toFixed(12)}; v -> inf there; v = c_f at R = ${((2 * (2 * SQ2 - 1) + 1 + SQ2) / 8).toFixed(12)}`);
  log(`declared domain: speed bound v<=${SPEED_BOUND} gives R >= ${R_speed.toFixed(12)}; eps bound K/(c_f^2 r)<=${EPS_BOUND} on the adjacent pair gives R >= ${R_eps.toFixed(12)}; binding: ${R_speed > R_eps ? 'speed' : 'eps'}; domain R >= ${R_domain.toFixed(12)}`);
  receipt.targets.T3_balance = { closedForm: { v2: 'v^2 = 2(2 sqrt2 - 1)/(8R - 1 - sqrt2)', Omega2: 'Omega^2 = v^2/R^2', zeroCoupling: 'v0^2 = (2 sqrt2 - 1)/(4R)', ratio: 'v^2/v0^2 = 8R/(8R - 1 - sqrt2)', E: 'E = -2 v^2 = -4(2 sqrt2 - 1)/(8R - 1 - sqrt2)', P: '0', Jz: 'J_z = 4 R lambda_t v = v (4R - 1 - sqrt2)', lambdaT: '1 - (1+sqrt2)/(4R)' },
    realOmegaFor: `R > (1+sqrt2)/8 = ${R_POLE.toFixed(12)}`, vEqualsCfAt: ((2 * (2 * SQ2 - 1) + 1 + SQ2) / 8).toFixed(12),
    declaredDomain: { speedBound: SPEED_BOUND, epsBound: EPS_BOUND, R_speed12: R_speed.toFixed(12), R_eps12: R_eps.toFixed(12), binding: R_speed > R_eps ? 'speed' : 'eps', R_domain12: R_domain.toFixed(12) },
    rows: rows.map((r) => ({ R: r.R, v12: r.v12, Omega: r.Omega, vZeroCoupling: r.vZeroCoupling, residualInertialInf: r.residualInertialInf, Ginf: r.Ginf, residualRotatingInf: r.residualRotatingInf, GtangentialMax: r.GtangentialMax, GaxialMax: r.GaxialMax, E: r.E, Jz: r.Jz, P: r.P, maxEps: r.maxEps, insideDomain: r.insideDomain, hessianPositiveDefinite: r.hessianPositiveDefinite })) };
  bulky.T3_balanceRows = rows;
}

// ================================================================== T4 (item 5): rotating-frame linearization at R in {50,100,200}
log('\n=== Target T4 (item 5): linearization in the frame rotating at Omega, about the balanced ring ===');
// Rotating-frame second-order right-hand side: H(Y) Ydd = Rrhs(Y, W), W = Ydot, V = W + Omega z x Y,
// Rrhs = dL/dX(Y,V) - Omega z x (H V) - H (Omega z x W) - sum_j (dM_ij/dT)|_{W} V_j.
function Rrhs(Y, W, Omega, coupling = 1) {
  const JY = Jrot(Y); const V = W.map((w, i) => w + Omega * JY[i]);
  const asm = assemble(Y, V, RING_Q, coupling, W);
  const p = matVec(asm.H, V); const Jp = Jrot(p); const HJW = matVec(asm.H, Jrot(W));
  return { r: asm.dLdX.map((g, i) => g - Omega * Jp[i] - Omega * HJW[i] - asm.MdotV[i]), H: asm.H };
}
function fdJacobian(fun, x0, h) { // fourth-order central differences, column by column
  const n = x0.length, f0 = fun(x0), Jm = mat(f0.length, n);
  for (let j = 0; j < n; j++) {
    const ev = (s) => { const x = Float64Array.from(x0); x[j] += s * h; return fun(x); };
    const p2 = ev(2), p1 = ev(1), m1 = ev(-1), m2 = ev(-2);
    for (let i = 0; i < f0.length; i++) Jm[i][j] = (-p2[i] + 8 * p1[i] - 8 * m1[i] + m2[i]) / (12 * h);
  }
  return Jm;
}
// polynomial utilities (complex coefficients, low -> high)
function polyMul(a, b) { const c = Array.from({ length: a.length + b.length - 1 }, () => C(0)); for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) c[i + j] = cadd(c[i + j], cmul(a[i], b[j])); return c; }
function polyEval(p, z) { let s = C(0); for (let i = p.length - 1; i >= 0; i--) s = cadd(cmul(s, z), p[i]); return s; }
function polyDeriv(p) { return p.slice(1).map((c, i) => [c[0] * (i + 1), c[1] * (i + 1)]); }
function polyRoots(p0) { // Durand-Kerner on the monic form, then Newton polish
  const n = p0.length - 1, lead = p0[n]; const p = p0.map((c) => cdiv(c, lead));
  let radius = 1; for (let i = 0; i < n; i++) radius = Math.max(radius, 2 * Math.pow(cabs(p[i]), 1 / (n - i)));
  let roots = Array.from({ length: n }, (_, k) => cmul(C(radius), [Math.cos(0.4 + 2 * Math.PI * k / n), Math.sin(0.4 + 2 * Math.PI * k / n)]));
  for (let it = 0; it < 2000; it++) {
    let maxStep = 0;
    for (let i = 0; i < n; i++) { let den = C(1); for (let j = 0; j < n; j++) if (j !== i) den = cmul(den, csub(roots[i], roots[j])); const step = cdiv(polyEval(p, roots[i]), den); roots[i] = csub(roots[i], step); maxStep = Math.max(maxStep, cabs(step)); }
    if (maxStep < 1e-17 * radius) break;
  }
  const dp = polyDeriv(p);
  return roots.map((z) => { for (let it = 0; it < 5; it++) { const d = polyEval(dp, z); if (cabs(d) === 0) break; const s = cdiv(polyEval(p, z), d); if (cabs(s) > 1e-6 * radius) break; z = csub(z, s); } return z; });
}
function quadPencilDet2(M, Cm, K) { // 2x2 complex pencil lambda^2 M + lambda C + K -> quartic polynomial
  const P = (i, j) => [K[i][j], Cm[i][j], M[i][j]];
  const a = polyMul(P(0, 0), P(1, 1)), b = polyMul(P(0, 1), P(1, 0)); return a.map((c, i) => csub(c, b[i]));
}
function linearize(R, hRel, coupling = 1) {
  const v = Math.sqrt(coupling ? vBalance2(R) : vZero2(R)), Omega = v / R; const st = ringState(R, v);
  const asmI = assemble(st.X, st.V, RING_Q, coupling); const GI = Gvec(asmI);
  const resInertial = normInf(matVec(asmI.H, st.A).map((x, i) => x - GI[i]));
  const Y0 = Float64Array.from(st.X), W0 = zeros(12);
  const base = Rrhs(Y0, W0, Omega, coupling); const res0 = normInf(base.r); const H0 = base.H;
  const dRdY = fdJacobian((Y) => Rrhs(Y, W0, Omega, coupling).r, Y0, hRel * R);
  const dRdW = fdJacobian((W) => Rrhs(Y0, W, Omega, coupling).r, W0, hRel * Math.max(v, 1e-3));
  const Kmat = dRdY.map((r) => r.map((x) => -x)), Cmat = dRdW.map((r) => r.map((x) => -x));
  const U = sectorBasis(st);
  const sM = sectorBlocks(H0, U), sC = sectorBlocks(Cmat, U), sK = sectorBlocks(Kmat, U);
  const leak = Math.max(sM.leak, sC.leak, sK.leak); const normK = Math.max(...Kmat.flatMap((r) => Array.from(r, Math.abs))), normC = Math.max(...Cmat.flatMap((r) => Array.from(r, Math.abs)));
  const sectors = [];
  for (let m = 0; m < 4; m++) {
    const Bm = sM.blocks[m], Bc = sC.blocks[m], Bk = sK.blocks[m];
    const mixZ = Math.max(...[Bm, Bc, Bk].flatMap((B) => [cabs(B[0][2]), cabs(B[1][2]), cabs(B[2][0]), cabs(B[2][1])]));
    // axial scalar quadratic
    const az = polyRoots([Bk[2][2], Bc[2][2], Bm[2][2]]);
    // in-plane 2x2 quartic
    const sub = (B) => [[B[0][0], B[0][1]], [B[1][0], B[1][1]]];
    const quart = quadPencilDet2(sub(Bm), sub(Bc), sub(Bk)); const ip = polyRoots(quart);
    // pencil nullity at each root (geometric multiplicity in the first-order system)
    const pencilAt = (B2m, B2c, B2k, z) => B2m.map((r, i) => r.map((x, j) => cadd(cadd(cmul(cmul(z, z), x), cmul(z, B2c[i][j])), B2k[i][j])));
    const scale2 = Math.max(cabs(Bk[0][0]), cabs(Bk[1][1]), cabs(Bk[0][1]), Omega * Omega);
    const ipInfo = ip.map((z) => { const P = pencilAt(sub(Bm), sub(Bc), sub(Bk), z); const pn = Math.max(...P.flat().map(cabs)); return { lambda: z, pencilNormAtRoot: pn, nullity: pn < 1e-6 * scale2 ? 2 : 1 }; });
    sectors.push({ m, axial: az, inPlane: ipInfo, axialInPlaneMixing: mixZ, blocks: { M: Bm, C: Bc, K: Bk } });
  }
  return { R, v, Omega, coupling, residualRotatingInf: res0, residualInertialInf: resInertial, leak, normK, normC, sectors, H0, Cmat, Kmat };
}
function clusterRoots(list, tol) { // list of {lambda, ...}; returns groups
  const used = new Array(list.length).fill(false), groups = [];
  for (let i = 0; i < list.length; i++) { if (used[i]) continue; const g = [i]; used[i] = true; for (let j = i + 1; j < list.length; j++) if (!used[j] && cabs(csub(list[i].lambda, list[j].lambda)) < tol) { g.push(j); used[j] = true; } groups.push(g); }
  return groups;
}
{
  const out = [], zeroRows = [];
  for (const [R, coupling] of [[50, 1], [100, 1], [200, 1], [50, 0], [100, 0], [200, 0], [1000, 0]]) {
    const L1 = linearize(R, 1e-3, coupling), L2 = linearize(R, 5e-4, coupling);
    // FD uncertainty: largest change of any exponent between the two step sizes
    const all1 = L1.sectors.flatMap((s) => [...s.axial, ...s.inPlane.map((x) => x.lambda)]), all2 = L2.sectors.flatMap((s) => [...s.axial, ...s.inPlane.map((x) => x.lambda)]);
    let fdDiff = 0; for (const z of all1) fdDiff = Math.max(fdDiff, Math.min(...all2.map((w) => cabs(csub(z, w)))));
    const Omega = L1.Omega;
    // perturbation level of the pencil, relative, and the sqrt-splitting threshold for a Jordan-type double root
    const deltaRel = Math.max(L1.leak / L1.normK, L1.residualRotatingInf / L1.normK, 1e-14);
    const threshold = Math.max(10 * Math.sqrt(deltaRel) * Omega, 10 * fdDiff);
    const sectorsOut = []; let nPos = 0, maxRe = -Infinity;
    for (const s of L1.sectors) {
      const ax = s.axial.map((z) => ({ lambda: z, overOmega: [z[0] / Omega, z[1] / Omega] }));
      const axGroups = clusterRoots(ax, 1e-4 * Omega).map((g) => ({ members: g.length, lambdaMean: ax[g[0]].lambda, structure: g.length === 1 ? 'simple' : 'Jordan block (scalar pencil: geometric multiplicity 1)' }));
      const ipGroups = clusterRoots(s.inPlane, 1e-4 * Omega).map((g) => ({ members: g.length, lambdaMean: s.inPlane[g[0]].lambda, nullity: s.inPlane[g[0]].nullity, structure: g.length === 1 ? 'simple' : (s.inPlane[g[0]].nullity >= g.length ? 'semisimple' : 'Jordan block') }));
      for (const z of [...s.axial, ...s.inPlane.map((x) => x.lambda)]) { maxRe = Math.max(maxRe, z[0]); if (z[0] > threshold) nPos++; }
      const structOf = (groups, idx) => { const g = groups.find((gg) => gg.idx.includes(idx)); return g ? g.structure : 'simple'; };
      const axG = clusterRoots(ax, 1e-4 * Omega).map((g) => ({ idx: g, structure: g.length === 1 ? 'simple' : 'Jordan block (scalar pencil, geometric multiplicity 1)' }));
      const ipG = clusterRoots(s.inPlane, 1e-4 * Omega).map((g) => ({ idx: g, structure: g.length === 1 ? 'simple' : (s.inPlane[g[0]].nullity >= g.length ? 'semisimple' : 'Jordan block (geometric multiplicity 1)') }));
      const exps = [...s.axial.map((z, i) => ({ m: s.m, kind: 'axial', lambda: z.map((x) => +x.toPrecision(13)), structure: structOf(axG, i) })),
        ...s.inPlane.map((x, i) => ({ m: s.m, kind: 'in-plane', lambda: x.lambda.map((y) => +y.toPrecision(13)), structure: structOf(ipG, i) }))];
      sectorsOut.push(...exps);
      bulky[`T4_sectorDetail_R${R}_c${coupling}_m${s.m}`] = { axial: ax, axialGroups: axGroups, inPlane: s.inPlane, inPlaneGroups: ipGroups, axialInPlaneMixing: s.axialInPlaneMixing };
      log(`R=${R} c=${coupling} sector m=${s.m}: axial ${s.axial.map((z) => `(${cfmt(z)})`).join(' ')} | in-plane ${s.inPlane.map((x) => `(${cfmt(x.lambda)})`).join(' ')}`);
    }
    // compact summary: the growth rates over Omega (m=2 real exponent, m=1 complex exponent) and the oscillation frequencies over Omega
    const m2real = L1.sectors[2].inPlane.map((x) => x.lambda).filter((z) => z[0] > threshold).map((z) => z[0] / Omega);
    const m1pos = L1.sectors[1].inPlane.map((x) => x.lambda).filter((z) => z[0] > threshold).map((z) => [z[0] / Omega, z[1] / Omega]);
    const summary = { m0_inPlane_kappaOverOmega: Math.max(...L1.sectors[0].inPlane.map((x) => Math.abs(x.lambda[1]))) / Omega,
      m0_inPlane_zeroPairSplit: Math.min(...L1.sectors[0].inPlane.map((x) => cabs(x.lambda))),
      m0_axial_zeroPairSplit: Math.max(...L1.sectors[0].axial.map(cabs)),
      m1_axial_overOmega: L1.sectors[1].axial.map((z) => z[1] / Omega), m2_axial_overOmega: Math.abs(L1.sectors[2].axial[0][1]) / Omega,
      m2_inPlane_realGrowthOverOmega: m2real, m2_inPlane_oscOverOmega: Math.max(...L1.sectors[2].inPlane.map((x) => Math.abs(x.lambda[1]))) / Omega,
      m1_inPlane_growingExponentOverOmega: m1pos, m1_inPlane_translationPair: L1.sectors[1].inPlane.map((x) => x.lambda).filter((z) => Math.abs(z[1] - Omega) < 1e-3 * Omega) };
    log(`R=${R} c=${coupling}: Omega=${f12(Omega)}  rot-frame residual ${L1.residualRotatingInf.toExponential(2)}  inertial residual ${L1.residualInertialInf.toExponential(2)}  leak ${L1.leak.toExponential(2)}  FD step disagreement ${fdDiff.toExponential(2)}  threshold ${threshold.toExponential(2)}  exponents with Re > threshold: ${nPos}  max Re ${maxRe.toExponential(3)}  growth/Omega: m2 ${m2real.map(f12)}  m1 ${JSON.stringify(m1pos.map((p) => p.map((x) => +x.toPrecision(10))))}`);
    const rowOut = { R, coupling, v: L1.v, Omega, residualRotatingInf: L1.residualRotatingInf, residualInertialInf: L1.residualInertialInf, sectorLeak: L1.leak, normK: L1.normK, normC: L1.normC, fdStepDisagreement: fdDiff, deltaRel, positiveRealPartThreshold: threshold, thresholdRule: 'max(10 sqrt(deltaRel) Omega, 10 x FD step disagreement); deltaRel = max(sector leak, rotating-frame residual)/||K||inf, floor 1e-14', countRePositive: nPos, maxRealPart: maxRe, summaryOverOmega: summary, exponents: sectorsOut };
    if (coupling) out.push(rowOut); else zeroRows.push(rowOut);
    bulky[`T4_linearization_R${R}_c${coupling}`] = { H0: L1.H0.map((r) => Array.from(r)), C: L1.Cmat.map((r) => Array.from(r)), K: L1.Kmat.map((r) => Array.from(r)), sectorBlocks: L1.sectors.map((s) => s.blocks) };
  }
  receipt.linearSpectrum = { frame: 'rotating at Omega about z; balanced ring is a fixed point; pencil lambda^2 H0 + lambda C + K with C = -dRrhs/dW, K = -dRrhs/dY by fourth-order central differences; roots per sector by Durand-Kerner plus Newton polish; geometric multiplicity = nullity of the pencil at the root',
    sectorConvention: 'sector m: member-k displacement carries phase i^{mk} in the local frame (n_k, t_k, z); m=3 is the complex conjugate of m=1', rows: out,
    zeroCouplingComparison: { note: 'same linearization with the velocity coupling deleted (H = I) about the zero-coupling balanced ring; measured comparison, not a known case (no independent closed form for this spectrum was derived)', rows: zeroRows } };
}

// ================================================================== write receipts
receipt.utcEnd = new Date().toISOString(); receipt.allChecksPass = allPass;
writeFileSync(OUT, JSON.stringify(receipt, null, 1));
writeFileSync(join(RUNTIME_DIR, 'ring-reference-bulky.json'), JSON.stringify(bulky, null, 1));
log(`\nreceipt: ${OUT}\nbulky: ${join(RUNTIME_DIR, 'ring-reference-bulky.json')}\nall checks pass: ${allPass}`);
process.exit(allPass ? 0 : 1);
