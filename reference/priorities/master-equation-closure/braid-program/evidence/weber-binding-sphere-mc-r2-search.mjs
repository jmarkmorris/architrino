#!/usr/bin/env node
// Round-2 target search (preregistration 11.6): speed-normalized motion residual, hard bounds omega in [0.2,4] and
// v in [0.2,1.5], round-2 acceptance rule. Strata and start constructions are the round-1 driver's, copied verbatim
// (the block between the "strata" and "one solve" markers of weber-binding-sphere-mc-search.mjs).
// Usage: node weber-binding-sphere-mc-r2-search.mjs --stratum <name> [--first k] [--starts n] [--routes direct|both] [--tag t]
// Heartbeat: one line per start.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { L, lmBounded, classifyR2, BOX } from './weber-binding-sphere-mc-r2-lib.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..');
const args = process.argv.slice(2), arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const stratum = arg('--stratum', 'free'), nStarts = Number(arg('--starts', '60')), first = Number(arg('--first', '0')), seed = Number(arg('--seed', '20261006')), routes = arg('--routes', 'direct');
const vSub = arg("--v-box", null); if (vSub) { const [lo, hi] = vSub.split(",").map(Number); BOX.v[0] = lo; BOX.v[1] = hi; } // optional declared sub-box of the speed bound (round-2 extra, not part of 11.6)
const M = 3, Nc = 4 * M + 4, R = 1, eNorm = "speed", vBox = null, tag = arg("--tag", `${stratum}-${routes}${vSub ? "-v" + vSub.replace(",", "-") : ""}-${first}`);
const dumpPath = path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc', `r2-search-${tag}.jsonl`);
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
const clampTo = (x, [lo, hi]) => Math.min(hi, Math.max(lo, x));
export function solve(stage, MM, BB, c, om, v, maxIter = 250) {
  const prob = L.makeProblem({ q: L.Q6, M: MM, Nc: 4 * MM + 4, R, stage, B: BB, norm: 'meanRadius', eNorm: 'speed' }), p = new Float64Array(prob.np);
  p.set(L.toReduced(BB, c)); p[prob.iOmega] = clampTo(om, BOX.omega); if (stage === 2) p[prob.iV] = clampTo(v, BOX.v);
  const s = lmBounded(prob, p, { maxIter });
  if (!s.ok) return { stage, M: MM, ok: false, reason: s.reason, score: Infinity };
  const fine = L.fineEvaluate(s.c, s.omega, L.Q6, MM, { v: stage === 2 ? s.v : undefined, R }), cls = classifyR2(fine, s.omega, R);
  const score = stage === 2 ? Math.max(fine.maxE, fine.maxEspeed, fine.maxS, fine.maxV) : Math.max(fine.maxE, fine.maxEspeed);
  const speedOutsideBox = fine.speedMax > BOX.v[1] * 1.001 || fine.speedMin < BOX.v[0] * 0.999;
  return { stage, M: MM, Nc: 4 * MM + 4, ok: true, iter: s.iter, tailSteps: s.jumps, reason: s.reason, cost: s.cost, omega: s.omega, period: 2 * Math.PI / s.omega, v: stage === 2 ? s.v : fine.vRms, boxLimited: s.boxLimited, speedOutsideBox,
    colloc: { maxE: s.info.maxE, maxS: s.info.maxS, maxV: s.info.maxV, minSep: s.info.minSep, penalisedRows: s.info.penalised },
    fine: { Nf: fine.Nf, maxE: fine.maxE, maxEspeed: fine.maxEspeed, maxS: fine.maxS, maxV: fine.maxV, minSep: fine.minSep, det: [fine.detMin, fine.detMax], singular: fine.singular, radius: [fine.radiusMin, fine.radiusMax], speed: [fine.speedMin, fine.speedMax], speedLabel: fine.speedLabel, H: fine.Hmean, Hplus3v2: fine.Hplus3v2, sigDVariation: fine.sigDVariation, pairDistanceSpread: fine.pairDistanceSpread, dominantHarmonic: fine.dominantHarmonic },
    score, classification: cls.label, hexagon: cls.hexagon || cls.hexagonNear, exactHexagon: cls.hexagon, periodic: cls.periodic, candidate: cls.candidate, detOneSigned: cls.detOneSigned, separationOK: cls.separationOK, c: Array.from(s.c) };
}
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let best = Infinity;
  for (let k = first; k < first + nStarts; k++) {
    const st = makeStart(k), row = { start: k, type: st.type, omega0: st.om, v0: st.v, results: {} };
    const a = solve(2, M, B, st.c, st.om, st.v); row.results.direct2 = a;
    let b1 = null, b2 = null;
    if (routes === 'both') { b1 = solve(1, M, B, st.c, st.om); row.results.stage1 = b1; b2 = b1.ok ? solve(2, M, B, Float64Array.from(b1.c), b1.omega, b1.v) : { ok: false, reason: 'stage-1 failed', score: Infinity }; row.results.stage1then2 = b2; }
    fs.appendFileSync(dumpPath, JSON.stringify(row) + '\n');
    for (const x of [a, b2]) if (x && x.ok && !x.hexagon && !x.boxLimited && !st.type.startsWith('reach')) best = Math.min(best, x.score);
    const f = x => !x ? '-' : !x.ok ? 'invalid' : `${x.score.toExponential(2)}${x.exactHexagon ? '(hex)' : x.hexagon ? '(hex-near)' : x.candidate ? '(CANDIDATE)' : x.boxLimited ? '(box)' : ''}/it${x.iter}`;
    console.log(`HB ${utc()} start=${k} type=${st.type} direct2=${f(a)} stage1=${f(b1)} s1then2=${f(b2)} bestNonHexNonBox=${best.toExponential(2)} wall=${wall().toFixed(1)}`);
  }
  console.log(`DONE ${utc()} tag=${tag} starts=${nStarts} bestNonHexNonBox=${best.toExponential(3)} wall=${wall().toFixed(1)}`);
}
export { M, R, B, basisFor, dumpPath, stratum, makeStart };
