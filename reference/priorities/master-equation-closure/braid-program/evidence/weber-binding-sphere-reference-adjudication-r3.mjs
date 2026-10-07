// weber-binding-sphere-reference-adjudication-r3.mjs
// Reference lane, Part 3c (after the PI's round-3 exposure, 2026-10-06T03:22Z).
// Evaluates the frozen reference solve on the subject's round-3 stored states and parameters
// and compares the hexagon multipliers with e^{lambda P} from the Section 14 closed forms.
import { readFileSync, writeFileSync } from 'node:fs';
import { solveAccelerations, dot, norm, scale, add, sub, unit, sig15 } from './weber-binding-sphere-reference-lib.mjs';

const log = (...a) => console.log(...a);
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);
const out = { startedAt: new Date().toISOString() };
const sph = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const tangent = (th, ph, ps, v) => { const eth = [Math.cos(th) * Math.cos(ph), Math.cos(th) * Math.sin(ph), -Math.sin(th)]; const eph = [-Math.sin(ph), Math.cos(ph), 0]; return scale(add(scale(eth, Math.cos(ps)), scale(eph, Math.sin(ps))), v); };
// the subject's prefilter score on a state: max|X.A+v^2|/v^2 + max|V.A| R/v^3 + |H+3v^2|/(3v^2) + |sum sigma d-dot|/(6v)
function scoreOf(X, V, q, v) {
  const sol = solveAccelerations({ X, V, q }); if (sol.singular) return null;
  let jr = 0, jt = 0; for (let i = 0; i < 6; i++) { jr = Math.max(jr, Math.abs(dot(X[i], sol.A[i]) + v * v) / (v * v)); jt = Math.max(jt, Math.abs(dot(V[i], sol.A[i])) / (v * v * v)); }
  let T = 0; for (const w of V) T += 0.5 * dot(w, w); let H = T, sdd = 0;
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) { const dv = sub(X[i], X[j]); const d = norm(dv); const dd = dot(unit(dv), sub(V[i], V[j])); H += q[i] * q[j] / d * (1 - dd * dd / 2); sdd += q[i] * q[j] * dd; }
  return { score: jr + jt + Math.abs(H + 3 * v * v) / (3 * v * v) + Math.abs(sdd) / (6 * v), radial151: jr, tangential152: jt, H3v2: Math.abs(H + 3 * v * v) / (3 * v * v), sigmaDdot: Math.abs(sdd) / (6 * v), det: sol.det };
}
const qAlt = [1, -1, 1, -1, 1, -1];

// ---------- (2) prefiltered strata: the stored parameter vectors are the end-of-shooting states ----------
{
  log('=== (2) prefiltered strata: reference score on the stored (end-of-shooting) parameter vectors ===');
  const res = { free: [], c2: [] };
  const fr = JSON.parse(readFileSync('weber-binding-sphere-r3-shooting-free.json', 'utf8'));
  for (const s of fr.starts) {
    const p = s.p; const v = p[15]; const X = [], V = [];
    for (let i = 0; i < 5; i++) { const [th, ph, ps] = p.slice(3 * i, 3 * i + 3); X.push(sph(th, ph)); V.push(tangent(th, ph, ps, v)); }
    X.push(scale(X.reduce((a, b) => add(a, b), [0, 0, 0]), -1)); V.push(scale(V.reduce((a, b) => add(a, b), [0, 0, 0]), -1));
    const sc = scoreOf(X, V, qAlt, v);
    const seps = []; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) seps.push(norm(sub(X[i], X[j])));
    res.free.push({ index: s.index, kind: s.kind, subjectPrefilterScore: s.prefilterScore, subjectJ_gbs: s.J_gbs, subjectReason: s.reason, referenceScoreOnStoredState: sc ? sc.score : null, radial: sc ? sc.radial151 : null, tangential: sc ? sc.tangential152 : null, member5Radius: norm(X[5]), member5SpeedOverV: norm(V[5]) / v, minSep: Math.min(...seps), newton: s.newton ? { residual: s.newton.residual, period: s.newton.period, rMean: s.newton.characterisation?.rMean, zMax: s.newton.characterisation?.zMax, sphereDeviation: s.newton.characterisation?.sphereDeviation } : null });
    log(`free ${s.index} ${s.kind.padEnd(16)} prefilter(subject, initial state) ${s.prefilterScore.toExponential(2)} | reference score on stored end state ${sc ? sc.score.toExponential(2) : 'sing'} (radial ${sc ? sc.radial151.toExponential(1) : '-'}, tangential ${sc ? sc.tangential152.toExponential(1) : '-'}) | J_gbs ${s.J_gbs.toExponential(2)} ${s.reason} | member5 radius ${norm(X[5]).toFixed(3)} | newton ${s.newton ? s.newton.residual.toExponential(1) + ' r=' + s.newton.characterisation.rMean.toFixed(4) + ' zMax=' + s.newton.characterisation.zMax.toExponential(1) : '-'}`);
  }
  const c2 = JSON.parse(readFileSync('weber-binding-sphere-r3-shooting-c2.json', 'utf8'));
  // C2 reconstruction (from the subject's description): members 0-2 free with theta_2 fixed by sum z = 0 and psi_2 by sum V_z = 0 (branch = sign);
  // members 3-5 are the rotation by pi about z of members 0-2 with flipped polarity. Validated below by the hexagon start reproducing a hexagon.
  for (const s of c2.starts) {
    const p = s.p; const v = p[7]; const th = [p[0], p[3]], ph = [p[1], p[4], p[6]], ps = [p[2], p[5]];
    const z2 = -(Math.cos(th[0]) + Math.cos(th[1])); const th2 = Math.acos(Math.max(-1, Math.min(1, z2))); th.push(th2);
    const c = -(Math.cos(ps[0]) * Math.sin(th[0]) + Math.cos(ps[1]) * Math.sin(th[1])) / Math.sin(th2); const ps2 = (s.branch === 0 ? 1 : -1) * Math.acos(Math.max(-1, Math.min(1, c))); ps.push(ps2);
    const X = [], V = []; for (let k = 0; k < 3; k++) { X.push(sph(th[k], ph[k])); V.push(tangent(th[k], ph[k], ps[k], v)); } for (let k = 0; k < 3; k++) { X.push([-X[k][0], -X[k][1], X[k][2]]); V.push([-V[k][0], -V[k][1], V[k][2]]); }
    const sc = scoreOf(X, V, [1, 1, 1, -1, -1, -1], v);
    const seps = []; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) seps.push(norm(sub(X[i], X[j])));
    res.c2.push({ index: s.index, kind: s.kind, subjectPrefilterScore: s.prefilterScore, subjectJ_gbs: s.J_gbs, subjectReason: s.reason, referenceScoreOnStoredState: sc ? sc.score : null, radial: sc ? sc.radial151 : null, tangential: sc ? sc.tangential152 : null, sumConstraintCheck: { sumX: norm(X.reduce((a, b) => add(a, b), [0, 0, 0])), sumV: norm(V.reduce((a, b) => add(a, b), [0, 0, 0])) }, minSep: Math.min(...seps), separationsSorted: seps.sort((a, b) => a - b).map((x) => +x.toFixed(4)), newton: s.newton ? { residual: s.newton.residual, period: s.newton.period, rMean: s.newton.characterisation?.rMean, zMax: s.newton.characterisation?.zMax, sphereDeviation: s.newton.characterisation?.sphereDeviation } : null });
    log(`c2 ${s.index} ${s.kind.padEnd(16)} prefilter(subject, initial) ${s.prefilterScore.toExponential(2)} | reference score on stored end state ${sc ? sc.score.toExponential(2) : 'sing'} | J_gbs ${s.J_gbs.toExponential(2)} ${s.reason} | separations ${seps.slice(0, 6).map((x) => x.toFixed(3)).join(',')}.. | newton ${s.newton ? s.newton.residual.toExponential(1) + ' r=' + s.newton.characterisation.rMean.toFixed(4) + ' zMax=' + s.newton.characterisation.zMax.toExponential(1) : '-'}`);
  }
  out.prefiltered = res;
}

// ---------- (3) stored Newton states and the hexagon multipliers ----------
{
  log('=== (3) stored round-3 Newton states: reference jet, radii, speeds, det; multipliers against the closed forms ===');
  const jetOnState = (y, q) => { const X = [], V = []; for (let i = 0; i < 6; i++) { X.push([y[3 * i], y[3 * i + 1], y[3 * i + 2]]); V.push([y[18 + 3 * i], y[18 + 3 * i + 1], y[18 + 3 * i + 2]]); } const sol = solveAccelerations({ X, V, q }); const radii = X.map(norm), sp = V.map(norm); const v = sp.reduce((a, b) => a + b, 0) / 6; let jr = 0, jt = 0; for (let i = 0; i < 6; i++) { jr = Math.max(jr, Math.abs(dot(X[i], sol.A[i]) + dot(V[i], V[i])) / (v * v)); jt = Math.max(jt, Math.abs(dot(V[i], sol.A[i])) / (v * v * v)); } return { rMin: Math.min(...radii), rMax: Math.max(...radii), vMin: Math.min(...sp), vMax: Math.max(...sp), radial151: jr, tangential152: jt, det: sol.det, zMax: Math.max(...X.map((x) => Math.abs(x[2]))) }; };
  const states = [];
  for (const f of ['weber-binding-sphere-r3-newton-a2.json', 'weber-binding-sphere-r3-newton-b.json']) {
    const o = JSON.parse(readFileSync(f, 'utf8'));
    for (const it of o.item3) { if (!Array.isArray(it.y)) continue; const j = jetOnState(it.y, qAlt); states.push({ file: f, seed: it.seed, P: it.P, subjectResidual: it.residual, subjectCharacterisation: it.characterisation, reference: j, subjectMultipliers: it.monodromy ? it.monodromy.multipliers.map((m) => m.abs).filter((a) => a > 1.001).sort((a, b) => b - a) : null, subjectUnitCount: it.monodromy ? it.monodromy.unitCount : null }); log(`${it.seed.slice(0, 44).padEnd(44)} P=${it.P.toFixed(5)} subject res ${it.residual === null ? '-' : it.residual.toExponential(2)} | reference: radii ${j.rMin.toFixed(5)}-${j.rMax.toFixed(5)}, speeds ${j.vMin.toFixed(5)}-${j.vMax.toFixed(5)}, jet radial ${j.radial151.toExponential(2)} tangential ${j.tangential152.toExponential(2)}, det ${j.det.toFixed(4)}, zMax ${j.zMax.toFixed(4)}${it.monodromy ? ' | subject multipliers ' + it.monodromy.multipliers.map((m) => m.abs).filter((a) => a > 1.001).sort((a, b) => b - a).map((a) => a.toExponential(4)).join(', ') + ' unit ' + it.monodromy.unitCount : ''}`); }
  }
  // closed-form rates at x = 1.0064 (Section 14): k = 3 real pair from (14.2); the complex quartets from the sector polynomials evaluated by the sympy receipt route
  const s3 = Math.sqrt(3); const x = 1.0064; const P = 7.660998582687159 * Math.pow(x, 1.5);
  const c2 = (x + 3) * (x - s3) / (x * x), c1 = ((123 * s3 + 63) - (6 + 4 * s3) * x) / (12 * Math.pow(x, 4)), c0 = -29 * (7 + 4 * s3) / (16 * Math.pow(x, 6));
  const disc = Math.sqrt(c1 * c1 - 4 * c2 * c0); const sr = [(-c1 + disc) / (2 * c2), (-c1 - disc) / (2 * c2)].filter((s) => s > 0).map(Math.sqrt).sort((a, b) => b - a);
  const k3mult = sr.map((lam) => Math.exp(lam * P));
  // the two quartets' real parts at x = 1.0064 from the sympy evaluation recorded in the run record (03:19Z): 1.061348 and 0.941038
  const quartets = [1.061348, 0.941038].map((re) => Math.exp(re * P));
  out.multipliers = { x, P, k3rates: sr, k3multipliers: k3mult, quartetRealParts: [1.061348, 0.941038], quartetModuli: quartets, unitCircleCount: 24, subject: { largest: 181028726.19588965, second: 9451.929677365353, quartets: [3674.472780692407, 1448.9], unit: 24 } };
  log(`closed forms at x=${x}: P=${P.toFixed(5)}; k=3 rates ${sr.map((r) => r.toFixed(6)).join(', ')} -> multipliers ${k3mult.map((m) => m.toExponential(5)).join(', ')} (subject 1.81029e8, 9.45193e3); quartet moduli ${quartets.map((m) => m.toExponential(4)).join(', ')} (subject 3.6745e3, 1.449e3); 24 on the unit circle (subject 24)`);
  // hexagon identification of the F2-seeded end state: period and determinant closed forms at x = 1.876
  const xf = 1.876; const Pf = 7.660998582687159 * Math.pow(xf, 1.5); const detf = (1 + (2 - s3) / xf) * (1 - s3 / xf) * (1 + 3 / xf) * Math.pow(1 + (3 - s3) / (2 * xf), 2) * Math.pow(1 + (7 - s3) / (2 * xf) + (9 - 5 * s3) / (4 * xf * xf), 2);
  out.f2EndState = { x: xf, hexagonPeriod: Pf, hexagonDet: detf, subject: { P: 19.68331138253303, rMean: 1.8758927438592847, det: 2.40 } };
  log(`F2-seeded end state: hexagon of radius 1.876 has P = ${Pf.toFixed(4)} (subject fixed P 19.6833, mean radius 1.8759) and det M = ${detf.toFixed(4)} (subject 2.40)`);
  out.newtonStates = states;
}
out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-adjudication-r3.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-adjudication-r3.json');
