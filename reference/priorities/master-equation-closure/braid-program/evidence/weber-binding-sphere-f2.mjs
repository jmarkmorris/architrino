#!/usr/bin/env node
// weber-binding-sphere-f2.mjs — family F2: three antipodal opposite-polarity pairs on great circles.
// Pair k (members 2k with q=+1 and 2k+1 with q=-1) at +-R [cos(s_k Omega T + phi_k) u_k + sin(...) u_k'] with
// (u_k, u_k') an orthonormal basis of the plane of normal n_k, circulation s_k = +-1 and phase phi_k.  Common
// Omega is forced: on a great circle of radius R the path length is 2 pi R for every member, so equal speed
// v = Omega_k R forces equal Omega_k.  The prescribed-path residual R = max_T max_i |A_law + Omega^2 X| / (Omega^2 R)
// is the instrument; the residual landscape over the phases is the test of phase locking.
// Box: normals = orthogonal triad plus NTRIADS seeded random orthonormal triads; phases on a 12^3 grid (orthogonal)
// or 8^3 grid (random triads); senses (+++), (++-), (+-+), (-++); R in {0.5, 1, 2}; Omega on a 7-point scan around
// sqrt(K)/(2 R^{3/2}), then least squares over (phi_0, phi_1, phi_2, Omega) from the best grid points, and a declared
// extension with the three normals free as well.
// Usage: node weber-binding-sphere-f2.mjs [--triads N] [--quick]
import fs from 'node:fs';
import path from 'node:path';
import {
  COEFF, HERE, DATA_DIR, ensureDirs, params, utc, log, writeJson, v3, pathResidual, levenbergMarquardt, rng, randomTriad, speedLabels,
} from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const OUT = path.join(DATA_DIR, 'f2'); fs.mkdirSync(OUT, { recursive: true });
const RECEIPT = path.join(HERE, 'weber-binding-sphere-f2.json');
const argT = process.argv.indexOf('--triads'); const NTRIADS = argT > 0 ? Number(process.argv[argT + 1]) : 50;
const QUICK = process.argv.includes('--quick');
const Q = [1, -1, 1, -1, 1, -1];
const SENSES = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1]];
const RS = [0.5, 1, 2];
const OMEGA_FACTORS = QUICK ? [0.7, 1, 1.5] : [0.5, 0.7, 0.85, 1, 1.2, 1.5, 2];
const rec = { family: 'F2 three antipodal opposite-polarity pairs on great circles', law: COEFF, polarities: Q, started: utc(), box: { triads: `orthogonal + ${NTRIADS} seeded random orthonormal triads (seed 20261006)`, phaseGrid: { orthogonal: 12, random: QUICK ? 6 : 8 }, senses: SENSES, R: RS, OmegaFactors: OMEGA_FACTORS, OmegaReference: 'sqrt(K)/(2 R^{3/2}) (binary circle at rho = R)' } };

function basisOf(n) { const a = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]; const u = v3.unit(v3.cross(n, a)); const up = v3.cross(n, u); return [u, up]; }
function pathFor(normals, senses, phases, Omega, R) {
  const B = normals.map(basisOf);
  return T => {
    const x = [], v = [], areq = [];
    for (let k = 0; k < 3; k++) {
      const th = senses[k] * Omega * T + phases[k], c = Math.cos(th), s = Math.sin(th), [u, up] = B[k];
      const X = v3.scale(v3.add(v3.scale(u, c), v3.scale(up, s)), R), V = v3.scale(v3.add(v3.scale(u, -s), v3.scale(up, c)), senses[k] * Omega * R);
      x.push(X, v3.scale(X, -1)); v.push(V, v3.scale(V, -1)); areq.push(v3.scale(X, -Omega * Omega), v3.scale(X, Omega * Omega));
    }
    return { x, v, areq };
  };
}
function resid(normals, senses, phases, Omega, R, nT = 32, condition = 'none') {
  return pathResidual({ q: Q, path: pathFor(normals, senses, phases, Omega, R), Omega, R, period: 2 * Math.PI / Omega, nT, condition });
}
function normalsFromAngles(p) { return [0, 1, 2].map(k => { const th = p[2 * k], ph = p[2 * k + 1]; return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; }); }
function anglesOfNormals(ns) { const p = []; for (const n of ns) { p.push(Math.acos(Math.max(-1, Math.min(1, n[2]))), Math.atan2(n[1], n[0])); } return p; }

const rand = rng(20261006);
const triads = [{ name: 'orthogonal', normals: [[0, 0, 1], [1, 0, 0], [0, 1, 0]] }];
for (let k = 0; k < NTRIADS; k++) triads.push({ name: `random-${k}`, normals: randomTriad(rand) });
rec.triads = triads.map(t => ({ name: t.name, normals: t.normals }));

const combos = [], t0 = Date.now();
let nEval = 0;
for (const [ti, triad] of triads.entries()) {
  const nPhase = triad.name === 'orthogonal' ? 12 : (QUICK ? 6 : 8);
  for (const senses of SENSES) for (const R of RS) {
    const OmRef = Math.sqrt(1 / (4 * R * R * R));
    let grid = [];
    for (const f of OMEGA_FACTORS) { const Om = f * OmRef; for (let a = 0; a < nPhase; a++) for (let b = 0; b < nPhase; b++) for (let c = 0; c < nPhase; c++) { const phases = [2 * Math.PI * a / nPhase, 2 * Math.PI * b / nPhase, 2 * Math.PI * c / nPhase]; const r = resid(triad.normals, senses, phases, Om, R, 32); nEval++; grid.push({ phases, Omega: Om, factor: f, R: r.maxRel, radial: r.radialRel, tangential: r.tangentialRel }); } }
    grid.sort((a, b) => a.R - b.R);
    const vals = grid.map(g => g.R), gmin = vals[0], gmax = vals[vals.length - 1], gmed = vals[Math.floor(vals.length / 2)];
    const within = grid.filter(g => g.R <= 1.5 * gmin).length;
    // least-squares refinement of (phi0, phi1, phi2, Omega) from the best three distinct grid points
    const refined = [];
    for (const g of grid.slice(0, 3)) {
      const fun = p => { const r = resid(triad.normals, senses, [p[0], p[1], p[2]], Math.abs(p[3]), R, 32); nEval++; return r.failures.length ? new Array(18 * 32).fill(1e3) : samplesVector(triad.normals, senses, [p[0], p[1], p[2]], Math.abs(p[3]), R, 32); };
      const lm = levenbergMarquardt(fun, [...g.phases, g.Omega], { maxIter: 60, fdStep: 1e-6 });
      const r = resid(triad.normals, senses, lm.p.slice(0, 3), Math.abs(lm.p[3]), R, 64, 'exact');
      refined.push({ from: g, phases: lm.p.slice(0, 3), Omega: Math.abs(lm.p[3]), R: r.maxRel, radial: r.radialRel, tangential: r.tangentialRel, components: r.components, minSep: r.minSep, minAbsDet: r.minAbsDet, maxCond: r.maxCond, sigmaSumSpread: r.sigmaSumSpread, HPlus3v2: r.HPlus3v2, speed: r.speedLabels, iter: lm.iter, reason: lm.reason });
    }
    refined.sort((a, b) => a.R - b.R);
    const combo = { triad: triad.name, senses, R, OmegaReference: OmRef, grid: { points: grid.length, min: gmin, median: gmed, max: gmax, withinFactor1p5OfMin: within, best: grid.slice(0, 3) }, refined: refined[0], refinedAll: refined };
    combos.push(combo);
    if (triad.name === 'orthogonal') { fs.writeFileSync(path.join(OUT, `grid-orthogonal-s${senses.map(s => s > 0 ? 'p' : 'm').join('')}-R${R}.json`), JSON.stringify(grid) + '\n'); }
  }
  if (ti % 5 === 0 || ti === triads.length - 1) { const best = combos.slice().sort((a, b) => a.refined.R - b.refined.R)[0]; log(`heartbeat: triad ${ti + 1}/${triads.length}, evaluations ${nEval}, best refined residual ${best.refined.R.toExponential(3)} (${best.triad}, senses ${best.senses.join('')}, R=${best.R}), wall ${((Date.now() - t0) / 1000).toFixed(0)}s`); writeJson(RECEIPT, { ...rec, status: 'running', updated: utc(), combosDone: combos.length }); }
}
function samplesVector(normals, senses, phases, Omega, R, nT) {
  // discretised residual vector: the 18 components of (A_law + Omega^2 X)/(Omega^2 R) at nT times
  const P = params(Q, COEFF, 'none'), pth = pathFor(normals, senses, phases, Omega, R), out = [];
  for (let k = 0; k < nT; k++) { const T = k * (2 * Math.PI / Omega) / nT, s = pth(T), y = new Float64Array(36); for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) { y[3 * i + a] = s.x[i][a]; y[18 + 3 * i + a] = s.v[i][a]; } let A; try { A = solveAccelerations(y, P).A; } catch { return new Array(18 * nT).fill(1e3); } for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) out.push((A[3 * i + a] - s.areq[i][a]) / (Omega * Omega * R)); }
  return out;
}

combos.sort((a, b) => a.refined.R - b.refined.R);
rec.summary = { combos: combos.length, evaluations: nEval, globalMinimumRefined: combos[0].refined.R, globalMinimumCombo: { triad: combos[0].triad, senses: combos[0].senses, R: combos[0].R, phases: combos[0].refined.phases, Omega: combos[0].refined.Omega, OmegaOverReference: combos[0].refined.Omega / combos[0].OmegaReference }, histogram: { below1e_12: combos.filter(c => c.refined.R <= 1e-12).length, below1e_8: combos.filter(c => c.refined.R <= 1e-8).length, below1e_4: combos.filter(c => c.refined.R <= 1e-4).length, below1e_2: combos.filter(c => c.refined.R <= 1e-2).length, below1e_1: combos.filter(c => c.refined.R <= 1e-1).length } };
rec.bestTen = combos.slice(0, 10).map(c => ({ triad: c.triad, senses: c.senses, R: c.R, refined: c.refined, grid: c.grid }));
rec.perR = RS.map(R => { const cs = combos.filter(c => c.R === R); return { R, min: Math.min(...cs.map(c => c.refined.R)), orthogonalMin: Math.min(...cs.filter(c => c.triad === 'orthogonal').map(c => c.refined.R)) }; });
rec.perSense = SENSES.map(s => { const cs = combos.filter(c => c.senses.join() === s.join()); return { senses: s, min: Math.min(...cs.map(c => c.refined.R)) }; });
rec.orthogonal = combos.filter(c => c.triad === 'orthogonal').map(c => ({ senses: c.senses, R: c.R, grid: c.grid, refined: c.refined }));
log(`global minimum refined residual ${combos[0].refined.R.toExponential(4)} at ${combos[0].triad}, senses ${combos[0].senses.join('')}, R=${combos[0].R}, phases ${combos[0].refined.phases.map(p => (p * 180 / Math.PI).toFixed(2)).join(', ')} deg, Omega/ref ${(combos[0].refined.Omega / combos[0].OmegaReference).toFixed(4)}; radial ${combos[0].refined.radial.toExponential(3)}, tangential ${combos[0].refined.tangential.toExponential(3)}`);

// ---------------------------------------------------------------- declared extension: normals free as well (10 parameters) from the best ten
rec.extensionNormalsFree = [];
for (const c of combos.slice(0, 10)) {
  const n0 = triads.find(t => t.name === c.triad).normals, p0 = [...c.refined.phases, c.refined.Omega, ...anglesOfNormals(n0)];
  const fun = p => samplesVector(normalsFromAngles(p.slice(4)), c.senses, [p[0], p[1], p[2]], Math.abs(p[3]), c.R, 32);
  const lm = levenbergMarquardt(fun, p0, { maxIter: 80, fdStep: 1e-6 });
  const ns = normalsFromAngles(lm.p.slice(4)), r = resid(ns, c.senses, lm.p.slice(0, 3), Math.abs(lm.p[3]), c.R, 64, 'exact');
  const dots = [[0, 1], [0, 2], [1, 2]].map(([a, b]) => v3.dot(ns[a], ns[b]));
  rec.extensionNormalsFree.push({ from: { triad: c.triad, senses: c.senses, R: c.R, residual: c.refined.R }, normals: ns, normalDots: dots, phases: lm.p.slice(0, 3), Omega: Math.abs(lm.p[3]), residual: r.maxRel, radial: r.radialRel, tangential: r.tangentialRel, minSep: r.minSep, sigmaSumSpread: r.sigmaSumSpread, HPlus3v2: r.HPlus3v2, iter: lm.iter, reason: lm.reason });
  log(`normals-free refinement from ${c.triad} ${c.senses.join('')} R=${c.R}: ${c.refined.R.toExponential(3)} -> ${r.maxRel.toExponential(3)} (normal dots ${dots.map(d => d.toFixed(3)).join(', ')})`);
}
rec.extensionNormalsFree.sort((a, b) => a.residual - b.residual);
rec.summary.globalMinimumNormalsFree = rec.extensionNormalsFree[0].residual;

// ---------------------------------------------------------------- phase landscape at the best orthogonal combination (phase-locking test)
{
  const best = combos.filter(c => c.triad === 'orthogonal').sort((a, b) => a.refined.R - b.refined.R)[0];
  const Om = best.refined.Omega, n = 24, land = [];
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) { const ph = [2 * Math.PI * a / n, 2 * Math.PI * b / n, 2 * Math.PI * c / n]; land.push({ phases: ph, R: resid(best.normals ?? triads[0].normals, best.senses, ph, Om, best.R, 32).maxRel }); }
  land.sort((x, y) => x.R - y.R);
  const vals = land.map(l => l.R);
  // local minima on the periodic grid: points below all 26 neighbours
  const idx = (a, b, c) => ((a + n) % n) * n * n + ((b + n) % n) * n + ((c + n) % n), arr = new Float64Array(n * n * n);
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) arr[idx(a, b, c)] = resid(triads[0].normals, best.senses, [2 * Math.PI * a / n, 2 * Math.PI * b / n, 2 * Math.PI * c / n], Om, best.R, 32).maxRel;
  const minima = [];
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) for (let c = 0; c < n; c++) { const v0 = arr[idx(a, b, c)]; let isMin = true; for (let da = -1; da <= 1 && isMin; da++) for (let db = -1; db <= 1 && isMin; db++) for (let dc = -1; dc <= 1; dc++) { if (!da && !db && !dc) continue; if (arr[idx(a + da, b + db, c + dc)] < v0) { isMin = false; break; } } if (isMin) minima.push({ phasesDeg: [a, b, c].map(k => 360 * k / n), R: v0 }); }
  minima.sort((x, y) => x.R - y.R);
  rec.phaseLandscape = { triad: 'orthogonal', senses: best.senses, R: best.R, Omega: Om, gridPerAxis: n, min: vals[0], median: vals[Math.floor(vals.length / 2)], max: vals[vals.length - 1], fractionWithin1p5OfMin: land.filter(l => l.R <= 1.5 * vals[0]).length / land.length, fractionWithin2OfMin: land.filter(l => l.R <= 2 * vals[0]).length / land.length, localMinima: minima.slice(0, 24), localMinimaCount: minima.length, note: 'the ratio max/min and the number and location of local minima measure how sharply the residual selects phases; a flat landscape means no phase locking is derivable from this family' };
  fs.writeFileSync(path.join(OUT, 'phase-landscape-orthogonal.json'), JSON.stringify(land.slice(0, 2000)) + '\n');
  log(`phase landscape (orthogonal, senses ${best.senses.join('')}, R=${best.R}): min ${vals[0].toExponential(3)}, median ${rec.phaseLandscape.median.toExponential(3)}, max ${vals[vals.length - 1].toExponential(3)}, local minima ${minima.length}`);
}
rec.finished = utc(); rec.wallSeconds = (Date.now() - t0) / 1000;
writeJson(RECEIPT, rec);
log(`F2 receipt written: ${path.relative(REPO_ROOT, RECEIPT)} (wall ${rec.wallSeconds.toFixed(0)}s)`);
