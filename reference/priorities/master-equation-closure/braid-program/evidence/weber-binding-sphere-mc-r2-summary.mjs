#!/usr/bin/env node
// Summarizer of round-2 dumps (r2-search-<tag>.jsonl) into evidence/weber-binding-sphere-mc-r2-summary.json.
// Usage: node weber-binding-sphere-mc-r2-summary.mjs <tag> [<tag> ...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), DIR = path.resolve(HERE, '../../../../../.local-data/master-equation-closure/weber-binding-sphere/mc');
const brief = e => ({ tag: e.tag, start: e.start, type: e.type, route: e.route, score: e.x.score, iter: e.x.iter, reason: e.x.reason, omega: e.x.omega, v: e.x.v, maxE: e.x.fine.maxE, maxEspeed: e.x.fine.maxEspeed, maxS: e.x.fine.maxS, maxV: e.x.fine.maxV, minSep: e.x.fine.minSep, speed: e.x.fine.speed, det: e.x.fine.det, detOneSigned: e.x.detOneSigned, separationOK: e.x.separationOK, Hplus3v2: e.x.fine.Hplus3v2, sigDVariation: e.x.fine.sigDVariation, pairDistanceSpread: e.x.fine.pairDistanceSpread, dominantHarmonic: e.x.fine.dominantHarmonic.join(''), radius: e.x.fine.radius, penalisedRows: e.x.colloc.penalisedRows });
const out = { utc: new Date().toISOString(), tags: {} };
for (const tag of process.argv.slice(2)) {
  const f = path.join(DIR, `r2-search-${tag}.jsonl`); if (!fs.existsSync(f)) continue;
  const rows = fs.readFileSync(f, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)), reach = rows.filter(r => r.type.startsWith('reach')), tgt = rows.filter(r => !r.type.startsWith('reach'));
  const t = { starts: rows.length, reachStarts: reach.length, targetStarts: tgt.length, reach: reach.map(r => ({ start: r.start, direct2: { score: r.results.direct2.score, exactHexagon: r.results.direct2.exactHexagon, iter: r.results.direct2.iter, tailSteps: r.results.direct2.tailSteps }, stage1: r.results.stage1 ? { score: r.results.stage1.score, iter: r.results.stage1.iter, classification: r.results.stage1.classification.slice(0, 30) } : null, stage1then2: r.results.stage1then2 ? { score: r.results.stage1then2.score, exactHexagon: r.results.stage1then2.exactHexagon, iter: r.results.stage1then2.iter } : null })), routes: {} };
  t.reachRecovered = reach.filter(r => r.results.direct2.exactHexagon && r.results.direct2.score <= 1e-10).length;
  for (const key of ['direct2', 'stage1then2']) {
    const all = []; for (const r of tgt) { const x = r.results[key]; if (x) all.push({ tag, start: r.start, type: r.type, route: key, x }); }
    if (!all.length) continue;
    const ok = all.filter(e => e.x.ok), nonHex = ok.filter(e => !e.x.hexagon), free = nonHex.filter(e => !e.x.boxLimited).sort((a, b) => a.x.score - b.x.score), clean = free.filter(e => e.x.detOneSigned);
    const scores = nonHex.map(e => e.x.score).sort((a, b) => a - b);
    t.routes[key] = { solves: all.length, invalid: all.length - ok.length, hexagon: ok.filter(e => e.x.hexagon).length, exactHexagon: ok.filter(e => e.x.exactHexagon).length, candidates: ok.filter(e => e.x.candidate).length, nonHexagon: nonHex.length, boxLimited: nonHex.filter(e => e.x.boxLimited).length, boxLimitedOmegaHigh: nonHex.filter(e => e.x.boxLimited && e.x.omega > 3.99).length, boxLimitedOmegaLow: nonHex.filter(e => e.x.boxLimited && e.x.omega < 0.2001).length, boxLimitedVHigh: nonHex.filter(e => e.x.boxLimited && e.x.v > 1.499).length, boxLimitedVLow: nonHex.filter(e => e.x.boxLimited && e.x.v < 0.2001).length,
      notBoxLimited: free.length, notBoxLimitedDetOneSigned: clean.length, notBoxLimitedDetOneSignedSeparationOK: clean.filter(e => e.x.separationOK).length, detSignChangeAmongNonHexagon: nonHex.filter(e => !e.x.detOneSigned).length, separationBelowAmongNonHexagon: nonHex.filter(e => !e.x.separationOK).length,
      floorNotBoxLimited: free[0] ? brief(free[0]) : null, floorNotBoxLimitedDetOneSigned: clean[0] ? brief(clean[0]) : null, bestBoxLimited: (() => { const b = nonHex.filter(e => e.x.boxLimited).sort((a, c) => a.x.score - c.x.score)[0]; return b ? brief(b) : null; })(), medianScoreNonHexagon: scores.length ? scores[Math.floor(scores.length / 2)] : null,
      notBoxLimitedDetOneSignedResults: clean.map(brief), hexagonFromTargets: ok.filter(e => e.x.hexagon).map(e => ({ start: e.start, type: e.type, iter: e.x.iter, score: e.x.score })) };
    if (key === 'stage1then2') { const s1 = tgt.map(r => ({ start: r.start, type: r.type, x: r.results.stage1 })).filter(e => e.x && e.x.ok); t.stage1 = { solves: s1.length, hexagon: s1.filter(e => e.x.hexagon).length, periodicNonHexagon: s1.filter(e => e.x.periodic && !e.x.hexagon).map(e => ({ start: e.start, type: e.type, omega: e.x.omega, maxE: e.x.fine.maxE, maxEspeed: e.x.fine.maxEspeed, radius: e.x.fine.radius, speed: e.x.fine.speed, minSep: e.x.fine.minSep, det: e.x.fine.det, pairDistanceSpread: e.x.fine.pairDistanceSpread, boxLimited: e.x.boxLimited })), boxLimited: s1.filter(e => e.x.boxLimited).length }; }
  }
  out.tags[tag] = t;
  for (const [k, r] of Object.entries(t.routes)) console.log(`${tag} ${k}: starts ${t.starts} (reach ${t.reachStarts}, recovered ${t.reachRecovered}); solves ${r.solves}; hex ${r.hexagon}; cand ${r.candidates}; boxLimited ${r.boxLimited} (omHi ${r.boxLimitedOmegaHigh}, omLo ${r.boxLimitedOmegaLow}, vHi ${r.boxLimitedVHigh}, vLo ${r.boxLimitedVLow}); notBox ${r.notBoxLimited}; notBox&det1 ${r.notBoxLimitedDetOneSigned}; floorNotBox ${r.floorNotBoxLimited?.score.toExponential(2)}; floorClean ${r.floorNotBoxLimitedDetOneSigned?.score.toExponential(2)}; bestBox ${r.bestBoxLimited?.score.toExponential(2)}; median ${r.medianScoreNonHexagon?.toExponential(1)}; s1 periodic non-hex ${t.stage1?.periodicNonHexagon.length ?? '-'}`);
}
fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-mc-r2-summary.json'), JSON.stringify(out, null, 1));
