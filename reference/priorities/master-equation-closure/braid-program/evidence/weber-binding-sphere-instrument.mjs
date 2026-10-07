#!/usr/bin/env node
// weber-binding-sphere-instrument.mjs
//
// Geometry-lane instrument library for the Weber binding-sphere continuation
// (preregistration: ../analysis/weber-binding-sphere-preregistration.md).
// Law: Section 9 of equation-variants/manuscript.md, frozen at lambda_W = -1/2,
// mu_W = 1, K = 1, c_f = 1, unit integration weights (architrinos have no mass),
// instantaneous distinct-partner support, no self term, no boundary response,
// no softening, no speed ceiling enforced.  Every evaluation assembles and
// solves the full 3N x 3N system through the validated overnight pair
// instrument, imported unmodified.  This file adds, on top of that instrument:
//   A1  a prescribed-path residual evaluator (pathResidual, rigidPath)
//   A2  a rigid relative-equilibrium balance function (rigidBalance) and two
//       least-squares solvers (levenbergMarquardt, nelderMead)
//   A3  a rotating-frame 6N-state linearization wrapper (rotatingSpectrum) and
//       a monodromy (flow-map derivative) evaluator (monodromy) built on a light
//       integration driver (integrate) that reuses the instrument's steppers
//   A4  the F3 shooting objective (shootingObjective), the T = 0 jet filter
//       (jetConditions) and the PI's G-ddot identity (identityCheck)
// and the known-case suite (runKnownCases) that every target run follows.
//
// Usage:  node weber-binding-sphere-instrument.mjs known     # writes the receipt
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  solveAccelerations, makeParams, packState, linearize, jacobian, eigenvalues,
  makeStepper, derivative, pairKinematics, candidates, REPO_ROOT, SingularSystemError,
} from '../../binary-research/evidence/weber-overnight-pair-instrument.mjs';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const COEFF = Object.freeze({ lambda: -0.5, mu: 1, K: 1, cf: 1 });
export const ZERO_COEFF = Object.freeze({ lambda: 0, mu: 0, K: 1, cf: 1 });
export const DATA_DIR = path.join(REPO_ROOT, '.local-data/master-equation-closure/weber-binding-sphere');
export const KNOWN_CASES_PATH = path.join(HERE, 'weber-binding-sphere-known-cases.json');
export const HEX_Q = Object.freeze([1, -1, 1, -1, 1, -1]);
export const utc = () => new Date().toISOString();
export function ensureDirs() { fs.mkdirSync(DATA_DIR, { recursive: true }); }
export function params(q, coeff = COEFF, condition = 'exact') { return makeParams({ q, ...coeff, condition }); }
export function writeJson(file, obj) { fs.writeFileSync(file, JSON.stringify(obj, null, 1) + '\n'); }
export function log(msg) { process.stdout.write(`[${utc()}] ${msg}\n`); }

// ---------------------------------------------------------------- small vector helpers
export const v3 = {
  dot: (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2],
  norm: a => Math.hypot(a[0], a[1], a[2]),
  sub: (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]],
  add: (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]],
  scale: (a, s) => [a[0] * s, a[1] * s, a[2] * s],
  cross: (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]],
  unit: a => { const n = Math.hypot(a[0], a[1], a[2]); return [a[0] / n, a[1] / n, a[2] / n]; },
};
export function getX(y, i) { return [y[3 * i], y[3 * i + 1], y[3 * i + 2]]; }
export function getV(y, N, i) { const o = 3 * N; return [y[o + 3 * i], y[o + 3 * i + 1], y[o + 3 * i + 2]]; }
export function minSeparation(x, N) {
  let m = Infinity;
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const d = Math.hypot(x[3 * i] - x[3 * j], x[3 * i + 1] - x[3 * j + 1], x[3 * i + 2] - x[3 * j + 2]);
    if (d < m) m = d;
  }
  return m;
}
export function speedsOf(y, N) { const s = []; for (let i = 0; i < N; i++) s.push(v3.norm(getV(y, N, i))); return s; }
export function speedLabels(speeds) {
  const max = Math.max(...speeds), min = Math.min(...speeds);
  return { max, min, unrestricted: true, strict: max < 1, inclusive: max <= 1 };
}
// Rodrigues rotation of vector v about unit axis by angle ang
export function rotate(axis, ang, v) {
  const c = Math.cos(ang), s = Math.sin(ang), k = axis, kv = v3.cross(k, v), kd = v3.dot(k, v);
  return [v[0] * c + kv[0] * s + k[0] * kd * (1 - c), v[1] * c + kv[1] * s + k[1] * kd * (1 - c), v[2] * c + kv[2] * s + k[2] * kd * (1 - c)];
}
export function stateFrom(xs, vs) { const N = xs.length, y = new Float64Array(6 * N); for (let i = 0; i < N; i++) for (let a = 0; a < 3; a++) { y[3 * i + a] = xs[i][a]; y[3 * N + 3 * i + a] = vs[i][a]; } return y; }
export function membersFrom(y, N, q) { const m = []; for (let i = 0; i < N; i++) m.push({ x: getX(y, i), v: getV(y, N, i), q: q[i] }); return m; }
// seeded uniform generator (splitmix-style), independent of the instrument's rng
export function rng(seed) {
  let s = BigInt(seed) & 0xffffffffffffffffn;
  return () => {
    s = (s + 0x9E3779B97F4A7C15n) & 0xffffffffffffffffn;
    let z = s; z = ((z ^ (z >> 30n)) * 0xBF58476D1CE4E5B9n) & 0xffffffffffffffffn;
    z = ((z ^ (z >> 27n)) * 0x94D049BB133111EBn) & 0xffffffffffffffffn; z = z ^ (z >> 31n);
    return Number(z >> 11n) / 9007199254740992;
  };
}
export function randomUnit(rand) { const z = 2 * rand() - 1, ph = 2 * Math.PI * rand(), r = Math.sqrt(1 - z * z); return [r * Math.cos(ph), r * Math.sin(ph), z]; }
// orthonormal triad from a random rotation
export function randomTriad(rand) {
  const a = randomUnit(rand); let b = randomUnit(rand); b = v3.unit(v3.sub(b, v3.scale(a, v3.dot(a, b)))); const c = v3.cross(a, b); return [a, b, c];
}

// ---------------------------------------------------------------- invariant-like quantities (own code)
// energy-like invariant of the frozen law (lambda = -mu/2): sum 1/2 |V|^2 + sum_{i<j} sigma K/d (1 - ddot^2/2)
export function energyLike(y, P) {
  const N = P.N; let H = 0;
  for (let i = 0; i < N; i++) H += 0.5 * v3.dot(getV(y, N, i), getV(y, N, i));
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const k = pairKinematics(y, N, i, j);
    H += P.sigma[i * N + j] * P.Kij[i * N + j] / k.r * (1 - P.mu * k.rdot * k.rdot / (2 * P.cf * P.cf));
  }
  return H;
}
export function sigmaSum(y, P) { const N = P.N; let s = 0; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) s += P.sigma[i * N + j] * pairKinematics(y, N, i, j).r; return s; }
// PI identity: with G = I - sum sigma d, I = 1/2 sum |X|^2, G-ddot = T_kin + H.  Left side assembled from the
// solved accelerations and the kinematic d-ddot; right side from energyLike.  Returns both and their difference.
export function identityCheck(y, P) {
  const N = P.N, { A } = solveAccelerations(y, P);
  let Tk = 0, XA = 0, sdd = 0;
  for (let i = 0; i < N; i++) { const V = getV(y, N, i), X = getX(y, i), Ai = [A[3 * i], A[3 * i + 1], A[3 * i + 2]]; Tk += 0.5 * v3.dot(V, V); XA += v3.dot(X, Ai); }
  for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
    const k = pairKinematics(y, N, i, j);
    const dA = [A[3 * i] - A[3 * j], A[3 * i + 1] - A[3 * j + 1], A[3 * i + 2] - A[3 * j + 2]];
    const rddot = v3.dot(k.e, dA) + k.wperp2 / k.r;
    sdd += P.sigma[i * N + j] * rddot;
  }
  const Gdd = 2 * Tk + XA - sdd, H = energyLike(y, P);
  return { Gddot: Gdd, TkinPlusH: Tk + H, diff: Gdd - (Tk + H), Tkin: Tk, H };
}

// ---------------------------------------------------------------- A1 prescribed-path residual
// rigid rotation of a configuration X0 (array of 3-vectors) about a unit axis through the origin
export function rigidPath(X0, Omega, axis = [0, 0, 1]) {
  return T => {
    const xs = X0.map(x => rotate(axis, Omega * T, x));
    const vs = xs.map(x => v3.scale(v3.cross(axis, x), Omega));
    const as = xs.map(x => v3.scale(v3.cross(axis, v3.cross(axis, x)), Omega * Omega)); // = -Omega^2 X_perp
    return { x: xs, v: vs, areq: as };
  };
}
// path(T) -> {x:[3-vectors], v:[3-vectors], areq:[3-vectors]}; residual normalised by Omega^2 R
export function pathResidual({ q, path, Omega, R, period, nT = 64, coeff = COEFF, condition = 'exact' }) {
  const P = params(q, coeff, condition), N = q.length, O2R = Omega * Omega * R;
  const out = {
    nT, period, Omega, R, maxRel: 0, components: [0, 0, 0], radialRaw: 0, tangentialRaw: 0, binormalRel: 0,
    minSep: Infinity, minAbsDet: Infinity, maxCond: 0, speedMax: 0, speedMin: Infinity, worst: null,
    sigmaSum: { min: Infinity, max: -Infinity }, H: { min: Infinity, max: -Infinity }, failures: [],
  };
  for (let k = 0; k < nT; k++) {
    const T = k * period / nT, s = path(T), y = stateFrom(s.x, s.v);
    let sol;
    try { sol = solveAccelerations(y, P); } catch (e) { if (!(e instanceof SingularSystemError)) throw e; out.failures.push({ T, error: e.message }); out.maxRel = Infinity; continue; }
    const A = sol.A;
    for (let i = 0; i < N; i++) {
      const Ai = [A[3 * i], A[3 * i + 1], A[3 * i + 2]], X = s.x[i], V = s.v[i], diff = v3.sub(Ai, s.areq[i]);
      const rel = v3.norm(diff) / O2R;
      if (rel > out.maxRel) { out.maxRel = rel; out.worst = { T, member: i, diff, A: Ai, areq: s.areq[i] }; }
      for (let a = 0; a < 3; a++) out.components[a] = Math.max(out.components[a], Math.abs(diff[a]) / O2R);
      const sp = v3.norm(V);
      out.radialRaw = Math.max(out.radialRaw, Math.abs(v3.dot(X, Ai) + sp * sp));
      out.tangentialRaw = Math.max(out.tangentialRaw, Math.abs(v3.dot(V, Ai)));
      const bn = v3.cross(X, V), bnn = v3.norm(bn);
      if (bnn > 0) out.binormalRel = Math.max(out.binormalRel, Math.abs(v3.dot(diff, bn) / bnn) / O2R);
      out.speedMax = Math.max(out.speedMax, sp); out.speedMin = Math.min(out.speedMin, sp);
    }
    out.minSep = Math.min(out.minSep, minSeparation(y, N));
    out.minAbsDet = Math.min(out.minAbsDet, Math.abs(sol.det));
    if (Number.isFinite(sol.cond)) out.maxCond = Math.max(out.maxCond, sol.cond);
    const ss = sigmaSum(y, P), H = energyLike(y, P);
    out.sigmaSum.min = Math.min(out.sigmaSum.min, ss); out.sigmaSum.max = Math.max(out.sigmaSum.max, ss);
    out.H.min = Math.min(out.H.min, H); out.H.max = Math.max(out.H.max, H);
  }
  out.radialRel = out.radialRaw / (O2R * R);
  out.tangentialRel = out.tangentialRaw / (O2R * Math.max(out.speedMax, 1e-300));
  out.speedLabels = speedLabels([out.speedMax, out.speedMin]);
  out.sigmaSumSpread = out.sigmaSum.max - out.sigmaSum.min;
  out.HSpread = out.H.max - out.H.min;
  out.HPlus3v2 = out.H.max + 3 * out.speedMax * out.speedMax; // PI filter: H = -3 v^2 on an equal-speed sphere history
  return out;
}

// ---------------------------------------------------------------- A2 rigid balance and solvers
// Rigid relative-equilibrium balance: r_i = Omega^2 X_{i,perp} + sum_{j != i} sigma K e_ij / d_ij^2 must vanish.
export function rigidBalance(X, q, Omega, axis = [0, 0, 1], K = 1) {
  const N = q.length, resid = new Float64Array(3 * N); let max = 0, axialMax = 0, Rmax = 0, minSep = Infinity, scale = 0, num = 0, den = 0;
  for (let i = 0; i < N; i++) {
    const Xi = X[i], ax = v3.dot(axis, Xi), Xp = v3.sub(Xi, v3.scale(axis, ax));
    const F = [0, 0, 0];
    for (let j = 0; j < N; j++) {
      if (j === i) continue;
      const d = v3.sub(Xi, X[j]), dn = v3.norm(d); minSep = Math.min(minSep, dn);
      const f = Math.sign(q[i] * q[j]) * K / (dn * dn * dn);
      F[0] += f * d[0]; F[1] += f * d[1]; F[2] += f * d[2];
    }
    const r = v3.add(v3.scale(Xp, Omega * Omega), F);
    for (let a = 0; a < 3; a++) resid[3 * i + a] = r[a];
    max = Math.max(max, v3.norm(r)); axialMax = Math.max(axialMax, Math.abs(v3.dot(axis, r))); Rmax = Math.max(Rmax, v3.norm(Xi));
    scale = Math.max(scale, v3.norm(F)); num += -v3.dot(Xp, F); den += v3.dot(Xp, Xp);
  }
  // scale: largest inverse-square sum; Omega2LeastSquares: the rate squared that minimises the residual for this geometry (may be negative)
  return { resid, max, maxRel: max / (Omega * Omega * Rmax), maxOverScale: max / scale, axialMax, axialRel: axialMax / (Omega * Omega * Rmax), axialOverScale: axialMax / scale, inverseSquareScale: scale, Omega2LeastSquares: num / den, minSep, Rmax };
}
// dense solve by Gaussian elimination with partial pivoting (small n)
export function solveDense(A, b, n) {
  const M = Float64Array.from(A), x = Float64Array.from(b);
  for (let k = 0; k < n; k++) {
    let p = k, big = Math.abs(M[k * n + k]);
    for (let i = k + 1; i < n; i++) { const v = Math.abs(M[i * n + k]); if (v > big) { big = v; p = i; } }
    if (!(big > 0)) throw new Error('singular dense system');
    if (p !== k) { for (let j = 0; j < n; j++) { const t = M[k * n + j]; M[k * n + j] = M[p * n + j]; M[p * n + j] = t; } const t = x[k]; x[k] = x[p]; x[p] = t; }
    for (let i = k + 1; i < n; i++) { const f = M[i * n + k] / M[k * n + k]; if (f === 0) continue; for (let j = k; j < n; j++) M[i * n + j] -= f * M[k * n + j]; x[i] -= f * x[k]; }
  }
  for (let i = n - 1; i >= 0; i--) { let s = x[i]; for (let j = i + 1; j < n; j++) s -= M[i * n + j] * x[j]; x[i] = s / M[i * n + i]; }
  return x;
}
// Levenberg-Marquardt with a central-difference Jacobian.  fun(p) -> residual array.
export function levenbergMarquardt(fun, p0, opt = {}) {
  const maxIter = opt.maxIter ?? 100, fdStep = opt.fdStep ?? 1e-7, tolStep = opt.tolStep ?? 1e-14, tolCost = opt.tolCost ?? 1e-32, maxLam = opt.maxLambda ?? 1e12;
  let p = Float64Array.from(p0), r = Float64Array.from(fun(p)), nfev = 1, lam = opt.lambda0 ?? 1e-3, iter = 0, converged = false, reason = 'max-iter';
  const n = p.length, m = r.length;
  const costOf = rr => { let s = 0; for (const z of rr) s += z * z; return 0.5 * s; };
  let cost = costOf(r);
  const clamp = opt.clamp ?? (pp => pp);
  for (iter = 1; iter <= maxIter; iter++) {
    if (!(cost > tolCost)) { converged = true; reason = 'cost'; break; }
    const J = new Float64Array(m * n);
    for (let k = 0; k < n; k++) {
      const h = fdStep * Math.max(1, Math.abs(p[k])), pp = Float64Array.from(p), pm = Float64Array.from(p); pp[k] += h; pm[k] -= h;
      const rp = fun(clamp(pp)), rm = fun(clamp(pm)); nfev += 2;
      for (let i = 0; i < m; i++) J[i * n + k] = (rp[i] - rm[i]) / (2 * h);
    }
    const JtJ = new Float64Array(n * n), Jtr = new Float64Array(n);
    for (let a = 0; a < n; a++) { for (let b = a; b < n; b++) { let s = 0; for (let i = 0; i < m; i++) s += J[i * n + a] * J[i * n + b]; JtJ[a * n + b] = s; JtJ[b * n + a] = s; } let s = 0; for (let i = 0; i < m; i++) s += J[i * n + a] * r[i]; Jtr[a] = -s; }
    let accepted = false;
    while (lam <= maxLam) {
      // multiplicative damping with an absolute floor (1e-12 of the largest diagonal entry) so that a parameter the
      // residual does not depend on (a symmetry direction) cannot receive an unbounded step
      let dmax = 0; for (let a = 0; a < n; a++) dmax = Math.max(dmax, JtJ[a * n + a]);
      const Aug = Float64Array.from(JtJ); for (let a = 0; a < n; a++) Aug[a * n + a] += lam * (JtJ[a * n + a] + 1e-12 * dmax + 1e-300) + 1e-300;
      let delta; try { delta = solveDense(Aug, Jtr, n); } catch { lam *= 10; continue; }
      const pn = clamp(Float64Array.from(p.map((z, k) => z + delta[k]))), rn = Float64Array.from(fun(pn)); nfev++;
      const cn = costOf(rn);
      if (cn < cost) {
        let dn = 0, pnn = 0; for (let k = 0; k < n; k++) { dn += delta[k] * delta[k]; pnn += p[k] * p[k]; }
        p = pn; r = rn; cost = cn; lam = Math.max(lam / 10, 1e-15); accepted = true;
        if (Math.sqrt(dn) <= tolStep * (1 + Math.sqrt(pnn))) { converged = true; reason = 'step'; }
        break;
      }
      lam *= 10;
    }
    if (!accepted) { reason = 'no-descent'; break; }
    if (converged) break;
  }
  let rmax = 0; for (const z of r) rmax = Math.max(rmax, Math.abs(z));
  return { p: Array.from(p), residual: Array.from(r), cost, rmax, iter, nfev, converged, reason };
}
// Nelder-Mead simplex minimiser of a scalar function
export function nelderMead(f, p0, opt = {}) {
  const n = p0.length, maxEval = opt.maxEval ?? 2000, tolF = opt.tolF ?? 1e-14, tolX = opt.tolX ?? 1e-12;
  const scale = Array.isArray(opt.scale) ? opt.scale : new Array(n).fill(opt.scale ?? 0.1);
  let simplex = [Float64Array.from(p0)];
  for (let k = 0; k < n; k++) { const p = Float64Array.from(p0); p[k] += scale[k]; simplex.push(p); }
  let vals = simplex.map(p => f(p)), nfev = n + 1;
  const order = () => { const idx = vals.map((v, i) => i).sort((a, b) => vals[a] - vals[b]); simplex = idx.map(i => simplex[i]); vals = idx.map(i => vals[i]); };
  order();
  while (nfev < maxEval) {
    const spreadF = vals[n] - vals[0]; let spreadX = 0; for (let k = 1; k <= n; k++) for (let j = 0; j < n; j++) spreadX = Math.max(spreadX, Math.abs(simplex[k][j] - simplex[0][j]));
    if (spreadF <= tolF * Math.max(1, Math.abs(vals[0])) && spreadX <= tolX) break;
    const c = new Float64Array(n); for (let k = 0; k < n; k++) for (let j = 0; j < n; j++) c[j] += simplex[k][j] / n;
    const xr = c.map((z, j) => z + (z - simplex[n][j])); const fr = f(xr); nfev++;
    if (fr < vals[0]) { const xe = c.map((z, j) => z + 2 * (z - simplex[n][j])); const fe = f(xe); nfev++; if (fe < fr) { simplex[n] = xe; vals[n] = fe; } else { simplex[n] = xr; vals[n] = fr; } }
    else if (fr < vals[n - 1]) { simplex[n] = xr; vals[n] = fr; }
    else {
      const outside = fr < vals[n];
      const xc = c.map((z, j) => z + 0.5 * ((outside ? xr[j] : simplex[n][j]) - z)); const fc = f(xc); nfev++;
      if (fc < (outside ? fr : vals[n])) { simplex[n] = xc; vals[n] = fc; }
      else { for (let k = 1; k <= n; k++) { simplex[k] = simplex[k].map((z, j) => simplex[0][j] + 0.5 * (z - simplex[0][j])); vals[k] = f(simplex[k]); nfev++; } }
    }
    order();
  }
  return { p: Array.from(simplex[0]), f: vals[0], nfev };
}

// ---------------------------------------------------------------- A3 linearization and monodromy
export function classifyEigenvalues(eig, Omega, tol = 1e-5) {
  const cls = { zero: 0, plusMinusIOmega: 0, unstable: 0, damped: 0, ellipticOther: 0 };
  let maxRe = -Infinity;
  for (const z of eig) {
    maxRe = Math.max(maxRe, z.re);
    if (Math.abs(z.re) < tol && Math.abs(z.im) < tol) cls.zero++;
    else if (Math.abs(z.re) < tol && Math.abs(Math.abs(z.im) - Omega) < tol) cls.plusMinusIOmega++;
    else if (z.re > tol) cls.unstable++;
    else if (z.re < -tol) cls.damped++;
    else cls.ellipticOther++;
  }
  return { ...cls, maxRealPart: maxRe, growthOverOmega: maxRe / Omega };
}
// Rotating-frame spectrum about a rigid relative equilibrium; refuses non-equilibria (imported helper).
// The helper's state is expressed in the rotating frame (X' = U, inertial velocity U + omega x X), so a
// rigid relative equilibrium has U = 0: the members' velocities are zeroed here whatever the caller supplied.
export function rotatingSpectrum(members, Omega, opt = {}) {
  const axis = opt.axis ?? [0, 0, 1];
  const frameMembers = members.map(m => ({ x: m.x.slice(), v: [0, 0, 0], q: m.q }));
  const spec = { members: frameMembers, coefficients: opt.coeff ?? COEFF, frame: { omega: axis.map(a => a * Omega) }, balanceTol: opt.balanceTol ?? 1e-10 };
  const res = linearize(spec, { balanceTol: spec.balanceTol, step: opt.step ?? 1e-4 });
  if (res.eigenvalues) Object.assign(res, { classes: classifyEigenvalues(res.eigenvalues, Omega, opt.classTol ?? 1e-5) });
  return res;
}
// Light integration driver on the instrument's steppers; stops at contact, obstruction or singular solve.
export function integrate(y0, tEnd, P, opt = {}) {
  const method = opt.method ?? 'gbs', rtol = opt.rtol ?? 1e-12, atol = opt.atol ?? 1e-14, N = P.N;
  let nfev = 0;
  const f = yy => { nfev++; return derivative(yy, P).dy; };
  const stepper = makeStepper(method, f, { rtol, atol, kmax: opt.kmax ?? 9 });
  const maxSteps = opt.maxSteps ?? 2e6, hmax = opt.hmax ?? tEnd / 20, hmin = opt.hmin ?? 1e-14 * Math.max(1, tEnd);
  const sepMin = opt.minSep ?? 1e-6, detMin = opt.detMin ?? 1e-8, speedStop = opt.stopAtSpeed ?? null;
  let y = Float64Array.from(y0), t = 0, steps = 0, rejects = 0, reason = 'final-time';
  let h = method === 'rk4' ? opt.h : (opt.h0 ?? Math.min(hmax, tEnd / 2000));
  if (!(h > 0)) throw new Error('step size required');
  const st = { minSep: Infinity, minAbsDet: Infinity, maxSpeed: 0, maxCond: 0, firstSpeedCrossing: null };
  const diag = (yy, sol) => {
    st.minSep = Math.min(st.minSep, minSeparation(yy, N)); st.minAbsDet = Math.min(st.minAbsDet, Math.abs(sol.det));
    if (Number.isFinite(sol.cond)) st.maxCond = Math.max(st.maxCond, sol.cond);
    const sp = speedsOf(yy, N), mx = Math.max(...sp); st.maxSpeed = Math.max(st.maxSpeed, mx);
    if (st.firstSpeedCrossing === null && t > 0 && mx > 1) st.firstSpeedCrossing = { t, member: sp.indexOf(mx), speed: mx };
  };
  let cur;
  try { cur = derivative(y, P); nfev++; } catch (e) { if (!(e instanceof SingularSystemError)) throw e; return { y, t, steps, rejects, nfev, reason: 'singular-initial', ...st }; }
  diag(y, cur.sol);
  if (opt.onSample) opt.onSample(t, y, cur.sol);
  const hbEvery = opt.heartbeatEvery ?? 0;
  while (t < tEnd) {
    if (steps >= maxSteps) { reason = 'max-steps'; break; }
    const hh = Math.min(h, tEnd - t);
    let s;
    try { s = stepper.step(y, cur.dy, hh); } catch (e) { if (!(e instanceof SingularSystemError)) throw e; rejects++; h = hh / 4; if (h < hmin) { reason = 'step-underflow-singular'; break; } continue; }
    if (stepper.adaptive && s.err > 1) { rejects++; h = Math.max(s.hNew, hmin); if (hh <= hmin) { reason = 'step-underflow'; break; } continue; }
    y = s.y; t += hh; steps++;
    try { cur = derivative(y, P); nfev++; } catch (e) { if (!(e instanceof SingularSystemError)) throw e; reason = 'singular-after-step'; break; }
    diag(y, cur.sol);
    if (opt.onSample) opt.onSample(t, y, cur.sol);
    if (st.minSep < sepMin) { reason = 'contact'; break; }
    if (Math.abs(cur.sol.det) < detMin || !(cur.sol.minPivot > 1e-10)) { reason = 'obstruction'; break; }
    if (speedStop !== null && st.maxSpeed > speedStop) { reason = 'speed'; break; }
    if (stepper.adaptive) h = Math.min(hmax, Math.max(s.hNew, hmin));
    if (hbEvery && steps % hbEvery === 0 && opt.heartbeat) opt.heartbeat({ t, steps, nfev });
  }
  return { y, t, steps, rejects, nfev, reason, ...st };
}
// Monodromy matrix of the flow over one period by central differences of the flow map (Richardson h, h/2).
export function monodromy(y0, period, P, opt = {}) {
  const n = y0.length, step = opt.step ?? 1e-5, rtol = opt.rtol ?? 1e-13, atol = opt.atol ?? 1e-15;
  let nfev = 0;
  const flow = yy => { const r = integrate(yy, period, P, { method: 'gbs', rtol, atol, hmax: period / 50 }); nfev += r.nfev; if (r.reason !== 'final-time') throw new Error('flow interrupted: ' + r.reason); return r.y; };
  const Phi = Array.from({ length: n }, () => new Float64Array(n)); let errEst = 0;
  for (let k = 0; k < n; k++) {
    const h = step * Math.max(Math.abs(y0[k]), 1);
    const col = hh => { const yp = Float64Array.from(y0), ym = Float64Array.from(y0); yp[k] += hh; ym[k] -= hh; const fp = flow(yp), fm = flow(ym); return fp.map((z, i) => (z - fm[i]) / (2 * hh)); };
    const c1 = col(h), c2 = col(h / 2);
    for (let i = 0; i < n; i++) { Phi[i][k] = (4 * c2[i] - c1[i]) / 3; errEst = Math.max(errEst, Math.abs(c2[i] - c1[i]) / 3); }
  }
  const mult = eigenvalues(Phi).map(z => ({ ...z, abs: Math.hypot(z.re, z.im) })).sort((a, b) => b.abs - a.abs);
  return { multipliers: mult, maxModulus: mult[0].abs, jacobianErrorEstimate: errEst, nfev, Phi: Phi.map(r => Array.from(r)) };
}

// ---------------------------------------------------------------- A4 shooting objective and jet filter
// J = max over sampled T <= Tw of max_i [ | |X_i| - R | / R + | |V_i| - v | / v ]; fixed-step RK4 for a smooth objective.
export function shootingObjective(y0, { v, R, Tw, P, nSteps = 512, method = 'rk4', minSep = 1e-6, sampleEvery = 1, rtol = 1e-12, atol = 1e-14 }) {
  const N = P.N, resid = [];
  let J = 0, minSepSeen = Infinity, worstT = 0, failed = false, reason = 'final-time';
  const sample = (t, yy) => {
    for (let i = 0; i < N; i++) {
      const rX = (v3.norm(getX(yy, i)) - R) / R, rV = (v3.norm(getV(yy, N, i)) - v) / v, s = Math.abs(rX) + Math.abs(rV);
      if (s > J) { J = s; worstT = t; }
      resid.push(rX, rV);
    }
  };
  if (method === 'rk4') {
    const h = Tw / nSteps, f = yy => derivative(yy, P).dy, stepper = makeStepper('rk4', f, {});
    let y = Float64Array.from(y0);
    sample(0, y);
    for (let s = 1; s <= nSteps; s++) {
      let f0; try { f0 = f(y); y = stepper.step(y, f0, h).y; } catch (e) { if (!(e instanceof SingularSystemError)) throw e; failed = true; reason = 'singular'; J = 10 + (nSteps - s) / nSteps; break; }
      const ms = minSeparation(y, N); minSepSeen = Math.min(minSepSeen, ms);
      if (ms < minSep || !Number.isFinite(ms)) { failed = true; reason = 'contact'; J = 10 + (nSteps - s) / nSteps; break; }
      if (s % sampleEvery === 0) sample(s * h, y);
    }
  } else {
    const r = integrate(y0, Tw, P, { method, rtol, atol, hmax: Tw / nSteps, minSep, onSample: (t, yy) => sample(t, yy) });
    minSepSeen = r.minSep; reason = r.reason; if (r.reason !== 'final-time') { failed = true; J = 10 + (Tw - r.t) / Tw; }
  }
  return { J, resid, minSep: minSepSeen, worstT, failed, reason };
}
// Jet conditions at T = 0: c1_i = X_i.A_i + |V_i|^2 (zero on a sphere path), c2_i = V_i.A_i (zero at constant speed),
// and their first time derivatives by central differences along the flow (one RK4 step of +-delta).
export function jetConditions(y, P, v, R, delta = 1e-4) {
  const N = P.N;
  const cond = yy => { const { A } = solveAccelerations(yy, P); const c1 = [], c2 = []; for (let i = 0; i < N; i++) { const X = getX(yy, i), V = getV(yy, N, i), Ai = [A[3 * i], A[3 * i + 1], A[3 * i + 2]]; c1.push(v3.dot(X, Ai) + v3.dot(V, V)); c2.push(v3.dot(V, Ai)); } return { c1, c2 }; };
  const f = yy => derivative(yy, P).dy, stepper = makeStepper('rk4', f, {});
  const c0 = cond(y), yp = stepper.step(y, f(y), delta).y, ym = stepper.step(y, f(y), -delta).y, cp = cond(yp), cm = cond(ym);
  const mx = a => Math.max(...a.map(Math.abs));
  const d1 = c0.c1.map((_, i) => (cp.c1[i] - cm.c1[i]) / (2 * delta)), d2 = c0.c2.map((_, i) => (cp.c2[i] - cm.c2[i]) / (2 * delta));
  const nR = v * v, nT = v * v * v / R;
  return { c1: c0.c1, c2: c0.c2, c1Max: mx(c0.c1), c2Max: mx(c0.c2), d1Max: mx(d1), d2Max: mx(d2), normalised: { radial: mx(c0.c1) / nR, tangential: mx(c0.c2) / nT, radialDot: mx(d1) / (nR * v / R), tangentialDot: mx(d2) / (nT * v / R) }, jetScore: mx(c0.c1) / nR + mx(c0.c2) / nT };
}

// ---------------------------------------------------------------- geometry builders
export function squareRing(rho) { return [0, 1, 2, 3].map(j => { const th = j * Math.PI / 2; return [rho * Math.cos(th), rho * Math.sin(th), 0]; }); }
export function squareOmega(rho, K = 1) { return Math.sqrt((2 * Math.sqrt(2) - 1) * K / (4 * rho * rho * rho)); }
export function squareDet(x) { return (1 + (Math.SQRT2 - 1) / x) * (1 - 1 / x) * Math.pow(1 + Math.SQRT2 / x, 3); }
export function hexagon(rho) { return [0, 1, 2, 3, 4, 5].map(k => { const th = k * Math.PI / 3; return [rho * Math.cos(th), rho * Math.sin(th), 0]; }); }
export function hexagonOmega(rho, K = 1) { return Math.sqrt((5 / 4 - 1 / Math.sqrt(3)) * K / (rho * rho * rho)); }
export function circlePair(rho) { return { X: [[rho, 0, 0], [-rho, 0, 0]], Omega: Math.sqrt(1 / (4 * rho * rho * rho)), q: [1, -1] }; }
export function rigidMembers(X, q, Omega, axis = [0, 0, 1]) { return X.map((x, i) => ({ x, v: v3.scale(v3.cross(axis, x), Omega), q: q[i] })); }
export function rigidState(X, Omega, axis = [0, 0, 1]) { return stateFrom(X, X.map(x => v3.scale(v3.cross(axis, x), Omega))); }

// ---------------------------------------------------------------- known cases (run before any target)
export function runKnownCases(opt = {}) {
  const cases = [], t0 = Date.now();
  const push = (id, reference, measured, pass, tolerance, note) => { cases.push({ id, reference, tolerance, measured, pass, note, utc: utc() }); log(`${pass ? 'PASS' : 'FAIL'} ${id}: ${JSON.stringify(measured)}`); };
  // K1 opposite-polarity circle, frozen coefficients
  for (const rho of [0.25, 1, 3]) {
    const c = circlePair(rho), per = 2 * Math.PI / c.Omega;
    const r = pathResidual({ q: c.q, path: rigidPath(c.X, c.Omega), Omega: c.Omega, R: rho, period: per, nT: 64 });
    const detRef = 1 + 2 / (2 * rho);
    push(`K1-circle-rho=${rho}`, 'A_i = -Omega^2 X_i with Omega^2 = K/(4 rho^3); det M = 1 + 2/(2 rho)', { maxRel: r.maxRel, detMin: r.minAbsDet, detRef, detErr: Math.abs(r.minAbsDet - detRef), radialRel: r.radialRel, tangentialRel: r.tangentialRel }, r.maxRel <= 1e-13 && Math.abs(r.minAbsDet - detRef) <= 1e-13, '1e-13');
  }
  // K2 zero-coefficient square at rho = 1.3
  { const rho = 1.3, Om = squareOmega(rho), X = squareRing(rho), q = [1, -1, 1, -1];
    const r = pathResidual({ q, path: rigidPath(X, Om), Omega: Om, R: rho, period: 2 * Math.PI / Om, coeff: ZERO_COEFF });
    push('K2-zero-coefficient-square', 'A = -Omega^2 X with Omega^2 = (2 sqrt2 - 1) K /(4 rho^3); det M = 1', { maxRel: r.maxRel, det: r.minAbsDet }, r.maxRel <= 1e-13 && Math.abs(r.minAbsDet - 1) <= 1e-13, '1e-13'); }
  // K3 frozen-coefficient square at rho in {1.7, 0.8}
  for (const rho of [1.7, 0.8]) {
    const Om = squareOmega(rho), X = squareRing(rho), q = [1, -1, 1, -1];
    const r = pathResidual({ q, path: rigidPath(X, Om), Omega: Om, R: rho, period: 2 * Math.PI / Om });
    const P = params(q), { det } = solveAccelerations(rigidState(X, Om), P), dref = squareDet(rho);
    push(`K3-frozen-square-rho=${rho}`, 'A = -Omega^2 X; det M = (1+(sqrt2-1)/x)(1-1/x)(1+sqrt2/x)^3', { maxRel: r.maxRel, det, detRef: dref, detErr: Math.abs(det - dref) }, r.maxRel <= 1e-12 && Math.abs(det - dref) <= 1e-12, '1e-12');
    // rigid balance function must agree
    const b = rigidBalance(X, q, Om);
    push(`K3b-rigid-balance-rho=${rho}`, 'inverse-square balance residual of the square ring is zero', { maxRel: b.maxRel }, b.maxRel <= 1e-13, '1e-13');
  }
  // K4 sensitivity at 1.1 Omega
  { const rho = 1.7, Om = 1.1 * squareOmega(rho), X = squareRing(rho), q = [1, -1, 1, -1];
    const r = pathResidual({ q, path: rigidPath(X, Om), Omega: Om, R: rho, period: 2 * Math.PI / Om });
    push('K4-sensitivity-1.1Omega', 'relative residual >= 1e-2', { maxRel: r.maxRel }, r.maxRel >= 1e-2, '>= 1e-2'); }
  // K5 wrong-law sensitivity: mu = 0 keeps the circle; static pair at d = 2 has |A| = 1/8
  { const c = circlePair(1), per = 2 * Math.PI / c.Omega;
    const r = pathResidual({ q: c.q, path: rigidPath(c.X, c.Omega), Omega: c.Omega, R: 1, period: per, coeff: { lambda: -0.5, mu: 0, K: 1, cf: 1 } });
    const P = params([1, -1]); const y = stateFrom([[1, 0, 0], [-1, 0, 0]], [[0, 0, 0], [0, 0, 0]]); const { A } = solveAccelerations(y, P);
    push('K5-wrong-law-sensitivity', 'mu = 0 keeps the circle balanced; static opposite pair at d = 2 gives A_i = -e_ij/(d^2 Delta), |A_i| = 1/8', { circleResidualMu0: r.maxRel, staticA0: Array.from(A.slice(0, 3)), staticA1: Array.from(A.slice(3, 6)) }, r.maxRel <= 1e-13 && Math.abs(A[0] + 1 / 8) <= 1e-13 && Math.abs(A[3] - 1 / 8) <= 1e-13 && Math.abs(A[1]) + Math.abs(A[2]) <= 1e-15, '1e-13'); }
  // K6 integrator: zero-coefficient Kepler ellipse a = 3, e = 0.5 against Kepler's equation (own driver, GBS and RK4)
  { const a = 3, e = 0.5, mu = 2, rp = a * (1 - e), vp = Math.sqrt(mu * (2 / rp - 1 / a)), Pk = 2 * Math.PI * Math.sqrt(a * a * a / mu);
    const n = Math.sqrt(mu / (a * a * a)), q = [1, -1], P = params(q, ZERO_COEFF, 'none');
    const y0 = stateFrom([[rp / 2, 0, 0], [-rp / 2, 0, 0]], [[0, vp / 2, 0], [0, -vp / 2, 0]]);
    const kepler = t => { const M = n * t; let E = M; for (let k = 0; k < 60; k++) E -= (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E)); return [a * (Math.cos(E) - e), a * Math.sqrt(1 - e * e) * Math.sin(E)]; };
    let worst = 0, worstRk4 = 0;
    for (const frac of [0.25, 0.5, 0.75, 1]) {
      const r = integrate(y0, frac * Pk, P, { method: 'gbs', rtol: 1e-13, atol: 1e-15, hmax: Pk / 50 });
      const ref = kepler(frac * Pk), rel = [r.y[0] - r.y[3], r.y[1] - r.y[4]];
      worst = Math.max(worst, Math.hypot(rel[0] - ref[0], rel[1] - ref[1]));
      const r4 = integrate(y0, frac * Pk, P, { method: 'rk4', h: Pk / 4000 }); const rel4 = [r4.y[0] - r4.y[3], r4.y[1] - r4.y[4]];
      worstRk4 = Math.max(worstRk4, Math.hypot(rel4[0] - ref[0], rel4[1] - ref[1]));
    }
    push('K6-integrator-kepler', 'relative position after 1/4, 1/2, 3/4, 1 radial period against Kepler equation; period 2 pi sqrt(a^3/2)', { gbsPositionError: worst, rk4PositionError4000Steps: worstRk4, period: Pk }, worst <= 1e-9 && worstRk4 <= 1e-6, '1e-9 (GBS); 1e-6 (RK4 comparison)'); }
  // K7 linearization: frozen-coefficient circle at rho = 1 in the rotating frame
  { const c = circlePair(1), Om = c.Omega, wr = Om / Math.sqrt(2);
    const res = rotatingSpectrum(rigidMembers(c.X, c.q, Om), Om, { balanceTol: 1e-10 });
    const eig = res.eigenvalues ?? []; const near = (z, re, im) => Math.hypot(z.re - re, z.im - im);
    const counts = { zero: 0, plusIOm: 0, minusIOm: 0, plusIwr: 0, minusIwr: 0, other: 0 }; let maxDist = 0;
    for (const z of eig) { const d = [near(z, 0, 0), near(z, 0, Om), near(z, 0, -Om), near(z, 0, wr), near(z, 0, -wr)]; const m = Math.min(...d), k = d.indexOf(m); maxDist = Math.max(maxDist, m); if (m > 1e-5) counts.other++; else counts[['zero', 'plusIOm', 'minusIOm', 'plusIwr', 'minusIwr'][k]]++; }
    const pass = res.balanced && counts.zero === 4 && counts.plusIOm === 3 && counts.minusIOm === 3 && counts.plusIwr === 1 && counts.minusIwr === 1 && counts.other === 0;
    push('K7-linearization-circle-rho=1', 'spectrum 0 (x4), +-i Omega (x3 each; the preregistration count "x4 each" would exceed the 12 states), +-i omega_r with omega_r^2 = Omega^2/2, Omega = 1/2', { balanceResidual: res.balanceResidualMax, counts, maxDistance: maxDist, eigenvalues: eig, jacobianErrorEstimate: res.jacobianErrorEstimate }, pass, '1e-5');
    const off = rotatingSpectrum(rigidMembers(c.X, c.q, Om), 1.01 * Om, { balanceTol: 1e-10 });
    push('K7a-linearization-refuses-non-equilibrium', 'frame rate off by 1 percent: helper must decline', { balanced: off.balanced, balanceResidual: off.balanceResidualMax, reported: !!off.eigenvalues }, !off.balanced && !off.eigenvalues, '—');
    // K7b monodromy over one period: multipliers exp(lambda P): 1 (x10) and exp(+-2 pi i / sqrt2)
    const per = 2 * Math.PI / Om, P = params(c.q, COEFF, 'none');
    const mon = monodromy(rigidState(c.X, Om), per, P, { step: 1e-5 });
    const target = { re: Math.cos(2 * Math.PI / Math.SQRT2), im: Math.sin(2 * Math.PI / Math.SQRT2) };
    let nUnit = 0, dRad = Infinity, maxUnitDev = 0;
    for (const z of mon.multipliers) { const du = Math.hypot(z.re - 1, z.im), dr = Math.min(Math.hypot(z.re - target.re, z.im - target.im), Math.hypot(z.re - target.re, z.im + target.im)); if (dr < du) dRad = Math.min(dRad, dr); else { nUnit++; maxUnitDev = Math.max(maxUnitDev, du); } }
    push('K7b-monodromy-circle-rho=1', 'Floquet multipliers of the circle over P = 2 pi/Omega: 1 (x10, defective, splitting of order sqrt(error) expected) and exp(+-2 pi i/sqrt2)', { nUnit, maxUnitDeviation: maxUnitDev, radialPairDistance: dRad, jacobianErrorEstimate: mon.jacobianErrorEstimate, target }, nUnit === 10 && maxUnitDev <= 1e-3 && dRad <= 1e-6, '1e-3 (unit cluster), 1e-6 (radial pair)'); }
  // K8 solvers: LM recovers the square ring's angles and Omega from a perturbed start; Nelder-Mead minimises a known bowl
  { const rho = 1.7, q = [1, -1, 1, -1], OmRef = squareOmega(rho);
    const fun = p => { const X = [0, 1, 2, 3].map(j => { const th = j * Math.PI / 2 + (j ? p[j - 1] : 0); return [rho * Math.cos(th), rho * Math.sin(th), 0]; }); return Array.from(rigidBalance(X, q, p[3]).resid); };
    const r = levenbergMarquardt(fun, [0.05, -0.04, 0.03, 1.1 * OmRef], { maxIter: 100 });
    const angErr = Math.max(...r.p.slice(0, 3).map(Math.abs)), omErr = Math.abs(r.p[3] - OmRef) / OmRef;
    push('K8-levenberg-marquardt-square', 'from angle offsets 0.05, -0.04, 0.03 and 1.1 Omega the solver returns the square and Omega^2 = (2 sqrt2 - 1)K/(4 rho^3)', { angleError: angErr, omegaRelError: omErr, rmax: r.rmax, iter: r.iter, converged: r.converged }, angErr <= 1e-10 && omErr <= 1e-10 && r.rmax <= 1e-12, '1e-10');
    const nm = nelderMead(p => (p[0] - 1) ** 2 + 3 * (p[1] + 2) ** 2 + (p[0] * p[1] + 2) ** 2, [0, 0], { maxEval: 4000 });
    push('K8b-nelder-mead-bowl', 'minimum of (p0-1)^2 + 3(p1+2)^2 + (p0 p1 + 2)^2 is at (1,-2) with value 0', { p: nm.p, f: nm.f }, Math.abs(nm.p[0] - 1) <= 1e-5 && Math.abs(nm.p[1] + 2) <= 1e-5, '1e-5'); }
  // K9 shooting objective and jet filter on the exact circle (frozen coefficients): J small, jet residual zero
  { const c = circlePair(1), Om = c.Omega, per = 2 * Math.PI / Om, P = params(c.q, COEFF, 'none'), y0 = rigidState(c.X, Om);
    const J4 = shootingObjective(y0, { v: Om, R: 1, Tw: per, P, nSteps: 512, method: 'rk4' });
    const Jg = shootingObjective(y0, { v: Om, R: 1, Tw: per, P, nSteps: 64, method: 'gbs' });
    const jet = jetConditions(y0, P, Om, 1);
    push('K9-shooting-objective-circle', 'J on the exact circle over one period: RK4-512 <= 1e-6, GBS <= 1e-10; jet conditions and their derivatives zero', { J_rk4_512: J4.J, J_gbs: Jg.J, jetRadial: jet.normalised.radial, jetTangential: jet.normalised.tangential, jetRadialDot: jet.normalised.radialDot, jetTangentialDot: jet.normalised.tangentialDot }, J4.J <= 1e-6 && Jg.J <= 1e-10 && jet.jetScore <= 1e-12 && jet.normalised.radialDot <= 1e-8 && jet.normalised.tangentialDot <= 1e-8, '1e-6 / 1e-10 / 1e-12 / 1e-8');
    // perturbed circle must give a visibly larger J
    const y1 = Float64Array.from(y0); y1[0] *= 1.01;
    const Jp = shootingObjective(y1, { v: Om, R: 1, Tw: per, P, nSteps: 512 });
    push('K9a-shooting-objective-sensitivity', 'radius of one member scaled by 1.01: J >= 5e-3', { J: Jp.J }, Jp.J >= 5e-3, '>= 5e-3'); }
  // K10 PI identity G-ddot = T_kin + H on random six-member states (own assembly), plus a finite-difference check along the flow
  { const rand = rng(20261005), P = params(HEX_Q, COEFF, 'none'); let worst = 0, worstFD = 0;
    for (let s = 0; s < 50; s++) {
      const xs = [], vs = []; for (let i = 0; i < 6; i++) { xs.push(v3.scale(randomUnit(rand), 0.5 + 2 * rand())); vs.push(v3.scale(randomUnit(rand), 1.2 * rand())); }
      const y = stateFrom(xs, vs); if (minSeparation(y, 6) < 0.2) { s--; continue; }
      const c = identityCheck(y, P); worst = Math.max(worst, Math.abs(c.diff) / Math.max(1, Math.abs(c.TkinPlusH)));
      if (s < 5) { // FD second derivative of G along the flow with small RK4 steps
        const G = yy => { let I = 0; for (let i = 0; i < 6; i++) I += 0.5 * v3.dot(getX(yy, i), getX(yy, i)); return I - sigmaSum(yy, P); };
        const d = 1e-4, f = yy => derivative(yy, P).dy, st = makeStepper('rk4', f, {});
        const step = (yy, h) => { let z = Float64Array.from(yy); for (let k = 0; k < 8; k++) z = st.step(z, f(z), h / 8).y; return z; };
        const yp = step(y, d), ym = step(y, -d), ypp = step(yp, d), ymm = step(ym, -d);
        const g2 = (-G(ypp) + 16 * G(yp) - 30 * G(y) + 16 * G(ym) - G(ymm)) / (12 * d * d);
        worstFD = Math.max(worstFD, Math.abs(g2 - c.TkinPlusH) / Math.max(1, Math.abs(c.TkinPlusH)));
      }
    }
    // also the instrument's own candidate H agrees with energyLike
    const y = stateFrom(hexagon(1), hexagon(1).map(x => v3.scale(v3.cross([0, 0, 1], x), 0.8))); const dH = Math.abs(energyLike(y, P) - candidates.weber(y, P));
    push('K10-identity-Gddot', 'PI identity: G-ddot = T_kin + H with G = I - sum sigma d, 50 random six-member states (own assembly from solved A and kinematic d-ddot), and a fourth-order finite-difference d^2G/dT^2 along the flow (step 1e-4, RK4 substeps) on five of them; own H equals the instrument candidate', { worstAlgebraic: worst, worstFiniteDifference: worstFD, HAgreement: dH }, worst <= 1e-12 && worstFD <= 1e-3 && dH <= 1e-14, '1e-12 / 1e-3 (finite-difference side) / 1e-14'); }
  const receipt = { instrument: path.relative(REPO_ROOT, fileURLToPath(import.meta.url)), importedInstrument: 'reference/priorities/master-equation-closure/binary-research/evidence/weber-overnight-pair-instrument.mjs (unmodified)', node: process.version, law: 'equation-variants manuscript Section 9, lambda=-1/2, mu=1, K=1, cf=1, unit weights, instantaneous', utc: utc(), wallSeconds: (Date.now() - t0) / 1000, allPass: cases.every(c => c.pass), cases };
  if (opt.write !== false) writeJson(KNOWN_CASES_PATH, receipt);
  log(`known cases: ${cases.filter(c => c.pass).length}/${cases.length} passed, wall ${receipt.wallSeconds}s${opt.write !== false ? ', receipt ' + path.relative(REPO_ROOT, KNOWN_CASES_PATH) : ''}`);
  return receipt;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const cmd = process.argv[2] ?? 'known';
  if (cmd === 'known') { const r = runKnownCases(); process.exit(r.allPass ? 0 : 1); }
  else { console.error('usage: node weber-binding-sphere-instrument.mjs known'); process.exit(2); }
}
