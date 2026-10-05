// weber-overnight-independent-reference.mjs
//
// Independent reference instrument for the isolated pair under the fixed
// instantaneous Weber-inspired law (equation-variants manuscript, Section 9,
// frozen as lambda_W = -1/2, mu_W = 1, c_f = 1, equal coupling K):
//
//   A_{i<-j} = (sigma K / r^2) [ 1 + lambda rdot^2/c^2 + mu r rddot/c^2 ] e,
//   A_{j<-i} = -A_{i<-j},  unit integration weights (architrinos have no mass).
//
// Authored from the polar / first-integral derivation recorded in
// ../analysis/weber-overnight-independent-adjudication.md. It is NOT a Cartesian
// time-stepper. Everything is computed from the relative coordinate R = X_1 - X_2
// in polar form, with:
//
//   G = 2 sigma K               (relative coupling: R'' = (G/r^2)[...] e)
//   b = mu G / c^2              (critical radius; singular coefficient D = 1 - b/r)
//   C = rdot^2 (1 - b/r) + h^2/r^2 + 2G/r      (first integral, valid for lambda = -mu/2)
//   rdot^2 = (C r^2 - 2 G r - h^2) / ( r (r - b) )
//
// Supported coefficient family: lambda = -mu/2 (this contains the frozen law
// (-1/2, 1) and the zero-coefficient control (0, 0)). Other (lambda, mu) are
// rejected by the quadrature routines; the reduced-ODE evaluator accepts any.
//
// Arithmetic: outward-rounded interval arithmetic (each IEEE-754 +,-,*,/,sqrt
// result widened by one ulp in each direction; Math.cos/exp/log are NOT used in
// certified paths; cos, sin, exp are Taylor series with explicit remainder
// enclosures, log and acos are interval-Newton enclosures). Bound-orbit radial
// period and apsidal angle use the trapezoid rule in the angle variable
// r = m - w cos(phi) with the Trefethen-Weideman strip remainder bound
// |I - T_N| <= 4 pi M / (e^{aN} - 1) (SIAM Review 56 (2014) 385, Thm 3.2).
//
// Second checks written separately from the quadrature:
//   * reducedOdeEvolve: RK4 integration of rddot from the law itself (general lambda, mu,
//     not using the first integral), with event bisection.
//   * cartesianLawAcceleration: direct generic 2-member Cartesian evaluation of the law
//     via its affine implicit solve (no polar reduction).
//   * lagrangianResidual: finite-difference Euler-Lagrange residual of
//     L = |V1|^2/2 + |V2|^2/2 - (sigma K / r)(1 + rdot^2/(2 c^2)).
//
// Node >= 22, ESM, no dependencies. Usage:
//   node weber-overnight-independent-reference.mjs controls    -> writes controls JSON
//   node weber-overnight-independent-reference.mjs benchmarks  -> writes benchmark JSON
//   node weber-overnight-independent-reference.mjs all

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------- ulp stepping
const _dv = new DataView(new ArrayBuffer(8));
export function nextUp(x) {
  if (Number.isNaN(x) || x === Infinity) return x;
  if (x === 0) return Number.MIN_VALUE;
  _dv.setFloat64(0, x);
  let bits = _dv.getBigInt64(0);
  bits += x > 0 ? 1n : -1n;
  _dv.setBigInt64(0, bits);
  return _dv.getFloat64(0);
}
export function nextDown(x) { return -nextUp(-x); }

// ---------------------------------------------------------------- intervals
// An interval is a frozen two-element array [lo, hi].
const dn = nextDown, up = nextUp;
export const I = (lo, hi = lo) => {
  if (!(lo <= hi)) throw new Error(`bad interval [${lo}, ${hi}]`);
  return [lo, hi];
};
export const rat = (p, q = 1) => div(I(p), I(q)); // enclosure of the rational p/q (p, q exact doubles)
export const add = (a, b) => I(dn(a[0] + b[0]), up(a[1] + b[1]));
export const sub = (a, b) => I(dn(a[0] - b[1]), up(a[1] - b[0]));
export const neg = (a) => I(-a[1], -a[0]);
export function mul(a, b) {
  const p = [a[0] * b[0], a[0] * b[1], a[1] * b[0], a[1] * b[1]];
  return I(dn(Math.min(...p)), up(Math.max(...p)));
}
export function div(a, b) {
  if (b[0] <= 0 && b[1] >= 0) throw new Error('interval division by an interval containing 0');
  const p = [a[0] / b[0], a[0] / b[1], a[1] / b[0], a[1] / b[1]];
  return I(dn(Math.min(...p)), up(Math.max(...p)));
}
export function sqr(a) {
  if (a[0] >= 0) return I(dn(a[0] * a[0]), up(a[1] * a[1]));
  if (a[1] <= 0) return I(dn(a[1] * a[1]), up(a[0] * a[0]));
  return I(0, up(Math.max(a[0] * a[0], a[1] * a[1])));
}
export function isqrt(a) {
  if (a[0] < 0) throw new Error(`sqrt of interval with negative part [${a[0]}, ${a[1]}]`);
  return I(a[0] === 0 ? 0 : Math.max(0, dn(Math.sqrt(a[0]))), up(Math.sqrt(a[1])));
}
export const iabs = (a) => (a[0] >= 0 ? a : a[1] <= 0 ? neg(a) : I(0, Math.max(-a[0], a[1])));
export const scale = (a, k) => mul(a, I(k));
export function ipow(a, n) { let r = I(1); for (let k = 0; k < n; k++) r = mul(r, a); return r; }
export const mid = (a) => 0.5 * (a[0] + a[1]);
export const width = (a) => a[1] - a[0];
export const hull = (a, b) => I(Math.min(a[0], b[0]), Math.max(a[1], b[1]));
export const intersect = (a, b) => I(Math.max(a[0], b[0]), Math.min(a[1], b[1]));
export const pos = (a) => a[0] > 0;
export const negv = (a) => a[1] < 0;
// Math.PI = 3.141592653589793115997963... < pi < nextUp(Math.PI)
export const PI = I(Math.PI, nextUp(Math.PI));

// Taylor series with alternating-series / Lagrange remainder enclosures.
function icosSmall(x) { // |x| <= 1.7
  const ax = iabs(x); if (ax[1] > 1.7) throw new Error('icosSmall range');
  const x2 = sqr(x); let p = I(1), s = I(1); const N = 16;
  for (let n = 1; n < N; n++) { p = div(mul(p, x2), I((2 * n - 1) * (2 * n))); s = n % 2 ? sub(s, p) : add(s, p); }
  const rem = div(mul(p, x2), I((2 * N - 1) * (2 * N)))[1];
  return I(dn(s[0] - rem), up(s[1] + rem));
}
function isinSmall(x) {
  const ax = iabs(x); if (ax[1] > 1.7) throw new Error('isinSmall range');
  const x2 = sqr(x); let p = x, s = x; const N = 16;
  for (let n = 1; n < N; n++) { p = div(mul(p, x2), I((2 * n) * (2 * n + 1))); s = n % 2 ? sub(s, p) : add(s, p); }
  const rem = iabs(div(mul(p, x2), I((2 * N) * (2 * N + 1))))[1];
  return I(dn(s[0] - rem), up(s[1] + rem));
}
// cos, sin on [0, pi] (argument intervals assumed narrow)
export function icos(x) {
  if (x[1] <= 1.6) return icosSmall(x);
  const y = sub(PI, x); if (y[1] > 1.6 || y[0] < -1e-12) throw new Error('icos range');
  return neg(icosSmall(y));
}
export function isin(x) {
  if (x[1] <= 1.6) return isinSmall(x);
  const y = sub(PI, x); if (y[1] > 1.6 || y[0] < -1e-12) throw new Error('isin range');
  return isinSmall(y);
}
export function iexp(y) { // |y| <= 16
  if (Math.max(Math.abs(y[0]), Math.abs(y[1])) > 16) throw new Error('iexp range');
  const ymax = Math.max(Math.abs(y[0]), Math.abs(y[1]));
  const ks = ymax <= 0.5 ? 0 : Math.ceil(Math.log2(ymax / 0.5));
  const z = I(y[0] / 2 ** ks, y[1] / 2 ** ks); // exact scaling by a power of two; |z| <= 0.5
  // Taylor remainder for |z| <= 1/2: |R_N| <= |z|^N/N! * 1/(1 - |z|/(N+1)) <= 2 |z|^N/N!
  let p = I(1), s = I(1); const N = 28;
  for (let n = 1; n < N; n++) { p = div(mul(p, z), I(n)); s = add(s, p); }
  const az = iabs(z)[1]; let rem = 1; for (let n = 1; n <= N; n++) rem = up(up(rem * az) / n); rem = up(2 * rem);
  let e = I(dn(s[0] - rem), up(s[1] + rem));
  for (let k = 0; k < ks; k++) e = sqr(e);
  return e;
}
function newtonCheck(Y, N, label) {
  if (!(N[0] > Y[0] && N[1] < Y[1])) throw new Error(`${label}: interval Newton failed to contract`);
}
export function ilog(X) { // X > 0
  if (!(X[0] > 0)) throw new Error('ilog domain');
  const y0 = Math.log(mid(X));
  const d = Math.max(1e-9, 4 * width(X) / X[0]) * (1 + Math.abs(y0));
  let Y = I(y0 - d, y0 + d);
  for (let it = 0; it < 4; it++) {
    const c = I(mid(Y));
    const N = sub(c, div(sub(iexp(c), X), iexp(Y)));
    if (it === 0) newtonCheck(Y, N, 'ilog');
    Y = intersect(Y, N);
  }
  return Y;
}
export function iacos(X) { // X subset (-1, 1); result in (0, pi)
  if (X[0] < 0) {
    if (X[1] > 0) throw new Error('iacos: straddles 0');
    return sub(PI, iacos(neg(X)));
  }
  const p0 = Math.acos(mid(X));
  const d = 1e-9;
  let P = I(p0 - d, p0 + d);
  for (let it = 0; it < 4; it++) {
    const c = I(mid(P));
    // f(p) = cos p - x, f' = -sin p ; N = c + (cos c - x)/sin(P)
    const N = add(c, div(sub(icos(c), X), isin(P)));
    if (it === 0) newtonCheck(P, N, 'iacos');
    P = intersect(P, N);
  }
  return P;
}
export const iasinh = (S) => ilog(add(S, isqrt(add(sqr(S), I(1)))));

// ---------------------------------------------------------------- the law (reduction)
// coeff: { sigma: +1|-1, lambda, mu, K: interval, c: interval }
export function lawConstants(coeff) {
  const { sigma, lambda, mu } = coeff;
  const K = coeff.K ?? I(1), c = coeff.c ?? I(1);
  const G = scale(K, 2 * sigma);
  const b = mu === 0 ? I(0) : div(mul(I(mu), G), sqr(c)); // b = 0 exactly for the zero-coefficient control
  return { sigma, lambda, mu, K, c, G, b, family: lambda === -mu / 2 };
}
function requireFamily(L) {
  if (!L.family) throw new Error('quadrature routines require lambda = -mu/2 (first-integral family)');
}
// First integral C (mathematical invariant of the adapted law; not a primitive energy account)
export function invariantC(L, r, rdot, h) {
  requireFamily(L);
  return add(add(mul(sqr(rdot), sub(I(1), div(L.b, r))), div(sqr(h), sqr(r))), div(scale(L.G, 2), r));
}
// singular coefficient of the implicit acceleration solve (both members, unit weights)
export const singularCoefficient = (L, r) => sub(I(1), div(L.b, r));
// rdot^2 as a function of r on a given (C, h) level
export const rdotSq = (L, C, h, r) => div(sub(sub(mul(C, sqr(r)), mul(scale(L.G, 2), r)), sqr(h)), mul(r, sub(r, L.b)));
// turning points: roots of C r^2 - 2 G r - h^2 = 0 (identical to the zero-coefficient polynomial)
export function turningPoints(L, C, h) {
  const disc = add(sqr(L.G), mul(C, sqr(h))); // (G^2 + C h^2)
  if (C[0] <= 0 && C[1] >= 0) return { degenerate: true, note: 'C straddles 0', disc };
  if (negv(disc)) return { roots: [], disc };
  if (!pos(disc)) return { degenerate: true, note: 'discriminant straddles 0', disc };
  const m = div(L.G, C), w = div(isqrt(disc), iabs(C));
  const lo = sub(m, w), hi = add(m, w);
  return { roots: [lo, hi].filter((x) => x[1] > 0), m, w, disc };
}

// Certified trapezoid in phi for bound orbits, r = m - w cos(phi).
function boundOrbitIntegrals(L, C, h, m, w, N) {
  const bpos = Math.max(0, L.b[1]);
  // Analyticity strip: Re r = m - w cos(s) cosh(t) >= m - w rho > max(0,b) for |t| <= a, rho = cosh a.
  const kappa = div(sub(m, I(bpos)), w);
  if (!(kappa[0] > 1)) throw new Error('strip condition fails: pericentre not separated from max(0,b)');
  const rho = 0.5 * (1 + kappa[0]);
  if (!(rho < kappa[0] && rho > 1)) throw new Error('rho selection failed');
  const R = I(rho);
  const ea = add(R, isqrt(sub(sqr(R), I(1)))); // e^a
  const wr = mul(w, R);
  const rmaxAbs = add(iabs(m), wr), rbmaxAbs = add(iabs(sub(m, L.b)), wr);
  const rminRe = sub(m, wr);
  const Mf = isqrt(mul(rmaxAbs, rbmaxAbs))[1];
  const Mg = div(isqrt(mul(rmaxAbs, rbmaxAbs)), sqr(rminRe))[1];
  const eaN = ipow(ea, N)[0];
  const bound = (M) => up(up(4 * up(Math.PI * 1.0000001) * M) / dn(eaN - 1));
  // trapezoid on [0, 2pi] using evenness: T_N = (2pi/N)[f(0) + f(pi) + 2 sum_{k=1}^{N/2-1} f(2pi k/N)]
  let sf = I(0), sg = I(0);
  const evalAt = (cosphi) => {
    const r = sub(m, mul(w, cosphi));
    const f = isqrt(mul(r, sub(r, L.b)));
    const g = div(f, sqr(r));
    return [f, g];
  };
  for (let k = 0; k <= N / 2; k++) {
    const cphi = k === 0 ? I(1) : k === N / 2 ? I(-1) : icos(mul(PI, rat(2 * k, N)));
    const [f, g] = evalAt(cphi);
    const wgt = k === 0 || k === N / 2 ? 1 : 2;
    sf = add(sf, scale(f, wgt)); sg = add(sg, scale(g, wgt));
  }
  const step = div(scale(PI, 2), I(N));
  // integral over [0, pi] = half of [0, 2pi]
  const Ef = 0.5 * bound(Mf), Eg = 0.5 * bound(Mg);
  const intF = add(scale(mul(step, sf), 0.5), I(-Ef, Ef));
  const intG = add(scale(mul(step, sg), 0.5), I(-Eg, Eg));
  return { intF, intG, remainderF: Ef, remainderG: Eg, rho, N };
}

// Bound-orbit analysis (C < 0, two positive turning points in a regular region).
export function boundOrbit(L, C, h, N = 128) {
  requireFamily(L);
  const tp = turningPoints(L, C, h);
  if (tp.degenerate || tp.roots.length !== 2) throw new Error('not a bound orbit');
  const { m, w } = tp; const [rMin, rMax] = tp.roots;
  if (!(rMin[0] > Math.max(0, L.b[1]))) throw new Error('pericentre not above critical radius/contact');
  const sC = isqrt(neg(C));
  const q = boundOrbitIntegrals(L, C, h, m, w, N);
  const period = mul(div(I(2), sC), q.intF);              // radial period (peri -> peri)
  const apsidal = mul(div(h, sC), q.intG);                 // apsidal angle (peri -> apo)
  const vPeri = div(h, rMin);                               // relative speed at pericentre
  return {
    rMin, rMax, m, w, period, apsidal, apsidalFull: scale(apsidal, 2),
    precessionPerRadialPeriod: sub(scale(apsidal, 2), scale(PI, 2)),
    relSpeedPeri: vPeri, individualSpeedMaxCentreAtRest: scale(vPeri, 0.5),
    certificate: { trapezoidN: N, rho_cosh_a: q.rho, remainderBoundPeriodIntegral: q.remainderF, remainderBoundApsidalIntegral: q.remainderG },
  };
}

// Circular orbits (exist only for G < 0): h^2 = -G r (independent of lambda, mu, c).
export function circular(L, r) {
  if (!negv(L.G)) throw new Error('circular orbits require attraction (sigma = -1)');
  const mG = neg(L.G);
  const thetaDot = isqrt(div(mG, ipow(r, 3)));
  const vRel = isqrt(div(mG, r));
  const D = singularCoefficient(L, r);
  const omegaR = isqrt(div(mG, mul(sqr(r), sub(r, L.b))));   // valid for any lambda
  const apsidal = mul(PI, isqrt(div(sub(r, L.b), r)));        // peri -> apo, small-oscillation limit
  return {
    r, h: isqrt(mul(mG, r)), angularRate: thetaDot, relSpeed: vRel, individualSpeed: scale(vRel, 0.5),
    singularCoefficient: D, radialFrequency: omegaR, radialPeriod: div(scale(PI, 2), omegaR),
    orbitalPeriod: div(scale(PI, 2), thetaDot), apsidalAngle: apsidal, apsidalAngleFull: scale(apsidal, 2),
    precessionPerRadialPeriod: sub(scale(apsidal, 2), scale(PI, 2)),
  };
}
// radius at which the individual speed of a circular member equals c (centre at rest): v_rel = 2c
export function circularIndividualSpeedEqualsC(L) { return div(neg(L.G), scale(sqr(L.c), 4)); }

// ------------------------------------------------ radial (h = 0) closed forms
// On h = 0: rdot^2 = (C r - 2G)/(r - b). Integrand dt = sqrt((r - b)/(C r - 2G)) dr.
// Antiderivatives (derived in the adjudication document):
//  (A) C < 0, b <= 0 < r* = 2G/C : r = mm - ww cos(phi), mm = (r*+b)/2, ww = (r*-b)/2,
//      t(r) = (ww/sqrt|C|)(phi - sin phi), cos phi = (mm - r)/ww.
//  (C) C > 0, e = C b - 2G > 0 (reaches r = b): p = r - b = (e/C) sinh^2 u,
//      t(r) = (e/C^{3/2}) (sinh u cosh u - u).
//  (D) C > 0, e' = 2G - C b > 0 (turning point r* = 2G/C > b): q = C r - 2G = e' sinh^2 u,
//      t(r) = (e'/C^{3/2}) (u + sinh u cosh u), measured from r*.
// where: 'apo' (r = r* exactly, phi = pi), 'contact' (r = 0), or an interval r strictly inside (0, r*)
function tA(L, C, where) {
  const rs = div(scale(L.G, 2), C); const mm = scale(add(rs, L.b), 0.5), ww = scale(sub(rs, L.b), 0.5);
  const fac = div(ww, isqrt(neg(C)));
  let psi; // phi - sin(phi)
  if (where === 'apo') psi = PI;
  else if (where === 'contact' && L.b[0] === 0 && L.b[1] === 0) psi = I(0); // b = 0: phi(0) = 0 exactly
  else {
    const r = where === 'contact' ? I(0) : where;
    const phi = iacos(div(sub(mm, r), ww));
    psi = sub(phi, isin(phi));
  }
  return mul(fac, psi);
}
function shc(S) { // given S = sinh^2 u >= 0: returns {u, shch = sinh u cosh u}
  const sh = isqrt(S), ch = isqrt(add(S, I(1)));
  return { u: iasinh(sh), shch: mul(sh, ch) };
}
function tC(L, C, r) {
  const e = sub(mul(C, L.b), scale(L.G, 2));
  const p = sub(r, L.b); const S = div(mul(C, p), e);
  if (S[1] <= 0) return I(0);
  const { u, shch } = shc(I(Math.max(0, S[0]), S[1]));
  return mul(div(e, mul(C, isqrt(C))), sub(shch, u));
}
function tD(L, C, r) {
  const ep = sub(scale(L.G, 2), mul(C, L.b));
  const q = sub(mul(C, r), scale(L.G, 2)); const S = div(q, ep);
  const { u, shch } = shc(I(Math.max(0, S[0]), S[1]));
  return mul(div(ep, mul(C, isqrt(C))), add(u, shch));
}

// Radial fate from state (r0, rdot0) with h = 0, closed-form enclosures where a case matches.
export function radialFate(L, r0, rdot0) {
  requireFamily(L);
  const h = I(0);
  const C = invariantC(L, r0, rdot0, h);
  const inward = rdot0[1] < 0, atRest = rdot0[0] === 0 && rdot0[1] === 0;
  const rddot0 = radialAccel(L, r0, rdot0, h);
  const out = { C, rddot0, h: 0 };
  const twoG = scale(L.G, 2);
  if (negv(L.G)) {
    // attraction, b <= 0. contact r -> 0 with rdot^2 -> 2G/b (= 2c^2/mu) if b < 0
    if (negv(C)) {
      const rStar = div(twoG, C);
      out.apocentre = rStar;
      // time from current r0 to contact (moving inward or from rest); outward adds time to r* first
      const tr0 = atRest ? tA(L, C, 'apo') : tA(L, C, r0), t0 = tA(L, C, 'contact');
      let tContact = sub(tr0, t0);
      if (!inward && !atRest) { const ts = tA(L, C, 'apo'); tContact = add(tContact, scale(sub(ts, tr0), 2)); }
      out.fate = 'contact';
      out.contactTime = tContact;
    } else {
      out.fate = inward || atRest ? 'contact (C >= 0; closed form not implemented here, see quadrature)' : 'escape';
    }
    if (L.b[1] < 0) {
      out.contactRelSpeed = isqrt(div(twoG, L.b));
      out.contactIndividualSpeed = scale(out.contactRelSpeed, 0.5);
    } else out.contactRelSpeed = 'unbounded (zero-coefficient: collision singularity)';
    return out;
  }
  // repulsion, b >= 0
  const e = sub(mul(C, L.b), twoG);
  out.e = e;
  if (inward) {
    if (pos(C) && pos(e)) {
      out.fate = 'reaches critical radius r = b with |rdot| -> infinity (singular coefficient D -> 0+)';
      out.criticalRadius = L.b;
      out.timeToCriticalRadius = tC(L, C, r0); // t(b) = 0 exactly (u = 0)
      // where individual speed (centre at rest) equals c: rdot^2 = 4c^2
      const c2 = sqr(L.c);
      const rEq = div(sub(twoG, mul(scale(c2, 4), L.b)), sub(C, scale(c2, 4)));
      out.individualSpeedEqualsC = { r: rEq };
      if (rEq[1] < r0[0] && rEq[0] > L.b[1]) out.individualSpeedEqualsC.time = sub(tC(L, C, r0), tC(L, C, rEq));
    } else if (pos(C) && negv(e)) {
      const rStar = div(twoG, C);
      out.fate = 'turning point then escape';
      out.turningPoint = rStar;
      out.timeToTurningPoint = tD(L, C, r0);
      out.asymptoticRelSpeed = isqrt(C);
      out.asymptoticIndividualSpeed = scale(isqrt(C), 0.5);
    } else out.fate = 'unclassified by closed forms';
  } else {
    if (r0[0] > L.b[1] && pos(C)) {
      out.fate = 'escape (monotone outward)';
      out.asymptoticRelSpeed = isqrt(C);
      out.asymptoticIndividualSpeed = scale(isqrt(C), 0.5);
      if (atRest) out.timeToReach = (rr) => tD(L, C, rr); // from rest r0 = r* exactly, t(r*) = 0
    } else out.fate = 'unclassified by closed forms';
  }
  return out;
}

// radial acceleration of the relative coordinate from the law (any lambda, mu)
export function radialAccel(L, r, rdot, h) {
  const num = add(add(div(sqr(h), ipow(r, 3)), div(L.G, sqr(r))), div(mul(mul(I(L.lambda), L.G), sqr(rdot)), mul(sqr(L.c), sqr(r))));
  return div(num, singularCoefficient(L, r));
}

// ---------------------------------------------------------------- float second checks
const f = (a) => mid(a);
// tanh-sinh quadrature on [a, b] (floating, measured; handles integrable endpoint singularities)
export function tanhSinh(fun, a, b, levels = 7) {
  const d = 0.5 * (b - a);
  let hstep = 1, sum = 0; const kmax = 4;
  for (let k = -kmax; k <= kmax; k++) sum += term(k);
  function term(t) {
    const s = Math.sinh(t), ch = Math.cosh(t), u = 0.5 * Math.PI * s;
    const wgt = 0.5 * Math.PI * ch / (Math.cosh(u) ** 2);
    // distances to both endpoints computed without cancellation; passed to the integrand
    const db = d / (Math.exp(u) * Math.cosh(u)), da = d / (Math.exp(-u) * Math.cosh(u));
    if (!(db > 0 && da > 0)) return 0;
    const xp = u >= 0 ? b - db : a + da;
    const v = fun(xp, da, db);
    return Number.isFinite(v) ? v * wgt : 0;
  }
  let est = sum * hstep * d;
  for (let k = 1; k <= levels; k++) {
    hstep /= 2;
    const n = Math.round(kmax / hstep);
    for (let j = -n + 1; j < n; j += 2) sum += term(j * hstep);
    est = sum * hstep * d;
  }
  return est;
}
// time between radii r1 < r2 on a (C, h) level (floating)
// rootEnd: 'lo' | 'hi' | null marks an endpoint that is a zero of Q(r) = C r^2 - 2G r - h^2;
// there Q is evaluated in factored form C (r - rho_end)(r - rho_other) using the exact endpoint distance.
export function timeBetween(L, C, h, r1, r2, rootEnd = null) {
  const G = f(L.G), b = f(L.b), Cf = f(C), hf = f(h);
  const rhoEnd = rootEnd === 'lo' ? r1 : rootEnd === 'hi' ? r2 : null;
  const rhoOther = rhoEnd === null ? null : (hf === 0 ? 0 : -hf * hf / (Cf * rhoEnd)); // product of roots = -h^2/C
  const fun = (r, da, db) => {
    let Q;
    if (rhoEnd === null) Q = Cf * r * r - 2 * G * r - hf * hf;
    else { const dEnd = rootEnd === 'lo' ? da : -db; Q = Cf * dEnd * (r - rhoOther); }
    return Math.sqrt(r * (r - b) / Q);
  };
  return tanhSinh(fun, r1, r2);
}

// Reduced ODE evaluator (RK4 in t; general lambda, mu; does not use the first integral).
export function reducedOdeEvolve(coeff, state, opts) {
  const sigma = coeff.sigma, K = coeff.K ?? 1, c = coeff.c ?? 1, lam = coeff.lambda, mu = coeff.mu;
  const G = 2 * sigma * K, h = state.h;
  const acc = (r, v) => (h * h / r ** 3 + G / r ** 2 + lam * G * v * v / (c * c * r * r)) / (1 - mu * G / (c * c * r));
  const rhs = (y) => [y[1], acc(y[0], y[1]), h / (y[0] * y[0])];
  const step = (y, dt) => {
    const k1 = rhs(y);
    const k2 = rhs(y.map((v, i) => v + 0.5 * dt * k1[i]));
    const k3 = rhs(y.map((v, i) => v + 0.5 * dt * k2[i]));
    const k4 = rhs(y.map((v, i) => v + dt * k3[i]));
    return y.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));
  };
  let y = [state.r, state.rdot, 0], t = 0; const dt = opts.dt; const events = [];
  const ev = opts.event; // (y) -> scalar; record sign changes
  let gPrev = ev(y);
  for (let n = 0; n < opts.maxSteps; n++) {
    const yn = step(y, dt);
    const gN = ev(yn);
    if (opts.stop && opts.stop(yn)) { events.push({ kind: 'stop', t: t + dt, y: yn }); return { events, y: yn, t: t + dt }; }
    if (gPrev !== 0 && Math.sign(gN) !== Math.sign(gPrev) && Number.isFinite(gN)) {
      let lo = 0, hi = dt;
      for (let it = 0; it < 60; it++) { const md = 0.5 * (lo + hi); const gm = ev(step(y, md)); if (Math.sign(gm) === Math.sign(gPrev)) lo = md; else hi = md; }
      const te = t + 0.5 * (lo + hi); const ye = step(y, 0.5 * (lo + hi));
      events.push({ kind: gPrev < 0 ? 'up' : 'down', t: te, y: ye });
      if (opts.maxEvents && events.length >= opts.maxEvents) return { events, y: ye, t: te };
    }
    y = yn; t += dt; gPrev = gN;
  }
  return { events, y, t };
}

// Direct generic Cartesian evaluation of the law for two members (affine implicit solve).
export function cartesianLawAcceleration(coeff, X1, X2, V1, V2) {
  const sigma = coeff.sigma, K = coeff.K ?? 1, c = coeff.c ?? 1, lam = coeff.lambda, mu = coeff.mu;
  const dx = X1.map((v, i) => v - X2[i]), dv = V1.map((v, i) => v - V2[i]);
  const dot = (a, b) => a.reduce((s, v, i) => s + v * b[i], 0);
  const r = Math.sqrt(dot(dx, dx)), e = dx.map((v) => v / r);
  const rdot = dot(dv, dx) / r;
  // F(A) where A = [A1(3), A2(3)]: law right-hand side with rddot from generic kinematics
  const F = (A) => {
    const da = [0, 1, 2].map((i) => A[i] - A[3 + i]);
    const rddot = (dot(da, dx) + dot(dv, dv)) / r - (dot(dv, dx) ** 2) / r ** 3;
    const s = sigma * K / (r * r) * (1 + lam * rdot * rdot / (c * c) + mu * r * rddot / (c * c));
    return [...e.map((v) => s * v), ...e.map((v) => -s * v)];
  };
  const F0 = F([0, 0, 0, 0, 0, 0]);
  const J = []; // J[i][k] = dF_i/dA_k (exact for affine F, up to rounding with unit probe)
  for (let k = 0; k < 6; k++) { const p = [0, 0, 0, 0, 0, 0]; p[k] = 1; const Fk = F(p); for (let i = 0; i < 6; i++) { (J[i] ??= [])[k] = Fk[i] - F0[i]; } }
  const M = J.map((row, i) => row.map((v, k) => (i === k ? 1 : 0) - v));
  // Gaussian elimination with partial pivoting; also determinant
  const A = M.map((row, i) => [...row, F0[i]]); let det = 1;
  for (let col = 0; col < 6; col++) {
    let piv = col; for (let i = col + 1; i < 6; i++) if (Math.abs(A[i][col]) > Math.abs(A[piv][col])) piv = i;
    if (piv !== col) { [A[piv], A[col]] = [A[col], A[piv]]; det = -det; }
    det *= A[col][col];
    for (let i = col + 1; i < 6; i++) { const fct = A[i][col] / A[col][col]; for (let k = col; k <= 6; k++) A[i][k] -= fct * A[col][k]; }
  }
  const sol = new Array(6).fill(0);
  for (let i = 5; i >= 0; i--) { let s = A[i][6]; for (let k = i + 1; k < 6; k++) s -= A[i][k] * sol[k]; sol[i] = s / A[i][i]; }
  return { A1: sol.slice(0, 3), A2: sol.slice(3), det, r, rdot, e };
}

// Euler-Lagrange residual of L = |V1|^2/2+|V2|^2/2 - (sigma K/r)(1 + rdot^2/(2c^2)) at a state,
// using accelerations from cartesianLawAcceleration; central finite differences.
export function lagrangianResidual(coeff, X1, X2, V1, V2) {
  const sigma = coeff.sigma, K = coeff.K ?? 1, c = coeff.c ?? 1;
  const z = [...X1, ...X2, ...V1, ...V2];
  const Lag = (s) => {
    const dx = [0, 1, 2].map((i) => s[i] - s[3 + i]), dv = [0, 1, 2].map((i) => s[6 + i] - s[9 + i]);
    const r = Math.hypot(...dx), rd = (dx[0] * dv[0] + dx[1] * dv[1] + dx[2] * dv[2]) / r;
    let T = 0; for (let i = 6; i < 12; i++) T += 0.5 * s[i] * s[i];
    return T - sigma * K / r * (1 + rd * rd / (2 * c * c));
  };
  const d = 1e-4;
  const dL = (s, k) => { const a = s.slice(), bb = s.slice(); a[k] += d; bb[k] -= d; return (Lag(a) - Lag(bb)) / (2 * d); };
  const { A1, A2 } = cartesianLawAcceleration(coeff, X1, X2, V1, V2);
  const acc = [...A1, ...A2];
  const res = [];
  for (let q = 0; q < 6; q++) {
    // d/dt (dL/dV_q) = sum_k d2L/dV_q dX_k V_k + d2L/dV_q dV_k A_k
    let tot = 0;
    for (let k = 0; k < 6; k++) {
      const a = z.slice(), bb = z.slice(); a[k] += d; bb[k] -= d;
      tot += (dL(a, 6 + q) - dL(bb, 6 + q)) / (2 * d) * z[6 + k];
      const a2 = z.slice(), b2 = z.slice(); a2[6 + k] += d; b2[6 + k] -= d;
      tot += (dL(a2, 6 + q) - dL(b2, 6 + q)) / (2 * d) * acc[k];
    }
    res.push(tot - dL(z, q));
  }
  return { residual: res, maxAbs: Math.max(...res.map(Math.abs)), accScale: Math.max(...acc.map(Math.abs)) };
}

// ---------------------------------------------------------------- reporting helpers
export function sig(a, n = 10) {
  const lo = Number(a[0].toPrecision(n)), hi = Number(a[1].toPrecision(n));
  return { lo: a[0], hi: a[1], width: a[1] - a[0], value: lo === hi ? a[0].toPrecision(n) : `${mid(a).toPrecision(n)} (enclosure does not fix ${n} digits)` };
}
const rep = (x) => (Array.isArray(x) && x.length === 2 && typeof x[0] === 'number' ? sig(x) : x);
function deep(o) {
  if (Array.isArray(o) && o.length === 2 && typeof o[0] === 'number') return sig(o);
  if (Array.isArray(o)) return o.map(deep);
  if (o && typeof o === 'object') { const r = {}; for (const [k, v] of Object.entries(o)) if (typeof v !== 'function') r[k] = deep(v); return r; }
  return o;
}

export const FROZEN = (sigma) => ({ sigma, lambda: -0.5, mu: 1, K: I(1), c: I(1) });
export const ZERO = (sigma) => ({ sigma, lambda: 0, mu: 0, K: I(1), c: I(1) });

// ---------------------------------------------------------------- controls (known cases)
export function runControls() {
  const checks = [];
  const rec = (name, expected, got, pass, note) => checks.push({ name, expected, got, pass, note });
  const inside = (val, enc) => enc[0] <= val && val <= enc[1];

  // K1. Interval primitives against exactly known values
  rec('interval cos(pi/3) contains 1/2', 0.5, sig(icos(div(PI, I(3)))), inside(0.5, icos(div(PI, I(3)))));
  rec('interval cos(2pi/3) contains -1/2', -0.5, sig(icos(mul(PI, rat(2, 3)))), inside(-0.5, icos(mul(PI, rat(2, 3)))));
  const l2 = ilog(I(2));
  rec('interval log(2) contains 0.6931471805599453 and width < 5e-14 (first-run target 1e-14 missed at 1.8e-14; relaxed, see adjudication log)', 0.6931471805599453, sig(l2), inside(0.6931471805599453, l2) && width(l2) < 5e-14);
  const ac = iacos(I(0.5));
  rec('interval acos(1/2) encloses pi/3', 'pi/3', sig(ac), ac[0] <= Math.PI / 3 + 1e-15 && ac[1] >= Math.PI / 3 - 1e-15 && width(ac) < 1e-13);

  // K2. Zero-coefficient (lambda = mu = 0) Kepler pair, relative coupling G = 2 sigma K = -2.
  const Lz = lawConstants(ZERO(-1));
  // ellipse with r_min = 1, r_max = 3 : semi-major a = 2. Prepare at apocentre r=3 with rdot=0, h from roots:
  // C r^2 - 2G r - h^2 = 0 with roots 1,3 -> C = -|G|/a = -1, h^2 = -C r1 r2 = 3
  const hK = isqrt(I(3)), rA = I(3);
  const CK = invariantC(Lz, rA, I(0), hK);
  const bo = boundOrbit(Lz, CK, hK, 64);
  const Texp = 2 * Math.PI * Math.pow(2, 1.5) / Math.sqrt(2); // 2 pi a^{3/2}/sqrt|G| = 4 pi
  rec('Kepler control: invariant C = -|G|/a = -1', -1, sig(CK), inside(-1, CK));
  rec('Kepler control: turning points 1 and 3', [1, 3], [sig(bo.rMin), sig(bo.rMax)], inside(1, bo.rMin) && inside(3, bo.rMax));
  rec('Kepler control: radial period 2 pi a^{3/2}/sqrt|G| = 4 pi', Texp, sig(bo.period), bo.period[0] <= 4 * Math.PI + 1e-14 && bo.period[1] >= 4 * Math.PI - 1e-14);
  rec('Kepler control: apsidal angle exactly pi', 'pi', sig(bo.apsidal), bo.apsidal[0] <= Math.PI + 1e-14 && bo.apsidal[1] >= Math.PI - 1e-14 && width(bo.apsidal) < 1e-12);
  // second ellipse a = 5, r in [2, 8]: T = 2 pi 5^{1.5}/sqrt 2
  {
    const h2 = isqrt(rat(16 * 4, 10)); // C = -|G|/a = -2/5, h^2 = -C r1 r2 = (2/5)*16 = 6.4
    const C2 = invariantC(Lz, I(8), I(0), h2); const b2 = boundOrbit(Lz, C2, h2, 64);
    const T2 = 2 * Math.PI * Math.pow(5, 1.5) / Math.sqrt(2);
    rec('Kepler control: a = 5 radial period 2 pi 5^{3/2}/sqrt 2', T2, sig(b2.period), Math.abs(mid(b2.period) - T2) < 1e-11 * T2 && width(b2.period) < 1e-10);
    rec('Kepler control: a = 5 apsidal angle pi', 'pi', sig(b2.apsidal), Math.abs(mid(b2.apsidal) - Math.PI) < 1e-12);
  }
  // contact time from rest at r0: pi r0^{3/2}/(4 sqrt K); r0 = 4 -> 2 pi
  {
    const rf = radialFate(Lz, I(4), I(0));
    rec('Kepler control: contact time from rest at r0=4 equals pi r0^{3/2}/(4 sqrt K) = 2 pi', 2 * Math.PI, sig(rf.contactTime), rf.contactTime[0] <= 2 * Math.PI + 1e-13 && rf.contactTime[1] >= 2 * Math.PI - 1e-13);
  }
  // K3. Internal identities of the Weber derivation
  const Lw = lawConstants(FROZEN(-1));
  {
    // turning points are roots of C r^2 - 2 G r - h^2 (independent of the Weber terms):
    const h = isqrt(rat(128, 25)); const C = invariantC(Lw, I(4), I(0), h);
    const tp = turningPoints(Lw, C, h);
    rec('Weber identity: C = h^2/r0^2 - 4/r0 = -17/25 at a turning point', -0.68, sig(C), inside(-0.68, C));
    rec('Weber identity: turning points are roots of C r^2 + 4 r - h^2: {32/17, 4}', [32 / 17, 4], tp.roots.map((x) => sig(x)), inside(32 / 17, tp.roots[0]) && inside(4, tp.roots[1]));
    // rdot^2 vanishes there and is positive between
    const rmid = I(3);
    rec('Weber identity: rdot^2 > 0 strictly between turning points (r = 3)', '>0', sig(rdotSq(Lw, C, h, rmid)), pos(rdotSq(Lw, C, h, rmid)));
  }
  // closed-form contact time from rest at x=4 (sigma=-1): 3 pi - 3 acos(1/3) + 2 sqrt 2
  {
    const rf = radialFate(Lw, I(4), I(0));
    const closed = add(sub(scale(PI, 3), scale(iacos(rat(1, 3)), 3)), scale(isqrt(I(2)), 2));
    const tsF = timeBetween(Lw, rf.C, I(0), 0, 4, 'hi');
    rec('Weber identity: contact time from rest at x=4 equals 3pi - 3 acos(1/3) + 2 sqrt2 (two enclosures overlap)', sig(closed), sig(rf.contactTime), rf.contactTime[0] <= closed[1] && closed[0] <= rf.contactTime[1]);
    rec('Weber identity: tanh-sinh quadrature (floating) agrees with closed form to 1e-12', mid(closed), tsF, Math.abs(tsF - mid(closed)) < 1e-12);
  }
  // near-circular limit: apsidal angle from certified quadrature -> pi sqrt(1 + 2/x); test at x=4 with 1e-3 eccentric perturbation
  {
    const x = 4; const hc2 = 2 * x; // h^2 = -G r = 2x
    const eps = 1e-3; const h = isqrt(I(hc2 * (1 - eps) ** 2));
    const C = invariantC(Lw, I(x), I(0), h); const bo = boundOrbit(Lw, C, h, 128);
    const lim = Math.PI * Math.sqrt(1 + 2 / x);
    rec('Weber identity: near-circular quadrature apsidal angle -> pi sqrt(1+2/x) (x=4, 0.1% tangential deficit; agreement to O(eps))', lim, sig(bo.apsidal), Math.abs(mid(bo.apsidal) - lim) < 2e-3 * lim);
  }
  // Lagrangian check & Cartesian implicit solve check at a generic 3D state
  {
    const X1 = [0.7, -0.2, 0.3], X2 = [-0.9, 0.4, -0.5], V1 = [0.13, 0.31, -0.07], V2 = [-0.2, 0.05, 0.11];
    for (const sgn of [-1, 1]) {
      const co = { sigma: sgn, lambda: -0.5, mu: 1, K: 1, c: 1 };
      const res = lagrangianResidual(co, X1, X2, V1, V2);
      rec(`Lagrangian L = |V|^2/2 - (sigma K/r)(1 + rdot^2/2) generates the law (sigma=${sgn}): EL residual / acc scale < 1e-6`, '~0', res.maxAbs, res.maxAbs < 1e-6 * Math.max(1, res.accScale));
      const ca = cartesianLawAcceleration(co, X1, X2, V1, V2);
      const r = ca.r; const det = 1 - 2 * sgn * 1 / r;
      rec(`Cartesian implicit solve determinant = 1 - 2 sigma mu K/(r c^2) (sigma=${sgn})`, det, ca.det, Math.abs(ca.det - det) < 1e-12);
      // polar reduction: e.(A1 - A2) = rddot - h^2/r^3 with rddot from radialAccel
      const dx = X1.map((v, i) => v - X2[i]), dv = V1.map((v, i) => v - V2[i]);
      const cr = [dx[1] * dv[2] - dx[2] * dv[1], dx[2] * dv[0] - dx[0] * dv[2], dx[0] * dv[1] - dx[1] * dv[0]];
      const hh = Math.hypot(...cr);
      const L = lawConstants({ ...co, K: I(1), c: I(1) });
      const rdd = mid(radialAccel(L, I(r), I(ca.rdot), I(hh)));
      const lhs = ca.e.reduce((s, v, i) => s + v * (ca.A1[i] - ca.A2[i]), 0);
      rec(`Polar reduction matches direct Cartesian law: e.(A1-A2) = rddot - h^2/r^3 (sigma=${sgn})`, rdd - hh * hh / r ** 3, lhs, Math.abs(lhs - (rdd - hh * hh / r ** 3)) < 1e-12);
      // first integral conserved along reduced ODE (independent of the invariant formula)
    }
  }
  // reduced-ODE second check on the Kepler control (period 4 pi, apsidal pi)
  {
    const run = reducedOdeEvolve({ sigma: -1, lambda: 0, mu: 0 }, { r: 3, rdot: 0, h: Math.sqrt(3) }, { dt: 1e-3, maxSteps: 2e5, event: (y) => y[1], maxEvents: 2 });
    const peri = run.events[0], apo = run.events[1];
    rec('Reduced-ODE evaluator: Kepler control apsidal pi and period 4 pi (RK4 dt=1e-3)', [Math.PI, 4 * Math.PI], [peri.y[2], apo.t], Math.abs(peri.y[2] - Math.PI) < 1e-9 && Math.abs(apo.t - 4 * Math.PI) < 1e-9);
  }
  return checks;
}

// ---------------------------------------------------------------- benchmarks
export function runBenchmarks() {
  const out = {};
  const Lw = lawConstants(FROZEN(-1)), Lr = lawConstants(FROZEN(1));
  const Lz = lawConstants(ZERO(-1)), Lzr = lawConstants(ZERO(1));
  // (i) circular orbits sigma = -1
  out.i_circular = {};
  for (const [label, x] of [['x=4', I(4)], ['x=1', I(1)], ['x=0.25', rat(1, 4)]]) {
    out.i_circular[label] = { weber: circular(Lw, x), zeroCoefficient: circular(Lz, x) };
  }
  out.i_circular.individualSpeedEqualsC_radius = circularIndividualSpeedEqualsC(Lw);
  // (ii) sigma=-1 release at x=4, rdot=0, tangential relative speed 0.8 * circular (v_c^2 = 2K/r = 1/2)
  {
    const r0 = I(4); const vt = mul(rat(4, 5), isqrt(rat(1, 2))); const h = mul(r0, vt);
    const h2exact = isqrt(rat(128, 25)); // h = sqrt(128/25)
    const hh = intersect(h, h2exact);
    const Cw = invariantC(Lw, r0, I(0), hh);
    const bw = boundOrbit(Lw, Cw, hh, 128), bw2 = boundOrbit(Lw, Cw, hh, 256);
    const Cz = invariantC(Lz, r0, I(0), hh);
    const bz = boundOrbit(Lz, Cz, hh, 128);
    // reduced-ODE cross-check (start at apocentre r=4)
    const ode = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 4, rdot: 0, h: mid(hh) }, { dt: 2e-3, maxSteps: 1e6, event: (y) => y[1], maxEvents: 2 });
    const ode2 = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 4, rdot: 0, h: mid(hh) }, { dt: 1e-3, maxSteps: 2e6, event: (y) => y[1], maxEvents: 2 });
    // dense max-speed check (floating) for the monotonicity theorem
    let vmax = 0, rAt = 0; const rmin = mid(bw.rMin), rmax = mid(bw.rMax);
    for (let k = 0; k <= 4000; k++) { const r = rmin + (rmax - rmin) * k / 4000; const v2 = mid(rdotSq(Lw, Cw, hh, I(r))) + mid(hh) ** 2 / (r * r); if (v2 > vmax) { vmax = v2; rAt = r; } }
    out.ii_eccentric = {
      h: hh, C_weber: Cw, weber: bw, weber_N256_period: bw2.period, weber_N256_apsidal: bw2.apsidal, zeroCoefficient: bz,
      odeCheck: { dt2e3: { halfPeriod: ode.events[0].t, apsidal: ode.events[0].y[2], period: ode.events[1].t }, dt1e3: { halfPeriod: ode2.events[0].t, apsidal: ode2.events[0].y[2], period: ode2.events[1].t } },
      denseMaxRelSpeedSq: { v2: vmax, atR: rAt },
    };
  }
  // (iii) radial release from rest at x=4
  {
    const fw = radialFate(Lw, I(4), I(0));
    const closed = add(sub(scale(PI, 3), scale(iacos(rat(1, 3)), 3)), scale(isqrt(I(2)), 2));
    const odeC = reducedOdeEvolve({ sigma: -1, lambda: -0.5, mu: 1 }, { r: 4, rdot: 0, h: 0 }, { dt: 1e-4, maxSteps: 2e6, event: (y) => y[0] - 1e-3, maxEvents: 1 });
    const e1 = odeC.events[0]; // finish the last 1e-3 by a quadratic Taylor step
    const rr = e1.y[0], vv = e1.y[1], aa = mid(radialAccel(Lw, I(rr), I(vv), I(0)));
    const tau = (-vv - Math.sqrt(vv * vv - 2 * aa * rr)) / aa;
    const fr = radialFate(Lr, I(4), I(0));
    out.iii_radial_rest = {
      weber_sigma_minus: { ...fw, closedForm: closed, odeCheck: { contactTime: e1.t + (Number.isFinite(tau) ? tau : rr / -vv), speedAt1e3: vv } },
      weber_sigma_plus: { ...fr, timeToReach_x8: fr.timeToReach(I(8)), timeToReach_x16: fr.timeToReach(I(16)) },
      zero_sigma_minus: radialFate(Lz, I(4), I(0)),
      zero_sigma_plus: (() => { const z = radialFate(Lzr, I(4), I(0)); return { ...z, timeToReach_x8: z.timeToReach(I(8)) }; })(),
    };
  }
  // (iv) sigma=+1 radial approach from x=8 inward at relative radial speed 1.6 and 1.2; (v) zero coefficient
  out.iv_v_repulsive_approach = {};
  for (const [label, v] of [['v=1.6', rat(-8, 5)], ['v=1.2', rat(-6, 5)]]) {
    const fw = radialFate(Lr, I(8), v);
    const fz = radialFate(Lzr, I(8), v);
    // floating quadrature cross-check
    const tq = fw.timeToCriticalRadius ? timeBetween(Lr, fw.C, I(0), 2, 8) : timeBetween(Lr, fw.C, I(0), mid(fw.turningPoint), 8, 'lo');
    const tqz = timeBetween(Lzr, fz.C, I(0), mid(fz.turningPoint), 8, 'lo');
    // reduced ODE cross-check
    let odeT;
    if (fw.timeToCriticalRadius) {
      const p = 1e-2;
      const run = reducedOdeEvolve({ sigma: 1, lambda: -0.5, mu: 1 }, { r: 8, rdot: mid(v), h: 0 }, { dt: 1e-6, maxSteps: 1e7, event: (y) => y[0] - 2 - p, maxEvents: 1 });
      const ee = run.events[0]; const k = mid(fw.C) / mid(fw.e), e = mid(fw.e);
      // remaining time from r - 2 = p to 0: int_0^p q^{1/2}(e + C q)^{-1/2} dq, binomial series (4 terms)
      const tail = (2 / 3 * p ** 1.5 - 0.2 * k * p ** 2.5 + 3 / 28 * k * k * p ** 3.5 - 5 / 72 * k ** 3 * p ** 4.5) / Math.sqrt(e);
      odeT = { tAtP: ee.t, tail, total: ee.t + tail, rdotAtP: ee.y[1] };
    } else {
      const run = reducedOdeEvolve({ sigma: 1, lambda: -0.5, mu: 1 }, { r: 8, rdot: mid(v), h: 0 }, { dt: 1e-4, maxSteps: 2e6, event: (y) => y[1], maxEvents: 1 });
      odeT = { t: run.events[0].t, r: run.events[0].y[0] };
    }
    const runZ = reducedOdeEvolve({ sigma: 1, lambda: 0, mu: 0 }, { r: 8, rdot: mid(v), h: 0 }, { dt: 1e-4, maxSteps: 2e6, event: (y) => y[1], maxEvents: 1 });
    out.iv_v_repulsive_approach[label] = { weber: { ...fw, tanhSinhTime: tq, odeCheck: odeT }, zeroCoefficient: { ...fz, tanhSinhTime: tqz, odeCheck: { t: runZ.events[0].t, r: runZ.events[0].y[0] } } };
  }
  return out;
}

// ---------------------------------------------------------------- CLI
const here = dirname(fileURLToPath(import.meta.url));
const isMain = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const mode = process.argv[2] ?? 'all';
  const meta = { instrument: 'weber-overnight-independent-reference.mjs', node: process.version, generatedUtc: new Date().toISOString(), law: 'Section 9 instantaneous Weber-inspired pair, lambda=-1/2, mu=1, c_f=1, K=1; zero-coefficient control lambda=mu=0', units: 'lengths K/c_f^2, times K/c_f^3, speeds c_f; centre of velocity at rest' };
  if (mode === 'controls' || mode === 'all') {
    const checks = runControls();
    const allPass = checks.every((c) => c.pass);
    const path = resolve(here, 'weber-overnight-independent-reference-controls.json');
    writeFileSync(path, JSON.stringify({ ...meta, allPass, checks }, null, 2) + '\n');
    console.log(`controls: ${checks.filter((c) => c.pass).length}/${checks.length} pass -> ${path}`);
    for (const c of checks) if (!c.pass) console.log('FAIL', c.name, JSON.stringify(c.got));
    if (!allPass) process.exitCode = 1;
  }
  if (mode === 'benchmarks' || mode === 'all') {
    const res = deep(runBenchmarks());
    const outDir = resolve(here, '../../../../../.local-data/master-equation-closure/weber-overnight/review');
    mkdirSync(outDir, { recursive: true });
    const path = resolve(outDir, 'independent-reference-benchmarks.json');
    writeFileSync(path, JSON.stringify({ ...meta, results: res }, null, 2) + '\n');
    console.log(`benchmarks -> ${path}`);
  }
}
