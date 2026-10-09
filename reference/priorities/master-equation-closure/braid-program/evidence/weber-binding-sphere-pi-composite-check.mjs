#!/usr/bin/env node
// PI check (2026-10-07) for reviewer remark E6 on the uniform-circle theorem: how does the residual of a
// coaxial composite of two self-balanced rigid rings (a diametral unlike pair and an alternating square,
// on parallel circles of the unit sphere, one common speed v) behave as the circles shrink (v grows)?
// Law: instantaneous Weber comparison law, K = c_f = 1, lambda = -1/2, mu = 1, full 3N x 3N solve by the
// validated overnight instrument, imported unmodified. Residual: max over members and sampled times of
// |A_law - X''_prescribed|, reported in absolute units and divided by v^2/R (R = 1).
// Known cases are run first and the script refuses to continue if one fails.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { makeParams, packState, solveAccelerations } from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';
const HERE = path.dirname(fileURLToPath(import.meta.url));
function member(a, z, om, ang, q) { // uniform circle of radius a at height z about the z axis
  const c = Math.cos(ang), s = Math.sin(ang);
  return { x: [a * c, a * s, z], v: [-a * om * s, a * om * c, 0], acc: [-om * om * a * c, -om * om * a * s, 0], q };
}
function residual(members) {
  const q = members.map(m => m.q), P = makeParams({ q, lambda: -0.5, mu: 1, K: 1, cf: 1, condition: 'none' });
  const sol = solveAccelerations(packState(members), P); let r = 0;
  members.forEach((m, i) => { r = Math.max(r, Math.hypot(sol.A[3 * i] - m.acc[0], sol.A[3 * i + 1] - m.acc[1], sol.A[3 * i + 2] - m.acc[2])); });
  return { r, det: sol.det };
}
const CS = (2 * Math.SQRT2 - 1) / 4, CH = 1.25 - 1 / Math.sqrt(3);
const out = { utc_start: new Date().toISOString(), known: {}, target: [] };
// ---- known cases
{ const om = Math.sqrt(CH), hex = [0, 1, 2, 3, 4, 5].map(k => member(1, 0, om, k * Math.PI / 3, k % 2 ? -1 : 1));
  out.known.hexagon = residual(hex).r;
  const a = 0.3, z = Math.sqrt(1 - a * a), omp = Math.sqrt(1 / (4 * a ** 3));
  out.known.pairOnSmallCircle = residual([member(a, z, omp, 0.4, 1), member(a, z, omp, 0.4 + Math.PI, -1)]).r;
  out.known.pairDetuned = residual([member(a, z, 1.1 * omp, 0.4, 1), member(a, z, 1.1 * omp, 0.4 + Math.PI, -1)]).r / (omp * omp * a);
  const as = 0.5, zs = Math.sqrt(1 - as * as), oms = Math.sqrt(CS / as ** 3);
  out.known.squareOnSmallCircle = residual([0, 1, 2, 3].map(k => member(as, zs, oms, 0.2 + k * Math.PI / 2, k % 2 ? -1 : 1))).r;
  out.known.pass = out.known.hexagon < 1e-12 && out.known.pairOnSmallCircle < 1e-12 && out.known.squareOnSmallCircle < 1e-12 && out.known.pairDetuned > 1e-2;
}
console.log('known cases', JSON.stringify(out.known));
if (!out.known.pass) { console.error('known case failed'); process.exit(1); }
// ---- target: composite of pair (radius a_p = 1/(4 v^2)) and square (radius a_s = CS / v^2), common speed v
for (const placement of ['opposite caps', 'same cap']) for (const v of [1.0057, 1.25, 1.5, 2, 3, 5, 8]) {
  const ap = 1 / (4 * v * v), as = CS / (v * v); if (ap >= 1 || as >= 1) continue;
  const zp = Math.sqrt(1 - ap * ap), zs = (placement === 'same cap' ? 1 : -1) * Math.sqrt(1 - as * as), omp = v / ap, oms = v / as;
  let sup = 0, sum2 = 0, n = 0, minSep = Infinity, detMin = Infinity, detMax = -Infinity;
  const NT = 2400, span = 2 * Math.PI / Math.abs(omp - oms) * 3; // three relative-phase cycles
  for (let k = 0; k < NT; k++) {
    const t = span * k / NT;
    const ms = [member(ap, zp, omp, omp * t, 1), member(ap, zp, omp, omp * t + Math.PI, -1), ...[0, 1, 2, 3].map(j => member(as, zs, oms, 0.3 + oms * t + j * Math.PI / 2, j % 2 ? -1 : 1))];
    for (let i = 0; i < 2; i++) for (let j = 2; j < 6; j++) minSep = Math.min(minSep, Math.hypot(ms[i].x[0] - ms[j].x[0], ms[i].x[1] - ms[j].x[1], ms[i].x[2] - ms[j].x[2]));
    const { r, det } = residual(ms); sup = Math.max(sup, r); sum2 += r * r; n++; detMin = Math.min(detMin, det); detMax = Math.max(detMax, det);
  }
  const row = { placement, v, aPair: ap, aSquare: as, supAbs: sup, supOverV2: sup / (v * v), rmsOverV2: Math.sqrt(sum2 / n) / (v * v), minInterRingSeparation: minSep, detRange: [detMin, detMax] };
  out.target.push(row);
  console.log(placement.padEnd(14), 'v', v, 'a_pair', ap.toFixed(4), 'a_sq', as.toFixed(4), 'sup|dA|', sup.toFixed(4), 'sup/(v^2/R)', (sup / (v * v)).toFixed(4), 'rms/(v^2/R)', row.rmsOverV2.toFixed(4), 'minSep', minSep.toFixed(3));
}
out.utc_end = new Date().toISOString();
fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-pi-composite-check.json'), JSON.stringify(out, null, 1));
