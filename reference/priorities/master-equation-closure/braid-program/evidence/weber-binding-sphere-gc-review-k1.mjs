// weber-binding-sphere-gc-review-k1.mjs
// Reviewer's known-case anchor (K1) for the great-circle closure review, 2026-10-06.
// Written from the mathematics of the law; imports only the frozen reference library
// (full 18x18 solve) as the independent anchor. Does not read the author's gc scripts.
//
// Closed residual (reviewer's evaluator, solve-free):
//   F_i = sum_j w_ij (X_i - X_j) + Omega^2 X_i,
//   w_ij = sigma D^{-5/2} [ (1 + Ddd/2) D - 3 Dd^2 / 8 ],   D = |X_i-X_j|^2,
//   Dd = 2 (X_i-X_j).(V_i-V_j),  Ddd = 2 |V_i-V_j|^2 + 2 (X_i-X_j).(A_i-A_j),  A = -Omega^2 X.
// Relation to the solved residual r_i = A_law,i + Omega^2 X_i:  F = M r, with
//   M_ii = I - sum_j (sigma/d) e e^T,  M_ij = + (sigma/d) e e^T   (K = c_f = 1),
// derived by the reviewer from d d'' = d e.(A_i - A_j) + |w_perp|^2.
import { writeFileSync } from 'node:fs';
import { solveAccelerations, makeRng, dot, cross, sub, add, scale, norm, unit } from './weber-binding-sphere-reference-lib.mjs';

function closedResidual(X, V, q, Omega) {
  const N = X.length; const F = [];
  for (let i = 0; i < N; i++) {
    let f = scale(X[i], Omega * Omega);
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = sub(X[i], X[j]); const dv = sub(V[i], V[j]);
      const da = scale(dx, -Omega * Omega);
      const D = dot(dx, dx); const Dd = 2 * dot(dx, dv); const Ddd = 2 * dot(dv, dv) + 2 * dot(dx, da);
      const w = q[i] * q[j] * Math.pow(D, -2.5) * ((1 + Ddd / 2) * D - 3 * Dd * Dd / 8);
      f = add(f, scale(dx, w));
    }
    F.push(f);
  }
  return F;
}
function applyM(X, q, r) {
  const N = X.length; const out = [];
  for (let i = 0; i < N; i++) {
    let o = r[i].slice();
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = sub(X[i], X[j]); const d = norm(dx); const e = scale(dx, 1 / d);
      const a = q[i] * q[j] / d;
      o = add(o, scale(e, -a * dot(e, sub(r[i], r[j]))));
    }
    out.push(o);
  }
  return out;
}
function basis(m) { // deterministic right-handed in-plane basis with u x u' = m
  const ref = Math.abs(m[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const u = unit(cross(ref, m)); const up = cross(m, u); return [u, up];
}
function greatCircleState(mem, R, Omega, T) {
  const X = [], V = [];
  for (const { u, up, phi } of mem) {
    const c = Math.cos(Omega * T + phi), s = Math.sin(Omega * T + phi);
    X.push(add(scale(u, R * c), scale(up, R * s)));
    V.push(add(scale(u, -R * Omega * s), scale(up, R * Omega * c)));
  }
  return { X, V };
}
const maxAbs = (F) => Math.max(...F.map(norm));
const out = { instrument: 'reviewer closed residual vs frozen reference library full solve', startedUtc: new Date().toISOString(), cases: [] };

// Known case first: alternating hexagon, Omega^2 = (5/4 - 1/sqrt 3)/R^3, R = 1.3.
{
  const R = 1.3; const Omega = Math.sqrt((1.25 - 1 / Math.sqrt(3)) / R ** 3);
  const q = [1, -1, 1, -1, 1, -1]; const m = unit([0.3, -0.5, 0.8]); const [u, up] = basis(m);
  const mem = q.map((_, k) => ({ u, up, phi: k * Math.PI / 3 + 0.37 }));
  let worstF = 0, worstR = 0;
  for (let k = 0; k < 12; k++) {
    const { X, V } = greatCircleState(mem, R, Omega, 0.71 * k);
    worstF = Math.max(worstF, maxAbs(closedResidual(X, V, q, Omega)) / (Omega * Omega * R));
    const sol = solveAccelerations({ X, V, q });
    worstR = Math.max(worstR, maxAbs(sol.A.map((a, i) => add(a, scale(X[i], Omega * Omega)))) / (Omega * Omega * R));
  }
  out.hexagon = { R, Omega, closedResidualNormalized: worstF, librarySolvedResidualNormalized: worstR };
  // negative control: same ring at 1.05 Omega must not vanish
  const { X, V } = greatCircleState(mem, R, 1.05 * Omega, 0.4);
  out.hexagonDetuned = { closedResidualNormalized: maxAbs(closedResidual(X, V, q, 1.05 * Omega)) / (Omega * Omega * R) };
}
// Ten random great-circle states.
const rng = makeRng(20261006);
let worstRel = 0;
for (let c = 0; c < 10; c++) {
  const R = 0.5 + 1.5 * rng.next(); const Omega = 0.2 + 2.8 * rng.next(); const T = 10 * rng.next();
  const q = [1, 1, 1, -1, -1, -1];
  const mem = q.map(() => { const m = rng.unitVec(); const [u, up] = basis(m); return { m, u, up, phi: 2 * Math.PI * rng.next() }; });
  const { X, V } = greatCircleState(mem, R, Omega, T);
  const F = closedResidual(X, V, q, Omega);
  const sol = solveAccelerations({ X, V, q });
  const r = sol.A.map((a, i) => add(a, scale(X[i], Omega * Omega)));
  const Mr = applyM(X, q, r);
  const diff = Math.max(...F.map((f, i) => norm(sub(f, Mr[i]))));
  const rel = diff / maxAbs(F);
  worstRel = Math.max(worstRel, rel);
  out.cases.push({ c, R, Omega, T, q, mem: mem.map(({ m, u, up, phi }) => ({ m, u, up, phi })), F, solvedResidual: r, maxF: maxAbs(F), maxSolved: maxAbs(r), relDiff_F_vs_Mr: rel, det: sol.det });
}
out.worstRelDiff = worstRel;
out.pass = worstRel < 1e-12 && out.hexagon.closedResidualNormalized < 1e-12 && out.hexagonDetuned.closedResidualNormalized > 1e-3;
out.finishedUtc = new Date().toISOString();
writeFileSync(new URL('./weber-binding-sphere-gc-review-k1.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify({ hexagon: out.hexagon, hexagonDetuned: out.hexagonDetuned, worstRelDiff: worstRel, perCase: out.cases.map((x) => [x.maxF.toExponential(3), x.maxSolved.toExponential(3), x.relDiff_F_vs_Mr.toExponential(2)]), pass: out.pass }, null, 1));
