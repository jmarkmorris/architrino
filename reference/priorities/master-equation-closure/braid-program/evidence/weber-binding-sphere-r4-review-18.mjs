#!/usr/bin/env node
// weber-binding-sphere-r4-review-18.mjs — adversarial checks of the reference lane's Section 18 (great-circle class),
// with the geometry lane's own code: (a) the pair identities (18.1)-(18.3) on random great-circle pairs; (b) the sign
// and decay of the Fourier coefficients of sqrt(1 - k cos tau); (d) kappa and phase values of the orthogonal F2 triad.
import path from 'node:path';
import { HERE, utc, log, writeJson, v3, rng, randomUnit } from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';
const RECEIPT = path.join(HERE, 'weber-binding-sphere-r4-review-18.json'), rec = { subject: 'review of reference Section 18', started: utc() };
const rand = rng(1803);
// great-circle member: oriented normal m, phase phi; X(T) = cos(Om T + phi) u + sin(Om T + phi) u', right-handed about m
function member(m, phi) { const a = Math.abs(m[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]; const u = v3.unit(v3.cross(m, a)), up = v3.cross(m, u); return { m, phi, u, up }; }
const X = (mb, Om, T) => { const th = Om * T + mb.phi; return v3.add(v3.scale(mb.u, Math.cos(th)), v3.scale(mb.up, Math.sin(th))); };
const V = (mb, Om, T) => { const th = Om * T + mb.phi; return v3.scale(v3.add(v3.scale(mb.u, -Math.sin(th)), v3.scale(mb.up, Math.cos(th))), Om); };
// (a) pair identities: extract C, A, alpha from X_i.X_j sampled over one period, compare A with (1 - m_i.m_j)/2 and the formulas for d^2, d-dot, |w|^2 and the bracket
let worstA = 0, worstD = 0, worstDd = 0, worstW = 0, worstB = 0, worstMean = 0;
for (let s = 0; s < 200; s++) {
  const Om = 0.3 + rand(), mi = member(randomUnit(rand), 2 * Math.PI * rand()), mj = member(randomUnit(rand), 2 * Math.PI * rand());
  const N = 256, dots = []; for (let k = 0; k < N; k++) dots.push(v3.dot(X(mi, Om, k * Math.PI / Om / N), X(mj, Om, k * Math.PI / Om / N)));
  // Fourier at frequency 2 Omega over the half period pi/Omega (one cycle of tau)
  let c0 = 0, cr = 0, ci = 0, c2r = 0; for (let k = 0; k < N; k++) { const t = 2 * Math.PI * k / N; c0 += dots[k] / N; cr += 2 * dots[k] * Math.cos(t) / N; ci += 2 * dots[k] * Math.sin(t) / N; c2r += 2 * dots[k] * Math.cos(2 * t) / N; }
  const A = Math.hypot(cr, ci), alpha = Math.atan2(-ci, cr), Aref = 0.5 * (1 - v3.dot(mi.m, mj.m));
  worstA = Math.max(worstA, Math.abs(A - Aref)); worstMean = Math.max(worstMean, Math.abs(c2r)); // no 4 Omega component
  for (const T of [0.11, 0.7, 1.9, 3.3, 5.2]) {
    const xi = X(mi, Om, T), xj = X(mj, Om, T), vi = V(mi, Om, T), vj = V(mj, Om, T), d = v3.sub(xi, xj), dn = v3.norm(d), w = v3.sub(vi, vj), tau = 2 * Om * T + alpha;
    const d2 = 2 * (1 - c0) - 2 * A * Math.cos(tau), ddot = v3.dot(d, w) / dn, ddotRef = 2 * A * Om * Math.sin(tau) / dn, w2 = v3.dot(w, w), w2Ref = Om * Om * (dn * dn + 4 * A * Math.cos(tau));
    // bracket with centripetal accelerations: 1 - ddot^2/2 + d * dddot, dddot = e.(A_i - A_j) + |w_perp|^2/d with A = -Om^2 X
    const e = v3.scale(d, 1 / dn), dA = v3.scale(d, -Om * Om), wperp2 = w2 - ddot * ddot, dddot = v3.dot(e, dA) + wperp2 / dn;
    const br = 1 - ddot * ddot / 2 + dn * dddot, brRef = 1 + 4 * A * Om * Om * Math.cos(tau) - 6 * A * A * Om * Om * Math.sin(tau) ** 2 / (dn * dn);
    worstD = Math.max(worstD, Math.abs(dn * dn - d2)); worstDd = Math.max(worstDd, Math.abs(ddot - ddotRef)); worstW = Math.max(worstW, Math.abs(w2 - w2Ref)); worstB = Math.max(worstB, Math.abs(br - brRef));
  }
}
rec.a = { pairs: 200, timesPerPair: 5, worstA_vs_halfOneMinusDot: worstA, worst4OmegaComponent: worstMean, worstD2: worstD, worstDdot: worstDd, worstW2: worstW, worstBracket: worstB };
log(`(a) identities: A - (1-m.m)/2 ${worstA.toExponential(2)}; 4-Omega leak ${worstMean.toExponential(2)}; d^2 ${worstD.toExponential(2)}; d-dot ${worstDd.toExponential(2)}; |w|^2 ${worstW.toExponential(2)}; bracket (18.3) ${worstB.toExponential(2)}`);
// (b) Fourier coefficients of sqrt(1 - k cos tau)
rec.b = [];
for (const k of [0.1, 0.5, 0.9, 0.99]) {
  const N = 1 << 14, c = []; for (let m = 0; m <= 40; m++) { let s = 0; for (let j = 0; j < N; j++) { const t = 2 * Math.PI * j / N; s += Math.sqrt(1 - k * Math.cos(t)) * Math.cos(m * t); } c.push((m ? 2 : 1) * s / N); }
  const rho = 1 / k - Math.sqrt(1 / k / k - 1), ratios = []; for (let m = 2; m <= 40; m++) ratios.push(c[m] / c[m - 1]);
  const allNeg = c.slice(1).every(z => z < 0), pred = m => rho * Math.pow((m - 1) / m, 1.5);
  const relDev = []; for (let m = 10; m <= 40; m++) relDev.push(Math.abs(ratios[m - 2] / pred(m) - 1));
  rec.b.push({ k, rho, firstCoefficients: c.slice(1, 7), allNegativeTo40: allNeg, smallestMagnitude: Math.min(...c.slice(1).map(Math.abs)), ratioAt20: ratios[18], predictedRatioAt20: pred(20), worstRelDeviationM10to40: Math.max(...relDev), ratioAt40: ratios[38], predictedRatioAt40: pred(40) });
  log(`(b) k=${k}: c1..c4 ${c.slice(1, 5).map(z => z.toExponential(3)).join(', ')}; all negative to m=40: ${allNeg}; ratio c20/c19 ${ratios[18].toFixed(6)} vs rho (19/20)^1.5 = ${pred(20).toFixed(6)}; worst relative deviation of the ratio from the Darboux form for m in [10,40]: ${Math.max(...relDev).toExponential(2)}; |c40| ${Math.abs(c[40]).toExponential(2)}`);
}
// (d) orthogonal F2 triad: kappa and phases of the twelve cross pairs for three phase choices; sign-weighted sums per phase group at the minimal kappa
rec.d = [];
for (const phis of [[0, 0, 0], [0, 2 * Math.PI / 3, 4 * Math.PI / 3], [0.3, 1.1, 2.0]]) {
  const normals = [[0, 0, 1], [1, 0, 0], [0, 1, 0]], mem = [], q = [];
  for (let k = 0; k < 3; k++) { const mb = member(normals[k], phis[k]); mem.push({ ...mb, sign: 1 }, { ...mb, sign: -1 }); q.push(1, -1); }
  const Om = 0.5, pairs = [];
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) {
    if (Math.floor(i / 2) === Math.floor(j / 2)) { pairs.push({ i, j, rigid: true }); continue; }
    const N = 256, dots = []; for (let k = 0; k < N; k++) { const T = k * Math.PI / Om / N; dots.push(v3.dot(v3.scale(X(mem[i], Om, T), mem[i].sign), v3.scale(X(mem[j], Om, T), mem[j].sign))); }
    let c0 = 0, cr = 0, ci = 0; for (let k = 0; k < N; k++) { const t = 2 * Math.PI * k / N; c0 += dots[k] / N; cr += 2 * dots[k] * Math.cos(t) / N; ci += 2 * dots[k] * Math.sin(t) / N; }
    const A = Math.hypot(cr, ci), alpha = ((Math.atan2(-ci, cr) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI), C = c0, kappa = (1 - C) / A, a = 2 * (1 - C);
    pairs.push({ i, j, sigma: q[i] * q[j], C, A, alphaDeg: alpha * 180 / Math.PI, kappa, sqrtA: Math.sqrt(a), dmin: Math.sqrt(a - 2 * A) });
  }
  const nr = pairs.filter(p => !p.rigid), kmin = Math.min(...nr.map(p => p.kappa)), S = nr.filter(p => Math.abs(p.kappa - kmin) < 1e-9);
  const groups = {}; for (const p of S) { const key = Math.round(p.alphaDeg / 1) % 360; groups[key] = (groups[key] ?? 0) + p.sigma * p.sqrtA; }
  rec.d.push({ phases: phis, pairs: nr.map(p => ({ pair: [p.i, p.j], sigma: p.sigma, C: +p.C.toFixed(6), A: +p.A.toFixed(6), alphaDeg: +p.alphaDeg.toFixed(2), kappa: +p.kappa.toFixed(6), dmin: +p.dmin.toFixed(6) })), minimalKappa: kmin, minimalSetSize: S.length, phaseGroupWeights: groups, excludedByTheorem: Object.values(groups).some(w => Math.abs(w) > 1e-9) });
  log(`(d) phases ${phis.map(p => (p * 180 / Math.PI).toFixed(0)).join('/')} deg: minimal kappa ${kmin.toFixed(6)} attained by ${S.length} of 12 cross pairs; phase-group weights sum sigma sqrt(a): ${JSON.stringify(Object.fromEntries(Object.entries(groups).map(([k, v]) => [k, +v.toFixed(6)])))} -> ${Object.values(groups).some(w => Math.abs(w) > 1e-9) ? 'excluded (a group does not cancel)' : 'not excluded by the lemma'}`);
}
rec.finished = utc(); writeJson(RECEIPT, rec); log(`receipt ${path.relative(REPO_ROOT, RECEIPT)}`);
