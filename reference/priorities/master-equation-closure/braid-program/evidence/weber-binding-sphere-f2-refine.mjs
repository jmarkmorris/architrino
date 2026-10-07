#!/usr/bin/env node
// weber-binding-sphere-f2-refine.mjs — bounded-rate refinement of the F2 grid minima.
// The first refinement stage of weber-binding-sphere-f2.mjs left Omega free; because the preregistered residual is
// normalised by Omega^2 R, the least-squares step can lower it by sending Omega to very large values (speeds far
// above c_f) or to infinity, which is not a balance.  This script re-refines the best grid points of every
// (triad, senses, R) combination with Omega clamped to [0.3, 3] times the reference rate sqrt(K)/(2 R^{3/2}) and the
// phases free, and reports the floor, its radial/tangential decomposition and the PI filters at the floor.
import path from 'node:path';
import { COEFF, HERE, utc, log, writeJson, v3, pathResidual, levenbergMarquardt } from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';
import { makeParams } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';
import fs from 'node:fs';

const SRC = path.join(HERE, 'weber-binding-sphere-f2.json'), RECEIPT = path.join(HERE, 'weber-binding-sphere-f2-refine.json');
const src = JSON.parse(fs.readFileSync(SRC, 'utf8'));
const Q = [1, -1, 1, -1, 1, -1], P = makeParams({ q: Q, ...COEFF, condition: 'none' });
function basisOf(n) { const a = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]; const u = v3.unit(v3.cross(n, a)); const up = v3.cross(n, u); return [u, up]; }
function pathFor(normals, senses, phases, Omega, R) {
  const B = normals.map(basisOf);
  return T => { const x = [], v = [], areq = []; for (let k = 0; k < 3; k++) { const th = senses[k] * Omega * T + phases[k], c = Math.cos(th), s = Math.sin(th), [u, up] = B[k]; const X = v3.scale(v3.add(v3.scale(u, c), v3.scale(up, s)), R), V = v3.scale(v3.add(v3.scale(u, -s), v3.scale(up, c)), senses[k] * Omega * R); x.push(X, v3.scale(X, -1)); v.push(V, v3.scale(V, -1)); areq.push(v3.scale(X, -Omega * Omega), v3.scale(X, Omega * Omega)); } return { x, v, areq }; };
}
function vec(normals, senses, phases, Omega, R, nT = 32) {
  const pth = pathFor(normals, senses, phases, Omega, R), out = [];
  for (let k = 0; k < nT; k++) { const T = k * (2 * Math.PI / Omega) / nT, s = pth(T), y = new Float64Array(36); for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) { y[3 * i + a] = s.x[i][a]; y[18 + 3 * i + a] = s.v[i][a]; } let A; try { A = solveAccelerations(y, P).A; } catch { return new Array(18 * nT).fill(1e3); } for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) out.push((A[3 * i + a] - s.areq[i][a]) / (Omega * Omega * R)); }
  return out;
}
const triads = Object.fromEntries(src.triads.map(t => [t.name, t.normals]));
const rows = [], t0 = Date.now();
// every combination appears in src.orthogonal (full) and src.bestTen (partial); rebuild the full combo list from the grid records kept in bestTen/orthogonal plus the top-level per-combo grid minima is not stored, so refine the orthogonal set fully and the best ten random combos
const combos = [...src.orthogonal.map(o => ({ triad: 'orthogonal', senses: o.senses, R: o.R, grid: o.grid })), ...src.bestTen.filter(b => b.triad !== 'orthogonal').map(b => ({ triad: b.triad, senses: b.senses, R: b.R, grid: b.grid }))];
for (const c of combos) {
  const ref = Math.sqrt(1 / (4 * c.R ** 3)), normals = triads[c.triad], clamp = p => { const q = Float64Array.from(p); q[3] = Math.min(3 * ref, Math.max(0.3 * ref, Math.abs(q[3]))); return q; };
  let best = null;
  for (const g of c.grid.best.slice(0, 3)) {
    const lm = levenbergMarquardt(p => vec(normals, c.senses, [p[0], p[1], p[2]], clamp(p)[3], c.R), [...g.phases, g.Omega], { maxIter: 80, fdStep: 1e-6, clamp });
    const pc = clamp(lm.p), r = pathResidual({ q: Q, path: pathFor(normals, c.senses, [pc[0], pc[1], pc[2]], pc[3], c.R), Omega: pc[3], R: c.R, period: 2 * Math.PI / pc[3], nT: 64, condition: 'exact' });
    if (!best || r.maxRel < best.residual) best = { residual: r.maxRel, radial: r.radialRel, tangential: r.tangentialRel, components: r.components, phasesDeg: [pc[0], pc[1], pc[2]].map(z => ((z * 180 / Math.PI) % 360 + 360) % 360), OmegaOverReference: pc[3] / ref, minSep: r.minSep, minAbsDet: r.minAbsDet, maxCond: r.maxCond, speed: r.speedLabels, sigmaSumSpread: r.sigmaSumSpread, HPlus3v2: r.HPlus3v2, iter: lm.iter, reason: lm.reason, fromGrid: g.R };
  }
  rows.push({ triad: c.triad, senses: c.senses, R: c.R, gridMin: c.grid.min, refined: best });
  log(`${c.triad} ${c.senses.join('')} R=${c.R}: grid ${c.grid.min.toExponential(3)} -> bounded refinement ${best.residual.toExponential(3)} (Omega/ref ${best.OmegaOverReference.toFixed(3)}, radial ${best.radial.toExponential(2)}, tangential ${best.tangential.toExponential(2)}, phases ${best.phasesDeg.map(z => z.toFixed(1)).join(',')})`);
}
rows.sort((a, b) => a.refined.residual - b.refined.residual);
const rec = { subject: 'F2 bounded-rate refinement (Omega in [0.3, 3] x reference)', started: utc(), combosRefined: rows.length, floor: rows[0], rows, perR: [0.5, 1, 2].map(R => ({ R, min: Math.min(...rows.filter(r => r.R === R).map(r => r.refined.residual)) })), wallSeconds: (Date.now() - t0) / 1000, finished: utc() };
writeJson(RECEIPT, rec);
log(`floor ${rows[0].refined.residual.toExponential(4)} at ${rows[0].triad} ${rows[0].senses.join('')} R=${rows[0].R}; receipt ${path.relative(REPO_ROOT, RECEIPT)}`);
