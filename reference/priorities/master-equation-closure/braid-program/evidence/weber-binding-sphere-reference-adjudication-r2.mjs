// weber-binding-sphere-reference-adjudication-r2.mjs
// Reference lane, Part 3b (after the PI's round-2 exposure, 2026-10-06T02:25Z).
// Drives the frozen reference solve at the subject's round-2 parameters. The F4 and
// collocation evaluators below are copies of the lane's frozen Part 2b/2c code (those
// scripts are not modules); the reference solve, LM and PRNG are imported unchanged.
import { readFileSync, writeFileSync } from 'node:fs';
import { solveAccelerations, dot, cross, norm, scale, add, sub, unit, makeRng, levenbergMarquardt, sig15 } from './weber-binding-sphere-reference-lib.mjs';

const log = (...a) => console.log(...a);
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);
const out = { startedAt: new Date().toISOString() };
const R = 1;

// ---------------- F4 evaluator (copy of weber-binding-sphere-reference-F4.mjs) ----------------
function pathOf(members, v) {
  return (T) => { const X = [], V = [], Areq = []; for (const m of members) { const w = v / m.a; const ph = m.s * w * T + m.phi; const c = Math.cos(ph), sn = Math.sin(ph); X.push([m.a * c, m.a * sn, m.z]); V.push([-m.a * sn * m.s * w, m.a * c * m.s * w, 0]); Areq.push([-w * w * m.a * c, -w * w * m.a * sn, 0]); } return { X, V, Areq }; };
}
function f4Residual(members, v, T_total, nSamples) {
  const path = pathOf(members, v); const q = members.map((m) => m.q); const scaleA = v * v / R;
  let worst = 0, wRad = 0, wTan = 0, wBin = 0, minDet = Infinity, minSep = Infinity;
  for (let k = 0; k < nSamples; k++) {
    const T = (k * T_total) / nSamples; const { X, V, Areq } = path(T); const sol = solveAccelerations({ X, V, q });
    if (sol.singular) return { singular: true };
    minDet = Math.min(minDet, Math.abs(sol.det)); minSep = Math.min(minSep, sol.minSep);
    for (let i = 0; i < X.length; i++) { const r = sub(sol.A[i], Areq[i]); worst = Math.max(worst, norm(r) / scaleA); const xh = unit(X[i]), vh = unit(V[i]), bh = cross(xh, vh); wRad = Math.max(wRad, Math.abs(dot(r, xh)) / scaleA); wTan = Math.max(wTan, Math.abs(dot(r, vh)) / scaleA); wBin = Math.max(wBin, Math.abs(dot(r, bh)) / scaleA); }
  }
  return { singular: false, R: worst, radial: wRad, tangential: wTan, binormal: wBin, minAbsDet: minDet, minSep, samples: nSamples, T_total };
}
const z = (a) => Math.sqrt(1 - a * a);
{
  log('=== (4) F4 like-with-like at the subject round-2 best parameters (v = 1, senses all +) ===');
  const F4 = [];
  const rec = (name, members, v, T, n, subjectR) => { const r = f4Residual(members, v, T, n); F4.push({ case: name, subjectR, ...r }); log(`${name}: reference R=${r.R.toFixed(6)} (radial ${r.radial.toFixed(4)}, tangential ${r.tangential.toFixed(4)}, binormal ${r.binormal.toFixed(4)}, minSep ${r.minSep.toFixed(4)})${subjectR !== undefined ? ` | subject ${subjectR}` : ''}`); return r; };
  const v = 1;
  // (iii) subject geometry: square on z = 0 (+ at 0, - at pi/2, + at pi, - at 3pi/2); pair antipodal through the origin,
  // + at (a = 1/2, z = +sqrt3/2, phi), - at (1/2, -sqrt3/2, phi + pi); subject best at phi = pi/3 with R = 3.9125090848509188
  for (const phi of [0, Math.PI / 6, Math.PI / 3]) {
    const m = [];
    for (let k = 0; k < 4; k++) m.push({ a: 1, z: 0, s: 1, phi: k * Math.PI / 2, q: k % 2 === 0 ? 1 : -1 });
    m.push({ a: 0.5, z: Math.sqrt(3) / 2, s: 1, phi, q: 1 }); m.push({ a: 0.5, z: -Math.sqrt(3) / 2, s: 1, phi: phi + Math.PI, q: -1 });
    rec(`(iii) square + pair antipodal through the origin (subject geometry), phi=${(phi * 180 / Math.PI).toFixed(0)} deg`, m, v, 2 * Math.PI / v, 96, phi === Math.PI / 3 ? 3.9125090848509188 : undefined);
  }
  // (iii) reference geometry (pair on one circle z = +sqrt3/2) at phi = 0, pi/6, pi/3 for comparison
  for (const phi of [0, Math.PI / 6, Math.PI / 3]) {
    const m = [];
    for (let k = 0; k < 4; k++) m.push({ a: 1, z: 0, s: 1, phi: k * Math.PI / 2, q: k % 2 === 0 ? 1 : -1 });
    m.push({ a: 0.5, z: Math.sqrt(3) / 2, s: 1, phi, q: 1 }); m.push({ a: 0.5, z: Math.sqrt(3) / 2, s: 1, phi: phi + Math.PI, q: -1 });
    rec(`(iii) square + pair on one circle (reference Section 13 geometry), phi=${(phi * 180 / Math.PI).toFixed(0)} deg`, m, v, 2 * Math.PI / v, 96);
  }
  // (i) subject geometry: antipodal pairs through the origin on (z, -z) circle pairs; "same side" = + members on z >= 0
  const pairsThroughOrigin = (as, zs, phases) => { const m = []; as.forEach((a, k) => { const zz = zs[k] * z(a); m.push({ a, z: zz, s: 1, phi: phases[k], q: 1 }); m.push({ a, z: -zz, s: 1, phi: phases[k] + Math.PI, q: -1 }); }); return m; };
  rec('(i) 1:2:3, + members same side, subject best phases (0, 3pi/2, pi)', pairsThroughOrigin([1, 0.5, 1 / 3], [1, 1, 1], [0, 3 * Math.PI / 2, Math.PI]), v, 2 * Math.PI / v, 96, 7.7218403200246595);
  rec('(i) 1:2:3, + member of pair 3 opposite side, subject best phases (0, 0, 0)', pairsThroughOrigin([1, 0.5, 1 / 3], [1, 1, -1], [0, 0, 0]), v, 2 * Math.PI / v, 96, 66.69575594286229);
  rec('(i) 1:2:2, + members same side, subject best phases (0, pi/6, pi)', pairsThroughOrigin([1, 0.5, 0.5], [1, 1, 1], [0, Math.PI / 6, Math.PI]), v, 2 * Math.PI / v, 96, 7.06184313364835);
  // (ii) same-circle pairs 1:2:2 at z = 0, +sqrt3/2, -sqrt3/2 (reference Section 13 geometry); subject best phases (0, pi/3, 4pi/3)
  const sameCircle = (as, zsign, phases) => { const m = []; as.forEach((a, k) => { const zz = zsign[k] * z(a); m.push({ a, z: zz, s: 1, phi: phases[k], q: 1 }); m.push({ a, z: zz, s: 1, phi: phases[k] + Math.PI, q: -1 }); }); return m; };
  rec('(ii) same-circle 1:2:2 at z = (0, +sqrt3/2, -sqrt3/2), subject best phases (0, pi/3, 4pi/3)', sameCircle([1, 0.5, 0.5], [0, 1, -1], [0, Math.PI / 3, 4 * Math.PI / 3]), v, 2 * Math.PI / v, 96, 9.894334319425905);
  // sampling consistency near the rational ratio r = 1/2 for the (ii) case: common period at r = 1/2 (96 samples) against eight laps (768 samples) at r = 0.495, 0.5, 0.505
  const samp = [];
  for (const r of [0.495, 0.5, 0.505]) {
    const m = sameCircle([1, r, r], [0, 1, -1], [0, Math.PI / 3, 4 * Math.PI / 3]);
    const eight = f4Residual(m, v, 8 * 2 * Math.PI / v, 768);
    const row = { r, eightLaps768: eight.R };
    if (r === 0.5) row.commonPeriod96 = f4Residual(m, v, 2 * Math.PI / v, 96).R;
    samp.push(row); log(`sampling check (ii) r=${r}: eight laps/768 samples R=${eight.R.toFixed(4)}${row.commonPeriod96 !== undefined ? `, common period/96 samples R=${row.commonPeriod96.toFixed(4)}` : ''}`);
  }
  out.F4 = { likeWithLike: F4, samplingCheck: samp };
}

// ---------------- (1) k = 3 sector coefficients against the subject receipt ----------------
{
  log('=== (1) k = 3 sector: coefficient-by-coefficient against weber-binding-sphere-r2-k3-sector.json ===');
  const k3 = JSON.parse(readFileSync('weber-binding-sphere-r2-k3-sector.json', 'utf8')).k3;
  const s3 = Math.sqrt(3);
  const mine = (x) => ({ A: (x + 3) * (x - s3) / (x * x), B: ((123 * s3 + 63) - (6 + 4 * s3) * x) / (12 * x), C: -29 * (7 + 4 * s3) / 16, Om2x3: 5 / 4 - 1 / s3 });
  const docB = (x) => -1 / s3 + (29 * s3 / 4 + 21 / 4 + 3 * s3) / x; // as printed in the subject document R2.3
  const rows = []; let worst = 0, worstDocB = 0, worstGrowth = 0;
  for (const rc of k3.rootCheck) {
    const x = rc.x; const m = mine(x); const cf = rc.closedForm;
    const dA = Math.abs(cf.A - m.A) / Math.abs(m.A), dB = Math.abs(cf.B - m.B) / Math.abs(m.B), dC = Math.abs(cf.C - m.C) / Math.abs(m.C);
    const sr = [(-m.B + Math.sqrt(m.B * m.B - 4 * m.A * m.C)) / (2 * m.A), (-m.B - Math.sqrt(m.B * m.B - 4 * m.A * m.C)) / (2 * m.A)];
    const growth = Math.sqrt(Math.max(...sr.filter((s) => s > 0))) / Math.pow(x, 1.5); // s in units K/rho^3 -> z = sqrt(s / x^3)
    const dG = Math.abs(growth - cf.growthRate) / cf.growthRate;
    worst = Math.max(worst, dA, dB, dC); worstGrowth = Math.max(worstGrowth, dG); worstDocB = Math.max(worstDocB, Math.abs(docB(x) - m.B) / Math.abs(m.B));
    rows.push({ x, subjectA: cf.A, subjectB: cf.B, subjectC: cf.C, referenceA: m.A, referenceB: m.B, referenceC: m.C, relDiffA: dA, relDiffB: dB, relDiffC: dC, subjectGrowth: cf.growthRate, referenceGrowth: growth, relDiffGrowth: dG, documentFormulaB: docB(x) });
  }
  const entries = { m_a: [k3.closedForm.m_a.value, -s3], m_b: [k3.closedForm.m_b.value, 3], k_a: [k3.closedForm.k_a.value, 7 / 4 + s3], k_b: [k3.closedForm.k_b.value, -29 / 4], k_c: [k3.closedForm.k_c.value, 17 / 4], Omega2: [k3.closedForm.Omega2.value, 5 / 4 - 1 / s3] };
  log('block entries (subject, reference):', JSON.stringify(entries));
  log(`receipt polynomial coefficients A, B, C at ${rows.length} radii: worst relative difference ${worst.toExponential(2)}; growth rates: worst ${worstGrowth.toExponential(2)}; the document's printed B formula (-1/sqrt3 + .../x) differs from the receipt's B by up to ${worstDocB.toExponential(2)} relative (it omits the constant -1/2; the receipt is right)`);
  out.k3 = { entries, rows, worstCoefficientRelDiff: worst, worstGrowthRelDiff: worstGrowth, documentBFormulaRelDiff: worstDocB };
}

// ---------------- (5) choreography like-with-like in the subject's box ----------------
{
  log('=== (5) choreography, ordering +++---: reference collocation in the subject box (scale gauge a_x1 = 1, omega in [0.3, 3] Omega_hex) ===');
  const M = 4, Nc = 18;
  // parameters: [w, b_y1, then for m = 2..M: ax, ay, az, bx, by, bz]; a_x1 = 1 fixed (scale gauge); b_x1 = a_y1 = a_z1 = b_z1 = 0
  const unpack = (p) => { const a = [[1, 0, 0]], b = [[0, p[1], 0]]; let i = 2; for (let m = 2; m <= M; m++) { a.push([p[i], p[i + 1], p[i + 2]]); b.push([p[i + 3], p[i + 4], p[i + 5]]); i += 6; } return { w: p[0], a, b }; };
  const curve = (c, T) => { const X = [0, 0, 0], A = [0, 0, 0], V = [0, 0, 0]; for (let m = 1; m <= M; m++) { const th = m * c.w * T, cs = Math.cos(th), sn = Math.sin(th); for (let k = 0; k < 3; k++) { X[k] += c.a[m - 1][k] * cs + c.b[m - 1][k] * sn; V[k] += m * c.w * (-c.a[m - 1][k] * sn + c.b[m - 1][k] * cs); A[k] += -((m * c.w) ** 2) * (c.a[m - 1][k] * cs + c.b[m - 1][k] * sn); } } return { X, V, A }; };
  const rhoEff = (c) => { let s = 0; for (let m = 0; m < M; m++) s += (dot(c.a[m], c.a[m]) + dot(c.b[m], c.b[m])) / 2; return Math.sqrt(s); };
  const q = [1, 1, 1, -1, -1, -1];
  const resid = (p, nc = Nc, offsetHalf = true) => { const c = unpack(p); const P = 2 * Math.PI / c.w; const res = []; const sc = c.w * c.w * rhoEff(c); for (let n = 0; n < nc; n++) { const T = (n + (offsetHalf ? 0.5 : 0)) * P / nc; const X = [], V = [], A = []; for (let k = 0; k < 6; k++) { const s = curve(c, T + k * P / 6); X.push(s.X); V.push(s.V); A.push(s.A); } const sol = solveAccelerations({ X, V, q }); if (sol.singular) return new Array(9 * nc).fill(1e6); for (const k of [0, 1, 2]) for (let i = 0; i < 3; i++) res.push((A[k][i] - sol.A[k][i]) / sc); } return res; };
  const rms = (r) => Math.sqrt(r.reduce((s, v) => s + v * v, 0) / r.length);
  const mx = (r) => Math.max(...r.map(Math.abs));
  const OmHex = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));
  const circleP = (w) => [w, 1, ...new Array(6 * (M - 1)).fill(0)];
  const chor = { circle: [], fits: [] };
  for (const w of [OmHex, 3 * OmHex]) { const r = resid(circleP(w)); const r0 = resid(circleP(w), Nc, false); chor.circle.push({ omega: w, omegaOverHex: w / OmHex, rms: rms(r), max: mx(r), maxNodesAtZero: mx(r0) }); log(`circle rho=1 at omega=${(w / OmHex).toFixed(1)} Omega_hex: rms ${rms(r).toFixed(4)}, max ${mx(r).toFixed(4)} (nodes at n P/Nc: max ${mx(r0).toFixed(4)}) | subject circleResidual 6.3445 at Omega_hex, 2.2761 at the clamp`); }
  const runFit = (name, p0, wLo, wHi) => {
    const lower = [wLo, ...new Array(p0.length - 1).fill(-Infinity)], upper = [wHi, ...new Array(p0.length - 1).fill(Infinity)];
    const fit = levenbergMarquardt(resid, p0, { maxIter: 200, lower, upper });
    const c = unpack(fit.p); let zmax = 0, rmin = Infinity, rmax = 0; for (let n = 0; n < 256; n++) { const s = curve(c, n * 2 * Math.PI / (c.w * 256)); zmax = Math.max(zmax, Math.abs(s.X[2])); const r = norm(s.X); rmin = Math.min(rmin, r); rmax = Math.max(rmax, r); }
    const row = { seed: name, omegaBox: [wLo / OmHex, wHi / OmHex], rms: fit.rms, max: mx(fit.residual), omegaOverHex: fit.p[0] / OmHex, iterations: fit.iterations, zMax: zmax, radiusRange: [rmin, rmax] };
    chor.fits.push(row); log(`${name} [omega box ${(wLo / OmHex).toFixed(1)}-${(wHi / OmHex).toFixed(1)} Omega_hex]: rms ${fit.rms.toFixed(4)}, max ${row.max.toFixed(4)}, omega/Omega_hex ${row.omegaOverHex.toFixed(3)}, zMax ${zmax.toFixed(3)}, radius ${rmin.toFixed(3)}-${rmax.toFixed(3)}, ${fit.iterations} it.`);
  };
  const zSeed = (amp) => { const p = circleP(OmHex); p[2 + 2] = amp; return p; }; // a_z2 = amp (out-of-plane second harmonic)
  runFit('circle seed', circleP(OmHex), 0.3 * OmHex, 3 * OmHex);
  runFit('circle + out-of-plane a_z2 = 0.05', zSeed(0.05), 0.3 * OmHex, 3 * OmHex);
  runFit('circle + out-of-plane a_z2 = 0.2', zSeed(0.2), 0.3 * OmHex, 3 * OmHex);
  const rng = makeRng(20261005);
  for (let s = 1; s <= 3; s++) { const p = circleP(0.5 * OmHex + 2 * OmHex * rng.next()); p[1] = 0.8 + 0.4 * rng.next(); for (let i = 2; i < p.length; i++) p[i] = 0.3 * rng.gauss() / ((Math.floor((i - 2) / 6) + 2) ** 2); runFit(`random seed ${s}`, p, 0.3 * OmHex, 3 * OmHex); }
  // the same seeds with the rate box opened to [0.3, 6.1] Omega_hex (the reference Part 2c bound omega <= 5)
  runFit('circle + out-of-plane a_z2 = 0.2, box to 5.0', zSeed(0.2), 0.3 * OmHex, 5.0);
  out.choreography = { subject: { floor: 1.296801292876002, circleAtHex: 6.3444874528355335, circleAtClamp: 2.2761456461669427 }, reference: chor };
}

// ---------------- (6) F3: reference jet residual and per-member conditions on the subject's recorded states ----------------
{
  log('=== (6) F3: reference jet residual on recorded round-2 states ===');
  const jetOf = (X, V, q) => { const sol = solveAccelerations({ X, V, q }); if (sol.singular) return { singular: true }; const per = []; let jr = 0, jt = 0; for (let i = 0; i < 6; i++) { const v2 = dot(V[i], V[i]); const rad = Math.abs(dot(X[i], sol.A[i]) + v2) / v2; const tan = Math.abs(dot(V[i], sol.A[i])) / Math.pow(v2, 1.5); per.push({ radial15_1: rad, tangential15_2: tan, radius: norm(X[i]), speed: Math.sqrt(v2) }); jr = Math.max(jr, rad); jt = Math.max(jt, tan); } return { radialMax: jr, tangentialMax: jt, sum: jr + jt, perMember: per, det: sol.det, minSep: sol.minSep }; };
  const F3 = {};
  for (const [name, file] of [['KN2 RK4-flow stall state', 'weber-binding-sphere-r2-f3-reach-kn2-rk4.json'], ['KN2 re-anchored final state', 'weber-binding-sphere-r2-f3-reach-kn2-reanchored.json']]) {
    const o = JSON.parse(readFileSync(file, 'utf8')); const kn2 = o.knownCases.find((k) => k.id.includes('KN2'));
    const y = kn2.finalState; if (!y || y.length !== 36) { log(`${name}: no 36-state found`); continue; }
    const X = [], V = []; for (let i = 0; i < 6; i++) { X.push([y[3 * i], y[3 * i + 1], y[3 * i + 2]]); V.push([y[18 + 3 * i], y[18 + 3 * i + 1], y[18 + 3 * i + 2]]); }
    const q = [1, -1, 1, -1, 1, -1];
    const j = jetOf(X, V, q);
    const radii = X.map(norm), speeds = V.map(norm), zs = X.map((x) => Math.abs(x[2]));
    F3[name] = { subject: { finalResidual: kn2.finalResidual, period: kn2.period, characterisation: kn2.characterisation }, radii, speeds, maxZ: Math.max(...zs), reference: j };
    log(`${name} (subject Newton residual ${kn2.finalResidual.toExponential(2)}): radii ${Math.min(...radii).toFixed(5)}-${Math.max(...radii).toFixed(5)}, speeds ${Math.min(...speeds).toFixed(5)}-${Math.max(...speeds).toFixed(5)}, max|z| ${Math.max(...zs).toExponential(2)}; reference jet: radial (15.1) max ${j.radialMax.toExponential(2)}, tangential (15.2) max ${j.tangentialMax.toExponential(2)}, det ${j.det.toFixed(4)}`);
  }
  // unconstrained stratum: the ten round-2 starts (parametrization as in round 1: five (theta, phi, psi) triples and v; member 5 closes the sums)
  const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
  const tangent = (th, ph, ps, v) => { const eth = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)]; const eph = [-Math.sin(ph), Math.cos(ph), 0]; return scale(add(scale(eth, Math.cos(ps)), scale(eph, Math.sin(ps))), v); };
  const sh = JSON.parse(readFileSync('weber-binding-sphere-r2-f3-shooting.json', 'utf8'));
  const freeRows = [];
  for (const r of sh.shooting.free.rows) {
    const v = r.p[15]; const X = [], V = []; for (let i = 0; i < 5; i++) { const [th, ph, ps] = r.p.slice(3 * i, 3 * i + 3); X.push(sph(th, ph)); V.push(tangent(th, ph, ps, v)); }
    X.push(scale(X.reduce((a, b) => add(a, b), [0, 0, 0]), -1)); V.push(scale(V.reduce((a, b) => add(a, b), [0, 0, 0]), -1));
    const j = jetOf(X, V, [1, 1, 1, -1, -1, -1]);
    freeRows.push({ start: r.start, subjectJ_gbs: r.J_gbs, subjectMinSep: r.minSep, v, member5Radius: norm(X[5]), member5Speed: norm(V[5]), reference: j.singular ? 'singular' : { radialMax: j.radialMax, tangentialMax: j.tangentialMax, sum: j.sum, minSep: j.minSep } });
    log(`free start ${r.start}: subject J_gbs ${r.J_gbs.toFixed(3)} (window minSep ${r.minSep.toExponential(2)}); reference jet at T=0: radial ${j.singular ? '-' : j.radialMax.toExponential(2)}, tangential ${j.singular ? '-' : j.tangentialMax.toExponential(2)}; member 5 radius ${norm(X[5]).toFixed(3)}, speed ${norm(V[5]).toFixed(3)} (v=${v.toFixed(3)})`);
  }
  F3.unconstrainedStarts = freeRows;
  out.F3 = F3;
}

out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-adjudication-r2.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-adjudication-r2.json');
