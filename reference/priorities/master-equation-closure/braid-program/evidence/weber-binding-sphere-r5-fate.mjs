#!/usr/bin/env node
// weber-binding-sphere-r5-fate.mjs — round 5: measured fate of the bounded off-sphere lap survivors of R4.1.
// Takes the refined start states of the round-4 prefiltered searches that survived one lap without reaching the hexagon
// (J_GBS in [0.4, 2.1]), the eight of lowest J, and evolves each unconstrained with the validated overnight instrument
// (GBS, rtol 1e-12 and 1e-10) for up to 20 hexagon periods at that radius or to the first event (contact 1e-6, escape
// 1e3, det M below 1e-8, step underflow).  Records radius spread about the centre of position, speed spread, minimum
// pair separation, det M range, speed labels, the pair invariants (eps, h) of every opposite-polarity pair at the end,
// and the first event; classifies the fate.  Usage: node weber-binding-sphere-r5-fate.mjs --rtol 1e-12|1e-10 [--max N]
import fs from 'node:fs';
import path from 'node:path';
import { COEFF, HEX_Q, HERE, DATA_DIR, ensureDirs, utc, log, writeJson, v3, stateFrom, getX, getV, minSeparation, hexagonOmega, speedLabels } from './weber-binding-sphere-instrument.mjs';
import { runCase, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const RTOL = Number(arg('--rtol', 1e-12)), MAXN = Number(arg('--max', 8)), SKIP = Number(arg('--skip', 0)), ATOL = RTOL * 1e-2; // --skip N: start after the N survivors of lowest J (round 5b runs the remaining four)
const OUT = path.join(DATA_DIR, 'r5-fate'); fs.mkdirSync(OUT, { recursive: true });
const RECEIPT = path.join(HERE, `weber-binding-sphere-r5-fate-rtol${RTOL}${SKIP ? '-rest' : ''}.json`);
const rec = { subject: 'measured fate of the off-sphere lap survivors of R4.1', law: COEFF, rtol: RTOL, atol: ATOL, started: utc(), settings: { periods: 20, hmaxFraction: 1 / 50, maxSteps: 40000, events: { rContact: 1e-6, rEscape: 1e3, detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10 } }, runs: [] };
const t0 = Date.now();
// stratum builders (copied from the round-2 script's STRATA, with R as a parameter)
const clampV = u => Math.min(3, Math.max(0.05, Math.abs(u)));
function sph(th, ph) { return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; }
function tangent(th, ph, psi) { const et = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)], ep = [-Math.sin(ph), Math.cos(ph), 0]; return v3.add(v3.scale(et, Math.cos(psi)), v3.scale(ep, Math.sin(psi))); }
function rotz(a, x) { const c = Math.cos(a), s = Math.sin(a); return [c * x[0] - s * x[1], s * x[0] + c * x[1], x[2]]; }
function buildFree(p, R) { const v = clampV(p[15]), xs = [], vs = []; for (let i = 0; i < 5; i++) { xs.push(v3.scale(sph(p[3 * i], p[3 * i + 1]), R)); vs.push(v3.scale(tangent(p[3 * i], p[3 * i + 1], p[3 * i + 2]), v)); } let sx = [0, 0, 0], sv = [0, 0, 0]; for (let i = 0; i < 5; i++) { sx = v3.add(sx, xs[i]); sv = v3.add(sv, vs[i]); } xs.push(v3.scale(sx, -1)); vs.push(v3.scale(sv, -1)); return { xs, vs, v }; }
function buildC2(p, b, R) { const v = clampV(p[7]); const th0 = p[0], ph0 = p[1], ps0 = p[2], th1 = p[3], ph1 = p[4], ps1 = p[5], ph2 = p[6]; const z2 = -(Math.cos(th0) + Math.cos(th1)); const th2 = Math.acos(Math.max(-1, Math.min(1, z2))); const vz = -(Math.cos(ps0) * -Math.sin(th0) + Math.cos(ps1) * -Math.sin(th1)); const c2 = Math.max(-1, Math.min(1, vz / (-Math.sin(th2) || 1e-12))); const ps2 = b === 0 ? Math.acos(c2) : -Math.acos(c2); const gens = [[th0, ph0, ps0], [th1, ph1, ps1], [th2, ph2, ps2]], xs = [], vs = []; for (const [th, ph, ps] of gens) { xs.push(v3.scale(sph(th, ph), R)); vs.push(v3.scale(tangent(th, ph, ps), v)); } for (let k = 0; k < 3; k++) { xs.push(rotz(Math.PI, xs[k])); vs.push(rotz(Math.PI, vs[k])); } const order = [0, 3, 1, 4, 2, 5]; return { xs: order.map(i => xs[i]), vs: order.map(i => vs[i]), v }; }
// collect survivors
const survivors = [];
for (const [stratum, R] of [['c2', 3], ['free', 3], ['c2', 2], ['free', 2]]) {
  const r = JSON.parse(fs.readFileSync(path.join(HERE, `weber-binding-sphere-r4-shooting-${stratum}-R${R}.json`), 'utf8'));
  for (const s of r.starts) if (s.kind === 'random' && s.reason === 'final-time' && s.J_gbs > 1e-6) { const st = stratum === 'c2' ? buildC2(s.p, s.branch, R) : buildFree(s.p, R); survivors.push({ stratum, R, index: s.index, J: s.J_gbs, v: st.v, minSep0: s.minSep, xs: st.xs, vs: st.vs }); }
}
survivors.sort((a, b) => a.J - b.J);
rec.survivorsFound = survivors.map(s => ({ stratum: s.stratum, R: s.R, index: s.index, J: s.J, v: s.v }));
const chosen = survivors.slice(SKIP, SKIP + MAXN);
log(`survivors found ${survivors.length}; running the ${chosen.length} of lowest J at rtol ${RTOL}`);
// pair invariants of the frozen law for an opposite-polarity pair: eps = 1/2 (1 + 2/r) rdot^2 + h^2/(2 r^2) - 2/r, h = |r x rdot|
function pairInvariants(x, vv, i, j) { const d = [x[3 * i] - x[3 * j], x[3 * i + 1] - x[3 * j + 1], x[3 * i + 2] - x[3 * j + 2]], w = [vv[3 * i] - vv[3 * j], vv[3 * i + 1] - vv[3 * j + 1], vv[3 * i + 2] - vv[3 * j + 2]], r = v3.norm(d), rdot = v3.dot(d, w) / r, h = v3.norm(v3.cross(d, w)); return { r, rdot, h, eps: 0.5 * (1 + 2 / r) * rdot * rdot + h * h / (2 * r * r) - 2 / r }; }
for (const [n, s] of chosen.entries()) {
  const Om = hexagonOmega(s.R), Per = 2 * Math.PI / Om, stem = `survivor-${s.stratum}-R${s.R}-i${s.index}-rtol${RTOL}`;
  const members = s.xs.map((x, i) => ({ x, v: s.vs[i], q: HEX_Q[i] }));
  const spec = { name: stem, members, coefficients: COEFF, integrator: { method: 'gbs', rtol: RTOL, atol: ATOL, hmax: Per / 50, maxSteps: 40000 }, events: { rContact: 1e-6, rEscape: 1e3, detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10, speed: { record: true, stop: false }, turning: { record: false } }, tEnd: 20 * Per, candidate: 'weber', condition: 'exact' };
  const samples = [], lines = [], ts = Date.now();
  const res = runCase(spec, { onRecord(r) { lines.push(JSON.stringify(r)); if (r.type === 'state') { const c = [0, 0, 0]; for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) c[a] += r.x[3 * i + a] / 6; const radii = [], speeds = []; for (let i = 0; i < 6; i++) { radii.push(Math.hypot(r.x[3 * i] - c[0], r.x[3 * i + 1] - c[1], r.x[3 * i + 2] - c[2])); speeds.push(Math.hypot(r.v[3 * i], r.v[3 * i + 1], r.v[3 * i + 2])); } samples.push({ t: r.t, rMin: Math.min(...radii), rMax: Math.max(...radii), sMin: Math.min(...speeds), sMax: Math.max(...speeds), det: r.det, minSep: minSeparation(r.x, 6), x: r.x, v: r.v }); } }, heartbeat: ({ t, steps }) => log(`  heartbeat ${stem}: t=${t.toFixed(1)} (${(t / Per).toFixed(2)} periods) steps=${steps} wall=${((Date.now() - ts) / 1000).toFixed(0)}s`), heartbeatEvery: 10000 });
  fs.writeFileSync(path.join(OUT, `${stem}.trajectory.jsonl`), lines.join('\n') + '\n'); fs.writeFileSync(path.join(OUT, `${stem}.summary.json`), JSON.stringify(res, null, 1) + '\n');
  const last = samples[samples.length - 1], firstEvent = res.events.length ? res.events.slice().sort((a, b) => a.t - b.t)[0] : null;
  // pairing: opposite-polarity pairs with eps < 0 and h > 0 at the end; bound-pair partition
  const pairs = []; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) if (HEX_Q[i] * HEX_Q[j] < 0) { const pi = pairInvariants(last.x, last.v, i, j); pairs.push({ pair: [i, j], ...pi, bound: pi.eps < 0 && pi.h > 0 }); }
  const bound = pairs.filter(p => p.bound).sort((a, b) => a.eps - b.eps);
  const rSpreadAll = Math.max(...samples.map(z => z.rMax)) / Math.min(...samples.map(z => z.rMin)), rSpreadEnd = last.rMax / last.rMin;
  const lateRadii = samples.filter(z => z.t > 0.5 * res.tFinal), maxRadiusLate = Math.max(...lateRadii.map(z => z.rMax));
  let fate;
  if (res.termination.reason === 'obstruction' || res.termination.reason.startsWith('step-underflow')) fate = 'obstruction (acceleration matrix) or step underflow';
  else if (res.termination.event && res.termination.event.startsWith('escape')) fate = bound.length ? 'separates into binaries (a bound opposite pair survives an escape)' : 'disperses (escape with no bound opposite pair)';
  else if (res.termination.reason === 'final-time' || res.termination.reason === 'max-steps') fate = (rSpreadAll < 1.1 && last.rMax < 1.2 * s.R) ? 'remains bounded near a sphere' : (maxRadiusLate < 10 * s.R ? 'deforms into another bounded configuration (no event, all members within 10 R)' : (bound.length ? 'separates into binaries' : 'disperses'));
  else fate = 'other: ' + res.termination.reason;
  const run = { stratum: s.stratum, R: s.R, index: s.index, J_start: s.J, v_start: s.v, period: Per, termination: res.termination, tFinal: res.tFinal, periods: res.tFinal / Per, steps: res.steps, wallSeconds: res.wallSeconds, firstEvent: firstEvent && { name: firstEvent.name, t: firstEvent.t, periods: firstEvent.t / Per, member: firstEvent.member, pair: firstEvent.pair }, radiusSpreadAboutCentre: { overRun: rSpreadAll, atEnd: rSpreadEnd, rMinOverRun: Math.min(...samples.map(z => z.rMin)), rMaxOverRun: Math.max(...samples.map(z => z.rMax)) }, speedSpread: { minOverRun: Math.min(...samples.map(z => z.sMin)), maxOverRun: Math.max(...samples.map(z => z.sMax)), labels: speedLabels([Math.max(...samples.map(z => z.sMax)), Math.min(...samples.map(z => z.sMin))]) }, minPairSeparation: Math.min(...samples.map(z => z.minSep)), detRange: [Math.min(...samples.map(z => Math.abs(z.det))), Math.max(...samples.map(z => Math.abs(z.det)))], HDrift: res.diagnostics.maxRelDriftCandidate, pairsAtEnd: pairs.map(p => ({ pair: p.pair, r: p.r, eps: p.eps, h: p.h, bound: p.bound })), boundPairs: bound.map(p => p.pair), fate };
  rec.runs.push(run);
  log(`${n + 1}/${chosen.length} ${stem}: ${res.termination.reason}${res.termination.event ? ' ' + res.termination.event : ''} at ${run.periods.toFixed(2)} periods; radius spread ${rSpreadAll.toFixed(2)} (end ${rSpreadEnd.toFixed(2)}); speeds ${run.speedSpread.minOverRun.toFixed(3)}..${run.speedSpread.maxOverRun.toFixed(3)}; minSep ${run.minPairSeparation.toExponential(2)}; det [${run.detRange.map(d => d.toExponential(1)).join(', ')}]; bound pairs ${JSON.stringify(run.boundPairs)}; first event ${firstEvent ? firstEvent.name + '@' + (firstEvent.t / Per).toFixed(2) : 'none'}; fate: ${fate}; wall ${res.wallSeconds.toFixed(0)}s`);
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}
rec.finished = utc(); rec.wallSeconds = (Date.now() - t0) / 1000; writeJson(RECEIPT, rec);
log(`receipt ${path.relative(REPO_ROOT, RECEIPT)} (${rec.runs.length} runs, wall ${rec.wallSeconds.toFixed(0)}s)`);
