// Second-reading referee check (independent of the author's scripts and of the first review).
// Node >= 20, no dependencies.  Run: node weber-binding-sphere-gc-second-reading-check.mjs
// Checks: (K) known case sqrt(1-y^2); (A) recurrence for sqrt(1-2 beta y-y^2) against series squaring;
// (B) coefficients (17.1) of D = 2R^2 - 2 X_i.X_j by a torus DFT built from the vectors;
// (C) for r:1, r=5,7,9: e_1,e_2,e_r closed forms, h_n = (-i)^n t_n for n<r, from a DFT in zeta;
// (D) on the curve (P1): sup of the left side of (P2) against 2r(r+1).
let seed = 20261007; const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0, seed / 4294967296);
const C = (re, im = 0) => ({ re, im }); const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => { const d = b.re * b.re + b.im * b.im; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const abs = a => Math.hypot(a.re, a.im); const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const tau = (beta, N) => { const t = [1, -beta]; for (let n = 1; n < N; n++) t.push(((2 * n - 1) * beta * t[n] + (n - 2) * t[n - 1]) / (n + 1)); return t; };
const out = {};
// (K) known case: sqrt(1-y^2) = 1 - y^2/2 - y^4/8 - y^6/16 - 5y^8/128
{ const t = tau(0, 9); out.K = Math.max(Math.abs(t[2] + 1 / 2), Math.abs(t[4] + 1 / 8), Math.abs(t[6] + 1 / 16), Math.abs(t[8] + 5 / 128), Math.abs(t[1]), Math.abs(t[3]), Math.abs(t[5])); }
// (A) recurrence vs squaring: (sum tau_n y^n)^2 = 1 - 2 beta y - y^2 through order 20
{ let worst = 0; for (let k = 0; k < 200; k++) { const beta = 4 * rnd() - 2, t = tau(beta, 21);
    for (let n = 0; n <= 20; n++) { let s = 0; for (let i = 0; i <= n; i++) s += t[i] * t[n - i]; const want = n == 0 ? 1 : n == 1 ? -2 * beta : n == 2 ? -1 : 0; worst = Math.max(worst, Math.abs(s - want) / (1 + Math.abs(t[n]))); } } out.A = worst; }
// geometry: frame with n_i = z, n_j at angle gamma, l along n_i x n_j, u = l, u' = n x l
function pair(R, ai, aj, si, sj, gamma) {
  const ni = [0, 0, 1], nj = [Math.sin(gamma), 0, Math.cos(gamma)]; const l = cross(ni, nj).map(v => v / Math.sin(gamma));
  const ci = si * Math.sqrt(R * R - ai * ai), cj = sj * Math.sqrt(R * R - aj * aj);
  const X = (n, c, a, th) => { const up = cross(n, l); return [0, 1, 2].map(k => c * n[k] + a * (Math.cos(th) * l[k] + Math.sin(th) * up[k])); };
  return { ci, cj, D: (thi, thj) => 2 * R * R - 2 * dot(X(ni, ci, ai, thi), X(nj, cj, aj, thj)) };
}
// (G) known case for the geometry and the torus DFT, worked by hand: two great circles (c = 0, a = R = 1) about perpendicular axes
// have D = 2 - 2 cos(th_i) cos(th_j), so p_00 = 2, p_{+-1,+-1} = -1/2 and every other coefficient vanishes.
{ const p = pair(1, 1, 1, 1, 1, Math.PI / 2); let w = 0; const N = 8;
  for (let k = 0; k < 50; k++) { const a = 7 * rnd(), b = 7 * rnd(); w = Math.max(w, Math.abs(p.D(a, b) - (2 - 2 * Math.cos(a) * Math.cos(b)))); }
  for (let P = -3; P <= 4; P++) for (let Q = -3; Q <= 4; Q++) { let q = C(0); for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) { const t1 = 2 * Math.PI * a / N, t2 = 2 * Math.PI * b / N, ph = -(P * t1 + Q * t2); q = add(q, mul(C(p.D(t1, t2)), C(Math.cos(ph), Math.sin(ph)))); }
    const want = (P == 0 && Q == 0) ? 2 : (Math.abs(P) == 1 && Math.abs(Q) == 1) ? -0.5 : 0; w = Math.max(w, abs(sub(C(q.re / (N * N), q.im / (N * N)), C(want)))); }
  out.G = w; }
out.known_cases_pass = out.K < 1e-14 && out.A < 1e-12 && out.G < 1e-12;
if (!out.known_cases_pass || process.argv.includes("--known-only")) { console.log(JSON.stringify(out, null, 1)); process.exit(out.known_cases_pass ? 0 : 1); }
// (B) torus DFT, 8x8 grid, random pairs
{ let wm = 0, wo = 0; const N = 8;
  for (let k = 0; k < 300; k++) { const R = 1, ai = 0.05 + 0.9 * rnd(), aj = 0.05 + 0.9 * rnd(), g = 0.05 + (Math.PI - 0.1) * rnd(), f1 = 2 * Math.PI * rnd(), f2 = 2 * Math.PI * rnd();
    const p = pair(R, ai, aj, rnd() < .5 ? 1 : -1, rnd() < .5 ? 1 : -1, g); const co = {};
    for (let P = -3; P <= 4; P++) for (let Q = -3; Q <= 4; Q++) { let s = C(0); for (let a = 0; a < N; a++) for (let b = 0; b < N; b++) { const t1 = 2 * Math.PI * a / N, t2 = 2 * Math.PI * b / N, ph = -(P * t1 + Q * t2); s = add(s, mul(C(p.D(t1 + f1, t2 + f2)), C(Math.cos(ph), Math.sin(ph)))); } co[P + ',' + Q] = abs(s) / (N * N); }
    const want = { '1,1': .5 * ai * aj * (1 - Math.cos(g)), '1,-1': .5 * ai * aj * (1 + Math.cos(g)), '1,0': Math.abs(p.cj) * ai * Math.sin(g), '0,1': Math.abs(p.ci) * aj * Math.sin(g), '0,0': Math.abs(2 * R * R - 2 * p.ci * p.cj * Math.cos(g)) };
    for (const key in co) { const [P, Q] = key.split(',').map(Number); if (Math.abs(P) > 1 || Math.abs(Q) > 1) wo = Math.max(wo, co[key]); }
    for (const key in want) wm = Math.max(wm, Math.abs(co[key] - want[key])); }
  out.B_moduli = wm; out.B_other_terms = wo; }
// (C),(D)
for (const r of [5, 7, 9]) { let we = 0, wh = 0; const N = 4 * (r + 1) + 8;
  for (let k = 0; k < 150; k++) { const R = 1, aj = 0.1 + 0.85 * rnd(), ai = aj / r, g = 0.2 + (Math.PI - 0.4) * rnd(), phi = 2 * Math.PI * rnd();
    const p = pair(R, ai, aj, rnd() < .5 ? 1 : -1, rnd() < .5 ? 1 : -1, g); const beta = p.cj / aj, betai = p.ci / ai, kap = 1 / Math.tan(g / 2);
    const d = n => { let s = C(0); for (let a = 0; a < N; a++) { const T = 2 * Math.PI * a / N; s = add(s, mul(C(p.D(r * T + phi, T)), C(Math.cos(n * T), -Math.sin(n * T)))); } return C(s.re / N, s.im / N); };
    const e = []; const top = d(r + 1); for (let n = 0; n <= r; n++) e.push(div(d(r + 1 - n), top));
    const rel = (x, w) => abs(sub(x, w)) / (1 + abs(w)); we = Math.max(we, rel(e[1], C(0, 2 * beta * kap)), rel(e[2], C(kap * kap)), rel(e[r], mul(C(0, -2 * betai * kap), C(Math.cos(phi), -Math.sin(phi)))));
    for (let n = 3; n < r; n++) we = Math.max(we, abs(e[n]));
    const h = [C(1)]; for (let n = 1; n < r; n++) { let s = e[n]; for (let i = 1; i < n; i++) s = sub(s, mul(h[i], h[n - i])); h.push(C(s.re / 2, s.im / 2)); }
    const t = tau(beta, r + 1); for (let n = 1; n < r; n++) { const mi = [C(1), C(0, -1), C(-1), C(0, 1)][n % 4]; const w = mul(mi, C(t[n] * kap ** n)); wh = Math.max(wh, abs(sub(h[n], w)) / (1 + abs(w))); } }
  // (D): on (P1), kappa^4 * (r-4)(1+5b^2)/4 + kappa^2 (2r-5) b^2 - (r-1) = 0, positive root in kappa^2
  let sup = -Infinity, at = 0; for (let q = 0; q <= 400000; q++) { const b2 = (q / 400000) ** 2 * 400; const A = (r - 4) * (1 + 5 * b2) / 4, B = (2 * r - 5) * b2, k2 = (-B + Math.sqrt(B * B + 4 * A * (r - 1))) / (2 * A);
    const lhs = (1 + b2) * k2 * ((2 * r - 3) + (r - 3) * k2); if (lhs > sup) { sup = lhs; at = b2; } }
  out['r' + r] = { e_closed_forms: we, h_vs_recurrence: wh, P2_left_sup_on_P1: sup, at_beta2: at, P2_required_excess_over: 2 * r * (r + 1) }; }
// (E) Lemma 18.1 bookkeeping: distinctness of ra+sb, and bottom-up vanishing of h_k (0<k<r, s not dividing k) for 5:3, 7:3, 7:5
{ let bad = []; const gcd = (a, b) => b ? gcd(b, a % b) : a;
  for (let s = 1; s <= 41; s += 2) for (let r = s + 2; r <= 61; r += 2) { if (gcd(r, s) != 1) continue; const S = new Set(); for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) S.add(r * a + s * b); if (S.size != 9) bad.push([r, s]); }
  out.E_nondistinct_exponent_cases = bad;
  for (const [r, s] of [[5, 3], [7, 3], [7, 5]]) { let wv = 0, wx = 0; const N = 4 * (r + s) + 8;
    for (let k = 0; k < 200; k++) { const aS = 0.1 + 0.85 * rnd(), aR = aS * s / r, g = 0.2 + (Math.PI - 0.4) * rnd(), phi = 2 * Math.PI * rnd();
      const p = pair(1, aR, aS, rnd() < .5 ? 1 : -1, rnd() < .5 ? 1 : -1, g);
      const d = n => { let q = C(0); for (let a = 0; a < N; a++) { const T = 2 * Math.PI * a / N; q = add(q, mul(C(p.D(r * T + phi, s * T)), C(Math.cos(n * T), -Math.sin(n * T)))); } return C(q.re / N, q.im / N); };
      const allowed = new Set(); for (let a = -1; a < 2; a++) for (let b = -1; b < 2; b++) allowed.add(r * a + s * b);
      for (let n = -(r + s) - 3; n <= r + s + 3; n++) if (!allowed.has(n)) wx = Math.max(wx, abs(d(n)));
      const top = d(r + s), e = []; for (let n = 0; n < r; n++) e.push(div(d(r + s - n), top));
      const h = [C(1)]; for (let n = 1; n < r; n++) { let q = e[n]; for (let i = 1; i < n; i++) q = sub(q, mul(h[i], h[n - i])); h.push(C(q.re / 2, q.im / 2)); if (n % s) wv = Math.max(wv, abs(h[n])); } }
    out["E_" + r + "_" + s] = { coefficients_off_stated_exponents: wx, h_off_multiples_of_s_below_r: wv }; } }
console.log(JSON.stringify(out, null, 1));
