#!/usr/bin/env node
// Round-2 known cases for the bounded solver and the amended residual (preregistration 11.6).
// Usage: node weber-binding-sphere-mc-r2-known-cases.mjs   (writes weber-binding-sphere-mc-r2-known-cases.json)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { L, lmBounded, classifyR2, BOX } from './weber-binding-sphere-mc-r2-lib.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), out = { instrument: 'weber-binding-sphere-mc-r2-lib.mjs on weber-binding-sphere-mc-lib.mjs', command: 'node reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-mc-r2-known-cases.mjs', cases: {} };
const rec = (k, o) => { out.cases[k] = { ...o, utc: new Date().toISOString() }; console.log(k, JSON.stringify(o).slice(0, 900)); fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-mc-r2-known-cases.json'), JSON.stringify(out, null, 1)); };
const R = 1, Om = L.hexagonOmega(R);
function hexStart(M, B, prob, rel, seed, laps = 1) { const r = L.rng(seed), c = L.toFull(B, L.toReduced(B, rel > 0 ? L.perturb(L.hexagonCoefficients(M, R, laps), r, rel) : L.hexagonCoefficients(M, R, laps))), p = new Float64Array(prob.np); p.set(L.toReduced(B, c)); p[prob.iOmega] = Om / laps * (rel > 0 ? 1 + rel * (2 * r() - 1) : 1); if (prob.iV >= 0) p[prob.iV] = Om * R * (rel > 0 ? 1 + rel * (2 * r() - 1) : 1); return p; }
for (const M of [3, 5]) {
  const B = L.stratumBasis(6, M), prob = L.makeProblem({ q: L.Q6, M, Nc: 4 * M + 4, R, stage: 2, B, eNorm: 'speed' });
  const z = prob.evaluate(hexStart(M, B, prob, 0, 1), false), d = prob.evaluate((() => { const p = hexStart(M, B, prob, 0, 1); p[prob.iOmega] *= 1.01; return p; })(), false);
  rec(`R2-KC1-M${M}`, { description: 'hexagon is a zero of the amended (speed-normalized) stage 2', value: Math.max(z.info.maxE, z.info.maxS, z.info.maxV), tolerance: 1e-13, pass: Math.max(z.info.maxE, z.info.maxS, z.info.maxV) <= 1e-13 });
  rec(`R2-KC5-M${M}`, { description: 'hexagon at 1.01 omega is not a zero', value: d.info.maxE, tolerance: '>= 1e-3', pass: d.info.maxE >= 1e-3 });
  const runs = [];
  for (let trial = 0; trial < 3; trial++) for (const accelerate of [false, true]) {
    const t0 = Date.now(), s = lmBounded(prob, hexStart(M, B, prob, 0.2, 20261006 + trial), { maxIter: 400, accelerate });
    const fine = L.fineEvaluate(s.c, s.omega, L.Q6, M, { v: s.v, R }), cls = classifyR2(fine, s.omega, R), worst = Math.max(fine.maxE, fine.maxEspeed, fine.maxS, fine.maxV, Math.abs(s.omega - Om));
    runs.push({ trial, accelerate, iterations: s.iter, tailSteps: s.jumps, reason: s.reason, worst, hexagon: cls.hexagon, boxLimited: s.boxLimited, wallSeconds: (Date.now() - t0) / 1000, costTrace: s.trace.filter((_, k) => k % Math.max(1, Math.ceil(s.trace.length / 12)) === 0).map(x => +x.toExponential(2)) });
  }
  const acc = runs.filter(x => x.accelerate), plain = runs.filter(x => !x.accelerate);
  rec(`R2-KC2-M${M}`, { description: 'reach in the unconstrained stratum: hexagon recovered from 20 percent perturbed coefficients by the bounded solver, with and without the geometric-tail step', runs, iterationsPlain: plain.map(x => x.iterations), iterationsAccelerated: acc.map(x => x.iterations), value: Math.max(...acc.map(x => x.worst)), tolerance: 1e-10, pass: acc.every(x => x.hexagon && x.worst <= 1e-10) });
}
// stage 1 then stage 2 route with the bounded solver (M=3)
{ const M = 3, B = L.stratumBasis(6, M), p1 = L.makeProblem({ q: L.Q6, M, Nc: 16, R, stage: 1, B, norm: 'meanRadius', eNorm: 'speed' }), s1 = lmBounded(p1, hexStart(M, B, p1, 0.2, 20261006), { maxIter: 300 });
  const p2 = L.makeProblem({ q: L.Q6, M, Nc: 16, R, stage: 2, B, eNorm: 'speed' }), q = new Float64Array(p2.np); q.set(L.toReduced(B, s1.c)); q[p2.iOmega] = s1.omega; q[p2.iV] = s1.omega * R; const s2 = lmBounded(p2, q, { maxIter: 300 });
  const f1 = L.fineEvaluate(s1.c, s1.omega, L.Q6, M, { R }), f2 = L.fineEvaluate(s2.c, s2.omega, L.Q6, M, { v: s2.v, R });
  rec('R2-KC2-stage1-route', { description: 'stage 1 (bounded, tail step) from a 20 percent perturbed hexagon, then stage 2', stage1: { iterations: s1.iter, tailSteps: s1.jumps, maxE: f1.maxE, pairDistanceSpread: f1.pairDistanceSpread, classification: classifyR2(f1, s1.omega).label.slice(0, 40) }, stage2: { iterations: s2.iter, worst: Math.max(f2.maxE, f2.maxEspeed, f2.maxS, f2.maxV, Math.abs(s2.omega - Om)) }, value: Math.max(f2.maxE, f2.maxEspeed, f2.maxS, f2.maxV), tolerance: 1e-10, pass: Math.max(f2.maxE, f2.maxEspeed, f2.maxS, f2.maxV) <= 1e-10 }); }
// bounds: a start outside the box is clamped and a hexagon at the wrong radius scale cannot leave the box
{ const M = 3, B = L.stratumBasis(6, M), prob = L.makeProblem({ q: L.Q6, M, Nc: 16, R, stage: 2, B, eNorm: 'speed' }), p = hexStart(M, B, prob, 0.05, 3); p[prob.iOmega] = 9; p[prob.iV] = 5; const s = lmBounded(prob, p, { maxIter: 5 });
  rec('R2-bounds', { description: 'omega and v started outside the box are clamped into it at once and stay inside', omega: s.omega, v: s.v, box: BOX, pass: s.omega <= 4 && s.omega >= 0.2 && s.v <= 1.5 && s.v >= 0.2 }); }
// non-rigid known case with the bounded solver code path (unbounded option, N=2): reuse the round-1 KC3 phi=2pi coefficients as a perturbed start
{ const kf = path.join(HERE, '../../../../../.tmp/weber-binding-sphere/mc/kc3-phi2-coefficients.json');
  if (fs.existsSync(kf)) { const k = JSON.parse(fs.readFileSync(kf, 'utf8')), M = k.M, B = L.stratumBasis(2, M), c0 = Float64Array.from(k.c), ms = L.meanSquareRadius(c0, 2, M).value, Rk = Math.sqrt(ms);
    const prob = L.makeProblem({ q: [1, -1], M, Nc: 4 * M + 2, R: Rk, stage: 1, B, norm: 'meanRadius', eNorm: 'speed' }), r = L.rng(4), p = new Float64Array(prob.np); p.set(L.toReduced(B, L.perturb(c0, r, 0.01))); p[prob.iOmega] = k.omega * 1.01;
    const s = lmBounded(prob, p, { maxIter: 100, bounded: false, tol: 1e-27 }), fine = L.fineEvaluate(s.c, s.omega, [1, -1], M, { Nf: 1024, R: Rk });
    rec('R2-KC3', { description: 'rosette (apsidal angle 2 pi, e=0.3) recovered by the round-2 solver code path with the speed-normalized stage 1 from a 1 percent perturbed coefficient set and 1 percent detuned omega; period against the round-1 quadrature value 5.311758491618341', period: 2 * Math.PI / s.omega, periodError: 2 * Math.PI / s.omega - 5.311758491618341, fineMaxE: fine.maxE, iterations: s.iter, value: Math.max(Math.abs(2 * Math.PI / s.omega - 5.311758491618341), fine.maxE), tolerance: 1e-8, pass: Math.abs(2 * Math.PI / s.omega - 5.311758491618341) <= 1e-8 && fine.maxE <= 1e-9 }); } }
console.log('ALL PASS', Object.values(out.cases).every(x => x.pass));
