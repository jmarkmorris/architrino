#!/usr/bin/env node
// PI check (second continuation, 2026-10-06): which arrangements of six members, three of each
// polarity, on ONE circle in rigid rotation satisfy the inverse-square ring balance
//   sum_{j != i} sigma_ij (X_i - X_j)/d_ij^3 + Omega^2 X_i = 0   (K = 1, unit circle)?
// By the great-circle theorem every collision-free common-rate great-circle solution of the
// instantaneous Weber comparison law is such a ring, so this planar question is what remains.
// Unknowns: five angles (theta_0 = 0) and Omega^2. Residual: 12 components. Levenberg-Marquardt
// with a finite-difference Jacobian from seeded random starts. No import from any other instrument.
// Known cases first: alternating hexagon (zero, Omega^2 = 5/4 - 1/sqrt3), alternating square
// (zero, Omega^2 = (2 sqrt2 - 1)/4), detuned hexagon (non-zero).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url));
function resid(th, om2, q) {
  const N = q.length, r = [];
  for (let i = 0; i < N; i++) {
    let fx = om2 * Math.cos(th[i]), fy = om2 * Math.sin(th[i]);
    for (let j = 0; j < N; j++) if (j !== i) {
      const dx = Math.cos(th[i]) - Math.cos(th[j]), dy = Math.sin(th[i]) - Math.sin(th[j]);
      const d = Math.hypot(dx, dy), s = q[i] * q[j] / (d * d * d);
      fx += s * dx; fy += s * dy;
    }
    r.push(fx, fy);
  }
  return r;
}
const norm = v => Math.sqrt(v.reduce((s, z) => s + z * z, 0));
function solve(A, b) { // Gaussian elimination, partial pivoting
  const n = b.length, M = A.map((row, i) => [...row, b[i]]);
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(M[i][k]) > Math.abs(M[p][k])) p = i;
    [M[k], M[p]] = [M[p], M[k]]; if (Math.abs(M[k][k]) < 1e-300) return null;
    for (let i = k + 1; i < n; i++) { const f = M[i][k] / M[k][k]; for (let j = k; j <= n; j++) M[i][j] -= f * M[k][j]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let j = i + 1; j < n; j++) s -= M[i][j] * x[j]; x[i] = s / M[i][i]; }
  return x;
}
function lm(p0, q, maxIt = 200) {
  const N = q.length; let p = p0.slice(); let lam = 1e-3;
  const F = pp => resid([0, ...pp.slice(0, N - 1)], pp[N - 1], q);
  let r = F(p), c = norm(r);
  for (let it = 0; it < maxIt && c > 1e-15; it++) {
    const n = p.length, J = [];
    for (let k = 0; k < n; k++) { const h = 1e-7, pp = p.slice(), pm = p.slice(); pp[k] += h; pm[k] -= h; const rp = F(pp), rm = F(pm); J.push(rp.map((z, i) => (z - rm[i]) / (2 * h))); }
    const JTJ = Array.from({ length: n }, (_, a) => Array.from({ length: n }, (_, b) => J[a].reduce((s, z, i) => s + z * J[b][i], 0)));
    const g = J.map(col => col.reduce((s, z, i) => s + z * r[i], 0));
    let done = false;
    for (let tries = 0; tries < 30 && !done; tries++) {
      const A = JTJ.map((row, a) => row.map((z, b) => z + (a === b ? lam * (1e-12 + JTJ[a][a]) : 0)));
      const dx = solve(A, g.map(z => -z)); if (!dx) { lam *= 10; continue; }
      const pn = p.map((z, k) => z + dx[k]); const rn = F(pn), cn = norm(rn);
      if (Number.isFinite(cn) && cn < c) { p = pn; r = rn; c = cn; lam = Math.max(lam / 5, 1e-12); done = true; } else lam *= 10;
    }
    if (!done) break;
  }
  return { p, c };
}
const minSep = th => { let m = 9; for (let i = 0; i < th.length; i++) for (let j = i + 1; j < th.length; j++) { let d = Math.abs(th[i] - th[j]) % (2 * Math.PI); d = Math.min(d, 2 * Math.PI - d); m = Math.min(m, d); } return m; };
const out = { utc_start: new Date().toISOString(), known: {}, target: {} };
// ---- known cases
{ const q = [1, -1, 1, -1, 1, -1], th = [0, 1, 2, 3, 4, 5].map(k => k * Math.PI / 3);
  out.known.hexagon = { residual: norm(resid(th, 1.25 - 1 / Math.sqrt(3), q)), tolerance: 1e-13 };
  out.known.hexagonDetuned = { residual: norm(resid(th, 1.1 * (1.25 - 1 / Math.sqrt(3)), q)), tolerance: '>= 1e-2' };
  const q4 = [1, -1, 1, -1], t4 = [0, 1, 2, 3].map(k => k * Math.PI / 2);
  out.known.square = { residual: norm(resid(t4, (2 * Math.SQRT2 - 1) / 4, q4)), tolerance: 1e-13 };
  const pert = [...th.slice(1).map((z, k) => z + 0.15 * Math.sin(3.1 * k + 1)), 0.5];
  const s = lm(pert, q); out.known.reach = { residual: s.c, omega2: s.p[5], tolerance: 1e-12 };
  out.known.pass = out.known.hexagon.residual < 1e-13 && out.known.hexagonDetuned.residual > 1e-2 && out.known.square.residual < 1e-13 && s.c < 1e-12 && Math.abs(s.p[5] - (1.25 - 1 / Math.sqrt(3))) < 1e-9;
}
console.log('known cases', JSON.stringify(out.known));
if (!out.known.pass) { console.error('known case failed; no target run'); process.exit(1); }
// ---- target: polarity (+,+,+,-,-,-) with free angles covers every necklace
let seed = 20261006; const rnd = () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
const q = [1, 1, 1, -1, -1, -1], STARTS = Number(process.argv[2] ?? 4000), sols = []; let nConv = 0, floorOther = Infinity;
for (let s = 0; s < STARTS; s++) {
  const p0 = [rnd(), rnd(), rnd(), rnd(), rnd()].map(z => z * 2 * Math.PI).concat([0.1 + 2 * rnd()]);
  const { p, c } = lm(p0, q); const th = [0, ...p.slice(0, 5)].map(z => ((z % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI));
  const ms = minSep(th);
  if (c < 1e-11 && ms > 1e-3 && p[5] > 0) {
    nConv++;
    // canonical signature: sorted angles with polarity, rotated so the largest gap is last; store gaps and polarity word
    const idx = th.map((z, i) => i).sort((a, b) => th[a] - th[b]);
    const word = idx.map(i => q[i] > 0 ? '+' : '-').join('');
    const gaps = idx.map((i, k) => { const nx = idx[(k + 1) % 6]; return ((th[nx] - th[i]) + 2 * Math.PI) % (2 * Math.PI); });
    const key = [...gaps].sort((a, b) => a - b).map(g => g.toFixed(6)).join(',') + '|' + p[5].toFixed(8);
    let e = sols.find(z => z.key === key); if (!e) { e = { key, count: 0, omega2: p[5], gapsDeg: gaps.map(g => g * 180 / Math.PI), word, minSepDeg: ms * 180 / Math.PI, residual: c }; sols.push(e); } e.count++;
  } else if (ms > 0.05 && p[5] > 0) floorOther = Math.min(floorOther, c);
}
out.target = { polarity: q, starts: STARTS, converged: nConv, distinct: sols.map(({ key, ...r }) => r), bestNonConvergedResidualWithSeparationAbove0p05rad: floorOther };
out.utc_end = new Date().toISOString();
fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-pi-planar-rings.json'), JSON.stringify(out, null, 1));
console.log('converged', nConv, 'of', STARTS, '; distinct solutions:', sols.length);
for (const s of sols) console.log(' count', s.count, 'Omega^2', s.omega2.toFixed(10), 'word', s.word, 'gaps(deg)', s.gapsDeg.map(g => g.toFixed(4)).join(' '), 'res', s.residual.toExponential(1));
console.log('best non-converged residual (min sep > 0.05 rad):', floorOther);
