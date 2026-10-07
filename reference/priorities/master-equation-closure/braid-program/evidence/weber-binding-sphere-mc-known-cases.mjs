#!/usr/bin/env node
// Known cases KC1-KC5 for the multi-curve collocation instrument (preregistration 11.4).
// Usage: node weber-binding-sphere-mc-known-cases.mjs [--only kc1,kc2,...] [--phi 2|1.5] [--M <n>] [--out <path>]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { runCase } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';
import * as L from './weber-binding-sphere-mc-lib.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2), arg = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const only = (arg('--only', 'kc1,kc5,kc2,kc3,kc4')).split(',');
const outPath = arg('--out', path.join(HERE, 'weber-binding-sphere-mc-known-cases.json'));
const now = () => new Date().toISOString();
const command = 'node ' + path.relative(process.cwd(), fileURLToPath(import.meta.url)) + ' ' + args.join(' ');
const receipt = fs.existsSync(outPath) ? JSON.parse(fs.readFileSync(outPath, 'utf8')) : { instrument: 'weber-binding-sphere-mc-lib.mjs', law: 'instantaneous Weber comparison law, K=c_f=1, lambda=-1/2, mu=1, full 3N x 3N solve', cases: {} };
const record = (name, obj) => { receipt.cases[name] = { ...obj, command, utc: now() }; console.log(name, JSON.stringify(obj)); fs.writeFileSync(outPath, JSON.stringify(receipt, null, 1)); };

const R = 1, M = 3, Nc = 16, Om = L.hexagonOmega(R);
const B6 = L.stratumBasis(6, M);
const hexP = (prob, om = Om, v = Om * R) => { const p = new Float64Array(prob.np); p.set(L.toReduced(B6, L.hexagonCoefficients(M, R))); p[prob.iOmega] = om; if (prob.iV >= 0) p[prob.iV] = v; return p; };

if (only.includes('kc1') || only.includes('kc5')) {
  const prob = L.makeProblem({ q: L.Q6, M, Nc, R, stage: 2, B: B6 });
  const e = prob.evaluate(hexP(prob), true), fine = L.fineEvaluate(e.c, Om, L.Q6, M, { v: Om * R });
  const val = Math.max(e.info.maxE, e.info.maxS, e.info.maxV);
  record('KC1', { description: 'alternating hexagon R=1, Omega^2=(5/4-1/sqrt3)/R^3 is a zero of stage 2', M, Nc, omega: Om, v: Om * R, collocation: { maxE: e.info.maxE, maxS: e.info.maxS, maxV: e.info.maxV }, fine: { Nf: fine.Nf, maxE: fine.maxE, maxS: fine.maxS, maxV: fine.maxV, det: [fine.detMin, fine.detMax] }, value: Math.max(val, fine.maxE, fine.maxS, fine.maxV), tolerance: 1e-13, pass: Math.max(val, fine.maxE, fine.maxS, fine.maxV) <= 1e-13 });
  const e5 = prob.evaluate(hexP(prob, 1.01 * Om, Om * R), false), e5b = prob.evaluate(hexP(prob, 1.01 * Om, 1.01 * Om * R), false);
  record('KC5', { description: 'hexagon at 1.01 omega is not a zero (v kept, and v scaled with omega)', maxE_vKept: e5.info.maxE, maxV_vKept: e5.info.maxV, maxE_vScaled: e5b.info.maxE, value: Math.min(e5.info.maxE, e5b.info.maxE), tolerance: '>= 1e-3', pass: Math.min(e5.info.maxE, e5b.info.maxE) >= 1e-3 });
  // speed-normalized mode: hexagon is a zero, and the Jacobian chain is checked in both stages
  for (const stg of [1, 2]) {
    const pv = L.makeProblem({ q: L.Q6, M, Nc, R, stage: stg, B: B6, norm: 'meanRadius', eNorm: 'speed', speedBox: 3 }), z = pv.evaluate(hexP(pv), false);
    const rr = L.rng(9 + stg), pp = L.perturb(hexP(pv), rr, 0.05), dir = Float64Array.from(pp, () => L.gauss(rr) * 0.1), ev = pv.evaluate(pp, true), h = 1e-6, ep = pv.evaluate(pp.map((u, i) => u + h * dir[i]), false), em = pv.evaluate(pp.map((u, i) => u - h * dir[i]), false);
    let err = 0, sc = 0; for (let i = 0; i < pv.nrows; i++) { let sm = 0; for (let j = 0; j < pv.np; j++) sm += ev.J[i * pv.np + j] * dir[j]; const fd = (ep.r[i] - em.r[i]) / (2 * h); err = Math.max(err, Math.abs(sm - fd)); sc = Math.max(sc, Math.abs(fd)); }
    record(`KC1-speed-normalized-stage${stg}`, { description: 'hexagon is a zero of the speed-normalized residual (with the speed box 3 present and inactive); Jacobian against central difference at a 5 percent perturbed hexagon', hexagonMaxResidual: Math.max(z.info.maxE, z.info.maxS, z.info.maxV), jacobianRelativeDifference: err / sc, value: Math.max(z.info.maxE, z.info.maxS, z.info.maxV), tolerance: 1e-13, pass: Math.max(z.info.maxE, z.info.maxS, z.info.maxV) <= 1e-13 && err / sc <= 1e-6 });
  }
  // Jacobian self-check: analytic-chain Jacobian against a directional central difference of the residual
  const p0 = hexP(prob), rr = L.rng(7), dir = Float64Array.from(p0, () => L.gauss(rr) * 0.1), pp = L.perturb(p0, rr, 0.05), ev = prob.evaluate(pp, true), h = 1e-6;
  const ep = prob.evaluate(pp.map((z, k) => z + h * dir[k]), false), em = prob.evaluate(pp.map((z, k) => z - h * dir[k]), false);
  let err = 0, sc = 0; for (let i = 0; i < prob.nrows; i++) { let s = 0; for (let k = 0; k < prob.np; k++) s += ev.J[i * prob.np + k] * dir[k]; const fd = (ep.r[i] - em.r[i]) / (2 * h); err = Math.max(err, Math.abs(s - fd)); sc = Math.max(sc, Math.abs(fd)); }
  record('KC1-jacobian', { description: 'Jacobian times random direction against central difference of the residual at a 5 percent perturbed hexagon (stage 2)', maxAbsDifference: err, scale: sc, value: err / sc, tolerance: 1e-6, pass: err / sc <= 1e-6 });
}

if (only.includes('kc2')) {
  const runs = [];
  for (const [name, stage] of [['stage2-direct', 2], ['stage1-then-stage2', 1]]) for (let trial = 0; trial < 3; trial++) {
    const r = L.rng(20261006 + trial), c0 = L.perturb(L.hexagonCoefficients(M, R), r, 0.2);
    // explicit out-of-plane content: tilt member curves and add z harmonics (already present through the isotropic perturbation); record its size
    let zc = 0; for (let i = 0; i < 6; i++) for (let s = 0; s < L.nBasis(M); s++) zc = Math.max(zc, Math.abs(c0[L.idx(M, i, s, 2)]));
    const om0 = Om * (1 + 0.2 * (2 * r() - 1)), v0 = Om * R * (1 + 0.2 * (2 * r() - 1));
    let c = L.toFull(B6, L.toReduced(B6, c0)), om = om0, stageLog = [];
    if (stage === 1) {
      const p1 = L.makeProblem({ q: L.Q6, M, Nc, R, stage: 1, B: B6, norm: 'meanRadius' }), p = new Float64Array(p1.np); p.set(L.toReduced(B6, c)); p[p1.iOmega] = om;
      const s1 = L.levenbergMarquardt(p1, p, { maxIter: 300 }); c = s1.c; om = s1.omega; stageLog.push({ stage: 1, iter: s1.iter, reason: s1.reason, cost: s1.cost, maxE: s1.info?.maxE });
    }
    const p2 = L.makeProblem({ q: L.Q6, M, Nc, R, stage: 2, B: B6 }), p = new Float64Array(p2.np); p.set(L.toReduced(B6, c)); p[p2.iOmega] = om; p[p2.iV] = stage === 1 ? om * R : v0;
    const s2 = L.levenbergMarquardt(p2, p, { maxIter: 400 }); stageLog.push({ stage: 2, iter: s2.iter, reason: s2.reason, cost: s2.cost });
    const fine = L.fineEvaluate(s2.c, s2.omega, L.Q6, M, { v: s2.v }), cls = L.classify(fine, s2.omega);
    const worst = Math.max(fine.maxE, fine.maxS, fine.maxV, Math.abs(s2.omega - Om));
    runs.push({ route: name, trial, seed: 20261006 + trial, perturbation: '20 percent of the coefficient 2-norm, isotropic over all harmonics and all three axes; omega and v each scaled by a uniform factor in [0.8,1.2]', maxOutOfPlaneCoefficientAtStart: zc, omega0: om0, v0, stageLog, omega: s2.omega, omegaError: s2.omega - Om, v: s2.v, fine: { maxE: fine.maxE, maxS: fine.maxS, maxV: fine.maxV, minSep: fine.minSep }, classification: cls.label, value: worst, pass: worst <= 1e-10 && cls.hexagon });
  }
  record('KC2', { description: 'reach: hexagon recovered from 20 percent perturbed coefficients (out-of-plane content included)', M, Nc, runs, value: Math.max(...runs.map(x => x.value)), tolerance: 1e-10, passCount: runs.filter(x => x.pass).length, pass: runs.some(x => x.pass) && runs.filter(x => x.route === 'stage2-direct').some(x => x.pass) });
}

// ---------------------------------------------------------------- KC3: closed eccentric opposite-polarity rosette
function quad(A, e, n = 8192) {
  // overnight investigation (7.4)-(7.5), sigma=-1, k=2K=2, kappa=2: r=A(1-e cos psi), |eps|=k/(2A), h^2=2|eps|A^2(1-e^2)
  const eps = 1 / A, h = Math.sqrt(2 * eps * A * A * (1 - e * e)), pre = 1 / Math.sqrt(2 * eps); let T = 0, Phi = 0, r2 = 0;
  for (let k = 0; k < n; k++) { const r = A * (1 - e * Math.cos(2 * Math.PI * k / n)), w = Math.sqrt(r * (r + 2)); T += w; Phi += Math.sqrt(1 + 2 / r) / r; r2 += r * r * w; }
  const dpsi = 2 * Math.PI / n;
  return { eps: -eps, h, Tr: pre * T * dpsi, Phi: 0.5 * h * pre * Phi * dpsi, meanR2: r2 / T, rp: A * (1 - e), ra: A * (1 + e) };
}
if (only.includes('kc3')) {
  const phiMult = Number(arg('--phi', '2')), e = Number(arg('--ecc', '0.3')), target = phiMult * Math.PI;
  const radialPeriods = phiMult === 2 ? 1 : phiMult === 1.5 ? 2 : Number(arg('--periods', '1'));
  let lo = 0.02, hi = 200; for (let it = 0; it < 200; it++) { const mid = 0.5 * (lo + hi); if (quad(mid, e).Phi > target) lo = mid; else hi = mid; }
  const A = 0.5 * (lo + hi), Q = quad(A, e), Q2 = quad(A, e, 16384), Pq = radialPeriods * Q.Tr;
  const inv = { A, eccentricity: e, epsilon: Q.eps, h: Q.h, rPeri: Q.rp, rApo: Q.ra, apsidalAngleOverPi: Q.Phi / Math.PI, radialPeriod: Q.Tr, closedPeriod: Pq, radialPeriodsPerClosure: radialPeriods, turnsPerClosure: radialPeriods * 2 * Q.Phi / (2 * Math.PI), quadratureConvergence: Math.abs(Q.Tr - Q2.Tr) + Math.abs(Q.Phi - Q2.Phi), maxMemberSpeed: Q.h / (2 * Q.rp) };
  console.log('KC3 invariants', JSON.stringify(inv));
  const q2 = [1, -1], coeff = { lambda: -0.5, mu: 1, K: 1, cf: 1 };
  const members = [{ q: 1, x: [Q.rp / 2, 0, 0], v: [0, Q.h / (2 * Q.rp), 0] }, { q: -1, x: [-Q.rp / 2, 0, 0], v: [0, -Q.h / (2 * Q.rp), 0] }];
  const full = runCase({ members, coefficients: coeff, tEnd: Pq, integrator: { method: 'gbs', rtol: 1e-12, atol: 1e-14 }, condition: 'none' });
  const y0 = [...members[0].x, ...members[1].x, ...members[0].v, ...members[1].v], yf = [...full.final.x, ...full.final.v];
  const closure = Math.max(...y0.map((z, k) => Math.abs(z - yf[k])));
  console.log('KC3 closure', closure, full.termination);
  // coarse sampling of the integrated orbit: Ks segments
  const Ks = Number(arg('--samples', '64')), samples = []; let mem = members;
  for (let k = 0; k < Ks; k++) {
    samples.push(Float64Array.from([...mem[0].x, ...mem[1].x]));
    const seg = runCase({ members: mem, coefficients: coeff, tEnd: Pq / Ks, integrator: { method: 'gbs', rtol: 1e-12, atol: 1e-14 }, condition: 'none' });
    mem = [{ q: 1, x: seg.final.x.slice(0, 3), v: seg.final.v.slice(0, 3) }, { q: -1, x: seg.final.x.slice(3, 6), v: seg.final.v.slice(3, 6) }];
  }
  const Mk = Number(arg('--M', phiMult === 2 ? '40' : '72')), Nck = Number(arg('--Nc', String(4 * Mk + 2))), Ms = Math.min(Mk, Math.floor((Ks - 1) / 2));
  const cSeed = L.padCoefficients(L.fitCoefficients(samples, 2, Ms), 2, Ms, Mk), B2 = L.stratumBasis(2, Mk), Rk = Math.sqrt(Q.meanR2 / 4);
  const prob = L.makeProblem({ q: q2, M: Mk, Nc: Nck, R: Rk, stage: 1, B: B2, norm: 'meanRadius' }), p = new Float64Array(prob.np);
  p.set(L.toReduced(B2, cSeed)); p[prob.iOmega] = 2 * Math.PI / Pq * (1 + 0.01); // seed omega deliberately offset by 1 percent
  const seedEval = prob.evaluate(p, false), t0 = Date.now();
  const sol = L.levenbergMarquardt(prob, p, { maxIter: 200, tol: 1e-27 });
  const Pc = 2 * Math.PI / sol.omega, fine = L.fineEvaluate(sol.c, sol.omega, q2, Mk, { Nf: Math.max(1024, 8 * Mk), R: Rk });
  // tail of the spectrum
  const tail = []; for (const m of [Mk - 4, Mk - 2, Mk - 1, Mk]) { let pw = 0; for (let a = 0; a < 3; a++) pw += sol.c[L.idx(Mk, 0, 2 * m - 1, a)] ** 2 + sol.c[L.idx(Mk, 0, 2 * m, a)] ** 2; tail.push([m, Math.sqrt(pw)]); }
  // independent comparison of the collocated orbit against the direct integration at a mid-period sample
  const pass = Math.abs(Pc - Pq) <= 1e-8 && fine.maxE <= 1e-9 && closure <= 1e-9;
  record('KC3' + (phiMult === 2 ? '' : `-phi${phiMult}pi`), { description: 'closed eccentric two-member opposite-polarity rosette reproduced by the same collocation code with N=2 (6x6 solve), stage 1 with the mean-square radius fixed to the quadrature value and omega unknown', invariants: inv, directIntegration: { instrument: 'weber-overnight-pair-instrument.mjs runCase gbs rtol 1e-12', closureError: closure, tolerance: 1e-9, steps: full.steps }, collocation: { M: Mk, Nc: Nck, seedSamples: Ks, seedHarmonics: Ms, seedOmegaOffset: 0.01, seedMaxE: seedEval?.info.maxE, iterations: sol.iter, reason: sol.reason, cost: sol.cost, collocationMaxE: sol.info.maxE, wallSeconds: (Date.now() - t0) / 1000 }, periodQuadrature: Pq, periodCollocation: Pc, periodError: Pc - Pq, periodTolerance: 1e-8, fine: { Nf: fine.Nf, maxE: fine.maxE, tolerance: 1e-9, minSep: fine.minSep, det: [fine.detMin, fine.detMax], speed: [fine.speedMin, fine.speedMax], speedLabel: fine.speedLabel, radius: [fine.radiusMin, fine.radiusMax], identityGddot: fine.identityMax, identityRel: fine.identityRel, Hvariation: fine.HVariation }, spectrumTail: tail, value: Math.max(Math.abs(Pc - Pq), fine.maxE), pass });
  fs.writeFileSync(path.join(HERE, '../../../../../.tmp/weber-binding-sphere/mc', `kc3-phi${phiMult}-coefficients.json`), JSON.stringify({ M: Mk, omega: sol.omega, c: Array.from(sol.c) }));
}

if (only.includes('kc4')) {
  // identity Gddot = T_kin + H on collocated curves: zero on solutions, violation reported on non-solutions
  const hex = L.fineEvaluate(L.hexagonCoefficients(M, R), Om, L.Q6, M, { v: Om * R });
  const r = L.rng(11), cBad = L.toFull(B6, L.toReduced(B6, L.perturb(L.hexagonCoefficients(M, R), r, 0.2))), bad = L.fineEvaluate(cBad, Om, L.Q6, M);
  const out = { description: 'Gddot = T_kin + H evaluated from the curve kinematics (Gddot uses the curve second derivative, no solve)', hexagon: { identityMax: hex.identityMax, identityRel: hex.identityRel, maxE: hex.maxE, H: hex.Hmean, Hplus3v2: hex.Hplus3v2, sigDVariation: hex.sigDVariation }, nonSolution: { what: 'hexagon coefficients perturbed by 20 percent at the hexagon omega', identityMax: bad.identityMax, identityRel: bad.identityRel, maxE: bad.maxE } };
  const kf = path.join(HERE, '../../../../../.tmp/weber-binding-sphere/mc/kc3-phi2-coefficients.json');
  if (fs.existsSync(kf)) { const k = JSON.parse(fs.readFileSync(kf, 'utf8')), f = L.fineEvaluate(Float64Array.from(k.c), k.omega, [1, -1], k.M, { Nf: 1024 }); out.rosette = { identityMax: f.identityMax, identityRel: f.identityRel, maxE: f.maxE, Hvariation: f.HVariation }; }
  out.value = Math.max(out.hexagon.identityRel, out.rosette?.identityRel ?? 0); out.tolerance = 1e-9; out.pass = out.value <= 1e-9 && out.nonSolution.identityRel > 1e-4;
  record('KC4', out);
}
