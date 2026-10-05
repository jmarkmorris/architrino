// Independent numerical spot checks of the algebraic identities stated in
// reference/priorities/master-equation-closure/binary-research/analysis/weber-overnight-investigation.md
// Node v22, no packages. c_f = 1 throughout (AGENTS.md); K varied to test coupling dependence.
// Every matrix here is assembled from the boxed law itself (an affine residual map), not from the
// closed-form matrix it is compared with.
// Run: node .tmp/weber-overnight/reduction/checks.mjs

const C = 1; // c_f
let seed = 20261005;
const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
const U = (a, b) => a + (b - a) * rnd();
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const sub = (a, b) => a.map((x, i) => x - b[i]);
const add = (a, b) => a.map((x, i) => x + b[i]);
const scl = (s, a) => a.map(x => s * x);
const norm = a => Math.sqrt(dot(a, a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const rvec = (s = 1) => [U(-s, s), U(-s, s), U(-s, s)];

function luSolveDet(Ain, bin) {
  const n = Ain.length; const A = Ain.map(r => r.slice()); const b = bin ? bin.slice() : null;
  let det = 1;
  for (let k = 0; k < n; k++) {
    let p = k; for (let i = k + 1; i < n; i++) if (Math.abs(A[i][k]) > Math.abs(A[p][k])) p = i;
    if (p !== k) { [A[p], A[k]] = [A[k], A[p]]; if (b) [b[p], b[k]] = [b[k], b[p]]; det = -det; }
    det *= A[k][k];
    for (let i = k + 1; i < n; i++) { const m = A[i][k] / A[k][k]; for (let j = k; j < n; j++) A[i][j] -= m * A[k][j]; if (b) b[i] -= m * b[k]; }
  }
  let x = null;
  if (b) { x = new Array(n).fill(0); for (let i = n - 1; i >= 0; i--) { let s = b[i]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; } }
  return { det, x };
}

let worst = {};
const rec = (name, err) => { worst[name] = Math.max(worst[name] ?? 0, Math.abs(err)); };

// ---------- law (N members) ----------
// pair contribution to member i from j, given trial accelerations Acc (array of 3-vectors)
function lawAccel(X, V, Acc, sig, K, lam, mu) {
  const N = X.length; const out = X.map(() => [0, 0, 0]);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const d = sub(X[i], X[j]); const r = norm(d); const e = scl(1 / r, d);
    const w = sub(V[i], V[j]); const rd = dot(e, w);
    const rdd = (dot(w, w) - rd * rd) / r + dot(e, sub(Acc[i], Acc[j]));
    const s = sig[i][j] * K / (r * r) * (1 + lam * rd * rd / (C * C) + mu * r * rdd / (C * C));
    out[i] = add(out[i], scl(s, e));
  }
  return out;
}
// assemble M, b from residual R(a) = a - law(a) = M a - b
function assemble(X, V, sig, K, lam, mu) {
  const N = X.length, n = 3 * N;
  const unflat = a => Array.from({ length: N }, (_, i) => a.slice(3 * i, 3 * i + 3));
  const R = a => { const L = lawAccel(X, V, unflat(a), sig, K, lam, mu).flat(); return a.map((x, k) => x - L[k]); };
  const z = new Array(n).fill(0); const R0 = R(z);
  const M = Array.from({ length: n }, () => new Array(n).fill(0));
  for (let k = 0; k < n; k++) { const ek = z.slice(); ek[k] = 1; const Rk = R(ek); for (let i = 0; i < n; i++) M[i][k] = Rk[i] - R0[i]; }
  return { M, b: R0.map(x => -x), unflat };
}

// ---------- Check A: present-separation derivatives by finite differences ----------
for (let t = 0; t < 20; t++) {
  const c1 = [rvec(), rvec(), rvec()], c2 = [rvec(), rvec(), rvec()];
  const om = [U(0.5, 2), U(0.5, 2), U(0.5, 2)];
  const P = (cf, tt) => [0, 1, 2].map(k => cf[0][k] + cf[1][k] * Math.sin(om[k] * tt) + cf[2][k] * tt * tt);
  const Pd = (cf, tt) => [0, 1, 2].map(k => cf[1][k] * om[k] * Math.cos(om[k] * tt) + 2 * cf[2][k] * tt);
  const Pdd = (cf, tt) => [0, 1, 2].map(k => -cf[1][k] * om[k] * om[k] * Math.sin(om[k] * tt) + 2 * cf[2][k]);
  const T0 = U(0, 1), h = 1e-4;
  const rr = tt => norm(sub(P(c1, tt), P(c2, tt)));
  const rdFD = (rr(T0 + h) - rr(T0 - h)) / (2 * h);
  const rddFD = (rr(T0 + h) - 2 * rr(T0) + rr(T0 - h)) / (h * h);
  const d = sub(P(c1, T0), P(c2, T0)), r = norm(d), e = scl(1 / r, d);
  const w = sub(Pd(c1, T0), Pd(c2, T0)); const rd = dot(e, w);
  const rdd = (dot(w, w) - rd * rd) / r + dot(e, sub(Pdd(c1, T0), Pdd(c2, T0)));
  rec('A1 rdot formula vs FD (abs)', rdFD - rd); rec('A2 rddot formula vs FD (abs)', rddFD - rdd);
}

// ---------- Check B,C,D: pair solve, determinant, radiality, reduced radial equation, first integrals ----------
for (let t = 0; t < 400; t++) {
  const K = U(0.2, 3), sigma = rnd() < 0.5 ? -1 : 1;
  const frozen = t % 2 === 0; const lam = frozen ? -0.5 : U(-1, 1), mu = frozen ? 1 : U(-1.5, 1.5);
  const a = 2 * sigma * K * mu / (C * C);
  let r = U(0.05, 6); if (Math.abs(r - a) < 0.05) r += 0.2;
  const X = [rvec(2), rvec(2)]; const dir = rvec(); const e0 = scl(1 / norm(dir), dir);
  X[1] = sub(X[0], scl(r, e0));
  const V = [rvec(1.2), rvec(1.2)];
  const sig = [[0, sigma], [sigma, 0]];
  const { M, b } = assemble(X, V, sig, K, lam, mu);
  const { det, x } = luSolveDet(M, b);
  const detForm = 1 - 2 * sigma * K * mu / (C * C * r);
  rec('B1 det(6x6 from law) vs 1-2 sigma K mu/(c^2 r) (rel)', (det - detForm) / Math.abs(detForm));
  const e = scl(1 / r, sub(X[0], X[1])); const w = sub(V[0], V[1]); const rd = dot(e, w);
  const h2 = dot(w, w) - rd * rd; const hvec = cross(scl(r, e), w); const hh = norm(hvec);
  const A1 = x.slice(0, 3), A2 = x.slice(3, 6);
  const f = sigma * K * (1 + lam * rd * rd / (C * C) + mu * (h2) / (C * C)) / (r * (r - a));
  const scale = Math.abs(f) + 1e-12;
  rec('B2 A1 = f e (rel)', norm(sub(A1, scl(f, e))) / scale);
  rec('B3 A2 = -f e (rel)', norm(add(A2, scl(f, e))) / scale);
  // residual of the law at the solution
  const L = lawAccel(X, V, [A1, A2], sig, K, lam, mu);
  rec('B4 law residual at solution (rel)', (norm(sub(L[0], A1)) + norm(sub(L[1], A2))) / scale);
  // reduced radial equation
  const rddSolve = h2 / r + dot(e, sub(A1, A2));
  const hsq = hh * hh;
  const rddForm = (hsq + 2 * sigma * K * r + 2 * sigma * K * lam * r * rd * rd / (C * C)) / (r * r * (r - a));
  rec('C1 reduced rddot formula vs full solve (rel)', (rddSolve - rddForm) / (Math.abs(rddForm) + 1e-12));
  // first integrals along the reduced flow (partial derivatives by FD)
  const rddF = (rr, rdv) => (hsq + 2 * sigma * K * rr + 2 * sigma * K * lam * rr * rdv * rdv / (C * C)) / (rr * rr * (rr - a));
  const dd = 1e-6;
  if (frozen) {
    const k = 2 * K, kap = k / (C * C);
    const eps = (rr, rdv) => 0.5 * (1 - sigma * kap / rr) * rdv * rdv + hsq / (2 * rr * rr) + sigma * k / rr;
    const de = (eps(r + dd, rd) - eps(r - dd, rd)) / (2 * dd) * rd + (eps(r, rd + dd) - eps(r, rd - dd)) / (2 * dd) * rddSolve;
    const sc = Math.abs((eps(r + dd, rd) - eps(r - dd, rd)) / (2 * dd) * rd) + 1e-9;
    rec('D1 d(epsilon)/dt along flow, frozen (rel to one term)', de / sc);
    // epsilon equals 2 * [ (|V1|^2+|V2|^2)/2 + sigma K/r (1 - rdot^2/2c^2) ] minus centre-of-velocity part
    const Vc = scl(0.5, add(V[0], V[1]));
    const Etot = 0.5 * (dot(V[0], V[0]) + dot(V[1], V[1])) + sigma * K / r * (1 - rd * rd / (2 * C * C));
    rec('D2 epsilon = 2(E_tot - |Vc|^2) (abs)', eps(r, rd) - 2 * (Etot - dot(Vc, Vc)));
  } else {
    // general (lambda, mu): integrating factor I = |1-a/r|^(-2 lam/mu), identity d/dt(I rdot^2) = 2 I A rdot
    const I = rr => Math.pow(Math.abs(1 - a / rr), -2 * lam / mu);
    const Afun = rr => (hsq + 2 * sigma * K * rr) / (rr * rr * (rr - a));
    const Ip = (I(r + dd) - I(r - dd)) / (2 * dd);
    const lhs = Ip * rd * rd * rd + 2 * I(r) * rd * rddF(r, rd); const rhs = 2 * I(r) * Afun(r) * rd;
    rec('D3 d/dt(I rdot^2) = 2 I A rdot, general (rel)', (lhs - rhs) / (Math.abs(rhs) + Math.abs(lhs) + 1e-12));
    // radial (h=0) closed-form invariant (1+lam rdot^2/c^2)|1-a/r|^(-2lam/mu)
    const rdd0 = (rr, rdv) => (2 * sigma * K * rr + 2 * sigma * K * lam * rr * rdv * rdv / (C * C)) / (rr * rr * (rr - a));
    const Q = (rr, rdv) => (1 + lam * rdv * rdv / (C * C)) * Math.pow(Math.abs(1 - a / rr), -2 * lam / mu);
    const dQ = (Q(r + dd, rd) - Q(r - dd, rd)) / (2 * dd) * rd + (Q(r, rd + dd) - Q(r, rd - dd)) / (2 * dd) * rdd0(r, rd);
    const scQ = Math.abs((Q(r + dd, rd) - Q(r - dd, rd)) / (2 * dd) * rd) + 1e-9;
    rec('D4 radial invariant (1+lam rdot^2)|1-a/r|^(-2lam/mu) conserved, general (rel)', dQ / scQ);
  }
}

// ---------- Check E: N = 4 general matrix, Sylvester determinant, invariants, Euler-Lagrange ----------
for (let t = 0; t < 60; t++) {
  const N = 4, K = U(0.3, 2); const frozen = t % 3 !== 2; const lam = frozen ? -0.5 : -0.3, mu = 1;
  const q = Array.from({ length: N }, () => (rnd() < 0.5 ? -1 : 1));
  const sig = q.map(a => q.map(b => a * b));
  const X = Array.from({ length: N }, () => rvec(4)); const V = Array.from({ length: N }, () => rvec(0.8));
  const { M, b, unflat } = assemble(X, V, sig, K, lam, mu);
  // closed-form M = I - sum alpha u u^T, alpha_ij = sigma K mu/(c^2 r)
  const n = 3 * N; const Mf = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)));
  const pairs = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) pairs.push([i, j]);
  const us = [], al = [];
  for (const [i, j] of pairs) {
    const d = sub(X[i], X[j]); const r = norm(d); const e = scl(1 / r, d);
    const u = new Array(n).fill(0); for (let k = 0; k < 3; k++) { u[3 * i + k] = e[k]; u[3 * j + k] = -e[k]; }
    const alpha = sig[i][j] * K * mu / (C * C * r); us.push(u); al.push(alpha);
    for (let p = 0; p < n; p++) for (let s = 0; s < n; s++) Mf[p][s] -= alpha * u[p] * u[s];
  }
  let md = 0; for (let p = 0; p < n; p++) for (let s = 0; s < n; s++) md = Math.max(md, Math.abs(M[p][s] - Mf[p][s]));
  rec('E1 N=4 M from law vs I - sum alpha u u^T (abs)', md);
  const P = pairs.length; const S = Array.from({ length: P }, (_, a) => Array.from({ length: P }, (_, c) => (a === c ? 1 : 0) - al[a] * dot(us[a], us[c])));
  const dM = luSolveDet(M).det, dS = luSolveDet(S).det;
  rec('E2 det M = det(I_P - D G) (rel)', (dM - dS) / Math.abs(dS));
  const { x } = luSolveDet(M, b); const A = unflat(x);
  let sumA = [0, 0, 0], torque = [0, 0, 0]; for (let i = 0; i < N; i++) { sumA = add(sumA, A[i]); torque = add(torque, cross(X[i], A[i])); }
  const asc = A.reduce((s, a) => s + norm(a), 0);
  rec('E3 sum A_i = 0 (rel)', norm(sumA) / asc); rec('E4 sum X_i x A_i = 0 (rel)', norm(torque) / (asc * 4));
  // energy-like function E = sum |V|^2/2 + sum sigma K/r (1 - rdot^2/(2c^2)); dE/dt
  let dE = 0, scE = 0;
  for (let i = 0; i < N; i++) { dE += dot(V[i], A[i]); scE += Math.abs(dot(V[i], A[i])); }
  for (const [i, j] of pairs) {
    const d = sub(X[i], X[j]); const r = norm(d); const e = scl(1 / r, d); const w = sub(V[i], V[j]); const rd = dot(e, w);
    const rdd = (dot(w, w) - rd * rd) / r + dot(e, sub(A[i], A[j]));
    const term = sig[i][j] * K * (-rd / (r * r) * (1 - rd * rd / (2 * C * C)) - rd * rdd / (r * C * C));
    dE += term; scE += Math.abs(term);
  }
  if (frozen) rec('E5 dE/dt = 0 for N=4, frozen (rel)', dE / scE); else { const key = 'E6 min over trials of |dE/dt| rel at lambda=-0.3 (expected NONZERO)'; worst[key] = Math.min(worst[key] ?? 1e9, Math.abs(dE / scE)); }
  if (frozen) {
    // Lagrangian L = sum |V|^2/2 - sum sigma K/r (1 + rdot^2/(2c^2)); velocity Hessian equals M; EL residual vanishes
    const Lag = (Xf, Vf) => { const XX = unflat(Xf), VV = unflat(Vf); let L = 0; for (let i = 0; i < N; i++) L += 0.5 * dot(VV[i], VV[i]);
      for (const [i, j] of pairs) { const d = sub(XX[i], XX[j]); const r = norm(d); const e = scl(1 / r, d); const rd = dot(e, sub(VV[i], VV[j])); L -= sig[i][j] * K / r * (1 + rd * rd / (2 * C * C)); } return L; };
    const Xf = X.flat(), Vf = V.flat(); const hs = 1e-4;
    const d2 = (fa, fb, p, s, which) => { // mixed second derivative
      const sh = (vec, k, dv) => { const c = vec.slice(); c[k] += dv; return c; };
      if (which === 'VV') return (Lag(Xf, sh(sh(Vf, p, hs), s, hs)) - Lag(Xf, sh(sh(Vf, p, hs), s, -hs)) - Lag(Xf, sh(sh(Vf, p, -hs), s, hs)) + Lag(Xf, sh(sh(Vf, p, -hs), s, -hs))) / (4 * hs * hs);
      return (Lag(sh(Xf, s, hs), sh(Vf, p, hs)) - Lag(sh(Xf, s, -hs), sh(Vf, p, hs)) - Lag(sh(Xf, s, hs), sh(Vf, p, -hs)) + Lag(sh(Xf, s, -hs), sh(Vf, p, -hs))) / (4 * hs * hs);
    };
    let hd = 0, elr = 0, elsc = 0;
    for (let p = 0; p < n; p++) {
      let lhs = 0;
      for (let s = 0; s < n; s++) { const H = d2(null, null, p, s, 'VV'); hd = Math.max(hd, Math.abs(H - M[p][s])); lhs += H * x[s] + d2(null, null, p, s, 'VX') * Vf[s]; }
      const sh = (vec, k, dv) => { const c = vec.slice(); c[k] += dv; return c; };
      const dLdX = (Lag(sh(Xf, p, hs), Vf) - Lag(sh(Xf, p, -hs), Vf)) / (2 * hs);
      elr = Math.max(elr, Math.abs(lhs - dLdX)); elsc = Math.max(elsc, Math.abs(dLdX) + Math.abs(lhs));
    }
    rec('E7 velocity Hessian of L = M (abs, FD h=1e-4)', hd); rec('E8 Euler-Lagrange residual (rel, FD)', elr / elsc);
  }
}

// ---------- Check F: linear radial frequency about circular histories ----------
for (let t = 0; t < 50; t++) {
  const K = U(0.2, 3), mu = U(0, 2), lam = U(-1, 1), sigma = -1, k = 2 * K;
  const r0 = U(0.1, 10); const h = Math.sqrt(k * r0); const a = 2 * sigma * K * mu / (C * C);
  const rdd = (rr, rdv) => (h * h + 2 * sigma * K * rr + 2 * sigma * K * lam * rr * rdv * rdv / (C * C)) / (rr * rr * (rr - a));
  rec('F0 circular balance rddot(r0,0)=0 (abs)', rdd(r0, 0));
  const dd = 1e-6 * r0; const Ap = (rdd(r0 + dd, 0) - rdd(r0 - dd, 0)) / (2 * dd);
  const Om2 = k / r0 ** 3; const pred = -Om2 / (1 + mu * k / (C * C * r0));
  rec('F1 dA/dr at r0 = -Omega^2/(1+mu k/(c^2 r0)) (rel)', (Ap - pred) / Math.abs(pred));
}

// ---------- Check G: radial (h=0) shifted-Kepler form, frozen ----------
for (let t = 0; t < 200; t++) {
  const K = U(0.2, 3), sigma = rnd() < 0.5 ? -1 : 1, k = 2 * K, kap = k / (C * C);
  let r = U(0.05, 8); if (Math.abs(r - sigma * kap) < 0.05) r += 0.2; const rd = U(-3, 3);
  const a = sigma * kap; const rdd = 2 * sigma * K * (1 - rd * rd / (2 * C * C)) / (r * (r - a));
  const eps = 0.5 * (1 - sigma * kap / r) * rd * rd + sigma * k / r;
  const pred = -sigma * k * (eps - C * C) / (C * C * (r - sigma * kap) ** 2);
  rec('G1 radial rddot = -sigma k (eps-c^2)/(c^2 (r - sigma kappa)^2) (rel)', (rdd - pred) / (Math.abs(pred) + 1e-12));
  // equality-crossing radius r_x = sigma k/(2c^2 - eps) satisfies rdot^2 = 4c^2 on the same level
  const rx = sigma * k / (2 * C * C - eps);
  if (rx > 0 && Math.abs(rx - a) > 1e-3) { const rd2 = 2 * (eps - sigma * k / rx) / (1 - sigma * kap / rx); rec('G2 rdot^2(r_x) = 4c^2 on level (rel)', (rd2 - 4 * C * C) / 4); }
}

// ---------- Check H: individual speed maximal at pericentre for bound opposite-polarity histories ----------
for (let t = 0; t < 200; t++) {
  const K = U(0.2, 3), k = 2 * K, kap = k / (C * C); const h = U(0.1, 5);
  const eps = -U(0.001, 0.999) * k * k / (2 * h * h);
  const up = (k + Math.sqrt(k * k + 2 * eps * h * h)) / (h * h); const ua = (k - Math.sqrt(k * k + 2 * eps * h * h)) / (h * h);
  const f = u => (2 * eps + 2 * k * u + kap * h * h * u ** 3) / (1 + kap * u);
  let mx = -1, arg = 0; for (let s = 0; s <= 2000; s++) { const u = ua + (up - ua) * s / 2000; if (f(u) > mx) { mx = f(u); arg = s; } }
  rec('H1 argmax of |w|^2 over [u_a,u_p] is u_p (grid index deficit)', 2000 - arg);
  rec('H2 |w|^2(u_p) = (h u_p)^2 (rel)', (f(up) - (h * up) ** 2) / (h * up) ** 2);
}

// ---------- Check I: radial infall from rest, contact time closed form vs quadrature ----------
const quadInfall = (r0, k, kap, n = 4000) => { // t = int_0^{pi/2} 2 r0 sin(phi) sqrt((r+kap)/(2k)) dphi, r = r0 sin^2 phi (Simpson)
  const g = ph => { const r = r0 * Math.sin(ph) ** 2; return 2 * r0 * Math.sin(ph) * Math.sqrt((r + kap) / (2 * k)); };
  const H = (Math.PI / 2) / n; let s = g(0) + g(Math.PI / 2); for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) * g(i * H); return s * H / 3; };
const tClosed = (r0, k, kap) => Math.sqrt(r0 / (2 * k)) * ((r0 + kap) * Math.atan(Math.sqrt(r0 / kap)) + Math.sqrt(kap * r0));
// known case first: kappa = 0 (zero-coefficient control) must give pi/2 sqrt(r0^3/(2k))
{ const r0 = 4, k = 2; const known = Math.PI / 2 * Math.sqrt(r0 ** 3 / (2 * k)); rec('I0 KNOWN CASE: quadrature(kappa=0) vs pi/2 sqrt(r0^3/2k) (rel)', (quadInfall(r0, k, 0) - known) / known); }
for (let t = 0; t < 50; t++) { const K = U(0.2, 3), k = 2 * K, kap = k / (C * C), r0 = U(0.1, 10); rec('I1 contact time closed form vs quadrature (rel)', (tClosed(r0, k, kap) - quadInfall(r0, k, kap)) / tClosed(r0, k, kap)); }

// ---------- Check J: like polarity, indeterminate point (r = kappa, rdot^2 = 2c^2 + 2h^2/kappa^2) is a saddle of the
// desingularized radial field r' = v (r - kappa) r^2, v' = h^2 + k r - K r v^2/c^2 with eigenvalues +-kappa^2 v* ----------
for (let t = 0; t < 50; t++) {
  const K = U(0.2, 3), k = 2 * K, kap = k / (C * C), h = U(0, 3);
  const vs = (rnd() < 0.5 ? -1 : 1) * Math.sqrt(2 * C * C + 2 * h * h / (kap * kap));
  const F = (r, v) => [v * (r - kap) * r * r, h * h + k * r - K * r * v * v / (C * C)];
  rec('J0 desingularized field vanishes at indeterminate point (abs)', Math.hypot(...F(kap, vs)));
  const d = 1e-6; const Jrr = (F(kap + d, vs)[0] - F(kap - d, vs)[0]) / (2 * d), Jrv = (F(kap, vs + d)[0] - F(kap, vs - d)[0]) / (2 * d);
  const Jvr = (F(kap + d, vs)[1] - F(kap - d, vs)[1]) / (2 * d), Jvv = (F(kap, vs + d)[1] - F(kap, vs - d)[1]) / (2 * d);
  const tr = Jrr + Jvv, det = Jrr * Jvv - Jrv * Jvr; const l1 = tr / 2 + Math.sqrt(tr * tr / 4 - det), l2 = tr / 2 - Math.sqrt(tr * tr / 4 - det);
  const pred = kap * kap * Math.abs(vs); rec('J1 eigenvalues = +-kappa^2 |v*| (rel)', (Math.abs(Math.max(l1, l2) - pred) + Math.abs(Math.min(l1, l2) + pred)) / pred);
}

// ---------- report ----------
console.log('Weber-overnight reduction spot checks (c_f = 1, seeded PRNG ' + 20261005 + ')');
for (const [k, v] of Object.entries(worst)) console.log((k + ' ').padEnd(92, '.') + ' ' + v.toExponential(3));
console.log('E6 well above round-off means the energy function is NOT conserved off lambda = -mu/2, as stated.');
