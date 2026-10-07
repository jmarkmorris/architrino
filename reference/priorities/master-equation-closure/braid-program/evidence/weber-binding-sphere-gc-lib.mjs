// weber-binding-sphere-gc-lib.mjs
// Great-circle closure lane (2026-10-06): own evaluator of the closed great-circle system of the
// instantaneous Weber comparison law at real and complex absolute time T. K = c_f = 1 throughout.
// Nothing here is imported from any other instrument; the frozen reference library is imported only
// by the check script, for the known-case comparison.
//
// Class: X_i(T) = R [cos(Omega T + phi_i) u_i + sin(Omega T + phi_i) u_i'], m_i = u_i x u_i'.
// Closed system: F_i(T) = sum_{j != i} w_ij(T) (X_i - X_j) + Omega^2 X_i,
//   w_ij = sigma_ij d^-3 [1 - d'^2/2 + d d''] = sigma_ij D^-3/2 [1 + D''/2 - 3 D'^2/(8 D)],  D = d^2.

// ---------- real vectors ----------
export const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const norm = (a) => Math.hypot(a[0], a[1], a[2]);
export const scale = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
export const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const unit = (a) => scale(a, 1 / norm(a));

// ---------- complex scalars [re, im] ----------
export const c = (re, im = 0) => [re, im];
export const cadd = (a, b) => [a[0] + b[0], a[1] + b[1]];
export const csub = (a, b) => [a[0] - b[0], a[1] - b[1]];
export const cmul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
export const cscale = (a, s) => [a[0] * s, a[1] * s];
export const cdiv = (a, b) => { const n = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / n, (a[1] * b[0] - a[0] * b[1]) / n]; };
export const cabs = (a) => Math.hypot(a[0], a[1]);
export const cconj = (a) => [a[0], -a[1]];
export const cexp = (a) => { const e = Math.exp(a[0]); return [e * Math.cos(a[1]), e * Math.sin(a[1])]; };
export const ccos = (a) => [Math.cos(a[0]) * Math.cosh(a[1]), -Math.sin(a[0]) * Math.sinh(a[1])];
export const csin = (a) => [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])];
export const csqrt = (a) => { const r = cabs(a); const re = Math.sqrt(Math.max(0, (r + a[0]) / 2)); const im = Math.sqrt(Math.max(0, (r - a[0]) / 2)); return [re, a[1] < 0 ? -im : im]; };
export const cpowi = (a, n) => { let r = [1, 0]; const b = n < 0 ? cdiv([1, 0], a) : a; for (let k = 0; k < Math.abs(n); k++) r = cmul(r, b); return r; };

// ---------- complex 3-vectors (arrays of three complex scalars) ----------
export const vc = (a) => a.map((x) => [x, 0]);
export const vadd = (a, b) => a.map((x, k) => cadd(x, b[k]));
export const vsub = (a, b) => a.map((x, k) => csub(x, b[k]));
export const vscale = (a, s) => a.map((x) => cmul(x, s));
export const vdot = (a, b) => cadd(cadd(cmul(a[0], b[0]), cmul(a[1], b[1])), cmul(a[2], b[2])); // bilinear, no conjugate
export const vnorm = (a) => Math.sqrt(a.reduce((s, x) => s + x[0] * x[0] + x[1] * x[1], 0)); // Hermitian norm
export const vconj = (a) => a.map(cconj);

// ---------- own seeded PRNG (xorshift32) ----------
export function makeRng(seed) {
  let s = (seed >>> 0) || 1;
  const next = () => { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; };
  const gauss = () => { let u = 0; while (u === 0) u = next(); const v = next(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const unitVec = () => unit([gauss(), gauss(), gauss()]);
  return { next, gauss, unitVec };
}

// ---------- members ----------
// member: { m, u, up, phi, q } with u x up = m.
export function memberFromNormal(m, phi, q) {
  const e = Math.abs(m[2]) < 0.9 ? [0, 0, 1] : [1, 0, 0];
  const u = unit(sub(e, scale(m, dot(e, m))));
  return { m, u, up: cross(m, u), phi, q };
}
export function randomConfig(rng, q = [1, 1, 1, -1, -1, -1]) {
  return q.map((qi) => memberFromNormal(rng.unitVec(), 2 * Math.PI * rng.next(), qi));
}
// isotropic vector b_i = e^{i phi_i} (u_i - i u_i'), so X_i = (R/2)(z b_i + conj(b_i)/z), z = e^{i Omega T}
export function bVec(mem) {
  const ph = [Math.cos(mem.phi), Math.sin(mem.phi)];
  return [0, 1, 2].map((k) => cmul(ph, [mem.u[k], -mem.up[k]]));
}
// pair invariants: A, alpha, C, kappa from b_i . b_j = 2 A e^{i alpha}, Re(b_i . conj b_j) = 2 C
export function pairInvariants(mi, mj) {
  const bi = bVec(mi), bj = bVec(mj);
  const bb = vdot(bi, bj); const bbc = vdot(bi, vconj(bj));
  const A = cabs(bb) / 2; const alpha = Math.atan2(bb[1], bb[0]); const C = bbc[0] / 2;
  return { A, alpha, C, kappa: (1 - C) / A, Anormal: 0.5 * (1 - dot(mi.m, mj.m)) };
}

// ---------- kinematics at complex T ----------
export function stateC(mem, Omega, R, T) {
  const th = cadd(cscale(T, Omega), [mem.phi, 0]);
  const co = ccos(th), si = csin(th);
  const X = [0, 1, 2].map((k) => cscale(cadd(cscale(co, mem.u[k]), cscale(si, mem.up[k])), R));
  const V = [0, 1, 2].map((k) => cscale(cadd(cscale(si, -mem.u[k]), cscale(co, mem.up[k])), R * Omega));
  const Acc = X.map((x) => cscale(x, -Omega * Omega));
  return { X, V, Acc };
}
// D = d^2 and its first two absolute-time derivatives from the prescribed history
export function pairD(si, sj) {
  const dX = vsub(si.X, sj.X), dV = vsub(si.V, sj.V), dA = vsub(si.Acc, sj.Acc);
  return { dX, D: vdot(dX, dX), Dd: cscale(vdot(dX, dV), 2), Ddd: cscale(cadd(vdot(dV, dV), vdot(dX, dA)), 2) };
}
// entire numerator E_ij(T) = sigma [(1 + D''/2) D - 3 D'^2 / 8] (X_i - X_j); w_ij (X_i - X_j) = s^-5 E_ij, s = sqrt(D)
export function pairE(sigma, pd) {
  const scal = csub(cmul(cadd([1, 0], cscale(pd.Ddd, 0.5)), pd.D), cscale(cmul(pd.Dd, pd.Dd), 3 / 8));
  return vscale(pd.dX, cscale(scal, sigma));
}

// ---------- real-time closed-system residual, direct from d, d', d'' (no closed form in tau) ----------
export function closedF(members, Omega, R, T) {
  const st = members.map((m) => stateC(m, Omega, R, [T, 0]));
  const X = st.map((s) => s.X.map((x) => x[0])), V = st.map((s) => s.V.map((x) => x[0]));
  const F = [];
  for (let i = 0; i < members.length; i++) {
    let f = scale(X[i], Omega * Omega);
    for (let j = 0; j < members.length; j++) {
      if (j === i) continue;
      const dx = sub(X[i], X[j]); const d = norm(dx); const e = scale(dx, 1 / d);
      const w = sub(V[i], V[j]); const dd = dot(e, w);
      const ddd = -Omega * Omega * dot(e, dx) + (dot(w, w) - dd * dd) / d;
      const sig = members[i].q * members[j].q;
      f = add(f, scale(dx, (sig / (d * d * d)) * (1 - dd * dd / 2 + d * ddd)));
    }
    F.push(f);
  }
  return { F, X, V };
}
// closed form of the pair weight in tau (the formula of the treatment, with the R-dependence explicit)
export function wClosedForm(mi, mj, Omega, R, T) {
  const inv = pairInvariants(mi, mj);
  const tau = 2 * Omega * T + inv.alpha;
  const D = 2 * R * R * (1 - inv.C - inv.A * Math.cos(tau));
  const sig = mi.q * mj.q;
  return sig * ((1 + 4 * Omega * Omega * R * R * inv.A * Math.cos(tau)) * Math.pow(D, -1.5) - 6 * Omega * Omega * R ** 4 * inv.A * inv.A * Math.sin(tau) ** 2 * Math.pow(D, -2.5));
}

// ---------- continuation of sqrt(D_ij) along a path in complex T ----------
// tracker for member i: s[j] = continued sqrt(D_ij); start on the real axis with the positive root.
export function makeTracker(members, Omega, R, i, T0real) {
  const st = members.map((m) => stateC(m, Omega, R, [T0real, 0]));
  const s = members.map((_, j) => (j === i ? null : csqrt(pairD(st[i], st[j]).D)));
  return { i, T: [T0real, 0], s, maxJump: 0 };
}
function advance(members, Omega, R, tr, Tnew, depth = 0) {
  const st = members.map((m) => stateC(m, Omega, R, Tnew));
  const sNew = []; let jump = 0;
  for (let j = 0; j < members.length; j++) {
    if (j === tr.i) { sNew.push(null); continue; }
    let r = csqrt(pairD(st[tr.i], st[j]).D);
    if (cabs(csub(r, tr.s[j])) > cabs(cadd(r, tr.s[j]))) r = cscale(r, -1);
    jump = Math.max(jump, cabs(csub(r, tr.s[j])) / cabs(r));
    sNew.push(r);
  }
  if (jump > 0.05 && depth < 40) {
    const mid = cscale(cadd(tr.T, Tnew), 0.5);
    advance(members, Omega, R, tr, mid, depth + 1);
    advance(members, Omega, R, tr, Tnew, depth + 1);
    return;
  }
  tr.maxJump = Math.max(tr.maxJump, jump);
  tr.s = sNew; tr.T = Tnew;
}
export function walkTo(members, Omega, R, tr, Tend, nSteps = 400) {
  const T0 = tr.T;
  for (let k = 1; k <= nSteps; k++) advance(members, Omega, R, tr, cadd(T0, cscale(csub(Tend, T0), k / nSteps)));
}
// F_i at the tracker's current complex time with the continued roots; also returns each pair term
export function complexF(members, Omega, R, tr) {
  const i = tr.i; const st = members.map((m) => stateC(m, Omega, R, tr.T));
  let F = vscale(st[i].X, [Omega * Omega, 0]); const terms = [];
  for (let j = 0; j < members.length; j++) {
    if (j === i) { terms.push(null); continue; }
    const pd = pairD(st[i], st[j]);
    const E = pairE(members[i].q * members[j].q, pd);
    const t = vscale(E, cpowi(tr.s[j], -5));
    terms.push({ term: t, E, D: pd.D, dX: pd.dX });
    F = vadd(F, t);
  }
  return { F, terms, Xi: st[i].X };
}
// upper-half-plane branch point of pair (i, j): tau = i arccosh(kappa), T* = (-alpha + i arccosh kappa) / (2 Omega)
export function branchPoint(mi, mj, Omega) {
  const inv = pairInvariants(mi, mj);
  return { Tstar: [-inv.alpha / (2 * Omega), Math.acosh(inv.kappa) / (2 * Omega)], inv };
}
