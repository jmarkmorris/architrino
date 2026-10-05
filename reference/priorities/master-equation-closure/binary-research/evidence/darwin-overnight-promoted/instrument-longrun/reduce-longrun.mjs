// Reduce a 200-period DG-100 run record and compare with investigation Section 13.4.
// Usage: node reduce-longrun.mjs [P|C]   (reads the record written by run-longrun.mjs)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, '..', '..', '..');
const setting = (process.argv[2] || 'P').toUpperCase();
const label = setting === 'C' ? 'dp54-rtol1e-12' : 'dp54-rtol1e-10';
const file = path.join(ROOT, `.local-data/master-equation-closure/darwin-overnight/instrument/longrun/DG-100-200p-${label}.json`);
const r = JSON.parse(fs.readFileSync(file, 'utf8'));
const period = r.caseSpec.period;
const sub = (a, b) => a.map((v, i) => v - b[i]);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const nrm = (a) => Math.hypot(...a);
const tiltOf = (s) => { const d = sub(s.state.positions[0], s.state.positions[1]); const v = sub(s.state.velocities[0], s.state.velocities[1]); const L = cross(d, v); return Math.acos(L[2] / nrm(L)); };

// apsides from turning-point events (exact bisected states), indexed k = 1.. in order of occurrence
const tp = r.events.filter((e) => e.kind === 'turning-point');
const minima = [], maxima = [];
for (const e of tp) (e.direction.startsWith('minimum') ? minima : maxima).push({ t: e.t, r: e.pairs[0].r, tilt: tiltOf(e) });
minima.forEach((m, i) => { m.k = i + 1; m.tOverPeriod = m.t / period; });
maxima.forEach((m, i) => { m.k = i + 1; m.tOverPeriod = m.t / period; });
const spacing = minima.slice(1).map((m, i) => ({ k: i + 1, dt: m.t - minima[i].t }));
const stats = (a) => { const mn = Math.min(...a), mx = Math.max(...a); const mean = a.reduce((s, v) => s + v, 0) / a.length; return { min: mn, max: mx, mean, n: a.length }; };

// sinusoid fit x(k) = a + c1 cos(2 pi k / Pm) + c2 sin(2 pi k / Pm), Pm scanned; returns best Pm, amplitude, phase
function fitMod(seq) {
  let best = null;
  const solve3 = (A, b) => { // Gaussian elimination 3x3
    const M = A.map((row, i) => [...row, b[i]]);
    for (let i = 0; i < 3; i++) { let p = i; for (let j = i + 1; j < 3; j++) if (Math.abs(M[j][i]) > Math.abs(M[p][i])) p = j; [M[i], M[p]] = [M[p], M[i]]; for (let j = i + 1; j < 3; j++) { const f = M[j][i] / M[i][i]; for (let c = i; c < 4; c++) M[j][c] -= f * M[i][c]; } }
    const x = [0, 0, 0]; for (let i = 2; i >= 0; i--) { let s = M[i][3]; for (let c = i + 1; c < 3; c++) s -= M[i][c] * x[c]; x[i] = s / M[i][i]; } return x;
  };
  const evalP = (Pm) => {
    const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], b = [0, 0, 0];
    for (const { k, r: x } of seq) { const f = [1, Math.cos(2 * Math.PI * k / Pm), Math.sin(2 * Math.PI * k / Pm)]; for (let i = 0; i < 3; i++) { b[i] += f[i] * x; for (let j = 0; j < 3; j++) A[i][j] += f[i] * f[j]; } }
    const c = solve3(A, b); let res = 0; for (const { k, r: x } of seq) { const m = c[0] + c[1] * Math.cos(2 * Math.PI * k / Pm) + c[2] * Math.sin(2 * Math.PI * k / Pm); res += (x - m) ** 2; }
    return { Pm, c, res };
  };
  for (let Pm = 40; Pm <= 100; Pm += 0.01) { const e = evalP(Pm); if (!best || e.res < best.res) best = e; }
  for (let Pm = best.Pm - 0.01; Pm <= best.Pm + 0.01; Pm += 0.0001) { const e = evalP(Pm); if (e.res < best.res) best = e; }
  const amp = Math.hypot(best.c[1], best.c[2]); const phase = Math.atan2(-best.c[2], best.c[1]); // x = a + amp cos(2 pi k/Pm + phase)
  return { periodRadial: best.Pm, mean: best.c[0], amplitude: amp, peakToPeak: 2 * amp, phaseRad: phase, rmsResidual: Math.sqrt(best.res / seq.length) };
}
const fitMin = fitMod(minima), fitMax = fitMod(maxima);
// local troughs/crests of the pericentre and apocentre sequences
const localExtrema = (seq, sign) => seq.filter((m, i) => i > 0 && i < seq.length - 1 && sign * (m.r - seq[i - 1].r) < 0 && sign * (m.r - seq[i + 1].r) < 0).map((m) => ({ k: m.k, r: m.r }));
const minTroughs = localExtrema(minima, +1), minCrests = localExtrema(minima, -1);
const maxTroughs = localExtrema(maxima, +1), maxCrests = localExtrema(maxima, -1);
const near = (seq, k, w) => seq.filter((m) => Math.abs(m.k - k) <= w).reduce((b, m) => (!b || m.r > b.r ? m : b), null);
const nearLow = (seq, k, w) => seq.filter((m) => Math.abs(m.k - k) <= w).reduce((b, m) => (!b || m.r < b.r ? m : b), null);
const at = (seq, k) => seq.find((m) => m.k === k);

// tilt at start, every 20 periods, end (grid samples at exact period multiples)
const perPeriod = Math.round(period / r.parameters.outputDt);
const tiltSeries = [];
for (let p = 0; p <= 200; p += 20) { const s = r.samples[p * perPeriod]; tiltSeries.push({ periods: p, t: s.t, tilt: tiltOf(s) }); }
const tiltEnd = tiltOf(r.final);
// centre
const c0 = r.samples[0].state.positions, c1 = r.final.state.positions;
const centre = (P) => [0, 1, 2].map((c) => (P[0][c] + P[1][c]) / 2);
const dispC = sub(centre(c1), centre(c0)); const meanVel = dispC.map((v) => v / r.final.t);
// oscillation centre of the separation: (peri_k + apo_k)/2 with the apocentre preceding each pericentre
const oscCentre = minima.map((m, i) => ({ k: m.k, c: (m.r + maxima[i].r) / 2 }));
const oc0 = oscCentre[0].c; const ocDev = oscCentre.map((o) => o.c - oc0);
const ocMaxExc = Math.max(...ocDev.map(Math.abs)); const ocEnd = ocDev[ocDev.length - 1];
const centreExcursionIdx = ocDev.findIndex((d) => Math.abs(d) > 2.6e-3);
// invariants, events, suprema
const drifts = { dErel: Math.abs(r.final.dErel), dP: nrm(r.final.dP), dJrel: nrm(r.final.dJ) / nrm(r.initialInvariants.J), maxAbsdErelSamples: Math.max(...r.samples.map((s) => Math.abs(s.dErel))) };
const eventsInOrder = r.events.map((e) => ({ kind: e.kind, direction: e.direction, t: e.t, r: e.pairs[0].r }));
const nonTurning = eventsInOrder.filter((e) => e.kind !== 'turning-point');

// predictions of Section 13.4
const pred = {
  periReturn: { k: [67, 133], value: 100, tol: 2e-5, bracket: [99.9999999535, 99.9999998027] },
  periTrough: { k: [33, 100, 167], value: 99.999599, tol: 1e-5, bracket: [99.9996084, 99.9996083, 99.9996083] },
  apoHigh: { k: [1, 67, 134], value: 100.0471768, tol: 1e-5, bracket: [100.0471804, 100.0471806] },
  apoLow: { k: [34, 100, 167], value: 100.0467755, tol: 1e-5, bracket: [100.0467696, 100.0467699] },
  spacingCentre: 4483.388, spacingSwing: 1.15, spacingBracket: [4482.288, 4484.566], spacingMean197: 4483.37, spacingFalsifierHalfWidth: 0.5,
  tiltEnd: 0.011026, tiltEndBracket: 0.0110274, tiltSlopePerPeriod: -1.578e-5,
  modPeriodRadial: 66.69, modPeriodAlt: 66.71, modPeakToPeak: 4.01243006469e-4, modTol: 2e-5,
  centreNoSecularTol: 2.6e-3,
};
const row = (q, p, m, tol) => ({ quantity: q, predicted: p, measured: m, difference: m - p, tolerance: tol, holds: Math.abs(m - p) <= tol });
const rows = [];
for (const k of pred.periReturn.k) { const m = near(minima, k, 5); rows.push({ ...row(`pericentre return near k=${k} (highest pericentre within 5 of k; at k=${m.k})`, 100, m.r, 2e-5), measuredAtExactK: at(minima, k).r }); }
for (const k of pred.periTrough.k) { const m = nearLow(minima, k, 5); rows.push({ ...row(`pericentre trough near k=${k} (lowest within 5 of k; at k=${m.k})`, pred.periTrough.value, m.r, 1e-5), measuredAtExactK: at(minima, k).r, bracketValue: 99.9996084 }); }
{ const hi = maxima.reduce((b, m) => (m.r > b.r ? m : b)); const lo = maxima.reduce((b, m) => (m.r < b.r ? m : b));
  rows.push({ ...row(`apocentre upper envelope (max over run; at k=${hi.k})`, pred.apoHigh.value, hi.r, 1e-5), bracketValue: 100.0471804 });
  rows.push({ ...row(`apocentre lower envelope (min over run; at k=${lo.k})`, pred.apoLow.value, lo.r, 1e-5), bracketValue: 100.0467696 }); }
const sp = stats(spacing.map((s) => s.dt));
rows.push(row('minima spacing: mean of all intervals', pred.spacingMean197, sp.mean, 0.01));
rows.push(row('minima spacing: maximum', pred.spacingCentre + pred.spacingSwing, sp.max, 0.05));
rows.push(row('minima spacing: minimum', pred.spacingCentre - pred.spacingSwing, sp.min, 0.05));
rows.push({ quantity: 'minima spacing stays within ±0.5 of a constant (falsifier if true)', predicted: false, measured: (sp.max - sp.min) / 2 <= 0.5, halfRange: (sp.max - sp.min) / 2, holds: (sp.max - sp.min) / 2 > 0.5 });
rows.push(row('tilt at end (rad)', pred.tiltEnd, tiltEnd, 1e-5));
rows.push(row('tilt slope per radial period (rad), from (end-start)/200', pred.tiltSlopePerPeriod, (tiltEnd - tiltSeries[0].tilt) / 200, 1e-7));
rows.push(row('modulation period of pericentres (radial periods, sinusoid fit)', pred.modPeriodRadial, fitMin.periodRadial, 0.5));
rows.push(row('modulation period of apocentres (radial periods, sinusoid fit)', pred.modPeriodRadial, fitMax.periodRadial, 0.5));
rows.push(row('peak-to-peak of pericentres (fit)', pred.modPeakToPeak, fitMin.peakToPeak, 2e-5));
rows.push(row('peak-to-peak of apocentres (fit)', pred.modPeakToPeak, fitMax.peakToPeak, 2e-5));
rows.push(row('peak-to-peak of pericentres (max-min of sequence)', pred.modPeakToPeak, Math.max(...minima.map((m) => m.r)) - Math.min(...minima.map((m) => m.r)), 2e-5));
rows.push(row('peak-to-peak of apocentres (max-min of sequence)', pred.modPeakToPeak, Math.max(...maxima.map((m) => m.r)) - Math.min(...maxima.map((m) => m.r)), 2e-5));
{ let dphi = fitMax.phaseRad - fitMin.phaseRad; dphi = Math.atan2(Math.sin(dphi), Math.cos(dphi)); rows.push(row('phase of apocentre modulation minus pericentre modulation (rad; 0 = in phase)', 0, dphi, 0.1)); }
rows.push({ quantity: 'oscillation centre (peri+apo)/2 moves by more than 2.6e-3 without returning (separate falsifier)', predicted: false, maxExcursion: ocMaxExc, excursionAtEnd: ocEnd, firstKExceeding: centreExcursionIdx < 0 ? null : oscCentre[centreExcursionIdx].k, measured: ocMaxExc > 2.6e-3 && Math.abs(ocEnd) > 2.6e-3, holds: !(ocMaxExc > 2.6e-3 && Math.abs(ocEnd) > 2.6e-3) });

const out = {
  file, setting: label, utcStart: r.utcStart, utcEnd: r.utcEnd, wallMs: r.wallMsTotal, integrator: r.integrator, stopReason: r.final.stopReason, tFinal: r.final.t, periodsCompleted: r.final.t / period,
  nMinima: minima.length, nMaxima: maxima.length, minima, maxima, spacing, spacingStats: sp,
  minTroughs, minCrests, maxTroughs, maxCrests, fitMin, fitMax,
  tiltSeries, tiltEnd, tiltStats: stats(tiltSeries.map((x) => x.tilt)),
  centreDisplacement: dispC, meanCentreVelocity: meanVel,
  oscCentre, oscCentreMaxExcursion: ocMaxExc, oscCentreExcursionAtEnd: ocEnd,
  drifts, supSpeed: r.suprema.speed, maxEps: r.suprema.eps, detHmin: r.suprema.detMin, condMax: r.suprema.condMax,
  eventKinds: eventsInOrder.reduce((a, e) => ((a[e.kind] = (a[e.kind] || 0) + 1), a), {}), nonTurningEvents: nonTurning, eventsInOrder,
  comparison: rows,
};
fs.writeFileSync(path.join(HERE, `DG-100-200p-${label}.reduced.json`), JSON.stringify(out, null, 1));
const f = (x, d = 10) => (typeof x === 'number' ? x.toPrecision(d) : String(x));
console.log(`setting ${label}: ${r.integrator.steps} steps, stop ${r.final.stopReason} at T=${f(r.final.t, 16)} (${f(out.periodsCompleted, 12)} periods); ${minima.length} minima, ${maxima.length} maxima; events ${JSON.stringify(out.eventKinds)}`);
console.log(`drifts |dE/E|=${drifts.dErel.toExponential(3)} |dP|=${drifts.dP.toExponential(3)} |dJ|/|J|=${drifts.dJrel.toExponential(3)}; sup speed ${f(r.suprema.speed)}; max eps ${f(r.suprema.eps)}; det H min ${f(r.suprema.detMin)}`);
console.log(`centre displacement (${dispC.map((v) => f(v)).join(', ')}); mean velocity (${meanVel.map((v) => f(v)).join(', ')})`);
console.log(`tilt: ${tiltSeries.map((x) => `${x.periods}:${f(x.tilt, 8)}`).join(' ')} end:${f(tiltEnd, 8)}`);
console.log(`pericentre crests ${JSON.stringify(minCrests.map((x) => [x.k, +x.r.toFixed(9)]))}; troughs ${JSON.stringify(minTroughs.map((x) => [x.k, +x.r.toFixed(9)]))}`);
console.log(`apocentre crests ${JSON.stringify(maxCrests.map((x) => [x.k, +x.r.toFixed(9)]))}; troughs ${JSON.stringify(maxTroughs.map((x) => [x.k, +x.r.toFixed(9)]))}`);
console.log(`spacing min ${f(sp.min)} max ${f(sp.max)} mean ${f(sp.mean)} n ${sp.n}; fits: peri P=${f(fitMin.periodRadial, 6)} p2p=${fitMin.peakToPeak.toExponential(5)} rms=${fitMin.rmsResidual.toExponential(2)}; apo P=${f(fitMax.periodRadial, 6)} p2p=${fitMax.peakToPeak.toExponential(5)} rms=${fitMax.rmsResidual.toExponential(2)}`);
console.log(`osc centre: max excursion ${ocMaxExc.toExponential(3)}, at end ${ocEnd.toExponential(3)}`);
for (const x of rows) console.log(`${x.holds ? 'HOLDS' : 'FAILS'} | ${x.quantity} | pred ${f(x.predicted)} | meas ${f(x.measured)} | diff ${typeof x.difference === 'number' ? x.difference.toExponential(3) : '-'} | tol ${x.tolerance ?? '-'}${x.measuredAtExactK !== undefined ? ` | at exact k: ${f(x.measuredAtExactK)}` : ''}`);
