#!/usr/bin/env node
// Target search for the multi-curve collocation (preregistration 11.4).
// Usage: node weber-binding-sphere-mc-search.mjs --stratum <free|c2|c3|d3|w111111|w111122|w112233|w222222>
//          [--starts n] [--first k] [--seed 20261006] [--M 3] [--refine 10] [--tag name]
// Heartbeat: one line per start (start index, best stage-2 residual so far, wall seconds).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as L from './weber-binding-sphere-mc-lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..');
const args = process.argv.slice(2), arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const stratum = arg('--stratum', 'free'), nStarts = Number(arg('--starts', '60')), first = Number(arg('--first', '0')), seed = Number(arg('--seed', '20261006'));
const M = Number(arg('--M', '3')), Nc = 4 * M + 4, R = 1, nRefine = Number(arg('--refine', '10')), vBox = arg('--speed-box', null) ? Number(arg('--speed-box', null)) : null, eNorm = arg('--enorm', 'omega'), tag = arg('--tag', `${stratum}-${eNorm === 'speed' ? 'vnorm-' : ''}${vBox ? 'box' + vBox : 'nobox'}-${first}`);
const dataDir = path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc'); fs.mkdirSync(dataDir, { recursive: true });
const dumpPath = path.join(dataDir, `search-${tag}.jsonl`), receiptPath = path.join(HERE, `weber-binding-sphere-mc-search-${tag}.json`);
fs.writeFileSync(dumpPath, '');
const t0 = Date.now(), wall = () => (Date.now() - t0) / 1000, utc = () => new Date().toISOString();

// ---------------------------------------------------------------- strata
const perm = f => Array.from({ length: 6 }, (_, k) => ((f(k) % 6) + 6) % 6);
const GENS = {
  free: [], w111111: [], w111122: [], w112233: [], w222222: [],
  c2: [{ perm: perm(k => k + 3), R: L.rotZ(Math.PI), eps: 1 }],
  c3: [{ perm: perm(k => k + 2), R: L.rotZ(2 * Math.PI / 3), eps: 1 }],
  d3: [{ perm: perm(k => k + 2), R: L.rotZ(2 * Math.PI / 3), eps: 1 }, { perm: perm(k => -k), R: L.rotX(Math.PI), eps: -1 }],
};
const WIND = { w111111: [1, 1, 1, 1, 1, 1], w111122: [1, 1, 1, 1, 2, 2], w112233: [1, 1, 2, 2, 3, 3], w222222: [2, 2, 2, 2, 2, 2] };
if (!(stratum in GENS)) throw new Error('unknown stratum');
const basisFor = MM => L.stratumBasis(6, MM, GENS[stratum]);
const B = basisFor(M);
const project = (BB, c) => L.toFull(BB, L.toReduced(BB, c));
// known case for the stratum basis: the hexagon (or its double lap) lies in the stratum
const hexLaps = stratum === 'w222222' ? 2 : 1, hexC = L.hexagonCoefficients(M, R, hexLaps);
const hexIn = Math.max(...Array.from(project(B, hexC), (z, k) => Math.abs(z - hexC[k])));
const hexIsMember = !['w111122', 'w112233'].includes(stratum);
console.log(`START ${utc()} stratum=${stratum} tag=${tag} starts=${first}..${first + nStarts - 1} enorm=${eNorm} box=${vBox} M=${M} Nc=${Nc} nred=${B.nred} groupOrder=${B.groupOrder} hexagonInStratum=${hexIn.toExponential(2)}`);
if (hexIn > 1e-12) throw new Error('stratum basis known case failed: hexagon not invariant');

// ---------------------------------------------------------------- seeds
const K = 64;
function deform(samples, r, amp) {
  const g = [1, 2].map(m => [0, 1].map(() => [L.gauss(r), L.gauss(r), L.gauss(r)].map(z => z * amp / m)));
  return samples.map((p, k) => { const t = 2 * Math.PI * k / K; return p.map((z, a) => z + g[0][0][a] * Math.cos(t) + g[0][1][a] * Math.sin(t) + g[1][0][a] * Math.cos(2 * t) + g[1][1][a] * Math.sin(2 * t)); });
}
const sgn = r => (r() < 0.5 ? -1 : 1);
function seedSmooth(r) { return L.samplesToCoefficients(Array.from({ length: 6 }, () => deform(L.circleSamples(K, R, R, 1, L.randomRotation(r), 2 * Math.PI * r(), sgn(r)), r, 0.05 + 0.25 * r())), M, R); }
function seedRandom(r) {
  const c = new Float64Array(L.nFull(6, M));
  for (let i = 0; i < 6; i++) for (let s = 0; s < L.nBasis(M); s++) { const m = Math.ceil(s / 2); for (let a = 0; a < 3; a++) c[L.idx(M, i, s, a)] = L.gauss(r) / (1 + m * m) * (s === 0 ? 0.3 : 1); }
  const cp = project(B, c), ms = L.meanSquareRadius(cp, 6, M).value; return cp.map(z => z * R / Math.sqrt(ms));
}
function antipodalPairs(circles) { const out = []; for (const s of circles) { out.push(s); out.push(s.map(p => p.map(z => -z))); } return out; }
function seedStacked(r) { // R2.1 geometries: coaxial latitude circles, three antipodal opposite-polarity pairs or 2+2+2 same-circle pairs
  const geo = [[1, 0.5, 1 / 3], [1, 0.5, 0.5], [0.5, 1, 0.5], [1, 1, 1].map(() => 0.5 + 0.5 * r()), [Math.sqrt(3) / 2, Math.sqrt(3) / 2, 1]][Math.floor(r() * 5)];
  const amax = Math.max(...geo), same = r() < 0.3, circles = [];
  if (!same) { for (const a of geo) circles.push(L.circleSamples(K, R, a * R, Math.max(1, Math.min(M, Math.round(amax / a))), L.rotZ(0), 2 * Math.PI * r(), sgn(r), sgn(r))); return L.samplesToCoefficients(antipodalPairs(circles), M, R); }
  const zs = [0, 1, -1], mem = [];
  geo.forEach((a, k) => { const w = Math.max(1, Math.min(M, Math.round(amax / a))), ph = 2 * Math.PI * r(), s = sgn(r); mem.push(L.circleSamples(K, R, a * R, w, L.rotZ(0), ph, s, zs[k] || 1)); mem.push(L.circleSamples(K, R, a * R, w, L.rotZ(0), ph + Math.PI, s, zs[k] || 1)); });
  return L.samplesToCoefficients(mem, M, R);
}
function seedGreatCircle(r) { // F2: three antipodal opposite-polarity pairs on great circles
  const triad = r() < 0.5, base = L.randomRotation(r), axes = [L.rotZ(0), L.rotX(Math.PI / 2), [[0, 0, 1], [0, 1, 0], [-1, 0, 0]]];
  return L.samplesToCoefficients(antipodalPairs([0, 1, 2].map(k => L.circleSamples(K, R, R, 1, triad ? axes[k] : L.randomRotation(r), 2 * Math.PI * r(), sgn(r)))), M, R);
}
function seedWinding(r, w) { // members in antipodal opposite-polarity pairs (2k, 2k+1) or independent, circle radius proportional to 1/w
  const wmin = Math.min(...w), abase = 0.7 + 0.3 * r(), mode = Math.floor(r() * 3), amp = 0.02 + 0.1 * r();
  if (mode < 2) { const circles = [0, 1, 2].map(k => deform(L.circleSamples(K, R, abase * R * wmin / w[2 * k], w[2 * k], mode === 0 ? L.rotZ(0) : L.randomRotation(r), 2 * Math.PI * r(), sgn(r), sgn(r)), r, amp)); return L.samplesToCoefficients(antipodalPairs(circles), M, R); }
  return L.samplesToCoefficients(w.map(wi => deform(L.circleSamples(K, R, abase * R * wmin / wi, wi, L.randomRotation(r), 2 * Math.PI * r(), sgn(r), sgn(r)), r, amp)), M, R);
}
function rmsTauSpeed(c) { let s = 0; for (let i = 0; i < 6; i++) for (let m = 1; m <= M; m++) for (let a = 0; a < 3; a++) s += 0.5 * m * m * (c[L.idx(M, i, 2 * m - 1, a)] ** 2 + c[L.idx(M, i, 2 * m, a)] ** 2); return Math.sqrt(s / 6); }
function makeStart(k) {
  const r = L.rng(seed + 7919 * k + 104729 * Object.keys(GENS).indexOf(stratum));
  let type, c, om, v;
  if (k < 3 && hexIsMember) { // reach starts: perturbed hexagon in the stratum
    type = 'reach-hexagon-20pct'; c = project(B, L.perturb(hexC, r, 0.2)); om = L.hexagonOmega(R) / hexLaps * (1 + 0.2 * (2 * r() - 1)); v = L.hexagonOmega(R) * R * (1 + 0.2 * (2 * r() - 1));
    return { k, type, c, om, v };
  }
  if (stratum in WIND) { type = 'winding-circles'; c = seedWinding(r, WIND[stratum]); }
  else { const pick = k % 4; type = ['smooth-spherical', 'random-coefficients', 'stacked-latitude', 'great-circle-pairs'][pick]; c = [seedSmooth, seedRandom, seedStacked, seedGreatCircle][pick](r); }
  c = project(B, c); v = 0.5 + 0.7 * r(); om = v / rmsTauSpeed(c);
  return { k, type, c, om, v };
}

// ---------------------------------------------------------------- one solve + fine evaluation
function solve(stage, MM, BB, c, om, v, maxIter = 250) {
  const prob = L.makeProblem({ q: L.Q6, M: MM, Nc: 4 * MM + 4, R, stage, B: BB, norm: 'meanRadius', speedBox: vBox ?? undefined, eNorm }), p = new Float64Array(prob.np);
  p.set(L.toReduced(BB, c)); p[prob.iOmega] = om; if (stage === 2) p[prob.iV] = v;
  const s = L.levenbergMarquardt(prob, p, { maxIter });
  if (!s.ok) return { stage, M: MM, Nc: 4 * MM + 4, ok: false, reason: s.reason, score: Infinity };
  const fine = L.fineEvaluate(s.c, s.omega, L.Q6, MM, { v: stage === 2 ? s.v : undefined, R }), cls = L.classify(fine, s.omega);
  const eUsed = eNorm === 'speed' ? Math.max(fine.maxE, fine.maxEspeed) : fine.maxE, score = stage === 2 ? Math.max(eUsed, fine.maxS, fine.maxV) : eUsed;
  return { stage, M: MM, Nc: 4 * MM + 4, ok: true, iter: s.iter, reason: s.reason, cost: s.cost, rms: Math.sqrt(s.cost / prob.nrows), colloc: { maxE: s.info.maxE, maxS: s.info.maxS, maxV: s.info.maxV, minSep: s.info.minSep, penalisedRows: s.info.penalised, boxRows: s.info.boxRows, maxSpeed: s.info.maxSpeed, det: [s.info.detMin, s.info.detMax] },
    omega: s.omega, period: 2 * Math.PI / s.omega, v: stage === 2 ? s.v : fine.vRms, fine: { Nf: fine.Nf, maxE: fine.maxE, maxEspeed: fine.maxEspeed, maxErel: fine.maxErel, maxS: fine.maxS, maxV: fine.maxV, minSep: fine.minSep, det: [fine.detMin, fine.detMax], minAbsDet: fine.minAbsDet, singular: fine.singular, radius: [fine.radiusMin, fine.radiusMax], meanRadius: fine.meanRadius, speed: [fine.speedMin, fine.speedMax], speedLabel: fine.speedLabel, H: fine.Hmean, HVariation: fine.HVariation, Hplus3v2: fine.Hplus3v2, sigDVariation: fine.sigDVariation, identityRel: fine.identityRel, pairDistanceSpread: fine.pairDistanceSpread, dominantHarmonic: fine.dominantHarmonic },
    score, classification: cls.label, hexagon: cls.hexagon || cls.hexagonNear, exactHexagon: cls.hexagon, periodic: cls.periodic, sphereCandidate: cls.sphereCandidate, c: Array.from(s.c) };
}
const strip = x => { const { c, ...rest } = x; return rest; };
const rows = []; let bestS2 = Infinity, bestS1 = Infinity;
for (let k = first; k < first + nStarts; k++) {
  const st = makeStart(k), row = { start: k, type: st.type, omega0: st.om, v0: st.v, results: {} };
  const a = solve(2, M, B, st.c, st.om, st.v); row.results.direct2 = a;
  const b1 = solve(1, M, B, st.c, st.om); row.results.stage1 = b1;
  const b2 = b1.ok ? solve(2, M, B, Float64Array.from(b1.c), b1.omega, b1.v) : { ok: false, reason: 'stage-1 failed', score: Infinity }; row.results.stage1then2 = b2;
  fs.appendFileSync(dumpPath, JSON.stringify(row) + '\n');
  for (const key of Object.keys(row.results)) row.results[key] = strip(row.results[key]);
  rows.push(row);
  if (!st.type.startsWith('reach')) { bestS2 = Math.min(bestS2, a.hexagon ? Infinity : a.score, b2.hexagon ? Infinity : b2.score); bestS1 = Math.min(bestS1, b1.hexagon ? Infinity : b1.score); }
  console.log(`HB ${utc()} start=${k} type=${st.type} direct2=${a.score.toExponential(2)}${a.hexagon ? '(hex)' : ''} stage1=${b1.score.toExponential(2)}${b1.hexagon ? '(hex)' : b1.periodic ? '(periodic)' : ''} s1then2=${b2.score.toExponential(2)}${b2.hexagon ? '(hex)' : ''} bestNonHexStage2=${bestS2.toExponential(2)} bestNonHexStage1=${bestS1.toExponential(2)} wall=${wall().toFixed(1)}`);
}

// ---------------------------------------------------------------- refinement of the best non-hexagon stage-2 results at M=5
const dump = fs.readFileSync(dumpPath, 'utf8').trim().split('\n').map(l => JSON.parse(l));
const cand = [];
for (const row of dump) for (const key of ['direct2', 'stage1then2']) { const x = row.results[key]; if (x.ok && !x.hexagon && Number.isFinite(x.score)) cand.push({ start: row.start, type: row.type, route: key, x }); }
cand.sort((p, q) => p.x.score - q.x.score);
const seen = new Set(), top = []; for (const cnd of cand) { if (seen.has(cnd.start)) continue; seen.add(cnd.start); top.push(cnd); if (top.length >= nRefine) break; }
const M5 = 5, B5 = basisFor(M5), refined = [];
for (const t of top) {
  const res = solve(2, M5, B5, L.padCoefficients(Float64Array.from(t.x.c), 6, M, M5), t.x.omega, t.x.v, 300);
  fs.appendFileSync(dumpPath, JSON.stringify({ refineOf: t.start, route: t.route, result: res }) + '\n');
  refined.push({ start: t.start, type: t.type, route: t.route, scoreM3: t.x.score, result: strip(res) });
  console.log(`HB ${utc()} refine start=${t.start} route=${t.route} M3=${t.x.score.toExponential(2)} M5=${res.score.toExponential(2)} E=${res.fine?.maxE.toExponential(2)} S=${res.fine?.maxS.toExponential(2)} V=${res.fine?.maxV.toExponential(2)} wall=${wall().toFixed(1)}`);
}
// stage-1 periodic or near-converged non-hexagon objects: escalate M (5, 8) with stage 1
const s1cand = dump.filter(row => row.results.stage1.ok && !row.results.stage1.hexagon && row.results.stage1.colloc.maxE < 1e-6).map(row => ({ start: row.start, type: row.type, x: row.results.stage1 }));
const stage1Objects = [];
for (const t of s1cand.slice(0, 12)) {
  let c = Float64Array.from(t.x.c), om = t.x.omega, Mcur = M, last = null;
  for (const Mn of [5, 8]) { const Bn = basisFor(Mn), res = solve(1, Mn, Bn, L.padCoefficients(c, 6, Mcur, Mn), om, undefined, 200); if (!res.ok) break; last = res; c = Float64Array.from(res.c); om = res.omega; Mcur = Mn; if (res.fine.maxE <= 1e-9) break; }
  if (last) { fs.appendFileSync(dumpPath, JSON.stringify({ stage1EscalationOf: t.start, result: last }) + '\n'); stage1Objects.push({ start: t.start, type: t.type, M3: strip(t.x), escalated: strip(last) }); console.log(`HB ${utc()} stage1-escalate start=${t.start} M=${last.M} fineE=${last.fine.maxE.toExponential(2)} class=${last.classification} wall=${wall().toFixed(1)}`); }
}

// ---------------------------------------------------------------- receipt
const reach = rows.filter(x => x.type.startsWith('reach')).map(x => ({ start: x.start, direct2: { score: x.results.direct2.score, hexagon: !!x.results.direct2.hexagon, omega: x.results.direct2.omega }, stage1: { score: x.results.stage1.score, hexagon: !!x.results.stage1.hexagon, classification: x.results.stage1.classification }, stage1then2: { score: x.results.stage1then2.score, hexagon: !!x.results.stage1then2.hexagon } }));
const tgt = rows.filter(x => !x.type.startsWith('reach'));
const count = (f) => tgt.filter(f).length, byType = {};
for (const x of tgt) { const t = byType[x.type] ??= { starts: 0, direct2Hexagon: 0, stage1Hexagon: 0, stage1PeriodicNonHexagon: 0, stage1then2Hexagon: 0, bestNonHexDirect2: Infinity, bestNonHexStage1then2: Infinity }; t.starts++; if (x.results.direct2.hexagon) t.direct2Hexagon++; else t.bestNonHexDirect2 = Math.min(t.bestNonHexDirect2, x.results.direct2.score); if (x.results.stage1.hexagon) t.stage1Hexagon++; else if (x.results.stage1.periodic) t.stage1PeriodicNonHexagon++; if (x.results.stage1then2.hexagon) t.stage1then2Hexagon++; else t.bestNonHexStage1then2 = Math.min(t.bestNonHexStage1then2, x.results.stage1then2.score); }
const receipt = { instrument: 'weber-binding-sphere-mc-search.mjs + weber-binding-sphere-mc-lib.mjs', command: 'node ' + path.relative(ROOT, fileURLToPath(import.meta.url)) + ' ' + args.join(' '), utcStart: new Date(t0).toISOString(), utcEnd: utc(), wallSeconds: wall(),
  stratum, speedBox: vBox, motionResidualScale: eNorm, seed, M, Nc, R, reducedDimension: B.nred, groupOrder: B.groupOrder, hexagonIsMember: hexIsMember, startsRun: rows.length, reachStarts: reach.length, targetStarts: tgt.length, byType,
  reach, reachRecovered: reach.some(x => x.direct2.hexagon && x.direct2.score <= 1e-10), reachRecoveredCount: reach.filter(x => x.direct2.hexagon && x.direct2.score <= 1e-10).length,
  counts: { direct2Hexagon: count(x => x.results.direct2.hexagon), stage1Hexagon: count(x => x.results.stage1.hexagon), stage1PeriodicNonHexagon: count(x => x.results.stage1.periodic && !x.results.stage1.hexagon), stage1then2Hexagon: count(x => x.results.stage1then2.hexagon), sphereCandidatesNonHexagon: count(x => (x.results.direct2.sphereCandidate && !x.results.direct2.hexagon) || (x.results.stage1then2.sphereCandidate && !x.results.stage1then2.hexagon)), singularStarts: count(x => !x.results.direct2.ok), penalisedFinal: count(x => (x.results.direct2.colloc?.penalisedRows ?? 0) > 0), direct2FinalSpeedAbove3: count(x => (x.results.direct2.fine?.speed?.[1] ?? 0) > 3), direct2FinalStrictSpeed: count(x => (x.results.direct2.fine?.speed?.[1] ?? 9) < 1) },
  floorNonHexagonStage2M3: bestS2, floorNonHexagonStage1M3: bestS1, refinedM5: refined, floorNonHexagonStage2M5: Math.min(Infinity, ...refined.filter(x => x.result.ok && !x.result.hexagon).map(x => x.result.score)), stage1Objects, rows };
fs.writeFileSync(receiptPath, JSON.stringify(receipt));
console.log(`DONE ${utc()} stratum=${stratum} starts=${rows.length} reachRecovered=${receipt.reachRecovered} floorM3=${bestS2.toExponential(3)} floorM5=${receipt.floorNonHexagonStage2M5.toExponential(3)} counts=${JSON.stringify(receipt.counts)} wall=${wall().toFixed(1)}`);
