// weber-binding-sphere-gc-checks.mjs
// Great-circle closure lane (2026-10-06): numerical spot checks of the derived identities in
// analysis/weber-binding-sphere-great-circle-closure.md. These are checks of identities on random
// instances, not searches. K = c_f = 1 in every number. Known cases run first and the script stops
// if one fails. Usage: node weber-binding-sphere-gc-checks.mjs   (writes weber-binding-sphere-gc-checks.json)
import { writeFileSync } from 'node:fs';
import * as G from './weber-binding-sphere-gc-lib.mjs';
import { lawResidual } from './weber-binding-sphere-reference-lib.mjs';
import { assemble } from '../../binary-research/evidence/weber-frequency-reference-law.mjs';

const out = { script: 'weber-binding-sphere-gc-checks.mjs', startedUTC: new Date().toISOString(), law: { K: 1, c_f: 1 }, seed: 20261006 };
const log = (...a) => console.log(...a);
const rng = G.makeRng(out.seed);
const Q6 = [1, 1, 1, -1, -1, -1];
const OmHex = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));
const hexagon = () => [0, 2, 4, 1, 3, 5].map((k, idx) => G.memberFromNormal([0, 0, 1], (k * Math.PI) / 3, Q6[idx]));
const angDiff = (a, b) => { let d = (a - b) % (2 * Math.PI); if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; return d; };
function goodConfig(members) { // collision-free, no nearly rigid and no nearly colliding pair
  for (let i = 0; i < members.length; i++) for (let j = i + 1; j < members.length; j++) {
    const v = G.pairInvariants(members[i], members[j]); if (v.A < 0.05 || v.kappa < 1.05) return false;
  }
  return true;
}
function drawConfig(q = Q6) { for (;;) { const m = G.randomConfig(rng, q); if (goodConfig(m)) return m; } }

// =========== Check 1: known cases ===========
{
  let worstScalar = 0, worstVector = 0, worstClosedForm = 0, typical = 0;
  for (let n = 0; n < 10; n++) {
    const members = G.randomConfig(rng); const Omega = 0.3 + 1.7 * rng.next(); const T = 10 * rng.next();
    const { F, X, V } = G.closedF(members, Omega, 1, T);
    const state = { X, V, q: Q6 }; const Acand = X.map((x) => G.scale(x, -Omega * Omega));
    const mine = Math.max(...F.map(G.norm)); const frozen = lawResidual(state, Acand);
    worstScalar = Math.max(worstScalar, Math.abs(mine - frozen) / frozen); typical += frozen / 10;
    // vector comparison: closed residual vector = b - M a_cand from the frozen assembly
    const { M, b } = assemble(state); const a = Acand.flat();
    for (let r = 0; r < 18; r++) { let s = b[r]; for (let k = 0; k < 18; k++) s -= M[r][k] * a[k]; worstVector = Math.max(worstVector, Math.abs(s - F[Math.floor(r / 3)][r % 3]) / frozen); }
    // closed form in tau against the direct evaluation
    for (let i = 0; i < 6; i++) {
      let f = G.scale(X[i], Omega * Omega);
      for (let j = 0; j < 6; j++) if (j !== i) f = G.add(f, G.scale(G.sub(X[i], X[j]), G.wClosedForm(members[i], members[j], Omega, 1, T)));
      worstClosedForm = Math.max(worstClosedForm, G.norm(G.sub(f, F[i])) / frozen);
    }
  }
  const hex = hexagon(); let hexMax = 0, hexOff = 0, hexComplex = 0;
  for (let k = 0; k < 16; k++) {
    const T = (k * 2 * Math.PI) / OmHex / 16;
    hexMax = Math.max(hexMax, ...G.closedF(hex, OmHex, 1, T).F.map(G.norm));
    hexOff = Math.max(hexOff, ...G.closedF(hex, 1.1 * OmHex, 1, T).F.map(G.norm));
  }
  for (let i = 0; i < 6; i++) { // complex-time evaluator on the hexagon: every pair is rigid, F vanishes for complex T too
    const tr = G.makeTracker(hex, OmHex, 1, i, 0.3); G.walkTo(hex, OmHex, 1, tr, [0.7, 0.9], 50);
    hexComplex = Math.max(hexComplex, G.vnorm(G.complexF(hex, OmHex, 1, tr).F));
  }
  // complex evaluator at real time equals the real evaluator
  let realVsComplex = 0;
  { const members = drawConfig(); const Omega = 0.9;
    const { F } = G.closedF(members, Omega, 1, 0.4);
    for (let i = 0; i < 6; i++) { const tr = G.makeTracker(members, Omega, 1, i, 0.4); const Fc = G.complexF(members, Omega, 1, tr).F; realVsComplex = Math.max(realVsComplex, G.vnorm(G.vsub(Fc, G.vc(F[i]))) / G.norm(F[i])); } }
  out.check1 = { tenRandomStates: { relDiffMaxNormVsFrozenLawResidual: worstScalar, relDiffVectorVsFrozenAssembly: worstVector, relDiffClosedFormInTau: worstClosedForm, meanFrozenResidual: typical }, hexagon: { maxAbsF_atOmegaHex: hexMax, maxAbsF_at1p1OmegaHex: hexOff, maxAbsF_complexTime: hexComplex }, complexEvaluatorAtRealTime_relDiff: realVsComplex };
  log('check 1', JSON.stringify(out.check1));
  const pass = worstScalar < 1e-12 && worstVector < 1e-12 && worstClosedForm < 1e-12 && hexMax < 1e-13 && hexOff > 1e-3 && hexComplex < 1e-12 && realVsComplex < 1e-12;
  out.check1.pass = pass; if (!pass) { writeFileSync(new URL('./weber-binding-sphere-gc-checks.json', import.meta.url), JSON.stringify(out, null, 1)); throw new Error('known case failed'); }
}

// approach T* of pair (i, j) along the horizontal ray T = T* - r, r real > 0, after a vertical leg from the real axis
function approach(members, Omega, R, i, j, radii) {
  const { Tstar, inv } = G.branchPoint(members[i], members[j], Omega);
  const off = (0.1 + 0.2 * rng.next()) / Omega;
  const tr = G.makeTracker(members, Omega, R, i, Tstar[0] - off);
  G.walkTo(members, Omega, R, tr, [Tstar[0] - off, Tstar[1]], 600);
  const rows = [];
  for (const r of radii) {
    G.walkTo(members, Omega, R, tr, [Tstar[0] - r, Tstar[1]], 60);
    const ev = G.complexF(members, Omega, R, tr);
    rows.push({ r, F: ev.F, terms: ev.terms, s: tr.s.slice() });
  }
  return { Tstar, inv, rows, tr };
}

// =========== Check 2: growth exponent and leading coefficient on 50 random configurations ===========
{
  const radii = [1e-2, 1e-3, 1e-4, 1e-5, 1e-6];
  const rec = { configurations: 50, worstExponentDeviation: 0, worstLeadingCoeffRelErr: {}, worstOtherTermsRatio: 0, worstNumeratorRemainderExponentDeviation: 0, worstIsotropy: 0, worstNnorm: Infinity, worstBranchPointD: 0, worstSimpleZero_g_relErr: 0, minAbsSinTauStar: Infinity, monodromy: { singularFlips: 0, othersReturn: 0, trials: 0 }, maxTrackerJump: 0 };
  for (const r of radii) rec.worstLeadingCoeffRelErr[r] = 0;
  let worstRem = []; const remExpos = [];
  for (let n = 0; n < 50; n++) {
    const members = drawConfig(); const Omega = 0.3 + 1.7 * rng.next(); const R = 1;
    const i = Math.floor(6 * rng.next()); let j = Math.floor(5 * rng.next()); if (j >= i) j++;
    const ap = approach(members, Omega, R, i, j, radii);
    const { A, kappa } = ap.inv; const sig = members[i].q * members[j].q;
    // quantities at T*
    const sI = G.stateC(members[i], Omega, R, ap.Tstar), sJ = G.stateC(members[j], Omega, R, ap.Tstar);
    const pd = G.pairD(sI, sJ); const N = pd.dX;
    rec.worstBranchPointD = Math.max(rec.worstBranchPointD, G.cabs(pd.D));
    rec.worstIsotropy = Math.max(rec.worstIsotropy, G.cabs(G.vdot(N, N)) / G.vnorm(N) ** 2);
    rec.worstNnorm = Math.min(rec.worstNnorm, G.vnorm(N));
    const sinTau = [0, Math.sqrt(kappa * kappa - 1)]; // sin(i arccosh kappa) = i sqrt(kappa^2 - 1)
    rec.minAbsSinTauStar = Math.min(rec.minAbsSinTauStar, G.cabs(sinTau));
    const g = G.cscale(sinTau, 4 * Omega * R * R * A); // D'(T*) predicted
    rec.worstSimpleZero_g_relErr = Math.max(rec.worstSimpleZero_g_relErr, G.cabs(G.csub(pd.Dd, g)) / G.cabs(g));
    // predicted leading vector coefficient of s^5 F_i at T*: -6 sigma Omega^2 R^4 A^2 sin^2(tau*) N
    const lead = G.vscale(N, G.cscale(G.cmul(sinTau, sinTau), -6 * sig * Omega * Omega * R ** 4 * A * A));
    const absF = [], rem = [], others = [];
    for (const row of ap.rows) {
      const s5 = G.cpowi(row.s[j], 5);
      const scaled = G.vscale(row.F, s5);
      rec.worstLeadingCoeffRelErr[row.r] = Math.max(rec.worstLeadingCoeffRelErr[row.r], G.vnorm(G.vsub(scaled, lead)) / G.vnorm(lead));
      absF.push(G.vnorm(row.F));
      rem.push(G.vnorm(G.vsub(scaled, row.terms[j].E)) / G.vnorm(lead)); // should scale as r^{5/2}: others bounded
      others.push(G.vnorm(G.vsub(row.F, row.terms[j].term)));
    }
    // growth exponent of |F_i| between r = 1e-4 and 1e-6
    const expo = Math.log(absF[4] / absF[2]) / Math.log(radii[4] / radii[2]);
    rec.worstExponentDeviation = Math.max(rec.worstExponentDeviation, Math.abs(expo + 2.5));
    // remainder exponent between r = 1e-2 and 1e-3 (before rounding dominates)
    const remExpo = Math.log(rem[1] / rem[0]) / Math.log(radii[1] / radii[0]);
    rec.worstNumeratorRemainderExponentDeviation = Math.max(rec.worstNumeratorRemainderExponentDeviation, Math.abs(remExpo - 2.5));
    const remExpo2 = Math.log(rem[2] / rem[1]) / Math.log(radii[2] / radii[1]); remExpos.push(remExpo2);
    worstRem.push(rem[2]);
    rec.worstOtherTermsRatio = Math.max(rec.worstOtherTermsRatio, Math.abs(others[4] / others[1] - 1));
    // monodromy: one small loop about T*
    const tr = ap.tr; const r0 = 1e-3; G.walkTo(members, Omega, R, tr, [ap.Tstar[0] - r0, ap.Tstar[1]], 40);
    const before = tr.s.slice();
    for (let k = 1; k <= 240; k++) { const an = Math.PI + (2 * Math.PI * k) / 240; G.walkTo(members, Omega, R, tr, [ap.Tstar[0] + r0 * Math.cos(an), ap.Tstar[1] + r0 * Math.sin(an)], 1); }
    rec.monodromy.trials++;
    if (G.cabs(G.cadd(tr.s[j], before[j])) < 1e-9 * G.cabs(before[j])) rec.monodromy.singularFlips++;
    let ok = true; for (let k = 0; k < 6; k++) if (k !== i && k !== j && G.cabs(G.csub(tr.s[k], before[k])) > 1e-9 * G.cabs(before[k])) ok = false;
    if (ok) rec.monodromy.othersReturn++;
    rec.maxTrackerJump = Math.max(rec.maxTrackerJump, tr.maxJump);
  }
  rec.maxNumeratorRemainderAt1em4 = Math.max(...worstRem);
  remExpos.sort((a, b) => a - b); rec.numeratorRemainderExponent_1em3_to_1em4 = { min: remExpos[0], median: remExpos[25], max: remExpos[49] };
  out.check2 = rec; log('check 2', JSON.stringify(rec));
}

// ---------- construction of coincident partners (used by checks 3 and 6) ----------
  const normalOf = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const memOf = (p, q) => G.memberFromNormal(normalOf(p[0], p[1]), p[2], q);
  function coincidenceResidual(mi, target, p) { const v = G.pairInvariants(mi, memOf(p, 1)); return [angDiff(v.alpha, target.alpha), v.kappa - target.kappa]; }
  function solveCoincidence(mi, target, p0) {
    let p = p0.slice();
    for (let it = 0; it < 60; it++) {
      const r = coincidenceResidual(mi, target, p); if (Math.hypot(...r) < 1e-13) return p;
      const J = [[0, 0, 0], [0, 0, 0]]; const h = 1e-6;
      for (let k = 0; k < 3; k++) { const pp = p.slice(); pp[k] += h; const pm = p.slice(); pm[k] -= h; const rp = coincidenceResidual(mi, target, pp), rm = coincidenceResidual(mi, target, pm); J[0][k] = (rp[0] - rm[0]) / (2 * h); J[1][k] = (rp[1] - rm[1]) / (2 * h); }
      // least-norm step: dp = -J^T (J J^T)^-1 r
      const a = J[0][0] ** 2 + J[0][1] ** 2 + J[0][2] ** 2, b = J[0][0] * J[1][0] + J[0][1] * J[1][1] + J[0][2] * J[1][2], d = J[1][0] ** 2 + J[1][1] ** 2 + J[1][2] ** 2;
      const det = a * d - b * b; if (Math.abs(det) < 1e-14) return null;
      const y0 = (d * r[0] - b * r[1]) / det, y1 = (-b * r[0] + a * r[1]) / det;
      let stepN = 0; const dp = [0, 1, 2].map((k) => { const v = -(J[0][k] * y0 + J[1][k] * y1); stepN += v * v; return v; });
      const damp = Math.min(1, 0.5 / Math.sqrt(stepN)); for (let k = 0; k < 3; k++) p[k] += damp * dp[k];
    }
    return null;
  }
// =========== Check 3: coincidence of complex collision times ===========
{
  // (a) generic non-coincidence: distance in the tau plane between branch points of two partners of one member
  const dists = [];
  for (let n = 0; n < 50; n++) {
    const members = drawConfig();
    for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) for (let k = j + 1; k < 6; k++) {
      if (j === i || k === i) continue;
      const a = G.pairInvariants(members[i], members[j]), b = G.pairInvariants(members[i], members[k]);
      dists.push(Math.hypot(angDiff(a.alpha, b.alpha), Math.acosh(a.kappa) - Math.acosh(b.kappa)));
    }
  }
  dists.sort((x, y) => x - y);
  out.check3a = { partnerPairsTested: dists.length, minBranchPointDistanceInTau: dists[0], median: dists[Math.floor(dists.length / 2)], countBelow1em3: dists.filter((d) => d < 1e-3).length };
  log('check 3a', JSON.stringify(out.check3a));

  // (b) constructed coincidences. Two real conditions on j': alpha_ij' = alpha_ij (mod 2 pi), kappa_ij' = kappa_ij.
  // Gauss-Newton with a least-norm step on the three parameters of j' (two normal angles, one phase).
  const rec = { baseTriples: 0, coincidentPartnersConstructed: 0, maxCoincidenceResidual: 0, maxRelErrLockedRoots: 0, minLeadingDefect: { samePolarityProducts: Infinity, oppositePolarityProducts: Infinity }, minIdentityDefect_I: { samePolarityProducts: Infinity, oppositePolarityProducts: Infinity }, minIdentityDefect_II: { samePolarityProducts: Infinity, oppositePolarityProducts: Infinity }, minJointDefect_I_II_overSeparation: { samePolarityProducts: Infinity, oppositePolarityProducts: Infinity }, minLeadingDefectOverSeparation: { samePolarityProducts: Infinity, oppositePolarityProducts: Infinity }, minSeparationOfPartners: Infinity, atMinLeadingDefect: null, Aratio: { min: Infinity, max: 0 }, mirrorCases: 0, blowUp: { tested: 0, worstExponentDeviation: 0, worstLeadingCoeffRelErr: 0 } };
  for (let n = 0; n < 12; n++) {
    const base = drawConfig(); const mi = base[0], mj = base[1]; const Omega = 0.3 + 1.7 * rng.next(); const R = 1;
    const target = G.pairInvariants(mi, mj); rec.baseTriples++;
    const bi = G.bVec(mi), bj = G.bVec(mj); const { Tstar } = G.branchPoint(mi, mj, Omega);
    const Xi = G.stateC(mi, Omega, R, Tstar).X, Nj = G.vsub(Xi, G.stateC(mj, Omega, R, Tstar).X);
    for (let s = 0; s < 60; s++) {
      const p = solveCoincidence(mi, target, [Math.acos(2 * rng.next() - 1), 2 * Math.PI * rng.next(), 2 * Math.PI * rng.next()]);
      if (!p) continue;
      const mk = memOf(p, 1); const vk = G.pairInvariants(mi, mk); const bk = G.bVec(mk);
      const sep = G.vnorm(G.vsub(bk, bj)); if (sep < 1e-3 || vk.A < 0.02) continue; // the partner itself, or nearly rigid
      rec.coincidentPartnersConstructed++; rec.minSeparationOfPartners = Math.min(rec.minSeparationOfPartners, sep);
      rec.maxCoincidenceResidual = Math.max(rec.maxCoincidenceResidual, Math.hypot(...coincidenceResidual(mi, target, p)));
      rec.Aratio.min = Math.min(rec.Aratio.min, vk.A / target.A); rec.Aratio.max = Math.max(rec.Aratio.max, vk.A / target.A);
      const Nk = G.vsub(Xi, G.stateC(mk, Omega, R, Tstar).X);
      // leading-order (order -5/2) cancellation defect at T*: sigma_j A_j^-1/2 N_j + sigma_k A_k^-1/2 N_k, both relative signs
      // identity (I) defect on the b vectors, both relative signs
      const cj = 1 / Math.sqrt(target.A), ck = 1 / Math.sqrt(vk.A);
      for (const [name, sgn] of [['samePolarityProducts', 1], ['oppositePolarityProducts', -1]]) {
        const lead = G.vnorm(G.vadd(G.vscale(Nj, [cj, 0]), G.vscale(Nk, [sgn * ck, 0]))) / (cj * G.vnorm(Nj) + ck * G.vnorm(Nk));
        const I = G.vnorm(G.vadd(G.vscale(G.vsub(bi, bj), [cj, 0]), G.vscale(G.vsub(bi, bk), [sgn * ck, 0]))) / (cj * G.vnorm(G.vsub(bi, bj)) + ck * G.vnorm(G.vsub(bi, bk)));
        if (lead < rec.minLeadingDefect[name]) { rec.minLeadingDefect[name] = lead; if (name === 'oppositePolarityProducts' || !rec.atMinLeadingDefect) rec.atMinLeadingDefect = { name, lead, partnerSeparation: sep, Aratio: vk.A / target.A }; }
        rec.minIdentityDefect_I[name] = Math.min(rec.minIdentityDefect_I[name], I);
        // next order: identity (II) defect, weights A^-3/2, and the joint defect max(I, II)
        const dj = Math.pow(target.A, -1.5), dk = Math.pow(vk.A, -1.5);
        const II = G.vnorm(G.vadd(G.vscale(G.vsub(bi, bj), [dj, 0]), G.vscale(G.vsub(bi, bk), [sgn * dk, 0]))) / (dj * G.vnorm(G.vsub(bi, bj)) + dk * G.vnorm(G.vsub(bi, bk)));
        rec.minIdentityDefect_II[name] = Math.min(rec.minIdentityDefect_II[name], II);
        rec.minJointDefect_I_II_overSeparation[name] = Math.min(rec.minJointDefect_I_II_overSeparation[name], Math.max(I, II) / sep);
        rec.minLeadingDefectOverSeparation[name] = Math.min(rec.minLeadingDefectOverSeparation[name], lead / sep);
      }
      // blow-up test on a six-member configuration containing i, j and the coincident partner, both polarity patterns
      if (s % 10 === 0) {
        for (const qs of [[1, 1, 1, -1, -1, -1], [1, 1, -1, 1, -1, -1], [1, -1, -1, 1, 1, -1]]) {
          let members; for (;;) { const rest = G.randomConfig(rng, qs.slice(3)); members = [{ ...mi, q: qs[0] }, { ...mj, q: qs[1] }, { ...mk, q: qs[2] }, ...rest]; if (goodConfig(members.filter((_, x) => x !== 2)) && rest.every((m) => G.pairInvariants(m, mk).A > 0.05 && G.pairInvariants(m, mk).kappa > 1.05)) break; }
          const radii = [1e-3, 1e-4, 1e-5, 1e-6]; const ap = approach(members, Omega, R, 0, 1, radii);
          const absF = ap.rows.map((row) => G.vnorm(row.F));
          const expo = Math.log(absF[3] / absF[1]) / Math.log(radii[3] / radii[1]);
          rec.blowUp.tested++; rec.blowUp.worstExponentDeviation = Math.max(rec.blowUp.worstExponentDeviation, Math.abs(expo + 2.5));
          // locked roots: s_ik / s_ij = sqrt(A_k / A_j) along the whole path
          const row = ap.rows[3]; const ratio = G.cdiv(row.s[2], row.s[1]);
          rec.maxRelErrLockedRoots = Math.max(rec.maxRelErrLockedRoots, G.cabs(G.csub(ratio, [Math.sqrt(vk.A / target.A), 0])) / Math.sqrt(vk.A / target.A));
          // predicted leading coefficient of s_ij^5 F_i: sum over the class of E_j(T*) (A_j / A_k)^{5/2}
          const st = members.map((m) => G.stateC(m, Omega, R, ap.Tstar));
          const Ej = G.pairE(qs[0] * qs[1], G.pairD(st[0], st[1])), Ek = G.pairE(qs[0] * qs[2], G.pairD(st[0], st[2]));
          const lead = G.vadd(Ej, G.vscale(Ek, [Math.pow(target.A / vk.A, 2.5), 0]));
          const scaled = G.vscale(row.F, G.cpowi(row.s[1], 5));
          rec.blowUp.worstLeadingCoeffRelErr = Math.max(rec.blowUp.worstLeadingCoeffRelErr, G.vnorm(G.vsub(scaled, lead)) / G.vnorm(lead));
        }
      }
    }
    // the mirror image of j in the plane of circle i is always a coincident partner with the same A
    const refl = (v) => G.sub(v, G.scale(mi.m, 2 * G.dot(v, mi.m)));
    const mm = { m: G.scale(refl(mj.m), -1), u: refl(mj.u), up: refl(mj.up), phi: mj.phi, q: 1 };
    const vm = G.pairInvariants(mi, mm);
    if (Math.abs(angDiff(vm.alpha, target.alpha)) < 1e-12 && Math.abs(vm.kappa - target.kappa) < 1e-10 && Math.abs(vm.A - target.A) < 1e-12 && Math.abs(vm.Anormal - vm.A) < 1e-12) rec.mirrorCases++;
  }
  out.check3b = rec; log('check 3b', JSON.stringify(rec));
}

// =========== Check 4: closed-form identities and the combinatorial lemma ===========
{
  const rec = {};
  // (a) pair kinematics with R explicit: A = (1 - m_i.m_j)/2, X_i.X_j = R^2 (C + A cos tau), D, and the bracket
  let e1 = 0, e2 = 0, e3 = 0, e4 = 0, e5 = 0, e10 = 0;
  for (let n = 0; n < 200; n++) {
    const mi = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), 1), mj = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), -1);
    const R = 0.5 + 1.5 * rng.next(), Omega = 0.3 + 1.7 * rng.next(), T = 10 * rng.next();
    const v = G.pairInvariants(mi, mj); e1 = Math.max(e1, Math.abs(v.A - v.Anormal));
    const tau = 2 * Omega * T + v.alpha;
    const si = G.stateC(mi, Omega, R, [T, 0]), sj = G.stateC(mj, Omega, R, [T, 0]);
    e2 = Math.max(e2, Math.abs(G.vdot(si.X, sj.X)[0] - R * R * (v.C + v.A * Math.cos(tau))) / (R * R));
    const pd = G.pairD(si, sj); const D = 2 * R * R * (1 - v.C - v.A * Math.cos(tau));
    e3 = Math.max(e3, Math.abs(pd.D[0] - D) / D);
    const bracketDirect = 1 + pd.Ddd[0] / 2 - (3 / 8) * pd.Dd[0] ** 2 / pd.D[0];
    const bracketClosed = 1 + 4 * Omega * Omega * R * R * v.A * Math.cos(tau) - 6 * Omega * Omega * R ** 4 * v.A * v.A * Math.sin(tau) ** 2 / D;
    e4 = Math.max(e4, Math.abs(bracketDirect - bracketClosed) / (1 + Math.abs(bracketClosed)));
    // antipodal partner: alpha shifts by pi, A unchanged, C changes sign
    const anti = { ...mj, phi: mj.phi + Math.PI }; const va = G.pairInvariants(mi, anti);
    e5 = Math.max(e5, Math.abs(Math.abs(angDiff(va.alpha, v.alpha)) - Math.PI), Math.abs(va.A - v.A), Math.abs(va.C + v.C));
    // a second member on the oriented circle of j, leading j by delta (built with an independently drawn in-plane basis):
    // b_j' = e^{i delta} b_j, so alpha shifts by delta and A is unchanged
    { const delta = 0.1 + 6 * rng.next(); const rot = 7 * rng.next();
      const u2 = G.add(G.scale(mj.u, Math.cos(rot)), G.scale(mj.up, Math.sin(rot))); const up2 = G.cross(mj.m, u2);
      const same = { m: mj.m, u: u2, up: up2, phi: mj.phi + delta - rot, q: 1 }; const vs = G.pairInvariants(mi, same);
      const bj = G.bVec(mj), bs = G.bVec(same); const ph = [Math.cos(delta), Math.sin(delta)];
      e10 = Math.max(e10, G.vnorm(G.vsub(bs, G.vscale(bj, ph))), Math.abs(angDiff(vs.alpha, v.alpha + delta)), Math.abs(vs.A - v.A), G.pairInvariants(mj, same).A);
      const sj2 = G.stateC(same, Omega, R, [T, 0]); const lead = G.add(G.scale(sj.X.map((x) => x[0]), Math.cos(delta)), G.scale(G.cross(mj.m, sj.X.map((x) => x[0])), Math.sin(delta)));
      e10 = Math.max(e10, G.norm(G.sub(sj2.X.map((x) => x[0]), lead)) / R); }
  }
  rec.pairKinematics = { pairs: 200, A_vs_normals: e1, XdotX: e2, D: e3, bracketWithR: e4, antipodalShift: e5, sameCirclePhaseShift: e10 };
  // (b) class-sum identity on a class of two (mirror construction) and of three (mirror plus coincident partner):
  //     sum_S w_ij (X_i - X_j) = (2 R^2 h)^{-5/2} [ 2 R^2 h Y_{3/2} + Omega^2 R^4 g Y_{1/2} ],
  //     Y_a = sum_S sigma_ij A_ij^{-a} (X_i - X_j), h = kappa - cos tau, g = -6 + 8 kappa cos tau - 2 cos^2 tau
  let e6 = 0, e7 = 0; let cases = 0;
  for (let n = 0; n < 40; n++) {
    const mi = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), 1), mj = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), rng.next() < 0.5 ? 1 : -1);
    const v = G.pairInvariants(mi, mj); if (v.A < 0.05 || v.kappa < 1.05) continue;
    const refl = (x) => G.sub(x, G.scale(mi.m, 2 * G.dot(x, mi.m)));
    const mk = { m: G.scale(refl(mj.m), -1), u: refl(mj.u), up: refl(mj.up), phi: mj.phi, q: rng.next() < 0.5 ? 1 : -1 };
    const S = [mj, mk]; const R = 0.5 + 1.5 * rng.next(), Omega = 0.3 + 1.7 * rng.next(); cases++;
    for (let t = 0; t < 5; t++) {
      const T = 10 * rng.next(); const tau = 2 * Omega * T + v.alpha; const h = v.kappa - Math.cos(tau); const g = -6 + 8 * v.kappa * Math.cos(tau) - 2 * Math.cos(tau) ** 2;
      const si = G.stateC(mi, Omega, R, [T, 0]);
      let direct = [0, 0, 0], Y32 = [0, 0, 0], Y12 = [0, 0, 0];
      for (const mp of S) {
        const vp = G.pairInvariants(mi, mp); const sp = G.stateC(mp, Omega, R, [T, 0]); const pd = G.pairD(si, sp);
        const dX = pd.dX.map((x) => x[0]); const sig = mi.q * mp.q;
        const w = sig * Math.pow(pd.D[0], -1.5) * (1 + pd.Ddd[0] / 2 - (3 / 8) * pd.Dd[0] ** 2 / pd.D[0]);
        direct = G.add(direct, G.scale(dX, w));
        Y32 = G.add(Y32, G.scale(dX, sig * Math.pow(vp.A, -1.5))); Y12 = G.add(Y12, G.scale(dX, sig * Math.pow(vp.A, -0.5)));
        e7 = Math.max(e7, Math.abs(pd.D[0] - 2 * R * R * vp.A * h) / pd.D[0]);
      }
      const closed = G.scale(G.add(G.scale(Y32, 2 * R * R * h), G.scale(Y12, Omega * Omega * R ** 4 * g)), Math.pow(2 * R * R * h, -2.5));
      e6 = Math.max(e6, G.norm(G.sub(direct, closed)) / (G.norm(direct) + G.norm(closed) + 1e-300));
    }
  }
  rec.classSumIdentity = { classes: cases, relErr: e6, relErr_D_equals_2R2A_h: e7 };
  // (c) Fourier form: Y(T) = (R/2)(z y + conj(y)/z) with y = sum_S c_j (b_i - b_j); the order -5/2 cancellation at one
  //     branch point, sum_S c_j N_j(T*) = 0, forces y = 0 because |z*|^2 = rho != 1. Checked: N_j(T*) = (R/2)(z* beta + conj(beta)/z*).
  let e8 = 0, e9 = 0;
  for (let n = 0; n < 100; n++) {
    const mi = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), 1), mj = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), 1);
    const v = G.pairInvariants(mi, mj); if (v.A < 0.05 || v.kappa < 1.05) continue;
    const Omega = 0.3 + 1.7 * rng.next(), R = 0.5 + 1.5 * rng.next(); const { Tstar } = G.branchPoint(mi, mj, Omega);
    const z = G.cexp(G.cmul([0, Omega], Tstar)); const beta = G.vsub(G.bVec(mi), G.bVec(mj));
    const N = G.vsub(G.stateC(mi, Omega, R, Tstar).X, G.stateC(mj, Omega, R, Tstar).X);
    const pred = G.vscale(G.vadd(G.vscale(beta, z), G.vscale(G.vconj(beta), G.cdiv([1, 0], z))), [R / 2, 0]);
    e8 = Math.max(e8, G.vnorm(G.vsub(N, pred)) / G.vnorm(N));
    const rho = v.kappa - Math.sqrt(v.kappa * v.kappa - 1); e9 = Math.max(e9, Math.abs(G.cabs(z) ** 2 - rho) / rho);
  }
  rec.fourierForm = { N_from_b_relErr: e8, modZstarSquared_equals_rho_relErr: e9 };
  // (f) Fourier coefficients of the class numerator P(T) = (2 R^2 h)^{5/2} sum_S w_ij (X_i - X_j), evaluated from the law
  //     directly, on mirror classes of two: harmonics above 5 vanish; z^5 coefficient = -(Omega^2 R^5 / 4) e^{2 i alpha} y_{1/2};
  //     z^3 coefficient = -(R^3/2) e^{i alpha} y_{3/2} + Omega^2 R^5 [2 kappa e^{i alpha} y_{1/2} - (1/4) e^{2 i alpha} conj(y_{1/2})]
  let f5 = 0, f3 = 0, fHigh = 0, fcases = 0, fContr = 0;
  for (let n = 0; n < 40; n++) {
    const mi = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), 1), mj = G.memberFromNormal(rng.unitVec(), 7 * rng.next(), rng.next() < 0.5 ? 1 : -1);
    const v = G.pairInvariants(mi, mj); if (v.A < 0.05 || v.kappa < 1.05) continue;
    const refl = (x) => G.sub(x, G.scale(mi.m, 2 * G.dot(x, mi.m)));
    const mk = { m: G.scale(refl(mj.m), -1), u: refl(mj.u), up: refl(mj.up), phi: mj.phi, q: rng.next() < 0.5 ? 1 : -1 };
    const S = [mj, mk]; const R = 0.5 + 1.5 * rng.next(), Omega = 0.3 + 1.7 * rng.next(); fcases++;
    const nT = 32; const coef = (k) => { // k-th Fourier coefficient in z = e^{i Omega T}
      let acc = [[0, 0], [0, 0], [0, 0]];
      for (let l = 0; l < nT; l++) {
        const T = (l * 2 * Math.PI) / Omega / nT; const tau = 2 * Omega * T + v.alpha; const h = v.kappa - Math.cos(tau);
        const si = G.stateC(mi, Omega, R, [T, 0]); let P = [0, 0, 0];
        for (const mp of S) { const sp = G.stateC(mp, Omega, R, [T, 0]); const pd = G.pairD(si, sp); const w = mi.q * mp.q * Math.pow(pd.D[0], -1.5) * (1 + pd.Ddd[0] / 2 - (3 / 8) * pd.Dd[0] ** 2 / pd.D[0]); P = G.add(P, G.scale(pd.dX.map((x) => x[0]), w * Math.pow(2 * R * R * h, 2.5))); }
        const ph = G.cexp([0, -k * Omega * T]); acc = acc.map((a, x) => G.cadd(a, G.cscale(ph, P[x] / nT)));
      }
      return acc;
    };
    const bi = G.bVec(mi); let y12 = [[0, 0], [0, 0], [0, 0]], y32 = [[0, 0], [0, 0], [0, 0]];
    for (const mp of S) { const vp = G.pairInvariants(mi, mp); const beta = G.vsub(bi, G.bVec(mp)); const sg = mi.q * mp.q; y12 = G.vadd(y12, G.vscale(beta, [sg * Math.pow(vp.A, -0.5), 0])); y32 = G.vadd(y32, G.vscale(beta, [sg * Math.pow(vp.A, -1.5), 0])); }
    const e1a = G.cexp([0, v.alpha]), e2a = G.cexp([0, 2 * v.alpha]);
    const c5 = coef(5), c3 = coef(3); const scaleRef = G.vnorm(c5) + G.vnorm(c3) + G.vnorm(coef(1));
    const p5 = G.vscale(y12, G.cscale(e2a, -Omega * Omega * R ** 5 / 4));
    const p3 = G.vadd(G.vscale(y32, G.cscale(e1a, -(R ** 3) / 2)), G.vadd(G.vscale(y12, G.cscale(e1a, 2 * v.kappa * Omega * Omega * R ** 5)), G.vscale(G.vconj(y12), G.cscale(e2a, -Omega * Omega * R ** 5 / 4))));
    f5 = Math.max(f5, G.vnorm(G.vsub(c5, p5)) / scaleRef); f3 = Math.max(f3, G.vnorm(G.vsub(c3, p3)) / scaleRef);
    for (const k of [0, 2, 4, 6, 7, 9]) fHigh = Math.max(fHigh, G.vnorm(coef(k)) / scaleRef);
    // contractions with b_i: b_i . y_{1/2} = -2 e^{i alpha} sum_S sigma A^{1/2},  b_i . y_{3/2} = -2 e^{i alpha} sum_S sigma A^{-1/2}
    { let sHalf = 0, sMinusHalf = 0; for (const mp of S) { const vp = G.pairInvariants(mi, mp); sHalf += mi.q * mp.q * Math.sqrt(vp.A); sMinusHalf += mi.q * mp.q / Math.sqrt(vp.A); }
      fContr = Math.max(fContr, G.cabs(G.csub(G.vdot(bi, y12), G.cscale(e1a, -2 * sHalf))), G.cabs(G.csub(G.vdot(bi, y32), G.cscale(e1a, -2 * sMinusHalf)))); }
  }
  rec.classNumeratorFourier = { classes: fcases, z5_relErr: f5, z3_relErr: f3, maxOtherHarmonics_0_2_4_6_7_9: fHigh, contractionWithB_absErr: fContr };
  // (d) rigid sub-ring lemma: tangential balance function g(Delta) = cos(Delta/2)/sin^2(Delta/2) is strictly decreasing on (0, 2 pi);
  //     three members on one circle: best tangential balance on a grid for (+,+,-) and radial sign for (+,+,+)
  let mono = true; { let prev = Infinity; for (let k = 1; k < 2000; k++) { const D = (k * 2 * Math.PI) / 2000; const gv = Math.cos(D / 2) / Math.sin(D / 2) ** 2; if (!(gv < prev)) mono = false; prev = gv; } }
  let best = Infinity, bestAt = null, radialAllSame = -Infinity;
  const ringResidual = (ths, qs) => { // tangential and radial parts of sum_j sigma (X_i - X_j)/d^3 on the unit circle
    let tanMax = 0; const rad = [];
    for (let i = 0; i < ths.length; i++) { let tg = 0, rd = 0; for (let j = 0; j < ths.length; j++) { if (j === i) continue; const D = ths[j] - ths[i]; const d = 2 * Math.abs(Math.sin(D / 2)); const sgm = qs[i] * qs[j]; tg += -sgm * Math.sin(D) / d ** 3; rd += sgm * (1 - Math.cos(D)) / d ** 3; } tanMax = Math.max(tanMax, Math.abs(tg)); rad.push(rd); }
    return { tanMax, rad };
  };
  for (let a = 1; a < 120; a++) for (let b = a + 1; b < 120; b++) {
    const t1 = (a * 2 * Math.PI) / 120, t2 = (b * 2 * Math.PI) / 120; const minSep = Math.min(t1, t2 - t1, 2 * Math.PI - t2);
    for (const qs of [[1, 1, -1], [1, -1, 1], [-1, 1, 1]]) { const r = ringResidual([0, t1, t2], qs); const score = r.tanMax * (2 * Math.sin(minSep / 2)) ** 2; if (score < best) { best = score; bestAt = { t1, t2, qs, tanMax: r.tanMax }; } }
    radialAllSame = Math.max(radialAllSame, -Math.min(...ringResidual([0, t1, t2], [1, 1, 1]).rad));
  }
  rec.rigidSubRing = { gStrictlyDecreasingOnGrid: mono, threeRingMixedPolarity_minScaledTangentialResidual: best, at: bestAt, threeRingSamePolarity_maxInwardRadial: radialAllSame };
  // hexagon as the positive control of the rigid balance: tangential 0 and radial -Omega_hex^2 for every member
  { const ths = [0, 2, 4, 1, 3, 5].map((k) => (k * Math.PI) / 3); const r = ringResidual(ths, Q6); rec.rigidSubRing.hexagonControl = { tanMax: r.tanMax, radialPlusOmegaHexSq: Math.max(...r.rad.map((x) => Math.abs(x + OmHex * OmHex))) }; }
  // (e) combinatorial lemma: integer partitions of N into circle sizes n with n >= 2 and N - n in {0} or >= 3
  const partitions = (n, max = n) => (n === 0 ? [[]] : Array.from({ length: Math.min(n, max) }, (_, k) => k + 1).flatMap((p) => partitions(n - p, p).map((rest) => [p, ...rest])));
  const survivors = (N) => partitions(N).filter((P) => P.every((p) => p >= 2 && (N - p === 0 || N - p >= 3)));
  rec.partitionCount = { N6_all: partitions(6).length, N6_survivorsOfSizeRules: survivors(6), N4: survivors(4), N5: survivors(5), N7: survivors(7), N8: survivors(8) };
  out.check4 = rec; log('check 4', JSON.stringify(rec));
}
// =========== Check 5: Route B cross-check on real time only ===========
// The odd Fourier coefficients c_k (in z = e^{i Omega T}) of the real-time residual F_i of a configuration whose member i has
// one partner j much closer (in kappa) than the others must follow the Darboux form fixed by the branch point of that pair:
//   c_k ~ 2 (4 R^2 A sqrt(kappa^2 - 1))^{-5/2} E_ij(T_o) z_o^{-k} Gamma(k + 5/2) / (Gamma(5/2) k!),  z_o = e^{i Omega T_o},
//   T_o = (-alpha - i arccosh kappa) / (2 Omega), relative corrections O(1/k). Real-time samples only; no complex-time evaluation of F.
{
  const lgamma = (x) => { const g = 7, cf = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]; x -= 1; let a = cf[0]; const t = x + g + 0.5; for (let k = 1; k < g + 2; k++) a += cf[k] / (x + k); return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a); };
  const rec = { configurations: 0, harmonics: [21, 41, 81, 161], worstRelErr: { 21: 0, 41: 0, 81: 0, 161: 0 }, worstExtrapolatedRelErr: 0, extrapolationHarmonics: [41, 61, 81, 121, 161], evenHarmonicMax: 0, kappaMinRange: [Infinity, 0] };
  let tries = 0;
  while (rec.configurations < 20 && tries < 5e6) {
    tries++;
    const members = G.randomConfig(rng); const inv = [1, 2, 3, 4, 5].map((j) => G.pairInvariants(members[0], members[j]));
    const ks = inv.map((v) => v.kappa); const kmin = Math.min(...ks); const jm = 1 + ks.indexOf(kmin);
    if (kmin < 1.01 || kmin > 1.03 || inv[jm - 1].A < 0.2) continue;
    if (ks.some((k, x) => x !== jm - 1 && k < 1.6)) continue;
    let okAll = true; for (let a = 1; a < 6; a++) for (let b = a + 1; b < 6; b++) { const v = G.pairInvariants(members[a], members[b]); if (v.kappa < 1.05) okAll = false; } if (!okAll) continue;
    const Omega = 0.5 + rng.next(), R = 1; const v = inv[jm - 1];
    rec.configurations++; rec.kappaMinRange = [Math.min(rec.kappaMinRange[0], kmin), Math.max(rec.kappaMinRange[1], kmin)];
    const nT = 8192; const samples = []; for (let l = 0; l < nT; l++) samples.push(G.closedF(members, Omega, R, (l * 2 * Math.PI) / Omega / nT).F[0]);
    const coef = (k) => { let acc = [[0, 0], [0, 0], [0, 0]]; for (let l = 0; l < nT; l++) { const an = (-k * l * 2 * Math.PI) / nT; const ph = [Math.cos(an), Math.sin(an)]; acc = acc.map((a, x) => G.cadd(a, G.cscale(ph, samples[l][x] / nT))); } return acc; };
    const To = [-v.alpha / (2 * Omega), -Math.acosh(v.kappa) / (2 * Omega)];
    const st0 = G.stateC(members[0], Omega, R, To), stj = G.stateC(members[jm], Omega, R, To);
    const E = G.pairE(members[0].q * members[jm].q, G.pairD(st0, stj));
    const pref = 2 * Math.pow(4 * R * R * v.A * Math.sqrt(v.kappa * v.kappa - 1), -2.5);
    for (const k of rec.harmonics) {
      const zk = G.cexp(G.cmul([0, -k * Omega], To)); // z_o^{-k}
      const gam = Math.exp(lgamma(k + 2.5) - lgamma(2.5) - lgamma(k + 1));
      const pred = G.vscale(E, G.cscale(zk, pref * gam)); const ck = coef(k);
      rec.worstRelErr[k] = Math.max(rec.worstRelErr[k], G.vnorm(G.vsub(ck, pred)) / G.vnorm(pred));
    }
    rec.evenHarmonicMax = Math.max(rec.evenHarmonicMax, G.vnorm(coef(40)) / G.vnorm(coef(41)));
    // Neville extrapolation to 1/k -> 0 of v_k = c_k / (pref * gam_k * z_o^{-k}), which should tend to E_ij(T_o)
    const ks2 = [41, 61, 81, 121, 161]; const tab = ks2.map((k) => { const zk = G.cexp(G.cmul([0, -k * Omega], To)); const gam = Math.exp(lgamma(k + 2.5) - lgamma(2.5) - lgamma(k + 1)); return G.vscale(coef(k), G.cdiv([1, 0], G.cscale(zk, pref * gam))); });
    const xs = ks2.map((k) => 1 / k);
    for (let lev = 1; lev < ks2.length; lev++) for (let a = 0; a < ks2.length - lev; a++) tab[a] = G.vadd(G.vscale(tab[a], [-xs[a + lev] / (xs[a] - xs[a + lev]), 0]), G.vscale(tab[a + 1], [xs[a] / (xs[a] - xs[a + lev]), 0]));
    rec.worstExtrapolatedRelErr = Math.max(rec.worstExtrapolatedRelErr, G.vnorm(G.vsub(tab[0], E)) / G.vnorm(E));
  }
  rec.drawsUsed = tries; out.check5 = rec; log('check 5', JSON.stringify(rec));
}
// =========== Check 6: real-time linear independence of one member's pair terms; the polarity inequality ===========
// Consequence of Lemmas 6.3 and 8.1 testable on real time alone: unless a member has a coincidence class of three or more,
// no real combination  sum_j c_j t_j(T) + lambda X_i(T)  of its unsigned pair terms t_j = d^-3 [bracket] (X_i - X_j) and its own
// position vanishes identically. Measured: smallest over largest singular value of the 192 x 6 sample matrix (unit columns).
// Positive control: on the hexagon the combination c_j = sigma_ij, lambda = Omega_hex^2 vanishes, so the ratio must be ~0.
{
  function jacobiEig(Ain) { const n = Ain.length; const A = Ain.map((r) => r.slice());
    for (let sweep = 0; sweep < 60; sweep++) { let off = 0; for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) off += A[p][q] ** 2; if (off < 1e-30) break;
      for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) { if (Math.abs(A[p][q]) < 1e-300) continue; const th = (A[q][q] - A[p][p]) / (2 * A[p][q]); const t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)); const cs = 1 / Math.sqrt(t * t + 1), sn = t * cs;
        for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = cs * akp - sn * akq; A[k][q] = sn * akp + cs * akq; }
        for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = cs * apk - sn * aqk; A[q][k] = sn * apk + cs * aqk; } } }
    return A.map((r, k) => r[k]); }
  function singularRatio(members, Omega) { const nT = 64; const cols = [[], [], [], [], [], []];
    for (let l = 0; l < nT; l++) { const T = (l * 2 * Math.PI) / Omega / nT; const st = members.map((m) => G.stateC(m, Omega, 1, [T, 0]));
      for (let j = 1; j < 6; j++) { const pd = G.pairD(st[0], st[j]); const w = Math.pow(pd.D[0], -1.5) * (1 + pd.Ddd[0] / 2 - (3 / 8) * pd.Dd[0] ** 2 / pd.D[0]); for (let x = 0; x < 3; x++) cols[j - 1].push(w * pd.dX[x][0]); }
      for (let x = 0; x < 3; x++) cols[5].push(st[0].X[x][0]); }
    const nrm = cols.map((cv) => Math.sqrt(cv.reduce((a, v) => a + v * v, 0)));
    const Gm = cols.map((a, x) => cols.map((b, y) => a.reduce((acc, v, k) => acc + v * b[k], 0) / (nrm[x] * nrm[y])));
    const ev = jacobiEig(Gm); return Math.sqrt(Math.max(Math.min(...ev), 0) / Math.max(...ev)); }
  const rec = { random: { configurations: 50, minRatio: Infinity }, withCoincidentClassOfTwo: { configurations: 30, minRatio: Infinity } };
  rec.hexagonControlRatio = singularRatio(hexagon(), OmHex);
  for (let n = 0; n < 50; n++) rec.random.minRatio = Math.min(rec.random.minRatio, singularRatio(drawConfig(), 0.3 + 1.7 * rng.next()));
  let guard = 0;
  for (let n = 0; n < 30 && guard < 100000; ) { guard++; const base = drawConfig(); const mi = base[0], mj = base[1];
    const p = solveCoincidence(mi, G.pairInvariants(mi, mj), [Math.acos(2 * rng.next() - 1), 2 * Math.PI * rng.next(), 2 * Math.PI * rng.next()]); if (!p) continue;
    const members = [mi, mj, memOf(p, base[2].q), base[3], base[4], base[5]]; if (!goodConfig(members)) continue; n++;
    rec.withCoincidentClassOfTwo.minRatio = Math.min(rec.withCoincidentClassOfTwo.minRatio, singularRatio(members, 0.3 + 1.7 * rng.next())); }
  rec.withCoincidentClassOfTwo.drawsUsed = guard;
  // the mirror image of j in the plane of circle i is coincident with j for i but collides with j itself (kappa_jj' = 1)
  { let worst = 0; for (let n = 0; n < 20; n++) { const base = drawConfig(); const mi = base[0], mj = base[1]; const refl = (v) => G.sub(v, G.scale(mi.m, 2 * G.dot(v, mi.m)));
      const mk = { m: G.scale(refl(mj.m), -1), u: refl(mj.u), up: refl(mj.up), phi: mj.phi, q: 1 }; worst = Math.max(worst, Math.abs(G.pairInvariants(mj, mk).kappa - 1)); }
    rec.mirrorImageCollidesWithOriginal_maxAbsKappaMinus1 = worst; }
  // polarity inequality behind Lemma 8.3: for positive x_1..x_n (n >= 2), (sum x)(sum 1/x) >= n^2 > 1
  let minProd = Infinity; for (let n = 0; n < 20000; n++) { const k = 2 + Math.floor(4 * rng.next()); let a = 0, b = 0; for (let x = 0; x < k; x++) { const v = Math.exp(4 * rng.next() - 2); a += v; b += 1 / v; } minProd = Math.min(minProd, a * b / (k * k)); }
  rec.minOfSumTimesSumInverseOverNSquared = minProd;
  out.check6 = rec; log('check 6', JSON.stringify(rec));
}
out.finishedUTC = new Date().toISOString();
writeFileSync(new URL('./weber-binding-sphere-gc-checks.json', import.meta.url), JSON.stringify(out, null, 1));
log('written', out.finishedUTC);
