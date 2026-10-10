// P-W-2 transcription check: Section 9a bracket on a prescribed planar mirror history, in the scaled
// variables of slow-binary-wider-regime.md (Y = X_+/R_0, s = v_0 T/R_0, eps = v_0/c_f, K = 4 R_0 v_0^2).
// Compares the exact bracket (delayed range derivatives with kinematic accelerations) with the
// second-order prediction 1 + eps^2 (4 r r'' - 2 p^2), p = r'. Prescribed histories, not solutions.
const add = (a, b) => [a[0] + b[0], a[1] + b[1]], dot = (a, b) => a[0] * b[0] + a[1] * b[1], sc = (k, a) => [k * a[0], k * a[1]];
function mk(rf, thf) { // polar functions with analytic derivatives by central differences of high accuracy is avoided: use closed forms
  return (s) => { const [r, r1, r2] = rf(s), [t, t1, t2] = thf(s); const n = [Math.cos(t), Math.sin(t)], tt = [-Math.sin(t), Math.cos(t)];
    const Y = sc(r, n), V = add(sc(r1, n), sc(r * t1, tt)), A = add(sc(r2 - r * t1 * t1, n), sc(r * t2 + 2 * r1 * t1, tt));
    return { Y, V, A, r, p: r1, rdd: r2, q: r * t1 }; };
}
function bracket(H, s, eps) {
  const now = H(s); let lo = 0, hi = 4; // delay u = s - sigma in scaled time; root of |Y(s)+Y(s-u)| - u/eps
  const f = (u) => Math.hypot(...add(now.Y, H(s - u).Y)) - u / eps;
  for (let i = 0; i < 200; i++) { const m = (lo + hi) / 2; (f(m) > 0) ? lo = m : hi = m; }
  const u = (lo + hi) / 2, src = H(s - u), Sv = add(now.Y, src.Y), Rd = Math.hypot(...Sv), N = sc(1 / Rd, Sv);
  const D = 1 + eps * dot(N, src.V), Dr = 1 - eps * dot(N, now.V), pb = Dr / D;
  const w = add(now.V, sc(pb, src.V)), wn = dot(w, N), wperp2 = dot(w, w) - wn * wn;
  const exact = 1 - (1 - pb) ** 2 / 2 + eps * eps * (Rd / D) * (dot(N, add(now.A, sc(pb * pb, src.A))) + wperp2 / Rd);
  const pred = 1 + eps * eps * (4 * now.r * now.rdd - 2 * now.p * now.p);
  return { exact, pred, resid: Math.abs(Rd - u / eps) };
}
// known case first: rigid circle, bracket must be exactly one
const circle = mk((s) => [1, 0, 0], (s) => [s, 1, 0]);
for (const eps of [0.02, 0.005]) { const b = bracket(circle, 0.7, eps); console.log(`known circle eps=${eps}: exact-1 = ${(b.exact - 1).toExponential(2)}, pred-1 = ${(b.pred - 1).toExponential(2)}, root residual ${b.resid.toExponential(1)}`); }
// targets: two non-circular prescribed mirror histories
const h1 = mk((s) => [1 + 0.2 * Math.sin(0.9 * s), 0.18 * Math.cos(0.9 * s), -0.162 * Math.sin(0.9 * s)], (s) => [s + 0.1 * Math.sin(1.3 * s), 1 + 0.13 * Math.cos(1.3 * s), -0.169 * Math.sin(1.3 * s)]);
const h2 = mk((s) => [1.5 + 0.3 * Math.cos(0.5 * s), -0.15 * Math.sin(0.5 * s), -0.075 * Math.cos(0.5 * s)], (s) => [0.6 * s, 0.6, 0]);
for (const [name, H, s] of [["h1", h1, 0.4], ["h1", h1, 2.1], ["h2", h2, 1.3]]) { let prev = null, line = `${name} s=${s}:`;
  for (const eps of [0.04, 0.02, 0.01, 0.005]) { const b = bracket(H, s, eps); const d = Math.abs(b.exact - b.pred); line += ` eps=${eps} |exact-pred|/eps^3=${(d / eps ** 3).toFixed(4)} (second-order part ${((b.pred - 1) / eps ** 2).toFixed(4)})`; prev = d; }
  console.log(line); }
