#!/usr/bin/env node
// darwin-overnight reduction, round 2 (2026-10-05): closed form of the common-centre block of the
// rotating-frame linearization about the opposite-polarity circle, and the finite-difference artefact check.
//
// Closed form (derived in Section 7 of the investigation file). With B = (I + M_0)^{-1} = diag(b1, b2, b2),
// b1 = r0/(r0-1), b2 = 2 r0/(2 r0-1), kappa = b1/b2, J the in-plane rotation generator and Omega the orbital rate,
// the common in-plane block in rotating coordinates (Y_x, Y_y, W_x, W_y), W = dY/dT, is
//   A = [[0, I], [Omega^2 diag(kappa, 1/kappa), Omega [[0, 1+kappa], [-(1+1/kappa), 0]]]],
// with characteristic polynomial (lambda^2 + Omega^2)^2 identically in kappa, and a size-two Jordan block at each of
// +i Omega and -i Omega: (A^2 + Omega^2 I) != 0 but (A^2 + Omega^2 I)^2 = 0.
// Checks: (1) A agrees with the finite-difference Jacobian's common in-plane block (spot-check.mjs route) up to the
// finite-difference error delta(eps); (2) the char poly of A is (lambda^2+Omega^2)^2 to round-off; (3) the nilpotency
// test; (4) the eigenvalue split reported by the char-poly/Durand-Kerner route on the finite-difference block scales
// like sqrt(delta), and the exact A gives a split at the square root of round-off only; (5) an explicit rank-one
// perturbation of A of size delta splits the pair by sqrt(c delta) with c the Jordan coupling.
import { hessianH, vectorG, solve, circle } from '../../../reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-reduction-predictions.mjs';

const flat = (A) => A.flat(); const unflat = (v) => { const o = []; for (let i = 0; i < v.length; i += 3) o.push([v[i], v[i + 1], v[i + 2]]); return o; };
const mul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((v, j) => v + B[i][j]));
const scal = (c, A) => A.map((row) => row.map((v) => c * v));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));

function rotatingField(state, Om, sigma) {
  const Y = unflat(state.slice(0, 6)), W = unflat(state.slice(6, 12));
  const cross = (o, y) => [-o * y[1], o * y[0], 0];
  const V = Y.map((y, i) => W[i].map((c, a) => c + cross(Om, y)[a]));
  const A = unflat(solve(hessianH(Y, sigma), vectorG(Y, V, sigma)));
  const Ydd = A.map((ai, i) => ai.map((c, a) => c - 2 * cross(Om, W[i])[a] - cross(Om, cross(Om, Y[i]))[a]));
  return [...flat(W), ...flat(Ydd)];
}
function jacobian(f, s0, eps) {
  const n = s0.length; const J = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let j = 0; j < n; j++) { const sp = s0.slice(), sm = s0.slice(); sp[j] += eps; sm[j] -= eps; const fp = f(sp), fm = f(sm); for (let i = 0; i < n; i++) J[i][j] = (fp[i] - fm[i]) / (2 * eps); }
  return J;
}
function charPoly(M) { // Faddeev-LeVerrier
  const n = M.length; let Mk = M.map((r) => r.slice()); const c = [1]; let Ak = M.map((r) => r.slice());
  for (let k = 1; k <= n; k++) { if (k > 1) Ak = mul(M, Mk); const tr = Ak.reduce((s, row, i) => s + row[i], 0); const ck = -tr / k; c.push(ck); Mk = Ak.map((row, i) => row.map((v, j) => v + (i === j ? ck : 0))); }
  return c;
}
function rootsDK(c) {
  const n = c.length - 1; let z = Array.from({ length: n }, (_, k) => [Math.cos(2 * Math.PI * k / n + 0.4) * 0.9, Math.sin(2 * Math.PI * k / n + 0.4) * 0.9]);
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]; const cd = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const pev = (x) => { let r = [1, 0]; for (let k = 1; k <= n; k++) r = [cm(r, x)[0] + c[k], cm(r, x)[1]]; return r; };
  for (let it = 0; it < 5000; it++) {
    const nz = z.map((zi, i) => { let den = [1, 0]; z.forEach((zj, j) => { if (j !== i) den = cm(den, [zi[0] - zj[0], zi[1] - zj[1]]); }); const q = cd(pev(zi), den); return [zi[0] - q[0], zi[1] - q[1]]; });
    let d = 0; nz.forEach((v, i) => { d = Math.max(d, Math.hypot(v[0] - z[i][0], v[1] - z[i][1])); }); z = nz; if (d < 1e-17) break;
  }
  return z;
}
function restrict(J, basis) { const JB = basis.map((b) => J.map((row) => row.reduce((s, v, j) => s + v * b[j], 0))); return basis.map((bi) => JB.map((jb) => jb.reduce((s, v, k) => s + v * bi[k], 0))); }
function unitvec(idx) { const v = new Array(12).fill(0); idx.forEach(([i, c]) => { v[i] = c; }); const nn = Math.hypot(...v); return v.map((x) => x / nn); }
const q = Math.SQRT1_2;
const commonInPlane = [unitvec([[0, q], [3, q]]), unitvec([[1, q], [4, q]]), unitvec([[6, q], [9, q]]), unitvec([[7, q], [10, q]])];

function exactCommonBlock(r0, Om) {
  const b1 = r0 / (r0 - 1), b2 = 2 * r0 / (2 * r0 - 1), k = b1 / b2;
  return { b1, b2, kappa: k, A: [
    [0, 0, 1, 0],
    [0, 0, 0, 1],
    [Om * Om * k, 0, 0, Om * (1 + k)],
    [0, Om * Om / k, -Om * (1 + 1 / k), 0],
  ] };
}
// split of the char-poly roots about +-i Omega: max over roots of | |im| - Omega | / Omega, and max |re| / Omega
function splitOf(A, Om) {
  const ev = rootsDK(charPoly(A));
  return { maxRelImSplit: Math.max(...ev.map(([, im]) => Math.abs(Math.abs(im) - Om))) / Om, maxRelRe: Math.max(...ev.map(([re]) => Math.abs(re))) / Om, roots: ev.map(([re, im]) => [re / Om, im / Om]) };
}

const out = {};
for (const r0 of [100, 25]) {
  const c = circle(r0, true); const Om = c.angularRate; const sigma = () => -1;
  const s0 = [r0 / 2, 0, 0, -r0 / 2, 0, 0, 0, 0, 0, 0, 0, 0];
  const { b1, b2, kappa, A } = exactCommonBlock(r0, Om);
  const rec = { r0, Omega: Om, b1, b2, kappa };
  // (2) characteristic polynomial of the exact block against (lambda^2 + Omega^2)^2 = lambda^4 + 2 Omega^2 lambda^2 + Omega^4
  const cp = charPoly(A); const target = [1, 0, 2 * Om * Om, 0, Om ** 4];
  rec.charPolyExact = cp; rec.charPolyTarget = target; rec.charPolyMaxRelDev = Math.max(...cp.map((v, i) => Math.abs(v - target[i]) / Math.max(Math.abs(target[i]), Om ** i)));
  // (3) nilpotency: Nn = A^2 + Omega^2 I; Nn != 0, Nn^2 = 0
  const Nn = add(mul(A, A), scal(Om * Om, eye(4))); const Nn2 = mul(Nn, Nn);
  rec.jordanTest = { normN_overOmega2: maxAbs(Nn) / (Om * Om), normN2_overOmega4: maxAbs(Nn2) / Om ** 4, rankDeficiencyNote: 'N != 0 and N^2 = 0 means minimal polynomial (lambda^2+Omega^2)^2: one Jordan block of size two at each of +i Omega, -i Omega' };
  // (4) split of the exact block (round-off only) versus finite-difference blocks at several step sizes
  rec.exactBlockSplit = splitOf(A, Om);
  rec.finiteDifference = [];
  for (const eps of [1e-3, 1e-4, 1e-5, 1e-6, 1e-7, 1e-8]) {
    const Jfd = jacobian((s) => rotatingField(s, Om, sigma), s0, eps);
    const R = restrict(Jfd, commonInPlane);
    const delta = maxAbs(add(R, scal(-1, A))); // absolute Jacobian error (entries of A scale as 1, Omega, Omega^2)
    const E = add(R, scal(-1, A));
    // Jordan coupling estimate: for a size-two block, the split is sqrt(l E w) with l, w the left/right chain vectors.
    const sp = splitOf(R, Om);
    rec.finiteDifference.push({ eps, deltaMaxAbs: delta, deltaRelOmega2: delta / (Om * Om), splitRel: sp.maxRelImSplit, maxRelRe: sp.maxRelRe, splitRelSquared_over_deltaRelOmega2: sp.maxRelImSplit ** 2 / (delta / (Om * Om)), E_lowerLeft: [E[2][0], E[2][1], E[3][0], E[3][1]] });
  }
  // (5) controlled perturbation of the exact block: add d * Omega^2 to the (W_x <- Y_y) entry and follow the split
  rec.controlledPerturbation = [1e-6, 1e-8, 1e-10, 1e-12].map((d) => {
    const Ap = A.map((row) => row.slice()); Ap[2][1] += d * Om * Om;
    const sp = splitOf(Ap, Om); return { dRelOmega2: d, splitRel: sp.maxRelImSplit, splitRel_over_sqrtd: sp.maxRelImSplit / Math.sqrt(d) };
  });
  out['r0=' + r0] = rec;
}
// (6) first-order decoupling and triangularity in (Y, p) coordinates: p = 2 B^{-1} (W + Omega J Y) is the rotating-frame
// image of the conserved P; the exact block in (Y, p) is [[-Omega J, B/2], [0, -Omega J]].  Check by similarity.
{
  const r0 = 100; const c = circle(r0, true); const Om = c.angularRate; const { b1, b2, A } = exactCommonBlock(r0, Om);
  // S maps (Y, p) -> (Y, W): W = B p / 2 - Omega J Y
  const Jm = [[0, -1], [1, 0]];
  const S = [[1, 0, 0, 0], [0, 1, 0, 0], [-Om * Jm[0][0], -Om * Jm[0][1], b1 / 2, 0], [-Om * Jm[1][0], -Om * Jm[1][1], 0, b2 / 2]];
  const Sinv = [[1, 0, 0, 0], [0, 1, 0, 0], [2 * Om * Jm[0][0] / b1, 2 * Om * Jm[0][1] / b1, 2 / b1, 0], [2 * Om * Jm[1][0] / b2, 2 * Om * Jm[1][1] / b2, 0, 2 / b2]];
  const T = mul(Sinv, mul(A, S));
  const Ttarget = [[0, Om, b1 / 2, 0], [-Om, 0, 0, b2 / 2], [0, 0, 0, Om], [0, 0, -Om, 0]];
  out.triangularFormCheck = { r0, maxAbsDev: maxAbs(add(T, scal(-1, Ttarget))), T, note: 'S^{-1} A S equals [[-Omega J, B/2],[0, -Omega J]]: block upper triangular, eigenvalues those of -Omega J twice, independent of B' };
}
console.log(JSON.stringify(out, (k, v) => (typeof v === 'number' ? Number(v.toPrecision(10)) : v), 2));
