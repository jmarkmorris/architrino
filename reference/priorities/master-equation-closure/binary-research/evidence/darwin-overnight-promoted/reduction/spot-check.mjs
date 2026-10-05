#!/usr/bin/env node
// Spot checks for the reduction worker's closed forms (darwin-overnight, 2026-10-05).
// 1. Central finite differences of a direct evaluation of L_D versus closed-form H and G (N = 2, N = 3, random states, both polarities).
// 2. Residual of the closed-form circle in the full N = 2 Euler-Lagrange equations.
// 3. Invariants E, P, J: time derivative along the flow (gradient contracted with (V, A)) at random states.
// 4. Zero-velocity mirror solve: acceleration ratio to inverse square equals 1/(1 - sigma/r).
// 5. Rotating-frame Cartesian linearization about the circle, block-decomposed by symmetry.
import { lagrangian, hessianH, vectorG, solve, circle } from '../../../reference/priorities/master-equation-closure/binary-research/evidence/darwin-overnight-reduction-predictions.mjs';

let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648 - 0.5; };
const flat = (A) => A.flat(); const unflat = (v) => { const o = []; for (let i = 0; i < v.length; i += 3) o.push([v[i], v[i + 1], v[i + 2]]); return o; };
const h = 1e-4;
function fdCheck(N, sigmaSign) {
  const sigma = (i, j) => sigmaSign;
  const X = Array.from({ length: N }, () => [3 * rnd() + 2 * (rnd() > 0 ? 1 : -1), 3 * rnd(), 3 * rnd()]);
  const V = Array.from({ length: N }, () => [0.3 * rnd(), 0.3 * rnd(), 0.3 * rnd()]);
  const x = flat(X), v = flat(V); const n = 3 * N;
  const L = (xx, vv) => lagrangian(unflat(xx), unflat(vv), sigma);
  // Hessian in V by central second differences
  const Hc = hessianH(X, sigma); let errH = 0;
  for (let a = 0; a < n; a++) for (let b = 0; b < n; b++) {
    const vpp = v.slice(), vpm = v.slice(), vmp = v.slice(), vmm = v.slice();
    vpp[a] += h; vpp[b] += h; vpm[a] += h; vpm[b] -= h; vmp[a] -= h; vmp[b] += h; vmm[a] -= h; vmm[b] -= h;
    const num = (L(x, vpp) - L(x, vpm) - L(x, vmp) + L(x, vmm)) / (4 * h * h);
    errH = Math.max(errH, Math.abs(num - Hc[a][b]));
  }
  // G = dL/dX - (d^2L/dVdX) V
  const Gc = vectorG(X, V, sigma); let errG = 0;
  for (let a = 0; a < n; a++) {
    const xp = x.slice(), xm = x.slice(); xp[a] += h; xm[a] -= h;
    const dLdx = (L(xp, v) - L(xm, v)) / (2 * h);
    let mixed = 0;
    const va_p = v.slice(), va_m = v.slice(); va_p[a] += h; va_m[a] -= h;
    for (let b = 0; b < n; b++) {
      const xbp = x.slice(), xbm = x.slice(); xbp[b] += h; xbm[b] -= h;
      // d^2 L / (dv_a dx_b), contracted with v_b
      const d = ((L(xbp, va_p) - L(xbp, va_m)) - (L(xbm, va_p) - L(xbm, va_m))) / (4 * h * h);
      mixed += d * v[b];
    }
    errG = Math.max(errG, Math.abs(dLdx - mixed - Gc[a]));
  }
  return { N, sigma: sigmaSign, maxAbsErrH: errH, maxAbsErrG: errG, scaleG: Math.max(...Gc.map(Math.abs)) };
}
const results = { fdChecks: [fdCheck(2, -1), fdCheck(2, 1), fdCheck(3, -1), fdCheck(3, 1)] };

// 2. circle residual, full N = 2 equations, sigma = -1
function circleState(r0, t = 0) {
  const c = circle(r0, true); const w = c.angularRate; const rho = r0 / 2;
  const X = [[rho * Math.cos(w * t), rho * Math.sin(w * t), 0], [-rho * Math.cos(w * t), -rho * Math.sin(w * t), 0]];
  const V = [[-rho * w * Math.sin(w * t), rho * w * Math.cos(w * t), 0], [rho * w * Math.sin(w * t), -rho * w * Math.cos(w * t), 0]];
  const Aexact = [[-rho * w * w * Math.cos(w * t), -rho * w * w * Math.sin(w * t), 0], [rho * w * w * Math.cos(w * t), rho * w * w * Math.sin(w * t), 0]];
  return { X, V, Aexact: flat(Aexact), c };
}
results.circleResiduals = [25, 100, 400, 0.3].map((r0) => {
  const { X, V, Aexact } = circleState(r0, 0.37); const sigma = () => -1;
  const H = hessianH(X, sigma), G = vectorG(X, V, sigma);
  const HA = H.map((row) => row.reduce((s, hij, j) => s + hij * Aexact[j], 0));
  const res = Math.max(...HA.map((hi, i) => Math.abs(hi - G[i]))); const scale = Math.max(...G.map(Math.abs));
  return { r0, maxResidual: res, scale, relative: res / scale };
});
// control: the zero-coupling circle fails the full equations (sanity, shows the residual is not trivially zero)
{ const r0 = 100; const c0 = circle(r0, false); const w = c0.angularRate; const rho = r0 / 2;
  const X = [[rho, 0, 0], [-rho, 0, 0]], V = [[0, rho * w, 0], [0, -rho * w, 0]]; const Aex = [-rho * w * w, 0, 0, rho * w * w, 0, 0];
  const sigma = () => -1; const H = hessianH(X, sigma), G = vectorG(X, V, sigma);
  const HA = H.map((row) => row.reduce((s, hij, j) => s + hij * Aex[j], 0));
  results.zeroCouplingCircleInCoupledLaw_residual = Math.max(...HA.map((hi, i) => Math.abs(hi - G[i]))); }

// 3. invariants: dE/dT, dP/dT, dJ/dT along the flow at random states (N = 2 and 3)
function invariants(X, V, sigmaSign) {
  const sigma = () => sigmaSign; const N = X.length; const x = flat(X), v = flat(V);
  const H = hessianH(X, sigma); const p = H.map((row) => row.reduce((s, hij, j) => s + hij * v[j], 0));
  const E = p.reduce((s, pi, i) => s + pi * v[i], 0) - lagrangian(X, V, sigma);
  const P = [0, 0, 0]; const J = [0, 0, 0];
  for (let i = 0; i < N; i++) { for (let a = 0; a < 3; a++) P[a] += p[3 * i + a];
    const xi = X[i], pi = [p[3 * i], p[3 * i + 1], p[3 * i + 2]];
    J[0] += xi[1] * pi[2] - xi[2] * pi[1]; J[1] += xi[2] * pi[0] - xi[0] * pi[2]; J[2] += xi[0] * pi[1] - xi[1] * pi[0]; }
  return { E, P, J };
}
function invariantRates(N, sigmaSign) {
  const X = Array.from({ length: N }, () => [3 * rnd() + 2 * (rnd() > 0 ? 1 : -1), 3 * rnd(), 3 * rnd()]);
  const V = Array.from({ length: N }, () => [0.3 * rnd(), 0.3 * rnd(), 0.3 * rnd()]);
  const sigma = () => sigmaSign; const A = unflat(solve(hessianH(X, sigma), vectorG(X, V, sigma)));
  const dt = 1e-4; // Taylor step forward and backward using exact A at the state (second-order accurate in the state, so rates are O(dt^2))
  const step = (s) => invariants(X.map((xi, i) => xi.map((c, a) => c + s * V[i][a] + 0.5 * s * s * A[i][a])), V.map((vi, i) => vi.map((c, a) => c + s * A[i][a])), sigmaSign);
  const ip = step(dt), im = step(-dt);
  return { N, sigma: sigmaSign, dEdT: (ip.E - im.E) / (2 * dt), dPdT: ip.P.map((c, a) => (c - im.P[a]) / (2 * dt)), dJdT: ip.J.map((c, a) => (c - im.J[a]) / (2 * dt)), Escale: Math.abs(ip.E) };
}
results.invariantRates = [invariantRates(2, -1), invariantRates(3, 1), invariantRates(3, -1)];

// 4. zero-velocity mirror solve
results.zeroVelocitySolve = [-1, 1].flatMap((s) => [100, 20, 2].map((r) => {
  const X = [[r / 2, 0, 0], [-r / 2, 0, 0]], V = [[0, 0, 0], [0, 0, 0]]; const sigma = () => s;
  const A = solve(hessianH(X, sigma), vectorG(X, V, sigma));
  return { sigma: s, r, A1x: A[0], inverseSquare: s / (r * r), ratio: A[0] / (s / (r * r)), predictedRatio: 1 / (1 - s / r) };
}));

// 5. rotating-frame linearization about the circle (sigma = -1).  State (Y, W), 12-dim.
function rotatingField(state, Om, sigma) {
  const Y = unflat(state.slice(0, 6)), W = unflat(state.slice(6, 12));
  const cross = (o, y) => [-o * y[1], o * y[0], 0];
  const V = Y.map((y, i) => W[i].map((c, a) => c + cross(Om, y)[a]));
  const A = unflat(solve(hessianH(Y, sigma), vectorG(Y, V, sigma)));
  const Ydd = A.map((ai, i) => ai.map((c, a) => c - 2 * cross(Om, W[i])[a] - cross(Om, cross(Om, Y[i]))[a]));
  return [...flat(W), ...flat(Ydd)];
}
function jacobian(f, s0, eps = 1e-6) {
  const n = s0.length; const J = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let j = 0; j < n; j++) { const sp = s0.slice(), sm = s0.slice(); sp[j] += eps; sm[j] -= eps; const fp = f(sp), fm = f(sm); for (let i = 0; i < n; i++) J[i][j] = (fp[i] - fm[i]) / (2 * eps); }
  return J;
}
function charPoly(M) { // Faddeev-LeVerrier, returns coefficients c[0..n] of lambda^n + c1 lambda^{n-1} + ...
  const n = M.length; let Mk = M.map((r) => r.slice()); const c = [1]; let Ak = M.map((r) => r.slice());
  const mul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, _, k) => s + A[i][k] * B[k][j], 0)));
  for (let k = 1; k <= n; k++) {
    if (k > 1) { Ak = mul(M, Mk); }
    const tr = Ak.reduce((s, row, i) => s + row[i], 0); const ck = -tr / k; c.push(ck);
    Mk = Ak.map((row, i) => row.map((v, j) => v + (i === j ? ck : 0)));
  }
  return c;
}
function rootsDK(c) { // Durand-Kerner on monic polynomial with complex arithmetic
  const n = c.length - 1; let z = Array.from({ length: n }, (_, k) => [Math.cos(2 * Math.PI * k / n + 0.4) * 0.9, Math.sin(2 * Math.PI * k / n + 0.4) * 0.9]);
  const cm = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]]; const cd = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const pev = (x) => { let r = [1, 0]; for (let k = 1; k <= n; k++) r = [cm(r, x)[0] + c[k], cm(r, x)[1]]; return r; };
  for (let it = 0; it < 2000; it++) {
    const nz = z.map((zi, i) => { let den = [1, 0]; z.forEach((zj, j) => { if (j !== i) den = cm(den, [zi[0] - zj[0], zi[1] - zj[1]]); }); const q = cd(pev(zi), den); return [zi[0] - q[0], zi[1] - q[1]]; });
    let d = 0; nz.forEach((v, i) => { d = Math.max(d, Math.hypot(v[0] - z[i][0], v[1] - z[i][1])); }); z = nz; if (d < 1e-15) break;
  }
  return z;
}
function restrict(J, basis) { // basis: array of orthonormal column vectors; returns B^T J B
  const JB = basis.map((b) => J.map((row) => row.reduce((s, v, j) => s + v * b[j], 0)));
  return basis.map((bi) => JB.map((jb) => jb.reduce((s, v, k) => s + v * bi[k], 0)));
}
function unitvec(idx) { const v = new Array(12).fill(0); idx.forEach(([i, c]) => { v[i] = c; }); const nn = Math.hypot(...v); return v.map((x) => x / nn); }
results.rotatingFrameLinearization = [100, 25].map((r0) => {
  const c = circle(r0, true); const Om = c.angularRate; const sigma = () => -1;
  const s0 = [r0 / 2, 0, 0, -r0 / 2, 0, 0, 0, 0, 0, 0, 0, 0];
  const f0 = rotatingField(s0, Om, sigma); const J = jacobian((s) => rotatingField(s, Om, sigma), s0);
  const q = Math.SQRT1_2;
  // relative (mirror) subspace: member 2 = - member 1 ; common: member 2 = + member 1
  const blocks = {
    relativeInPlane: [unitvec([[0, q], [3, -q]]), unitvec([[1, q], [4, -q]]), unitvec([[6, q], [9, -q]]), unitvec([[7, q], [10, -q]])],
    relativeOutOfPlane: [unitvec([[2, q], [5, -q]]), unitvec([[8, q], [11, -q]])],
    commonInPlane: [unitvec([[0, q], [3, q]]), unitvec([[1, q], [4, q]]), unitvec([[6, q], [9, q]]), unitvec([[7, q], [10, q]])],
    commonOutOfPlane: [unitvec([[2, q], [5, q]]), unitvec([[8, q], [11, q]])],
  };
  const out = { r0, Omega: Om, radialFrequencyClosed: c.radialFrequency, equilibriumResidual: Math.max(...f0.map(Math.abs)) };
  // check invariance of each block: norm of J B minus B (B^T J B)
  for (const [name, B] of Object.entries(blocks)) {
    const R = restrict(J, B); const ev = rootsDK(charPoly(R));
    out[name] = ev.map(([re, im]) => ({ re: Number(re.toPrecision(8)), im: Number(im.toPrecision(8)) }));
    let leak = 0; B.forEach((b, k) => { const Jb = J.map((row) => row.reduce((s, v, j) => s + v * b[j], 0)); const proj = Jb.map((_, i) => B.reduce((s, bb, m) => s + bb[i] * R[m][k], 0)); leak = Math.max(leak, ...Jb.map((v, i) => Math.abs(v - proj[i]))); });
    out[name + '_offBlockLeak'] = leak;
  }
  return out;
});

console.log(JSON.stringify(results, (k, v) => (typeof v === 'number' ? Number(v.toPrecision(10)) : v), 2));
