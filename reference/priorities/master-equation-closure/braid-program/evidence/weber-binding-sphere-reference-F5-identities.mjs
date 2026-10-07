// weber-binding-sphere-reference-F5-identities.mjs
// Reference lane, Part 2e: spot checks of the derived great-circle pair identities of Section 18
// on random F5 states, and of the Fourier-coefficient sign and decay statements. Own code only.
import { dot, cross, norm, scale, add, sub, unit, makeRng } from './weber-binding-sphere-reference-lib.mjs';
const rng = makeRng(20261005);
const normalOf = (th, ph) => [Math.sin(th) * Math.cos(ph), Math.sin(th) * Math.sin(ph), Math.cos(th)];
const basisOf = (n) => { const e = Math.abs(n[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0]; const u = unit(sub(e, scale(n, dot(e, n)))); return { u, up: cross(n, u) }; };
let worst = { C: 0, A: 0, d2: 0, ddot: 0, w2: 0, bracket: 0 };
for (let t = 0; t < 200; t++) {
  const Om = 0.2 + 2.8 * rng.next();
  const mem = [];
  for (let i = 0; i < 2; i++) { const n = normalOf(Math.acos(2 * rng.next() - 1), 2 * Math.PI * rng.next()); const { u, up } = basisOf(n); mem.push({ n, u, up, psi: 2 * Math.PI * rng.next(), s: rng.next() < 0.5 ? 1 : -1 }); }
  const m = mem.map((x) => scale(x.n, x.s)); // oriented normals
  const A = 0.5 * (1 - dot(m[0], m[1]));
  // constant C and phase alpha from the closed form: X_i.X_j = C + A cos(2 Omega T + alpha) -> fit from three times
  const XV = (T) => mem.map((x) => { const ph = x.s * Om * T + x.psi; const X = add(scale(x.u, Math.cos(ph)), scale(x.up, Math.sin(ph))); const V = scale(add(scale(x.u, -Math.sin(ph)), scale(x.up, Math.cos(ph))), x.s * Om); return { X, V }; });
  const dots = [0, 1, 2].map((k) => { const s = XV(k * Math.PI / (3 * Om)); return dot(s[0].X, s[1].X); });
  // solve C + A cos(alpha + 2 pi k/3) = dots_k for C, A cos alpha, A sin alpha (three unknowns)
  const Mx = [[1, 1, 0], [1, Math.cos(2 * Math.PI / 3), -Math.sin(2 * Math.PI / 3)], [1, Math.cos(4 * Math.PI / 3), -Math.sin(4 * Math.PI / 3)]];
  // Cramer
  const det3 = (M) => M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1]) - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0]) + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);
  const D = det3(Mx); const col = (j) => Mx.map((r, i) => r.map((v, jj) => (jj === j ? dots[i] : v)));
  const C = det3(col(0)) / D, Ac = det3(col(1)) / D, As = det3(col(2)) / D; const Afit = Math.hypot(Ac, As); const alpha = Math.atan2(As, Ac);
  worst.A = Math.max(worst.A, Math.abs(Afit - A));
  // check at random further times: d^2, ddot, |w|^2 and the bracket against the closed forms
  for (let k = 0; k < 5; k++) {
    const T = rng.next() * 2 * Math.PI / Om; const s = XV(T); const tau = 2 * Om * T + alpha; const cs = Math.cos(tau), sn = Math.sin(tau);
    const dv = sub(s[0].X, s[1].X); const d = norm(dv); const e = scale(dv, 1 / d); const w = sub(s[0].V, s[1].V); const ddot = dot(e, w);
    worst.C = Math.max(worst.C, Math.abs(dot(s[0].X, s[1].X) - (C + A * cs)));
    worst.d2 = Math.max(worst.d2, Math.abs(d * d - 2 * (1 - C - A * cs)));
    worst.ddot = Math.max(worst.ddot, Math.abs(ddot - 2 * A * Om * sn / d));
    worst.w2 = Math.max(worst.w2, Math.abs(dot(w, w) - Om * Om * (d * d + 4 * A * cs)));
    // bracket with A = -Omega^2 X inserted: 1 - (3/2) ddot^2 + |w|^2 - Omega^2 d^2 = 1 + 4 A Omega^2 cos - 6 A^2 Omega^2 sin^2 / d^2
    const br = 1 - 1.5 * ddot * ddot + dot(w, w) - Om * Om * d * d;
    worst.bracket = Math.max(worst.bracket, Math.abs(br - (1 + 4 * A * Om * Om * cs - 6 * A * A * Om * Om * sn * sn / (d * d))));
  }
}
console.log('pair identities on 200 random great-circle pairs x 5 times, worst absolute errors:', JSON.stringify(worst));
// Fourier coefficients of sqrt(1 - k cos tau): sign and decay
for (const k of [0.3, 0.7, 0.95]) {
  const N = 4096; const coef = []; for (let m = 0; m <= 12; m++) { let s = 0; for (let n = 0; n < N; n++) { const tau = 2 * Math.PI * n / N; s += Math.sqrt(1 - k * Math.cos(tau)) * Math.cos(m * tau); } coef.push((m === 0 ? 1 : 2) * s / N); }
  const rho = 1 / k - Math.sqrt(1 / (k * k) - 1);
  console.log(`k=${k}: c_1..c_6 = ${coef.slice(1, 7).map((c) => c.toExponential(3)).join(', ')}; all negative for m>=1: ${coef.slice(1).every((c) => c < 0)}; ratio c_12/c_11 = ${(coef[12] / coef[11]).toFixed(5)} vs rho (1 - 3/(2m)) ~ ${(rho * Math.pow(11 / 12, 1.5)).toFixed(5)}, rho=${rho.toFixed(5)}`);
}
// Cesaro argument check: three unit phases with p_1 = 0 force |p_3| = 3
const a1 = 0.7; const zs = [0, 2 * Math.PI / 3, 4 * Math.PI / 3].map((x) => x + a1); const p = (m) => zs.reduce((s, z) => s + Math.cos(m * z), 0) ** 2 + zs.reduce((s, z) => s + Math.sin(m * z), 0) ** 2;
console.log('three unit phases 120 deg apart: |p_1|^2 =', p(1).toExponential(2), '|p_2|^2 =', p(2).toExponential(2), '|p_3|^2 =', p(3).toFixed(6));
