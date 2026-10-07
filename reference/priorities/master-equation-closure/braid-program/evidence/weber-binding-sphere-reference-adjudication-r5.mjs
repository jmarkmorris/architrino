// weber-binding-sphere-reference-adjudication-r5.mjs
// Reference lane, Part 3e (after the PI's round-5 exposure, 2026-10-06T03:55Z).
// Re-evolves two of the eight round-5 survivor start states with the reference's own
// integrator (classical RK4 from the frozen Part 1 law module, wrapped in step-doubling
// error control written here) to the first speed crossing and a few hexagon periods beyond;
// identifies bound opposite-polarity pairs by the overnight pair invariants and reports H drift.
// The start states are rebuilt from the round-4 receipts' stored end parameters with the
// conventions validated in Sections 11.3 and 11.4.
import { readFileSync, writeFileSync } from 'node:fs';
import { solveAccelerations, dot, cross, norm, scale, add, sub, unit, sig15 } from './weber-binding-sphere-reference-lib.mjs';
import { rk4Step, flatten, unflatten } from '../../binary-research/evidence/weber-frequency-reference-law.mjs';

const log = (...a) => console.log(...a);
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);
const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const tangent = (th, ph, ps, v) => { const eth = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)]; const eph = [-Math.sin(ph), Math.cos(ph), 0]; return scale(add(scale(eth, Math.cos(ps)), scale(eph, Math.sin(ps))), v); };

function rebuild(stratum, R, index) {
  const file = `weber-binding-sphere-r4-shooting-${stratum}-R${R}.json`;
  const o = JSON.parse(readFileSync(file, 'utf8')); const s = o.starts.find((x) => x.index === index); const p = s.p;
  let X = [], V = [], q;
  if (stratum === 'free') { const v = p[15]; for (let i = 0; i < 5; i++) { const [th, ph, ps] = p.slice(3 * i, 3 * i + 3); X.push(scale(sph(th, ph), R)); V.push(tangent(th, ph, ps, v)); } X.push(scale(X.reduce((a, b) => add(a, b), [0, 0, 0]), -1)); V.push(scale(V.reduce((a, b) => add(a, b), [0, 0, 0]), -1)); q = [1, -1, 1, -1, 1, -1]; return { X, V, q, v, J: s.J_gbs }; }
  const v = p[7]; const th = [p[0], p[3]], ph = [p[1], p[4], p[6]], ps = [p[2], p[5]];
  const z2 = -(Math.cos(th[0]) + Math.cos(th[1])); const th2 = Math.acos(Math.max(-1, Math.min(1, z2))); th.push(th2);
  const c = -(Math.cos(ps[0]) * Math.sin(th[0]) + Math.cos(ps[1]) * Math.sin(th[1])) / Math.sin(th2); ps.push((s.branch === 0 ? 1 : -1) * Math.acos(Math.max(-1, Math.min(1, c))));
  for (let k = 0; k < 3; k++) { X.push(scale(sph(th[k], ph[k]), R)); V.push(tangent(th[k], ph[k], ps[k], v)); } for (let k = 0; k < 3; k++) { X.push([-X[k][0], -X[k][1], X[k][2]]); V.push([-V[k][0], -V[k][1], V[k][2]]); }
  return { X, V, q: [1, 1, 1, -1, -1, -1], v, J: s.J_gbs };
}
function energyLike(st) { let H = 0; for (const w of st.V) H += 0.5 * dot(w, w); for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const dv = sub(st.X[i], st.X[j]); const d = norm(dv); const dd = dot(unit(dv), sub(st.V[i], st.V[j])); H += st.q[i] * st.q[j] / d * (1 - dd * dd / 2); } return H; }
function pairInvariants(st) {
  const rows = [];
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    const r = sub(st.X[i], st.X[j]); const w = sub(st.V[i], st.V[j]); const d = norm(r); const rdot = dot(unit(r), w); const h = norm(cross(r, w)); const sigma = st.q[i] * st.q[j];
    const eps = 0.5 * (1 - 2 * sigma / d) * rdot * rdot + h * h / (2 * d * d) + 2 * sigma / d; // overnight (5.4) with k = 2K = 2, kappa = 2
    rows.push({ pair: [i, j], sigma, r: d, eps, h, bound: sigma < 0 && eps < 0 && h > 0 });
  }
  return rows;
}
// adaptive RK4 by step doubling; returns the trajectory summary
function evolve(st0, P, periods, opts = {}) {
  const tol = opts.tol ?? 1e-11; let h = opts.h0 ?? P / 4000; const hmax = P / 200; const q = st0.q;
  let y = flatten(st0); let t = 0; const H0 = energyLike(st0); let Hmax = 0, steps = 0, rejects = 0;
  let firstEvent = null; let minSep = Infinity, rMin = Infinity, rMax = 0, vMin = Infinity, vMax = 0, detMin = Infinity;
  const tEnd = periods * P; let stop = null;
  const wallStart = Date.now();
  while (t < tEnd) {
    if (t + h > tEnd) h = tEnd - t;
    let y1, y2, err;
    try { y1 = rk4Step(y, h, q); const ya = rk4Step(y, h / 2, q); y2 = rk4Step(ya, h / 2, q); } catch (e) { stop = { reason: 'singular solve', t }; break; }
    err = 0; for (let i = 0; i < y.length; i++) err = Math.max(err, Math.abs(y2[i] - y1[i]) / (1 + Math.abs(y2[i])));
    if (err > tol) { h *= Math.max(0.2, 0.9 * Math.pow(tol / err, 0.2)); rejects++; if (h < 1e-12) { stop = { reason: 'step underflow', t }; break; } continue; }
    // accept the half-step result (local extrapolation not used, to keep the classical scheme)
    y = y2; t += h; steps++;
    const st = unflatten(y, q);
    // diagnostics
    const C = scale(st.X.reduce((a, b) => add(a, b), [0, 0, 0]), 1 / 6);
    for (let i = 0; i < 6; i++) { const r = norm(sub(st.X[i], C)); rMin = Math.min(rMin, r); rMax = Math.max(rMax, r); const s = norm(st.V[i]); vMin = Math.min(vMin, s); vMax = Math.max(vMax, s); if (s > 1 && !firstEvent) firstEvent = { name: 'speed crossing of c_f', member: i, t, periods: t / P }; }
    for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) minSep = Math.min(minSep, norm(sub(st.X[i], st.X[j])));
    if (steps % 20 === 0) { const sol = solveAccelerations(st); detMin = Math.min(detMin, Math.abs(sol.det)); if (Math.abs(sol.det) < 1e-8) { stop = { reason: 'obstruction |det M| < 1e-8', t }; break; } }
    Hmax = Math.max(Hmax, Math.abs(energyLike(st) - H0) / Math.abs(H0));
    if (minSep < 1e-6) { stop = { reason: 'contact', t }; break; }
    if (rMax > 1e3) { stop = { reason: 'escape', t }; break; }
    if (steps >= (opts.maxSteps ?? 400000)) { stop = { reason: 'step cap', t }; break; }
    if (Date.now() - wallStart > (opts.wallLimitMs ?? 150000)) { stop = { reason: 'wall-time limit', t }; break; }
    h = Math.min(hmax, h * Math.min(5, 0.9 * Math.pow(tol / Math.max(err, 1e-300), 0.2)));
  }
  const stEnd = unflatten(y, q);
  const inv = pairInvariants(stEnd); const bound = inv.filter((r) => r.bound).map((r) => r.pair);
  return { tEnd: t, periodsReached: t / P, stop: stop ?? { reason: 'final-time', t }, steps, rejects, firstEvent, radiusSpreadOverRun: rMax / rMin, rMaxOverRun: rMax, speedRange: [vMin, vMax], minPairSeparation: minSep, minAbsDetSampled: detMin, HDriftRelative: Hmax, boundPairsAtEnd: bound, pairsAtEnd: inv.map((r) => ({ pair: r.pair, sigma: r.sigma, r: r.r, eps: r.eps, h: r.h })) };
}

const out = { startedAt: new Date().toISOString(), integrator: 'classical RK4 (frozen Part 1 law module) with step-doubling error control, relative tolerance 1e-11 per step, hmax = P/200' };
const cases = [{ stratum: 'free', R: 3, index: 10, periods: 3 }, { stratum: 'c2', R: 3, index: 8, periods: 6 }];
const subj12 = JSON.parse(readFileSync('weber-binding-sphere-r5-fate-rtol1e-12.json', 'utf8')).runs;
const subj10 = JSON.parse(readFileSync('weber-binding-sphere-r5-fate-rtol1e-10.json', 'utf8')).runs;
out.runs = [];
for (const c of cases) {
  const st = rebuild(c.stratum, c.R, c.index); const P = 7.660998582687159 * Math.pow(c.R, 1.5);
  const s12 = subj12.find((r) => r.stratum === c.stratum && r.R === c.R && r.index === c.index); const s10 = subj10.find((r) => r.stratum === c.stratum && r.R === c.R && r.index === c.index);
  log(`=== ${c.stratum} R=${c.R} #${c.index}: v_start ${st.v.toFixed(5)} (subject ${s12.v_start.toFixed(5)}), J ${st.J.toFixed(4)} (subject ${s12.J_start.toFixed(4)}); subject first event ${s12.firstEvent.name} at t=${s12.firstEvent.t.toFixed(3)} (${s12.firstEvent.periods.toFixed(4)} P), bound pairs at end (1e-12) ${JSON.stringify(s12.boundPairs)}, (1e-10) ${JSON.stringify(s10.boundPairs)} stop ${s10.termination.reason} at ${s10.termination.t.toFixed(2)}`);
  const t0 = Date.now();
  const r = evolve(st, P, c.periods, { tol: 1e-11, wallLimitMs: 240000 });
  log(`  reference: reached ${r.periodsReached.toFixed(3)} P (${r.stop.reason}), ${r.steps} steps (${r.rejects} rejected), first event ${r.firstEvent ? r.firstEvent.name + ' member ' + r.firstEvent.member + ' at t=' + r.firstEvent.t.toFixed(3) + ' (' + r.firstEvent.periods.toFixed(4) + ' P)' : 'none'}; radius spread ${r.radiusSpreadOverRun.toFixed(2)} (max ${r.rMaxOverRun.toFixed(1)}), speeds ${r.speedRange[0].toFixed(3)}-${r.speedRange[1].toFixed(3)}, min separation ${r.minPairSeparation.toFixed(4)}, min |det| sampled ${r.minAbsDetSampled.toExponential(2)}, H drift ${r.HDriftRelative.toExponential(2)}; bound opposite pairs at end ${JSON.stringify(r.boundPairsAtEnd)}; ${((Date.now() - t0) / 1000).toFixed(0)} s`);
  for (const p of r.pairsAtEnd.filter((x) => x.sigma < 0)) log(`     pair (${p.pair}) r=${p.r.toFixed(3)} eps=${p.eps.toFixed(4)} h=${p.h.toFixed(4)}${p.eps < 0 ? ' BOUND' : ''}`);
  out.runs.push({ ...c, vStart: st.v, subject: { firstEvent: s12.firstEvent, boundPairs12: s12.boundPairs, boundPairs10: s10.boundPairs, stop10: s10.termination, HDrift12: s12.HDrift, minSep12: s12.minPairSeparation, fate: s12.fate }, reference: r });
}
out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-adjudication-r5.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-adjudication-r5.json');
