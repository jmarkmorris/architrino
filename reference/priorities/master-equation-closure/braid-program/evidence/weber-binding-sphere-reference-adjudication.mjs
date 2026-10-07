// weber-binding-sphere-reference-adjudication.mjs
// Reference lane, Part 3a (after the PI's round-1 exposure, 2026-10-06T00:58Z).
// Evaluates the frozen reference instrument at the subject's parameters so that
// like is compared with like. The frozen reference code is imported unchanged;
// this file only drives it. Reads subject receipts (data only).
import { readFileSync, writeFileSync } from 'node:fs';
import { solveAccelerations, dot, cross, norm, scale, add, sub, unit, prescribedPathResidual, sig15 } from './weber-binding-sphere-reference-lib.mjs';

const log = (...a) => console.log(...a);
const out = { startedAt: new Date().toISOString() };
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);

// ---------------- F2: like-with-like on the orthogonal triad ----------------
// Reference basis (frozen choice): normals x,y,z with (u,u') = (y,z), (z,x), (x,y).
// A rotation of an in-plane basis by delta is a phase shift by delta, so a full
// 12^3 phase grid (all three phases free) covers the same configurations as any
// coordinate-aligned basis choice; the subject's 12^3 grid is therefore
// reproducible as a set even though its basis is not recorded.
const triad0 = [{ u: [0, 1, 0], up: [0, 0, 1] }, { u: [0, 0, 1], up: [1, 0, 0] }, { u: [1, 0, 0], up: [0, 1, 0] }];
const qF2 = [1, -1, 1, -1, 1, -1];
function f2Path(triad, phases, senses, R, Omega) {
  return (T) => {
    const X = [], V = [];
    for (let k = 0; k < 3; k++) {
      const { u, up } = triad[k];
      const ph = senses[k] * Omega * T + phases[k];
      const pos = add(scale(u, R * Math.cos(ph)), scale(up, R * Math.sin(ph)));
      const vel = scale(add(scale(u, -R * Math.sin(ph)), scale(up, R * Math.cos(ph))), senses[k] * Omega);
      X.push(pos); V.push(vel); X.push(scale(pos, -1)); V.push(scale(vel, -1));
    }
    return { X, V };
  };
}
{
  log('=== F2 like-with-like ===');
  const senseSets = [[1, 1, 1], [1, 1, -1], [1, -1, 1], [-1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1], [-1, -1, -1]];
  const F2 = { commonPoint: [], fullGrid: {} };
  // (a) the PI's common point: phases (0,0,0), class +++, R=1, Omega in {0.5, 0.7, 1.0}, 64 and 32 times
  for (const Om of [0.5, 0.7, 1.0]) {
    for (const nT of [64, 32]) {
      const r = prescribedPathResidual(f2Path(triad0, [0, 0, 0], [1, 1, 1], 1, Om), qF2, Om, 1, nT);
      F2.commonPoint.push({ Omega: Om, samples: nT, ...r });
      log(`phases (0,0,0) +++ R=1 Omega=${Om} nT=${nT}: R=${r.R.toFixed(6)} radial=${r.radial.toFixed(6)} tangential=${r.tangential.toFixed(6)} binormal=${r.binormal.toFixed(6)}`);
    }
  }
  // (b) full 12^3 phase grid, all eight senses, Omega in {0.5, 0.7, 1.0}, 64 times per period
  const ph12 = Array.from({ length: 12 }, (_, k) => (k * Math.PI) / 6);
  for (const Om of [0.5, 0.7, 1.0]) {
    let best = null; const perSense = {}; let count = 0, singular = 0;
    const t0 = Date.now();
    for (const senses of senseSets) {
      let bs = null;
      for (const p1 of ph12) for (const p2 of ph12) for (const p3 of ph12) {
        const r = prescribedPathResidual(f2Path(triad0, [p1, p2, p3], senses, 1, Om), qF2, Om, 1, 64);
        count++;
        if (r.singular || !Number.isFinite(r.R)) { singular++; continue; }
        const row = { senses, phases: [p1, p2, p3], Omega: Om, R: r.R, radial: r.radial, tangential: r.tangential, binormal: r.binormal, minSep: r.minSep };
        if (!bs || r.R < bs.R) bs = row;
        if (!best || r.R < best.R) best = row;
      }
      perSense[senses.join('')] = bs;
    }
    // re-evaluate the best point at 32 times per period (the subject's grid sampling)
    const r32 = prescribedPathResidual(f2Path(triad0, best.phases, best.senses, 1, Om), qF2, Om, 1, 32);
    F2.fullGrid[`Omega=${Om}`] = { points: count, singularOrNonfinite: singular, best, bestAt32Samples: r32.R, perSense, wallSeconds: (Date.now() - t0) / 1000 };
    log(`Omega=${Om}: ${count} points (${singular} singular/non-finite), best R=${best.R.toFixed(6)} at senses=${best.senses.join('')} phases=(${best.phases.map((v) => (v * 180 / Math.PI).toFixed(0)).join(',')} deg) radial=${best.radial.toFixed(4)} tangential=${best.tangential.toFixed(4)} binormal=${best.binormal.toFixed(4)}; at 32 samples ${r32.R.toFixed(6)}`);
    for (const [k, v] of Object.entries(perSense)) log(`   ${k}: ${v.R.toFixed(6)} at (${v.phases.map((x) => (x * 180 / Math.PI).toFixed(0)).join(',')})`);
  }
  // (c) the subject's recorded best phases at Omega=1, evaluated in the reference basis for information
  const subj = JSON.parse(readFileSync('weber-binding-sphere-f2.json', 'utf8'));
  F2.subjectBestPhasesInReferenceBasis = [];
  for (const o of subj.orthogonal.filter((o) => o.R === 1)) {
    for (const b of o.grid.best.slice(0, 1)) {
      const r = prescribedPathResidual(f2Path(triad0, b.phases, o.senses, 1, b.Omega), qF2, b.Omega, 1, 64);
      F2.subjectBestPhasesInReferenceBasis.push({ senses: o.senses, phases: b.phases, Omega: b.Omega, subjectR: b.R, subjectRadial: b.radial, subjectTangential: b.tangential, referenceR: r.R, referenceRadial: r.radial, referenceTangential: r.tangential });
      log(`subject best (senses ${o.senses.join('')}, phases ${b.phases.map((v) => (v * 180 / Math.PI).toFixed(0)).join(',')} deg, Omega=${b.Omega}): subject R=${b.R.toFixed(6)} (radial ${b.radial.toFixed(4)}, tangential ${b.tangential.toFixed(4)}); reference basis gives R=${r.R.toFixed(6)} (radial ${r.radial.toFixed(4)}, tangential ${r.tangential.toFixed(4)})`);
    }
  }
  F2.subjectSummary = { orthogonalGridMinR1: subj.orthogonal.filter((o) => o.R === 1).map((o) => ({ senses: o.senses, min: o.grid.min })), perR: subj.perR, perSense: subj.perSense, globalMinimumNormalsFree: subj.summary.globalMinimumNormalsFree };
  out.F2 = F2;
}

// ---------------- F0: spectra and determinant constants at full precision ----------------
{
  log('=== F0 spectra and determinant constants ===');
  const subj = JSON.parse(readFileSync('weber-binding-sphere-f0.json', 'utf8'));
  const ref = JSON.parse(readFileSync('weber-binding-sphere-reference-spectra.json', 'utf8'));
  const rows = [];
  for (const s of subj.spectra) {
    const key = Object.keys(ref).find((k) => k.startsWith('F0') && Math.abs(ref[k].Omega - s.Omega) < 1e-9);
    const r = ref[key];
    const sMax = Math.max(...s.full.map((e) => e.re));
    const sUnst = s.full.filter((e) => e.re > 1e-3 * s.Omega).length;
    const sPlus = s.full.filter((e) => Math.hypot(e.re, e.im - s.Omega) < 1e-3 * s.Omega).length;
    const rPlus = r.eigenvalues.filter(([a, b]) => Math.hypot(a, b - r.Omega) < 1e-3 * r.Omega).length;
    // match the unstable eigenvalues one by one
    const sU = s.full.filter((e) => e.re > 1e-3 * s.Omega).map((e) => [e.re, e.im]);
    const rU = r.eigenvalues.filter(([a]) => a > 1e-3 * r.Omega);
    let worst = 0; const rem = rU.slice();
    for (const [a, b] of sU) { let bi = -1, bd = Infinity; rem.forEach(([c, d], i) => { const dd = Math.hypot(a - c, b - d); if (dd < bd) { bd = dd; bi = i; } }); if (bi >= 0) { worst = Math.max(worst, bd); rem.splice(bi, 1); } }
    const row = { rho: s.rho, Omega: s.Omega, subjectMaxRe: sMax, referenceMaxRe: r.maxRealPart, relDiff: Math.abs(sMax - r.maxRealPart) / r.maxRealPart, subjectUnstable: sUnst, referenceUnstable: r['unstableCount(Re>1e-3 Omega)'], subjectPlusIOmega: sPlus, referencePlusIOmega: rPlus, worstUnstableEigenvalueMatch: worst, subjectAxialOverOmega: s.axialFrequenciesOverOmega };
    rows.push(row);
    log(`rho=${s.rho}: maxRe subject ${sMax} reference ${r.maxRealPart} (rel ${row.relDiff.toExponential(2)}); unstable ${sUnst}/${row.referenceUnstable}; +iOmega multiplicity ${sPlus}/${rPlus}; worst unstable-eigenvalue match ${worst.toExponential(2)}; subject axial/Omega ${JSON.stringify(s.axialFrequenciesOverOmega)}`);
  }
  // reference axial ratios from the frozen spectra: imaginary eigenvalues at radius-independent ratios
  const axialRef = {};
  for (const k of Object.keys(ref).filter((k) => k.startsWith('F0'))) {
    const r = ref[k];
    axialRef[k] = r.eigenvalues.filter(([a, b]) => Math.abs(a) < 1e-3 * r.Omega && b > 0).map(([, b]) => +(b / r.Omega).toFixed(4)).sort((x, y) => x - y);
  }
  log('reference imaginary-pair ratios Im/Omega by radius:', JSON.stringify(axialRef));
  const consts = subj.determinant.constants.map((c) => ({ c: c.c, mult: c.mult, closedForm: c.closedForm ? c.closedForm.value : null }));
  const myConsts = { k0breathing: 2 - Math.sqrt(3), k3polarityBreathing: -Math.sqrt(3), k3polarityShear: 3, k1sublattice: (3 - Math.sqrt(3)) / 2, k2pair: [(7 - Math.sqrt(3) - Math.sqrt(16 + 6 * Math.sqrt(3))) / 4, (7 - Math.sqrt(3) + Math.sqrt(16 + 6 * Math.sqrt(3))) / 4] };
  log('subject constants:', JSON.stringify(consts));
  log('reference closed forms:', JSON.stringify(myConsts), 'k2 pair sum', myConsts.k2pair[0] + myConsts.k2pair[1], 'expected', (7 - Math.sqrt(3)) / 2, 'product', myConsts.k2pair[0] * myConsts.k2pair[1], 'expected', (9 - 5 * Math.sqrt(3)) / 4);
  out.F0 = { spectra: rows, referenceImaginaryRatios: axialRef, subjectConstants: consts, referenceClosedForms: myConsts, subjectBalanceCoefficient: subj.balanceCoefficient, referenceBalanceCoefficient: 5 / 4 - 1 / Math.sqrt(3) };
}

// ---------------- F3: the reference jet residual on the subject's best states ----------------
function sph(theta, phi) { return [Math.sin(theta) * Math.cos(phi), Math.sin(theta) * Math.sin(phi), Math.cos(theta)]; }
function tangent(theta, phi, psi, v) {
  const eth = [Math.cos(theta) * Math.cos(phi), Math.cos(theta) * Math.sin(phi), -Math.sin(theta)];
  const eph = [-Math.sin(phi), Math.cos(phi), 0];
  return scale(add(scale(eth, Math.cos(psi)), scale(eph, Math.sin(psi))), v);
}
function jet(X, V, q, v) {
  const sol = solveAccelerations({ X, V, q });
  if (sol.singular) return { singular: true };
  let jr = 0, jt = 0;
  for (let i = 0; i < 6; i++) {
    jr = Math.max(jr, Math.abs(dot(X[i], sol.A[i]) + dot(V[i], V[i])) / (v * v));
    jt = Math.max(jt, Math.abs(dot(V[i], sol.A[i])) / (v * v * v));
  }
  return { radial: jr, tangential: jt, max: Math.max(jr, jt), sum: jr + jt, det: sol.det, minSep: sol.minSep, sumX: norm(X.reduce((a, b) => add(a, b), [0, 0, 0])), sumV: norm(V.reduce((a, b) => add(a, b), [0, 0, 0])), radiusSpread: Math.max(...X.map((x) => Math.abs(norm(x) - 1))), speedSpread: Math.max(...V.map((w) => Math.abs(norm(w) - v))) };
}
{
  log('=== F3 reference jet residual on the subject best states (reconstructed from the receipts) ===');
  const F3 = { c3: [], free: [] };
  const c3 = JSON.parse(readFileSync('weber-binding-sphere-f3-shooting-c3.json', 'utf8'));
  // reconstruction convention assumed from the subject document: members 0,2,4 (+) at colatitude theta+,
  // azimuths 2 pi k/3, velocity v (cos psi e_theta + sin psi e_phi); members 1,3,5 (-) at pi - theta+,
  // azimuths phi- + 2 pi k/3, psi- = pi - psi+ (branch 0) or pi + psi+ (branch 1).
  for (const s of c3.summary.bestFive) {
    const [th, ps, phm, v] = s.p;
    const X = [], V = [], q = [];
    for (let k = 0; k < 3; k++) {
      X.push(sph(th, (2 * Math.PI * k) / 3)); V.push(tangent(th, (2 * Math.PI * k) / 3, ps, v)); q.push(1);
      const psm = s.branch === 0 ? Math.PI - ps : Math.PI + ps;
      X.push(sph(Math.PI - th, phm + (2 * Math.PI * k) / 3)); V.push(tangent(Math.PI - th, phm + (2 * Math.PI * k) / 3, psm, v)); q.push(-1);
    }
    // the subject orders members 0,2,4 positive and 1,3,5 negative; interleaving above matches that
    const j = jet(X, V, q, v);
    F3.c3.push({ start: s.start, branch: s.branch, p: s.p, subjectJ: s.J, subjectJetScoreFinal: s.jetScoreFinal, reference: j });
    log(`c3 start ${s.start}: subject J=${s.J.toExponential(3)} jetScoreFinal=${s.jetScoreFinal.toExponential(3)}; reference jet max=${j.max.toExponential(3)} sum=${j.sum.toExponential(3)} (radial ${j.radial.toExponential(3)}, tangential ${j.tangential.toExponential(3)}), sumX=${j.sumX.toExponential(1)} sumV=${j.sumV.toExponential(1)}`);
  }
  const fr = JSON.parse(readFileSync('weber-binding-sphere-f3-shooting-free.json', 'utf8'));
  // convention assumed: p = [theta_0, phi_0, psi_0, ..., theta_4, phi_4, psi_4, v]; member 5 closes the sums.
  for (const s of fr.summary.bestFive) {
    const v = s.p[15];
    const X = [], V = [];
    for (let i = 0; i < 5; i++) { const [th, ph, ps] = s.p.slice(3 * i, 3 * i + 3); X.push(sph(th, ph)); V.push(tangent(th, ph, ps, v)); }
    X.push(scale(X.reduce((a, b) => add(a, b), [0, 0, 0]), -1)); V.push(scale(V.reduce((a, b) => add(a, b), [0, 0, 0]), -1));
    const q = fr.polarities ?? [1, 1, 1, -1, -1, -1];
    const j = jet(X, V, q, v);
    F3.free.push({ start: s.start, p: s.p, subjectJ: s.J, subjectJetScoreFinal: s.jetScoreFinal, subjectMinSep: s.minSep, reference: j });
    log(`free start ${s.start}: subject J=${s.J.toExponential(3)} jetScoreFinal=${s.jetScoreFinal.toExponential(3)} minSep=${s.minSep.toFixed(4)}; reference jet max=${j.max.toExponential(3)} sum=${j.sum.toExponential(3)} (radial ${j.radial.toExponential(3)}, tangential ${j.tangential.toExponential(3)}) minSep=${j.minSep.toFixed(4)} member5 radius defect=${j.radiusSpread.toExponential(2)} speed defect=${j.speedSpread.toExponential(2)}`);
  }
  F3.subjectPolarities = fr.polarities;
  out.F3 = F3;
}

out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-adjudication.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-adjudication.json');

// ---------------- supplementary checks (appended 01:03Z, same run) ----------------
{
  log('=== supplementary: all 100 starts of each F3 stratum, F1 segregated point, octahedron Omega2_LS, PI identity ===');
  const S = {};
  const c3 = JSON.parse(readFileSync('weber-binding-sphere-f3-shooting-c3.json', 'utf8'));
  let worstC3 = 0, minC3 = Infinity;
  for (const s of c3.starts) {
    const [th, ps, phm, v] = s.p; const X = [], V = [], q = [];
    for (let k = 0; k < 3; k++) { X.push(sph(th, 2 * Math.PI * k / 3)); V.push(tangent(th, 2 * Math.PI * k / 3, ps, v)); q.push(1); const psm = s.branch === 0 ? Math.PI - ps : Math.PI + ps; X.push(sph(Math.PI - th, phm + 2 * Math.PI * k / 3)); V.push(tangent(Math.PI - th, phm + 2 * Math.PI * k / 3, psm, v)); q.push(-1); }
    const j = jet(X, V, q, v); if (j.singular) continue;
    worstC3 = Math.max(worstC3, Math.abs(j.sum - s.jetScoreFinal) / Math.max(s.jetScoreFinal, 1e-12)); minC3 = Math.min(minC3, j.sum);
  }
  const fr = JSON.parse(readFileSync('weber-binding-sphere-f3-shooting-free.json', 'utf8'));
  let worstFr = 0, minFr = Infinity, minFrStart = null;
  for (const s of fr.starts) {
    const v = s.p[15]; const X = [], V = [];
    for (let i = 0; i < 5; i++) { const [th, ph, ps] = s.p.slice(3 * i, 3 * i + 3); X.push(sph(th, ph)); V.push(tangent(th, ph, ps, v)); }
    X.push(scale(X.reduce((a, b) => add(a, b), [0, 0, 0]), -1)); V.push(scale(V.reduce((a, b) => add(a, b), [0, 0, 0]), -1));
    const j = jet(X, V, fr.polarities ?? [1, 1, 1, -1, -1, -1], v); if (j.singular) continue;
    worstFr = Math.max(worstFr, Math.abs(j.sum - s.jetScoreFinal) / Math.max(s.jetScoreFinal, 1e-12)); if (j.sum < minFr) { minFr = j.sum; minFrStart = { start: s.start, subjectJetScoreFinal: s.jetScoreFinal, subjectJ: s.J, reference: j }; }
  }
  S.c3 = { starts: c3.starts.length, worstRelativeDifferenceJetSum: worstC3, referenceJetFloor: minC3, subjectJetFloor: c3.summary.jetFloor };
  S.free = { starts: fr.starts.length, worstRelativeDifferenceJetSum: worstFr, referenceJetFloor: minFr, referenceJetFloorStart: minFrStart, subjectJetFloor: fr.summary.jetFloor };
  log(`c3: 100 starts, worst relative difference of jet sum vs subject jetScoreFinal ${worstC3.toExponential(2)}; floor reference ${minC3.toExponential(3)} subject ${c3.summary.jetFloor.toExponential(3)}`);
  log(`free: 100 starts, worst relative difference ${worstFr.toExponential(2)}; floor reference ${minFr.toExponential(3)} (start ${minFrStart.start}) subject ${fr.summary.jetFloor.toExponential(3)}`);
  // F1 segregated best point of the subject's z0 scan, in the reference's normalization and the subject's scale-free one
  const f1 = JSON.parse(readFileSync('weber-binding-sphere-f1.json', 'utf8'));
  const sp = f1.z0Scan.segregated[0];
  {
    const X = sp.angles.map((a, k) => [Math.cos(a), Math.sin(a), k < 3 ? sp.z0OverA : -sp.z0OverA]); const q = [1, 1, 1, -1, -1, -1];
    const V = X.map((x) => scale(cross([0, 0, 1], x), sp.Omega));
    const sol = solveAccelerations({ X, V, q });
    let worst = 0, scaleF = 0, worstInv = 0;
    for (let i = 0; i < 6; i++) {
      let F = [0, 0, 0]; for (let j = 0; j < 6; j++) { if (j === i) continue; const dv = sub(X[i], X[j]); const d = norm(dv); F = add(F, scale(dv, q[i] * q[j] / (d * d * d))); }
      scaleF = Math.max(scaleF, norm(F));
      const Xp = [X[i][0], X[i][1], 0];
      worst = Math.max(worst, norm(add(sol.A[i], scale(Xp, sp.Omega ** 2))));
      worstInv = Math.max(worstInv, norm(add(F, scale(Xp, sp.Omega ** 2))));
    }
    S.f1SegregatedSubjectPoint = { z0OverA: sp.z0OverA, Omega: sp.Omega, angles: sp.angles, subjectResidualOverScale: sp.residualOverScale, referenceFullSolveOverOmega2R: worst / (sp.Omega ** 2 * Math.hypot(1, sp.z0OverA)), referenceInverseSquareOverScale: worstInv / scaleF, referenceFullSolveOverScale: worst / scaleF };
    log(`F1 segregated subject point z0/a=${sp.z0OverA} Omega=${sp.Omega}: subject residual/scale ${sp.residualOverScale}; reference full-solve/(Omega^2 R) ${(worst / (sp.Omega ** 2 * Math.hypot(1, sp.z0OverA))).toExponential(4)}, inverse-square/scale ${(worstInv / scaleF).toExponential(4)}, full-solve/scale ${(worst / scaleF).toExponential(4)}`);
  }
  // F1 mixed: subject best point in both normalizations
  {
    const mp = f1.z0Scan.mixed?.[0] ?? null;
    if (mp) {
      const X = mp.angles.map((a, k) => [Math.cos(a), Math.sin(a), k < 3 ? mp.z0OverA : -mp.z0OverA]); const q = f1.search.mixed.polarities;
      const V = X.map((x) => scale(cross([0, 0, 1], x), mp.Omega));
      const sol = solveAccelerations({ X, V, q });
      let worst = 0, scaleF = 0;
      for (let i = 0; i < 6; i++) { let F = [0, 0, 0]; for (let j = 0; j < 6; j++) { if (j === i) continue; const dv = sub(X[i], X[j]); const d = norm(dv); F = add(F, scale(dv, q[i] * q[j] / (d * d * d))); } scaleF = Math.max(scaleF, norm(F)); worst = Math.max(worst, norm(add(sol.A[i], scale([X[i][0], X[i][1], 0], mp.Omega ** 2)))); }
      S.f1MixedSubjectPoint = { z0OverA: mp.z0OverA, Omega: mp.Omega, angles: mp.angles, polarities: q, subjectResidualOverScale: mp.residualOverScale, referenceFullSolveOverOmega2R: worst / (mp.Omega ** 2 * Math.hypot(1, mp.z0OverA)), referenceFullSolveOverScale: worst / scaleF };
      log(`F1 mixed subject point z0/a=${mp.z0OverA} Omega=${mp.Omega} q=${q.join('')}: subject ${mp.residualOverScale}; reference /(Omega^2 R) ${(worst / (mp.Omega ** 2 * Math.hypot(1, mp.z0OverA))).toExponential(4)}, /scale ${(worst / scaleF).toExponential(4)}`);
    }
  }
  // octahedron about (1,1,1): least-squares Omega^2 of the inverse-square sums, both polarity assignments
  {
    const axis = unit([1, 1, 1]); const verts = [[1, 0, 0], [0, 1, 0], [0, 0, 1], [-1, 0, 0], [0, -1, 0], [0, 0, -1]];
    S.octahedronOmega2LS = {};
    for (const [name, q] of [['segregated', [1, 1, 1, -1, -1, -1]], ['mixed', [1, 1, -1, -1, -1, 1]]]) {
      let num = 0, den = 0;
      for (let i = 0; i < 6; i++) { let F = [0, 0, 0]; for (let j = 0; j < 6; j++) { if (j === i) continue; const dv = sub(verts[i], verts[j]); const d = norm(dv); F = add(F, scale(dv, q[i] * q[j] / (d * d * d))); } const Xp = sub(verts[i], scale(axis, dot(verts[i], axis))); num -= dot(Xp, F); den += dot(Xp, Xp); }
      S.octahedronOmega2LS[name] = num / den;
      log(`octahedron ${name}: Omega^2_LS = ${(num / den).toFixed(6)} (subject reports -0.457 for its antipodal assignment at R=1)`);
    }
  }
  // PI identity G'' = T + H along the reference flow (finite differences of G on RK4 steps of the frozen law module)
  {
    const { integrate, unflatten } = await import('../../binary-research/evidence/weber-frequency-reference-law.mjs');
    const { makeRng } = await import('./weber-binding-sphere-reference-lib.mjs');
    const rng = makeRng(7); let worst = 0;
    for (let trial = 0; trial < 10; trial++) {
      const q = [1, 1, 1, -1, -1, -1];
      const X = Array.from({ length: 6 }, () => scale(rng.unitVec(), 1 + rng.next())); const V = Array.from({ length: 6 }, () => scale(rng.unitVec(), 0.5 * rng.next()));
      const G = (st) => { let I = 0; for (const x of st.X) I += 0.5 * dot(x, x); let s = 0; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) s += q[i] * q[j] * norm(sub(st.X[i], st.X[j])); return I - s; };
      const TH = (st) => { let T = 0; for (const w of st.V) T += 0.5 * dot(w, w); let H = T; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const dv = sub(st.X[i], st.X[j]); const d = norm(dv); const ddot = dot(unit(dv), sub(st.V[i], st.V[j])); H += q[i] * q[j] / d * (1 - ddot * ddot / 2); } return T + H; };
      const h = 1e-3; const st0 = { X, V, q };
      const fwd = (T, n) => integrate(st0, T, n);
      const Gm2 = G(integrate({ X: X.map((x) => x.slice()), V: V.map((w) => scale(w, -1)), q }, 2 * h, 8)); // backward via velocity reversal (law is time-reversal symmetric)
      const Gm1 = G(integrate({ X: X.map((x) => x.slice()), V: V.map((w) => scale(w, -1)), q }, h, 4));
      const G0 = G(st0); const Gp1 = G(fwd(h, 4)); const Gp2 = G(fwd(2 * h, 8));
      const d2 = (-Gm2 + 16 * Gm1 - 30 * G0 + 16 * Gp1 - Gp2) / (12 * h * h);
      const rel = Math.abs(d2 - TH(st0)) / Math.abs(TH(st0));
      worst = Math.max(worst, rel);
    }
    S.piIdentity = { trials: 10, worstRelativeDifference: worst, statement: "G'' = T_kin + H with G = I - sum sigma_ij d_ij (K = 1), fourth-order finite difference along the reference RK4 flow, step 1e-3" };
    log(`PI identity G'' = T + H: worst relative difference over 10 random states ${worst.toExponential(2)}`);
  }
  out.supplementary = S;
  writeFileSync('weber-binding-sphere-reference-adjudication.json', JSON.stringify(out, jsonNum, 2));
  log('rewrote weber-binding-sphere-reference-adjudication.json with the supplementary block');
}
