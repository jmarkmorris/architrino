#!/usr/bin/env node
// Independent check of a rigid periodic configuration found by stage 1: no linear solve and no library import.
// From the coefficient set at phase 0 it fits the angular velocity W (V_i = W x X_i, least squares), and evaluates the
// inverse-square rigid balance  sum_j sigma_ij e_ij / d_ij^2 + |W|^2 X_i,perp = 0  (rigid reduction: for a rigid
// rotation the bracket of the law is 1 when the accelerations are centripetal). Known cases first: the exact hexagon
// (zero) and the hexagon at 1.01 Omega (non-zero).
// Usage: node weber-binding-sphere-mc-rigid-check.mjs <tag>:<start> [<tag>:<start> ...]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = path.dirname(fileURLToPath(import.meta.url)), ROOT = path.resolve(HERE, '../../../../..'), q = [1, -1, 1, -1, 1, -1];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
function solve3(A, b) { const m = A.map((r, i) => [...r, b[i]]); for (let k = 0; k < 3; k++) { let p = k; for (let i = k + 1; i < 3; i++) if (Math.abs(m[i][k]) > Math.abs(m[p][k])) p = i; [m[k], m[p]] = [m[p], m[k]]; for (let i = k + 1; i < 3; i++) { const f = m[i][k] / m[k][k]; for (let j = k; j < 4; j++) m[i][j] -= f * m[k][j]; } } const x = [0, 0, 0]; for (let i = 2; i >= 0; i--) { let s = m[i][3]; for (let j = i + 1; j < 3; j++) s -= m[i][j] * x[j]; x[i] = s / m[i][i]; } return x; }
function check(X, V) {
  // least squares for W: sum_i |W x X_i - V_i|^2 -> (sum_i (|X_i|^2 I - X_i X_i^T)) W = sum_i X_i x V_i
  const A = [[0, 0, 0], [0, 0, 0], [0, 0, 0]], b = [0, 0, 0];
  for (let i = 0; i < 6; i++) { const x = X[i], n2 = x[0] ** 2 + x[1] ** 2 + x[2] ** 2, l = cross(x, V[i]); for (let a = 0; a < 3; a++) { b[a] += l[a]; for (let c = 0; c < 3; c++) A[a][c] += (a === c ? n2 : 0) - x[a] * x[c]; } }
  const W = solve3(A, b), w2 = W[0] ** 2 + W[1] ** 2 + W[2] ** 2, n = W.map(z => z / Math.sqrt(w2));
  let rigidFit = 0, bal = 0, scale = 0;
  for (let i = 0; i < 6; i++) {
    const wx = cross(W, X[i]); rigidFit = Math.max(rigidFit, Math.hypot(wx[0] - V[i][0], wx[1] - V[i][1], wx[2] - V[i][2]));
    const h = X[i][0] * n[0] + X[i][1] * n[1] + X[i][2] * n[2], xp = X[i].map((z, a) => z - h * n[a]), g = xp.map(z => w2 * z);
    for (let j = 0; j < 6; j++) if (j !== i) { const d = X[i].map((z, a) => z - X[j][a]), dd = Math.hypot(...d); for (let a = 0; a < 3; a++) g[a] += q[i] * q[j] * d[a] / dd ** 3; }
    bal = Math.max(bal, Math.hypot(...g)); scale = Math.max(scale, w2 * Math.hypot(...xp));
  }
  return { rate: Math.sqrt(w2), rigidVelocityFitResidual: rigidFit, balanceResidual: bal, balanceRelative: bal / scale };
}
const hexC = 5 / 4 - 1 / Math.sqrt(3), hex = om => { const X = [], V = []; for (let k = 0; k < 6; k++) { const t = k * Math.PI / 3; X.push([Math.cos(t), Math.sin(t), 0]); V.push([-om * Math.sin(t), om * Math.cos(t), 0]); } return check(X, V); };
const out = { utc: new Date().toISOString(), knownCases: { hexagon: hex(Math.sqrt(hexC)), hexagonAt1p01Omega: hex(1.01 * Math.sqrt(hexC)) }, objects: {} };
out.knownCases.pass = out.knownCases.hexagon.balanceRelative <= 1e-13 && out.knownCases.hexagonAt1p01Omega.balanceRelative >= 1e-3;
console.log('KNOWN', JSON.stringify(out.knownCases));
if (!out.knownCases.pass) process.exit(1);
for (const spec of process.argv.slice(2)) {
  const [tag, start] = spec.split(':'), row = fs.readFileSync(path.join(ROOT, '.local-data/master-equation-closure/weber-binding-sphere/mc', `search-${tag}.jsonl`), 'utf8').trim().split('\n').map(l => JSON.parse(l)).find(r => r.results && r.start === Number(start));
  const x = row.results.stage1, M = x.M, nb = 2 * M + 1, X = [], V = [];
  for (let i = 0; i < 6; i++) { const p = [0, 0, 0], v = [0, 0, 0]; for (let a = 0; a < 3; a++) { p[a] = x.c[(i * nb) * 3 + a]; for (let m = 1; m <= M; m++) { p[a] += x.c[(i * nb + 2 * m - 1) * 3 + a]; v[a] += x.omega * m * x.c[(i * nb + 2 * m) * 3 + a]; } } X.push(p); V.push(v); }
  out.objects[spec] = { omegaCollocation: x.omega, ...check(X, V) }; console.log(spec, JSON.stringify(out.objects[spec]));
}
fs.writeFileSync(path.join(HERE, 'weber-binding-sphere-mc-rigid-check.json'), JSON.stringify(out, null, 1));
