#!/usr/bin/env node
// Round-2 refinement at M=5 (N_c=24) of the best non-hexagon, non-box-limited stage-2 results of round-2 dumps.
// Usage: node weber-binding-sphere-mc-r2-refine.mjs --self-test
//        node weber-binding-sphere-mc-r2-refine.mjs --stratum free --tags tagA,tagB [--top 10] [--out name]
// The self-test is this script's known case: with its own solve(), the hexagon at M=5 is a zero and is recovered
// from 20 percent perturbed coefficients; its result is written to weber-binding-sphere-mc-r2-refine-selftest.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { L, lmBounded, classifyR2, BOX } from './weber-binding-sphere-mc-r2-lib.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'), DIR = path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc');
const args = process.argv.slice(2), arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; }, R = 1, utc = () => new Date().toISOString();
const perm = f => Array.from({ length: 6 }, (_, k) => ((f(k) % 6) + 6) % 6);
const GENS = { c2: [{ perm: perm(k => k + 3), R: L.rotZ(Math.PI), eps: 1 }], c3: [{ perm: perm(k => k + 2), R: L.rotZ(2 * Math.PI / 3), eps: 1 }], d3: [{ perm: perm(k => k + 2), R: L.rotZ(2 * Math.PI / 3), eps: 1 }, { perm: perm(k => -k), R: L.rotX(Math.PI), eps: -1 }] };
const clampTo = (x, [lo, hi]) => Math.min(hi, Math.max(lo, x));
function solve(MM, BB, c, om, v, maxIter = 200) {
  const prob = L.makeProblem({ q: L.Q6, M: MM, Nc: 4 * MM + 4, R, stage: 2, B: BB, eNorm: 'speed' }), p = new Float64Array(prob.np);
  p.set(L.toReduced(BB, c)); p[prob.iOmega] = clampTo(om, BOX.omega); p[prob.iV] = clampTo(v, BOX.v);
  const s = lmBounded(prob, p, { maxIter });
  if (!s.ok) return { ok: false, reason: s.reason, score: Infinity };
  const fine = L.fineEvaluate(s.c, s.omega, L.Q6, MM, { v: s.v, R }), cls = classifyR2(fine, s.omega, R);
  return { ok: true, M: MM, Nc: 4 * MM + 4, iter: s.iter, tailSteps: s.jumps, reason: s.reason, omega: s.omega, v: s.v, boxLimited: s.boxLimited, score: Math.max(fine.maxE, fine.maxEspeed, fine.maxS, fine.maxV),
    fine: { maxE: fine.maxE, maxEspeed: fine.maxEspeed, maxS: fine.maxS, maxV: fine.maxV, minSep: fine.minSep, det: [fine.detMin, fine.detMax], speed: [fine.speedMin, fine.speedMax], Hplus3v2: fine.Hplus3v2, sigDVariation: fine.sigDVariation, pairDistanceSpread: fine.pairDistanceSpread },
    classification: cls.label, hexagon: cls.hexagon || cls.hexagonNear, exactHexagon: cls.hexagon, candidate: cls.candidate, detOneSigned: cls.detOneSigned, separationOK: cls.separationOK, c: Array.from(s.c) };
}
if (args.includes('--self-test')) {
  const B5 = L.stratumBasis(6, 5), Om = L.hexagonOmega(R), zero = solve(5, B5, L.hexagonCoefficients(5, R), Om, Om * R, 0), runs = [];
  for (let t = 0; t < 2; t++) { const r = L.rng(20261006 + t), c0 = L.toFull(B5, L.toReduced(B5, L.perturb(L.hexagonCoefficients(5, R), r, 0.2))), res = solve(5, B5, c0, Om * (1 + 0.2 * (2 * r() - 1)), Om * (1 + 0.2 * (2 * r() - 1)), 300); runs.push({ trial: t, iterations: res.iter, tailSteps: res.tailSteps, score: res.score, omegaError: res.omega - Om, exactHexagon: res.exactHexagon }); }
  const out = { utc: utc(), command: 'node reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-mc-r2-refine.mjs --self-test', hexagonZeroAtM5: zero.score, reach: runs, tolerance: { zero: 1e-13, reach: 1e-10 }, pass: zero.score <= 1e-13 && runs.every(x => x.exactHexagon && x.score <= 1e-10 && Math.abs(x.omegaError) <= 1e-10) };
  fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-mc-r2-refine-selftest.json'), JSON.stringify(out, null, 1)); console.log('SELFTEST', JSON.stringify(out)); process.exit(out.pass ? 0 : 1);
}
const stratum = arg('--stratum', 'free'), tags = arg('--tags').split(','), top = Number(arg('--top', '10')), includeBox = args.includes('--include-box-limited'), outName = arg('--out', `${stratum}${includeBox ? '-box' : ''}`);
const cand = [];
for (const tag of tags) for (const line of fs.readFileSync(path.join(DIR, `r2-search-${tag}.jsonl`), 'utf8').trim().split('\n').filter(Boolean)) { const row = JSON.parse(line); for (const key of ['direct2', 'stage1then2']) { const x = row.results[key]; if (x && x.ok && !x.hexagon && (includeBox ? x.boxLimited : !x.boxLimited) && Number.isFinite(x.score)) cand.push({ tag, start: row.start, type: row.type, route: key, x }); } }
cand.sort((a, b) => a.x.score - b.x.score);
const seen = new Set(), pick = []; for (const c of cand) { const k = `${c.start}`; if (seen.has(k)) continue; seen.add(k); pick.push(c); if (pick.length >= top) break; }
console.log(`START ${utc()} refine stratum=${stratum} tags=${tags} pool=${cand.length} refining=${pick.length} includeBoxLimited=${includeBox}`);
const B5 = L.stratumBasis(6, 5, GENS[stratum] ?? []), results = [], t0 = Date.now();
for (const c of pick) { const res = solve(5, B5, L.padCoefficients(Float64Array.from(c.x.c), 6, 3, 5), c.x.omega, c.x.v, 200); const { c: _c, ...rest } = res; results.push({ tag: c.tag, start: c.start, type: c.type, route: c.route, M3: { score: c.x.score, omega: c.x.omega, v: c.x.v, boxLimited: c.x.boxLimited, detOneSigned: c.x.detOneSigned, fine: c.x.fine }, M5: rest });
  console.log(`HB ${utc()} start=${c.start} M3=${c.x.score.toExponential(2)} M5=${res.score.toExponential(2)}${res.exactHexagon ? '(hex)' : res.candidate ? '(CANDIDATE)' : res.boxLimited ? '(box)' : ''} wall=${((Date.now() - t0) / 1000).toFixed(1)}`); }
fs.writeFileSync(path.join(HERE, `weber-binding-sphere-mc-r2-refine-${outName}.json`), JSON.stringify({ utc: utc(), stratum, tags, poolNonHexagon: cand.length, includeBoxLimited: includeBox, refined: results }, null, 1));
console.log(`DONE ${utc()} refined=${results.length}`);
