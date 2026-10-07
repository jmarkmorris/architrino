#!/usr/bin/env node
// weber-binding-sphere-f1.mjs — families F1 (rigid two-circle arrangements) and F1' (named rigid solids).
// Rigid reduction (document Section 4): on a rigid rotation about z the balance is the inverse-square one,
// -Omega^2 X_perp = sum sigma K e / d^2.  Two circles z = +-z0 of common radius a (equal speeds), three members
// on each.  Segregated class: (+,+,+) over (-,-,-); mixed class: (+,+,-) over (-,-,+).  Each class is searched
// with Levenberg-Marquardt from random starts over the free angles (phi_0 = 0 fixed), log(z0/a) in [ln 0.01, ln 10]
// and Omega; a = 1 fixes the scale (the Weber terms do not enter the rigid balance, so the balance is scale-covariant).
// Every reported minimum is re-evaluated by the full 18x18 prescribed-path residual.
// Usage: node weber-binding-sphere-f1.mjs [--starts N]
import path from 'node:path';
import {
  COEFF, HERE, DATA_DIR, ensureDirs, params, utc, log, writeJson, v3, rigidPath, pathResidual, rigidBalance, levenbergMarquardt, nelderMead,
  rotatingSpectrum, rigidMembers, rigidState, speedLabels, rng,
} from './weber-binding-sphere-instrument.mjs';
import { solveAccelerations, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const RECEIPT = path.join(HERE, 'weber-binding-sphere-f1.json');
const argStarts = process.argv.indexOf('--starts'); const NSTARTS = argStarts > 0 ? Number(process.argv[argStarts + 1]) : 200;
const rec = { family: 'F1 rigid two-circle arrangements and F1\' named solids', law: COEFF, started: utc(), box: { angles: '[0, 2pi) with phi_0 = 0', z0OverA: [0.01, 10], a: 1, Omega: '> 0 (free)' }, starts: NSTARTS };
const LN_LO = Math.log(0.01), LN_HI = Math.log(10);
const clampLog = u => Math.min(LN_HI, Math.max(LN_LO, u));

// configuration from parameters: p = [phi1, phi2, phi3, phi4, phi5, ln(z0/a), Omega]
function twoCircle(p, a = 1) {
  const z0 = a * Math.exp(clampLog(p[5])), ang = [0, p[0], p[1], p[2], p[3], p[4]];
  return ang.map((ph, i) => [a * Math.cos(ph), a * Math.sin(ph), i < 3 ? z0 : -z0]);
}
const Q = { segregated: [1, 1, 1, -1, -1, -1], mixed: [1, 1, -1, -1, -1, 1] };

function residualFn(q) { return p => Array.from(rigidBalance(twoCircle(p), q, Math.abs(p[6])).resid); }
function evaluate(q, p, label) {
  const X = twoCircle(p), Om = Math.abs(p[6]), z0 = Math.exp(clampLog(p[5])), R = Math.hypot(1, z0);
  const b = rigidBalance(X, q, Om);
  const r = pathResidual({ q, path: rigidPath(X, Om), Omega: Om, R, period: 2 * Math.PI / Om, nT: 64 });
  const det = solveAccelerations(rigidState(X, Om), params(q)).det;
  return { label, p: Array.from(p), angles: [0, p[0], p[1], p[2], p[3], p[4]].map(a => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)), z0OverA: z0, R, Omega: Om, v: Om, inverseSquareResidualRel: b.maxRel, residualOverScale: b.maxOverScale, axialRel: b.axialRel, axialOverScale: b.axialOverScale, Omega2LeastSquares: b.Omega2LeastSquares, fullSolveResidualRel: r.maxRel, radialRel: r.radialRel, tangentialRel: r.tangentialRel, minSep: b.minSep, det, speed: speedLabels([Om]) };
}

// ---------------------------------------------------------------- segregated class: the axial obstruction, numerically
{
  const rand = rng(11), q = Q.segregated; let worstSign = -Infinity, n = 0, minMag = Infinity;
  for (let s = 0; s < 2000; s++) {
    const p = [0, 0, 0, 0, 0, 0, 1].map((_, k) => k < 5 ? 2 * Math.PI * rand() : k === 5 ? LN_LO + (LN_HI - LN_LO) * rand() : 1);
    const X = twoCircle(p); let ok = true; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (v3.norm(v3.sub(X[i], X[j])) < 1e-3) ok = false; if (!ok) { s--; continue; }
    // axial component of the inverse-square sum on each top member must point toward the lower circle (negative z)
    for (let i = 0; i < 3; i++) { let az = 0; for (let j = 0; j < 6; j++) { if (j === i) continue; const d = v3.sub(X[i], X[j]), dn = v3.norm(d); az += q[i] * q[j] * d[2] / (dn * dn * dn); } worstSign = Math.max(worstSign, az); minMag = Math.min(minMag, -az); n++; }
  }
  rec.segregatedAxialObstruction = { samples: n, largestAxialComponentOnTopMembers: worstSign, smallestMagnitude: minMag, oneSigned: worstSign < 0, note: 'top members (+) over bottom members (-): same-circle like pairs have no axial component; every opposite-circle pair is opposite polarity (attracting) with axial component -2 z0 / d^3 < 0; so the axial balance fails at every z0 > 0' };
  log(`segregated axial obstruction: one-signed=${rec.segregatedAxialObstruction.oneSigned}, largest axial component ${worstSign.toExponential(3)}`);
}

// ---------------------------------------------------------------- random-start Levenberg-Marquardt search in both classes
function search(className, q, nStarts, seed) {
  const rand = rng(seed), fun = residualFn(q), results = [], t0 = Date.now();
  const clamp = p => { const c = Float64Array.from(p); c[5] = clampLog(c[5]); c[6] = Math.abs(c[6]); return c; };
  for (let s = 0; s < nStarts; s++) {
    const lnz = LN_LO + (LN_HI - LN_LO) * rand(), z0 = Math.exp(lnz), R = Math.hypot(1, z0);
    const Om0 = Math.sqrt(1 / (4 * R * R * R)) * (0.3 + 2.7 * rand());
    const p0 = [2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), lnz, Om0];
    let r = levenbergMarquardt(fun, p0, { maxIter: 150, fdStep: 1e-7, clamp });
    if (r.rmax > 1e-10) { const nm = nelderMead(p => { const rr = fun(clamp(p)); let c = 0; for (const z of rr) c += z * z; return c; }, r.p, { maxEval: 3000, scale: 0.05 }); const r2 = levenbergMarquardt(fun, clamp(nm.p), { maxIter: 100, fdStep: 1e-7, clamp }); if (r2.rmax < r.rmax) r = r2; }
    const X = twoCircle(r.p), Om = Math.abs(r.p[6]), b = rigidBalance(X, q, Om);
    results.push({ start: s, p: r.p, rmaxRaw: r.rmax, residualRel: b.maxRel, residualOverScale: b.maxOverScale, axialOverScale: b.axialOverScale, Omega2LeastSquares: b.Omega2LeastSquares, axialRel: b.axialRel, minSep: b.minSep, z0OverA: Math.exp(clampLog(r.p[5])), Omega: Om, iter: r.iter, reason: r.reason });
    if ((s + 1) % 25 === 0) log(`  ${className}: ${s + 1}/${nStarts} starts, best rel residual so far ${Math.min(...results.map(x => x.residualRel)).toExponential(3)}, wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
  results.sort((a, b) => a.residualOverScale - b.residualOverScale);
  const hist = { below1e_12: results.filter(x => x.residualOverScale <= 1e-12).length, below1e_8: results.filter(x => x.residualOverScale <= 1e-8).length, below1e_4: results.filter(x => x.residualOverScale <= 1e-4).length, below1e_2: results.filter(x => x.residualOverScale <= 1e-2).length, total: results.length, metric: 'residual over the inverse-square scale max_i |sum_j sigma K e/d^2|' };
  const best = evaluate(q, results[0].p, `${className} best`);
  // distinct local minima among the best (cluster by residual and z0)
  const minima = []; for (const x of results.slice(0, 40)) { if (!minima.some(m => Math.abs(m.residualOverScale - x.residualOverScale) < 1e-6 * Math.max(1, m.residualOverScale) && Math.abs(Math.log(m.z0OverA / x.z0OverA)) < 1e-4)) minima.push(x); }
  return { className, polarities: q, starts: nStarts, histogram: hist, best, bestFive: results.slice(0, 5), distinctMinimaAmongBest40: minima.slice(0, 8), wallSeconds: (Date.now() - t0) / 1000 };
}
rec.search = {};
for (const [name, q] of Object.entries(Q)) {
  rec.search[name] = search(name, q, NSTARTS, name === 'mixed' ? 2026 : 2027);
  const b = rec.search[name].best;
  log(`${name}: best residual/scale ${b.residualOverScale.toExponential(3)} (per Omega^2 R ${b.inverseSquareResidualRel.toExponential(3)}, full solve ${b.fullSolveResidualRel.toExponential(3)}, axial/scale ${b.axialOverScale.toExponential(3)}, Omega^2 LS ${b.Omega2LeastSquares.toExponential(3)}) at z0/a=${b.z0OverA.toFixed(5)}, Omega=${b.Omega.toFixed(5)}; histogram ${JSON.stringify(rec.search[name].histogram)}`);
  if (b.fullSolveResidualRel <= 1e-12) {
    const X = twoCircle(b.p), Om = b.Omega;
    rec.search[name].spectrum = rotatingSpectrum(rigidMembers(X, q, Om), Om, { balanceTol: 1e-10 });
    log(`  ${name}: exact balance found; spectrum classes ${JSON.stringify(rec.search[name].spectrum.classes)}`);
  }
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}

// ---------------------------------------------------------------- z0 scan: best residual over angles and Omega at fixed z0/a (box boundary behaviour)
rec.z0Scan = {};
for (const [name, q] of Object.entries(Q)) {
  const rand = rng(name === 'mixed' ? 99 : 98), rows = [];
  for (let k = 0; k <= 24; k++) {
    const lnz = LN_LO + (LN_HI - LN_LO) * k / 24, fun = p => Array.from(rigidBalance(twoCircle([...p.slice(0, 5), lnz, p[5]]), q, Math.abs(p[5])).resid);
    let best = null;
    const seeds = rec.search[name].bestFive.map(b => [...b.p.slice(0, 5), b.Omega]);
    for (let s = 0; s < 12 + seeds.length; s++) {
      const z0 = Math.exp(lnz), R = Math.hypot(1, z0), p0 = s < seeds.length ? seeds[s] : [2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), Math.sqrt(1 / (4 * R * R * R)) * (0.3 + 2.7 * rand())];
      const r = levenbergMarquardt(fun, p0, { maxIter: 120, fdStep: 1e-7 });
      const b = rigidBalance(twoCircle([...r.p.slice(0, 5), lnz, r.p[5]]), q, Math.abs(r.p[5]));
      if (!best || b.maxOverScale < best.residualOverScale) best = { z0OverA: Math.exp(lnz), residualOverScale: b.maxOverScale, axialOverScale: b.axialOverScale, Omega: Math.abs(r.p[5]), Omega2LeastSquares: b.Omega2LeastSquares, angles: [0, ...r.p.slice(0, 5)].map(a => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) };
    }
    rows.push(best);
  }
  rec.z0Scan[name] = rows;
  log(`z0 scan ${name}: residual/scale from ${rows[0].residualOverScale.toExponential(3)} at z0/a=0.01 to ${rows[rows.length - 1].residualOverScale.toExponential(3)} at z0/a=10; min ${Math.min(...rows.map(r => r.residualOverScale)).toExponential(3)}`);
}
writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });

// ---------------------------------------------------------------- F1': named solids at R in {0.5, 1, 2}, Omega optimised
function bestOmega(X, q, axis) {
  // Omega^2 enters linearly: least squares over Omega^2 then a 1-D polish; report residual at that Omega
  let num = 0, den = 0;
  for (let i = 0; i < 6; i++) { const Xp = v3.sub(X[i], v3.scale(axis, v3.dot(axis, X[i]))); let F = [0, 0, 0]; for (let j = 0; j < 6; j++) { if (j === i) continue; const d = v3.sub(X[i], X[j]), dn = v3.norm(d); F = v3.add(F, v3.scale(d, q[i] * q[j] / (dn * dn * dn))); } num += -v3.dot(Xp, F); den += v3.dot(Xp, Xp); }
  const Om2 = num / den, Om = Math.sqrt(Math.max(Om2, 1e-30));
  const f = w => rigidBalance(X, q, Math.abs(w[0]), axis).max;
  const nm = nelderMead(f, [Om], { maxEval: 400, scale: 0.1 * Om + 1e-3 });
  return { OmegaLeastSquares: Om, Omega2LeastSquares: Om2, Omega: Math.abs(nm.p[0]) };
}
rec.namedSolids = [];
for (const R of [0.5, 1, 2]) {
  const solids = [];
  // regular octahedron, antipodal opposite polarity, axis along a body diagonal (1,1,1)/sqrt3
  { const X = [[R, 0, 0], [-R, 0, 0], [0, R, 0], [0, -R, 0], [0, 0, R], [0, 0, -R]], q = [1, -1, 1, -1, 1, -1], axis = v3.unit([1, 1, 1]); solids.push({ name: 'octahedron antipodal-opposite, body-diagonal axis', X, q, axis }); }
  // octahedron with a coordinate axis: two members on the axis have zero speed (excluded by the corollary); recorded for completeness
  { const X = [[R, 0, 0], [-R, 0, 0], [0, R, 0], [0, -R, 0], [0, 0, R], [0, 0, -R]], q = [1, -1, 1, -1, 1, -1]; solids.push({ name: 'octahedron antipodal-opposite, coordinate axis (unequal speeds, control)', X, q, axis: [0, 0, 1] }); }
  // equal-edge triangular prism: a = 2R/sqrt7, z0 = a sqrt3/2; both polarity classes
  { const a = 2 * R / Math.sqrt(7), z0 = a * Math.sqrt(3) / 2; const X = [0, 1, 2, 0, 1, 2].map((k, i) => [a * Math.cos(2 * Math.PI * k / 3), a * Math.sin(2 * Math.PI * k / 3), i < 3 ? z0 : -z0]); solids.push({ name: 'equal-edge triangular prism, segregated', X, q: Q.segregated, axis: [0, 0, 1], z0OverA: z0 / a }); solids.push({ name: 'equal-edge triangular prism, mixed', X, q: Q.mixed, axis: [0, 0, 1], z0OverA: z0 / a }); }
  // equal-edge triangular antiprism (= octahedron about a face axis): a = R sqrt(2/3), z0 = a/sqrt2; both classes
  { const a = R * Math.sqrt(2 / 3), z0 = a / Math.SQRT2; const X = [0, 1, 2, 0, 1, 2].map((k, i) => [a * Math.cos(2 * Math.PI * k / 3 + (i < 3 ? 0 : Math.PI / 3)), a * Math.sin(2 * Math.PI * k / 3 + (i < 3 ? 0 : Math.PI / 3)), i < 3 ? z0 : -z0]); solids.push({ name: 'equal-edge triangular antiprism, segregated (= antipodal-opposite octahedron)', X, q: Q.segregated, axis: [0, 0, 1], z0OverA: z0 / a }); solids.push({ name: 'equal-edge triangular antiprism, mixed', X, q: Q.mixed, axis: [0, 0, 1], z0OverA: z0 / a }); }
  for (const s of solids) {
    const bo = bestOmega(s.X, s.q, s.axis), Om = bo.Omega;
    const b = rigidBalance(s.X, s.q, Om, s.axis);
    const r = pathResidual({ q: s.q, path: rigidPath(s.X, Om, s.axis), Omega: Om, R, period: 2 * Math.PI / Om, nT: 64 });
    const speeds = s.X.map(x => Om * v3.norm(v3.sub(x, v3.scale(s.axis, v3.dot(s.axis, x)))));
    const det = solveAccelerations(rigidState(s.X, Om, s.axis), params(s.q)).det;
    const entry = { name: s.name, R, z0OverA: s.z0OverA ?? null, axis: s.axis, polarities: s.q, OmegaBest: Om, OmegaLeastSquares: bo.OmegaLeastSquares, Omega2LeastSquares: bo.Omega2LeastSquares, inverseSquareResidualRel: b.maxRel, residualOverScale: b.maxOverScale, axialOverScale: b.axialOverScale, axialRel: b.axialRel, fullSolveResidualRel: r.maxRel, radialRel: r.radialRel, tangentialRel: r.tangentialRel, speeds, equalSpeeds: Math.max(...speeds) - Math.min(...speeds) < 1e-12, det, speedLabels: speedLabels(speeds) };
    if (r.maxRel <= 1e-12) entry.spectrum = rotatingSpectrum(rigidMembers(s.X, s.q, Om, s.axis), Om, { axis: s.axis, balanceTol: 1e-10 });
    rec.namedSolids.push(entry);
    log(`F1' ${s.name} R=${R}: Omega^2 LS ${bo.Omega2LeastSquares.toExponential(3)}, best Omega ${Om.toFixed(5)}, residual/scale ${b.maxOverScale.toExponential(3)} (axial/scale ${b.axialOverScale.toExponential(3)}, full solve per Omega^2R ${r.maxRel.toExponential(3)}), equal speeds ${entry.equalSpeeds}`);
  }
}
rec.finished = utc();
writeJson(RECEIPT, rec);
log(`F1 receipt written: ${path.relative(REPO_ROOT, RECEIPT)}`);
