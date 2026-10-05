#!/usr/bin/env node
// Independent reference for the four-member alternating ring under the frozen
// instantaneous Weber-inspired pair law (lambda_W = -1/2, mu_W = 1, K = c_f = 1).
//
// Authored blind to the subject ring analysis (weber-overnight ring independent check,
// specialist lens carl-friedrich-gauss). Node >= 18, ESM, no external packages.
//
// Order of work (AGENTS.md, Claim Grading): known cases first, then the ring.
//   K1  pair determinant 1 - 2 sigma K mu /(c_f^2 r) reproduced by the 3N x 3N assembler on N = 2
//   K2  kinematic identity rddot = |w_perp|^2 / r + e.(a_i - a_j) against finite differences
//   K3  random four-member state: the assembled linear solve reproduces the pair law pointwise
//   K4  zero-coefficient control: assembler with lambda = mu = 0 is the plain inverse-square sum
//   K5  finite-difference Jacobian passes a known linear field
// then the target:
//   R1  det M on the ring versus the closed form, signature, null vector at x = 1
//   R2  exact balance: rdot, rddot on the rigid rotation, Omega^2(x), tangential residual
//   R3  24-state rotating-frame Jacobian, C4 sector blocks, eigenvalues by characteristic
//       polynomial, cross-checked against the sector closed forms and by inverse iteration
//   R4  invariants (sum V, angular momentum, Lagrangian energy) along an RK4 trajectory
//   R5  reference table
//
// Usage: node weber-overnight-ring-reference.mjs [--out <dir>]
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const LAM = -0.5, MU = 1, K = 1, CF = 1;
const SQ2 = Math.SQRT2;
const Q = [1, -1, 1, -1];
const SIG4 = Q.map((qi) => Q.map((qj) => Math.sign(qi * qj)));
const args = process.argv.slice(2);
const outIdx = args.indexOf('--out');
const OUT = outIdx >= 0 ? args[outIdx + 1] : null;
const record = { generated_utc: new Date().toISOString(), law: { lambda_W: LAM, mu_W: MU, K, c_f: CF }, known_cases: {}, ring: {} };
const log = (...s) => console.log(...s);
const fmt = (v, d = 12) => (typeof v === 'number' ? v.toPrecision(d) : String(v));
let failures = 0;
function check(name, ok, detail) { log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail !== undefined ? '  ' + detail : ''}`); if (!ok) failures++; return ok; }

// ---------- small linear algebra (real) ----------
function luSolve(A, b) { // Gaussian elimination with partial pivoting; returns {x, det}
  const n = A.length; const M = A.map((r) => r.slice()); const x = b.slice(); let det = 1;
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    if (p !== c) { [M[p], M[c]] = [M[c], M[p]]; [x[p], x[c]] = [x[c], x[p]]; det = -det; }
    const piv = M[c][c]; det *= piv; if (piv === 0) return { x: null, det: 0 };
    for (let r = c + 1; r < n; r++) { const f = M[r][c] / piv; if (f === 0) continue; for (let k = c; k < n; k++) M[r][k] -= f * M[c][k]; x[r] -= f * x[c]; }
  }
  for (let r = n - 1; r >= 0; r--) { let s = x[r]; for (let k = r + 1; k < n; k++) s -= M[r][k] * x[k]; x[r] = s / M[r][r]; }
  return { x, det };
}
function det(A) { return luSolve(A, new Array(A.length).fill(0)).det; }
function symEig(A) { // cyclic Jacobi for symmetric matrices; returns eigenvalues ascending
  const n = A.length; const M = A.map((r) => r.slice());
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) off += M[i][j] * M[i][j];
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(M[p][q]) < 1e-300) continue;
      const th = (M[q][q] - M[p][p]) / (2 * M[p][q]);
      const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1));
      const c = 1 / Math.sqrt(t * t + 1), s = t * c;
      for (let k = 0; k < n; k++) { const kp = M[k][p], kq = M[k][q]; M[k][p] = c * kp - s * kq; M[k][q] = s * kp + c * kq; }
      for (let k = 0; k < n; k++) { const pk = M[p][k], qk = M[q][k]; M[p][k] = c * pk - s * qk; M[q][k] = s * pk + c * qk; }
    }
  }
  return M.map((r, i) => r[i]).sort((a, b) => a - b);
}
const norm = (v) => Math.sqrt(v.reduce((s, c) => s + c * c, 0));

// ---------- complex helpers ----------
const C = (re, im = 0) => ({ re, im });
const cadd = (a, b) => C(a.re + b.re, a.im + b.im), csub = (a, b) => C(a.re - b.re, a.im - b.im);
const cmul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const cabs = (a) => Math.hypot(a.re, a.im), conj = (a) => C(a.re, -a.im), csqrt = (a) => { const r = cabs(a); const re = Math.sqrt((r + a.re) / 2); const im = Math.sign(a.im || 1) * Math.sqrt(Math.max(0, (r - a.re) / 2)); return C(re, im); };
const cstr = (z, d = 10) => `${z.re.toPrecision(d)}${z.im >= 0 ? '+' : '-'}${Math.abs(z.im).toPrecision(d)}i`;
function cluSolve(A, b) { // complex Gaussian elimination
  const n = A.length; const M = A.map((r) => r.map((z) => C(z.re, z.im))); const x = b.map((z) => C(z.re, z.im));
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (cabs(M[r][c]) > cabs(M[p][c])) p = r;
    if (p !== c) { [M[p], M[c]] = [M[c], M[p]]; [x[p], x[c]] = [x[c], x[p]]; }
    const piv = M[c][c]; if (cabs(piv) === 0) return null;
    for (let r = c + 1; r < n; r++) { const f = cdiv(M[r][c], piv); if (cabs(f) === 0) continue; for (let k = c; k < n; k++) M[r][k] = csub(M[r][k], cmul(f, M[c][k])); x[r] = csub(x[r], cmul(f, x[c])); }
  }
  for (let r = n - 1; r >= 0; r--) { let s = x[r]; for (let k = r + 1; k < n; k++) s = csub(s, cmul(M[r][k], x[k])); x[r] = cdiv(s, M[r][r]); }
  return x;
}
function charPoly(B) { // Faddeev-LeVerrier; returns coefficients c[0..n], c[n] = 1, p(l) = sum c[k] l^k
  const n = B.length; const I = (i, j) => (i === j ? C(1) : C(0));
  let Mk = B.map((r) => r.map((z) => C(z.re, z.im))); const c = new Array(n + 1).fill(null); c[n] = C(1);
  let tr = C(0); for (let i = 0; i < n; i++) tr = cadd(tr, Mk[i][i]); c[n - 1] = C(-tr.re, -tr.im);
  for (let k = 2; k <= n; k++) {
    const T = Mk.map((r, i) => r.map((z, j) => cadd(z, cmul(c[n - k + 1], I(i, j)))));
    Mk = B.map((r, i) => T[0].map((_, j) => { let s = C(0); for (let m = 0; m < n; m++) s = cadd(s, cmul(B[i][m], T[m][j])); return s; }));
    tr = C(0); for (let i = 0; i < n; i++) tr = cadd(tr, Mk[i][i]); c[n - k] = C(-tr.re / k, -tr.im / k);
  }
  return c;
}
function polyEval(c, z) { let p = C(0); for (let k = c.length - 1; k >= 0; k--) p = cadd(cmul(p, z), c[k]); return p; }
function polyRoots(c) { // Durand-Kerner then Newton polish
  const n = c.length - 1; let roots = []; const R = 1 + Math.max(...c.slice(0, n).map(cabs));
  for (let k = 0; k < n; k++) roots.push(cmul(C(R * 0.9), C(Math.cos(2 * Math.PI * k / n + 0.4), Math.sin(2 * Math.PI * k / n + 0.4))));
  for (let it = 0; it < 2000; it++) {
    let maxd = 0;
    for (let i = 0; i < n; i++) { let den = C(1); for (let j = 0; j < n; j++) if (j !== i) den = cmul(den, csub(roots[i], roots[j])); const d = cdiv(polyEval(c, roots[i]), den); roots[i] = csub(roots[i], d); maxd = Math.max(maxd, cabs(d)); }
    if (maxd < 1e-15) break;
  }
  const dc = c.slice(1).map((z, k) => C(z.re * (k + 1), z.im * (k + 1)));
  roots = roots.map((z) => { for (let it = 0; it < 20; it++) { const d = cdiv(polyEval(c, z), polyEval(dc, z)); if (!isFinite(d.re) || !isFinite(d.im)) break; z = csub(z, d); if (cabs(d) < 1e-16) break; } return z; });
  return roots;
}

// ---------- the pair law assembled as a 3N x 3N linear system M a = b ----------
function assemble(X, V, sig, lam = LAM, mu = MU) {
  const N = X.length, n = 3 * N;
  const M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const b = new Array(n).fill(0);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]];
    const r = Math.hypot(d[0], d[1], d[2]); const e = d.map((c) => c / r);
    const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]];
    const rdot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
    const wperp2 = w[0] * w[0] + w[1] * w[1] + w[2] * w[2] - rdot * rdot;
    const s = sig[i][j] * K;
    // r rddot = |w_perp|^2 + r e.(a_i - a_j); the bracket with the acceleration part removed is therefore
    // 1 + lam rdot^2/c_f^2 + mu |w_perp|^2/c_f^2 (an earlier draft divided the last term by r; known case K3 caught it)
    const h = 1 + lam * rdot * rdot / (CF * CF) + mu * wperp2 / (CF * CF);
    for (let a = 0; a < 3; a++) b[3 * i + a] += (s / (r * r)) * h * e[a];
    const g = s * mu / (CF * CF * r);
    for (let a = 0; a < 3; a++) for (let c = 0; c < 3; c++) { const P = g * e[a] * e[c]; M[3 * i + a][3 * i + c] -= P; M[3 * i + a][3 * j + c] += P; }
  }
  return { M, b };
}
function accelerations(X, V, sig, lam = LAM, mu = MU) { const { M, b } = assemble(X, V, sig, lam, mu); const { x, det: d } = luSolve(M, b); return { a: x, det: d, M, b }; }
function pairLawResidual(X, V, A, sig, lam = LAM, mu = MU) { // re-evaluate the pair law with rddot built from the solved accelerations
  const N = X.length; let worst = 0;
  for (let i = 0; i < N; i++) {
    const tot = [0, 0, 0];
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]]; const r = Math.hypot(...d); const e = d.map((c) => c / r);
      const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]]; const rdot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
      const wperp2 = w[0] * w[0] + w[1] * w[1] + w[2] * w[2] - rdot * rdot;
      const da = [A[3 * i] - A[3 * j], A[3 * i + 1] - A[3 * j + 1], A[3 * i + 2] - A[3 * j + 2]];
      const rddot = wperp2 / r + e[0] * da[0] + e[1] * da[1] + e[2] * da[2];
      const amp = (sig[i][j] * K / (r * r)) * (1 + lam * rdot * rdot / (CF * CF) + mu * r * rddot / (CF * CF));
      for (let a = 0; a < 3; a++) tot[a] += amp * e[a];
    }
    for (let a = 0; a < 3; a++) worst = Math.max(worst, Math.abs(tot[a] - A[3 * i + a]));
  }
  return worst;
}
function pairDerivs(X, V, A, i, j) { const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]]; const r = Math.hypot(...d); const e = d.map((c) => c / r); const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]]; const rdot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2]; const wperp2 = w[0] ** 2 + w[1] ** 2 + w[2] ** 2 - rdot * rdot; const da = [A[3 * i] - A[3 * j], A[3 * i + 1] - A[3 * j + 1], A[3 * i + 2] - A[3 * j + 2]]; return { r, rdot, rddot: wperp2 / r + e[0] * da[0] + e[1] * da[1] + e[2] * da[2] }; }

// deterministic pseudo-random numbers (LCG) so the record is reproducible
let seed = 20261005; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296 - 0.5; };

// ================= KNOWN CASES =================
log('=== Known cases (run and recorded before the ring) ===');
{ // K1 pair determinant
  const rows = [];
  for (const sigma of [-1, 1]) for (const r of [0.7, 1.3, 2.9, 5.0]) {
    const X = [[0, 0, 0], [r * 0.6, r * 0.8, 0]]; const V = [[0.1, -0.2, 0.3], [-0.4, 0.05, 0.2]];
    const sig = [[0, sigma], [sigma, 0]]; const { M } = assemble(X, V, sig); const dnum = det(M); const dref = 1 - 2 * sigma * K * MU / (CF * CF * r);
    rows.push({ sigma, r, det_numeric: dnum, det_closed: dref, diff: dnum - dref });
  }
  const worst = Math.max(...rows.map((q) => Math.abs(q.diff)));
  check('K1 pair determinant 1 - 2 sigma K mu/(c_f^2 r) on two-member subset (8 cases)', worst < 1e-13, `max |diff| = ${fmt(worst, 3)}`);
  // and the manuscript scalar pair reduction (1-2 sigma K mu/r) f = sigma K/r^2 [1 + lam rdot^2 + mu |w_perp|^2]
  let worstF = 0;
  for (const sigma of [-1, 1]) { const r = 1.9; const X = [[0.3, -0.2, 0.1], [0.3 + r, -0.2, 0.1]]; const V = [[0.2, 0.5, -0.1], [-0.3, 0.1, 0.4]]; const sig = [[0, sigma], [sigma, 0]];
    const { a } = accelerations(X, V, sig); const w = [0.5, 0.4, -0.5]; const rdot = -w[0]; const wp2 = w[1] ** 2 + w[2] ** 2; // e = (X_0 - X_1)/r = (-1, 0, 0)
    const f = (sigma * K / (r * r)) * (1 + LAM * rdot * rdot + MU * wp2) / (1 - 2 * sigma * K * MU / r); // a_0 = f e = (-f, 0, 0)
    worstF = Math.max(worstF, Math.abs(a[0] + f), Math.abs(a[3] - f), Math.abs(a[1]), Math.abs(a[2])); }
  check('K1b pair solve equals scalar reduction f (both polarities)', worstF < 1e-13, `max |diff| = ${fmt(worstF, 3)}`);
  record.known_cases.K1 = rows;
}
{ // K2 kinematic identity for rddot
  const X = [[0.2, -0.4, 0.5], [1.1, 0.3, -0.2]]; const V = [[0.3, 0.1, -0.2], [-0.1, 0.4, 0.25]]; const A = [0.7, -0.3, 0.2, -0.5, 0.1, 0.6];
  const rAt = (t) => Math.hypot(...[0, 1, 2].map((c) => (X[0][c] + V[0][c] * t + 0.5 * A[c] * t * t) - (X[1][c] + V[1][c] * t + 0.5 * A[3 + c] * t * t)));
  const h = 1e-3; const fd2 = (-rAt(2 * h) + 16 * rAt(h) - 30 * rAt(0) + 16 * rAt(-h) - rAt(-2 * h)) / (12 * h * h);
  const fd1 = (-rAt(2 * h) + 8 * rAt(h) - 8 * rAt(-h) + rAt(-2 * h)) / (12 * h);
  const { rdot, rddot } = pairDerivs(X, V, A, 0, 1);
  check('K2 rdot = e.w and rddot = |w_perp|^2/r + e.(a_i - a_j) against finite differences', Math.abs(fd1 - rdot) < 1e-9 && Math.abs(fd2 - rddot) < 1e-7, `|d rdot| = ${fmt(Math.abs(fd1 - rdot), 3)}, |d rddot| = ${fmt(Math.abs(fd2 - rddot), 3)}`);
  record.known_cases.K2 = { rdot, rddot, fd_rdot: fd1, fd_rddot: fd2 };
}
{ // K3 random four-member state
  let worst = 0, worstSym = 0;
  for (let trial = 0; trial < 5; trial++) {
    const X = [0, 1, 2, 3].map(() => [3 * rnd(), 3 * rnd(), 3 * rnd()]); const V = [0, 1, 2, 3].map(() => [rnd(), rnd(), rnd()]);
    const { a, M } = accelerations(X, V, SIG4); worst = Math.max(worst, pairLawResidual(X, V, a, SIG4));
    for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) worstSym = Math.max(worstSym, Math.abs(M[i][j] - M[j][i]));
  }
  check('K3 random four-member states: solved accelerations satisfy the pair law pointwise (5 states)', worst < 1e-12, `max residual = ${fmt(worst, 3)}`);
  check('K3b assembled M is symmetric', worstSym < 1e-15, `max asym = ${worstSym}`);
  record.known_cases.K3 = { max_residual: worst };
}
{ // K4 zero-coefficient control
  const X = [0, 1, 2, 3].map(() => [2 * rnd(), 2 * rnd(), 2 * rnd()]); const V = [0, 1, 2, 3].map(() => [rnd(), rnd(), rnd()]);
  const { a, M } = accelerations(X, V, SIG4, 0, 0); let worst = 0;
  for (let i = 0; i < 4; i++) { const tot = [0, 0, 0]; for (let j = 0; j < 4; j++) { if (i === j) continue; const d = [0, 1, 2].map((c) => X[i][c] - X[j][c]); const r = Math.hypot(...d); for (let c = 0; c < 3; c++) tot[c] += SIG4[i][j] * K * d[c] / (r ** 3); } for (let c = 0; c < 3; c++) worst = Math.max(worst, Math.abs(tot[c] - a[3 * i + c])); }
  let offI = 0; for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) offI = Math.max(offI, Math.abs(M[i][j] - (i === j ? 1 : 0)));
  check('K4 zero-coefficient control: M = I and a = inverse-square sum', worst < 1e-14 && offI === 0, `max |diff| = ${fmt(worst, 3)}`);
}

// ---------- rotating-frame vector field and finite-difference Jacobian ----------
function ringPositions(x) { return [0, 1, 2, 3].map((m) => [x * Math.cos(m * Math.PI / 2), x * Math.sin(m * Math.PI / 2), 0]); }
function field(state, Om) { // state = [Y (12), U = dY/dt (12)] in the frame rotating at Om about z
  const Y = [0, 1, 2, 3].map((m) => state.slice(3 * m, 3 * m + 3)); const U = [0, 1, 2, 3].map((m) => state.slice(12 + 3 * m, 15 + 3 * m));
  const Vabs = Y.map((y, m) => [U[m][0] - Om * y[1], U[m][1] + Om * y[0], U[m][2]]);
  const { a } = accelerations(Y, Vabs, SIG4);
  const out = new Array(24);
  for (let m = 0; m < 4; m++) { for (let c = 0; c < 3; c++) out[3 * m + c] = U[m][c];
    out[12 + 3 * m] = a[3 * m] + 2 * Om * U[m][1] + Om * Om * Y[m][0];
    out[12 + 3 * m + 1] = a[3 * m + 1] - 2 * Om * U[m][0] + Om * Om * Y[m][1];
    out[12 + 3 * m + 2] = a[3 * m + 2]; }
  return out;
}
function fdJacobian(F, s0, h) { const n = s0.length; const J = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let j = 0; j < n; j++) { const ev = (d) => { const s = s0.slice(); s[j] += d; return F(s); }; const f2 = ev(2 * h), f1 = ev(h), m1 = ev(-h), m2 = ev(-2 * h);
    for (let i = 0; i < n; i++) J[i][j] = (-f2[i] + 8 * f1[i] - 8 * m1[i] + m2[i]) / (12 * h); } return J; }
{ // K5 Jacobian instrument on a known linear-plus-cubic field
  const A = Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => rnd())); const F = (s) => A.map((r) => r.reduce((t, c, k) => t + c * s[k], 0) + 0.1 * s[0] ** 3);
  const s0 = [0.3, -0.2, 0.5, 0.1, -0.4]; const J = fdJacobian(F, s0, 1e-3); let worst = 0;
  for (let i = 0; i < 5; i++) for (let j = 0; j < 5; j++) worst = Math.max(worst, Math.abs(J[i][j] - A[i][j] - (j === 0 ? 0.3 * s0[0] ** 2 : 0)));
  check('K5 five-point finite-difference Jacobian on a known field', worst < 1e-10, `max |diff| = ${fmt(worst, 3)}`);
}

// ================= RING =================
log('\n=== Ring: four members, polarities + - + -, angular positions 0, pi/2, pi, 3pi/2 ===');
const closed = {
  Omega2: (x) => (2 * SQ2 - 1) / (4 * x ** 3),
  m0: (x) => 1 + (SQ2 - 1) / x, // k = 0 radial (breathing) coefficient of M
  m1: (x) => 1 + SQ2 / x, // 1 - 2 g_a
  mr2: (x) => 1 - 1 / x, // k = 2 radial coefficient of M
  detM: (x) => (1 + (SQ2 - 1) / x) * (1 - 1 / x) * (1 + SQ2 / x) ** 3,
  kappa1: (x) => (4 * SQ2 - 1) / (4 * x ** 3),
  kr2: (x) => 3 / (4 * x ** 3), kt2: (x) => -3 * SQ2 / (2 * x ** 3),
  // out-of-plane: zeta_m'' = sum_j s_mj (zeta_m - zeta_j), s_adj = -1/(2 sqrt2 x^3), s_diag = 1/(8 x^3);
  // sector k: omega_z,k^2 = -[2 s_adj (1 - cos(k pi/2)) + s_diag (1 - (-1)^k)] -> k=1,3: Omega^2 (tilt), k=2: sqrt2/x^3
  wz1: (x) => Math.sqrt((2 * SQ2 - 1) / (4 * x ** 3)), wz2: (x) => Math.sqrt(SQ2 / x ** 3),
};
function sectorClosedForms(x) {
  const Om = Math.sqrt(closed.Omega2(x)); const m0 = closed.m0(x), m1 = closed.m1(x), k1 = closed.kappa1(x);
  const out = {};
  out.k0_inplane = [C(0), C(0), C(0, Om / Math.sqrt(m0)), C(0, -Om / Math.sqrt(m0))];
  const s1 = csqrt(C(m1 * k1 - Om * Om)); // positive real when m1 k1 > Om^2 (always, see document)
  out.k1_inplane = [C(0, Om), C(0, Om), cdiv(cadd(C(0, -Om), s1), C(m1)), cdiv(csub(C(0, -Om), s1), C(m1))];
  out.k3_inplane = out.k1_inplane.map(conj);
  const A = closed.mr2(x) * m1, B = closed.mr2(x) * closed.kt2(x) + m1 * closed.kr2(x) + 4 * Om * Om, Cc = closed.kr2(x) * closed.kt2(x);
  const disc = csqrt(C(B * B - 4 * A * Cc)); const L1 = cdiv(cadd(C(-B), disc), C(2 * A)), L2 = cdiv(csub(C(-B), disc), C(2 * A));
  const r1 = csqrt(L1), r2 = csqrt(L2); out.k2_inplane = [r1, C(-r1.re, -r1.im), r2, C(-r2.re, -r2.im)];
  out.k2_Lambda = [L1, L2];
  out.k0_z = [C(0), C(0)]; out.k2_z = [C(0, closed.wz2(x)), C(0, -closed.wz2(x))]; out.k1_z = [C(0, closed.wz1(x)), C(0, -closed.wz1(x))]; out.k3_z = out.k1_z;
  out.Omega = Om; return out;
}
function sectorBasis(x) { // returns U[k] = array of 6 orthonormal complex 24-vectors: (pos rho, pos phi, pos z, vel rho, vel phi, vel z)
  const U = [];
  for (let k = 0; k < 4; k++) { const cols = [];
    for (const t of [0, 12]) for (const comp of ['rho', 'phi', 'z']) { const v = Array.from({ length: 24 }, () => C(0));
      for (let m = 0; m < 4; m++) { const th = m * Math.PI / 2; const f = comp === 'rho' ? [Math.cos(th), Math.sin(th), 0] : comp === 'phi' ? [-Math.sin(th), Math.cos(th), 0] : [0, 0, 1];
        const ph = C(Math.cos(k * m * Math.PI / 2) / 2, Math.sin(k * m * Math.PI / 2) / 2); for (let c = 0; c < 3; c++) v[t + 3 * m + c] = C(ph.re * f[c], ph.im * f[c]); }
      cols.push(v); } U.push(cols); }
  return U;
}
function applyReal(J, v) { return J.map((row) => { let re = 0, im = 0; for (let k = 0; k < row.length; k++) { re += row[k] * v[k].re; im += row[k] * v[k].im; } return C(re, im); }); }
function herm(u, v) { let s = C(0); for (let k = 0; k < u.length; k++) s = cadd(s, cmul(conj(u[k]), v[k])); return s; }
function inverseIterationGap(J, lam) { // returns ||r||/||v|| for (J - lam I) v = r: an upper bound on the distance from lam to the spectrum
  const n = J.length; const A = J.map((row, i) => row.map((c, j) => C(c - (i === j ? lam.re : 0), i === j ? -lam.im : 0)));
  const r = Array.from({ length: n }, () => C(rnd(), rnd())); const v = cluSolve(A, r); if (!v) return 0;
  const nr = Math.sqrt(r.reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0)), nv = Math.sqrt(v.reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0)); return nr / nv;
}
function analyseRing(x, { verbose = true } = {}) {
  const res = { x };
  const Xr = ringPositions(x); const Om2 = closed.Omega2(x); const Om = Math.sqrt(Om2); res.Omega = Om; res.period = 2 * Math.PI / Om; res.speed = x * Om;
  // R1 acceleration matrix on the ring (velocities do not enter M)
  const { M } = assemble(Xr, Xr.map(() => [0, 0, 0]), SIG4); const dM = det(M); const eig = symEig(M);
  res.detM_numeric = dM; res.detM_closed = closed.detM(x); res.M_eigenvalues = eig; res.M_negative_count = eig.filter((e) => e < 0).length;
  // R2 balance on the rigid rotation
  const Vr = Xr.map((p) => [-Om * p[1], Om * p[0], 0]); const { a } = accelerations(Xr, Vr, SIG4);
  let worstBal = 0, worstTan = 0, worstRd = 0, worstRdd = 0;
  for (let m = 0; m < 4; m++) { const th = m * Math.PI / 2; const er = [Math.cos(th), Math.sin(th)], et = [-Math.sin(th), Math.cos(th)];
    const ar = a[3 * m] * er[0] + a[3 * m + 1] * er[1], at = a[3 * m] * et[0] + a[3 * m + 1] * et[1];
    worstBal = Math.max(worstBal, Math.abs(ar + x * Om2), Math.abs(a[3 * m + 2])); worstTan = Math.max(worstTan, Math.abs(at));
    for (let j = 0; j < 4; j++) if (j !== m) { const d = pairDerivs(Xr, Vr, a, m, j); worstRd = Math.max(worstRd, Math.abs(d.rdot)); worstRdd = Math.max(worstRdd, Math.abs(d.rddot)); } }
  res.balance = { radial_residual: worstBal, tangential_residual: worstTan, max_abs_rdot: worstRd, max_abs_rddot: worstRdd };
  const s0 = [...Xr.flat(), ...new Array(12).fill(0)]; const f0 = field(s0, Om); res.rotating_frame_residual = norm(f0);
  // R3 Jacobian and sectors
  const h = 1e-3 * x; const J = fdJacobian((s) => field(s, Om), s0, h); const J2 = fdJacobian((s) => field(s, Om), s0, h / 2);
  let fdErr = 0; for (let i = 0; i < 24; i++) for (let j = 0; j < 24; j++) fdErr = Math.max(fdErr, Math.abs(J[i][j] - J2[i][j])); res.jacobian_step_change = fdErr;
  const U = sectorBasis(x); const blocks = []; let offBlock = 0;
  const JU = U.map((cols) => cols.map((v) => applyReal(J, v)));
  for (let k = 0; k < 4; k++) { const B = U[k].map((u) => JU[k].map((jv) => herm(u, jv))); blocks.push(B);
    for (let k2 = 0; k2 < 4; k2++) if (k2 !== k) for (const u of U[k2]) for (const jv of JU[k]) offBlock = Math.max(offBlock, cabs(herm(u, jv))); }
  res.sector_off_block_max = offBlock;
  const cf = sectorClosedForms(x); res.closed = cf; res.sectors = {};
  const sectorNames = ['k0', 'k1', 'k2', 'k3'];
  for (let k = 0; k < 4; k++) {
    const B = blocks[k]; const cp = charPoly(B); const roots = polyRoots(cp);
    // z sub-block (indices 2, 5) and in-plane sub-block (0,1,3,4) separately, to display the decoupling
    const zi = [2, 5], pi = [0, 1, 3, 4]; const Bz = zi.map((i) => zi.map((j) => B[i][j])), Bp = pi.map((i) => pi.map((j) => B[i][j]));
    let cross = 0; for (const i of zi) for (const j of pi) cross = Math.max(cross, cabs(B[i][j]), cabs(B[j][i]));
    const rootsZ = polyRoots(charPoly(Bz)), rootsP = polyRoots(charPoly(Bp));
    const pred = [...cf[sectorNames[k] + '_inplane'], ...cf[sectorNames[k] + '_z']];
    // match each predicted eigenvalue to the nearest computed root of the full 6x6 block
    const matches = pred.map((p) => { let best = Infinity, bz = null; for (const r of roots) { const d = cabs(csub(r, p)); if (d < best) { best = d; bz = r; } } return { predicted: p, nearest_root: bz, distance: best, inverse_iteration_gap: inverseIterationGap(J, p) }; });
    res.sectors[sectorNames[k]] = { roots_6x6: roots, roots_inplane: rootsP, roots_z: rootsZ, z_inplane_cross: cross, matches, block_inplane: Bp, block_z: Bz };
  }
  if (verbose) {
    log(`\n--- x = ${x} ---`);
    log(`Omega^2 = ${fmt(Om2)}  Omega = ${fmt(Om)}  period = ${fmt(res.period)}  speed v = ${fmt(res.speed)}`);
    log(`det M numeric = ${fmt(dM)}  closed = ${fmt(res.detM_closed)}  diff = ${fmt(dM - res.detM_closed, 3)}`);
    log(`eigenvalues of M: ${eig.map((e) => fmt(e, 10)).join(', ')}  (negative count ${res.M_negative_count})`);
    log(`balance: radial residual ${fmt(worstBal, 3)}, tangential ${fmt(worstTan, 3)}, max|rdot| ${fmt(worstRd, 3)}, max|rddot| ${fmt(worstRdd, 3)}, rotating-frame field norm ${fmt(res.rotating_frame_residual, 3)}`);
    log(`Jacobian: step-halving change ${fmt(fdErr, 3)}; sector off-block max ${fmt(offBlock, 3)}`);
    for (const k of sectorNames) { const S = res.sectors[k]; log(`sector ${k}: z/in-plane cross ${fmt(S.z_inplane_cross, 3)}`);
      for (const m of S.matches) log(`   predicted ${cstr(m.predicted)}   nearest root ${cstr(m.nearest_root)}   |diff| ${fmt(m.distance, 3)}   inverse-iteration gap ${fmt(m.inverse_iteration_gap, 3)}`); }
  }
  return res;
}

// R1 determinant, signature and null vector across x
{
  const xs = [0.3, 0.457, 0.8, 0.999, 1, 1.001, 1.7, 3, 10]; const rows = [];
  for (const x of xs) { const { M } = assemble(ringPositions(x), [0, 1, 2, 3].map(() => [0, 0, 0]), SIG4); const d = det(M); const e = symEig(M); rows.push({ x, det_numeric: d, det_closed: closed.detM(x), neg: e.filter((v) => v < 0).length, min_eig: e[0] }); }
  const worst = Math.max(...rows.map((r) => Math.abs(r.det_numeric - r.det_closed)));
  check('R1 det M(x) = (1+(sqrt2-1)/x)(1-1/x)(1+sqrt2/x)^3 at 9 radii', worst < 1e-12, `max |diff| = ${fmt(worst, 3)}`);
  check('R1 signature: positive definite for x > 1, exactly one negative eigenvalue for x < 1', rows.every((r) => (r.x > 1 ? r.neg === 0 : r.x < 1 ? r.neg === 1 : true)), rows.map((r) => `x=${r.x}:neg=${r.neg}`).join(' '));
  const { M } = assemble(ringPositions(1), [0, 1, 2, 3].map(() => [0, 0, 0]), SIG4); const nvec = [1, 0, 0, 0, -1, 0, -1, 0, 0, 0, 1, 0]; // alpha_m = (-1)^m radial: rho_0, -rho_1, rho_2, -rho_3 in Cartesian
  const Mn = M.map((r) => r.reduce((s, c, k) => s + c * nvec[k], 0));
  check('R1 null vector at x = 1: M n = 0 for n = (rho_0, -rho_1, rho_2, -rho_3) (k = 2 radial mode)', norm(Mn) < 1e-14, `||M n|| = ${fmt(norm(Mn), 3)}`);
  record.ring.determinant_table = rows;
}

// R2, R3 at the two requested radii (and the critical radius for balance only)
const results = {};
for (const x of [1.7, 0.8]) results[x] = analyseRing(x);
for (const x of [1.7, 0.8]) { const r = results[x];
  check(`R2 balance at x = ${x}: radial and tangential residuals and rdot, rddot vanish`, r.balance.radial_residual < 1e-13 && r.balance.tangential_residual < 1e-13 && r.balance.max_abs_rdot < 1e-15 && r.balance.max_abs_rddot < 1e-13, JSON.stringify(r.balance));
  check(`R3 sector decomposition at x = ${x}: off-block coupling below FD noise`, r.sector_off_block_max < 1e-8, `off-block ${fmt(r.sector_off_block_max, 3)}, FD step change ${fmt(r.jacobian_step_change, 3)}`);
  // A multiple root (0 is four-fold in the k0 block, +-i Omega double in the k1/k3 blocks) is resolved by a polynomial
  // root finder only to eps^(1/multiplicity); the inverse-iteration gap on the full 24 x 24 Jacobian is the decisive test.
  const tol = { simple: 2e-8, multiple: 1e-3 };
  let ok = true; const bad = [];
  for (const k of Object.keys(r.sectors)) for (const m of r.sectors[k].matches) { const isMultiple = cabs(m.predicted) < 1e-12 || cabs(csub(m.predicted, C(0, r.closed.Omega))) < 1e-12 || cabs(csub(m.predicted, C(0, -r.closed.Omega))) < 1e-12; const t = isMultiple ? tol.multiple : tol.simple; if (m.distance > t || m.inverse_iteration_gap > 1e-6) { ok = false; bad.push(`${k}:${cstr(m.predicted, 6)} d=${fmt(m.distance, 2)} gap=${fmt(m.inverse_iteration_gap, 2)}`); } }
  check(`R3 all 24 closed-form eigenvalues at x = ${x} are roots of the numerically assembled Jacobian`, ok, bad.join('; ') || 'simple roots to <= 2e-8 by characteristic polynomial, every root to <= 1e-6 by inverse iteration');
}
// balance-only at the critical radius and x = 0.3 (no spectrum requested there)
const tableXs = [1.7, 0.8, (2 * SQ2 - 1) / 4, 0.3];
record.ring.reference_table = tableXs.map((x) => { const Om = Math.sqrt(closed.Omega2(x)); const cf = sectorClosedForms(x); return { x, Omega2: closed.Omega2(x), Omega: Om, period: 2 * Math.PI / Om, speed: x * Om, detM: closed.detM(x), m0: closed.m0(x), growth_k2: Math.max(...cf.k2_inplane.map((z) => z.re)), growth_k1k3: Math.max(...cf.k1_inplane.map((z) => z.re)), breathing_frequency: Om / Math.sqrt(closed.m0(x)), k2_oscillation: cf.k2_inplane.filter((z) => Math.abs(z.re) < 1e-12).map((z) => Math.abs(z.im)), k1_imag: cf.k1_inplane.slice(2).map((z) => z.im), z_frequencies: { k0: 0, k1_k3: closed.wz1(x), k2: closed.wz2(x) } }; });
{ const xc = (2 * SQ2 - 1) / 4; const r = analyseRing(xc, { verbose: false }); check('R2 critical radius x_c = (2 sqrt2 - 1)/4: v = c_f exactly, balance residual zero', Math.abs(r.speed - 1) < 1e-14 && r.balance.radial_residual < 1e-12, `v = ${fmt(r.speed, 16)}`);
  const r3 = analyseRing(0.3, { verbose: false }); check('R2 x = 0.3 balance holds; v > c_f (admissible under the unrestricted label only)', r3.balance.radial_residual < 1e-12 && r3.speed > 1, `v = ${fmt(r3.speed)}`); }

// R4 invariants along an RK4 trajectory (inertial frame) from a perturbed ring
log('\n=== Invariants along a short RK4 trajectory (inertial frame, x = 1.7, perturbed ring) ===');
{
  const x = 1.7, Om = Math.sqrt(closed.Omega2(x)); const X0 = ringPositions(x).map((p) => p.map((c) => c + 0.02 * rnd())); const V0 = X0.map((p) => [-Om * p[1] + 0.02 * rnd(), Om * p[0] + 0.02 * rnd(), 0.02 * rnd()]);
  const rhs = (s) => { const X = [0, 1, 2, 3].map((m) => s.slice(3 * m, 3 * m + 3)), V = [0, 1, 2, 3].map((m) => s.slice(12 + 3 * m, 15 + 3 * m)); const { a } = accelerations(X, V, SIG4); return [...V.flat(), ...a]; };
  const invariants = (s) => { const X = [0, 1, 2, 3].map((m) => s.slice(3 * m, 3 * m + 3)), V = [0, 1, 2, 3].map((m) => s.slice(12 + 3 * m, 15 + 3 * m));
    const P = [0, 1, 2].map((c) => V.reduce((t, v) => t + v[c], 0)); const L = [0, 0, 0]; let E = 0;
    for (let i = 0; i < 4; i++) { L[0] += X[i][1] * V[i][2] - X[i][2] * V[i][1]; L[1] += X[i][2] * V[i][0] - X[i][0] * V[i][2]; L[2] += X[i][0] * V[i][1] - X[i][1] * V[i][0]; E += 0.5 * (V[i][0] ** 2 + V[i][1] ** 2 + V[i][2] ** 2);
      for (let j = i + 1; j < 4; j++) { const d = [0, 1, 2].map((c) => X[i][c] - X[j][c]); const r = Math.hypot(...d); const w = [0, 1, 2].map((c) => V[i][c] - V[j][c]); const rdot = (d[0] * w[0] + d[1] * w[1] + d[2] * w[2]) / r; E += (SIG4[i][j] * K / r) * (1 - 0.5 * MU * rdot * rdot / (CF * CF)); } }
    return { P, L, E }; };
  const run = (dt, T) => { let s = [...X0.flat(), ...V0.flat()]; const n = Math.round(T / dt); for (let i = 0; i < n; i++) { const k1 = rhs(s), s2 = s.map((c, k) => c + 0.5 * dt * k1[k]), k2 = rhs(s2), s3 = s.map((c, k) => c + 0.5 * dt * k2[k]), k3 = rhs(s3), s4 = s.map((c, k) => c + dt * k3[k]), k4 = rhs(s4); s = s.map((c, k) => c + dt / 6 * (k1[k] + 2 * k2[k] + 2 * k3[k] + k4[k])); } return s; };
  const I0 = invariants([...X0.flat(), ...V0.flat()]); const T = 2.0; const drift = {};
  for (const dt of [0.02, 0.01]) { const I1 = invariants(run(dt, T)); drift[dt] = { dP: norm(I1.P.map((c, k) => c - I0.P[k])), dL: norm(I1.L.map((c, k) => c - I0.L[k])), dE: Math.abs(I1.E - I0.E) }; log(`dt = ${dt}: |dP| = ${fmt(drift[dt].dP, 3)}  |dL| = ${fmt(drift[dt].dL, 3)}  |dE| = ${fmt(drift[dt].dE, 3)}  (E0 = ${fmt(I0.E)})`); }
  check('R4 sum V and angular momentum conserved to roundoff; energy drift falls ~16x on halving dt (RK4 order)', drift[0.02].dP < 1e-13 && drift[0.02].dL < 1e-12 && drift[0.01].dE < drift[0.02].dE / 8, `ratio dE(0.02)/dE(0.01) = ${fmt(drift[0.02].dE / drift[0.01].dE, 4)}`);
  record.ring.invariant_drift = drift;
  // symmetric breathing sector: equal radial velocity for all four; check the symmetry is preserved and the reduced energy is conserved
  const Xb = ringPositions(x), vb = 0.15; const Vb = Xb.map((p, m) => { const th = m * Math.PI / 2; return [vb * Math.cos(th) - Om * p[1], vb * Math.sin(th) + Om * p[0], 0]; });
  const Ered = (s) => { const X = [0, 1, 2, 3].map((m) => s.slice(3 * m, 3 * m + 3)), V = [0, 1, 2, 3].map((m) => s.slice(12 + 3 * m, 15 + 3 * m)); const rho = Math.hypot(X[0][0], X[0][1]); const er = [X[0][0] / rho, X[0][1] / rho]; const rd = V[0][0] * er[0] + V[0][1] * er[1]; const l = 4 * (X[0][0] * V[0][1] - X[0][1] * V[0][0]); return { rho, E: 2 * (1 + (SQ2 - 1) * K / rho) * rd * rd + l * l / (8 * rho * rho) - (2 * SQ2 - 1) * K / rho, l }; };
  let s = [...Xb.flat(), ...Vb.flat()]; const E0 = Ered(s); const dt = 0.005; let asym = 0;
  for (let i = 0; i < 600; i++) { const k1 = rhs(s), s2 = s.map((c, k) => c + 0.5 * dt * k1[k]), k2 = rhs(s2), s3 = s.map((c, k) => c + 0.5 * dt * k2[k]), k3 = rhs(s3), s4 = s.map((c, k) => c + dt * k3[k]), k4 = rhs(s4); s = s.map((c, k) => c + dt / 6 * (k1[k] + 2 * k2[k] + 2 * k3[k] + k4[k]));
    const r0 = Math.hypot(s[0], s[1]); for (let m = 1; m < 4; m++) asym = Math.max(asym, Math.abs(Math.hypot(s[3 * m], s[3 * m + 1]) - r0), Math.abs(s[3 * m + 2])); }
  const E1 = Ered(s); log(`breathing sector: rho ${fmt(E0.rho, 6)} -> ${fmt(E1.rho, 6)}, reduced energy ${fmt(E0.E)} -> ${fmt(E1.E)}, l ${fmt(E0.l)} -> ${fmt(E1.l)}, max radius asymmetry ${fmt(asym, 3)}`);
  check('R4 symmetric breathing sector stays symmetric and conserves the reduced energy 2 m0(rho) rhodot^2 + l^2/(8 rho^2) - (2 sqrt2 - 1)K/rho', asym < 1e-12 && Math.abs(E1.E - E0.E) < 1e-9 && Math.abs(E1.l - E0.l) < 1e-12, `dE_red = ${fmt(E1.E - E0.E, 3)}`);
}

// R5 reference table
log('\n=== Reference table (closed forms; measured values above agree to the stated digits) ===');
for (const row of record.ring.reference_table) log(`x = ${fmt(row.x, 10)}  Omega = ${fmt(row.Omega, 10)}  period = ${fmt(row.period, 10)}  v = ${fmt(row.speed, 10)}  detM = ${fmt(row.detM, 10)}  growth k2 = ${fmt(row.growth_k2, 10)}  growth k1/k3 = ${fmt(row.growth_k1k3, 10)}  breathing freq = ${fmt(row.breathing_frequency, 10)}  z freqs k1/k3 = ${fmt(row.z_frequencies.k1_k3, 10)}, k2 = ${fmt(row.z_frequencies.k2, 10)}`);

record.ring.analyses = results; record.failures = failures;
if (OUT) { mkdirSync(OUT, { recursive: true }); const p = join(OUT, 'ring-reference-record.json'); writeFileSync(p, JSON.stringify(record, (k, v) => (typeof v === 'number' && !isFinite(v) ? String(v) : v), 1)); log(`\nrecord written: ${p}`); }
log(`\n${failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED'}`);
process.exit(failures === 0 ? 0 : 1);
