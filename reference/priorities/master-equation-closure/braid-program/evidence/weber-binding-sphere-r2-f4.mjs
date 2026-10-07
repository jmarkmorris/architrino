#!/usr/bin/env node
// weber-binding-sphere-r2-f4.mjs — round 2, family F4: stacked latitude circles with integer rate ratios.
// Members move at the common constant speed v on circles z = z_k of radius a_k = sqrt(R^2 - z_k^2) about the z axis,
// rate w_k = v/a_k, lap period 2 pi a_k / v.  Prescribed path of a member on circle k with phase phi and sense s:
//   X = (a_k cos(s w_k T + phi), a_k sin(.), z_k),  V = s v (-sin, cos, 0),  A_req = -w_k^2 (x, y, 0),
// so X.A = -w_k^2 a_k^2 = -v^2 and V.A = 0 identically (checked numerically below).  The assembly is periodic with
// the common period when the a_k are commensurate; otherwise the residual is sampled over 8 laps of the largest
// circle.  Residual normalisation: v^2 / R (the centripetal scale of the largest circle).  R = 1 throughout.
// Cases: (i) three antipodal opposite-polarity pairs, one pair per (z, -z) circle pair; (ii) 2+2+2 same-circle pairs
// (+ at phi, - at phi + pi on one circle; sum z = 0 imposed); (iii) 4+2 alternating square on z = 0 plus one antipodal
// pair; (iv) 3+3 triangles (+-+ on a = 1, -+- on the smaller circle; sum X is not zero for this case, which is stated).
// For each: grid over v in {0.3, 0.5, 0.7, 1}, phases per circle (12-grid, first circle fixed) and sense classes; then
// Levenberg-Marquardt refinement over (z_k, phi_k, v) with the rate ratios free (box |z_k| <= 0.95) and separately
// with the ratios pinned; and a continuous ratio scan to see whether the landscape prefers rational ratios.
// Usage: node weber-binding-sphere-r2-f4.mjs
import fs from 'node:fs';
import path from 'node:path';
import { COEFF, HERE, DATA_DIR, ensureDirs, params, utc, log, writeJson, v3, pathResidual, levenbergMarquardt, hexagonOmega, speedLabels } from './weber-binding-sphere-instrument.mjs';
import { REPO_ROOT, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

ensureDirs();
const OUT = path.join(DATA_DIR, 'r2-f4'); fs.mkdirSync(OUT, { recursive: true });
const RECEIPT = path.join(HERE, 'weber-binding-sphere-r2-f4.json');
const R = 1, VS = [0.3, 0.5, 0.7, 1.0], NPH = 12, ZMAX = 0.95;
const rec = { family: 'F4 stacked latitude circles with integer rate ratios', law: COEFF, R, started: utc(), box: { v: VS, phaseGrid: NPH, zMax: ZMAX, refinementV: [0.1, 2], samplesCommensurate: 96, lapsIncommensurate: 8 } };
const t0 = Date.now();

// members: [{circle: k, q, phase (relative), sense (relative, +1/-1 multiplies circle sense)}]; circles: [{z, phase, sense}]
function commonPeriod(as, v) {
  const T = as.map(a => 2 * Math.PI * a / v), Tmax = Math.max(...T);
  for (let n = 1; n <= 48; n++) { const P = n * Math.min(...T); if (T.every(t => Math.abs(P / t - Math.round(P / t)) < 1e-9)) return { P, commensurate: true, laps: T.map(t => Math.round(P / t)) }; }
  return { P: 8 * Tmax, commensurate: false, laps: T.map(t => 8 * Tmax / t) };
}
function buildPath(members, circles, v) {
  const as = circles.map(c => Math.sqrt(Math.max(1e-12, R * R - c.z * c.z)));
  return { as, path: T => { const x = [], vv = [], areq = []; for (const m of members) { const c = circles[m.circle], a = as[m.circle], s = m.sense * c.sense, w = v / a, th = s * w * T + c.phase + m.phase, cs = Math.cos(th), sn = Math.sin(th); x.push([a * cs, a * sn, c.z]); vv.push([-s * v * sn, s * v * cs, 0]); areq.push([-w * w * a * cs, -w * w * a * sn, 0]); } return { x, v: vv, areq }; } };
}
function evaluate(members, circles, v, opt = {}) {
  const { as, path } = buildPath(members, circles, v), q = members.map(m => m.q), cp = commonPeriod(as, v);
  const nT = cp.commensurate ? Math.max(96, 32 * Math.max(...cp.laps)) : 256;
  const r = pathResidual({ q, path, Omega: Math.sqrt(v * v / R / R), R, period: cp.P, nT, condition: opt.condition ?? 'none' });
  // normalisation by Omega^2 R with Omega^2 = v^2/R^2 equals v^2/R; radialRel/tangentialRel in pathResidual are per Omega^2 R^2 and Omega^2 R v
  return { residual: r.maxRel, radial: r.radialRel, tangential: r.tangentialRel, binormal: r.binormalRel, components: r.components, minSep: r.minSep, minAbsDet: r.minAbsDet, maxCond: r.maxCond, speed: r.speedLabels, period: cp.P, commensurate: cp.commensurate, laps: cp.laps, as, sigmaSumSpread: r.sigmaSumSpread, HPlus3v2: r.HPlus3v2, failures: r.failures.length };
}
// discretised residual vector for least squares (fixed sampling over the common period or 8 laps)
function residualVector(members, circles, v, nT = 128) {
  const { as, path } = buildPath(members, circles, v), q = members.map(m => m.q), cp = commonPeriod(as, v), P = params(q, COEFF, 'none'), out = [];
  for (let k = 0; k < nT; k++) { const T = k * cp.P / nT, s = path(T), y = new Float64Array(36); for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) { y[3 * i + a] = s.x[i][a]; y[18 + 3 * i + a] = s.v[i][a]; } let A; try { A = solveAccelerations(y, P).A; } catch { return new Array(18 * nT).fill(1e3); } for (let i = 0; i < 6; i++) for (let a = 0; a < 3; a++) out.push((A[3 * i + a] - s.areq[i][a]) / (v * v / R)); }
  return out;
}

// ---------------------------------------------------------------- known cases
rec.knownCases = [];
{ // K1: antipodal pair on z = 0, v = Omega rho = 1/2 at rho = 1
  const members = [{ circle: 0, q: 1, phase: 0, sense: 1 }, { circle: 0, q: -1, phase: Math.PI, sense: 1 }], circles = [{ z: 0, phase: 0, sense: 1 }];
  const e = evaluate(members, circles, 0.5, { condition: 'exact' });
  rec.knownCases.push({ id: 'K1-antipodal-pair-z0', residual: e.residual, det: e.minAbsDet, pass: e.residual <= 1e-14 });
  // jet identities X.A_req + v^2 = 0 and V.A_req = 0 on the prescribed path (geometry, not the law)
  const { path } = buildPath(members, circles, 0.5); let worst = 0; for (let k = 0; k < 50; k++) { const s = path(k * 0.37); for (let i = 0; i < 2; i++) worst = Math.max(worst, Math.abs(v3.dot(s.x[i], s.areq[i]) + 0.25), Math.abs(v3.dot(s.v[i], s.areq[i]))); }
  rec.knownCases.push({ id: 'K0-prescribed-path-identities', worst, pass: worst <= 1e-14 });
}
{ // F0: hexagon on z = 0 at v = Omega_hex
  const members = [0, 1, 2, 3, 4, 5].map(k => ({ circle: 0, q: k % 2 ? -1 : 1, phase: k * Math.PI / 3, sense: 1 })), circles = [{ z: 0, phase: 0, sense: 1 }];
  const e = evaluate(members, circles, hexagonOmega(1), { condition: 'exact' });
  rec.knownCases.push({ id: 'F0-hexagon-z0', residual: e.residual, pass: e.residual <= 1e-14 });
  const e2 = evaluate(members, circles, 1.05 * hexagonOmega(1)); rec.knownCases.push({ id: 'F0-hexagon-wrong-speed', residual: e2.residual, pass: e2.residual >= 1e-2 });
}
for (const k of rec.knownCases) log(`${k.pass ? 'PASS' : 'FAIL'} ${k.id}: ${JSON.stringify(k)}`);
if (!rec.knownCases.every(k => k.pass)) { writeJson(RECEIPT, rec); process.exit(1); }

// ---------------------------------------------------------------- case constructors
const zOf = a => Math.sqrt(Math.max(0, R * R - a * a));
function caseAntipodal(as, zSigns, senses) {
  // pair k: + on circle (z_k) phase 0, - on circle (-z_k) phase pi; equatorial pair uses one circle
  const circles = [], members = [];
  as.forEach((a, k) => { const z = zOf(a) * zSigns[k]; if (z === 0) { circles.push({ z: 0, phase: 0, sense: senses[k] }); const c = circles.length - 1; members.push({ circle: c, q: 1, phase: 0, sense: 1 }, { circle: c, q: -1, phase: Math.PI, sense: 1 }); } else { circles.push({ z, phase: 0, sense: senses[k] }, { z: -z, phase: 0, sense: senses[k], tied: circles.length }); const c = circles.length - 2; members.push({ circle: c, q: 1, phase: 0, sense: 1 }, { circle: c + 1, q: -1, phase: Math.PI, sense: 1 }); } });
  return { circles, members };
}
function caseSameCircle(as, zs, senses) { const circles = as.map((a, k) => ({ z: zs[k], phase: 0, sense: senses[k] })), members = []; as.forEach((a, k) => members.push({ circle: k, q: 1, phase: 0, sense: 1 }, { circle: k, q: -1, phase: Math.PI, sense: 1 })); return { circles, members }; }
function caseSquarePlusPair(a2, zSign, senses) { const circles = [{ z: 0, phase: 0, sense: senses[0] }, { z: zOf(a2) * zSign, phase: 0, sense: senses[1] }, { z: -zOf(a2) * zSign, phase: 0, sense: senses[1], tied: 1 }]; const members = [0, 1, 2, 3].map(k => ({ circle: 0, q: k % 2 ? -1 : 1, phase: k * Math.PI / 2, sense: 1 })); members.push({ circle: 1, q: 1, phase: 0, sense: 1 }, { circle: 2, q: -1, phase: Math.PI, sense: 1 }); return { circles, members }; }
function caseTriangles(a2, zSign, order, senses) { const circles = [{ z: 0, phase: 0, sense: senses[0] }, { z: zOf(a2) * zSign, phase: 0, sense: senses[1] }]; const members = []; for (let k = 0; k < 3; k++) { members.push({ circle: 0, q: order === 0 ? (k === 1 ? -1 : 1) : (k === 1 ? 1 : -1), phase: 2 * Math.PI * k / 3, sense: 1 }); members.push({ circle: 1, q: order === 0 ? (k === 1 ? 1 : -1) : (k === 1 ? -1 : 1), phase: 2 * Math.PI * k / 3, sense: 1 }); } return { circles, members }; }

// independent phases: circles not tied (tied circles share the phase and sense of their partner)
function freeCircles(circles) { return circles.map((c, k) => k).filter(k => circles[k].tied === undefined); }
function applyTies(circles) { for (const c of circles) if (c.tied !== undefined) { c.phase = circles[c.tied].phase; c.sense = circles[c.tied].sense; c.z = -circles[c.tied].z; } }

// ---------------------------------------------------------------- grid search over phases, senses, v for one case
function gridSearch(name, cs, extra = {}) {
  const fc = freeCircles(cs.circles), nFree = fc.length - 1; // first free circle phase fixed at 0
  const senseClasses = []; const nS = fc.length; for (let m = 0; m < (1 << (nS - 1)); m++) { const s = [1]; for (let b = 0; b < nS - 1; b++) s.push((m >> b) & 1 ? -1 : 1); senseClasses.push(s); }
  let best = null, count = 0; const perV = {};
  for (const v of VS) for (const sc of senseClasses) {
    fc.forEach((k, i) => { cs.circles[k].sense = sc[i]; });
    const idx = new Array(nFree).fill(0);
    const total = Math.pow(NPH, nFree);
    for (let g = 0; g < total; g++) {
      let gg = g; for (let i = 0; i < nFree; i++) { idx[i] = gg % NPH; gg = Math.floor(gg / NPH); }
      fc.forEach((k, i) => { cs.circles[k].phase = i === 0 ? 0 : 2 * Math.PI * idx[i - 1] / NPH; }); applyTies(cs.circles);
      const e = evaluate(cs.members, cs.circles, v); count++;
      const row = { v, senses: sc.slice(), phases: fc.map(k => cs.circles[k].phase), ...e };
      if (!perV[v] || e.residual < perV[v].residual) perV[v] = row;
      if (!best || e.residual < best.residual) best = row;
    }
  }
  return { name, evaluations: count, best, bestPerV: VS.map(v => perV[v]), senseClasses: senseClasses.length, ...extra };
}
// ---------------------------------------------------------------- least-squares refinement from a grid best
function refine(name, cs, start, mode, pinnedRatios) {
  // parameters: z of free non-equatorial circles (free-ratio mode) or z of the first non-equatorial circle (pinned), phases of free circles except the first, v
  const fc = freeCircles(cs.circles), nonEq = fc.filter(k => Math.abs(cs.circles[k].z) > 1e-12);
  fc.forEach((k, i) => { cs.circles[k].sense = start.senses[i]; });
  const zParams = mode === 'free' ? nonEq : [], p0 = []; // pinned: every z fixed by the case's ratios, only phases and v free
  for (const k of zParams) p0.push(cs.circles[k].z); for (const k of fc.slice(1)) p0.push(cs.circles[k].phase); p0.push(start.v);
  const unpack = p => { let i = 0; const c = cs.circles.map(c => ({ ...c })); for (const k of zParams) { c[k].z = Math.max(-ZMAX, Math.min(ZMAX, p[i++])); }  for (const k of fc.slice(1)) c[k].phase = p[i++]; const v = Math.max(0.1, Math.min(2, Math.abs(p[i]))); for (const cc of c) if (cc.tied !== undefined) { cc.phase = c[cc.tied].phase; cc.sense = c[cc.tied].sense; cc.z = -c[cc.tied].z; } return { circles: c, v }; };
  const lm = levenbergMarquardt(p => { const u = unpack(p); return residualVector(cs.members, u.circles, u.v); }, p0, { maxIter: 60, fdStep: 1e-6 });
  const u = unpack(lm.p), e = evaluate(cs.members, u.circles, u.v, { condition: 'exact' });
  return { name, mode, pinnedRatios: pinnedRatios ?? null, from: start.residual, residual: e.residual, radial: e.radial, tangential: e.tangential, binormal: e.binormal, v: u.v, zs: u.circles.map(c => c.z), as: e.as, ratios: e.as.map(a => a / e.as[0]), phases: u.circles.map(c => c.phase), senses: u.circles.map(c => c.sense), minSep: e.minSep, minAbsDet: e.minAbsDet, speed: e.speed, commensurate: e.commensurate, iter: lm.iter, reason: lm.reason };
}

// ---------------------------------------------------------------- case list
const cases = [];
for (const [label, as] of [['1:2:3', [1, 1 / 2, 1 / 3]], ['1:2:2', [1, 1 / 2, 1 / 2]], ['2:1:2 ordering (a=1/2,1,1/2)', [1 / 2, 1, 1 / 2]], ['incommensurate control (1/sqrt2,1/sqrt2,1)', [1 / Math.SQRT2, 1 / Math.SQRT2, 1]]]) {
  const nz = as.filter(a => a < 1).length; const signSets = nz === 2 ? [[1, 1], [1, -1]] : nz === 3 ? [[1, 1, 1], [1, 1, -1]] : [[1]];
  for (const ss of signSets) { const zSigns = []; let j = 0; for (const a of as) zSigns.push(a < 1 ? ss[j++] : 0); cases.push({ family: 'i antipodal pairs', label: `${label} zSigns ${ss.join('')}`, build: senses => caseAntipodal(as, zSigns, senses), ratios: as.map(a => a / Math.max(...as)) }); }
}
cases.push({ family: 'ii same-circle pairs', label: '1:2:2 at z = 0, +sqrt3/2, -sqrt3/2', build: senses => caseSameCircle([1, 1 / 2, 1 / 2], [0, Math.sqrt(3) / 2, -Math.sqrt(3) / 2], senses), ratios: [1, 1 / 2, 1 / 2], sumZ: 0 });
cases.push({ family: 'ii same-circle pairs', label: '1:1:2 at z = +1/2, -1/2, 0 (a = sqrt3/2, sqrt3/2, 1)', build: senses => caseSameCircle([Math.sqrt(3) / 2, Math.sqrt(3) / 2, 1], [0.5, -0.5, 0], senses), ratios: [1, 1, 2 / Math.sqrt(3)], sumZ: 0 });
for (const zs of [1, -1]) cases.push({ family: 'iii square plus antipodal pair', label: `square on z=0, pair on a=1/2, + member at z ${zs > 0 ? '+' : '-'}`, build: senses => caseSquarePlusPair(1 / 2, zs, senses), ratios: [1, 1 / 2] });
for (const zs of [1, -1]) for (const order of [0, 1]) cases.push({ family: 'iv triangles 3+3', label: `+-+ on a=1 (z=0), -+- on a=1/2 at z ${zs > 0 ? '+' : '-'}, polarity order ${order}`, build: senses => caseTriangles(1 / 2, zs, order, senses), ratios: [1, 1 / 2], sumXNonZero: true });

rec.cases = [];
for (const c of cases) {
  const cs = c.build([1, 1, 1, 1]); const g = gridSearch(c.label, cs, { family: c.family });
  const row = { family: c.family, label: c.label, ratios: c.ratios, note: c.sumXNonZero ? 'sum X is not zero for this case (triangles at different heights); prescribed-path residual still well defined' : (c.sumZ === 0 ? 'sum X = sum V = 0' : 'sum X = sum V = 0 (antipodal)'), grid: { evaluations: g.evaluations, senseClasses: g.senseClasses, best: g.best, bestPerV: g.bestPerV } };
  // refinements from the grid best: free ratios and pinned
  const csF = c.build([1, 1, 1, 1]); freeCircles(csF.circles).forEach((k, i) => { csF.circles[k].phase = g.best.phases[i]; }); applyTies(csF.circles);
  row.refineFree = refine(c.label, csF, g.best, 'free');
  const csP = c.build([1, 1, 1, 1]); freeCircles(csP.circles).forEach((k, i) => { csP.circles[k].phase = g.best.phases[i]; }); applyTies(csP.circles);
  row.refinePinned = refine(c.label, csP, g.best, 'pinned', c.ratios.filter((r, i) => true));
  rec.cases.push(row);
  log(`${c.family} | ${c.label}: grid best ${g.best.residual.toExponential(3)} (v ${g.best.v}, senses ${g.best.senses.join('')}, rad ${g.best.radial.toExponential(2)}, tan ${g.best.tangential.toExponential(2)}, bin ${g.best.binormal.toExponential(2)}, ${g.evaluations} evals); refined free ${row.refineFree.residual.toExponential(3)} (ratios ${row.refineFree.ratios.map(r => r.toFixed(3)).join(':')}, v ${row.refineFree.v.toFixed(3)}); pinned ${row.refinePinned.residual.toExponential(3)}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}

// ---------------------------------------------------------------- continuous ratio scans: does the landscape prefer rational ratios?
rec.ratioScans = [];
function ratioScan(name, buildAt, rGrid) {
  const rows = [];
  for (const r of rGrid) {
    const cs = buildAt(r); const g = gridSearch(name, cs);
    rows.push({ ratio: r, best: g.best.residual, v: g.best.v, senses: g.best.senses, commensurate: g.best.commensurate, radial: g.best.radial, tangential: g.best.tangential, binormal: g.best.binormal });
  }
  // interior local minima of best(r)
  const minima = []; for (let i = 1; i < rows.length - 1; i++) if (rows[i].best < rows[i - 1].best && rows[i].best < rows[i + 1].best) minima.push({ ratio: rows[i].ratio, best: rows[i].best });
  const row = { name, grid: rGrid, rows, interiorMinima: minima, floor: Math.min(...rows.map(x => x.best)), floorAt: rows.reduce((a, b) => a.best < b.best ? a : b).ratio };
  rec.ratioScans.push(row);
  log(`ratio scan ${name}: floor ${row.floor.toExponential(3)} at ratio ${row.floorAt}; interior minima ${JSON.stringify(minima.map(m => [m.ratio, m.best.toExponential(2)]))}; wall ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  writeJson(RECEIPT, { ...rec, status: 'running', updated: utc() });
}
const RG = []; for (let k = 0; k <= 36; k++) RG.push(+(0.2 + 0.75 * k / 36).toFixed(4));
RG.push(1 / 2, 1 / 3, 2 / 3, 1 / 4, 3 / 4); RG.sort((a, b) => a - b);
ratioScan('(i) pairs a = (1, r, r), + members same side', r => caseAntipodal([1, r, r], [0, 1, 1], [1, 1, 1]), RG);
ratioScan('(i) pairs a = (1, r, r), + members opposite sides', r => caseAntipodal([1, r, r], [0, 1, -1], [1, 1, 1]), RG);
ratioScan('(i) pairs a = (1, 1/2, r)', r => caseAntipodal([1, 1 / 2, r], [0, 1, 1], [1, 1, 1]), RG);
ratioScan('(iii) square + pair at a = r', r => caseSquarePlusPair(r, 1, [1, 1]), RG);
ratioScan('(iv) triangles, lower at a = r (order 0)', r => caseTriangles(r, 1, 0, [1, 1]), RG);
ratioScan('(ii) same-circle pairs a = (1, r, r) at z = 0, +-z', r => caseSameCircle([1, r, r], [0, zOf(r), -zOf(r)], [1, 1, 1]), RG);

rec.summary = { caseFloorGrid: Math.min(...rec.cases.map(c => c.grid.best.residual)), caseFloorRefinedFree: Math.min(...rec.cases.map(c => c.refineFree.residual)), caseFloorRefinedPinned: Math.min(...rec.cases.map(c => c.refinePinned.residual)), scanFloors: rec.ratioScans.map(s => ({ name: s.name, floor: s.floor, at: s.floorAt, interiorMinima: s.interiorMinima })) };
rec.finished = utc(); rec.wallSeconds = (Date.now() - t0) / 1000;
writeJson(RECEIPT, rec);
log(`F4 receipt written ${path.relative(REPO_ROOT, RECEIPT)}; floors grid ${rec.summary.caseFloorGrid.toExponential(3)}, free ${rec.summary.caseFloorRefinedFree.toExponential(3)}, pinned ${rec.summary.caseFloorRefinedPinned.toExponential(3)}`);
