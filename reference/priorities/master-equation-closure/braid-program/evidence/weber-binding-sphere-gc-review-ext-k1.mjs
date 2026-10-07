// weber-binding-sphere-gc-review-ext-k1.mjs
// Reviewer's known-case anchor for Lemma 16.1 (prescribed-history closed form), 2026-10-06.
// Written from the mathematics; imports only the frozen reference library. K = c_f = 1.
//   residual  G_i = sum_j w_ij (X_i - X_j) - X_i'',  w = sigma D^{-5/2}[(1 + D''/2) D - 3 D'^2/8],
//   D = |X_i-X_j|^2, D' = 2 dX.dV, D'' = 2 |dV|^2 + 2 dX.(X_i''-X_j'')   (prescribed accelerations).
// Relation checked: G = M (A_law - X'') with M_ii = I - sum_j (sigma/d) e e^T, M_ij = (sigma/d) e e^T.
import { writeFileSync } from 'node:fs';
import { solveAccelerations, makeRng, dot, cross, sub, add, scale, norm, unit } from './weber-binding-sphere-reference-lib.mjs';

function prescribedResidual(X, V, Acc, q) {
  const N = X.length; const G = [];
  for (let i = 0; i < N; i++) {
    let g = scale(Acc[i], -1);
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const dx = sub(X[i], X[j]), dv = sub(V[i], V[j]), da = sub(Acc[i], Acc[j]);
      const D = dot(dx, dx), Dd = 2 * dot(dx, dv), Ddd = 2 * dot(dv, dv) + 2 * dot(dx, da);
      g = add(g, scale(dx, q[i] * q[j] * Math.pow(D, -2.5) * ((1 + Ddd / 2) * D - 3 * Dd * Dd / 8)));
    }
    G.push(g);
  }
  return G;
}
function applyM(X, q, r) {
  return X.map((_, i) => {
    let o = r[i].slice();
    for (let j = 0; j < X.length; j++) {
      if (j === i) continue;
      const dx = sub(X[i], X[j]); const d = norm(dx); const e = scale(dx, 1 / d);
      o = add(o, scale(e, -(q[i] * q[j] / d) * dot(e, sub(r[i], r[j]))));
    }
    return o;
  });
}
function basis(n) { const ref = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]; const u = unit(cross(ref, n)); return [u, cross(n, u)]; }
// member: { n, c, a, omega, phi }  ->  X = c n + a e, e = cos(th) u + sin(th) u', th = omega T + phi
function state(mem, T) {
  const X = [], V = [], Acc = [];
  for (const m of mem) {
    const [u, up] = basis(m.n); const th = m.omega * T + m.phi; const cs = Math.cos(th), sn = Math.sin(th);
    const e = add(scale(u, cs), scale(up, sn)); const t = add(scale(u, -sn), scale(up, cs));
    X.push(add(scale(m.n, m.c), scale(e, m.a))); V.push(scale(t, m.a * m.omega)); Acc.push(scale(e, -m.a * m.omega * m.omega));
  }
  return { X, V, Acc };
}
const maxN = (F) => Math.max(...F.map(norm));
const out = { startedUtc: new Date().toISOString(), cases: [] };
{ // known case 1: alternating hexagon on a great circle, R = 1.3
  const R = 1.3, Om = Math.sqrt((1.25 - 1 / Math.sqrt(3)) / R ** 3), q = [1, -1, 1, -1, 1, -1], n = unit([0.3, -0.5, 0.8]);
  const mem = q.map((_, k) => ({ n, c: 0, a: R, omega: Om, phi: k * Math.PI / 3 + 0.2 }));
  let w = 0; for (let k = 0; k < 8; k++) { const s = state(mem, 0.9 * k); w = Math.max(w, maxN(prescribedResidual(s.X, s.V, s.Acc, q)) / (Om * Om * R)); }
  out.hexagon = w;
}
{ // known case 2: diametral unlike pair on a small circle (height c, radius a), omega^2 = 1/(4 a^3); and detuned
  const R = 1, c = 0.6, a = 0.8, n = unit([0.1, 0.7, 0.4]), q = [1, -1];
  for (const f of [1, 1.1]) {
    const om = f * Math.sqrt(1 / (4 * a ** 3)); const mem = [{ n, c, a, omega: om, phi: 0.3 }, { n, c, a, omega: om, phi: 0.3 + Math.PI }];
    let w = 0, wl = 0;
    for (let k = 0; k < 8; k++) {
      const s = state(mem, 0.7 * k); w = Math.max(w, maxN(prescribedResidual(s.X, s.V, s.Acc, q)) / (om * om * a));
      const sol = solveAccelerations({ X: s.X, V: s.V, q }); wl = Math.max(wl, maxN(sol.A.map((x, i) => sub(x, s.Acc[i]))) / (om * om * a));
    }
    out[f === 1 ? 'diametralPair' : 'diametralPairDetuned'] = { closed: w, librarySolved: wl };
  }
}
const rng = makeRng(771); let worst = 0;
for (let k = 0; k < 10; k++) {
  const R = 1, v = 0.3 + 1.5 * rng.next(), T = 10 * rng.next(), q = [1, 1, 1, -1, -1, -1];
  const mem = q.map(() => { const c = (2 * rng.next() - 1) * 0.9 * R; const a = Math.sqrt(R * R - c * c); return { n: rng.unitVec(), c, a, omega: (rng.next() < 0.5 ? -1 : 1) * v / a, phi: 2 * Math.PI * rng.next() }; });
  const s = state(mem, T); const G = prescribedResidual(s.X, s.V, s.Acc, q);
  const sol = solveAccelerations({ X: s.X, V: s.V, q }); const r = sol.A.map((x, i) => sub(x, s.Acc[i])); const Mr = applyM(s.X, q, r);
  const rel = Math.max(...G.map((g, i) => norm(sub(g, Mr[i])))) / maxN(G); worst = Math.max(worst, rel);
  out.cases.push({ k, v, T, q, mem, G, maxG: maxN(G), maxSolved: maxN(r), rel });
}
out.worstRel = worst;
out.pass = out.hexagon < 1e-12 && out.diametralPair.closed < 1e-12 && out.diametralPairDetuned.closed > 1e-2 && worst < 1e-12;
out.finishedUtc = new Date().toISOString();
writeFileSync(new URL('./weber-binding-sphere-gc-review-ext-k1.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify({ hexagon: out.hexagon, diametralPair: out.diametralPair, detuned: out.diametralPairDetuned, worstRel: worst, per: out.cases.map((x) => [x.maxG.toExponential(2), x.maxSolved.toExponential(2), x.rel.toExponential(2)]), pass: out.pass }));
