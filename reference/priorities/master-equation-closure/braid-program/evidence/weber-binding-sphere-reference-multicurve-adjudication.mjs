// weber-binding-sphere-reference-multicurve-adjudication.mjs
// Adjudication of the multi-curve collocation lane's round 1 (frozen 23:22Z, 2026-10-06) by the great-circle closure lane.
// Own curve evaluator; the frozen reference library (unmodified) is the independent full-solve evaluator. The collocation
// lane's library is not imported. K = c_f = 1. Known cases first; the script stops if one fails.
// Usage (repository root): node reference/priorities/master-equation-closure/braid-program/evidence/weber-binding-sphere-reference-multicurve-adjudication.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { solveAccelerations, lawResidual, dot, cross, norm, scale, add, sub, unit } from './weber-binding-sphere-reference-lib.mjs';
import { assemble, luSolve } from '../../binary-research/evidence/weber-frequency-reference-law.mjs';

const ROOT = new URL('../../../../../', import.meta.url).pathname;
const DUMPS = ROOT + '.local-data/master-equation-closure/weber-binding-sphere/mc/';
const out = { script: 'weber-binding-sphere-reference-multicurve-adjudication.mjs', startedUTC: new Date().toISOString(), law: { K: 1, c_f: 1 } };
const log = (...a) => console.log(...a);
const HEXC = 5 / 4 - 1 / Math.sqrt(3);
const QALT = [1, -1, 1, -1, 1, -1];

// ---------- own curve evaluator: c[(i (2M+1) + s) 3 + a], s = 0 constant, 2m-1 cos(m tau), 2m sin(m tau) ----------
function curves(c, N, M, tau) {
  const nb = 2 * M + 1; const X = [], X1 = [], X2 = [];
  for (let i = 0; i < N; i++) {
    const x = [0, 0, 0], x1 = [0, 0, 0], x2 = [0, 0, 0];
    for (let a = 0; a < 3; a++) {
      x[a] += c[(i * nb) * 3 + a];
      for (let m = 1; m <= M; m++) { const ca = c[(i * nb + 2 * m - 1) * 3 + a], sa = c[(i * nb + 2 * m) * 3 + a]; const co = Math.cos(m * tau), si = Math.sin(m * tau);
        x[a] += ca * co + sa * si; x1[a] += m * (-ca * si + sa * co); x2[a] += -m * m * (ca * co + sa * si); }
    }
    X.push(x); X1.push(x1); X2.push(x2);
  }
  return { X, X1, X2 };
}
// fine-grid evaluation with the frozen full solve
function fine(c, N, M, omega, q, opt = {}) {
  const Nf = opt.Nf ?? 256, R = opt.R ?? 1, v = opt.v ?? null;
  const r = { maxAbsResidual: 0, maxLawAcc: 0, maxCurveAcc: 0, maxS: 0, maxV: 0, minSep: Infinity, detMin: Infinity, detMax: -Infinity, singular: false, speedMin: Infinity, speedMax: 0, radiusMin: Infinity, radiusMax: 0, pairSpread: 0, extentMax: 0 };
  const dmin = {}, dmax = {}; const lo = Array.from({ length: N }, () => [Infinity, Infinity, Infinity]), hi = Array.from({ length: N }, () => [-Infinity, -Infinity, -Infinity]); let sp2 = 0;
  for (let k = 0; k < Nf; k++) {
    const { X, X1, X2 } = curves(c, N, M, (2 * Math.PI * k) / Nf); const V = X1.map((x) => scale(x, omega));
    const sol = solveAccelerations({ X, V, q }); if (sol.singular) { r.singular = true; continue; }
    r.detMin = Math.min(r.detMin, sol.det); r.detMax = Math.max(r.detMax, sol.det);
    for (let i = 0; i < N; i++) {
      const ac = scale(X2[i], omega * omega); r.maxAbsResidual = Math.max(r.maxAbsResidual, norm(sub(ac, sol.A[i]))); r.maxLawAcc = Math.max(r.maxLawAcc, norm(sol.A[i])); r.maxCurveAcc = Math.max(r.maxCurveAcc, norm(ac));
      const rad = norm(X[i]), spd = norm(V[i]); sp2 += spd * spd / (N * Nf); r.radiusMin = Math.min(r.radiusMin, rad); r.radiusMax = Math.max(r.radiusMax, rad); r.speedMin = Math.min(r.speedMin, spd); r.speedMax = Math.max(r.speedMax, spd);
      r.maxS = Math.max(r.maxS, Math.abs(rad * rad - R * R) / (R * R)); if (v) r.maxV = Math.max(r.maxV, Math.abs(spd * spd - v * v) / (v * v));
      for (let a = 0; a < 3; a++) { lo[i][a] = Math.min(lo[i][a], X[i][a]); hi[i][a] = Math.max(hi[i][a], X[i][a]); }
      for (let j = i + 1; j < N; j++) { const d = norm(sub(X[i], X[j])); r.minSep = Math.min(r.minSep, d); const key = i * N + j; dmin[key] = Math.min(dmin[key] ?? Infinity, d); dmax[key] = Math.max(dmax[key] ?? 0, d); }
    }
  }
  for (const key of Object.keys(dmin)) r.pairSpread = Math.max(r.pairSpread, dmax[key] - dmin[key]);
  for (let i = 0; i < N; i++) r.extentMax = Math.max(r.extentMax, Math.hypot(hi[i][0] - lo[i][0], hi[i][1] - lo[i][1], hi[i][2] - lo[i][2]));
  r.vrms = Math.sqrt(sp2); const vref = v ?? r.vrms;
  r.E_omega = r.maxAbsResidual / (omega * omega * R); r.E_v = r.maxAbsResidual * R / (vref * vref); r.detSignChange = r.detMin < 0 && r.detMax > 0;
  return r;
}
const hexCoeff = (M) => { const nb = 2 * M + 1, c = new Array(6 * nb * 3).fill(0); for (let i = 0; i < 6; i++) { const ph = (i * Math.PI) / 3; c[(i * nb + 1) * 3 + 0] = Math.cos(ph); c[(i * nb + 2) * 3 + 0] = -Math.sin(ph); c[(i * nb + 1) * 3 + 1] = Math.sin(ph); c[(i * nb + 2) * 3 + 1] = Math.cos(ph); } return c; };
const sig = (x) => (typeof x === 'number' && Number.isFinite(x) ? Number(x.toPrecision(8)) : x);
const tidy = (o) => JSON.parse(JSON.stringify(o, (k, v) => (typeof v === 'number' ? sig(v) : v)));

// =========== known cases of this evaluator ===========
{
  const omH = Math.sqrt(HEXC); const h = fine(hexCoeff(3), 6, 3, omH, QALT, { v: omH });
  // pair circle: two unlike members diametrically opposite on a circle of radius a, omega^2 = 1/(4 a^3)
  const a = 0.7, omP = Math.sqrt(1 / (4 * a ** 3)); const cp = new Array(2 * 3 * 3).fill(0); cp[(0 * 3 + 1) * 3 + 0] = a; cp[(0 * 3 + 2) * 3 + 1] = a; cp[(1 * 3 + 1) * 3 + 0] = -a; cp[(1 * 3 + 2) * 3 + 1] = -a;
  const p = fine(cp, 2, 1, omP, [1, -1], { R: a, v: omP * a }), pOff = fine(cp, 2, 1, 1.05 * omP, [1, -1], { R: a });
  // relation between residuals on a non-solution: closed residual (candidate accelerations inserted) = M (solved - candidate)
  let rel = 0; { const c = hexCoeff(3); for (let k = 0; k < c.length; k++) c[k] += 0.05 * Math.sin(1.7 * k + 0.3); const { X, X1, X2 } = curves(c, 6, 3, 0.9); const om = 0.9; const V = X1.map((x) => scale(x, om)); const Ac = X2.map((x) => scale(x, om * om));
    const st = { X, V, q: QALT }; const sol = solveAccelerations(st); const { M, b } = assemble(st); const a_ = Ac.flat(); const d_ = sol.A.flat().map((x, k) => x - a_[k]); let closedMax = 0;
    for (let r = 0; r < 18; r++) { let s = b[r], t = 0; for (let k = 0; k < 18; k++) { s -= M[r][k] * a_[k]; t += M[r][k] * d_[k]; } rel = Math.max(rel, Math.abs(s - t)); closedMax = Math.max(closedMax, Math.abs(s)); }
    rel /= closedMax; out.knownRelation = { relDiff_closed_vs_M_times_solved: rel, closedResidualMax: closedMax, frozenLawResidualOfCandidate: lawResidual(st, Ac), solvedResidualMax: Math.max(...d_.map(Math.abs)) }; }
  out.known = tidy({ hexagon: { E: h.E_omega, S: h.maxS, V: h.maxV, det: [h.detMin, h.detMax] }, pairCircle: { E: p.E_omega, E_at_1p05_omega: pOff.E_omega, det: [p.detMin, p.detMax] }, relation: out.knownRelation });
  log('known', JSON.stringify(out.known));
  if (!(h.E_omega < 1e-12 && p.E_omega < 1e-12 && pOff.E_omega > 1e-3 && rel < 1e-12)) { throw new Error('known case failed'); }
}

// =========== (1) KC1 and KC5 ===========
{
  const omH = Math.sqrt(HEXC); const h = fine(hexCoeff(3), 6, 3, omH, QALT, { v: omH }); const o = fine(hexCoeff(3), 6, 3, 1.01 * omH, QALT, { v: omH }), o2 = fine(hexCoeff(3), 6, 3, 1.01 * omH, QALT, { v: 1.01 * omH });
  out.item1 = tidy({ KC1: { maxE: h.E_omega, maxS: h.maxS, maxV: h.maxV, det: [h.detMin, h.detMax], lane: { value: 2.7e-15, det: -137.096 } }, KC5: { maxE_at_1p01_omega: o.E_omega, maxV_vKept: o.maxV, maxV_vScaled: o2.maxV, lane: { maxE: 0.015540015886046164, maxV_vKept: 0.0201 } } });
  log('item1', JSON.stringify(out.item1));
}

// =========== (2) KC3 ===========
{
  const quad = (A, e, n = 8192) => { const k = 2, kap = 2, eps = -k / (2 * A), h = Math.sqrt(2 * Math.abs(eps) * A * A * (1 - e * e)); let sT = 0, sP = 0; for (let j = 0; j < n; j++) { const r = A * (1 - e * Math.cos((2 * Math.PI * j) / n)); sT += Math.sqrt(r * (r + kap)); sP += Math.sqrt(1 + kap / r) / r; }
    const w = (2 * Math.PI) / n, f = 1 / Math.sqrt(2 * Math.abs(eps)); return { Tr: f * sT * w, Phi: (h / 2) * f * sP * w, eps, h }; };
  const solveA = (target) => { let lo = 0.05, hi = 50; for (let it = 0; it < 200; it++) { const mid = 0.5 * (lo + hi); if (quad(mid, 0.3).Phi > target) lo = mid; else hi = mid; } return 0.5 * (lo + hi); }; // Phi decreases with A
  const rec = {};
  for (const [name, target, nRad, file, laneP] of [['Phi=2pi', 2 * Math.PI, 1, 'kc3-phi2-coefficients.json', 5.311758491618341], ['Phi=3pi/2', 1.5 * Math.PI, 2, 'kc3-phi1.5-coefficients.json', 30.002284299780786]]) {
    const A = solveA(target); const qd = quad(A, 0.3), qd2 = quad(A, 0.3, 16384); const P = nRad * qd.Tr;
    const r = { A, epsilon: qd.eps, h: qd.h, PhiOverPi: qd.Phi / Math.PI, periodQuadrature: P, quadratureChangeOnDoubling: Math.abs(qd2.Tr - qd.Tr), lanePeriodQuadrature: laneP, periodDiff: P - laneP };
    const path = ROOT + '.tmp/weber-binding-sphere/mc/' + file;
    if (existsSync(path)) { const st = JSON.parse(readFileSync(path, 'utf8')); const f = fine(st.c, 2, st.M, st.omega, [1, -1], { Nf: 1024 });
      // invariants read off the stored curve: pericentre, apocentre, relative angular momentum
      let hmin = Infinity, hmax = 0; for (let k = 0; k < 64; k++) { const { X, X1 } = curves(st.c, 2, st.M, (2 * Math.PI * k) / 64); const rr = sub(X[0], X[1]), ww = scale(sub(X1[0], X1[1]), st.omega); const hh = norm(cross(rr, ww)); hmin = Math.min(hmin, hh); hmax = Math.max(hmax, hh); }
      Object.assign(r, { storedM: st.M, storedOmega: st.omega, periodFromStoredOmega: (2 * Math.PI) / st.omega, periodStoredMinusMyQuadrature: (2 * Math.PI) / st.omega - P, fine1024: { maxAbsResidual: f.maxAbsResidual, maxLawAcc: f.maxLawAcc, relResidual: f.maxAbsResidual / f.maxLawAcc, rPeri: f.minSep, det: [f.detMin, f.detMax], speed: [f.speedMin, f.speedMax], pairSpread: f.pairSpread }, relAngularMomentum: [hmin, hmax], rPeriQuadrature: A * 0.7, rApoQuadrature: A * 1.3 });
    } else r.storedCoefficients = 'not found at ' + path;
    rec[name] = r;
  }
  out.item2 = tidy(rec); log('item2', JSON.stringify(out.item2));
}

// ---------- dumps ----------
const dumpFiles = readdirSync(DUMPS).filter((f) => f.startsWith('search-') && f.endsWith('.jsonl') && !f.includes('-r2-'));
const loadDump = (f) => readFileSync(DUMPS + f, 'utf8').split('\n').filter((l) => l.trim()).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
const fitRigid = (X, V) => { // least-squares W with V_i = W x X_i
  const Am = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], bv = [0, 0, 0];
  for (let i = 0; i < X.length; i++) { const x = X[i]; const C = [[0, x[2], -x[1]], [-x[2], 0, x[0]], [x[1], -x[0], 0]]; // V = C W
    for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) { for (let k = 0; k < 3; k++) Am[a][b] += C[k][a] * C[k][b]; } for (let a = 0; a < 3; a++) for (let k = 0; k < 3; k++) bv[a] += C[k][a] * V[i][k]; }
  const W = luSolve(Am, bv).x; let res = 0, sc = 0; for (let i = 0; i < X.length; i++) { res = Math.max(res, norm(sub(V[i], cross(W, X[i])))); sc = Math.max(sc, norm(V[i])); }
  return { W, relResidual: res / sc };
};
function rigidReport(c, omega, q) {
  const f = fine(c, 6, 3, omega, q); const { X, X1 } = curves(c, 6, 3, 0); const V = X1.map((x) => scale(x, omega)); const fr = fitRigid(X, V); const n = unit(fr.W); const Om = norm(fr.W);
  let bal = 0; const axial = [], height = [], speed = [], radius = [];
  for (let i = 0; i < 6; i++) { const xp = sub(X[i], scale(n, dot(X[i], n))); let g = scale(xp, Om * Om); for (let j = 0; j < 6; j++) if (j !== i) { const d = sub(X[i], X[j]); g = add(g, scale(d, q[i] * q[j] / norm(d) ** 3)); }
    bal = Math.max(bal, norm(g) / (Om * Om * norm(xp))); axial.push(norm(xp)); height.push(dot(X[i], n)); speed.push(norm(V[i])); radius.push(norm(X[i])); }
  return tidy({ omega, fineE_omegaNorm: f.E_omega, fineAbsResidual: f.maxAbsResidual, pairDistanceSpread: f.pairSpread, rigidFitRelResidual: fr.relResidual, absW: Om, absW_minus_omega: Om - omega, inverseSquareBalanceRel: bal, axialDistances: axial, heights: height, speeds: speed, radii: radius, det: [f.detMin, f.detMax], minSep: f.minSep, q });
}

// =========== (3) P1 and P2 ===========
{
  const find = (file, start, key) => { const L = loadDump(file); const e = L.find((x) => x.start === start); return e ? e.results[key] : null; };
  const p1 = find('search-free-nobox-0.jsonl', 38, 'stage1'), p2 = find('search-w111111-box3-0.jsonl', 7, 'stage1');
  out.item3 = { P1: p1 ? { laneClassification: p1.classification, ...rigidReport(p1.c, p1.omega, QALT) } : 'not found', P2: p2 ? { laneClassification: p2.classification, ...rigidReport(p2.c, p2.omega, QALT) } : 'not found' };
  log('item3', JSON.stringify(out.item3));
}

// =========== (4)-(6): every stage-2 result of every dump, re-evaluated ===========
const stratumOf = (f) => (f.includes('-dev-') ? 'development' : f.split('-')[1]); const modeOf = (f) => (f.includes('vnorm') ? 'speed-normalized, box 3' : f.includes('box3') || f.includes('dev-box') ? 'specified, box 3' : 'specified');
const all = []; const cover = {};
for (const f of dumpFiles) {
  const L = loadDump(f); const key = stratumOf(f) + ' | ' + modeOf(f); cover[key] ??= { files: [], starts: 0, reach: 0, targets: 0, stage2FromTargets: 0, laneHexagonStage2: 0, myCandidates: 0, myCandidatesNotHexagon: 0, myHexagons: 0 };
  cover[key].files.push(f);
  for (const e of L) { const isReach = String(e.type).startsWith('reach'); cover[key].starts++; if (isReach) cover[key].reach++; else cover[key].targets++;
    for (const rk of Object.keys(e.results || {})) { const r = e.results[rk]; if (!r || r.stage !== 2 || !r.c) continue; if (r.M !== 3) continue;
      const ev = fine(r.c, 6, 3, r.omega, QALT, { v: r.v });
      const isHex = !ev.singular && ev.pairSpread < 1e-6 && Math.abs(ev.radiusMax - ev.radiusMin) < 1e-6 && Math.abs((ev.vrms / ev.radiusMax) ** 2 * ev.radiusMax ** 3 - HEXC) < 1e-6;
      const cand = !ev.singular && Math.max(ev.E_omega, ev.E_v, ev.maxS, ev.maxV) <= 1e-8;
      if (!isReach) { cover[key].stage2FromTargets++; if (r.hexagon) cover[key].laneHexagonStage2++; if (cand) cover[key].myCandidates++; if (cand && !isHex) cover[key].myCandidatesNotHexagon++; if (isHex) cover[key].myHexagons++; }
      all.push({ file: f, start: e.start, type: e.type, route: rk, isReach, omega: r.omega, v: r.v, laneScore: r.score, laneHexagon: !!r.hexagon, ev, isHex, cand, c: r.c }); } }
}
out.item6_coverage = cover; let tot = { starts: 0, targets: 0, stage2: 0, cands: 0, candsNotHex: 0 }; for (const k of Object.keys(cover)) { tot.starts += cover[k].starts; tot.targets += cover[k].targets; tot.stage2 += cover[k].stage2FromTargets; tot.cands += cover[k].myCandidates; tot.candsNotHex += cover[k].myCandidatesNotHexagon; }
out.item6_totals = tot; log('item6', JSON.stringify(cover), JSON.stringify(tot));
// agreement of my E (omega normalization) with the lane's stored fine maxE over all stage-2 results
{ let n = 0; const diffs = []; let nonStartLines = 0;
  for (const f of dumpFiles) for (const e of loadDump(f)) { if (e.start === undefined) { nonStartLines++; continue; } for (const rk of Object.keys(e.results || {})) { const r = e.results[rk]; if (!r || r.stage !== 2 || !r.c || !r.fine || r.M !== 3) continue; const mine = all.find((x) => x.file === f && x.start === e.start && x.route === rk); if (!mine || mine.ev.singular || !(r.fine.maxE > 0)) continue; n++;
    diffs.push({ rel: Math.abs(mine.ev.E_omega - r.fine.maxE) / r.fine.maxE, relS: Math.abs(mine.ev.maxS - r.fine.maxS) / Math.max(r.fine.maxS, 1e-300), file: f, start: e.start, route: rk, laneE: r.fine.maxE, myE: mine.ev.E_omega, det: [mine.ev.detMin, mine.ev.detMax], speedMax: mine.ev.speedMax, minSep: mine.ev.minSep, hex: mine.isHex }); } }
  diffs.sort((a, b) => b.rel - a.rel); const nonHex = diffs.filter((d) => !d.hex);
  out.agreementWithLaneFineE = tidy({ compared: n, nonStartLinesInDumps: nonStartLines, worstRelDiff: diffs[0].rel, countAbove1em6: diffs.filter((d) => d.rel > 1e-6).length, countAbove1em9: diffs.filter((d) => d.rel > 1e-9).length, medianRelDiff_nonHexagon: nonHex[Math.floor(nonHex.length / 2)].rel, comparedNonHexagon: nonHex.length, worstRelDiff_nonHexagon: nonHex[0].rel, worstNonHexagon: nonHex[0], countNonHexagonAbove1em9: nonHex.filter((d) => d.rel > 1e-9).length, worstRelDiff_S_nonHexagon: Math.max(...nonHex.map((d) => d.relS)), worstThree: diffs.slice(0, 3) });
  log('agreement', JSON.stringify(out.agreementWithLaneFineE)); }

const describe = (x) => { const ev = x.ev; const loop = ev.extentMax; let kind = 'other';
  if (ev.singular) kind = 'singular at a fine-grid phase'; else if (loop < 0.02) kind = 'micro-loop'; else if (ev.pairSpread < 1e-3 * ev.radiusMax && ev.speedMax > 10) kind = 'fast rigid'; else if (ev.speedMax > 10) kind = 'fast, non-rigid';
  else if (x.file.includes('box3') && ev.speedMax > 2.95 && ev.speedMax < 3.2) kind = ev.pairSpread < 1e-3 ? 'box-limited (rigid, on the speed box)' : 'box-limited (on the speed box)';
  return tidy({ file: x.file, start: x.start, type: x.type, route: x.route, omega: x.omega, v: x.v, laneScore: x.laneScore, my: { E_vNorm: ev.E_v, E_omegaNorm: ev.E_omega, S: ev.maxS, V: ev.maxV, loopExtent: loop, speed: [ev.speedMin, ev.speedMax], pairSpread: ev.pairSpread, minSep: ev.minSep, det: [ev.detMin, ev.detMax], detSignChange: ev.detSignChange }, kind }); };

// =========== (4) the two degenerate limits on stored states ===========
{
  const targetsS2 = all.filter((x) => !x.isReach && !x.isHex);
  const micro = targetsS2.filter((x) => x.file === 'search-free-nobox-0.jsonl').sort((a, b) => a.laneScore - b.laneScore)[0];
  const fast = targetsS2.filter((x) => x.file === 'search-c3-nobox-0.jsonl').sort((a, b) => a.laneScore - b.laneScore)[0];
  const rec = { microLoop: describe(micro), fastRigid: describe(fast) };
  rec.microLoop.prediction_v_over_omegaR = sig(micro.v / micro.omega); rec.microLoop.maxLawAcc = sig(micro.ev.maxLawAcc); rec.microLoop.maxCurveAcc = sig(micro.ev.maxCurveAcc); rec.microLoop.absResidualOverLawAcc = sig(micro.ev.maxAbsResidual / micro.ev.maxLawAcc);
  // fast rigid: E = -M^{-1} g / (omega^2 R), g_i = sum sigma e/d^2 + omega^2 X_perp; limit -M^{-1} X_perp / R
  { const { X, X1, X2 } = curves(fast.c, 6, 3, 0); const V = X1.map((x) => scale(x, fast.omega)); const fr = fitRigid(X, V); const n = unit(fr.W); const Om = norm(fr.W); const st = { X, V, q: QALT }; const { M } = assemble(st);
    const xp = X.map((x) => sub(x, scale(n, dot(x, n)))); const g = xp.map((x, i) => { let s = scale(x, Om * Om); for (let j = 0; j < 6; j++) if (j !== i) { const d = sub(X[i], X[j]); s = add(s, scale(d, QALT[i] * QALT[j] / norm(d) ** 3)); } return s; });
    const y = luSolve(M, xp.flat()).x, yg = luSolve(M, g.flat()).x; const sol = solveAccelerations(st); let eMeasured = 0, eLimit = 0, eExact = 0, vecDiff = 0;
    for (let i = 0; i < 6; i++) { const Ei = scale(sub(scale(X2[i], fast.omega ** 2), sol.A[i]), 1 / fast.omega ** 2); const yi = [y[3 * i], y[3 * i + 1], y[3 * i + 2]], ygi = [yg[3 * i], yg[3 * i + 1], yg[3 * i + 2]];
      eMeasured = Math.max(eMeasured, norm(Ei)); eLimit = Math.max(eLimit, norm(yi)); eExact = Math.max(eExact, norm(ygi) / Om ** 2); vecDiff = Math.max(vecDiff, norm(add(Ei, scale(ygi, 1 / Om ** 2)))); }
    Object.assign(rec.fastRigid, tidy({ rigidFitRelResidual: fr.relResidual, absW: Om, axialDistances: xp.map(norm), E_measured_phase0: eMeasured, norm_Minv_Xperp_over_R: eLimit, norm_Minv_g_over_omega2R: eExact, max_vector_diff_E_plus_Minv_g_over_omega2: vecDiff, laneHandEstimate: 8.2e-3, laneMeasured: 8.3e-3 })); }
  out.item4 = rec; log('item4', JSON.stringify(rec));
}

// =========== (5) ten lowest-scoring non-hexagon stage-2 results of the unconstrained stratum ===========
{
  const pool = all.filter((x) => !x.isReach && !x.isHex && !x.laneHexagon && x.file.startsWith('search-free-'));
  const bySpec = pool.filter((x) => x.file === 'search-free-nobox-0.jsonl').sort((a, b) => a.laneScore - b.laneScore).slice(0, 10).map(describe);
  const byAll = pool.slice().sort((a, b) => a.laneScore - b.laneScore).slice(0, 10).map(describe);
  const byVnorm = pool.filter((x) => x.file.includes('vnorm')).sort((a, b) => a.laneScore - b.laneScore).slice(0, 10).map(describe);
  out.item5 = { pooledUnconstrained_allModes_tenLowest: byAll, specifiedResidual_noBox_tenLowest: bySpec, speedNormalized_tenLowest: byVnorm };
  log('item5 pooled', JSON.stringify(byAll.map((x) => [x.file.replace('search-free-', '').replace('.jsonl', ''), x.start, x.route, x.laneScore, x.my.E_vNorm, x.my.S, x.my.V, x.kind, x.my.detSignChange])));
  log('item5 spec', JSON.stringify(bySpec.map((x) => [x.start, x.route, x.laneScore, x.my.E_vNorm, x.kind, x.my.detSignChange])));
  log('item5 vnorm', JSON.stringify(byVnorm.map((x) => [x.file.replace('search-free-', '').replace('.jsonl', ''), x.start, x.route, x.laneScore, x.my.E_vNorm, x.my.S, x.my.V, x.kind, x.my.detSignChange, x.my.pairSpread])));
}
// reach starts: stored stage-2 results re-evaluated (the solves themselves were not rerun)
{ const rs = all.filter((x) => x.isReach); const starts = new Set(rs.map((x) => x.file + ':' + x.start)); let worst = 0; for (const x of rs) if (x.cand) worst = Math.max(worst, x.ev.E_omega, x.ev.maxS, x.ev.maxV);
  out.reach = tidy({ reachStartsWithStage2: starts.size, reachStage2Results: rs.length, myHexagonCandidates: rs.filter((x) => x.cand && x.isHex).length, notHexagon: rs.filter((x) => !(x.cand && x.isHex)).map((x) => [x.file, x.start, x.route, x.laneScore]), worstResidualAmongThem: worst }); log('reach', JSON.stringify(out.reach)); }
// per-dump counts over non-hexagon stage-2 results of target starts
{ const cnt = {}; for (const x of all) { if (x.isReach || x.isHex) continue; const k = x.file.replace('search-', '').replace('.jsonl', ''); cnt[k] ??= { nonHexStage2: 0, omegaAbove100: 0, speedAbove3p1: 0, detSignChange: 0, singular: 0, microLoop: 0, minMyScore: Infinity, minMyScore_vNorm: Infinity };
    const c = cnt[k]; c.nonHexStage2++; if (x.omega > 100) c.omegaAbove100++; if (x.ev.speedMax > 3.1) c.speedAbove3p1++; if (x.ev.detSignChange) c.detSignChange++; if (x.ev.singular) c.singular++; if (x.ev.extentMax < 0.02) c.microLoop++;
    if (!x.ev.singular) { c.minMyScore = Math.min(c.minMyScore, Math.max(x.ev.E_omega, x.ev.maxS, x.ev.maxV)); c.minMyScore_vNorm = Math.min(c.minMyScore_vNorm, Math.max(x.ev.E_v, x.ev.maxS, x.ev.maxV)); } }
  out.perDumpCounts = tidy(cnt); for (const [k, v] of Object.entries(out.perDumpCounts)) log('counts', k, JSON.stringify(v)); }
out.finishedUTC = new Date().toISOString();
writeFileSync(new URL('./weber-binding-sphere-reference-multicurve-adjudication.json', import.meta.url), JSON.stringify(out, (k, v) => (k === 'c' ? undefined : v), 1));
log('written', out.finishedUTC);
