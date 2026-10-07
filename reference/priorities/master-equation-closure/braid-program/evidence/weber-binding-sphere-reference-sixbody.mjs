// weber-binding-sphere-reference-sixbody.mjs
// Reference lane, Part 2: independent six-body evaluations under the frozen
// instantaneous Weber-inspired law (K = c_f = 1, lambda = -1/2, mu = 1).
// Usage: node weber-binding-sphere-reference-sixbody.mjs [known|F0|F1|F1p|F2|F3|all]
// Known cases K1-K5 (and K7 Jacobian assembly) run first in every invocation and
// the script refuses to continue to any target if one fails.
import { writeFileSync } from 'node:fs';
import {
  DEFAULT_LAW, solveAccelerations, lawResidual, dot, cross, norm, scale, add, sub, unit,
  makeRng, rigidResidual, prescribedPathResidual, levenbergMarquardt, rotatingField, fdJacobian, sig15,
} from './weber-binding-sphere-reference-lib.mjs';

const K = 1, c = 1;
const SEED = 20261005;
const what = process.argv[2] ?? 'all';
const log = (...a) => console.log(...a);
const out = { startedAt: new Date().toISOString(), what, law: DEFAULT_LAW, seed: SEED };
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);
const save = (name, obj) => { writeFileSync(name, JSON.stringify(obj, jsonNum, 2)); log(`wrote ${name}`); };

// ---------- geometry builders ----------
function ringState(N, rho, Omega, polarity, phase = 0) {
  const X = [], V = [], q = [];
  for (let k = 0; k < N; k++) {
    const th = phase + (2 * Math.PI * k) / N;
    X.push([rho * Math.cos(th), rho * Math.sin(th), 0]);
    V.push([-Omega * rho * Math.sin(th), Omega * rho * Math.cos(th), 0]);
    q.push(polarity(k));
  }
  return { X, V, q };
}
const balance = (st, Omega) => {
  const sol = solveAccelerations(st);
  let worst = 0, Rmax = 0;
  for (let i = 0; i < st.X.length; i++) {
    worst = Math.max(worst, norm(add(sol.A[i], scale(st.X[i], Omega * Omega))));
    Rmax = Math.max(Rmax, norm(st.X[i]));
  }
  return { worst, normalized: worst / (Omega * Omega * Rmax), det: sol.det, A: sol.A, lawRes: lawResidual(st, sol.A) };
};

// ================= known cases =================
log('=== known cases ===');
const known = {};
let allPass = true;
// K1
known.K1 = [];
for (const rho of [0.25, 1, 3]) {
  const Om = Math.sqrt(K / (4 * rho ** 3));
  const st = { X: [[rho, 0, 0], [-rho, 0, 0]], V: [[0, Om * rho, 0], [0, -Om * rho, 0]], q: [1, -1] };
  const b = balance(st, Om);
  const pass = b.worst <= 1e-13 * Om * Om * rho && Math.abs(b.det - (1 + 1 / rho)) <= 1e-13 * (1 + 1 / rho);
  allPass &&= pass;
  known.K1.push({ rho, residual: b.worst, det: b.det, detExpected: 1 + 1 / rho, lawRes: b.lawRes, pass });
  log(`K1 rho=${rho} residual=${b.worst.toExponential(3)} det=${b.det} expected=${1 + 1 / rho} ${pass ? 'PASS' : 'FAIL'}`);
}
// K2: zero-coefficient alternating square at rho=1.3
{
  const rho = 1.3, Om = Math.sqrt((2 * Math.SQRT2 - 1) * K / (4 * rho ** 3));
  const st = ringState(4, rho, Om, (k) => (k % 2 === 0 ? 1 : -1));
  const lawZero = { K: 1, c: 1, lambda: 0, mu: 0 };
  const sol = solveAccelerations(st, lawZero);
  let worst = 0;
  for (let i = 0; i < 4; i++) worst = Math.max(worst, norm(add(sol.A[i], scale(st.X[i], Om * Om))));
  const pass = worst <= 1e-13 && Math.abs(sol.det - 1) <= 1e-13;
  allPass &&= pass;
  known.K2 = { rho, Omega: Om, residual: worst, det: sol.det, pass };
  log(`K2 zero-coefficient square rho=1.3 residual=${worst.toExponential(3)} det=${sol.det} ${pass ? 'PASS' : 'FAIL'}`);
}
// K3: frozen-coefficient square at x = rho in {1.7, 0.8}; K4 sensitivity at 1.1 Omega
known.K3 = []; known.K4 = [];
for (const rho of [1.7, 0.8]) {
  const x = rho;
  const Om = Math.sqrt((2 * Math.SQRT2 - 1) * K / (4 * rho ** 3));
  const st = ringState(4, rho, Om, (k) => (k % 2 === 0 ? 1 : -1));
  const b = balance(st, Om);
  const detExpected = (1 + (Math.SQRT2 - 1) / x) * (1 - 1 / x) * (1 + Math.SQRT2 / x) ** 3;
  const pass = b.worst <= 1e-12 && Math.abs(b.det - detExpected) <= 1e-12 * Math.abs(detExpected);
  allPass &&= pass;
  known.K3.push({ rho, Omega: Om, residual: b.worst, det: b.det, detExpected, lawRes: b.lawRes, pass });
  log(`K3 square x=${x} residual=${b.worst.toExponential(3)} det=${b.det} closed=${detExpected} ${pass ? 'PASS' : 'FAIL'}`);
  const st2 = ringState(4, rho, 1.1 * Om, (k) => (k % 2 === 0 ? 1 : -1));
  const b2 = balance(st2, 1.1 * Om);
  const pass2 = b2.normalized >= 1e-2;
  allPass &&= pass2;
  known.K4.push({ rho, relativeResidual: b2.normalized, pass: pass2 });
  log(`K4 square x=${x} at 1.1 Omega relative residual=${b2.normalized.toExponential(3)} ${pass2 ? 'PASS' : 'FAIL'}`);
}
// K5
{
  const rho = 1, Om = 0.5;
  const st = { X: [[rho, 0, 0], [-rho, 0, 0]], V: [[0, Om * rho, 0], [0, -Om * rho, 0]], q: [1, -1] };
  const sol = solveAccelerations(st, { ...DEFAULT_LAW, mu: 0 });
  let worst = 0;
  for (let i = 0; i < 2; i++) worst = Math.max(worst, norm(add(sol.A[i], scale(st.X[i], Om * Om))));
  const st2 = { X: [[1, 0, 0], [-1, 0, 0]], V: [[0, 0, 0], [0, 0, 0]], q: [1, -1] };
  const sol2 = solveAccelerations(st2);
  const err = Math.hypot(sol2.A[0][0] + 1 / 8, sol2.A[0][1], sol2.A[0][2]) + Math.abs(norm(sol2.A[1]) - 1 / 8);
  const pass = worst <= 1e-13 && Math.abs(sol.det - 1) <= 1e-13 && err <= 1e-13 && Math.abs(sol2.det - 2) <= 1e-13;
  allPass &&= pass;
  known.K5 = { mu0Residual: worst, mu0Det: sol.det, staticA0: sol2.A[0], staticDet: sol2.det, error: err, pass };
  log(`K5 mu=0 circle residual=${worst.toExponential(3)} det=${sol.det}; static |A|=${norm(sol2.A[0])} det=${sol2.det} ${pass ? 'PASS' : 'FAIL'}`);
}
// K7 (assembly half): rotating-frame field vanishes on the pair circle and the
// Jacobian is written for the eigenvalue step (python, venv). Characteristic
// polynomial check is done there.
const jacobians = {};
{
  const rho = 1, Om = 0.5;
  const y0 = [rho, 0, 0, -rho, 0, 0, 0, 0, 0, 0, 0, 0];
  const f = (y) => rotatingField(y, [1, -1], Om);
  const { J, f0 } = fdJacobian(f, y0, 1e-5);
  const eq = Math.max(...f0.map(Math.abs));
  const pass = eq <= 1e-10;
  allPass &&= pass;
  known.K7_equilibrium = { rho, Omega: Om, fieldNorm: eq, pass, expected: 'eigenvalues 0 x4, +-i Omega x3 each, +-i omega_r with omega_r^2 = Omega^2/2' };
  jacobians.K7_pair_rho1 = { Omega: Om, omega_r: Om / Math.SQRT2, J };
  log(`K7 pair circle rho=1: rotating-frame field norm ${eq.toExponential(3)} ${pass ? 'PASS' : 'FAIL'} (Jacobian written for eigen step)`);
}
out.known = known;
log(`known cases: ${allPass ? 'ALL PASS' : 'FAILURE PRESENT'}`);
if (!allPass) { save('weber-binding-sphere-reference-results.json', out); process.exit(1); }

// ================= F0: planar alternating hexagon =================
function hexagon(rho, Omega) { return ringState(6, rho, Omega, (k) => (k % 2 === 0 ? 1 : -1)); }
const hexOmega2 = (rho) => (5 / 4 - 1 / Math.sqrt(3)) * K / rho ** 3; // own closed form, Section 3 of the document
if (what === 'all' || what === 'F0') {
  log('=== F0 planar alternating hexagon ===');
  const F0 = { closedFormCoefficient: 5 / 4 - 1 / Math.sqrt(3), equalityRadius: 5 / 4 - 1 / Math.sqrt(3), balance: [], determinant: [], singular: null };
  for (const rho of [0.3, 0.5, 1, 2, 3]) {
    const Om = Math.sqrt(hexOmega2(rho));
    const st = hexagon(rho, Om);
    const b = balance(st, Om);
    // tangential component on member 0
    const tang = Math.abs(b.A[0][1]);
    // d'' on all pairs for the solved accelerations
    let maxDdd = 0;
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
      const e = unit(sub(st.X[i], st.X[j])), d = norm(sub(st.X[i], st.X[j]));
      const w = sub(st.V[i], st.V[j]);
      const wp2 = dot(w, w) - dot(e, w) ** 2;
      maxDdd = Math.max(maxDdd, Math.abs(dot(e, sub(b.A[i], b.A[j])) + wp2 / d));
    }
    const b2 = balance(hexagon(rho, 1.1 * Om), 1.1 * Om);
    F0.balance.push({ rho, Omega2: Om * Om, Omega: Om, v: Om * rho, normalizedResidual: b.normalized, tangentialMember0: tang, maxDdotdot: maxDdd, det: b.det, lawRes: b.lawRes, sensitivity11: b2.normalized });
    log(`rho=${rho} Omega^2=${(Om * Om).toPrecision(12)} v=${(Om * rho).toPrecision(8)} residual=${b.normalized.toExponential(3)} tangential=${tang.toExponential(2)} max|d''|=${maxDdd.toExponential(2)} det=${b.det.toPrecision(12)} 1.1Omega->${b2.normalized.toExponential(2)}`);
  }
  // determinant scan and singular radius: M depends on positions only.
  const detAt = (rho) => solveAccelerations(hexagon(rho, 1)).det;
  const scan = [];
  for (let i = 0; i <= 400; i++) { const rho = 0.1 * Math.pow(100, i / 400); scan.push([rho, detAt(rho)]); }
  const roots = [];
  for (let i = 1; i < scan.length; i++) {
    if (Math.sign(scan[i - 1][1]) !== Math.sign(scan[i][1])) {
      let a = scan[i - 1][0], b = scan[i][0], fa = scan[i - 1][1];
      for (let k = 0; k < 200; k++) { const m = 0.5 * (a + b); const fm = detAt(m); if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else b = m; }
      roots.push(0.5 * (a + b));
    }
  }
  F0.singular = { scanRange: [0.1, 10], signChanges: roots, detNearRoots: roots.map((r) => ({ rho: r, det: detAt(r), detMinus: detAt(r * (1 - 1e-6)), detPlus: detAt(r * (1 + 1e-6)) })) };
  F0.determinant = [0.3, 0.5, 1, 2, 3].map((rho) => ({ rho, det: detAt(rho) }));
  log(`determinant sign changes on [0.1,10]: ${roots.map((r) => r.toPrecision(12)).join(', ') || 'none'}`);
  // Eigenvalues of M (symmetric) by own Jacobi rotation, to identify the kernel direction at a singular radius
  F0.jacobiEigen = roots.map((r) => ({ rho: r, eigenvalues: symmetricEigenvalues(assembleM(hexagon(r, 1))) }));
  // rotating-frame Jacobians at rho in {0.3, 1, 3} and the equality radius
  F0.spectrumPoints = [];
  for (const rho of [0.3, 1, 3, 5 / 4 - 1 / Math.sqrt(3)]) {
    const Om = Math.sqrt(hexOmega2(rho));
    const st = hexagon(rho, Om);
    const y0 = [...st.X.flat(), ...new Array(18).fill(0)];
    const f = (y) => rotatingField(y, st.q, Om);
    const { J, f0 } = fdJacobian(f, y0, 1e-5 * rho);
    const eq = Math.max(...f0.map(Math.abs)) / (Om * Om * rho);
    F0.spectrumPoints.push({ rho, Omega: Om, equilibriumResidual: eq, linearized: eq <= 1e-10 });
    jacobians[`F0_hexagon_rho_${rho}`] = { rho, Omega: Om, equilibriumResidual: eq, J };
    log(`hexagon rho=${rho}: equilibrium residual ${eq.toExponential(2)} -> Jacobian ${eq <= 1e-10 ? 'written' : 'REFUSED'}`);
  }
  out.F0 = F0;
}

function assembleM(st) {
  // re-derive M from the solver module by probing: M = I - sum alpha u u^T, read column by column
  // through the law residual map is not needed; use the module's assemble via solve with unit vectors.
  // Here we build it directly (same formula as the module) to feed the eigenvalue routine.
  const { X, q } = st; const N = X.length; const n = 3 * N;
  const M = Array.from({ length: n }, (_, i) => { const r = new Array(n).fill(0); r[i] = 1; return r; });
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const dvec = sub(X[i], X[j]); const d = norm(dvec); const e = unit(dvec);
    const alpha = q[i] * q[j] * K * DEFAULT_LAW.mu / (c * c * d);
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { M[3 * i + a][3 * i + b] -= alpha * e[a] * e[b]; M[3 * i + a][3 * j + b] += alpha * e[a] * e[b]; }
  }
  return M;
}
function symmetricEigenvalues(Ain) {
  // cyclic Jacobi
  const n = Ain.length; const A = Ain.map((r) => r.slice());
  for (let sweep = 0; sweep < 100; sweep++) {
    let off = 0;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] ** 2;
    if (off < 1e-30) break;
    for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) {
      if (Math.abs(A[p][q]) < 1e-300) continue;
      const theta = (A[q][q] - A[p][p]) / (2 * A[p][q]);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
      for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = cs * akp - sn * akq; A[k][q] = sn * akp + cs * akq; }
      for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = cs * apk - sn * aqk; A[q][k] = sn * apk + cs * aqk; }
    }
  }
  return A.map((r, i) => r[i]).sort((a, b) => a - b);
}

// ================= F1: rigid two-circle arrangements =================
function twoCircleState(a, z0, angles, q) {
  const X = [];
  for (let k = 0; k < 6; k++) {
    const z = k < 3 ? z0 : -z0;
    X.push([a * Math.cos(angles[k]), a * Math.sin(angles[k]), z]);
  }
  return { X, q };
}
if (what === 'all' || what === 'F1') {
  log('=== F1 rigid two-circle arrangements ===');
  const F1 = {};
  // segregated class: axial sum check at a few random states (the proof is in the document)
  const rng = makeRng(SEED);
  const qSeg = [1, 1, 1, -1, -1, -1];
  F1.segregatedAxialSamples = [];
  for (let s = 0; s < 5; s++) {
    const z0 = 0.01 * Math.pow(1000, rng.next());
    const angles = Array.from({ length: 6 }, () => 2 * Math.PI * rng.next());
    const st = twoCircleState(1, z0, angles, qSeg);
    const Om = 0.5;
    const r = rigidResidual(st.X, st.q, Om);
    // By the rigid reduction, a rigid rotation is exact iff the inverse-square sum
    // equals -Omega^2 X_perp; its axial component must vanish. That sum is what
    // the one-signed obstruction concerns; the full solve on an unbalanced state
    // has d'' != 0 and its axial components are not constrained in sign.
    const invSq = st.X.map((xi, i) => { let s = [0, 0, 0]; for (let j = 0; j < 6; j++) { if (j === i) continue; const dv = sub(xi, st.X[j]); const d = norm(dv); s = add(s, scale(dv, st.q[i] * st.q[j] * K / (d * d * d))); } return s; });
    const axial = invSq.map((A) => A[2]);
    const axialFull = r.A.map((A) => A[2]);
    F1.segregatedAxialSamples.push({ z0, angles, axialInverseSquare: axial, axialFullSolveAtOmega05: axialFull, allTopNegative: axial.slice(0, 3).every((v) => v < 0), allBottomPositive: axial.slice(3).every((v) => v > 0) });
    log(`segregated sample z0=${z0.toPrecision(4)}: axial inverse-square sums = ${axial.map((v) => v.toPrecision(4)).join(' ')} (top all negative: ${axial.slice(0, 3).every((v) => v < 0)}, bottom all positive: ${axial.slice(3).every((v) => v > 0)})`);
  }
  // mixed class ++- over --+ : least-squares search
  const qMix = [1, 1, -1, -1, -1, 1];
  const rng2 = makeRng(SEED);
  const starts = [];
  const nStarts = 120;
  // parameters: angles theta_1..theta_5 (theta_0 = 0), log(z0), log(Omega); a = 1
  const residualFn = (p) => {
    const angles = [0, p[0], p[1], p[2], p[3], p[4]];
    const z0 = Math.exp(p[5]); const Om = Math.exp(p[6]);
    const st = twoCircleState(1, z0, angles, qMix);
    const r = rigidResidual(st.X, st.q, Om);
    if (r.singular) return new Array(18).fill(1e6);
    return r.res.flat().map((v) => v / (Om * Om));
  };
  let best = null;
  const results = [];
  for (let s = 0; s < nStarts; s++) {
    const p0 = [0, 0, 0, 0, 0, 0, 0].map((_, i) => (i < 5 ? 2 * Math.PI * rng2.next() : i === 5 ? Math.log(0.01) + rng2.next() * Math.log(1000) : Math.log(0.05) + rng2.next() * Math.log(100)));
    const fit = levenbergMarquardt(residualFn, p0, { maxIter: 300, lower: [-Infinity, -Infinity, -Infinity, -Infinity, -Infinity, Math.log(0.01), Math.log(0.05)], upper: [Infinity, Infinity, Infinity, Infinity, Infinity, Math.log(10), Math.log(20)] });
    const angles = [0, ...fit.p.slice(0, 5)]; const z0 = Math.exp(fit.p[5]); const Om = Math.exp(fit.p[6]);
    const st = twoCircleState(1, z0, angles, qMix);
    const r = rigidResidual(st.X, st.q, Om);
    const sumX = st.X.reduce((s, x) => add(s, x), [0, 0, 0]);
    const row = { start: s, normalizedResidual: r.normalized, z0, Omega: Om, angles, sumX, det: r.det, iterations: fit.iterations };
    results.push(row);
    if (!best || r.normalized < best.normalizedResidual) best = row;
  }
  results.sort((a, b) => a.normalizedResidual - b.normalizedResidual);
  F1.mixed = { starts: nStarts, box: 'angles free (theta_0 = 0), z0/a in [0.01, 10], Omega in [0.05, 20], a = 1', best, tenBest: results.slice(0, 10), floor: results[0].normalizedResidual, median: results[Math.floor(results.length / 2)].normalizedResidual };
  log(`mixed class: best normalized residual ${best.normalizedResidual.toExponential(4)} at z0=${best.z0.toPrecision(6)} Omega=${best.Omega.toPrecision(6)} angles=${best.angles.map((v) => v.toFixed(4)).join(',')} sumX=${best.sumX.map((v) => v.toExponential(2)).join(',')}`);
  log(`mixed class: median over starts ${F1.mixed.median.toExponential(3)}`);
  // trend in z0 at fixed z0 with angles and Omega re-optimized: is the floor at the box edge?
  F1.mixedTrend = [];
  for (const z0fixed of [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2]) {
    const fnz = (p) => {
      const angles = [0, p[0], p[1], p[2], p[3], p[4]];
      const r = rigidResidual(twoCircleState(1, z0fixed, angles, qMix).X, qMix, Math.exp(p[5]));
      if (r.singular) return new Array(18).fill(1e6);
      return r.res.flat().map((v) => v / Math.exp(2 * p[5]));
    };
    let bestZ = null;
    const rng3 = makeRng(SEED + 1);
    for (let s = 0; s < 30; s++) {
      const p0 = [0, 0, 0, 0, 0].map(() => 2 * Math.PI * rng3.next()).concat([Math.log(0.05) + rng3.next() * Math.log(100)]);
      const fit = levenbergMarquardt(fnz, p0, { maxIter: 300, lower: [-Infinity, -Infinity, -Infinity, -Infinity, -Infinity, Math.log(0.05)], upper: [Infinity, Infinity, Infinity, Infinity, Infinity, Math.log(20)] });
      const angles = [0, ...fit.p.slice(0, 5)]; const Om = Math.exp(fit.p[5]);
      const r = rigidResidual(twoCircleState(1, z0fixed, angles, qMix).X, qMix, Om);
      if (!bestZ || r.normalized < bestZ.normalizedResidual) bestZ = { z0: z0fixed, normalizedResidual: r.normalized, Omega: Om, angles };
    }
    F1.mixedTrend.push(bestZ);
    log(`mixed class at fixed z0=${z0fixed}: best residual ${bestZ.normalizedResidual.toExponential(4)} Omega=${bestZ.Omega.toPrecision(6)} angles=${bestZ.angles.map((v) => v.toFixed(3)).join(',')}`);
  }
  out.F1 = F1;
}

// ================= F1': octahedron about a body diagonal =================
if (what === 'all' || what === 'F1p') {
  log("=== F1' octahedron about the body diagonal (1,1,1)/sqrt3 at R=1 ===");
  const axis = unit([1, 1, 1]);
  const verts = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]];
  const cases = {
    'antipodal polarity, all +x,+y,+z positive (segregated top +++ / bottom ---)': [1, 1, 1, -1, -1, -1],
    'antipodal polarity, +z reversed (mixed top ++- / bottom --+)': [1, 1, -1, -1, -1, 1],
  };
  const F1p = {};
  for (const [name, q] of Object.entries(cases)) {
    // scan Omega then refine
    // Omega box [0.05, 20] (preregistration: Omega free around K^{1/2}/(2R^{3/2}) = 0.5);
    // the normalized residual tends to a nonzero constant as Omega -> infinity, so an
    // unbounded Omega is not a candidate and the box edge is reported as such.
    let bestOm = null, bestRes = Infinity;
    const scan = [];
    for (let i = 0; i <= 400; i++) {
      const Om = 0.05 * Math.pow(400, i / 400);
      const r = rigidResidual(verts, q, Om, axis);
      if (i % 50 === 0) scan.push({ Omega: Om, normalizedResidual: r.normalized });
      if (!r.singular && r.normalized < bestRes) { bestRes = r.normalized; bestOm = Om; }
    }
    const fit = levenbergMarquardt((p) => { const r = rigidResidual(verts, q, Math.exp(p[0]), axis); return r.res.flat().map((v) => v / Math.exp(2 * p[0])); }, [Math.log(bestOm)], { maxIter: 100, lower: [Math.log(0.05)], upper: [Math.log(20)] });
    const OmR = Math.exp(fit.p[0]);
    const r = rigidResidual(verts, q, OmR, axis);
    const axial = r.A.map((A) => dot(A, axis));
    const invSq = verts.map((xi, i) => { let s = [0, 0, 0]; for (let j = 0; j < 6; j++) { if (j === i) continue; const dv = sub(xi, verts[j]); const d = norm(dv); s = add(s, scale(dv, q[i] * q[j] * K / (d * d * d))); } return s; });
    const axialInvSq = invSq.map((A) => dot(A, axis));
    const rInf = rigidResidual(verts, q, 1e6, axis);
    F1p[name] = { q, OmegaBox: [0.05, 20], bestOmega: OmR, normalizedResidual: r.normalized, residualAtOmega05: rigidResidual(verts, q, 0.5, axis).normalized, largeOmegaLimit: rInf.normalized, scan, axialAccelerationsFullSolve: axial, axialInverseSquareSums: axialInvSq, det: r.det, perMember: r.res.map(norm) };
    log(`${name}: best Omega in box=${OmR.toPrecision(8)} residual=${r.normalized.toExponential(4)} (at Omega=0.5: ${F1p[name].residualAtOmega05.toExponential(3)}; Omega->inf limit ${rInf.normalized.toExponential(3)}) axial inverse-square sums=${axialInvSq.map((v) => v.toPrecision(4)).join(' ')}`);
  }
  // triangular prism and antiprism with aspect scan, both polarity classes, R = 1
  F1p.prismFamily = [];
  for (const [fam, offset] of [['prism', 0], ['antiprism', Math.PI / 3]]) {
    for (const [cls, q] of [['segregated', [1, 1, 1, -1, -1, -1]], ['mixed', [1, 1, -1, -1, -1, 1]]]) {
      let best = { residual: Infinity };
      for (let i = 1; i < 60; i++) {
        const z0 = i / 60; const a = Math.sqrt(1 - z0 * z0);
        const angles = [0, 2 * Math.PI / 3, 4 * Math.PI / 3, offset, offset + 2 * Math.PI / 3, offset + 4 * Math.PI / 3];
        const st = twoCircleState(a, z0, angles, q);
        for (let j = 0; j <= 200; j++) {
          const Om = 0.05 * Math.pow(400, j / 200);
          const r = rigidResidual(st.X, q, Om);
          if (!r.singular && r.normalized < best.residual) best = { residual: r.normalized, z0, a, Omega: Om };
        }
      }
      F1p.prismFamily.push({ family: fam, polarity: cls, bestOnScan: best });
      log(`${fam} ${cls}: best residual on (z0, Omega) scan ${best.residual.toExponential(3)} at z0=${best.z0.toPrecision(4)} Omega=${best.Omega.toPrecision(5)}`);
    }
  }
  out.F1p = F1p;
}

// ================= F2: three antipodal opposite-polarity pairs on great circles =================
function f2Path(triad, phases, senses, R, Omega) {
  // triad: [{u, up}] three planes; returns path(T) -> {X, V}
  return (T) => {
    const X = [], V = [];
    for (let k = 0; k < 3; k++) {
      const { u, up } = triad[k];
      const ph = senses[k] * Omega * T + phases[k];
      const pos = add(scale(u, R * Math.cos(ph)), scale(up, R * Math.sin(ph)));
      const vel = scale(add(scale(u, -R * Math.sin(ph)), scale(up, R * Math.cos(ph))), senses[k] * Omega);
      X.push(pos); V.push(vel);
      X.push(scale(pos, -1)); V.push(scale(vel, -1));
    }
    return { X, V };
  };
}
const qF2 = [1, -1, 1, -1, 1, -1];
if (what === 'all' || what === 'F2') {
  log('=== F2 three antipodal pairs on great circles ===');
  const R = 1;
  // Known cases for the prescribed-path evaluator before any target use:
  // (i) a single antipodal opposite-polarity pair on a great circle at Omega = 0.5, R = 1 (K1 on a path);
  // (ii) the balanced hexagon at rho = 1 as a prescribed rigid path.
  {
    const pairPath = (Om) => (T) => { const ph = Om * T; const pos = [Math.cos(ph), Math.sin(ph), 0]; const vel = [-Om * Math.sin(ph), Om * Math.cos(ph), 0]; return { X: [pos, scale(pos, -1)], V: [vel, scale(vel, -1)] }; };
    const r1 = prescribedPathResidual(pairPath(0.5), [1, -1], 0.5, 1, 64);
    const r1b = prescribedPathResidual(pairPath(0.55), [1, -1], 0.55, 1, 64); // closed form: 1 - (1 + 1.21)/(2 * 1.21) = 0.086777
    const Om = Math.sqrt(hexOmega2(1));
    const hexPath = (T) => { const st = ringState(6, 1, Om, (k) => (k % 2 === 0 ? 1 : -1), Om * T); return { X: st.X, V: st.V }; };
    const r2 = prescribedPathResidual(hexPath, [1, -1, 1, -1, 1, -1], Om, 1, 64);
    const pass = r1.R <= 1e-13 && r2.R <= 1e-13 && r1b.R >= 1e-2;
    log(`path-evaluator known cases: pair on great circle R=${r1.R.toExponential(3)} (at 1.1 Omega: ${r1b.R.toExponential(3)}), rigid hexagon R=${r2.R.toExponential(3)} ${pass ? 'PASS' : 'FAIL'}`);
    out.F2knownCases = { pairOnGreatCircle: r1, pairAt11Omega: r1b, rigidHexagonAsPath: r2, pass };
    if (!pass) { save('weber-binding-sphere-reference-results.json', out); process.exit(1); }
  }
  const triad0 = [{ n: [1, 0, 0], u: [0, 1, 0], up: [0, 0, 1] }, { n: [0, 1, 0], u: [0, 0, 1], up: [1, 0, 0] }, { n: [0, 0, 1], u: [1, 0, 0], up: [0, 1, 0] }];
  const phaseGrid = [0, 1, 2, 3, 4, 5].map((k) => (k * Math.PI) / 6);
  const senseSets = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
  const OmegaGrid = [0.4, 0.45, 0.5, 0.55, 0.6, 0.7];
  const grid = [];
  let best = null;
  for (const senses of senseSets) for (const p2 of phaseGrid) for (const p3 of phaseGrid) for (const Om of OmegaGrid) {
    const r = prescribedPathResidual(f2Path(triad0, [0, p2, p3], senses, R, Om), qF2, Om, R, 64);
    const row = { triad: 'xyz', senses, phases: [0, p2, p3], Omega: Om, ...r };
    grid.push(row);
    if (!r.singular && (!best || r.R < best.R)) best = row;
  }
  log(`orthogonal-triad grid: ${grid.length} points; best R=${best.R.toExponential(4)} at senses=${best.senses} phases=(0,${best.phases[1].toFixed(4)},${best.phases[2].toFixed(4)}) Omega=${best.Omega} radial=${best.radial.toExponential(3)} tangential=${best.tangential.toExponential(3)} binormal=${best.binormal.toExponential(3)}`);
  // per sense class summary
  const classSummary = senseSets.map((s) => { const rows = grid.filter((g) => g.senses === s && !g.singular); const m = rows.reduce((a, b) => (b.R < a.R ? b : a)); return { senses: s, min: m.R, phases: m.phases, Omega: m.Omega, radial: m.radial, tangential: m.tangential, binormal: m.binormal }; });
  for (const cs of classSummary) log(`  class ${cs.senses.join('')}: min R=${cs.min.toExponential(4)} at phases=(0,${cs.phases[1].toFixed(4)},${cs.phases[2].toFixed(4)}) Omega=${cs.Omega}`);
  // random triads
  const rng = makeRng(SEED);
  const randomTriads = [];
  for (let t = 0; t < 20; t++) {
    const triad = [];
    for (let k = 0; k < 3; k++) {
      const n = rng.unitVec();
      let u = rng.unitVec(); u = unit(sub(u, scale(n, dot(u, n))));
      const up = cross(n, u);
      triad.push({ n, u, up });
    }
    for (const phases of [[0, 2 * Math.PI / 3, 4 * Math.PI / 3], [0, 0, 0]]) for (const senses of senseSets) {
      const r = prescribedPathResidual(f2Path(triad, phases, senses, R, 0.5), qF2, 0.5, R, 64);
      const row = { triadIndex: t, normals: triad.map((p) => p.n), senses, phases, Omega: 0.5, ...r };
      randomTriads.push(row);
      if (!r.singular && r.R < best.R) best = row;
    }
  }
  const bestRandom = randomTriads.reduce((a, b) => (b.R < a.R ? b : a));
  log(`random triads: ${randomTriads.length} evaluations; best R=${bestRandom.R.toExponential(4)} (triad ${bestRandom.triadIndex}, senses ${bestRandom.senses.join('')}, phases ${bestRandom.phases.map((v) => v.toFixed(3))})`);
  // one least-squares refinement from the best orthogonal-triad grid point over (phi2, phi3, Omega)
  const bestGrid = grid.filter((g) => !g.singular).reduce((a, b) => (b.R < a.R ? b : a));
  const refineFn = (p) => {
    const Om = Math.exp(p[2]);
    const path = f2Path(triad0, [0, p[0], p[1]], bestGrid.senses, R, Om);
    const res = [];
    for (let k = 0; k < 64; k++) {
      const T = (k * 2 * Math.PI) / (Om * 64);
      const { X, V } = path(T);
      const sol = solveAccelerations({ X, V, q: qF2 });
      for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) res.push((sol.A[i][a] + Om * Om * X[i][a]) / (Om * Om * R));
    }
    return res;
  };
  // Omega is boxed to [0.2, 2] (around the isolated-pair value 0.5): the normalized
  // residual decreases toward a nonzero constant as Omega grows, so an unbounded
  // refinement runs away without approaching balance.
  const fit = levenbergMarquardt(refineFn, [bestGrid.phases[1], bestGrid.phases[2], Math.log(bestGrid.Omega)], { maxIter: 100, lower: [-Infinity, -Infinity, Math.log(0.2)], upper: [Infinity, Infinity, Math.log(2)] });
  const OmRef = Math.exp(fit.p[2]);
  const refined = prescribedPathResidual(f2Path(triad0, [0, fit.p[0], fit.p[1]], bestGrid.senses, R, OmRef), qF2, OmRef, R, 64);
  log(`refinement from best grid point: phases=(0,${fit.p[0].toFixed(6)},${fit.p[1].toFixed(6)}) Omega=${OmRef.toPrecision(8)} R=${refined.R.toExponential(4)} radial=${refined.radial.toExponential(3)} tangential=${refined.tangential.toExponential(3)} binormal=${refined.binormal.toExponential(3)} iterations=${fit.iterations}`);
  // also a full refinement including the three normals (polar angles) from the best grid point
  const refineFullFn = (p) => {
    const Om = Math.exp(p[2]);
    const triad = [];
    for (let k = 0; k < 3; k++) {
      const th = p[3 + 2 * k], ph = p[4 + 2 * k];
      const n = [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
      let u = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
      u = unit(sub(u, scale(n, dot(u, n))));
      triad.push({ n, u, up: cross(n, u) });
    }
    const path = f2Path(triad, [0, p[0], p[1]], bestGrid.senses, R, Om);
    const res = [];
    for (let k = 0; k < 64; k++) {
      const T = (k * 2 * Math.PI) / (Om * 64);
      const { X, V } = path(T);
      const sol = solveAccelerations({ X, V, q: qF2 });
      if (sol.singular) return new Array(18 * 64).fill(1e6);
      for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) res.push((sol.A[i][a] + Om * Om * X[i][a]) / (Om * Om * R));
    }
    return res;
  };
  const p0full = [bestGrid.phases[1], bestGrid.phases[2], Math.log(bestGrid.Omega), Math.PI / 2, 0, Math.PI / 2, Math.PI / 2, 0, 0];
  const fitFull = levenbergMarquardt(refineFullFn, p0full, { maxIter: 150, lower: [-Infinity, -Infinity, Math.log(0.2), ...new Array(6).fill(-Infinity)], upper: [Infinity, Infinity, Math.log(2), ...new Array(6).fill(Infinity)] });
  const fullR = Math.sqrt(fitFull.cost / (18 * 64));
  const maxFull = Math.max(...fitFull.residual.map(Math.abs));
  log(`full refinement (phases, Omega, normals): rms=${fullR.toExponential(4)} max component=${maxFull.toExponential(4)} Omega=${Math.exp(fitFull.p[2]).toPrecision(8)} iterations=${fitFull.iterations}`);
  const F2 = { R, OmegaGrid, phaseGrid, senseSets, orthogonalTriadGrid: grid, classSummary, bestGrid, randomTriads, bestRandom, refinement: { phases: [0, fit.p[0], fit.p[1]], Omega: OmRef, ...refined, iterations: fit.iterations }, fullRefinement: { params: fitFull.p, rms: fullR, maxComponent: maxFull, iterations: fitFull.iterations }, globalMinimum: best };
  save('weber-binding-sphere-reference-F2.json', F2);
  out.F2summary = { bestGrid: { R: bestGrid.R, senses: bestGrid.senses, phases: bestGrid.phases, Omega: bestGrid.Omega, radial: bestGrid.radial, tangential: bestGrid.tangential, binormal: bestGrid.binormal }, bestRandom: { R: bestRandom.R, triadIndex: bestRandom.triadIndex, senses: bestRandom.senses, phases: bestRandom.phases }, refinement: F2.refinement, fullRefinement: F2.fullRefinement, classSummary };
}

// ================= F3: jet landscape on the unit sphere =================
if (what === 'all' || what === 'F3') {
  log('=== F3 jet conditions on random equal-speed sphere states ===');
  const rng = makeRng(SEED);
  const q = [1, 1, 1, -1, -1, -1];
  const F3 = {};
  for (const v of [0.3, 0.5, 0.7, 1.0]) {
    const J = [];
    let worstConstraint = 0; let redraws = 0;
    for (let s = 0; s < 1000; s++) {
      // positions on the unit sphere with sum zero: alternating projections
      let X = Array.from({ length: 6 }, () => rng.unitVec());
      for (let it = 0; it < 20000; it++) {
        const m = scale(X.reduce((a, b) => add(a, b), [0, 0, 0]), 1 / 6);
        X = X.map((x) => unit(sub(x, m)));
        if (norm(X.reduce((a, b) => add(a, b), [0, 0, 0])) < 1e-13) break;
      }
      // tangential velocities of speed v with sum zero
      // tangential velocities of speed v with sum zero by alternating projection;
      // a draw that has not converged to 1e-12 within 20000 sweeps is redrawn.
      let V = null;
      for (let attempt = 0; attempt < 50 && !V; attempt++) {
        let W = X.map((x) => { let t = rng.unitVec(); t = unit(sub(t, scale(x, dot(t, x)))); return scale(t, v); });
        for (let it = 0; it < 20000; it++) {
          const m = scale(W.reduce((a, b) => add(a, b), [0, 0, 0]), 1 / 6);
          W = W.map((vv, i) => { let t = sub(vv, m); t = sub(t, scale(X[i], dot(t, X[i]))); return scale(unit(t), v); });
          if (norm(W.reduce((a, b) => add(a, b), [0, 0, 0])) < 1e-12) { V = W; break; }
        }
        if (!V) redraws++;
      }
      if (!V) { J.push({ s, jet: Infinity, singular: false, unprepared: true }); continue; }
      const cx = norm(X.reduce((a, b) => add(a, b), [0, 0, 0])), cv = norm(V.reduce((a, b) => add(a, b), [0, 0, 0]));
      worstConstraint = Math.max(worstConstraint, cx, cv);
      const sol = solveAccelerations({ X, V, q });
      if (sol.singular) { J.push({ s, jet: Infinity, singular: true }); continue; }
      let jet = 0, jr = 0, jt = 0;
      for (let i = 0; i < 6; i++) {
        const rad = Math.abs(dot(X[i], sol.A[i]) + v * v) / (v * v);
        const tan = Math.abs(dot(V[i], sol.A[i])) / (v * v * v);
        jr = Math.max(jr, rad); jt = Math.max(jt, tan);
      }
      jet = Math.max(jr, jt);
      J.push({ s, jet, radial: jr, tangential: jt, det: sol.det, minSep: sol.minSep });
    }
    const sorted = J.filter((r) => Number.isFinite(r.jet)).sort((a, b) => a.jet - b.jet);
    const pct = (p) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))].jet;
    const summary = { v, states: J.length, finite: sorted.length, worstConstraintViolation: worstConstraint, redraws, min: sorted[0].jet, minState: sorted[0], p05: pct(0.05), p25: pct(0.25), median: pct(0.5), p75: pct(0.75), p95: pct(0.95), max: sorted[sorted.length - 1].jet, countBelow1em1: sorted.filter((r) => r.jet < 1e-1).length, countBelow1em2: sorted.filter((r) => r.jet < 1e-2).length, countBelow1em3: sorted.filter((r) => r.jet < 1e-3).length, minDet: Math.min(...sorted.map((r) => r.det)), minSep: Math.min(...sorted.map((r) => r.minSep)) };
    F3[`v=${v}`] = summary;
    log(`v=${v}: min jet=${summary.min.toExponential(4)} (radial ${sorted[0].radial.toExponential(3)}, tangential ${sorted[0].tangential.toExponential(3)}) p05=${summary.p05.toExponential(3)} median=${summary.median.toExponential(3)} p95=${summary.p95.toExponential(3)} max=${summary.max.toExponential(3)} below 1e-2: ${summary.countBelow1em2}, below 1e-3: ${summary.countBelow1em3}; constraint violation ${worstConstraint.toExponential(2)}; min det ${summary.minDet.toPrecision(6)}`);
  }
  out.F3 = F3;
}

out.finishedAt = new Date().toISOString();
save('weber-binding-sphere-reference-results.json', out);
if (Object.keys(jacobians).length) save('weber-binding-sphere-reference-jacobians.json', jacobians);
