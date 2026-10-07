// weber-binding-sphere-reference-F4.mjs
// Reference lane, Part 2b (blind): family F4, stacked latitude circles with
// integer rate ratios. Members move at common speed v on circles z = z_k of
// radius a_k = sqrt(R^2 - z_k^2) about the z axis, angular rate w_k = v / a_k.
// Prescribed path X = (a cos(s w T + phi), a sin(s w T + phi), z); required
// acceleration A_req = -w^2 (x, y, 0), which satisfies X.A = -v^2 and V.A = 0.
// Residual R = max_T max_i ||A_law - A_req|| / (v^2 / R) over the common period
// (>= 96 samples), with components along X-hat (radial), V-hat (tangential) and
// X-hat x V-hat (remaining). Known cases first (K1 on z = 0; rigid hexagon on z = 0).
import { writeFileSync } from 'node:fs';
import { solveAccelerations, dot, cross, norm, scale, add, sub, unit, sig15 } from './weber-binding-sphere-reference-lib.mjs';

const R = 1;
const log = (...a) => console.log(...a);
const jsonNum = (k, v) => (typeof v === 'number' ? sig15(v) : v);

// member spec: { a, z, s, phi, q }
function pathOf(members, v) {
  return (T) => {
    const X = [], V = [], Areq = [];
    for (const m of members) {
      const w = v / m.a;
      const ph = m.s * w * T + m.phi;
      const c = Math.cos(ph), sn = Math.sin(ph);
      X.push([m.a * c, m.a * sn, m.z]);
      V.push([-m.a * sn * m.s * w, m.a * c * m.s * w, 0]);
      Areq.push([-w * w * m.a * c, -w * w * m.a * sn, 0]);
    }
    return { X, V, Areq };
  };
}

function f4Residual(members, v, T_total, nSamples) {
  const path = pathOf(members, v);
  const q = members.map((m) => m.q);
  const scaleA = v * v / R;
  let worst = 0, wRad = 0, wTan = 0, wBin = 0, worstT = 0, worstI = -1, minDet = Infinity, maxDet = -Infinity, minSep = Infinity;
  let jetRad = 0, jetTan = 0; // checks that the required acceleration satisfies X.A = -v^2, V.A = 0
  for (let k = 0; k < nSamples; k++) {
    const T = (k * T_total) / nSamples;
    const { X, V, Areq } = path(T);
    const sol = solveAccelerations({ X, V, q });
    if (sol.singular) return { singular: true, T };
    minDet = Math.min(minDet, sol.det); maxDet = Math.max(maxDet, sol.det); minSep = Math.min(minSep, sol.minSep);
    for (let i = 0; i < X.length; i++) {
      jetRad = Math.max(jetRad, Math.abs(dot(X[i], Areq[i]) + v * v));
      jetTan = Math.max(jetTan, Math.abs(dot(V[i], Areq[i])));
      const r = sub(sol.A[i], Areq[i]);
      const nr = norm(r) / scaleA;
      if (nr > worst) { worst = nr; worstT = T; worstI = i; }
      const xh = unit(X[i]), vh = unit(V[i]), bh = cross(xh, vh);
      wRad = Math.max(wRad, Math.abs(dot(r, xh)) / scaleA);
      wTan = Math.max(wTan, Math.abs(dot(r, vh)) / scaleA);
      wBin = Math.max(wBin, Math.abs(dot(r, bh)) / scaleA);
    }
  }
  return { singular: false, R: worst, radial: wRad, tangential: wTan, remaining: wBin, worstT, worstI, minDet, maxDet, minSep, requiredAccelerationCheck: { maxXdotAplusV2: jetRad, maxVdotA: jetTan }, samples: nSamples, T_total };
}

const out = { startedAt: new Date().toISOString(), R, family: 'F4 stacked latitude circles, common speed v, rates v/a_k', normalization: 'max_T max_i ||A_law - A_req|| / (v^2/R)', knownCases: {}, results: [] };

// ---------------- known cases ----------------
{
  // K1 on z = 0: antipodal opposite-polarity pair on the great circle at a = R, v = Omega R with Omega^2 = K/(4R^3) -> v = 0.5
  const v = 0.5;
  const members = [{ a: 1, z: 0, s: 1, phi: 0, q: 1 }, { a: 1, z: 0, s: 1, phi: Math.PI, q: -1 }];
  const r = f4Residual(members, v, 2 * Math.PI / v, 96);
  const rb = f4Residual(members, 0.55, 2 * Math.PI / 0.55, 96);
  // F0 hexagon on z = 0 at rho = 1: v = Omega rho = sqrt(5/4 - 1/sqrt3)
  const vh = Math.sqrt(5 / 4 - 1 / Math.sqrt(3));
  const hex = Array.from({ length: 6 }, (_, k) => ({ a: 1, z: 0, s: 1, phi: k * Math.PI / 3, q: k % 2 === 0 ? 1 : -1 }));
  const rh = f4Residual(hex, vh, 2 * Math.PI / vh, 96);
  const pass = r.R <= 1e-13 && rh.R <= 1e-14 && rb.R >= 1e-2 && r.requiredAccelerationCheck.maxXdotAplusV2 <= 1e-14 && rh.requiredAccelerationCheck.maxVdotA <= 1e-14;
  out.knownCases = { K1onZ0: r, K1at11Omega: rb, hexagonOnZ0: rh, pass };
  log(`known cases: K1 on z=0 R=${r.R.toExponential(3)} (1.1 Omega: ${rb.R.toExponential(3)}); hexagon on z=0 R=${rh.R.toExponential(3)}; required-acceleration identities max|X.A+v^2|=${rh.requiredAccelerationCheck.maxXdotAplusV2.toExponential(2)} max|V.A|=${rh.requiredAccelerationCheck.maxVdotA.toExponential(2)} ${pass ? 'PASS' : 'FAIL'}`);
  if (!pass) { writeFileSync('weber-binding-sphere-reference-F4.json', JSON.stringify(out, jsonNum, 2)); process.exit(1); }
}

// ---------------- target grid ----------------
const vGrid = [0.3, 0.5, 0.7, 1.0];
const offsets = [0, Math.PI / 6, Math.PI / 3, Math.PI / 2];
const zOf = (a) => Math.sqrt(Math.max(0, R * R - a * a));
let best = null;
const record = (row) => { out.results.push(row); if (!row.singular && (!best || row.R < best.R)) best = row; };

// (i)+(ii): three antipodal opposite-polarity pairs, one per circle; senses all + and (+,-,+)
const radiusSets = [
  { name: 'a=(1,1/2,1/3) rates 1:2:3, z=(0,+sqrt3/2,-sqrt8/3)', a: [1, 0.5, 1 / 3], zsign: [0, 1, -1], laps: 1 },
  { name: 'a=(1,1/2,1/3) rates 1:2:3, z=(0,+sqrt3/2,+sqrt8/3)', a: [1, 0.5, 1 / 3], zsign: [0, 1, 1], laps: 1 },
  { name: 'a=(1,1/2,1/2) rates 1:2:2, z=(0,+sqrt3/2,-sqrt3/2)', a: [1, 0.5, 0.5], zsign: [0, 1, -1], laps: 1 },
  { name: 'a=(1/2,1/2,1) ordering (great circle in the middle), z=(+sqrt3/2,-sqrt3/2,0)', a: [0.5, 0.5, 1], zsign: [1, -1, 0], laps: 1 },
  { name: 'a=(1/sqrt2,1/sqrt2,1) rates sqrt2:sqrt2:1 (incommensurate), z=(+1/sqrt2,-1/sqrt2,0), 8 laps of the great circle', a: [Math.SQRT1_2, Math.SQRT1_2, 1], zsign: [1, -1, 0], laps: 8 },
];
log('=== (i)/(ii) three antipodal pairs on three circles ===');
for (const rs of radiusSets) {
  for (const senses of [[1, 1, 1], [1, -1, 1]]) {
    for (const v of vGrid) {
      for (const phU of offsets) for (const phL of offsets) {
        // offset phU applied to circles with z > 0, phL to circles with z < 0; the great circle keeps phase 0
        const members = [];
        rs.a.forEach((a, k) => {
          const z = rs.zsign[k] * zOf(a);
          const phi = rs.zsign[k] > 0 ? phU : rs.zsign[k] < 0 ? phL : 0;
          members.push({ a, z, s: senses[k], phi, q: 1 });
          members.push({ a, z, s: senses[k], phi: phi + Math.PI, q: -1 });
        });
        if (rs.zsign.filter((s) => s < 0).length === 0 && phL !== 0) continue; // no lower circle: skip duplicate
        const laps = rs.laps;
        const r = f4Residual(members, v, laps * 2 * Math.PI / v, 96 * laps);
        record({ group: 'i/ii three antipodal pairs', set: rs.name, senses, v, phaseUpper: phU, phaseLower: phL, ...r });
      }
    }
  }
  const rows = out.results.filter((x) => x.set === rs.name && !x.singular);
  const m = rows.reduce((a, b) => (b.R < a.R ? b : a));
  log(`${rs.name}: ${rows.length} rows, min R=${m.R.toFixed(5)} at senses=${m.senses.join('')} v=${m.v} phases=(${(m.phaseUpper * 180 / Math.PI).toFixed(0)},${(m.phaseLower * 180 / Math.PI).toFixed(0)}) radial=${m.radial.toFixed(4)} tangential=${m.tangential.toFixed(4)} remaining=${m.remaining.toFixed(4)}`);
}

// (iii) 4+2: alternating square on z = 0 (a = 1) and one antipodal pair on z = +-sqrt3/2 (a = 1/2)
log('=== (iii) 4+2 ===');
for (const zs of [1, -1]) {
  for (const senses of [[1, 1], [1, -1]]) for (const v of vGrid) for (const ph of offsets) {
    const members = [];
    for (let k = 0; k < 4; k++) members.push({ a: 1, z: 0, s: senses[0], phi: k * Math.PI / 2, q: k % 2 === 0 ? 1 : -1 });
    members.push({ a: 0.5, z: zs * Math.sqrt(3) / 2, s: senses[1], phi: ph, q: 1 });
    members.push({ a: 0.5, z: zs * Math.sqrt(3) / 2, s: senses[1], phi: ph + Math.PI, q: -1 });
    const r = f4Residual(members, v, 2 * Math.PI / v, 96);
    record({ group: 'iii 4+2', set: `square on z=0, pair on z=${zs > 0 ? '+' : '-'}sqrt3/2`, senses, v, phaseUpper: ph, ...r });
  }
}
{
  const rows = out.results.filter((x) => x.group === 'iii 4+2' && !x.singular);
  const m = rows.reduce((a, b) => (b.R < a.R ? b : a));
  log(`4+2: ${rows.length} rows, min R=${m.R.toFixed(5)} at ${m.set} senses=${m.senses.join('')} v=${m.v} phase=${(m.phaseUpper * 180 / Math.PI).toFixed(0)} radial=${m.radial.toFixed(4)} tangential=${m.tangential.toFixed(4)} remaining=${m.remaining.toFixed(4)}`);
}

// (iv) 3+3: a = 1 (z = 0) holding + - + at 120 deg, a = 1/2 (z = +-sqrt3/2) holding - + - at 120 deg; both z signs; polarities swapped
log('=== (iv) 3+3 ===');
for (const zs of [1, -1]) for (const swap of [false, true]) {
  for (const senses of [[1, 1], [1, -1]]) for (const v of vGrid) for (const ph of offsets) {
    const members = [];
    const qG = swap ? [-1, 1, -1] : [1, -1, 1];
    const qS = swap ? [1, -1, 1] : [-1, 1, -1];
    for (let k = 0; k < 3; k++) members.push({ a: 1, z: 0, s: senses[0], phi: 2 * Math.PI * k / 3, q: qG[k] });
    for (let k = 0; k < 3; k++) members.push({ a: 0.5, z: zs * Math.sqrt(3) / 2, s: senses[1], phi: ph + 2 * Math.PI * k / 3, q: qS[k] });
    const r = f4Residual(members, v, 2 * Math.PI / v, 96);
    record({ group: 'iv 3+3', set: `great circle ${qG.map((x) => (x > 0 ? '+' : '-')).join('')}, small circle ${qS.map((x) => (x > 0 ? '+' : '-')).join('')} on z=${zs > 0 ? '+' : '-'}sqrt3/2`, senses, v, phaseUpper: ph, ...r });
  }
}
{
  const rows = out.results.filter((x) => x.group === 'iv 3+3' && !x.singular);
  const m = rows.reduce((a, b) => (b.R < a.R ? b : a));
  log(`3+3: ${rows.length} rows, min R=${m.R.toFixed(5)} at ${m.set} senses=${m.senses.join('')} v=${m.v} phase=${(m.phaseUpper * 180 / Math.PI).toFixed(0)} radial=${m.radial.toFixed(4)} tangential=${m.tangential.toFixed(4)} remaining=${m.remaining.toFixed(4)}`);
}

const singular = out.results.filter((x) => x.singular).length;
out.summary = { rows: out.results.length, singular, globalMinimum: best, byGroup: {} };
for (const g of [...new Set(out.results.map((x) => x.group))]) {
  const rows = out.results.filter((x) => x.group === g && !x.singular);
  const m = rows.reduce((a, b) => (b.R < a.R ? b : a));
  const sorted = rows.map((x) => x.R).sort((p, q) => p - q);
  out.summary.byGroup[g] = { rows: rows.length, min: m.R, at: { set: m.set, senses: m.senses, v: m.v, phaseUpper: m.phaseUpper, phaseLower: m.phaseLower ?? null }, median: sorted[Math.floor(sorted.length / 2)], max: sorted[sorted.length - 1] };
}
// v-dependence of the minimum
out.summary.minByV = {};
for (const v of vGrid) { const rows = out.results.filter((x) => x.v === v && !x.singular); out.summary.minByV[v] = Math.min(...rows.map((x) => x.R)); }
log(`total ${out.results.length} rows (${singular} singular); global minimum R=${best.R.toFixed(6)} in ${best.group} (${best.set}) senses=${best.senses.join('')} v=${best.v} phases=(${(best.phaseUpper * 180 / Math.PI).toFixed(0)}${best.phaseLower !== undefined ? ',' + (best.phaseLower * 180 / Math.PI).toFixed(0) : ''}) radial=${best.radial.toFixed(4)} tangential=${best.tangential.toFixed(4)} remaining=${best.remaining.toFixed(4)} minSep=${best.minSep.toFixed(4)} det in [${best.minDet.toFixed(3)}, ${best.maxDet.toFixed(3)}]`);
log('minimum by v:', JSON.stringify(out.summary.minByV));
out.finishedAt = new Date().toISOString();
writeFileSync('weber-binding-sphere-reference-F4.json', JSON.stringify(out, jsonNum, 2));
log('wrote weber-binding-sphere-reference-F4.json');

// ---------------- supplementary (beyond the fixed grid, labelled as such) ----------------
{
  // known case: the alternating square alone on z = 0 at its own balanced speed v = Omega rho, Omega^2 = (2 sqrt2 - 1)/4 at rho = 1
  const vs = Math.sqrt((2 * Math.SQRT2 - 1) / 4);
  const sq = Array.from({ length: 4 }, (_, k) => ({ a: 1, z: 0, s: 1, phi: k * Math.PI / 2, q: k % 2 === 0 ? 1 : -1 }));
  const rsq = f4Residual(sq, vs, 2 * Math.PI / vs, 96);
  // at a = R = 1 the four-member ring sits exactly at its singular radius x = 1 (the K3 closed form carries the factor 1 - 1/x),
  // so the four-member solve is expected to be singular there; the pivot determinant is recorded.
  const sqState = pathOf(sq, vs)(0);
  const sqSol = solveAccelerations({ X: sqState.X, V: sqState.V, q: sq.map((m) => m.q) });
  rsq.note = 'a = R = 1 is the singular radius of the alternating four-ring (determinant factor 1 - 1/x); a singular solve is the expected answer';
  rsq.det = sqSol.det; rsq.minPivot = sqSol.minPivot;
  log(`supplementary known case: alternating square alone on z=0 at v=${vs.toFixed(6)}: ${rsq.singular ? 'singular solve as expected at x = 1 (pivot determinant ' + sqSol.det + ', min pivot ' + sqSol.minPivot + ')' : 'R=' + rsq.R.toExponential(3)}`);
  // continuous v for the best grid group (4+2, square on z = 0 with the pair on z = +sqrt3/2), each phase and sense, golden section on [0.2, 2]
  const sup = { squareAlone: rsq, fourPlusTwoContinuousV: [] };
  for (const zs of [1, -1]) for (const senses of [[1, 1], [1, -1]]) for (const ph of offsets) {
    const build = () => { const m = []; for (let k = 0; k < 4; k++) m.push({ a: 1, z: 0, s: senses[0], phi: k * Math.PI / 2, q: k % 2 === 0 ? 1 : -1 }); m.push({ a: 0.5, z: zs * Math.sqrt(3) / 2, s: senses[1], phi: ph, q: 1 }); m.push({ a: 0.5, z: zs * Math.sqrt(3) / 2, s: senses[1], phi: ph + Math.PI, q: -1 }); return m; };
    const f = (v) => { const r = f4Residual(build(), v, 2 * Math.PI / v, 96); return r.singular ? 1e9 : r.R; };
    let lo = 0.2, hi = 2.0; const g = (Math.sqrt(5) - 1) / 2;
    let x1 = hi - g * (hi - lo), x2 = lo + g * (hi - lo), f1 = f(x1), f2 = f(x2);
    for (let it = 0; it < 60; it++) { if (f1 < f2) { hi = x2; x2 = x1; f2 = f1; x1 = hi - g * (hi - lo); f1 = f(x1); } else { lo = x1; x1 = x2; f1 = f2; x2 = lo + g * (hi - lo); f2 = f(x2); } }
    const v = 0.5 * (lo + hi); const r = f4Residual(build(), v, 2 * Math.PI / v, 96);
    sup.fourPlusTwoContinuousV.push({ zSign: zs, senses, phaseUpper: ph, vBest: v, ...r });
  }
  const m = sup.fourPlusTwoContinuousV.reduce((a, b) => (b.R < a.R ? b : a));
  log(`supplementary 4+2 continuous v on [0.2, 2]: best R=${m.R.toFixed(6)} at v=${m.vBest.toFixed(6)} z=${m.zSign > 0 ? '+' : '-'} senses=${m.senses.join('')} phase=${(m.phaseUpper * 180 / Math.PI).toFixed(0)} radial=${m.radial.toFixed(4)} tangential=${m.tangential.toFixed(4)} remaining=${m.remaining.toFixed(4)}`);
  out.supplementary = sup;
  writeFileSync('weber-binding-sphere-reference-F4.json', JSON.stringify(out, jsonNum, 2));
  log('rewrote weber-binding-sphere-reference-F4.json with the supplementary block');
}
