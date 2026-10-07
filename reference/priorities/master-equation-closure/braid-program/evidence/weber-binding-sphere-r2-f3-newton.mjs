#!/usr/bin/env node
// weber-binding-sphere-r2-f3-newton.mjs — round 2: F3 reach repair.
// Part A: a periodic-orbit Newton (multiple shooting, m segments, period unknown): zeros of
//   F(y_0..y_{m-1}, P) = [ Phi_{P/m}(y_j) - y_{j+1 mod m} ; sum X(y_0) ; sum V(y_0) ; phase ; rotation ]
// by Levenberg-Marquardt with a segment-sparse central-difference Jacobian; segment flows by GBS at rtol 1e-13.
// Part B: a staged least-squares shooting (LM on the discretised sphere/speed residual over windows P/8 -> P) in the
// strata unconstrained (16 parameters), C3 (4), C2 (8) and D3 (2 + discrete), with the reach known case required
// first: from the hexagon perturbed by 20 % in position and 0.5 rad in tangent direction, the instrument must recover
// the hexagon.  Known cases are recorded before any target seed.  Heartbeat per seed.
// Usage: node weber-binding-sphere-r2-f3-newton.mjs [--starts N]
import fs from 'node:fs';
import path from 'node:path';
import {
  COEFF, HEX_Q, HERE, DATA_DIR, ensureDirs, params, utc, log, writeJson, v3, stateFrom, getX, getV, minSeparation, integrate, shootingObjective,
  hexagon, hexagonOmega, rigidState, rng, randomUnit, levenbergMarquardt, monodromy, energyLike, jetConditions,
} from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, derivative, makeStepper, SingularSystemError, eigenvalues } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const arg = (n, d) => { const i = process.argv.indexOf(n); return i > 0 ? process.argv[i + 1] : d; };
const NSTARTS = Number(arg('--starts', 10)), PART = arg('--part', 'all');
const RECEIPT = PART.startsWith('r4') ? path.join(HERE, `weber-binding-sphere-r4-${PART.slice(2)}${arg('--tag', '')}.json`) : PART.startsWith('r3') ? path.join(HERE, `weber-binding-sphere-r3-${PART.slice(2)}${arg('--tag', '')}.json`) : path.join(HERE, `weber-binding-sphere-r2-f3-${PART === 'shooting' ? 'shooting' : PART === 'polish' ? 'reach-polish' : PART === 'kn2' ? 'reach-kn2' : 'newton'}${arg('--flow', 'gbs') === 'rk4' ? '-rk4' : ''}${arg('--tag', '')}.json`);
const Q = HEX_Q, P = params(Q, COEFF, 'none'), R = Number(arg('--R', 1)), rhoH = R, OmH = hexagonOmega(rhoH), PH = 2 * Math.PI / OmH; // round 4: R from the command line (default 1); the hexagon reach cases use the hexagon at radius R
const rec = { subject: 'F3 reach repair: periodic-orbit Newton (multiple shooting) and staged least-squares shooting in symmetry strata', law: COEFF, R, started: utc(), settings: { reanchorPhaseConditions: true, flowMethod: arg('--flow', 'gbs'), rk4StepsPerUnitTime: Number(arg('--rk4-steps', 600)), segments: 8, jacobianFlowRtol: 1e-13, fdStepNewton: 1e-5, nodeInitialisation: 'rigid rotation of the seed about its total-moment axis sum X x V by 2 pi j / m', flowRtol: 1e-13, fdStep: 1e-6, lmIter: 15, shootingStages: [1 / 64, 1 / 32, 1 / 16, 1 / 8, 1 / 4, 1 / 2, 1], shootingSamples: 256 } };
const t0 = Date.now();

// ---------------------------------------------------------------- Part A: periodic-orbit Newton
// flow: GBS (adaptive; the discrete map is then not smooth in y at the 1e-8 level because step selection is discrete) or
// fixed-step RK4 with RK4_STEPS_PER_UNIT_TIME steps per unit time (smooth discrete map; its periodic orbit is within the
// RK4 global error of the true one, which the final GBS characterisation measures)
const FLOW_METHOD = arg('--flow', 'gbs'), RK4_STEPS_PER_UNIT_TIME = Number(arg('--rk4-steps', 600));
function flow(y, tau, rtol = 1e-13) { const r = FLOW_METHOD === 'rk4' ? integrate(y, tau, P, { method: 'rk4', h: tau / Math.max(8, Math.ceil(RK4_STEPS_PER_UNIT_TIME * tau)), minSep: 1e-6 }) : integrate(y, tau, P, { method: 'gbs', rtol, atol: rtol * 1e-2, hmax: tau / 8, minSep: 1e-6 }); if (r.reason !== 'final-time') throw new Error('flow:' + r.reason); return r.y; }
function sums(y) { const sx = [0, 0, 0], sv = [0, 0, 0]; for (let i = 0; i < 6; i++) { const X = getX(y, i), V = getV(y, 6, i); for (let a = 0; a < 3; a++) { sx[a] += X[a]; sv[a] += V[a]; } } return [...sx, ...sv]; }
function rotGen(y) { const g = new Float64Array(36); for (let i = 0; i < 6; i++) { g[3 * i] = -y[3 * i + 1]; g[3 * i + 1] = y[3 * i]; g[18 + 3 * i] = -y[18 + 3 * i + 1]; g[18 + 3 * i + 1] = y[18 + 3 * i]; } return g; }
function newtonResidual(Y, Pp, m, ref) {
  const out = [];
  for (let j = 0; j < m; j++) { const yn = flow(Y[j], Pp / m), yk = Y[(j + 1) % m]; for (let k = 0; k < 36; k++) out.push(yn[k] - yk[k]); }
  out.push(...sums(Y[0]));
  let ph = 0, rt = 0; for (let k = 0; k < 36; k++) { ph += (Y[0][k] - ref.y[k]) * ref.f[k]; rt += (Y[0][k] - ref.y[k]) * ref.g[k]; }
  out.push(ph, rt);
  return out;
}
function periodicNewton(seedY, seedP, opt = {}) {
  const m = opt.segments ?? 8, maxIter = opt.maxIter ?? 25, h = opt.fdStep ?? 1e-5, jr = opt.jacobianRtol ?? 1e-13;
  // initial nodes by flowing the seed
  // nodes by rigid rotation of the seed about its total-moment axis sum X x V (z if that vanishes): a tilted rigid rotation is then represented exactly
  let Lax = [0, 0, 0]; for (let i = 0; i < 6; i++) { const cx = v3.cross(getX(seedY, i), getV(seedY, 6, i)); Lax = v3.add(Lax, cx); }
  const axis = v3.norm(Lax) > 1e-9 ? v3.unit(Lax) : [0, 0, 1];
  const rotState = (y, a) => { const c = Math.cos(a), sn = Math.sin(a), out = Float64Array.from(y); for (let i = 0; i < 12; i++) { const vv = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], kv = v3.cross(axis, vv), kd = v3.dot(axis, vv); for (let q = 0; q < 3; q++) out[3 * i + q] = vv[q] * c + kv[q] * sn + axis[q] * kd * (1 - c); } return out; };
  let Y = []; for (let j = 0; j < m; j++) Y.push(opt.initByFlow ? (j === 0 ? Float64Array.from(seedY) : flow(Y[j - 1], seedP / m)) : rotState(seedY, 2 * Math.PI * j / m * (opt.sense ?? 1)));
  let Pp = seedP;
  const ref = { y: Float64Array.from(seedY), f: derivative(seedY, P).dy, g: rotGen(seedY) };
  const nU = 36 * m + 1;
  let F = newtonResidual(Y, Pp, m, ref), cost = F.reduce((s, z) => s + z * z, 0), lam = 1e-3, iter = 0, history = [{ iter: 0, rmax: Math.max(...F.map(Math.abs)), P: Pp }];
  for (iter = 1; iter <= maxIter; iter++) {
    if (Math.max(...F.map(Math.abs)) <= (opt.tol ?? 1e-12)) break;
    // sparse Jacobian: rows for segment j depend on Y[j] (flow derivative), Y[j+1] (-I), P (1/m of the vector field at the end)
    const nR = F.length, J = Array.from({ length: nR }, () => new Float64Array(nU));
    for (let j = 0; j < m; j++) {
      const base = flow(Y[j], Pp / m, jr);
      for (let k = 0; k < 36; k++) { const hh = h * Math.max(1, Math.abs(Y[j][k])), yp = Float64Array.from(Y[j]), ym = Float64Array.from(Y[j]); yp[k] += hh; ym[k] -= hh; let fp = null, fm = null; try { fp = flow(yp, Pp / m, jr); } catch {} try { fm = flow(ym, Pp / m, jr); } catch {} for (let i = 0; i < 36; i++) J[36 * j + i][36 * j + k] = fp && fm ? (fp[i] - fm[i]) / (2 * hh) : fp ? (fp[i] - base[i]) / hh : fm ? (base[i] - fm[i]) / hh : 0; }
      for (let i = 0; i < 36; i++) J[36 * j + i][36 * ((j + 1) % m) + i] -= 1;
      const hp = 1e-6 * Pp; let fp = null, fm = null; try { fp = flow(Y[j], (Pp + hp) / m, jr); } catch {} try { fm = flow(Y[j], (Pp - hp) / m, jr); } catch {} for (let i = 0; i < 36; i++) J[36 * j + i][36 * m] = fp && fm ? (fp[i] - fm[i]) / (2 * hp) : 0;
    }
    for (let a = 0; a < 6; a++) for (let i = 0; i < 6; i++) J[36 * m + a][(a < 3 ? 3 * i + a : 18 + 3 * i + a - 3)] = 1;
    for (let k = 0; k < 36; k++) { J[36 * m + 6][k] = ref.f[k]; J[36 * m + 7][k] = ref.g[k]; }
    const JtJ = new Float64Array(nU * nU), Jtr = new Float64Array(nU);
    for (let i = 0; i < nR; i++) { const row = J[i]; for (let a = 0; a < nU; a++) { const ra = row[a]; if (ra === 0) continue; Jtr[a] -= ra * F[i]; for (let b = 0; b < nU; b++) JtJ[a * nU + b] += ra * row[b]; } }
    let dmax = 0; for (let a = 0; a < nU; a++) dmax = Math.max(dmax, JtJ[a * nU + a]);
    let accepted = false;
    while (lam <= 1e12) {
      const Aug = Float64Array.from(JtJ); for (let a = 0; a < nU; a++) Aug[a * nU + a] += lam * (JtJ[a * nU + a] + 1e-12 * dmax + 1e-300);
      let delta; try { delta = solveDense(Aug, Jtr, nU); } catch { lam *= 10; continue; }
      const Yn = Y.map((y, j) => Float64Array.from(y, (z, k) => z + delta[36 * j + k])), Pn = Pp + delta[36 * m];
      let Fn; try { if (!(Pn > 0.1 * seedP)) throw new Error('period'); Fn = newtonResidual(Yn, Pn, m, ref); } catch { lam *= 10; continue; }
      const cn = Fn.reduce((s, z) => s + z * z, 0);
      if (cn < cost) { Y = Yn; Pp = Pn; F = Fn; cost = cn; lam = Math.max(lam / 10, 1e-15); accepted = true; break; }
      lam *= 10;
    }
    history.push({ iter, rmax: Math.max(...F.map(Math.abs)), P: Pp, lambda: lam });
    // re-anchor the phase and rotation conditions at the current iterate (default): anchoring them at a far seed makes
    // the family direction nearly singular and the iteration crawls (KN2 stall at 4e-8, 01:59Z; re-anchored run converged in 6 iterations)
    if (opt.reanchor !== false && accepted) { ref.y = Float64Array.from(Y[0]); ref.f = derivative(Y[0], P).dy; ref.g = rotGen(Y[0]); F = newtonResidual(Y, Pp, m, ref); cost = F.reduce((s, z) => s + z * z, 0); }
    if (opt.verbose !== false) log(`    newton iter ${iter}: residual ${Math.max(...F.map(Math.abs)).toExponential(2)}, P ${Pp.toFixed(5)}, lambda ${lam.toExponential(0)}, accepted ${accepted}`);
    if (!accepted) break;
  }
  const rmax = Math.max(...F.map(Math.abs));
  const seg = []; for (let j = 0; j < m; j++) seg.push(Math.max(...F.slice(36 * j, 36 * j + 36).map(Math.abs)));
  const breakdown = { segments: seg, sumX: F.slice(36 * m, 36 * m + 3), sumV: F.slice(36 * m + 3, 36 * m + 6), phase: F[36 * m + 6], rotation: F[36 * m + 7] };
  return { y: Y[0], nodes: Y.map(v => Array.from(v)), period: Pp, rmax, iter, converged: rmax <= (opt.tol ?? 1e-12) * 100, history, breakdown };
}
// Round 3: periodic-orbit Newton with the continuous symmetries handled explicitly.  Unknowns: the m nodes only (P fixed).
// Equations: matching; sum X = sum V = 0 (translations and boosts); one Poincare phase condition (correction of y_0
// orthogonal to the flow direction at the seed); three rotation phase conditions (correction orthogonal to the three
// infinitesimal rotation directions of the seed).  The radius direction of the hexagon family is selected by P.
function rotGenAxis(y, axis) { const g = new Float64Array(36); for (let i = 0; i < 12; i++) { const v = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], c = v3.cross(axis, v); g[3 * i] = c[0]; g[3 * i + 1] = c[1]; g[3 * i + 2] = c[2]; } return g; }
function periodicNewtonSym(seedY, Pfixed, opt = {}) {
  const m = opt.segments ?? 8, maxIter = opt.maxIter ?? 30, h = opt.fdStep ?? 1e-5, jr = opt.jacobianRtol ?? 1e-13, Pp = Pfixed;
  let Lax = [0, 0, 0]; for (let i = 0; i < 6; i++) Lax = v3.add(Lax, v3.cross(getX(seedY, i), getV(seedY, 6, i)));
  const axis = v3.norm(Lax) > 1e-9 ? v3.unit(Lax) : [0, 0, 1];
  const rotState = (y, a) => { const c = Math.cos(a), sn = Math.sin(a), out = Float64Array.from(y); for (let i = 0; i < 12; i++) { const vv = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], kv = v3.cross(axis, vv), kd = v3.dot(axis, vv); for (let q = 0; q < 3; q++) out[3 * i + q] = vv[q] * c + kv[q] * sn + axis[q] * kd * (1 - c); } return out; };
  let Y = []; for (let j = 0; j < m; j++) Y.push(rotState(seedY, 2 * Math.PI * j / m));
  const ref = { y: Float64Array.from(seedY), f: derivative(seedY, P).dy, g: [rotGenAxis(seedY, [1, 0, 0]), rotGenAxis(seedY, [0, 1, 0]), rotGenAxis(seedY, [0, 0, 1])] };
  const resid = Yv => { const out = []; for (let j = 0; j < m; j++) { const yn = flow(Yv[j], Pp / m), yk = Yv[(j + 1) % m]; for (let k = 0; k < 36; k++) out.push(yn[k] - yk[k]); } out.push(...sums(Yv[0])); let ph = 0; const rs = [0, 0, 0]; for (let k = 0; k < 36; k++) { const d = Yv[0][k] - ref.y[k]; ph += d * ref.f[k]; for (let a = 0; a < 3; a++) rs[a] += d * ref.g[a][k]; } out.push(ph, ...rs); return out; };
  const nU = 36 * m;
  let Fv = resid(Y), cost = Fv.reduce((s, z) => s + z * z, 0), lam = 1e-3, iter = 0, history = [{ iter: 0, rmax: Math.max(...Fv.map(Math.abs)) }], accepted = true;
  for (iter = 1; iter <= maxIter; iter++) {
    if (Math.max(...Fv.map(Math.abs)) <= (opt.tol ?? 1e-12)) break;
    const nR = Fv.length, J = Array.from({ length: nR }, () => new Float64Array(nU));
    for (let j = 0; j < m; j++) {
      const base = flow(Y[j], Pp / m, jr);
      for (let k = 0; k < 36; k++) { const hh = h * Math.max(1, Math.abs(Y[j][k])), yp = Float64Array.from(Y[j]), ym = Float64Array.from(Y[j]); yp[k] += hh; ym[k] -= hh; let fp = null, fm = null; try { fp = flow(yp, Pp / m, jr); } catch {} try { fm = flow(ym, Pp / m, jr); } catch {} for (let i = 0; i < 36; i++) J[36 * j + i][36 * j + k] = fp && fm ? (fp[i] - fm[i]) / (2 * hh) : fp ? (fp[i] - base[i]) / hh : fm ? (base[i] - fm[i]) / hh : 0; }
      for (let i = 0; i < 36; i++) J[36 * j + i][36 * ((j + 1) % m) + i] -= 1;
    }
    for (let a = 0; a < 6; a++) for (let i = 0; i < 6; i++) J[36 * m + a][(a < 3 ? 3 * i + a : 18 + 3 * i + a - 3)] = 1;
    for (let k = 0; k < 36; k++) { J[36 * m + 6][k] = ref.f[k]; for (let a = 0; a < 3; a++) J[36 * m + 7 + a][k] = ref.g[a][k]; }
    const JtJ = new Float64Array(nU * nU), Jtr = new Float64Array(nU);
    for (let i = 0; i < nR; i++) { const row = J[i]; for (let a = 0; a < nU; a++) { const ra = row[a]; if (ra === 0) continue; Jtr[a] -= ra * Fv[i]; for (let b = 0; b < nU; b++) JtJ[a * nU + b] += ra * row[b]; } }
    let dmax = 0; for (let a = 0; a < nU; a++) dmax = Math.max(dmax, JtJ[a * nU + a]);
    accepted = false;
    while (lam <= 1e12) {
      const Aug = Float64Array.from(JtJ); for (let a = 0; a < nU; a++) Aug[a * nU + a] += lam * (JtJ[a * nU + a] + 1e-12 * dmax + 1e-300);
      let delta; try { delta = solveDense(Aug, Jtr, nU); } catch { lam *= 10; continue; }
      const Yn = Y.map((y, j) => Float64Array.from(y, (z, k) => z + delta[36 * j + k]));
      let Fn; try { Fn = resid(Yn); } catch { lam *= 10; continue; }
      const cn = Fn.reduce((s, z) => s + z * z, 0);
      if (cn < cost) { Y = Yn; Fv = Fn; cost = cn; lam = Math.max(lam / 10, 1e-15); accepted = true; break; }
      lam *= 10;
    }
    history.push({ iter, rmax: Math.max(...Fv.map(Math.abs)), lambda: lam });
    if (opt.verbose !== false) log(`    newtonSym iter ${iter}: residual ${Math.max(...Fv.map(Math.abs)).toExponential(2)}, lambda ${lam.toExponential(0)}, accepted ${accepted}`);
    if (!accepted) break;
  }
  const rmax = Math.max(...Fv.map(Math.abs)), seg = []; for (let j = 0; j < m; j++) seg.push(Math.max(...Fv.slice(36 * j, 36 * j + 36).map(Math.abs)));
  return { y: Y[0], period: Pp, rmax, iter, converged: rmax <= (opt.tol ?? 1e-12) * 100, history, breakdown: { segments: seg, sums: Fv.slice(36 * m, 36 * m + 6), phase: Fv[36 * m + 6], rotations: Fv.slice(36 * m + 7) } };
}
// Monodromy as the product of the m segment-flow Jacobians (central differences over P/m, where the instability
// amplifies a 1e-5 perturbation by only e^{2.46 P/m} ~ 10); a finite-difference flow map over the full period is not
// usable for an orbit whose largest multiplier is ~1e8 (the perturbed flows collapse before returning).
function monodromySegments(Yseed, Pp, opt = {}) {
  const m = opt.segments ?? 8, h = opt.fdStep ?? 1e-5, jr = opt.jacobianRtol ?? 1e-13;
  // nodes along the converged orbit by flowing the first node
  const Y = [Float64Array.from(Yseed)]; for (let j = 1; j < m; j++) Y.push(flow(Y[j - 1], Pp / m, jr));
  let M = null;
  for (let j = 0; j < m; j++) {
    const Jj = Array.from({ length: 36 }, () => new Float64Array(36));
    for (let k = 0; k < 36; k++) { const hh = h * Math.max(1, Math.abs(Y[j][k])), yp = Float64Array.from(Y[j]), ym = Float64Array.from(Y[j]); yp[k] += hh; ym[k] -= hh; const fp = flow(yp, Pp / m, jr), fm = flow(ym, Pp / m, jr); for (let i = 0; i < 36; i++) Jj[i][k] = (fp[i] - fm[i]) / (2 * hh); }
    if (!M) M = Jj; else { const Mn = Array.from({ length: 36 }, () => new Float64Array(36)); for (let i = 0; i < 36; i++) for (let k = 0; k < 36; k++) { let acc = 0; for (let l = 0; l < 36; l++) acc += Jj[i][l] * M[l][k]; Mn[i][k] = acc; } M = Mn; }
  }
  const mult = eigenvalues(M.map(r => Array.from(r))).map(z => ({ ...z, abs: Math.hypot(z.re, z.im) })).sort((a, b) => b.abs - a.abs);
  const unit = mult.filter(z => Math.abs(z.abs - 1) < 1e-3).length;
  return { multipliers: mult, maxModulus: mult[0].abs, unitCount: unit, segments: m };
}
function solveDense(A, b, n) { const M = Float64Array.from(A), x = Float64Array.from(b); for (let k = 0; k < n; k++) { let p = k, big = Math.abs(M[k * n + k]); for (let i = k + 1; i < n; i++) { const v = Math.abs(M[i * n + k]); if (v > big) { big = v; p = i; } } if (!(big > 0)) throw new Error('singular'); if (p !== k) { for (let j = 0; j < n; j++) { const t = M[k * n + j]; M[k * n + j] = M[p * n + j]; M[p * n + j] = t; } const t = x[k]; x[k] = x[p]; x[p] = t; } for (let i = k + 1; i < n; i++) { const f = M[i * n + k] / M[k * n + k]; if (f === 0) continue; for (let j = k; j < n; j++) M[i * n + j] -= f * M[k * n + j]; x[i] -= f * x[k]; } } for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let j = i + 1; j < n; j++) s -= M[i * n + j] * x[j]; x[i] = s / M[i * n + i]; } return x; }
// characterise a periodic orbit: sphere and speed deviations over one period, planarity, radii
function characterise(y0, Pp) {
  let dR = 0, zMax = 0, radii = [], speeds = [], minSep = Infinity; const samples = [];
  integrate(y0, Pp, P, { method: 'gbs', rtol: 1e-12, atol: 1e-14, hmax: Pp / 64, onSample: (t, y) => { for (let i = 0; i < 6; i++) { const r = v3.norm(getX(y, i)), s = v3.norm(getV(y, 6, i)); radii.push(r); speeds.push(s); zMax = Math.max(zMax, Math.abs(y[3 * i + 2])); } minSep = Math.min(minSep, minSeparation(y, 6)); } });
  const rMean = radii.reduce((a, b) => a + b, 0) / radii.length, sMean = speeds.reduce((a, b) => a + b, 0) / speeds.length;
  const sphereDev = Math.max(...radii.map(r => Math.abs(r - rMean) / rMean)), speedDev = Math.max(...speeds.map(s => Math.abs(s - sMean) / sMean));
  return { rMean, sMean, sphereDeviation: sphereDev, speedDeviation: speedDev, zMax, minSep, HPlus3v2: energyLike(y0, P) + 3 * sMean * sMean, isHexagonLike: sphereDev < 1e-8 && speedDev < 1e-8 && zMax < 1e-8 };
}

// ---------------------------------------------------------------- Part B: staged least-squares shooting in strata
const clampV = u => Math.min(3, Math.max(0.05, Math.abs(u)));
function sph(th, ph) { return [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)]; }
function tangent(th, ph, psi) { const et = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)], ep = [-Math.sin(ph), Math.cos(ph), 0]; return v3.add(v3.scale(et, Math.cos(psi)), v3.scale(ep, Math.sin(psi))); }
function rotz(a, x) { const c = Math.cos(a), s = Math.sin(a); return [c * x[0] - s * x[1], s * x[0] + c * x[1], x[2]]; }
const STRATA = {
  free: { n: 16, build: p => { const v = clampV(p[15]), xs = [], vs = []; for (let i = 0; i < 5; i++) { xs.push(v3.scale(sph(p[3 * i], p[3 * i + 1]), R)); vs.push(v3.scale(tangent(p[3 * i], p[3 * i + 1], p[3 * i + 2]), v)); } let sx = [0, 0, 0], sv = [0, 0, 0]; for (let i = 0; i < 5; i++) { sx = v3.add(sx, xs[i]); sv = v3.add(sv, vs[i]); } xs.push(v3.scale(sx, -1)); vs.push(v3.scale(sv, -1)); return { y: stateFrom(xs, vs), v }; } },
  c3: { n: 4, build: (p, b = 0) => { const [thp, psip, phm, vr] = p, v = clampV(vr), psim = b === 0 ? Math.PI - psip : Math.PI + psip, thm = Math.PI - thp; const Xp = v3.scale(sph(thp, 0), R), Vp = v3.scale(tangent(thp, 0, psip), v), Xm = v3.scale(sph(thm, phm), R), Vm = v3.scale(tangent(thm, phm, psim), v); const xs = [], vs = []; for (let k = 0; k < 3; k++) { const a = 2 * Math.PI * k / 3; xs.push(rotz(a, Xp), rotz(a, Xm)); vs.push(rotz(a, Vp), rotz(a, Vm)); } return { y: stateFrom(xs, vs), v }; } },
  // C2: rotation by pi about z with the shift k -> k+3 and the polarity flip; members 0,1,2 free except z_2 and psi_2 fixed by the zero sums
  c2: { n: 8, build: (p, b = 0) => { const v = clampV(p[7]); const th0 = p[0], ph0 = p[1], ps0 = p[2], th1 = p[3], ph1 = p[4], ps1 = p[5], ph2 = p[6]; const z2 = -(Math.cos(th0) + Math.cos(th1)); const th2 = Math.acos(Math.max(-1, Math.min(1, z2))); const vz = -(Math.cos(ps0) * -Math.sin(th0) + Math.cos(ps1) * -Math.sin(th1)); const c2 = Math.max(-1, Math.min(1, vz / (-Math.sin(th2) || 1e-12))); const ps2 = b === 0 ? Math.acos(c2) : -Math.acos(c2); const gens = [[th0, ph0, ps0], [th1, ph1, ps1], [th2, ph2, ps2]], xs = [], vs = []; for (const [th, ph, ps] of gens) { xs.push(v3.scale(sph(th, ph), R)); vs.push(v3.scale(tangent(th, ph, ps), v)); } for (let k = 0; k < 3; k++) { xs.push(rotz(Math.PI, xs[k])); vs.push(rotz(Math.PI, vs[k])); } const order = [0, 3, 1, 4, 2, 5]; return { y: stateFrom(order.map(i => xs[i]), order.map(i => vs[i])), v }; } },
  // D3: C3 plus the reversing reflection y -> -y: theta+ and v free, phi- in {60, 180, 300} deg, psi+ = +-pi/2 (azimuthal), psi- = -+pi/2
  d3: { n: 2, build: (p, b = 0) => { const thp = p[0], v = clampV(p[1]), phm = [Math.PI / 3, Math.PI, 5 * Math.PI / 3][b % 3], sgn = b < 3 ? 1 : -1; return STRATA.c3.build([thp, sgn * Math.PI / 2, phm, v], 0); } },
};
function stagedShooting(stratum, p0, branch, Tw, opt = {}) {
  const S = STRATA[stratum], stages = opt.stages ?? rec.settings.shootingStages;
  let p = Float64Array.from(p0), hist = [];
  for (const frac of stages) {
    const fun = pp => { const st = S.build(pp, branch); const o = shootingObjective(st.y, { v: st.v, R, Tw: frac * Tw, P, nSteps: Math.max(32, Math.round(rec.settings.shootingSamples * frac)), method: 'rk4' }); return o.failed ? new Array(o.resid.length || 12 * 65).fill(10) : o.resid; };
    const lm = levenbergMarquardt(fun, p, { maxIter: (opt.lmIter ?? rec.settings.lmIter) * (frac >= 0.5 ? 2 : 1), fdStep: 1e-6 });
    p = Float64Array.from(lm.p); const st = S.build(p, branch), o = shootingObjective(st.y, { v: st.v, R, Tw: frac * Tw, P, nSteps: Math.max(32, Math.round(rec.settings.shootingSamples * frac)), method: 'rk4' });
    hist.push({ frac, J: o.J, iter: lm.iter, reason: lm.reason });
  }
  const st = S.build(p, branch), gbs = shootingObjective(st.y, { v: st.v, R, Tw, P, nSteps: 64, method: 'gbs', rtol: 1e-12, atol: 1e-14 });
  return { p: Array.from(p), branch, J_rk4: hist[hist.length - 1].J, J_gbs: gbs.J, minSep: gbs.minSep, v: st.v, y: st.y, history: hist };
}
// parameters of the hexagon in each stratum, and the 20 % / 0.5 rad perturbation in the free stratum
function hexagonParams(stratum) {
  if (stratum === 'c3') return { p: [Math.PI / 2, -Math.PI / 2, Math.PI / 3, OmH * rhoH], branch: 0 };
  if (stratum === 'd3') return { p: [Math.PI / 2, OmH * rhoH], branch: 3 };
  if (stratum === 'c2') return { p: [Math.PI / 2, 0, -Math.PI / 2, Math.PI / 2, 2 * Math.PI / 3, -Math.PI / 2, 4 * Math.PI / 3, OmH * rhoH], branch: 1 }; // generators (members 0, 2, 4) at 0, 120, 240 degrees; their C2 partners (members 1, 3, 5) at 180, 300, 60 degrees // branch 1: psi_2 = -acos(0) = -pi/2, the same sense as members 0 and 1 (branch 0 reverses member 2 and is not the hexagon; found 02:29Z by the prefilter ranking the 'exact hexagon' 547th)
  const p = []; for (let k = 0; k < 5; k++) { const th = Math.PI / 2, ph = k * Math.PI / 3; p.push(th, ph, -Math.PI / 2); } p.push(OmH * rhoH); return { p, branch: 0 };
}
function freeParamsFromState(y) { const p = []; for (let i = 0; i < 5; i++) { const X = getX(y, i), V = getV(y, 6, i), r = v3.norm(X), th = Math.acos(X[2] / r), ph = Math.atan2(X[1], X[0]); const et = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)], ep = [-Math.sin(ph), Math.cos(ph), 0]; p.push(th, ph, Math.atan2(v3.dot(V, ep), v3.dot(V, et))); } let sv = 0; for (let i = 0; i < 6; i++) sv += v3.norm(getV(y, 6, i)); p.push(sv / 6); return p; }
function perturbedHexagonState(seed) {
  const rand = rng(seed), xs = [], vs = [], X = hexagon(rhoH);
  for (let i = 0; i < 6; i++) { const u = randomUnit(rand); xs.push(v3.add(X[i], v3.scale(u, 0.2 * rhoH * rand()))); const t = v3.scale(v3.cross([0, 0, 1], X[i]), OmH); const axis = randomUnit(rand), ang = 0.5 * (2 * rand() - 1); const c = Math.cos(ang), s = Math.sin(ang), kv = v3.cross(axis, t), kd = v3.dot(axis, t); vs.push([t[0] * c + kv[0] * s + axis[0] * kd * (1 - c), t[1] * c + kv[1] * s + axis[1] * kd * (1 - c), t[2] * c + kv[2] * s + axis[2] * kd * (1 - c)]); }
  return stateFrom(xs, vs);
}

// ---------------------------------------------------------------- known cases (recorded first)
rec.knownCases = [];
if (PART === 'reanchor') { // re-anchored Newton from the KN2 stall state of the rk4 receipt
  const src = JSON.parse(fs.readFileSync(path.join(HERE, 'weber-binding-sphere-r2-f3-reach-kn2-rk4.json'), 'utf8')), k = src.knownCases.find(c => c.id.startsWith('KN2'));
  const y0 = Float64Array.from(k.finalState), r = periodicNewton(y0, k.period, { maxIter: 15 }), ch = r.converged ? characterise(r.y, r.period) : null;
  log(`KN2 re-anchored: residual ${r.rmax.toExponential(2)} after ${r.iter} it, P/P_hex ${(r.period / PH).toFixed(6)}${ch ? `, sphere dev ${ch.sphereDeviation.toExponential(2)}, speed dev ${ch.speedDeviation.toExponential(2)}, zMax ${ch.zMax.toExponential(2)}, rMean ${ch.rMean.toFixed(6)}` : ''}; breakdown ${JSON.stringify(r.breakdown.segments.map(z => +z.toExponential(2)))}`);
  writeJson(path.join(HERE, 'weber-binding-sphere-r2-f3-reach-kn2-reanchored.json'), { ...rec, reanchored: { from: 'KN2 stall state (rk4 receipt)', residual: r.rmax, iterations: r.iter, period: r.period, periodOverHexagon: r.period / PH, converged: r.converged, characterisation: ch, history: r.history.map(h => h.rmax), breakdown: r.breakdown } });
  process.exit(0);
}
{ // KN1: the exact hexagon is a zero of the Newton residual and stays there
  const y0 = rigidState(hexagon(rhoH), OmH), r = periodicNewton(y0, PH, { maxIter: 6, tol: 1e-12 });
  rec.knownCases.push({ id: 'KN1-hexagon-is-a-zero', initialResidual: r.history[0].rmax, finalResidual: r.rmax, periodChange: Math.abs(r.period - PH) / PH, pass: r.history[0].rmax <= 1e-6 && r.rmax <= 1e-10 && Math.abs(r.period - PH) / PH <= 1e-8, note: 'the initial residual is the accuracy floor of the one-period GBS flow of an orbit whose instability amplifies round-off by e^{2.46 P/m} per segment; the Newton must return to the hexagon with the period unchanged' });
  log(`${rec.knownCases[0].pass ? 'PASS' : 'FAIL'} KN1: initial residual ${r.history[0].rmax.toExponential(2)}, after ${r.iter} LM iterations ${r.rmax.toExponential(2)}, period change ${rec.knownCases[0].periodChange.toExponential(2)}`);
}
if (PART === 'all' || PART === 'newton' || PART === 'kn2') { // KN2 (reach): Newton from the 20 % / 0.5 rad perturbed hexagon with the period guessed 5 % off
  let y0 = perturbedHexagonState(11), r, ch = null, attempts = 0;
  for (const sd of [11, 12, 13]) { attempts++; y0 = perturbedHexagonState(sd); try { r = periodicNewton(y0, 1.05 * PH, { maxIter: PART === 'kn2' ? 25 : 60 }); break; } catch (e) { r = { rmax: Infinity, iter: 0, period: NaN, converged: false, history: [], error: e.message }; } }
  if (r.converged) ch = characterise(r.y, r.period);
  log(`KN2 seed attempts ${attempts}`); rec.knownCases.push({ id: 'KN2-reach-newton-from-perturbed-hexagon', seedPerturbation: '20 % position, 0.5 rad tangent, period +5 %', seedAttempts: attempts, error: r.error ?? null, breakdown: r.breakdown ?? null, finalState: r.y ? Array.from(r.y) : null, iterations: r.iter, finalResidual: r.rmax, period: r.period, periodOverHexagon: r.period / PH, converged: r.converged, characterisation: ch, pass: r.converged && r.rmax <= 1e-10 && !!ch && ch.isHexagonLike, history: r.history.map(h => h.rmax) });
  log(`${rec.knownCases[rec.knownCases.length - 1].pass ? 'PASS' : 'FAIL'} KN2 reach (Newton): residual ${r.rmax.toExponential(2)} after ${r.iter} iterations, period/P_hex ${(r.period / PH).toFixed(6)}, ${ch ? `sphere dev ${ch.sphereDeviation.toExponential(2)}, speed dev ${ch.speedDeviation.toExponential(2)}, zMax ${ch.zMax.toExponential(2)}, rMean ${ch.rMean.toFixed(6)}` : 'not converged'}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
if (PART !== 'newton' && !PART.startsWith('r3') && !PART.startsWith('r4')) { // KN3 (reach, shooting); with --part polish also the Newton polish: staged LM in the free stratum from the same perturbed hexagon; reference: J of the exact hexagon at the same window
  const Tw = PH, hp = hexagonParams('free'), exact = stagedShooting('free', hp.p, 0, Tw, { stages: [1], lmIter: 0 });
  const y0 = perturbedHexagonState(11), p0 = freeParamsFromState(y0), start = stagedShooting('free', p0, 0, Tw, { stages: [1], lmIter: 0 });
  const r = stagedShooting('free', p0, 0, Tw), ch = characterise(r.y, PH);
  let polish = null; if (PART === 'polish') { const nw = periodicNewton(r.y, PH, { maxIter: 30 }); polish = { residual: nw.rmax, iterations: nw.iter, period: nw.period, periodOverHexagon: nw.period / PH, converged: nw.converged, characterisation: nw.converged ? characterise(nw.y, nw.period) : null }; log(`KN3 polish: Newton residual ${nw.rmax.toExponential(2)} after ${nw.iter} it, P/P_hex ${(nw.period / PH).toFixed(6)}${polish.characterisation ? `, sphere dev ${polish.characterisation.sphereDeviation.toExponential(2)}, zMax ${polish.characterisation.zMax.toExponential(2)}, rMean ${polish.characterisation.rMean.toFixed(6)}` : ''}`); }
  rec.knownCases.push({ id: 'KN3-reach-staged-shooting-free', newtonPolish: polish, window: Tw, exactHexagonJ: { rk4: exact.J_rk4, gbs: exact.J_gbs }, startJ: start.J_rk4, finalJ: { rk4: r.J_rk4, gbs: r.J_gbs }, history: r.history, characterisation: ch, pass: r.J_gbs <= Math.max(1e-8, 2 * exact.J_gbs) && ch.sphereDeviation <= 1e-6 });
  log(`${rec.knownCases[rec.knownCases.length - 1].pass ? 'PASS' : 'FAIL'} KN3 reach (staged shooting, free): J from ${start.J_rk4.toExponential(2)} to ${r.J_rk4.toExponential(2)} (GBS ${r.J_gbs.toExponential(2)}); exact hexagon at this window ${exact.J_rk4.toExponential(2)} (GBS ${exact.J_gbs.toExponential(2)}); sphere dev ${ch.sphereDeviation.toExponential(2)}, zMax ${ch.zMax.toExponential(2)}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
writeJson(RECEIPT, { ...rec, status: 'known-cases-done', updated: utc() });


// ================================================================ Round 3 parts
if (PART.startsWith('r3') || PART.startsWith('r4')) {
  const STEP = arg('--seedset', 'a'), STRAT = arg('--stratum', 'free'), VLO = Number(arg('--vlo', 0.3)), VHI = Number(arg('--vhi', 1.5));
  rec.round = 3; rec.part = PART;
  const charOrbit = (y0, Pp) => { const ch = characterise(y0, Pp); let detMin = Infinity, detMax = 0; integrate(y0, Pp, P, { method: 'gbs', rtol: 1e-12, atol: 1e-14, hmax: Pp / 64, onSample: (t, y, sol) => { detMin = Math.min(detMin, Math.abs(sol.det)); detMax = Math.max(detMax, Math.abs(sol.det)); } }); return { ...ch, detRange: [detMin, detMax] }; };
  if (PART === 'r3newton') {
    rec.knownCases = rec.knownCases ?? [];
    if (STEP === 'a') { // KN2 as a single run of the symmetry-bordered fixed-period Newton
      const y0 = perturbedHexagonState(11), Pfix = 1.05 * PH, r = periodicNewtonSym(y0, Pfix, { maxIter: 40 }), ch = r.converged ? charOrbit(r.y, Pfix) : null;
      rec.knownCases.push({ id: 'KN2-sym-single-run', seed: '20 % position, 0.5 rad tangent, P fixed at 1.05 P_hex', iterations: r.iter, finalResidual: r.rmax, converged: r.converged, expectedRadius: Math.pow(1.05, 2 / 3), characterisation: ch, history: r.history.map(h => h.rmax), breakdown: r.breakdown, pass: r.converged && r.rmax <= 1e-10 });
      log(`${r.rmax <= 1e-10 ? 'PASS' : 'FAIL'} KN2-sym single run: residual ${r.rmax.toExponential(2)} after ${r.iter} it${ch ? `, rMean ${ch.rMean.toFixed(6)} (expected ${Math.pow(1.05, 2 / 3).toFixed(6)}), sphere dev ${ch.sphereDeviation.toExponential(2)}, speed dev ${ch.speedDeviation.toExponential(2)}, zMax ${ch.zMax.toExponential(2)}` : ''}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
    }
    // item 3 seeds: periodic orbits near the sphere, P fixed at the seed's estimate
    const seeds3 = [];
    if (STEP === 'a' || STEP === 'a2') { // a2: the seedset-a item-3 seeds without KN2, for the segment-product monodromy rerun
      const f4 = JSON.parse(fs.readFileSync(path.join(HERE, 'weber-binding-sphere-r2-f4.json'), 'utf8')), c3 = f4.cases.find(c => c.label.startsWith('square on z=0, pair on a=1/2, + member at z +')).refineFree;
      { const zs = c3.zs, ph = c3.phases, sn = c3.senses, v = c3.v, as = zs.map(z => Math.sqrt(1 - z * z)), xs = [], vs = []; const put = (k, phase, q) => { const a = as[k], w = v / a, th = sn[k] * 0 + ph[k] + phase, cs = Math.cos(th), si = Math.sin(th); xs.push([a * cs, a * si, zs[k]]); vs.push([-sn[k] * v * si, sn[k] * v * cs, 0]); }; for (let k = 0; k < 4; k++) put(0, k * Math.PI / 2, k % 2 ? -1 : 1); put(1, 0, 1); put(2, Math.PI, -1); seeds3.push({ name: 'F4 best (square + pair, free ratios, residual 2.50)', y: stateFrom(xs, vs), P: 2 * Math.PI * as[0] / v }); }
      const f2 = JSON.parse(fs.readFileSync(path.join(HERE, 'weber-binding-sphere-f2.json'), 'utf8')), e = f2.extensionNormalsFree[0];
      { const basisOf = n => { const a = Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]; const u = v3.unit(v3.cross(n, a)); return [u, v3.cross(n, u)]; }; const xs = [], vs = []; for (let k = 0; k < 3; k++) { const [u, up] = basisOf(e.normals[k]), th = e.phases[k], c = Math.cos(th), si = Math.sin(th), sgn = e.from.senses[k], Rr = e.from.R; const X = v3.scale(v3.add(v3.scale(u, c), v3.scale(up, si)), Rr), V = v3.scale(v3.add(v3.scale(u, -si), v3.scale(up, c)), sgn * e.Omega * Rr); xs.push(X, v3.scale(X, -1)); vs.push(V, v3.scale(V, -1)); } seeds3.push({ name: 'F2 best (free normals, residual 0.68, R = 2)', y: stateFrom(xs, vs), P: 2 * Math.PI / e.Omega }); }
      for (const thp of [80, 70]) { const st = STRATA.c3.build([thp * Math.PI / 180, -Math.PI / 2, Math.PI / 3, 0.8], 0); seeds3.push({ name: `C3 tilted triangles theta+=${thp} phi-=60`, y: st.y, P: 2 * Math.PI * Math.sin(thp * Math.PI / 180) / 0.8 }); }
    } else {
      for (const thp of [55]) for (const ph of [Math.PI / 3, Math.PI]) { const st = STRATA.c3.build([thp * Math.PI / 180, -Math.PI / 2, ph, 0.8], 0); seeds3.push({ name: `C3 tilted triangles theta+=${thp} phi-=${(ph * 180 / Math.PI).toFixed(0)}`, y: st.y, P: 2 * Math.PI * Math.sin(thp * Math.PI / 180) / 0.8 }); }
      for (const thp of [80, 70]) { const st = STRATA.c3.build([thp * Math.PI / 180, -Math.PI / 2, Math.PI, 0.8], 0); seeds3.push({ name: `C3 tilted triangles theta+=${thp} phi-=180`, y: st.y, P: 2 * Math.PI * Math.sin(thp * Math.PI / 180) / 0.8 }); }
      const rr = rng(20261009); for (let k = 0; k < 4; k++) { const p = [Math.acos(2 * rr() - 1), 2 * Math.PI * rr(), 2 * Math.PI * rr(), Math.acos(2 * rr() - 1), 2 * Math.PI * rr(), 2 * Math.PI * rr(), 2 * Math.PI * rr(), 0.5 + rr()]; const st = STRATA.c2.build(p, k % 2); if (minSeparation(st.y, 6) > 0.3) seeds3.push({ name: `C2 random ${k}`, y: st.y, P: 2 * Math.PI / st.v }); }
    }
    rec.item3 = [];
    for (const sd of seeds3) {
      let r, ch = null, err = null, mon = null;
      try { r = periodicNewtonSym(sd.y, sd.P, { maxIter: Number(arg('--iter', 25)) }); if (r.converged) { ch = charOrbit(r.y, sd.P); try { const mm = monodromySegments(r.y, sd.P); mon = { maxModulus: mm.maxModulus, unitCount: mm.unitCount, multipliers: mm.multipliers.slice(0, 12).map(z => ({ re: z.re, im: z.im, abs: z.abs })) }; } catch (e2) { mon = { error: e2.message }; } } } catch (e) { err = e.message; }
      if (r && !r.converged && r.rmax < 1e-3 && !ch) { try { ch = charOrbit(r.y, sd.P); ch.note = 'end state of an unconverged run (residual ' + r.rmax.toExponential(2) + '); descriptive only'; } catch {} }
      const row = { seed: sd.name, P: sd.P, y: r?.y ? Array.from(r.y) : null, converged: r?.converged ?? false, residual: r?.rmax ?? null, iterations: r?.iter ?? null, history: r?.history?.map(h => h.rmax) ?? null, error: err, characterisation: ch, monodromy: mon };
      rec.item3.push(row);
      log(`item3 seed "${sd.name}" (P ${sd.P.toFixed(4)}): ${err ? 'error ' + err : `residual ${r.rmax.toExponential(2)} after ${r.iter} it${ch ? `; rMean ${ch.rMean.toFixed(4)} sphere spread ${ch.sphereDeviation.toExponential(2)} speed spread ${ch.speedDeviation.toExponential(2)} zMax ${ch.zMax.toExponential(2)} minSep ${ch.minSep.toExponential(2)} det [${ch.detRange.map(d => d.toExponential(2)).join(', ')}] maxMult ${mon?.maxModulus?.toExponential(3) ?? '—'}` : ''}`}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
    }
    rec.finished = utc(); writeJson(RECEIPT, rec); log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}`); process.exit(0);
  }
  if (PART === 'r3shooting' || PART === 'r4shooting') {
    // collision-avoiding prefiltered starts for stratum STRAT (c2 or free)
    const S = STRATA[STRAT], rr = rng(STRAT === 'c2' ? 20261010 : 20261011), pool = [], NPOOL = Number(arg('--pool', 2000)), NTOP = NSTARTS;
    const score = st => { const jet = jetConditions(st.y, P, st.v, R); const H = energyLike(st.y, P); let sdd = 0; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const X = v3.sub(getX(st.y, i), getX(st.y, j)), W = v3.sub(getV(st.y, 6, i), getV(st.y, 6, j)); sdd += Q[i] * Q[j] * v3.dot(X, W) / v3.norm(X); } return { total: jet.jetScore + Math.abs(H + 3 * st.v * st.v) / (3 * st.v * st.v) + Math.abs(sdd) / (6 * st.v), jet: jet.jetScore, H: Math.abs(H + 3 * st.v * st.v) / (3 * st.v * st.v), sigmaDdot: Math.abs(sdd) / (6 * st.v) }; };
    let tries = 0;
    while (pool.length < NPOOL && tries < 20 * NPOOL) { tries++; let p, b = 0; if (STRAT === 'c2') { p = [Math.acos(2 * rr() - 1), 2 * Math.PI * rr(), 2 * Math.PI * rr(), Math.acos(2 * rr() - 1), 2 * Math.PI * rr(), 2 * Math.PI * rr(), 2 * Math.PI * rr(), VLO + (VHI - VLO) * rr()]; b = tries % 2; } else { p = []; for (let i = 0; i < 5; i++) p.push(Math.acos(2 * rr() - 1), 2 * Math.PI * rr(), 2 * Math.PI * rr()); p.push(VLO + (VHI - VLO) * rr()); } const st = S.build(p, b); if (minSeparation(st.y, 6) < 0.5 * R) continue; const sc = score(st); pool.push({ p, branch: b, v: st.v, minSep: minSeparation(st.y, 6), score: sc.total, scoreParts: sc, kind: 'random' }); }
    // deliberately included: the exact hexagon and the 20 % / 0.5 rad perturbed hexagon (reach case for the stratum)
    const hp = hexagonParams(STRAT); { const st = S.build(hp.p, hp.branch); pool.push({ p: hp.p, branch: hp.branch, v: st.v, minSep: minSeparation(st.y, 6), score: score(st).total, kind: 'exact hexagon' }); }
    if (STRAT === 'free') { const y0 = perturbedHexagonState(11), p0 = freeParamsFromState(y0), st = S.build(p0, 0); pool.push({ p: p0, branch: 0, v: st.v, minSep: minSeparation(st.y, 6), score: score(st).total, kind: 'perturbed hexagon (20 %, 0.5 rad)' }); }
    else { const p0 = hp.p.map((z, i) => i < 7 ? z + 0.2 * (2 * rr() - 1) : z * (1 + 0.2 * (2 * rr() - 1))), st = S.build(p0, hp.branch); pool.push({ p: p0, branch: hp.branch, v: st.v, minSep: minSeparation(st.y, 6), score: score(st).total, kind: 'perturbed hexagon (0.2 rad in every angle, 20 % in v)' }); }
    pool.sort((a, b) => a.score - b.score);
    const ranks = pool.map((x, i) => ({ kind: x.kind, rank: i + 1, score: x.score })).filter(x => x.kind !== 'random');
    rec.prefilter = { stratum: STRAT, R, vRange: [VLO, VHI], poolSize: pool.length, tries, minSepFloor: 0.5 * R, scoreDefinition: 'jet score (|X.A+v^2|/v^2 + |V.A| R/v^3, max over members) + |H+3v^2|/(3v^2) + |sum sigma d-dot|/(6v)', scoreQuantiles: [0, 0.01, 0.1, 0.5, 0.9, 1].map(q => ({ q, score: pool[Math.min(pool.length - 1, Math.floor(q * (pool.length - 1)))].score })), includedRanks: ranks };
    log(`prefilter ${STRAT}: pool ${pool.length} (tries ${tries}); score quantiles ${rec.prefilter.scoreQuantiles.map(x => x.score.toExponential(2)).join(' ')}; included: ${ranks.map(x => `${x.kind} rank ${x.rank} score ${x.score.toExponential(2)}`).join('; ')}`);
    const chosen = pool.slice(0, NTOP); for (const x of pool.slice(NTOP)) if (x.kind !== 'random') chosen.push(x);
    rec.starts = [];
    for (const [si, x] of chosen.entries()) {
      const st0 = S.build(x.p, x.branch), Tw = 2 * Math.PI * R / st0.v;
      const stagesR3 = [1 / 32, 1 / 16, 1 / 8, 1 / 4, 1 / 2, 1];
      let pcur = Float64Array.from(x.p), hist = [];
      for (const frac of stagesR3) { const fun = pp => { const st = S.build(pp, x.branch); const o = shootingObjective(st.y, { v: st.v, R, Tw: frac * Tw, P, nSteps: Math.max(32, Math.round(256 * frac)), method: 'rk4', minSep: 0.2 * R }); return o.failed ? o.resid.concat(new Array(Math.max(0, 12 * (Math.max(32, Math.round(256 * frac)) + 1) - o.resid.length)).fill(10 * (1 + (1 - o.worstT / (frac * Tw))))) : o.resid; }; const lm = levenbergMarquardt(fun, pcur, { maxIter: frac >= 0.5 ? 24 : 12, fdStep: 1e-6 }); pcur = Float64Array.from(lm.p); const st = S.build(pcur, x.branch), o = shootingObjective(st.y, { v: st.v, R, Tw: frac * Tw, P, nSteps: Math.max(32, Math.round(256 * frac)), method: 'rk4', minSep: 0.2 * R }); hist.push({ frac, J: o.J, failed: o.failed, reason: o.reason }); }
      const st = S.build(pcur, x.branch), gbs = shootingObjective(st.y, { v: st.v, R, Tw, P, nSteps: 64, method: 'gbs', rtol: 1e-12, atol: 1e-14, minSep: 0.2 * R });
      const row = { index: si, kind: x.kind, prefilterScore: x.score, J_rk4: hist[hist.length - 1].J, J_gbs: gbs.J, reason: gbs.reason, minSep: gbs.minSep, v: st.v, history: hist, p: Array.from(pcur), branch: x.branch };
      if (gbs.J <= 1e-6) { const nw = periodicNewton(st.y, Tw, { maxIter: 15, verbose: false }); row.newton = { residual: nw.rmax, converged: nw.converged, period: nw.period, characterisation: nw.converged ? charOrbit(nw.y, nw.period) : null }; }
      rec.starts.push(row);
      log(`heartbeat ${STRAT} start ${si + 1}/${chosen.length} [${x.kind}, prefilter ${x.score.toExponential(2)}]: J_rk4 ${row.J_rk4.toExponential(2)} J_gbs ${gbs.J.toExponential(2)} (${gbs.reason}, minSep ${gbs.minSep.toExponential(1)}, v ${st.v.toFixed(3)})${row.newton ? ` newton ${row.newton.residual.toExponential(2)} rMean ${row.newton.characterisation?.rMean?.toFixed(4)} zMax ${row.newton.characterisation?.zMax?.toExponential(1)}` : ''}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
      writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
    }
    const rnd = rec.starts.filter(r => r.kind === 'random').sort((a, b) => a.J_gbs - b.J_gbs);
    rec.summary = { stratum: STRAT, randomStarts: rnd.length, floorJ_gbs: rnd[0]?.J_gbs ?? null, histogram: { below1e_8: rnd.filter(r => r.J_gbs <= 1e-8).length, below1e_6: rnd.filter(r => r.J_gbs <= 1e-6).length, below1e_3: rnd.filter(r => r.J_gbs <= 1e-3).length, below1e_1: rnd.filter(r => r.J_gbs <= 1e-1).length, below1: rnd.filter(r => r.J_gbs <= 1).length, collided: rnd.filter(r => r.reason !== 'final-time').length }, reach: rec.starts.filter(r => r.kind !== 'random').map(r => ({ kind: r.kind, J_gbs: r.J_gbs, newton: r.newton ? { residual: r.newton.residual, rMean: r.newton.characterisation?.rMean, zMax: r.newton.characterisation?.zMax } : null })) };
    log(`${STRAT}: random floor J_gbs ${rec.summary.floorJ_gbs?.toExponential(3)}, histogram ${JSON.stringify(rec.summary.histogram)}; reach ${JSON.stringify(rec.summary.reach)}`);
    rec.finished = utc(); writeJson(RECEIPT, rec); log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}`); process.exit(0);
  }
}

// ---------------------------------------------------------------- Part A targets: Newton from seeds
rec.newton = [];
const seeds = [];
const rand = rng(20261008);
if (PART === 'all' || PART === 'newton') {
{ const c3 = JSON.parse(fs.readFileSync(path.join(HERE, 'weber-binding-sphere-f3-shooting-c3.json'), 'utf8')), fr = JSON.parse(fs.readFileSync(path.join(HERE, 'weber-binding-sphere-f3-shooting-free.json'), 'utf8'));
  for (const s of c3.summary.bestFive.slice(1, 3)) seeds.push({ name: `round-1 c3 start ${s.start}`, y: STRATA.c3.build(s.p, s.branch).y, P: PH });
  for (const s of fr.summary.bestFive.slice(0, 3)) seeds.push({ name: `round-1 free start ${s.start}`, y: STRATA.free.build(s.p).y, P: s.Tw }); }
for (const amp of [0.05, 0.15, 0.3]) for (let k = 0; k < 3; k++) { const X = hexagon(rhoH).map(x => [x[0], x[1], amp * rhoH * (2 * rand() - 1)]); let sz = 0; for (const x of X) sz += x[2]; X.forEach(x => { x[2] -= sz / 6; }); seeds.push({ name: `hexagon + out-of-plane ${amp}rho (${k})`, y: stateFrom(X, X.map(x => v3.scale(v3.cross([0, 0, 1], [x[0], x[1], 0]), OmH))), P: PH }); }
for (const thp of [80, 70, 55]) for (const ph of [Math.PI / 3, Math.PI]) { const st = STRATA.c3.build([thp * Math.PI / 180, -Math.PI / 2, ph, 0.8], 0); seeds.push({ name: `C3 tilted triangles theta+=${thp} phi-=${(ph * 180 / Math.PI).toFixed(0)}`, y: st.y, P: 2 * Math.PI * Math.sin(thp * Math.PI / 180) / 0.8 }); }
for (let k = 0; k < 4; k++) { const p = [Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand(), Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 0.5 + rand()]; const st = STRATA.c2.build(p, k % 2); if (minSeparation(st.y, 6) > 0.2) seeds.push({ name: `C2 random ${k}`, y: st.y, P: 2 * Math.PI / st.v }); }
for (const s of seeds.slice(0, Number(arg('--seeds', 8)))) {
  let r, ch = null, err = null;
  try { r = periodicNewton(s.y, s.P, { maxIter: 30 }); if (r.converged) ch = characterise(r.y, r.period); } catch (e) { err = e.message; }
  const row = { seed: s.name, seedPeriod: s.P, converged: r?.converged ?? false, residual: r?.rmax ?? null, iterations: r?.iter ?? null, period: r?.period ?? null, characterisation: ch, error: err };
  rec.newton.push(row);
  log(`newton seed "${s.name}": ${err ? 'error ' + err : `residual ${r.rmax.toExponential(2)} after ${r.iter} it, P ${r.period.toFixed(4)}${ch ? `, sphere dev ${ch.sphereDeviation.toExponential(2)}, speed dev ${ch.speedDeviation.toExponential(2)}, zMax ${ch.zMax.toExponential(2)}, rMean ${ch.rMean.toFixed(4)}, hexagon-like ${ch.isHexagonLike}` : ''}`}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}
}

// ---------------------------------------------------------------- Part B targets: staged shooting per stratum from random starts
rec.shooting = {};
if (PART === 'all' || PART === 'shooting') for (const stratum of ['d3', 'c3', 'c2', 'free']) {
  const S = STRATA[stratum], n = stratum === 'd3' ? 6 : NSTARTS, rows = [];
  for (let s = 0; s < n; s++) {
    let p0, branch = 0;
    if (stratum === 'd3') { p0 = [Math.acos(2 * rand() - 1), 0.3 + 1.2 * rand()]; branch = s % 6; }
    else if (stratum === 'c3') { p0 = [Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 0.3 + 1.2 * rand()]; branch = rand() < 0.5 ? 0 : 1; }
    else if (stratum === 'c2') { p0 = [Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand(), Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 2 * Math.PI * rand(), 0.3 + 1.2 * rand()]; branch = s % 2; }
    else { p0 = []; for (let i = 0; i < 5; i++) p0.push(Math.acos(2 * rand() - 1), 2 * Math.PI * rand(), 2 * Math.PI * rand()); p0.push(0.3 + 1.2 * rand()); }
    const st0 = S.build(p0, branch); if (minSeparation(st0.y, 6) < 0.05) { s--; continue; }
    const Tw = 2 * Math.PI * R / st0.v; // one lap at the start's speed as the window
    let r; try { r = stagedShooting(stratum, p0, branch, Tw); } catch (e) { rows.push({ start: s, error: e.message }); continue; }
    const row = { start: s, branch, Tw, J_rk4: r.J_rk4, J_gbs: r.J_gbs, v: r.v, minSep: r.minSep, p: r.p, history: r.history };
    if (r.J_gbs <= 1e-6) { const nw = periodicNewton(r.y, Tw, { maxIter: 30, verbose: false }); row.newton = { residual: nw.rmax, converged: nw.converged, period: nw.period, characterisation: nw.converged ? characterise(nw.y, nw.period) : null }; }
    rows.push(row);
    log(`heartbeat ${stratum} start ${s + 1}/${n}: J_rk4 ${r.J_rk4.toExponential(2)} J_gbs ${r.J_gbs.toExponential(2)} (v ${r.v.toFixed(3)}, minSep ${r.minSep.toExponential(1)})${row.newton ? ` newton residual ${row.newton.residual.toExponential(2)} hexagon-like ${row.newton.characterisation?.isHexagonLike}` : ''}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
    writeJson(RECEIPT, { ...rec, status: 'running', updated: utc(), shootingPartial: { stratum, rows } });
  }
  const ok = rows.filter(r => r.J_gbs !== undefined).sort((a, b) => a.J_gbs - b.J_gbs);
  rec.shooting[stratum] = { starts: n, floorJ_gbs: ok[0]?.J_gbs ?? null, floorJ_rk4: Math.min(...ok.map(r => r.J_rk4)), histogram: { below1e_8: ok.filter(r => r.J_gbs <= 1e-8).length, below1e_6: ok.filter(r => r.J_gbs <= 1e-6).length, below1e_3: ok.filter(r => r.J_gbs <= 1e-3).length, below1e_1: ok.filter(r => r.J_gbs <= 1e-1).length, below1: ok.filter(r => r.J_gbs <= 1).length }, bestFive: ok.slice(0, 5), rows };
  log(`${stratum}: floor J_gbs ${rec.shooting[stratum].floorJ_gbs?.toExponential(3)}, histogram ${JSON.stringify(rec.shooting[stratum].histogram)}`);
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}
rec.finished = utc(); rec.wallSeconds = (Date.now() - t0) / 1000;
writeJson(RECEIPT, rec);
log(`receipt ${path.relative(REPO_ROOT, RECEIPT)} (wall ${rec.wallSeconds.toFixed(0)}s)`);
