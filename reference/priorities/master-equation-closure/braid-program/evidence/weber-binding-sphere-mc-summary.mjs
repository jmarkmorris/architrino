#!/usr/bin/env node
// Summarizer for the multi-curve collocation search dumps: reads
// .local-data/master-equation-closure/weber-binding-sphere/mc/search-<tag>.jsonl and writes one
// small receipt, evidence/weber-binding-sphere-mc-summary.json. Usage: node ...-mc-summary.mjs <tag> [<tag> ...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'), dir = path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc');
const brief = x => x && x.ok ? { stage: x.stage, M: x.M, Nc: x.Nc, iter: x.iter, reason: x.reason, collocation: { maxE: x.colloc.maxE, maxS: x.colloc.maxS, maxV: x.colloc.maxV, minSep: x.colloc.minSep, penalisedRows: x.colloc.penalisedRows, boxRows: x.colloc.boxRows }, omega: x.omega, period: x.period, v: x.v, fine: x.fine, score: x.score, classification: x.classification } : null;
// rigid-shape descriptor from the coefficient set at phase 0: rotation axis from sum X x V, then per member polarity, cylindrical radius, height and azimuth
function shape(c, M) {
  const nb = 2 * M + 1, X = [], V = [];
  for (let i = 0; i < 6; i++) { const x = [0, 0, 0], v = [0, 0, 0]; for (let a = 0; a < 3; a++) { x[a] = c[(i * nb) * 3 + a]; for (let m = 1; m <= M; m++) { x[a] += c[(i * nb + 2 * m - 1) * 3 + a]; v[a] += m * c[(i * nb + 2 * m) * 3 + a]; } } X.push(x); V.push(v); }
  const Lz = [0, 0, 0]; for (let i = 0; i < 6; i++) { Lz[0] += X[i][1] * V[i][2] - X[i][2] * V[i][1]; Lz[1] += X[i][2] * V[i][0] - X[i][0] * V[i][2]; Lz[2] += X[i][0] * V[i][1] - X[i][1] * V[i][0]; }
  const nL = Math.hypot(...Lz), n = Lz.map(z => z / nL), ref = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0], d0 = ref[0] * n[0] + ref[1] * n[1] + ref[2] * n[2], u = ref.map((z, a) => z - d0 * n[a]), nu = Math.hypot(...u), e1 = u.map(z => z / nu), e2 = [n[1] * e1[2] - n[2] * e1[1], n[2] * e1[0] - n[0] * e1[2], n[0] * e1[1] - n[1] * e1[0]];
  return X.map((x, i) => { const h = x[0] * n[0] + x[1] * n[1] + x[2] * n[2], p1 = x[0] * e1[0] + x[1] * e1[1] + x[2] * e1[2], p2 = x[0] * e2[0] + x[1] * e2[1] + x[2] * e2[2]; return { q: i % 2 === 0 ? 1 : -1, cylRadius: +Math.hypot(p1, p2).toFixed(6), height: +h.toFixed(6), azimuthDeg: +(Math.atan2(p2, p1) * 180 / Math.PI).toFixed(3) }; });
}
const out = { utc: new Date().toISOString(), tags: {} };
for (const tag of process.argv.slice(2)) {
  const f = path.join(dir, `search-${tag}.jsonl`); if (!fs.existsSync(f)) { out.tags[tag] = { missing: true }; continue; }
  const lines = fs.readFileSync(f, 'utf8').trim().split('\n').filter(Boolean).map(l => JSON.parse(l)), rows = lines.filter(l => l.results), refined = lines.filter(l => l.refineOf !== undefined), esc = lines.filter(l => l.stage1EscalationOf !== undefined);
  const reach = rows.filter(r => r.type.startsWith('reach')), tgt = rows.filter(r => !r.type.startsWith('reach'));
  const s2 = []; for (const r of tgt) for (const k of ['direct2', 'stage1then2']) if (r.results[k].ok) s2.push({ start: r.start, type: r.type, route: k, x: r.results[k] });
  const nonHex = s2.filter(e => !e.x.hexagon).sort((a, b) => a.x.score - b.x.score);
  const best = pred => { const e = nonHex.find(pred); return e ? { start: e.start, type: e.type, route: e.route, ...brief(e.x) } : null; };
  const s1 = tgt.filter(r => r.results.stage1.ok).map(r => ({ start: r.start, type: r.type, x: r.results.stage1 }));
  const byType = {}; for (const r of tgt) { const t = byType[r.type] ??= { starts: 0, direct2Hexagon: 0, stage1then2Hexagon: 0, stage1Hexagon: 0, stage1OtherPeriodic: 0, bestNonHexStage2: Infinity }; t.starts++; if (r.results.direct2.hexagon) t.direct2Hexagon++; if (r.results.stage1then2.hexagon) t.stage1then2Hexagon++; if (r.results.stage1.hexagon) t.stage1Hexagon++; else if (r.results.stage1.periodic) t.stage1OtherPeriodic++; for (const k of ['direct2', 'stage1then2']) if (r.results[k].ok && !r.results[k].hexagon) t.bestNonHexStage2 = Math.min(t.bestNonHexStage2, r.results[k].score); }
  const q = (arr, p) => arr.length ? arr[Math.min(arr.length - 1, Math.floor(p * arr.length))] : null, scores = nonHex.map(e => e.x.score);
  out.tags[tag] = {
    startsRun: rows.length, reachStarts: reach.length, targetStarts: tgt.length, byType,
    reach: reach.map(r => ({ start: r.start, direct2: { score: r.results.direct2.score, exactHexagon: !!(r.results.direct2.exactHexagon ?? r.results.direct2.hexagon), iter: r.results.direct2.iter, omega: r.results.direct2.omega }, stage1: { score: r.results.stage1.score, classification: r.results.stage1.classification, iter: r.results.stage1.iter }, stage1then2: { score: r.results.stage1then2.score, exactHexagon: !!(r.results.stage1then2.exactHexagon ?? r.results.stage1then2.hexagon) } })),
    reachRecoveredDirect2: reach.filter(r => (r.results.direct2.exactHexagon ?? r.results.direct2.hexagon) && r.results.direct2.score <= 1e-10).length,
    counts: { stage2Solves: s2.length, stage2Hexagon: s2.filter(e => e.x.hexagon).length, direct2Hexagon: tgt.filter(r => r.results.direct2.hexagon).length, stage1then2Hexagon: tgt.filter(r => r.results.stage1then2.hexagon).length, stage2SphereCandidateNonHexagon: s2.filter(e => e.x.sphereCandidate && !e.x.hexagon).length, stage2FineBelow1e8: nonHex.filter(e => e.x.score <= 1e-8).length,
      stage1Hexagon: s1.filter(e => e.x.hexagon).length, stage1RigidNonHexagon: s1.filter(e => e.x.periodic && !e.x.hexagon && e.x.fine.pairDistanceSpread <= 1e-6).length, stage1OtherPeriodic: s1.filter(e => e.x.periodic && !e.x.hexagon && e.x.fine.pairDistanceSpread > 1e-6).length, stage1CollocationConvergedFineAbove: s1.filter(e => !e.x.periodic && e.x.colloc.maxE <= 1e-8).length,
      invalidStart: tgt.filter(r => !r.results.direct2.ok).length, stage2FinalWithSeparationPenalty: nonHex.filter(e => e.x.colloc.penalisedRows > 0).length, stage2FinalWithSpeedBoxActive: nonHex.filter(e => e.x.colloc.boxRows > 0).length, stage2FinalSpeedAbove3: nonHex.filter(e => e.x.fine.speed[1] > 3.1).length, stage2FinalSpeedAtMost1: nonHex.filter(e => e.x.fine.speed[1] <= 1).length, stage2FinalSingularOnFineGrid: nonHex.filter(e => e.x.fine.singular).length, stage2FinalDetSignChange: nonHex.filter(e => e.x.fine.det[0] < 0 && e.x.fine.det[1] > 0).length },
    dominantHarmonicsOfStage2Finals: nonHex.reduce((h, e) => { const k = e.x.fine.dominantHarmonic.join(""); h[k] = (h[k] ?? 0) + 1; return h; }, {}),
    stage2ScoreQuantilesNonHexagon: { min: q(scores, 0), q10: q(scores, 0.1), median: q(scores, 0.5), q90: q(scores, 0.9) },
    floorStage2: best(() => true), floorStage2NoPenaltyActive: best(e => e.x.colloc.penalisedRows === 0 && e.x.colloc.boxRows === 0 && !e.x.fine.singular), floorStage2SpeedAtMost1: best(e => e.x.fine.speed[1] <= 1), floorStage2SpeedAtMost3: best(e => e.x.fine.speed[1] <= 3), floorStage2OrdinaryRate: best(e => e.x.omega <= 10 && e.x.fine.speed[1] <= 3.1 && e.x.fine.speed[0] >= 0.1), ordinaryRateFinals: nonHex.filter(e => e.x.omega <= 10 && e.x.fine.speed[1] <= 3.1 && e.x.fine.speed[0] >= 0.1).length, stage2FinalOmegaAbove100: nonHex.filter(e => e.x.omega > 100).length,
    refinedM5: refined.map(l => ({ start: l.refineOf, route: l.route, ...brief(l.result) })), floorStage2M5: Math.min(Infinity, ...refined.filter(l => l.result.ok && !l.result.hexagon).map(l => l.result.score)),
    stage1PeriodicNonHexagon: s1.filter(e => e.x.periodic && !e.x.hexagon).map(e => ({ start: e.start, type: e.type, ...brief(e.x), shapeAtPhase0: shape(e.x.c, e.x.M) })), stage1Escalations: esc.map(l => ({ start: l.stage1EscalationOf, ...brief(l.result) })),
    floorStage1NonPeriodic: (() => { const e = s1.filter(e => !e.x.periodic).sort((a, b) => a.x.score - b.x.score)[0]; return e ? { start: e.start, type: e.type, ...brief(e.x) } : null; })(),
  };
  const t = out.tags[tag], fl = t.floorStage2;
  console.log(`${tag}: starts ${t.startsRun} (reach ${t.reachStarts}, recovered ${t.reachRecoveredDirect2}); stage2 hex ${t.counts.stage2Hexagon}/${t.counts.stage2Solves}; candidates ${t.counts.stage2SphereCandidateNonHexagon}; floorM3 ${fl ? fl.score.toExponential(2) : '-'} (E ${fl?.fine.maxE.toExponential(1)} S ${fl?.fine.maxS.toExponential(1)} V ${fl?.fine.maxV.toExponential(1)} vmax ${fl?.fine.speed[1].toPrecision(3)} sep ${fl?.fine.minSep.toFixed(3)}); noPen ${t.floorStage2NoPenaltyActive?.score.toExponential(2)}; v<=1 ${t.floorStage2SpeedAtMost1?.score.toExponential(2)}; v<=3 ${t.floorStage2SpeedAtMost3?.score.toExponential(2)}; floorM5 ${t.floorStage2M5.toExponential(2)}; stage1: hex ${t.counts.stage1Hexagon}, rigid non-hex ${t.counts.stage1RigidNonHexagon}, other periodic ${t.counts.stage1OtherPeriodic}; runaway(v>3) ${t.counts.stage2FinalSpeedAbove3}; sepPen ${t.counts.stage2FinalWithSeparationPenalty}; q50 ${t.stage2ScoreQuantilesNonHexagon.median?.toExponential(1)}`);
}
fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-mc-summary.json'), JSON.stringify(out, null, 1));
