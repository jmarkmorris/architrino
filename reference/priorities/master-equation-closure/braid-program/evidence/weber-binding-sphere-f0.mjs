#!/usr/bin/env node
// weber-binding-sphere-f0.mjs — family F0: the planar alternating hexagon (control).
// Balance at every radius, the 18x18 determinant along the family and its singular radius,
// rotating-frame spectra (in-plane / axial split by the reflection z -> -z), resonance scan of
// the axial frequencies against Omega, the integer-frequency table, and the measured fate at rho = 1.
// Usage: node weber-binding-sphere-f0.mjs [--no-fate]
import fs from 'node:fs';
import path from 'node:path';
import {
  COEFF, HEX_Q, DATA_DIR, HERE, ensureDirs, params, utc, log, writeJson, v3, rotate, rigidPath, pathResidual, rigidBalance,
  rotatingSpectrum, classifyEigenvalues, hexagon, hexagonOmega, rigidMembers, rigidState, speedLabels, minSeparation, getX, getV, rng, randomUnit,
} from './weber-binding-sphere-instrument.mjs';
import { solveAccelerations, assemble, jacobian, eigenvalues, rotatingDerivative, runCase, packState, REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const OUT = path.join(DATA_DIR, 'f0'); fs.mkdirSync(OUT, { recursive: true });
const RECEIPT = path.join(HERE, 'weber-binding-sphere-f0.json');
const noFate = process.argv.includes('--no-fate');
const rec = { family: 'F0 planar alternating hexagon', law: COEFF, polarities: HEX_Q, started: utc(), balanceCoefficient: 5 / 4 - 1 / Math.sqrt(3) };
const P = params(HEX_Q);
const sym3 = s => s.replace(/\s+/g, ' ');

// ---------------------------------------------------------------- 1. balance along the family
rec.balance = [];
for (const rho of [0.1, 0.3, 0.5, rec.balanceCoefficient, 1, 1.5, 2, 3, 10]) {
  const Om = hexagonOmega(rho), X = hexagon(rho);
  const b = rigidBalance(X, HEX_Q, Om);
  const r = pathResidual({ q: HEX_Q, path: rigidPath(X, Om), Omega: Om, R: rho, period: 2 * Math.PI / Om, nT: 64 });
  const det = solveAccelerations(rigidState(X, Om), P).det;
  rec.balance.push({ rho, Omega: Om, v: Om * rho, inverseSquareResidualRel: b.maxRel, fullSolveResidualRel: r.maxRel, tangentialRel: r.tangentialRel, radialRel: r.radialRel, det, cond: r.maxCond, speed: speedLabels([Om * rho]) });
}
rec.equalityRadius = { rho: rec.balanceCoefficient, note: 'v = Omega rho = sqrt((5/4-1/sqrt3) K/rho) = c_f at rho = (5/4 - 1/sqrt3) K/c_f^2' };
log(`balance: worst full-solve residual ${Math.max(...rec.balance.map(b => b.fullSolveResidualRel)).toExponential(2)}`);

// ---------------------------------------------------------------- 2. determinant along the family: constants c_k with eigenvalues 1 + c_k / x
{
  const X = hexagon(1), y = rigidState(X, hexagonOmega(1));
  const { M, n } = assemble(y, P);
  const D = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => M[i * n + j] - (i === j ? 1 : 0)));
  const ck = eigenvalues(D).map(z => z.re).sort((a, b) => a - b);
  // identification against a + b sqrt3 with small rational a, b (denominators up to 24)
  const ident = c => { for (let qd = 1; qd <= 24; qd++) for (let qb = 1; qb <= 24; qb++) for (let pb = -40; pb <= 40; pb++) { const a = c - pb / qb * Math.sqrt(3); const pa = Math.round(a * qd); if (Math.abs(a * qd - pa) < 1e-9) return { a: `${pa}/${qd}`, bSqrt3: `${pb}/${qb}`, value: pa / qd + pb / qb * Math.sqrt(3) }; } return null; };
  const groups = []; for (const c of ck) { const g = groups.find(g => Math.abs(g.c - c) < 1e-9); if (g) g.mult++; else groups.push({ c, mult: 1, closedForm: ident(c) }); }
  rec.determinant = { constants: groups, note: 'M - I is homogeneous of degree -1 in rho and the hexagon geometry is scale-free, so every eigenvalue of M on the family is 1 + c_k/x with x = rho c_f^2/K; det M = prod (1 + c_k/x)' };
  const detFromConstants = x => groups.reduce((p, g) => p * Math.pow(1 + g.c / x, g.mult), 1);
  rec.determinant.checks = [0.3, 0.5, 1, 1.7, 3, 10].map(x => { const d = solveAccelerations(rigidState(hexagon(x), hexagonOmega(x)), P).det; return { x, detDirect: d, detFromConstants: detFromConstants(x), relErr: Math.abs(d - detFromConstants(x)) / Math.abs(d) }; });
  // singular radii: x = -c_k for negative c_k
  rec.determinant.singularRadii = groups.filter(g => g.c < -1e-12).map(g => ({ x: -g.c, multiplicity: g.mult, closedForm: g.closedForm }));
  // scan and bisection of det M along rho in [0.1, 10] (independent of the constants)
  const detAt = rho => solveAccelerations(rigidState(hexagon(rho), hexagonOmega(rho)), P).det;
  const grid = []; for (let k = 0; k <= 400; k++) grid.push(0.1 * Math.pow(100, k / 400));
  const signChanges = [];
  for (let k = 1; k < grid.length; k++) { let a = grid[k - 1], b = grid[k], fa = detAt(a), fb = detAt(b); if (Math.sign(fa) !== Math.sign(fb)) { for (let it = 0; it < 100; it++) { const m = 0.5 * (a + b), fm = detAt(m); if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else { b = m; fb = fm; } if (b - a < 1e-15 * b) break; } signChanges.push({ rho: 0.5 * (a + b), width: b - a, detLeft: detAt(grid[k - 1]), detRight: detAt(grid[k]) }); } }
  rec.determinant.bisection = { gridPoints: grid.length, range: [0.1, 10], signChanges, detAt: [0.3, 1, 3].map(r => ({ rho: r, det: detAt(r) })) };
  log(`determinant constants: ${groups.map(g => `${g.c.toFixed(6)}x${g.mult}`).join(', ')}; sign changes at rho = ${signChanges.map(s => s.rho.toFixed(10)).join(', ')}`);
}

// ---------------------------------------------------------------- 3. rotating-frame spectra with the in-plane / axial split
function hexSpectrum(rho, opt = {}) {
  const Om = hexagonOmega(rho), X = hexagon(rho), members = rigidMembers(X, HEX_Q, Om);
  const full = rotatingSpectrum(members, Om, { balanceTol: 1e-10, step: opt.step ?? 1e-4 });
  // own split: Jacobian of the rotating-frame field, separated into in-plane (x,y) and axial (z) state indices
  const y = packState(members.map(m => ({ ...m, v: [0, 0, 0] }))), F = yy => rotatingDerivative(yy, P, [0, 0, Om]);
  const { J, errEst } = jacobian(F, y, { step: opt.step ?? 1e-4 });
  const axialIdx = [], planeIdx = []; for (let k = 0; k < 36; k++) ((k % 3) === 2 ? axialIdx : planeIdx).push(k);
  const sub = idx => idx.map(i => idx.map(j => J[i][j]));
  let cross = 0; for (const i of axialIdx) for (const j of planeIdx) cross = Math.max(cross, Math.abs(J[i][j]), Math.abs(J[j][i]));
  const axial = eigenvalues(sub(axialIdx)).sort((a, b) => a.im - b.im || a.re - b.re), plane = eigenvalues(sub(planeIdx)).sort((a, b) => a.im - b.im || a.re - b.re);
  return { rho, Omega: Om, v: Om * rho, balanced: full.balanced, balanceResidual: full.balanceResidualMax, jacobianErrorEstimate: errEst, full: full.eigenvalues, classes: full.classes, maxRealPart: full.classes?.maxRealPart, growthOverOmega: full.classes?.growthOverOmega, axialBlock: { eigenvalues: axial, classes: classifyEigenvalues(axial, Om), crossBlockMax: cross }, inPlaneBlock: { eigenvalues: plane, classes: classifyEigenvalues(plane, Om) }, axialFrequenciesOverOmega: axial.filter(z => z.im > 1e-6 && Math.abs(z.re) < 1e-6).map(z => z.im / Om), axialGrowthOverOmega: axial.filter(z => z.re > 1e-6).map(z => z.re / Om) };
}
rec.spectra = [0.3, 1, 3, rec.balanceCoefficient].map(r => hexSpectrum(r));
for (const s of rec.spectra) log(`spectrum rho=${s.rho.toFixed(5)}: balanced=${s.balanced} maxRe/Omega=${s.growthOverOmega?.toFixed(5)} classes=${JSON.stringify(s.classes)} axial freq/Omega=${s.axialFrequenciesOverOmega.map(z => z.toFixed(5)).join(',')} axial growth/Omega=${s.axialGrowthOverOmega.map(z => z.toFixed(5)).join(',')}`);

// ---------------------------------------------------------------- 4. resonance scan: axial frequencies against Omega (choreography seeds)
// Derived expectation: for a planar rigid configuration every axial displacement changes no separation to first
// order, so the axial block of M is the identity and the axial block of the stiffness scales as K/rho^3 = Omega^2 x const;
// the axial frequencies in units of Omega are therefore radius-independent, and a crossing of a commensurate ratio
// cannot occur along the family.  The scan measures the spread of each axial ratio over rho in [0.1, 10].
{
  const ratios = [1, 2, 3, 0.5, 1.5], scan = [];
  const grid = []; for (let k = 0; k <= 60; k++) grid.push(0.1 * Math.pow(100, k / 60));
  for (const rho of grid) { const s = hexSpectrum(rho, { step: 1e-4 }); scan.push({ rho, axialFreqOverOmega: s.axialFrequenciesOverOmega.slice().sort((a, b) => a - b), axialGrowthOverOmega: s.axialGrowthOverOmega, maxRealPartOverOmega: s.growthOverOmega }); }
  const nf = Math.min(...scan.map(s => s.axialFreqOverOmega.length));
  const perRatio = []; for (let k = 0; k < nf; k++) { const vals = scan.map(s => s.axialFreqOverOmega[k]); perRatio.push({ index: k, min: Math.min(...vals), max: Math.max(...vals), spread: Math.max(...vals) - Math.min(...vals), closestTarget: ratios.map(t => ({ target: t, distance: Math.min(...vals.map(v => Math.abs(v - t))) })).sort((a, b) => a.distance - b.distance)[0] }); }
  const commensurate = perRatio.filter(r => r.closestTarget.distance <= 1e-3 && r.closestTarget.target !== 1);
  rec.resonanceScan = { ratios, grid: [0.1, 10], points: grid.length, axialFrequencyCountsPerPoint: scan.map(s => s.axialFreqOverOmega.length), perRatio, commensurateNonTilt: commensurate, anyAxialGrowth: scan.some(s => s.axialGrowthOverOmega.length > 0), scan };
  log(`axial ratios over rho in [0.1,10]: ${perRatio.map(r => `${r.min.toFixed(6)}..${r.max.toFixed(6)}`).join(' | ')}; commensurate non-tilt hits: ${commensurate.length}`);
}

// ---------------------------------------------------------------- 5. integer frequency table
rec.integerFrequencies = [];
for (let n = 1; n <= 8; n++) {
  const rho = Math.cbrt(rec.balanceCoefficient / (n * n)), v = n * rho, det = solveAccelerations(rigidState(hexagon(rho), hexagonOmega(rho)), P).det;
  rec.integerFrequencies.push({ n, Omega: n, f: n / (2 * Math.PI), rho, v, pathLength: 2 * Math.PI * rho, primitivePeriod: 2 * Math.PI / n, det, regular: Math.abs(det) > 1e-8, speed: speedLabels([v]), singularRadiusRelation: rec.determinant.singularRadii.map(s => rho > s.x ? 'above' : 'below') });
}

// ---------------------------------------------------------------- 6. measured fate at rho = 1
rec.fates = [];
if (!noFate) for (const rho of [1, 3]) {
  const Om = hexagonOmega(rho), Per = 2 * Math.PI / Om, X = hexagon(rho), rand = rng(7);
  const dir = []; for (let i = 0; i < 6; i++) dir.push(randomUnit(rand)); // one random displacement direction, shared by both amplitudes
  rec.fates.push(null); rec.fate = { rho, Omega: Om, period: Per, perturbationDirection: dir, settings: { tEndPeriods: 20, maxSteps: 40000, hmaxFraction: 1 / 50, events: { rContact: 1e-6, rEscape: 1e3, detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10, speedRecord: true, speedStop: false } }, runs: [] };
  const cases = [];
  for (const eps of [0, 1e-6, 1e-3]) for (const tol of [{ rtol: 1e-12, atol: 1e-14 }, { rtol: 1e-10, atol: 1e-12 }]) cases.push({ eps, method: 'gbs', ...tol });
  cases.push({ eps: 1e-6, method: 'rk4', h: Per / 4000 }); cases.push({ eps: 1e-3, method: 'rk4', h: Per / 4000 });
  for (const c of cases) {
    const members = X.map((x, i) => ({ x: v3.add(x, v3.scale(dir[i], c.eps * rho)), v: v3.scale(v3.cross([0, 0, 1], x), Om), q: HEX_Q[i] }));
    const stem = `fate-rho${rho}-eps${c.eps}-${c.method}${c.rtol ? '-rtol' + c.rtol : ''}`;
    const spec = { name: stem, members, coefficients: COEFF, integrator: c.method === 'rk4' ? { method: 'rk4', h: c.h, maxSteps: 400000 } : { method: 'gbs', rtol: c.rtol, atol: c.atol, hmax: Per / 50, maxSteps: 40000 }, events: { rContact: 1e-6, rEscape: 1e3, detMin: 1e-8, pivotMin: 1e-10, condMax: 1e10, speed: { record: true, stop: false }, turning: { record: false } }, tEnd: 20 * Per, candidate: 'weber', condition: 'exact' };
    const samples = [], lines = [], t0 = Date.now();
    log(`fate run ${stem} start`);
    const res = runCase(spec, {
      onRecord(r) { lines.push(JSON.stringify(r)); if (r.type === 'state') { const dev = []; for (let i = 0; i < 6; i++) { const xh = rotate([0, 0, 1], Om * r.t, X[i]); dev.push(Math.hypot(r.x[3 * i] - xh[0], r.x[3 * i + 1] - xh[1], r.x[3 * i + 2] - xh[2]) / rho); } const radii = [], speeds = []; for (let i = 0; i < 6; i++) { radii.push(Math.hypot(r.x[3 * i], r.x[3 * i + 1], r.x[3 * i + 2])); speeds.push(Math.hypot(r.v[3 * i], r.v[3 * i + 1], r.v[3 * i + 2])); } samples.push({ t: r.t, dev: Math.max(...dev), devZ: Math.max(...[0, 1, 2, 3, 4, 5].map(i => Math.abs(r.x[3 * i + 2]))) / rho, rMin: Math.min(...radii), rMax: Math.max(...radii), sMax: Math.max(...speeds), sMin: Math.min(...speeds), det: r.det, minSep: minSeparation(r.x, 6), H: r.H }); } },
      heartbeat: ({ t, steps }) => log(`  heartbeat ${stem}: t=${t.toFixed(2)} (${(t / Per).toFixed(2)} periods) steps=${steps} wall=${((Date.now() - t0) / 1000).toFixed(0)}s`), heartbeatEvery: 5000,
    });
    fs.writeFileSync(path.join(OUT, `${stem}.trajectory.jsonl`), lines.join('\n') + '\n');
    fs.writeFileSync(path.join(OUT, `${stem}.summary.json`), JSON.stringify(res, null, 1) + '\n');
    // growth-rate fit: linear regression of ln(dev) over the window [lo, hi]
    const [lo, hi] = c.eps === 0 ? [1e-10, 1e-5] : [10 * c.eps, Math.min(1e-2, 1000 * c.eps)];
    const win = samples.filter(s => s.dev >= lo && s.dev <= hi && s.t > 0);
    let fit = null;
    if (win.length >= 5) { const n = win.length; let sx = 0, sy = 0, sxx = 0, sxy = 0; for (const s of win) { const yv = Math.log(s.dev); sx += s.t; sy += yv; sxx += s.t * s.t; sxy += s.t * yv; } const slope = (n * sxy - sx * sy) / (n * sxx - sx * sx); let ss = 0; const ic = (sy - slope * sx) / n; for (const s of win) ss += (Math.log(s.dev) - ic - slope * s.t) ** 2; fit = { rate: slope, rateOverOmega: slope / Om, samples: n, window: [lo, hi], tRange: [win[0].t, win[n - 1].t], rmsLogResidual: Math.sqrt(ss / n) }; }
    const firstEvent = res.events.length ? res.events.slice().sort((a, b) => a.t - b.t)[0] : null;
    const t1e3 = samples.find(s => s.dev > 1e-3), t1e8 = samples.find(s => s.dev > 1e-8);
    const run = { stem, eps: c.eps, method: c.method, rtol: c.rtol ?? null, h: c.h ?? null, termination: res.termination, tFinal: res.tFinal, periods: res.tFinal / Per, steps: res.steps, nfev: res.nfev, wallSeconds: res.wallSeconds, firstEvent: firstEvent && { name: firstEvent.name, kind: firstEvent.kind, t: firstEvent.t, periods: firstEvent.t / Per, member: firstEvent.member, pair: firstEvent.pair, direction: firstEvent.direction }, events: res.events.length, deviationReaches: { '1e-8': t1e8 ? { t: t1e8.t, periods: t1e8.t / Per } : null, '1e-3': t1e3 ? { t: t1e3.t, periods: t1e3.t / Per } : null }, growthFit: fit, predictedFastestOverOmega: rec.spectra.find(s => s.rho === rho).growthOverOmega, radiusSpread: { min: Math.min(...samples.map(s => s.rMin)), max: Math.max(...samples.map(s => s.rMax)) }, minSeparation: Math.min(...samples.map(s => s.minSep)), minAbsDet: res.diagnostics.minAbsDet, maxCond: res.diagnostics.maxCond, maxSpeed: Math.max(...samples.map(s => s.sMax)), firstSpeedCrossingFromStates: (() => { const f = samples.find(s => s.sMax > 1); return f ? { t: f.t, periods: f.t / Per } : null; })(), speedLabels: speedLabels([Math.max(...samples.map(s => s.sMax)), Math.min(...samples.map(s => s.sMin))]), HDrift: res.diagnostics.maxRelDriftCandidate, maxZOverRho: Math.max(...samples.map(s => s.devZ)), final: res.final };
    rec.fate.runs.push(run);
    rec.fates[rec.fates.length - 1] = rec.fate;
    log(`  ${stem}: ${res.termination.reason} at ${run.periods.toFixed(3)} periods; dev>1e-3 at ${t1e3 ? (t1e3.t / Per).toFixed(3) : '—'} periods; fit rate/Omega=${fit ? fit.rateOverOmega.toFixed(5) : '—'} (predicted ${run.predictedFastestOverOmega.toFixed(5)}); first event ${run.firstEvent ? run.firstEvent.name + ' t=' + run.firstEvent.t.toFixed(2) : 'none'}; minSep ${run.minSeparation.toExponential(2)}; maxSpeed ${run.maxSpeed.toFixed(3)}; wall ${res.wallSeconds.toFixed(1)}s`);
    writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
  }
}
rec.finished = utc();
writeJson(RECEIPT, rec);
log(`F0 receipt written: ${path.relative(REPO_ROOT, RECEIPT)}`);
