#!/usr/bin/env node
// Adjudication checks for the weber-overnight four-member ring (independent lane, Gauss role).
// Companion to weber-overnight-ring-independent-adjudication.md. The fixed reference script
// weber-overnight-ring-reference.mjs is NOT imported or modified; this file re-implements the
// small pieces it needs so that the checks below are a second, separately written instrument.
//
// Order fixed by AGENTS.md (Claim Grading): known cases K0a-K0c run and are printed first;
// a known-case failure stops the script before any target check.
//
//   node weber-overnight-ring-adjudication-checks.mjs
//
// Units: K = c_f = 1, lambda_W = -1/2, mu_W = 1, instantaneous support, unit weights.
// Output: log and JSON under .local-data/master-equation-closure/weber-overnight/review/ring/.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = join(HERE, '../../../../..');
const OUT_DIR = join(REPO, '.local-data/master-equation-closure/weber-overnight/review/ring');
const RUNS = join(HERE, 'weber-overnight-ring-runs.json');
const TRAJ_DIR = join(REPO, '.local-data/master-equation-closure/weber-overnight/ring');
mkdirSync(OUT_DIR, { recursive: true });

const S2 = Math.SQRT2, CW = 2 * S2 - 1, XSTAR = CW / 4;
const LAM = -0.5, MU = 1, K = 1;
const lines = [], record = { runUTC: new Date().toISOString(), known: [], checks: [] };
const log = s => { lines.push(s); console.log(s); };
let knownOk = true;
function result(id, pass, text, data) { log(`${pass ? 'PASS' : 'FAIL'}  ${id}  ${text}`); return { id, pass, text, ...data }; }

// ------------------------------------------------------------------ law assembler (positions, velocities -> accelerations)
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function solve(X, V, q) {
  const N = X.length, n = 3 * N, M = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const b = new Array(n).fill(0);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]], r = Math.hypot(...d), e = d.map(z => z / r);
    const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]], rd = dot(e, w), wp2 = dot(w, w) - rd * rd;
    const sig = Math.sign(q[i] * q[j]), g = sig * K * MU / r, bb = (sig * K / (r * r)) * (1 + LAM * rd * rd + MU * wp2);
    for (let a = 0; a < 3; a++) {
      b[3 * i + a] += bb * e[a]; b[3 * j + a] -= bb * e[a];
      for (let c = 0; c < 3; c++) { const p = g * e[a] * e[c]; M[3 * i + a][3 * i + c] -= p; M[3 * j + a][3 * j + c] -= p; M[3 * i + a][3 * j + c] += p; M[3 * j + a][3 * i + c] += p; }
    }
  }
  // Gaussian elimination with partial pivoting; determinant as by-product
  const A = M.map((row, i) => row.concat([b[i]])); let det = 1;
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    if (p !== k) { [A[k], A[p]] = [A[p], A[k]]; det = -det; }
    det *= A[k][k];
    for (let i = k + 1; i < n; i++) { const f = A[i][k] / A[k][k]; if (f) for (let j = k; j <= n; j++) A[i][j] -= f * A[k][j]; }
  }
  const acc = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = A[i][n]; for (let j = i + 1; j < n; j++) s -= A[i][j] * acc[j]; acc[i] = s / A[i][i]; }
  return { acc, det };
}
const ring = rho => ({ X: [[rho, 0, 0], [0, rho, 0], [-rho, 0, 0], [0, -rho, 0]], q: [1, -1, 1, -1] });
const Omega = x => Math.sqrt(CW / (4 * x ** 3));

// pair relative invariant for an isolated pair with unit weights (Section 5 of the adjudication file,
// restricted to N = 2 and with the centre-of-velocity kinetic part removed):
//   E_rel = |w|^2/4 + sigma K (1 - rdot^2/2)/r.   For sigma = -1 this is rdot^2 (1 + 2K/r)/4 + |w_perp|^2/4 - K/r,
//   so E_rel < 0 forces r to stay bounded (every term but -K/r is >= 0 and -K/r -> 0 at large r).
function pairInvariant(Xi, Vi, Xj, Vj, sig) {
  const d = [Xi[0] - Xj[0], Xi[1] - Xj[1], Xi[2] - Xj[2]], r = Math.hypot(...d), e = d.map(z => z / r);
  const w = [Vi[0] - Vj[0], Vi[1] - Vj[1], Vi[2] - Vj[2]], rd = dot(e, w);
  return { r, rdot: rd, E: dot(w, w) / 4 + sig * K * (1 - rd * rd / 2) / r };
}

// offset + cosine fit, frequency by golden-section search on the least-squares residual
function fitOffsetCos(t, y, wLo, wHi) {
  const resid = w => { // least squares on [1, cos wt, sin wt]
    const cols = [t.map(() => 1), t.map(tt => Math.cos(w * tt)), t.map(tt => Math.sin(w * tt))];
    const G = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], h = [0, 0, 0];
    for (let i = 0; i < 3; i++) { for (let j = 0; j < 3; j++) for (let k = 0; k < t.length; k++) G[i][j] += cols[i][k] * cols[j][k]; for (let k = 0; k < t.length; k++) h[i] += cols[i][k] * y[k]; }
    // solve 3x3
    const A = G.map((r, i) => r.concat([h[i]]));
    for (let k = 0; k < 3; k++) { let p = k; for (let i = k + 1; i < 3; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i; [A[k], A[p]] = [A[p], A[k]]; for (let i = 0; i < 3; i++) if (i !== k) { const f = A[i][k] / A[k][k]; for (let j = k; j < 4; j++) A[i][j] -= f * A[k][j]; } }
    const c = [A[0][3] / A[0][0], A[1][3] / A[1][1], A[2][3] / A[2][2]];
    let s = 0; for (let k = 0; k < t.length; k++) s += (y[k] - c[0] - c[1] * cols[1][k] - c[2] * cols[2][k]) ** 2;
    return { rms: Math.sqrt(s / t.length), c };
  };
  // coarse grid then golden section
  let best = null; for (let i = 0; i <= 2000; i++) { const w = wLo + (wHi - wLo) * i / 2000; const r = resid(w).rms; if (!best || r < best.r) best = { w, r }; }
  let a = best.w - (wHi - wLo) / 2000, b = best.w + (wHi - wLo) / 2000; const gr = (Math.sqrt(5) - 1) / 2;
  let c = b - gr * (b - a), d = a + gr * (b - a), fc = resid(c).rms, fd = resid(d).rms;
  for (let it = 0; it < 200; it++) { if (fc < fd) { b = d; d = c; fd = fc; c = b - gr * (b - a); fc = resid(c).rms; } else { a = c; c = d; fc = fd; d = a + gr * (b - a); fd = resid(d).rms; } }
  const w = (a + b) / 2, r = resid(w); return { omega: w, rms: r.rms, coef: r.c };
}

// ------------------------------------------------------------------ known cases, run and recorded first
log('=== Known cases (recorded before any target check) ===');
{ // K0a: two-member determinant against the pair denominator 1 - 2 sigma K mu/(c_f^2 r)
  let worst = 0;
  for (const sig of [1, -1]) for (const r of [0.5, 1.3, 2, 7]) {
    const { det } = solve([[0, 0, 0], [r, 0, 0]], [[0, 0, 0], [0, 0.2, 0]], [1, sig]);
    worst = Math.max(worst, Math.abs(det - (1 - 2 * sig * K * MU / r)));
  }
  const k = result('K0a', worst < 1e-14, `two-member determinant vs 1 - 2 sigma K mu/(c_f^2 r), max |diff| = ${worst.toExponential(2)}`, { maxDiff: worst });
  record.known.push(k); knownOk &&= k.pass;
}
{ // K0b: circular opposite-polarity pair: relative acceleration 2K/r^2 gives theta_dot^2 = 2K/r^3 and E_rel = -K/(2r); the assembler must return the centripetal accelerations and the invariant must take that value
  const r = 1.3, thd = Math.sqrt(2 * K / r ** 3), X = [[r / 2, 0, 0], [-r / 2, 0, 0]], V = [[0, r / 2 * thd, 0], [0, -r / 2 * thd, 0]];
  const { acc } = solve(X, V, [1, -1]);
  const want = -(r / 2) * thd * thd, resid = Math.max(Math.abs(acc[0] - want), Math.abs(acc[3] + want), Math.abs(acc[1]), Math.abs(acc[4]));
  const inv = pairInvariant(X[0], V[0], X[1], V[1], -1), eDiff = Math.abs(inv.E + K / (2 * r));
  const k = result('K0b', resid < 1e-14 && eDiff < 1e-14, `circular opposite pair at r = ${r}: centripetal residual ${resid.toExponential(2)}, E_rel + K/(2r) = ${eDiff.toExponential(2)}`, { resid, eDiff });
  record.known.push(k); knownOk &&= k.pass;
}
{ // K0c: the offset + cosine fitter recovers a known frequency from a clean signal
  const w0 = 0.2735177299892466, t = Array.from({ length: 124 }, (_, i) => 45.57 * i / 123), y = t.map(tt => 2 - Math.cos(w0 * tt));
  const f = fitOffsetCos(t, y, 0.2, 0.35), err = Math.abs(f.omega - w0) / w0;
  const k = result('K0c', err < 1e-10, `fitter on 2 - cos(w0 t): relative error ${err.toExponential(2)}, rms ${f.rms.toExponential(2)}`, { err });
  record.known.push(k); knownOk &&= k.pass;
}
if (!knownOk) { log('known-case failure: stopping before target checks'); writeFileSync(join(OUT_DIR, 'ring-adjudication-checks.log'), lines.join('\n') + '\n'); process.exit(1); }

// ------------------------------------------------------------------ target checks
log('\n=== C1 static ring control, subject eq. (4.5): A_static = -(2 sqrt2 - 1)K/(4 rho^2) * x/(x + sqrt2 - 1) ===');
{
  const rows = []; let worst = 0;
  for (const x of [0.5, 0.8, 1.7, 3]) {
    const { X, q } = ring(x), V = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]], { acc } = solve(X, V, q);
    const radial = acc[0], tang = Math.max(Math.abs(acc[1]), Math.abs(acc[2])), formula = -(CW * K / (4 * x * x)) * x / (x + S2 - 1);
    worst = Math.max(worst, Math.abs(radial - formula), tang);
    rows.push({ x, solvedRadial: radial, formula, inverseSquare: -(CW * K / (4 * x * x)) });
    log(`  x=${x}: solved radial ${radial.toPrecision(12)}, formula ${formula.toPrecision(12)}, inverse-square value ${(-(CW * K / (4 * x * x))).toPrecision(6)}, tangential ${tang.toExponential(1)}`);
  }
  record.checks.push(result('C1', worst < 1e-14, `static-ring solve equals (4.5) at four radii, max |diff| = ${worst.toExponential(2)}; at x = 1/2 the solved value is -0.25 K/rho^2 = -1.0 K (the subject writes "-K/rho^2" for the number -1.0, a unit slip)`, { rows, worst }));
}

log('\n=== C2 sector rates at x_*, x = 0.3 and the control limit, in units of Omega (subject Section 5.3 figures) ===');
{
  const rates = x => {
    const Om2 = CW / (4 * x ** 3), Om = Math.sqrt(Om2), ms = 1 + S2 / x, D = (2 * S2 + (8 - S2) / x) / (4 * x ** 3), g1 = Math.sqrt(D) / ms;
    const mA = 1 - 1 / x, mB = 1 + S2 / x, kA = 0.75 / x ** 3, kB = -1.5 * S2 / x ** 3, A = mA * mB, B = mA * kB + mB * kA + 4 * Om2, C = kA * kB;
    const disc = B * B - 4 * A * C, s1 = (-B + Math.sqrt(disc)) / (2 * A), s2 = (-B - Math.sqrt(disc)) / (2 * A);
    const k2 = [s1, s2].map(s => (s > 0 ? { growth: Math.sqrt(s) } : { oscillation: Math.sqrt(-s) }));
    return { x, Omega: Om, k1growth: g1, k1overOmega: g1 / Om, k2, k2overOmega: k2.map(r => (r.growth ?? r.oscillation) / Om) };
  };
  const out = {};
  for (const x of [1.7, 0.8, XSTAR, 0.3, 1e6]) { const r = rates(x); out[x] = r; log(`  x=${x}: Omega=${r.Omega.toPrecision(10)} k1 growth ${r.k1growth.toPrecision(10)} (${r.k1overOmega.toFixed(4)} Omega); k2 ${JSON.stringify(r.k2)} -> (${r.k2overOmega.map(z => z.toFixed(4)).join(', ')}) Omega`); }
  const sx = out[XSTAR], ctl = out[1e6].k2overOmega[0]; // control-limit k=2 growth (index 0 is the growth root there)
  const ok = Math.abs(sx.k1overOmega - 0.750) < 1e-3 && Math.abs(sx.k2overOmega[0] - 0.752) < 1e-3 && Math.abs(sx.k2overOmega[1] - 1.665) < 1e-3 && Math.abs(out[1e6].k1overOmega - 1.243) < 1e-3 && Math.abs(ctl - 1.517) < 2e-3 && Math.abs(out[1.7].k2overOmega[0] - 1.122) < 1e-3 && Math.abs(out[1.7].k1overOmega - 1.045) < 1e-3;
  record.checks.push(result('C2', ok, `subject figures 1.045, 1.122 (x=1.7); 0.750, 0.752, 1.665 (x_*); 1.243 (control limit) reproduced to the three digits given; the control-limit k=2 growth is ${ctl.toFixed(4)} Omega, which rounds to 1.518, not the subject's 1.517`, out));
  // the subject's correction history: with the slipped stiffness (1 - sqrt2)/4 the k=1 discriminant -(Omega^2 + m_s k_s) changes sign at x = sqrt2 - 1
  const slipped = x => -(CW / 4 + (1 + S2 / x) * (1 - S2) / 4); // units K/rho^3
  log(`  slipped stiffness (1 - sqrt2)/4: discriminant sign at x = 0.40 -> ${Math.sign(slipped(0.40))}, at x = 0.43 -> ${Math.sign(slipped(0.43))}; sign change at x = sqrt2 - 1 = ${(S2 - 1).toFixed(6)}: value there ${slipped(S2 - 1).toExponential(2)}`);
}

log('\n=== C3 breathing-displacement fit bias from the Jordan phase drift (subject 10.3, 10.6 item 1) ===');
{
  // Position-only radial displacement eps r_hat with velocities unchanged: l -> l (1 + eps/rho), family radius -> rho (1 + 2 eps/rho),
  // family rate -> Omega (1 - 3 eps/rho). In the frame rotating at Omega(rho) the phase drifts as dphi = -3 (eps/rho) Omega T and the
  // radial projection d.r_hat = rho' cos(dphi) - rho carries -rho dphi^2/2. In units of eps the signal is 2 - cos(w t) - (9/2)(eps/rho) Omega^2 t^2.
  // Windows and sample counts are those the runner recorded for WR-1 (x = 1.7: 124 samples to T = 45.57; x = 0.8: 48 samples to T = 4.609).
  const out = {};
  for (const [x, tEnd, n] of [[1.7, 45.57339679, 124], [0.8, 4.6088763298, 48]]) {
    const Om = Omega(x), w0 = Om / Math.sqrt(1 + (S2 - 1) / x), epsRel = 1e-6;
    const t = Array.from({ length: n }, (_, i) => tEnd * i / (n - 1));
    const clean = fitOffsetCos(t, t.map(tt => 2 - Math.cos(w0 * tt)), 0.5 * w0, 1.5 * w0);
    const drift = fitOffsetCos(t, t.map(tt => 2 - Math.cos(w0 * tt) - 4.5 * epsRel * Om * Om * tt * tt), 0.5 * w0, 1.5 * w0);
    out[x] = { cleanRelErr: (clean.omega - w0) / w0, driftRelBias: (drift.omega - w0) / w0, driftRms: drift.rms, driftTermAtWindowEnd: 4.5 * epsRel * Om * Om * tEnd * tEnd };
    log(`  x=${x}: clean fit rel err ${out[x].cleanRelErr.toExponential(2)}; with the drift term: rel bias ${out[x].driftRelBias.toExponential(3)} (subject measured +2.1e-5), fit rms ${drift.rms.toExponential(2)} (subject 1.1e-4), drift term at window end ${out[x].driftTermAtWindowEnd.toExponential(2)} eps`);
  }
  const ok = Object.values(out).every(o => o.driftRelBias > 5e-6 && o.driftRelBias < 5e-5 && Math.abs(o.cleanRelErr) < 1e-10);
  record.checks.push(result('C3', ok, `an unmodelled -rho dphi^2/2 term of the stated origin, on the recorded windows, biases an offset+cosine fit by ${Object.values(out).map(o => o.driftRelBias.toExponential(2)).join(' and ')} relative (subject measured +2.1e-5 at both radii): same sign and order, so the subject's explanation is admitted as the dominant cause; the exact figure is not reproduced because the fit is also sensitive to the sampling pattern`, out));
}

log('\n=== C4 runner predictions vs this lane\'s closed forms, and measured 1e-6 rates vs this lane ===');
{
  const runs = JSON.parse(readFileSync(RUNS, 'utf8')), mine = {}, diffs = [];
  for (const x of [1.7, 0.8]) {
    const Om = Omega(x), ms = 1 + S2 / x, D = (2 * S2 + (8 - S2) / x) / (4 * x ** 3);
    const mA = 1 - 1 / x, mB = ms, kA = 0.75 / x ** 3, kB = -1.5 * S2 / x ** 3, A = mA * mB, B = mA * kB + mB * kA + 4 * Om * Om, C = kA * kB, disc = Math.sqrt(B * B - 4 * A * C);
    mine[x] = { Omega: Om, breathing: Om / Math.sqrt(1 + (S2 - 1) / x), warp: Math.sqrt(S2 / x ** 3), k1growth: Math.sqrt(D) / ms, k1phase: Om / ms, s: [(-B + disc) / (2 * A), (-B - disc) / (2 * A)] };
    const p = runs.preregistration.predictions[String(x)];
    const d = Math.max(Math.abs(p.Omega - Om), Math.abs(p.breathing - mine[x].breathing), Math.abs(p.warp - mine[x].warp), Math.abs(p.sublattice.growth - mine[x].k1growth), Math.abs(p.sublattice.phaseRate - mine[x].k1phase), ...p.ellipticShear.sRoots.map((s, i) => Math.abs(s - mine[x].s[i])));
    diffs.push(d); log(`  x=${x}: runner predictions vs this lane, max |diff| = ${d.toExponential(2)}`);
  }
  const rows = [];
  const rel = (m, p) => (m - p) / p;
  for (const e of runs.rates) {
    const m = mine[e.radius], f = e.prereg.fit, g = e.refine.fit; let row;
    if (f.window10eps && e.name === 'sublattice') row = { id: e.id, name: e.name, x: e.radius, quantity: 'k=1 growth', measured: f.window10eps.growth, reference: m.k1growth, relDiff: rel(f.window10eps.growth, m.k1growth), relDiffRefine: rel(g.window10eps.growth, m.k1growth) };
    else if (f.window10eps) { const sm = f.window10eps.sFitted.slice().sort((a, b) => b - a), sp = m.s.slice().sort((a, b) => b - a); row = { id: e.id, name: e.name, x: e.radius, quantity: 'k=2 roots s=z^2 (sorted)', measured: sm, reference: sp, relDiff: sm.map((s, i) => rel(s, sp[i])), rateRelDiff: sm.map((s, i) => rel(Math.sqrt(Math.abs(s)), Math.sqrt(Math.abs(sp[i])))) }; }
    else if (e.name === 'breathing' || e.name === 'rotationPhase') row = { id: e.id, name: e.name, x: e.radius, quantity: 'breathing frequency', measured: f.fit.oscillation, reference: m.breathing, relDiff: rel(f.fit.oscillation, m.breathing) };
    else if (e.name === 'warp') row = { id: e.id, name: e.name, x: e.radius, quantity: 'warp frequency', measured: f.fit.oscillation, reference: m.warp, relDiff: rel(f.fit.oscillation, m.warp) };
    else if (e.name === 'tilt') row = { id: e.id, name: e.name, x: e.radius, quantity: 'tilt frequency', measured: f.fit.oscillation, reference: m.Omega, relDiff: rel(f.fit.oscillation, m.Omega) };
    else if (e.name === 'translation') row = { id: e.id, name: e.name, x: e.radius, quantity: 'translation phase rate', measured: f.fit.phaseRate, reference: m.Omega, relDiff: rel(f.fit.phaseRate, m.Omega) };
    else if (e.name === 'boost') row = { id: e.id, name: e.name, x: e.radius, quantity: 'boost modulus slope / (eps Omega)', measured: f.fit.modulusSlope, reference: 1e-6 * e.radius * m.Omega, relDiff: rel(f.fit.modulusSlope, 1e-6 * e.radius * m.Omega) };
    rows.push(row); log(`  ${row.id} ${row.name} x=${row.x}: ${row.quantity}: measured ${JSON.stringify(row.measured)} reference ${JSON.stringify(row.reference)} relDiff ${JSON.stringify(row.relDiff)}${row.rateRelDiff ? ' rateRelDiff ' + JSON.stringify(row.rateRelDiff) : ''}`);
  }
  const worstOf = r => Math.max(...[].concat(r.rateRelDiff ?? r.relDiff).map(Math.abs));
  const unstable = rows.filter(r => ['sublattice', 'elliptic', 'shear'].includes(r.name)), worstUnstable = Math.max(...unstable.map(worstOf));
  const worstNonBreathing = Math.max(...rows.filter(r => r.name !== 'breathing').map(worstOf));
  const above1e7 = rows.filter(r => worstOf(r) > 1e-7).map(r => `${r.id} ${r.name} x=${r.x}: ${worstOf(r).toExponential(1)}`);
  record.checks.push(result('C4', Math.max(...diffs) < 1e-14 && worstUnstable < 1e-6 && worstNonBreathing < 1e-5, `runner predictions equal this lane's closed forms to ${Math.max(...diffs).toExponential(1)}; unstable-sector rates agree with this lane to ${worstUnstable.toExponential(2)} relative or better, all other non-breathing-displacement fits to ${worstNonBreathing.toExponential(2)} (10 eps window, rtol 1e-12); cases above 1e-7: ${above1e7.join('; ')}`, { predictionDiffs: diffs, rows }));
}

log('\n=== C5 boundedness of the "two binaries" at x = 1.7, eps = 1e-3 (final recorded state of each prereg trajectory) ===');
{
  const rows = [];
  const files = ['WR-1-breathing', 'WR-2-warp', 'WR-3-tilt', 'WR-4a-translation', 'WR-4b-boost', 'WR-5-rotationPhase', 'WR-6-sublattice', 'WR-7a-elliptic', 'WR-7b-shear'];
  const q = [1, -1, 1, -1], matchings = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]];
  for (const stem of files) {
    const fp = join(TRAJ_DIR, `${stem}-x1.7-eps1e-3-prereg.trajectory.jsonl`);
    if (!existsSync(fp)) { log(`  ${stem}: trajectory file missing`); continue; }
    const txt = readFileSync(fp, 'utf8'), ls = txt.trim().split('\n'); let last = null;
    for (let i = ls.length - 1; i >= 0; i--) { const o = JSON.parse(ls[i]); if (o.type === 'state') { last = o; break; } }
    const X = [0, 1, 2, 3].map(j => last.x.slice(3 * j, 3 * j + 3)), V = [0, 1, 2, 3].map(j => last.v.slice(3 * j, 3 * j + 3));
    const sep = (i, j) => Math.hypot(X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]);
    let best = null; matchings.forEach(m => { const s = sep(...m[0]) + sep(...m[1]); if (!best || s < best.s) best = { m, s }; });
    const pairs = best.m.map(([i, j]) => { const inv = pairInvariant(X[i], V[i], X[j], V[j], Math.sign(q[i] * q[j])); return { pair: `${i}-${j}`, r: inv.r, rdot: inv.rdot, E_rel: inv.E, bound: inv.E < 0 }; });
    const c1 = [0, 1, 2].map(a => (X[best.m[0][0]][a] + X[best.m[0][1]][a]) / 2), c2 = [0, 1, 2].map(a => (X[best.m[1][0]][a] + X[best.m[1][1]][a]) / 2);
    const row = { stem, t: last.t, matching: best.m, centreDistance: Math.hypot(c1[0] - c2[0], c1[1] - c2[1], c1[2] - c2[2]), pairs };
    rows.push(row);
    log(`  ${stem} t=${last.t.toFixed(1)} matching ${JSON.stringify(best.m)} centres ${row.centreDistance.toFixed(1)} apart: ` + pairs.map(p => `${p.pair}: r=${p.r.toPrecision(4)} rdot=${p.rdot.toPrecision(3)} E_rel=${p.E_rel.toPrecision(4)} ${p.bound ? 'BOUND' : 'UNBOUND'}`).join(' | '));
  }
  record.checks.push(result('C5', rows.length === 9, `pair invariants evaluated on the final recorded state of nine prereg runs (the other pair is 100-900 units away, so each pair is isolated to one part in 1e4 of its own acceleration)`, { rows }));
}

writeFileSync(join(OUT_DIR, 'ring-adjudication-checks.log'), lines.join('\n') + '\n');
writeFileSync(join(OUT_DIR, 'ring-adjudication-checks.json'), JSON.stringify(record, null, 1) + '\n');
log(`\nrecord written to ${join(OUT_DIR, 'ring-adjudication-checks.{log,json}')}`);
