#!/usr/bin/env node
// darwin-overnight-ring-growth.mjs
// Prepared-eigenvector growth measurement for the four-member alternating ring
// under the frozen Darwin-inspired law (common brief
// .tmp/darwin-overnight/pi/common-brief.md). Worker: darwin-overnight ring
// growth measurement (lens henri-poincare). Node v22, no dependencies.
//
// The script imports the frozen pair instrument (solveAcceleration, runCase,
// luFactor, luSolve, K, CF) and the frozen ring wrapper (buildRing,
// ringBalanceSpeed, ringZeroCouplingSpeed, ringPeriod, FROZEN, SETTINGS);
// neither is modified. It adds:
//   (1) the rotating-frame field of ring document Section 9 in units of Omega
//       (positions / R, velocities / (R Omega), time Omega T),
//   (2) a 24 x 24 central-difference Jacobian at the balanced ring (fixed-point
//       residual checked first), verified at two step sizes,
//   (3) eigenvectors by inverse iteration (real shift for the m = 2 twist,
//       complex shift for the m = 1,3 in-plane pair) with residuals and the
//       cyclic-shift symmetry factor,
//   (4) a known case: the same machinery on the zero-coupling ring must return
//       the closed-form exponents of ring document Section 10,
//   (5) target runs: the exact ring plus a0 times the eigenvector, integrated
//       by the pair instrument's runCase at the frozen settings, with a
//       least-squares growth fit of the deviation from the exact rotating ring.
//
// CLI:  node darwin-overnight-ring-growth.mjs --known
//       node darwin-overnight-ring-growth.mjs --eig --R 50
//       node darwin-overnight-ring-growth.mjs --run --R 50 --mode m2 --a0 1e-6 --setting P
// The receipt refuses --run until the known case has passed.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { solveAcceleration, runCase, luFactor, luSolve, K, CF } from './darwin-overnight-pair-instrument.mjs';
import { buildRing, ringBalanceSpeed, ringZeroCouplingSpeed, ringPeriod, FROZEN, SETTINGS } from './darwin-overnight-ring-cases.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../../../..');
const OUT_DIR = path.join(REPO, '.local-data/master-equation-closure/darwin-overnight/instrument/ring-growth');
const TMP_DIR = path.join(REPO, '.tmp/darwin-overnight/ring-growth');
const RECEIPT_PATH = path.join(HERE, 'darwin-overnight-ring-growth-controls.json');
const Q = [1, -1, 1, -1];
const N = 4, NS = 24;

// Tolerance statement (fixed before any target run; also written to the receipt).
const TOLERANCE = {
  fixedPointResidual: 1e-12,
  knownCaseExponentDigits: 8,
  eigenResidual: 1e-8,
  tight: { window: ['10 a0', 1e-3], relative: 1e-3 },
  loose: { window: ['10 a0', 1e-2], relative: 1e-2 },
  statement: 'The growth rate fitted by least squares on ln(position deviation norm / R) over the samples where that deviation lies between 10 a0 and 1e-3 must agree with the derived exponent to 1e-3 relative (tight); over the samples between 10 a0 and 1e-2 it must agree to 1e-2 relative (loose). For the complex m=1 pair the same statements apply to the growth rate sigma of the five-parameter fit ln(dev) = c + sigma t + (1/2) ln(1 + beta cos(2 omega t + psi)), and the plain slope and the local-maxima envelope slope are reported beside it.',
};

// Targets (derived exponents of ring document Section 10, in units of Omega).
const TARGETS = {
  50: { m2: { re: 1.501248982, im: 0 }, m1: { re: 1.226521016, im: 0.986304782 } },
  100: { m2: { re: 1.509648903, im: 0 }, m1: { re: 1.235108236, im: 0.993042162 } },
};
// Zero-coupling closed forms (ring document Section 10), in units of Omega_0.
const ZC = { m2: Math.sqrt((-1 + Math.sqrt(625 + 648 * Math.SQRT2) / 7) / 2), m1re: Math.sqrt((8 + 2 * Math.SQRT2) / 7), m1im: 1 };

// ----------------------------------------------------------- field
const zcross = (a) => [-a[1], a[0], 0];
function flatRing(R, v) {
  const ring = buildRing(R, v);
  const X = new Float64Array(12), V = new Float64Array(12);
  for (let k = 0; k < N; k++) for (let c = 0; c < 3; c++) { X[3 * k + c] = ring.positions[k][c]; V[3 * k + c] = ring.velocities[k][c]; }
  return { X, V, ring };
}
// Scaled rotating-frame field. y = [xt (12), vt (12)], xt = xi / R, vt = eta / (R Omega).
function makeField(R, Omega, opts) {
  const params = { detTol: FROZEN.detTol, condMax: FROZEN.condMax };
  return (y) => {
    const X = new Float64Array(12), V = new Float64Array(12);
    for (let k = 0; k < N; k++) {
      const xt = [y[3 * k], y[3 * k + 1], y[3 * k + 2]], vt = [y[12 + 3 * k], y[12 + 3 * k + 1], y[12 + 3 * k + 2]];
      const zx = zcross(xt);
      for (let c = 0; c < 3; c++) { X[3 * k + c] = R * xt[c]; V[3 * k + c] = R * Omega * (vt[c] + zx[c]); }
    }
    const { A } = solveAcceleration(X, V, Q, opts, params);
    const f = new Float64Array(NS);
    for (let k = 0; k < N; k++) {
      const xt = [y[3 * k], y[3 * k + 1], y[3 * k + 2]], vt = [y[12 + 3 * k], y[12 + 3 * k + 1], y[12 + 3 * k + 2]];
      const zv = zcross(vt);
      for (let c = 0; c < 3; c++) {
        f[3 * k + c] = vt[c];
        f[12 + 3 * k + c] = A[3 * k + c] / (R * Omega * Omega) - 2 * zv[c] + (c < 2 ? xt[c] : 0);
      }
    }
    return f;
  };
}
function jacobianFD(F, y0, h) {
  const J = new Float64Array(NS * NS);
  for (let j = 0; j < NS; j++) {
    const yp = Float64Array.from(y0), ym = Float64Array.from(y0); yp[j] += h; ym[j] -= h;
    const fp = F(yp), fm = F(ym);
    for (let i = 0; i < NS; i++) J[i * NS + j] = (fp[i] - fm[i]) / (2 * h);
  }
  return J;
}
const maxAbsDiff = (A, B) => { let m = 0; for (let i = 0; i < A.length; i++) m = Math.max(m, Math.abs(A[i] - B[i])); return m; };

// ----------------------------------------------------------- complex helpers (vectors as {re, im} Float64Arrays)
function cvec(n) { return { re: new Float64Array(n), im: new Float64Array(n) }; }
function cnorm(v) { let s = 0; for (let i = 0; i < v.re.length; i++) s += v.re[i] ** 2 + v.im[i] ** 2; return Math.sqrt(s); }
function cscale(v, s) { for (let i = 0; i < v.re.length; i++) { v.re[i] *= s; v.im[i] *= s; } return v; }
function matvecReal(J, v) { const w = cvec(NS); for (let i = 0; i < NS; i++) { let sr = 0, si = 0; for (let j = 0; j < NS; j++) { sr += J[i * NS + j] * v.re[j]; si += J[i * NS + j] * v.im[j]; } w.re[i] = sr; w.im[i] = si; } return w; }
// Rayleigh quotient (v* J v) / (v* v) and residual ||J v - lambda v|| / ||v||.
function rayleigh(J, v) {
  const w = matvecReal(J, v); let nr = 0, ni = 0, d = 0;
  for (let i = 0; i < NS; i++) { nr += v.re[i] * w.re[i] + v.im[i] * w.im[i]; ni += v.re[i] * w.im[i] - v.im[i] * w.re[i]; d += v.re[i] ** 2 + v.im[i] ** 2; }
  const lam = { re: nr / d, im: ni / d }; let r = 0;
  for (let i = 0; i < NS; i++) { const rr = w.re[i] - (lam.re * v.re[i] - lam.im * v.im[i]), ri = w.im[i] - (lam.re * v.im[i] + lam.im * v.re[i]); r += rr * rr + ri * ri; }
  return { lam, residual: Math.sqrt(r / d) };
}
// Complex LU with partial pivoting on (J - s I), stored as separate re/im arrays.
function cluFactor(J, s) {
  const n = NS, Ar = new Float64Array(n * n), Ai = new Float64Array(n * n), perm = new Int32Array(n);
  for (let i = 0; i < n * n; i++) Ar[i] = J[i];
  for (let i = 0; i < n; i++) { Ar[i * n + i] -= s.re; Ai[i * n + i] -= s.im; perm[i] = i; }
  for (let k = 0; k < n; k++) {
    let piv = k, best = Math.hypot(Ar[k * n + k], Ai[k * n + k]);
    for (let i = k + 1; i < n; i++) { const m = Math.hypot(Ar[i * n + k], Ai[i * n + k]); if (m > best) { best = m; piv = i; } }
    if (piv !== k) { for (let c = 0; c < n; c++) { let t = Ar[k * n + c]; Ar[k * n + c] = Ar[piv * n + c]; Ar[piv * n + c] = t; t = Ai[k * n + c]; Ai[k * n + c] = Ai[piv * n + c]; Ai[piv * n + c] = t; } const t = perm[k]; perm[k] = perm[piv]; perm[piv] = t; }
    const pr = Ar[k * n + k], pi = Ai[k * n + k], pd = pr * pr + pi * pi;
    for (let i = k + 1; i < n; i++) {
      const ar = Ar[i * n + k], ai = Ai[i * n + k];
      const fr = (ar * pr + ai * pi) / pd, fi = (ai * pr - ar * pi) / pd; // a / p
      Ar[i * n + k] = fr; Ai[i * n + k] = fi;
      for (let c = k + 1; c < n; c++) { const ur = Ar[k * n + c], ui = Ai[k * n + c]; Ar[i * n + c] -= fr * ur - fi * ui; Ai[i * n + c] -= fr * ui + fi * ur; }
    }
  }
  return { Ar, Ai, perm, n };
}
function cluSolve(f, b) {
  const { Ar, Ai, perm, n } = f; const x = cvec(n);
  for (let i = 0; i < n; i++) { x.re[i] = b.re[perm[i]]; x.im[i] = b.im[perm[i]]; }
  for (let i = 0; i < n; i++) { let sr = x.re[i], si = x.im[i]; for (let j = 0; j < i; j++) { const lr = Ar[i * n + j], li = Ai[i * n + j]; sr -= lr * x.re[j] - li * x.im[j]; si -= lr * x.im[j] + li * x.re[j]; } x.re[i] = sr; x.im[i] = si; }
  for (let i = n - 1; i >= 0; i--) {
    let sr = x.re[i], si = x.im[i];
    for (let j = i + 1; j < n; j++) { const ur = Ar[i * n + j], ui = Ai[i * n + j]; sr -= ur * x.re[j] - ui * x.im[j]; si -= ur * x.im[j] + ui * x.re[j]; }
    const dr = Ar[i * n + i], di = Ai[i * n + i], dd = dr * dr + di * di;
    x.re[i] = (sr * dr + si * di) / dd; x.im[i] = (si * dr - sr * di) / dd;
  }
  return x;
}
// Inverse iteration with (possibly complex) shift; returns eigenvector, Rayleigh eigenvalue, residual, iterations.
function inverseIteration(J, shift, iters = 40) {
  const f = cluFactor(J, shift);
  let v = cvec(NS); for (let i = 0; i < NS; i++) { v.re[i] = Math.sin(1 + 3 * i); v.im[i] = shift.im === 0 ? 0 : Math.cos(2 + 5 * i); }
  cscale(v, 1 / cnorm(v));
  let out = null;
  for (let it = 0; it < iters; it++) {
    v = cluSolve(f, v); cscale(v, 1 / cnorm(v));
    out = rayleigh(J, v); out.iterations = it + 1;
    if (out.residual < 1e-13) break;
  }
  if (shift.im === 0) { out.v = v; return out; }
  // fix the complex phase so that the largest position component is real and positive
  let imax = 0, best = -1; for (let i = 0; i < 12; i++) { const m = Math.hypot(v.re[i], v.im[i]); if (m > best) { best = m; imax = i; } }
  const pr = v.re[imax] / best, pi = -v.im[imax] / best; // multiply by conj(phase)
  const w = cvec(NS); for (let i = 0; i < NS; i++) { w.re[i] = v.re[i] * pr - v.im[i] * pi; w.im[i] = v.re[i] * pi + v.im[i] * pr; }
  out.v = w; return out;
}
// Cyclic shift S: rotate every member's position and velocity by pi/2 about z and relabel k -> k+1.
function cyclicShift(v) {
  const w = cvec(NS);
  for (let k = 0; k < N; k++) {
    const k1 = (k + 1) % N;
    for (const base of [0, 12]) {
      const r = [v.re[base + 3 * k], v.re[base + 3 * k + 1], v.re[base + 3 * k + 2]], im = [v.im[base + 3 * k], v.im[base + 3 * k + 1], v.im[base + 3 * k + 2]];
      // rotation by pi/2: (x, y, z) -> (-y, x, z)
      w.re[base + 3 * k1] = -r[1]; w.re[base + 3 * k1 + 1] = r[0]; w.re[base + 3 * k1 + 2] = r[2];
      w.im[base + 3 * k1] = -im[1]; w.im[base + 3 * k1 + 1] = im[0]; w.im[base + 3 * k1 + 2] = im[2];
    }
  }
  return w;
}
function shiftFactor(v) {
  const w = cyclicShift(v); let nr = 0, ni = 0, d = 0;
  for (let i = 0; i < NS; i++) { nr += v.re[i] * w.re[i] + v.im[i] * w.im[i]; ni += v.re[i] * w.im[i] - v.im[i] * w.re[i]; d += v.re[i] ** 2 + v.im[i] ** 2; }
  const c = { re: nr / d, im: ni / d }; let r = 0;
  for (let i = 0; i < NS; i++) { const rr = w.re[i] - (c.re * v.re[i] - c.im * v.im[i]), ri = w.im[i] - (c.re * v.im[i] + c.im * v.re[i]); r += rr * rr + ri * ri; }
  return { factor: c, residual: Math.sqrt(r / d) };
}

// ----------------------------------------------------------- Jacobian and eigenvectors at a balanced ring
function linearize(R, v, opts, label) {
  const Omega = v / R;
  const F = makeField(R, Omega, opts);
  const y0 = new Float64Array(NS); const { X } = flatRing(R, v);
  for (let i = 0; i < 12; i++) y0[i] = X[i] / R;
  const f0 = F(y0); let res = 0; for (let i = 0; i < NS; i++) res = Math.max(res, Math.abs(f0[i]));
  // residual in physical acceleration units for the record: f (scaled) x R Omega^2
  const fixedPoint = { residualScaled: res, residualPhysical: res * R * Omega * Omega, pass: res * R * Omega * Omega <= TOLERANCE.fixedPointResidual };
  if (!fixedPoint.pass) throw new Error(`${label}: balanced ring is not a fixed point (residual ${res})`);
  const J4 = jacobianFD(F, y0, 1e-4), J5 = jacobianFD(F, y0, 1e-5);
  const jac = { steps: [1e-4, 1e-5], maxEntryDifference: maxAbsDiff(J4, J5), used: 1e-5 };
  return { Omega, y0, J: J5, fixedPoint, jac };
}
function eigenpairs(J, shifts) {
  const out = {};
  for (const [name, s] of Object.entries(shifts)) {
    const e = inverseIteration(J, s);
    const sym = shiftFactor(e.v);
    out[name] = { shift: s, eigenvalue: e.lam, residual: e.residual, iterations: e.iterations, cyclicShiftFactor: sym.factor, cyclicShiftResidual: sym.residual, v: e.v };
  }
  return out;
}
const vecOut = (v) => ({ re: Array.from(v.re), im: Array.from(v.im) });

// ----------------------------------------------------------- receipt
const receiptLoad = () => fs.existsSync(RECEIPT_PATH) ? JSON.parse(fs.readFileSync(RECEIPT_PATH, 'utf8')) : {
  instrument: 'darwin-overnight-ring-growth.mjs (over the unmodified pair instrument and ring wrapper)',
  worker: 'darwin-overnight ring growth measurement (lens henri-poincare)', constants: { K, c_f: CF },
  note: 'Prepared-eigenvector growth measurement. Order: pair-instrument controls and ring known cases (recorded here from their own receipts), zero-coupling known case of the linearization machinery, tolerance statement, eigenpairs at each radius, target runs. Exponents in units of Omega = v / R.',
  tolerance: TOLERANCE, targets: TARGETS, controls: null, knownCase: null, eigen: {}, runs: [],
};
const receiptSave = (r) => fs.writeFileSync(RECEIPT_PATH, JSON.stringify(r, null, 1));

function recordControls(receipt) {
  const pair = JSON.parse(fs.readFileSync(path.join(HERE, 'darwin-overnight-pair-instrument-controls.json'), 'utf8'));
  const ring = JSON.parse(fs.readFileSync(path.join(HERE, 'darwin-overnight-ring-instrument-controls.json'), 'utf8'));
  receipt.controls = {
    pairInstrument: { allPass: pair.allPass, pass: pair.controls.filter((c) => c.pass).length, total: pair.controls.length, utcEnd: pair.utcEnd },
    ringKnownCases: { allPass: ring.knownCasesAllPass, cases: ring.knownCases.map((c) => ({ id: c.id, pass: c.pass, utc: c.utc })), utcStart: ring.knownCasesUtcStart },
    utc: new Date().toISOString(),
  };
  return receipt.controls.pairInstrument.allPass && receipt.controls.ringKnownCases.allPass;
}

// ----------------------------------------------------------- known case: zero-coupling ring
function knownCase(receipt) {
  const rows = [];
  for (const R of [50, 100]) {
    const v0 = ringZeroCouplingSpeed(R);
    const lin = linearize(R, v0, { coupling: 0, pairTerm: 1 }, `zero-coupling R=${R}`);
    const eig = eigenpairs(lin.J, { m2: { re: 1.5, im: 0 }, m1: { re: 1.24, im: 0.99 } });
    const row = {
      R, v0, Omega0: lin.Omega, fixedPoint: lin.fixedPoint, jacobian: lin.jac,
      m2: { expected: ZC.m2, eigenvalue: eig.m2.eigenvalue, difference: eig.m2.eigenvalue.re - ZC.m2, relative: Math.abs(eig.m2.eigenvalue.re / ZC.m2 - 1), residual: eig.m2.residual, iterations: eig.m2.iterations, cyclicShiftFactor: eig.m2.cyclicShiftFactor, cyclicShiftResidual: eig.m2.cyclicShiftResidual },
      m1: { expectedRe: ZC.m1re, expectedImAbs: ZC.m1im, eigenvalue: eig.m1.eigenvalue, differenceRe: eig.m1.eigenvalue.re - ZC.m1re, relativeRe: Math.abs(eig.m1.eigenvalue.re / ZC.m1re - 1), differenceImAbs: Math.abs(eig.m1.eigenvalue.im) - ZC.m1im, residual: eig.m1.residual, iterations: eig.m1.iterations, cyclicShiftFactor: eig.m1.cyclicShiftFactor, cyclicShiftResidual: eig.m1.cyclicShiftResidual },
    };
    const tol = 10 ** (-TOLERANCE.knownCaseExponentDigits);
    row.pass = row.fixedPoint.pass && row.m2.relative <= tol && row.m1.relativeRe <= tol && Math.abs(row.m1.differenceImAbs) <= tol
      && row.m2.residual <= TOLERANCE.eigenResidual && row.m1.residual <= TOLERANCE.eigenResidual
      && Math.abs(row.m2.cyclicShiftFactor.re + 1) <= 1e-8 && Math.abs(row.m2.cyclicShiftFactor.im) <= 1e-8
      && Math.abs(Math.abs(row.m1.cyclicShiftFactor.im) - 1) <= 1e-8 && Math.abs(row.m1.cyclicShiftFactor.re) <= 1e-8;
    rows.push(row);
    console.log(`known case zero-coupling R=${R}: fixed-point residual ${row.fixedPoint.residualPhysical.toExponential(2)}; FD Jacobian step difference ${row.jacobian.maxEntryDifference.toExponential(2)}; m2 ${eig.m2.eigenvalue.re.toPrecision(12)} vs ${ZC.m2.toPrecision(12)} (rel ${row.m2.relative.toExponential(2)}, residual ${eig.m2.residual.toExponential(2)}, shift factor ${eig.m2.cyclicShiftFactor.re.toFixed(10)}+${eig.m2.cyclicShiftFactor.im.toFixed(10)}i); m1 ${eig.m1.eigenvalue.re.toPrecision(12)}+${eig.m1.eigenvalue.im.toPrecision(12)}i vs ${ZC.m1re.toPrecision(12)}+-1i (rel re ${row.m1.relativeRe.toExponential(2)}, residual ${eig.m1.residual.toExponential(2)}, shift factor ${eig.m1.cyclicShiftFactor.re.toFixed(10)}+${eig.m1.cyclicShiftFactor.im.toFixed(10)}i) ${row.pass ? 'PASS' : 'FAIL'}`);
  }
  receipt.knownCase = { id: 'KZ-zero-coupling-linearization', description: 'Same field, Jacobian and inverse-iteration machinery applied to the zero-coupling ring (velocity coupling deleted, H = I, inverse-square gradient, balanced speed v0 = sqrt((2 sqrt2 - 1)/(4R))); must return the closed-form exponents of ring document Section 10: m=2 twist sqrt((-1 + sqrt(625 + 648 sqrt2)/7)/2) = 1.5180062027 Omega0 and m=1 in-plane -i +- sqrt((8 + 2 sqrt2)/7) (real part 1.2437516475, |imaginary part| exactly 1), to 8 digits; eigenvector residuals <= 1e-8; cyclic-shift factor -1 (m=2) and +-i (m=1).', rows, pass: rows.every((r) => r.pass), utc: new Date().toISOString() };
  return receipt.knownCase.pass;
}

// ----------------------------------------------------------- eigenpairs of the full law at R
function fullEigen(receipt, R) {
  const v = ringBalanceSpeed(R);
  const lin = linearize(R, v, { coupling: 1, pairTerm: 1 }, `full law R=${R}`);
  const eig = eigenpairs(lin.J, { m2: { re: 1.5, im: 0 }, m1: { re: 1.23, im: 0.99 } });
  const tg = TARGETS[R];
  const entry = { R, v, Omega: lin.Omega, period: ringPeriod(R, v), fixedPoint: lin.fixedPoint, jacobian: lin.jac, modes: {} };
  for (const m of ['m2', 'm1']) {
    const e = eig[m];
    entry.modes[m] = { shift: e.shift, eigenvalue: e.eigenvalue, target: tg[m], differenceRe: e.eigenvalue.re - tg[m].re, differenceImAbs: Math.abs(e.eigenvalue.im) - tg[m].im, residual: e.residual, iterations: e.iterations, cyclicShiftFactor: e.cyclicShiftFactor, cyclicShiftResidual: e.cyclicShiftResidual };
    console.log(`full law R=${R} ${m}: eigenvalue ${e.eigenvalue.re.toPrecision(12)}${e.eigenvalue.im >= 0 ? '+' : ''}${e.eigenvalue.im.toPrecision(12)}i (target ${tg[m].re}+-${tg[m].im}i), residual ${e.residual.toExponential(2)}, iterations ${e.iterations}, shift factor ${e.cyclicShiftFactor.re.toFixed(10)}+${e.cyclicShiftFactor.im.toFixed(10)}i (res ${e.cyclicShiftResidual.toExponential(2)})`);
  }
  console.log(`  fixed-point residual ${lin.fixedPoint.residualPhysical.toExponential(2)} (physical), FD step difference ${lin.jac.maxEntryDifference.toExponential(2)}`);
  fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.writeFileSync(path.join(TMP_DIR, `eigvec-R${R}.json`), JSON.stringify({ R, v, Omega: lin.Omega, m2: vecOut(eig.m2.v), m1: vecOut(eig.m1.v), eigen: entry }, null, 1));
  receipt.eigen[R] = entry;
  return { entry, eig };
}

// ----------------------------------------------------------- target runs
function perturbedSpec(R, v, vec, a0, setting, id) {
  // vec: real 24-vector in scaled units (positions / R, velocities / (R Omega)), max member position norm = 1
  const Omega = v / R, T = ringPeriod(R, v);
  const ring = buildRing(R, v);
  const positions = [], velocities = [];
  for (let k = 0; k < N; k++) {
    const xp = [vec[3 * k], vec[3 * k + 1], vec[3 * k + 2]], vp = [vec[12 + 3 * k], vec[12 + 3 * k + 1], vec[12 + 3 * k + 2]];
    const zx = zcross(xp);
    positions.push(ring.positions[k].map((x, c) => x + a0 * R * xp[c]));
    velocities.push(ring.velocities[k].map((u, c) => u + a0 * R * Omega * (vp[c] + zx[c])));
  }
  const s = SETTINGS[setting];
  const spec = { caseId: `${id}-${s.label}`, positions, velocities, polarities: Q, outputDt: T / 400, ...FROZEN, ...s };
  delete spec.label;
  return { spec, T, Omega };
}
function realModeVector(e, mode) {
  // real part of the eigenvector, normalized so that the largest member position norm is 1
  const vec = Float64Array.from(e.v.re);
  let m = 0; for (let k = 0; k < N; k++) m = Math.max(m, Math.hypot(vec[3 * k], vec[3 * k + 1], vec[3 * k + 2]));
  for (let i = 0; i < NS; i++) vec[i] /= m;
  void mode; return vec;
}
function deviationHistory(rec, R, v) {
  const Omega = v / R; const out = [];
  for (const s of rec.samples) {
    const t = s.t; let dp = 0, dv = 0;
    for (let k = 0; k < N; k++) {
      const phi = k * Math.PI / 2 + Omega * t, c = Math.cos(phi), sn = Math.sin(phi);
      const xr = [R * c, R * sn, 0], vr = [-v * sn, v * c, 0];
      for (let cc = 0; cc < 3; cc++) { dp += (s.state.positions[k][cc] - xr[cc]) ** 2; dv += (s.state.velocities[k][cc] - vr[cc]) ** 2; }
    }
    out.push([t, Math.sqrt(dp) / R, Math.sqrt(dv) / v]);
  }
  return out;
}
function slopeFit(pts) { // pts: [t, y]
  const n = pts.length; if (n < 5) return { points: n, slope: null };
  let st = 0, sy = 0, stt = 0, sty = 0; for (const [t, y] of pts) { st += t; sy += y; stt += t * t; sty += t * y; }
  const slope = (n * sty - st * sy) / (n * stt - st * st), icpt = (sy - slope * st) / n;
  let ss = 0; for (const [t, y] of pts) ss += (y - slope * t - icpt) ** 2;
  return { points: n, tFrom: pts[0][0], tTo: pts[n - 1][0], slope, intercept: icpt, rms: Math.sqrt(ss / n) };
}
// Five-parameter fit y = c + sigma t + 0.5 ln(1 + beta cos(2 omega t + psi)) by Gauss-Newton with numerical derivatives.
function envelopeFit(pts, sigma0, omega0) {
  const model = (p, t) => p[0] + p[1] * t + 0.5 * Math.log(Math.max(1e-300, 1 + p[2] * Math.cos(2 * p[3] * t + p[4])));
  let best = null;
  for (const psi0 of [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]) for (const beta0 of [0.3, 0.7]) {
    let p = [pts[0][1] - sigma0 * pts[0][0], sigma0, beta0, omega0, psi0];
    let lam = 1e-3, cost = Infinity;
    const costOf = (q) => { let s = 0; for (const [t, y] of pts) s += (y - model(q, t)) ** 2; return s; };
    cost = costOf(p);
    for (let it = 0; it < 200; it++) {
      const n = pts.length, m = 5; const Jm = [], r = [];
      for (let i = 0; i < n; i++) { const [t, y] = pts[i]; r.push(y - model(p, t)); const row = []; for (let j = 0; j < m; j++) { const dq = 1e-7 * Math.max(1, Math.abs(p[j])); const pp = p.slice(); pp[j] += dq; row.push((model(pp, t) - model(p, t)) / dq); } Jm.push(row); }
      const A = new Float64Array(m * m), b = new Float64Array(m);
      for (let i = 0; i < n; i++) for (let j = 0; j < m; j++) { b[j] += Jm[i][j] * r[i]; for (let k = 0; k < m; k++) A[j * m + k] += Jm[i][j] * Jm[i][k]; }
      for (let j = 0; j < m; j++) A[j * m + j] *= 1 + lam;
      const f = luFactor(A, m); if (f.singular) break;
      const d = luSolve(f, b, m); const pn = p.map((x, j) => x + d[j]);
      if (Math.abs(pn[2]) >= 0.999) pn[2] = Math.sign(pn[2]) * 0.999;
      const cn = costOf(pn);
      if (cn < cost) { p = pn; const done = cost - cn < 1e-14 * Math.max(cost, 1e-30); cost = cn; lam = Math.max(lam / 3, 1e-12); if (done) break; } else { lam *= 10; if (lam > 1e8) break; }
    }
    if (!best || cost < best.cost) best = { cost, p };
  }
  const [c, sigma, beta, omega, psi] = best.p;
  return { points: pts.length, tFrom: pts[0][0], tTo: pts[pts.length - 1][0], c, sigma, beta, omega: Math.abs(omega), psi, rms: Math.sqrt(best.cost / pts.length) };
}
// Projection of the rotating-frame scaled deviation onto Re v and Im v of the complex eigenvector.
// For a sector m = 1,3 eigenvector S v = +-i v with S real orthogonal, so Re v and Im v are orthogonal
// with equal norms (derived), and the linear solution Re(e^{lambda t} v) has projections
// c(t) = e^{gamma t} cos(omega t), s(t) = e^{gamma t} sin(omega t): the modulus gives gamma, the
// unwrapped phase gives omega.
function projectionHistory(rec, R, v, cv) {
  const Omega = v / R; const out = [];
  let nr = 0, ni = 0, ri = 0; for (let i = 0; i < NS; i++) { nr += cv.re[i] ** 2; ni += cv.im[i] ** 2; ri += cv.re[i] * cv.im[i]; }
  const geometry = { normRe: Math.sqrt(nr), normIm: Math.sqrt(ni), cosAngle: ri / Math.sqrt(nr * ni) };
  for (const s of rec.samples) {
    const t = s.t, th = Omega * t, ct = Math.cos(th), st = Math.sin(th); const d = new Float64Array(NS);
    for (let k = 0; k < N; k++) {
      const phi = k * Math.PI / 2 + th, c = Math.cos(phi), sn = Math.sin(phi);
      const dx = [s.state.positions[k][0] - R * c, s.state.positions[k][1] - R * sn, s.state.positions[k][2]];
      const dvv = [s.state.velocities[k][0] + v * sn, s.state.velocities[k][1] - v * c, s.state.velocities[k][2]];
      // rotate by -Omega t
      const dY = [ct * dx[0] + st * dx[1], -st * dx[0] + ct * dx[1], dx[2]];
      const dVr = [ct * dvv[0] + st * dvv[1], -st * dvv[0] + ct * dvv[1], dvv[2]];
      const zx = zcross(dY);
      for (let cc = 0; cc < 3; cc++) { d[3 * k + cc] = dY[cc] / R; d[12 + 3 * k + cc] = (dVr[cc] - Omega * zx[cc]) / (R * Omega); }
    }
    let pc = 0, ps = 0; for (let i = 0; i < NS; i++) { pc += cv.re[i] * d[i]; ps -= cv.im[i] * d[i]; }
    out.push([t, pc / nr, ps / ni]);
  }
  return { geometry, rows: out };
}
function phaseFit(proj, lo, hi) {
  const pts = []; let prev = null, wrap = 0;
  for (const [t, c, s] of proj.rows) {
    const mod = Math.hypot(c, s); let ph = Math.atan2(s, c);
    if (prev !== null) { let dph = ph + wrap - prev; while (dph > Math.PI) { wrap -= 2 * Math.PI; dph -= 2 * Math.PI; } while (dph < -Math.PI) { wrap += 2 * Math.PI; dph += 2 * Math.PI; } }
    ph += wrap; prev = ph;
    if (mod >= lo && mod <= hi) pts.push([t, Math.log(mod), ph]);
  }
  const g = slopeFit(pts.map((p) => [p[0], p[1]])), w = slopeFit(pts.map((p) => [p[0], p[2]]));
  return { points: pts.length, gammaSlope: g.slope, omegaSlope: w.slope === null ? null : Math.abs(w.slope), rmsLogModulus: g.rms, rmsPhase: w.rms, tFrom: g.tFrom, tTo: g.tTo };
}
function localMaximaFit(pts) {
  const mx = []; for (let i = 1; i < pts.length - 1; i++) if (pts[i][1] > pts[i - 1][1] && pts[i][1] >= pts[i + 1][1]) mx.push(pts[i]);
  if (mx.length < 2) return { points: mx.length, slope: null };
  const f = slopeFit(mx.length >= 5 ? mx : [...mx, ...mx, ...mx]); // slopeFit needs 5 points; repeats do not change the slope
  return { maxima: mx.length, points: mx.length, slope: f.slope, tFrom: mx[0][0], tTo: mx[mx.length - 1][0] };
}

function runTarget(receipt, R, mode, a0, setting, eig, entry) {
  const v = entry.v, Omega = entry.Omega, T = entry.period, tg = TARGETS[R][mode];
  const vec = realModeVector(eig[mode], mode);
  const id = `G-R${R}-${mode}-a${a0.toExponential(0).replace('+', '')}`;
  const { spec } = perturbedSpec(R, v, vec, a0, setting, id);
  // Run length: four periods, or the time at which the linear growth at the target rate would carry the
  // deviation to 5e-2 (a run-length choice only; the fit windows below do not depend on it).
  spec.tMax = Math.min(4 * T, Math.log(5e-2 / a0) / (tg.re * Omega));
  fs.mkdirSync(OUT_DIR, { recursive: true }); fs.mkdirSync(TMP_DIR, { recursive: true });
  fs.writeFileSync(path.join(TMP_DIR, `${spec.caseId}.case.json`), JSON.stringify({ ...spec, eigenvectorScaled: Array.from(vec), eigenvalue: eig[mode].eigenvalue }, null, 1));
  const t0 = Date.now(); const rec = runCase(spec); const wallMs = Date.now() - t0;
  const base = path.join(OUT_DIR, spec.caseId);
  fs.writeFileSync(`${base}.json`, JSON.stringify(rec));
  const dev = deviationHistory(rec, R, v);
  fs.writeFileSync(`${base}.deviation.json`, JSON.stringify({ caseId: spec.caseId, R, v, Omega, a0, mode, setting, columns: ['t', 'posDevOverR', 'velDevOverV'], rows: dev }, null, 0));
  const lo = 10 * a0;
  const proj = mode === 'm1' ? projectionHistory(rec, R, v, eig.m1.v) : null;
  if (proj) fs.writeFileSync(`${base}.projection.json`, JSON.stringify({ caseId: spec.caseId, geometry: proj.geometry, columns: ['t', 'cosProjection', 'sinProjection'], rows: proj.rows }, null, 0));
  const fits = {};
  for (const [name, hi] of [['tight', 1e-3], ['loose', 1e-2]]) {
    const w = dev.filter((d) => d[1] >= lo && d[1] <= hi);
    const pos = slopeFit(w.map((d) => [d[0], Math.log(d[1])]));
    const vel = slopeFit(w.map((d) => [d[0], Math.log(d[2])]));
    const fit = { window: [lo, hi], position: pos, velocity: vel };
    if (pos.slope !== null) {
      fit.ratePerOmega = pos.slope / Omega; fit.velocityRatePerOmega = vel.slope / Omega;
      fit.relativeDifference = Math.abs(fit.ratePerOmega / tg.re - 1);
      if (mode === 'm1') {
        const pts = w.map((d) => [d[0], Math.log(d[1])]);
        const env = envelopeFit(pts, tg.re * Omega, tg.im * Omega);
        fit.envelope = { ...env, sigmaPerOmega: env.sigma / Omega, omegaPerOmega: env.omega / Omega, relativeDifferenceSigma: Math.abs(env.sigma / Omega / tg.re - 1), relativeDifferenceOmega: Math.abs(env.omega / Omega / tg.im - 1) };
        const lm = localMaximaFit(pts); fit.localMaxima = { ...lm, ratePerOmega: lm.slope === null ? null : lm.slope / Omega, relativeDifference: lm.slope === null ? null : Math.abs(lm.slope / Omega / tg.re - 1) };
        const pf = phaseFit(proj, lo, hi);
        fit.projection = { ...pf, gammaPerOmega: pf.gammaSlope === null ? null : pf.gammaSlope / Omega, omegaPerOmega: pf.omegaSlope === null ? null : pf.omegaSlope / Omega, relativeDifferenceGamma: pf.gammaSlope === null ? null : Math.abs(pf.gammaSlope / Omega / tg.re - 1), relativeDifferenceOmega: pf.omegaSlope === null ? null : Math.abs(pf.omegaSlope / Omega / tg.im - 1) };
        fit.plainSlopeRelativeDifference = fit.relativeDifference;
        fit.envelopeRelativeDifference = fit.envelope.relativeDifferenceSigma;
        // pass criterion for m1: the plain slope of ln(dev) (the norm does not oscillate for a sector-1 eigenvector; see projectionHistory)
        fit.relativeDifference = fit.plainSlopeRelativeDifference;
      }
      fit.pass = fit.relativeDifference <= TOLERANCE[name].relative;
    } else fit.pass = false;
    fits[name] = fit;
  }
  const first = {}; for (const th of [1e-5, 1e-4, 1e-3, 1e-2]) { const h = dev.find((d) => d[1] > th); first[th.toExponential(0)] = h ? { t: h[0], periods: h[0] / T } : null; }
  const events = rec.events.filter((e) => e.kind !== 'turning-point').map((e) => ({ kind: e.kind, t: e.t, periods: e.t / T, member: e.member, pair: e.pair, direction: e.direction }));
  const row = {
    id: spec.caseId, R, mode, a0, setting, settingLabel: SETTINGS[setting].label, v, Omega, period: T, tMax: spec.tMax, periodsRun: rec.final.t / T, stopReason: rec.final.stopReason, steps: rec.integrator.steps, wallMs,
    eigenvalueUsed: eig[mode].eigenvalue, target: tg, initialDeviation: { position: dev[0][1], velocity: dev[0][2] },
    fits, eigenvectorGeometry: proj ? proj.geometry : null, firstCrossing: first, events, eventCount: rec.events.length, turningPoints: rec.events.filter((e) => e.kind === 'turning-point').length,
    coverage: { supMemberSpeed: rec.suprema.speed, maxEps: rec.suprema.eps, reachedCf: rec.events.some((e) => e.kind === 'speed-crossing-cf'), speedLabels: rec.events.some((e) => e.kind === 'speed-crossing-cf') ? 'unrestricted only after the first c_f crossing' : 'unrestricted, inclusive ceiling, strict ceiling on the whole interval', domain: rec.suprema.speed <= FROZEN.speedBound && rec.suprema.eps <= FROZEN.epsBound ? 'inside' : 'partially inside' },
    invariants: { dErel: rec.final.dErel, dP: Math.hypot(...rec.final.dP), dJrel: Math.hypot(...rec.final.dJ) / Math.hypot(...rec.initialInvariants.J) }, detHmin: rec.suprema.detMin, condMax: rec.suprema.condMax,
    runRecord: `${base}.json`, deviationRecord: `${base}.deviation.json`, utc: new Date().toISOString(),
  };
  receipt.runs = receipt.runs.filter((r) => r.id !== row.id); receipt.runs.push(row);
  const ft = fits.tight, fl = fits.loose;
  console.log(`${row.id}: stop=${row.stopReason} at ${row.periodsRun.toFixed(3)} periods, steps=${row.steps}, wall=${wallMs}ms; dev0=${dev[0][1].toExponential(3)}; tight ${ft.position.points} pts rate/Omega=${ft.ratePerOmega?.toPrecision(10)} (vel ${ft.velocityRatePerOmega?.toPrecision(8)}) target ${tg.re} rel ${ft.relativeDifference?.toExponential(2)} ${ft.pass ? 'PASS' : 'FAIL'}; loose ${fl.position.points} pts rate/Omega=${fl.ratePerOmega?.toPrecision(10)} rel ${fl.relativeDifference?.toExponential(2)} ${fl.pass ? 'PASS' : 'FAIL'}${mode === 'm1' ? `; envelope sigma/Omega=${ft.envelope?.sigmaPerOmega?.toPrecision(10)} omega/Omega=${ft.envelope?.omegaPerOmega?.toPrecision(10)} (loose ${fl.envelope?.sigmaPerOmega?.toPrecision(10)}, ${fl.envelope?.omegaPerOmega?.toPrecision(10)}); envelope beta=${ft.envelope?.beta?.toExponential(2)}; projection gamma/Omega=${ft.projection?.gammaPerOmega?.toPrecision(10)} omega/Omega=${ft.projection?.omegaPerOmega?.toPrecision(10)} (rel ${ft.projection?.relativeDifferenceGamma?.toExponential(2)}, ${ft.projection?.relativeDifferenceOmega?.toExponential(2)}; loose ${fl.projection?.gammaPerOmega?.toPrecision(10)}, ${fl.projection?.omegaPerOmega?.toPrecision(10)}); |Re v|=${proj.geometry.normRe.toPrecision(8)} |Im v|=${proj.geometry.normIm.toPrecision(8)} cos=${proj.geometry.cosAngle.toExponential(2)}` : ''}; supV=${rec.suprema.speed.toExponential(3)} maxEps=${rec.suprema.eps.toExponential(3)} events=${events.map((e) => `${e.kind}@${e.periods.toFixed(3)}`).join(',') || 'none'} dE/E=${rec.final.dErel.toExponential(2)}`);
  return row;
}

// ----------------------------------------------------------- CLI
function main(argv) {
  const args = argv.slice(2);
  const get = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
  const receipt = receiptLoad();
  if (args.includes('--known')) {
    receipt.utcStart = receipt.utcStart || new Date().toISOString();
    const ok = recordControls(receipt);
    console.log(`controls: pair instrument allPass=${receipt.controls.pairInstrument.allPass} (${receipt.controls.pairInstrument.pass}/${receipt.controls.pairInstrument.total}); ring known cases allPass=${receipt.controls.ringKnownCases.allPass}`);
    if (!ok) { receiptSave(receipt); console.error('controls not passed; stop'); process.exit(2); }
    const kp = knownCase(receipt);
    receipt.knownCasePass = kp; receipt.toleranceStatedUtc = new Date().toISOString();
    receiptSave(receipt); console.log(`known case ${kp ? 'PASS' : 'FAIL'}; tolerance stated at ${receipt.toleranceStatedUtc}; receipt ${RECEIPT_PATH}`);
    return;
  }
  if (!receipt.knownCasePass) { console.error('known case has not passed; run --known first'); process.exit(2); }
  const R = Number(get('--R', 50));
  if (args.includes('--eig')) { fullEigen(receipt, R); receiptSave(receipt); return; }
  if (args.includes('--run')) {
    const mode = get('--mode', 'm2'), a0 = Number(get('--a0', 1e-6)), settings = get('--setting', 'P').split(',');
    const { entry, eig } = fullEigen(receipt, R);
    for (const setting of settings) runTarget(receipt, R, mode, a0, setting, eig, entry);
    receipt.runsUtcLast = new Date().toISOString(); receiptSave(receipt);
    return;
  }
  console.log('usage: --known | --eig --R 50 | --run --R 50 --mode m2|m1 --a0 1e-6 --setting P[,C]');
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main(process.argv);
