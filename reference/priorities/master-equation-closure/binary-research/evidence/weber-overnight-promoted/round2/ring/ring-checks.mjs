// Spot checks for the four-member alternating ring under the frozen instantaneous
// Weber-inspired law (lambda_W = -1/2, mu_W = 1, c_f = 1, K = 1, unit weights).
// Node 22 ESM, no packages. Every instrument passes a known case before its target use.
//
// Sections:
//   A  pair law -> affine residual map -> 12x12 matrix M and right side B (assembled from the
//      law, not from the closed form); known case: two members vs det = 1 - a/r.
//   B  M equals the velocity Hessian of the Lagrangian L (finite differences), 4 members.
//   C  Euler-Lagrange residual of L against the law (finite differences), 4 members; dE/dT.
//   D  ring determinant vs closed form, by direct 12x12 LU and by the pair-space (4.8) route.
//   E  balance residual at Omega^2 = (2 sqrt2 - 1) K / (4 rho^3); static ring control.
//   F  rotating-frame linearization: finite-difference Jacobian vs analytic M, 2 Omega J, K;
//      characteristic polynomial vs product of sector polynomials; nonlinear growth check.

const LAM = -0.5, MU = 1.0, CF = 1.0;

// ---------- small linear algebra ----------
function zeros(n, m) { return Array.from({ length: n }, () => new Array(m).fill(0)); }
function matvec(A, x) { return A.map(row => row.reduce((s, v, j) => s + v * x[j], 0)); }
function matmul(A, B) {
  const n = A.length, m = B[0].length, k = B.length; const C = zeros(n, m);
  for (let i = 0; i < n; i++) for (let l = 0; l < k; l++) { const a = A[i][l]; if (a === 0) continue; for (let j = 0; j < m; j++) C[i][j] += a * B[l][j]; }
  return C;
}
function transpose(A) { return A[0].map((_, j) => A.map(r => r[j])); }
function luDet(Ain) { // real determinant with partial pivoting
  const n = Ain.length; const A = Ain.map(r => r.slice()); let det = 1;
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    if (A[p][c] === 0) return 0;
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; det = -det; }
    det *= A[c][c];
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / A[c][c]; for (let j = c; j < n; j++) A[r][j] -= f * A[c][j]; }
  }
  return det;
}
function solve(Ain, bin) {
  const n = Ain.length; const A = Ain.map((r, i) => [...r, bin[i]]);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[p], A[c]] = [A[c], A[p]];
    for (let r = c + 1; r < n; r++) { const f = A[r][c] / A[c][c]; for (let j = c; j <= n; j++) A[r][j] -= f * A[c][j]; }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) { let s = A[i][n]; for (let j = i + 1; j < n; j++) s -= A[i][j] * x[j]; x[i] = s / A[i][i]; }
  return x;
}
// complex determinant (for the characteristic polynomial check)
const cx = (re, im = 0) => ({ re, im });
const cadd = (a, b) => cx(a.re + b.re, a.im + b.im), csub = (a, b) => cx(a.re - b.re, a.im - b.im);
const cmul = (a, b) => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const cdiv = (a, b) => { const d = b.re * b.re + b.im * b.im; return cx((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const cabs = a => Math.hypot(a.re, a.im);
function cluDet(Ain) {
  const n = Ain.length; const A = Ain.map(r => r.map(v => cx(v.re, v.im))); let det = cx(1, 0);
  for (let c = 0; c < n; c++) {
    let p = c; for (let r = c + 1; r < n; r++) if (cabs(A[r][c]) > cabs(A[p][c])) p = r;
    if (cabs(A[p][c]) === 0) return cx(0, 0);
    if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; det = cmul(det, cx(-1, 0)); }
    det = cmul(det, A[c][c]);
    for (let r = c + 1; r < n; r++) { const f = cdiv(A[r][c], A[c][c]); for (let j = c; j < n; j++) A[r][j] = csub(A[r][j], cmul(f, A[c][j])); }
  }
  return det;
}
function maxAbsDiff(A, B) { let m = 0; for (let i = 0; i < A.length; i++) for (let j = 0; j < A[0].length; j++) m = Math.max(m, Math.abs(A[i][j] - B[i][j])); return m; }
function maxAbs(A) { let m = 0; for (const r of A) for (const v of r) m = Math.max(m, Math.abs(v)); return m; }

// ---------- deterministic pseudo-random ----------
let seed = 20261005;
function rnd() { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; }
const rn = () => 2 * rnd() - 1;

// ---------- the law as an affine residual map in the accelerations ----------
// state: X (N x 3), V (N x 3), q (N polarities +-1), K coupling
// Given trial accelerations a (3N), return the law's right side R(a) (3N): member i gets
//   sum_j sigma K / r^2 [1 + LAM rdot^2/cf^2 + MU r rddot(a)/cf^2] e_ij,
// with rddot computed from the kinematic identity using the trial a. The fixed point a = R(a)
// is the implicit solve. R is affine in a: R(a) = R(0) + (I - M) a, so M = I - dR/da.
function pairData(X, V, i, j) {
  const d = [X[i][0] - X[j][0], X[i][1] - X[j][1], X[i][2] - X[j][2]];
  const r = Math.hypot(...d); const e = d.map(v => v / r);
  const w = [V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]];
  const rdot = e[0] * w[0] + e[1] * w[1] + e[2] * w[2];
  const w2 = w[0] * w[0] + w[1] * w[1] + w[2] * w[2];
  return { r, e, rdot, wperp2: w2 - rdot * rdot };
}
function lawRightSide(X, V, q, K, a) {
  const N = X.length; const R = new Array(3 * N).fill(0);
  for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
    if (i === j) continue;
    const { r, e, rdot, wperp2 } = pairData(X, V, i, j);
    const sig = Math.sign(q[i] * q[j]);
    const da = [a[3 * i] - a[3 * j], a[3 * i + 1] - a[3 * j + 1], a[3 * i + 2] - a[3 * j + 2]];
    const rddot = wperp2 / r + (e[0] * da[0] + e[1] * da[1] + e[2] * da[2]);
    const mag = sig * K / (r * r) * (1 + LAM * rdot * rdot / (CF * CF) + MU * r * rddot / (CF * CF));
    for (let c = 0; c < 3; c++) R[3 * i + c] += mag * e[c];
  }
  return R;
}
function assembleFromLaw(X, V, q, K) {
  const n = 3 * X.length; const R0 = lawRightSide(X, V, q, K, new Array(n).fill(0));
  const M = zeros(n, n);
  for (let c = 0; c < n; c++) {
    const ec = new Array(n).fill(0); ec[c] = 1;
    const Rc = lawRightSide(X, V, q, K, ec); // exact (affine), no step error
    for (let rI = 0; rI < n; rI++) M[rI][c] = (rI === c ? 1 : 0) - (Rc[rI] - R0[rI]);
  }
  return { M, B: R0 };
}
// closed-form assembly (4.7): M = I - sum alpha_ij u_ij u_ij^T
function assembleClosed(X, V, q, K) {
  const N = X.length, n = 3 * N; const M = zeros(n, n); for (let i = 0; i < n; i++) M[i][i] = 1;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const { r, e } = pairData(X, V, i, j); const sig = Math.sign(q[i] * q[j]);
    const alpha = sig * K * MU / (CF * CF * r);
    const u = new Array(n).fill(0); for (let c = 0; c < 3; c++) { u[3 * i + c] = e[c]; u[3 * j + c] = -e[c]; }
    for (let p = 0; p < n; p++) for (let s = 0; s < n; s++) M[p][s] -= alpha * u[p] * u[s];
  }
  return M;
}
function accelerations(X, V, q, K) { const { M, B } = assembleFromLaw(X, V, q, K); return { a: solve(M, B), M, detM: luDet(M) }; }

// ---------- Lagrangian ----------
function lagrangian(X, V, q, K) {
  const N = X.length; let L = 0;
  for (let i = 0; i < N; i++) L += 0.5 * (V[i][0] ** 2 + V[i][1] ** 2 + V[i][2] ** 2);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const { r, rdot } = pairData(X, V, i, j); const sig = Math.sign(q[i] * q[j]);
    L -= sig * K / r * (1 + rdot * rdot / (2 * CF * CF));
  }
  return L;
}
function energy(X, V, q, K) {
  const N = X.length; let E = 0;
  for (let i = 0; i < N; i++) E += 0.5 * (V[i][0] ** 2 + V[i][1] ** 2 + V[i][2] ** 2);
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const { r, rdot } = pairData(X, V, i, j); const sig = Math.sign(q[i] * q[j]);
    E += sig * K / r * (1 - rdot * rdot / (2 * CF * CF));
  }
  return E;
}
const flat = X => X.flat();
const unflat = (x, N) => Array.from({ length: N }, (_, i) => [x[3 * i], x[3 * i + 1], x[3 * i + 2]]);

function randomState(N) {
  const X = [], V = [], q = [];
  for (let i = 0; i < N; i++) { X.push([rn(), rn(), rn()].map(v => 2 * v)); V.push([rn(), rn(), rn()].map(v => 0.6 * v)); q.push(i % 2 === 0 ? 1 : -1); }
  return { X, V, q };
}

const report = [];
const log = s => { console.log(s); report.push(s); };

// ================= A: assembly, known case first =================
log('## A. Matrix assembled from the law vs closed form (4.7); known case = two-member determinant 1 - a/r');
{
  let worst = 0;
  for (let t = 0; t < 50; t++) {
    const { X, V, q } = randomState(2); if (t % 2) q[1] = 1; const K = 0.5 + rnd();
    const { M } = assembleFromLaw(X, V, q, K); const { r } = pairData(X, V, 0, 1);
    const a = 2 * Math.sign(q[0] * q[1]) * K * MU / (CF * CF); const expect = 1 - a / r;
    worst = Math.max(worst, Math.abs(luDet(M) - expect) / Math.abs(expect));
  }
  log(`known case passed: two-member det agreement (relative) ${worst.toExponential(2)} over 50 random states, both polarities`);
  let worstM = 0, worstDet = 0;
  for (let t = 0; t < 60; t++) {
    const { X, V, q } = randomState(4); const K = 0.5 + rnd();
    const { M } = assembleFromLaw(X, V, q, K); const Mc = assembleClosed(X, V, q, K);
    worstM = Math.max(worstM, maxAbsDiff(M, Mc));
    worstDet = Math.max(worstDet, Math.abs(luDet(M) - luDet(Mc)) / Math.abs(luDet(Mc)));
  }
  log(`four members, 60 random states: entrywise |M_law - M_closed| max ${worstM.toExponential(2)}, det relative ${worstDet.toExponential(2)}`);
  // velocity independence: same positions, different velocities
  const { X, V, q } = randomState(4); const V2 = V.map(v => v.map(c => c + rn()));
  log(`velocity independence: |M(X,V) - M(X,V')| max ${maxAbsDiff(assembleFromLaw(X, V, q, 1).M, assembleFromLaw(X, V2, q, 1).M).toExponential(2)}`);
}

// ================= B: velocity Hessian of L =================
log('## B. M equals the velocity Hessian of L (central differences, step 1e-4), four members');
{
  let worst = 0; const h = 1e-4;
  for (let t = 0; t < 20; t++) {
    const { X, V, q } = randomState(4); const K = 0.5 + rnd(); const n = 12; const v0 = flat(V);
    const { M } = assembleFromLaw(X, V, q, K); const H = zeros(n, n);
    for (let p = 0; p < n; p++) for (let s = 0; s < n; s++) {
      const f = (dp, ds) => { const v = v0.slice(); v[p] += dp; v[s] += ds; return lagrangian(X, unflat(v, 4), q, K); };
      H[p][s] = (f(h, h) - f(h, -h) - f(-h, h) + f(-h, -h)) / (4 * h * h);
    }
    worst = Math.max(worst, maxAbsDiff(M, H));
  }
  log(`max |M - d2L/dVdV| over 20 states: ${worst.toExponential(2)}`);
}

// ================= C: Euler-Lagrange residual and dE/dT =================
log('## C. Euler-Lagrange residual d/dT(dL/dV) - dL/dX with the solved accelerations; dE/dT; four members');
{
  let worstEL = 0, worstE = 0, worstSumA = 0, worstMom = 0; const h = 1e-4;
  const gradV = (X, V, q, K) => { const v0 = flat(V); return v0.map((_, p) => { const vp = v0.slice(), vm = v0.slice(); vp[p] += h; vm[p] -= h; return (lagrangian(X, unflat(vp, 4), q, K) - lagrangian(X, unflat(vm, 4), q, K)) / (2 * h); }); };
  const gradX = (X, V, q, K) => { const x0 = flat(X); return x0.map((_, p) => { const xp = x0.slice(), xm = x0.slice(); xp[p] += h; xm[p] -= h; return (lagrangian(unflat(xp, 4), V, q, K) - lagrangian(unflat(xm, 4), V, q, K)) / (2 * h); }); };
  for (let t = 0; t < 20; t++) {
    const { X, V, q } = randomState(4); const K = 0.5 + rnd(); const { a } = accelerations(X, V, q, K);
    const x0 = flat(X), v0 = flat(V);
    const adv = s => ({ X: unflat(x0.map((x, i) => x + s * v0[i]), 4), V: unflat(v0.map((v, i) => v + s * a[i]), 4) });
    const sp = adv(h), sm = adv(-h);
    const dp = gradV(sp.X, sp.V, q, K).map((v, i) => (v - gradV(sm.X, sm.V, q, K)[i]) / (2 * h));
    const gx = gradX(X, V, q, K);
    worstEL = Math.max(worstEL, ...dp.map((v, i) => Math.abs(v - gx[i])));
    const dE = (energy(sp.X, sp.V, q, K) - energy(sm.X, sm.V, q, K)) / (2 * h);
    let scale = 0; for (let i = 0; i < 4; i++) scale += Math.hypot(...V[i]) * Math.hypot(a[3 * i], a[3 * i + 1], a[3 * i + 2]);
    worstE = Math.max(worstE, Math.abs(dE) / scale); // scale: natural size of the individual terms of dE/dT
    const sumA = [0, 1, 2].map(c => a[c] + a[3 + c] + a[6 + c] + a[9 + c]);
    worstSumA = Math.max(worstSumA, ...sumA.map(Math.abs));
    let mom = [0, 0, 0]; for (let i = 0; i < 4; i++) { const x = X[i], ai = a.slice(3 * i, 3 * i + 3); mom[0] += x[1] * ai[2] - x[2] * ai[1]; mom[1] += x[2] * ai[0] - x[0] * ai[2]; mom[2] += x[0] * ai[1] - x[1] * ai[0]; }
    worstMom = Math.max(worstMom, ...mom.map(Math.abs));
  }
  log(`EL residual max ${worstEL.toExponential(2)} (second-order central differences, step 1e-4); |dE/dT| / sum_i |V_i||A_i| max ${worstE.toExponential(2)}; |sum of accelerations| max ${worstSumA.toExponential(2)}; |total moment| max ${worstMom.toExponential(2)}`);
}

// ================= ring geometry =================
const SQ2 = Math.SQRT2;
function ringState(rho, Omega, phase = 0) {
  const X = [], V = [], q = [];
  for (let j = 0; j < 4; j++) {
    const th = phase + j * Math.PI / 2;
    X.push([rho * Math.cos(th), rho * Math.sin(th), 0]);
    V.push([-rho * Omega * Math.sin(th), rho * Omega * Math.cos(th), 0]);
    q.push(j % 2 === 0 ? 1 : -1);
  }
  return { X, V, q };
}
const detClosed = x => (1 + (SQ2 - 1) / x) * (1 - 1 / x) * Math.pow(1 + SQ2 / x, 3);
const Omega2Closed = (rho, K) => (2 * SQ2 - 1) * K / (4 * rho ** 3);

// ================= D: ring determinant =================
log('## D. Ring determinant vs closed form (1+(sqrt2-1)/x)(1-1/x)(1+sqrt2/x)^3, K = c_f = 1 so x = rho');
{
  const xs = [0.2, 0.4142, 0.4571, 0.7, 0.999, 1.0, 1.001, 1.5, 2, 3, 10, 100];
  for (const x of xs) {
    const Om = Math.sqrt(Omega2Closed(x, 1)); const phase = rnd() * Math.PI;
    const { X, V, q } = ringState(x, Om, phase); const { M } = assembleFromLaw(X, V, q, 1);
    const d = luDet(M), dc = detClosed(x);
    // pair-space route (4.8): det(I_P - D G)
    const pairs = []; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) pairs.push([i, j]);
    const U = zeros(12, 6), Dm = zeros(6, 6);
    pairs.forEach(([i, j], p) => { const { r, e } = pairData(X, V, i, j); for (let c = 0; c < 3; c++) { U[3 * i + c][p] = e[c]; U[3 * j + c][p] = -e[c]; } Dm[p][p] = Math.sign(q[i] * q[j]) * MU / (CF * CF * r); });
    const G = matmul(transpose(U), U); const IDG = matmul(Dm, G).map((row, i) => row.map((v, j) => (i === j ? 1 : 0) - v));
    const d6 = luDet(IDG);
    log(`x=${x}: det12=${d.toPrecision(10)} closed=${dc.toPrecision(10)} pairspace=${d6.toPrecision(10)} |diff| ${Math.abs(d - dc).toExponential(1)}`);
  }
  // eigenvalue list check via trace and via the quadratic form on the symmetry-adapted modes
  const x = 1.7, Om = Math.sqrt(Omega2Closed(x, 1)); const { X, V, q } = ringState(x, Om); const { M } = assembleFromLaw(X, V, q, 1);
  const tr = M.reduce((s, r, i) => s + r[i], 0); const trClosed = 12 + 2 * (2 * SQ2 - 1) / x;
  log(`x=${x}: trace ${tr.toPrecision(12)} vs closed 12 + 2(2sqrt2-1)/x = ${trClosed.toPrecision(12)}`);
}

// symmetry-adapted real basis for the 12 coordinates: local frames (r_j, t_j, z) and characters
function localFrames(X) { return X.map(p => { const th = Math.atan2(p[1], p[0]); return { r: [Math.cos(th), Math.sin(th), 0], t: [-Math.sin(th), Math.cos(th), 0], z: [0, 0, 1] }; }); }
function modeVector(frames, amps) { // amps: array of 4 of {a,b,c}
  const v = new Array(12).fill(0);
  for (let j = 0; j < 4; j++) for (let c = 0; c < 3; c++) v[3 * j + c] = amps[j].a * frames[j].r[c] + amps[j].b * frames[j].t[c] + amps[j].c * frames[j].z[c];
  return v;
}
function sectorBasis(frames) {
  const cs = j => Math.cos(j * Math.PI / 2), sn = j => Math.sin(j * Math.PI / 2);
  const mk = f => modeVector(frames, [0, 1, 2, 3].map(j => f(j)));
  const nrm = v => { const n = Math.hypot(...v); return v.map(c => c / n); };
  return {
    k0_breathing: nrm(mk(j => ({ a: 1, b: 0, c: 0 }))),
    k0_rotation: nrm(mk(j => ({ a: 0, b: 1, c: 0 }))),
    k0_axial: nrm(mk(j => ({ a: 0, b: 0, c: 1 }))),
    k2_elliptic: nrm(mk(j => ({ a: (-1) ** j, b: 0, c: 0 }))),
    k2_shear: nrm(mk(j => ({ a: 0, b: (-1) ** j, c: 0 }))),
    k2_warp: nrm(mk(j => ({ a: 0, b: 0, c: (-1) ** j }))),
    k1_transX: nrm(mk(j => ({ a: cs(j), b: -sn(j), c: 0 }))),
    k1_transY: nrm(mk(j => ({ a: sn(j), b: cs(j), c: 0 }))),
    k1_sublatX: nrm(mk(j => ({ a: cs(j), b: sn(j), c: 0 }))),
    k1_sublatY: nrm(mk(j => ({ a: sn(j), b: -cs(j), c: 0 }))),
    k1_tiltX: nrm(mk(j => ({ a: 0, b: 0, c: cs(j) }))),
    k1_tiltY: nrm(mk(j => ({ a: 0, b: 0, c: sn(j) }))),
  };
}
{
  log('M eigenvalues on the symmetry-adapted modes (Rayleigh quotients; closed forms 1, 1+(sqrt2-1)/x, 1-1/x, 1+sqrt2/x):');
  const x = 1.7, Om = Math.sqrt(Omega2Closed(x, 1)); const { X, V, q } = ringState(x, Om); const { M } = assembleFromLaw(X, V, q, 1);
  const Bz = sectorBasis(localFrames(X));
  const expect = { k0_breathing: 1 + (SQ2 - 1) / x, k0_rotation: 1, k0_axial: 1, k2_elliptic: 1 - 1 / x, k2_shear: 1 + SQ2 / x, k2_warp: 1, k1_transX: 1, k1_transY: 1, k1_sublatX: 1 + SQ2 / x, k1_sublatY: 1 + SQ2 / x, k1_tiltX: 1, k1_tiltY: 1 };
  let worst = 0;
  for (const [name, v] of Object.entries(Bz)) { const Mv = matvec(M, v); const rq = v.reduce((s, c, i) => s + c * Mv[i], 0); const res = Math.hypot(...Mv.map((c, i) => c - rq * v[i])); worst = Math.max(worst, Math.abs(rq - expect[name]), res); log(`  ${name}: Rayleigh ${rq.toFixed(12)} expected ${expect[name].toFixed(12)} eigen-residual ${res.toExponential(1)}`); }
  log(`  worst deviation ${worst.toExponential(2)}`);
}

// ================= E: balance =================
log('## E. Balance residual at Omega^2 = (2 sqrt2 - 1) K/(4 rho^3); wrong Omega control; static ring');
{
  for (const x of [0.3, 0.4571, 0.8, 1.2, 2.5, 7]) {
    const Om = Math.sqrt(Omega2Closed(x, 1)); const phase = rnd() * Math.PI; const { X, V, q } = ringState(x, Om, phase);
    const { a, M } = accelerations(X, V, q, 1); const target = flat(X).map(c => -Om * Om * c);
    const res = Math.max(...a.map((c, i) => Math.abs(c - target[i])));
    const tang = Math.max(...[0, 1, 2, 3].map(j => { const t = [-Math.sin(phase + j * Math.PI / 2), Math.cos(phase + j * Math.PI / 2)]; return Math.abs(a[3 * j] * t[0] + a[3 * j + 1] * t[1]); }));
    // rddot on every pair with the solved accelerations
    let rdd = 0; for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) { const { r, e, wperp2 } = pairData(X, V, i, j); const da = [0, 1, 2].map(c => a[3 * i + c] - a[3 * j + c]); rdd = Math.max(rdd, Math.abs(wperp2 / r + e[0] * da[0] + e[1] * da[1] + e[2] * da[2])); }
    const Om2 = Om * 1.1; const S2 = ringState(x, Om2, phase); const a2 = accelerations(S2.X, S2.V, S2.q, 1).a; const res2 = Math.max(...a2.map((c, i) => Math.abs(c - (-Om2 * Om2 * flat(S2.X)[i]))));
    log(`x=${x}: |a - (-Omega^2 X)| max ${res.toExponential(1)}; tangential max ${tang.toExponential(1)}; max |rddot| on solved state ${rdd.toExponential(1)}; speed Omega rho = ${(Om * x).toFixed(6)}; det M = ${luDet(M).toFixed(6)}; control with 1.1 Omega: residual ${res2.toExponential(2)}`);
  }
  log(`speed equality Omega rho = c_f at x* = (2 sqrt2 - 1)/4 = ${((2 * SQ2 - 1) / 4).toFixed(10)}; check: speed at x* = ${(Math.sqrt(Omega2Closed((2 * SQ2 - 1) / 4, 1)) * (2 * SQ2 - 1) / 4).toFixed(12)}`);
  for (const x of [0.5, 1.5, 4]) {
    const { X, V, q } = ringState(x, 0); const { a } = accelerations(X, V, q, 1);
    const inv = -(2 * SQ2 - 1) / (4 * x * x); const closed = inv * x / (x + SQ2 - 1);
    const radial = a[0]; // member 0 at (x,0,0): radial component is a_x
    log(`static ring x=${x}: solved radial acceleration ${radial.toPrecision(10)} closed ${closed.toPrecision(10)} (inverse-square value would be ${inv.toPrecision(10)}); tangential ${Math.abs(a[1]).toExponential(1)}`);
  }
}

// ================= F: rotating-frame linearization =================
log('## F. Rotating-frame linearization: M xi\'\' + 2 Omega J xi\' + K xi = 0, K = Hess(U) - Omega^2 Pi');
function Jmat() { const J = zeros(12, 12); for (let j = 0; j < 4; j++) { J[3 * j][3 * j + 1] = -1; J[3 * j + 1][3 * j] = 1; } return J; }
function hessU(X, q, K) { // Hessian of U = sum sigma K / r
  const n = 12; const H = zeros(n, n);
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
    const { r, e } = pairData(X, X, i, j); const sig = Math.sign(q[i] * q[j]); const f = sig * K / r ** 3;
    const blk = zeros(3, 3); for (let p = 0; p < 3; p++) for (let s = 0; s < 3; s++) blk[p][s] = f * (3 * e[p] * e[s] - (p === s ? 1 : 0));
    for (let p = 0; p < 3; p++) for (let s = 0; s < 3; s++) { H[3 * i + p][3 * i + s] += blk[p][s]; H[3 * j + p][3 * j + s] += blk[p][s]; H[3 * i + p][3 * j + s] -= blk[p][s]; H[3 * j + p][3 * i + s] -= blk[p][s]; }
  }
  return H;
}
function rotatingAccel(Y, W, q, K, Om) { // Y, W flat 12; returns Y'' in the rotating frame
  const J = Jmat(); const JY = matvec(J, Y); const Vin = W.map((w, i) => w + Om * JY[i]);
  const a = accelerations(unflat(Y, 4), unflat(Vin, 4), q, K).a; const JW = matvec(J, W);
  return a.map((ai, i) => ai - 2 * Om * JW[i] + Om * Om * (i % 3 === 2 ? 0 : Y[i]));
}
{
  const x = 1.7, K = 1, Om = Math.sqrt(Omega2Closed(x, K)); const { X, q } = ringState(x, Om); const Y0 = flat(X), W0 = new Array(12).fill(0);
  const h = 1e-5; const AY = zeros(12, 12), AW = zeros(12, 12);
  log(`fixed point check: |Y''| at the ring in the rotating frame = ${Math.max(...rotatingAccel(Y0, W0, q, K, Om).map(Math.abs)).toExponential(1)}`);
  for (let c = 0; c < 12; c++) {
    const Yp = Y0.slice(), Ym = Y0.slice(); Yp[c] += h; Ym[c] -= h; const fp = rotatingAccel(Yp, W0, q, K, Om), fm = rotatingAccel(Ym, W0, q, K, Om);
    const Wp = W0.slice(), Wm = W0.slice(); Wp[c] += h; Wm[c] -= h; const gp = rotatingAccel(Y0, Wp, q, K, Om), gm = rotatingAccel(Y0, Wm, q, K, Om);
    for (let r = 0; r < 12; r++) { AY[r][c] = (fp[r] - fm[r]) / (2 * h); AW[r][c] = (gp[r] - gm[r]) / (2 * h); }
  }
  const M = assembleFromLaw(X, ringState(x, Om).V, q, K).M; const Kst = hessU(X, q, K); for (let i = 0; i < 12; i++) if (i % 3 !== 2) Kst[i][i] -= Om * Om;
  const G = Jmat().map(r => r.map(v => 2 * Om * v));
  // analytic: Y'' = -M^{-1}(K Y + G W)  ->  dY''/dY = -M^{-1}K, dY''/dW = -M^{-1}G
  const Minv = zeros(12, 12); for (let c = 0; c < 12; c++) { const e = new Array(12).fill(0); e[c] = 1; const col = solve(M, e); for (let r = 0; r < 12; r++) Minv[r][c] = col[r]; }
  const AYan = matmul(Minv, Kst).map(r => r.map(v => -v)), AWan = matmul(Minv, G).map(r => r.map(v => -v));
  log(`x=${x}: |FD dY''/dY - (-M^-1 K)| max ${maxAbsDiff(AY, AYan).toExponential(2)} (scale ${maxAbs(AYan).toFixed(3)}); |FD dY''/dW - (-M^-1 2 Omega J)| max ${maxAbsDiff(AW, AWan).toExponential(2)} (scale ${maxAbs(AWan).toFixed(3)})`);
  // block structure in the symmetry-adapted basis
  const Bz = sectorBasis(localFrames(X)); const names = Object.keys(Bz); const P = names.map(nm => Bz[nm]);
  const toBasis = A => P.map(u => P.map(v => { const Av = matvec(A, v); return u.reduce((s, c, i) => s + c * Av[i], 0); }));
  const Kb = toBasis(Kst), Mb = toBasis(M), Gb = toBasis(G);
  const sector = nm => nm.slice(0, 2);
  let offK = 0, offM = 0, offG = 0;
  for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) if (sector(names[i]) !== sector(names[j])) { offK = Math.max(offK, Math.abs(Kb[i][j])); offM = Math.max(offM, Math.abs(Mb[i][j])); offG = Math.max(offG, Math.abs(Gb[i][j])); }
  log(`cross-sector entries (k0|k2|k1): K ${offK.toExponential(1)}, M ${offM.toExponential(1)}, 2 Omega J ${offG.toExponential(1)}`);
  log('diagonal K entries in units K/rho^3 (closed forms: breathing -3 Omega^2, rotation 0, axial 0, elliptic 3/4, shear -3 sqrt2/2, warp sqrt2, trans -Omega^2, sublattice (1-4 sqrt2)/4, tilt Omega^2):');
  const unit = K / x ** 3; const Om2u = (2 * SQ2 - 1) / 4;
  const expectK = { k0_breathing: -3 * Om2u, k0_rotation: 0, k0_axial: 0, k2_elliptic: 0.75, k2_shear: -3 * SQ2 / 2, k2_warp: SQ2, k1_transX: -Om2u, k1_transY: -Om2u, k1_sublatX: (1 - 4 * SQ2) / 4, k1_sublatY: (1 - 4 * SQ2) / 4, k1_tiltX: Om2u, k1_tiltY: Om2u };
  let worstK = 0; names.forEach((nm, i) => { worstK = Math.max(worstK, Math.abs(Kb[i][i] / unit - expectK[nm])); log(`  ${nm}: ${(Kb[i][i] / unit).toFixed(12)} expected ${expectK[nm].toFixed(12)}`); });
  // within-sector off-diagonal K entries (should vanish for all listed pairs except none: K is diagonal in this basis)
  let offd = 0; for (let i = 0; i < 12; i++) for (let j = 0; j < 12; j++) if (i !== j) offd = Math.max(offd, Math.abs(Kb[i][j]));
  log(`  worst diagonal deviation ${worstK.toExponential(2)}; largest off-diagonal K entry in this basis ${offd.toExponential(1)}`);

  // characteristic polynomial det(z^2 M + z G + K) vs product of sector polynomials
  const mA = 1 - 1 / x, mB = 1 + SQ2 / x, ma = 1 + (SQ2 - 1) / x, ms = mB;
  const Om2 = Om * Om; const kA = 0.75 * unit, kB = -1.5 * SQ2 * unit, kw = SQ2 * unit, ks = (1 - 4 * SQ2) / 4 * unit;
  const sectorPoly = z => {
    const z2 = cmul(z, z);
    // k0 in-plane: det [[ma z^2 - 3 Om^2, -2 Om z],[2 Om z, z^2]] = z^2 (ma z^2 - 3Om^2) + 4 Om^2 z^2
    const p0 = cadd(cmul(z2, csub(cmul(cx(ma), z2), cx(3 * Om2))), cmul(cx(4 * Om2), z2));
    const p0z = z2; // axial k0: z^2
    // k2 in-plane: (mA z^2 + kA)(mB z^2 + kB) + 4 Om^2 z^2
    const p2 = cadd(cmul(cadd(cmul(cx(mA), z2), cx(kA)), cadd(cmul(cx(mB), z2), cx(kB))), cmul(cx(4 * Om2), z2));
    const p2w = cadd(z2, cx(kw));
    // k1+k3 in-plane: translation (z^2 + Om^2)^2 [from (z - i Om)^2 (z + i Om)^2]; sublattice |ms z^2 + 2 i Om z + ks|^2 -> (ms z^2 + ks)^2 + 4 Om^2 z^2
    const t = cadd(z2, cx(Om2)); const p1t = cmul(t, t);
    const s = cadd(cmul(cx(ms), z2), cx(ks)); const p1s = cadd(cmul(s, s), cmul(cx(4 * Om2), z2));
    const p1tilt = cmul(t, t);
    return [p0, p0z, p2, p2w, p1t, p1s, p1tilt].reduce((acc, p) => cmul(acc, p), cx(1));
  };
  const fullPoly = z => { const A = zeros(12, 12).map((r, i) => r.map((_, j) => { const z2 = cmul(z, z); return cadd(cadd(cmul(z2, cx(M[i][j])), cmul(z, cx(G[i][j]))), cx(Kst[i][j])); })); return cluDet(A); };
  let worstRel = 0;
  for (let t = 0; t < 12; t++) { const z = cx(rn() * 1.5, rn() * 1.5); const f = fullPoly(z), s = sectorPoly(z); worstRel = Math.max(worstRel, cabs(csub(f, s)) / cabs(f)); }
  log(`x=${x}: det(z^2 M + 2 Omega z J + K) vs product of closed-form sector polynomials at 12 random complex z: worst relative difference ${worstRel.toExponential(2)}`);

  // closed-form roots and the growth rate for several x
  log('closed-form spectrum (units: K = c_f = 1, so Omega^2 = (2 sqrt2 - 1)/(4 x^3)); z in units of Omega');
  for (const xx of [0.3, 0.4142, 0.4571, 0.7, 0.95, 1.05, 1.7, 3, 10, 1000]) {
    const u = 1 / xx ** 3, O2 = Om2u * u, O = Math.sqrt(O2);
    const mA_ = 1 - 1 / xx, mB_ = 1 + SQ2 / xx, ma_ = 1 + (SQ2 - 1) / xx;
    const kA_ = 0.75 * u, kB_ = -1.5 * SQ2 * u, ks_ = (1 - 4 * SQ2) / 4 * u;
    // k2 in-plane quadratic in s = z^2
    const qa = mA_ * mB_, qb = mA_ * kB_ + mB_ * kA_ + 4 * O2, qc = kA_ * kB_; const disc = qb * qb - 4 * qa * qc;
    let k2desc;
    if (disc >= 0) { const s1 = (-qb + Math.sqrt(disc)) / (2 * qa), s2 = (-qb - Math.sqrt(disc)) / (2 * qa); const fmt = s => s >= 0 ? `+-${(Math.sqrt(s) / O).toFixed(4)} (real)` : `+-${(Math.sqrt(-s) / O).toFixed(4)}i`; k2desc = `s1=${s1.toExponential(3)} -> z=${fmt(s1)}; s2=${s2.toExponential(3)} -> z=${fmt(s2)}`; }
    else { const re = -qb / (2 * qa), im = Math.sqrt(-disc) / (2 * qa); const mod = Math.hypot(re, im); const zr = Math.sqrt((mod + re) / 2), zi = Math.sqrt((mod - re) / 2); k2desc = `complex s -> z = +-(${(zr / O).toFixed(4)} +- ${(zi / O).toFixed(4)} i)`; }
    const wbr = Math.sqrt(1 / ma_), ww = Math.sqrt(SQ2 * u) / O;
    const subDisc = O2 + mB_ * ks_; const subdesc = subDisc >= 0 ? `imaginary: ${((-O + Math.sqrt(subDisc)) / mB_ / O).toFixed(4)}i, ${((-O - Math.sqrt(subDisc)) / mB_ / O).toFixed(4)}i (and conjugates)` : `UNSTABLE: Re z = +-${(Math.sqrt(-subDisc) / mB_ / O).toFixed(4)}`;
    log(`  x=${xx}: breathing +-${wbr.toFixed(4)}i; warp +-${ww.toFixed(4)}i; tilt +-1i (x2); translation +-1i (double, Jordan); zero (x4: rotation+family, axial trans+boost); sublattice ${subdesc}; k2 in-plane ${k2desc}`);
  }

  // nonlinear growth check: evolve ring + eps * (k2 unstable eigenvector) with RK4, measure growth rate of the k2 shear amplitude
  {
    const xx = 1.7, K_ = 1, O = Math.sqrt(Omega2Closed(xx, K_)); const S = ringState(xx, O); const q_ = S.q;
    const u = 1 / xx ** 3, O2 = O * O; const mA_ = 1 - 1 / xx, mB_ = 1 + SQ2 / xx, kA_ = 0.75 * u, kB_ = -1.5 * SQ2 * u;
    const qa = mA_ * mB_, qb = mA_ * kB_ + mB_ * kA_ + 4 * O2, qc = kA_ * kB_; const s1 = (-qb + Math.sqrt(qb * qb - 4 * qa * qc)) / (2 * qa); const zg = Math.sqrt(s1);
    // eigenvector of [[mA z^2 + kA, -2 Om z],[2 Om z, mB z^2 + kB]] (A,B): B = (mA z^2 + kA) A / (2 Om z)
    const Aamp = 1, Bamp = (mA_ * zg * zg + kA_) * Aamp / (2 * O * zg);
    const Bz2 = sectorBasis(localFrames(S.X)); const dir = Bz2.k2_elliptic.map((c, i) => c * Aamp + Bz2.k2_shear[i] * Bamp * Math.hypot(...Bz2.k2_elliptic) / Math.hypot(...Bz2.k2_shear));
    // (elliptic and shear basis vectors are both unit; local amplitudes per member are 1/2 each, same scale)
    const eps = 1e-6; const Y = flat(S.X).map((c, i) => c + eps * dir[i]); const W = dir.map(c => eps * zg * c); // xi' = z xi for the eigenmode
    const f = (Yv, Wv) => [Wv, rotatingAccel(Yv, Wv, q_, K_, O)];
    const proj = Yv => { const d = Yv.map((c, i) => c - flat(S.X)[i]); return d.reduce((s, c, i) => s + c * dir[i], 0) / dir.reduce((s, c) => s + c * c, 0); };
    let y = Y.slice(), w = W.slice(); const dt = 0.002; const Tend = 1.0; const n = Math.round(Tend / dt); const a0 = proj(y);
    for (let it = 0; it < n; it++) {
      const k1 = f(y, w); const k2 = f(y.map((c, i) => c + dt / 2 * k1[0][i]), w.map((c, i) => c + dt / 2 * k1[1][i]));
      const k3 = f(y.map((c, i) => c + dt / 2 * k2[0][i]), w.map((c, i) => c + dt / 2 * k2[1][i])); const k4 = f(y.map((c, i) => c + dt * k3[0][i]), w.map((c, i) => c + dt * k3[1][i]));
      y = y.map((c, i) => c + dt / 6 * (k1[0][i] + 2 * k2[0][i] + 2 * k3[0][i] + k4[0][i])); w = w.map((c, i) => c + dt / 6 * (k1[1][i] + 2 * k2[1][i] + 2 * k3[1][i] + k4[1][i]));
    }
    const a1 = proj(y); const measured = Math.log(a1 / a0) / Tend;
    // energy conservation in the inertial frame along the same run
    const JY = matvec(Jmat(), y); const Vin = w.map((c, i) => c + O * JY[i]);
    const E0 = energy(S.X, S.V, q_, K_), E1 = energy(unflat(y, 4), unflat(Vin, 4), q_, K_);
    log(`nonlinear growth check at x=${xx}: predicted real root z = ${zg.toFixed(6)} (= ${(zg / O).toFixed(4)} Omega); measured ln-amplitude rate over T=1 (RK4, dt=${dt}) = ${measured.toFixed(6)}; energy drift |E1-E0|/|E0| = ${(Math.abs(E1 - E0) / Math.abs(E0)).toExponential(2)}`);
  }
}

import { writeFileSync, mkdirSync } from 'node:fs';
mkdirSync(new URL('.', import.meta.url).pathname, { recursive: true });
writeFileSync(new URL('./ring-checks-output.txt', import.meta.url).pathname, report.join('\n') + '\n');
