// weber-binding-sphere-gc-ext-checks.mjs
// Great-circle closure lane, extension after the 22:29:05Z freeze (2026-10-06): spot checks for the uniform-circle class U,
//   X_i(T) = c_i n_i + a_i [cos(omega_i T + phi_i) u_i + sin(omega_i T + phi_i) u_i'],  c_i^2 + a_i^2 = R^2,  |omega_i| a_i = v.
// Checks of derived identities on random instances, not searches. K = c_f = 1 in every number. Known cases first.
// Usage: node weber-binding-sphere-gc-ext-checks.mjs   (writes weber-binding-sphere-gc-ext-checks.json)
import { writeFileSync } from 'node:fs';
import * as G from './weber-binding-sphere-gc-lib.mjs';
import { lawResidual, solveAccelerations } from './weber-binding-sphere-reference-lib.mjs';
import { assemble } from '../../binary-research/evidence/weber-frequency-reference-law.mjs';

const out = { script: 'weber-binding-sphere-gc-ext-checks.mjs', startedUTC: new Date().toISOString(), law: { K: 1, c_f: 1 }, seed: 20261007 };
const log = (...a) => console.log(...a);
const rng = G.makeRng(out.seed);
const Q6 = [1, 1, 1, -1, -1, -1];

// ---------- class-U members ----------
// member: { n, u, up, c, a, omega, phi, q } with u x up = n
function memberU(n, c, a, omega, phi, q) { const e = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]; const u = G.unit(G.sub(e, G.scale(n, G.dot(e, n)))); return { n, u, up: G.cross(n, u), c, a, omega, phi, q }; }
function randomU(R, v, q) { const c = R * (1.8 * rng.next() - 0.9); const a = Math.sqrt(R * R - c * c); return memberU(rng.unitVec(), c, a, (rng.next() < 0.5 ? -1 : 1) * v / a, 2 * Math.PI * rng.next(), q); }
function stateU(m, T) { // complex T
  const th = G.cadd(G.cscale(T, m.omega), [m.phi, 0]); const co = G.ccos(th), si = G.csin(th);
  const P = [0, 1, 2].map((k) => G.cadd(G.cscale(co, m.a * m.u[k]), G.cscale(si, m.a * m.up[k])));
  const X = P.map((p, k) => G.cadd(p, [m.c * m.n[k], 0]));
  const V = [0, 1, 2].map((k) => G.cscale(G.cadd(G.cscale(si, -m.a * m.u[k]), G.cscale(co, m.a * m.up[k])), m.omega));
  const Acc = P.map((p) => G.cscale(p, -m.omega * m.omega));
  return { X, V, Acc };
}
const re = (v) => v.map((x) => x[0]);
// closed residual F_i = sum_j w_ij (X_i - X_j) - X_i'' at real T, from formula (1)
function closedFU(members, T) {
  const st = members.map((m) => stateU(m, [T, 0])); const F = [];
  for (let i = 0; i < members.length; i++) {
    let f = G.scale(re(st[i].Acc), -1);
    for (let j = 0; j < members.length; j++) { if (j === i) continue; const pd = G.pairD(st[i], st[j]); const D = pd.D[0];
      const w = members[i].q * members[j].q * Math.pow(D, -2.5) * ((1 + pd.Ddd[0] / 2) * D - (3 / 8) * pd.Dd[0] ** 2);
      f = G.add(f, G.scale(re(pd.dX), w)); }
    F.push(f);
  }
  return { F, X: st.map((s) => re(s.X)), V: st.map((s) => re(s.V)), A: st.map((s) => re(s.Acc)) };
}
// continuation of sqrt(D_ij) for member i along a polyline in complex T
function tracker(members, i, T0) { const st = members.map((m) => stateU(m, [T0, 0])); return { i, T: [T0, 0], s: members.map((_, j) => (j === i ? null : G.csqrt(G.pairD(st[i], st[j]).D))) }; }
function adv(members, tr, Tn, depth = 0) {
  const st = members.map((m) => stateU(m, Tn)); const sN = []; let jump = 0;
  for (let j = 0; j < members.length; j++) { if (j === tr.i) { sN.push(null); continue; } let r = G.csqrt(G.pairD(st[tr.i], st[j]).D); if (G.cabs(G.csub(r, tr.s[j])) > G.cabs(G.cadd(r, tr.s[j]))) r = G.cscale(r, -1); jump = Math.max(jump, G.cabs(G.csub(r, tr.s[j])) / G.cabs(r)); sN.push(r); }
  if (jump > 0.05 && depth < 40) { const mid = G.cscale(G.cadd(tr.T, Tn), 0.5); adv(members, tr, mid, depth + 1); adv(members, tr, Tn, depth + 1); return; }
  tr.s = sN; tr.T = Tn;
}
function walk(members, tr, Tend, n = 200) { const T0 = tr.T; for (let k = 1; k <= n; k++) adv(members, tr, G.cadd(T0, G.cscale(G.csub(Tend, T0), k / n))); }
function complexFU(members, tr) {
  const i = tr.i; const st = members.map((m) => stateU(m, tr.T)); let F = G.vscale(st[i].Acc, [-1, 0]); const terms = [];
  for (let j = 0; j < members.length; j++) { if (j === i) { terms.push(null); continue; } const pd = G.pairD(st[i], st[j]); const E = G.pairE(members[i].q * members[j].q, pd); const t = G.vscale(E, G.cpowi(tr.s[j], -5)); terms.push({ E, term: t, pd }); F = G.vadd(F, t); }
  return { F, terms };
}

// =========== Check E1: known cases ===========
{
  let ws = 0, wv = 0, wsolve = 0, typ = 0;
  for (let n = 0; n < 10; n++) {
    const R = 1, v = 0.3 + 1.2 * rng.next(); const members = Q6.map((q) => randomU(R, v, q)); const T = 10 * rng.next();
    const { F, X, V, A } = closedFU(members, T); const state = { X, V, q: Q6 };
    const mine = Math.max(...F.map(G.norm)); const frozen = lawResidual(state, A); ws = Math.max(ws, Math.abs(mine - frozen) / frozen); typ += frozen / 10;
    const { M, b } = assemble(state); const a = A.flat(); const sol = solveAccelerations(state); const rs = sol.A.flat().map((x, k) => x - a[k]);
    for (let r = 0; r < 18; r++) { let s = b[r], t = 0; for (let k = 0; k < 18; k++) { s -= M[r][k] * a[k]; t += M[r][k] * rs[k]; }
      wv = Math.max(wv, Math.abs(s - F[Math.floor(r / 3)][r % 3]) / frozen); wsolve = Math.max(wsolve, Math.abs(t - F[Math.floor(r / 3)][r % 3]) / frozen); }
  }
  // hexagon as a class-U state (great circle, c = 0) and the diametral unlike pair on a small circle at omega^2 = 1/(4 a^3)
  const OmHex = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));
  const hex = [0, 2, 4, 1, 3, 5].map((k, idx) => memberU([0, 0, 1], 0, 1, OmHex, (k * Math.PI) / 3, Q6[idx]));
  let hexMax = 0; for (let k = 0; k < 16; k++) hexMax = Math.max(hexMax, ...closedFU(hex, k * 0.37).F.map(G.norm));
  const a2 = 0.6, c2 = 0.8, om2 = Math.sqrt(1 / (4 * a2 ** 3)); const nn = G.unit([0.3, -0.5, 0.8]);
  const pair = [memberU(nn, c2, a2, om2, 0.4, 1), memberU(nn, c2, a2, om2, 0.4 + Math.PI, -1)];
  let pairMax = 0, pairOff = 0, pairFrozen = 0;
  for (let k = 0; k < 16; k++) { const r = closedFU(pair, k * 0.41); pairMax = Math.max(pairMax, ...r.F.map(G.norm)); pairFrozen = Math.max(pairFrozen, lawResidual({ X: r.X, V: r.V, q: [1, -1] }, r.A)); }
  { const off = pair.map((m) => ({ ...m, omega: 1.1 * om2 })); for (let k = 0; k < 16; k++) pairOff = Math.max(pairOff, ...closedFU(off, k * 0.41).F.map(G.norm)); }
  out.checkE1 = { tenRandomClassUStates: { relDiffMaxNormVsFrozenLawResidual: ws, relDiffVectorVsFrozenAssembly_b_minus_Ma: wv, relDiffVectorVsFrozen_M_times_fullSolveResidual: wsolve, meanFrozenResidual: typ }, hexagonMaxAbsF: hexMax, diametralPairOnSmallCircle: { maxAbsF: pairMax, frozenLawResidual: pairFrozen, maxAbsF_at1p1Omega: pairOff } };
  log('check E1', JSON.stringify(out.checkE1));
  const pass = ws < 1e-12 && wv < 1e-12 && wsolve < 1e-10 && hexMax < 1e-13 && pairMax < 1e-13 && pairOff > 1e-3;
  out.checkE1.pass = pass; if (!pass) { writeFileSync(new URL('./weber-binding-sphere-gc-ext-checks.json', import.meta.url), JSON.stringify(out, null, 1)); throw new Error('known case failed'); }
}

// =========== Check E2: odd-order complex zeros in class U: exponent -5/2, coefficient, monodromy ===========
{
  const rec = { configurations: 0, worstExponentDeviation: 0, worstLeadingCoeffRelErrAt1em6: 0, monodromy: { singularFlips: 0, othersReturn: 0, trials: 0 }, minAbsDdotAtZero: Infinity, worstIsotropy: 0, numeratorOrderCheck: 0 };
  let tries = 0;
  while (rec.configurations < 40 && tries < 4000) {
    tries++; const R = 1, v = 0.3 + 1.2 * rng.next(); const members = Q6.map((q) => randomU(R, v, q));
    // Newton for a complex zero of D_01 from a random complex start
    let T = [6 * rng.next() - 3, 0.2 + 1.5 * rng.next()], ok = false;
    for (let it = 0; it < 80; it++) { const pd = G.pairD(stateU(members[0], T), stateU(members[1], T)); if (G.cabs(pd.D) < 1e-13) { ok = true; break; } const step = G.cdiv(pd.D, pd.Dd); if (G.cabs(step) > 0.5) { T = G.csub(T, G.cscale(step, 0.5 / G.cabs(step))); } else T = G.csub(T, step); }
    if (!ok || T[1] < 0.05 || T[1] > 3) continue;
    const pd0 = G.pairD(stateU(members[0], T), stateU(members[1], T)); if (G.cabs(pd0.Dd) < 0.05) continue;
    // keep other pairs' zeros away from the approach region: require |D_0j| not small at T*
    let clear = true; for (let j = 2; j < 6; j++) if (G.cabs(G.pairD(stateU(members[0], T), stateU(members[j], T)).D) < 0.05) clear = false; if (!clear) continue;
    rec.configurations++; rec.minAbsDdotAtZero = Math.min(rec.minAbsDdotAtZero, G.cabs(pd0.Dd));
    rec.worstIsotropy = Math.max(rec.worstIsotropy, G.cabs(G.vdot(pd0.dX, pd0.dX)) / G.vnorm(pd0.dX) ** 2);
    const sig = members[0].q * members[1].q; const lead = G.vscale(pd0.dX, G.cscale(G.cmul(pd0.Dd, pd0.Dd), -(3 / 8) * sig));
    const off = 0.07 + 0.1 * rng.next(); const tr = tracker(members, 0, T[0] - off); walk(members, tr, [T[0] - off, T[1]], 600);
    const radii = [1e-4, 1e-6]; const absF = []; let lastErr = 0;
    for (const r of radii) { walk(members, tr, [T[0] - r, T[1]], 80); const ev = complexFU(members, tr); absF.push(G.vnorm(ev.F)); lastErr = G.vnorm(G.vsub(G.vscale(ev.F, G.cpowi(tr.s[1], 5)), lead)) / G.vnorm(lead); }
    rec.worstExponentDeviation = Math.max(rec.worstExponentDeviation, Math.abs(Math.log(absF[1] / absF[0]) / Math.log(radii[1] / radii[0]) + 2.5));
    rec.worstLeadingCoeffRelErrAt1em6 = Math.max(rec.worstLeadingCoeffRelErrAt1em6, lastErr);
    const r0 = 1e-3; walk(members, tr, [T[0] - r0, T[1]], 40); const before = tr.s.slice();
    for (let k = 1; k <= 240; k++) { const an = Math.PI + (2 * Math.PI * k) / 240; walk(members, tr, [T[0] + r0 * Math.cos(an), T[1] + r0 * Math.sin(an)], 1); }
    rec.monodromy.trials++; if (G.cabs(G.cadd(tr.s[1], before[1])) < 1e-8 * G.cabs(before[1])) rec.monodromy.singularFlips++;
    let okr = true; for (let k = 2; k < 6; k++) if (G.cabs(G.csub(tr.s[k], before[k])) > 1e-8 * G.cabs(before[k])) okr = false; if (okr) rec.monodromy.othersReturn++;
  }
  rec.draws = tries; out.checkE2 = rec; log('check E2', JSON.stringify(rec));
}

// =========== Check E3: pair structure in class U ===========
{
  const rec = {};
  // (a) rigid pairs: D constant exactly when the angular velocity vectors omega n agree (members on one latitude or a mirror pair)
  let cRigid = 0, cNon = Infinity;
  const variation = (mi, mj) => { let lo = Infinity, hi = 0; for (let k = 0; k < 400; k++) { const T = 0.173 * k; const D = G.pairD(stateU(mi, [T, 0]), stateU(mj, [T, 0])).D[0]; lo = Math.min(lo, D); hi = Math.max(hi, D); } return (hi - lo) / hi; };
  for (let n = 0; n < 100; n++) { const v = 0.3 + 1.2 * rng.next(); const mi = randomU(1, v, 1);
    const same = memberU(mi.n, rng.next() < 0.5 ? mi.c : -mi.c, mi.a, mi.omega, 7 * rng.next(), -1); cRigid = Math.max(cRigid, variation(mi, same));
    const flipped = memberU(G.scale(mi.n, -1), -same.c, mi.a, -mi.omega, 7 * rng.next(), -1); cRigid = Math.max(cRigid, variation(mi, flipped)); // same motion class described with the opposite axis
    cNon = Math.min(cNon, variation(mi, randomU(1, v, -1)), variation(mi, memberU(mi.n, mi.c, mi.a, -mi.omega, 7 * rng.next(), 1) ) ); }
  rec.rigidCriterion = { maxRelVariationOfD_sameAngularVelocity: cRigid, minRelVariationOfD_otherwise: cNon };
  // (b) coaxial pairs with different angular velocities: D = p - q cos((omega_i - omega_j) T + const), kappa = p/q
  let eCo = 0, kMin = Infinity;
  for (let n = 0; n < 100; n++) { const v = 0.3 + 1.2 * rng.next(); const mi = randomU(1, v, 1); const c2 = 1.8 * rng.next() - 0.9, a2 = Math.sqrt(1 - c2 * c2); const mj = memberU(mi.n, c2, a2, (rng.next() < 0.5 ? -1 : 1) * v / a2, 7 * rng.next(), -1);
    if (Math.abs(mi.omega - mj.omega) < 1e-3) continue; const p = 2 - 2 * mi.c * mj.c, q = 2 * mi.a * mj.a; kMin = Math.min(kMin, p / q);
    let lo = Infinity, hi = 0; const per = 2 * Math.PI / Math.abs(mi.omega - mj.omega); for (let k = 0; k < 2000; k++) { const D = G.pairD(stateU(mi, [k * per / 2000, 0]), stateU(mj, [k * per / 2000, 0])).D[0]; lo = Math.min(lo, D); hi = Math.max(hi, D); }
    eCo = Math.max(eCo, Math.abs(lo - (p - q)) / p, Math.abs(hi - (p + q)) / p); }
  rec.coaxial = { maxErrOfSingleCosineRange: eCo, minKappa: kMin };
  // (c) equal-rate pairs (common omega > 0, radius a, heights c and eps c): D/2 = P0 - P1 f(psi) - s P2 cos 2 psi closed form,
  //     the four roots in z of z^2 D, and the mirror-pair criterion sin(delta) = 0 for eps = -1
  const frame = (ni, nj) => { const l = G.unit(G.cross(ni, nj)); return { l, upi: G.cross(ni, l), upj: G.cross(nj, l) }; };
  const mk = (n, l, up, c, a, om, phi, q) => ({ n, u: l, up, c, a, omega: om, phi, q });
  function quarticRoots(co) { // Durand-Kerner for c4 z^4 + ... + c0 (complex coefficients, co[k] multiplies z^k)
    let z = [[0.4, 0.9], [-0.9, 0.3], [0.2, -1.1], [1.3, 0.1]];
    for (let it = 0; it < 400; it++) z = z.map((zi, k) => { let p = [0, 0]; for (let d = 4; d >= 0; d--) p = G.cadd(G.cmul(p, zi), co[d]); let den = co[4]; for (let m = 0; m < 4; m++) if (m !== k) den = G.cmul(den, G.csub(zi, z[m])); return G.csub(zi, G.cdiv(p, den)); });
    return z; }
  function laurentCoeffs(mi, mj) { // D = sum_{k=-2..2} C_k z^k, z = e^{i omega T}, by a 16-point DFT over one period
    const nT = 16; const C = [-2, -1, 0, 1, 2].map(() => [0, 0]); const om = mi.omega;
    for (let l = 0; l < nT; l++) { const T = (l * 2 * Math.PI) / om / nT; const D = G.pairD(stateU(mi, [T, 0]), stateU(mj, [T, 0])).D[0]; for (let k = -2; k <= 2; k++) { const an = -k * om * T; C[k + 2] = G.cadd(C[k + 2], [D * Math.cos(an) / nT, D * Math.sin(an) / nT]); } }
    return C; }
  let squareCondErr = 0, eForm = 0, minSepGeneric = Infinity, mirrorDoubleRootGap = 0, mirrorDistErr = 0, nonMirrorMinGapPlus = Infinity, mirrorCollisionFree = 0, mirrorCases = 0, topCoeffOppositeErr = 0;
  for (let n = 0; n < 200; n++) {
    const a = 0.3 + 0.6 * rng.next(), c = Math.sqrt(1 - a * a), om = (0.3 + 1.2 * rng.next()) / a; const ni = rng.unitVec(), nj = rng.unitVec(); const gam = Math.acos(G.dot(ni, nj)); const fr = frame(ni, nj);
    for (const eps of [1, -1]) {
      const phi_i = 7 * rng.next(), phi_j = n % 4 === 0 && eps === -1 ? phi_i : 7 * rng.next(); const delta = (phi_j - phi_i) / 2;
      const mi = mk(ni, fr.l, fr.upi, c, a, om, phi_i, 1), mj = mk(nj, fr.l, fr.upj, eps * c, a, om, phi_j, -1);
      const P0 = 1 - eps * c * c * Math.cos(gam) - (a * a / 2) * (1 + Math.cos(gam)) * Math.cos(2 * delta), P2 = a * a * Math.sin(gam / 2) ** 2;
      for (let t = 0; t < 4; t++) { const T = 10 * rng.next(); const psi = om * T + (phi_i + phi_j) / 2; const D = G.pairD(stateU(mi, [T, 0]), stateU(mj, [T, 0])).D[0];
        const first = eps === 1 ? 2 * c * a * Math.sin(gam) * Math.sin(delta) * Math.cos(psi) : 2 * c * a * Math.sin(gam) * Math.cos(delta) * Math.sin(psi);
        eForm = Math.max(eForm, Math.abs(D / 2 - (P0 - first - P2 * Math.cos(2 * psi)))); }
      if (eps === -1) { const P1p = 2 * c * a * Math.sin(gam) * Math.cos(delta); squareCondErr = Math.max(squareCondErr, Math.abs((P0 - P1p * P1p / (8 * P2) - P2) - 2 * Math.cos(gam / 2) ** 2 * Math.sin(delta) ** 2)); }
      const C = laurentCoeffs(mi, mj); const roots = quarticRoots(C); let gap = Infinity; for (let x = 0; x < 4; x++) for (let y = x + 1; y < 4; y++) gap = Math.min(gap, G.cabs(G.csub(roots[x], roots[y])));
      const isMirror = eps === -1 && n % 4 === 0;
      if (isMirror) { mirrorCases++; mirrorDoubleRootGap = Math.max(mirrorDoubleRootGap, gap);
        // mirror plane normal nu: the reflection maps (l, n_i x l, n_i) to (l, n_j x l, -n_j); nu is parallel to n_i + n_j
        const nu = G.unit(G.add(ni, nj)); let free = true;
        for (let t = 0; t < 64; t++) { const T = (t * 2 * Math.PI) / om / 64; const si = stateU(mi, [T, 0]), sj = stateU(mj, [T, 0]); const d = Math.sqrt(G.pairD(si, sj).D[0]); const h = G.dot(re(si.X), nu); mirrorDistErr = Math.max(mirrorDistErr, Math.abs(d - 2 * Math.abs(h))); if (Math.abs(h) < 1e-3) free = false; }
        if (free) { let sgn = 0, cross = false; for (let t = 0; t < 64; t++) { const h = G.dot(re(stateU(mi, [(t * 2 * Math.PI) / om / 64, 0]).X), nu); if (sgn === 0) sgn = Math.sign(h); else if (Math.sign(h) !== sgn) cross = true; } if (!cross) mirrorCollisionFree++; }
      } else { minSepGeneric = Math.min(minSepGeneric, gap); if (eps === 1) nonMirrorMinGapPlus = Math.min(nonMirrorMinGapPlus, gap); }
    }
    // (d) the two members of a diametral pair seen from a member of another group: opposite z^2 coefficients
    { const phi_i = 7 * rng.next(), phi_j = 7 * rng.next(); const mi = mk(ni, fr.l, fr.upi, c, a, om, phi_i, 1); const mp = mk(nj, fr.l, fr.upj, c, a, om, phi_j, 1), mm = mk(nj, fr.l, fr.upj, c, a, om, phi_j + Math.PI, -1);
      const Cp = laurentCoeffs(mi, mp), Cm = laurentCoeffs(mi, mm); topCoeffOppositeErr = Math.max(topCoeffOppositeErr, G.cabs(G.cadd(Cp[4], Cm[4])) / G.cabs(Cp[4]), Math.abs(G.cabs(Cp[4]) - a * a * Math.sin(gam / 2) ** 2) / G.cabs(Cp[4])); }
  }
  rec.equalRate = { pairs: 400, closedFormAbsErr: eForm, squareConditionIdentity_absErr: squareCondErr, minRootGap_nonMirror: minSepGeneric, minRootGap_sameSideHeights: nonMirrorMinGapPlus, mirrorCases, mirrorMaxGapBetweenPairedRoots: mirrorDoubleRootGap, mirror_d_equals_2absXdotNu_absErr: mirrorDistErr, mirrorCasesWithoutPlaneCrossing: mirrorCollisionFree, diametralPair_topCoefficientsOpposite_relErr: topCoeffOppositeErr };
  out.checkE3 = rec; log('check E3', JSON.stringify(rec));
}

// =========== Check E4: a mirror (square) pair gives a double pole along nu, not a branch point ===========
// term = sigma eps nu dt^-2 [1 - dt'^2/2 + dt dt''], dt = 2 eps X_i.nu; at a zero of X_i.nu the bracket is 1 + 2 omega^2 (c^2 nu_n^2 - a^2 nu_perp^2) >= 1
{
  const rec = { cases: 0, worstExponentDeviation: 0, worstRootSingleValued: 0, worstCoefficientRelErr: 0, minBracketAtPole: Infinity }; let tries = 0;
  while (rec.cases < 20 && tries < 4000) {
    tries++; const a = 0.3 + 0.4 * rng.next(), c = Math.sqrt(1 - a * a), om = (0.3 + 1.2 * rng.next()) / a; const ni = rng.unitVec(); let nj = G.unit(G.add(ni, G.scale(rng.unitVec(), 0.5)));
    const l = G.unit(G.cross(ni, nj)); const phi = 7 * rng.next(); const mi = { n: ni, u: l, up: G.cross(ni, l), c, a, omega: om, phi, q: 1 }, mj = { n: nj, u: l, up: G.cross(nj, l), c: -c, a, omega: om, phi, q: -1 };
    const nu = G.unit(G.add(ni, nj)); let lo = Infinity; for (let t = 0; t < 64; t++) lo = Math.min(lo, Math.abs(G.dot(re(stateU(mi, [(t * 2 * Math.PI) / om / 64, 0]).X), nu))); if (lo < 0.05) continue;
    // complex zero of h(T) = X_i(T).nu by Newton
    let T = [6 * rng.next() - 3, 0.3 + rng.next()], ok = false;
    for (let it = 0; it < 80; it++) { const s = stateU(mi, T); const h = G.vdot(s.X, G.vc(nu)); if (G.cabs(h) < 1e-14) { ok = true; break; } T = G.csub(T, G.cdiv(h, G.vdot(s.V, G.vc(nu)))); }
    if (!ok || Math.abs(T[1]) < 0.02) continue;
    rec.cases++; const members = [mi, mj];
    const term = (r) => { const Tc = [T[0] - r, T[1]]; const si = stateU(mi, Tc), sj = stateU(mj, Tc); const pd = G.pairD(si, sj); const d = G.cscale(G.vdot(si.X, G.vc(nu)), 2); // entire root of D
      rec.worstRootSingleValued = Math.max(rec.worstRootSingleValued, G.cabs(G.csub(G.cmul(d, d), pd.D)) / G.cabs(pd.D));
      return G.vnorm(G.vscale(G.pairE(-1, pd), G.cpowi(d, -5))); };
    const f1 = term(1e-3), f2 = term(1e-5); rec.worstExponentDeviation = Math.max(rec.worstExponentDeviation, Math.abs(Math.log(f2 / f1) / Math.log(1e-2) + 2));
    // coefficient: d^2 * term -> sigma * (X_i - X_j)/d * bracket, with bracket = 1 + 2 omega^2 (c^2 nu_n^2 - a^2 nu_perp^2) and (X_i - X_j)/d = nu
    { const nun = G.dot(ni, nu), nup2 = 1 - nun * nun; const bracket = 1 + 2 * om * om * (c * c * nun * nun - a * a * nup2); rec.minBracketAtPole = Math.min(rec.minBracketAtPole, bracket);
      const Tc = [T[0] - 1e-6, T[1]]; const si = stateU(mi, Tc), sj = stateU(mj, Tc); const pd = G.pairD(si, sj); const d = G.cscale(G.vdot(si.X, G.vc(nu)), 2);
      const scaled = G.vscale(G.pairE(-1, pd), G.cpowi(d, -3)); const pred = G.vc(G.scale(nu, -bracket));
      rec.worstCoefficientRelErr = Math.max(rec.worstCoefficientRelErr, G.vnorm(G.vsub(scaled, pred)) / bracket); }
  }
  out.checkE4 = rec; log('check E4', JSON.stringify(rec));
}
// =========== Check E5: commensurate unequal rates: D is a Laurent polynomial in w = e^{i omega_0 T} of degree exactly r + s ===========
// omega_i = r omega_0, omega_j = s omega_0 (same sign), a_i = v / omega_i: the coefficient of w^{r+s} has modulus (a_i a_j / 2)(1 - n_i.n_j),
// and no higher harmonic is present; for r + s odd an entire square root of D would change sign over one period.
{
  let eTop = 0, eHigh = 0, cases = 0;
  for (const [r, s] of [[2, 1], [3, 2], [4, 1], [3, 1], [5, 3]]) for (let n = 0; n < 20; n++) {
    const v = 0.2 + 0.25 * rng.next(), om0 = v / (0.95 * Math.min(1 / r, 1 / s)) * (1 + rng.next()); // radii a = v / (k om0) <= 0.95
    const ai = v / (r * om0), aj = v / (s * om0); const ci = (rng.next() < 0.5 ? -1 : 1) * Math.sqrt(1 - ai * ai), cj = (rng.next() < 0.5 ? -1 : 1) * Math.sqrt(1 - aj * aj);
    const mi = memberU(rng.unitVec(), ci, ai, r * om0, 7 * rng.next(), 1), mj = memberU(rng.unitVec(), cj, aj, s * om0, 7 * rng.next(), -1);
    const nT = 64; const coef = (k) => { let acc = [0, 0]; for (let l = 0; l < nT; l++) { const T = (l * 2 * Math.PI) / om0 / nT; const D = G.pairD(stateU(mi, [T, 0]), stateU(mj, [T, 0])).D[0]; const an = -k * om0 * T; acc = G.cadd(acc, [D * Math.cos(an) / nT, D * Math.sin(an) / nT]); } return acc; };
    const top = G.cabs(coef(r + s)); const pred = (ai * aj / 2) * (1 - G.dot(mi.n, mj.n)); eTop = Math.max(eTop, Math.abs(top - pred) / pred);
    for (let k = r + s + 1; k <= r + s + 4; k++) eHigh = Math.max(eHigh, G.cabs(coef(k)) / pred); cases++;
  }
  out.checkE5 = { cases, topCoefficientRelErr: eTop, maxHigherHarmonicOverTop: eHigh }; log('check E5', JSON.stringify(out.checkE5));
}
out.finishedUTC = new Date().toISOString();
writeFileSync(new URL('./weber-binding-sphere-gc-ext-checks.json', import.meta.url), JSON.stringify(out, null, 1));
log('written', out.finishedUTC);
