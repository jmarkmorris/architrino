#!/usr/bin/env node
// darwin-overnight independent reference instrument (lens: ramon-e-moore).
// Blind reference for the frozen Darwin-inspired pair law (Section 10 functional,
// unit weights, inverse-distance pair term, velocity coupling 1/(2 c_f^2), c_f = K = 1).
//
// Route: NOT a Cartesian ODE integrator. The pair functional is written in centre and
// relative coordinates, L = U^T (I+M) U + (1/4) u^T (I-M) u - sigma/r, with
// M = (sigma/(2r)) (I + e e^T). On the mirror manifold (U = 0, enforced by the conserved
// generalized momentum sum) the reduced planar problem in polar coordinates is
//   L_red = (1/4) a(r) rdot^2 + (1/4) h(r) thetadot^2 - sigma/r,
//   a(r) = 1 - c sigma / r,   h(r) = b(r) r^2,   b(r) = 1 - c sigma/(2r),
// with c = 1 (frozen law) or c = 0 (zero-coupling known case). Invariants:
//   ell = (1/2) h(r) thetadot,   E = (1/4) a rdot^2 + ell^2/h(r) + sigma/r.
// Every reference value below comes from these quadratures, closed forms and root finding,
// with two independent quadrature rules (Gauss-Legendre and Romberg) and a reported bracket.
//
// Usage: node darwin-overnight-independent-reference.mjs
// Writes: darwin-overnight-independent-reference-controls.json next to this file.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, 'darwin-overnight-independent-reference-controls.json');
const RUNTIME_DIR = join(HERE, '..', '..', '..', '..', '..', '.local-data', 'master-equation-closure', 'darwin-overnight', 'reference');

// ---------- declared parameters (the preregistration may change these two) ----------
const SPEED_BOUND = 0.1;      // provisional approximation-domain speed bound
const EPS_BOUND = 0.05;       // provisional approximation-domain bound on K/(c_f^2 r)
const CF = 1.0;               // wake speed, normalized
const K = 1.0;                // coupling, fixed

// ---------- reduced-problem coefficient functions ----------
const mk = (sigma, c) => ({
  sigma, c,
  a: (r) => 1 - c * sigma / r,                // radial mirror-mode Hessian eigenvalue
  b: (r) => 1 - c * sigma / (2 * r),          // transverse mirror-mode Hessian eigenvalue
  h: (r) => r * r - c * sigma * r / 2,        // b(r) r^2
  hp: (r) => 2 * r - c * sigma / 2,           // h'(r)
  hpp: () => 2,
  // full 6x6 velocity-Hessian eigenvalues at separation r (sum modes = common-centre, diff modes = mirror)
  hessianEigs: (r) => ({
    sumRadial: 1 + c * sigma / r, sumTransverse: 1 + c * sigma / (2 * r),
    diffRadial: 1 - c * sigma / r, diffTransverse: 1 - c * sigma / (2 * r),
  }),
});

// ---------- quadrature rule 1: Gauss-Legendre (nodes by Newton on P_n) ----------
function gaussLegendre(n) {
  const x = new Array(n), w = new Array(n);
  for (let i = 0; i < n; i++) {
    let z = Math.cos(Math.PI * (i + 0.75) / (n + 0.5)), pp = 0;
    for (let it = 0; it < 100; it++) {
      let p1 = 1, p2 = 0;
      for (let j = 1; j <= n; j++) { const p3 = p2; p2 = p1; p1 = ((2 * j - 1) * z * p2 - (j - 1) * p3) / j; }
      pp = n * (z * p1 - p2) / (z * z - 1);
      const dz = p1 / pp; z -= dz;
      if (Math.abs(dz) < 1e-16) break;
    }
    x[i] = z; w[i] = 2 / ((1 - z * z) * pp * pp);
  }
  return { x, w };
}
const GL_CACHE = new Map();
function glIntegrate(f, lo, hi, n) {
  if (!GL_CACHE.has(n)) GL_CACHE.set(n, gaussLegendre(n));
  const { x, w } = GL_CACHE.get(n);
  const m = 0.5 * (hi + lo), d = 0.5 * (hi - lo);
  let s = 0;
  for (let i = 0; i < n; i++) s += w[i] * f(m + d * x[i]);
  return s * d;
}
// Converged GL: increase n until successive values agree; return value and last change.
function glConverged(f, lo, hi) {
  let prev = glIntegrate(f, lo, hi, 16), last = Infinity;
  for (const n of [24, 32, 48, 64, 96, 128]) {
    const cur = glIntegrate(f, lo, hi, n);
    last = Math.abs(cur - prev); prev = cur;
    if (last <= 2e-16 * Math.abs(cur)) break;
  }
  return { value: prev, change: last };
}
// ---------- quadrature rule 2: Romberg (Richardson on composite trapezoid) ----------
function romberg(f, lo, hi, maxK = 22, tol = 1e-15) {
  const R = [];
  let hstep = hi - lo, n = 1;
  R.push([0.5 * hstep * (f(lo) + f(hi))]);
  let prevBest = R[0][0], change = Infinity;
  for (let k = 1; k <= maxK; k++) {
    hstep /= 2; n *= 2;
    let s = 0;
    for (let i = 1; i < n; i += 2) s += f(lo + i * hstep);
    const row = [0.5 * R[k - 1][0] + hstep * s];
    for (let j = 1; j <= k; j++) {
      const p = Math.pow(4, j);
      row.push((p * row[j - 1] - R[k - 1][j - 1]) / (p - 1));
    }
    R.push(row);
    const best = row[row.length - 1];
    change = Math.abs(best - prevBest); prevBest = best;
    if (k >= 4 && change <= tol * Math.abs(best)) break;
  }
  return { value: prevBest, change };
}
// Two-rule bracket: interval hull of both converged values, widened by each rule's last change
// and by a floor of 4 ulps. This is a reported agreement bracket, not a rigorous enclosure.
function twoRule(f, lo, hi) {
  const g = glConverged(f, lo, hi), r = romberg(f, lo, hi);
  const vals = [g.value - g.change, g.value + g.change, r.value - r.change, r.value + r.change];
  const mid = 0.5 * (g.value + r.value);
  const floor = 4 * Number.EPSILON * Math.abs(mid);
  return { value: mid, lo: Math.min(...vals) - floor, hi: Math.max(...vals) + floor,
           gl: g.value, romberg: r.value, disagreement: Math.abs(g.value - r.value) };
}
// ---------- root finding: bisection on a sign change, refined to full precision ----------
function bisect(f, lo, hi) {
  let flo = f(lo), fhi = f(hi);
  if (flo === 0) return { root: lo, lo, hi: lo };
  if (fhi === 0) return { root: hi, lo: hi, hi };
  if (flo * fhi > 0) throw new Error(`bisect: no sign change on [${lo}, ${hi}]`);
  for (let i = 0; i < 400; i++) {
    const m = 0.5 * (lo + hi);
    if (m === lo || m === hi) break;
    const fm = f(m);
    if (fm === 0) { lo = hi = m; break; }
    if (fm * flo < 0) { hi = m; fhi = fm; } else { lo = m; flo = fm; }
  }
  return { root: 0.5 * (lo + hi), lo, hi };
}

// ---------- circle at separation r0 (closed form from the radial EL equation) ----------
// Radial EL on a circle: (1/4) h'(r0) omega^2 + sigma / r0^2 = 0.
function circle(P, r0) {
  const { sigma } = P;
  const omega2 = -4 * sigma / (r0 * r0 * P.hp(r0));
  if (!(omega2 > 0)) return { exists: false, omega2 };
  const omega = Math.sqrt(omega2);
  const ell = 0.5 * P.h(r0) * omega;
  const E = ell * ell / P.h(r0) + sigma / r0;
  const v = 0.5 * r0 * omega;                       // individual speed (|u|/2)
  // effective potential W(r) = ell^2 / h(r) + sigma / r ; W'' at r0
  const h = P.h(r0), hp = P.hp(r0), hpp = P.hpp(r0);
  const gpp = -hpp / (h * h) + 2 * hp * hp / (h * h * h);
  const Wpp = ell * ell * gpp + 2 * sigma / (r0 * r0 * r0);
  const a0 = P.a(r0);
  const kappa2 = 2 * Wpp / a0;
  const kappa = kappa2 > 0 ? Math.sqrt(kappa2) : NaN;
  const apsidalAnglePerRadialPeriod = kappa2 > 0 ? 2 * Math.PI * omega / kappa : NaN;
  // Root-finding cross-check: W'(r) = 0 at fixed ell must return r0.
  const Wp = (r) => -ell * ell * P.hp(r) / (P.h(r) * P.h(r)) - sigma / (r * r);
  let rootCheck = null;
  try { rootCheck = bisect(Wp, 0.5 * r0, 2 * r0); } catch (e) { rootCheck = { error: e.message }; }
  return {
    exists: true, r0, omega, period: 2 * Math.PI / omega, individualSpeed: v, ell, E,
    Wpp, a0, kappa2, kappa, radialPeriod: kappa2 > 0 ? 2 * Math.PI / kappa : NaN,
    apsidalAnglePerRadialPeriod, apsidalAdvancePerRadialPeriod: apsidalAnglePerRadialPeriod - 2 * Math.PI,
    linearlyStableReducedPlanar: (kappa2 > 0) && (a0 > 0),
    rootFindingCrossCheck: rootCheck,
    hessianEigs: P.hessianEigs(r0), epsilon: K / (CF * CF * r0),
  };
}

// ---------- eccentric planar orbit: turning points, radial period, apsidal angle ----------
function eccentric(P, r0, speedFactor) {
  const { sigma } = P;
  const circ = circle(P, r0);
  const thetadot0 = speedFactor * circ.omega;
  const ell = 0.5 * P.h(r0) * thetadot0;
  const E = ell * ell / P.h(r0) + sigma / r0;
  // (E - W) h = E r^2 + (-c sigma E/2 - sigma) r + (c/2 - ell^2)  =: Q(r)
  const qa = E, qb = -P.c * sigma * E / 2 - sigma, qc = P.c / 2 - ell * ell;
  const Q = (r) => qa * r * r + qb * r + qc;
  const disc = qb * qb - 4 * qa * qc;
  const rootsClosed = [(-qb - Math.sqrt(disc)) / (2 * qa), (-qb + Math.sqrt(disc)) / (2 * qa)].sort((x, y) => x - y);
  // Root finding (bisection) for the pericentre, independent of the quadratic formula.
  const rp = bisect(Q, 1e-9, r0 * (1 - 1e-12));
  const ra = r0; // tangential release below circular speed: r0 is the apocentre
  const absE = Math.abs(E);
  const rOf = (phi) => 0.5 * (ra + rp.root) - 0.5 * (ra - rp.root) * Math.cos(phi);
  const fT = (phi) => { const r = rOf(phi); return Math.sqrt(P.a(r) * P.h(r) / absE); };
  const fTh = (phi) => { const r = rOf(phi); return 2 * ell * Math.sqrt(P.a(r) / (absE * P.h(r))); };
  const Tr = twoRule(fT, 0, Math.PI);
  const dTh = twoRule(fTh, 0, Math.PI);
  const vPeri = ell / (P.b(rp.root) * rp.root);   // |u|/2 with rdot = 0: |u| = 2 ell / (b r)
  const vApo = ell / (P.b(ra) * ra);
  return {
    r0, speedFactor, ell, E, pericentre: rp.root, pericentreBracket: [rp.lo, rp.hi], pericentreQuadraticFormula: rootsClosed[0],
    apocentre: ra, apocentreQuadraticFormula: rootsClosed[1],
    radialPeriod: Tr, apsidalAnglePerRadialPeriod: dTh,
    apsidalAdvancePerRadialPeriod: { value: dTh.value - 2 * Math.PI, lo: dTh.lo - 2 * Math.PI, hi: dTh.hi - 2 * Math.PI },
    supIndividualSpeed: vPeri, individualSpeedAtRelease: vApo, maxEpsilon: K / rp.root,
    hessianEigsAtPericentre: P.hessianEigs(rp.root),
  };
}

// ---------- radial (ell = 0) histories ----------
// rdot^2 = 4 (E - sigma/r) / a(r).  Turning point r_t = sigma / E when sigma E > 0.
// time between r1 < r2 along a monotone leg: integral of dr / (2 sqrt((E - sigma/r)/a)).
function radialTime(P, E, r1, r2) {
  const { sigma } = P;
  const rt = sigma / E;
  const g = (r) => (E - sigma / r);   // must be > 0 on the open leg
  const base = (r) => 0.5 * Math.sqrt(P.a(r) / g(r));
  const tolT = 1e-9;
  const lowerTurn = Math.abs(r1 - rt) <= tolT * Math.abs(rt);
  const upperTurn = Math.abs(r2 - rt) <= tolT * Math.abs(rt);
  let f, lo = 0, hi = Math.PI / 2;
  if (lowerTurn) {
    // r = r1 + (r2 - r1) sin^2 psi ; (E - sigma/r) = sigma (r - rt)/(r rt) = (r - r1)/(r r1) (sigma=+1 case)
    const d = r2 - r1;
    f = (psi) => { const s = Math.sin(psi), r = Math.min(r1 + d * s * s, r2); return Math.sqrt(P.a(r) * r * Math.abs(rt) * d) * Math.cos(psi); };
  } else if (upperTurn) {
    const d = r2 - r1;
    f = (psi) => { const s = Math.sin(psi), r = Math.max(r2 - d * s * s, r1); return Math.sqrt(P.a(r) * r * Math.abs(rt) * d) * Math.cos(psi); };
  } else {
    f = base; lo = r1; hi = r2;
  }
  return twoRule(f, lo, hi);
}
// Closed forms for the frozen law's radial legs (derived by hand; independent of the quadrature).
// sigma=-1, release from rest at r0 (E = -1/r0):  t(r1) = (sqrt(r0)/2) [F(r0+1) - F(r1+1)],
//   F(x) = L asin(sqrt(x/L)) - sqrt(x (L - x)),  L = r0 + 1.
// sigma=+1, release from rest at r0 (E = +1/r0):  t(r1) = (sqrt(r0)/2) [G(r1-1) - G(r0-1)],
//   G(x) = sqrt(x (x - L')) + L' ln(sqrt(x) + sqrt(x - L')),  L' = r0 - 1.
// General: with turning point rt = sigma/E, for sigma=-1: t = (sqrt(rt)/2)[F_L(r_hi+1) - F_L(r_lo+1)], L = rt+1;
//          for sigma=+1: t = (sqrt(rt)/2)[G_L'(r_hi-1) - G_L'(r_lo-1)], L' = rt-1.
function radialTimeClosed(P, E, r1, r2) {
  if (P.c !== 1) return NaN;
  const { sigma } = P;
  const rt = sigma / E;
  if (sigma === -1) {
    const L = rt + 1;
    const F = (x) => L * Math.asin(Math.sqrt(x / L)) - Math.sqrt(x * (L - x));
    return 0.5 * Math.sqrt(rt) * (F(r2 + 1) - F(r1 + 1));
  }
  const Lp = rt - 1;
  const G = (x) => Math.sqrt(x * (x - Lp)) + Lp * Math.log(Math.sqrt(x) + Math.sqrt(x - Lp));
  return 0.5 * Math.sqrt(rt) * (G(r2 - 1) - G(r1 - 1));
}
// Kepler (c = 0) closed forms for the known case.
function keplerRadialTimeClosed(sigma, E, r1, r2) {
  const rt = sigma / E;
  if (sigma === -1) {
    const L = rt;
    const F = (x) => L * Math.asin(Math.sqrt(x / L)) - Math.sqrt(x * (L - x));
    return 0.5 * Math.sqrt(rt) * (F(r2) - F(r1));
  }
  const Lp = rt;
  const G = (x) => Math.sqrt(x * (x - Lp)) + Lp * Math.log(Math.sqrt(x) + Math.sqrt(x - Lp));
  return 0.5 * Math.sqrt(rt) * (G(r2) - G(r1));
}
const indSpeedRadial = (P, E, r) => Math.sqrt((E - P.sigma / r) / P.a(r)); // |rdot|/2
function speedBoundRadius(P, E, lo, hi) {
  // radius where individual speed equals SPEED_BOUND on a leg [lo, hi], if any
  const f = (r) => indSpeedRadial(P, E, r) - SPEED_BOUND;
  try { return bisect(f, lo, hi).root; } catch { return null; }
}
function coverage(supSpeed) {
  return {
    unrestricted: 'whole interval',
    inclusiveCeiling: supSpeed <= CF ? 'whole interval' : 'not covered after ceiling crossing',
    strictCeiling: supSpeed < CF ? 'whole interval' : 'not covered at or after ceiling crossing',
  };
}
const relErr = (x, y) => Math.abs(x - y) / Math.max(Math.abs(y), 1e-300);

// =====================================================================================
// KNOWN CASE FIRST: zero-coupling control (c = 0), closed forms independent of the code paths.
// =====================================================================================
function knownCase() {
  const P = mk(-1, 0);
  const checks = [];
  const push = (name, got, expect, tol = 1e-12) => checks.push({ name, got, expect, relErr: relErr(got, expect), pass: relErr(got, expect) <= tol });
  for (const r0 of [25, 100]) {
    const c = circle(P, r0);
    push(`kepler circle r0=${r0} omega = sqrt(2/r0^3)`, c.omega, Math.sqrt(2 / (r0 ** 3)));
    push(`kepler circle r0=${r0} individual speed = sqrt(1/(2 r0))`, c.individualSpeed, Math.sqrt(1 / (2 * r0)));
    push(`kepler circle r0=${r0} E = -1/(2 r0)`, c.E, -1 / (2 * r0));
    push(`kepler circle r0=${r0} ell = sqrt(r0/2)`, c.ell, Math.sqrt(r0 / 2));
    push(`kepler circle r0=${r0} kappa = omega (closed orbits)`, c.kappa, c.omega);
    push(`kepler circle r0=${r0} apsidal angle = 2 pi`, c.apsidalAnglePerRadialPeriod, 2 * Math.PI);
    push(`kepler circle r0=${r0} W'=0 root finding returns r0`, c.rootFindingCrossCheck.root, r0, 1e-13);
  }
  // Eccentric Kepler: T_r = 2 pi sqrt(s^3/2), s = -1/(2E); apsidal angle 2 pi; r_p r_a = ell^2/|E|.
  const e = eccentric(P, 100, 0.9);
  const s = -1 / (2 * e.E);
  push('kepler eccentric radial period = 2 pi sqrt(s^3/2)', e.radialPeriod.value, 2 * Math.PI * Math.sqrt(s ** 3 / 2), 1e-12);
  push('kepler eccentric apsidal angle = 2 pi', e.apsidalAnglePerRadialPeriod.value, 2 * Math.PI, 1e-12);
  push('kepler eccentric r_p r_a = ell^2/|E|', e.pericentre * e.apocentre, e.ell ** 2 / Math.abs(e.E), 1e-12);
  push('kepler eccentric r_p + r_a = 2 s', e.pericentre + e.apocentre, 2 * s, 1e-12);
  // Radial free fall from rest at r0 = 100 to r1 = 20 and to r -> 0 (t_ff = pi r0^{3/2}/4).
  const r0 = 100, E = -1 / r0;
  const t20 = radialTime(P, E, 20, r0);
  push('kepler radial fall 100 -> 20 time (quadrature vs closed form)', t20.value, keplerRadialTimeClosed(-1, E, 20, r0), 1e-12);
  const tff = radialTime(P, E, 1e-300, r0); // lower end at contact: integrand finite after substitution? use closed form check at tiny r1
  push('kepler radial fall 100 -> 0 time = pi r0^{3/2}/4', tff.value, Math.PI * Math.pow(r0, 1.5) / 4, 1e-9);
  // Same-polarity Kepler rest release 100 -> 200 and head-on approach turning point.
  const Pp = mk(1, 0);
  const t200 = radialTime(Pp, 1 / r0, r0, 200);
  push('kepler same-polarity release 100 -> 200 time (quadrature vs closed form)', t200.value, keplerRadialTimeClosed(1, 1 / r0, r0, 200), 1e-12);
  const Ehead = 0.25 * (0.1 ** 2) + 1 / r0;
  push('kepler same-polarity head-on v=0.05 turning point = 1/E = 80', 1 / Ehead, 80, 1e-14);
  const tturn = radialTime(Pp, Ehead, 1 / Ehead, r0);
  push('kepler same-polarity head-on time to turning point (quadrature vs closed form)', tturn.value, keplerRadialTimeClosed(1, Ehead, 1 / Ehead, r0), 1e-12);
  // Uncoupled free member check is trivial for this reduced route (K = 0 gives a(r)=b(r)=1 and no potential);
  // recorded as not exercised by this instrument.
  const allPass = checks.every((c) => c.pass);
  return { allPass, checks, note: 'Zero-coupling control: closed-form Kepler-type two-weight problem (relative coordinate acceleration -2 r/r^3). Known case run before any target computation.' };
}

// =====================================================================================
// TARGETS (frozen law, c = 1)
// =====================================================================================
function targets() {
  const Pm = mk(-1, 1), Pp = mk(1, 1);
  const out = {};
  // (a) circles
  out.a_circles = [25, 50, 100, 200, 400].map((r0) => {
    const c = circle(Pm, r0);
    return {
      r0, epsilon: c.epsilon,
      angularRate: c.omega, angularRateClosedForm: 'omega^2 = 8 / (r0^2 (4 r0 + 1))',
      individualSpeed: c.individualSpeed, individualSpeedClosedForm: 'v^2 = 2 / (4 r0 + 1)',
      period: c.period, energyLike: c.E, energyLikeClosedForm: 'E = -2 / (4 r0 + 1)',
      angularMomentumReduced: c.ell, angularMomentumClosedForm: 'ell^2 = (2 r0 + 1)^2 / (2 (4 r0 + 1))',
      radialOscillationFrequency: c.kappa, radialOscillationClosedForm: 'kappa^2 = 16 / ((4 r0 + 1)(2 r0 + 1)(r0 + 1))',
      radialPeriod: c.radialPeriod,
      apsidalAnglePerRadialPeriod: c.apsidalAnglePerRadialPeriod,
      apsidalAdvancePerRadialPeriod: c.apsidalAdvancePerRadialPeriod,
      apsidalAdvanceClosedForm: '2 pi ( sqrt((2 r0 + 1)(r0 + 1) / (2 r0^2)) - 1 )',
      linearlyStableReducedPlanar: c.linearlyStableReducedPlanar,
      rootFindingCrossCheckReturnsR0: c.rootFindingCrossCheck.root,
      hessianEigs: c.hessianEigs,
      bracket: 'closed form; double rounding only (relative width <= 1e-15)',
      insideProvisionalDomainAtRelease: (c.individualSpeed < SPEED_BOUND) && (c.epsilon < EPS_BOUND),
      coverage: coverage(c.individualSpeed),
    };
  });
  // same polarity: circle existence
  const sameCircleTest = [0.2, 0.25, 0.5, 1, 25, 100].map((r0) => ({ r0, ...circle(Pp, r0) }));
  out.a_samePolarityCircles = {
    statement: 'omega^2 = -8 / (r0^2 (4 r0 - 1)): positive only for r0 < 1/4, where the full Hessian is indefinite (both mirror modes negative) and v^2 = 2/(1 - 4 r0) > 2, so no same-polarity circle exists with individual speed below c_f or with r0 >= 1/4.',
    samples: sameCircleTest.map((s) => ({ r0: s.r0, exists: s.exists, omega2: s.omega2, individualSpeed: s.individualSpeed, hessianEigs: Pp.hessianEigs(s.r0) })),
  };
  // (b) eccentric
  out.b_eccentric = eccentric(Pm, 100, 0.9);
  out.b_eccentric.coverage = coverage(out.b_eccentric.supIndividualSpeed);
  // (c) rest release r0 = 100, opposite polarity
  {
    const r0 = 100, E = -1 / r0, rSing = 1; // first singular separation of the full Hessian for sigma = -1 (sum radial mode 1 - 1/r)
    const t20 = radialTime(Pm, E, 20, r0), tSing = radialTime(Pm, E, rSing, r0);
    const rSpeed = speedBoundRadius(Pm, E, rSing, r0 * (1 - 1e-12));
    const tSpeed = rSpeed ? radialTime(Pm, E, rSpeed, r0) : null;
    out.c_restReleaseOpposite = {
      r0, E, firstSingularSeparation: rSing, singularMode: 'common-centre (sum) radial mode (e, e): eigenvalue 1 - 1/r; the mirror (difference) modes stay positive',
      timeTo_r20: { ...t20, closedForm: radialTimeClosed(Pm, E, 20, r0) },
      individualSpeedAt_r20: indSpeedRadial(Pm, E, 20),
      timeToSingular: { ...tSing, closedForm: radialTimeClosed(Pm, E, rSing, r0) },
      individualSpeedAtSingular: indSpeedRadial(Pm, E, rSing), individualSpeedAtSingularClosedForm: 'sqrt((r0 - 1)/(2 r0)) = sqrt(99/200)',
      speedBoundCrossingRadius: rSpeed, speedBoundCrossingRadiusClosedForm: '(r0 - 1)/2 = 49.5', timeToSpeedBound: tSpeed,
      epsilonBoundCrossingRadius: K / EPS_BOUND,
      supIndividualSpeed: indSpeedRadial(Pm, E, rSing), maxEpsilon: 1 / rSing,
      reducedLimitAtContact: 'reduced problem alone: individual speed -> sqrt((r0 - r)/(r0 (r + 1))) -> 1 = c_f as r -> 0; not reached because the full history ends at r = 1 with an obstruction event',
      historyEnd: 'obstruction event at r = 1 (singular 6x6 Hessian) under the frozen rule',
      coverage: coverage(indSpeedRadial(Pm, E, rSing)),
    };
  }
  // (d) rest release r0 = 100, same polarity
  {
    const r0 = 100, E = 1 / r0;
    const t200 = radialTime(Pp, E, r0, 200);
    out.d_restReleaseSame = {
      r0, E, asymptoticIndividualSpeed: Math.sqrt(E), asymptoticClosedForm: '1/sqrt(r0) = 0.1 (same as zero coupling: a(r) -> 1)',
      individualSpeedAt_r200: indSpeedRadial(Pp, E, 200),
      timeTo_r200: { ...t200, closedForm: radialTimeClosed(Pp, E, r0, 200) },
      supIndividualSpeedOnInterval: indSpeedRadial(Pp, E, 200), supIndividualSpeedAllTime: Math.sqrt(E), maxEpsilon: 1 / r0,
      singularSeparationReached: false, coverage: coverage(Math.sqrt(E)),
    };
  }
  // (e) same-polarity head-on, v = 0.05 each
  {
    const r0 = 100, v = 0.05, rdot0 = -2 * v;
    const E = 0.25 * Pp.a(r0) * rdot0 * rdot0 + 1 / r0;
    const rmin = 1 / E;
    const rminRoot = bisect((r) => E - 1 / r, 1 + 1e-9, r0);
    const tturn = radialTime(Pp, E, rmin, r0);
    out.e_headOnSame = {
      r0, individualSpeed: v, E, minimumSeparation: rmin, minimumSeparationBisection: [rminRoot.lo, rminRoot.hi],
      timeToTurningPoint: { ...tturn, closedForm: radialTimeClosed(Pp, E, rmin, r0) },
      supIndividualSpeed: v, maxEpsilon: 1 / rmin, singularSeparationReached: false,
      hessianEigsAtMinimum: Pp.hessianEigs(rmin), coverage: coverage(v),
    };
  }
  // (f) opposite-polarity head-on, v = 0.02 each
  {
    const r0 = 100, v = 0.02, rdot0 = -2 * v, rSing = 1;
    const E = 0.25 * Pm.a(r0) * rdot0 * rdot0 - 1 / r0;
    const rStar = -1 / E; // would-be apocentre (not reached on the inward leg)
    const t20 = radialTime(Pm, E, 20, r0), tSing = radialTime(Pm, E, rSing, r0);
    const rSpeed = speedBoundRadius(Pm, E, rSing, r0);
    const tSpeed = rSpeed ? radialTime(Pm, E, rSpeed, r0) : null;
    out.f_headOnOpposite = {
      r0, individualSpeed: v, E, wouldBeApocentre: rStar, firstSingularSeparation: rSing,
      timeTo_r20: { ...t20, closedForm: radialTimeClosed(Pm, E, 20, r0) }, individualSpeedAt_r20: indSpeedRadial(Pm, E, 20),
      timeToSingular: { ...tSing, closedForm: radialTimeClosed(Pm, E, rSing, r0) }, individualSpeedAtSingular: indSpeedRadial(Pm, E, rSing),
      speedBoundCrossingRadius: rSpeed, timeToSpeedBound: tSpeed, epsilonBoundCrossingRadius: K / EPS_BOUND,
      supIndividualSpeed: indSpeedRadial(Pm, E, rSing), maxEpsilon: 1 / rSing,
      historyEnd: 'obstruction event at r = 1 (singular 6x6 Hessian) under the frozen rule', coverage: coverage(indSpeedRadial(Pm, E, rSing)),
    };
  }
  // Hessian singular loci (derived)
  out.hessian = {
    eigenvalues: 'sum (common-centre) modes: 1 + sigma/r (radial), 1 + sigma/(2r) (transverse x2); difference (mirror) modes: 1 - sigma/r (radial), 1 - sigma/(2r) (transverse x2)',
    oppositePolarity: { singular: [{ r: 1, mode: 'sum radial (e,e)' }, { r: 0.5, mode: 'sum transverse (t,t) x2' }], positiveDefinite: 'r > 1', mirrorModesSingular: 'never' },
    samePolarity: { singular: [{ r: 1, mode: 'difference radial (e,-e)' }, { r: 0.5, mode: 'difference transverse (t,-t) x2' }], positiveDefinite: 'r > 1', mirrorModesSingular: 'r = 1 (radial) and r = 1/2 (transverse)' },
    zeroVelocity: 'does not remove the coupling: at V = 0, H A = (sigma/r^2)(e, -e) gives A_1 = sigma e / (r (r - sigma)); the factor 1/(1 - sigma/r) is the coupling.',
  };
  return out;
}

// =====================================================================================
// WITHHELD AND ADDITIONAL PREREGISTERED CASES (round 1 batch 2; computed blind, c = 1).
// Same quadratures, closed forms and bisection as above; nothing above is changed.
// =====================================================================================
// Planar inward leg from a release at the apocentre r_a (rdot = 0, general ell) down to r1 < r_a.
// (E - W) h = Q(r) = E r^2 + (-c sigma E/2 - sigma) r + (c/2 - ell^2); with Q(r_a) = 0 and
// Vieta r_n = qc / (qa r_a) for the other root, Q(r) = |E| (r_a - r)(r - r_n) when E < 0.
// Substitution r = r_a - d sin^2 psi removes the inverse-square-root endpoint singularity:
//   dt = (1/2) sqrt(a h / Q) dr  ->  sqrt(a h d / (|E| (r - r_n))) cos psi dpsi,
//   dtheta = (2 ell / h) dt.
function planarInwardLeg(P, E, ell, ra, r1) {
  const { sigma, c } = P;
  const qa = E, qb = -c * sigma * E / 2 - sigma, qc = c / 2 - ell * ell;
  const Q = (r) => qa * r * r + qb * r + qc;
  const rn = qc / (qa * ra);
  const absE = Math.abs(E), d = ra - r1;
  const rOf = (psi) => { const s = Math.sin(psi); return Math.max(ra - d * s * s, r1); };
  const fT = (psi) => { const r = rOf(psi); return Math.sqrt(P.a(r) * P.h(r) * d / (absE * (r - rn))) * Math.cos(psi); };
  const fTh = (psi) => { const r = rOf(psi); return (2 * ell / P.h(r)) * fT(psi); };
  return { time: twoRule(fT, 0, Math.PI / 2), angle: twoRule(fTh, 0, Math.PI / 2), otherRoot: rn, Q };
}
// Individual speed on a planar history: v = (1/2) sqrt(rdot^2 + r^2 thetadot^2),
// rdot^2 = 4 (E - W(r)) / a(r), thetadot = 2 ell / h(r).
function indSpeedPlanar(P, E, ell, r) {
  const W = ell * ell / P.h(r) + P.sigma / r;
  const rdot2 = Math.max(0, 4 * (E - W) / P.a(r));
  const thetadot = 2 * ell / P.h(r);
  return 0.5 * Math.sqrt(rdot2 + r * r * thetadot * thetadot);
}
function withheldRound2(known) {
  const Pm = mk(-1, 1);
  const out = {
    fixedAtUtc: new Date().toISOString(),
    blindness: 'No subject run record, subject instrument file, subject receipt or investigation file was read before these values were fixed; inputs were the common brief, the preregistration case table (Sections 1-4) and this instrument.',
    knownCaseRerun: {
      ranFirst: true, allPass: known.allPass, checks: known.checks.length,
      maxRelErr: Math.max(...known.checks.map((k) => k.relErr)),
      maxRelErrExcludingContact: Math.max(...known.checks.filter((k) => !/-> 0 time/.test(k.name)).map((k) => k.relErr)),
    },
  };
  // WR-150: opposite-polarity mirror head-on, r0 = 150, individual speeds 0.03 inward.
  {
    const r0 = 150, v = 0.03, rdot0 = -2 * v, rSing = 1;
    const E = 0.25 * Pm.a(r0) * rdot0 * rdot0 - 1 / r0;
    const rStar = -1 / E; // would-be apocentre (outside the inward leg)
    const t20 = radialTime(Pm, E, 20, r0), tSing = radialTime(Pm, E, rSing, r0);
    const rSpeed = speedBoundRadius(Pm, E, rSing, r0);
    const rSpeedClosed = (1 - SPEED_BOUND * SPEED_BOUND) / (SPEED_BOUND * SPEED_BOUND - E); // v^2 = (E + 1/r)/(1 + 1/r)
    const tSpeed = rSpeed ? radialTime(Pm, E, rSpeed, r0) : null;
    out.WR150 = {
      id: 'WR-150', polarity: 'opposite', preparation: 'mirror head-on, r0 = 150, individual speeds 0.03 inward',
      r0, individualSpeedAtRelease: v, E, energyLikeClosedForm: 'E = (1/4)(1 + 1/r0)(2 v)^2 - 1/r0',
      turningPoint: 'none on the inward leg: E + 1/r > 0 for all r < -1/E; the only root of E + 1/r is the would-be apocentre',
      wouldBeApocentre: rStar,
      timeToSpeedBound: tSpeed, speedBoundCrossingRadius: rSpeed, speedBoundCrossingRadiusClosedForm: rSpeedClosed,
      timeTo_r20: { ...t20, closedForm: radialTimeClosed(Pm, E, 20, r0) }, individualSpeedAt_r20: indSpeedRadial(Pm, E, 20),
      firstSingularSeparation: rSing, singularMode: 'common-centre (sum) radial mode (e, e), eigenvalue 1 - 1/r; mirror modes stay positive',
      timeToSingular: { ...tSing, closedForm: radialTimeClosed(Pm, E, rSing, r0) },
      individualSpeedAtSingular: indSpeedRadial(Pm, E, rSing), individualSpeedAtSingularClosedForm: 'sqrt((1 + E)/2)',
      supIndividualSpeed: indSpeedRadial(Pm, E, rSing), maxEpsilon: 1 / rSing, epsilonBoundCrossingRadius: K / EPS_BOUND,
      hessianEigsAtSingular: Pm.hessianEigs(rSing),
      historyEnd: 'obstruction event at r = 1 (singular 6x6 Hessian) under the frozen rule',
      coverage: coverage(indSpeedRadial(Pm, E, rSing)),
    };
  }
  // WE-150: opposite-polarity mirror, r0 = 150, tangential individual speed 0.95 u_c(150).
  {
    const r0 = 150;
    const uc = Math.pow(2 * r0 + 0.5, -0.5);
    const e = eccentric(Pm, r0, 0.95);
    const circ = circle(Pm, r0);
    const insideSpeed = e.supIndividualSpeed <= SPEED_BOUND, insideEps = e.maxEpsilon <= EPS_BOUND;
    out.WE150 = {
      id: 'WE-150', polarity: 'opposite', preparation: 'mirror, r0 = 150, tangential individual speed 0.95 u_c(150)',
      uc150: uc, uc150MatchesCircleClosedForm: relErr(uc, circ.individualSpeed), releaseIndividualSpeed: e.individualSpeedAtRelease,
      ...e,
      individualSpeedAtPericentre: e.supIndividualSpeed, epsilonAtPericentre: e.maxEpsilon,
      insideDeclaredDomainThroughout: insideSpeed && insideEps,
      domainNote: `speed <= ${SPEED_BOUND}: ${insideSpeed}; K/r <= ${EPS_BOUND}: ${insideEps}`,
      coverage: coverage(e.supIndividualSpeed),
    };
  }
  // DL-100: opposite-polarity mirror, r0 = 100, tangential individual speed 0.005 (low angular momentum).
  {
    const r0 = 100, v = 0.005, rSing = 1;
    const thetadot0 = 2 * v / r0;
    const ell = 0.5 * Pm.h(r0) * thetadot0;
    const E = ell * ell / Pm.h(r0) - 1 / r0;
    const qa = E, qb = -Pm.c * Pm.sigma * E / 2 - Pm.sigma, qc = Pm.c / 2 - ell * ell;
    const Q = (r) => qa * r * r + qb * r + qc;
    const disc = qb * qb - 4 * qa * qc;
    const roots = [(-qb - Math.sqrt(disc)) / (2 * qa), (-qb + Math.sqrt(disc)) / (2 * qa)].sort((x, y) => x - y);
    // Pericentre search: a sign change of Q on (0, r0) would be a pericentre. Sample the minimum of Q on the leg.
    let qMin = Infinity, qArg = NaN;
    for (let i = 1; i <= 100000; i++) { const r = r0 * i / 100000; const q = Q(r); if (q < qMin) { qMin = q; qArg = r; } }
    const leg20 = planarInwardLeg(Pm, E, ell, r0, 20), legSing = planarInwardLeg(Pm, E, ell, r0, rSing);
    const fSpeed = (r) => indSpeedPlanar(Pm, E, ell, r) - SPEED_BOUND;
    let rSpeed = null; try { rSpeed = bisect(fSpeed, rSing, r0 * (1 - 1e-12)).root; } catch { rSpeed = null; }
    const legSpeed = rSpeed ? planarInwardLeg(Pm, E, ell, r0, rSpeed) : null;
    out.DL100 = {
      id: 'DL-100', polarity: 'opposite', preparation: 'mirror, r0 = 100, tangential individual speed 0.005',
      r0, releaseIndividualSpeed: v, thetadot0, ell, ellClosedForm: 'ell = (1/2) h(r0) thetadot0 = b(r0) r0 v = 0.5025', ellSquared: ell * ell, ellSquaredBelowHalf: ell * ell < 0.5,
      E, Qpolynomial: 'Q(r) = (E - W) h = E r^2 + (E/2 + 1) r + (1/2 - ell^2)', Qat0: qc, QatRelease: Q(r0), Qroots: roots,
      minimumOfQOnLeg: { value: qMin, at: qArg },
      pericentre: null, pericentreExists: false,
      pericentreStatement: 'none: Q(0) = 1/2 - ell^2 > 0 and Q has exactly one root in (0, r0], at r0 itself, so E - W(r) > 0 on (0, r0) and the reduced problem falls to contact; the release is at the apocentre',
      apocentre: r0, maximumSeparation: r0, apocentreStatement: 'release point (rdot = 0 and Q decreasing through r0)',
      speedBoundCrossingRadius: rSpeed, timeToSpeedBound: legSpeed ? legSpeed.time : null,
      timeTo_r20: leg20.time, angleSweptTo_r20: leg20.angle, individualSpeedAt_r20: indSpeedPlanar(Pm, E, ell, 20),
      firstSingularSeparation: rSing, singularMode: 'common-centre (sum) radial mode (e, e), eigenvalue 1 - 1/r; mirror modes stay positive',
      timeToSingular: legSing.time, angleSweptToSingular: legSing.angle,
      individualSpeedAtSingular: indSpeedPlanar(Pm, E, ell, rSing),
      supIndividualSpeed: indSpeedPlanar(Pm, E, ell, rSing), maxEpsilon: 1 / rSing, epsilonBoundCrossingRadius: K / EPS_BOUND,
      hessianEigsAtSingular: Pm.hessianEigs(rSing),
      historyEnd: 'obstruction event at r = 1 (singular 6x6 Hessian) under the frozen rule',
      coverage: coverage(indSpeedPlanar(Pm, E, ell, rSing)),
    };
  }
  return out;
}

// =====================================================================================
function main() {
  const startedAt = new Date().toISOString();
  const known = knownCase();
  console.log(`[known case] zero-coupling control: ${known.allPass ? 'PASS' : 'FAIL'} (${known.checks.length} checks)`);
  for (const c of known.checks) console.log(`  ${c.pass ? 'ok  ' : 'FAIL'} ${c.name}: got ${c.got} expect ${c.expect} relErr ${c.relErr.toExponential(2)}`);
  let targetsOut = null;
  if (known.allPass) {
    targetsOut = targets();
    console.log('[targets] computed after known-case pass');
    for (const row of targetsOut.a_circles) console.log(`  circle r0=${row.r0}: omega=${row.angularRate} v=${row.individualSpeed} T=${row.period} E=${row.energyLike} ell=${row.angularMomentumReduced} kappa=${row.radialOscillationFrequency} dpsi=${row.apsidalAdvancePerRadialPeriod} stable(reduced)=${row.linearlyStableReducedPlanar} inDomain=${row.insideProvisionalDomainAtRelease}`);
    const b = targetsOut.b_eccentric;
    console.log(`  eccentric: rp=${b.pericentre} ra=${b.apocentre} Tr=[${b.radialPeriod.lo}, ${b.radialPeriod.hi}] dtheta=[${b.apsidalAnglePerRadialPeriod.lo}, ${b.apsidalAnglePerRadialPeriod.hi}] advance=${b.apsidalAdvancePerRadialPeriod.value} vsup=${b.supIndividualSpeed}`);
    const c = targetsOut.c_restReleaseOpposite;
    console.log(`  (c) t(r=20)=[${c.timeTo_r20.lo}, ${c.timeTo_r20.hi}] closed=${c.timeTo_r20.closedForm}; t(r=1)=[${c.timeToSingular.lo}, ${c.timeToSingular.hi}] closed=${c.timeToSingular.closedForm}; v(r=1)=${c.individualSpeedAtSingular}`);
    const d = targetsOut.d_restReleaseSame;
    console.log(`  (d) v_inf=${d.asymptoticIndividualSpeed} t(r=200)=[${d.timeTo_r200.lo}, ${d.timeTo_r200.hi}] closed=${d.timeTo_r200.closedForm}`);
    const e = targetsOut.e_headOnSame;
    console.log(`  (e) rmin=${e.minimumSeparation} t_turn=[${e.timeToTurningPoint.lo}, ${e.timeToTurningPoint.hi}] closed=${e.timeToTurningPoint.closedForm}`);
    const f = targetsOut.f_headOnOpposite;
    console.log(`  (f) t(r=20)=[${f.timeTo_r20.lo}, ${f.timeTo_r20.hi}] closed=${f.timeTo_r20.closedForm}; t(r=1)=[${f.timeToSingular.lo}, ${f.timeToSingular.hi}] closed=${f.timeToSingular.closedForm}; v(r=1)=${f.individualSpeedAtSingular}`);
  } else {
    console.log('[targets] NOT computed: known case failed');
  }
  let withheldOut = null;
  if (known.allPass) {
    withheldOut = withheldRound2(known);
    console.log(`[withheldRound2] computed blind after known-case rerun (${withheldOut.knownCaseRerun.checks} checks, max relErr ${withheldOut.knownCaseRerun.maxRelErr.toExponential(2)}); fixed at ${withheldOut.fixedAtUtc}`);
    const w = withheldOut.WR150;
    console.log(`  WR-150: E=${w.E} r*=${w.wouldBeApocentre} r(v=0.1)=${w.speedBoundCrossingRadius} (closed ${w.speedBoundCrossingRadiusClosedForm}) t(v=0.1)=[${w.timeToSpeedBound.lo}, ${w.timeToSpeedBound.hi}] closed=${w.timeToSpeedBound ? radialTimeClosed(mk(-1, 1), w.E, w.speedBoundCrossingRadius, 150) : NaN}`);
    console.log(`          t(r=20)=[${w.timeTo_r20.lo}, ${w.timeTo_r20.hi}] closed=${w.timeTo_r20.closedForm} v(20)=${w.individualSpeedAt_r20}; t(r=1)=[${w.timeToSingular.lo}, ${w.timeToSingular.hi}] closed=${w.timeToSingular.closedForm} v(1)=${w.individualSpeedAtSingular}`);
    const x = withheldOut.WE150;
    console.log(`  WE-150: uc=${x.uc150} v0=${x.individualSpeedAtRelease} ell=${x.ell} E=${x.E} rp=${x.pericentre} [${x.pericentreBracket}] quad=${x.pericentreQuadraticFormula} ra=${x.apocentre}`);
    console.log(`          Tr=[${x.radialPeriod.lo}, ${x.radialPeriod.hi}] dtheta=[${x.apsidalAnglePerRadialPeriod.lo}, ${x.apsidalAnglePerRadialPeriod.hi}] advance=[${x.apsidalAdvancePerRadialPeriod.lo}, ${x.apsidalAdvancePerRadialPeriod.hi}] v_peri=${x.individualSpeedAtPericentre} eps_peri=${x.epsilonAtPericentre} inside=${x.insideDeclaredDomainThroughout}`);
    const y = withheldOut.DL100;
    console.log(`  DL-100: ell=${y.ell} ell^2=${y.ellSquared} E=${y.E} Q(0)=${y.Qat0} Q(r0)=${y.QatRelease} roots=${y.Qroots} Qmin=${y.minimumOfQOnLeg.value}@${y.minimumOfQOnLeg.at} pericentre=${y.pericentreExists}`);
    console.log(`          r(v=0.1)=${y.speedBoundCrossingRadius} t=[${y.timeToSpeedBound ? y.timeToSpeedBound.lo : NaN}, ${y.timeToSpeedBound ? y.timeToSpeedBound.hi : NaN}]; t(r=20)=[${y.timeTo_r20.lo}, ${y.timeTo_r20.hi}] v(20)=${y.individualSpeedAt_r20}; t(r=1)=[${y.timeToSingular.lo}, ${y.timeToSingular.hi}] v(1)=${y.individualSpeedAtSingular} theta(1)=[${y.angleSweptToSingular.lo}, ${y.angleSweptToSingular.hi}]`);
  }
  const receipt = {
    instrument: 'darwin-overnight-independent-reference.mjs', lens: 'ramon-e-moore', route: 'centre/relative split, mirror reduction, polar quadratures, closed forms, bisection root finding; no Cartesian ODE integrator',
    law: 'Section 10 frozen functional, c_f = 1, K = 1, unit weights, coupling 1/(2 c_f^2), instantaneous', parameters: { SPEED_BOUND, EPS_BOUND, CF, K },
    bracketSemantics: 'quadrature values: interval hull of Gauss-Legendre and Romberg converged values widened by each rule\'s last change and 4 ulps; closed forms: double rounding only. Reported agreement brackets, not rigorous outward-rounded enclosures.',
    startedAt, finishedAt: new Date().toISOString(),
    knownCaseFirst: known, targets: targetsOut, withheldRound2: withheldOut,
  };
  writeFileSync(OUT, JSON.stringify(receipt, null, 2) + '\n');
  try { mkdirSync(RUNTIME_DIR, { recursive: true }); writeFileSync(join(RUNTIME_DIR, 'last-run.json'), JSON.stringify(receipt, null, 2) + '\n'); } catch (e) { console.log(`[runtime copy skipped] ${e.message}`); }
  console.log(`[written] ${OUT}`);
  process.exit(known.allPass ? 0 : 1);
}
main();
