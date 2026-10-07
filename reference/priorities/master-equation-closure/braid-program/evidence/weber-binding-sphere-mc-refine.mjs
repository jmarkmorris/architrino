#!/usr/bin/env node
// Refinement pass for a search dump of weber-binding-sphere-mc-search.mjs (same library, same solve):
// the best non-hexagon stage-2 results of a tag are re-solved at M=5 (N_c=24), and stage-1 results whose
// collocation motion residual is below 1e-6 without being the hexagon are escalated at M=5 and M=8.
// Usage: node weber-binding-sphere-mc-refine.mjs --tag <tag> --stratum <name> [--refine 10] [--enorm speed] [--speed-box 3]
// Appends {refineOf,...} and {stage1EscalationOf,...} lines to the dump; heartbeat one line per solve.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as L from './weber-binding-sphere-mc-lib.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..');
const args = process.argv.slice(2), arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const tag = arg('--tag'), stratum = arg('--stratum'), nRefine = Number(arg('--refine', '10')), eNorm = arg('--enorm', 'omega'), vBox = arg('--speed-box', null) ? Number(arg('--speed-box')) : null, R = 1, M = 3;
const dumpPath = path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc', `search-${tag}.jsonl`), t0 = Date.now(), wall = () => ((Date.now() - t0) / 1000).toFixed(1), utc = () => new Date().toISOString();
const perm = f => Array.from({ length: 6 }, (_, k) => ((f(k) % 6) + 6) % 6);
const GENS = { c2: [{ perm: perm(k => k + 3), R: L.rotZ(Math.PI), eps: 1 }], c3: [{ perm: perm(k => k + 2), R: L.rotZ(2 * Math.PI / 3), eps: 1 }], d3: [{ perm: perm(k => k + 2), R: L.rotZ(2 * Math.PI / 3), eps: 1 }, { perm: perm(k => -k), R: L.rotX(Math.PI), eps: -1 }] };
const basisFor = MM => L.stratumBasis(6, MM, GENS[stratum] ?? []);
function solve(stage, MM, BB, c, om, v, maxIter) {
  const prob = L.makeProblem({ q: L.Q6, M: MM, Nc: 4 * MM + 4, R, stage, B: BB, norm: 'meanRadius', speedBox: vBox ?? undefined, eNorm }), p = new Float64Array(prob.np);
  p.set(L.toReduced(BB, c)); p[prob.iOmega] = om; if (stage === 2) p[prob.iV] = v;
  const s = L.levenbergMarquardt(prob, p, { maxIter });
  if (!s.ok) return { stage, M: MM, Nc: 4 * MM + 4, ok: false, reason: s.reason, score: Infinity };
  const fine = L.fineEvaluate(s.c, s.omega, L.Q6, MM, { v: stage === 2 ? s.v : undefined, R }), cls = L.classify(fine, s.omega);
  const eUsed = eNorm === 'speed' ? Math.max(fine.maxE, fine.maxEspeed) : fine.maxE, score = stage === 2 ? Math.max(eUsed, fine.maxS, fine.maxV) : eUsed;
  return { stage, M: MM, Nc: 4 * MM + 4, ok: true, iter: s.iter, reason: s.reason, cost: s.cost, rms: Math.sqrt(s.cost / prob.nrows), colloc: { maxE: s.info.maxE, maxS: s.info.maxS, maxV: s.info.maxV, minSep: s.info.minSep, penalisedRows: s.info.penalised, boxRows: s.info.boxRows, maxSpeed: s.info.maxSpeed, det: [s.info.detMin, s.info.detMax] },
    omega: s.omega, period: 2 * Math.PI / s.omega, v: stage === 2 ? s.v : fine.vRms, fine: { Nf: fine.Nf, maxE: fine.maxE, maxEspeed: fine.maxEspeed, maxErel: fine.maxErel, maxS: fine.maxS, maxV: fine.maxV, minSep: fine.minSep, det: [fine.detMin, fine.detMax], minAbsDet: fine.minAbsDet, singular: fine.singular, radius: [fine.radiusMin, fine.radiusMax], meanRadius: fine.meanRadius, speed: [fine.speedMin, fine.speedMax], speedLabel: fine.speedLabel, H: fine.Hmean, HVariation: fine.HVariation, Hplus3v2: fine.Hplus3v2, sigDVariation: fine.sigDVariation, identityRel: fine.identityRel, pairDistanceSpread: fine.pairDistanceSpread, dominantHarmonic: fine.dominantHarmonic, memberRadius: fine.memberRadius, memberSpeed: fine.memberSpeed },
    score, classification: cls.label, hexagon: cls.hexagon || cls.hexagonNear, exactHexagon: cls.hexagon, periodic: cls.periodic, sphereCandidate: cls.sphereCandidate, c: Array.from(s.c) };
}
if (args.includes('--self-test')) { // known case: the hexagon padded to M=5 and perturbed by 5 percent is recovered by this script's solve
  const B5t = basisFor(5), r = L.rng(5), c0 = L.toFull(B5t, L.toReduced(B5t, L.perturb(L.hexagonCoefficients(5, R), r, 0.05))), res = solve(2, 5, B5t, c0, L.hexagonOmega(R) * 1.03, L.hexagonOmega(R) * 0.97, 300);
  console.log(`SELFTEST ${utc()} score=${res.score.toExponential(2)} exactHexagon=${res.exactHexagon} omegaError=${(res.omega - L.hexagonOmega(R)).toExponential(2)} pass=${res.exactHexagon && res.score <= 1e-10}`); process.exit(res.exactHexagon && res.score <= 1e-10 ? 0 : 1);
}
const dump = fs.readFileSync(dumpPath, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)).filter(l => l.results);
const cand = []; for (const row of dump) for (const key of ['direct2', 'stage1then2']) { const x = row.results[key]; if (x.ok && !x.hexagon && Number.isFinite(x.score)) cand.push({ start: row.start, route: key, x }); }
cand.sort((p, q) => p.x.score - q.x.score);
const seen = new Set(), top = []; for (const c of cand) { if (seen.has(c.start)) continue; seen.add(c.start); top.push(c); if (top.length >= nRefine) break; }
console.log(`START ${utc()} refine tag=${tag} stratum=${stratum} enorm=${eNorm} box=${vBox} rows=${dump.length} refining=${top.length}`);
const B5 = basisFor(5);
for (const t of top) {
  const res = solve(2, 5, B5, L.padCoefficients(Float64Array.from(t.x.c), 6, M, 5), t.x.omega, t.x.v, 150);
  fs.appendFileSync(dumpPath, JSON.stringify({ refineOf: t.start, route: t.route, result: res }) + '\n');
  console.log(`HB ${utc()} refine start=${t.start} route=${t.route} M3=${t.x.score.toExponential(2)} M5=${res.score.toExponential(2)} wall=${wall()}`);
}
const s1 = dump.filter(row => row.results.stage1.ok && !row.results.stage1.hexagon && row.results.stage1.colloc.maxE < 1e-6 && (row.results.stage1.fine.maxEspeed ?? 0) < 1e-2).slice(0, 6);
for (const row of s1) {
  let c = Float64Array.from(row.results.stage1.c), om = row.results.stage1.omega, Mcur = M, last = null;
  for (const Mn of [5, 8]) { const res = solve(1, Mn, basisFor(Mn), L.padCoefficients(c, 6, Mcur, Mn), om, undefined, 120); if (!res.ok) break; last = res; c = Float64Array.from(res.c); om = res.omega; Mcur = Mn; if (res.fine.maxE <= 1e-9) break; }
  if (last) { fs.appendFileSync(dumpPath, JSON.stringify({ stage1EscalationOf: row.start, result: last }) + '\n'); console.log(`HB ${utc()} stage1-escalate start=${row.start} M=${last.M} fineE=${last.fine.maxE.toExponential(2)} class=${last.classification.slice(0, 50)} wall=${wall()}`); }
}
console.log(`DONE ${utc()} refine tag=${tag} wall=${wall()}`);
