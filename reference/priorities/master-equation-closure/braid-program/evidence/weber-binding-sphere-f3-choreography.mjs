#!/usr/bin/env node
// weber-binding-sphere-f3-choreography.mjs — family F3, single-curve choreography stratum (PI addition).
// Ansatz: X_k(T) = X_0(T + k P/6), q_k = (-1)^k: all six members on one closed curve of period P with time shifts
// P/6 and alternating polarity.  A global polarity flip is an exact symmetry of the law (sigma_ij = q_i q_j), so
// the equations of member k at time T are those of member 0 at T - kP/6, and it suffices to enforce member 0's
// equation X_0'' = A_0 on a collocation set closed under the shift P/6.  Equal constant speed across members is
// automatic and reduces to |X_0'| = v on one curve; the planar hexagon is the trivial member.
// Representation: X_0(T) = sum_{m<=M} a_m cos(m w T) + b_m sin(m w T) per component, unknowns the coefficients and w.
// Gauge: b_{x,1} = 0 (time origin), a_{y,1} = 0 (rotation about z), a_{z,1} = b_{z,1} = 0 (tilts, which are the
// rotated hexagon).  Continuation parameter: one out-of-plane harmonic a_{z,m} = eps pinned (m = 2 or 3), so the
// planar family is excluded and a non-planar branch, if one exists, is found by least squares on the remaining
// unknowns.  Known case first: the planar hexagon has zero collocation residual.
// Usage: node weber-binding-sphere-f3-choreography.mjs
import fs from 'node:fs';
import path from 'node:path';
import {
  COEFF, HEX_Q, HERE, DATA_DIR, ensureDirs, params, utc, log, writeJson, v3, stateFrom, pathResidual, levenbergMarquardt, rng, monodromy, integrate,
  hexagonOmega, energyLike, sigmaSum,
} from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const RECEIPT = path.join(HERE, 'weber-binding-sphere-f3-choreography.json');
const Q = HEX_Q, P = params(Q, COEFF, 'none'), PX = params(Q, COEFF, 'exact');
const rec = { family: 'F3 single-curve choreography (Fourier collocation)', law: COEFF, polarities: Q, started: utc(), gauge: 'a_0 = 0 for all three components (sum X = 6 a_0 = 0 for M <= 5), b_x1 = 0, a_y1 = 0, a_z1 = b_z1 = 0', box: { harmonics: [3, 4, 6], pinnedHarmonic: [2, 3], epsilon: [0.01, 0.03, 0.1, 0.3], rho: [0.67265, 1, 3], randomSeeds: 20 } };

// coefficient layout: for component c in {0,1,2}: a[c][0..M], b[c][1..M]; parameters vector packs free ones only
function makeLayout(M, pins) {
  // pins: map 'a:c:m' or 'b:c:m' -> fixed value
  const keys = [];
  for (let c = 0; c < 3; c++) { for (let m = 0; m <= M; m++) keys.push(`a:${c}:${m}`); for (let m = 1; m <= M; m++) keys.push(`b:${c}:${m}`); }
  const free = keys.filter(k => !(k in pins));
  return { M, keys, free, pins };
}
function unpack(layout, p) {
  const { M } = layout, a = [[], [], []], b = [[], [], []]; let i = 0;
  for (const k of layout.keys) { const [t, c, m] = k.split(':'); const val = k in layout.pins ? layout.pins[k] : p[i++]; (t === 'a' ? a : b)[Number(c)][Number(m)] = val; }
  return { a, b, w: Math.abs(p[i]) };
}
function evalCurve({ a, b, w }, M, T) {
  const x = [0, 0, 0], v = [0, 0, 0], acc = [0, 0, 0];
  for (let c = 0; c < 3; c++) for (let m = 0; m <= M; m++) { const cs = Math.cos(m * w * T), sn = Math.sin(m * w * T), am = a[c][m] ?? 0, bm = m ? (b[c][m] ?? 0) : 0; x[c] += am * cs + bm * sn; v[c] += m * w * (-am * sn + bm * cs); acc[c] += -(m * w) * (m * w) * (am * cs + bm * sn); }
  return { x, v, acc };
}
function configuration(coef, M, T) {
  const Per = 2 * Math.PI / coef.w, xs = [], vs = [], as = [];
  for (let k = 0; k < 6; k++) { const e = evalCurve(coef, M, T + k * Per / 6); xs.push(e.x); vs.push(e.v); as.push(e.acc); }
  return { xs, vs, as, Per };
}
// collocation residual of member 0's equation on Nc points, normalised by w^2 R
function collocation(layout, p, Nc, R) {
  const coef = unpack(layout, p), M = layout.M, Per = 2 * Math.PI / coef.w, out = [];
  for (let j = 0; j < Nc; j++) {
    const T = j * Per / Nc, cfg = configuration(coef, M, T), y = stateFrom(cfg.xs, cfg.vs);
    let A; try { A = solveAccelerations(y, P).A; } catch { return new Array(3 * Nc).fill(1e3); }
    for (let c = 0; c < 3; c++) out.push((cfg.as[0][c] - A[c]) / (coef.w * coef.w * R));
  }
  return out;
}
function deviations(layout, p, R, n = 256) {
  const coef = unpack(layout, p), M = layout.M, Per = 2 * Math.PI / coef.w; let dR = 0, dv = 0, vMean = 0, zMax = 0; const speeds = [];
  for (let j = 0; j < n; j++) { const e = evalCurve(coef, M, j * Per / n); speeds.push(v3.norm(e.v)); dR = Math.max(dR, Math.abs(v3.norm(e.x) - R) / R); zMax = Math.max(zMax, Math.abs(e.x[2])); }
  vMean = speeds.reduce((s, z) => s + z, 0) / n; for (const s of speeds) dv = Math.max(dv, Math.abs(s - vMean) / vMean);
  return { sphereDeviation: dR, speedDeviation: dv, vMean, zMax, w: coef.w, period: Per };
}
// full-period residual with the curve's actual second derivative as the required acceleration (128 times, exact condition)
function fullPeriodResidual(layout, p, R, nT = 128) {
  const coef = unpack(layout, p), M = layout.M, Per = 2 * Math.PI / coef.w;
  return pathResidual({ q: Q, path: T => { const c = configuration(coef, M, T); return { x: c.xs, v: c.vs, areq: c.as }; }, Omega: coef.w, R, period: Per, nT, condition: 'exact' });
}
function hexagonParams(layout, rho) {
  const p = []; for (const k of layout.free) { const [t, c, m] = k.split(':'); p.push((t === 'a' && c === '0' && m === '1') || (t === 'b' && c === '1' && m === '1') ? rho : 0); } p.push(hexagonOmega(rho)); return p;
}
const ncFor = M => 6 * Math.ceil((4 * M + 2) / 6);

// ---------------------------------------------------------------- known case: the planar hexagon at three radii, M = 3
rec.knownCase = [];
for (const rho of [0.67265, 1, 3]) {
  const layout = makeLayout(3, { 'a:0:0': 0, 'a:1:0': 0, 'a:2:0': 0, 'b:0:1': 0, 'a:1:1': 0, 'a:2:1': 0, 'b:2:1': 0 }), p = hexagonParams(layout, rho), r = collocation(layout, p, ncFor(3), rho);
  const mx = Math.max(...r.map(Math.abs)), fr = fullPeriodResidual(layout, p, rho);
  rec.knownCase.push({ rho, collocationResidualMax: mx, fullPeriodResidual: fr.maxRel, pass: mx <= 1e-12 && fr.maxRel <= 1e-12 });
  log(`known case hexagon rho=${rho}: collocation residual ${mx.toExponential(2)}, full-period residual ${fr.maxRel.toExponential(2)} -> ${mx <= 1e-12 ? 'PASS' : 'FAIL'}`);
  // sensitivity: w off by 1 percent must leave a residual of order 1e-2
  const p2 = p.slice(); p2[p2.length - 1] *= 1.01; const r2 = Math.max(...collocation(layout, p2, ncFor(3), rho).map(Math.abs));
  rec.knownCase[rec.knownCase.length - 1].sensitivity1pc = r2;
}
if (!rec.knownCase.every(k => k.pass)) { log('known case failed; stopping'); writeJson(RECEIPT, rec); process.exit(1); }

// ---------------------------------------------------------------- continuation in a pinned out-of-plane harmonic
rec.continuation = []; const t0 = Date.now();
for (const rho of rec.box.rho) for (const M of [3, 4]) for (const m of rec.box.pinnedHarmonic) for (const eps of rec.box.epsilon) {
  const pins = { 'a:0:0': 0, 'a:1:0': 0, 'a:2:0': 0, 'b:0:1': 0, 'a:1:1': 0, 'a:2:1': 0, 'b:2:1': 0 }; pins[`a:2:${m}`] = eps * rho;
  const layout = makeLayout(M, pins), Nc = ncFor(M), p0 = hexagonParams(layout, rho);
  const lm = levenbergMarquardt(p => collocation(layout, p, Nc, rho), p0, { maxIter: 200, fdStep: 1e-7, tolStep: 1e-15 });
  const dev = deviations(layout, lm.p, rho), fr = lm.rmax <= 1e-6 ? fullPeriodResidual(layout, lm.p, rho) : null;
  const row = { rho, M, pinnedHarmonic: m, epsilon: eps, collocationPoints: Nc, residualMax: lm.rmax, cost: lm.cost, iter: lm.iter, reason: lm.reason, wOverOmegaHexagon: dev.w / hexagonOmega(rho), sphereDeviation: dev.sphereDeviation, speedDeviation: dev.speedDeviation, zMaxOverRho: dev.zMax / rho, fullPeriodResidual: fr ? fr.maxRel : null, p: lm.p };
  rec.continuation.push(row);
  log(`continuation rho=${rho} M=${M} pin a_z${m}=${eps}rho: residual ${lm.rmax.toExponential(3)} (${lm.iter} it, ${lm.reason}), w/Omega ${row.wOverOmegaHexagon.toFixed(5)}, sphere dev ${dev.sphereDeviation.toExponential(2)}, speed dev ${dev.speedDeviation.toExponential(2)}, wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
// scaling of the floor with epsilon per (rho, M, m)
rec.floorScaling = [];
for (const rho of rec.box.rho) for (const M of [3, 4]) for (const m of rec.box.pinnedHarmonic) { const rows = rec.continuation.filter(r => r.rho === rho && r.M === M && r.pinnedHarmonic === m).sort((a, b) => a.epsilon - b.epsilon); const ex = []; for (let i = 1; i < rows.length; i++) ex.push(Math.log(rows[i].residualMax / rows[i - 1].residualMax) / Math.log(rows[i].epsilon / rows[i - 1].epsilon)); rec.floorScaling.push({ rho, M, pinnedHarmonic: m, residuals: rows.map(r => r.residualMax), exponents: ex }); }

// ---------------------------------------------------------------- unpinned solve from non-planar perturbations of the hexagon: where does least squares go?
rec.unpinned = []; const rand = rng(31);
for (const rho of [1, 3]) for (let s = 0; s < 6; s++) {
  const M = 3, layout = makeLayout(M, { 'a:0:0': 0, 'a:1:0': 0, 'a:2:0': 0, 'b:0:1': 0, 'a:1:1': 0, 'a:2:1': 0, 'b:2:1': 0 }), p0 = hexagonParams(layout, rho).map((z, i) => i < layout.free.length ? z + 0.1 * rho * (2 * rand() - 1) : z * (1 + 0.05 * (2 * rand() - 1)));
  const lm = levenbergMarquardt(p => collocation(layout, p, ncFor(M), rho), p0, { maxIter: 300, fdStep: 1e-7 });
  const dev = deviations(layout, lm.p, rho);
  rec.unpinned.push({ rho, seed: s, residualMax: lm.rmax, iter: lm.iter, reason: lm.reason, zMaxOverRho: dev.zMax / rho, sphereDeviation: dev.sphereDeviation, speedDeviation: dev.speedDeviation, wOverOmegaHexagon: dev.w / hexagonOmega(rho), vMean: dev.vMean });
  log(`unpinned seed ${s} rho=${rho}: residual ${lm.rmax.toExponential(3)}, z max/rho ${(dev.zMax / rho).toExponential(2)}, sphere dev ${dev.sphereDeviation.toExponential(2)}, speed dev ${dev.speedDeviation.toExponential(2)}, w/Omega ${(dev.w / hexagonOmega(rho)).toFixed(5)}`);
}

// ---------------------------------------------------------------- random non-planar seeds with the pin (M = 4), rho = 1
rec.randomSeeds = [];
for (let s = 0; s < rec.box.randomSeeds; s++) {
  const rho = 1, M = 4, m = s % 2 ? 3 : 2, eps = [0.03, 0.1, 0.3][s % 3], pins = { 'a:0:0': 0, 'a:1:0': 0, 'a:2:0': 0, 'b:0:1': 0, 'a:1:1': 0, 'a:2:1': 0, 'b:2:1': 0 }; pins[`a:2:${m}`] = eps * rho;
  const layout = makeLayout(M, pins), p0 = hexagonParams(layout, rho).map((z, i) => i < layout.free.length ? z + 0.3 * rho * (2 * rand() - 1) : z * (0.7 + 0.6 * rand()));
  const lm = levenbergMarquardt(p => collocation(layout, p, ncFor(M), rho), p0, { maxIter: 200, fdStep: 1e-7 });
  const dev = deviations(layout, lm.p, rho);
  rec.randomSeeds.push({ seed: s, pinnedHarmonic: m, epsilon: eps, residualMax: lm.rmax, iter: lm.iter, reason: lm.reason, sphereDeviation: dev.sphereDeviation, speedDeviation: dev.speedDeviation, zMaxOverRho: dev.zMax / rho, wOverOmegaHexagon: dev.w / hexagonOmega(rho), p: lm.rmax <= 1e-6 ? lm.p : undefined });
  log(`random seed ${s} (pin a_z${m}=${eps}): residual ${lm.rmax.toExponential(3)} (${lm.reason}), sphere dev ${dev.sphereDeviation.toExponential(2)}, speed dev ${dev.speedDeviation.toExponential(2)}`);
}

// ---------------------------------------------------------------- candidate pipeline for any non-planar solution with residual <= 1e-8
rec.candidates = [];
for (const row of [...rec.continuation, ...rec.randomSeeds].filter(r => r.residualMax <= 1e-8 && r.p)) {
  const M = row.M ?? 4, pins = { 'a:0:0': 0, 'a:1:0': 0, 'a:2:0': 0, 'b:0:1': 0, 'a:1:1': 0, 'a:2:1': 0, 'b:2:1': 0 }; pins[`a:2:${row.pinnedHarmonic}`] = row.epsilon * (row.rho ?? 1);
  const layout = makeLayout(M, pins), rho = row.rho ?? 1, coef = unpack(layout, row.p), fr = fullPeriodResidual(layout, row.p, rho), cfg = configuration(coef, M, 0), y0 = stateFrom(cfg.xs, cfg.vs);
  const cand = { from: row, fullPeriodResidual128: fr.maxRel, radialRel: fr.radialRel, tangentialRel: fr.tangentialRel, sigmaSumSpread: fr.sigmaSumSpread, HPlus3v2: fr.HPlus3v2 };
  try { const mon = monodromy(y0, cfg.Per, P, { step: 1e-5 }); cand.monodromy = { maxModulus: mon.maxModulus, multipliers: mon.multipliers.slice(0, 12), jacobianErrorEstimate: mon.jacobianErrorEstimate }; } catch (e) { cand.monodromy = { error: e.message }; }
  cand.perturbed = [];
  for (const eps of [1e-6, 1e-3]) for (const rtol of [1e-12, 1e-10]) { const yp = Float64Array.from(y0); const r2 = rng(7 + Math.round(eps * 1e6)); for (let k = 0; k < 18; k++) yp[k] += eps * rho * (2 * r2() - 1); const ev = integrate(yp, 10 * cfg.Per, P, { method: 'gbs', rtol, atol: rtol * 1e-2, hmax: cfg.Per / 100 }); cand.perturbed.push({ eps, rtol, reason: ev.reason, t: ev.t, periods: ev.t / cfg.Per, minSep: ev.minSep, minAbsDet: ev.minAbsDet, maxSpeed: ev.maxSpeed }); }
  rec.candidates.push(cand);
  log(`candidate: full-period residual ${fr.maxRel.toExponential(3)}, monodromy max modulus ${cand.monodromy.maxModulus ?? '—'}`);
}
rec.summary = { continuationFloor: Math.min(...rec.continuation.map(r => r.residualMax)), randomSeedFloor: Math.min(...rec.randomSeeds.map(r => r.residualMax)), unpinnedMaxZ: Math.max(...rec.unpinned.map(r => r.zMaxOverRho)), candidates: rec.candidates.length };
rec.finished = utc(); rec.wallSeconds = (Date.now() - t0) / 1000;
writeJson(RECEIPT, rec);
log(`choreography receipt written: ${path.relative(REPO_ROOT, RECEIPT)}; continuation floor ${rec.summary.continuationFloor.toExponential(3)}, random-seed floor ${rec.summary.randomSeedFloor.toExponential(3)}, candidates ${rec.candidates.length}`);
